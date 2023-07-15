/*
头文字J

兑换

变量:export jd_car_play_exchangeid="兑换ID"

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#头文字J
11 11 11 11 * jd_car_play_exchange.js, tag=头文字J兑换, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env("头文字J兑换");
const l1lilii = $.isNode() ? require("./jdCookie.js") : "",
  ll1l1lii = $.isNode() ? require("./sendNotify") : "",
  IllIIl11 = require("./function/krgetToken");
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let IlIlliii = [],
  Iil1iIii = "";
if ($.isNode()) {
  Object.keys(l1lilii).forEach(lIlliII => {
    IlIlliii.push(l1lilii[lIlliII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IlIlliii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IliIlIII($.getdata("CookiesJD") || "[]").map(lIliIlIi => lIliIlIi.cookie)].filter(i1IiIlll => !!i1IiIlll);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iii1Iill = "";
$.prizeInfoId = process.env.jd_car_play_exchangeid ? process.env.jd_car_play_exchangeid : "";
!(async () => {
  if (!IlIlliii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "21699045";
  $.userId = "10299171";
  $.actId = "1760007";
  $.MixNicks = "";
  $.inviteNick = "";
  for (let iIll1lIi = 0; iIll1lIi < IlIlliii.length; iIll1lIi++) {
    Iil1iIii = IlIlliii[iIll1lIi];
    if (Iil1iIii) {
      $.UserName = decodeURIComponent(Iil1iIii.match(/pt_pin=([^; ]+)(?=;?)/) && Iil1iIii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIll1lIi + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await i11i111();
      await llI11Ii();
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let ii1IilII = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + ii1IilII);
    if ($.isNode()) await ll1l1lii.sendNotify("" + $.name, "" + ii1IilII);
  }
})().catch(lliIiIlI => $.logErr(lliIiIlI)).finally(() => $.done());
async function llI11Ii() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    iii1Iill = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await IllIIl11(Iil1iIii, "https://mpdz-car-dz.isvjcloud.com");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await Iili11Ii("activity_load");
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("获取活动信息失败,可能是黑号");
      return;
    }
    console.log("目前分值：" + $.remainPoint);
    if ($.index == 1) {
      await Iili11Ii("exchangeLoad");
      for (const illll11I of $.awardSettings) {
        console.log("");
        console.log("奖品：" + illll11I.awardName + "  积分：" + illll11I.awardDes + "  库存：" + illll11I.remainNum + "  兑换ID：" + illll11I.id);
      }
    }
    if ($.prizeInfoId) {
      console.log("");
      await Iili11Ii("exchangeJdMarket");
    } else {
      console.log("");
      console.log("未填写兑换ID，退出运行");
      $.activityEnd = true;
      return;
    }
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
  } catch (iii1iilI) {
    console.log(iii1iilI);
  }
}
async function Iili11Ii(IlI) {
  if ($.outFlag) return;
  let IIIlIi1I = "https://mpdz-car-dz.isvjcloud.com",
    Illii1ll = "",
    lil1i11 = "POST",
    i1liilII = "";
  switch (IlI) {
    case "activity_load":
      url = IIIlIi1I + "/dm/front/jdCardRunning/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&push_way=1&user_id=" + $.userId;
      i1liilII = {
        "jdToken": $.Token,
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) i1liilII = {
        ...i1liilII,
        "shopId": "" + $.joinVenderId
      };
      Illii1ll = Illil111("/jdCardRunning/activity/load", i1liilII);
      break;
    case "exchangeLoad":
      url = IIIlIi1I + "/dm/front/jdCardRunning/exchange/exchangeLoad?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      i1liilII = {};
      Illii1ll = Illil111("/jdCardRunning/exchange/exchangeLoad", i1liilII);
      break;
    case "exchangeJdMarket":
      url = IIIlIi1I + "/dm/front/jdCardRunning/exchange/exchangeJdMarket?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      i1liilII = {
        "awardId": $.prizeInfoId
      };
      Illii1ll = Illil111("/jdCardRunning/exchange/exchangeJdMarket", i1liilII);
      break;
    default:
      console.log("错误" + IlI);
  }
  let l1ii11l = iIlIlIIi(url, Illii1ll, lil1i11);
  return new Promise(async IIi1IIiI => {
    $.post(l1ii11l, (i1II11Il, li11i1ii, i1I11ii) => {
      try {
        i1II11Il ? (li11i1ii && li11i1ii.statusCode && li11i1ii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(i1II11Il, i1II11Il)), console.log(IlI + " API请求失败，请检查网路重试")) : lIlI1Iil(IlI, i1I11ii);
      } catch (lI1ill1i) {
        console.log(lI1ill1i, li11i1ii);
      } finally {
        IIi1IIiI();
      }
    });
  });
}
async function lIlI1Iil(iIIilIII, li1llli) {
  let iIIIl1I = "";
  try {
    (iIIilIII != "accessLogWithAD" || iIIilIII != "drawContent") && li1llli && (iIIIl1I = JSON.parse(li1llli));
  } catch (Il1liII1) {
    console.log(iIIilIII + " 执行任务异常");
    console.log(li1llli);
    $.runFalag = false;
  }
  try {
    let IliI1il1 = "";
    switch (iIIilIII) {
      case "exchangeLoad":
        if (typeof iIIIl1I == "object") {
          if (iIIIl1I.success && iIIIl1I.success === true && iIIIl1I.data) {
            if (iIIIl1I.data.status && iIIIl1I.data.status == 200) {
              $.awardSettings = iIIIl1I.data.data.awardSettings || [];
            }
          } else iIIIl1I.message ? console.log(iIIilIII + " " + (iIIIl1I.message || "")) : console.log(li1llli);
        } else console.log(li1llli);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      case "activity_load":
      case "exchangeJdMarket":
        IliI1il1 = "";
        if (iIIilIII == "followShop") IliI1il1 = "关注";
        if (iIIilIII == "addCart") IliI1il1 = "加购";
        if (typeof iIIIl1I == "object") {
          if (iIIIl1I.success && iIIIl1I.success === true && iIIIl1I.data) {
            if (iIIIl1I.data.status && iIIIl1I.data.status == 200) {
              iIIIl1I = iIIIl1I.data;
              if (iIIilIII != "setMixNick" && (iIIIl1I.msg || iIIIl1I.data.isOpenCard || iIIIl1I.data.remark)) console.log("" + (IliI1il1 && IliI1il1 + ":" || "") + (iIIIl1I.msg || iIIIl1I.data.isOpenCard || iIIIl1I.data.remark || ""));
              if (iIIilIII == "activity_load") {
                if (iIIIl1I.data) {
                  $.endTime = iIIIl1I.data.cusActivity.endTime || 0;
                  $.MixNick = iIIIl1I.data.missionCustomer.buyerNick || "";
                  $.hasCollectShop = iIIIl1I.data.missionCustomer.hasCollectShop || 0;
                  $.totalPoint = iIIIl1I.data.missionCustomer.totalPoint || 0;
                  $.remainPoint = iIIIl1I.data.missionCustomer.remainPoint || 0;
                  $.remainChance = iIIIl1I.data.missionCustomer.remainChance || 0;
                }
              } else {
                if (iIIilIII == "shopList") {
                  $.openList = iIIIl1I.data.cusShopList || [];
                  renwulists = iIIIl1I.data.data || [];
                } else iIIilIII == "missionInviteList" && console.log("邀请人数(" + iIIIl1I.data.total + ")");
              }
            } else {
              if (iIIIl1I.data.msg) {
                iIIIl1I.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("" + (iIIIl1I.data.msg || ""));
              } else {
                if (iIIIl1I.errorMessage) {
                  if (iIIIl1I.errorMessage.indexOf("火爆") > -1) {}
                  console.log("" + (iIIIl1I.errorMessage || ""));
                } else console.log("" + li1llli);
              }
            }
          } else iIIIl1I.errorMessage ? console.log("" + (iIIIl1I.errorMessage || "")) : console.log("" + li1llli);
        } else {
          console.log("" + li1llli);
        }
        break;
      default:
        console.log("" + li1llli);
    }
    if (typeof iIIIl1I == "object") {
      if (iIIIl1I.errorMessage) {
        if (iIIIl1I.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (l1Ii11I) {}
}
function iIlIlIIi(ii1lll1, ii1liIi, iIil11Il = "POST") {
  let l1lII1Ii = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Iil1iIii,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return ii1lll1.indexOf("https://mpdz-car-dz.isvjcloud.com") > -1 && (l1lII1Ii.Origin = "https://mpdz-car-dz.isvjcloud.com", l1lII1Ii.host = "mpdz-car-dz.isvjcloud.com", l1lII1Ii["Content-Type"] = "application/json;charset=utf-8", delete l1lII1Ii.Cookie), {
    "url": ii1lll1,
    "method": iIil11Il,
    "headers": l1lII1Ii,
    "body": ii1liIi,
    "timeout": 60000
  };
}
function Illil111(il1Ill1i, l11iI11I) {
  d = {
    "actId": $.actId,
    ...l11iI11I,
    "method": il1Ill1i,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = iI11I1II(d);
  const IIli11l1 = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "appkey": $.appkey,
        "m": "POST",
        "sign": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ...l11iI11I,
        "method": il1Ill1i,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return il1Ill1i.indexOf("missionInviteList") > -1 && delete IIli11l1.params.admJson.actId, $.toStr(IIli11l1, IIli11l1);
}
function ilii1(IlIl1l11, lilI11Ii) {
  return Math.floor(Math.random() * (lilI11Ii - IlIl1l11)) + IlIl1l11;
}
function iI11I1II(iIIi1i1l) {
  AppSecret = "85623312044258464325227666883546";
  key = 25747717;
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(iIIi1i1l));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = "k9mbrALjx4pLq5sgpO" + s2 + "z" + time2 + "xgwky6n09be8ih0x63s9i5zwdfdmou00";
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    "sign": sign,
    "timeStamp": time2
  };
}
async function i11i111() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const llIiIl1l = CryptoJS.enc.Utf8.parse(id),
    iliIIlil = CryptoJS.enc.Base64.stringify(llIiIl1l);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": iliIIlil,
      "od": "",
      "ov": "Ctq=",
      "ud": iliIIlil
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function IliIlIII(IilllllI) {
  if (typeof IilllllI == "string") {
    try {
      return JSON.parse(IilllllI);
    } catch (llI1I1li) {
      return console.log(llI1I1li), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}