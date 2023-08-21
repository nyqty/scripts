/*
预约抽奖赢新品

cron:59 59 23 9-16  8 *
============Quantumultx===============
[task_local]
#预约抽奖赢新品
59 59 23 9-16  8 * jd_xm.js, tag=预约抽奖赢新品, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("预约抽奖赢新品");
const iliI11 = $.isNode() ? require("./sendNotify") : "",
  ii1iI1 = $.isNode() ? require("./jdCookie.js") : "",
  ll111I = require("./function/krgetToken");
let liIl1I = "https://szxyun-rc.isvjcloud.com",
  IIl111 = [],
  lill = "";
if ($.isNode()) {
  if (process.env.jd_szxyun_teamId) $.teamId = process.env.jd_szxyun_teamId;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(ii1iI1).forEach(illIII => {
    IIl111.push(ii1iI1[illIII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIl111 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(iliI1l => iliI1l.cookie)].filter(ii1iIi => !!ii1iIi);
let IliliI = typeof $request !== "undefined";
IliliI && (GetCookie(), $.done());
!(async () => {
  authorCodeList = await iIiil("http://code.kingran.cf/1.json");
  authorCodeList ? (console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.shareId = authorCodeList[0].id, $.openId = authorCodeList[0].openid) : ($.openId = true, console.log("❖ 准备就绪...\n"));
  $.activityId = "XMBooking0809PCNcbnc";
  if (!IIl111[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let l1Illl = 0; l1Illl < IIl111.length; l1Illl++) {
    if (IIl111[l1Illl]) {
      lill = IIl111[l1Illl];
      $.ownCookie = IIl111[l1Illl];
      $.UserName = decodeURIComponent(lill.match(/pt_pin=(.+?);/) && lill.match(/pt_pin=(.+?);/)[1]);
      $.index = l1Illl + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await iliI11.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await ll111i();
      await iliI1I();
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(liIl1i => {
  $.log("", " " + $.name + ", 失败! 原因: " + liIl1i + "!", "");
}).finally(() => {
  $.done();
});
async function iliI1I() {
  $.shopid = 1000004123;
  $.token = "";
  $.token = await ll111I(lill, liIl1I);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await ii1iII();
  if ($.tokens) {
    await ll1111();
    console.log("目前积分：" + $.points);
    await i11IIl();
    await liIl11();
    await Il1iii();
    await iIiii();
    await IIl11I();
    for (const iIllI of $.detail) {
      $.jobDetail = iIllI.config;
      await IIiIIl();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    if ($.points2 >= 1) {
      let i1I11I = parseInt($.points2 / 1);
      console.log("抽奖次数为" + i1I11I + "次");
      for (m = 1; i1I11I--; m++) {
        await Il1iil();
        if (Number(i1I11I) <= 0) break;
        if (m >= 3) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    }
    await i11IIi();
    $.index == 1 && ($.shareId = $.joinId, console.log("后面的号都会助力 -> " + $.shareId));
    $.openId == "ture" && (await Il1ii1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await illII1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
  }
}
function ii1iII() {
  return new Promise(Ii1llI => {
    let lI1l = {
      "shopId": $.shopid,
      "token": $.token,
      "source": "01"
    };
    $.post(lilI("/webc/login/userLogin", lI1l), async (iIll1, l11li1, i1I) => {
      try {
        iIll1 ? (console.log("" + JSON.stringify(iIll1)), console.log($.name + " userLogin API请求失败，请检查网路重试")) : (i1I = JSON.parse(i1I), i1I && i1I.success && ($.tokens = i1I.data));
      } catch (iIlil) {
        $.logErr(iIlil, l11li1);
      } finally {
        Ii1llI();
      }
    });
  });
}
function ll1111() {
  return new Promise(IIlIli => {
    let l11liI = {
      "activeId": $.activityId,
      "shareId": $.shareId
    };
    $.post(IIiIIi("/webc/XMBooking/active", l11liI), async (li11Ii, lIiIII, i1i) => {
      try {
        li11Ii ? (console.log("" + JSON.stringify(li11Ii)), console.log($.name + " active API请求失败，请检查网路重试")) : (i1i = JSON.parse(i1i), i1i && i1i.success && ($.joinId = i1i.data.userVO.joinId || "", $.points2 = i1i.data.userVO.points2 || 0, $.points = i1i.data.userVO.points || 0, $.detail = i1i.data.jobMap.viewWare.details || []));
      } catch (i1l) {
        $.logErr(i1l, lIiIII);
      } finally {
        IIlIli();
      }
    });
  });
}
function liIl11() {
  return new Promise(ll1IIi => {
    let ll1IIl = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 6,
      "jobDetail": "100061563382"
    };
    $.post(IIiIIi("/webc/XMBooking/job", ll1IIl), async (l11ll1, iIlllI, iIli1) => {
      try {
        l11ll1 ? (console.log("" + JSON.stringify(l11ll1)), console.log($.name + " job API请求失败，请检查网路重试")) : (iIli1 = JSON.parse(iIli1), iIli1 && iIli1.success && ($.val = iIli1.data.val || 0, $.awardName = iIli1.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (iIllii) {
        $.logErr(iIllii, iIlllI);
      } finally {
        ll1IIi();
      }
    });
  });
}
function i11IIl() {
  return new Promise(iIlliI => {
    let IIlIi1 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 6,
      "jobDetail": "100064627893"
    };
    $.post(IIiIIi("/webc/XMBooking/job", IIlIi1), async (l1II1i, lili11, lIllIi) => {
      try {
        l1II1i ? (console.log("" + JSON.stringify(l1II1i)), console.log($.name + " job API请求失败，请检查网路重试")) : (lIllIi = JSON.parse(lIllIi), lIllIi && lIllIi.success && ($.val = lIllIi.data.val || 0, $.awardName = lIllIi.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (l1II11) {
        $.logErr(l1II11, lili11);
      } finally {
        iIlliI();
      }
    });
  });
}
function IIl11I() {
  return new Promise(lI1i11 => {
    let i1iiII = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 0,
      "jobDetail": "1"
    };
    $.post(IIiIIi("/webc/XMBooking/job", i1iiII), async (l111Il, I1III, l1II1I) => {
      try {
        l111Il ? (console.log("" + JSON.stringify(l111Il)), console.log($.name + " job API请求失败，请检查网路重试")) : (l1II1I = JSON.parse(l1II1I), l1II1I && l1II1I.success && ($.val = l1II1I.data.val || 0, $.awardName = l1II1I.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (il1lIi) {
        $.logErr(il1lIi, I1III);
      } finally {
        lI1i11();
      }
    });
  });
}
function i11IIi() {
  return new Promise(ii11il => {
    let iIi111 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": $.shareId
    };
    $.post(IIiIIi("/webc/XMBooking/share", iIi111), async (i111li, lIlIiI, I11lli) => {
      try {
        i111li ? (console.log("" + JSON.stringify(i111li)), console.log($.name + " share API请求失败，请检查网路重试")) : (I11lli = JSON.parse(I11lli), I11lli && I11lli.success && ($.helpStatus = I11lli.data.helpStatus || 0, $.awardName = I11lli.data.awardName || 0, console.log("助力状态：" + $.helpStatus + "  获得豆子： " + $.awardName)));
      } catch (I11lll) {
        $.logErr(I11lll, lIlIiI);
      } finally {
        ii11il();
      }
    });
  });
}
function Il1ii1() {
  return new Promise(iIiIi1 => {
    let li1lil = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1689214822862581761"
    };
    $.post(IIiIIi("/webc/XMBooking/share", li1lil), async (IiIl11, I1l1i, lIiIIl) => {
      try {
        if (IiIl11) {} else {
          lIiIIl = JSON.parse(lIiIIl);
          if (lIiIIl && lIiIIl.success) {
            $.helpStatus = lIiIIl.data.helpStatus || 0;
            $.awardName = lIiIIl.data.awardName || 0;
          }
        }
      } catch (i111l1) {
        $.logErr(i111l1, I1l1i);
      } finally {
        iIiIi1();
      }
    });
  });
}
function illII1() {
  return new Promise(ilI1I => {
    let il1Iil = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1689214877543727106"
    };
    $.post(IIiIIi("/webc/XMBooking/share", il1Iil), async (ii11ll, il1Iii, lili1l) => {
      try {
        if (ii11ll) {} else lili1l = JSON.parse(lili1l), lili1l && lili1l.success && ($.helpStatus = lili1l.data.helpStatus || 0, $.awardName = lili1l.data.awardName || 0);
      } catch (iI1Il) {
        $.logErr(iI1Il, il1Iii);
      } finally {
        ilI1I();
      }
    });
  });
}
function Il1iii() {
  return new Promise(iI1II => {
    let I1li1I = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 3,
      "jobDetail": 1
    };
    $.post(IIiIIi("/webc/XMBooking/job", I1li1I), async (IIiII, iiiI, I1li11) => {
      try {
        if (IIiII) console.log("" + JSON.stringify(IIiII)), console.log($.name + " job1 API请求失败，请检查网路重试");else {
          I1li11 = JSON.parse(I1li11);
          if (I1li11 && I1li11.success) {
            $.val = I1li11.data.val || 0;
            $.awardName = I1li11.data.awardName || "";
            console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName);
          }
        }
      } catch (l1IiiI) {
        $.logErr(l1IiiI, iiiI);
      } finally {
        iI1II();
      }
    });
  });
}
function iIiii() {
  return new Promise(ll1I1i => {
    let ll1I1l = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 1,
      "jobDetail": "1000004123"
    };
    $.post(IIiIIi("/webc/XMBooking/job", ll1I1l), async (i1ii1i, iiii, iiil) => {
      try {
        i1ii1i ? (console.log("" + JSON.stringify(i1ii1i)), console.log($.name + " job API请求失败，请检查网路重试")) : (iiil = JSON.parse(iiil), iiil && iiil.success && ($.val = iiil.data.val || 0, $.awardName = iiil.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (i1liIi) {
        $.logErr(i1liIi, iiii);
      } finally {
        ll1I1i();
      }
    });
  });
}
function IIiIIl() {
  return new Promise(lIlIii => {
    let I11lil = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 4,
      "jobDetail": $.jobDetail
    };
    $.post(IIiIIi("/webc/XMBooking/job", I11lil), async (iiiiIi, iiiiIl, IIi11i) => {
      try {
        if (iiiiIi) {
          console.log("" + JSON.stringify(iiiiIi));
          console.log($.name + " job API请求失败，请检查网路重试");
        } else IIi11i = JSON.parse(IIi11i), IIi11i && IIi11i.success && ($.val = IIi11i.data.val || 0, $.awardName = IIi11i.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName));
      } catch (IIl1Ii) {
        $.logErr(IIl1Ii, iiiiIl);
      } finally {
        lIlIii();
      }
    });
  });
}
function Il1iil() {
  return new Promise(ilIII => {
    let IiII1I = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "lotteryForm": 0
    };
    $.post(IIiIIi("/webc/XMBooking/lottery", IiII1I), async (IIl1I1, I1li1i, IIi111) => {
      try {
        if (IIl1I1) console.log("" + JSON.stringify(IIl1I1)), console.log($.name + " lottery API请求失败，请检查网路重试");else {
          IIi111 = JSON.parse(IIi111);
          if (IIi111.data != null && IIi111.success) {
            console.log("获得奖品： " + IIi111.data.awardName);
          } else console.log("空气 ");
        }
      } catch (I1II1I) {
        $.logErr(I1II1I, I1li1i);
      } finally {
        ilIII();
      }
    });
  });
}
function iIiil(l11Iii) {
  return new Promise(lIII => {
    const liIii1 = {
      "url": "" + l11Iii,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(liIii1, async (iIlIil, IIlll1, Il1l1i) => {
      try {
        if (iIlIil) {} else Il1l1i ? Il1l1i = JSON.parse(Il1l1i) : console.log("未获取到数据,请重新运行");
      } catch (IIlllI) {
        $.logErr(IIlllI, IIlll1);
        Il1l1i = null;
      } finally {
        lIII(Il1l1i);
      }
    });
  });
}
function IIiIIi(Iili1I, lli1i1) {
  return {
    "url": "" + liIl1I + Iili1I,
    "body": JSON.stringify(lli1i1),
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": lill,
      "Host": "szxyun-rc.isvjcloud.com",
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": $.tokens,
      "Origin": "https://szxyun-rc.isvjcloud.com",
      "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    }
  };
}
function lilI(iII, l11IlI) {
  return {
    "url": "" + liIl1I + iII,
    "body": JSON.stringify(l11IlI),
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": lill,
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
function ll111i() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + l1Ill1(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function l1Ill1(l11Il1) {
  l11Il1 = l11Il1 || 32;
  let IIiIli = "abcdef0123456789",
    lIl1l = IIiIli.length,
    iIlIii = "";
  for (i = 0; i < l11Il1; i++) iIlIii += IIiIli.charAt(Math.floor(Math.random() * lIl1l));
  return iIlIii;
}
function iiilI1(iIi) {
  if (!iIi) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(iIi) == "object") return true;
  } catch (iIl) {
    return console.log(iIl), false;
  }
}
function ll111l(l11Ili) {
  if (typeof l11Ili == "string") try {
    return JSON.parse(l11Ili);
  } catch (iiili) {
    return console.log(iiili), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function lil1(iIlIiI, Il1III) {
  return Math.floor(Math.random() * (Il1III - iIlIiI)) + iIlIiI;
}