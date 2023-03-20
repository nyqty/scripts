# -*- coding:utf-8 -*-
"""
作者：atyvcn
多个&隔开
export DYJ_RedPin="需要兑换红包的pin值"
export DYJ_NotRed="不兑换红包的金额"
cron: 50 16,23 * * *
new Env('赚钱大赢家-定时兑换红包');
TY在原作者(doubi)基础上删减更改，优化提取
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

activity_name = "京东特价版-赚钱大赢家-定时兑换红包"
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
NotRed=[]
hbExchangeRuleList=[
    {"id":"d158ed723d411967d15471edf90a25ab","name":"0.5红包","exchangeStatus":1,"consumeScore":"0.50","cashoutAmount":"0.5"},
    {"id":"d29967608439624bd4688e06254b6374","name":"1元红包","exchangeStatus":1,"consumeScore":"1.00","cashoutAmount":"1"},
    {"id":"c14b645cabaa332a883cc5f43a9dd2b7","name":"3元红包","exchangeStatus":1,"consumeScore":"3.00","cashoutAmount":"3"},
    {"id":"006d8d0f371e247333a302627af7da00","name":"5元红包","exchangeStatus":1,"consumeScore":"5.00","cashoutAmount":"5"},
    {"id":"018300fea81b5bf3f1cad271f7bcfda7","name":"20元红包","exchangeStatus":1,"consumeScore":"20.00","cashoutAmount":"20"}
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
        self.UA = f'jdltapp;android;4.6.0;;;appBuild/2374;ef/1;ep/{quote(json.dumps(ep))};Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.97 Mobile Safari/537.36'
        self.cookie = cookie
        Userinfo.cookie_obj.append(self)
        self.sha = sha1(str(self.name).encode('utf-8')).hexdigest()
        self.headers = {
            "Host": "api.m.jd.com",
            "Cookie": self.cookie + f"; sid={self.sha}; visitkey={self.uuid}",
            "User-Agent": self.UA,
            "origin": "https://wqs.jd.com",
            #"Referer": f"https://wqs.jd.com/sns/202210/20/make-money-shop/guest.html?activeId={activeId}&type=sign&shareId=&__navVer=1",
            "Referer": "https://wqs.jd.com/"
        }
        self.stockPersonDayLimit=-1
        self.stockPersonDayUsed=0
        self.canUseCoinAmount=0
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
        t=1679328416233#getTimestamp()
        body={"activeId":activeId,"visitChannel":1,"sceneval":2,"buid":325,"buid":325,"appCode":appCode,"time":t,"signStr":"9151d15cddda6eb8256f7b06c112981d"}
        str="functionId=%s&body=%s&uuid=%s&client=%s&clientVersion=%s&st=%s" % ("makemoneyshop_exchangequery", body, base64Encode(self.uuid), "jxh5", "1.2.5", t)
        body["signStr"]=md5(str.encode(encoding='UTF-8')).hexdigest()
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
                    return res['data']['hbExchangeRuleList']
                else:
                    #{"code": 147, "msg": "活动太火爆，请稍后再试！"}
                    logger.info(f"用户“{self.name}”查询余额失败：{res['msg']}")#json.dumps(res)
                    #print(res)
            except Exception as e:
                logger.info(f"{self.name}查询余额解析异常：{str(e)}")
        except Exception as e:
            logger.info(f"{self.name}查询余额超过2s请求超时...")
        return []

    def RedOut(self):
        global loop,NotRed,hbExchangeRuleList
        print("")
        logger.info(f"{self.name}兑换红包")
        if self.stockPersonDayUsed>=self.stockPersonDayLimit and self.stockPersonDayLimit!=-1:
            logger.info(f"当前兑换次数已经达到上限[{self.stockPersonDayLimit}]次")
        else:
            get=False
            i=len(hbExchangeRuleList)
            #for data in cashExchangeRuleList[::-1]:#倒序
            while i>0:
                i-=1
                data=hbExchangeRuleList[i]
                if self.stockPersonDayUsed>=self.stockPersonDayLimit and self.stockPersonDayLimit!=-1:
                    logger.info(f"当前兑换次数已经达到上限[{self.stockPersonDayLimit}]次")
                    break
                elif data['exchangeStatus']==1:
                    if self.canUseCoinAmount >= float(data['cashoutAmount']) or self.stockPersonDayLimit==-1:
                        if float(data['cashoutAmount']) not in NotRed:
                            logger.info(f"当前余额[{self.canUseCoinAmount}]元,开始尝试兑换[{data['cashoutAmount']}]红包")
                            #t=getTimestamp()
                            t=1679328422807 
                            body={"bizCode":"makemoneyshop","ruleId":data["id"],"sceneval":2,"buid":325,"appCode":appCode,"time":t,"signStr":"903c5e28adcc30560599ccceab907032"}
                            uuid='7032320889511194760'
                            h5st="20230321000702826%3B3797038254680199%3Baf89e%3Btk02wbc7a1cad18nzXQXZGGNXM14rgpDvRlpx2ddPVtN88zNSDqPdUxzOASV2WLNtY%2BwBxrFIHc%2BexpCelj7iXwwP93S%3B2d222391ad9191e63567b5feb78c33ba904aa6db57d2e8bfe71415d4c68d0fc6%3B3.1%3B1679328422826%3B62f4d401ae05799f14989d31956d3c5fe48e6438a35ea5b8b8d12ecf8c7f7c07712a08d6f8fe670c8b04cdb873be6623efd95a79a8f1d6b344a8e15f4961df8e5186840e5cddf6049f64b4d68b150fb9fc05a42a62f933d59c3e351607c9397b06cc1824c6ff68e816fe7dbc493d6c09fa21d89a82bb85bba4c0e603160863f36267521224f45dafb1ac6516203fbaaf";
                            url = f'https://api.m.jd.com/api?functionId=jxPrmtExchange_exchange&appid=cs_h5&t={t}&channel=jxh5&cv=1.2.5&clientVersion=1.2.5&client=jxh5&uuid={uuid}&cthr=1&loginType=2&body={quote(json.dumps(body))}&h5st={h5st}'                            
                            proxies={}
                            try:
                                if get:time.sleep(0.5)
                                else:get=True
                                res = requests.get(url=url, headers=self.headers,proxies=proxies,timeout=2)
                                try:
                                    exchange = json.loads(res.text)
                                    if exchange['ret'] == 0:
                                        logger.info(f"{self.name}兑换{data['cashoutAmount']}红包成功")
                                        self.stockPersonDayUsed+=1
                                        #break
                                    elif exchange['ret'] == 223:#积分不足
                                        logger.info(f"{self.name}兑换{data['cashoutAmount']}红包失败:{exchange['msg']}")
                                    elif int(exchange['ret']) in [224,232]:#库存不足|日库存不足
                                        hbExchangeRuleList[i]['exchangeStatus']=4
                                        logger.info(f"{self.name}兑换{data['cashoutAmount']}红包失败:{exchange['msg']}")
                                    elif int(exchange['ret']) in [248,103]:#操作过快，请稍后重试|jimDB操作异常
                                        logger.info(f"{self.name}兑换{data['cashoutAmount']}红包失败:{exchange['msg']}")
                                        logger.info(f"等待1s，后将重试。")
                                        i+=1
                                        time.sleep(0.5)
                                    elif int(exchange['ret']) in [246,604]:#达到个人日兑换上限|已有提现进行中，等待完成
                                        logger.info(f"{self.name}兑换{data['cashoutAmount']}红包失败:{exchange['msg']}")
                                        break
                                    else:
                                        logger.info(f"{self.name}兑换{data['cashoutAmount']}红包失败{exchange['ret']}:{exchange['msg']}")
                                except Exception as e:
                                    logger.info(f"{self.name}兑换{data['cashoutAmount']}红包失败解析异常：{str(e)}")
                                    print(res)
                            except Exception as e:
                                logger.info(f"{self.name}兑换{data['cashoutAmount']}红包失败:超过2s请求超时...")
                                get=False
                        else:
                            logger.info(f"当前余额[{self.canUseCoinAmount}]元,不兑换[{NotRed}]门槛")
                            if i==0:loop=False
                    #else:logger.info(f"当前余额[{self.canUseCoinAmount}]元,不足兑换[{data['cashoutAmount']}]红包门槛")
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
    helpPin = os.environ.get('DYJ_RedPin', "")
    if helpPin == "":
        logger.info('您尚未设置变量 DYJ_RedPin="pin1&pin2&pin3"')
        sys.exit()
    try:
        helpPin = helpPin.split('&')
    except:
        logger.info("DYJ_RedPin 变量设置错误，pin1&pin2&pin3")
        sys.exit()
    global NotRed
    NotRed = os.environ.get('DYJ_NotRed', "")
    if NotRed == "":
        logger.info('您尚未设置变量 DYJ_NotRed="金额1&金额2&金额3"\n默认不兑换0.3和1还有3，相当于 export DYJ_NotRed="0.3&1&3"')
        NotRed = "0.3&1&3"
    try:
        NotRed = NotRed.split('&')
        logger.info(f"不兑换：[{NotRed}]")
        NotRed = [float(item) for item in NotRed]
    except:
        logger.info("DYJ_NotRed变量设置错误，金额1&金额2&金额3")

    [Userinfo(cookie) for cookie in cookies]
    RedOutList = ([cookie_obj for cookie_obj in Userinfo.cookie_obj for name in helpPin if name in cookie_obj.name])
    #logger.info(f"helpPin:{helpPin}")
    if not RedOutList:
        logger.info(f"没有找到用户:{helpPin}")
        sys.exit()
    Users=[]
    NotUserList=helpPin
    for e in RedOutList:
        if e.name in helpPin:
            Users.append(e.name)
            NotUserList.remove(e.name)
    if len(Users):logger.info(f"找到用户[{len(Users)}]:{Users}")
    if len(NotUserList):logger.info(f"没有找到用户[{len(NotUserList)}]:{NotUserList}")
    random.shuffle(RedOutList)#随机排序
    
    print("")
    logger.info(f"开始查询用户余额信息")
    c=len(RedOutList)
    i=0
    for e in RedOutList:
        i+=1
        #if e.getHome()==True:#print('白号')
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
    logger.info(f"开始等待{nextHour}兑换")
    global loop,hbExchangeRuleList
    loop=True
    while 1:
        current_time = getTimestamp()
        if current_time >= nextHourStamp:
            if nextHour!="00:00:00":
                SERL=[]
                logger.info(f"开始查询库存")
                for e in RedOutList:
                    SERL=e.Query()
                    if len(SERL)>0:
                        hbExchangeRuleList=SERL
                        logger.info("查询成功")
                    else:
                        logger.info(f"查询失败,强制兑换{len(hbExchangeRuleList)}个")
                    break

            print("")
            logger.info(f"开始兑换红包")
            tdList = []
            for e in RedOutList:tdList.append(threading.Thread(target=e.RedOut, args=()))
            for tdItem in tdList:
                if loop:
                    try:
                        tdItem.start()
                        time.sleep(0.2) #0.2 秒一个
                    except Exception as e:
                        logger.info(f'兑换异常：{str(e)}')
                else:
                    logger.info(f"最后一个也没得咯，多线程提前结束！")
                    break
            break
        #else: printf("等待开始...")
        time.sleep(0.01)
    #time.sleep(round(random.uniform(0.7, 1.3), 2))

if __name__ == '__main__':
    main()