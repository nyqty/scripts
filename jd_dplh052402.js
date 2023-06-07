/*
大牌联合052402期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023052402cxc/oC2023052402cxc?actId=ece1f0e31eae4622b6f1ec_23052402

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
#大牌联合052402期
1 1 1 1 * jd_dplh052402.js, tag=大牌联合052402期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合052402期");
const Il11li = $.isNode() ? require("./jdCookie.js") : "",
  lI1ll1i1 = $.isNode() ? require("./sendNotify") : "";
let liI11ii = [],
  IIli11iI = "";
if ($.isNode()) {
  Object.keys(Il11li).forEach(ililiIil => {
    liI11ii.push(Il11li[ililiIil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else liI11ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ii1li111($.getdata("CookiesJD") || "[]").map(lII1IiIi => lII1IiIi.cookie)].filter(i1ll11Il => !!i1ll11Il);
let ilIiI1 = "30",
  IllII111 = "0";
ilIiI1 = $.isNode() ? process.env.retrynum ? process.env.retrynum : ilIiI1 : $.getdata("retrynum") ? $.getdata("retrynum") : IllII111;
IllII111 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : IllII111 : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : IllII111;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lIiIiI1I = "",
  IIIiil1I = "",
  l1IiiIl1 = "ece1f0e31eae4622b6f1ec_23052402";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const Ii1II111 = require("./function/krgetToken"),
  Il1IIIii = require("./function/krh5st");
let l11l11l1 = "https://jinggengjcq-isv.isvjcloud.com";
IIIiil1I = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IIIiil1I : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IIIiil1I;
let IilIIilI = "",
  IlIl11l = "";
$.whitelist = process.env.DPLHTY_whitelist || IilIIilI;
$.blacklist = process.env.DPLHTY_blacklist || IlIl11l;
Il1illlI();
I1Ii1iiI();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = IIIiil1I ? IIIiil1I : authorCodeList[II1IIIl1(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + l1IiiIl1);
  console.log("\n💬 默认抽奖次数：" + IllII111 + " 💬 重试次数：" + ilIiI1);
  console.log("\n💬 请在有水的情况下运行");
  if (!liI11ii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = l1IiiIl1;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let illllIl1 = 0; illllIl1 < liI11ii.length; illllIl1++) {
    IIli11iI = liI11ii[illllIl1];
    if (IIli11iI) {
      $.UserName = decodeURIComponent(IIli11iI.match(/pt_pin=([^; ]+)(?=;?)/) && IIli11iI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = illllIl1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await lll1Ii1();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await lilllilI();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let Illiill = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + Illiill);
    if ($.isNode()) await lI1ll1i1.sendNotify("" + $.name, "" + Illiill);
  }
})().catch(iIIIi111 => $.logErr(iIIIi111)).finally(() => $.done());
async function lilllilI() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    lIiIiI1I = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await Ii1II111(IIli11iI, l11l11l1);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await l1iIl1ii("activity_load");
    for (let liil11iI = 0; liil11iI < ilIiI1; liil11iI++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await l1iIl1ii("activity_load");
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
    await l1iIl1ii("绑定");
    for (let il1Iill1 = 0; il1Iill1 < ilIiI1; il1Iill1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await l1iIl1ii("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    await l1iIl1ii("shopList");
    for (let Ii1lIIIi = 0; Ii1lIIIi < ilIiI1; Ii1lIIIi++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await l1iIl1ii("shopList");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if ($.activityEnd) return;
    for (o of $.openList) {
      $.missionType = "openCard";
      if (o.open != true && o.openCardUrl) {
        if ($.activityEnd) return;
        if ($.outEnd) return;
        $.openCard = false;
        $.joinVenderId = o.userId;
        await l1iIl1ii("mission");
        for (let II1il = 0; II1il < ilIiI1; II1il++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await l1iIl1ii("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await Iiliii1i();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await Iiliii1i(), await $.wait(parseInt(Math.random() * 1500 + 2000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await l1iIl1ii("activity_load");
          for (let I1i1iIIl = 0; I1i1iIIl < ilIiI1; I1i1iIIl++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await l1iIl1ii("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await l1iIl1ii("shopList");
          for (let illill1 = 0; illill1 < ilIiI1; illill1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await l1iIl1ii("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await l1iIl1ii("mission");
      for (let liliIIi = 0; liliIIi < ilIiI1; liliIIi++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await l1iIl1ii("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await l1iIl1ii("mission");
      for (let IIilIiI1 = 0; IIilIiI1 < ilIiI1; IIilIiI1++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await l1iIl1ii("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (IllII111 + "" !== "0") {
      $.runFalag = true;
      let ill1IIII = parseInt($.totalPoint / 200);
      IllII111 = parseInt(IllII111, 10);
      if (ill1IIII > IllII111) ill1IIII = IllII111;
      console.log("💖 抽奖次数为:" + ill1IIII);
      for (m = 1; ill1IIII--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await l1iIl1ii("抽奖");
        for (let l1iIi1li = 0; l1iIi1li < ilIiI1; l1iIi1li++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await l1iIl1ii("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(ill1IIII) <= 0) break;
        if (m >= 10) {
          console.log("💔 抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
    if ($.index == 1) {
      $.inviteNick = $.MixNick;
      console.log("🔊 后面的号都会助力:" + $.inviteNick);
    }
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
  } catch (l1liiIiI) {
    console.log(l1liiIiI);
  }
}
async function l1iIl1ii(i1iiiii) {
  if ($.outFlag) return;
  let lIlllllI = "https://jinggengjcq-isv.isvjcloud.com",
    Il1ii111 = "",
    I1i1llIi = "POST",
    l1iIII1I = "";
  switch (i1iiiii) {
    case "activity_load":
      url = lIlllllI + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iIII1I = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) l1iIII1I = {
        ...l1iIII1I,
        "shopId": "" + $.joinVenderId
      };
      Il1ii111 = ilIi1iI("/jdBigAlliance/activity/load", l1iIII1I);
      break;
    case "shopList":
      url = lIlllllI + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iIII1I = {};
      Il1ii111 = ilIi1iI("/jdBigAlliance/shop/shopList", l1iIII1I);
      break;
    case "绑定":
      url = lIlllllI + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iIII1I = {
        "inviterNick": $.inviteNick || ""
      };
      Il1ii111 = ilIi1iI("/jdBigAlliance/customer/inviteRelation", l1iIII1I);
      break;
    case "mission":
      url = lIlllllI + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iIII1I = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) l1iIII1I = {
        ...l1iIII1I,
        "shopId": $.joinVenderId
      };
      Il1ii111 = ilIi1iI("/jdBigAlliance/mission/completeMission", l1iIII1I);
      break;
    case "抽奖":
      url = lIlllllI + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1iIII1I = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      Il1ii111 = ilIi1iI("/jdBigAlliance/interactive/drawPost", l1iIII1I);
      break;
    default:
      console.log("错误" + i1iiiii);
  }
  let lilli1l1 = lIiIiII(url, Il1ii111, I1i1llIi);
  return new Promise(async llI1lli1 => {
    $.post(lilli1l1, (iIili111, liiiI11, lIliIi) => {
      try {
        if (iIili111) {
          liiiI11 && liiiI11.statusCode && liiiI11.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else iiI1II1l(i1iiiii, lIliIi);
      } catch (llIl1I11) {
        console.log(llIl1I11, liiiI11);
      } finally {
        llI1lli1();
      }
    });
  });
}
async function iiI1II1l(lIl1iiII, IiI1ii1) {
  let li1II1lI = "";
  try {
    $.krFlag = true;
    (lIl1iiII != "accessLogWithAD" || lIl1iiII != "drawContent") && IiI1ii1 && (li1II1lI = JSON.parse(IiI1ii1));
  } catch (iiili1I1) {
    console.log("🤬 " + lIl1iiII + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let IlIil1iI = "";
    switch (lIl1iiII) {
      case "抽奖":
        if (typeof li1II1lI == "object") {
          if (li1II1lI.success && li1II1lI.success === true && li1II1lI.data) {
            if (li1II1lI.data.status && li1II1lI.data.status == 200) {
              if (li1II1lI.data.data.sendResult) {
                console.log("抽中：" + li1II1lI.data.data.awardSetting.awardName);
              } else !li1II1lI.data.data.result ? console.log("空气") : console.log(li1II1lI.data.data);
            } else li1II1lI.data.status && li1II1lI.data.status == 500 && console.log("" + (li1II1lI.data.msg || ""));
          } else li1II1lI.message ? console.log("" + (li1II1lI.message || "")) : console.log(IiI1ii1);
        } else console.log(IiI1ii1);
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
        IlIil1iI = "";
        if (lIl1iiII == "followShop") IlIil1iI = "关注";
        if (lIl1iiII == "addCart") IlIil1iI = "加购";
        if (typeof li1II1lI == "object") {
          if (li1II1lI.success && li1II1lI.success === true && li1II1lI.data) {
            if (li1II1lI.data.status && li1II1lI.data.status == 200) {
              li1II1lI = li1II1lI.data;
              if (lIl1iiII != "setMixNick" && (li1II1lI.msg || li1II1lI.data.isOpenCard || li1II1lI.data.remark)) console.log("🔊 " + (IlIil1iI && IlIil1iI + ":" || "") + (li1II1lI.msg || li1II1lI.data.isOpenCard || li1II1lI.data.remark || ""));
              if (lIl1iiII == "activity_load") {
                if (li1II1lI.msg || li1II1lI.data.isOpenCard) {
                  if ((li1II1lI.msg || li1II1lI.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (li1II1lI.data) {
                  $.endTime = li1II1lI.data.cusActivity.endTime || 0;
                  $.MixNick = li1II1lI.data.missionCustomer.buyerNick || "";
                  $.usedChance = li1II1lI.data.missionCustomer.usedChance || 0;
                  $.totalPoint = li1II1lI.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = li1II1lI.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = li1II1lI.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (lIl1iiII == "shopList") $.openList = li1II1lI.data || [];else {
                  if (lIl1iiII == "mission") {
                    li1II1lI.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;
                  } else {
                    if (lIl1iiII == "uniteOpenCardOne") {
                      $.uniteOpenCar = li1II1lI.msg || li1II1lI.data.msg || "";
                    } else {
                      if (lIl1iiII == "myAward") {
                        console.log("🔊 我的奖品：");
                        let i1iliiil = 0;
                        for (let I1llI11i in li1II1lI.data.list || []) {
                          let II1iI1i1 = li1II1lI.data.list[I1llI11i];
                          i1iliiil += Number(II1iI1i1.awardDes);
                        }
                        if (i1iliiil > 0) console.log("🔊 共获得" + i1iliiil + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else lIl1iiII == "missionInviteList" && console.log("🔊 邀请人数(" + li1II1lI.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (li1II1lI.data.msg) {
                li1II1lI.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (li1II1lI.data.msg || ""));
              } else {
                if (li1II1lI.errorMessage) {
                  if (li1II1lI.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (li1II1lI.errorMessage || ""));
                } else console.log("" + IiI1ii1);
              }
            }
          } else li1II1lI.errorMessage ? console.log("🔊 " + (li1II1lI.errorMessage || "")) : console.log("" + IiI1ii1);
        } else {}
        break;
      default:
        console.log((IlIil1iI || lIl1iiII) + "-> " + IiI1ii1);
    }
    if (typeof li1II1lI == "object") {
      if (li1II1lI.errorMessage) {
        if (li1II1lI.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (lIIIiIli) {}
}
function lIiIiII(i1IlII1i, ilII1IIl, iiiiIi = "POST") {
  let IIiiIllI = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": IIli11iI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i1IlII1i.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (IIiiIllI.Origin = "https://jinggengjcq-isv.isvjcloud.com", IIiiIllI["Content-Type"] = "application/json; charset=utf-8", delete IIiiIllI.Cookie), {
    "url": i1IlII1i,
    "method": iiiiIi,
    "headers": IIiiIllI,
    "body": ilII1IIl,
    "timeout": 30 * 1000
  };
}
function ilIi1iI(IIIiiI11, i11lilI1) {
  d = {
    "actId": $.actId,
    ...i11lilI1,
    "method": IIIiiI11,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = I1l1iii1(d);
  const lIIllIll = {
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
        ...i11lilI1,
        "method": IIIiiI11,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return IIIiiI11.indexOf("missionInviteList") > -1 && delete lIIllIll.params.admJson.actId, $.toStr(lIIllIll, lIIllIll);
}
function II1IIIl1(II1IIiII, ilI1llii) {
  return Math.floor(Math.random() * (ilI1llii - II1IIiII)) + II1IIiII;
}
function I1l1iii1(iill1i1I) {
  AppSecret = "78068ed0d60c464099fc030f34362b81";
  key = "3d08a11e7a7f";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(iill1i1I));
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
async function lll1Ii1() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const iIiIli1i = CryptoJS.enc.Utf8.parse(id),
    IIliiiII = CryptoJS.enc.Base64.stringify(iIiIli1i);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": IIliiiII,
      "od": "",
      "ov": "Ctq=",
      "ud": IIliiiII
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function lliiliI1(iI1llli) {
  iI1llli = iI1llli || 32;
  let llI11Iil = "abcdef0123456789",
    iil111I = llI11Iil.length,
    IlI11iI = "";
  for (i = 0; i < iI1llli; i++) IlI11iI += llI11Iil.charAt(Math.floor(Math.random() * iil111I));
  return IlI11iI;
}
function ii1li111(ilIIIiil) {
  if (typeof ilIIIiil == "string") try {
    return JSON.parse(ilIIIiil);
  } catch (liillIIl) {
    return console.log(liillIIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function Iiliii1i() {
  if (!$.joinVenderId) return;
  return new Promise(async IiIIi1I1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i1iliiIl = "";
    if ($.shopactivityId) i1iliiIl = ",\"activityId\":" + $.shopactivityId;
    const liili111 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i1iliiIl + ",\"channel\":406}",
      ilI1l1ll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liili111)
      };
    for (var IliIl1l1 = "", i111liI1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IIi111ll = 0; IIi111ll < 16; IIi111ll++) {
      var lilI1l1I = Math.round(Math.random() * (i111liI1.length - 1));
      IliIl1l1 += i111liI1.substring(lilI1l1I, lilI1l1I + 1);
    }
    uuid = Buffer.from(IliIl1l1, "utf8").toString("base64");
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
    const iilll1i1 = await Il1IIIii("8adfb", ilI1l1ll),
      I1li1lll = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + liili111 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iilll1i1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": IIli11iI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1li1lll, async (lIllI, Ili1liii, ilIlll1i) => {
      try {
        if (lIllI) Ili1liii && typeof Ili1liii.statusCode != "undefined" && Ili1liii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          ilIlll1i = ilIlll1i && ilIlll1i.match(/jsonp_.*?\((.*?)\);/) && ilIlll1i.match(/jsonp_.*?\((.*?)\);/)[1] || ilIlll1i;
          let IlIIllll = $.toObj(ilIlll1i, ilIlll1i);
          if (IlIIllll && typeof IlIIllll == "object") {
            if (IlIIllll && IlIIllll.success === true) {
              console.log(" >> " + IlIIllll.message);
              $.errorJoinShop = IlIIllll.message;
              if (IlIIllll.result && IlIIllll.result.giftInfo) for (let iII of IlIIllll.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + iII.discountString + iII.prizeName + iII.secondLineDesc);
              }
            } else IlIIllll && typeof IlIIllll == "object" && IlIIllll.message ? ($.errorJoinShop = IlIIllll.message, console.log("" + (IlIIllll.message || ""))) : console.log(ilIlll1i);
          } else console.log(ilIlll1i);
        }
      } catch (l1llI11i) {
        $.logErr(l1llI11i, Ili1liii);
      } finally {
        IiIIi1I1();
      }
    });
  });
}
async function l1iIil1l() {
  return new Promise(async iI1Il1li => {
    const illIl1ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iIlil1l1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(illIl1ii)
      };
    await $.wait(1000);
    const lI1i1I11 = await Il1IIIii("8adfb", iIlil1l1),
      IlII1IiI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + illIl1ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lI1i1I11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": IIli11iI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IlII1IiI, async (i1lli1, lilIlli1, iilIIl1l) => {
      try {
        if (i1lli1) lilIlli1 && typeof lilIlli1.statusCode != "undefined" && lilIlli1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iilIIl1l = iilIIl1l && iilIIl1l.match(/jsonp_.*?\((.*?)\);/) && iilIIl1l.match(/jsonp_.*?\((.*?)\);/)[1] || iilIIl1l;
          let liIIli = $.toObj(iilIIl1l, iilIIl1l);
          if (liIIli && typeof liIIli == "object") {
            if (liIIli && liIIli.success == true) {
              console.log("去加入：" + (liIIli.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = liIIli.result.interestsRuleList && liIIli.result.interestsRuleList[0] && liIIli.result.interestsRuleList[0].interestsInfo && liIIli.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else console.log(iilIIl1l);
        }
      } catch (iIII1iii) {
        $.logErr(iIII1iii, lilIlli1);
      } finally {
        iI1Il1li();
      }
    });
  });
}
function iIlIiIl1(lIlII11l) {
  return new Promise(i1iIli1i => {
    const lIllIl1I = {
      "url": lIlII11l + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIllIl1I, async (iI1l1Ii1, IIiilII, illli1ll) => {
      try {
        if (iI1l1Ii1) $.getAuthorCodeListerr = false;else {
          if (illli1ll) illli1ll = JSON.parse(illli1ll);
          $.getAuthorCodeListerr = true;
        }
      } catch (IIiIi1l1) {
        $.logErr(IIiIi1l1, IIiilII);
        illli1ll = null;
      } finally {
        i1iIli1i(illli1ll);
      }
    });
  });
}
function II1IIIl1(IllIiIll, l1liiI1i) {
  return Math.floor(Math.random() * (l1liiI1i - IllIiIll)) + IllIiIll;
}
function I1Ii1iiI() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const I1iII1ii = Array.from(new Set($.blacklist.split("&")));
  console.log(I1iII1ii.join("&") + "\n");
  let iI1ii11l = I1iII1ii,
    I1IlIIil = [],
    i1lililI = false;
  for (let lilliiII = 0; lilliiII < liI11ii.length; lilliiII++) {
    let III1I11l = decodeURIComponent(liI11ii[lilliiII].match(/pt_pin=([^; ]+)(?=;?)/) && liI11ii[lilliiII].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!III1I11l) break;
    let iIIII1I1 = false;
    for (let li1l1I1i of iI1ii11l) {
      if (li1l1I1i && li1l1I1i == III1I11l) {
        iIIII1I1 = true;
        break;
      }
    }
    !iIIII1I1 && (i1lililI = true, I1IlIIil.splice(lilliiII, -1, liI11ii[lilliiII]));
  }
  if (i1lililI) liI11ii = I1IlIIil;
}
function l1iI1III(lI1llilI, lilII111) {
  lilII111 != 0 && lI1llilI.unshift(lI1llilI.splice(lilII111, 1)[0]);
}
function Il1illlI() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(liI11ii, liI11ii));
    return;
  }
  console.log("当前已设置白名单：");
  const liiliI11 = Array.from(new Set($.whitelist.split("&")));
  console.log(liiliI11.join("&") + "\n");
  let il1l11li = [],
    iiiiIil = liiliI11;
  for (let Iiiili1i in liI11ii) {
    let l111iII = decodeURIComponent(liI11ii[Iiiili1i].match(/pt_pin=([^; ]+)(?=;?)/) && liI11ii[Iiiili1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iiiiIil.includes(l111iII) && il1l11li.push(liI11ii[Iiiili1i]);
  }
  helpCookiesArr = il1l11li;
  if (iiiiIil.length > 1) for (let IiiillI in iiiiIil) {
    let iiIIl1II = iiiiIil[iiiiIil.length - 1 - IiiillI];
    if (!iiIIl1II) continue;
    for (let i1iII1I1 in helpCookiesArr) {
      let iIlll = decodeURIComponent(helpCookiesArr[i1iII1I1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[i1iII1I1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      if (iiIIl1II == iIlll) {
        l1iI1III(helpCookiesArr, i1iII1I1);
      }
    }
  }
}