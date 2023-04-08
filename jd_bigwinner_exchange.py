# -*- coding:utf-8 -*-
"""
说明：默认提现和兑换红包
作者：atyvcn
指定用户只提现或者只兑换红包就在pin后面用“:”分隔，用“all”表示全部金额，参考“pin:不提现金额:不兑换红包金额”设置，多个金额用“,”
export DYJ_Pin="需要兑换的pin值多个用&"
export DYJ_NotCash="不提现的金额多个参数用&或,"
export DYJ_NotRed="不兑换红包的金额多个参数用&或,"
cron: 50 9,11,16,23 * * *
new Env('赚钱大赢家-定时兑换');
TY在原作者(doubi)基础上删减更改，优化提取

入口 京喜特价 百元生活费 赚钱大赢家
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
from utils.h5st31 import h5st31

activity_name = "京喜特价-赚钱大赢家-定时兑换"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)03d %(message)s",#%(levelname)s %(lineno)d 
    datefmt="%M:%S"
)
logger = logging.getLogger(activity_name)
index = 0
retry=3
appCode = 'ms2362fc9e'
activeId = '63526d8f5fe613a6adb48f03'
NotCash=[]
NotRed=[]

hbExchangeRuleList=[
    {"id":"f7a42f19c8d17c6ff1229808ecd57292","name":"0.5元红包","exchangeStatus":1,"consumeScore":"0.50","cashoutAmount":"0.5"},
    {"id":"d29967608439624bd4688e06254b6374","name":"1元红包","exchangeStatus":1,"consumeScore":"1.00","cashoutAmount":"1"},
    #{"id":"c14b645cabaa332a883cc5f43a9dd2b7","name":"3元红包","exchangeStatus":1,"consumeScore":"3.00","cashoutAmount":"3"},
    {"id":"006d8d0f371e247333a302627af7da00","name":"5元红包","exchangeStatus":1,"consumeScore":"5.00","cashoutAmount":"5"},
    {"id":"49995b2a611f5281c06d7b227ac54e09","name":"8元红包","exchangeStatus":1,"consumeScore":"8.00","cashoutAmount":"8"},
    {"id":"018300fea81b5bf3f1cad271f7bcfda7","name":"20元红包","exchangeStatus":1,"consumeScore":"20.00","cashoutAmount":"20"}
]
cashExchangeRuleList=[
    {"id":"1848d61655f979f8eac0dd36235586ba","name":"0.3元现金","exchangeStatus":1,"consumeScore":"0.30","cashoutAmount":"0.3"},
    {"id":"dac84c6bf0ed0ea9da2eca4694948440","name":"1元现金","exchangeStatus":1,"consumeScore":"1.00","cashoutAmount":"1"},
    {"id":"53515f286c491d66de3e01f64e3810b2","name":"现金奖励3元","exchangeStatus":1,"consumeScore":"3.00","cashoutAmount":"3"},
    {"id":"da3fc8218d2d1386d3b25242e563acb8","name":"8元现金","exchangeStatus":1,"consumeScore":"8.00","cashoutAmount":"8"},
    {"id":"7ea791839f7fe3168150396e51e30917","name":"20元现金","exchangeStatus":1,"consumeScore":"20.00","cashoutAmount":"20"},
    {"id":"02b48428177a44a4110034497668f808","name":"100元现金","exchangeStatus":1,"consumeScore":"100.00","cashoutAmount":"100"}
]
LastQueryTime=1680932241451
loop={1:True,2:True}

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

def get_pin(cookie):
    return unquote_plus(re.findall(r'pt_pin=([^; ]+)(?=;?)', cookie)[0])

def resetState(type=2,ac=1):
    global cashExchangeRuleList,hbExchangeRuleList
    i=len(cashExchangeRuleList if type==2 else hbExchangeRuleList)
    while i>0:
        i-=1
        data=cashExchangeRuleList[i] if type==2 else hbExchangeRuleList[i]
        if ac==1: ok=data['exchangeStatus']!=1
        else:ok=data['exchangeStatus']==3 or data['exchangeStatus']==4
        if ok:
            if type==2:cashExchangeRuleList[i]['exchangeStatus']=1
            else:hbExchangeRuleList[i]['exchangeStatus']=1

class Userinfo:
    index = 0
    def __init__(self, cookie,Not):
        global index
        index += 1
        self.user_index = index
        ep, self.uuid, st = get_ep()
        #58210751877731116
        try:
            self.name = get_pin(cookie)
        except Exception:
            logger.info(f"取值错误['pt_pin']：{traceback.format_exc()}")
            return
        self.Not=Not
        #jdltapp;android;4.8.0;;;appBuild/2384;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1675835201639%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJC%3D%22%2C%22ad%22%3A%22ZWOyD2YnDNU0ENC4C2YnEK%3D%3D%22%2C%22od%22%3A%22DNS5YwG5DQSnD2YyEQHuDG%3D%3D%22%2C%22ov%22%3A%22CzC%3D%22%2C%22ud%22%3A%22ZWOyD2YnDNU0ENC4C2YnEK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jd.jdlite%22%7D;Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046129 Mobile Safari/537.36
        self.UA = f'jdltapp;android;4.6.0;;;appBuild/2374;ef/1;ep/{quote(json.dumps(ep))};Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.97 Mobile Safari/537.36'
        #jdltapp;android;4.9.0;;;appBuild/2394;ef/1;ep/;Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36
        self.cookie = cookie
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
        self.valid=True

        self.LastQueryTime=0
        self.cashExchangeRuleList=[]
        self.hbExchangeRuleList=[]
        #print(self.name)

    def getHome(self):
        #t=getTimestamp()
        t=1679328409259
        body={"activeId":activeId,"isFirst":0,"visitChannel":1,"sceneval":2,"buid":325,"appCode":appCode,"time":t,"signStr":"5368dcae5888b1c3c10c294d5ecabca5"}
        uuid='7032320889511194760'
        h5st="20230321000649319%3B3511412639154514%3B638ee%3Btk02wbf501c7118nt4Hq7vwKnYIfe4Wrxq2Ydk4aaFh9sC2XfUT%2BovBV8dYmLXz9ki%2FM%2BfkTiiDlQXrCQyHZeP%2BcLKKX%3Bd3633724d9fa6787469f6a99745086a388f1d7cf9611604f308340355b48f6fb%3B3.1%3B1679328409319%3B62f4d401ae05799f14989d31956d3c5fe48e6438a35ea5b8b8d12ecf8c7f7c07712a08d6f8fe670c8b04cdb873be6623efd95a79a8f1d6b344a8e15f4961df8e5186840e5cddf6049f64b4d68b150fb9fc05a42a62f933d59c3e351607c9397b06cc1824c6ff68e816fe7dbc493d6c097c7c8a08666819ebf484a183c2d28eac5b142ffc3cc63e5860c804d2263874af";
        url = f'https://api.m.jd.com/api?functionId=makemoneyshop_home&appid=jdlt_h5&t={t}&channel=jxh5&cv=1.2.5&clientVersion=1.2.5&client=jxh5&uuid={uuid}&cthr=1&loginType=2&body={quote(json.dumps(body))}&h5st={h5st}'
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
        t=1680927011146#getTimestamp()
        body={"activeId":activeId,"visitChannel":1,"sceneval":2,"buid":325,"buid":325,"appCode":appCode,"time":t,"signStr":"afc721262c3400c3da0346aebc4ab858"}
        #str="functionId=%s&body=%s&uuid=%s&client=%s&clientVersion=%s&st=%s" % ("makemoneyshop_exchangequery", body, base64Encode(self.uuid), "jxh5", "1.2.5", t)
        #body["signStr"]=md5(str.encode(encoding='UTF-8')).hexdigest()
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
                    if self.canUseCoinAmount<0.3:self.valid=False
                    self.LastQueryTime=getTimestamp()
                    self.cashExchangeRuleList=res['data']["cashExchangeRuleList"]
                    self.hbExchangeRuleList=res['data']["hbExchangeRuleList"]
                    return True
                else:
                    #{"code": 147, "msg": "活动太火爆，请稍后再试！"}
                    logger.info(f"用户“{self.name}”查询余额失败：{res['msg']}")#json.dumps(res)
                    #print(res)
            except Exception as e:
                logger.info(f"{self.name}查询余额解析异常：{str(e)}")
        except Exception as e:
            logger.info(f"{self.name}查询余额超过2s请求超时...")
        return False

    def ExchangeList(self,exchangeType=1):#1 红包 2现金
        global loop,NotCash,NotRed,cashExchangeRuleList,hbExchangeRuleList,retry
        if loop[exchangeType]==False:return False
        print("")
        if exchangeType==1:
            Tname="红包"
            NowNot=list(set(NotRed+self.Not["red"]))
            i=len(hbExchangeRuleList)
        else:
            Tname="现金"
            NowNot=list(set(NotCash+self.Not["cash"]))
            i=len(cashExchangeRuleList)
        logger.info(f"{self.name}兑换{Tname}")

        if self.stockPersonDayUsed>=self.stockPersonDayLimit and self.stockPersonDayLimit!=-1:
            logger.info(f"当前兑换次数已经达到上限[{self.stockPersonDayLimit}]次")
        #elif 'exchangeRecordList' in res['data']:logger.info(f"已有提现进行中，请等待完成！")
        else:
            get=False
            error=0
            while i>0:#for data in cashExchangeRuleList[::-1]:#倒序
                i-=1
                data=hbExchangeRuleList[i] if exchangeType==1 else cashExchangeRuleList[i]
                if self.stockPersonDayUsed>=self.stockPersonDayLimit and self.stockPersonDayLimit!=-1:
                    logger.info(f"当前兑换次数已经达到上限[{self.stockPersonDayLimit}]次")
                    break
                elif data['exchangeStatus']==1:
                    if self.canUseCoinAmount >= float(data['cashoutAmount']) or self.stockPersonDayLimit==-1:
                        if float(data['cashoutAmount']) not in NowNot:
                            logger.info(f"当前余额[{self.canUseCoinAmount}]元,开始尝试兑换{Tname}[{data['cashoutAmount']}]")
                            t=getTimestamp()#t=1679328422807 
                            body={"bizCode":"makemoneyshop","ruleId":data["id"],"sceneval":2,"buid":325,"appCode":appCode,"time":t,"signStr":"903c5e28adcc30560599ccceab907032"}
                            #get=f'functionId=jxPrmtExchange_exchange&appid=jdlt_h5&t={t}&clientVersion=1.2.5&client=jxh5&body={quote(json.dumps(body))}'
                            get=self.h5st31.getbody("jxPrmtExchange_exchange",body,True)
                            url=f'https://api.m.jd.com/api?{get}&channel=jxh5&cv=1.2.5&uuid={self.uuid}&cthr=1&loginType=2'
                            proxies={}
                            try:
                                if get:time.sleep(0.2)
                                else:get=True
                                res = requests.get(url=url, headers=self.headers,proxies=proxies,timeout=2)
                                if res.status_code==403:
                                    logger.info(f"{self.name}兑换{Tname}{data['cashoutAmount']}失败触发403，等待0.2s后将重试。")
                                    error+=1
                                    if retry>error:
                                        i+=1
                                        logger.info(f"等待0.2s后将重试。")
                                    else:error=0
                                    continue
                                try:
                                    exchange = json.loads(res.text)
                                    error_text=f"{self.name}兑换{data['cashoutAmount']}元{Tname}失败:"
                                    if exchange['ret'] == 0:
                                        self.stockPersonDayUsed+=1
                                        if exchangeType==1:
                                            logger.info(f"{self.name}兑换{data['cashoutAmount']}元红包成功，将再次尝试兑换。")
                                            i+=1
                                        else:
                                            logger.info(f"{self.name}提现{data['cashoutAmount']}元现金成功")
                                            break
                                    elif exchange['ret'] == 223:#积分不足
                                        logger.info(f"{error_text}{exchange['msg']}")
                                    elif int(exchange['ret']) in [224,232]:#库存不足|日库存不足
                                        if exchangeType==1:hbExchangeRuleList[i]['exchangeStatus']=2
                                        else:cashExchangeRuleList[i]['exchangeStatus']=2
                                        logger.info(f"{error_text}{exchange['msg']}")
                                    elif int(exchange['ret']) in [248,103]:#操作过快，请稍后重试|jimDB操作异常
                                        logger.info(f"{error_text}{exchange['msg']}")
                                        logger.info(f"等待1s，后将重试。")
                                        i+=1
                                        time.sleep(0.8)
                                    elif int(exchange['ret']) in [246,604]:#达到个人日兑换上限|已有提现进行中，等待完成
                                        logger.info(f"{error_text}{exchange['msg']}")
                                        break
                                    elif exchange['ret'] == 238:#兑换规则已失效
                                        if exchangeType==1:
                                            del hbExchangeRuleList[i]
                                        else:
                                            del cashExchangeRuleList[i]
                                    else:
                                        logger.info(f"{error_text}{exchange['ret']}:{exchange['msg']}")
                                except Exception as e:
                                    logger.info(f"{error_text}解析异常：{str(e)}")
                                    print(res.text)
                            except Exception as e:
                                logger.info(f"{error_text}超过2s请求超时...")
                                get=False
                        else:
                            logger.info(f"当前余额[{self.canUseCoinAmount}]元,不兑换{Tname}[{NowNot}]门槛")
                            if i==0:loop[exchangeType]=False
                    #else:logger.info(f"当前余额[{self.canUseCoinAmount}]元,不足兑换{Tname}[{data['cashoutAmount']}]元门槛")
                elif data['exchangeStatus']==2:
                    logger.info(f"{self.name},来晚了咯{data['name']}都被抢光了")
                    if i==0:loop[exchangeType]=False
                elif data['exchangeStatus']==3:logger.info(f"{self.name},{data['name']}已兑换")
                elif data['exchangeStatus']==4:
                    logger.info(f"{self.name},{data['name']}已抢光")
                    if i==0:loop[exchangeType]=False
                else:logger.info(f"{self.name}未知状态：{data}")
        return True

    def ExchangeListAll(self):
        self.ExchangeList(2)
        self.ExchangeList(1)

def main():
    try:
        cookies = os.environ['JD_COOKIE'].split('&')
    except:
        with open(os.path.join(os.path.dirname(__file__), 'cklist.txt'), 'r') as f:
            cookies = f.read().split('\n')
    DYJ_Pin = os.environ.get('DYJ_Pin', "")
    if DYJ_Pin == "":
        logger.info('您尚未设置变量 DYJ_Pin="pin1&pin2&pin3"\n指定用户只提现或者只兑换红包就在pin后面用“:”分隔，用“all”表示全部金额，参考“pin:不提现金额:不兑换红包金额”设置，多个金额用“,”')
        sys.exit()
    try:
        DYJ_Pin = DYJ_Pin.split('&')
    except:
        logger.info("DYJ_Pin 变量设置错误，pin1&pin2&pin3")
        sys.exit()

    helpPin=[]
    PinObj={}
    for text in DYJ_Pin:
        a=text.split(':')
        pin=a[0]
        helpPin.append(pin)
        PinObj[pin]={"cash":[],"red":[]}
        if len(a)>1 and not a[1]:PinObj[pin]["cash"]=a[1].split(',')
        if len(a)>2 and not a[2]:PinObj[pin]["red"]=a[2].split(',')

    #print(PinObj)
    global NotCash,NotRed
    NotCash = os.environ.get('DYJ_NotCash', "")
    if NotCash == "":
        logger.info('您尚未设置变量 DYJ_NotCash="金额1,金额2,金额3"\n默认不提现0.3和1还有3，相当于 export DYJ_NotCash="0.3,1,3"')
        NotCash = "0.3,1,3"
    try:
        if NotCash.find("&")!=-1:NotCash = NotCash.split('&')
        elif NotCash.find(",")!=-1:NotCash = NotCash.split(',')
        else:NotCash = [NotCash]
        logger.info(f"不提现：[{NotCash}]")
        NotCash = [float(item) for item in NotCash]
    except: logger.info("DYJ_NotCash 变量设置错误请参考：金额1,金额2,金额3")
    NotRed = os.environ.get('DYJ_NotRed', "")
    if NotRed == "":
        logger.info('您尚未设置变量 DYJ_NotRed="金额1,金额2,金额3"\n默认不兑换0.3和1还有3，相当于 export DYJ_NotRed="0.3,1,3"')
        NotRed = "0.3,1,3"
    try:
        if NotRed.find("&")!=-1:NotRed = NotRed.split('&')
        elif NotRed.find(",")!=-1:NotRed = NotRed.split(',')
        else:NotRed = [NotRed]
        logger.info(f"不兑换：[{NotRed}]")
        NotRed = [float(item) for item in NotRed]
    except: logger.info("DYJ_NotRed 变量设置错误请参考：金额1,金额2,金额3")

    UserList=[]
    for cookie in cookies:
        pin=get_pin(cookie)
        if pin in helpPin:
            UserList.append(Userinfo(cookie,PinObj[pin]))

    if not UserList:
        logger.info(f"没有找到用户:{helpPin}")
        sys.exit()

    Users=[]
    NotUserList=helpPin
    for e in UserList:
        if e.name in helpPin:
            Users.append(e.name)
            NotUserList.remove(e.name)

    if len(Users):logger.info(f"找到{len(Users)}个用户:{Users}")
    if len(NotUserList):logger.info(f"没有找到{len(NotUserList)}个用户:{NotUserList}")
    random.shuffle(UserList)#随机排序
    
    print("")
    logger.info(f"开始查询提现用户余额信息")
    
    c=len(UserList)
    i=0
    global loop,cashExchangeRuleList,hbExchangeRuleList,LastQueryTime
    current_time = getTimestamp()
    for e in UserList:
        i+=1
        ##if e.getHome()==True:#print('白号')
        #else:print(f'e.name 出错，跳过提现')
        time.sleep(1)
        if e.Query():
            if current_time>LastQueryTime:
                LastQueryTime=e.LastQueryTime
                cashExchangeRuleList=e.cashExchangeRuleList
                resetState(2)
                hbExchangeRuleList=e.hbExchangeRuleList
                resetState(1)

        e.h5st31=h5st31({
            'appId':'af89e',
            "appid": "cs_h5",
            "clientVersion": "1.2.5",
            "client": "jxh5",
            "pin": e.name,
            "ua":e.UA
        })
        e.h5st31.genAlgo()
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
    while 1:
        current_time = getTimestamp()
        if current_time >= nextHourStamp:
            '''if nextHour!="10:00:00":
                logger.info(f"开始查询库存")
                for e in UserList:
                    if e.Query():
                        if current_time>LastQueryTime:
                            LastQueryTime=e.LastQueryTime
                            cashExchangeRuleList=e.cashExchangeRuleList
                            resetState(2)
                            hbExchangeRuleList=e.hbExchangeRuleList
                            resetState(1)'''

            print("")
            logger.info(f"开始兑换")
            tdList=[]
            for e in UserList:
                if e.valid:
                    if len(e.Not["cash"])==1 and e.Not["cash"][0]=='all':
                        e.info(f"{e.name}设置不提现")
                    else:tdList.append(threading.Thread(target=e.ExchangeList, args=(2,)))
                    if len(e.Not["red"])==1 and e.Not["red"][0]=='all':
                        logger.info(f"{e.name}设置不兑换红包")
                    else:tdList.append(threading.Thread(target=e.ExchangeList, args=(1,)))

            
            for tdItem in tdList:
                if loop[1] or loop[2]:
                    try:
                        tdItem.start()
                        time.sleep(0.1) #0.1 秒一个
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