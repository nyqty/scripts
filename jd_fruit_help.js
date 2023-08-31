/*
东东水果:脚本更新地址 jd_fruit_help.js
更新时间：2021-5-18
活动入口：京东APP我的-更多工具-东东农场
==========================Quantumultx=========================
[task_local]
#东东农场内部互助
20 4,16 * * * jd_fruit_help.js, tag=东东农场内部互助, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true
=========================Loon=============================
[Script]
cron "20 4,16 * * *" script-path=jd_fruit_help.js,tag=东东农场内部互助

=========================Surge============================
东东农场内部互助 = type=cron,cronexp="20 4,16 * * *",wake-system=1,timeout=3600,script-path=jd_fruit_help.js

=========================小火箭===========================
东东农场内部互助 = type=cron,script-path=jd_fruit_help.js, cronexpr="20 4,16 * * *", timeout=3600, enable=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('东东农场内部水滴互助');
let cookiesArr = [],
    cookie = '',
    jdFruitShareArr = [],
    isBox = false,
    notify,
    allMessage = '';
let shareCodes = [ // 这个列表填入你要助力的好友的shareCode
    //     //账号一的好友shareCode,不同好友的shareCode中间用@符号隔开
    //     '5853550f71014282912b76d95beb84c0@b58ddba3317b44ceb0ac86ea8952998c@8d724eb95e3847b6a1526587d1836f27@a80b7d1db41a4381b742232da9d22443@ce107b8f64d24f62a92292180f764018@c73ea563a77d4464b273503d3838fec1@0dd9a7fd1feb449fb1bf854a3ec0e801',
    //     //账号二的好友shareCode,不同好友的shareCode中间用@符号隔开
    //     '5853550f71014282912b76d95beb84c0@b58ddba3317b44ceb0ac86ea8952998c@8d724eb95e3847b6a1526587d1836f27@a80b7d1db41a4381b742232da9d22443@ce107b8f64d24f62a92292180f764018@c73ea563a77d4464b273503d3838fec1@0dd9a7fd1feb449fb1bf854a3ec0e801',
]
let newShareCodes=[];
let iIIlIiii = "",
  iiI1l1II = "",
  lIi1il1 = {};
let iii1Iii1 = true;
const IilIl1li = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
  illiii1l = require("./function/jdCommon"),
  i11l1lii = require("./utils/h5st.js");
let liIIiiii = llIIil(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  ii11IIi1 = llIIil(2, "1234567890") + "-" + llIIil(4, "1234567890") + "-" + llIIil(4, "1234567890") + "-" + llIIil(5, "1234567890"),
  i1IiIl1 = "106.475" + Math.floor(Math.random() * 899 + 100),
  iI1lilll = "29.503" + Math.floor(Math.random() * 899 + 100),
  I11li11I = true;
const l1liilIl = require("fs");
let l1ill1Ii = false,
  IIlIiI1I = "./Fruit_ShareCache.json",
  Il1Illl1 = l1liilIl.existsSync(IIlIiI1I),
  ilIII11l = [];
Il1Illl1 && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), ilIII11l = l1liilIl.readFileSync(IIlIiI1I, "utf-8"), ilIII11l && (ilIII11l = ilIII11l.toString(), ilIII11l = JSON.parse(ilIII11l)));
let IIiliIii = 0,
  i1I1iiii = false,
  liiIlIIi = [];
!(async () => {
  await Ill1llil();
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("\n【若多次提示403，务必更换IP运行.....】\n");
  if (I11li11I) {
    console.log("\n【开始收集您的互助码，用于账号内部互助，请稍等...】\n");
    for (let illilIII = 0; illilIII < cookiesArr.length; illilIII++) {
      if (cookiesArr[illilIII]) {
        cookie = cookiesArr[illilIII];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = illilIII + 1;
        $.isLogin = true;
        $.nickName = "";
        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
          continue;
        }
        iIIlIiii = "";
        iiI1l1II = "";
        lIi1il1 = {};
        $.UA = illiii1l.genUA($.UserName);
        $.retry = 0;
        i1I1iiii = false;
        await i1I1iI1I();
        i1I1iiii && (await $.wait(5000), IIiliIii++);
        IIiliIii == 10 && (console.log("\n【访问接口次数达到10次，休息一分钟.....】\n"), await $.wait(60 * 1000), IIiliIii = 0);
      }
    }
    if (l1ill1Ii) {
      var ii1111li = JSON.stringify(ilIII11l, null, 2);
      l1liilIl.writeFile(IIlIiI1I, ii1111li, function (lli1lliI) {
        lli1lliI ? (console.log(lli1lliI), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
      });
    }
  }
  console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  for (let I111111l = 0; I111111l < cookiesArr.length; I111111l++) {
    if (cookiesArr[I111111l]) {
      cookie = cookiesArr[I111111l];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I111111l + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      iIIlIiii = "";
      iiI1l1II = "";
      lIi1il1 = {};
      $.UA = illiii1l.genUA($.UserName);
      $.retry = 0;
      IIiliIii++;
      await l1iI11I1();
      IIiliIii == 5 && (console.log("\n【访问接口次数达到5次，休息一分钟.....】\n"), await $.wait(60 * 1000), IIiliIii = 0);
    }
  }
  $.isNode() && allMessage && $.ctrTemp && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(illill => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + illill + "!", "");
}).finally(() => {
  $.done();
});
async function l1iI11I1() {
  iiI1l1II = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await iliilIi();
    if ($.farmInfo?.["farmUserPro"]) {
      console.log("\n【已成功兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n");
      await l11lllii();
      await lliliIii();
      if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
        lIi1il1["open-url"] = IilIl1li;
        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) console.log("\n当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）\n");else {
          if ($.farmInfo?.["treeState"] === 0) {
            lIi1il1["open-url"] = IilIl1li;
            return;
          }
        }
      }
    } else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 10000, 10)));
      $.retry < 2 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await l1iI11I1());
    }
  } catch (IlIlI11l) {
    $.logErr(IlIlI11l);
  }
}
async function lliliIii() {
  await IliIlIii();
  if ($.initForTurntableFarmRes?.["code"] === "0") {
    let {
      timingIntervalHours: iiill11I,
      timingLastSysTime: lI1iliI1,
      sysTime: IliiIIlI,
      remainLotteryTimes: IIIIIllI,
      turntableInfos: lIl11lIl
    } = $.initForTurntableFarmRes;
    console.log("开始天天抽奖--好友助力--每人每天只有三次助力机会.");
    for (let lii1I1ll of newShareCodes) {
      if (lii1I1ll === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
        console.log("天天抽奖-不能自己给自己助力\n");
        continue;
      }
      await l11IIlI1(lii1I1ll);
      if ($.lotteryMasterHelpRes?.["helpResult"]) {
        if ($.lotteryMasterHelpRes?.["helpResult"]?.["code"] === "0") console.log("天天抽奖-助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "成功\n");else {
          if ($.lotteryMasterHelpRes?.["helpResult"]?.["code"] === "11") console.log("天天抽奖-不要重复助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "\n");else {
            if ($.lotteryMasterHelpRes.helpResult.code === "13") {
              console.log("天天抽奖-助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "失败,助力次数耗尽\n");
              break;
            }
          }
        }
      }
    }
    console.log("天天抽奖次数共-" + IIIIIllI + "次");
    if (IIIIIllI > 0) {
      console.log("开始抽奖");
      let Il1ilIIi = "";
      for (let iIlillII = 0; iIlillII < new Array(IIIIIllI).fill("").length; iIlillII++) {
        await iii1Il1();
        console.log("第" + (iIlillII + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));
        if ($.lotteryRes.code === "0") {
          lIl11lIl.map(iIi1liI => {
            if (iIi1liI.type === $.lotteryRes.type) {
              console.log("lotteryRes.type" + $.lotteryRes?.["type"]);
              if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") Il1ilIIi += iIi1liI.name + "个，";else $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? Il1ilIIi += iIi1liI.name + "，" : Il1ilIIi += iIi1liI.name + "，";
            }
          });
          if ($.lotteryRes?.["remainLotteryTimes"] === 0) break;
        }
      }
      Il1ilIIi && console.log("【天天抽奖】" + Il1ilIIi.substr(0, Il1ilIIi.length - 1) + "\n");
    } else console.log("抽奖完成没有次数啦~");
  } else console.log("初始化天天抽奖得好礼失败");
}
async function l11lllii() {
  await $.wait(2000);
  await iliilIi();
  let iII1i1iI = 0,
    i1l11I = 3,
    i1l1liII = "";
  if (I11li11I) {
    console.log("开始助力好友");
    for (let l11ili1l of newShareCodes) {
      if (liiIlIIi) {
        var l1I1iil = false;
        for (let l1ilil1 of liiIlIIi) {
          if (l11ili1l == l1ilil1) {
            l1I1iil = true;
            break;
          }
        }
        if (l1I1iil) {
          console.log(l11ili1l + "助力已满，跳过...");
          continue;
        }
      }
      console.log($.UserName + "开始助力: " + l11ili1l);
      if (!l11ili1l) continue;
      if (!$.farmInfo?.["farmUserPro"]) {
        console.log("未种植,跳过助力\n");
        continue;
      }
      if (l11ili1l === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
        console.log("不能为自己助力哦，跳过自己的shareCode\n");
        continue;
      }
      await lll1li1I(l11ili1l);
      if ($.helpResult?.["code"] === "0") {
        if ($.helpResult?.["helpResult"]?.["code"] === "0") iII1i1iI += $.helpResult?.["helpResult"]?.["salveHelpAddWater"], console.log("【助力好友结果】: 已成功给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力"), console.log("给好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力获得" + $.helpResult?.["helpResult"]?.["salveHelpAddWater"] + "g水滴"), i1l1liII += ($.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] || "匿名用户") + ",";else {
          if ($.helpResult?.["helpResult"]?.["code"] === "8") console.log("【助力好友结果】: 助力【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】失败，您今天助力次数已耗尽");else {
            if ($.helpResult?.["helpResult"]?.["code"] === "9") console.log("【助力好友结果】: 之前给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力过了");else $.helpResult?.["helpResult"]?.["code"] === "10" ? (liiIlIIi.push(l11ili1l), console.log("【助力好友结果】: 好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力已满")) : console.log("助力其他情况：" + JSON.stringify($.helpResult?.["helpResult"]));
          }
        }
        console.log("【今日助力次数还剩】" + $.helpResult?.["helpResult"]?.["remainTimes"] + "次\n");
        i1l11I = $.helpResult?.["helpResult"]?.["remainTimes"];
        if ($.helpResult?.["helpResult"]?.["remainTimes"] === 0) {
          console.log("您当前助力次数已耗尽，跳出助力");
          break;
        }
      } else {
        if ($.helpResult?.["code"] == 3) console.log("助力失败: " + $.helpResult?.["code"] + ",未登录");else {
          if ($.helpResult?.["code"] == 6) console.log("助力失败: " + $.helpResult?.["code"] + ",活动太火爆");else $.helpResult?.["code"] == 2 ? console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["echo"]) : console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["message"]);
        }
        ($.helpResult?.["code"] == 402 || $.helpResult?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
      }
    }
  }
  if ($.isLoon() || $.isQuanX() || $.isSurge()) {
    let lilii11l = l1I1ll1l() + $.farmInfo?.["farmUserPro"]?.["shareCode"];
    !$.getdata(lilii11l) && ($.setdata("", l1I1ll1l(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo?.["farmUserPro"]?.["shareCode"]), $.setdata("", lilii11l));
    i1l1liII && ($.getdata(lilii11l) ? $.setdata($.getdata(lilii11l) + "," + i1l1liII, lilii11l) : $.setdata(i1l1liII, lilii11l));
    i1l1liII = $.getdata(lilii11l);
  }
  if (i1l1liII && i1l1liII.length > 0) {}
  iII1i1iI > 0 && console.log("【助力好友👬】获得" + iII1i1iI + "g💧\n");
  console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}
async function i1I1iI1I() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var l111IIii = false,
      Ii1i11li = "";
    if (ilIII11l) for (let iIiI1iI = 0; iIiI1iI < ilIII11l.length; iIiI1iI++) {
      ilIII11l[iIiI1iI].pt_pin == $.UserName && (l111IIii = true, Ii1i11li = ilIII11l[iIiI1iI].ShareCode);
    }
    if (!l111IIii) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      i1I1iiii = true;
      await iliilIi();
      if ($.farmInfo?.["farmUserPro"]) {
        var i11111il = {};
        Ii1i11li = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        i11111il = {
          "pt_pin": $.UserName,
          "ShareCode": Ii1i11li
        };
        ilIII11l.push(i11111il);
        l1ill1Ii = true;
      }
    }
    Ii1i11li ? (console.log("\n" + Ii1i11li), newShareCodes.push(Ii1i11li)) : console.log("\n数据异常");
  } catch (i11l1Il1) {
    $.logErr(i11l1Il1);
  }
}
async function IiIlI1II() {
  return new Promise(Illll1ii => {
    const lll1I = {
      "type": 2,
      "version": 6,
      "channel": 2
    };
    $.post(IiIlllIi("getFullCollectionReward", lll1I), (iIl11Ii, I11l1i11, iIl1Il1i) => {
      try {
        iIl11Ii ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(iIl11Ii)), $.logErr(iIl11Ii)) : ilI11IIl(iIl1Il1i) && ($.duckRes = JSON.parse(iIl1Il1i));
      } catch (IlllI1i) {
        $.logErr(IlllI1i, I11l1i11);
      } finally {
        Illll1ii();
      }
    });
  });
}
async function l11li11() {
  $.totalWaterReward = await Ii11iIIl("totalWaterTaskForFarm");
}
async function lI1iiIil() {
  $.firstWaterReward = await Ii11iIIl("firstWaterTaskForFarm");
}
async function iIiiIIIl() {
  $.waterFriendGotAwardRes = await Ii11iIIl("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}
async function IlI1Iiii() {
  $.myCardInfoRes = await Ii11iIIl("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}
async function llIiIIll(l1l1ii1) {
  $.userMyCardRes = await Ii11iIIl("userMyCardForFarm", {
    "cardType": l1l1ii1
  });
}
async function llIIllI(Iilii1I) {
  $.gotStageAwardForFarmRes = await Ii11iIIl("gotStageAwardForFarm", {
    "type": Iilii1I
  });
}
async function iiIli1II() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await Ii11iIIl("waterGoodForFarm");
}
async function IliIlIii() {
  $.initForTurntableFarmRes = await Ii11iIIl("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function iii1Il1() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await Ii11iIIl("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}
async function iiiIII() {
  $.timingAwardRes = await Ii11iIIl("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function IIIiillI(liill1i1, II1111lI) {
  liill1i1 === 1 && console.log("浏览爆品会场");
  liill1i1 === 2 && console.log("天天抽奖浏览任务领取水滴");
  const li1l11I = {
    "type": liill1i1,
    "adId": II1111lI,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await Ii11iIIl("browserForTurntableFarm", li1l11I);
}
async function iIliI1I(iII1lil) {
  const iI1i1lll = {
    "type": 2,
    "adId": iII1lil,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await Ii11iIIl("browserForTurntableFarm", iI1i1lll);
}
async function l11IIlI1() {
  $.lotteryMasterHelpRes = await Ii11iIIl("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}
async function l11Il1ii() {
  $.masterGotFinished = await Ii11iIIl("masterGotFinishedTaskForFarm");
}
async function iIi1l1ll() {
  $.masterHelpResult = await Ii11iIIl("masterHelpTaskInitForFarm");
}
async function Ii1IilIi() {
  $.farmAssistResult = await Ii11iIIl("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function lli1lI1() {
  $.receiveStageEnergy = await Ii11iIIl("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function iili11I1() {
  $.inviteFriendRes = await Ii11iIIl("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function lll1li1I() {
  $.helpResult = await Ii11iIIl("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function iliiiII() {
  const lI1li11 = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await Ii11iIIl("waterRainForFarm", lI1li11);
}
async function iiiIil1l() {
  $.clockInInit = await Ii11iIIl("clockInInitForFarm");
}
async function llIliIl1() {
  $.clockInForFarmRes = await Ii11iIIl("clockInForFarm", {
    "type": 1
  });
}
async function I11lilii(I11111Ii, I1I1lI1l, iiIIIIIi) {
  let i1i1i1 = {
    "id": I11111Ii,
    "type": I1I1lI1l,
    "step": iiIIIIIi
  };
  if (I1I1lI1l === "theme") {
    if (iiIIIIIi === "1") $.themeStep1 = await Ii11iIIl("clockInFollowForFarm", i1i1i1);else iiIIIIIi === "2" && ($.themeStep2 = await Ii11iIIl("clockInFollowForFarm", i1i1i1));
  } else {
    if (I1I1lI1l === "venderCoupon") {
      if (iiIIIIIi === "1") {
        $.venderCouponStep1 = await Ii11iIIl("clockInFollowForFarm", i1i1i1);
      } else iiIIIIIi === "2" && ($.venderCouponStep2 = await Ii11iIIl("clockInFollowForFarm", i1i1i1));
    }
  }
}
async function i1llIIlI() {
  $.gotClockInGiftRes = await Ii11iIIl("gotClockInGift", {
    "type": 2
  });
}
async function Ilil11Il() {
  $.threeMeal = await Ii11iIIl("gotThreeMealForFarm");
}
async function Il1I1lil(illl1lI, liiIlII1) {
  if (liiIlII1 === 0) $.browseResult = await Ii11iIIl("browseAdTaskForFarm", {
    "advertId": illl1lI,
    "type": liiIlII1
  });else liiIlII1 === 1 && ($.browseRwardResult = await Ii11iIIl("browseAdTaskForFarm", {
    "advertId": illl1lI,
    "type": liiIlII1
  }));
}
async function II1iiii() {
  $.goalResult = await Ii11iIIl("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function l1i1lIii() {
  $.signResult = await Ii11iIIl("signForFarm");
}
async function iliilIi() {
  $.farmInfo = await Ii11iIIl("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": liIIiiii,
    "un_area": ii11IIi1,
    "version": 22,
    "lat": iI1lilll,
    "lng": i1IiIl1,
    "channel": 1
  });
}
async function liiiilII() {
  console.log("\n初始化任务列表");
  $.farmTask = await Ii11iIIl("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function ilII11ll() {
  $.friendList = await Ii11iIIl("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}
async function I1IlilIi() {
  $.awardInviteFriendRes = await Ii11iIIl("awardInviteFriendForFarm");
}
async function lIIiI11l(i1lI11lI) {
  const il1IiIlI = {
    "shareCode": i1lI11lI,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await Ii11iIIl("waterFriendForFarm", il1IiIlI);
}
async function IliiiIIi() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
    $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
  } else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + iii1Iii1 === "false";
  $.ctrTemp ? ($.msg($.name, iiI1l1II, iIIlIiii, lIi1il1), $.isNode() && (allMessage += iiI1l1II + "\n" + iIIlIiii + ($.index !== cookiesArr.length ? "\n\n" : ""))) : $.log("\n" + iIIlIiii + "\n");
}
function l1I1ll1l(II1ll1i1) {
  let IiIII1I;
  return II1ll1i1 ? IiIII1I = new Date(II1ll1i1) : IiIII1I = new Date(), IiIII1I.getFullYear() + "-" + (IiIII1I.getMonth() + 1 >= 10 ? IiIII1I.getMonth() + 1 : "0" + (IiIII1I.getMonth() + 1)) + "-" + (IiIII1I.getDate() >= 10 ? IiIII1I.getDate() : "0" + IiIII1I.getDate());
}
function Ill1llil() {
  return new Promise(II1I11I1 => {
    console.log("开始获取配置文件\n");
    notify = $.isNode() ? require("./sendNotify") : "";
    const il1iIlI = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(il1iIlI).forEach(l1IlIllI => {
        if (il1iIlI[l1IlIllI]) {
          cookiesArr.push(il1iIlI[l1IlIllI]);
        }
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else {
      cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1ill11l($.getdata("CookiesJD") || "[]").map(iIiii1li => iIiii1li.cookie)].filter(IiII1Ii => !!IiII1Ii);
    }
    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    II1I11I1();
  });
}
function Ii11iIIl(liiIilil, l1llli1 = {}, il111lI1 = 4000) {
  return new Promise(lIlliII => {
    setTimeout(async () => {
      $.post(await IiIlllIi(liiIilil, l1llli1), (il111iI1, IIIli11l, IiIliIli) => {
        try {
          il111iI1 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(il111iI1)), console.log("function_id:" + liiIilil), $.logErr(il111iI1)) : ilI11IIl(IiIliIli) && (IiIliIli = JSON.parse(IiIliIli));
        } catch (I111i) {
          $.logErr(I111i, IIIli11l);
        } finally {
          lIlliII(IiIliIli);
        }
      });
    }, il111lI1);
  });
}
function ilI11IIl(lII1Iii) {
  if (!lII1Iii) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(lII1Iii) == "object") {
      return true;
    }
  } catch (I1liilil) {
    return console.log(I1liilil), false;
  }
}
const lIiiIl1I = {
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
  "guideTaskAward": "59bc4"
};
async function IiIlllIi(lIliiill, iii1l1iI = {}) {
  let l1I1IlIi = "";
  if (!lIiiIl1I[lIliiill]) l1I1IlIi = "https://api.m.jd.com/client.action?functionId=" + lIliiill + "&body=" + encodeURIComponent(JSON.stringify(iii1l1iI)) + "&appid=wh5", console.log(l1I1IlIi);else {
    const Ii1I1IIi = {
        "appid": "signed_wh5",
        "client": "iOS",
        "clientVersion": "10.1.0",
        "functionId": lIliiill,
        "body": iii1l1iI
      },
      Il1i1i = await IiiIIl1l(lIiiIl1I[lIliiill], Ii1I1IIi);
    l1I1IlIi = "https://api.m.jd.com/client.action?" + Il1i1i;
  }
  return {
    "url": l1I1IlIi,
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
async function IiiIIl1l(iilI1Ill, i1111IIl) {
  try {
    let ii1ili1I = new i11l1lii({
      "appId": iilI1Ill,
      "appid": "signed_wh5",
      "clientVersion": i1111IIl?.["clientVersion"],
      "client": i1111IIl?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await ii1ili1I.genAlgo(), body = await ii1ili1I.genUrlParams(i1111IIl.functionId, i1111IIl.body), body;
  } catch (I1lilil1) {}
}
async function I11l1Ill(Ii11iill, IiiIl1i1) {
  let i1li11 = {
      "searchParams": {
        ...IiiIl1i1,
        "appId": Ii11iill
      },
      "pt_pin": $.UserName,
      "client": IiiIl1i1?.["client"],
      "clientVersion": IiiIl1i1?.["clientVersion"]
    },
    iIi1l1Ii = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    iiIi = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(i1li11),
      "headers": iIi1l1Ii,
      "timeout": 30000
    };
  return new Promise(async IIII11lI => {
    $.post(iiIi, (III1I, lll1Il1, IIllIlII) => {
      let lII11ilI = "";
      try {
        if (III1I) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          IIllIlII = JSON.parse(IIllIlII);
          console.log(JSON.stringify(IIllIlII));
          if (typeof IIllIlII === "object" && IIllIlII && IIllIlII.body) {
            if (IIllIlII.body) lII11ilI = IIllIlII || "";
          } else IIllIlII.code == 400 ? console.log("\n" + IIllIlII.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (iIIli1li) {
        $.logErr(iIIli1li, lll1Il1);
      } finally {
        IIII11lI(lilIi1iI(lII11ilI));
      }
    });
  });
}
function lilIi1iI(llIlliiI, il1111il = {}) {
  let I11111il = [],
    iI1iiIl = il1111il.connector || "&",
    I1l1iI = Object.keys(llIlliiI);
  if (il1111il.sort) I1l1iI = I1l1iI.sort();
  for (let Il1lIll of I1l1iI) {
    let IIIIiii = llIlliiI[Il1lIll];
    if (IIIIiii && typeof IIIIiii === "object") IIIIiii = JSON.stringify(IIIIiii);
    if (IIIIiii && il1111il.encode) IIIIiii = encodeURIComponent(IIIIiii);
    I11111il.push(Il1lIll + "=" + IIIIiii);
  }
  return I11111il.join(iI1iiIl);
}
function llIIil(liiIliI, iliII1Ii = "qwertyuiopasdfghjklzxcvbnm") {
  let iiI11I = "";
  for (let Il1lli1I = 0; Il1lli1I < liiIliI; Il1lli1I++) {
    iiI11I += iliII1Ii[Math.floor(Math.random() * iliII1Ii.length)];
  }
  return iiI11I;
}
function i1ill11l(Illlliil) {
  if (typeof Illlliil == "string") try {
    return JSON.parse(Illlliil);
  } catch (ili1iliI) {
    return console.log(ili1iliI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}