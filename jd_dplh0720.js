/*
大牌联合0720期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230720dda/oC20230720dda?actId=728a96825e2b4154_230720

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
#大牌联合0720期
1 18 20,21 * * jd_dplh0720.js, tag=大牌联合0720期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0720期");
const ii1l = $.isNode() ? require("./jdCookie.js") : "",
  iIl1I = $.isNode() ? require("./sendNotify") : "";
let liIi = [],
  liIIlI = "";
if ($.isNode()) {
  Object.keys(ii1l).forEach(illii1 => {
    liIi.push(ii1l[illii1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else liIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIiili($.getdata("CookiesJD") || "[]").map(Iii1i1 => Iii1i1.cookie)].filter(IIIlll => !!IIIlll);
let IliIil = "30",
  iliiIi = "0";
IliIil = $.isNode() ? process.env.retrynum ? process.env.retrynum : IliIil : $.getdata("retrynum") ? $.getdata("retrynum") : iliiIi;
iliiIi = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : iliiIi : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : iliiIi;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let i11Ill = "",
  liIIl1 = "",
  iIliiI = "728a96825e2b4154_230720";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const IIiilI = require("./function/krgetToken"),
  I1lii1 = require("./function/krh5st");
let ilIIlI = "https://jinggengjcq-isv.isvjcloud.com";
liIIl1 = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + liIIl1 : $.getdata("helpnum") ? $.getdata("helpnum") : "" + liIIl1;
let liiiI1 = "",
  iIl11 = "";
$.whitelist = process.env.DPLHTY_whitelist || liiiI1;
$.blacklist = process.env.DPLHTY_blacklist || iIl11;
IIIlli();
Ii1I1();
!(async () => {
    authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = liIIl1 ? liIIl1 : authorCodeList[liIIil(0, authorCodeList.length)];
  console.log("\n💬 默认抽奖次数：" + iliiIi + " 💬 重试次数：" + IliIil);
  console.log("\n💬 请在有水的情况下运行");
  if (!liIi[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = iIliiI;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let Ili11i = 0; Ili11i < liIi.length; Ili11i++) {
    liIIlI = liIi[Ili11i];
    if (liIIlI) {
      $.UserName = decodeURIComponent(liIIlI.match(/pt_pin=([^; ]+)(?=;?)/) && liIIlI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Ili11i + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await IliIiI();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await ii1I();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let Il1iI1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + Il1iI1);
    if ($.isNode()) await iIl1I.sendNotify("" + $.name, "" + Il1iI1);
  }
})().catch(IIIllI => $.logErr(IIIllI)).finally(() => $.done());
async function ii1I() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    i11Ill = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await IIiilI(liIIlI, ilIIlI);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await i11Ili("activity_load");
    for (let i1Il1 = 0; i1Il1 < IliIil; i1Il1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await i11Ili("activity_load");
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
    await i11Ili("绑定");
    for (let li1l1 = 0; li1l1 < IliIil; li1l1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await i11Ili("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await i11Ili("shopList");
    for (let IIiI1l = 0; IIiI1l < IliIil; IIiI1l++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await i11Ili("shopList");
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
        await i11Ili("mission");
        for (let ilIllI = 0; ilIllI < IliIil; ilIllI++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await i11Ili("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await IIiiiI();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await IIiiiI(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await i11Ili("activity_load");
          for (let Il1I1i = 0; Il1I1i < IliIil; Il1I1i++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await i11Ili("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await i11Ili("shopList");
          for (let lIilI1 = 0; lIilI1 < IliIil; lIilI1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await i11Ili("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await i11Ili("mission");
      for (let Ii1Il1 = 0; Ii1Il1 < IliIil; Ii1Il1++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await i11Ili("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await i11Ili("mission");
      for (let i1Ii1 = 0; i1Ii1 < IliIil; i1Ii1++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await i11Ili("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (iliiIi + "" !== "0") {
      $.runFalag = true;
      let I1IIlI = parseInt($.totalPoint / 200);
      iliiIi = parseInt(iliiIi, 10);
      if (I1IIlI > iliiIi) I1IIlI = iliiIi;
      console.log("💖 抽奖次数为:" + I1IIlI);
      for (m = 1; I1IIlI--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await i11Ili("抽奖");
        for (let ilIlll = 0; ilIlll < IliIil; ilIlll++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await i11Ili("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(I1IIlI) <= 0) break;
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
  } catch (li1ll) {
    console.log(li1ll);
  }
}
async function i11Ili(lIllil) {
  if ($.outFlag) return;
  let I111 = "https://jinggengjcq-isv.isvjcloud.com",
    I1I11l = "",
    I1I11i = "POST",
    l1iI1l = "";
  switch (lIllil) {
    case "activity_load":
      url = I111 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iI1l = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) l1iI1l = {
        ...l1iI1l,
        "shopId": "" + $.joinVenderId
      };
      I1I11l = ii11("/jdBigAlliance/activity/load", l1iI1l);
      break;
    case "shopList":
      url = I111 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iI1l = {};
      I1I11l = ii11("/jdBigAlliance/shop/shopList", l1iI1l);
      break;
    case "绑定":
      url = I111 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iI1l = {
        "inviterNick": $.inviteNick || ""
      };
      I1I11l = ii11("/jdBigAlliance/customer/inviteRelation", l1iI1l);
      break;
    case "mission":
      url = I111 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iI1l = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) l1iI1l = {
        ...l1iI1l,
        "shopId": $.joinVenderId
      };
      I1I11l = ii11("/jdBigAlliance/mission/completeMission", l1iI1l);
      break;
    case "抽奖":
      url = I111 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iI1l = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      I1I11l = ii11("/jdBigAlliance/interactive/drawPost", l1iI1l);
      break;
    default:
      console.log("错误" + lIllil);
  }
  let III1ll = l1IlI1(url, I1I11l, I1I11i);
  return new Promise(async I1I11I => {
    $.post(III1ll, (ll1IlI, I11l, Ili1l1) => {
      try {
        ll1IlI ? (I11l && I11l.statusCode && I11l.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : liII(lIllil, Ili1l1);
      } catch (illI1i) {
        console.log(illI1i, I11l);
      } finally {
        I1I11I();
      }
    });
  });
}
async function liII(i1IiII, illI1l) {
  let i1lI1 = "";
  try {
    $.krFlag = true;
    (i1IiII != "accessLogWithAD" || i1IiII != "drawContent") && illI1l && (i1lI1 = JSON.parse(illI1l));
  } catch (Il111) {
    console.log("🤬 " + i1IiII + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let lIiIll = "";
    switch (i1IiII) {
      case "抽奖":
        if (typeof i1lI1 == "object") {
          if (i1lI1.success && i1lI1.success === true && i1lI1.data) {
            if (i1lI1.data.status && i1lI1.data.status == 200) {
              if (i1lI1.data.data.sendResult) console.log("抽中：" + i1lI1.data.data.awardSetting.awardName);else !i1lI1.data.data.result ? console.log("空气") : console.log(i1lI1.data.data);
            } else i1lI1.data.status && i1lI1.data.status == 500 && console.log("" + (i1lI1.data.msg || ""));
          } else i1lI1.message ? console.log("" + (i1lI1.message || "")) : console.log(illI1l);
        } else console.log(illI1l);
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
        lIiIll = "";
        if (i1IiII == "followShop") lIiIll = "关注";
        if (i1IiII == "addCart") lIiIll = "加购";
        if (typeof i1lI1 == "object") {
          if (i1lI1.success && i1lI1.success === true && i1lI1.data) {
            if (i1lI1.data.status && i1lI1.data.status == 200) {
              i1lI1 = i1lI1.data;
              if (i1IiII != "setMixNick" && (i1lI1.msg || i1lI1.data.isOpenCard || i1lI1.data.remark)) console.log("🔊 " + (lIiIll && lIiIll + ":" || "") + (i1lI1.msg || i1lI1.data.isOpenCard || i1lI1.data.remark || ""));
              if (i1IiII == "activity_load") {
                if (i1lI1.msg || i1lI1.data.isOpenCard) {
                  if ((i1lI1.msg || i1lI1.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                i1lI1.data && ($.endTime = i1lI1.data.cusActivity.endTime || 0, $.MixNick = i1lI1.data.missionCustomer.buyerNick || "", $.usedChance = i1lI1.data.missionCustomer.usedChance || 0, $.totalPoint = i1lI1.data.missionCustomer.totalPoint || 0, $.hasCollectShop = i1lI1.data.missionCustomer.hasCollectShop || 0, $.hasAddCart = i1lI1.data.missionCustomer.hasAddCart || 0);
              } else {
                if (i1IiII == "shopList") $.openList = i1lI1.data || [];else {
                  if (i1IiII == "mission") {
                    if (i1lI1.data.remark.indexOf("不是会员") > -1) $.openCard = true;else {
                      $.openCard = false;
                    }
                  } else {
                    if (i1IiII == "uniteOpenCardOne") $.uniteOpenCar = i1lI1.msg || i1lI1.data.msg || "";else {
                      if (i1IiII == "myAward") {
                        console.log("🔊 我的奖品：");
                        let l1I1ii = 0;
                        for (let III1il in i1lI1.data.list || []) {
                          let I1IlI1 = i1lI1.data.list[III1il];
                          l1I1ii += Number(I1IlI1.awardDes);
                        }
                        if (l1I1ii > 0) console.log("🔊 共获得" + l1I1ii + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else {
                        if (i1IiII == "missionInviteList") {
                          console.log("🔊 邀请人数(" + i1lI1.data.invitedLogList.total + ")");
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (i1lI1.data.msg) {
                i1lI1.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (i1lI1.data.msg || ""));
              } else {
                if (i1lI1.errorMessage) {
                  if (i1lI1.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (i1lI1.errorMessage || ""));
                } else console.log("" + illI1l);
              }
            }
          } else i1lI1.errorMessage ? console.log("🔊 " + (i1lI1.errorMessage || "")) : console.log("" + illI1l);
        } else {}
        break;
      default:
        console.log((lIiIll || i1IiII) + "-> " + illI1l);
    }
    if (typeof i1lI1 == "object") {
      if (i1lI1.errorMessage) {
        if (i1lI1.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (lIllii) {}
}
function l1IlI1(l1il1, IIiI, l1iil1 = "POST") {
  let Ill1i1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": liIIlI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return l1il1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (Ill1i1.Origin = "https://jinggengjcq-isv.isvjcloud.com", Ill1i1["Content-Type"] = "application/json; charset=utf-8", delete Ill1i1.Cookie), {
    "url": l1il1,
    "method": l1iil1,
    "headers": Ill1i1,
    "body": IIiI,
    "timeout": 30 * 1000
  };
}
function ii11(Il11l, l1iiil) {
  d = {
    "actId": $.actId,
    ...l1iiil,
    "method": Il11l,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = liI1(d);
  const IIi1 = {
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
        ...l1iiil,
        "method": Il11l,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  if (Il11l.indexOf("missionInviteList") > -1) {
    delete IIi1.params.admJson.actId;
  }
  return $.toStr(IIi1, IIi1);
}
function liIIil(IiIIl, IiIIi) {
  return Math.floor(Math.random() * (IiIIi - IiIIl)) + IiIIl;
}
function liI1(i1Ii11) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(i1Ii11));
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
async function IliIiI() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const illIIl = CryptoJS.enc.Utf8.parse(id),
    iiiIlI = CryptoJS.enc.Base64.stringify(illIIl);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": iiiIlI,
      "od": "",
      "ov": "Ctq=",
      "ud": iiiIlI
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function liiiII(IllII) {
  IllII = IllII || 32;
  let IIlI = "abcdef0123456789",
    I1i1l = IIlI.length,
    llIiIi = "";
  for (i = 0; i < IllII; i++) llIiIi += IIlI.charAt(Math.floor(Math.random() * I1i1l));
  return llIiIi;
}
function IIiili(iiiIii) {
  if (typeof iiiIii == "string") {
    try {
      return JSON.parse(iiiIii);
    } catch (iiiIll) {
      return console.log(iiiIll), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function IIiiiI() {
  if (!$.joinVenderId) return;
  return new Promise(async i1i1iI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iillii = "";
    if ($.shopactivityId) iillii = ",\"activityId\":" + $.shopactivityId;
    const ilI1iI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iillii + ",\"channel\":406}",
      l1I1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ilI1iI)
      };
    for (var l1I1l = "", i11II = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IlIi1 = 0; IlIi1 < 16; IlIi1++) {
      var i1i1il = Math.round(Math.random() * (i11II.length - 1));
      l1I1l += i11II.substring(i1i1il, i1i1il + 1);
    }
    uuid = Buffer.from(l1I1l, "utf8").toString("base64");
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
    const i1i1ii = await I1lii1("8adfb", l1I1i),
      Il1ill = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + ilI1iI + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1i1ii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": liIIlI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Il1ill, async (IIil1l, i1i1l1, iIii1i) => {
      try {
        if (IIil1l) i1i1l1 && typeof i1i1l1.statusCode != "undefined" && i1i1l1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iIii1i = iIii1i && iIii1i.match(/jsonp_.*?\((.*?)\);/) && iIii1i.match(/jsonp_.*?\((.*?)\);/)[1] || iIii1i;
          let IIllIl = $.toObj(iIii1i, iIii1i);
          if (IIllIl && typeof IIllIl == "object") {
            if (IIllIl && IIllIl.success === true) {
              console.log(" >> " + IIllIl.message);
              $.errorJoinShop = IIllIl.message;
              if (IIllIl.result && IIllIl.result.giftInfo) {
                for (let iI11l1 of IIllIl.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + iI11l1.discountString + iI11l1.prizeName + iI11l1.secondLineDesc);
                }
              }
            } else IIllIl && typeof IIllIl == "object" && IIllIl.message ? ($.errorJoinShop = IIllIl.message, console.log("" + (IIllIl.message || ""))) : console.log(iIii1i);
          } else console.log(iIii1i);
        }
      } catch (I111l1) {
        $.logErr(I111l1, i1i1l1);
      } finally {
        i1i1iI();
      }
    });
  });
}
async function lIi1l1() {
  return new Promise(async iil1Il => {
    const liil = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      i11l11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liil)
      };
    await $.wait(1000);
    const IlIli = await I1lii1("8adfb", i11l11),
      liIIIl = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + liil + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlIli),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": liIIlI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liIIIl, async (iliil1, i1i1ll, IIllI1) => {
      try {
        if (iliil1) i1i1ll && typeof i1i1ll.statusCode != "undefined" && i1i1ll.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IIllI1 = IIllI1 && IIllI1.match(/jsonp_.*?\((.*?)\);/) && IIllI1.match(/jsonp_.*?\((.*?)\);/)[1] || IIllI1;
          let IIil11 = $.toObj(IIllI1, IIllI1);
          IIil11 && typeof IIil11 == "object" ? IIil11 && IIil11.success == true && (console.log("去加入：" + (IIil11.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = IIil11.result.interestsRuleList && IIil11.result.interestsRuleList[0] && IIil11.result.interestsRuleList[0].interestsInfo && IIil11.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(IIllI1);
        }
      } catch (l1IliI) {
        $.logErr(l1IliI, i1i1ll);
      } finally {
        iil1Il();
      }
    });
  });
}
function i11IlI(iIilI) {
  return new Promise(iIil1 => {
    const l1IllI = {
      "url": iIilI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(l1IllI, async (lIi1Ii, iiilII, IIiIII) => {
      try {
        if (lIi1Ii) $.getAuthorCodeListerr = false;else {
          if (IIiIII) IIiIII = JSON.parse(IIiIII);
          $.getAuthorCodeListerr = true;
        }
      } catch (ii1iI1) {
        $.logErr(ii1iI1, iiilII);
        IIiIII = null;
      } finally {
        iIil1(IIiIII);
      }
    });
  });
}
function liIIil(liIl1I, IIl111) {
  return Math.floor(Math.random() * (IIl111 - liIl1I)) + liIl1I;
}
function Ii1I1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const i11IIl = Array.from(new Set($.blacklist.split("&")));
  console.log(i11IIl.join("&") + "\n");
  let IIl11I = i11IIl,
    i11IIi = [],
    Il1ii1 = false;
  for (let lil1 = 0; lil1 < liIi.length; lil1++) {
    let iliI1l = decodeURIComponent(liIi[lil1].match(/pt_pin=([^; ]+)(?=;?)/) && liIi[lil1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!iliI1l) break;
    let ii1iIi = false;
    for (let iliI1i of IIl11I) {
      if (iliI1i && iliI1i == iliI1l) {
        ii1iIi = true;
        break;
      }
    }
    !ii1iIi && (Il1ii1 = true, i11IIi.splice(lil1, -1, liIi[lil1]));
  }
  if (Il1ii1) liIi = i11IIi;
}
function i11Il1(i11III, ii1iIl) {
  ii1iIl != 0 && i11III.unshift(i11III.splice(ii1iIl, 1)[0]);
}
function IIIlli() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(liIi, liIi));
    return;
  }
  console.log("当前已设置白名单：");
  const Ii111i = Array.from(new Set($.whitelist.split("&")));
  console.log(Ii111i.join("&") + "\n");
  let l1iiiI = [],
    Ii111l = Ii111i;
  for (let lIi1I in liIi) {
    let Ii1111 = decodeURIComponent(liIi[lIi1I].match(/pt_pin=([^; ]+)(?=;?)/) && liIi[lIi1I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    Ii111l.includes(Ii1111) && l1iiiI.push(liIi[lIi1I]);
  }
  helpCookiesArr = l1iiiI;
  if (Ii111l.length > 1) for (let Ill1li in Ii111l) {
    let Ililii = Ii111l[Ii111l.length - 1 - Ill1li];
    if (!Ililii) continue;
    for (let I111ll in helpCookiesArr) {
      let I1liIi = decodeURIComponent(helpCookiesArr[I111ll].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[I111ll].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      Ililii == I1liIi && i11Il1(helpCookiesArr, I111ll);
    }
  }
}