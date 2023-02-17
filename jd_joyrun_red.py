# -*- coding:utf-8 -*-
"""
作者：atyvcn
多个&隔开

export JoyRun_RedPin="需要兑换红包的pin值"
export JoyRun_NotRed="不兑换红包的金额"
cron: 50 16,23 * * *
new Env('汪汪赛跑-定时兑换红包');
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

activity_name = "京东特价版-汪汪赛跑-定时兑换红包"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)03d %(message)s",#%(levelname)s %(lineno)d 
    datefmt="%M:%S"
)
logger = logging.getLogger(activity_name)
linkId="L-sOanK_5RJCz7I314FpnQ"

NotRed=[]
redBagStatus=[
    {"level":1,"status":0,"amount":0.5},
    {"level":2,"status":0,"amount":3},
    {"level":3,"status":0,"amount":10}
]


def getTimestamp():
    return int(round(time.time() * 1000))

string1 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/"
string2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

def randomstr(num):
    randomstr = ""
    for i in range(num):
        randomstr = randomstr + random.choice("abcdefghijklmnopqrstuvwxyz0123456789")
    return randomstr

#eidAc5cd8121cdsb36HN6ksnQrmI%2FmyDDxg5y9%2Bhz2%2BRr7MhK5W5cSw5GUySGiEYfxT7WWVsYyo0I%2BO%2FG5bCD4ZGsjQOmuJDne9zNCmL7plEPWmYJCxX
#eidAc5cd8121cdsb36HN6ksnQrmI/myDDxg5y9+hz2+Rr7MhK5W5cSw5GUySGiEYfxT7WWVsYyo0I+O/G5bCD4ZGsjQOmuJDne9zNCmL7plEPWmYJCxX
def randomeid():
    return 'eidAaf8081218as20a2GM%s7FnfQYOecyDYLcd0rfzm3Fy2ePY4UJJOeV0Ub840kG8C7lmIqt3DTlc11fB/s4qsAP8gtPTSoxu' % randomstr(
        20)

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
    def __init__(self, cookie):
        ep, self.uuid, st = get_ep()
        #58210751877731116
        try:
            self.name = unquote_plus(re.findall(r'pt_pin=([^; ]+)(?=;?)', cookie)[0])
        except Exception:
            logger.info(f"取值错误['pt_pin']：{traceback.format_exc()}")
            return
        #'jdltapp;android;4.8.2;;;appBuild/2385;ef/1;ep/;Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046129 Mobile Safari/537.36'
        self.UA = f'jdltapp;android;4.6.0;;;appBuild/2374;ef/1;ep/{quote(json.dumps(ep))};Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.97 Mobile Safari/537.36'
        self.cookie = cookie
        Userinfo.cookie_obj.append(self)
        self.sha = sha1(str(self.name).encode('utf-8')).hexdigest()
        self.eid=randomeid()
        self.headers = {
            'Host': 'api.m.jd.com',
            'accept': 'application/json, text/plain, */*',
            'user-agent': self.UA,
            'origin': 'https://h5platform.jd.com',
            'x-requested-with': 'com.jd.jdlite',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://h5platform.jd.com/',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            "Cookie": self.cookie + f"; sid={self.sha}; visitkey={self.uuid}",
        }
        self.rewardAmount=0
        self.runningNumLimit=False
        #print(self.name)

    def runningPageHome(self):
        t=getTimestamp()
        body={"linkId":linkId,"isFromJoyPark":False,"joyLinkId":""}
        #self.uuid="5616237366134353-4383338333661383"
        #&d_brand=Redmi&d_model=22081212C&lang=zh_CN
        url = f'https://api.m.jd.com/?functionId=runningPageHome&body={quote(json.dumps(body))}&t={t}&appid=activities_platform&client=android&clientVersion=4.8.2&cthr=1&uuid={self.uuid}&build=2385&screen=407*904&networkType=wifi&d_brand=Redmi&lang=zh_CN&osVersion=13&partner=xiaomi&eid={self.eid}'
        try:
            res = requests.get(url=url, headers=self.headers,proxies={},timeout=2).text
            try:
                res = json.loads(res)
                if res['code'] == 0:
                    self.rewardAmount=res["data"]["runningHomeInfo"]["prizeValue"]
                    self.runningNumLimit=res["data"]["runningHomeInfo"]["runningNumLimit"]#兑换数量限制
                    logger.info(f"用户“{self.name}”奖金余额[{self.rewardAmount}]元")
                    return self.rewardAmount
                else:
                    print(res)
            except Exception as e:
                logger.info(f"{self.name}查询奖金余额api解析异常：{str(e)}")
        except Exception as e:
            logger.info(f"{self.name}查询奖金余额api超过2s请求超时...")
        return 0

    def runningMyPrize(self):
        t=getTimestamp()
        body={"linkId":linkId,"pageSize":0,"time":None,"ids":None}#10
        url = f'https://api.m.jd.com/?functionId=runningMyPrize&body={quote(json.dumps(body))}&t={t}&appid=activities_platform&client=android&clientVersion=4.8.2&cthr=1&uuid={self.uuid}&build=2385&screen=407*904&networkType=wifi&d_brand=Redmi&lang=zh_CN&osVersion=13&partner=xiaomi&eid={self.eid}'
        try:
            res = requests.get(url=url, headers=self.headers,proxies={},timeout=2).text
            try:
                res = json.loads(res)
                if res['code'] == 0:
                    self.rewardAmount=float(res['data']['rewardAmount'])
                    logger.info(f"用户“{self.name}”奖金余额[{self.rewardAmount}]元")
                    return res['data']['redBagStatus']
                else:
                    print(res)
            except Exception as e:
                logger.info(f"{self.name}查询库存api解析异常：{str(e)}")
        except Exception as e:
            logger.info(f"{self.name}查询库存api超过2s请求超时...")
        return []

    def RedOut(self):
        global redBagStatus
        print("")
        logger.info(f"{self.name}兑换红包")
        if self.runningNumLimit:
            logger.info(f"今日已兑换OR提现")
        else:
            get=False
            i=len(redBagStatus)
            while i>0:
                i-=1
                data=redBagStatus[i]
                if data['status']==-1 or data['status']==1:
                    logger.info(f"当前兑换次数已经达到上限")
                    break
                elif data['status']==0 or data['status']==2:
                    if self.rewardAmount >= float(data['amount']):
                        logger.info(f"当前奖金余额[{self.rewardAmount}]元,开始尝试兑换[{data['amount']}]红包")
                        t=getTimestamp()
                        body={"linkId":linkId,"type":1,"level":data['level']}
                        post = f'functionId=runningPrizeDraw&body={quote(json.dumps(body))}&t={t}&appid=activities_platform&client=android&clientVersion=4.8.2&cthr=1&uuid={self.uuid}&build=2385&screen=407*904&networkType=wifi&d_brand=Redmi&lang=zh_CN&osVersion=13&partner=xiaomi&eid={self.eid}'
                        url = f'https://api.m.jd.com/'
                        proxies={}
                        try:
                            if get:time.sleep(0.5)
                            else:get=True
                            headers=self.headers
                            headers["content-type"]="application/x-www-form-urlencoded"
                            res = requests.post(url=url, headers=self.headers,data=post,proxies=proxies,timeout=2)
                            try:
                                exchange = json.loads(res.text)        
                                if exchange['code'] == 0:
                                    logger.info(f"{self.name}兑换{data['amount']}红包成功")
                                    break
                                elif exchange['code'] == 7104:#已经领取过奖励
                                    logger.info(f"{self.name}兑换{data['amount']}红包失败:{exchange['errMsg']}")
                                    break
                                elif exchange['code'] == 7105:#今日奖池已发光
                                    del redBagStatus[i]
                                    logger.info(f"{self.name}兑换{data['amount']}红包失败:{exchange['errMsg']}")
                                else:
                                    logger.info(f"{self.name}兑换{data['amount']}红包失败{exchange['code']}:{exchange['errMsg']}")
                            except Exception as e:
                                logger.info(f"{self.name}兑换{data['amount']}红包失败解析异常：{str(e)}")
                                print(res)
                        except Exception as e:
                            logger.info(f"{self.name}兑换{data['amount']}红包失败:超过2s请求超时...")
                            get=False
                    #else:logger.info(f"当前奖金余额[{self.rewardAmount}]元,不足兑换[{data['amount']}]红包门槛")
                elif data['status']==2:
                    logger.info(f"{self.name},奖金不足兑换{data['amount']}")
                #elif data['status']==3:logger.info(f"{self.name},{data['amount']}已兑换")
                elif data['status']==4:logger.info(f"{self.name},{data['amount']}未到兑换时间")
                else:logger.info(f"{self.name}未知状态：{data}")

def main():
    try:
        cookies = os.environ['JD_COOKIE'].split('&')
    except:
        with open(os.path.join(os.path.dirname(__file__), 'cklist.txt'), 'r') as f:
            cookies = f.read().split('\n')
    helpPin = os.environ.get('JoyRun_RedPin', "")
    if helpPin == "":
        logger.info('您尚未设置变量 JoyRun_RedPin="pin1&pin2&pin3"')
        sys.exit()
    try:
        helpPin = helpPin.split('&')
    except:
        logger.info("JoyRun_RedPin 变量设置错误，pin1&pin2&pin3")
        sys.exit()
    global NotRed
    NotRed = os.environ.get('JoyRun_NotRed', "")
    if NotRed == "":
        logger.info('您尚未设置变量 JoyRun_NotRed="金额1&金额2&金额3"\n默认不兑换0.5还有3，相当于 export JoyRun_NotRed="0.5&3"')
        NotRed = "0.5&3"
    try:
        NotRed = NotRed.split('&')
        logger.info(f"不兑换：[{NotRed}]")
        NotRed = [float(item) for item in NotRed]
    except:
        logger.info("JoyRun_NotRed变量设置错误，金额1&金额2&金额3")

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
    tdList = []
    c=len(RedOutList)
    i=0
    for e in RedOutList:
        i+=1
        time.sleep(1)
        e.runningMyPrize()
        tdList.append(threading.Thread(target=e.RedOut, args=()))
        if i!=c:
            if c>2:
                logger.info(f"等待5秒查询下一个")
                time.sleep(5)
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
    global redBagStatus
    while 1:
        current_time = getTimestamp()
        if current_time >= nextHourStamp:
            if nextHour!="00:00:00":
                SERL=[]
                logger.info(f"开始查询库存")
                for e in RedOutList:
                    SERL=e.runningMyPrize()
                    if len(SERL)>0:
                        redBagStatus=SERL
                        print(redBagStatus)
                        logger.info("查询成功")
                    else:
                        logger.info(f"查询失败,强制兑换{len(redBagStatus)}个")
                    break

            i=len(redBagStatus)
            while i>0:
                i-=1
                if float(redBagStatus[i]['amount']) in NotRed:del redBagStatus[i]

            print("")
            logger.info(f"开始兑换红包")
            for tdItem in tdList:
                if len(redBagStatus):
                    try:
                        tdItem.start()
                        time.sleep(0.2) #0.2 秒一个
                    except Exception as e:
                        logger.info(f'兑换异常：{str(e)}')
                else:
                    logger.info(f"没有符合可兑换的红包，多线程提前结束！")
                    break
            break
        #else: printf("等待开始...")
        time.sleep(0.01)
    #time.sleep(round(random.uniform(0.7, 1.3), 2))

if __name__ == '__main__':
    main()