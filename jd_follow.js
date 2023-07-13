/**
关注有礼-加密


必须条件：配置文件或者环境变量中添加变量：
## 关注有礼-加密-jd_follow.js
//export M_FOLLOW_SHOP_ARGV="12237383_12550303" //活动变量


cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#关注有礼-加密
1 1 1 1 * jd_follow.js, tag=关注有礼-加密, enabled=true
*/
const Env = require('./utils/Env.js');
const $ = new Env('关注有礼-加密');
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
  cookie = "";
let follow = process.env.M_FOLLOW_SHOP_ARGV ? process.env.M_FOLLOW_SHOP_ARGV : "";
let SHOP_ID = process.env.SHOP_ID || "";
let VENDER_ID = process.env.VENDER_ID || "";
let CookieNum = 4;
if (process.env.FOLLOW_SHOP_NUM && process.env.FOLLOW_SHOP_NUM != 4) {
  CookieNum = process.env.FOLLOW_SHOP_NUM;
}
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(OQO0O => {
    cookiesArr.push(jdCookieNode[OQO0O]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = jsonParse(cookiesData);
  cookiesArr = cookiesData.map(QQO00 => QQO00.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(OQOQO => OQOQO !== "" && OQOQO !== null && OQOQO !== undefined);
}
let time = Date.now();
let argv = follow.split("_");
SHOP_ID = argv[0];
VENDER_ID = argv[1];
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("店铺链接：https://shop.m.jd.com/?venderId=" + VENDER_ID);
  if (!SHOP_ID || !VENDER_ID) {
    $.log("无效的参数" + follow);
    return;
  }
  for (let QOO0Q0 = 0; QOO0Q0 < CookieNum; QOO0Q0++) {
    UA = "JD4iPhone/167853%20(iPhone;%20iOS;%20Scale/3.00)";
    try {
      if (cookiesArr[QOO0Q0]) {
        cookie = cookiesArr[QOO0Q0];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = QOO0Q0 + 1;
        $.isLogin = true;
        $.nickName = "";
        await TotalBean();
        console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          if ($.isNode()) {
            await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
          }
          continue;
        }
        latWs = "30." + random(99999, 10000);
        lngWs = "114." + random(99999, 10000);
        await main();
        await $.wait(5000);
      }
    } catch (O00O0O) {
      $.log("", "❌ " + $.name + ", 失败! 原因: " + O00O0O + "!", "");
      continue;
    }
  }
})().catch(QOO0OQ => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + QOO0OQ + "!", "");
}).finally(() => {
  $.done();
});
async function main() {
  let QQ0OQQ = await task("getShopHomeActivityInfo", {
    "shopId": SHOP_ID,
    "source": "app-shop",
    "latWs": latWs,
    "lngWs": lngWs,
    "displayWidth": "1170.000000",
    "sourceRpc": "shop_app_home_home",
    "lng": lngWs,
    "lat": latWs,
    "venderId": VENDER_ID
  });
  let O0QOQO = QQ0OQQ.result.activityId;
  if (QQ0OQQ) {
    if (O0QOQO) {
      if (QQ0OQQ.result.followed == true) {
        console.log("已经关注该店铺，执行取关操作");
        let QQ0O0Q = await task("followShop", {
          "follow": "false",
          "shopId": SHOP_ID,
          "award": "false",
          "sourceRpc": "shop_app_home_follow"
        });
        if (QQ0O0Q.optCode === "F10000") {
          console.log(QQ0O0Q.msg);
        } else {
          console.log(JSON.stringify(QQ0O0Q));
        }
      }
      if (QQ0OQQ.result.giftTitle) {
        body = {
          "giftType": "vip",
          "follow": 0,
          "shopId": SHOP_ID,
          "activityId": O0QOQO,
          "sourceRpc": "shop_app_home_window",
          "venderId": VENDER_ID
        };
      } else if (QQ0OQQ.result.giftsToast) {
        body = {
          "follow": 0,
          "shopId": SHOP_ID,
          "activityId": O0QOQO,
          "sourceRpc": "shop_app_home_window",
          "venderId": VENDER_ID
        };
      }
      $.shopId = SHOP_ID;
      $.venderId = VENDER_ID;
      $.activityId = O0QOQO;
      let QOOOOO = await taskNoSign();
      if (QOOOOO.result.followCode === "F0402") {
        console.log(QOOOOO.result.followDesc);
      } else if (QOOOOO.result.followCode === "F10000") {
        console.log(QOOOOO);
        if (QOOOOO.result.giftCode == 200) {
          console.log("");
          var QQQOQ0 = JSON.parse(JSON.stringify(QOOOOO.result.alreadyReceivedGifts));
          for (let QQQOOQ = 0; QQQOOQ <= QQQOQ0.length - 1; QQQOOQ++) {
            var QO0QOO = QQQOQ0[QQQOOQ].redWord + QQQOQ0[QQQOOQ].rearWord;
            console.log("获得奖品：" + QO0QOO);
          }
        }
        await $.wait(1000);
      } else {
        console.log(JSON.stringify(QOOOOO));
      }
    } else {
      console.log("已经关注过了或者活动结束了，没有奖励");
    }
  } else {
    console.log("京东没有返回数据!");
  }
}
async function task(QQ00QQ, QQ000Q) {
  return new Promise(O000OO => {
    $.post(taskUrl(QQ00QQ, QQ000Q, sign), (O000OQ, O00QQ0, QQQ0QQ) => {
      try {
        if (O000OQ) {
          console.log(O000OQ);
        } else {
          QQQ0QQ = JSON.parse(QQQ0QQ);
          if (QQQ0QQ && QQQ0QQ.data && JSON.stringify(QQQ0QQ.data) === "{}") {
            console.log(JSON.stringify(QQQ0QQ));
          }
        }
      } catch (QQQ0QO) {
        console.log(QQQ0QQ);
        $.logErr(QQQ0QO, O00QQ0);
      } finally {
        O000OO(QQQ0QQ || {});
      }
    });
  });
}
function taskUrl(O0OOQ0, O0OO00, QQ0OQ0) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + O0OOQ0 + "&body=" + encodeURIComponent(JSON.stringify(O0OO00)),
    "body": QQ0OQ0,
    "headers": {
      "Host": "api.m.jd.com",
      "content-type": "application/x-www-form-urlencoded",
      "accept": "*/*",
      "user-agent": UA,
      "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
      "Cookie": cookie
    }
  };
}
function cxid() {
  return new Promise(QQ00OO => {
    let O00QQO = {
      "url": "https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=%7B%22shopId%22%3A%221000414244%22%2C%22stamp%22%3A%221%22%2C%22%24taroTimestamp%22%3A" + time + "%2C%22source%22%3A%22m-shop%22%7D&t=" + time + "&appid=shop_view&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=16531140799271703486119",
      "headers": {
        "origin": "https://pages.jd.com",
        "content-type": "application/x-www-form-urlencoded",
        "accept": "*/*",
        "user-agent": UA,
        "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
        "Cookie": cookie
      }
    };
    $.get(O00QQO, async (O00Q0O, QQOO0O, QQOOQO) => {
      try {
        if (O00Q0O) {
          console.log("" + JSON.stringify(O00Q0O));
          console.log($.name + " cxid API请求失败，请检查网路重试");
        } else {
          QQOOQO = JSON.parse(QQOOQO);
        }
      } catch (QOO0O0) {
        $.logErr(QOO0O0, QQOO0O);
      } finally {
        QQ00OO();
      }
    });
  });
}
async function taskNoSign() {
  return new Promise(Q0OQ00 => {
    $.post(taskUrlNoSign(), (QQ0Q0O, O0QQQO, O0Q0Q0) => {
      try {
        if (QQ0Q0O) {
          console.log(QQ0Q0O);
        } else {
          O0Q0Q0 = JSON.parse(O0Q0Q0);
          if (O0Q0Q0 && O0Q0Q0.data && JSON.stringify(O0Q0Q0.data) === "{}") {
            console.log(JSON.stringify(O0Q0Q0));
          }
        }
      } catch (O0000O) {
        console.log(O0Q0Q0);
        $.logErr(O0000O, O0QQQO);
      } finally {
        Q0OQ00(O0Q0Q0 || {});
      }
    });
  });
}
function taskUrlNoSign() {
  return {
    "url": "https://api.m.jd.com/client.action?g_ty=ls&g_tk=518274330",
    "body": "functionId=drawShopGift&body={\"follow\":0,\"shopId\":\"" + $.shopId + "\",\"activityId\":\"" + $.activityId + "\",\"sourceRpc\":\"shop_app_home_window\",\"venderId\":\"" + $.venderId + "\"}&client=apple&clientVersion=10.0.4&osVersion=13.7&appid=wh5&loginType=2&loginWQBiz=interact",
    "headers": {
      "Host": "api.m.jd.com",
      "content-type": "application/x-www-form-urlencoded",
      "accept": "*/*",
      "user-agent": UA,
      "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
      "Cookie": cookie
    }
  };
}
function getUa() {
  UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function random(QQOOQQ, QQQ0O0) {
  return Math.floor(Math.random() * (QQQ0O0 - QQOOQQ)) + QQOOQQ;
}
function getSign(O0QQQ0, QQ00QO) {
  let O0OQOO = {
    "fn": O0QQQ0,
    "body": QQ00QO
  };
  let O0OQOQ = {
    "url": "https://api.nolanstore.top/sign",
    "body": JSON.stringify(O0OQOO),
    "headers": {
      "Content-Type": "application/json"
    },
    "timeout": 30000
  };
  return new Promise(async OO0OOQ => {
    $.post(O0OQOQ, (QOQOOQ, QOQOOO, O0OQOO) => {
      try {
        if (QOQOOQ) {
          console.log("" + JSON.stringify(QOQOOQ));
          console.log($.name + " getSign API请求失败，请检查网路重试");
        } else {
          O0OQOO = JSON.parse(O0OQOO);
          if (typeof O0OQOO === "object" && O0OQOO && O0OQOO.body) {
            if (O0OQOO.body) sign = O0OQOO.body || "";
          } else {
            console.log("获取服务失败~~");
          }
        }
      } catch (QO0OQO) {
        $.logErr(QO0OQO, QOQOOO);
      } finally {
        OO0OOQ(O0OQOO);
      }
    });
  });
}

function TotalBean() { return new Promise(async e => { const n = { url: "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2", headers: { Host: "wq.jd.com", Accept: "*/*", Connection: "keep-alive", Cookie: cookie, "User-Agent": UA, "Accept-Language": "zh-cn", Referer: "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&", "Accept-Encoding": "gzip, deflate, br" } }; $.get(n, (n, o, a) => { try { if (n) $.logErr(n); else if (a) { if (1001 === (a = JSON.parse(a))["retcode"]) return void ($.isLogin = !1); 0 === a["retcode"] && a.data && a.data.hasOwnProperty("userInfo") && ($.nickName = a.data.userInfo.baseInfo.nickname), 0 === a["retcode"] && a.data && a.data["assetInfo"] && ($.beanCount = a.data && a.data["assetInfo"]["beanNum"]) } else console.log("京东服务器返回空数据") } catch (e) { $.logErr(e) } finally { e() } }) }) }