# -*- coding:utf-8 -*-
"""
作者：atyvcn
多个&隔开
export DYJ_CashPin="需要提现的pin值"
export DYJ_NotCash="不提现的金额"
cron: 50 16,23 * * *
new Env('赚钱大赢家-定时提现');
TY在原作者(doubi)基础上删减更改，优化提取

17【赚钱大赢家】海量低价好物  http:/JCFwCHKcjf3l1H复制这段话￥A8tNOCPQkw3B%↦【鯨▻𝓧𝒾特价】
"""

import os
import re
import sys
import time
import uuid
import json
import random
import logging
import requests
import traceback
from hashlib import sha1,md5
import base64
from urllib.parse import quote_plus, unquote_plus, quote
import threading

activity_name = "京东特价版-赚钱大赢家-定时提现"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)03d %(message)s",#%(levelname)s %(lineno)d 
    datefmt="%M:%S"
)
logger = logging.getLogger(activity_name)
index = 0
h5st_appid = 'd06f1'
appCode = 'ms2362fc9e'
activeId = '63526d8f5fe613a6adb48f03'
not_tx=[]
cashExchangeRuleList=[
    {'id': '1848d61655f979f8eac0dd36235586ba', 'name': '0.3元现金', 'exchangeStatus': 1, 'cashoutAmount': '0.3'},
    {'id': 'dac84c6bf0ed0ea9da2eca4694948440', 'name': '1元现金', 'exchangeStatus': 1, 'cashoutAmount': '1'},
    {'id': '53515f286c491d66de3e01f64e3810b2', 'name': '现金奖励3元', 'exchangeStatus': 1, 'cashoutAmount': '3'},
    {'id': 'da3fc8218d2d1386d3b25242e563acb8', 'name': '8元现金', 'exchangeStatus': 1, 'cashoutAmount': '8'},
    {'id': '7ea791839f7fe3168150396e51e30917', 'name': '20元现金', 'exchangeStatus': 1, 'cashoutAmount': '20'},
    {'id': '02b48428177a44a4110034497668f808', 'name': '100元现金', 'exchangeStatus': 1, 'cashoutAmount': '100'}
]

def getTimestamp():
    return int(round(time.time() * 1000))

string1 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/"
string2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

def get_ep(jduuid : str=''):
    if not jduuid:
        jduuid = ''.join(str(uuid.uuid4()).split('-'))
    ts = str(getTimestamp())
    return '{"hdid":"JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=","ts":%s,"ridx":-1,"cipher":{"sv":"CJC=","ad":"ZWOyD2YnDNU0ENC4C2YnEK==","od":"DNS5YwG5DQSnD2YyEQHuDG==","ov":"CzC=","ud":"ZWOyD2YnDNU0ENC4C2YnEK=="},"ciphertype":5,"version":"1.2.0","appname":"com.jd.jdlite"}' % (
        int(ts) - random.randint(100, 1000)), jduuid, ts

def base64Encode(string):
    return base64.b64encode(string.encode("utf-8")).decode('utf-8').translate(str.maketrans(string1, string2))

