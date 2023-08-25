/*
东东水果:脚本更新地址 jd_fruit_friend.js
更新时间：2021-5-18
活动入口：京东APP我的-更多工具-东东农场
==========================Quantumultx=========================
[task_local]
#东东农场好友删减奖励
10 2 * * * jd_fruit_friend.js, tag=东东农场好友删减奖励, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true
=========================Loon=============================
[Script]
cron "10 2 * * *" script-path=jd_fruit_friend.js,tag=东东农场好友删减奖励

=========================Surge============================
东东农场好友删减奖励 = type=cron,cronexp="10 2 * * *",wake-system=1,timeout=3600,script-path=jd_fruit_friend.js

=========================小火箭===========================
东东农场好友删减奖励 = type=cron,script-path=jd_fruit_friend.js, cronexpr="10 2 * * *", timeout=3600, enable=true


*/
const Env=require('./utils/Env.js');
const $ = new Env('东东农场好友删减奖励');
let ilIlIi = [],
  ilIlIl = "",
  ll1llI,
  i11lIl = "",
  l1lI11 = [],
  lI1iii = "",
  i11lIi = "",
  ll1ll1 = {};
let I1iiii = true;
const lIilll = require("./function/jdCommon"),
  h5st = require("./utils/h5st.js");
let li1I = I1iili(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  IIliil = I1iili(2, "1234567890") + "-" + I1iili(4, "1234567890") + "-" + I1iili(4, "1234567890") + "-" + I1iili(5, "1234567890"),
  ll1liI = "106.475" + Math.floor(Math.random() * 899 + 100),
  lI1iiI = "29.503" + Math.floor(Math.random() * 899 + 100),
  ll1li1 = true;
const iIIlll = require("fs");
let I1iiiI = false,
  iiI1il = "./Fruit_ShareCache.json",
  iiI1ii = iIIlll.existsSync(iiI1il),
  I1iii1 = [];
iiI1ii && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), I1iii1 = iIIlll.readFileSync(iiI1il, "utf-8"), I1iii1 && (I1iii1 = I1iii1.toString(), I1iii1 = JSON.parse(I1iii1)));
let lilii1 = 0,
  iIiii1 = false;
