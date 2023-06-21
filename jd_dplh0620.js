/*
大牌联合0620期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230620cxc/oC20230620cxc?actId=d64cf80dc205410a83beb9685b07_230620

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
#大牌联合0620期
1 10 22,24 * * jd_dplh0620.js, tag=大牌联合0620期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0620期");
const i1ll1i1i = $.isNode() ? require("./jdCookie.js") : "",
  II11iI1 = $.isNode() ? require("./sendNotify") : "";
let i1i1ll1 = [],
  iIIiiil1 = "";
if ($.isNode()) {
  Object.keys(i1ll1i1i).forEach(iiiIiIi => {
    i1i1ll1.push(i1ll1i1i[iiiIiIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1i1ll1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IlilIIil($.getdata("CookiesJD") || "[]").map(Ill11ill => Ill11ill.cookie)].filter(iIiiili => !!iIiiili);
let lI1I1Iii = "30",
  l1IlIII = "0";
lI1I1Iii = $.isNode() ? process.env.retrynum ? process.env.retrynum : lI1I1Iii : $.getdata("retrynum") ? $.getdata("retrynum") : l1IlIII;
l1IlIII = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : l1IlIII : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : l1IlIII;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lII11II = "",
  Il1Il1Ii = "",
  lIIilI1I = "d64cf80dc205410a83beb9685b07_230620";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const l1l1lI11 = require("./function/krgetToken"),
  II1Ii11l = require("./function/krh5st");
let Iil11iI = "https://jinggengjcq-isv.isvjcloud.com";
Il1Il1Ii = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + Il1Il1Ii : $.getdata("helpnum") ? $.getdata("helpnum") : "" + Il1Il1Ii;
let iIi1l11i = "",
  il1iiiiI = "";
$.whitelist = process.env.DPLHTY_whitelist || iIi1l11i;
$.blacklist = process.env.DPLHTY_blacklist || il1iiiiI;
llIiI1i1();
I11IIl1();
!(async () => {
    authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];

  $.authorCode = Il1Il1Ii ? Il1Il1Ii : authorCodeList[ilI1Ii1l(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + lIIilI1I);
  console.log("\n💬 默认抽奖次数：" + l1IlIII + " 💬 重试次数：" + lI1I1Iii);
  console.log("\n💬 请在有水的情况下运行");
  if (!i1i1ll1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = lIIilI1I;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let l1llili = 0; l1llili < i1i1ll1.length; l1llili++) {
    iIIiiil1 = i1i1ll1[l1llili];
    if (iIIiiil1) {
      $.UserName = decodeURIComponent(iIIiiil1.match(/pt_pin=([^; ]+)(?=;?)/) && iIIiiil1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1llili + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await llliIIli();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await liiIlII();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let illlll1i = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + illlll1i);
    if ($.isNode()) await II11iI1.sendNotify("" + $.name, "" + illlll1i);
  }
})().catch(iIiil11I => $.logErr(iIiil11I)).finally(() => $.done());
async function liiIlII() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    lII11II = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await l1l1lI11(iIIiiil1, Iil11iI);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await iiIiiIii("activity_load");
    for (let IIliiiI1 = 0; IIliiiI1 < lI1I1Iii; IIliiiI1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iiIiiIii("activity_load");
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
    await iiIiiIii("绑定");
    for (let I11IiIll = 0; I11IiIll < lI1I1Iii; I11IiIll++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iiIiiIii("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await iiIiiIii("shopList");
    for (let i1ll11li = 0; i1ll11li < lI1I1Iii; i1ll11li++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iiIiiIii("shopList");
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
        await iiIiiIii("mission");
        for (let IilIllIi = 0; IilIllIi < lI1I1Iii; IilIllIi++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iiIiiIii("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await l1liIlii();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await l1liIlii(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iiIiiIii("activity_load");
          for (let iIiliIli = 0; iIiliIli < lI1I1Iii; iIiliIli++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iiIiiIii("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iiIiiIii("shopList");
          for (let l111Il = 0; l111Il < lI1I1Iii; l111Il++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await iiIiiIii("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await iiIiiIii("mission");
      for (let IIIlIll1 = 0; IIIlIll1 < lI1I1Iii; IIIlIll1++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iiIiiIii("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await iiIiiIii("mission");
      for (let lI1111il = 0; lI1111il < lI1I1Iii; lI1111il++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await iiIiiIii("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (l1IlIII + "" !== "0") {
      $.runFalag = true;
      let il11IIli = parseInt($.totalPoint / 200);
      l1IlIII = parseInt(l1IlIII, 10);
      if (il11IIli > l1IlIII) il11IIli = l1IlIII;
      console.log("💖 抽奖次数为:" + il11IIli);
      for (m = 1; il11IIli--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await iiIiiIii("抽奖");
        for (let ilIliil1 = 0; ilIliil1 < lI1I1Iii; ilIliil1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await iiIiiIii("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(il11IIli) <= 0) break;
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
  } catch (IlIil11) {
    console.log(IlIil11);
  }
}
async function iiIiiIii(liI1Il) {
  if ($.outFlag) return;
  let i1llIIl1 = "https://jinggengjcq-isv.isvjcloud.com",
    i1ill1iI = "",
    l1liI1Ii = "POST",
    iIi11l = "";
  switch (liI1Il) {
    case "activity_load":
      url = i1llIIl1 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIi11l = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) iIi11l = {
        ...iIi11l,
        "shopId": "" + $.joinVenderId
      };
      i1ill1iI = l1iIIIlI("/jdBigAlliance/activity/load", iIi11l);
      break;
    case "shopList":
      url = i1llIIl1 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIi11l = {};
      i1ill1iI = l1iIIIlI("/jdBigAlliance/shop/shopList", iIi11l);
      break;
    case "绑定":
      url = i1llIIl1 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIi11l = {
        "inviterNick": $.inviteNick || ""
      };
      i1ill1iI = l1iIIIlI("/jdBigAlliance/customer/inviteRelation", iIi11l);
      break;
    case "mission":
      url = i1llIIl1 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIi11l = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) iIi11l = {
        ...iIi11l,
        "shopId": $.joinVenderId
      };
      i1ill1iI = l1iIIIlI("/jdBigAlliance/mission/completeMission", iIi11l);
      break;
    case "抽奖":
      url = i1llIIl1 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      iIi11l = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      i1ill1iI = l1iIIIlI("/jdBigAlliance/interactive/drawPost", iIi11l);
      break;
    default:
      console.log("错误" + liI1Il);
  }
  let i1ii1i1 = i1iI1l(url, i1ill1iI, l1liI1Ii);
  return new Promise(async IiIiIii => {
    $.post(i1ii1i1, (l11IlIl1, lII1Iiii, ilIl1llI) => {
      try {
        l11IlIl1 ? (lII1Iiii && lII1Iiii.statusCode && lII1Iiii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : Ii1ilIIl(liI1Il, ilIl1llI);
      } catch (II1Illil) {
        console.log(II1Illil, lII1Iiii);
      } finally {
        IiIiIii();
      }
    });
  });
}
async function Ii1ilIIl(Illl1lil, iI1IIi) {
  let lIlIi1l = "";
  try {
    $.krFlag = true;
    if (Illl1lil != "accessLogWithAD" || Illl1lil != "drawContent") {
      if (iI1IIi) {
        lIlIi1l = JSON.parse(iI1IIi);
      }
    }
  } catch (iiIiiii1) {
    console.log("🤬 " + Illl1lil + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let i1IlI1lI = "";
    switch (Illl1lil) {
      case "抽奖":
        if (typeof lIlIi1l == "object") {
          if (lIlIi1l.success && lIlIi1l.success === true && lIlIi1l.data) {
            if (lIlIi1l.data.status && lIlIi1l.data.status == 200) {
              if (lIlIi1l.data.data.sendResult) {
                console.log("抽中：" + lIlIi1l.data.data.awardSetting.awardName);
              } else !lIlIi1l.data.data.result ? console.log("空气") : console.log(lIlIi1l.data.data);
            } else lIlIi1l.data.status && lIlIi1l.data.status == 500 && console.log("" + (lIlIi1l.data.msg || ""));
          } else lIlIi1l.message ? console.log("" + (lIlIi1l.message || "")) : console.log(iI1IIi);
        } else console.log(iI1IIi);
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
        i1IlI1lI = "";
        if (Illl1lil == "followShop") i1IlI1lI = "关注";
        if (Illl1lil == "addCart") i1IlI1lI = "加购";
        if (typeof lIlIi1l == "object") {
          if (lIlIi1l.success && lIlIi1l.success === true && lIlIi1l.data) {
            if (lIlIi1l.data.status && lIlIi1l.data.status == 200) {
              lIlIi1l = lIlIi1l.data;
              if (Illl1lil != "setMixNick" && (lIlIi1l.msg || lIlIi1l.data.isOpenCard || lIlIi1l.data.remark)) console.log("🔊 " + (i1IlI1lI && i1IlI1lI + ":" || "") + (lIlIi1l.msg || lIlIi1l.data.isOpenCard || lIlIi1l.data.remark || ""));
              if (Illl1lil == "activity_load") {
                if (lIlIi1l.msg || lIlIi1l.data.isOpenCard) {
                  if ((lIlIi1l.msg || lIlIi1l.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                lIlIi1l.data && ($.endTime = lIlIi1l.data.cusActivity.endTime || 0, $.MixNick = lIlIi1l.data.missionCustomer.buyerNick || "", $.usedChance = lIlIi1l.data.missionCustomer.usedChance || 0, $.totalPoint = lIlIi1l.data.missionCustomer.totalPoint || 0, $.hasCollectShop = lIlIi1l.data.missionCustomer.hasCollectShop || 0, $.hasAddCart = lIlIi1l.data.missionCustomer.hasAddCart || 0);
              } else {
                if (Illl1lil == "shopList") $.openList = lIlIi1l.data || [];else {
                  if (Illl1lil == "mission") lIlIi1l.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (Illl1lil == "uniteOpenCardOne") {
                      $.uniteOpenCar = lIlIi1l.msg || lIlIi1l.data.msg || "";
                    } else {
                      if (Illl1lil == "myAward") {
                        console.log("🔊 我的奖品：");
                        let I11iii1 = 0;
                        for (let Ill1ilI1 in lIlIi1l.data.list || []) {
                          let IiIi1111 = lIlIi1l.data.list[Ill1ilI1];
                          I11iii1 += Number(IiIi1111.awardDes);
                        }
                        if (I11iii1 > 0) console.log("🔊 共获得" + I11iii1 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else Illl1lil == "missionInviteList" && console.log("🔊 邀请人数(" + lIlIi1l.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (lIlIi1l.data.msg) {
                lIlIi1l.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (lIlIi1l.data.msg || ""));
              } else {
                if (lIlIi1l.errorMessage) {
                  if (lIlIi1l.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (lIlIi1l.errorMessage || ""));
                } else console.log("" + iI1IIi);
              }
            }
          } else {
            if (lIlIi1l.errorMessage) {
              console.log("🔊 " + (lIlIi1l.errorMessage || ""));
            } else console.log("" + iI1IIi);
          }
        } else {}
        break;
      default:
        console.log((i1IlI1lI || Illl1lil) + "-> " + iI1IIi);
    }
    if (typeof lIlIi1l == "object") {
      if (lIlIi1l.errorMessage) {
        if (lIlIi1l.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (Illli1) {}
}
function i1iI1l(l1ii1lil, lIlII11i, ili1lil1 = "POST") {
  let IiIl1II1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iIIiiil1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return l1ii1lil.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (IiIl1II1.Origin = "https://jinggengjcq-isv.isvjcloud.com", IiIl1II1["Content-Type"] = "application/json; charset=utf-8", delete IiIl1II1.Cookie), {
    "url": l1ii1lil,
    "method": ili1lil1,
    "headers": IiIl1II1,
    "body": lIlII11i,
    "timeout": 30 * 1000
  };
}
function l1iIIIlI(lIliiIl1, iIIlIll1) {
  d = {
    "actId": $.actId,
    ...iIIlIll1,
    "method": lIliiIl1,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = lI1I1II(d);
  const iilIIII1 = {
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
        ...iIIlIll1,
        "method": lIliiIl1,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return lIliiIl1.indexOf("missionInviteList") > -1 && delete iilIIII1.params.admJson.actId, $.toStr(iilIIII1, iilIIII1);
}
function ilI1Ii1l(Ii1il1i1, lIIiliIl) {
  return Math.floor(Math.random() * (lIIiliIl - Ii1il1i1)) + Ii1il1i1;
}
function lI1I1II(I1lI11ll) {
  return AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed", key = "c1614da9ac68", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(I1lI11ll)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
    "sign": sign,
    "timeStamp": time2
  };
}
async function llliIIli() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const iI1lI1Il = CryptoJS.enc.Utf8.parse(id),
    III1liI1 = CryptoJS.enc.Base64.stringify(iI1lI1Il);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": III1liI1,
      "od": "",
      "ov": "Ctq=",
      "ud": III1liI1
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function iIIiliI1(II1ill1) {
  II1ill1 = II1ill1 || 32;
  let i111liI = "abcdef0123456789",
    i1Il1il1 = i111liI.length,
    IllII1lI = "";
  for (i = 0; i < II1ill1; i++) IllII1lI += i111liI.charAt(Math.floor(Math.random() * i1Il1il1));
  return IllII1lI;
}
function IlilIIil(III11lil) {
  if (typeof III11lil == "string") try {
    return JSON.parse(III11lil);
  } catch (illiili) {
    return console.log(illiili), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function l1liIlii() {
  if (!$.joinVenderId) return;
  return new Promise(async lillIlii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l1I1Iii = "";
    if ($.shopactivityId) l1I1Iii = ",\"activityId\":" + $.shopactivityId;
    const lI1ililI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l1I1Iii + ",\"channel\":406}",
      l1Ili1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lI1ililI)
      };
    for (var ii11li1i = "", ii111iI1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", II111ill = 0; II111ill < 16; II111ill++) {
      var l1i1l1Ii = Math.round(Math.random() * (ii111iI1.length - 1));
      ii11li1i += ii111iI1.substring(l1i1l1Ii, l1i1l1Ii + 1);
    }
    uuid = Buffer.from(ii11li1i, "utf8").toString("base64");
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
    const lilll1Ii = await II1Ii11l("8adfb", l1Ili1),
      liII1i1l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lI1ililI + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lilll1Ii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIIiiil1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liII1i1l, async (Il1Ii1iI, l1IiIllI, iillli) => {
      try {
        if (Il1Ii1iI) l1IiIllI && typeof l1IiIllI.statusCode != "undefined" && l1IiIllI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iillli = iillli && iillli.match(/jsonp_.*?\((.*?)\);/) && iillli.match(/jsonp_.*?\((.*?)\);/)[1] || iillli;
          let lll1IiI1 = $.toObj(iillli, iillli);
          if (lll1IiI1 && typeof lll1IiI1 == "object") {
            if (lll1IiI1 && lll1IiI1.success === true) {
              console.log(" >> " + lll1IiI1.message);
              $.errorJoinShop = lll1IiI1.message;
              if (lll1IiI1.result && lll1IiI1.result.giftInfo) {
                for (let II1Iilli of lll1IiI1.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + II1Iilli.discountString + II1Iilli.prizeName + II1Iilli.secondLineDesc);
                }
              }
            } else lll1IiI1 && typeof lll1IiI1 == "object" && lll1IiI1.message ? ($.errorJoinShop = lll1IiI1.message, console.log("" + (lll1IiI1.message || ""))) : console.log(iillli);
          } else console.log(iillli);
        }
      } catch (llIi1liI) {
        $.logErr(llIi1liI, l1IiIllI);
      } finally {
        lillIlii();
      }
    });
  });
}
async function lII1IIIi() {
  return new Promise(async lIilIiil => {
    const ilIilIII = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      llI1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ilIilIII)
      };
    await $.wait(1000);
    const li1Ii1II = await II1Ii11l("8adfb", llI1i),
      l1IIlIlI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ilIilIII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(li1Ii1II),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIIiiil1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1IIlIlI, async (Il1ilI1I, l1ii1lIl, IiIiII1i) => {
      try {
        if (Il1ilI1I) {
          if (l1ii1lIl && typeof l1ii1lIl.statusCode != "undefined") {
            if (l1ii1lIl.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          IiIiII1i = IiIiII1i && IiIiII1i.match(/jsonp_.*?\((.*?)\);/) && IiIiII1i.match(/jsonp_.*?\((.*?)\);/)[1] || IiIiII1i;
          let I1ilIIll = $.toObj(IiIiII1i, IiIiII1i);
          I1ilIIll && typeof I1ilIIll == "object" ? I1ilIIll && I1ilIIll.success == true && (console.log("去加入：" + (I1ilIIll.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = I1ilIIll.result.interestsRuleList && I1ilIIll.result.interestsRuleList[0] && I1ilIIll.result.interestsRuleList[0].interestsInfo && I1ilIIll.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(IiIiII1i);
        }
      } catch (iil1Ii1l) {
        $.logErr(iil1Ii1l, l1ii1lIl);
      } finally {
        lIilIiil();
      }
    });
  });
}
function lIl11ill(lIliI1l1) {
  return new Promise(IIIlIl1 => {
    const lIIl11I1 = {
      "url": lIliI1l1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIIl11I1, async (Iill1ll, Iii, I1I1liil) => {
      try {
        if (Iill1ll) $.getAuthorCodeListerr = false;else {
          if (I1I1liil) I1I1liil = JSON.parse(I1I1liil);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1ilIIi1) {
        $.logErr(l1ilIIi1, Iii);
        I1I1liil = null;
      } finally {
        IIIlIl1(I1I1liil);
      }
    });
  });
}
function ilI1Ii1l(I1i1IIi, i1iIIiI) {
  return Math.floor(Math.random() * (i1iIIiI - I1i1IIi)) + I1i1IIi;
}
function I11IIl1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const IiiIiII = Array.from(new Set($.blacklist.split("&")));
  console.log(IiiIiII.join("&") + "\n");
  let li1l1li1 = IiiIiII,
    lIIi111 = [],
    ilI11i11 = false;
  for (let IIIIi1I = 0; IIIIi1I < i1i1ll1.length; IIIIi1I++) {
    let lI1l1l1I = decodeURIComponent(i1i1ll1[IIIIi1I].match(/pt_pin=([^; ]+)(?=;?)/) && i1i1ll1[IIIIi1I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!lI1l1l1I) break;
    let ilIlIIli = false;
    for (let llI1i1ii of li1l1li1) {
      if (llI1i1ii && llI1i1ii == lI1l1l1I) {
        ilIlIIli = true;
        break;
      }
    }
    !ilIlIIli && (ilI11i11 = true, lIIi111.splice(IIIIi1I, -1, i1i1ll1[IIIIi1I]));
  }
  if (ilI11i11) i1i1ll1 = lIIi111;
}
function llilIiII(i1Il11i1, iIiIlIil) {
  iIiIlIil != 0 && i1Il11i1.unshift(i1Il11i1.splice(iIiIlIil, 1)[0]);
}
function llIiI1i1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(i1i1ll1, i1i1ll1));
    return;
  }
  console.log("当前已设置白名单：");
  const I1lilIII = Array.from(new Set($.whitelist.split("&")));
  console.log(I1lilIII.join("&") + "\n");
  let IilI11lI = [],
    II1i1ill = I1lilIII;
  for (let Il11l1ii in i1i1ll1) {
    let IilIliI = decodeURIComponent(i1i1ll1[Il11l1ii].match(/pt_pin=([^; ]+)(?=;?)/) && i1i1ll1[Il11l1ii].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    II1i1ill.includes(IilIliI) && IilI11lI.push(i1i1ll1[Il11l1ii]);
  }
  helpCookiesArr = IilI11lI;
  if (II1i1ill.length > 1) {
    for (let I1iI1IiI in II1i1ill) {
      let Il1lIili = II1i1ill[II1i1ill.length - 1 - I1iI1IiI];
      if (!Il1lIili) continue;
      for (let i1I1iiI in helpCookiesArr) {
        let I11iIii1 = decodeURIComponent(helpCookiesArr[i1I1iiI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[i1I1iiI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        Il1lIili == I11iIii1 && llilIiII(helpCookiesArr, i1I1iiI);
      }
    }
  }
}