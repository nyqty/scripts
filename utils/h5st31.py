'''
by、TY
根据JS版本修改而来
要安装 
pip install pycryptodome
调用方法：
from utils.h5st31 import getbody
get = getbody({
    'appId':'8c6ae',
    'fn':'functionId',
    "body": {},
    "apid": "activities_platform",
    "ver": "4.9.0",
    "cl": "android",
    "pin": "TY",
    "code": True,
    "flag": True,
    "ua": 'jdltapp;android;4.6.0;;;appBuild/2374;ef/1;Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.97 Mobile Safari/537.36'
})
print(get)
'''
import requests
import json
import random
import re
import base64
import logging
from urllib.parse import quote_plus, unquote_plus, quote
import time, datetime
from hashlib import sha256, sha512, md5
import hmac
from Crypto.Util.Padding import pad
from Crypto.Cipher import AES

activity_name = "H5ST3.1"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)03d %(message)s",#%(levelname)s %(lineno)d 
    datefmt="%M:%S"
)
logger = logging.getLogger(activity_name)

TYappIdAlgo = {}

def getTimestamp():
    return int(round(time.time() * 1000))

def randomString(num,charset="abcdefghijklmnopqrstuvwxyz0123456789"):
    randomstr = ""
    for i in range(num):
        randomstr += random.choice(charset)
    return randomstr

def generateFp(version):
    remove = ""
    charset = "0123456789"
    rd = random.randint(0,9)
    while len(remove)<3:
        s = randomString(1,charset)
        if remove.find(s) == -1:
            remove += s
    for ch in remove:
        charset = charset.replace(ch, "")
    s2 = randomString(rd,charset) + remove + randomString(12 - rd,charset) + str(rd)
    if version == "3.1":
        s2s = list(s2)
        s2=""
        while len(s2s):s2+=str(9 - int(s2s.pop()))
    return s2
#async     
def genAlgo(appId, fp, ua, expandParams, version):
    global TYappIdAlgo
    headers = {
        "Host": "cactus.jd.com",
        "Content-Type": "application/json",
        "User-agent": ua
    }
    data = json.dumps({
        "version": version,
        "fp": fp,
        "appId": appId,
        "timestamp": getTimestamp(),
        "platform": "web",
        "expandParams": expandParams
    })
    try:
        res = res = requests.post("https://cactus.jd.com/request_algo?g_ty=ajax", headers=headers, data=data, timeout=5).text
        try:
            res = json.loads(res)
            if res['status'] == 200:
                #print(res)
                result=res["data"]["result"]
                TYappIdAlgo[appId]["tk"] = result["tk"]
                algo = result['algo']
                TYappIdAlgo[appId]["algo"] = algo
                digestmod = re.findall(r'algo\.(\w+)\(', algo)
                rds = re.findall(r'rd=\'(.*?)\';', algo)
                if len(digestmod) > 0 and len(rds) > 0:
                    #return algo.HmacMD5(str,tk)}"}}}
                    TYappIdAlgo[appId]["rd"] = rds[0]
                    TYappIdAlgo[appId]["ac"]=digestmod[0]
                    return True
            else:
                print(res)
        except Exception as e:
            logger.info(f"genAlgo api解析异常：{str(e)}")
    except Exception as e:
        logger.info(f"genAlgo api超过2s请求超时...")
    return False

def aes_cipher(key, aes_str):
    aes = AES.new(key.encode('utf-8'), AES.MODE_CBC,b"0102030405060708")
    pad_pkcs7 = pad(aes_str.encode('utf-8'), AES.block_size, style='pkcs7')  # 选择pkcs7补全
    encrypt_aes = aes.encrypt(pad_pkcs7)
    return base64.b64encode(encrypt_aes).decode('utf-8')
    #den_text = aes.decrypt(ciphertext) # 解密密文


def get_sign(algo, data, key):
    message = data.encode('utf-8')
    if algo == 'HmacSHA256':
        algo = sha256
    elif algo == 'HmacSHA512':
        algo = sha512
    elif algo == 'HmacMD5':
        algo = md5
    elif algo == 'SHA256':
        data_sha = sha256(message).hexdigest()
        return data_sha
    elif algo == 'SHA512':
        data_sha = sha512(message).hexdigest()
        return data_sha
    elif algo == 'MD5':
        data_sha = md5(message).hexdigest()
        return data_sha
    else:
        print("加密方式有误！")
        return None
    key = key.encode('utf-8')
    sign = hmac.new(key, message, digestmod=algo).hexdigest()
    return sign

