/*
大牌联合0610期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230610def/oC20230610def?actId=4e03a24e08464a76_230610

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
#大牌联合0610期
11 17 15,17 * * jd_dplh0608a.js, tag=大牌联合0610期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0610期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(lIiil1 => {
    cookiesArr.push(jdCookieNode[lIiil1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IiIIl11i => IiIIl11i.cookie)].filter(iiiIIli => !!iiiIIli);
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
  KRDPLHTY = "4e03a24e08464a76_230610";
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
  for (let i1lIl = 0; i1lIl < cookiesArr.length; i1lIl++) {
    cookie = cookiesArr[i1lIl];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1lIl + 1;
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
    let i1li1Iii = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + i1li1Iii);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + i1li1Iii);
  }
})().catch(i1ilIIIi => $.logErr(i1ilIIIi)).finally(() => $.done());
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
    for (let i11iiI1I = 0; i11iiI1I < retrynum; i11iiI1I++) {
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
    for (let llllIlii = 0; llllIlii < retrynum; llllIlii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let lIIili1 = 0; lIIili1 < retrynum; lIIili1++) {
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
        for (let iil1Iil1 = 0; iil1Iil1 < retrynum; iil1Iil1++) {
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
          for (let IIiIIli1 = 0; IIiIIli1 < retrynum; IIiIIli1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let lilI111 = 0; lilI111 < retrynum; lilI111++) {
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
      for (let iII1Ii = 0; iII1Ii < retrynum; iII1Ii++) {
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
      for (let ll1lIlI1 = 0; ll1lIlI1 < retrynum; ll1lIlI1++) {
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
      let l11il1ll = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (l11il1ll > opencard_draw) l11il1ll = opencard_draw;
      console.log("💖 抽奖次数为:" + l11il1ll);
      for (m = 1; l11il1ll--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let iI11II1 = 0; iI11II1 < retrynum; iI11II1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(l11il1ll) <= 0) break;
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
  } catch (iiIi11l1) {
    console.log(iiIi11l1);
  }
}
async function takePostRequest(ll11iIl1) {
  if ($.outFlag) return;
  let iIl1ii1i = "https://jinggengjcq-isv.isvjcloud.com",
    iIi1liil = "",
    IllIiiii = "POST",
    IlIil1l1 = "";
  switch (ll11iIl1) {
    case "activity_load":
      url = iIl1ii1i + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil1l1 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) IlIil1l1 = {
        ...IlIil1l1,
        "shopId": "" + $.joinVenderId
      };
      iIi1liil = taskPostUrl("/jdBigAlliance/activity/load", IlIil1l1);
      break;
    case "shopList":
      url = iIl1ii1i + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil1l1 = {};
      iIi1liil = taskPostUrl("/jdBigAlliance/shop/shopList", IlIil1l1);
      break;
    case "绑定":
      url = iIl1ii1i + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil1l1 = {
        "inviterNick": $.inviteNick || ""
      };
      iIi1liil = taskPostUrl("/jdBigAlliance/customer/inviteRelation", IlIil1l1);
      break;
    case "mission":
      url = iIl1ii1i + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil1l1 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) IlIil1l1 = {
        ...IlIil1l1,
        "shopId": $.joinVenderId
      };
      iIi1liil = taskPostUrl("/jdBigAlliance/mission/completeMission", IlIil1l1);
      break;
    case "抽奖":
      url = iIl1ii1i + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IlIil1l1 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      iIi1liil = taskPostUrl("/jdBigAlliance/interactive/drawPost", IlIil1l1);
      break;
    default:
      console.log("错误" + ll11iIl1);
  }
  let IIili1 = getPostRequest(url, iIi1liil, IllIiiii);
  return new Promise(async IliiIIiI => {
    $.post(IIili1, (liIlll11, I1i11I1i, iII1IIil) => {
      try {
        liIlll11 ? (I1i11I1i && I1i11I1i.statusCode && I1i11I1i.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : dealReturn(ll11iIl1, iII1IIil);
      } catch (lI1ill1i) {
        console.log(lI1ill1i, I1i11I1i);
      } finally {
        IliiIIiI();
      }
    });
  });
}
async function dealReturn(IilliI1I, l1i11I1l) {
  let il11lil = "";
  try {
    $.krFlag = true;
    if (IilliI1I != "accessLogWithAD" || IilliI1I != "drawContent") {
      if (l1i11I1l) {
        il11lil = JSON.parse(l1i11I1l);
      }
    }
  } catch (li1IilIi) {
    console.log("🤬 " + IilliI1I + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let I1I11I1l = "";
    switch (IilliI1I) {
      case "抽奖":
        if (typeof il11lil == "object") {
          if (il11lil.success && il11lil.success === true && il11lil.data) {
            if (il11lil.data.status && il11lil.data.status == 200) {
              if (il11lil.data.data.sendResult) {
                console.log("抽中：" + il11lil.data.data.awardSetting.awardName);
              } else !il11lil.data.data.result ? console.log("空气") : console.log(il11lil.data.data);
            } else {
              if (il11lil.data.status && il11lil.data.status == 500) {
                console.log("" + (il11lil.data.msg || ""));
              }
            }
          } else il11lil.message ? console.log("" + (il11lil.message || "")) : console.log(l1i11I1l);
        } else console.log(l1i11I1l);
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
        I1I11I1l = "";
        if (IilliI1I == "followShop") I1I11I1l = "关注";
        if (IilliI1I == "addCart") I1I11I1l = "加购";
        if (typeof il11lil == "object") {
          if (il11lil.success && il11lil.success === true && il11lil.data) {
            if (il11lil.data.status && il11lil.data.status == 200) {
              il11lil = il11lil.data;
              if (IilliI1I != "setMixNick" && (il11lil.msg || il11lil.data.isOpenCard || il11lil.data.remark)) console.log("🔊 " + (I1I11I1l && I1I11I1l + ":" || "") + (il11lil.msg || il11lil.data.isOpenCard || il11lil.data.remark || ""));
              if (IilliI1I == "activity_load") {
                if (il11lil.msg || il11lil.data.isOpenCard) {
                  if ((il11lil.msg || il11lil.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (il11lil.data) {
                  $.endTime = il11lil.data.cusActivity.endTime || 0;
                  $.MixNick = il11lil.data.missionCustomer.buyerNick || "";
                  $.usedChance = il11lil.data.missionCustomer.usedChance || 0;
                  $.totalPoint = il11lil.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = il11lil.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = il11lil.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IilliI1I == "shopList") $.openList = il11lil.data || [];else {
                  if (IilliI1I == "mission") {
                    il11lil.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;
                  } else {
                    if (IilliI1I == "uniteOpenCardOne") $.uniteOpenCar = il11lil.msg || il11lil.data.msg || "";else {
                      if (IilliI1I == "myAward") {
                        console.log("🔊 我的奖品：");
                        let ilIl11li = 0;
                        for (let li111lll in il11lil.data.list || []) {
                          let Ii1liIll = il11lil.data.list[li111lll];
                          ilIl11li += Number(Ii1liIll.awardDes);
                        }
                        if (ilIl11li > 0) console.log("🔊 共获得" + ilIl11li + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IilliI1I == "missionInviteList" && console.log("🔊 邀请人数(" + il11lil.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (il11lil.data.msg) {
                il11lil.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (il11lil.data.msg || ""));
              } else {
                if (il11lil.errorMessage) {
                  if (il11lil.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (il11lil.errorMessage || ""));
                } else {
                  console.log("" + l1i11I1l);
                }
              }
            }
          } else il11lil.errorMessage ? console.log("🔊 " + (il11lil.errorMessage || "")) : console.log("" + l1i11I1l);
        } else {}
        break;
      default:
        console.log((I1I11I1l || IilliI1I) + "-> " + l1i11I1l);
    }
    if (typeof il11lil == "object") {
      if (il11lil.errorMessage) {
        if (il11lil.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (IIl1i1il) {}
}
function getPostRequest(Ilii1i1i, l1III1Il, Iii1iIii = "POST") {
  let iiIl1i = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return Ilii1i1i.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (iiIl1i.Origin = "https://jinggengjcq-isv.isvjcloud.com", iiIl1i["Content-Type"] = "application/json; charset=utf-8", delete iiIl1i.Cookie), {
    "url": Ilii1i1i,
    "method": Iii1iIii,
    "headers": iiIl1i,
    "body": l1III1Il,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(I1I1Il1, Iil1IilI) {
  d = {
    "actId": $.actId,
    ...Iil1IilI,
    "method": I1I1Il1,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const lI11Iil = {
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
        ...Iil1IilI,
        "method": I1I1Il1,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return I1I1Il1.indexOf("missionInviteList") > -1 && delete lI11Iil.params.admJson.actId, $.toStr(lI11Iil, lI11Iil);
}
function random(iIlIlIl1, IIlil) {
  return Math.floor(Math.random() * (IIlil - iIlIlIl1)) + iIlIlIl1;
}
function mpdzSign(IIlIiI11) {
  AppSecret = "9255c297ffb948009ddfc10b774d23fa";
  key = "d62612426524";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(IIlIiI11));
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
  const I1lIiili = CryptoJS.enc.Utf8.parse(id),
    II1liiIi = CryptoJS.enc.Base64.stringify(I1lIiili);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": II1liiIi,
      "od": "",
      "ov": "Ctq=",
      "ud": II1liiIi
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(Iilll1iI) {
  Iilll1iI = Iilll1iI || 32;
  let Ii1li11 = "abcdef0123456789",
    i11iI1I = Ii1li11.length,
    liIiiI11 = "";
  for (i = 0; i < Iilll1iI; i++) liIiiI11 += Ii1li11.charAt(Math.floor(Math.random() * i11iI1I));
  return liIiiI11;
}
function jsonParse(ll1liiIi) {
  if (typeof ll1liiIi == "string") try {
    return JSON.parse(ll1liiIi);
  } catch (IIIill) {
    return console.log(IIIill), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIiI1iIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let llIIlllI = "";
    if ($.shopactivityId) llIIlllI = ",\"activityId\":" + $.shopactivityId;
    const Iiiilll1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + llIIlllI + ",\"channel\":406}",
      IiII1l1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Iiiilll1)
      };
    for (var lilili1i = "", I1i1I11i = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", Iii1ilii = 0; Iii1ilii < 16; Iii1ilii++) {
      var i1i1iIii = Math.round(Math.random() * (I1i1I11i.length - 1));
      lilili1i += I1i1I11i.substring(i1i1iIii, i1i1iIii + 1);
    }
    uuid = Buffer.from(lilili1i, "utf8").toString("base64");
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
    const i11IIii = await getH5st("8adfb", IiII1l1i),
      i11lII1i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Iiiilll1 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i11IIii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i11lII1i, async (llIi1IlI, ll1Il11l, IlIlIll1) => {
      try {
        if (llIi1IlI) ll1Il11l && typeof ll1Il11l.statusCode != "undefined" && ll1Il11l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IlIlIll1 = IlIlIll1 && IlIlIll1.match(/jsonp_.*?\((.*?)\);/) && IlIlIll1.match(/jsonp_.*?\((.*?)\);/)[1] || IlIlIll1;
          let lIIIIlII = $.toObj(IlIlIll1, IlIlIll1);
          if (lIIIIlII && typeof lIIIIlII == "object") {
            if (lIIIIlII && lIIIIlII.success === true) {
              console.log(" >> " + lIIIIlII.message);
              $.errorJoinShop = lIIIIlII.message;
              if (lIIIIlII.result && lIIIIlII.result.giftInfo) for (let I11Ii1li of lIIIIlII.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + I11Ii1li.discountString + I11Ii1li.prizeName + I11Ii1li.secondLineDesc);
              }
            } else lIIIIlII && typeof lIIIIlII == "object" && lIIIIlII.message ? ($.errorJoinShop = lIIIIlII.message, console.log("" + (lIIIIlII.message || ""))) : console.log(IlIlIll1);
          } else console.log(IlIlIll1);
        }
      } catch (I1il1lll) {
        $.logErr(I1il1lll, ll1Il11l);
      } finally {
        IIiI1iIl();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async i11iIlil => {
    const l1IIl1Il = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      ilII1ii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l1IIl1Il)
      };
    await $.wait(1000);
    const liIiiii = await getH5st("8adfb", ilII1ii),
      iI11i11l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l1IIl1Il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(liIiiii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iI11i11l, async (l1l1I1li, I1llilI1, Iil1IIi1) => {
      try {
        if (l1l1I1li) I1llilI1 && typeof I1llilI1.statusCode != "undefined" && I1llilI1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          Iil1IIi1 = Iil1IIi1 && Iil1IIi1.match(/jsonp_.*?\((.*?)\);/) && Iil1IIi1.match(/jsonp_.*?\((.*?)\);/)[1] || Iil1IIi1;
          let Il1I1Iil = $.toObj(Iil1IIi1, Iil1IIi1);
          Il1I1Iil && typeof Il1I1Iil == "object" ? Il1I1Iil && Il1I1Iil.success == true && (console.log("去加入：" + (Il1I1Iil.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = Il1I1Iil.result.interestsRuleList && Il1I1Iil.result.interestsRuleList[0] && Il1I1Iil.result.interestsRuleList[0].interestsInfo && Il1I1Iil.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(Iil1IIi1);
        }
      } catch (ll1lii11) {
        $.logErr(ll1lii11, I1llilI1);
      } finally {
        i11iIlil();
      }
    });
  });
}
function getAuthorCodeList(llilIl1I) {
  return new Promise(llllllII => {
    const IIi11lII = {
      "url": llilIl1I + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IIi11lII, async (l1l11l, I11I1lIl, lIIl11i) => {
      try {
        if (l1l11l) {
          $.getAuthorCodeListerr = false;
        } else {
          if (lIIl11i) lIIl11i = JSON.parse(lIIl11i);
          $.getAuthorCodeListerr = true;
        }
      } catch (iIlllIiI) {
        $.logErr(iIlllIiI, I11I1lIl);
        lIIl11i = null;
      } finally {
        llllllII(lIIl11i);
      }
    });
  });
}
function random(II1Il1l, Iliil1l) {
  return Math.floor(Math.random() * (Iliil1l - II1Il1l)) + II1Il1l;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iIIIIII = Array.from(new Set($.blacklist.split("&")));
  console.log(iIIIIII.join("&") + "\n");
  let I1i1liIi = iIIIIII,
    iliIIi1 = [],
    IIiiI1i1 = false;
  for (let IlIIIII1 = 0; IlIIIII1 < cookiesArr.length; IlIIIII1++) {
    let i1iIlI11 = decodeURIComponent(cookiesArr[IlIIIII1].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[IlIIIII1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!i1iIlI11) break;
    let liIiIiil = false;
    for (let il1il1il of I1i1liIi) {
      if (il1il1il && il1il1il == i1iIlI11) {
        liIiIiil = true;
        break;
      }
    }
    !liIiIiil && (IIiiI1i1 = true, iliIIi1.splice(IlIIIII1, -1, cookiesArr[IlIIIII1]));
  }
  if (IIiiI1i1) cookiesArr = iliIIi1;
}
function toFirst(IIIIl11, l1iIi1l) {
  l1iIi1l != 0 && IIIIl11.unshift(IIIIl11.splice(l1iIi1l, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const lI1Ili = Array.from(new Set($.whitelist.split("&")));
  console.log(lI1Ili.join("&") + "\n");
  let lIIIiIii = [],
    lliil1ll = lI1Ili;
  for (let lill1iI in cookiesArr) {
    let i1l11lI = decodeURIComponent(cookiesArr[lill1iI].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[lill1iI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    lliil1ll.includes(i1l11lI) && lIIIiIii.push(cookiesArr[lill1iI]);
  }
  helpCookiesArr = lIIIiIii;
  if (lliil1ll.length > 1) {
    for (let I1iIlIl1 in lliil1ll) {
      let lI1il1il = lliil1ll[lliil1ll.length - 1 - I1iIlIl1];
      if (!lI1il1il) continue;
      for (let il1I1ll in helpCookiesArr) {
        let lIlIiii = decodeURIComponent(helpCookiesArr[il1I1ll].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[il1I1ll].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        lI1il1il == lIlIiii && toFirst(helpCookiesArr, il1I1ll);
      }
    }
  }
}