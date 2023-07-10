/*
种豆得豆 脚本更新地址：jd_plantBean.js
更新时间：2021-08-20
活动入口：京东APP我的-更多工具-种豆得豆
已支持IOS京东多账号,云端多京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注：会自动关注任务中的店铺跟商品，介意者勿使用。
互助码shareCode请先手动运行脚本查看打印可看到
每个京东账号每天只能帮助3个人。多出的助力码将会助力失败。

=====================================Quantumult X=================================
[task_local]
1 7-21/2 * * * https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, tag=种豆得豆, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdzd.png, enabled=true

=====================================Loon================================
[Script]
cron "1 7-21/2 * * *" script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js,tag=京东种豆得豆

======================================Surge==========================
京东种豆得豆 = type=cron,cronexp="1 7-21/2 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js

====================================小火箭=============================
京东种豆得豆 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, cronexpr="1 7-21/2 * * *", timeout=3600, enable=true

*/
const H5ST=require('./utils/h5st.js');
const Env=require('./utils/Env');
const $ = new Env('种豆得豆');
$.H5ST31={};
let jdNotify = true,
  cookiesArr = [],
  cookie = "",
  notify,
  option,
  message,
  subTitle;
const cryptoJS = require("crypto-js"),
  base64_mod_charset = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
  JD_API_HOST = "https://api.m.jd.com/client.action";
let allMessage = "",
  currentRoundId = null,
  lastRoundId = null,
  roundList = [],
  awardState = "",
  num;
