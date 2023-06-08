/*
大牌联合060103期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023060103ddw/oC2023060103ddw?actId=288de30e827c48e8820f8491932_23060103

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
#大牌联合060103期
1 11 10,12 * * jd_dplh060103a.js, tag=大牌联合060103期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合060103期");
const iI1ii1i1 = $.isNode() ? require("./jdCookie.js") : "",
  iliIII1I = $.isNode() ? require("./sendNotify") : "";
let llIil1ii = [],
  Iilll1Ii = "";
if ($.isNode()) {
  Object.keys(iI1ii1i1).forEach(IilIi1i1 => {
    llIil1ii.push(iI1ii1i1[IilIi1i1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else llIil1ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Iiiil11($.getdata("CookiesJD") || "[]").map(i11il111 => i11il111.cookie)].filter(iI1iillI => !!iI1iillI);
let iIi1I11i = "30",
  lilil1l = "0";
iIi1I11i = $.isNode() ? process.env.retrynum ? process.env.retrynum : iIi1I11i : $.getdata("retrynum") ? $.getdata("retrynum") : lilil1l;
lilil1l = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : lilil1l : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : lilil1l;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let I111ii1I = "",
  IlIlIIii = "",
  iIi111I1 = "288de30e827c48e8820f8491932_23060103";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const liII1i = require("./function/krgetToken"),
  i1iI1lli = require("./function/krh5st");
let II1IlliI = "https://jinggengjcq-isv.isvjcloud.com";
IlIlIIii = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IlIlIIii : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IlIlIIii;
let II11lI1 = "",
  lliliii = "";
$.whitelist = process.env.DPLHTY_whitelist || II11lI1;
$.blacklist = process.env.DPLHTY_blacklist || lliliii;
llIlIIII();
lI1liI1I();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = IlIlIIii ? IlIlIIii : authorCodeList[l1lIiI(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + iIi111I1);
  console.log("\n💬 默认抽奖次数：" + lilil1l + " 💬 重试次数：" + iIi1I11i);
  console.log("\n💬 请在有水的情况下运行");
  if (!llIil1ii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = iIi111I1;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let llilI1li = 0; llilI1li < llIil1ii.length; llilI1li++) {
    Iilll1Ii = llIil1ii[llilI1li];
    if (Iilll1Ii) {
      $.UserName = decodeURIComponent(Iilll1Ii.match(/pt_pin=([^; ]+)(?=;?)/) && Iilll1Ii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = llilI1li + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await I11i1ll1();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await I1iIiII();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let l1IIll1I = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + l1IIll1I);
    if ($.isNode()) await iliIII1I.sendNotify("" + $.name, "" + l1IIll1I);
  }
})().catch(I1Iillii => $.logErr(I1Iillii)).finally(() => $.done());
async function I1iIiII() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    I111ii1I = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await liII1i(Iilll1Ii, II1IlliI);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await lllIlIll("activity_load");
    for (let iiIIIII1 = 0; iiIIIII1 < iIi1I11i; iiIIIII1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lllIlIll("activity_load");
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
    await lllIlIll("绑定");
    for (let I1lIll = 0; I1lIll < iIi1I11i; I1lIll++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lllIlIll("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await lllIlIll("shopList");
    for (let l1i1IiIi = 0; l1i1IiIi < iIi1I11i; l1i1IiIi++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lllIlIll("shopList");
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
        await lllIlIll("mission");
        for (let li11iiI = 0; li11iiI < iIi1I11i; li11iiI++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await lllIlIll("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await IllIil1i();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await IllIil1i(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lllIlIll("activity_load");
          for (let IIllIIll = 0; IIllIIll < iIi1I11i; IIllIIll++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await lllIlIll("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lllIlIll("shopList");
          for (let i1l11IIi = 0; i1l11IIi < iIi1I11i; i1l11IIi++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await lllIlIll("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await lllIlIll("mission");
      for (let l1I1i1iI = 0; l1I1i1iI < iIi1I11i; l1I1i1iI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lllIlIll("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await lllIlIll("mission");
      for (let i1I1lI1l = 0; i1I1lI1l < iIi1I11i; i1I1lI1l++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lllIlIll("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (lilil1l + "" !== "0") {
      $.runFalag = true;
      let lil1l1l = parseInt($.totalPoint / 200);
      lilil1l = parseInt(lilil1l, 10);
      if (lil1l1l > lilil1l) lil1l1l = lilil1l;
      console.log("💖 抽奖次数为:" + lil1l1l);
      for (m = 1; lil1l1l--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lllIlIll("抽奖");
        for (let iilII111 = 0; iilII111 < iIi1I11i; iilII111++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await lllIlIll("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(lil1l1l) <= 0) break;
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
  } catch (I1l1) {
    console.log(I1l1);
  }
}
async function lllIlIll(ilIIIiIl) {
  if ($.outFlag) return;
  let IIIl1I1i = "https://jinggengjcq-isv.isvjcloud.com",
    ilIIIl1l = "",
    il1l1Ii = "POST",
    Iil = "";
  switch (ilIIIiIl) {
    case "activity_load":
      url = IIIl1I1i + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Iil = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) Iil = {
        ...Iil,
        "shopId": "" + $.joinVenderId
      };
      ilIIIl1l = lIl1ilIi("/jdBigAlliance/activity/load", Iil);
      break;
    case "shopList":
      url = IIIl1I1i + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Iil = {};
      ilIIIl1l = lIl1ilIi("/jdBigAlliance/shop/shopList", Iil);
      break;
    case "绑定":
      url = IIIl1I1i + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Iil = {
        "inviterNick": $.inviteNick || ""
      };
      ilIIIl1l = lIl1ilIi("/jdBigAlliance/customer/inviteRelation", Iil);
      break;
    case "mission":
      url = IIIl1I1i + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Iil = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) Iil = {
        ...Iil,
        "shopId": $.joinVenderId
      };
      ilIIIl1l = lIl1ilIi("/jdBigAlliance/mission/completeMission", Iil);
      break;
    case "抽奖":
      url = IIIl1I1i + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      Iil = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      ilIIIl1l = lIl1ilIi("/jdBigAlliance/interactive/drawPost", Iil);
      break;
    default:
      console.log("错误" + ilIIIiIl);
  }
  let lIilIiii = I11IilIl(url, ilIIIl1l, il1l1Ii);
  return new Promise(async l1ill11I => {
    $.post(lIilIiii, (iIiiIi1l, l1Iliil, i1Iil11) => {
      try {
        iIiiIi1l ? (l1Iliil && l1Iliil.statusCode && l1Iliil.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : lii1i1(ilIIIiIl, i1Iil11);
      } catch (lIIiliiI) {
        console.log(lIIiliiI, l1Iliil);
      } finally {
        l1ill11I();
      }
    });
  });
}
async function lii1i1(IlIiliil, I1liiIii) {
  let ii1i111i = "";
  try {
    $.krFlag = true;
    (IlIiliil != "accessLogWithAD" || IlIiliil != "drawContent") && I1liiIii && (ii1i111i = JSON.parse(I1liiIii));
  } catch (lllIIiIi) {
    console.log("🤬 " + IlIiliil + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let iII1IiI = "";
    switch (IlIiliil) {
      case "抽奖":
        if (typeof ii1i111i == "object") {
          if (ii1i111i.success && ii1i111i.success === true && ii1i111i.data) {
            if (ii1i111i.data.status && ii1i111i.data.status == 200) {
              if (ii1i111i.data.data.sendResult) console.log("抽中：" + ii1i111i.data.data.awardSetting.awardName);else !ii1i111i.data.data.result ? console.log("空气") : console.log(ii1i111i.data.data);
            } else {
              if (ii1i111i.data.status && ii1i111i.data.status == 500) {
                console.log("" + (ii1i111i.data.msg || ""));
              }
            }
          } else ii1i111i.message ? console.log("" + (ii1i111i.message || "")) : console.log(I1liiIii);
        } else console.log(I1liiIii);
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
        iII1IiI = "";
        if (IlIiliil == "followShop") iII1IiI = "关注";
        if (IlIiliil == "addCart") iII1IiI = "加购";
        if (typeof ii1i111i == "object") {
          if (ii1i111i.success && ii1i111i.success === true && ii1i111i.data) {
            if (ii1i111i.data.status && ii1i111i.data.status == 200) {
              ii1i111i = ii1i111i.data;
              if (IlIiliil != "setMixNick" && (ii1i111i.msg || ii1i111i.data.isOpenCard || ii1i111i.data.remark)) console.log("🔊 " + (iII1IiI && iII1IiI + ":" || "") + (ii1i111i.msg || ii1i111i.data.isOpenCard || ii1i111i.data.remark || ""));
              if (IlIiliil == "activity_load") {
                if (ii1i111i.msg || ii1i111i.data.isOpenCard) {
                  if ((ii1i111i.msg || ii1i111i.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (ii1i111i.data) {
                  $.endTime = ii1i111i.data.cusActivity.endTime || 0;
                  $.MixNick = ii1i111i.data.missionCustomer.buyerNick || "";
                  $.usedChance = ii1i111i.data.missionCustomer.usedChance || 0;
                  $.totalPoint = ii1i111i.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = ii1i111i.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = ii1i111i.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IlIiliil == "shopList") $.openList = ii1i111i.data || [];else {
                  if (IlIiliil == "mission") ii1i111i.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (IlIiliil == "uniteOpenCardOne") $.uniteOpenCar = ii1i111i.msg || ii1i111i.data.msg || "";else {
                      if (IlIiliil == "myAward") {
                        console.log("🔊 我的奖品：");
                        let lillIilI = 0;
                        for (let illiIi1i in ii1i111i.data.list || []) {
                          let illlIiiI = ii1i111i.data.list[illiIi1i];
                          lillIilI += Number(illlIiiI.awardDes);
                        }
                        if (lillIilI > 0) console.log("🔊 共获得" + lillIilI + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IlIiliil == "missionInviteList" && console.log("🔊 邀请人数(" + ii1i111i.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (ii1i111i.data.msg) {
                ii1i111i.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (ii1i111i.data.msg || ""));
              } else {
                if (ii1i111i.errorMessage) {
                  if (ii1i111i.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (ii1i111i.errorMessage || ""));
                } else console.log("" + I1liiIii);
              }
            }
          } else ii1i111i.errorMessage ? console.log("🔊 " + (ii1i111i.errorMessage || "")) : console.log("" + I1liiIii);
        } else {}
        break;
      default:
        console.log((iII1IiI || IlIiliil) + "-> " + I1liiIii);
    }
    if (typeof ii1i111i == "object") {
      if (ii1i111i.errorMessage) {
        if (ii1i111i.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (lIii1i1l) {}
}
function I11IilIl(IlIi1l1l, I1I11ll1, illI1ll1 = "POST") {
  let l1illIi1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Iilll1Ii,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IlIi1l1l.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (l1illIi1.Origin = "https://jinggengjcq-isv.isvjcloud.com", l1illIi1["Content-Type"] = "application/json; charset=utf-8", delete l1illIi1.Cookie), {
    "url": IlIi1l1l,
    "method": illI1ll1,
    "headers": l1illIi1,
    "body": I1I11ll1,
    "timeout": 30 * 1000
  };
}
function lIl1ilIi(iIi1iIil, llIlliI) {
  d = {
    "actId": $.actId,
    ...llIlliI,
    "method": iIi1iIil,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = iil1IIl(d);
  const i11Ii1Ii = {
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
        ...llIlliI,
        "method": iIi1iIil,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return iIi1iIil.indexOf("missionInviteList") > -1 && delete i11Ii1Ii.params.admJson.actId, $.toStr(i11Ii1Ii, i11Ii1Ii);
}
function l1lIiI(l1I1Ii1I, l1I1llil) {
  return Math.floor(Math.random() * (l1I1llil - l1I1Ii1I)) + l1I1Ii1I;
}
function iil1IIl(I1i1Ii1i) {
  AppSecret = "4c3aea57fa9d45c8aa58f18bd9f63c54";
  key = "d9e8969dbc9a";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(I1i1Ii1i));
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
async function I11i1ll1() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const i1I1l11I = CryptoJS.enc.Utf8.parse(id),
    il1II111 = CryptoJS.enc.Base64.stringify(i1I1l11I);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": il1II111,
      "od": "",
      "ov": "Ctq=",
      "ud": il1II111
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function i11i11lI(IllIIii1) {
  IllIIii1 = IllIIii1 || 32;
  let liIi1I1 = "abcdef0123456789",
    I11Ill1l = liIi1I1.length,
    lililill = "";
  for (i = 0; i < IllIIii1; i++) lililill += liIi1I1.charAt(Math.floor(Math.random() * I11Ill1l));
  return lililill;
}
function Iiiil11(IiIII11) {
  if (typeof IiIII11 == "string") {
    try {
      return JSON.parse(IiIII11);
    } catch (IlIlill) {
      return console.log(IlIlill), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function IllIil1i() {
  if (!$.joinVenderId) return;
  return new Promise(async I1I1lli => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIiillIi = "";
    if ($.shopactivityId) IIiillIi = ",\"activityId\":" + $.shopactivityId;
    const IiiI1lI1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIiillIi + ",\"channel\":406}",
      Iil1Ii11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IiiI1lI1)
      };
    for (var IiIiI1II = "", I1I11ilI = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", lIIli1l1 = 0; lIIli1l1 < 16; lIIli1l1++) {
      var lilII1l = Math.round(Math.random() * (I1I11ilI.length - 1));
      IiIiI1II += I1I11ilI.substring(lilII1l, lilII1l + 1);
    }
    uuid = Buffer.from(IiIiI1II, "utf8").toString("base64");
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
    const Illllili = await i1iI1lli("8adfb", Iil1Ii11),
      l1lIIl1l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IiiI1lI1 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Illllili),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Iilll1Ii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1lIIl1l, async (lIlii1iI, IlIIII1l, lI1l1iI) => {
      try {
        if (lIlii1iI) {
          IlIIII1l && typeof IlIIII1l.statusCode != "undefined" && IlIIII1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          lI1l1iI = lI1l1iI && lI1l1iI.match(/jsonp_.*?\((.*?)\);/) && lI1l1iI.match(/jsonp_.*?\((.*?)\);/)[1] || lI1l1iI;
          let llilIii = $.toObj(lI1l1iI, lI1l1iI);
          if (llilIii && typeof llilIii == "object") {
            if (llilIii && llilIii.success === true) {
              console.log(" >> " + llilIii.message);
              $.errorJoinShop = llilIii.message;
              if (llilIii.result && llilIii.result.giftInfo) for (let i1Iil1Ii of llilIii.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + i1Iil1Ii.discountString + i1Iil1Ii.prizeName + i1Iil1Ii.secondLineDesc);
              }
            } else llilIii && typeof llilIii == "object" && llilIii.message ? ($.errorJoinShop = llilIii.message, console.log("" + (llilIii.message || ""))) : console.log(lI1l1iI);
          } else console.log(lI1l1iI);
        }
      } catch (ii1li1) {
        $.logErr(ii1li1, IlIIII1l);
      } finally {
        I1I1lli();
      }
    });
  });
}
async function Illlli1I() {
  return new Promise(async Ii1il1l => {
    const Ilii1liI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      IllllI1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ilii1liI)
      };
    await $.wait(1000);
    const IlllI1i1 = await i1iI1lli("8adfb", IllllI1i),
      iiiiiIl1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Ilii1liI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlllI1i1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Iilll1Ii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iiiiiIl1, async (li1IIlIl, IIlIiIi1, iIilIl) => {
      try {
        if (li1IIlIl) {
          if (IIlIiIi1 && typeof IIlIiIi1.statusCode != "undefined") {
            if (IIlIiIi1.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          iIilIl = iIilIl && iIilIl.match(/jsonp_.*?\((.*?)\);/) && iIilIl.match(/jsonp_.*?\((.*?)\);/)[1] || iIilIl;
          let Ii11Ill1 = $.toObj(iIilIl, iIilIl);
          Ii11Ill1 && typeof Ii11Ill1 == "object" ? Ii11Ill1 && Ii11Ill1.success == true && (console.log("去加入：" + (Ii11Ill1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = Ii11Ill1.result.interestsRuleList && Ii11Ill1.result.interestsRuleList[0] && Ii11Ill1.result.interestsRuleList[0].interestsInfo && Ii11Ill1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iIilIl);
        }
      } catch (iI1Iil1) {
        $.logErr(iI1Iil1, IIlIiIi1);
      } finally {
        Ii1il1l();
      }
    });
  });
}
function lliiiI1i(liIll1ii) {
  return new Promise(Il1lIl1l => {
    const I1iilIil = {
      "url": liIll1ii + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1iilIil, async (lIIliii, il1lilil, I1IlIII1) => {
      try {
        if (lIIliii) $.getAuthorCodeListerr = false;else {
          if (I1IlIII1) I1IlIII1 = JSON.parse(I1IlIII1);
          $.getAuthorCodeListerr = true;
        }
      } catch (II1lilil) {
        $.logErr(II1lilil, il1lilil);
        I1IlIII1 = null;
      } finally {
        Il1lIl1l(I1IlIII1);
      }
    });
  });
}
function l1lIiI(lI1llIl, illlilli) {
  return Math.floor(Math.random() * (illlilli - lI1llIl)) + lI1llIl;
}
function lI1liI1I() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iIi1ii11 = Array.from(new Set($.blacklist.split("&")));
  console.log(iIi1ii11.join("&") + "\n");
  let i1liIlI1 = iIi1ii11,
    ll1lI111 = [],
    ilI1iIl = false;
  for (let IlilI1I1 = 0; IlilI1I1 < llIil1ii.length; IlilI1I1++) {
    let li1ilI1 = decodeURIComponent(llIil1ii[IlilI1I1].match(/pt_pin=([^; ]+)(?=;?)/) && llIil1ii[IlilI1I1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!li1ilI1) break;
    let li1i1lli = false;
    for (let l1iiii1 of i1liIlI1) {
      if (l1iiii1 && l1iiii1 == li1ilI1) {
        li1i1lli = true;
        break;
      }
    }
    !li1i1lli && (ilI1iIl = true, ll1lI111.splice(IlilI1I1, -1, llIil1ii[IlilI1I1]));
  }
  if (ilI1iIl) llIil1ii = ll1lI111;
}
function i1II1i1I(l1i1illl, I1lIlill) {
  I1lIlill != 0 && l1i1illl.unshift(l1i1illl.splice(I1lIlill, 1)[0]);
}
function llIlIIII() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(llIil1ii, llIil1ii));
    return;
  }
  console.log("当前已设置白名单：");
  const iIi11i11 = Array.from(new Set($.whitelist.split("&")));
  console.log(iIi11i11.join("&") + "\n");
  let lII11l1l = [],
    llIilliI = iIi11i11;
  for (let lil1liIi in llIil1ii) {
    let I11Ii1 = decodeURIComponent(llIil1ii[lil1liIi].match(/pt_pin=([^; ]+)(?=;?)/) && llIil1ii[lil1liIi].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    llIilliI.includes(I11Ii1) && lII11l1l.push(llIil1ii[lil1liIi]);
  }
  helpCookiesArr = lII11l1l;
  if (llIilliI.length > 1) for (let II1i1li1 in llIilliI) {
    let I1i111I1 = llIilliI[llIilliI.length - 1 - II1i1li1];
    if (!I1i111I1) continue;
    for (let illiIiiI in helpCookiesArr) {
      let Ii11IIi1 = decodeURIComponent(helpCookiesArr[illiIiiI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[illiIiiI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      I1i111I1 == Ii11IIi1 && i1II1i1I(helpCookiesArr, illiIiiI);
    }
  }
}