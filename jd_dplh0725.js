/*
大牌联合0725期

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
1 12 28,30 * * jd_dplh0725.js
*/
let opencard_toShop = "false"
const Env=require('./utils/Env.js');
const $ = new Env("大牌联合0725期");
const II11Iiil = $.isNode() ? require("./jdCookie.js") : "",
  i1iliiII = $.isNode() ? require("./sendNotify") : "";
let l1IlI1II = [],
  Ili11I1l = "",
  Iilii11I = "",
  lIi1iiiI = "";
if ($.isNode()) {
  Object.keys(II11Iiil).forEach(iIIiIl11 => {
    l1IlI1II.push(II11Iiil[iIIiIl11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1IlI1II = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l11ilII1($.getdata("CookiesJD") || "[]").map(I1iI1I1l => I1iI1I1l.cookie)].filter(I11liIli => !!I11liIli);
let il1iIii = "30",
  lIii11II = "0";
il1iIii = $.isNode() ? process.env.retrynum ? process.env.retrynum : il1iIii : $.getdata("retrynum") ? $.getdata("retrynum") : lIii11II;
lIii11II = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : lIii11II : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : lIii11II;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
$.Url = "https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC202307025dda/oC202307025dda?actId=87bbce11cb4c49d6ae_230725";
$.bianh = $.Url.match(/oC[0-9a-z]+/)[0];
let l1Ili1ii = "",
  li1IiiII = "",
  llI11I = $.Url.match(/actId=([0-9a-f]+_\d+)/)[1];
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const l1IiIIli = require("./function/dylank"),
  iiI1i1l = require("./function/dylany");
let lIillil = "https://jinggengjcq-isv.isvjcloud.com";
li1IiiII = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + li1IiiII : $.getdata("helpnum") ? $.getdata("helpnum") : "" + li1IiiII;
let I1IlII1 = "",
  il1Illll = "";
$.whitelist = process.env.DPLHTY_whitelist || I1IlII1;
$.blacklist = process.env.DPLHTY_blacklist || il1Illll;
I1li1l1i();
Il11liIi();
if (!"obs") return;
!(async () => {
  authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = li1IiiII ? li1IiiII : authorCodeList[ii11l111(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + llI11I);
  console.log("\n💬 默认抽奖次数：" + lIii11II + " 💬 重试次数：" + il1iIii);
  console.log("\n💬 请在有水的情况下运行");
  if (!l1IlI1II[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = llI11I;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  await iIiIilI($.Url);
  await IIIiiIii();
  for (let i1iIIlii = 0; i1iIIlii < l1IlI1II.length; i1iIIlii++) {
    Ili11I1l = l1IlI1II[i1iIIlii];
    if (Ili11I1l) {
      $.UserName = decodeURIComponent(Ili11I1l.match(/pt_pin=([^; ]+)(?=;?)/) && Ili11I1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1iIIlii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await ilIliI1();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await lIIIIiIl();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let l1I1IliI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + l1I1IliI);
    if ($.isNode()) await i1iliiII.sendNotify("" + $.name, "" + l1I1IliI);
  }
})().catch(l1IIII1 => $.logErr(l1IIII1)).finally(() => $.done());
async function lIIIIiIl() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    l1Ili1ii = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await l1IiIIli(Ili11I1l, lIillil);
    if (!$.Token) {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await III111("activity_load");
    for (let III1ili = 0; III1ili < il1iIii; III1ili++) {
      if ($.retry || $.krretry) {
        await III111("activity_load");
        if ($.krFlag) break;
      }
    }
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("❌ 获取[活动信息]失败，可能是黑号");
      return;
    }
    $.toBind = 0;
    $.openList = [];
    await III111("绑定");
    for (let l1llIi1l = 0; l1llIi1l < il1iIii; l1llIi1l++) {
      if ($.retry || $.krretry) {
        await III111("绑定");
        if ($.krFlag) break;
      }
    }
    await III111("shopList");
    for (let iIliIliI = 0; iIliIliI < il1iIii; iIliIliI++) {
      if ($.retry || $.krretry) {
        await III111("shopList");
        if ($.krFlag) break;
      }
    }
    if ($.activityEnd) return;
    for (o of $.openList) {
      $.missionType = "openCard";
      if (o.open != true && o.openCardUrl) {
        if ($.activityEnd) return;
        if ($.outEnd) return;
        $.openCard = false;
        $.joinVenderId = o.userId;
        await III111("mission");
        for (let IlI111ii = 0; IlI111ii < il1iIii; IlI111ii++) {
          if ($.retry || $.krretry) {
            await III111("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await iiil1liI();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await iiil1liI(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await III111("activity_load");
          for (let lIl1lII = 0; lIl1lII < il1iIii; lIl1lII++) {
            if ($.retry || $.krretry) {
              await III111("activity_load");
              if ($.krFlag) break;
            }
          }
          await III111("shopList");
          for (let I11I1II = 0; I11I1II < il1iIii; I11I1II++) {
            if ($.retry || $.krretry) {
              await III111("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await III111("mission");
      for (let llII1 = 0; llII1 < il1iIii; llII1++) {
        if ($.retry || $.krretry) {
          await III111("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if (opencard_toShop + "" == "true") {
      let liIlI1lI = 3;
      console.log("💖 默认浏览任务次数:" + liIlI1lI);
      for (m = 1; liIlI1lI--; m++) {
        console.log("🌐 第" + m + "次浏览");
        $.missionType = "viewShop";
        await III111("mission");
        for (let IIliIiIi = 0; IIliIiIi < il1iIii; IIliIiIi++) {
          if ($.retry || $.krretry) {
            await III111("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        $.missionType = "viewGoods";
        await III111("mission");
        for (let lIIlIIIi = 0; lIIlIIIi < il1iIii; lIIlIIIi++) {
          if ($.retry || $.krretry) {
            await III111("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        if (m >= 3) {
          console.log("💔 浏览太多次，多余的次数请再执行脚本");
          break;
        }
      }
    } else console.log("🔊 如需浏览店铺请设置环境变量[opencard_toShop]为\"true\"");
    if (lIii11II + "" !== "0") {
      $.runFalag = true;
      let ll11I1ii = parseInt($.usedChance, 10);
      lIii11II = parseInt(lIii11II, 10);
      if (ll11I1ii > lIii11II) ll11I1ii = lIii11II;
      console.log("💖 抽奖次数为:" + ll11I1ii);
      for (m = 1; ll11I1ii--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await III111("抽奖");
        for (let Ii1i1I = 0; Ii1i1I < il1iIii; Ii1i1I++) {
          if ($.retry || $.krretry) {
            console.log("🔂 卡爆了，再重试一次");
            await III111("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(ll11I1ii) <= 0) break;
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
  } catch (IIi1IIli) {
    console.log(IIi1IIli);
  }
}
async function III111(IIl1IIii) {
  if ($.outFlag) return;
  let ilIIli1 = "https://jinggengjcq-isv.isvjcloud.com",
    llliIilI = "",
    II11iIi1 = "POST",
    iilii11i = "";
  switch (IIl1IIii) {
    case "activity_load":
      url = ilIIli1 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      iilii11i = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) iilii11i = {
        ...iilii11i,
        "shopId": "" + $.joinVenderId
      };
      llliIilI = III1ilII("/jdBigAlliance/activity/load", iilii11i);
      break;
    case "shopList":
      url = ilIIli1 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      iilii11i = {};
      llliIilI = III1ilII("/jdBigAlliance/shop/shopList", iilii11i);
      break;
    case "绑定":
      url = ilIIli1 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      iilii11i = {
        "missionType": "relationBind",
        "inviterNick": $.inviteNick || ""
      };
      llliIilI = III1ilII("/jdBigAlliance/customer/inviteRelation", iilii11i);
      break;
    case "mission":
      url = ilIIli1 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      iilii11i = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) iilii11i = {
        ...iilii11i,
        "shopId": $.joinVenderId
      };
      llliIilI = III1ilII("/jdBigAlliance/mission/completeMission", iilii11i);
      break;
    case "抽奖":
      url = ilIIli1 + "/dm/front/jdBigAlliance/interactive/drawPos?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      iilii11i = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      llliIilI = III1ilII("/jdBigAlliance/interactive/drawPos", iilii11i);
      break;
    case "followShop":
      url = ilIIli1 + "/dm/front/jdBigAlliance/followShop?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      iilii11i = {
        "actId": $.actId,
        "missionType": "collectShop"
      };
      llliIilI = III1ilII("/jdBigAlliance/followShop", iilii11i);
      break;
    case "addCart":
      url = ilIIli1 + "/dm/front/jdBigAlliance/addCart?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      iilii11i = {
        "actId": $.actId,
        "missionType": "addCart"
      };
      llliIilI = III1ilII("/jdBigAlliance/addCart", iilii11i);
      break;
    case "myAward":
      url = ilIIli1 + "/dm/front/jdBigAlliance/awards/list?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      iilii11i = {
        "pageNo": 1,
        "pageSize": 9999
      };
      llliIilI = III1ilII("/jdBigAlliance/awards/list", iilii11i);
      break;
    case "missionInviteList":
      url = ilIIli1 + "/dm/front/jdBigAlliance/customer/inviteList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
      iilii11i = {
        "inviteListRequest": {
          "actId": $.actId,
          "userId": 10299171,
          "missionType": "shareAct",
          "inviteType": 1,
          "buyerNick": $.MixNick || ""
        }
      };
      llliIilI = III1ilII("/jdBigAlliance/customer/inviteList", iilii11i);
      break;
    default:
      console.log("错误" + IIl1IIii);
  }
  let iiIliIII = Ili111i1(url, llliIilI, II11iIi1);
  return new Promise(async iI1lIlI1 => {
    $.post(iiIliIII, (iiIIl, iIIiliI, iIiii1I1) => {
      try {
        iiIIl ? (iIIiliI && iIIiliI.statusCode && iIIiliI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : Ili11iI(IIl1IIii, iIiii1I1);
      } catch (li11llli) {
        console.log(li11llli, iIIiliI);
      } finally {
        iI1lIlI1();
      }
    });
  });
}
async function Ili11iI(I1I1I11, II11Il1I) {
  let iiiIlill = "";
  try {
    $.krFlag = true;
    (I1I1I11 != "accessLogWithAD" || I1I1I11 != "drawContent") && II11Il1I && (iiiIlill = JSON.parse(II11Il1I));
  } catch (i1ii11II) {
    console.log("🤬 " + I1I1I11 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let iI1i11II = "";
    switch (I1I1I11) {
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
      case "抽奖":
      case "绑定":
        iI1i11II = "";
        if (I1I1I11 == "followShop") iI1i11II = "关注";
        if (I1I1I11 == "addCart") iI1i11II = "加购";
        if (typeof iiiIlill == "object") {
          if (iiiIlill.success && iiiIlill.success === true && iiiIlill.data) {
            if (iiiIlill.data.status && iiiIlill.data.status == 200) {
              iiiIlill = iiiIlill.data;
              if (I1I1I11 != "setMixNick" && (iiiIlill.msg || iiiIlill.data.isOpenCard || iiiIlill.data.remark)) console.log("🔊 " + (iI1i11II && iI1i11II + ":" || "") + (iiiIlill.msg || iiiIlill.data.isOpenCard || iiiIlill.data.remark || ""));
              if (I1I1I11 == "activity_load") {
                if (iiiIlill.msg || iiiIlill.data.isOpenCard) {
                  if ((iiiIlill.msg || iiiIlill.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                iiiIlill.data && ($.endTime = iiiIlill.data.cusActivity.endTime || 0, $.MixNick = iiiIlill.data.missionCustomer.buyerNick || "", $.usedChance = iiiIlill.data.missionCustomer.usedChance || 0, $.hasCollectShop = iiiIlill.data.missionCustomer.hasCollectShop || 0);
              } else {
                if (I1I1I11 == "shopList") $.openList = iiiIlill.data || [];else {
                  if (I1I1I11 == "mission") {
                    if (iiiIlill.data.remark.indexOf("不是会员") > -1) {
                      $.openCard = true;
                    } else $.openCard = false;
                  } else {
                    if (I1I1I11 == "uniteOpenCardOne") $.uniteOpenCar = iiiIlill.msg || iiiIlill.data.msg || "";else {
                      if (I1I1I11 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let iiI1Ilii = 0;
                        for (let IiIIll1i in iiiIlill.data.list || []) {
                          let ii1Il11i = iiiIlill.data.list[IiIIll1i];
                          iiI1Ilii += Number(ii1Il11i.awardDes);
                        }
                        if (iiI1Ilii > 0) console.log("🔊 共获得" + iiI1Ilii + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else {
                        if (I1I1I11 == "missionInviteList") {
                          console.log("🔊 邀请人数(" + iiiIlill.data.invitedLogList.total + ")");
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (iiiIlill.data.msg) {
                iiiIlill.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (iiiIlill.data.msg || ""));
              } else {
                if (iiiIlill.errorMessage) {
                  if (iiiIlill.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (iiiIlill.errorMessage || ""));
                } else console.log("" + II11Il1I);
              }
            }
          } else iiiIlill.errorMessage ? console.log("🔊 " + (iiiIlill.errorMessage || "")) : console.log("" + II11Il1I);
        } else {}
        break;
      default:
        console.log((iI1i11II || I1I1I11) + "-> " + II11Il1I);
    }
    if (typeof iiiIlill == "object") {
      if (iiiIlill.errorMessage) {
        if (iiiIlill.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (i1IIi1i1) {}
}
function Ili111i1(iIIIiii, I1Ilili, IiillI1i = "POST") {
  let I1Iil111 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Ili11I1l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iIIIiii.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (I1Iil111.Origin = "https://jinggengjcq-isv.isvjcloud.com", I1Iil111["Content-Type"] = "application/json; charset=utf-8", delete I1Iil111.Cookie), {
    "url": iIIIiii,
    "method": IiillI1i,
    "headers": I1Iil111,
    "body": I1Ilili,
    "timeout": 10 * 1000
  };
}
function III1ilII(II1ii1iI, Illiilii) {
  d = {
    "actId": $.actId,
    ...Illiilii,
    "method": II1ii1iI,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = IIIliII(d);
  const Ii1ll111 = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "m": "POST",
        "oba": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ...Illiilii,
        "method": II1ii1iI,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return II1ii1iI.indexOf("missionInviteList") > -1 && delete Ii1ll111.params.admJson.actId, $.toStr(Ii1ll111, Ii1ll111);
}
function ii11l111(ll1l1l1i, ilillIiI) {
  return Math.floor(Math.random() * (ilillIiI - ll1l1l1i)) + ll1l1l1i;
}
function IIIliII(liIilii) {
  return AppSecret = lIi1iiiI || "6cc5dbd8900e434b94c4bdb0c16348ed", key = Iilii11I || "c1614da9ac68", time2 = new Date().valueOf(), s2 = encodeURIComponent(JSON.stringify(liIilii)), c = new RegExp("'", "g"), A = new RegExp("~", "g"), s2 = s2.replace(c, "%27"), s2 = s2.replace(A, "%7E"), signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret, sign = CryptoJS.MD5(signBody.toLowerCase()).toString(), {
    "sign": sign,
    "timeStamp": time2
  };
}
async function ilIliI1() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const ill1Iill = CryptoJS.enc.Utf8.parse(id),
    lIi1l1li = CryptoJS.enc.Base64.stringify(ill1Iill);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": lIi1l1li,
      "od": "",
      "ov": "Ctq=",
      "ud": lIi1l1li
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function Ill1iiIi(ii1iiil) {
  ii1iiil = ii1iiil || 32;
  let Illi1ili = "abcdef0123456789",
    lI11iI11 = Illi1ili.length,
    IIl1lll = "";
  for (i = 0; i < ii1iiil; i++) IIl1lll += Illi1ili.charAt(Math.floor(Math.random() * lI11iI11));
  return IIl1lll;
}
function l11ilII1(I11IiI11) {
  if (typeof I11IiI11 == "string") {
    try {
      return JSON.parse(I11IiI11);
    } catch (IiIlIIl) {
      return console.log(IiIlIIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function iiil1liI() {
  if (!$.joinVenderId) return;
  return new Promise(async I1ll1lI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iI1iIiiI = "";
    if ($.shopactivityId) iI1iIiiI = ",\"activityId\":" + $.shopactivityId;
    const l1Il1Iii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iI1iIiiI + ",\"channel\":406}",
      IIili1il = {
        "appId": "8adfb",
        "apid": "jd_shop_member",
        "fn": "bindWithVender",
        "ver": "9.2.0",
        "cl": "H5",
        "body": JSON.parse(l1Il1Iii),
        "code": 0,
        "user": $.UserName,
        "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      };
    for (var llii1lIl = "", I1i1l1I = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iIllI1 = 0; iIllI1 < 16; iIllI1++) {
      var i1I1l1I1 = Math.round(Math.random() * (I1i1l1I.length - 1));
      llii1lIl += I1i1l1I.substring(i1I1l1I1, i1I1l1I1 + 1);
    }
    uuid = Buffer.from(llii1lIl, "utf8").toString("base64");
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
    const llIIii1l = await iiI1i1l.getbody(IIili1il),
      llIl1ill = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + l1Il1Iii + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st" + llIIii1l.split("h5st")[1],
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ili11I1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(llIl1ill, async (lIiiiIl, iIIIl1, IlIiIIl) => {
      try {
        if (lIiiiIl) {
          iIIIl1 && typeof iIIIl1.statusCode != "undefined" && iIIIl1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          IlIiIIl = IlIiIIl && IlIiIIl.match(/jsonp_.*?\((.*?)\);/) && IlIiIIl.match(/jsonp_.*?\((.*?)\);/)[1] || IlIiIIl;
          let II1il1I1 = $.toObj(IlIiIIl, IlIiIIl);
          if (II1il1I1 && typeof II1il1I1 == "object") {
            if (II1il1I1 && II1il1I1.success === true) {
              console.log(" >> " + II1il1I1.message);
              $.errorJoinShop = II1il1I1.message;
              if (II1il1I1.result && II1il1I1.result.giftInfo) for (let i1Illl of II1il1I1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + i1Illl.discountString + i1Illl.prizeName + i1Illl.secondLineDesc);
              }
            } else II1il1I1 && typeof II1il1I1 == "object" && II1il1I1.message ? ($.errorJoinShop = II1il1I1.message, console.log("" + (II1il1I1.message || ""))) : console.log(IlIiIIl);
          } else console.log(IlIiIIl);
        }
      } catch (I1IIIlI1) {
        $.logErr(I1IIIlI1, iIIIl1);
      } finally {
        I1ll1lI();
      }
    });
  });
}
async function i11iilli() {
  return new Promise(async iI1lIi11 => {
    const I1III1iI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      Illliii1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1III1iI)
      };
    await $.wait(1000);
    const lIil1ii = await iiI1i1l("8adfb", Illliii1),
      IiII1li = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I1III1iI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIil1ii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ili11I1l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IiII1li, async (liilIII1, ilI11i1I, IiIiiI1) => {
      try {
        if (liilIII1) ilI11i1I && typeof ilI11i1I.statusCode != "undefined" && ilI11i1I.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IiIiiI1 = IiIiiI1 && IiIiiI1.match(/jsonp_.*?\((.*?)\);/) && IiIiiI1.match(/jsonp_.*?\((.*?)\);/)[1] || IiIiiI1;
          let lI1i11I = $.toObj(IiIiiI1, IiIiiI1);
          lI1i11I && typeof lI1i11I == "object" ? lI1i11I && lI1i11I.success == true && (console.log("去加入：" + (lI1i11I.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = lI1i11I.result.interestsRuleList && lI1i11I.result.interestsRuleList[0] && lI1i11I.result.interestsRuleList[0].interestsInfo && lI1i11I.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(IiIiiI1);
        }
      } catch (iii1iIi) {
        $.logErr(iii1iIi, ilI11i1I);
      } finally {
        iI1lIi11();
      }
    });
  });
}
function i1lli1I(lli1liiI) {
  return new Promise(lI1111l => {
    const lilIiIII = {
      "url": lli1liiI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lilIiIII, async (il11iIii, IIiIlliI, IIliII1) => {
      try {
        if (il11iIii) $.getAuthorCodeListerr = false;else {
          if (IIliII1) IIliII1 = JSON.parse(IIliII1);
          $.getAuthorCodeListerr = true;
        }
      } catch (liIlii1l) {
        $.logErr(liIlii1l, IIiIlliI);
        IIliII1 = null;
      } finally {
        lI1111l(IIliII1);
      }
    });
  });
}
function ii11l111(iIilii1, iIli1li) {
  return Math.floor(Math.random() * (iIli1li - iIilii1)) + iIilii1;
}
function Il11liIi() {
  const ll1Iiili = function () {
      let iI1liill = true;
      return function (iIlIi1ll, iiII11i1) {
        const i1IiI1Il = iI1liill ? function () {
          if (iiII11i1) {
            const l1Iil1i = iiII11i1.apply(iIlIi1ll, arguments);
            return iiII11i1 = null, l1Iil1i;
          }
        } : function () {};
        return iI1liill = false, i1IiI1Il;
      };
    }(),
    I1lllI1l = ll1Iiili(this, function () {
      return I1lllI1l.toString().search("(((.+)+)+)+$").toString().constructor(I1lllI1l).search("(((.+)+)+)+$");
    });
  I1lllI1l();
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const illii1i = Array.from(new Set($.blacklist.split("&")));
  console.log(illii1i.join("&") + "\n");
  let ilill1l1 = illii1i,
    ililliIl = [],
    I11lii = false;
  for (let iiI111li = 0; iiI111li < l1IlI1II.length; iiI111li++) {
    let l1Ill11i = decodeURIComponent(l1IlI1II[iiI111li].match(/pt_pin=([^; ]+)(?=;?)/) && l1IlI1II[iiI111li].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!l1Ill11i) break;
    let Iil1iIII = false;
    for (let iiI1I1lI of ilill1l1) {
      if (iiI1I1lI && iiI1I1lI == l1Ill11i) {
        Iil1iIII = true;
        break;
      }
    }
    !Iil1iIII && (I11lii = true, ililliIl.splice(iiI111li, -1, l1IlI1II[iiI111li]));
  }
  if (I11lii) l1IlI1II = ililliIl;
}
function IliIiIlI(ilI1il, lili11I) {
  lili11I != 0 && ilI1il.unshift(ilI1il.splice(lili11I, 1)[0]);
}
function IIIiiIii() {
  let llIiil1I = {
    "url": "https://jinggengjcq-isv.isvjcloud.com/jdbeverage/static/js/index." + $.jscode + ".js",
    "headers": {
      "User-Agent": $.UA
    }
  };
  return new Promise(i1liiI1l => {
    $.get(llIiil1I, async (Ili1li1l, Ii111Iil, IIliiII) => {
      try {
        if (Ili1li1l) {
          console.log("" + JSON.stringify(Ili1li1l));
          console.log("get请求失败，请检查网路重试");
        } else {
          $.bianh = "pages-" + $.bianh + "-" + $.bianh;
          let I111i11i = new RegExp("\"" + $.bianh + "\":\"([0-9a-f]{8})\"");
          $.bianh = $.bianh + "." + IIliiII.match(I111i11i)[1];
          let l1l1liiI = await ll11llIl("https://jinggengjcq-isv.isvjcloud.com/jdbeverage/static/js/" + $.bianh + ".js");
          lIi1iiiI = l1l1liiI.match(/as:\"([0-9a-f]{32})\"/)[1];
          Iilii11I = l1l1liiI.match(/ak:\"([0-9a-f]{12})\"/)[1];
        }
      } catch (I1IlI1il) {} finally {
        i1liiI1l();
      }
    });
  });
}
function iIiIilI(ll1lIIii) {
  let il11lIlI = {
    "url": ll1lIIii,
    "headers": {
      "User-Agent": $.UA
    }
  };
  return new Promise(I11l1iI1 => {
    $.get(il11lIlI, async (Illlll1l, l1l11i, iii1lIl) => {
      try {
        Illlll1l ? (console.log("" + JSON.stringify(Illlll1l)), console.log("get请求失败，请检查网路重试")) : $.jscode = iii1lIl.match(/index.([0-9a-f]{8}).js/)[1];
      } catch (iil1lIiI) {} finally {
        I11l1iI1();
      }
    });
  });
}
function ll11llIl(iiIiil1I) {
  let llll1Il = {
    "url": iiIiil1I,
    "headers": {
      "User-Agent": $.UA
    }
  };
  return new Promise(l1il1Iil => {
    $.get(llll1Il, async (IIIlii, lllIIlli, I1Ill1I1) => {
      try {
        if (IIIlii) {
          console.log("" + JSON.stringify(IIIlii));
          console.log("get请求失败，请检查网路重试");
        } else {}
      } catch (IlI1iiiI) {} finally {
        l1il1Iil(I1Ill1I1);
      }
    });
  });
}
function I1li1l1i() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(l1IlI1II, l1IlI1II));
    return;
  }
  console.log("当前已设置白名单：");
  const I1iiIII1 = Array.from(new Set($.whitelist.split("&")));
  console.log(I1iiIII1.join("&") + "\n");
  let illIiIiI = [],
    l1liiIII = I1iiIII1;
  for (let iiIlIIll in l1IlI1II) {
    let i11il1lI = decodeURIComponent(l1IlI1II[iiIlIIll].match(/pt_pin=([^; ]+)(?=;?)/) && l1IlI1II[iiIlIIll].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    l1liiIII.includes(i11il1lI) && illIiIiI.push(l1IlI1II[iiIlIIll]);
  }
  helpCookiesArr = illIiIiI;
  if (l1liiIII.length > 1) {
    for (let Il1lIl1l in l1liiIII) {
      let iillil1l = l1liiIII[l1liiIII.length - 1 - Il1lIl1l];
      if (!iillil1l) continue;
      for (let iiiII11i in helpCookiesArr) {
        let iii1iiI1 = decodeURIComponent(helpCookiesArr[iiiII11i].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iiiII11i].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        iillil1l == iii1iiI1 && IliIiIlI(helpCookiesArr, iiiII11i);
      }
    }
  }
}