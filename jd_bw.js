/*
23.08.01-23.08.10 百万京豆等你拿

cron:31 2 1-10 8 *
============Quantumultx===============
[task_local]
#23.08.01-23.08.10 百万京豆等你拿
31 2 1-10 8 * jd_szxyun_bw.js, tag=23.08.01-23.08.10 百万京豆等你拿, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("23.08.01-23.08.10 百万京豆等你拿");
const Il1iil = $.isNode() ? require("./sendNotify") : "",
  iIiil = $.isNode() ? require("./jdCookie.js") : "",
  IIiIIi = require("./function/krgetToken"),
  lilI = require("./function/krh5st"),
  ll111i = require("./function/krgetua");
let l1Ill1 = "https://szxyun-rc.isvjcloud.com",
  iiilI1 = [],
  ll111l = "";
if ($.isNode()) {
  if (process.env.jd_szxyun_teamId) $.teamId = process.env.jd_szxyun_teamId;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(iIiil).forEach(l1Illi => {
    iiilI1.push(iIiil[l1Illi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iiilI1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(iiilIi => iiilIi.cookie)].filter(l1Illl => !!l1Illl);
let iliI1l = typeof $request !== "undefined";
iliI1l && (GetCookie(), $.done());
!(async () => {
  authorCodeList = await iI11li("http://code.kingran.cf/5.json");
  $.activityId = "unionOpenBaiwan0801VciNc5";
  if (authorCodeList.length <= 0) {
    console.log("\n网络不好，请重新运行~\n");
    return;
  } else {
    $.shareId = authorCodeList[0].id;
    $.openId = authorCodeList[0].openid;
  }
  if (!iiilI1[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let Ililil = 0; Ililil < iiilI1.length; Ililil++) {
    if (iiilI1[Ililil]) {
      ll111l = iiilI1[Ililil];
      originCookie = iiilI1[Ililil];
      $.UserName = decodeURIComponent(ll111l.match(/pt_pin=(.+?);/) && ll111l.match(/pt_pin=(.+?);/)[1]);
      $.index = Ililil + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await Il1iil.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = await ll111i($.UserName);
      await ii1iIi();
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(I111li => {
  $.log("", " " + $.name + ", 失败! 原因: " + I111li + "!", "");
}).finally(() => {
  $.done();
});
async function ii1iIi() {
  $.shopid = 1000100710;
  $.token = "";
  $.token = await IIiIIi(ll111l, l1Ill1);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await iliI1i();
  if ($.tokens) {
    await IIl11i();
    await iIiiI();
    await Ii111i();
    for (const l11li1 of $.bindCardInfo) {
      if (l11li1.isBindCard == false) {
        flag = true;
        $.joinVenderId = l11li1.shopId;
        $.shopactivityId = "";
        await i11II1();
        for (let iIiIiI = 0; iIiIiI < Array(2).length; iIiIiI++) {
          if (iIiIiI > 0) console.log("第" + iIiIiI + "次 重新开卡");
          await lIi11();
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
        }
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
          console.log("💔 可能是开卡黑号,跳过运行");
          return;
        }
        await IIl11i();
        await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
      }
    }
    if ($.points2 >= 1) {
      let iIlii = parseInt($.points2 / 1);
      console.log("抽奖次数为" + iIlii + "次");
      for (m = 1; iIlii--; m++) {
        await Ii111l();
        if (Number(iIlii) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    }
    await ii1iIl();
    $.index == 1 && ($.shareId = $.joinId, console.log("后面的号都会助力 -> " + $.shareId));
    $.openId == "ture" && (await Ill1l1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await Ilili1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
  }
}
function iliI1i() {
  return new Promise(lIiIII => {
    let i1i = {
      "shopId": $.shopid,
      "token": $.token,
      "source": "01"
    };
    $.post(I111lI("/webc/login/userLogin", i1i), async (I1Il1l, I1Il1i, i1l) => {
      try {
        if (I1Il1l) {
          console.log("" + JSON.stringify(I1Il1l));
          console.log($.name + " userLogin API请求失败，请检查网路重试");
        } else {
          i1l = JSON.parse(i1l);
          i1l && i1l.success && ($.tokens = i1l.data);
        }
      } catch (l11lil) {
        $.logErr(l11lil, I1Il1i);
      } finally {
        lIiIII();
      }
    });
  });
}
function IIl11i() {
  return new Promise(iIlllI => {
    let IIlIi1 = {
      "activeId": $.activityId,
      "shareId": $.shareId
    };
    $.post(Ilill1("/webc/unionOpen/active", IIlIi1), async (i1IIi1, IIlIiI, l11lll) => {
      try {
        i1IIi1 ? (console.log("" + JSON.stringify(i1IIi1)), console.log($.name + " active API请求失败，请检查网路重试")) : (l11lll = JSON.parse(l11lll), l11lll && l11lll.success && ($.joinId = l11lll.data.userVO.joinId || "", $.points2 = l11lll.data.userVO.points2 || 0, $.points = l11lll.data.userVO.points || 0, $.bindCardInfo = l11lll.data.bindCardInfo || []));
      } catch (I1II1) {
        $.logErr(I1II1, IIlIiI);
      } finally {
        iIlllI();
      }
    });
  });
}
function i11III() {
  return new Promise(i1IIil => {
    let iIl1Il = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 6,
      "jobDetail": "100046671870"
    };
    $.post(Ilill1("/webc/unionOpen/job", iIl1Il), async (lili1I, i1iiII, l111Il) => {
      try {
        if (lili1I) {
          console.log("" + JSON.stringify(lili1I));
          console.log($.name + " job API请求失败，请检查网路重试");
        } else {
          l111Il = JSON.parse(l111Il);
          l111Il && l111Il.success && ($.val = l111Il.data.val || 0, $.awardName = l111Il.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName));
        }
      } catch (iiliI1) {
        $.logErr(iiliI1, i1iiII);
      } finally {
        i1IIil();
      }
    });
  });
}
function ii1iIl() {
  return new Promise(l1II1l => {
    let Ilil = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": $.shareId
    };
    $.post(Ilill1("/webc/unionOpen/share", Ilil), async (i1IIli, lI111, iiliIl) => {
      try {
        i1IIli ? (console.log("" + JSON.stringify(i1IIli)), console.log($.name + " share API请求失败，请检查网路重试")) : (iiliIl = JSON.parse(iiliIl), iiliIl && iiliIl.success && ($.helpStatus = iiliIl.data.helpStatus || 0, $.awardName = iiliIl.data.awardName || 0, console.log("助力状态：" + $.helpStatus + "  获得豆子： " + $.awardName)));
      } catch (i1IIll) {
        $.logErr(i1IIll, lI111);
      } finally {
        l1II1l();
      }
    });
  });
}
function Ill1l1() {
  return new Promise(lIiIIi => {
    let I1l1i = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1686427940487557122"
    };
    $.post(Ilill1("/webc/unionOpen/share", I1l1i), async (lIiIIl, IliI, I1l1l) => {
      try {
        if (lIiIIl) {} else {
          I1l1l = JSON.parse(I1l1l);
          I1l1l && I1l1l.success && ($.helpStatus = I1l1l.data.helpStatus || 0, $.awardName = I1l1l.data.awardName || 0);
        }
      } catch (li1liI) {
        $.logErr(li1liI, IliI);
      } finally {
        lIiIIi();
      }
    });
  });
}
function Ilili1() {
  return new Promise(iIilIi => {
    let iI1iIl = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1686428171593707521"
    };
    $.post(Ilill1("/webc/unionOpen/share", iI1iIl), async (lili1i, iI1Ii, IiIIIl) => {
      try {
        if (lili1i) {} else {
          IiIIIl = JSON.parse(IiIIIl);
          if (IiIIIl && IiIIIl.success) {
            $.helpStatus = IiIIIl.data.helpStatus || 0;
            $.awardName = IiIIIl.data.awardName || 0;
          }
        }
      } catch (i111il) {
        $.logErr(i111il, iI1Ii);
      } finally {
        iIilIi();
      }
    });
  });
}
function iIiiI() {
  return new Promise(lIil1I => {
    let i111iI = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 3,
      "jobDetail": 1
    };
    $.post(Ilill1("/webc/unionOpen/job", i111iI), async (iI1iI, Ii11I1, li1IiI) => {
      try {
        iI1iI ? (console.log("" + JSON.stringify(iI1iI)), console.log($.name + " job1 API请求失败，请检查网路重试")) : (li1IiI = JSON.parse(li1IiI), li1IiI && li1IiI.success && ($.val = li1IiI.data.val || 0, $.awardName = li1IiI.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (IIiI1) {
        $.logErr(IIiI1, Ii11I1);
      } finally {
        lIil1I();
      }
    });
  });
}
function Ii111i() {
  return new Promise(iiiiII => {
    let IIilII = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 1,
      "jobDetail": 1
    };
    $.post(Ilill1("/webc/unionOpen/job", IIilII), async (l1Iil1, IIiIl, iiiiI1) => {
      try {
        if (l1Iil1) {
          console.log("" + JSON.stringify(l1Iil1));
          console.log($.name + " job API请求失败，请检查网路重试");
        } else {
          iiiiI1 = JSON.parse(iiiiI1);
          iiiiI1 && iiiiI1.success && ($.val = iiiiI1.data.val || 0, $.awardName = iiiiI1.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName));
        }
      } catch (iiii) {
        $.logErr(iiii, IIiIl);
      } finally {
        iiiiII();
      }
    });
  });
}
function l1iiiI() {
  return new Promise(IIl1II => {
    let l1Iill = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 5,
      "jobDetail": $.joinVenderId
    };
    console.log(l1Iill);
    $.post(Ilill1("/webc/unionOpen/job", l1Iill), async (iiiiIi, iiiiIl, IIi11i) => {
      try {
        if (iiiiIi) {
          console.log("" + JSON.stringify(iiiiIi));
          console.log($.name + " job API请求失败，请检查网路重试");
        } else {
          console.log(IIi11i);
          IIi11i = JSON.parse(IIi11i);
          if (IIi11i && IIi11i.success) {
            $.val = IIi11i.data.val || 0;
            $.awardName = IIi11i.data.awardName || "";
            console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName);
          }
        }
      } catch (Ii11Ii) {
        $.logErr(Ii11Ii, iiiiIl);
      } finally {
        IIl1II();
      }
    });
  });
}
function Ii111l() {
  return new Promise(IiII1I => {
    let I11liI = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "lotteryForm": 0
    };
    $.post(Ilill1("/webc/unionOpen/lottery", I11liI), async (ilIilI, iIlIl1, lli1iI) => {
      try {
        if (ilIilI) {
          console.log("" + JSON.stringify(ilIilI));
          console.log($.name + " lottery API请求失败，请检查网路重试");
        } else {
          lli1iI = JSON.parse(lli1iI);
          lli1iI.data != null && lli1iI.success ? console.log("获得奖品： " + lli1iI.data.awardName) : console.log("空气 ");
        }
      } catch (IIllii) {
        $.logErr(IIllii, iIlIl1);
      } finally {
        IiII1I();
      }
    });
  });
}
function iI11li(Il1l1I) {
  return new Promise(lII1 => {
    const ilIill = {
      "url": Il1l1I + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ilIill, async (Il1l1l, iIlIil, IIlll1) => {
      try {
        if (Il1l1l) $.getAuthorCodeListerr = false;else {
          if (IIlll1) IIlll1 = JSON.parse(IIlll1);
          $.getAuthorCodeListerr = true;
        }
      } catch (I1II11) {
        $.logErr(I1II11, iIlIil);
        IIlll1 = null;
      } finally {
        lII1(IIlll1);
      }
    });
  });
}
async function lIi11() {
  if (!$.joinVenderId) return;
  return new Promise(async l11Il1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiI11I = "";
    if ($.shopactivityId) iiI11I = ",\"activityId\":" + $.shopactivityId;
    const llIi1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiI11I + ",\"channel\":406}",
      llIi1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(llIi1i)
      },
      l11i1 = await lilI("8adfb", llIi1l),
      lIi11I = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + llIi1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11i1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": ll111l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIi11I, async (iiili, iIlIiI, Il1III) => {
      try {
        if (iiili) {
          iIlIiI && typeof iIlIiI.statusCode != "undefined" && iIlIiI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          Il1III = Il1III && Il1III.match(/jsonp_.*?\((.*?)\);/) && Il1III.match(/jsonp_.*?\((.*?)\);/)[1] || Il1III;
          let ll1I = $.toObj(Il1III, Il1III);
          if (ll1I && typeof ll1I == "object") {
            if (ll1I && ll1I.success === true) {
              console.log(" >> " + ll1I.message);
              $.errorJoinShop = ll1I.message;
              if (ll1I.result && ll1I.result.giftInfo) for (let Ii1lii of ll1I.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + Ii1lii.discountString + Ii1lii.prizeName + Ii1lii.secondLineDesc);
              }
            } else ll1I && typeof ll1I == "object" && ll1I.message ? ($.errorJoinShop = ll1I.message, console.log("" + (ll1I.message || ""))) : console.log(Il1III);
          } else console.log(Il1III);
        }
      } catch (lii11) {
        $.logErr(lii11, iIlIiI);
      } finally {
        l11Il1();
      }
    });
  });
}
async function i11II1() {
  return new Promise(async Il1IIl => {
    const lliIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      lliIi = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lliIl)
      },
      l1Iii1 = await lilI("8adfb", lliIi),
      IIiIi1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + lliIl + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1Iii1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": ll111l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIiIi1, async (I1i1, iiiii, iiiil) => {
      try {
        if (I1i1) iiiii && typeof iiiii.statusCode != "undefined" && iiiii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iiiil = iiiil && iiiil.match(/jsonp_.*?\((.*?)\);/) && iiiil.match(/jsonp_.*?\((.*?)\);/)[1] || iiiil;
          let l11l1 = $.toObj(iiiil, iiiil);
          l11l1 && typeof l11l1 == "object" ? l11l1 && l11l1.success == true && (console.log("去加入：" + (l11l1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = l11l1.result.interestsRuleList && l11l1.result.interestsRuleList[0] && l11l1.result.interestsRuleList[0].interestsInfo && l11l1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iiiil);
        }
      } catch (Il1l11) {
        $.logErr(Il1l11, iiiii);
      } finally {
        Il1IIl();
      }
    });
  });
}
function Ilill1(I1II1i, lli1il) {
  return {
    "url": "" + l1Ill1 + I1II1i,
    "body": JSON.stringify(lli1il),
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": ll111l,
      "Host": "szxyun-rc.isvjcloud.com",
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": $.tokens,
      "Origin": "https://szxyun-rc.isvjcloud.com",
      "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    }
  };
}
function I111lI(ll1i, lliII) {
  return {
    "url": "" + l1Ill1 + ll1i,
    "body": JSON.stringify(lliII),
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": ll111l,
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
function l1iii1(iIlIli) {
  iIlIli = iIlIli || 32;
  let il11I1 = "abcdef0123456789",
    lll1i1 = il11I1.length,
    iIl11l = "";
  for (i = 0; i < iIlIli; i++) iIl11l += il11I1.charAt(Math.floor(Math.random() * lll1i1));
  return iIl11l;
}
function iiilIl(i11llI) {
  if (!i11llI) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(i11llI) == "object") return true;
  } catch (iIiIIl) {
    return console.log(iIiIIl), false;
  }
}
function Il1ilI(iIiIIi) {
  if (typeof iIiIIi == "string") try {
    return JSON.parse(iIiIIi);
  } catch (I1iI) {
    return console.log(I1iI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function iIliIl(iI1i11, lIIli1) {
  return Math.floor(Math.random() * (lIIli1 - iI1i11)) + iI1i11;
}