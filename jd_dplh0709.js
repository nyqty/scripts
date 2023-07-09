/*
大牌联合0709期

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
#大牌联合0709期
1 18 9,11 * * jd_dplh0709.js, tag=大牌联合0709期, enabled=true
*/
let opencard_toShop = "false";
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0709期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(liIIii => {
    cookiesArr.push(jdCookieNode[liIIii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(Iii1lI => Iii1lI.cookie)].filter(I1liii => !!I1liii);
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
  KRDPLHTY = "36c4c1ce12df410ba30ebef96_230709";
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
  authorCodeList = await getAuthorCodeList("http://code.kingran.cf/dplh.json");
  $.authorCode = helpnum ? helpnum : authorCodeList[random(0, authorCodeList.length)];
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
  for (let iIl1I = 0; iIl1I < cookiesArr.length; iIl1I++) {
    cookie = cookiesArr[iIl1I];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIl1I + 1;
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
    let liIIlI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + liIIlI);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + liIIlI);
  }
})().catch(IliIil => $.logErr(IliIil)).finally(() => $.done());
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
    for (let li11iI = 0; li11iI < retrynum; li11iI++) {
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
    for (let liii1l = 0; liii1l < retrynum; liii1l++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let I1iiI1 = 0; I1iiI1 < retrynum; I1iiI1++) {
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
        for (let li11l1 = 0; li11l1 < retrynum; li11l1++) {
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
          for (let ilIli1 = 0; ilIli1 < retrynum; ilIli1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let li11lI = 0; li11lI < retrynum; li11lI++) {
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
      for (let li1ii = 0; li1ii < retrynum; li1ii++) {
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
      for (let lIiIiI = 0; lIiIiI < retrynum; lIiIiI++) {
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
      let II1li = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (II1li > opencard_draw) II1li = opencard_draw;
      console.log("💖 抽奖次数为:" + II1li);
      for (m = 1; II1li--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let li11il = 0; li11il < retrynum; li11il++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(II1li) <= 0) break;
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
  } catch (II1ll) {
    console.log(II1ll);
  }
}
async function takePostRequest(liii11) {
  if ($.outFlag) return;
  let i1Ill = "https://jinggengjcq-isv.isvjcloud.com",
    Il1I11 = "",
    lIl1II = "POST",
    Ii1Ili = "";
  switch (liii11) {
    case "activity_load":
      url = i1Ill + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ili = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) Ii1Ili = {
        ...Ii1Ili,
        "shopId": "" + $.joinVenderId
      };
      Il1I11 = taskPostUrl("/jdBigAlliance/activity/load", Ii1Ili);
      break;
    case "shopList":
      url = i1Ill + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ili = {};
      Il1I11 = taskPostUrl("/jdBigAlliance/shop/shopList", Ii1Ili);
      break;
    case "绑定":
      url = i1Ill + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ili = {
        "inviterNick": $.inviteNick || ""
      };
      Il1I11 = taskPostUrl("/jdBigAlliance/customer/inviteRelation", Ii1Ili);
      break;
    case "mission":
      url = i1Ill + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ili = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) Ii1Ili = {
        ...Ii1Ili,
        "shopId": $.joinVenderId
      };
      Il1I11 = taskPostUrl("/jdBigAlliance/mission/completeMission", Ii1Ili);
      break;
    case "抽奖":
      url = i1Ill + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ili = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      Il1I11 = taskPostUrl("/jdBigAlliance/interactive/drawPost", Ii1Ili);
      break;
    default:
      console.log("错误" + liii11);
  }
  let IIiI11 = getPostRequest(url, Il1I11, lIl1II);
  return new Promise(async lIl1Il => {
    $.post(IIiI11, (I1IIli, Il1I1i, lIilI1) => {
      try {
        if (I1IIli) {
          Il1I1i && Il1I1i.statusCode && Il1I1i.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else {
          dealReturn(liii11, lIilI1);
        }
      } catch (iIIIli) {
        console.log(iIIIli, Il1I1i);
      } finally {
        lIl1Il();
      }
    });
  });
}
async function dealReturn(ilIlli, I1IIlI) {
  let Ii1Iii = "";
  try {
    $.krFlag = true;
    (ilIlli != "accessLogWithAD" || ilIlli != "drawContent") && I1IIlI && (Ii1Iii = JSON.parse(I1IIlI));
  } catch (I1I111) {
    console.log("🤬 " + ilIlli + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let lIllli = "";
    switch (ilIlli) {
      case "抽奖":
        if (typeof Ii1Iii == "object") {
          if (Ii1Iii.success && Ii1Iii.success === true && Ii1Iii.data) {
            if (Ii1Iii.data.status && Ii1Iii.data.status == 200) {
              if (Ii1Iii.data.data.sendResult) console.log("抽中：" + Ii1Iii.data.data.awardSetting.awardName);else !Ii1Iii.data.data.result ? console.log("空气") : console.log(Ii1Iii.data.data);
            } else Ii1Iii.data.status && Ii1Iii.data.status == 500 && console.log("" + (Ii1Iii.data.msg || ""));
          } else {
            if (Ii1Iii.message) console.log("" + (Ii1Iii.message || ""));else {
              console.log(I1IIlI);
            }
          }
        } else console.log(I1IIlI);
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
        lIllli = "";
        if (ilIlli == "followShop") lIllli = "关注";
        if (ilIlli == "addCart") lIllli = "加购";
        if (typeof Ii1Iii == "object") {
          if (Ii1Iii.success && Ii1Iii.success === true && Ii1Iii.data) {
            if (Ii1Iii.data.status && Ii1Iii.data.status == 200) {
              Ii1Iii = Ii1Iii.data;
              if (ilIlli != "setMixNick" && (Ii1Iii.msg || Ii1Iii.data.isOpenCard || Ii1Iii.data.remark)) console.log("🔊 " + (lIllli && lIllli + ":" || "") + (Ii1Iii.msg || Ii1Iii.data.isOpenCard || Ii1Iii.data.remark || ""));
              if (ilIlli == "activity_load") {
                if (Ii1Iii.msg || Ii1Iii.data.isOpenCard) {
                  if ((Ii1Iii.msg || Ii1Iii.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (Ii1Iii.data) {
                  $.endTime = Ii1Iii.data.cusActivity.endTime || 0;
                  $.MixNick = Ii1Iii.data.missionCustomer.buyerNick || "";
                  $.usedChance = Ii1Iii.data.missionCustomer.usedChance || 0;
                  $.totalPoint = Ii1Iii.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = Ii1Iii.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = Ii1Iii.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (ilIlli == "shopList") $.openList = Ii1Iii.data || [];else {
                  if (ilIlli == "mission") Ii1Iii.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (ilIlli == "uniteOpenCardOne") $.uniteOpenCar = Ii1Iii.msg || Ii1Iii.data.msg || "";else {
                      if (ilIlli == "myAward") {
                        console.log("🔊 我的奖品：");
                        let IlII = 0;
                        for (let IiIili in Ii1Iii.data.list || []) {
                          let llIiil = Ii1Iii.data.list[IiIili];
                          IlII += Number(llIiil.awardDes);
                        }
                        if (IlII > 0) console.log("🔊 共获得" + IlII + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else ilIlli == "missionInviteList" && console.log("🔊 邀请人数(" + Ii1Iii.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (Ii1Iii.data.msg) {
                Ii1Iii.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (Ii1Iii.data.msg || ""));
              } else {
                if (Ii1Iii.errorMessage) {
                  if (Ii1Iii.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (Ii1Iii.errorMessage || ""));
                } else {
                  console.log("" + I1IIlI);
                }
              }
            }
          } else {
            if (Ii1Iii.errorMessage) console.log("🔊 " + (Ii1Iii.errorMessage || ""));else {
              console.log("" + I1IIlI);
            }
          }
        } else {}
        break;
      default:
        console.log((lIllli || ilIlli) + "-> " + I1IIlI);
    }
    if (typeof Ii1Iii == "object") {
      if (Ii1Iii.errorMessage) {
        if (Ii1Iii.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (IlIi1I) {}
}
function getPostRequest(i111I, llIiiI, IiIilI = "POST") {
  let iilIl1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i111I.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (iilIl1.Origin = "https://jinggengjcq-isv.isvjcloud.com", iilIl1["Content-Type"] = "application/json; charset=utf-8", delete iilIl1.Cookie), {
    "url": i111I,
    "method": IiIilI,
    "headers": iilIl1,
    "body": llIiiI,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(l1I1i1, I1IlIi) {
  d = {
    "actId": $.actId,
    ...I1IlIi,
    "method": l1I1i1,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const IiIil1 = {
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
        ...I1IlIi,
        "method": l1I1i1,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return l1I1i1.indexOf("missionInviteList") > -1 && delete IiIil1.params.admJson.actId, $.toStr(IiIil1, IiIil1);
}
function random(l1III, l1I1iI) {
  return Math.floor(Math.random() * (l1I1iI - l1III)) + l1III;
}
function mpdzSign(lIiIll) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(lIiIll));
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
  const I1IlI1 = CryptoJS.enc.Utf8.parse(id),
    i1111 = CryptoJS.enc.Base64.stringify(I1IlI1);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": i1111,
      "od": "",
      "ov": "Ctq=",
      "ud": i1111
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(IiIiiI) {
  IiIiiI = IiIiiI || 32;
  let lIllii = "abcdef0123456789",
    l1il1 = lIllii.length,
    IIiI = "";
  for (i = 0; i < IiIiiI; i++) IIiI += lIllii.charAt(Math.floor(Math.random() * l1il1));
  return IIiI;
}
function jsonParse(illl11) {
  if (typeof illl11 == "string") try {
    return JSON.parse(illl11);
  } catch (l1iiii) {
    return console.log(l1iiii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async I1i11 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Ill1ii = "";
    if ($.shopactivityId) Ill1ii = ",\"activityId\":" + $.shopactivityId;
    const IllII = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Ill1ii + ",\"channel\":406}",
      Ill1il = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IllII)
      };
    for (var IIlI = "", I1i1l = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", llIiIi = 0; llIiIi < 16; llIiIi++) {
      var IIil = Math.round(Math.random() * (I1i1l.length - 1));
      IIlI += I1i1l.substring(IIil, IIil + 1);
    }
    uuid = Buffer.from(IIlI, "utf8").toString("base64");
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
    const IIii = await getH5st("8adfb", Ill1il),
      i1Ii1I = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IllII + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1Ii1I, async (llIiIl, I1i1i, lIi1II) => {
      try {
        if (llIiIl) I1i1i && typeof I1i1i.statusCode != "undefined" && I1i1i.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lIi1II = lIi1II && lIi1II.match(/jsonp_.*?\((.*?)\);/) && lIi1II.match(/jsonp_.*?\((.*?)\);/)[1] || lIi1II;
          let lilll = $.toObj(lIi1II, lIi1II);
          if (lilll && typeof lilll == "object") {
            if (lilll && lilll.success === true) {
              console.log(" >> " + lilll.message);
              $.errorJoinShop = lilll.message;
              if (lilll.result && lilll.result.giftInfo) {
                for (let lilli of lilll.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + lilli.discountString + lilli.prizeName + lilli.secondLineDesc);
                }
              }
            } else lilll && typeof lilll == "object" && lilll.message ? ($.errorJoinShop = lilll.message, console.log("" + (lilll.message || ""))) : console.log(lIi1II);
          } else console.log(lIi1II);
        }
      } catch (IIll) {
        $.logErr(IIll, I1i1i);
      } finally {
        I1i11();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iII11 => {
    const iilll1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      l1iI11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iilll1)
      };
    await $.wait(1000);
    const l1I11 = await getH5st("8adfb", l1iI11),
      i11I1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iilll1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1I11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i11I1, async (IlIiI, l1iI1I, ilI1i1) => {
      try {
        if (IlIiI) {
          l1iI1I && typeof l1iI1I.statusCode != "undefined" && l1iI1I.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          ilI1i1 = ilI1i1 && ilI1i1.match(/jsonp_.*?\((.*?)\);/) && ilI1i1.match(/jsonp_.*?\((.*?)\);/)[1] || ilI1i1;
          let IlIi1 = $.toObj(ilI1i1, ilI1i1);
          IlIi1 && typeof IlIi1 == "object" ? IlIi1 && IlIi1.success == true && (console.log("去加入：" + (IlIi1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = IlIi1.result.interestsRuleList && IlIi1.result.interestsRuleList[0] && IlIi1.result.interestsRuleList[0].interestsInfo && IlIi1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(ilI1i1);
        }
      } catch (i1i1ii) {
        $.logErr(i1i1ii, l1iI1I);
      } finally {
        iII11();
      }
    });
  });
}
function getAuthorCodeList(Il1ili) {
  return new Promise(l1Ili1 => {
    const iliill = {
      "url": Il1ili + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iliill, async (I1liII, I1ii1I, Ililli) => {
      try {
        if (I1liII) {
          $.getAuthorCodeListerr = false;
        } else {
          if (Ililli) Ililli = JSON.parse(Ililli);
          $.getAuthorCodeListerr = true;
        }
      } catch (IIil1i) {
        $.logErr(IIil1i, I1ii1I);
        Ililli = null;
      } finally {
        l1Ili1(Ililli);
      }
    });
  });
}
function random(IIllIi, i11l1l) {
  return Math.floor(Math.random() * (i11l1l - IIllIi)) + IIllIi;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iIliII = Array.from(new Set($.blacklist.split("&")));
  console.log(iIliII.join("&") + "\n");
  let iIii1I = iIliII,
    I1liI1 = [],
    I1ii11 = false;
  for (let IIl11l = 0; IIl11l < cookiesArr.length; IIl11l++) {
    let I111i1 = decodeURIComponent(cookiesArr[IIl11l].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[IIl11l].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!I111i1) break;
    let lIl1i1 = false;
    for (let l1Ilil of iIii1I) {
      if (l1Ilil && l1Ilil == I111i1) {
        lIl1i1 = true;
        break;
      }
    }
    !lIl1i1 && (I1ii11 = true, I1liI1.splice(IIl11l, -1, cookiesArr[IIl11l]));
  }
  if (I1ii11) cookiesArr = I1liI1;
}
function toFirst(iil1Il, IlIll) {
  IlIll != 0 && iil1Il.unshift(iil1Il.splice(IlIll, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const lIl1iI = Array.from(new Set($.whitelist.split("&")));
  console.log(lIl1iI.join("&") + "\n");
  let iil1II = [],
    iii11I = lIl1iI;
  for (let l1IllI in cookiesArr) {
    let lIi1Ii = decodeURIComponent(cookiesArr[l1IllI].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[l1IllI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iii11I.includes(lIi1Ii) && iil1II.push(cookiesArr[l1IllI]);
  }
  helpCookiesArr = iil1II;
  if (iii11I.length > 1) {
    for (let iiilII in iii11I) {
      let IIiIII = iii11I[iii11I.length - 1 - iiilII];
      if (!IIiIII) continue;
      for (let lili in helpCookiesArr) {
        let lIi1Il = decodeURIComponent(helpCookiesArr[lili].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lili].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        IIiIII == lIi1Il && toFirst(helpCookiesArr, lili);
      }
    }
  }
}