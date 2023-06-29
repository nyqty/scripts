/*
#汪汪庄园
入口：京东app-我的-汪汪庄园
12 12 12 12 * jd_jdjoypark.js
跑会黑，自己决定！！！
6dy  2022/12/31
*/
const Env=require('./utils/Env.js');
const $ = new Env("汪汪庄园");
const _0x519374 = $.isNode() ? require("./jdCookie.js") : "",
    _0x2b5a63 = $.isNode() ? require("./sendNotify") : "";
    const H5ST=require('./utils/h5st.js');
let _0x158d61 = [],
    _0x4afa09 = "",
    _0x1601ab = false;
if ($.isNode()) {
    Object.keys(_0x519374).forEach(_0x415774 => {
        _0x158d61.push(_0x519374[_0x415774]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x158d61 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x5192d6($.getdata("CookiesJD") || "[]").map(_0x4ced2c => _0x4ced2c.cookie)].filter(_0xa87a5b => !!_0xa87a5b);
}
$.JOY_COIN_MAXIMIZE = 0;
message = "";
!(async () => {
    if (!_0x158d61[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    console.log("跑会黑，自己决定！！！");
    console.log("\n默认跑前6个CK，问题建议：https://t.me/dylan_jdpro");
    if (process.env.JD_JOY_PARK && process.env.JD_JOY_PARK === "false") {
        console.log("\n******检测到您设置了不运行汪汪乐园，停止运行此脚本******\n");
        return;
    }
    $.H5ST={};
    for (let _0x544fb7 = 0; _0x544fb7 < "6"; _0x544fb7++) {
        _0x4afa09 = _0x158d61[_0x544fb7];
        if (_0x4afa09) {
            $.UserName = decodeURIComponent(_0x4afa09.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4afa09.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x544fb7 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.maxJoyCount = 10;
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x2c99ed();
            if (!$.isLogin) {
                const _0x57127d = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x57127d);
                $.isNode() && (await _0x2b5a63.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            $.hasJoyCoin = true;
            await _0x5cd243(true);
            await $.wait(500);
            if (!$.joyBaseInfo) {
                continue;
            }
            if ($.joyBaseInfo.joyCoin == 0) {
                $.log("还未过新手任务，去完成！！！");
                await _0xf9c731();
                await $.wait(200);
                await _0x5cd243();
                await $.wait(200);
                await _0x1cde9c("{\"guideStep\":11,\"joyOneId\":" + $.newjoylist[0].id + ",\"joyTwoId\":" + $.newjoylist[1].id + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}");
                await $.wait(200);
                await _0x1cde9c("{\"guideStep\":12,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}");
                await $.wait(200);
                await _0x5cd243();
            }
            $.activityJoyList = [];
            $.workJoyInfoList = [];
            await _0x38be2a(true);
            await $.wait(500);
            await _0x1208e7();
            await $.wait(500);
            await _0x162827($.workJoyInfoList);
            try {
                await _0xd7a33d($.activityJoyList);
                await $.wait(200);
            } catch (_0x40f2b3) {
                $.logErr(_0x40f2b3);
            }
            await $.wait(2500);
        }
    }
})().catch(_0xf115fc => $.logErr(_0xf115fc)).finally(() => $.done());
async function _0x5cd243(_0x148299 = false) {
    return new Promise(async _0x22e974 => {
        let _0x3b14a9 = await _0x53107b("joyBaseInfo", "{\"taskId\":\"\",\"inviteType\":\"\",\"inviterPin\":\"\",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "4abce");
        $.post(_0x3b14a9, async (_0x1523e1, _0x4a4c1e, _0x4961a4) => {
            try {
                _0x1523e1 ? (console.log("" + JSON.stringify(_0x1523e1)), console.log("getJoyBaseInfo API请求失败，请检查网路重试")) : (_0x4961a4 = JSON.parse(_0x4961a4), _0x4961a4.success ? _0x148299 && ($.log("等级:" + _0x4961a4.data.level + "|金币:" + _0x1d0cce(_0x4961a4.data.joyCoin)), _0x4961a4.data.level >= 30 && $.isNode() && (await _0x2b5a63.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x4961a4.data.level + "\n已达最高30级\n请到京喜特价APP提现6.66\n提现入口：我的->汪汪乐园->点左上角等级"), $.log("\n开始解锁新场景...\n"))) : $.log(_0x4961a4.errMsg), $.joyBaseInfo = _0x4961a4.data);
            } catch (_0x271d85) {
                $.logErr(_0x271d85, _0x4a4c1e);
            } finally {
                _0x22e974($.joyBaseInfo);
            }
        });
    });
}
function _0x38be2a(_0x3733b2 = false) {
    return new Promise(async _0x252b69 => {
        let _0x2b4380 = await _0x409806("joyList", "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "e18ed");
        $.get(_0x2b4380, async (_0x3769e6, _0x2673a1, _0x491e09) => {
            try {
                if (_0x3769e6) {
                    console.log("" + JSON.stringify(_0x3769e6));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else {
                    _0x491e09 = JSON.parse(_0x491e09);
                    if (_0x491e09.success) {
                        if (_0x3733b2) {
                            $.log("\n===== JOY 状态 start =====");
                            $.log("在逛街的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
                            for (let _0x39cf40 = 0; _0x39cf40 < _0x491e09.data.activityJoyList.length; _0x39cf40++) {
                                $.log("id:" + _0x491e09.data.activityJoyList[_0x39cf40].id + "|name: " + _0x491e09.data.activityJoyList[_0x39cf40].name + "|level: " + _0x491e09.data.activityJoyList[_0x39cf40].level);
                                if (_0x491e09.data.activityJoyList[_0x39cf40].level >= 30 && $.isNode()) {
                                    await _0x2b5a63.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x491e09.data.level + "\n已达到单次最高等级奖励\n请尽快前往活动查看领取\n活动入口：京喜特价APP->汪汪乐园\n");
                                }
                            }
                            $.log("\n在铲土的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
                            for (let _0xfd9094 = 0; _0xfd9094 < _0x491e09.data.workJoyInfoList.length; _0xfd9094++) {
                                $.log("工位: " + _0x491e09.data.workJoyInfoList[_0xfd9094].location + " [" + (_0x491e09.data.workJoyInfoList[_0xfd9094].unlock ? "已开" : "未开") + "]|JOY= " + (_0x491e09.data.workJoyInfoList[_0xfd9094].joyDTO ? "id:" + _0x491e09.data.workJoyInfoList[_0xfd9094].joyDTO.id + "|name: " + _0x491e09.data.workJoyInfoList[_0xfd9094].joyDTO.name + "|level: " + _0x491e09.data.workJoyInfoList[_0xfd9094].joyDTO.level : "空位"));
                            }
                            $.log("===== JOY 状态  end  =====\n");
                        }
                    } else {
                        $.log(_0x491e09.errMsg);
                    }
                    $.activityJoyList = _0x491e09.data.activityJoyList;
                    $.workJoyInfoList = _0x491e09.data.workJoyInfoList;
                }
            } catch (_0x35afc3) {
                $.logErr(_0x35afc3, _0x2673a1);
            } finally {
                _0x252b69(_0x491e09.data);
            }
        });
    });
}
function _0x1208e7() {
    const _0x9b0e55 = {
        "Aqtwm": "OfYlb",
        "MwKOs": "NdjvG"
    };
    return new Promise(async _0x462a7d => {
        let _0x531059 = await _0x53107b("gameShopList", "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "");
        $.post(_0x531059, async (_0x4ff26f, _0x33dfd5, _0x6b4ea1) => {
            try {
                _0x4ff26f ? "mUZga" === _0x9b0e55.Aqtwm ? function () {
                    return false;
                }.constructor(bJszyg.hVEnU + bJszyg.IUIMq).apply(bJszyg.LEAVO) : (console.log("" + JSON.stringify(_0x4ff26f)), console.log("getGameShopList API请求失败，请检查网路重试")) : _0x9b0e55.MwKOs !== "EPfnQ" ? _0x6b4ea1 = JSON.parse(_0x6b4ea1).data.filter(_0x44c1c6 => _0x44c1c6.shopStatus === 1) : (_0x4f1dac.log("" + _0x1b6647.stringify(_0x4ca607)), _0x576482.log("doJoyMove请求失败，请检查网路重试"));
            } catch (_0x5a7a58) {
                $.logErr(_0x5a7a58, _0x33dfd5);
            } finally {
                _0x462a7d(_0x6b4ea1);
            }
        });
    });
}
async function _0x1454a5(_0x3898e4, _0x32345c) {
    let _0x3ff4f4 = _0x32345c.filter(_0x3417e3 => _0x3417e3.unlock && _0x3417e3.joyDTO === null);
    if (_0x3898e4.length !== 0 && _0x3ff4f4.length !== 0) {
        let _0x2d0e36 = Math.max.apply(Math, _0x3898e4.map(_0x5107c8 => _0x5107c8.level)),
            _0x4ee0c5 = _0x3898e4.filter(_0x4a7e95 => _0x4a7e95.level === _0x2d0e36);
        $.log("下地干活！ joyId= " + _0x4ee0c5[0].id + " location= " + _0x3ff4f4[0].location);
        await _0x3e4253(_0x4ee0c5[0].id, _0x3ff4f4[0].location);
        await _0x38be2a();
        await _0x1454a5($.activityJoyList, $.workJoyInfoList);
    } else {
        $.JOY_COIN_MAXIMIZE && (await _0x59129f(_0x3ff4f4));
    }
}
async function _0x59129f(_0x1f00c8) {
    if (_0x1f00c8.length !== 0 && $.hasJoyCoin) {
        $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
        let _0x54916c = await _0x5cd243(),
            _0x21c7bc = _0x54916c.joyCoin;
        $.log("还有" + _0x21c7bc + "金币,看看还能买啥下地");
        let _0x3f229a = await _0x1208e7(),
            _0xd647e2 = false;
        for (let _0x524ad3 = _0x3f229a.length - 1; _0x524ad3 >= 0 && _0x524ad3 - 3 >= 0; _0x524ad3--) {
            if (_0x21c7bc > _0x3f229a[_0x524ad3].consume) {
                $.log("买一只 " + _0x3f229a[_0x524ad3].userLevel + "级的！");
                _0x21c7bc = _0x21c7bc - _0x3f229a[_0x524ad3].consume;
                let _0x4f75bd = await _0x2e2e80(_0x3f229a[_0x524ad3].userLevel);
                if (!_0x4f75bd.success) {
                    break;
                } else {
                    _0xd647e2 = true;
                    $.hasJoyCoin = false;
                    _0x524ad3++;
                }
            }
        }
        $.hasJoyCoin = false;
        _0xd647e2 && (await _0x38be2a(), await $.wait(200), await _0x1454a5($.activityJoyList, $.workJoyInfoList), await $.wait(200), await _0x5cd243());
    }
}
async function _0x162827(_0x2ef852) {
    if (_0x2ef852.filter(_0x2fcab9 => _0x2fcab9.joyDTO).length === 0) {
        $.log("工位清理完成！");
        return true;
    }
    for (let _0xa1d416 = 0; _0xa1d416 < _0x2ef852.length; _0xa1d416++) {
        _0x2ef852[_0xa1d416].unlock && _0x2ef852[_0xa1d416].joyDTO && ($.log("从工位移除 => id:" + _0x2ef852[_0xa1d416].joyDTO.id + "|name: " + _0x2ef852[_0xa1d416].joyDTO.name + "|level: " + _0x2ef852[_0xa1d416].joyDTO.level), await _0x3e4253(_0x2ef852[_0xa1d416].joyDTO.id, 0));
    }
    await _0x38be2a();
    await $.wait(200);
    await _0x162827($.workJoyInfoList);
}
async function _0xd7a33d(_0x195d51) {
    let _0x2fc64e = Math.min.apply(Math, _0x195d51.map(_0x4de4a3 => _0x4de4a3.level));
    let _0x434379 = _0x195d51.filter(_0x5d330b => _0x5d330b.level === _0x2fc64e),
        _0x3e28d0 = await _0x5cd243();
    await $.wait(1000);
    !_0x3e28d0.fastBuyLevel && (await $.wait(2000), _0x3e28d0 = await _0x5cd243());
    if (!_0x3e28d0.fastBuyLevel) {
        $.log("获取信息失败，下地后跳出......");
        await _0x1454a5($.activityJoyList, $.workJoyInfoList);
        return false;
    }
    let _0x427751 = _0x3e28d0.fastBuyLevel;
    if (_0x427751 > 25) {
        return;
    }
    if (_0x434379.length >= 2) {
        $.log("开始合成" + (_0x2fc64e + 1) + "级JOY");
        await $.wait(2000);
        await _0xaf376a(_0x434379[0].id, _0x434379[1].id);
        if (_0x1601ab) {
            _0x3e28d0 = await _0x5cd243();
            await $.wait(200);
            await _0x1454a5($.activityJoyList, $.workJoyInfoList);
            return false;
        }
        await _0x38be2a();
        await $.wait(200);
        await _0xd7a33d($.activityJoyList);
    } else {
        if (_0x434379.length === 1 && _0x434379[0].level < _0x427751) {
            let _0x33cdb9 = await _0x2e2e80(_0x434379[0].level, $.activityJoyList);
            await $.wait(200);
            _0x33cdb9.success ? (await _0x38be2a(), await $.wait(200), await _0xd7a33d($.activityJoyList)) : ($.log("完成！"), await _0x1454a5($.activityJoyList, $.workJoyInfoList));
        } else {
            $.log("没有可合成的JOY开始买买买🛒🛒🛒");
            $.log("最高能买" + _0x427751 + "级的JOY，剩余" + _0x1d0cce(_0x3e28d0.joyCoin) + "金币");
            let _0x329790 = await _0x2e2e80(_0x427751, $.activityJoyList);
            await $.wait(1000);
            _0x329790.success ? (await _0x38be2a(), await $.wait(200), await _0xd7a33d($.activityJoyList)) : ($.log("完成！"), await _0x1454a5($.activityJoyList, $.workJoyInfoList));
        }
    }
}
function _0x3e4253(_0x5d1c98, _0x448904) {
    return new Promise(async _0x531899 => {
        let _0x368e83 = await _0x409806("joyMove", "{\"joyId\":" + _0x5d1c98 + ",\"location\":" + _0x448904 + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "50788");
        $.post(_0x368e83, async (_0x7b9c1b, _0x32de7c, _0x41df95) => {
            try {
                if (_0x7b9c1b) {
                    console.log("" + JSON.stringify(_0x7b9c1b));
                    console.log("doJoyMove请求失败，请检查网路重试");
                } else {
                    if (_0x448904 !== 0) {
                        $.log("下地完成！");
                    }
                    _0x41df95 = JSON.parse(_0x41df95);
                }
            } catch (_0xffcae) {
                $.logErr(_0xffcae, _0x32de7c);
            } finally {
                _0x531899(_0x41df95.data);
            }
        });
    });
}
function _0xaf376a(_0x2f8f69, _0x42468c) {
    return new Promise(async _0xf5a34a => {
        let _0x2e5bab = await _0x409806("joyMergeGet", "{\"joyOneId\":" + _0x2f8f69 + ",\"joyTwoId\":" + _0x42468c + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "b08cf");
        $.get(_0x2e5bab, async (_0x15185e, _0x4da3ad, _0x9b82f3) => {
            try {
                if (_0x15185e) {
                    console.log("" + JSON.stringify(_0x15185e));
                    console.log("doJoyMerge API请求失败，请检查网路重试");
                    _0x9b82f3 = {};
                    _0x1601ab = true;
                } else {
                    _0x9b82f3 = JSON.parse(_0x9b82f3);
                    $.log("合成" + (_0x9b82f3.success ? "成功！" : "失败！【" + _0x9b82f3.errMsg + "】 code=" + _0x9b82f3.code));
                    _0x9b82f3.code == "1006" && (_0x1601ab = true);
                }
            } catch (_0x156932) {
                $.logErr(_0x156932, _0x4da3ad);
                _0x1601ab = true;
            } finally {
                _0xf5a34a(_0x9b82f3.data);
            }
        });
    });
}
async function _0x2e2e80(_0x5886c1, _0xfff69a) {
    return new Promise(async _0x421ea3 => {
        let _0x144fed = await _0x53107b("joyBuy", "{\"level\":" + _0x5886c1 + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "ffb36");
        $.post(_0x144fed, async (_0x598ab8, _0x2fd5a5, _0x94d2d8) => {
            try {
                if (_0x598ab8) {
                    console.log("" + JSON.stringify(_0x598ab8));
                    console.log("doJoyBuy API请求失败，请检查网路重试");
                } else {
                    _0x94d2d8 = JSON.parse(_0x94d2d8);
                    let _0x3fa2c3 = "【不知道啥意思】";
                    switch (_0x94d2d8.code) {
                        case 519:
                            _0x3fa2c3 = "【没钱了】";
                            break;
                        case 518:
                            _0x3fa2c3 = "【没空位】";
                            if (_0xfff69a) {
                                $.log("满员了，删掉低级JOY");
                                let _0x1c54e7 = Math.min.apply(Math, _0xfff69a.map(_0x3604e9 => _0x3604e9.level));
                                await _0x39b190(_0xfff69a.filter(_0x58ddfb => _0x58ddfb.level === _0x1c54e7)[0].id);
                            }
                            break;
                        case 0:
                            _0x3fa2c3 = "【OK】";
                            break;
                    }
                    $.log("购买" + _0x5886c1 + "级JOY " + (_0x94d2d8.success ? "成功！" : "失败！code=" + _0x94d2d8.code + " 意思是" + _0x3fa2c3));
                }
            } catch (_0x17702f) {
                $.logErr(_0x17702f, _0x2fd5a5);
            } finally {
                _0x421ea3(_0x94d2d8);
            }
        });
    });
}
function _0x39b190(_0x5e40e8) {
    return new Promise(async _0x56cd8a => {
        let _0x428633 = await _0x53107b("joyRecovery", "body={\"joyId\":" + _0x5e40e8 + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "");
        $.post(_0x428633, async (_0x1b9126, _0xaa3cb7, _0x21c50c) => {
            try {
                if (_0x1b9126) {
                    console.log("" + JSON.stringify(_0x1b9126));
                    console.log("doJoyRecovery API请求失败，请检查网路重试");
                    _0x21c50c = {};
                } else {
                    _0x21c50c = JSON.parse(_0x21c50c);
                    $.log("回收🐶 " + (_0x21c50c.success ? "成功！" : "失败！【" + _0x21c50c.errMsg + "】 code=" + _0x21c50c.code));
                }
            } catch (_0x47b023) {
                $.logErr(_0x47b023, _0xaa3cb7);
            } finally {
                _0x56cd8a(_0x21c50c);
            }
        });
    });
}
function _0x4017fa() {
    return new Promise(async _0x4f6c86 => {
        let _0x3f1fb2 = await _0x53107b("joyRestart", "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "");
        $.post(_0x3f1fb2, async (_0xbff7c6, _0x3a70b6, _0x5d430) => {
            try {
                _0xbff7c6 ? (console.log("" + JSON.stringify(_0xbff7c6)), console.log("doJoyRestart API请求失败，请检查网路重试")) : (_0x5d430 = JSON.parse(_0x5d430), $.log("新场景解锁 " + (_0x5d430.success ? "成功！" : "失败！【" + _0x5d430.errMsg + "】 code=" + _0x5d430.code)));
            } catch (_0x4eb3f6) {
                $.logErr(_0x4eb3f6, _0x3a70b6);
            } finally {
                _0x4f6c86(_0x5d430);
            }
        });
    });
}
function _0xf9c731() {
    const _0xfd9333 = {
        "SdOxg": "while (true) {}",
        "gFkwh": "gKnVV",
        "gUikq": "NoCSj"
    };
    return new Promise(async _0x26a535 => {
        let _0x3077e6 = await _0x53107b("newStartReward", "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "");
        $.post(_0x3077e6, async (_0x2fc1a8, _0x1cfb8f, _0x40ff4d) => {
            const _0x3318e9 = {
                "NmSEE": "https://bean.m.jd.com/"
            };
            try {
                if (_0x2fc1a8) {
                    _0xfd9333.gFkwh !== _0xfd9333.gFkwh ? _0x54d820(_0x3a7d68) : (console.log("" + JSON.stringify(_0x2fc1a8)), console.log("newStartReward API请求失败，请检查网路重试"));
                } else {
                    if (_0xfd9333.gUikq === _0xfd9333.gUikq) {
                        _0x40ff4d = JSON.parse(_0x40ff4d);
                        $.newjoylist = _0x40ff4d.data;
                    } else {
                        const _0x271edc = {
                            "open-url": "https://bean.m.jd.com/"
                        };
                        _0x40b8d7.msg(_0x583cdf.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", _0x3318e9.NmSEE, _0x271edc);
                        return;
                    }
                }
            } catch (_0x352a1c) {
                $.logErr(_0x352a1c, _0x1cfb8f);
            } finally {
                _0x26a535(_0x40ff4d);
            }
        });
    });
}
function _0x1cde9c(_0x5c5ed6) {
    return new Promise(async _0xaf7709 => {
        let _0x26c83f = await _0x53107b("joyGuide", _0x5c5ed6, "");
        $.post(_0x26c83f, async (_0x38bbf3, _0x85e94f, _0x4490a7) => {
            try {
                if (_0x38bbf3) {
                    console.log("" + JSON.stringify(_0x38bbf3));
                    console.log("joyGuide API请求失败，请检查网路重试");
                } else {
                    _0x4490a7 = JSON.parse(_0x4490a7);
                }
            } catch (_0x84dbd5) {
                $.logErr(_0x84dbd5, _0x85e94f);
            } finally {
                _0xaf7709(_0x4490a7);
            }
        });
    });
}
function _0x572b50() {
    return new Promise(async _0x3cfd20 => {
        let _0x2de880 = await _0x53107b("gameMyPrize", "{\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "");
        $.post(_0x2de880, async (_0x32c7d3, _0x8a7abb, _0x3d51a2) => {
            try {
                if (_0x32c7d3) {
                    console.log("" + JSON.stringify(_0x32c7d3));
                    console.log("getGameMyPrize API请求失败，请检查网路重试");
                } else {
                    _0x3d51a2 = JSON.parse(_0x3d51a2);
                    if (_0x3d51a2.success && _0x3d51a2.data) {
                        $.Vos = _0x3d51a2.data.gamePrizeItemVos;
                        $.overVos = _0x3d51a2.data.gameBigPrizeVO;
                        for (let _0x5a9442 = 0; _0x5a9442 < $.Vos.length; _0x5a9442++) {
                            $.Vos[_0x5a9442].prizeType == 4 && $.Vos[_0x5a9442].status == 1 && $.Vos[_0x5a9442].prizeTypeVO.prizeUsed == 0 && ($.log("\n当前账号有【" + $.Vos[_0x5a9442].prizeName + "】可提现"), $.id = $.Vos[_0x5a9442].prizeTypeVO.id, $.poolBaseId = $.Vos[_0x5a9442].prizeTypeVO.poolBaseId, $.prizeGroupId = $.Vos[_0x5a9442].prizeTypeVO.prizeGroupId, $.prizeBaseId = $.Vos[_0x5a9442].prizeTypeVO.prizeBaseId, await _0x4595a4($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId));
                        }
                        $.overVos && $.overVos.prizeType == 4 && $.overVos.topLevelStatus == 1 && $.overVos.prizeTypeVO.prizeUsed == 0 && ($.log("\n当前账号有【" + $.overVos.bigPrizeName + "】可提现"), $.id = $.overVos.prizeTypeVO.id, $.poolBaseId = $.overVos.prizeTypeVO.poolBaseId, $.prizeGroupId = $.overVos.prizeTypeVO.prizeGroupId, $.prizeBaseId = $.overVos.prizeTypeVO.prizeBaseId, await _0x4595a4($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId));
                    }
                }
            } catch (_0x42eeef) {
                $.logErr(_0x42eeef, _0x8a7abb);
            } finally {
                _0x3cfd20(_0x3d51a2);
            }
        });
    });
}
function _0x4595a4(_0x58e986, _0x466983, _0x2c96f9, _0x50ee9d) {
    const _0x55a9f9 = {
        "XbPxB": "kxcXU"
    };
    return new Promise(async _0xff3d96 => {
        let _0x34b638 = await _0x53107b("apCashWithDraw", "{\"businessSource\":\"JOY_PARK\",\"base\":{\"id\":" + _0x58e986 + ",\"business\":\"joyPark\",\"poolBaseId\":" + _0x466983 + ",\"prizeGroupId\":" + _0x2c96f9 + ",\"prizeBaseId\":" + _0x50ee9d + ",\"prizeType\":4},\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}", "");
        $.post(_0x34b638, async (_0xf6f7e, _0x932d42, _0xde44f8) => {
            try {
                _0xf6f7e ? "MNbVN" === _0x55a9f9.XbPxB ? (_0x28c735 !== 0 && _0x4b64e3.log("下地完成！"), _0x53e1fa = _0x10b3d3.parse(_0x14913f)) : (console.log("" + JSON.stringify(_0xf6f7e)), console.log("apCashWithDraw API请求失败，请检查网路重试")) : (_0xde44f8 = JSON.parse(_0xde44f8), _0xde44f8.success && _0xde44f8.data && console.log("提现结果：" + JSON.stringify(_0xde44f8)));
            } catch (_0x414c29) {
                $.logErr(_0x414c29, _0x932d42);
            } finally {
                _0xff3d96(_0xde44f8);
            }
        });
    });
}
async function _0x53107b(fn, body, appId) {
    const _0x539934 = {
        "EhIlp": "activities_platform",
        "LYdSv": "android"
    };
    let _0x38425a,
        clientVersion = $.UA.split(";")[2];
    if (appId) {
        if( !$.H5ST[$.UserName] ) $.H5ST[$.UserName]={}
        if( !$.H5ST[$.UserName][appId] ){
            $.H5ST[$.UserName][appId]= new H5ST({
                appId,
                "appid": "activities_platform",
                "clientVersion": "1.0",
                "client":"android",
                "pin": $.UserName,
                "ua": $.UA,
                "version":"3.1",
                "expand":{}
            });
            await $.H5ST[$.UserName][appId].genAlgo();
        };
        _0x38425a =  await $.H5ST[$.UserName][appId].genUrlParams(fn,body);
    } else {
        _0x38425a = "functionId=" + fn + "&body=" + body + "&appid=activities_platform&client=android&clientVersion=" + clientVersion + "&t=" + Date.now() + "&uuid=";
    }
    const _0x1e3845 = {
        "User-Agent": $.UA,
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "api.m.jd.com",
        "Origin": "https://joypark.jd.com",
        "Referer": "https://joypark.jd.com/",
        "Cookie": _0x4afa09
    };
    const _0x3b925e = {
        "url": "https://api.m.jd.com",
        "body": _0x38425a,
        "headers": _0x1e3845
    };
    return _0x3b925e;
}
async function _0x409806(_0x57607a, _0x12c51f, _0xc14c0d) {
    let _0x4f32e1,
        _0x499252 = $.UA.split(";")[2];
    if (_0xc14c0d) {
        const _0x56e56a = {
            "appId": _0xc14c0d,
            "fn": _0x57607a,
            "body": _0x12c51f,
            "apid": "activities_platform",
            "ver": _0x499252,
            "cl": "android",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
        _0x4f32e1 = await _0x59a2a4.getbody(_0x56e56a);
    } else {
        _0x4f32e1 = "functionId=" + _0x57607a + "&body=" + _0x12c51f + "&appid=activities_platform&client=android&clientVersion=" + _0x499252 + "&t=" + Date.now() + "&uuid=";
    }
    const _0x5acf3a = {
        "User-Agent": $.UA,
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "api.m.jd.com",
        "Origin": "https://joypark.jd.com",
        "Referer": "https://joypark.jd.com/",
        "Cookie": _0x4afa09
    };
    const _0x1a5342 = {
        "url": "https://api.m.jd.com/client.action?functionId=" + _0x57607a + "&" + _0x4f32e1,
        "headers": _0x5acf3a
    };
    return _0x1a5342;
}
function _0x2c99ed() {
    return new Promise(_0x46f493 => {
        const _0x2ec3d7 = {
            "Cookie": _0x4afa09,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x35fc25 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0x2ec3d7,
            "timeout": 10000
        };
        $.get(_0x35fc25, (_0x2565cf, _0x29c6c4, _0x6b751a) => {
            try {
                if (_0x6b751a) {
                    _0x6b751a = JSON.parse(_0x6b751a);
                    if (!(_0x6b751a.islogin === "1")) {
                        _0x6b751a.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x4acca4) {
                console.log(_0x4acca4);
            } finally {
                _0x46f493();
            }
        });
    });
}
function _0x55754c(_0x3ae375) {
    _0x3ae375 = _0x3ae375 || 32;
    let _0x97744b = "abcdef0123456789",
        _0x17aeca = _0x97744b.length,
        _0x16c470 = "";
    for (i = 0; i < _0x3ae375; i++) {
        _0x16c470 += _0x97744b.charAt(Math.floor(Math.random() * _0x17aeca));
    }
    return _0x16c470;
}
function _0x5192d6(_0x2e1f22) {
    if (typeof _0x2e1f22 == "string") {
        try {
            return JSON.parse(_0x2e1f22);
        } catch (_0x463cc9) {
            console.log(_0x463cc9);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function _0x1d0cce(_0xf1437a) {
    const _0x5b1d72 = ["", "", ""];
    let _0x5c3354 = 1000,
        _0x552727 = 3,
        _0x5198a1 = "";
    let _0x43da06 = 1;
    while (_0xf1437a / _0x5c3354 >= 1) {
        _0x5c3354 *= 10;
        _0x552727 += 1;
    }
    if (_0x552727 <= 4) {
        _0x5b1d72[0] = parseInt(_0xf1437a / 1000) + "";
        _0x5b1d72[1] = "千";
    } else {
        if (_0x552727 <= 8) {
            _0x5198a1 = parseInt(_0x552727 - 4) / 3 > 1 ? "千万" : "万";
            _0x43da06 = _0x5198a1 === "万" ? 10000 : 10000000;
            _0xf1437a % _0x43da06 === 0 ? _0x5b1d72[0] = parseInt(_0xf1437a / _0x43da06) + "" : _0x5b1d72[0] = parseFloat(_0xf1437a / _0x43da06).toFixed(2) + "";
            _0x5b1d72[1] = _0x5198a1;
        } else {
            if (_0x552727 <= 16) {
                _0x5198a1 = (_0x552727 - 8) / 3 > 1 ? "千亿" : "亿";
                _0x5198a1 = (_0x552727 - 8) / 4 > 1 ? "兆" : _0x5198a1;
                _0x5198a1 = (_0x552727 - 8) / 7 > 1 ? "千兆" : _0x5198a1;
                _0x43da06 = 1;
                if (_0x5198a1 === "亿") {
                    _0x43da06 = 100000000;
                } else {
                    if (_0x5198a1 === "千亿") {
                        _0x43da06 = 100000000000;
                    } else {
                        if (_0x5198a1 === "兆") {
                            _0x43da06 = 1000000000000;
                        } else {
                            _0x5198a1 === "千兆" && (_0x43da06 = 1000000000000000);
                        }
                    }
                }
                _0xf1437a % _0x43da06 === 0 ? _0x5b1d72[0] = parseInt(_0xf1437a / _0x43da06) + "" : _0x5b1d72[0] = parseFloat(_0xf1437a / _0x43da06).toFixed(2) + "";
                _0x5b1d72[1] = _0x5198a1;
            }
        }
    }
    _0xf1437a < 1000 && (_0x5b1d72[0] = _0xf1437a + "", _0x5b1d72[1] = "");
    return _0x5b1d72.join("");
}