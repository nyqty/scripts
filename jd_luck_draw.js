/*
活动名称：店铺抽奖 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/lzclient/<活动id>/cjwx/common/entry.html?activityId=<活动id>&gameType=<玩法类型>
         https://lzkj-isv.isvjd.com/wxDrawActivity/activity/activity?activityId=<活动id>
         https://cjhy-isv.isvjcloud.com/wxDrawActivity/activity/activity?activityId=<活动id>
环境变量：LUCK_DRAW_URL // 活动链接
         LUCK_DRAW_NOTIFY // 是否推送通知（true/false），默认不推送
         LUCK_DRAW_OPENCARD // 是否入会（true/false），默认不入会
		 LUCK_DRAW_BREAK // 493后继续执行，默认退出运行（true/false）
         LUCK_DRAW_INTERVAL // 自定义抽奖间隔（正整数），默认1秒
         LUCK_DRAW_MAX_MISS // 最大连续未抽中次数（正整数），达到此次数后会跳过运行对应账号，默认不启用此功能
		 LUCK_DRAW_NUM //运行账号数量，默认运行前7
		 LUCK_DRAW_Number // 连续无次数跳出，默认 7 次，火爆账号请设置黑名单，否则也会占用次数
		 LUCK_DRAW_BLACKLIST 黑名单 用&隔开 pin值
         JD_LZ_OPEN // 是否开启LZ活动运行（true/false），默认运行
         JD_CJ_OPEN // 是否开启CJ活动运行（true/false），默认运行

注：只有在没有抽奖次数的情况下才会去做任务获取，部分活动涉及定制接口会导致请求响应非法操作

2023/9/8 修复 500错误 修复黑名单无效

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺抽奖通用活动
1 1 1 1 * jd_luck_draw.js, tag=店铺抽奖通用活动, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺抽奖（超级无线/超级会员）');
const lII11I1I = $.isNode() ? require("./jdCookie") : "",
  liil1lI1 = require("./function/jdCommon"),
  II1I111I = require("./function/sendJDNotify"),
  IlIIiili = require("./function/krh5st"),
  llIIiilI = require("./function/krgetToken"),
  {
    wuxian_savePrize: Ii1IIiil
  } = require("./function/krsavePrize"),
  I1I1IilI = require("crypto-js");
let Iii11i1i = [];
const iliiI1i1 = process.env.LUCK_DRAW_URL || "",
  II1IIl1l = process.env.LUCK_DRAW_OPENCARD === "true",
  Il1i1IiI = process.env.LUCK_DRAW_NOTIFY === "true",
  iiII1il1 = process.env.LUCK_DRAW_BREAK === "true",
  ll1l1il = process.env.LUCK_DRAW_INTERVAL || "";
let liliIiIi = process.env.LUCK_DRAW_MAX_MISS || "",
  I11i111I = 7;
process.env.LUCK_DRAW_NUM && process.env.LUCK_DRAW_NUM != 7 && (I11i111I = process.env.LUCK_DRAW_NUM);
let Ii1liiII = true,
  lIIl1III = process.env.LUCK_DRAW_Number ? process.env.LUCK_DRAW_Number : "11",
  IiII1lI1 = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  il11IIli = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  IIilIIi1 = "",
  Iil1liIl = "",
  iiIilili = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(lII11I1I).forEach(iiIllIii => {
    Iii11i1i.push(lII11I1I[iiIllIii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Iii11i1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(IiiIllii => IiiIllii.cookie)].filter(lIllI1I => !!lIllI1I);
!Iii11i1i[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
let IiI111Ii = "",
  Iil1iIll = "";
$.whitelist = process.env.LUCK_DRAW_WHITELIST || IiI111Ii;
$.blacklist = process.env.LUCK_DRAW_BLACKLIST || Iil1iIll;
liliIili();
iIiIiIil();
!(async () => {
  if (!iliiI1i1) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const llIi1ill = liil1lI1.parseUrl(iliiI1i1);
  if (!llIi1ill) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = iliiI1i1;
  $.activityId = liil1lI1.getUrlParameter(iliiI1i1, "activityId");
  $.hostname = llIi1ill?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) {
      if (il11IIli === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
        return;
      } else $.activityMode = "cjhy";
    } else {
      if ($.hostname.includes("lzkj")) {
        if (IiII1lI1 === "false") {
          console.log("\n❌  已设置全局关闭LZ相关活动\n");
          return;
        } else $.activityMode = "lzkj", $.hostname = "lzkj-isv.isvjd.com";
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityMode || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  if (llIi1ill?.["pathname"]["includes"]("lzclient")) {
    $.activityUrl = $.baseUrl + "/wxDrawActivity/activity/activity?activityId=" + $.activityId;
  }
  try {
    liliIiIi = parseInt(liliIiIi);
  } catch {
    liliIiIi = 0;
  }
  II1I111I.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  console.log("\n是否推送通知【" + (Il1i1IiI == true ? "通知" : "不通知") + "】 是否开卡 【" + (II1IIl1l == true ? "开卡" : "不开卡") + "】");
  console.log("\n当前设定连续 【" + lIIl1III + "】 次无抽奖次数跳出");
  console.log("\n当前设定 493 是否继续运行【" + (iiII1il1 == true ? "不退出" : "退出") + "】");
  for (let II111lII = 0; II111lII < I11i111I; II111lII++) {
    if (II111lII > lIIl1III && Ii1liiII) {
      console.log("\n检测到多次无抽奖次数，跳过此次运行\n");
      break;
    }
    $.outFlag = false;
    if (Iii11i1i[II111lII]) {
      $.index = II111lII + 1;
      IIilIIi1 = Iii11i1i[II111lII];
      iiIilili = Iii11i1i[II111lII];
      $.UserName = decodeURIComponent(liil1lI1.getCookieValue(IIilIIi1, "pt_pin"));
      $.UA = liil1lI1.genUA($.UserName);
      $.UUID = liil1lI1.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.te = Math.floor(Math.random() * 9000) + 1000;
      $.message = II1I111I.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await l11IIiIi();
      if ($.outFlag || $.runEnd) break;
    }
  }
  Il1i1IiI && II1I111I.getMessage() && (II1I111I.updateContent(II1I111I.content + ("\n【活动地址】：" + $.activityUrl)), await II1I111I.push());
})().catch(iiIl1Ill => $.logErr(iiIl1Ill)).finally(() => $.done());
async function l11IIiIi() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.needJoinMember = false;
    $.secretPin = "";
    $.LZ_AES_PIN = "";
    Iil1liIl = "";
    $.pinToken = "";
    if ($.skipRun || $.runEnd || $.outFlag) return;
    await i1il11i($.activityUrl);
    await $.wait(500);
    if ($.skipRun) {
      console.log("获取 LZ_TOKEN 失败！");
      $.message.fix("获取[LZ_TOKEN]失败");
      return;
    }
    if ($.outFlag || $.runEnd) return;
    if (!$.venderId) {
      await iiI1Iill("getSimpleActInfoVo");
      if (!$.venderId) {
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        $.message.fix("未能获取店铺信息");
        $.runEnd = true;
        return;
      }
      if (!$.activityType) {
        console.log("getSimpleActInfoVo 未能获取活动类型");
        $.message.fix("未能获取活动类型");
        $.runEnd = true;
        return;
      }
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          break;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.runEnd = true;
          return;
      }
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          $.drawApiPath = "/wxDrawActivity/start";
          break;
        case 26:
          $.drawApiPath = "/wxPointDrawActivity/start";
          break;
        case 124:
          $.drawApiPath = "/wxScratchActive/start";
          break;
        case 125:
          $.drawApiPath = "/wxPointBlindBox/start";
          break;
        case 128:
          $.drawApiPath = "/wxGashaponActive/start";
          break;
        case 129:
          $.drawApiPath = "/wxDollGrabbing/start";
          break;
      }
      if ($.activityMode === "cjhy" && !$.defenseUrls) {
        await iiI1Iill("getDefenseUrls");
        if (!$.defenseUrls || !Array.isArray($.defenseUrls)) {
          console.log("getDefenseUrls 未能获取抽奖接口加密信息");
          $.message.fix("未能获取抽奖接口加密信息");
          $.runEnd = true;
          return;
        }
      }
    }
    $.token = await llIIiilI(iiIilili, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    if ($.defenseUrls && $.defenseUrls.includes($.drawApiPath)) {
      await iiI1Iill("initPinToken");
      if ($.runEnd || $.outFlag) return;
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    } else {
      await iiI1Iill("getMyPing");
      if ($.runEnd || $.outFlag) return;
    }
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    switch ($.activityMode) {
      case "lzkj":
        $.formatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.formatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    await $.wait(500);
    switch ($.activityMode) {
      case "lzkj":
        await iiI1Iill("accessLogWithAD");
        break;
      case "cjhy":
        await iiI1Iill("accessLog");
        break;
    }
    await $.wait(500);
    if (II1IIl1l) {
      await iiI1Iill("getOpenCardStatus");
      if ($.outFlag && $.skipRun) return;
      if (!$.isMember) {
        $.errorJoinShop = "";
        $.joinVenderId = $.venderId;
        for (let I1iiIlI = 0; I1iiIlI < Array(3).length; I1iiIlI++) {
          if (I1iiIlI > 0) console.log("第" + I1iiIlI + "次 重新入会");
          await iIlillii();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
            break;
          }
        }
        $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("❌ 入会失败"), $.skipRun = true);
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.activityContent = "";
    await iiI1Iill("activityContent");
    if (!$.activityContent) {
      console.log("未能获取到活动信息");
      $.message.fix("未能获取活动信息");
      return;
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
    const li11111I = $.activityContent?.["dayMaxDraw"];
    li11111I && $.canDrawTimes > li11111I && ($.canDrawTimes = li11111I);
    const llli11ii = $.activityContent.content,
      IlliIiiI = $.activityContent?.["needFollow"] || false,
      il111IIi = $.activityContent?.["hasFollow"] || false;
    if ($.index === 1) {
      let i1liiIiI = "";
      for (let llliII1i = 0; llliII1i < llli11ii.length; llliII1i++) {
        const IIiliiIl = llli11ii[llliII1i].name;
        $.prizetype = llli11ii[llliII1i].type;
        const iIi1i11I = llli11ii[llliII1i].id;
        switch ($.prizetype) {
          case 0:
            $.prizetype = "";
            break;
          case 1:
            $.prizetype = "[优惠券]";
            break;
          case 2:
            $.prizetype = "[流量包[";
            break;
          case 4:
            $.prizetype = "[再来一次]";
            break;
          case 6:
            $.prizetype = "[京豆]";
            break;
          case 7:
            $.prizetype = "[实物]";
            break;
          case 8:
            $.prizetype = "[专享价]";
            break;
          case 9:
            $.prizetype = "[积分]";
            break;
          case 10:
            $.prizetype = "[优惠券]";
            break;
          case 13:
            $.prizetype = "[PLUS会员]";
            break;
          case 14:
            $.prizetype = "[爱奇艺会员]";
            break;
          case 15:
            $.prizetype = "[PLUS会员]";
            break;
          case 16:
            $.prizetype = "[红包]";
            break;
          case 17:
            $.prizetype = "[优惠券]";
            break;
          case 18:
            $.prizetype = "[优惠券]";
            break;
          case 19:
            $.prizetype = "[优惠券]";
            break;
          case 20:
            $.prizetype = "[优惠券]";
            break;
          default:
            console.log("未知的奖品" + $.prizetype);
            return;
        }
        if (iIi1i11I === 0 || $.prizetype === 0) {
          i1liiIiI += "谢谢参与";
          break;
        } else i1liiIiI += "" + IIiliiIl + $.prizetype, llliII1i !== llli11ii.length - 1 && (i1liiIiI += "，");
      }
      await iiI1Iill("shopInfo");
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + i1liiIiI + "\n");
      II1I111I.updateContent(II1I111I.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】" + i1liiIiI));
    }
    let lI111I11 = $.activityContent?.["startTime"],
      l1lllIi1 = $.activityContent?.["endTime"];
    if ((!lI111I11 || !l1lllIi1) && $.activityContent?.["rule"]) {
      try {
        const li1lI11i = /抽奖时间：(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) 至 (\d{4}-\d{2}-\d{2} \d{2}:\d{2})；/,
          iI1IlIli = $.activityContent.rule.match(li1lI11i);
        iI1IlIli && iI1IlIli.length === 3 && (lI111I11 = new Date(iI1IlIli[1]).getTime(), l1lllIi1 = new Date(iI1IlIli[2]).getTime());
      } catch {}
    }
    const iIlIIi1l = Date.now();
    if (l1lllIi1 && iIlIIi1l > l1lllIi1) {
      const IiIiil1 = $.time("yyyy-MM-dd HH:mm", l1lllIi1);
      console.log("活动已于 " + IiIiil1 + " 结束，下次早点来吧~");
      $.message.fix("活动已结束，结束时间：" + IiIiil1);
      $.runEnd = true;
      return;
    }
    if (lI111I11 && iIlIIi1l < lI111I11) {
      const Ii1lli1i = $.time("yyyy-MM-dd HH:mm", lI111I11);
      console.log("活动将在 " + Ii1lli1i + " 开始，晚点再来吧~");
      $.message.fix("活动尚未开始，开始时间：" + Ii1lli1i);
      $.runEnd = true;
      return;
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        IlliIiiI && !il111IIi && (await iiI1Iill("followShop"), $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500));
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        await iiI1Iill("followShop");
        break;
    }
    if ($.needJoinMember || $.outFlag) return;
    if ($.canDrawTimes === 0 && $.activityType !== 26) {
      await iiI1Iill("getGiveContent");
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
      if ($.followTaskInfo) {
        const liIIlII1 = $.followTaskInfo?.["skuIdsList"],
          II1i1lIl = $.followTaskInfo?.["followTimes"],
          I1Il1lI = $.followTaskInfo?.["hasGetGiveTimes"],
          il111liI = $.followTaskInfo?.["giveTimes"],
          IiIllI1i = $.followTaskInfo?.["maxGiveTimes"],
          iil11IIi = Math.trunc(liIIlII1.length / II1i1lIl * il111liI);
        if (I1Il1lI < IiIllI1i && I1Il1lI < iil11IIi) {
          let llIlI1 = (IiIllI1i - I1Il1lI) * II1i1lIl;
          for (let IiIiliil = 0; IiIiliil < liIIlII1.length; IiIiliil++) {
            $.skuId = liIIlII1[IiIiliil];
            await iiI1Iill("followGoods");
            $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
            if (IiIiliil == llIlI1 - 1) break;
          }
          $.activityContent = "";
          await iiI1Iill("activityContent");
          if (!$.activityContent) {
            console.log("未能获取到活动信息");
            $.message.fix("未能获取活动信息");
            return;
          }
          $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
          const ii1l11i = $.activityContent?.["dayMaxDraw"] || 0;
          $.canDrawTimes > ii1l11i && ($.canDrawTimes = ii1l11i);
          $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
          console.log("");
        }
      }
    }
    if ($.canDrawTimes <= 0) {
      switch ($.activityType) {
        case 13:
          console.log("今天没有抽奖机会了，明天再来吧~"), $.message.fix("今日已无抽奖机会");
          break;
        case 3:
        case 4:
        case 11:
        case 12:
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          console.log("没有抽奖机会了~"), $.message.fix("抽奖机会不足");
          break;
      }
      return;
    }
    $.drawTimes = 0;
    $.drawStop = false;
    let Il11I1I1 = $.activityMode === "cjhy" ? 1000 : 500;
    if (ll1l1il) {
      try {
        const iilIl1ii = parseInt(ll1l1il) * 1000;
        Il11I1I1 = iilIl1ii;
      } catch {
        $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
      }
    }
    $.drawMissTimes = 0;
    for (let IllI1iiI = 1; $.canDrawTimes--; IllI1iiI++) {
      $.drawError = "";
      await iiI1Iill("start");
      if ($.drawError) {
        $.drawError.indexOf("火爆") > -1 && ($.canDrawTimes += 1);
        $.activityMode == "cjhy" && ($.drawError.indexOf("擦肩") > -1 || $.drawError.indexOf("缓存") > -1) && ($.canDrawTimes += 1);
        if (liliIiIi && $.drawMissTimes >= liliIiIi) break;
        if ($.drawStop || $.needJoinMember || $.runEnd) break;
      }
      if ($.canDrawTimes <= 0) break;
      if ($.drawTimes >= 8 && [26, 124, 125, 128, 129].includes($.activityType)) {
        console.log("\n抽奖太多次了，下次再继续吧~");
        $.message.insert("抽奖太多次了，下次再抽");
        break;
      }
      await $.wait(Il11I1I1);
    }
  } catch (Iillii) {
    console.log("❌ 脚本运行遇到了错误\n" + Iillii);
  }
}
async function l1lilI11(II1iII1i, ililIIl) {
  try {
    switch (II1iII1i) {
      case "getMyPing":
        if (ililIIl.result === true && ililIIl.data) $.secretPin = ililIIl.data?.["secretPin"], $.nickname = ililIIl.data?.["nickname"];else ililIIl.errorMessage ? (console.log(II1iII1i + " " + ililIIl.errorMessage), $.message.fix(ililIIl.errorMessage)) : console.log("❓" + II1iII1i + " " + JSON.stringify(ililIIl));
        break;
      case "initPinToken":
        if (ililIIl.result === true && ililIIl.data) $.secretPin = ililIIl.data?.["secretPin"], $.nickname = ililIIl.data?.["nickname"];else ililIIl.errorMessage ? (console.log(II1iII1i + " " + ililIIl.errorMessage), $.message.fix(ililIIl.errorMessage)) : console.log("❓" + II1iII1i + " " + JSON.stringify(ililIIl));
        break;
      case "getSimpleActInfoVo":
        if (ililIIl.result === true && ililIIl.data) {
          $.venderId = ililIIl.data?.["venderId"];
          $.shopId = ililIIl.data?.["shopId"];
          $.activityType = ililIIl.data?.["activityType"];
        } else {
          if (ililIIl.errorMessage) console.log(II1iII1i + " " + ililIIl.errorMessage);else {
            console.log("❓" + II1iII1i + " " + JSON.stringify(ililIIl));
          }
        }
        break;
      case "getDefenseUrls":
        if (ililIIl.result === true && ililIIl.data) {
          $.defenseUrls = ililIIl?.["data"];
        } else ililIIl.errorMessage ? console.log(II1iII1i + " " + ililIIl.errorMessage) : console.log("❓" + II1iII1i + " " + JSON.stringify(ililIIl));
      case "getOpenCardStatus":
        if (ililIIl.result === true) {
          if (ililIIl.data) {
            if (ililIIl.data.hasOwnProperty("openCard")) $.isMember = ililIIl.data.openCard;else ililIIl.data.hasOwnProperty("openedCard") && ($.isMember = ililIIl.data.openedCard);
            if (typeof $.isMember === "number") $.isMember = $.isMember === 1;else typeof $.isMember === "undefined" && ($.isMember = false);
          } else $.isMember = true;
        } else {
          if (ililIIl.errorMessage) ililIIl.errorMessage.includes("擦肩") && !ililIIl?.["data"] ? ($.skipRun = true, $.message.fix("账号已黑"), console.log("账号已黑，下次别跑了~")) : console.log(II1iII1i + " " + ililIIl.errorMessage);else {
            $.isMember = false;
          }
        }
        break;
      case "activityContent":
        if (ililIIl.result === true && ililIIl.data) {
          $.activityContent = ililIIl.data;
        } else {
          if (ililIIl.errorMessage) {
            for (let IlIiii1l of ["未开始", "结束", "不存在", "不在"]) {
              if (ililIIl.errorMessage.includes(IlIiii1l)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(II1iII1i + " " + ililIIl.errorMessage);
            $.message.fix(ililIIl.errorMessage);
          } else console.log("❓" + II1iII1i + " " + JSON.stringify(ililIIl));
        }
        break;
      case "shopInfo":
        if (ililIIl.result === true && ililIIl.data) {
          $.shopName = ililIIl.data?.["shopName"];
        } else ililIIl.errorMessage ? console.log("" + (ililIIl.errorMessage || "")) : console.log("❓" + II1iII1i + " " + JSON.stringify(ililIIl));
        break;
      case "followShop":
        if (ililIIl.result === true) {} else {
          if (ililIIl.errorMessage) {
            if (ililIIl.errorMessage.includes("会员")) {
              $.needJoinMember = true;
              $.message.fix("活动仅限店铺会员参与");
            }
            console.log("" + (ililIIl.errorMessage || ""));
          }
        }
        break;
      case "getGiveContent":
        if (ililIIl.result === true && ililIIl.data) $.followTaskInfo = ililIIl.data?.["follow"];else ililIIl.errorMessage ? console.log("" + (ililIIl.errorMessage || "")) : console.log("❓" + II1iII1i + " " + JSON.stringify(ililIIl));
        break;
      case "followGoods":
        if (ililIIl.result === true) console.log("做 \"关注商品\" 任务 >> 任务完成");else {
          if (ililIIl.errorMessage) console.log("做 \"关注商品\" 任务 >> 任务失败（" + ililIIl.errorMessage + "）");else {
            console.log("❓" + II1iII1i + " " + JSON.stringify(ililIIl));
          }
        }
        break;
      case "start":
        if (ililIIl.result === true && ililIIl.data) {
          Ii1liiII = false;
          $.drawTimes += 1;
          $.canDrawTimes = ililIIl.data.canDrawTimes;
          const lli1lil1 = ililIIl.data.drawInfo;
          if (lli1lil1) switch (lli1lil1.type) {
            case 4:
              console.log("🔁 再来一次"), $.canDrawTimes += 1;
              break;
            case 6:
              console.log("🎉 " + lli1lil1.name + " 🐶"), $.message.insert(lli1lil1.name + "🐶");
              break;
            case 7:
              const Ili111l = ililIIl.data.addressId;
              prizeName = lli1lil1.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName), console.log("参考价值：" + lli1lil1.priceInfo + "（元）");
              if (lli1lil1.showImage) console.log("预览图片：" + lli1lil1.showImage);
              const I11IliIl = {
                  "baseUrl": $.baseUrl,
                  "cookie": Iil1liIl,
                  "ua": $.UA,
                  "activityId": $.activityId,
                  "activityType": $.activityType,
                  "venderId": [$.venderId, $.shopId],
                  "secretPin": $.secretPin,
                  "prizeName": prizeName,
                  "generateId": Ili111l
                },
                ll1iliiI = await Ii1IIiil(I11IliIl);
              !Il1i1IiI && ll1iliiI && (await II1I111I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + $.activityUrl));
              $.message.insert(prizeName + "(" + (ll1iliiI ? "已填地址" : "未填地址") + ")🎁");
              break;
            case 8:
              console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
              break;
            case 9:
              console.log("🗑️ " + lli1lil1.name + " 🎟️"), $.message.insert(lli1lil1.name + "🎟️");
              break;
            case 13:
            case 14:
            case 15:
              console.log("🎉 恭喜获得" + lli1lil1.name + " 🎁");
              !Il1i1IiI && (await II1I111I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lli1lil1.name + "\n\n" + $.activityUrl));
              $.message.insert(lli1lil1.name + "🎁");
              break;
            case 16:
              console.log("🎉 " + lli1lil1.priceInfo + " 🧧"), $.message.insert(lli1lil1.priceInfo + "红包🧧");
              break;
            default:
              lli1lil1.name.includes("券") ? (console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️")) : (console.log("获得：" + lli1lil1.name), $.message.insert("" + lli1lil1.name));
              break;
          } else $.drawMissTimes += 1, console.log("💨 空气"), $.message.insert("空气💨");
        } else {
          if (ililIIl.errorMessage) {
            $.drawError = ililIIl.errorMessage;
            if (["上限", "不足", "超过", "非法操作", "明天"].some(IIll1Iil => $.drawError.includes(IIll1Iil))) {
              $.drawStop = true;
              console.log($.drawError);
              $.message.insert($.drawError);
            }
            if (["未开始", "结束", "不存在", "不在"].some(illiiI => $.drawError.includes(illiiI))) {
              $.runEnd = true;
              $.message.fix($.drawError);
            }
            ["会员", "开卡"].some(Iii1i11I => $.drawError.includes(Iii1i11I)) && ($.needJoinMember = true, console.log($.drawError), $.message.fix($.drawError));
            !["火爆", "擦肩", "缓存", "数据忙"].some(l1I1iIII => $.drawError.includes(l1I1iIII)) && !$.drawStop && !$.needJoinMember && console.log($.drawError || "");
          } else console.log(JSON.stringify(data));
        }
    }
  } catch (iliiIiiI) {
    console.log("❌ 未能正确处理 " + II1iII1i + " 请求响应 " + (iliiIiiI.message || iliiIiiI));
  }
}
async function iiI1Iill(lliI11I1) {
  if ($.runEnd || $.outFlag) return;
  let lIliil1l = "",
    l11lliiI = "",
    IIII11li = "POST";
  switch (lliI11I1) {
    case "getMyPing":
      lIliil1l = $.baseUrl + "/customer/getMyPing", l11lliiI = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      lIliil1l = $.baseUrl + "/customer/getSimpleActInfoVo", l11lliiI = "activityId=" + $.activityId;
      break;
    case "getDefenseUrls":
      IIII11li = "GET", lIliil1l = $.baseUrl + "/customer/getDefenseUrls";
      break;
    case "initPinToken":
      IIII11li = "GET", lIliil1l = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&fromType=APP&riskType=1";
      break;
    case "accessLog":
      lIliil1l = $.baseUrl + "/common/accessLog", l11lliiI = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      lIliil1l = $.baseUrl + "/common/accessLogWithAD", l11lliiI = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
      break;
    case "getOpenCardStatus":
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          switch ($.activityMode) {
            case "lzkj":
              lIliil1l = $.baseUrl + "/wxCommonInfo/getActMemberInfo", l11lliiI = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              lIliil1l = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", l11lliiI = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
              break;
          }
          break;
        case 26:
          switch ($.activityMode) {
            case "lzkj":
              lIliil1l = $.baseUrl + "/crmCard/common/coupon/getOpenCardStatus", l11lliiI = "venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              lIliil1l = $.baseUrl + "/common/joinConfig/check", l11lliiI = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
              break;
          }
          break;
        case 124:
        case 125:
        case 128:
        case 129:
          lIliil1l = $.baseUrl + "/common/joinConfig/check", l11lliiI = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
          break;
      }
      break;
    case "activityContent":
      let l1I11l = "";
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          l1I11l = "wxDrawActivity/activityContent";
          break;
        case 26:
          l1I11l = "wxPointDrawActivity/activityContent";
          break;
        case 124:
          l1I11l = "wxScratchActive/activityContent";
          break;
        case 125:
          l1I11l = "wxPointBlindBox/activityContent";
          break;
        case 128:
          l1I11l = "wxGashaponActive/activityContent";
          break;
        case 129:
          l1I11l = "wxDollGrabbing/activityContent";
          break;
      }
      lIliil1l = $.baseUrl + "/" + l1I11l, l11lliiI = "activityId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    case "shopInfo":
      lIliil1l = $.baseUrl + "/wxDrawActivity/shopInfo", l11lliiI = "activityId=" + $.activityId;
      break;
    case "followShop":
      switch ($.activityMode) {
        case "lzkj":
          lIliil1l = $.baseUrl + "/wxActionCommon/followShop", l11lliiI = "userId=" + $.venderId + "&buyerNick=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
        case "cjhy":
          lIliil1l = $.baseUrl + "/wxActionCommon/newFollowShop", l11lliiI = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
      }
      break;
    case "getGiveContent":
      lIliil1l = $.baseUrl + "/wxDrawActivity/getGiveContent", l11lliiI = "pin=" + $.formatPin + "&activityId=" + $.activityId;
      break;
    case "followGoods":
      lIliil1l = $.baseUrl + "/wxDrawActivity/follow", l11lliiI = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&skuId=" + $.skuId;
      break;
    case "start":
      lIliil1l = "" + $.baseUrl + $.drawApiPath;
      $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? l11lliiI = JSON.stringify({
        "ecyText": il11iIi1({
          "actId": $.activityId,
          "activityId": $.activityId,
          "pin": encodeURIComponent($.secretPin)
        }, $.pinToken, $.te)
      }) : l11lliiI = "activityId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    default:
      console.log("❌ 未知请求 " + lliI11I1);
      return;
  }
  const IiIiIIi = {
    "url": lIliil1l,
    "headers": {
      "Origin": $.origin,
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": lliI11I1 === "start" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? "application/json" : "application/x-www-form-urlencoded",
      "Cookie": Iil1liIl.trim(),
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      "Referer": $.activityUrl
    },
    "body": l11lliiI,
    "timeout": 30000
  };
  IIII11li === "GET" && (delete IiIiIIi.body, delete IiIiIIi["Content-Type"]);
  const iilIiiil = 5;
  let IiiIIlIl = 0,
    iIIillil = null,
    IlllllIi = false;
  while (IiiIIlIl < iilIiiil) {
    IiiIIlIl > 0 && (await $.wait(1000));
    const {
      err: II1I1lIl,
      res: iii1I1I1,
      data: illl11l1
    } = await Ili11Il(IiIiIIi, IIII11li);
    if (II1I1lIl) {
      if (typeof II1I1lIl === "string" && II1I1lIl.includes("Timeout awaiting 'request'")) iIIillil = lliI11I1 + " 请求超时，请检查网络重试";else {
        const lIi11l1I = iii1I1I1?.["statusCode"];
        if (lIi11l1I) {
          if ([403, 493].includes(lIi11l1I)) iIIillil = lliI11I1 + " 请求失败，IP被限制（Response code " + lIi11l1I + "）", IlllllIi = true;else [400, 404].includes(lIi11l1I) ? iIIillil = lliI11I1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + lIi11l1I + "）" : iIIillil = lliI11I1 + " 请求失败（Response code " + lIi11l1I + "）";
        } else iIIillil = lliI11I1 + " 请求失败 => " + (II1I1lIl.message || II1I1lIl);
      }
      IiiIIlIl++;
    } else {
      const illil1ll = liil1lI1.getResponseCookie(iii1I1I1, Iil1liIl),
        iI1Il1lI = false;
      iI1Il1lI && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + lliI11I1 + " 响应Body => " + (illl11l1 || "无") + "\n"), console.log("🔧 " + lliI11I1 + " 响应Cookie => " + (illil1ll || "无") + "\n"), console.log("🔧 " + lliI11I1 + " 请求参数"), console.log(IiIiIIi), console.log("\n---------------------------------------------------\n"));
      let iIi11i11 = "";
      switch (lliI11I1) {
        case "getMyPing":
          iIi11i11 = liil1lI1.getCookieValue(illil1ll, "LZ_AES_PIN");
          iIi11i11 ? $.LZ_AES_PIN = iIi11i11 : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
        case "initPinToken":
          const i1IIiil = liil1lI1.getCookieValue(illil1ll, "pToken");
          i1IIiil ? $.pinToken = i1IIiil : (console.log("获取 pinToken 失败！"), $.message.fix("获取[pinToken]失败"), $.skipRun = true);
          iIi11i11 = liil1lI1.getCookieValue(illil1ll, "LZ_AES_PIN");
          iIi11i11 ? $.LZ_AES_PIN = iIi11i11 : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          const li1ll1iI = liil1lI1.getCookieValue(illil1ll, "te");
          li1ll1iI && ($.te = li1ll1iI, Iil1liIl += "te=" + $.te + "; ");
          break;
      }
      ["getMyPing", "followGoods", "start"].includes(lliI11I1) && (Iil1liIl = illil1ll);
      iIi11i11 = liil1lI1.getCookieValue(Iil1liIl, "LZ_AES_PIN");
      !iIi11i11 && $.LZ_AES_PIN && (Iil1liIl += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const iiIil1li = liil1lI1.getCookieValue(Iil1liIl, "pToken");
      !iiIil1li && $.pinToken && (Iil1liIl += "pToken=" + $.pinToken + "; ");
      const lI1iI1 = liil1lI1.getCookieValue(Iil1liIl, "AUTH_C_USER");
      !lI1iI1 && $.secretPin && (Iil1liIl += "AUTH_C_USER=" + $.secretPin + "; ");
      const Iiili1ii = liil1lI1.getCookieValue(Iil1liIl, "te");
      !Iiili1ii && $.te && (Iil1liIl += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD"].includes(lliI11I1)) {
        try {
          const lIIl1iiI = JSON.parse(illl11l1);
          l1lilI11(lliI11I1, lIIl1iiI);
          break;
        } catch (i1IlIill) {
          iI1Il1lI && (console.log("\n---------------------------------------------------\n"), console.log(Iil1liIl), console.log("\n---------------------------------------------------\n"));
          IiiIIlIl++;
        }
      } else {
        break;
      }
      IlllllIi = false;
    }
  }
  if (IiiIIlIl >= iilIiiil) {
    console.log(iIIillil);
    if (IlllllIi) {
      if (!iiII1il1) {
        $.outFlag = true;
        if ($.message) {
          $.message.fix(iIIillil);
        }
      }
    }
  }
}
async function Ili11Il(lilIIlIl, l1iilIii = "POST") {
  if (l1iilIii === "POST") return new Promise(async IilI111i => {
    $.post(lilIIlIl, (iiIilll1, liiIiI1i, iil1Iil) => {
      IilI111i({
        "err": iiIilll1,
        "res": liiIiI1i,
        "data": iil1Iil
      });
    });
  });else {
    if (l1iilIii === "GET") return new Promise(async I1III1i1 => {
      $.get(lilIIlIl, (iilli1iI, li1i1l1I, ii1i1I11) => {
        I1III1i1({
          "err": iilli1iI,
          "res": li1i1l1I,
          "data": ii1i1I11
        });
      });
    });else {
      const IIIIi11i = "不支持的请求方法";
      return {
        "err": IIIIi11i,
        "res": null,
        "data": null
      };
    }
  }
}
function i1il11i(ll1li11l) {
  return $.skipRun = true, new Promise(iiIlil11 => {
    let lIiliI1 = {
      "url": ll1li11l,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": ll1li11l,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(lIiliI1, async (l1IIllI1, II11l1lI, IIl1lili) => {
      try {
        if (l1IIllI1) {
          if (II11l1lI && typeof II11l1lI.statusCode != "undefined") {
            if (II11l1lI.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本！");
              !iiII1il1 && ($.outFlag = true);
            }
          }
          console.log(String(l1IIllI1));
          console.log("getFirstLZCK 请求失败，请检查网路重试");
        } else {
          IIl1lili.match(/(活动已经结束)/) && IIl1lili.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束或不存在"));
          if (II11l1lI.status == 200) {
            Iil1liIl = liil1lI1.getResponseCookie(II11l1lI, Iil1liIl);
            $.skipRun = false;
          }
        }
      } catch (lll) {
        $.logErr(lll, II11l1lI);
      } finally {
        iiIlil11();
      }
    });
  });
}
async function iIlillii() {
  if (!$.joinVenderId) return;
  return new Promise(async Ill1li1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IiIll1i1 = "";
    if ($.shopactivityId) IiIll1i1 = ",\"activityId\":" + $.shopactivityId;
    const IIiIlI1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IiIll1i1 + ",\"channel\":406}",
      II1iIIli = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIiIlI1i)
      },
      i1l1IIII = await IlIIiili("27004", II1iIIli),
      IiIiii1I = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + IIiIlI1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1l1IIII),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": IIilIIi1
        }
      };
    $.get(IiIiii1I, async (Il1l1Ili, IliIIi1l, iIIl1i11) => {
      try {
        if (Il1l1Ili) console.log(Il1l1Ili);else {
          const ll1l1lI1 = JSON.parse(iIIl1i11);
          if (typeof ll1l1lI1 === "object") {
            if (ll1l1lI1.success === true) {
              console.log(ll1l1lI1.message);
              $.errorJoinShop = ll1l1lI1.message;
              if (ll1l1lI1.result && ll1l1lI1.result.giftInfo) {
                for (let iiiIl1li of ll1l1lI1.result.giftInfo.giftList) {
                  console.log("入会获得：" + iiiIl1li.discountString + iiiIl1li.prizeName + iiiIl1li.secondLineDesc);
                }
              }
            } else typeof ll1l1lI1 == "object" && ll1l1lI1.message ? ($.errorJoinShop = ll1l1lI1.message, console.log("" + (ll1l1lI1.message || ""))) : console.log(iIIl1i11);
          } else console.log(iIIl1i11);
        }
      } catch (ii1illll) {
        $.logErr(ii1illll, IliIIi1l);
      } finally {
        Ill1li1I();
      }
    });
  });
}
function il11iIi1(lliIli1i, l1lii1iI, II1III1l) {
  function Il1i11l(i1lIiI11) {
    i1lIiI11 = i1lIiI11.split("").reverse().join("");
    const iIllll = new Uint8Array(12),
      II1IIIil = new TextEncoder().encode(i1lIiI11);
    for (let ll11liii = 0; ll11liii < II1IIIil.length; ll11liii += 2) {
      let IIii11Il = II1IIIil[ll11liii] << 5 | II1IIIil[ll11liii + 1] & 255;
      IIii11Il %= 63;
      iIllll[ll11liii >> 1] = IIii11Il;
    }
    let I1IIiIil = "";
    for (let illlIiii = 0; illlIiii < iIllll.length; illlIiii++) {
      I1IIiIil += (iIllll[illlIiii] + 256).toString(2).slice(1);
    }
    let lIIl1lI1 = "",
      Iillii1I = "";
    for (let Iii11l1l = 0; Iii11l1l < 16; Iii11l1l++) {
      if (Iii11l1l !== 0) {
        const I1iIi111 = Iii11l1l * 6,
          liiil11l = I1IIiIil.substring(I1iIi111, I1iIi111 + 6);
        let ll1llI = parseInt(liiil11l, 2);
        const lI11IIi = Iillii1I.split("");
        for (let ili1iIil = 0; ili1iIil < lI11IIi.length; ili1iIil++) {
          lI11IIi[ili1iIil] === "1" && (ll1llI = (ll1llI >> 6 - ili1iIil | ll1llI << ili1iIil) & 63);
        }
        Iillii1I = (ll1llI & 63).toString(2).padStart(6, "0");
      } else Iillii1I = I1IIiIil.substring(0, 6);
      lIIl1lI1 += Iillii1I;
    }
    for (let lllli1 = 0; lllli1 < 12; lllli1++) {
      const IiIi111i = lllli1 * 8;
      iIllll[lllli1] = parseInt(lIIl1lI1.substring(IiIi111i, IiIi111i + 8), 2);
    }
    const I1lIli1l = btoa(String.fromCharCode.apply(null, iIllll));
    return I1lIli1l;
  }
  const lIIIIl = ["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"];
  let IliI11li = Date.now() + parseInt(II1III1l);
  typeof lliIli1i != "object" && (lliIli1i = JSON.parse(lliIli1i));
  lliIli1i.nowTime = IliI11li;
  let IIIlI11I = l1lii1iI + IliI11li;
  const IIII1l1l = IIIlI11I.substring(0, IIIlI11I.length - 5);
  let IiIl1i = "";
  for (let lIlliI1I = 0; lIlliI1I < IIII1l1l.length; lIlliI1I++) {
    let ll11iIi1 = IIII1l1l.charCodeAt(lIlliI1I),
      iIIlilIi = ll11iIi1 % 10,
      iIlIl1i = lIIIIl[iIIlilIi][lIlliI1I];
    IiIl1i += iIlIl1i;
  }
  var lliliIiI = IiIl1i.length,
    I1i1ilIi = Math.floor(lliliIiI / 24),
    ili1i1I = "";
  for (var i1iIiIII = 0; i1iIiIII < 24; i1iIiIII++) {
    var il11I1l = (i1iIiIII + 1) * I1i1ilIi;
    i1iIiIII === 23 && (il11I1l = lliliIiI);
    var I11lIiii = IiIl1i.substring(i1iIiIII * I1i1ilIi, il11I1l),
      Ii111lll = [];
    for (var ilIl11i = 0; ilIl11i < I11lIiii.length; ilIl11i++) {
      Ii111lll.push(I11lIiii.charCodeAt(ilIl11i));
    }
    var lil1I1ll = Ii111lll.reduce(function (I1iiI1, li11iIii) {
        return I1iiI1 + li11iIii;
      }, 0),
      iil11ll1 = Math.floor(lil1I1ll / Ii111lll.length);
    ili1i1I += String.fromCharCode(iil11ll1);
  }
  IiIl1i = ili1i1I;
  const lIlili1l = Il1i11l(IiIl1i),
    lIi11i1i = I1I1IilI.enc.Utf8.parse(lIlili1l),
    lIi1lI1 = I1I1IilI.enc.Utf8.parse(""),
    II1iIilI = I1I1IilI.AES.encrypt(JSON.stringify(lliIli1i), lIi11i1i, {
      "iv": lIi1lI1,
      "mode": I1I1IilI.mode.ECB,
      "padding": I1I1IilI.pad.Pkcs7
    });
  return II1iIilI.toString();
}
function iIiIiIil() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const I1IIliII = Array.from(new Set($.blacklist.split("&")));
  console.log(I1IIliII.join("&") + "\n");
  let lIiilli1 = I1IIliII,
    ii1II1II = [],
    i1IIiili = false;
  for (let iiiilIi1 = 0; iiiilIi1 < Iii11i1i.length; iiiilIi1++) {
    let Ill11ii = decodeURIComponent(Iii11i1i[iiiilIi1].match(/pt_pin=([^; ]+)(?=;?)/) && Iii11i1i[iiiilIi1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!Ill11ii) break;
    let iIillIIi = false;
    for (let iIlIlilI of lIiilli1) {
      if (iIlIlilI && iIlIlilI == Ill11ii) {
        iIillIIi = true;
        break;
      }
    }
    !iIillIIi && (i1IIiili = true, ii1II1II.splice(iiiilIi1, -1, Iii11i1i[iiiilIi1]));
  }
  if (i1IIiili) Iii11i1i = ii1II1II;
}
function lilI1I(lIilillI, Iil1ii1I) {
  Iil1ii1I != 0 && lIilillI.unshift(lIilillI.splice(Iil1ii1I, 1)[0]);
}
function liliIili() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(Iii11i1i, Iii11i1i));
    return;
  }
  console.log("当前已设置白名单：");
  const IiliI111 = Array.from(new Set($.whitelist.split("&")));
  console.log(IiliI111.join("&") + "\n");
  let lIIlli1i = [],
    li1il11 = IiliI111;
  for (let IlI1iIIi in Iii11i1i) {
    let IiIiii11 = decodeURIComponent(Iii11i1i[IlI1iIIi].match(/pt_pin=([^; ]+)(?=;?)/) && Iii11i1i[IlI1iIIi].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    li1il11.includes(IiIiii11) && lIIlli1i.push(Iii11i1i[IlI1iIIi]);
  }
  helpCookiesArr = lIIlli1i;
  if (li1il11.length > 1) for (let lliI1IIl in li1il11) {
    let I1IIl1I = li1il11[li1il11.length - 1 - lliI1IIl];
    if (!I1IIl1I) continue;
    for (let i1illl1i in helpCookiesArr) {
      let l1i1IIii = decodeURIComponent(helpCookiesArr[i1illl1i].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[i1illl1i].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      I1IIl1I == l1i1IIii && lilI1I(helpCookiesArr, i1illl1i);
    }
  }
}