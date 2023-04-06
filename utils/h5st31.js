/*
by、TY
调用方法：
const {getbody} = require('./utils/h5st31.js');
console.log(getbody({
        appId,
        fn,
        "body": body,
        "apid": "jx_h5",
        "ver": "1.0",
        "cl": "jx_h5",
        "user": $.UserName,
        "code": 1,
        "flag": $.flag,
        "ua": $.UA
    }));
*/
const CryptoJS = require("crypto-js");
const got = require("got");
var appIdAlgo = {};

function randomString(num, charset = "abcdef0123456789") {
    let str = '';
    for (let i = 0; i < num; i++) {
        str += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return str;
}

Date.prototype.Format = function(fmt) {
    var n = this,
        l = {
            "M+": n.getMonth() + 1,
            "d+": n.getDate(),
            "D+": n.getDate(),
            "h+": n.getHours(),
            "H+": n.getHours(),
            "m+": n.getMinutes(),
            "s+": n.getSeconds(),
            "w+": n.getDay(),
            "q+": Math.floor((n.getMonth() + 3) / 3),
            "S+": n.getMilliseconds()
        };
    /(y+)/i.test(fmt) && (fmt = fmt.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length)));
    for (var k in l) {
        if (new RegExp("(".concat(k, ")")).test(fmt)) {
            var t, a = "S+" === k ? "000" : "00";
            fmt = fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? l[k] : ("".concat(a) + l[k]).substr("".concat(l[k]).length))
        }
    }
    return fmt;
}

function generateFp(version) {
    var remove = "",
    charset = "0123456789",
    rd = Math.floor(Math.random() * 10),
    str,
    num = 12;
    do {
        str = randomString(1,charset);
        remove.indexOf(str) == -1 && (remove += str);
    } while (remove.length < 3);
    for (let ch of remove.slice()) {
        charset = charset.replace(ch, "");
    }
    var str2 = randomString(rd,charset) + remove + randomString(num - rd,charset) + rd;
    if (version == "3.1") {
        var str2s = str2.split(""),arr = [];
        for (; str2s.length;) {
            arr.push(9 - parseInt(str2s.pop()));
        }
        str2 = arr.join("");
    }
    return str2;
}

function genAlgo(appId, fp, ua, expandParams, version) {
    let opt = {
        "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
        "body": JSON.stringify({
            "version": version,
            "fp": fp,
            "appId": appId,
            "timestamp": Date.now(),
            "platform": "web",
            "expandParams": expandParams || ""
        }),
        "headers": {
            "Host": "cactus.jd.com",
            "Content-Type": "application/json",
            "User-agent": ua
        },
        "timeout": 10000
    };
    return new Promise(async resolve => {
        SendPost(opt, (err, resp, data) => {
            try {
                if (err) {
                    console.log("" + JSON.stringify(err));
                    console.log("getgo 请求失败，请检查网路重试");
                } else {
                    data = JSON.parse(data);
                    data = data.data.result;
                }
            } catch (e) {
                console(e, resp);
            } finally {
                resolve(data);
            }
        });
    });
}

async function getbody(opt) {
    let version = "3.1",
    {body,ua,pin,ver,cl,fn,appId,apid,code,flag} = opt;

    if (!appIdAlgo[appId] || flag) {
        appIdAlgo[appId] = {};
        appIdAlgo[appId].fp = generateFp(version);
    }
    var sua=ua.match(/\(([^)]+)\)/)[1];
    body = typeof body !== "string" ? JSON.stringify(body) : body;
    let expandParams = CryptoJS.AES.encrypt(JSON.stringify({
        "wc":1,"wd":0,"l":"zh-CN","ls":"zh-CN","ml":0,"pl":0,"av":"",ua,
        "sua":sua,"pp":{"p1":pin},"pp1":"","w":393,"h":873,
        "ow":393,"oh":779,"url":"","og":"","pr":2.75,"re":"","ai":appId,"fp":appIdAlgo[appId].fp
    }, null, 2), CryptoJS.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
        "iv": CryptoJS.enc.Utf8.parse("0102030405060708"),
        "mode": CryptoJS.mode.CBC,
        "padding": CryptoJS.pad.Pkcs7
    }).ciphertext.toString(),
    t = new Date().getTime();

    if (!appIdAlgo[appId].tk || flag) {
        let Algo = await genAlgo(appId, appIdAlgo[appId].fp, ua, expandParams, version);
        appIdAlgo[appId].tk = Algo.tk;
        appIdAlgo[appId].algo = Algo.algo;
    }

    const time = new Date().getTime(),
        timeDate = new Date(time).Format("yyyyMMddhhmmssSSS"),
        tk = appIdAlgo[appId].tk,
        genKey = new Function("return " + appIdAlgo[appId].algo)();
    let Key = await genKey(tk, appIdAlgo[appId].fp, timeDate, appId, CryptoJS).toString();
    const Data = {
        "appid": apid,
        "functionId": fn,
        "body": body,
        "clientVersion": ver,
        "client": cl,
        "t":code?t:""
    };
    Date.now() > "1680278400000" && (Data.functionId = "");
    let str = ["appid", "body", "client", "clientVersion", "functionId", "t"].filter(item => Data[item])
    .map(k => k + ":" + (k == "body" ? CryptoJS.SHA256(Data[k]).toString() : Data[k])).join("&"),
    HmacSHA256 = CryptoJS.HmacSHA256(str, Key).toString(CryptoJS.enc.Hex);
    let enStr = CryptoJS.AES.encrypt(JSON.stringify({
        "sua": sua,
        "pp": {"p1":pin},
        "fp": appIdAlgo[appId].fp
    }, null, 2), CryptoJS.enc.Utf8.parse("wm0!@w_s#ll1flo("), {
        "iv": CryptoJS.enc.Utf8.parse("0102030405060708"),
        "mode": CryptoJS.mode.CBC,
        "padding": CryptoJS.pad.Pkcs7
    }).ciphertext.toString();
    __dirname.split(/[\\/]/).pop() !== "function" && (timeDate = timeDate - 1);
    let h5st = [timeDate, appIdAlgo[appId].fp, appId, tk, HmacSHA256, version, time, enStr].join(";");
    return "functionId=" + fn + "&body=" + encodeURIComponent(body) + "&t=" + t + "&appid=" + apid + "&client=" + cl + "&clientVersion=" + ver + "&h5st=" + encodeURIComponent(h5st);
}

function SendPost(opt, resolve = () => { }) {
    const {
        url: url,
        ...opt2
    } = opt;
    got.post(url, opt2).then(data => {
        const {statusCode,headers,body} = data;
        resolve(null, {"status": statusCode,statusCode,headers,body}, body);
    }, d => {
        const {message,response} = d;
        resolve(message, response, response && response.body);
    });
}
console.log(__dirname);

module.exports = {
    "getbody": getbody
};