!(async () => {
  await lIiliI();
  if (!ilIlIi[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("\n【若多次提示403，务必更换IP运行.....】\n");
  if (ll1li1) {
    console.log("\n【开始收集您的互助码，用于好友删除与加好友操作】\n");
    for (let lilili = 0; lilili < ilIlIi.length; lilili++) {
      if (ilIlIi[lilili]) {
        ilIlIl = ilIlIi[lilili];
        $.UserName = decodeURIComponent(ilIlIl.match(/pt_pin=([^; ]+)(?=;?)/) && ilIlIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = lilili + 1;
        $.isLogin = true;
        $.nickName = "";
        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          $.isNode() && (await ll1llI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
          continue;
        }
        lI1iii = "";
        i11lIi = "";
        ll1ll1 = {};
        $.UA = lIilll.genUA($.UserName);
        $.retry = 0;
        iIiii1 = false;
        await ll1lii();
        iIiii1 && (await $.wait(5000), lilii1++);
        lilii1 == 10 && (console.log("\n【访问接口次数达到10次，休息一分钟.....】\n"), await $.wait(60 * 1000), lilii1 = 0);
      }
    }
    if (I1iiiI) {
      var Illlii = JSON.stringify(I1iii1, null, 2);
      iIIlll.writeFile(iiI1il, Illlii, function (iIiili) {
        iIiili ? (console.log(iIiili), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
      });
    }
  }
  console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  for (let l1lI1 = 0; l1lI1 < ilIlIi.length; l1lI1++) {
    if (ilIlIi[l1lI1]) {
      ilIlIl = ilIlIi[l1lI1];
      $.UserName = decodeURIComponent(ilIlIl.match(/pt_pin=([^; ]+)(?=;?)/) && ilIlIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1lI1 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await ll1llI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      lI1iii = "";
      i11lIi = "";
      ll1ll1 = {};
      $.UA = lIilll.genUA($.UserName);
      $.retry = 0;
      lilii1++;
      await ll1lil();
      lilii1 == 5 && (console.log("\n【访问接口次数达到5次，休息一分钟.....】\n"), await $.wait(60 * 1000), lilii1 = 0);
    }
  }
  $.isNode() && i11lIl && $.ctrTemp && (await ll1llI.sendNotify("" + $.name, "" + i11lIl));
})().catch(Ili1I1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Ili1I1 + "!", "");
}).finally(() => {
  $.done();
});
async function ll1lil() {
  i11lIi = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await iliiII();
    await IIlil1();
    if ($.farmInfo?.["farmUserPro"]) lI1iii = "删除好友与接受好友邀请已完成";else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) {
          console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");
        } else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 30000, 10)));
    }
  } catch (i1llI) {
    $.logErr(i1llI);
  }
}
async function IIlil1() {
  await IIliii();
  if ($.friendList) {
    console.log("\n今日已邀请好友" + $.friendList?.["inviteFriendCount"] + "个 / 每日邀请上限" + $.friendList?.["inviteFriendMax"] + "个");
    console.log("开始删除" + ($.friendList?.["friends"] && $.friendList?.["friends"]["length"]) + "个好友,可拿每天的邀请奖励");
    if ($.friendList?.["friends"] && $.friendList?.["friends"]["length"] > 0) {
      for (let IIlI1i of $.friendList?.["friends"]) {
        console.log("\n开始删除好友 [" + IIlI1i?.["shareCode"] + "]");
        const iiiI1i = await iIiill("deleteFriendForFarm", {
          "shareCode": "" + IIlI1i?.["shareCode"],
          "version": 8,
          "channel": 1
        });
        iiiI1i && iiiI1i?.["code"] === "0" && console.log("删除好友 [" + IIlI1i?.["shareCode"] + "] 成功\n");
      }
    }
    await I1Illl();
    if ($.friendList?.["inviteFriendCount"] > 0) {
      $.friendList?.["inviteFriendCount"] > $.friendList?.["inviteFriendGotAwardCount"] && (console.log("开始领取邀请好友的奖励"), await i1111I(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes)));
    } else console.log("今日未邀请过好友");
  } else console.log("查询好友列表失败\n");
}
async function I1Illl() {
  for (let l1lil1 of l1lI11) {
    if (l1lil1 === $.farmInfo.farmUserPro?.["shareCode"]) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }
    await IliIlI(l1lil1);
    if ($.inviteFriendRes && $.inviteFriendRes?.["helpResult"] && $.inviteFriendRes?.["helpResult"]?.["code"] === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "的好友");else $.inviteFriendRes && $.inviteFriendRes?.["helpResult"] && $.inviteFriendRes?.["helpResult"]?.["code"] === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
  }
}
async function ll1lii() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var IilII = false,
      ili1l = "";
    if (I1iii1) {
      for (let ilI11I = 0; ilI11I < I1iii1.length; ilI11I++) {
        I1iii1[ilI11I].pt_pin == $.UserName && (IilII = true, ili1l = I1iii1[ilI11I].ShareCode);
      }
    }
    if (!IilII) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      iIiii1 = true;
      await iliiII();
      if ($.farmInfo?.["farmUserPro"]) {
        var i1lii = {};
        ili1l = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        i1lii = {
          "pt_pin": $.UserName,
          "ShareCode": ili1l
        };
        I1iii1.push(i1lii);
        I1iiiI = true;
      }
    }
    ili1l ? (console.log("\n" + ili1l), l1lI11.push(ili1l)) : console.log("\n数据异常");
  } catch (i1li1) {
    $.logErr(i1li1);
  }
}
async function li11() {
  $.duckRes = await iIiill("totalWaterTaskForFarm", {
    "type": 2,
    "version": 6,
    "channel": 2
  });
}
async function ilIlI1() {
  $.totalWaterReward = await iIiill("totalWaterTaskForFarm");
}
async function I1Illi() {
  $.firstWaterReward = await iIiill("firstWaterTaskForFarm");
}
async function IIlilI() {
  $.waterFriendGotAwardRes = await iIiill("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}
async function Illlll() {
  $.myCardInfoRes = await iIiill("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}
async function Illlli(III1Ii) {
  $.userMyCardRes = await iIiill("userMyCardForFarm", {
    "cardType": III1Ii
  });
}
async function llli1l(IiIiII) {
  $.gotStageAwardForFarmRes = await iIiill("gotStageAwardForFarm", {
    "type": IiIiII
  });
}
async function lI1ii1() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await iIiill("waterGoodForFarm");
}
async function llli1i() {
  $.initForTurntableFarmRes = await iIiill("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function iiI1l1() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await iIiill("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}
async function i11lI1() {
  $.timingAwardRes = await iIiill("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function liliiI(liI11I, III1) {
  liI11I === 1 && console.log("浏览爆品会场");
  liI11I === 2 && console.log("天天抽奖浏览任务领取水滴");
  const l1iiIi = {
    "type": liI11I,
    "adId": III1,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await iIiill("browserForTurntableFarm", l1iiIi);
}
async function ilIIiI(IIIliI) {
  const iIlI1l = {
    "type": 2,
    "adId": IIIliI,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await iIiill("browserForTurntableFarm", iIlI1l);
}
async function lIl1ii() {
  $.lotteryMasterHelpRes = await iIiill("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}
async function lIl1il() {
  $.masterGotFinished = await iIiill("masterGotFinishedTaskForFarm");
}
async function Ii1l11() {
  $.masterHelpResult = await iIiill("masterHelpTaskInitForFarm");
}
async function IIlii1() {
  $.farmAssistResult = await iIiill("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function iiI1lI() {
  $.receiveStageEnergy = await iIiill("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function IliIlI() {
  $.inviteFriendRes = await iIiill("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function IIliiI() {
  $.helpResult = await iIiill("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function i1111l() {
  const I1I1II = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await iIiill("waterRainForFarm", I1I1II);
}
async function i1111i() {
  $.clockInInit = await iIiill("clockInInitForFarm");
}
async function iliiI1() {
  $.clockInForFarmRes = await iIiill("clockInForFarm", {
    "type": 1
  });
}
async function Illli1(Illii, iIlI11, IIII) {
  let iil111 = {
    "id": Illii,
    "type": iIlI11,
    "step": IIII
  };
  if (iIlI11 === "theme") {
    if (IIII === "1") $.themeStep1 = await iIiill("clockInFollowForFarm", iil111);else {
      if (IIII === "2") {
        $.themeStep2 = await iIiill("clockInFollowForFarm", iil111);
      }
    }
  } else {
    if (iIlI11 === "venderCoupon") {
      if (IIII === "1") $.venderCouponStep1 = await iIiill("clockInFollowForFarm", iil111);else IIII === "2" && ($.venderCouponStep2 = await iIiill("clockInFollowForFarm", iil111));
    }
  }
}
async function ilIIii() {
  $.gotClockInGiftRes = await iIiill("gotClockInGift", {
    "type": 2
  });
}
async function l1111() {
  $.threeMeal = await iIiill("gotThreeMealForFarm");
}
async function lIl1l1(IlliI, I1I1I1) {
  if (I1I1I1 === 0) $.browseResult = await iIiill("browseAdTaskForFarm", {
    "advertId": IlliI,
    "type": I1I1I1
  });else {
    if (I1I1I1 === 1) {
      $.browseRwardResult = await iIiill("browseAdTaskForFarm", {
        "advertId": IlliI,
        "type": I1I1I1
      });
    }
  }
}
async function li1i(iiil1I) {
  const lIiI1 = {
    "type": iiil1I,
    "babelChannel": "45",
    "line": "getBean",
    "version": 18,
    "channel": 1
  };
  if (iiil1I === 1) $.treasureResult = await iIiill("ddnc_getTreasureBoxAward", lIiI1);else iiil1I === 2 && ($.treasureRwardResult = await iIiill("ddnc_getTreasureBoxAward", lIiI1));
}
async function ilIIil() {
  $.goalResult = await iIiill("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function lIili1() {
  $.signResult = await iIiill("signForFarm");
}
async function li1l() {
  const ll11Il = {
    "babelChannel": "10",
    "version": 24,
    "lat": lI1iiI,
    "lng": ll1liI
  };
  $.gotNewUserTaskForFarmResult = await iIiill("gotNewUserTaskForFarm", ll11Il);
}
async function iliiII() {
  $.farmInfo = await iIiill("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": li1I,
    "un_area": IIliil,
    "version": 22,
    "lat": lI1iiI,
    "lng": ll1liI,
    "channel": 1
  });
}
async function iiI1li() {
  console.log("\n初始化任务列表");
  $.farmTask = await iIiill("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function IIliii() {
  $.friendList = await iIiill("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}
async function i1111I() {
  $.awardInviteFriendRes = await iIiill("awardInviteFriendForFarm");
}
async function IliIl1(IiIi11) {
  const iillII = {
    "shareCode": IiIi11,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await iIiill("waterFriendForFarm", iillII);
}
async function lIl1lI() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + I1iiii === "false";
  $.ctrTemp ? ($.msg($.name, i11lIi, lI1iii, ll1ll1), $.isNode() && (i11lIl += i11lIi + "\n" + lI1iii + ($.index !== ilIlIi.length ? "" : ""))) : $.log("" + lI1iii);
}
function iiI1ll(iiil1l) {
  let ll11I1;
  return iiil1l ? ll11I1 = new Date(iiil1l) : ll11I1 = new Date(), ll11I1.getFullYear() + "-" + (ll11I1.getMonth() + 1 >= 10 ? ll11I1.getMonth() + 1 : "0" + (ll11I1.getMonth() + 1)) + "-" + (ll11I1.getDate() >= 10 ? ll11I1.getDate() : "0" + ll11I1.getDate());
}
function lIiliI() {
  return new Promise(liIIi1 => {
    console.log("开始获取配置文件\n");
    ll1llI = $.isNode() ? require("./sendNotify") : "";
    const l1I11l = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(l1I11l).forEach(iIliii => {
        l1I11l[iIliii] && ilIlIi.push(l1I11l[iIliii]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else ilIlIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lililI($.getdata("CookiesJD") || "[]").map(l1I11i => l1I11i.cookie)].filter(iIlii1 => !!iIlii1);
    console.log("共" + ilIlIi.length + "个京东账号\n");
    $.shareCodesArr = [];
    liIIi1();
  });
}
function iIiill(l1IlII, ii1i = {}, ilIIl1 = 1000) {
  return new Promise(IIiilI => {
    setTimeout(async () => {
      $.post(await l111I(l1IlII, ii1i), (IIiili, IIiiiI, lIi1l1) => {
        try {
          if (IIiili) {
            console.log("\n东东农场: API查询请求失败 ‼️‼️");
            console.log(JSON.stringify(IIiili));
            console.log("function_id:" + l1IlII);
            $.logErr(IIiili);
          } else Ii1IIi(lIi1l1) && (lIi1l1 = JSON.parse(lIi1l1));
        } catch (IIIlll) {
          $.logErr(IIIlll, IIiiiI);
        } finally {
          IIiilI(lIi1l1);
        }
      });
    }, ilIIl1);
  });
}
function Ii1IIi(llli1I) {
  if (!llli1I) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(llli1I) == "object") return true;
  } catch (liIIll) {
    return console.log(liIIll), false;
  }
}
const Ii1IIl = {
  "initForFarm": "8a2af",
  "taskInitForFarm": "fcb5a",
  "browseAdTaskForFarm": "53f09",
  "firstWaterTaskForFarm": "0cf1e",
  "waterFriendGotAwardForFarm": "d08ff",
  "ddnc_getTreasureBoxAward": "67dfc",
  "totalWaterTaskForFarm": "102f5",
  "gotThreeMealForFarm": "57b30",
  "waterGoodForFarm": "0c010",
  "choiceGoodsForFarm": "5f4ca",
  "gotCouponForFarm": "b1515",
  "gotStageAwardForFarm": "81591",
  "followVenderForBrand": "71547",
  "gotWaterGoalTaskForFarm": "c901b",
  "gotNewUserTaskForFarm": "de8f8",
  "orderTaskGotWaterForFarm": "eed5c",
  "clockInForFarm": "32b94",
  "clockInFollowForFarm": "4a0b4",
  "waterFriendForFarm": "673a0",
  "awardFirstFriendForFarm": "9b655",
  "awardInviteFriendForFarm": "2b5ca",
  "awardCallOrInviteFriendForFarm": "b0b03",
  "userMyCardForFarm": "86ba5",
  "getCallUserCardForFarm": "2ca57",
  "deleteFriendForFarm": "eaf91",
  "gotLowFreqWaterForFarm": "8172b",
  "getFullCollectionReward": "5c767",
  "getOrderPayLotteryWater": "ef089",
  "receiveStageEnergy": "15507",
  "exchangeGood": "52963",
  "farmAssistInit": "92354",
  "myCardInfoForFarm": "157b6",
  "gotPopFirstPurchaseTaskForFarm": "d432f",
  "limitWaterInitForFarm": "6bdc2",
  "ddnc_surpriseModal": "e81c1",
  "friendInitForFarm": "a5a9c",
  "clockInInitForFarm": "08dc3",
  "guideTaskAward": "59bc4",
  "signForFarm": "32b94",
  "gotNewUserTaskForFarm": "de8f8"
};
async function l111I(l1IlIl, liIIli = {}) {
  let liIl = "";
  if (!Ii1IIl[l1IlIl]) {
    liIl = "https://api.m.jd.com/client.action?functionId=" + l1IlIl + "&body=" + encodeURIComponent(JSON.stringify(liIIli)) + "&appid=wh5";
  } else {
    const iIIII = {
        "appid": "signed_wh5",
        "client": "iOS",
        "clientVersion": "10.1.0",
        "functionId": l1IlIl,
        "body": liIIli
      },
      Il1iIi = await ll1lli(Ii1IIl[l1IlIl], iIIII);
    liIl = "https://api.m.jd.com/client.action?" + Il1iIi;
  }
  return {
    "url": liIl,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      "Cookie": ilIlIl
    },
    "timeout": 10000
  };
}
async function ll1lli(Ii1Il, Iii1ii) {
  try {
    let Ii1Ii = new h5st({
      "appId": Ii1Il,
      "appid": "signed_wh5",
      "clientVersion": Iii1ii?.["clientVersion"],
      "client": Iii1ii?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await Ii1Ii.genAlgo(), body = await Ii1Ii.genUrlParams(Iii1ii.functionId, Iii1ii.body), body;
  } catch (lIi1ll) {}
}
async function ll1lll(l1IIiI, IlilIi) {
  let i11IiI = {
      "searchParams": {
        ...IlilIi,
        "appId": l1IIiI
      },
      "pt_pin": $.UserName,
      "client": IlilIi?.["client"],
      "clientVersion": IlilIi?.["clientVersion"]
    },
    iIlill = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    IlilIl = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(i11IiI),
      "headers": iIlill,
      "timeout": 30000
    };
  return new Promise(async i11Ii1 => {
    $.post(IlilIl, (l1I1l1, ll1lIi, lIi1i) => {
      let Ii1Ii1 = "";
      try {
        if (l1I1l1) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          lIi1i = JSON.parse(lIi1i);
          console.log(JSON.stringify(lIi1i));
          if (typeof lIi1i === "object" && lIi1i && lIi1i.body) {
            if (lIi1i.body) Ii1Ii1 = lIi1i || "";
          } else lIi1i.code == 400 ? console.log("\n" + lIi1i.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (lIi1l) {
        $.logErr(lIi1l, ll1lIi);
      } finally {
        i11Ii1(Illlil(Ii1Ii1));
      }
    });
  });
}
function Illlil(I1iiIi, li1i1 = {}) {
  let liliII = [],
    lI1iIl = li1i1.connector || "&",
    iIiiII = Object.keys(I1iiIi);
  if (li1i1.sort) iIiiII = iIiiII.sort();
  for (let li11i1 of iIiiII) {
    let II1l1 = I1iiIi[li11i1];
    if (II1l1 && typeof II1l1 === "object") II1l1 = JSON.stringify(II1l1);
    if (II1l1 && li1i1.encode) II1l1 = encodeURIComponent(II1l1);
    liliII.push(li11i1 + "=" + II1l1);
  }
  return liliII.join(lI1iIl);
}
function I1iili(liii1i, IIll1i = "qwertyuiopasdfghjklzxcvbnm") {
  let IIll1l = "";
  for (let liii1l = 0; liii1l < liii1i; liii1l++) {
    IIll1l += IIll1i[Math.floor(Math.random() * IIll1i.length)];
  }
  return IIll1l;
}
function lililI(I1iiII) {
  if (typeof I1iiII == "string") try {
    return JSON.parse(I1iiII);
  } catch (iIiiI1) {
    return console.log(iIiiI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}