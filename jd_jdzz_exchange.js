/*
#京东赚赚兑换

说明：每天只能兑换一次面额，每种面额每月仅可兑换一次。

比如：不足50，3月兑换面额10，面额5，面额2，4月兑换面额10，面额5，面额2。以此类推。

不清楚后续还有无库存，尽早兑换。

兑换的红包有效期 5 天

[task_local]
#京东赚赚兑换
11 11 11 11 * jd_ty_help.js, tag=京东赚赚兑换, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true*/
const Env=require('./utils/Env.js');
const $ = new Env('京东赚赚兑换');
const notify = $.isNode() ? require("./sendNotify") : "",
  jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(c => {
    cookiesArr.push(jdCookieNode[c]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(c => c.cookie)].filter(c => !!c);
const JD_API_HOST = "https://api.m.jd.com/client.action";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("每天只能兑换一次，每种面额每月仅可兑换一次。\n");
  for (let e = 0; e < cookiesArr.length; e++) {
    if (cookiesArr[e]) {
      cookie = cookiesArr[e];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = e + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await jdWish();
      if ($.outFlag || $.activityEnd) break;
    }
  }
})().catch(c => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + c + "!", "");
}).finally(() => {
  $.done();
});
async function jdWish() {
  $.getPrize = false;
  $.exgStop = false;
  $.loginkr = false;
  await getExchangePrizeList();
  if (!$.loginkr) {
    if ($.totalNum >= 1000000) {
      $.prizeInfoId = 6;
    } else {
      if ($.totalNum < 1000000 && $.totalNum >= 500000) $.prizeInfoId = 5;else {
        if ($.totalNum < 500000 && $.totalNum >= 100000) $.prizeInfoId = 4;else {
          if ($.totalNum < 100000 && $.totalNum >= 50000) $.prizeInfoId = 3;else {
            if ($.totalNum < 50000 && $.totalNum >= 20000) {
              $.prizeInfoId = 2;
            }
          }
        }
      }
    }
    if ($.prizeInfoId) {
      console.log("");
      for (let g = 0; g < 10; g++) {
        await exchangePrize($.prizeInfoId);
        if ($.getPrize || $.exgStop || $.activityEnd) break;
        await $.wait(3000);
      }
    } else {
      console.log("");
      console.log("\n没有符合您兑换的红包额度");
    }
  }
}
function getExchangePrizeList() {
  return new Promise(d => {
    $.post(taskUrl("getExchangePrizeList", {}), async (f, g, h) => {
      try {
        f ? (console.log("" + JSON.stringify(f)), console.log($.name + " API请求失败，请检查网路重试")) : safeGet(h) && (h = JSON.parse(h), h.code == "0" ? ($.totalNum = h.data.totalNum, $.cashExpected = h.data.cashExpected || "", $.exchangePrizeList = h.data.exchangePrizeList || [], console.log("目前分值：" + $.totalNum + "，" + $.cashExpected), $.totalNum < 20000 && (console.log("\n没有符合您兑换的红包额度"), $.loginkr = true)) : (console.log(h.message), h.message == "用户未登陆" && ($.loginkr = true)));
      } catch (m) {
        $.logErr(m, g);
      } finally {
        d(h);
      }
    });
  });
}
function exchangePrize(c) {
  return new Promise(e => {
    const g = "{\"prizeId\":" + c + "}";
    $.post(taskUrl("exchangePrize", g), async (h, i, j) => {
      try {
        if (h) {
          console.log("" + JSON.stringify(h));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (safeGet(j)) {
            j = JSON.parse(j);
            if (j.code == "0") {
              console.log("兑换成功：" + j.data.prizeName);
              $.getPrize = true;
            } else {
              console.log(j.message);
              for (let k of ["不足", "上限", "抢完", "未登陆"]) {
                if (j.message.includes(k)) {
                  $.exgStop = true;
                  break;
                }
              }
              for (let m of ["已用完"]) {
                if (j.message.includes(m)) {
                  console.log("\n检测到本月已兑换过当前额度，开始轮询~");
                  $.openList = [5, 4, 3, 2];
                  for (let n = 0; n < $.openList.length; n++) {
                    $.prizeInfoIds = $.openList[n];
                    console.log("");
                    await $.wait(10000);
                    await exchangePrize1($.prizeInfoIds);
                    if ($.getPrize || $.exgStop || $.activityEnd) break;
                    await $.wait(1000);
                  }
                }
              }
            }
          }
        }
      } catch (q) {
        $.logErr(q, i);
      } finally {
        e(j);
      }
    });
  });
}
function exchangePrize1(c) {
  return new Promise(e => {
    const g = "{\"prizeId\":" + c + "}";
    $.post(taskUrl("exchangePrize", g), async (h, i, j) => {
      try {
        if (h) {
          console.log("" + JSON.stringify(h));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (safeGet(j)) {
            j = JSON.parse(j);
            if (j.code == "0") {
              console.log("兑换成功：" + j.data.prizeName);
              $.getPrize = true;
            } else {
              console.log(j.message);
              for (let n of ["上限", "抢完", "未登陆"]) {
                if (j.message.includes(n)) {
                  $.exgStop = true;
                  break;
                }
              }
            }
          }
        }
      } catch (r) {
        $.logErr(r, i);
      } finally {
        e(j);
      }
    });
  });
}
function taskUrl(c, d = {}) {
  return {
    "url": JD_API_HOST + "?functionId=" + c + "&body=" + d + "&client=wh5&clientVersion=9.1.0",
    "headers": {
      "Cookie": cookie,
      "Host": "api.m.jd.com",
      "Connection": "keep-alive",
      "Content-Type": "application/json",
      "Referer": "http://wq.jd.com/wxapp/pages/hd-interaction/index/index",
      "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
}
function safeGet(c) {
  try {
    if (typeof JSON.parse(c) == "object") return true;
  } catch (g) {
    return console.log(g), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function jsonParse(c) {
  if (typeof c == "string") try {
    return JSON.parse(c);
  } catch (g) {
    return console.log(g), $.msg($.name, "", "不要在BoxJS手动复制粘贴修改cookie"), [];
  }
}