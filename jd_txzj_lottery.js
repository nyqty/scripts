/**
收藏大师-幸运抽奖

必须条件：配置文件或者环境变量中添加变量：
//export jd_lottery_activityUrl="活动链接"


cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#收藏大师-幸运抽奖
1 1 1 1 * jd_txzj_lottery.js, tag=收藏大师-幸运抽奖, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("收藏大师-幸运抽奖");
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const getToken = require("./function/krgetToken");
let lz_cookie = {};
let activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_lottery_activityUrl) activityUrl = process.env.jd_lottery_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(QQQOO0 => {
    cookiesArr.push(jdCookieNode[QQQOO0]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(QQQ00O => QQQ00O.cookie)].filter(QQQ0QO => !!QQQ0QO);
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
  for (let QQOOQO = 0; QQOOQO < cookiesArr.length; QQOOQO++) {
    if (cookiesArr[QQOOQO]) {
      cookie = cookiesArr[QQOOQO];
      originCookie = cookiesArr[QQOOQO];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = QQOOQO + 1;
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
      await lottery();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(QQQQO0 => {
  $.log("", " " + $.name + ", 失败! 原因: " + QQQQO0 + "!", "");
}).finally(() => {
  $.done();
});
async function lottery() {
  $.errs = false;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if (activityId) {
    await jd_store_user_info();
    if ($.hasEnd === true) {
      return;
    }
    await lotteryx();
    if ($.activityEnd) return;
    await task_shop_win_num();
    await $.wait(1000);
    if ($.drawnum == 0) {
      console.log("今天没有抽奖机会了，明天再来吧~");
    }
    for (let QQ0QQQ = 0; QQ0QQQ < $.drawnum; QQ0QQQ++) {
      if (!$.errs) {
        await lottery_win_prize();
        await $.wait(2000);
      }
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function jd_store_user_info() {
  return new Promise(QQ000O => {
    let OO0OQ0 = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", OO0OQ0), async (QOQO00, QOQOQ0, OOQ00Q) => {
      try {
        if (QOQO00) {
          console.log("" + JSON.stringify(QOQO00));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          OOQ00Q = JSON.parse(OOQ00Q);
          if (OOQ00Q && OOQ00Q.code === "success") {} else {
            $.hasEnd = true;
          }
          if (QOQOQ0.status == 200) {
            refreshToken(QOQOQ0);
          }
        }
      } catch (QOQOOO) {
        $.logErr(QOQOOO, QOQOQ0);
      } finally {
        QQ000O();
      }
    });
  });
}
function task_shop_win_num() {
  return new Promise(OOQ000 => {
    let QOQOQO = "pid=" + activityId;
    $.post(taskPostUrl("/lottery/task_shop_win_num", QOQOQO), async (OOQQQQ, OOQQ0Q, OOQ0QO) => {
      try {
        if (OOQQQQ) {
          console.log("" + JSON.stringify(OOQQQQ));
          console.log($.name + " task_shop_win_num API请求失败，请检查网路重试");
        } else {
          OOQ0QO = JSON.parse(OOQ0QO);
          if (OOQ0QO && OOQ0QO.code === "success") {
            $.drawnum++;
          } else {
            OOQQQQ = OOQ0QO.msg;
            for (let OOQOO0 of ["不足", "火爆", "上限", "用完了", "擦肩", "抽奖机会", "达到", "已完成"]) {
              if (OOQQQQ.includes(OOQOO0)) {
                $.errs = true;
                break;
              }
            }
          }
          if (OOQQ0Q.status == 200) {
            refreshToken(OOQQ0Q);
          }
        }
      } catch (O0O00Q) {
        $.logErr(O0O00Q, OOQQ0Q);
      } finally {
        OOQ000();
      }
    });
  });
}
function lottery_win_prize() {
  return new Promise(QOQ0OO => {
    let QO0000 = "pid=" + activityId;
    $.post(taskPostUrl("/lottery/lottery_win_prize", QO0000), async (QO0QQQ, QOQ00Q, QOQOO0) => {
      try {
        if (QO0QQQ) {
          console.log("" + JSON.stringify(QO0QQQ));
          console.log($.name + " lottery_win_prize API请求失败，请检查网路重试");
        } else {
          QOQOO0 = JSON.parse(QOQOO0);
          if (QOQOO0 && QOQOO0.code === "success") {
            if (QOQOO0.data.prize_info) {
              switch (QOQOO0.data.prize_info.type) {
                case "coupon":
                  console.log("🗑️ 优惠卷");
                  break;
                case "bean":
                  console.log("🎉 " + QOQOO0.data.prize_info.prize_title + " 🐶");
                  break;
                case "integral":
                  console.log("🎉 积分" + (QOQOO0.data.prize_info.prize_title || QOQOO0.data.prize_info.once_num));
                  break;
                case "goods":
                  console.log("🎉 实物" + QOQOO0.data.prize_info.prize_name);
                  break;
                default:
                  console.log(QOQOO0.msg);
                  break;
              }
            } else {
              console.log("💨  空气");
            }
          } else {
            console.log("领取失败：" + QOQOO0.msg);
            QO0QQQ = QOQOO0.msg;
            for (let QO0O00 of ["不足", "部分会员", "火爆", "上限", "已领取", "未开始"]) {
              if (QO0QQQ.includes(QO0O00)) {
                $.errs = true;
                break;
              }
            }
          }
          if (QOQ00Q.status == 200) {
            refreshToken(QOQ00Q);
          }
        }
      } catch (QOQQQQ) {
        $.logErr(QOQQQQ, QOQ00Q);
      } finally {
        QOQ0OO();
      }
    });
  });
}
function lotteryx() {
  return new Promise(OOO0OQ => {
    const OQQOQ0 = {
      "url": domains + "/lottery/home?a=" + activityId + "&token=" + $.token,
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
    $.get(OQQOQ0, async (OQ0O00, OQ0OQ0, Q0QOQ0) => {
      try {
        if (OQ0O00) {
          console.log("" + JSON.stringify(OQ0O00));
          console.log($.name + " lotteryz API请求失败，请检查网路重试");
        } else {
          Q0QOQ0 = Q0QOQ0;
          if (Q0QOQ0) {
            let Q00OOQ = Q0QOQ0.match(/(活动已结束)/) && Q0QOQ0.match(/(活动已结束)/)[1] || Q0QOQ0.match(/(哎哟，当前活动尚未开始噢！)/) && Q0QOQ0.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            if (Q00OOQ) {
              $.activityEnd = true;
              console.log("活动已结束或者未开始");
            }
            let OOO0QO = Q0QOQ0.match(/剩余抽奖<span>(.+)<\/span>次/);
            if (OOO0QO) {
              $.drawnum = OOO0QO[1];
            }
          }
        }
      } catch (OQ0O0Q) {
        $.logErr(OQ0O0Q, OQ0OQ0);
      } finally {
        OOO0OQ();
      }
    });
  });
}
function taskPostUrl(Q0QOQQ, OQQ000) {
  return {
    "url": "" + domains + Q0QOQQ,
    "body": OQQ000,
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
function refreshToken(Q00OOO) {
  if (Q00OOO) {
    if (Q00OOO.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let OQQ0OO of Q00OOO.headers["set-cookie"]) {
        lz_cookie[OQQ0OO.split(";")[0].substr(0, OQQ0OO.split(";")[0].indexOf("="))] = OQQ0OO.split(";")[0].substr(OQQ0OO.split(";")[0].indexOf("=") + 1);
      }
      for (const OQQQ00 of Object.keys(lz_cookie)) {
        cookie += OQQQ00 + "=" + lz_cookie[OQQQ00] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(Q00OO0) {
  Q00OO0 = Q00OO0 || 32;
  let OQ0OOO = "abcdef0123456789",
    Q00000 = OQ0OOO.length,
    Q00Q0O = "";
  for (i = 0; i < Q00OO0; i++) Q00Q0O += OQ0OOO.charAt(Math.floor(Math.random() * Q00000));
  return Q00Q0O;
}
function safeGet(OOOO00) {
  if (!OOOO00) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(OOOO00) == "object") {
      return true;
    }
  } catch (OO0QOO) {
    console.log(OO0QOO);
    return false;
  }
}
function jsonParse(OOOO0Q) {
  if (typeof OOOO0Q == "string") {
    try {
      return JSON.parse(OOOO0Q);
    } catch (OOQ0OO) {
      console.log(OOQ0OO);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function random(Q000O0, OO0QO0) {
  return Math.floor(Math.random() * (OO0QO0 - Q000O0)) + Q000O0;
}
function getQueryString(OOO00Q, Q00QO0) {
  let OOOOOO = new RegExp("(^|[&?])" + Q00QO0 + "=([^&]*)(&|$)");
  let OOOOOQ = OOO00Q.match(OOOOOO);
  if (OOOOOQ != null) {
    return unescape(OOOOOQ[2]);
  }
  return "";
}