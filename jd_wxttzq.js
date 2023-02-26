/*
天天来赚钱，入口：小程序-下面分割横幅
只做任务，无签到，待完善
updatetime：2022/12/31
author：https://github.com/6dylan6/jdpro
*/
const Env = require('./utils/Env.js');
const $ = new Env("天天来赚钱-加密");
const _0x22ba6d = $.isNode() ? require("./jdCookie.js") : "";
const _0x9746d5 = $.isNode() ? require("./sendNotify") : "";
let _0x22cf26 = [],
    _0x24aef1 = "";
if ($.isNode()) {
    var _0x12f052 = new Buffer.from("44796c616e", "Hex").toString("utf8");
    Object.keys(_0x22ba6d).forEach(_0x3253a8 => {
        _0x22cf26.push(_0x22ba6d[_0x3253a8]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        $.log = () => { };
    }
} else {
    let _0x4ee41e = $.getdata("CookiesJD") || "[]";
    _0x4ee41e = JSON.parse(_0x4ee41e);
    _0x22cf26 = _0x4ee41e.map(_0x429978 => _0x429978.cookie);
    _0x22cf26.reverse();
    _0x22cf26.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
    _0x22cf26.reverse();
    _0x22cf26 = _0x22cf26.filter(_0x5afaae => !!_0x5afaae);
}
let _0x144ccc = true;
!(async () => {
    if (!_0x22cf26[0]) {
        const _0x55bbc7 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x55bbc7);
        return;
    }
    const _0x542a14 = require("child_process").exec;
    _0x542a14("grep " + _0x12f052 + " jdCookie.js", function (_0x4fb7b1, _0x28dd34, _0x3a8175) {
        !_0x28dd34 && (_0x144ccc = false);
    });
    await $.wait(100);
    for (let _0x1f4eec = 0; _0x1f4eec < _0x22cf26.length; _0x1f4eec++) {
        if (_0x22cf26[_0x1f4eec]) {
            _0x24aef1 = _0x22cf26[_0x1f4eec];
            $.UserName = decodeURIComponent(_0x24aef1.match(/pt_pin=(.+?);/) && _0x24aef1.match(/pt_pin=(.+?);/)[1]);
            $.index = _0x1f4eec + 1;
            $.isLogin = true;
            $.nickName = "";
            await _0x437de3();
            $.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            if (!$.isLogin) {
                const _0x291975 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x291975);
                $.isNode() && (await _0x9746d5.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }
            await _0x57392d();
        }
    }
})().catch(_0x4b2a8e => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4b2a8e + "!", "");
}).finally(() => {
    $.done();
});
async function _0x57392d() {
    try {
        await _0x57be1e();
        await $.wait(1000);
        _0x144ccc && (await _0x4cb79c($.signscene), await $.wait(1000), await _0x224493($.signscene), await $.wait(1000), await _0x4cb79c($.taskonescene), await $.wait(1000), await _0x4ec099($.taskonescene), await $.wait(500));
        $.log("\n开始任务...");
        for (let _0x1e79e6 of $.taskList) {
            if (_0x1e79e6.status === 0) {
                $.log("去做---" + _0x1e79e6.title);
                await _0x3ada11(_0x1e79e6.itemId, _0x1e79e6.scanAssignmentId, 1);
                $.log("等待" + _0x1e79e6.times + "秒");
                await $.wait(_0x1e79e6.times * 1000 + 500);
                await _0x3ada11(_0x1e79e6.itemId, _0x1e79e6.scanAssignmentId, 0);
                $.log("领取奖励...");
                await $.wait(1000);
                await _0x39a50e(_0x1e79e6.scanAssignmentId);
            } else {
                _0x1e79e6.status === 1 ? await _0x39a50e(_0x1e79e6.scanAssignmentId) : $.log(_0x1e79e6.title + "---已完成");
            }
        }
        await $.wait(2000);
    } catch (_0x2b60f4) {
        $.logErr(_0x2b60f4);
    }
}
async function _0x224493(_0x1ad386) {
    let _0x13e03a = "mini_doSign";
    const _0x264873 = {
        "itemId": "1"
    };
    _0x264873 = await _0x645a8b(_0x13e03a, _0x264873, "60d61");
    let _0x3065ee = _0x24aef1.match(/pt_pin=(.+?);/)[1];
    return new Promise(async _0x50a7ec => {
        const _0x1a2ee2 = {
            "Host": "api.m.jd.com",
            "Referer": "https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html",
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "cookie": _0x24aef1 + ("buildtime=20221201;wxapp_type=1;wxapp_version=7.24.10;wxapp_scene=" + _0x1ad386 + ";cid=5;visitkey=26129130095591661082849656;gender=1;province=Guangdong;city=Shenzhen;country=China;nickName=" + _0x3065ee + ";avatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;wxNickName=" + _0x3065ee + ";wxAvatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;")
        };
        const _0x140be8 = {
            "url": "https://api.m.jd.com/mini_doSign?" + _0x264873 + "&clientType=wxapp&loginType=2&_ste=2",
            "headers": _0x1a2ee2
        };
        $.post(_0x140be8, (_0x4259fb, _0x2ab26e, _0x17b62b) => {
            try {
                _0x4259fb ? ($.logErr(_0x4259fb), $.log("dailysign api请求失败，请检查网路重试")) : (_0x17b62b = JSON.parse(_0x17b62b), _0x17b62b.subCode == 0 ? $.log("签到成功: " + _0x17b62b.data.signDays + "天, " + _0x17b62b.data.toastMsg) : $.log("签到失败：" + JSON.stringify(_0x17b62b) + "\n"));
            } catch (_0x25cb97) {
                $.logErr(_0x25cb97);
            } finally {
                _0x50a7ec();
            }
        });
    });
}
async function _0x4ec099(_0x494c93) {
    let _0x312e37 = "miniTask_getDrainageTaskReward";
    const _0x55c0ef = {
        "rewardAssignmentId": "79dRvBQWmT2Dwyu4vvyZUt1Pa6W"
    };
    _0x55c0ef = await _0x645a8b(_0x312e37, _0x55c0ef, "60d61");
    let _0x52fa14 = _0x24aef1.match(/pt_pin=(.+?);/)[1];
    return new Promise(async _0x1fbd38 => {
        const _0x1905a2 = {
            "Host": "api.m.jd.com",
            "Referer": "https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html",
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "cookie": _0x24aef1 + ("buildtime=20221201;wxapp_type=1;wxapp_version=7.24.10;wxapp_scene=" + _0x494c93 + ";cid=5;visitkey=26129130095591661082849656;gender=1;province=Guangdong;city=Shenzhen;country=China;nickName=" + _0x52fa14 + ";avatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;wxNickName=" + _0x52fa14 + ";wxAvatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;")
        };
        const _0x4ba581 = {
            "url": "https://api.m.jd.com/miniTask_getDrainageTaskReward?" + _0x55c0ef + "&clientType=wxapp&loginType=2&_ste=2",
            "headers": _0x1905a2
        };
        $.post(_0x4ba581, (_0x585954, _0x5d0017, _0x513f01) => {
            try {
                _0x585954 ? ($.logErr(_0x585954), $.log("taskone api请求失败，请检查网路重试")) : (_0x513f01 = JSON.parse(_0x513f01), _0x513f01.subCode == 0 ? $.log("指定入口获得: " + _0x513f01.data.rewardAmount + "金币") : $.log("失败：" + JSON.stringify(_0x513f01) + "\n"));
            } catch (_0x22c909) {
                $.logErr(_0x22c909);
            } finally {
                _0x1fbd38();
            }
        });
    });
}
async function _0x57be1e() {
    let _0x136312 = "MiniTask_ChannelPage",
        _0x2fbc9e = {};
    _0x2fbc9e = await _0x645a8b(_0x136312, _0x2fbc9e, "60d61");
    return new Promise(async _0x1cedf4 => {
        const _0x6391b2 = {
            "Host": "api.m.jd.com",
            "Referer": "https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html",
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "cookie": _0x24aef1
        };
        const _0x28c2a6 = {
            "url": "https://api.m.jd.com/MiniTask_ChannelPage?" + _0x2fbc9e + "&clientType=wxapp&loginType=2&_ste=2",
            "headers": _0x6391b2
        };
        $.post(_0x28c2a6, (_0x32d162, _0x34c3d6, _0x28f893) => {
            try {
                _0x32d162 ? ($.logErr(_0x32d162), $.log("querySignList api请求失败，请检查网路重试")) : (_0x28f893 = JSON.parse(_0x28f893), _0x28f893.subCode == 0 ? ($.taskList = _0x28f893.data.scanTaskList, $.signscene = _0x28f893.data.userSignScene, $.taskonescene = _0x28f893.data.drainageTask.scene, $.log("当前金币数量：" + _0x28f893.data.point + ", 约为" + _0x28f893.data.totalAmount + "元\n"), _0x1cedf4($.taskList)) : $.log(JSON.stringify(_0x28f893)));
            } catch (_0x178047) {
                $.logErr(_0x178047);
            } finally {
                _0x1cedf4();
            }
        });
    });
}
async function _0x4cb79c(_0x49084f) {
    let _0x3a3360 = "MiniTask_ChannelPage";
    const _0x55f291 = {
        "source": "task"
    };
    _0x55f291 = await _0x645a8b(_0x3a3360, _0x55f291, "60d61");
    let _0x5b95be = _0x24aef1.match(/pt_pin=(.+?);/)[1];
    return new Promise(async _0x413e09 => {
        const _0x3f5fb2 = {
            "Host": "api.m.jd.com",
            "Referer": "https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html",
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "cookie": _0x24aef1 + ("buildtime=20221201;wxapp_type=1;wxapp_version=7.24.10;wxapp_scene=" + _0x49084f + ";cid=5;visitkey=26129130095591661082849656;gender=1;province=Guangdong;city=Shenzhen;country=China;nickName=" + _0x5b95be + ";avatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;wxNickName=" + _0x5b95be + ";wxAvatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;")
        };
        const _0x191f2f = {
            "url": "https://api.m.jd.com/MiniTask_ChannelPage?" + _0x55f291 + "&clientType=wxapp&loginType=2&_ste=2",
            "headers": _0x3f5fb2
        };
        $.post(_0x191f2f, (_0x8dfecb, _0xebff9c, _0x2b1783) => {
            try {
                if (_0x8dfecb) {
                    $.logErr(_0x8dfecb);
                    $.log("querySignList api请求失败，请检查网路重试");
                } else {
                    _0x2b1783 = JSON.parse(_0x2b1783);
                    if (!(_0x2b1783.subCode == 0)) {
                        $.log(JSON.stringify(_0x2b1783));
                    }
                }
            } catch (_0x310d5d) {
                $.logErr(_0x310d5d);
            } finally {
                _0x413e09();
            }
        });
    });
}
async function _0x3ada11(_0x407021, _0x292f03, _0x2fa849) {
    let _0x2c3cda = "MiniTask_ScanTask";
    const _0xd5afe6 = {
        "itemId": _0x407021,
        "scanAssignmentId": _0x292f03,
        "actionType": _0x2fa849
    };
    _0xd5afe6 = await _0x645a8b(_0x2c3cda, _0xd5afe6, "60d61");
    return new Promise(async _0x2f9f8 => {
        const _0x263d5c = {
            "Host": "api.m.jd.com",
            "Referer": "https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html",
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "cookie": _0x24aef1
        };
        const _0x2c6cbd = {
            "url": "https://api.m.jd.com/MiniTask_ScanTask?" + _0xd5afe6 + "&clientType=wxapp&loginType=2&_ste=2",
            "headers": _0x263d5c
        };
        $.post(_0x2c6cbd, (_0x2d6b8a, _0x4797a, _0x1497fe) => {
            try {
                _0x2d6b8a ? ($.logErr(_0x2d6b8a), $.log("dotask api请求失败，请检查网路重试")) : _0x1497fe && (_0x1497fe = JSON.parse(_0x1497fe), _0x1497fe.subCode === 0 ? _0x2fa849 ? "" : $.log("任务完成！") : $.log(_0x1497fe.message));
            } catch (_0x4378de) {
                $.logErr(_0x4378de);
            } finally {
                _0x2f9f8();
            }
        });
    });
}
async function _0x39a50e(_0x15090d) {
    let _0x13fa71 = "MiniTask_ScanReward";
    const _0x39cc56 = {
        "scanAssignmentId": _0x15090d
    };
    _0x39cc56 = await _0x645a8b(_0x13fa71, _0x39cc56, "60d61");
    return new Promise(async _0x3dfbd9 => {
        const _0x461255 = {
            "Host": "api.m.jd.com",
            "Referer": "https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html",
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "cookie": _0x24aef1
        };
        const _0x5784f3 = {
            "url": "https://api.m.jd.com/MiniTask_ScanReward?" + _0x39cc56 + "&clientType=wxapp&loginType=2&_ste=2",
            "headers": _0x461255
        };
        $.post(_0x5784f3, (_0x3ddae4, _0x58fd14, _0x1b9fcb) => {
            try {
                _0x3ddae4 ? ($.logErr(_0x3ddae4), $.log("dotask api请求失败，请检查网路重试")) : _0x1b9fcb && (_0x1b9fcb = JSON.parse(_0x1b9fcb), _0x1b9fcb.subCode === 0 ? $.log("获得" + _0x1b9fcb.data[0].discount + "金币！") : $.log(_0x1b9fcb.message));
            } catch (_0xeeacac) {
                $.logErr(_0xeeacac);
            } finally {
                _0x3dfbd9();
            }
        });
    });
}
function _0x437de3() {
    return new Promise(async _0x40dc46 => {
        const _0x23ce23 = {
            "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": _0x24aef1,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
            }
        };
        $.post(_0x23ce23, (_0x222942, _0x54c350, _0x2eed21) => {
            try {
                if (_0x222942) {
                    $.log("" + JSON.stringify(_0x222942));
                    $.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (_0x2eed21) {
                        _0x2eed21 = JSON.parse(_0x2eed21);
                        if (_0x2eed21.retcode === 13) {
                            $.isLogin = false;
                            return;
                        }
                        _0x2eed21.retcode === 0 ? $.nickName = _0x2eed21.base && _0x2eed21.base.nickname || $.UserName : $.nickName = $.UserName;
                    } else {
                        $.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x30382d) {
                $.logErr(_0x30382d, _0x54c350);
            } finally {
                _0x40dc46();
            }
        });
    });
}
const _0xb00b7c = require("crypto-js");
$.UA = "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1663720079628%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%2C%22od%22%3A%22ZQHuZtc3CzCjZtdvZM1rEQO5BJvsD2OjCzPsZwHsZQU2YzKz%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36";
function _0x5b6614(_0x1f7b22) {
    if (_0x1f7b22 === "3.1") {
        var _0x4e928b = "",
            _0xb4b9b0 = "0123456789",
            _0x27517e = _0xb4b9b0,
            _0x4bccfd = Math.floor(Math.random() * 10),
            _0x54c78b,
            _0x11e21b = 12;
        do {
            const _0x48b14f = {
                "size": 1,
                "num": _0xb4b9b0
            };
            _0x54c78b = _0x1a774f(_0x48b14f);
            _0x4e928b.indexOf(_0x54c78b) == -1 && (_0x4e928b += _0x54c78b);
        } while (_0x4e928b.length < 3);
        for (let _0x26d926 of _0x4e928b.slice()) {
            _0x27517e = _0x27517e.replace(_0x26d926, "");
        }
        const _0x291e2d = {
            "size": _0x4bccfd,
            "num": _0x27517e
        };
        const _0x523a28 = {
            "size": _0x11e21b - _0x4bccfd,
            "num": _0x27517e
        };
        var _0x3714c6 = _0x1a774f(_0x291e2d) + _0x4e928b + _0x1a774f(_0x523a28) + _0x4bccfd,
            _0x3cd0a7 = _0x3714c6.split(""),
            _0xb937 = [];
        for (; _0x3cd0a7.length;) {
            _0xb937.push(9 - parseInt(_0x3cd0a7.pop()));
        }
        _0x3714c6 = _0xb937.join("");
    } else {
        var _0x11e21b = 12,
            _0x4e928b = "",
            _0xb4b9b0 = "0123456789",
            _0x27517e = _0xb4b9b0,
            _0x4bccfd = Math.floor(Math.random() * 10),
            _0x54c78b;
        do {
            const _0xf1e16d = {
                "size": 1,
                "num": _0xb4b9b0
            };
            _0x54c78b = _0x1a774f(_0xf1e16d);
            _0x4e928b.indexOf(_0x54c78b) == -1 && (_0x4e928b += _0x54c78b);
        } while (_0x4e928b.length < 3);
        for (let _0x4be718 of _0x4e928b.slice()) {
            _0x27517e = _0x27517e.replace(_0x4be718, "");
        }
        const _0x3fb390 = {
            "size": _0x4bccfd,
            "num": _0x27517e
        };
        const _0x18af5f = {
            "size": _0x11e21b - _0x4bccfd,
            "num": _0x27517e
        };
        var _0x3714c6 = _0x1a774f(_0x3fb390) + _0x4e928b + _0x1a774f(_0x18af5f) + _0x4bccfd;
    }
    return _0x3714c6;
}
function _0x1a774f() {
    var _0x468c8e,
        _0x4f8012 = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0x3578c6 = _0x4f8012.size,
        _0x2788d3 = "undefined" === _0x3578c6 ? 10 : _0x3578c6,
        _0x4b10bc = _0x4f8012.dictType,
        _0x3f7aa6 = _0x4f8012.num,
        _0x200886 = "";
    if (_0x3f7aa6 && "string" == typeof _0x3f7aa6) {
        _0x468c8e = _0x3f7aa6;
    }
    for (; _0x2788d3--;) {
        _0x200886 += _0x468c8e[Math.floor(Math.random() * _0x468c8e.length)];
    }
    return _0x200886;
}
function _0x315a75() {
    var _0x242e02 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0x113ec4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0x37dfc6 = new Date(_0x242e02),
        _0x8e776a = _0x113ec4,
        _0x1718ed = {
            "M+": _0x37dfc6.getMonth() + 1,
            "d+": _0x37dfc6.getDate(),
            "D+": _0x37dfc6.getDate(),
            "h+": _0x37dfc6.getHours(),
            "H+": _0x37dfc6.getHours(),
            "m+": _0x37dfc6.getMinutes(),
            "s+": _0x37dfc6.getSeconds(),
            "w+": _0x37dfc6.getDay(),
            "q+": Math.floor((_0x37dfc6.getMonth() + 3) / 3),
            "S+": _0x37dfc6.getMilliseconds()
        };
    /(y+)/i.test(_0x8e776a) && (_0x8e776a = _0x8e776a.replace(RegExp.$1, "".concat(_0x37dfc6.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0x1718ed).forEach(function (_0x3de32f) {
        if (new RegExp("(".concat(_0x3de32f, ")")).test(_0x8e776a)) {
            var _0x474c51 = "S+" === _0x3de32f ? "000" : "00";
            _0x8e776a = _0x8e776a.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x1718ed[_0x3de32f] : "".concat(_0x474c51).concat(_0x1718ed[_0x3de32f]).substr("".concat(_0x1718ed[_0x3de32f]).length));
        }
    });
    return _0x8e776a;
}
function _0x5953cf(_0x488c6c) {
    let _0x2f72e6 = {
        "version": "3.1",
        "fp": $.dy[_0x488c6c].fp,
        "appId": _0x488c6c,
        "timestamp": Date.now(),
        "platform": "applet",
        "expandParams": ""
    };
    _0x2f72e6.expandParams = $.expandParams || "";
    const _0x553b85 = {
        "Host": "cactus.jd.com",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-agent": $.UA
    };
    let _0x332508 = {
        "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
        "body": JSON.stringify(_0x2f72e6),
        "headers": _0x553b85,
        "timeout": 10000
    };
    return new Promise(async _0xd8edad => {
        $.post(_0x332508, (_0xec405d, _0x2d10ca, _0x32544a) => {
            try {
                if (_0xec405d) {
                    console.log("" + JSON.stringify(_0xec405d));
                    console.log("algo请求失败，请检查网路重试");
                } else {
                    _0x32544a = JSON.parse(_0x32544a);
                    let _0x48a08e = _0x32544a.data.result;
                    $.dy[_0x488c6c].tk = _0x48a08e.tk;
                    $.dy[_0x488c6c].test = new Function("return " + _0x48a08e.algo)();
                }
            } catch (_0x5631d3) {
                $.logErr(_0x5631d3, _0x2d10ca);
            } finally {
                _0xd8edad(_0x32544a);
            }
        });
    });
}
async function _0x645a8b(_0x1913db, _0x217a57, _0x5779ab) {
    let _0x5b6445 = "3.1",
        _0x2ff784 = _0x5b6614(_0x5b6445);
    const _0x1e1f00 = {
        "fp": _0x2ff784
    };
    const _0x59fb59 = {
        "_0x5779ab": _0x1e1f00
    };
    $.dy = _0x59fb59;
    let _0x4e60df = ["pp"],
        _0x1f8a1b = {},
        _0x4225e1 = {},
        _0xdd1f1c = [{}];
    for (let _0x5502b8 in _0x4e60df) {
        _0x4225e1[_0x4e60df[_0x5502b8]] = _0xdd1f1c[_0x5502b8];
    }
    const _0x3161ad = {
        "ai": _0x5779ab,
        "fp": _0x2ff784
    };
    const _0x8373c3 = {
        ..._0x4225e1,
        ..._0x3161ad
    };
    let _0x26b4b6 = _0x8373c3,
        _0x485b41 = _0xb00b7c.AES.encrypt(JSON.stringify(_0x26b4b6, null, 2), _0xb00b7c.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
            "iv": _0xb00b7c.enc.Utf8.parse("0102030405060708"),
            "mode": _0xb00b7c.mode.CBC,
            "padding": _0xb00b7c.pad.Pkcs7
        });
    $.expandParams = _0x485b41.ciphertext.toString();
    let _0x109f32 = new Date().getTime();
    await _0x5953cf(_0x5779ab);
    let _0x2b32b2 = new Date().getTime(),
        _0x57577f = _0x315a75(_0x2b32b2, "yyyyMMddhhmmssSSS");
    _0x1f8a1b = $.dy[_0x5779ab];
    _0x1f8a1b.enc = await _0x1f8a1b.test(_0x1f8a1b.tk, _0x2ff784, _0x57577f, _0x5779ab, _0xb00b7c).toString(_0xb00b7c.enc.Hex);
    let _0xdee818 = {
        "appid": "hot_channel",
        "functionId": _0x1913db,
        "body": JSON.stringify(_0x217a57),
        "clientVersion": "7.24.10",
        "client": "android",
        "t": _0x109f32
    };
    let _0x3a8da0 = ["appid", "body", "client", "clientVersion", "functionId", "t"],
        _0x1aebc9 = _0x3a8da0.filter(_0x1cf919 => _0xdee818[_0x1cf919]).map(_0x1d2cf1 => _0x1d2cf1 + ":" + (_0x1d2cf1 == "body" ? _0xb00b7c.SHA256(_0xdee818[_0x1d2cf1]).toString() : _0xdee818[_0x1d2cf1])).join("&"),
        _0x4e9a53 = _0xb00b7c.HmacSHA256(_0x1aebc9, _0x1f8a1b.enc).toString(_0xb00b7c.enc.Hex),
        _0x4621ba = "";
    let _0x5c97ea = {
        "pp": {},
        "fp": _0x2ff784
    };
    let _0x1dccdf = _0xb00b7c.AES.encrypt(JSON.stringify(_0x5c97ea, null, 2), _0xb00b7c.enc.Utf8.parse("wm0!@w_s#ll1flo("), {
        "iv": _0xb00b7c.enc.Utf8.parse("0102030405060708"),
        "mode": _0xb00b7c.mode.CBC,
        "padding": _0xb00b7c.pad.Pkcs7
    });
    _0x4621ba = _0x1dccdf.ciphertext.toString();
    let _0x5a8a2f = [_0x57577f, _0x2ff784, _0x5779ab, _0x1f8a1b.tk, _0x4e9a53, _0x5b6445, _0x2b32b2, _0x4621ba].join(";");
    return "functionId=" + _0x1913db + "&body=" + encodeURIComponent(JSON.stringify(_0x217a57)) + "&h5st=" + encodeURIComponent(_0x5a8a2f) + "&client=android&appid=hot_channel&t=" + _0x109f32 + "&clientVersion=7.24.10";
}