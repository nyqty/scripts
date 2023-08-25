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
let i11iI = "",
  lIiII = "",
  l1lii1 = {};
let ii1i1l = true;
const ilI1I1 = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
  liIlIl = require("./function/jdCommon"),
  I1lI1l = require("./utils/h5st.js");
let Il1i = i11IlI(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  lIiIl = i11IlI(2, "1234567890") + "-" + i11IlI(4, "1234567890") + "-" + i11IlI(4, "1234567890") + "-" + i11IlI(5, "1234567890"),
  iiil1l = "106.475" + Math.floor(Math.random() * 899 + 100),
  Il1l = "29.503" + Math.floor(Math.random() * 899 + 100),
  iiil1i = true;
const ilIIli = require("fs");
let ilIIll = false,
  iIliil = "./Fruit_ShareCache.json",
  IIiill = ilIIli.existsSync(iIliil),
  liIIii = [];
IIiill && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), liIIii = ilIIli.readFileSync(iIliil, "utf-8"), liIIii && (liIIii = liIIii.toString(), liIIii = JSON.parse(liIIii)));
let Iii1lI = 0,
  I1liii = false,
  liiiIi = [];
!(async () => {
  await ii11();
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("\n【若多次提示403，务必更换IP运行.....】\n");
  if (iiil1i) {
    console.log("\n【开始收集您的互助码，用于账号内部互助，请稍等...】\n");
    for (let l1iiI1 = 0; l1iiI1 < cookiesArr.length; l1iiI1++) {
      if (cookiesArr[l1iiI1]) {
        cookie = cookiesArr[l1iiI1];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = l1iiI1 + 1;
        $.isLogin = true;
        $.nickName = "";
        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          if ($.isNode()) {
            await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
          }
          continue;
        }
        i11iI = "";
        lIiII = "";
        l1lii1 = {};
        $.UA = liIlIl.genUA($.UserName);
        $.retry = 0;
        I1liii = false;
        await Iii1ll();
        I1liii && (await $.wait(5000), Iii1lI++);
        Iii1lI == 10 && (console.log("\n【访问接口次数达到10次，休息一分钟.....】\n"), await $.wait(60 * 1000), Iii1lI = 0);
      }
    }
    if (ilIIll) {
      var IIIlli = JSON.stringify(liIIii, null, 2);
      ilIIli.writeFile(iIliil, IIIlli, function (Il1iIl) {
        if (Il1iIl) console.log(Il1iIl), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n");else {
          console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
        }
      });
    }
  }
  console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  for (let I1lilI = 0; I1lilI < cookiesArr.length; I1lilI++) {
    if (cookiesArr[I1lilI]) {
      cookie = cookiesArr[I1lilI];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I1lilI + 1;
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
      i11iI = "";
      lIiII = "";
      l1lii1 = {};
      $.UA = liIlIl.genUA($.UserName);
      $.retry = 0;
      Iii1lI++;
      await l1I11I();
      if (Iii1lI == 3) {
        console.log("\n【访问接口次数达到3次，休息一分钟.....】\n");
        await $.wait(60 * 1000);
        Iii1lI = 0;
      }
    }
  }
  $.isNode() && allMessage && $.ctrTemp && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(Iii1l1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Iii1l1 + "!", "");
}).finally(() => {
  $.done();
});
async function l1I11I() {
  lIiII = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await ilIIlI();
    if ($.farmInfo?.["farmUserPro"]) {
      console.log("\n【已成功兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n");
      await IliIi1();
      await I1liil();
      if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
        l1lii1["open-url"] = ilI1I1;
        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) console.log("\n当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）\n");else {
          if ($.farmInfo?.["treeState"] === 0) {
            l1lii1["open-url"] = ilI1I1;
            return;
          }
        }
      }
    } else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) {
          console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");
        } else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 30000, 10)));
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      $.retry < 2 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await l1I11I());
    }
  } catch (I1IIii) {
    $.logErr(I1IIii);
  }
}
async function I1liil() {
  await l1I11l();
  if ($.initForTurntableFarmRes?.["code"] === "0") {
    let {
      timingIntervalHours: lI1iI1,
      timingLastSysTime: iIIIi1,
      sysTime: lIiIiI,
      remainLotteryTimes: ilIliI,
      turntableInfos: II1li
    } = $.initForTurntableFarmRes;
    console.log("开始天天抽奖--好友助力--每人每天只有三次助力机会.");
    for (let Ii1lIi of newShareCodes) {
      if (Ii1lIi === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
        console.log("天天抽奖-不能自己给自己助力\n");
        continue;
      }
      await l1IlII(Ii1lIi);
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
    console.log("天天抽奖次数共-" + ilIliI + "次");
    if (ilIliI > 0) {
      console.log("开始抽奖");
      let iIIIiI = "";
      for (let li1iI = 0; li1iI < new Array(ilIliI).fill("").length; li1iI++) {
        await iIliii();
        console.log("第" + (li1iI + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));
        if ($.lotteryRes.code === "0") {
          II1li.map(I1IIi1 => {
            if (I1IIi1.type === $.lotteryRes.type) {
              console.log("lotteryRes.type" + $.lotteryRes?.["type"]);
              if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") iIIIiI += I1IIi1.name + "个，";else $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? iIIIiI += I1IIi1.name + "，" : iIIIiI += I1IIi1.name + "，";
            }
          });
          if ($.lotteryRes?.["remainLotteryTimes"] === 0) break;
        }
      }
      iIIIiI && console.log("【天天抽奖】" + iIIIiI.substr(0, iIIIiI.length - 1) + "\n");
    } else console.log("抽奖完成没有次数啦~");
  } else console.log("初始化天天抽奖得好礼失败");
}
async function IliIi1() {
  await $.wait(2000);
  await ilIIlI();
  let Il1I11 = 0,
    lIl1II = 3,
    Ii1Ili = "";
  if (iiil1i) {
    console.log("开始助力好友");
    for (let Ii1Iii of newShareCodes) {
      if (liiiIi) {
        var IIiI11 = false;
        for (let Ii1Iil of liiiIi) {
          if (Ii1Iii == Ii1Iil) {
            IIiI11 = true;
            break;
          }
        }
        if (IIiI11) {
          console.log(Ii1Iii + "助力已满，跳过...");
          continue;
        }
      }
      console.log($.UserName + "开始助力: " + Ii1Iii);
      if (!Ii1Iii) continue;
      if (!$.farmInfo?.["farmUserPro"]) {
        console.log("未种植,跳过助力\n");
        continue;
      }
      if (Ii1Iii === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
        console.log("不能为自己助力哦，跳过自己的shareCode\n");
        continue;
      }
      await liIIlI(Ii1Iii);
      if ($.helpResult?.["code"] === "0") {
        if ($.helpResult?.["helpResult"]?.["code"] === "0") Il1I11 += $.helpResult?.["helpResult"]?.["salveHelpAddWater"], console.log("【助力好友结果】: 已成功给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】助力"), console.log("给好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】助力获得" + $.helpResult?.["helpResult"]?.["salveHelpAddWater"] + "g水滴"), Ii1Ili += ($.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] || "匿名用户") + ",";else {
          if ($.helpResult?.["helpResult"]?.["code"] === "8") console.log("【助力好友结果】: 助力【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】失败，您今天助力次数已耗尽");else {
            if ($.helpResult?.["helpResult"]?.["code"] === "9") console.log("【助力好友结果】: 之前给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】助力过了");else $.helpResult?.["helpResult"]?.["code"] === "10" ? (liiiIi.push(Ii1Iii), console.log("【助力好友结果】: 好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】已满五人助力")) : console.log("助力其他情况：" + JSON.stringify($.helpResult?.["helpResult"]));
          }
        }
        console.log("【今日助力次数还剩】" + $.helpResult?.["helpResult"]?.["remainTimes"] + "次\n");
        lIl1II = $.helpResult?.["helpResult"]?.["remainTimes"];
        if ($.helpResult?.["helpResult"]?.["remainTimes"] === 0) {
          console.log("您当前助力次数已耗尽，跳出助力");
          break;
        }
      } else {
        if ($.helpResult?.["code"] == 3) {
          console.log("助力失败: " + $.helpResult?.["code"] + ",未登录");
        } else {
          if ($.helpResult?.["code"] == 6) console.log("助力失败: " + $.helpResult?.["code"] + ",活动太火爆");else $.helpResult?.["code"] == 2 ? console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["echo"]) : console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["message"]);
        }
        ($.helpResult?.["code"] == 402 || $.helpResult?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 30000, 10)));
      }
    }
  }
  if ($.isLoon() || $.isQuanX() || $.isSurge()) {
    let l1iI1l = l1IlI1() + $.farmInfo?.["farmUserPro"]?.["shareCode"];
    !$.getdata(l1iI1l) && ($.setdata("", l1IlI1(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo?.["farmUserPro"]?.["shareCode"]), $.setdata("", l1iI1l));
    Ii1Ili && ($.getdata(l1iI1l) ? $.setdata($.getdata(l1iI1l) + "," + Ii1Ili, l1iI1l) : $.setdata(Ii1Ili, l1iI1l));
    Ii1Ili = $.getdata(l1iI1l);
  }
  if (Ii1Ili && Ii1Ili.length > 0) {}
  Il1I11 > 0 && console.log("【助力好友👬】获得" + Il1I11 + "g💧\n");
  console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}
