# -*- coding: utf-8 -*
'''
cron: 30 18 * * *
new Env('TY云任务-京东wskey转换');
#禁用发送消息 默认不禁用
WSKEY_SEND="disable";
#检查更新间隔设置就检查，设置为数字则设置多少就隔多久反正默认672小时，就是28天更新一次
WSKEY_UPDATE_HOUR=672;
#休眠时间 10秒
WSKEY_SLEEP=10;
#WSKEY失效自动禁用
WSKEY_AUTO_DISABLE
#重试次数1次
WSKEY_TRY_COUNT=1;
'''
import base64  # 用于编解码
import json  # 用于Json解析
import os  # 用于导入系统变量
import sys  # 实现 sys.exit
import logging  # 用于日志输出
import time  # 时间
import re  # 正则过滤

WSKEY_MODE = 0
# 0 = Default / 1 = Debug!

if "WSKEY_DEBUG" in os.environ or WSKEY_MODE:  # 判断调试模式变量
    logging.basicConfig(level=logging.DEBUG, format='%(message)s')  # 设置日志为 Debug等级输出
    logger = logging.getLogger(__name__)  # 主模块
    logger.debug("\nDEBUG模式开启!\n")  # 消息输出
else:  # 判断分支
    logging.basicConfig(level=logging.INFO, format='%(message)s')  # Info级日志
    logger = logging.getLogger(__name__)  # 主模块

try:  # 异常捕捉
    import requests  # 导入HTTP模块
except Exception as e:  # 异常捕捉
    logger.info(str(e) + "\n缺少requests模块, 请执行命令：pip3 install requests\n")  # 日志输出
    sys.exit(1)  # 退出脚本
os.environ['no_proxy'] = '*'  # 禁用代理
requests.packages.urllib3.disable_warnings()  # 抑制错误
try:  # 异常捕捉
    from notify import send  # 导入青龙消息通知模块
except Exception as err:  # 异常捕捉
    logger.debug(str(err))  # 调试日志输出
    logger.info("无推送文件")  # 标准日志输出

ver = 20524  # 版本号

def ql_send(text):
    if "WSKEY_SEND" in os.environ and os.environ["WSKEY_SEND"] == 'disable':
        return True
    else:
        try:  # 异常捕捉
            send('WSKEY转换', text)  # 消息发送
        except Exception as err:  # 异常捕捉
            logger.debug(str(err))  # Debug日志输出
            logger.info("通知发送失败")  # 标准日志输出


# 返回值 list[wskey]
def get_wskey():  # 方法 获取 wskey值 [系统变量传递]
    if "JD_WSCK" in os.environ:  # 判断 JD_WSCK是否存在于环境变量
        wskey_list = os.environ['JD_WSCK'].split('&')  # 读取系统变量 以 & 分割变量
        if len(wskey_list) > 0:  # 判断 WSKEY 数量 大于 0 个
            return wskey_list  # 返回 WSKEY [LIST]
        else:  # 判断分支
            logger.info("JD_WSCK变量未启用")  # 标准日志输出
            sys.exit(1)  # 脚本退出
    else:  # 判断分支
        logger.info("未添加JD_WSCK变量")  # 标准日志输出
        sys.exit(0)  # 脚本退出


