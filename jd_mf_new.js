/*
小魔方,3月31下线，有魔方尽快兑换
mck不稳定，火爆较多，appck嘎嘎跑
入口：京东app首页-新品-右侧悬浮
签到 + 任务 + 6 3 1魔方兑换
38 9 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_mf_new.js
updatetime:2023/3/13 fix
author:6dy
 */
const Env=require('./utils/Env.js');
const $ = new Env("京东魔方");
const _0x383dbe = $.isNode() ? require("./sendNotify") : "",
    _0x34266a = require("./function/dylant.js"),
    _0x2754b1 = $.isNode() ? require("./jdCookie.js") : "",
    _0x35488f = require("http2");
let _0x42b871 = [],
    _0x5649db = "";
if ($.isNode()) {
    Object.keys(_0x2754b1).forEach(_0x2bfa1a => {
        _0x42b871.push(_0x2754b1[_0x2bfa1a]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        $.log = () => { };
    }
} else {
    _0x42b871 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x294705 => _0x294705.cookie)].filter(_0x2e5642 => !!_0x2e5642);
}
$.appid = "50091";
$.scid = "XMFhPageh5";
$.suc = "yes";
!(async () => {
    if (!_0x42b871[0]) {
        const _0x438e0e = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x438e0e);
        return;
    }
    console.log("问题建议：https://t.me/dylan_jdpro");
    await _0xbe7364();
    for (let _0x55abcc = 0; _0x55abcc < "20"; _0x55abcc++) {
        if (_0x42b871[_0x55abcc]) {
            _0x5649db = _0x42b871[_0x55abcc];
            $.UserName = decodeURIComponent(_0x5649db.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5649db.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x55abcc + 1;
            $.isLogin = true;
            $.nickName = "";
            message = "";
            $.hotflag = false;
            $.limit = false;
            $.UUID = _0x5cf47d("xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx");
            $.jdk = _0x5cf47d("--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            _0xd61b02();
            $.joyytoken = "";
            await _0x556327();
            $.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            if (!$.isLogin) {
                const _0x27fc8a = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x27fc8a);
                $.isNode() && (await _0x383dbe.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }
            if ($.hotflag) {
                console.log("\n开始火爆了，等段时间再运行吧！\n");
                return;
            }
            await _0x5ddd02();
            await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
        }
    }
})().catch(_0xc4eb82 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xc4eb82 + "!", "");
}).finally(() => {
    $.done();
});
async function _0x5ddd02() {
    await _0x98ff97();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await _0x11596a($.projectId);
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.taskList) {
        for (const _0x32cbf5 of $.taskList) {
            await $.wait(1000);
            if ($.limit) {
                break;
            }
            if (_0x32cbf5.rewards.length === 0) {
                continue;
            }
            if (_0x32cbf5.ext.extraType !== "brandMemberList" && _0x32cbf5.ext.extraType !== "assistTaskDetail" && !$.hotflag) {
                if (_0x32cbf5.completionCnt < _0x32cbf5.assignmentTimesLimit) {
                    let _0x2824b9 = _0x32cbf5.assignmentTimesLimit - _0x32cbf5.completionCnt;
                    $.log("任务：" + _0x32cbf5.assignmentName + "," + (_0x32cbf5.rewards[0] ? _0x32cbf5.rewards[0].rewardValue : 0) + "碎片,去完成");
                    if (JSON.stringify(_0x32cbf5.ext) !== "{}") {
                        _0x32cbf5.ext.extraType === "sign1" && (await _0x17651d($.projectId, _0x32cbf5.encryptAssignmentId, _0x32cbf5.ext.sign1.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                        for (let _0xa815ea of _0x32cbf5.ext.productsInfo || []) {
                            if (_0x2824b9 === 0) {
                                break;
                            }
                            _0xa815ea.status === 1 && (await _0x17651d($.projectId, _0x32cbf5.encryptAssignmentId, _0xa815ea.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                            _0x2824b9--;
                        }
                        for (let _0x20ccef of _0x32cbf5.ext.shoppingActivity || []) {
                            if (_0x2824b9 === 0) {
                                break;
                            }
                            _0x20ccef.status === 1 && (await _0x17651d($.projectId, _0x32cbf5.encryptAssignmentId, _0x20ccef.advId, 1), _0x32cbf5.ext.waitDuration && (await $.wait(_0x32cbf5.ext.waitDuration * 1000), await _0x17651d($.projectId, _0x32cbf5.encryptAssignmentId, _0x20ccef.advId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                            _0x2824b9--;
                        }
                        for (let _0x4e0b34 of _0x32cbf5.ext.browseShop || []) {
                            if (_0x2824b9 === 0) {
                                break;
                            }
                            if (_0x4e0b34.status === 1) {
                                await _0x17651d($.projectId, _0x32cbf5.encryptAssignmentId, _0x4e0b34.itemId, 1);
                                if (_0x32cbf5.ext.waitDuration) {
                                    await $.wait(_0x32cbf5.ext.waitDuration * 1000);
                                    await _0x17651d($.projectId, _0x32cbf5.encryptAssignmentId, _0x4e0b34.itemId, 0);
                                }
                                await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                            }
                            _0x2824b9--;
                        }
                        for (let _0x20228d of _0x32cbf5.ext.addCart || []) {
                            if (_0x2824b9 === 0) {
                                break;
                            }
                            _0x20228d.status === 1 && (await _0x17651d($.projectId, _0x32cbf5.encryptAssignmentId, _0x20228d.itemId, 1), _0x32cbf5.ext.waitDuration && (await $.wait(_0x32cbf5.ext.waitDuration * 1000), await _0x17651d($.projectId, _0x32cbf5.encryptAssignmentId, _0x20228d.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                            _0x2824b9--;
                        }
                    } else {
                        for (let _0xf31439 = 0; _0xf31439 < _0x2824b9; _0xf31439++) {
                            await _0x5beab6($.projectId, _0x32cbf5.encryptAssignmentId);
                            await $.wait(1000);
                        }
                    }
                } else {
                    $.log("任务：" + _0x32cbf5.assignmentName + ",已完成");
                }
            }
        }
    } else {
        $.log("没有获取到活动信息");
    }
    await _0x5beb78($.projectPoolId, 0);
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await _0x5beb78($.awardproid, 1);
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
}
async function _0x17651d(_0x44efb3, _0x2bb704, _0x5ee377, _0x267e7c) {
    let _0x63fda0 = await _0x34266a.geturl($);
    const _0xdda861 = {
        "encryptProjectId": _0x44efb3,
        "encryptAssignmentId": _0x2bb704,
        "sourceCode": "acexinpin0823",
        "itemId": _0x5ee377,
        "actionType": _0x267e7c,
        "completionFlag": "",
        "ext": {},
        "extParam": _0x63fda0
    };
    return new Promise(_0x2e49d4 => {
        $.post(_0x340745("doInteractiveAssignment", _0xdda861), async (_0x5003e0, _0x44e152, _0x41bd5c) => {
            try {
                if (_0x5003e0) {
                    $.log("" + _0x5003e0);
                    $.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (_0x41bd5c) {
                        _0x41bd5c = JSON.parse(_0x41bd5c);
                        console.log(_0x5ee377 + " " + _0x41bd5c.msg);
                        if (_0x41bd5c.msg.indexOf("火爆") > -1) {
                            $.hotflag = true;
                        }
                        if (_0x41bd5c.msg.indexOf("未通过") > -1) {
                            $.limit = true;
                        }
                    } else {
                        $.log("没有返回数据");
                    }
                }
            } catch (_0x3fa6e5) {
                $.logErr(_0x3fa6e5, _0x44e152);
            } finally {
                _0x2e49d4(_0x41bd5c);
            }
        });
    });
}
async function _0x5beab6(_0x2b1ce2, _0xcfca4f) {
    const _0x2f91ec = {
        "completionFlag": true,
        "encryptAssignmentId": _0xcfca4f,
        "encryptProjectId": _0x2b1ce2,
        "sourceCode": "acexinpin0823"
    };
    return new Promise(_0x4c3387 => {
        $.post(_0x340745("doInteractiveAssignment", _0x2f91ec), async (_0x3bdcee, _0x5447f5, _0x5b39c2) => {
            try {
                if (_0x3bdcee) {
                    $.log("" + _0x3bdcee);
                    $.log("dotask API请求失败，请检查网路重试");
                } else {
                    if (_0x5b39c2) {
                        _0x5b39c2 = JSON.parse(_0x5b39c2);
                        console.log(_0x5b39c2.msg);
                        if (_0x5b39c2.msg.indexOf("火爆") > -1) {
                            $.hotflag = true;
                        }
                        if (_0x5b39c2.msg.indexOf("未通过") > -1) {
                            $.limit = true;
                        }
                    } else {
                        $.log("没有返回数据");
                    }
                }
            } catch (_0x42cde6) {
                $.logErr(_0x42cde6, _0x5447f5);
            } finally {
                _0x4c3387(_0x5b39c2);
            }
        });
    });
}
async function _0x4dadcb(_0x1a69a6, _0x108099) {
    let _0x31d212 = await _0x34266a.geturl($);
    const _0x26e733 = {
        "exchangeNum": 1
    };
    const _0x3cb136 = {
        "encryptProjectId": _0x1a69a6,
        "encryptAssignmentId": _0x108099,
        "sourceCode": "acexinpin0823",
        "itemId": "",
        "actionType": "",
        "completionFlag": "",
        "ext": _0x26e733,
        "extParam": _0x31d212
    };
    return new Promise(_0x456a13 => {
        $.post(_0x340745("doInteractiveAssignment", _0x3cb136), async (_0x3d218c, _0x4e1be5, _0x1dcde2) => {
            try {
                if (_0x3d218c) {
                    $.log("" + _0x3d218c);
                    $.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (_0x1dcde2) {
                        _0x1dcde2 = JSON.parse(_0x1dcde2);
                        _0x1dcde2.subCode == 0 && _0x1dcde2.rewardsInfo.successRewards["3"] ? $.log("兑换成功：" + _0x1dcde2.rewardsInfo.successRewards["3"][0].rewardName) : $.log(_0x1dcde2.msg);
                    } else {
                        $.log("没有返回数据");
                    }
                }
            } catch (_0x3f4d7e) {
                $.logErr(_0x3f4d7e, _0x4e1be5);
            } finally {
                _0x456a13(_0x1dcde2);
            }
        });
    });
}
async function _0x5beb78(_0x480fb0, _0x2f88d0) {
    return new Promise(async _0x2a5bb7 => {
        if (_0x2f88d0 === 0) {
            const _0x51eef7 = {
                "needPoolRewards": 1,
                "needExchangeRestScore": 1
            };
            const _0x5a2710 = {
                "encryptProjectPoolId": _0x480fb0,
                "sourceCode": "acexinpin0823",
                "ext": _0x51eef7
            };
            body = _0x5a2710;
        } else {
            const _0x4a96b0 = {
                "needExchangeRestScore": "1"
            };
            const _0x5756de = {
                "encryptProjectId": _0x480fb0,
                "sourceCode": "acexinpin0823",
                "ext": _0x4a96b0
            };
            body = _0x5756de;
        }
        $.post(_0x340745("queryInteractiveRewardInfo", body), async (_0x57c91f, _0x5962d0, _0x22e375) => {
            try {
                if (_0x57c91f) {
                    $.log("" + JSON.stringify(_0x57c91f));
                    $.log("queryInteractiveRewardInfo API请求失败，请检查网路重试");
                } else {
                    if (_0x22e375) {
                        _0x22e375 = JSON.parse(_0x22e375);
                        if (_0x2f88d0 == 1) {
                            sum = _0x22e375.exchangeRestScoreMap["367"];
                            $.log("\n当前总计" + sum + "个魔方");
                            if (sum >= "10") {
                                $.log("\n开始6个魔方兑换");
                                await _0x4dadcb($.awardproid, "42pP1FaQ4FTMurVsJpZhiFJXCZox");
                                await $.wait(1000);
                                $.log("\n开始3魔方兑换");
                                await _0x4dadcb($.awardproid, "2rE3GQYdXVtidohKk7VMamifJhpw");
                                await $.wait(1000);
                                $.log("\n开始1魔方兑换");
                                await _0x4dadcb($.awardproid, "khdCzL9YRdYjh3dWFXfZLteUTYu");
                            } else {
                                if (sum >= "4") {
                                    $.log("\n开始3魔方兑换");
                                    await _0x4dadcb($.awardproid, "2rE3GQYdXVtidohKk7VMamifJhpw");
                                    await $.wait(1000);
                                    $.log("\n开始1魔方兑换");
                                    await _0x4dadcb($.awardproid, "khdCzL9YRdYjh3dWFXfZLteUTYu");
                                } else {
                                    if (sum >= "1") {
                                        $.log("\n开始1魔方兑换");
                                        await _0x4dadcb($.awardproid, "khdCzL9YRdYjh3dWFXfZLteUTYu");
                                    } else {
                                        $.log("\n魔方数量不足，不能兑换");
                                    }
                                }
                            }
                        } else {
                            sum = _0x22e375.exchangeRestScoreMap["368"];
                            if (sum >= "6") {
                                $.log("\n开始收集魔方...");
                                for (let _0x12873c = 0; _0x12873c < Math.floor(sum / 6); _0x12873c++) {
                                    $.log("开始" + (_0x12873c + 1) + "次收集魔方");
                                    await _0x4dadcb($.awardproid, "wE62TwscdA52Z4WkpTJq7NaMvfw");
                                    await $.wait(3000);
                                }
                            }
                        }
                    }
                }
            } catch (_0x10553f) {
                $.logErr(_0x10553f, _0x5962d0);
            } finally {
                _0x2a5bb7(_0x22e375);
            }
        });
    });
}
function _0x11596a(_0x827b87) {
    const _0x2f3112 = {
        "encryptProjectId": _0x827b87,
        "sourceCode": "acexinpin0823",
        "ext": {}
    };
    return new Promise(_0x467e2a => {
        $.post(_0x340745("queryInteractiveInfo", _0x2f3112), async (_0x46c912, _0x3935dd, _0x46e1af) => {
            try {
                if (_0x46c912) {
                    $.log("" + _0x46c912);
                    $.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (_0x46e1af) {
                        _0x46e1af = JSON.parse(_0x46e1af);
                        $.taskList = _0x46e1af.assignmentList;
                    } else {
                        $.log("没有返回数据");
                    }
                }
            } catch (_0x3a3077) {
                $.logErr(_0x3a3077, _0x3935dd);
            } finally {
                _0x467e2a(_0x46e1af);
            }
        });
    });
}
function _0x98ff97() {
    const _0x303474 = {
        "sign": "u6vtLQ7ztxgykLEr",
        "source": 2
    };
    return new Promise(_0x2b53be => {
        $.post(_0x340745("getInteractionHomeInfo", _0x303474), (_0x1e6fc2, _0x34510c, _0x31277d) => {
            try {
                if (_0x1e6fc2) {
                    $.log("" + _0x1e6fc2);
                    $.log($.name + " API请求失败，请检查网路重试");
                } else {
                    _0x31277d = JSON.parse(_0x31277d);
                    if (_0x31277d) {
                        if (_0x31277d.result.giftConfig) {
                            $.projectId = _0x31277d.result.taskConfig.projectId;
                            $.awardproid = _0x31277d.result.giftConfig.projectId;
                            $.projectPoolId = _0x31277d.result.taskConfig.projectPoolId;
                        } else {
                            $.log("获取projectId失败");
                        }
                    } else {
                        $.log(JSON.stringify(_0x31277d));
                    }
                }
            } catch (_0x47f62c) {
                $.logErr(_0x47f62c, _0x34510c);
            } finally {
                _0x2b53be(_0x31277d);
            }
        });
    });
}
function _0x340745(_0x53dc9d, _0x3f95a5) {
    return {
        "url": "https://api.m.jd.com/client.action/?functionId=" + _0x53dc9d + "&appid=content_ecology&client=wh5&clientVersion=1.0.0",
        "body": "body=" + encodeURIComponent(JSON.stringify(_0x3f95a5)),
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://h5.m.jd.com",
            "User-Agent": $.UA,
            "Referer": "https://h5.m.jd.com/",
            "Cookie": _0x5649db + (" pwdt_id=" + encodeURIComponent($.UserName) + "; joyytoken=" + ("50091" + $.joyytoken) + ";")
        }
    };
}
async function _0x451d50(_0x412c9, _0x171f57 = {}, _0x96c19b = {}) {
    const _0x2a35ba = {
        ..._0x171f57,
        ..._0x96c19b
    },
        _0x2be2b6 = _0x22ae61({
            "functionId": _0x412c9,
            "body": encodeURIComponent(JSON.stringify(_0x2a35ba)),
            "client": "wh5",
            "clientVersion": "1.0.0",
            "appid": "content_ecology"
        });
    let _0x3177a1 = _0x5649db.match(/pt_key=([^; ]+)(?=;?)/)[1];
    return new Promise((_0x3bab43, _0x2cbcd9) => {
        const _0x3113e4 = _0x35488f.connect("https://api.m.jd.com"),
            _0x494983 = _0x3113e4.request({
                ":path": "/client.action",
                ":method": "POST",
                "content-type": "application/x-www-form-urlencoded",
                "origin": "https://h5.m.jd.com",
                "cookie": "pt_key=app_open" + _0x3177a1 + ";" + _0x5649db + ("joyytoken=" + ("50091" + $.joyytoken) + ";"),
                "user-agent": $.UA
            });
        _0x494983.write(_0x2be2b6, "utf8");
        _0x3113e4.on("error", _0x184032 => console.error(_0x184032));
        _0x494983.setEncoding("utf8");
        let _0x35c0d6 = "";
        _0x494983.on("data", _0x250cf0 => {
            _0x35c0d6 += _0x250cf0;
        });
        _0x494983.on("end", () => {
            _0x35c0d6 = JSON.parse(_0x35c0d6);
            if (_0x35c0d6.code == 0) {
                _0x3bab43(_0x35c0d6.data);
            } else {
                console.log(_0x35c0d6.msg);
                if (_0x35c0d6.msg.indexOf("异常") > -1) {
                    $.hotnum++;
                }
                _0x3bab43({});
            }
            _0x3113e4.close();
        });
        _0x494983.end();
    });
}
function _0x5cf47d(_0x548db1 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x178d0c = 0) {
    return _0x548db1.replace(/[xy]/g, function (_0x2d0f28) {
        var _0x2d0e00 = 16 * Math.random() | 0,
            _0x16a758 = "x" == _0x2d0f28 ? _0x2d0e00 : 3 & _0x2d0e00 | 8;
        uuid = _0x178d0c ? _0x16a758.toString(36).toUpperCase() : _0x16a758.toString(36);
        return uuid;
    });
}
function _0x22ae61(_0x24cc62) {
    let _0x49a471 = true;
    let _0x433c80 = "";
    for (let _0x7bb8f4 in _0x24cc62) {
        let _0x1c3a40 = _0x24cc62[_0x7bb8f4];
        typeof _0x1c3a40 == "object" && (_0x1c3a40 = JSON.stringify(_0x1c3a40));
        _0x49a471 ? (_0x433c80 += _0x7bb8f4 + "=" + _0x1c3a40, _0x49a471 = false) : _0x433c80 += "&" + _0x7bb8f4 + "=" + _0x1c3a40;
    }
    return _0x433c80;
}
function _0xd61b02() {
    const _0x6c28b5 = {
        "A": "K",
        "B": "L",
        "C": "M",
        "D": "N",
        "E": "O",
        "F": "P",
        "G": "Q",
        "H": "R",
        "I": "S",
        "J": "T",
        "K": "A",
        "L": "B",
        "M": "C",
        "N": "D",
        "O": "E",
        "P": "F",
        "Q": "G",
        "R": "H",
        "S": "I",
        "T": "J",
        "e": "o",
        "f": "p",
        "g": "q",
        "h": "r",
        "i": "s",
        "j": "t",
        "k": "u",
        "l": "v",
        "m": "w",
        "n": "x",
        "o": "e",
        "p": "f",
        "q": "g",
        "r": "h",
        "s": "i",
        "t": "j",
        "u": "k",
        "v": "l",
        "w": "m",
        "x": "n"
    };
    let _0x555c08 = ["MI9 Build/QKQ1.190825.002", "MI8 Build/OPM1.171019.026", "HLK-AL00 Build/HONORHLK-AL00", "SM-G9750 Build/QP1A.190711.020", "LIO-AL00 Build/HUAWEILIO-AL00", "ELE-AL00 Build/HUAWEIELE-AL00", "ANE-AL00 Build/HUAWEIANE-AL00", "22021211RC Build/SKQ1.211006.001"],
        _0x1e1267 = ["9", "10", "11", "12", "13"],
        _0x1e2c70 = ["11.2.8", "11.2.6", "11.2.5", "11.2.4", "11.2.3", "11.1.4", "11.1.3", "11.2.0", "11.3.0"],
        _0x30a8c2 = ["98413", "98416", "98415", "98417", "98450", "98527"];
    $.dv = _0x555c08[Math.floor(Math.random() * _0x555c08.length)];
    $.iv = _0x1e1267[Math.floor(Math.random() * _0x1e1267.length)];
    $.av = _0x1e2c70[Math.floor(Math.random() * _0x1e2c70.length)];
    $.bv = _0x30a8c2[Math.floor(Math.random() * _0x30a8c2.length)];
    getstr = function (_0x48589b) {
        let _0x2d6761 = "",
            _0x359e20 = "0123456789abcdef";
        for (let _0x2e0f84 = 0; _0x2e0f84 < _0x48589b; _0x2e0f84++) {
            let _0x10d74d = Math.round(Math.random() * (_0x359e20.length - 1));
            _0x2d6761 += _0x359e20.substring(_0x10d74d, _0x10d74d + 1);
        }
        return _0x2d6761;
    };
    let _0x4ad83a = Buffer.from(getstr(16)).toString("base64"),
        _0x490cd0 = Buffer.from(getstr(16)).toString("base64"),
        _0x6e547 = Buffer.from($.iv).toString("base64").split("").map(_0x175143 => _0x6c28b5[_0x175143] || _0x175143).join(""),
        _0x3efb04 = Buffer.from("31").toString("base64").split("").map(_0x47ae92 => _0x6c28b5[_0x47ae92] || _0x47ae92).join("");
    _0x490cd0 = _0x490cd0.split("").map(_0x44c710 => _0x6c28b5[_0x44c710] || _0x44c710).join("");
    _0x4ad83a = _0x4ad83a.split("").map(_0x3a1fbc => _0x6c28b5[_0x3a1fbc] || _0x3a1fbc).join("");
    const _0x5e180a = {
        "sv": _0x6e547,
        "ad": _0x4ad83a,
        "od": _0x490cd0,
        "ov": _0x3efb04,
        "ud": _0x4ad83a
    };
    let _0x97c3ba = encodeURIComponent(JSON.stringify({
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": Date.now(),
        "ridx": -1,
        "cipher": _0x5e180a,
        "ciphertype": 5,
        "version": "1.2.0",
        "appname": "com.jingdong.app.mall"
    }));
    $.UA = "jdapp;android;" + $.av + ";;;appBuild/" + $.bv + ";ef/1;ep/" + _0x97c3ba + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android " + $.iv + "; " + $.dv + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36";
}
function _0xbe7364() {
    const _0x528516 = {
        "url": "https://verify-dy-server-hqbjkuhrsu.cn-hangzhou.fcapp.run/xmf",
        "timeout": 30000
    };
    return new Promise(_0x4428cc => {
        $.get(_0x528516, async (_0x358166, _0x5a9855, _0x282eae) => {
            try {
                if (_0x358166) {
                    console.log("\n服务连接失败，终止执行！");
                    process.exit(111);
                } else {
                    if (_0x282eae) {
                        _0x282eae = JSON.parse(_0x282eae);
                        if (_0x282eae.code === 200) {
                            $.suc = "no";
                            $.ver = _0x282eae.version;
                        } else {
                            console.log("\n" + _0x282eae.msg);
                            process.exit(111);
                        }
                    }
                }
            } catch (_0x53e778) {
                $.logErr(_0x53e778, _0x5a9855);
            } finally {
                _0x4428cc(_0x282eae);
            }
        });
    });
}
function _0x556327() {
    return new Promise(async _0x253271 => {
        const _0x42d264 = {
            "url": "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
            "headers": {
                "Host": "wq.jd.com",
                "Accept": "*/*",
                "Connection": "keep-alive",
                "Cookie": _0x5649db,
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        };
        $.get(_0x42d264, (_0x5c742e, _0x30cb7a, _0x1e4d69) => {
            try {
                if (_0x5c742e) {
                    $.logErr(_0x5c742e);
                } else {
                    if (_0x1e4d69) {
                        _0x1e4d69 = JSON.parse(_0x1e4d69);
                        if (_0x1e4d69.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }
                        _0x1e4d69.retcode === 0 && _0x1e4d69.data && _0x1e4d69.data.hasOwnProperty("userInfo") && ($.nickName = _0x1e4d69.data.userInfo.baseInfo.nickname);
                    } else {
                        $.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x1d8117) {
                $.logErr(_0x1d8117);
            } finally {
                _0x253271();
            }
        });
    });
}