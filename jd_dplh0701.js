/*
大牌联合0701期

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
#大牌联合0701期
1 18 2,4 * * jd_dplh0701.js, tag=大牌联合0701期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0701期");
const liiiIl = $.isNode() ? require("./jdCookie.js") : "",
  liIIiI = $.isNode() ? require("./sendNotify") : "";
let Iii1li = [],
  iIl1l = "";
if ($.isNode()) {
  Object.keys(liiiIl).forEach(ii1I => {
    Iii1li.push(liiiIl[ii1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Iii1li = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...liIIl1($.getdata("CookiesJD") || "[]").map(i11Ili => i11Ili.cookie)].filter(liII => !!liII);
let iIl1i = "30",
  i11i1 = "0";
iIl1i = $.isNode() ? process.env.retrynum ? process.env.retrynum : iIl1i : $.getdata("retrynum") ? $.getdata("retrynum") : i11i1;
i11i1 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : i11i1 : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : i11i1;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let liIIi1 = "",
  iIliii = "",
  l1I11i = "2027cb9ae90440a2b3dca4e_230701";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const iIlii1 = require("./function/krgetToken"),
  IIiil1 = require("./function/krh5st");
let l1IlII = "https://jinggengjcq-isv.isvjcloud.com";
iIliii = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + iIliii : $.getdata("helpnum") ? $.getdata("helpnum") : "" + iIliii;
let ii1i = "",
  ilIIl1 = "";
$.whitelist = process.env.DPLHTY_whitelist || ii1i;
$.blacklist = process.env.DPLHTY_blacklist || ilIIl1;
iIl11();
ilIIlI();
!(async () => {
    authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = iIliii ? iIliii : authorCodeList[iliiIi(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + l1I11i);
  console.log("\n💬 默认抽奖次数：" + i11i1 + " 💬 重试次数：" + iIl1i);
  console.log("\n💬 请在有水的情况下运行");
  if (!Iii1li[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = l1I11i;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let llli1I = 0; llli1I < Iii1li.length; llli1I++) {
    iIl1l = Iii1li[llli1I];
    if (iIl1l) {
      $.UserName = decodeURIComponent(iIl1l.match(/pt_pin=([^; ]+)(?=;?)/) && iIl1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = llli1I + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await iliiIl();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await ii1l();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let iIIIi = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iIIIi);
    if ($.isNode()) await liIIiI.sendNotify("" + $.name, "" + iIIIi);
  }
})().catch(Il1iII => $.logErr(Il1iII)).finally(() => $.done());
async function ii1l() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    liIIi1 = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await iIlii1(iIl1l, l1IlII);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await iIl1I("activity_load");
    for (let li1il = 0; li1il < iIl1i; li1il++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIl1I("activity_load");
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
    await iIl1I("绑定");
    for (let l1I1li = 0; l1I1li < iIl1i; l1I1li++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIl1I("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await iIl1I("shopList");
    for (let lI1iI1 = 0; lI1iI1 < iIl1i; lI1iI1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIl1I("shopList");
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
        await iIl1I("mission");
        for (let iIIIi1 = 0; iIIIi1 < iIl1i; iIIIi1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iIl1I("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await iIliiI();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await iIliiI(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIl1I("activity_load");
          for (let ilIliI = 0; ilIliI < iIl1i; ilIliI++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iIl1I("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIl1I("shopList");
          for (let Ii1lIi = 0; Ii1lIi < iIl1i; Ii1lIi++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iIl1I("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await iIl1I("mission");
      for (let iIIIiI = 0; iIIIiI < iIl1i; iIIIiI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIl1I("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await iIl1I("mission");
      for (let I1IIi1 = 0; I1IIi1 < iIl1i; I1IIi1++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIl1I("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (i11i1 + "" !== "0") {
      $.runFalag = true;
      let ll1lI1 = parseInt($.totalPoint / 200);
      i11i1 = parseInt(i11i1, 10);
      if (ll1lI1 > i11i1) ll1lI1 = i11i1;
      console.log("💖 抽奖次数为:" + ll1lI1);
      for (m = 1; ll1lI1--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIl1I("抽奖");
        for (let liii11 = 0; liii11 < iIl1i; liii11++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iIl1I("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(ll1lI1) <= 0) break;
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
  } catch (lIiIii) {
    console.log(lIiIii);
  }
}
async function iIl1I(i1Ill) {
  if ($.outFlag) return;
  let lIl1II = "https://jinggengjcq-isv.isvjcloud.com",
    Ii1Ili = "",
    IIiI11 = "POST",
    Ii1Ill = "";
  switch (i1Ill) {
    case "activity_load":
      url = lIl1II + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ill = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) Ii1Ill = {
        ...Ii1Ill,
        "shopId": "" + $.joinVenderId
      };
      Ii1Ili = IliIil("/jdBigAlliance/activity/load", Ii1Ill);
      break;
    case "shopList":
      url = lIl1II + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ill = {};
      Ii1Ili = IliIil("/jdBigAlliance/shop/shopList", Ii1Ill);
      break;
    case "绑定":
      url = lIl1II + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ill = {
        "inviterNick": $.inviteNick || ""
      };
      Ii1Ili = IliIil("/jdBigAlliance/customer/inviteRelation", Ii1Ill);
      break;
    case "mission":
      url = lIl1II + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ill = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) Ii1Ill = {
        ...Ii1Ill,
        "shopId": $.joinVenderId
      };
      Ii1Ili = IliIil("/jdBigAlliance/mission/completeMission", Ii1Ill);
      break;
    case "抽奖":
      url = lIl1II + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1Ill = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      Ii1Ili = IliIil("/jdBigAlliance/interactive/drawPost", Ii1Ill);
      break;
    default:
      console.log("错误" + i1Ill);
  }
  let ll1Iii = liIIlI(url, Ii1Ili, IIiI11);
  return new Promise(async Il1I1I => {
    $.post(ll1Iii, (IIiI1i, ilIllI, I1IIli) => {
      try {
        if (IIiI1i) {
          ilIllI && ilIllI.statusCode && ilIllI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else {
          liIi(i1Ill, I1IIli);
        }
      } catch (Il1I1l) {
        console.log(Il1I1l, ilIllI);
      } finally {
        Il1I1I();
      }
    });
  });
}
async function liIi(iIIIli, I1IIll) {
  let lIilII = "";
  try {
    $.krFlag = true;
    if (iIIIli != "accessLogWithAD" || iIIIli != "drawContent") {
      I1IIll && (lIilII = JSON.parse(I1IIll));
    }
  } catch (lIllli) {
    console.log("🤬 " + iIIIli + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let I11I = "";
    switch (iIIIli) {
      case "抽奖":
        if (typeof lIilII == "object") {
          if (lIilII.success && lIilII.success === true && lIilII.data) {
            if (lIilII.data.status && lIilII.data.status == 200) {
              if (lIilII.data.data.sendResult) console.log("抽中：" + lIilII.data.data.awardSetting.awardName);else !lIilII.data.data.result ? console.log("空气") : console.log(lIilII.data.data);
            } else lIilII.data.status && lIilII.data.status == 500 && console.log("" + (lIilII.data.msg || ""));
          } else {
            if (lIilII.message) console.log("" + (lIilII.message || ""));else {
              console.log(I1IIll);
            }
          }
        } else console.log(I1IIll);
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
        I11I = "";
        if (iIIIli == "followShop") I11I = "关注";
        if (iIIIli == "addCart") I11I = "加购";
        if (typeof lIilII == "object") {
          if (lIilII.success && lIilII.success === true && lIilII.data) {
            if (lIilII.data.status && lIilII.data.status == 200) {
              lIilII = lIilII.data;
              if (iIIIli != "setMixNick" && (lIilII.msg || lIilII.data.isOpenCard || lIilII.data.remark)) console.log("🔊 " + (I11I && I11I + ":" || "") + (lIilII.msg || lIilII.data.isOpenCard || lIilII.data.remark || ""));
              if (iIIIli == "activity_load") {
                if (lIilII.msg || lIilII.data.isOpenCard) {
                  if ((lIilII.msg || lIilII.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (lIilII.data) {
                  $.endTime = lIilII.data.cusActivity.endTime || 0;
                  $.MixNick = lIilII.data.missionCustomer.buyerNick || "";
                  $.usedChance = lIilII.data.missionCustomer.usedChance || 0;
                  $.totalPoint = lIilII.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = lIilII.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = lIilII.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (iIIIli == "shopList") {
                  $.openList = lIilII.data || [];
                } else {
                  if (iIIIli == "mission") {
                    if (lIilII.data.remark.indexOf("不是会员") > -1) {
                      $.openCard = true;
                    } else $.openCard = false;
                  } else {
                    if (iIIIli == "uniteOpenCardOne") $.uniteOpenCar = lIilII.msg || lIilII.data.msg || "";else {
                      if (iIIIli == "myAward") {
                        console.log("🔊 我的奖品：");
                        let llIiil = 0;
                        for (let IlIi11 in lIilII.data.list || []) {
                          let III1iI = lIilII.data.list[IlIi11];
                          llIiil += Number(III1iI.awardDes);
                        }
                        if (llIiil > 0) console.log("🔊 共获得" + llIiil + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else iIIIli == "missionInviteList" && console.log("🔊 邀请人数(" + lIilII.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (lIilII.data.msg) {
                lIilII.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (lIilII.data.msg || ""));
              } else {
                if (lIilII.errorMessage) {
                  if (lIilII.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (lIilII.errorMessage || ""));
                } else console.log("" + I1IIll);
              }
            }
          } else lIilII.errorMessage ? console.log("🔊 " + (lIilII.errorMessage || "")) : console.log("" + I1IIll);
        } else {}
        break;
      default:
        console.log((I11I || iIIIli) + "-> " + I1IIll);
    }
    if (typeof lIilII == "object") {
      if (lIilII.errorMessage) {
        if (lIilII.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (llIiiI) {}
}
function liIIlI(IiIilI, lIiIl1, iilIl1 = "POST") {
  let III1i1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iIl1l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IiIilI.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (III1i1.Origin = "https://jinggengjcq-isv.isvjcloud.com", III1i1["Content-Type"] = "application/json; charset=utf-8", delete III1i1.Cookie), {
    "url": IiIilI,
    "method": iilIl1,
    "headers": III1i1,
    "body": lIiIl1,
    "timeout": 30 * 1000
  };
}
function IliIil(l1ll1i, IiIil1) {
  d = {
    "actId": $.actId,
    ...IiIil1,
    "method": l1ll1i,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = i11Ill(d);
  const lIiIlI = {
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
        ...IiIil1,
        "method": l1ll1i,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return l1ll1i.indexOf("missionInviteList") > -1 && delete lIiIlI.params.admJson.actId, $.toStr(lIiIlI, lIiIlI);
}
function iliiIi(III1l1, Il111) {
  return Math.floor(Math.random() * (Il111 - III1l1)) + III1l1;
}
function i11Ill(iIIlI1) {
  return AppSecret = "75d56f8a5d9a4e91b77844d0ac2fe2a3", key = "5a1f6d37e454", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(iIIlI1)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
    "sign": sign,
    "timeStamp": time2
  };
}
async function iliiIl() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const l1I1ii = CryptoJS.enc.Utf8.parse(id),
    III1il = CryptoJS.enc.Base64.stringify(l1I1ii);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": III1il,
      "od": "",
      "ov": "Ctq=",
      "ud": III1il
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function IliIii(I1IlI1) {
  I1IlI1 = I1IlI1 || 32;
  let iIIlII = "abcdef0123456789",
    IlIi1l = iIIlII.length,
    IiIiiI = "";
  for (i = 0; i < I1IlI1; i++) IiIiiI += iIIlII.charAt(Math.floor(Math.random() * IlIi1l));
  return IiIiiI;
}
function liIIl1(Ill1i1) {
  if (typeof Ill1i1 == "string") try {
    return JSON.parse(Ill1i1);
  } catch (iiI1) {
    return console.log(iiI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function iIliiI() {
  if (!$.joinVenderId) return;
  return new Promise(async I1i11 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Iil11 = "";
    if ($.shopactivityId) Iil11 = ",\"activityId\":" + $.shopactivityId;
    const Ill1iI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Iil11 + ",\"channel\":406}",
      i1Ii1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ill1iI)
      };
    for (var IllII = "", Ill1il = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IIlI = 0; IIlI < 16; IIlI++) {
      var I1i1l = Math.round(Math.random() * (Ill1il.length - 1));
      IllII += Ill1il.substring(I1i1l, I1i1l + 1);
    }
    uuid = Buffer.from(IllII, "utf8").toString("base64");
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
    const IIll = await IIiil1("8adfb", i1Ii1l),
      i1Ii1i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Ill1iI + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIl1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1Ii1i, async (iiiIll, iilliI, iII1i) => {
      try {
        if (iiiIll) iilliI && typeof iilliI.statusCode != "undefined" && iilliI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iII1i = iII1i && iII1i.match(/jsonp_.*?\((.*?)\);/) && iII1i.match(/jsonp_.*?\((.*?)\);/)[1] || iII1i;
          let i11Ii = $.toObj(iII1i, iII1i);
          if (i11Ii && typeof i11Ii == "object") {
            if (i11Ii && i11Ii.success === true) {
              console.log(" >> " + i11Ii.message);
              $.errorJoinShop = i11Ii.message;
              if (i11Ii.result && i11Ii.result.giftInfo) {
                for (let iilli1 of i11Ii.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + iilli1.discountString + iilli1.prizeName + iilli1.secondLineDesc);
                }
              }
            } else i11Ii && typeof i11Ii == "object" && i11Ii.message ? ($.errorJoinShop = i11Ii.message, console.log("" + (i11Ii.message || ""))) : console.log(iII1i);
          } else console.log(iII1i);
        }
      } catch (Iil1i) {
        $.logErr(Iil1i, iilliI);
      } finally {
        I1i11();
      }
    });
  });
}
async function IIiilI() {
  return new Promise(async i1i1iI => {
    const iillii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      ilI1iI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iillii)
      };
    await $.wait(1000);
    const l1I1i = await IIiil1("8adfb", ilI1iI),
      l1I1l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iillii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1I1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIl1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1I1l, async (l1Ili1, iliili, iliill) => {
      try {
        if (l1Ili1) iliili && typeof iliili.statusCode != "undefined" && iliili.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iliill = iliill && iliill.match(/jsonp_.*?\((.*?)\);/) && iliill.match(/jsonp_.*?\((.*?)\);/)[1] || iliill;
          let I1ii1I = $.toObj(iliill, iliill);
          I1ii1I && typeof I1ii1I == "object" ? I1ii1I && I1ii1I.success == true && (console.log("去加入：" + (I1ii1I.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = I1ii1I.result.interestsRuleList && I1ii1I.result.interestsRuleList[0] && I1ii1I.result.interestsRuleList[0].interestsInfo && I1ii1I.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iliill);
        }
      } catch (Ililli) {
        $.logErr(Ililli, iliili);
      } finally {
        i1i1iI();
      }
    });
  });
}
function I1lii1(lii1) {
  return new Promise(II1i1I => {
    const iIii11 = {
      "url": lii1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iIii11, async (IlIii, iI11lI, II1i11) => {
      try {
        if (IlIii) $.getAuthorCodeListerr = false;else {
          if (II1i11) II1i11 = JSON.parse(II1i11);
          $.getAuthorCodeListerr = true;
        }
      } catch (I1ii11) {
        $.logErr(I1ii11, iI11lI);
        II1i11 = null;
      } finally {
        II1i1I(II1i11);
      }
    });
  });
}
function iliiIi(i1i1li, iIill) {
  return Math.floor(Math.random() * (iIill - i1i1li)) + i1i1li;
}
function ilIIlI() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iIili = Array.from(new Set($.blacklist.split("&")));
  console.log(iIili.join("&") + "\n");
  let i11l1I = iIili,
    iil1Il = [],
    IlIll = false;
  for (let l1IliI = 0; l1IliI < Iii1li.length; l1IliI++) {
    let liIIIi = decodeURIComponent(Iii1li[l1IliI].match(/pt_pin=([^; ]+)(?=;?)/) && Iii1li[l1IliI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!liIIIi) break;
    let iIilI = false;
    for (let liii of i11l1I) {
      if (liii && liii == liIIIi) {
        iIilI = true;
        break;
      }
    }
    !iIilI && (IlIll = true, iil1Il.splice(l1IliI, -1, Iii1li[l1IliI]));
  }
  if (IlIll) Iii1li = iil1Il;
}
function liiiI1(IlIlI, IIil1I) {
  IIil1I != 0 && IlIlI.unshift(IlIlI.splice(IIil1I, 1)[0]);
}
function iIl11() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(Iii1li, Iii1li));
    return;
  }
  console.log("当前已设置白名单：");
  const l1IllI = Array.from(new Set($.whitelist.split("&")));
  console.log(l1IllI.join("&") + "\n");
  let lIi1Ii = [],
    iiilII = l1IllI;
  for (let Il1iil in Iii1li) {
    let IIiIIi = decodeURIComponent(Iii1li[Il1iil].match(/pt_pin=([^; ]+)(?=;?)/) && Iii1li[Il1iil].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iiilII.includes(IIiIIi) && lIi1Ii.push(Iii1li[Il1iil]);
  }
  helpCookiesArr = lIi1Ii;
  if (iiilII.length > 1) for (let ll111i in iiilII) {
    let iiilI1 = iiilII[iiilII.length - 1 - ll111i];
    if (!iiilI1) continue;
    for (let ll111l in helpCookiesArr) {
      let iliI1l = decodeURIComponent(helpCookiesArr[ll111l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[ll111l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      if (iiilI1 == iliI1l) {
        liiiI1(helpCookiesArr, ll111l);
      }
    }
  }
}