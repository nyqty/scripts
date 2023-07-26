/*
活动名称：大转盘抽奖 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/showDrawOne?id=<活动id>&user_id=<店铺id>
环境变量：jd_showDrawOne_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('大转盘抽奖（京耕）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let drawnum = 2,
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_showDrawOne_activityUrl) activityUrl = process.env.jd_showDrawOne_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(liIli1iI => {
    cookiesArr.push(jdCookieNode[liIli1iI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(I1ii1lII => I1ii1lII.cookie)].filter(i1I1lii => !!i1I1lii);
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
  console.log("活动入口：https://jinggeng-isv.isvjcloud.com/ql/front/showDrawOne?id=" + activityId + "&user_id=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let l111I1l = 0; l111I1l < cookiesArr.length; l111I1l++) {
    if (cookiesArr[l111I1l]) {
      cookie = cookiesArr[l111I1l];
      originCookie = cookiesArr[l111I1l];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = l111I1l + 1;
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
      await showDrawOne();
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(illi1lil => {
  $.log("", " " + $.name + ", 失败! 原因: " + illi1lil + "!", "");
}).finally(() => {
  $.done();
});
async function showDrawOne() {
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
    await showDrawOnez();
    if ($.activityEnd === true) return;
    await recordActPvUvData();
    for (let liil1iII = 0; liil1iII < $.cjcs; liil1iII++) {
      !$.errs && (await postFrontCheckDrawOne(), await $.wait(3000));
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function setMixNick() {
  return new Promise(iii1I11i => {
    let l1I1iiI1 = "strTMMixNick=" + $.token + "&userId=" + $.shopid + "&source=01";
    $.post(taskPostUrl("/front/setMixNick", l1I1iiI1), async (IiliIIlI, i11I1I1l, I1i1iI) => {
      try {
        IiliIIlI ? (console.log("" + JSON.stringify(IiliIIlI)), console.log($.name + " setMixNick API请求失败，请检查网路重试")) : (I1i1iI = JSON.parse(I1i1iI), I1i1iI && I1i1iI.succ && ($.inviterNicks = I1i1iI.msg), i11I1I1l.status == 200 && refreshToken(i11I1I1l));
      } catch (liiiI11i) {
        $.logErr(liiiI11i, i11I1I1l);
      } finally {
        iii1I11i();
      }
    });
  });
}
function recordActPvUvData() {
  return new Promise(lIiiIl1i => {
    let IlliiIil = "userId=" + $.shopid + "&actId=" + activityId;
    $.post(taskPostUrl("/ql/front/reportActivity/recordActPvUvData", IlliiIil), async (I111i1i1, iillI1Ii, i1i1l11l) => {
      try {
        I111i1i1 ? (console.log("" + JSON.stringify(I111i1i1)), console.log($.name + " recordActPvUvData API请求失败，请检查网路重试")) : iillI1Ii.status == 200 && refreshToken(iillI1Ii);
      } catch (iIIiI1i1) {
        $.logErr(iIIiI1i1, iillI1Ii);
      } finally {
        lIiiIl1i();
      }
    });
  });
}
function checkTokenInSession() {
  return new Promise(IlIIl1l => {
    let lli1iili = "userId=" + $.shopid + "&token=" + $.token;
    $.post(taskPostUrl("/front/checkTokenInSession", lli1iili), async (i1IIl1ii, iIii1III, i1lillI) => {
      try {
        i1IIl1ii ? (console.log("" + JSON.stringify(i1IIl1ii)), console.log($.name + " checkTokenInSession API请求失败，请检查网路重试")) : iIii1III.status == 200 && refreshToken(iIii1III);
      } catch (lllI1Ili) {
        $.logErr(lllI1Ili, iIii1III);
      } finally {
        IlIIl1l();
      }
    });
  });
}
function receiveInviteJoinAward() {
  return new Promise(IIII1Ii => {
    let lIIiIlll = "act_id=" + activityId + "&user_id=" + $.shopid + "&awardId=" + $.awardId;
    $.post(taskPostUrl("/ql/front/receiveInviteJoinAward", lIIiIlll), async (iI1iI11, II11l1ll, IiIi1lI1) => {
      try {
        iI1iI11 ? (console.log("" + JSON.stringify(iI1iI11)), console.log($.name + " receiveInviteJoinAward API请求失败，请检查网路重试")) : (IiIi1lI1 = JSON.parse(IiIi1lI1), IiIi1lI1 && IiIi1lI1.succ ? console.log("领取奖励成功") : console.log("领取奖励失败：" + result.msg), II11l1ll.status == 200 && refreshToken(II11l1ll));
      } catch (Iii1i11) {
        $.logErr(Iii1i11, II11l1ll);
      } finally {
        IIII1Ii();
      }
    });
  });
}
function postFrontCheckDrawOne() {
  return new Promise(I1il1iIi => {
    let II1liIII = "act_id=" + activityId + "&user_id=" + $.shopid + "&drawCountNumFlag=true";
    $.post(taskPostUrl("/ql/front/postFrontCheckDrawOne", II1liIII), async (iiIil1ll, i1ii1iII, ii11lli1) => {
      try {
        if (iiIil1ll) {
          console.log("" + JSON.stringify(iiIil1ll));
          console.log($.name + " postFrontCheckDrawOne API请求失败，请检查网路重试");
        } else {
          ii11lli1 = JSON.parse(ii11lli1);
          if (ii11lli1 && ii11lli1.succ) {
            let iIl1liIi = JSON.parse(ii11lli1.msg).drawAwardDto,
              Iil1i1l1 = iIl1liIi.awardType;
            switch (Iil1i1l1) {
              case "JD_BEAN":
                console.log("🎉 " + iIl1liIi.awardName + " 🐶");
                break;
              case "JD_POINT":
                console.log("🗑️ " + iIl1liIi.awardSendNum + iIl1liIi.awardName + " 🎟️");
                break;
              case "JD_COUPON":
                console.log("🗑️ 优惠券");
                break;
              default:
                console.log(iIl1liIi);
                break;
            }
          } else {
            if (ii11lli1.msg.includes("未中奖")) console.log("💨 空气");else {
              console.log("" + ii11lli1.msg);
            }
            iiIil1ll = ii11lli1.msg;
            for (let l1Ili1iI of ["不足", "部分会员", "火爆", "上限"]) {
              if (iiIil1ll.includes(l1Ili1iI)) {
                $.errs = true;
                break;
              }
            }
          }
          i1ii1iII.status == 200 && refreshToken(i1ii1iII);
        }
      } catch (ili1II1l) {
        $.logErr(ili1II1l, i1ii1iII);
      } finally {
        I1il1iIi();
      }
    });
  });
}
function showDrawOnez() {
  return new Promise(l1iIiIlI => {
    const l11Illl = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showDrawOne?id=" + activityId + "&user_id=" + $.shopid,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showDrawOne?id=" + activityId + "&user_id=" + $.shopid,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(l11Illl, async (i1Ili1, lii11i, I11l1i1l) => {
      try {
        if (i1Ili1) {
          console.log("" + JSON.stringify(i1Ili1));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          I11l1i1l = I11l1i1l;
          if (I11l1i1l) {
            let IliIl11i = I11l1i1l.match(/(活动已结束)/) && I11l1i1l.match(/(活动已结束)/)[1] || "";
            IliIl11i && ($.activityEnd = true, console.log("活动已结束"));
            if ($.index === 1) {
              let Ii11I1iI = I11l1i1l.match(/id="description" style="display: none">(.+)</);
              Ii11I1iI && ($.rlue = Ii11I1iI[1]);
              let lilIII1 = I11l1i1l.match(/每日抽奖最多 (\d+) 次/);
              lilIII1 ? ($.cjcs = lilIII1[1], console.log("抽奖次数：" + $.cjcs)) : ($.cjcs = drawnum, console.log("抽奖次数：" + $.cjcs));
            }
          }
        }
      } catch (iili11ii) {
        $.logErr(iili11ii, lii11i);
      } finally {
        l1iIiIlI();
      }
    });
  });
}
function getShopOpenCardInfo(Iill11ii) {
  let llil1I1I = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(Iill11ii)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(i1IlIi => {
    $.get(llil1I1I, (IIi1lIl, lI1lilli, Iii1II1l) => {
      try {
        if (IIi1lIl) {
          IIi1lIl === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(IIi1lIl)));
        } else {
          res = JSON.parse(Iii1II1l);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (iII1Ii11) {
        console.log(iII1Ii11);
      } finally {
        i1IlIi();
      }
    });
  });
}
function taskPostUrl(iiI1IIII, i1i1111) {
  return {
    "url": "" + domains + iiI1IIII,
    "body": i1i1111,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "Host": "jinggeng-isv.isvjcloud.com",
      "Origin": "https://jinggeng-isv.isvjcloud.com",
      "Referer": "https://jinggeng-isv.isvjcloud.com/ql/front/showDrawOne?id=" + activityId + "&user_id=" + venderId,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    }
  };
}
function taskUrl(IIilIIii, i1lIIll1) {
  return {
    "url": "https://api.m.jd.com/client.action" + IIilIIii,
    "body": i1lIIll1,
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
function refreshToken(IililIII) {
  if (IililIII) {
    if (IililIII.headers["set-cookie"]) {
      cookie = "";
      for (let I11iiIiI of IililIII.headers["set-cookie"]) {
        lz_cookie[I11iiIiI.split(";")[0].substr(0, I11iiIiI.split(";")[0].indexOf("="))] = I11iiIiI.split(";")[0].substr(I11iiIiI.split(";")[0].indexOf("=") + 1);
      }
      for (const il1l11I of Object.keys(lz_cookie)) {
        cookie += il1l11I + "=" + lz_cookie[il1l11I] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(liIil1l1) {
  liIil1l1 = liIil1l1 || 32;
  let i11l11i1 = "abcdef0123456789",
    l1I1Il11 = i11l11i1.length,
    llI1II1I = "";
  for (i = 0; i < liIil1l1; i++) llI1II1I += i11l11i1.charAt(Math.floor(Math.random() * l1I1Il11));
  return llI1II1I;
}
function safeGet(iIl1i1iI) {
  if (!iIl1i1iI) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(iIl1i1iI) == "object") return true;
  } catch (Il1iliiI) {
    return console.log(Il1iliiI), false;
  }
}
function jsonParse(IiIIll1I) {
  if (typeof IiIIll1I == "string") {
    try {
      return JSON.parse(IiIIll1I);
    } catch (iIiiI1I) {
      return console.log(iIiiI1I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function getQueryString(IliI1II1, iiI1ill) {
  let iiIlI = new RegExp("(^|[&?])" + iiI1ill + "=([^&]*)(&|$)"),
    i1II11Ii = IliI1II1.match(iiIlI);
  if (i1II11Ii != null) return decodeURIComponent(i1II11Ii[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async ll111lll => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i1iIlIil = "";
    if ($.shopactivityId) i1iIlIil = ",\"activityId\":" + $.shopactivityId;
    const illiI1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i1iIlIil + ",\"channel\":406}",
      li111l1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(illiI1i)
      },
      IIi1Il1l = await getH5st("8adfb", li111l1),
      Iil1IIil = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + illiI1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIi1Il1l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Iil1IIil, async (iiII1Ili, I1iIiii, Il11lill) => {
      try {
        Il11lill = Il11lill && Il11lill.match(/jsonp_.*?\((.*?)\);/) && Il11lill.match(/jsonp_.*?\((.*?)\);/)[1] || Il11lill;
        let IIilllII = $.toObj(Il11lill, Il11lill);
        if (IIilllII && typeof IIilllII == "object") {
          if (IIilllII && IIilllII.success === true) {
            console.log(IIilllII.message);
            $.errorJoinShop = IIilllII.message;
            if (IIilllII.result && IIilllII.result.giftInfo) for (let i11i1IIl of IIilllII.result.giftInfo.giftList) {
              console.log("入会获得: " + i11i1IIl.discountString + i11i1IIl.prizeName + i11i1IIl.secondLineDesc);
            }
            console.log("");
          } else {
            if (IIilllII && typeof IIilllII == "object" && IIilllII.message) {
              $.errorJoinShop = IIilllII.message;
              console.log("" + (IIilllII.message || ""));
            } else {
              console.log(Il11lill);
            }
          }
        } else console.log(Il11lill);
      } catch (ilIll1II) {
        $.logErr(ilIll1II, I1iIiii);
      } finally {
        ll111lll();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async llIlIiil => {
    let iliiii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IliIiIiI = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iliiii)
      },
      ililIlIl = await getH5st("ef79a", IliIiIiI),
      ililiiil = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iliiii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ililIlIl),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ililiiil, async (liI1lIl, l1ii1iII, il1iiIIi) => {
      try {
        il1iiIIi = il1iiIIi && il1iiIIi.match(/jsonp_.*?\((.*?)\);/) && il1iiIIi.match(/jsonp_.*?\((.*?)\);/)[1] || il1iiIIi;
        let Ii1IlIi1 = $.toObj(il1iiIIi, il1iiIIi);
        Ii1IlIi1 && typeof Ii1IlIi1 == "object" ? Ii1IlIi1 && Ii1IlIi1.success == true && (console.log("\n去加入店铺会员：" + (Ii1IlIi1.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = Ii1IlIi1.result.interestsRuleList && Ii1IlIi1.result.interestsRuleList[0] && Ii1IlIi1.result.interestsRuleList[0].interestsInfo && Ii1IlIi1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(il1iiIIi);
      } catch (ii1iIII) {
        $.logErr(ii1iIII, l1ii1iII);
      } finally {
        llIlIiil();
      }
    });
  });
}
