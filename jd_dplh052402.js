/*
大牌联合052402期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023052402cxc/oC2023052402cxc?actId=ece1f0e31eae4622b6f1ec_23052402

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
#大牌联合052402期
1 1 1 1 * jd_dplh052402.js, tag=大牌联合052402期, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("大牌联合052402期");
const Iiil1I11 = $.isNode() ? require("./jdCookie.js") : "",
    lI11IIi1 = $.isNode() ? require("./sendNotify") : "";
let iil1Il = [],
    IiI1Ii = "";
if ($.isNode()) {
    Object.keys(Iiil1I11).forEach(l11I1lil => {
        iil1Il.push(Iiil1I11[l11I1lil]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else iil1Il = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIIlili1($.getdata("CookiesJD") || "[]").map(IIIlll1 => IIIlll1.cookie)].filter(iili1lIi => !!iili1lIi);
let I1I1I1ii = "30",
    IilIiIli = "0";
I1I1I1ii = $.isNode() ? process.env.retrynum ? process.env.retrynum : I1I1I1ii : $.getdata("retrynum") ? $.getdata("retrynum") : IilIiIli;
IilIiIli = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : IilIiIli : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : IilIiIli;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lI1lI11I = "",
    i1li1I1I = "",
    IIl1I1lI = "ece1f0e31eae4622b6f1ec_23052402";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const Ii1llIi1 = require("./function/krgetToken"),
    l1111i1i = require("./function/krh5st");
let iiIiIlil = "https://jinggengjcq-isv.isvjcloud.com";
i1li1I1I = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + i1li1I1I : $.getdata("helpnum") ? $.getdata("helpnum") : "" + i1li1I1I;
let il1i1i = "",
    l1lIi1 = "";
$.whitelist = process.env.DPLHTY_whitelist || il1i1i;
$.blacklist = process.env.DPLHTY_blacklist || l1lIi1;
lIil1lli();
illI1l();
!(async () => {
    authorCodeList = await I1Iili1I("http://code.kingran.ga/dplh.json");
    $.authorCode = i1li1I1I ? i1li1I1I : authorCodeList[I11IiI11(0, authorCodeList.length)];
    console.log("\n💬 当前ID：" + IIl1I1lI);
    console.log("\n💬 默认抽奖次数：" + IilIiIli + " 💬 重试次数：" + I1I1I1ii);
    console.log("\n💬 请在有水的情况下运行");
    if (!iil1Il[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    $.appkey = "94854284";
    $.userId = "10299171";
    $.actId = IIl1I1lI;
    $.MixNicks = "";
    $.inviteNick = $.authorCode;
    for (let IIi1iI1I = 0; IIi1iI1I < iil1Il.length; IIi1iI1I++) {
        IiI1Ii = iil1Il[IIi1iI1I];
        if (IiI1Ii) {
            $.UserName = decodeURIComponent(IiI1Ii.match(/pt_pin=([^; ]+)(?=;?)/) && IiI1Ii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = IIi1iI1I + 1;
            message = "";
            $.bean = 0;
            $.hotFlag = false;
            $.nickName = "";
            $.UA = await liIl1IiI();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            await llI11iiI();
            await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
            if ($.outFlag || $.activityEnd) break;
        }
    }
    if ($.outFlag) {
        let I11lIllI = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + I11lIllI);
        if ($.isNode()) await lI11IIi1.sendNotify("" + $.name, "" + I11lIllI);
    }
})().catch(Iill1I1l => $.logErr(Iill1I1l)).finally(() => $.done());
async function llI11iiI() {
    try {
        $.hasEnd = true;
        $.outEnd = false;
        $.retry = false;
        $.krretry = false;
        $.krFlag = false;
        $.endTime = 0;
        lI1lI11I = "";
        $.Token = "";
        $.Pin = "";
        $.MixNick = "";
        if ($.activityEnd) return;
        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }
        $.Token = await Ii1llIi1(IiI1Ii, iiIiIlil);
        if ($.Token == "") {
            console.log("❌ 获取TOKEN失败");
            return;
        }
        await lI1lIii1("activity_load");
        for (let iiiIII1i = 0; iiiIII1i < I1I1I1ii; iiiIII1i++) {
            if ($.retry || $.krretry) {
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await lI1lIii1("activity_load");
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
        await lI1lIii1("绑定");
        for (let Il1iiiiI = 0; Il1iiiiI < I1I1I1ii; Il1iiiiI++) {
            if ($.retry || $.krretry) {
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await lI1lIii1("绑定");
                if ($.krFlag) break;
            }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lI1lIii1("shopList");
        for (let I1iiIll1 = 0; I1iiIll1 < I1I1I1ii; I1iiIll1++) {
            if ($.retry || $.krretry) {
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await lI1lIii1("shopList");
                if ($.krFlag) break;
            }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.activityEnd) return;
        for (o of $.openList) {
            $.missionType = "openCard";
            if (o.open != true && o.openCardUrl) {
                if ($.activityEnd) return;
                if ($.outEnd) return;
                $.openCard = false;
                $.joinVenderId = o.userId;
                await lI1lIii1("mission");
                for (let IIl1i1Il = 0; IIl1i1Il < I1I1I1ii; IIl1i1Il++) {
                    if ($.retry || $.krretry) {
                        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                        await lI1lIii1("mission");
                        if ($.krFlag) break;
                    }
                }
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                if ($.openCard == true) {
                    $.errorJoinShop = "";
                    await iIiIIii();
                    await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
                    if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
                        return;
                    }
                    $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await iIiIIii(), await $.wait(parseInt(Math.random() * 1500 + 2000, 10)));
                    if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                        console.log("💔 无法开卡,跳过运行");
                        return;
                    }
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await lI1lIii1("activity_load");
                    for (let liil11 = 0; liil11 < I1I1I1ii; liil11++) {
                        if ($.retry || $.krretry) {
                            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                            await lI1lIii1("activity_load");
                            if ($.krFlag) break;
                        }
                    }
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await lI1lIii1("shopList");
                    for (let i1l11li1 = 0; i1l11li1 < I1I1I1ii; i1l11li1++) {
                        if ($.retry || $.krretry) {
                            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                            await lI1lIii1("shopList");
                            if ($.krFlag) break;
                        }
                    }
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                }
            }
        }
        if ($.hasCollectShop === 0) {
            $.missionType = "uniteCollectShop";
            await lI1lIii1("mission");
            for (let iiII1ii = 0; iiII1ii < I1I1I1ii; iiII1ii++) {
                if ($.retry || $.krretry) {
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await lI1lIii1("mission");
                    if ($.krFlag) break;
                }
            }
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        } else console.log("💔 呜呜呜，已完成关注任务");
        if ($.hasAddCart === 0) {
            $.missionType = "uniteAddCart";
            await lI1lIii1("mission");
            for (let l1ilIlIl = 0; l1ilIlIl < I1I1I1ii; l1ilIlIl++) {
                if ($.retry || $.krretry) {
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await lI1lIii1("mission");
                    if ($.krFlag) break;
                }
            }
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        } else console.log("💔 呜呜呜，已完成加购任务");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if (IilIiIli + "" !== "0") {
            $.runFalag = true;
            let lII11lI = parseInt($.totalPoint / 200);
            IilIiIli = parseInt(IilIiIli, 10);
            if (lII11lI > IilIiIli) lII11lI = IilIiIli;
            console.log("💖 抽奖次数为:" + lII11lI);
            for (m = 1; lII11lI--; m++) {
                console.log("🌐 第" + m + "次抽奖");
                await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                await lI1lIii1("抽奖");
                for (let i1Iiill = 0; i1Iiill < I1I1I1ii; i1Iiill++) {
                    if ($.retry || $.krretry) {
                        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                        await lI1lIii1("抽奖");
                        if ($.krFlag) break;
                    }
                }
                if ($.runFalag == false) break;
                if (Number(lII11lI) <= 0) break;
                if (m >= 10) {
                    console.log("💔 抽奖太多次，多余的次数请再执行脚本");
                    break;
                }
                await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
            }
        } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
        console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
        $.index == 1 && ($.inviteNick = $.MixNick, console.log("🔊 后面的号都会助力:" + $.inviteNick));
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } catch (i111IIl) {
        console.log(i111IIl);
    }
}
async function lI1lIii1(iil1i1il) {
    if ($.outFlag) return;
    let lI11iI1i = "https://jinggengjcq-isv.isvjcloud.com",
        IiiIIII1 = "",
        liliIlII = "POST",
        llIIi1i1 = "";
    switch (iil1i1il) {
        case "activity_load":
            url = lI11iI1i + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            llIIi1i1 = {
                "jdToken": $.Token,
                "source": "01",
                "inviteNick": $.inviteNick || ""
            };
            if ($.joinVenderId) llIIi1i1 = {
                ...llIIi1i1,
                "shopId": "" + $.joinVenderId
            };
            IiiIIII1 = liI11li("/jdBigAlliance/activity/load", llIIi1i1);
            break;
        case "shopList":
            url = lI11iI1i + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            llIIi1i1 = {};
            IiiIIII1 = liI11li("/jdBigAlliance/shop/shopList", llIIi1i1);
            break;
        case "绑定":
            url = lI11iI1i + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            llIIi1i1 = {
                "inviterNick": $.inviteNick || ""
            };
            IiiIIII1 = liI11li("/jdBigAlliance/customer/inviteRelation", llIIi1i1);
            break;
        case "mission":
            url = lI11iI1i + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            llIIi1i1 = {
                "missionType": $.missionType
            };
            if ($.joinVenderId) llIIi1i1 = {
                ...llIIi1i1,
                "shopId": $.joinVenderId
            };
            IiiIIII1 = liI11li("/jdBigAlliance/mission/completeMission", llIIi1i1);
            break;
        case "抽奖":
            url = lI11iI1i + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
            llIIi1i1 = {
                "dataType": "draw",
                "usedGameNum": "2"
            };
            IiiIIII1 = liI11li("/jdBigAlliance/interactive/drawPost", llIIi1i1);
            break;
        default:
            console.log("错误" + iil1i1il);
    }
    let iIIlIlii = lI1iIll(url, IiiIIII1, liliIlII);
    return new Promise(async IIl11Ii1 => {
        $.post(iIIlIlii, (lI1IlIli, lIl1i11l, lIi1Il1l) => {
            try {
                lI1IlIli ? (lIl1i11l && lIl1i11l.statusCode && lIl1i11l.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : illIil1l(iil1i1il, lIi1Il1l);
            } catch (ll1l11i) {
                console.log(ll1l11i, lIl1i11l);
            } finally {
                IIl11Ii1();
            }
        });
    });
}
async function illIil1l(I11Iii1i, iii111l1) {
    let ii1iIilI = "";
    try {
        $.krFlag = true;
        if (I11Iii1i != "accessLogWithAD" || I11Iii1i != "drawContent") {
            if (iii111l1) {
                ii1iIilI = JSON.parse(iii111l1);
            }
        }
    } catch (llilIl1i) {
        console.log("🤬 " + I11Iii1i + " 数据异常");
        $.krretry = true;
        $.runFalag = false;
    }
    try {
        let l1li1Ili = "";
        switch (I11Iii1i) {
            case "抽奖":
                if (typeof ii1iIilI == "object") {
                    if (ii1iIilI.success && ii1iIilI.success === true && ii1iIilI.data) {
                        if (ii1iIilI.data.status && ii1iIilI.data.status == 200) {
                            if (ii1iIilI.data.data.sendResult) {
                                console.log("抽中：" + ii1iIilI.data.data.awardSetting.awardName);
                            } else !ii1iIilI.data.data.result ? console.log("空气") : console.log(ii1iIilI.data.data);
                        } else ii1iIilI.data.status && ii1iIilI.data.status == 500 && console.log("" + (ii1iIilI.data.msg || ""));
                    } else {
                        if (ii1iIilI.message) {
                            console.log("" + (ii1iIilI.message || ""));
                        } else console.log(iii111l1);
                    }
                } else {
                    console.log(iii111l1);
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
                l1li1Ili = "";
                if (I11Iii1i == "followShop") l1li1Ili = "关注";
                if (I11Iii1i == "addCart") l1li1Ili = "加购";
                if (typeof ii1iIilI == "object") {
                    if (ii1iIilI.success && ii1iIilI.success === true && ii1iIilI.data) {
                        if (ii1iIilI.data.status && ii1iIilI.data.status == 200) {
                            ii1iIilI = ii1iIilI.data;
                            if (I11Iii1i != "setMixNick" && (ii1iIilI.msg || ii1iIilI.data.isOpenCard || ii1iIilI.data.remark)) console.log("🔊 " + (l1li1Ili && l1li1Ili + ":" || "") + (ii1iIilI.msg || ii1iIilI.data.isOpenCard || ii1iIilI.data.remark || ""));
                            if (I11Iii1i == "activity_load") {
                                if (ii1iIilI.msg || ii1iIilI.data.isOpenCard) {
                                    if ((ii1iIilI.msg || ii1iIilI.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                                }
                                if (ii1iIilI.data) {
                                    $.endTime = ii1iIilI.data.cusActivity.endTime || 0;
                                    $.MixNick = ii1iIilI.data.missionCustomer.buyerNick || "";
                                    $.usedChance = ii1iIilI.data.missionCustomer.usedChance || 0;
                                    $.totalPoint = ii1iIilI.data.missionCustomer.totalPoint || 0;
                                    $.hasCollectShop = ii1iIilI.data.missionCustomer.hasCollectShop || 0;
                                    $.hasAddCart = ii1iIilI.data.missionCustomer.hasAddCart || 0;
                                }
                            } else {
                                if (I11Iii1i == "shopList") $.openList = ii1iIilI.data || []; else {
                                    if (I11Iii1i == "mission") {
                                        if (ii1iIilI.data.remark.indexOf("不是会员") > -1) {
                                            $.openCard = true;
                                        } else $.openCard = false;
                                    } else {
                                        if (I11Iii1i == "uniteOpenCardOne") $.uniteOpenCar = ii1iIilI.msg || ii1iIilI.data.msg || ""; else {
                                            if (I11Iii1i == "myAward") {
                                                console.log("🔊 我的奖品：");
                                                let I1ii1l1l = 0;
                                                for (let Iil1lllI in ii1iIilI.data.list || []) {
                                                    let lIIlI1I = ii1iIilI.data.list[Iil1lllI];
                                                    I1ii1l1l += Number(lIIlI1I.awardDes);
                                                }
                                                if (I1ii1l1l > 0) console.log("🔊 共获得" + I1ii1l1l + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                                            } else I11Iii1i == "missionInviteList" && console.log("🔊 邀请人数(" + ii1iIilI.data.invitedLogList.total + ")");
                                        }
                                    }
                                }
                            }
                        } else {
                            if (ii1iIilI.data.msg) {
                                if (ii1iIilI.errorMessage.indexOf("活动未开始") > -1) {
                                    $.activityEnd = true;
                                }
                                console.log("🔊 " + (ii1iIilI.data.msg || ""));
                            } else {
                                if (ii1iIilI.errorMessage) {
                                    if (ii1iIilI.errorMessage.indexOf("火爆") > -1) { }
                                    console.log("🔊 " + (ii1iIilI.errorMessage || ""));
                                } else console.log("" + iii111l1);
                            }
                        }
                    } else ii1iIilI.errorMessage ? console.log("🔊 " + (ii1iIilI.errorMessage || "")) : console.log("" + iii111l1);
                } else { }
                break;
            default:
                console.log((l1li1Ili || I11Iii1i) + "-> " + iii111l1);
        }
        if (typeof ii1iIilI == "object") {
            if (ii1iIilI.errorMessage) {
                if (ii1iIilI.errorMessage.indexOf("火爆") > -1) { }
            }
        }
    } catch (llII1Iii) { }
}
function lI1iIll(I1ii1lIl, lIil11i, ii1i1lI = "POST") {
    let II1IIi11 = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": IiI1Ii,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
    };
    return I1ii1lIl.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (II1IIi11.Origin = "https://jinggengjcq-isv.isvjcloud.com", II1IIi11["Content-Type"] = "application/json; charset=utf-8", delete II1IIi11.Cookie), {
        "url": I1ii1lIl,
        "method": ii1i1lI,
        "headers": II1IIi11,
        "body": lIil11i,
        "timeout": 30 * 1000
    };
}
function liI11li(illl1ilI, iiIllIl1) {
    d = {
        "actId": $.actId,
        ...iiIllIl1,
        "method": illl1ilI,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
    };
    sign2 = iliiIIIi(d);
    const Ii1I111i = {
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
                ...iiIllIl1,
                "method": illl1ilI,
                "userId": $.userId,
                "buyerNick": $.MixNick || ""
            }
        }
    };
    return illl1ilI.indexOf("missionInviteList") > -1 && delete Ii1I111i.params.admJson.actId, $.toStr(Ii1I111i, Ii1I111i);
}
function I11IiI11(lIl11li, l1i1Ii1) {
    return Math.floor(Math.random() * (l1i1Ii1 - lIl11li)) + lIl11li;
}
function iliiIIIi(Il11l1iI) {
    return AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed", key = "c1614da9ac68", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(Il11l1iI)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
        "sign": sign,
        "timeStamp": time2
    };
}
async function liIl1IiI() {
    id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
    CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
    const lIlli111 = CryptoJS.enc.Utf8.parse(id),
        iillli = CryptoJS.enc.Base64.stringify(lIlli111);
    return ep = encodeURIComponent(JSON.stringify({
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": new Date().getTime(),
        "ridx": -1,
        "cipher": {
            "sv": "EG==",
            "ad": iillli,
            "od": "",
            "ov": "Ctq=",
            "ud": iillli
        },
        "ciphertype": 5,
        "version": "1.2.0",
        "appname": "com.jingdong.app.mall"
    })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function l1i1I1ii(iiilili) {
    iiilili = iiilili || 32;
    let lIIlIlil = "abcdef0123456789",
        II1l1l = lIIlIlil.length,
        llI1l111 = "";
    for (i = 0; i < iiilili; i++) llI1l111 += lIIlIlil.charAt(Math.floor(Math.random() * II1l1l));
    return llI1l111;
}
function IIIlili1(l1ilIiI) {
    if (typeof l1ilIiI == "string") try {
        return JSON.parse(l1ilIiI);
    } catch (iiiI1lii) {
        return console.log(iiiI1lii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
async function iIiIIii() {
    if (!$.joinVenderId) return;
    return new Promise(async i1Ill1 => {
        $.errorJoinShop = "活动太火爆，请稍后再试";
        let II1lIiIi = "";
        if ($.shopactivityId) II1lIiIi = ",\"activityId\":" + $.shopactivityId;
        const Ii1iI1il = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + II1lIiIi + ",\"channel\":406}",
            liIl111i = {
                "appid": "jd_shop_member",
                "functionId": "bindWithVender",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": JSON.parse(Ii1iI1il)
            };
        for (var iI1lIlil = "", Ii1lI1i1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", lIiIiiil = 0; lIiIiiil < 16; lIiIiiil++) {
            var iII1i1il = Math.round(Math.random() * (Ii1lI1i1.length - 1));
            iI1lIlil += Ii1lI1i1.substring(iII1i1il, iII1i1il + 1);
        }
        uuid = Buffer.from(iI1lIlil, "utf8").toString("base64");
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
        const lil1IlIi = await l1111i1i("8adfb", liIl111i),
            lII11Il1 = {
                "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Ii1iI1il + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lil1IlIi),
                "headers": {
                    "accept": "*/*",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cookie": IiI1Ii,
                    "origin": "https://shopmember.m.jd.com/",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
                }
            };
        $.get(lII11Il1, async (IIiiiIi, li1i1i1i, lii1Illi) => {
            try {
                if (IIiiiIi) li1i1i1i && typeof li1i1i1i.statusCode != "undefined" && li1i1i1i.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n"); else {
                    lii1Illi = lii1Illi && lii1Illi.match(/jsonp_.*?\((.*?)\);/) && lii1Illi.match(/jsonp_.*?\((.*?)\);/)[1] || lii1Illi;
                    let Il111II1 = $.toObj(lii1Illi, lii1Illi);
                    if (Il111II1 && typeof Il111II1 == "object") {
                        if (Il111II1 && Il111II1.success === true) {
                            console.log(" >> " + Il111II1.message);
                            $.errorJoinShop = Il111II1.message;
                            if (Il111II1.result && Il111II1.result.giftInfo) {
                                for (let i1llIl1l of Il111II1.result.giftInfo.giftList) {
                                    console.log(" >> 入会获得：" + i1llIl1l.discountString + i1llIl1l.prizeName + i1llIl1l.secondLineDesc);
                                }
                            }
                        } else Il111II1 && typeof Il111II1 == "object" && Il111II1.message ? ($.errorJoinShop = Il111II1.message, console.log("" + (Il111II1.message || ""))) : console.log(lii1Illi);
                    } else console.log(lii1Illi);
                }
            } catch (iI1il1) {
                $.logErr(iI1il1, li1i1i1i);
            } finally {
                i1Ill1();
            }
        });
    });
}
async function lI11iii1() {
    return new Promise(async IliIlIIl => {
        const iliIiII1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
            illIlii1 = {
                "appid": "jd_shop_member",
                "functionId": "bindWithVender",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": JSON.parse(iliIiII1)
            };
        await $.wait(1000);
        const llI111Il = await l1111i1i("8adfb", illIlii1),
            IliiiiIl = {
                "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iliIiII1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(llI111Il),
                "headers": {
                    "accept": "*/*",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cookie": IiI1Ii,
                    "origin": "https://shopmember.m.jd.com/",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
                }
            };
        $.get(IliiiiIl, async (lI1Ilil1, iiIIlil1, liilllli) => {
            try {
                if (lI1Ilil1) iiIIlil1 && typeof iiIIlil1.statusCode != "undefined" && iiIIlil1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n"); else {
                    liilllli = liilllli && liilllli.match(/jsonp_.*?\((.*?)\);/) && liilllli.match(/jsonp_.*?\((.*?)\);/)[1] || liilllli;
                    let ll1IIi1l = $.toObj(liilllli, liilllli);
                    if (ll1IIi1l && typeof ll1IIi1l == "object") ll1IIi1l && ll1IIi1l.success == true && (console.log("去加入：" + (ll1IIi1l.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = ll1IIi1l.result.interestsRuleList && ll1IIi1l.result.interestsRuleList[0] && ll1IIi1l.result.interestsRuleList[0].interestsInfo && ll1IIi1l.result.interestsRuleList[0].interestsInfo.activityId || ""); else {
                        console.log(liilllli);
                    }
                }
            } catch (i111liIi) {
                $.logErr(i111liIi, iiIIlil1);
            } finally {
                IliIlIIl();
            }
        });
    });
}
function I1Iili1I(lIIi1Ili) {
    return new Promise(lI11l1lI => {
        const ilIii1li = {
            "url": lIIi1Ili + "?" + new Date(),
            "timeout": 10000,
            "headers": {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(ilIii1li, async (lii1IIil, iI1IIiii, Illl1i1l) => {
            try {
                if (lii1IIil) $.getAuthorCodeListerr = false; else {
                    if (Illl1i1l) Illl1i1l = JSON.parse(Illl1i1l);
                    $.getAuthorCodeListerr = true;
                }
            } catch (I11I1I1I) {
                $.logErr(I11I1I1I, iI1IIiii);
                Illl1i1l = null;
            } finally {
                lI11l1lI(Illl1i1l);
            }
        });
    });
}
function I11IiI11(I11I1l, l1lil1il) {
    return Math.floor(Math.random() * (l1lil1il - I11I1l)) + I11I1l;
}
function illI1l() {
    if ($.blacklist == "") return;
    console.log("当前已设置黑名单：");
    const iII1i11 = Array.from(new Set($.blacklist.split("&")));
    console.log(iII1i11.join("&") + "\n");
    let I111iIl = iII1i11,
        ll1iil11 = [],
        liliiI1l = false;
    for (let liIl111I = 0; liIl111I < iil1Il.length; liIl111I++) {
        let ll1lli1I = decodeURIComponent(iil1Il[liIl111I].match(/pt_pin=([^; ]+)(?=;?)/) && iil1Il[liIl111I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
        if (!ll1lli1I) break;
        let IlIi1iIl = false;
        for (let ll1iiiI of I111iIl) {
            if (ll1iiiI && ll1iiiI == ll1lli1I) {
                IlIi1iIl = true;
                break;
            }
        }
        !IlIi1iIl && (liliiI1l = true, ll1iil11.splice(liIl111I, -1, iil1Il[liIl111I]));
    }
    if (liliiI1l) iil1Il = ll1iil11;
}
function llliill1(ilIi1l11, Iil1l1li) {
    Iil1l1li != 0 && ilIi1l11.unshift(ilIi1l11.splice(Iil1l1li, 1)[0]);
}
function lIil1lli() {
    if ($.whitelist == "") {
        helpCookiesArr = $.toObj($.toStr(iil1Il, iil1Il));
        return;
    }
    console.log("当前已设置白名单：");
    const il111ill = Array.from(new Set($.whitelist.split("&")));
    console.log(il111ill.join("&") + "\n");
    let I111i1I1 = [],
        lII1iI11 = il111ill;
    for (let iiIi1i11 in iil1Il) {
        let iii1lil1 = decodeURIComponent(iil1Il[iiIi1i11].match(/pt_pin=([^; ]+)(?=;?)/) && iil1Il[iiIi1i11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
        lII1iI11.includes(iii1lil1) && I111i1I1.push(iil1Il[iiIi1i11]);
    }
    helpCookiesArr = I111i1I1;
    if (lII1iI11.length > 1) for (let ii1liI1i in lII1iI11) {
        let ll1l11ll = lII1iI11[lII1iI11.length - 1 - ii1liI1i];
        if (!ll1l11ll) continue;
        for (let lIi1i1Il in helpCookiesArr) {
            let IIlll1li = decodeURIComponent(helpCookiesArr[lIi1i1Il].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lIi1i1Il].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            ll1l11ll == IIlll1li && llliill1(helpCookiesArr, lIi1i1Il);
        }
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }