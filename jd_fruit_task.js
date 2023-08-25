/*
东东水果:脚本更新地址 jd_fruit_task.js
更新时间：2021-5-18
活动入口：京东APP我的-更多工具-东东农场
==========================Quantumultx=========================
[task_local]
#东东农场日常任务
5 6-18/6 * * * jd_fruit_task.js, tag=东东农场日常任务, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true
=========================Loon=============================
[Script]
cron "5 6-18/6 * * *" script-path=jd_fruit_task.js,tag=东东农场日常任务

=========================Surge============================
东东农场日常任务 = type=cron,cronexp="5 6-18/6 * * *",wake-system=1,timeout=3600,script-path=jd_fruit_task.js

=========================小火箭===========================
东东农场日常任务 = type=cron,script-path=jd_fruit_task.js, cronexpr="5 6-18/6 * * *", timeout=3600, enable=true

默认浇水,不浇水设置变量export jd_fruit_Water='true'
export DO_TEN_WATER_AGAIN="" 默认再次浇水

*/
const Env=require('./utils/Env.js');
const $ = new Env('东东农场日常任务');
let IIllII = [],
  iil1I1 = "",
  iI11il = [],
  liiI,
  I111il = "",
  iliili = "",
  iliill = "",
  I111ii = {},
  Ililll = false;
const I1liII = $.isNode() ? process.env.retainWater ? process.env.retainWater : 100 : $.getdata("retainWater") ? $.getdata("retainWater") : 100;
let I1ii1I = true,
  Ililli = false,
  iIii1l = process.env.jd_fruit_Water === "true" ? true : false;
const IIil1l = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
  iIii1i = require("./function/jdCommon"),
  IIil1i = require("./utils/h5st.js");