def getbody(opt):
    global TYappIdAlgo
    version = "3.1"
    #{body,ua,pin,ver,cl,fn,appId,apid,code,flag} = opt
    list1="body,ua,pin,ver,cl,fn,appId,apid,code,flag".split(",")
    for k in list1:
        if k not in opt:
            print(k+"未定义！")
            return False

    if opt["appId"] not in TYappIdAlgo or opt["flag"]:
        TYappIdAlgo[opt["appId"]] = {"fp":generateFp(version)}
    if isinstance(opt["body"],dict):#判断body数据类型是否为dict 是就转化为json
        opt["body"]=json.dumps(opt["body"])
    
    fp=TYappIdAlgo[opt["appId"]]["fp"]
    sua=re.findall(r'\(([^)]+)\)', opt["ua"])[1]
    aes_str=json.dumps({
        "wc":1,"wd":0,"l":"zh-CN","ls":"zh-CN","ml":0,"pl":0,"av":"","ua":opt["ua"],
        "sua":sua,"pp":{"p1":opt["pin"]},"pp1":"","w":393,"h":873,
        "ow":393,"oh":779,"url":"","og":"","pr":2.75,"re":"","ai":opt["appId"],"fp":fp
    },indent=2,ensure_ascii=False)
    expandParams = aes_cipher("wm0!@w-s#ll1flo(", aes_str)
    t1 = getTimestamp()

    if "tk" not in TYappIdAlgo[opt["appId"]] or opt["flag"]:
        #print("获取Algo")
        hq=genAlgo(opt["appId"], fp, opt["ua"], expandParams, version)
        if hq==False:
            return False
    tk=TYappIdAlgo[opt["appId"]]["tk"]
    Data = {
        "appid": opt["apid"],
        "functionId": opt["fn"],
        "body": opt["body"],
        "clientVersion": opt["ver"],
        "client": opt["cl"],
        "t":""
    }
    if opt["code"]:Data["t"] = t1
    if t1>1680278400000:Data["functionId"] = ""
    tmp=[]
    for k in ["appid", "body", "client", "clientVersion", "functionId", "t"]:
        if k =="body":
            tt=get_sign("SHA256", Data[k],"")
        else:
            tt=Data[k]
        tmp.append('{}:{}'.format(k, tt))
    st='&'.join(tmp)
    t2 = getTimestamp()
    dt_object = datetime.datetime.fromtimestamp(t2 / 1000, None)  # 时间戳转换成字符串日期时间
    timeDate = dt_object.strftime("%Y%m%d%H%M%S%f")[0:17]
    
    tmp=TYappIdAlgo[opt["appId"]]
    str1 = tmp["tk"] + tmp["fp"] + timeDate + str(opt["appId"]) + tmp["rd"]
    #'algo': "function test(tk,fp,ts,ai,algo){var rd='e5vwEDVPOK0d';var str=`${tk}${fp}${ts}${ai}${rd}`;return algo.HmacMD5(str,tk)}"}}}
    sign_1=get_sign(tmp["ac"], str1, tmp["tk"])
    hash2 = get_sign("HmacSHA256",st,sign_1)
    aes_str=json.dumps({
        "sua": sua,
        "pp": {"p1":opt["pin"]},
        "fp": fp
    },indent=2,ensure_ascii=False)
    enStr = aes_cipher("wm0!@w_s#ll1flo(", aes_str)
    #__dirname.split(/[\\/]/).pop() !== "function" && (timeDate = timeDate - 1);
    h5st = ';'.join([timeDate, fp, opt["appId"], tk, hash2, version, str(t2), enStr])
    return "functionId=" + opt["fn"] + "&body=" + quote(opt["body"]) + "&t=" + str(t1) + "&appid=" + opt["apid"] + "&client=" + opt["cl"] + "&clientVersion=" + opt["ver"] + "&h5st=" + quote(h5st)