$.newShareCode = [];
let lnrun = 0;
!(async () => {
  await requireConfig();
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let iI1iI1 = 0; iI1iI1 < cookiesArr.length; iI1iI1++) {
    if (cookiesArr[iI1iI1]) {
      cookie = cookiesArr[iI1iI1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iI1iI1 + 1;
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
      lnrun++;
      get_ua();
      await jdPlantBean();
      lnrun == 3 && (console.log("\n【访问接口次数达到3次，休息一分钟.....】\n"), await $.wait(60 * 1000), lnrun = 0);
    }
  }
  $.isNode() && allMessage && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(lI1i11 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lI1i11 + "!", "");
}).finally(() => {
  $.done();
});
async function jdPlantBean() {
  try {
    console.log("获取任务及基本信息");
    await plantBeanIndex();
    if ($.plantBeanIndexResult.errorCode === "PB101") {
      console.log("\n活动太火爆了，还是去买买买吧！\n");
      return;
    }
    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
      for (let I1IIl = 0; I1IIl < $.plantBeanIndexResult.data.roundList.length; I1IIl++) {
        if ($.plantBeanIndexResult.data.roundList[I1IIl].roundState === "2") {
          num = I1IIl;
          break;
        }
      }
      const i1IIl1 = $.plantBeanIndexResult.data.jwordShareInfo.shareUrl;
      $.myPlantUuid = getParam(i1IIl1, "plantUuid");
      console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.myPlantUuid + "\n");
      roundList = $.plantBeanIndexResult.data.roundList;
      currentRoundId = roundList[num].roundId;
      lastRoundId = roundList[num - 1].roundId;
      awardState = roundList[num - 1].awardState;
      $.taskList = $.plantBeanIndexResult.data.taskList;
      subTitle = "【京东昵称】" + $.plantBeanIndexResult.data.plantUserInfo.plantNickName;
      message += "【上期时间】" + roundList[num - 1].dateDesc.replace("上期 ", "") + "\n";
      message += "【上期成长值】" + roundList[num - 1].growth + "\n";
      await $.wait(1000);
      await receiveNutrients();
      await $.wait(2000);
      await doTask();
      await $.wait(5000);
      await stealFriendWater();
      await $.wait(2000);
      await doCultureBean();
      await $.wait(1000);
      await doGetReward();
      await $.wait(1000);
      await showTaskProcess();
      await $.wait(1000);
      await plantShareSupportList();
      await $.wait(1000);
    } else console.log("种豆得豆-初始失败:  " + JSON.stringify($.plantBeanIndexResult));
  } catch (iiliII) {
    $.logErr(iiliII);
    const i1iiIl = "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n任务执行异常，请检查执行日志 ‼️‼️";
    $.msg($.name, "", "" + i1iiIl);
  }
}
async function doGetReward() {
  console.log("【上轮京豆】" + (awardState === "4" ? "采摘中" : awardState === "5" ? "可收获了" : "已领取"));
  if (awardState === "4") message += "【上期状态】" + roundList[num - 1].tipBeanEndTitle + "\n";else {
    if (awardState === "5") {
      await getReward();
      console.log("开始领取京豆");
      $.getReward && $.getReward.code === "0" ? (console.log("京豆领取成功"), message += "【上期兑换京豆】" + $.getReward.data.awardBean + "个\n", $.msg($.name, subTitle, message), allMessage += "京东账号" + $.index + " " + $.nickName + "\n" + message + ($.index !== cookiesArr.length ? "\n\n" : "")) : console.log("$.getReward 异常：" + JSON.stringify($.getReward));
    } else awardState === "6" && (message += "【上期兑换京豆】" + roundList[num - 1].awardBeans + "个\n");
  }
  roundList[num].dateDesc.indexOf("本期 ") > -1 && (roundList[num].dateDesc = roundList[num].dateDesc.substr(roundList[num].dateDesc.indexOf("本期 ") + 3, roundList[num].dateDesc.length));
  message += "【本期时间】" + roundList[num].dateDesc + "\n";
  message += "【本期成长值】" + roundList[num].growth + "\n";
}
async function doCultureBean() {
  await plantBeanIndex();
  if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
    const li1lil = $.plantBeanIndexResult.data.roundList[num];
    if (li1lil.roundState === "2") {
      if (li1lil.bubbleInfos && li1lil.bubbleInfos.length) console.log("开始收取营养液");
      for (let li1lii of li1lil.bubbleInfos) {
        console.log("收取-" + li1lii.name + "-的营养液");
        await cultureBean(li1lil.roundId, li1lii.nutrientsType);
        console.log("收取营养液结果:" + JSON.stringify($.cultureBeanRes));
      }
    }
  } else {
    console.log("plantBeanIndexResult:" + JSON.stringify($.plantBeanIndexResult));
  }
}
async function stealFriendWater() {
  await stealFriendList();
  if ($.stealFriendList && $.stealFriendList.code === "0") {
    if ($.stealFriendList.data && $.stealFriendList.data.tips) {
      console.log("\n\n今日偷取好友营养液已达上限\n\n");
      return;
    }
    if ($.stealFriendList.data && $.stealFriendList.data.friendInfoList && $.stealFriendList.data.friendInfoList.length > 0) {
      let lili1i = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
      for (let iI1Ii of $.stealFriendList.data.friendInfoList) {
        new Date(lili1i).getHours() === 20 ? iI1Ii.nutrCount >= 2 && (console.log("可以偷的好友的信息paradiseUuid::" + JSON.stringify(iI1Ii.paradiseUuid)), await collectUserNutr(iI1Ii.paradiseUuid), console.log("偷取好友营养液情况:" + JSON.stringify($.stealFriendRes)), $.stealFriendRes && $.stealFriendRes.code === "0" && console.log("偷取好友营养液成功")) : iI1Ii.nutrCount >= 3 && (console.log("可以偷的好友的信息paradiseUuid::" + JSON.stringify(iI1Ii.paradiseUuid)), await collectUserNutr(iI1Ii.paradiseUuid), console.log("偷取好友营养液情况:" + JSON.stringify($.stealFriendRes)), $.stealFriendRes && $.stealFriendRes.code === "0" && console.log("偷取好友营养液成功"));
        await $.wait(1000);
      }
    }
  } else console.log("$.stealFriendList 异常： " + JSON.stringify($.stealFriendList));
}
async function doEgg() {
  await egg();
  if ($.plantEggLotteryRes && $.plantEggLotteryRes.code === "0") {
    if ($.plantEggLotteryRes.data.restLotteryNum > 0) {
      const lI1i1l = new Array($.plantEggLotteryRes.data.restLotteryNum).fill("");
      console.log("目前共有" + lI1i1l.length + "次扭蛋的机会");
      for (let li1ll1 = 0; li1ll1 < lI1i1l.length; li1ll1++) {
        console.log("开始第" + (li1ll1 + 1) + "次扭蛋");
        await plantEggDoLottery();
        console.log("天天扭蛋成功：" + JSON.stringify($.plantEggDoLotteryResult));
      }
    } else console.log("暂无扭蛋机会");
  } else console.log("查询天天扭蛋的机会失败" + JSON.stringify($.plantEggLotteryRes));
}
async function doTask() {
  if ($.taskList && $.taskList.length > 0) for (let iiil of $.taskList) {
    if (iiil.isFinished === 1) {
      console.log(iiil.taskName + " 任务已完成\n");
      continue;
    } else switch (iiil.taskType) {
      case 92:
        await farmtask();
        continue;
      case 57:
        await jxdoublesign1("https://m.jingxi.com/jxbfd/user/DoubleSignDeal?g_ty=h5&g_tk=&appCode=msd1188198&__t=1657108409440&dwEnv=7&strDeviceId=a3b4e844090b28d5c38e7529af8115172079be4d&strZone=jxbfd&bizCode=jxbfd&source=jxbfd&_cfd_t=1657108409190&_stk=__t%2C_cfd_t%2CbizCode%2CdwEnv%2Csource%2CstrDeviceId%2CstrZone&_ste=1&h5st=20220706195330228%3B1980457211661562%3B10032%3Btk02w78551ad830nuMcGB4Qsv9QxapLP7gZdOCYE5PVV%2Bna%2Bb4KU21drJq64oP82965Vdc1tGqVU%2Flp7ydcZ5XgH0Feh%3B241b6f1d21bf8e41f380a5dd29a7bac2a6f1f65a0c7ef1b1f751eaea4c40dd9c%3B3.0%3B1657108410228&sceneval=2");
        await $.wait(2000);
        await jxdoublesign1("https://wq.jd.com/jxjdsignin/SignedInfo?channel=jx_zdddsq&_t=1658021925021&h5st=20220717093845024%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3B7eb86560860f8f60ad3b679c34f89aacf891b5a85580efd0a30c355537bfec54%3B3.0%3B1658021925024&_stk=_t%2Cchannel&_=1658021925027&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5");
        await $.wait(1000);
        await jxdoublesign1("https://wq.jd.com/jxjdsignin/IssueReward?channel=jx_zdddsq&_t=1658021926276&h5st=20220717093846279%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3Be2d7b6810b3bd1b9d9692d354ecbb582e69afc64df19bd8d6c14632b1a65660c%3B3.0%3B1658021926279&_stk=_t%2Cchannel&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5");
        await $.wait(1000);
        continue;
      case 96:
        continue;
      case 94:
        continue;
      case 3:
        console.log("开始做 " + iiil.taskName + "任务");
        let iiIIil = iiil.totalNum - iiil.gainedNum;
        if (iiIIil === 0) continue;
        await shopTaskList();
        const {
          data: iiIIii
        } = $.shopTaskListRes;
        let i1liIi = [],
          i1liIl = [],
          IiIill = [];
        const {
          goodShopList: li1Iii,
          moreShopList: lIII1
        } = iiIIii;
        if (li1Iii) for (let Ili1li of li1Iii) {
          Ili1li.taskState === "2" && i1liIi.push(Ili1li);
        }
        if (lIII1) for (let lIlIil of lIII1) {
          lIlIil.taskState === "2" && i1liIl.push(lIlIil);
        }
        IiIill = i1liIi.concat(i1liIl);
        for (let li1Ill of IiIill) {
          const {
              shopId: Ili1ll,
              shopTaskId: IIl1Il
            } = li1Ill,
            l1Iili = {
              "monitor_refer": "plant_shopNutrientsTask",
              "shopId": Ili1ll,
              "shopTaskId": IIl1Il
            },
            IIi11l = await requestGet("shopNutrientsTask", l1Iili);
          console.log("shopRes结果:" + JSON.stringify(IIi11l));
          IIi11l && IIi11l.code === "0" && IIi11l.data && IIi11l.data.nutrState && IIi11l.data.nutrState === "1" && iiIIil--;
          if (iiIIil <= 0) {
            console.log(iiil.taskName + "任务已做完\n");
            break;
          }
        }
        continue;
      case 5:
        console.log("开始做 " + iiil.taskName + "任务");
        let llIi11 = iiil.totalNum - iiil.gainedNum;
        if (llIi11 === 0) continue;
        await productTaskList();
        let IIi11I = [],
          iiIIlI = [];
        const {
          productInfoList: IIl1II
        } = $.productTaskList.data;
        for (let iiiiIl = 0; iiiiIl < IIl1II.length; iiiiIl++) {
          for (let IIi11i = 0; IIi11i < IIl1II[iiiiIl].length; IIi11i++) {
            IIi11I.push(IIl1II[iiiiIl][IIi11i]);
          }
        }
        for (let iili of IIi11I) {
          iili.taskState === "2" && iiIIlI.push(iili);
        }
        for (let IIl1Ii of iiIIlI) {
          const {
              skuId: ilIIl,
              productTaskId: I11ll1
            } = IIl1Ii,
            lIIII = {
              "monitor_refer": "plant_productNutrientsTask",
              "productTaskId": I11ll1,
              "skuId": ilIIl
            },
            li1IlI = await requestGet("productNutrientsTask", lIIII);
          if (li1IlI && li1IlI.code === "0") {
            if (li1IlI.data && li1IlI.data.nutrState && li1IlI.data.nutrState === "1") {
              llIi11--;
            }
          }
          if (llIi11 <= 0) {
            console.log(iiil.taskName + "任务已做完\n");
            break;
          }
        }
        continue;
      case 10:
        console.log("开始做 " + iiil.taskName + "任务");
        let iill = iiil.totalNum - iiil.gainedNum;
        if (iill === 0) continue;
        await plantChannelTaskList();
        let iiIIl1 = [],
          llIi1I = [],
          lIlIii = [];
        const {
          goodChannelList: li1Ili,
          normalChannelList: I11lil
        } = $.plantChannelTaskList.data;
        for (let IiII1l of li1Ili) {
          if (IiII1l.taskState === "2") {
            iiIIl1.push(IiII1l);
          }
        }
        for (let Ii11Il of I11lil) {
          Ii11Il.taskState === "2" && llIi1I.push(Ii11Il);
        }
        lIlIii = iiIIl1.concat(llIi1I);
        for (let lIlIlI of lIlIii) {
          const {
              channelId: iiIIll,
              channelTaskId: I1li1l
            } = lIlIlI,
            I11li1 = {
              "channelId": iiIIll,
              "channelTaskId": I1li1l
            },
            lIIIi = await requestGet("plantChannelNutrientsTask", I11li1);
          console.log("channelRes结果:" + JSON.stringify(lIIIi));
          lIIIi && lIIIi.code === "0" && lIIIi.data && lIIIi.data.nutrState && lIIIi.data.nutrState === "1" && iill--;
          if (iill <= 0) {
            console.log(iiil.taskName + "任务已做完\n");
            break;
          }
        }
        continue;
      default:
        console.log("\n开始做 " + iiil.taskName + "任务");
        await receiveNutrientsTask(iiil.taskType);
        console.log("做 " + iiil.taskName + "任务结果:" + JSON.stringify($.receiveNutrientsTaskRes) + "\n");
        continue;
    }
  }
}
function showTaskProcess() {
  return new Promise(async lIlIli => {
    await plantBeanIndex();
    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
      $.taskList = $.plantBeanIndexResult.data.taskList;
      if ($.taskList && $.taskList.length > 0) {
        console.log("     任务   进度");
        for (let IiII11 of $.taskList) {
          console.log("[" + IiII11.taskName + "]  " + IiII11.gainedNum + "/" + IiII11.totalNum + "   " + IiII11.isFinished);
        }
      }
    } else console.log("plantBeanIndexResult:" + JSON.stringify($.plantBeanIndexResult));
    lIlIli();
  });
}
function showMsg() {
  $.log("\n" + message + "\n");
  jdNotify = $.getdata("jdPlantBeanNotify") ? $.getdata("jdPlantBeanNotify") : jdNotify;
  (!jdNotify || jdNotify === "false") && $.msg($.name, subTitle, message);
}
async function farmtask() {
  await receivefruit();
  await $.wait(500);
  await dofarm("gotConfigDataForBrand");
  await $.wait(500);
  await dofarm("initForFarm");
  await $.wait(500);
  await dofarm("taskInitForFarm");
  await $.wait(500);
  await dofarm("farmMarkStatus");
  await $.wait(500);
  await dofarm("initForFarm");
  await $.wait(500);
}
async function receivefruit() {
  const I111II = {
    "monitor_refer": "plant_receiveNutrientsTask",
    "monitor_source": "plant_app_plant_index",
    "awardType": "92",
    "version": "9.2.4.3"
  };
  await request("receiveNutrientsTask", I111II);
}
async function dofarm(lII1) {
  let lIl11 = {
    "version": 17,
    "channel": 1,
    "babelChannel": "45"
  };
  return lII1 == "gotConfigDataForBrand" && (lIl11.type = "json", lIl11.k = "farmShareConfig"), new Promise(async IIlllI => {
    const IIlli1 = {
      "url": JD_API_HOST + "?functionId=" + lII1 + "&body=" + encodeURIComponent(JSON.stringify(lIl11)) + "&appid=wh5",
      "headers": {
        "Cookie": cookie,
        "Host": "api.m.jd.com",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.UA,
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://h5.m.jd.com"
      },
      "timeout": 20000
    };
    $.get(IIlli1, (ilIiii, ilIiil, iII) => {
      try {
        ilIiii && (console.log("\n API查询请求失败 ‼️‼️"), $.logErr(ilIiii));
      } catch (IIiIli) {
        $.logErr(IIiIli, ilIiil);
      } finally {
        IIlllI();
      }
    });
  });
}
function jxdoublesign1(lIi111) {
  let IIiIll = {
    "url": lIi111,
    "headers": {
      "accept": "application/json",
      "referer": "https://st.jingxi.com/",
      "User-Agent": "jdpingou;iPhone;4.13.0;14.4.2;${randomString(40)};network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      "Cookie": "cid=4;" + cookie
    }
  };
  return new Promise(async iIl => {
    $.get(IIiIll, (lIi11I, iiili, iIlIiI) => {
      try {
        if (lIi11I) {
          console.log("" + JSON.stringify(lIi11I));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (iIlIiI) {}
        }
      } catch (IIiIil) {
        $.logErr(IIiIil, iiili);
      } finally {
        iIl(iIlIiI);
      }
    });
    iIl();
  });
}
function tjdoublesign(lli1ll) {
  let liIill = {
    "url": lli1ll,
    "headers": {
      "Accept": "application/json",
      "Referer": "https://wqs.jd.com/",
      "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Cookie": cookie
    }
  };
  return new Promise(async ll11 => {
    $.get(liIill, (liIilI, Ii1li1, iiil1) => {
      try {
        if (liIilI) {
          console.log("" + JSON.stringify(liIilI));
          console.log("tjdoublesign 请求失败，请检查网路重试");
        } else {
          if (iiil1) {}
        }
      } catch (IIiIi1) {
        $.logErr(IIiIi1, Ii1li1);
      } finally {
        ll11(iiil1);
      }
    });
  });
}
async function getReward() {
  const iiiil = {
    "roundId": lastRoundId
  };
  $.getReward = await request("receivedBean", iiiil);
}
async function cultureBean(l11lI, Il1l11) {
  let lli1ii = arguments.callee.name.toString(),
    I1II1i = {
      "roundId": l11lI,
      "nutrientsType": Il1l11
    };
  $.cultureBeanRes = await request(lli1ii, I1II1i);
}
async function stealFriendList() {
  const ll1i = {
    "pageNum": "1"
  };
  $.stealFriendList = await krrequestGet("plantFriendList", ll1i);
}
async function collectUserNutr(lliII) {
  console.log("开始偷好友");
  let iiIlIl = arguments.callee.name.toString();
  const iiIlIi = {
    "paradiseUuid": lliII,
    "roundId": currentRoundId
  };
  $.stealFriendRes = await request(iiIlIl, iiIlIi);
}
async function receiveNutrients() {
  $.receiveNutrientsRes = await request("receiveNutrients", {
    "roundId": currentRoundId,
    "monitor_refer": "plant_receiveNutrients"
  });
}
async function plantEggDoLottery() {
  $.plantEggDoLotteryResult = await requestGet("plantEggDoLottery");
}
async function egg() {
  $.plantEggLotteryRes = await requestGet("plantEggLotteryIndex");
}
async function productTaskList() {
  let i11llI = arguments.callee.name.toString();
  $.productTaskList = await requestGet(i11llI, {
    "monitor_refer": "plant_productTaskList"
  });
}
async function plantChannelTaskList() {
  let iiI1I1 = arguments.callee.name.toString();
  $.plantChannelTaskList = await krrequestGet(iiI1I1);
}
async function shopTaskList() {
  let iI1i11 = arguments.callee.name.toString();
  $.shopTaskListRes = await krrequestGet(iI1i11, {
    "monitor_refer": "plant_receiveNutrients"
  });
}
async function receiveNutrientsTask(iIiIII) {
  const iIlIl = arguments.callee.name.toString(),
    iIlIi = {
      "monitor_refer": "plant_receiveNutrientsTask",
      "awardType": "" + iIiIII
    };
  $.receiveNutrientsTaskRes = await requestGet(iIlIl, iIlIi);
}
async function plantShareSupportList() {
  $.shareSupportList = await requestGet("plantShareSupportList", {
    "roundId": ""
  });
  if ($.shareSupportList && $.shareSupportList.code === "0") {
    const {
        data: ll1iii
      } = $.shareSupportList,
      ll1iil = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000,
      lIIlli = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 + 24 * 60 * 60 * 1000;
    let I1Iill = [];
    ll1iii.map(iilI1i => {
      ll1iil <= iilI1i.createTime && iilI1i.createTime < lIIlli && I1Iill.push(iilI1i);
    });
    message += "【助力您的好友】共" + I1Iill.length + "人";
  } else console.log("异常情况：" + JSON.stringify($.shareSupportList));
}
async function helpShare(IiIlI1) {
  console.log("\n开始助力好友: " + IiIlI1);
  const iI11I = {
    "plantUuid": IiIlI1,
    "wxHeadImgUrl": "",
    "shareUuid": "",
    "followType": "1"
  };
  $.helpResult = await request("plantBeanIndex", iI11I);
  console.log("助力结果的code:" + ($.helpResult && $.helpResult.code));
}
async function plantBeanIndex() {
  $.plantBeanIndexResult = await request("plantBeanIndex");
}
function requireConfig() {
  return new Promise(lli11 => {
    notify = $.isNode() ? require("./sendNotify") : "";
    const l1I111 = $.isNode() ? require("./jdCookie.js") : "",
      lIIlii = "";
    if ($.isNode()) {
      Object.keys(l1I111).forEach(iI111 => {
        l1I111[iI111] && cookiesArr.push(l1I111[iI111]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(iIil1I => iIil1I.cookie)].filter(iI1i1l => !!iI1i1l);
    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    if ($.isNode()) Object.keys(lIIlii).forEach(ll1ili => {
      lIIlii[ll1ili] && $.shareCodesArr.push(lIIlii[ll1ili]);
    });else {
      if ($.getdata("jd_plantbean_inviter")) $.shareCodesArr = $.getdata("jd_plantbean_inviter").split("\n").filter(llilll => !!llilll);
    }
    lli11();
  });
}
function krrequestGet(ll1ill, l1liI = {}) {
  return new Promise(async li1111 => {
    const Il1l1 = {
      "url": JD_API_HOST + "?functionId=" + ll1ill + "&body=" + encodeURIComponent(JSON.stringify(l1liI)) + "&appid=signed_wh5&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2",
      "headers": {
        "Accept": "*/*",
        "Origin": "https://h5.m.jd.com",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://h5.m.jd.com",
        "x-requested-with": "com.jingdong.app.mall",
        "Cookie": cookie
      },
      "timeout": 10000
    };
    $.get(Il1l1, (IiiiIl, i1IIII, l1ii11) => {
      try {
        IiiiIl ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), $.logErr(IiiiIl)) : l1ii11 = JSON.parse(l1ii11);
      } catch (I11Iii) {
        $.logErr(I11Iii, i1IIII);
      } finally {
        li1111(l1ii11);
      }
    });
  });
}
function requestGet(llill1, Iill1 = {}) {
  return new Promise(async il1lil => {
    let iilii1 = "";
    if (!appidMap[llill1]) iilii1 = JD_API_HOST + "?functionId=" + llill1 + "&body=" + encodeURIComponent(JSON.stringify(Iill1)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2";else {
      !Iill1.version && (Iill1.version = "9.2.4.3");
      Iill1.monitor_source = "plant_app_plant_index";
      appidMap[llill1] == "shopNutrientsTask" && (headers.referer = "https://plantearth.m.jd.com/", headers["x-requested-with"] = "https://plantearth.m.jd.com/");
      await $.wait(5000);
      const il1lii = {
        "appid": "signed_wh5",
        "client": "android",
        "clientVersion": "10.1.0",
        "functionId": llill1,
        "body": Iill1
      };
      let illi1i = await getH5st(appidMap[llill1], il1lii);
      iilii1 = JD_API_HOST + "?" + illi1i;
    }
    const llilil = {
      "url": iilii1,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
        "Cookie": cookie
      },
      "timeout": 20000
    };
    $.get(llilil, (lll1ll, illi1l, l1llI) => {
      try {
        lll1ll ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), console.log(lll1ll), $.logErr(lll1ll)) : l1llI = JSON.parse(l1llI);
      } catch (l1liIi) {
        $.logErr(l1liIi, illi1l);
      } finally {
        il1lil(l1llI);
      }
    });
  });
}
function TotalBean() {
  return new Promise(async Il1li => {
    const lIiI11 = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      },
      "timeout": 20000
    };
    $.post(lIiI11, (li111I, IiIlIi, I1ili) => {
      try {
        if (li111I) {
          console.log("" + JSON.stringify(li111I));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (I1ili) {
            I1ili = JSON.parse(I1ili);
            if (I1ili.retcode === 13) {
              $.isLogin = false;
              return;
            }
            I1ili.retcode === 0 ? $.nickName = I1ili.base && I1ili.base.nickname || $.UserName : $.nickName = $.UserName;
          } else console.log("京东服务器返回空数据");
        }
      } catch (il1lll) {
        $.logErr(il1lll, IiIlIi);
      } finally {
        Il1li();
      }
    });
  });
}
function request(li1lI1, ll1I11 = {}) {
  return new Promise(async lIiiii => {
    let i111Il = "";
    if (!appidMap[li1lI1]) i111Il = JD_API_HOST + "?functionId=" + li1lI1 + "&body=" + encodeURIComponent(JSON.stringify(ll1I11)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2";else {
      ll1I11.version = "9.2.4.3";
      ll1I11.monitor_source = "plant_app_plant_index";
      if (!ll1I11.monitor_refer) {
        ll1I11.monitor_refer = "";
      }
      const IlII1I = {
        "appid": "signed_wh5",
        "client": "android",
        "clientVersion": "10.1.0",
        "functionId": li1lI1,
        "body": ll1I11
      };
      let IillI = await getH5st(appidMap[li1lI1], IlII1I);
      i111Il = JD_API_HOST + "?" + IillI;
    }
    await $.wait(5000);
    let i111Ii = {
      "url": i111Il,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
        "Cookie": cookie
      },
      "timeout": 10000
    };
    $.get(i111Ii, async (lIiil1, i1Il1l, I11IlI) => {
      try {
        if (lIiil1) {
          console.log("\n种豆得豆: API查询请求失败 ‼️‼️");
          console.log("function_id:" + li1lI1);
          $.logErr(lIiil1);
        } else I11IlI.indexOf("data") > -1 ? I11IlI = JSON.parse(I11IlI) : (I11IlI = JSON.parse(I11IlI), console.log(I11IlI.errorMessage));
      } catch (i111II) {
        $.logErr(i111II, i1Il1l);
      } finally {
        lIiiii(I11IlI);
      }
    });
  });
}
const appidMap = {
  "plantBeanIndex": "d246a",
  "receiveNutrients": "b56b8",
  "cultureBean": "6a216",
  "receiveNutrientsTask": "d22ac",
  "plantChannelNutrientsTask": "2424e",
  "shopNutrientsTask": "19c88",
  "productTaskList": "7351b",
  "productNutrientsTask": "a4e2d",
  "receivedBean": "d4a66",
  "collectUserNutr": "14357"
};
async function taskUrl(IiIIl1, IiiiI1) {
  IiiiI1.version = "9.2.4.3";
  IiiiI1.monitor_source = "plant_app_plant_index";
  !IiiiI1.monitor_refer && (IiiiI1.monitor_refer = "");
  if (!appidMap[IiIIl1]) {} else {
    const li1lIi = {
      "appid": "signed_wh5",
      "client": "android",
      "clientVersion": "10.1.0",
      "functionId": IiIIl1,
      "body": IiiiI1
    };
  }
  return {
    "url": JD_API_HOST + "?" + h5st,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
      "Cookie": cookie
    },
    "timeout": 10000
  };
}

