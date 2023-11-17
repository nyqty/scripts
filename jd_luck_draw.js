/*
活动名称：店铺抽奖 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/lzclient/<活动id>/cjwx/common/entry.html?activityId=<活动id>&gameType=<玩法类型>
         https://lzkj-isv.isvjd.com/wxDrawActivity/activity/activity?activityId=<活动id>
         https://cjhy-isv.isvjcloud.com/wxDrawActivity/activity/activity?activityId=<活动id>
环境变量：LUCK_DRAW_URL // 活动链接
         LUCK_DRAW_NOTIFY // 是否推送通知（true/false），默认不推送
         LUCK_DRAW_OPENCARD // 是否入会（true/false），默认不入会
         LUCK_DRAW_CONC // 是否启用并发模式（true/false），默认不开启
         LUCK_DRAW_CONC_THREADS // 控制并发线程数（正整数），默认3         
         LUCK_DRAW_CONC_RETRY // 并发模式下接口请求的最大重试次数（正整数），默认0即不重试
        LUCK_DRAW_CONC_TIMEOUT // 并发模式下接口请求的最大超时时间（正整数，单位毫秒），默认 '60000' 即1分钟
        LUCK_DRAW_INTERVAL // 自定义抽奖间隔（整数），默认1秒
         LUCK_DRAW_MAX_MISS // 最大连续未抽中次数（正整数），达到此次数后会跳过运行对应账号，默认不启用此功能
        LUCK_DRAW_FORBIDDEN_QUIT // 当连续请求493时是否跳出即停止运行脚本（true/false），默认停止运行
        LUCK_DRAW_LZKJ_PIN_FILTER // 超级无线类活动账号pin过滤，多个用@进行分割
        LUCK_DRAW_CJHY_PIN_FILTER // 超级会员类活动账号pin过滤，多个用@进行分割
        LUCK_DRAW_LZKJ_SHOP_FILTER // 超级无线类活动店铺ID过滤，多个用英文逗号进行分割
        LUCK_DRAW_CJHY_SHOP_FILTER // 超级会员类活动店铺ID过滤，多个用英文逗号进行分割

注：只有在没有抽奖次数的情况下才会去做任务获取，部分活动涉及定制接口会导致请求响应非法操作

2023/9/6 修复 500错误 修复黑名单无效

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺抽奖通用活动-加密
1 1 1 1 * jd_luck_draw.js, tag=店铺抽奖通用活动-加密, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺抽奖（超级无线/超级会员）')
var version_ = "jsjiami.com.v7";
const i11ll1 = require("./jdCookie"),
  iIiIII = require("./function/jdCommon"),
  I1lI = require("./function/sendJDNotify"),
  iIlIl = require("./function/krgetToken"),
  {
    wuxian_savePrize: iIlIi
  } = require("./function/krsavePrize"),
  iIl111 = require("crypto-js"),
  i11lil = process.env.LUCK_DRAW_URL || "",
  iilI1I = process.env.LUCK_DRAW_OPENCARD === "true",
  i11lii = process.env.LUCK_DRAW_NOTIFY === "true",
  I1Iii1 = process.env.LUCK_DRAW_CONC === "true",
  iiI1II = process.env.LUCK_DRAW_CONC_THREADS || "3";
let iIl11I = process.env.LUCK_DRAW_CONC_TIMEOUT || "60000",
  lIiii1 = process.env.LUCK_DRAW_CONC_RETRY || "0";
const iIlII = process.env.LUCK_DRAW_INTERVAL || "";
let iIiII1 = process.env.LUCK_DRAW_MAX_MISS || "";
const I1l1 = !(process.env.LUCK_DRAW_FORBIDDEN_QUIT === "false"),
  Il11I1 = (process.env.LUCK_DRAW_LZKJ_PIN_FILTER || "").split("@"),
  i11liI = (process.env.LUCK_DRAW_CJHY_PIN_FILTER || "").split("@"),
  iilI11 = (process.env.LUCK_DRAW_LZKJ_SHOP_FILTER || "").split(","),
  lIiiiI = (process.env.LUCK_DRAW_CJHY_SHOP_FILTER || "").split(",");
let iiI1Il = "",
  iiI1Ii = "",
  Il1i1 = "";
const IlIiil = Object.keys(i11ll1).map(i11li1 => i11ll1[i11li1]).filter(iIlI1 => iIlI1);
!IlIiil[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!i11lil) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const iI11i = iIiIII.parseUrl(i11lil);
  if (!iI11i) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = i11lil;
  $.activityId = iIiIII.getUrlParameter(i11lil, "activityId");
  $.hostname = iI11i?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) {
      $.activityMode = "cjhy";
    } else {
      if ($.hostname.includes("lzkj")) {
        $.activityMode = "lzkj";
        $.hostname = "lzkj-isv.isvjd.com";
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityMode || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  iI11i?.["pathname"]["includes"]("lzclient") && ($.activityUrl = $.baseUrl + "/wxDrawActivity/activity/activity?activityId=" + $.activityId);
  try {
    lIiii1 = parseInt(lIiii1) > 0 ? parseInt(lIiii1) : 0;
  } catch {
    lIiii1 = 0;
  }
  try {
    const l1I111 = parseInt(iIl11I);
    iIl11I = l1I111;
  } catch {
    iIl11I = 60000;
  }
  try {
    iIiII1 = parseInt(iIiII1);
  } catch {
    iIiII1 = 0;
  }
  $.drawIntervalTimes = $.activityMode === "cjhy" ? 1000 : 500;
  if (iIlII) {
    try {
      const lIIlii = parseInt(iIlII) * 1000;
      $.drawIntervalTimes = lIIlii;
    } catch {
      console.log("自定义抽奖间隔格式错误，已使用默认值");
    }
  }
  switch ($.activityMode) {
    case "lzkj":
      $.shopFilter = iilI11;
      $.pinFilter = Il11I1;
      break;
    case "cjhy":
      $.shopFilter = lIiiiI;
      $.pinFilter = i11liI;
      break;
  }
  I1lI.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  console.log("\n是否推送通知【" + (i11lii == true ? "通知" : "不通知") + "】 是否开卡 【" + (iilI1I == true ? "开卡" : "不开卡") + "】");
  if (!I1Iii1) {
    for (let Il1iI = 0; Il1iI < IlIiil.length; Il1iI++) {
      $.index = Il1iI + 1;
      iiI1Il = IlIiil[Il1iI];
      Il1i1 = IlIiil[Il1iI];
      iIiIII.setCookie(iiI1Il);
      $.UserName = decodeURIComponent(iIiIII.getCookieValue(iiI1Il, "pt_pin"));
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if ($.pinFilter.length > 0 && ($.pinFilter.includes($.UserName) || $.pinFilter.includes(encodeURIComponent($.UserName)))) {
        console.log("已设置跳过运行当前账号");
        continue;
      }
      $.UA = iIiIII.genUA($.UserName);
      $.UUID = iIiIII.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.te = Math.floor(Math.random() * 9000) + 1000;
      $.message = I1lI.create($.index, $.UserName);
      $.nickName = "";
      await IlIiii();
      iIiIII.unsetCookie();
      if ($.runEnd) {
        break;
      }
      if ($.outFlag) {
        if (I1l1) {
          break;
        } else {
          $.outFlag = false;
        }
      }
    }
  } else {
    console.log("🔀 已开启并发模式，当前设置线程数为 " + iiI1II);
    await ilIII1();
  }
  i11lii && I1lI.getMessage() && (I1lI.updateContent(I1lI.content + ("\n【活动地址】" + $.activityUrl)), await I1lI.push());
})().catch(iI1i1i => $.logErr(iI1i1i)).finally(() => $.done());
async function IlIiii() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.needJoinMember = false;
    $.secretPin = "";
    $.pinToken = "";
    $.LZ_AES_PIN = "";
    iiI1Ii = "";
    if ($.skipRun || $.runEnd || $.outFlag) {
      return;
    }
    for (let lll1li = 0; lll1li < 3; lll1li++) {
      iiI1Ii = "";
      await lIIlll($.activityUrl);
      await $.wait(500);
      if ($.runEnd) {
        return;
      }
      if (iiI1Ii) {
        $.skipRun = false;
        break;
      }
    }
    if ($.skipRun) {
      console.log("获取 LZ_TOKEN 失败！");
      $.message.fix("获取[LZ_TOKEN]失败");
      return;
    }
    if ($.outFlag || $.runEnd) {
      return;
    }
    if (!$.venderId) {
      await lliliI("getSimpleActInfoVo");
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
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
          $.runEnd = true;
          return;
      }
      if ($.shopFilter.length > 0 && ($.shopFilter.includes($.venderId) || $.shopFilter.includes($.shopId))) {
        console.log("店铺 " + $.venderId + " 已被加入黑名单，结束运行");
        $.message.fix("店铺已被加入黑名单");
        $.runEnd = true;
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
      $.activityMode === "cjhy" && !$.defenseUrls && ($.defenseUrls = ["/wxScratchActive/start", "/wxPointDrawActivity/start", "/wxPointBlindBox/start", "/wxGashaponActive/start", "/wxDollGrabbing/start", "/wxDrawActivity/start", "/wxShopFollowActivity/getPrize", "/wx/completeInfoActivity/save", "/activity/daily/wx/grabGift", "/sign/wx/signUp", "/sign/sevenDay/wx/signUp", "/wxTeam/saveCaptain", "/wxTeam/saveMember"]);
    }
    $.token = await iIlIl(Il1i1, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    if ($.defenseUrls && $.defenseUrls.includes($.drawApiPath)) {
      await lliliI("initPinToken");
      if ($.runEnd || $.skipRun || $.outFlag) {
        return;
      }
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
    } else {
      await lliliI("getMyPing");
      if ($.runEnd || $.skipRun || $.outFlag) {
        return;
      }
      if (!$.secretPin) {
        console.log("未能获取用户鉴权信息！");
        $.message.fix("未能获取用户鉴权信息");
        return;
      }
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
        await lliliI("accessLogWithAD");
        break;
      case "cjhy":
        await lliliI("accessLog");
        break;
    }
    await $.wait(500);
    if (iilI1I) {
      await lliliI("getOpenCardStatus");
      if ($.outFlag && $.skipRun) {
        return;
      }
      if (!$.isMember) {
        const I11Ii1 = await iIiIII.joinShopMember($.venderId);
        I11Ii1 && (console.log("加入店铺会员成功"), $.isMember = true);
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.activityContent = "";
    await lliliI("activityContent");
    if (!$.activityContent) {
      console.log("未能获取到活动信息");
      $.message.fix("未能获取活动信息");
      return;
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
    const lll1ll = $.activityContent?.["dayMaxDraw"];
    lll1ll && $.canDrawTimes > lll1ll && ($.canDrawTimes = lll1ll);
    const illi1l = $.activityContent.content,
      l1llI = $.activityContent?.["needFollow"] || false,
      llilii = $.activityContent?.["hasFollow"] || false;
    if (!$.logActivityInfo) {
      let l111li = "";
      for (let I1il1 = 0; I1il1 < illi1l.length; I1il1++) {
        const IiIlIl = illi1l[I1il1].name,
          iiliiI = illi1l[I1il1].type,
          Il1li = illi1l[I1il1].id;
        if (Il1li === 0 || iiliiI === 0) {
          l111li += "谢谢参与";
          break;
        } else {
          l111li += "" + IiIlIl + (iiliiI === 8 ? "[专享价]" : iiliiI === 7 ? "[实物]" : "");
          I1il1 !== illi1l.length - 1 && (l111li += "，");
        }
      }
      await lliliI("shopInfo");
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + l111li + "\n");
      I1lI.updateContent(I1lI.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】" + l111li));
      let Il1ll = $.activityContent?.["startTime"],
        Iilil = $.activityContent?.["endTime"];
      if ((!Il1ll || !Iilil) && $.activityContent?.["rule"]) {
        try {
          const li111I = /抽奖时间：(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) 至 (\d{4}-\d{2}-\d{2} \d{2}:\d{2})；/,
            IiIlIi = $.activityContent.rule.match(li111I);
          IiIlIi && IiIlIi.length === 3 && (Il1ll = new Date(IiIlIi[1]).getTime(), Iilil = new Date(IiIlIi[2]).getTime());
        } catch {}
      }
      const Iilii = Date.now();
      if (Iilil && Iilii > Iilil) {
        const iilil1 = $.time("yyyy-MM-dd HH:mm", Iilil);
        console.log("活动已于 " + iilil1 + " 结束，下次早点来吧~");
        $.message.fix("活动已结束，结束时间：" + iilil1);
        $.runEnd = true;
        return;
      }
      if (Il1ll && Iilii < Il1ll) {
        const il1lll = $.time("yyyy-MM-dd HH:mm", Il1ll);
        console.log("活动将在 " + il1lll + " 开始，晚点再来吧~");
        $.message.fix("活动尚未开始，开始时间：" + il1lll);
        $.runEnd = true;
        return;
      }
      $.logActivityInfo = true;
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        l1llI && !llilii && (await lliliI("followShop"), $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500));
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        await lliliI("followShop");
        break;
    }
    if ($.needJoinMember || $.outFlag) {
      return;
    }
    if ($.canDrawTimes === 0) {
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          await lliliI("getGiveContent");
          $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
          if ($.followTaskInfo) {
            const i1Il11 = $.followTaskInfo?.["skuIdsList"],
              li1lI1 = $.followTaskInfo?.["followTimes"],
              ll1I11 = $.followTaskInfo?.["hasGetGiveTimes"],
              l1lli = $.followTaskInfo?.["giveTimes"],
              il1lli = $.followTaskInfo?.["maxGiveTimes"],
              IIi1Il = Math.trunc(i1Il11.length / li1lI1 * l1lli);
            if (ll1I11 < il1lli && ll1I11 < IIi1Il) {
              let l1lll = (il1lli - ll1I11) * li1lI1;
              for (let li1lII = 0; li1lII < i1Il11.length; li1lII++) {
                $.skuId = i1Il11[li1lII];
                await lliliI("followGoods");
                $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
                if (li1lII === l1lll - 1) {
                  break;
                }
              }
              $.activityContent = "";
              await lliliI("activityContent");
              if (!$.activityContent) {
                console.log("未能获取到活动信息");
                $.message.fix("未能获取活动信息");
                return;
              }
              $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
              const IIi1Ii = $.activityContent?.["dayMaxDraw"] || 0;
              $.canDrawTimes > IIi1Ii && ($.canDrawTimes = IIi1Ii);
              $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
              console.log("");
            }
          }
          break;
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          break;
      }
    }
    if ($.canDrawTimes <= 0) {
      switch ($.activityType) {
        case 13:
          console.log("今天没有抽奖机会了，明天再来吧~");
          $.message.fix("今日已无抽奖机会");
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
          console.log("没有抽奖机会了~");
          $.message.fix("抽奖机会不足");
          break;
      }
      return;
    }
    $.drawTimes = 0;
    $.drawStop = false;
    $.drawMissTimes = 0;
    for (let lIiiii = 1; $.canDrawTimes--; lIiiii++) {
      $.drawError = "";
      await lliliI("start");
      if ($.drawError) {
        $.drawError.indexOf("火爆") > -1 && ($.canDrawTimes += 1);
        if ($.activityMode === "cjhy") {
          if ($.drawError.indexOf("擦肩") > -1 || $.drawError.indexOf("缓存") > -1) {
            $.canDrawTimes += 1;
          }
        }
        if (iIiII1 && $.drawMissTimes >= iIiII1) {
          break;
        }
        if ($.drawStop || $.needJoinMember || $.runEnd) {
          break;
        }
      }
      if ($.canDrawTimes <= 0) {
        break;
      }
      if ($.drawTimes >= 8 && [26, 124, 125, 128, 129].includes($.activityType)) {
        console.log("\n抽奖次数过多，剩余" + $.canDrawTimes + "次机会，下次再继续吧~");
        $.message.insert("抽奖次数过多下次再抽，剩余" + $.canDrawTimes + "次机会");
        break;
      }
      await $.wait($.drawIntervalTimes);
    }
  } catch (lIiiil) {
    console.log("❌ 脚本运行遇到了错误\n" + lIiiil);
  }
}
async function ilIII1() {
  for (let I11lII = 0; I11lII < 3; I11lII++) {
    iiI1Ii = "";
    await lIIlll($.activityUrl);
    if ($.runEnd) {
      return;
    }
    if (iiI1Ii) {
      $.skipRun = false;
      break;
    }
  }
  if ($.skipRun) {
    console.log("获取 LZ_TOKEN 失败！");
    I1lI.updateContent(I1lI.content + "获取[LZ_TOKEN]失败\n");
    return;
  }
  await lliliI("getSimpleActInfoVo");
  if (!$.venderId || !$.activityType) {
    console.log("getSimpleActInfoVo 未能获取店铺信息");
    I1lI.updateContent(I1lI.content + "未能获取店铺信息\n");
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
      console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
      return;
  }
  if ($.shopFilter.length > 0 && ($.shopFilter.includes($.venderId) || $.shopFilter.includes($.shopId))) {
    console.log("店铺 " + $.venderId + " 已被加入黑名单，结束运行");
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
  await lliliI("shopInfo");
  $.activityMode === "cjhy" && !$.defenseUrls && ($.defenseUrls = ["/wxScratchActive/start", "/wxPointDrawActivity/start", "/wxPointBlindBox/start", "/wxGashaponActive/start", "/wxDollGrabbing/start", "/wxDrawActivity/start", "/wxShopFollowActivity/getPrize", "/wx/completeInfoActivity/save", "/activity/daily/wx/grabGift", "/sign/wx/signUp", "/sign/sevenDay/wx/signUp", "/wxTeam/saveCaptain", "/wxTeam/saveMember"]);
  console.log("");
  await iIiIII.concTask(iiI1II, IlIiil, async (Il111i, IIl1l1) => {
    const il1I = decodeURIComponent(iIiIII.getCookieValue(Il111i, "pt_pin")),
      IIili1 = I1lI.create(IIl1l1, il1I);
    if (IIl1l1 !== 1 && $.pinFilter.length > 0 && ($.pinFilter.includes(il1I) || $.pinFilter.includes(encodeURIComponent(il1I)))) {
      IIili1.fix("已设置跳过运行当前账号");
      console.log(IIili1.getInlineContent());
      return;
    }
    const Ii11li = iIiIII.genUA(il1I);
    let il11 = "",
      iliil = "",
      lIiI1i = "",
      lIiiI = "",
      iiiilI = "",
      lIlIIi = "",
      lIiI1l = "",
      llI1 = false,
      I11lIl = false,
      iliii = false;
    lIlIIi = await li1l1i();
    if (!lIlIIi) {
      IIili1.fix("获取[LZ_COOKIE]失败");
      console.log(IIili1.getInlineContent());
      return;
    }
    il11 = await iIlIl(Il111i, $.baseUrl);
    if (!il11) {
      IIili1.fix("获取[Token]失败");
      console.log(IIili1.getInlineContent());
      return;
    }
    if ($.activityMode === "cjhy") {
      await li1l1l("initPinToken");
      if (!lIiI1i) {
        IIili1.fix("获取[pinToken]失败");
        console.log(IIili1.getInlineContent());
        return;
      }
    } else {
      await li1l1l("getMyPing");
    }
    if (!iliil) {
      IIili1.fix("未能获取用户鉴权信息");
      console.log(IIili1.getInlineContent());
      return;
    }
    switch ($.activityMode) {
      case "lzkj":
        lIiI1l = encodeURIComponent(iliil);
        break;
      case "cjhy":
        lIiI1l = encodeURIComponent(encodeURIComponent(iliil));
        break;
    }
    switch ($.activityMode) {
      case "lzkj":
        await li1l1l("accessLogWithAD");
        break;
      case "cjhy":
        await li1l1l("accessLog");
        break;
    }
    let lIlIIl = true;
    if (iilI1I) {
      await li1l1l("getOpenCardStatus");
      if (I11lIl) {
        console.log(IIili1.getInlineContent());
        return;
      }
      if (!lIlIIl) {
        const IIi11 = await iIiIII.joinShopMember($.venderId, Il111i);
        IIi11 && (IIili1.insert("加入店铺会员成功"), lIlIIl = true);
      }
    }
    let I11lIi = "",
      lII1i1 = 0;
    await li1l1l("activityContent");
    if (iliii) {
      console.log(IIili1.getInlineContent());
      return {
        runEnd: true
      };
    }
    if (!I11lIi) {
      IIili1.fix("未能获取活动信息");
      console.log(IIili1.getInlineContent());
      return;
    }
    lII1i1 = I11lIi?.["canDrawTimes"] || 0;
    const IIl1i1 = I11lIi?.["dayMaxDraw"];
    IIl1i1 && lII1i1 > IIl1i1 && (lII1i1 = IIl1i1);
    const Ii11lI = I11lIi.content,
      II1ii1 = I11lIi?.["needFollow"] || false,
      Ii11l1 = I11lIi?.["hasFollow"] || false;
    if (IIl1l1 === 1) {
      let lII1li = "";
      for (let II1I1i = 0; II1I1i < Ii11lI.length; II1I1i++) {
        const II1I1l = Ii11lI[II1I1i].name,
          ilIl1I = Ii11lI[II1I1i].type,
          iiI = Ii11lI[II1I1i].id;
        if (iiI === 0 || ilIl1I === 0) {
          lII1li += "谢谢参与";
          break;
        } else {
          lII1li += "" + II1I1l + (ilIl1I === 8 ? "[专享价]" : ilIl1I === 7 ? "[实物]" : "");
          II1I1i !== Ii11lI.length - 1 && (lII1li += "，");
        }
      }
      console.log("\n" + ($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + lII1li + "\n");
      I1lI.updateContent(I1lI.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】" + lII1li));
      let lII1ll = I11lIi?.["startTime"],
        lIilI = I11lIi?.["endTime"];
      if ((!lII1ll || !lIilI) && I11lIi?.["rule"]) {
        try {
          const lIill = /抽奖时间：(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) 至 (\d{4}-\d{2}-\d{2} \d{2}:\d{2})；/,
            iIiI1l = I11lIi.rule.match(lIill);
          iIiI1l && iIiI1l.length === 3 && (lII1ll = new Date(iIiI1l[1]).getTime(), lIilI = new Date(iIiI1l[2]).getTime());
        } catch {}
      }
      const lli1I1 = Date.now();
      if (lIilI && lli1I1 > lIilI) {
        const iIiI1i = $.time("yyyy-MM-dd HH:mm", lIilI);
        console.log("活动已于 " + iIiI1i + " 结束，下次早点来吧~");
        IIili1.fix("活动已结束，结束时间：" + iIiI1i);
        return {
          runEnd: true
        };
      }
      if (lII1ll && lli1I1 < lII1ll) {
        const lIili = $.time("yyyy-MM-dd HH:mm", lII1ll);
        console.log("活动将在 " + lIili + " 开始，晚点再来吧~");
        IIili1.fix("活动尚未开始，开始时间：" + lIili);
        return {
          runEnd: true
        };
      }
      if ($.pinFilter.length > 0 && ($.pinFilter.includes(il1I) || $.pinFilter.includes(encodeURIComponent(il1I)))) {
        IIili1.fix("已设置跳过运行当前账号");
        console.log(IIili1.getInlineContent());
        return;
      }
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        II1ii1 && !Ii11l1 && (await li1l1l("followShop"));
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        await li1l1l("followShop");
        break;
    }
    if (llI1 || I11lIl) {
      console.log(IIili1.getInlineContent());
      return;
    }
    let II1iiI = "";
    if (lII1i1 === 0) {
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          await li1l1l("getGiveContent");
          break;
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          break;
      }
    }
    if (lII1i1 <= 0) {
      switch ($.activityType) {
        case 13:
          IIili1.fix("今日已无抽奖机会");
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
          IIili1.fix("抽奖机会不足");
          break;
      }
      console.log(IIili1.getInlineContent());
      return;
    }
    let iII1li = 0,
      lIiii = 0,
      I1111l = false,
      l111i1 = "";
    for (let i1li11 = 1; lII1i1--; i1li11++) {
      l111i1 = "";
      await li1l1l("start");
      if (l111i1) {
        l111i1.indexOf("火爆") > -1 && (lII1i1 += 1);
        $.activityMode === "cjhy" && (l111i1.indexOf("擦肩") > -1 || l111i1.indexOf("缓存") > -1) && (lII1i1 += 1);
        if (iIiII1 && lIiii >= iIiII1) {
          break;
        }
        if (I1111l || llI1) {
          break;
        }
        if (iliii) {
          console.log(IIili1.getInlineContent());
          return {
            runEnd: true
          };
        }
      }
      if (lII1i1 <= 0) {
        break;
      }
      if (iII1li >= 8 && [26, 124, 125, 128, 129].includes($.activityType)) {
        IIili1.insert("抽奖次数过多下次再抽，剩余" + lII1i1 + "次机会");
        break;
      }
    }
    console.log(IIili1.getInlineContent());
    async function li1l1l(lIil) {
      let lII1il = "",
        Il1Iii = "",
        Ii1iI = "POST";
      switch (lIil) {
        case "getMyPing":
          lII1il = $.baseUrl + "/customer/getMyPing";
          Il1Iii = "token=" + il11 + "&fromType=APP&userId=" + $.venderId;
          break;
        case "initPinToken":
          Ii1iI = "GET";
          lII1il = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + il11 + "&source=01&venderId=" + $.venderId + "&uuid=" + iIiIII.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") + "&clientTime=" + Date.now();
          break;
        case "accessLog":
          lII1il = $.baseUrl + "/common/accessLog";
          Il1Iii = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + lIiI1l + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
          break;
        case "accessLogWithAD":
          lII1il = $.baseUrl + "/common/accessLogWithAD";
          Il1Iii = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + lIiI1l + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
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
                  lII1il = $.baseUrl + "/wxCommonInfo/getActMemberInfo";
                  Il1Iii = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + lIiI1l;
                  break;
                case "cjhy":
                  lII1il = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
                  Il1Iii = "venderId=" + $.venderId + "&buyerPin=" + lIiI1l + "&activityType=" + $.activityType;
                  break;
              }
              break;
            case 26:
              switch ($.activityMode) {
                case "lzkj":
                  lII1il = $.baseUrl + "/crmCard/common/coupon/getOpenCardStatus";
                  Il1Iii = "venderId=" + $.venderId + "&pin=" + lIiI1l;
                  break;
                case "cjhy":
                  lII1il = $.baseUrl + "/common/joinConfig/check";
                  Il1Iii = "venderId=" + $.venderId + "&pin=" + lIiI1l + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
                  break;
              }
              break;
            case 124:
            case 125:
            case 128:
            case 129:
              lII1il = $.baseUrl + "/common/joinConfig/check";
              Il1Iii = "venderId=" + $.venderId + "&pin=" + lIiI1l + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
              break;
          }
          break;
        case "activityContent":
          let lIli = "";
          switch ($.activityType) {
            case 3:
            case 4:
            case 11:
            case 12:
            case 13:
              lIli = "wxDrawActivity/activityContent";
              break;
            case 26:
              lIli = "wxPointDrawActivity/activityContent";
              break;
            case 124:
              lIli = "wxScratchActive/activityContent";
              break;
            case 125:
              lIli = "wxPointBlindBox/activityContent";
              break;
            case 128:
              lIli = "wxGashaponActive/activityContent";
              break;
            case 129:
              lIli = "wxDollGrabbing/activityContent";
              break;
          }
          lII1il = $.baseUrl + "/" + lIli;
          Il1Iii = "activityId=" + $.activityId + "&pin=" + lIiI1l;
          break;
        case "followShop":
          switch ($.activityMode) {
            case "lzkj":
              lII1il = $.baseUrl + "/wxActionCommon/followShop";
              Il1Iii = "userId=" + $.venderId + "&buyerNick=" + lIiI1l + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
              break;
            case "cjhy":
              lII1il = $.baseUrl + "/wxActionCommon/newFollowShop";
              Il1Iii = "venderId=" + $.venderId + "&buyerPin=" + lIiI1l + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
              break;
          }
          break;
        case "getGiveContent":
          lII1il = $.baseUrl + "/wxDrawActivity/getGiveContent";
          Il1Iii = "pin=" + lIiI1l + "&activityId=" + $.activityId;
          break;
        case "followGoods":
          lII1il = $.baseUrl + "/wxDrawActivity/follow";
          Il1Iii = "activityId=" + $.activityId + "&pin=" + lIiI1l + "&skuId=" + II1iiI;
          break;
        case "start":
          lII1il = "" + $.baseUrl + $.drawApiPath;
          $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? Il1Iii = JSON.stringify({
            ecyText: ll1ii1({
              actId: $.activityId,
              activityId: $.activityId,
              pin: encodeURIComponent(iliil)
            }, lIiI1i, lIiiI)
          }) : Il1Iii = "activityId=" + $.activityId + "&pin=" + lIiI1l;
          break;
      }
      const Il1Iil = {
        url: lII1il,
        headers: {
          Origin: $.origin,
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9",
          Connection: "keep-alive",
          "Content-Type": ["saveCaptain", "saveMember"].includes(lIil) && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
          Cookie: lIlIIi,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent": Ii11li,
          "X-Requested-With": "XMLHttpRequest",
          Referer: $.activityUrl
        },
        body: Il1Iii,
        timeout: iIl11I
      };
      Ii1iI === "GET" && (delete Il1Iil.body, delete Il1Iil.headers["Content-Type"]);
      const ilI = 1 + lIiii1;
      let iIIlI = 0,
        i1li1l = null;
      while (iIIlI < ilI) {
        const {
          err: lIll,
          res: iiiIi,
          data: ilii11
        } = await ll1iiI(Il1Iil, Ii1iI);
        if (lIll) {
          if (!["accessLog", "accessLogWithAD"].includes(lIil)) {
            if (typeof lIll === "string" && lIll.includes("Timeout awaiting 'request'")) {
              i1li1l = lIil + " 请求超时）";
            } else {
              const liIiIl = iiiIi?.["statusCode"];
              if (liIiIl) {
                if ([403, 493].includes(liIiIl)) {
                  i1li1l = lIil + " 请求失败，IP被限制（Response code " + liIiIl + "）";
                } else {
                  if ([400, 404].includes(liIiIl)) {
                    i1li1l = lIil + " 请求配置参数错误，请联系开发者进行反馈（Response code " + liIiIl + "）";
                  } else {
                    [500].includes(liIiIl) && lIil === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? Il1Iil.body = JSON.stringify({
                      ecyText: ll1ii1({
                        actId: $.activityId,
                        activityId: $.activityId,
                        pin: encodeURIComponent(iliil)
                      }, lIiI1i, lIiiI)
                    }) : i1li1l = lIil + " 请求失败（Response code " + liIiIl + "）";
                  }
                }
              } else {
                i1li1l = lIil + " 请求失败 => " + (lIll.message || lIll);
              }
            }
            iIIlI++;
          }
        } else {
          const Il1IlI = iIiIII.getResponseCookie(iiiIi, lIlIIi),
            l11Ii = false;
          switch (lIil) {
            case "getMyPing":
              iiiilI = iIiIII.getCookieValue(Il1IlI, "LZ_AES_PIN");
              break;
            case "initPinToken":
              iiiilI = iIiIII.getCookieValue(Il1IlI, "LZ_AES_PIN");
              lIiI1i = iIiIII.getCookieValue(Il1IlI, "pToken");
              lIiiI = iIiIII.getCookieValue(Il1IlI, "te");
              break;
          }
          ["getMyPing", "followGoods", "start"].includes(lIil) && (lIlIIi = Il1IlI);
          !iIiIII.getCookieValue(lIlIIi, "LZ_AES_PIN") && iiiilI && (lIlIIi += "LZ_AES_PIN=" + iiiilI + "; ");
          !iIiIII.getCookieValue(lIlIIi, "pToken") && lIiI1i && (lIlIIi += "pToken=" + lIiI1i + "; ");
          !iIiIII.getCookieValue(lIlIIi, "AUTH_C_USER") && iliil && (lIlIIi += "AUTH_C_USER=" + iliil + "; ");
          !iIiIII.getCookieValue(lIlIIi, "te") && lIiiI && (lIlIIi += "te=" + lIiiI + "; ");
          if (["accessLog", "accessLogWithAD"].includes(lIil)) {
            break;
          }
          if (ilii11) {
            try {
              const IIilli = JSON.parse(ilii11);
              switch (lIil) {
                case "getMyPing":
                case "initPinToken":
                  if (IIilli.result === true && IIilli.data) {
                    iliil = IIilli.data?.["secretPin"];
                  } else {
                    IIilli.errorMessage && IIili1.fix(lIil + " " + IIilli.errorMessage);
                  }
                  break;
                case "getOpenCardStatus":
                  if (IIilli.result === true) {
                    if (IIilli.data) {
                      if (IIilli.data.hasOwnProperty("openCard")) {
                        lIlIIl = IIilli.data.openCard;
                      } else {
                        IIilli.data.hasOwnProperty("openedCard") && (lIlIIl = IIilli.data.openedCard);
                      }
                      if (typeof lIlIIl === "number") {
                        lIlIIl = lIlIIl === 1;
                      } else {
                        typeof lIlIIl === "undefined" && (lIlIIl = false);
                      }
                    } else {
                      lIlIIl = true;
                    }
                  } else {
                    if (IIilli.errorMessage) {
                      if (IIilli.errorMessage.includes("擦肩") && !IIilli?.["data"]) {
                        I11lIl = true;
                        IIili1.fix("账号已黑");
                      } else {
                        IIili1.fix(IIilli.errorMessage);
                      }
                    } else {
                      lIlIIl = false;
                      console.log("❓" + lIil + " " + JSON.stringify(IIilli));
                    }
                  }
                  break;
                case "activityContent":
                  if (IIilli.result === true && IIilli.data) {
                    I11lIi = IIilli.data;
                  } else {
                    if (IIilli.errorMessage) {
                      for (let il11il of ["未开始", "结束", "不存在", "不在"]) {
                        if (IIilli.errorMessage.includes(il11il)) {
                          IIili1.fix(IIilli.errorMessage);
                          iliii = true;
                          break;
                        }
                      }
                      IIili1.fix(IIilli.errorMessage);
                    } else {
                      console.log("❓" + lIil + " " + JSON.stringify(IIilli));
                    }
                  }
                  break;
                case "followShop":
                  if (!(IIilli.result === true)) {
                    IIilli.errorMessage ? (["会员", "开卡"].some(il11ii => IIilli.errorMessage.includes(il11ii)) && (llI1 = true, IIili1.fix("活动仅限店铺会员参与")), I11lIl = true) : console.log("❓" + lIil + " " + JSON.stringify(IIilli));
                  }
                  break;
                case "getGiveContent":
                  if (IIilli.result === true && IIilli.data) {
                    followTaskInfo = IIilli.data?.["follow"];
                  } else {
                    if (!IIilli.errorMessage) {
                      console.log("❓" + lIil + " " + JSON.stringify(IIilli));
                    }
                  }
                  break;
                case "followGoods":
                  if (!(IIilli.result === true)) {
                    if (!IIilli.errorMessage) {
                      console.log("❓" + lIil + " " + JSON.stringify(IIilli));
                    }
                  }
                  break;
                case "start":
                  if (IIilli.result === true && IIilli.data) {
                    iII1li += 1;
                    lII1i1 = IIilli.data.canDrawTimes;
                    const iIIiI = IIilli.data.drawInfo;
                    if (iIIiI) {
                      switch (iIIiI.type) {
                        case 4:
                          switch ($.activityType) {
                            case 3:
                            case 4:
                            case 11:
                            case 12:
                            case 13:
                              lII1i1 += 1;
                              break;
                            case 26:
                            case 124:
                            case 125:
                            case 128:
                            case 129:
                              IIili1.insert("空气💨");
                              break;
                          }
                          break;
                        case 6:
                          IIili1.insert(iIIiI.name + "🐶");
                          break;
                        case 7:
                          const Il1Ill = IIilli.data.addressId,
                            Ii1il = iIIiI.name;
                          let Il1Ili = "🎉 恭喜获得实物，奖品名称：" + Ii1il + "，参考价值：" + iIIiI.priceInfo + "(元)";
                          if (iIIiI.showImage) {
                            Il1Ili += "\n预览图片：" + iIIiI.showImage;
                          }
                          console.log(Il1Ili);
                          const Ii1ii = {
                              baseUrl: $.baseUrl,
                              cookie: lIlIIi,
                              ua: Ii11li,
                              activityId: $.activityId,
                              activityType: $.activityType,
                              venderId: [$.venderId, $.shopId],
                              secretPin: iliil,
                              prizeName: Ii1il,
                              generateId: Il1Ill
                            },
                            lli1II = await iIlIi(Ii1ii);
                          !i11lii && lli1II && (await I1lI.sendNotify($.name + "中奖通知", "【京东账号" + IIl1l1 + "】\n抽中实物 " + Ii1il + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                          IIili1.insert(Ii1il + "(" + (lli1II ? "已填地址" : "未填地址") + ")🎁");
                          break;
                        case 8:
                          IIili1.insert("专享价🗑️");
                          break;
                        case 9:
                          IIili1.insert(iIIiI.name + "🎟️");
                          break;
                        case 13:
                        case 14:
                        case 15:
                          !i11lii && (await I1lI.sendNotify($.name + "中奖通知", "【京东账号" + IIl1l1 + "】\n抽中 " + iIIiI.name + "\n\n" + $.activityUrl));
                          IIili1.insert(iIIiI.name + "🎁");
                          break;
                        case 16:
                          IIili1.insert(iIIiI.priceInfo + "红包🧧");
                          break;
                        default:
                          iIIiI.name.includes("券") ? IIili1.insert("优惠券🗑️") : IIili1.insert(iIIiI.name);
                          break;
                      }
                    } else {
                      lIiii += 1;
                      IIili1.insert("空气💨");
                    }
                  } else {
                    if (IIilli.errorMessage) {
                      l111i1 = IIilli.errorMessage;
                      ["上限", "不足", "超过", "非法操作", "明天"].some(lII1l => l111i1.includes(lII1l)) && (I1111l = true, IIili1.insert(l111i1));
                      ["未开始", "结束", "不存在", "不在"].some(il11iI => l111i1.includes(il11iI)) && (iliii = true, IIili1.fix(l111i1));
                      ["会员", "开卡"].some(i11lli => l111i1.includes(i11lli)) && (llI1 = true, IIili1.fix(l111i1));
                      if (!["火爆", "擦肩", "缓存", "数据忙"].some(lll1I => l111i1.includes(lll1I)) && !I1111l && !llI1) {
                        IIili1.insert(l111i1 || "");
                      }
                    } else {
                      console.log("❓" + lIil + " " + JSON.stringify(IIilli));
                    }
                  }
                  break;
              }
              break;
            } catch (l1i1ll) {
              IIili1.fix("❌ " + lIil + " 接口响应数据解析失败: " + (l1i1ll.message || l1i1ll));
              l11Ii && (console.log("\n---------------------------------------------------\n"), console.log(lIlIIi), console.log("\n---------------------------------------------------\n"));
              iIIlI++;
            }
          } else {
            lIil === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) && (Il1Iil.body = JSON.stringify({
              ecyText: ll1ii1({
                actId: $.activityId,
                activityId: $.activityId,
                pin: encodeURIComponent(iliil)
              }, lIiI1i, lIiiI)
            }));
            i1li1l = lIil + " 接口无响应数据";
            iIIlI++;
          }
        }
      }
      iIIlI >= ilI && (IIili1.fix(i1li1l), !["getGiveContent", "shopInfo", "accessLogWithAD", "accessLog"].includes(lIil) && IIili1.fix(i1li1l));
    }
    async function li1l1i() {
      return new Promise(il1iii => {
        let liIi1I = {
          url: $.activityUrl,
          headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            Connection: "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            Referer: $.activityUrl,
            "User-Agent": Ii11li
          },
          timeout: iIl11I
        };
        $.get(liIi1I, (il1ill, il1ili, lI1i1) => {
          try {
            il1ili.status === 200 ? il1iii(iIiIII.getResponseCookie(il1ili, lIlIIi)) : il1iii(null);
          } catch (i1iIl) {
            il1iii(null);
          }
        });
      });
    }
  });
  console.log("\n并发运行完毕");
}
async function lll1lI(lll1i, lll1l) {
  try {
    switch (lll1i) {
      case "getMyPing":
        if (lll1l.result === true && lll1l.data) {
          $.secretPin = lll1l.data?.["secretPin"];
          $.nickname = lll1l.data?.["nickname"];
        } else {
          lll1l.errorMessage ? (console.log(lll1i + " " + lll1l.errorMessage), $.message.fix(lll1l.errorMessage)) : console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
        }
        break;
      case "initPinToken":
        if (lll1l.result === true && lll1l.data) {
          $.secretPin = lll1l.data?.["secretPin"];
          $.nickname = lll1l.data?.["nickname"];
        } else {
          lll1l.errorMessage ? (console.log(lll1i + " " + lll1l.errorMessage), $.message.fix(lll1l.errorMessage)) : console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
        }
        break;
      case "getSimpleActInfoVo":
        if (lll1l.result === true && lll1l.data) {
          $.venderId = lll1l.data?.["venderId"];
          $.shopId = lll1l.data?.["shopId"];
          $.activityType = lll1l.data?.["activityType"];
        } else {
          lll1l.errorMessage ? console.log(lll1i + " " + lll1l.errorMessage) : console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
        }
        break;
      case "getDefenseUrls":
        if (lll1l.result === true && lll1l.data) {
          $.defenseUrls = lll1l?.["data"];
        } else {
          lll1l.errorMessage ? console.log(lll1i + " " + lll1l.errorMessage) : console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
        }
      case "getOpenCardStatus":
        if (lll1l.result === true) {
          if (lll1l.data) {
            if (lll1l.data.hasOwnProperty("openCard")) {
              $.isMember = lll1l.data.openCard;
            } else {
              lll1l.data.hasOwnProperty("openedCard") && ($.isMember = lll1l.data.openedCard);
            }
            if (typeof $.isMember === "number") {
              $.isMember = $.isMember === 1;
            } else {
              if (typeof $.isMember === "undefined") {
                $.isMember = false;
              }
            }
          } else {
            $.isMember = true;
          }
        } else {
          if (lll1l.errorMessage) {
            if (lll1l.errorMessage.includes("擦肩") && !lll1l?.["data"]) {
              $.skipRun = true;
              $.message.fix("账号已黑");
              console.log("账号已黑，下次别跑了~");
            } else {
              console.log(lll1i + " " + lll1l.errorMessage);
            }
          } else {
            $.isMember = false;
            console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
          }
        }
        break;
      case "activityContent":
        if (lll1l.result === true && lll1l.data) {
          $.activityContent = lll1l.data;
        } else {
          if (lll1l.errorMessage) {
            for (let ll1iI1 of ["未开始", "结束", "不存在", "不在"]) {
              if (lll1l.errorMessage.includes(ll1iI1)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(lll1i + " " + lll1l.errorMessage);
            $.message.fix(lll1l.errorMessage);
          } else {
            console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
          }
        }
        break;
      case "shopInfo":
        if (lll1l.result === true && lll1l.data) {
          $.shopName = lll1l?.["data"]?.["shopName"];
        } else {
          if (lll1l.errorMessage) {
            console.log("" + (lll1l.errorMessage || ""));
          } else {
            console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
          }
        }
        break;
      case "followShop":
        if (!(lll1l.result === true)) {
          if (lll1l.errorMessage) {
            ["会员", "开卡"].some(lli11I => lll1l.errorMessage.includes(lli11I)) && ($.needJoinMember = true, $.message.fix("活动仅限店铺会员参与"));
            console.log("" + (lll1l.errorMessage || ""));
          } else {
            console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
          }
        }
        break;
      case "getGiveContent":
        if (lll1l.result === true && lll1l.data) {
          $.followTaskInfo = lll1l.data?.["follow"];
        } else {
          lll1l.errorMessage ? console.log("" + (lll1l.errorMessage || "")) : console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
        }
        break;
      case "followGoods":
        if (lll1l.result === true) {
          console.log("做 \"关注商品\" 任务 >> 任务完成");
        } else {
          lll1l.errorMessage ? console.log("做 \"关注商品\" 任务 >> 任务失败（" + lll1l.errorMessage + "）") : console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
        }
        break;
      case "start":
        if (lll1l.result === true && lll1l.data) {
          $.drawTimes += 1;
          $.canDrawTimes = lll1l.data.canDrawTimes;
          const ililli = lll1l.data.drawInfo;
          if (ililli) {
            switch (ililli.type) {
              case 4:
                switch ($.activityType) {
                  case 3:
                  case 4:
                  case 11:
                  case 12:
                  case 13:
                    console.log("🔁 再来一次");
                    $.canDrawTimes += 1;
                    break;
                  case 26:
                  case 124:
                  case 125:
                  case 128:
                  case 129:
                    console.log("💨 空气");
                    $.message.insert("空气💨");
                    break;
                }
                break;
              case 6:
                console.log("🎉 " + ililli.name + " 🐶");
                $.message.insert(ililli.name + "🐶");
                break;
              case 7:
                const ii11l = lll1l.data.addressId,
                  iIIiIi = ililli.name;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + iIIiIi);
                console.log("参考价值：" + ililli.priceInfo + "（元）");
                if (ililli.showImage) {
                  console.log("预览图片：" + ililli.showImage);
                }
                const ililll = {
                    baseUrl: $.baseUrl,
                    cookie: iiI1Ii,
                    ua: $.UA,
                    activityId: $.activityId,
                    activityType: $.activityType,
                    venderId: [$.venderId, $.shopId],
                    secretPin: $.secretPin,
                    prizeName: iIIiIi,
                    generateId: ii11l
                  },
                  il1Ii = await iIlIi(ililll);
                !i11lii && il1Ii && (await I1lI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iIIiIi + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(iIIiIi + "(" + (il1Ii ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 8:
                console.log("🗑️ 专享价");
                $.message.insert("专享价🗑️");
                break;
              case 9:
                console.log("🗑️ " + ililli.name + " 🎟️");
                $.message.insert(ililli.name + "🎟️");
                break;
              case 13:
              case 14:
              case 15:
                console.log("🎉 恭喜获得" + ililli.name + " 🎁");
                !i11lii && (await I1lI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + ililli.name + "\n\n" + $.activityUrl));
                $.message.insert(ililli.name + "🎁");
                break;
              case 16:
                console.log("🎉 " + ililli.priceInfo + " 🧧");
                $.message.insert(ililli.priceInfo + "红包🧧");
                break;
              default:
                ililli.name.includes("券") ? (console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️")) : (console.log("获得：" + ililli.name), $.message.insert("" + ililli.name));
                break;
            }
          } else {
            $.drawMissTimes += 1;
            console.log("💨 空气");
            $.message.insert("空气💨");
          }
        } else {
          lll1l.errorMessage ? ($.drawError = lll1l.errorMessage, ["上限", "不足", "超过", "非法操作", "明天"].some(ii1lII => $.drawError.includes(ii1lII)) && ($.drawStop = true, console.log($.drawError), $.message.insert($.drawError)), ["未开始", "结束", "不存在", "不在"].some(IlIl1I => $.drawError.includes(IlIl1I)) && ($.runEnd = true, $.message.fix($.drawError)), ["会员", "开卡"].some(i1iII1 => $.drawError.includes(i1iII1)) && ($.needJoinMember = true, console.log($.drawError), $.message.fix($.drawError)), !["火爆", "擦肩", "缓存", "数据忙"].some(lI1li => $.drawError.includes(lI1li)) && !$.drawStop && !$.needJoinMember && console.log($.drawError || "")) : console.log("❓" + lll1i + " " + JSON.stringify(lll1l));
        }
        break;
    }
  } catch (lll1I1) {
    console.log("❌ 未能正确处理 " + lll1i + " 请求响应 " + (lll1I1.message || lll1I1));
  }
}
async function lliliI(lli111) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let I1IiIl = "",
    I1IiIi = "",
    ii11I = "POST";
  switch (lli111) {
    case "getMyPing":
      I1IiIl = $.baseUrl + "/customer/getMyPing";
      I1IiIi = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      I1IiIl = $.baseUrl + "/customer/getSimpleActInfoVo";
      I1IiIi = "activityId=" + $.activityId;
      break;
    case "getDefenseUrls":
      ii11I = "GET";
      I1IiIl = $.baseUrl + "/customer/getDefenseUrls";
      break;
    case "initPinToken":
      ii11I = "GET";
      I1IiIl = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now();
      break;
    case "accessLog":
      I1IiIl = $.baseUrl + "/common/accessLog";
      I1IiIi = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      I1IiIl = $.baseUrl + "/common/accessLogWithAD";
      I1IiIi = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
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
              I1IiIl = $.baseUrl + "/wxCommonInfo/getActMemberInfo";
              I1IiIi = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              I1IiIl = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
              I1IiIi = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
              break;
          }
          break;
        case 26:
          switch ($.activityMode) {
            case "lzkj":
              I1IiIl = $.baseUrl + "/crmCard/common/coupon/getOpenCardStatus";
              I1IiIi = "venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              I1IiIl = $.baseUrl + "/common/joinConfig/check";
              I1IiIi = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
              break;
          }
          break;
        case 124:
        case 125:
        case 128:
        case 129:
          I1IiIl = $.baseUrl + "/common/joinConfig/check";
          I1IiIi = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
          break;
      }
      break;
    case "activityContent":
      let lllli1 = "";
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          lllli1 = "wxDrawActivity/activityContent";
          break;
        case 26:
          lllli1 = "wxPointDrawActivity/activityContent";
          break;
        case 124:
          lllli1 = "wxScratchActive/activityContent";
          break;
        case 125:
          lllli1 = "wxPointBlindBox/activityContent";
          break;
        case 128:
          lllli1 = "wxGashaponActive/activityContent";
          break;
        case 129:
          lllli1 = "wxDollGrabbing/activityContent";
          break;
      }
      I1IiIl = $.baseUrl + "/" + lllli1;
      I1IiIi = "activityId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    case "shopInfo":
      I1IiIl = $.baseUrl + "/wxDrawActivity/shopInfo";
      I1IiIi = "activityId=" + $.activityId;
      break;
    case "followShop":
      switch ($.activityMode) {
        case "lzkj":
          I1IiIl = $.baseUrl + "/wxActionCommon/followShop";
          I1IiIi = "userId=" + $.venderId + "&buyerNick=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
        case "cjhy":
          I1IiIl = $.baseUrl + "/wxActionCommon/newFollowShop";
          I1IiIi = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
      }
      break;
    case "getGiveContent":
      I1IiIl = $.baseUrl + "/wxDrawActivity/getGiveContent";
      I1IiIi = "pin=" + $.formatPin + "&activityId=" + $.activityId;
      break;
    case "followGoods":
      I1IiIl = $.baseUrl + "/wxDrawActivity/follow";
      I1IiIi = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&skuId=" + $.skuId;
      break;
    case "start":
      I1IiIl = "" + $.baseUrl + $.drawApiPath;
      $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? I1IiIi = JSON.stringify({
        ecyText: ll1ii1({
          actId: $.activityId,
          activityId: $.activityId,
          pin: encodeURIComponent($.secretPin)
        }, $.pinToken, $.te)
      }) : I1IiIi = "activityId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    default:
      console.log("❌ 未知请求 " + lli111);
      return;
  }
  const lIIlII = {
    url: I1IiIl,
    headers: {
      Origin: $.origin,
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      Connection: "keep-alive",
      "Content-Type": lli111 === "start" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? "application/json" : "application/x-www-form-urlencoded",
      Cookie: iiI1Ii.trim(),
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      Referer: $.activityUrl
    },
    body: I1IiIi,
    timeout: 30000
  };
  ii11I === "GET" && (delete lIIlII.body, delete lIIlII.headers["Content-Type"]);
  const ii1lIl = 5;
  let il1II = 0,
    ii1lIi = null,
    I1lll = false;
  while (il1II < ii1lIl) {
    il1II > 0 && (await $.wait(1000));
    const {
      err: iI1l1I,
      res: i1llII,
      data: ill1il
    } = await ll1iiI(lIIlII, ii11I);
    if (iI1l1I) {
      if (typeof iI1l1I === "string" && iI1l1I.includes("Timeout awaiting 'request'")) {
        ii1lIi = lli111 + " 请求超时，请检查网络重试";
      } else {
        const I11l1i = i1llII?.["statusCode"];
        if (I11l1i) {
          if ([403, 493].includes(I11l1i)) {
            ii1lIi = lli111 + " 请求失败，IP被限制（Response code " + I11l1i + "）";
            I1lll = true;
          } else {
            if ([400, 404].includes(I11l1i)) {
              ii1lIi = lli111 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I11l1i + "）";
            } else {
              [500].includes(I11l1i) && lli111 === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? lIIlII.body = JSON.stringify({
                ecyText: ll1ii1({
                  actId: $.activityId,
                  activityId: $.activityId,
                  pin: encodeURIComponent($.secretPin)
                }, $.pinToken, $.te)
              }) : ii1lIi = lli111 + " 请求失败（Response code " + I11l1i + "）";
            }
          }
        } else {
          ii1lIi = lli111 + " 请求失败 => " + (iI1l1I.message || iI1l1I);
        }
      }
      il1II++;
    } else {
      const Il11l1 = iIiIII.getResponseCookie(i1llII, iiI1Ii),
        lliIlI = false;
      let i1il1i = "";
      switch (lli111) {
        case "getMyPing":
          i1il1i = iIiIII.getCookieValue(Il11l1, "LZ_AES_PIN");
          i1il1i ? $.LZ_AES_PIN = i1il1i : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
        case "initPinToken":
          const l1i1i1 = iIiIII.getCookieValue(Il11l1, "pToken");
          if (l1i1i1) {
            $.pinToken = l1i1i1;
          } else {
            console.log("获取 pinToken 失败！");
            $.message.fix("获取[pinToken]失败");
            $.skipRun = true;
            break;
          }
          i1il1i = iIiIII.getCookieValue(Il11l1, "LZ_AES_PIN");
          if (i1il1i) {
            $.LZ_AES_PIN = i1il1i;
          } else {
            console.log("获取 LZ_AES_PIN 失败！");
            $.message.fix("获取[LZ_AES_PIN]失败");
            $.skipRun = true;
            break;
          }
          const lIiiIi = iIiIII.getCookieValue(Il11l1, "te");
          lIiiIi && ($.te = lIiiIi, iiI1Ii += "te=" + $.te + "; ");
          break;
      }
      ["getMyPing", "followGoods", "start"].includes(lli111) && (iiI1Ii = Il11l1);
      i1il1i = iIiIII.getCookieValue(iiI1Ii, "LZ_AES_PIN");
      !i1il1i && $.LZ_AES_PIN && (iiI1Ii += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const i1il1l = iIiIII.getCookieValue(iiI1Ii, "pToken");
      !i1il1l && $.pinToken && (iiI1Ii += "pToken=" + $.pinToken + "; ");
      const Ilii11 = iIiIII.getCookieValue(iiI1Ii, "AUTH_C_USER");
      !Ilii11 && $.secretPin && (iiI1Ii += "AUTH_C_USER=" + $.secretPin + "; ");
      const i1llIl = iIiIII.getCookieValue(iiI1Ii, "te");
      !i1llIl && $.te && (iiI1Ii += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD"].includes(lli111)) {
        if (ill1il) {
          try {
            const lIiiIl = JSON.parse(ill1il);
            lll1lI(lli111, lIiiIl);
            break;
          } catch (Iiiii1) {
            ii1lIi = "❌ " + lli111 + " 接口响应数据解析失败: " + Iiiii1.message;
            console.log("🚫 " + lli111 + " => " + String(ill1il));
            lliIlI && (console.log("\n---------------------------------------------------\n"), console.log(iiI1Ii), console.log("\n---------------------------------------------------\n"));
            il1II++;
          }
        } else {
          if (lli111 === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath)) {
            lIIlII.body = JSON.stringify({
              ecyText: ll1ii1({
                actId: $.activityId,
                activityId: $.activityId,
                pin: encodeURIComponent($.secretPin)
              }, $.pinToken, $.te)
            });
          }
          ii1lIi = "❌ " + lli111 + " 接口无响应数据";
          il1II++;
        }
      } else {
        break;
      }
      I1lll = false;
    }
  }
  if (il1II >= ii1lIl) {
    console.log(ii1lIi);
    I1lll && !["getGiveContent", "shopInfo", "accessLogWithAD", "accessLog"].includes(lli111) && ($.outFlag = true, $.message && $.message.fix(ii1lIi));
  }
}
async function ll1iiI(Il11lI, I11IIi = "POST") {
  if (I11IIi === "POST") {
    return new Promise(async IlliIi => {
      $.post(Il11lI, (ill1iI, Il11ll, Il11li) => {
        IlliIi({
          err: ill1iI,
          res: Il11ll,
          data: Il11li
        });
      });
    });
  } else {
    if (I11IIi === "GET") {
      return new Promise(async i1lIi1 => {
        $.get(Il11lI, (lIlil, iIi1li, l11I11) => {
          i1lIi1({
            err: lIlil,
            res: iIi1li,
            data: l11I11
          });
        });
      });
    } else {
      const ii1II = "不支持的请求方法";
      return {
        err: ii1II,
        res: null,
        data: null
      };
    }
  }
}
function lIIlll(iIi1ll) {
  $.skipRun = true;
  return new Promise(lIlii => {
    let i1lII1 = {
      url: iIi1ll,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: iIi1ll,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(i1lII1, async (lIll1, l11I1I, Il1llI) => {
      try {
        lIll1 ? (l11I1I && typeof l11I1I.statusCode != "undefined" && (l11I1I.statusCode === 403 || l11I1I.statusCode === 493) && (console.log("Response code " + l11I1I.statusCode), $.outFlag = true), console.log(String(lIll1)), console.log("getFirstLZCK 请求失败，请检查网路重试")) : (Il1llI.match(/(活动已经结束)/) && Il1llI.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束或不存在")), l11I1I.status === 200 && (iiI1Ii = iIiIII.getResponseCookie(l11I1I, iiI1Ii), $.skipRun = false));
      } catch (IIIII) {
        $.logErr(IIIII, l11I1I);
      } finally {
        lIlii();
      }
    });
  });
}
function ll1ii1(i1iI1I, llllIi, llllIl) {
  function II1IIi(liilli) {
    liilli = liilli.split("").reverse().join("");
    const ili1l1 = new Uint8Array(12),
      lII1I1 = new TextEncoder().encode(liilli);
    for (let i1ll1I = 0; i1ll1I < lII1I1.length; i1ll1I += 2) {
      let lIliii = lII1I1[i1ll1I] << 5 | lII1I1[i1ll1I + 1] & 255;
      lIliii %= 63;
      ili1l1[i1ll1I >> 1] = lIliii;
    }
    let IIl1I = "";
    for (let lIliil = 0; lIliil < ili1l1.length; lIliil++) {
      IIl1I += (ili1l1[lIliil] + 256).toString(2).slice(1);
    }
    let liilll = "",
      ili1lI = "";
    for (let liilii = 0; liilii < 16; liilii++) {
      if (liilii !== 0) {
        const lil1ll = liilii * 6,
          liilil = IIl1I.substring(lil1ll, lil1ll + 6);
        let liilI = parseInt(liilil, 2);
        const I11i1 = ili1lI.split("");
        for (let iiIili = 0; iiIili < I11i1.length; iiIili++) {
          I11i1[iiIili] === "1" && (liilI = (liilI >> 6 - iiIili | liilI << iiIili) & 63);
        }
        ili1lI = (liilI & 63).toString(2).padStart(6, "0");
      } else {
        ili1lI = IIl1I.substring(0, 6);
      }
      liilll += ili1lI;
    }
    for (let llli = 0; llli < 12; llli++) {
      const i1ll1l = llli * 8;
      ili1l1[llli] = parseInt(liilll.substring(i1ll1l, i1ll1l + 8), 2);
    }
    const iiIilI = btoa(String.fromCharCode.apply(null, ili1l1));
    return iiIilI;
  }
  const II1IIl = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
  let Il1ll1 = Date.now() + parseInt(llllIl);
  typeof i1iI1I != "object" && (i1iI1I = JSON.parse(i1iI1I));
  i1iI1I.nowTime = Il1ll1;
  let I1i1lI = llllIi + Il1ll1;
  const lil1li = I1i1lI.substring(0, I1i1lI.length - 5);
  let ili1i1 = "";
  for (let lllIii = 0; lllIii < lil1li.length; lllIii++) {
    let i1I1i1 = lil1li.charCodeAt(lllIii),
      lIlil1 = i1I1i1 % 10,
      Il1li1 = II1IIl[lIlil1][lllIii];
    ili1i1 += Il1li1;
  }
  var Il1lli = ili1i1.length,
    l11I1i = Math.floor(Il1lli / 24),
    I1i1l1 = "";
  for (var ilIi11 = 0; ilIi11 < 24; ilIi11++) {
    var ll1i1I = (ilIi11 + 1) * l11I1i;
    ilIi11 === 23 && (ll1i1I = Il1lli);
    var Il1lll = ili1i1.substring(ilIi11 * l11I1i, ll1i1I),
      lil1iI = [];
    for (var IIl11 = 0; IIl11 < Il1lll.length; IIl11++) {
      lil1iI.push(Il1lll.charCodeAt(IIl11));
    }
    var iIli = lil1iI.reduce(function (liill1, ili1ii) {
        return liill1 + ili1ii;
      }, 0),
      l11I1l = Math.floor(iIli / lil1iI.length);
    I1i1l1 += String.fromCharCode(l11I1l);
  }
  ili1i1 = I1i1l1;
  const Iilil1 = II1IIi(ili1i1),
    iIi1l1 = iIl111.enc.Utf8.parse(Iilil1),
    llllII = iIl111.enc.Utf8.parse(""),
    llil1l = iIl111.AES.encrypt(JSON.stringify(i1iI1I), iIi1l1, {
      iv: llllII,
      mode: iIl111.mode.ECB,
      padding: iIl111.pad.Pkcs7
    });
  return llil1l.toString();
}
var version_ = "jsjiami.com.v7";