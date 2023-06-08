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
1 13 8,10 * * jd_dplh060104.js, tag=大牌联合060104期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合060104期");
const Il11IIil = $.isNode() ? require("./jdCookie.js") : "",
  I11Il1I = $.isNode() ? require("./sendNotify") : "";
let li1llii1 = [],
  l1iIilii = "";
if ($.isNode()) {
  Object.keys(Il11IIil).forEach(IlliiiI => {
    li1llii1.push(Il11IIil[IlliiiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else li1llii1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1IIlII($.getdata("CookiesJD") || "[]").map(IIII1iI => IIII1iI.cookie)].filter(lIl => !!lIl);
let IlIiiII1 = "30",
  i1IIIIi1 = "0";
IlIiiII1 = $.isNode() ? process.env.retrynum ? process.env.retrynum : IlIiiII1 : $.getdata("retrynum") ? $.getdata("retrynum") : i1IIIIi1;
i1IIIIi1 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : i1IIIIi1 : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : i1IIIIi1;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let I1liII = "",
  IiiI1ii1 = "",
  II1l111i = "456c57e5dfaf421fb_23060104";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const IIlIIli = require("./function/krgetToken"),
  iIllIlIi = require("./function/krh5st");
let lIIlIlI = "https://jinggengjcq-isv.isvjcloud.com";
IiiI1ii1 = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IiiI1ii1 : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IiiI1ii1;
let ii1Il1Ii = "",
  IIIiIlii = "";
$.whitelist = process.env.DPLHTY_whitelist || ii1Il1Ii;
$.blacklist = process.env.DPLHTY_blacklist || IIIiIlii;
Ii1ll11l();
lilIlIIl();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = IiiI1ii1 ? IiiI1ii1 : authorCodeList[Ii11lIi1(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + II1l111i);
  console.log("\n💬 默认抽奖次数：" + i1IIIIi1 + " 💬 重试次数：" + IlIiiII1);
  console.log("\n💬 请在有水的情况下运行");
  if (!li1llii1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = II1l111i;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let i1l1ilii = 0; i1l1ilii < li1llii1.length; i1l1ilii++) {
    l1iIilii = li1llii1[i1l1ilii];
    if (l1iIilii) {
      $.UserName = decodeURIComponent(l1iIilii.match(/pt_pin=([^; ]+)(?=;?)/) && l1iIilii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1l1ilii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await IIIi1111();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await IliIiiii();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let I11i1lil = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + I11i1lil);
    if ($.isNode()) await I11Il1I.sendNotify("" + $.name, "" + I11i1lil);
  }
})().catch(li11i1i => $.logErr(li11i1i)).finally(() => $.done());
async function IliIiiii() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    I1liII = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await IIlIIli(l1iIilii, lIIlIlI);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await I1ll1lIl("activity_load");
    for (let l1lilIii = 0; l1lilIii < IlIiiII1; l1lilIii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1ll1lIl("activity_load");
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
    await I1ll1lIl("绑定");
    for (let IIlIllI1 = 0; IIlIllI1 < IlIiiII1; IIlIllI1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1ll1lIl("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await I1ll1lIl("shopList");
    for (let il1IiIl1 = 0; il1IiIl1 < IlIiiII1; il1IiIl1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1ll1lIl("shopList");
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
        await I1ll1lIl("mission");
        for (let l1IlI1ii = 0; l1IlI1ii < IlIiiII1; l1IlI1ii++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await I1ll1lIl("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await llIi1IlI();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await llIi1IlI(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1ll1lIl("activity_load");
          for (let iil1I1 = 0; iil1I1 < IlIiiII1; iil1I1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await I1ll1lIl("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1ll1lIl("shopList");
          for (let i1i1ilI1 = 0; i1i1ilI1 < IlIiiII1; i1i1ilI1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await I1ll1lIl("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await I1ll1lIl("mission");
      for (let lI1iiIII = 0; lI1iiIII < IlIiiII1; lI1iiIII++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1ll1lIl("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await I1ll1lIl("mission");
      for (let IllIiii1 = 0; IllIiii1 < IlIiiII1; IllIiii1++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await I1ll1lIl("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (i1IIIIi1 + "" !== "0") {
      $.runFalag = true;
      let Iil1Ii1I = parseInt($.totalPoint / 200);
      i1IIIIi1 = parseInt(i1IIIIi1, 10);
      if (Iil1Ii1I > i1IIIIi1) Iil1Ii1I = i1IIIIi1;
      console.log("💖 抽奖次数为:" + Iil1Ii1I);
      for (m = 1; Iil1Ii1I--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await I1ll1lIl("抽奖");
        for (let ilIl1IIl = 0; ilIl1IIl < IlIiiII1; ilIl1IIl++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await I1ll1lIl("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(Iil1Ii1I) <= 0) break;
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
  } catch (l1I1I1I) {
    console.log(l1I1I1I);
  }
}
async function I1ll1lIl(IilIiil1) {
  if ($.outFlag) return;
  let ll1iiIii = "https://jinggengjcq-isv.isvjcloud.com",
    lli1llI = "",
    il1Ilii = "POST",
    iilIi1 = "";
  switch (IilIiil1) {
    case "activity_load":
      url = ll1iiIii + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iilIi1 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) iilIi1 = {
        ...iilIi1,
        "shopId": "" + $.joinVenderId
      };
      lli1llI = I1IIIiil("/jdBigAlliance/activity/load", iilIi1);
      break;
    case "shopList":
      url = ll1iiIii + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iilIi1 = {};
      lli1llI = I1IIIiil("/jdBigAlliance/shop/shopList", iilIi1);
      break;
    case "绑定":
      url = ll1iiIii + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iilIi1 = {
        "inviterNick": $.inviteNick || ""
      };
      lli1llI = I1IIIiil("/jdBigAlliance/customer/inviteRelation", iilIi1);
      break;
    case "mission":
      url = ll1iiIii + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iilIi1 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) iilIi1 = {
        ...iilIi1,
        "shopId": $.joinVenderId
      };
      lli1llI = I1IIIiil("/jdBigAlliance/mission/completeMission", iilIi1);
      break;
    case "抽奖":
      url = ll1iiIii + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iilIi1 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      lli1llI = I1IIIiil("/jdBigAlliance/interactive/drawPost", iilIi1);
      break;
    default:
      console.log("错误" + IilIiil1);
  }
  let liliiili = Ii1iIlll(url, lli1llI, il1Ilii);
  return new Promise(async Il11Il1l => {
    $.post(liliiili, (IliIi11i, ii111llI, lllI1Ii) => {
      try {
        IliIi11i ? (ii111llI && ii111llI.statusCode && ii111llI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : illi11i1(IilIiil1, lllI1Ii);
      } catch (li1Iii) {
        console.log(li1Iii, ii111llI);
      } finally {
        Il11Il1l();
      }
    });
  });
}
async function illi11i1(IilIiI1l, liiIlI1) {
  let ll1iIi11 = "";
  try {
    $.krFlag = true;
    (IilIiI1l != "accessLogWithAD" || IilIiI1l != "drawContent") && liiIlI1 && (ll1iIi11 = JSON.parse(liiIlI1));
  } catch (Il11I1ll) {
    console.log("🤬 " + IilIiI1l + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let IIiIiiI1 = "";
    switch (IilIiI1l) {
      case "抽奖":
        if (typeof ll1iIi11 == "object") {
          if (ll1iIi11.success && ll1iIi11.success === true && ll1iIi11.data) {
            if (ll1iIi11.data.status && ll1iIi11.data.status == 200) {
              if (ll1iIi11.data.data.sendResult) {
                console.log("抽中：" + ll1iIi11.data.data.awardSetting.awardName);
              } else !ll1iIi11.data.data.result ? console.log("空气") : console.log(ll1iIi11.data.data);
            } else ll1iIi11.data.status && ll1iIi11.data.status == 500 && console.log("" + (ll1iIi11.data.msg || ""));
          } else ll1iIi11.message ? console.log("" + (ll1iIi11.message || "")) : console.log(liiIlI1);
        } else console.log(liiIlI1);
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
        IIiIiiI1 = "";
        if (IilIiI1l == "followShop") IIiIiiI1 = "关注";
        if (IilIiI1l == "addCart") IIiIiiI1 = "加购";
        if (typeof ll1iIi11 == "object") {
          if (ll1iIi11.success && ll1iIi11.success === true && ll1iIi11.data) {
            if (ll1iIi11.data.status && ll1iIi11.data.status == 200) {
              ll1iIi11 = ll1iIi11.data;
              if (IilIiI1l != "setMixNick" && (ll1iIi11.msg || ll1iIi11.data.isOpenCard || ll1iIi11.data.remark)) console.log("🔊 " + (IIiIiiI1 && IIiIiiI1 + ":" || "") + (ll1iIi11.msg || ll1iIi11.data.isOpenCard || ll1iIi11.data.remark || ""));
              if (IilIiI1l == "activity_load") {
                if (ll1iIi11.msg || ll1iIi11.data.isOpenCard) {
                  if ((ll1iIi11.msg || ll1iIi11.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (ll1iIi11.data) {
                  $.endTime = ll1iIi11.data.cusActivity.endTime || 0;
                  $.MixNick = ll1iIi11.data.missionCustomer.buyerNick || "";
                  $.usedChance = ll1iIi11.data.missionCustomer.usedChance || 0;
                  $.totalPoint = ll1iIi11.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = ll1iIi11.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = ll1iIi11.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IilIiI1l == "shopList") $.openList = ll1iIi11.data || [];else {
                  if (IilIiI1l == "mission") ll1iIi11.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (IilIiI1l == "uniteOpenCardOne") {
                      $.uniteOpenCar = ll1iIi11.msg || ll1iIi11.data.msg || "";
                    } else {
                      if (IilIiI1l == "myAward") {
                        console.log("🔊 我的奖品：");
                        let IIii1lil = 0;
                        for (let Iiill1I in ll1iIi11.data.list || []) {
                          let l1lli = ll1iIi11.data.list[Iiill1I];
                          IIii1lil += Number(l1lli.awardDes);
                        }
                        if (IIii1lil > 0) console.log("🔊 共获得" + IIii1lil + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IilIiI1l == "missionInviteList" && console.log("🔊 邀请人数(" + ll1iIi11.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (ll1iIi11.data.msg) {
                ll1iIi11.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (ll1iIi11.data.msg || ""));
              } else {
                if (ll1iIi11.errorMessage) {
                  if (ll1iIi11.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (ll1iIi11.errorMessage || ""));
                } else console.log("" + liiIlI1);
              }
            }
          } else {
            if (ll1iIi11.errorMessage) {
              console.log("🔊 " + (ll1iIi11.errorMessage || ""));
            } else console.log("" + liiIlI1);
          }
        } else {}
        break;
      default:
        console.log((IIiIiiI1 || IilIiI1l) + "-> " + liiIlI1);
    }
    if (typeof ll1iIi11 == "object") {
      if (ll1iIi11.errorMessage) {
        if (ll1iIi11.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (Ii11Ii1i) {}
}
function Ii1iIlll(l1IiiI, IlIlll1l, Ii1IllI1 = "POST") {
  let i1IiiIII = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": l1iIilii,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return l1IiiI.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (i1IiiIII.Origin = "https://jinggengjcq-isv.isvjcloud.com", i1IiiIII["Content-Type"] = "application/json; charset=utf-8", delete i1IiiIII.Cookie), {
    "url": l1IiiI,
    "method": Ii1IllI1,
    "headers": i1IiiIII,
    "body": IlIlll1l,
    "timeout": 30 * 1000
  };
}
function I1IIIiil(Ill1lili, lIIiII1I) {
  d = {
    "actId": $.actId,
    ...lIIiII1I,
    "method": Ill1lili,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = I1ii1I1(d);
  const llill1ll = {
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
        ...lIIiII1I,
        "method": Ill1lili,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  if (Ill1lili.indexOf("missionInviteList") > -1) {
    delete llill1ll.params.admJson.actId;
  }
  return $.toStr(llill1ll, llill1ll);
}
function Ii11lIi1(lII1i1Ii, i11IiiI) {
  return Math.floor(Math.random() * (i11IiiI - lII1i1Ii)) + lII1i1Ii;
}
function I1ii1I1(IIi1iliI) {
  AppSecret = "2c47e629ffe74ba49d967f91b1603353";
  key = "c6556894e37c";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(IIi1iliI));
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
async function IIIi1111() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const I1I1Ill1 = CryptoJS.enc.Utf8.parse(id),
    illIli = CryptoJS.enc.Base64.stringify(I1I1Ill1);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": illIli,
      "od": "",
      "ov": "Ctq=",
      "ud": illIli
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function ll1II1ll(IiiIl1i) {
  IiiIl1i = IiiIl1i || 32;
  let l11lllI = "abcdef0123456789",
    lI11liIi = l11lllI.length,
    l11Il11I = "";
  for (i = 0; i < IiiIl1i; i++) l11Il11I += l11lllI.charAt(Math.floor(Math.random() * lI11liIi));
  return l11Il11I;
}
function I1IIlII(liiI1ll) {
  if (typeof liiI1ll == "string") {
    try {
      return JSON.parse(liiI1ll);
    } catch (ii1l11I1) {
      return console.log(ii1l11I1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function llIi1IlI() {
  if (!$.joinVenderId) return;
  return new Promise(async iIIIll1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiI1lIII = "";
    if ($.shopactivityId) iiI1lIII = ",\"activityId\":" + $.shopactivityId;
    const I1Iiiil = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiI1lIII + ",\"channel\":406}",
      i1liI1i1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1Iiiil)
      };
    for (var liIlII = "", iiIIill = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IlIIII1I = 0; IlIIII1I < 16; IlIIII1I++) {
      var iIIliili = Math.round(Math.random() * (iiIIill.length - 1));
      liIlII += iiIIill.substring(iIIliili, iIIliili + 1);
    }
    uuid = Buffer.from(liIlII, "utf8").toString("base64");
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
    const lil11III = await iIllIlIi("8adfb", i1liI1i1),
      ii1Ill1l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + I1Iiiil + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lil11III),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1iIilii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ii1Ill1l, async (III1iIIl, II1ill1i, li1Ill1I) => {
      try {
        if (III1iIIl) {
          if (II1ill1i && typeof II1ill1i.statusCode != "undefined") {
            if (II1ill1i.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          li1Ill1I = li1Ill1I && li1Ill1I.match(/jsonp_.*?\((.*?)\);/) && li1Ill1I.match(/jsonp_.*?\((.*?)\);/)[1] || li1Ill1I;
          let i1lliil1 = $.toObj(li1Ill1I, li1Ill1I);
          if (i1lliil1 && typeof i1lliil1 == "object") {
            if (i1lliil1 && i1lliil1.success === true) {
              console.log(" >> " + i1lliil1.message);
              $.errorJoinShop = i1lliil1.message;
              if (i1lliil1.result && i1lliil1.result.giftInfo) for (let I1il1Ii of i1lliil1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + I1il1Ii.discountString + I1il1Ii.prizeName + I1il1Ii.secondLineDesc);
              }
            } else i1lliil1 && typeof i1lliil1 == "object" && i1lliil1.message ? ($.errorJoinShop = i1lliil1.message, console.log("" + (i1lliil1.message || ""))) : console.log(li1Ill1I);
          } else console.log(li1Ill1I);
        }
      } catch (Iii1llI) {
        $.logErr(Iii1llI, II1ill1i);
      } finally {
        iIIIll1I();
      }
    });
  });
}
async function lI1l1i() {
  return new Promise(async Iiiil1I => {
    const illi1lI1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      IiIii1iI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(illi1lI1)
      };
    await $.wait(1000);
    const lI1l11Il = await iIllIlIi("8adfb", IiIii1iI),
      lli1illI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + illi1lI1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lI1l11Il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1iIilii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lli1illI, async (l1IIlIii, llI1lliI, IIiiIil) => {
      try {
        if (l1IIlIii) {
          llI1lliI && typeof llI1lliI.statusCode != "undefined" && llI1lliI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          IIiiIil = IIiiIil && IIiiIil.match(/jsonp_.*?\((.*?)\);/) && IIiiIil.match(/jsonp_.*?\((.*?)\);/)[1] || IIiiIil;
          let iIiI1il1 = $.toObj(IIiiIil, IIiiIil);
          iIiI1il1 && typeof iIiI1il1 == "object" ? iIiI1il1 && iIiI1il1.success == true && (console.log("去加入：" + (iIiI1il1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iIiI1il1.result.interestsRuleList && iIiI1il1.result.interestsRuleList[0] && iIiI1il1.result.interestsRuleList[0].interestsInfo && iIiI1il1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(IIiiIil);
        }
      } catch (lllil1i) {
        $.logErr(lllil1i, llI1lliI);
      } finally {
        Iiiil1I();
      }
    });
  });
}
function i1ilIII1(i11Ili) {
  return new Promise(l1i11iIl => {
    const Iiill111 = {
      "url": i11Ili + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(Iiill111, async (lii11Il, lllli11i, l1II1I1i) => {
      try {
        if (lii11Il) $.getAuthorCodeListerr = false;else {
          if (l1II1I1i) l1II1I1i = JSON.parse(l1II1I1i);
          $.getAuthorCodeListerr = true;
        }
      } catch (iI1iIiI) {
        $.logErr(iI1iIiI, lllli11i);
        l1II1I1i = null;
      } finally {
        l1i11iIl(l1II1I1i);
      }
    });
  });
}
function Ii11lIi1(llilll1i, llI1ll1l) {
  return Math.floor(Math.random() * (llI1ll1l - llilll1i)) + llilll1i;
}
function lilIlIIl() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const li11llil = Array.from(new Set($.blacklist.split("&")));
  console.log(li11llil.join("&") + "\n");
  let ll1llIii = li11llil,
    Iil1illl = [],
    iIIiII1 = false;
  for (let lIillIIl = 0; lIillIIl < li1llii1.length; lIillIIl++) {
    let II1li1li = decodeURIComponent(li1llii1[lIillIIl].match(/pt_pin=([^; ]+)(?=;?)/) && li1llii1[lIillIIl].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!II1li1li) break;
    let IlilIii = false;
    for (let iiiIi1il of ll1llIii) {
      if (iiiIi1il && iiiIi1il == II1li1li) {
        IlilIii = true;
        break;
      }
    }
    if (!IlilIii) {
      iIIiII1 = true;
      Iil1illl.splice(lIillIIl, -1, li1llii1[lIillIIl]);
    }
  }
  if (iIIiII1) li1llii1 = Iil1illl;
}
function IiIi1l(Iiil1l1i, ili1lliI) {
  ili1lliI != 0 && Iiil1l1i.unshift(Iiil1l1i.splice(ili1lliI, 1)[0]);
}
function Ii1ll11l() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(li1llii1, li1llii1));
    return;
  }
  console.log("当前已设置白名单：");
  const iiii1ili = Array.from(new Set($.whitelist.split("&")));
  console.log(iiii1ili.join("&") + "\n");
  let IlIiili = [],
    I11111lI = iiii1ili;
  for (let iIlI111i in li1llii1) {
    let ll1IiiII = decodeURIComponent(li1llii1[iIlI111i].match(/pt_pin=([^; ]+)(?=;?)/) && li1llii1[iIlI111i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    I11111lI.includes(ll1IiiII) && IlIiili.push(li1llii1[iIlI111i]);
  }
  helpCookiesArr = IlIiili;
  if (I11111lI.length > 1) for (let IlI1lii1 in I11111lI) {
    let llIl1Iii = I11111lI[I11111lI.length - 1 - IlI1lii1];
    if (!llIl1Iii) continue;
    for (let I1i1ilIi in helpCookiesArr) {
      let lilllI1I = decodeURIComponent(helpCookiesArr[I1i1ilIi].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[I1i1ilIi].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      llIl1Iii == lilllI1I && IiIi1l(helpCookiesArr, I1i1ilIi);
    }
  }
}