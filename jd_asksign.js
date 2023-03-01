/*
5 5 * * * jd_asksign.js
*/
const Env=require('./utils/Env.js');
const $ = new Env("不知啥签到");
const _0x37d7a4 = $.isNode() ? require("./sendNotify") : "",
    _0x1d5260 = $.isNode() ? require("./jdCookie.js") : "";
let _0x173b0f = true,
    _0x1143ea = [],
    _0x471fbe = "",
    _0x1378b8 = "";
if ($.isNode()) {
    Object.keys(_0x1d5260).forEach(_0x4dac2f => {
        _0x1143ea.push(_0x1d5260[_0x4dac2f]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x1143ea = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x7608c3($.getdata("CookiesJD") || "[]").map(_0x157219 => _0x157219.cookie)].filter(_0xcffb5c => !!_0xcffb5c);
}
!(async () => {
    if (!_0x1143ea[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }
    for (let _0x329ecd = 0; _0x329ecd < _0x1143ea.length; _0x329ecd++) {
        if (_0x1143ea[_0x329ecd]) {
            _0x471fbe = _0x1143ea[_0x329ecd];
            $.UserName = decodeURIComponent(_0x471fbe.match(/pt_pin=([^; ]+)(?=;?)/) && _0x471fbe.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x329ecd + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x1249ff();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            if (!$.isLogin) {
                const _0x395d28 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x395d28);
                $.isNode() && (await _0x37d7a4.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }
            await _0x3237f1();
            await $.wait(1000);
            await _0x3824b1();
            await $.wait(5000);
        }
    }
})().catch(_0x410dcf => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x410dcf + "!", "");
}).finally(() => {
    $.done();
});
async function _0x3824b1() {
    return new Promise(async _0x30c22c => {
        $.get(_0x4c061e(), async (_0x1ea25a, _0x264ac7, _0x570c02) => {
            try {
                if (_0x1ea25a) {
                    console.log("" + JSON.stringify(_0x1ea25a));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x570c02 = JSON.parse(_0x570c02);
                    if (_0x570c02.success) {
                        _0x570c02.data.jdBeanQuantity && console.log("签到成功，获得" + _0x570c02.data.jdBeanQuantity + "京豆");
                    } else {
                        console.log(_0x570c02.errorMessage);
                    }
                }
            } catch (_0x1b34aa) {
                $.logErr(_0x1b34aa, _0x264ac7);
            } finally {
                _0x30c22c(_0x570c02);
            }
        });
    });
}
async function _0x3237f1() {
    const _0x4083d3 = {
        "Referer": "https://sendbeans.jd.com/",
        "User-Agent": $.UA,
        "Cookie": _0x471fbe
    };
    const _0x3a910c = {
        "url": "https://sendbeans.jd.com/api/turncard/chat/detail?turnTableId=1446&shopId=1000411104",
        "headers": _0x4083d3
    };
    return new Promise(async _0x8d3b0a => {
        $.get(_0x3a910c, async (_0x3c4288, _0x15ae3b, _0xadde0b) => {
            try {
                _0x3c4288 ? (console.log("" + JSON.stringify(_0x3c4288)), console.log(" API请求失败，请检查网路重试")) : _0xadde0b = JSON.parse(_0xadde0b);
            } catch (_0x463deb) {
                $.logErr(_0x463deb, _0x15ae3b);
            } finally {
                _0x8d3b0a(_0xadde0b);
            }
        });
    });
}
function _0x4c061e() {
    const _0x3c322d = {
        "Host": "sendbeans.jd.com",
        "Referer": "https://sendbeans.jd.com/",
        "User-Agent": $.UA,
        "Cookie": _0x471fbe
    };
    const _0x2217a9 = {
        "url": "https://sendbeans.jd.com/api/turncard/chat/sign?turnTableId=1446&shopId=1000411104&fp=&eid=",
        "headers": _0x3c322d
    };
    return _0x2217a9;
}
function _0x1249ff() {
    return new Promise(_0x52015e => {
        const _0x4bf30f = {
            "Cookie": _0x471fbe,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x4b6917 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0x4bf30f,
            "timeout": 10000
        };
        $.get(_0x4b6917, (_0x446f03, _0x2e82c3, _0x47cb87) => {
            try {
                if (_0x47cb87) {
                    _0x47cb87 = JSON.parse(_0x47cb87);
                    if (!(_0x47cb87.islogin === "1")) {
                        _0x47cb87.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x1d937c) {
                console.log(_0x1d937c);
            } finally {
                _0x52015e();
            }
        });
    });
}
function _0x43fbe2() {
    return new Promise(_0x580bd5 => {
        !_0x173b0f ? $.msg($.name, "", "" + _0x1378b8) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x1378b8);
        _0x580bd5();
    });
}
function _0x565ba5(_0x177653) {
    try {
        if (typeof JSON.parse(_0x177653) == "object") {
            return true;
        }
    } catch (_0x59e2f4) {
        console.log(_0x59e2f4);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}
function _0x7608c3(_0x45b85c) {
    if (typeof _0x45b85c == "string") {
        try {
            return JSON.parse(_0x45b85c);
        } catch (_0x39261a) {
            console.log(_0x39261a);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}