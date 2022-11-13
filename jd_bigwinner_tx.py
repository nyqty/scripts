# -*- coding:utf-8 -*-
"""
Python 3.9.7
作者：doubi
日期：2022年10月30日
作者要求 注释不能删除  否则后续不再更新
作者授权发布KR库。搬运请完整保留注释。
环境变量说明：
export DYJ_TX="需要提现的pin值"  
cron: 0 0 * * *
new Env('赚钱大赢家-定时提现');
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

activity_name = "京东极速版-赚钱大赢家"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(lineno)d %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger(activity_name)
index = 0
h5st_appid = 'd06f1'
appCode = 'msc588d6d5'
activeId = '63526d8f5fe613a6adb48f03'
#not_tx = [0.3, 1, 3]
not_tx = [0.3]

class Userinfo:
    cookie_obj = []
    index = 0

    def __init__(self, cookie):
        global index
        index += 1
        self.user_index = index
        self.cookie = cookie
        try:
            self.pt_pin = re.findall(r'pt_pin=(.*?);', self.cookie)[0]
        except Exception:
            logger.info(f"取值错误['pt_pin']：{traceback.format_exc()}")
            return
        self.name = unquote_plus(self.pt_pin)
        self.UA = 'jdltapp;iPhone;4.2.0;;;M/5.0;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;hasOCPay/0;appBuild/1217;supportBestPay/0;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DtCzCNvwDzc4CwG0CWY2ZWTvENVwCJS3EJDvEWDsDNHuCNU2YJqnYm%3D%3D%22%2C%22sv%22%3A%22CJSkDy42%22%2C%22iad%22%3A%22C0DOGzumHNSjDJvMCy0nCUVOBJvLEOYjG0PNGzCmHOZNEJO2%22%7D%2C%22ts%22%3A1667286187%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 12_7_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E126;supportJDSHWK/1'
        self.account_hot = False
        self.help_status = False
        Userinfo.cookie_obj.append(self)
        self.sha = sha1(str(self.pt_pin).encode('utf-8')).hexdigest()
        self.headers = {
            "Host": "wq.jd.com",
            "Cookie": self.cookie + f"sid={self.sha}",
            "User-Agent": self.UA,
            "Referer": f"https://wqs.jd.com/sns/202210/20/make-money-shop/guest.html?activeId={activeId}&type=sign&shareId=&__navVer=1",
        }
        self.shareUuid = ""
        self.invite_success = 0
        self.task_list = []
        self.need_help = False

    def UserTask(self):
        return self.exchange_query()

    def exchange_query(self):
        url = f'https://wq.jd.com/makemoneyshop/exchangequery?g_ty=h5&g_tk=&appCode={appCode}&activeId={activeId}&sceneval=2'
        res = requests.get(url=url, headers=self.headers).json()
        if res['code'] == 0:
            logger.info(f"用户账户[{self.name}]：获取微信提现信息成功")
            canUseCoinAmount = float(res['data']['canUseCoinAmount'])
            logger.info(f"用户账户[{self.name}]：当前余额[{canUseCoinAmount}]元")
            for data in res['data']['cashExchangeRuleList'][::-1]:
                if float(data['cashoutAmount']) not in not_tx:
                    if canUseCoinAmount >= float(data['cashoutAmount']):
                        logger.info(f"用户账户[{self.name}]：当前余额[{canUseCoinAmount}]元,符合提现规则[{data['cashoutAmount']}]门槛")
                        rule_id = data['id']
                        self.tx(rule_id)

                    else:
                        logger.info(f"用户账户[{self.name}]：当前余额[{canUseCoinAmount}]元,不足提现[{data['cashoutAmount']}]门槛")
                else:
                    logger.info(f"用户账户[{self.name}]：当前余额[{canUseCoinAmount}]元,不提现[{not_tx}]门槛")

    def tx(self, rule_id):
        url = f'https://wq.jd.com/prmt_exchange/client/exchange?g_ty=h5&g_tk=&appCode={appCode}&bizCode=makemoneyshop&ruleId={rule_id}&sceneval=2'
        res = requests.get(url=url, headers=self.headers).json()
        if res['ret'] == 0:
            logger.info(f"用户账户[{self.name}]：提现成功")
            return True
        if res['ret'] == 232:
            logger.info(f"用户账户[{self.name}]：{res['msg']}")
            return False
        if res['ret'] == 604:
            logger.info(f"用户账户[{self.name}]：{res['msg']}")
            return True
        else:
            logger.info(f"用户账户[{self.name}]：{res}")


def getTime():
    return int(time.time() * 1000)


def main():
    try:
        cookies = os.environ['JD_COOKIE'].split('&')
    except:
        with open(os.path.join(os.path.dirname(__file__), 'cklist.txt'), 'r') as f:
            cookies = f.read().split('\n')
    helpPin = os.environ.get('DYJ_TX', "")
    if helpPin == "":
        logger.info("您尚未填写'DYJ_TX'-- pin1&pin2&pin")
        sys.exit()
    try:
        helpPin = helpPin.split('&')
    except:
        logger.info("DYJ_TX填写格式错误，pin1&pin2&pin3")
        sys.exit()
    [Userinfo(cookie) for cookie in cookies]
    inviterList = ([cookie_obj for cookie_obj in Userinfo.cookie_obj for name in helpPin if name in cookie_obj.pt_pin])
    if not inviterList:
        logger.info(f"没有找到用户:{helpPin}")
        sys.exit()
    logger.info(f"共找到[{len(inviterList)}]用户")
    for inviter in inviterList:
        logger.info(f"开启提现用户：{inviter.pt_pin}")
        inviter.UserTask()
    time.sleep(round(random.uniform(0.7, 1.3), 2))

if __name__ == '__main__':
    main()