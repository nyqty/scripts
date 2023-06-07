/*
大牌联合0606期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230606cxc/oC20230606cxc?actId=1315ca049bfc4859882f7974ed3_230606

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
#大牌联合0606期
1 1 1 1 * jd_dplh0606.js, tag=大牌联合0606期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0606期");
const iIlI11l = $.isNode() ? require("./jdCookie.js") : "",
  I1i1III1 = $.isNode() ? require("./sendNotify") : "";
let l1Illli1 = [],
  iIIlII1l = "";
if ($.isNode()) {
  Object.keys(iIlI11l).forEach(IiIilll => {
    l1Illli1.push(iIlI11l[IiIilll]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1Illli1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ilIIiii1($.getdata("CookiesJD") || "[]").map(il11il1 => il11il1.cookie)].filter(llilI1I1 => !!llilI1I1);
let iiliIili = "30",
  l1l1IIIi = "0";
iiliIili = $.isNode() ? process.env.retrynum ? process.env.retrynum : iiliIili : $.getdata("retrynum") ? $.getdata("retrynum") : l1l1IIIi;
l1l1IIIi = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : l1l1IIIi : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : l1l1IIIi;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iIlllII1 = "",
  liIilili = "",
  l1liIi1 = "1315ca049bfc4859882f7974ed3_230606";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const IIll1111 = require("./function/krgetToken"),
  IlilIIi = require("./function/krh5st");
let l111ii1I = "https://jinggengjcq-isv.isvjcloud.com";
liIilili = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + liIilili : $.getdata("helpnum") ? $.getdata("helpnum") : "" + liIilili;
let llllIi11 = "",
  iIIl11I1 = "";
$.whitelist = process.env.DPLHTY_whitelist || llllIi11;
$.blacklist = process.env.DPLHTY_blacklist || iIIl11I1;
Iil1I1Il();
i1IlIII();
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = liIilili ? liIilili : authorCodeList[liiiiIl1(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + l1liIi1);
  console.log("\n💬 默认抽奖次数：" + l1l1IIIi + " 💬 重试次数：" + iiliIili);
  console.log("\n💬 请在有水的情况下运行");
  if (!l1Illli1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = l1liIi1;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let lIIiIil = 0; lIIiIil < l1Illli1.length; lIIiIil++) {
    iIIlII1l = l1Illli1[lIIiIil];
    if (iIIlII1l) {
      $.UserName = decodeURIComponent(iIIlII1l.match(/pt_pin=([^; ]+)(?=;?)/) && iIIlII1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIIiIil + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await ilIli1il();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await lliIIi1i();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let ii1i1Ii1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + ii1i1Ii1);
    if ($.isNode()) await I1i1III1.sendNotify("" + $.name, "" + ii1i1Ii1);
  }
})().catch(l1Iillil => $.logErr(l1Iillil)).finally(() => $.done());
async function lliIIi1i() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    iIlllII1 = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await IIll1111(iIIlII1l, l111ii1I);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await lI11l1i("activity_load");
    for (let ilIiiIl1 = 0; ilIiiIl1 < iiliIili; ilIiiIl1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lI11l1i("activity_load");
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
    await lI11l1i("绑定");
    for (let IlIilili = 0; IlIilili < iiliIili; IlIilili++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lI11l1i("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await lI11l1i("shopList");
    for (let iIiillil = 0; iIiillil < iiliIili; iIiillil++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lI11l1i("shopList");
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
        await lI11l1i("mission");
        for (let i1I1iil = 0; i1I1iil < iiliIili; i1I1iil++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await lI11l1i("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await iII1IlI1();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
            return;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("😤 呜呜呜，重试开卡");
            await $.wait(1000);
            await iII1IlI1();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lI11l1i("activity_load");
          for (let llIliii1 = 0; llIliii1 < iiliIili; llIliii1++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await lI11l1i("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lI11l1i("shopList");
          for (let ll1l1iIi = 0; ll1l1iIi < iiliIili; ll1l1iIi++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await lI11l1i("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await lI11l1i("mission");
      for (let I1liII = 0; I1liII < iiliIili; I1liII++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lI11l1i("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await lI11l1i("mission");
      for (let i1IiIilI = 0; i1IiIilI < iiliIili; i1IiIilI++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await lI11l1i("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (l1l1IIIi + "" !== "0") {
      $.runFalag = true;
      let Ill1IiII = parseInt($.totalPoint / 200);
      l1l1IIIi = parseInt(l1l1IIIi, 10);
      if (Ill1IiII > l1l1IIIi) Ill1IiII = l1l1IIIi;
      console.log("💖 抽奖次数为:" + Ill1IiII);
      for (m = 1; Ill1IiII--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await lI11l1i("抽奖");
        for (let IliIii = 0; IliIii < iiliIili; IliIii++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await lI11l1i("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(Ill1IiII) <= 0) break;
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
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  } catch (Ilil11ii) {
    console.log(Ilil11ii);
  }
}
async function lI11l1i(iIIi1iii) {
  if ($.outFlag) return;
  let il11Ii1i = "https://jinggengjcq-isv.isvjcloud.com",
    II1l1ll1 = "",
    I1Ill1I = "POST",
    I11li1 = "";
  switch (iIIi1iii) {
    case "activity_load":
      url = il11Ii1i + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I11li1 = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) I11li1 = {
        ...I11li1,
        "shopId": "" + $.joinVenderId
      };
      II1l1ll1 = Iiil1ii("/jdBigAlliance/activity/load", I11li1);
      break;
    case "shopList":
      url = il11Ii1i + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I11li1 = {};
      II1l1ll1 = Iiil1ii("/jdBigAlliance/shop/shopList", I11li1);
      break;
    case "绑定":
      url = il11Ii1i + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I11li1 = {
        "inviterNick": $.inviteNick || ""
      };
      II1l1ll1 = Iiil1ii("/jdBigAlliance/customer/inviteRelation", I11li1);
      break;
    case "mission":
      url = il11Ii1i + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I11li1 = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) I11li1 = {
        ...I11li1,
        "shopId": $.joinVenderId
      };
      II1l1ll1 = Iiil1ii("/jdBigAlliance/mission/completeMission", I11li1);
      break;
    case "抽奖":
      url = il11Ii1i + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      I11li1 = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      II1l1ll1 = Iiil1ii("/jdBigAlliance/interactive/drawPost", I11li1);
      break;
    default:
      console.log("错误" + iIIi1iii);
  }
  let ilIlIl1 = II11ll11(url, II1l1ll1, I1Ill1I);
  return new Promise(async IIIlIl1I => {
    $.post(ilIlIl1, (lI1liIiI, ii1illi, iii1llil) => {
      try {
        if (lI1liIiI) {
          ii1illi && ii1illi.statusCode && ii1illi.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          $.retry = true;
        } else iili1Il1(iIIi1iii, iii1llil);
      } catch (lI11iilI) {
        console.log(lI11iilI, ii1illi);
      } finally {
        IIIlIl1I();
      }
    });
  });
}
async function iili1Il1(ilIIli11, l11i1lII) {
  let llIIII11 = "";
  try {
    $.krFlag = true;
    (ilIIli11 != "accessLogWithAD" || ilIIli11 != "drawContent") && l11i1lII && (llIIII11 = JSON.parse(l11i1lII));
  } catch (IlliiI11) {
    console.log("🤬 " + ilIIli11 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let Iiii1ii1 = "";
    switch (ilIIli11) {
      case "抽奖":
        if (typeof llIIII11 == "object") {
          if (llIIII11.success && llIIII11.success === true && llIIII11.data) {
            if (llIIII11.data.status && llIIII11.data.status == 200) {
              if (llIIII11.data.data.sendResult) console.log("抽中：" + llIIII11.data.data.awardSetting.awardName);else {
                if (!llIIII11.data.data.result) console.log("空气");else {
                  console.log(llIIII11.data.data);
                }
              }
            } else llIIII11.data.status && llIIII11.data.status == 500 && console.log("" + (llIIII11.data.msg || ""));
          } else llIIII11.message ? console.log("" + (llIIII11.message || "")) : console.log(l11i1lII);
        } else console.log(l11i1lII);
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
        Iiii1ii1 = "";
        if (ilIIli11 == "followShop") Iiii1ii1 = "关注";
        if (ilIIli11 == "addCart") Iiii1ii1 = "加购";
        if (typeof llIIII11 == "object") {
          if (llIIII11.success && llIIII11.success === true && llIIII11.data) {
            if (llIIII11.data.status && llIIII11.data.status == 200) {
              llIIII11 = llIIII11.data;
              if (ilIIli11 != "setMixNick" && (llIIII11.msg || llIIII11.data.isOpenCard || llIIII11.data.remark)) console.log("🔊 " + (Iiii1ii1 && Iiii1ii1 + ":" || "") + (llIIII11.msg || llIIII11.data.isOpenCard || llIIII11.data.remark || ""));
              if (ilIIli11 == "activity_load") {
                if (llIIII11.msg || llIIII11.data.isOpenCard) {
                  if ((llIIII11.msg || llIIII11.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (llIIII11.data) {
                  $.endTime = llIIII11.data.cusActivity.endTime || 0;
                  $.MixNick = llIIII11.data.missionCustomer.buyerNick || "";
                  $.usedChance = llIIII11.data.missionCustomer.usedChance || 0;
                  $.totalPoint = llIIII11.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = llIIII11.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = llIIII11.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (ilIIli11 == "shopList") $.openList = llIIII11.data || [];else {
                  if (ilIIli11 == "mission") {
                    llIIII11.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;
                  } else {
                    if (ilIIli11 == "uniteOpenCardOne") $.uniteOpenCar = llIIII11.msg || llIIII11.data.msg || "";else {
                      if (ilIIli11 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let llI11il1 = 0;
                        for (let Iillill in llIIII11.data.list || []) {
                          let iiiii1li = llIIII11.data.list[Iillill];
                          llI11il1 += Number(iiiii1li.awardDes);
                        }
                        if (llI11il1 > 0) console.log("🔊 共获得" + llI11il1 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else ilIIli11 == "missionInviteList" && console.log("🔊 邀请人数(" + llIIII11.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (llIIII11.data.msg) {
                llIIII11.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (llIIII11.data.msg || ""));
              } else {
                if (llIIII11.errorMessage) {
                  if (llIIII11.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (llIIII11.errorMessage || ""));
                } else {
                  console.log("" + l11i1lII);
                }
              }
            }
          } else llIIII11.errorMessage ? console.log("🔊 " + (llIIII11.errorMessage || "")) : console.log("" + l11i1lII);
        } else {}
        break;
      default:
        console.log((Iiii1ii1 || ilIIli11) + "-> " + l11i1lII);
    }
    if (typeof llIIII11 == "object") {
      if (llIIII11.errorMessage) {
        if (llIIII11.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (Ilili1li) {}
}
function II11ll11(lI1I1il1, li1i111l, ii1iII1 = "POST") {
  let iii1Ili1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iIIlII1l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lI1I1il1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (iii1Ili1.Origin = "https://jinggengjcq-isv.isvjcloud.com", iii1Ili1["Content-Type"] = "application/json; charset=utf-8", delete iii1Ili1.Cookie), {
    "url": lI1I1il1,
    "method": ii1iII1,
    "headers": iii1Ili1,
    "body": li1i111l,
    "timeout": 30 * 1000
  };
}
function Iiil1ii(i1i1li, llIIIl1) {
  d = {
    "actId": $.actId,
    ...llIIIl1,
    "method": i1i1li,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = ilillIll(d);
  const l11I1 = {
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
        ...llIIIl1,
        "method": i1i1li,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return i1i1li.indexOf("missionInviteList") > -1 && delete l11I1.params.admJson.actId, $.toStr(l11I1, l11I1);
}
function liiiiIl1(li1l1lli, lilIillI) {
  return Math.floor(Math.random() * (lilIillI - li1l1lli)) + li1l1lli;
}
function ilillIll(lili1i1i) {
  return AppSecret = "6cc5dbd8900e434b94c4bdb0c16348ed", key = "c1614da9ac68", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(lili1i1i)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
    "sign": sign,
    "timeStamp": time2
  };
}
async function ilIli1il() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const iIIIill1 = CryptoJS.enc.Utf8.parse(id),
    IlilIill = CryptoJS.enc.Base64.stringify(iIIIill1);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": IlilIill,
      "od": "",
      "ov": "Ctq=",
      "ud": IlilIill
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function i11liiii(l1iIll1i) {
  l1iIll1i = l1iIll1i || 32;
  let lii1l11I = "abcdef0123456789",
    Iiii1ilI = lii1l11I.length,
    iilI1ll1 = "";
  for (i = 0; i < l1iIll1i; i++) iilI1ll1 += lii1l11I.charAt(Math.floor(Math.random() * Iiii1ilI));
  return iilI1ll1;
}
function ilIIiii1(i1II11i) {
  if (typeof i1II11i == "string") try {
    return JSON.parse(i1II11i);
  } catch (Il1iii1) {
    return console.log(Il1iii1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function iII1IlI1() {
  if (!$.joinVenderId) return;
  return new Promise(async lliIlilI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lill11i1 = "";
    if ($.shopactivityId) lill11i1 = ",\"activityId\":" + $.shopactivityId;
    const IIiilliI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lill11i1 + ",\"channel\":406}",
      iIii1ll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIiilliI)
      };
    for (var iIi1llI = "", Ii1il1i = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", lllll1iI = 0; lllll1iI < 16; lllll1iI++) {
      var llIlIl1I = Math.round(Math.random() * (Ii1il1i.length - 1));
      iIi1llI += Ii1il1i.substring(llIlIl1I, llIlIl1I + 1);
    }
    uuid = Buffer.from(iIi1llI, "utf8").toString("base64");
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
    const lI1I1l1 = await IlilIIi("8adfb", iIii1ll),
      iIIIIil1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IIiilliI + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lI1I1l1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIIlII1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIIIIil1, async (iIl11i1, i1liliII, i1IlI11) => {
      try {
        if (iIl11i1) {
          if (i1liliII && typeof i1liliII.statusCode != "undefined") {
            if (i1liliII.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          i1IlI11 = i1IlI11 && i1IlI11.match(/jsonp_.*?\((.*?)\);/) && i1IlI11.match(/jsonp_.*?\((.*?)\);/)[1] || i1IlI11;
          let iIilIIIi = $.toObj(i1IlI11, i1IlI11);
          if (iIilIIIi && typeof iIilIIIi == "object") {
            if (iIilIIIi && iIilIIIi.success === true) {
              console.log(" >> " + iIilIIIi.message);
              $.errorJoinShop = iIilIIIi.message;
              if (iIilIIIi.result && iIilIIIi.result.giftInfo) for (let I1lIIil1 of iIilIIIi.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + I1lIIil1.discountString + I1lIIil1.prizeName + I1lIIil1.secondLineDesc);
              }
            } else iIilIIIi && typeof iIilIIIi == "object" && iIilIIIi.message ? ($.errorJoinShop = iIilIIIi.message, console.log("" + (iIilIIIi.message || ""))) : console.log(i1IlI11);
          } else console.log(i1IlI11);
        }
      } catch (iiIII) {
        $.logErr(iiIII, i1liliII);
      } finally {
        lliIlilI();
      }
    });
  });
}
async function i1iIiI1l() {
  return new Promise(async lil1il => {
    const iiIlI11l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      l1ilill = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iiIlI11l)
      };
    await $.wait(1000);
    const l11li1lI = await IlilIIi("8adfb", l1ilill),
      li1l11iI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iiIlI11l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11li1lI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIIlII1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(li1l11iI, async (i1iliilI, IIIIii1I, lI11i11i) => {
      try {
        if (i1iliilI) IIIIii1I && typeof IIIIii1I.statusCode != "undefined" && IIIIii1I.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lI11i11i = lI11i11i && lI11i11i.match(/jsonp_.*?\((.*?)\);/) && lI11i11i.match(/jsonp_.*?\((.*?)\);/)[1] || lI11i11i;
          let iiIi1i1I = $.toObj(lI11i11i, lI11i11i);
          if (iiIi1i1I && typeof iiIi1i1I == "object") iiIi1i1I && iiIi1i1I.success == true && (console.log("去加入：" + (iiIi1i1I.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iiIi1i1I.result.interestsRuleList && iiIi1i1I.result.interestsRuleList[0] && iiIi1i1I.result.interestsRuleList[0].interestsInfo && iiIi1i1I.result.interestsRuleList[0].interestsInfo.activityId || "");else {
            console.log(lI11i11i);
          }
        }
      } catch (iIilIill) {
        $.logErr(iIilIill, IIIIii1I);
      } finally {
        lil1il();
      }
    });
  });
}
function iII1I1(Ili1lI1I) {
  return new Promise(ll111i1i => {
    const iIII1iii = {
      "url": Ili1lI1I + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iIII1iii, async (Il1IlIlI, l1iI111I, i1iIIlII) => {
      try {
        if (Il1IlIlI) $.getAuthorCodeListerr = false;else {
          if (i1iIIlII) i1iIIlII = JSON.parse(i1iIIlII);
          $.getAuthorCodeListerr = true;
        }
      } catch (I1iIi) {
        $.logErr(I1iIi, l1iI111I);
        i1iIIlII = null;
      } finally {
        ll111i1i(i1iIIlII);
      }
    });
  });
}
function liiiiIl1(lll1I11l, llIIIiii) {
  return Math.floor(Math.random() * (llIIIiii - lll1I11l)) + lll1I11l;
}
function i1IlIII() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const I1i1li1I = Array.from(new Set($.blacklist.split("&")));
  console.log(I1i1li1I.join("&") + "\n");
  let IIlii1l1 = I1i1li1I,
    lllI11ll = [],
    lili1IiI = false;
  for (let I1l111l = 0; I1l111l < l1Illli1.length; I1l111l++) {
    let ll1l1l = decodeURIComponent(l1Illli1[I1l111l].match(/pt_pin=([^; ]+)(?=;?)/) && l1Illli1[I1l111l].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ll1l1l) break;
    let l1liilIi = false;
    for (let li1li1il of IIlii1l1) {
      if (li1li1il && li1li1il == ll1l1l) {
        l1liilIi = true;
        break;
      }
    }
    !l1liilIi && (lili1IiI = true, lllI11ll.splice(I1l111l, -1, l1Illli1[I1l111l]));
  }
  if (lili1IiI) l1Illli1 = lllI11ll;
}
function I1l11i1I(li1l1iii, ilIl1iii) {
  ilIl1iii != 0 && li1l1iii.unshift(li1l1iii.splice(ilIl1iii, 1)[0]);
}
function Iil1I1Il() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(l1Illli1, l1Illli1));
    return;
  }
  console.log("当前已设置白名单：");
  const I1ilIili = Array.from(new Set($.whitelist.split("&")));
  console.log(I1ilIili.join("&") + "\n");
  let lllIllI = [],
    l1Iiiil = I1ilIili;
  for (let lIi1III1 in l1Illli1) {
    let IiI1iIi = decodeURIComponent(l1Illli1[lIi1III1].match(/pt_pin=([^; ]+)(?=;?)/) && l1Illli1[lIi1III1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    l1Iiiil.includes(IiI1iIi) && lllIllI.push(l1Illli1[lIi1III1]);
  }
  helpCookiesArr = lllIllI;
  if (l1Iiiil.length > 1) {
    for (let lili1lIl in l1Iiiil) {
      let IlliIII = l1Iiiil[l1Iiiil.length - 1 - lili1lIl];
      if (!IlliIII) continue;
      for (let IIlliIiI in helpCookiesArr) {
        let iliiilII = decodeURIComponent(helpCookiesArr[IIlliIiI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[IIlliIiI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (IlliIII == iliiilII) {
          I1l11i1I(helpCookiesArr, IIlliIiI);
        }
      }
    }
  }
}