# 返回值 bool
def check_ck(row):  # 方法 检查 Cookie有效性 使用变量传递 单次调用
    #searchObj = re.search(r'pt_pin=([^;\s]+)', row["value"], re.M | re.I)  # 正则检索 pt_pin
    #if searchObj: userName = searchObj.group(1)  # 取值
    userName = row["userName"]
    updatedAt = Date2time(row["up_date"])
    if "WSKEY_UPDATE_HOUR" in os.environ:  # 判断 WSKEY_UPDATE_HOUR是否存在于环境变量
        updateHour = 672  # 更新间隔672小时
        if os.environ["WSKEY_UPDATE_HOUR"].isdigit():  # 检查是否为 DEC值
            updateHour = int(os.environ["WSKEY_UPDATE_HOUR"])  # 使用 int化数字
        nowTime = time.time()  # 获取时间戳 赋值
        if nowTime - updatedAt >= (updateHour * 60 * 60) - (10 * 60):  # 判断时间操作
            logger.info(str(userName) + ";即将到期或已过期\n")  # 标准日志输出
            return False  # 返回 Bool类型 False
        else:  # 判断分支
            remainingTime = (updateHour * 60 * 60) - (nowTime - updatedAt)  # 时间运算操作
            hour = int(remainingTime / 60 / 60)  # 时间运算操作 [int]
            minute = int((remainingTime % 3600) / 60)  # 时间运算操作 [int]
            logger.info(str(userName) + ";未到期，{0}时{1}分后更新\n".format(hour, minute))  # 标准日志输出
            return True  # 返回 Bool类型 True
    elif "WSKEY_DISCHECK" in os.environ:  # 判断分支 WSKEY_DISCHECK 是否存在于系统变量
        logger.info("不检查账号有效性\n--------------------\n")  # 标准日志输出
        return False  # 返回 Bool类型 False
    else:  # 判断分支
        url = 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion'  # 设置JD_API接口地址
        headers = {
            'Cookie': row["value"],
            'Referer': 'https://home.m.jd.com/myJd/home.action',
            'user-agent': ua
        }  # 设置 HTTP头
        try:  # 异常捕捉
            res = requests.get(url=url, headers=headers, verify=False, timeout=10)  # 进行 HTTP请求[GET] 超时 10秒
        except Exception as err:  # 异常捕捉
            logger.debug(str(err))  # 调试日志输出
            logger.info("JD接口错误 请重试或者更换IP")  # 标准日志输出
            return False  # 返回 Bool类型 False
        else:  # 判断分支
            if res.status_code == 200:  # 判断 JD_API 接口是否为 200 [HTTP_OK]
                code = int(json.loads(res.text)['retcode'])  # 使用 Json模块对返回数据取值 int([retcode])
                if code == 0:  # 判断 code值
                    logger.info(str(userName) + ";状态正常\n")  # 标准日志输出
                    return True  # 返回 Bool类型 True
                else:  # 判断分支
                    logger.info(str(userName) + ";状态失效\n")
                    return False  # 返回 Bool类型 False
            else:  # 判断分支
                logger.info("JD接口错误码: " + str(res.status_code))  # 标注日志输出
                return False  # 返回 Bool类型 False


# 返回值 bool jd_ck
def getToken(wskey):  # 方法 获取 Wskey转换使用的 Token 由 JD_API 返回 这里传递 wskey
    try:  # 异常捕捉
        url = str(base64.b64decode(url_t).decode()) + 'api/genToken'  # 设置云端服务器地址 路由为 genToken
        header = {"User-Agent": ua}  # 设置 HTTP头
        params = requests.get(url=url, headers=header, verify=False, timeout=20).json()  # 设置 HTTP请求参数 超时 20秒 Json解析
    except Exception as err:  # 异常捕捉
        logger.info("Params参数获取失败")  # 标准日志输出
        logger.debug(str(err))  # 调试日志输出
        return False, wskey  # 返回 -> False[Bool], Wskey
    headers = {
        'cookie': wskey,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'charset': 'UTF-8',
        'accept-encoding': 'br,gzip,deflate',
        'user-agent': ua
    }  # 设置 HTTP头
    url = 'https://api.m.jd.com/client.action'  # 设置 URL地址
    data = 'body=%7B%22to%22%3A%22https%253a%252f%252fplogin.m.jd.com%252fjd-mlogin%252fstatic%252fhtml%252fappjmp_blank.html%22%7D&'  # 设置 POST 载荷
    try:  # 异常捕捉
        res = requests.post(url=url, params=params, headers=headers, data=data, verify=False,
                            timeout=10)  # HTTP请求 [POST] 超时 10秒
        res_json = json.loads(res.text)  # Json模块 取值
        tokenKey = res_json['tokenKey']  # 取出TokenKey
    except Exception as err:  # 异常捕捉
        logger.info("JD_WSKEY接口抛出错误 尝试重试 更换IP")  # 标准日志输出
        logger.info(str(err))  # 标注日志输出
        return False, wskey  # 返回 -> False[Bool], Wskey
    else:  # 判断分支
        return appjmp(wskey, tokenKey)  # 传递 wskey, Tokenkey 执行方法 [appjmp]


