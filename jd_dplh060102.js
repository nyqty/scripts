/*
大牌联合060102期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023060102aslw/oC2023060102aslw?actId=dae23ad9bff24686_23060102

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
#大牌联合060102期
1 1 1 1 * jd_dplh060102.js, tag=大牌联合060102期, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("大牌联合060102期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(liiiil1I => {
    cookiesArr.push(jdCookieNode[liiiil1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(lIiii1il => lIiii1il.cookie)].filter(Ii1lIii1 => !!Ii1lIii1);
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
  KRDPLHTY = "dae23ad9bff24686_23060102";
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
  authorCodeList = await getAuthorCodeList("http://code.kingran.ga/dplh.json");
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
  for (let IllIIill = 0; IllIIill < cookiesArr.length; IllIIill++) {
    cookie = cookiesArr[IllIIill];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IllIIill + 1;
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
    let ilil11 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + ilil11);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + ilil11);
  }
})().catch(I1i111 => $.logErr(I1i111)).finally(() => $.done());
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
    for (let i1iI1Ili = 0; i1iI1Ili < retrynum; i1iI1Ili++) {
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
    for (let i11Ii1li = 0; i11Ii1li < retrynum; i11Ii1li++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let I1liili1 = 0; I1liili1 < retrynum; I1liili1++) {
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
        for (let IiiII1l = 0; IiiII1l < retrynum; IiiII1l++) {
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
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("😤 呜呜呜，重试开卡");
            await $.wait(1000);
            await joinShop();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("activity_load");
          for (let lIililII = 0; lIililII < retrynum; lIililII++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let iI1II1l1 = 0; iI1II1l1 < retrynum; iI1II1l1++) {
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
      for (let I1ilII1 = 0; I1ilII1 < retrynum; I1ilII1++) {
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
      for (let Ii1IlI1 = 0; Ii1IlI1 < retrynum; Ii1IlI1++) {
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
      let i1iIilil = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (i1iIilil > opencard_draw) i1iIilil = opencard_draw;
      console.log("💖 抽奖次数为:" + i1iIilil);
      for (m = 1; i1iIilil--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let liiI1i11 = 0; liiI1i11 < retrynum; liiI1i11++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(i1iIilil) <= 0) break;
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
  } catch (iI1iilII) {
    console.log(iI1iilII);
  }
}
async function takePostRequest(i1l1ilII) {
  if ($.outFlag) return;
  let li1IIi11 = "https://jinggengjcq-isv.isvjcloud.com",
    iI1l1Iil = "",
    llIII11I = "POST",
    ill1i1ii = "";
  switch (i1l1ilII) {
    case "activity_load":
      url = li1IIi11 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      ill1i1ii = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) ill1i1ii = {
        ...ill1i1ii,
        "shopId": "" + $.joinVenderId
      };
      iI1l1Iil = taskPostUrl("/jdBigAlliance/activity/load", ill1i1ii);
      break;
    case "shopList":
      url = li1IIi11 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      ill1i1ii = {};
      iI1l1Iil = taskPostUrl("/jdBigAlliance/shop/shopList", ill1i1ii);
      break;
    case "绑定":
      url = li1IIi11 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      ill1i1ii = {
        "inviterNick": $.inviteNick || ""
      };
      iI1l1Iil = taskPostUrl("/jdBigAlliance/customer/inviteRelation", ill1i1ii);
      break;
    case "mission":
      url = li1IIi11 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      ill1i1ii = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) ill1i1ii = {
        ...ill1i1ii,
        "shopId": $.joinVenderId
      };
      iI1l1Iil = taskPostUrl("/jdBigAlliance/mission/completeMission", ill1i1ii);
      break;
    case "抽奖":
      url = li1IIi11 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      ill1i1ii = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      iI1l1Iil = taskPostUrl("/jdBigAlliance/interactive/drawPost", ill1i1ii);
      break;
    default:
      console.log("错误" + i1l1ilII);
  }
  let iiIii1ll = getPostRequest(url, iI1l1Iil, llIII11I);
  return new Promise(async ii1iIlI => {
    $.post(iiIii1ll, (liI1iIIi, Ill1lliI, lli1li1) => {
      try {
        liI1iIIi ? (Ill1lliI && Ill1lliI.statusCode && Ill1lliI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : dealReturn(i1l1ilII, lli1li1);
      } catch (IillIiil) {
        console.log(IillIiil, Ill1lliI);
      } finally {
        ii1iIlI();
      }
    });
  });
}
async function dealReturn(lIiiI, i1Il1ii1) {
  let lIli1iI = "";
  try {
    $.krFlag = true;
    if (lIiiI != "accessLogWithAD" || lIiiI != "drawContent") {
      i1Il1ii1 && (lIli1iI = JSON.parse(i1Il1ii1));
    }
  } catch (lI1111I1) {
    console.log("🤬 " + lIiiI + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let iil1l1Il = "";
    switch (lIiiI) {
      case "抽奖":
        if (typeof lIli1iI == "object") {
          if (lIli1iI.success && lIli1iI.success === true && lIli1iI.data) {
            if (lIli1iI.data.status && lIli1iI.data.status == 200) {
              if (lIli1iI.data.data.sendResult) {
                console.log("抽中：" + lIli1iI.data.data.awardSetting.awardName);
              } else !lIli1iI.data.data.result ? console.log("空气") : console.log(lIli1iI.data.data);
            } else {
              if (lIli1iI.data.status && lIli1iI.data.status == 500) {
                console.log("" + (lIli1iI.data.msg || ""));
              }
            }
          } else lIli1iI.message ? console.log("" + (lIli1iI.message || "")) : console.log(i1Il1ii1);
        } else {
          console.log(i1Il1ii1);
        }
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
        iil1l1Il = "";
        if (lIiiI == "followShop") iil1l1Il = "关注";
        if (lIiiI == "addCart") iil1l1Il = "加购";
        if (typeof lIli1iI == "object") {
          if (lIli1iI.success && lIli1iI.success === true && lIli1iI.data) {
            if (lIli1iI.data.status && lIli1iI.data.status == 200) {
              lIli1iI = lIli1iI.data;
              if (lIiiI != "setMixNick" && (lIli1iI.msg || lIli1iI.data.isOpenCard || lIli1iI.data.remark)) console.log("🔊 " + (iil1l1Il && iil1l1Il + ":" || "") + (lIli1iI.msg || lIli1iI.data.isOpenCard || lIli1iI.data.remark || ""));
              if (lIiiI == "activity_load") {
                if (lIli1iI.msg || lIli1iI.data.isOpenCard) {
                  if ((lIli1iI.msg || lIli1iI.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                lIli1iI.data && ($.endTime = lIli1iI.data.cusActivity.endTime || 0, $.MixNick = lIli1iI.data.missionCustomer.buyerNick || "", $.usedChance = lIli1iI.data.missionCustomer.usedChance || 0, $.totalPoint = lIli1iI.data.missionCustomer.totalPoint || 0, $.hasCollectShop = lIli1iI.data.missionCustomer.hasCollectShop || 0, $.hasAddCart = lIli1iI.data.missionCustomer.hasAddCart || 0);
              } else {
                if (lIiiI == "shopList") $.openList = lIli1iI.data || [];else {
                  if (lIiiI == "mission") {
                    if (lIli1iI.data.remark.indexOf("不是会员") > -1) {
                      $.openCard = true;
                    } else $.openCard = false;
                  } else {
                    if (lIiiI == "uniteOpenCardOne") $.uniteOpenCar = lIli1iI.msg || lIli1iI.data.msg || "";else {
                      if (lIiiI == "myAward") {
                        console.log("🔊 我的奖品：");
                        let i11lIili = 0;
                        for (let Iil1Il11 in lIli1iI.data.list || []) {
                          let II11ii11 = lIli1iI.data.list[Iil1Il11];
                          i11lIili += Number(II11ii11.awardDes);
                        }
                        if (i11lIili > 0) console.log("🔊 共获得" + i11lIili + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else lIiiI == "missionInviteList" && console.log("🔊 邀请人数(" + lIli1iI.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (lIli1iI.data.msg) {
                if (lIli1iI.errorMessage.indexOf("活动未开始") > -1) {
                  $.activityEnd = true;
                }
                console.log("🔊 " + (lIli1iI.data.msg || ""));
              } else {
                if (lIli1iI.errorMessage) {
                  if (lIli1iI.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (lIli1iI.errorMessage || ""));
                } else console.log("" + i1Il1ii1);
              }
            }
          } else lIli1iI.errorMessage ? console.log("🔊 " + (lIli1iI.errorMessage || "")) : console.log("" + i1Il1ii1);
        } else {}
        break;
      default:
        console.log((iil1l1Il || lIiiI) + "-> " + i1Il1ii1);
    }
    if (typeof lIli1iI == "object") {
      if (lIli1iI.errorMessage) {
        if (lIli1iI.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (ii11ll1I) {}
}
function getPostRequest(IIiI1l, IiIIilI1, ili1IiiI = "POST") {
  let lIIl1Iil = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IIiI1l.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (lIIl1Iil.Origin = "https://jinggengjcq-isv.isvjcloud.com", lIIl1Iil["Content-Type"] = "application/json; charset=utf-8", delete lIIl1Iil.Cookie), {
    "url": IIiI1l,
    "method": ili1IiiI,
    "headers": lIIl1Iil,
    "body": IiIIilI1,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(iiilil1l, llIl1il) {
  d = {
    "actId": $.actId,
    ...llIl1il,
    "method": iiilil1l,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const I11IiI = {
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
        ...llIl1il,
        "method": iiilil1l,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return iiilil1l.indexOf("missionInviteList") > -1 && delete I11IiI.params.admJson.actId, $.toStr(I11IiI, I11IiI);
}
function random(iIi1ilii, III1li1I) {
  return Math.floor(Math.random() * (III1li1I - iIi1ilii)) + iIi1ilii;
}
function mpdzSign(lllI11lI) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(lllI11lI));
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
  const I1i1lll1 = CryptoJS.enc.Utf8.parse(id),
    iIll11l1 = CryptoJS.enc.Base64.stringify(I1i1lll1);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": iIll11l1,
      "od": "",
      "ov": "Ctq=",
      "ud": iIll11l1
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(iil11iii) {
  iil11iii = iil11iii || 32;
  let il1iiI1I = "abcdef0123456789",
    i1I1IIlI = il1iiI1I.length,
    l1liiIii = "";
  for (i = 0; i < iil11iii; i++) l1liiIii += il1iiI1I.charAt(Math.floor(Math.random() * i1I1IIlI));
  return l1liiIii;
}
function jsonParse(lIiliIIl) {
  if (typeof lIiliIIl == "string") try {
    return JSON.parse(lIiliIIl);
  } catch (I1l1I1Il) {
    return console.log(I1l1I1Il), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async li1Iii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lll1illl = "";
    if ($.shopactivityId) lll1illl = ",\"activityId\":" + $.shopactivityId;
    const lIllliiI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lll1illl + ",\"channel\":406}",
      l1iiII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lIllliiI)
      };
    for (var lll11IIi = "", I111illi = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l1iI1ii = 0; l1iI1ii < 16; l1iI1ii++) {
      var lIIIiilI = Math.round(Math.random() * (I111illi.length - 1));
      lll11IIi += I111illi.substring(lIIIiilI, lIIIiilI + 1);
    }
    uuid = Buffer.from(lll11IIi, "utf8").toString("base64");
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
    const IilI11il = await getH5st("8adfb", l1iiII),
      liiIlli = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lIllliiI + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IilI11il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liiIlli, async (Iii1l11I, IIIl1liI, ill11l1) => {
      try {
        if (Iii1l11I) IIIl1liI && typeof IIIl1liI.statusCode != "undefined" && IIIl1liI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          ill11l1 = ill11l1 && ill11l1.match(/jsonp_.*?\((.*?)\);/) && ill11l1.match(/jsonp_.*?\((.*?)\);/)[1] || ill11l1;
          let Ilili1i1 = $.toObj(ill11l1, ill11l1);
          if (Ilili1i1 && typeof Ilili1i1 == "object") {
            if (Ilili1i1 && Ilili1i1.success === true) {
              console.log(" >> " + Ilili1i1.message);
              $.errorJoinShop = Ilili1i1.message;
              if (Ilili1i1.result && Ilili1i1.result.giftInfo) for (let IillIlIi of Ilili1i1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + IillIlIi.discountString + IillIlIi.prizeName + IillIlIi.secondLineDesc);
              }
            } else Ilili1i1 && typeof Ilili1i1 == "object" && Ilili1i1.message ? ($.errorJoinShop = Ilili1i1.message, console.log("" + (Ilili1i1.message || ""))) : console.log(ill11l1);
          } else console.log(ill11l1);
        }
      } catch (I111IliI) {
        $.logErr(I111IliI, IIIl1liI);
      } finally {
        li1Iii();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iilllI1 => {
    const IIlIIii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      Ii1i1111 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIlIIii)
      };
    await $.wait(1000);
    const IlliiII = await getH5st("8adfb", Ii1i1111),
      lIiliI1I = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IIlIIii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlliiII),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIiliI1I, async (iI1iIil, iiill1l, iliil1Ii) => {
      try {
        if (iI1iIil) {
          if (iiill1l && typeof iiill1l.statusCode != "undefined") {
            iiill1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          iliil1Ii = iliil1Ii && iliil1Ii.match(/jsonp_.*?\((.*?)\);/) && iliil1Ii.match(/jsonp_.*?\((.*?)\);/)[1] || iliil1Ii;
          let IllIIi1i = $.toObj(iliil1Ii, iliil1Ii);
          if (IllIIi1i && typeof IllIIi1i == "object") {
            if (IllIIi1i && IllIIi1i.success == true) {
              console.log("去加入：" + (IllIIi1i.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = IllIIi1i.result.interestsRuleList && IllIIi1i.result.interestsRuleList[0] && IllIIi1i.result.interestsRuleList[0].interestsInfo && IllIIi1i.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else {
            console.log(iliil1Ii);
          }
        }
      } catch (I1llli1l) {
        $.logErr(I1llli1l, iiill1l);
      } finally {
        iilllI1();
      }
    });
  });
}
function getAuthorCodeList(iiii1iil) {
  return new Promise(Il1liiIi => {
    const iiiiIIli = {
      "url": iiii1iil + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iiiiIIli, async (IlIiI1l, ilI1ili, l1I11lI1) => {
      try {
        if (IlIiI1l) $.getAuthorCodeListerr = false;else {
          if (l1I11lI1) l1I11lI1 = JSON.parse(l1I11lI1);
          $.getAuthorCodeListerr = true;
        }
      } catch (ii11Iill) {
        $.logErr(ii11Iill, ilI1ili);
        l1I11lI1 = null;
      } finally {
        Il1liiIi(l1I11lI1);
      }
    });
  });
}
function random(liI1i1Il, lIi1ll) {
  return Math.floor(Math.random() * (lIi1ll - liI1i1Il)) + liI1i1Il;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const l1iIIl1 = Array.from(new Set($.blacklist.split("&")));
  console.log(l1iIIl1.join("&") + "\n");
  let liI1l1il = l1iIIl1,
    lIi1lIi = [],
    i1i1lI = false;
  for (let lIlIi1l1 = 0; lIlIi1l1 < cookiesArr.length; lIlIi1l1++) {
    let iliIIi1 = decodeURIComponent(cookiesArr[lIlIi1l1].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[lIlIi1l1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!iliIIi1) break;
    let iIil11I1 = false;
    for (let IiiIi1il of liI1l1il) {
      if (IiiIi1il && IiiIi1il == iliIIi1) {
        iIil11I1 = true;
        break;
      }
    }
    !iIil11I1 && (i1i1lI = true, lIi1lIi.splice(lIlIi1l1, -1, cookiesArr[lIlIi1l1]));
  }
  if (i1i1lI) cookiesArr = lIi1lIi;
}
function toFirst(I11l1lli, IIIlilii) {
  IIIlilii != 0 && I11l1lli.unshift(I11l1lli.splice(IIIlilii, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const llli1Ii = Array.from(new Set($.whitelist.split("&")));
  console.log(llli1Ii.join("&") + "\n");
  let IiiilIll = [],
    ilIili = llli1Ii;
  for (let Ill1Il1i in cookiesArr) {
    let Ii1iIiII = decodeURIComponent(cookiesArr[Ill1Il1i].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[Ill1Il1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (ilIili.includes(Ii1iIiII)) {
      IiiilIll.push(cookiesArr[Ill1Il1i]);
    }
  }
  helpCookiesArr = IiiilIll;
  if (ilIili.length > 1) {
    for (let liii1ll in ilIili) {
      let Ii1iIi1I = ilIili[ilIili.length - 1 - liii1ll];
      if (!Ii1iIi1I) continue;
      for (let ii11i1II in helpCookiesArr) {
        let lliIIiI = decodeURIComponent(helpCookiesArr[ii11i1II].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[ii11i1II].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        Ii1iIi1I == lliIIiI && toFirst(helpCookiesArr, ii11i1II);
      }
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }