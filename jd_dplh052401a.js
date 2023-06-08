/*
大牌联合052401期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023052401aab/oC2023052401aab?actId=9357f32e672c484582fc6c3fd5a_23052401

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
#大牌联合052401期
1 1 9,11 * * jd_dplh052401a.js, tag=大牌联合052401期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合052401期");
const lIi111l1 = $.isNode() ? require("./jdCookie.js") : "",
  IlIIilli = $.isNode() ? require("./sendNotify") : "";
let Ii1li1Ii = [],
  lIiiIiII = "";
if ($.isNode()) {
  Object.keys(lIi111l1).forEach(iii11Ili => {
    Ii1li1Ii.push(lIi111l1[iii11Ili]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Ii1li1Ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ll1i11i1($.getdata("CookiesJD") || "[]").map(liiiIl11 => liiiIl11.cookie)].filter(lllIlil1 => !!lllIlil1);
let i11III = "30",
  liiiIIii = "0";
i11III = $.isNode() ? process.env.retrynum ? process.env.retrynum : i11III : $.getdata("retrynum") ? $.getdata("retrynum") : liiiIIii;
liiiIIii = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : liiiIIii : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : liiiIIii;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iliIll = "",
  IlIi1I11 = "",
  ii11lll = "9357f32e672c484582fc6c3fd5a_23052401";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const I11I1i1I = require("./function/krgetToken"),
  iIiIi1ii = require("./function/krh5st");
let lli1IlIi = "https://jinggengjcq-isv.isvjcloud.com";
IlIi1I11 = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IlIi1I11 : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IlIi1I11;
let illi1lII = "",
  iiiliIli = "";
$.whitelist = process.env.DPLHTY_whitelist || illi1lII;
$.blacklist = process.env.DPLHTY_blacklist || iiiliIli;
l1iil1();
iiiIIll1();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = IlIi1I11 ? IlIi1I11 : authorCodeList[lIi1Il1I(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + ii11lll);
  console.log("\n💬 默认抽奖次数：" + liiiIIii + " 💬 重试次数：" + i11III);
  console.log("\n💬 请在有水的情况下运行");
  if (!Ii1li1Ii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = ii11lll;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let li1Ilil1 = 0; li1Ilil1 < Ii1li1Ii.length; li1Ilil1++) {
    lIiiIiII = Ii1li1Ii[li1Ilil1];
    if (lIiiIiII) {
      $.UserName = decodeURIComponent(lIiiIiII.match(/pt_pin=([^; ]+)(?=;?)/) && lIiiIiII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = li1Ilil1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await I1lIi11I();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await lIIIlili();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let I1IiIil = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + I1IiIil);
    if ($.isNode()) await IlIIilli.sendNotify("" + $.name, "" + I1IiIil);
  }
})().catch(iiiiI1i => $.logErr(iiiiI1i)).finally(() => $.done());
async function lIIIlili() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    iliIll = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await I11I1i1I(lIiiIiII, lli1IlIi);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await liiiiIii("activity_load");
    for (let Ilil11i1 = 0; Ilil11i1 < i11III; Ilil11i1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await liiiiIii("activity_load");
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
    await liiiiIii("绑定");
    for (let l1iI11i1 = 0; l1iI11i1 < i11III; l1iI11i1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await liiiiIii("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await liiiiIii("shopList");
    for (let iiilIil1 = 0; iiilIil1 < i11III; iiilIil1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await liiiiIii("shopList");
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
        await liiiiIii("mission");
        for (let iIillii1 = 0; iIillii1 < i11III; iIillii1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await liiiiIii("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await l1iI1l1i();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await l1iI1l1i(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await liiiiIii("activity_load");
          for (let l1lllII1 = 0; l1lllII1 < i11III; l1lllII1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await liiiiIii("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await liiiiIii("shopList");
          for (let I1Il111I = 0; I1Il111I < i11III; I1Il111I++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await liiiiIii("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await liiiiIii("mission");
      for (let I1ilII1i = 0; I1ilII1i < i11III; I1ilII1i++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await liiiiIii("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await liiiiIii("mission");
      for (let lI1llI1I = 0; lI1llI1I < i11III; lI1llI1I++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await liiiiIii("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (liiiIIii + "" !== "0") {
      $.runFalag = true;
      let l1iIll11 = parseInt($.totalPoint / 200);
      liiiIIii = parseInt(liiiIIii, 10);
      if (l1iIll11 > liiiIIii) l1iIll11 = liiiIIii;
      console.log("💖 抽奖次数为:" + l1iIll11);
      for (m = 1; l1iIll11--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await liiiiIii("抽奖");
        for (let IiliiI1 = 0; IiliiI1 < i11III; IiliiI1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await liiiiIii("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(l1iIll11) <= 0) break;
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
  } catch (lIIllIil) {
    console.log(lIIllIil);
  }
}
async function liiiiIii(ilIlIli1) {
  if ($.outFlag) return;
  let III1llIl = "https://jinggengjcq-isv.isvjcloud.com",
    Il111lIi = "",
    IiiIil1 = "POST",
    il11Iil1 = "";
  switch (ilIlIli1) {
    case "activity_load":
      url = III1llIl + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      il11Iil1 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) il11Iil1 = {
        ...il11Iil1,
        "shopId": "" + $.joinVenderId
      };
      Il111lIi = IIIIIill("/jdBigAlliance/activity/load", il11Iil1);
      break;
    case "shopList":
      url = III1llIl + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      il11Iil1 = {};
      Il111lIi = IIIIIill("/jdBigAlliance/shop/shopList", il11Iil1);
      break;
    case "绑定":
      url = III1llIl + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      il11Iil1 = {
        "inviterNick": $.inviteNick || ""
      };
      Il111lIi = IIIIIill("/jdBigAlliance/customer/inviteRelation", il11Iil1);
      break;
    case "mission":
      url = III1llIl + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      il11Iil1 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) il11Iil1 = {
        ...il11Iil1,
        "shopId": $.joinVenderId
      };
      Il111lIi = IIIIIill("/jdBigAlliance/mission/completeMission", il11Iil1);
      break;
    case "抽奖":
      url = III1llIl + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      il11Iil1 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      Il111lIi = IIIIIill("/jdBigAlliance/interactive/drawPost", il11Iil1);
      break;
    default:
      console.log("错误" + ilIlIli1);
  }
  let l1iilill = i11ill1l(url, Il111lIi, IiiIil1);
  return new Promise(async IIIIlili => {
    $.post(l1iilill, (i1i11iii, I1llIIli, l111III1) => {
      try {
        i1i11iii ? (I1llIIli && I1llIIli.statusCode && I1llIIli.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : IiiiII1i(ilIlIli1, l111III1);
      } catch (iIiI111) {
        console.log(iIiI111, I1llIIli);
      } finally {
        IIIIlili();
      }
    });
  });
}
async function IiiiII1i(III1Iii1, I1I1i1II) {
  let l1lIi1I = "";
  try {
    $.krFlag = true;
    (III1Iii1 != "accessLogWithAD" || III1Iii1 != "drawContent") && I1I1i1II && (l1lIi1I = JSON.parse(I1I1i1II));
  } catch (l1IiIlIl) {
    console.log("🤬 " + III1Iii1 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let i1liI11I = "";
    switch (III1Iii1) {
      case "抽奖":
        if (typeof l1lIi1I == "object") {
          if (l1lIi1I.success && l1lIi1I.success === true && l1lIi1I.data) {
            if (l1lIi1I.data.status && l1lIi1I.data.status == 200) {
              if (l1lIi1I.data.data.sendResult) console.log("抽中：" + l1lIi1I.data.data.awardSetting.awardName);else !l1lIi1I.data.data.result ? console.log("空气") : console.log(l1lIi1I.data.data);
            } else l1lIi1I.data.status && l1lIi1I.data.status == 500 && console.log("" + (l1lIi1I.data.msg || ""));
          } else {
            if (l1lIi1I.message) {
              console.log("" + (l1lIi1I.message || ""));
            } else console.log(I1I1i1II);
          }
        } else console.log(I1I1i1II);
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
        i1liI11I = "";
        if (III1Iii1 == "followShop") i1liI11I = "关注";
        if (III1Iii1 == "addCart") i1liI11I = "加购";
        if (typeof l1lIi1I == "object") {
          if (l1lIi1I.success && l1lIi1I.success === true && l1lIi1I.data) {
            if (l1lIi1I.data.status && l1lIi1I.data.status == 200) {
              l1lIi1I = l1lIi1I.data;
              if (III1Iii1 != "setMixNick" && (l1lIi1I.msg || l1lIi1I.data.isOpenCard || l1lIi1I.data.remark)) console.log("🔊 " + (i1liI11I && i1liI11I + ":" || "") + (l1lIi1I.msg || l1lIi1I.data.isOpenCard || l1lIi1I.data.remark || ""));
              if (III1Iii1 == "activity_load") {
                if (l1lIi1I.msg || l1lIi1I.data.isOpenCard) {
                  if ((l1lIi1I.msg || l1lIi1I.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (l1lIi1I.data) {
                  $.endTime = l1lIi1I.data.cusActivity.endTime || 0;
                  $.MixNick = l1lIi1I.data.missionCustomer.buyerNick || "";
                  $.usedChance = l1lIi1I.data.missionCustomer.usedChance || 0;
                  $.totalPoint = l1lIi1I.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = l1lIi1I.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = l1lIi1I.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (III1Iii1 == "shopList") $.openList = l1lIi1I.data || [];else {
                  if (III1Iii1 == "mission") l1lIi1I.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (III1Iii1 == "uniteOpenCardOne") $.uniteOpenCar = l1lIi1I.msg || l1lIi1I.data.msg || "";else {
                      if (III1Iii1 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let lI1II11l = 0;
                        for (let i11ll1iI in l1lIi1I.data.list || []) {
                          let llIIlii = l1lIi1I.data.list[i11ll1iI];
                          lI1II11l += Number(llIIlii.awardDes);
                        }
                        if (lI1II11l > 0) console.log("🔊 共获得" + lI1II11l + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else III1Iii1 == "missionInviteList" && console.log("🔊 邀请人数(" + l1lIi1I.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (l1lIi1I.data.msg) {
                l1lIi1I.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (l1lIi1I.data.msg || ""));
              } else {
                if (l1lIi1I.errorMessage) {
                  if (l1lIi1I.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (l1lIi1I.errorMessage || ""));
                } else console.log("" + I1I1i1II);
              }
            }
          } else l1lIi1I.errorMessage ? console.log("🔊 " + (l1lIi1I.errorMessage || "")) : console.log("" + I1I1i1II);
        } else {}
        break;
      default:
        console.log((i1liI11I || III1Iii1) + "-> " + I1I1i1II);
    }
    if (typeof l1lIi1I == "object") {
      if (l1lIi1I.errorMessage) {
        if (l1lIi1I.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (lI1llll) {}
}
function i11ill1l(liIIl1l1, l111Ilii, I1Ii111I = "POST") {
  let l11IiIl1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": lIiiIiII,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return liIIl1l1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (l11IiIl1.Origin = "https://jinggengjcq-isv.isvjcloud.com", l11IiIl1["Content-Type"] = "application/json; charset=utf-8", delete l11IiIl1.Cookie), {
    "url": liIIl1l1,
    "method": I1Ii111I,
    "headers": l11IiIl1,
    "body": l111Ilii,
    "timeout": 30 * 1000
  };
}
function IIIIIill(l1iliIi, I1Illili) {
  d = {
    "actId": $.actId,
    ...I1Illili,
    "method": l1iliIi,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = liiii1iI(d);
  const li1lIlli = {
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
        ...I1Illili,
        "method": l1iliIi,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return l1iliIi.indexOf("missionInviteList") > -1 && delete li1lIlli.params.admJson.actId, $.toStr(li1lIlli, li1lIlli);
}
function lIi1Il1I(iI1lli1i, lilIil) {
  return Math.floor(Math.random() * (lilIil - iI1lli1i)) + iI1lli1i;
}
function liiii1iI(lliI1Ii) {
  AppSecret = "83c3332212e84b9bb78bdabb13d3eec7";
  key = "fa04a65e82be";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(lliI1Ii));
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
async function I1lIi11I() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const lii111lI = CryptoJS.enc.Utf8.parse(id),
    i11Iil11 = CryptoJS.enc.Base64.stringify(lii111lI);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": i11Iil11,
      "od": "",
      "ov": "Ctq=",
      "ud": i11Iil11
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function liIliiil(I1IlI1i) {
  I1IlI1i = I1IlI1i || 32;
  let iI1iiil = "abcdef0123456789",
    iIiIiiiI = iI1iiil.length,
    ill1ii1l = "";
  for (i = 0; i < I1IlI1i; i++) ill1ii1l += iI1iiil.charAt(Math.floor(Math.random() * iIiIiiiI));
  return ill1ii1l;
}
function ll1i11i1(IlilII1i) {
  if (typeof IlilII1i == "string") {
    try {
      return JSON.parse(IlilII1i);
    } catch (I1IIlI1) {
      return console.log(I1IIlI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function l1iI1l1i() {
  if (!$.joinVenderId) return;
  return new Promise(async Il11IIII => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lIII1i1I = "";
    if ($.shopactivityId) lIII1i1I = ",\"activityId\":" + $.shopactivityId;
    const ii1lIili = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lIII1i1I + ",\"channel\":406}",
      iil11I1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ii1lIili)
      };
    for (var iIl1IIli = "", iiIllIli = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iIIii1iI = 0; iIIii1iI < 16; iIIii1iI++) {
      var lIIi11il = Math.round(Math.random() * (iiIllIli.length - 1));
      iIl1IIli += iiIllIli.substring(lIIi11il, lIIi11il + 1);
    }
    uuid = Buffer.from(iIl1IIli, "utf8").toString("base64");
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
    const i11iIiil = await iIiIi1ii("8adfb", iil11I1l),
      i1Ii1i1l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + ii1lIili + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i11iIiil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": lIiiIiII,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1Ii1i1l, async (II11i11i, I11lIiI1, lIlliiI1) => {
      try {
        if (II11i11i) I11lIiI1 && typeof I11lIiI1.statusCode != "undefined" && I11lIiI1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lIlliiI1 = lIlliiI1 && lIlliiI1.match(/jsonp_.*?\((.*?)\);/) && lIlliiI1.match(/jsonp_.*?\((.*?)\);/)[1] || lIlliiI1;
          let iI11ili1 = $.toObj(lIlliiI1, lIlliiI1);
          if (iI11ili1 && typeof iI11ili1 == "object") {
            if (iI11ili1 && iI11ili1.success === true) {
              console.log(" >> " + iI11ili1.message);
              $.errorJoinShop = iI11ili1.message;
              if (iI11ili1.result && iI11ili1.result.giftInfo) {
                for (let i1II1IiI of iI11ili1.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + i1II1IiI.discountString + i1II1IiI.prizeName + i1II1IiI.secondLineDesc);
                }
              }
            } else iI11ili1 && typeof iI11ili1 == "object" && iI11ili1.message ? ($.errorJoinShop = iI11ili1.message, console.log("" + (iI11ili1.message || ""))) : console.log(lIlliiI1);
          } else console.log(lIlliiI1);
        }
      } catch (lIiiiiIl) {
        $.logErr(lIiiiiIl, I11lIiI1);
      } finally {
        Il11IIII();
      }
    });
  });
}
async function Ilii1iiI() {
  return new Promise(async liii111 => {
    const IIl1Il1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iilI1ilI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIl1Il1l)
      };
    await $.wait(1000);
    const I1iIlIil = await iIiIi1ii("8adfb", iilI1ilI),
      i1lIili = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IIl1Il1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1iIlIil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": lIiiIiII,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1lIili, async (i1IIIIlI, Il1ll1l1, iI1liil1) => {
      try {
        if (i1IIIIlI) {
          Il1ll1l1 && typeof Il1ll1l1.statusCode != "undefined" && Il1ll1l1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          iI1liil1 = iI1liil1 && iI1liil1.match(/jsonp_.*?\((.*?)\);/) && iI1liil1.match(/jsonp_.*?\((.*?)\);/)[1] || iI1liil1;
          let l1Illl = $.toObj(iI1liil1, iI1liil1);
          l1Illl && typeof l1Illl == "object" ? l1Illl && l1Illl.success == true && (console.log("去加入：" + (l1Illl.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = l1Illl.result.interestsRuleList && l1Illl.result.interestsRuleList[0] && l1Illl.result.interestsRuleList[0].interestsInfo && l1Illl.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iI1liil1);
        }
      } catch (lIIi1ll) {
        $.logErr(lIIi1ll, Il1ll1l1);
      } finally {
        liii111();
      }
    });
  });
}
function il1ii11l(li1IIlii) {
  return new Promise(li1IIiil => {
    const iI1iII1l = {
      "url": li1IIlii + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iI1iII1l, async (Ii11illl, lIlIiIIl, lIIlli11) => {
      try {
        if (Ii11illl) $.getAuthorCodeListerr = false;else {
          if (lIIlli11) lIIlli11 = JSON.parse(lIIlli11);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1lIi111) {
        $.logErr(l1lIi111, lIlIiIIl);
        lIIlli11 = null;
      } finally {
        li1IIiil(lIIlli11);
      }
    });
  });
}
function lIi1Il1I(lI111I1l, ilIi1il1) {
  return Math.floor(Math.random() * (ilIi1il1 - lI111I1l)) + lI111I1l;
}
function iiiIIll1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const Ili1lll = Array.from(new Set($.blacklist.split("&")));
  console.log(Ili1lll.join("&") + "\n");
  let IlIIIIil = Ili1lll,
    lIlIl111 = [],
    IIlli1l1 = false;
  for (let lIli1iIi = 0; lIli1iIi < Ii1li1Ii.length; lIli1iIi++) {
    let iiIl = decodeURIComponent(Ii1li1Ii[lIli1iIi].match(/pt_pin=([^; ]+)(?=;?)/) && Ii1li1Ii[lIli1iIi].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!iiIl) break;
    let iIIiIilI = false;
    for (let li11ii1i of IlIIIIil) {
      if (li11ii1i && li11ii1i == iiIl) {
        iIIiIilI = true;
        break;
      }
    }
    !iIIiIilI && (IIlli1l1 = true, lIlIl111.splice(lIli1iIi, -1, Ii1li1Ii[lIli1iIi]));
  }
  if (IIlli1l1) Ii1li1Ii = lIlIl111;
}
function I1iil1ll(IiIil, i1IliI) {
  i1IliI != 0 && IiIil.unshift(IiIil.splice(i1IliI, 1)[0]);
}
function l1iil1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(Ii1li1Ii, Ii1li1Ii));
    return;
  }
  console.log("当前已设置白名单：");
  const I1I1I1Ii = Array.from(new Set($.whitelist.split("&")));
  console.log(I1I1I1Ii.join("&") + "\n");
  let iiilli = [],
    iii1llli = I1I1I1Ii;
  for (let illliIiI in Ii1li1Ii) {
    let IlIIliil = decodeURIComponent(Ii1li1Ii[illliIiI].match(/pt_pin=([^; ]+)(?=;?)/) && Ii1li1Ii[illliIiI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iii1llli.includes(IlIIliil) && iiilli.push(Ii1li1Ii[illliIiI]);
  }
  helpCookiesArr = iiilli;
  if (iii1llli.length > 1) for (let ilIl1IIi in iii1llli) {
    let I1I11lI = iii1llli[iii1llli.length - 1 - ilIl1IIi];
    if (!I1I11lI) continue;
    for (let iilIl1Il in helpCookiesArr) {
      let lli1iiII = decodeURIComponent(helpCookiesArr[iilIl1Il].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iilIl1Il].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      I1I11lI == lli1iiII && I1iil1ll(helpCookiesArr, iilIl1Il);
    }
  }
}