async function Iii1ll() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var IiIii1 = false,
      l1lIIl = "";
    if (liIIii) {
      for (let I11l = 0; I11l < liIIii.length; I11l++) {
        liIIii[I11l].pt_pin == $.UserName && (IiIii1 = true, l1lIIl = liIIii[I11l].ShareCode);
      }
    }
    if (!IiIii1) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      I1liii = true;
      await ilIIlI();
      if ($.farmInfo?.["farmUserPro"]) {
        var i1lIl = {};
        l1lIIl = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        i1lIl = {
          "pt_pin": $.UserName,
          "ShareCode": l1lIIl
        };
        liIIii.push(i1lIl);
        ilIIll = true;
      }
    }
    l1lIIl ? (console.log("\n" + l1lIIl), newShareCodes.push(l1lIIl)) : console.log("\n数据异常");
  } catch (illI1l) {
    $.logErr(illI1l);
  }
}
async function liiiIl() {
  return new Promise(i1IiIl => {
    const ll1Ill = {
      "type": 2,
      "version": 6,
      "channel": 2
    };
    $.post(liiiII("getFullCollectionReward", ll1Ill), (IlII, IiIili, llIiil) => {
      try {
        IlII ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(IlII)), $.logErr(IlII)) : liI1(llIiil) && ($.duckRes = JSON.parse(llIiil));
      } catch (III1iI) {
        $.logErr(III1iI, IiIili);
      } finally {
        i1IiIl();
      }
    });
  });
}
async function liIIiI() {
  $.totalWaterReward = await liIIil("totalWaterTaskForFarm");
}
async function Iii1li() {
  $.firstWaterReward = await liIIil("firstWaterTaskForFarm");
}
async function iIl1l() {
  $.waterFriendGotAwardRes = await liIIil("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}
async function iIl1i() {
  $.myCardInfoRes = await liIIil("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}
async function i11i1(IlI1) {
  $.userMyCardRes = await liIIil("userMyCardForFarm", {
    "cardType": IlI1
  });
}
async function liIIi1(I1IlIi) {
  $.gotStageAwardForFarmRes = await liIIil("gotStageAwardForFarm", {
    "type": I1IlIi
  });
}
async function I1liiI() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await liIIil("waterGoodForFarm");
}
async function l1I11l() {
  $.initForTurntableFarmRes = await liIIil("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function iIliii() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await liIIil("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}
async function l1I11i() {
  $.timingAwardRes = await liIIil("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function iIlii1(lIiIll, lIlliI) {
  lIiIll === 1 && console.log("浏览爆品会场");
  lIiIll === 2 && console.log("天天抽奖浏览任务领取水滴");
  const IiIiil = {
    "type": lIiIll,
    "adId": lIlliI,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await liIIil("browserForTurntableFarm", IiIiil);
}
async function IIiil1(i1111) {
  const IlIi1l = {
    "type": 2,
    "adId": i1111,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await liIIil("browserForTurntableFarm", IlIi1l);
}
async function l1IlII() {
  $.lotteryMasterHelpRes = await liIIil("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}
async function ii1i() {
  $.masterGotFinished = await liIIil("masterGotFinishedTaskForFarm");
}
async function ilIIl1() {
  $.masterHelpResult = await liIIil("masterHelpTaskInitForFarm");
}
async function ii1l() {
  $.farmAssistResult = await liIIil("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function iIl1I() {
  $.receiveStageEnergy = await liIIil("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function liIi() {
  $.inviteFriendRes = await liIIil("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function liIIlI() {
  $.helpResult = await liIIil("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function IliIil() {
  const l1iiii = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await liIIil("waterRainForFarm", l1iiii);
}
async function iliiIi() {
  $.clockInInit = await liIIil("clockInInitForFarm");
}
async function i11Ill() {
  $.clockInForFarmRes = await liIIil("clockInForFarm", {
    "type": 1
  });
}
async function iliiIl(lill1, IiIIl, IiIIi) {
  let iiiIl1 = {
    "id": lill1,
    "type": IiIIl,
    "step": IiIIi
  };
  if (IiIIl === "theme") {
    if (IiIIi === "1") $.themeStep1 = await liIIil("clockInFollowForFarm", iiiIl1);else IiIIi === "2" && ($.themeStep2 = await liIIil("clockInFollowForFarm", iiiIl1));
  } else {
    if (IiIIl === "venderCoupon") {
      if (IiIIi === "1") $.venderCouponStep1 = await liIIil("clockInFollowForFarm", iiiIl1);else IiIIi === "2" && ($.venderCouponStep2 = await liIIil("clockInFollowForFarm", iiiIl1));
    }
  }
}
async function IliIii() {
  $.gotClockInGiftRes = await liIIil("gotClockInGift", {
    "type": 2
  });
}
async function liIIl1() {
  $.threeMeal = await liIIil("gotThreeMealForFarm");
}
async function iIliiI(i1Ii1I, llIiIl) {
  if (llIiIl === 0) $.browseResult = await liIIil("browseAdTaskForFarm", {
    "advertId": i1Ii1I,
    "type": llIiIl
  });else llIiIl === 1 && ($.browseRwardResult = await liIIil("browseAdTaskForFarm", {
    "advertId": i1Ii1I,
    "type": llIiIl
  }));
}
async function IIiilI() {
  $.goalResult = await liIIil("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function I1lii1() {
  $.signResult = await liIIil("signForFarm");
}
async function ilIIlI() {
  $.farmInfo = await liIIil("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": Il1i,
    "un_area": lIiIl,
    "version": 22,
    "lat": Il1l,
    "lng": iiil1l,
    "channel": 1
  });
}
async function liiiI1() {
  console.log("\n初始化任务列表");
  $.farmTask = await liIIil("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function iIl11() {
  $.friendList = await liIIil("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}
async function ii1I() {
  $.awardInviteFriendRes = await liIIil("awardInviteFriendForFarm");
}
async function i11Ili(iilli1) {
  const Iil1l = {
    "shareCode": iilli1,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await liIIil("waterFriendForFarm", Iil1l);
}
async function liII() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + ii1i1l === "false";
  $.ctrTemp ? ($.msg($.name, lIiII, i11iI, l1lii1), $.isNode() && (allMessage += lIiII + "\n" + i11iI + ($.index !== cookiesArr.length ? "\n\n" : ""))) : $.log("\n" + i11iI + "\n");
}
function l1IlI1(IllIi) {
  let iII11;
  if (IllIi) {
    iII11 = new Date(IllIi);
  } else iII11 = new Date();
  return iII11.getFullYear() + "-" + (iII11.getMonth() + 1 >= 10 ? iII11.getMonth() + 1 : "0" + (iII11.getMonth() + 1)) + "-" + (iII11.getDate() >= 10 ? iII11.getDate() : "0" + iII11.getDate());
}
function ii11() {
  return new Promise(liIII1 => {
    console.log("开始获取配置文件\n");
    notify = $.isNode() ? require("./sendNotify") : "";
    const I111ii = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(I111ii).forEach(Ililll => {
        I111ii[Ililll] && cookiesArr.push(I111ii[Ililll]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Ii1I1($.getdata("CookiesJD") || "[]").map(Ililli => Ililli.cookie)].filter(lii1 => !!lii1);
    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    liIII1();
  });
}
function liIIil(iIii1l, iIliIi = {}, IIil1l = 1000) {
  return new Promise(IIllIl => {
    setTimeout(async () => {
      $.post(await liiiII(iIii1l, iIliIi), (lIl1i1, l1Ilil, iIili) => {
        try {
          lIl1i1 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(lIl1i1)), console.log("function_id:" + iIii1l), $.logErr(lIl1i1)) : liI1(iIili) && (iIili = JSON.parse(iIili));
        } catch (iil1Il) {
          $.logErr(iil1Il, l1Ilil);
        } finally {
          IIllIl(iIili);
        }
      });
    }, IIil1l);
  });
}
function liI1(IlIll) {
  if (!IlIll) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(IlIll) == "object") {
      return true;
    }
  } catch (lIl1iI) {
    return console.log(lIl1iI), false;
  }
}
const IliIiI = {
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
async function liiiII(iil1II, iii11I = {}) {
  let iI11iI = "";
  if (!IliIiI[iil1II]) iI11iI = "https://api.m.jd.com/client.action?functionId=" + iil1II + "&body=" + encodeURIComponent(JSON.stringify(iii11I)) + "&appid=wh5", console.log(iI11iI);else {
    const iIil1 = {
        "appid": "signed_wh5",
        "client": "iOS",
        "clientVersion": "10.1.0",
        "functionId": iil1II,
        "body": iii11I
      },
      l1IllI = await IIiili(IliIiI[iil1II], iIil1);
    iI11iI = "https://api.m.jd.com/client.action?" + l1IllI;
  }
  return {
    "url": iI11iI,
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
    "timeout": 10000
  };
}
async function IIiili(lIi1Ii, iiilII) {
  try {
    let lili = new I1lI1l({
      "appId": lIi1Ii,
      "appid": "signed_wh5",
      "clientVersion": iiilII?.["clientVersion"],
      "client": iiilII?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await lili.genAlgo(), body = await lili.genUrlParams(iiilII.functionId, iiilII.body), body;
  } catch (lIi1Il) {}
}
async function IIiiiI(Ii1lII, iliI11) {
  let ll111I = {
      "searchParams": {
        ...iliI11,
        "appId": Ii1lII
      },
      "pt_pin": $.UserName,
      "client": iliI11?.["client"],
      "clientVersion": iliI11?.["clientVersion"]
    },
    liIl1I = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    IIl111 = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(ll111I),
      "headers": liIl1I,
      "timeout": 30000
    };
  return new Promise(async iIiii => {
    $.post(IIl111, (lil1, illIII, iliI1l) => {
      let iliI1i = "";
      try {
        if (lil1) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          iliI1l = JSON.parse(iliI1l);
          console.log(JSON.stringify(iliI1l));
          if (typeof iliI1l === "object" && iliI1l && iliI1l.body) {
            if (iliI1l.body) iliI1i = iliI1l || "";
          } else iliI1l.code == 400 ? console.log("\n" + iliI1l.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (IIl11i) {
        $.logErr(IIl11i, illIII);
      } finally {
        iIiii(lIi1l1(iliI1i));
      }
    });
  });
}
function lIi1l1(Ilili1, iIiiI = {}) {
  let l1iiiI = [],
    Ii111l = iIiiI.connector || "&",
    iI11li = Object.keys(Ilili1);
  if (iIiiI.sort) iI11li = iI11li.sort();
  for (let l1Illi of iI11li) {
    let iiilIi = Ilili1[l1Illi];
    if (iiilIi && typeof iiilIi === "object") iiilIi = JSON.stringify(iiilIi);
    if (iiilIi && iIiiI.encode) iiilIi = encodeURIComponent(iiilIi);
    l1iiiI.push(l1Illi + "=" + iiilIi);
  }
  return l1iiiI.join(Ii111l);
}
function i11IlI(l1Illl, Ii111I = "qwertyuiopasdfghjklzxcvbnm") {
  let liIl1i = "";
  for (let lIi1I = 0; lIi1I < l1Illl; lIi1I++) {
    liIl1i += Ii111I[Math.floor(Math.random() * Ii111I.length)];
  }
  return liIl1i;
}
function Ii1I1(Ii1111) {
  if (typeof Ii1111 == "string") {
    try {
      return JSON.parse(Ii1111);
    } catch (iIii1) {
      return console.log(iIii1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}