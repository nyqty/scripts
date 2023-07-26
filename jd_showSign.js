/*
活动名称：店铺签到 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/showSign?id=<活动id>&user_id=<店铺id>
环境变量：jd_showSign_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺签到（京耕）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_showSign_activityUrl) activityUrl = process.env.jd_showSign_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(ilIli1l1 => {
    cookiesArr.push(jdCookieNode[ilIli1l1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(l1iiI11 => l1iiI11.cookie)].filter(IIi1I1ii => !!IIi1I1ii);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "id");
  venderId = getQueryString("" + activityUrl, "user_id");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：https://jinggeng-isv.isvjcloud.com/ql/front/showSign?id=" + activityId + "&user_id=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let IIl1iI1l = 0; IIl1iI1l < cookiesArr.length; IIl1iI1l++) {
    if (cookiesArr[IIl1iI1l]) {
      cookie = cookiesArr[IIl1iI1l];
      originCookie = cookiesArr[IIl1iI1l];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = IIl1iI1l + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await showSign();
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(ili1I1il => {
  $.log("", " " + $.name + ", 失败! 原因: " + ili1I1il + "!", "");
}).finally(() => {
  $.done();
});
async function showSign() {
  $.shopid = venderId;
  $.token = "";
  $.errs = false;
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.shopid) {
    await setMixNick();
    if ($.inviterNicks == "") {
      console.log("获取[inviterNick]失败！");
      return;
    }
    await showSignz();
    if ($.activityEnd === true) {
      return;
    }
    await recordActPvUvData();
    await followShop();
    await $.wait(1000);
    await saveSignIn();
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function setMixNick() {
  return new Promise(llill1II => {
    let i1I1ii1i = "strTMMixNick=" + $.token + "&userId=" + $.shopid + "&source=01";
    $.post(taskPostUrl("/front/setMixNick", i1I1ii1i), async (IIIIl11, l1i1liil, iliIi1iI) => {
      try {
        IIIIl11 ? (console.log("" + JSON.stringify(IIIIl11)), console.log($.name + " setMixNick API请求失败，请检查网路重试")) : (iliIi1iI = JSON.parse(iliIi1iI), iliIi1iI && iliIi1iI.succ && ($.inviterNicks = iliIi1iI.msg), l1i1liil.status == 200 && refreshToken(l1i1liil));
      } catch (l1i1iIi1) {
        $.logErr(l1i1iIi1, l1i1liil);
      } finally {
        llill1II();
      }
    });
  });
}
function recordActPvUvData() {
  return new Promise(li1ll11i => {
    let i11iIi1I = "userId=" + $.shopid + "&actId=" + activityId;
    $.post(taskPostUrl("/ql/front/reportActivity/recordActPvUvData", i11iIi1I), async (i1l1IIi, IilllllI, lil1ii1) => {
      try {
        i1l1IIi ? (console.log("" + JSON.stringify(i1l1IIi)), console.log($.name + " recordActPvUvData API请求失败，请检查网路重试")) : IilllllI.status == 200 && refreshToken(IilllllI);
      } catch (lIlli1i) {
        $.logErr(lIlli1i, IilllllI);
      } finally {
        li1ll11i();
      }
    });
  });
}
function checkTokenInSession() {
  return new Promise(IiiIi1II => {
    let IIlil1i1 = "userId=" + $.shopid + "&token=" + $.token;
    $.post(taskPostUrl("/front/checkTokenInSession", IIlil1i1), async (iiIiIlIi, liiilI, i11iiiIi) => {
      try {
        if (iiIiIlIi) {
          console.log("" + JSON.stringify(iiIiIlIi));
          console.log($.name + " checkTokenInSession API请求失败，请检查网路重试");
        } else {
          if (liiilI.status == 200) {
            refreshToken(liiilI);
          }
        }
      } catch (IilI1ii) {
        $.logErr(IilI1ii, liiilI);
      } finally {
        IiiIi1II();
      }
    });
  });
}
function receiveInviteJoinAward() {
  return new Promise(I1Ill1Il => {
    let l1ll = "act_id=" + activityId + "&user_id=" + $.shopid + "&awardId=" + $.awardId;
    $.post(taskPostUrl("/ql/front/receiveInviteJoinAward", l1ll), async (iili1Ili, iiiiliii, il1lliI) => {
      try {
        if (iili1Ili) {
          console.log("" + JSON.stringify(iili1Ili));
          console.log($.name + " receiveInviteJoinAward API请求失败，请检查网路重试");
        } else {
          il1lliI = JSON.parse(il1lliI);
          if (il1lliI && il1lliI.succ) {
            console.log("领取奖励成功");
          } else console.log("领取奖励失败：" + result.msg);
          iiiiliii.status == 200 && refreshToken(iiiiliii);
        }
      } catch (iiiIiIIi) {
        $.logErr(iiiIiIIi, iiiiliii);
      } finally {
        I1Ill1Il();
      }
    });
  });
}
function followShop() {
  return new Promise(l1lIIIli => {
    let iI1III1I = "userId=" + $.shopid;
    $.post(taskPostUrl("/front/followShop", iI1III1I), async (III1lIl, llilllll, I1illl11) => {
      try {
        III1lIl ? (console.log("" + JSON.stringify(III1lIl)), console.log($.name + " followShop API请求失败，请检查网路重试")) : llilllll.status == 200 && refreshToken(llilllll);
      } catch (Ii1llll) {
        $.logErr(Ii1llll, llilllll);
      } finally {
        l1lIIIli();
      }
    });
  });
}
function saveSignIn() {
  return new Promise(Iliillii => {
    let IIIilIIl = "act_id=" + activityId + "&user_id=" + $.shopid;
    $.post(taskPostUrl("/ql/front/saveSignIn", IIIilIIl), async (ilil1li, lIiIIIIl, i1l11iIl) => {
      try {
        if (ilil1li) {
          console.log("" + JSON.stringify(ilil1li));
          console.log($.name + " saveSignIn API请求失败，请检查网路重试");
        } else {
          i1l11iIl = JSON.parse(i1l11iIl);
          if (i1l11iIl && i1l11iIl.succ) {
            let liilIiii = JSON.parse(i1l11iIl.msg).drawAwardDto,
              l1llIll1 = liilIiii.awardType;
            switch (l1llIll1) {
              case "JD_BEAN":
                console.log("🎉 " + liilIiii.awardName + " 🐶");
                break;
              case "JD_POINT":
                console.log("🗑️ " + liilIiii.awardSendNum + liilIiii.awardName + " 🎟️");
                break;
              case "JD_COUPON":
                console.log("🗑️ 优惠券");
                break;
              default:
                console.log(liilIiii);
                break;
            }
          } else {
            i1l11iIl.msg.includes("未中奖") ? console.log("💨 空气") : console.log("" + i1l11iIl.msg);
            ilil1li = i1l11iIl.msg;
            for (let llliil1i of ["不足", "部分会员", "火爆", "上限"]) {
              if (ilil1li.includes(llliil1i)) {
                $.errs = true;
                break;
              }
            }
          }
          lIiIIIIl.status == 200 && refreshToken(lIiIIIIl);
        }
      } catch (iiIllI) {
        $.logErr(iiIllI, lIiIIIIl);
      } finally {
        Iliillii();
      }
    });
  });
}
function showSignz() {
  return new Promise(Iiii1il => {
    const ilII1l1l = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showSign?id=" + activityId + "&user_id=" + $.shopid,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showSign?id=" + activityId + "&user_id=" + $.shopid,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(ilII1l1l, async (I11l1li1, I1liill1, IIl11l1i) => {
      try {
        if (I11l1li1) {
          console.log("" + JSON.stringify(I11l1li1));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          IIl11l1i = IIl11l1i;
          if (IIl11l1i) {
            let liII1I1i = IIl11l1i.match(/(活动已结束)/) && IIl11l1i.match(/(活动已结束)/)[1] || "";
            liII1I1i && ($.activityEnd = true, console.log("活动已结束"));
            if ($.index === 1) {
              let I1iiliiI = IIl11l1i.match(/id="description" style="display: none">(.+)</);
              I1iiliiI && ($.rlue = I1iiliiI[1]);
            }
          }
        }
      } catch (IIIIlIll) {
        $.logErr(IIIIlIll, I1liill1);
      } finally {
        Iiii1il();
      }
    });
  });
}
function getShopOpenCardInfo(IIIliI1) {
  let il11il1l = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(IIIliI1)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(activityUrl),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(I1l11ii1 => {
    $.get(il11il1l, (IliIliIi, Iil1Ill1, ii1illil) => {
      try {
        IliIliIi ? IliIliIi === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(IliIliIi))) : (res = JSON.parse(ii1illil), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (llIlI1il) {
        console.log(llIlI1il);
      } finally {
        I1l11ii1();
      }
    });
  });
}
function taskPostUrl(IIilii1, llll11l1) {
  return {
    "url": "" + domains + IIilii1,
    "body": llll11l1,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "Host": "jinggeng-isv.isvjcloud.com",
      "Origin": "https://jinggeng-isv.isvjcloud.com",
      "Referer": "https://jinggeng-isv.isvjcloud.com/ql/front/showSign?id=" + activityId + "&user_id=" + venderId,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    }
  };
}
function taskUrl(iII1I111, ll1lliIi) {
  return {
    "url": "https://api.m.jd.com/client.action" + iII1I111,
    "body": ll1lliIi,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Cookie": cookie,
      "User-Agent": $.UA
    }
  };
}
function refreshToken(i1IiIll) {
  if (i1IiIll) {
    if (i1IiIll.headers["set-cookie"]) {
      cookie = "";
      for (let II1i1I of i1IiIll.headers["set-cookie"]) {
        lz_cookie[II1i1I.split(";")[0].substr(0, II1i1I.split(";")[0].indexOf("="))] = II1i1I.split(";")[0].substr(II1i1I.split(";")[0].indexOf("=") + 1);
      }
      for (const i11IlIiI of Object.keys(lz_cookie)) {
        cookie += i11IlIiI + "=" + lz_cookie[i11IlIiI] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(lI11IIii) {
  lI11IIii = lI11IIii || 32;
  let iIlII1Il = "abcdef0123456789",
    illilIll = iIlII1Il.length,
    IIl1Ill = "";
  for (i = 0; i < lI11IIii; i++) IIl1Ill += iIlII1Il.charAt(Math.floor(Math.random() * illilIll));
  return IIl1Ill;
}
function safeGet(Ili1IIIi) {
  if (!Ili1IIIi) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(Ili1IIIi) == "object") return true;
  } catch (iIllii) {
    return console.log(iIllii), false;
  }
}
function jsonParse(i11llIl) {
  if (typeof i11llIl == "string") try {
    return JSON.parse(i11llIl);
  } catch (l11IllIl) {
    return console.log(l11IllIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(I1i1il1I, Iiil1III) {
  let lIi1iIl1 = new RegExp("(^|[&?])" + Iiil1III + "=([^&]*)(&|$)"),
    iIlllII = I1i1il1I.match(lIi1iIl1);
  if (iIlllII != null) return decodeURIComponent(iIlllII[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async I1Iii1II => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let ilI1li = "";
    if ($.shopactivityId) ilI1li = ",\"activityId\":" + $.shopactivityId;
    const IiI1lIiI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + ilI1li + ",\"channel\":406}",
      IiIl1iIi = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IiI1lIiI)
      },
      iilI1I1l = await getH5st("8adfb", IiIl1iIi),
      i1Il11il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IiI1lIiI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iilI1I1l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1Il11il, async (ili1lIi1, iil1lli1, iIIlI11i) => {
      try {
        iIIlI11i = iIIlI11i && iIIlI11i.match(/jsonp_.*?\((.*?)\);/) && iIIlI11i.match(/jsonp_.*?\((.*?)\);/)[1] || iIIlI11i;
        let iIlIilI1 = $.toObj(iIIlI11i, iIIlI11i);
        if (iIlIilI1 && typeof iIlIilI1 == "object") {
          if (iIlIilI1 && iIlIilI1.success === true) {
            console.log(iIlIilI1.message);
            $.errorJoinShop = iIlIilI1.message;
            if (iIlIilI1.result && iIlIilI1.result.giftInfo) for (let iliIlII1 of iIlIilI1.result.giftInfo.giftList) {
              console.log("入会获得: " + iliIlII1.discountString + iliIlII1.prizeName + iliIlII1.secondLineDesc);
            }
            console.log("");
          } else iIlIilI1 && typeof iIlIilI1 == "object" && iIlIilI1.message ? ($.errorJoinShop = iIlIilI1.message, console.log("" + (iIlIilI1.message || ""))) : console.log(iIIlI11i);
        } else console.log(iIIlI11i);
      } catch (iIIlIlli) {
        $.logErr(iIIlIlli, iil1lli1);
      } finally {
        I1Iii1II();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async IlIiI1ll => {
    let iIl1illI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const l1iilii1 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIl1illI)
      },
      I1I1iiii = await getH5st("ef79a", l1iilii1),
      Ii1l1Ii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIl1illI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1I1iiii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ii1l1Ii, async (iIlIliII, liliili1, Iii1I111) => {
      try {
        Iii1I111 = Iii1I111 && Iii1I111.match(/jsonp_.*?\((.*?)\);/) && Iii1I111.match(/jsonp_.*?\((.*?)\);/)[1] || Iii1I111;
        let IlI1I1i = $.toObj(Iii1I111, Iii1I111);
        if (IlI1I1i && typeof IlI1I1i == "object") {
          IlI1I1i && IlI1I1i.success == true && (console.log("\n去加入店铺会员：" + (IlI1I1i.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = IlI1I1i.result.interestsRuleList && IlI1I1i.result.interestsRuleList[0] && IlI1I1i.result.interestsRuleList[0].interestsInfo && IlI1I1i.result.interestsRuleList[0].interestsInfo.activityId || "");
        } else console.log(Iii1I111);
      } catch (l1lIIii) {
        $.logErr(l1lIIii, liliili1);
      } finally {
        IlIiI1ll();
      }
    });
  });
}
