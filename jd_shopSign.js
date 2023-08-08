/*
活动名称：店铺签到 · 超级无线/超级会员/lorealjdcampaign
活动链接：https://lzkj-isv.isvjd.com/sign/sevenDay/signActivity?activityId=<活动id>
        https://lzkj-isv.isvjd.com/sign/signActivity2?activityId=<活动id>
        https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=<活动id>
        https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=<活动id>
        https://lorealjdcampaign-rc.isvjcloud.com/prod/cc/cjwx/sign/signActivity2?activityId=<活动id>
环境变量：
jd_shopSign_activityUrl // 活动链接
jd_shopSign_joinMember // 是否入会（true/false），默认不入会

此脚本主要监控使用
				
cron: 7 7 7 7 7 jd_shopSign.js
*/

const Env=require('./utils/Env.js');
const $ = new Env('无线店铺签到（超级无线/超级会员）')
const l1l1I = require("./jdCookie"),
  iIlI1I = $.isNode() ? require("./sendNotify") : "",
  I1I1Ii = require("./function/jdCommon"),
  IiIl1 = require("./function/krgetToken"),
  IIIl = require("./function/krh5st"),
  {
    wxSavePrize: IIIi
  } = require("./function/krsavePrize"),
  l1IIli = process.env.jd_shopSign_activityUrl || "",
  iII1I1 = process.env.jd_shopSign_joinMember === "true";
let iiiIIi = "",
  lIi1iI = "",
  l1IIll = "",
  iiiIIl = {};
