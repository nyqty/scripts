/*
大牌联合061501期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230615aslwt/oC20230615aslw?actId=711a131ea34b451398a941369_23061501

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
#大牌联合061501期
1 1 1 1 * jd_dplh061501.js, tag=大牌联合061501期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合061501期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(IIiil1 => {
    cookiesArr.push(jdCookieNode[IIiil1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(l1IlII => l1IlII.cookie)].filter(ii1i => !!ii1i);
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
  KRDPLHTY = "711a131ea34b451398a941369_23061501";
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
  for (let liII = 0; liII < cookiesArr.length; liII++) {
    cookie = cookiesArr[liII];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = liII + 1;
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
    let IliIiI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + IliIiI);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + IliIiI);
  }
})().catch(liiiII => $.logErr(liiiII)).finally(() => $.done());
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
    for (let ll1lI1 = 0; ll1lI1 < retrynum; ll1lI1++) {
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
    for (let liii11 = 0; liii11 < retrynum; liii11++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let lIiIii = 0; lIiIii < retrynum; lIiIii++) {
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
        for (let Il1I11 = 0; Il1I11 < retrynum; Il1I11++) {
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
          for (let lIl1II = 0; lIl1II < retrynum; lIl1II++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let Ii1Ill = 0; Ii1Ill < retrynum; Ii1Ill++) {
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
      for (let li1lI = 0; li1lI < retrynum; li1lI++) {
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
      for (let IIlIII = 0; IIlIII < retrynum; IIlIII++) {
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
      let lIi11i = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (lIi11i > opencard_draw) lIi11i = opencard_draw;
      console.log("💖 抽奖次数为:" + lIi11i);
      for (m = 1; lIi11i--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let i1Iii = 0; i1Iii < retrynum; i1Iii++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(lIi11i) <= 0) break;
        if (m >= 10) {
          console.log("💔 抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
    if ($.index == 1) {
      $.inviteNick = $.MixNick;
      console.log("🔊 后面的号都会助力:" + $.inviteNick);
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  } catch (lIl1Ii) {
    console.log(lIl1Ii);
  }
}
async function takePostRequest(lIl1Il) {
  if ($.outFlag) return;
  let Il1I1I = "https://jinggengjcq-isv.isvjcloud.com",
    ll1Il1 = "",
    li11li = "POST",
    iliiii = "";
  switch (lIl1Il) {
    case "activity_load":
      url = Il1I1I + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iliiii = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) iliiii = {
        ...iliiii,
        "shopId": "" + $.joinVenderId
      };
      ll1Il1 = taskPostUrl("/jdBigAlliance/activity/load", iliiii);
      break;
    case "shopList":
      url = Il1I1I + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iliiii = {};
      ll1Il1 = taskPostUrl("/jdBigAlliance/shop/shopList", iliiii);
      break;
    case "绑定":
      url = Il1I1I + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iliiii = {
        "inviterNick": $.inviteNick || ""
      };
      ll1Il1 = taskPostUrl("/jdBigAlliance/customer/inviteRelation", iliiii);
      break;
    case "mission":
      url = Il1I1I + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iliiii = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) iliiii = {
        ...iliiii,
        "shopId": $.joinVenderId
      };
      ll1Il1 = taskPostUrl("/jdBigAlliance/mission/completeMission", iliiii);
      break;
    case "抽奖":
      url = Il1I1I + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iliiii = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      ll1Il1 = taskPostUrl("/jdBigAlliance/interactive/drawPost", iliiii);
      break;
    default:
      console.log("错误" + lIl1Il);
  }
  let IIlIIi = getPostRequest(url, ll1Il1, li11li);
  return new Promise(async I1IIll => {
    $.post(IIlIIi, (lIilII, ilIlli, I1IIlI) => {
      try {
        if (lIilII) {
          ilIlli && ilIlli.statusCode && ilIlli.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else {
          dealReturn(lIl1Il, I1IIlI);
        }
      } catch (iIIIll) {
        console.log(iIIIll, ilIlli);
      } finally {
        I1IIll();
      }
    });
  });
}
async function dealReturn(li1ll, iliii1) {
  let lIllil = "";
  try {
    $.krFlag = true;
    (li1ll != "accessLogWithAD" || li1ll != "drawContent") && iliii1 && (lIllil = JSON.parse(iliii1));
  } catch (I11I) {
    console.log("🤬 " + li1ll + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let i1IiIl = "";
    switch (li1ll) {
      case "抽奖":
        if (typeof lIllil == "object") {
          if (lIllil.success && lIllil.success === true && lIllil.data) {
            if (lIllil.data.status && lIllil.data.status == 200) {
              if (lIllil.data.data.sendResult) console.log("抽中：" + lIllil.data.data.awardSetting.awardName);else {
                if (!lIllil.data.data.result) {
                  console.log("空气");
                } else console.log(lIllil.data.data);
              }
            } else lIllil.data.status && lIllil.data.status == 500 && console.log("" + (lIllil.data.msg || ""));
          } else lIllil.message ? console.log("" + (lIllil.message || "")) : console.log(iliii1);
        } else console.log(iliii1);
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
        i1IiIl = "";
        if (li1ll == "followShop") i1IiIl = "关注";
        if (li1ll == "addCart") i1IiIl = "加购";
        if (typeof lIllil == "object") {
          if (lIllil.success && lIllil.success === true && lIllil.data) {
            if (lIllil.data.status && lIllil.data.status == 200) {
              lIllil = lIllil.data;
              if (li1ll != "setMixNick" && (lIllil.msg || lIllil.data.isOpenCard || lIllil.data.remark)) console.log("🔊 " + (i1IiIl && i1IiIl + ":" || "") + (lIllil.msg || lIllil.data.isOpenCard || lIllil.data.remark || ""));
              if (li1ll == "activity_load") {
                if (lIllil.msg || lIllil.data.isOpenCard) {
                  if ((lIllil.msg || lIllil.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (lIllil.data) {
                  $.endTime = lIllil.data.cusActivity.endTime || 0;
                  $.MixNick = lIllil.data.missionCustomer.buyerNick || "";
                  $.usedChance = lIllil.data.missionCustomer.usedChance || 0;
                  $.totalPoint = lIllil.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = lIllil.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = lIllil.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (li1ll == "shopList") $.openList = lIllil.data || [];else {
                  if (li1ll == "mission") lIllil.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (li1ll == "uniteOpenCardOne") $.uniteOpenCar = lIllil.msg || lIllil.data.msg || "";else {
                      if (li1ll == "myAward") {
                        console.log("🔊 我的奖品：");
                        let IlIi11 = 0;
                        for (let l1ll1l in lIllil.data.list || []) {
                          let iIIlIl = lIllil.data.list[l1ll1l];
                          IlIi11 += Number(iIIlIl.awardDes);
                        }
                        if (IlIi11 > 0) console.log("🔊 共获得" + IlIi11 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else li1ll == "missionInviteList" && console.log("🔊 邀请人数(" + lIllil.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (lIllil.data.msg) {
                if (lIllil.errorMessage.indexOf("活动未开始") > -1) {
                  $.activityEnd = true;
                }
                console.log("🔊 " + (lIllil.data.msg || ""));
              } else {
                if (lIllil.errorMessage) {
                  if (lIllil.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (lIllil.errorMessage || ""));
                } else console.log("" + iliii1);
              }
            }
          } else lIllil.errorMessage ? console.log("🔊 " + (lIllil.errorMessage || "")) : console.log("" + iliii1);
        } else {}
        break;
      default:
        console.log((i1IiIl || li1ll) + "-> " + iliii1);
    }
    if (typeof lIllil == "object") {
      if (lIllil.errorMessage) {
        if (lIllil.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (III1i1) {}
}
function getPostRequest(IlI1, I1IlIl, l1I1i1 = "POST") {
  let l1ll1i = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (IlI1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1) {
    l1ll1i.Origin = "https://jinggengjcq-isv.isvjcloud.com";
    l1ll1i["Content-Type"] = "application/json; charset=utf-8";
    delete l1ll1i.Cookie;
  }
  return {
    "url": IlI1,
    "method": l1I1i1,
    "headers": l1ll1i,
    "body": I1IlIl,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(I1IlII, l1III) {
  d = {
    "actId": $.actId,
    ...l1III,
    "method": I1IlII,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const III1l1 = {
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
        ...l1III,
        "method": I1IlII,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return I1IlII.indexOf("missionInviteList") > -1 && delete III1l1.params.admJson.actId, $.toStr(III1l1, III1l1);
}
function random(IiIII, IiIiii) {
  return Math.floor(Math.random() * (IiIiii - IiIII)) + IiIII;
}
function mpdzSign(l1IIi) {
  return AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed", key = "c1614da9ac68", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(l1IIi)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
    "sign": sign,
    "timeStamp": time2
  };
}
async function getUa() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const l1iil1 = CryptoJS.enc.Utf8.parse(id),
    iiiIiI = CryptoJS.enc.Base64.stringify(l1iil1);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": iiiIiI,
      "od": "",
      "ov": "Ctq=",
      "ud": iiiIiI
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(Ill1i1) {
  Ill1i1 = Ill1i1 || 32;
  let lillI = "abcdef0123456789",
    Il11i = lillI.length,
    illl11 = "";
  for (i = 0; i < Ill1i1; i++) illl11 += lillI.charAt(Math.floor(Math.random() * Il11i));
  return illl11;
}
function jsonParse(l1iiil) {
  if (typeof l1iiil == "string") try {
    return JSON.parse(l1iiil);
  } catch (Il11I) {
    return console.log(Il11I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIil => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i1Ii1I = "";
    if ($.shopactivityId) i1Ii1I = ",\"activityId\":" + $.shopactivityId;
    const llIiIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i1Ii1I + ",\"channel\":406}",
      I1i1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(llIiIl)
      };
    for (var lIi1II = "", iiiIii = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IllI1 = 0; IllI1 < 16; IllI1++) {
      var iiiIil = Math.round(Math.random() * (iiiIii.length - 1));
      lIi1II += iiiIii.substring(iiiIil, iiiIil + 1);
    }
    uuid = Buffer.from(lIi1II, "utf8").toString("base64");
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
    const lilll = await getH5st("8adfb", I1i1i),
      l1iilI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + llIiIl + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lilll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1iilI, async (i1Ii1l, IIll, i1Ii1i) => {
      try {
        if (i1Ii1l) {
          if (IIll && typeof IIll.statusCode != "undefined") {
            if (IIll.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          i1Ii1i = i1Ii1i && i1Ii1i.match(/jsonp_.*?\((.*?)\);/) && i1Ii1i.match(/jsonp_.*?\((.*?)\);/)[1] || i1Ii1i;
          let ilI1l1 = $.toObj(i1Ii1i, i1Ii1i);
          if (ilI1l1 && typeof ilI1l1 == "object") {
            if (ilI1l1 && ilI1l1.success === true) {
              console.log(" >> " + ilI1l1.message);
              $.errorJoinShop = ilI1l1.message;
              if (ilI1l1.result && ilI1l1.result.giftInfo) for (let Iil1i of ilI1l1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + Iil1i.discountString + Iil1i.prizeName + Iil1i.secondLineDesc);
              }
            } else {
              if (ilI1l1 && typeof ilI1l1 == "object" && ilI1l1.message) {
                $.errorJoinShop = ilI1l1.message;
                console.log("" + (ilI1l1.message || ""));
              } else console.log(i1Ii1i);
            }
          } else console.log(i1Ii1i);
        }
      } catch (IllIl) {
        $.logErr(IllIl, IIll);
      } finally {
        IIil();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iillii => {
    const l1I1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      l1I1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l1I1i)
      };
    await $.wait(1000);
    const i11II = await getH5st("8adfb", l1I1l),
      IlIi1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l1I1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i11II),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IlIi1, async (liIII1, I111il, l1Ili1) => {
      try {
        if (liIII1) I111il && typeof I111il.statusCode != "undefined" && I111il.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          l1Ili1 = l1Ili1 && l1Ili1.match(/jsonp_.*?\((.*?)\);/) && l1Ili1.match(/jsonp_.*?\((.*?)\);/)[1] || l1Ili1;
          let iliill = $.toObj(l1Ili1, l1Ili1);
          iliill && typeof iliill == "object" ? iliill && iliill.success == true && (console.log("去加入：" + (iliill.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iliill.result.interestsRuleList && iliill.result.interestsRuleList[0] && iliill.result.interestsRuleList[0].interestsInfo && iliill.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(l1Ili1);
        }
      } catch (I1ii1I) {
        $.logErr(I1ii1I, I111il);
      } finally {
        iillii();
      }
    });
  });
}
function getAuthorCodeList(lii1) {
  return new Promise(IIil1i => {
    const IlIl1 = {
      "url": lii1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IlIl1, async (II1i1I, iIliI1, iIii11) => {
      try {
        if (II1i1I) $.getAuthorCodeListerr = false;else {
          if (iIii11) iIii11 = JSON.parse(iIii11);
          $.getAuthorCodeListerr = true;
        }
      } catch (i1i1lI) {
        $.logErr(i1i1lI, iIliI1);
        iIii11 = null;
      } finally {
        IIil1i(iIii11);
      }
    });
  });
}
function random(i11l1l, IIllIl) {
  return Math.floor(Math.random() * (IIllIl - i11l1l)) + i11l1l;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const II1i11 = Array.from(new Set($.blacklist.split("&")));
  console.log(II1i11.join("&") + "\n");
  let IlillI = II1i11,
    I111l1 = [],
    iIliII = false;
  for (let I111i1 = 0; I111i1 < cookiesArr.length; I111i1++) {
    let l1Ilil = decodeURIComponent(cookiesArr[I111i1].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[I111i1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!l1Ilil) break;
    let iIili = false;
    for (let i11l1I of IlillI) {
      if (i11l1I && i11l1I == l1Ilil) {
        iIili = true;
        break;
      }
    }
    !iIili && (iIliII = true, I111l1.splice(I111i1, -1, cookiesArr[I111i1]));
  }
  if (iIliII) cookiesArr = I111l1;
}
function toFirst(IlIll, liil) {
  liil != 0 && IlIll.unshift(IlIll.splice(liil, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const IlIli = Array.from(new Set($.whitelist.split("&")));
  console.log(IlIli.join("&") + "\n");
  let liIIIl = [],
    iliil1 = IlIli;
  for (let II1i1i in cookiesArr) {
    let Il1iiI = decodeURIComponent(cookiesArr[II1i1i].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[II1i1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iliil1.includes(Il1iiI) && liIIIl.push(cookiesArr[II1i1i]);
  }
  helpCookiesArr = liIIIl;
  if (iliil1.length > 1) {
    for (let iIil1 in iliil1) {
      let l1IllI = iliil1[iliil1.length - 1 - iIil1];
      if (!l1IllI) continue;
      for (let lIi1Ii in helpCookiesArr) {
        let iiilII = decodeURIComponent(helpCookiesArr[lIi1Ii].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lIi1Ii].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        l1IllI == iiilII && toFirst(helpCookiesArr, lIi1Ii);
      }
    }
  }
}