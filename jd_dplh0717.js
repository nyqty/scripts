/*
大牌联合0717期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230717doo/oC20230717doo?actId=293a4a9a49ef4860a1_230717

自行运行，有水无水自测。

变量填写：
黑名单 用&隔开 pin值
//export DPLHTY_blacklist="" 
重试次数，默认30
//export retrynum="30"
如需修改抽奖次数请设置环境变量：
//export opencard_draw="3" //次数

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码
============Quantumultx===============
[task_local]
#大牌联合0717期
1 12 20,21 * * jd_dplh0717.js, tag=大牌联合0717期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0717期");
const IIiili = $.isNode() ? require("./jdCookie.js") : "",
  IIiiiI = $.isNode() ? require("./sendNotify") : "";
let lIi1l1 = [],
  i11IlI = "";
if ($.isNode()) {
  Object.keys(IIiili).forEach(Il1iI1 => {
    lIi1l1.push(IIiili[Il1iI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lIi1l1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...llli11($.getdata("CookiesJD") || "[]").map(IIIllI => IIIllI.cookie)].filter(Ill1Ii => !!Ill1Ii);
let Ii1I1 = "30",
  i11Il1 = "0";
Ii1I1 = $.isNode() ? process.env.retrynum ? process.env.retrynum : Ii1I1 : $.getdata("retrynum") ? $.getdata("retrynum") : i11Il1;
i11Il1 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : i11Il1 : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : i11Il1;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let IIIlli = "",
  IIIlll = "",
  llli1I = "293a4a9a49ef4860a1_230717";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const IlilI1 = require("./function/krgetToken"),
  iIIIi = require("./function/krh5st");
let Il1iII = "https://jinggengjcq-isv.isvjcloud.com";
IIIlll = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IIIlll : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IIIlll;
let Iii1iI = "",
  lIi1lI = "";
$.whitelist = process.env.DPLHTY_whitelist || Iii1iI;
$.blacklist = process.env.DPLHTY_blacklist || lIi1lI;
Ili11i();
i11Iil();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = IIIlll ? IIIlll : authorCodeList[l1IlIl(0, authorCodeList.length)];
  console.log("\n💬 默认抽奖次数：" + i11Il1 + " 💬 重试次数：" + Ii1I1);
  console.log("\n💬 请在有水的情况下运行");
  if (!lIi1l1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = llli1I;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let iIII1 = 0; iIII1 < lIi1l1.length; iIII1++) {
    i11IlI = lIi1l1[iIII1];
    if (i11IlI) {
      $.UserName = decodeURIComponent(i11IlI.match(/pt_pin=([^; ]+)(?=;?)/) && i11IlI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIII1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await illiiI();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await IIiiil();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let iIlilI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iIlilI);
    if ($.isNode()) await IIiiiI.sendNotify("" + $.name, "" + iIlilI);
  }
})().catch(i11Ii1 => $.logErr(i11Ii1)).finally(() => $.done());
async function IIiiil() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    IIIlli = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await IlilI1(i11IlI, Il1iII);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await iIIIl("activity_load");
    for (let I1I11I = 0; I1I11I < Ii1I1; I1I11I++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIIIl("activity_load");
        if ($.krFlag) break;
      }
    }
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("❌ 获取[活动信息]失败，可能是黑号或者太卡了");
      return;
    }
    $.toBind = 0;
    $.openList = [];
    await iIIIl("绑定");
    for (let I11i = 0; I11i < Ii1I1; I11i++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIIIl("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await iIIIl("shopList");
    for (let I11l = 0; I11l < Ii1I1; I11l++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIIIl("shopList");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.activityEnd) return;
    for (o of $.openList) {
      $.missionType = "openCard";
      if (o.open != true && o.openCardUrl) {
        if ($.activityEnd) return;
        if ($.outEnd) return;
        $.openCard = false;
        $.joinVenderId = o.userId;
        await iIIIl("mission");
        for (let illI1l = 0; illI1l < Ii1I1; illI1l++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iIIIl("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await Ili11l();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await Ili11l(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIIIl("activity_load");
          for (let lIllli = 0; lIllli < Ii1I1; lIllli++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iIIIl("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIIIl("shopList");
          for (let I11I = 0; I11I < Ii1I1; I11I++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iIIIl("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await iIIIl("mission");
      for (let ll1Ili = 0; ll1Ili < Ii1I1; ll1Ili++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIIIl("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await iIIIl("mission");
      for (let i1IiIl = 0; i1IiIl < Ii1I1; i1IiIl++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIIIl("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (i11Il1 + "" !== "0") {
      $.runFalag = true;
      let Ili1il = parseInt($.totalPoint / 200);
      i11Il1 = parseInt(i11Il1, 10);
      if (Ili1il > i11Il1) Ili1il = i11Il1;
      console.log("💖 抽奖次数为:" + Ili1il);
      for (m = 1; Ili1il--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIIIl("抽奖");
        for (let i1lII = 0; i1lII < Ii1I1; i1lII++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iIIIl("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(Ili1il) <= 0) break;
        if (m >= 10) {
          console.log("💔 抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("🔊 后面的号都会助力:" + $.inviteNick));
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  } catch (iII111) {
    console.log(iII111);
  }
}
async function iIIIl(Ili1ii) {
  if ($.outFlag) return;
  let llIiii = "https://jinggengjcq-isv.isvjcloud.com",
    IlII = "",
    IiIili = "POST",
    llIiil = "";
  switch (Ili1ii) {
    case "activity_load":
      url = llIiii + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llIiil = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) llIiil = {
        ...llIiil,
        "shopId": "" + $.joinVenderId
      };
      IlII = l1IlIi("/jdBigAlliance/activity/load", llIiil);
      break;
    case "shopList":
      url = llIiii + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llIiil = {};
      IlII = l1IlIi("/jdBigAlliance/shop/shopList", llIiil);
      break;
    case "绑定":
      url = llIiii + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llIiil = {
        "inviterNick": $.inviteNick || ""
      };
      IlII = l1IlIi("/jdBigAlliance/customer/inviteRelation", llIiil);
      break;
    case "mission":
      url = llIiii + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llIiil = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) llIiil = {
        ...llIiil,
        "shopId": $.joinVenderId
      };
      IlII = l1IlIi("/jdBigAlliance/mission/completeMission", llIiil);
      break;
    case "抽奖":
      url = llIiii + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llIiil = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      IlII = l1IlIi("/jdBigAlliance/interactive/drawPost", llIiil);
      break;
    default:
      console.log("错误" + Ili1ii);
  }
  let IlIi11 = liIIll(url, IlII, IiIili);
  return new Promise(async I1IlIi => {
    $.post(IlIi11, (l1III, l1I1iI, III1l1) => {
      try {
        l1III ? (l1I1iI && l1I1iI.statusCode && l1I1iI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : IIiiii(Ili1ii, III1l1);
      } catch (IlIl) {
        console.log(IlIl, l1I1iI);
      } finally {
        I1IlIi();
      }
    });
  });
}
async function IIiiii(l1IIl, l1I1il) {
  let l1I1ii = "";
  try {
    $.krFlag = true;
    if (l1IIl != "accessLogWithAD" || l1IIl != "drawContent") {
      l1I1il && (l1I1ii = JSON.parse(l1I1il));
    }
  } catch (IIii) {
    console.log("🤬 " + l1IIl + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let i1Ii1I = "";
    switch (l1IIl) {
      case "抽奖":
        if (typeof l1I1ii == "object") {
          if (l1I1ii.success && l1I1ii.success === true && l1I1ii.data) {
            if (l1I1ii.data.status && l1I1ii.data.status == 200) {
              if (l1I1ii.data.data.sendResult) {
                console.log("抽中：" + l1I1ii.data.data.awardSetting.awardName);
              } else !l1I1ii.data.data.result ? console.log("空气") : console.log(l1I1ii.data.data);
            } else l1I1ii.data.status && l1I1ii.data.status == 500 && console.log("" + (l1I1ii.data.msg || ""));
          } else l1I1ii.message ? console.log("" + (l1I1ii.message || "")) : console.log(l1I1il);
        } else console.log(l1I1il);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      case "activity_load":
      case "mission":
      case "shopList":
      case "loadUniteOpenCard":
      case "setMixNick":
      case "uniteOpenCardOne":
      case "checkOpenCard":
      case "followShop":
      case "addCart":
      case "myAward":
      case "missionInviteList":
      case "绑定":
        i1Ii1I = "";
        if (l1IIl == "followShop") i1Ii1I = "关注";
        if (l1IIl == "addCart") i1Ii1I = "加购";
        if (typeof l1I1ii == "object") {
          if (l1I1ii.success && l1I1ii.success === true && l1I1ii.data) {
            if (l1I1ii.data.status && l1I1ii.data.status == 200) {
              l1I1ii = l1I1ii.data;
              if (l1IIl != "setMixNick" && (l1I1ii.msg || l1I1ii.data.isOpenCard || l1I1ii.data.remark)) console.log("🔊 " + (i1Ii1I && i1Ii1I + ":" || "") + (l1I1ii.msg || l1I1ii.data.isOpenCard || l1I1ii.data.remark || ""));
              if (l1IIl == "activity_load") {
                if (l1I1ii.msg || l1I1ii.data.isOpenCard) {
                  if ((l1I1ii.msg || l1I1ii.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (l1I1ii.data) {
                  $.endTime = l1I1ii.data.cusActivity.endTime || 0;
                  $.MixNick = l1I1ii.data.missionCustomer.buyerNick || "";
                  $.usedChance = l1I1ii.data.missionCustomer.usedChance || 0;
                  $.totalPoint = l1I1ii.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = l1I1ii.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = l1I1ii.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (l1IIl == "shopList") {
                  $.openList = l1I1ii.data || [];
                } else {
                  if (l1IIl == "mission") {
                    l1I1ii.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;
                  } else {
                    if (l1IIl == "uniteOpenCardOne") $.uniteOpenCar = l1I1ii.msg || l1I1ii.data.msg || "";else {
                      if (l1IIl == "myAward") {
                        console.log("🔊 我的奖品：");
                        let iilliI = 0;
                        for (let iII1i in l1I1ii.data.list || []) {
                          let iII1l = l1I1ii.data.list[iII1i];
                          iilliI += Number(iII1l.awardDes);
                        }
                        if (iilliI > 0) console.log("🔊 共获得" + iilliI + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else {
                        if (l1IIl == "missionInviteList") {
                          console.log("🔊 邀请人数(" + l1I1ii.data.invitedLogList.total + ")");
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (l1I1ii.data.msg) {
                l1I1ii.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (l1I1ii.data.msg || ""));
              } else {
                if (l1I1ii.errorMessage) {
                  if (l1I1ii.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (l1I1ii.errorMessage || ""));
                } else {
                  console.log("" + l1I1il);
                }
              }
            }
          } else l1I1ii.errorMessage ? console.log("🔊 " + (l1I1ii.errorMessage || "")) : console.log("" + l1I1il);
        } else {}
        break;
      default:
        console.log((i1Ii1I || l1IIl) + "-> " + l1I1il);
    }
    if (typeof l1I1ii == "object") {
      if (l1I1ii.errorMessage) {
        if (l1I1ii.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (Iil1l) {}
}
function liIIll(Iil1i, i1i1i1, iiiIli = "POST") {
  let IllIi = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": i11IlI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return Iil1i.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (IllIi.Origin = "https://jinggengjcq-isv.isvjcloud.com", IllIi["Content-Type"] = "application/json; charset=utf-8", delete IllIi.Cookie), {
    "url": Iil1i,
    "method": iiiIli,
    "headers": IllIi,
    "body": i1i1i1,
    "timeout": 30 * 1000
  };
}
function l1IlIi(iilll1, l1iI11) {
  d = {
    "actId": $.actId,
    ...l1iI11,
    "method": iilll1,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = liIIli(d);
  const i11I1 = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "appkey": $.appkey,
        "m": "POST",
        "oba": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ...l1iI11,
        "method": iilll1,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return iilll1.indexOf("missionInviteList") > -1 && delete i11I1.params.admJson.actId, $.toStr(i11I1, i11I1);
}
function l1IlIl(l1lII1, iilllI) {
  return Math.floor(Math.random() * (iilllI - l1lII1)) + l1lII1;
}
function liIIli(l1I1l) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(l1I1l));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret;
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    "sign": sign,
    "timeStamp": time2
  };
}
async function illiiI() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const I111il = CryptoJS.enc.Utf8.parse(id),
    l1Ili1 = CryptoJS.enc.Base64.stringify(I111il);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": l1Ili1,
      "od": "",
      "ov": "Ctq=",
      "ud": l1Ili1
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function liIl(I111ii) {
  I111ii = I111ii || 32;
  let I1liII = "abcdef0123456789",
    I1ii1I = I1liII.length,
    Ililli = "";
  for (i = 0; i < I111ii; i++) Ililli += I1liII.charAt(Math.floor(Math.random() * I1ii1I));
  return Ililli;
}
function llli11(iIliIi) {
  if (typeof iIliIi == "string") {
    try {
      return JSON.parse(iIliIi);
    } catch (IlIl1) {
      return console.log(IlIl1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function Ili11l() {
  if (!$.joinVenderId) return;
  return new Promise(async l1Ilii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let II1i1i = "";
    if ($.shopactivityId) II1i1i = ",\"activityId\":" + $.shopactivityId;
    const Il1iiI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + II1i1i + ",\"channel\":406}",
      iIil1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il1iiI)
      };
    for (var I111i1 = "", lIl1i1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l1Ilil = 0; l1Ilil < 16; l1Ilil++) {
      var iIili = Math.round(Math.random() * (lIl1i1.length - 1));
      I111i1 += lIl1i1.substring(iIili, iIili + 1);
    }
    uuid = Buffer.from(I111i1, "utf8").toString("base64");
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
    const l1IllI = await iIIIi("8adfb", iIil1),
      lIi1Ii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Il1iiI + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1IllI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": i11IlI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIi1Ii, async (iiilII, IIiIII, lili) => {
      try {
        if (iiilII) {
          IIiIII && typeof IIiIII.statusCode != "undefined" && IIiIII.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          lili = lili && lili.match(/jsonp_.*?\((.*?)\);/) && lili.match(/jsonp_.*?\((.*?)\);/)[1] || lili;
          let Ii1lI1 = $.toObj(lili, lili);
          if (Ii1lI1 && typeof Ii1lI1 == "object") {
            if (Ii1lI1 && Ii1lI1.success === true) {
              console.log(" >> " + Ii1lI1.message);
              $.errorJoinShop = Ii1lI1.message;
              if (Ii1lI1.result && Ii1lI1.result.giftInfo) for (let IliliI of Ii1lI1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + IliliI.discountString + IliliI.prizeName + IliliI.secondLineDesc);
              }
            } else {
              if (Ii1lI1 && typeof Ii1lI1 == "object" && Ii1lI1.message) {
                $.errorJoinShop = Ii1lI1.message;
                console.log("" + (Ii1lI1.message || ""));
              } else console.log(lili);
            }
          } else console.log(lili);
        }
      } catch (IIl11I) {
        $.logErr(IIl11I, IIiIII);
      } finally {
        l1Ilii();
      }
    });
  });
}
async function I1lill() {
  return new Promise(async illIII => {
    const ii1iIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iliI1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ii1iIi)
      };
    await $.wait(1000);
    const IIl11i = await iIIIi("8adfb", iliI1i),
      i11III = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ii1iIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIl11i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": i11IlI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i11III, async (lIi11, i11II1, Ilill1) => {
      try {
        if (lIi11) i11II1 && typeof i11II1.statusCode != "undefined" && i11II1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          Ilill1 = Ilill1 && Ilill1.match(/jsonp_.*?\((.*?)\);/) && Ilill1.match(/jsonp_.*?\((.*?)\);/)[1] || Ilill1;
          let iIliIl = $.toObj(Ilill1, Ilill1);
          if (iIliIl && typeof iIliIl == "object") iIliIl && iIliIl.success == true && (console.log("去加入：" + (iIliIl.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iIliIl.result.interestsRuleList && iIliIl.result.interestsRuleList[0] && iIliIl.result.interestsRuleList[0].interestsInfo && iIliIl.result.interestsRuleList[0].interestsInfo.activityId || "");else {
            console.log(Ilill1);
          }
        }
      } catch (l1Illl) {
        $.logErr(l1Illl, i11II1);
      } finally {
        illIII();
      }
    });
  });
}
function I1lili(Ii111I) {
  return new Promise(IIiII1 => {
    const Ii1111 = {
      "url": Ii111I + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(Ii1111, async (Ill1li, Ililii, I111ll) => {
      try {
        if (Ill1li) $.getAuthorCodeListerr = false;else {
          if (I111ll) I111ll = JSON.parse(I111ll);
          $.getAuthorCodeListerr = true;
        }
      } catch (I1liIi) {
        $.logErr(I1liIi, Ililii);
        I111ll = null;
      } finally {
        IIiII1(I111ll);
      }
    });
  });
}
function l1IlIl(I1ii1i, I1ii1l) {
  return Math.floor(Math.random() * (I1ii1l - I1ii1i)) + I1ii1i;
}
function i11Iil() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const l11ll = Array.from(new Set($.blacklist.split("&")));
  console.log(l11ll.join("&") + "\n");
  let Ii1ll = l11ll,
    iIlll = [],
    liII11 = false;
  for (let li11I1 = 0; li11I1 < lIi1l1.length; li11I1++) {
    let i1I111 = decodeURIComponent(lIi1l1[li11I1].match(/pt_pin=([^; ]+)(?=;?)/) && lIi1l1[li11I1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!i1I111) break;
    let l1li11 = false;
    for (let il1Il1 of Ii1ll) {
      if (il1Il1 && il1Il1 == i1I111) {
        l1li11 = true;
        break;
      }
    }
    !l1li11 && (liII11 = true, iIlll.splice(li11I1, -1, lIi1l1[li11I1]));
  }
  if (liII11) lIi1l1 = iIlll;
}
function i11Iii(iIiIli, iIllI) {
  iIllI != 0 && iIiIli.unshift(iIiIli.splice(iIllI, 1)[0]);
}
function Ili11i() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(lIi1l1, lIi1l1));
    return;
  }
  console.log("当前已设置白名单：");
  const iIiIlI = Array.from(new Set($.whitelist.split("&")));
  console.log(iIiIlI.join("&") + "\n");
  let liII1i = [],
    iIiIil = iIiIlI;
  for (let iIll1 in lIi1l1) {
    let l11li1 = decodeURIComponent(lIi1l1[iIll1].match(/pt_pin=([^; ]+)(?=;?)/) && lIi1l1[iIll1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iIiIil.includes(l11li1) && liII1i.push(lIi1l1[iIll1]);
  }
  helpCookiesArr = liII1i;
  if (iIiIil.length > 1) for (let i1I in iIiIil) {
    let liII1I = iIiIil[iIiIil.length - 1 - i1I];
    if (!liII1I) continue;
    for (let iIiIiI in helpCookiesArr) {
      let iIlil = decodeURIComponent(helpCookiesArr[iIiIiI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iIiIiI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      liII1I == iIlil && i11Iii(helpCookiesArr, iIiIiI);
    }
  }
}