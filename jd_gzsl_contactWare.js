/*
活动名称：关注有礼 · 无线营销
活动链接：https://gzsl-isv.isvjcloud.com/wuxian/user/contactWare/<活动id>
环境变量：jd_gzsl_contactWare_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('关注有礼（无线营销）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')

let cookiesArr = [],
  cookie = "",
  allMessage = "",
  activityUrl = process.env.jd_gzsl_contactWare_activityUrl ? process.env.jd_gzsl_contactWare_activityUrl : "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(i1ilIl11 => {
    cookiesArr.push(jdCookieNode[i1ilIl11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(I1iiIi1i => I1iiIi1i.cookie)].filter(Il1il1i1 => !!Il1il1i1);
if (activityUrl) {
  let pattern = activityUrl.match(/contact\/(.+d?)/) || activityUrl.match(/contactWare\/(.+d?)/);
  pattern && (activityId = pattern[1]);
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：" + activityUrl);
  for (let ii11lIii = 0; ii11lIii < cookiesArr.length; ii11lIii++) {
    if (cookiesArr[ii11lIii]) {
      cookie = cookiesArr[ii11lIii];
      originCookie = cookiesArr[ii11lIii];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ii11lIii + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await run();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
  if (allMessage) {
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + allMessage);
    $.msg($.name, "", allMessage);
  }
})().catch(l1I1ilIi => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + l1I1ilIi + "!", "");
}).finally(() => {
  $.done();
});
async function run() {
  try {
    $.token = "";
    $.errs = false;
    $.token = await getToken(originCookie, domains);
    if ($.token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await $.wait(300);
    await getFollowActivity();
    if ($.activityEnd) return;
    await $.wait(300);
    !$.isContact ? (await contact(), await $.wait(300)) : $.log("已经关注过~");
  } catch (iii111li) {
    console.log(iii111li);
  }
}
function contact() {
  body = {
    "activityId": activityId,
    "token": $.token,
    "source": "01"
  };
  let liI1Ilii = {
    "url": domains + "/wuxian/user/contact/" + activityId,
    "headers": {
      "Host": $.domain,
      "Connection": "keep-alive",
      "Accept": "application/json, text/plain, */*",
      "User-Agent": UA,
      "Content-Type": "application/json;charset=UTF-8",
      "Origin": "https://" + $.domain,
      "Referer": activityUrl,
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,th-CN;q=0.8,th;q=0.7,vi-CN;q=0.6,vi;q=0.5,en-US;q=0.4,en;q=0.3",
      "Cookie": cookie
    },
    "body": JSON.stringify(body)
  };
  return new Promise(IiIIii1l => {
    $.post(liI1Ilii, (IilIlli1, IiIl1il1, liI1li1) => {
      try {
        if (IilIlli1) $.log(IilIlli1);else {
          if (safeGet(liI1li1)) {
            liI1li1 = JSON.parse(liI1li1);
            if (liI1li1 && liI1li1.status == 1) {
              $.couponDiscount = liI1li1.activity.couponDiscount;
              $.pointNum = liI1li1.activity.pointNum;
              $.getPoints = liI1li1.activity.getPoints;
              $.getCoupon = liI1li1.activity.getCoupon;
              if ($.getPoints != 0 && $.getCoupon == 0) console.log("领取成功：" + $.pointNum + " 🎟️ ");else {
                if ($.getPoints == 0 && $.getCoupon != 0) {
                  console.log("领取成功：" + $.couponDiscount + "🗑️ 优惠券 ");
                } else {
                  console.log("领取成功：" + $.couponDiscount + "🗑️ 优惠券 " + $.pointNum + " 🎟️ ");
                }
              }
            } else {
              $.log(liI1li1.msg);
              IilIlli1 = liI1li1.msg;
              for (let lIIlil11 of ["不足", "火爆", "上限", "用完了", "擦肩", "抽奖机会"]) {
                if (IilIlli1.includes(lIIlil11)) {
                  $.errs = true;
                  break;
                }
              }
              for (let lilllIii of ["结束", "未开始"]) {
                if (IilIlli1.includes(lilllIii)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          } else $.log("京东返回了空数据");
        }
      } catch (lllI1i1i) {
        $.log(lllI1i1i);
      } finally {
        IiIIii1l();
      }
    });
  });
}
function getFollowActivity() {
  body = {
    "activityId": activityId,
    "token": $.token,
    "source": "01"
  };
  let IIlliIil = {
    "url": domains + "/wuxian/user/getFollowActivity/" + activityId,
    "headers": {
      "Host": $.domain,
      "Connection": "keep-alive",
      "Accept": "application/json, text/plain, */*",
      "User-Agent": UA,
      "Content-Type": "application/json;charset=UTF-8",
      "Origin": "https://" + $.domain,
      "Referer": activityUrl,
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,th-CN;q=0.8,th;q=0.7,vi-CN;q=0.6,vi;q=0.5,en-US;q=0.4,en;q=0.3",
      "Cookie": cookie
    },
    "body": JSON.stringify(body)
  };
  return new Promise(ii11i1I => {
    $.post(IIlliIil, (li11lIII, I1l11II, lilll1I1) => {
      try {
        if (li11lIII) {
          $.log(li11lIII);
        } else {
          if (safeGet(lilll1I1)) {
            lilll1I1 = JSON.parse(lilll1I1);
            if (lilll1I1 && lilll1I1.status == 1) {
              $.isContact = lilll1I1.isContact;
              $.index == 1 && ($.title = lilll1I1.activity.title, console.log("活动名称：" + $.title + "\n"), $.rule = lilll1I1.activity.rule, console.log("活动规则：" + $.rule + "\n"));
            } else {
              $.log(lilll1I1.msg);
              li11lIII = lilll1I1.msg;
              for (let lII1lIlI of ["不足", "火爆", "上限", "用完了", "擦肩", "抽奖机会"]) {
                if (li11lIII.includes(lII1lIlI)) {
                  $.errs = true;
                  break;
                }
              }
              for (let l1liII1l of ["结束", "未开始"]) {
                if (li11lIII.includes(l1liII1l)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          } else $.log("京东返回了空数据");
        }
      } catch (illiil) {
        $.log(illiil);
      } finally {
        ii11i1I();
      }
    });
  });
}
function jsonParse(I1iiIlll) {
  if (typeof I1iiIlll == "string") try {
    return JSON.parse(I1iiIlll);
  } catch (ll1ii1) {
    return console.log(ll1ii1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function safeGet(Iii1lii) {
  if (!Iii1lii) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(Iii1lii) == "object") {
      return true;
    }
  } catch (l1liIii) {
    return console.log(l1liIii), false;
  }
}
function getQueryString(iIiilIi1, IIliIl1i) {
  let il1111iI = new RegExp("(^|[&?])" + IIliIl1i + "=([^&]*)(&|$)"),
    iilI1lII = iIiilIi1.match(il1111iI);
  if (iilI1lII != null) return decodeURIComponent(iilI1lII[2]);
  return "";
}
function timestampToTime(Iii1Ili) {
  var i1iil1Ii = new Date(Iii1Ili);
  var l1iIIl1i = i1iil1Ii.getFullYear() + "-";
  var i11i1111 = (i1iil1Ii.getMonth() + 1 < 10 ? "0" + (i1iil1Ii.getMonth() + 1) : i1iil1Ii.getMonth() + 1) + "-";
  var lII11iIi = i1iil1Ii.getDate() + " ";
  lII11iIi.length == 2 && (lII11iIi = "0" + lII11iIi);
  var Iil1iili = i1iil1Ii.getHours() + ":";
  var li1ll1il = i1iil1Ii.getMinutes() + ":";
  var I1lIIli1 = i1iil1Ii.getSeconds();
  return l1iIIl1i + i11i1111 + lII11iIi + Iil1iili + li1ll1il + I1lIIli1;
}
function getUA() {
  UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(lI1II1l) {
  lI1II1l = lI1II1l || 32;
  let iI1Ilil1 = "abcdef0123456789",
    iIliiIl1 = iI1Ilil1.length,
    lIl1iIlI = "";
  for (i = 0; i < lI1II1l; i++) lIl1iIlI += iI1Ilil1.charAt(Math.floor(Math.random() * iIliiIl1));
  return lIl1iIlI;
}
