/*
预约抽奖赢新品

cron:59 59 23 13-16 9 *
============Quantumultx===============
[task_local]
#预约抽奖赢新品
59 59 23 13-16 9 * jd_yy.js, tag=预约抽奖赢新品, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env('预约抽奖赢新品');
const l1lillll = $.isNode() ? require("./sendNotify") : "",
  ii1l1111 = $.isNode() ? require("./jdCookie.js") : "",
  lIlIiII = require("./function/krgetToken");
let l1l1I11I = "https://szxyun-rc.isvjcloud.com",
  Ili111l1 = [],
  ilI1i1ii = "";
if ($.isNode()) {
  if (process.env.jd_szxyun_teamId) $.teamId = process.env.jd_szxyun_teamId;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(ii1l1111).forEach(I1iiiiI1 => {
    Ili111l1.push(ii1l1111[I1iiiiI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Ili111l1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(li1ll11I => li1ll11I.cookie)].filter(i1lIi1I => !!i1lIi1I);
let IiI11iii = typeof $request !== "undefined";
IiI11iii && (GetCookie(), $.done());
!(async () => {
  authorCodeList = await Ili1Ii1l("http://code.kingran.cf/1.json");
  authorCodeList ? (console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.shareId = authorCodeList[0].id, $.openId = authorCodeList[0].openid) : ($.openId = true, console.log("❖ 准备就绪...\n"));
  $.activityId = "XMColCard230818Jcipm";
  if (!Ili111l1[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let li1lIIi = 0; li1lIIi < Ili111l1.length; li1lIIi++) {
    if (Ili111l1[li1lIIi]) {
      ilI1i1ii = Ili111l1[li1lIIi];
      $.ownCookie = Ili111l1[li1lIIi];
      $.UserName = decodeURIComponent(ilI1i1ii.match(/pt_pin=(.+?);/) && ilI1i1ii.match(/pt_pin=(.+?);/)[1]);
      $.index = li1lIIi + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await l1lillll.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await l1lli1Il();
      await iii1III1();
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(l1i1IIIi => {
  $.log("", " " + $.name + ", 失败! 原因: " + l1i1IIIi + "!", "");
}).finally(() => {
  $.done();
});
async function iii1III1() {
  $.shopid = 1000004123;
  $.token = "";
  $.token = await lIlIiII(ilI1i1ii, l1l1I11I);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await ii11iili();
  if ($.tokens) {
    await l1IlI11l();
    console.log("目前积分：" + $.points);
    await i11lIiiI();
    await iIII1iI1();
    await l1lII1l();
    await II111i();
    await ilIlIiII();
    for (const I11i1ll of $.detail) {
      $.jobDetail = I11i1ll.config;
      await i1l1lilI();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    if ($.points2 >= 1) {
      let l1l1Iil1 = parseInt($.points2 / 1);
      console.log("抽奖次数为" + l1l1Iil1 + "次");
      for (m = 1; l1l1Iil1--; m++) {
        await l1illIll();
        if (Number(l1l1Iil1) <= 0) break;
        if (m >= 3) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    } else console.log("未集齐卡片，无法抽奖");
    await lllIi();
    $.index == 1 && ($.shareId = $.joinId, console.log("后面的号都会助力 -> " + $.shareId));
    $.openId == "ture" && (await lIIllilI(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await il1i11i1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 55000, 10));
  }
}
function ii11iili() {
  return new Promise(IIl1iii => {
    let IIIllI11 = {
      "shopId": $.shopid,
      "token": $.token,
      "source": "01"
    };
    $.post(I1IIili1("/webc/login/userLogin", IIIllI11), async (iI11l, il11Ii, iliiIl1l) => {
      try {
        iI11l ? (console.log("" + JSON.stringify(iI11l)), console.log($.name + " userLogin API请求失败，请检查网路重试")) : (iliiIl1l = JSON.parse(iliiIl1l), iliiIl1l && iliiIl1l.success && ($.tokens = iliiIl1l.data));
      } catch (lii11II1) {
        $.logErr(lii11II1, il11Ii);
      } finally {
        IIl1iii();
      }
    });
  });
}
function l1IlI11l() {
  return new Promise(iIIIi1l => {
    let l11111ll = {
      "activeId": $.activityId,
      "shareId": $.shareId
    };
    $.post(liIl1I1("/webc/XMColCard/active", l11111ll), async (llIiiII1, ll1lli1, illlil) => {
      try {
        llIiiII1 ? (console.log("" + JSON.stringify(llIiiII1)), console.log($.name + " active API请求失败，请检查网路重试")) : (illlil = JSON.parse(illlil), illlil && illlil.success && ($.joinId = illlil.data.userVO.joinId || "", $.points2 = illlil.data.userVO.points2 || 0, $.points = illlil.data.userVO.points || 0, $.detail = illlil.data.jobMap.viewWare.details || []));
      } catch (lilIili1) {
        $.logErr(lilIili1, ll1lli1);
      } finally {
        iIIIi1l();
      }
    });
  });
}
function iIII1iI1() {
  return new Promise(lll1II1l => {
    let lII111i = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 6,
      "jobDetail": "100061563382"
    };
    $.post(liIl1I1("/webc/XMColCard/job", lII111i), async (lIlii1I1, iI1I1ii1, i1lIll11) => {
      try {
        lIlii1I1 ? (console.log("" + JSON.stringify(lIlii1I1)), console.log($.name + " job API请求失败，请检查网路重试")) : (i1lIll11 = JSON.parse(i1lIll11), i1lIll11 && i1lIll11.success && ($.val = i1lIll11.data.val || 0, $.awardName = i1lIll11.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (I1iil1iI) {
        $.logErr(I1iil1iI, iI1I1ii1);
      } finally {
        lll1II1l();
      }
    });
  });
}
function i11lIiiI() {
  return new Promise(Iili1I1l => {
    let IiiiII1l = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 22,
      "jobDetail": "100061869612"
    };
    $.post(liIl1I1("/webc/XMColCard/job", IiiiII1l), async (l1Iil1, l1i11i1, liII1lI1) => {
      try {
        l1Iil1 ? (console.log("" + JSON.stringify(l1Iil1)), console.log($.name + " job API请求失败，请检查网路重试")) : (liII1lI1 = JSON.parse(liII1lI1), liII1lI1 && liII1lI1.success && ($.val = liII1lI1.data.val || 0, $.awardName = liII1lI1.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (lIIIilll) {
        $.logErr(lIIIilll, l1i11i1);
      } finally {
        Iili1I1l();
      }
    });
  });
}
function ilIlIiII() {
  return new Promise(ilIlllil => {
    let IIlliiII = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 0,
      "jobDetail": "1"
    };
    $.post(liIl1I1("/webc/XMColCard/job", IIlliiII), async (i1ll11I, i1iilIIi, I11lIliI) => {
      try {
        i1ll11I ? (console.log("" + JSON.stringify(i1ll11I)), console.log($.name + " job API请求失败，请检查网路重试")) : (I11lIliI = JSON.parse(I11lIliI), I11lIliI && I11lIliI.success && ($.val = I11lIliI.data.val || 0, $.awardName = I11lIliI.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (liil11) {
        $.logErr(liil11, i1iilIIi);
      } finally {
        ilIlllil();
      }
    });
  });
}
function lllIi() {
  return new Promise(l11iIill => {
    let il11Ilii = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": $.shareId
    };
    $.post(liIl1I1("/webc/XMColCard/share", il11Ilii), async (IlIl1l11, i11Iii1i, iii1Ii1l) => {
      try {
        IlIl1l11 ? (console.log("" + JSON.stringify(IlIl1l11)), console.log($.name + " share API请求失败，请检查网路重试")) : (iii1Ii1l = JSON.parse(iii1Ii1l), iii1Ii1l && iii1Ii1l.success && ($.helpStatus = iii1Ii1l.data.helpStatus || 0, $.awardName = iii1Ii1l.data.awardName || 0, console.log("助力状态：" + $.helpStatus + "  获得豆子： " + $.awardName)));
      } catch (i1i11III) {
        $.logErr(i1i11III, i11Iii1i);
      } finally {
        l11iIill();
      }
    });
  });
}
function lIIllilI() {
  return new Promise(lliIII1I => {
    let lIIlIlil = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1700335641510969346"
    };
    $.post(liIl1I1("/webc/XMColCard/share", lIIlIlil), async (I1iii1iI, iil1ilII, l1i1li1) => {
      try {
        if (I1iii1iI) {} else l1i1li1 = JSON.parse(l1i1li1), l1i1li1 && l1i1li1.success && ($.helpStatus = l1i1li1.data.helpStatus || 0, $.awardName = l1i1li1.data.awardName || 0);
      } catch (lIIli1li) {
        $.logErr(lIIli1li, iil1ilII);
      } finally {
        lliIII1I();
      }
    });
  });
}
function iIiI1I1l() {
  return new Promise(iiIlIiii => {
    let IIil1ilI = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1700340266788335617"
    };
    $.post(liIl1I1("/webc/XMColCard/share", IIil1ilI), async (lI11iIi1, Il1Ii1Ii, Iiliii1i) => {
      try {
        if (lI11iIi1) {} else {
          Iiliii1i = JSON.parse(Iiliii1i);
          Iiliii1i && Iiliii1i.success && ($.helpStatus = Iiliii1i.data.helpStatus || 0, $.awardName = Iiliii1i.data.awardName || 0);
        }
      } catch (I111iiiI) {
        $.logErr(I111iiiI, Il1Ii1Ii);
      } finally {
        iiIlIiii();
      }
    });
  });
}
function il1i11i1() {
  return new Promise(Ii11I11I => {
    let ili11i1i = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1700332121936506881"
    };
    $.post(liIl1I1("/webc/XMColCard/share", ili11i1i), async (i1lii1iI, lill1Ii, iIilllli) => {
      try {
        if (i1lii1iI) {} else iIilllli = JSON.parse(iIilllli), iIilllli && iIilllli.success && ($.helpStatus = iIilllli.data.helpStatus || 0, $.awardName = iIilllli.data.awardName || 0);
      } catch (li1liI1I) {
        $.logErr(li1liI1I, lill1Ii);
      } finally {
        Ii11I11I();
      }
    });
  });
}
function l1lII1l() {
  return new Promise(lIi1lIii => {
    let iilIiIII = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 3,
      "jobDetail": "100061869612"
    };
    $.post(liIl1I1("/webc/XMColCard/job", iilIiIII), async (IIll1Ii, llillI11, II1IiIiI) => {
      try {
        IIll1Ii ? (console.log("" + JSON.stringify(IIll1Ii)), console.log($.name + " job1 API请求失败，请检查网路重试")) : (II1IiIiI = JSON.parse(II1IiIiI), II1IiIiI && II1IiIiI.success && ($.val = II1IiIiI.data.val || 0, $.awardName = II1IiIiI.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (I1iiI1Il) {
        $.logErr(I1iiI1Il, llillI11);
      } finally {
        lIi1lIii();
      }
    });
  });
}
function II111i() {
  return new Promise(lliI1Il => {
    let i11lIl1 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 1,
      "jobDetail": "1000004123"
    };
    $.post(liIl1I1("/webc/XMColCard/job", i11lIl1), async (I1Ii1lI1, iIi11Iii, lllI1ilI) => {
      try {
        I1Ii1lI1 ? (console.log("" + JSON.stringify(I1Ii1lI1)), console.log($.name + " job API请求失败，请检查网路重试")) : (lllI1ilI = JSON.parse(lllI1ilI), lllI1ilI && lllI1ilI.success && ($.val = lllI1ilI.data.val || 0, $.awardName = lllI1ilI.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (iiI1lII) {
        $.logErr(iiI1lII, iIi11Iii);
      } finally {
        lliI1Il();
      }
    });
  });
}
function i1l1lilI() {
  return new Promise(Ii11iIIl => {
    let I1liii1I = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 4,
      "jobDetail": $.jobDetail
    };
    $.post(liIl1I1("/webc/XMColCard/job", I1liii1I), async (i1lIlliI, i1l1IIi, liliI1ii) => {
      try {
        i1lIlliI ? (console.log("" + JSON.stringify(i1lIlliI)), console.log($.name + " job API请求失败，请检查网路重试")) : (liliI1ii = JSON.parse(liliI1ii), liliI1ii && liliI1ii.success && ($.val = liliI1ii.data.val || 0, $.awardName = liliI1ii.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (lliIiIlI) {
        $.logErr(lliIiIlI, i1l1IIi);
      } finally {
        Ii11iIIl();
      }
    });
  });
}
function l1illIll() {
  return new Promise(i1i1I111 => {
    let lIIl1ili = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "lotteryForm": 2
    };
    $.post(liIl1I1("/webc/XMColCard/lottery", lIIl1ili), async (iIill111, il111Iil, i1IiiIli) => {
      try {
        iIill111 ? (console.log("" + JSON.stringify(iIill111)), console.log($.name + " lottery API请求失败，请检查网路重试")) : (i1IiiIli = JSON.parse(i1IiiIli), i1IiiIli.data != null && i1IiiIli.success ? console.log("获得奖品： " + i1IiiIli.data.awardName) : console.log("空气 "));
      } catch (i1ii1iii) {
        $.logErr(i1ii1iii, il111Iil);
      } finally {
        i1i1I111();
      }
    });
  });
}
function Ili1Ii1l(iili1i11) {
  return new Promise(i1IIIlIl => {
    const lil1iiii = {
      "url": "" + iili1i11,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lil1iiii, async (i1l1iI, illlI11, llI11l1l) => {
      try {
        if (i1l1iI) {} else {
          if (llI11l1l) llI11l1l = JSON.parse(llI11l1l);else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (l1liIl) {
        $.logErr(l1liIl, illlI11);
        llI11l1l = null;
      } finally {
        i1IIIlIl(llI11l1l);
      }
    });
  });
}
function liIl1I1(lI1Ii1lI, lI1liIi) {
  return {
    "url": "" + l1l1I11I + lI1Ii1lI,
    "body": JSON.stringify(lI1liIi),
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": ilI1i1ii,
      "Host": "szxyun-rc.isvjcloud.com",
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": $.tokens,
      "Origin": "https://szxyun-rc.isvjcloud.com",
      "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    }
  };
}
function I1IIili1(l1Ililll, I1IiiII) {
  return {
    "url": "" + l1l1I11I + l1Ililll,
    "body": JSON.stringify(I1IiiII),
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": ilI1i1ii,
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
function l1lli1Il() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + I1ili1lI(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function I1ili1lI(i1l1ii) {
  i1l1ii = i1l1ii || 32;
  let l1iiIi = "abcdef0123456789",
    iiIli111 = l1iiIi.length,
    IIiilII = "";
  for (i = 0; i < i1l1ii; i++) IIiilII += l1iiIi.charAt(Math.floor(Math.random() * iiIli111));
  return IIiilII;
}
function l1i1llIl(II1Ill1) {
  if (!II1Ill1) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(II1Ill1) == "object") {
      return true;
    }
  } catch (il1111lI) {
    return console.log(il1111lI), false;
  }
}
function liiiI1ll(ll1llI1) {
  if (typeof ll1llI1 == "string") {
    try {
      return JSON.parse(ll1llI1);
    } catch (Iil1ll1i) {
      return console.log(Iil1ll1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function l1iIlI1I(li1ilIii, il1illI) {
  return Math.floor(Math.random() * (il1illI - li1ilIii)) + li1ilIii;
}