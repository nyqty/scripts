/*
大牌联合0718期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230718aslw/oC20230718aslw?actId=fc216c7fa6464334b54d_230718

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
#大牌联合0718期
1 16 20,21 * * jd_dplh0718.js, tag=大牌联合0718期, enabled=true
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0718期");
const l1lii1 = $.isNode() ? require("./jdCookie.js") : "",
  ii1i1i = $.isNode() ? require("./sendNotify") : "";
let IiIi11 = [],
  ii1i1l = "";
if ($.isNode()) {
  Object.keys(l1lii1).forEach(liiiIl => {
    IiIi11.push(l1lii1[liiiIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IiIi11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Iii1lI($.getdata("CookiesJD") || "[]").map(liIIiI => liIIiI.cookie)].filter(Iii1li => !!Iii1li);
let iillII = "30",
  Illli = "0";
iillII = $.isNode() ? process.env.retrynum ? process.env.retrynum : iillII : $.getdata("retrynum") ? $.getdata("retrynum") : Illli;
Illli = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : Illli : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : Illli;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let i11il = "",
  liIlIl = "",
  I1lI1l = "fc216c7fa6464334b54d_230718";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const i11ii = require("./function/krgetToken"),
  lIiIi = require("./function/krh5st");
let Il1i = "https://jinggengjcq-isv.isvjcloud.com";
liIlIl = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + liIlIl : $.getdata("helpnum") ? $.getdata("helpnum") : "" + liIlIl;
let lIiIl = "",
  iiil1l = "";
$.whitelist = process.env.DPLHTY_whitelist || lIiIl;
$.blacklist = process.env.DPLHTY_blacklist || iiil1l;
Iii1ll();
I1liil();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = liIlIl ? liIlIl : authorCodeList[ilIIll(0, authorCodeList.length)];
  console.log("\n💬 默认抽奖次数：" + Illli + " 💬 重试次数：" + iillII);
  console.log("\n💬 请在有水的情况下运行");
  if (!IiIi11[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = I1lI1l;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let i11Ill = 0; i11Ill < IiIi11.length; i11Ill++) {
    ii1i1l = IiIi11[i11Ill];
    if (ii1i1l) {
      $.UserName = decodeURIComponent(ii1i1l.match(/pt_pin=([^; ]+)(?=;?)/) && ii1i1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i11Ill + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await IIiill();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await Il1l();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let iliiIl = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iliiIl);
    if ($.isNode()) await ii1i1i.sendNotify("" + $.name, "" + iliiIl);
  }
})().catch(liIIl1 => $.logErr(liIIl1)).finally(() => $.done());
async function Il1l() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    i11il = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await i11ii(ii1i1l, Il1i);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await ll11I1("activity_load");
    for (let iIIIi1 = 0; iIIIi1 < iillII; iIIIi1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await ll11I1("activity_load");
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
    await ll11I1("绑定");
    for (let ilIliI = 0; ilIliI < iillII; ilIliI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await ll11I1("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await ll11I1("shopList");
    for (let Ii1lIi = 0; Ii1lIi < iillII; Ii1lIi++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await ll11I1("shopList");
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
        await ll11I1("mission");
        for (let ll1lI1 = 0; ll1lI1 < iillII; ll1lI1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await ll11I1("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await I1liii();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await I1liii(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await ll11I1("activity_load");
          for (let Il1I11 = 0; Il1I11 < iillII; Il1I11++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await ll11I1("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await ll11I1("shopList");
          for (let Ii1Ili = 0; Ii1Ili < iillII; Ii1Ili++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await ll11I1("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await ll11I1("mission");
      for (let ll1Iii = 0; ll1Iii < iillII; ll1Iii++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await ll11I1("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await ll11I1("mission");
      for (let IIlIII = 0; IIlIII < iillII; IIlIII++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await ll11I1("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (Illli + "" !== "0") {
      $.runFalag = true;
      let i1Iii = parseInt($.totalPoint / 200);
      Illli = parseInt(Illli, 10);
      if (i1Iii > Illli) i1Iii = Illli;
      console.log("💖 抽奖次数为:" + i1Iii);
      for (m = 1; i1Iii--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await ll11I1("抽奖");
        for (let IIiI1I = 0; IIiI1I < iillII; IIiI1I++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await ll11I1("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(i1Iii) <= 0) break;
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
  } catch (iliiii) {
    console.log(iliiii);
  }
}
async function ll11I1(IIlIIi) {
  if ($.outFlag) return;
  let li11ll = "https://jinggengjcq-isv.isvjcloud.com",
    i1Il1 = "",
    li1l1 = "POST",
    IIiI1l = "";
  switch (IIlIIi) {
    case "activity_load":
      url = li11ll + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIiI1l = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) IIiI1l = {
        ...IIiI1l,
        "shopId": "" + $.joinVenderId
      };
      i1Il1 = ilIIli("/jdBigAlliance/activity/load", IIiI1l);
      break;
    case "shopList":
      url = li11ll + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIiI1l = {};
      i1Il1 = ilIIli("/jdBigAlliance/shop/shopList", IIiI1l);
      break;
    case "绑定":
      url = li11ll + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIiI1l = {
        "inviterNick": $.inviteNick || ""
      };
      i1Il1 = ilIIli("/jdBigAlliance/customer/inviteRelation", IIiI1l);
      break;
    case "mission":
      url = li11ll + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIiI1l = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) IIiI1l = {
        ...IIiI1l,
        "shopId": $.joinVenderId
      };
      i1Il1 = ilIIli("/jdBigAlliance/mission/completeMission", IIiI1l);
      break;
    case "抽奖":
      url = li11ll + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      IIiI1l = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      i1Il1 = ilIIli("/jdBigAlliance/interactive/drawPost", IIiI1l);
      break;
    default:
      console.log("错误" + IIlIIi);
  }
  let IIiI1i = iiil1i(url, i1Il1, li1l1);
  return new Promise(async ilIlll => {
    $.post(IIiI1i, (li1li, iIIIll, ll1Ii1) => {
      try {
        li1li ? (iIIIll && iIIIll.statusCode && iIIIll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : Illll(IIlIIi, ll1Ii1);
      } catch (i1IiI) {
        console.log(i1IiI, iIIIll);
      } finally {
        ilIlll();
      }
    });
  });
}
async function Illll(iilIi1, I111) {
  let I1I11i = "";
  try {
    $.krFlag = true;
    (iilIi1 != "accessLogWithAD" || iilIi1 != "drawContent") && I111 && (I1I11i = JSON.parse(I111));
  } catch (lIllli) {
    console.log("🤬 " + iilIi1 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let lIllll = "";
    switch (iilIi1) {
      case "抽奖":
        if (typeof I1I11i == "object") {
          if (I1I11i.success && I1I11i.success === true && I1I11i.data) {
            if (I1I11i.data.status && I1I11i.data.status == 200) {
              if (I1I11i.data.data.sendResult) console.log("抽中：" + I1I11i.data.data.awardSetting.awardName);else {
                if (!I1I11i.data.data.result) {
                  console.log("空气");
                } else console.log(I1I11i.data.data);
              }
            } else I1I11i.data.status && I1I11i.data.status == 500 && console.log("" + (I1I11i.data.msg || ""));
          } else I1I11i.message ? console.log("" + (I1I11i.message || "")) : console.log(I111);
        } else console.log(I111);
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
        lIllll = "";
        if (iilIi1 == "followShop") lIllll = "关注";
        if (iilIi1 == "addCart") lIllll = "加购";
        if (typeof I1I11i == "object") {
          if (I1I11i.success && I1I11i.success === true && I1I11i.data) {
            if (I1I11i.data.status && I1I11i.data.status == 200) {
              I1I11i = I1I11i.data;
              if (iilIi1 != "setMixNick" && (I1I11i.msg || I1I11i.data.isOpenCard || I1I11i.data.remark)) console.log("🔊 " + (lIllll && lIllll + ":" || "") + (I1I11i.msg || I1I11i.data.isOpenCard || I1I11i.data.remark || ""));
              if (iilIi1 == "activity_load") {
                if (I1I11i.msg || I1I11i.data.isOpenCard) {
                  if ((I1I11i.msg || I1I11i.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (I1I11i.data) {
                  $.endTime = I1I11i.data.cusActivity.endTime || 0;
                  $.MixNick = I1I11i.data.missionCustomer.buyerNick || "";
                  $.usedChance = I1I11i.data.missionCustomer.usedChance || 0;
                  $.totalPoint = I1I11i.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = I1I11i.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = I1I11i.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (iilIi1 == "shopList") $.openList = I1I11i.data || [];else {
                  if (iilIi1 == "mission") {
                    if (I1I11i.data.remark.indexOf("不是会员") > -1) $.openCard = true;else {
                      $.openCard = false;
                    }
                  } else {
                    if (iilIi1 == "uniteOpenCardOne") $.uniteOpenCar = I1I11i.msg || I1I11i.data.msg || "";else {
                      if (iilIi1 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let IiIili = 0;
                        for (let llIiil in I1I11i.data.list || []) {
                          let IlIi11 = I1I11i.data.list[llIiil];
                          IiIili += Number(IlIi11.awardDes);
                        }
                        if (IiIili > 0) console.log("🔊 共获得" + IiIili + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else iilIi1 == "missionInviteList" && console.log("🔊 邀请人数(" + I1I11i.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (I1I11i.data.msg) {
                I1I11i.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (I1I11i.data.msg || ""));
              } else {
                if (I1I11i.errorMessage) {
                  if (I1I11i.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (I1I11i.errorMessage || ""));
                } else console.log("" + I111);
              }
            }
          } else I1I11i.errorMessage ? console.log("🔊 " + (I1I11i.errorMessage || "")) : console.log("" + I111);
        } else {}
        break;
      default:
        console.log((lIllll || iilIi1) + "-> " + I111);
    }
    if (typeof I1I11i == "object") {
      if (I1I11i.errorMessage) {
        if (I1I11i.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (IlIi1I) {}
}
function iiil1i(i111I, llIiiI, IiIilI = "POST") {
  let iilIl1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": ii1i1l,
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
function ilIIli(l1I1i1, I1IlIi) {
  d = {
    "actId": $.actId,
    ...I1IlIi,
    "method": l1I1i1,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = iIliil(d);
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
function ilIIll(lIlli1, llIii1) {
  return Math.floor(Math.random() * (llIii1 - lIlli1)) + lIlli1;
}
function iIliil(IiIiii) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(IiIiii));
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
async function IIiill() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const III1il = CryptoJS.enc.Utf8.parse(id),
    I1IlI1 = CryptoJS.enc.Base64.stringify(III1il);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": I1IlI1,
      "od": "",
      "ov": "Ctq=",
      "ud": I1IlI1
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function liIIii(IlIi1l) {
  IlIi1l = IlIi1l || 32;
  let IlIi1i = "abcdef0123456789",
    lIllii = IlIi1i.length,
    l1il1 = "";
  for (i = 0; i < IlIi1l; i++) l1il1 += IlIi1i.charAt(Math.floor(Math.random() * lIllii));
  return l1il1;
}
function Iii1lI(Il11i) {
  if (typeof Il11i == "string") try {
    return JSON.parse(Il11i);
  } catch (l1iiil) {
    return console.log(l1iiil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function I1liii() {
  if (!$.joinVenderId) return;
  return new Promise(async Iil1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiiIlI = "";
    if ($.shopactivityId) iiiIlI = ",\"activityId\":" + $.shopactivityId;
    const I1i11 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiiIlI + ",\"channel\":406}",
      Ill1ii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1i11)
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
    const llIiIi = await lIiIi("8adfb", Ill1ii),
      IIil = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + I1i11 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(llIiIi),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": ii1i1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIil, async (lIi1II, iiiIii, IllI1) => {
      try {
        if (lIi1II) iiiIii && typeof iiiIii.statusCode != "undefined" && iiiIii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IllI1 = IllI1 && IllI1.match(/jsonp_.*?\((.*?)\);/) && IllI1.match(/jsonp_.*?\((.*?)\);/)[1] || IllI1;
          let iiiIil = $.toObj(IllI1, IllI1);
          if (iiiIil && typeof iiiIil == "object") {
            if (iiiIil && iiiIil.success === true) {
              console.log(" >> " + iiiIil.message);
              $.errorJoinShop = iiiIil.message;
              if (iiiIil.result && iiiIil.result.giftInfo) {
                for (let lilll of iiiIil.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + lilll.discountString + lilll.prizeName + lilll.secondLineDesc);
                }
              }
            } else {
              if (iiiIil && typeof iiiIil == "object" && iiiIil.message) {
                $.errorJoinShop = iiiIil.message;
                console.log("" + (iiiIil.message || ""));
              } else console.log(IllI1);
            }
          } else console.log(IllI1);
        }
      } catch (Ill1iI) {
        $.logErr(Ill1iI, iiiIii);
      } finally {
        Iil1I();
      }
    });
  });
}
async function liiiIi() {
  return new Promise(async IllIi => {
    const iII11 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iilll1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iII11)
      };
    await $.wait(1000);
    const l1iI11 = await lIiIi("8adfb", iilll1),
      l1I11 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iII11 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1iI11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": ii1i1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1I11, async (i11I1, IlIiI, l1iI1I) => {
      try {
        if (i11I1) {
          if (IlIiI && typeof IlIiI.statusCode != "undefined") {
            IlIiI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          l1iI1I = l1iI1I && l1iI1I.match(/jsonp_.*?\((.*?)\);/) && l1iI1I.match(/jsonp_.*?\((.*?)\);/)[1] || l1iI1I;
          let iillil = $.toObj(l1iI1I, l1iI1I);
          if (iillil && typeof iillil == "object") {
            if (iillil && iillil.success == true) {
              console.log("去加入：" + (iillil.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = iillil.result.interestsRuleList && iillil.result.interestsRuleList[0] && iillil.result.interestsRuleList[0].interestsInfo && iillil.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else console.log(l1iI1I);
        }
      } catch (ilI1iI) {
        $.logErr(ilI1iI, IlIiI);
      } finally {
        IllIi();
      }
    });
  });
}
function l1I11I(l1I1i) {
  return new Promise(IIllII => {
    const iil1I1 = {
      "url": l1I1i + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iil1I1, async (iI11il, iii111, liiI) => {
      try {
        if (iI11il) $.getAuthorCodeListerr = false;else {
          if (liiI) liiI = JSON.parse(liiI);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1Ili1) {
        $.logErr(l1Ili1, iii111);
        liiI = null;
      } finally {
        IIllII(liiI);
      }
    });
  });
}
function ilIIll(iliill, I111ii) {
  return Math.floor(Math.random() * (I111ii - iliill)) + iliill;
}
function I1liil() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lii1 = Array.from(new Set($.blacklist.split("&")));
  console.log(lii1.join("&") + "\n");
  let iIii1l = lii1,
    iIliIi = [],
    IIil1l = false;
  for (let iI11l1 = 0; iI11l1 < IiIi11.length; iI11l1++) {
    let IlIii = decodeURIComponent(IiIi11[iI11l1].match(/pt_pin=([^; ]+)(?=;?)/) && IiIi11[iI11l1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IlIii) break;
    let iI11lI = false;
    for (let II1i11 of iIii1l) {
      if (II1i11 && II1i11 == IlIii) {
        iI11lI = true;
        break;
      }
    }
    !iI11lI && (IIil1l = true, iIliIi.splice(iI11l1, -1, IiIi11[iI11l1]));
  }
  if (IIil1l) IiIi11 = iIliIi;
}
function IliIi1(I111l1, iIliII) {
  iIliII != 0 && I111l1.unshift(I111l1.splice(iIliII, 1)[0]);
}
function Iii1ll() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(IiIi11, IiIi11));
    return;
  }
  console.log("当前已设置白名单：");
  const I1liI1 = Array.from(new Set($.whitelist.split("&")));
  console.log(I1liI1.join("&") + "\n");
  let I1ii11 = [],
    IlIil = I1liI1;
  for (let IlIll in IiIi11) {
    let i11l11 = decodeURIComponent(IiIi11[IlIll].match(/pt_pin=([^; ]+)(?=;?)/) && IiIi11[IlIll].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    IlIil.includes(i11l11) && I1ii11.push(IiIi11[IlIll]);
  }
  helpCookiesArr = I1ii11;
  if (IlIil.length > 1) for (let IlIli in IlIil) {
    let liIIIl = IlIil[IlIil.length - 1 - IlIli];
    if (!liIIIl) continue;
    for (let iliil1 in helpCookiesArr) {
      let i1i1ll = decodeURIComponent(helpCookiesArr[iliil1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iliil1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      liIIIl == i1i1ll && IliIi1(helpCookiesArr, iliil1);
    }
  }
}