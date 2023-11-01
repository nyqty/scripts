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
const $ = new Env('东东农场内部水滴互助')

let cookiesArr = [],
    cookie = '',
    jdFruitShareArr = [],
    isBox = false,
    notify,
    allMessage = ''
let shareCodes = [
    // 这个列表填入你要助力的好友的shareCode
    //     //账号一的好友shareCode,不同好友的shareCode中间用@符号隔开
    //     '5853550f71014282912b76d95beb84c0@b58ddba3317b44ceb0ac86ea8952998c@8d724eb95e3847b6a1526587d1836f27@a80b7d1db41a4381b742232da9d22443@ce107b8f64d24f62a92292180f764018@c73ea563a77d4464b273503d3838fec1@0dd9a7fd1feb449fb1bf854a3ec0e801',
    //     //账号二的好友shareCode,不同好友的shareCode中间用@符号隔开
    //     '5853550f71014282912b76d95beb84c0@b58ddba3317b44ceb0ac86ea8952998c@8d724eb95e3847b6a1526587d1836f27@a80b7d1db41a4381b742232da9d22443@ce107b8f64d24f62a92292180f764018@c73ea563a77d4464b273503d3838fec1@0dd9a7fd1feb449fb1bf854a3ec0e801',
]
let newShareCodes = []

let I1IllI = "",
  IIlI11 = "",
  iIIll1 = {};
let ili1I = true;
const l1IiI = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
  l1lill = require("./function/jdCommon"),
  i1li1 = require("./function/krgetH5st");
let llIIIl = iIlI1I(2, "1234567890") + "-" + iIlI1I(4, "1234567890") + "-" + iIlI1I(4, "1234567890") + "-" + iIlI1I(5, "1234567890"),
  IIlI1I = "106.475" + Math.floor(Math.random() * 899 + 100),
  llIIIi = "29.503" + Math.floor(Math.random() * 899 + 100);
const I1Ilii = require("fs");
let l1Iii = false,
  l1Iil = "./Fruit_ShareCache.json",
  III1Ii = I1Ilii.existsSync(l1Iil),
  III1Il = [];
III1Ii && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), III1Il = I1Ilii.readFileSync(l1Iil, "utf-8"), III1Il && (III1Il = III1Il.toString(), III1Il = JSON.parse(III1Il)));
let iIIliI = 0,
  IiIil = false,
  IiIii = [];
