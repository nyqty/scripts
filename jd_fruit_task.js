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

需要关闭通知 在第39行  false  改成  true

*/
const Env=require('./utils/Env.js');
const $ = new Env('东东农场日常任务');
let cookiesArr = [],
    cookie = '',
    jdFruitShareArr = [],
    isBox = false,
    notify,
    newShareCodes,
    allMessage = '';
let shareCodes = [];
let message = '',
    subTitle = '',
    option = {},
    isFruitFinished = false;
const retainWater = $.isNode() ? (process.env.retainWater ? process.env.retainWater : 100) : $.getdata('retainWater') ? $.getdata('retainWater') : 100; //保留水滴大于多少g,默认100g;
let jdNotify = false; //是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false; //农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水
let randomCount = $.isNode() ? 20 : 5;
let iilii1l = process.env.jd_fruit_Water === "true" ? true : false;
const Ill1IIii = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
  IIiii1iI = require("./function/jdCommon"),
  lIIillII = require("./utils/h5st.js");
let I1ll1liI = l1liii(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  iIlIllIi = l1liii(2, "1234567890") + "-" + l1liii(4, "1234567890") + "-" + l1liii(4, "1234567890") + "-" + l1liii(5, "1234567890"),
  l1iiIii1 = "106.475" + Math.floor(Math.random() * 899 + 100),
  IlIlIiii = "29.503" + Math.floor(Math.random() * 899 + 100),
  iilI1III = 0;
!(async () => {
  await ll1I11l1();
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("\n【若多次提示403，务必更换IP运行.....】\n");
  for (let Iilli1 = 0; Iilli1 < cookiesArr.length; Iilli1++) {
    if (cookiesArr[Iilli1]) {
      cookie = cookiesArr[Iilli1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Iilli1 + 1;
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
      message = "";
      subTitle = "";
      option = {};
      $.UA = IIiii1iI.genUA($.UserName);
      $.retry = 0;
      iilI1III++;
      await ilii1i1I();
      iilI1III == 5 && (console.log("\n【访问接口次数达到5次，休息30秒.....】\n"), await $.wait(30 * 1000), iilI1III = 0);
      await $.wait(10 * 1000);
    }
  }
  if ($.isNode() && allMessage && $.ctrTemp) {
    await notify.sendNotify("" + $.name, "" + allMessage);
  }
})().catch(IIIIi1ii => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + IIIIi1ii + "!", "");
}).finally(() => {
  $.done();
});
async function ilii1i1I() {
  subTitle = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await ilIllI1();
    if ($.farmInfo?.["farmUserPro"]) {
      message = "【水果名称】" + $.farmInfo?.["farmUserPro"]?.["name"] + "\n";
      console.log("\n【已成功兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n");
      message += "【已兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n";
      if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
        option["open-url"] = Ill1IIii;
        $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option);
        $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看"));
        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) console.log("\n当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）\n");else {
          if ($.farmInfo?.["treeState"] === 0) {
            option["open-url"] = Ill1IIii;
            $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达", option);
            $.isNode() && (await notify.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果"));
            return;
          }
        }
      }
      await iiIIlili();
      !iilii1l ? await I11l1i1l() : console.log("默认浇水,不浇水设置变量export jd_fruit_Water='true'");
      await Ii11i1l();
      await Illi11Il();
      await I1i1II1I();
      $.farmInfo?.["newUserSendWater"] && (await i111I11l());
      await l11111Il();
      !process.env.DO_TEN_WATER_AGAIN ? (console.log("执行再次浇水"), await lll1Ii()) : console.log("不执行再次浇水，攒水滴");
      await I11III1I();
    } else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
      }
      if ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) {
        await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
      }
      $.retry < 1 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await ilii1i1I());
    }
  } catch (II111I11) {
    $.logErr(II111I11);
  }
  await il1llIi();
}
async function iiIIlili() {
  await IIii1lI();
  console.log("被水滴砸中： " + ($.farmInfo?.["todayGotWaterGoalTask"]?.["canPop"] ? "是" : "否"));
  $.farmInfo?.["todayGotWaterGoalTask"]?.["canPop"] && (await IlliI1il(), $.goalResult?.["code"] === "0" && console.log("【被水滴砸中】获得" + $.goalResult?.["addEnergy"] + "g💧\\n"));
  console.log("签到结束,开始广告浏览任务");
  if (!$.farmTask?.["gotBrowseTaskAdInit"]["f"]) {
    let iIlilI1 = $.farmTask?.["gotBrowseTaskAdInit"]?.["userBrowseTaskAds"],
      I1liilIl = 0,
      I1l111ll = 0,
      ilI1I = 0;
    for (let IiI1Il1 of iIlilI1) {
      if (IiI1Il1.limit <= IiI1Il1?.["hadFinishedTimes"]) {
        console.log(IiI1Il1?.["mainTitle"] + "+ ' 已完成");
        continue;
      }
      console.log("正在进行广告浏览任务: " + IiI1Il1?.["mainTitle"]);
      await IlIi11I(IiI1Il1?.["advertId"], 0);
      if ($.browseResult?.["code"] === "0") console.log(IiI1Il1?.["mainTitle"] + "浏览任务完成"), await IlIi11I(IiI1Il1?.["advertId"], 1), $.browseRwardResult?.["code"] === "0" ? (console.log("领取浏览" + IiI1Il1?.["mainTitle"] + "广告奖励成功,获得" + $.browseRwardResult?.["amount"] + "g"), I1liilIl += $.browseRwardResult?.["amount"], I1l111ll++) : (ilI1I++, console.log("领取浏览广告奖励结果:  " + JSON.stringify($.browseRwardResult)));else {
        ilI1I++;
        console.log("广告浏览任务结果:   " + JSON.stringify($.browseResult));
      }
    }
    ilI1I > 0 ? console.log("【广告浏览】完成" + I1l111ll + "个,失败" + ilI1I + ",获得" + I1liilIl + "g💧\\n") : console.log("【广告浏览】完成" + I1l111ll + "个,获得" + I1liilIl + "g💧\n");
  } else console.log("今天已经做过浏览广告任务\n");
  !$.farmTask?.["gotThreeMealInit"]?.["f"] ? (await ll1ll1ii(), $.threeMeal?.["code"] === "0" ? console.log("【定时领水】获得" + $.threeMeal?.["amount"] + "g💧\n") : console.log("定时领水成功结果:  " + JSON.stringify($.threeMeal))) : console.log("当前不在定时领水时间断或者已经领过\n");
  !$.farmTask?.["waterFriendTaskInit"]["f"] ? $.farmTask?.["waterFriendTaskInit"]?.["waterFriendCountKey"] < $.farmTask?.["waterFriendTaskInit"]?.["waterFriendMax"] && (await lIli1()) : console.log("给" + $.farmTask?.["waterFriendTaskInit"]?.["waterFriendMax"] + "个好友浇水任务已完成\n");
  await I1II1llI();
  await IIi11lll();
  await IIlliII();
  await il1l1lli();
  await illiiiI1();
}
async function I1II1llI() {
  await IIii1lI();
  const lIi1il1I = $.farmTask["treasureBoxInit-getBean"];
  if (!lIi1il1I) {
    console.log("此帐号不支持去首页逛逛“领京豆”任务");
    return;
  }
  !lIi1il1I.f ? (console.log("正在进行任务：" + lIi1il1I?.["taskMainTitle"]), await il1iIIi(1), $.treasureResult?.["code"] == "0" && (await illIiI(), await $.wait(1000), await il1iIIi(2), $.treasureRwardResult?.["code"] == "0" ? console.log("领取" + lIi1il1I?.["taskMainTitle"] + "奖励：" + $.treasureRwardResult?.["waterGram"] + "g水滴") : console.log("领取" + lIi1il1I?.["taskMainTitle"] + "奖励失败"))) : console.log(lIi1il1I?.["taskMainTitle"] + " 已完成");
}
async function i111I11l() {
  await ii1l1li();
  $.gotNewUserTaskForFarmResult?.["code"] === "0" ? console.log("领取回归礼包成功，" + $.gotNewUserTaskForFarmResult?.["addEnergy"] + "g") : console.log("领取回归礼包失败：" + JSON.stringify($.gotNewUserTaskForFarmResult));
}
async function I11III1I() {
  console.log("开始预测水果成熟时间\n");
  await ilIllI1();
  await IIii1lI();
  let iiI1iilI = $.farmTask?.["firstWaterInit"]?.["totalWaterTimes"];
  message += "【今日共浇水】" + iiI1iilI + "次\n";
  message += "【剩余 水滴】" + $.farmInfo?.["farmUserPro"]?.["totalEnergy"] + "g💧\n";
  message += "【水果🍉进度】" + ($.farmInfo?.["farmUserPro"]?.["treeEnergy"] / $.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] * 100).toFixed(2) + "%，已浇水" + $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10 + "次,还需" + ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) / 10 + "次\n";
  if ($.farmInfo?.["toFlowTimes"] > $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) {
    message += "【开花进度】再浇水" + ($.farmInfo?.["toFlowTimes"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) + "次开花\n";
  } else $.farmInfo?.["toFruitTimes"] > $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10 && (message += "【结果进度】再浇水" + ($.farmInfo?.["toFruitTimes"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) + "次结果\n");
  let ilIIiIii = ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] - $.farmInfo?.["farmUserPro"]?.["totalEnergy"]) / 10,
    IIlliI11 = Math.ceil(ilIIiIii / iiI1iilI);
  message += "【预测】" + (IIlliI11 === 1 ? "明天" : IIlliI11 === 2 ? "后天" : IIlliI11 + "天之后") + "(" + I1iII1i(24 * 60 * 60 * 1000 * IIlliI11 + Date.now()) + "日)可兑换水果🍉";
}
async function I11l1i1l() {
  jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
  $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
  await IIili1i1();
  const {
    fastCard: Il1IilI1,
    doubleCard: IiIi1I1i,
    beanCard: IlIliI1I,
    signCard: Iil111II
  } = $.myCardInfoRes;
  if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍") && IlIliI1I > 0) {
    console.log("您设置的是使用水滴换豆卡，且背包有水滴换豆卡" + IlIliI1I + "张, 跳过10次浇水任务");
    return;
  }
  if ($.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"]) {
    console.log("\n准备浇水十次");
    let llIi1I1 = 0;
    isFruitFinished = false;
    for (; llIi1I1 < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"] - $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"]; llIi1I1++) {
      console.log("第" + (llIi1I1 + 1) + "次浇水");
      await lllll1l();
      await $.wait(2000);
      console.log("本次浇水结果:   " + JSON.stringify($.waterResult));
      if ($.waterResult?.["code"] === "0") {
        console.log("剩余水滴" + $.waterResult?.["totalEnergy"] + "g");
        if ($.waterResult?.["finished"]) {
          isFruitFinished = true;
          break;
        } else {
          if ($.waterResult?.["totalEnergy"] < 10) {
            console.log("水滴不够，结束浇水");
            break;
          }
          await Ill1lii1();
        }
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }
    isFruitFinished && (option["open-url"] = Ill1IIii, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
  } else console.log("\n今日已完成10次浇水任务\n");
}
async function Ii11i1l() {
  await IIii1lI();
  !$.farmTask?.["firstWaterInit"]["f"] && $.farmTask?.["firstWaterInit"]?.["totalWaterTimes"] > 0 ? (await lIiIlliI(), $.firstWaterReward?.["code"] === "0" ? console.log("【首次浇水奖励】获得" + $.firstWaterReward?.["amount"] + "g💧\n") : console.log("领取首次浇水奖励结果:  " + JSON.stringify($.firstWaterReward))) : console.log("首次浇水奖励已领取\n");
}
async function Illi11Il() {
  if (!$.farmTask?.["totalWaterTaskInit"]?.["f"] && $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] >= $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"]) {
    await l1llI1iI();
    if ($.totalWaterReward?.["code"] === "0") {
      console.log("【十次浇水奖励】获得" + $.totalWaterReward?.["totalWaterTaskEnergy"] + "g💧\n");
    } else console.log("领取10次浇水奖励结果:  " + JSON.stringify($.totalWaterReward));
  } else $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"] && console.log("【十次浇水奖励】任务未完成，今日浇水" + $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] + "次\n");
  console.log("finished 水果任务完成!");
}
async function lll1Ii() {
  console.log("开始检查剩余水滴能否再次浇水再次浇水\n");
  await ilIllI1();
  let II1l1Iii = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  console.log("剩余水滴" + II1l1Iii + "g\n");
  await IIili1i1();
  const {
    fastCard: iliIll1I,
    doubleCard: Ii1iIl,
    beanCard: li1i1Iii,
    signCard: IiI1IIlI
  } = $.myCardInfoRes;
  console.log("背包已有道具:\n快速浇水卡:" + (iliIll1I === -1 ? "未解锁" : iliIll1I + "张") + "\n水滴翻倍卡:" + (Ii1iIl === -1 ? "未解锁" : Ii1iIl + "张") + "\n水滴换京豆卡:" + (li1i1Iii === -1 ? "未解锁" : li1i1Iii + "张") + "\n加签卡:" + (IiI1IIlI === -1 ? "未解锁" : IiI1IIlI + "张") + "\n");
  if (II1l1Iii >= 100 && Ii1iIl > 0) {
    for (let iIlIlIii = 0; iIlIlIii < new Array(Ii1iIl).fill("").length; iIlIlIii++) {
      await i11iiI1i("doubleCard");
      console.log("使用翻倍水滴卡结果:" + JSON.stringify($.userMyCardRes));
    }
    await ilIllI1();
    II1l1Iii = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  }
  if (IiI1IIlI > 0) {
    for (let I11l11I = 0; I11l11I < new Array(IiI1IIlI).fill("").length; I11l11I++) {
      await i11iiI1i("signCard");
      console.log("使用加签卡结果:" + JSON.stringify($.userMyCardRes));
    }
    await ilIllI1();
    II1l1Iii = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  }
  jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
  $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
  if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍")) {
    console.log("\n您设置的是水滴换豆功能,现在为您换豆");
    if (II1l1Iii >= 100 && $.myCardInfoRes?.["beanCard"] > 0) {
      await i11iiI1i("beanCard");
      console.log("使用水滴换豆卡结果:" + JSON.stringify($.userMyCardRes));
      if ($.userMyCardRes.code === "0") {
        message += "【水滴换豆卡】获得" + $.userMyCardRes?.["beanCount"] + "个京豆\n";
        return;
      }
    } else console.log("您目前水滴:" + II1l1Iii + "g,水滴换豆卡" + $.myCardInfoRes?.["beanCard"] + "张,暂不满足水滴换豆的条件,为您继续浇水");
  }
  if (II1l1Iii < retainWater) {
    console.log("保留水滴不足,停止继续浇水");
    return;
  }
  let Il1lIlil = II1l1Iii - retainWater;
  if (Il1lIlil >= $.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) {
    isFruitFinished = false;
    for (let lilll1i1 = 0; lilll1i1 < ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) / 10; lilll1i1++) {
      await lllll1l();
      console.log("本次浇水结果(水果马上就可兑换了):   " + JSON.stringify($.waterResult));
      if ($.waterResult?.["code"] === "0") {
        console.log("\n浇水10g成功\n");
        if ($.waterResult?.["finished"]) {
          isFruitFinished = true;
          break;
        } else console.log("目前水滴【" + $.waterResult?.["totalEnergy"] + "】g,继续浇水，水果马上就可以兑换了");
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }
    isFruitFinished && (option["open-url"] = Ill1IIii, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
  } else {
    if (Il1lIlil >= 10) {
      console.log("目前剩余水滴：【" + II1l1Iii + "】g，可继续浇水");
      isFruitFinished = false;
      for (let lii1lllI = 0; lii1lllI < parseInt(Il1lIlil / 10); lii1lllI++) {
        await lllll1l();
        console.log("本次浇水结果:   " + JSON.stringify($.waterResult));
        if ($.waterResult?.["code"] === "0") {
          console.log("\n浇水10g成功,剩余" + $.waterResult?.["totalEnergy"] + "\n");
          if ($.waterResult?.["finished"]) {
            isFruitFinished = true;
            break;
          } else await Ill1lii1();
        } else {
          console.log("浇水出现失败异常,跳出不在继续浇水");
          break;
        }
      }
      isFruitFinished && (option["open-url"] = Ill1IIii, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
    } else console.log("目前剩余水滴：【" + II1l1Iii + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
  }
}
function Ill1lii1() {
  return new Promise(async Ii1ii11i => {
    if ($.waterResult?.["waterStatus"] === 0 && $.waterResult?.["treeEnergy"] === 10) console.log("果树发芽了,奖励30g水滴"), await llilIill("1"), console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "\n");else {
      if ($.waterResult?.["waterStatus"] === 1) console.log("果树开花了,奖励40g水滴"), await llilIill("2"), console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "g💧\n");else $.waterResult?.["waterStatus"] === 2 && (console.log("果树长出小果子啦, 奖励50g水滴"), await llilIill("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "g💧\n"));
    }
    Ii1ii11i();
  });
}
async function illiiiI1() {
  await l1lII1il();
  if ($.initForTurntableFarmRes.code === "0") {
    let {
      timingIntervalHours: iIiIiIi1,
      timingLastSysTime: iiIiIIlI,
      sysTime: I11lii1l,
      timingGotStatus: Illli11l,
      remainLotteryTimes: liIiiIIl,
      turntableInfos: Ill111I1
    } = $.initForTurntableFarmRes;
    if (!Illli11l) {
      console.log("是否到了领取免费赠送的抽奖机会----" + (I11lii1l > iiIiIIlI + 60 * 60 * iIiIiIi1 * 1000));
      if (I11lii1l > iiIiIIlI + 60 * 60 * iIiIiIi1 * 1000) await liI1Iili(), console.log("领取定时奖励结果" + JSON.stringify($.timingAwardRes)), await l1lII1il(), liIiiIIl = $.initForTurntableFarmRes?.["remainLotteryTimes"];else {
        console.log("免费赠送的抽奖机会未到时间");
      }
    } else console.log("4小时候免费赠送的抽奖机会已领取");
    if ($.initForTurntableFarmRes?.["turntableBrowserAds"] && $.initForTurntableFarmRes?.["turntableBrowserAds"]["length"] > 0) {
      for (let lIll1l1 = 0; lIll1l1 < $.initForTurntableFarmRes?.["turntableBrowserAds"]["length"]; lIll1l1++) {
        if (!$.initForTurntableFarmRes?.["turntableBrowserAds"][lIll1l1]["status"]) {
          console.log("开始浏览天天抽奖的第" + (lIll1l1 + 1) + "个逛会场任务");
          await IlI1ll1(1, $.initForTurntableFarmRes?.["turntableBrowserAds"][lIll1l1]["adId"]);
          if ($.browserForTurntableFarmRes?.["code"] === "0" && $.browserForTurntableFarmRes?.["status"]) {
            console.log("第" + (lIll1l1 + 1) + "个逛会场任务完成，开始领取水滴奖励\n");
            await IlI1ll1(2, $.initForTurntableFarmRes?.["turntableBrowserAds"][lIll1l1]["adId"]);
            $.browserForTurntableFarmRes?.["code"] === "0" && (console.log("第" + (lIll1l1 + 1) + "个逛会场任务领取水滴奖励完成\n"), await l1lII1il(), liIiiIIl = $.initForTurntableFarmRes?.["remainLotteryTimes"]);
          }
        } else console.log("浏览天天抽奖的第" + (lIll1l1 + 1) + "个逛会场任务已完成");
      }
    }
    console.log("---天天抽奖次数----" + liIiiIIl + "次");
    if (liIiiIIl > 0) {
      console.log("开始抽奖");
      let Il1IliIl = "";
      for (let lIlill1I = 0; lIlill1I < new Array(liIiiIIl).fill("").length; lIlill1I++) {
        await i1i1lI1I();
        console.log("第" + (lIlill1I + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));
        if ($.lotteryRes?.["code"] === "0") {
          Ill111I1.map(l1il11 => {
            if (l1il11.type === $.lotteryRes?.["type"]) {
              console.log("lotteryRes.type" + $.lotteryRes.type);
              if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") Il1IliIl += l1il11.name + "个，";else $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? Il1IliIl += l1il11.name + "，" : Il1IliIl += l1il11.name + "，";
            }
          });
          if ($.lotteryRes?.["remainLotteryTimes"] === 0) {
            break;
          }
        }
      }
      if (Il1IliIl) {
        console.log("【天天抽奖】" + Il1IliIl.substr(0, Il1IliIl.length - 1) + "\n");
      }
    } else console.log("天天抽奖--抽奖机会为0次");
  } else console.log("初始化天天抽奖得好礼失败");
}
async function il1l1lli() {
  await iIlI1lIl();
  if ($.farmAssistResult?.["code"] === "0") {
    if ($.farmAssistResult?.["assistFriendList"] && $.farmAssistResult?.["assistFriendList"]?.["length"] >= 2) {
      if ($.farmAssistResult?.["status"] === 2) {
        let lI1iliiI = 0;
        for (let I1iil11i of Object.keys($.farmAssistResult.assistStageList)) {
          let li1IIll = $.farmAssistResult?.["assistStageList"][I1iil11i];
          li1IIll.stageStaus === 2 && (await llliIl1l(), $.receiveStageEnergy.code === "0" && (console.log("已成功领取第" + (I1iil11i + 1) + "阶段好友助力奖励：【" + $.receiveStageEnergy?.["amount"] + "】g水"), lI1iliiI += $.receiveStageEnergy?.["amount"]));
        }
        message += "【额外奖励】" + lI1iliiI + "g水领取成功\n";
      } else $.farmAssistResult?.["status"] === 3 && (console.log("已经领取过8好友助力额外奖励"), message += "【额外奖励】已被领取过\n");
    } else console.log("助力好友未达到2个"), message += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";
    if ($.farmAssistResult?.["assistFriendList"] && $.farmAssistResult?.["assistFriendList"]["length"] > 0) {
      let lIIl1l1I = "";
      $.farmAssistResult?.["assistFriendList"]["map"]((II111Ii1, IiIlI11I) => {
        if (IiIlI11I === $.farmAssistResult?.["assistFriendList"]["length"] - 1) {
          lIIl1l1I += II111Ii1.nickName || "匿名用户";
        } else lIIl1l1I += (II111Ii1.nickName || "匿名用户") + ",";
        let iiIIiili = new Date(II111Ii1.time),
          lI1i1l1l = iiIIiili.getFullYear() + "-" + (iiIIiili.getMonth() + 1) + "-" + iiIIiili.getDate() + " " + iiIIiili.getHours() + ":" + iiIIiili.getMinutes() + ":" + iiIIiili.getMinutes();
        console.log("\n京东昵称【" + (II111Ii1.nickName || "匿名用户") + "】 在 " + lI1i1l1l + " 给您助过力\n");
      });
      message += "【助力您的好友】" + lIIl1l1I + "\n";
    }
    console.log("领取额外奖励水滴结束\n");
  } else {
    await i1IiI11l();
    if ($.masterHelpResult?.["code"] === "0") {
      $.masterHelpResult?.["masterHelpPeoples"] && $.masterHelpResult?.["masterHelpPeoples"]["length"] >= 5 ? !$.masterHelpResult?.["masterGotFinal"] ? (await i1l1IiII(), $.masterGotFinished?.["code"] === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished?.["amount"] + "】g水"), message += "【额外奖励】" + $.masterGotFinished?.["amount"] + "g水领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), message += "【额外奖励】已被领取过\n") : (console.log("助力好友未达到5个"), message += "【额外奖励】领取失败,原因：给您助力的人未达5个\n");
      if ($.masterHelpResult?.["masterHelpPeoples"] && $.masterHelpResult?.["masterHelpPeoples"]["length"] > 0) {
        let iilliiII = "";
        $.masterHelpResult?.["masterHelpPeoples"]["map"]((lIII1lII, lIiliili) => {
          lIiliili === $.masterHelpResult?.["masterHelpPeoples"]["length"] - 1 ? iilliiII += lIII1lII.nickName || "匿名用户" : iilliiII += (lIII1lII.nickName || "匿名用户") + ",";
          let iiillliI = new Date(lIII1lII.time),
            lIi1l1iI = iiillliI.getFullYear() + "-" + (iiillliI.getMonth() + 1) + "-" + iiillliI.getDate() + " " + iiillliI.getHours() + ":" + iiillliI.getMinutes() + ":" + iiillliI.getMinutes();
          console.log("\n京东昵称【" + (lIII1lII.nickName || "匿名用户") + "】 在 " + lIi1l1iI + " 给您助过力\n");
        });
        message += "【助力您的好友】" + iilliiII + "\n";
      }
      console.log("领取额外奖励水滴结束\n");
    }
  }
}
async function IIlliII() {
  let lIlIli1 = !$.farmTask?.["waterRainInit"]?.["f"];
  if (lIlIli1) {
    console.log("水滴雨任务，每天两次，最多可得10g水滴");
    console.log("两次水滴雨任务是否全部完成：" + ($.farmTask?.["waterRainInit"]?.["f"] ? "是" : "否"));
    $.farmTask?.["waterRainInit"]?.["lastTime"] && Date.now() < $.farmTask?.["waterRainInit"]?.["lastTime"] + 3 * 60 * 60 * 1000 && (lIlIli1 = false, console.log("【第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次水滴雨】未到时间，请" + new Date($.farmTask?.["waterRainInit"]?.["lastTime"] + 3 * 60 * 60 * 1000).toLocaleTimeString() + "再试\n"));
    if (lIlIli1) {
      console.log("开始水滴雨任务,这是第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次，剩余" + (2 - ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1)) + "次");
      await lllll1();
      console.log("水滴雨waterRain");
      $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain?.["addEnergy"] + "g"), console.log("【第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次水滴雨】获得" + $.waterRain?.["addEnergy"] + "g水滴\n"));
    }
  } else {}
}
async function IIi11lll() {
  console.log("开始打卡领水活动（签到，关注，领券）");
  await IililiII();
  if ($.clockInInit.code === "0") {
    if (!$.clockInInit.todaySigned) {
      console.log("开始今日签到");
      await l1iiI();
      console.log("打卡结果" + JSON.stringify($.clockInForFarmRes));
      $.clockInForFarmRes?.["code"] === "0" && (console.log("【第" + $.clockInForFarmRes?.["signDay"] + "天签到】获得" + $.clockInForFarmRes?.["amount"] + "g💧\n"), $.clockInForFarmRes?.["signDay"] === 7 && (console.log("开始领取--惊喜礼包38g水滴"), await iIiiIIi1(), $.gotClockInGiftRes?.["code"] === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes?.["amount"] + "g💧\n")));
    }
    $.clockInInit?.["todaySigned"] && $.clockInInit?.["totalSigned"] === 7 && (console.log("开始领取--惊喜礼包38g水滴"), await iIiiIIi1(), $.gotClockInGiftRes?.["code"] === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes?.["amount"] + "g💧\n"));
    if ($.clockInInit?.["themes"] && $.clockInInit?.["themes"]["length"] > 0) {
      for (let liilliII of $.clockInInit?.["themes"]) {
        if (!liilliII?.["hadGot"]) {
          console.log("关注ID" + liilliII?.["id"]);
          await l1lilIlI(liilliII?.["id"], "theme", "1");
          console.log("themeStep1--结果" + JSON.stringify($.themeStep1));
          $.themeStep1?.["code"] === "0" && (await l1lilIlI(liilliII.id, "theme", "2"), console.log("themeStep2--结果" + JSON.stringify($.themeStep2)), $.themeStep2.code === "0" && console.log("关注" + liilliII.name + "，获得水滴" + $.themeStep2?.["amount"] + "g"));
        }
      }
    }
    if ($.clockInInit?.["venderCoupons"] && $.clockInInit?.["venderCoupons"]["length"] > 0) for (let iiI111ii of $.clockInInit?.["venderCoupons"]) {
      !iiI111ii.hadGot && (console.log("领券的ID" + iiI111ii.id), await l1lilIlI(iiI111ii.id, "venderCoupon", "1"), console.log("venderCouponStep1--结果" + JSON.stringify($.venderCouponStep1)), $.venderCouponStep1?.["code"] === "0" && (await l1lilIlI(iiI111ii.id, "venderCoupon", "2"), $.venderCouponStep2?.["code"] === "0" && (console.log("venderCouponStep2--结果" + JSON.stringify($.venderCouponStep2)), console.log("从" + iiI111ii.name + "领券，获得水滴" + $.venderCouponStep2?.["amount"] + "g"))));
    }
  }
  console.log("开始打卡领水活动（签到，关注，领券）结束\n");
}
async function lIli1() {
  await i1l1li1l();
  console.log("开始给好友浇水...");
  await IIii1lI();
  const {
    waterFriendCountKey: lil1i1il,
    waterFriendMax: I1IllIii
  } = $.farmTask?.["waterFriendTaskInit"];
  console.log("今日已给" + lil1i1il + "个好友浇水");
  if (lil1i1il < I1IllIii) {
    let lIillIli = [];
    if ($.friendList?.["friends"] && $.friendList?.["friends"]["length"] > 0) {
      $.friendList.friends.map((Ill1lIii, I111lili) => {
        Ill1lIii.friendState === 1 && lIillIli.length < I1IllIii - lil1i1il && lIillIli.push(Ill1lIii.shareCode);
      });
      console.log("需要浇水的好友列表shareCodes:" + JSON.stringify(lIillIli));
      let Ii1lIl1i = 0,
        i1l11l = "";
      for (let ll1IllIi = 0; ll1IllIi < lIillIli.length; ll1IllIi++) {
        await Ii1I1i11(lIillIli[ll1IllIi]);
        console.log("为第" + (ll1IllIi + 1) + "个好友浇水结果:" + JSON.stringify($.waterFriendForFarmRes) + "\n");
        if ($.waterFriendForFarmRes?.["code"] === "0") {
          Ii1lIl1i++;
          if ($.waterFriendForFarmRes?.["cardInfo"]) {
            console.log("为好友浇水获得道具了");
            if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "beanCard") console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), i1l11l += "水滴换豆卡,";else {
              if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), i1l11l += "快速浇水卡,";else {
                if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), i1l11l += "水滴翻倍卡,";else $.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), i1l11l += "加签卡,");
              }
            }
          }
        } else $.waterFriendForFarmRes?.["code"] === "11" && console.log("水滴不够,跳出浇水");
      }
      console.log("【好友浇水】已给" + Ii1lIl1i + "个好友浇水,消耗" + Ii1lIl1i * 10 + "g水\n");
      i1l11l && i1l11l.length > 0 && console.log("【好友浇水奖励】" + i1l11l.substr(0, i1l11l.length - 1) + "\n");
    } else console.log("您的好友列表暂无好友,快去邀请您的好友吧!");
  } else console.log("今日已为好友浇水量已达" + I1IllIii + "个");
}
async function I1i1II1I() {
  await IIii1lI();
  const {
    waterFriendCountKey: iIiI1,
    waterFriendMax: i1lIi1iI,
    waterFriendSendWater: l1lIIiI,
    waterFriendGotAward: Ili11l
  } = $.farmTask.waterFriendTaskInit;
  iIiI1 >= i1lIi1iI ? !Ili11l ? (await lil1i1Il(), console.log("领取给" + i1lIi1iI + "个好友浇水后的奖励水滴::" + JSON.stringify($.waterFriendGotAwardRes)), $.waterFriendGotAwardRes?.["code"] === "0" && console.log("【给" + i1lIi1iI + "好友浇水】奖励" + $.waterFriendGotAwardRes?.["addWater"] + "g水滴\n")) : console.log("给好友浇水的" + l1lIIiI + "g水滴奖励已领取\n") : console.log("暂未给" + i1lIi1iI + "个好友浇水\n");
}
async function l11111Il() {
  for (let iIiI1iiI = 0; iIiI1iiI < 10; iIiI1iiI++) {
    await i1I1IiiI();
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
async function Ii1Iili() {
  try {
    await ilIllI1();
    if ($.farmInfo.farmUserPro) console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo?.["farmUserPro"]?.["shareCode"] + "\n"), jdFruitShareArr.push($.farmInfo.farmUserPro.shareCode);else {}
  } catch (I1llI1iI) {
    $.logErr(I1llI1iI);
  }
}
function illIiI() {
  return new Promise(Iiil111i => {
    const I1IIII11 = {
      "url": "https://api.m.jd.com/client.action?functionId=beanTaskList",
      "body": "body=%7B%22viewChannel%22%3A%22AppHome%22%7D&build=167853&client=apple&clientVersion=10.2.0&d_brand=apple&d_model=iPhone11%2C8&ef=1&eid=eidIf12a8121eas2urxgGc%2BzS5%2BUYGu1Nbed7bq8YY%2BgPd0Q0t%2BiviZdQsxnK/HTA7AxZzZBrtu1ulwEviYSV3QUuw2XHHC%2BPFHdNYx1A/3Zt8xYR%2Bd3&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22ENS4AtO3EJS%3D%22%2C%22osVersion%22%3A%22CJGkDy4n%22%2C%22openudid%22%3A%22ENq3CzTwENGmYtc3ENSnYtC0DWTwCNdwZNcnZtYmEWU2ZwYnCwY0Cm%3D%3D%22%2C%22area%22%3A%22CJvpCJYmCV81CNS1EP82Ctq1EK%3D%3D%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1637625634%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%7D&isBackground=N&joycious=117&lang=zh_CN&networkType=4g&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=11&sign=778b3d3d83e0d3f45508a958f306abda&st=1637627411874&sv=101&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJ1DpIH6AlcMry0eQsMwEN/GgP2FpcEJvoNVODK8ho6G6xfFEYSmOOdwauVOUqIQFPdxhcdWdM05U%2BMN5h6umteQ78SpJGXOymjKiTiGjvSOiTpoqO8k%2BT6stsfe0WS9QQ41HfWeVF6cdpDTzsmufz0XDdJ6CcltPUazK5UqRSuo0UyDMBmw/oWg%3D%3D",
      "headers": {
        "Cookie": cookie,
        "Host": "api.m.jd.com",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
        "Accept-Encoding": "gzip,deflate,br",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $.post(I1IIII11, (i111Iiil, li11l11I, iII1lIlI) => {
      try {
        i111Iiil ? (console.log("" + JSON.stringify(i111Iiil)), console.log($.name + " beanTaskList API请求失败，请检查网路重试")) : iII1lIlI = $.toObj(iII1lIlI);
      } catch (i1Il1il) {
        $.logErr(i1Il1il, li11l11I);
      } finally {
        Iiil111i();
      }
    });
  });
}
async function i1I1IiiI() {
  $.duckRes = await IiIl111i("totalWaterTaskForFarm", {
    "type": 2,
    "version": 6,
    "channel": 2
  });
}
async function l1llI1iI() {
  $.totalWaterReward = await IiIl111i("totalWaterTaskForFarm");
}
async function lIiIlliI() {
  $.firstWaterReward = await IiIl111i("firstWaterTaskForFarm");
}
async function lil1i1Il() {
  $.waterFriendGotAwardRes = await IiIl111i("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}
async function IIili1i1() {
  $.myCardInfoRes = await IiIl111i("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}
async function i11iiI1i(l1liiIii) {
  $.userMyCardRes = await IiIl111i("userMyCardForFarm", {
    "cardType": l1liiIii
  });
}
async function llilIill(i1l1Ili1) {
  $.gotStageAwardForFarmRes = await IiIl111i("gotStageAwardForFarm", {
    "type": i1l1Ili1
  });
}
async function lllll1l() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await IiIl111i("waterGoodForFarm");
}
async function l1lII1il() {
  $.initForTurntableFarmRes = await IiIl111i("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function i1i1lI1I() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await IiIl111i("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}
async function liI1Iili() {
  $.timingAwardRes = await IiIl111i("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function IlI1ll1(liiii1I1, I1liIIlI) {
  liiii1I1 === 1 && console.log("浏览爆品会场");
  liiii1I1 === 2 && console.log("天天抽奖浏览任务领取水滴");
  const i1IIil1l = {
    "type": liiii1I1,
    "adId": I1liIIlI,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await IiIl111i("browserForTurntableFarm", i1IIil1l);
}
async function I1I1i1i1(I1iI1IlI) {
  const ii1il1Ii = {
    "type": 2,
    "adId": I1iI1IlI,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await IiIl111i("browserForTurntableFarm", ii1il1Ii);
}
async function iiiI1l1I() {
  $.lotteryMasterHelpRes = await IiIl111i("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}
async function i1l1IiII() {
  $.masterGotFinished = await IiIl111i("masterGotFinishedTaskForFarm");
}
async function i1IiI11l() {
  $.masterHelpResult = await IiIl111i("masterHelpTaskInitForFarm");
}
async function iIlI1lIl() {
  $.farmAssistResult = await IiIl111i("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function llliIl1l() {
  $.receiveStageEnergy = await IiIl111i("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function IiiiI1I() {
  $.inviteFriendRes = await IiIl111i("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function l1i1il1l() {
  $.helpResult = await IiIl111i("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function lllll1() {
  const liIiilI = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await IiIl111i("waterRainForFarm", liIiilI);
}
async function IililiII() {
  $.clockInInit = await IiIl111i("clockInInitForFarm");
}
async function l1iiI() {
  $.clockInForFarmRes = await IiIl111i("clockInForFarm", {
    "type": 1
  });
}
async function l1lilIlI(llli1I, ili1lIll, IiiIlIiI) {
  let I1ill = {
    "id": llli1I,
    "type": ili1lIll,
    "step": IiiIlIiI
  };
  if (ili1lIll === "theme") {
    if (IiiIlIiI === "1") $.themeStep1 = await IiIl111i("clockInFollowForFarm", I1ill);else IiiIlIiI === "2" && ($.themeStep2 = await IiIl111i("clockInFollowForFarm", I1ill));
  } else {
    if (ili1lIll === "venderCoupon") {
      if (IiiIlIiI === "1") $.venderCouponStep1 = await IiIl111i("clockInFollowForFarm", I1ill);else IiiIlIiI === "2" && ($.venderCouponStep2 = await IiIl111i("clockInFollowForFarm", I1ill));
    }
  }
}
async function iIiiIIi1() {
  $.gotClockInGiftRes = await IiIl111i("gotClockInGift", {
    "type": 2
  });
}
async function ll1ll1ii() {
  $.threeMeal = await IiIl111i("gotThreeMealForFarm");
}
async function IlIi11I(llIiiiI, iIlilI11) {
  if (iIlilI11 === 0) $.browseResult = await IiIl111i("browseAdTaskForFarm", {
    "advertId": llIiiiI,
    "type": iIlilI11
  });else iIlilI11 === 1 && ($.browseRwardResult = await IiIl111i("browseAdTaskForFarm", {
    "advertId": llIiiiI,
    "type": iIlilI11
  }));
}
async function il1iIIi(l1I1l1ii) {
  const Iil111I1 = {
    "type": l1I1l1ii,
    "babelChannel": "45",
    "line": "getBean",
    "version": 18,
    "channel": 1
  };
  if (l1I1l1ii === 1) $.treasureResult = await IiIl111i("ddnc_getTreasureBoxAward", Iil111I1);else l1I1l1ii === 2 && ($.treasureRwardResult = await IiIl111i("ddnc_getTreasureBoxAward", Iil111I1));
}
async function IlliI1il() {
  $.goalResult = await IiIl111i("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function i1l1i1l() {
  $.signResult = await IiIl111i("signForFarm");
}
async function ii1l1li() {
  const lillll1l = {
    "babelChannel": "10",
    "version": 24,
    "lat": IlIlIiii,
    "lng": l1iiIii1
  };
  $.gotNewUserTaskForFarmResult = await IiIl111i("gotNewUserTaskForFarm", lillll1l);
}
async function ilIllI1() {
  $.farmInfo = await IiIl111i("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": I1ll1liI,
    "un_area": iIlIllIi,
    "version": 22,
    "lat": IlIlIiii,
    "lng": l1iiIii1,
    "channel": 1
  });
}
async function IIii1lI() {
  console.log("\n初始化任务列表");
  $.farmTask = await IiIl111i("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function i1l1li1l() {
  $.friendList = await IiIl111i("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}
async function il1I1ll() {
  $.awardInviteFriendRes = await IiIl111i("awardInviteFriendForFarm");
}
async function Ii1I1i11(iii1IlII) {
  const l1iIiiiI = {
    "shareCode": iii1IlII,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await IiIl111i("waterFriendForFarm", l1iIiiiI);
}
async function il1llIi() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + jdNotify === "false";
  $.ctrTemp ? ($.msg($.name, subTitle, message, option), $.isNode() && (allMessage += subTitle + "\n" + message + ($.index !== cookiesArr.length ? "\n" : ""))) : $.log("" + message);
}
function I1iII1i(IlIIl11) {
  let ll11lIil;
  return IlIIl11 ? ll11lIil = new Date(IlIIl11) : ll11lIil = new Date(), ll11lIil.getFullYear() + "-" + (ll11lIil.getMonth() + 1 >= 10 ? ll11lIil.getMonth() + 1 : "0" + (ll11lIil.getMonth() + 1)) + "-" + (ll11lIil.getDate() >= 10 ? ll11lIil.getDate() : "0" + ll11lIil.getDate());
}
function ll1I11l1() {
  return new Promise(IIllIiii => {
    console.log("开始获取配置文件\n");
    notify = $.isNode() ? require("./sendNotify") : "";
    const I11l11Il = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(I11l11Il).forEach(IIli1lIl => {
        I11l11Il[IIli1lIl] && cookiesArr.push(I11l11Il[IIli1lIl]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1l1iili($.getdata("CookiesJD") || "[]").map(ll1Ill1l => ll1Ill1l.cookie)].filter(I1I11l11 => !!I1I11l11);
    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    IIllIiii();
  });
}
function IiIl111i(liIIIiIl, ll1iiIi = {}, i1ll1IlI = 1000) {
  return new Promise(i11lIIIi => {
    setTimeout(async () => {
      $.post(await i111lI1l(liIIIiIl, ll1iiIi), (IIililil, IiIi11l1, i1ll1I1l) => {
        try {
          if (IIililil) console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(IIililil)), console.log("function_id:" + liIIIiIl), $.logErr(IIililil);else {
            if (ll1iI1il(i1ll1I1l)) {
              i1ll1I1l = JSON.parse(i1ll1I1l);
            }
          }
        } catch (lIiII11i) {
          $.logErr(lIiII11i, IiIi11l1);
        } finally {
          i11lIIIi(i1ll1I1l);
        }
      });
    }, i1ll1IlI);
  });
}
function ll1iI1il(il1I1iii) {
  if (!il1I1iii) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(il1I1iii) == "object") return true;
  } catch (iII1i1l) {
    return console.log(iII1i1l), false;
  }
}
const I1lli111 = {
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
async function i111lI1l(llIIlIl1, Ill1iii = {}) {
  let iiiii111 = "";
  if (!I1lli111[llIIlIl1]) iiiii111 = "https://api.m.jd.com/client.action?functionId=" + llIIlIl1 + "&body=" + encodeURIComponent(JSON.stringify(Ill1iii)) + "&appid=wh5";else {
    const ilI1liI1 = {
        "appid": "signed_wh5",
        "client": "iOS",
        "clientVersion": "10.1.0",
        "functionId": llIIlIl1,
        "body": Ill1iii
      },
      Ii11I1li = await lIil1lIl(I1lli111[llIIlIl1], ilI1liI1);
    iiiii111 = "https://api.m.jd.com/client.action?" + Ii11I1li;
  }
  return {
    "url": iiiii111,
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
    "timeout": 20000
  };
}
async function lIil1lIl(lI1iiIIi, i1iIllIi) {
  try {
    let II111Ill = new lIIillII({
      "appId": lI1iiIIi,
      "appid": "signed_wh5",
      "clientVersion": i1iIllIi?.["clientVersion"],
      "client": i1iIllIi?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await II111Ill.genAlgo(), body = await II111Ill.genUrlParams(i1iIllIi.functionId, i1iIllIi.body), body;
  } catch (lil11lii) {}
}
async function IIilIi1I(llIlIlIi, IIiiIIl1) {
  let I11I1iii = {
      "searchParams": {
        ...IIiiIIl1,
        "appId": llIlIlIi
      },
      "pt_pin": $.UserName,
      "client": IIiiIIl1?.["client"],
      "clientVersion": IIiiIIl1?.["clientVersion"]
    },
    iiiI11i = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    I1l111ii = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(I11I1iii),
      "headers": iiiI11i,
      "timeout": 30000
    };
  return new Promise(async IIi11lil => {
    $.post(I1l111ii, (lI1l1l, liIilI1i, llIiIiiI) => {
      let l11lI11 = "";
      try {
        if (lI1l1l) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          llIiIiiI = JSON.parse(llIiIiiI);
          console.log(JSON.stringify(llIiIiiI));
          if (typeof llIiIiiI === "object" && llIiIiiI && llIiIiiI.body) {
            if (llIiIiiI.body) l11lI11 = llIiIiiI || "";
          } else llIiIiiI.code == 400 ? console.log("\n" + llIiIiiI.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (i1I1Iiii) {
        $.logErr(i1I1Iiii, liIilI1i);
      } finally {
        IIi11lil(iI1IllII(l11lI11));
      }
    });
  });
}
function iI1IllII(iIiiIiIl, I1I1lIl1 = {}) {
  let IilIIilI = [],
    ilIiil = I1I1lIl1.connector || "&",
    Ii1iiilI = Object.keys(iIiiIiIl);
  if (I1I1lIl1.sort) Ii1iiilI = Ii1iiilI.sort();
  for (let Iiii1l11 of Ii1iiilI) {
    let i1iI11ll = iIiiIiIl[Iiii1l11];
    if (i1iI11ll && typeof i1iI11ll === "object") i1iI11ll = JSON.stringify(i1iI11ll);
    if (i1iI11ll && I1I1lIl1.encode) i1iI11ll = encodeURIComponent(i1iI11ll);
    IilIIilI.push(Iiii1l11 + "=" + i1iI11ll);
  }
  return IilIIilI.join(ilIiil);
}
function l1liii(ii1Ii, il111Ii1 = "qwertyuiopasdfghjklzxcvbnm") {
  let iiIll1i = "";
  for (let llI111iI = 0; llI111iI < ii1Ii; llI111iI++) {
    iiIll1i += il111Ii1[Math.floor(Math.random() * il111Ii1.length)];
  }
  return iiIll1i;
}
function l1l1iili(iIiIIIiI) {
  if (typeof iIiIIIiI == "string") try {
    return JSON.parse(iIiIIIiI);
  } catch (ilI111i1) {
    return console.log(ilI111i1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}