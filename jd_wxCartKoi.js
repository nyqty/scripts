/*
活动名称：购物车锦鲤 · 超级无线
活动链接：https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity/activity?activityId=<活动id>
变量：
//export jd_wxCartKoi_activityId="活动ID、链接均可"
//export JD_LZ_OPEN="false" //关闭LZ相关活动运行
//export jd_wxCartKoi_blacklist="" //黑名单 用&隔开 pin值
活动网址：
//https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId=xxxxxxx

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#购物车锦鲤通用活动
1 1 1 1 * jd_wxCartKoi.js, tag=购物车锦鲤通用活动, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('购物车锦鲤（超级无线）')
const i1Ililli = $.isNode() ? require("./jdCookie") : "",
  i111lI11 = $.isNode() ? require("./sendNotify") : "",
  I1ll1IiI = require("./function/krgetToken"),
  i111illI = require("./function/krh5st"),
  il1Ii1i1 = require("./function/krgetua"),
  lIIil1i = require("./function/krwxSavePrize");
let IiiI1IiI = {},
  I1IiiI1i = [],
  iiiil1iI = "";
if ($.isNode()) {
  Object.keys(i1Ililli).forEach(l1ii1lI1 => {
    I1IiiI1i.push(i1Ililli[l1ii1lI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1IiiI1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIIlIIl1($.getdata("CookiesJD") || "[]").map(lIll1I1I => lIll1I1I.cookie)].filter(iIl11iII => !!iIl11iII);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let Iii11iIl = "",
  Il1lllil = "",
  ill1IIll = process.env.jd_wxCartKoi_activityId ? process.env.jd_wxCartKoi_activityId : "",
  liilIili = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  lilI1ili = "",
  IllilIll = "";
$.whitelist = process.env.jd_wxCartKoi_whitelist || lilI1ili;
$.blacklist = process.env.jd_wxCartKoi_blacklist || IllilIll;
Iiilll1I();
iIlli1li();
ill1IIll && (ill1IIll.includes("activityId=") ? activityId = illIilII("" + ill1IIll, "activityId") : activityId = ill1IIll);
!(async () => {
  if (liilIili === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!I1IiiI1i[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = activityId;
  $.shareUuid = "";
  console.log("活动入口：https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId);
  for (let iilliiII = 0; iilliiII < I1IiiI1i.length; iilliiII++) {
    iiiil1iI = I1IiiI1i[iilliiII];
    originCookie = I1IiiI1i[iilliiII];
    if (iiiil1iI) {
      $.UserName = decodeURIComponent(iiiil1iI.match(/pt_pin=([^; ]+)(?=;?)/) && iiiil1iI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iilliiII + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.UA = await il1Ii1i1($.UserName);
      await lIiiilIl();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let iI1lill = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iI1lill);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(illIIl1I => $.logErr(illIIl1I)).finally(() => $.done());
async function lIiiilIl() {
  try {
    $.assistCount = 0;
    Iii11iIl = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await I1ll1IiI(originCookie, "https://lzkjdz-isv.isvjd.com");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await Il11lII1();
    if (Il1lllil == "") {
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
    if ($.index == 1) await ll1Ii1II("getSimpleActInfoVo");
    if (!$.venderId) {
      console.log("未能获取到店铺id");
      $.activityEnd = true;
      return;
    }
    await ll1Ii1II("getMyPing");
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await ll1Ii1II("accessLogWithAD");
    await $.wait(500);
    await ll1Ii1II("getActMemberInfo");
    await $.wait(500);
    await ll1Ii1II("getUserInfo");
    await $.wait(500);
    await ll1Ii1II("activityContent");
    await $.wait(500);
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.index == 1) {
      await ll1Ii1II("shopInfo");
      await $.wait(500);
      await ll1Ii1II("getDrawPrizeInfo");
      console.log("店铺名称：" + ($.shopName || "未知") + "\n参与人数：" + $.joins + "\n抽奖时间：" + $.drawTime + "\n结束时间：" + $.cartEndTime + "\n");
      await $.wait(500);
    }
    await ll1Ii1II("followShop");
    if ($.need_openCard == true) return;
    await $.wait(500);
    let I1Ii1II = new Date().valueOf();
    $.cartStartTimeStr = new Date($.cartStartTime).valueOf();
    $.cartEndTimeStr = new Date($.cartEndTime).valueOf();
    $.drawTimeStr = new Date($.drawTime).valueOf();
    $.endTimeStr = new Date($.endTime).valueOf();
    if (I1Ii1II >= $.endTimeStr) {
      console.log("活动已经结束！");
      $.activityEnd = true;
      return;
    } else {
      if (I1Ii1II < $.cartStartTimeStr) {
        console.log("活动尚未开始！");
        $.activityEnd = true;
        return;
      } else {
        if (I1Ii1II <= $.cartEndTimeStr) {
          if ($.addCarts == $.totals) console.log("已加购过了，请活动结束再来吧~");else {
            if (!$.openCard) {
              $.shopactivityId = "";
              $.joinVenderId = $.venderId;
              await l1liI1iI();
              for (let iIilllli = 0; iIilllli < Array(5).length; iIilllli++) {
                if (iIilllli > 0) console.log("第" + iIilllli + "次 重新开卡");
                await i11llIl1();
                await $.wait(500);
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
                  break;
                }
              }
            }
            console.log("活动进行中，开始加购~\n");
            try {
              if ($.prodectVos.length > 0) for (const li11iiI1 of $.prodectVos) {
                if (li11iiI1.collection) continue;
                $.productId = li11iiI1.productId;
                await ll1Ii1II("addCart");
                if ($.outFlag) {
                  console.log("\n此ip已被限制，请过10分钟后再执行脚本");
                  return;
                }
                await $.wait(1000);
              } else {
                console.log("没有查询到可以加购的商品");
                $.activityEnd = true;
                return;
              }
            } catch (Ili1i1l) {
              console.log("加购异常：" + Ili1i1l);
            }
          }
        } else {
          if ($.addCarts >= $.drawCondition) {
            if (I1Ii1II >= $.drawTimeStr) {
              if (!$.openCard) {
                $.shopactivityId = "";
                $.joinVenderId = $.venderId;
                await l1liI1iI();
                for (let Illi1Iii = 0; Illi1Iii < Array(5).length; Illi1Iii++) {
                  if (Illi1Iii > 0) console.log("第" + Illi1Iii + "次 重新开卡");
                  await i11llIl1();
                  await $.wait(500);
                  if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
                }
              }
              await ll1Ii1II("drawResult");
            } else console.log("还没到开奖时间，晚点再来吧~"), $.activityEnd = true;
          } else console.log("加购次数不足无法参与开奖！");
        }
      }
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    $.index == 1 && ($.shareUuid = $.actorUuid);
  } catch (i1IiillI) {
    console.log(i1IiillI);
  }
}
async function ll1Ii1II(I11iI1ii) {
  if ($.outFlag) return;
  let IIl1il11 = "https://lzkjdz-isv.isvjd.com",
    Iill1iIi = "",
    iiI11iIl = "POST";
  switch (I11iI1ii) {
    case "getMyPing":
      url = IIl1il11 + "/customer/getMyPing", Iill1iIi = "token=" + $.Token + "&fromType=APP&userId=" + $.venderId + "&pin=";
      break;
    case "getSimpleActInfoVo":
      url = IIl1il11 + "/customer/getSimpleActInfoVo", Iill1iIi = "activityId=" + $.activityId;
      break;
    case "getActMemberInfo":
      url = IIl1il11 + "/wxCommonInfo/getActMemberInfo", Iill1iIi = "venderId=" + $.venderId + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "accessLogWithAD":
      url = IIl1il11 + "/common/accessLogWithAD";
      let iIlll1I1 = "https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId + "&friendUuid=" + $.shareUuid;
      Iill1iIi = "venderId=" + ($.shopId || $.venderId || "") + "&code=70&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iIlll1I1) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = IIl1il11 + "/wxActionCommon/getUserInfo", Iill1iIi = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = IIl1il11 + "/wxCartKoi/cartkoi/activityContent", Iill1iIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&yunMidImageUrl=" + $.yunMidImageUrl + "&friendUuid=" + $.shareUuid + "&status=1";
      break;
    case "getDrawPrizeInfo":
      url = IIl1il11 + "/wxCartKoi/cartkoi/getDrawPrizeInfo", Iill1iIi = "activityId=" + $.activityId;
      break;
    case "drawResult":
      url = IIl1il11 + "/wxCartKoi/cartkoi/drawResult", Iill1iIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "followShop":
      url = IIl1il11 + "/wxActionCommon/followShop", Iill1iIi = "userId=" + $.venderId + "&activityType=70&buyerNick=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId;
      break;
    case "shopInfo":
      url = IIl1il11 + "/wxActionCommon/getShopInfoVO", Iill1iIi = "userId=" + $.venderId;
      break;
    case "addCart":
      url = IIl1il11 + "/wxCartKoi/cartkoi/addCart", Iill1iIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&productId=" + $.productId;
      break;
    default:
      console.log("错误" + I11iI1ii);
  }
  let ili11li1 = IIl1li11(url, Iill1iIi, iiI11iIl);
  return new Promise(async iii1iII => {
    $.post(ili11li1, (IlI1l1i1, II111l, I11iIiii) => {
      try {
        if (I11iI1ii != "accessLogWithAD") iiiIli1l(II111l);
        IlI1l1i1 ? (II111l && typeof II111l.statusCode != "undefined" && II111l.statusCode == 493 && (console.log(I11iI1ii + " 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(IlI1l1i1, IlI1l1i1)), console.log(I11iI1ii + " API请求失败，请检查网路重试")) : illI1l1I(I11iI1ii, I11iIiii);
      } catch (lllIIi11) {
        console.log(lllIIi11, II111l);
      } finally {
        iii1iII();
      }
    });
  });
}
async function illI1l1I(il1i1l11, il11Illi) {
  let i1Il1i1i = "";
  try {
    (il1i1l11 != "accessLogWithAD" || il1i1l11 != "drawContent") && il11Illi && (i1Il1i1i = JSON.parse(il11Illi));
  } catch (lII1I1i) {
    console.log(il1i1l11 + " 执行任务异常");
    console.log(lII1I1i);
    $.runFalag = false;
  }
  try {
    switch (il1i1l11) {
      case "getMyPing":
        if (typeof i1Il1i1i == "object") {
          if (i1Il1i1i.result && i1Il1i1i.result === true) {
            if (i1Il1i1i.data && typeof i1Il1i1i.data.secretPin != "undefined") $.Pin = i1Il1i1i.data.secretPin;
            if (i1Il1i1i.data && typeof i1Il1i1i.data.nickname != "undefined") $.nickname = i1Il1i1i.data.nickname;
          } else i1Il1i1i.errorMessage ? console.log(il1i1l11 + " " + (i1Il1i1i.errorMessage || "")) : console.log(il1i1l11 + " " + il11Illi);
        } else console.log(il1i1l11 + " " + il11Illi);
        break;
      case "getSimpleActInfoVo":
        if (typeof i1Il1i1i == "object") {
          if (i1Il1i1i.result && i1Il1i1i.result === true) $.shopId = i1Il1i1i?.["data"]?.["shopId"], $.venderId = i1Il1i1i?.["data"]?.["venderId"], $.activityType = i1Il1i1i?.["data"]?.["activityType"];else i1Il1i1i.errorMessage ? console.log(il1i1l11 + " " + (i1Il1i1i.errorMessage || "")) : console.log(il1i1l11 + " " + il11Illi);
        } else console.log(il1i1l11 + " " + il11Illi);
        break;
      case "getUserInfo":
        if (typeof i1Il1i1i == "object") {
          if (i1Il1i1i.result && i1Il1i1i.result === true) $.yunMidImageUrl = i1Il1i1i.data.yunMidImageUrl || "";else i1Il1i1i.errorMessage ? console.log(il1i1l11 + " " + (i1Il1i1i.errorMessage || "")) : console.log(il1i1l11 + " " + il11Illi);
        } else console.log(il1i1l11 + " " + il11Illi);
        break;
      case "activityContent":
        if (typeof i1Il1i1i == "object") {
          if (i1Il1i1i.result && i1Il1i1i.result === true) {
            $.actorUuid = i1Il1i1i.data.joinRecord.myUuid || "";
            $.index == 1 && ($.activityName = i1Il1i1i.data.activityVo.activityName || "", $.cartStartTime = i1Il1i1i.data.activityVo.cartStartTime, $.cartEndTime = i1Il1i1i.data.activityVo.cartEndTime || "", $.drawTime = i1Il1i1i.data.activityVo.drawTime || "", $.endTime = i1Il1i1i.data.activityVo.endTime || "", $.prodectVos = i1Il1i1i.data.prodectVos || [], $.drawCondition = i1Il1i1i.data.activityVo.drawCondition || 0);
            $.addCarts = i1Il1i1i.data.addCarts || 0;
            $.joins = i1Il1i1i.data.joins || 0;
            $.jsNum = i1Il1i1i.data.jsNum || 0;
            $.totals = i1Il1i1i.data.totals || 0;
          } else {
            if (i1Il1i1i.errorMessage) {
              if (i1Il1i1i.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(il1i1l11 + " " + (i1Il1i1i.errorMessage || ""));
            } else console.log(il1i1l11 + " " + il11Illi);
          }
        } else {
          console.log(il1i1l11 + " " + il11Illi);
        }
        break;
      case "getActMemberInfo":
        if (typeof i1Il1i1i == "object") {
          if (i1Il1i1i.result && i1Il1i1i.result === true) $.openCard = i1Il1i1i.data.openCard || false;else {
            if (i1Il1i1i.errorMessage) console.log(il1i1l11 + " " + (i1Il1i1i.errorMessage || ""));else {
              console.log(il1i1l11 + " " + il11Illi);
            }
          }
        } else console.log(il1i1l11 + " " + il11Illi);
        break;
      case "addCart":
        if (typeof i1Il1i1i == "object") {
          if (i1Il1i1i.result && i1Il1i1i.result === true) {
            console.log("🛒  " + $.productId + "  >> 加购成功");
            $.addCartTimes++;
          } else i1Il1i1i.errorMessage ? console.log("🛒  " + $.productId + "  >> 加购失败(" + (i1Il1i1i.errorMessage || "") + ")") : console.log("🛒  " + $.productId + "  >> 加购失败(" + il11Illi + ")");
        } else {
          console.log(il1i1l11 + " " + il11Illi);
        }
        break;
      case "getDrawPrizeInfo":
        if (i1Il1i1i.data != "") {
          il11Illi = JSON.parse(il11Illi).data;
          console.log("活动奖品：");
          for (let illIiIII = 0; illIiIII < il11Illi.length; illIiIII++) {
            console.log("❖ " + il11Illi[illIiIII].name);
          }
          console.log("");
        }
        break;
      case "followShop":
        if (typeof i1Il1i1i == "object") {
          if (i1Il1i1i.result && i1Il1i1i.result === true) {
            $.need_openCard = false;
          } else i1Il1i1i.errorMessage ? (console.log("" + (i1Il1i1i.errorMessage || "")), $.need_openCard = true) : console.log(il1i1l11 + " " + il11Illi);
        } else console.log(il1i1l11 + " " + il11Illi);
        break;
      case "shopInfo":
        if (typeof i1Il1i1i == "object") {
          if (i1Il1i1i.result && i1Il1i1i.data) {
            $.shopName = i1Il1i1i.data.shopName;
          } else i1Il1i1i.errorMessage ? console.log("" + (i1Il1i1i.errorMessage || "")) : console.log("" + il11Illi);
        } else console.log("" + il11Illi);
        break;
      case "drawResult":
        if (typeof i1Il1i1i == "object") {
          if (i1Il1i1i.result && i1Il1i1i.result === true) {
            if (typeof i1Il1i1i.data == "object") {
              let iiI1i1iI = i1Il1i1i.data.drawInfo;
              if (iiI1i1iI) switch (iiI1i1iI.type) {
                case 6:
                  console.log("🎉 " + iiI1i1iI.name + " 🐶");
                  break;
                case 7:
                  const I1lIiiI = i1Il1i1i.data.addressId;
                  prizeName = iiI1i1iI.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName), console.log("参考价值：" + iiI1i1iI.priceInfo + "（元）");
                  if (iiI1i1iI.showImage) console.log("预览图片：" + iiI1i1iI.showImage);
                  let iII11ili = await lIIil1i("https://lzkjdz-isv.isvjd.com", iiiil1iI, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, I1lIiiI);
                  iII11ili ? $.isNode() && (await i111lI11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId)) : $.isNode() && (await i111lI11.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + iiI1i1iI.name + " 🎟️");
                  break;
                case 13:
                case 14:
                case 15:
                  console.log("🎉 恭喜获得" + iiI1i1iI.name + " 🎁");
                  $.isNode() && (await i111lI11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + iiI1i1iI.name + "\n\nhttps://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + iiI1i1iI.priceInfo + " 🧧");
                  break;
                default:
                  iiI1i1iI.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + iiI1i1iI.name);
                  break;
              } else console.log("💨 空气");
            } else console.log(il1i1l11 + " " + il11Illi);
          } else i1Il1i1i.errorMessage ? ($.runFalag = false, console.log(il1i1l11 + " " + (i1Il1i1i.errorMessage || ""))) : console.log(il1i1l11 + " " + il11Illi);
        } else console.log(il1i1l11 + " " + il11Illi);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(il1i1l11 + "-> " + il11Illi);
    }
    if (typeof i1Il1i1i == "object") {
      if (i1Il1i1i.errorMessage) {
        if (i1Il1i1i.errorMessage.includes("火爆")) $.hotFlag = true;
        if (i1Il1i1i.errorMessage.includes("结束")) $.activityEnd = true;
      }
    }
  } catch (IIIil1II) {
    console.log(IIIil1II);
  }
}
function IIl1li11(lIil1l1I, liIIli11, ili1iil1 = "POST") {
  let Ili1lill = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": iiiil1iI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lIil1l1I.indexOf("https://lzkjdz-isv.isvjd.com") > -1 && (Ili1lill.Origin = "https://lzkjdz-isv.isvjd.com", Ili1lill.Referer = "https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId + "&friendUuid=" + $.shareUuid, Ili1lill.Cookie = "" + (Iii11iIl && Iii11iIl || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + Il1lllil), {
    "url": lIil1l1I,
    "method": ili1iil1,
    "headers": Ili1lill,
    "body": liIIli11,
    "timeout": 30000
  };
}
function Il11lII1() {
  return new Promise(Ill111I => {
    let I1Il1iil = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(I1Il1iil, async (iIiii1il, lli1l1l1, ii1IiI1i) => {
      try {
        if (iIiii1il) lli1l1l1 && typeof lli1l1l1.statusCode != "undefined" && lli1l1l1.statusCode == 493 && (console.log("getCk 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log(String(iIiii1il)), console.log($.name + " cookie API请求失败，请检查网路重试");else {
          if (lli1l1l1.status == 200) iiiIli1l(lli1l1l1);
        }
      } catch (iiIiIi11) {
        $.logErr(iiIiIi11, lli1l1l1);
      } finally {
        Ill111I();
      }
    });
  });
}
function iiiIli1l(I1lilIi1) {
  if (I1lilIi1.headers["set-cookie"]) {
    iiiil1iI = "";
    for (let li1Ii1ll of I1lilIi1.headers["set-cookie"]) {
      IiiI1IiI[li1Ii1ll.split(";")[0].substr(0, li1Ii1ll.split(";")[0].indexOf("="))] = li1Ii1ll.split(";")[0].substr(li1Ii1ll.split(";")[0].indexOf("=") + 1);
    }
    for (const iii11II1 of Object.keys(IiiI1IiI)) {
      iiiil1iI += iii11II1 + "=" + IiiI1IiI[iii11II1] + ";";
    }
    Il1lllil = iiiil1iI;
  }
}
function iIlli1li() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const l1iI1Il1 = Array.from(new Set($.blacklist.split("&")));
  console.log(l1iI1Il1.join("&") + "\n");
  let iiIiiIil = l1iI1Il1,
    iil11I1 = [],
    l1llllll = false;
  for (let Il1IIllI = 0; Il1IIllI < I1IiiI1i.length; Il1IIllI++) {
    let Illi1Il1 = decodeURIComponent(I1IiiI1i[Il1IIllI].match(/pt_pin=([^; ]+)(?=;?)/) && I1IiiI1i[Il1IIllI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!Illi1Il1) break;
    let l1iill1I = false;
    for (let II1IIlil of iiIiiIil) {
      if (II1IIlil && II1IIlil == Illi1Il1) {
        l1iill1I = true;
        break;
      }
    }
    !l1iill1I && (l1llllll = true, iil11I1.splice(Il1IIllI, -1, I1IiiI1i[Il1IIllI]));
  }
  if (l1llllll) I1IiiI1i = iil11I1;
}
function iiII1lIl(l1iIillI, lI1Ill1I) {
  if (lI1Ill1I != 0) {
    l1iIillI.unshift(l1iIillI.splice(lI1Ill1I, 1)[0]);
  }
}
function Iiilll1I() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(I1IiiI1i, I1IiiI1i));
    return;
  }
  console.log("当前已设置白名单：");
  const iliiI1i = Array.from(new Set($.whitelist.split("&")));
  console.log(iliiI1i.join("&") + "\n");
  let iliIIlii = [],
    l1l1iIil = iliiI1i;
  for (let IliiIiI1 in I1IiiI1i) {
    let I1il1il1 = decodeURIComponent(I1IiiI1i[IliiIiI1].match(/pt_pin=([^; ]+)(?=;?)/) && I1IiiI1i[IliiIiI1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    l1l1iIil.includes(I1il1il1) && iliIIlii.push(I1IiiI1i[IliiIiI1]);
  }
  helpCookiesArr = iliIIlii;
  if (l1l1iIil.length > 1) for (let iiI111Il in l1l1iIil) {
    let I11lI1I1 = l1l1iIil[l1l1iIil.length - 1 - iiI111Il];
    if (!I11lI1I1) continue;
    for (let lIi1l1Ii in helpCookiesArr) {
      let IIIll11i = decodeURIComponent(helpCookiesArr[lIi1l1Ii].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lIi1l1Ii].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      I11lI1I1 == IIIll11i && iiII1lIl(helpCookiesArr, lIi1l1Ii);
    }
  }
}
function l1I11ill(iIllllII) {
  iIllllII = iIllllII || 32;
  let lIlIIIil = "abcdef0123456789",
    ill1ilii = lIlIIIil.length,
    iI11iiII = "";
  for (i = 0; i < iIllllII; i++) iI11iiII += lIlIIIil.charAt(Math.floor(Math.random() * ill1ilii));
  return iI11iiII;
}
function lIIlIIl1(IliliII1) {
  if (typeof IliliII1 == "string") {
    try {
      return JSON.parse(IliliII1);
    } catch (llI1Illl) {
      return console.log(llI1Illl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function i11llIl1() {
  if (!$.joinVenderId) return;
  return new Promise(async llilI1l1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiIiI1l1 = "";
    if ($.shopactivityId) iiIiI1l1 = ",\"activityId\":" + $.shopactivityId;
    const il11l1Il = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiIiI1l1 + ",\"channel\":406}",
      lI1iiii = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(il11l1Il)
      },
      IiIIiiil = await i111illI("27004", lI1iiii),
      i11Iiil = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + il11l1Il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IiIIiiil),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": iiiil1iI
        }
      };
    $.get(i11Iiil, async (Ililiili, iiliI1i, ll1lIl1l) => {
      try {
        if (Ililiili) console.log(Ililiili);else {
          const iliII111 = JSON.parse(ll1lIl1l);
          if (typeof iliII111 === "object") {
            if (iliII111.success === true) {
              console.log(iliII111.message);
              $.errorJoinShop = iliII111.message;
              if (iliII111.result && iliII111.result.giftInfo) for (let l11iilII of iliII111.result.giftInfo.giftList) {
                console.log("入会获得：" + l11iilII.discountString + l11iilII.prizeName + l11iilII.secondLineDesc);
              }
            } else typeof iliII111 == "object" && iliII111.message ? ($.errorJoinShop = iliII111.message, console.log("" + (iliII111.message || ""))) : console.log(ll1lIl1l);
          } else console.log(ll1lIl1l);
        }
      } catch (Ill1lii) {
        $.logErr(Ill1lii, iiliI1i);
      } finally {
        llilI1l1();
      }
    });
  });
}
async function l1liI1iI() {
  return new Promise(async iiii1III => {
    let Ill11ll1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const li1ii1Ii = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ill11ll1)
      },
      lIliiiiI = await i111illI("ef79a", li1ii1Ii),
      li11illI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Ill11ll1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIliiiiI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(li11illI, async (II11i1lI, i1iiIl11, iIiII1i1) => {
      try {
        iIiII1i1 = iIiII1i1 && iIiII1i1.match(/jsonp_.*?\((.*?)\);/) && iIiII1i1.match(/jsonp_.*?\((.*?)\);/)[1] || iIiII1i1;
        let i1iI1I = $.toObj(iIiII1i1, iIiII1i1);
        i1iI1I && typeof i1iI1I == "object" ? i1iI1I && i1iI1I.success == true && (console.log("去加入店铺会员：" + (i1iI1I.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = i1iI1I.result.interestsRuleList && i1iI1I.result.interestsRuleList[0] && i1iI1I.result.interestsRuleList[0].interestsInfo && i1iI1I.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iIiII1i1);
      } catch (l11lii1I) {
        $.logErr(l11lii1I, i1iiIl11);
      } finally {
        iiii1III();
      }
    });
  });
}
function illIilII(IilIi1i1, lIll1li) {
  let iliiI1II = new RegExp("(^|[&?])" + lIll1li + "=([^&]*)(&|$)"),
    iIiIll11 = IilIi1i1.match(iliiI1II);
  if (iIiIll11 != null) {
    return unescape(iIiIll11[2]);
  }
  return "";
}