/*
大牌联合061502期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023061502coh/oC2023061502coh?actId=b6c6e40904dd42adbb_23061502

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
#大牌联合061502期
11 21 15,17 * * jd_dplh0615b.js, tag=大牌联合061502期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合061502期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(l1IlI1 => {
    cookiesArr.push(jdCookieNode[l1IlI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(ii11 => ii11.cookie)].filter(liIIil => !!liIIil);
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
  KRDPLHTY = "b6c6e40904dd42adbb_23061502";
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
  for (let liIIli = 0; liIIli < cookiesArr.length; liIIli++) {
    cookie = cookiesArr[liIIli];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = liIIli + 1;
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
    let Ili11l = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + Ili11l);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + Ili11l);
  }
})().catch(I1lill => $.logErr(I1lill)).finally(() => $.done());
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
    for (let lIl1Il = 0; lIl1Il < retrynum; lIl1Il++) {
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
    for (let Il1I1I = 0; Il1I1I < retrynum; Il1I1I++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let li11li = 0; li11li < retrynum; li11li++) {
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
        for (let li1l1 = 0; li1l1 < retrynum; li1l1++) {
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
          for (let ilIllI = 0; ilIllI < retrynum; ilIllI++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let Il1I1i = 0; Il1I1i < retrynum; Il1I1i++) {
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
      for (let Il1I1l = 0; Il1I1l < retrynum; Il1I1l++) {
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
      for (let I1IIll = 0; I1IIll < retrynum; I1IIll++) {
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
      let ilIlli = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (ilIlli > opencard_draw) ilIlli = opencard_draw;
      console.log("💖 抽奖次数为:" + ilIlli);
      for (m = 1; ilIlli--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let I1IIlI = 0; I1IIlI < retrynum; I1IIlI++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(ilIlli) <= 0) break;
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
  } catch (Ii1Iii) {
    console.log(Ii1Iii);
  }
}
async function takePostRequest(Ii1Iil) {
  if ($.outFlag) return;
  let li1li = "https://jinggengjcq-isv.isvjcloud.com",
    iIIIll = "",
    ll1Ii1 = "POST",
    li1ll = "";
  switch (Ii1Iil) {
    case "activity_load":
      url = li1li + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ll = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) li1ll = {
        ...li1ll,
        "shopId": "" + $.joinVenderId
      };
      iIIIll = taskPostUrl("/jdBigAlliance/activity/load", li1ll);
      break;
    case "shopList":
      url = li1li + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ll = {};
      iIIIll = taskPostUrl("/jdBigAlliance/shop/shopList", li1ll);
      break;
    case "绑定":
      url = li1li + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ll = {
        "inviterNick": $.inviteNick || ""
      };
      iIIIll = taskPostUrl("/jdBigAlliance/customer/inviteRelation", li1ll);
      break;
    case "mission":
      url = li1li + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ll = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) li1ll = {
        ...li1ll,
        "shopId": $.joinVenderId
      };
      iIIIll = taskPostUrl("/jdBigAlliance/mission/completeMission", li1ll);
      break;
    case "抽奖":
      url = li1li + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li1ll = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      iIIIll = taskPostUrl("/jdBigAlliance/interactive/drawPost", li1ll);
      break;
    default:
      console.log("错误" + Ii1Iil);
  }
  let iliii1 = getPostRequest(url, iIIIll, ll1Ii1);
  return new Promise(async IiIii1 => {
    $.post(iliii1, (l1lIIl, i1lIl, i1lIi) => {
      try {
        if (l1lIIl) {
          if (i1lIl && i1lIl.statusCode && i1lIl.statusCode == 493) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            $.outFlag = true;
          }
          $.retry = true;
        } else dealReturn(Ii1Iil, i1lIi);
      } catch (Ili1iI) {
        console.log(Ili1iI, i1lIl);
      } finally {
        IiIii1();
      }
    });
  });
}
async function dealReturn(lIlll1, Ili1i1) {
  let iII11l = "";
  try {
    $.krFlag = true;
    (lIlll1 != "accessLogWithAD" || lIlll1 != "drawContent") && Ili1i1 && (iII11l = JSON.parse(Ili1i1));
  } catch (llIii1) {
    console.log("🤬 " + lIlll1 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let l1III = "";
    switch (lIlll1) {
      case "抽奖":
        if (typeof iII11l == "object") {
          if (iII11l.success && iII11l.success === true && iII11l.data) {
            if (iII11l.data.status && iII11l.data.status == 200) {
              if (iII11l.data.data.sendResult) console.log("抽中：" + iII11l.data.data.awardSetting.awardName);else {
                if (!iII11l.data.data.result) {
                  console.log("空气");
                } else console.log(iII11l.data.data);
              }
            } else iII11l.data.status && iII11l.data.status == 500 && console.log("" + (iII11l.data.msg || ""));
          } else iII11l.message ? console.log("" + (iII11l.message || "")) : console.log(Ili1i1);
        } else console.log(Ili1i1);
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
        l1III = "";
        if (lIlll1 == "followShop") l1III = "关注";
        if (lIlll1 == "addCart") l1III = "加购";
        if (typeof iII11l == "object") {
          if (iII11l.success && iII11l.success === true && iII11l.data) {
            if (iII11l.data.status && iII11l.data.status == 200) {
              iII11l = iII11l.data;
              if (lIlll1 != "setMixNick" && (iII11l.msg || iII11l.data.isOpenCard || iII11l.data.remark)) console.log("🔊 " + (l1III && l1III + ":" || "") + (iII11l.msg || iII11l.data.isOpenCard || iII11l.data.remark || ""));
              if (lIlll1 == "activity_load") {
                if (iII11l.msg || iII11l.data.isOpenCard) {
                  if ((iII11l.msg || iII11l.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (iII11l.data) {
                  $.endTime = iII11l.data.cusActivity.endTime || 0;
                  $.MixNick = iII11l.data.missionCustomer.buyerNick || "";
                  $.usedChance = iII11l.data.missionCustomer.usedChance || 0;
                  $.totalPoint = iII11l.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = iII11l.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = iII11l.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (lIlll1 == "shopList") $.openList = iII11l.data || [];else {
                  if (lIlll1 == "mission") iII11l.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (lIlll1 == "uniteOpenCardOne") $.uniteOpenCar = iII11l.msg || iII11l.data.msg || "";else {
                      if (lIlll1 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let III1il = 0;
                        for (let I1IlI1 in iII11l.data.list || []) {
                          let i1111 = iII11l.data.list[I1IlI1];
                          III1il += Number(i1111.awardDes);
                        }
                        if (III1il > 0) console.log("🔊 共获得" + III1il + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else lIlll1 == "missionInviteList" && console.log("🔊 邀请人数(" + iII11l.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (iII11l.data.msg) {
                if (iII11l.errorMessage.indexOf("活动未开始") > -1) {
                  $.activityEnd = true;
                }
                console.log("🔊 " + (iII11l.data.msg || ""));
              } else {
                if (iII11l.errorMessage) {
                  if (iII11l.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (iII11l.errorMessage || ""));
                } else console.log("" + Ili1i1);
              }
            }
          } else {
            if (iII11l.errorMessage) console.log("🔊 " + (iII11l.errorMessage || ""));else {
              console.log("" + Ili1i1);
            }
          }
        } else {}
        break;
      default:
        console.log((l1III || lIlll1) + "-> " + Ili1i1);
    }
    if (typeof iII11l == "object") {
      if (iII11l.errorMessage) {
        if (iII11l.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (l1il1) {}
}
function getPostRequest(IIiI, l1iil1, iiiIiI = "POST") {
  let illl1I = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IIiI.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (illl1I.Origin = "https://jinggengjcq-isv.isvjcloud.com", illl1I["Content-Type"] = "application/json; charset=utf-8", delete illl1I.Cookie), {
    "url": IIiI,
    "method": iiiIiI,
    "headers": illl1I,
    "body": l1iil1,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(l1iiil, l1ilI) {
  d = {
    "actId": $.actId,
    ...l1ilI,
    "method": l1iiil,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const illl1i = {
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
        ...l1ilI,
        "method": l1iiil,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return l1iiil.indexOf("missionInviteList") > -1 && delete illl1i.params.admJson.actId, $.toStr(illl1i, illl1i);
}
function random(lill1, IiIIl) {
  return Math.floor(Math.random() * (IiIIl - lill1)) + lill1;
}
function mpdzSign(I1i1I) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(I1i1I));
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
  const iiiIlI = CryptoJS.enc.Utf8.parse(id),
    I1i11 = CryptoJS.enc.Base64.stringify(iiiIlI);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": I1i11,
      "od": "",
      "ov": "Ctq=",
      "ud": I1i11
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(Ill1il) {
  Ill1il = Ill1il || 32;
  let I1i1l = "abcdef0123456789",
    llIiIi = I1i1l.length,
    IIil = "";
  for (i = 0; i < Ill1il; i++) IIil += I1i1l.charAt(Math.floor(Math.random() * llIiIi));
  return IIil;
}
function jsonParse(lIi1II) {
  if (typeof lIi1II == "string") try {
    return JSON.parse(lIi1II);
  } catch (lilll) {
    return console.log(lilll), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async iilli1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Iil1l = "";
    if ($.shopactivityId) Iil1l = ",\"activityId\":" + $.shopactivityId;
    const Iil1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Iil1l + ",\"channel\":406}",
      i1i1i1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Iil1i)
      };
    for (var iiiIli = "", IllIl = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IllIi = 0; IllIi < 16; IllIi++) {
      var IIli = Math.round(Math.random() * (IllIl.length - 1));
      iiiIli += IllIl.substring(IIli, IIli + 1);
    }
    uuid = Buffer.from(iiiIli, "utf8").toString("base64");
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
    const iII11 = await getH5st("8adfb", i1i1i1),
      iilll1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Iil1i + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iII11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iilll1, async (i11II, IlIi1, i1i1il) => {
      try {
        if (i11II) IlIi1 && typeof IlIi1.statusCode != "undefined" && IlIi1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          i1i1il = i1i1il && i1i1il.match(/jsonp_.*?\((.*?)\);/) && i1i1il.match(/jsonp_.*?\((.*?)\);/)[1] || i1i1il;
          let iii111 = $.toObj(i1i1il, i1i1il);
          if (iii111 && typeof iii111 == "object") {
            if (iii111 && iii111.success === true) {
              console.log(" >> " + iii111.message);
              $.errorJoinShop = iii111.message;
              if (iii111.result && iii111.result.giftInfo) for (let liiI of iii111.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + liiI.discountString + liiI.prizeName + liiI.secondLineDesc);
              }
            } else iii111 && typeof iii111 == "object" && iii111.message ? ($.errorJoinShop = iii111.message, console.log("" + (iii111.message || ""))) : console.log(i1i1il);
          } else {
            console.log(i1i1il);
          }
        }
      } catch (l1Ili1) {
        $.logErr(l1Ili1, IlIi1);
      } finally {
        iilli1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async i1i1lI => {
    const i11l1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      IIllIl = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i11l1l)
      };
    await $.wait(1000);
    const i11l1i = await getH5st("8adfb", IIllIl),
      iI11l1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + i11l1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i11l1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iI11l1, async (I111l1, iIliII, iIii1I) => {
      try {
        if (I111l1) {
          if (iIliII && typeof iIliII.statusCode != "undefined") {
            iIliII.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          iIii1I = iIii1I && iIii1I.match(/jsonp_.*?\((.*?)\);/) && iIii1I.match(/jsonp_.*?\((.*?)\);/)[1] || iIii1I;
          let iii11i = $.toObj(iIii1I, iIii1I);
          iii11i && typeof iii11i == "object" ? iii11i && iii11i.success == true && (console.log("去加入：" + (iii11i.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iii11i.result.interestsRuleList && iii11i.result.interestsRuleList[0] && iii11i.result.interestsRuleList[0].interestsInfo && iii11i.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iIii1I);
        }
      } catch (IIl11l) {
        $.logErr(IIl11l, iIliII);
      } finally {
        i1i1lI();
      }
    });
  });
}
function getAuthorCodeList(I111i1) {
  return new Promise(iil1II => {
    const IIil11 = {
      "url": I111i1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IIil11, async (iliilI, I111iI, IlIlI) => {
      try {
        if (iliilI) {
          $.getAuthorCodeListerr = false;
        } else {
          if (IlIlI) IlIlI = JSON.parse(IlIlI);
          $.getAuthorCodeListerr = true;
        }
      } catch (II1i1i) {
        $.logErr(II1i1i, I111iI);
        IlIlI = null;
      } finally {
        iil1II(IlIlI);
      }
    });
  });
}
function random(IIiIII, lili) {
  return Math.floor(Math.random() * (lili - IIiIII)) + IIiIII;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const IIl111 = Array.from(new Set($.blacklist.split("&")));
  console.log(IIl111.join("&") + "\n");
  let lill = IIl111,
    Ill1lI = [],
    Ii1lI1 = false;
  for (let IIl11I = 0; IIl11I < cookiesArr.length; IIl11I++) {
    let i11IIi = decodeURIComponent(cookiesArr[IIl11I].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[IIl11I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!i11IIi) break;
    let Il1ii1 = false;
    for (let illII1 of lill) {
      if (illII1 && illII1 == i11IIi) {
        Il1ii1 = true;
        break;
      }
    }
    !Il1ii1 && (Ii1lI1 = true, Ill1lI.splice(IIl11I, -1, cookiesArr[IIl11I]));
  }
  if (Ii1lI1) cookiesArr = Ill1lI;
}
function toFirst(iIiii, IIiIIl) {
  IIiIIl != 0 && iIiii.unshift(iIiii.splice(IIiIIl, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const ll111i = Array.from(new Set($.whitelist.split("&")));
  console.log(ll111i.join("&") + "\n");
  let l1Ill1 = [],
    iiilI1 = ll111i;
  for (let I111lI in cookiesArr) {
    let l1iii1 = decodeURIComponent(cookiesArr[I111lI].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[I111lI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (iiilI1.includes(l1iii1)) {
      l1Ill1.push(cookiesArr[I111lI]);
    }
  }
  helpCookiesArr = l1Ill1;
  if (iiilI1.length > 1) {
    for (let l1Illi in iiilI1) {
      let iiilIi = iiilI1[iiilI1.length - 1 - l1Illi];
      if (!iiilIi) continue;
      for (let l1Illl in helpCookiesArr) {
        let Ii111I = decodeURIComponent(helpCookiesArr[l1Illl].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[l1Illl].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        iiilIi == Ii111I && toFirst(helpCookiesArr, l1Illl);
      }
    }
  }
}