/*
6.12-6.22 6.12-6.22 百万京豆等你拿

cron:1 0,20 12-22 6 *
============Quantumultx===============
[task_local]
#6.12-6.22 百万京豆等你拿
1 0,20 12-22 6 * jd_szxyun_bw.js, tag=6.12-6.22 百万京豆等你拿, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env("6.12-6.22 百万京豆等你拿");

const notify = $.isNode() ? require("./sendNotify") : "",
  jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let domains = "https://szxyun-rc.isvjcloud.com",
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_szxyun_teamId) $.teamId = process.env.jd_szxyun_teamId;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(iiilI1 => {
    cookiesArr.push(jdCookieNode[iiilI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(ll111l => ll111l.cookie)].filter(lil1 => !!lil1);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
!(async () => {
  authorCodeList = ["1669733388883357697"];
  $.activityId = "unionOpenBaiwanjingdou5A9U9AS5";
  if (authorCodeList.length <= 0) {
    console.log("\n网络不好，请重新运行~\n");
    return;
  } else {
    $.shareId = authorCodeList[0].id;
    $.openId = authorCodeList[0].openid;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let liIl1l = 0; liIl1l < cookiesArr.length; liIl1l++) {
    if (cookiesArr[liIl1l]) {
      cookie = cookiesArr[liIl1l];
      originCookie = cookiesArr[liIl1l];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = liIl1l + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await showCart();
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(lIi1I => {
  $.log("", " " + $.name + ", 失败! 原因: " + lIi1I + "!", "");
}).finally(() => {
  $.done();
});
async function showCart() {
  $.shopid = 1000100710;
  $.token = "";
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await userLogin();
  if ($.tokens) {
    await active();
    await job1();
    await job2();
    for (const liII1i of $.bindCardInfo) {
      if (liII1i.isBindCard == false) {
        flag = true;
        $.joinVenderId = liII1i.shopId;
        $.shopactivityId = "";
        await getshopactivityId();
        for (let iIiIil = 0; iIiIil < Array(2).length; iIiIil++) {
          if (iIiIil > 0) console.log("第" + iIiIil + "次 重新开卡");
          await joinShop();
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
            break;
          }
        }
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
          console.log("💔 可能是开卡黑号,跳过运行");
          return;
        }
        await active();
        await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
      }
    }
    if ($.points2 >= 1) {
      let i1I11i = parseInt($.points2 / 1);
      console.log("抽奖次数为" + i1I11i + "次");
      for (m = 1; i1I11i--; m++) {
        await lottery();
        if (Number(i1I11i) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    }
    await share();
    $.index == 1 && ($.shareId = $.joinId, console.log("后面的号都会助力 -> " + $.shareId));
    $.openId == "ture" && (await share1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await share2(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
  }
}
function userLogin() {
  return new Promise(l1li1l => {
    let il1Ili = {
      "shopId": $.shopid,
      "token": $.token,
      "source": "01"
    };
    $.post(taskPostUrls("/webc/login/userLogin", il1Ili), async (IIlIll, l11liI, li11Ii) => {
      try {
        if (IIlIll) {
          console.log("" + JSON.stringify(IIlIll));
          console.log($.name + " userLogin API请求失败，请检查网路重试");
        } else {
          li11Ii = JSON.parse(li11Ii);
          li11Ii && li11Ii.success && ($.tokens = li11Ii.data);
        }
      } catch (IIlIii) {
        $.logErr(IIlIii, l11liI);
      } finally {
        l1li1l();
      }
    });
  });
}
function active() {
  return new Promise(iIli1 => {
    let iIiIll = {
      "activeId": $.activityId,
      "shareId": $.shareId
    };
    $.post(taskPostUrl("/webc/unionOpen/active", iIiIll), async (iIlliI, IlIiIi, IIlIi1) => {
      try {
        iIlliI ? (console.log("" + JSON.stringify(iIlliI)), console.log($.name + " active API请求失败，请检查网路重试")) : (IIlIi1 = JSON.parse(IIlIi1), IIlIi1 && IIlIi1.success && ($.joinId = IIlIi1.data.userVO.joinId || "", $.points2 = IIlIi1.data.userVO.points2 || 0, $.points = IIlIi1.data.userVO.points || 0, $.bindCardInfo = IIlIi1.data.bindCardInfo || []));
      } catch (l11lll) {
        $.logErr(l11lll, IlIiIi);
      } finally {
        iIli1();
      }
    });
  });
}
function job() {
  return new Promise(iI1iI1 => {
    let i1IIii = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 6,
      "jobDetail": "100046671870"
    };
    $.post(taskPostUrl("/webc/unionOpen/job", i1IIii), async (i1IIil, il111l, iIl1Il) => {
      try {
        i1IIil ? (console.log("" + JSON.stringify(i1IIil)), console.log($.name + " job API请求失败，请检查网路重试")) : (iIl1Il = JSON.parse(iIl1Il), iIl1Il && iIl1Il.success && ($.val = iIl1Il.data.val || 0, $.awardName = iIl1Il.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (iiliI1) {
        $.logErr(iiliI1, il111l);
      } finally {
        iI1iI1();
      }
    });
  });
}
function share() {
  return new Promise(ii11il => {
    let iIi111 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": $.shareId
    };
    $.post(taskPostUrl("/webc/unionOpen/share", iIi111), async (I11lli, i111ll, I11lll) => {
      try {
        I11lli ? (console.log("" + JSON.stringify(I11lli)), console.log($.name + " share API请求失败，请检查网路重试")) : (I11lll = JSON.parse(I11lll), I11lll && I11lll.success && ($.helpStatus = I11lll.data.helpStatus || 0, $.awardName = I11lll.data.awardName || 0, console.log("助力状态：" + $.helpStatus + "  获得豆子： " + $.awardName)));
      } catch (llIiII) {
        $.logErr(llIiII, i111ll);
      } finally {
        ii11il();
      }
    });
  });
}
function share1() {
  return new Promise(ii11lI => {
    let I1l11 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1669300488991358978"
    };
    $.post(taskPostUrl("/webc/unionOpen/share", I1l11), async (li1li1, li1liI, ii11li) => {
      try {
        if (li1li1) {} else {
          ii11li = JSON.parse(ii11li);
          ii11li && ii11li.success && ($.helpStatus = ii11li.data.helpStatus || 0, $.awardName = ii11li.data.awardName || 0);
        }
      } catch (iiliIi) {
        $.logErr(iiliIi, li1liI);
      } finally {
        ii11lI();
      }
    });
  });
}
function share2() {
  return new Promise(il1Iil => {
    let lili1i = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1669300527469588481"
    };
    $.post(taskPostUrl("/webc/unionOpen/share", lili1i), async (iI1Ii, IiIIIl, IiIIIi) => {
      try {
        if (iI1Ii) {} else {
          IiIIIi = JSON.parse(IiIIIi);
          IiIIIi && IiIIIi.success && ($.helpStatus = IiIIIi.data.helpStatus || 0, $.awardName = IiIIIi.data.awardName || 0);
        }
      } catch (i111il) {
        $.logErr(i111il, IiIIIl);
      } finally {
        il1Iil();
      }
    });
  });
}
function job1() {
  return new Promise(lI1i1l => {
    let IiIIII = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 3,
      "jobDetail": 1
    };
    $.post(taskPostUrl("/webc/unionOpen/job", IiIIII), async (i111iI, lIllII, IIilIl) => {
      try {
        i111iI ? (console.log("" + JSON.stringify(i111iI)), console.log($.name + " job1 API请求失败，请检查网路重试")) : (IIilIl = JSON.parse(IIilIl), IIilIl && IIilIl.success && ($.val = IIilIl.data.val || 0, $.awardName = IIilIl.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (iiiI) {
        $.logErr(iiiI, lIllII);
      } finally {
        lI1i1l();
      }
    });
  });
}
function job2() {
  return new Promise(ill1l => {
    let iiIIi1 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 1,
      "jobDetail": 1
    };
    $.post(taskPostUrl("/webc/unionOpen/job", iiIIi1), async (i1liI1, l1IilI, ll1I1i) => {
      try {
        i1liI1 ? (console.log("" + JSON.stringify(i1liI1)), console.log($.name + " job API请求失败，请检查网路重试")) : (ll1I1i = JSON.parse(ll1I1i), ll1I1i && ll1I1i.success && ($.val = ll1I1i.data.val || 0, $.awardName = ll1I1i.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (iilI) {
        $.logErr(iilI, l1IilI);
      } finally {
        ill1l();
      }
    });
  });
}
function job3() {
  return new Promise(i1ii1i => {
    let iiil = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 5,
      "jobDetail": $.joinVenderId
    };
    console.log(iiil);
    $.post(taskPostUrl("/webc/unionOpen/job", iiil), async (IIl1II, iill, iiIIl1) => {
      try {
        IIl1II ? (console.log("" + JSON.stringify(IIl1II)), console.log($.name + " job API请求失败，请检查网路重试")) : (console.log(iiIIl1), iiIIl1 = JSON.parse(iiIIl1), iiIIl1 && iiIIl1.success && ($.val = iiIIl1.data.val || 0, $.awardName = iiIIl1.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (I11lil) {
        $.logErr(I11lil, iill);
      } finally {
        i1ii1i();
      }
    });
  });
}
function lottery() {
  return new Promise(I11ll1 => {
    let Ili1lI = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "lotteryForm": 0
    };
    $.post(taskPostUrl("/webc/unionOpen/lottery", Ili1lI), async (lIlIl1, ilIIi, IiII1l) => {
      try {
        if (lIlIl1) {
          console.log("" + JSON.stringify(lIlIl1));
          console.log($.name + " lottery API请求失败，请检查网路重试");
        } else {
          IiII1l = JSON.parse(IiII1l);
          if (IiII1l.data != null && IiII1l.success) console.log("获得奖品： " + IiII1l.data.awardName);else {
            console.log("空气 ");
          }
        }
      } catch (Ii11Il) {
        $.logErr(Ii11Il, ilIIi);
      } finally {
        I11ll1();
      }
    });
  });
}
function getAuthorCodeList(lIlIlI) {
  return new Promise(IIl1I1 => {
    const IIi111 = {
      "url": lIlIlI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IIi111, async (l111I1, IiII11, I11liI) => {
      try {
        if (l111I1) $.getAuthorCodeListerr = false;else {
          if (I11liI) I11liI = JSON.parse(I11liI);
          $.getAuthorCodeListerr = true;
        }
      } catch (IIllii) {
        $.logErr(IIllii, IiII11);
        I11liI = null;
      } finally {
        IIl1I1(I11liI);
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIlll1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lIl1i = "";
    if ($.shopactivityId) lIl1i = ",\"activityId\":" + $.shopactivityId;
    const Iili1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lIl1i + ",\"channel\":406}",
      liIiil = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Iili1l)
      },
      l11Il1 = await getH5st("8adfb", liIiil),
      Iili1i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Iili1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11Il1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Iili1i, async (IIiIli, lIl1l, iIlIii) => {
      try {
        if (IIiIli) lIl1l && typeof lIl1l.statusCode != "undefined" && lIl1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iIlIii = iIlIii && iIlIii.match(/jsonp_.*?\((.*?)\);/) && iIlIii.match(/jsonp_.*?\((.*?)\);/)[1] || iIlIii;
          let I111I1 = $.toObj(iIlIii, iIlIii);
          if (I111I1 && typeof I111I1 == "object") {
            if (I111I1 && I111I1.success === true) {
              console.log(" >> " + I111I1.message);
              $.errorJoinShop = I111I1.message;
              if (I111I1.result && I111I1.result.giftInfo) for (let iIl of I111I1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + iIl.discountString + iIl.prizeName + iIl.secondLineDesc);
              }
            } else I111I1 && typeof I111I1 == "object" && I111I1.message ? ($.errorJoinShop = I111I1.message, console.log("" + (I111I1.message || ""))) : console.log(iIlIii);
          } else console.log(iIlIii);
        }
      } catch (iiill) {
        $.logErr(iiill, lIl1l);
      } finally {
        IIlll1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async Ii1lil => {
    const lliI1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iiI11l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lliI1)
      },
      iiI11i = await getH5st("8adfb", iiI11l),
      Il1II1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + lliI1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiI11i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Il1II1, async (ilII1I, iiIlI1, lli1l1) => {
      try {
        if (ilII1I) iiIlI1 && typeof iiIlI1.statusCode != "undefined" && iiIlI1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lli1l1 = lli1l1 && lli1l1.match(/jsonp_.*?\((.*?)\);/) && lli1l1.match(/jsonp_.*?\((.*?)\);/)[1] || lli1l1;
          let lliIi = $.toObj(lli1l1, lli1l1);
          lliIi && typeof lliIi == "object" ? lliIi && lliIi.success == true && (console.log("去加入：" + (lliIi.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = lliIi.result.interestsRuleList && lliIi.result.interestsRuleList[0] && lliIi.result.interestsRuleList[0].interestsInfo && lliIi.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(lli1l1);
        }
      } catch (iiiil) {
        $.logErr(iiiil, iiIlI1);
      } finally {
        Ii1lil();
      }
    });
  });
}
function taskPostUrl(il11II, l11l1) {
  return {
    "url": "" + domains + il11II,
    "body": JSON.stringify(l11l1),
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "Host": "szxyun-rc.isvjcloud.com",
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": $.tokens,
      "Origin": "https://szxyun-rc.isvjcloud.com",
      "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    }
  };
}
function taskPostUrls(lli1ii, I1II1i) {
  return {
    "url": "" + domains + lli1ii,
    "body": JSON.stringify(I1II1i),
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": cookie,
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
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(iiIlIi) {
  iiIlIi = iiIlIi || 32;
  let iIlIll = "abcdef0123456789",
    il11I1 = iIlIll.length,
    lll1i1 = "";
  for (i = 0; i < iiIlIi; i++) lll1i1 += iIlIll.charAt(Math.floor(Math.random() * il11I1));
  return lll1i1;
}
function safeGet(IiI111) {
  if (!IiI111) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(IiI111) == "object") return true;
  } catch (i11llI) {
    return console.log(i11llI), false;
  }
}
function jsonParse(iIIi1) {
  if (typeof iIIi1 == "string") {
    try {
      return JSON.parse(iIIi1);
    } catch (i11ll1) {
      return console.log(i11ll1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function random(I1lI, iIlIl) {
  return Math.floor(Math.random() * (iIlIl - I1lI)) + I1lI;
}