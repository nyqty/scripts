/*
大牌联合052401期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023052401aab/oC2023052401aab?actId=9357f32e672c484582fc6c3fd5a_23052401

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
#大牌联合052401期
1 1 1 1 * jd_dplh052401.js, tag=大牌联合052401期, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("大牌联合052401期");
const II11i1iI = $.isNode() ? require("./jdCookie.js") : "",
    l1iIil11 = $.isNode() ? require("./sendNotify") : "";
let lliiIi1 = [],
    i1IliiI = "";
if ($.isNode()) {
    Object.keys(II11i1iI).forEach(Iliii1l1 => {
        lliiIi1.push(II11i1iI[Iliii1l1]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else lliiIi1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1I1iil1($.getdata("CookiesJD") || "[]").map(lIiliIII => lIiliIII.cookie)].filter(IlliII1I => !!IlliII1I);
let illIl11i = "30",
    ii1iIIl = "0";
illIl11i = $.isNode() ? process.env.retrynum ? process.env.retrynum : illIl11i : $.getdata("retrynum") ? $.getdata("retrynum") : ii1iIIl;
ii1iIIl = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : ii1iIIl : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : ii1iIIl;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iIliIIII = "",
    illi1liI = "",
    II1Il1I1 = "9357f32e672c484582fc6c3fd5a_23052401";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const il1i1I1 = require("./function/krgetToken"),
    il1iIiI = require("./function/krh5st");
let lliiIi1I = "https://jinggengjcq-isv.isvjcloud.com";
illi1liI = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + illi1liI : $.getdata("helpnum") ? $.getdata("helpnum") : "" + illi1liI;
let iiIII1lI = "",
    I11I1lI = "";
$.whitelist = process.env.DPLHTY_whitelist || iiIII1lI;
$.blacklist = process.env.DPLHTY_blacklist || I11I1lI;
l1lIl1ll();
iI1ilIli();
!(async () => {
    authorCodeList = await liI1liIi("http://code.kingran.ga/dplh.json");
    $.authorCode = illi1liI ? illi1liI : authorCodeList[I1IlII11(0, authorCodeList.length)];
    console.log("\n💬 当前ID：" + II1Il1I1);
    console.log("\n💬 默认抽奖次数：" + ii1iIIl + " 💬 重试次数：" + illIl11i);
    console.log("\n💬 请在有水的情况下运行");
    if (!lliiIi1[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    $.appkey = "94854284";
    $.userId = "10299171";
    $.actId = II1Il1I1;
    $.MixNicks = "";
    $.inviteNick = $.authorCode;
    for (let ill1l1Il = 0; ill1l1Il < lliiIi1.length; ill1l1Il++) {
        i1IliiI = lliiIi1[ill1l1Il];
        if (i1IliiI) {
            $.UserName = decodeURIComponent(i1IliiI.match(/pt_pin=([^; ]+)(?=;?)/) && i1IliiI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = ill1l1Il + 1;
            message = "";
            $.bean = 0;
            $.hotFlag = false;
            $.nickName = "";
            $.UA = await IiliIl1l();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            await l1Ii1iI1();
            await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
            if ($.outFlag || $.activityEnd) break;
        }
    }
    if ($.outFlag) {
        let lllIl111 = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + lllIl111);
        if ($.isNode()) await l1iIil11.sendNotify("" + $.name, "" + lllIl111);
    }
})().catch(IIIilI11 => $.logErr(IIIilI11)).finally(() => $.done());
async function l1Ii1iI1() {
    try {
        $.hasEnd = true;
        $.outEnd = false;
        $.retry = false;
        $.krretry = false;
        $.krFlag = false;
        $.endTime = 0;
        iIliIIII = "";
        $.Token = "";
        $.Pin = "";
        $.MixNick = "";
        if ($.activityEnd) return;
        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }
        $.Token = await il1i1I1(i1IliiI, lliiIi1I);
        if ($.Token == "") {
            console.log("❌ 获取TOKEN失败");
            return;
        }
        await iIIIi1II("activity_load");
        for (let iiiliil = 0; iiiliil < illIl11i; iiiliil++) {
            if ($.retry || $.krretry) {
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await iIIIi1II("activity_load");
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
        await iIIIi1II("绑定");
        for (let ilIIlI1I = 0; ilIIlI1I < illIl11i; ilIIlI1I++) {
            if ($.retry || $.krretry) {
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await iIIIi1II("绑定");
                if ($.krFlag) break;
            }
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        await iIIIi1II("shopList");
        for (let lI1ilIil = 0; lI1ilIil < illIl11i; lI1ilIil++) {
            if ($.retry || $.krretry) {
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await iIIIi1II("shopList");
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
                await iIIIi1II("mission");
                for (let Ii1iIiii = 0; Ii1iIiii < illIl11i; Ii1iIiii++) {
                    if ($.retry || $.krretry) {
                        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                        await iIIIi1II("mission");
                        if ($.krFlag) break;
                    }
                }
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                if ($.openCard == true) {
                    $.errorJoinShop = "";
                    await iliII1I1();
                    await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
                    if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
                        return;
                    }
                    $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await iliII1I1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                    if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                        console.log("💔 无法开卡,跳过运行");
                        return;
                    }
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await iIIIi1II("activity_load");
                    for (let iIllIIIl = 0; iIllIIIl < illIl11i; iIllIIIl++) {
                        if ($.retry || $.krretry) {
                            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                            await iIIIi1II("activity_load");
                            if ($.krFlag) break;
                        }
                    }
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await iIIIi1II("shopList");
                    for (let I1Iil1Il = 0; I1Iil1Il < illIl11i; I1Iil1Il++) {
                        if ($.retry || $.krretry) {
                            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                            await iIIIi1II("shopList");
                            if ($.krFlag) break;
                        }
                    }
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                }
            }
        }
        if ($.hasCollectShop === 0) {
            $.missionType = "uniteCollectShop";
            await iIIIi1II("mission");
            for (let IiliII1l = 0; IiliII1l < illIl11i; IiliII1l++) {
                if ($.retry || $.krretry) {
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await iIIIi1II("mission");
                    if ($.krFlag) break;
                }
            }
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        } else console.log("💔 呜呜呜，已完成关注任务");
        if ($.hasAddCart === 0) {
            $.missionType = "uniteAddCart";
            await iIIIi1II("mission");
            for (let IIliI = 0; IIliI < illIl11i; IIliI++) {
                if ($.retry || $.krretry) {
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await iIIIi1II("mission");
                    if ($.krFlag) break;
                }
            }
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        } else {
            console.log("💔 呜呜呜，已完成加购任务");
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if (ii1iIIl + "" !== "0") {
            $.runFalag = true;
            let iI11iiil = parseInt($.totalPoint / 200);
            ii1iIIl = parseInt(ii1iIIl, 10);
            if (iI11iiil > ii1iIIl) iI11iiil = ii1iIIl;
            console.log("💖 抽奖次数为:" + iI11iiil);
            for (m = 1; iI11iiil--; m++) {
                console.log("🌐 第" + m + "次抽奖");
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await iIIIi1II("抽奖");
                for (let liiil11i = 0; liiil11i < illIl11i; liiil11i++) {
                    if ($.retry || $.krretry) {
                        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                        await iIIIi1II("抽奖");
                        if ($.krFlag) break;
                    }
                }
                if ($.runFalag == false) break;
                if (Number(iI11iiil) <= 0) break;
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
    } catch (lIiI1i11) {
        console.log(lIiI1i11);
    }
}
async function iIIIi1II(Iiilii11) {
    if ($.outFlag) return;
    let lIlliiiI = "https://jinggengjcq-isv.isvjcloud.com",
        Illil1ii = "",
        I11i1l1 = "POST",
        iiI111l = "";
    switch (Iiilii11) {
        case "activity_load":
            url = lIlliiiI + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            iiI111l = {
                "jdToken": $.Token,
                "source": "01",
                "inviteNick": $.inviteNick || ""
            };
            if ($.joinVenderId) iiI111l = {
                ...iiI111l,
                "shopId": "" + $.joinVenderId
            };
            Illil1ii = IlillIII("/jdBigAlliance/activity/load", iiI111l);
            break;
        case "shopList":
            url = lIlliiiI + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            iiI111l = {};
            Illil1ii = IlillIII("/jdBigAlliance/shop/shopList", iiI111l);
            break;
        case "绑定":
            url = lIlliiiI + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            iiI111l = {
                "inviterNick": $.inviteNick || ""
            };
            Illil1ii = IlillIII("/jdBigAlliance/customer/inviteRelation", iiI111l);
            break;
        case "mission":
            url = lIlliiiI + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            iiI111l = {
                "missionType": $.missionType
            };
            if ($.joinVenderId) iiI111l = {
                ...iiI111l,
                "shopId": $.joinVenderId
            };
            Illil1ii = IlillIII("/jdBigAlliance/mission/completeMission", iiI111l);
            break;
        case "抽奖":
            url = lIlliiiI + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            iiI111l = {
                "dataType": "draw",
                "usedGameNum": "2"
            };
            Illil1ii = IlillIII("/jdBigAlliance/interactive/drawPost", iiI111l);
            break;
        default:
            console.log("错误" + Iiilii11);
    }
    let I1IlI1 = IIIll1i(url, Illil1ii, I11i1l1);
    return new Promise(async I1l1I1Ii => {
        $.post(I1IlI1, (lilIii11, Ii1Ii1i1, Ii1iilIl) => {
            try {
                lilIii11 ? (Ii1Ii1i1 && Ii1Ii1i1.statusCode && Ii1Ii1i1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : iiIl1ll(Iiilii11, Ii1iilIl);
            } catch (Ili1I1I) {
                console.log(Ili1I1I, Ii1Ii1i1);
            } finally {
                I1l1I1Ii();
            }
        });
    });
}
async function iiIl1ll(l1lii1Ii, lIIlII1i) {
    let IiIlIIll = "";
    try {
        $.krFlag = true;
        (l1lii1Ii != "accessLogWithAD" || l1lii1Ii != "drawContent") && lIIlII1i && (IiIlIIll = JSON.parse(lIIlII1i));
    } catch (lIIi1Ili) {
        console.log("🤬 " + l1lii1Ii + " 数据异常");
        $.krretry = true;
        $.runFalag = false;
    }
    try {
        let IiIIlliI = "";
        switch (l1lii1Ii) {
            case "抽奖":
                if (typeof IiIlIIll == "object") {
                    if (IiIlIIll.success && IiIlIIll.success === true && IiIlIIll.data) {
                        if (IiIlIIll.data.status && IiIlIIll.data.status == 200) {
                            if (IiIlIIll.data.data.sendResult) console.log("抽中：" + IiIlIIll.data.data.awardSetting.awardName); else !IiIlIIll.data.data.result ? console.log("空气") : console.log(IiIlIIll.data.data);
                        } else {
                            if (IiIlIIll.data.status && IiIlIIll.data.status == 500) {
                                console.log("" + (IiIlIIll.data.msg || ""));
                            }
                        }
                    } else IiIlIIll.message ? console.log("" + (IiIlIIll.message || "")) : console.log(lIIlII1i);
                } else console.log(lIIlII1i);
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
                IiIIlliI = "";
                if (l1lii1Ii == "followShop") IiIIlliI = "关注";
                if (l1lii1Ii == "addCart") IiIIlliI = "加购";
                if (typeof IiIlIIll == "object") {
                    if (IiIlIIll.success && IiIlIIll.success === true && IiIlIIll.data) {
                        if (IiIlIIll.data.status && IiIlIIll.data.status == 200) {
                            IiIlIIll = IiIlIIll.data;
                            if (l1lii1Ii != "setMixNick" && (IiIlIIll.msg || IiIlIIll.data.isOpenCard || IiIlIIll.data.remark)) console.log("🔊 " + (IiIIlliI && IiIIlliI + ":" || "") + (IiIlIIll.msg || IiIlIIll.data.isOpenCard || IiIlIIll.data.remark || ""));
                            if (l1lii1Ii == "activity_load") {
                                if (IiIlIIll.msg || IiIlIIll.data.isOpenCard) {
                                    if ((IiIlIIll.msg || IiIlIIll.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                                }
                                if (IiIlIIll.data) {
                                    $.endTime = IiIlIIll.data.cusActivity.endTime || 0;
                                    $.MixNick = IiIlIIll.data.missionCustomer.buyerNick || "";
                                    $.usedChance = IiIlIIll.data.missionCustomer.usedChance || 0;
                                    $.totalPoint = IiIlIIll.data.missionCustomer.totalPoint || 0;
                                    $.hasCollectShop = IiIlIIll.data.missionCustomer.hasCollectShop || 0;
                                    $.hasAddCart = IiIlIIll.data.missionCustomer.hasAddCart || 0;
                                }
                            } else {
                                if (l1lii1Ii == "shopList") {
                                    $.openList = IiIlIIll.data || [];
                                } else {
                                    if (l1lii1Ii == "mission") IiIlIIll.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false; else {
                                        if (l1lii1Ii == "uniteOpenCardOne") $.uniteOpenCar = IiIlIIll.msg || IiIlIIll.data.msg || ""; else {
                                            if (l1lii1Ii == "myAward") {
                                                console.log("🔊 我的奖品：");
                                                let iiilII1l = 0;
                                                for (let i1IIIi1i in IiIlIIll.data.list || []) {
                                                    let Ill1IiI = IiIlIIll.data.list[i1IIIi1i];
                                                    iiilII1l += Number(Ill1IiI.awardDes);
                                                }
                                                if (iiilII1l > 0) console.log("🔊 共获得" + iiilII1l + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                                            } else l1lii1Ii == "missionInviteList" && console.log("🔊 邀请人数(" + IiIlIIll.data.invitedLogList.total + ")");
                                        }
                                    }
                                }
                            }
                        } else {
                            if (IiIlIIll.data.msg) {
                                if (IiIlIIll.errorMessage.indexOf("活动未开始") > -1) {
                                    $.activityEnd = true;
                                }
                                console.log("🔊 " + (IiIlIIll.data.msg || ""));
                            } else {
                                if (IiIlIIll.errorMessage) {
                                    if (IiIlIIll.errorMessage.indexOf("火爆") > -1) { }
                                    console.log("🔊 " + (IiIlIIll.errorMessage || ""));
                                } else console.log("" + lIIlII1i);
                            }
                        }
                    } else IiIlIIll.errorMessage ? console.log("🔊 " + (IiIlIIll.errorMessage || "")) : console.log("" + lIIlII1i);
                } else { }
                break;
            default:
                console.log((IiIIlliI || l1lii1Ii) + "-> " + lIIlII1i);
        }
        if (typeof IiIlIIll == "object") {
            if (IiIlIIll.errorMessage) {
                if (IiIlIIll.errorMessage.indexOf("火爆") > -1) { }
            }
        }
    } catch (llil1111) { }
}
function IIIll1i(ilIIlI1, i11III1I, lI11ill1 = "POST") {
    let liIlIlil = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": i1IliiI,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
    };
    return ilIIlI1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (liIlIlil.Origin = "https://jinggengjcq-isv.isvjcloud.com", liIlIlil["Content-Type"] = "application/json; charset=utf-8", delete liIlIlil.Cookie), {
        "url": ilIIlI1,
        "method": lI11ill1,
        "headers": liIlIlil,
        "body": i11III1I,
        "timeout": 30 * 1000
    };
}
function IlillIII(i1iiiIli, l1IIIiII) {
    d = {
        "actId": $.actId,
        ...l1IIIiII,
        "method": i1iiiIli,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
    };
    sign2 = l1Illi1l(d);
    const Ili111ii = {
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
                ...l1IIIiII,
                "method": i1iiiIli,
                "userId": $.userId,
                "buyerNick": $.MixNick || ""
            }
        }
    };
    return i1iiiIli.indexOf("missionInviteList") > -1 && delete Ili111ii.params.admJson.actId, $.toStr(Ili111ii, Ili111ii);
}
function I1IlII11(l1i1lliI, l1liiI1I) {
    return Math.floor(Math.random() * (l1liiI1I - l1i1lliI)) + l1i1lliI;
}
function l1Illi1l(li1II11I) {
    return AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed", key = "c1614da9ac68", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(li1II11I)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
        "sign": sign,
        "timeStamp": time2
    };
}
async function IiliIl1l() {
    id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
    CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
    const ililll1I = CryptoJS.enc.Utf8.parse(id),
        IlIiIliI = CryptoJS.enc.Base64.stringify(ililll1I);
    return ep = encodeURIComponent(JSON.stringify({
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": new Date().getTime(),
        "ridx": -1,
        "cipher": {
            "sv": "EG==",
            "ad": IlIiIliI,
            "od": "",
            "ov": "Ctq=",
            "ud": IlIiIliI
        },
        "ciphertype": 5,
        "version": "1.2.0",
        "appname": "com.jingdong.app.mall"
    })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function ll1IilI1(I11ilI1i) {
    I11ilI1i = I11ilI1i || 32;
    let i111IiI1 = "abcdef0123456789",
        iIIIlI1 = i111IiI1.length,
        I11lII1I = "";
    for (i = 0; i < I11ilI1i; i++) I11lII1I += i111IiI1.charAt(Math.floor(Math.random() * iIIIlI1));
    return I11lII1I;
}
function I1I1iil1(Iiiii11i) {
    if (typeof Iiiii11i == "string") try {
        return JSON.parse(Iiiii11i);
    } catch (I111III) {
        return console.log(I111III), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
async function iliII1I1() {
    if (!$.joinVenderId) return;
    return new Promise(async liIIliil => {
        $.errorJoinShop = "活动太火爆，请稍后再试";
        let liIl1iii = "";
        if ($.shopactivityId) liIl1iii = ",\"activityId\":" + $.shopactivityId;
        const lll1iil = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + liIl1iii + ",\"channel\":406}",
            Ill1IIl1 = {
                "appid": "jd_shop_member",
                "functionId": "bindWithVender",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": JSON.parse(lll1iil)
            };
        for (var IlII1iii = "", IIl1Illi = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", llll11 = 0; llll11 < 16; llll11++) {
            var lI1l1il1 = Math.round(Math.random() * (IIl1Illi.length - 1));
            IlII1iii += IIl1Illi.substring(lI1l1il1, lI1l1il1 + 1);
        }
        uuid = Buffer.from(IlII1iii, "utf8").toString("base64");
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
        const l1Il1I1l = await il1iIiI("8adfb", Ill1IIl1),
            IIli1ill = {
                "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lll1iil + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1Il1I1l),
                "headers": {
                    "accept": "*/*",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cookie": i1IliiI,
                    "origin": "https://shopmember.m.jd.com/",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
                }
            };
        $.get(IIli1ill, async (iII1IlIl, Il11iIll, Ilii11Ii) => {
            try {
                if (iII1IlIl) Il11iIll && typeof Il11iIll.statusCode != "undefined" && Il11iIll.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n"); else {
                    Ilii11Ii = Ilii11Ii && Ilii11Ii.match(/jsonp_.*?\((.*?)\);/) && Ilii11Ii.match(/jsonp_.*?\((.*?)\);/)[1] || Ilii11Ii;
                    let ii1I11I1 = $.toObj(Ilii11Ii, Ilii11Ii);
                    if (ii1I11I1 && typeof ii1I11I1 == "object") {
                        if (ii1I11I1 && ii1I11I1.success === true) {
                            console.log(" >> " + ii1I11I1.message);
                            $.errorJoinShop = ii1I11I1.message;
                            if (ii1I11I1.result && ii1I11I1.result.giftInfo) {
                                for (let iI1il1I1 of ii1I11I1.result.giftInfo.giftList) {
                                    console.log(" >> 入会获得：" + iI1il1I1.discountString + iI1il1I1.prizeName + iI1il1I1.secondLineDesc);
                                }
                            }
                        } else ii1I11I1 && typeof ii1I11I1 == "object" && ii1I11I1.message ? ($.errorJoinShop = ii1I11I1.message, console.log("" + (ii1I11I1.message || ""))) : console.log(Ilii11Ii);
                    } else console.log(Ilii11Ii);
                }
            } catch (lIIl1iii) {
                $.logErr(lIIl1iii, Il11iIll);
            } finally {
                liIIliil();
            }
        });
    });
}
async function Ili1lilI() {
    return new Promise(async iIllll1i => {
        const Ii11l1i1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
            i1iIll1I = {
                "appid": "jd_shop_member",
                "functionId": "bindWithVender",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": JSON.parse(Ii11l1i1)
            };
        await $.wait(1000);
        const IllIII = await il1iIiI("8adfb", i1iIll1I),
            iiI1iIiI = {
                "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Ii11l1i1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IllIII),
                "headers": {
                    "accept": "*/*",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cookie": i1IliiI,
                    "origin": "https://shopmember.m.jd.com/",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
                }
            };
        $.get(iiI1iIiI, async (l1I1I1lI, l1ii1Iii, ii1lIi) => {
            try {
                if (l1I1I1lI) l1ii1Iii && typeof l1ii1Iii.statusCode != "undefined" && l1ii1Iii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n"); else {
                    ii1lIi = ii1lIi && ii1lIi.match(/jsonp_.*?\((.*?)\);/) && ii1lIi.match(/jsonp_.*?\((.*?)\);/)[1] || ii1lIi;
                    let i1iillii = $.toObj(ii1lIi, ii1lIi);
                    if (i1iillii && typeof i1iillii == "object") {
                        i1iillii && i1iillii.success == true && (console.log("去加入：" + (i1iillii.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i1iillii.result.interestsRuleList && i1iillii.result.interestsRuleList[0] && i1iillii.result.interestsRuleList[0].interestsInfo && i1iillii.result.interestsRuleList[0].interestsInfo.activityId || "");
                    } else console.log(ii1lIi);
                }
            } catch (IlllllII) {
                $.logErr(IlllllII, l1ii1Iii);
            } finally {
                iIllll1i();
            }
        });
    });
}
function liI1liIi(liIillI1) {
    return new Promise(IlIilll1 => {
        const IiIil1Ii = {
            "url": liIillI1 + "?" + new Date(),
            "timeout": 10000,
            "headers": {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(IiIil1Ii, async (iiIl11il, lIi1ill1, llIliI1l) => {
            try {
                if (iiIl11il) $.getAuthorCodeListerr = false; else {
                    if (llIliI1l) llIliI1l = JSON.parse(llIliI1l);
                    $.getAuthorCodeListerr = true;
                }
            } catch (IIlIIll) {
                $.logErr(IIlIIll, lIi1ill1);
                llIliI1l = null;
            } finally {
                IlIilll1(llIliI1l);
            }
        });
    });
}
function I1IlII11(Ii1lliIi, I1liIii) {
    return Math.floor(Math.random() * (I1liIii - Ii1lliIi)) + Ii1lliIi;
}
function iI1ilIli() {
    if ($.blacklist == "") return;
    console.log("当前已设置黑名单：");
    const il1iil1i = Array.from(new Set($.blacklist.split("&")));
    console.log(il1iil1i.join("&") + "\n");
    let ll1iIll = il1iil1i,
        iIli1ill = [],
        I1llil1l = false;
    for (let I1illlii = 0; I1illlii < lliiIi1.length; I1illlii++) {
        let lIi1lIl = decodeURIComponent(lliiIi1[I1illlii].match(/pt_pin=([^; ]+)(?=;?)/) && lliiIi1[I1illlii].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
        if (!lIi1lIl) break;
        let l1I1111i = false;
        for (let IIIil1ll of ll1iIll) {
            if (IIIil1ll && IIIil1ll == lIi1lIl) {
                l1I1111i = true;
                break;
            }
        }
        !l1I1111i && (I1llil1l = true, iIli1ill.splice(I1illlii, -1, lliiIi1[I1illlii]));
    }
    if (I1llil1l) lliiIi1 = iIli1ill;
}
function I1li1iI1(IIi1l111, lIiIiIiI) {
    lIiIiIiI != 0 && IIi1l111.unshift(IIi1l111.splice(lIiIiIiI, 1)[0]);
}
function l1lIl1ll() {
    if ($.whitelist == "") {
        helpCookiesArr = $.toObj($.toStr(lliiIi1, lliiIi1));
        return;
    }
    console.log("当前已设置白名单：");
    const IIIlii1I = Array.from(new Set($.whitelist.split("&")));
    console.log(IIIlii1I.join("&") + "\n");
    let Iii1llli = [],
        IililI1I = IIIlii1I;
    for (let IIlIIl1 in lliiIi1) {
        let iil1IiI1 = decodeURIComponent(lliiIi1[IIlIIl1].match(/pt_pin=([^; ]+)(?=;?)/) && lliiIi1[IIlIIl1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
        IililI1I.includes(iil1IiI1) && Iii1llli.push(lliiIi1[IIlIIl1]);
    }
    helpCookiesArr = Iii1llli;
    if (IililI1I.length > 1) {
        for (let IlIiii1l in IililI1I) {
            let IlI11lll = IililI1I[IililI1I.length - 1 - IlIiii1l];
            if (!IlI11lll) continue;
            for (let lI1l1Il1 in helpCookiesArr) {
                let i11li1iI = decodeURIComponent(helpCookiesArr[lI1l1Il1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lI1l1Il1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                IlI11lll == i11li1iI && I1li1iI1(helpCookiesArr, lI1l1Il1);
            }
        }
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }