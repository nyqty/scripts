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
let cookiesArr = [],
    cookie = '',
    isBox = false,
    notify,
    allMessage = '';
let newShareCodes = [];
let iii1il1i = "",
  ilIi1I1l = "",
  Ill1iIii = {};
let IIIl11li = true;
const i1iIIliI = require("./function/jdCommon"),
  IIi1l1i1 = require("./utils/h5st.js");
let l1IlliIi = IIii11ii(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  Il1Iiil = IIii11ii(2, "1234567890") + "-" + IIii11ii(4, "1234567890") + "-" + IIii11ii(4, "1234567890") + "-" + IIii11ii(5, "1234567890"),
  illlI1iI = "106.475" + Math.floor(Math.random() * 899 + 100),
  l11IIIIl = "29.503" + Math.floor(Math.random() * 899 + 100),
  I1Il1iI1 = true;
const illi11l = require("fs");
let IIiiii = false,
  Ii1llIi = "./Fruit_ShareCache.json",
  i1ilIi1 = illi11l.existsSync(Ii1llIi),
  lIi1II1l = [];
i1ilIi1 && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), lIi1II1l = illi11l.readFileSync(Ii1llIi, "utf-8"), lIi1II1l && (lIi1II1l = lIi1II1l.toString(), lIi1II1l = JSON.parse(lIi1II1l)));
let IiIIII1i = 0,
  il1l1Il = false;