const lIIi11 = Object.keys(l1l1I).map(IIII => l1l1I[IIII]).filter(l1IIlI => l1IIlI);
!lIIi11[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (l1IIli) {
    $.activityId = I1I1Ii.getUrlParameter(l1IIli, "activityId");
    $.domain = l1IIli.match(/https?:\/\/([^/]+)/)[1];
    $.activityMode = null;
    if ($.domain.includes("cjhy")) $.activityMode = "cjhy";
    $.domain.includes("lzkj") && ($.activityMode = "lzkj", $.domain = "lzkj-isv.isvjd.com");
    if ($.domain.includes("lorealjdcampaign")) $.activityMode = "lorealjdcampaign";
    if (!$.activityMode) {
      console.log("请填写正确的活动链接");
      return;
    }
  } else {
    console.log("请填写活动链接");
    return;
  }
  if ($.domain.includes("lorealjdcampaign")) $.baseUrl = "https://" + $.domain + "/prod/cc/cjwx";else {
    $.baseUrl = "https://" + $.domain;
  }
  $.activityUrl = l1IIli;
  console.log("活动入口：" + $.activityUrl);
  if (!lIIi11[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let Ili111 = 0; Ili111 < lIIi11.length; Ili111++) {
    if (lIIi11[Ili111]) {
      $.index = Ili111 + 1;
      iiiIIi = lIIi11[Ili111];
      l1IIll = lIIi11[Ili111];
      $.UserName = decodeURIComponent(I1I1Ii.getCookieValue(iiiIIi, "pt_pin"));
      $.UA = I1I1Ii.genUA($.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await illiii();
      $.activityMode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      if ($.hasEnd || $.activityEnd || $.outFlag) break;
    }
  }
})().catch(Il11 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Il11 + "!", "");
}).finally(() => {
  $.done();
});
async function illiii() {
  $.signStop = false;
  $.isMember = false;
  $.Token = "";
  await llIili();
  if ($.hasEnd || $.activityEnd || $.outFlag) return;
  await $.wait(500);
  if ($.index == 1) {
    await IIIll1("/customer/getSimpleActInfoVo", "activityId=" + $.activityId);
    if (!$.venderId) {
      $.hasEnd = true;
      console.log("getSimpleActInfoVo 未能获取店铺信息");
      return;
    }
  }
  $.Token = await IiIl1(l1IIll, $.baseUrl);
  if ($.Token) {
    await Illil();
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    switch ($.activityMode) {
      case "lzkj":
      case "lorealjdcampaign":
        $.FormatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.FormatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    $.activityMode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  } else {
    console.log("获取[token]失败！");
    return;
  }
  if ($.secretPin) {
    switch ($.activityMode) {
      case "lzkj":
        await i11li("https://lzkj-isv.isvjd.com/common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1IIli) + "&subType=app&adSource=");
        break;
      case "cjhy":
        await i11li("https://cjhy-isv.isvjcloud.com/common/accessLog", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1IIli) + "&subType=app&adSource=");
        break;
      case "lorealjdcampaign":
        await i11li("https://lorealjdcampaign-rc.isvjcloud.com/prod/cc/cjwx/common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1IIli) + "&subType=app&adSource=");
        break;
    }
    $.activityMode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    if (iII1I1 && $.activityMode !== "lorealjdcampaign") {
      switch ($.activityMode) {
        case "lzkj":
          await l1l1i("/wxCommonInfo/getActMemberInfo", "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin);
          break;
        case "cjhy":
          await l1l1i("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
          break;
      }
      if (!$.isMember) {
        $.errorJoinShop = "";
        $.joinVenderId = $.venderId;
        for (let liIlIi = 0; liIlIi < Array(2).length; liIlIi++) {
          if (liIlIi > 0) console.log("第" + liIlIi + "次 重新开卡");
          await Illii();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
        }
        $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("❌ 开卡失败，重新执行脚本");
      }
    }
    $.index === 1 && (await illiil(), $.activityMode == "cjhy" ? await $.wait(1000) : await $.wait(500), l1IIli.indexOf("/sign/sevenDay/signActivity") != -1 ? await liI11l() : await I1I1II(), $.activityMode == "cjhy" ? await $.wait(1000) : await $.wait(500));
    $.signErrorTimes = 0;
    for (let I1lI1l = 0; I1lI1l < 20; I1lI1l++) {
      if (l1IIli.indexOf("/sign/sevenDay/signActivity") != -1) await i11ll("/sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + $.FormatPin);else {
        if (l1IIli.indexOf("/sign/signActivity") != -1) await Ili11I("/sign/wx/signUp", "actId=" + $.activityId + "&pin=" + $.FormatPin);else l1IIli.indexOf("lorealjdcampaign-rc.isvjcloud.com/prod/cc/cjwx/sign/signActivity2") != -1 && (await Ili11I("/sign/wx/signUp", "actId=" + $.activityId + "&pin=" + $.FormatPin));
      }
      if ($.signErrorTimes >= 5) {
        $.hasEnd = true;
        console.log("此ip已被限制，请更换IP后再执行脚本");
        break;
      }
      if ($.signStop) break;
      $.activityMode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
  } else $.log("没有成功获取到用户信息");
}
function IIIll1() {
  return new Promise(liiiIi => {
    $.post(iil11i("/customer/getSimpleActInfoVo", "activityId=" + $.activityId), async (Iii1ll, liiiIl, liIIiI) => {
      try {
        if (Iii1ll) {
          console.log(String(Iii1ll));
          console.log("getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {
          if (liIIiI && iIlI11(liIIiI)) {
            liIIiI = JSON.parse(liIIiI);
            if (liIIiI.data) {
              $.shopId = liIIiI.data.shopId;
              $.venderId = liIIiI.data.venderId;
              $.activityType = liIIiI.data.activityType;
            } else {}
          }
          liiiIl.status == 200 && Ill1II(liiiIl);
        }
      } catch (I1liiI) {
        $.logErr(I1liiI, liiiIl);
      } finally {
        liiiIi();
      }
    });
  });
}
function illiil() {
  return new Promise(liiiI1 => {
    $.post(iil11i("/sign/wx/getShopInfo", "venderId=" + $.venderId), async (liIIil, liI1, IliIiI) => {
      try {
        if (liIIil) {
          console.log(String(liIIil));
          console.log("getShopInfo API请求失败，请检查网路重试");
        } else {
          if (IliIiI && iIlI11(IliIiI)) {
            IliIiI = JSON.parse(IliIiI);
            if (IliIiI && IliIiI.isOk) {
              const IIiili = IliIiI.shopInfo.shopName;
              console.log("店铺名称：" + IIiili);
            } else {}
          }
          liI1.status == 200 && Ill1II(liI1);
        }
      } catch (Ii1I1) {
        $.logErr(Ii1I1, liI1);
      } finally {
        liiiI1();
      }
    });
  });
}
function liI11l() {
  return new Promise(illiiI => {
    $.post(iil11i("/sign/sevenDay/wx/getSignInfo", "actId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin), async (Il1iI1, IIIllI, Ill1Ii) => {
      try {
        if (Il1iI1) {
          console.log(String(Il1iI1));
          console.log("getSignInfo API请求失败，请检查网路重试");
        } else {
          if (Ill1Ii && iIlI11(Ill1Ii)) {
            Ill1Ii = JSON.parse(Ill1Ii);
            if (Ill1Ii) {
              const Il1iIi = Ill1Ii.giftConditions;
              if (Il1iIi && typeof Il1iIi == "object" && Il1iIi.length > 0) {
                console.log("累计奖励：");
                for (let Ii1Il of Il1iIi) {
                  const Iii1ii = Ii1Il.gift,
                    l1iiI1 = Ii1Il.dayNum;
                  if (Iii1ii && l1iiI1) {
                    let Iii1il = Iii1ii.giftName;
                    switch (Iii1ii.giftType) {
                      case 6:
                      case 7:
                      case 9:
                      case 13:
                      case 14:
                      case 15:
                      case 16:
                        break;
                      case 8:
                        Iii1il = "专享价";
                        break;
                      default:
                        Iii1il.includes("券") && (Iii1il = "优惠券");
                        break;
                    }
                    Iii1ii.giftTotal ? console.log("  签到" + l1iiI1 + "天，" + Iii1il + "（" + Iii1ii.giftTotal + "份" + (Iii1ii.insufficient ? "，已发完" : "") + "）") : console.log("  签到" + l1iiI1 + "天，" + Iii1il + (Iii1ii.insufficient ? "（已发完）" : ""));
                  }
                }
                console.log("");
              }
            } else {}
          }
          IIIllI.status == 200 && Ill1II(IIIllI);
        }
      } catch (Il1iIl) {
        $.logErr(Il1iIl, IIIllI);
      } finally {
        illiiI();
      }
    });
  });
}
async function l1l1i(lIi1ll, l1IIiI) {
  return new Promise(ilIlii => {
    $.post(iil11i(lIi1ll, l1IIiI), async (I1iiIi, li1i1, I1iiIl) => {
      try {
        if (I1iiIi) {
          console.log(String(I1iiIi));
          console.log("getOpenCardStatus API请求失败，请检查网路重试");
        } else {
          if (iIlI11(I1iiIl)) {
            I1iiIl = JSON.parse(I1iiIl);
            if (I1iiIl.result && I1iiIl.data) {
              switch ($.activityMode) {
                case "lzkj":
                  $.isMember = I1iiIl.data.openCard;
                  break;
                case "cjhy":
                  $.isMember = I1iiIl.data.openedCard;
                  break;
              }
            } else console.log(I1iiIl.errorMessage || "");
          }
          li1i1.status == 200 && Ill1II(li1i1);
        }
      } catch (li11i1) {
        $.logErr(li11i1, li1i1);
      } finally {
        ilIlii();
      }
    });
  });
}
function I1I1II() {
  return new Promise(ilIliI => {
    $.post(iil11i("/sign/wx/getActivity", "actId=" + $.activityId + "&venderId=" + $.venderId), async (Ii1lIl, iIIIiI, li1iI) => {
      try {
        if (Ii1lIl) {
          console.log(String(Ii1lIl));
          console.log("getActivity API请求失败，请检查网路重试");
        } else {
          if (li1iI && iIlI11(li1iI)) {
            li1iI = JSON.parse(li1iI);
            if (li1iI.act) {
              $.actTimeStr = li1iI.act.actTimeStr;
              console.log("活动时间：" + $.actTimeStr);
              $.wxSignActivityGiftBean = li1iI.act.wxSignActivityGiftBean;
              if ($.wxSignActivityGiftBean) {
                const ll1lI1 = $.wxSignActivityGiftBean.gift;
                if (ll1lI1) {
                  let liii11 = ll1lI1.giftName;
                  switch (ll1lI1.giftType) {
                    case 6:
                    case 7:
                    case 9:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                      break;
                    case 8:
                      liii11 = "专享价";
                      break;
                    default:
                      liii11.includes("券") && (liii11 = "优惠券");
                      break;
                  }
                  console.log("每日奖励：" + liii11 + "（" + ll1lI1.giftTotal + "份" + (ll1lI1.insufficient ? "，已发完" : "") + "）");
                }
                const II1ll = $.wxSignActivityGiftBean.giftConditions;
                if (II1ll && typeof II1ll == "object" && II1ll.length > 0) {
                  console.log("累计奖励：");
                  for (let i1Ill of II1ll) {
                    const Il1I11 = i1Ill.gift,
                      lIl1II = i1Ill.dayNum;
                    if (Il1I11 && lIl1II) {
                      let Ii1Ili = Il1I11.giftName;
                      switch (Il1I11.giftType) {
                        case 6:
                        case 7:
                        case 9:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                          break;
                        case 8:
                          Ii1Ili = "专享价";
                          break;
                        default:
                          Ii1Ili.includes("券") && (Ii1Ili = "优惠券");
                          break;
                      }
                      console.log("  签到" + lIl1II + "天，" + Ii1Ili + "（" + Il1I11.giftTotal + "份" + (Il1I11.insufficient ? "，已发完" : "") + "）");
                    }
                  }
                  console.log("");
                }
              }
            } else {}
          }
          iIIIiI.status == 200 && Ill1II(iIIIiI);
        }
      } catch (IIlII1) {
        $.logErr(IIlII1, iIIIiI);
      } finally {
        ilIliI();
      }
    });
  });
}
function i11ll(iliiiI, IIlIII) {
  return new Promise(lIilI1 => {
    $.post(iil11i(iliiiI, IIlIII), async (I1IIll, i1Ii1, lIilII) => {
      try {
        if (I1IIll) {
          console.log(String(I1IIll));
          $.signErrorTimes += 1;
        } else {
          $.signErrorTimes = 0;
          if (iIlI11(lIilII)) {
            lIilII = JSON.parse(lIilII);
            if (lIilII.isOk) {
              $.signStop = true;
              if (lIilII.signResult.gift) {
                const li1ll = lIilII.signResult.gift,
                  iliii1 = li1ll.insufficient;
                process.stdout.write("签到成功 ➜ ");
                if (!iliii1) switch (parseInt(li1ll.giftType)) {
                  case 6:
                    console.log("🎉 " + li1ll.giftName + " 🐶");
                    break;
                  case 7:
                    const i1IiI = lIilII.addressId;
                    let lIllil = li1ll.giftName;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + lIllil);
                    console.log("参考价值：" + lIilII.signResult.gift.priceInfo + "（元）");
                    console.log("预览图片：" + lIilII.signResult.gift.showImage);
                    let iilIi1 = await IIIi($.baseUrl, iiiIIi, $.UA, $.activityId, $.activityType, $.venderId, $.secretPin, lIllil, i1IiI);
                    !isNotify && iilIi1 && (await iIlI1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + lIllil + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + li1ll.giftName + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    console.log("🎉 恭喜获得" + li1ll.giftName + " 🎁");
                    $.isNode() && (await iIlI1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + li1ll.giftName + "\n\n" + l1IIli));
                    break;
                  case 16:
                    console.log("🎉 " + li1ll.priceInfo + " 🧧");
                    break;
                  default:
                    if (li1ll.giftName.includes("券")) {
                      console.log("🗑️ 优惠券");
                    } else console.log("获得：" + li1ll.giftName);
                    break;
                } else console.log("未中奖（奖品已发完）");
              } else console.log("签到成功");
            } else {
              !lIilII.msg.includes("火爆") && (console.log("签到失败 ➜ " + lIilII.msg), $.signStop = true);
              for (let III1ll of ["未开始", "结束", "不存在", "不在"]) {
                if (lIilII.msg.includes(III1ll)) {
                  $.hasEnd = true;
                  break;
                }
              }
            }
          }
          i1Ii1.status == 200 && Ill1II(i1Ii1);
        }
      } catch (iII11I) {
        $.logErr(iII11I, i1Ii1);
      } finally {
        lIilI1();
      }
    });
  });
}
function Ili11I(IiIii1, l1lIIl) {
  return new Promise(iilIii => {
    $.post(iil11i(IiIii1, l1lIIl), async (llIiii, IlII, IiIili) => {
      try {
        if (llIiii) {
          console.log(String(llIiii));
          $.signErrorTimes += 1;
        } else {
          $.signErrorTimes = 0;
          if (iIlI11(IiIili)) {
            IiIili = JSON.parse(IiIili);
            if (IiIili.isOk) {
              $.signStop = true;
              if (IiIili.gift) {
                const llIiiI = IiIili.gift,
                  IiIilI = llIiiI.insufficient;
                process.stdout.write("签到成功 ➜ ");
                if (!IiIilI) switch (parseInt(llIiiI.giftType)) {
                  case 6:
                    console.log("🎉 " + llIiiI.giftName + " 🐶");
                    break;
                  case 7:
                    const lIiIl1 = IiIili.addressId;
                    let iilIl1 = llIiiI.giftName;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + iilIl1);
                    console.log("参考价值：" + IiIili.gift.priceInfo + "（元）");
                    console.log("预览图片：" + IiIili.gift.showImage);
                    let l1II1 = await IIIi($.baseUrl, iiiIIi, $.UA, $.activityId, $.activityType, $.venderId, $.secretPin, iilIl1, lIiIl1);
                    !isNotify && l1II1 && (await iIlI1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iilIl1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + llIiiI.giftName + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    console.log("🎉 恭喜获得" + llIiiI.giftName + " 🎁");
                    $.isNode() && (await iIlI1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + llIiiI.giftName + "\n\n" + l1IIli));
                    break;
                  case 16:
                    console.log("🎉 " + llIiiI.priceInfo + " 🧧");
                    break;
                  default:
                    llIiiI.giftName.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + llIiiI.giftName);
                    break;
                } else console.log("未中奖（奖品已发完）");
              } else console.log("签到成功");
            } else {
              !IiIili.msg.includes("火爆") && !IiIili.msg.includes("擦肩") && (console.log("签到失败 ➜ " + IiIili.msg), $.signStop = true);
              for (let I1IlIl of ["未开始", "结束", "不存在", "不在"]) {
                if (IiIili.msg.includes(I1IlIl)) {
                  $.hasEnd = true;
                  break;
                }
              }
            }
          }
          IlII.status == 200 && Ill1II(IlII);
        }
      } catch (IiIil1) {
        $.logErr(IiIil1, IlII);
      } finally {
        iilIii();
      }
    });
  });
}
function i11li(iilIlI, i111i) {
  return new Promise(async IiIiii => {
    const lIlliI = {
      "url": iilIlI,
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": $.domain,
        "Origin": $.baseUrl,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": l1IIli,
        "Cookie": lIi1iI + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": i111i
    };
    $.post(lIlliI, (III1il, I1IlI1, i1111) => {
      try {
        III1il ? (console.log(String(III1il)), console.log("accessLogWithAD API请求失败，请检查网路重试")) : I1IlI1.status == 200 && Ill1II(I1IlI1);
      } catch (IIiI) {
        $.logErr(IIiI, I1IlI1);
      } finally {
        IiIiii();
      }
    });
  });
}
function Illil() {
  return $.secretPin = null, new Promise(li1lli => {
    let IllII = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP";
    $.post(iil11i("/customer/getMyPing", IllII), async (Ill1il, IIlI, I1i1l) => {
      try {
        if (Ill1il) {
          IIlI && typeof IIlI.statusCode != "undefined" && IIlI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), $.outFlag = true);
          console.log(String(Ill1il));
          console.log("getMyPing API请求失败，请检查网路重试");
        } else {
          IIlI.status == 200 && Ill1II(IIlI);
          if (iIlI11(I1i1l)) {
            I1i1l = JSON.parse(I1i1l);
            if (I1i1l.result && I1i1l.data) {
              $.secretPin = I1i1l.data.secretPin;
              $.nickName = I1i1l.data.nickname;
              $.AUTH_C_USER = $.secretPin;
            } else {}
          }
        }
      } catch (I1i1i) {
        $.logErr(I1i1i, IIlI);
      } finally {
        li1lli();
      }
    });
  });
}
function iil11i(iiiIii, IllI1) {
  return {
    "url": "" + $.baseUrl + iiiIii,
    "body": IllI1,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": $.baseUrl,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": l1IIli,
      "Cookie": lIi1iI + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function Ill1II(Iil11) {
  if (Iil11) {
    if (Iil11.headers["set-cookie"]) {
      iiiIIi = "";
      for (let i11Ii of Iil11.headers["set-cookie"]) {
        iiiIIl[i11Ii.split(";")[0].substr(0, i11Ii.split(";")[0].indexOf("="))] = i11Ii.split(";")[0].substr(i11Ii.split(";")[0].indexOf("=") + 1);
      }
      for (const iII1I of Object.keys(iiiIIl)) {
        iiiIIi += iII1I + "=" + iiiIIl[iII1I] + ";";
      }
      lIi1iI = iiiIIi;
    }
  }
}
function llIili() {
  return new Promise(i11I1 => {
    $.get({
      "url": l1IIli,
      "headers": {
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    }, (ilI1i1, l1I1I, l1lII1) => {
      try {
        if (ilI1i1) {
          l1I1I && typeof l1I1I.statusCode != "undefined" && l1I1I.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true);
          console.log(String(ilI1i1));
        } else {
          let i1i1iI = l1lII1.match(/(活动已经结束)/) && l1lII1.match(/(活动已经结束)/)[1] || "";
          i1i1iI && ($.activityEnd = true, console.log("活动已结束"));
          l1I1I.status == 200 && Ill1II(l1I1I);
        }
      } catch (l1I1i) {
        console.log(l1I1i);
      } finally {
        i11I1();
      }
    });
  });
}
async function Illii() {
  if (!$.joinVenderId) return;
  return new Promise(async iI11il => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let liiI = "";
    if ($.shopactivityId) liiI = ",\"activityId\":" + $.shopactivityId;
    const liIII1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + liiI + ",\"channel\":406}",
      I111il = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liIII1)
      },
      l1Ili1 = await IIIl("8adfb", I111il),
      iliili = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + liIII1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1Ili1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1IIll,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iliili, async (IIil1l, i1i1l1, iIii1i) => {
      try {
        iIii1i = iIii1i && iIii1i.match(/jsonp_.*?\((.*?)\);/) && iIii1i.match(/jsonp_.*?\((.*?)\);/)[1] || iIii1i;
        let IIil1i = $.toObj(iIii1i, iIii1i);
        if (IIil1i && typeof IIil1i == "object") {
          if (IIil1i && IIil1i.success === true) {
            console.log(IIil1i.message);
            $.errorJoinShop = IIil1i.message;
            if (IIil1i.result && IIil1i.result.giftInfo) {
              for (let II1i1I of IIil1i.result.giftInfo.giftList) {
                console.log("入会获得: " + II1i1I.discountString + II1i1I.prizeName + II1i1I.secondLineDesc);
              }
            }
            console.log("");
          } else IIil1i && typeof IIil1i == "object" && IIil1i.message ? ($.errorJoinShop = IIil1i.message, console.log("" + (IIil1i.message || ""))) : console.log(iIii1i);
        } else console.log(iIii1i);
      } catch (i1i1lI) {
        $.logErr(i1i1lI, i1i1l1);
      } finally {
        iI11il();
      }
    });
  });
}
function iIlI11(i11l1l) {
  if (!i11l1l) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(i11l1l) == "object") {
      return true;
    }
  } catch (iIii1I) {
    return console.log(iIii1I), false;
  }
}