!(async () => {
  await illill();
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("\n【若多次提示403，务必更换IP运行.....】\n");
  console.log("\n【开始收集您的互助码，用于账号内部互助，请稍等...】\n");
  for (let l1l1l = 0; l1l1l < cookiesArr.length; l1l1l++) {
    if (cookiesArr[l1l1l]) {
      cookie = cookiesArr[l1l1l];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1l1l + 1;
      $.isLogin = true;
      $.nickName = "";
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      I1IllI = "";
      IIlI11 = "";
      iIIll1 = {};
      $.UA = l1lill.genUA($.UserName);
      $.retry = 0;
      IiIil = false;
      await l1Il1();
      IiIil && (await $.wait(5000), iIIliI++);
      iIIliI == 10 && (console.log("\n【访问接口次数达到10次，休息一分钟.....】\n"), await $.wait(60000), iIIliI = 0);
    }
  }
  if (l1Iii) {
    var IIIl = JSON.stringify(III1Il, null, 2);
    I1Ilii.writeFile(l1Iil, IIIl, function (illil1) {
      illil1 ? (console.log(illil1), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
    });
  }
  console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  for (let iil11I = 0; iil11I < cookiesArr.length; iil11I++) {
    if (cookiesArr[iil11I]) {
      cookie = cookiesArr[iil11I];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iil11I + 1;
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
      I1IllI = "";
      IIlI11 = "";
      iIIll1 = {};
      $.UA = l1lill.genUA($.UserName);
      $.retry = 0;
      iIIliI++;
      await iill1l();
      iIIliI == 5 && (console.log("\n【访问接口次数达到5次，休息一分钟.....】\n"), await $.wait(60000), iIIliI = 0);
    }
  }
  $.isNode() && allMessage && $.ctrTemp && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(IlliI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + IlliI + "!", "");
}).finally(() => {
  $.done();
});
async function iill1l() {
  IIlI11 = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await l1IIii();
    if ($.farmInfo?.["farmUserPro"]) {
      console.log("\n【已成功兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n");
      await iill1i();
      await IiIiII();
      if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
        iIIll1["open-url"] = l1IiI;
        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) {
          console.log("\n当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）\n");
        } else {
          if ($.farmInfo?.["treeState"] === 0) {
            iIIll1["open-url"] = l1IiI;
            return;
          }
        }
      }
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
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 10000, 10)));
      $.retry < 2 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await iill1l());
    }
  } catch (illI11) {
    $.logErr(illI11);
  }
}
async function IiIiII() {
  await IiIiI();
  if ($.initForTurntableFarmRes?.["code"] === "0") {
    let {
      timingIntervalHours: iIliil,
      timingLastSysTime: IIiill,
      sysTime: liIIii,
      remainLotteryTimes: Iii1lI,
      turntableInfos: I1liii
    } = $.initForTurntableFarmRes;
    console.log("开始天天抽奖--好友助力--每人每天只有三次助力机会.");
    for (let liiiIi of newShareCodes) {
      if (liiiIi === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
        console.log("天天抽奖-不能自己给自己助力\n");
        continue;
      }
      await liI11I(liiiIi);
      if ($.lotteryMasterHelpRes?.["helpResult"]) {
        if ($.lotteryMasterHelpRes?.["helpResult"]?.["code"] === "0") {
          console.log("天天抽奖-助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "成功\n");
        } else {
          if ($.lotteryMasterHelpRes?.["helpResult"]?.["code"] === "11") {
            console.log("天天抽奖-不要重复助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "\n");
          } else {
            if ($.lotteryMasterHelpRes.helpResult.code === "13") {
              console.log("天天抽奖-助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "失败,助力次数耗尽\n");
              break;
            }
          }
        }
      }
    }
    console.log("天天抽奖次数共-" + Iii1lI + "次");
    if (Iii1lI > 0) {
      console.log("开始抽奖");
      let I1liil = "";
      for (let IliIi1 = 0; IliIi1 < new Array(Iii1lI).fill("").length; IliIi1++) {
        await iill1I();
        console.log("第" + (IliIi1 + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));
        if ($.lotteryRes.code === "0") {
          I1liii.map(Iii1ll => {
            if (Iii1ll.type === $.lotteryRes.type) {
              console.log("lotteryRes.type" + $.lotteryRes?.["type"]);
              if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") {
                I1liil += Iii1ll.name + "个，";
              } else {
                if ($.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water") {
                  I1liil += Iii1ll.name + "，";
                } else {
                  I1liil += Iii1ll.name + "，";
                }
              }
            }
          });
          if ($.lotteryRes?.["remainLotteryTimes"] === 0) {
            break;
          }
        }
      }
      I1liil && console.log("【天天抽奖】" + I1liil.substr(0, I1liil.length - 1) + "\n");
    } else {
      console.log("抽奖完成没有次数啦~");
    }
  } else {
    console.log("初始化天天抽奖得好礼失败");
  }
}
async function iill1i() {
  await $.wait(2000);
  await l1IIii();
  let ii1i = 0,
    ilIIl1 = 3,
    ii1l = "";
  console.log("开始助力好友");
  for (let Ili11i of newShareCodes) {
    var iIl1I = false;
    for (let Il1iI1 of IiIii) {
      if (Ili11i == Il1iI1) {
        iIl1I = true;
        break;
      }
    }
    if (iIl1I) {
      console.log(Ili11i + "助力已满，跳过...");
      continue;
    }
    console.log($.UserName + "开始助力: " + Ili11i);
    if (!Ili11i) {
      continue;
    }
    if (!$.farmInfo?.["farmUserPro"]) {
      console.log("未种植,跳过助力\n");
      continue;
    }
    if (Ili11i === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
      console.log("不能为自己助力哦，跳过自己的shareCode\n");
      continue;
    }
    await illili(Ili11i);
    if ($.helpResult?.["code"] === "0") {
      if ($.helpResult?.["helpResult"]?.["code"] === "0") {
        ii1i += $.helpResult?.["helpResult"]?.["salveHelpAddWater"];
        console.log("【助力好友结果】: 已成功给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力");
        console.log("给好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力获得" + $.helpResult?.["helpResult"]?.["salveHelpAddWater"] + "g水滴");
        ii1l += ($.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] || "匿名用户") + ",";
      } else {
        if ($.helpResult?.["helpResult"]?.["code"] === "8") {
          console.log("【助力好友结果】: 助力【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】失败，您今天助力次数已耗尽");
        } else {
          if ($.helpResult?.["helpResult"]?.["code"] === "9") {
            console.log("【助力好友结果】: 之前给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力过了");
          } else {
            $.helpResult?.["helpResult"]?.["code"] === "10" ? (IiIii.push(Ili11i), console.log("【助力好友结果】: 好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力已满")) : console.log("助力其他情况：" + JSON.stringify($.helpResult?.["helpResult"]));
          }
        }
      }
      console.log("【今日助力次数还剩】" + $.helpResult?.["helpResult"]?.["remainTimes"] + "次\n");
      ilIIl1 = $.helpResult?.["helpResult"]?.["remainTimes"];
      if ($.helpResult?.["helpResult"]?.["remainTimes"] === 0) {
        console.log("您当前助力次数已耗尽，跳出助力");
        break;
      }
    } else {
      if ($.helpResult?.["code"] == 3) {
        console.log("助力失败: " + $.helpResult?.["code"] + ",未登录");
      } else {
        if ($.helpResult?.["code"] == 6) {
          console.log("助力失败: " + $.helpResult?.["code"] + ",活动太火爆");
        } else {
          $.helpResult?.["code"] == 2 ? console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["echo"]) : console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["message"]);
        }
      }
      ($.helpResult?.["code"] == 402 || $.helpResult?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
    }
  }
  if ($.isLoon() || $.isQuanX() || $.isSurge()) {
    let l1IIiI = l1l11() + $.farmInfo?.["farmUserPro"]?.["shareCode"];
    !$.getdata(l1IIiI) && ($.setdata("", l1l11(Date.now() - 86400000) + $.farmInfo?.["farmUserPro"]?.["shareCode"]), $.setdata("", l1IIiI));
    ii1l && ($.getdata(l1IIiI) ? $.setdata($.getdata(l1IIiI) + "," + ii1l, l1IIiI) : $.setdata(ii1l, l1IIiI));
    ii1l = $.getdata(l1IIiI);
  }
  ii1l && ii1l.length > 0;
  ii1i > 0 && console.log("【助力好友👬】获得" + ii1i + "g💧\n");
  console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}
