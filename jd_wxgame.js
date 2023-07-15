/*
活动名称：LZ店铺游戏 · 超级无线
活动链接：https://lzkj-isv.isvjcloud.com/wxgame/activity/activity?activityId=<活动id>
环境变量：jd_wxgame_activityId // 活动id/活动链接
         jd_wxgame_addCart // 是否做加购任务，默认不做
				 jd_wxgame_blacklist // 黑名单 用&隔开 pin值
				 JD_LZ_OPEN  //关闭LZ相关活动运行

默认助力第一个号
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
LZ店铺游戏
1 1 1 1 * jd_wxSecond.js, tag=读秒拼手速通用活动, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('LZ店铺游戏');

const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
const getToken = require("./function/krgetToken");
let cookiesArr = [],
  cookie = "",
  message = "";
let ownCode = {};
let activityUrl = process.env.jd_wxgame_activityId ? process.env.jd_wxgame_activityId : "";
let addCart = process.env.jd_wxgame_addCart ? process.env.jd_wxgame_addCart : "true";
let activityId = "";
let isdoTask = true;
let isplayGame = true;
let lz_cookie = {};
let llnothing = true;
let Allmessage = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x3a569d => {
    cookiesArr.push(jdCookieNode[_0x3a569d]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(_0x37a0d0 => _0x37a0d0.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(_0x42e3ee => !!_0x42e3ee);
}
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_wxgame_whitelist || whitelist;
$.blacklist = process.env.jd_wxgame_blacklist || blacklist;
getWhitelist();
getBlacklist();
if (activityUrl) {
  if (activityUrl.includes("activityId=")) {
    activityId = getQueryString("" + activityUrl, "activityId");
  } else {
    activityId = activityUrl;
  }
}
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!activityId) {
    console.log("活动id不存在！");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：https://lzkj-isv.isvjcloud.com/wxgame/activity/activity?activityId=" + activityId);
  for (let _0x46f3ba = 0; _0x46f3ba < cookiesArr.length; _0x46f3ba++) {
    if (cookiesArr[_0x46f3ba]) {
      cookie = cookiesArr[_0x46f3ba];
      originCookie = cookiesArr[_0x46f3ba];
      newCookie = "";
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x46f3ba + 1;
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
      await randomsb();
      authorCodeList = [""];
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.authorCode = ownCode ? ownCode : authorCodeList[random(0, authorCodeList.length)];
      $.authorNum = "" + random(1000000, 9999999);
      $.activityId = activityId;
      $.activityUrl = "https://lzkj-isv.isvjcloud.com/wxgame/activity/activity?activityId=" + $.activityId;
      message = "";
      await member_08();
      if ($.hasEnd || $.activityEnd) {
        break;
      }
      if (Allmessage !== "") {
        if ($.isNode()) {
          await notify.sendNotify($.name, message, "", "\n");
        }
      }
    }
  }
  if (!llnothing) {
    _0x252bf0 = 0;
    cookie = cookiesArr[_0x252bf0];
    originCookie = cookiesArr[_0x252bf0];
    newCookie = "";
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
    $.index = _0x252bf0 + 1;
    $.isLogin = true;
    $.nickName = "";
    console.log("\n******【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
    if ($.isLogin) {
      authorCodeList = [""];
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.authorCode = authorCodeList[random(0, authorCodeList.length)];
      $.authorNum = "" + random(1000000, 9999999);
      $.activityId = activityId;
      $.activityUrl = "https://lzkj-isv.isvjcloud.com/wxgame/activity/" + $.authorNum + "?activityId=" + $.activityId + "&shareUuid=" + encodeURIComponent($.authorCode) + "&adsource=null&shareuserid4minipg=null&shopid=" + $.venderId + "&lng=00.000000&lat=00.000000&sid=&un_area=";
      message = "";
      await member_08();
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
})().catch(_0x86ded9 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x86ded9 + "!", "");
}).finally(() => {
  $.done();
});
async function member_08() {
  await $.wait(500);
  $.token = null;
  $.secretPin = null;
  $.startScore = null;
  $.endScore = null;
  $.rankingList = null;
  $.rankingListscore = null;
  $.gameOverRecord = null;
  $.chance = 0;
  await getFirstLZCK();
  if ($.activityEnd === true) {
    return;
  }
  if ($.index == 1) await task("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
  $.token = await getToken(originCookie, "https://lzkj-isv.isvjcloud.com");
  if ($.token) {
    await getMyPing();
    if ($.secretPin) {
      await task("common/accessLogWithAD", "venderId=" + $.venderId + "&code=99&pin=" + encodeURIComponent($.secretPin) + "&activityId=" + $.activityId + "&pageUrl=" + $.activityUrl + "&subType=app&adSource=null", 1);
      await $.wait(1000);
      await task("wxActionCommon/getUserInfo", "pin=" + encodeURIComponent($.secretPin), 1);
      await $.wait(1000);
      await task("activityContent", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&pinImg=" + encodeURIComponent($.pinImg) + "&nick=" + encodeURIComponent($.pin) + "&cjyxPin=&cjhyPin=&shareUuid=" + encodeURIComponent($.authorCode));
      await $.wait(1000);
      if ($.activityContent) {
        if (isdoTask) {
          await task("myInfo", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
          await $.wait(1000);
          if ($.taskList) {
            for (let _0xbfa423 = 0; _0xbfa423 < $.taskList.length; _0xbfa423++) {
              $.taskType = $.taskList[_0xbfa423].taskType;
              $.maxNeed = $.taskList[_0xbfa423].maxNeed;
              $.curNum = $.taskList[_0xbfa423].curNum;
              $.remaining = $.maxNeed - $.curNum;
              if ($.curNum == $.maxNeed) continue;
              await $.wait(500);
              switch ($.taskType) {
                case "share2help":
                  if ($.index === 1) break;
                  $.log("去助力好友");
                  await task("helpFriend", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&shareUuid=" + encodeURIComponent($.authorCode));
                  break;
                case "dailysign":
                  $.log("进行每日签到");
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=dailysign&param=");
                  break;
                case "followshop":
                  $.log("去关注店铺");
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=followshop&param=");
                  break;
                case "scanshop":
                  $.log("去浏览店铺");
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=scanshop&param=");
                  break;
                case "add2cart":
                  if (addCart == "true") {
                    await task("getProduct", "type=1&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                    for (let _0x238a05 = 0; _0x238a05 < $.getProduct.length; _0x238a05++) {
                      await $.wait(500);
                      $.log("去加购商品");
                      await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=add2cart&param=" + $.getProduct[_0x238a05].skuId);
                      if (_0x238a05 == $.remaining - 1) break;
                    }
                  }
                  break;
                case "ordersku":
                  console.log("");
                  await task("getProduct", "type=2&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                  for (let _0x1cc885 = 0; _0x1cc885 < $.getProduct.length; _0x1cc885++) {
                    await $.wait(500);
                    $.log("去预约商品");
                    await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=ordersku&param=" + $.getProduct[_0x1cc885].skuId);
                    if (_0x1cc885 == $.remaining - 1) break;
                  }
                  break;
                case "followsku":
                  await task("getProduct", "type=3&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                  for (let _0x450445 = 0; _0x450445 < $.getProduct.length; _0x450445++) {
                    await $.wait(500);
                    $.log("去关注商品");
                    await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=followsku&param=" + $.getProduct[_0x450445].skuId);
                    if (_0x450445 == $.remaining - 1) break;
                  }
                  break;
                case "scansku":
                  await task("getProduct", "type=4&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                  for (let _0x2aa95a = 0; _0x2aa95a < $.getProduct.length; _0x2aa95a++) {
                    await $.wait(500);
                    $.log("去浏览商品");
                    await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=scansku&param=" + $.getProduct[_0x2aa95a].skuId);
                    if (_0x2aa95a == $.remaining - 1) break;
                  }
                  break;
                case "scanurl":
                  $.venue_name = JSON.parse($.taskList[_0xbfa423].params).name;
                  $.log("去浏览会场");
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=" + $.taskList[_0xbfa423].taskId + "&param=");
                  break;
                default:
                  break;
              }
              if (_0xbfa423 == $.taskList.length - 1) console.log("");
            }
          }
        }
        if (isplayGame) {
          await task("myInfo", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
          await $.wait(1000);
          $.stopGame = false;
          $.drawTimes = 1;
          if ($.chance != 0) {
            do {
              $.gameId = null;
              $.gameScore = random(15000, 20000);
              await task("game/start", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
              await $.wait(1000);
              if ($.gameId) {
                let _0x3be6be = new Date().getTime();
                let _0x59a966 = $.md5($.gameId + "," + _0x3be6be + "," + $.gameScore + ",0eed6538f6e84b754ad2ab95b45c54f8");
                await task("game/end", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&score=" + $.gameScore + "&gameId=" + $.gameId + "&reqtime=" + _0x3be6be + "&sign=" + _0x59a966 + "&getRank=true&getScoreRank=true&getPlayerNum=true");
              }
              await $.wait(1000);
              if ($.drawTimes == 5) {
                console.log("\n玩游戏太多次了，下次再继续吧~");
                break;
              }
              if ($.drawTimes == $.chance) break;
              $.drawTimes++;
            } while (!$.stopGame);
          } else {
            console.log("没有游戏机会了~");
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
function task(_0x5a5008, _0x5869ba, _0x3814c2 = 0) {
  return new Promise(_0x2d1d6a => {
    $.post(taskUrl(_0x5a5008, _0x5869ba, _0x3814c2), async (_0xce7d49, _0x14d842, _0x45de05) => {
      try {
        if (_0xce7d49) {
          $.log(_0xce7d49);
        } else {
          if (_0x45de05) {
            _0x45de05 = JSON.parse(_0x45de05);
            if (_0x14d842.headers["set-cookie"]) {
              cookie = "" + originCookie;
              for (let _0x25ceec of _0x14d842.headers["set-cookie"]) {
                lz_cookie[_0x25ceec.split(";")[0].substr(0, _0x25ceec.split(";")[0].indexOf("="))] = _0x25ceec.split(";")[0].substr(_0x25ceec.split(";")[0].indexOf("=") + 1);
              }
              for (const _0x3456dd of Object.keys(lz_cookie)) {
                cookie += _0x3456dd + "=" + lz_cookie[_0x3456dd] + ";";
              }
            }
            if (_0x45de05.result) {
              switch (_0x5a5008) {
                case "customer/getSimpleActInfoVo":
                  $.jdActivityId = _0x45de05.data.jdActivityId;
                  $.venderId = _0x45de05.data.venderId;
                  $.activityType = _0x45de05.data.activityType;
                  break;
                case "activityContent":
                  $.activityContent = _0x45de05.data.activityId;
                  $.activityName = _0x45de05.data.activityName;
                  $.drawContentList = _0x45de05.data.drawContentList;
                  if ($.index === 1) {
                    ownCode = _0x45de05.data.uid;
                    let _0x1fe8e0 = prizeId = prizeName = "";
                    for (let _0x544116 = 0; _0x544116 < $.drawContentList.length; _0x544116++) {
                      prizeName = $.drawContentList[_0x544116].name;
                      prizeId = $.drawContentList[_0x544116].id;
                      if (prizeId == 0) {
                        _0x1fe8e0 += "谢谢参与";
                        break;
                      } else {
                        if (_0x544116 != $.drawContentList.length - 1) {
                          _0x1fe8e0 += prizeName + "，";
                        } else {
                          _0x1fe8e0 += "" + prizeName;
                        }
                      }
                    }
                    console.log("活动名称：" + $.activityName + "\n活动奖品：" + _0x1fe8e0 + "\n");
                  }
                  break;
                case "wxActionCommon/getUserInfo":
                  if (_0x45de05.data.yunMidImageUrl) {
                    if ($.index === 1) {
                      ownCode.pinImg = _0x45de05.data.yunMidImageUrl;
                      ownCode.nickname = _0x45de05.data.nickname;
                    }
                    $.pinImg = _0x45de05.data.yunMidImageUrl;
                  } else {
                    if ($.index === 1) {
                      ownCode.pinImg = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
                      ownCode.nickname = _0x45de05.data.nickname;
                    }
                    $.pinImg = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
                  }
                  break;
                case "helpFriend":
                  $.helpFriend = _0x45de05.data.helpFriendMsg;
                  console.log("  >> " + $.helpFriend);
                  break;
                case "gameOverRecord":
                  $.gameOverRecord = _0x45de05.data;
                  break;
                case "wxAssemblePage/shopinfo":
                  break;
                case "rankingList":
                  $.rankingList = _0x45de05.data;
                  break;
                case "doTask":
                  if (_0x45de05.result && _0x45de05.result === true) {
                    console.log("  >> 任务完成");
                  } else if (_0x45de05.errorMessage) {
                    console.log("  >> " + (_0x45de05.errorMessage || "任务失败"));
                  } else {}
                  break;
                case "getProduct":
                  $.getProduct = _0x45de05.data;
                  break;
                case "game/start":
                  $.gameId = _0x45de05.data;
                  break;
                case "game/end":
                  if (_0x45de05.data.status === 1) {
                    await $.wait(500);
                    let _0x58521e = new Date().getTime().toString();
                    await task("game/luckyDraw", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&score=" + $.gameScore + "&gameId=" + $.gameId + "&reqtime=" + _0x58521e + "&sign=" + $.md5($.gameId + "," + _0x58521e + ",0eed6538f6e84b754ad2ab95b45c54f8"));
                  } else {
                    console.log("参与游戏失败");
                  }
                  break;
                case "game/luckyDraw":
                  if (_0x45de05.data.drawOk === true) {
                    drawInfo = _0x45de05.data.drawInfo;
                    switch (drawInfo.type) {
                      case 6:
                        console.log("🎉 " + drawInfo.name + " 🐶");
                        break;
                      case 7:
                        generateId = _0x45de05.data.addressId;
                        prizeName = drawInfo.name;
                        console.log("🎉 恭喜获得实物~");
                        console.log("奖品名称：" + prizeName);
                        console.log("参考价值：" + drawInfo.priceInfo + "（元）");
                        console.log("预览图片：" + drawInfo.showImage);
                        if ($.isNode()) {
                          await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl);
                        }
                        break;
                      case 8:
                        console.log("🗑️ 专享价");
                        break;
                      case 9:
                        console.log("🗑️ " + drawInfo.name + " 🎟️");
                        break;
                      case 13:
                        console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                        if ($.isNode()) {
                          await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\n" + $.activityUrl);
                        }
                        break;
                      case 16:
                        console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                        break;
                      default:
                        if (drawInfo.name.includes("券")) {
                          console.log("🗑️ 优惠券");
                        } else {
                          console.log("获得：" + drawInfo.name);
                        }
                        break;
                    }
                  } else {
                    console.log("💨  空气");
                  }
                  break;
                case "myInfo":
                  if (_0x45de05.result) {
                    $.taskList = _0x45de05.data.taskList;
                    $.chance = _0x45de05.data.chance;
                  } else {
                    console.log(_0x45de05.errorMessage);
                  }
                  break;
                default:
                  $.log(JSON.stringify(_0x45de05));
                  break;
              }
            } else {
              switch (_0x5a5008) {
                case "game/start":
                  $.stopGame = true;
                  break;
                default:
                  $.log(JSON.stringify(_0x45de05));
                  break;
              }
            }
          } else {
            $.stopGame = true;
          }
        }
      } catch (_0x5e4f3e) {
        $.log(_0x5e4f3e);
      } finally {
        _0x2d1d6a();
      }
    });
  });
}
function taskUrl(_0x45ea4d, _0x349e6d, _0x2479d5) {
  return {
    "url": _0x2479d5 ? "https://lzkj-isv.isvjcloud.com/" + _0x45ea4d : "https://lzkj-isv.isvjcloud.com/wxgame/" + _0x45ea4d,
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
    "body": _0x349e6d
  };
}
function getMyPing() {
  let _0x470a0c = {
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
  return new Promise(_0x53321b => {
    $.post(_0x470a0c, (_0x4f65dc, _0xd3fb58, _0x48e8da) => {
      try {
        if (_0x4f65dc) {
          $.log(_0x4f65dc);
        } else {
          if (_0xd3fb58.headers["set-cookie"]) {
            cookie = "" + originCookie;
            for (let _0x1cc9e7 of _0xd3fb58.headers["set-cookie"]) {
              lz_cookie[_0x1cc9e7.split(";")[0].substr(0, _0x1cc9e7.split(";")[0].indexOf("="))] = _0x1cc9e7.split(";")[0].substr(_0x1cc9e7.split(";")[0].indexOf("=") + 1);
            }
            for (const _0x169dde of Object.keys(lz_cookie)) {
              cookie += _0x169dde + "=" + lz_cookie[_0x169dde] + ";";
            }
          }
          if (_0x48e8da) {
            _0x48e8da = JSON.parse(_0x48e8da);
            if (_0x48e8da.result) {
              $.pin = _0x48e8da.data.nickname;
              $.secretPin = _0x48e8da.data.secretPin;
            } else {
              $.log(_0x48e8da.errorMessage);
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0x275e2b) {
        $.log(_0x275e2b);
      } finally {
        _0x53321b();
      }
    });
  });
}
function getFirstLZCK() {
  return new Promise(_0x2d9120 => {
    $.get({
      "url": $.activityUrl,
      "headers": {
        "user-agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    }, (_0x4a19ae, _0x4378c3, _0x4db7d4) => {
      try {
        if (_0x4a19ae) {
          console.log(_0x4a19ae);
        } else {
          let _0x19d944 = _0x4db7d4.match(/(活动已结束)/) && _0x4db7d4.match(/(活动已结束)/)[1] || _0x4db7d4.match(/(哎哟，当前活动尚未开始噢！)/) && _0x4db7d4.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
          if (_0x19d944) {
            $.activityEnd = true;
            console.log("活动已结束或者未开始");
          }
          if (_0x4378c3.headers["set-cookie"]) {
            cookie = "" + originCookie;
            for (let _0x5d9ae1 of _0x4378c3.headers["set-cookie"]) {
              lz_cookie[_0x5d9ae1.split(";")[0].substr(0, _0x5d9ae1.split(";")[0].indexOf("="))] = _0x5d9ae1.split(";")[0].substr(_0x5d9ae1.split(";")[0].indexOf("=") + 1);
            }
            for (const _0xc66434 of Object.keys(lz_cookie)) {
              cookie += _0xc66434 + "=" + lz_cookie[_0xc66434] + ";";
            }
            $.cookie = cookie;
          }
        }
      } catch (_0x161bbe) {
        console.log(_0x161bbe);
      } finally {
        _0x2d9120();
      }
    });
  });
}
function random(_0x1f1031, _0x10e110) {
  return Math.floor(Math.random() * (_0x10e110 - _0x1f1031)) + _0x1f1031;
}
function randomsb() {
  let _0x654cbf = ["9vOskAagcMJ4EOWXPQSS9A==", "9irilvenEupYF488TUrl19DLuKQ9zWnXYHf9anC0ujw=", "0Iut/X6Fx833sGPARnxK0TEJAHhGl+YhaIQMI1735mE=", "EX5edGJ14b70ZUglRq7IMmT3GewOP9IL/BN3k2dfrjw=", "ty6iFSNMeLZfu/F1QvwzAnifpKIunqsG7am3vAp9rkc=", "GQ78WmGL+Qv2mqvgvTcsxg=="];
  let _0x1365ce = _0x654cbf[Math.floor(Math.random() * _0x654cbf.length)];
  let _0x145cfc = {
    "url": "https://api.m.jd.com/",
    "body": "functionId=TaskInviteService&body=" + JSON.stringify({
      "method": "participateInviteTask",
      "data": {
        "channel": "1",
        "encryptionInviterPin": encodeURIComponent(_0x1365ce),
        "type": 1
      }
    }) + "&appid=market-task-h5&uuid=&_t=" + Date.now(),
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://assignment.jd.com",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "User-Agent": $.isNode() ? process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : require("./JS_USER_AGENTS").USER_AGENT : $.getdata("JSUA") ? $.getdata("JSUA") : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Referer": "https://assignment.jd.com/",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": cookie
    }
  };
  $.post(_0x145cfc, (_0x45f87b, _0x4c08cd, _0x5498fa) => {});
}
function getUUID(_0x3c9d0a = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x5eaa26 = 0) {
  return _0x3c9d0a.replace(/[xy]/g, function (_0x290b33) {
    var _0x17ac93 = Math.random() * 16 | 0,
      _0x2601ab = _0x290b33 == "x" ? _0x17ac93 : _0x17ac93 & 3 | 8;
    if (_0x5eaa26) {
      uuid = _0x2601ab.toString(36).toUpperCase();
    } else {
      uuid = _0x2601ab.toString(36);
    }
    return uuid;
  });
}
function checkCookie() {
  const _0x52111f = {
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
  return new Promise(_0x3ef62c => {
    $.get(_0x52111f, (_0x433776, _0x35615f, _0x5d6581) => {
      try {
        if (_0x433776) {
          $.logErr(_0x433776);
        } else {
          if (_0x5d6581) {
            _0x5d6581 = JSON.parse(_0x5d6581);
            if (_0x5d6581.retcode === "1001") {
              $.isLogin = false;
              return;
            }
            if (_0x5d6581.retcode === "0" && _0x5d6581.data.hasOwnProperty("userInfo")) {
              $.nickName = _0x5d6581.data.userInfo.baseInfo.nickname;
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0x1b9e28) {
        $.logErr(_0x1b9e28);
      } finally {
        _0x3ef62c();
      }
    });
  });
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const _0xc99b3a = Array.from(new Set($.blacklist.split("&")));
  console.log(_0xc99b3a.join("&") + "\n");
  let _0x2b301d = _0xc99b3a;
  let _0x32eced = [];
  let _0x30551c = false;
  for (let _0x2ff0b6 = 0; _0x2ff0b6 < cookiesArr.length; _0x2ff0b6++) {
    let _0x52b286 = decodeURIComponent(cookiesArr[_0x2ff0b6].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x2ff0b6].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x52b286) break;
    let _0x85423b = false;
    for (let _0x53fecb of _0x2b301d) {
      if (_0x53fecb && _0x53fecb == _0x52b286) {
        _0x85423b = true;
        break;
      }
    }
    if (!_0x85423b) {
      _0x30551c = true;
      _0x32eced.splice(_0x2ff0b6, -1, cookiesArr[_0x2ff0b6]);
    }
  }
  if (_0x30551c) cookiesArr = _0x32eced;
}
function toFirst(_0x305b18, _0x3f8e61) {
  if (_0x3f8e61 != 0) {
    _0x305b18.unshift(_0x305b18.splice(_0x3f8e61, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x487121 = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x487121.join("&") + "\n");
  let _0x4d4ad8 = [];
  let _0x7c1c24 = _0x487121;
  for (let _0x8c4cea in cookiesArr) {
    let _0x28f66c = decodeURIComponent(cookiesArr[_0x8c4cea].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x8c4cea].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x7c1c24.includes(_0x28f66c)) {
      _0x4d4ad8.push(cookiesArr[_0x8c4cea]);
    }
  }
  helpCookiesArr = _0x4d4ad8;
  if (_0x7c1c24.length > 1) {
    for (let _0x4f9c8d in _0x7c1c24) {
      let _0x4f86a0 = _0x7c1c24[_0x7c1c24.length - 1 - _0x4f9c8d];
      if (!_0x4f86a0) continue;
      for (let _0x8c4cea in helpCookiesArr) {
        let _0x28f66c = decodeURIComponent(helpCookiesArr[_0x8c4cea].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x8c4cea].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x4f86a0 == _0x28f66c) {
          toFirst(helpCookiesArr, _0x8c4cea);
        }
      }
    }
  }
}
function getQueryString(_0x4d91c8, _0x211968) {
  let _0x29c9dc = new RegExp("(^|[&?])" + _0x211968 + "=([^&]*)(&|$)");
  let _0x4ce6c2 = _0x4d91c8.match(_0x29c9dc);
  if (_0x4ce6c2 != null) {
    return unescape(_0x4ce6c2[2]);
  }
  return "";
}
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);