!(async () => {
  await iIlI1I1I();
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("\n【若多次提示403，务必更换IP运行.....】\n");
  if (I1Il1iI1) {
    console.log("\n【开始收集您的互助码，用于好友删除与加好友操作】\n");
    for (let ii1lIi1l = 0; ii1lIi1l < cookiesArr.length; ii1lIi1l++) {
      if (cookiesArr[ii1lIi1l]) {
        cookie = cookiesArr[ii1lIi1l];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = ii1lIi1l + 1;
        $.isLogin = true;
        $.nickName = "";
        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
          continue;
        }
        iii1il1i = "";
        ilIi1I1l = "";
        Ill1iIii = {};
        $.UA = i1iIIliI.genUA($.UserName);
        $.retry = 0;
        il1l1Il = false;
        await I1liIl1i();
        il1l1Il && (await $.wait(2000), IiIIII1i++);
        IiIIII1i == 10 && (console.log("\n【访问接口次数达到10次，休息30秒.....】\n"), await $.wait(30 * 1000), IiIIII1i = 0);
      }
    }
    if (IIiiii) {
      var l1ii1Ii = JSON.stringify(lIi1II1l, null, 2);
      illi11l.writeFile(Ii1llIi, l1ii1Ii, function (I1IIllli) {
        I1IIllli ? (console.log(I1IIllli), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
      });
    }
  }
  console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  for (let I1Iili = 0; I1Iili < cookiesArr.length; I1Iili++) {
    if (cookiesArr[I1Iili]) {
      cookie = cookiesArr[I1Iili];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I1Iili + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      iii1il1i = "";
      ilIi1I1l = "";
      Ill1iIii = {};
      $.UA = i1iIIliI.genUA($.UserName);
      $.retry = 0;
      IiIIII1i++;
      await I11l1II1();
      if (IiIIII1i == 5) {
        console.log("\n【访问接口次数达到5次，休息30秒.....】\n");
        await $.wait(30 * 1000);
        IiIIII1i = 0;
      }
    }
  }
  $.isNode() && allMessage && $.ctrTemp && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(Illi1Ill => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Illi1Ill + "!", "");
}).finally(() => {
  $.done();
});
async function I11l1II1() {
  ilIi1I1l = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await lIl1Ilil();
    await lIl11I1l();
    if ($.farmInfo?.["farmUserPro"]) iii1il1i = "删除好友与接受好友邀请已完成";else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
    }
  } catch (il1lil1I) {
    $.logErr(il1lil1I);
  }
}
async function lIl11I1l() {
  await iIlIi1i1();
  if ($.friendList) {
    console.log("\n今日已邀请好友" + $.friendList?.["inviteFriendCount"] + "个 / 每日邀请上限" + $.friendList?.["inviteFriendMax"] + "个");
    console.log("开始删除" + ($.friendList?.["friends"] && $.friendList?.["friends"]["length"]) + "个好友,可拿每天的邀请奖励");
    if ($.friendList?.["friends"] && $.friendList?.["friends"]["length"] > 0) for (let iI1i1i1 of $.friendList?.["friends"]) {
      console.log("\n开始删除好友 [" + iI1i1i1?.["shareCode"] + "]");
      const II1i111I = await IlIIlIll("deleteFriendForFarm", {
        "shareCode": "" + iI1i1i1?.["shareCode"],
        "version": 8,
        "channel": 1
      });
      II1i111I && II1i111I?.["code"] === "0" && console.log("删除好友 [" + iI1i1i1?.["shareCode"] + "] 成功\n");
    }
    await lII1i1();
    if ($.friendList?.["inviteFriendCount"] > 0) {
      $.friendList?.["inviteFriendCount"] > $.friendList?.["inviteFriendGotAwardCount"] && (console.log("开始领取邀请好友的奖励"), await i11li1ii(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes)));
    } else console.log("今日未邀请过好友");
  } else console.log("查询好友列表失败\n");
}
async function lII1i1() {
  for (let illlI1lI of newShareCodes) {
    if (illlI1lI === $.farmInfo.farmUserPro?.["shareCode"]) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }
    await lliili1I(illlI1lI);
    if ($.inviteFriendRes && $.inviteFriendRes?.["helpResult"] && $.inviteFriendRes?.["helpResult"]?.["code"] === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "的好友");else $.inviteFriendRes && $.inviteFriendRes?.["helpResult"] && $.inviteFriendRes?.["helpResult"]?.["code"] === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
  }
}
async function I1liIl1i() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var l1iilli1 = false,
      I11lIil1 = "";
    if (lIi1II1l) {
      for (let IlI1Iiii = 0; IlI1Iiii < lIi1II1l.length; IlI1Iiii++) {
        lIi1II1l[IlI1Iiii].pt_pin == $.UserName && (l1iilli1 = true, I11lIil1 = lIi1II1l[IlI1Iiii].ShareCode);
      }
    }
    if (!l1iilli1) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      il1l1Il = true;
      await lIl1Ilil();
      if ($.farmInfo?.["farmUserPro"]) {
        var liiII1i = {};
        I11lIil1 = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        liiII1i = {
          "pt_pin": $.UserName,
          "ShareCode": I11lIil1
        };
        lIi1II1l.push(liiII1i);
        IIiiii = true;
      }
    }
    I11lIil1 ? (console.log("\n" + I11lIil1), newShareCodes.push(I11lIil1)) : console.log("\n数据异常");
  } catch (l1lliilI) {
    $.logErr(l1lliilI);
  }
}
async function i11IIiI() {
  $.duckRes = await IlIIlIll("totalWaterTaskForFarm", {
    "type": 2,
    "version": 6,
    "channel": 2
  });
}
async function iIl1I1I() {
  $.totalWaterReward = await IlIIlIll("totalWaterTaskForFarm");
}
async function ilIi1li() {
  $.firstWaterReward = await IlIIlIll("firstWaterTaskForFarm");
}
async function IlIil1li() {
  $.waterFriendGotAwardRes = await IlIIlIll("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}
async function I1IlI() {
  $.myCardInfoRes = await IlIIlIll("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}
async function i1ilIllI(l1Il1II) {
  $.userMyCardRes = await IlIIlIll("userMyCardForFarm", {
    "cardType": l1Il1II
  });
}
async function lili11li(ii1IIiii) {
  $.gotStageAwardForFarmRes = await IlIIlIll("gotStageAwardForFarm", {
    "type": ii1IIiii
  });
}
async function i1l11lI() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await IlIIlIll("waterGoodForFarm");
}
async function liIi111l() {
  $.initForTurntableFarmRes = await IlIIlIll("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function I11I1IIl() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await IlIIlIll("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}
async function ilIiI11() {
  $.timingAwardRes = await IlIIlIll("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function iiili1il(ilI1I11l, iIl1i1ii) {
  ilI1I11l === 1 && console.log("浏览爆品会场");
  ilI1I11l === 2 && console.log("天天抽奖浏览任务领取水滴");
  const IIIIIli1 = {
    "type": ilI1I11l,
    "adId": iIl1i1ii,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await IlIIlIll("browserForTurntableFarm", IIIIIli1);
}
async function i1il11I1(Il11l1Il) {
  const Iili11 = {
    "type": 2,
    "adId": Il11l1Il,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await IlIIlIll("browserForTurntableFarm", Iili11);
}
async function iiIlll11() {
  $.lotteryMasterHelpRes = await IlIIlIll("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}
async function I1ill1ll() {
  $.masterGotFinished = await IlIIlIll("masterGotFinishedTaskForFarm");
}
async function liIlIlIi() {
  $.masterHelpResult = await IlIIlIll("masterHelpTaskInitForFarm");
}
async function lIl1Il1i() {
  $.farmAssistResult = await IlIIlIll("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function II1i1i1() {
  $.receiveStageEnergy = await IlIIlIll("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function lliili1I() {
  $.inviteFriendRes = await IlIIlIll("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function ili1lIiI() {
  $.helpResult = await IlIIlIll("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function IlI11l11() {
  const l1lI111i = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await IlIIlIll("waterRainForFarm", l1lI111i);
}
async function i1Illl1i() {
  $.clockInInit = await IlIIlIll("clockInInitForFarm");
}
async function i111il1() {
  $.clockInForFarmRes = await IlIIlIll("clockInForFarm", {
    "type": 1
  });
}
async function i1ilIill(iIl1ii1i, Ii1iil11, I1iiili) {
  let II1lIi = {
    "id": iIl1ii1i,
    "type": Ii1iil11,
    "step": I1iiili
  };
  if (Ii1iil11 === "theme") {
    if (I1iiili === "1") $.themeStep1 = await IlIIlIll("clockInFollowForFarm", II1lIi);else I1iiili === "2" && ($.themeStep2 = await IlIIlIll("clockInFollowForFarm", II1lIi));
  } else {
    if (Ii1iil11 === "venderCoupon") {
      if (I1iiili === "1") $.venderCouponStep1 = await IlIIlIll("clockInFollowForFarm", II1lIi);else I1iiili === "2" && ($.venderCouponStep2 = await IlIIlIll("clockInFollowForFarm", II1lIi));
    }
  }
}
async function IIIll1lI() {
  $.gotClockInGiftRes = await IlIIlIll("gotClockInGift", {
    "type": 2
  });
}
async function ii1I1IlI() {
  $.threeMeal = await IlIIlIll("gotThreeMealForFarm");
}
async function iillII11(lIilIlll, l1illlI) {
  if (l1illlI === 0) $.browseResult = await IlIIlIll("browseAdTaskForFarm", {
    "advertId": lIilIlll,
    "type": l1illlI
  });else l1illlI === 1 && ($.browseRwardResult = await IlIIlIll("browseAdTaskForFarm", {
    "advertId": lIilIlll,
    "type": l1illlI
  }));
}
async function iiii1IIi(ii11iii) {
  const i1iIl1l = {
    "type": ii11iii,
    "babelChannel": "45",
    "line": "getBean",
    "version": 18,
    "channel": 1
  };
  if (ii11iii === 1) $.treasureResult = await IlIIlIll("ddnc_getTreasureBoxAward", i1iIl1l);else ii11iii === 2 && ($.treasureRwardResult = await IlIIlIll("ddnc_getTreasureBoxAward", i1iIl1l));
}
async function IIli1IiI() {
  $.goalResult = await IlIIlIll("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function ii1l1lii() {
  $.signResult = await IlIIlIll("signForFarm");
}
async function I11iillI() {
  const Ili1lI11 = {
    "babelChannel": "10",
    "version": 24,
    "lat": l11IIIIl,
    "lng": illlI1iI
  };
  $.gotNewUserTaskForFarmResult = await IlIIlIll("gotNewUserTaskForFarm", Ili1lI11);
}
async function lIl1Ilil() {
  $.farmInfo = await IlIIlIll("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": l1IlliIi,
    "un_area": Il1Iiil,
    "version": 22,
    "lat": l11IIIIl,
    "lng": illlI1iI,
    "channel": 1
  });
}
async function I1IIlII() {
  console.log("\n初始化任务列表");
  $.farmTask = await IlIIlIll("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function iIlIi1i1() {
  $.friendList = await IlIIlIll("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}
async function i11li1ii() {
  $.awardInviteFriendRes = await IlIIlIll("awardInviteFriendForFarm");
}
async function iilllI(lil1i1i1) {
  const li1i1I1i = {
    "shareCode": lil1i1i1,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await IlIIlIll("waterFriendForFarm", li1i1I1i);
}
async function I1IlI1l1() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + IIIl11li === "false";
  $.ctrTemp ? ($.msg($.name, ilIi1I1l, iii1il1i, Ill1iIii), $.isNode() && (allMessage += ilIi1I1l + "\n" + iii1il1i + ($.index !== cookiesArr.length ? "" : ""))) : $.log("" + iii1il1i);
}
function iiili11(lliliIIl) {
  let IllIIlI1;
  return lliliIIl ? IllIIlI1 = new Date(lliliIIl) : IllIIlI1 = new Date(), IllIIlI1.getFullYear() + "-" + (IllIIlI1.getMonth() + 1 >= 10 ? IllIIlI1.getMonth() + 1 : "0" + (IllIIlI1.getMonth() + 1)) + "-" + (IllIIlI1.getDate() >= 10 ? IllIIlI1.getDate() : "0" + IllIIlI1.getDate());
}
function iIlI1I1I() {
  return new Promise(l1Illlli => {
    console.log("开始获取配置文件\n");
    notify = $.isNode() ? require("./sendNotify") : "";
    const iiIllI1i = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(iiIllI1i).forEach(ilIli1I => {
        if (iiIllI1i[ilIli1I]) {
          cookiesArr.push(iiIllI1i[ilIli1I]);
        }
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIillIlI($.getdata("CookiesJD") || "[]").map(IiI111I => IiI111I.cookie)].filter(Il111I1 => !!Il111I1);
    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    l1Illlli();
  });
}
function IlIIlIll(lI1l111, iIIllil = {}, IiIil = 1000) {
  return new Promise(ll1II1l => {
    setTimeout(async () => {
      $.post(await I1lii11(lI1l111, iIIllil), (liIIli1I, IllilIiI, iiilii1i) => {
        try {
          liIIli1I ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(liIIli1I)), console.log("function_id:" + lI1l111), $.logErr(liIIli1I)) : IiIllI1(iiilii1i) && (iiilii1i = JSON.parse(iiilii1i));
        } catch (I11lIl) {
          $.logErr(I11lIl, IllilIiI);
        } finally {
          ll1II1l(iiilii1i);
        }
      });
    }, IiIil);
  });
}
function IiIllI1(I1iiilII) {
  if (!I1iiilII) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(I1iiilII) == "object") {
      return true;
    }
  } catch (lI1I1li1) {
    return console.log(lI1I1li1), false;
  }
}
const llIIlil = {
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
async function I1lii11(IlIIlII1, lIiI1iIl = {}) {
  let IllIll11 = "";
  if (!llIIlil[IlIIlII1]) IllIll11 = "https://api.m.jd.com/client.action?functionId=" + IlIIlII1 + "&body=" + encodeURIComponent(JSON.stringify(lIiI1iIl)) + "&appid=wh5";else {
    const l11llIil = {
        "appid": "signed_wh5",
        "client": "iOS",
        "clientVersion": "10.1.0",
        "functionId": IlIIlII1,
        "body": lIiI1iIl
      },
      i1ll1l = await iiiiIl1i(llIIlil[IlIIlII1], l11llIil);
    IllIll11 = "https://api.m.jd.com/client.action?" + i1ll1l;
  }
  return {
    "url": IllIll11,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      "Cookie": cookie
    },
    "timeout": 30000
  };
}
async function iiiiIl1i(Ii1iIii, il11iIl) {
  try {
    let lillilIl = new IIi1l1i1({
      "appId": Ii1iIii,
      "appid": "signed_wh5",
      "clientVersion": il11iIl?.["clientVersion"],
      "client": il11iIl?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await lillilIl.genAlgo(), body = await lillilIl.genUrlParams(il11iIl.functionId, il11iIl.body), body;
  } catch (I1il1ii1) {}
}
async function IiIlIiIi(Iii1Il1i, III1Illl) {
  let I1I111il = {
      "searchParams": {
        ...III1Illl,
        "appId": Iii1Il1i
      },
      "pt_pin": $.UserName,
      "client": III1Illl?.["client"],
      "clientVersion": III1Illl?.["clientVersion"]
    },
    Ii1IIiI = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    iiIiiIii = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(I1I111il),
      "headers": Ii1IIiI,
      "timeout": 30000
    };
  return new Promise(async iIii11lI => {
    $.post(iiIiiIii, (l111iil, IlllIIli, lIliliIl) => {
      let I1I1Ilil = "";
      try {
        if (l111iil) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          lIliliIl = JSON.parse(lIliliIl);
          console.log(JSON.stringify(lIliliIl));
          if (typeof lIliliIl === "object" && lIliliIl && lIliliIl.body) {
            if (lIliliIl.body) I1I1Ilil = lIliliIl || "";
          } else lIliliIl.code == 400 ? console.log("\n" + lIliliIl.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (lIi1lil) {
        $.logErr(lIi1lil, IlllIIli);
      } finally {
        iIii11lI(iliiiiI(I1I1Ilil));
      }
    });
  });
}
function iliiiiI(iililIll, lIl1iIiI = {}) {
  let IIi11il1 = [],
    i1iIi1Ii = lIl1iIiI.connector || "&",
    lllIi1ll = Object.keys(iililIll);
  if (lIl1iIiI.sort) lllIi1ll = lllIi1ll.sort();
  for (let iIill1l of lllIi1ll) {
    let ll11111 = iililIll[iIill1l];
    if (ll11111 && typeof ll11111 === "object") ll11111 = JSON.stringify(ll11111);
    if (ll11111 && lIl1iIiI.encode) ll11111 = encodeURIComponent(ll11111);
    IIi11il1.push(iIill1l + "=" + ll11111);
  }
  return IIi11il1.join(i1iIi1Ii);
}
function IIii11ii(Iiilli1i, iiiI1IIl = "qwertyuiopasdfghjklzxcvbnm") {
  let ii11ii1l = "";
  for (let lill1i1 = 0; lill1i1 < Iiilli1i; lill1i1++) {
    ii11ii1l += iiiI1IIl[Math.floor(Math.random() * iiiI1IIl.length)];
  }
  return ii11ii1l;
}
function iIillIlI(IIiIi11l) {
  if (typeof IIiIi11l == "string") try {
    return JSON.parse(IIiIi11l);
  } catch (iiliIill) {
    return console.log(iiliIill), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}