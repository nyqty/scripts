/*
参加双人赛，获胜可得300积分
1 1 1 1 * jd_joymatch.js
 */
const Env=require("./utils/Env")
const $ = new Env("宠汪汪-双人赛");
const _0x190e06 = $.isNode() ? require("./sendNotify") : "",
    _0x3c75a9 = $.isNode() ? require("./jdCookie.js") : "";
let _0xcc2443 = true,
    _0x5a02bf = [],
    _0x10a129 = "",
    _0xc3eda8 = "";
if ($.isNode()) {
    Object.keys(_0x3c75a9).forEach(_0x3e3246 => {
        _0x5a02bf.push(_0x3c75a9[_0x3e3246]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x5a02bf = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3c3d46($.getdata("CookiesJD") || "[]").map(_0x4c1674 => _0x4c1674.cookie)].filter(_0x272543 => !!_0x272543);
}
!(async () => {
    if (!_0x5a02bf[0]) {
        const _0x29026a = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x29026a);
        return;
    }
    if (new Date().getHours() < 9 || new Date().getHours() > 21) {
        console.log("不在参赛时间，退出");
        return;
    }
    for (let _0x4c6d1e = 0; _0x4c6d1e < _0x5a02bf.length; _0x4c6d1e++) {
        if (_0x5a02bf[_0x4c6d1e]) {
            _0x10a129 = _0x5a02bf[_0x4c6d1e];
            $.UserName = decodeURIComponent(_0x10a129.match(/pt_pin=([^; ]+)(?=;?)/) && _0x10a129.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x4c6d1e + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x5b1003();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            if (!$.isLogin) {
                const _0x7ae448 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x7ae448);
                if ($.isNode()) {
                    await _0x190e06.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }
                continue;
            }
            await _0x2de48e(false);
            await $.wait(500);
            $.result == "unreceive" && (await _0xe98123());
            await $.wait(500);
            await _0x3003e1();
            await $.wait(2000);
            await _0x2de48e();
            await $.wait(10000);
        }
    }
})().catch(_0x317e0c => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x317e0c + "!", "");
}).finally(() => {
    $.done();
});
async function _0x3003e1() {
    const _0x46e7f3 = {
        "Host": "api.m.jd.com",
        "Origin": "https://h5.m.jd.com",
        "Content-Type": "application/json",
        "User-Agent": $.UA,
        "Cookie": _0x10a129
    };
    const _0x33d9eb = {
        "url": "https://api.m.jd.com/api?client=android&clientVersion=11.6.0&appid=jdchoujiang_h5&t=1677312471257&functionId=combatMatch&body=%7B%22teamLevel%22%3A%222%22%2C%22reqSource%22%3A%22h5%22%7D&h5st=&uuid=&eu=&fv=&build=98666&osVersion=12&networkType=wifi&oaid=",
        "headers": _0x46e7f3
    };
    return new Promise(async _0x3e260c => {
        $.get(_0x33d9eb, async (_0xd32d3a, _0x2d82d8, _0x16384a) => {
            try {
                if (_0xd32d3a) {
                    console.log("" + JSON.stringify(_0xd32d3a));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x16384a = JSON.parse(_0x16384a);
                    _0x16384a.success ? console.log("参赛成功！") : console.log(_0x16384a.errorMessage);
                }
            } catch (_0x8538a6) {
                $.logErr(_0x8538a6, _0x2d82d8);
            } finally {
                _0x3e260c(_0x16384a);
            }
        });
    });
}
async function _0xe98123() {
    const _0x4e6286 = {
        "Host": "api.m.jd.com",
        "Origin": "https://h5.m.jd.com",
        "Content-Type": "application/json",
        "User-Agent": $.UA,
        "Cookie": _0x10a129
    };
    const _0x2865a6 = {
        "url": "https://api.m.jd.com/api?client=android&clientVersion=11.6.0&appid=jdchoujiang_h5&t=1677312458500&functionId=combatReceive&body={%22reqSource%22:%22h5%22}&h5st=20230225160738785%3B9700942244965183%3B04889%3Btk02w5fc71afb18nqVADaN0oUst3H1GjS59nqN4u3%2BdF%2BH%2Bf2ZHBqC5mo2aON02zX4GOwhgEN80%2Brx9hawWd0OxLotth%3B16165b4fd4b3fb4aff89e71886a2fa4824e1e1079208534ff92481b4c7518898%3B3.1%3B1677312458785%3B62f4d401ae05799f14989d31956d3c5fe4d0c9245dd6c1a41e80e50875d9afa0cce84d8dd9669ec8b4ce610fa638083c3ce3263965813b4c7f07c5d958c86f4ceaca9007ba547a6573c1035d84bc2f08dc85fe1b4c40f448dd28e6ec7583f12f1ebb4f5406e8f6d70ccc6ea5655c2cd2a399971544498707ba5104c2ecf7a35f5a953f26df394f8e452b6c1a970e90c6&uuid=&eu=&fv=&build=98666&osVersion=12&networkType=wifi&partner=xiaomi001&d_brand=Redmi&aid=&oaid=",
        "headers": _0x4e6286
    };
    return new Promise(async _0x5e4bdb => {
        $.get(_0x2865a6, async (_0x523b41, _0x23fcf6, _0x54f97d) => {
            try {
                if (_0x523b41) {
                    console.log("" + JSON.stringify(_0x523b41));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x54f97d = JSON.parse(_0x54f97d);
                    _0x54f97d.success ? console.log("上轮比赛第一名，获得300积分！\n") : console.log(_0x54f97d.errorMessage);
                }
            } catch (_0x29fd97) {
                $.logErr(_0x29fd97, _0x23fcf6);
            } finally {
                _0x5e4bdb(_0x54f97d);
            }
        });
    });
}
async function _0x2de48e(_0x11bed9 = true) {
    const _0x2d047f = {
        "Host": "api.m.jd.com",
        "Origin": "https://h5.m.jd.com",
        "Content-Type": "application/json",
        "User-Agent": $.UA,
        "Cookie": _0x10a129
    };
    const _0x28c794 = {
        "url": "https://api.m.jd.com/api?client=android&clientVersion=11.6.0&appid=jdchoujiang_h5&t=1677312472015&functionId=combatDetail&body=%7B%22help%22%3Afalse%2C%22reqSource%22%3A%22h5%22%7D&h5st=&uuid=&eu=6&fv=3&build=98666&osVersion=12&networkType=wifi&aid=&oaid=&help=false&reqSource=h5",
        "headers": _0x2d047f
    };
    return new Promise(async _0x2a9b9c => {
        $.get(_0x28c794, async (_0x1ad74a, _0x4b77c1, _0x3c47ac) => {
            try {
                if (_0x1ad74a) {
                    console.log("" + JSON.stringify(_0x1ad74a));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x3c47ac = JSON.parse(_0x3c47ac);
                    if (_0x3c47ac.success) {
                        $.result = _0x3c47ac.data.petRaceResult;
                        if (_0x11bed9) {
                            console.log("\n比赛信息：");
                            _0x3c47ac.data.raceUsers.forEach(_0x5c7b71 => {
                                _0x5c7b71.myself && (console.log("当前排名: " + _0x5c7b71.rank), _0x5c7b71.rank == 1 ? $.log("领先...") : $.log("落后..."), console.log(Math.abs(_0x3c47ac.data.raceUsers[0].distance - _0x3c47ac.data.raceUsers[1].distance) + "KM"), console.log("可通过邀请助力提升速度！！！"));
                            });
                        }
                    } else {
                        console.log(_0x3c47ac.errorMessage);
                    }
                }
            } catch (_0x547031) {
                $.logErr(_0x547031, _0x4b77c1);
            } finally {
                _0x2a9b9c(_0x3c47ac);
            }
        });
    });
}
function _0x5b1003() {
    return new Promise(_0x16ba4a => {
        const _0xc11a8b = {
            "Cookie": _0x10a129,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x1ca72e = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0xc11a8b,
            "timeout": 10000
        };
        $.get(_0x1ca72e, (_0x5a2b0d, _0x231e45, _0x1e7306) => {
            try {
                if (_0x1e7306) {
                    _0x1e7306 = JSON.parse(_0x1e7306);
                    if (!(_0x1e7306.islogin === "1")) {
                        if (_0x1e7306.islogin === "0") {
                            $.isLogin = false;
                        }
                    }
                }
            } catch (_0x272886) {
                console.log(_0x272886);
            } finally {
                _0x16ba4a();
            }
        });
    });
}
function _0x10b39f() {
    return new Promise(_0x25a4e0 => {
        !_0xcc2443 ? $.msg($.name, "", "" + _0xc3eda8) : $.log("京东账号" + $.index + $.nickName + "\n" + _0xc3eda8);
        _0x25a4e0();
    });
}
function _0x48feb1(_0x24a77e) {
    try {
        if (typeof JSON.parse(_0x24a77e) == "object") {
            return true;
        }
    } catch (_0x16fc0a) {
        console.log(_0x16fc0a);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}
function _0x3c3d46(_0x3bcf6b) {
    if (typeof _0x3bcf6b == "string") {
        try {
            return JSON.parse(_0x3bcf6b);
        } catch (_0x1f0611) {
            console.log(_0x1f0611);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}