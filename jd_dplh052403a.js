/*
大牌联合052403期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023052403aab/oC2023052403aab?actId=27f28c36a56044d3_23052403

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
#大牌联合052403期
1 5 * * * jd_dplh052403a.js, tag=大牌联合052403期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合052403期");
const lIiIlI11 = $.isNode() ? require("./jdCookie.js") : "",
  IIi1l1Il = $.isNode() ? require("./sendNotify") : "";
let i1IIIiiI = [],
  lIlillll = "";
if ($.isNode()) {
  Object.keys(lIiIlI11).forEach(iiiI111l => {
    i1IIIiiI.push(lIiIlI11[iiiI111l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1IIIiiI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IllilI1l($.getdata("CookiesJD") || "[]").map(iIIIilll => iIIIilll.cookie)].filter(llili1ll => !!llili1ll);
let ll1I11Il = "30",
  IIi1l1I1 = "0";
ll1I11Il = $.isNode() ? process.env.retrynum ? process.env.retrynum : ll1I11Il : $.getdata("retrynum") ? $.getdata("retrynum") : IIi1l1I1;
IIi1l1I1 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : IIi1l1I1 : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : IIi1l1I1;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let Iiiil1i1 = "",
  lliIlIlI = "",
  IiIiI11l = "27f28c36a56044d3_23052403";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const i1liIiIi = require("./function/krgetToken"),
  lIi1li11 = require("./function/krh5st");
let Ill1IlII = "https://jinggengjcq-isv.isvjcloud.com";
lliIlIlI = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + lliIlIlI : $.getdata("helpnum") ? $.getdata("helpnum") : "" + lliIlIlI;
let lI1iI1l = "",
  iIiiIlii = "";
$.whitelist = process.env.DPLHTY_whitelist || lI1iI1l;
$.blacklist = process.env.DPLHTY_blacklist || iIiiIlii;
ll11lIll();
IiiI1lIl();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = lliIlIlI ? lliIlIlI : authorCodeList[l1iliIIl(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + IiIiI11l);
  console.log("\n💬 默认抽奖次数：" + IIi1l1I1 + " 💬 重试次数：" + ll1I11Il);
  console.log("\n💬 请在有水的情况下运行");
  if (!i1IIIiiI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = IiIiI11l;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let lil11I11 = 0; lil11I11 < i1IIIiiI.length; lil11I11++) {
    lIlillll = i1IIIiiI[lil11I11];
    if (lIlillll) {
      $.UserName = decodeURIComponent(lIlillll.match(/pt_pin=([^; ]+)(?=;?)/) && lIlillll.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lil11I11 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await iI1iIl1();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await iii11I11();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let liliIiIi = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + liliIiIi);
    if ($.isNode()) await IIi1l1Il.sendNotify("" + $.name, "" + liliIiIi);
  }
})().catch(i1illi1I => $.logErr(i1illi1I)).finally(() => $.done());
async function iii11I11() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    Iiiil1i1 = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await i1liIiIi(lIlillll, Ill1IlII);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await ii1I1ll1("activity_load");
    for (let lillIiI1 = 0; lillIiI1 < ll1I11Il; lillIiI1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await ii1I1ll1("activity_load");
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
    await ii1I1ll1("绑定");
    for (let ii11i11i = 0; ii11i11i < ll1I11Il; ii11i11i++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await ii1I1ll1("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await ii1I1ll1("shopList");
    for (let liilIi11 = 0; liilIi11 < ll1I11Il; liilIi11++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await ii1I1ll1("shopList");
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
        await ii1I1ll1("mission");
        for (let illIiiIi = 0; illIiiIi < ll1I11Il; illIiiIi++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await ii1I1ll1("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await iiIi1Iii();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await iiIi1Iii(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await ii1I1ll1("activity_load");
          for (let l1Ii1lii = 0; l1Ii1lii < ll1I11Il; l1Ii1lii++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await ii1I1ll1("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await ii1I1ll1("shopList");
          for (let iliIiiI = 0; iliIiiI < ll1I11Il; iliIiiI++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await ii1I1ll1("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await ii1I1ll1("mission");
      for (let I1IlIii = 0; I1IlIii < ll1I11Il; I1IlIii++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await ii1I1ll1("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else {
      console.log("💔 呜呜呜，已完成关注任务");
    }
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await ii1I1ll1("mission");
      for (let IIl1lIii = 0; IIl1lIii < ll1I11Il; IIl1lIii++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await ii1I1ll1("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (IIi1l1I1 + "" !== "0") {
      $.runFalag = true;
      let II1IillI = parseInt($.totalPoint / 200);
      IIi1l1I1 = parseInt(IIi1l1I1, 10);
      if (II1IillI > IIi1l1I1) II1IillI = IIi1l1I1;
      console.log("💖 抽奖次数为:" + II1IillI);
      for (m = 1; II1IillI--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await ii1I1ll1("抽奖");
        for (let l11I1i1l = 0; l11I1i1l < ll1I11Il; l11I1i1l++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await ii1I1ll1("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(II1IillI) <= 0) break;
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
  } catch (llIIiii) {
    console.log(llIIiii);
  }
}
async function ii1I1ll1(llil11il) {
  if ($.outFlag) return;
  let ii11li = "https://jinggengjcq-isv.isvjcloud.com",
    II1IIIii = "",
    I1iIIi11 = "POST",
    l1lliill = "";
  switch (llil11il) {
    case "activity_load":
      url = ii11li + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1lliill = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) l1lliill = {
        ...l1lliill,
        "shopId": "" + $.joinVenderId
      };
      II1IIIii = i11i11("/jdBigAlliance/activity/load", l1lliill);
      break;
    case "shopList":
      url = ii11li + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1lliill = {};
      II1IIIii = i11i11("/jdBigAlliance/shop/shopList", l1lliill);
      break;
    case "绑定":
      url = ii11li + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1lliill = {
        "inviterNick": $.inviteNick || ""
      };
      II1IIIii = i11i11("/jdBigAlliance/customer/inviteRelation", l1lliill);
      break;
    case "mission":
      url = ii11li + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1lliill = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) l1lliill = {
        ...l1lliill,
        "shopId": $.joinVenderId
      };
      II1IIIii = i11i11("/jdBigAlliance/mission/completeMission", l1lliill);
      break;
    case "抽奖":
      url = ii11li + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      l1lliill = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      II1IIIii = i11i11("/jdBigAlliance/interactive/drawPost", l1lliill);
      break;
    default:
      console.log("错误" + llil11il);
  }
  let IlIiIi11 = i1i11II(url, II1IIIii, I1iIIi11);
  return new Promise(async IIi1I1Il => {
    $.post(IlIiIi11, (liIi11ll, IlIII1il, lIiii1l1) => {
      try {
        if (liIi11ll) {
          if (IlIII1il && IlIII1il.statusCode && IlIII1il.statusCode == 493) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            $.outFlag = true;
          }
          $.retry = true;
        } else ll1Iii(llil11il, lIiii1l1);
      } catch (li11liiI) {
        console.log(li11liiI, IlIII1il);
      } finally {
        IIi1I1Il();
      }
    });
  });
}
async function ll1Iii(llll1lII, lilillil) {
  let IilIlIIl = "";
  try {
    $.krFlag = true;
    if (llll1lII != "accessLogWithAD" || llll1lII != "drawContent") {
      if (lilillil) {
        IilIlIIl = JSON.parse(lilillil);
      }
    }
  } catch (ll1ii111) {
    console.log("🤬 " + llll1lII + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let lil1l1i1 = "";
    switch (llll1lII) {
      case "抽奖":
        if (typeof IilIlIIl == "object") {
          if (IilIlIIl.success && IilIlIIl.success === true && IilIlIIl.data) {
            if (IilIlIIl.data.status && IilIlIIl.data.status == 200) {
              if (IilIlIIl.data.data.sendResult) console.log("抽中：" + IilIlIIl.data.data.awardSetting.awardName);else {
                if (!IilIlIIl.data.data.result) console.log("空气");else {
                  console.log(IilIlIIl.data.data);
                }
              }
            } else IilIlIIl.data.status && IilIlIIl.data.status == 500 && console.log("" + (IilIlIIl.data.msg || ""));
          } else IilIlIIl.message ? console.log("" + (IilIlIIl.message || "")) : console.log(lilillil);
        } else console.log(lilillil);
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
        lil1l1i1 = "";
        if (llll1lII == "followShop") lil1l1i1 = "关注";
        if (llll1lII == "addCart") lil1l1i1 = "加购";
        if (typeof IilIlIIl == "object") {
          if (IilIlIIl.success && IilIlIIl.success === true && IilIlIIl.data) {
            if (IilIlIIl.data.status && IilIlIIl.data.status == 200) {
              IilIlIIl = IilIlIIl.data;
              if (llll1lII != "setMixNick" && (IilIlIIl.msg || IilIlIIl.data.isOpenCard || IilIlIIl.data.remark)) console.log("🔊 " + (lil1l1i1 && lil1l1i1 + ":" || "") + (IilIlIIl.msg || IilIlIIl.data.isOpenCard || IilIlIIl.data.remark || ""));
              if (llll1lII == "activity_load") {
                if (IilIlIIl.msg || IilIlIIl.data.isOpenCard) {
                  if ((IilIlIIl.msg || IilIlIIl.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (IilIlIIl.data) {
                  $.endTime = IilIlIIl.data.cusActivity.endTime || 0;
                  $.MixNick = IilIlIIl.data.missionCustomer.buyerNick || "";
                  $.usedChance = IilIlIIl.data.missionCustomer.usedChance || 0;
                  $.totalPoint = IilIlIIl.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = IilIlIIl.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = IilIlIIl.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (llll1lII == "shopList") $.openList = IilIlIIl.data || [];else {
                  if (llll1lII == "mission") IilIlIIl.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (llll1lII == "uniteOpenCardOne") $.uniteOpenCar = IilIlIIl.msg || IilIlIIl.data.msg || "";else {
                      if (llll1lII == "myAward") {
                        console.log("🔊 我的奖品：");
                        let il11iiil = 0;
                        for (let iIliIl1 in IilIlIIl.data.list || []) {
                          let lIilli11 = IilIlIIl.data.list[iIliIl1];
                          il11iiil += Number(lIilli11.awardDes);
                        }
                        if (il11iiil > 0) console.log("🔊 共获得" + il11iiil + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else llll1lII == "missionInviteList" && console.log("🔊 邀请人数(" + IilIlIIl.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (IilIlIIl.data.msg) {
                IilIlIIl.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (IilIlIIl.data.msg || ""));
              } else {
                if (IilIlIIl.errorMessage) {
                  if (IilIlIIl.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (IilIlIIl.errorMessage || ""));
                } else console.log("" + lilillil);
              }
            }
          } else IilIlIIl.errorMessage ? console.log("🔊 " + (IilIlIIl.errorMessage || "")) : console.log("" + lilillil);
        } else {}
        break;
      default:
        console.log((lil1l1i1 || llll1lII) + "-> " + lilillil);
    }
    if (typeof IilIlIIl == "object") {
      if (IilIlIIl.errorMessage) {
        if (IilIlIIl.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (llllIiI) {}
}
function i1i11II(il1I1Ii, l1ill1li, ilIl1111 = "POST") {
  let lIiili1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": lIlillll,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return il1I1Ii.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (lIiili1.Origin = "https://jinggengjcq-isv.isvjcloud.com", lIiili1["Content-Type"] = "application/json; charset=utf-8", delete lIiili1.Cookie), {
    "url": il1I1Ii,
    "method": ilIl1111,
    "headers": lIiili1,
    "body": l1ill1li,
    "timeout": 30 * 1000
  };
}
function i11i11(ilIiIlIi, Ill11l) {
  d = {
    "actId": $.actId,
    ...Ill11l,
    "method": ilIiIlIi,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = II1IiIII(d);
  const li1I1IlI = {
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
        ...Ill11l,
        "method": ilIiIlIi,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return ilIiIlIi.indexOf("missionInviteList") > -1 && delete li1I1IlI.params.admJson.actId, $.toStr(li1I1IlI, li1I1IlI);
}
function l1iliIIl(i1ililIi, ii1I1l) {
  return Math.floor(Math.random() * (ii1I1l - i1ililIi)) + i1ililIi;
}
function II1IiIII(liIliIll) {
  return AppSecret = "33be15235e5c436b89a98652510742f1", key = "feed1322bc7a", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(liIliIll)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
    "sign": sign,
    "timeStamp": time2
  };
}
async function iI1iIl1() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const ii1lilll = CryptoJS.enc.Utf8.parse(id),
    lii1i1l = CryptoJS.enc.Base64.stringify(ii1lilll);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": lii1i1l,
      "od": "",
      "ov": "Ctq=",
      "ud": lii1i1l
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function iIIlilli(iilliilI) {
  iilliilI = iilliilI || 32;
  let iii1II1I = "abcdef0123456789",
    i11liiI1 = iii1II1I.length,
    iIil1I1I = "";
  for (i = 0; i < iilliilI; i++) iIil1I1I += iii1II1I.charAt(Math.floor(Math.random() * i11liiI1));
  return iIil1I1I;
}
function IllilI1l(iiliiIli) {
  if (typeof iiliiIli == "string") try {
    return JSON.parse(iiliiIli);
  } catch (l11IIi1l) {
    return console.log(l11IIi1l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function iiIi1Iii() {
  if (!$.joinVenderId) return;
  return new Promise(async iill1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lii1Illi = "";
    if ($.shopactivityId) lii1Illi = ",\"activityId\":" + $.shopactivityId;
    const il11ii11 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lii1Illi + ",\"channel\":406}",
      IIl1ll1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(il11ii11)
      };
    for (var lIili1i = "", lll11iI1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l111llI1 = 0; l111llI1 < 16; l111llI1++) {
      var Il1Iilii = Math.round(Math.random() * (lll11iI1.length - 1));
      lIili1i += lll11iI1.substring(Il1Iilii, Il1Iilii + 1);
    }
    uuid = Buffer.from(lIili1i, "utf8").toString("base64");
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
    const l1111111 = await lIi1li11("8adfb", IIl1ll1),
      lIIiiiI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + il11ii11 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1111111),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": lIlillll,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIIiiiI, async (iiiliili, l11IliiI, IIiIIlIi) => {
      try {
        if (iiiliili) l11IliiI && typeof l11IliiI.statusCode != "undefined" && l11IliiI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IIiIIlIi = IIiIIlIi && IIiIIlIi.match(/jsonp_.*?\((.*?)\);/) && IIiIIlIi.match(/jsonp_.*?\((.*?)\);/)[1] || IIiIIlIi;
          let ili1l1I1 = $.toObj(IIiIIlIi, IIiIIlIi);
          if (ili1l1I1 && typeof ili1l1I1 == "object") {
            if (ili1l1I1 && ili1l1I1.success === true) {
              console.log(" >> " + ili1l1I1.message);
              $.errorJoinShop = ili1l1I1.message;
              if (ili1l1I1.result && ili1l1I1.result.giftInfo) for (let l1II1iIi of ili1l1I1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + l1II1iIi.discountString + l1II1iIi.prizeName + l1II1iIi.secondLineDesc);
              }
            } else ili1l1I1 && typeof ili1l1I1 == "object" && ili1l1I1.message ? ($.errorJoinShop = ili1l1I1.message, console.log("" + (ili1l1I1.message || ""))) : console.log(IIiIIlIi);
          } else console.log(IIiIIlIi);
        }
      } catch (l1IlIlI) {
        $.logErr(l1IlIlI, l11IliiI);
      } finally {
        iill1();
      }
    });
  });
}
async function IiilIIlI() {
  return new Promise(async i1lllil => {
    const ll1iiil = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      liliIIi = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ll1iiil)
      };
    await $.wait(1000);
    const Illi1lll = await lIi1li11("8adfb", liliIIi),
      lIIl1lii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ll1iiil + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Illi1lll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": lIlillll,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIIl1lii, async (llil1lIi, ililIlll, IIi1lil1) => {
      try {
        if (llil1lIi) {
          ililIlll && typeof ililIlll.statusCode != "undefined" && ililIlll.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          IIi1lil1 = IIi1lil1 && IIi1lil1.match(/jsonp_.*?\((.*?)\);/) && IIi1lil1.match(/jsonp_.*?\((.*?)\);/)[1] || IIi1lil1;
          let iilii1lI = $.toObj(IIi1lil1, IIi1lil1);
          if (iilii1lI && typeof iilii1lI == "object") {
            iilii1lI && iilii1lI.success == true && (console.log("去加入：" + (iilii1lI.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iilii1lI.result.interestsRuleList && iilii1lI.result.interestsRuleList[0] && iilii1lI.result.interestsRuleList[0].interestsInfo && iilii1lI.result.interestsRuleList[0].interestsInfo.activityId || "");
          } else {
            console.log(IIi1lil1);
          }
        }
      } catch (lIiliI11) {
        $.logErr(lIiliI11, ililIlll);
      } finally {
        i1lllil();
      }
    });
  });
}
function Ili1ill1(liII11lI) {
  return new Promise(llII1l11 => {
    const li1i1Iil = {
      "url": liII11lI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(li1i1Iil, async (liI1lilI, IIIIliI, i1llIll) => {
      try {
        if (liI1lilI) $.getAuthorCodeListerr = false;else {
          if (i1llIll) i1llIll = JSON.parse(i1llIll);
          $.getAuthorCodeListerr = true;
        }
      } catch (li11il11) {
        $.logErr(li11il11, IIIIliI);
        i1llIll = null;
      } finally {
        llII1l11(i1llIll);
      }
    });
  });
}
function l1iliIIl(I111lIIl, l1lil1l1) {
  return Math.floor(Math.random() * (l1lil1l1 - I111lIIl)) + I111lIIl;
}
function IiiI1lIl() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const i1iIIII = Array.from(new Set($.blacklist.split("&")));
  console.log(i1iIIII.join("&") + "\n");
  let Ii1i11l1 = i1iIIII,
    l11ilil1 = [],
    il1Iil = false;
  for (let iIIiI1l1 = 0; iIIiI1l1 < i1IIIiiI.length; iIIiI1l1++) {
    let I111II1i = decodeURIComponent(i1IIIiiI[iIIiI1l1].match(/pt_pin=([^; ]+)(?=;?)/) && i1IIIiiI[iIIiI1l1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!I111II1i) break;
    let IIl1ili1 = false;
    for (let IIIlI1i1 of Ii1i11l1) {
      if (IIIlI1i1 && IIIlI1i1 == I111II1i) {
        IIl1ili1 = true;
        break;
      }
    }
    !IIl1ili1 && (il1Iil = true, l11ilil1.splice(iIIiI1l1, -1, i1IIIiiI[iIIiI1l1]));
  }
  if (il1Iil) i1IIIiiI = l11ilil1;
}
function I1iII11I(iii11111, l1Ii1lIi) {
  l1Ii1lIi != 0 && iii11111.unshift(iii11111.splice(l1Ii1lIi, 1)[0]);
}
function ll11lIll() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(i1IIIiiI, i1IIIiiI));
    return;
  }
  console.log("当前已设置白名单：");
  const II1lIlI1 = Array.from(new Set($.whitelist.split("&")));
  console.log(II1lIlI1.join("&") + "\n");
  let I1IiiIII = [],
    iIlllIIl = II1lIlI1;
  for (let II11llII in i1IIIiiI) {
    let l1li11Ii = decodeURIComponent(i1IIIiiI[II11llII].match(/pt_pin=([^; ]+)(?=;?)/) && i1IIIiiI[II11llII].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iIlllIIl.includes(l1li11Ii) && I1IiiIII.push(i1IIIiiI[II11llII]);
  }
  helpCookiesArr = I1IiiIII;
  if (iIlllIIl.length > 1) for (let lli1IIli in iIlllIIl) {
    let li1l1Ill = iIlllIIl[iIlllIIl.length - 1 - lli1IIli];
    if (!li1l1Ill) continue;
    for (let IlIIli1 in helpCookiesArr) {
      let iiI1lIiI = decodeURIComponent(helpCookiesArr[IlIIli1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[IlIIli1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      if (li1l1Ill == iiI1lIiI) {
        I1iII11I(helpCookiesArr, IlIIli1);
      }
    }
  }
}