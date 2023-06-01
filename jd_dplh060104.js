/*
大牌联合060104期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023060100def/oC2023060100def?actId=456c57e5dfaf421fb_23060104

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
#大牌联合060104期
1 1 1 1 * jd_dplh060104.js, tag=大牌联合060104期, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("大牌联合060104期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(lli1iiii => {
    cookiesArr.push(jdCookieNode[lli1iiii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(lIliilII => lIliilII.cookie)].filter(I1lil11l => !!I1lil11l);
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
  KRDPLHTY = "456c57e5dfaf421fb_23060104";
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
  for (let l1iili1l = 0; l1iili1l < cookiesArr.length; l1iili1l++) {
    cookie = cookiesArr[l1iili1l];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1iili1l + 1;
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
    let l1illIII = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + l1illIII);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + l1illIII);
  }
})().catch(iilliI11 => $.logErr(iilliI11)).finally(() => $.done());
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
    for (let iliiIil1 = 0; iliiIil1 < retrynum; iliiIil1++) {
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
    for (let il1ii1lI = 0; il1ii1lI < retrynum; il1ii1lI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let lI1Iliii = 0; lI1Iliii < retrynum; lI1Iliii++) {
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
        for (let liii11iI = 0; liii11iI < retrynum; liii11iI++) {
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
          for (let I1ii11ll = 0; I1ii11ll < retrynum; I1ii11ll++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let Iil1Illi = 0; Iil1Illi < retrynum; Iil1Illi++) {
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
      for (let ilIi1I = 0; ilIi1I < retrynum; ilIi1I++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else {
      console.log("💔 呜呜呜，已完成关注任务");
    }
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await takePostRequest("mission");
      for (let IlI111il = 0; IlI111il < retrynum; IlI111il++) {
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
      let ilI1iIlI = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (ilI1iIlI > opencard_draw) ilI1iIlI = opencard_draw;
      console.log("💖 抽奖次数为:" + ilI1iIlI);
      for (m = 1; ilI1iIlI--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let Iil1l = 0; Iil1l < retrynum; Iil1l++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(ilI1iIlI) <= 0) break;
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
  } catch (IIIiIlil) {
    console.log(IIIiIlil);
  }
}
async function takePostRequest(iI1iiIl) {
  if ($.outFlag) return;
  let IIiiii1 = "https://jinggengjcq-isv.isvjcloud.com",
    lI1l1Ii1 = "",
    llliIi1I = "POST",
    lIiiIi1i = "";
  switch (iI1iiIl) {
    case "activity_load":
      url = IIiiii1 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIiiIi1i = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) lIiiIi1i = {
        ...lIiiIi1i,
        "shopId": "" + $.joinVenderId
      };
      lI1l1Ii1 = taskPostUrl("/jdBigAlliance/activity/load", lIiiIi1i);
      break;
    case "shopList":
      url = IIiiii1 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIiiIi1i = {};
      lI1l1Ii1 = taskPostUrl("/jdBigAlliance/shop/shopList", lIiiIi1i);
      break;
    case "绑定":
      url = IIiiii1 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIiiIi1i = {
        "inviterNick": $.inviteNick || ""
      };
      lI1l1Ii1 = taskPostUrl("/jdBigAlliance/customer/inviteRelation", lIiiIi1i);
      break;
    case "mission":
      url = IIiiii1 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIiiIi1i = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) lIiiIi1i = {
        ...lIiiIi1i,
        "shopId": $.joinVenderId
      };
      lI1l1Ii1 = taskPostUrl("/jdBigAlliance/mission/completeMission", lIiiIi1i);
      break;
    case "抽奖":
      url = IIiiii1 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      lIiiIi1i = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      lI1l1Ii1 = taskPostUrl("/jdBigAlliance/interactive/drawPost", lIiiIi1i);
      break;
    default:
      console.log("错误" + iI1iiIl);
  }
  let Il1IIIi1 = getPostRequest(url, lI1l1Ii1, llliIi1I);
  return new Promise(async lIIllll => {
    $.post(Il1IIIi1, (iiIiII11, llIiIIII, lil1III) => {
      try {
        iiIiII11 ? (llIiIIII && llIiIIII.statusCode && llIiIIII.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : dealReturn(iI1iiIl, lil1III);
      } catch (l1lIiiI1) {
        console.log(l1lIiiI1, llIiIIII);
      } finally {
        lIIllll();
      }
    });
  });
}
async function dealReturn(IillIi1l, iil1Il1) {
  let i1IIlii = "";
  try {
    $.krFlag = true;
    (IillIi1l != "accessLogWithAD" || IillIi1l != "drawContent") && iil1Il1 && (i1IIlii = JSON.parse(iil1Il1));
  } catch (liII1lI) {
    console.log("🤬 " + IillIi1l + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let l1llll11 = "";
    switch (IillIi1l) {
      case "抽奖":
        if (typeof i1IIlii == "object") {
          if (i1IIlii.success && i1IIlii.success === true && i1IIlii.data) {
            if (i1IIlii.data.status && i1IIlii.data.status == 200) {
              if (i1IIlii.data.data.sendResult) console.log("抽中：" + i1IIlii.data.data.awardSetting.awardName);else {
                if (!i1IIlii.data.data.result) console.log("空气");else {
                  console.log(i1IIlii.data.data);
                }
              }
            } else {
              if (i1IIlii.data.status && i1IIlii.data.status == 500) {
                console.log("" + (i1IIlii.data.msg || ""));
              }
            }
          } else i1IIlii.message ? console.log("" + (i1IIlii.message || "")) : console.log(iil1Il1);
        } else {
          console.log(iil1Il1);
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
        l1llll11 = "";
        if (IillIi1l == "followShop") l1llll11 = "关注";
        if (IillIi1l == "addCart") l1llll11 = "加购";
        if (typeof i1IIlii == "object") {
          if (i1IIlii.success && i1IIlii.success === true && i1IIlii.data) {
            if (i1IIlii.data.status && i1IIlii.data.status == 200) {
              i1IIlii = i1IIlii.data;
              if (IillIi1l != "setMixNick" && (i1IIlii.msg || i1IIlii.data.isOpenCard || i1IIlii.data.remark)) console.log("🔊 " + (l1llll11 && l1llll11 + ":" || "") + (i1IIlii.msg || i1IIlii.data.isOpenCard || i1IIlii.data.remark || ""));
              if (IillIi1l == "activity_load") {
                if (i1IIlii.msg || i1IIlii.data.isOpenCard) {
                  if ((i1IIlii.msg || i1IIlii.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (i1IIlii.data) {
                  $.endTime = i1IIlii.data.cusActivity.endTime || 0;
                  $.MixNick = i1IIlii.data.missionCustomer.buyerNick || "";
                  $.usedChance = i1IIlii.data.missionCustomer.usedChance || 0;
                  $.totalPoint = i1IIlii.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = i1IIlii.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = i1IIlii.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IillIi1l == "shopList") $.openList = i1IIlii.data || [];else {
                  if (IillIi1l == "mission") {
                    i1IIlii.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;
                  } else {
                    if (IillIi1l == "uniteOpenCardOne") $.uniteOpenCar = i1IIlii.msg || i1IIlii.data.msg || "";else {
                      if (IillIi1l == "myAward") {
                        console.log("🔊 我的奖品：");
                        let illi = 0;
                        for (let il11llII in i1IIlii.data.list || []) {
                          let IlIl1lli = i1IIlii.data.list[il11llII];
                          illi += Number(IlIl1lli.awardDes);
                        }
                        if (illi > 0) console.log("🔊 共获得" + illi + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IillIi1l == "missionInviteList" && console.log("🔊 邀请人数(" + i1IIlii.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (i1IIlii.data.msg) {
                i1IIlii.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (i1IIlii.data.msg || ""));
              } else {
                if (i1IIlii.errorMessage) {
                  if (i1IIlii.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (i1IIlii.errorMessage || ""));
                } else console.log("" + iil1Il1);
              }
            }
          } else {
            if (i1IIlii.errorMessage) {
              console.log("🔊 " + (i1IIlii.errorMessage || ""));
            } else console.log("" + iil1Il1);
          }
        } else {}
        break;
      default:
        console.log((l1llll11 || IillIi1l) + "-> " + iil1Il1);
    }
    if (typeof i1IIlii == "object") {
      if (i1IIlii.errorMessage) {
        if (i1IIlii.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (I1liliii) {}
}
function getPostRequest(IlIIlI1l, IlIll1ii, i1iIII1 = "POST") {
  let lIi11ii1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IlIIlI1l.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (lIi11ii1.Origin = "https://jinggengjcq-isv.isvjcloud.com", lIi11ii1["Content-Type"] = "application/json; charset=utf-8", delete lIi11ii1.Cookie), {
    "url": IlIIlI1l,
    "method": i1iIII1,
    "headers": lIi11ii1,
    "body": IlIll1ii,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(ll1lI11I, lll11I1l) {
  d = {
    "actId": $.actId,
    ...lll11I1l,
    "method": ll1lI11I,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const II1IiilI = {
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
        ...lll11I1l,
        "method": ll1lI11I,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return ll1lI11I.indexOf("missionInviteList") > -1 && delete II1IiilI.params.admJson.actId, $.toStr(II1IiilI, II1IiilI);
}
function random(lIiIl1I, IIIl111l) {
  return Math.floor(Math.random() * (IIIl111l - lIiIl1I)) + lIiIl1I;
}
function mpdzSign(Iii1Iil1) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(Iii1Iil1));
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
  const iIil1IIi = CryptoJS.enc.Utf8.parse(id),
    lii1Iiil = CryptoJS.enc.Base64.stringify(iIil1IIi);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": lii1Iiil,
      "od": "",
      "ov": "Ctq=",
      "ud": lii1Iiil
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(liI111I) {
  liI111I = liI111I || 32;
  let iIl1IIII = "abcdef0123456789",
    IIlil1Ii = iIl1IIII.length,
    liII = "";
  for (i = 0; i < liI111I; i++) liII += iIl1IIII.charAt(Math.floor(Math.random() * IIlil1Ii));
  return liII;
}
function jsonParse(llI1I1I) {
  if (typeof llI1I1I == "string") try {
    return JSON.parse(llI1I1I);
  } catch (llIIliIl) {
    return console.log(llIIliIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIilIIlI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lIi1IIIl = "";
    if ($.shopactivityId) lIi1IIIl = ",\"activityId\":" + $.shopactivityId;
    const liI111 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lIi1IIIl + ",\"channel\":406}",
      III1iilI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liI111)
      };
    for (var iI1IlIl1 = "", IIIiI11I = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", i1ilIli = 0; i1ilIli < 16; i1ilIli++) {
      var lillIli = Math.round(Math.random() * (IIIiI11I.length - 1));
      iI1IlIl1 += IIIiI11I.substring(lillIli, lillIli + 1);
    }
    uuid = Buffer.from(iI1IlIl1, "utf8").toString("base64");
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
    const ii1l1i1i = await getH5st("8adfb", III1iilI),
      i1I111i1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + liI111 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ii1l1i1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1I111i1, async (IIi1I1II, IIil1ili, lIliii1) => {
      try {
        if (IIi1I1II) IIil1ili && typeof IIil1ili.statusCode != "undefined" && IIil1ili.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lIliii1 = lIliii1 && lIliii1.match(/jsonp_.*?\((.*?)\);/) && lIliii1.match(/jsonp_.*?\((.*?)\);/)[1] || lIliii1;
          let Iiil111 = $.toObj(lIliii1, lIliii1);
          if (Iiil111 && typeof Iiil111 == "object") {
            if (Iiil111 && Iiil111.success === true) {
              console.log(" >> " + Iiil111.message);
              $.errorJoinShop = Iiil111.message;
              if (Iiil111.result && Iiil111.result.giftInfo) for (let l1IlI1 of Iiil111.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + l1IlI1.discountString + l1IlI1.prizeName + l1IlI1.secondLineDesc);
              }
            } else Iiil111 && typeof Iiil111 == "object" && Iiil111.message ? ($.errorJoinShop = Iiil111.message, console.log("" + (Iiil111.message || ""))) : console.log(lIliii1);
          } else console.log(lIliii1);
        }
      } catch (lI1Iii1) {
        $.logErr(lI1Iii1, IIil1ili);
      } finally {
        IIilIIlI();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async IiiIliii => {
    const i1ilIiIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      ilIi1lIl = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1ilIiIl)
      };
    await $.wait(1000);
    const iiIIl1Ii = await getH5st("8adfb", ilIi1lIl),
      ii11liIi = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + i1ilIiIl + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiIIl1Ii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ii11liIi, async (iIiliil1, IIi1ilII, i1Il) => {
      try {
        if (iIiliil1) IIi1ilII && typeof IIi1ilII.statusCode != "undefined" && IIi1ilII.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          i1Il = i1Il && i1Il.match(/jsonp_.*?\((.*?)\);/) && i1Il.match(/jsonp_.*?\((.*?)\);/)[1] || i1Il;
          let il1l11i = $.toObj(i1Il, i1Il);
          il1l11i && typeof il1l11i == "object" ? il1l11i && il1l11i.success == true && (console.log("去加入：" + (il1l11i.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = il1l11i.result.interestsRuleList && il1l11i.result.interestsRuleList[0] && il1l11i.result.interestsRuleList[0].interestsInfo && il1l11i.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(i1Il);
        }
      } catch (IilliIll) {
        $.logErr(IilliIll, IIi1ilII);
      } finally {
        IiiIliii();
      }
    });
  });
}
function getAuthorCodeList(ililIIIi) {
  return new Promise(iiIIlIii => {
    const ll11Il = {
      "url": ililIIIi + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ll11Il, async (liilIl11, iliIII1l, lil1111i) => {
      try {
        if (liilIl11) $.getAuthorCodeListerr = false;else {
          if (lil1111i) lil1111i = JSON.parse(lil1111i);
          $.getAuthorCodeListerr = true;
        }
      } catch (i1iiIlii) {
        $.logErr(i1iiIlii, iliIII1l);
        lil1111i = null;
      } finally {
        iiIIlIii(lil1111i);
      }
    });
  });
}
function random(IIIIlIli, iI1llIiI) {
  return Math.floor(Math.random() * (iI1llIiI - IIIIlIli)) + IIIIlIli;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const l11i1Ii = Array.from(new Set($.blacklist.split("&")));
  console.log(l11i1Ii.join("&") + "\n");
  let il1iii1I = l11i1Ii,
    iIilI1lI = [],
    llIIl1ii = false;
  for (let i1il111 = 0; i1il111 < cookiesArr.length; i1il111++) {
    let Illlill1 = decodeURIComponent(cookiesArr[i1il111].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[i1il111].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!Illlill1) break;
    let i11liIi = false;
    for (let ilIilIIi of il1iii1I) {
      if (ilIilIIi && ilIilIIi == Illlill1) {
        i11liIi = true;
        break;
      }
    }
    !i11liIi && (llIIl1ii = true, iIilI1lI.splice(i1il111, -1, cookiesArr[i1il111]));
  }
  if (llIIl1ii) cookiesArr = iIilI1lI;
}
function toFirst(liliIIi, Iil1ilI1) {
  Iil1ilI1 != 0 && liliIIi.unshift(liliIIi.splice(Iil1ilI1, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const IillIllI = Array.from(new Set($.whitelist.split("&")));
  console.log(IillIllI.join("&") + "\n");
  let liiIillI = [],
    l1lIllli = IillIllI;
  for (let Ililiii1 in cookiesArr) {
    let llllII11 = decodeURIComponent(cookiesArr[Ililiii1].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[Ililiii1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    l1lIllli.includes(llllII11) && liiIillI.push(cookiesArr[Ililiii1]);
  }
  helpCookiesArr = liiIillI;
  if (l1lIllli.length > 1) {
    for (let Ilili1i1 in l1lIllli) {
      let IliII1li = l1lIllli[l1lIllli.length - 1 - Ilili1i1];
      if (!IliII1li) continue;
      for (let iiIi1i1 in helpCookiesArr) {
        let iII111li = decodeURIComponent(helpCookiesArr[iiIi1i1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iiIi1i1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        IliII1li == iII111li && toFirst(helpCookiesArr, iiIi1i1);
      }
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }