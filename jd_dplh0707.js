/*
大牌联合0707期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230707dda/oC20230707dda?actId=92fd92df46094ef9a_230707

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
#大牌联合0707期
1 18 7,9 * * jd_dplh0707.js, tag=大牌联合0707期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0707期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(Il1i => {
    cookiesArr.push(jdCookieNode[Il1i]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(lIiIl => lIiIl.cookie)].filter(iiil1l => !!iiil1l);
let retrynum = "30",
  opencard_draw = "0";
retrynum = $.isNode() ? process.env.retrynum ? process.env.retrynum : retrynum : $.getdata("retrynum") ? $.getdata("retrynum") : opencard_draw;
opencard_draw = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : opencard_draw : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : opencard_draw;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  helpnum = "",
  KRDPLHTY = "92fd92df46094ef9a_230707";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let domains = "https://jinggengjcq-isv.isvjcloud.com";
helpnum = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + helpnum : $.getdata("helpnum") ? $.getdata("helpnum") : "" + helpnum;
let whitelist = "",
  blacklist = "";
$.whitelist = process.env.DPLHTY_whitelist || whitelist;
$.blacklist = process.env.DPLHTY_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
    authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = helpnum ? helpnum : authorCodeList[random(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + KRDPLHTY);
  console.log("\n💬 默认抽奖次数：" + opencard_draw + " 💬 重试次数：" + retrynum);
  console.log("\n💬 请在有水的情况下运行");
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = KRDPLHTY;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let Iii1li = 0; Iii1li < cookiesArr.length; Iii1li++) {
    cookie = cookiesArr[Iii1li];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Iii1li + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await getUa();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await run();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let iIl1i = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iIl1i);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + iIl1i);
  }
})().catch(i11i1 => $.logErr(i11i1)).finally(() => $.done());
async function run() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await takePostRequest("activity_load");
    for (let I1iiIl = 0; I1iiIl < retrynum; I1iiIl++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("activity_load");
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
    await takePostRequest("绑定");
    for (let ilIll1 = 0; ilIll1 < retrynum; ilIll1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let I1IIii = 0; I1IIii < retrynum; I1IIii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("shopList");
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
        await takePostRequest("mission");
        for (let liii1i = 0; liii1i < retrynum; liii1i++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await joinShop();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await joinShop(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("activity_load");
          for (let lI1iII = 0; lI1iII < retrynum; lI1iII++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let IIll1l = 0; IIll1l < retrynum; IIll1l++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await takePostRequest("mission");
      for (let iIIIl1 = 0; iIIIl1 < retrynum; iIIIl1++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await takePostRequest("mission");
      for (let li11iI = 0; li11iI < retrynum; li11iI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let liliIi = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (liliIi > opencard_draw) liliIi = opencard_draw;
      console.log("💖 抽奖次数为:" + liliIi);
      for (m = 1; liliIi--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let I1iiI1 = 0; I1iiI1 < retrynum; I1iiI1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(liliIi) <= 0) break;
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
  } catch (IIlIIl) {
    console.log(IIlIIl);
  }
}
async function takePostRequest(ilIli1) {
  if ($.outFlag) return;
  let l1I1ll = "https://jinggengjcq-isv.isvjcloud.com",
    li1il = "",
    l1I1li = "POST",
    li1ii = "";
  switch (ilIli1) {
    case "activity_load":
      url = l1I1ll + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ii = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) li1ii = {
        ...li1ii,
        "shopId": "" + $.joinVenderId
      };
      li1il = taskPostUrl("/jdBigAlliance/activity/load", li1ii);
      break;
    case "shopList":
      url = l1I1ll + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ii = {};
      li1il = taskPostUrl("/jdBigAlliance/shop/shopList", li1ii);
      break;
    case "绑定":
      url = l1I1ll + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ii = {
        "inviterNick": $.inviteNick || ""
      };
      li1il = taskPostUrl("/jdBigAlliance/customer/inviteRelation", li1ii);
      break;
    case "mission":
      url = l1I1ll + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ii = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) li1ii = {
        ...li1ii,
        "shopId": $.joinVenderId
      };
      li1il = taskPostUrl("/jdBigAlliance/mission/completeMission", li1ii);
      break;
    case "抽奖":
      url = l1I1ll + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ii = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      li1il = taskPostUrl("/jdBigAlliance/interactive/drawPost", li1ii);
      break;
    default:
      console.log("错误" + ilIli1);
  }
  let lI1iI1 = getPostRequest(url, li1il, l1I1li);
  return new Promise(async lIl1II => {
    $.post(lI1iI1, (ll1Iii, IIlII1, ll1Iil) => {
      try {
        if (ll1Iii) {
          IIlII1 && IIlII1.statusCode && IIlII1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else dealReturn(ilIli1, ll1Iil);
      } catch (lIi11i) {
        console.log(lIi11i, IIlII1);
      } finally {
        lIl1II();
      }
    });
  });
}
async function dealReturn(IIiI1I, lIi11l) {
  let lIl1Ii = "";
  try {
    $.krFlag = true;
    (IIiI1I != "accessLogWithAD" || IIiI1I != "drawContent") && lIi11l && (lIl1Ii = JSON.parse(lIi11l));
  } catch (i1IiI1) {
    console.log("🤬 " + IIiI1I + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let l1lIII = "";
    switch (IIiI1I) {
      case "抽奖":
        if (typeof lIl1Ii == "object") {
          if (lIl1Ii.success && lIl1Ii.success === true && lIl1Ii.data) {
            if (lIl1Ii.data.status && lIl1Ii.data.status == 200) {
              if (lIl1Ii.data.data.sendResult) console.log("抽中：" + lIl1Ii.data.data.awardSetting.awardName);else !lIl1Ii.data.data.result ? console.log("空气") : console.log(lIl1Ii.data.data);
            } else {
              if (lIl1Ii.data.status && lIl1Ii.data.status == 500) {
                console.log("" + (lIl1Ii.data.msg || ""));
              }
            }
          } else {
            if (lIl1Ii.message) {
              console.log("" + (lIl1Ii.message || ""));
            } else console.log(lIi11l);
          }
        } else console.log(lIi11l);
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
        l1lIII = "";
        if (IIiI1I == "followShop") l1lIII = "关注";
        if (IIiI1I == "addCart") l1lIII = "加购";
        if (typeof lIl1Ii == "object") {
          if (lIl1Ii.success && lIl1Ii.success === true && lIl1Ii.data) {
            if (lIl1Ii.data.status && lIl1Ii.data.status == 200) {
              lIl1Ii = lIl1Ii.data;
              if (IIiI1I != "setMixNick" && (lIl1Ii.msg || lIl1Ii.data.isOpenCard || lIl1Ii.data.remark)) console.log("🔊 " + (l1lIII && l1lIII + ":" || "") + (lIl1Ii.msg || lIl1Ii.data.isOpenCard || lIl1Ii.data.remark || ""));
              if (IIiI1I == "activity_load") {
                if (lIl1Ii.msg || lIl1Ii.data.isOpenCard) {
                  if ((lIl1Ii.msg || lIl1Ii.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (lIl1Ii.data) {
                  $.endTime = lIl1Ii.data.cusActivity.endTime || 0;
                  $.MixNick = lIl1Ii.data.missionCustomer.buyerNick || "";
                  $.usedChance = lIl1Ii.data.missionCustomer.usedChance || 0;
                  $.totalPoint = lIl1Ii.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = lIl1Ii.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = lIl1Ii.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IIiI1I == "shopList") $.openList = lIl1Ii.data || [];else {
                  if (IIiI1I == "mission") {
                    if (lIl1Ii.data.remark.indexOf("不是会员") > -1) $.openCard = true;else {
                      $.openCard = false;
                    }
                  } else {
                    if (IIiI1I == "uniteOpenCardOne") $.uniteOpenCar = lIl1Ii.msg || lIl1Ii.data.msg || "";else {
                      if (IIiI1I == "myAward") {
                        console.log("🔊 我的奖品：");
                        let l1ll1I = 0;
                        for (let i1lI1 in lIl1Ii.data.list || []) {
                          let l1ll11 = lIl1Ii.data.list[i1lI1];
                          l1ll1I += Number(l1ll11.awardDes);
                        }
                        if (l1ll1I > 0) console.log("🔊 共获得" + l1ll1I + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IIiI1I == "missionInviteList" && console.log("🔊 邀请人数(" + lIl1Ii.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (lIl1Ii.data.msg) {
                lIl1Ii.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (lIl1Ii.data.msg || ""));
              } else {
                if (lIl1Ii.errorMessage) {
                  if (lIl1Ii.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (lIl1Ii.errorMessage || ""));
                } else console.log("" + lIi11l);
              }
            }
          } else {
            if (lIl1Ii.errorMessage) {
              console.log("🔊 " + (lIl1Ii.errorMessage || ""));
            } else console.log("" + lIi11l);
          }
        } else {}
        break;
      default:
        console.log((l1lIII || IIiI1I) + "-> " + lIi11l);
    }
    if (typeof lIl1Ii == "object") {
      if (lIl1Ii.errorMessage) {
        if (lIl1Ii.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (Ili1il) {}
}
function getPostRequest(i1lII, iilIii, iII111 = "POST") {
  let lIiIil = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i1lII.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (lIiIil.Origin = "https://jinggengjcq-isv.isvjcloud.com", lIiIil["Content-Type"] = "application/json; charset=utf-8", delete lIiIil.Cookie), {
    "url": i1lII,
    "method": iII111,
    "headers": lIiIil,
    "body": iilIii,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(llIiii, IlII) {
  d = {
    "actId": $.actId,
    ...IlII,
    "method": llIiii,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const llIiil = {
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
        ...IlII,
        "method": llIiii,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return llIiii.indexOf("missionInviteList") > -1 && delete llIiil.params.admJson.actId, $.toStr(llIiil, llIiil);
}
function random(iIIlIi, iilIll) {
  return Math.floor(Math.random() * (iilIll - iIIlIi)) + iIIlIi;
}
function mpdzSign(lIiIl1) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(lIiIl1));
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
async function getUa() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const lIiIlI = CryptoJS.enc.Utf8.parse(id),
    iilIlI = CryptoJS.enc.Base64.stringify(lIiIlI);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": iilIlI,
      "od": "",
      "ov": "Ctq=",
      "ud": iilIlI
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(llIii1) {
  llIii1 = llIii1 || 32;
  let l1III = "abcdef0123456789",
    l1I1iI = l1III.length,
    III1l1 = "";
  for (i = 0; i < llIii1; i++) III1l1 += l1III.charAt(Math.floor(Math.random() * l1I1iI));
  return III1l1;
}
function jsonParse(lIiIll) {
  if (typeof lIiIll == "string") try {
    return JSON.parse(lIiIll);
  } catch (iIIlI1) {
    return console.log(iIIlI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async illl1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l1iiii = "";
    if ($.shopactivityId) l1iiii = ",\"activityId\":" + $.shopactivityId;
    const iiiIi1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l1iiii + ",\"channel\":406}",
      illl1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iiiIi1)
      };
    for (var Il11i = "", illl11 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iiI1 = 0; iiI1 < 16; iiI1++) {
      var Il11l = Math.round(Math.random() * (illl11.length - 1));
      Il11i += illl11.substring(Il11l, Il11l + 1);
    }
    uuid = Buffer.from(Il11i, "utf8").toString("base64");
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
    const Il11I = await getH5st("8adfb", illl1l),
      li1lll = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iiiIi1 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Il11I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(li1lll, async (lill1, IiIIl, IiIIi) => {
      try {
        if (lill1) IiIIl && typeof IiIIl.statusCode != "undefined" && IiIIl.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IiIIi = IiIIi && IiIIi.match(/jsonp_.*?\((.*?)\);/) && IiIIi.match(/jsonp_.*?\((.*?)\);/)[1] || IiIIi;
          let IIl1 = $.toObj(IiIIi, IiIIi);
          if (IIl1 && typeof IIl1 == "object") {
            if (IIl1 && IIl1.success === true) {
              console.log(" >> " + IIl1.message);
              $.errorJoinShop = IIl1.message;
              if (IIl1.result && IIl1.result.giftInfo) for (let l1ili of IIl1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + l1ili.discountString + l1ili.prizeName + l1ili.secondLineDesc);
              }
            } else IIl1 && typeof IIl1 == "object" && IIl1.message ? ($.errorJoinShop = IIl1.message, console.log("" + (IIl1.message || ""))) : console.log(IiIIi);
          } else console.log(IiIIi);
        }
      } catch (l1iill) {
        $.logErr(l1iill, IiIIl);
      } finally {
        illl1I();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async IIil => {
    const i1Ii1I = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      llIiIl = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1Ii1I)
      };
    await $.wait(1000);
    const I1i1i = await getH5st("8adfb", llIiIl),
      lIi1II = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + i1Ii1I + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1i1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIi1II, async (iiiIil, lilll, l1iilI) => {
      try {
        if (iiiIil) {
          if (lilll && typeof lilll.statusCode != "undefined") {
            lilll.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          l1iilI = l1iilI && l1iilI.match(/jsonp_.*?\((.*?)\);/) && l1iilI.match(/jsonp_.*?\((.*?)\);/)[1] || l1iilI;
          let IIll = $.toObj(l1iilI, l1iilI);
          IIll && typeof IIll == "object" ? IIll && IIll.success == true && (console.log("去加入：" + (IIll.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = IIll.result.interestsRuleList && IIll.result.interestsRuleList[0] && IIll.result.interestsRuleList[0].interestsInfo && IIll.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(l1iilI);
        }
      } catch (i1Ii1i) {
        $.logErr(i1Ii1i, lilll);
      } finally {
        IIil();
      }
    });
  });
}
function getAuthorCodeList(ilI1ii) {
  return new Promise(Iil1l => {
    const i1i1i1 = {
      "url": ilI1ii + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i1i1i1, async (l1iI11, l1I11, i11I1) => {
      try {
        if (l1iI11) $.getAuthorCodeListerr = false;else {
          if (i11I1) i11I1 = JSON.parse(i11I1);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1iI1I) {
        $.logErr(l1iI1I, l1I11);
        i11I1 = null;
      } finally {
        Iil1l(i11I1);
      }
    });
  });
}
function random(l1I1I, l1lII1) {
  return Math.floor(Math.random() * (l1lII1 - l1I1I)) + l1I1I;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const l1I1l = Array.from(new Set($.blacklist.split("&")));
  console.log(l1I1l.join("&") + "\n");
  let i11II = l1I1l,
    IlIi1 = [],
    i1i1il = false;
  for (let iii111 = 0; iii111 < cookiesArr.length; iii111++) {
    let liiI = decodeURIComponent(cookiesArr[iii111].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[iii111].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!liiI) break;
    let liIII1 = false;
    for (let I111il of i11II) {
      if (I111il && I111il == liiI) {
        liIII1 = true;
        break;
      }
    }
    !liIII1 && (i1i1il = true, IlIi1.splice(iii111, -1, cookiesArr[iii111]));
  }
  if (i1i1il) cookiesArr = IlIi1;
}
function toFirst(iliili, iliill) {
  iliill != 0 && iliili.unshift(iliili.splice(iliill, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const Ililll = Array.from(new Set($.whitelist.split("&")));
  console.log(Ililll.join("&") + "\n");
  let I1liII = [],
    I1ii1I = Ililll;
  for (let II1i11 in cookiesArr) {
    let IlillI = decodeURIComponent(cookiesArr[II1i11].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[II1i11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    I1ii1I.includes(IlillI) && I1liII.push(cookiesArr[II1i11]);
  }
  helpCookiesArr = I1liII;
  if (I1ii1I.length > 1) for (let iIii1I in I1ii1I) {
    let I1liI1 = I1ii1I[I1ii1I.length - 1 - iIii1I];
    if (!I1liI1) continue;
    for (let I1ii11 in helpCookiesArr) {
      let IlIil = decodeURIComponent(helpCookiesArr[I1ii11].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[I1ii11].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      I1liI1 == IlIil && toFirst(helpCookiesArr, I1ii11);
    }
  }
}