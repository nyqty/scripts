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

const iililIil = $.isNode() ? require("./jdCookie") : "",
  iil1ilii = require("./function/jdCommon"),
  iIi1I1l1 = require("./function/sendJDNotify"),
  Il1IllI1 = require("./function/krgetToken"),
  {
    loreal_savePrize: lIl1iII1
  } = require("./function/krsavePrize"),
  IIlIi11l = require("crypto-js");
let iill1lIi = [];
const iI11i11 = process.env.jd_lzkj_loreal_draw_url || "",
  I1l1III = process.env.jd_lzkj_loreal_draw_opencard === "true",
  lIIill1 = process.env.jd_lzkj_loreal_draw_Notify === "true",
  Ii1i1I1i = process.env.jd_lzkj_loreal_draw_break === "true",
  IiIIIIil = process.env.jd_lzkj_loreal_draw_Interval || "";
let i11lI1lI = process.env.jd_lzkj_loreal_draw_MaxMiss || "",
  Iiii1lI1 = true,
  li11IIlI = process.env.jd_lzkj_loreal_draw_Number ? process.env.jd_lzkj_loreal_draw_Number : "7",
  liIiilIi = "",
  l1Iilill = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(iililIil).forEach(illIiill => {
    iill1lIi.push(iililIil[illIiill]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  iill1lIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lIIl11I => lIIl11I.cookie)].filter(IiII1IiI => !!IiII1IiI);
}
!iill1lIi[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!iI11i11) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const ilII1iI1 = iil1ilii.parseUrl(iI11i11);
  if (!ilII1iI1) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = iI11i11;
  $.activityId = iil1ilii.getUrlParameter(iI11i11, "activityId");
  $.activityType = iil1ilii.getUrlParameter(iI11i11, "activityType");
  $.hostname = ilII1iI1.hostname;
  $.pathname = ilII1iI1.pathname;
  let iliil1Il = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      iliil1Il = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (iliil1Il = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + iliil1Il;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !iliil1Il || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  try {
    i11lI1lI = parseInt(i11lI1lI);
  } catch {
    i11lI1lI = 0;
  }
  iIi1I1l1.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  console.log("\n是否推送通知【" + (lIIill1 == true ? "通知" : "不通知") + "】 是否开卡 【" + (I1l1III == true ? "不开卡" : "默认开卡") + "】");
  console.log("\n当前设定连续 【" + li11IIlI + "】 次无抽奖次数跳出");
  console.log("\n当前设定 493 是否继续运行【" + (Ii1i1I1i == true ? "不退出" : "退出") + "】");
  for (let lIililli = 0; lIililli < iill1lIi.length; lIililli++) {
    if (lIililli > li11IIlI && Iiii1lI1) {
      console.log("\n检测到多次无抽奖次数，跳过此次运行\n");
      break;
    }
    $.outFlag = false;
    if (iill1lIi[lIililli]) {
      $.index = lIililli + 1;
      liIiilIi = iill1lIi[lIililli];
      l1Iilill = iill1lIi[lIililli];
      iil1ilii.setCookie(l1Iilill);
      $.UserName = decodeURIComponent(iil1ilii.getCookieValue(liIiilIi, "pt_pin"));
      $.UA = iil1ilii.genUA($.UserName);
      $.UUID = iil1ilii.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.te = Math.floor(Math.random() * 9000) + 1000;
      $.message = iIi1I1l1.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await lllIlI1l();
      iil1ilii.unsetCookie();
      if ($.outFlag || $.runEnd) {
        break;
      }
    }
  }
  lIIill1 && iIi1I1l1.getMessage() && (iIi1I1l1.updateContent(iIi1I1l1.content + ("\n【活动地址】" + $.activityUrl)), await iIi1I1l1.push());
})().catch(I1II11Il => $.logErr(I1II11Il)).finally(() => $.done());
async function lllIlI1l() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await Il1IllI1(l1Iilill, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await lll1iiil("login");
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      await lll1iiil("follow");
      switch ($.joinCode) {
        case "1004":
          break;
        case "1005":
        case "1006":
          if (I1l1III) {
            const iiIiIIii = await iil1ilii.joinShopMember($.venderId);
            if (iiIiIIii) {
              console.log("加入店铺会员成功");
            } else {
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
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await lll1iiil("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await lll1iiil("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
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
          console.log("未能获取活动类型");
          $.message.fix("未能获取活动类型");
          $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
          $.message.fix("活动类型（" + $.activityType + "）不受支持");
          $.runEnd = true;
          return;
      }
      if ($.runEnd || $.outFlag) {
        return;
      }
      await $.wait(500);
    }
    await lll1iiil("drawPrize");
    await $.wait(500);
    if ($.index === 1 && $.prizeInfo) {
      let liiIIIi1 = false,
        IlIl1Ii = "";
      for (let IIIlIl1l = 0; IIIlIl1l < $.prizeInfo.length; IIIlIl1l++) {
        const l1iIII11 = $.prizeInfo[IIIlIl1l],
          Il1I1Iii = l1iIII11.prizeName,
          illiI11i = l1iIII11.leftNum,
          lll1lil = l1iIII11.prizeType;
        illiI11i >= 1 && (liiIIIi1 = true);
        IlIl1Ii += "  " + Il1I1Iii + (lll1lil === 5 ? "[专享价]" : lll1lil === 3 ? "[实物]" : "") + "，" + (illiI11i >= 1 ? "剩余" + illiI11i + "件" : "已发完") + "\n";
      }
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：\n" + IlIl1Ii);
      iIi1I1l1.updateContent(iIi1I1l1.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】\n" + IlIl1Ii));
      const lillIlIl = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        lIli1I1 = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const iIllIll = Date.now();
          if ($.actStartTime && iIllIll < $.actStartTime) {
            console.log("活动将在 " + lillIlIl + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + lillIlIl);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && iIllIll > $.actEndTime) {
            console.log("活动已于 " + lIli1I1 + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + lIli1I1);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + lillIlIl + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + lillIlIl);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + lIli1I1 + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + lIli1I1);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!liiIIIi1) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    $.memberLevelInsufficient = false;
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
          if (["10020", "10021"].includes($.activityType)) {
            await lll1iiil("jiugongge_activity");
          } else {
            ["10054"].includes($.activityType) ? await lll1iiil("upperSign_getTask") : await lll1iiil("lotteryCenter_activity");
          }
          await $.wait(500);
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          for (let lill1l11 = 0; lill1l11 < $.taskList.length; lill1l11++) {
            if ($.memberLevelInsufficient) {
              break;
            }
            const lil1Ii1 = $.taskList[lill1l11],
              liIiIiII = lil1Ii1?.["status"] || 0,
              lIl1i1l1 = lil1Ii1.taskType;
            if (liIiIiII === 0) {
              if (lil1Ii1.taskId) {
                switch (lIl1i1l1) {
                  case 1:
                  case 2:
                  case 4:
                  case 6:
                  case 9:
                  case 14:
                    $.taskId = lil1Ii1.taskId;
                    $.skuId = "";
                    await lll1iiil("toDo");
                    await $.wait(500);
                    break;
                  case 3:
                  case 5:
                  case 7:
                    $.taskId = lil1Ii1.taskId;
                    const II1lI1I1 = lil1Ii1.skuInfoVO || [];
                    for (let i1i1ili1 = 0; i1i1ili1 < II1lI1I1.length; i1i1ili1++) {
                      if (II1lI1I1[i1i1ili1].status !== 1) {
                        if ($.memberLevelInsufficient) {
                          break;
                        }
                        $.skuId = II1lI1I1[i1i1ili1].skuId;
                        await lll1iiil("toDo");
                        await $.wait(500);
                      }
                    }
                    break;
                  case 10:
                  case 12:
                    const i1llIlIi = lil1Ii1?.["finishNum"],
                      I1i11iil = lil1Ii1?.["shareCount"];
                    if (I1i11iil <= i1llIlIi) {
                      $.taskId = lil1Ii1.taskId;
                      $.skuId = "";
                      for (let l1lII1ii = 0; l1lII1ii < i1llIlIi; l1lII1ii++) {
                        if ($.memberLevelInsufficient) {
                          break;
                        }
                        await lll1iiil("toDo");
                        await $.wait(500);
                      }
                    }
                    break;
                  case 15:
                    !$.shareUserId && ($.maxShareTimes = lil1Ii1.finishNum || 1);
                    await lll1iiil("getUserId");
                    await $.wait(500);
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
          await lll1iiil("drawPrize");
          await $.wait(500);
        }
        break;
      case "10001":
      case "10004":
        await lll1iiil("sign_add");
        await $.wait(500);
        break;
      case "10026":
      case "10080":
        break;
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    let IIl1iI = 500;
    if (IiIIIIil) {
      try {
        const l11iI1l1 = parseInt(IiIIIIil) * 1000;
        IIl1iI = l11iI1l1 || 500;
      } catch {
        $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
      }
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
        for (let Il11IiiI = 0; Il11IiiI < $.drawNumber; Il11IiiI++) {
          await lll1iiil("draw");
          if (i11lI1lI && $.drawMissTimes >= i11lI1lI) {
            break;
          }
          await $.wait(IIl1iI);
          if (Il11IiiI >= 8) {
            console.log("\n抽奖太多次了，下次再继续吧~");
            $.message.insert("抽奖太多次了，下次再抽");
            break;
          }
        }
        break;
      case "10026":
      case "10073":
      case "10080":
        await lll1iiil("getPoints");
        if ($.runEnd || $.outFlag || $.skipRun) {
          return;
        }
        if ($.drawNumber && ["10073", "10080"].includes($.activityType)) {
          $.poorScore += $.drawNumber * $.consumePoints;
        }
        const Il1I1lIl = parseInt($.poorScore / $.consumePoints);
        if (Il1I1lIl <= 0) {
          console.log("积分不足无法抽奖~");
          $.message.insert("积分不足");
          return;
        }
        await $.wait(500);
        for (let Il1l1lil = 0; Il1l1lil < Il1I1lIl; Il1l1lil++) {
          await lll1iiil("draw");
          if (i11lI1lI && $.drawMissTimes >= i11lI1lI) {
            break;
          }
          if (Il1l1lil >= 8) {
            console.log("\n抽奖太多次了，下次再继续吧~");
            $.message.insert("抽奖太多次了，下次再抽");
            break;
          }
          await $.wait(IIl1iI);
        }
        break;
    }
  } catch (lllilIll) {
    console.log("❌ 脚本运行遇到了错误\n" + lllilIll);
  }
}
async function lI1111(lllIll11, iilIIIlI) {
  try {
    switch (lllIll11) {
      case "login":
        if (iilIIIlI.resp_code === 0 && iilIIIlI.data) {
          $.token = iilIIIlI?.["data"]?.["token"];
          $.joinInfo = iilIIIlI?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = iilIIIlI?.["data"]?.["shopId"];
          $.venderId = iil1ilii.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = iilIIIlI?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
          $.shareUserId && ($.shareTimes += 1);
        } else {
          iilIIIlI.resp_msg ? (console.log(lllIll11 + " " + iilIIIlI.resp_msg), $.message.fix(iilIIIlI.resp_msg), $.skipRun = true) : console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
        }
        break;
      case "follow":
        if (!(iilIIIlI.resp_code === 0)) {
          iilIIIlI.resp_msg ? (console.log(lllIll11 + " " + iilIIIlI.resp_msg), $.message.fix(iilIIIlI.resp_msg), $.skipRun = true) : console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
        }
        break;
      case "initPinToken":
        if (iilIIIlI.resp_code === 0 && iilIIIlI.data) {
          iilIIIlI = JSON.parse(iilIIIlI.data);
          if (iilIIIlI.resp_code === 0 && iilIIIlI.data) {
            $.pinToken = iilIIIlI?.["data"]?.["pinToken"];
            $.encryptPin = iilIIIlI?.["data"]?.["encryptPin"];
          } else {
            if (iilIIIlI.resp_code === 1000) {
              console.log(lllIll11 + " " + iilIIIlI.resp_msg);
              $.message.fix(iilIIIlI.resp_msg);
              $.skipRun = true;
            } else {
              if (iilIIIlI.resp_msg) {
                console.log(lllIll11 + " " + iilIIIlI.resp_msg);
                $.message.fix(iilIIIlI.resp_msg);
                $.skipRun = true;
              } else {
                console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
                $.skipRun = true;
              }
            }
          }
        } else {
          console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
        }
        break;
      case "basicInfo":
        if (iilIIIlI.resp_code === 0 && iilIIIlI.data) {
          $.actStartTime = iilIIIlI.data?.["startTime"];
          $.actEndTime = iilIIIlI.data?.["endTime"];
          $.actStatus = iilIIIlI.data?.["actStatus"];
          !$.activityType && ($.activityType = String(iilIIIlI.data?.["actType"] || ""));
        } else {
          if (iilIIIlI.resp_msg) {
            console.log(lllIll11 + " " + iilIIIlI.resp_msg);
            $.message.fix(iilIIIlI.resp_msg);
          } else {
            console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
          }
        }
        break;
      case "getPoints":
        if (iilIIIlI.resp_code === 0 && iilIIIlI.data) {
          $.consumePoints = iilIIIlI.data?.["consumePoints"];
          $.poorScore = iilIIIlI.data?.["poorScore"];
        } else {
          iilIIIlI.resp_msg ? (console.log(lllIll11 + " " + iilIIIlI.resp_msg), $.message.fix(iilIIIlI.resp_msg), $.skipRun = true) : console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
        }
        break;
      case "getUserId":
        if (iilIIIlI.resp_code === 0 && iilIIIlI.data) {
          !$.shareUserIdArray && ($.shareUserIdArray = [], $.shareTimes = 0);
          $.shareUserIdArray.push(iilIIIlI.data?.["shareUserId"]);
          !$.shareUserId && ($.shareUserId = iilIIIlI.data?.["shareUserId"]);
          $.shareTimes >= $.maxShareTimes && ($.shareUserId = $.shareUserIdArray[0] || "", $.shareTimes = 0);
        } else {
          if (iilIIIlI.resp_msg) {
            console.log(lllIll11 + " " + iilIIIlI.resp_msg);
            if (["会员等级不足"].some(lllll1l1 => iilIIIlI.resp_msg.includes(lllll1l1))) {
              $.memberLevelInsufficient = true;
            }
          } else {
            console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
          }
        }
        break;
      case "jiugongge_activity":
      case "lotteryCenter_activity":
      case "upperSign_getTask":
        if (iilIIIlI.resp_code === 0) {
          $.taskList = iilIIIlI?.["data"]?.["taskList"] || [];
        } else {
          if (iilIIIlI.resp_code === 1000) {
            console.log(lllIll11 + " 获取任务失败");
            $.message.insert("获取任务失败");
          } else {
            iilIIIlI.resp_msg ? console.log(lllIll11 + " " + iilIIIlI.resp_msg) : console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
          }
        }
        break;
      case "sign_add":
        if (iilIIIlI.resp_code === 0) {
          iilIIIlI.data && iilIIIlI.data?.["score"] && ($.drawNumber += iilIIIlI.data?.["score"]);
        } else {
          if (!(iilIIIlI.resp_code === 50013 || iilIIIlI.resp_code === 50012)) {
            iilIIIlI.resp_msg ? console.log(lllIll11 + " " + iilIIIlI.resp_msg) : console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
          }
        }
        break;
      case "toDo":
        if (!(iilIIIlI.resp_code === 0)) {
          if (!(iilIIIlI.resp_code === 50013 || iilIIIlI.resp_code === 50012)) {
            iilIIIlI.resp_msg ? (["会员等级不足"].some(IIilIlIl => iilIIIlI.resp_msg.includes(IIilIlIl)) && ($.memberLevelInsufficient = true), console.log(lllIll11 + " " + iilIIIlI.resp_msg)) : console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
          }
        }
        break;
      case "draw":
        if (iilIIIlI.resp_code === 0) {
          if (iilIIIlI.data === "1") {
            console.log("积分不足无法抽奖");
            $.message.insert("积分不足");
          } else {
            if (iilIIIlI.data === "2") {
              console.log("抽奖机会不足");
              $.message.insert("抽奖机会不足");
            } else {
              const ii1iiiII = iilIIIlI.data;
              if (ii1iiiII) {
                switch (ii1iiiII.prizeType) {
                  case 1:
                    console.log("🎉 " + ii1iiiII.prizeName + " 🐶");
                    $.message.insert(ii1iiiII.prizeName + "🐶");
                    break;
                  case 2:
                    console.log("🗑️ 优惠券");
                    $.message.insert("🗑️ 优惠券");
                    break;
                  case 3:
                    const ilI11l11 = iilIIIlI.data.addressId,
                      lIl111ii = ii1iiiII.prizeName;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + lIl111ii);
                    if (ii1iiiII.showImg) {
                      console.log("预览图片：" + ii1iiiII.showImg);
                    }
                    const ill1Iii1 = {
                        baseUrl: $.baseUrl,
                        newbaseUrl: $.newbaseUrl,
                        cookie: l1Iilill,
                        ua: $.UA,
                        token: $.token,
                        prizeName: lIl111ii,
                        orderCode: ilI11l11
                      },
                      lliili1i = await lIl1iII1(ill1Iii1);
                    !lIIill1 && lliili1i && (await iIi1I1l1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + lIl111ii + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                    $.message.insert(lIl111ii + "(" + (lliili1i ? "已填地址" : "未填地址") + ")🎁");
                    break;
                  case 4:
                  case 11:
                    console.log("🗑️ " + ii1iiiII.prizeName + " 🎟️");
                    $.message.insert("🗑️ " + ii1iiiII.prizeName + " 🎟️");
                    break;
                  case 5:
                    console.log("🗑️ 专享价");
                    $.message.insert("🗑️ 专享价");
                    break;
                  case 6:
                    console.log("🎉 " + ii1iiiII.prizeName + " 🧧");
                    $.message.insert("🎉 " + ii1iiiII.prizeName + " 🧧");
                    break;
                  case 7:
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                    console.log("🎉 恭喜获得" + ii1iiiII.prizeName + " 🎁");
                    $.message.insert("🎉 恭喜获得" + ii1iiiII.prizeName + " 🎁");
                    !lIIill1 && (await iIi1I1l1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + ii1iiiII.prizeName + "\n\n" + $.activityUrl));
                    break;
                  default:
                    console.log(ii1iiiII);
                    break;
                }
              } else {
                $.drawMissTimes += 1;
                console.log("💨 空气");
                $.message.insert("💨 空气");
              }
            }
          }
        } else {
          iilIIIlI.resp_msg ? (["未开始", "结束", "不存在", "不在"].some(iIIilil => iilIIIlI.resp_msg.includes(iIIilil)) && ($.runEnd = true), console.log(lllIll11 + " " + iilIIIlI.resp_msg), $.message.fix(iilIIIlI.resp_msg)) : console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
        }
        break;
      case "drawPrize":
        if (iilIIIlI.resp_code === 0) {
          $.drawNumber = iilIIIlI?.["data"]?.["drawNumber"];
          $.prizeInfo = iilIIIlI?.["data"]?.["prizeInfo"] || [];
        } else {
          if (iilIIIlI.resp_msg) {
            console.log(lllIll11 + " " + iilIIIlI.resp_msg);
            ["未开始", "结束", "不存在", "不在"].some(iIl11ii1 => iilIIIlI.resp_msg.includes(iIl11ii1)) && ($.runEnd = true);
            $.message.fix(iilIIIlI.resp_msg);
          } else {
            console.log("❓" + lllIll11 + " " + JSON.stringify(iilIIIlI));
          }
        }
        break;
    }
  } catch (li1l1ilI) {
    console.log("❌ 未能正确处理 " + lllIll11 + " 请求响应 " + (li1l1ilI.message || li1l1ilI));
  }
}
async function lll1iiil(i1l1i111) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let Il1IIlll = $.newbaseUrl,
    lII1i1il = {},
    lIlIIiIi = "POST";
  switch (i1l1i111) {
    case "login":
      Il1IIlll += "/api/user-info/login";
      lII1i1il = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      Il1IIlll += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      lIlIIiIi = "GET";
      Il1IIlll += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      Il1IIlll += "/api/active/basicInfo";
      lII1i1il = {
        activityId: $.activityId
      };
      break;
    case "getPoints":
      Il1IIlll += "/api/task/points/getPoints";
      break;
    case "getUserId":
      Il1IIlll += "/api/task/share/getUserId";
      break;
    case "jiugongge_activity":
      Il1IIlll += "/api/task/jiugongge/activity";
      break;
    case "lotteryCenter_activity":
      Il1IIlll += "/api/task/lotteryCenter/activity";
      break;
    case "upperSign_getTask":
      Il1IIlll += "/api/task/upperSign/getTask";
      lII1i1il = {
        shareUserId: $.shareUserId || ""
      };
      break;
    case "sign_add":
      Il1IIlll += "/api/task/sign/add";
      break;
    case "toDo":
      Il1IIlll += "/api/basic/task/toDo";
      lII1i1il = {
        taskId: $.taskId,
        skuId: $.skuId
      };
      break;
    case "drawPrize":
      Il1IIlll += "/api/prize/drawPrize";
      break;
    case "draw":
      Il1IIlll += "/api/prize/draw";
      if ($.hostname.includes("lorealjdcampaign-rc")) {
        lII1i1il = {
          consumePoints: $.consumePoints || 0
        };
      } else {
        $.hostname.includes("lzkj") && ($.pathname.includes("/prod/cc/interactsaas") ? lII1i1il = {
          ecyText: Il1111i({
            consumePoints: $.consumePoints || 0,
            actId: $.activityId
          }, $.pinToken, $.te)
        } : lII1i1il = {
          consumePoints: $.consumePoints || 0
        });
      }
      break;
    default:
      console.log("❌ 未知请求 " + i1l1i111);
      return;
  }
  const ililiii = {
    url: Il1IIlll,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      Connection: "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: "IsvToken=" + $.jdToken + "; " + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      Host: $.hostname,
      Origin: $.origin,
      Referer: $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    body: JSON.stringify(lII1i1il),
    timeout: 30000
  };
  $.token && (ililiii.headers.token = $.token);
  lIlIIiIi === "GET" && (delete ililiii.body, delete ililiii.headers["Content-Type"]);
  const I1iiiI1l = 5;
  let lII1IIli = 0,
    ll11lII = null,
    Iii1I1li = false;
  while (lII1IIli < I1iiiI1l) {
    lII1IIli > 0 && (await $.wait(1000));
    const {
      err: lI1iI1iI,
      res: IIIllI1l,
      data: lliIIl1
    } = await IilIl1l1(ililiii, lIlIIiIi);
    if (lI1iI1iI) {
      if (typeof lI1iI1iI === "string" && lI1iI1iI.includes("Timeout awaiting 'request'")) {
        ll11lII = i1l1i111 + " 请求超时，请检查网络重试";
      } else {
        const lI1Iill = IIIllI1l?.["statusCode"];
        if (lI1Iill) {
          if ([403, 493].includes(lI1Iill)) {
            ll11lII = i1l1i111 + " 请求失败，IP被限制（Response code " + lI1Iill + "）";
            Iii1I1li = true;
          } else {
            if ([400, 404].includes(lI1Iill)) {
              ll11lII = i1l1i111 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + lI1Iill + "）";
            } else {
              if ([500].includes(lI1Iill) && i1l1i111 === "draw" && $.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
                ililiii.body = JSON.stringify({
                  ecyText: Il1111i({
                    consumePoints: $.consumePoints || 0,
                    actId: $.activityId
                  }, $.pinToken, $.te)
                });
              } else {
                ll11lII = i1l1i111 + " 请求失败（Response code " + lI1Iill + "）";
              }
            }
          }
        } else {
          ll11lII = i1l1i111 + " 请求失败 => " + (lI1iI1iI.message || lI1iI1iI);
        }
      }
      lII1IIli++;
    } else {
      const iIi11liI = iil1ilii.getResponseCookie(IIIllI1l);
      switch (i1l1i111) {
        case "initPinToken":
          const lliI11I1 = iil1ilii.getCookieValue(iIi11liI, "te");
          lliI11I1 && ($.te = lliI11I1);
          break;
      }
      if (lliIIl1) {
        try {
          const I1IilI1 = JSON.parse(lliIIl1);
          lI1111(i1l1i111, I1IilI1);
          break;
        } catch (II1ill1l) {
          ll11lII = "❌ " + i1l1i111 + " 接口响应数据解析失败: " + II1ill1l.message;
          console.log("🚫 " + i1l1i111 + " => " + String(lliIIl1));
          lII1IIli++;
        }
      } else {
        i1l1i111 === "draw" && $.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas") && (ililiii.body = JSON.stringify({
          ecyText: Il1111i({
            consumePoints: $.consumePoints || 0,
            actId: $.activityId
          }, $.pinToken, $.te)
        }));
        ll11lII = "❌ " + i1l1i111 + " 接口无响应数据";
        lII1IIli++;
      }
      Iii1I1li = false;
    }
  }
  lII1IIli >= I1iiiI1l && (console.log(ll11lII), Iii1I1li && !Ii1i1I1i && ($.outFlag = true, $.message && $.message.fix(ll11lII)));
}
async function IilIl1l1(ll1iIli, iii1lIII = "POST") {
  if (iii1lIII === "POST") {
    return new Promise(async IIi1II1I => {
      $.post(ll1iIli, (I1lIIilI, Ili1Iill, li1ii1I1) => {
        IIi1II1I({
          err: I1lIIilI,
          res: Ili1Iill,
          data: li1ii1I1
        });
      });
    });
  } else {
    if (iii1lIII === "GET") {
      return new Promise(async Ii111ii => {
        $.get(ll1iIli, (il1iI1, IIiil11, l1lll111) => {
          Ii111ii({
            err: il1iI1,
            res: IIiil11,
            data: l1lll111
          });
        });
      });
    } else {
      const illi11ii = "不支持的请求方法";
      return {
        err: illi11ii,
        res: null,
        data: null
      };
    }
  }
}
function Il1111i(llilI1li, iIIiIliI, li11lll) {
  function il11li(iiI1l1) {
    iiI1l1 = iiI1l1.split("").reverse().join("");
    const l1iI1Iii = new Uint8Array(12),
      lIII1IIl = new TextEncoder().encode(iiI1l1);
    for (let iIi1I1ll = 0; iIi1I1ll < lIII1IIl.length; iIi1I1ll += 2) {
      let iIlliiil = lIII1IIl[iIi1I1ll] << 5 | lIII1IIl[iIi1I1ll + 1] & 255;
      iIlliiil %= 63;
      l1iI1Iii[iIi1I1ll >> 1] = iIlliiil;
    }
    let illi1lIi = "";
    for (let l11IiIl = 0; l11IiIl < l1iI1Iii.length; l11IiIl++) {
      illi1lIi += (l1iI1Iii[l11IiIl] + 256).toString(2).slice(1);
    }
    let llIiil1i = "",
      ii1iIiI = "";
    for (let i1I11i1 = 0; i1I11i1 < 16; i1I11i1++) {
      if (i1I11i1 !== 0) {
        const iiIII1II = i1I11i1 * 6,
          iiii1l1 = illi1lIi.substring(iiIII1II, iiIII1II + 6);
        let IIIii1lI = parseInt(iiii1l1, 2);
        const IIllillI = ii1iIiI.split("");
        for (let I11l1lli = 0; I11l1lli < IIllillI.length; I11l1lli++) {
          IIllillI[I11l1lli] === "1" && (IIIii1lI = (IIIii1lI >> 6 - I11l1lli | IIIii1lI << I11l1lli) & 63);
        }
        ii1iIiI = (IIIii1lI & 63).toString(2).padStart(6, "0");
      } else {
        ii1iIiI = illi1lIi.substring(0, 6);
      }
      llIiil1i += ii1iIiI;
    }
    for (let iilIilli = 0; iilIilli < 12; iilIilli++) {
      const lilI1iIi = iilIilli * 8;
      l1iI1Iii[iilIilli] = parseInt(llIiil1i.substring(lilI1iIi, lilI1iIi + 8), 2);
    }
    const il1lI11 = btoa(String.fromCharCode.apply(null, l1iI1Iii));
    return il1lI11;
  }
  const I1iIiliI = ["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"];
  let i111iI11 = Date.now() + parseInt(li11lll);
  if (typeof llilI1li != "object") {
    llilI1li = JSON.parse(llilI1li);
  }
  llilI1li.nowTime = i111iI11;
  let IIllill1 = iIIiIliI + i111iI11;
  const illli1il = IIllill1.substring(0, IIllill1.length - 5);
  let lilIIllI = "";
  for (let IlIiliii = 0; IlIiliii < illli1il.length; IlIiliii++) {
    let i1I1IIi = illli1il.charCodeAt(IlIiliii),
      li1lll1l = i1I1IIi % 10,
      IlIli1i1 = I1iIiliI[li1lll1l][IlIiliii];
    lilIIllI += IlIli1i1;
  }
  var l1ilI1I1 = lilIIllI.length,
    I1IIllI = Math.floor(l1ilI1I1 / 24),
    liliiil = "";
  for (var Iillll = 0; Iillll < 24; Iillll++) {
    var iil1I1l = (Iillll + 1) * I1IIllI;
    Iillll === 23 && (iil1I1l = l1ilI1I1);
    var I1Ii1l1l = lilIIllI.substring(Iillll * I1IIllI, iil1I1l),
      ii1III = [];
    for (var lllii1iI = 0; lllii1iI < I1Ii1l1l.length; lllii1iI++) {
      ii1III.push(I1Ii1l1l.charCodeAt(lllii1iI));
    }
    var i1I1il1I = ii1III.reduce(function (iIIiIiIl, Il1IiI) {
        return iIIiIiIl + Il1IiI;
      }, 0),
      IliIII1i = Math.floor(i1I1il1I / ii1III.length);
    liliiil += String.fromCharCode(IliIII1i);
  }
  lilIIllI = liliiil;
  const l1lIliil = il11li(lilIIllI),
    ll1iIi1 = IIlIi11l.enc.Utf8.parse(l1lIliil),
    iillili1 = IIlIi11l.enc.Utf8.parse(""),
    lI1iii = IIlIi11l.AES.encrypt(JSON.stringify(llilI1li), ll1iIi1, {
      iv: iillili1,
      mode: IIlIi11l.mode.ECB,
      padding: IIlIi11l.pad.Pkcs7
    });
  return lI1iii.toString();
}