# 返回值 bool jd_ck
def appjmp(wskey, tokenKey):  # 方法 传递 wskey & tokenKey
    wskey = "pt_" + str(wskey.split(";")[0])  # 变量组合 使用 ; 分割变量 拼接 pt_
    if tokenKey == 'xxx':  # 判断 tokenKey返回值
        logger.info(str(wskey) + ";疑似IP风控等问题 默认为失效\n--------------------\n")  # 标准日志输出
        return False, wskey  # 返回 -> False[Bool], Wskey
    headers = {
        'User-Agent': ua,
        'accept': 'accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'x-requested-with': 'com.jingdong.app.mall'
    }  # 设置 HTTP头
    params = {
        'tokenKey': tokenKey,
        'to': 'https://plogin.m.jd.com/jd-mlogin/static/html/appjmp_blank.html'
    }  # 设置 HTTP_URL 参数
    url = 'https://un.m.jd.com/cgi-bin/app/appjmp'  # 设置 URL地址
    try:  # 异常捕捉
        res = requests.get(url=url, headers=headers, params=params, verify=False, allow_redirects=False,timeout=20)  # HTTP请求 [GET] 阻止跳转 超时 20秒
    except Exception as err:  # 异常捕捉
        logger.info("JD_appjmp 接口错误 请重试或者更换IP\n")  # 标准日志输出
        logger.info(str(err))  # 标准日志输出
        return False, wskey  # 返回 -> False[Bool], Wskey
    else:  # 判断分支
        try:  # 异常捕捉
            res_set = res.cookies.get_dict()  # 从res cookie取出
            pt_key = 'pt_key=' + res_set['pt_key']  # 取值 [pt_key]
            pt_pin = 'pt_pin=' + res_set['pt_pin']  # 取值 [pt_pin]
            jd_ck = str(pt_key) + ';' + str(pt_pin) + ';'  # 拼接变量
        except Exception as err:  # 异常捕捉
            logger.info("JD_appjmp提取Cookie错误 请重试或者更换IP\n")  # 标准日志输出
            logger.info(str(err))  # 标准日志输出
            return False, wskey  # 返回 -> False[Bool], Wskey
        else:  # 判断分支
            if 'fake' in pt_key:  # 判断 pt_key中 是否存在fake
                logger.info(str(wskey) + ";WsKey状态失效\n")  # 标准日志输出
                return False, wskey  # 返回 -> False[Bool], Wskey
            else:  # 判断分支
                logger.info(str(wskey) + ";WsKey状态正常\n")  # 标准日志输出
                return True, jd_ck  # 返回 -> True[Bool], jd_ck


def update():  # 方法 脚本更新模块
    up_ver = int(cloud_arg['update'])  # 云端参数取值 [int]
    if ver >= up_ver:  # 判断版本号大小
        logger.info("当前脚本版本: " + str(ver))  # 标准日志输出
        logger.info("--------------------\n")  # 标准日志输出
    else:  # 判断分支
        logger.info("当前脚本版本: " + str(ver) + "新版本: " + str(up_ver))  # 标准日志输出
        logger.info("存在新版本, 请更新脚本后执行")  # 标准日志输出
        logger.info("--------------------\n")  # 标准日志输出
        text = '当前脚本版本: {0}新版本: {1}, 请更新脚本~!'.format(ver, up_ver)  # 设置发送内容
        ql_send(text)
        # sys.exit(0)  # 退出脚本 [未启用]

def serch_ck(userName):  # 方法 搜索 userName
    for i in range(len(ckData)):  # For循环 变量[ckData]的数量
        row=ckData[i]
        #if "userName" not in row: continue # userName未定义就跳过
        if userName==row['userName']:  # 判断envlist取值['value']
            logger.info(str(userName) + "检索成功\n")  # 标准日志输出
            return True, row  # 返回 -> True[Bool], Array
    return False


def post_cookie(data):  # 方法 读取变量
    try:  # 异常捕捉
        #id,_id,Index,EIndex,uid,userName,nickName,eid,value,sid,state,add_date,up_date
        res = api.post(url=ck_api,params={},data=json.dumps(data))
    except Exception as err:  # 异常捕捉
        logger.debug(str(err))  # 调试日志输出
        logger.info("\nTY接口错误")  # 标准日志输出
        sys.exit(1)  # 脚本退出
    else:  # 判断分支
        return json.loads(res.text);# 使用Json模块提取值[data]


def cloud_info():  # 方法 云端信息
    url = str(base64.b64decode(url_t).decode()) + 'api/check_api'  # 设置 URL地址 路由 [check_api]
    for i in range(3):  # For循环 3次
        try:  # 异常捕捉
            headers = {"authorization": "Bearer Shizuku"}  # 设置 HTTP头
            res = requests.get(url=url, verify=False, headers=headers, timeout=20).text  # HTTP[GET] 请求 超时 20秒
        except requests.exceptions.ConnectTimeout:  # 异常捕捉
            logger.info("\n获取云端参数超时, 正在重试!" + str(i))  # 标准日志输出
            time.sleep(1)  # 休眠 1秒
            continue  # 循环继续
        except requests.exceptions.ReadTimeout:  # 异常捕捉
            logger.info("\n获取云端参数超时, 正在重试!" + str(i))  # 标准日志输出
            time.sleep(1)  # 休眠 1秒
            continue  # 循环继续
        except Exception as err:  # 异常捕捉
            logger.info("\n未知错误云端, 退出脚本!")  # 标准日志输出
            logger.debug(str(err))  # 调试日志输出
            sys.exit(1)  # 脚本退出
        else:  # 分支判断
            try:  # 异常捕捉
                c_info = json.loads(res)  # json读取参数
            except Exception as err:  # 异常捕捉
                logger.info("云端参数解析失败")  # 标准日志输出
                logger.debug(str(err))  # 调试日志输出
                sys.exit(1)  # 脚本退出
            else:  # 分支判断
                return c_info  # 返回 -> c_info


