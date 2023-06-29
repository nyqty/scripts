/*
大牌联合0625期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230625dda/oC20230625dda?actId=c48b641bc798454e898562_230625

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
#大牌联合0625期
20 20 29,30 * * jd_dplh0625.js, tag=大牌联合0625期, enabled=true
*/
let opencard_toShop = "false";
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0625期");
const Ii111II1 = $.isNode() ? require("./jdCookie.js") : "",
  ilI1i111 = $.isNode() ? require("./sendNotify") : "";
let I1il1Il = [],
  IIiliIl = "";
if ($.isNode()) {
  Object.keys(Ii111II1).forEach(l11IIi11 => {
    I1il1Il.push(Ii111II1[l11IIi11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1il1Il = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...liIi1i1l($.getdata("CookiesJD") || "[]").map(il1iI1ii => il1iI1ii.cookie)].filter(ii1llII => !!ii1llII);
let il1l1Iii = "30",
  iIiIi1i1 = "0";
il1l1Iii = $.isNode() ? process.env.retrynum ? process.env.retrynum : il1l1Iii : $.getdata("retrynum") ? $.getdata("retrynum") : iIiIi1i1;
iIiIi1i1 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : iIiIi1i1 : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : iIiIi1i1;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let IiIll1Ii = "",
  IIl11llI = "",
  i1iIiI1i = "c48b641bc798454e898562_230625";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const I1IiI1lI = require("./function/krgetToken"),
  lilii1lI = require("./function/krh5st");
let i111liI1 = "https://jinggengjcq-isv.isvjcloud.com";
IIl11llI = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + IIl11llI : $.getdata("helpnum") ? $.getdata("helpnum") : "" + IIl11llI;
let i1I1ll1I = "",
  IiiIii1l = "";
$.whitelist = process.env.DPLHTY_whitelist || i1I1ll1I;
$.blacklist = process.env.DPLHTY_blacklist || IiiIii1l;
IllIliI1();
lil11lI();
!(async () => {
    authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = IIl11llI ? IIl11llI : authorCodeList[lI1IlIl1(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + i1iIiI1i);
  console.log("\n💬 默认抽奖次数：" + iIiIi1i1 + " 💬 重试次数：" + il1l1Iii);
  console.log("\n💬 请在有水的情况下运行");
  if (!I1il1Il[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = i1iIiI1i;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let iil1ill1 = 0; iil1ill1 < I1il1Il.length; iil1ill1++) {
    IIiliIl = I1il1Il[iil1ill1];
    if (IIiliIl) {
      $.UserName = decodeURIComponent(IIiliIl.match(/pt_pin=([^; ]+)(?=;?)/) && IIiliIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iil1ill1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await l1iiiIll();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await Ili1IiII();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let liiI1lI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + liiI1lI);
    if ($.isNode()) await ilI1i111.sendNotify("" + $.name, "" + liiI1lI);
  }
})().catch(li1i1i1l => $.logErr(li1i1i1l)).finally(() => $.done());
async function Ili1IiII() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    IiIll1Ii = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await I1IiI1lI(IIiliIl, i111liI1);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await l111i1li("activity_load");
    for (let llii1il = 0; llii1il < il1l1Iii; llii1il++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await l111i1li("activity_load");
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
    await l111i1li("绑定");
    for (let iili1Iil = 0; iili1Iil < il1l1Iii; iili1Iil++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await l111i1li("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await l111i1li("shopList");
    for (let i1ii1lii = 0; i1ii1lii < il1l1Iii; i1ii1lii++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await l111i1li("shopList");
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
        await l111i1li("mission");
        for (let lI1lI1li = 0; lI1lI1li < il1l1Iii; lI1lI1li++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await l111i1li("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await ili1111i();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await ili1111i(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await l111i1li("activity_load");
          for (let lIIIl1iI = 0; lIIIl1iI < il1l1Iii; lIIIl1iI++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await l111i1li("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await l111i1li("shopList");
          for (let l1II1Iil = 0; l1II1Iil < il1l1Iii; l1II1Iil++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await l111i1li("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await l111i1li("mission");
      for (let iliiIllI = 0; iliiIllI < il1l1Iii; iliiIllI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await l111i1li("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await l111i1li("mission");
      for (let ii1ii1lI = 0; ii1ii1lI < il1l1Iii; ii1ii1lI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await l111i1li("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (iIiIi1i1 + "" !== "0") {
      $.runFalag = true;
      let Il11iIIi = parseInt($.totalPoint / 200);
      iIiIi1i1 = parseInt(iIiIi1i1, 10);
      if (Il11iIIi > iIiIi1i1) Il11iIIi = iIiIi1i1;
      console.log("💖 抽奖次数为:" + Il11iIIi);
      for (m = 1; Il11iIIi--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await l111i1li("抽奖");
        for (let IllilII1 = 0; IllilII1 < il1l1Iii; IllilII1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await l111i1li("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(Il11iIIi) <= 0) break;
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
  } catch (i111iII) {
    console.log(i111iII);
  }
}
async function l111i1li(iI1Il11i) {
  if ($.outFlag) return;
  let IlII11iI = "https://jinggengjcq-isv.isvjcloud.com",
    III1ii = "",
    Iillil11 = "POST",
    llllllIl = "";
  switch (iI1Il11i) {
    case "activity_load":
      url = IlII11iI + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llllllIl = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) llllllIl = {
        ...llllllIl,
        "shopId": "" + $.joinVenderId
      };
      III1ii = Iiiili1i("/jdBigAlliance/activity/load", llllllIl);
      break;
    case "shopList":
      url = IlII11iI + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llllllIl = {};
      III1ii = Iiiili1i("/jdBigAlliance/shop/shopList", llllllIl);
      break;
    case "绑定":
      url = IlII11iI + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llllllIl = {
        "inviterNick": $.inviteNick || ""
      };
      III1ii = Iiiili1i("/jdBigAlliance/customer/inviteRelation", llllllIl);
      break;
    case "mission":
      url = IlII11iI + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llllllIl = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) llllllIl = {
        ...llllllIl,
        "shopId": $.joinVenderId
      };
      III1ii = Iiiili1i("/jdBigAlliance/mission/completeMission", llllllIl);
      break;
    case "抽奖":
      url = IlII11iI + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      llllllIl = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      III1ii = Iiiili1i("/jdBigAlliance/interactive/drawPost", llllllIl);
      break;
    default:
      console.log("错误" + iI1Il11i);
  }
  let IIII1lil = i1llIii(url, III1ii, Iillil11);
  return new Promise(async i111iiIi => {
    $.post(IIII1lil, (l1IlIi1I, ililiil1, iI1li1ii) => {
      try {
        l1IlIi1I ? (ililiil1 && ililiil1.statusCode && ililiil1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : i1i1ii1l(iI1Il11i, iI1li1ii);
      } catch (lililIlI) {
        console.log(lililIlI, ililiil1);
      } finally {
        i111iiIi();
      }
    });
  });
}
async function i1i1ii1l(IiIIl11I, IlIlill) {
  let i1iI11I = "";
  try {
    $.krFlag = true;
    (IiIIl11I != "accessLogWithAD" || IiIIl11I != "drawContent") && IlIlill && (i1iI11I = JSON.parse(IlIlill));
  } catch (I1i11llI) {
    console.log("🤬 " + IiIIl11I + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let I1i1I1I = "";
    switch (IiIIl11I) {
      case "抽奖":
        if (typeof i1iI11I == "object") {
          if (i1iI11I.success && i1iI11I.success === true && i1iI11I.data) {
            if (i1iI11I.data.status && i1iI11I.data.status == 200) {
              if (i1iI11I.data.data.sendResult) console.log("抽中：" + i1iI11I.data.data.awardSetting.awardName);else !i1iI11I.data.data.result ? console.log("空气") : console.log(i1iI11I.data.data);
            } else i1iI11I.data.status && i1iI11I.data.status == 500 && console.log("" + (i1iI11I.data.msg || ""));
          } else {
            if (i1iI11I.message) console.log("" + (i1iI11I.message || ""));else {
              console.log(IlIlill);
            }
          }
        } else {
          console.log(IlIlill);
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
        I1i1I1I = "";
        if (IiIIl11I == "followShop") I1i1I1I = "关注";
        if (IiIIl11I == "addCart") I1i1I1I = "加购";
        if (typeof i1iI11I == "object") {
          if (i1iI11I.success && i1iI11I.success === true && i1iI11I.data) {
            if (i1iI11I.data.status && i1iI11I.data.status == 200) {
              i1iI11I = i1iI11I.data;
              if (IiIIl11I != "setMixNick" && (i1iI11I.msg || i1iI11I.data.isOpenCard || i1iI11I.data.remark)) console.log("🔊 " + (I1i1I1I && I1i1I1I + ":" || "") + (i1iI11I.msg || i1iI11I.data.isOpenCard || i1iI11I.data.remark || ""));
              if (IiIIl11I == "activity_load") {
                if (i1iI11I.msg || i1iI11I.data.isOpenCard) {
                  if ((i1iI11I.msg || i1iI11I.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (i1iI11I.data) {
                  $.endTime = i1iI11I.data.cusActivity.endTime || 0;
                  $.MixNick = i1iI11I.data.missionCustomer.buyerNick || "";
                  $.usedChance = i1iI11I.data.missionCustomer.usedChance || 0;
                  $.totalPoint = i1iI11I.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = i1iI11I.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = i1iI11I.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (IiIIl11I == "shopList") {
                  $.openList = i1iI11I.data || [];
                } else {
                  if (IiIIl11I == "mission") i1iI11I.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (IiIIl11I == "uniteOpenCardOne") $.uniteOpenCar = i1iI11I.msg || i1iI11I.data.msg || "";else {
                      if (IiIIl11I == "myAward") {
                        console.log("🔊 我的奖品：");
                        let lIIII1 = 0;
                        for (let lill11il in i1iI11I.data.list || []) {
                          let lliIi1I1 = i1iI11I.data.list[lill11il];
                          lIIII1 += Number(lliIi1I1.awardDes);
                        }
                        if (lIIII1 > 0) console.log("🔊 共获得" + lIIII1 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else IiIIl11I == "missionInviteList" && console.log("🔊 邀请人数(" + i1iI11I.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (i1iI11I.data.msg) {
                i1iI11I.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (i1iI11I.data.msg || ""));
              } else {
                if (i1iI11I.errorMessage) {
                  if (i1iI11I.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (i1iI11I.errorMessage || ""));
                } else console.log("" + IlIlill);
              }
            }
          } else {
            if (i1iI11I.errorMessage) {
              console.log("🔊 " + (i1iI11I.errorMessage || ""));
            } else console.log("" + IlIlill);
          }
        } else {}
        break;
      default:
        console.log((I1i1I1I || IiIIl11I) + "-> " + IlIlill);
    }
    if (typeof i1iI11I == "object") {
      if (i1iI11I.errorMessage) {
        if (i1iI11I.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (IIIl1l1I) {}
}
function i1llIii(iI1Il1I, lil1i, i1IIII1I = "POST") {
  let i1111ili = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": IIiliIl,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iI1Il1I.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (i1111ili.Origin = "https://jinggengjcq-isv.isvjcloud.com", i1111ili["Content-Type"] = "application/json; charset=utf-8", delete i1111ili.Cookie), {
    "url": iI1Il1I,
    "method": i1IIII1I,
    "headers": i1111ili,
    "body": lil1i,
    "timeout": 30 * 1000
  };
}
function Iiiili1i(I1Ii11, lIl1iiiI) {
  d = {
    "actId": $.actId,
    ...lIl1iiiI,
    "method": I1Ii11,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = liiiIll(d);
  const lIilI1ii = {
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
        ...lIl1iiiI,
        "method": I1Ii11,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return I1Ii11.indexOf("missionInviteList") > -1 && delete lIilI1ii.params.admJson.actId, $.toStr(lIilI1ii, lIilI1ii);
}
function lI1IlIl1(iiIl1I1I, lIiil1iI) {
  return Math.floor(Math.random() * (lIiil1iI - iiIl1I1I)) + iiIl1I1I;
}
function liiiIll(iiIii1Ii) {
  AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed";
  key = "c1614da9ac68";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(iiIii1Ii));
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
async function l1iiiIll() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const IiIlIl = CryptoJS.enc.Utf8.parse(id),
    iiIIii1I = CryptoJS.enc.Base64.stringify(IiIlIl);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": iiIIii1I,
      "od": "",
      "ov": "Ctq=",
      "ud": iiIIii1I
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function IlilIlIi(iiliI1iI) {
  iiliI1iI = iiliI1iI || 32;
  let iIil1iIl = "abcdef0123456789",
    iiliillI = iIil1iIl.length,
    Ii1liIIl = "";
  for (i = 0; i < iiliI1iI; i++) Ii1liIIl += iIil1iIl.charAt(Math.floor(Math.random() * iiliillI));
  return Ii1liIIl;
}
function liIi1i1l(l1lillII) {
  if (typeof l1lillII == "string") {
    try {
      return JSON.parse(l1lillII);
    } catch (liIIlI1) {
      return console.log(liIIlI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function ili1111i() {
  if (!$.joinVenderId) return;
  return new Promise(async Ili1lllI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let il1iiil1 = "";
    if ($.shopactivityId) il1iiil1 = ",\"activityId\":" + $.shopactivityId;
    const IIIll1I1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + il1iiil1 + ",\"channel\":406}",
      Iilli1ii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIIll1I1)
      };
    for (var liIiIIII = "", IIlli1I = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", ilililI = 0; ilililI < 16; ilililI++) {
      var iIiiill = Math.round(Math.random() * (IIlli1I.length - 1));
      liIiIIII += IIlli1I.substring(iIiiill, iIiiill + 1);
    }
    uuid = Buffer.from(liIiIIII, "utf8").toString("base64");
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
    const IiIII1I = await lilii1lI("8adfb", Iilli1ii),
      llliiI1l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IIIll1I1 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IiIII1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": IIiliIl,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(llliiI1l, async (lilI1I1, iliIi1II, l1lil1ll) => {
      try {
        if (lilI1I1) {
          if (iliIi1II && typeof iliIi1II.statusCode != "undefined") {
            iliIi1II.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          l1lil1ll = l1lil1ll && l1lil1ll.match(/jsonp_.*?\((.*?)\);/) && l1lil1ll.match(/jsonp_.*?\((.*?)\);/)[1] || l1lil1ll;
          let Ili1I11 = $.toObj(l1lil1ll, l1lil1ll);
          if (Ili1I11 && typeof Ili1I11 == "object") {
            if (Ili1I11 && Ili1I11.success === true) {
              console.log(" >> " + Ili1I11.message);
              $.errorJoinShop = Ili1I11.message;
              if (Ili1I11.result && Ili1I11.result.giftInfo) {
                for (let i1liIIiI of Ili1I11.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + i1liIIiI.discountString + i1liIIiI.prizeName + i1liIIiI.secondLineDesc);
                }
              }
            } else Ili1I11 && typeof Ili1I11 == "object" && Ili1I11.message ? ($.errorJoinShop = Ili1I11.message, console.log("" + (Ili1I11.message || ""))) : console.log(l1lil1ll);
          } else console.log(l1lil1ll);
        }
      } catch (IIi11) {
        $.logErr(IIi11, iliIi1II);
      } finally {
        Ili1lllI();
      }
    });
  });
}
async function Ii1Iil1() {
  return new Promise(async lIliiIII => {
    const ii1iiiil = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      illl1l1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ii1iiiil)
      };
    await $.wait(1000);
    const lIlil1II = await lilii1lI("8adfb", illl1l1),
      IIIlii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ii1iiiil + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIlil1II),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": IIiliIl,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIIlii, async (ilii1iiI, Iiil1l, ilIlIii) => {
      try {
        if (ilii1iiI) Iiil1l && typeof Iiil1l.statusCode != "undefined" && Iiil1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          ilIlIii = ilIlIii && ilIlIii.match(/jsonp_.*?\((.*?)\);/) && ilIlIii.match(/jsonp_.*?\((.*?)\);/)[1] || ilIlIii;
          let illiIliI = $.toObj(ilIlIii, ilIlIii);
          illiIliI && typeof illiIliI == "object" ? illiIliI && illiIliI.success == true && (console.log("去加入：" + (illiIliI.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = illiIliI.result.interestsRuleList && illiIliI.result.interestsRuleList[0] && illiIliI.result.interestsRuleList[0].interestsInfo && illiIliI.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(ilIlIii);
        }
      } catch (IIii11l) {
        $.logErr(IIii11l, Iiil1l);
      } finally {
        lIliiIII();
      }
    });
  });
}
function iiIli1ii(liIlill) {
  return new Promise(iIiliIl1 => {
    const IliIiII = {
      "url": liIlill + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IliIiII, async (iiIliIIi, liIiI11i, l11liliI) => {
      try {
        if (iiIliIIi) $.getAuthorCodeListerr = false;else {
          if (l11liliI) l11liliI = JSON.parse(l11liliI);
          $.getAuthorCodeListerr = true;
        }
      } catch (Ilii1iII) {
        $.logErr(Ilii1iII, liIiI11i);
        l11liliI = null;
      } finally {
        iIiliIl1(l11liliI);
      }
    });
  });
}
function lI1IlIl1(ll11iili, I1lIllI1) {
  return Math.floor(Math.random() * (I1lIllI1 - ll11iili)) + ll11iili;
}
function lil11lI() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iiII11II = Array.from(new Set($.blacklist.split("&")));
  console.log(iiII11II.join("&") + "\n");
  let IIli1ll = iiII11II,
    lllI11i = [],
    l11IIl1I = false;
  for (let iiIllii = 0; iiIllii < I1il1Il.length; iiIllii++) {
    let liiIIii1 = decodeURIComponent(I1il1Il[iiIllii].match(/pt_pin=([^; ]+)(?=;?)/) && I1il1Il[iiIllii].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!liiIIii1) break;
    let illI1i1i = false;
    for (let IIlIi111 of IIli1ll) {
      if (IIlIi111 && IIlIi111 == liiIIii1) {
        illI1i1i = true;
        break;
      }
    }
    !illI1i1i && (l11IIl1I = true, lllI11i.splice(iiIllii, -1, I1il1Il[iiIllii]));
  }
  if (l11IIl1I) I1il1Il = lllI11i;
}
function l11lI11l(illlii1i, iiII1l1I) {
  iiII1l1I != 0 && illlii1i.unshift(illlii1i.splice(iiII1l1I, 1)[0]);
}
function IllIliI1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(I1il1Il, I1il1Il));
    return;
  }
  console.log("当前已设置白名单：");
  const lli1lil = Array.from(new Set($.whitelist.split("&")));
  console.log(lli1lil.join("&") + "\n");
  let IiI1iI1 = [],
    II1111l = lli1lil;
  for (let l1IilIii in I1il1Il) {
    let Il11lI11 = decodeURIComponent(I1il1Il[l1IilIii].match(/pt_pin=([^; ]+)(?=;?)/) && I1il1Il[l1IilIii].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (II1111l.includes(Il11lI11)) {
      IiI1iI1.push(I1il1Il[l1IilIii]);
    }
  }
  helpCookiesArr = IiI1iI1;
  if (II1111l.length > 1) {
    for (let iIl111ll in II1111l) {
      let iill1III = II1111l[II1111l.length - 1 - iIl111ll];
      if (!iill1III) continue;
      for (let IIIIIi1l in helpCookiesArr) {
        let lili1l11 = decodeURIComponent(helpCookiesArr[IIIIIi1l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[IIIIIi1l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        iill1III == lili1l11 && l11lI11l(helpCookiesArr, IIIIIi1l);
      }
    }
  }
}