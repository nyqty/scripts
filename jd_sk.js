/*
解锁心动时刻

cron:35 1,10 * * *
============Quantumultx===============
[task_local]
#解锁心动时刻
35 1,10 * * * jd_szxyun_xm.js, tag=解锁心动时刻, enabled=true
*/
const Env = require('./utils/Env.js');
const $ = new Env("解锁心动时刻");
const i1I1ii1l = $.isNode() ? require("./sendNotify") : "",
    ilil = $.isNode() ? require("./jdCookie.js") : "",
    I1liIiil = require("./function/krgetToken");
let iIlIllil = "https://szxyun-rc.isvjcloud.com",
    l11lIil1 = [],
    IlliiIlI = "";
if ($.isNode()) {
    if (process.env.jd_szxyun_teamId) $.teamId = process.env.jd_szxyun_teamId;
    if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
    Object.keys(ilil).forEach(iI1IIlli => {
        l11lIil1.push(ilil[iI1IIlli]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else l11lIil1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lIlIlIi => lIlIlIi.cookie)].filter(l1l111lI => !!l1l111lI);
let llIIil1 = typeof $request !== "undefined";
llIIil1 && (GetCookie(), $.done());
!(async () => {
    let authorCodeList = ["1660828183646347266","1660828254707990530","1660828324717805569","1660828395934404609"]
    $.activityId = "XMHeartMoment0521DConb";
    $.shareId = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
    $.openId="ture";
    if (!l11lIil1[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    for (let liiiIll = 0; liiiIll < l11lIil1.length; liiiIll++) {
        if (l11lIil1[liiiIll]) {
            IlliiIlI = l11lIil1[liiiIll];
            $.ownCookie = l11lIil1[liiiIll];
            $.UserName = decodeURIComponent(IlliiIlI.match(/pt_pin=(.+?);/) && IlliiIlI.match(/pt_pin=(.+?);/)[1]);
            $.index = liiiIll + 1;
            $.isLogin = true;
            $.nickName = "";
            console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
                    "open-url": "https://bean.m.jd.com/"
                });
                $.isNode() && (await i1I1ii1l.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }
            await i1ii1lil();
            await i111ll1l();
            if ($.hasEnd || $.activityEnd) break;
        }
    }
})().catch(I1i1li1l => {
    $.log("", " " + $.name + ", 失败! 原因: " + I1i1li1l + "!", "");
}).finally(() => {
    $.done();
});
async function i111ll1l() {
    $.shopid = 1000004123;
    $.token = "";
    $.token = await I1liIiil(IlliiIlI, iIlIllil);
    if ($.token == "") {
        console.log("获取[token]失败！");
        return;
    }
    await IIilll1I();
    if ($.tokens) {
        await llIIIIiI();
        console.log("目前积分：" + $.points);
        await i11lilI1();
        await lliIiii1();
        await l1lIIiiI();
        await iIIIllli();
        for (const lIlill1l of $.detail) {
            $.jobDetail = lIlill1l.config;
            await l1iiIill();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
        if ($.points2 >= 1) {
            let ii11IllI = parseInt($.points2 / 1);
            console.log("抽奖次数为" + ii11IllI + "次");
            for (m = 1; ii11IllI--; m++) {
                await i111lIli();
                if (Number(ii11IllI) <= 0) break;
                if (m >= 3) {
                    console.log("抽奖太多次，多余的次数请再执行脚本");
                    break;
                }
                await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
        }
        await Ii1111lI();
        $.index == 1 && ($.shareId = $.joinId, console.log("后面的号都会助力 -> " + $.shareId));
        $.openId == "ture" && (await iiIillii(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await lIi11I(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    }
}
function IIilll1I() {
    return new Promise(I1i1Ili1 => {
        let ll1IiI = {
            "shopId": $.shopid,
            "token": $.token,
            "source": "01"
        };
        $.post(iiIIIlil("/webc/login/userLogin", ll1IiI), async (I1i1Iii1, li1liI, ili1i1II) => {
            try {
                I1i1Iii1 ? (console.log("" + JSON.stringify(I1i1Iii1)), console.log($.name + " userLogin API请求失败，请检查网路重试")) : (ili1i1II = JSON.parse(ili1i1II), ili1i1II && ili1i1II.success && ($.tokens = ili1i1II.data));
            } catch (IiIlll) {
                $.logErr(IiIlll, li1liI);
            } finally {
                I1i1Ili1();
            }
        });
    });
}
function llIIIIiI() {
    return new Promise(il1IliIi => {
        let li11ii1i = {
            "activeId": $.activityId,
            "shareId": $.shareId
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/active", li11ii1i), async (l11Iil1l, IIi1l1l, lIIIi1l1) => {
            try {
                l11Iil1l ? (console.log("" + JSON.stringify(l11Iil1l)), console.log($.name + " active API请求失败，请检查网路重试")) : (lIIIi1l1 = JSON.parse(lIIIi1l1), lIIIi1l1 && lIIIi1l1.success && ($.joinId = lIIIi1l1.data.userVO.joinId || "", $.points2 = lIIIi1l1.data.userVO.points2 || 0, $.points = lIIIi1l1.data.userVO.points || 0, $.detail = lIIIi1l1.data.jobMap.viewWare.details || []));
            } catch (Ii11ii1) {
                $.logErr(Ii11ii1, IIi1l1l);
            } finally {
                il1IliIi();
            }
        });
    });
}
function lliIiii1() {
    return new Promise(Ii1llI => {
        let Iii1IiI = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "jobForm": 22,
            "jobDetail": "100052892476"
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/job", Iii1IiI), async (IIIIIlii, IIilIlI, iI1IilII) => {
            try {
                if (IIIIIlii) {
                    console.log("" + JSON.stringify(IIIIIlii));
                    console.log($.name + " job API请求失败，请检查网路重试");
                } else {
                    iI1IilII = JSON.parse(iI1IilII);
                    if (iI1IilII && iI1IilII.success) {
                        $.val = iI1IilII.data.val || 0;
                        $.awardName = iI1IilII.data.awardName || "";
                        console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName);
                    }
                }
            } catch (I11I1IiI) {
                $.logErr(I11I1IiI, IIilIlI);
            } finally {
                Ii1llI();
            }
        });
    });
}
function Ii1111lI() {
    return new Promise(ill1il => {
        let lI1IlIIl = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "shareId": $.shareId
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/share", lI1IlIIl), async (l1llIlIl, iil1IllI, l111I1lI) => {
            try {
                l1llIlIl ? (console.log("" + JSON.stringify(l1llIlIl)), console.log($.name + " share API请求失败，请检查网路重试")) : (l111I1lI = JSON.parse(l111I1lI), l111I1lI && l111I1lI.success && ($.helpStatus = l111I1lI.data.helpStatus || 0, $.awardName = l111I1lI.data.awardName || 0, console.log("助力状态：" + $.helpStatus + "  获得豆子： " + $.awardName)));
            } catch (li1i11l) {
                $.logErr(li1i11l, iil1IllI);
            } finally {
                ill1il();
            }
        });
    });
}
function iiIillii() {
    return new Promise(I11ilIil => {
        let I1IlliIl = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "shareId": "1660686822156353538"
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/share", I1IlliIl), async (iiiIi1II, iIiIil1i, I1l1iiII) => {
            try {
                if (iiiIi1II) { } else {
                    I1l1iiII = JSON.parse(I1l1iiII);
                    I1l1iiII && I1l1iiII.success && ($.helpStatus = I1l1iiII.data.helpStatus || 0, $.awardName = I1l1iiII.data.awardName || 0);
                }
            } catch (lii1lIiI) {
                $.logErr(lii1lIiI, iIiIil1i);
            } finally {
                I11ilIil();
            }
        });
    });
}
function lIi11I() {
    return new Promise(I1II1Iil => {
        let iilIllli = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "shareId": "1660686822156353538"
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/share", iilIllli), async (lIiI11Il, iIiiiiii, lli11Il) => {
            try {
                if (lIiI11Il) { } else {
                    lli11Il = JSON.parse(lli11Il);
                    lli11Il && lli11Il.success && ($.helpStatus = lli11Il.data.helpStatus || 0, $.awardName = lli11Il.data.awardName || 0);
                }
            } catch (iIIi11lI) {
                $.logErr(iIIi11lI, iIiiiiii);
            } finally {
                I1II1Iil();
            }
        });
    });
}
function l1lIIiiI() {
    return new Promise(I1lIilI => {
        let lIiIlil1 = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "jobForm": 3,
            "jobDetail": 100055352719
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/job", lIiIlil1), async (iI1iiii, i1i1i1I, Iill1lII) => {
            try {
                iI1iiii ? (console.log("" + JSON.stringify(iI1iiii)), console.log($.name + " job1 API请求失败，请检查网路重试")) : (Iill1lII = JSON.parse(Iill1lII), Iill1lII && Iill1lII.success && ($.val = Iill1lII.data.val || 0, $.awardName = Iill1lII.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
            } catch (Iillll11) {
                $.logErr(Iillll11, i1i1i1I);
            } finally {
                I1lIilI();
            }
        });
    });
}
function iIIIllli() {
    return new Promise(IIII1l1 => {
        let ilIIl1il = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "jobForm": 1,
            "jobDetail": "1000004123"
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/job", ilIIl1il), async (iI1lllI1, ill11111, iIiI1IIi) => {
            try {
                iI1lllI1 ? (console.log("" + JSON.stringify(iI1lllI1)), console.log($.name + " job API请求失败，请检查网路重试")) : (iIiI1IIi = JSON.parse(iIiI1IIi), iIiI1IIi && iIiI1IIi.success && ($.val = iIiI1IIi.data.val || 0, $.awardName = iIiI1IIi.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
            } catch (i11liii1) {
                $.logErr(i11liii1, ill11111);
            } finally {
                IIII1l1();
            }
        });
    });
}
function iIi1ll1i() {
    return new Promise(II11l1I => {
        let IiI1lilI = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "jobForm": 0,
            "jobDetail": "1"
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/job", IiI1lilI), async (ii111lIl, l1Il1iil, lllliiii) => {
            try {
                ii111lIl ? (console.log("" + JSON.stringify(ii111lIl)), console.log($.name + " job API请求失败，请检查网路重试")) : (lllliiii = JSON.parse(lllliiii), lllliiii && lllliiii.success && ($.val = lllliiii.data.val || 0, $.awardName = lllliiii.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
            } catch (liiil1il) {
                $.logErr(liiil1il, l1Il1iil);
            } finally {
                II11l1I();
            }
        });
    });
}
function l1iiIill() {
    return new Promise(llIll11I => {
        let iII11ili = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "jobForm": 4,
            "jobDetail": $.jobDetail
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/job", iII11ili), async (iiIIl1il, ilIlii, iiI1iIII) => {
            try {
                iiIIl1il ? (console.log("" + JSON.stringify(iiIIl1il)), console.log($.name + " job API请求失败，请检查网路重试")) : (iiI1iIII = JSON.parse(iiI1iIII), iiI1iIII && iiI1iIII.success && ($.val = iiI1iIII.data.val || 0, $.awardName = iiI1iIII.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
            } catch (IliiIIi1) {
                $.logErr(IliiIIi1, ilIlii);
            } finally {
                llIll11I();
            }
        });
    });
}
function i111lIli() {
    return new Promise(iIiIi1ll => {
        let iiI1ii = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "lotteryForm": 0
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/lottery", iiI1ii), async (ii1I11ii, l1lllIli, lI1Iiiil) => {
            try {
                ii1I11ii ? (console.log("" + JSON.stringify(ii1I11ii)), console.log($.name + " lottery API请求失败，请检查网路重试")) : (lI1Iiiil = JSON.parse(lI1Iiiil), lI1Iiiil.data != null && lI1Iiiil.success ? console.log("获得奖品： " + lI1Iiiil.data.awardName) : console.log("空气 "));
            } catch (I1I11l1I) {
                $.logErr(I1I11l1I, l1lllIli);
            } finally {
                iIiIi1ll();
            }
        });
    });
}
function i11lilI1() {
    return new Promise(li1i1li => {
        let iIiill11 = {
            "activeId": $.activityId,
            "joinId": $.joinId,
            "lotteryForm": 2
        };
        $.post(ii1I1ii("/webc/XMHeartMoment/lottery", iIiill11), async (li1lI1Ii, liiI1ill, lil1llll) => {
            try {
                if (li1lI1Ii) {
                    console.log("" + JSON.stringify(li1lI1Ii));
                    console.log($.name + " lottery API请求失败，请检查网路重试");
                } else {
                    lil1llll = JSON.parse(lil1llll);
                    if (lil1llll.data != null && lil1llll.success) console.log("获得奖品： " + lil1llll.data.awardName); else {
                        console.log("空气 ");
                    }
                }
            } catch (Il11l1I) {
                $.logErr(Il11l1I, liiI1ill);
            } finally {
                li1i1li();
            }
        });
    });
}
function lli1Ii1I(i1II11l1) {
    return new Promise(liI1iII1 => {
        const lI1Illl1 = {
            "url": i1II11l1 + "?" + new Date(),
            "timeout": 10000,
            "headers": {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(lI1Illl1, async (iII1iIl1, liliiII1, i1IiIi1I) => {
            try {
                if (iII1iIl1) $.getAuthorCodeListerr = false; else {
                    if (i1IiIi1I) i1IiIi1I = JSON.parse(i1IiIi1I);
                    $.getAuthorCodeListerr = true;
                }
            } catch (Ili1lIil) {
                $.logErr(Ili1lIil, liliiII1);
                i1IiIi1I = null;
            } finally {
                liI1iII1(i1IiIi1I);
            }
        });
    });
}
function ii1I1ii(lIIlilI, I1IIl11l) {
    return {
        "url": "" + iIlIllil + lIIlilI,
        "body": JSON.stringify(I1IIl11l),
        "headers": {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Connection": "keep-alive",
            "Cookie": IlliiIlI,
            "Host": "szxyun-rc.isvjcloud.com",
            "Content-Type": "application/json;charset=UTF-8",
            "jd-fast-token": $.tokens,
            "Origin": "https://szxyun-rc.isvjcloud.com",
            "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
            "User-Agent": $.UA
        }
    };
}
function iiIIIlil(iiilii, lil1i11I) {
    return {
        "url": "" + iIlIllil + iiilii,
        "body": JSON.stringify(lil1i11I),
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Connection": "keep-alive",
            "Cookie": IlliiIlI,
            "Content-Type": "application/json;charset=UTF-8",
            "jd-fast-token": "null",
            "Host": "szxyun-rc.isvjcloud.com",
            "Origin": "https://szxyun-rc.isvjcloud.com",
            "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
            "User-Agent": $.UA
        },
        "timeout": 5 * 2000
    };
}
function i1ii1lil() {
    $.UA = "jdapp;iPhone;10.2.2;14.3;" + iili1I1l(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function iili1I1l(iI1l1IIl) {
    iI1l1IIl = iI1l1IIl || 32;
    let l1iIiIiI = "abcdef0123456789",
        i1iiIll = l1iIiIiI.length,
        IliIii1 = "";
    for (i = 0; i < iI1l1IIl; i++) IliIii1 += l1iIiIiI.charAt(Math.floor(Math.random() * i1iiIll));
    return IliIii1;
}
function il111l11(IiI1ii1) {
    if (!IiI1ii1) return console.log("京东服务器返回数据为空"), false;
    try {
        if (typeof JSON.parse(IiI1ii1) == "object") {
            return true;
        }
    } catch (i111Ilil) {
        return console.log(i111Ilil), false;
    }
}
function iI1liii1(iIIlllI1) {
    if (typeof iIIlllI1 == "string") try {
        return JSON.parse(iIIlllI1);
    } catch (lIi1liII) {
        return console.log(lIi1liII), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function IillilI1(ililliIl, I11I1ii1) {
    return Math.floor(Math.random() * (I11I1ii1 - ililliIl)) + ililliIl;
}