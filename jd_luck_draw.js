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
const iI1Iilil = $.isNode() ? require("./jdCookie") : "",
  l1llIi11 = require("./function/jdCommon"),
  lII1ll1i = require("./function/sendJDNotify"),
  IIllIlI = require("./function/krgetToken"),
  {
    wuxian_savePrize: lIliIlI1
  } = require("./function/krsavePrize"),
  lillllll = require("crypto-js");
let II1i1 = [];
const ilI1i1l = process.env.LUCK_DRAW_URL || "",
  Iliiilii = process.env.LUCK_DRAW_OPENCARD === "true",
  IlI1li1 = process.env.LUCK_DRAW_NOTIFY === "true",
  llIllll1 = process.env.LUCK_DRAW_BREAK === "true",
  illIllii = process.env.LUCK_DRAW_INTERVAL || "";
let i1Ii1li = process.env.LUCK_DRAW_MAX_MISS || "",
  il1iliIl = 7;
process.env.LUCK_DRAW_NUM && process.env.LUCK_DRAW_NUM != 7 && (il1iliIl = process.env.LUCK_DRAW_NUM);
let Il11I1li = true,
  ii1ii1ll = process.env.LUCK_DRAW_Number ? process.env.LUCK_DRAW_Number : "11",
  Il1ii1 = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  IIiIliil = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  iiIlII1i = "",
  llll11Il = "",
  iIilli1l = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(iI1Iilil).forEach(l1I1iiIi => {
    II1i1.push(iI1Iilil[l1I1iiIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else II1i1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(IllIi1i1 => IllIi1i1.cookie)].filter(IIIi1li => !!IIIi1li);
!II1i1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
let I1IlI1il = "",
  liI111l1 = "";
$.whitelist = process.env.LUCK_DRAW_WHITELIST || I1IlI1il;
$.blacklist = process.env.LUCK_DRAW_BLACKLIST || liI111l1;
lii1111();
IIi1iII();
!(async () => {
  if (!ilI1i1l) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const IliiiI1i = l1llIi11.parseUrl(ilI1i1l);
  if (!IliiiI1i) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = ilI1i1l;
  $.activityId = l1llIi11.getUrlParameter(ilI1i1l, "activityId");
  $.hostname = IliiiI1i?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) {
      if (IIiIliil === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
        return;
      } else $.activityMode = "cjhy";
    } else {
      if ($.hostname.includes("lzkj")) {
        if (Il1ii1 === "false") {
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
  IliiiI1i?.["pathname"]["includes"]("lzclient") && ($.activityUrl = $.baseUrl + "/wxDrawActivity/activity/activity?activityId=" + $.activityId);
  try {
    i1Ii1li = parseInt(i1Ii1li);
  } catch {
    i1Ii1li = 0;
  }
  lII1ll1i.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  console.log("\n是否推送通知【" + (IlI1li1 == true ? "通知" : "不通知") + "】 是否开卡 【" + (Iliiilii == true ? "开卡" : "不开卡") + "】");
  console.log("\n当前设定连续 【" + ii1ii1ll + "】 次无抽奖次数跳出");
  console.log("\n当前设定 493 是否继续运行【" + (llIllll1 == true ? "不退出" : "退出") + "】");
  for (let II111111 = 0; II111111 < il1iliIl; II111111++) {
    if (II111111 > ii1ii1ll && Il11I1li) {
      console.log("\n检测到多次无抽奖次数，跳过此次运行\n");
      break;
    }
    $.outFlag = false;
    if (II1i1[II111111]) {
      $.index = II111111 + 1;
      iiIlII1i = II1i1[II111111];
      iIilli1l = II1i1[II111111];
      $.UserName = decodeURIComponent(l1llIi11.getCookieValue(iiIlII1i, "pt_pin"));
      $.UA = l1llIi11.genUA($.UserName);
      $.UUID = l1llIi11.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.te = Math.floor(Math.random() * 9000) + 1000;
      $.message = lII1ll1i.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await l11lllII();
      if ($.outFlag || $.runEnd) break;
    }
  }
  IlI1li1 && lII1ll1i.getMessage() && (lII1ll1i.updateContent(lII1ll1i.content + ("\n【活动地址】：" + $.activityUrl)), await lII1ll1i.push());
})().catch(lIl1ii1 => $.logErr(lIl1ii1)).finally(() => $.done());
async function l11lllII() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.needJoinMember = false;
    $.secretPin = "";
    $.LZ_AES_PIN = "";
    llll11Il = "";
    $.pinToken = "";
    if ($.skipRun || $.runEnd || $.outFlag) return;
    await IliIIIi($.activityUrl);
    await $.wait(500);
    if ($.skipRun) {
      console.log("获取 LZ_TOKEN 失败！");
      $.message.fix("获取[LZ_TOKEN]失败");
      return;
    }
    if ($.outFlag || $.runEnd) return;
    if (!$.venderId) {
      await li1Il1Ii("getSimpleActInfoVo");
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
      $.activityMode === "cjhy" && !$.defenseUrls && ($.defenseUrls = ["/wxScratchActive/start", "/wxPointDrawActivity/start", "/wxPointBlindBox/start", "/wxGashaponActive/start", "/wxDollGrabbing/start", "/wxDrawActivity/start", "/wxShopFollowActivity/getPrize", "/wx/completeInfoActivity/save", "/activity/daily/wx/grabGift", "/sign/wx/signUp", "/sign/sevenDay/wx/signUp", "/wxTeam/saveCaptain", "/wxTeam/saveMember"]);
    }
    $.token = await IIllIlI(iIilli1l, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    if ($.defenseUrls && $.defenseUrls.includes($.drawApiPath)) {
      await li1Il1Ii("initPinToken");
      if ($.runEnd || $.skipRun || $.outFlag) return;
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
    } else {
      await li1Il1Ii("getMyPing");
      if ($.runEnd || $.skipRun || $.outFlag) return;
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
        await li1Il1Ii("accessLogWithAD");
        break;
      case "cjhy":
        await li1Il1Ii("accessLog");
        break;
    }
    await $.wait(500);
    if (Iliiilii) {
      await li1Il1Ii("getOpenCardStatus");
      if ($.outFlag && $.skipRun) return;
      if (!$.isMember) {
        const iIIiiI1I = await l1llIi11.joinShopMember($.venderId);
        iIIiiI1I && (console.log("加入店铺会员成功"), $.isMember = true);
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.activityContent = "";
    await li1Il1Ii("activityContent");
    if (!$.activityContent) {
      console.log("未能获取到活动信息");
      $.message.fix("未能获取活动信息");
      return;
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
    const IIIlill1 = $.activityContent?.["dayMaxDraw"];
    IIIlill1 && $.canDrawTimes > IIIlill1 && ($.canDrawTimes = IIIlill1);
    const lliiII1 = $.activityContent.content,
      i1ll1iii = $.activityContent?.["needFollow"] || false,
      Ii1lllll = $.activityContent?.["hasFollow"] || false;
    if ($.index === 1) {
      let lli1liI1 = "";
      for (let Ii1l1Ii1 = 0; Ii1l1Ii1 < lliiII1.length; Ii1l1Ii1++) {
        const lII11iI = lliiII1[Ii1l1Ii1].name;
        $.prizetype = lliiII1[Ii1l1Ii1].type;
        const li1IiI1 = lliiII1[Ii1l1Ii1].id;
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
            $.prizetype = "[E卡]";
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
        if (li1IiI1 === 0 || $.prizetype === 0) {
          lli1liI1 += "谢谢参与";
          break;
        } else lli1liI1 += "" + lII11iI + $.prizetype, Ii1l1Ii1 !== lliiII1.length - 1 && (lli1liI1 += "，");
      }
      await li1Il1Ii("shopInfo");
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + lli1liI1 + "\n");
      lII1ll1i.updateContent(lII1ll1i.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】" + lli1liI1));
    }
    let ilI1I11l = $.activityContent?.["startTime"],
      liI1li1I = $.activityContent?.["endTime"];
    if ((!ilI1I11l || !liI1li1I) && $.activityContent?.["rule"]) try {
      const iiiIlIii = /抽奖时间：(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) 至 (\d{4}-\d{2}-\d{2} \d{2}:\d{2})；/,
        li1I11li = $.activityContent.rule.match(iiiIlIii);
      li1I11li && li1I11li.length === 3 && (ilI1I11l = new Date(li1I11li[1]).getTime(), liI1li1I = new Date(li1I11li[2]).getTime());
    } catch {}
    const lIiIIIIl = Date.now();
    if (liI1li1I && lIiIIIIl > liI1li1I) {
      const lliII11i = $.time("yyyy-MM-dd HH:mm", liI1li1I);
      console.log("活动已于 " + lliII11i + " 结束，下次早点来吧~");
      $.message.fix("活动已结束，结束时间：" + lliII11i);
      $.runEnd = true;
      return;
    }
    if (ilI1I11l && lIiIIIIl < ilI1I11l) {
      const Illliiii = $.time("yyyy-MM-dd HH:mm", ilI1I11l);
      console.log("活动将在 " + Illliiii + " 开始，晚点再来吧~");
      $.message.fix("活动尚未开始，开始时间：" + Illliiii);
      $.runEnd = true;
      return;
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        i1ll1iii && !Ii1lllll && (await li1Il1Ii("followShop"), $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500));
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        await li1Il1Ii("followShop");
        break;
    }
    if ($.needJoinMember || $.outFlag) return;
    if ($.canDrawTimes === 0 && $.activityType !== 26) {
      await li1Il1Ii("getGiveContent");
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
      if ($.followTaskInfo) {
        const il1ii1 = $.followTaskInfo?.["skuIdsList"],
          IlliilI = $.followTaskInfo?.["followTimes"],
          lIIlllIi = $.followTaskInfo?.["hasGetGiveTimes"],
          illi1ll = $.followTaskInfo?.["giveTimes"],
          lliIliIl = $.followTaskInfo?.["maxGiveTimes"],
          I11liI1i = Math.trunc(il1ii1.length / IlliilI * illi1ll);
        if (lIIlllIi < lliIliIl && lIIlllIi < I11liI1i) {
          let iIIIllI1 = (lliIliIl - lIIlllIi) * IlliilI;
          for (let IIi1iii1 = 0; IIi1iii1 < il1ii1.length; IIi1iii1++) {
            $.skuId = il1ii1[IIi1iii1];
            await li1Il1Ii("followGoods");
            $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
            if (IIi1iii1 === iIIIllI1 - 1) break;
          }
          $.activityContent = "";
          await li1Il1Ii("activityContent");
          if (!$.activityContent) {
            console.log("未能获取到活动信息");
            $.message.fix("未能获取活动信息");
            return;
          }
          $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
          const Il1ii11 = $.activityContent?.["dayMaxDraw"] || 0;
          $.canDrawTimes > Il1ii11 && ($.canDrawTimes = Il1ii11);
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
    let iil1I1 = $.activityMode === "cjhy" ? 1000 : 500;
    if (illIllii) try {
      const IIiiIll = parseInt(illIllii) * 1000;
      iil1I1 = IIiiIll;
    } catch {
      $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
    }
    $.drawMissTimes = 0;
    for (let ll1llll = 1; $.canDrawTimes--; ll1llll++) {
      $.drawError = "";
      await li1Il1Ii("start");
      if ($.drawError) {
        $.drawError.indexOf("火爆") > -1 && ($.canDrawTimes += 1);
        $.activityMode === "cjhy" && ($.drawError.indexOf("擦肩") > -1 || $.drawError.indexOf("缓存") > -1) && ($.canDrawTimes += 1);
        if (i1Ii1li && $.drawMissTimes >= i1Ii1li) break;
        if ($.drawStop || $.needJoinMember || $.runEnd) break;
      }
      if ($.canDrawTimes <= 0) break;
      if ($.drawTimes >= 8 && [26, 124, 125, 128, 129].includes($.activityType)) {
        console.log("\n抽奖太多次了，下次再继续吧~");
        $.message.insert("抽奖太多次了，下次再抽");
        break;
      }
      await $.wait(iil1I1);
    }
  } catch (liIllil) {
    console.log("❌ 脚本运行遇到了错误\n" + liIllil);
  }
}
async function liiilIiI(iIiillii, iiiiilIl) {
  try {
    switch (iIiillii) {
      case "getMyPing":
        if (iiiiilIl.result === true && iiiiilIl.data) $.secretPin = iiiiilIl.data?.["secretPin"], $.nickname = iiiiilIl.data?.["nickname"];else {
          if (iiiiilIl.errorMessage) {
            console.log(iIiillii + " " + iiiiilIl.errorMessage);
            $.message.fix(iiiiilIl.errorMessage);
          } else console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
        }
        break;
      case "initPinToken":
        if (iiiiilIl.result === true && iiiiilIl.data) $.secretPin = iiiiilIl.data?.["secretPin"], $.nickname = iiiiilIl.data?.["nickname"];else iiiiilIl.errorMessage ? (console.log(iIiillii + " " + iiiiilIl.errorMessage), $.message.fix(iiiiilIl.errorMessage)) : console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
        break;
      case "getSimpleActInfoVo":
        if (iiiiilIl.result === true && iiiiilIl.data) $.venderId = iiiiilIl.data?.["venderId"], $.shopId = iiiiilIl.data?.["shopId"], $.activityType = iiiiilIl.data?.["activityType"];else iiiiilIl.errorMessage ? console.log(iIiillii + " " + iiiiilIl.errorMessage) : console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
        break;
      case "getDefenseUrls":
        if (iiiiilIl.result === true && iiiiilIl.data) $.defenseUrls = iiiiilIl?.["data"];else iiiiilIl.errorMessage ? console.log(iIiillii + " " + iiiiilIl.errorMessage) : console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
      case "getOpenCardStatus":
        if (iiiiilIl.result === true) {
          if (iiiiilIl.data) {
            if (iiiiilIl.data.hasOwnProperty("openCard")) $.isMember = iiiiilIl.data.openCard;else iiiiilIl.data.hasOwnProperty("openedCard") && ($.isMember = iiiiilIl.data.openedCard);
            if (typeof $.isMember === "number") $.isMember = $.isMember === 1;else typeof $.isMember === "undefined" && ($.isMember = false);
          } else $.isMember = true;
        } else {
          if (iiiiilIl.errorMessage) iiiiilIl.errorMessage.includes("擦肩") && !iiiiilIl?.["data"] ? ($.skipRun = true, $.message.fix("账号已黑"), console.log("账号已黑，下次别跑了~")) : console.log(iIiillii + " " + iiiiilIl.errorMessage);else {
            $.isMember = false;
            console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
          }
        }
        break;
      case "activityContent":
        if (iiiiilIl.result === true && iiiiilIl.data) $.activityContent = iiiiilIl.data;else {
          if (iiiiilIl.errorMessage) {
            for (let iilill of ["未开始", "结束", "不存在", "不在"]) {
              if (iiiiilIl.errorMessage.includes(iilill)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(iIiillii + " " + iiiiilIl.errorMessage);
            $.message.fix(iiiiilIl.errorMessage);
          } else console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
        }
        break;
      case "shopInfo":
        if (iiiiilIl.result === true && iiiiilIl.data) $.shopName = iiiiilIl?.["data"]?.["shopName"];else iiiiilIl.errorMessage ? console.log("" + (iiiiilIl.errorMessage || "")) : console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
        break;
      case "followShop":
        if (iiiiilIl.result === true) {} else {
          if (iiiiilIl.errorMessage) {
            ["会员", "开卡"].some(II1liiI => iiiiilIl.errorMessage.includes(II1liiI)) && ($.needJoinMember = true, $.message.fix("活动仅限店铺会员参与"));
            console.log("" + (iiiiilIl.errorMessage || ""));
          } else console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
        }
        break;
      case "getGiveContent":
        if (iiiiilIl.result === true && iiiiilIl.data) $.followTaskInfo = iiiiilIl.data?.["follow"];else iiiiilIl.errorMessage ? console.log("" + (iiiiilIl.errorMessage || "")) : console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
        break;
      case "followGoods":
        if (iiiiilIl.result === true) console.log("做 \"关注商品\" 任务 >> 任务完成");else iiiiilIl.errorMessage ? console.log("做 \"关注商品\" 任务 >> 任务失败（" + iiiiilIl.errorMessage + "）") : console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
        break;
      case "start":
        if (iiiiilIl.result === true && iiiiilIl.data) {
          Il11I1li = false;
          $.drawTimes += 1;
          $.canDrawTimes = iiiiilIl.data.canDrawTimes;
          const IIiI1Ii = iiiiilIl.data.drawInfo;
          if (IIiI1Ii) switch (IIiI1Ii.type) {
            case 4:
              switch ($.activityType) {
                case 3:
                case 4:
                case 11:
                case 12:
                case 13:
                  console.log("🔁 再来一次"), $.canDrawTimes += 1;
                  break;
                case 26:
                case 124:
                case 125:
                case 128:
                case 129:
                  console.log("💨 空气"), $.message.insert("空气💨");
                  break;
              }
              break;
            case 6:
              console.log("🎉 " + IIiI1Ii.name + " 🐶"), $.message.insert(IIiI1Ii.name + "🐶");
              break;
            case 7:
              const ii1lilll = iiiiilIl.data.addressId,
                iIl1lllI = IIiI1Ii.name;
              console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + iIl1lllI), console.log("参考价值：" + IIiI1Ii.priceInfo + "（元）");
              if (IIiI1Ii.showImage) console.log("预览图片：" + IIiI1Ii.showImage);
              const Illlilll = {
                  "baseUrl": $.baseUrl,
                  "cookie": llll11Il,
                  "ua": $.UA,
                  "activityId": $.activityId,
                  "activityType": $.activityType,
                  "venderId": [$.venderId, $.shopId],
                  "secretPin": $.secretPin,
                  "prizeName": iIl1lllI,
                  "generateId": ii1lilll
                },
                lIl11ili = await lIliIlI1(Illlilll);
              !IlI1li1 && lIl11ili && (await lII1ll1i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iIl1lllI + "，已成功自动登记收货地址\n\n" + $.activityUrl));
              $.message.insert(iIl1lllI + "(" + (lIl11ili ? "已填地址" : "未填地址") + ")🎁");
              break;
            case 8:
              console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
              break;
            case 9:
              console.log("🗑️ " + IIiI1Ii.name + " 🎟️"), $.message.insert(IIiI1Ii.name + "🎟️");
              break;
            case 13:
            case 14:
            case 15:
              console.log("🎉 恭喜获得" + IIiI1Ii.name + " 🎁");
              !IlI1li1 && (await lII1ll1i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + IIiI1Ii.name + "\n\n" + $.activityUrl));
              $.message.insert(IIiI1Ii.name + "🎁");
              break;
            case 16:
              console.log("🎉 " + IIiI1Ii.priceInfo + " 🧧"), $.message.insert(IIiI1Ii.priceInfo + "红包🧧");
              break;
            default:
              IIiI1Ii.name.includes("券") ? (console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️")) : (console.log("获得：" + IIiI1Ii.name), $.message.insert("" + IIiI1Ii.name));
              break;
          } else $.drawMissTimes += 1, console.log("💨 空气"), $.message.insert("空气💨");
        } else iiiiilIl.errorMessage ? ($.drawError = iiiiilIl.errorMessage, ["上限", "不足", "超过", "非法操作", "明天"].some(I1iI11i => $.drawError.includes(I1iI11i)) && ($.drawStop = true, console.log($.drawError), $.message.insert($.drawError)), ["未开始", "结束", "不存在", "不在"].some(lll1Iiil => $.drawError.includes(lll1Iiil)) && ($.runEnd = true, $.message.fix($.drawError)), ["会员", "开卡"].some(IIII11ll => $.drawError.includes(IIII11ll)) && ($.needJoinMember = true, console.log($.drawError), $.message.fix($.drawError)), !["火爆", "擦肩", "缓存", "数据忙"].some(i1II1I1 => $.drawError.includes(i1II1I1)) && !$.drawStop && !$.needJoinMember && console.log($.drawError || "")) : console.log("❓" + iIiillii + " " + JSON.stringify(iiiiilIl));
        break;
    }
  } catch (l11lii1I) {
    console.log("❌ 未能正确处理 " + iIiillii + " 请求响应 " + (l11lii1I.message || l11lii1I));
  }
}
async function li1Il1Ii(i1111lII) {
  if ($.runEnd || $.outFlag) return;
  let IiIllI = "",
    Il11ili = "",
    Iii1l1li = "POST";
  switch (i1111lII) {
    case "getMyPing":
      IiIllI = $.baseUrl + "/customer/getMyPing", Il11ili = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      IiIllI = $.baseUrl + "/customer/getSimpleActInfoVo", Il11ili = "activityId=" + $.activityId;
      break;
    case "getDefenseUrls":
      Iii1l1li = "GET", IiIllI = $.baseUrl + "/customer/getDefenseUrls";
      break;
    case "initPinToken":
      Iii1l1li = "GET", IiIllI = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now();
      break;
    case "accessLog":
      IiIllI = $.baseUrl + "/common/accessLog", Il11ili = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      IiIllI = $.baseUrl + "/common/accessLogWithAD", Il11ili = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
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
              IiIllI = $.baseUrl + "/wxCommonInfo/getActMemberInfo", Il11ili = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              IiIllI = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", Il11ili = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
              break;
          }
          break;
        case 26:
          switch ($.activityMode) {
            case "lzkj":
              IiIllI = $.baseUrl + "/crmCard/common/coupon/getOpenCardStatus", Il11ili = "venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              IiIllI = $.baseUrl + "/common/joinConfig/check", Il11ili = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
              break;
          }
          break;
        case 124:
        case 125:
        case 128:
        case 129:
          IiIllI = $.baseUrl + "/common/joinConfig/check", Il11ili = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
          break;
      }
      break;
    case "activityContent":
      let il1IlI = "";
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          il1IlI = "wxDrawActivity/activityContent";
          break;
        case 26:
          il1IlI = "wxPointDrawActivity/activityContent";
          break;
        case 124:
          il1IlI = "wxScratchActive/activityContent";
          break;
        case 125:
          il1IlI = "wxPointBlindBox/activityContent";
          break;
        case 128:
          il1IlI = "wxGashaponActive/activityContent";
          break;
        case 129:
          il1IlI = "wxDollGrabbing/activityContent";
          break;
      }
      IiIllI = $.baseUrl + "/" + il1IlI, Il11ili = "activityId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    case "shopInfo":
      IiIllI = $.baseUrl + "/wxDrawActivity/shopInfo", Il11ili = "activityId=" + $.activityId;
      break;
    case "followShop":
      switch ($.activityMode) {
        case "lzkj":
          IiIllI = $.baseUrl + "/wxActionCommon/followShop", Il11ili = "userId=" + $.venderId + "&buyerNick=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
        case "cjhy":
          IiIllI = $.baseUrl + "/wxActionCommon/newFollowShop", Il11ili = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
      }
      break;
    case "getGiveContent":
      IiIllI = $.baseUrl + "/wxDrawActivity/getGiveContent", Il11ili = "pin=" + $.formatPin + "&activityId=" + $.activityId;
      break;
    case "followGoods":
      IiIllI = $.baseUrl + "/wxDrawActivity/follow", Il11ili = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&skuId=" + $.skuId;
      break;
    case "start":
      IiIllI = "" + $.baseUrl + $.drawApiPath;
      $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? Il11ili = JSON.stringify({
        "ecyText": ill1i1il({
          "actId": $.activityId,
          "activityId": $.activityId,
          "pin": encodeURIComponent($.secretPin)
        }, $.pinToken, $.te)
      }) : Il11ili = "activityId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    default:
      console.log("❌ 未知请求 " + i1111lII);
      return;
  }
  const IillI1li = {
    "url": IiIllI,
    "headers": {
      "Origin": $.origin,
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": i1111lII === "start" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? "application/json" : "application/x-www-form-urlencoded",
      "Cookie": llll11Il.trim(),
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      "Referer": $.activityUrl
    },
    "body": Il11ili,
    "timeout": 30000
  };
  Iii1l1li === "GET" && (delete IillI1li.body, delete IillI1li.headers["Content-Type"]);
  const Il1iIiil = 5;
  let lI1i1IlI = 0,
    IlIii11i = null,
    li1i11I = false;
  while (lI1i1IlI < Il1iIiil) {
    lI1i1IlI > 0 && (await $.wait(1000));
    const {
      err: I1lll11l,
      res: li1l11I,
      data: lIiI1I
    } = await l111ii(IillI1li, Iii1l1li);
    if (I1lll11l) {
      if (typeof I1lll11l === "string" && I1lll11l.includes("Timeout awaiting 'request'")) {
        IlIii11i = i1111lII + " 请求超时，请检查网络重试";
      } else {
        const iiIiiiii = li1l11I?.["statusCode"];
        if (iiIiiiii) {
          if ([403, 493].includes(iiIiiiii)) IlIii11i = i1111lII + " 请求失败，IP被限制（Response code " + iiIiiiii + "）", li1i11I = true;else {
            if ([400, 404].includes(iiIiiiii)) IlIii11i = i1111lII + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iiIiiiii + "）";else [500].includes(iiIiiiii) && i1111lII === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? IillI1li.body = JSON.stringify({
              "ecyText": ill1i1il({
                "actId": $.activityId,
                "activityId": $.activityId,
                "pin": encodeURIComponent($.secretPin)
              }, $.pinToken, $.te)
            }) : IlIii11i = i1111lII + " 请求失败（Response code " + iiIiiiii + "）";
          }
        } else IlIii11i = i1111lII + " 请求失败 => " + (I1lll11l.message || I1lll11l);
      }
      lI1i1IlI++;
    } else {
      const I1llili = l1llIi11.getResponseCookie(li1l11I, llll11Il),
        i1l111ii = false;
      i1l111ii && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + i1111lII + " 响应Body => " + (lIiI1I || "无") + "\n"), console.log("🔧 " + i1111lII + " 响应Cookie => " + (I1llili || "无") + "\n"), console.log("🔧 " + i1111lII + " 请求参数"), console.log(IillI1li), console.log("\n---------------------------------------------------\n"));
      let Iiii1il1 = "";
      switch (i1111lII) {
        case "getMyPing":
          Iiii1il1 = l1llIi11.getCookieValue(I1llili, "LZ_AES_PIN");
          Iiii1il1 ? $.LZ_AES_PIN = Iiii1il1 : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
        case "initPinToken":
          const iIli1iI = l1llIi11.getCookieValue(I1llili, "pToken");
          if (iIli1iI) {
            $.pinToken = iIli1iI;
          } else {
            console.log("获取 pinToken 失败！");
            $.message.fix("获取[pinToken]失败");
            $.skipRun = true;
            break;
          }
          Iiii1il1 = l1llIi11.getCookieValue(I1llili, "LZ_AES_PIN");
          if (Iiii1il1) $.LZ_AES_PIN = Iiii1il1;else {
            console.log("获取 LZ_AES_PIN 失败！");
            $.message.fix("获取[LZ_AES_PIN]失败");
            $.skipRun = true;
            break;
          }
          const IIi11I11 = l1llIi11.getCookieValue(I1llili, "te");
          IIi11I11 && ($.te = IIi11I11, llll11Il += "te=" + $.te + "; ");
          break;
      }
      ["getMyPing", "followGoods", "start"].includes(i1111lII) && (llll11Il = I1llili);
      Iiii1il1 = l1llIi11.getCookieValue(llll11Il, "LZ_AES_PIN");
      if (!Iiii1il1 && $.LZ_AES_PIN) {
        llll11Il += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ";
      }
      const ili1iI1i = l1llIi11.getCookieValue(llll11Il, "pToken");
      !ili1iI1i && $.pinToken && (llll11Il += "pToken=" + $.pinToken + "; ");
      const iliI1 = l1llIi11.getCookieValue(llll11Il, "AUTH_C_USER");
      !iliI1 && $.secretPin && (llll11Il += "AUTH_C_USER=" + $.secretPin + "; ");
      const lI1II1Il = l1llIi11.getCookieValue(llll11Il, "te");
      !lI1II1Il && $.te && (llll11Il += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD"].includes(i1111lII)) {
        if (lIiI1I) try {
          const ilIi1lli = JSON.parse(lIiI1I);
          liiilIiI(i1111lII, ilIi1lli);
          break;
        } catch (l1Ill1li) {
          IlIii11i = "❌ " + i1111lII + " 接口响应数据解析失败: " + l1Ill1li.message;
          console.log("🚫 " + i1111lII + " => " + String(lIiI1I));
          i1l111ii && (console.log("\n---------------------------------------------------\n"), console.log(llll11Il), console.log("\n---------------------------------------------------\n"));
          lI1i1IlI++;
        } else i1111lII === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) && (IillI1li.body = JSON.stringify({
          "ecyText": ill1i1il({
            "actId": $.activityId,
            "activityId": $.activityId,
            "pin": encodeURIComponent($.secretPin)
          }, $.pinToken, $.te)
        })), IlIii11i = "❌ " + i1111lII + " 接口无响应数据", lI1i1IlI++;
      } else {
        break;
      }
      li1i11I = false;
    }
  }
  lI1i1IlI >= Il1iIiil && (console.log(IlIii11i), li1i11I && !["getGiveContent", "shopInfo", "accessLogWithAD", "accessLog"].includes(i1111lII) && !llIllll1 && ($.outFlag = true, $.message && $.message.fix(IlIii11i)));
}
async function l111ii(IlII1l1l, llllilIl = "POST") {
  if (llllilIl === "POST") return new Promise(async lii11lI1 => {
    $.post(IlII1l1l, (l1Illi11, iiiiiiii, iiiiI1) => {
      lii11lI1({
        "err": l1Illi11,
        "res": iiiiiiii,
        "data": iiiiI1
      });
    });
  });else {
    if (llllilIl === "GET") return new Promise(async i1iI1IlI => {
      $.get(IlII1l1l, (lIIiI1ll, IliIIiII, I11IiII1) => {
        i1iI1IlI({
          "err": lIIiI1ll,
          "res": IliIIiII,
          "data": I11IiII1
        });
      });
    });else {
      const IlII1iI = "不支持的请求方法";
      return {
        "err": IlII1iI,
        "res": null,
        "data": null
      };
    }
  }
}
function IliIIIi(IlIil11I) {
  return $.skipRun = true, new Promise(i11Il111 => {
    let I1lI1i1I = {
      "url": IlIil11I,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": IlIil11I,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(I1lI1i1I, async (lii1IiiI, iIIlil1I, Iii1I11i) => {
      try {
        if (lii1IiiI) iIIlil1I && typeof iIIlil1I.statusCode != "undefined" && iIIlil1I.statusCode === 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), !llIllll1 && ($.outFlag = true)), console.log(String(lii1IiiI)), console.log("getFirstLZCK 请求失败，请检查网路重试");else {
          Iii1I11i.match(/(活动已经结束)/) && Iii1I11i.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束或不存在"));
          if (iIIlil1I.status === 200) {
            llll11Il = l1llIi11.getResponseCookie(iIIlil1I, llll11Il);
            $.skipRun = false;
          }
        }
      } catch (lll1Il1I) {
        $.logErr(lll1Il1I, iIIlil1I);
      } finally {
        i11Il111();
      }
    });
  });
}
function ill1i1il(I1111i1, lii11Ill, I1Il1l) {
  function IlIIIilI(ill1l1li) {
    ill1l1li = ill1l1li.split("").reverse().join("");
    const iIli1I11 = new Uint8Array(12),
      ll11IliI = new TextEncoder().encode(ill1l1li);
    for (let lilIliII = 0; lilIliII < ll11IliI.length; lilIliII += 2) {
      let Ilil1lii = ll11IliI[lilIliII] << 5 | ll11IliI[lilIliII + 1] & 255;
      Ilil1lii %= 63;
      iIli1I11[lilIliII >> 1] = Ilil1lii;
    }
    let II1ii = "";
    for (let lIii1111 = 0; lIii1111 < iIli1I11.length; lIii1111++) {
      II1ii += (iIli1I11[lIii1111] + 256).toString(2).slice(1);
    }
    let llllii1I = "",
      l1lIIIiI = "";
    for (let II1iI1 = 0; II1iI1 < 16; II1iI1++) {
      if (II1iI1 !== 0) {
        const li1iIII1 = II1iI1 * 6,
          lilIii1 = II1ii.substring(li1iIII1, li1iIII1 + 6);
        let l1lIl1li = parseInt(lilIii1, 2);
        const l1IiIi1l = l1lIIIiI.split("");
        for (let I1I1III1 = 0; I1I1III1 < l1IiIi1l.length; I1I1III1++) {
          l1IiIi1l[I1I1III1] === "1" && (l1lIl1li = (l1lIl1li >> 6 - I1I1III1 | l1lIl1li << I1I1III1) & 63);
        }
        l1lIIIiI = (l1lIl1li & 63).toString(2).padStart(6, "0");
      } else {
        l1lIIIiI = II1ii.substring(0, 6);
      }
      llllii1I += l1lIIIiI;
    }
    for (let ilIIiill = 0; ilIIiill < 12; ilIIiill++) {
      const iIiiII = ilIIiill * 8;
      iIli1I11[ilIIiill] = parseInt(llllii1I.substring(iIiiII, iIiiII + 8), 2);
    }
    const IlilIIll = btoa(String.fromCharCode.apply(null, iIli1I11));
    return IlilIIll;
  }
  const i1lilI1i = ["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"];
  let i1li1lII = Date.now() + parseInt(I1Il1l);
  typeof I1111i1 != "object" && (I1111i1 = JSON.parse(I1111i1));
  I1111i1.nowTime = i1li1lII;
  let IIlI1Il1 = lii11Ill + i1li1lII;
  const lIi1iIlI = IIlI1Il1.substring(0, IIlI1Il1.length - 5);
  let iIlI1lII = "";
  for (let l1I11III = 0; l1I11III < lIi1iIlI.length; l1I11III++) {
    let ii1IillI = lIi1iIlI.charCodeAt(l1I11III),
      IiiiI11i = ii1IillI % 10,
      IiIlIli = i1lilI1i[IiiiI11i][l1I11III];
    iIlI1lII += IiIlIli;
  }
  var lIIli = iIlI1lII.length,
    ili1Ii1I = Math.floor(lIIli / 24),
    II11Iiil = "";
  for (var lliiiI1i = 0; lliiiI1i < 24; lliiiI1i++) {
    var lllliIIl = (lliiiI1i + 1) * ili1Ii1I;
    lliiiI1i === 23 && (lllliIIl = lIIli);
    var llIiiII = iIlI1lII.substring(lliiiI1i * ili1Ii1I, lllliIIl),
      Il1IiI1I = [];
    for (var Iil1iiIl = 0; Iil1iiIl < llIiiII.length; Iil1iiIl++) {
      Il1IiI1I.push(llIiiII.charCodeAt(Iil1iiIl));
    }
    var I1l1l11 = Il1IiI1I.reduce(function (liii1l11, liiillIl) {
        return liii1l11 + liiillIl;
      }, 0),
      iIIi1Iil = Math.floor(I1l1l11 / Il1IiI1I.length);
    II11Iiil += String.fromCharCode(iIIi1Iil);
  }
  iIlI1lII = II11Iiil;
  const lllIl1li = IlIIIilI(iIlI1lII),
    i11I1i1 = lillllll.enc.Utf8.parse(lllIl1li),
    ii11l1lI = lillllll.enc.Utf8.parse(""),
    i1lI1i1i = lillllll.AES.encrypt(JSON.stringify(I1111i1), i11I1i1, {
      "iv": ii11l1lI,
      "mode": lillllll.mode.ECB,
      "padding": lillllll.pad.Pkcs7
    });
  return i1lI1i1i.toString();
}
function IIi1iII() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const liii1li1 = Array.from(new Set($.blacklist.split("&")));
  console.log(liii1li1.join("&") + "\n");
  let II1ilI = liii1li1,
    Il1lllII = [],
    l1l1lIll = false;
  for (let iIIliI1 = 0; iIIliI1 < II1i1.length; iIIliI1++) {
    let ililliI = decodeURIComponent(II1i1[iIIliI1].match(/pt_pin=([^; ]+)(?=;?)/) && II1i1[iIIliI1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ililliI) break;
    let illIiIiI = false;
    for (let iiil11ll of II1ilI) {
      if (iiil11ll && iiil11ll == ililliI) {
        illIiIiI = true;
        break;
      }
    }
    !illIiIiI && (l1l1lIll = true, Il1lllII.splice(iIIliI1, -1, II1i1[iIIliI1]));
  }
  if (l1l1lIll) II1i1 = Il1lllII;
}
function IIlIilI1(l1II1IiI, iIi1l1lI) {
  iIi1l1lI != 0 && l1II1IiI.unshift(l1II1IiI.splice(iIi1l1lI, 1)[0]);
}
function lii1111() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(II1i1, II1i1));
    return;
  }
  console.log("当前已设置白名单：");
  const li1l1ll1 = Array.from(new Set($.whitelist.split("&")));
  console.log(li1l1ll1.join("&") + "\n");
  let IlIl1l1i = [],
    llIIl1lI = li1l1ll1;
  for (let iiIII111 in II1i1) {
    let lII1I1ii = decodeURIComponent(II1i1[iiIII111].match(/pt_pin=([^; ]+)(?=;?)/) && II1i1[iiIII111].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (llIIl1lI.includes(lII1I1ii)) {
      IlIl1l1i.push(II1i1[iiIII111]);
    }
  }
  helpCookiesArr = IlIl1l1i;
  if (llIIl1lI.length > 1) {
    for (let IIilii1i in llIIl1lI) {
      let il1iIi11 = llIIl1lI[llIIl1lI.length - 1 - IIilii1i];
      if (!il1iIi11) continue;
      for (let IIl1lI1l in helpCookiesArr) {
        let llilIIIl = decodeURIComponent(helpCookiesArr[IIl1lI1l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[IIl1lI1l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (il1iIi11 == llilIIIl) {
          IIlIilI1(helpCookiesArr, IIl1lI1l);
        }
      }
    }
  }
}