let iIliI1 = Ii1lI1(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  iIii11 = Ii1lI1(2, "1234567890") + "-" + Ii1lI1(4, "1234567890") + "-" + Ii1lI1(4, "1234567890") + "-" + Ii1lI1(5, "1234567890"),
  i1i1lI = "106.475" + Math.floor(Math.random() * 899 + 100),
  IIllIi = "29.503" + Math.floor(Math.random() * 899 + 100),
  IIllIl = 0;
!(async () => {
  await Ii1lII();
  if (!IIllII[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("\n【若多次提示403，务必更换IP运行.....】\n");
  for (let ii1iIi = 0; ii1iIi < IIllII.length; ii1iIi++) {
    if (IIllII[ii1iIi]) {
      iil1I1 = IIllII[ii1iIi];
      $.UserName = decodeURIComponent(iil1I1.match(/pt_pin=([^; ]+)(?=;?)/) && iil1I1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ii1iIi + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await liiI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      iliili = "";
      iliill = "";
      I111ii = {};
      $.UA = iIii1i.genUA($.UserName);
      $.retry = 0;
      IIllIl++;
      await i11l1i();
      if (IIllIl == 3) {
        console.log("\n【访问接口次数达到3次，休息一分钟.....】\n");
        await $.wait(60 * 1000);
        IIllIl = 0;
      }
      await $.wait(30 * 1000);
    }
  }
  $.isNode() && I111il && $.ctrTemp && (await liiI.sendNotify("" + $.name, "" + I111il));
})().catch(ii1iIl => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + ii1iIl + "!", "");
}).finally(() => {
  $.done();
});
async function i11l1i() {
  iliill = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await iIil1();
    if ($.farmInfo?.["farmUserPro"]) {
      iliili = "【水果名称】" + $.farmInfo?.["farmUserPro"]?.["name"] + "\n";
      console.log("\n【已成功兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n");
      iliili += "【已兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n";
      if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
        I111ii["open-url"] = IIil1l;
        $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", I111ii);
        $.isNode() && (await liiI.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看"));
        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) console.log("\n当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）\n");else {
          if ($.farmInfo?.["treeState"] === 0) {
            I111ii["open-url"] = IIil1l;
            $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达", I111ii);
            $.isNode() && (await liiI.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果"));
            return;
          }
        }
      }
      await iI11l1();
      !iIii1l ? await IlillI() : console.log("默认浇水,不浇水设置变量export jd_fruit_Water='true'");
      await I111l1();
      await iIliII();
      await iil1Ii();
      $.farmInfo?.["newUserSendWater"] && (await iI11lI());
      await iii11i();
      !process.env.DO_TEN_WATER_AGAIN ? (console.log("执行再次浇水"), await iIii1I()) : console.log("不执行再次浇水，攒水滴");
      await II1i11();
    } else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 30000, 10)));
      $.retry < 1 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await i11l1i());
    }
  } catch (I111li) {
    $.logErr(I111li);
  }
  await lili();
}
async function iI11l1() {
  await l1IllI();
  console.log("被水滴砸中： " + ($.farmInfo?.["todayGotWaterGoalTask"]?.["canPop"] ? "是" : "否"));
  if ($.farmInfo?.["todayGotWaterGoalTask"]?.["canPop"]) {
    await II1i1l();
    if ($.goalResult?.["code"] === "0") {
      console.log("【被水滴砸中】获得" + $.goalResult?.["addEnergy"] + "g💧\\n");
    }
  }
  console.log("签到结束,开始广告浏览任务");
  if (!$.farmTask?.["gotBrowseTaskAdInit"]["f"]) {
    let Ii1lll = $.farmTask?.["gotBrowseTaskAdInit"]?.["userBrowseTaskAds"],
      I1IIII = 0,
      I1I1 = 0,
      Ii1lI = 0;
    for (let iIiIlI of Ii1lll) {
      if (iIiIlI.limit <= iIiIlI?.["hadFinishedTimes"]) {
        console.log(iIiIlI?.["mainTitle"] + "+ ' 已完成");
        continue;
      }
      console.log("正在进行广告浏览任务: " + iIiIlI?.["mainTitle"]);
      await IlIlI(iIiIlI?.["advertId"], 0);
      $.browseResult?.["code"] === "0" ? (console.log(iIiIlI?.["mainTitle"] + "浏览任务完成"), await IlIlI(iIiIlI?.["advertId"], 1), $.browseRwardResult?.["code"] === "0" ? (console.log("领取浏览" + iIiIlI?.["mainTitle"] + "广告奖励成功,获得" + $.browseRwardResult?.["amount"] + "g"), I1IIII += $.browseRwardResult?.["amount"], I1I1++) : (Ii1lI++, console.log("领取浏览广告奖励结果:  " + JSON.stringify($.browseRwardResult)))) : (Ii1lI++, console.log("广告浏览任务结果:   " + JSON.stringify($.browseResult)));
    }
    Ii1lI > 0 ? console.log("【广告浏览】完成" + I1I1 + "个,失败" + Ii1lI + ",获得" + I1IIII + "g💧\\n") : console.log("【广告浏览】完成" + I1I1 + "个,获得" + I1IIII + "g💧\n");
  } else console.log("今天已经做过浏览广告任务\n");
  !$.farmTask?.["gotThreeMealInit"]?.["f"] ? (await I111iI(), $.threeMeal?.["code"] === "0" ? console.log("【定时领水】获得" + $.threeMeal?.["amount"] + "g💧\n") : console.log("定时领水成功结果:  " + JSON.stringify($.threeMeal))) : console.log("当前不在定时领水时间断或者已经领过\n");
  !$.farmTask?.["waterFriendTaskInit"]["f"] ? $.farmTask?.["waterFriendTaskInit"]?.["waterFriendCountKey"] < $.farmTask?.["waterFriendTaskInit"]?.["waterFriendMax"] && (await iIill()) : console.log("给" + $.farmTask?.["waterFriendTaskInit"]?.["waterFriendMax"] + "个好友浇水任务已完成\n");
  await IlIii();
  await i1i1li();
  await iI11i1();
  await IlIil();
  await I1ii11();
}
async function IlIii() {
  await l1IllI();
  const lI1l = $.farmTask["treasureBoxInit-getBean"];
  if (!lI1l) {
    console.log("此帐号不支持去首页逛逛“领京豆”任务");
    return;
  }
  !lI1l.f ? (console.log("正在进行任务：" + lI1l?.["taskMainTitle"]), await IIil1I(1), $.treasureResult?.["code"] == "0" && (await l1Ilii(), await $.wait(1000), await IIil1I(2), $.treasureRwardResult?.["code"] == "0" ? console.log("领取" + lI1l?.["taskMainTitle"] + "奖励：" + $.treasureRwardResult?.["waterGram"] + "g水滴") : console.log("领取" + lI1l?.["taskMainTitle"] + "奖励失败"))) : console.log(lI1l?.["taskMainTitle"] + " 已完成");
}
async function iI11lI() {
  await Il1iiI();
  $.gotNewUserTaskForFarmResult?.["code"] === "0" ? console.log("领取回归礼包成功，" + $.gotNewUserTaskForFarmResult?.["addEnergy"] + "g") : console.log("领取回归礼包失败：" + JSON.stringify($.gotNewUserTaskForFarmResult));
}
async function II1i11() {
  console.log("开始预测水果成熟时间\n");
  await iIil1();
  await l1IllI();
  let il1Ili = $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"];
  iliili += "【今日共浇水】" + il1Ili + "次\n";
  iliili += "【剩余 水滴】" + $.farmInfo?.["farmUserPro"]?.["totalEnergy"] + "g💧\n";
  iliili += "【水果🍉进度】" + ($.farmInfo?.["farmUserPro"]?.["treeEnergy"] / $.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] * 100).toFixed(2) + "%，已浇水" + $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10 + "次,还需" + ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) / 10 + "次\n";
  if ($.farmInfo?.["toFlowTimes"] > $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) iliili += "【开花进度】再浇水" + ($.farmInfo?.["toFlowTimes"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) + "次开花\n";else $.farmInfo?.["toFruitTimes"] > $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10 && (iliili += "【结果进度】再浇水" + ($.farmInfo?.["toFruitTimes"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) + "次结果\n");
  let i1IlI1 = ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] - $.farmInfo?.["farmUserPro"]?.["totalEnergy"]) / 10,
    IIlIli = Math.ceil(i1IlI1 / il1Ili);
  iliili += "【预测】" + (IIlIli === 1 ? "明天" : IIlIli === 2 ? "后天" : IIlIli + "天之后") + "(" + lIi1Il(24 * 60 * 60 * 1000 * IIlIli + Date.now()) + "日)可兑换水果🍉";
}
async function IlillI() {
  Ililli = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : Ililli;
  $.isNode() && process.env.FRUIT_BEAN_CARD && (Ililli = process.env.FRUIT_BEAN_CARD);
  await iIili();
  const {
    fastCard: IIlIil,
    doubleCard: l11llI,
    beanCard: i1IlIi,
    signCard: i1IlIl
  } = $.myCardInfoRes;
  if ("" + Ililli === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍") && i1IlIi > 0) {
    console.log("您设置的是使用水滴换豆卡，且背包有水滴换豆卡" + i1IlIi + "张, 跳过10次浇水任务");
    return;
  }
  if ($.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"]) {
    console.log("\n准备浇水十次");
    let ll1l1I = 0;
    Ililll = false;
    for (; ll1l1I < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"] - $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"]; ll1l1I++) {
      console.log("第" + (ll1l1I + 1) + "次浇水");
      await IlIll();
      await $.wait(2000);
      console.log("本次浇水结果:   " + JSON.stringify($.waterResult));
      if ($.waterResult?.["code"] === "0") {
        console.log("剩余水滴" + $.waterResult?.["totalEnergy"] + "g");
        if ($.waterResult?.["finished"]) {
          Ililll = true;
          break;
        } else {
          if ($.waterResult?.["totalEnergy"] < 10) {
            console.log("水滴不够，结束浇水");
            break;
          }
          await I1liI1();
        }
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }
    Ililll && (I111ii["open-url"] = IIil1l, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", I111ii), $.done(), $.isNode() && (await liiI.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
  } else console.log("\n今日已完成10次浇水任务\n");
}
async function I111l1() {
  await l1IllI();
  if (!$.farmTask?.["firstWaterInit"]["f"] && $.farmTask?.["firstWaterInit"]?.["totalWaterTimes"] > 0) {
    await lIl1i1();
    $.firstWaterReward?.["code"] === "0" ? console.log("【首次浇水奖励】获得" + $.firstWaterReward?.["amount"] + "g💧\n") : console.log("领取首次浇水奖励结果:  " + JSON.stringify($.firstWaterReward));
  } else console.log("首次浇水奖励已领取\n");
}
async function iIliII() {
  if (!$.farmTask?.["totalWaterTaskInit"]?.["f"] && $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] >= $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"]) await I111i1(), $.totalWaterReward?.["code"] === "0" ? console.log("【十次浇水奖励】获得" + $.totalWaterReward?.["totalWaterTaskEnergy"] + "g💧\n") : console.log("领取10次浇水奖励结果:  " + JSON.stringify($.totalWaterReward));else $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"] && console.log("【十次浇水奖励】任务未完成，今日浇水" + $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] + "次\n");
  console.log("finished 水果任务完成!");
}
async function iIii1I() {
  console.log("开始检查剩余水滴能否再次浇水再次浇水\n");
  await iIil1();
  let I1IIl = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  console.log("剩余水滴" + I1IIl + "g\n");
  await iIili();
  const {
    fastCard: i1iiIi,
    doubleCard: iiliII,
    beanCard: i1iiIl,
    signCard: I11llI
  } = $.myCardInfoRes;
  console.log("背包已有道具:\n快速浇水卡:" + (i1iiIi === -1 ? "未解锁" : i1iiIi + "张") + "\n水滴翻倍卡:" + (iiliII === -1 ? "未解锁" : iiliII + "张") + "\n水滴换京豆卡:" + (i1iiIl === -1 ? "未解锁" : i1iiIl + "张") + "\n加签卡:" + (I11llI === -1 ? "未解锁" : I11llI + "张") + "\n");
  if (I1IIl >= 100 && iiliII > 0) {
    for (let lili1i = 0; lili1i < new Array(iiliII).fill("").length; lili1i++) {
      await i11l1I("doubleCard");
      console.log("使用翻倍水滴卡结果:" + JSON.stringify($.userMyCardRes));
    }
    await iIil1();
    I1IIl = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  }
  if (I11llI > 0) {
    for (let iI1Ii = 0; iI1Ii < new Array(I11llI).fill("").length; iI1Ii++) {
      await i11l1I("signCard");
      console.log("使用加签卡结果:" + JSON.stringify($.userMyCardRes));
    }
    await iIil1();
    I1IIl = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  }
  Ililli = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : Ililli;
  if ($.isNode() && process.env.FRUIT_BEAN_CARD) {
    Ililli = process.env.FRUIT_BEAN_CARD;
  }
  if ("" + Ililli === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍")) {
    console.log("\n您设置的是水滴换豆功能,现在为您换豆");
    if (I1IIl >= 100 && $.myCardInfoRes?.["beanCard"] > 0) {
      await i11l1I("beanCard");
      console.log("使用水滴换豆卡结果:" + JSON.stringify($.userMyCardRes));
      if ($.userMyCardRes.code === "0") {
        iliili += "【水滴换豆卡】获得" + $.userMyCardRes?.["beanCount"] + "个京豆\n";
        return;
      }
    } else console.log("您目前水滴:" + I1IIl + "g,水滴换豆卡" + $.myCardInfoRes?.["beanCard"] + "张,暂不满足水滴换豆的条件,为您继续浇水");
  }
  if (I1IIl < I1liII) {
    console.log("保留水滴不足,停止继续浇水");
    return;
  }
  let I1IIi = I1IIl - I1liII;
  if (I1IIi >= $.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) {
    Ililll = false;
    for (let II1iIi = 0; II1iIi < ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) / 10; II1iIi++) {
      await IlIll();
      console.log("本次浇水结果(水果马上就可兑换了):   " + JSON.stringify($.waterResult));
      if ($.waterResult?.["code"] === "0") {
        console.log("\n浇水10g成功\n");
        if ($.waterResult?.["finished"]) {
          Ililll = true;
          break;
        } else console.log("目前水滴【" + $.waterResult?.["totalEnergy"] + "】g,继续浇水，水果马上就可以兑换了");
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }
    Ililll && (I111ii["open-url"] = IIil1l, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", I111ii), $.done(), $.isNode() && (await liiI.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
  } else {
    if (I1IIi >= 10) {
      console.log("目前剩余水滴：【" + I1IIl + "】g，可继续浇水");
      Ililll = false;
      for (let Illi = 0; Illi < parseInt(I1IIi / 10); Illi++) {
        await IlIll();
        console.log("本次浇水结果:   " + JSON.stringify($.waterResult));
        if ($.waterResult?.["code"] === "0") {
          console.log("\n浇水10g成功,剩余" + $.waterResult?.["totalEnergy"] + "\n");
          if ($.waterResult?.["finished"]) {
            Ililll = true;
            break;
          } else await I1liI1();
        } else {
          console.log("浇水出现失败异常,跳出不在继续浇水");
          break;
        }
      }
      Ililll && (I111ii["open-url"] = IIil1l, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", I111ii), $.done(), $.isNode() && (await liiI.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
    } else console.log("目前剩余水滴：【" + I1IIl + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
  }
}
function I1liI1() {
  return new Promise(async ill1i => {
    if ($.waterResult?.["waterStatus"] === 0 && $.waterResult?.["treeEnergy"] === 10) {
      console.log("果树发芽了,奖励30g水滴");
      await iil1Il("1");
      console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
      $.gotStageAwardForFarmRes?.["code"] === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "\n");
    } else {
      if ($.waterResult?.["waterStatus"] === 1) console.log("果树开花了,奖励40g水滴"), await iil1Il("2"), console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "g💧\n");else $.waterResult?.["waterStatus"] === 2 && (console.log("果树长出小果子啦, 奖励50g水滴"), await iil1Il("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "g💧\n"));
    }
    ill1i();
  });
}
async function I1ii11() {
  await liil();
  if ($.initForTurntableFarmRes.code === "0") {
    let {
      timingIntervalHours: I11lil,
      timingLastSysTime: Ili1li,
      sysTime: lIlIil,
      timingGotStatus: I11lii,
      remainLotteryTimes: li1Ill,
      turntableInfos: Ili1ll
    } = $.initForTurntableFarmRes;
    !I11lii ? (console.log("是否到了领取免费赠送的抽奖机会----" + (lIlIil > Ili1li + 60 * 60 * I11lil * 1000)), lIlIil > Ili1li + 60 * 60 * I11lil * 1000 ? (await IlIli(), console.log("领取定时奖励结果" + JSON.stringify($.timingAwardRes)), await liil(), li1Ill = $.initForTurntableFarmRes?.["remainLotteryTimes"]) : console.log("免费赠送的抽奖机会未到时间")) : console.log("4小时候免费赠送的抽奖机会已领取");
    if ($.initForTurntableFarmRes?.["turntableBrowserAds"] && $.initForTurntableFarmRes?.["turntableBrowserAds"]["length"] > 0) {
      for (let iiiiIi = 0; iiiiIi < $.initForTurntableFarmRes?.["turntableBrowserAds"]["length"]; iiiiIi++) {
        if (!$.initForTurntableFarmRes?.["turntableBrowserAds"][iiiiIi]["status"]) {
          console.log("开始浏览天天抽奖的第" + (iiiiIi + 1) + "个逛会场任务");
          await liIIIl(1, $.initForTurntableFarmRes?.["turntableBrowserAds"][iiiiIi]["adId"]);
          if ($.browserForTurntableFarmRes?.["code"] === "0" && $.browserForTurntableFarmRes?.["status"]) {
            console.log("第" + (iiiiIi + 1) + "个逛会场任务完成，开始领取水滴奖励\n");
            await liIIIl(2, $.initForTurntableFarmRes?.["turntableBrowserAds"][iiiiIi]["adId"]);
            $.browserForTurntableFarmRes?.["code"] === "0" && (console.log("第" + (iiiiIi + 1) + "个逛会场任务领取水滴奖励完成\n"), await liil(), li1Ill = $.initForTurntableFarmRes?.["remainLotteryTimes"]);
          }
        } else console.log("浏览天天抽奖的第" + (iiiiIi + 1) + "个逛会场任务已完成");
      }
    }
    console.log("---天天抽奖次数----" + li1Ill + "次");
    if (li1Ill > 0) {
      console.log("开始抽奖");
      let iiIIli = "";
      for (let iili = 0; iili < new Array(li1Ill).fill("").length; iili++) {
        await i11l11();
        console.log("第" + (iili + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));
        if ($.lotteryRes?.["code"] === "0") {
          Ili1ll.map(ilIIl => {
            if (ilIIl.type === $.lotteryRes?.["type"]) {
              console.log("lotteryRes.type" + $.lotteryRes.type);
              if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") iiIIli += ilIIl.name + "个，";else $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? iiIIli += ilIIl.name + "，" : iiIIli += ilIIl.name + "，";
            }
          });
          if ($.lotteryRes?.["remainLotteryTimes"] === 0) break;
        }
      }
      iiIIli && console.log("【天天抽奖】" + iiIIli.substr(0, iiIIli.length - 1) + "\n");
    } else console.log("天天抽奖--抽奖机会为0次");
  } else console.log("初始化天天抽奖得好礼失败");
}
async function IlIil() {
  await iil1II();
  if ($.farmAssistResult?.["code"] === "0") {
    if ($.farmAssistResult?.["assistFriendList"] && $.farmAssistResult?.["assistFriendList"]?.["length"] >= 2) {
      if ($.farmAssistResult?.["status"] === 2) {
        let iIlIil = 0;
        for (let IIlll1 of Object.keys($.farmAssistResult.assistStageList)) {
          let Il1l1i = $.farmAssistResult?.["assistStageList"][IIlll1];
          Il1l1i.stageStaus === 2 && (await iii11I(), $.receiveStageEnergy.code === "0" && (console.log("已成功领取第" + (IIlll1 + 1) + "阶段好友助力奖励：【" + $.receiveStageEnergy?.["amount"] + "】g水"), iIlIil += $.receiveStageEnergy?.["amount"]));
        }
        iliili += "【额外奖励】" + iIlIil + "g水领取成功\n";
      } else $.farmAssistResult?.["status"] === 3 && (console.log("已经领取过8好友助力额外奖励"), iliili += "【额外奖励】已被领取过\n");
    } else console.log("助力好友未达到2个"), iliili += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";
    if ($.farmAssistResult?.["assistFriendList"] && $.farmAssistResult?.["assistFriendList"]["length"] > 0) {
      let I1II11 = "";
      $.farmAssistResult?.["assistFriendList"]["map"]((iI1, I111Il) => {
        I111Il === $.farmAssistResult?.["assistFriendList"]["length"] - 1 ? I1II11 += iI1.nickName || "匿名用户" : I1II11 += (iI1.nickName || "匿名用户") + ",";
        let lIl1I = new Date(iI1.time),
          I111Ii = lIl1I.getFullYear() + "-" + (lIl1I.getMonth() + 1) + "-" + lIl1I.getDate() + " " + lIl1I.getHours() + ":" + lIl1I.getMinutes() + ":" + lIl1I.getMinutes();
        console.log("\n京东昵称【" + (iI1.nickName || "匿名用户") + "】 在 " + I111Ii + " 给您助过力\n");
      });
      iliili += "【助力您的好友】" + I1II11 + "\n";
    }
    console.log("领取额外奖励水滴结束\n");
  } else {
    await lIl1iI();
    if ($.masterHelpResult?.["code"] === "0") {
      $.masterHelpResult?.["masterHelpPeoples"] && $.masterHelpResult?.["masterHelpPeoples"]["length"] >= 5 ? !$.masterHelpResult?.["masterGotFinal"] ? (await IIllI1(), $.masterGotFinished?.["code"] === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished?.["amount"] + "】g水"), iliili += "【额外奖励】" + $.masterGotFinished?.["amount"] + "g水领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), iliili += "【额外奖励】已被领取过\n") : (console.log("助力好友未达到5个"), iliili += "【额外奖励】领取失败,原因：给您助力的人未达5个\n");
      if ($.masterHelpResult?.["masterHelpPeoples"] && $.masterHelpResult?.["masterHelpPeoples"]["length"] > 0) {
        let ilIiii = "";
        $.masterHelpResult?.["masterHelpPeoples"]["map"]((ilIiil, iII) => {
          iII === $.masterHelpResult?.["masterHelpPeoples"]["length"] - 1 ? ilIiii += ilIiil.nickName || "匿名用户" : ilIiii += (ilIiil.nickName || "匿名用户") + ",";
          let l11IlI = new Date(ilIiil.time),
            lIIl = l11IlI.getFullYear() + "-" + (l11IlI.getMonth() + 1) + "-" + l11IlI.getDate() + " " + l11IlI.getHours() + ":" + l11IlI.getMinutes() + ":" + l11IlI.getMinutes();
          console.log("\n京东昵称【" + (ilIiil.nickName || "匿名用户") + "】 在 " + lIIl + " 给您助过力\n");
        });
        iliili += "【助力您的好友】" + ilIiii + "\n";
      }
      console.log("领取额外奖励水滴结束\n");
    }
  }
}
async function iI11i1() {
  let l11Il1 = !$.farmTask?.["waterRainInit"]?.["f"];
  if (l11Il1) {
    console.log("水滴雨任务，每天两次，最多可得10g水滴");
    console.log("两次水滴雨任务是否全部完成：" + ($.farmTask?.["waterRainInit"]?.["f"] ? "是" : "否"));
    $.farmTask?.["waterRainInit"]?.["lastTime"] && Date.now() < $.farmTask?.["waterRainInit"]?.["lastTime"] + 3 * 60 * 60 * 1000 && (l11Il1 = false, console.log("【第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次水滴雨】未到时间，请" + new Date($.farmTask?.["waterRainInit"]?.["lastTime"] + 3 * 60 * 60 * 1000).toLocaleTimeString() + "再试\n"));
    l11Il1 && (console.log("开始水滴雨任务,这是第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次，剩余" + (2 - ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1)) + "次"), await l1IliI(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain?.["addEnergy"] + "g"), console.log("【第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次水滴雨】获得" + $.waterRain?.["addEnergy"] + "g水滴\n")));
  } else {}
}
async function i1i1li() {
  console.log("开始打卡领水活动（签到，关注，领券）");
  await liIIIi();
  if ($.clockInInit.code === "0") {
    if (!$.clockInInit.todaySigned) {
      console.log("开始今日签到");
      await iIilI();
      console.log("打卡结果" + JSON.stringify($.clockInForFarmRes));
      if ($.clockInForFarmRes?.["code"] === "0") {
        console.log("【第" + $.clockInForFarmRes?.["signDay"] + "天签到】获得" + $.clockInForFarmRes?.["amount"] + "g💧\n");
        if ($.clockInForFarmRes?.["signDay"] === 7) {
          console.log("开始领取--惊喜礼包38g水滴");
          await iliilI();
          $.gotClockInGiftRes?.["code"] === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes?.["amount"] + "g💧\n");
        }
      }
    }
    $.clockInInit?.["todaySigned"] && $.clockInInit?.["totalSigned"] === 7 && (console.log("开始领取--惊喜礼包38g水滴"), await iliilI(), $.gotClockInGiftRes?.["code"] === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes?.["amount"] + "g💧\n"));
    if ($.clockInInit?.["themes"] && $.clockInInit?.["themes"]["length"] > 0) for (let IIiIi1 of $.clockInInit?.["themes"]) {
      !IIiIi1?.["hadGot"] && (console.log("关注ID" + IIiIi1?.["id"]), await liii(IIiIi1?.["id"], "theme", "1"), console.log("themeStep1--结果" + JSON.stringify($.themeStep1)), $.themeStep1?.["code"] === "0" && (await liii(IIiIi1.id, "theme", "2"), console.log("themeStep2--结果" + JSON.stringify($.themeStep2)), $.themeStep2.code === "0" && console.log("关注" + IIiIi1.name + "，获得水滴" + $.themeStep2?.["amount"] + "g")));
    }
    if ($.clockInInit?.["venderCoupons"] && $.clockInInit?.["venderCoupons"]["length"] > 0) for (let I1i1 of $.clockInInit?.["venderCoupons"]) {
      !I1i1.hadGot && (console.log("领券的ID" + I1i1.id), await liii(I1i1.id, "venderCoupon", "1"), console.log("venderCouponStep1--结果" + JSON.stringify($.venderCouponStep1)), $.venderCouponStep1?.["code"] === "0" && (await liii(I1i1.id, "venderCoupon", "2"), $.venderCouponStep2?.["code"] === "0" && (console.log("venderCouponStep2--结果" + JSON.stringify($.venderCouponStep2)), console.log("从" + I1i1.name + "领券，获得水滴" + $.venderCouponStep2?.["amount"] + "g"))));
    }
  }
  console.log("开始打卡领水活动（签到，关注，领券）结束\n");
}
async function iIill() {
  await lIi1Ii();
  console.log("开始给好友浇水...");
  await l1IllI();
  const {
    waterFriendCountKey: iiIlII,
    waterFriendMax: il11II
  } = $.farmTask?.["waterFriendTaskInit"];
  console.log("今日已给" + iiIlII + "个好友浇水");
  if (iiIlII < il11II) {
    let IiI111 = [];
    if ($.friendList?.["friends"] && $.friendList?.["friends"]["length"] > 0) {
      $.friendList.friends.map((iIiIIl, iIiIIi) => {
        iIiIIl.friendState === 1 && IiI111.length < il11II - iiIlII && IiI111.push(iIiIIl.shareCode);
      });
      console.log("需要浇水的好友列表shareCodes:" + JSON.stringify(IiI111));
      let i11llI = 0,
        iIIi1 = "";
      for (let iI1i11 = 0; iI1i11 < IiI111.length; iI1i11++) {
        await IIiIII(IiI111[iI1i11]);
        console.log("为第" + (iI1i11 + 1) + "个好友浇水结果:" + JSON.stringify($.waterFriendForFarmRes) + "\n");
        if ($.waterFriendForFarmRes?.["code"] === "0") {
          i11llI++;
          if ($.waterFriendForFarmRes?.["cardInfo"]) {
            console.log("为好友浇水获得道具了");
            if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "beanCard") console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), iIIi1 += "水滴换豆卡,";else {
              if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), iIIi1 += "快速浇水卡,";else {
                if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), iIIi1 += "水滴翻倍卡,";else $.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), iIIi1 += "加签卡,");
              }
            }
          }
        } else $.waterFriendForFarmRes?.["code"] === "11" && console.log("水滴不够,跳出浇水");
      }
      console.log("【好友浇水】已给" + i11llI + "个好友浇水,消耗" + i11llI * 10 + "g水\n");
      iIIi1 && iIIi1.length > 0 && console.log("【好友浇水奖励】" + iIIi1.substr(0, iIIi1.length - 1) + "\n");
    } else console.log("您的好友列表暂无好友,快去邀请您的好友吧!");
  } else console.log("今日已为好友浇水量已达" + il11II + "个");
}
async function iil1Ii() {
  await l1IllI();
  const {
    waterFriendCountKey: iIlIi,
    waterFriendMax: iIl111,
    waterFriendSendWater: i11lil,
    waterFriendGotAward: iilI1I
  } = $.farmTask.waterFriendTaskInit;
  if (iIlIi >= iIl111) !iilI1I ? (await l1Ilil(), console.log("领取给" + iIl111 + "个好友浇水后的奖励水滴::" + JSON.stringify($.waterFriendGotAwardRes)), $.waterFriendGotAwardRes?.["code"] === "0" && console.log("【给" + iIl111 + "好友浇水】奖励" + $.waterFriendGotAwardRes?.["addWater"] + "g水滴\n")) : console.log("给好友浇水的" + i11lil + "g水滴奖励已领取\n");else {
    console.log("暂未给" + iIl111 + "个好友浇水\n");
  }
}
async function iii11i() {
  for (let lIiiiI = 0; lIiiiI < 10; lIiiiI++) {
    await IIl11l();
    if ($.duckRes?.["code"] === "0") {
      if (!$.duckRes?.["hasLimit"]) console.log("小鸭子游戏:" + $.duckRes?.["title"]);else {
        console.log("" + $.duckRes?.["title"]);
        break;
      }
    } else {
      if ($.duckRes?.["code"] === "10") {
        console.log("小鸭子游戏达到上限");
        break;
      }
    }
  }
}
async function iii11l() {
  try {
    await iIil1();
    if ($.farmInfo.farmUserPro) console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo?.["farmUserPro"]?.["shareCode"] + "\n"), iI11il.push($.farmInfo.farmUserPro.shareCode);else {}
  } catch (IlIiil) {
    $.logErr(IlIiil);
  }
}
function l1Ilii() {
  return new Promise(i11li1 => {
    const IiIlII = {
      "url": "https://api.m.jd.com/client.action?functionId=beanTaskList",
      "body": "body=%7B%22viewChannel%22%3A%22AppHome%22%7D&build=167853&client=apple&clientVersion=10.2.0&d_brand=apple&d_model=iPhone11%2C8&ef=1&eid=eidIf12a8121eas2urxgGc%2BzS5%2BUYGu1Nbed7bq8YY%2BgPd0Q0t%2BiviZdQsxnK/HTA7AxZzZBrtu1ulwEviYSV3QUuw2XHHC%2BPFHdNYx1A/3Zt8xYR%2Bd3&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22ENS4AtO3EJS%3D%22%2C%22osVersion%22%3A%22CJGkDy4n%22%2C%22openudid%22%3A%22ENq3CzTwENGmYtc3ENSnYtC0DWTwCNdwZNcnZtYmEWU2ZwYnCwY0Cm%3D%3D%22%2C%22area%22%3A%22CJvpCJYmCV81CNS1EP82Ctq1EK%3D%3D%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1637625634%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%7D&isBackground=N&joycious=117&lang=zh_CN&networkType=4g&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=11&sign=778b3d3d83e0d3f45508a958f306abda&st=1637627411874&sv=101&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJ1DpIH6AlcMry0eQsMwEN/GgP2FpcEJvoNVODK8ho6G6xfFEYSmOOdwauVOUqIQFPdxhcdWdM05U%2BMN5h6umteQ78SpJGXOymjKiTiGjvSOiTpoqO8k%2BT6stsfe0WS9QQ41HfWeVF6cdpDTzsmufz0XDdJ6CcltPUazK5UqRSuo0UyDMBmw/oWg%3D%3D",
      "headers": {
        "Cookie": iil1I1,
        "Host": "api.m.jd.com",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
        "Accept-Encoding": "gzip,deflate,br",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $.post(IiIlII, (iI11i, I1Iili, ilIIII) => {
      try {
        iI11i ? (console.log("" + JSON.stringify(iI11i)), console.log($.name + " beanTaskList API请求失败，请检查网路重试")) : ilIIII = $.toObj(ilIIII);
      } catch (iI11l) {
        $.logErr(iI11l, I1Iili);
      } finally {
        i11li1();
      }
    });
  });
}
async function IIl11l() {
  $.duckRes = await iliI11("totalWaterTaskForFarm", {
    "type": 2,
    "version": 6,
    "channel": 2
  });
}
async function I111i1() {
  $.totalWaterReward = await iliI11("totalWaterTaskForFarm");
}
async function lIl1i1() {
  $.firstWaterReward = await iliI11("firstWaterTaskForFarm");
}
async function l1Ilil() {
  $.waterFriendGotAwardRes = await iliI11("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}
async function iIili() {
  $.myCardInfoRes = await iliI11("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}
async function i11l1I(lli1I) {
  $.userMyCardRes = await iliI11("userMyCardForFarm", {
    "cardType": lli1I
  });
}
async function iil1Il(IIllli) {
  $.gotStageAwardForFarmRes = await iliI11("gotStageAwardForFarm", {
    "type": IIllli
  });
}
async function IlIll() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await iliI11("waterGoodForFarm");
}
async function liil() {
  $.initForTurntableFarmRes = await iliI11("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function i11l11() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await iliI11("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}
async function IlIli() {
  $.timingAwardRes = await iliI11("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function liIIIl(lli11, IlIil1) {
  lli11 === 1 && console.log("浏览爆品会场");
  lli11 === 2 && console.log("天天抽奖浏览任务领取水滴");
  const l1I111 = {
    "type": lli11,
    "adId": IlIil1,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await iliI11("browserForTurntableFarm", l1I111);
}
async function iliil1(ll1ili) {
  const IiiiII = {
    "type": 2,
    "adId": ll1ili,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await iliI11("browserForTurntableFarm", IiiiII);
}
async function i1i1ll() {
  $.lotteryMasterHelpRes = await iliI11("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}
async function IIllI1() {
  $.masterGotFinished = await iliI11("masterGotFinishedTaskForFarm");
}
async function lIl1iI() {
  $.masterHelpResult = await iliI11("masterHelpTaskInitForFarm");
}
async function iil1II() {
  $.farmAssistResult = await iliI11("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function iii11I() {
  $.receiveStageEnergy = await iliI11("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function IIil11() {
  $.inviteFriendRes = await iliI11("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function iI11iI() {
  $.helpResult = await iliI11("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function l1IliI() {
  const IiiiIl = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await iliI11("waterRainForFarm", IiiiIl);
}
async function liIIIi() {
  $.clockInInit = await iliI11("clockInInitForFarm");
}
async function iIilI() {
  $.clockInForFarmRes = await iliI11("clockInForFarm", {
    "type": 1
  });
}
async function liii(I11Iil, l1liI1, I11Iii) {
  let l111l1 = {
    "id": I11Iil,
    "type": l1liI1,
    "step": I11Iii
  };
  if (l1liI1 === "theme") {
    if (I11Iii === "1") $.themeStep1 = await iliI11("clockInFollowForFarm", l111l1);else I11Iii === "2" && ($.themeStep2 = await iliI11("clockInFollowForFarm", l111l1));
  } else {
    if (l1liI1 === "venderCoupon") {
      if (I11Iii === "1") $.venderCouponStep1 = await iliI11("clockInFollowForFarm", l111l1);else I11Iii === "2" && ($.venderCouponStep2 = await iliI11("clockInFollowForFarm", l111l1));
    }
  }
}
async function iliilI() {
  $.gotClockInGiftRes = await iliI11("gotClockInGift", {
    "type": 2
  });
}
async function I111iI() {
  $.threeMeal = await iliI11("gotThreeMealForFarm");
}
async function IlIlI(l1llI, llilii) {
  if (llilii === 0) $.browseResult = await iliI11("browseAdTaskForFarm", {
    "advertId": l1llI,
    "type": llilii
  });else llilii === 1 && ($.browseRwardResult = await iliI11("browseAdTaskForFarm", {
    "advertId": l1llI,
    "type": llilii
  }));
}
async function IIil1I(Iilii) {
  const IiIlIl = {
    "type": Iilii,
    "babelChannel": "45",
    "line": "getBean",
    "version": 18,
    "channel": 1
  };
  if (Iilii === 1) $.treasureResult = await iliI11("ddnc_getTreasureBoxAward", IiIlIl);else Iilii === 2 && ($.treasureRwardResult = await iliI11("ddnc_getTreasureBoxAward", IiIlIl));
}
async function II1i1l() {
  $.goalResult = await iliI11("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function II1i1i() {
  $.signResult = await iliI11("signForFarm");
}
async function Il1iiI() {
  const il1lli = {
    "babelChannel": "10",
    "version": 24,
    "lat": IIllIi,
    "lng": i1i1lI
  };
  $.gotNewUserTaskForFarmResult = await iliI11("gotNewUserTaskForFarm", il1lli);
}
async function iIil1() {
  $.farmInfo = await iliI11("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": iIliI1,
    "un_area": iIii11,
    "version": 22,
    "lat": IIllIi,
    "lng": i1i1lI,
    "channel": 1
  });
}
async function l1IllI() {
  console.log("\n初始化任务列表");
  $.farmTask = await iliI11("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function lIi1Ii() {
  $.friendList = await iliI11("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}
async function iiilII() {
  $.awardInviteFriendRes = await iliI11("awardInviteFriendForFarm");
}
async function IIiIII(ll1I1I) {
  const IlII11 = {
    "shareCode": ll1I1I,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await iliI11("waterFriendForFarm", IlII11);
}
async function lili() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + I1ii1I === "false";
  if ($.ctrTemp) {
    $.msg($.name, iliill, iliili, I111ii);
    if ($.isNode()) {
      I111il += iliill + "\n" + iliili + ($.index !== IIllII.length ? "\n" : "");
    }
  } else $.log("" + iliili);
}
function lIi1Il(lIiil1) {
  let I11IlI;
  if (lIiil1) I11IlI = new Date(lIiil1);else {
    I11IlI = new Date();
  }
  return I11IlI.getFullYear() + "-" + (I11IlI.getMonth() + 1 >= 10 ? I11IlI.getMonth() + 1 : "0" + (I11IlI.getMonth() + 1)) + "-" + (I11IlI.getDate() >= 10 ? I11IlI.getDate() : "0" + I11IlI.getDate());
}
function Ii1lII() {
  return new Promise(l1IlI => {
    console.log("开始获取配置文件\n");
    liiI = $.isNode() ? require("./sendNotify") : "";
    const IiliI1 = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(IiliI1).forEach(iiiii1 => {
        IiliI1[iiiii1] && IIllII.push(IiliI1[iiiii1]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else IIllII = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IliliI($.getdata("CookiesJD") || "[]").map(iIII => iIII.cookie)].filter(iI1I1 => !!iI1I1);
    console.log("共" + IIllII.length + "个京东账号\n");
    $.shareCodesArr = [];
    l1IlI();
  });
}
function iliI11(Ii11iI, IiliII = {}, Iiii1I = 1000) {
  return new Promise(iiIllI => {
    setTimeout(async () => {
      $.post(await liIl1I(Ii11iI, IiliII), (i1II11, l1Ill, lllllI) => {
        try {
          i1II11 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(i1II11)), console.log("function_id:" + Ii11iI), $.logErr(i1II11)) : ii1iI1(lllllI) && (lllllI = JSON.parse(lllllI));
        } catch (Iiii1l) {
          $.logErr(Iiii1l, l1Ill);
        } finally {
          iiIllI(lllllI);
        }
      });
    }, Iiii1I);
  });
}
function ii1iI1(Iiii1i) {
  if (!Iiii1i) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(Iiii1i) == "object") return true;
  } catch (iII1) {
    return console.log(iII1), false;
  }
}
const ll111I = {
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
async function liIl1I(lIll1l, Il1lIl = {}) {
  let I1I11 = "";
  if (!ll111I[lIll1l]) I1I11 = "https://api.m.jd.com/client.action?functionId=" + lIll1l + "&body=" + encodeURIComponent(JSON.stringify(Il1lIl)) + "&appid=wh5";else {
    const I1I1i = {
        "appid": "signed_wh5",
        "client": "iOS",
        "clientVersion": "10.1.0",
        "functionId": lIll1l,
        "body": Il1lIl
      },
      iiiiii = await IIl111(ll111I[lIll1l], I1I1i);
    I1I11 = "https://api.m.jd.com/client.action?" + iiiiii;
  }
  return {
    "url": I1I11,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      "Cookie": iil1I1
    },
    "timeout": 10000
  };
}
async function IIl111(iiiiil, l1Il11) {
  try {
    let ilii1i = new IIil1i({
      "appId": iiiiil,
      "appid": "signed_wh5",
      "clientVersion": l1Il11?.["clientVersion"],
      "client": l1Il11?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await ilii1i.genAlgo(), body = await ilii1i.genUrlParams(l1Il11.functionId, l1Il11.body), body;
  } catch (IiliIl) {}
}
async function lill(ilii1l, llllii) {
  let illiII = {
      "searchParams": {
        ...llllii,
        "appId": ilii1l
      },
      "pt_pin": $.UserName,
      "client": llllii?.["client"],
      "clientVersion": llllii?.["clientVersion"]
    },
    li1IIl = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    llllil = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(illiII),
      "headers": li1IIl,
      "timeout": 30000
    };
  return new Promise(async IIl1li => {
    $.post(llllil, (Ii11ll, ilil1, llII) => {
      let lIiI1I = "";
      try {
        if (Ii11ll) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          llII = JSON.parse(llII);
          console.log(JSON.stringify(llII));
          if (typeof llII === "object" && llII && llII.body) {
            if (llII.body) lIiI1I = llII || "";
          } else {
            if (llII.code == 400) console.log("\n" + llII.msg);else {
              console.log("\n可能连接不上接口，请检查网络");
            }
          }
        }
      } catch (l1Il1I) {
        $.logErr(l1Il1I, ilil1);
      } finally {
        IIl1li(Ill1lI(lIiI1I));
      }
    });
  });
}
function Ill1lI(Il111i, IIl1l1 = {}) {
  let il1I = [],
    IIili1 = IIl1l1.connector || "&",
    Ii11li = Object.keys(Il111i);
  if (IIl1l1.sort) Ii11li = Ii11li.sort();
  for (let I11lIl of Ii11li) {
    let iliii = Il111i[I11lIl];
    if (iliii && typeof iliii === "object") iliii = JSON.stringify(iliii);
    if (iliii && IIl1l1.encode) iliii = encodeURIComponent(iliii);
    il1I.push(I11lIl + "=" + iliii);
  }
  return il1I.join(IIili1);
}
function Ii1lI1(lIlIIl, I11lIi = "qwertyuiopasdfghjklzxcvbnm") {
  let IIl1i1 = "";
  for (let iII1li = 0; iII1li < lIlIIl; iII1li++) {
    IIl1i1 += I11lIi[Math.floor(Math.random() * I11lIi.length)];
  }
  return IIl1i1;
}
function IliliI(lIiii) {
  if (typeof lIiii == "string") try {
    return JSON.parse(lIiii);
  } catch (li1l1i) {
    return console.log(li1l1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}