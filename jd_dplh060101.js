/*
大牌联合060101期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023060101cop/oC2023060101cop?actId=9a91d76e14c6407b_23060101

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
#大牌联合060101期
1 1 1 1 * jd_dplh060101.js, tag=大牌联合060101期, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("大牌联合060101期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(lIii1iIl => {
    cookiesArr.push(jdCookieNode[lIii1iIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(I11ilII1 => I11ilII1.cookie)].filter(iIllilIi => !!iIllilIi);
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
  KRDPLHTY = "9a91d76e14c6407b_23060101";
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
  for (let l1iiiIIl = 0; l1iiiIIl < cookiesArr.length; l1iiiIIl++) {
    cookie = cookiesArr[l1iiiIIl];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1iiiIIl + 1;
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
    let lIi1Ii1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + lIi1Ii1);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + lIi1Ii1);
  }
})().catch(i1i1Ii1I => $.logErr(i1i1Ii1I)).finally(() => $.done());
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
    for (let liII11II = 0; liII11II < retrynum; liII11II++) {
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
    for (let i11IIlI1 = 0; i11IIlI1 < retrynum; i11IIlI1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let ilI1Ill = 0; ilI1Ill < retrynum; ilI1Ill++) {
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
        for (let Ii11lIll = 0; Ii11lIll < retrynum; Ii11lIll++) {
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
          for (let illii1i1 = 0; illii1i1 < retrynum; illii1i1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let llIi1I1I = 0; llIi1I1I < retrynum; llIi1I1I++) {
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
      for (let Il1l1Iil = 0; Il1l1Iil < retrynum; Il1l1Iil++) {
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
      for (let l1I11111 = 0; l1I11111 < retrynum; l1I11111++) {
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
      let IIIIli11 = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (IIIIli11 > opencard_draw) IIIIli11 = opencard_draw;
      console.log("💖 抽奖次数为:" + IIIIli11);
      for (m = 1; IIIIli11--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let I11ilI1I = 0; I11ilI1I < retrynum; I11ilI1I++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(IIIIli11) <= 0) break;
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
  } catch (i11l) {
    console.log(i11l);
  }
}
async function takePostRequest(Iii1I1) {
  if ($.outFlag) return;
  let I1ililI1 = "https://jinggengjcq-isv.isvjcloud.com",
    l1lIIIi = "",
    ilIlIlII = "POST",
    lI1lil = "";
  switch (Iii1I1) {
    case "activity_load":
      url = I1ililI1 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lI1lil = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) lI1lil = {
        ...lI1lil,
        "shopId": "" + $.joinVenderId
      };
      l1lIIIi = taskPostUrl("/jdBigAlliance/activity/load", lI1lil);
      break;
    case "shopList":
      url = I1ililI1 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lI1lil = {};
      l1lIIIi = taskPostUrl("/jdBigAlliance/shop/shopList", lI1lil);
      break;
    case "绑定":
      url = I1ililI1 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lI1lil = {
        "inviterNick": $.inviteNick || ""
      };
      l1lIIIi = taskPostUrl("/jdBigAlliance/customer/inviteRelation", lI1lil);
      break;
    case "mission":
      url = I1ililI1 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lI1lil = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) lI1lil = {
        ...lI1lil,
        "shopId": $.joinVenderId
      };
      l1lIIIi = taskPostUrl("/jdBigAlliance/mission/completeMission", lI1lil);
      break;
    case "抽奖":
      url = I1ililI1 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lI1lil = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      l1lIIIi = taskPostUrl("/jdBigAlliance/interactive/drawPost", lI1lil);
      break;
    default:
      console.log("错误" + Iii1I1);
  }
  let liliIiIl = getPostRequest(url, l1lIIIi, ilIlIlII);
  return new Promise(async Ill11iIi => {
    $.post(liliIiIl, (liiiIill, i11lIli1, I1i1I1II) => {
      try {
        if (liiiIill) {
          i11lIli1 && i11lIli1.statusCode && i11lIli1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else {
          dealReturn(Iii1I1, I1i1I1II);
        }
      } catch (iii11IiI) {
        console.log(iii11IiI, i11lIli1);
      } finally {
        Ill11iIi();
      }
    });
  });
}
async function dealReturn(llIiI1Il, l1IlIlii) {
  let lI1i1ill = "";
  try {
    $.krFlag = true;
    if (llIiI1Il != "accessLogWithAD" || llIiI1Il != "drawContent") {
      l1IlIlii && (lI1i1ill = JSON.parse(l1IlIlii));
    }
  } catch (IiiiiI) {
    console.log("🤬 " + llIiI1Il + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let liiI11lI = "";
    switch (llIiI1Il) {
      case "抽奖":
        if (typeof lI1i1ill == "object") {
          if (lI1i1ill.success && lI1i1ill.success === true && lI1i1ill.data) {
            if (lI1i1ill.data.status && lI1i1ill.data.status == 200) {
              if (lI1i1ill.data.data.sendResult) console.log("抽中：" + lI1i1ill.data.data.awardSetting.awardName);else !lI1i1ill.data.data.result ? console.log("空气") : console.log(lI1i1ill.data.data);
            } else lI1i1ill.data.status && lI1i1ill.data.status == 500 && console.log("" + (lI1i1ill.data.msg || ""));
          } else lI1i1ill.message ? console.log("" + (lI1i1ill.message || "")) : console.log(l1IlIlii);
        } else console.log(l1IlIlii);
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
        liiI11lI = "";
        if (llIiI1Il == "followShop") liiI11lI = "关注";
        if (llIiI1Il == "addCart") liiI11lI = "加购";
        if (typeof lI1i1ill == "object") {
          if (lI1i1ill.success && lI1i1ill.success === true && lI1i1ill.data) {
            if (lI1i1ill.data.status && lI1i1ill.data.status == 200) {
              lI1i1ill = lI1i1ill.data;
              if (llIiI1Il != "setMixNick" && (lI1i1ill.msg || lI1i1ill.data.isOpenCard || lI1i1ill.data.remark)) console.log("🔊 " + (liiI11lI && liiI11lI + ":" || "") + (lI1i1ill.msg || lI1i1ill.data.isOpenCard || lI1i1ill.data.remark || ""));
              if (llIiI1Il == "activity_load") {
                if (lI1i1ill.msg || lI1i1ill.data.isOpenCard) {
                  if ((lI1i1ill.msg || lI1i1ill.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (lI1i1ill.data) {
                  $.endTime = lI1i1ill.data.cusActivity.endTime || 0;
                  $.MixNick = lI1i1ill.data.missionCustomer.buyerNick || "";
                  $.usedChance = lI1i1ill.data.missionCustomer.usedChance || 0;
                  $.totalPoint = lI1i1ill.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = lI1i1ill.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = lI1i1ill.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (llIiI1Il == "shopList") $.openList = lI1i1ill.data || [];else {
                  if (llIiI1Il == "mission") {
                    lI1i1ill.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;
                  } else {
                    if (llIiI1Il == "uniteOpenCardOne") $.uniteOpenCar = lI1i1ill.msg || lI1i1ill.data.msg || "";else {
                      if (llIiI1Il == "myAward") {
                        console.log("🔊 我的奖品：");
                        let li1i11I1 = 0;
                        for (let I11il1l1 in lI1i1ill.data.list || []) {
                          let lii11i1I = lI1i1ill.data.list[I11il1l1];
                          li1i11I1 += Number(lii11i1I.awardDes);
                        }
                        if (li1i11I1 > 0) console.log("🔊 共获得" + li1i11I1 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else {
                        if (llIiI1Il == "missionInviteList") {
                          console.log("🔊 邀请人数(" + lI1i1ill.data.invitedLogList.total + ")");
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (lI1i1ill.data.msg) {
                lI1i1ill.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (lI1i1ill.data.msg || ""));
              } else {
                if (lI1i1ill.errorMessage) {
                  if (lI1i1ill.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (lI1i1ill.errorMessage || ""));
                } else {
                  console.log("" + l1IlIlii);
                }
              }
            }
          } else lI1i1ill.errorMessage ? console.log("🔊 " + (lI1i1ill.errorMessage || "")) : console.log("" + l1IlIlii);
        } else {}
        break;
      default:
        console.log((liiI11lI || llIiI1Il) + "-> " + l1IlIlii);
    }
    if (typeof lI1i1ill == "object") {
      if (lI1i1ill.errorMessage) {
        if (lI1i1ill.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (lil1i1i1) {}
}
function getPostRequest(li1lIlii, IlllI1Il, llil11ll = "POST") {
  let lII1III1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return li1lIlii.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (lII1III1.Origin = "https://jinggengjcq-isv.isvjcloud.com", lII1III1["Content-Type"] = "application/json; charset=utf-8", delete lII1III1.Cookie), {
    "url": li1lIlii,
    "method": llil11ll,
    "headers": lII1III1,
    "body": IlllI1Il,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(IIliilIi, l1I1llI1) {
  d = {
    "actId": $.actId,
    ...l1I1llI1,
    "method": IIliilIi,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const IiliIi1l = {
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
        ...l1I1llI1,
        "method": IIliilIi,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return IIliilIi.indexOf("missionInviteList") > -1 && delete IiliIi1l.params.admJson.actId, $.toStr(IiliIi1l, IiliIi1l);
}
function random(iII11lI, iII11ii1) {
  return Math.floor(Math.random() * (iII11ii1 - iII11lI)) + iII11lI;
}
function mpdzSign(IiiiIIii) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(IiiiIIii));
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
  const Ii111iII = CryptoJS.enc.Utf8.parse(id),
    il11IiIi = CryptoJS.enc.Base64.stringify(Ii111iII);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": il11IiIi,
      "od": "",
      "ov": "Ctq=",
      "ud": il11IiIi
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(ii1I1l1I) {
  ii1I1l1I = ii1I1l1I || 32;
  let Ii1I1Il1 = "abcdef0123456789",
    Iii1iIIl = Ii1I1Il1.length,
    II1II1Ii = "";
  for (i = 0; i < ii1I1l1I; i++) II1II1Ii += Ii1I1Il1.charAt(Math.floor(Math.random() * Iii1iIIl));
  return II1II1Ii;
}
function jsonParse(illI1II1) {
  if (typeof illI1II1 == "string") {
    try {
      return JSON.parse(illI1II1);
    } catch (IlIiI111) {
      return console.log(IlIiI111), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async Ili1lIIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l1iiI1 = "";
    if ($.shopactivityId) l1iiI1 = ",\"activityId\":" + $.shopactivityId;
    const li111lI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l1iiI1 + ",\"channel\":406}",
      lIl11lI1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(li111lI)
      };
    for (var lIIIil1 = "", lliilI11 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iIIili1I = 0; iIIili1I < 16; iIIili1I++) {
      var IIi1llii = Math.round(Math.random() * (lliilI11.length - 1));
      lIIIil1 += lliilI11.substring(IIi1llii, IIi1llii + 1);
    }
    uuid = Buffer.from(lIIIil1, "utf8").toString("base64");
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
    const ilIliI = await getH5st("8adfb", lIl11lI1),
      ili1iIi1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + li111lI + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ilIliI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ili1iIi1, async (I1IliI, liIIIlll, liilI1l1) => {
      try {
        if (I1IliI) {
          if (liIIIlll && typeof liIIIlll.statusCode != "undefined") {
            liIIIlll.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          liilI1l1 = liilI1l1 && liilI1l1.match(/jsonp_.*?\((.*?)\);/) && liilI1l1.match(/jsonp_.*?\((.*?)\);/)[1] || liilI1l1;
          let iliili1 = $.toObj(liilI1l1, liilI1l1);
          if (iliili1 && typeof iliili1 == "object") {
            if (iliili1 && iliili1.success === true) {
              console.log(" >> " + iliili1.message);
              $.errorJoinShop = iliili1.message;
              if (iliili1.result && iliili1.result.giftInfo) for (let lii1liI1 of iliili1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + lii1liI1.discountString + lii1liI1.prizeName + lii1liI1.secondLineDesc);
              }
            } else iliili1 && typeof iliili1 == "object" && iliili1.message ? ($.errorJoinShop = iliili1.message, console.log("" + (iliili1.message || ""))) : console.log(liilI1l1);
          } else console.log(liilI1l1);
        }
      } catch (lill111I) {
        $.logErr(lill111I, liIIIlll);
      } finally {
        Ili1lIIl();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async i1IiIlI1 => {
    const li1iIIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      i11I1iIi = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(li1iIIl)
      };
    await $.wait(1000);
    const IiiilIII = await getH5st("8adfb", i11I1iIi),
      i11I1llI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + li1iIIl + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IiiilIII),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i11I1llI, async (Iiil1il1, IIlIi11l, ili1Iii1) => {
      try {
        if (Iiil1il1) IIlIi11l && typeof IIlIi11l.statusCode != "undefined" && IIlIi11l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          ili1Iii1 = ili1Iii1 && ili1Iii1.match(/jsonp_.*?\((.*?)\);/) && ili1Iii1.match(/jsonp_.*?\((.*?)\);/)[1] || ili1Iii1;
          let IlIIII11 = $.toObj(ili1Iii1, ili1Iii1);
          IlIIII11 && typeof IlIIII11 == "object" ? IlIIII11 && IlIIII11.success == true && (console.log("去加入：" + (IlIIII11.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = IlIIII11.result.interestsRuleList && IlIIII11.result.interestsRuleList[0] && IlIIII11.result.interestsRuleList[0].interestsInfo && IlIIII11.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(ili1Iii1);
        }
      } catch (lIi1illi) {
        $.logErr(lIi1illi, IIlIi11l);
      } finally {
        i1IiIlI1();
      }
    });
  });
}
function getAuthorCodeList(iliIliI1) {
  return new Promise(iIiIliI => {
    const lI11iIlI = {
      "url": iliIliI1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lI11iIlI, async (II1lIii, illI111i, lIIllll) => {
      try {
        if (II1lIii) $.getAuthorCodeListerr = false;else {
          if (lIIllll) lIIllll = JSON.parse(lIIllll);
          $.getAuthorCodeListerr = true;
        }
      } catch (IiIIIilI) {
        $.logErr(IiIIIilI, illI111i);
        lIIllll = null;
      } finally {
        iIiIliI(lIIllll);
      }
    });
  });
}
function random(iiiili1, ilIi11II) {
  return Math.floor(Math.random() * (ilIi11II - iiiili1)) + iiiili1;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const il1I1II = Array.from(new Set($.blacklist.split("&")));
  console.log(il1I1II.join("&") + "\n");
  let IlIlllI1 = il1I1II,
    IliIiIli = [],
    li11IIlI = false;
  for (let Ii1i1ilI = 0; Ii1i1ilI < cookiesArr.length; Ii1i1ilI++) {
    let IllIl1li = decodeURIComponent(cookiesArr[Ii1i1ilI].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[Ii1i1ilI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IllIl1li) break;
    let i1Il1iiI = false;
    for (let ilil1ll of IlIlllI1) {
      if (ilil1ll && ilil1ll == IllIl1li) {
        i1Il1iiI = true;
        break;
      }
    }
    !i1Il1iiI && (li11IIlI = true, IliIiIli.splice(Ii1i1ilI, -1, cookiesArr[Ii1i1ilI]));
  }
  if (li11IIlI) cookiesArr = IliIiIli;
}
function toFirst(IiiIlIl1, l1lil1) {
  l1lil1 != 0 && IiiIlIl1.unshift(IiiIlIl1.splice(l1lil1, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const i1ililii = Array.from(new Set($.whitelist.split("&")));
  console.log(i1ililii.join("&") + "\n");
  let II1ilI1l = [],
    lIli1I1i = i1ililii;
  for (let I11l1I1i in cookiesArr) {
    let lIIiIilI = decodeURIComponent(cookiesArr[I11l1I1i].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[I11l1I1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    lIli1I1i.includes(lIIiIilI) && II1ilI1l.push(cookiesArr[I11l1I1i]);
  }
  helpCookiesArr = II1ilI1l;
  if (lIli1I1i.length > 1) for (let ii111Iil in lIli1I1i) {
    let I1IliilI = lIli1I1i[lIli1I1i.length - 1 - ii111Iil];
    if (!I1IliilI) continue;
    for (let llI111l1 in helpCookiesArr) {
      let iIllI11i = decodeURIComponent(helpCookiesArr[llI111l1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[llI111l1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      I1IliilI == iIllI11i && toFirst(helpCookiesArr, llI111l1);
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }