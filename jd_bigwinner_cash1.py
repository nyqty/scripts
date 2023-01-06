# -*- coding:utf-8 -*-
"""
作者：atyvcn
多个&隔开
export DYJ_CashPin="需要提现的pin值"
export DYJ_NotCash="不提现的金额"
cron: 59,29 0,23,11-18/1 * * *
new Env('赚钱大赢家-定时提现');
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
from hashlib import sha1
from urllib.parse import quote_plus, unquote_plus, quote
import threading

activity_name = "京东特价版-赚钱大赢家-定时提现"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(message)s",#%(levelname)s %(lineno)d 
    datefmt="%H:%M:%S"
)
logger = logging.getLogger(activity_name)
index = 0
h5st_appid = 'd06f1'
appCode = 'msc588d6d5'
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

class Userinfo:
    cookie_obj = []
    index = 0
    def __init__(self, cookie):
        global index
        index += 1
        self.user_index = index
        self.uuid=''.join(str(uuid.uuid4()).split('-')) #15587980619082418
        self.cookie = cookie
        try:
            self.name = unquote_plus(re.findall(r'pt_pin=([^; ]+)(?=;?)', self.cookie)[0])
        except Exception:
            logger.info(f"取值错误['pt_pin']：{traceback.format_exc()}")
            return
        self.UA = 'jdltapp;iPhone;4.2.0;;;M/5.0;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;hasOCPay/0;appBuild/1217;supportBestPay/0;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DtCzCNvwDzc4CwG0CWY2ZWTvENVwCJS3EJDvEWDsDNHuCNU2YJqnYm%3D%3D%22%2C%22sv%22%3A%22CJSkDy42%22%2C%22iad%22%3A%22C0DOGzumHNSjDJvMCy0nCUVOBJvLEOYjG0PNGzCmHOZNEJO2%22%7D%2C%22ts%22%3A1667286187%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 12_7_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E126;supportJDSHWK/1'
        Userinfo.cookie_obj.append(self)
        self.sha = sha1(str(self.name).encode('utf-8')).hexdigest()
        self.headers = {
            "Host": "api.m.jd.com",
            "Cookie": self.cookie + f"; sid={self.sha}; visitkey={uuid}",
            "User-Agent": self.UA,
            "origin": "https://wqs.jd.com",
            #"Referer": f"https://wqs.jd.com/sns/202210/20/make-money-shop/guest.html?activeId={activeId}&type=sign&shareId=&__navVer=1",
            "Referer": "https://wqs.jd.com/"
        }
        self.stockPersonDayLimit=0
        self.stockPersonDayUsed=0
        self.canUseCoinAmount=0
        #print(self.name)

    def Query(self):
        t=int(time.time() * 1000)
        body=quote(json.dumps({"activeId":activeId,"sceneval":2,"buid":325,"appCode":appCode,"time":t,"signStr":""})) #07a9d66103b6ae8c0afd1dec831027bf
        t=t+1
        url = f'https://api.m.jd.com/api?functionId=makemoneyshop_exchangequery&appid=jdlt_h5&channel=jxh5&cv=1.2.5&clientVersion=1.2.5&client=jxh5&uuid={self.uuid}&cthr=1&body={body}&t={t}&loginType=2'
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
                    print(res)
            except Exception as e:
                logger.info(f"{self.name}查询余额解析异常：{str(e)}")
        except Exception as e:
            logger.info(f"{self.name}查询余额超过2s请求超时...")
        return []

    def CashOut(self):
        global loop,not_tx,cashExchangeRuleList
        print("")
        logger.info(f"{self.name}提现")
        if self.stockPersonDayUsed>=self.stockPersonDayLimit:
            logger.info(f"当前提现次数已经达到上限[{self.stockPersonDayLimit}]次")
        #elif 'exchangeRecordList' in res['data']:logger.info(f"已有提现进行中，请等待完成！")
        else:
            get=False
            i=len(cashExchangeRuleList)
            while i>0:#for data in cashExchangeRuleList[::-1]:#倒序
                i-=1
                data=cashExchangeRuleList[i]
                if data['exchangeStatus']==1:
                    if self.canUseCoinAmount >= float(data['cashoutAmount']):
                        if float(data['cashoutAmount']) not in not_tx:
                            logger.info(f"当前余额[{self.canUseCoinAmount}]元,开始尝试提现[{data['cashoutAmount']}]")
                            self.headers["Host"]="wq.jd.com"
                            url = f'https://wq.jd.com/prmt_exchange/client/exchange?g_ty=h5&g_tk=&appCode={appCode}&bizCode=makemoneyshop&ruleId={data["id"]}&sceneval=2'
                            proxies={}
                            try:
                                if get:time.sleep(1)
                                else:get=True
                                res = requests.get(url=url, headers=self.headers,proxies=proxies,timeout=2).text
                                try:
                                    exchange = json.loads(res)
                                    if exchange['ret'] == 0:
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}成功")
                                        break
                                    elif exchange['ret'] == 232:#日库存不足
                                        cashExchangeRuleList[i]['exchangeStatus']=4
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}失败:{exchange['msg']}")
                                    elif int(exchange['ret']) in [248,103]:#操作过快，请稍后重试|jimDB操作异常
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}失败:{exchange['msg']}")
                                        logger.info(f"等待1s，后将重试。")
                                        i+=1
                                        time.sleep(1)
                                    elif int(exchange['ret']) in [246,604]:#达到个人日兑换上限|已有提现进行中，等待完成
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}失败:{exchange['msg']}")
                                        break
                                    else:
                                        logger.info(f"{self.name}提现{data['cashoutAmount']}失败{exchange['ret']}:{exchange['msg']}")
                                except Exception as e:
                                    logger.info(f"{self.name}提现{data['cashoutAmount']}失败解析异常：{str(e)}")
                            except Exception as e:
                                logger.info(f"{self.name}提现{data['cashoutAmount']}失败:超过2s请求超时...")
                                get=False
                        else:logger.info(f"当前余额[{self.canUseCoinAmount}]元,不提现[{not_tx}]门槛")
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
    tdList = []
    for e in CashOutList:
        e.Query()
        tdList.append(threading.Thread(target=e.CashOut, args=()))

    print("")
    unit = 18e5
    current_time = getTimestamp()
    nextHourStamp = current_time - ( current_time % unit ) + unit
    #nextHourStamp = current_time+10000
    nextHour=time.strftime("%H:%M:%S", time.localtime(nextHourStamp/1000))
    logger.info(f"开始等待{nextHour}提现")
    global loop,cashExchangeRuleList
    loop=True
    while 1:
        current_time = getTimestamp()
        if current_time >= nextHourStamp:
            SERL=[]
            logger.info(f"开始查询库存")
            for e in CashOutList:
                SERL=e.Query()
                if len(SERL)>0:
                    global cashExchangeRuleList
                    cashExchangeRuleList=SERL
                    logger.info("查询成功")
                else:
                    logger.info("查询失败,强制提现")
                break

            print("")
            logger.info(f"开始提现")
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