/*
大牌联合0705期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230625dda/oC20230625dda?actId=c48b641bc798454e898562_230625

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
#大牌联合0705期
1 1 1 1 * jd_dplh0705.js, tag=大牌联合0705期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0705期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(l1I11i => {
    cookiesArr.push(jdCookieNode[l1I11i]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(iIlii1 => iIlii1.cookie)].filter(IIiil1 => !!IIiil1);
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
  KRDPLHTY = "4d826021cf6d40cf9d_230705";
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
  for (let IIiilI = 0; IIiilI < cookiesArr.length; IIiilI++) {
    cookie = cookiesArr[IIiilI];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIiilI + 1;
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
    let liiiI1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + liiiI1);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + liiiI1);
  }
})().catch(iIl11 => $.logErr(iIl11)).finally(() => $.done());
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
    for (let li1il = 0; li1il < retrynum; li1il++) {
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
    for (let lIiIiI = 0; lIiIiI < retrynum; lIiIiI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let ilIliI = 0; ilIliI < retrynum; ilIliI++) {
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
        for (let Ii1lIi = 0; Ii1lIi < retrynum; Ii1lIi++) {
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
          for (let ll1lII = 0; ll1lII < retrynum; ll1lII++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let iIIIiI = 0; iIIIiI < retrynum; iIIIiI++) {
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
      for (let I1IIi1 = 0; I1IIi1 < retrynum; I1IIi1++) {
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
      for (let liii11 = 0; liii11 < retrynum; liii11++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else {
      console.log("💔 呜呜呜，已完成加购任务");
    }
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let Il1I11 = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (Il1I11 > opencard_draw) Il1I11 = opencard_draw;
      console.log("💖 抽奖次数为:" + Il1I11);
      for (m = 1; Il1I11--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let lIl1II = 0; lIl1II < retrynum; lIl1II++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(Il1I11) <= 0) break;
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
  } catch (ll1Iii) {
    console.log(ll1Iii);
  }
}
async function takePostRequest(ll1Iil) {
  if ($.outFlag) return;
  let iliiiI = "https://jinggengjcq-isv.isvjcloud.com",
    IIlIII = "",
    i1Iil = "POST",
    lIi11i = "";
  switch (ll1Iil) {
    case "activity_load":
      url = iliiiI + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIi11i = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) lIi11i = {
        ...lIi11i,
        "shopId": "" + $.joinVenderId
      };
      IIlIII = taskPostUrl("/jdBigAlliance/activity/load", lIi11i);
      break;
    case "shopList":
      url = iliiiI + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIi11i = {};
      IIlIII = taskPostUrl("/jdBigAlliance/shop/shopList", lIi11i);
      break;
    case "绑定":
      url = iliiiI + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIi11i = {
        "inviterNick": $.inviteNick || ""
      };
      IIlIII = taskPostUrl("/jdBigAlliance/customer/inviteRelation", lIi11i);
      break;
    case "mission":
      url = iliiiI + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIi11i = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) lIi11i = {
        ...lIi11i,
        "shopId": $.joinVenderId
      };
      IIlIII = taskPostUrl("/jdBigAlliance/mission/completeMission", lIi11i);
      break;
    case "抽奖":
      url = iliiiI + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIi11i = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      IIlIII = taskPostUrl("/jdBigAlliance/interactive/drawPost", lIi11i);
      break;
    default:
      console.log("错误" + ll1Iil);
  }
  let i1Iii = getPostRequest(url, IIlIII, i1Iil);
  return new Promise(async ilIllI => {
    $.post(i1Iii, (ilIlll, Ii1Iii, Ii1Iil) => {
      try {
        ilIlll ? (Ii1Iii && Ii1Iii.statusCode && Ii1Iii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : dealReturn(ll1Iil, Ii1Iil);
      } catch (ll1Ii1) {
        console.log(ll1Ii1, Ii1Iii);
      } finally {
        ilIllI();
      }
    });
  });
}
async function dealReturn(iliii1, i1IiI) {
  let iilIi1 = "";
  try {
    $.krFlag = true;
    if (iliii1 != "accessLogWithAD" || iliii1 != "drawContent") {
      i1IiI && (iilIi1 = JSON.parse(i1IiI));
    }
  } catch (I1IlIl) {
    console.log("🤬 " + iliii1 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let I1IlIi = "";
    switch (iliii1) {
      case "抽奖":
        if (typeof iilIi1 == "object") {
          if (iilIi1.success && iilIi1.success === true && iilIi1.data) {
            if (iilIi1.data.status && iilIi1.data.status == 200) {
              if (iilIi1.data.data.sendResult) console.log("抽中：" + iilIi1.data.data.awardSetting.awardName);else !iilIi1.data.data.result ? console.log("空气") : console.log(iilIi1.data.data);
            } else iilIi1.data.status && iilIi1.data.status == 500 && console.log("" + (iilIi1.data.msg || ""));
          } else iilIi1.message ? console.log("" + (iilIi1.message || "")) : console.log(i1IiI);
        } else console.log(i1IiI);
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
        I1IlIi = "";
        if (iliii1 == "followShop") I1IlIi = "关注";
        if (iliii1 == "addCart") I1IlIi = "加购";
        if (typeof iilIi1 == "object") {
          if (iilIi1.success && iilIi1.success === true && iilIi1.data) {
            if (iilIi1.data.status && iilIi1.data.status == 200) {
              iilIi1 = iilIi1.data;
              if (iliii1 != "setMixNick" && (iilIi1.msg || iilIi1.data.isOpenCard || iilIi1.data.remark)) console.log("🔊 " + (I1IlIi && I1IlIi + ":" || "") + (iilIi1.msg || iilIi1.data.isOpenCard || iilIi1.data.remark || ""));
              if (iliii1 == "activity_load") {
                if (iilIi1.msg || iilIi1.data.isOpenCard) {
                  if ((iilIi1.msg || iilIi1.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (iilIi1.data) {
                  $.endTime = iilIi1.data.cusActivity.endTime || 0;
                  $.MixNick = iilIi1.data.missionCustomer.buyerNick || "";
                  $.usedChance = iilIi1.data.missionCustomer.usedChance || 0;
                  $.totalPoint = iilIi1.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = iilIi1.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = iilIi1.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (iliii1 == "shopList") $.openList = iilIi1.data || [];else {
                  if (iliii1 == "mission") iilIi1.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (iliii1 == "uniteOpenCardOne") $.uniteOpenCar = iilIi1.msg || iilIi1.data.msg || "";else {
                      if (iliii1 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let IiIII = 0;
                        for (let IiIiii in iilIi1.data.list || []) {
                          let lIiIll = iilIi1.data.list[IiIiii];
                          IiIII += Number(lIiIll.awardDes);
                        }
                        if (IiIII > 0) console.log("🔊 共获得" + IiIII + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else iliii1 == "missionInviteList" && console.log("🔊 邀请人数(" + iilIi1.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (iilIi1.data.msg) {
                iilIi1.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (iilIi1.data.msg || ""));
              } else {
                if (iilIi1.errorMessage) {
                  if (iilIi1.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (iilIi1.errorMessage || ""));
                } else {
                  console.log("" + i1IiI);
                }
              }
            }
          } else iilIi1.errorMessage ? console.log("🔊 " + (iilIi1.errorMessage || "")) : console.log("" + i1IiI);
        } else {}
        break;
      default:
        console.log((I1IlIi || iliii1) + "-> " + i1IiI);
    }
    if (typeof iilIi1 == "object") {
      if (iilIi1.errorMessage) {
        if (iilIi1.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (l1IIl) {}
}
function getPostRequest(l1I1il, III1ii, l1I1ii = "POST") {
  let I1IlI1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return l1I1il.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (I1IlI1.Origin = "https://jinggengjcq-isv.isvjcloud.com", I1IlI1["Content-Type"] = "application/json; charset=utf-8", delete I1IlI1.Cookie), {
    "url": l1I1il,
    "method": l1I1ii,
    "headers": I1IlI1,
    "body": III1ii,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(IlIi1i, lIllii) {
  d = {
    "actId": $.actId,
    ...lIllii,
    "method": IlIi1i,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const IIiI = {
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
        ...lIllii,
        "method": IlIi1i,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return IlIi1i.indexOf("missionInviteList") > -1 && delete IIiI.params.admJson.actId, $.toStr(IIiI, IIiI);
}
function random(Ill1i1, illl1I) {
  return Math.floor(Math.random() * (illl1I - Ill1i1)) + Ill1i1;
}
function mpdzSign(IIi1) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(IIi1));
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
  const i1Ii11 = CryptoJS.enc.Utf8.parse(id),
    l1iill = CryptoJS.enc.Base64.stringify(i1Ii11);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": l1iill,
      "od": "",
      "ov": "Ctq=",
      "ud": l1iill
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(l1iili) {
  l1iili = l1iili || 32;
  let iiIi = "abcdef0123456789",
    iiIl = iiIi.length,
    Iil1I = "";
  for (i = 0; i < l1iili; i++) Iil1I += iiIi.charAt(Math.floor(Math.random() * iiIl));
  return Iil1I;
}
function jsonParse(IllII) {
  if (typeof IllII == "string") try {
    return JSON.parse(IllII);
  } catch (IIlI) {
    return console.log(IIlI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async i1Ii1l => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i1Ii1i = "";
    if ($.shopactivityId) i1Ii1i = ",\"activityId\":" + $.shopactivityId;
    const iiiIll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i1Ii1i + ",\"channel\":406}",
      iilliI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iiiIll)
      };
    for (var iII1i = "", ilI1ii = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iII1l = 0; iII1l < 16; iII1l++) {
      var ilI1il = Math.round(Math.random() * (ilI1ii.length - 1));
      iII1i += ilI1ii.substring(ilI1il, ilI1il + 1);
    }
    uuid = Buffer.from(iII1i, "utf8").toString("base64");
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
    const i11Il = await getH5st("8adfb", iilliI),
      i11Ii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iiiIll + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i11Il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i11Ii, async (ilI1l1, Iil1l, Iil1i) => {
      try {
        if (ilI1l1) Iil1l && typeof Iil1l.statusCode != "undefined" && Iil1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          Iil1i = Iil1i && Iil1i.match(/jsonp_.*?\((.*?)\);/) && Iil1i.match(/jsonp_.*?\((.*?)\);/)[1] || Iil1i;
          let IllIl = $.toObj(Iil1i, Iil1i);
          if (IllIl && typeof IllIl == "object") {
            if (IllIl && IllIl.success === true) {
              console.log(" >> " + IllIl.message);
              $.errorJoinShop = IllIl.message;
              if (IllIl.result && IllIl.result.giftInfo) for (let IllIi of IllIl.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + IllIi.discountString + IllIi.prizeName + IllIi.secondLineDesc);
              }
            } else IllIl && typeof IllIl == "object" && IllIl.message ? ($.errorJoinShop = IllIl.message, console.log("" + (IllIl.message || ""))) : console.log(Iil1i);
          } else console.log(Iil1i);
        }
      } catch (iII11) {
        $.logErr(iII11, Iil1l);
      } finally {
        i1Ii1l();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async IlIi1 => {
    const I111il = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      l1Ili1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I111il)
      };
    await $.wait(1000);
    const iliili = await getH5st("8adfb", l1Ili1),
      iliill = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I111il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iliili),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iliill, async (I111ii, Ililll, I1liII) => {
      try {
        if (I111ii) {
          if (Ililll && typeof Ililll.statusCode != "undefined") {
            Ililll.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          I1liII = I1liII && I1liII.match(/jsonp_.*?\((.*?)\);/) && I1liII.match(/jsonp_.*?\((.*?)\);/)[1] || I1liII;
          let iIii1l = $.toObj(I1liII, I1liII);
          iIii1l && typeof iIii1l == "object" ? iIii1l && iIii1l.success == true && (console.log("去加入：" + (iIii1l.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iIii1l.result.interestsRuleList && iIii1l.result.interestsRuleList[0] && iIii1l.result.interestsRuleList[0].interestsInfo && iIii1l.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(I1liII);
        }
      } catch (IIil1l) {
        $.logErr(IIil1l, Ililll);
      } finally {
        IlIi1();
      }
    });
  });
}
function getAuthorCodeList(IlIl1) {
  return new Promise(i11l1i => {
    const IlIii = {
      "url": IlIl1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IlIii, async (iIliII, iIii1I, I1liI1) => {
      try {
        if (iIliII) $.getAuthorCodeListerr = false;else {
          if (I1liI1) I1liI1 = JSON.parse(I1liI1);
          $.getAuthorCodeListerr = true;
        }
      } catch (iI11i1) {
        $.logErr(iI11i1, iIii1I);
        I1liI1 = null;
      } finally {
        i11l1i(I1liI1);
      }
    });
  });
}
function random(iii11i, iii11l) {
  return Math.floor(Math.random() * (iii11l - iii11i)) + iii11i;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const IlIll = Array.from(new Set($.blacklist.split("&")));
  console.log(IlIll.join("&") + "\n");
  let liil = IlIll,
    i11l11 = [],
    IlIli = false;
  for (let iii11I = 0; iii11I < cookiesArr.length; iii11I++) {
    let IIil11 = decodeURIComponent(cookiesArr[iii11I].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[iii11I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IIil11) break;
    let iI11iI = false;
    for (let l1IliI of liil) {
      if (l1IliI && l1IliI == IIil11) {
        iI11iI = true;
        break;
      }
    }
    !iI11iI && (IlIli = true, i11l11.splice(iii11I, -1, cookiesArr[iii11I]));
  }
  if (IlIli) cookiesArr = i11l11;
}
function toFirst(liIIIi, iIilI) {
  iIilI != 0 && liIIIi.unshift(liIIIi.splice(iIilI, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const iliilI = Array.from(new Set($.whitelist.split("&")));
  console.log(iliilI.join("&") + "\n");
  let I111iI = [],
    IlIlI = iliilI;
  for (let ii1iII in cookiesArr) {
    let ll1111 = decodeURIComponent(cookiesArr[ii1iII].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[ii1iII].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    IlIlI.includes(ll1111) && I111iI.push(cookiesArr[ii1iII]);
  }
  helpCookiesArr = I111iI;
  if (IlIlI.length > 1) {
    for (let i11IIi in IlIlI) {
      let Il1ii1 = IlIlI[IlIlI.length - 1 - i11IIi];
      if (!Il1ii1) continue;
      for (let illII1 in helpCookiesArr) {
        let Il1iii = decodeURIComponent(helpCookiesArr[illII1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[illII1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        Il1ii1 == Il1iii && toFirst(helpCookiesArr, illII1);
      }
    }
  }
}