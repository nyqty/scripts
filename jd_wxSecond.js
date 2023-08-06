/*
活动名称：读秒拼手速 · 超级无线
活动链接：https://lzkjdz-isv.isvjd.com/wxSecond/activity/activity?activityId=<活动id>
环境变量：jd_wxSecond_activityId // 活动id、链接均可
         jd_wxSecond_addCart // 是否做加购任务，默认不做
				 JD_LZ_OPEN  //关闭LZ相关活动运行
				 jd_wxSecond_blacklist // 黑名单 用&隔开 pin值

默认助力第一个号，脚本自动入会，不想入会勿跑！

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#读秒拼手速通用活动
1 1 1 1 * jd_wxSecond.js, tag=读秒拼手速通用活动, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('读秒拼手速（超级无线）')
const Il11i = $.isNode() ? require("./jdCookie") : "",
  illl11 = $.isNode() ? require("./sendNotify") : "",
  iiI1 = require("./function/krgetToken"),
  Il11l = require("./function/krh5st"),
  l1iiil = require("./function/krgetua"),
  l1ilI = require("./function/krwxSavePrize");
let IIi1 = {},
  illl1i = [],
  l1iiii = "";
if ($.isNode()) {
  Object.keys(Il11i).forEach(illIIl => {
    illl1i.push(Il11i[illIIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else illl1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...illIIi($.getdata("CookiesJD") || "[]").map(iiiIlI => iiiIlI.cookie)].filter(I1i11 => !!I1i11);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iiiIi1 = "",
  illl1l = "",
  Il11I = process.env.jd_wxSecond_activityId ? process.env.jd_wxSecond_activityId : "",
  li1lll = process.env.jd_wxSecond_addCart ? process.env.jd_wxSecond_addCart : "false",
  lill1 = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  IiIIl = "",
  IiIIi = "";
$.whitelist = process.env.jd_wxSecond_whitelist || IiIIl;
$.blacklist = process.env.jd_wxSecond_blacklist || IiIIi;
lIi1I1();
l1iill();
Il11I && (Il11I.includes("activityId=") ? activityId = Iil1I("" + Il11I, "activityId") : activityId = Il11I);
!(async () => {
  if (lill1 === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!illl1i[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = activityId;
  $.shareUuid = "";
  $.activityUrl = "https://lzkjdz-isv.isvjd.com/wxSecond/activity?activityId=" + $.activityId;
  console.log("活动入口：" + $.activityUrl);
  for (let i1Ii1l = 0; i1Ii1l < illl1i.length; i1Ii1l++) {
    l1iiii = illl1i[i1Ii1l];
    originCookie = illl1i[i1Ii1l];
    if (l1iiii) {
      $.UserName = decodeURIComponent(l1iiii.match(/pt_pin=([^; ]+)(?=;?)/) && l1iiii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1Ii1l + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.UA = await l1iiil($.UserName);
      await li1lli();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  l1iiii = illl1i[0];
  l1iiii && $.assistStatus && !$.outFlag && !$.activityEnd && ($.UserName = decodeURIComponent(l1iiii.match(/pt_pin=([^; ]+)(?=;?)/) && l1iiii.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = 1, message = "", $.bean = 0, $.hotFlag = false, $.nickName = "", console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n"), await $.wait(parseInt(Math.random() * 2000 + 4000, 10)), $.UA = await l1iiil($.UserName), await li1lli());
  if ($.outFlag) {
    let iilliI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iilliI);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(ilI1ii => $.logErr(ilI1ii)).finally(() => $.done());
async function li1lli() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    iiiIi1 = "";
    $.Token = "";
    $.Pin = "";
    $.Raglan = false;
    $.Token = await iiI1(originCookie, "https://lzkjdz-isv.isvjd.com");
    await $.wait(500);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await l1ili();
    if (illl1l == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    if ($.index == 1) await iiiIl1("getSimpleActInfoVo");
    await iiiIl1("getMyPing");
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await iiiIl1("accessLogWithAD");
    await iiiIl1("getActMemberInfo");
    if (!$.openCard) {
      $.shopactivityId = "";
      $.joinVenderId = $.venderId;
      await iiIl();
      for (let I111i1 = 0; I111i1 < Array(2).length; I111i1++) {
        if (I111i1 > 0) console.log("第" + I111i1 + "次 重新开卡");
        await iiIi();
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
      }
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 可能是开卡黑号,跳过运行");
        return;
      }
    }
    await iiiIl1("activityContent");
    if ($.Raglan) {
      return;
    }
    let iii11i = new Date().valueOf();
    $.startTimeStr = new Date($.startTime).valueOf();
    $.endTimeStr = new Date($.endTime).valueOf();
    if ($.endTimeStr <= iii11i) {
      console.log("活动已经结束了~");
      $.activityEnd = true;
      return;
    }
    if ($.startTimeStr >= iii11i) {
      console.log("活动开始时间：" + new Date(parseInt($.startTime)).toLocaleString());
      $.activityEnd = true;
      return;
    }
    await $.wait(500);
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.index == 1) {
      let iil1Il = prizeId = prizeName = "";
      for (let IlIll = 0; IlIll < $.prizeList.length; IlIll++) {
        prizeName = $.prizeList[IlIll].name;
        prizeId = $.prizeList[IlIll].id;
        if (prizeId == 0) {
          iil1Il += "谢谢参与";
          break;
        } else {
          IlIll != $.prizeList.length - 1 ? iil1Il += prizeName + "，" : iil1Il += "" + prizeName;
        }
      }
      await iiiIl1("getShopInfoVO");
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      console.log("店铺名称：" + ($.shopName || "未知") + "\n店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + iil1Il + "\n");
    }
    let iii11l = false;
    for (let iliil1 = 0; iliil1 < 3; iliil1++) {
      switch (iliil1) {
        case 0:
          await iiiIl1("getTaskGame");
          break;
        case 1:
          await iiiIl1("getTaskDay");
          break;
        case 2:
          await iiiIl1("getTask");
          break;
      }
      await $.wait(500);
      var ilI1il = [2, 3, 4, 5];
      if ($.tasklist.length > 0) {
        for (let IIllI1 = 0; IIllI1 < $.tasklist.length; IIllI1++) {
          $.taskType = $.tasklist[IIllI1].taskType;
          $.commodity = $.tasklist[IIllI1].commodity;
          $.dayMaxNumber = $.tasklist[IIllI1].dayMaxNumber;
          $.finishNumber = $.tasklist[IIllI1].finishNumber;
          $.needTimes = $.commodity * $.dayMaxNumber;
          if ($.dayMaxNumber == $.finishNumber) continue;
          if (ilI1il.includes($.taskType)) {
            iii11l = true;
            if ($.taskType == 2 && li1lll == "false") continue;
            let iil1II = "";
            switch ($.taskType) {
              case 2:
                iil1II = "加购";
                break;
              case 3:
                iil1II = "关注";
                break;
              case 4:
                iil1II = "预约";
                break;
              case 5:
                iil1II = "浏览";
                break;
              default:
                break;
            }
            $.activityTaskGoods = $.tasklist[IIllI1].activityTaskGoods;
            for (let iii11I = 0; iii11I < $.activityTaskGoods.length; iii11I++) {
              console.log("去" + iil1II + "商品");
              $.skuId = $.activityTaskGoods[iii11I].skuId;
              await iiiIl1("finishTask");
              await $.wait(500);
              if ($.taskResult) $.score += $.newScore;
              if (iii11I == $.needTimes - 1) break;
            }
          } else {
            $.skuId = "";
            switch ($.taskType) {
              case 1:
                iii11l = true;
                console.log("去关注店铺");
                await iiiIl1("finishTask");
                await $.wait(500);
                if ($.taskResult) $.score += $.newScore;
                break;
              case 9:
                break;
              case 12:
                iii11l = true;
                console.log("去逛会场");
                await iiiIl1("finishTask");
                await $.wait(500);
                if ($.taskResult) $.score += $.newScore;
                break;
              case 99:
                break;
              default:
                break;
            }
          }
        }
      }
    }
    if ($.score > 0) {
      let l1IliI = parseInt($.score / 1);
      for (m = 1; l1IliI--; m++) {
        await iiiIl1("activityContent");
        await $.wait(500);
        await iiiIl1("checkAuth");
        await $.wait(500);
        await iiiIl1("start");
        if ($.runFalag == false) break;
        if (Number(l1IliI) <= 0) break;
        if (m >= 10) {
          console.log("\n挑战太多次了，下次再继续吧~");
          break;
        }
        await $.wait(parseInt(Math.random() * 3000 + 1000, 10));
      }
    } else {
      $.assistStatus = true;
      console.log("没有参与机会了，下次再来吧~");
    }
    await $.wait(1000);
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
    }
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
  } catch (IlIlI) {
    console.log(IlIlI);
  }
}
async function iiiIl1(II1i1l) {
  if ($.outFlag) return;
  let Il1iiI = "https://lzkjdz-isv.isvjd.com",
    iIil1 = "",
    l1IllI = "POST";
  switch (II1i1l) {
    case "getMyPing":
      url = Il1iiI + "/customer/getMyPing";
      iIil1 = "token=" + $.Token + "&fromType=APP&userId=" + $.venderId + "&pin=";
      break;
    case "getSimpleActInfoVo":
      url = Il1iiI + "/customer/getSimpleActInfoVo";
      iIil1 = "activityId=" + $.activityId;
      break;
    case "getActMemberInfo":
      url = Il1iiI + "/wxCommonInfo/getActMemberInfo";
      iIil1 = "venderId=" + ($.venderId || "") + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "accessLogWithAD":
      url = Il1iiI + "/common/accessLogWithAD";
      let iIiil = "https://lzkjdz-isv.isvjd.com/wxSecond/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      iIil1 = "venderId=" + ($.venderId || "") + "&code=71&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iIiil) + "&subType=app&adSource=";
      break;
    case "getOpenCardStatusWithOutSelf":
      url = Il1iiI + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      iIil1 = "venderId=" + ($.venderId || "") + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = Il1iiI + "/wxSecond/getData";
      iIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid + "&activityStatus=";
      break;
    case "getShopInfoVO":
      url = Il1iiI + "/wxActionCommon/getShopInfoVO";
      iIil1 = "userId=" + $.venderId;
      break;
    case "getTaskGame":
      url = Il1iiI + "/wxSecond/getTaskGame";
      iIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "getTaskDay":
      url = Il1iiI + "/wxSecond/getTaskDay";
      iIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "getTask":
      url = Il1iiI + "/wxSecond/getTask";
      iIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "finishTask":
      url = Il1iiI + "/wxSecond/finishTask";
      iIil1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&taskType=" + $.taskType + "&skuId=" + $.skuId;
      break;
    case "checkAuth":
      url = Il1iiI + "/wxSecond/checkAuth";
      iIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&brushBane=" + encodeURIComponent($.brushBane) + "&bid=" + $.bid;
      break;
    case "start":
      url = Il1iiI + "/wxSecond/start";
      iIil1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&seconds=" + $.targetTime + "&brushBane=" + encodeURIComponent($.brushResult) + "&bid=" + $.bid;
      break;
    default:
      console.log("错误" + II1i1l);
  }
  let lIi1Ii = IIl1(url, iIil1, l1IllI);
  return new Promise(async IIiIIi => {
    $.post(lIi1Ii, (iI11li, lIi11, i11II1) => {
      try {
        i1Ii11(lIi11);
        if (iI11li) {
          if (lIi11 && typeof lIi11.statusCode != "undefined") {
            lIi11.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          }
          console.log("" + $.toStr(iI11li, iI11li));
          console.log("API请求失败，请检查网路重试");
        } else I1i1I(II1i1l, i11II1);
      } catch (iI11ll) {
        console.log(iI11ll, lIi11);
      } finally {
        IIiIIi();
      }
    });
  });
}
async function I1i1I(IIiII1, lIi1I) {
  let Ill1li = "";
  try {
    (IIiII1 != "accessLogWithAD" || IIiII1 != "drawContent") && lIi1I && (Ill1li = JSON.parse(lIi1I));
  } catch (IIlIii) {
    console.log("执行任务异常");
    console.log(IIlIii);
    $.runFalag = false;
  }
  try {
    switch (IIiII1) {
      case "getMyPing":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) {
            if (Ill1li.data && typeof Ill1li.data.secretPin != "undefined") $.Pin = Ill1li.data.secretPin;
            Ill1li.data && typeof Ill1li.data.nickname != "undefined" && ($.nickname = Ill1li.data.nickname);
          } else {
            if (Ill1li.errorMessage) {
              console.log("" + (Ill1li.errorMessage || ""));
            } else console.log("" + lIi1I);
          }
        } else console.log("" + lIi1I);
        break;
      case "getSimpleActInfoVo":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) {
            if (typeof Ill1li.data.shopId != "undefined") $.shopId = Ill1li.data.shopId;
            if (typeof Ill1li.data.venderId != "undefined") $.venderId = Ill1li.data.venderId;
            if (typeof Ill1li.data.activityType != "undefined") $.activityType = Ill1li.data.activityType;
          } else {
            if (Ill1li.errorMessage) console.log("" + (Ill1li.errorMessage || ""));else {
              console.log("" + lIi1I);
            }
          }
        } else console.log("" + lIi1I);
        break;
      case "getActMemberInfo":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) $.openCard = Ill1li.data.openCard || false;else Ill1li.errorMessage && console.log("" + (Ill1li.errorMessage || ""));
        } else console.log("" + lIi1I);
        break;
      case "activityContent":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) {
            $.endTime = Ill1li.data.endTime || "";
            $.startTime = Ill1li.data.startTime || "";
            $.actorUuid = Ill1li.data.uuid || "";
            $.name = Ill1li.data.secondActive.name || "";
            $.targetTime = Ill1li.data.secondActive.targetTime || "";
            $.score = Ill1li.data.score || 0;
            $.prizeList = Ill1li.data.prizeList || [];
            $.bid = Ill1li.data.bid || 0;
            $.brushBane = Ill1li.data.brushBane || "";
          } else {
            if (Ill1li.errorMessage) {
              if (Ill1li.errorMessage.indexOf("结束") > -1) {
                $.activityEnd = true;
              } else Ill1li.errorMessage.includes("擦肩") && ($.Raglan = true);
              console.log("" + (Ill1li.errorMessage || ""));
            } else console.log("" + lIi1I);
          }
        } else console.log("" + lIi1I);
        break;
      case "getShopInfoVO":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) $.shopName = Ill1li.data.shopName || "";else Ill1li.errorMessage ? console.log("" + (Ill1li.errorMessage || "")) : console.log("" + lIi1I);
        } else console.log("" + lIi1I);
        break;
      case "getTaskGame":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) $.tasklist = Ill1li.data;else Ill1li.errorMessage ? console.log("" + (Ill1li.errorMessage || "")) : console.log("" + lIi1I);
        } else console.log("" + lIi1I);
        break;
      case "checkAuth":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) {
            $.bid = Ill1li.data.data.bid;
            $.brushResult = Ill1li.data.data.brushResult;
          } else Ill1li.errorMessage ? console.log("" + (Ill1li.errorMessage || "")) : console.log("" + lIi1I);
        } else console.log("" + lIi1I);
        break;
      case "getTaskDay":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) $.tasklist = Ill1li.data;else Ill1li.errorMessage ? console.log("" + (Ill1li.errorMessage || "")) : console.log("" + lIi1I);
        } else console.log("" + lIi1I);
        break;
      case "getTask":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) {
            $.tasklist = Ill1li.data;
          } else Ill1li.errorMessage ? console.log("" + (Ill1li.errorMessage || "")) : console.log("" + lIi1I);
        } else console.log("" + lIi1I);
        break;
      case "finishTask":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) {
            $.taskResult = Ill1li.data;
            $.newScore = $.taskResult.score;
            console.log("  >> 任务完成");
          } else {
            if (Ill1li.errorMessage) {
              console.log("  >> " + (Ill1li.errorMessage || "任务失败"));
            } else console.log("" + lIi1I);
          }
        } else console.log("" + lIi1I);
        break;
      case "start":
        if (typeof Ill1li == "object") {
          if (Ill1li.result && Ill1li.result === true) {
            if (Ill1li.data.draw.drawOk === true) {
              let lI1i1I = Ill1li.data.draw.drawInfo;
              switch (lI1i1I.type) {
                case 6:
                  console.log("🎉 " + lI1i1I.name + " 🐶");
                  break;
                case 7:
                  const l111II = Ill1li.data.draw.addressId;
                  prizeName = lI1i1I.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  console.log("参考价值：" + lI1i1I.priceInfo + "（元）");
                  if (lI1i1I.showImage) console.log("预览图片：" + lI1i1I.showImage);
                  let IiIII1 = await l1ilI("https://lzkjdz-isv.isvjd.com", l1iiii, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, l111II);
                  if (IiIII1) $.isNode() && (await illl11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + $.activityUrl));else {
                    if ($.isNode()) {
                      await illl11.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl);
                    }
                  }
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + lI1i1I.name + " 🎟️");
                  break;
                case 13:
                case 14:
                case 15:
                  console.log("🎉 恭喜获得" + lI1i1I.name + " 🎁");
                  $.isNode() && (await illl11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lI1i1I.name + "\n\n" + $.activityUrl));
                  break;
                case 16:
                  console.log("🎉 " + lI1i1I.priceInfo + " 🧧");
                  break;
                default:
                  lI1i1I.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + lI1i1I.name);
                  break;
              }
            } else console.log("💨 空气");
          } else {
            if (Ill1li.errorMessage) {
              console.log("" + (Ill1li.errorMessage || ""));
            } else console.log("" + lIi1I);
          }
        } else {
          console.log("抽了个寂寞～");
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IIiII1 + "-> " + lIi1I);
    }
    typeof Ill1li == "object" && Ill1li.errorMessage && Ill1li.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (l1II11) {
    console.log(l1II11);
  }
}
function IIl1(iIl1Ii, ll1l1i, iI1iI1 = "POST") {
  let i1IIil = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": l1iiii,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iIl1Ii.indexOf("https://lzkjdz-isv.isvjd.com") > -1 && (i1IIil.Referer = "https://lzkjdz-isv.isvjd.com/wxSecond/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, i1IIil.Cookie = "" + (iiiIi1 && iiiIi1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + illl1l), {
    "url": iIl1Ii,
    "method": iI1iI1,
    "headers": i1IIil,
    "body": ll1l1i,
    "timeout": 30000
  };
}
function l1ili() {
  return new Promise(iiliI1 => {
    let iiii11 = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://lzkjdz-isv.isvjd.com/wxSecond/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iiii11, async (I11llI, I1IIi, iiii1I) => {
      try {
        if (I11llI) {
          I1IIi && typeof I1IIi.statusCode != "undefined" && I1IIi.statusCode == 493 && (console.log("getCk 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          console.log(String(I11llI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let i1IIlI = iiii1I.match(/(活动已经结束)/) && iiii1I.match(/(活动已经结束)/)[1] || "";
          if (i1IIlI) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          i1Ii11(I1IIi);
        }
      } catch (ii11ii) {
        $.logErr(ii11ii, I1IIi);
      } finally {
        iiliI1();
      }
    });
  });
}
function i1Ii11(ll1l11) {
  if (ll1l11) {
    if (ll1l11.headers["set-cookie"]) {
      l1iiii = "";
      for (let i111ll of ll1l11.headers["set-cookie"]) {
        IIi1[i111ll.split(";")[0].substr(0, i111ll.split(";")[0].indexOf("="))] = i111ll.split(";")[0].substr(i111ll.split(";")[0].indexOf("=") + 1);
      }
      for (const I11lll of Object.keys(IIi1)) {
        l1iiii += I11lll + "=" + IIi1[I11lll] + ";";
      }
      illl1l = l1iiii;
    }
  }
}
function l1iill() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const Ilii = Array.from(new Set($.blacklist.split("&")));
  console.log(Ilii.join("&") + "\n");
  let lIl111 = Ilii,
    Ilil = [],
    i1IIli = false;
  for (let i111lI = 0; i111lI < illl1i.length; i111lI++) {
    let ii11lI = decodeURIComponent(illl1i[i111lI].match(/pt_pin=([^; ]+)(?=;?)/) && illl1i[i111lI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ii11lI) break;
    let ilI1l = false;
    for (let I1l11 of lIl111) {
      if (I1l11 && I1l11 == ii11lI) {
        ilI1l = true;
        break;
      }
    }
    !ilI1l && (i1IIli = true, Ilil.splice(i111lI, -1, illl1i[i111lI]));
  }
  if (i1IIli) illl1i = Ilil;
}
function l1ill(lIiIIi, IiIl11) {
  IiIl11 != 0 && lIiIIi.unshift(lIiIIi.splice(IiIl11, 1)[0]);
}
function lIi1I1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(illl1i, illl1i));
    return;
  }
  console.log("当前已设置白名单：");
  const ilI1i = Array.from(new Set($.whitelist.split("&")));
  console.log(ilI1i.join("&") + "\n");
  let llIiI1 = [],
    li1li1 = ilI1i;
  for (let il1Iil in illl1i) {
    let ii11ll = decodeURIComponent(illl1i[il1Iil].match(/pt_pin=([^; ]+)(?=;?)/) && illl1i[il1Iil].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    li1li1.includes(ii11ll) && llIiI1.push(illl1i[il1Iil]);
  }
  helpCookiesArr = llIiI1;
  if (li1li1.length > 1) for (let lili1l in li1li1) {
    let iI1iIi = li1li1[li1li1.length - 1 - lili1l];
    if (!iI1iIi) continue;
    for (let iI1iIl in helpCookiesArr) {
      let lili1i = decodeURIComponent(helpCookiesArr[iI1iIl].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iI1iIl].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      iI1iIi == lili1i && l1ill(helpCookiesArr, iI1iIl);
    }
  }
}
function l1iili(IiIIIl) {
  IiIIIl = IiIIIl || 32;
  let lI11l = "abcdef0123456789",
    iI1Il = lI11l.length,
    i111il = "";
  for (i = 0; i < IiIIIl; i++) i111il += lI11l.charAt(Math.floor(Math.random() * iI1Il));
  return i111il;
}
function illIIi(lIil11) {
  if (typeof lIil11 == "string") {
    try {
      return JSON.parse(lIil11);
    } catch (il1Ii1) {
      return console.log(il1Ii1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function iiIi() {
  if (!$.joinVenderId) return;
  return new Promise(async II1iIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let II1iIi = "";
    if ($.shopactivityId) II1iIi = ",\"activityId\":" + $.shopactivityId;
    const iI1iI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + II1iIi + ",\"channel\":406}",
      Ii11I1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iI1iI)
      },
      li1IiI = await Il11l("8adfb", Ii11I1),
      Illl = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iI1iI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(li1IiI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Illl, async (Illi, l1IiiI, II1iI1) => {
      try {
        II1iI1 = II1iI1 && II1iI1.match(/jsonp_.*?\((.*?)\);/) && II1iI1.match(/jsonp_.*?\((.*?)\);/)[1] || II1iI1;
        let II1iII = $.toObj(II1iI1, II1iI1);
        if (II1iII && typeof II1iII == "object") {
          if (II1iII && II1iII.success === true) {
            console.log(II1iII.message);
            $.errorJoinShop = II1iII.message;
            if (II1iII.result && II1iII.result.giftInfo) {
              for (let il11Ii of II1iII.result.giftInfo.giftList) {
                console.log("入会获得: " + il11Ii.discountString + il11Ii.prizeName + il11Ii.secondLineDesc);
              }
            }
            console.log("");
          } else II1iII && typeof II1iII == "object" && II1iII.message ? ($.errorJoinShop = II1iII.message, console.log("" + (II1iII.message || ""))) : console.log(II1iI1);
        } else console.log(II1iI1);
      } catch (ill1i) {
        $.logErr(ill1i, l1IiiI);
      } finally {
        II1iIl();
      }
    });
  });
}
async function iiIl() {
  return new Promise(async li1Il1 => {
    let ilII1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IIilII = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ilII1l)
      },
      l1Iil1 = await Il11l("ef79a", IIilII),
      IIiIl = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ilII1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1Iil1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIiIl, async (iiiiI1, IIiIi, i1ii1i) => {
      try {
        i1ii1i = i1ii1i && i1ii1i.match(/jsonp_.*?\((.*?)\);/) && i1ii1i.match(/jsonp_.*?\((.*?)\);/)[1] || i1ii1i;
        let iiii = $.toObj(i1ii1i, i1ii1i);
        iiii && typeof iiii == "object" ? iiii && iiii.success == true && (console.log("\n去加入店铺会员：" + (iiii.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = iiii.result.interestsRuleList && iiii.result.interestsRuleList[0] && iiii.result.interestsRuleList[0].interestsInfo && iiii.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(i1ii1i);
      } catch (iiil) {
        $.logErr(iiil, IIiIi);
      } finally {
        li1Il1();
      }
    });
  });
}
function Iil1I(li1Iil, ill11) {
  let iiIIil = new RegExp("(^|[&?])" + ill11 + "=([^&]*)(&|$)"),
    iiIIii = li1Iil.match(iiIIil);
  if (iiIIii != null) return unescape(iiIIii[2]);
  return "";
}