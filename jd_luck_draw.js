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

2023/9/3 大量更新

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺抽奖通用活动
1 1 1 1 * jd_luck_draw.js, tag=店铺抽奖通用活动, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺抽奖（超级无线/超级会员）');
const lII111Ii = $.isNode() ? require("./jdCookie") : "",
  IIl1I1ii = require("./function/jdCommon"),
  ilIillii = require("./function/sendJDNotify"),
  lilIilI1 = require("./function/krh5st"),
  IiIiIiIi = require("./function/krgetToken"),
  {
    wuxian_savePrize: IiI1i1ll
  } = require("./function/krsavePrize");
let iII1lli1 = [];
const Ililllii = process.env.LUCK_DRAW_URL || "",
  liI1I1I = process.env.LUCK_DRAW_OPENCARD === "true",
  lI1iIIl1 = process.env.LUCK_DRAW_NOTIFY === "true",
  i1iil11I = process.env.LUCK_DRAW_BREAK === "true",
  iil1IilI = process.env.LUCK_DRAW_INTERVAL || "";
let IlI1lIli = process.env.LUCK_DRAW_MAX_MISS || "",
  liiliiIl = 7;
process.env.LUCK_DRAW_NUM && process.env.LUCK_DRAW_NUM != 7 && (liiliiIl = process.env.LUCK_DRAW_NUM);
let IiliiiI1 = true,
  liil1lII = process.env.LUCK_DRAW_Number ? process.env.LUCK_DRAW_Number : "11",
  l111lI = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  illl1iil = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  iI1I1l1l = "",
  I1111Ii1 = "",
  il1IlI11 = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(lII111Ii).forEach(ili1I1li => {
    iII1lli1.push(lII111Ii[ili1I1li]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iII1lli1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(ll1iiill => ll1iiill.cookie)].filter(l1llilI1 => !!l1llilI1);
!iII1lli1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
let i1llliIl = "",
  Il1i11ll = "";
$.whitelist = process.env.LUCK_DRAW_WHITELIST || i1llliIl;
$.blacklist = process.env.LUCK_DRAW_BLACKLIST || Il1i11ll;
iIlIilil();
lllllII();
!(async () => {
  if (!Ililllii) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const i11111iI = IIl1I1ii.parseUrl(Ililllii);
  if (!i11111iI) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = Ililllii;
  $.activityId = IIl1I1ii.getUrlParameter(Ililllii, "activityId");
  $.hostname = i11111iI?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) {
      if (illl1iil === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
        return;
      } else $.activityMode = "cjhy";
    } else {
      if ($.hostname.includes("lzkj")) {
        if (l111lI === "false") {
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
  i11111iI?.["pathname"]["includes"]("lzclient") && ($.activityUrl = $.baseUrl + "/wxDrawActivity/activity/activity?activityId=" + $.activityId);
  try {
    IlI1lIli = parseInt(IlI1lIli);
  } catch {
    IlI1lIli = 0;
  }
  ilIillii.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  console.log("\n是否推送通知【" + (lI1iIIl1 == true ? "通知" : "不通知") + "】 是否开卡 【" + (liI1I1I == true ? "开卡" : "不开卡") + "】");
  console.log("\n当前设定连续 【" + liil1lII + "】 次无抽奖次数跳出");
  console.log("\n当前设定 493 是否继续运行【" + (i1iil11I == true ? "不退出" : "退出") + "】");
  for (let IilIiIi1 = 0; IilIiIi1 < liiliiIl; IilIiIi1++) {
    if (IilIiIi1 > liil1lII && IiliiiI1) {
      console.log("\n检测到多次无抽奖次数，跳过此次运行\n");
      break;
    }
    $.outFlag = false;
    if (iII1lli1[IilIiIi1]) {
      $.index = IilIiIi1 + 1;
      iI1I1l1l = iII1lli1[IilIiIi1];
      il1IlI11 = iII1lli1[IilIiIi1];
      $.UserName = decodeURIComponent(IIl1I1ii.getCookieValue(iI1I1l1l, "pt_pin"));
      $.UA = IIl1I1ii.genUA($.UserName);
      $.message = ilIillii.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await i1liIiII();
      if ($.outFlag || $.runEnd) break;
    }
  }
  lI1iIIl1 && ilIillii.getMessage() && (ilIillii.updateContent(ilIillii.content + ("\n【活动地址】：" + $.activityUrl)), await ilIillii.push());
})().catch(i1I1iII1 => $.logErr(i1I1iII1)).finally(() => $.done());
async function i1liIiII() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.needJoinMember = false;
    $.secretPin = "";
    $.LZ_AES_PIN = "";
    I1111Ii1 = "";
    if ($.skipRun || $.runEnd || $.outFlag) return;
    await illllIII($.activityUrl);
    await $.wait(500);
    if ($.skipRun) {
      console.log("获取 LZ_TOKEN 失败！");
      $.message.fix("获取[LZ_TOKEN]失败");
      return;
    }
    if ($.outFlag || $.runEnd) return;
    if ($.index === 1) {
      await lliIi1ii("getSimpleActInfoVo");
      if (!$.venderId) {
        $.runEnd = true;
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        return;
      }
      if (!$.activityType) {
        $.runEnd = true;
        console.log("getSimpleActInfoVo 未能获取活动类型");
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
    }
    $.token = await IiIiIiIi(il1IlI11, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await lliIi1ii("getMyPing");
    if ($.runEnd || $.outFlag) return;
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    $.LZ_AES_PIN = IIl1I1ii.getCookieValue(I1111Ii1, "LZ_AES_PIN");
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
        await lliIi1ii("accessLogWithAD");
        break;
      case "cjhy":
        await lliIi1ii("accessLog");
        break;
    }
    await $.wait(500);
    if (liI1I1I) {
      await lliIi1ii("getOpenCardStatus");
      if ($.outFlag && $.skipRun) return;
      if (!$.isMember) {
        $.errorJoinShop = "";
        $.joinVenderId = $.venderId;
        for (let i11l1iI = 0; i11l1iI < Array(3).length; i11l1iI++) {
          if (i11l1iI > 0) console.log("第" + i11l1iI + "次 重新入会");
          await ll1i1i();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
        }
        $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("❌ 入会失败"), $.skipRun = true);
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.activityContent = "";
    await lliIi1ii("activityContent");
    if (!$.activityContent) {
      console.log("未能获取到活动信息");
      $.message.fix("未能获取活动信息");
      return;
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
    const IIliIl1I = $.activityContent?.["dayMaxDraw"];
    IIliIl1I && $.canDrawTimes > IIliIl1I && ($.canDrawTimes = IIliIl1I);
    const i1i1iiIi = $.activityContent.content,
      li1lIlll = $.activityContent?.["needFollow"] || false,
      II1l1li = $.activityContent?.["hasFollow"] || false;
    if ($.index === 1) {
      let II1lilil = "";
      for (let l1lI1i1l = 0; l1lI1i1l < i1i1iiIi.length; l1lI1i1l++) {
        const ilII1ii1 = i1i1iiIi[l1lI1i1l].name;
        $.prizetype = i1i1iiIi[l1lI1i1l].type;
        const II1I11Ii = i1i1iiIi[l1lI1i1l].id;
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
        if (II1I11Ii === 0 || $.prizetype === 0) {
          II1lilil += "谢谢参与";
          break;
        } else II1lilil += "" + ilII1ii1 + $.prizetype, l1lI1i1l !== i1i1iiIi.length - 1 && (II1lilil += "，");
      }
      await lliIi1ii("shopInfo");
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
      console.log(($.shopName && "店铺名称：" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + II1lilil + "\n");
      ilIillii.updateContent(ilIillii.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】" + II1lilil));
    }
    let iIiIli1l = $.activityContent?.["startTime"],
      iIilI11 = $.activityContent?.["endTime"];
    if ((!iIiIli1l || !iIilI11) && $.activityContent?.["rule"]) {
      try {
        const i1il1iIi = /抽奖时间：(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) 至 (\d{4}-\d{2}-\d{2} \d{2}:\d{2})；/,
          I1llIiii = $.activityContent.rule.match(i1il1iIi);
        I1llIiii && I1llIiii.length === 3 && (iIiIli1l = new Date(I1llIiii[1]).getTime(), iIilI11 = new Date(I1llIiii[2]).getTime());
      } catch {}
    }
    const iI1Ii1il = Date.now();
    if (iIilI11 && iI1Ii1il > iIilI11) {
      const IiIl1Il1 = $.time("yyyy-MM-dd HH:mm", iIilI11);
      console.log("活动已于 " + IiIl1Il1 + " 结束，下次早点来吧~");
      $.message.fix("活动已结束，结束时间：" + IiIl1Il1);
      $.runEnd = true;
      return;
    }
    if (iIiIli1l && iI1Ii1il < iIiIli1l) {
      const lIIiIIii = $.time("yyyy-MM-dd HH:mm", iIiIli1l);
      console.log("活动将在 " + lIIiIIii + " 开始，晚点再来吧~");
      $.message.fix("活动尚未开始，开始时间：" + lIIiIIii);
      $.runEnd = true;
      return;
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        li1lIlll && !II1l1li && (await lliIi1ii("followShop"), $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500));
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        await lliIi1ii("followShop");
        break;
    }
    if ($.needJoinMember || $.outFlag) return;
    if ($.canDrawTimes === 0 && $.activityType !== 26) {
      await lliIi1ii("getGiveContent");
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
      if ($.followTaskInfo) {
        const ilI1II1I = $.followTaskInfo?.["skuIdsList"],
          Il11i11I = $.followTaskInfo?.["followTimes"],
          liIlilii = $.followTaskInfo?.["hasGetGiveTimes"],
          iIi1IIIi = $.followTaskInfo?.["giveTimes"],
          IiIiiiii = $.followTaskInfo?.["maxGiveTimes"],
          liIliIl1 = Math.trunc(ilI1II1I.length / Il11i11I * iIi1IIIi);
        if (liIlilii < IiIiiiii && liIlilii < liIliIl1) {
          let liiliIiI = (IiIiiiii - liIlilii) * Il11i11I;
          for (let III1iI1l = 0; III1iI1l < ilI1II1I.length; III1iI1l++) {
            $.skuId = ilI1II1I[III1iI1l];
            await lliIi1ii("followGoods");
            $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
            if (III1iI1l == liiliIiI - 1) break;
          }
          $.activityContent = "";
          await lliIi1ii("activityContent");
          if (!$.activityContent) {
            console.log("未能获取到活动信息");
            $.message.fix("未能获取活动信息");
            return;
          }
          $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
          const Illi11li = $.activityContent?.["dayMaxDraw"] || 0;
          $.canDrawTimes > Illi11li && ($.canDrawTimes = Illi11li);
          $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
          console.log("");
        }
      }
    }
    if ($.canDrawTimes <= 0) {
      switch ($.activityType) {
        case 13:
          console.log("今天没有抽奖机会了，明天再来吧~");
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
          break;
      }
      $.message.fix("抽奖机会不足");
      return;
    }
    $.drawTimes = 0;
    $.drawStop = false;
    let IIil1il = $.activityMode === "cjhy" ? 1000 : 500;
    if (iil1IilI) try {
      const Illi1IlI = parseInt(iil1IilI) * 1000;
      IIil1il = Illi1IlI;
    } catch {
      $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
    }
    $.drawMissTimes = 0;
    for (let IilIlIi1 = 1; $.canDrawTimes--; IilIlIi1++) {
      $.drawError = "";
      await lliIi1ii("start");
      if ($.drawError) {
        $.drawError.indexOf("火爆") > -1 && ($.canDrawTimes += 1);
        $.activityMode == "cjhy" && ($.drawError.indexOf("擦肩") > -1 || $.drawError.indexOf("缓存") > -1) && ($.canDrawTimes += 1);
        if (IlI1lIli && $.drawMissTimes >= IlI1lIli) break;
        if ($.drawStop || $.needJoinMember || $.runEnd) break;
      }
      if ($.canDrawTimes <= 0) break;
      if ($.drawTimes >= 8 && $.activityType == 26) {
        console.log("\n抽奖太多次了，下次再继续吧~");
        $.message.insert("抽奖太多次了，下次再抽");
        break;
      }
      await $.wait(IIil1il);
    }
  } catch (iIlIiill) {
    console.log("❌ 脚本运行遇到了错误\n" + iIlIiill);
  }
}
async function iIil11i1(lliliiil, ilIlIIl1) {
  try {
    switch (lliliiil) {
      case "getMyPing":
        if (ilIlIIl1.result === true && ilIlIIl1.data) $.secretPin = ilIlIIl1.data?.["secretPin"], $.nickname = ilIlIIl1.data?.["nickname"];else ilIlIIl1.errorMessage ? (console.log(lliliiil + " " + ilIlIIl1.errorMessage), $.message.fix(ilIlIIl1.errorMessage)) : console.log("❓" + lliliiil + " " + JSON.stringify(ilIlIIl1));
        break;
      case "getSimpleActInfoVo":
        if (ilIlIIl1.result === true && ilIlIIl1.data) {
          $.venderId = ilIlIIl1.data?.["venderId"];
          $.shopId = ilIlIIl1.data?.["shopId"];
          $.activityType = ilIlIIl1.data?.["activityType"];
        } else ilIlIIl1.errorMessage ? console.log(lliliiil + " " + ilIlIIl1.errorMessage) : console.log("❓" + lliliiil + " " + JSON.stringify(ilIlIIl1));
        break;
      case "getOpenCardStatus":
        if (ilIlIIl1.result === true) {
          if (ilIlIIl1.data) {
            if (ilIlIIl1.data.hasOwnProperty("openCard")) $.isMember = ilIlIIl1.data.openCard;else ilIlIIl1.data.hasOwnProperty("openedCard") && ($.isMember = ilIlIIl1.data.openedCard);
            if (typeof $.isMember === "number") $.isMember = $.isMember === 1;else typeof $.isMember === "undefined" && ($.isMember = false);
          } else $.isMember = true;
        } else ilIlIIl1.errorMessage ? ilIlIIl1.errorMessage.includes("擦肩") && !ilIlIIl1?.["data"] ? ($.skipRun = true, $.message.fix("账号已黑"), console.log("账号已黑，下次别跑了~")) : console.log(lliliiil + " " + ilIlIIl1.errorMessage) : $.isMember = false;
        break;
      case "activityContent":
        if (ilIlIIl1.result === true && ilIlIIl1.data) $.activityContent = ilIlIIl1.data;else {
          if (ilIlIIl1.errorMessage) {
            for (let i1i1i1Ii of ["未开始", "结束", "不存在", "不在"]) {
              if (ilIlIIl1.errorMessage.includes(i1i1i1Ii)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(lliliiil + " " + ilIlIIl1.errorMessage);
            $.message.fix(ilIlIIl1.errorMessage);
          } else console.log("❓" + lliliiil + " " + JSON.stringify(ilIlIIl1));
        }
        break;
      case "shopInfo":
        if (ilIlIIl1.result === true && ilIlIIl1.data) $.shopName = ilIlIIl1.data?.["shopName"];else {
          if (ilIlIIl1.errorMessage) console.log("" + (ilIlIIl1.errorMessage || ""));else {
            console.log("❓" + lliliiil + " " + JSON.stringify(ilIlIIl1));
          }
        }
        break;
      case "followShop":
        if (ilIlIIl1.result === true) {} else ilIlIIl1.errorMessage && (ilIlIIl1.errorMessage.includes("会员") && ($.needJoinMember = true, $.message.fix("活动仅限店铺会员参与")), console.log("" + (ilIlIIl1.errorMessage || "")));
        break;
      case "getGiveContent":
        if (ilIlIIl1.result === true && ilIlIIl1.data) $.followTaskInfo = ilIlIIl1.data?.["follow"];else {
          if (ilIlIIl1.errorMessage) console.log("" + (ilIlIIl1.errorMessage || ""));else {
            console.log("❓" + lliliiil + " " + JSON.stringify(ilIlIIl1));
          }
        }
        break;
      case "followGoods":
        if (ilIlIIl1.result === true) console.log("做 \"关注商品\" 任务 >> 任务完成");else ilIlIIl1.errorMessage ? console.log("做 \"关注商品\" 任务 >> 任务失败（" + ilIlIIl1.errorMessage + "）") : console.log("❓" + lliliiil + " " + JSON.stringify(ilIlIIl1));
        break;
      case "start":
        if (ilIlIIl1.result === true && ilIlIIl1.data) {
          IiliiiI1 = false;
          $.drawTimes += 1;
          $.canDrawTimes = ilIlIIl1.data.canDrawTimes;
          const li11i1ll = ilIlIIl1.data.drawInfo;
          if (li11i1ll) {
            switch (li11i1ll.type) {
              case 4:
                console.log("🔁 再来一次"), $.canDrawTimes += 1;
                break;
              case 6:
                console.log("🎉 " + li11i1ll.name + " 🐶"), $.message.insert(li11i1ll.name + "🐶");
                break;
              case 7:
                const i1II1Iil = ilIlIIl1.data.addressId;
                prizeName = li11i1ll.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName), console.log("参考价值：" + li11i1ll.priceInfo + "（元）");
                if (li11i1ll.showImage) console.log("预览图片：" + li11i1ll.showImage);
                const Il11lll1 = {
                    "baseUrl": $.baseUrl,
                    "cookie": I1111Ii1,
                    "ua": $.UA,
                    "activityId": $.activityId,
                    "activityType": $.activityType,
                    "venderId": [$.venderId, $.shopId],
                    "secretPin": $.secretPin,
                    "prizeName": prizeName,
                    "generateId": i1II1Iil
                  },
                  iIlIIlI1 = await IiI1i1ll(Il11lll1);
                !lI1iIIl1 && iIlIIlI1 && (await ilIillii.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(prizeName + "(" + (iIlIIlI1 ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 8:
                console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
                break;
              case 9:
                console.log("🗑️ " + li11i1ll.name + " 🎟️"), $.message.insert(li11i1ll.name + "🎟️");
                break;
              case 13:
              case 14:
              case 15:
                console.log("🎉 恭喜获得" + li11i1ll.name + " 🎁");
                if (!lI1iIIl1) {
                  await ilIillii.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + li11i1ll.name + "\n\n" + $.activityUrl);
                }
                $.message.insert(li11i1ll.name + "🎁");
                break;
              case 16:
                console.log("🎉 " + li11i1ll.priceInfo + " 🧧"), $.message.insert(li11i1ll.priceInfo + "红包🧧");
                break;
              default:
                li11i1ll.name.includes("券") ? (console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️")) : (console.log("获得：" + li11i1ll.name), $.message.insert("" + li11i1ll.name));
                break;
            }
          } else $.drawMissTimes += 1, console.log("💨 空气"), $.message.insert("空气💨");
        } else {
          if (ilIlIIl1.errorMessage) {
            $.drawError = ilIlIIl1.errorMessage;
            ["上限", "不足", "超过", "非法操作", "明天"].some(lli1IIi1 => $.drawError.includes(lli1IIi1)) && ($.drawStop = true, console.log($.drawError), $.message.insert($.drawError));
            ["未开始", "结束", "不存在", "不在"].some(l1IIlil1 => $.drawError.includes(l1IIlil1)) && ($.runEnd = true, $.message.fix($.drawError));
            ["会员", "开卡"].some(ili1I1Il => $.drawError.includes(ili1I1Il)) && ($.needJoinMember = true, console.log($.drawError), $.message.fix($.drawError));
            !["火爆", "擦肩", "缓存", "数据忙"].some(liIII1iI => $.drawError.includes(liIII1iI)) && !$.drawStop && !$.needJoinMember && console.log($.drawError || "");
          } else console.log(JSON.stringify(data));
        }
    }
  } catch (IliIIlI1) {
    console.log("❌ 未能正确处理 " + lliliiil + " 请求响应 " + (IliIIlI1.message || IliIIlI1));
  }
}
async function lliIi1ii(iiII1l1l) {
  if ($.runEnd || $.outFlag) return;
  let ilill11l = "",
    I1liill = "",
    l1il11II = "POST";
  switch (iiII1l1l) {
    case "getMyPing":
      ilill11l = $.baseUrl + "/customer/getMyPing", I1liill = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      ilill11l = $.baseUrl + "/customer/getSimpleActInfoVo", I1liill = "activityId=" + $.activityId;
      break;
    case "accessLog":
      ilill11l = $.baseUrl + "/common/accessLog", I1liill = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      ilill11l = $.baseUrl + "/common/accessLogWithAD", I1liill = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
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
              ilill11l = $.baseUrl + "/wxCommonInfo/getActMemberInfo", I1liill = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              ilill11l = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", I1liill = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
              break;
          }
          break;
        case 26:
          switch ($.activityMode) {
            case "lzkj":
              ilill11l = $.baseUrl + "/crmCard/common/coupon/getOpenCardStatus", I1liill = "venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              ilill11l = $.baseUrl + "/common/joinConfig/check", I1liill = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
              break;
          }
          break;
        case 124:
        case 125:
        case 128:
        case 129:
          ilill11l = $.baseUrl + "/common/joinConfig/check", I1liill = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
          break;
      }
      break;
    case "activityContent":
      let i1iiIliI = "";
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          i1iiIliI = "wxDrawActivity/activityContent";
          break;
        case 26:
          i1iiIliI = "wxPointDrawActivity/activityContent";
          break;
        case 124:
          i1iiIliI = "wxScratchActive/activityContent";
          break;
        case 125:
          i1iiIliI = "wxPointBlindBox/activityContent";
          break;
        case 128:
          i1iiIliI = "wxGashaponActive/activityContent";
          break;
        case 129:
          i1iiIliI = "wxDollGrabbing/activityContent";
          break;
      }
      ilill11l = $.baseUrl + "/" + i1iiIliI, I1liill = "activityId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    case "shopInfo":
      ilill11l = $.baseUrl + "/wxDrawActivity/shopInfo", I1liill = "activityId=" + $.activityId;
      break;
    case "followShop":
      switch ($.activityMode) {
        case "lzkj":
          ilill11l = $.baseUrl + "/wxActionCommon/followShop", I1liill = "userId=" + $.venderId + "&buyerNick=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
        case "cjhy":
          ilill11l = $.baseUrl + "/wxActionCommon/newFollowShop", I1liill = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
      }
      break;
    case "getGiveContent":
      ilill11l = $.baseUrl + "/wxDrawActivity/getGiveContent", I1liill = "pin=" + $.formatPin + "&activityId=" + $.activityId;
      break;
    case "followGoods":
      ilill11l = $.baseUrl + "/wxDrawActivity/follow", I1liill = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&skuId=" + $.skuId;
      break;
    case "start":
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          ilill11l = $.baseUrl + "/wxDrawActivity/start", I1liill = "activityId=" + $.activityId + "&pin=" + $.formatPin;
          break;
        case 26:
          ilill11l = $.baseUrl + "/wxPointDrawActivity/start", I1liill = "activityId=" + $.activityId + "&pin=" + $.formatPin;
          break;
        case 124:
          ilill11l = $.baseUrl + "/wxScratchActive/start", I1liill = "activityId=" + $.activityId + "&pin=" + $.formatPin;
        case 125:
          ilill11l = $.baseUrl + "/wxPointBlindBox/start", I1liill = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&venderId=" + $.venderId + "&nick=&token=" + $.token + "&fromType=APP";
          break;
        case 128:
          ilill11l = $.baseUrl + "/wxGashaponActive/start", I1liill = "activityId=" + $.activityId + "&pin=" + $.formatPin;
          break;
        case 129:
          ilill11l = $.baseUrl + "/wxDollGrabbing/start", I1liill = "activityId=" + $.activityId + "&pin=" + $.formatPin;
          break;
      }
      break;
    default:
      console.log("❌ 未知请求 " + iiII1l1l);
      return;
  }
  const lil1l1ii = {
      "url": ilill11l,
      "headers": {
        "Origin": $.origin,
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": I1111Ii1,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest",
        "Referer": $.activityUrl
      },
      "body": I1liill,
      "timeout": 30000
    },
    IlIlIl1 = 5;
  let I1iil111 = 0,
    i1i11lll = null,
    il11II1l = false;
  while (I1iil111 < IlIlIl1) {
    I1iil111 > 0 && (await $.wait(1000));
    const {
      err: IIliiI1I,
      res: lIli1lI,
      data: l11lI1i1
    } = await liIli1l1(lil1l1ii, l1il11II);
    if (IIliiI1I) {
      if (typeof IIliiI1I === "string" && IIliiI1I.includes("Timeout awaiting 'request'")) i1i11lll = iiII1l1l + " 请求超时，请检查网络重试";else {
        const l1l11ii = lIli1lI?.["statusCode"];
        if (l1l11ii) {
          if ([403, 493].includes(l1l11ii)) i1i11lll = iiII1l1l + " 请求失败，IP被限制（Response code " + l1l11ii + "）", il11II1l = true;else [400, 404].includes(l1l11ii) ? i1i11lll = iiII1l1l + " 请求配置参数错误，请联系开发者进行反馈（Response code " + l1l11ii + "）" : i1i11lll = iiII1l1l + " 请求失败（Response code " + l1l11ii + "）";
        } else i1i11lll = iiII1l1l + " API请求失败 => " + (IIliiI1I.message || IIliiI1I);
      }
      I1iil111++;
    } else {
      il11II1l = false;
      if (["getMyPing", "followGoods", "start"].includes(iiII1l1l)) {
        I1111Ii1 = IIl1I1ii.getResponseCookie(lIli1lI, I1111Ii1);
        const lliiI11l = IIl1I1ii.getCookieValue(I1111Ii1, "LZ_AES_PIN");
        lliiI11l ? $.LZ_AES_PIN = lliiI11l : $.LZ_AES_PIN && (I1111Ii1 += ";LZ_AES_PIN=" + $.LZ_AES_PIN);
      }
      if (!["accessLog", "accessLogWithAD"].includes(iiII1l1l)) {
        try {
          const lIIII11 = JSON.parse(l11lI1i1);
          iIil11i1(iiII1l1l, lIIII11);
          break;
        } catch (lIiI1ll) {
          i1i11lll = "🚫 API请求失败，" + iiII1l1l + " 接口响应数据解析失败: " + lIiI1ll.message;
          console.log(String(l11lI1i1));
          I1iil111++;
        }
      } else break;
    }
  }
  I1iil111 >= IlIlIl1 && (console.log(i1i11lll), il11II1l && !i1iil11I && ($.outFlag = true, $.message && $.message.fix(i1i11lll)));
}
async function liIli1l1(Ii1iiI, lIII1Iii = "POST") {
  if (lIII1Iii === "POST") return new Promise(async iiiIiiIl => {
    $.post(Ii1iiI, (iIlili1i, I111iI1, I11i1lll) => {
      iiiIiiIl({
        "err": iIlili1i,
        "res": I111iI1,
        "data": I11i1lll
      });
    });
  });else {
    if (lIII1Iii === "GET") return new Promise(async iilIi1l1 => {
      $.get(Ii1iiI, (ll1IlIi1, il1liI11, lIl1l11) => {
        iilIi1l1({
          "err": ll1IlIi1,
          "res": il1liI11,
          "data": lIl1l11
        });
      });
    });else {
      const l1i111iI = "不支持的请求方法";
      return {
        "err": l1i111iI,
        "res": null,
        "data": null
      };
    }
  }
}
function illllIII(lli11i1i) {
  return $.skipRun = true, new Promise(iiI => {
    let lliI1i = {
      "url": lli11i1i,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": lli11i1i,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(lliI1i, async (i1IiII1I, i1l1I1li, liiiiI) => {
      try {
        if (i1IiII1I) i1l1I1li && typeof i1l1I1li.statusCode != "undefined" && i1l1I1li.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), !i1iil11I && ($.outFlag = true)), console.log(String(i1IiII1I)), console.log("getFirstLZCK 请求失败，请检查网路重试");else {
          liiiiI.match(/(活动已经结束)/) && liiiiI.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束或不存在"));
          if (i1l1I1li.status == 200) {
            I1111Ii1 = IIl1I1ii.getResponseCookie(i1l1I1li, I1111Ii1);
            $.skipRun = false;
          }
        }
      } catch (illI11i) {
        $.logErr(illI11i, i1l1I1li);
      } finally {
        iiI();
      }
    });
  });
}
async function ll1i1i() {
  if (!$.joinVenderId) return;
  return new Promise(async I1lI1iI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IiIii11I = "";
    if ($.shopactivityId) IiIii11I = ",\"activityId\":" + $.shopactivityId;
    const liiiIIii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IiIii11I + ",\"channel\":406}",
      Ii1IIli1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liiiIIii)
      },
      i1l1liIl = await lilIilI1("8adfb", Ii1IIli1),
      IIIII11i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + liiiIIii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1l1liIl),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": il1IlI11,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIIII11i, async (l111IiI1, IIIl1IlI, lI11Ii) => {
      try {
        lI11Ii = lI11Ii && lI11Ii.match(/jsonp_.*?\((.*?)\);/) && lI11Ii.match(/jsonp_.*?\((.*?)\);/)[1] || lI11Ii;
        let l1111Il = $.toObj(lI11Ii, lI11Ii);
        if (l1111Il && typeof l1111Il == "object") {
          if (l1111Il && l1111Il.success === true) {
            console.log(l1111Il.message);
            $.errorJoinShop = l1111Il.message;
            if (l1111Il.result && l1111Il.result.giftInfo) {
              for (let illiil1 of l1111Il.result.giftInfo.giftList) {
                console.log("入会获得: " + illiil1.discountString + illiil1.prizeName + illiil1.secondLineDesc);
              }
            }
            console.log("");
          } else l1111Il && typeof l1111Il == "object" && l1111Il.message ? ($.errorJoinShop = l1111Il.message, console.log("" + (l1111Il.message || ""))) : console.log(lI11Ii);
        } else console.log(lI11Ii);
      } catch (iIl1i11I) {
        $.logErr(iIl1i11I, IIIl1IlI);
      } finally {
        I1lI1iI();
      }
    });
  });
}
function lllllII() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iiIlilii = Array.from(new Set($.blacklist.split("&")));
  console.log(iiIlilii.join("&") + "\n");
  let IiIlIIII = iiIlilii,
    lll1li1 = [],
    IIiIlilI = false;
  for (let lIIlIIIi = 0; lIIlIIIi < iII1lli1.length; lIIlIIIi++) {
    let I1iilI1I = decodeURIComponent(IIl1I1ii.getCookieValue(iI1I1l1l, "pt_pin"));
    if (!I1iilI1I) break;
    let ii1lll = false;
    for (let IlliIil1 of IiIlIIII) {
      if (IlliIil1 && IlliIil1 == I1iilI1I) {
        ii1lll = true;
        break;
      }
    }
    !ii1lll && (IIiIlilI = true, lll1li1.splice(lIIlIIIi, -1, iII1lli1[lIIlIIIi]));
  }
  if (IIiIlilI) iII1lli1 = lll1li1;
}
function Ii11Il1l(i1lI1l1I, IIli) {
  IIli != 0 && i1lI1l1I.unshift(i1lI1l1I.splice(IIli, 1)[0]);
}
function iIlIilil() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(iII1lli1, iII1lli1));
    return;
  }
  console.log("当前已设置白名单：");
  const i1iiI1Il = Array.from(new Set($.whitelist.split("&")));
  console.log(i1iiI1Il.join("&") + "\n");
  let llIIII = [],
    II1l1lI1 = i1iiI1Il;
  for (let l1l1l1i1 in iII1lli1) {
    let liIiiII1 = decodeURIComponent(IIl1I1ii.getCookieValue(iI1I1l1l, "pt_pin"));
    II1l1lI1.includes(liIiiII1) && llIIII.push(iII1lli1[l1l1l1i1]);
  }
  helpCookiesArr = llIIII;
  if (II1l1lI1.length > 1) for (let iII1iIi1 in II1l1lI1) {
    let iii1Iiil = II1l1lI1[II1l1lI1.length - 1 - iII1iIi1];
    if (!iii1Iiil) continue;
    for (let lI11l1lI in helpCookiesArr) {
      let il11i1l1 = decodeURIComponent(helpCookiesArr[lI11l1lI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lI11l1lI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      if (iii1Iiil == il11i1l1) {
        Ii11Il1l(helpCookiesArr, lI11l1lI);
      }
    }
  }
}