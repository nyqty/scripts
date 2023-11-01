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
const $ = new Env('东东农场好友删减奖励')

const lllIl = require("./function/jdCommon"),
  Iliii = require("./function/krgetH5st");
let I1lIIi = [],
  l1i1i = "",
  l1i1l,
  I1iI1l = "",
  illlil = [],
  Iliil = "",
  I1lIIl = "",
  l1ilI1 = {};
let l1l1Ii = true;
let l11iI1 = I1I1i1(2, "1234567890") + "-" + I1I1i1(4, "1234567890") + "-" + I1I1i1(4, "1234567890") + "-" + I1I1i1(5, "1234567890"),
  IliiI = "106.475" + Math.floor(Math.random() * 899 + 100),
  lI111i = "29.503" + Math.floor(Math.random() * 899 + 100);
const illll1 = require("fs");
let IIIIl1 = false,
  liiilI = "./Fruit_ShareCache.json",
  lI111l = illll1.existsSync(liiilI),
  liiii1 = [];
lI111l && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), liiii1 = illll1.readFileSync(liiilI, "utf-8"), liiii1 && (liiii1 = liiii1.toString(), liiii1 = JSON.parse(liiii1)));
let IIiiIl = 0,
  l1ilIl = false;
!(async () => {
  await I1ll1l();
  if (!I1lIIi[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("\n【若多次提示403，务必更换IP运行.....】\n");
  console.log("\n【开始收集您的互助码，用于好友删除与加好友操作】\n");
  for (let liiill = 0; liiill < I1lIIi.length; liiill++) {
    if (I1lIIi[liiill]) {
      l1i1i = I1lIIi[liiill];
      $.UserName = decodeURIComponent(l1i1i.match(/pt_pin=([^; ]+)(?=;?)/) && l1i1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = liiill + 1;
      $.isLogin = true;
      $.nickName = "";
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await l1i1l.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      Iliil = "";
      I1lIIl = "";
      l1ilI1 = {};
      $.UA = lllIl.genUA($.UserName);
      $.retry = 0;
      l1ilIl = false;
      await ll11li();
      l1ilIl && (await $.wait(2000), IIiiIl++);
      IIiiIl == 10 && (console.log("\n【访问接口次数达到10次，休息30秒.....】\n"), await $.wait(30000), IIiiIl = 0);
    }
  }
  if (IIIIl1) {
    var IIiiII = JSON.stringify(liiii1, null, 2);
    illll1.writeFile(liiilI, IIiiII, function (IIIIil) {
      IIIIil ? (console.log(IIIIil), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
    });
  }
  console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  for (let lI1lIl = 0; lI1lIl < I1lIIi.length; lI1lIl++) {
    if (I1lIIi[lI1lIl]) {
      l1i1i = I1lIIi[lI1lIl];
      $.UserName = decodeURIComponent(l1i1i.match(/pt_pin=([^; ]+)(?=;?)/) && l1i1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lI1lIl + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await l1i1l.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      Iliil = "";
      I1lIIl = "";
      l1ilI1 = {};
      $.UA = lllIl.genUA($.UserName);
      $.retry = 0;
      IIiiIl++;
      await IIiiIi();
      IIiiIl == 5 && (console.log("\n【访问接口次数达到5次，休息30秒.....】\n"), await $.wait(30000), IIiiIl = 0);
    }
  }
  $.isNode() && I1iI1l && $.ctrTemp && (await l1i1l.sendNotify("" + $.name, "" + I1iI1l));
})().catch(I1ll11 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + I1ll11 + "!", "");
}).finally(() => {
  $.done();
});
async function IIiiIi() {
  I1lIIl = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await i1I1I();
    await l1ilIi();
    if ($.farmInfo?.["farmUserPro"]) {
      Iliil = "删除好友与接受好友邀请已完成";
    } else {
      if ($.farmInfo?.["code"] == 3) {
        console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");
      } else {
        if ($.farmInfo?.["code"] == 6) {
          console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");
        } else {
          if ($.farmInfo?.["code"] == 2) {
            console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]);
          } else {
            console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
          }
        }
      }
      if ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) {
        await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
      }
    }
  } catch (liliil) {
    $.logErr(liliil);
  }
}
async function l1ilIi() {
  await llIii();
  if ($.friendList) {
    console.log("\n今日已邀请好友" + $.friendList?.["inviteFriendCount"] + "个 / 每日邀请上限" + $.friendList?.["inviteFriendMax"] + "个");
    console.log("开始删除" + ($.friendList?.["friends"] && $.friendList?.["friends"]["length"]) + "个好友,可拿每天的邀请奖励");
    if ($.friendList?.["friends"] && $.friendList?.["friends"]["length"] > 0) {
      for (let lI1iii of $.friendList?.["friends"]) {
        console.log("\n开始删除好友 [" + lI1iii?.["shareCode"] + "]");
        const i11lIi = await I1ll1i("deleteFriendForFarm", {
          shareCode: "" + lI1iii?.["shareCode"],
          version: 8,
          channel: 1
        });
        i11lIi && i11lIi?.["code"] === "0" && console.log("删除好友 [" + lI1iii?.["shareCode"] + "] 成功\n");
      }
    }
    await l11iIi();
    $.friendList?.["inviteFriendCount"] > 0 ? $.friendList?.["inviteFriendCount"] > $.friendList?.["inviteFriendGotAwardCount"] && (console.log("开始领取邀请好友的奖励"), await IIiiI1(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes))) : console.log("今日未邀请过好友");
  } else {
    console.log("查询好友列表失败\n");
  }
}
async function l11iIi() {
  for (let ll1li1 of illlil) {
    if (ll1li1 === $.farmInfo.farmUserPro?.["shareCode"]) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }
    await illliI(ll1li1);
    if ($.inviteFriendRes && $.inviteFriendRes?.["helpResult"] && $.inviteFriendRes?.["helpResult"]?.["code"] === "0") {
      console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "的好友");
    } else {
      $.inviteFriendRes && $.inviteFriendRes?.["helpResult"] && $.inviteFriendRes?.["helpResult"]?.["code"] === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
    }
  }
}
async function ll11li() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var I1iii1 = false,
      lilii1 = "";
    if (liiii1) {
      for (let IIlii1 = 0; IIlii1 < liiii1.length; IIlii1++) {
        liiii1[IIlii1].pt_pin == $.UserName && (I1iii1 = true, lilii1 = liiii1[IIlii1].ShareCode);
      }
    }
    if (!I1iii1) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      l1ilIl = true;
      await i1I1I();
      if ($.farmInfo?.["farmUserPro"]) {
        var iIiii1 = {};
        lilii1 = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        iIiii1 = {
          pt_pin: $.UserName,
          ShareCode: lilii1
        };
        liiii1.push(iIiii1);
        IIIIl1 = true;
      }
    }
    lilii1 ? (console.log("\n" + lilii1), illlil.push(lilii1)) : console.log("\n数据异常");
  } catch (Illli1) {
    $.logErr(Illli1);
  }
}
async function iliIlI() {
  $.duckRes = await I1ll1i("totalWaterTaskForFarm", {
    type: 2,
    version: 6,
    channel: 2
  });
}
async function lI111I() {
  $.totalWaterReward = await I1ll1i("totalWaterTaskForFarm");
}
async function IlilI() {
  $.firstWaterReward = await I1ll1i("firstWaterTaskForFarm");
}
async function llIi1() {
  $.waterFriendGotAwardRes = await I1ll1i("waterFriendGotAwardForFarm", {
    version: 4,
    channel: 1
  });
}
async function IliIII() {
  $.myCardInfoRes = await I1ll1i("myCardInfoForFarm", {
    version: 5,
    channel: 1
  });
}
async function II1l(Ii1IIl) {
  $.userMyCardRes = await I1ll1i("userMyCardForFarm", {
    cardType: Ii1IIl
  });
}
async function liiiiI(lililI) {
  $.gotStageAwardForFarmRes = await I1ll1i("gotStageAwardForFarm", {
    type: lililI
  });
}
async function II1i() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await I1ll1i("waterGoodForFarm");
}
async function illli1() {
  $.initForTurntableFarmRes = await I1ll1i("initForTurntableFarm", {
    version: 4,
    channel: 1
  });
}
async function I1lII1() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await I1ll1i("lotteryForTurntableFarm", {
    type: 1,
    version: 4,
    channel: 1
  });
}
async function Ill111() {
  $.timingAwardRes = await I1ll1i("timingAwardForTurntableFarm", {
    version: 4,
    channel: 1
  });
}
async function I1iI11(lIilil, lIl1ll) {
  lIilil === 1 && console.log("浏览爆品会场");
  lIilil === 2 && console.log("天天抽奖浏览任务领取水滴");
  const Ii1III = {
    type: lIilil,
    adId: lIl1ll,
    version: 4,
    channel: 1
  };
  $.browserForTurntableFarmRes = await I1ll1i("browserForTurntableFarm", Ii1III);
}
async function II11(IliIll) {
  const lilill = {
    type: 2,
    adId: IliIll,
    version: 4,
    channel: 1
  };
  $.browserForTurntableFarm2Res = await I1ll1i("browserForTurntableFarm", lilill);
}
async function l1ilII() {
  $.lotteryMasterHelpRes = await I1ll1i("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-3",
    babelChannel: "3",
    version: 4,
    channel: 1
  });
}
async function ii1II1() {
  $.masterGotFinished = await I1ll1i("masterGotFinishedTaskForFarm");
}
async function iliIll() {
  $.masterHelpResult = await I1ll1i("masterHelpTaskInitForFarm");
}
async function llliIl() {
  $.farmAssistResult = await I1ll1i("farmAssistInit", {
    version: 14,
    channel: 1,
    babelChannel: "120"
  });
}
async function iliIli() {
  $.receiveStageEnergy = await I1ll1i("receiveStageEnergy", {
    version: 14,
    channel: 1,
    babelChannel: "120"
  });
}
async function illliI() {
  $.inviteFriendRes = await I1ll1i("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-inviteFriend",
    version: 4,
    channel: 2
  });
}
async function ii1III() {
  $.helpResult = await I1ll1i("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0],
    babelChannel: "3",
    version: 2,
    channel: 1
  });
}
async function i11iIl() {
  const l1lili = {
    type: 1,
    hongBaoTimes: 100,
    version: 3
  };
  $.waterRain = await I1ll1i("waterRainForFarm", l1lili);
}
async function ll11ll() {
  $.clockInInit = await I1ll1i("clockInInitForFarm");
}
async function l11iIl() {
  $.clockInForFarmRes = await I1ll1i("clockInForFarm", {
    type: 1
  });
}
async function i11iIi(iiiI1l, Ili1Ii, Ii1l1I) {
  let iiiI11 = {
    id: iiiI1l,
    type: Ili1Ii,
    step: Ii1l1I
  };
  if (Ili1Ii === "theme") {
    if (Ii1l1I === "1") {
      $.themeStep1 = await I1ll1i("clockInFollowForFarm", iiiI11);
    } else {
      Ii1l1I === "2" && ($.themeStep2 = await I1ll1i("clockInFollowForFarm", iiiI11));
    }
  } else {
    if (Ili1Ii === "venderCoupon") {
      if (Ii1l1I === "1") {
        $.venderCouponStep1 = await I1ll1i("clockInFollowForFarm", iiiI11);
      } else {
        if (Ii1l1I === "2") {
          $.venderCouponStep2 = await I1ll1i("clockInFollowForFarm", iiiI11);
        }
      }
    }
  }
}
async function IIIIll() {
  $.gotClockInGiftRes = await I1ll1i("gotClockInGift", {
    type: 2
  });
}
async function liiiii() {
  $.threeMeal = await I1ll1i("gotThreeMealForFarm");
}
async function II1I(IIlI1I, llIIIi) {
  if (llIIIi === 0) {
    $.browseResult = await I1ll1i("browseAdTaskForFarm", {
      advertId: IIlI1I,
      type: llIIIi
    });
  } else {
    llIIIi === 1 && ($.browseRwardResult = await I1ll1i("browseAdTaskForFarm", {
      advertId: IIlI1I,
      type: llIIIi
    }));
  }
}
async function lI1111(IiIiII) {
  const l1Il1 = {
    type: IiIiII,
    babelChannel: "45",
    line: "getBean",
    version: 18,
    channel: 1
  };
  if (IiIiII === 1) {
    $.treasureResult = await I1ll1i("ddnc_getTreasureBoxAward", l1Il1);
  } else {
    IiIiII === 2 && ($.treasureRwardResult = await I1ll1i("ddnc_getTreasureBoxAward", l1Il1));
  }
}
async function Ilil1() {
  $.goalResult = await I1ll1i("gotWaterGoalTaskForFarm", {
    type: 3
  });
}
async function IliII1() {
  $.signResult = await I1ll1i("signForFarm");
}
async function l1iIi1() {
  const l1iiIl = {
    babelChannel: "10",
    version: 24,
    lat: lI111i,
    lng: IliiI
  };
  $.gotNewUserTaskForFarmResult = await I1ll1i("gotNewUserTaskForFarm", l1iiIl);
}
async function i1I1I() {
  $.farmInfo = await I1ll1i("initForFarm", {
    babelChannel: "522",
    sid: "",
    un_area: l11iI1,
    version: 25,
    channel: 1,
    lat: lI111i,
    lng: IliiI
  });
}
async function llIil() {
  console.log("\n初始化任务列表");
  $.farmTask = await I1ll1i("taskInitForFarm", {
    version: 18,
    channel: 1,
    babelChannel: "121"
  });
}
async function llIii() {
  $.friendList = await I1ll1i("friendListInitForFarm", {
    version: 18,
    channel: 1,
    babelChannel: "45"
  });
}
async function IIiiI1() {
  $.awardInviteFriendRes = await I1ll1i("awardInviteFriendForFarm");
}
async function IIIIi1(iIlI1l) {
  const l1IIii = {
    shareCode: iIlI1l,
    version: 18,
    channel: 1,
    babelChannel: "121"
  };
  $.waterFriendForFarmRes = await I1ll1i("waterFriendForFarm", l1IIii);
}
async function ii1IIl() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
    $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
  } else {
    $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + l1l1Ii === "false";
  }
  $.ctrTemp ? ($.msg($.name, I1lIIl, Iliil, l1ilI1), $.isNode() && (I1iI1l += I1lIIl + "\n" + Iliil + ($.index !== I1lIIi.length ? "" : ""))) : $.log("" + Iliil);
}
function ii1IIi(I1I1Ii) {
  let IIIl;
  if (I1I1Ii) {
    IIIl = new Date(I1I1Ii);
  } else {
    IIIl = new Date();
  }
  return IIIl.getFullYear() + "-" + (IIIl.getMonth() + 1 >= 10 ? IIIl.getMonth() + 1 : "0" + (IIIl.getMonth() + 1)) + "-" + (IIIl.getDate() >= 10 ? IIIl.getDate() : "0" + IIIl.getDate());
}
function I1ll1l() {
  return new Promise(Illil => {
    console.log("开始获取配置文件\n");
    l1i1l = $.isNode() ? require("./sendNotify") : "";
    const iil11i = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(iil11i).forEach(llIili => {
        iil11i[llIili] && I1lIIi.push(iil11i[llIili]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => {};
      }
    } else {
      I1lIIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1I1l($.getdata("CookiesJD") || "[]").map(Illii => Illii.cookie)].filter(iIlI11 => !!iIlI11);
    }
    console.log("共" + I1lIIi.length + "个京东账号\n");
    $.shareCodesArr = [];
    Illil();
  });
}
function I1ll1i(l1IIlI, iil111 = {}, llIil1 = 1000) {
  return new Promise(illilI => {
    setTimeout(async () => {
      $.post(await i1I11(l1IIlI, iil111), (IlliI, I1I1I1, IIIlil) => {
        try {
          IlliI ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(IlliI)), console.log("functionId:" + l1IIlI), $.logErr(IlliI)) : i11iII(IIIlil) && (IIIlil = JSON.parse(IIIlil));
        } catch (llII1I) {
          $.logErr(llII1I, I1I1I1);
        } finally {
          illilI(IIIlil);
        }
      });
    }, llIil1);
  });
}
function i11iII(iillI1) {
  if (!iillI1) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(iillI1) == "object") {
      return true;
    }
  } catch (iiil1I) {
    console.log(iiil1I);
    return false;
  }
}
const lI1Ii1 = {
  initForFarm: "8a2af",
  taskInitForFarm: "fcb5a",
  browseAdTaskForFarm: "53f09",
  firstWaterTaskForFarm: "0cf1e",
  waterFriendGotAwardForFarm: "d08ff",
  ddnc_getTreasureBoxAward: "67dfc",
  totalWaterTaskForFarm: "102f5",
  gotThreeMealForFarm: "57b30",
  waterGoodForFarm: "0c010",
  choiceGoodsForFarm: "5f4ca",
  gotCouponForFarm: "b1515",
  gotStageAwardForFarm: "81591",
  followVenderForBrand: "71547",
  gotWaterGoalTaskForFarm: "c901b",
  gotNewUserTaskForFarm: "de8f8",
  orderTaskGotWaterForFarm: "eed5c",
  clockInForFarm: "32b94",
  clockInFollowForFarm: "4a0b4",
  waterFriendForFarm: "673a0",
  awardFirstFriendForFarm: "9b655",
  awardInviteFriendForFarm: "2b5ca",
  awardCallOrInviteFriendForFarm: "b0b03",
  userMyCardForFarm: "86ba5",
  getCallUserCardForFarm: "2ca57",
  deleteFriendForFarm: "eaf91",
  gotLowFreqWaterForFarm: "8172b",
  getFullCollectionReward: "5c767",
  getOrderPayLotteryWater: "ef089",
  receiveStageEnergy: "15507",
  exchangeGood: "52963",
  farmAssistInit: "92354",
  myCardInfoForFarm: "157b6",
  gotPopFirstPurchaseTaskForFarm: "d432f",
  limitWaterInitForFarm: "6bdc2",
  ddnc_surpriseModal: "e81c1",
  friendInitForFarm: "a5a9c",
  clockInInitForFarm: "08dc3",
  guideTaskAward: "59bc4",
  signForFarm: "32b94",
  gotNewUserTaskForFarm: "de8f8"
};
async function i1I11(llII11, lIiI1 = {}) {
  let llII1l = "";
  const iil11l = lI1Ii1[llII11];
  if (!iil11l) {
    llII1l = "https://api.m.jd.com/client.action?functionId=" + llII11 + "&body=" + encodeURIComponent(JSON.stringify(lIiI1)) + "&appid=wh5";
  } else {
    const ilI1Ii = await Iliii.getH5st({
      appId: iil11l,
      appid: "signed_wh5",
      body: lIiI1,
      client: "iOS",
      clientVersion: "12.2.0",
      functionId: llII11,
      cookie: l1i1i,
      ua: $.UA,
      version: "4.2",
      t: true
    });
    llII1l = "https://api.m.jd.com/client.action?" + ilI1Ii.params;
  }
  return {
    url: llII1l,
    headers: {
      Host: "api.m.jd.com",
      Accept: "*/*",
      Origin: "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      Referer: "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      Cookie: l1i1i
    },
    timeout: 30000
  };
}
function I1I1i1(ilI1Il, illI11 = "qwertyuiopasdfghjklzxcvbnm") {
  let ll11Il = "";
  for (let ii1i1I = 0; ii1i1I < ilI1Il; ii1i1I++) {
    ll11Il += illI11[Math.floor(Math.random() * illI11.length)];
  }
  return ll11Il;
}
function i1I1l(iillIl) {
  if (typeof iillIl == "string") {
    try {
      return JSON.parse(iillIl);
    } catch (l1lii1) {
      console.log(l1lii1);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
