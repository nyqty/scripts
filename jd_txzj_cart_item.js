/**
收藏大师-加购有礼

必须条件：配置文件或者环境变量中添加变量：
//export jd_cart_item_activityUrl="活动链接"


cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#收藏大师-加购有礼
1 1 1 1 * jd_txzj_cart_item.js, tag=收藏大师-加购有礼, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("收藏大师-加购有礼");
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const getToken = require("./function/krgetToken");
let lz_cookie = {};
let activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_cart_item_activityUrl) activityUrl = process.env.jd_cart_item_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(O0QOQQ => {
    cookiesArr.push(jdCookieNode[O0QOQQ]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(O0QO0O => O0QO0O.cookie)].filter(QOOOOO => !!QOOOOO);
}
let isGetCookie = typeof $request !== "undefined";
if (isGetCookie) {
  GetCookie();
  $.done();
}
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "a");
  $.domain = activityUrl.match(/https?:\/\/([^\/]+)/)[1];
} else {
  console.log("请填写活动链接");
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("♚♚活动入口♚♚\n" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let O00Q00 = 0; O00Q00 < cookiesArr.length; O00Q00++) {
    if (cookiesArr[O00Q00]) {
      cookie = cookiesArr[O00Q00];
      originCookie = cookiesArr[O00Q00];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = O00Q00 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await getUA();
      await cart_item();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(O000OQ => {
  $.log("", " " + $.name + ", 失败! 原因: " + O000OQ + "!", "");
}).finally(() => {
  $.done();
});
async function cart_item() {
  $.errs = false;
  $.token = await getToken(cookie, domains);
  $.grabStop = false;
  $.getPrize = false;
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if (activityId) {
    await jd_store_user_info();
    if ($.hasEnd === true) {
      return;
    }
    await cart_itemx();
    if ($.activityEnd) return;
    for (let Q0OQOO = 0; Q0OQOO < 20; Q0OQOO++) {
      await receive_prize();
      if ($.getPrize || $.activityEnd || $.grabStop) break;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function jd_store_user_info() {
  return new Promise(QOO0OO => {
    let Q0O0OQ = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", Q0O0OQ), async (Q0OQ00, QQ0000, QQ0QQQ) => {
      try {
        if (Q0OQ00) {
          console.log("" + JSON.stringify(Q0OQ00));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          QQ0QQQ = JSON.parse(QQ0QQQ);
          if (QQ0QQQ && QQ0QQQ.code === "success") {} else {
            $.hasEnd = true;
          }
          if (QQ0000.status == 200) {
            refreshToken(QQ0000);
          }
        }
      } catch (QQQ0O0) {
        $.logErr(QQQ0O0, QQ0000);
      } finally {
        QOO0OO();
      }
    });
  });
}
function receive_prize() {
  return new Promise(QOQOOQ => {
    let QO0O0Q = "pid=" + activityId;
    $.post(taskPostUrl("/cart_item/receive_prize", QO0O0Q), async (O0OQQ0, O0OQ00, OO00QQ) => {
      try {
        if (O0OQQ0) {
          console.log("" + JSON.stringify(O0OQQ0));
          console.log($.name + " receive_prize API请求失败，请检查网路重试");
        } else {
          OO00QQ = JSON.parse(OO00QQ);
          if (OO00QQ && OO00QQ.code === "success") {
            $.getPrize = true;
            if (OO00QQ.data.prize_info) {
              switch (OO00QQ.data.prize_info.type) {
                case "coupon":
                  console.log("🗑️ 优惠卷");
                  $.activityEnd = true;
                  break;
                case "bean":
                  console.log("🎉 " + OO00QQ.data.prize_info.prize_title + " 🐶");
                  break;
                case "integral":
                  console.log("🎉 积分" + (OO00QQ.data.prize_info.prize_title || OO00QQ.data.prize_info.once_num));
                  break;
                case "goods":
                  console.log("🎉 实物" + OO00QQ.data.prize_info.prize_name);
                  break;
                default:
                  break;
              }
            } else {
              console.log(OO00QQ.msg);
            }
          } else {
            console.log("领取失败：" + OO00QQ.msg);
            O0OQQ0 = OO00QQ.msg;
            for (let OO0O0O of ["不足", "部分会员", "已参加", "上限", "已领取", "未开始"]) {
              if (O0OQQ0.includes(OO0O0O)) {
                $.grabStop = true;
                break;
              }
            }
            for (let QOQOQQ of ["num_end"]) {
              if (O0OQQ0.includes(QOQOQQ)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (O0OQ00.status == 200) {
            refreshToken(O0OQ00);
          }
        }
      } catch (OOQQQQ) {
        $.logErr(OOQQQQ, O0OQ00);
      } finally {
        QOQOOQ();
      }
    });
  });
}
function cart_itemx() {
  return new Promise(O0O0QQ => {
    const QOQQQ0 = {
      "url": domains + "/cart_item/home?a=" + activityId + "&token=" + $.token,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": $.domain,
        "Referer": activityUrl,
        "User-Agent": $.UA
      }
    };
    $.get(QOQQQ0, async (QO00QO, QO000O, QO0OO0) => {
      try {
        if (QO00QO) {
          console.log("" + JSON.stringify(QO00QO));
          console.log($.name + " cart_itemz API请求失败，请检查网路重试");
        } else {
          QO0OO0 = QO0OO0;
          if (QO0OO0) {
            let QOQQOQ = QO0OO0.match(/(活动已结束)/) && QO0OO0.match(/(活动已结束)/)[1] || QO0OO0.match(/(哎哟，当前活动尚未开始噢！)/) && QO0OO0.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            if (QOQQOQ) {
              $.activityEnd = true;
              console.log("活动已结束或者未开始");
            }
          }
        }
      } catch (QO000Q) {
        $.logErr(QO000Q, QO000O);
      } finally {
        O0O0QQ();
      }
    });
  });
}
function taskPostUrl(QO00OQ, QOQ0O0) {
  return {
    "url": "" + domains + QO00OQ,
    "body": QOQ0O0,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie,
      "Host": $.domain,
      "Origin": domains,
      "Referer": activityUrl,
      "User-Agent": $.UA
    }
  };
}
function refreshToken(QOOO0O) {
  if (QOOO0O) {
    if (QOOO0O.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let OOQO0O of QOOO0O.headers["set-cookie"]) {
        lz_cookie[OOQO0O.split(";")[0].substr(0, OOQO0O.split(";")[0].indexOf("="))] = OOQO0O.split(";")[0].substr(OOQO0O.split(";")[0].indexOf("=") + 1);
      }
      for (const QO0OQ0 of Object.keys(lz_cookie)) {
        cookie += QO0OQ0 + "=" + lz_cookie[QO0OQ0] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(QOQQQO) {
  QOQQQO = QOQQQO || 32;
  let Q00O0Q = "abcdef0123456789",
    OOOQQ0 = Q00O0Q.length,
    OOO0OO = "";
  for (i = 0; i < QOQQQO; i++) OOO0OO += Q00O0Q.charAt(Math.floor(Math.random() * OOOQQ0));
  return OOO0OO;
}
function safeGet(Q00OQQ) {
  if (!Q00OQQ) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(Q00OQQ) == "object") {
      return true;
    }
  } catch (OQQ0QQ) {
    console.log(OQQ0QQ);
    return false;
  }
}
function jsonParse(OQQ00O) {
  if (typeof OQQ00O == "string") {
    try {
      return JSON.parse(OQQ00O);
    } catch (Q00OQ0) {
      console.log(Q00OQ0);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function random(Q00OOQ, OOO0QO) {
  return Math.floor(Math.random() * (OOO0QO - Q00OOQ)) + Q00OOQ;
}
function getQueryString(OQ0O0O, Q0QO0Q) {
  let OOOQO0 = new RegExp("(^|[&?])" + Q0QO0Q + "=([^&]*)(&|$)");
  let Q0000Q = OQ0O0O.match(OOOQO0);
  if (Q0000Q != null) {
    return unescape(Q0000Q[2]);
  }
  return "";
}