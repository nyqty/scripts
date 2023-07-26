/*
活动名称：购物车锦鲤 · 超级无线
活动链接：https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity/activity?activityId=<活动id>
环境变量：jd_wxCartKoi_activityId // 活动id

纯加购类活动，不想加购勿跑！
脚本自动入会，不想入会勿跑！

*/

const Env=require('./utils/Env.js');
const $ = new Env('购物车锦鲤（超级无线）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(Ii1iilI1 => {
    cookiesArr.push(jdCookieNode[Ii1iilI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IIilIli1 => IIilIli1.cookie)].filter(iiiIi11 => !!iiiIi11);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  jd_wxCartKoi_activityId = "";
jd_wxCartKoi_activityId = $.isNode() ? process.env.jd_wxCartKoi_activityId ? process.env.jd_wxCartKoi_activityId : "" + jd_wxCartKoi_activityId : $.getdata("jd_wxCartKoi_activityId") ? $.getdata("jd_wxCartKoi_activityId") : "" + jd_wxCartKoi_activityId;
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = jd_wxCartKoi_activityId;
  $.shareUuid = "";
  console.log("活动入口：https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId);
  for (let l1i1i1lI = 0; l1i1i1lI < cookiesArr.length; l1i1i1lI++) {
    cookie = cookiesArr[l1i1i1lI];
    originCookie = cookiesArr[l1i1i1lI];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1i1i1lI + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await getUA();
      await run();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let lIlIllI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + lIlIllI);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(llil1iI => $.logErr(llil1iI)).finally(() => $.done());
async function run() {
  try {
    $.assistCount = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(originCookie, "https://lzkjdz-isv.isvjd.com");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
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
    if ($.index == 1) await takePostRequest("getSimpleActInfoVo");
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await $.wait(500);
    await takePostRequest("getActMemberInfo");
    await $.wait(500);
    await takePostRequest("getUserInfo");
    await $.wait(500);
    await takePostRequest("activityContent");
    await $.wait(500);
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.index == 1) {
      await takePostRequest("shopInfo");
      await $.wait(500);
      await takePostRequest("getDrawPrizeInfo");
      console.log("店铺名称：" + ($.shopName || "未知") + "\n参与人数：" + $.joins + "\n抽奖时间：" + $.drawTime + "\n结束时间：" + $.cartEndTime + "\n");
      await $.wait(500);
    }
    await takePostRequest("followShop");
    if ($.need_openCard == true) return;
    await $.wait(500);
    let iIIi1Iil = new Date().valueOf();
    $.cartStartTimeStr = new Date($.cartStartTime).valueOf();
    $.cartEndTimeStr = new Date($.cartEndTime).valueOf();
    $.drawTimeStr = new Date($.drawTime).valueOf();
    $.endTimeStr = new Date($.endTime).valueOf();
    if (iIIi1Iil >= $.endTimeStr) {
      console.log("活动已经结束！");
      $.activityEnd = true;
      return;
    } else {
      if (iIIi1Iil < $.cartStartTimeStr) {
        console.log("活动尚未开始！");
        $.activityEnd = true;
        return;
      } else {
        if (iIIi1Iil <= $.cartEndTimeStr) {
          if ($.addCarts == $.totals) console.log("已加购过了，请活动结束再来吧~");else {
            if (!$.openCard) {
              $.shopactivityId = "";
              $.joinVenderId = $.venderId;
              await getshopactivityId();
              for (let iI1l1il1 = 0; iI1l1il1 < Array(5).length; iI1l1il1++) {
                if (iI1l1il1 > 0) console.log("第" + iI1l1il1 + "次 重新开卡");
                await joinShop();
                await $.wait(500);
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
                  break;
                }
              }
            }
            console.log("活动进行中，开始加购~\n");
            try {
              if ($.prodectVos.length > 0) for (const l11III11 of $.prodectVos) {
                if (l11III11.collection) continue;
                $.productId = l11III11.productId;
                await takePostRequest("addCart");
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
            } catch (IiIll1l) {
              console.log("加购异常：" + IiIll1l);
            }
          }
        } else {
          if ($.addCarts >= $.drawCondition) {
            if (iIIi1Iil >= $.drawTimeStr) {
              if (!$.openCard) {
                $.shopactivityId = "";
                $.joinVenderId = $.venderId;
                await getshopactivityId();
                for (let I1Ii1ll = 0; I1Ii1ll < Array(5).length; I1Ii1ll++) {
                  if (I1Ii1ll > 0) console.log("第" + I1Ii1ll + "次 重新开卡");
                  await joinShop();
                  await $.wait(500);
                  if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
                    break;
                  }
                }
              }
              await takePostRequest("drawResult");
            } else {
              console.log("还没到开奖时间，晚点再来吧~");
              $.activityEnd = true;
            }
          } else console.log("加购次数不足无法参与开奖！");
        }
      }
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    $.index == 1 && ($.shareUuid = $.actorUuid);
  } catch (lIl1lIi1) {
    console.log(lIl1lIi1);
  }
}
async function takePostRequest(ii1Iil1i) {
  if ($.outFlag) return;
  let ii1llIiI = "https://lzkjdz-isv.isvjd.com",
    IlII11Il = "",
    lililI1l = "POST";
  switch (ii1Iil1i) {
    case "getMyPing":
      url = ii1llIiI + "/customer/getMyPing";
      IlII11Il = "token=" + $.Token + "&fromType=APP&userId=" + $.venderId + "&pin=";
      break;
    case "getSimpleActInfoVo":
      url = ii1llIiI + "/customer/getSimpleActInfoVo";
      IlII11Il = "activityId=" + $.activityId;
      break;
    case "getActMemberInfo":
      url = ii1llIiI + "/wxCommonInfo/getActMemberInfo";
      IlII11Il = "venderId=" + $.venderId + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "accessLogWithAD":
      url = ii1llIiI + "/common/accessLogWithAD";
      let lilI1I1I = "https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId + "&friendUuid=" + $.shareUuid;
      IlII11Il = "venderId=" + ($.shopId || $.venderId || "") + "&code=70&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lilI1I1I) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = ii1llIiI + "/wxActionCommon/getUserInfo";
      IlII11Il = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = ii1llIiI + "/wxCartKoi/cartkoi/activityContent";
      IlII11Il = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&yunMidImageUrl=" + $.yunMidImageUrl + "&friendUuid=" + $.shareUuid + "&status=1";
      break;
    case "getDrawPrizeInfo":
      url = ii1llIiI + "/wxCartKoi/cartkoi/getDrawPrizeInfo";
      IlII11Il = "activityId=" + $.activityId;
      break;
    case "drawResult":
      url = ii1llIiI + "/wxCartKoi/cartkoi/drawResult";
      IlII11Il = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "followShop":
      url = ii1llIiI + "/wxActionCommon/followShop";
      IlII11Il = "userId=" + $.venderId + "&activityType=70&buyerNick=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId;
      break;
    case "shopInfo":
      url = ii1llIiI + "/wxActionCommon/getShopInfoVO";
      IlII11Il = "userId=" + $.venderId;
      break;
    case "addCart":
      url = ii1llIiI + "/wxCartKoi/cartkoi/addCart";
      IlII11Il = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&productId=" + $.productId;
      break;
    default:
      console.log("错误" + ii1Iil1i);
  }
  let l11lIlI = getPostRequest(url, IlII11Il, lililI1l);
  return new Promise(async ll1ilill => {
    $.post(l11lIlI, (i11ii1Ii, lI1lIiIi, il1IIil) => {
      try {
        if (ii1Iil1i != "accessLogWithAD") setActivityCookie(lI1lIiIi);
        i11ii1Ii ? (lI1lIiIi && typeof lI1lIiIi.statusCode != "undefined" && lI1lIiIi.statusCode == 493 && (console.log(ii1Iil1i + " 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(i11ii1Ii, i11ii1Ii)), console.log(ii1Iil1i + " API请求失败，请检查网路重试")) : dealReturn(ii1Iil1i, il1IIil);
      } catch (IllI1Iil) {
        console.log(IllI1Iil, lI1lIiIi);
      } finally {
        ll1ilill();
      }
    });
  });
}
async function dealReturn(iIlI111l, Il1II1ii) {
  let l1I1il11 = "";
  try {
    if (iIlI111l != "accessLogWithAD" || iIlI111l != "drawContent") {
      if (Il1II1ii) {
        l1I1il11 = JSON.parse(Il1II1ii);
      }
    }
  } catch (IlilIlll) {
    console.log(iIlI111l + " 执行任务异常");
    console.log(IlilIlll);
    $.runFalag = false;
  }
  try {
    switch (iIlI111l) {
      case "getMyPing":
        if (typeof l1I1il11 == "object") {
          if (l1I1il11.result && l1I1il11.result === true) {
            if (l1I1il11.data && typeof l1I1il11.data.secretPin != "undefined") $.Pin = l1I1il11.data.secretPin;
            if (l1I1il11.data && typeof l1I1il11.data.nickname != "undefined") $.nickname = l1I1il11.data.nickname;
          } else {
            if (l1I1il11.errorMessage) console.log(iIlI111l + " " + (l1I1il11.errorMessage || ""));else {
              console.log(iIlI111l + " " + Il1II1ii);
            }
          }
        } else console.log(iIlI111l + " " + Il1II1ii);
        break;
      case "getSimpleActInfoVo":
        if (typeof l1I1il11 == "object") {
          if (l1I1il11.result && l1I1il11.result === true) {
            if (typeof l1I1il11.data.shopId != "undefined") $.shopId = l1I1il11.data.shopId;
            if (typeof l1I1il11.data.venderId != "undefined") $.venderId = l1I1il11.data.venderId;
            if (typeof l1I1il11.data.activityType != "undefined") $.activityType = l1I1il11.data.activityType;
          } else l1I1il11.errorMessage ? console.log(iIlI111l + " " + (l1I1il11.errorMessage || "")) : console.log(iIlI111l + " " + Il1II1ii);
        } else console.log(iIlI111l + " " + Il1II1ii);
        break;
      case "getUserInfo":
        if (typeof l1I1il11 == "object") {
          if (l1I1il11.result && l1I1il11.result === true) $.yunMidImageUrl = l1I1il11.data.yunMidImageUrl || "";else {
            if (l1I1il11.errorMessage) {
              console.log(iIlI111l + " " + (l1I1il11.errorMessage || ""));
            } else console.log(iIlI111l + " " + Il1II1ii);
          }
        } else console.log(iIlI111l + " " + Il1II1ii);
        break;
      case "activityContent":
        if (typeof l1I1il11 == "object") {
          if (l1I1il11.result && l1I1il11.result === true) {
            $.actorUuid = l1I1il11.data.joinRecord.myUuid || "";
            if ($.index == 1) {
              $.activityName = l1I1il11.data.activityVo.activityName || "";
              $.cartStartTime = l1I1il11.data.activityVo.cartStartTime;
              $.cartEndTime = l1I1il11.data.activityVo.cartEndTime || "";
              $.drawTime = l1I1il11.data.activityVo.drawTime || "";
              $.endTime = l1I1il11.data.activityVo.endTime || "";
              $.prodectVos = l1I1il11.data.prodectVos || [];
              $.drawCondition = l1I1il11.data.activityVo.drawCondition || 0;
            }
            $.addCarts = l1I1il11.data.addCarts || 0;
            $.joins = l1I1il11.data.joins || 0;
            $.jsNum = l1I1il11.data.jsNum || 0;
            $.totals = l1I1il11.data.totals || 0;
          } else {
            if (l1I1il11.errorMessage) {
              if (l1I1il11.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(iIlI111l + " " + (l1I1il11.errorMessage || ""));
            } else console.log(iIlI111l + " " + Il1II1ii);
          }
        } else console.log(iIlI111l + " " + Il1II1ii);
        break;
      case "getActMemberInfo":
        if (typeof l1I1il11 == "object") {
          if (l1I1il11.result && l1I1il11.result === true) $.openCard = l1I1il11.data.openCard || false;else l1I1il11.errorMessage ? console.log(iIlI111l + " " + (l1I1il11.errorMessage || "")) : console.log(iIlI111l + " " + Il1II1ii);
        } else console.log(iIlI111l + " " + Il1II1ii);
        break;
      case "addCart":
        if (typeof l1I1il11 == "object") {
          if (l1I1il11.result && l1I1il11.result === true) {
            console.log("🛒  " + $.productId + "  >> 加购成功");
            $.addCartTimes++;
          } else {
            if (l1I1il11.errorMessage) console.log("🛒  " + $.productId + "  >> 加购失败(" + (l1I1il11.errorMessage || "") + ")");else {
              console.log("🛒  " + $.productId + "  >> 加购失败(" + Il1II1ii + ")");
            }
          }
        } else console.log(iIlI111l + " " + Il1II1ii);
        break;
      case "getDrawPrizeInfo":
        if (l1I1il11.data != "") {
          Il1II1ii = JSON.parse(Il1II1ii).data;
          console.log("活动奖品：");
          for (let liIlii11 = 0; liIlii11 < Il1II1ii.length; liIlii11++) {
            console.log("❖ " + Il1II1ii[liIlii11].name);
          }
          console.log("");
        }
        break;
      case "followShop":
        if (typeof l1I1il11 == "object") {
          if (l1I1il11.result && l1I1il11.result === true) $.need_openCard = false;else {
            if (l1I1il11.errorMessage) {
              console.log("" + (l1I1il11.errorMessage || ""));
              $.need_openCard = true;
            } else console.log(iIlI111l + " " + Il1II1ii);
          }
        } else console.log(iIlI111l + " " + Il1II1ii);
        break;
      case "shopInfo":
        if (typeof l1I1il11 == "object") {
          if (l1I1il11.result && l1I1il11.data) $.shopName = l1I1il11.data.shopName;else {
            if (l1I1il11.errorMessage) {
              console.log("" + (l1I1il11.errorMessage || ""));
            } else console.log("" + Il1II1ii);
          }
        } else console.log("" + Il1II1ii);
        break;
      case "drawResult":
        if (typeof l1I1il11 == "object") {
          if (l1I1il11.result && l1I1il11.result === true) {
            if (typeof l1I1il11.data == "object") {
              let i11iIiII = l1I1il11.data.drawInfo;
              if (i11iIiII) {
                switch (i11iIiII.type) {
                  case 6:
                    console.log("🎉 " + i11iIiII.name + " 🐶");
                    break;
                  case 7:
                    const iillIl = l1I1il11.data.addressId;
                    prizeName = i11iIiII.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    console.log("参考价值：" + i11iIiII.priceInfo + "（元）");
                    if (i11iIiII.showImage) console.log("预览图片：" + i11iIiII.showImage);
                    let li1i11I1 = await wxSavePrize("https://lzkjdz-isv.isvjd.com", cookie, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, iillIl);
                    li1i11I1 ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + i11iIiII.name + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    console.log("🎉 恭喜获得" + i11iIiII.name + " 🎁");
                    $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + i11iIiII.name + "\n\nhttps://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId));
                    break;
                  case 16:
                    console.log("🎉 " + i11iIiII.priceInfo + " 🧧");
                    break;
                  default:
                    i11iIiII.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + i11iIiII.name);
                    break;
                }
              } else console.log("💨 空气");
            } else {
              console.log(iIlI111l + " " + Il1II1ii);
            }
          } else l1I1il11.errorMessage ? ($.runFalag = false, console.log(iIlI111l + " " + (l1I1il11.errorMessage || ""))) : console.log(iIlI111l + " " + Il1II1ii);
        } else {
          console.log(iIlI111l + " " + Il1II1ii);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(iIlI111l + "-> " + Il1II1ii);
    }
    if (typeof l1I1il11 == "object") {
      if (l1I1il11.errorMessage) {
        if (l1I1il11.errorMessage.includes("火爆")) $.hotFlag = true;
        if (l1I1il11.errorMessage.includes("结束")) $.activityEnd = true;
      }
    }
  } catch (illiIili) {
    console.log(illiIili);
  }
}
function getPostRequest(i1iI11i1, Iiill1il, iIII11l = "POST") {
  let iIlIl11 = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i1iI11i1.indexOf("https://lzkjdz-isv.isvjd.com") > -1 && (iIlIl11.Origin = "https://lzkjdz-isv.isvjd.com", iIlIl11.Referer = "https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId + "&friendUuid=" + $.shareUuid, iIlIl11.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": i1iI11i1,
    "method": iIII11l,
    "headers": iIlIl11,
    "body": Iiill1il,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(l1IliIIi => {
    let iIiIii1l = {
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
    $.get(iIiIii1l, async (li11l1Il, illlI1l, iiIlil1i) => {
      try {
        if (li11l1Il) {
          if (illlI1l && typeof illlI1l.statusCode != "undefined") {
            illlI1l.statusCode == 493 && (console.log("getCk 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          }
          console.log(String(li11l1Il));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (illlI1l.status == 200) setActivityCookie(illlI1l);
        }
      } catch (l1lIIl) {
        $.logErr(l1lIIl, illlI1l);
      } finally {
        l1IliIIi();
      }
    });
  });
}
function setActivityCookie(IlillIIi) {
  if (IlillIIi.headers["set-cookie"]) {
    cookie = "";
    for (let II1iIl1 of IlillIIi.headers["set-cookie"]) {
      lz_cookie[II1iIl1.split(";")[0].substr(0, II1iIl1.split(";")[0].indexOf("="))] = II1iIl1.split(";")[0].substr(II1iIl1.split(";")[0].indexOf("=") + 1);
    }
    for (const iil1l11 of Object.keys(lz_cookie)) {
      cookie += iil1l11 + "=" + lz_cookie[iil1l11] + ";";
    }
    activityCookie = cookie;
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(iIlliiIi) {
  iIlliiIi = iIlliiIi || 32;
  let IlIilil = "abcdef0123456789",
    ili1llil = IlIilil.length,
    I1lI1Il = "";
  for (i = 0; i < iIlliiIi; i++) I1lI1Il += IlIilil.charAt(Math.floor(Math.random() * ili1llil));
  return I1lI1Il;
}
function jsonParse(iiI1iiII) {
  if (typeof iiI1iiII == "string") {
    try {
      return JSON.parse(iiI1iiII);
    } catch (I111iIIi) {
      return console.log(I111iIIi), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async i1iIIIil => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I11l1 = "";
    if ($.shopactivityId) I11l1 = ",\"activityId\":" + $.shopactivityId;
    const l1Ii1il1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I11l1 + ",\"channel\":406}",
      lIIi11II = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l1Ii1il1)
      },
      il1iilil = await getH5st("8adfb", lIIi11II),
      l1iI1III = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + l1Ii1il1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(il1iilil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1iI1III, async (iIililIl, IiIIiiIi, Iil1l1Ii) => {
      try {
        Iil1l1Ii = Iil1l1Ii && Iil1l1Ii.match(/jsonp_.*?\((.*?)\);/) && Iil1l1Ii.match(/jsonp_.*?\((.*?)\);/)[1] || Iil1l1Ii;
        let lil11ii = $.toObj(Iil1l1Ii, Iil1l1Ii);
        if (lil11ii && typeof lil11ii == "object") {
          if (lil11ii && lil11ii.success === true) {
            console.log(lil11ii.message);
            $.errorJoinShop = lil11ii.message;
            console.log("");
          } else lil11ii && typeof lil11ii == "object" && lil11ii.message ? ($.errorJoinShop = lil11ii.message, console.log("" + (lil11ii.message || ""))) : console.log(Iil1l1Ii);
        } else console.log(Iil1l1Ii);
      } catch (ll1IIll1) {
        $.logErr(ll1IIll1, IiIIiiIi);
      } finally {
        i1iIIIil();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async I1l1i1li => {
    let iIiiii1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const ll1lIll1 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIiiii1)
      },
      II1lIIl1 = await getH5st("ef79a", ll1lIll1),
      Il1IlII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIiiii1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(II1lIIl1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Il1IlII, async (Iiiiil1i, I1II1il, Ii1llIii) => {
      try {
        Ii1llIii = Ii1llIii && Ii1llIii.match(/jsonp_.*?\((.*?)\);/) && Ii1llIii.match(/jsonp_.*?\((.*?)\);/)[1] || Ii1llIii;
        let ilIiIlil = $.toObj(Ii1llIii, Ii1llIii);
        if (ilIiIlil && typeof ilIiIlil == "object") {
          ilIiIlil && ilIiIlil.success == true && (console.log("去加入店铺会员：" + (ilIiIlil.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = ilIiIlil.result.interestsRuleList && ilIiIlil.result.interestsRuleList[0] && ilIiIlil.result.interestsRuleList[0].interestsInfo && ilIiIlil.result.interestsRuleList[0].interestsInfo.activityId || "");
        } else console.log(Ii1llIii);
      } catch (lliiilI1) {
        $.logErr(lliiilI1, I1II1il);
      } finally {
        I1l1i1li();
      }
    });
  });
}