class Userinfo:
    cookie_obj = []
    index = 0
    def __init__(self, cookie):
        global index
        index += 1
        self.user_index = index
        ep, self.uuid, st = get_ep()
        #58210751877731116
        try:
            self.name = unquote_plus(re.findall(r'pt_pin=([^; ]+)(?=;?)', cookie)[0])
        except Exception:
            logger.info(f"取值错误['pt_pin']：{traceback.format_exc()}")
            return
        #jdltapp;android;4.8.0;;;appBuild/2384;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1675835201639%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJC%3D%22%2C%22ad%22%3A%22ZWOyD2YnDNU0ENC4C2YnEK%3D%3D%22%2C%22od%22%3A%22DNS5YwG5DQSnD2YyEQHuDG%3D%3D%22%2C%22ov%22%3A%22CzC%3D%22%2C%22ud%22%3A%22ZWOyD2YnDNU0ENC4C2YnEK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jd.jdlite%22%7D;Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046129 Mobile Safari/537.36
        self.UA = f'jdltapp;android;4.6.0;;;appBuild/2374;ef/1;ep/{quote(json.dumps(ep))};Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.97 Mobile Safari/537.36'
        #jdltapp;android;4.9.0;;;appBuild/2394;ef/1;ep/;Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36
        self.cookie = cookie
        Userinfo.cookie_obj.append(self)
        self.sha = sha1(str(self.name).encode('utf-8')).hexdigest()
        self.headers = {
            "Host": "api.m.jd.com",
            "User-Agent": self.UA,
            "content-type": "text/plain",
            "Accept":"*/*",
            "origin": "https://wqs.jd.com",
            "x-requested-with": "com.jd.jdlite",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://wqs.jd.com/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",       
            "Cookie": self.cookie + f"; appCode={appCode}; sid={self.sha}; visitkey={self.uuid}",
        }
        self.stockPersonDayLimit=-1
        self.stockPersonDayUsed=0
        self.canUseCoinAmount=0
        #print(self.name)

    def getHome(self):
        body={"activeId":activeId,"isFirst":1,"operType":1}
        h5st="20221202224421183%3B5zi6yg6hy6dijtc6%3B638ee%3Btk02waef91cf118n77Hw3bHueBsVVy52Wbcx9h4HMPM7fpi9ntRoot7vaa118bRqqEnduYVLqW8kyzHpNsDp5PtrZ8tJ%3B8e13afd153316da1c4878705d9e1f17b27db283c%3B400%3B1669992261183%3Bf28308408a6bad45ead939c02e9cf1e489ad7a120db68c73bdee607bdb6db9daaf6fd9e2d4b87320f4ec869d11fb7fa97ea7bffc29059dfb373214547287d0a2f8d2de03200d84c4776d0464313a08e3488339db94ee9194cfb8237a7678d9020d0c6d9df83ea6c18193626f396ff6f9d41ff0a831b19868640ee15d264ac55bdd144f2a8323f8168cb761f298ab19b00bc20f917401a5f65df079011591dba83f9ee65e3fc211cbadb9211443680603";
        url = f'https://api.m.jd.com/api?g_ty=h5&g_tk=&appCode={appCode}&body={quote(json.dumps(body))}&appid=jdlt_h5&client=jxh5&functionId=makemoneyshop_home&clientVersion=1.2.5&h5st={h5st}&loginType=2&sceneval=2'
        try:
            res = requests.get(url=url, headers=self.headers,proxies={},timeout=2).text
            try:
                res = json.loads(res)
                if res['code'] == 0:#res.data
                    return True
                else:
                    print(res)
            except Exception as e:
                logger.info(f"{self.name}api解析异常：{str(e)}")
        except Exception as e:
            logger.info(f"{self.name}api超过2s请求超时...")
        return False

    def Query(self):
        t=getTimestamp()
        body={"activeId":activeId,"sceneval":2,"buid":325,"appCode":appCode,"time":t,"signStr":""}
        str="functionId=%s&body=%s&uuid=%s&client=%s&clientVersion=%s&st=%s" % ("makemoneyshop_exchangequery", body, base64Encode(self.uuid), "jxh5", "1.2.5", t)
        body["signStr"]=md5(str.encode(encoding='UTF-8')).hexdigest()#12ce5fc966da1cd10a41bebbca10b38b
        url = f'https://api.m.jd.com/api?functionId=makemoneyshop_exchangequery&appid=jdlt_h5&t={t}&channel=jxh5&cv=1.2.5&clientVersion=1.2.5&client=jxh5&uuid={self.uuid}&cthr=1&loginType=2&body={quote(json.dumps(body))}'
        try:
            res = requests.get(url=url, headers=self.headers,proxies={},timeout=2).text
            try:
                res = json.loads(res)
                if res['code'] == 0:
                    self.stockPersonDayLimit=int(res['data']['stockPersonDayLimit'])#用户日库存限额
                    self.stockPersonDayUsed=int(res['data']['stockPersonDayUsed'])#用户今天兑换多少次
                    self.canUseCoinAmount = float(res['data']['canUseCoinAmount'])
                    logger.info(f"用户“{self.name}”余额[{self.canUseCoinAmount}]元")
                    return res['data']['cashExchangeRuleList']
                else:
                    #{"code": 147, "msg": "活动太火爆，请稍后再试！"}
                    logger.info(f"用户“{self.name}”查询余额失败：{res['msg']}")#json.dumps(res)
                    #print(res)
            except Exception as e:
                logger.info(f"{self.name}查询余额解析异常：{str(e)}")
        except Exception as e:
            logger.info(f"{self.name}查询余额超过2s请求超时...")
        return []

    def CashOut(self):
        global loop,not_tx,cashExchangeRuleList
        print("")
        logger.info(f"{self.name}提现")
        if self.stockPersonDayUsed>=self.stockPersonDayLimit and self.stockPersonDayLimit!=-1:
            logger.info(f"当前提现次数已经达到上限[{self.stockPersonDayLimit}]次")
        #elif 'exchangeRecordList' in res['data']:logger.info(f"已有提现进行中，请等待完成！")
        else:
            get=False
            i=len(cashExchangeRuleList)
            while i>0:#for data in cashExchangeRuleList[::-1]:#倒序
                i-=1
                data=cashExchangeRuleList[i]
                if data['exchangeStatus']==1:
                    if self.canUseCoinAmount >= float(data['cashoutAmount']) or self.stockPersonDayLimit==-1:
                        if float(data['cashoutAmount']) not in not_tx:
                            logger.info(f"当前余额[{self.canUseCoinAmount}]元,开始尝试提现[{data['cashoutAmount']}]")
                            #self.headers["Host"]="wq.jd.com"
                            #url = f'https://wq.jd.com/prmt_exchange/client/exchange?g_ty=h5&g_tk=&appCode={appCode}&bizCode=makemoneyshop&ruleId={data["id"]}&sceneval=2'
                            body={"bizCode":"makemoneyshop","ruleId":data["id"],"sceneval":2,"buid":325,"appCode":appCode,"time":getTimestamp(),"signStr":""}
                            url = f'https://api.m.jd.com/api?functionId=jxPrmtExchange_exchange&appid=cs_h5&body={quote(json.dumps(body))}'
                            proxies={}
                            try:
                                if get:time.sleep(0.5)
                                else:get=True
                                res = requests.get(url=url, headers=self.headers,proxies=proxies,timeout=2)
                                try:
                                    exchange = json.loads(res.text)
                                    if exchange['ret'] == 0:
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}成功")
                                        break
                                    elif exchange['ret'] == 223:#积分不足
                                        logger.info(f"{self.name}兑换{data['cashoutAmount']}红包失败:{exchange['msg']}")
                                    elif int(exchange['ret']) in [224,232]:#库存不足|日库存不足
                                        cashExchangeRuleList[i]['exchangeStatus']=4
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}失败:{exchange['msg']}")
                                    elif int(exchange['ret']) in [248,103]:#操作过快，请稍后重试|jimDB操作异常
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}失败:{exchange['msg']}")
                                        logger.info(f"等待1s，后将重试。")
                                        i+=1
                                        time.sleep(0.5)
                                    elif int(exchange['ret']) in [246,604]:#达到个人日兑换上限|已有提现进行中，等待完成
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}失败:{exchange['msg']}")
                                        break
                                    else:
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}失败{exchange['ret']}:{exchange['msg']}")
                                except Exception as e:
                                    logger.info(f"{self.name}提现{data['cashoutAmount']}失败解析异常：{str(e)}")
                                    print(res)
                            except Exception as e:
                                logger.info(f"{self.name}提现{data['cashoutAmount']}失败:超过2s请求超时...")
                                get=False
                        else:
                            logger.info(f"当前余额[{self.canUseCoinAmount}]元,不提现[{not_tx}]门槛")
                            if i==0:loop=False
                    #else:logger.info(f"当前余额[{self.canUseCoinAmount}]元,不足提现[{data['cashoutAmount']}]门槛")
                elif data['exchangeStatus']==2:
                    logger.info(f"{self.name},来晚了咯{data['name']}都被抢光了")
                    if i==0:loop=False
                elif data['exchangeStatus']==3:logger.info(f"{self.name},{data['name']}已兑换")
                elif data['exchangeStatus']==4:
                    logger.info(f"{self.name},{data['name']}已抢光")
                    if i==0:loop=False
                else:logger.info(f"{self.name}未知状态：{data}")