async function getH5st(appId, add) {
  if( !$.H5ST31[$.UserName] ) $.H5ST31[$.UserName]={}
  if( !$.H5ST31[$.UserName][appId] ){
    $.H5ST31[$.UserName][appId]= new H5ST({
      "appId": appId,
        ...add,
        "version":"3.1",
        "ua": $.UA,
        "pin": $.UserName
    });
    await $.H5ST31[$.UserName][appId].genAlgo();
  };
  return $.H5ST31[$.UserName][appId].genUrlParams(add.functionId,add.body|{});
}

function randomString(lIll1l, Il1lIl = "qwertyuiopasdfghjklzxcvbnm") {
  let I1111I = "";
  for (let I1I11 = 0; I1I11 < lIll1l; I1I11++) {
    I1111I += Il1lIl[Math.floor(Math.random() * Il1lIl.length)];
  }
  return I1111I;
}
function json2str(il11l1, I1I1l = {}) {
  let IIiliI = [],
    I1I1i = I1I1l.connector || "&",
    iiiiii = Object.keys(il11l1);
  if (I1I1l.sort) iiiiii = iiiiii.sort();
  for (let IiliIl of iiiiii) {
    let ilii1l = il11l1[IiliIl];
    if (ilii1l && typeof ilii1l === "object") ilii1l = JSON.stringify(ilii1l);
    if (ilii1l && I1I1l.encode) ilii1l = encodeURIComponent(ilii1l);
    IIiliI.push(IiliIl + "=" + ilii1l);
  }
  return IIiliI.join(I1I1i);
}
function randomList(llllii) {
  return llllii[Math.floor(Math.random() * llllii.length)];
}
function randomUuid(llllil = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", II1ill = "0123456789abcdef") {
  let iII1iI = "";
  for (let lIii1 of llllil) {
    if (lIii1 == "x") iII1iI += II1ill.charAt(Math.floor(Math.random() * II1ill.length));else lIii1 == "X" ? iII1iI += II1ill.charAt(Math.floor(Math.random() * II1ill.length)).toUpperCase() : iII1iI += lIii1;
  }
  return iII1iI;
}
function _utf8_encode(l1Il1l) {
  l1Il1l = l1Il1l.replace(/rn/g, "n");
  var IIl1ii = "";
  for (var il1l = 0; il1l < l1Il1l.length; il1l++) {
    var Ii11ll = l1Il1l.charCodeAt(il1l);
    if (Ii11ll < 128) IIl1ii += String.fromCharCode(Ii11ll);else Ii11ll > 127 && Ii11ll < 2048 ? (IIl1ii += String.fromCharCode(Ii11ll >> 6 | 192), IIl1ii += String.fromCharCode(Ii11ll & 63 | 128)) : (IIl1ii += String.fromCharCode(Ii11ll >> 12 | 224), IIl1ii += String.fromCharCode(Ii11ll >> 6 & 63 | 128), IIl1ii += String.fromCharCode(Ii11ll & 63 | 128));
  }
  return IIl1ii;
}
function base64_mod_encode(iiiilI, lIlIIi) {
  lIlIIi = lIlIIi || base64_mod_charset;
  var llI1 = "",
    I11lIl,
    iliii,
    lIlIIl,
    I11lIi,
    lII1i1,
    IIl1i1,
    Ii11lI,
    II1ii1 = 0;
  iiiilI = _utf8_encode(iiiilI);
  while (II1ii1 < iiiilI.length) {
    I11lIl = iiiilI.charCodeAt(II1ii1++);
    iliii = iiiilI.charCodeAt(II1ii1++);
    lIlIIl = iiiilI.charCodeAt(II1ii1++);
    I11lIi = I11lIl >> 2;
    lII1i1 = (I11lIl & 3) << 4 | iliii >> 4;
    IIl1i1 = (iliii & 15) << 2 | lIlIIl >> 6;
    Ii11lI = lIlIIl & 63;
    if (isNaN(iliii)) IIl1i1 = Ii11lI = 64;else isNaN(lIlIIl) && (Ii11lI = 64);
    llI1 = llI1 + lIlIIi.charAt(I11lIi) + lIlIIi.charAt(lII1i1) + lIlIIi.charAt(IIl1i1) + lIlIIi.charAt(Ii11lI);
  }
  while (llI1.length % 4 > 1) llI1 += "=";
  return llI1;
}
function get_ep(ilii1 = {}) {
  let li1l1I = {
    "ciphertype": 5,
    "cipher": {
      "ud": base64_mod_encode(cryptoJS.SHA1($.UserName).toString()),
      "sv": base64_mod_encode($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(li1l1I);
}
function get_ua(iIlIIl, ilIl11 = {}) {
  const lIii = {
      "jd": {
        "app": "jdapp",
        "appBuild": "168392",
        "client": "android",
        "clientVersion": "10.1.0"
      },
      "lite": {
        "app": "jdltapp",
        "appBuild": "1247",
        "client": "ios",
        "clientVersion": "6.0.0"
      }
    },
    ii1 = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = randomList(ii1);
  let lII1li = iIlIIl || "jd",
    lII1ll = ilIl11?.["ep"] ? ilIl11?.["ep"] : true;
  if (!lIii[lII1li]) {
    console.log("获取[" + lII1li + "]UA失败");
    return;
  }
  $.client = ilIl11?.["client"] ? ilIl11?.["client"] : lIii[lII1li].client;
  $.clientVersion = ilIl11?.["clientVersion"] ? ilIl11?.["clientVersion"] : lIii[lII1li].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let lIilI = "android";
  if ($.client == "apple") {
    lIilI = "iPhone";
  }
  get_ep();
  let lli1I1 = [lIii[lII1li].app, lIilI, $.clientVersion, "", "rn/" + randomUuid(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + lIii[lII1li].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", lII1ll ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = lli1I1.join(";");
}
function getParam(ilIl1i, ilIIIi) {
  const IIi1l = new RegExp("(^|&)" + ilIIIi + "=([^&]*)(&|$)", "i"),
    IIi1i = ilIl1i.match(IIi1l);
  if (IIi1i != null) return unescape(IIi1i[2]);
  return null;
}
function jsonParse(IlIii1) {
  if (typeof IlIii1 == "string") try {
    return JSON.parse(IlIii1);
  } catch (lII1l1) {
    return console.log(lII1l1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}