def check_cloud():  # 方法 云端地址检查
    url_list = ['aHR0cDovL2FwaS5tb21vZS5tbC8=', 'aHR0cHM6Ly9hcGkubW9tb2UubWwv',
                'aHR0cHM6Ly9hcGkuaWxpeWEuY2Yv']  # URL list Encode
    for i in url_list:  # for循环 url_list
        url = str(base64.b64decode(i).decode())  # 设置 url地址 [str]
        try:  # 异常捕捉
            requests.get(url=url, verify=False, timeout=10)  # HTTP[GET]请求 超时 10秒
        except Exception as err:  # 异常捕捉
            logger.debug(str(err))  # 调试日志输出
            continue  # 循环继续
        else:  # 分支判断
            info = ['HTTP', 'HTTPS', 'CloudFlare']  # 输出信息[List]
            logger.info(str(info[url_list.index(i)]) + " Server Check OK\n--------------------\n")  # 标准日志输出
            return i  # 返回 ->i
    logger.info("\n云端地址全部失效, 请检查网络!")  # 标准日志输出
    ql_send('云端地址失效. 请联系作者或者检查网络.')  # 推送消息
    sys.exit(1)  # 脚本退出


def Date2time(t):  # 方法 获取url
    s_t = time.strptime(t, "%Y-%m-%d %H:%M:%S")  # 返回元祖
    return int(time.mktime(s_t))

def ql_disable(id):
    Data = post_cookie({"ac":"state","id":id,"state":0}).data
    logger.info(Data["msg"])


def ql_AddUp(ck,uid):
    Data = post_cookie({"ac":"addUp","check":True,"eid":ckEid,"uid":uid,"value":ck,"uid":uid,"nickName":""}).data
    if Data["code"]==200 :
        logger.info(Data["msg"])
    else:
        logger.info("获取出错了！")  # 标准日志输出
        logger.info(Data["msg"])
        sys.exit(0)  # 退出脚本 [未启用]


