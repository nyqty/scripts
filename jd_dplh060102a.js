/*
大牌联合060102期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023060102aslw/oC2023060102aslw?actId=dae23ad9bff24686_23060102

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
#大牌联合060102期
1 9 * * * jd_dplh060102a.js, tag=大牌联合060102期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合060102期");
const IIIlI1lI = $.isNode() ? require("./jdCookie.js") : "",
  iIiIi1ii = $.isNode() ? require("./sendNotify") : "";
let iiIIi111 = [],
  I11iI1l = "";
if ($.isNode()) {
  Object.keys(IIIlI1lI).forEach(IIIi1i => {
    iiIIi111.push(IIIlI1lI[IIIi1i]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iiIIi111 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1iIIili($.getdata("CookiesJD") || "[]").map(lIlI1iIl => lIlI1iIl.cookie)].filter(Ili1IIII => !!Ili1IIII);
let i1lIiIIi = "30",
  iliiii1l = "0";
i1lIiIIi = $.isNode() ? process.env.retrynum ? process.env.retrynum : i1lIiIIi : $.getdata("retrynum") ? $.getdata("retrynum") : iliiii1l;
iliiii1l = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : iliiii1l : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : iliiii1l;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let i1i11ili = "",
  i1Iiii1 = "",
  llI1IIIl = "dae23ad9bff24686_23060102";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const ill1IIII = require("./function/krgetToken"),
  IiiI1i1I = require("./function/krh5st");
let l1l1IilI = "https://jinggengjcq-isv.isvjcloud.com";
i1Iiii1 = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + i1Iiii1 : $.getdata("helpnum") ? $.getdata("helpnum") : "" + i1Iiii1;
let l11il1I1 = "",
  ilIlilil = "";
$.whitelist = process.env.DPLHTY_whitelist || l11il1I1;
$.blacklist = process.env.DPLHTY_blacklist || ilIlilil;
I1illII1();
ili1l11l();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = i1Iiii1 ? i1Iiii1 : authorCodeList[lIllIlIi(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + llI1IIIl);
  console.log("\n💬 默认抽奖次数：" + iliiii1l + " 💬 重试次数：" + i1lIiIIi);
  console.log("\n💬 请在有水的情况下运行");
  if (!iiIIi111[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = llI1IIIl;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let lli1II = 0; lli1II < iiIIi111.length; lli1II++) {
    I11iI1l = iiIIi111[lli1II];
    if (I11iI1l) {
      $.UserName = decodeURIComponent(I11iI1l.match(/pt_pin=([^; ]+)(?=;?)/) && I11iI1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lli1II + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await lIi11li();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await i1IliilI();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let l1Iliil1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + l1Iliil1);
    if ($.isNode()) await iIiIi1ii.sendNotify("" + $.name, "" + l1Iliil1);
  }
})().catch(l11IIi11 => $.logErr(l11IIi11)).finally(() => $.done());
async function i1IliilI() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    i1i11ili = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await ill1IIII(I11iI1l, l1l1IilI);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await iIIllI1I("activity_load");
    for (let liI1II = 0; liI1II < i1lIiIIi; liI1II++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIIllI1I("activity_load");
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
    await iIIllI1I("绑定");
    for (let l1i1IIli = 0; l1i1IIli < i1lIiIIi; l1i1IIli++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIIllI1I("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await iIIllI1I("shopList");
    for (let liiiIIil = 0; liiiIIil < i1lIiIIi; liiiIIil++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIIllI1I("shopList");
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
        await iIIllI1I("mission");
        for (let Iili1I1 = 0; Iili1I1 < i1lIiIIi; Iili1I1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iIIllI1I("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await IlllllIi();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await IlllllIi(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIIllI1I("activity_load");
          for (let Il1l111 = 0; Il1l111 < i1lIiIIi; Il1l111++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iIIllI1I("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIIllI1I("shopList");
          for (let lilillI1 = 0; lilillI1 < i1lIiIIi; lilillI1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iIIllI1I("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await iIIllI1I("mission");
      for (let ii11llll = 0; ii11llll < i1lIiIIi; ii11llll++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIIllI1I("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await iIIllI1I("mission");
      for (let Iiii11iI = 0; Iiii11iI < i1lIiIIi; Iiii11iI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iIIllI1I("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (iliiii1l + "" !== "0") {
      $.runFalag = true;
      let il11liI = parseInt($.totalPoint / 200);
      iliiii1l = parseInt(iliiii1l, 10);
      if (il11liI > iliiii1l) il11liI = iliiii1l;
      console.log("💖 抽奖次数为:" + il11liI);
      for (m = 1; il11liI--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iIIllI1I("抽奖");
        for (let il1l1iii = 0; il1l1iii < i1lIiIIi; il1l1iii++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iIIllI1I("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(il11liI) <= 0) break;
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
  } catch (I11i11lI) {
    console.log(I11i11lI);
  }
}
async function iIIllI1I(l1l1Ili) {
  if ($.outFlag) return;
  let l1iiiii1 = "https://jinggengjcq-isv.isvjcloud.com",
    l1il1il = "",
    lIlIIilI = "POST",
    Ii1IliI1 = "";
  switch (l1l1Ili) {
    case "activity_load":
      url = l1iiiii1 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1IliI1 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) Ii1IliI1 = {
        ...Ii1IliI1,
        "shopId": "" + $.joinVenderId
      };
      l1il1il = ilIlll("/jdBigAlliance/activity/load", Ii1IliI1);
      break;
    case "shopList":
      url = l1iiiii1 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1IliI1 = {};
      l1il1il = ilIlll("/jdBigAlliance/shop/shopList", Ii1IliI1);
      break;
    case "绑定":
      url = l1iiiii1 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1IliI1 = {
        "inviterNick": $.inviteNick || ""
      };
      l1il1il = ilIlll("/jdBigAlliance/customer/inviteRelation", Ii1IliI1);
      break;
    case "mission":
      url = l1iiiii1 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1IliI1 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) Ii1IliI1 = {
        ...Ii1IliI1,
        "shopId": $.joinVenderId
      };
      l1il1il = ilIlll("/jdBigAlliance/mission/completeMission", Ii1IliI1);
      break;
    case "抽奖":
      url = l1iiiii1 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Ii1IliI1 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      l1il1il = ilIlll("/jdBigAlliance/interactive/drawPost", Ii1IliI1);
      break;
    default:
      console.log("错误" + l1l1Ili);
  }
  let l1lllll1 = I1llilil(url, l1il1il, lIlIIilI);
  return new Promise(async IlI1iIIl => {
    $.post(l1lllll1, (IiI1Il1I, Ii111ii, lIllill) => {
      try {
        IiI1Il1I ? (Ii111ii && Ii111ii.statusCode && Ii111ii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : IlII1II1(l1l1Ili, lIllill);
      } catch (iilIIlIl) {
        console.log(iilIIlIl, Ii111ii);
      } finally {
        IlI1iIIl();
      }
    });
  });
}
async function IlII1II1(IilliIIl, iliiil1I) {
  let I1iliIli = "";
  try {
    $.krFlag = true;
    (IilliIIl != "accessLogWithAD" || IilliIIl != "drawContent") && iliiil1I && (I1iliIli = JSON.parse(iliiil1I));
  } catch (ilIli1li) {
    console.log("🤬 " + IilliIIl + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let II11ilII = "";
    switch (IilliIIl) {
      case "抽奖":
        if (typeof I1iliIli == "object") {
          if (I1iliIli.success && I1iliIli.success === true && I1iliIli.data) {
            if (I1iliIli.data.status && I1iliIli.data.status == 200) {
              if (I1iliIli.data.data.sendResult) console.log("抽中：" + I1iliIli.data.data.awardSetting.awardName);else !I1iliIli.data.data.result ? console.log("空气") : console.log(I1iliIli.data.data);
            } else I1iliIli.data.status && I1iliIli.data.status == 500 && console.log("" + (I1iliIli.data.msg || ""));
          } else I1iliIli.message ? console.log("" + (I1iliIli.message || "")) : console.log(iliiil1I);
        } else {
          console.log(iliiil1I);
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
        II11ilII = "";
        if (IilliIIl == "followShop") II11ilII = "关注";
        if (IilliIIl == "addCart") II11ilII = "加购";
        if (typeof I1iliIli == "object") {
          if (I1iliIli.success && I1iliIli.success === true && I1iliIli.data) {
            if (I1iliIli.data.status && I1iliIli.data.status == 200) {
              I1iliIli = I1iliIli.data;
              if (IilliIIl != "setMixNick" && (I1iliIli.msg || I1iliIli.data.isOpenCard || I1iliIli.data.remark)) console.log("🔊 " + (II11ilII && II11ilII + ":" || "") + (I1iliIli.msg || I1iliIli.data.isOpenCard || I1iliIli.data.remark || ""));
              if (IilliIIl == "activity_load") {
                if (I1iliIli.msg || I1iliIli.data.isOpenCard) {
                  if ((I1iliIli.msg || I1iliIli.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (I1iliIli.data) {
                  $.endTime = I1iliIli.data.cusActivity.endTime || 0;
                  $.MixNick = I1iliIli.data.missionCustomer.buyerNick || "";
                  $.usedChance = I1iliIli.data.missionCustomer.usedChance || 0;
                  $.totalPoint = I1iliIli.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = I1iliIli.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = I1iliIli.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IilliIIl == "shopList") $.openList = I1iliIli.data || [];else {
                  if (IilliIIl == "mission") I1iliIli.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (IilliIIl == "uniteOpenCardOne") $.uniteOpenCar = I1iliIli.msg || I1iliIli.data.msg || "";else {
                      if (IilliIIl == "myAward") {
                        console.log("🔊 我的奖品：");
                        let iII1i1li = 0;
                        for (let ii1ill1 in I1iliIli.data.list || []) {
                          let i1iIlII1 = I1iliIli.data.list[ii1ill1];
                          iII1i1li += Number(i1iIlII1.awardDes);
                        }
                        if (iII1i1li > 0) console.log("🔊 共获得" + iII1i1li + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IilliIIl == "missionInviteList" && console.log("🔊 邀请人数(" + I1iliIli.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (I1iliIli.data.msg) {
                I1iliIli.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (I1iliIli.data.msg || ""));
              } else {
                if (I1iliIli.errorMessage) {
                  if (I1iliIli.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (I1iliIli.errorMessage || ""));
                } else {
                  console.log("" + iliiil1I);
                }
              }
            }
          } else I1iliIli.errorMessage ? console.log("🔊 " + (I1iliIli.errorMessage || "")) : console.log("" + iliiil1I);
        } else {}
        break;
      default:
        console.log((II11ilII || IilliIIl) + "-> " + iliiil1I);
    }
    if (typeof I1iliIli == "object") {
      if (I1iliIli.errorMessage) {
        if (I1iliIli.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (l1IIlIiI) {}
}
function I1llilil(ilI1lIll, II1illII, i1lIlllI = "POST") {
  let Ii1I1Ili = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": I11iI1l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (ilI1lIll.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1) {
    Ii1I1Ili.Origin = "https://jinggengjcq-isv.isvjcloud.com";
    Ii1I1Ili["Content-Type"] = "application/json; charset=utf-8";
    delete Ii1I1Ili.Cookie;
  }
  return {
    "url": ilI1lIll,
    "method": i1lIlllI,
    "headers": Ii1I1Ili,
    "body": II1illII,
    "timeout": 30 * 1000
  };
}
function ilIlll(lii1ilII, i1lIIIii) {
  d = {
    "actId": $.actId,
    ...i1lIIIii,
    "method": lii1ilII,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = I1ilIl11(d);
  const iIlIiIii = {
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
        ...i1lIIIii,
        "method": lii1ilII,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return lii1ilII.indexOf("missionInviteList") > -1 && delete iIlIiIii.params.admJson.actId, $.toStr(iIlIiIii, iIlIiIii);
}
function lIllIlIi(Il1ii1l, lIiiI1i) {
  return Math.floor(Math.random() * (lIiiI1i - Il1ii1l)) + Il1ii1l;
}
function I1ilIl11(Ii1iIiI1) {
  AppSecret = "420e1c01449f4aa98b490c07de798c3e";
  key = "ed3c54ee668e";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(Ii1iIiI1));
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
async function lIi11li() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const I111iIii = CryptoJS.enc.Utf8.parse(id),
    ll1I111 = CryptoJS.enc.Base64.stringify(I111iIii);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": ll1I111,
      "od": "",
      "ov": "Ctq=",
      "ud": ll1I111
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function iIlililI(i11l11Il) {
  i11l11Il = i11l11Il || 32;
  let iil1illl = "abcdef0123456789",
    Il1ill = iil1illl.length,
    I1llIII1 = "";
  for (i = 0; i < i11l11Il; i++) I1llIII1 += iil1illl.charAt(Math.floor(Math.random() * Il1ill));
  return I1llIII1;
}
function I1iIIili(lIlIIliI) {
  if (typeof lIlIIliI == "string") {
    try {
      return JSON.parse(lIlIIliI);
    } catch (III11lli) {
      return console.log(III11lli), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function IlllllIi() {
  if (!$.joinVenderId) return;
  return new Promise(async iIII1I11 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let illIl1l1 = "";
    if ($.shopactivityId) illIl1l1 = ",\"activityId\":" + $.shopactivityId;
    const ilI1I11i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + illIl1l1 + ",\"channel\":406}",
      Il1Il1i1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ilI1I11i)
      };
    for (var IlIili = "", ll1ilill = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", lIIi1II = 0; lIIi1II < 16; lIIi1II++) {
      var lI1iI1i1 = Math.round(Math.random() * (ll1ilill.length - 1));
      IlIili += ll1ilill.substring(lI1iI1i1, lI1iI1i1 + 1);
    }
    uuid = Buffer.from(IlIili, "utf8").toString("base64");
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
    const i11iIIiI = await IiiI1i1I("8adfb", Il1Il1i1),
      Illiil = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + ilI1I11i + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i11iIIiI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": I11iI1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Illiil, async (l1i1iII1, lIIiil1, lIl1l1I1) => {
      try {
        if (l1i1iII1) {
          if (lIIiil1 && typeof lIIiil1.statusCode != "undefined") {
            if (lIIiil1.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          lIl1l1I1 = lIl1l1I1 && lIl1l1I1.match(/jsonp_.*?\((.*?)\);/) && lIl1l1I1.match(/jsonp_.*?\((.*?)\);/)[1] || lIl1l1I1;
          let lI1iiili = $.toObj(lIl1l1I1, lIl1l1I1);
          if (lI1iiili && typeof lI1iiili == "object") {
            if (lI1iiili && lI1iiili.success === true) {
              console.log(" >> " + lI1iiili.message);
              $.errorJoinShop = lI1iiili.message;
              if (lI1iiili.result && lI1iiili.result.giftInfo) {
                for (let IllilI11 of lI1iiili.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + IllilI11.discountString + IllilI11.prizeName + IllilI11.secondLineDesc);
                }
              }
            } else {
              if (lI1iiili && typeof lI1iiili == "object" && lI1iiili.message) {
                $.errorJoinShop = lI1iiili.message;
                console.log("" + (lI1iiili.message || ""));
              } else {
                console.log(lIl1l1I1);
              }
            }
          } else console.log(lIl1l1I1);
        }
      } catch (liIll1i) {
        $.logErr(liIll1i, lIIiil1);
      } finally {
        iIII1I11();
      }
    });
  });
}
async function ili1iII1() {
  return new Promise(async IilliIl1 => {
    const l1l1IlII = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      liIlIii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l1l1IlII)
      };
    await $.wait(1000);
    const iIiIiI11 = await IiiI1i1I("8adfb", liIlIii),
      IlIii1I = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l1l1IlII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIiIiI11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": I11iI1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IlIii1I, async (IIii11ll, iIlii1i, ii1ilill) => {
      try {
        if (IIii11ll) iIlii1i && typeof iIlii1i.statusCode != "undefined" && iIlii1i.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          ii1ilill = ii1ilill && ii1ilill.match(/jsonp_.*?\((.*?)\);/) && ii1ilill.match(/jsonp_.*?\((.*?)\);/)[1] || ii1ilill;
          let lIIiIl1I = $.toObj(ii1ilill, ii1ilill);
          lIIiIl1I && typeof lIIiIl1I == "object" ? lIIiIl1I && lIIiIl1I.success == true && (console.log("去加入：" + (lIIiIl1I.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = lIIiIl1I.result.interestsRuleList && lIIiIl1I.result.interestsRuleList[0] && lIIiIl1I.result.interestsRuleList[0].interestsInfo && lIIiIl1I.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(ii1ilill);
        }
      } catch (Iil11l1) {
        $.logErr(Iil11l1, iIlii1i);
      } finally {
        IilliIl1();
      }
    });
  });
}
function l1illIIi(i1I1111I) {
  return new Promise(lIil11iI => {
    const iIIll = {
      "url": i1I1111I + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iIIll, async (liIiliI1, l11lIiI, IiII1Ili) => {
      try {
        if (liIiliI1) $.getAuthorCodeListerr = false;else {
          if (IiII1Ili) IiII1Ili = JSON.parse(IiII1Ili);
          $.getAuthorCodeListerr = true;
        }
      } catch (IIIlIli) {
        $.logErr(IIIlIli, l11lIiI);
        IiII1Ili = null;
      } finally {
        lIil11iI(IiII1Ili);
      }
    });
  });
}
function lIllIlIi(iI1IIll, l1l11llI) {
  return Math.floor(Math.random() * (l1l11llI - iI1IIll)) + iI1IIll;
}
function ili1l11l() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const Il1iili1 = Array.from(new Set($.blacklist.split("&")));
  console.log(Il1iili1.join("&") + "\n");
  let i11Ili1i = Il1iili1,
    Ii1lIIiI = [],
    Il1i1il1 = false;
  for (let Iliii1iI = 0; Iliii1iI < iiIIi111.length; Iliii1iI++) {
    let IiIlilii = decodeURIComponent(iiIIi111[Iliii1iI].match(/pt_pin=([^; ]+)(?=;?)/) && iiIIi111[Iliii1iI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IiIlilii) break;
    let IIiI1l = false;
    for (let IIi1illi of i11Ili1i) {
      if (IIi1illi && IIi1illi == IiIlilii) {
        IIiI1l = true;
        break;
      }
    }
    !IIiI1l && (Il1i1il1 = true, Ii1lIIiI.splice(Iliii1iI, -1, iiIIi111[Iliii1iI]));
  }
  if (Il1i1il1) iiIIi111 = Ii1lIIiI;
}
function l1I1llii(il1i1ill, llIiII) {
  llIiII != 0 && il1i1ill.unshift(il1i1ill.splice(llIiII, 1)[0]);
}
function I1illII1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(iiIIi111, iiIIi111));
    return;
  }
  console.log("当前已设置白名单：");
  const iiilliil = Array.from(new Set($.whitelist.split("&")));
  console.log(iiilliil.join("&") + "\n");
  let liIiIliI = [],
    I1ilI1ll = iiilliil;
  for (let lIIl11Ii in iiIIi111) {
    let l1iIiilI = decodeURIComponent(iiIIi111[lIIl11Ii].match(/pt_pin=([^; ]+)(?=;?)/) && iiIIi111[lIIl11Ii].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    I1ilI1ll.includes(l1iIiilI) && liIiIliI.push(iiIIi111[lIIl11Ii]);
  }
  helpCookiesArr = liIiIliI;
  if (I1ilI1ll.length > 1) for (let l1iI1IlI in I1ilI1ll) {
    let I1l11l11 = I1ilI1ll[I1ilI1ll.length - 1 - l1iI1IlI];
    if (!I1l11l11) continue;
    for (let ii1I111 in helpCookiesArr) {
      let IlIiliii = decodeURIComponent(helpCookiesArr[ii1I111].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[ii1I111].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      I1l11l11 == IlIiliii && l1I1llii(helpCookiesArr, ii1I111);
    }
  }
}