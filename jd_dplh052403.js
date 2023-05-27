/*
大牌联合052403期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023052403aab/oC2023052403aab?actId=27f28c36a56044d3_23052403

自行运行，有水无水自测。

变量填写：
黑名单 用&隔开 pin值
//export DPLHTY_blacklist="" 
重试次数，默认30
//export retrynum="30"
如需修改抽奖次数请设置环境变量：
//export opencard_draw="3" //次数

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码
============Quantumultx===============
[task_local]
#大牌联合052403期
1 1 1 1 * jd_dplh052403.js, tag=大牌联合052403期, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("大牌联合052403期");
const IIl1IiiI = $.isNode() ? require("./jdCookie.js") : "",
    Il1iii1i = $.isNode() ? require("./sendNotify") : "";
let ili1I1II = [],
    I1l1i11 = "";
if ($.isNode()) {
    Object.keys(IIl1IiiI).forEach(iII11lil => {
        ili1I1II.push(IIl1IiiI[iII11lil]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else ili1I1II = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIIIllIl($.getdata("CookiesJD") || "[]").map(IIIII1ii => IIIII1ii.cookie)].filter(iIilIi1 => !!iIilIi1);
let Ili111II = "30",
    Ilili1l = "0";
Ili111II = $.isNode() ? process.env.retrynum ? process.env.retrynum : Ili111II : $.getdata("retrynum") ? $.getdata("retrynum") : Ilili1l;
Ilili1l = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : Ilili1l : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : Ilili1l;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iI1l11Il = "",
    illlliIi = "",
    lI1l11l = "27f28c36a56044d3_23052403";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const lllIl1iI = require("./function/krgetToken"),
    iI1lllIl = require("./function/krh5st");
let IIlIli1I = "https://jinggengjcq-isv.isvjcloud.com";
illlliIi = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + illlliIi : $.getdata("helpnum") ? $.getdata("helpnum") : "" + illlliIi;
let l1IiIllI = "",
    I11ilil = "";
$.whitelist = process.env.DPLHTY_whitelist || l1IiIllI;
$.blacklist = process.env.DPLHTY_blacklist || I11ilil;
IiIiiili();
lIli1Ii();
!(async () => {
    authorCodeList = await i1IiI1i("http://code.kingran.ga/dplh.json");
    $.authorCode = illlliIi ? illlliIi : authorCodeList[ilIi1Iil(0, authorCodeList.length)];
    console.log("\n💬 当前ID：" + lI1l11l);
    console.log("\n💬 默认抽奖次数：" + Ilili1l + " 💬 重试次数：" + Ili111II);
    console.log("\n💬 请在有水的情况下运行");
    if (!ili1I1II[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    $.appkey = "94854284";
    $.userId = "10299171";
    $.actId = lI1l11l;
    $.MixNicks = "";
    $.inviteNick = $.authorCode;
    for (let I1IIIiiI = 0; I1IIIiiI < ili1I1II.length; I1IIIiiI++) {
        I1l1i11 = ili1I1II[I1IIIiiI];
        if (I1l1i11) {
            $.UserName = decodeURIComponent(I1l1i11.match(/pt_pin=([^; ]+)(?=;?)/) && I1l1i11.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = I1IIIiiI + 1;
            message = "";
            $.bean = 0;
            $.hotFlag = false;
            $.nickName = "";
            $.UA = await liIi1I11();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            await i1IIllli();
            await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
            if ($.outFlag || $.activityEnd) break;
        }
    }
    if ($.outFlag) {
        let iIlI1lli = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + iIlI1lli);
        if ($.isNode()) await Il1iii1i.sendNotify("" + $.name, "" + iIlI1lli);
    }
})().catch(lllIlill => $.logErr(lllIlill)).finally(() => $.done());
async function i1IIllli() {
    try {
        $.hasEnd = true;
        $.outEnd = false;
        $.retry = false;
        $.krretry = false;
        $.krFlag = false;
        $.endTime = 0;
        iI1l11Il = "";
        $.Token = "";
        $.Pin = "";
        $.MixNick = "";
        if ($.activityEnd) return;
        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }
        $.Token = await lllIl1iI(I1l1i11, IIlIli1I);
        if ($.Token == "") {
            console.log("❌ 获取TOKEN失败");
            return;
        }
        await lliIli1("activity_load");
        for (let i1iIiii1 = 0; i1iIiii1 < Ili111II; i1iIiii1++) {
            if ($.retry || $.krretry) {
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await lliIli1("activity_load");
                if ($.krFlag) break;
            }
        }
        if ($.hotFlag) return;
        if ($.MixNick == "") {
            console.log("❌ 获取[活动信息]失败，可能是黑号或者太卡了");
            return;
        }
        $.toBind = 0;
        $.openList = [];
        await lliIli1("绑定");
        for (let i1I1IIi1 = 0; i1I1IIi1 < Ili111II; i1I1IIi1++) {
            if ($.retry || $.krretry) {
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await lliIli1("绑定");
                if ($.krFlag) break;
            }
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        await lliIli1("shopList");
        for (let lII1lIlI = 0; lII1lIlI < Ili111II; lII1lIlI++) {
            if ($.retry || $.krretry) {
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await lliIli1("shopList");
                if ($.krFlag) break;
            }
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        if ($.activityEnd) return;
        for (o of $.openList) {
            $.missionType = "openCard";
            if (o.open != true && o.openCardUrl) {
                if ($.activityEnd) return;
                if ($.outEnd) return;
                $.openCard = false;
                $.joinVenderId = o.userId;
                await lliIli1("mission");
                for (let iIIIllli = 0; iIIIllli < Ili111II; iIIIllli++) {
                    if ($.retry || $.krretry) {
                        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                        await lliIli1("mission");
                        if ($.krFlag) break;
                    }
                }
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                if ($.openCard == true) {
                    $.errorJoinShop = "";
                    await lii1Ii11();
                    await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
                    if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
                        return;
                    }
                    $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await lii1Ii11(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                    if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                        console.log("💔 无法开卡,跳过运行");
                        return;
                    }
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await lliIli1("activity_load");
                    for (let Iil1liIi = 0; Iil1liIi < Ili111II; Iil1liIi++) {
                        if ($.retry || $.krretry) {
                            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                            await lliIli1("activity_load");
                            if ($.krFlag) break;
                        }
                    }
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await lliIli1("shopList");
                    for (let llIiI1li = 0; llIiI1li < Ili111II; llIiI1li++) {
                        if ($.retry || $.krretry) {
                            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                            await lliIli1("shopList");
                            if ($.krFlag) break;
                        }
                    }
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                }
            }
        }
        if ($.hasCollectShop === 0) {
            $.missionType = "uniteCollectShop";
            await lliIli1("mission");
            for (let ii1iIi1I = 0; ii1iIi1I < Ili111II; ii1iIi1I++) {
                if ($.retry || $.krretry) {
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await lliIli1("mission");
                    if ($.krFlag) break;
                }
            }
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        } else console.log("💔 呜呜呜，已完成关注任务");
        if ($.hasAddCart === 0) {
            $.missionType = "uniteAddCart";
            await lliIli1("mission");
            for (let iiii1i1l = 0; iiii1i1l < Ili111II; iiii1i1l++) {
                if ($.retry || $.krretry) {
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await lliIli1("mission");
                    if ($.krFlag) break;
                }
            }
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        } else {
            console.log("💔 呜呜呜，已完成加购任务");
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if (Ilili1l + "" !== "0") {
            $.runFalag = true;
            let li1iIll = parseInt($.totalPoint / 200);
            Ilili1l = parseInt(Ilili1l, 10);
            if (li1iIll > Ilili1l) li1iIll = Ilili1l;
            console.log("💖 抽奖次数为:" + li1iIll);
            for (m = 1; li1iIll--; m++) {
                console.log("🌐 第" + m + "次抽奖");
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await lliIli1("抽奖");
                for (let l11II1iI = 0; l11II1iI < Ili111II; l11II1iI++) {
                    if ($.retry || $.krretry) {
                        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                        await lliIli1("抽奖");
                        if ($.krFlag) break;
                    }
                }
                if ($.runFalag == false) break;
                if (Number(li1iIll) <= 0) break;
                if (m >= 10) {
                    console.log("💔 抽奖太多次，多余的次数请再执行脚本");
                    break;
                }
                await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
            }
        } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
        console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
        $.index == 1 && ($.inviteNick = $.MixNick, console.log("🔊 后面的号都会助力:" + $.inviteNick));
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    } catch (i1Illi) {
        console.log(i1Illi);
    }
}
async function lliIli1(ll11Iiii) {
    if ($.outFlag) return;
    let lili111I = "https://jinggengjcq-isv.isvjcloud.com",
        iii11II1 = "",
        lI1iiliI = "POST",
        ll1ilii1 = "";
    switch (ll11Iiii) {
        case "activity_load":
            url = lili111I + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            ll1ilii1 = {
                "jdToken": $.Token,
                "source": "01",
                "inviteNick": $.inviteNick || ""
            };
            if ($.joinVenderId) ll1ilii1 = {
                ...ll1ilii1,
                "shopId": "" + $.joinVenderId
            };
            iii11II1 = lIiiil1i("/jdBigAlliance/activity/load", ll1ilii1);
            break;
        case "shopList":
            url = lili111I + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            ll1ilii1 = {};
            iii11II1 = lIiiil1i("/jdBigAlliance/shop/shopList", ll1ilii1);
            break;
        case "绑定":
            url = lili111I + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            ll1ilii1 = {
                "inviterNick": $.inviteNick || ""
            };
            iii11II1 = lIiiil1i("/jdBigAlliance/customer/inviteRelation", ll1ilii1);
            break;
        case "mission":
            url = lili111I + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            ll1ilii1 = {
                "missionType": $.missionType
            };
            if ($.joinVenderId) ll1ilii1 = {
                ...ll1ilii1,
                "shopId": $.joinVenderId
            };
            iii11II1 = lIiiil1i("/jdBigAlliance/mission/completeMission", ll1ilii1);
            break;
        case "抽奖":
            url = lili111I + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            ll1ilii1 = {
                "dataType": "draw",
                "usedGameNum": "2"
            };
            iii11II1 = lIiiil1i("/jdBigAlliance/interactive/drawPost", ll1ilii1);
            break;
        default:
            console.log("错误" + ll11Iiii);
    }
    let I1iiIi1 = IlIIIi11(url, iii11II1, lI1iiliI);
    return new Promise(async ii1li => {
        $.post(I1iiIi1, (IIIlIiiI, l11llIIi, Ii1i1ill) => {
            try {
                IIIlIiiI ? (l11llIIi && l11llIIi.statusCode && l11llIIi.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : II1iil11(ll11Iiii, Ii1i1ill);
            } catch (l11I111) {
                console.log(l11I111, l11llIIi);
            } finally {
                ii1li();
            }
        });
    });
}
async function II1iil11(liIiiii1, IlilIlIi) {
    let lli1lll1 = "";
    try {
        $.krFlag = true;
        (liIiiii1 != "accessLogWithAD" || liIiiii1 != "drawContent") && IlilIlIi && (lli1lll1 = JSON.parse(IlilIlIi));
    } catch (IliII1I) {
        console.log("🤬 " + liIiiii1 + " 数据异常");
        $.krretry = true;
        $.runFalag = false;
    }
    try {
        let ii1II = "";
        switch (liIiiii1) {
            case "抽奖":
                if (typeof lli1lll1 == "object") {
                    if (lli1lll1.success && lli1lll1.success === true && lli1lll1.data) {
                        if (lli1lll1.data.status && lli1lll1.data.status == 200) {
                            if (lli1lll1.data.data.sendResult) console.log("抽中：" + lli1lll1.data.data.awardSetting.awardName); else !lli1lll1.data.data.result ? console.log("空气") : console.log(lli1lll1.data.data);
                        } else lli1lll1.data.status && lli1lll1.data.status == 500 && console.log("" + (lli1lll1.data.msg || ""));
                    } else lli1lll1.message ? console.log("" + (lli1lll1.message || "")) : console.log(IlilIlIi);
                } else {
                    console.log(IlilIlIi);
                }
                break;
            case "accessLogWithAD":
            case "drawContent":
                break;
            case "activity_load":
            case "mission":
            case "shopList":
            case "loadUniteOpenCard":
            case "setMixNick":
            case "uniteOpenCardOne":
            case "checkOpenCard":
            case "followShop":
            case "addCart":
            case "myAward":
            case "missionInviteList":
            case "绑定":
                ii1II = "";
                if (liIiiii1 == "followShop") ii1II = "关注";
                if (liIiiii1 == "addCart") ii1II = "加购";
                if (typeof lli1lll1 == "object") {
                    if (lli1lll1.success && lli1lll1.success === true && lli1lll1.data) {
                        if (lli1lll1.data.status && lli1lll1.data.status == 200) {
                            lli1lll1 = lli1lll1.data;
                            if (liIiiii1 != "setMixNick" && (lli1lll1.msg || lli1lll1.data.isOpenCard || lli1lll1.data.remark)) console.log("🔊 " + (ii1II && ii1II + ":" || "") + (lli1lll1.msg || lli1lll1.data.isOpenCard || lli1lll1.data.remark || ""));
                            if (liIiiii1 == "activity_load") {
                                if (lli1lll1.msg || lli1lll1.data.isOpenCard) {
                                    if ((lli1lll1.msg || lli1lll1.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                                }
                                lli1lll1.data && ($.endTime = lli1lll1.data.cusActivity.endTime || 0, $.MixNick = lli1lll1.data.missionCustomer.buyerNick || "", $.usedChance = lli1lll1.data.missionCustomer.usedChance || 0, $.totalPoint = lli1lll1.data.missionCustomer.totalPoint || 0, $.hasCollectShop = lli1lll1.data.missionCustomer.hasCollectShop || 0, $.hasAddCart = lli1lll1.data.missionCustomer.hasAddCart || 0);
                            } else {
                                if (liIiiii1 == "shopList") $.openList = lli1lll1.data || []; else {
                                    if (liIiiii1 == "mission") lli1lll1.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false; else {
                                        if (liIiiii1 == "uniteOpenCardOne") $.uniteOpenCar = lli1lll1.msg || lli1lll1.data.msg || ""; else {
                                            if (liIiiii1 == "myAward") {
                                                console.log("🔊 我的奖品：");
                                                let l111iIli = 0;
                                                for (let IIlIIil in lli1lll1.data.list || []) {
                                                    let iIlii1l1 = lli1lll1.data.list[IIlIIil];
                                                    l111iIli += Number(iIlii1l1.awardDes);
                                                }
                                                if (l111iIli > 0) console.log("🔊 共获得" + l111iIli + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                                            } else liIiiii1 == "missionInviteList" && console.log("🔊 邀请人数(" + lli1lll1.data.invitedLogList.total + ")");
                                        }
                                    }
                                }
                            }
                        } else {
                            if (lli1lll1.data.msg) {
                                lli1lll1.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                                console.log("🔊 " + (lli1lll1.data.msg || ""));
                            } else {
                                if (lli1lll1.errorMessage) {
                                    if (lli1lll1.errorMessage.indexOf("火爆") > -1) { }
                                    console.log("🔊 " + (lli1lll1.errorMessage || ""));
                                } else console.log("" + IlilIlIi);
                            }
                        }
                    } else lli1lll1.errorMessage ? console.log("🔊 " + (lli1lll1.errorMessage || "")) : console.log("" + IlilIlIi);
                } else { }
                break;
            default:
                console.log((ii1II || liIiiii1) + "-> " + IlilIlIi);
        }
        if (typeof lli1lll1 == "object") {
            if (lli1lll1.errorMessage) {
                if (lli1lll1.errorMessage.indexOf("火爆") > -1) { }
            }
        }
    } catch (lll1llI) { }
}
function IlIIIi11(iI1llll1, lI1i1iI, i11ii1i1 = "POST") {
    let i1Iiii11 = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": I1l1i11,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
    };
    return iI1llll1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (i1Iiii11.Origin = "https://jinggengjcq-isv.isvjcloud.com", i1Iiii11["Content-Type"] = "application/json; charset=utf-8", delete i1Iiii11.Cookie), {
        "url": iI1llll1,
        "method": i11ii1i1,
        "headers": i1Iiii11,
        "body": lI1i1iI,
        "timeout": 30 * 1000
    };
}
function lIiiil1i(IiiIiIi, iIiIl111) {
    d = {
        "actId": $.actId,
        ...iIiIl111,
        "method": IiiIiIi,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
    };
    sign2 = IlIiIllI(d);
    const iliII1iI = {
        "jsonRpc": "2.0",
        "params": {
            "commonParameter": {
                "appkey": $.appkey,
                "m": "POST",
                "oba": sign2.sign,
                "timestamp": sign2.timeStamp,
                "userId": $.userId
            },
            "admJson": {
                "actId": $.actId,
                ...iIiIl111,
                "method": IiiIiIi,
                "userId": $.userId,
                "buyerNick": $.MixNick || ""
            }
        }
    };
    return IiiIiIi.indexOf("missionInviteList") > -1 && delete iliII1iI.params.admJson.actId, $.toStr(iliII1iI, iliII1iI);
}
function ilIi1Iil(l11il1, i1iI111l) {
    return Math.floor(Math.random() * (i1iI111l - l11il1)) + l11il1;
}
function IlIiIllI(lIIIIlI1) {
    AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
    key = "c1614da9ac68";
    time2 = new Date().valueOf();
    s2 = encodeURIComponent(JSON.stringify(lIIIIlI1));
    c = new RegExp("'", "g");
    A = new RegExp("~", "g");
    s2 = s2.replace(c, "%27");
    s2 = s2.replace(A, "%7E");
    signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret;
    sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
    return {
        "sign": sign,
        "timeStamp": time2
    };
}
async function liIi1I11() {
    id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
    CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
    const i1IIIlIi = CryptoJS.enc.Utf8.parse(id),
        iliIIiII = CryptoJS.enc.Base64.stringify(i1IIIlIi);
    return ep = encodeURIComponent(JSON.stringify({
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": new Date().getTime(),
        "ridx": -1,
        "cipher": {
            "sv": "EG==",
            "ad": iliIIiII,
            "od": "",
            "ov": "Ctq=",
            "ud": iliIIiII
        },
        "ciphertype": 5,
        "version": "1.2.0",
        "appname": "com.jingdong.app.mall"
    })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function Ii1il1ii(I1iIIl1) {
    I1iIIl1 = I1iIIl1 || 32;
    let llIIIi1l = "abcdef0123456789",
        iI1l1il1 = llIIIi1l.length,
        llII11lI = "";
    for (i = 0; i < I1iIIl1; i++) llII11lI += llIIIi1l.charAt(Math.floor(Math.random() * iI1l1il1));
    return llII11lI;
}
function IIIIllIl(iiliIiiI) {
    if (typeof iiliIiiI == "string") try {
        return JSON.parse(iiliIiiI);
    } catch (i11ill11) {
        return console.log(i11ill11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
async function lii1Ii11() {
    if (!$.joinVenderId) return;
    return new Promise(async liIl1lIi => {
        $.errorJoinShop = "活动太火爆，请稍后再试";
        let il1lli1I = "";
        if ($.shopactivityId) il1lli1I = ",\"activityId\":" + $.shopactivityId;
        const lilIIlll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + il1lli1I + ",\"channel\":406}",
            I1lilii = {
                "appid": "jd_shop_member",
                "functionId": "bindWithVender",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": JSON.parse(lilIIlll)
            };
        for (var lill1li = "", il111iI = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", Ii11llIl = 0; Ii11llIl < 16; Ii11llIl++) {
            var IiIII1ll = Math.round(Math.random() * (il111iI.length - 1));
            lill1li += il111iI.substring(IiIII1ll, IiIII1ll + 1);
        }
        uuid = Buffer.from(lill1li, "utf8").toString("base64");
        ep = encodeURIComponent(JSON.stringify({
            "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
            "ts": new Date().getTime(),
            "ridx": -1,
            "cipher": {
                "screen": "CJS0CseyCtK4",
                "osVersion": "CJGkEK==",
                "uuid": uuid
            },
            "ciphertype": 5,
            "version": "1.0.3",
            "appname": "com.360buy.jdmobile"
        }));
        const iii1l1Il = await iI1lllIl("8adfb", I1lilii),
            Ili1Il1i = {
                "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lilIIlll + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iii1l1Il),
                "headers": {
                    "accept": "*/*",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cookie": I1l1i11,
                    "origin": "https://shopmember.m.jd.com/",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
                }
            };
        $.get(Ili1Il1i, async (iiIIliIl, ll1liI1l, Ii1l11I1) => {
            try {
                if (iiIIliIl) ll1liI1l && typeof ll1liI1l.statusCode != "undefined" && ll1liI1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n"); else {
                    Ii1l11I1 = Ii1l11I1 && Ii1l11I1.match(/jsonp_.*?\((.*?)\);/) && Ii1l11I1.match(/jsonp_.*?\((.*?)\);/)[1] || Ii1l11I1;
                    let iiI1I1i = $.toObj(Ii1l11I1, Ii1l11I1);
                    if (iiI1I1i && typeof iiI1I1i == "object") {
                        if (iiI1I1i && iiI1I1i.success === true) {
                            console.log(" >> " + iiI1I1i.message);
                            $.errorJoinShop = iiI1I1i.message;
                            if (iiI1I1i.result && iiI1I1i.result.giftInfo) {
                                for (let llIIi1ll of iiI1I1i.result.giftInfo.giftList) {
                                    console.log(" >> 入会获得：" + llIIi1ll.discountString + llIIi1ll.prizeName + llIIi1ll.secondLineDesc);
                                }
                            }
                        } else iiI1I1i && typeof iiI1I1i == "object" && iiI1I1i.message ? ($.errorJoinShop = iiI1I1i.message, console.log("" + (iiI1I1i.message || ""))) : console.log(Ii1l11I1);
                    } else console.log(Ii1l11I1);
                }
            } catch (II1Il1l) {
                $.logErr(II1Il1l, ll1liI1l);
            } finally {
                liIl1lIi();
            }
        });
    });
}
async function liliI1il() {
    return new Promise(async lIlI1Ili => {
        const IIllIiil = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
            II1llI1 = {
                "appid": "jd_shop_member",
                "functionId": "bindWithVender",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": JSON.parse(IIllIiil)
            };
        await $.wait(1000);
        const iIIllIll = await iI1lllIl("8adfb", II1llI1),
            illilI1i = {
                "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IIllIiil + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIIllIll),
                "headers": {
                    "accept": "*/*",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cookie": I1l1i11,
                    "origin": "https://shopmember.m.jd.com/",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
                }
            };
        $.get(illilI1i, async (IiiIiiil, illli1Il, i11lIIll) => {
            try {
                if (IiiIiiil) {
                    if (illli1Il && typeof illli1Il.statusCode != "undefined") {
                        illli1Il.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
                    }
                } else {
                    i11lIIll = i11lIIll && i11lIIll.match(/jsonp_.*?\((.*?)\);/) && i11lIIll.match(/jsonp_.*?\((.*?)\);/)[1] || i11lIIll;
                    let illl1Il = $.toObj(i11lIIll, i11lIIll);
                    illl1Il && typeof illl1Il == "object" ? illl1Il && illl1Il.success == true && (console.log("去加入：" + (illl1Il.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = illl1Il.result.interestsRuleList && illl1Il.result.interestsRuleList[0] && illl1Il.result.interestsRuleList[0].interestsInfo && illl1Il.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(i11lIIll);
                }
            } catch (ll11lIII) {
                $.logErr(ll11lIII, illli1Il);
            } finally {
                lIlI1Ili();
            }
        });
    });
}
function i1IiI1i(IlIIii1l) {
    return new Promise(liIi1ii1 => {
        const IIl1ii1I = {
            "url": IlIIii1l + "?" + new Date(),
            "timeout": 10000,
            "headers": {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(IIl1ii1I, async (il1II1Ii, lI11I11, i1iII11I) => {
            try {
                if (il1II1Ii) $.getAuthorCodeListerr = false; else {
                    if (i1iII11I) i1iII11I = JSON.parse(i1iII11I);
                    $.getAuthorCodeListerr = true;
                }
            } catch (lIi1lII) {
                $.logErr(lIi1lII, lI11I11);
                i1iII11I = null;
            } finally {
                liIi1ii1(i1iII11I);
            }
        });
    });
}
function ilIi1Iil(iii11il1, Ii1liiil) {
    return Math.floor(Math.random() * (Ii1liiil - iii11il1)) + iii11il1;
}
function lIli1Ii() {
    if ($.blacklist == "") return;
    console.log("当前已设置黑名单：");
    const I1iiI1il = Array.from(new Set($.blacklist.split("&")));
    console.log(I1iiI1il.join("&") + "\n");
    let lll1l111 = I1iiI1il,
        IilIlIi1 = [],
        IlIi1i1 = false;
    for (let I1llIiI1 = 0; I1llIiI1 < ili1I1II.length; I1llIiI1++) {
        let ii1llI1 = decodeURIComponent(ili1I1II[I1llIiI1].match(/pt_pin=([^; ]+)(?=;?)/) && ili1I1II[I1llIiI1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
        if (!ii1llI1) break;
        let iiIill1i = false;
        for (let Ii1l11Ii of lll1l111) {
            if (Ii1l11Ii && Ii1l11Ii == ii1llI1) {
                iiIill1i = true;
                break;
            }
        }
        !iiIill1i && (IlIi1i1 = true, IilIlIi1.splice(I1llIiI1, -1, ili1I1II[I1llIiI1]));
    }
    if (IlIi1i1) ili1I1II = IilIlIi1;
}
function li1iiIi(iil11llI, Il11ll1) {
    Il11ll1 != 0 && iil11llI.unshift(iil11llI.splice(Il11ll1, 1)[0]);
}
function IiIiiili() {
    if ($.whitelist == "") {
        helpCookiesArr = $.toObj($.toStr(ili1I1II, ili1I1II));
        return;
    }
    console.log("当前已设置白名单：");
    const I1iIilI1 = Array.from(new Set($.whitelist.split("&")));
    console.log(I1iIilI1.join("&") + "\n");
    let lI11iiII = [],
        IIill111 = I1iIilI1;
    for (let ll1lIilI in ili1I1II) {
        let lli1I1II = decodeURIComponent(ili1I1II[ll1lIilI].match(/pt_pin=([^; ]+)(?=;?)/) && ili1I1II[ll1lIilI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
        IIill111.includes(lli1I1II) && lI11iiII.push(ili1I1II[ll1lIilI]);
    }
    helpCookiesArr = lI11iiII;
    if (IIill111.length > 1) for (let I11lli11 in IIill111) {
        let IllIlII1 = IIill111[IIill111.length - 1 - I11lli11];
        if (!IllIlII1) continue;
        for (let I1Ii11ii in helpCookiesArr) {
            let IIII1i1I = decodeURIComponent(helpCookiesArr[I1Ii11ii].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[I1Ii11ii].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            if (IllIlII1 == IIII1i1I) {
                li1iiIi(helpCookiesArr, I1Ii11ii);
            }
        }
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }