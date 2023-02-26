/*
东东爱消除
入口： APP-我的--更多游戏
日常任务，开宝箱，每日挑战，助力，转盘抽奖，游戏，新手福利领取，后续兑换
新手福利3天内70星兑换京豆礼包
默认定时不跑，自己改，一天5次就行，一起冲就炸了
默认不开启双倍奖励，会加购商品，如需开启export XXLDOUBLE='true'
8 1,4,8,13,19 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_moxigame.js 
updatetime: 2022/10/12 新增双倍奖励领取，速度优化
author: https://github.com/6dylan6/jdpro
*/
const Env = require('./utils/Env.js');
const $ = new Env("东哥爱消除");
const aN = require("crypto-js"),
    aO = $.isNode() ? require("./jdCookie.js") : "",
    aP = $.isNode() ? require("./sendNotify") : "";
let aQ = [],
    aR = "",
    aS = process.env.XXLDOUBLE || false;
if ($.isNode()) {
    var aT = new Buffer.from("44796c616e", "Hex").toString("utf8");
    Object.keys(aO).forEach(a => {
        aQ.push(aO[a]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    aQ = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...b3($.getdata("CookiesJD") || "[]").map(a => a.cookie)].filter(a => !!a);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.full = false;
$.invitercode = [];
let aU = ["4708215"],
    aV = 0;
aV = Math.floor(Math.random() * aU.length);
!(async () => {
    $.log("入口： APP-我的-更多游戏,只运行前10个CK，未进过游戏的，第一次运行可能有问题，建议手动进游戏完成新手引导！");
    $.log("默认不开启双倍奖励，会加购，如需XXLDOUBLE=\"true\"开启！");
    $.log("\n问题建议or代抢1888豆：https://t.me/dylan_jdpro");
    if (!aQ[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    const b = require("child_process").exec;
    await b("grep " + aT + " jdCookie.js", async function (f, g, h) {
        !g;
    });
    for (let f = 0; f < aQ.length; f++) { }
    await b4();
    for (let g = 0; g < 10; g++) {
        aR = aQ[g];
        if (aR) {
            $.UserName = decodeURIComponent(aR.match(/pt_pin=([^; ]+)(?=;?)/) && aR.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = g + 1;
            $.hotFlag = false;
            console.log("\n\n******开始【京东账号" + $.index + "】" + $.UserName + "*********\n");
            await aX();
            if ($.outFlag) {
                break;
            }
        }
    }
    if ($.outFlag) {
        let k = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, k);
        if ($.isNode()) {
            await aP.sendNotify("" + $.name, "" + k);
        }
    }
    $.log("\n开始内部互助...");
    for (let m = 0; m < 10; m++) {
        aR = aQ[m];
        if (!aR) {
            break;
        }
        $.UserName = decodeURIComponent(aR.match(/pt_pin=([^; ]+)(?=;?)/) && aR.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = m + 1;
        $.full = false;
        console.log("\n******开始【账号" + $.index + "】" + $.UserName + "*********\n");
        for (let p of $.invitercode) {
            if ($.full) {
                break;
            }
            console.log("去助力：" + p);
            await aY("token");
            await $.wait(500);
            await aY("lkToken");
            await $.wait(500);
            await aY("inviter", {
                "inviter": p,
                "activeId": "A_112790_R_1_D_20201028",
                "scene": "wojing",
                "inviterSource": "dailyShare",
                "lkToken": $.lkToken,
                "token": $.Token,
                "openId": "oPcgJ43zJhf4ZUgglKExqFNrYn7Q",
                "lkAppId": "wxccb5c536b0ecd1bf",
                "refid": "2",
                "deviceType": "weixin",
                "source": "2"
            });
            $.datalist = {
                "loginToken": $.token2,
                "pltId": $.pltId,
                "loginEnc": $.token2.slice(8, 16) + $.token2.slice(24, 32),
                "loginDec": aN.MD5($.pltId).toString().slice(0, 16),
                "authCode": $.authCode
            };
            await $.wait(500);
            await aY("inviterAward", {
                "id": $.datalist.pltId,
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.datalist.authCode,
                "token": $.token2,
                "inviter": p
            });
        }
    }
})().catch(a => $.logErr(a)).finally(() => $.done());
async function aX() {
    try {
        $.hasEnd = true;
        $.Token = "";
        $.Pin = "";
        $.reqsId = 1;
        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本");
            return;
        }
        await aY("token");
        if ($.Token == "") {
            console.log("获取token失败！");
            return;
        }
        await $.wait(500);
        await aY("lkToken");
        if (!$.lkToken) {
            return;
        }
        await $.wait(500);
        await aY("login");
        if (!$.info) {
            return;
        }
        await $.wait(500);
        console.log("当前星星数量", $.starnum, "个");
        await aY("logincheck");
        if (!$.token3) {
            return;
        }
        await aY("getAdInfo");
        await $.wait(500);
        await aY("queryUserBirthDay");
        await $.wait(500);
        let b = await aY("loadMail");
        for (let q of b.data) {
            if (!q.read) {
                await aY("readMail", {
                    "mailid": q._id,
                    "id": $.pltId,
                    "activeId": "A_112790_R_1_D_20201028",
                    "authcode": $.authCode,
                    "token": $.token2
                });
                console.log("邮件奖励领取...");
                await $.wait(500);
                await aY("applyMail", {
                    "mailid": q._id,
                    "id": $.pltId,
                    "activeid": "A_112790_R_1_D_20201028",
                    "activeId": "A_112790_R_1_D_20201028",
                    "authcode": $.authCode,
                    "token": $.token2
                });
            }
        }
        await aY("sevenDaySignIn");
        await $.wait(500);
        let f = await aY("getSevenDaySignInfo");
        await $.wait(500);
        console.log("已签到:", f.curSignDay + 1, "天");
        if (f.curSignDay == 6 && f.finalSignStatus == 1) {
            $.log("领取7天签到奖励...");
            await aY("getConsecutiveSignAwards");
            await $.wait(500);
        } else {
            if (f.finalSignStatus == 2) {
                $.log("7天签到奖励已领取！");
            }
        }
        let g = await aY("openChest");
        await $.wait(500);
        if (g.code == 0) {
            for (let w of g.gameAward) {
                console.log("开宝箱获得:", w.sName);
            }
        }
        await aY("marketgoods");
        await $.wait(500);
        if ($.starnum >= 70 && $.goodlist[0].res.sID === "P001") {
            $.log("开始领取新手福利");
            let z = await aY("marketbuy", {
                "consumeid": "P001",
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authCode,
                "token": $.token2
            });
            if (z.code === 0) {
                console.log("领取成功：京豆*166");
            }
        }
        let h = await aY("gametasks");
        await $.wait(1000);
        $.log("\n开始日常任务...");
        for (let A of h.tasks) {
            A.state.iFreshTimes ? console.log(A.res.sName, "---任务已完成！") : (await aY("uploadtask", {
                "taskId": A.res.sID,
                "taskType": A.res.eType,
                "value": A.res.iValue,
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authCode,
                "token": $.token2
            }), await $.wait(500), await aY("finishtask", {
                "taskid": A.res.sID,
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authCode,
                "token": $.token2
            }));
        }
        $.levelId = Number($.Maxlevel.id) || $.curLevelId;
        let j = false,
            k = [];
        for (let E = 0; E < 50; E++) {
            $.levelId = $.levelId + 1;
            if (j) {
                $.levelId = b6(k, 1)[0];
                k = k.filter(H => H != $.levelId);
            }
            let F = await aY("beginLevel");
            await $.wait(500);
            if (!F.enegryStartGrowTime) {
                if (F.errMsg == "level is not unlocked!") {
                    $.levelId = $.levelId - 1;
                    F = await aY("beginLevel");
                    if (!F.enegryStartGrowTime) {
                        console.log(F.errMsg);
                        break;
                    }
                } else {
                    if (F.errMsg == "level res is not found!") {
                        j = true;
                        for (let L = 0; L < parseInt(Number($.Maxlevel.id) / $.drawInterval) - 1; L++) {
                            k.push($.drawLevelStart + $.drawInterval * L);
                        }
                        $.levelId = b6(k, 1)[0];
                        k = k.filter(N => N != $.levelId);
                    } else {
                        $.log("\n能量不足,退出游戏！");
                        break;
                    }
                }
            }
            $.log("\n开始游戏：" + $.levelId + "关");
            await $.wait(5000);
            process.stdout.write("--->");
            await aY("setsingleinfo");
            await $.wait(5000);
            process.stdout.write("--->");
            await aY("makeRandomAdData");
            await $.wait(10000);
            process.stdout.write("--->\n");
            let G = await aY("endLevel");
            await $.wait(2000);
            await aY("setsingleinfo");
            if ($.adflag && aS) {
                if ($.api !== "") {
                    await $.wait(1000);
                    await aY("execute");
                }
                await $.wait(2000);
                await aY("finishAd");
            }
            if (!G.enegryStartGrowTime) {
                $.log("结束游戏:", G.errMsg);
                break;
            }
        }
        $.log("\n开始每日挑战...");
        await aY("getDailyMatch");
        for (let S = 0; S < 10; S++) {
            $.log("进行第" + (S + 1) + "次挑战");
            if (S == 0) {
                $.matchlevelId = 40103;
            } else {
                $.matchlevelId = b2(40101, 40107);
            }
            let T = await aY("beginDailyMatch");
            if (T.dayInfo && T.dayInfo.curLevel) {
                await $.wait(2000);
                process.stdout.write("-->");
                await aY("setsingleinfo");
                await $.wait(5000);
                process.stdout.write("-->");
                await $.wait(5000);
                process.stdout.write("-->");
                await $.wait(5000);
                process.stdout.write("-->\n");
                await aY("endDailyMatch");
                await $.wait(1000);
                await aY("setsingleinfo");
                await $.wait(1000);
            } else {
                console.log("没有挑战次数！");
                break;
            }
        }
        $.log("\n挑战奖励领取...");
        for (let a1 of [...Array(10).keys()]) {
            let a2 = await aY("getDailyMatchAward");
            if (a2.reward) {
                process.stdout.write("" + (a1 + 1));
                $.log("领取成功！");
                await $.wait(1000);
            } else {
                $.log("没有奖励可领取！");
                break;
            }
        }
        $.log("\n大转盘抽奖...");
        let l = await aY("exchangeres");
        await $.wait(1000);
        let m = {};
        l.aShowItems.forEach((a6, a7, a8) => {
            m[a6.value] = a8[a7];
        });
        for (let a6 of Array(15)) {
            let a7 = await aY("exchange");
            await $.wait(1000);
            if (!a7.rollAwards) {
                break;
            }
            for (let a8 of a7.rollAwards) {
                console.log("抽奖获得:", m[a8.value].name);
            }
        }
    } catch (ac) {
        console.log(ac);
    }
}
async function aY(B, C) {
    if ($.outFlag) {
        return;
    }
    let F = "POST";
    switch (B) {
        case "token":
            url = "https://jdjoy.jd.com/saas/framework/user/token?appId=dafbe42d5bff9d82298e5230eb8c3f79&client=m&url=pengyougou.m.jd.com";
            break;
        case "lkToken":
            url = "https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=dafbe42d5bff9d82298e5230eb8c3f79";
            break;
        case "login":
            url = "https://jd.moxigame.cn/platform/active/role/login";
            const H = {
                "activeId": "A_112790_R_1_D_20201028",
                "refid": "wojing",
                "lkToken": $.lkToken,
                "token": $.Token,
                "deviceType": "h5",
                "scene": "3",
                "source": "wojing"
            };
            C = H;
            break;
        case "logincheck":
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/logincheck";
            const I = {
                "info": $.info,
                "reqsId": $.reqsId
            };
            C = I;
            break;
        case "beginDailyMatch":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/beginDailyMatch";
            const J = {
                "gameId": $.gameId,
                "token": $.token3,
                "levelId": $.matchlevelId,
                "reqsId": $.reqsId
            };
            C = J;
            break;
        case "setsingleinfo":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/setsingleinfo";
            const K = {
                "gameId": $.gameId,
                "token": $.token3,
                "gameInfo": {},
                "reqsId": $.reqsId
            };
            K.gameInfo.failCount = $.failCount;
            C = K;
            break;
        case "endLevel":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/endLevel";
            C = {
                "gameId": $.gameId,
                "token": $.token3,
                "levelId": $.levelId,
                "score": b2(250000, 500000),
                "reqsId": $.reqsId
            };
            break;
        case "openChest":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/openChest";
            const L = {
                "gameId": $.gameId,
                "token": $.token3,
                "reqsId": $.reqsId
            };
            C = L;
            break;
        case "applyMail":
            url = "https://jd.moxigame.cn/platform/active/role/applyMail";
            break;
        case "makeRandomAdData":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/makeRandomAdData";
            const M = {
                "gameId": $.gameId,
                "token": $.token3,
                "reqsId": $.reqsId
            };
            C = M;
            break;
        case "endDailyMatch":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/endDailyMatch";
            const N = {
                "gameId": $.gameId,
                "token": $.token3,
                "levelId": $.matchlevelId,
                "score": 120,
                "reqsId": $.reqsId
            };
            C = N;
            break;
        case "getDailyMatchAward":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/getDailyMatchAward";
            const O = {
                "gameId": $.gameId,
                "token": $.token3,
                "reqsId": $.reqsId
            };
            C = O;
            break;
        case "getDailyMatch":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/getDailyMatch";
            const P = {
                "gameId": $.gameId,
                "token": $.token3,
                "reqsId": $.reqsId
            };
            C = P;
            break;
        case "queryUserBirthDay":
            url = "https://jd.moxigame.cn/platform/active/role/queryUserBirthDay";
            const Q = {
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authCode,
                "token": $.token2
            };
            C = Q;
            break;
        case "loadMail":
            url = "https://jd.moxigame.cn/platform/active/role/loadMail";
            const R = {};
            R.id = $.pltId;
            R.activeid = "A_112790_R_1_D_20201028";
            R.activeId = "A_112790_R_1_D_20201028";
            R.authcode = $.authCode;
            R.token = $.token2;
            C = R;
            break;
        case "readMail":
            url = "https://jd.moxigame.cn/platform/active/role/readMail";
            break;
        case "sevenDaySignIn":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/sevenDaySignIn";
            const S = {
                "gameId": $.gameId,
                "token": $.token3,
                "way": 1,
                "reqsId": $.reqsId
            };
            C = S;
            break;
        case "getSevenDaySignInfo":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/getSevenDaySignInfo";
            const T = {
                "gameId": $.gameId,
                "token": $.token3,
                "reqsId": $.reqsId
            };
            C = T;
            break;
        case "exchangeres":
            url = "https://jd.moxigame.cn/platform/active/role/exchangeres";
            const U = {
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authCode,
                "token": $.token2
            };
            C = U;
            break;
        case "exchange":
            url = "https://jd.moxigame.cn/platform/active/role/exchange";
            const V = {
                "batch": false,
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authCode,
                "token": $.token2
            };
            C = V;
            break;
        case "gametasks":
            url = "https://jd.moxigame.cn/platform/active/jingdong/gametasks";
            const W = {
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authCode,
                "token": $.token2
            };
            C = W;
            break;
        case "uploadtask":
            url = "https://jd.moxigame.cn/platform/role/base/uploadtask";
            break;
        case "finishtask":
            url = "https://jd.moxigame.cn/platform/active/jingdong/finishtask";
            break;
        case "beginLevel":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/beginLevel";
            const X = {
                "gameId": $.gameId,
                "token": $.token3,
                "levelId": $.levelId,
                "reqsId": $.reqsId
            };
            C = X;
            break;
        case "inviter":
            url = "https://jd.moxigame.cn/platform/active/role/login";
            break;
        case "inviterAward":
            url = "https://jd.moxigame.cn/platform/active/role/inviterAward";
            break;
        case "marketbuy":
            url = "https://jd.moxigame.cn/platform/active/role/marketbuy";
            break;
        case "marketgoods":
            url = "https://jd.moxigame.cn/platform/active/role/marketgoods";
            const Y = {
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authCode,
                "token": $.token2
            };
            C = Y;
            break;
        case "getConsecutiveSignAwards":
            $.reqsId = $.reqsId + 1;
            url = "https://jd.moxigame.cn/eliminate_jd/game/local/getConsecutiveSignAwards";
            const Z = {
                "gameId": $.gameId,
                "token": $.token3,
                "reqsId": $.reqsId
            };
            C = Z;
            break;
        case "execute":
            url = "https://jd.moxigame.cn/platform/active/jingdong/execute";
            if ($.api === "followShop") {
                const a3 = {
                    "api": $.api,
                    "shopId": $.advalue,
                    "taskId": $.adsID,
                    "fromAd": $.adUuid,
                    "id": $.pltId,
                    "activeid": "A_112790_R_1_D_20201028",
                    "activeId": "A_112790_R_1_D_20201028",
                    "authcode": $.authcode,
                    "token": $.token2
                };
                C = a3;
            } else {
                if ($.api === "addProductToCart") {
                    const a5 = {
                        "api": $.api,
                        "skuList": $.advalue,
                        "taskId": $.adsID,
                        "fromAd": $.adUuid,
                        "id": $.pltId,
                        "activeid": "A_112790_R_1_D_20201028",
                        "activeId": "A_112790_R_1_D_20201028",
                        "authcode": $.authcode,
                        "token": $.token2
                    };
                    C = a5;
                } else {
                    if ($.api === "followSku") {
                        const a7 = {
                            "api": $.api,
                            "skuId": $.advalue,
                            "taskId": $.adsID,
                            "fromAd": $.adUuid,
                            "id": $.pltId,
                            "activeid": "A_112790_R_1_D_20201028",
                            "activeId": "A_112790_R_1_D_20201028",
                            "authcode": $.authcode,
                            "token": $.token2
                        };
                        C = a7;
                    }
                }
            }
            break;
        case "finishAd":
            url = "https://jd.moxigame.cn/platform/active/role/finishAd";
            const a0 = {
                "adUuid": $.adUuid,
                "source": "shuangbei",
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authcode,
                "token": $.token2
            };
            C = a0;
            break;
        case "getAdInfo":
            url = "https://jd.moxigame.cn/platform/active/jingdong/getAdInfo";
            const a1 = {
                "id": $.pltId,
                "activeid": "A_112790_R_1_D_20201028",
                "activeId": "A_112790_R_1_D_20201028",
                "authcode": $.authcode,
                "token": $.token2
            };
            C = a1;
            break;
        default:
            console.log("错误" + B);
    }
    if (C && C.token && B !== "login" && B !== "inviter") {
        let a9 = C.token == $.datalist.loginToken ? 1 : 2,
            aa = b1(16);
        C = {
            "__data__": b5(C, aa, a9),
            "__iv__": aa,
            "__id__": a9 == 1 ? $.datalist.pltId : $.datalist.gameId
        };
        $._id_ = C.__id__;
    }
    let G = b0(url, C, F);
    return new Promise(async ab => {
        $.post(G, (ae, af, ag) => {
            try {
                if (ae) {
                    if (af && af.statusCode && af.statusCode == 493) {
                        console.log("此ip已被限制，请过10分钟后再执行脚本");
                        $.outFlag = true;
                    }
                    console.log("" + $.toStr(ae, ae));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    ag = aZ(B, ag);
                }
            } catch (ao) {
                console.log(ao, af);
            } finally {
                ab(ag);
            }
        });
    });
}
async function aZ(a, b) {
    let g = "";
    try {
        if (b) {
            g = JSON.parse(b);
            if (g.__data__) {
                let i = $._id_ == $.datalist.gameId ? 4 : 3,
                    j = b5(g, g.__iv__, i);
                g = JSON.parse(j);
            }
        }
    } catch (m) {
        console.log(a + " 执行任务异常");
        $.runFalag = false;
    }
    try {
        switch (a) {
            case "token":
                if (typeof g == "object") {
                    if (g.success) {
                        if (typeof g.data != "undefined") {
                            $.Token = g.data;
                        }
                    } else {
                        if (g.errorMessage) {
                            console.log("token " + g.errorMessage);
                        } else {
                            console.log(b);
                        }
                    }
                } else {
                    console.log(b);
                }
                break;
            case "lkToken":
                if (typeof g == "object") {
                    if (g.success && g.data) {
                        $.lkToken = g.data.lkToken;
                    } else {
                        g.message ? console.log(a + " " + g.message) : console.log(b);
                    }
                } else {
                    console.log(b);
                }
                break;
            case "login":
                if (typeof g == "object") {
                    if (g.code === 0) {
                        $.info = g.info;
                        $.token2 = g.token;
                        $.authCode = g.authcode;
                        $.pltId = g.info.pltId;
                        $.starnum = JSON.parse(g.info.platform).money;
                        $.invitercode.push($.pltId);
                    } else {
                        console.log(b);
                    }
                } else {
                    console.log(b);
                }
                break;
            case "logincheck":
                if (typeof g == "object") {
                    if (g.code === 0) {
                        $.gameId = g.role.gameId;
                        $.token3 = g.token;
                        $.failCount = g.role.gameInfo.failCount;
                        $.guideId = g.role.gameInfo.guideId;
                        $.Maxlevel = g.role.allLevels.pop();
                        $.curLevelId = g.role.gameInfo.levelId;
                        $.drawLevelStart = g.draw.drawLevelStart;
                        $.drawInterval = g.draw.drawInterval;
                        $.datalist = {
                            "gameId": $.gameId,
                            "token": $.token3,
                            "enc": $.token3.slice(8, 16) + $.token3.slice(24, 32),
                            "dec": aN.MD5($.gameId).toString().slice(0, 16),
                            "loginToken": $.token2,
                            "pltId": $.pltId,
                            "loginEnc": $.token2.slice(8, 16) + $.token2.slice(24, 32),
                            "loginDec": aN.MD5($.pltId).toString().slice(0, 16),
                            "authCode": $.authCode
                        };
                    } else {
                        console.log(b);
                    }
                } else {
                    console.log(b);
                }
                break;
            case "inviter":
                if (typeof g == "object") {
                    let N = g.invitinfo.type;
                    $.token2 = g.token;
                    $.authCode = g.authcode;
                    $.pltId = g.info.pltId;
                    if (N == "overflow") {
                        $.full = true;
                        console.log("助力已用尽！");
                    } else {
                        if (N == "new") {
                            console.log("助力成功！");
                        } else {
                            if (N == "repeat") {
                                console.log("已经助力过TA了！");
                            } else {
                                N == "none" && console.log("不能助力自己！");
                            }
                        }
                    }
                } else {
                    console.log(g);
                }
                break;
            case "marketgoods":
                if (typeof g == "object") {
                    if (g.code === 0) {
                        $.goodlist = g.list;
                    }
                } else {
                    console.log(b);
                }
                break;
            case "finishAd":
                if (typeof g == "object") {
                    if (g.code === 0) {
                        $.adward = g.award;
                        if ($.adward.pools.length > 1) {
                            console.log("翻倍奖励，额外获得" + $.adward.item[0].count + "张抽奖券、" + $.adward.item[1].count + "个星星");
                        } else {
                            if ($.adward.pools[0] === "X028") {
                                console.log("翻倍奖励，额外获得" + $.adward.item[0].count + "个星星");
                            } else {
                                console.log("翻倍奖励，额外获得" + $.adward.item[0].count + "张抽奖券");
                            }
                        }
                    }
                } else {
                    console.log(b);
                }
                break;
            case "endLevel":
                if (typeof g == "object") {
                    if (g.code === 0) {
                        $.api = "";
                        $.adflag = false;
                        $.cjq = "";
                        $.endgameAward = g.gameAward;
                        console.log("游戏完成：");
                        console.log("获得体力：" + ($.endgameAward[8003] || 0) + ", 获得星星：" + ($.endgameAward[11001] || 0));
                        if (g.platAward && g.platAward.length) {
                            $.cjq = g.platAward[0]?.["count"];
                            $.log("获得抽奖券：" + $.cjq);
                        }
                        if (g.platAd) {
                            $.adflag = true;
                            $.adUuid = g.platAd.uuid;
                            $.adsID = g.platAd.adRes.sID;
                            if ($.adsID === "G1112") {
                                $.api = "followSku";
                            } else {
                                if ($.adsID === "G1114") {
                                    $.api = "followShop";
                                } else {
                                    $.adsID === "G1115" && ($.api = "addProductToCart");
                                }
                            }
                            $.advalue = g.platAd.adRes.sValue;
                        }
                    }
                    return g;
                } else {
                    console.log(b);
                }
                break;
            case "sendGameAward":
                if (typeof g == "object") {
                    if (g.success && g.data) {
                        console.log("游戏完成，获得" + $.point.point + "能量!");
                    } else {
                        g.message ? console.log(a + " " + g.message) : console.log(b);
                    }
                } else {
                    console.log(b);
                }
                break;
            case "accessLogWithAD":
            case "drawContent":
                break;
            case "specialSign":
            case "activity_load":
            case "setMixNick":
            case "followShop":
            case "doTask":
            case "addCart":
            case "missionInviteList":
            case "绑定":
            case "助力":
                let p = "";
                if (a == "followShop") {
                    p = "关注";
                }
                if (a == "addCart") {
                    p = "加购";
                }
                if (a == "specialSign") {
                    p = "签到";
                }
                if (typeof g == "object") {
                    if (g.success && g.success === true && g.data) {
                        if (g.data.status && g.data.status == 200) {
                            g = g.data;
                            a != "setMixNick" && (g.msg || g.data.remark) && console.log((p && p + ":" || "") + (g.msg || g.data.isOpenCard || g.data.remark || ""));
                            if (a == "activity_load") {
                                g.data && ($.MixNick = g.data.missionCustomer.buyerNick || "", $.hasCollectShop = g.data.missionCustomer.hasCollectShop || 0, $.totalPoint = g.data.missionCustomer.totalPoint || 0, $.remainChance = g.data.missionCustomer.remainChance || 0);
                            } else {
                                a == "missionInviteList" && console.log("本月已邀请助力(" + g.data.total + ")");
                            }
                        } else {
                            if (g.data.msg) {
                                console.log(g.data.msg);
                            } else {
                                g.errorMessage ? console.log(a + " " + g.errorMessage) : console.log(b);
                            }
                        }
                    } else {
                        g.errorMessage ? console.log(a + " " + g.errorMessage) : console.log(b);
                    }
                } else {
                    console.log(b);
                }
                break;
            default:
                return g;
        }
    } catch (ad) {
        console.log(ad);
    }
}
function b0(e, f, g = "POST") {
    const j = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Cookie": aR,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
    };
    e.indexOf("moxigame") > -1 && (j.Origin = "https://game-cdn.moxigame.cn", delete j.Cookie);
    return {
        "url": e,
        "method": g,
        "headers": j,
        "body": JSON.stringify(f),
        "timeout": 30000
    };
}
function b1(f) {
    f = f || 32;
    let j = "abcdef0123456789",
        k = j.length,
        l = "";
    for (let m = 0; m < f; m++) {
        l += j.charAt(Math.floor(Math.random() * k));
    }
    return l;
}
function b2(b, e) {
    var h = Math.floor(Math.random() * (e - b + 1) + b);
    return h;
}
function b3(f) {
    if (typeof f == "string") {
        try {
            return JSON.parse(f);
        } catch (j) {
            console.log(j);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
async function b4() {
    $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + b1(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function b5(b, e, f) {
    (f == 1 || f == 2) && typeof b == "object" && (b = JSON.stringify(b));
    switch (f) {
        case 1:
            var i = $.datalist.loginEnc;
            break;
        case 2:
            var i = $.datalist.enc;
            break;
        case 3:
            var i = $.datalist.loginDec;
            break;
        case 4:
            var i = $.datalist.dec;
            break;
    }
    if (!b.__data__) {
        var j = aN.AES.encrypt(b, aN.enc.Utf8.parse(i), {
            "iv": aN.enc.Utf8.parse(e),
            "mode": aN.mode.CBC,
            "padding": aN.pad.Pkcs7
        }),
            k = j.toString();
        return k;
    } else {
        var l = aN.AES.decrypt(b.__data__, aN.enc.Utf8.parse(i), {
            "iv": aN.enc.Utf8.parse(e),
            "mode": aN.mode.CBC,
            "padding": aN.pad.Pkcs7
        }),
            m = l.toString(aN.enc.Utf8);
        return m.toString();
    }
}
function b6(b, e) {
    var h = b.slice(0),
        i = b.length,
        j = i - e,
        k,
        l;
    while (i-- > j) {
        l = Math.floor((i + 1) * Math.random());
        k = h[l];
        h[l] = h[i];
        h[i] = k;
    }
    return h.slice(j);
}