def main():
    try:
        cookies = os.environ['JD_COOKIE'].split('&')
    except:
        with open(os.path.join(os.path.dirname(__file__), 'cklist.txt'), 'r') as f:
            cookies = f.read().split('\n')
    helpPin = os.environ.get('DYJ_CashPin', "")
    if helpPin == "":
        logger.info('您尚未设置变量 DYJ_CashPin="pin1&pin2&pin3"')
        sys.exit()
    try:
        helpPin = helpPin.split('&')
    except:
        logger.info("DYJ_CashPin 变量设置错误，pin1&pin2&pin3")
        sys.exit()
    global not_tx
    not_tx = os.environ.get('DYJ_NotCash', "")
    if not_tx == "":
        logger.info('您尚未设置变量 DYJ_NotCash="金额1&金额2&金额3"\n默认不提现0.3和1还有3，相当于 export DYJ_NotCash="0.3&1&3"')
        not_tx = "0.3&1&3"
    try:
        not_tx = not_tx.split('&')
        logger.info(f"不提现：[{not_tx}]")
        not_tx = [float(item) for item in not_tx]
    except:
        logger.info("DYJ_NotCash变量设置错误，金额1&金额2&金额3")

    [Userinfo(cookie) for cookie in cookies]
    CashOutList = ([cookie_obj for cookie_obj in Userinfo.cookie_obj for name in helpPin if name in cookie_obj.name])
    #logger.info(f"helpPin:{helpPin}")
    if not CashOutList:
        logger.info(f"没有找到用户:{helpPin}")
        sys.exit()
    Users=[]
    NotUserList=helpPin
    for e in CashOutList:
        if e.name in helpPin:
            Users.append(e.name)
            NotUserList.remove(e.name)
    if len(Users):logger.info(f"找到用户[{len(Users)}]:{Users}")
    if len(NotUserList):logger.info(f"没有找到用户[{len(NotUserList)}]:{NotUserList}")
    random.shuffle(CashOutList)#随机排序
    
    print("")
    logger.info(f"开始查询提现用户余额信息")
    
    c=len(CashOutList)
    i=0
    for e in CashOutList:
        i+=1
        ##if e.getHome()==True:#print('白号')
        time.sleep(1)
        e.Query()
        #else:
            #print(f'e.name 出错，跳过提现')
        if i!=c:
            if c>2:
                logger.info(f"等待15秒查询下一个")
                time.sleep(15)
            elif c>1:
                logger.info(f"等待3秒查询下一个")
                time.sleep(3)

    print("")
    unit = 18e5
    current_time = getTimestamp()
    nextHourStamp = current_time - ( current_time % unit ) + unit
    #nextHourStamp = current_time+1000
    nextHour=time.strftime("%H:%M:%S", time.localtime(nextHourStamp/1000))
    logger.info(f"开始等待{nextHour}提现")
    global loop,cashExchangeRuleList
    loop=True
    while 1:
        current_time = getTimestamp()
        if current_time >= nextHourStamp:
            if nextHour!="00:00:00":
                SERL=[]
                logger.info(f"开始查询库存")
                for e in CashOutList:
                    SERL=e.Query()
                    if len(SERL)>0:
                        cashExchangeRuleList=SERL
                        logger.info("查询成功")
                    else:
                        logger.info(f"查询失败,强制提现{len(cashExchangeRuleList)}个")
                    break

            print("")
            logger.info(f"开始提现")
            tdList = []
            for e in CashOutList:tdList.append(threading.Thread(target=e.CashOut, args=()))
            for tdItem in tdList:
                if loop:
                    try:
                        tdItem.start()
                        time.sleep(0.2) #0.2 秒一个
                    except Exception as e:
                        logger.info(f'提现异常：{str(e)}')
                else:
                    logger.info(f"最后一个也没得咯，多线程提前结束！")
                    break
            break
        #else: printf("等待开始...")
        time.sleep(0.01)
    #time.sleep(round(random.uniform(0.7, 1.3), 2))

if __name__ == '__main__':
    main()