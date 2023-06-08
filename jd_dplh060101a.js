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
1 7 10,12 * * jd_dplh060101a.js, tag=大牌联合060101期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合060101期");
const iIiil1li = $.isNode() ? require("./jdCookie.js") : "",
  ll1i1lII = $.isNode() ? require("./sendNotify") : "";
let l1iliiI1 = [],
  i1Ii1I1l = "";
if ($.isNode()) {
  Object.keys(iIiil1li).forEach(iI1lilI1 => {
    l1iliiI1.push(iIiil1li[iI1lilI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1iliiI1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lI1IiiI1($.getdata("CookiesJD") || "[]").map(i1llI11I => i1llI11I.cookie)].filter(l11Ii1iI => !!l11Ii1iI);
let liii1iIl = "30",
  IiI1lIIi = "0";
liii1iIl = $.isNode() ? process.env.retrynum ? process.env.retrynum : liii1iIl : $.getdata("retrynum") ? $.getdata("retrynum") : IiI1lIIi;
IiI1lIIi = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : IiI1lIIi : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : IiI1lIIi;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let Ililli = "",
  IlI1II1l = "",
  l11IIi11 = "9a91d76e14c6407b_23060101";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const IilI1iIl = require("./function/krgetToken"),
  i111iIiI = require("./function/krh5st");
let ilIiI11i = "https://jinggengjcq-isv.isvjcloud.com";
IlI1II1l = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IlI1II1l : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IlI1II1l;
let lliili = "",
  l1lII1l1 = "";
$.whitelist = process.env.DPLHTY_whitelist || lliili;
$.blacklist = process.env.DPLHTY_blacklist || l1lII1l1;
IilIlIi1();
I1l1lIii();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = IlI1II1l ? IlI1II1l : authorCodeList[ill1i1(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + l11IIi11);
  console.log("\n💬 默认抽奖次数：" + IiI1lIIi + " 💬 重试次数：" + liii1iIl);
  console.log("\n💬 请在有水的情况下运行");
  if (!l1iliiI1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = l11IIi11;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let lIiliIi = 0; lIiliIi < l1iliiI1.length; lIiliIi++) {
    i1Ii1I1l = l1iliiI1[lIiliIi];
    if (i1Ii1I1l) {
      $.UserName = decodeURIComponent(i1Ii1I1l.match(/pt_pin=([^; ]+)(?=;?)/) && i1Ii1I1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIiliIi + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await ii11Ii11();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await i1Il11i1();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let IIl1i111 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + IIl1i111);
    if ($.isNode()) await ll1i1lII.sendNotify("" + $.name, "" + IIl1i111);
  }
})().catch(iil1iIl1 => $.logErr(iil1iIl1)).finally(() => $.done());
async function i1Il11i1() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    Ililli = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await IilI1iIl(i1Ii1I1l, ilIiI11i);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await IiiiIi1i("activity_load");
    for (let iII1iilI = 0; iII1iilI < liii1iIl; iII1iilI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await IiiiIi1i("activity_load");
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
    await IiiiIi1i("绑定");
    for (let i1liliii = 0; i1liliii < liii1iIl; i1liliii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await IiiiIi1i("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await IiiiIi1i("shopList");
    for (let lilIiIIl = 0; lilIiIIl < liii1iIl; lilIiIIl++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await IiiiIi1i("shopList");
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
        await IiiiIi1i("mission");
        for (let lliIIi1i = 0; lliIIi1i < liii1iIl; lliIIi1i++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await IiiiIi1i("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await lliIiIii();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("😤 呜呜呜，重试开卡");
            await $.wait(1000);
            await lliIiIii();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await IiiiIi1i("activity_load");
          for (let liIIiiIi = 0; liIIiiIi < liii1iIl; liIIiiIi++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await IiiiIi1i("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await IiiiIi1i("shopList");
          for (let l11i1ll = 0; l11i1ll < liii1iIl; l11i1ll++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await IiiiIi1i("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await IiiiIi1i("mission");
      for (let iIl1iiiI = 0; iIl1iiiI < liii1iIl; iIl1iiiI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await IiiiIi1i("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await IiiiIi1i("mission");
      for (let l1iI1ll = 0; l1iI1ll < liii1iIl; l1iI1ll++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await IiiiIi1i("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (IiI1lIIi + "" !== "0") {
      $.runFalag = true;
      let l1lii = parseInt($.totalPoint / 200);
      IiI1lIIi = parseInt(IiI1lIIi, 10);
      if (l1lii > IiI1lIIi) l1lii = IiI1lIIi;
      console.log("💖 抽奖次数为:" + l1lii);
      for (m = 1; l1lii--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await IiiiIi1i("抽奖");
        for (let llIiIiIl = 0; llIiIiIl < liii1iIl; llIiIiIl++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await IiiiIi1i("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(l1lii) <= 0) break;
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
  } catch (IililI1l) {
    console.log(IililI1l);
  }
}
async function IiiiIi1i(ii1lI1ll) {
  if ($.outFlag) return;
  let IlIilill = "https://jinggengjcq-isv.isvjcloud.com",
    IllIl1l1 = "",
    i1i1Ii1I = "POST",
    li11ll1 = "";
  switch (ii1lI1ll) {
    case "activity_load":
      url = IlIilill + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li11ll1 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) li11ll1 = {
        ...li11ll1,
        "shopId": "" + $.joinVenderId
      };
      IllIl1l1 = IIlIllli("/jdBigAlliance/activity/load", li11ll1);
      break;
    case "shopList":
      url = IlIilill + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li11ll1 = {};
      IllIl1l1 = IIlIllli("/jdBigAlliance/shop/shopList", li11ll1);
      break;
    case "绑定":
      url = IlIilill + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li11ll1 = {
        "inviterNick": $.inviteNick || ""
      };
      IllIl1l1 = IIlIllli("/jdBigAlliance/customer/inviteRelation", li11ll1);
      break;
    case "mission":
      url = IlIilill + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li11ll1 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) li11ll1 = {
        ...li11ll1,
        "shopId": $.joinVenderId
      };
      IllIl1l1 = IIlIllli("/jdBigAlliance/mission/completeMission", li11ll1);
      break;
    case "抽奖":
      url = IlIilill + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      li11ll1 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      IllIl1l1 = IIlIllli("/jdBigAlliance/interactive/drawPost", li11ll1);
      break;
    default:
      console.log("错误" + ii1lI1ll);
  }
  let lllIl1ii = iiliIi1(url, IllIl1l1, i1i1Ii1I);
  return new Promise(async Il1I1lIi => {
    $.post(lllIl1ii, (iIiIIIIl, Ill1i1li, i1i1IlIi) => {
      try {
        if (iIiIIIIl) {
          Ill1i1li && Ill1i1li.statusCode && Ill1i1li.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else Iil1IliI(ii1lI1ll, i1i1IlIi);
      } catch (I1lIiIi1) {
        console.log(I1lIiIi1, Ill1i1li);
      } finally {
        Il1I1lIi();
      }
    });
  });
}
async function Iil1IliI(IlIlilli, IIIl1IIi) {
  let lllllIll = "";
  try {
    $.krFlag = true;
    (IlIlilli != "accessLogWithAD" || IlIlilli != "drawContent") && IIIl1IIi && (lllllIll = JSON.parse(IIIl1IIi));
  } catch (iil1ilII) {
    console.log("🤬 " + IlIlilli + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let i1ilili1 = "";
    switch (IlIlilli) {
      case "抽奖":
        if (typeof lllllIll == "object") {
          if (lllllIll.success && lllllIll.success === true && lllllIll.data) {
            if (lllllIll.data.status && lllllIll.data.status == 200) {
              if (lllllIll.data.data.sendResult) console.log("抽中：" + lllllIll.data.data.awardSetting.awardName);else !lllllIll.data.data.result ? console.log("空气") : console.log(lllllIll.data.data);
            } else {
              if (lllllIll.data.status && lllllIll.data.status == 500) {
                console.log("" + (lllllIll.data.msg || ""));
              }
            }
          } else lllllIll.message ? console.log("" + (lllllIll.message || "")) : console.log(IIIl1IIi);
        } else console.log(IIIl1IIi);
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
        i1ilili1 = "";
        if (IlIlilli == "followShop") i1ilili1 = "关注";
        if (IlIlilli == "addCart") i1ilili1 = "加购";
        if (typeof lllllIll == "object") {
          if (lllllIll.success && lllllIll.success === true && lllllIll.data) {
            if (lllllIll.data.status && lllllIll.data.status == 200) {
              lllllIll = lllllIll.data;
              if (IlIlilli != "setMixNick" && (lllllIll.msg || lllllIll.data.isOpenCard || lllllIll.data.remark)) console.log("🔊 " + (i1ilili1 && i1ilili1 + ":" || "") + (lllllIll.msg || lllllIll.data.isOpenCard || lllllIll.data.remark || ""));
              if (IlIlilli == "activity_load") {
                if (lllllIll.msg || lllllIll.data.isOpenCard) {
                  if ((lllllIll.msg || lllllIll.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (lllllIll.data) {
                  $.endTime = lllllIll.data.cusActivity.endTime || 0;
                  $.MixNick = lllllIll.data.missionCustomer.buyerNick || "";
                  $.usedChance = lllllIll.data.missionCustomer.usedChance || 0;
                  $.totalPoint = lllllIll.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = lllllIll.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = lllllIll.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IlIlilli == "shopList") {
                  $.openList = lllllIll.data || [];
                } else {
                  if (IlIlilli == "mission") lllllIll.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (IlIlilli == "uniteOpenCardOne") $.uniteOpenCar = lllllIll.msg || lllllIll.data.msg || "";else {
                      if (IlIlilli == "myAward") {
                        console.log("🔊 我的奖品：");
                        let i1llIIii = 0;
                        for (let iiIII1 in lllllIll.data.list || []) {
                          let IliI1lll = lllllIll.data.list[iiIII1];
                          i1llIIii += Number(IliI1lll.awardDes);
                        }
                        if (i1llIIii > 0) console.log("🔊 共获得" + i1llIIii + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else {
                        if (IlIlilli == "missionInviteList") {
                          console.log("🔊 邀请人数(" + lllllIll.data.invitedLogList.total + ")");
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (lllllIll.data.msg) {
                lllllIll.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (lllllIll.data.msg || ""));
              } else {
                if (lllllIll.errorMessage) {
                  if (lllllIll.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (lllllIll.errorMessage || ""));
                } else console.log("" + IIIl1IIi);
              }
            }
          } else {
            if (lllllIll.errorMessage) console.log("🔊 " + (lllllIll.errorMessage || ""));else {
              console.log("" + IIIl1IIi);
            }
          }
        } else {}
        break;
      default:
        console.log((i1ilili1 || IlIlilli) + "-> " + IIIl1IIi);
    }
    if (typeof lllllIll == "object") {
      if (lllllIll.errorMessage) {
        if (lllllIll.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (l1lllIl1) {}
}
function iiliIi1(ilIiiI1I, iII1Ii11, l11l1II1 = "POST") {
  let lIii111l = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": i1Ii1I1l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return ilIiiI1I.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (lIii111l.Origin = "https://jinggengjcq-isv.isvjcloud.com", lIii111l["Content-Type"] = "application/json; charset=utf-8", delete lIii111l.Cookie), {
    "url": ilIiiI1I,
    "method": l11l1II1,
    "headers": lIii111l,
    "body": iII1Ii11,
    "timeout": 30 * 1000
  };
}
function IIlIllli(Ii1Ii1Ii, Il11I11) {
  d = {
    "actId": $.actId,
    ...Il11I11,
    "method": Ii1Ii1Ii,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = i1II1l1(d);
  const iIi11i1 = {
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
        ...Il11I11,
        "method": Ii1Ii1Ii,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return Ii1Ii1Ii.indexOf("missionInviteList") > -1 && delete iIi11i1.params.admJson.actId, $.toStr(iIi11i1, iIi11i1);
}
function ill1i1(ll1l1ilI, liI1lili) {
  return Math.floor(Math.random() * (liI1lili - ll1l1ilI)) + ll1l1ilI;
}
function i1II1l1(ilII1li1) {
  AppSecret = "f48a1287c6884fc1865febe5c7d62442";
  key = "9d72b1945f3c";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(ilII1li1));
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
async function ii11Ii11() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const Iil1il1 = CryptoJS.enc.Utf8.parse(id),
    li111Il1 = CryptoJS.enc.Base64.stringify(Iil1il1);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": li111Il1,
      "od": "",
      "ov": "Ctq=",
      "ud": li111Il1
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function iI1li1il(l1l1lili) {
  l1l1lili = l1l1lili || 32;
  let iI1liIi = "abcdef0123456789",
    Ii11iil1 = iI1liIi.length,
    l1lIilll = "";
  for (i = 0; i < l1l1lili; i++) l1lIilll += iI1liIi.charAt(Math.floor(Math.random() * Ii11iil1));
  return l1lIilll;
}
function lI1IiiI1(liIIlI11) {
  if (typeof liIIlI11 == "string") try {
    return JSON.parse(liIIlI11);
  } catch (iIlI1I) {
    return console.log(iIlI1I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function lliIiIii() {
  if (!$.joinVenderId) return;
  return new Promise(async IlI1lllI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lI1IIlli = "";
    if ($.shopactivityId) lI1IIlli = ",\"activityId\":" + $.shopactivityId;
    const lIlIl1I1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lI1IIlli + ",\"channel\":406}",
      i1llilII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lIlIl1I1)
      };
    for (var iI11i11I = "", IIlliI1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l1liiIl1 = 0; l1liiIl1 < 16; l1liiIl1++) {
      var llIlilll = Math.round(Math.random() * (IIlliI1.length - 1));
      iI11i11I += IIlliI1.substring(llIlilll, llIlilll + 1);
    }
    uuid = Buffer.from(iI11i11I, "utf8").toString("base64");
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
    const l1II1li = await i111iIiI("8adfb", i1llilII),
      l1il11 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lIlIl1I1 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1II1li),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": i1Ii1I1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1il11, async (l1l111II, II1lIiil, lI1i1iI) => {
      try {
        if (l1l111II) {
          II1lIiil && typeof II1lIiil.statusCode != "undefined" && II1lIiil.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          lI1i1iI = lI1i1iI && lI1i1iI.match(/jsonp_.*?\((.*?)\);/) && lI1i1iI.match(/jsonp_.*?\((.*?)\);/)[1] || lI1i1iI;
          let iIiil1iI = $.toObj(lI1i1iI, lI1i1iI);
          if (iIiil1iI && typeof iIiil1iI == "object") {
            if (iIiil1iI && iIiil1iI.success === true) {
              console.log(" >> " + iIiil1iI.message);
              $.errorJoinShop = iIiil1iI.message;
              if (iIiil1iI.result && iIiil1iI.result.giftInfo) for (let ilI1ii1I of iIiil1iI.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + ilI1ii1I.discountString + ilI1ii1I.prizeName + ilI1ii1I.secondLineDesc);
              }
            } else iIiil1iI && typeof iIiil1iI == "object" && iIiil1iI.message ? ($.errorJoinShop = iIiil1iI.message, console.log("" + (iIiil1iI.message || ""))) : console.log(lI1i1iI);
          } else console.log(lI1i1iI);
        }
      } catch (i11li1i1) {
        $.logErr(i11li1i1, II1lIiil);
      } finally {
        IlI1lllI();
      }
    });
  });
}
async function iiiiIIIl() {
  return new Promise(async I1IlIlII => {
    const I1Ii11l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iIlIIiII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1Ii11l)
      };
    await $.wait(1000);
    const il1li11 = await i111iIiI("8adfb", iIlIIiII),
      iIll1iIl = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I1Ii11l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(il1li11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": i1Ii1I1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIll1iIl, async (iIIIiiI1, IIi1lI1i, l1lil1Ii) => {
      try {
        if (iIIIiiI1) IIi1lI1i && typeof IIi1lI1i.statusCode != "undefined" && IIi1lI1i.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          l1lil1Ii = l1lil1Ii && l1lil1Ii.match(/jsonp_.*?\((.*?)\);/) && l1lil1Ii.match(/jsonp_.*?\((.*?)\);/)[1] || l1lil1Ii;
          let Ili1lli1 = $.toObj(l1lil1Ii, l1lil1Ii);
          if (Ili1lli1 && typeof Ili1lli1 == "object") {
            Ili1lli1 && Ili1lli1.success == true && (console.log("去加入：" + (Ili1lli1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = Ili1lli1.result.interestsRuleList && Ili1lli1.result.interestsRuleList[0] && Ili1lli1.result.interestsRuleList[0].interestsInfo && Ili1lli1.result.interestsRuleList[0].interestsInfo.activityId || "");
          } else console.log(l1lil1Ii);
        }
      } catch (iIIIi1Ii) {
        $.logErr(iIIIi1Ii, IIi1lI1i);
      } finally {
        I1IlIlII();
      }
    });
  });
}
function IiiIiiii(iiili1ll) {
  return new Promise(li1lIll1 => {
    const I1ilIlil = {
      "url": iiili1ll + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1ilIlil, async (i11IIIi, iI1ll11I, iiIIl1Il) => {
      try {
        if (i11IIIi) $.getAuthorCodeListerr = false;else {
          if (iiIIl1Il) iiIIl1Il = JSON.parse(iiIIl1Il);
          $.getAuthorCodeListerr = true;
        }
      } catch (iiI1Ii1i) {
        $.logErr(iiI1Ii1i, iI1ll11I);
        iiIIl1Il = null;
      } finally {
        li1lIll1(iiIIl1Il);
      }
    });
  });
}
function ill1i1(liIiIII, iI1lIIII) {
  return Math.floor(Math.random() * (iI1lIIII - liIiIII)) + liIiIII;
}
function I1l1lIii() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const I1Ili1i1 = Array.from(new Set($.blacklist.split("&")));
  console.log(I1Ili1i1.join("&") + "\n");
  let IlIl1iIi = I1Ili1i1,
    lIl111l1 = [],
    llllil1I = false;
  for (let ililIi = 0; ililIi < l1iliiI1.length; ililIi++) {
    let iIiI1111 = decodeURIComponent(l1iliiI1[ililIi].match(/pt_pin=([^; ]+)(?=;?)/) && l1iliiI1[ililIi].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!iIiI1111) break;
    let lI1iIili = false;
    for (let II1l1li of IlIl1iIi) {
      if (II1l1li && II1l1li == iIiI1111) {
        lI1iIili = true;
        break;
      }
    }
    !lI1iIili && (llllil1I = true, lIl111l1.splice(ililIi, -1, l1iliiI1[ililIi]));
  }
  if (llllil1I) l1iliiI1 = lIl111l1;
}
function l111IIl(l1l1iI1, Iiili1i1) {
  if (Iiili1i1 != 0) {
    l1l1iI1.unshift(l1l1iI1.splice(Iiili1i1, 1)[0]);
  }
}
function IilIlIi1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(l1iliiI1, l1iliiI1));
    return;
  }
  console.log("当前已设置白名单：");
  const ili1III = Array.from(new Set($.whitelist.split("&")));
  console.log(ili1III.join("&") + "\n");
  let l1iiIiI1 = [],
    iiI1llIi = ili1III;
  for (let ilIIl1 in l1iliiI1) {
    let i1li11l1 = decodeURIComponent(l1iliiI1[ilIIl1].match(/pt_pin=([^; ]+)(?=;?)/) && l1iliiI1[ilIIl1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iiI1llIi.includes(i1li11l1) && l1iiIiI1.push(l1iliiI1[ilIIl1]);
  }
  helpCookiesArr = l1iiIiI1;
  if (iiI1llIi.length > 1) for (let iiIiilil in iiI1llIi) {
    let IIIiIl1I = iiI1llIi[iiI1llIi.length - 1 - iiIiilil];
    if (!IIIiIl1I) continue;
    for (let lIIi1l1l in helpCookiesArr) {
      let lIiI1i1l = decodeURIComponent(helpCookiesArr[lIIi1l1l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lIIi1l1l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      IIIiIl1I == lIiI1i1l && l111IIl(helpCookiesArr, lIIi1l1l);
    }
  }
}