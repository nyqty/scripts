/*
活动名称：店铺抽奖中心 · 超级无线
活动链接：https://lzkj-isv.isvjd.com/drawCenter/activity/activity?activityId=<活动id>
环境变量：jd_drawCenter_activityId // 活动id
					jd_drawCenter_addCart // 是否做加购任务，默认不做
					JD_LZ_OPEN //关闭LZ相关活动运行
					jd_drawCenter_blacklist // 黑名单 用&隔开 pin值

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#LZ刮刮乐抽奖通用活动-加密
1 1 1 1 * jd_wxShareActivity.js, tag=LZ刮刮乐抽奖通用活动-加密, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env('LZ刮刮乐抽奖通用活动-加密');

const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
const getToken = require("./function/krgetToken");
let cookiesArr = [],
  cookie = "",
  message = "";
let ownCode = {};
let isdoTask = true;
let isdraw = true;
let lz_cookie = {};
let drawCenterActivityId = "";
let Allmessage = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(QO0OO0 => {
    cookiesArr.push(jdCookieNode[QO0OO0]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(QO00QQ => QO00QQ.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(QOQQOQ => !!QOQQOQ);
}
if (process.env.jd_drawCenter_activityId && process.env.jd_drawCenter_activityId != "") {
  drawCenterActivityId = process.env.jd_drawCenter_activityId.split(",");
}
let addCart = process.env.jd_drawCenter_addCart ? process.env.jd_drawCenter_addCart : "false";
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_drawCenter_whitelist || whitelist;
$.blacklist = process.env.jd_drawCenter_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：https://lzkj-isv.isvjd.com/drawCenter/activity/activity?activityId=" + drawCenterActivityId);
  for (let OQQOOQ = 0; OQQOOQ < cookiesArr.length; OQQOOQ++) {
    if (cookiesArr[OQQOOQ]) {
      cookie = cookiesArr[OQQOOQ];
      originCookie = cookiesArr[OQQOOQ];
      newCookie = "";
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = OQQOOQ + 1;
      $.isLogin = true;
      $.nickName = "";
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
      authorCodeList = [""];
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.authorCode = ownCode ? ownCode : authorCodeList[random(0, authorCodeList.length)];
      $.authorNum = "" + random(1000000, 9999999);
      $.activityId = drawCenterActivityId;
      $.activityUrl = "https://lzkj-isv.isvjcloud.com/drawCenter/activity/" + $.authorNum + "?activityId=" + $.activityId + "&shareUuid=" + encodeURIComponent($.authorCode) + "&shareuserid4minipg=null&shopid=" + $.venderId;
      message = "";
      await run();
      await $.wait(1000);
      if (Allmessage !== "") {
        if ($.isNode()) {
          await notify.sendNotify($.name, message, "", "\n");
        }
      }
    }
  }
  if (Allmessage !== "") {
    if ($.isNode()) {
      await notify.sendNotify($.name, message, "", "\n");
    }
  }
})().catch(OOO0OQ => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + OOO0OQ + "!", "");
}).finally(() => {
  $.done();
});
async function run() {
  await $.wait(500);
  $.token = null;
  $.secretPin = null;
  await getFirstLZCK();
  $.token = await getToken(originCookie, "https://lzkj-isv.isvjcloud.com");
  if ($.index == 1) await task("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
  if ($.token) {
    await getMyPing();
    if ($.secretPin) {
      await task("common/accessLogWithAD", "venderId=" + $.venderId + "&code=99&pin=" + encodeURIComponent($.secretPin) + "&activityId=" + $.activityId + "&pageUrl=" + $.activityUrl + "&subType=app&adSource=null", 1);
      await task("wxActionCommon/getUserInfo", "pin=" + encodeURIComponent($.secretPin), 1);
      await $.wait(500);
      await task("activityContent", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&pinImg=" + encodeURIComponent($.pinImg) + "&nick=" + encodeURIComponent($.pin) + "&cjyxPin=&cjhyPin=&shareUuid=" + encodeURIComponent($.authorCode));
      if ($.index === 1) {
        console.log("助力码：" + ownCode);
        console.log("当前活动：" + $.activityName);
      }
      if ($.activityContent) {
        if (isdoTask) {
          await $.wait(500);
          await task("myInfo", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
          for (var OO000O = 0; OO000O < $.taskList.length; OO000O++) {
            $.taskType = $.taskList[OO000O].taskType;
            $.maxNeed = $.taskList[OO000O].maxNeed;
            $.curNum = $.taskList[OO000O].curNum;
            $.remaining = $.maxNeed - $.curNum;
            if ($.curNum == $.maxNeed) continue;
            await $.wait(500);
            switch ($.taskType) {
              case "share2help":
                if ($.index === 1) break;
                $.log("\n去助力 -> " + ownCode);
                await task("helpFriend", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&shareUuid=" + encodeURIComponent($.authorCode));
                break;
              case "dailysign":
                $.log("\n进行每日签到");
                await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=dailysign&param=");
                break;
              case "followshop":
                $.log("\n去关注店铺");
                await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=followshop&param=");
                break;
              case "scanshop":
                $.log("\n去浏览店铺");
                await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=scanshop&param=");
                break;
              case "add2cart":
                if (addCart == "true") {
                  console.log("");
                  await task("getProduct", "type=1&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                  for (let OQQO0Q = 0; OQQO0Q < $.getProduct.length; OQQO0Q++) {
                    await $.wait(500);
                    $.log("去加购商品：" + $.getProduct[OQQO0Q].name);
                    await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=add2cart&param=" + $.getProduct[OQQO0Q].skuId);
                    if (OQQO0Q == $.remaining - 1) break;
                  }
                }
                break;
              case "ordersku":
                console.log("");
                await task("getProduct", "type=2&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                for (let OOO00O = 0; OOO00O < $.getProduct.length; OOO00O++) {
                  await $.wait(500);
                  $.log("去预约商品：" + $.getProduct[OOO00O].name);
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=ordersku&param=" + $.getProduct[OOO00O].skuId);
                  if (OOO00O == $.remaining - 1) break;
                }
                break;
              case "followsku":
                console.log("");
                await task("getProduct", "type=3&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                for (let OOOOO0 = 0; OOOOO0 < $.getProduct.length; OOOOO0++) {
                  await $.wait(500);
                  $.log("去关注商品：" + $.getProduct[OOOOO0].name);
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=followsku&param=" + $.getProduct[OOOOO0].skuId);
                  if (OOOOO0 == $.remaining - 1) break;
                }
                break;
              case "scansku":
                console.log("");
                await task("getProduct", "type=4&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                for (let OOO00Q = 0; OOO00Q < $.getProduct.length; OOO00Q++) {
                  await $.wait(500);
                  $.log("去浏览商品：" + $.getProduct[OOO00Q].name);
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=scansku&param=" + $.getProduct[OOO00Q].skuId);
                  if (OOO00Q == $.remaining - 1) break;
                }
                break;
              case "scanurl":
                $.venue_name = JSON.parse($.taskList[OO000O].params).name;
                $.log("\n去浏览会场：" + $.venue_name);
                await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=" + $.taskList[OO000O].taskId + "&param=");
                break;
              default:
                break;
            }
          }
        }
        if (isdraw) {
          await task("activityContent", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&pinImg=" + encodeURIComponent($.pinImg) + "&nick=" + encodeURIComponent($.pin) + "&cjyxPin=&cjhyPin=&shareUuid=" + encodeURIComponent($.authorCode));
          if ($.chance >= 1) {
            $.log("\n任务已全部完成，当前共有 " + $.chance + " 次抽奖机会，开始抽奖吧～\n");
          } else {
            $.log("\n没有抽奖机会了～");
          }
          await $.wait(500);
          for (let OO0QQO = 0; OO0QQO < $.chance; OO0QQO++) {
            await task("draw/luckyDraw", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
            await $.wait(1000);
            if (OO0QQO == 9) {
              $.log("\n抽奖太多次了，下次再抽吧~");
              break;
            }
          }
        }
      } else {
        $.log("未能成功获取到活动信息");
      }
    } else {
      $.log("没有成功获取到用户信息");
    }
  } else {
    $.log("没有成功获取到用户鉴权信息");
  }
}
function task(OOOOQ0, OQQOQO, OQQO0O = 0) {
  return new Promise(OQO0OO => {
    $.post(taskUrl(OOOOQ0, OQQOQO, OQQO0O), async (OQOOQO, OQOO0Q, OQOOQQ) => {
      try {
        if (OQOOQO) {
          $.log(OQOOQO);
        } else {
          if (OQOOQQ) {
            OQOOQQ = JSON.parse(OQOOQQ);
            if (OQOO0Q.headers["set-cookie"]) {
              cookie = "" + originCookie;
              for (let QQOQO0 of OQOO0Q.headers["set-cookie"]) {
                lz_cookie[QQOQO0.split(";")[0].substr(0, QQOQO0.split(";")[0].indexOf("="))] = QQOQO0.split(";")[0].substr(QQOQO0.split(";")[0].indexOf("=") + 1);
              }
              for (const OQ00OO of Object.keys(lz_cookie)) {
                cookie += OQ00OO + "=" + lz_cookie[OQ00OO] + ";";
              }
            }
            if (OQOOQQ.result) {
              switch (OOOOQ0) {
                case "customer/getSimpleActInfoVo":
                  $.jdActivityId = OQOOQQ.data.jdActivityId;
                  $.venderId = OQOOQQ.data.venderId;
                  break;
                case "activityContent":
                  $.activityContent = OQOOQQ.data.activityId;
                  $.chance = OQOOQQ.data.chance || 0;
                  $.activityName = OQOOQQ.data.activityName || "";
                  if ($.index === 1) {
                    ownCode = OQOOQQ.data.uid;
                  }
                  break;
                case "myInfo":
                  $.taskList = OQOOQQ.data.taskList;
                  break;
                case "wxActionCommon/getUserInfo":
                  if (OQOOQQ.data.yunMidImageUrl) {
                    if ($.index === 1) {
                      ownCode.pinImg = OQOOQQ.data.yunMidImageUrl;
                      ownCode.nickname = OQOOQQ.data.nickname;
                    }
                    $.pinImg = OQOOQQ.data.yunMidImageUrl;
                  } else {
                    if ($.index === 1) {
                      ownCode.pinImg = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
                      ownCode.nickname = OQOOQQ.data.nickname;
                    }
                    $.pinImg = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
                  }
                  break;
                case "helpFriend":
                  $.helpFriend = OQOOQQ.data.helpFriendMsg;
                  console.log("  >> " + $.helpFriend);
                  break;
                case "wxAssemblePage/shopinfo":
                  break;
                case "doTask":
                  if (OQOOQQ.result) {
                    console.log("  >> 任务完成");
                  } else {
                    $.log(OQOOQQ.result);
                  }
                  break;
                case "getProduct":
                  $.getProduct = OQOOQQ.data;
                  break;
                case "draw/luckyDraw":
                  if (OQOOQQ.data) {
                    if (OQOOQQ.data.drawInfo) {
                      switch (OQOOQQ.data.drawInfo.type) {
                        case 6:
                          console.log("🎉 " + OQOOQQ.data.drawInfo.name + " 🐶");
                          break;
                        case 7:
                          console.log(OQOOQQ.data.drawInfo);
                          console.log("🎉 恭喜获得实物，去看看活动规则吧～");
                          break;
                        case 8:
                          console.log("🗑️ 专享价");
                          break;
                        case 9:
                          console.log("🗑️ " + OQOOQQ.data.drawInfo.name + " 🎟️");
                          break;
                        case 13:
                          console.log("🎉 恭喜获得" + OQOOQQ.data.drawInfo.name + " 🎁");
                          break;
                        case 16:
                          console.log("🎉 " + OQOOQQ.data.drawInfo.priceInfo + " 🧧");
                          break;
                        default:
                          if (OQOOQQ.data.drawInfo.name.includes("券")) {
                            console.log("🗑️ 优惠券");
                          } else {
                            console.log("获得：" + OQOOQQ.data.drawInfo.name);
                          }
                          break;
                      }
                    } else {
                      console.log("💨  空气");
                    }
                    message += OQOOQQ.data.name;
                  }
                  break;
                default:
                  $.log(JSON.stringify(OQOOQQ));
                  break;
              }
              await $.wait(2000);
            }
          } else {}
        }
      } catch (OQOOQ0) {
        $.log(OQOOQ0);
      } finally {
        OQO0OO();
      }
    });
  });
}
function taskUrl(QQOQOO, QQOQOQ, OQ0000) {
  return {
    "url": OQ0000 ? "https://lzkj-isv.isvjcloud.com/" + QQOQOO : "https://lzkj-isv.isvjcloud.com/drawCenter/" + QQOQOO,
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjcloud.comm",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": cookie
    },
    "body": QQOQOQ
  };
}
function getMyPing() {
  let Q0Q00O = {
    "url": "https://lzkj-isv.isvjcloud.com/customer/getMyPing",
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjcloud.com",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": cookie
    },
    "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP&riskType=1"
  };
  return new Promise(OQ0QO0 => {
    $.post(Q0Q00O, (OQO0QQ, OQO00Q, OQ0QOO) => {
      try {
        if (OQO0QQ) {
          $.log(OQO0QQ);
        } else {
          if (OQO00Q.headers["set-cookie"]) {
            cookie = "" + originCookie;
            for (let OQ0QOOO of OQO00Q.headers["set-cookie"]) {
              lz_cookie[OQ0QOOO.split(";")[0].substr(0, OQ0QOOO.split(";")[0].indexOf("="))] = OQ0QOOO.split(";")[0].substr(OQ0QOOO.split(";")[0].indexOf("=") + 1);
            }
            for (const Q00OOQO of Object.keys(lz_cookie)) {
              cookie += Q00OOQO + "=" + lz_cookie[Q00OOQO] + ";";
            }
          }
          if (OQ0QOO) {
            OQ0QOO = JSON.parse(OQ0QOO);
            if (OQ0QOO.result) {
              $.pin = OQ0QOO.data.nickname;
              $.secretPin = OQ0QOO.data.secretPin;
            } else {
              $.log(OQ0QOO.errorMessage);
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (OQ00OQO) {
        $.log(OQ00OQO);
      } finally {
        OQ0QO0();
      }
    });
  });
}
function getFirstLZCK() {
  return new Promise(QOQQ0O0 => {
    $.get({
      "url": $.activityUrl,
      "headers": {
        "user-agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    }, (O000O0O, QQ000OQ, O000O0Q) => {
      try {
        if (O000O0O) {
          console.log(O000O0O);
        } else {
          if (QQ000OQ.headers["set-cookie"]) {
            cookie = "" + originCookie;
            for (let QOQ0Q0Q of QQ000OQ.headers["set-cookie"]) {
              lz_cookie[QOQ0Q0Q.split(";")[0].substr(0, QOQ0Q0Q.split(";")[0].indexOf("="))] = QOQ0Q0Q.split(";")[0].substr(QOQ0Q0Q.split(";")[0].indexOf("=") + 1);
            }
            for (const QOQ00Q0 of Object.keys(lz_cookie)) {
              cookie += QOQ00Q0 + "=" + lz_cookie[QOQ00Q0] + ";";
            }
          }
        }
      } catch (Q00QQQO) {
        console.log(Q00QQQO);
      } finally {
        QOQQ0O0();
      }
    });
  });
}
function random(OOQQ000, OOQQQQQ) {
  return Math.floor(Math.random() * (OOQQQQQ - OOQQ000)) + OOQQ000;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const QOQ00OO = Array.from(new Set($.blacklist.split("&")));
  console.log(QOQ00OO.join("&") + "\n");
  let QOQ0Q00 = QOQ00OO;
  let Q00Q00O = [];
  let QOQ00OQ = false;
  for (let OOQQQQ0 = 0; OOQQQQ0 < cookiesArr.length; OOQQQQ0++) {
    let OOOOQOO = decodeURIComponent(cookiesArr[OOQQQQ0].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[OOQQQQ0].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!OOOOQOO) break;
    let OOOOQOQ = false;
    for (let QQ0O0QQ of QOQ0Q00) {
      if (QQ0O0QQ && QQ0O0QQ == OOOOQOO) {
        OOOOQOQ = true;
        break;
      }
    }
    if (!OOOOQOQ) {
      QOQ00OQ = true;
      Q00Q00O.splice(OOQQQQ0, -1, cookiesArr[OOQQQQ0]);
    }
  }
  if (QOQ00OQ) cookiesArr = Q00Q00O;
}
function toFirst(O00QO0Q, OQ00000) {
  if (OQ00000 != 0) {
    O00QO0Q.unshift(O00QO0Q.splice(OQ00000, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const Q000OQ0 = Array.from(new Set($.whitelist.split("&")));
  console.log(Q000OQ0.join("&") + "\n");
  let QOOO0O0 = [];
  let OOOOOQ0 = Q000OQ0;
  for (let Q00O000 in cookiesArr) {
    let Q00OQQO = decodeURIComponent(cookiesArr[Q00O000].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[Q00O000].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (OOOOOQ0.includes(Q00OQQO)) {
      QOOO0O0.push(cookiesArr[Q00O000]);
    }
  }
  helpCookiesArr = QOOO0O0;
  if (OOOOOQ0.length > 1) {
    for (let QQOQ0QQ in OOOOOQ0) {
      let QOQ00QQ = OOOOOQ0[OOOOOQ0.length - 1 - QQOQ0QQ];
      if (!QOQ00QQ) continue;
      for (let Q00O000 in helpCookiesArr) {
        let Q00OQQO = decodeURIComponent(helpCookiesArr[Q00O000].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[Q00O000].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (QOQ00QQ == Q00OQQO) {
          toFirst(helpCookiesArr, Q00O000);
        }
      }
    }
  }
}
function getUUID(QOQ00QO = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", OOO0QQO = 0) {
  return QOQ00QO.replace(/[xy]/g, function (Q000OOO) {
    var QQO0O0O = Math.random() * 16 | 0,
      O00OO0Q = Q000OOO == "x" ? QQO0O0O : QQO0O0O & 3 | 8;
    if (OOO0QQO) {
      uuid = O00OO0Q.toString(36).toUpperCase();
    } else {
      uuid = O00OO0Q.toString(36);
    }
    return uuid;
  });
}
function checkCookie() {
  const Q00OOO0 = {
    "url": "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
    "headers": {
      "Host": "me-api.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(Q00O00Q => {
    $.get(Q00OOO0, (QOQ0O0O, QOQ0O0Q, OOOO00Q) => {
      try {
        if (QOQ0O0O) {
          $.logErr(QOQ0O0O);
        } else {
          if (OOOO00Q) {
            OOOO00Q = JSON.parse(OOOO00Q);
            if (OOOO00Q.retcode === "1001") {
              $.isLogin = false;
              return;
            }
            if (OOOO00Q.retcode === "0" && OOOO00Q.data.hasOwnProperty("userInfo")) {
              $.nickName = OOOO00Q.data.userInfo.baseInfo.nickname;
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (Q000OO0) {
        $.logErr(Q000OO0);
      } finally {
        Q00O00Q();
      }
    });
  });
}

// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);