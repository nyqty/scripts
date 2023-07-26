/*
活动名称：店铺签到 · 超级无线/超级会员/lorealjdcampaign
环境变量：jd_shopSign_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('无线店铺签到（超级无线/超级会员）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let activityUrl = process.env.jd_shopSign_activityUrl ? process.env.jd_shopSign_activityUrl : "",
  cookiesArr = [],
  cookie = "",
  message = "",
  activityCookie = "",
  domains = "";
if (activityUrl) {
  $.activityId = getQueryString("" + activityUrl, "activityId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
  $.domain_mode = null;
  if ($.domain.includes("cjhy")) $.domain_mode = "cjhy";
  $.domain.includes("lzkj") && ($.domain_mode = "lzkj", $.domain = "lzkj-isv.isvjd.com");
  if ($.domain.includes("lorealjdcampaign")) $.domain_mode = "lorealjdcampaign";
  if ($.domain_mode == null) {
    console.log("请填写正确的活动链接");
    return;
  }
} else {
  console.log("请填写活动链接");
  return;
}
$.domain.includes("lorealjdcampaign") ? domains = "https://" + $.domain + "/prod/cc/cjwx" : domains = "https://" + $.domain;
let lz_cookie = {};
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(liliiIIi => {
    cookiesArr.push(jdCookieNode[liliiIIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(i1iilIi => i1iilIi.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(II1lllI1 => !!II1lllI1);
}
!(async () => {
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let llI1Ill = 0; llI1Ill < cookiesArr.length; llI1Ill++) {
    if (cookiesArr[llI1Ill]) {
      cookie = cookiesArr[llI1Ill];
      originCookie = cookiesArr[llI1Ill];
      newCookie = "";
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = llI1Ill + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      await Main();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag) break;
    }
  }
  message !== "" && ($.isNode() ? await notify.sendNotify($.name, message, "", "\n") : $.msg($.name, "有点儿收获", message));
})().catch(iillii1I => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iillii1I + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  $.signStop = false;
  $.Token = "";
  switch ($.domain_mode) {
    case "lzkj":
      await getLZCK();
      break;
    case "cjhy":
    case "lorealjdcampaign":
      await getFirstLZCK();
      break;
  }
  if ($.hasEnd || $.activityEnd || $.outFlag) return;
  await $.wait(500);
  if ($.index == 1) {
    await getSimpleActInfoVo("/customer/getSimpleActInfoVo", "activityId=" + $.activityId);
    if (!$.venderId) {
      $.hasEnd = true;
      console.log("getSimpleActInfoVo 未能获取店铺信息");
      return;
    }
  }
  $.Token = await getToken(originCookie, domains);
  if ($.Token) {
    await getMyPing();
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    switch ($.domain_mode) {
      case "lzkj":
      case "lorealjdcampaign":
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
  if ($.secretPin) {
    switch ($.domain_mode) {
      case "lzkj":
        await accessLogWithAD("https://lzkj-isv.isvjd.com/common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource=");
        break;
      case "cjhy":
        await accessLogWithAD("https://cjhy-isv.isvjcloud.com/common/accessLog", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource=");
        break;
      case "lorealjdcampaign":
        await accessLogWithAD("https://lorealjdcampaign-rc.isvjcloud.com/prod/cc/cjwx/common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource=");
        break;
    }
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    $.index === 1 && (await getShopInfo(), $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500), activityUrl.indexOf("/sign/sevenDay/signActivity") != -1 ? await getSignInfo() : await getActivity(), $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500));
    $.signErrorTimes = 0;
    for (let il1l1Ill = 0; il1l1Ill < 20; il1l1Ill++) {
      if (activityUrl.indexOf("/sign/sevenDay/signActivity") != -1) await sign("/sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + $.FormatPin);else {
        if (activityUrl.indexOf("/sign/signActivity") != -1) await signUp("/sign/wx/signUp", "actId=" + $.activityId + "&pin=" + $.FormatPin);else activityUrl.indexOf("lorealjdcampaign-rc.isvjcloud.com/prod/cc/cjwx/sign/signActivity2") != -1 && (await signUp("/sign/wx/signUp", "actId=" + $.activityId + "&pin=" + $.FormatPin));
      }
      if ($.signErrorTimes >= 5) {
        $.hasEnd = true;
        console.log("此ip已被限制，请更换IP后再执行脚本");
        break;
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      if ($.signStop) break;
    }
  } else $.log("没有成功获取到用户信息");
}
function getSimpleActInfoVo() {
  return new Promise(IIIiIIlI => {
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", "activityId=" + $.activityId), async (iI1I1IIi, li11Il, ii1ll1) => {
      try {
        if (iI1I1IIi) {
          console.log(String(iI1I1IIi));
          console.log("getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {
          if (ii1ll1 && safeGet(ii1ll1)) {
            ii1ll1 = JSON.parse(ii1ll1);
            if (ii1ll1.data) {
              $.shopId = ii1ll1.data.shopId;
              $.venderId = ii1ll1.data.venderId;
              $.activityType = ii1ll1.data.activityType;
            } else {}
          }
          li11Il.status == 200 && setActivityCookie(li11Il);
        }
      } catch (Il11ili1) {
        $.logErr(Il11ili1, li11Il);
      } finally {
        IIIiIIlI();
      }
    });
  });
}
function getShopInfo() {
  return new Promise(iili1il => {
    $.post(taskPostUrl("/sign/wx/getShopInfo", "venderId=" + $.venderId), async (Ill1ii1I, llIlli, IlIi11Il) => {
      try {
        if (Ill1ii1I) {
          console.log(String(Ill1ii1I));
          console.log("getShopInfo API请求失败，请检查网路重试");
        } else {
          if (IlIi11Il && safeGet(IlIi11Il)) {
            IlIi11Il = JSON.parse(IlIi11Il);
            if (IlIi11Il && IlIi11Il.isOk) {
              const ii1liIII = IlIi11Il.shopInfo.shopName;
              console.log("店铺名称：" + ii1liIII);
            } else {}
          }
          llIlli.status == 200 && setActivityCookie(llIlli);
        }
      } catch (ilIli1ii) {
        $.logErr(ilIli1ii, llIlli);
      } finally {
        iili1il();
      }
    });
  });
}
function getSignInfo() {
  return new Promise(IIlil111 => {
    $.post(taskPostUrl("/sign/sevenDay/wx/getSignInfo", "actId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin), async (i1IilIii, I1I1iI1i, IliIili) => {
      try {
        if (i1IilIii) {
          console.log(String(i1IilIii));
          console.log("getSignInfo API请求失败，请检查网路重试");
        } else {
          if (IliIili && safeGet(IliIili)) {
            IliIili = JSON.parse(IliIili);
            if (IliIili) {
              $.startTime = IliIili.startTime;
              console.log("活动时间：" + $.time("yyyy-MM-dd HH:mm:ss", $.startTime));
              const lilIl1Il = IliIili.giftConditions;
              if (lilIl1Il && typeof lilIl1Il == "object" && lilIl1Il.length > 0) {
                console.log("累计奖励：");
                for (let Ii1IIi11 of lilIl1Il) {
                  const li11i1i = Ii1IIi11.gift,
                    i1l1l11I = Ii1IIi11.dayNum;
                  if (li11i1i && i1l1l11I) {
                    let ii1l11ii = li11i1i.giftName;
                    switch (li11i1i.giftType) {
                      case 6:
                      case 7:
                      case 9:
                      case 13:
                      case 14:
                      case 15:
                      case 16:
                        break;
                      case 8:
                        ii1l11ii = "专享价";
                        break;
                      default:
                        ii1l11ii.includes("券") && (ii1l11ii = "优惠券");
                        break;
                    }
                    li11i1i.giftTotal ? console.log("  签到" + i1l1l11I + "天，" + ii1l11ii + "（" + li11i1i.giftTotal + "份" + (li11i1i.insufficient ? "，已发完" : "") + "）") : console.log("  签到" + i1l1l11I + "天，" + ii1l11ii + (li11i1i.insufficient ? "（已发完）" : "") + "）");
                  }
                }
                console.log("");
              }
            } else {}
          }
          I1I1iI1i.status == 200 && setActivityCookie(I1I1iI1i);
        }
      } catch (iIiiIIlI) {
        $.logErr(iIiiIIlI, I1I1iI1i);
      } finally {
        IIlil111();
      }
    });
  });
}
function getActivity() {
  return new Promise(I11II1iI => {
    $.post(taskPostUrl("/sign/wx/getActivity", "actId=" + $.activityId + "&venderId=" + $.venderId), async (IiiIiil1, I1I1Ii11, IIllllIi) => {
      try {
        if (IiiIiil1) {
          console.log(String(IiiIiil1));
          console.log("getActivity API请求失败，请检查网路重试");
        } else {
          if (IIllllIi && safeGet(IIllllIi)) {
            IIllllIi = JSON.parse(IIllllIi);
            if (IIllllIi.act) {
              $.actTimeStr = IIllllIi.act.actTimeStr;
              console.log("活动时间：" + $.actTimeStr);
              $.wxSignActivityGiftBean = IIllllIi.act.wxSignActivityGiftBean;
              if ($.wxSignActivityGiftBean) {
                const ll111IlI = $.wxSignActivityGiftBean.gift;
                if (ll111IlI) {
                  let I1illII1 = ll111IlI.giftName;
                  switch (ll111IlI.giftType) {
                    case 6:
                    case 7:
                    case 9:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                      break;
                    case 8:
                      I1illII1 = "专享价";
                      break;
                    default:
                      I1illII1.includes("券") && (I1illII1 = "优惠券");
                      break;
                  }
                  console.log("每日奖励：" + I1illII1 + "（" + ll111IlI.giftTotal + "份" + (ll111IlI.insufficient ? "，已发完" : "") + "）");
                }
                const llI11IiI = $.wxSignActivityGiftBean.giftConditions;
                if (llI11IiI && typeof llI11IiI == "object" && llI11IiI.length > 0) {
                  console.log("累计奖励：");
                  for (let i1Ili1i1 of llI11IiI) {
                    const lII11l1 = i1Ili1i1.gift,
                      l1IillI = i1Ili1i1.dayNum;
                    if (lII11l1 && l1IillI) {
                      let iiI1lIii = lII11l1.giftName;
                      switch (lII11l1.giftType) {
                        case 6:
                        case 7:
                        case 9:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                          break;
                        case 8:
                          iiI1lIii = "专享价";
                          break;
                        default:
                          iiI1lIii.includes("券") && (iiI1lIii = "优惠券");
                          break;
                      }
                      console.log("  签到" + l1IillI + "天，" + iiI1lIii + "（" + lII11l1.giftTotal + "份" + (lII11l1.insufficient ? "，已发完" : "") + "）");
                    }
                  }
                  console.log("");
                }
              }
            } else {}
          }
          I1I1Ii11.status == 200 && setActivityCookie(I1I1Ii11);
        }
      } catch (IilIIIil) {
        $.logErr(IilIIIil, I1I1Ii11);
      } finally {
        I11II1iI();
      }
    });
  });
}
function sign(liiI1Ill, iI1iil1) {
  return new Promise(iIlii1Il => {
    $.post(taskPostUrl(liiI1Ill, iI1iil1), async (i1i1iI1i, Il1Ii11, II1IIlll) => {
      try {
        if (i1i1iI1i) {
          console.log(String(i1i1iI1i));
          $.signErrorTimes += 1;
        } else {
          $.signErrorTimes = 0;
          if (safeGet(II1IIlll)) {
            II1IIlll = JSON.parse(II1IIlll);
            if (II1IIlll.isOk) {
              $.signStop = true;
              if (II1IIlll.signResult.gift) {
                const l1iIl1i1 = II1IIlll.signResult.gift,
                  Ili1iIi1 = l1iIl1i1.insufficient;
                process.stdout.write("签到成功 ➜ ");
                if (!Ili1iIi1) switch (parseInt(l1iIl1i1.giftType)) {
                  case 6:
                    console.log("🎉 " + l1iIl1i1.giftName + " 🐶");
                    break;
                  case 7:
                    const l1i1Ill = II1IIlll.addressId;
                    let IiiiiiiI = l1iIl1i1.giftName;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + IiiiiiiI);
                    console.log("参考价值：" + II1IIlll.signResult.gift.priceInfo + "（元）");
                    console.log("预览图片：" + II1IIlll.signResult.gift.showImage);
                    let lI111I11 = await wxSavePrize(domains, cookie, "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", $.activityId, $.activityType, $.venderId, $.secretPin, IiiiiiiI, l1i1Ill);
                    lI111I11 ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + IiiiiiiI + "，已成功自动登记收货地址\n\n" + $.activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + IiiiiiiI + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + l1iIl1i1.giftName + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    console.log("🎉 恭喜获得" + l1iIl1i1.giftName + " 🎁");
                    $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + l1iIl1i1.giftName + "\n\n" + activityUrl));
                    break;
                  case 16:
                    console.log("🎉 " + l1iIl1i1.priceInfo + " 🧧");
                    break;
                  default:
                    l1iIl1i1.giftName.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + l1iIl1i1.giftName);
                    break;
                } else console.log("未中奖（奖品已发完）");
              } else console.log("签到成功");
            } else {
              !II1IIlll.msg.includes("火爆") && (console.log("签到失败 ➜ " + II1IIlll.msg), $.signStop = true);
              for (let I1l11iIl of ["未开始", "结束", "不存在", "不在"]) {
                if (II1IIlll.msg.includes(I1l11iIl)) {
                  $.hasEnd = true;
                  break;
                }
              }
            }
          }
          Il1Ii11.status == 200 && setActivityCookie(Il1Ii11);
        }
      } catch (iIi1III) {
        $.logErr(iIi1III, Il1Ii11);
      } finally {
        iIlii1Il();
      }
    });
  });
}
function signUp(I11IIlI1, iIiiliiI) {
  return new Promise(I1Iii1l => {
    $.post(taskPostUrl(I11IIlI1, iIiiliiI), async (I1Ii1iI1, lliiIli1, il1ilI11) => {
      try {
        if (I1Ii1iI1) {
          console.log(String(I1Ii1iI1));
          $.signErrorTimes += 1;
        } else {
          $.signErrorTimes = 0;
          if (safeGet(il1ilI11)) {
            il1ilI11 = JSON.parse(il1ilI11);
            if (il1ilI11.isOk) {
              $.signStop = true;
              if (il1ilI11.gift) {
                const lli1liI = il1ilI11.gift,
                  ilIiliIi = lli1liI.insufficient;
                process.stdout.write("签到成功 ➜ ");
                if (!ilIiliIi) switch (parseInt(lli1liI.giftType)) {
                  case 6:
                    console.log("🎉 " + lli1liI.giftName + " 🐶");
                    break;
                  case 7:
                    const lIlillli = il1ilI11.addressId;
                    let iII1Ii11 = lli1liI.giftName;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + iII1Ii11);
                    console.log("参考价值：" + il1ilI11.gift.priceInfo + "（元）");
                    console.log("预览图片：" + il1ilI11.gift.showImage);
                    let I1lliIII = await wxSavePrize(domains, cookie, "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", $.activityId, $.activityType, $.venderId, $.secretPin, iII1Ii11, lIlillli);
                    I1lliIII ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iII1Ii11 + "，已成功自动登记收货地址\n\n" + $.activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iII1Ii11 + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + lli1liI.giftName + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    console.log("🎉 恭喜获得" + lli1liI.giftName + " 🎁");
                    if ($.isNode()) {
                      await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lli1liI.giftName + "\n\n" + activityUrl);
                    }
                    break;
                  case 16:
                    console.log("🎉 " + lli1liI.priceInfo + " 🧧");
                    break;
                  default:
                    if (lli1liI.giftName.includes("券")) console.log("🗑️ 优惠券");else {
                      console.log("获得：" + lli1liI.giftName);
                    }
                    break;
                } else console.log("未中奖（奖品已发完）");
              } else console.log("签到成功");
            } else {
              !il1ilI11.msg.includes("火爆") && !il1ilI11.msg.includes("擦肩") && (console.log("签到失败 ➜ " + il1ilI11.msg), $.signStop = true);
              for (let l1i1Ii11 of ["未开始", "结束", "不存在", "不在"]) {
                if (il1ilI11.msg.includes(l1i1Ii11)) {
                  $.hasEnd = true;
                  break;
                }
              }
            }
          }
          lliiIli1.status == 200 && setActivityCookie(lliiIli1);
        }
      } catch (lii1lIl1) {
        $.logErr(lii1lIl1, lliiIli1);
      } finally {
        I1Iii1l();
      }
    });
  });
}
function accessLogWithAD(I1lII1l, iI11li1l) {
  return new Promise(async lIili1 => {
    const Il1llilI = {
      "url": I1lII1l,
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": $.domain,
        "Origin": domains,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl,
        "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": iI11li1l
    };
    $.post(Il1llilI, (IiiIll1I, iIiIllII, IIIIIIli) => {
      try {
        IiiIll1I ? (console.log(String(IiiIll1I)), console.log("accessLogWithAD API请求失败，请检查网路重试")) : iIiIllII.status == 200 && setActivityCookie(iIiIllII);
      } catch (iIlIli) {
        $.logErr(iIlIli, iIiIllII);
      } finally {
        lIili1();
      }
    });
  });
}
function getMyPing() {
  return $.secretPin = null, new Promise(Ii11lllI => {
    let IlIIl1ii = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", IlIIl1ii), async (IlIil1iI, Iiliii1, i11lIii1) => {
      try {
        if (IlIil1iI) {
          Iiliii1 && typeof Iiliii1.statusCode != "undefined" && Iiliii1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), $.outFlag = true);
          console.log(String(IlIil1iI));
          console.log("getMyPing API请求失败，请检查网路重试");
        } else {
          Iiliii1.status == 200 && setActivityCookie(Iiliii1);
          if (safeGet(i11lIii1)) {
            i11lIii1 = JSON.parse(i11lIii1);
            if (i11lIii1.result && i11lIii1.data) {
              $.secretPin = i11lIii1.data.secretPin;
              $.nickName = i11lIii1.data.nickname;
              $.AUTH_C_USER = $.secretPin;
            } else {}
          }
        }
      } catch (I11l1I1) {
        $.logErr(I11l1I1, Iiliii1);
      } finally {
        Ii11lllI();
      }
    });
  });
}
function taskPostUrl(Iii111i1, iiII1ii1) {
  return {
    "url": "" + domains + Iii111i1,
    "body": iiII1ii1,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function setActivityCookie(iiIl1Iil) {
  if (iiIl1Iil) {
    if (iiIl1Iil.headers["set-cookie"]) {
      cookie = "";
      for (let IiiIIi1i of iiIl1Iil.headers["set-cookie"]) {
        lz_cookie[IiiIIi1i.split(";")[0].substr(0, IiiIIi1i.split(";")[0].indexOf("="))] = IiiIIi1i.split(";")[0].substr(IiiIIi1i.split(";")[0].indexOf("=") + 1);
      }
      for (const iIIiliIi of Object.keys(lz_cookie)) {
        cookie += iIIiliIi + "=" + lz_cookie[iIIiliIi] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function getLZCK() {
  return new Promise(iiI1lili => {
    let il1I1lI1 = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(il1I1lI1, async (iIi111, I1II11i1, llllillI) => {
      try {
        if (iIi111) {
          if (I1II11i1 && typeof I1II11i1.statusCode != "undefined") {
            if (I1II11i1.statusCode == 493) {
              console.log("getLZCK 此ip已被限制，请过10分钟后再执行脚本");
              $.outFlag = true;
            }
          }
          console.log(String(iIi111));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else I1II11i1.status == 200 && setActivityCookie(I1II11i1);
      } catch (l1lIi1I) {
        $.logErr(l1lIi1I, I1II11i1);
      } finally {
        iiI1lili();
      }
    });
  });
}
function getFirstLZCK() {
  return new Promise(I111IIIi => {
    $.get({
      "url": activityUrl,
      "headers": {
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    }, (iIII1ii, I1Illill, i1iIli1i) => {
      try {
        if (iIII1ii) {
          I1Illill && typeof I1Illill.statusCode != "undefined" && I1Illill.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true);
          console.log(String(iIII1ii));
        } else {
          let ii1lIi1l = i1iIli1i.match(/(活动已经结束)/) && i1iIli1i.match(/(活动已经结束)/)[1] || "";
          ii1lIi1l && ($.activityEnd = true, console.log("活动已结束"));
          I1Illill.status == 200 && setActivityCookie(I1Illill);
        }
      } catch (I1I1iilI) {
        console.log(I1I1iilI);
      } finally {
        I111IIIi();
      }
    });
  });
}
function random(Il1IiilI, I1l11li) {
  return Math.floor(Math.random() * (I1l11li - Il1IiilI)) + Il1IiilI;
}
function getUUID(III1l1i1 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", i1liI11 = 0) {
  return III1l1i1.replace(/[xy]/g, function (IIilII1l) {
    var llIi1lIi = Math.random() * 16 | 0,
      i11lllii = IIilII1l == "x" ? llIi1lIi : llIi1lIi & 3 | 8;
    return i1liI11 ? uuid = i11lllii.toString(36).toUpperCase() : uuid = i11lllii.toString(36), uuid;
  });
}
function safeGet(iiiI111l) {
  if (!iiiI111l) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(iiiI111l) == "object") return true;
  } catch (Ii1lIl11) {
    return console.log(Ii1lIl11), false;
  }
}
function getQueryString(lIi1l1l1, Il11iiIl) {
  let liI1i11l = new RegExp("(^|[&?])" + Il11iiIl + "=([^&]*)(&|$)"),
    li1i1ll = lIi1l1l1.match(liI1i11l);
  if (li1i1ll != null) return decodeURIComponent(li1i1ll[2]);
  return "";
}
