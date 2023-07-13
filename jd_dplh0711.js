/*
大牌联合0711期

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
#大牌联合0711期
1 19 13,15 * * jd_dplh0711.js, tag=大牌联合0711期, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("大牌联合0711期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(iIIIi => {
    cookiesArr.push(jdCookieNode[iIIIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(Il1iII => Il1iII.cookie)].filter(Iii1iI => !!Iii1iI);
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
  KRDPLHTY = "4b61f265bb9d4d25_230711";
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
  for (let Il1iIi = 0; Il1iIi < cookiesArr.length; Il1iIi++) {
    cookie = cookiesArr[Il1iIi];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Il1iIi + 1;
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
    let Iii1ii = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + Iii1ii);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + Iii1ii);
  }
})().catch(l1iiI1 => $.logErr(l1iiI1)).finally(() => $.done());
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
    for (let li11il = 0; li11il < retrynum; li11il++) {
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
    for (let ll1lII = 0; ll1lII < retrynum; ll1lII++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let li1iI = 0; li1iI < retrynum; li1iI++) {
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
        for (let ll1lI1 = 0; ll1lI1 < retrynum; ll1lI1++) {
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
          for (let II1ll = 0; II1ll < retrynum; II1ll++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let lIiIii = 0; lIiIii < retrynum; lIiIii++) {
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
      for (let Ii1Ili = 0; Ii1Ili < retrynum; Ii1Ili++) {
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
      for (let Ii1Ill = 0; Ii1Ill < retrynum; Ii1Ill++) {
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
      let li1lI = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (li1lI > opencard_draw) li1lI = opencard_draw;
      console.log("💖 抽奖次数为:" + li1lI);
      for (m = 1; li1lI--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let iliiiI = 0; iliiiI < retrynum; iliiiI++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(li1lI) <= 0) break;
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
  } catch (lIi11i) {
    console.log(lIi11i);
  }
}
async function takePostRequest(i1Iii) {
  if ($.outFlag) return;
  let lIi11l = "https://jinggengjcq-isv.isvjcloud.com",
    i1IlI = "",
    lIl1Ii = "POST",
    lIl1Il = "";
  switch (i1Iii) {
    case "activity_load":
      url = lIi11l + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIl1Il = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) lIl1Il = {
        ...lIl1Il,
        "shopId": "" + $.joinVenderId
      };
      i1IlI = taskPostUrl("/jdBigAlliance/activity/load", lIl1Il);
      break;
    case "shopList":
      url = lIi11l + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIl1Il = {};
      i1IlI = taskPostUrl("/jdBigAlliance/shop/shopList", lIl1Il);
      break;
    case "绑定":
      url = lIi11l + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIl1Il = {
        "inviterNick": $.inviteNick || ""
      };
      i1IlI = taskPostUrl("/jdBigAlliance/customer/inviteRelation", lIl1Il);
      break;
    case "mission":
      url = lIi11l + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIl1Il = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) lIl1Il = {
        ...lIl1Il,
        "shopId": $.joinVenderId
      };
      i1IlI = taskPostUrl("/jdBigAlliance/mission/completeMission", lIl1Il);
      break;
    case "抽奖":
      url = lIi11l + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIl1Il = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      i1IlI = taskPostUrl("/jdBigAlliance/interactive/drawPost", lIl1Il);
      break;
    default:
      console.log("错误" + i1Iii);
  }
  let Ii1IlI = getPostRequest(url, i1IlI, lIl1Ii);
  return new Promise(async I1IIli => {
    $.post(Ii1IlI, (Il1I1i, lIilI1, Il1I1l) => {
      try {
        Il1I1i ? (lIilI1 && lIilI1.statusCode && lIilI1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : dealReturn(i1Iii, Il1I1l);
      } catch (li1li) {
        console.log(li1li, lIilI1);
      } finally {
        I1IIli();
      }
    });
  });
}
async function dealReturn(ll1Ii1, li1ll) {
  let i1IiI = "";
  try {
    $.krFlag = true;
    (ll1Ii1 != "accessLogWithAD" || ll1Ii1 != "drawContent") && li1ll && (i1IiI = JSON.parse(li1ll));
  } catch (iIIlIi) {
    console.log("🤬 " + ll1Ii1 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let iilIll = "";
    switch (ll1Ii1) {
      case "抽奖":
        if (typeof i1IiI == "object") {
          if (i1IiI.success && i1IiI.success === true && i1IiI.data) {
            if (i1IiI.data.status && i1IiI.data.status == 200) {
              if (i1IiI.data.data.sendResult) {
                console.log("抽中：" + i1IiI.data.data.awardSetting.awardName);
              } else !i1IiI.data.data.result ? console.log("空气") : console.log(i1IiI.data.data);
            } else i1IiI.data.status && i1IiI.data.status == 500 && console.log("" + (i1IiI.data.msg || ""));
          } else i1IiI.message ? console.log("" + (i1IiI.message || "")) : console.log(li1ll);
        } else {
          console.log(li1ll);
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
        iilIll = "";
        if (ll1Ii1 == "followShop") iilIll = "关注";
        if (ll1Ii1 == "addCart") iilIll = "加购";
        if (typeof i1IiI == "object") {
          if (i1IiI.success && i1IiI.success === true && i1IiI.data) {
            if (i1IiI.data.status && i1IiI.data.status == 200) {
              i1IiI = i1IiI.data;
              if (ll1Ii1 != "setMixNick" && (i1IiI.msg || i1IiI.data.isOpenCard || i1IiI.data.remark)) console.log("🔊 " + (iilIll && iilIll + ":" || "") + (i1IiI.msg || i1IiI.data.isOpenCard || i1IiI.data.remark || ""));
              if (ll1Ii1 == "activity_load") {
                if (i1IiI.msg || i1IiI.data.isOpenCard) {
                  if ((i1IiI.msg || i1IiI.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (i1IiI.data) {
                  $.endTime = i1IiI.data.cusActivity.endTime || 0;
                  $.MixNick = i1IiI.data.missionCustomer.buyerNick || "";
                  $.usedChance = i1IiI.data.missionCustomer.usedChance || 0;
                  $.totalPoint = i1IiI.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = i1IiI.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = i1IiI.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (ll1Ii1 == "shopList") $.openList = i1IiI.data || [];else {
                  if (ll1Ii1 == "mission") {
                    i1IiI.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;
                  } else {
                    if (ll1Ii1 == "uniteOpenCardOne") $.uniteOpenCar = i1IiI.msg || i1IiI.data.msg || "";else {
                      if (ll1Ii1 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let IiIil1 = 0;
                        for (let i111l in i1IiI.data.list || []) {
                          let lIiIlI = i1IiI.data.list[i111l];
                          IiIil1 += Number(lIiIlI.awardDes);
                        }
                        if (IiIil1 > 0) console.log("🔊 共获得" + IiIil1 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else ll1Ii1 == "missionInviteList" && console.log("🔊 邀请人数(" + i1IiI.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (i1IiI.data.msg) {
                i1IiI.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (i1IiI.data.msg || ""));
              } else {
                if (i1IiI.errorMessage) {
                  if (i1IiI.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (i1IiI.errorMessage || ""));
                } else console.log("" + li1ll);
              }
            }
          } else i1IiI.errorMessage ? console.log("🔊 " + (i1IiI.errorMessage || "")) : console.log("" + li1ll);
        } else {}
        break;
      default:
        console.log((iilIll || ll1Ii1) + "-> " + li1ll);
    }
    if (typeof i1IiI == "object") {
      if (i1IiI.errorMessage) {
        if (i1IiI.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (lIiIli) {}
}
function getPostRequest(IiIII, IiIiii, lIiIll = "POST") {
  let iIIlI1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IiIII.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (iIIlI1.Origin = "https://jinggengjcq-isv.isvjcloud.com", iIIlI1["Content-Type"] = "application/json; charset=utf-8", delete iIIlI1.Cookie), {
    "url": IiIII,
    "method": lIiIll,
    "headers": iIIlI1,
    "body": IiIiii,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(III1ii, l1I1ii) {
  d = {
    "actId": $.actId,
    ...l1I1ii,
    "method": III1ii,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const I1IlI1 = {
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
        ...l1I1ii,
        "method": III1ii,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return III1ii.indexOf("missionInviteList") > -1 && delete I1IlI1.params.admJson.actId, $.toStr(I1IlI1, I1IlI1);
}
function random(IIiI, l1iil1) {
  return Math.floor(Math.random() * (l1iil1 - IIiI)) + IIiI;
}
function mpdzSign(lillI) {
  return AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed", key = "c1614da9ac68", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(lillI)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
    "sign": sign,
    "timeStamp": time2
  };
}
async function getUa() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const l1iiii = CryptoJS.enc.Utf8.parse(id),
    iiiIi1 = CryptoJS.enc.Base64.stringify(l1iiii);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": iiiIi1,
      "od": "",
      "ov": "Ctq=",
      "ud": iiiIi1
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(li1lll) {
  li1lll = li1lll || 32;
  let IiIIl = "abcdef0123456789",
    IiIIi = IiIIl.length,
    li1lli = "";
  for (i = 0; i < li1lll; i++) li1lli += IiIIl.charAt(Math.floor(Math.random() * IiIIi));
  return li1lli;
}
function jsonParse(l1ill) {
  if (typeof l1ill == "string") try {
    return JSON.parse(l1ill);
  } catch (illIIl) {
    return console.log(illIIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async Ill1iI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIll = "";
    if ($.shopactivityId) IIll = ",\"activityId\":" + $.shopactivityId;
    const i1Ii1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIll + ",\"channel\":406}",
      iiiIll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1Ii1i)
      };
    for (var iilliI = "", iII1i = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", ilI1ii = 0; ilI1ii < 16; ilI1ii++) {
      var iII1l = Math.round(Math.random() * (iII1i.length - 1));
      iilliI += iII1i.substring(iII1l, iII1l + 1);
    }
    uuid = Buffer.from(iilliI, "utf8").toString("base64");
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
    const ilI1il = await getH5st("8adfb", iiiIll),
      i11Il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i1Ii1i + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ilI1il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i11Il, async (iillil, iillii, ilI1iI) => {
      try {
        if (iillil) {
          if (iillii && typeof iillii.statusCode != "undefined") {
            iillii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          ilI1iI = ilI1iI && ilI1iI.match(/jsonp_.*?\((.*?)\);/) && ilI1iI.match(/jsonp_.*?\((.*?)\);/)[1] || ilI1iI;
          let iI11ii = $.toObj(ilI1iI, ilI1iI);
          if (iI11ii && typeof iI11ii == "object") {
            if (iI11ii && iI11ii.success === true) {
              console.log(" >> " + iI11ii.message);
              $.errorJoinShop = iI11ii.message;
              if (iI11ii.result && iI11ii.result.giftInfo) {
                for (let iil1I1 of iI11ii.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + iil1I1.discountString + iil1I1.prizeName + iil1I1.secondLineDesc);
                }
              }
            } else iI11ii && typeof iI11ii == "object" && iI11ii.message ? ($.errorJoinShop = iI11ii.message, console.log("" + (iI11ii.message || ""))) : console.log(ilI1iI);
          } else console.log(ilI1iI);
        }
      } catch (liiI) {
        $.logErr(liiI, iillii);
      } finally {
        Ill1iI();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async lii1 => {
    const iIliIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      IIil1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIliIi)
      };
    await $.wait(1000);
    const i1i1l1 = await getH5st("8adfb", IIil1l),
      iIii1i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIliIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1i1l1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIii1i, async (II1i11, IlillI, I111l1) => {
      try {
        if (II1i11) IlillI && typeof IlillI.statusCode != "undefined" && IlillI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          I111l1 = I111l1 && I111l1.match(/jsonp_.*?\((.*?)\);/) && I111l1.match(/jsonp_.*?\((.*?)\);/)[1] || I111l1;
          let i1i1li = $.toObj(I111l1, I111l1);
          if (i1i1li && typeof i1i1li == "object") i1i1li && i1i1li.success == true && (console.log("去加入：" + (i1i1li.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i1i1li.result.interestsRuleList && i1i1li.result.interestsRuleList[0] && i1i1li.result.interestsRuleList[0].interestsInfo && i1i1li.result.interestsRuleList[0].interestsInfo.activityId || "");else {
            console.log(I111l1);
          }
        }
      } catch (iii11i) {
        $.logErr(iii11i, IlillI);
      } finally {
        lii1();
      }
    });
  });
}
function getAuthorCodeList(lIl1i1) {
  return new Promise(IlIli => {
    const iliil1 = {
      "url": lIl1i1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iliil1, async (iI11iI, l1IliI, liIIIi) => {
      try {
        if (iI11iI) $.getAuthorCodeListerr = false;else {
          if (liIIIi) liIIIi = JSON.parse(liIIIi);
          $.getAuthorCodeListerr = true;
        }
      } catch (iliilI) {
        $.logErr(iliilI, l1IliI);
        liIIIi = null;
      } finally {
        IlIli(liIIIi);
      }
    });
  });
}
function random(II1i1l, II1i1i) {
  return Math.floor(Math.random() * (II1i1i - II1i1l)) + II1i1l;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const Ii1lII = Array.from(new Set($.blacklist.split("&")));
  console.log(Ii1lII.join("&") + "\n");
  let iliI11 = Ii1lII,
    ii1iI1 = [],
    ll111I = false;
  for (let ll1111 = 0; ll1111 < cookiesArr.length; ll1111++) {
    let liIl11 = decodeURIComponent(cookiesArr[ll1111].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[ll1111].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!liIl11) break;
    let i11IIl = false;
    for (let IIl11I of iliI11) {
      if (IIl11I && IIl11I == liIl11) {
        i11IIl = true;
        break;
      }
    }
    !i11IIl && (ll111I = true, ii1iI1.splice(ll1111, -1, cookiesArr[ll1111]));
  }
  if (ll111I) cookiesArr = ii1iI1;
}
function toFirst(illII1, Il1iii) {
  Il1iii != 0 && illII1.unshift(illII1.splice(Il1iii, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const lilI = Array.from(new Set($.whitelist.split("&")));
  console.log(lilI.join("&") + "\n");
  let ll111i = [],
    l1Ill1 = lilI;
  for (let iiilIl in cookiesArr) {
    let Il1ilI = decodeURIComponent(cookiesArr[iiilIl].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[iiilIl].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    l1Ill1.includes(Il1ilI) && ll111i.push(cookiesArr[iiilIl]);
  }
  helpCookiesArr = ll111i;
  if (l1Ill1.length > 1) {
    for (let iiilIi in l1Ill1) {
      let l1Illl = l1Ill1[l1Ill1.length - 1 - iiilIi];
      if (!l1Illl) continue;
      for (let Ii111I in helpCookiesArr) {
        let iI11ll = decodeURIComponent(helpCookiesArr[Ii111I].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[Ii111I].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        l1Illl == iI11ll && toFirst(helpCookiesArr, Ii111I);
      }
    }
  }
}