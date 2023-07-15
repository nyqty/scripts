/**
收藏大师-关注有礼

必须条件：配置文件或者环境变量中添加变量：
//export jd_collect_item_activityUrl="活动链接"


cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#收藏大师-关注有礼
1 1 1 1 * jd_txzj_collect_item.js, tag=收藏大师-关注有礼, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("收藏大师-关注有礼");
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const getToken = require("./function/krgetToken");
let lz_cookie = {};
let activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_collect_item_activityUrl) activityUrl = process.env.jd_collect_item_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(QQ000Q => {
    cookiesArr.push(jdCookieNode[QQ000Q]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(O00QOO => O00QOO.cookie)].filter(QQQQQO => !!QQQQQO);
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
  for (let Q0OQOO = 0; Q0OQOO < cookiesArr.length; Q0OQOO++) {
    if (cookiesArr[Q0OQOO]) {
      cookie = cookiesArr[Q0OQOO];
      originCookie = cookiesArr[Q0OQOO];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = Q0OQOO + 1;
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
      await collect_item();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(QQ0QQ0 => {
  $.log("", " " + $.name + ", 失败! 原因: " + QQ0QQ0 + "!", "");
}).finally(() => {
  $.done();
});
async function collect_item() {
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
    await collect_itemx();
    if ($.activityEnd) return;
    for (let O0Q0O0 = 0; O0Q0O0 < 20; O0Q0O0++) {
      await receive_prize();
      if ($.getPrize || $.activityEnd || $.grabStop) break;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function jd_store_user_info() {
  return new Promise(QQOOQQ => {
    let O0O0O0 = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", O0O0O0), async (O0OQOO, O0OQOQ, OO0OOQ) => {
      try {
        if (O0OQOO) {
          console.log("" + JSON.stringify(O0OQOO));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          OO0OOQ = JSON.parse(OO0OOQ);
          if (OO0OOQ && OO0OOQ.code === "success") {} else {
            $.hasEnd = true;
          }
          if (O0OQOQ.status == 200) {
            refreshToken(O0OQOQ);
          }
        }
      } catch (QO0OQO) {
        $.logErr(QO0OQO, O0OQOQ);
      } finally {
        QQOOQQ();
      }
    });
  });
}
function receive_prize() {
  return new Promise(O0OQQQ => {
    let O00QO0 = "pid=" + activityId;
    $.post(taskPostUrl("/collect_item/receive_prize", O00QO0), async (QOQO0Q, QOQOQQ, QOQO0O) => {
      try {
        if (QOQO0Q) {
          console.log("" + JSON.stringify(QOQO0Q));
          console.log($.name + " receive_prize API请求失败，请检查网路重试");
        } else {
          QOQO0O = JSON.parse(QOQO0O);
          if (QOQO0O && QOQO0O.code === "success") {
            $.getPrize = true;
            if (QOQO0O.data.prize_title) {
              switch (QOQO0O.data.prize_title.type) {
                case "coupon":
                  console.log("🗑️ 优惠卷");
                  $.activityEnd = true;
                  break;
                case "bean":
                  console.log("🎉 " + QOQO0O.data.prize_title.prize_title + " 🐶");
                  break;
                case "integral":
                  console.log("🎉 积分" + (QOQO0O.data.prize_title.prize_title || QOQO0O.data.prize_title.once_num));
                  break;
                case "goods":
                  console.log("🎉 实物" + QOQO0O.data.prize_title.prize_name);
                  break;
                default:
                  break;
              }
            } else {
              console.log(QOQO0O.msg);
            }
          } else {
            console.log("领取失败：" + QOQO0O.msg);
            QOQO0Q = QOQO0O.msg;
            for (let QOQ0OQ of ["不足", "部分会员", "已参加", "上限", "已领取", "未开始"]) {
              if (QOQO0Q.includes(QOQ0OQ)) {
                $.grabStop = true;
                break;
              }
            }
            for (let QOQQ00 of ["num_end"]) {
              if (QOQO0Q.includes(QOQQ00)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (QOQOQQ.status == 200) {
            refreshToken(QOQOQQ);
          }
        }
      } catch (QO00QO) {
        $.logErr(QO00QO, QOQOQQ);
      } finally {
        O0OQQQ();
      }
    });
  });
}
function collect_itemx() {
  return new Promise(QOQOO0 => {
    const QOQ0QQ = {
      "url": domains + "/collect_item/home?a=" + activityId + "&token=" + $.token,
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
    $.get(QOQ0QQ, async (QOQ00O, QOQ0QO, OOQOQQ) => {
      try {
        if (QOQ00O) {
          console.log("" + JSON.stringify(QOQ00O));
          console.log($.name + " collect_itemz API请求失败，请检查网路重试");
        } else {
          OOQOQQ = OOQOQQ;
          if (OOQOQQ) {
            let QOQ0Q0 = OOQOQQ.match(/(活动已结束)/) && OOQOQQ.match(/(活动已结束)/)[1] || OOQOQQ.match(/(哎哟，当前活动尚未开始噢！)/) && OOQOQQ.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            if (QOQ0Q0) {
              $.activityEnd = true;
              console.log("活动已结束或者未开始");
            }
          }
        }
      } catch (QO0OOQ) {
        $.logErr(QO0OOQ, QOQ0QO);
      } finally {
        QOQOO0();
      }
    });
  });
}
function taskPostUrl(OQQOOQ, OQQOOO) {
  return {
    "url": "" + domains + OQQOOQ,
    "body": OQQOOO,
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
function refreshToken(OOOQ00) {
  if (OOOQ00) {
    if (OOOQ00.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let OOOQ0O of OOOQ00.headers["set-cookie"]) {
        lz_cookie[OOOQ0O.split(";")[0].substr(0, OOOQ0O.split(";")[0].indexOf("="))] = OOOQ0O.split(";")[0].substr(OOOQ0O.split(";")[0].indexOf("=") + 1);
      }
      for (const Q00O00 of Object.keys(lz_cookie)) {
        cookie += Q00O00 + "=" + lz_cookie[Q00O00] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(Q0QOQO) {
  Q0QOQO = Q0QOQO || 32;
  let OQQQQQ = "abcdef0123456789",
    OQQ0Q0 = OQQQQQ.length,
    OQQQ0Q = "";
  for (i = 0; i < Q0QOQO; i++) OQQQ0Q += OQQQQQ.charAt(Math.floor(Math.random() * OQQ0Q0));
  return OQQQ0Q;
}
function safeGet(OQQQQO) {
  if (!OQQQQO) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(OQQQQO) == "object") {
      return true;
    }
  } catch (OQQ0QO) {
    console.log(OQQ0QO);
    return false;
  }
}
function jsonParse(OQ00QQ) {
  if (typeof OQ00QQ == "string") {
    try {
      return JSON.parse(OQ00QQ);
    } catch (OQ000Q) {
      console.log(OQ000Q);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function random(OQ00QO, OQ000O) {
  return Math.floor(Math.random() * (OQ000O - OQ00QO)) + OQ00QO;
}
function getQueryString(Q0000O, OOO0O0) {
  let Q00Q0O = new RegExp("(^|[&?])" + OOO0O0 + "=([^&]*)(&|$)");
  let OOOO00 = Q0000O.match(Q00Q0O);
  if (OOOO00 != null) {
    return unescape(OOOO00[2]);
  }
  return "";
}
