/*
金融签到，领取双签礼包
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_jrsign.js
只运行前10，多了也是黑ip
* */
const Env=require('./utils/Env.js');
const $ = new Env("金融签到");
const _0x2f2f39 = $.isNode() ? require("jsdom") : "",
    _0x398982 = "https://ms.jr.jd.com/gw/generic/hy/h5/m",
    _0x3e795c = $.isNode() ? require("./sendNotify") : "",
    _0x237f67 = $.isNode() ? require("./jdCookie.js") : "";
let _0x5d75e9 = [],
    _0x1d773e = "";
if ($.isNode()) {
    Object.keys(_0x237f67).forEach(_0x27bde8 => {
        _0x5d75e9.push(_0x237f67[_0x27bde8]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x5d75e9 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x193687($.getdata("CookiesJD") || "[]").map(_0x118cfb => _0x118cfb.cookie)].filter(_0x278d3b => !!_0x278d3b);
}
!(async () => {
    if (!_0x5d75e9[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }
    $.geteid = {};
    await _0x370b07();
    JSON.stringify($.getid) == "{}" && ($.getid.jstub = "BW6T4437AB2RMXKMPMWZOV3PBU6KWRQV2GIOLTKZKUEYGJ44RCKTUZXGZQ7N553SU4HPEDYDHP7B6SWDOVCGYDKRQTC3NGZC2OCTQ5Q", $.getid.sdkToken = "", $.getid.token = "4NZZKHI4EJTZ5OP4Y7S7B4WZBA243SHJSMLKFKPWIX4G27GYSEZU2XJKGBOQERJIDIIWEUF7ILI2M");
    $.getid.eid = "";
    for (let _0x35a6b2 = 0; _0x35a6b2 < "10"; _0x35a6b2++) {
        if (_0x5d75e9[_0x35a6b2]) {
            _0x1d773e = _0x5d75e9[_0x35a6b2];
            $.UserName = decodeURIComponent(_0x1d773e.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1d773e.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x35a6b2 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.stopNext = false;
            $.getid.fp = _0x486b48("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x1df1e2();
            console.log("\n***********开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "********\n");
            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x3e795c.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }
            await _0xf1fb1f();
            await $.wait(10000);
        }
    }
})().catch(_0x455bf5 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x455bf5 + "!", "");
}).finally(() => {
    $.done();
});
async function _0xf1fb1f() {
    await _0x29381e();
    await $.wait(500);
    await _0x538dde();
    await $.wait(500);
    await _0x263853();
}
function _0x29381e() {
    const _0x249f96 = {
        "channel": "sy",
        "channelLv": "sy"
    };
    body = _0x249f96;
    return new Promise(async _0x1736c5 => {
        $.post(_0x33b473("getRSAPubKey", body), (_0x57d35e, _0x5f4df4, _0x4edc84) => {
            try {
                _0x57d35e ? (console.log("" + JSON.stringify(_0x57d35e)), console.log("getRSAPubKey API请求失败，请检查网路重试")) : _0x4edc84 ? (_0x4edc84 = JSON.parse(_0x4edc84), _0x4edc84.resultData && _0x4edc84.resultCode === 0 && ($.rsaKey = _0x4edc84.resultData.resBusiData)) : console.log("京东服务器返回空数据");
            } catch (_0x466150) {
                $.logErr(_0x466150, _0x5f4df4);
            } finally {
                _0x1736c5();
            }
        });
    });
}
function _0x3b0fa4() {
    const _0x562512 = {
        "channelSource": "JRAPP6.0",
        "riskDeviceParam": "{\"eid\":\"\",\"fp\":\"\",\"sdkToken\":\"\",\"token\":\"\"}",
        "site": "JD_JR_APP",
        "channel": "sy",
        "channelLv": "sy"
    };
    body = _0x562512;
    return new Promise(async _0x3b4879 => {
        $.post(_0x33b473("querySignCalendar", body), (_0x6dd5a3, _0xd3d65c, _0x4be894) => {
            try {
                _0x6dd5a3 ? (console.log("" + JSON.stringify(_0x6dd5a3)), console.log("queryDrawChance API请求失败，请检查网路重试")) : _0x4be894 ? (_0x4be894 = JSON.parse(_0x4be894), _0x4be894.resultData && _0x4be894.resultCode === 0 && ($.noa = _0x4be894.resultData.resBusiData.noa)) : console.log("京东服务器返回空数据");
            } catch (_0x392857) {
                $.logErr(_0x392857, _0xd3d65c);
            } finally {
                _0x3b4879();
            }
        });
    });
}
function _0x538dde() {
    let _0x4fcb7d = $.ar2.nonce(),
        _0x256795 = {
            "videoId": "311372930347370496",
            "channelSource": "JRAPP6.0",
            "noa": _0x4fcb7d
        };
    $.cry.setPublicKeyString($.rsaKey);
    let _0x4ae104 = $.cry.encryptData(JSON.stringify(_0x256795)).cipher;
    const _0x361125 = {
        ...$.getid
    };
    let _0x478160 = {
        "site": "JD_JR_APP",
        "videoId": "311372930347370496",
        "channelSource": "JRAPP6.0",
        "encryptData": _0x4ae104,
        "riskDeviceParam": _0x361125,
        "deviceInfo": JSON.stringify({
            "deviceId": "",
            "clientType": "android",
            "user_agent": $.UA,
            "iosType": "android",
            "osv": "12",
            "brand": "Redmi",
            "hwv": "",
            "network": 1,
            "mac": "",
            "androidId": "",
            "oaid": ""
        }),
        "adInfo": JSON.stringify({
            "deviceId": "",
            "clientType": "android",
            "user_agent": $.UA,
            "iosType": "android",
            "osv": "12",
            "brand": "Redmi",
            "hwv": "",
            "network": 1,
            "mac": "",
            "androidId": "",
            "oaid": ""
        }),
        "clientType": "android",
        "arrEncrypt": true
    };
    sign = $.ar2.sign(JSON.stringify(_0x478160), _0x4fcb7d);
    const _0x4a804d = {
        ...$.getid
    };
    body = {
        "site": "JD_JR_APP",
        "videoId": "311372930347370496",
        "channelSource": "JRAPP6.0",
        "encryptData": _0x4ae104,
        "riskDeviceParam": JSON.stringify(_0x4a804d),
        "deviceInfo": JSON.stringify({
            "deviceId": "",
            "clientType": "android",
            "user_agent": $.UA,
            "iosType": "android",
            "osv": "12",
            "brand": "Redmi",
            "hwv": "",
            "network": 1,
            "mac": "",
            "androidId": "",
            "oaid": ""
        }),
        "adInfo": JSON.stringify({
            "deviceId": "",
            "clientType": "android",
            "user_agent": $.UA,
            "iosType": "android",
            "osv": "12",
            "brand": "Redmi",
            "hwv": "",
            "network": 1,
            "mac": "",
            "androidId": "",
            "oaid": ""
        }),
        "clientType": "android",
        "arrEncrypt": true,
        "signData": JSON.stringify(_0x478160),
        "signature": sign,
        "nonce": _0x4fcb7d,
        "channel": "sy",
        "channelLv": "sy"
    };
    return new Promise(async _0x554579 => {
        $.post(_0x33b473("jrSign", body), (_0x5f722e, _0x3ac99c, _0x2e658) => {
            try {
                if (_0x5f722e) {
                    console.log("" + JSON.stringify(_0x5f722e));
                    console.log("jrSign API请求失败，请检查网路重试");
                } else {
                    if (_0x2e658) {
                        _0x2e658 = JSON.parse(_0x2e658);
                        if (_0x2e658.resultData && _0x2e658.resultCode === 0) {
                            if (_0x2e658.resultData.resBusiCode == 0) {
                                console.log("签到成功！");
                            } else {
                                _0x2e658.resultData.resBusiCode == 15 ? console.log("今日已签到！") : console.log(_0x2e658.resultData.resBusiMsg);
                            }
                        }
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x9343e) {
                $.logErr(_0x9343e, _0x3ac99c);
            } finally {
                _0x554579();
            }
        });
    });
}
function _0x263853(_0x5bdf64 = false) {
    let _0x24c0a3 = $.ar2.nonce(),
        _0x550599 = Date.now(),
        _0x523223 = $.ar2.sign(JSON.stringify({
            "t": _0x550599
        }), _0x24c0a3),
        _0x21c041 = {
            "channel": "JD",
            "actCode": "F68B2C3E71",
            "type": 4,
            "frontParam": {
                "channel": "JD",
                "belong": "jingdou",
                "signData": JSON.stringify({
                    "t": _0x550599
                }),
                "nonce": _0x24c0a3,
                "signature": _0x523223,
                "riskDeviceParam": {
                    ...$.getid
                }
            },
            "riskDeviceParam": {}
        },
        _0x234152 = {
            "url": "https://nu.jr.jd.com/gw/generic/jrm/h5/m/process?_=" + new Date().getTime(),
            "headers": {
                "Host": "nu.jr.jd.com",
                "Accept": "application/json",
                "User-Agent": $.UA,
                "Origin": "https://m.jr.jd.com",
                "Referer": "https://m.jr.jd.com/",
                "cookie": _0x1d773e,
                "X-Requested-With": "com.jingdong.app.mall"
            },
            "body": "reqData=" + encodeURIComponent(JSON.stringify(_0x21c041))
        };
    return new Promise(async _0x517a7c => {
        $.post(_0x234152, (_0x36a2a5, _0x4f3fbc, _0x5df51f) => {
            try {
                if (_0x36a2a5) {
                    console.log("" + JSON.stringify(_0x36a2a5));
                    console.log("signaward API请求失败，请检查网路重试");
                } else {
                    if (_0x5df51f) {
                        _0x5df51f = JSON.parse(_0x5df51f);
                        if (_0x5df51f.resultData && _0x5df51f.resultCode === 0) {
                            if (_0x5df51f.resultData.data.businessData.businessCode == "000sq") {
                                console.log("双签礼包：" + _0x5df51f.resultData.data.businessData.businessData.awardListVo[0].name);
                            } else {
                                console.log("双签礼包：" + _0x5df51f.resultData.data.businessData.businessMsg);
                            }
                        }
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x187a4c) {
                $.logErr(_0x187a4c, _0x4f3fbc);
            } finally {
                _0x517a7c();
            }
        });
    });
}
function _0x1df1e2() {
    return new Promise(async _0x4ff37c => {
        const _0x2a1f6b = {
            "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": _0x1d773e,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
            }
        };
        $.post(_0x2a1f6b, (_0x261052, _0x4b5824, _0x22f92c) => {
            try {
                if (_0x261052) {
                    console.log("" + JSON.stringify(_0x261052));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (_0x22f92c) {
                        _0x22f92c = JSON.parse(_0x22f92c);
                        if (_0x22f92c.retcode === 13) {
                            $.isLogin = false;
                            return;
                        }
                        _0x22f92c.retcode === 0 ? $.nickName = _0x22f92c.base && _0x22f92c.base.nickname || $.UserName : $.nickName = $.UserName;
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x61fcb4) {
                $.logErr(_0x61fcb4, _0x4b5824);
            } finally {
                _0x4ff37c();
            }
        });
    });
}
function _0x33b473(_0x2fb537, _0x1e7175) {
    return {
        "url": _0x398982 + "/" + _0x2fb537,
        "headers": {
            "Host": "ms.jr.jd.com",
            "Accept": "application/json",
            "User-Agent": $.UA,
            "Origin": "https://member.jr.jd.com",
            "Referer": "https://member.jr.jd.com/",
            "cookie": _0x1d773e
        },
        "body": "reqData=" + encodeURIComponent(JSON.stringify(_0x1e7175))
    };
}
async function _0x370b07() {
    const {
        JSDOM: _0x2a3397
    } = _0x2f2f39;
    let _0x12c6b0 = new _0x2f2f39.ResourceLoader({
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
        "referer": "https://u.jr.jd.com/"
    }),
        _0x2a5be2 = new _0x2f2f39.VirtualConsole();
    const _0x25e590 = {
        "url": "https://u.jr.jd.com/uc-fe-wxgrowing/18-quan-yi-day/index.html",
        "referer": "https://u.jr.jd.com/",
        "userAgent": "Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.2.0.302) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.0.2.301 Mobile Safari/537.36",
        "runScripts": "dangerously",
        "resources": _0x12c6b0,
        "includeNodeLocations": true,
        "storageQuota": 10000000,
        "pretendToBeVisual": true,
        "virtualConsole": _0x2a5be2
    };
    const _0x4a39b3 = new _0x2a3397("<body>\n  <script src=\"https://jrsecstatic.jdpay.com/jr-sec-dev-static/aar2.min.js\"></script>\n  <script src=\"https://m.jr.jd.com/common/jssdk/jrbridge/2.0.0/jrbridge.js\"></script>\n  <script src=\"https://jrsecstatic.jdpay.com/jr-sec-dev-static/cryptico.min.js\"></script>\n  <script src=\"//gia.jd.com/m.html\"></script>\n  <script src=\"//gias.jd.com/js/m.js\"></script>\n  </body>", _0x25e590);
    await $.wait(1500);
    try {
        $.getid = _0x4a39b3.window.getJdEid();
        _0x4a39b3.window.AAR2.init();
        $.ar2 = new _0x4a39b3.window.AAR2();
        $.cry = _0x4a39b3.window.cryptico;
    } catch (_0x1fd4e7) { }
}
function _0x193687(_0x572e02) {
    if (typeof _0x572e02 == "string") {
        try {
            return JSON.parse(_0x572e02);
        } catch (_0x1cb1fc) {
            console.log(_0x1cb1fc);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function _0x486b48(_0x4332ec = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x38efe4 = 0) {
    return _0x4332ec.replace(/[xy]/g, function (_0x184dbe) {
        var _0x2522c6 = Math.random() * 16 | 0,
            _0x1ab180 = _0x184dbe == "x" ? _0x2522c6 : _0x2522c6 & 3 | 8;
        _0x38efe4 ? uuid = _0x1ab180.toString(36).toUpperCase() : uuid = _0x1ab180.toString(36);
        return uuid;
    });
}