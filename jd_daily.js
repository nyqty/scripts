/*
活动名称：每日抢好礼 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/activity/daily/wx/indexPage?activityId=<活动id>
        https://cjhy-isv.isvjcloud.com/activity/daily/wx/indexPage?activityId=<活动id>
环境变量：jd_daily_activityUrl // 活动链接
        jd_daily_openCard // 是否开卡，默认不开卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('每日抢好礼（超级无线/超级会员）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')
const CryptoJS = require('crypto-js')

let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(IIIillIl => {
    cookiesArr.push(jdCookieNode[IIIillIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IIi1Ii => IIi1Ii.cookie)].filter(iIl11iI1 => !!iIl11iI1);
let activityUrl = process.env.jd_daily_activityUrl ? process.env.jd_daily_activityUrl : "",
  openCard = process.env.jd_daily_openCard === "true" ? true : false,
  activityId = "";
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  lz_cookie = {};
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
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
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    console.log("活动id不存在！");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = activityId;
  console.log("活动入口：" + activityUrl);
  for (let iIlI11i = 0; iIlI11i < cookiesArr.length; iIlI11i++) {
    cookie = cookiesArr[iIlI11i];
    originCookie = cookiesArr[iIlI11i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIlI11i + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await getUA();
      await run();
      await $.wait(1000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(Il111lil => $.logErr(Il111lil)).finally(() => $.done());
async function run() {
  try {
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.token = "";
    $.pinToken = "";
    $.Pin = "";
    $.grabStop = false;
    $.getPrize = false;
    switch ($.domain_mode) {
      case "lzkj":
        await getFirstLZCK();
        break;
      case "cjhy":
        await getFirstCK();
        break;
    }
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    await $.wait(500);
    if ($.index == 1) {
      await takePostRequest("getSimpleActInfoVo");
      if (!$.venderId) {
        $.outFlag = true;
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        return;
      }
    }
    $.token = await getToken(originCookie, domains);
    if ($.token) {
      await takePostRequest("getMyPing");
      if (!$.Pin) {
        console.log("未能获取用户鉴权信息！");
        return;
      }
      switch ($.domain_mode) {
        case "lzkj":
          await takePostRequest("getPinToken");
          if (!$.pinToken) {
            console.log("未能获取用户加密Token！");
            return;
          }
          $.FormatPin = encodeURIComponent($.Pin);
          break;
        case "cjhy":
          $.FormatPin = encodeURIComponent(encodeURIComponent($.Pin));
          break;
      }
      $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
      switch ($.domain_mode) {
        case "lzkj":
          await takePostRequest("accessLogWithAD");
          break;
        case "cjhy":
          await takePostRequest("accessLog");
          break;
      }
      $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
    } else {
      console.log("获取[token]失败！");
      return;
    }
    if (openCard) {
      switch ($.domain_mode) {
        case "lzkj":
          await takePostRequest("getActMemberInfo");
          break;
        case "cjhy":
          await takePostRequest("getOpenCardInfo");
          break;
      }
      if ($.hasEnd || $.activityEnd || $.outFlag) return;
      if (!$.isOpenCard) {
        $.errorJoinShop = "";
        $.joinVenderId = $.venderId;
        for (let I1llll1l = 0; I1llll1l < Array(5).length; I1llll1l++) {
          if (I1llll1l > 0) console.log("第" + I1llll1l + "次 重新开卡");
          await joinShop();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
            break;
          }
        }
        $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("❌ 开卡失败，重新执行脚本");
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    for (let IiIilIIl = 0; IiIilIIl < 20; IiIilIIl++) {
      await takePostRequest("grabGift");
      if ($.activityEnd) return;
      if ($.getPrize || $.grabStop) break;
      $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
  } catch (iiIli111) {
    console.log(iiIli111);
  }
}
async function takePostRequest(Ii1iilii) {
  if ($.outFlag) return;
  let IIi1illl = domains,
    Iill1iil = "",
    lI1IIl = "POST";
  switch (Ii1iilii) {
    case "getMyPing":
      url = IIi1illl + "/customer/getMyPing";
      Iill1iil = "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP";
      break;
    case "getSimpleActInfoVo":
      url = IIi1illl + "/customer/getSimpleActInfoVo";
      Iill1iil = "activityId=" + $.activityId;
      break;
    case "getOpenCardInfo":
      url = IIi1illl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      Iill1iil = "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType;
      break;
    case "getActMemberInfo":
      url = IIi1illl + "/wxCommonInfo/getActMemberInfo";
      Iill1iil = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin;
      break;
    case "accessLog":
      url = IIi1illl + "/common/accessLog";
      Iill1iil = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      url = IIi1illl + "/common/accessLogWithAD";
      Iill1iil = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app";
      break;
    case "follow":
      url = IIi1illl + "/daily/follow";
      Iill1iil = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "getPinToken":
      let llIllili = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
        iiiIIII = encrypt(genTokenKey(genCalcStr($.token, !0, !0, 0, "l", 10, !0, 0, "r", 10)), JSON.stringify({
          "activityId": $.activityId,
          "timestamp": Date.now().toString(),
          "uuid": llIllili
        }));
      url = IIi1illl + "/support/common/getPinToken";
      Iill1iil = "source=01&uuid=" + llIllili + "&token=" + encodeURIComponent(iiiIIII) + "&jdToken=" + $.token + "&venderId=" + $.venderId + "&fromType=APP";
      break;
    case "grabGift":
      url = IIi1illl + "/activity/daily/wx/grabGift";
      if ($.domain_mode === "lzkj") {
        let ii111iii = encrypt(genTokenKey(genCalcStr($.pinToken, !0, !0, 0, "l", 10, !0, 0, "r", 10)), JSON.stringify({
          "activityId": $.activityId,
          "timestamp": Date.now().toString()
        }));
        Iill1iil = "actId=" + $.activityId + "&pin=" + $.FormatPin + "&token=" + encodeURIComponent(ii111iii) + "&pinToken=" + encodeURIComponent($.pinToken);
      } else Iill1iil = "actId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "getShareRecord":
      url = IIi1illl + "/daily/shopInfo";
      Iill1iil = "activityId=" + $.activityId;
      break;
    case "getUserInfo":
      url = IIi1illl + "/wxActionCommon/getUserInfo";
      Iill1iil = "pin=" + $.FormatPin;
      break;
    default:
      console.log("错误" + Ii1iilii);
  }
  let i1Il1I11 = getPostRequest(url, Iill1iil, lI1IIl);
  return new Promise(async Iillil1l => {
    $.post(i1Il1I11, (I1II11iI, IIillilI, iiIilI1l) => {
      try {
        setActivityCookie(IIillilI);
        I1II11iI ? (IIillilI && typeof IIillilI.statusCode != "undefined" && IIillilI.statusCode == 493 && (console.log(Ii1iilii + " 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(I1II11iI, I1II11iI)), console.log(Ii1iilii + " API请求失败，请检查网路重试")) : dealReturn(Ii1iilii, iiIilI1l);
      } catch (lilIl1I1) {
        console.log(lilIl1I1, IIillilI);
      } finally {
        Iillil1l();
      }
    });
  });
}
async function dealReturn(lIiiI1il, II1l1i1I) {
  let iilli1lI = "";
  try {
    (lIiiI1il != "accessLogWithAD" || lIiiI1il != "drawContent") && II1l1i1I && (iilli1lI = JSON.parse(II1l1i1I));
  } catch (iliiiiiI) {
    console.log(lIiiI1il + " 执行任务异常");
    console.log(II1l1i1I);
    $.runFalag = false;
  }
  try {
    switch (lIiiI1il) {
      case "getMyPing":
        if (typeof iilli1lI == "object") {
          if (iilli1lI.result && iilli1lI.result === true) {
            if (iilli1lI.data && typeof iilli1lI.data.secretPin != "undefined") $.Pin = iilli1lI.data.secretPin;
            if (iilli1lI.data && typeof iilli1lI.data.nickname != "undefined") $.nickname = iilli1lI.data.nickname;
          } else iilli1lI.errorMessage ? console.log(lIiiI1il + " " + (iilli1lI.errorMessage || "")) : console.log(lIiiI1il + " " + II1l1i1I);
        } else console.log(lIiiI1il + " " + II1l1i1I);
        break;
      case "getSimpleActInfoVo":
        if (typeof iilli1lI == "object") {
          if (iilli1lI.result && iilli1lI.result === true) {
            if (iilli1lI.data) {
              if (typeof iilli1lI.data.shopId != "undefined") $.shopId = iilli1lI.data.shopId;
              if (typeof iilli1lI.data.venderId != "undefined") $.venderId = iilli1lI.data.venderId;
              $.activityType = iilli1lI.data.activityType;
            } else !iilli1lI.data && ($.activityEnd = true);
          } else iilli1lI.errorMessage ? console.log(lIiiI1il + " " + (iilli1lI.errorMessage || "")) : console.log(lIiiI1il + " " + II1l1i1I);
        } else console.log(lIiiI1il + " " + II1l1i1I);
        break;
      case "follow":
        if (typeof iilli1lI == "object") {
          if (iilli1lI.result && iilli1lI.result === true && iilli1lI.count === 0) {} else {
            if (iilli1lI.errorMessage) console.log(lIiiI1il + " " + (iilli1lI.errorMessage || ""));else {
              console.log(lIiiI1il + " " + II1l1i1I);
            }
          }
        } else console.log(lIiiI1il + " " + II1l1i1I);
        break;
      case "getOpenCardInfo":
        if (typeof iilli1lI == "object") {
          if (iilli1lI.result && iilli1lI.result === true) $.openCard = iilli1lI.data.openedCard || false;else iilli1lI.errorMessage ? console.log(lIiiI1il + " " + (iilli1lI.errorMessage || "")) : console.log(lIiiI1il + " " + II1l1i1I);
        } else {
          console.log(lIiiI1il + " " + II1l1i1I);
        }
        break;
      case "getUserInfo":
        if (typeof iilli1lI == "object") {
          if (iilli1lI.result && iilli1lI.result === true) {
            if (iilli1lI.data && typeof iilli1lI.data.yunMidImageUrl != "undefined") $.attrTouXiang = iilli1lI.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            $.jdNick = iilli1lI.data.nickname || "";
          } else iilli1lI.errorMessage ? console.log(lIiiI1il + " " + (iilli1lI.errorMessage || "")) : console.log(lIiiI1il + " " + II1l1i1I);
        } else console.log(lIiiI1il + " " + II1l1i1I);
        break;
      case "getPinToken":
        if (typeof iilli1lI == "object") {
          if (iilli1lI.result && iilli1lI.result === true) $.pinToken = JSON.parse(iilli1lI.data).data.pinToken || "";else iilli1lI.errorMessage ? console.log(lIiiI1il + " " + (iilli1lI.errorMessage || "")) : console.log(lIiiI1il + " " + II1l1i1I);
        } else console.log(lIiiI1il + " " + II1l1i1I);
        break;
      case "grabGift":
        if (typeof iilli1lI == "object") {
          if (iilli1lI.isOk && iilli1lI.isOk === true) {
            if (iilli1lI.gift) {
              $.getPrize = true;
              let Ilil1li = iilli1lI.gift.gift;
              switch (parseInt(Ilil1li.giftType)) {
                case 4:
                  console.log("🔁 再来一次");
                  $.canDrawTimes += 1;
                  break;
                case 6:
                  console.log("🎉 " + Ilil1li.giftName + " 🐶");
                  $.msg += Ilil1li.giftName + "🐶，";
                  break;
                case 7:
                  const li1llIi1 = iilli1lI.addressId;
                  prizeName = Ilil1li.giftName;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  console.log("参考价值：" + Ilil1li.priceInfo + "（元）");
                  if (Ilil1li.showImage) console.log("预览图片：" + Ilil1li.showImage);
                  let iIllii1 = await wxSavePrize(domains, cookie, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, li1llIi1);
                  iIllii1 ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抢中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抢中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + activityUrl));
                  $.msg += prizeName + "🎁，";
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  $.msg += "专享价🗑️，";
                  break;
                case 9:
                  console.log("🗑️ " + Ilil1li.giftName + " 🎟️");
                  $.msg += Ilil1li.giftName + "🎟️，";
                  break;
                case 13:
                case 14:
                case 15:
                  console.log("🎉 恭喜获得" + Ilil1li.giftName + " 🎁");
                  $.msg += Ilil1li.giftName + "🎁，";
                  if ($.isNode()) {
                    await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + Ilil1li.giftName + "\n\n" + activityUrl);
                  }
                  break;
                case 16:
                  console.log("🎉 " + Ilil1li.priceInfo + " 🧧");
                  $.msg += Ilil1li.priceInfo + "红包🧧，";
                  break;
                default:
                  Ilil1li.giftName.includes("券") ? (console.log("🗑️ 优惠券"), $.msg += "优惠券🗑️，") : (console.log("获得：" + Ilil1li.giftName), $.msg += Ilil1li.giftName + "，");
                  break;
              }
            } else {
              console.log("💨 空气");
              $.grabStop = true;
            }
          } else {
            msg = iilli1lI.msg;
            if (msg) {
              console.log("" + iilli1lI.msg);
              for (let I1II1ll of ["来晚了", "抢光了", "发完", "领完", "非法操作", "奖品发送失败", "未开始", "发放完", "全部被领取", "不足", "已结束", "有效期", "上限", "开抢时间"]) {
                if (msg.includes(I1II1ll)) {
                  $.grabStop = true;
                  $.activityEnd = true;
                  break;
                }
              }
              for (let I1llIl of ["一次", "会员", "擦肩"]) {
                if (msg.includes(I1llIl)) {
                  $.grabStop = true;
                  break;
                }
              }
            } else console.log("" + II1l1i1I);
          }
        }
        break;
      case "accessLogWithAD":
      case "accessLog":
      case "drawContent":
        break;
      default:
        console.log(lIiiI1il + "-> " + II1l1i1I);
    }
    typeof iilli1lI == "object" && iilli1lI.errorMessage && iilli1lI.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (l11l1IiI) {
    console.log(l11l1IiI);
  }
}
function getPostRequest(illIIlll, I1IIiI1i, li11I1lI = "POST") {
  let i1l1I11l = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return illIIlll.indexOf("" + domains) > -1 && (i1l1I11l.Referer = activityUrl, i1l1I11l.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": illIIlll,
    "method": li11I1lI,
    "headers": i1l1I11l,
    "body": I1IIiI1i,
    "timeout": 30000
  };
}
function getFirstLZCK() {
  return new Promise(iiIiIilI => {
    let ll1liiIl = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(ll1liiIl, async (i1IIlIli, l1l1I1il, ii1l1i1I) => {
      try {
        i1IIlIli ? (console.log(String(i1IIlIli)), console.log("wxCommonInfo API请求失败，请检查网路重试")) : l1l1I1il.status == 200 && setActivityCookie(l1l1I1il);
      } catch (lIi1iii1) {
        $.logErr(lIi1iii1, l1l1I1il);
      } finally {
        iiIiIilI();
      }
    });
  });
}
function getFirstCK() {
  return new Promise(Il1II11 => {
    let illillII = {
      "url": activityUrl,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(illillII, async (iiIlIill, ill1iI, lIIi1ii) => {
      try {
        if (iiIlIill) {
          console.log(String(iiIlIill));
          console.log("getFirstCK API请求失败，请检查网路重试");
        } else {
          let lliiiiiI = lIIi1ii.match(/(活动已经结束)/) && lIIi1ii.match(/(活动已经结束)/)[1] || "";
          lliiiiiI && ($.activityEnd = true, console.log("活动已结束"));
          ill1iI.status == 200 && setActivityCookie(ill1iI);
        }
      } catch (II11iiii) {
        $.logErr(II11iiii, ill1iI);
      } finally {
        Il1II11();
      }
    });
  });
}
function setActivityCookie(I11IIiiI) {
  if (I11IIiiI) {
    if (I11IIiiI.headers["set-cookie"]) {
      cookie = "";
      for (let liI11Il of I11IIiiI.headers["set-cookie"]) {
        lz_cookie[liI11Il.split(";")[0].substr(0, liI11Il.split(";")[0].indexOf("="))] = liI11Il.split(";")[0].substr(liI11Il.split(";")[0].indexOf("=") + 1);
      }
      for (const llI1IIl1 of Object.keys(lz_cookie)) {
        cookie += llI1IIl1 + "=" + lz_cookie[llI1IIl1] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(II1ll11l) {
  II1ll11l = II1ll11l || 32;
  let l1iillII = "abcdef0123456789",
    IlI1iil1 = l1iillII.length,
    lIIliIl1 = "";
  for (i = 0; i < II1ll11l; i++) lIIliIl1 += l1iillII.charAt(Math.floor(Math.random() * IlI1iil1));
  return lIIliIl1;
}
function jsonParse(llIlllIl) {
  if (typeof llIlllIl == "string") try {
    return JSON.parse(llIlllIl);
  } catch (iIiiiiIl) {
    return console.log(iIiiiiIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(IlI1I1Ii, liIl1I1i) {
  let ll1Iilli = new RegExp("(^|[&?])" + liIl1I1i + "=([^&]*)(&|$)"),
    iliIIliI = IlI1I1Ii.match(ll1Iilli);
  if (iliIIliI != null) return decodeURIComponent(iliIIliI[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async Il1lll => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let li111iIi = "";
    if ($.shopactivityId) li111iIi = ",\"activityId\":" + $.shopactivityId;
    const Ilii11i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + li111iIi + ",\"channel\":406}",
      ii1illii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ilii11i)
      },
      illl1I1I = await getH5st("8adfb", ii1illii),
      IiIlIli1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Ilii11i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(illl1I1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IiIlIli1, async (lii1II1I, iIllI1I, IIIIi1lI) => {
      try {
        IIIIi1lI = IIIIi1lI && IIIIi1lI.match(/jsonp_.*?\((.*?)\);/) && IIIIi1lI.match(/jsonp_.*?\((.*?)\);/)[1] || IIIIi1lI;
        let i11iII = $.toObj(IIIIi1lI, IIIIi1lI);
        if (i11iII && typeof i11iII == "object") {
          if (i11iII && i11iII.success === true) {
            console.log(i11iII.message);
            $.errorJoinShop = i11iII.message;
            if (i11iII.result && i11iII.result.giftInfo) {
              for (let iiiIi11i of i11iII.result.giftInfo.giftList) {
                console.log("入会获得: " + iiiIi11i.discountString + iiiIi11i.prizeName + iiiIi11i.secondLineDesc);
              }
            }
            console.log("");
          } else i11iII && typeof i11iII == "object" && i11iII.message ? ($.errorJoinShop = i11iII.message, console.log("" + (i11iII.message || ""))) : console.log(IIIIi1lI);
        } else console.log(IIIIi1lI);
      } catch (liiIIli1) {
        $.logErr(liiIIli1, iIllI1I);
      } finally {
        Il1lll();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async l1Ilili1 => {
    let iIilii1I = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iI11iIlI = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIilii1I)
      },
      l1l1111 = await getH5st("ef79a", iI11iIlI),
      IilIIIl = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIilii1I + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1l1111),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IilIIIl, async (liI11IlI, lI1IIiiI, lIii111I) => {
      try {
        lIii111I = lIii111I && lIii111I.match(/jsonp_.*?\((.*?)\);/) && lIii111I.match(/jsonp_.*?\((.*?)\);/)[1] || lIii111I;
        let llIIIi1l = $.toObj(lIii111I, lIii111I);
        llIIIi1l && typeof llIIIi1l == "object" ? llIIIi1l && llIIIi1l.success == true && (console.log("\n去加入店铺会员：" + (llIIIi1l.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = llIIIi1l.result.interestsRuleList && llIIIi1l.result.interestsRuleList[0] && llIIIi1l.result.interestsRuleList[0].interestsInfo && llIIIi1l.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(lIii111I);
      } catch (ilI1Iili) {
        $.logErr(ilI1Iili, lI1IIiiI);
      } finally {
        l1Ilili1();
      }
    });
  });
}
function getUUID(ill1ll11 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", ilIIl1l = 0) {
  return ill1ll11.replace(/[xy]/g, function (IiI1I1i1) {
    var illllIlI = Math.random() * 16 | 0,
      llIi1Il1 = IiI1I1i1 == "x" ? illllIlI : illllIlI & 3 | 8;
    return ilIIl1l ? uuid = llIi1Il1.toString(36).toUpperCase() : uuid = llIi1Il1.toString(36), uuid;
  });
}

function encrypt(t, e) {
    const n = CryptoJS.enc.Utf8.parse(t),
        i = CryptoJS.enc.Utf8.parse('')
    return CryptoJS.AES.encrypt(e, n, {
        iv: i,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString()
}

function genCalcStr(_0x49984a, _0x25a8a2, _0x3d31ba, _0x24b4b9, _0x5e8649, _0x4d724d, _0x1c826c, _0x2bffaf, _0x66d11e, _0x4b23c1) {
    if (!_0x49984a) {
        return null
    }
    const _0x393586 = _0x49984a['\u006c\u0065\u006e\u0067\u0074\u0068']
    const _0x28fdff = []
    if (_0x393586 >= (0x777e1 ^ 0x777f9)) {
        const _0x57d7a2 = _0x393586 >> (0x2b235 ^ 0x2b234)
        if (_0x393586 % (0xe8be4 ^ 0xe8be6) !== (0x9b6db ^ 0x9b6db) && _0x25a8a2) {
            _0x28fdff['\u0070\u0075\u0073\u0068'](_0x49984a['\u0063\u0068\u0061\u0072\u0041\u0074'](_0x57d7a2))
        }
        let _0xb266d5 = -(0xace3e ^ 0xace3f)
        let _0xaffeef = Math['\u0066\u006c\u006f\u006f\u0072'](_0x393586 / (0x6667d ^ 0x66665) / (0xc588d ^ 0xc588f))
        if (!_0x3d31ba || !_0x1c826c) {
            _0xaffeef = _0xaffeef >> (0xc80d0 ^ 0xc80d1)
        }
        const _0x501055 = _0x49984a['\u006c\u0065\u006e\u0067\u0074\u0068'] - (0x3f235 ^ 0x3f234)
        if (_0x393586 >= (0xcd8a5 ^ 0xcd895)) {
            if (!_0x3d31ba) {
                if (!_0x1c826c) {
                    return null
                } else {
                    _0x57d7a2++
                    const _0x1bc474 = Math['\u006d\u0069\u006e'](_0xaffeef, _0x4b23c1)
                    const _0x1fc945 = 0x18 - _0x28fdff['\u006c\u0065\u006e\u0067\u0074\u0068']
                    const _0x2345c3 = _0x57d7a2 + _0x2bffaf + (_0x1bc474 + 0x1) * (_0x1fc945 - 0x1)
                    if ('\u006c' === _0x66d11e['\u0063\u0068\u0061\u0072\u0041\u0074'](0x0)) {
                        if (_0x2345c3 > _0x501055) {
                            _0x2bffaf = _0x57d7a2
                        } else {
                            _0x2bffaf = _0x57d7a2 + _0x2bffaf
                        }
                        for (let _0x132473 = 0xf21c7 ^ 0xf21c7; _0x132473 < _0x1fc945; _0x132473++) {
                            const _0x456951 = _0x2bffaf + _0x132473 * (_0x1bc474 + (0x74961 ^ 0x74960))
                            _0x28fdff['\u0070\u0075\u0073\u0068'](_0x49984a['\u0063\u0068\u0061\u0072\u0041\u0074'](_0x456951))
                        }
                    } else {
                        if (_0x2345c3 > _0x501055) {
                            _0x2bffaf = _0x501055
                        } else {
                            _0x2bffaf = _0x501055 - _0x2bffaf
                        }
                        for (let _0x321bbe = 0xe2d4e ^ 0xe2d4e; _0x321bbe < _0x1fc945; _0x321bbe++) {
                            const _0x4092a1 = _0x2bffaf - _0x321bbe * (_0x1bc474 + 0x1)
                            _0x28fdff['\u0070\u0075\u0073\u0068'](_0x49984a['\u0063\u0068\u0061\u0072\u0041\u0074'](_0x4092a1))
                        }
                    }
                    return _0x28fdff['\u006a\u006f\u0069\u006e'](''.split('').reverse().join(''))
                }
            } else {
                if (!_0x1c826c) {
                    _0x57d7a2--
                    const _0x295ee2 = Math['\u006d\u0069\u006e'](_0xaffeef, _0x4d724d)
                    const _0x306909 = (0x1baa8 ^ 0x1bab0) - _0x28fdff['\u006c\u0065\u006e\u0067\u0074\u0068']
                    const _0x412f6e = _0x24b4b9 + (_0x295ee2 + (0x5bc5c ^ 0x5bc5d)) * (_0x306909 - (0xd53e8 ^ 0xd53e9))
                    if ('\u006c' === _0x5e8649['\u0063\u0068\u0061\u0072\u0041\u0074'](0x0)) {
                        if (_0x412f6e > _0x57d7a2) {
                            _0x24b4b9 = 0x54ab2 ^ 0x54ab2
                        }
                        for (let _0xbfaff0 = 0x0; _0xbfaff0 < _0x306909; _0xbfaff0++) {
                            const _0x4b6d60 = _0x24b4b9 + _0xbfaff0 * (_0x295ee2 + 0x1)
                            _0x28fdff['\u0070\u0075\u0073\u0068'](_0x49984a['\u0063\u0068\u0061\u0072\u0041\u0074'](_0x4b6d60))
                        }
                    } else {
                        if (_0x412f6e > _0x57d7a2) {
                            _0x24b4b9 = _0x57d7a2
                        } else {
                            _0x24b4b9 = _0x57d7a2 - _0x24b4b9
                        }
                        for (let _0xb7fd1e = 0x19842 ^ 0x19842; _0xb7fd1e < _0x306909; _0xb7fd1e++) {
                            const _0x4fe9e3 = _0x24b4b9 - _0xb7fd1e * (_0x295ee2 + (0x45165 ^ 0x45164))
                            _0x28fdff['\u0070\u0075\u0073\u0068'](_0x49984a['\u0063\u0068\u0061\u0072\u0041\u0074'](_0x4fe9e3))
                        }
                    }
                    return _0x28fdff['\u006a\u006f\u0069\u006e'](''.split('').reverse().join(''))
                }
            }
        } else {
            _0xb266d5 = 0x0
        }
        const _0x736d9 = 0x18 - _0x28fdff['\u006c\u0065\u006e\u0067\u0074\u0068']
        let _0x4dc0eb = Math['\u006d\u0069\u006e'](_0xaffeef, _0x4d724d)
        let _0x1b1d99 = Math['\u006d\u0069\u006e'](_0xaffeef, _0x4b23c1)
        if (_0xb266d5 === (0x29057 ^ 0x29057)) {
            _0x4dc0eb = _0x1b1d99 = 0x690dc ^ 0x690dc
        }
        let _0x46d7dd
        if (_0x28fdff['\u006c\u0065\u006e\u0067\u0074\u0068'] > 0x0) {
            _0x46d7dd = _0x24b4b9 + (_0x4dc0eb + 0x1) * (_0x736d9 >> 0x1)
        } else {
            _0x46d7dd = _0x24b4b9 + (_0x4dc0eb + 0x1) * ((_0x736d9 >> (0xc0a1a ^ 0xc0a1b)) - (0xa319e ^ 0xa319f))
        }
        if ('\u006c' === _0x5e8649['\u0063\u0068\u0061\u0072\u0041\u0074'](0x32089 ^ 0x32089)) {
            if (_0x46d7dd > _0x57d7a2) {
                _0x24b4b9 = 0x0
            }
        } else {
            if (_0x46d7dd > _0x57d7a2) {
                _0x24b4b9 = _0x57d7a2 - 0x1
            } else {
                _0x24b4b9 = _0x57d7a2 - 0x1 - _0x24b4b9
            }
        }
        let _0x224758
        if (_0x28fdff['\u006c\u0065\u006e\u0067\u0074\u0068'] > 0x0) {
            _0x224758 = _0x57d7a2 + 0x1 + _0x2bffaf + (_0x1b1d99 + 0x1) * ((_0x736d9 >> 0x1) - (0x2e2ed ^ 0x2e2ec))
        } else {
            _0x224758 = _0x57d7a2 + _0x2bffaf + (_0x1b1d99 + (0xf0e58 ^ 0xf0e59)) * ((_0x736d9 >> (0x88e0a ^ 0x88e0b)) - 0x1)
        }
        if ('\u006c' === _0x66d11e['\u0063\u0068\u0061\u0072\u0041\u0074'](0xc7eea ^ 0xc7eea)) {
            if (_0x224758 > _0x501055) {
                _0x2bffaf = _0x57d7a2
            } else {
                _0x2bffaf = _0x57d7a2 + _0x2bffaf
            }
        } else {
            if (_0x224758 > _0x501055) {
                _0x2bffaf = _0x501055
            } else {
                _0x2bffaf = _0x501055 - _0x2bffaf
            }
        }
        let _0x2ec740 = 0x0
        let _0x3c34e2 = 0x5b29f ^ 0x5b29f
        for (let _0x5622b6 = 0x0; _0x5622b6 < _0x736d9; _0x5622b6++) {
            let _0x24d30f
            if (_0x5622b6 % 0x2 === 0x0) {
                if ('\u006c' === _0x5e8649['\u0063\u0068\u0061\u0072\u0041\u0074'](0x6635b ^ 0x6635b)) {
                    _0x24d30f = _0x24b4b9 + _0x2ec740 * (_0x4dc0eb + 0x1)
                } else {
                    _0x24d30f = _0x24b4b9 - _0x2ec740 * (_0x4dc0eb + 0x1)
                }
                _0x2ec740++
            } else {
                if ('\u006c' === _0x66d11e['\u0063\u0068\u0061\u0072\u0041\u0074'](0x0)) {
                    _0x24d30f = _0x2bffaf + _0x3c34e2 * (_0x1b1d99 + (0x8a632 ^ 0x8a633))
                } else {
                    _0x24d30f = _0x2bffaf - _0x3c34e2 * (_0x1b1d99 + 0x1)
                }
                _0x3c34e2++
            }
            _0x28fdff['\u0070\u0075\u0073\u0068'](_0x49984a['\u0063\u0068\u0061\u0072\u0041\u0074'](_0x24d30f))
        }
        return _0x28fdff['\u006a\u006f\u0069\u006e'](''.split('').reverse().join(''))
    } else {
        const _0x578b3e = (0x59215 ^ 0x5920d) - _0x393586
        const _0x529b87 = _0x578b3e % _0x393586 > 0x0 ? _0x578b3e / _0x393586 + 0x1 : _0x578b3e / _0x393586
        let _0xdf593a = ''.split('').reverse().join('')
        for (let _0x104c86 = 0x52329 ^ 0x52328; _0x104c86 <= _0x529b87; _0x104c86++) {
            let _0x52e8e8 = Math['\u0066\u006c\u006f\u006f\u0072'](_0x49984a['\u006c\u0065\u006e\u0067\u0074\u0068'] / (_0x104c86 + 0x1))
            for (let _0x169c75 = 0x0; _0x169c75 <= _0x104c86; _0x169c75++) {
                let _0xabeaaa
                if (_0x169c75 === _0x104c86) {
                    _0xabeaaa = _0x49984a['\u0073\u0075\u0062\u0073\u0074\u0072\u0069\u006e\u0067'](_0x169c75 * _0x52e8e8)
                } else {
                    _0xabeaaa = _0x49984a['\u0073\u0075\u0062\u0073\u0074\u0072\u0069\u006e\u0067'](_0x169c75 * _0x52e8e8, (_0x169c75 + 0x1) * _0x52e8e8)
                }
                let _0x41b1f2 = _0xabeaaa['\u0073\u0070\u006c\u0069\u0074']('')['\u0072\u0065\u0076\u0065\u0072\u0073\u0065']()['\u006a\u006f\u0069\u006e'](''.split('').reverse().join(''))
                _0xdf593a += _0x41b1f2
            }
        }
        const _0x34640a = _0xdf593a['\u0073\u0075\u0062\u0073\u0074\u0072\u0069\u006e\u0067'](0x0, _0x578b3e)
        return _0x49984a + _0x34640a
    }
}

function genTokenKey(_0x5e6d6a) {
    _0x5e6d6a = _0x5e6d6a['\u0073\u0070\u006c\u0069\u0074'](''.split('').reverse().join(''))['\u0072\u0065\u0076\u0065\u0072\u0073\u0065']()['\u006a\u006f\u0069\u006e'](''.split('').reverse().join(''))
    const _0x2a2a01 = new Uint8Array(0x59831 ^ 0x5983d)
    const _0x4ff6bb = new TextEncoder()['\u0065\u006e\u0063\u006f\u0064\u0065'](_0x5e6d6a)
    for (let _0x1f8482 = 0x0; _0x1f8482 < _0x4ff6bb['\u006c\u0065\u006e\u0067\u0074\u0068']; _0x1f8482 += 0x2) {
        let _0x504b1d = (_0x4ff6bb[_0x1f8482] << (0xa9ed8 ^ 0xa9edd)) | (_0x4ff6bb[_0x1f8482 + (0xe2cc0 ^ 0xe2cc1)] & (0xc3715 ^ 0xc37ea))
        _0x504b1d %= 0x3f
        _0x2a2a01[_0x1f8482 >> 0x1] = _0x504b1d
    }
    let _0x1fc547 = ''.split('').reverse().join('')
    for (let _0x282dd5 = 0xc9176 ^ 0xc9176; _0x282dd5 < _0x2a2a01['\u006c\u0065\u006e\u0067\u0074\u0068']; _0x282dd5++) {
        _0x1fc547 += (_0x2a2a01[_0x282dd5] + (0x748ea ^ 0x749ea))['\u0074\u006f\u0053\u0074\u0072\u0069\u006e\u0067'](0x2)['\u0073\u006c\u0069\u0063\u0065'](0xe1e75 ^ 0xe1e74)
    }
    let _0x57dd6a = ''
    let _0x48d99c = ''
    for (let _0x284690 = 0x490da ^ 0x490da; _0x284690 < 0x10; _0x284690++) {
        if (_0x284690 !== 0x0) {
            const _0x1e04e2 = _0x284690 * (0xd61ae ^ 0xd61a8)
            const _0x3dbb22 = _0x1fc547['\u0073\u0075\u0062\u0073\u0074\u0072\u0069\u006e\u0067'](_0x1e04e2, _0x1e04e2 + (0x9714a ^ 0x9714c))
            let _0xac327 = parseInt(_0x3dbb22, 0x9f818 ^ 0x9f81a)
            const _0x4644a7 = _0x48d99c['\u0073\u0070\u006c\u0069\u0074']('')
            for (let _0x1b2179 = 0x0; _0x1b2179 < _0x4644a7['\u006c\u0065\u006e\u0067\u0074\u0068']; _0x1b2179++) {
                if (_0x4644a7[_0x1b2179] === '\u0031') {
                    _0xac327 = ((_0xac327 >> ((0xafe22 ^ 0xafe24) - _0x1b2179)) | (_0xac327 << _0x1b2179)) & 0x3f
                }
            }
            _0x48d99c = (_0xac327 & (0x47a54 ^ 0x47a6b))['\u0074\u006f\u0053\u0074\u0072\u0069\u006e\u0067'](0x2)['\u0070\u0061\u0064\u0053\u0074\u0061\u0072\u0074'](0xa748a ^ 0xa748c, '\u0030')
        } else {
            _0x48d99c = _0x1fc547['\u0073\u0075\u0062\u0073\u0074\u0072\u0069\u006e\u0067'](0x0, 0x6)
        }
        _0x57dd6a += _0x48d99c
    }
    for (let _0x3db61b = 0x0; _0x3db61b < 0xc; _0x3db61b++) {
        const _0x1a4901 = _0x3db61b * (0xf1f6c ^ 0xf1f64)
        _0x2a2a01[_0x3db61b] = parseInt(_0x57dd6a['\u0073\u0075\u0062\u0073\u0074\u0072\u0069\u006e\u0067'](_0x1a4901, _0x1a4901 + (0x4a5cb ^ 0x4a5c3)), 0xe91e0 ^ 0xe91e2)
    }
    const _0xdd333 = btoa(String['\u0066\u0072\u006f\u006d\u0043\u0068\u0061\u0072\u0043\u006f\u0064\u0065']['\u0061\u0070\u0070\u006c\u0079'](null, _0x2a2a01))
    return _0xdd333
}
