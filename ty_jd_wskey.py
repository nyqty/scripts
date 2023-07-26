# -*- coding: utf-8 -*
'''
cron: 0 0-23/3,0 * * *
new Env('TY云任务-京东wskey转换');
#禁用发送消息 默认不禁用
WSKEY_SEND="disable";
#检查更新间隔设置就以更新时间来检查，没设置就检查账号是否失效，设置为数字则设置多少就隔多久，不为数字就默认为8小时
WSKEY_UPDATE_HOUR=8;
#是否检查账号有效性，设置了就不检查直接更新。上面更新时间优于本设置
WSKEY_DISCHECK
#休眠时间 20秒
WSKEY_SLEEP=20;
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
import re
from urllib.parse import quote  # 正则过滤
from utils.jdsign import get_sign,base64Encode

WSKEY_MODE = 0
CLOUD_SIGN=False

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

ver = 21212  # 版本号

def getTimestamp():
    return int(round(time.time() * 1000))

def notify_send(name,text):
    if "WSKEY_SEND" in os.environ and os.environ["WSKEY_SEND"] == 'disable':
        return True
    else:
        try:  # 异常捕捉
            res = api.post(url=notify_api,params={},data=json.dumps({"title":"WSKEY转换","message":text,"name":name,"env_name":"JD_WSCK"}))
        except Exception as err:  # 异常捕捉
            logger.debug(str(err))  # 调试日志输出
            logger.info("发信失败：TY接口错误")  # 标准日志输出
            return False
        else:  # 判断分支
            data=json.loads(res.text)
            if data["code"]==200:
                logger.info(data["msg"])
            return True

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
    if "WSKEY_UPDATE_HOUR" in os.environ:  # 判断 WSKEY_UPDATE_HOUR是否存在于环境变量
        updatedAt = Date2time(row["up_date"])
        updateHour = 8
        second = (updateHour * 60 * 60)
        if os.environ["WSKEY_UPDATE_HOUR"].isdigit():  # 检查是否为 DEC值
            updateHour = int(os.environ["WSKEY_UPDATE_HOUR"])  # 使用 int化数字
        nowTime = time.time()  # 获取时间戳 赋值
        if nowTime - updatedAt >= second:  # 判断时间操作
            logger.info("根据时间判断即将到期")  # 标准日志输出
            return False  # 返回 Bool类型 False
        else:  # 判断分支
            remainingTime = second - (nowTime - updatedAt)  # 时间运算操作
            hour = int(remainingTime / 60 / 60)  # 时间运算操作 [int]
            minute = int((remainingTime-(hour*60*60))/60)  # 时间运算操作 [int]
            logger.info("未到期，{0}时{1}分后更新".format(hour, minute))  # 标准日志输出
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
            res = requests.get(url=url, headers=headers, verify=False, timeout=10, allow_redirects=False)  # 进行 HTTP请求[GET] 超时 10秒
        except Exception as err:  # 异常捕捉
            logger.debug(str(err))  # 调试日志输出
            logger.info("JD接口错误 请重试或者更换IP")  # 标准日志输出
            return False  # 返回 Bool类型 False
        else:  # 判断分支
            if res.status_code == 200:  # 判断 JD_API 接口是否为 200 [HTTP_OK]
                code = int(json.loads(res.text)['retcode'])  # 使用 Json模块对返回数据取值 int([retcode])
                if code == 0:  # 判断 code值
                    logger.info("状态正常")  # 标准日志输出
                    return True  # 返回 Bool类型 True
                else:  # 判断分支
                    logger.info("状态失效")
                    return False  # 返回 Bool类型 False
            else:  # 判断分支
                logger.info("JD接口错误码: " + str(res.status_code))  # 标注日志输出
                return False  # 返回 Bool类型 False


# 返回值 String tokenKey
def getinfo(ws):
    headers = {
        'Charset': 'UTF-8',
        'Cookie': ws,
        #whwswswws=xncJIecKoPnlO-YpOikDFUZiZqhzkB4faNJC-JHnwMr-6QPne_8dF4J3XyjwP8kjJI5w1qP_fyJzqcqd7hAsCQUojf2TCPxhRYvpZQr7uPKd5Om-u-YRnWr3gP_c-K6kc6MGzqH3m6izlG0X73Xc4AQ;
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 13; 22081212C Build/TKQ1.220829.002)',
        'Host': 'blackhole.m.jd.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
    }  # 设置 HTTP头
    url = 'https://blackhole.m.jd.com/getinfo'  # 设置 URL地址
    data = {
        'content':'{"appname":"com.jingdong.app.mall_com.jma.track","whwswswws":"xncJIecKoPnlO-YpOikDFUZiZqhzkB4faNJC-JHnwMr-6QPne_8dF4J3XyjwP8kjJI5w1qP_fyJzqcqd7hAsCQUojf2TCPxhRYvpZQr7uPKd5Om-u-YRnWr3gP_c-K6kc6MGzqH3m6izlG0X73Xc4AQ","jdkey":"jidwhzqalpkLS0xOTExOWVlODFkYTFkNDJiLWE2N2I5NThjOTY2NDE4NTQ3MTFmNGMzZmQ5ODI5Y2U5MDhjMDI=","installtionid":"1115df9317d0467ba176b43f116901bd","appid":"100","dataset":["alterationinfo","fixedinfo"],"sdkversion":"2.5.9","clientversion":"12.0.8","client":"android","body":{"appsign":"android_12.0.8_4fbb30eb7b7166119bd25e41eddeee2f","head":"rJwv3A4TkfE4ZobmMKA11Gen6pHF6V7iFH+P\/Xzapw+n0TDAxcdetP0FfaQwyUUDqeYF3MXHXrHnPX3If9hPM6DY3pLF8V78","info":"x3sizMCFKTtFXYdsyBI6nEd6SCDL81+dvS5Hw5Z2KBtEH3tMW1\/4l3Lk2zDklV06s4cgs78\/maF28MPsKOoqkaYBApWpncWu1FbVrpb5tLqm6JGRcv2K3lLOseTHVNa23TKQJVYYxFbrbqNvGyWp4MJu6hteO42SM1\/lCM1+vVB6+NzlnkQwfoKzp\/fQSN15Emlz6mj6tbagcXNcgxAtqRyKgrGfypOD3OTdSUHEIK8ZJ7DL6ZSHiN\/x9IEIKtdcTiDpGSlnnzP2CouKZatibHWEgl2BdgF6\/nEHGoydIJEhKrkiypaHDF+7dCQVDHOsMNweF5IHcBI3+e6KER01RGc9PfR\/Hpfd6ilOy\/MhcLR+xjIQNv7ssEzsg3+CfzpzXDfCJ900DvXAF0aiT6xV\/0nSgB6dY47+7xZvmBcEsMUKhakev3gzeM707QuL28mIov3lPeHgDxtb7Ulu7Jhq9saMLBW4OORp\/XOeEOgzEOxyvir+1QQd80L76CFFkfCcuJCgpLkxfKcb9440Uqs1JkDdinKhc7s64uhrLNa4xOCDbEN5e5cg0Wstnork6TYCO43zmho="}}'
    }
    try:  # 异常捕捉
        res = requests.post(url=url, headers=headers, data=data, verify=False,timeout=10)  # HTTP请求 [POST] 超时 10秒
        res_json = json.loads(res.text)  # Json模块 取值
        if res_json["code"]==0:
            return res_json["whwswswws"]
    except Exception as err:  # 异常捕捉
        logger.info("getinfo 接口抛出错误")  # 标准日志输出
        logger.info(str(err))  # 标注日志输出
        return False
    else:  # 判断分支
        return False
    
# 返回值 False[Bool], Wskey
def genToken(wskey,userName):  # 方法 获取 Wskey转换使用的 Token 由 JD_API 返回 这里传递 wskey
    headers = {
        'Host': 'api.m.jd.com',
        'cookie': wskey,#f'whwswswws=~{whwswswws};'
        'j-e-c': quote('{"hdid":"JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=","ts":'+str(getTimestamp())+',"ridx":-1,"cipher":{"pin":"'+base64Encode(quote(userName))+'"},"ciphertype":5,"version":"1.2.0","appname":"com.jingdong.app.mall"}'),
        'x-rp-client': 'android_2.0.0',
        'user-agent': 'okhttp/3.12.16;jdmall;android;version/12.0.8;build/98854;',#98275
        'x-referer-package': 'com.jingdong.app.mall',
        'charset': 'UTF-8',
        'x-referer-page': 'com.jingdong.app.mall.main.MainActivity',
        'accept-encoding': 'br,gzip,deflate',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }# 设置 HTTP头
    body={"to":"https%3a%2f%2fplogin.m.jd.com%2fjd-mlogin%2fstatic%2fhtml%2fappjmp_blank.html"}
    if CLOUD_SIGN:
        try:  # 异常捕捉
            url = str(base64.b64decode(url_t).decode()) + 'api/genToken'  # 设置云端服务器地址 路由为 genToken
            header = {"User-Agent": ua}  # 设置 HTTP头
            params = requests.get(url=url, headers=header, verify=False, timeout=20).json()  # 设置 HTTP请求参数 超时 20秒 Json解析
        except Exception as err:  # 异常捕捉
            logger.info("Params参数获取失败")  # 标准日志输出
            logger.debug(str(err))  # 调试日志输出
            return False, wskey  # 返回 -> False[Bool], Wskey
    else:
        SDate=get_sign("genToken",body,"android","12.0.8")
        params=SDate["data"]
        ua=f"jdapp;android;12.0.8;;;M/5.0;appBuild/98854;ef/1;ep/{SDate['data']['ep']};Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046247 Mobile Safari/537.36"
        up={
            'build': '98854',#97565
            'partner': 'google',#xiaomi001
            'oaid': params["uuid"],
            'sdkVersion': '33',
            'lang': 'zh_CN', 'harmonyOs': '0', 'networkType': 'wifi', 
            'uemps': '0-2', 
            'avifSupport':1,
            'ext': '{"prstate":"0","pvcStu":"1","cfgExt":"{\"privacyOffline\":\"0\"}"}', 
        }
        params={**params,**up}

    url = 'https://api.m.jd.com/client.action'  # 设置 URL地址
    try:  # 异常捕捉
        res = requests.post(url=url, params=params, headers=headers, data=f'body={body}&', verify=False,
                            timeout=10)  # HTTP请求 [POST] 超时 10秒
        res_json = json.loads(res.text)  # Json模块 取值
        tokenKey = res_json['tokenKey']  # 取出TokenKey
    except Exception as err:  # 异常捕捉
        logger.info("JD_WSKEY接口抛出错误 尝试重试 更换IP")  # 标准日志输出
        logger.info(str(err))  # 标注日志输出
        return False, wskey  # 返回 -> False[Bool], Wskey
    else:  # 判断分支
        return appjmp(wskey, tokenKey)  # 传递 wskey, Tokenkey 执行方法 [appjmp]


# 返回值 True[Bool], jd_ck
def appjmp(wskey, tokenKey):  # 方法 传递 wskey & tokenKey
    wskey = "pt_" + str(wskey.split(";")[0])  # 变量组合 使用 ; 分割变量 拼接 pt_
    if tokenKey == 'xxx':  # 判断 tokenKey返回值
        logger.info(str(wskey) + ";疑似IP风控等问题 默认为失效\n--------------------\n")  # 标准日志输出
        return False, wskey  # 返回 -> False[Bool], Wskey
    headers = {
        'upgrade-insecure-requests': '1',
        'user-agent': ua,
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,image/tpg,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'x-requested-with': 'com.jingdong.app.mall',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
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
                logger.info("WsKey状态失效")  # 标准日志输出
                return False, wskey  # 返回 -> False[Bool], Wskey
            else:  # 判断分支
                logger.info("WsKey状态正常")  # 标准日志输出
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
            return True, row  # 返回 -> True[Bool], Array
    return False, row


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
    url_list = ['aHR0cHM6Ly9hcGkubW9tb2UubWwv', 'aHR0cHM6Ly9hcGkubGltb2UuZXUub3JnLw==', 'aHR0cHM6Ly9hcGkuaWxpeWEuY2Yv']  # URL list Encode
    for i in url_list:  # for循环 url_list
        url = str(base64.b64decode(i).decode())  # 设置 url地址 [str]
        try:  # 异常捕捉
            requests.get(url=url, verify=False, timeout=10)  # HTTP[GET]请求 超时 10秒
        except Exception as err:  # 异常捕捉
            logger.debug(str(err))  # 调试日志输出
            continue  # 循环继续
        else:  # 分支判断
            info = ['HTTPS', 'Eu_HTTPS', 'CloudFlare']  # 输出信息[List]
            logger.info(str(info[url_list.index(i)]) + " Server Check OK\n--------------------\n")  # 标准日志输出
            return i  # 返回 ->i
    logger.info("\n云端地址全部失效, 请检查网络!")  # 标准日志输出
    ql_send('云端地址失效. 请联系作者或者检查网络.')  # 推送消息
    return False
    sys.exit(1)  # 脚本退出


def Date2time(t):  # 方法 获取url
    s_t = time.strptime(t, "%Y-%m-%d %H:%M:%S")  # 返回元祖
    return int(time.mktime(s_t))

def ql_disable(id):
    Data = post_cookie({"ac":"state","id":id,"state":0})
    logger.info(Data["msg"])


def ql_AddUp(uid,ws,userName):
    for count in range(tryCount):  # for循环 [tryCount]
        count += 1  # 自增
        return_ws = genToken(ws,userName)  # 使用 WSKEY 请求获取 JD_COOKIE bool jd_ck
        if return_ws[0]:  # 判断 [return_ws]返回值 Bool类型
            break  # 中断循环
        if count < tryCount:  # 判断循环次
            logger.info("{0} 秒后重试，剩余次数：{1}".format(sleepTime, tryCount - count))  # 标准日志输出
            time.sleep(sleepTime)  # 脚本休眠 使用变量 [sleepTime]
    if return_ws[0]:  # 判断 [return_ws]返回值 Bool类型
        nt_key = str(return_ws[1])  # 从 return_ws[1] 取出 -> nt_key
        logger.info("wskey转换成功")  # 标准日志输出
        Data = post_cookie({"ac":"addUp","check":True,"eid":ckEid,"uid":uid,"value":nt_key,"nickName":""})
        logger.info(Data["msg"])
    else:  # 判断分支
        if "WSKEY_AUTO_DISABLE" in os.environ:  # 从系统变量中获取 WSKEY_AUTO_DISABLE
            logger.info("{0}  账号失效".format(userName))  # 标准日志输出
            text = "账号: {0} WsKey疑似失效".format(userName)  # 设置推送内容
        else:  # 判断分支
            logger.info("{0}  账号禁用".format(userName))  # 标准日志输出
            ql_disable(row["id"])  # 执行方法[ql_disable] 传递 eid
            text = "账号: {0} WsKey疑似失效, 已禁用Cookie".format(userName)  # 设置推送内容
            notify_send(userName,text)
            #ql_send(text)
    logger.info("暂停{0}秒\n".format(sleepTime))  # 标准日志输出
    time.sleep(sleepTime)  # 脚本休眠


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
        #sys.exit(0)  # 脚本退出

    notify_api='{0}/api/notify.php?access_token={1}'.format(TYQLDG_URL,TYQLDG_TOKEN)
    ck_api='{0}/api/cookie.php?access_token={1}'.format(TYQLDG_URL,TYQLDG_TOKEN)
    tryCount = 1  # 重试次数 1次
    if "WSKEY_TRY_COUNT" in os.environ and os.environ["WSKEY_TRY_COUNT"].isdigit():  # 判断 [WSKEY_TRY_COUNT] 是否存在于系统变量 且 判断 [WSKEY_TRY_COUNT] 是否为数字
        tryCount = int(os.environ["WSKEY_TRY_COUNT"])  # 设置 [tryCount] int
    if "WSKEY_SLEEP" in os.environ and str(os.environ["WSKEY_SLEEP"]).isdigit():  # 判断变量[WSKEY_SLEEP]是否为数字类型
        sleepTime = int(os.environ["WSKEY_SLEEP"])  # 获取变量 [int]
    else:  # 判断分支
        sleepTime = 20  # 默认休眠时间 20秒
    if CLOUD_SIGN:
        url_t = check_cloud()  # 调用方法 [check_cloud] 并赋值 [url_t]
        cloud_arg = cloud_info()  # 调用方法 [cloud_info] 并赋值 [cloud_arg]
        update()  # 调用方法 [update]
        ua = cloud_arg['User-Agent']  # 设置全局变量 UA
    else:
        ua='jdapp;android;12.0.8;;;M/5.0;appBuild/98854;Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046247 Mobile Safari/537.36'
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
    logger.info("获取{0}个京东账号\n--------------------\n".format(len(ckData)))

    for i in range(len(wskeyData)):  # For循环 变量[wskeyData]的数量
        row=wskeyData[i]
        userName=row["userName"]
        ws=row["value"]#pin 如果是中文的要编码才行
        if userName:
            logger.info("\n账号{0} {1}".format(i+1,userName))  # 标准日志输出
            return_serch = serch_ck(userName)  # 变量 pt_pin 搜索获取 key eid
            if return_serch[0]:  # bool: True 搜索到账号
                logger.info("检索成功")
                if not check_ck(return_serch[1]):  # bool: False 判定 JD_COOKIE 有效性
                    ql_AddUp(row["uid"],ws,userName)
            else:  # 判断分支
                logger.info("更新账号ck")  # 标准日志分支
                ql_AddUp(row["uid"],ws,userName)
        else:  # 判断分支
            logger.info("WSKEY格式错误\n--------------------\n")  # 标准日志输出
    logger.info("\n执行完成\n--------------------")  # 标准日志输出
    sys.exit(0)  # 脚本退出
    # Enjoy