if __name__ == '__main__':  # Python主函数执行入口
    if "TYQLDG_URL" in os.environ and "TYQLDG_TOKEN" in os.environ:  # 判断 TYQLDG_URL和TYQLDG_TOKEN是否存在于环境变量
        TYQLDG_URL = os.environ['TYQLDG_URL']
        TYQLDG_TOKEN = os.environ['TYQLDG_TOKEN']
        if TYQLDG_URL[:4]=="http" and len(TYQLDG_TOKEN) > 5:  # 判断TYQLDG_URL和TYQLDG_TOKEN是否有效
            api = requests.session()  # 设置 request session方法
            api.headers.update({"authorization": "Bearer " + os.environ['TYQLDG_TOKEN']})  # 增加 HTTP头认证
            api.headers.update({"Accept-Encoding": "gzip, deflate"})  # 增加 HTTP头认证
            api.headers.update({"Content-Type": "application/json;charset=UTF-8"})  # 增加 HTTP头 json 类型
        else:  # 判断分支
            logger.info("TYQLDG_URL或TYQLDG_TOKEN变量为空")  # 标准日志输出
            sys.exit(1)  # 脚本退出
    else:  # 判断分支
        logger.info("未添加变量TYQLDG_URL或TYQLDG_TOKEN")  # 标准日志输出
        sys.exit(0)  # 脚本退出
    ck_api='{0}/api/cookie.php?access_token={1}'.format(TYQLDG_URL,TYQLDG_TOKEN)
    tryCount = 1  # 重试次数 1次
    if "WSKEY_TRY_COUNT" in os.environ and os.environ["WSKEY_TRY_COUNT"].isdigit():  # 判断 [WSKEY_TRY_COUNT] 是否存在于系统变量 且 判断 [WSKEY_TRY_COUNT] 是否为数字
        tryCount = int(os.environ["WSKEY_TRY_COUNT"])  # 设置 [tryCount] int
    if "WSKEY_SLEEP" in os.environ and str(os.environ["WSKEY_SLEEP"]).isdigit():  # 判断变量[WSKEY_SLEEP]是否为数字类型
        sleepTime = int(os.environ["WSKEY_SLEEP"])  # 获取变量 [int]
    else:  # 判断分支
        sleepTime = 10  # 默认休眠时间 10秒
    url_t = check_cloud()  # 调用方法 [check_cloud] 并赋值 [url_t]
    cloud_arg = cloud_info()  # 调用方法 [cloud_info] 并赋值 [cloud_arg]
    update()  # 调用方法 [update]
    ua = cloud_arg['User-Agent']  # 设置全局变量 UA
    #print(cloud_arg);    
    #print(str(base64.b64decode(url_t).decode()) + 'api/genToken');sys.exit(1)  # 脚本退出
    Data = post_cookie({"ac":"list","env_name":"JD_WSCK","field":"id,uid,userName,value,up_date","state":1})
    if Data["code"]==200 :
        wskeyData=Data["data"]
        wskeyEid=Data["eid"]
        logger.info("获取WSCK共{0}个账号".format(len(wskeyData)))
    else:
        logger.info("获取出错了！")  # 标准日志输出
        logger.info(Data["msg"])
        sys.exit(0)  # 退出脚本 [未启用]
    
    Data = post_cookie({"ac":"list","env_name":"JD_COOKIE","field":"userName,value,up_date","state":1})
    ckEid=Data["eid"]
    ckData=Data["data"]
    logger.info("获取{0}个京东账号".format(len(ckData)))

    for i in range(len(wskeyData)):  # For循环 变量[wskeyData]的数量
        row=wskeyData[i]
        userName=row["userName"]
        ws=row["value"]
        if userName:
            return_serch = serch_ck(userName)  # 变量 pt_pin 搜索获取 key eid
            if return_serch[0]:  # bool: True 搜索到账号
                if not check_ck(return_serch[1]):  # bool: False 判定 JD_COOKIE 有效性
                    for count in range(tryCount):  # for循环 [tryCount]
                        count += 1  # 自增
                        return_ws = getToken(ws)  # 使用 WSKEY 请求获取 JD_COOKIE bool jd_ck
                        if return_ws[0]:  # 判断 [return_ws]返回值 Bool类型
                            break  # 中断循环
                        if count < tryCount:  # 判断循环次
                            logger.info("{0} 秒后重试，剩余次数：{1}\n".format(sleepTime, tryCount - count))  # 标准日志输出
                            time.sleep(sleepTime)  # 脚本休眠 使用变量 [sleepTime]
                    if return_ws[0]:  # 判断 [return_ws]返回值 Bool类型
                        nt_key = str(return_ws[1])  # 从 return_ws[1] 取出 -> nt_key
                        # logger.info("wskey转pt_key成功", nt_key)  # 标准日志输出 [未启用]
                        logger.info("wskey转换成功")  # 标准日志输出
                        ql_AddUp(nt_key,row["uid"])  # 调用方法 [ql_update]
                    else:  # 判断分支
                        if "WSKEY_AUTO_DISABLE" in os.environ:  # 从系统变量中获取 WSKEY_AUTO_DISABLE
                            logger.info(str(userName) + "账号失效")  # 标准日志输出
                            text = "账号: {0} WsKey疑似失效".format(userName)  # 设置推送内容
                        else:  # 判断分支
                            logger.info(str(userName) + "账号禁用")  # 标准日志输出
                            ql_disable(row["id"])  # 执行方法[ql_disable] 传递 eid
                            text = "账号: {0} WsKey疑似失效, 已禁用Cookie".format(userName)  # 设置推送内容
                            ql_send(text)
            else:  # 判断分支
                logger.info("\n新wskey\n")  # 标准日志分支
                return_ws = getToken(ws)  # 使用 WSKEY 请求获取 JD_COOKIE bool jd_ck
                if return_ws[0]:  # 判断 (return_ws[0]) 类型: [Bool]
                    logger.info("wskey转换成功\n")  # 标准日志输出 添加CK
                    ql_AddUp(str(return_ws[1]),row["uid"])  # 调用方法 [ql_insert]
            logger.info("暂停{0}秒\n".format(sleepTime))  # 标准日志输出
            time.sleep(sleepTime)  # 脚本休眠
        else:  # 判断分支
            logger.info("WSKEY格式错误\n--------------------\n")  # 标准日志输出
    logger.info("执行完成\n--------------------")  # 标准日志输出
    sys.exit(0)  # 脚本退出
    # Enjoy