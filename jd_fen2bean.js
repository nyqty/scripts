/**
2023/2/7  create
只积分换豆，换积分用jd_washbean.js
默认定时不执行，自行设置
33 2 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_fen2bean.js
问题建议TG -> https://t.me/dylan_jdpro
*/
const Env=require('./utils/Env.js');
const $ = new Env("物流积分换豆");
const _0x43cfd3 = $.isNode() ? require("./sendNotify") : "",
    _0x379fa0 = $.isNode() ? require("./jdCookie.js") : "";
let _0x2b1b05 = [],
    _0x125d65 = "",
    _0x113667;
if ($.isNode()) {
    Object.keys(_0x379fa0).forEach(_0x473cc2 => {
        _0x2b1b05.push(_0x379fa0[_0x473cc2]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x2b1b05 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x39fb52 => _0x39fb52.cookie)].filter(_0x40b818 => !!_0x40b818);
}
!(async () => {
    if (!_0x2b1b05[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }
    $.log("\n有问题联系TG-> https://t.me/dylan_jdpro\n");
    for (let _0x2d894c = 0; _0x2d894c < _0x2b1b05.length; _0x2d894c++) {
        if (_0x2b1b05[_0x2d894c]) {
            _0x125d65 = _0x2b1b05[_0x2d894c];
            $.UserName = decodeURIComponent(_0x125d65.match(/pt_pin=([^; ]+)(?=;?)/) && _0x125d65.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x2d894c + 1;
            $.isLogin = true;
            $.nickName = "";
            await _0x5bae1c();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            if (!$.isLogin) {
                const _0x3b1109 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x3b1109);
                $.isNode() && (await _0x43cfd3.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }
            await _0x2ba0d5();
            await $.wait(2000);
        }
    }
})().catch(_0x1f1564 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1f1564 + "!", "");
}).finally(() => {
    $.done();
});
async function _0x2ba0d5() {
    await _0xcc707d();
    await $.wait(500);
    if ($.cu_integral == undefined) {
        console.log("未获取到积分信息，跳出！");
        return;
    }
    if ($.cu_integral >= "5000") {
        $.cu_integral = 2000;
    }
    if ($.cu_integral >= "100") {
        $.log("开始兑换" + $.cu_integral + "京豆\n");
        await _0x10213a(2, $.cu_integral);
        $.sflag && (await $.wait(1000), await _0x10213a(2, $.cu_integral));
    } else {
        {
            $.log("积分不足100，跳过兑换\n");
            return;
        }
    }
}
function _0x44da0f() {
    return new Promise(async _0x542955 => {
        const _0xca471d = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Cookie": _0x125d65,
            "Host": "wq.jd.com",
            "Referer": "https://wqs.jd.com/promote/201801/bean/mybean.html",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
        };
        const _0x45b439 = {
            "url": "https://wq.jd.com/activep3/singjd/queryexpirejingdou?_=" + Date.now() + "&g_login_type=1&sceneval=2",
            "headers": _0xca471d
        };
        $.get(_0x45b439, (_0x5ebe65, _0x22dad6, _0x1067be) => {
            try {
                if (_0x5ebe65) {
                    console.log("" + JSON.stringify(_0x5ebe65));
                    console.log("getexpirebeans API请求失败，请检查网路重试");
                } else {
                    if (_0x1067be) {
                        _0x1067be = JSON.parse(_0x1067be.slice(23, -13));
                        _0x113667 = 0;
                        if (_0x1067be.ret === 0) {
                            _0x1067be.expirejingdou.forEach(_0x599855 => {
                                _0x113667 += _0x599855.expireamount;
                            });
                            $.log("近七天将过期京豆" + _0x113667 + "个\n");
                        }
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x2c9df3) {
                $.logErr(_0x2c9df3, _0x22dad6);
            } finally {
                _0x542955();
            }
        });
    });
}
function _0x98bbd8() {
    return new Promise(async _0x50ac6f => {
        $.post(_0x38ab4c("integralHistory", "[{\"pin\":\"$cooMrdGatewayUid$\", \"pageSize\":10,\"pageNo\":1}]"), (_0x1a09c2, _0x252c9d, _0x3b7aa6) => {
            try {
                if (_0x1a09c2) {
                    $.log("" + JSON.stringify(_0x1a09c2));
                    $.log(" API请求失败，请检查网路重试");
                } else {
                    _0x3b7aa6 = JSON.parse(_0x3b7aa6);
                    if (_0x3b7aa6.success) {
                        $.log("积分收支记录：");
                        let _0x3be3c8 = _0x3b7aa6.content.slice(0, 7);
                        _0x3be3c8.forEach(_0x3cd8a9 => {
                            console.log(_0x3cd8a9.sceneName + "：" + _0x3cd8a9.integration + " at " + new Date(_0x3cd8a9.createTime).toLocaleString());
                        });
                    }
                }
            } catch (_0x5757af) {
                $.log(_0x5757af, _0x252c9d);
            } finally {
                _0x50ac6f();
            }
        });
    });
}
function _0xcc707d() {
    return new Promise(async _0x12b516 => {
        $.post(_0x38ab4c("userAccount", "[{\"pin\":\"$cooMrdGatewayUid$\"}]"), (_0x208431, _0x4e34d9, _0x13fff7) => {
            try {
                _0x208431 ? ($.log("" + JSON.stringify(_0x208431)), $.log(" API请求失败，请检查网路重试")) : (_0x13fff7 = JSON.parse(_0x13fff7), _0x13fff7.success && ($.cu_integral = _0x13fff7.content.integral, $.log("当前总积分：" + $.cu_integral + "\n")));
            } catch (_0x1ec4df) {
                $.log(_0x1ec4df, _0x4e34d9);
            } finally {
                _0x12b516();
            }
        });
    });
}
function _0x10213a(_0x6b70a6, _0x35235a) {
    let _0x181997;
    $.sflag = false;
    _0x6b70a6 == 1 ? _0x181997 = "京豆兑换物流积分" : _0x181997 = "物流积分兑换京豆";
    let _0x390f7d = _0x4521be("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"),
        _0x178bde = "[{\"businessNo\":\"" + _0x390f7d + "\",\"title\":\"" + _0x181997 + "\",\"pin\" : \"$cooMrdGatewayUid$\",\"type\":" + _0x6b70a6 + ",\"transferNumber\":" + _0x35235a + " }]";
    return new Promise(_0x2d0ed7 => {
        $.post(_0x38ab4c("transfer", _0x178bde), (_0x57c8d0, _0x282962, _0x5ef1ca) => {
            try {
                if (_0x57c8d0) {
                    $.log(JSON.stringify(_0x57c8d0));
                    $.log("请求失败");
                } else {
                    _0x5ef1ca = JSON.parse(_0x5ef1ca);
                    if (_0x5ef1ca.code == 1) {
                        $.log("兑换成功！\n");
                    } else {
                        _0x5ef1ca.code == 2005 ? $.log("今日兑换额度已达上限，明日赶早！\n") : ($.sflag = true, console.log(JSON.stringify(_0x5ef1ca)), console.log("\n兑换失败，重试\n"));
                    }
                }
            } catch (_0xc2f3a4) {
                $.log(_0xc2f3a4, _0x282962);
            } finally {
                _0x2d0ed7();
            }
        });
    });
}
function _0x3be4b9(_0x44b275, _0x58c20f) {
    var _0x20542a = _0x44b275.slice(0),
        _0x4fbee7 = _0x44b275.length,
        _0x28f9bf = _0x4fbee7 - _0x58c20f,
        _0x38b3a6,
        _0x5d4332;
    while (_0x4fbee7-- > _0x28f9bf) {
        _0x5d4332 = Math.floor((_0x4fbee7 + 1) * Math.random());
        _0x38b3a6 = _0x20542a[_0x5d4332];
        _0x20542a[_0x5d4332] = _0x20542a[_0x4fbee7];
        _0x20542a[_0x4fbee7] = _0x38b3a6;
    }
    return _0x20542a.slice(_0x28f9bf);
}
function _0x38ab4c(_0x22f158, _0x54faaf) {
    const _0x141940 = {
        "peHfn": "*/*",
        "HmkVo": "zh-cn",
        "sLjqd": "https://jingcai-h5.jd.com/",
        "yQSlh": "gzip, deflate, br",
        "LsBfi": "{\"appid\":158,\"ticket_type\":\"m\"}",
        "wRnyc": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/16A366 Safari/604.1",
        "rWyxB": "jingcai.jd.com",
        "JQGme": "application/json, text/plain, */*"
    };
    const _0x121fb9 = {
        "Accept": _0x141940.peHfn,
        "Cookie": _0x125d65,
        "Accept-Language": _0x141940.HmkVo,
        "Referer": _0x141940.sLjqd,
        "Accept-Encoding": _0x141940.yQSlh,
        "AppParams": _0x141940.LsBfi,
        "User-Agent": _0x141940.wRnyc,
        "access": "H5",
        "LOP-DN": _0x141940.rWyxB,
        "Content-Type": "application/json;charset=utf-8"
    };
    _0x121fb9.Accept = _0x141940.peHfn;
    _0x121fb9.Cookie = _0x125d65;
    _0x121fb9["Accept-Language"] = _0x141940.HmkVo;
    _0x121fb9.Referer = _0x141940.sLjqd;
    _0x121fb9["Accept-Encoding"] = _0x141940.yQSlh;
    _0x121fb9.AppParams = _0x141940.LsBfi;
    _0x121fb9["User-Agent"] = _0x141940.wRnyc;
    _0x121fb9.access = "H5";
    _0x121fb9["LOP-DN"] = _0x141940.rWyxB;
    _0x121fb9["Accept-Language"] = _0x141940.HmkVo;
    _0x121fb9.Accept = _0x141940.JQGme;
    _0x121fb9["Content-Type"] = "application/json;charset=utf-8";
    const _0x4b5ea5 = {
        "url": "https://lop-proxy.jd.com/JingIntegralApi/" + _0x22f158,
        "headers": _0x121fb9,
        "body": _0x54faaf
    };
    return _0x4b5ea5;
}
function _0x4521be(_0x3e49cb = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x467e98 = 0) {
    return _0x3e49cb.replace(/[xy]/g, function (_0x183cdc) {
        var _0x4b968c = Math.random() * 16 | 0,
            _0x6dca43 = _0x183cdc == "x" ? _0x4b968c : _0x4b968c & 3 | 8;
        _0x467e98 ? busNo = _0x6dca43.toString(36).toUpperCase() : busNo = _0x6dca43.toString(36);
        return busNo;
    });
}
function _0x5bae1c() {
    return new Promise(async _0x48a888 => {
        const _0x482c4f = {
            "url": "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
            "headers": {
                "Host": "wq.jd.com",
                "Accept": "*/*",
                "Connection": "keep-alive",
                "Cookie": _0x125d65,
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        };
        $.get(_0x482c4f, (_0x8f5d4f, _0x3e9f2d, _0x484c6a) => {
            try {
                if (_0x8f5d4f) {
                    $.logErr(_0x8f5d4f);
                } else {
                    if (_0x484c6a) {
                        _0x484c6a = JSON.parse(_0x484c6a);
                        if (_0x484c6a.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }
                        _0x484c6a.retcode === 0 && _0x484c6a.data && _0x484c6a.data.hasOwnProperty("userInfo") && ($.nickName = _0x484c6a.data.userInfo.baseInfo.nickname);
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0xe90596) {
                $.logErr(_0xe90596);
            } finally {
                _0x48a888();
            }
        });
    });
}