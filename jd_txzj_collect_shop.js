/**
收藏大师-关注商品

必须条件：配置文件或者环境变量中添加变量：
//export jd_collect_shop_activityUrl="活动链接"


cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#收藏大师-关注商品
1 1 1 1 * jd_collect_shop.js, tag=收藏大师-关注商品, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("收藏大师-关注商品");
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const getToken = require("./function/krgetToken");
let lz_cookie = {};
let activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_collect_shop_activityUrl) activityUrl = process.env.jd_collect_shop_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(QQQOOO => {
    cookiesArr.push(jdCookieNode[QQQOOO]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(QQQ00Q => QQQ00Q.cookie)].filter(QO00OO => !!QO00OO);
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
  for (let QQ0OOQ = 0; QQ0OOQ < cookiesArr.length; QQ0OOQ++) {
    if (cookiesArr[QQ0OOQ]) {
      cookie = cookiesArr[QQ0OOQ];
      originCookie = cookiesArr[QQ0OOQ];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = QQ0OOQ + 1;
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
      await collect_shop();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(O0OOQO => {
  $.log("", " " + $.name + ", 失败! 原因: " + O0OOQO + "!", "");
}).finally(() => {
  $.done();
});
async function collect_shop() {
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
    await collect_shopx();
    if ($.activityEnd) return;
    for (let Q0O0O0 = 0; Q0O0O0 < 20; Q0O0O0++) {
      await receive_prize();
      if ($.getPrize || $.activityEnd || $.grabStop) break;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function jd_store_user_info() {
  return new Promise(QQOO00 => {
    let QOOQOQ = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", QOOQOQ), async (QQQQO0, QOOQOO, QOO0O0) => {
      try {
        if (QQQQO0) {
          console.log("" + JSON.stringify(QQQQO0));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          QOO0O0 = JSON.parse(QOO0O0);
          if (QOO0O0 && QOO0O0.code === "success") {} else {
            $.hasEnd = true;
          }
          if (QOOQOO.status == 200) {
            refreshToken(QOOQOO);
          }
        }
      } catch (O0Q0O0) {
        $.logErr(O0Q0O0, QOOQOO);
      } finally {
        QQOO00();
      }
    });
  });
}
function receive_prize() {
  return new Promise(QQQQQ0 => {
    let QOQOQ0 = "pid=" + activityId;
    $.post(taskPostUrl("/collect_shop/receive_prize", QOQOQ0), async (OOQ00Q, OOQOOO, O0O0O0) => {
      try {
        if (OOQ00Q) {
          console.log("" + JSON.stringify(OOQ00Q));
          console.log($.name + " receive_prize API请求失败，请检查网路重试");
        } else {
          O0O0O0 = JSON.parse(O0O0O0);
          if (O0O0O0 && O0O0O0.code === "success") {
            $.getPrize = true;
            if (O0O0O0.data.prize_title) {
              switch (O0O0O0.data.prize_title.type) {
                case "coupon":
                  console.log("🗑️ 优惠卷");
                  $.activityEnd = true;
                  break;
                case "bean":
                  console.log("🎉 " + O0O0O0.data.prize_title.prize_title + " 🐶");
                  break;
                case "integral":
                  console.log("🎉 积分" + (O0O0O0.data.prize_title.prize_title || O0O0O0.data.prize_title.once_num));
                  break;
                case "goods":
                  console.log("🎉 实物" + O0O0O0.data.prize_title.prize_name);
                  break;
                default:
                  break;
              }
            } else {
              console.log(O0O0O0.msg);
            }
          } else {
            console.log("领取失败：" + O0O0O0.msg);
            OOQ00Q = O0O0O0.msg;
            for (let OO0OOO of ["不足", "部分会员", "已参加", "上限", "已领取", "未开始"]) {
              if (OOQ00Q.includes(OO0OOO)) {
                $.grabStop = true;
                break;
              }
            }
            for (let OOQOOQ of ["num_end"]) {
              if (OOQ00Q.includes(OOQOOQ)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (OOQOOO.status == 200) {
            refreshToken(OOQOOO);
          }
        }
      } catch (QO0O0O) {
        $.logErr(QO0O0O, OOQOOO);
      } finally {
        QQQQQ0();
      }
    });
  });
}
function collect_shopx() {
  return new Promise(OOQQ0O => {
    const O0O0Q0 = {
      "url": domains + "/collect_shop/home?a=" + activityId + "&token=" + $.token,
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
    $.get(O0O0Q0, async (O0OQQO, O0OQ0O, O0OQQQ) => {
      try {
        if (O0OQQO) {
          console.log("" + JSON.stringify(O0OQQO));
          console.log($.name + " collect_shopz API请求失败，请检查网路重试");
        } else {
          O0OQQQ = O0OQQQ;
          if (O0OQQQ) {
            let O0OQ0Q = O0OQQQ.match(/(活动已结束)/) && O0OQQQ.match(/(活动已结束)/)[1] || O0OQQQ.match(/(哎哟，当前活动尚未开始噢！)/) && O0OQQQ.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            if (O0OQ0Q) {
              $.activityEnd = true;
              console.log("活动已结束或者未开始");
            }
          }
        }
      } catch (OO0OQQ) {
        $.logErr(OO0OQQ, O0OQ0O);
      } finally {
        OOQQ0O();
      }
    });
  });
}
function taskPostUrl(QOQO0Q, QOQOQQ) {
  return {
    "url": "" + domains + QOQO0Q,
    "body": QOQOQQ,
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
function refreshToken(OOQOO0) {
  if (OOQOO0) {
    if (OOQOO0.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let QOQQOQ of OOQOO0.headers["set-cookie"]) {
        lz_cookie[QOQQOQ.split(";")[0].substr(0, QOQQOQ.split(";")[0].indexOf("="))] = QOQQOQ.split(";")[0].substr(QOQQOQ.split(";")[0].indexOf("=") + 1);
      }
      for (const QOOOQQ of Object.keys(lz_cookie)) {
        cookie += QOOOQQ + "=" + lz_cookie[QOOOQQ] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(QOQQOO) {
  QOQQOO = QOQQOO || 32;
  let QO0000 = "abcdef0123456789",
    QO0QQQ = QO0000.length,
    QOQ00Q = "";
  for (i = 0; i < QOQQOO; i++) QOQ00Q += QO0000.charAt(Math.floor(Math.random() * QO0QQQ));
  return QOQ00Q;
}
function safeGet(QOQOO0) {
  try {
    if (typeof JSON.parse(QOQOO0) == "object") {
      return true;
    }
  } catch (QOQQ0O) {
    console.log(QOQQ0O);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function jsonParse(QOQQQO) {
  if (typeof QOQQQO == "string") {
    try {
      return JSON.parse(QOQQQO);
    } catch (Q00OQQ) {
      console.log(Q00OQQ);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function random(Q00O0O, OOOQ00) {
  return Math.floor(Math.random() * (OOOQ00 - Q00O0O)) + Q00O0O;
}
function getQueryString(OOO0OQ, Q00OQO) {
  let OQQ0QQ = new RegExp("(^|[&?])" + Q00OQO + "=([^&]*)(&|$)");
  let OQQ00O = OOO0OQ.match(OQQ0QQ);
  if (OQQ00O != null) {
    return unescape(OQQ00O[2]);
  }
  return "";
}
