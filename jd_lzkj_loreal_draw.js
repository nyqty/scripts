/*
活动名称：幸运抽奖（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=<10001/10004/10020/10021/10026/10041/10042/10046/10054/10062/10063/10073/10080>&templateId=<模板id>&activityId=<活动id>&prd=cjwx
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
const I1I1111l = $.isNode() ? require("./jdCookie") : "",
  III1lIl1 = require("./function/jdCommon"),
  lIiIll11 = require("./function/sendJDNotify"),
  I111lIiI = require("./function/krgetToken"),
  {
    loreal_savePrize: lI1ilIii
  } = require("./function/krsavePrize"),
  ilIlll1I = require("crypto-js");
let liI1i1II = [];
const II1IIi11 = process.env.jd_lzkj_loreal_draw_url || "",
  lIlII1l1 = process.env.jd_lzkj_loreal_draw_opencard === "true",
  IiillliI = process.env.jd_lzkj_loreal_draw_Notify === "true",
  I1il1ll1 = process.env.jd_lzkj_loreal_draw_break === "true",
  iilI1Ii = process.env.jd_lzkj_loreal_draw_Interval || "";
let Iil1lii = process.env.jd_lzkj_loreal_draw_MaxMiss || "",
  Il1illIl = true,
  IIii111l = process.env.jd_lzkj_loreal_draw_Number ? process.env.jd_lzkj_loreal_draw_Number : "7",
  lIIIi1Il = "",
  l1lliiII = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(I1I1111l).forEach(lIl1 => {
    liI1i1II.push(I1I1111l[lIl1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else liI1i1II = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(IIIIiIi => IIIIiIi.cookie)].filter(IliI1I1l => !!IliI1I1l);
!liI1i1II[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!II1IIi11) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const i1l1li = III1lIl1.parseUrl(II1IIi11);
  if (!i1l1li) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = II1IIi11;
  $.activityId = III1lIl1.getUrlParameter(II1IIi11, "activityId");
  $.activityType = III1lIl1.getUrlParameter(II1IIi11, "activityType");
  $.hostname = i1l1li?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) $.wxActType = "apps/interact";else {
      if ($.hostname.includes("lzkj")) {
        $.wxActType = II1IIi11.match(/\/(prod\/cc\/interact\w*)\//)[1];
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + $.wxActType;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.wxActType || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  try {
    Iil1lii = parseInt(Iil1lii);
  } catch {
    Iil1lii = 0;
  }
  lIiIll11.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  console.log("\n是否推送通知【" + (IiillliI == true ? "通知" : "不通知") + "】 是否开卡 【" + (lIlII1l1 == true ? "不开卡" : "默认开卡") + "】");
  console.log("\n当前设定连续 【" + IIii111l + "】 次无抽奖次数跳出");
  console.log("\n当前设定 493 是否继续运行【" + (I1il1ll1 == true ? "不退出" : "退出") + "】");
  for (let i111i11i = 0; i111i11i < liI1i1II.length; i111i11i++) {
    if (i111i11i > IIii111l && Il1illIl) {
      console.log("\n检测到多次无抽奖次数，跳过此次运行\n");
      break;
    }
    $.outFlag = false;
    if (liI1i1II[i111i11i]) {
      $.index = i111i11i + 1;
      lIIIi1Il = liI1i1II[i111i11i];
      l1lliiII = liI1i1II[i111i11i];
      III1lIl1.setCookie(l1lliiII);
      $.UserName = decodeURIComponent(III1lIl1.getCookieValue(lIIIi1Il, "pt_pin"));
      $.UA = III1lIl1.genUA($.UserName);
      $.UUID = III1lIl1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.te = Math.floor(Math.random() * 9000) + 1000;
      $.message = lIiIll11.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await il11ilI1();
      III1lIl1.unsetCookie();
      if ($.outFlag || $.runEnd) break;
    }
  }
  IiillliI && lIiIll11.getMessage() && (lIiIll11.updateContent(lIiIll11.content + ("\n【活动地址】：" + $.activityUrl)), await lIiIll11.push());
})().catch(Il11l1l1 => $.logErr(Il11l1l1)).finally(() => $.done());
async function il11ilI1() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await I111lIiI(l1lliiII, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await I111II1l("login");
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
          await I111II1l("follow"), await $.wait(500);
          break;
        case "1005":
        case "1006":
          $.joinCode !== "1005" && (await I111II1l("follow"));
          if (lIlII1l1) {
            const ilIIiI1l = await III1lIl1.joinShopMember($.venderId);
            if (ilIIiI1l) console.log("加入店铺会员成功");else {
              console.log("加入店铺会员失败，活动仅限店铺会员参与哦~");
              $.message.fix("加入店铺会员失败，活动仅限店铺会员参与");
              return;
            }
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
      await I111II1l("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await I111II1l("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10001":
        case "10004":
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
    await I111II1l("drawPrize");
    await $.wait(500);
    if ($.index === 1 && $.prizeInfo) {
      let IllIll1 = false,
        IiI1II1 = "";
      for (let IlI1IlII = 0; IlI1IlII < $.prizeInfo.length; IlI1IlII++) {
        const IllIiIlI = $.prizeInfo[IlI1IlII],
          ll1I1I1l = IllIiIlI.prizeName,
          il1I1ll1 = IllIiIlI.leftNum,
          lI11l1iI = IllIiIlI.prizeType;
        il1I1ll1 >= 1 && (IllIll1 = true);
        IiI1II1 += "  " + ll1I1I1l + (lI11l1iI === 5 ? "[专享价]" : lI11l1iI === 3 ? "[实物]" : "") + "，" + (il1I1ll1 >= 1 ? "剩余" + il1I1ll1 + "件" : "已发完") + "\n";
      }
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：\n" + IiI1II1);
      lIiIll11.updateContent(lIiIll11.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】\n" + IiI1II1));
      const i1iIilI = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        liill11 = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const Ill1lIll = Date.now();
          if ($.actStartTime && Ill1lIll < $.actStartTime) {
            console.log("活动将在 " + i1iIilI + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + i1iIilI);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && Ill1lIll > $.actEndTime) {
            console.log("活动已于 " + liill11 + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + liill11);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + i1iIilI + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + i1iIilI), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + liill11 + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + liill11), $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!IllIll1) {
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
          if (["10020", "10021"].includes($.activityType)) await I111II1l("jiugongge_activity");else ["10054"].includes($.activityType) ? await I111II1l("upperSign_getTask") : await I111II1l("lotteryCenter_activity");
          await $.wait(500);
          if ($.runEnd || $.outFlag || $.skipRun) return;
          for (let i1lllI = 0; i1lllI < $.taskList.length; i1lllI++) {
            const lilIil11 = $.taskList[i1lllI],
              iIli1il1 = lilIil11?.["status"] || 0,
              IliIIiIi = lilIil11.taskType;
            if (iIli1il1 === 0) {
              if (lilIil11.taskId) {
                switch (IliIIiIi) {
                  case 1:
                  case 2:
                  case 4:
                  case 6:
                  case 9:
                  case 14:
                    $.taskId = lilIil11.taskId, $.skuId = "", await I111II1l("toDo"), await $.wait(500);
                    break;
                  case 3:
                  case 5:
                  case 7:
                    $.taskId = lilIil11.taskId;
                    const iilI1I1l = lilIil11.skuInfoVO || [];
                    for (let i1II11ll = 0; i1II11ll < iilI1I1l.length; i1II11ll++) {
                      iilI1I1l[i1II11ll].status !== 1 && ($.skuId = iilI1I1l[i1II11ll].skuId, await I111II1l("toDo"), await $.wait(500));
                    }
                    break;
                  case 10:
                  case 12:
                    const IIIiIlI1 = lilIil11?.["finishNum"],
                      i1IIiIli = lilIil11?.["shareCount"];
                    if (i1IIiIli <= IIIiIlI1) {
                      $.taskId = lilIil11.taskId;
                      $.skuId = "";
                      for (let l1lIIlIl = 0; l1lIIlIl < IIIiIlI1; l1lIIlIl++) {
                        await I111II1l("toDo");
                        await $.wait(500);
                      }
                    }
                    break;
                  case 15:
                    !$.shareUserId && ($.maxShareTimes = lilIil11.finishNum || 1);
                    await I111II1l("getUserId"), await $.wait(500);
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
          }
          await I111II1l("drawPrize");
          await $.wait(500);
        }
        break;
      case "10001":
      case "10004":
        await I111II1l("sign_add"), await $.wait(500);
        break;
      case "10026":
      case "10080":
        break;
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    let I1Ii1Ili = 500;
    if (iilI1Ii) try {
      const I1i11i1i = parseInt(iilI1Ii) * 1000;
      I1Ii1Ili = I1i11i1i || 500;
    } catch {
      $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
    }
    $.drawMissTimes = 0;
    switch ($.activityType) {
      case "10001":
      case "10004":
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
        for (let I1ill1i1 = 0; I1ill1i1 < $.drawNumber; I1ill1i1++) {
          await I111II1l("draw");
          if (Iil1lii && $.drawMissTimes >= Iil1lii) break;
          await $.wait(I1Ii1Ili);
          if (I1ill1i1 >= 8) {
            console.log("\n抽奖太多次了，下次再继续吧~");
            $.message.insert("抽奖太多次了，下次再抽");
            break;
          }
        }
        break;
      case "10026":
      case "10073":
      case "10080":
        await I111II1l("getPoints");
        if ($.runEnd || $.outFlag || $.skipRun) return;
        $.drawNumber && ["10073", "10080"].includes($.activityType) && ($.poorScore += $.drawNumber * $.consumePoints);
        const lil11lll = parseInt($.poorScore / $.consumePoints);
        if (lil11lll <= 0) {
          console.log("积分不足无法抽奖~");
          $.message.insert("积分不足");
          return;
        }
        await $.wait(500);
        for (let i1i1I1l = 0; i1i1I1l < lil11lll; i1i1I1l++) {
          await I111II1l("draw");
          if (Iil1lii && $.drawMissTimes >= Iil1lii) break;
          if (i1i1I1l >= 8) {
            console.log("\n抽奖太多次了，下次再继续吧~");
            $.message.insert("抽奖太多次了，下次再抽");
            break;
          }
          await $.wait(I1Ii1Ili);
        }
        break;
    }
  } catch (IIiilii) {
    console.log("❌ 脚本运行遇到了错误\n" + IIiilii);
  }
}
async function ilii1ii1(I1IiIi1l, il1iIll) {
  try {
    switch (I1IiIi1l) {
      case "login":
        if (il1iIll.resp_code === 0 && il1iIll.data) $.token = il1iIll?.["data"]?.["token"], $.joinInfo = il1iIll?.["data"]?.["joinInfo"], $.openCardUrl = $.joinInfo?.["openCardUrl"], $.shopId = il1iIll?.["data"]?.["shopId"], $.venderId = III1lIl1.getUrlParameter($.openCardUrl, "venderId"), $.shopName = il1iIll?.["data"]?.["shopName"], $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"], $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"], $.shareUserId && ($.shareTimes += 1);else il1iIll.resp_msg ? (console.log(I1IiIi1l + " " + il1iIll.resp_msg), $.message.fix(il1iIll.resp_msg), $.skipRun = true) : console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
        break;
      case "follow":
        if (il1iIll.resp_code === 0) {} else il1iIll.resp_msg ? (console.log(I1IiIi1l + " " + il1iIll.resp_msg), $.message.fix(il1iIll.resp_msg), $.skipRun = true) : console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
        break;
      case "initPinToken":
        if (il1iIll.resp_code === 0 && il1iIll.data) {
          il1iIll = JSON.parse(il1iIll.data);
          if (il1iIll.resp_code === 0 && il1iIll.data) $.pinToken = il1iIll?.["data"]?.["pinToken"], $.encryptPin = il1iIll?.["data"]?.["encryptPin"];else {
            if (il1iIll.resp_code === 1000) console.log(I1IiIi1l + " " + il1iIll.resp_msg), $.message.fix(il1iIll.resp_msg), $.skipRun = true;else il1iIll.resp_msg ? (console.log(I1IiIi1l + " " + il1iIll.resp_msg), $.message.fix(il1iIll.resp_msg), $.skipRun = true) : (console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll)), $.skipRun = true);
          }
        } else console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
        break;
      case "basicInfo":
        if (il1iIll.resp_code === 0 && il1iIll.data) {
          $.actStartTime = il1iIll.data?.["startTime"];
          $.actEndTime = il1iIll.data?.["endTime"];
          $.actStatus = il1iIll.data?.["actStatus"];
          if (!$.activityType) {
            $.activityType = String(il1iIll.data?.["actType"] || "");
          }
        } else il1iIll.resp_msg ? (console.log(I1IiIi1l + " " + il1iIll.resp_msg), $.message.fix(il1iIll.resp_msg), $.runEnd) : console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
        break;
      case "getPoints":
        if (il1iIll.resp_code === 0 && il1iIll.data) $.consumePoints = il1iIll.data?.["consumePoints"], $.poorScore = il1iIll.data?.["poorScore"];else il1iIll.resp_msg ? (console.log(I1IiIi1l + " " + il1iIll.resp_msg), $.message.fix(il1iIll.resp_msg), $.skipRun = true) : console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
        break;
      case "getUserId":
        if (il1iIll.resp_code === 0 && il1iIll.data) !$.shareUserIdArray && ($.shareUserIdArray = [], $.shareTimes = 0), $.shareUserIdArray.push(il1iIll.data?.["shareUserId"]), !$.shareUserId && ($.shareUserId = il1iIll.data?.["shareUserId"]), $.shareTimes >= $.maxShareTimes && ($.shareUserId = $.shareUserIdArray[0] || "", $.shareTimes = 0);else il1iIll.resp_msg ? console.log(I1IiIi1l + " " + il1iIll.resp_msg) : console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
        break;
      case "jiugongge_activity":
      case "lotteryCenter_activity":
      case "upperSign_getTask":
        if (il1iIll.resp_code === 0) $.taskList = il1iIll?.["data"]?.["taskList"] || [];else {
          if (il1iIll.resp_code === 1000) {
            console.log(I1IiIi1l + " 获取任务失败");
            $.message.insert("获取任务失败");
          } else il1iIll.resp_msg ? console.log(I1IiIi1l + " " + il1iIll.resp_msg) : console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
        }
        break;
      case "sign_add":
        if (il1iIll.resp_code === 0) il1iIll.data && il1iIll.data?.["score"] && ($.drawNumber += il1iIll.data?.["score"]);else {
          if (il1iIll.resp_code === 50013 || il1iIll.resp_code === 50012) {} else {
            if (il1iIll.resp_msg) console.log(I1IiIi1l + " " + il1iIll.resp_msg);else {
              console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
            }
          }
        }
        break;
      case "toDo":
        if (il1iIll.resp_code === 0) {} else {
          if (il1iIll.resp_code === 50013 || il1iIll.resp_code === 50012) {} else il1iIll.resp_msg ? console.log(I1IiIi1l + " " + il1iIll.resp_msg) : console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
        }
        break;
      case "draw":
        if (il1iIll.resp_code === 0) {
          if (il1iIll.data === "1") {
            console.log("积分不足无法抽奖");
            $.message.insert("积分不足");
          } else {
            if (il1iIll.data === "2") console.log("抽奖机会不足"), $.message.insert("抽奖机会不足");else {
              const I1lli11 = il1iIll.data;
              if (I1lli11) {
                switch (I1lli11.prizeType) {
                  case 1:
                    console.log("🎉 " + I1lli11.prizeName + " 🐶"), $.message.insert(I1lli11.prizeName + "🐶");
                    break;
                  case 2:
                    console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
                    break;
                  case 3:
                    const lll1lll = il1iIll.data.addressId,
                      iIlil1i1 = I1lli11.prizeName;
                    console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + iIlil1i1);
                    if (I1lli11.showImg) console.log("预览图片：" + I1lli11.showImg);
                    const i1ll1I1I = {
                        "baseUrl": $.baseUrl,
                        "newbaseUrl": $.newbaseUrl,
                        "cookie": l1lliiII,
                        "ua": $.UA,
                        "token": $.token,
                        "prizeName": iIlil1i1,
                        "orderCode": lll1lll
                      },
                      liIiI1I1 = await lI1ilIii(i1ll1I1I);
                    !IiillliI && liIiI1I1 && (await lIiIll11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iIlil1i1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                    $.message.insert(iIlil1i1 + "(" + (liIiI1I1 ? "已填地址" : "未填地址") + ")🎁");
                    break;
                  case 4:
                  case 11:
                    console.log("🗑️ " + I1lli11.prizeName + " 🎟️"), $.message.insert("🗑️ " + I1lli11.prizeName + " 🎟️");
                    break;
                  case 5:
                    console.log("🗑️ 专享价"), $.message.insert("🗑️ 专享价");
                    break;
                  case 6:
                    console.log("🎉 " + I1lli11.prizeName + " 🧧"), $.message.insert("🎉 " + I1lli11.prizeName + " 🧧");
                    break;
                  case 7:
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                    console.log("🎉 恭喜获得" + I1lli11.prizeName + " 🎁"), $.message.insert("🎉 恭喜获得" + I1lli11.prizeName + " 🎁");
                    !IiillliI && (await lIiIll11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + I1lli11.prizeName + "\n\n" + $.activityUrl));
                    break;
                  default:
                    console.log(I1lli11);
                    break;
                }
              } else $.drawMissTimes += 1, console.log("💨 空气"), $.message.insert("💨 空气");
            }
          }
        } else {
          if (il1iIll.resp_msg) {
            console.log(I1IiIi1l + " " + il1iIll.resp_msg);
            for (let iII1lIi1 of ["未开始", "结束", "不存在", "不在"]) {
              if (il1iIll.resp_msg.includes(iII1lIi1)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(il1iIll.resp_msg);
          } else console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
        }
        break;
      case "drawPrize":
        if (il1iIll.resp_code === 0) $.drawNumber = il1iIll?.["data"]?.["drawNumber"], $.prizeInfo = il1iIll?.["data"]?.["prizeInfo"] || [];else {
          if (il1iIll.resp_msg) {
            console.log(I1IiIi1l + " " + il1iIll.resp_msg);
            for (let IilIliiI of ["未开始", "结束", "不存在", "不在"]) {
              if (il1iIll.resp_msg.includes(IilIliiI)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(il1iIll.resp_msg);
          } else {
            console.log("❓" + I1IiIi1l + " " + JSON.stringify(il1iIll));
          }
        }
        break;
    }
  } catch (il1iili1) {
    console.log("❌ 未能正确处理 " + I1IiIi1l + " 请求响应 " + (il1iili1.message || il1iili1));
  }
}
async function I111II1l(lI1l1ii1) {
  if ($.runEnd || $.outFlag) return;
  let iIi1liIl = $.newbaseUrl,
    ili111iI = {},
    illIiiII = "POST";
  switch (lI1l1ii1) {
    case "login":
      iIi1liIl += "/api/user-info/login", ili111iI = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      iIi1liIl += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      illIiiII = "GET", iIi1liIl += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      iIi1liIl += "/api/active/basicInfo", ili111iI = {
        "activityId": $.activityId
      };
      break;
    case "getPoints":
      iIi1liIl += "/api/task/points/getPoints";
      break;
    case "getUserId":
      iIi1liIl += "/api/task/share/getUserId";
      break;
    case "jiugongge_activity":
      iIi1liIl += "/api/task/jiugongge/activity";
      break;
    case "lotteryCenter_activity":
      iIi1liIl += "/api/task/lotteryCenter/activity";
      break;
    case "upperSign_getTask":
      iIi1liIl += "/api/task/upperSign/getTask", ili111iI = {
        "shareUserId": $.shareUserId || ""
      };
      break;
    case "sign_add":
      iIi1liIl += "/api/task/sign/add";
      break;
    case "toDo":
      iIi1liIl += "/api/basic/task/toDo", ili111iI = {
        "taskId": $.taskId,
        "skuId": $.skuId
      };
      break;
    case "drawPrize":
      iIi1liIl += "/api/prize/drawPrize";
      break;
    case "draw":
      iIi1liIl += "/api/prize/draw";
      if ($.hostname.includes("lorealjdcampaign-rc")) ili111iI = {
        "consumePoints": $.consumePoints || 0
      };else $.hostname.includes("lzkj") && (ili111iI = {
        "ecyText": IiliIi1({
          "consumePoints": $.consumePoints || 0,
          "actId": $.activityId
        }, $.pinToken, $.te)
      });
      break;
    default:
      console.log("❌ 未知请求 " + lI1l1ii1);
      return;
  }
  const lIi1Illl = {
    "url": iIi1liIl,
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
    "body": JSON.stringify(ili111iI),
    "timeout": 30000
  };
  illIiiII === "GET" && (delete lIi1Illl.body, delete lIi1Illl.headers["Content-Type"]);
  const Iii1iilI = 5;
  let IlIIIi11 = 0,
    lIi1llIi = null,
    iIIIIlI = false;
  while (IlIIIi11 < Iii1iilI) {
    IlIIIi11 > 0 && (await $.wait(1000));
    const {
      err: II1lIi,
      res: IllIl1lI,
      data: iI1iilii
    } = await iilIliII(lIi1Illl, illIiiII);
    if (II1lIi) {
      if (typeof II1lIi === "string" && II1lIi.includes("Timeout awaiting 'request'")) lIi1llIi = lI1l1ii1 + " 请求超时，请检查网络重试";else {
        const lI1il1li = IllIl1lI?.["statusCode"];
        if (lI1il1li) {
          if ([403, 493].includes(lI1il1li)) lIi1llIi = lI1l1ii1 + " 请求失败，IP被限制（Response code " + lI1il1li + "）", iIIIIlI = true;else [400, 404].includes(lI1il1li) ? lIi1llIi = lI1l1ii1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + lI1il1li + "）" : lIi1llIi = lI1l1ii1 + " 请求失败（Response code " + lI1il1li + "）";
        } else lIi1llIi = lI1l1ii1 + " 请求失败 => " + (II1lIi.message || II1lIi);
      }
      IlIIIi11++;
    } else {
      const iiIiill1 = III1lIl1.getResponseCookie(IllIl1lI),
        li1iII1 = false;
      if (li1iII1) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + lI1l1ii1 + " 响应Body => " + (iI1iilii || "无") + "\n");
        console.log("🔧 " + lI1l1ii1 + " 响应Cookie => " + (iiIiill1 || "无") + "\n");
        console.log("🔧 " + lI1l1ii1 + " 请求参数");
        console.log(lIi1Illl);
        console.log("\n---------------------------------------------------\n");
      }
      if (!["accessLog", "accessLogWithAD"].includes(lI1l1ii1)) {
        try {
          const iIIil11l = JSON.parse(iI1iilii);
          ilii1ii1(lI1l1ii1, iIIil11l);
          break;
        } catch (I11l1iIi) {
          lIi1llIi = "❌ " + lI1l1ii1 + " 接口响应数据解析失败: " + I11l1iIi.message;
          console.log("🚫 " + lI1l1ii1 + " => " + String(iI1iilii || "无响应数据"));
          if (li1iII1) {
            console.log("\n---------------------------------------------------\n");
            console.log(activityCookie);
            console.log("\n---------------------------------------------------\n");
          }
          IlIIIi11++;
        }
      } else break;
      iIIIIlI = false;
    }
  }
  if (IlIIIi11 >= Iii1iilI) {
    console.log(lIi1llIi);
    if (iIIIIlI) {
      !I1il1ll1 && ($.outFlag = true, $.message && $.message.fix(lIi1llIi));
    }
  }
}
async function iilIliII(lli1111l, iIii111I = "POST") {
  if (iIii111I === "POST") {
    return new Promise(async llIi1i1i => {
      $.post(lli1111l, (i1iIIIl1, lllIlIli, lIl111) => {
        llIi1i1i({
          "err": i1iIIIl1,
          "res": lllIlIli,
          "data": lIl111
        });
      });
    });
  } else {
    if (iIii111I === "GET") return new Promise(async ll1l1lil => {
      $.get(lli1111l, (ll1111Ii, iiiiIi, IIlliiii) => {
        ll1l1lil({
          "err": ll1111Ii,
          "res": iiiiIi,
          "data": IIlliiii
        });
      });
    });else {
      const llii111i = "不支持的请求方法";
      return {
        "err": llii111i,
        "res": null,
        "data": null
      };
    }
  }
}
function IiliIi1(I1iiIl1l, i1l1iIl, IIIIl1li) {
  function Il1IIIi1(IiiIIlII) {
    IiiIIlII = IiiIIlII.split("").reverse().join("");
    const llI1llll = new Uint8Array(12),
      li11l1ll = new TextEncoder().encode(IiiIIlII);
    for (let I11iiIii = 0; I11iiIii < li11l1ll.length; I11iiIii += 2) {
      let iililI1l = li11l1ll[I11iiIii] << 5 | li11l1ll[I11iiIii + 1] & 255;
      iililI1l %= 63;
      llI1llll[I11iiIii >> 1] = iililI1l;
    }
    let l111liil = "";
    for (let I11liiI1 = 0; I11liiI1 < llI1llll.length; I11liiI1++) {
      l111liil += (llI1llll[I11liiI1] + 256).toString(2).slice(1);
    }
    let lII1I11 = "",
      liII11i1 = "";
    for (let ll1liII1 = 0; ll1liII1 < 16; ll1liII1++) {
      if (ll1liII1 !== 0) {
        const lllliII1 = ll1liII1 * 6,
          lIlIliI = l111liil.substring(lllliII1, lllliII1 + 6);
        let II1iIII = parseInt(lIlIliI, 2);
        const lililI1 = liII11i1.split("");
        for (let lIIIlIlI = 0; lIIIlIlI < lililI1.length; lIIIlIlI++) {
          lililI1[lIIIlIlI] === "1" && (II1iIII = (II1iIII >> 6 - lIIIlIlI | II1iIII << lIIIlIlI) & 63);
        }
        liII11i1 = (II1iIII & 63).toString(2).padStart(6, "0");
      } else liII11i1 = l111liil.substring(0, 6);
      lII1I11 += liII11i1;
    }
    for (let l1ii111 = 0; l1ii111 < 12; l1ii111++) {
      const lii1Il1I = l1ii111 * 8;
      llI1llll[l1ii111] = parseInt(lII1I11.substring(lii1Il1I, lii1Il1I + 8), 2);
    }
    const l1I1i1Ii = btoa(String.fromCharCode.apply(null, llI1llll));
    return l1I1i1Ii;
  }
  const i1IIIII1 = ["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"];
  let iII1Iii = Date.now() + parseInt(IIIIl1li);
  typeof I1iiIl1l != "object" && (I1iiIl1l = JSON.parse(I1iiIl1l));
  I1iiIl1l.nowTime = iII1Iii;
  let I11I1III = i1l1iIl + iII1Iii;
  const IlIlllil = I11I1III.substring(0, I11I1III.length - 5);
  let lii11iil = "";
  for (let IiI111i1 = 0; IiI111i1 < IlIlllil.length; IiI111i1++) {
    let Iii1l1I1 = IlIlllil.charCodeAt(IiI111i1),
      liIlIlI1 = Iii1l1I1 % 10,
      II1IIii1 = i1IIIII1[liIlIlI1][IiI111i1];
    lii11iil += II1IIii1;
  }
  var i1l11l1i = lii11iil.length,
    Iil1llI = Math.floor(i1l11l1i / 24),
    iIiliI1i = "";
  for (var liilIII1 = 0; liilIII1 < 24; liilIII1++) {
    var i11Ii = (liilIII1 + 1) * Iil1llI;
    liilIII1 === 23 && (i11Ii = i1l11l1i);
    var iii11IlI = lii11iil.substring(liilIII1 * Iil1llI, i11Ii),
      iI1iIlll = [];
    for (var iiiIiiI = 0; iiiIiiI < iii11IlI.length; iiiIiiI++) {
      iI1iIlll.push(iii11IlI.charCodeAt(iiiIiiI));
    }
    var Il1Iilli = iI1iIlll.reduce(function (iIi1IIIi, liiIlil1) {
        return iIi1IIIi + liiIlil1;
      }, 0),
      l11i1ili = Math.floor(Il1Iilli / iI1iIlll.length);
    iIiliI1i += String.fromCharCode(l11i1ili);
  }
  lii11iil = iIiliI1i;
  const IiIll1li = Il1IIIi1(lii11iil),
    I111ilI = ilIlll1I.enc.Utf8.parse(IiIll1li),
    I1iI1IIi = ilIlll1I.enc.Utf8.parse(""),
    l1illi1 = ilIlll1I.AES.encrypt(JSON.stringify(I1iiIl1l), I111ilI, {
      "iv": I1iI1IIi,
      "mode": ilIlll1I.mode.ECB,
      "padding": ilIlll1I.pad.Pkcs7
    });
  return l1illi1.toString();
}