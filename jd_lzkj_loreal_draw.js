/*
活动名称：幸运抽奖（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=<10020/10021/10026/10041/10042/10046/10062/10063/10073/10080>&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_draw_url // 活动链接
          jd_lzkj_loreal_draw_Notify // 是否推送通知（true/false），默认不推送
		  jd_lzkj_loreal_draw_opencard // 是否入会（true/false），默认不入会
		  jd_lzkj_loreal_draw_break // 493后继续执行，默认退出运行（true/false）
          jd_lzkj_loreal_draw_Interval // 自定义抽奖间隔（正整数），默认1秒
		  jd_lzkj_loreal_draw_Number // 连续无次数跳出，默认 7 次，火爆账号请设置黑名单，否则也会占用次数
		  jd_lzkj_loreal_draw_MaxMiss // 最大连续未抽中次数（正整数），达到此次数后会跳过运行对应账号，默认不启用此功能
		  
注释：
请使用本地IP环境 请使用本地IP环境 请使用本地IP环境
需要链接中的三个必要参数才能正常访问活动页，运行脚本至少需要提供 activityId 参数
只有在没有抽奖次数的前提下才会做任务，做任务静默运行没有打印日志

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#幸运抽奖（超级无线）
1 1 1 1 * jd_lzkj_loreal_draw.js, tag=幸运抽奖（超级无线）, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('幸运抽奖（超级无线）');
const i11I1iI1 = $.isNode() ? require("./jdCookie") : "",
  ll1iiIil = require("./function/jdCommon"),
  l1I1liIl = require("./function/sendJDNotify"),
  liI1li11 = require("./function/krh5st"),
  l11l1l11 = require("./function/krgetToken"),
  {
    loreal_savePrize: iiIilI1
  } = require("./function/krsavePrize"),
  lIi1ll1l = require("crypto-js");
let Iill11l1 = [];
const l11I1llI = process.env.jd_lzkj_loreal_draw_url || "",
  iIiI1lI = process.env.jd_lzkj_loreal_draw_opencard === "true",
  llIiiiil = process.env.jd_lzkj_loreal_draw_Notify === "true",
  I1lliiIl = process.env.jd_lzkj_loreal_draw_break === "true",
  i1llI1i = process.env.jd_lzkj_loreal_draw_Interval || "";
let ii1i1Ii1 = process.env.jd_lzkj_loreal_draw_MaxMiss || "",
  IIlII1i1 = true,
  li1iillI = process.env.jd_lzkj_loreal_draw_Number ? process.env.jd_lzkj_loreal_draw_Number : "7",
  l1li1Il1 = "",
  lIiIIIi1 = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(i11I1iI1).forEach(llIiI1I1 => {
    Iill11l1.push(i11I1iI1[llIiI1I1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Iill11l1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(iIIi1lli => iIIi1lli.cookie)].filter(ii1i1I1 => !!ii1i1I1);
!Iill11l1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!l11I1llI) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const lI1i1l1I = ll1iiIil.parseUrl(l11I1llI);
  if (!lI1i1l1I) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = l11I1llI;
  $.activityId = ll1iiIil.getUrlParameter(l11I1llI, "activityId");
  $.activityType = ll1iiIil.getUrlParameter(l11I1llI, "activityType");
  $.hostname = lI1i1l1I?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) $.wxActType = "apps/interact";else $.hostname.includes("lzkj") && ($.wxActType = l11I1llI.match(/\/(prod\/cc\/interact\w*)\//)[1]);
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + $.wxActType;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.wxActType || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  try {
    ii1i1Ii1 = parseInt(ii1i1Ii1);
  } catch {
    ii1i1Ii1 = 0;
  }
  l1I1liIl.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  console.log("\n是否推送通知【" + (llIiiiil == true ? "通知" : "不通知") + "】 是否开卡 【" + (iIiI1lI == true ? "不开卡" : "默认开卡") + "】");
  console.log("\n当前设定连续 【" + li1iillI + "】 次无抽奖次数跳出");
  console.log("\n当前设定 493 是否继续运行【" + (I1lliiIl == true ? "不退出" : "退出") + "】");
  for (let I1iiIl11 = 0; I1iiIl11 < Iill11l1.length; I1iiIl11++) {
    if (I1iiIl11 > li1iillI && IIlII1i1) {
      console.log("\n检测到多次无抽奖次数，跳过此次运行\n");
      break;
    }
    $.outFlag = false;
    if (Iill11l1[I1iiIl11]) {
      $.index = I1iiIl11 + 1;
      l1li1Il1 = Iill11l1[I1iiIl11];
      lIiIIIi1 = Iill11l1[I1iiIl11];
      $.UserName = decodeURIComponent(ll1iiIil.getCookieValue(l1li1Il1, "pt_pin"));
      $.UA = ll1iiIil.genUA($.UserName);
      $.UUID = ll1iiIil.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.te = Math.floor(Math.random() * 9000) + 1000;
      $.message = l1I1liIl.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await I1IIIiII();
      if ($.outFlag || $.runEnd) break;
    }
  }
  llIiiiil && l1I1liIl.getMessage() && (l1I1liIl.updateContent(l1I1liIl.content + ("\n【活动地址】：" + $.activityUrl)), await l1I1liIl.push());
})().catch(llil1iII => $.logErr(llil1iII)).finally(() => $.done());
async function I1IIIiII() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await l11l1l11(lIiIIIi1, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await iIIii1iI("login");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      switch ($.joinCode) {
        case "1004":
          await iIIii1iI("follow"), await $.wait(500);
          break;
        case "1005":
        case "1006":
          $.joinCode !== "1005" && (await iIIii1iI("follow"));
          if (iIiI1lI) {
            $.errorJoinShop = "";
            $.joinVenderId = $.venderId;
            for (let illiiliI = 0; illiiliI < Array(3).length; illiiliI++) {
              if (illiiliI > 0) console.log("第" + illiiliI + "次 重新入会");
              await Iil1l111();
              await $.wait(500);
              if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
            }
            $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("❌ 入会失败"), $.skipRun = true);
          } else {
            console.log("活动仅限店铺会员参与哦~");
            $.message.fix("活动仅限店铺会员参与");
            return;
          }
          break;
        default:
          if ($.joinCode !== "1001") {
            console.log($.joinDes);
            $.message.fix($.joinDes);
            return;
          }
          break;
      }
      if ($.runEnd || $.outFlag || $.skipRun) return;
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) return;
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.hostname.includes("lzkj")) {
      await iIIii1iI("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await iIIii1iI("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10020":
        case "10021":
        case "10026":
        case "10041":
        case "10042":
        case "10046":
        case "10054":
        case "10062":
        case "10063":
        case "10073":
        case "10080":
          break;
        case "":
          console.log("未能获取活动类型"), $.message.fix("未能获取活动类型"), $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.message.fix("活动类型（" + $.activityType + "）不受支持"), $.runEnd = true;
          return;
      }
      if ($.runEnd || $.outFlag) return;
      await $.wait(500);
    }
    await iIIii1iI("drawPrize");
    await $.wait(500);
    if ($.index === 1) {
      let lIIiIiil = false,
        iI1i11Il = "";
      for (let ilII11li = 0; ilII11li < $.prizeInfo.length; ilII11li++) {
        const Iliil11I = $.prizeInfo[ilII11li],
          ilIl1Iil = Iliil11I.prizeName,
          iiI1l1li = Iliil11I.leftNum,
          Ill1Illl = Iliil11I.prizeType;
        iiI1l1li >= 1 && (lIIiIiil = true);
        iI1i11Il += "  " + ilIl1Iil + (Ill1Illl === 5 ? "[专享价]" : Ill1Illl === 3 ? "[实物]" : "") + " - " + (iiI1l1li >= 1 ? "剩余" + iiI1l1li + "件" : "已发完") + "\n";
      }
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：\n" + iI1i11Il);
      l1I1liIl.updateContent(l1I1liIl.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】" + iI1i11Il));
      const i1111lII = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        llii = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const IllII1II = Date.now();
          if ($.actStartTime && IllII1II < $.actStartTime) {
            console.log("活动将在 " + i1111lII + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + i1111lII);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && IllII1II > $.actEndTime) {
            console.log("活动已于 " + llii + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + llii);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + i1111lII + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + i1111lII), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + llii + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + llii), $.runEnd = true;
          return;
        default:
          if ($.actStatus) {
            console.log("未知活动状态 " + $.actStatus);
            $.message.fix("未知活动状态 " + $.actStatus);
            $.runEnd = true;
          }
          break;
      }
      if (!lIIiIiil) {
        console.log("奖品已全部发完，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    switch ($.activityType) {
      case "10020":
      case "10021":
      case "10041":
      case "10042":
      case "10046":
      case "10054":
      case "10062":
      case "10063":
      case "10073":
        if ($.drawNumber <= 0) {
          if (["10020", "10021"].includes($.activityType)) await iIIii1iI("task_jiugongge");else ["10054"].includes($.activityType) ? await iIIii1iI("getTask_upperSign") : await iIIii1iI("task_lotteryCenter");
          await $.wait(500);
          if ($.runEnd || $.outFlag || $.skipRun) return;
          for (let lliIiII1 = 0; lliIiII1 < $.taskList.length; lliIiII1++) {
            const iIiIl11I = $.taskList[lliIiII1],
              ii1Ilii1 = iIiIl11I?.["status"] || 0,
              lIii1i11 = iIiIl11I.taskType;
            if (ii1Ilii1 === 0) {
              if (iIiIl11I.taskId) switch (lIii1i11) {
                case 1:
                case 2:
                case 4:
                case 6:
                case 9:
                case 14:
                  $.taskId = iIiIl11I.taskId, $.skuId = "", await iIIii1iI("toDo"), await $.wait(500);
                  break;
                case 3:
                case 5:
                case 7:
                  $.taskId = iIiIl11I.taskId;
                  const iIlIi1l1 = iIiIl11I.skuInfoVO || [];
                  for (let il1IiilI = 0; il1IiilI < iIlIi1l1.length; il1IiilI++) {
                    iIlIi1l1[il1IiilI].status !== 1 && ($.skuId = iIlIi1l1[il1IiilI].skuId, await iIIii1iI("toDo"), await $.wait(500));
                  }
                  break;
                case 10:
                case 12:
                  const IlIIiI1 = iIiIl11I?.["finishNum"],
                    IlIIi1Il = iIiIl11I?.["shareCount"];
                  if (IlIIi1Il <= IlIIiI1) {
                    $.taskId = iIiIl11I.taskId;
                    $.skuId = "";
                    for (let il1ii111 = 0; il1ii111 < IlIIiI1; il1ii111++) {
                      await iIIii1iI("toDo");
                      await $.wait(500);
                    }
                  }
                  break;
                case 15:
                  !$.shareUserId && ($.maxShareTimes = iIiIl11I.finishNum || 1);
                  await iIIii1iI("getUserId"), await $.wait(500);
                  break;
                case 8:
                case 13:
                case 22:
                  break;
                default:
                  break;
              }
            }
          }
          await iIIii1iI("drawPrize");
          await $.wait(500);
        }
        break;
      case "10026":
      case "10080":
        break;
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    let iIii = 500;
    if (i1llI1i) try {
      const ii1IIiIl = parseInt(i1llI1i) * 1000;
      iIii = ii1IIiIl || 500;
    } catch {
      $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
    }
    $.drawMissTimes = 0;
    switch ($.activityType) {
      case "10020":
      case "10021":
      case "10041":
      case "10042":
      case "10046":
      case "10054":
      case "10062":
      case "10063":
        if ($.drawNumber <= 0) {
          console.log("没有抽奖机会了~");
          $.message.fix("抽奖机会不足");
          return;
        }
        for (let ll11liII = 0; ll11liII < $.drawNumber; ll11liII++) {
          await iIIii1iI("draw");
          if (ii1i1Ii1 && $.drawMissTimes >= ii1i1Ii1) break;
          await $.wait(iIii);
          if (ll11liII >= 8) {
            console.log("\n抽奖太多次了，下次再继续吧~");
            $.message.insert("抽奖太多次了，下次再抽");
            break;
          }
        }
        break;
      case "10026":
      case "10073":
      case "10080":
        await iIIii1iI("getPoints");
        if ($.runEnd || $.outFlag || $.skipRun) return;
        $.drawNumber && ["10073", "10080"].includes($.activityType) && ($.poorScore += $.drawNumber * $.consumePoints);
        const iilIIl = parseInt($.poorScore / $.consumePoints);
        if (iilIIl <= 0) {
          console.log("积分不足无法抽奖~");
          $.message.insert("积分不足");
          return;
        }
        await $.wait(500);
        for (let l1I11l1i = 0; l1I11l1i < iilIIl; l1I11l1i++) {
          await iIIii1iI("draw");
          if (ii1i1Ii1 && $.drawMissTimes >= ii1i1Ii1) break;
          if (l1I11l1i >= 8) {
            console.log("\n抽奖太多次了，下次再继续吧~");
            $.message.insert("抽奖太多次了，下次再抽");
            break;
          }
          await $.wait(iIii);
        }
        break;
    }
  } catch (il1IliII) {
    console.log("❌ 脚本运行遇到了错误\n" + il1IliII);
  }
}
async function IIlII11(iII1liI, I1iI1l) {
  try {
    switch (iII1liI) {
      case "login":
        if (I1iI1l.resp_code === 0 && I1iI1l.data) $.token = I1iI1l?.["data"]?.["token"], $.joinInfo = I1iI1l?.["data"]?.["joinInfo"], $.openCardUrl = $.joinInfo?.["openCardUrl"], $.shopId = I1iI1l?.["data"]?.["shopId"], $.venderId = ll1iiIil.getUrlParameter($.openCardUrl, "venderId"), $.shopName = I1iI1l?.["data"]?.["shopName"], $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"], $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"], $.shareUserId && ($.shareTimes += 1);else I1iI1l.resp_msg ? (console.log(iII1liI + " " + I1iI1l.resp_msg), $.message.fix(I1iI1l.resp_msg), $.skipRun = true) : console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
        break;
      case "follow":
        if (I1iI1l.resp_code === 0) {} else {
          if (I1iI1l.resp_msg) {
            console.log(iII1liI + " " + I1iI1l.resp_msg);
            $.message.fix(I1iI1l.resp_msg);
            $.skipRun = true;
          } else console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
        }
        break;
      case "initPinToken":
        if (I1iI1l.resp_code === 0 && I1iI1l.data) {
          I1iI1l = JSON.parse(I1iI1l.data);
          if (I1iI1l.resp_code === 0 && I1iI1l.data) $.pinToken = I1iI1l?.["data"]?.["pinToken"], $.encryptPin = I1iI1l?.["data"]?.["encryptPin"];else {
            if (I1iI1l.resp_code === 1000) console.log(iII1liI + " " + I1iI1l.resp_msg), $.message.fix(I1iI1l.resp_msg), $.skipRun = true;else I1iI1l.resp_msg ? (console.log(iII1liI + " " + I1iI1l.resp_msg), $.message.fix(I1iI1l.resp_msg), $.skipRun = true) : (console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l)), $.skipRun = true);
          }
        } else console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
        break;
      case "basicInfo":
        if (I1iI1l.resp_code === 0 && I1iI1l.data) $.actStartTime = I1iI1l.data?.["startTime"], $.actEndTime = I1iI1l.data?.["endTime"], $.actStatus = I1iI1l.data?.["actStatus"], !$.activityType && ($.activityType = String(I1iI1l.data?.["actType"] || ""));else I1iI1l.resp_msg ? (console.log(iII1liI + " " + I1iI1l.resp_msg), $.message.fix(I1iI1l.resp_msg), $.runEnd) : console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
        break;
      case "getPoints":
        if (I1iI1l.resp_code === 0 && I1iI1l.data) $.consumePoints = I1iI1l.data?.["consumePoints"], $.poorScore = I1iI1l.data?.["poorScore"];else I1iI1l.resp_msg ? (console.log(iII1liI + " " + I1iI1l.resp_msg), $.message.fix(I1iI1l.resp_msg), $.skipRun = true) : console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
        break;
      case "getUserId":
        if (I1iI1l.resp_code === 0 && I1iI1l.data) !$.shareUserIdArray && ($.shareUserIdArray = [], $.shareTimes = 0), $.shareUserIdArray.push(I1iI1l.data?.["shareUserId"]), !$.shareUserId && ($.shareUserId = I1iI1l.data?.["shareUserId"]), $.shareTimes >= $.maxShareTimes && ($.shareUserId = $.shareUserIdArray[0] || "", $.shareTimes = 0);else {
          if (I1iI1l.resp_msg) {
            console.log(iII1liI + " " + I1iI1l.resp_msg);
          } else {
            console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
          }
        }
        break;
      case "task_jiugongge":
      case "task_lotteryCenter":
      case "getTask_upperSign":
        if (I1iI1l.resp_code === 0) $.taskList = I1iI1l?.["data"]?.["taskList"] || [];else {
          if (I1iI1l.resp_code === 1000) console.log(iII1liI + " 获取任务失败"), $.message.insert("获取任务失败");else I1iI1l.resp_msg ? console.log(iII1liI + " " + I1iI1l.resp_msg) : console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
        }
        break;
      case "toDo":
        if (I1iI1l.resp_code === 0) {} else {
          if (I1iI1l.resp_code === 50013 || I1iI1l.resp_code === 50012) {} else {
            if (I1iI1l.resp_msg) console.log(iII1liI + " " + I1iI1l.resp_msg);else {
              console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
            }
          }
        }
        break;
      case "draw":
        if (I1iI1l.resp_code === 0) {
          IIlII1i1 = false;
          if (I1iI1l.data === "1") {
            console.log("积分不足无法抽奖");
            $.message.insert("积分不足");
          } else {
            if (I1iI1l.data === "2") console.log("抽奖机会不足"), $.message.insert("抽奖机会不足");else {
              drawInfo = I1iI1l.data;
              if (drawInfo) switch (drawInfo.prizeType) {
                case 1:
                  console.log("🎉 " + drawInfo.prizeName + " 🐶"), $.message.insert(drawInfo.prizeName + "🐶");
                  break;
                case 2:
                  console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
                  break;
                case 3:
                  const ll1I1IIi = I1iI1l.data.addressId,
                    IlllIlI = drawInfo.prizeName;
                  console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + IlllIlI);
                  if (drawInfo.showImg) console.log("预览图片：" + drawInfo.showImg);
                  const I111lI1 = {
                      "baseUrl": $.baseUrl,
                      "newbaseUrl": $.newbaseUrl,
                      "cookie": lIiIIIi1,
                      "ua": $.UA,
                      "token": $.token,
                      "prizeName": IlllIlI,
                      "orderCode": ll1I1IIi
                    },
                    lII1I1Il = await iiIilI1(I111lI1);
                  if (!llIiiiil && lII1I1Il) {
                    await l1I1liIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + IlllIlI + "，已成功自动登记收货地址\n\n" + $.activityUrl);
                  }
                  $.message.insert(IlllIlI + "(" + (lII1I1Il ? "已填地址" : "未填地址") + ")🎁");
                  break;
                case 4:
                case 11:
                  console.log("🗑️ " + drawInfo.prizeName + " 🎟️"), $.message.insert("🗑️ " + drawInfo.prizeName + " 🎟️");
                  break;
                case 5:
                  console.log("🗑️ 专享价"), $.message.insert("🗑️ 专享价");
                  break;
                case 6:
                  console.log("🎉 " + drawInfo.prizeName + " 🧧"), $.message.insert("🎉 " + drawInfo.prizeName + " 🧧");
                  break;
                case 7:
                case 8:
                case 9:
                case 10:
                case 12:
                  console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁"), $.message.insert("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                  if (!llIiiiil) {
                    await l1I1liIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.prizeName + "\n\n" + $.activityUrl);
                  }
                  break;
                default:
                  console.log(drawInfo);
                  break;
              } else $.drawMissTimes += 1, console.log("💨 空气"), $.message.insert("💨 空气");
            }
          }
        } else {
          if (I1iI1l.resp_msg) {
            console.log(iII1liI + " " + I1iI1l.resp_msg);
            for (let i1lI1l1l of ["未开始", "结束", "不存在", "不在"]) {
              if (I1iI1l.resp_msg.includes(i1lI1l1l)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(I1iI1l.resp_msg);
          } else console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
        }
        break;
      case "drawPrize":
        if (I1iI1l.resp_code === 0) $.drawNumber = I1iI1l?.["data"]?.["drawNumber"], $.prizeInfo = I1iI1l?.["data"]?.["prizeInfo"] || [];else {
          if (I1iI1l.resp_msg) {
            console.log(iII1liI + " " + I1iI1l.resp_msg);
            for (let iI11Il of ["未开始", "结束", "不存在", "不在"]) {
              if (I1iI1l.resp_msg.includes(iI11Il)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(I1iI1l.resp_msg);
          } else console.log("❓" + iII1liI + " " + JSON.stringify(I1iI1l));
        }
        break;
    }
  } catch (iliii1ii) {
    console.log("❌ 未能正确处理 " + iII1liI + " 请求响应 " + (iliii1ii.message || iliii1ii));
  }
}
async function iIIii1iI(I1II1I1I) {
  if ($.runEnd || $.outFlag) return;
  let IlI1i1 = $.newbaseUrl,
    IiIIiliI = {},
    iI11i1I = "POST";
  switch (I1II1I1I) {
    case "login":
      IlI1i1 += "/api/user-info/login", IiIIiliI = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      IlI1i1 += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      iI11i1I = "GET", IlI1i1 += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      IlI1i1 += "/api/active/basicInfo", IiIIiliI = {
        "activityId": $.activityId
      };
      break;
    case "getPoints":
      IlI1i1 += "/api/task/points/getPoints";
      break;
    case "getUserId":
      IlI1i1 += "/api/task/share/getUserId";
      break;
    case "task_jiugongge":
      IlI1i1 += "/api/task/jiugongge/activity";
      break;
    case "task_lotteryCenter":
      IlI1i1 += "/api/task/lotteryCenter/activity";
      break;
    case "getTask_upperSign":
      IlI1i1 += "/api/task/upperSign/getTask", IiIIiliI = {
        "shareUserId": $.shareUserId || ""
      };
      break;
    case "toDo":
      IlI1i1 += "/api/basic/task/toDo", IiIIiliI = {
        "taskId": $.taskId,
        "skuId": $.skuId
      };
      break;
    case "drawPrize":
      IlI1i1 += "/api/prize/drawPrize";
      break;
    case "draw":
      IlI1i1 += "/api/prize/draw";
      if ($.hostname.includes("lorealjdcampaign-rc")) IiIIiliI = {
        "consumePoints": $.consumePoints || 0
      };else {
        if ($.hostname.includes("lzkj")) {
          IiIIiliI = {
            "ecyText": IIIIl1II({
              "consumePoints": $.consumePoints || 0,
              "actId": $.activityId
            }, $.pinToken, $.te)
          };
        }
      }
      break;
    default:
      console.log("❌ 未知请求 " + I1II1I1I);
      return;
  }
  const lililIil = {
    "url": IlI1i1,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      "Cookie": "IsvToken=" + $.jdToken + "; " + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      "Host": $.hostname,
      "Origin": $.origin,
      "Referer": $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "token": $.token,
      "User-Agent": $.UA
    },
    "body": JSON.stringify(IiIIiliI),
    "timeout": 30000
  };
  iI11i1I === "GET" && (delete lililIil.body, delete lililIil["Content-Type"]);
  const I1Iiiil = 5;
  let lilllIl1 = 0,
    I1ll1i1 = null,
    I1III1 = false;
  while (lilllIl1 < I1Iiiil) {
    lilllIl1 > 0 && (await $.wait(1000));
    const {
      err: I1Iiill,
      res: ii1IIl1i,
      data: l1iii1ii
    } = await liiIll(lililIil, iI11i1I);
    if (I1Iiill) {
      if (typeof I1Iiill === "string" && I1Iiill.includes("Timeout awaiting 'request'")) I1ll1i1 = I1II1I1I + " 请求超时，请检查网络重试";else {
        const i1IIiII1 = ii1IIl1i?.["statusCode"];
        if (i1IIiII1) {
          if ([403, 493].includes(i1IIiII1)) I1ll1i1 = I1II1I1I + " 请求失败，IP被限制（Response code " + i1IIiII1 + "）", I1III1 = true;else [400, 404].includes(i1IIiII1) ? I1ll1i1 = I1II1I1I + " 请求配置参数错误，请联系开发者进行反馈（Response code " + i1IIiII1 + "）" : I1ll1i1 = I1II1I1I + " 请求失败（Response code " + i1IIiII1 + "）";
        } else I1ll1i1 = I1II1I1I + " 请求失败 => " + (I1Iiill.message || I1Iiill);
      }
      lilllIl1++;
    } else {
      const liIi1lI1 = ll1iiIil.getResponseCookie(ii1IIl1i),
        IiI11 = false;
      if (IiI11) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + I1II1I1I + " 响应Body => " + (l1iii1ii || "无") + "\n");
        console.log("🔧 " + I1II1I1I + " 响应Cookie => " + (liIi1lI1 || "无") + "\n");
        console.log("🔧 " + I1II1I1I + " 请求参数");
        console.log(lililIil);
        console.log("\n---------------------------------------------------\n");
      }
      if (!["accessLog", "accessLogWithAD"].includes(I1II1I1I)) try {
        const iIilIlii = JSON.parse(l1iii1ii);
        IIlII11(I1II1I1I, iIilIlii);
        break;
      } catch (IlI1IlII) {
        I1ll1i1 = "❌ " + I1II1I1I + " 接口响应数据解析失败: " + IlI1IlII.message;
        console.log("🚫 " + I1II1I1I + " => " + String(l1iii1ii || "无响应数据"));
        if (IiI11) {
          console.log("\n---------------------------------------------------\n");
          console.log(activityCookie);
          console.log("\n---------------------------------------------------\n");
        }
        lilllIl1++;
      } else {
        break;
      }
      I1III1 = false;
    }
  }
  lilllIl1 >= I1Iiiil && (console.log(I1ll1i1), I1III1 && !I1lliiIl && ($.outFlag = true, $.message && $.message.fix(I1ll1i1)));
}
async function liiIll(ili1Ii11, IIi1lll1 = "POST") {
  if (IIi1lll1 === "POST") return new Promise(async lIIlIlIl => {
    $.post(ili1Ii11, (Il1iiiil, li1iIill, IllliiIl) => {
      lIIlIlIl({
        "err": Il1iiiil,
        "res": li1iIill,
        "data": IllliiIl
      });
    });
  });else {
    if (IIi1lll1 === "GET") return new Promise(async iiiIi1Ii => {
      $.get(ili1Ii11, (Il1l1iII, iilIlii1, iilIiiiI) => {
        iiiIi1Ii({
          "err": Il1l1iII,
          "res": iilIlii1,
          "data": iilIiiiI
        });
      });
    });else {
      const iIlli1II = "不支持的请求方法";
      return {
        "err": iIlli1II,
        "res": null,
        "data": null
      };
    }
  }
}
async function Iil1l111() {
  if (!$.joinVenderId) return;
  return new Promise(async llIII1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Il1iiliI = "";
    if ($.shopactivityId) Il1iiliI = ",\"activityId\":" + $.shopactivityId;
    const ilIii1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Il1iiliI + ",\"channel\":406}",
      I1II1il1 = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ilIii1)
      },
      l1ilIiil = await liI1li11("27004", I1II1il1),
      lli1IlI = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + ilIii1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1ilIiil),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": l1li1Il1
        }
      };
    $.get(lli1IlI, async (IlIl1Il1, ilI1iIiI, l1llII1) => {
      try {
        if (IlIl1Il1) console.log(IlIl1Il1);else {
          const Ii111II = JSON.parse(l1llII1);
          if (typeof Ii111II === "object") {
            if (Ii111II.success === true) {
              console.log(Ii111II.message);
              $.errorJoinShop = Ii111II.message;
              if (Ii111II.result && Ii111II.result.giftInfo) {
                for (let llIIiI11 of Ii111II.result.giftInfo.giftList) {
                  console.log("入会获得：" + llIIiI11.discountString + llIIiI11.prizeName + llIIiI11.secondLineDesc);
                }
              }
            } else typeof Ii111II == "object" && Ii111II.message ? ($.errorJoinShop = Ii111II.message, console.log("" + (Ii111II.message || ""))) : console.log(l1llII1);
          } else console.log(l1llII1);
        }
      } catch (I1i1lIi) {
        $.logErr(I1i1lIi, ilI1iIiI);
      } finally {
        llIII1();
      }
    });
  });
}
function IIIIl1II(Ili1lIii, lI11l1iI, i1I1IIli) {
  function iIi1I1(liIilI1i) {
    liIilI1i = liIilI1i.split("").reverse().join("");
    const lili1I = new Uint8Array(12),
      IIIi11li = new TextEncoder().encode(liIilI1i);
    for (let Il1iIlII = 0; Il1iIlII < IIIi11li.length; Il1iIlII += 2) {
      let l1l1I1ii = IIIi11li[Il1iIlII] << 5 | IIIi11li[Il1iIlII + 1] & 255;
      l1l1I1ii %= 63;
      lili1I[Il1iIlII >> 1] = l1l1I1ii;
    }
    let I1iil1iI = "";
    for (let Il1liiil = 0; Il1liiil < lili1I.length; Il1liiil++) {
      I1iil1iI += (lili1I[Il1liiil] + 256).toString(2).slice(1);
    }
    let lIIilIIi = "",
      IIlIliIi = "";
    for (let Ilil1liI = 0; Ilil1liI < 16; Ilil1liI++) {
      if (Ilil1liI !== 0) {
        const iiiiillI = Ilil1liI * 6,
          I1llIl1i = I1iil1iI.substring(iiiiillI, iiiiillI + 6);
        let l11IIIi = parseInt(I1llIl1i, 2);
        const IilI1111 = IIlIliIi.split("");
        for (let l1iiI1l1 = 0; l1iiI1l1 < IilI1111.length; l1iiI1l1++) {
          IilI1111[l1iiI1l1] === "1" && (l11IIIi = (l11IIIi >> 6 - l1iiI1l1 | l11IIIi << l1iiI1l1) & 63);
        }
        IIlIliIi = (l11IIIi & 63).toString(2).padStart(6, "0");
      } else IIlIliIi = I1iil1iI.substring(0, 6);
      lIIilIIi += IIlIliIi;
    }
    for (let IiiIIiIi = 0; IiiIIiIi < 12; IiiIIiIi++) {
      const l1il1ili = IiiIIiIi * 8;
      lili1I[IiiIIiIi] = parseInt(lIIilIIi.substring(l1il1ili, l1il1ili + 8), 2);
    }
    const IiIi11ll = btoa(String.fromCharCode.apply(null, lili1I));
    return IiIi11ll;
  }
  const iiI1I11 = ["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"];
  let lli1lIIl = Date.now() + parseInt(i1I1IIli);
  typeof Ili1lIii != "object" && (Ili1lIii = JSON.parse(Ili1lIii));
  Ili1lIii.nowTime = lli1lIIl;
  let liIIllI = lI11l1iI + lli1lIIl;
  const lilI111i = liIIllI.substring(0, liIIllI.length - 5);
  let I1Ili111 = "";
  for (let il11 = 0; il11 < lilI111i.length; il11++) {
    let lI11111i = lilI111i.charCodeAt(il11),
      liIlII11 = lI11111i % 10,
      liii1llI = iiI1I11[liIlII11][il11];
    I1Ili111 += liii1llI;
  }
  var li1i1IlI = I1Ili111.length,
    il111il1 = Math.floor(li1i1IlI / 24),
    II1l11l = "";
  for (var IiliIili = 0; IiliIili < 24; IiliIili++) {
    var IiiI11l = (IiliIili + 1) * il111il1;
    IiliIili === 23 && (IiiI11l = li1i1IlI);
    var II1l11I1 = I1Ili111.substring(IiliIili * il111il1, IiiI11l),
      ii1I1i11 = [];
    for (var iI1Ii11i = 0; iI1Ii11i < II1l11I1.length; iI1Ii11i++) {
      ii1I1i11.push(II1l11I1.charCodeAt(iI1Ii11i));
    }
    var llllIII1 = ii1I1i11.reduce(function (l1iil1i, lI1li11i) {
        return l1iil1i + lI1li11i;
      }, 0),
      IIIi11iI = Math.floor(llllIII1 / ii1I1i11.length);
    II1l11l += String.fromCharCode(IIIi11iI);
  }
  I1Ili111 = II1l11l;
  const II1iIii = iIi1I1(I1Ili111),
    l111iiIl = lIi1ll1l.enc.Utf8.parse(II1iIii),
    iii1I1II = lIi1ll1l.enc.Utf8.parse(""),
    Iii1l11 = lIi1ll1l.AES.encrypt(JSON.stringify(Ili1lIii), l111iiIl, {
      "iv": iii1I1II,
      "mode": lIi1ll1l.mode.ECB,
      "padding": lIi1ll1l.pad.Pkcs7
    });
  return Iii1l11.toString();
}