async function l1Il1() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var IlilIl = false,
      iIlili = "";
    if (III1Il) {
      for (let iIlilI = 0; iIlilI < III1Il.length; iIlilI++) {
        III1Il[iIlilI].pt_pin == $.UserName && (IlilIl = true, iIlili = III1Il[iIlilI].ShareCode);
      }
    }
    if (!IlilIl) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      IiIil = true;
      await l1IIii();
      if ($.farmInfo?.["farmUserPro"]) {
        var Ii1II = {};
        iIlili = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        Ii1II = {
          pt_pin: $.UserName,
          ShareCode: iIlili
        };
        III1Il.push(Ii1II);
        l1Iii = true;
      }
    }
    iIlili ? (console.log("\n" + iIlili), newShareCodes.push(iIlili)) : console.log("\n数据异常");
  } catch (lIilIl) {
    $.logErr(lIilIl);
  }
}
async function iill11() {
  return new Promise(lIi1i => {
    const Ii1Ii1 = {
      type: 2,
      version: 6,
      channel: 2
    };
    $.post(l1l1I("getFullCollectionReward", Ii1Ii1), (IIll1I, liii1I, lI1iIi) => {
      try {
        IIll1I ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(IIll1I)), $.logErr(IIll1I)) : I1lI11(lI1iIi) && ($.duckRes = JSON.parse(lI1iIi));
      } catch (li11ii) {
        $.logErr(li11ii, liii1I);
      } finally {
        lIi1i();
      }
    });
  });
}
async function I1IliI() {
  $.totalWaterReward = await IIIli1("totalWaterTaskForFarm");
}
async function III1II() {
  $.firstWaterReward = await IIIli1("firstWaterTaskForFarm");
}
async function l1I1II() {
  $.waterFriendGotAwardRes = await IIIli1("waterFriendGotAwardForFarm", {
    version: 4,
    channel: 1
  });
}
async function iIIlil() {
  $.myCardInfoRes = await IIIli1("myCardInfoForFarm", {
    version: 5,
    channel: 1
  });
}
async function IiIiI1(liii1i) {
  $.userMyCardRes = await IIIli1("userMyCardForFarm", {
    cardType: liii1i
  });
}
async function iIIlii(li11iI) {
  $.gotStageAwardForFarmRes = await IIIli1("gotStageAwardForFarm", {
    type: li11iI
  });
}
async function llIII1() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await IIIli1("waterGoodForFarm");
}
async function IiIiI() {
  $.initForTurntableFarmRes = await IIIli1("initForTurntableFarm", {
    version: 4,
    channel: 1
  });
}
async function iill1I() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await IIIli1("lotteryForTurntableFarm", {
    type: 1,
    version: 4,
    channel: 1
  });
}
async function Illi1() {
  $.timingAwardRes = await IIIli1("timingAwardForTurntableFarm", {
    version: 4,
    channel: 1
  });
}
async function l1iiIl(li1ii, lI1iI1) {
  li1ii === 1 && console.log("浏览爆品会场");
  li1ii === 2 && console.log("天天抽奖浏览任务领取水滴");
  const lIiIiI = {
    type: li1ii,
    adId: lI1iI1,
    version: 4,
    channel: 1
  };
  $.browserForTurntableFarmRes = await IIIli1("browserForTurntableFarm", lIiIiI);
}
async function lIIi1i(I1IIi1) {
  const ll1lI1 = {
    type: 2,
    adId: I1IIi1,
    version: 4,
    channel: 1
  };
  $.browserForTurntableFarm2Res = await IIIli1("browserForTurntableFarm", ll1lI1);
}
async function liI11I() {
  $.lotteryMasterHelpRes = await IIIli1("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-3",
    babelChannel: "3",
    version: 4,
    channel: 1
  });
}
async function III1() {
  $.masterGotFinished = await IIIli1("masterGotFinishedTaskForFarm");
}
async function l1IIl1() {
  $.masterHelpResult = await IIIli1("masterHelpTaskInitForFarm");
}
async function l1iiIi() {
  $.farmAssistResult = await IIIli1("farmAssistInit", {
    version: 14,
    channel: 1,
    babelChannel: "120"
  });
}
async function lIIi1l() {
  $.receiveStageEnergy = await IIIli1("receiveStageEnergy", {
    version: 14,
    channel: 1,
    babelChannel: "120"
  });
}
async function I1lI1i() {
  $.inviteFriendRes = await IIIli1("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-inviteFriend",
    version: 4,
    channel: 2
  });
}
async function illili() {
  $.helpResult = await IIIli1("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0],
    babelChannel: "3",
    version: 2,
    channel: 1
  });
}
async function iiiII1() {
  const lIi11l = {
    type: 1,
    hongBaoTimes: 100,
    version: 3
  };
  $.waterRain = await IIIli1("waterRainForFarm", lIi11l);
}
async function liI111() {
  $.clockInInit = await IIIli1("clockInInitForFarm");
}
async function IiIlI() {
  $.clockInForFarmRes = await IIIli1("clockInForFarm", {
    type: 1
  });
}
async function iIlI1i(IIlIIi, iliiil, li11ll) {
  let li1l1 = {
    id: IIlIIi,
    type: iliiil,
    step: li11ll
  };
  if (iliiil === "theme") {
    if (li11ll === "1") {
      $.themeStep1 = await IIIli1("clockInFollowForFarm", li1l1);
    } else {
      li11ll === "2" && ($.themeStep2 = await IIIli1("clockInFollowForFarm", li1l1));
    }
  } else {
    if (iliiil === "venderCoupon") {
      if (li11ll === "1") {
        $.venderCouponStep1 = await IIIli1("clockInFollowForFarm", li1l1);
      } else {
        li11ll === "2" && ($.venderCouponStep2 = await IIIli1("clockInFollowForFarm", li1l1));
      }
    }
  }
}
async function iII1Il() {
  $.gotClockInGiftRes = await IIIli1("gotClockInGift", {
    type: 2
  });
}
async function IIIliI() {
  $.threeMeal = await IIIli1("gotThreeMealForFarm");
}
async function iII1Ii(I111, I1I11l) {
  if (I1I11l === 0) {
    $.browseResult = await IIIli1("browseAdTaskForFarm", {
      advertId: I111,
      type: I1I11l
    });
  } else {
    I1I11l === 1 && ($.browseRwardResult = await IIIli1("browseAdTaskForFarm", {
      advertId: I111,
      type: I1I11l
    }));
  }
}
async function iIlI1l() {
  $.goalResult = await IIIli1("gotWaterGoalTaskForFarm", {
    type: 3
  });
}
async function llIill() {
  $.signResult = await IIIli1("signForFarm");
}
async function l1IIii() {
  $.farmInfo = await IIIli1("initForFarm", {
    babelChannel: "522",
    sid: "",
    un_area: llIIIl,
    version: 25,
    channel: 1,
    lat: llIIIi,
    lng: IIlI1I
  });
}
async function lIIi1I() {
  console.log("\n初始化任务列表");
  $.farmTask = await IIIli1("taskInitForFarm", {
    version: 18,
    channel: 1,
    babelChannel: "121"
  });
}
async function l1IIil() {
  $.friendList = await IIIli1("friendListInitForFarm", {
    version: 18,
    channel: 1,
    babelChannel: "45"
  });
}
async function l1iiII() {
  $.awardInviteFriendRes = await IIIli1("awardInviteFriendForFarm");
}
async function I1lI1I(iilIil) {
  const i1IiII = {
    shareCode: iilIil,
    version: 18,
    channel: 1,
    babelChannel: "121"
  };
  $.waterFriendForFarmRes = await IIIli1("waterFriendForFarm", i1IiII);
}
async function lIi1i1() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
    $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
  } else {
    $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + ili1I === "false";
  }
  if ($.ctrTemp) {
    $.msg($.name, IIlI11, I1IllI, iIIll1);
    $.isNode() && (allMessage += IIlI11 + "\n" + I1IllI + ($.index !== cookiesArr.length ? "\n\n" : ""));
  } else {
    $.log("\n" + I1IllI + "\n");
  }
}
function l1l11(i1IiIi) {
  let Ili1il;
  i1IiIi ? Ili1il = new Date(i1IiIi) : Ili1il = new Date();
  return Ili1il.getFullYear() + "-" + (Ili1il.getMonth() + 1 >= 10 ? Ili1il.getMonth() + 1 : "0" + (Ili1il.getMonth() + 1)) + "-" + (Ili1il.getDate() >= 10 ? Ili1il.getDate() : "0" + Ili1il.getDate());
}
function illill() {
  return new Promise(iilIll => {
    console.log("开始获取配置文件\n");
    notify = $.isNode() ? require("./sendNotify") : "";
    const iilIli = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(iilIli).forEach(IlIi1I => {
        iilIli[IlIi1I] && cookiesArr.push(iilIli[IlIi1I]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => {};
      }
    } else {
      cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1I1Ii($.getdata("CookiesJD") || "[]").map(lIiIl1 => lIiIl1.cookie)].filter(iilIl1 => !!iilIl1);
    }
    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    iilIll();
  });
}
function IIIli1(l1II1, III1i1 = {}, IlI1 = 4000) {
  return new Promise(l1I1i1 => {
    setTimeout(async () => {
      $.post(await l1l1I(l1II1, III1i1), (i111i, lIlli1, llIii1) => {
        try {
          i111i ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(i111i)), console.log("functionId:" + l1II1), $.logErr(i111i)) : I1lI11(llIii1) && (llIii1 = JSON.parse(llIii1));
        } catch (III1l1) {
          $.logErr(III1l1, lIlli1);
        } finally {
          l1I1i1(llIii1);
        }
      });
    }, IlI1);
  });
}
function I1lI11(lIiIli) {
  if (!lIiIli) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(lIiIli) == "object") {
      return true;
    }
  } catch (IlIi1i) {
    console.log(IlIi1i);
    return false;
  }
}
const I1I1Il = {
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
  guideTaskAward: "59bc4"
};
async function l1l1I(lIllii, l1il1 = {}) {
  let l1iil1 = "";
  const iiiIiI = I1I1Il[lIllii];
  if (!iiiIiI) {
    l1iil1 = "https://api.m.jd.com/client.action?functionId=" + lIllii + "&body=" + encodeURIComponent(JSON.stringify(l1il1)) + "&appid=wh5";
    console.log(l1iil1);
  } else {
    const l1iiil = await i1li1.getH5st({
      appId: iiiIiI,
      appid: "signed_wh5",
      body: l1il1,
      client: "iOS",
      clientVersion: "12.2.0",
      functionId: lIllii,
      cookie: cookie,
      ua: $.UA,
      version: "4.2",
      t: true
    });
    l1iil1 = "https://api.m.jd.com/client.action?" + l1iiil.params;
  }
  return {
    url: l1iil1,
    headers: {
      Host: "api.m.jd.com",
      Accept: "*/*",
      Origin: "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      Referer: "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      Cookie: cookie
    },
    timeout: 30000
  };
}
function iIlI1I(l1ilI, IIi1 = "qwertyuiopasdfghjklzxcvbnm") {
  let l1iiii = "";
  for (let Il11I = 0; Il11I < l1ilI; Il11I++) {
    l1iiii += IIi1[Math.floor(Math.random() * IIi1.length)];
  }
  return l1iiii;
}
function I1I1Ii(li1lll) {
  if (typeof li1lll == "string") {
    try {
      return JSON.parse(li1lll);
    } catch (IiIIl) {
      console.log(IiIIl);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
