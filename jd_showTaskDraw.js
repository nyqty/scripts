/*
活动名称：九宫格抽奖 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/showTaskDraw?id=<活动id>&user_id=<店铺id>
环境变量：jd_showTaskDraw_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('九宫格抽奖（京耕）')
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
  if (process.env.jd_showTaskDraw_activityUrl) activityUrl = process.env.jd_showTaskDraw_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(lilili => {
    cookiesArr.push(jdCookieNode[lilili]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(ii1Illli => ii1Illli.cookie)].filter(iIIiI1l1 => !!iIIiI1l1);
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
  console.log("活动入口：https://jinggeng-isv.isvjcloud.com/ql/front/showTaskDraw?id=" + activityId + "&user_id=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let lIlIiIii = 0; lIlIiIii < cookiesArr.length; lIlIiIii++) {
    if (cookiesArr[lIlIiIii]) {
      cookie = cookiesArr[lIlIiIii];
      originCookie = cookiesArr[lIlIiIii];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = lIlIiIii + 1;
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
      await showTaskDraw();
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(l1II1l1i => {
  $.log("", " " + $.name + ", 失败! 原因: " + l1II1l1i + "!", "");
}).finally(() => {
  $.done();
});
async function showTaskDraw() {
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
    await showTaskDrawz();
    if ($.activityEnd === true) {
      return;
    }
    await recordActPvUvData();
    for (let l1llIiIl = 0; l1llIiIl < $.cjcs; l1llIiIl++) {
      !$.errs && (await postFrontTaskDraw(), await $.wait(3000));
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function setMixNick() {
  return new Promise(lil1I1I1 => {
    let IIiI1lIi = "strTMMixNick=" + $.token + "&userId=" + $.shopid + "&source=01";
    $.post(taskPostUrl("/front/setMixNick", IIiI1lIi), async (iii1iIil, Ili1iIIl, li1IlIl1) => {
      try {
        if (iii1iIil) {
          console.log("" + JSON.stringify(iii1iIil));
          console.log($.name + " setMixNick API请求失败，请检查网路重试");
        } else {
          li1IlIl1 = JSON.parse(li1IlIl1);
          li1IlIl1 && li1IlIl1.succ && ($.inviterNicks = li1IlIl1.msg);
          if (Ili1iIIl.status == 200) {
            refreshToken(Ili1iIIl);
          }
        }
      } catch (IlIl11) {
        $.logErr(IlIl11, Ili1iIIl);
      } finally {
        lil1I1I1();
      }
    });
  });
}
function recordActPvUvData() {
  return new Promise(iI1lIl1 => {
    let Ii1l1ii = "userId=" + $.shopid + "&actId=" + activityId;
    $.post(taskPostUrl("/ql/front/reportActivity/recordActPvUvData", Ii1l1ii), async (Il1lI1il, l1il11l, l1II1i1I) => {
      try {
        Il1lI1il ? (console.log("" + JSON.stringify(Il1lI1il)), console.log($.name + " recordActPvUvData API请求失败，请检查网路重试")) : l1il11l.status == 200 && refreshToken(l1il11l);
      } catch (I1Ii111l) {
        $.logErr(I1Ii111l, l1il11l);
      } finally {
        iI1lIl1();
      }
    });
  });
}
function checkTokenInSession() {
  return new Promise(llIlIlI1 => {
    let liiIliiI = "userId=" + $.shopid + "&token=" + $.token;
    $.post(taskPostUrl("/front/checkTokenInSession", liiIliiI), async (ililIi, ilIliiil, I1iiIiiI) => {
      try {
        ililIi ? (console.log("" + JSON.stringify(ililIi)), console.log($.name + " checkTokenInSession API请求失败，请检查网路重试")) : ilIliiil.status == 200 && refreshToken(ilIliiil);
      } catch (IiIiIiil) {
        $.logErr(IiIiIiil, ilIliiil);
      } finally {
        llIlIlI1();
      }
    });
  });
}
function receiveInviteJoinAward() {
  return new Promise(ill1li1 => {
    let ilillIIi = "act_id=" + activityId + "&user_id=" + $.shopid + "&awardId=" + $.awardId;
    $.post(taskPostUrl("/ql/front/receiveInviteJoinAward", ilillIIi), async (llIiiIIi, lIill1II, i11ill1l) => {
      try {
        llIiiIIi ? (console.log("" + JSON.stringify(llIiiIIi)), console.log($.name + " receiveInviteJoinAward API请求失败，请检查网路重试")) : (i11ill1l = JSON.parse(i11ill1l), i11ill1l && i11ill1l.succ ? console.log("领取奖励成功") : console.log("领取奖励失败：" + result.msg), lIill1II.status == 200 && refreshToken(lIill1II));
      } catch (liIlIlI) {
        $.logErr(liIlIlI, lIill1II);
      } finally {
        ill1li1();
      }
    });
  });
}
function postFrontTaskDraw() {
  return new Promise(IlIi1Ili => {
    let llI111l1 = "act_id=" + activityId + "&user_id=" + $.shopid + "&drawCountNumFlag=true";
    $.post(taskPostUrl("/ql/front/postFrontTaskDraw", llI111l1), async (Ilii1iI, li1I1li, llIIiI1I) => {
      try {
        if (Ilii1iI) {
          console.log("" + JSON.stringify(Ilii1iI));
          console.log($.name + " postFrontTaskDraw API请求失败，请检查网路重试");
        } else {
          llIIiI1I = JSON.parse(llIIiI1I);
          if (llIIiI1I && llIIiI1I.succ) {
            let Il1iIIII = JSON.parse(llIIiI1I.msg).drawAwardDto,
              i1iIll1l = Il1iIIII.awardType;
            switch (i1iIll1l) {
              case "JD_BEAN":
                console.log("🎉 " + Il1iIIII.awardName + " 🐶");
                break;
              case "JD_POINT":
                console.log("🗑️ " + Il1iIIII.awardSendNum + Il1iIIII.awardName + " 🎟️");
                break;
              case "JD_COUPON":
                console.log("🗑️ 优惠券");
                break;
              default:
                console.log(Il1iIIII);
                break;
            }
          } else {
            llIIiI1I.msg.includes("未中奖") ? console.log("💨 空气") : console.log("" + llIIiI1I.msg);
            Ilii1iI = llIIiI1I.msg;
            for (let ilI1lIi of ["不足", "部分会员", "火爆", "上限"]) {
              if (Ilii1iI.includes(ilI1lIi)) {
                $.errs = true;
                break;
              }
            }
          }
          li1I1li.status == 200 && refreshToken(li1I1li);
        }
      } catch (i11Illll) {
        $.logErr(i11Illll, li1I1li);
      } finally {
        IlIi1Ili();
      }
    });
  });
}
function showTaskDrawz() {
  return new Promise(l11lIIi => {
    const i11lIl11 = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showTaskDraw?id=" + activityId + "&user_id=" + $.shopid,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showTaskDraw?id=" + activityId + "&user_id=" + $.shopid,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(i11lIl11, async (il1lI1Ii, iI1iii1I, IIlI1I1) => {
      try {
        if (il1lI1Ii) {
          console.log("" + JSON.stringify(il1lI1Ii));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          IIlI1I1 = IIlI1I1;
          if (IIlI1I1) {
            let l1illii = IIlI1I1.match(/(活动已结束)/) && IIlI1I1.match(/(活动已结束)/)[1] || "";
            l1illii && ($.activityEnd = true, console.log("活动已结束"));
            if ($.index === 1) {
              let ililiIll = IIlI1I1.match(/id="description" style="display: none">(.+)</);
              ililiIll && ($.rlue = ililiIll[1]);
              let iiill1lI = IIlI1I1.match(/每日抽奖最多 (\d+) 次/);
              if (iiill1lI) {
                $.cjcs = iiill1lI[1];
                console.log("每日抽奖次数上限：" + $.cjcs + "\n");
              } else {
                $.cjcs = drawnum;
                console.log("每日抽奖次数上限：" + $.cjcs + "\n");
              }
            }
          }
        }
      } catch (ill1IlI1) {
        $.logErr(ill1IlI1, iI1iii1I);
      } finally {
        l11lIIi();
      }
    });
  });
}
function getShopOpenCardInfo(III1llII) {
  let IlI1l = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(III1llII)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(II1l11Ii => {
    $.get(IlI1l, (Ii1illll, ilII111i, IlI1lli1) => {
      try {
        Ii1illll ? Ii1illll === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(Ii1illll))) : (res = JSON.parse(IlI1lli1), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (i11iI1i1) {
        console.log(i11iI1i1);
      } finally {
        II1l11Ii();
      }
    });
  });
}
function taskPostUrl(i1Iliil, I1l1II1l) {
  return {
    "url": "" + domains + i1Iliil,
    "body": I1l1II1l,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "Host": "jinggeng-isv.isvjcloud.com",
      "Origin": "https://jinggeng-isv.isvjcloud.com",
      "Referer": "https://jinggeng-isv.isvjcloud.com/ql/front/showTaskDraw?id=" + activityId + "&user_id=" + venderId,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    }
  };
}
function taskUrl(IIiIi1ii, Iilii1ii) {
  return {
    "url": "https://api.m.jd.com/client.action" + IIiIi1ii,
    "body": Iilii1ii,
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
function refreshToken(Il1lilI1) {
  if (Il1lilI1) {
    if (Il1lilI1.headers["set-cookie"]) {
      cookie = "";
      for (let l1i1l1li of Il1lilI1.headers["set-cookie"]) {
        lz_cookie[l1i1l1li.split(";")[0].substr(0, l1i1l1li.split(";")[0].indexOf("="))] = l1i1l1li.split(";")[0].substr(l1i1l1li.split(";")[0].indexOf("=") + 1);
      }
      for (const il111IiI of Object.keys(lz_cookie)) {
        cookie += il111IiI + "=" + lz_cookie[il111IiI] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(Ill1ili) {
  Ill1ili = Ill1ili || 32;
  let IllIillI = "abcdef0123456789",
    iIl1lIi = IllIillI.length,
    ilIiIIi = "";
  for (i = 0; i < Ill1ili; i++) ilIiIIi += IllIillI.charAt(Math.floor(Math.random() * iIl1lIi));
  return ilIiIIi;
}
function safeGet(ilIlI1Il) {
  if (!ilIlI1Il) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(ilIlI1Il) == "object") return true;
  } catch (I1iilIIi) {
    return console.log(I1iilIIi), false;
  }
}
function jsonParse(Il1i111I) {
  if (typeof Il1i111I == "string") {
    try {
      return JSON.parse(Il1i111I);
    } catch (llII1Ii) {
      return console.log(llII1Ii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function getQueryString(iiIIlIiI, i1ll1Iil) {
  let ilIl11ii = new RegExp("(^|[&?])" + i1ll1Iil + "=([^&]*)(&|$)"),
    i111liI = iiIIlIiI.match(ilIl11ii);
  if (i111liI != null) return decodeURIComponent(i111liI[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async I1lIiIi => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IlI11l11 = "";
    if ($.shopactivityId) IlI11l11 = ",\"activityId\":" + $.shopactivityId;
    const lI1Iiii1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IlI11l11 + ",\"channel\":406}",
      l11IIiil = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lI1Iiii1)
      },
      i11iIiiI = await getH5st("8adfb", l11IIiil),
      iIIl1lI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lI1Iiii1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i11iIiiI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIIl1lI, async (l11li11, iilI1i1i, liI1IlIi) => {
      try {
        liI1IlIi = liI1IlIi && liI1IlIi.match(/jsonp_.*?\((.*?)\);/) && liI1IlIi.match(/jsonp_.*?\((.*?)\);/)[1] || liI1IlIi;
        let IlIilll = $.toObj(liI1IlIi, liI1IlIi);
        if (IlIilll && typeof IlIilll == "object") {
          if (IlIilll && IlIilll.success === true) {
            console.log(IlIilll.message);
            $.errorJoinShop = IlIilll.message;
            if (IlIilll.result && IlIilll.result.giftInfo) for (let Iii1lil1 of IlIilll.result.giftInfo.giftList) {
              console.log("入会获得: " + Iii1lil1.discountString + Iii1lil1.prizeName + Iii1lil1.secondLineDesc);
            }
            console.log("");
          } else IlIilll && typeof IlIilll == "object" && IlIilll.message ? ($.errorJoinShop = IlIilll.message, console.log("" + (IlIilll.message || ""))) : console.log(liI1IlIi);
        } else console.log(liI1IlIi);
      } catch (l1I1i1lI) {
        $.logErr(l1I1i1lI, iilI1i1i);
      } finally {
        I1lIiIi();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async i11ii1l => {
    let i1lIiII = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const ll1lIli = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1lIiII)
      },
      I11li = await getH5st("ef79a", ll1lIli),
      ll1ll11i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + i1lIiII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I11li),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ll1ll11i, async (lIIIi1II, ilIlill, I1IIiIII) => {
      try {
        I1IIiIII = I1IIiIII && I1IIiIII.match(/jsonp_.*?\((.*?)\);/) && I1IIiIII.match(/jsonp_.*?\((.*?)\);/)[1] || I1IIiIII;
        let II1lil1i = $.toObj(I1IIiIII, I1IIiIII);
        II1lil1i && typeof II1lil1i == "object" ? II1lil1i && II1lil1i.success == true && (console.log("\n去加入店铺会员：" + (II1lil1i.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = II1lil1i.result.interestsRuleList && II1lil1i.result.interestsRuleList[0] && II1lil1i.result.interestsRuleList[0].interestsInfo && II1lil1i.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(I1IIiIII);
      } catch (llIllIi) {
        $.logErr(llIllIi, ilIlill);
      } finally {
        i11ii1l();
      }
    });
  });
}
