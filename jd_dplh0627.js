/*
大牌联合0627期

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
#大牌联合0627期
1 18 29,30 * * jd_dplh0627.js, tag=大牌联合0627期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0627期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(ill1ll1I => {
    cookiesArr.push(jdCookieNode[ill1ll1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IIil1liI => IIil1liI.cookie)].filter(ilI1iIIi => !!ilI1iIIi);
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
  KRDPLHTY = "226ea09788b44abc919942e21_230627";
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
  for (let lliIliIl = 0; lliIliIl < cookiesArr.length; lliIliIl++) {
    cookie = cookiesArr[lliIliIl];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lliIliIl + 1;
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
    let l1l11l11 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + l1l11l11);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + l1l11l11);
  }
})().catch(l1IlIiii => $.logErr(l1IlIiii)).finally(() => $.done());
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
    for (let iIIii = 0; iIIii < retrynum; iIIii++) {
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
    for (let llIl1li = 0; llIl1li < retrynum; llIl1li++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let IiiIl11l = 0; IiiIl11l < retrynum; IiiIl11l++) {
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
        for (let i11i1I11 = 0; i11i1I11 < retrynum; i11i1I11++) {
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
          for (let I11iIil1 = 0; I11iIil1 < retrynum; I11iIil1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let Ii1lI1il = 0; Ii1lI1il < retrynum; Ii1lI1il++) {
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
      for (let li1111Ii = 0; li1111Ii < retrynum; li1111Ii++) {
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
      for (let iIilIIl = 0; iIilIIl < retrynum; iIilIIl++) {
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
      let IlIl1I11 = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (IlIl1I11 > opencard_draw) IlIl1I11 = opencard_draw;
      console.log("💖 抽奖次数为:" + IlIl1I11);
      for (m = 1; IlIl1I11--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let IIIIIll1 = 0; IIIIIll1 < retrynum; IIIIIll1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(IlIl1I11) <= 0) break;
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
  } catch (IllIl1iI) {
    console.log(IllIl1iI);
  }
}
async function takePostRequest(IiiI11I1) {
  if ($.outFlag) return;
  let illillIl = "https://jinggengjcq-isv.isvjcloud.com",
    i1IlIllI = "",
    ll1iiI1I = "POST",
    I1i11IIi = "";
  switch (IiiI11I1) {
    case "activity_load":
      url = illillIl + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I1i11IIi = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) I1i11IIi = {
        ...I1i11IIi,
        "shopId": "" + $.joinVenderId
      };
      i1IlIllI = taskPostUrl("/jdBigAlliance/activity/load", I1i11IIi);
      break;
    case "shopList":
      url = illillIl + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I1i11IIi = {};
      i1IlIllI = taskPostUrl("/jdBigAlliance/shop/shopList", I1i11IIi);
      break;
    case "绑定":
      url = illillIl + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I1i11IIi = {
        "inviterNick": $.inviteNick || ""
      };
      i1IlIllI = taskPostUrl("/jdBigAlliance/customer/inviteRelation", I1i11IIi);
      break;
    case "mission":
      url = illillIl + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I1i11IIi = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) I1i11IIi = {
        ...I1i11IIi,
        "shopId": $.joinVenderId
      };
      i1IlIllI = taskPostUrl("/jdBigAlliance/mission/completeMission", I1i11IIi);
      break;
    case "抽奖":
      url = illillIl + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I1i11IIi = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      i1IlIllI = taskPostUrl("/jdBigAlliance/interactive/drawPost", I1i11IIi);
      break;
    default:
      console.log("错误" + IiiI11I1);
  }
  let III1l1ii = getPostRequest(url, i1IlIllI, ll1iiI1I);
  return new Promise(async illillii => {
    $.post(III1l1ii, (IllilIil, IiI1lliI, iIi111i1) => {
      try {
        if (IllilIil) {
          IiI1lliI && IiI1lliI.statusCode && IiI1lliI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else {
          dealReturn(IiiI11I1, iIi111i1);
        }
      } catch (lilIlliI) {
        console.log(lilIlliI, IiI1lliI);
      } finally {
        illillii();
      }
    });
  });
}
async function dealReturn(lli1iiil, IIliIl1) {
  let lllll1i = "";
  try {
    $.krFlag = true;
    (lli1iiil != "accessLogWithAD" || lli1iiil != "drawContent") && IIliIl1 && (lllll1i = JSON.parse(IIliIl1));
  } catch (I1iIIlII) {
    console.log("🤬 " + lli1iiil + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let iIIlllll = "";
    switch (lli1iiil) {
      case "抽奖":
        if (typeof lllll1i == "object") {
          if (lllll1i.success && lllll1i.success === true && lllll1i.data) {
            if (lllll1i.data.status && lllll1i.data.status == 200) {
              if (lllll1i.data.data.sendResult) console.log("抽中：" + lllll1i.data.data.awardSetting.awardName);else !lllll1i.data.data.result ? console.log("空气") : console.log(lllll1i.data.data);
            } else lllll1i.data.status && lllll1i.data.status == 500 && console.log("" + (lllll1i.data.msg || ""));
          } else {
            if (lllll1i.message) {
              console.log("" + (lllll1i.message || ""));
            } else console.log(IIliIl1);
          }
        } else console.log(IIliIl1);
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
        iIIlllll = "";
        if (lli1iiil == "followShop") iIIlllll = "关注";
        if (lli1iiil == "addCart") iIIlllll = "加购";
        if (typeof lllll1i == "object") {
          if (lllll1i.success && lllll1i.success === true && lllll1i.data) {
            if (lllll1i.data.status && lllll1i.data.status == 200) {
              lllll1i = lllll1i.data;
              if (lli1iiil != "setMixNick" && (lllll1i.msg || lllll1i.data.isOpenCard || lllll1i.data.remark)) console.log("🔊 " + (iIIlllll && iIIlllll + ":" || "") + (lllll1i.msg || lllll1i.data.isOpenCard || lllll1i.data.remark || ""));
              if (lli1iiil == "activity_load") {
                if (lllll1i.msg || lllll1i.data.isOpenCard) {
                  if ((lllll1i.msg || lllll1i.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (lllll1i.data) {
                  $.endTime = lllll1i.data.cusActivity.endTime || 0;
                  $.MixNick = lllll1i.data.missionCustomer.buyerNick || "";
                  $.usedChance = lllll1i.data.missionCustomer.usedChance || 0;
                  $.totalPoint = lllll1i.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = lllll1i.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = lllll1i.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (lli1iiil == "shopList") $.openList = lllll1i.data || [];else {
                  if (lli1iiil == "mission") {
                    if (lllll1i.data.remark.indexOf("不是会员") > -1) {
                      $.openCard = true;
                    } else $.openCard = false;
                  } else {
                    if (lli1iiil == "uniteOpenCardOne") $.uniteOpenCar = lllll1i.msg || lllll1i.data.msg || "";else {
                      if (lli1iiil == "myAward") {
                        console.log("🔊 我的奖品：");
                        let iIIIII = 0;
                        for (let I1iIilI1 in lllll1i.data.list || []) {
                          let I1l1111l = lllll1i.data.list[I1iIilI1];
                          iIIIII += Number(I1l1111l.awardDes);
                        }
                        if (iIIIII > 0) console.log("🔊 共获得" + iIIIII + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else lli1iiil == "missionInviteList" && console.log("🔊 邀请人数(" + lllll1i.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (lllll1i.data.msg) {
                if (lllll1i.errorMessage.indexOf("活动未开始") > -1) {
                  $.activityEnd = true;
                }
                console.log("🔊 " + (lllll1i.data.msg || ""));
              } else {
                if (lllll1i.errorMessage) {
                  if (lllll1i.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (lllll1i.errorMessage || ""));
                } else console.log("" + IIliIl1);
              }
            }
          } else lllll1i.errorMessage ? console.log("🔊 " + (lllll1i.errorMessage || "")) : console.log("" + IIliIl1);
        } else {}
        break;
      default:
        console.log((iIIlllll || lli1iiil) + "-> " + IIliIl1);
    }
    if (typeof lllll1i == "object") {
      if (lllll1i.errorMessage) {
        if (lllll1i.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (Il1ili1l) {}
}
function getPostRequest(IIiIil1, IIIi11I, illiIil1 = "POST") {
  let I1lilIl1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IIiIil1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (I1lilIl1.Origin = "https://jinggengjcq-isv.isvjcloud.com", I1lilIl1["Content-Type"] = "application/json; charset=utf-8", delete I1lilIl1.Cookie), {
    "url": IIiIil1,
    "method": illiIil1,
    "headers": I1lilIl1,
    "body": IIIi11I,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(ilI1illl, i1111ili) {
  d = {
    "actId": $.actId,
    ...i1111ili,
    "method": ilI1illl,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const I1IIiI1 = {
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
        ...i1111ili,
        "method": ilI1illl,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return ilI1illl.indexOf("missionInviteList") > -1 && delete I1IIiI1.params.admJson.actId, $.toStr(I1IIiI1, I1IIiI1);
}
function random(Iil1lilI, IiIllIi) {
  return Math.floor(Math.random() * (IiIllIi - Iil1lilI)) + Iil1lilI;
}
function mpdzSign(I1IliIlI) {
  return AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed", key = "c1614da9ac68", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(I1IliIlI)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
    "sign": sign,
    "timeStamp": time2
  };
}
async function getUa() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const I1liiIIl = CryptoJS.enc.Utf8.parse(id),
    Il111111 = CryptoJS.enc.Base64.stringify(I1liiIIl);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": Il111111,
      "od": "",
      "ov": "Ctq=",
      "ud": Il111111
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(IIIiIIl) {
  IIIiIIl = IIIiIIl || 32;
  let ilIlIil1 = "abcdef0123456789",
    llllIiIi = ilIlIil1.length,
    IIlIi11l = "";
  for (i = 0; i < IIIiIIl; i++) IIlIi11l += ilIlIil1.charAt(Math.floor(Math.random() * llllIiIi));
  return IIlIi11l;
}
function jsonParse(I1lllIl1) {
  if (typeof I1lllIl1 == "string") try {
    return JSON.parse(I1lllIl1);
  } catch (i1iil1I1) {
    return console.log(i1iil1I1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIill1l1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let ll1i11l = "";
    if ($.shopactivityId) ll1i11l = ",\"activityId\":" + $.shopactivityId;
    const i1il1IiI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + ll1i11l + ",\"channel\":406}",
      IlllII1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1il1IiI)
      };
    for (var l1IiIIll = "", lIIlli = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", i1l1i1il = 0; i1l1i1il < 16; i1l1i1il++) {
      var ll1ilIIl = Math.round(Math.random() * (lIIlli.length - 1));
      l1IiIIll += lIIlli.substring(ll1ilIIl, ll1ilIIl + 1);
    }
    uuid = Buffer.from(l1IiIIll, "utf8").toString("base64");
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
    const IiI1IiI1 = await getH5st("8adfb", IlllII1l),
      iliIi11l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i1il1IiI + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IiI1IiI1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iliIi11l, async (I11111i, llil1i1I, lIliiIii) => {
      try {
        if (I11111i) llil1i1I && typeof llil1i1I.statusCode != "undefined" && llil1i1I.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lIliiIii = lIliiIii && lIliiIii.match(/jsonp_.*?\((.*?)\);/) && lIliiIii.match(/jsonp_.*?\((.*?)\);/)[1] || lIliiIii;
          let III1Iii1 = $.toObj(lIliiIii, lIliiIii);
          if (III1Iii1 && typeof III1Iii1 == "object") {
            if (III1Iii1 && III1Iii1.success === true) {
              console.log(" >> " + III1Iii1.message);
              $.errorJoinShop = III1Iii1.message;
              if (III1Iii1.result && III1Iii1.result.giftInfo) for (let liill1II of III1Iii1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + liill1II.discountString + liill1II.prizeName + liill1II.secondLineDesc);
              }
            } else III1Iii1 && typeof III1Iii1 == "object" && III1Iii1.message ? ($.errorJoinShop = III1Iii1.message, console.log("" + (III1Iii1.message || ""))) : console.log(lIliiIii);
          } else console.log(lIliiIii);
        }
      } catch (Ill1iiI1) {
        $.logErr(Ill1iiI1, llil1i1I);
      } finally {
        IIill1l1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async I1ii1IlI => {
    const IiI1i11l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      Il1llIll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IiI1i11l)
      };
    await $.wait(1000);
    const IilllIIi = await getH5st("8adfb", Il1llIll),
      iIiIlIl1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IiI1i11l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IilllIIi),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIiIlIl1, async (I1iIIllI, I11iIIli, IIIl1I1I) => {
      try {
        if (I1iIIllI) {
          if (I11iIIli && typeof I11iIIli.statusCode != "undefined") {
            I11iIIli.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          IIIl1I1I = IIIl1I1I && IIIl1I1I.match(/jsonp_.*?\((.*?)\);/) && IIIl1I1I.match(/jsonp_.*?\((.*?)\);/)[1] || IIIl1I1I;
          let IiiIi1lI = $.toObj(IIIl1I1I, IIIl1I1I);
          IiiIi1lI && typeof IiiIi1lI == "object" ? IiiIi1lI && IiiIi1lI.success == true && (console.log("去加入：" + (IiiIi1lI.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = IiiIi1lI.result.interestsRuleList && IiiIi1lI.result.interestsRuleList[0] && IiiIi1lI.result.interestsRuleList[0].interestsInfo && IiiIi1lI.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(IIIl1I1I);
        }
      } catch (I11IiIlI) {
        $.logErr(I11IiIlI, I11iIIli);
      } finally {
        I1ii1IlI();
      }
    });
  });
}
function getAuthorCodeList(llII1l1l) {
  return new Promise(IIl1liil => {
    const lil11i1i = {
      "url": llII1l1l + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lil11i1i, async (il11ii1I, iIl1IIl1, iIili1iI) => {
      try {
        if (il11ii1I) $.getAuthorCodeListerr = false;else {
          if (iIili1iI) iIili1iI = JSON.parse(iIili1iI);
          $.getAuthorCodeListerr = true;
        }
      } catch (lIIiil1i) {
        $.logErr(lIIiil1i, iIl1IIl1);
        iIili1iI = null;
      } finally {
        IIl1liil(iIili1iI);
      }
    });
  });
}
function random(iii1iiii, IillI11l) {
  return Math.floor(Math.random() * (IillI11l - iii1iiii)) + iii1iiii;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const IIlIl111 = Array.from(new Set($.blacklist.split("&")));
  console.log(IIlIl111.join("&") + "\n");
  let i1lIlIi = IIlIl111,
    llll11l1 = [],
    llIi1l1i = false;
  for (let iI11I11 = 0; iI11I11 < cookiesArr.length; iI11I11++) {
    let IliiIll = decodeURIComponent(cookiesArr[iI11I11].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[iI11I11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IliiIll) break;
    let llIllll1 = false;
    for (let Iil111l1 of i1lIlIi) {
      if (Iil111l1 && Iil111l1 == IliiIll) {
        llIllll1 = true;
        break;
      }
    }
    !llIllll1 && (llIi1l1i = true, llll11l1.splice(iI11I11, -1, cookiesArr[iI11I11]));
  }
  if (llIi1l1i) cookiesArr = llll11l1;
}
function toFirst(Iil1Iil, i11l1111) {
  i11l1111 != 0 && Iil1Iil.unshift(Iil1Iil.splice(i11l1111, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const il1lIiiI = Array.from(new Set($.whitelist.split("&")));
  console.log(il1lIiiI.join("&") + "\n");
  let IIii = [],
    IlllI1ll = il1lIiiI;
  for (let IiIi1i in cookiesArr) {
    let I1I1II11 = decodeURIComponent(cookiesArr[IiIi1i].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[IiIi1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    IlllI1ll.includes(I1I1II11) && IIii.push(cookiesArr[IiIi1i]);
  }
  helpCookiesArr = IIii;
  if (IlllI1ll.length > 1) {
    for (let Ii11Ii1 in IlllI1ll) {
      let lllI1Ill = IlllI1ll[IlllI1ll.length - 1 - Ii11Ii1];
      if (!lllI1Ill) continue;
      for (let iI111lll in helpCookiesArr) {
        let iliI1IlI = decodeURIComponent(helpCookiesArr[iI111lll].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iI111lll].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        lllI1Ill == iliI1IlI && toFirst(helpCookiesArr, iI111lll);
      }
    }
  }
}