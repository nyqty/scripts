/*
活动名称：店铺抽奖 · 超级无线
活动链接：https://lzkj-isv.isvjcloud.com/lzclient/<活动id>/cjwx/common/entry.html?activityId=<活动id>&gameType=<玩法类型>
         https://lzkj-isv.isvjcloud.com/wxDrawActivity/activity/activity?activityId=<活动id>
         https://cjhy-isv.isvjcloud.com/wxDrawActivity/activity/activity?activityId=<活动id>
环境变量：LUCK_DRAW_URL // 活动链接
         LUCK_DRAW_OPENCARD // 是否开卡，默认不开卡
         LUCK_DRAW_NOTIFY // 是否推送通知，默认不推送 抽中才会推送，空气不推送
         LUCK_DRAW_NUM //运行账号数量，默认运行前7
		 LUCK_DRAW_WAIT // 账号间延迟，默认 3秒
		 LUCK_DRAW_Number // 连续无次数跳出，默认 5 次，火爆账号请设置黑名单，否则也会占用次数
		 LUCK_DRAW_BLACKLIST 黑名单 用&隔开 pin值
		 JD_LZ_OPEN // 是否开启LZ活动运行，默认运行
		 JD_CJ_OPEN // 是否开启CJ活动运行，默认运行

只有在没有抽奖次数的情况下才会去做任务获取

2023/3/19 连续无次数跳出，默认 5 次，火爆账号请设置黑名单，否则也会占用次数

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺抽奖通用活动-加密
1 1 1 1 * jd_luck_draw.js, tag=店铺抽奖通用活动-加密, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env("店铺抽奖通用活动-加密");
const Ii11Ii1i = $.isNode() ? require("./sendNotify") : "",
  Ilii1lII = $.isNode() ? require("./jdCookie") : "",
  IiI1Iili = require("./function/krgetToken"),
  I1IIIlI = require("./function/krh5st"),
  Ill1Il1I = require("got");
let iilIiIiI = process.env.LUCK_DRAW_URL ? process.env.LUCK_DRAW_URL : "",
  I1iIlIl = process.env.LUCK_DRAW_NOTIFY ? process.env.LUCK_DRAW_NOTIFY : "false",
  illiiiI = process.env.LUCK_DRAW_OPENCARD ? process.env.LUCK_DRAW_OPENCARD : "false";
const l1lii1i1 = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "",
  ilI1iIlI = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
let I1IIii11 = 7;
process.env.LUCK_DRAW_NUM && process.env.LUCK_DRAW_NUM != 7 && (I1IIii11 = process.env.LUCK_DRAW_NUM);
let ilIl1 = process.env.LUCK_DRAW_WAIT ? process.env.LUCK_DRAW_WAIT : "3",
  iI1i1i1 = process.env.LUCK_DRAW_Number ? process.env.LUCK_DRAW_Number : "5",
  iiiliI11 = true,
  IllI11i1 = {},
  I1lI1Ili = "",
  i111l11l = [],
  l1i1li1l = "",
  llI1111 = "",
  il1il11I = "";
messageTitle = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(Ilii1lII).forEach(ll1Il1Ii => {
    i111l11l.push(Ilii1lII[ll1Il1Ii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i111l11l = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(i1liI11I => i1liI11I.cookie)].filter(lIlIl1ll => !!lIlIl1ll);
let iiIiIIll = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  iiIiiIil = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  IIII1II1 = "",
  llli1lIl = "";
$.whitelist = process.env.LUCK_DRAW_WHITELIST || IIII1II1;
$.blacklist = process.env.LUCK_DRAW_BLACKLIST || llli1lIl;
Ii1l1ii1();
ii1iiiIi();
if (iilIiIiI) {
  activityId = IiI1iIII("" + iilIiIiI, "activityId");
  if (iilIiIiI.includes("lzkj")) {
    if (iiIiIIll === "false") {
      console.log("\n❌  已设置全局关闭LZ相关活动\n");
      return;
    } else $.domain = iilIiIiI.match(/https?:\/\/([^/]+)/)[1];
  } else {
    if (iilIiIiI.includes("cjhy")) {
      if (iiIiiIil === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
        return;
      } else $.domain = iilIiIiI.match(/https?:\/\/([^/]+)/)[1];
    } else {
      console.log("\n当前变量链接错误：" + iilIiIiI);
      console.log("\n请填写正确的活动链接");
      return;
    }
  }
  $.domain_mode = null;
  if ($.domain.includes("cjhy")) $.domain_mode = "cjhy";
  if ($.domain.includes("lzkj")) $.domain_mode = "lzkj";
  if ($.domain_mode == null) {
    console.log("请填写正确的活动链接");
    return;
  }
} else {
  console.log("请填写活动链接");
  return;
}
let lil1Iill = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：" + iilIiIiI);
  console.log("\n是否推送通知 【" + I1iIlIl + "】 是否开卡 【" + illiiiI + "】 ");
  console.log("\n当前设定账号间延迟等待 【" + ilIl1 + "】 秒");
  console.log("\n当前设定连续 【" + iI1i1i1 + "】 次无抽奖次数跳出");
  if (!i111l11l[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityEnd = false;
  $.venderId = null;
  $.shopName = null;
  $.outFlag = false;
  $.prizeList = "";
  for (let lI1Ilii1 = 0; lI1Ilii1 < I1IIii11; lI1Ilii1++) {
    if (lI1Ilii1 > iI1i1i1 && iiiliI11) {
      console.log("\n检测到多次无抽奖次数，跳过此次运行\n");
      break;
    }
    if (i111l11l[lI1Ilii1]) {
      l1i1li1l = i111l11l[lI1Ilii1];
      originCookie = i111l11l[lI1Ilii1];
      $.UserName = decodeURIComponent(l1i1li1l.match(/pt_pin=(.+?);/) && l1i1li1l.match(/pt_pin=(.+?);/)[1]);
      $.index = lI1Ilii1 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.msg = "";
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await Ii11Ii1i.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await l1l11IlI();
      await lliI1llI();
      $.msg != "" && (il1il11I += "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "：" + $.msg + "\n");
      if ($.index != i111l11l.length) await $.wait(parseInt(ilIl1, 10) * 1000);else {
        if ($.index % 1 == 0) console.log("每个账号延迟间隔默认30s");
        if ($.index % 1 == 0) await $.wait(parseInt(Math.random() * 5000 + 30000, 10));
      }
      if ($.hasEnd || $.activityEnd || $.outFlag) break;
    }
  }
  if ($.outFlag) {
    $.msg = "此ip已被限制，请过10分钟后再执行脚本";
    llI1111 = $.msg;
    if ($.isNode()) await Ii11Ii1i.sendNotify("" + $.name, "" + llI1111);
  }
  il1il11I && $.isNode() && I1iIlIl == "true" && (await Ii11Ii1i.sendNotify("" + $.name, il1il11I + "\n【活动奖品】：" + $.prizeList + "\n【活动入口】：" + iilIiIiI));
})().catch(II1illl1 => {
  $.log("", " " + $.name + ", 失败! 原因: " + II1illl1 + "!", "");
}).finally(() => {
  $.done();
});
async function lliI1llI() {
  $.drawTimes = 0;
  $.Token = "";
  $.secretPin = "";
  $.hisPin = "";
  $.needOpenCard = false;
  $.drawStop = false;
  $.needFollow = true;
  $.hasFollow = false;
  $.isOpenCard = false;
  switch ($.domain_mode) {
    case "lzkj":
      await IIli1ii();
      break;
    case "cjhy":
      await lIil1lIl();
      break;
  }
  if ($.hasEnd || $.activityEnd || $.outFlag) return;
  await $.wait(500);
  if ($.index == 1) {
    await illI1Ili("/customer/getSimpleActInfoVo", "activityId=" + activityId);
    if ($.hasEnd) {
      console.log("活动已经结束！");
      return;
    }
    if (!$.venderId) {
      $.hasEnd = true;
      console.log("\ngetSimpleActInfoVo 未能获取店铺信息\n");
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
        console.log("❌ 当前活动类型（" + $.activityType + "）不受本脚本支持，请联系作者进行反馈！");
        $.outFlag = true;
        return;
    }
  }
  $.Token = await IiI1Iili(originCookie, lil1Iill);
  if ($.Token) {
    await ii1I1i11();
    if ($.outFlag) return;
    if (!$.secretPin) {
      console.log("获取[Pin]失败！");
      return;
    }
    switch ($.domain_mode) {
      case "lzkj":
        $.FormatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.FormatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  } else {
    console.log("获取[token]失败！");
    return;
  }
  switch ($.domain_mode) {
    case "lzkj":
      await l1llIlIl();
      break;
    case "cjhy":
      await Ii1llil1();
      break;
  }
  $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  if (illiiiI == "true") {
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        switch ($.domain_mode) {
          case "lzkj":
            await il1II1l1("/wxCommonInfo/getActMemberInfo", "activityId=" + activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin);
            break;
          case "cjhy":
            await il1II1l1("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
            break;
        }
        break;
      case 26:
        switch ($.domain_mode) {
          case "lzkj":
            await il1II1l1("/crmCard/common/coupon/getOpenCardStatus", "venderId=" + $.venderId + "&pin=" + $.FormatPin);
            break;
          case "cjhy":
            await il1II1l1("/common/joinConfig/check", "venderId=" + $.venderId + "&pin=" + $.FormatPin + "&activityType=" + $.activityType + "&activityId=" + activityId);
            break;
        }
        break;
      case 124:
      case 125:
      case 128:
      case 129:
        await il1II1l1("/common/joinConfig/check", "venderId=" + $.venderId + "&pin=" + $.FormatPin + "&activityType=" + $.activityType + "&activityId=" + activityId);
        break;
    }
    if (!$.isOpenCard) {
      $.errorJoinShop = "";
      $.joinVenderId = $.venderId;
      for (let I1IlI1lI = 0; I1IlI1lI < Array(2).length; I1IlI1lI++) {
        if (I1IlI1lI > 0) console.log("第" + I1IlI1lI + "次 重新开卡");
        await llIIi1i();
        await $.wait(500);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
      }
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("❌ 开卡失败，重新执行脚本");
    }
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  }
  var iilIlliI = "";
  switch ($.activityType) {
    case 3:
    case 4:
    case 11:
    case 12:
    case 13:
      iilIlliI = await i11IIl("/wxDrawActivity/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
      break;
    case 26:
      iilIlliI = await i11IIl("/wxPointDrawActivity/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
      break;
    case 124:
      iilIlliI = await i11IIl("/wxScratchActive/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
      break;
    case 125:
      iilIlliI = await i11IIl("/wxPointBlindBox/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
      break;
    case 128:
      iilIlliI = await i11IIl("/wxGashaponActive/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
      break;
    case 129:
      iilIlliI = await i11IIl("/wxDollGrabbing/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
      break;
  }
  if ($.hasEnd) {
    console.log("未能获取到活动信息！");
    return;
  }
  $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  if (iilIlliI) {
    if (iilIlliI.result && iilIlliI.data) {
      $.canDrawTimes = iilIlliI.data.canDrawTimes;
      $.content = iilIlliI.data.content;
      $.needFollow = iilIlliI.data.needFollow ? iilIlliI.data.needFollow : false;
      $.hasFollow = iilIlliI.data.hasFollow ? iilIlliI.data.hasFollow : false;
      $.endTime = iilIlliI.data.endTime;
      $.startTime = iilIlliI.data.startTime;
      let li11I1iI = new Date().valueOf();
      $.startTimeStr = new Date($.startTime).valueOf();
      $.endTimeStr = new Date($.endTime).valueOf();
      if ($.endTimeStr <= li11I1iI) {
        console.log("活动已经结束了~");
        $.activityEnd = true;
        return;
      }
      if ($.startTimeStr >= li11I1iI) {
        console.log("活动开始时间：" + new Date(parseInt($.startTime)).toLocaleString());
        $.activityEnd = true;
        return;
      }
      if ($.index == 1) {
        let ii11I1i1 = "",
          iiII1ii = "";
        for (let llIli1II = 0; llIli1II < $.content.length; llIli1II++) {
          iiII1ii = $.content[llIli1II].name;
          ii11I1i1 = $.content[llIli1II].id;
          if (ii11I1i1 == 0) {
            $.prizeList += "谢谢参与";
            break;
          } else llIli1II != $.content.length - 1 ? $.prizeList += iiII1ii + "，" : $.prizeList += "" + iiII1ii;
        }
        await I1IIi1i1();
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
        console.log("店铺名称：" + $.shopName + "\n店铺链接: https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + $.prizeList + "\n");
      }
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          if ($.needFollow && !$.hasFollow) {
            switch ($.domain_mode) {
              case "lzkj":
                await iIII1i1I("/wxActionCommon/followShop", "userId=" + $.venderId + "&buyerNick=" + $.FormatPin + "&activityId=" + activityId + "&activityType=" + $.activityType);
                break;
              case "cjhy":
                await iIII1i1I("/wxActionCommon/newFollowShop", "venderId=" + $.venderId + "&activityId=" + activityId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
                break;
            }
            if ($.needOpenCard) {
              console.log("活动仅限店铺会员参与哦~");
              $.msg = "活动仅限店铺会员参与";
              return;
            }
            $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
          }
          break;
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          switch ($.domain_mode) {
            case "lzkj":
              await iIII1i1I("/wxActionCommon/followShop", "userId=" + $.venderId + "&buyerNick=" + $.FormatPin + "&activityId=" + activityId + "&activityType=" + $.activityType);
              break;
            case "cjhy":
              await iIII1i1I("/wxActionCommon/newFollowShop", "venderId=" + $.venderId + "&activityId=" + activityId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
              break;
          }
          break;
      }
      if ($.canDrawTimes == 0 && $.activityType != 26) {
        $.followTaskInfo = null;
        await iliiI1("/wxDrawActivity/getGiveContent", "pin=" + $.FormatPin + "&activityId=" + activityId);
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
        if ($.followTaskInfo != null) {
          var IlIlllii = $.followTaskInfo.skuIdsList,
            iIIliIIl = $.followTaskInfo.followTimes,
            lli1l1ll = $.followTaskInfo.hasGetGiveTimes,
            lll1Il1i = $.followTaskInfo.giveTimes,
            iiIIi1ll = $.followTaskInfo.maxGiveTimes,
            I1l1ilI1 = Math.trunc(IlIlllii.length / iIIliIIl * lll1Il1i);
          if (lli1l1ll < iiIIi1ll && lli1l1ll < I1l1ilI1) {
            var ii1iI1Ii = (iiIIi1ll - lli1l1ll) * iIIliIIl;
            for (let IIiI1iIi = 0; IIiI1iIi < IlIlllii.length; IIiI1iIi++) {
              $.log("去关注商品");
              await i1lii1ll("/wxDrawActivity/follow", "activityId=" + activityId + "&pin=" + $.FormatPin + "&skuId=" + IlIlllii[IIiI1iIi]);
              $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
              if (IIiI1iIi == ii1iI1Ii - 1) break;
            }
            switch ($.activityType) {
              case 3:
              case 4:
              case 11:
              case 12:
              case 13:
                iilIlliI = await i11IIl("/wxDrawActivity/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
                break;
              case 26:
                iilIlliI = await i11IIl("/wxPointDrawActivity/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
                break;
              case 124:
                iilIlliI = await i11IIl("/wxScratchActive/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
                break;
              case 125:
                iilIlliI = await i11IIl("/wxPointBlindBox/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
                break;
              case 128:
                iilIlliI = await i11IIl("/wxGashaponActive/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
                break;
              case 129:
                iilIlliI = await i11IIl("/wxDollGrabbing/activityContent", "activityId=" + activityId + "&pin=" + $.FormatPin);
                break;
            }
            $.canDrawTimes = iilIlliI.data.canDrawTimes;
            $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
            console.log("");
          }
        }
      }
    } else {
      console.log("活动可能已经结束！");
      $.activityEnd = true;
      return;
    }
  } else {
    console.log("未能成功获取到活动信息");
    $.activityEnd = true;
    return;
  }
  if ($.canDrawTimes > 0) {
    for (let I1lll1i1 = 1; $.canDrawTimes--; I1lll1i1++) {
      $.draw_errorMessage = "";
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          await IlI1IIl("/wxDrawActivity/start", "activityId=" + activityId + "&pin=" + $.FormatPin);
          break;
        case 26:
          await IlI1IIl("/wxPointDrawActivity/start", "activityId=" + activityId + "&pin=" + $.FormatPin);
          break;
        case 124:
          await IlI1IIl("/wxScratchActive/start", "activityId=" + activityId + "&pin=" + $.FormatPin);
          break;
        case 125:
          await IlI1IIl("/wxPointBlindBox/start", "activityId=" + activityId + "&pin=" + $.FormatPin + "&venderId=" + $.venderId + "&nick=&token=" + $.Token + "&fromType=APP");
          break;
        case 128:
          await IlI1IIl("/wxGashaponActive/start", "activityId=" + activityId + "&pin=" + $.FormatPin);
          break;
        case 129:
          await IlI1IIl("/wxDollGrabbing/start", "activityId=" + activityId + "&pin=" + $.FormatPin);
          break;
      }
      if ($.draw_errorMessage != "") {
        $.draw_errorMessage.indexOf("火爆") > -1 && ($.canDrawTimes += 1);
        $.domain_mode == "cjhy" && ($.draw_errorMessage.indexOf("擦肩") > -1 || $.draw_errorMessage.indexOf("缓存") > -1) && ($.canDrawTimes += 1);
        if ($.drawStop || $.needOpenCard || $.hasEnd) break;
      }
      if ($.canDrawTimes <= 0) break;
      if ($.drawTimes >= 5) {
        console.log("\n抽奖太多次了，下次再继续吧~");
        break;
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    if ($.msg.lastIndexOf("，") > -1) $.msg = $.msg.substring(0, $.msg.lastIndexOf("，"));
  } else switch ($.activityType) {
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
}
function i11IIl(ll1lili, i1I1i1Il) {
  return new Promise(llIli11i => {
    $.post(llli1I1l(ll1lili, i1I1i1Il), async (iiIlilI1, iill1111, liI111Il) => {
      try {
        if (iiIlilI1) {
          console.log("" + JSON.stringify(iiIlilI1));
          console.log($.name + "getActivityContent 请求失败，请检查网路重试");
        } else {
          if (l1IIl11l(liI111Il)) {
            liI111Il = JSON.parse(liI111Il);
            iill1111.status == 200 && IIiliIIi(iill1111);
            llIli11i(liI111Il);
          } else $.hasEnd = true;
        }
      } catch (IIlil1Il) {
        $.logErr(IIlil1Il, iill1111);
      } finally {
        llIli11i();
      }
    });
  });
}
function iliiI1() {
  return new Promise(IiI1ill1 => {
    $.post(llli1I1l("/wxDrawActivity/getGiveContent", "pin=" + $.FormatPin + "&activityId=" + activityId), async (iIll1lI, iII1i111, i11lii) => {
      try {
        if (iIll1lI) {
          console.log("" + JSON.stringify(iIll1lI));
          console.log($.name + "getGiveContent 请求失败，请检查网路重试");
        } else {
          l1IIl11l(i11lii) && (i11lii = JSON.parse(i11lii), i11lii.result && i11lii.data && ($.followTaskInfo = i11lii.data.follow), iII1i111.status == 200 && IIiliIIi(iII1i111));
        }
      } catch (IIII1ii1) {
        $.logErr(IIII1ii1, iII1i111);
      } finally {
        IiI1ill1();
      }
    });
  });
}
function iIII1i1I(I1liIlii, lI1lli1i) {
  return new Promise(Il1ill1 => {
    $.post(llli1I1l(I1liIlii, lI1lli1i), async (Il1IllII, il1lii1i, iiIIii1i) => {
      try {
        if (Il1IllII) {
          console.log("" + JSON.stringify(Il1IllII));
          console.log($.name + "followShop 请求失败，请检查网路重试");
        } else {
          if (l1IIl11l(iiIIii1i)) {
            iiIIii1i = JSON.parse(iiIIii1i);
            errorMessage = iiIIii1i.errorMessage;
            errorMessage.indexOf("会员") > -1 && $.needOpenCard == true;
            if (il1lii1i.status == 200) {
              IIiliIIi(il1lii1i);
            }
          }
        }
      } catch (l1Ilill) {
        $.logErr(l1Ilill, il1lii1i);
      } finally {
        Il1ill1();
      }
    });
  });
}
function IiI11IiI(illl1I1, lllliiiI) {
  return new Promise(lII11Iii => {
    $.post(llli1I1l(illl1I1, lllliiiI), async (I1lIiii1, I1l1li1l, I1I1IIiI) => {
      try {
        I1lIiii1 ? (console.log("" + JSON.stringify(I1lIiii1)), console.log($.name + "getPoints 请求失败，请检查网路重试")) : l1IIl11l(I1I1IIiI) && (I1I1IIiI = JSON.parse(I1I1IIiI), I1I1IIiI.isOk && I1I1IIiI.data ? ($.points = I1I1IIiI.points, console.log("当前积分：" + $.points)) : (console.log("获取出错~"), $.points = 0), I1l1li1l.status == 200 && IIiliIIi(I1l1li1l));
      } catch (l11II1I) {
        $.logErr(l11II1I, I1l1li1l);
      } finally {
        lII11Iii();
      }
    });
  });
}
function I1IIi1i1() {
  return new Promise(lIiiIii => {
    $.post(llli1I1l("/wxDrawActivity/shopInfo", "activityId=" + activityId), async (IiIlI1li, IlilI, iIli11ll) => {
      try {
        IiIlI1li ? (console.log("" + JSON.stringify(IiIlI1li)), console.log($.name + "getShopInfo 请求失败，请检查网路重试")) : l1IIl11l(iIli11ll) && (iIli11ll = JSON.parse(iIli11ll), iIli11ll.result && iIli11ll.data && ($.shopName = iIli11ll.data.shopName), IlilI.status == 200 && IIiliIIi(IlilI));
      } catch (IlIiiiiI) {
        $.logErr(IlIiiiiI, IlilI);
      } finally {
        lIiiIii();
      }
    });
  });
}
function i1lii1ll(il1liil1, li1i1I1i) {
  return new Promise(i1ili1il => {
    $.post(llli1I1l(il1liil1, li1i1I1i), async (lI1lIl1l, Iiiiiill, lIIl1lll) => {
      try {
        lI1lIl1l ? (console.log("" + JSON.stringify(lI1lIl1l)), console.log($.name + "follow 请求失败，请检查网路重试")) : l1IIl11l(lIIl1lll) && (lIIl1lll = JSON.parse(lIIl1lll), lIIl1lll.result ? console.log("  >> 关注成功") : console.log("  >> " + lIIl1lll.errorMessage || "关注失败"), Iiiiiill.status == 200 && IIiliIIi(Iiiiiill));
      } catch (iil1liI) {
        $.logErr(iil1liI, Iiiiiill);
      } finally {
        i1ili1il();
      }
    });
  });
}
function IlI1IIl(lIil1111, li1Ii111) {
  return new Promise(i1ll1i1l => {
    $.post(llli1I1l(lIil1111, li1Ii111), async (iiili1lI, li1iII1l, l1IIi1Il) => {
      try {
        if (iiili1lI) {
          console.log(JSON.stringify(iiili1lI));
          console.log("Draw 请求失败，请检查网路重试");
        } else {
          if (l1IIi1Il) {
            l1IIi1Il = JSON.parse(l1IIi1Il);
            if (l1IIi1Il.result && l1IIi1Il.data) {
              iiiliI11 = false;
              $.drawTimes += 1;
              let ilIlI1i = l1IIi1Il.data.drawInfo;
              $.canDrawTimes = l1IIi1Il.data.canDrawTimes;
              if (ilIlI1i) switch (ilIlI1i.type) {
                case 4:
                  console.log("🔁 再来一次");
                  $.canDrawTimes += 1;
                  break;
                case 6:
                  console.log("🎉 " + ilIlI1i.name + " 🐶");
                  $.msg += ilIlI1i.name + "🐶，";
                  break;
                case 7:
                  let l1illI1i = l1IIi1Il.data.addressId;
                  prizeName = ilIlI1i.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  console.log("参考价值：" + ilIlI1i.priceInfo + "（元）");
                  if (ilIlI1i.showImage) console.log("预览图片：" + ilIlI1i.showImage);
                  if (l1lii1i1 != "") {
                    let l1IIiIil = await iI11iIll(lil1Iill, l1i1li1l, $.UA, activityId, $.activityType, $.venderId, $.secretPin, prizeName, l1illI1i);
                    l1IIiIil ? $.isNode() && (await Ii11Ii1i.sendNotify("店铺抽奖中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n")) : $.isNode() && (await Ii11Ii1i.sendNotify("店铺抽奖待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + iilIiIiI));
                  } else $.isNode() && (await Ii11Ii1i.sendNotify("店铺抽奖待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + iilIiIiI));
                  $.msg += prizeName + "🎁，";
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  $.msg += "专享价🗑️，";
                  break;
                case 9:
                  console.log("🗑️ " + ilIlI1i.name + " 🎟️");
                  $.msg += ilIlI1i.name + "🎟️，";
                  break;
                case 13:
                case 14:
                case 15:
                  console.log("🎉 恭喜获得" + ilIlI1i.name + " 🎁");
                  $.msg += ilIlI1i.name + "🎁，";
                  $.isNode() && (await Ii11Ii1i.sendNotify("店铺抽奖中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + ilIlI1i.name + "\n\n" + iilIiIiI));
                  break;
                case 16:
                  console.log("🎉 " + ilIlI1i.priceInfo + " 🧧");
                  $.msg += ilIlI1i.priceInfo + "红包🧧，";
                  break;
                default:
                  ilIlI1i.name.includes("券") ? (console.log("🗑️ 优惠券"), $.msg += "优惠券🗑️，") : (console.log("获得：" + ilIlI1i.name), $.msg += ilIlI1i.name + "，");
                  break;
              } else console.log("💨  空气");
            } else {
              if (l1IIi1Il.errorMessage) {
                $.draw_errorMessage = l1IIi1Il.errorMessage;
                for (let l1I1II11 of ["上限", "不足", "超过"]) {
                  if ($.draw_errorMessage.includes(l1I1II11)) {
                    $.drawStop = true;
                    break;
                  }
                }
                for (let i1IIi1 of ["未开始", "结束", "不存在", "不在"]) {
                  if ($.draw_errorMessage.includes(i1IIi1)) {
                    $.hasEnd = true;
                    break;
                  }
                }
                for (let l1i111ll of ["会员", "开卡"]) {
                  if ($.draw_errorMessage.includes(l1i111ll)) {
                    $.needOpenCard = true;
                    console.log("活动仅限店铺会员参与哦~");
                    break;
                  }
                }
                !$.draw_errorMessage.includes("火爆") && !$.draw_errorMessage.includes("擦肩") && !$.draw_errorMessage.includes("缓存") && !$.drawStop && !$.needOpenCard && console.log($.draw_errorMessage || "");
              } else {
                console.log(JSON.stringify(l1IIi1Il));
              }
            }
          }
          li1iII1l.status == 200 && IIiliIIi(li1iII1l);
        }
      } catch (lilIiiI1) {
        $.logErr(lilIiiI1, li1iII1l);
      } finally {
        i1ll1i1l();
      }
    });
  });
}
function il1II1l1(IIllIll1, lIiil1l) {
  return new Promise(Ilil1Il => {
    $.post(llli1I1l(IIllIll1, lIiil1l), async (IliiIill, IliIIII, ili1II1I) => {
      try {
        if (IliiIill) {
          console.log("" + JSON.stringify(IliiIill));
          console.log("getOpenCardStatus API请求失败，请检查网路重试");
        } else {
          if (l1IIl11l(ili1II1I)) {
            ili1II1I = JSON.parse(ili1II1I);
            if (ili1II1I.result && ili1II1I.data) switch ($.domain_mode) {
              case "lzkj":
                $.isOpenCard = ili1II1I.data.openCard;
                break;
              case "cjhy":
                $.isOpenCard = ili1II1I.data.openedCard;
                break;
            } else console.log(ili1II1I.errorMessage || "");
          }
          IliIIII.status == 200 && IIiliIIi(IliIIII);
        }
      } catch (lIiiiI1l) {
        $.logErr(lIiiiI1l, IliIIII);
      } finally {
        Ilil1Il();
      }
    });
  });
}
function illI1Ili() {
  return new Promise(llIII11I => {
    $.post(llli1I1l("/customer/getSimpleActInfoVo", "activityId=" + activityId), async (l1li1lii, iiIIl1i1, Ill111iI) => {
      try {
        if (l1li1lii) {
          console.log("" + $.toStr(l1li1lii));
          console.log($.name + " getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {
          if (Ill111iI && l1IIl11l(Ill111iI)) {
            Ill111iI = JSON.parse(Ill111iI);
            if (Ill111iI.data) {
              $.shopId = Ill111iI.data.shopId;
              $.venderId = Ill111iI.data.venderId;
              $.activityType = Ill111iI.data.activityType;
            } else !Ill111iI.data ? $.hasEnd = true : console.log("异常：" + JSON.stringify(Ill111iI));
          }
          iiIIl1i1.status == 200 && IIiliIIi(iiIIl1i1);
        }
      } catch (li1iIl11) {
        $.logErr(li1iIl11, iiIIl1i1);
      } finally {
        llIII11I();
      }
    });
  });
}
function IIli1ii() {
  return new Promise(illIiii => {
    let lI1lll1 = {
      "url": "https://lzkj-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": l1i1li1l,
        "Referer": iilIiIiI,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(lI1lll1, async (lll11l, IililIl1, lIIIiI1I) => {
      try {
        lll11l ? (IililIl1 && typeof IililIl1.statusCode != "undefined" && IililIl1.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true), console.log("" + $.toStr(lll11l)), console.log("wxCommonInfo API请求失败，请检查网路重试")) : IililIl1.status == 200 && IIiliIIi(IililIl1);
      } catch (liI1i1Il) {
        $.logErr(liI1i1Il, IililIl1);
      } finally {
        illIiii();
      }
    });
  });
}
function lIil1lIl() {
  return new Promise(Il1Iiiil => {
    let iiIIl = {
      "url": iilIiIiI,
      "headers": {
        "Cookie": l1i1li1l,
        "User-Agent": $.UA
      }
    };
    $.get(iiIIl, async (lI11Ili1, iIlil1i, il1lilII) => {
      try {
        if (lI11Ili1) {
          iIlil1i && typeof iIlil1i.statusCode != "undefined" && iIlil1i.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true);
          console.log("" + JSON.stringify(lI11Ili1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let I1I1iI11 = il1lilII.match(/(活动已结束)/) && il1lilII.match(/(活动已结束)/)[1] || il1lilII.match(/(活动尚未开始)/) && il1lilII.match(/(活动尚未开始)/)[1] || "";
          if (I1I1iI11) {
            $.activityEnd = true;
            console.log("活动已结束或者未开始");
          }
          iIlil1i.status == 200 && IIiliIIi(iIlil1i);
        }
      } catch (i1IIiIiI) {
        $.logErr(i1IIiIiI, iIlil1i);
      } finally {
        Il1Iiiil();
      }
    });
  });
}
function ii1I1i11() {
  return new Promise(IIlli1I => {
    let ilIiIIi = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP";
    $.post(llli1I1l("/customer/getMyPing", ilIiIIi), async (ilIiii1l, Iill11i, llillii1) => {
      try {
        ilIiii1l ? (Iill11i && typeof Iill11i.statusCode != "undefined" && Iill11i.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), $.outFlag = true), console.log("" + JSON.stringify(ilIiii1l)), console.log($.name + "getMyPing API请求失败，请检查网路重试")) : (Iill11i.status == 200 && IIiliIIi(Iill11i), l1IIl11l(llillii1) && (llillii1 = JSON.parse(llillii1), llillii1.result && llillii1.data ? ($.secretPin = llillii1.data.secretPin, $.nickName = llillii1.data.nickname, $.AUTH_C_USER = $.secretPin) : console.log("" + (llillii1.errorMessage || ""))));
      } catch (IIliiiI1) {
        $.logErr(IIliiiI1, Iill11i);
      } finally {
        IIlli1I();
      }
    });
  });
}
function llli1I1l(iIi1lll, l1l1llIl) {
  return {
    "url": "" + lil1Iill + iIi1lll,
    "body": l1l1llIl,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": lil1Iill,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": iilIiIiI,
      "Cookie": I1lI1Ili + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    },
    "timeout": 30 * 2000
  };
}
function Ii1llil1() {
  return new Promise(async lIl1l11I => {
    const ilIliiIl = {
      "url": "https://cjhy-isv.isvjcloud.com/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "cjhy-isv.isvjcloud.com",
        "Origin": "https://cjhy-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": iilIiIiI,
        "Cookie": I1lI1Ili + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + activityId + "&pageUrl=" + encodeURIComponent(iilIiIiI) + "&subType=app"
    };
    $.post(ilIliiIl, (l1llIi1l, li1iIlll, Il1I1lli) => {
      try {
        l1llIi1l ? (console.log("" + JSON.stringify(l1llIi1l)), console.log("accessLog API请求失败，请检查网路重试")) : li1iIlll.status == 200 && IIiliIIi(li1iIlll);
      } catch (IllIiII) {
        $.logErr(IllIiII, li1iIlll);
      } finally {
        lIl1l11I();
      }
    });
  });
}
function l1llIlIl() {
  return new Promise(async iIlil1i1 => {
    const IliiII1l = {
      "url": "https://lzkj-isv.isvjcloud.com/common/accessLogWithAD",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "lzkj-isv.isvjcloud.com",
        "Origin": "https://lzkj-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": iilIiIiI,
        "Cookie": I1lI1Ili + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + activityId + "&pageUrl=" + encodeURIComponent(iilIiIiI) + "&subType=app"
    };
    $.post(IliiII1l, (l1IiI1ii, IIiIIiI1, Ii1liIIl) => {
      try {
        if (l1IiI1ii) {
          console.log("" + JSON.stringify(l1IiI1ii));
          console.log("accessLogWithAD API请求失败，请检查网路重试");
        } else {
          if (IIiIIiI1.status == 200) {
            IIiliIIi(IIiIIiI1);
          }
        }
      } catch (l1lIII11) {
        $.logErr(l1lIII11, IIiIIiI1);
      } finally {
        iIlil1i1();
      }
    });
  });
}
async function iI11iIll(I1lIi11, iIiIlilI, llIi1llI, ililllI, I11l1li, illi1i1, ilIiilll, lliIIl, IllII1lI) {
  let iliilIlI = [];
  if (l1lii1i1 != "") iliilIlI = l1lii1i1.split("|");else {
    return false;
  }
  var i1I1IiI = Math.floor(Math.random() * iliilIlI.length);
  if (iliilIlI[i1I1IiI] == "") return false;else iliilIlI = iliilIlI[i1I1IiI];
  iliilIlI = iliilIlI.split("@");
  if (iliilIlI.length != 8) return false;
  for (let lIlll1il = 0; lIlll1il < 7; lIlll1il++) {
    if (iliilIlI[lIlll1il] == "") return false;
  }
  let iil11llI = iliilIlI[0],
    IiiI1ii = iliilIlI[1],
    iIIliiI = iliilIlI[2],
    iIliIi1 = iliilIlI[3],
    ll1I1l1l = iliilIlI[4],
    Ii1l1l1i = iliilIlI[5],
    llIiIIlI = iliilIlI[6],
    IIi1iII = iliilIlI[7];
  if (ilI1iIlI != "") {
    let i1l = ilI1iIlI.split("@"),
      iiillIl1 = false;
    for (let li11II11 of i1l) {
      if (lliIIl.includes(li11II11)) {
        iiillIl1 = true;
        break;
      }
    }
    if (iiillIl1) return false;
  }
  let iiIiIll1 = I1lIi11.includes("cjhy") ? encodeURIComponent(encodeURIComponent(ilIiilll)) : encodeURIComponent(ilIiilll),
    illIiiII = I1lIi11.match(/https?:\/\/([^/]+)/)[1],
    I1llliil = "venderId=" + illi1i1 + "&pin=" + iiIiIll1 + "&activityId=" + ililllI + "&actType=" + I11l1li + "&prizeName=" + encodeURIComponent(lliIIl) + "&receiver=" + encodeURIComponent(iil11llI) + "&phone=" + IiiI1ii + "&province=" + encodeURIComponent(iIIliiI) + "&city=" + encodeURIComponent(iIliIi1) + "&county=" + encodeURIComponent(ll1I1l1l) + "&areaCode=" + llIiIIlI + "&address=" + encodeURIComponent(Ii1l1l1i) + "&generateId=" + IllII1lI + "&postalCode=" + IIi1iII,
    lIIi1Ili = false;
  try {
    let lliillil = await Ill1Il1I.post(I1lIi11 + "/wxAddress/save", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": illIiiII,
        "Origin": I1lIi11,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": I1lIi11 + "/wxAddress/save",
        "Cookie": iIiIlilI,
        "User-Agent": llIi1llI
      },
      "body": I1llliil
    }).json().catch(Il1iill1 => {});
    if (lliillil && lliillil.result) {
      console.log("");
      console.log("\n已自动提交收货地址 ✅\n");
      lIIi1Ili = true;
    } else {
      if (lliillil.errorMessage) {} else {}
    }
  } catch (illillIl) {}
  return lIIi1Ili;
}
async function llIIi1i() {
  if (!$.joinVenderId) return;
  return new Promise(async illiIi1i => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iii1IIl1 = "";
    if ($.shopactivityId) iii1IIl1 = ",\"activityId\":" + $.shopactivityId;
    const Iil1Ii1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iii1IIl1 + ",\"channel\":406}",
      li1liiII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Iil1Ii1i)
      };
    for (var ii1IlIii = "", iIlIiIll = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", I1lIlliI = 0; I1lIlliI < 16; I1lIlliI++) {
      var IillIiil = Math.round(Math.random() * (iIlIiIll.length - 1));
      ii1IlIii += iIlIiIll.substring(IillIiil, IillIiil + 1);
    }
    uuid = Buffer.from(ii1IlIii, "utf8").toString("base64");
    ep = encodeURIComponent(JSON.stringify({
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "ts": new Date().getTime(),
      "ridx": -1,
      "cipher": {
        "screen": "CJS0CseyCtK4",
        "osVersion": "CJGkEK==",
        "uuid": uuid
      },
      "ciphertype": 5,
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile"
    }));
    const lIliIl1I = await I1IIIlI("8adfb", li1liiII),
      lIIII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Iil1Ii1i + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIliIl1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1i1li1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIIII, async (II1li1II, ilIIl1lI, Il1lli1) => {
      try {
        if (II1li1II) {
          if (ilIIl1lI && typeof ilIIl1lI.statusCode != "undefined") {
            if (ilIIl1lI.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          Il1lli1 = Il1lli1 && Il1lli1.match(/jsonp_.*?\((.*?)\);/) && Il1lli1.match(/jsonp_.*?\((.*?)\);/)[1] || Il1lli1;
          let liIilIii = $.toObj(Il1lli1, Il1lli1);
          if (liIilIii && typeof liIilIii == "object") {
            if (liIilIii && liIilIii.success === true) {
              console.log(" >> " + liIilIii.message);
              $.errorJoinShop = liIilIii.message;
              if (liIilIii.result && liIilIii.result.giftInfo) for (let iIlllii of liIilIii.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + iIlllii.discountString + iIlllii.prizeName + iIlllii.secondLineDesc);
              }
            } else liIilIii && typeof liIilIii == "object" && liIilIii.message ? ($.errorJoinShop = liIilIii.message, console.log("" + (liIilIii.message || ""))) : console.log(Il1lli1);
          } else console.log(Il1lli1);
        }
      } catch (Iii1iIl1) {
        $.logErr(Iii1iIl1, ilIIl1lI);
      } finally {
        illiIi1i();
      }
    });
  });
}
async function IliIl1i() {
  return new Promise(async ilIll1i1 => {
    const Ii1ililI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      ll1lii1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ii1ililI)
      },
      liiI1II1 = await I1IIIlI("8adfb", ll1lii1i),
      I11i11 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Ii1ililI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(liiI1II1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1i1li1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I11i11, async (l1I1li1l, l11I11i1, Ii1IIiI1) => {
      try {
        Ii1IIiI1 = Ii1IIiI1 && Ii1IIiI1.match(/jsonp_.*?\((.*?)\);/) && Ii1IIiI1.match(/jsonp_.*?\((.*?)\);/)[1] || Ii1IIiI1;
        let iiil11l = $.toObj(Ii1IIiI1, Ii1IIiI1);
        if (iiil11l && typeof iiil11l == "object") {
          if (iiil11l && iiil11l.success == true) {
            console.log("去加入：" + (iiil11l.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
            $.shopactivityId = iiil11l.result.interestsRuleList && iiil11l.result.interestsRuleList[0] && iiil11l.result.interestsRuleList[0].interestsInfo && iiil11l.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else console.log(Ii1IIiI1);
      } catch (Ii1iill1) {
        $.logErr(Ii1iill1, l11I11i1);
      } finally {
        ilIll1i1();
      }
    });
  });
}
function IIiliIIi(iIi1Ill) {
  if (iIi1Ill) {
    if (iIi1Ill.headers["set-cookie"]) {
      l1i1li1l = "" + originCookie;
      for (let ilIIiIii of iIi1Ill.headers["set-cookie"]) {
        IllI11i1[ilIIiIii.split(";")[0].substr(0, ilIIiIii.split(";")[0].indexOf("="))] = ilIIiIii.split(";")[0].substr(ilIIiIii.split(";")[0].indexOf("=") + 1);
      }
      for (const i1l1iIi of Object.keys(IllI11i1)) {
        l1i1li1l += i1l1iIi + "=" + IllI11i1[i1l1iIi] + ";";
      }
      I1lI1Ili = l1i1li1l;
    }
  }
}
function l1l11IlI() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + i1lllIl1(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function lil1IIi1(i1I1III, Iiliill) {
  return Math.floor(Math.random() * (Iiliill - i1I1III)) + i1I1III;
}
function i1lllIl1(lI1ilIIi) {
  lI1ilIIi = lI1ilIIi || 32;
  let ll1iIi1 = "abcdef0123456789",
    lIIIli1 = ll1iIi1.length,
    iiIllIil = "";
  for (i = 0; i < lI1ilIIi; i++) iiIllIil += ll1iIi1.charAt(Math.floor(Math.random() * lIIIli1));
  return iiIllIil;
}
function ii1iiiIi() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const i1ll1ii = Array.from(new Set($.blacklist.split("&")));
  console.log(i1ll1ii.join("&") + "\n");
  let IIilili = i1ll1ii,
    lI1iIiIl = [],
    lIIIiiil = false;
  for (let i11iil1i = 0; i11iil1i < i111l11l.length; i11iil1i++) {
    let Il1IliI = decodeURIComponent(i111l11l[i11iil1i].match(/pt_pin=([^; ]+)(?=;?)/) && i111l11l[i11iil1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!Il1IliI) break;
    let Iiii1lIi = false;
    for (let iiI11Ill of IIilili) {
      if (iiI11Ill && iiI11Ill == Il1IliI) {
        Iiii1lIi = true;
        break;
      }
    }
    !Iiii1lIi && (lIIIiiil = true, lI1iIiIl.splice(i11iil1i, -1, i111l11l[i11iil1i]));
  }
  if (lIIIiiil) i111l11l = lI1iIiIl;
}
function iiIl1I(iI11i1Ii, Ii1Iliii) {
  Ii1Iliii != 0 && iI11i1Ii.unshift(iI11i1Ii.splice(Ii1Iliii, 1)[0]);
}
function Ii1l1ii1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(i111l11l, i111l11l));
    return;
  }
  console.log("当前已设置白名单：");
  const IiiIl1II = Array.from(new Set($.whitelist.split("&")));
  console.log(IiiIl1II.join("&") + "\n");
  let IIl1lIli = [],
    illil1lI = IiiIl1II;
  for (let lllIliIl in i111l11l) {
    let Il11i1li = decodeURIComponent(i111l11l[lllIliIl].match(/pt_pin=([^; ]+)(?=;?)/) && i111l11l[lllIliIl].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (illil1lI.includes(Il11i1li)) {
      IIl1lIli.push(i111l11l[lllIliIl]);
    }
  }
  helpCookiesArr = IIl1lIli;
  if (illil1lI.length > 1) for (let IIIIiIl in illil1lI) {
    let lii1IIil = illil1lI[illil1lI.length - 1 - IIIIiIl];
    if (!lii1IIil) continue;
    for (let l1i11ll1 in helpCookiesArr) {
      let i11ll1iI = decodeURIComponent(helpCookiesArr[l1i11ll1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[l1i11ll1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      lii1IIil == i11ll1iI && iiIl1I(helpCookiesArr, l1i11ll1);
    }
  }
}
function l1IIl11l(IIIillil) {
  if (!IIIillil) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(IIIillil) == "object") {
      return true;
    }
  } catch (iI1lIll1) {
    return console.log(iI1lIll1), false;
  }
}
function IiI1iIII(l1llI1i, IillIl11) {
  let iIil1i11 = new RegExp("(^|[&?])" + IillIl11 + "=([^&]*)(&|$)"),
    llI1I1li = l1llI1i.match(iIil1i11);
  if (llI1I1li != null) {
    return unescape(llI1I1li[2]);
  }
  return "";
}