/*
小魔方,3月1下线，有魔方尽快兑换
mck不稳定，火爆较多，appck嘎嘎跑
入口：京东app首页-新品-右侧悬浮
签到 + 任务 + 6 3 2 1魔方兑换
38 9 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_mf_new.js
updatetime:2023/2/18 fix
author:6dy
 */
const Env=require('./utils/Env.js');
const $ = new Env("京东魔方-加密");
const _0x38aca9 = $.isNode() ? require("./sendNotify") : "",
    _0x4ede7a = require("./function/dylant.js"),
    _0x579276 = $.isNode() ? require("./jdCookie.js") : "",
    _0x4a4b1b = require("http2");
let _0x2587d0 = [],
    _0x163613 = "";
if ($.isNode()) {
    Object.keys(_0x579276).forEach(_0x5b0fde => {
        _0x2587d0.push(_0x579276[_0x5b0fde]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        $.log = () => { };
    }
} else {
    _0x2587d0 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x161b9b => _0x161b9b.cookie)].filter(_0x40053a => !!_0x40053a);
}
$.appid = "50091";
$.scid = "XMFhPageh5";
$.suc = "yes";
!(async () => {
    if (!_0x2587d0[0]) {
        const _0x12f797 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x12f797);
        return;
    }
    console.log("问题建议：https://t.me/dylan_jdpro");
    await _0x65e9e();
    for (let _0x3b397d = 0; _0x3b397d < "20"; _0x3b397d++) {
        if (_0x2587d0[_0x3b397d]) {
            _0x163613 = _0x2587d0[_0x3b397d];
            $.UserName = decodeURIComponent(_0x163613.match(/pt_pin=([^; ]+)(?=;?)/) && _0x163613.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x3b397d + 1;
            $.isLogin = true;
            $.nickName = "";
            message = "";
            $.hotflag = false;
            $.limit = false;
            $.UUID = _0x535608("xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx");
            $.jdk = _0x535608("--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            _0x2281ad();
            $.joyytoken = "";
            await _0x289dd9();
            $.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            if (!$.isLogin) {
                const _0x2cb7f1 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x2cb7f1);
                $.isNode() && (await _0x38aca9.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }
            if ($.hotflag) {
                console.log("\n开始火爆了，等段时间再运行吧！\n");
                return;
            }
            await _0x5325cc();
            await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
        }
    }
})().catch(_0x2b0968 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2b0968 + "!", "");
}).finally(() => {
    $.done();
});
async function _0x5325cc() {
    await _0x295d52();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await _0x1a1736($.projectId);
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.taskList) {
        for (const _0x5a285a of $.taskList) {
            await $.wait(1000);
            if ($.limit) {
                break;
            }
            if (_0x5a285a.rewards.length === 0) {
                continue;
            }
            if (_0x5a285a.ext.extraType !== "brandMemberList" && _0x5a285a.ext.extraType !== "assistTaskDetail" && !$.hotflag) {
                if (_0x5a285a.completionCnt < _0x5a285a.assignmentTimesLimit) {
                    let _0x3f7ead = _0x5a285a.assignmentTimesLimit - _0x5a285a.completionCnt;
                    $.log("任务：" + _0x5a285a.assignmentName + "," + (_0x5a285a.rewards[0] ? _0x5a285a.rewards[0].rewardValue : 0) + "碎片,去完成");
                    if (JSON.stringify(_0x5a285a.ext) !== "{}") {
                        _0x5a285a.ext.extraType === "sign1" && (await _0x4b9583($.projectId, _0x5a285a.encryptAssignmentId, _0x5a285a.ext.sign1.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                        for (let _0x47e05a of _0x5a285a.ext.productsInfo || []) {
                            if (_0x3f7ead === 0) {
                                break;
                            }
                            _0x47e05a.status === 1 && (await _0x4b9583($.projectId, _0x5a285a.encryptAssignmentId, _0x47e05a.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                            _0x3f7ead--;
                        }
                        for (let _0x1ee74f of _0x5a285a.ext.shoppingActivity || []) {
                            if (_0x3f7ead === 0) {
                                break;
                            }
                            if (_0x1ee74f.status === 1) {
                                await _0x4b9583($.projectId, _0x5a285a.encryptAssignmentId, _0x1ee74f.advId, 1);
                                _0x5a285a.ext.waitDuration && (await $.wait(_0x5a285a.ext.waitDuration * 1000), await _0x4b9583($.projectId, _0x5a285a.encryptAssignmentId, _0x1ee74f.advId, 0));
                                await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                            }
                            _0x3f7ead--;
                        }
                        for (let _0x5a7028 of _0x5a285a.ext.browseShop || []) {
                            if (_0x3f7ead === 0) {
                                break;
                            }
                            if (_0x5a7028.status === 1) {
                                await _0x4b9583($.projectId, _0x5a285a.encryptAssignmentId, _0x5a7028.itemId, 1);
                                _0x5a285a.ext.waitDuration && (await $.wait(_0x5a285a.ext.waitDuration * 1000), await _0x4b9583($.projectId, _0x5a285a.encryptAssignmentId, _0x5a7028.itemId, 0));
                                await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                            }
                            _0x3f7ead--;
                        }
                        for (let _0x2caeaa of _0x5a285a.ext.addCart || []) {
                            if (_0x3f7ead === 0) {
                                break;
                            }
                            if (_0x2caeaa.status === 1) {
                                await _0x4b9583($.projectId, _0x5a285a.encryptAssignmentId, _0x2caeaa.itemId, 1);
                                _0x5a285a.ext.waitDuration && (await $.wait(_0x5a285a.ext.waitDuration * 1000), await _0x4b9583($.projectId, _0x5a285a.encryptAssignmentId, _0x2caeaa.itemId, 0));
                                await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                            }
                            _0x3f7ead--;
                        }
                    } else {
                        for (let _0x5cefcf = 0; _0x5cefcf < _0x3f7ead; _0x5cefcf++) {
                            await _0x40f908($.projectId, _0x5a285a.encryptAssignmentId);
                            await $.wait(1000);
                        }
                    }
                } else {
                    $.log("任务：" + _0x5a285a.assignmentName + ",已完成");
                }
            }
        }
    } else {
        $.log("没有获取到活动信息");
    }
    await _0x5758f0($.projectPoolId, 0);
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await _0x5758f0($.awardproid, 1);
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
}
async function _0x4b9583(_0x31dff7, _0x1e100c, _0x3dcc24, _0x56630a) {
    let _0x52d553 = await _0x4ede7a.geturl($);
    const _0x25f151 = {
        "encryptProjectId": _0x31dff7,
        "encryptAssignmentId": _0x1e100c,
        "sourceCode": "acexinpin0823",
        "itemId": _0x3dcc24,
        "actionType": _0x56630a,
        "completionFlag": "",
        "ext": {},
        "extParam": _0x52d553
    };
    return new Promise(_0x2dd546 => {
        $.post(_0xc6606f("doInteractiveAssignment", _0x25f151), async (_0x1dda52, _0x968ec, _0x2403cc) => {
            try {
                if (_0x1dda52) {
                    $.log("" + _0x1dda52);
                    $.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (_0x2403cc) {
                        _0x2403cc = JSON.parse(_0x2403cc);
                        console.log(_0x3dcc24 + " " + _0x2403cc.msg);
                        if (_0x2403cc.msg.indexOf("火爆") > -1) {
                            $.hotflag = true;
                        }
                        if (_0x2403cc.msg.indexOf("未通过") > -1) {
                            $.limit = true;
                        }
                    } else {
                        $.log("没有返回数据");
                    }
                }
            } catch (_0x2cb6c) {
                $.logErr(_0x2cb6c, _0x968ec);
            } finally {
                _0x2dd546(_0x2403cc);
            }
        });
    });
}
async function _0x40f908(_0x2dde96, _0x491c99) {
    const _0x2b00da = {
        "completionFlag": true,
        "encryptAssignmentId": _0x491c99,
        "encryptProjectId": _0x2dde96,
        "sourceCode": "acexinpin0823"
    };
    return new Promise(_0x2c04df => {
        $.post(_0xc6606f("doInteractiveAssignment", _0x2b00da), async (_0x12a2ac, _0x5eb17c, _0x23bbad) => {
            try {
                if (_0x12a2ac) {
                    $.log("" + _0x12a2ac);
                    $.log("dotask API请求失败，请检查网路重试");
                } else {
                    if (_0x23bbad) {
                        _0x23bbad = JSON.parse(_0x23bbad);
                        console.log(_0x23bbad.msg);
                        if (_0x23bbad.msg.indexOf("火爆") > -1) {
                            $.hotflag = true;
                        }
                        if (_0x23bbad.msg.indexOf("未通过") > -1) {
                            $.limit = true;
                        }
                    } else {
                        $.log("没有返回数据");
                    }
                }
            } catch (_0x33a743) {
                $.logErr(_0x33a743, _0x5eb17c);
            } finally {
                _0x2c04df(_0x23bbad);
            }
        });
    });
}
async function _0x288d5c(_0x27e527, _0xfc4835) {
    let _0x21e7e0 = await _0x4ede7a.geturl($);
    const _0x285952 = {
        "exchangeNum": 1
    };
    const _0x31c373 = {
        "encryptProjectId": _0x27e527,
        "encryptAssignmentId": _0xfc4835,
        "sourceCode": "acexinpin0823",
        "itemId": "",
        "actionType": "",
        "completionFlag": "",
        "ext": _0x285952,
        "extParam": _0x21e7e0
    };
    return new Promise(_0x4d0304 => {
        $.post(_0xc6606f("doInteractiveAssignment", _0x31c373), async (_0x174dfe, _0x35634c, _0x77c135) => {
            try {
                _0x174dfe ? ($.log("" + _0x174dfe), $.log($.name + " API请求失败，请检查网路重试")) : _0x77c135 ? (_0x77c135 = JSON.parse(_0x77c135), _0x77c135.subCode == 0 && _0x77c135.rewardsInfo.successRewards["3"] ? $.log("兑换成功：" + _0x77c135.rewardsInfo.successRewards["3"][0].rewardName) : $.log(_0x77c135.msg)) : $.log("没有返回数据");
            } catch (_0xec450) {
                $.logErr(_0xec450, _0x35634c);
            } finally {
                _0x4d0304(_0x77c135);
            }
        });
    });
}
async function _0x5758f0(_0x48d148, _0x4340cf) {
    return new Promise(async _0x72b0f8 => {
        if (_0x4340cf === 0) {
            const _0x508398 = {
                "needPoolRewards": 1,
                "needExchangeRestScore": 1
            };
            const _0x2f1d68 = {
                "encryptProjectPoolId": _0x48d148,
                "sourceCode": "acexinpin0823",
                "ext": _0x508398
            };
            body = _0x2f1d68;
        } else {
            const _0xc37e15 = {
                "needExchangeRestScore": "1"
            };
            const _0x436cb5 = {
                "encryptProjectId": _0x48d148,
                "sourceCode": "acexinpin0823",
                "ext": _0xc37e15
            };
            body = _0x436cb5;
        }
        $.post(_0xc6606f("queryInteractiveRewardInfo", body), async (_0x1c1c8e, _0x1f0a12, _0x591bef) => {
            try {
                if (_0x1c1c8e) {
                    $.log("" + JSON.stringify(_0x1c1c8e));
                    $.log("queryInteractiveRewardInfo API请求失败，请检查网路重试");
                } else {
                    if (_0x591bef) {
                        _0x591bef = JSON.parse(_0x591bef);
                        if (_0x4340cf == 1) {
                            sum = _0x591bef.exchangeRestScoreMap["367"];
                            $.log("\n当前总计" + sum + "个魔方");
                            if (sum >= "12") {
                                $.log("\n开始6个魔方兑换");
                                await _0x288d5c($.awardproid, "42pP1FaQ4FTMurVsJpZhiFJXCZox");
                                await $.wait(1000);
                                $.log("\n开始3魔方兑换");
                                await _0x288d5c($.awardproid, "2rE3GQYdXVtidohKk7VMamifJhpw");
                                await $.wait(1000);
                                $.log("\n开始2魔方兑换");
                                await _0x288d5c($.awardproid, "2yYRNv2mPSoY4GUhwdhKkpoUHh6g");
                                $.log("\n开始1魔方兑换");
                                await _0x288d5c($.awardproid, "khdCzL9YRdYjh3dWFXfZLteUTYu");
                            } else {
                                if (sum >= "6") {
                                    $.log("\n开始3魔方兑换");
                                    await _0x288d5c($.awardproid, "2rE3GQYdXVtidohKk7VMamifJhpw");
                                    await $.wait(1000);
                                    $.log("\n开始2魔方兑换");
                                    await _0x288d5c($.awardproid, "2yYRNv2mPSoY4GUhwdhKkpoUHh6g");
                                    $.log("\n开始1魔方兑换");
                                    await _0x288d5c($.awardproid, "khdCzL9YRdYjh3dWFXfZLteUTYu");
                                } else {
                                    if (sum >= "3") {
                                        $.log("\n开始2魔方兑换");
                                        await _0x288d5c($.awardproid, "2yYRNv2mPSoY4GUhwdhKkpoUHh6g");
                                        $.log("\n开始1魔方兑换");
                                        await _0x288d5c($.awardproid, "khdCzL9YRdYjh3dWFXfZLteUTYu");
                                    } else {
                                        sum >= "1" ? ($.log("\n开始1魔方兑换"), await _0x288d5c($.awardproid, "khdCzL9YRdYjh3dWFXfZLteUTYu")) : $.log("\n魔方数量不足，不能兑换");
                                    }
                                }
                            }
                        } else {
                            sum = _0x591bef.exchangeRestScoreMap["368"];
                            if (sum >= "6") {
                                $.log("\n开始收集魔方...");
                                for (let _0x51940f = 0; _0x51940f < Math.floor(sum / 6); _0x51940f++) {
                                    $.log("开始" + (_0x51940f + 1) + "次收集魔方");
                                    await _0x288d5c($.awardproid, "wE62TwscdA52Z4WkpTJq7NaMvfw");
                                    await $.wait(3000);
                                }
                            }
                        }
                    }
                }
            } catch (_0x3aaee4) {
                $.logErr(_0x3aaee4, _0x1f0a12);
            } finally {
                _0x72b0f8(_0x591bef);
            }
        });
    });
}
function _0x1a1736(_0x3e233b) {
    const _0x5e0596 = {
        "encryptProjectId": _0x3e233b,
        "sourceCode": "acexinpin0823",
        "ext": {}
    };
    return new Promise(_0x54908d => {
        $.post(_0xc6606f("queryInteractiveInfo", _0x5e0596), async (_0x48fc96, _0x444263, _0x1574f3) => {
            try {
                if (_0x48fc96) {
                    $.log("" + _0x48fc96);
                    $.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (_0x1574f3) {
                        _0x1574f3 = JSON.parse(_0x1574f3);
                        $.taskList = _0x1574f3.assignmentList;
                    } else {
                        $.log("没有返回数据");
                    }
                }
            } catch (_0x55f45b) {
                $.logErr(_0x55f45b, _0x444263);
            } finally {
                _0x54908d(_0x1574f3);
            }
        });
    });
}
function _0x295d52() {
    const _0x3b3507 = {
        "sign": "u6vtLQ7ztxgykLEr",
        "source": 2
    };
    return new Promise(_0x403ad9 => {
        $.post(_0xc6606f("getInteractionHomeInfo", _0x3b3507), (_0x31cf9f, _0x5b106b, _0xa69b55) => {
            try {
                if (_0x31cf9f) {
                    $.log("" + _0x31cf9f);
                    $.log($.name + " API请求失败，请检查网路重试");
                } else {
                    _0xa69b55 = JSON.parse(_0xa69b55);
                    if (_0xa69b55) {
                        _0xa69b55.result.giftConfig ? ($.projectId = _0xa69b55.result.taskConfig.projectId, $.awardproid = _0xa69b55.result.giftConfig.projectId, $.projectPoolId = _0xa69b55.result.taskConfig.projectPoolId) : $.log("获取projectId失败");
                    } else {
                        $.log(JSON.stringify(_0xa69b55));
                    }
                }
            } catch (_0x4e5e00) {
                $.logErr(_0x4e5e00, _0x5b106b);
            } finally {
                _0x403ad9(_0xa69b55);
            }
        });
    });
}
function _0xc6606f(_0x57e358, _0x2ea473) {
    return {
        "url": "https://api.m.jd.com/client.action/?functionId=" + _0x57e358 + "&appid=content_ecology&client=wh5&clientVersion=1.0.0",
        "body": "body=" + encodeURIComponent(JSON.stringify(_0x2ea473)),
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://h5.m.jd.com",
            "User-Agent": $.UA,
            "Referer": "https://h5.m.jd.com/",
            "Cookie": _0x163613 + (" pwdt_id=" + encodeURIComponent($.UserName) + "; joyytoken=" + ("50091" + $.joyytoken) + ";")
        }
    };
}
async function _0x117768(_0x105bee, _0x5366c6 = {}, _0x1067d0 = {}) {
    const _0xed3221 = {
        ..._0x5366c6,
        ..._0x1067d0
    };
    const _0x3a9f84 = _0x14ff80({
        "functionId": _0x105bee,
        "body": encodeURIComponent(JSON.stringify(_0xed3221)),
        "client": "wh5",
        "clientVersion": "1.0.0",
        "appid": "content_ecology"
    });
    let _0x495e78 = _0x163613.match(/pt_key=([^; ]+)(?=;?)/)[1];
    return new Promise((_0x237f2b, _0xa76ec4) => {
        const _0xd01a8 = _0x4a4b1b.connect("https://api.m.jd.com"),
            _0x310b48 = _0xd01a8.request({
                ":path": "/client.action",
                ":method": "POST",
                "content-type": "application/x-www-form-urlencoded",
                "origin": "https://h5.m.jd.com",
                "cookie": "pt_key=app_open" + _0x495e78 + ";" + _0x163613 + ("joyytoken=" + ("50091" + $.joyytoken) + ";"),
                "user-agent": $.UA
            });
        _0x310b48.write(_0x3a9f84, "utf8");
        _0xd01a8.on("error", _0x5ba3b8 => console.error(_0x5ba3b8));
        _0x310b48.setEncoding("utf8");
        let _0x1a4e74 = "";
        _0x310b48.on("data", _0x1b9aef => {
            _0x1a4e74 += _0x1b9aef;
        });
        _0x310b48.on("end", () => {
            _0x1a4e74 = JSON.parse(_0x1a4e74);
            if (_0x1a4e74.code == 0) {
                _0x237f2b(_0x1a4e74.data);
            } else {
                console.log(_0x1a4e74.msg);
                if (_0x1a4e74.msg.indexOf("异常") > -1) {
                    $.hotnum++;
                }
                _0x237f2b({});
            }
            _0xd01a8.close();
        });
        _0x310b48.end();
    });
}
function _0x535608(_0x139b69 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x47888d = 0) {
    return _0x139b69.replace(/[xy]/g, function (_0x4bd268) {
        var _0x4e9002 = 16 * Math.random() | 0,
            _0x27e249 = "x" == _0x4bd268 ? _0x4e9002 : 3 & _0x4e9002 | 8;
        uuid = _0x47888d ? _0x27e249.toString(36).toUpperCase() : _0x27e249.toString(36);
        return uuid;
    });
}
function _0x14ff80(_0x127c4d) {
    let _0x5d0ea6 = true,
        _0x43ad70 = "";
    for (let _0x4c9869 in _0x127c4d) {
        let _0x124d48 = _0x127c4d[_0x4c9869];
        typeof _0x124d48 == "object" && (_0x124d48 = JSON.stringify(_0x124d48));
        _0x5d0ea6 ? (_0x43ad70 += _0x4c9869 + "=" + _0x124d48, _0x5d0ea6 = false) : _0x43ad70 += "&" + _0x4c9869 + "=" + _0x124d48;
    }
    return _0x43ad70;
}
function _0x2281ad() {
    const _0x21fead = {
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
    let _0x47b410 = ["MI9 Build/QKQ1.190825.002", "MI8 Build/OPM1.171019.026", "HLK-AL00 Build/HONORHLK-AL00", "SM-G9750 Build/QP1A.190711.020", "LIO-AL00 Build/HUAWEILIO-AL00", "ELE-AL00 Build/HUAWEIELE-AL00", "ANE-AL00 Build/HUAWEIANE-AL00", "22021211RC Build/SKQ1.211006.001"],
        _0x3b707b = ["9", "10", "11", "12", "13"],
        _0x155208 = ["11.2.8", "11.2.6", "11.2.5", "11.2.4", "11.2.3", "11.1.4", "11.1.3", "11.2.0", "11.3.0"],
        _0x55f508 = ["98413", "98416", "98415", "98417", "98450", "98527"];
    $.dv = _0x47b410[Math.floor(Math.random() * _0x47b410.length)];
    $.iv = _0x3b707b[Math.floor(Math.random() * _0x3b707b.length)];
    $.av = _0x155208[Math.floor(Math.random() * _0x155208.length)];
    $.bv = _0x55f508[Math.floor(Math.random() * _0x55f508.length)];
    getstr = function (_0xd83ac8) {
        let _0x37a631 = "",
            _0x4b240d = "0123456789abcdef";
        for (let _0x40fc88 = 0; _0x40fc88 < _0xd83ac8; _0x40fc88++) {
            let _0x3593ef = Math.round(Math.random() * (_0x4b240d.length - 1));
            _0x37a631 += _0x4b240d.substring(_0x3593ef, _0x3593ef + 1);
        }
        return _0x37a631;
    };
    let _0x423cab = Buffer.from(getstr(16)).toString("base64"),
        _0x4a30cf = Buffer.from(getstr(16)).toString("base64"),
        _0x2d5009 = Buffer.from($.iv).toString("base64").split("").map(_0x1007f6 => _0x21fead[_0x1007f6] || _0x1007f6).join(""),
        _0x81aff5 = Buffer.from("31").toString("base64").split("").map(_0x50b2a7 => _0x21fead[_0x50b2a7] || _0x50b2a7).join("");
    _0x4a30cf = _0x4a30cf.split("").map(_0x54e675 => _0x21fead[_0x54e675] || _0x54e675).join("");
    _0x423cab = _0x423cab.split("").map(_0x223978 => _0x21fead[_0x223978] || _0x223978).join("");
    const _0x2c788c = {
        "sv": _0x2d5009,
        "ad": _0x423cab,
        "od": _0x4a30cf,
        "ov": _0x81aff5,
        "ud": _0x423cab
    };
    let _0x8c555f = encodeURIComponent(JSON.stringify({
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": Date.now(),
        "ridx": -1,
        "cipher": _0x2c788c,
        "ciphertype": 5,
        "version": "1.2.0",
        "appname": "com.jingdong.app.mall"
    }));
    $.UA = "jdapp;android;" + $.av + ";;;appBuild/" + $.bv + ";ef/1;ep/" + _0x8c555f + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android " + $.iv + "; " + $.dv + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36";
}
function _0x65e9e() {
    const _0xd82ae1 = {
        "url": "https://verify-dy-server-hqbjkuhrsu.cn-hangzhou.fcapp.run/dy",
        "timeout": 30000
    };
    return new Promise(_0x4d39cb => {
        $.get(_0xd82ae1, async (_0x1b2f73, _0x4cab9c, _0x357cfc) => {
            try {
                _0x1b2f73 ? (console.log("\n服务连接失败，终止执行！"), process.exit(111)) : _0x357cfc && (_0x357cfc = JSON.parse(_0x357cfc), _0x357cfc.code === 200 ? ($.suc = "no", $.ver = _0x357cfc.version) : (console.log("\n" + _0x357cfc.msg), process.exit(111)));
            } catch (_0x15339a) {
                $.logErr(_0x15339a, _0x4cab9c);
            } finally {
                _0x4d39cb(_0x357cfc);
            }
        });
    });
}
function _0x289dd9() {
    return new Promise(async _0x5c22ce => {
        const _0x3ab6d0 = {
            "url": "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
            "headers": {
                "Host": "wq.jd.com",
                "Accept": "*/*",
                "Connection": "keep-alive",
                "Cookie": _0x163613,
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        };
        $.get(_0x3ab6d0, (_0x5bfd2f, _0x517b2d, _0x11a968) => {
            try {
                if (_0x5bfd2f) {
                    $.logErr(_0x5bfd2f);
                } else {
                    if (_0x11a968) {
                        _0x11a968 = JSON.parse(_0x11a968);
                        if (_0x11a968.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }
                        _0x11a968.retcode === 0 && _0x11a968.data && _0x11a968.data.hasOwnProperty("userInfo") && ($.nickName = _0x11a968.data.userInfo.baseInfo.nickname);
                    } else {
                        $.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x13dc0b) {
                $.logErr(_0x13dc0b);
            } finally {
                _0x5c22ce();
            }
        });
    });
}