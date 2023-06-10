/*
大牌联合0608期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230608gfdc/oC20230608gfdc?actId=8cf477e45b614623aac4bec369623_230608

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
#大牌联合0608期
1 18 10,12 * * jd_dplh0608.js, tag=大牌联合0608期, enabled=true
*/
let opencard_toShop = "false"
const Env = require('./utils/Env.js');
const $ = new Env("大牌联合0608期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(l1i111l1 => {
    cookiesArr.push(jdCookieNode[l1i111l1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(l1llII1I => l1llII1I.cookie)].filter(IIiil1ll => !!IIiil1ll);
let retrynum = "30",
  opencard_draw = "0";
retrynum = $.isNode() ? process.env.retrynum ? process.env.retrynum : retrynum : $.getdata("retrynum") ? $.getdata("retrynum") : opencard_draw;
opencard_draw = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : opencard_draw : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : opencard_draw;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  helpnum = "",
  KRDPLHTY = "8cf477e45b614623aac4bec369623_230608";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let domains = "https://jinggengjcq-isv.isvjcloud.com";
helpnum = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + helpnum : $.getdata("helpnum") ? $.getdata("helpnum") : "" + helpnum;
let whitelist = "",
  blacklist = "";
$.whitelist = process.env.DPLHTY_whitelist || whitelist;
$.blacklist = process.env.DPLHTY_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
    authorCodeList = ["oWYzEz0N7KY058rLNke8o87TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F"];
  $.authorCode = helpnum ? helpnum : authorCodeList[random(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + KRDPLHTY);
  console.log("\n💬 默认抽奖次数：" + opencard_draw + " 💬 重试次数：" + retrynum);
  console.log("\n💬 请在有水的情况下运行");
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = KRDPLHTY;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let i1iIi1Ii = 0; i1iIi1Ii < cookiesArr.length; i1iIi1Ii++) {
    cookie = cookiesArr[i1iIi1Ii];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1iIi1Ii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await getUa();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await run();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let III1II1l = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + III1II1l);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + III1II1l);
  }
})().catch(il1lilIl => $.logErr(il1lilIl)).finally(() => $.done());
async function run() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await takePostRequest("activity_load");
    for (let iil11I1 = 0; iil11I1 < retrynum; iil11I1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("activity_load");
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
    await takePostRequest("绑定");
    for (let l1I1IlIi = 0; l1I1IlIi < retrynum; l1I1IlIi++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let i1iIIIi1 = 0; i1iIIIi1 < retrynum; i1iIIIi1++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("shopList");
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
        await takePostRequest("mission");
        for (let l1i1III1 = 0; l1i1III1 < retrynum; l1i1III1++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await joinShop();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("😤 呜呜呜，重试开卡"), await $.wait(1000), await joinShop(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 无法开卡,跳过运行");
            return;
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("activity_load");
          for (let il1l1ili = 0; il1l1ili < retrynum; il1l1ili++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let l1lll11 = 0; l1lll11 < retrynum; l1lll11++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await takePostRequest("mission");
      for (let llilIil1 = 0; llilIil1 < retrynum; llilIil1++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await takePostRequest("mission");
      for (let llIli1Il = 0; llIli1Il < retrynum; llIli1Il++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成加购任务");
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let iliiIiI1 = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (iliiIiI1 > opencard_draw) iliiIiI1 = opencard_draw;
      console.log("💖 抽奖次数为:" + iliiIiI1);
      for (m = 1; iliiIiI1--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let IIi1il = 0; IIi1il < retrynum; IIi1il++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(iliiIiI1) <= 0) break;
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
  } catch (lIiIIlI) {
    console.log(lIiIIlI);
  }
}
async function takePostRequest(iiil1II1) {
  if ($.outFlag) return;
  let I1IlI1Il = "https://jinggengjcq-isv.isvjcloud.com",
    l11ili1I = "",
    iIiilil1 = "POST",
    i11ilIii = "";
  switch (iiil1II1) {
    case "activity_load":
      url = I1IlI1Il + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i11ilIii = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) i11ilIii = {
        ...i11ilIii,
        "shopId": "" + $.joinVenderId
      };
      l11ili1I = taskPostUrl("/jdBigAlliance/activity/load", i11ilIii);
      break;
    case "shopList":
      url = I1IlI1Il + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i11ilIii = {};
      l11ili1I = taskPostUrl("/jdBigAlliance/shop/shopList", i11ilIii);
      break;
    case "绑定":
      url = I1IlI1Il + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i11ilIii = {
        "inviterNick": $.inviteNick || ""
      };
      l11ili1I = taskPostUrl("/jdBigAlliance/customer/inviteRelation", i11ilIii);
      break;
    case "mission":
      url = I1IlI1Il + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i11ilIii = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) i11ilIii = {
        ...i11ilIii,
        "shopId": $.joinVenderId
      };
      l11ili1I = taskPostUrl("/jdBigAlliance/mission/completeMission", i11ilIii);
      break;
    case "抽奖":
      url = I1IlI1Il + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      i11ilIii = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      l11ili1I = taskPostUrl("/jdBigAlliance/interactive/drawPost", i11ilIii);
      break;
    default:
      console.log("错误" + iiil1II1);
  }
  let lliiI1l1 = getPostRequest(url, l11ili1I, iIiilil1);
  return new Promise(async ll1lIlli => {
    $.post(lliiI1l1, (i1liIili, lii1I1Ii, l1I1Ii) => {
      try {
        if (i1liIili) {
          if (lii1I1Ii && lii1I1Ii.statusCode && lii1I1Ii.statusCode == 493) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            $.outFlag = true;
          }
          $.retry = true;
        } else dealReturn(iiil1II1, l1I1Ii);
      } catch (ii111ili) {
        console.log(ii111ili, lii1I1Ii);
      } finally {
        ll1lIlli();
      }
    });
  });
}
async function dealReturn(i1iIll11, I11lI11i) {
  let IiIIlIli = "";
  try {
    $.krFlag = true;
    if (i1iIll11 != "accessLogWithAD" || i1iIll11 != "drawContent") {
      I11lI11i && (IiIIlIli = JSON.parse(I11lI11i));
    }
  } catch (i1I1iil) {
    console.log("🤬 " + i1iIll11 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let I1I1I1I1 = "";
    switch (i1iIll11) {
      case "抽奖":
        if (typeof IiIIlIli == "object") {
          if (IiIIlIli.success && IiIIlIli.success === true && IiIIlIli.data) {
            if (IiIIlIli.data.status && IiIIlIli.data.status == 200) {
              if (IiIIlIli.data.data.sendResult) console.log("抽中：" + IiIIlIli.data.data.awardSetting.awardName);else !IiIIlIli.data.data.result ? console.log("空气") : console.log(IiIIlIli.data.data);
            } else IiIIlIli.data.status && IiIIlIli.data.status == 500 && console.log("" + (IiIIlIli.data.msg || ""));
          } else IiIIlIli.message ? console.log("" + (IiIIlIli.message || "")) : console.log(I11lI11i);
        } else console.log(I11lI11i);
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
        I1I1I1I1 = "";
        if (i1iIll11 == "followShop") I1I1I1I1 = "关注";
        if (i1iIll11 == "addCart") I1I1I1I1 = "加购";
        if (typeof IiIIlIli == "object") {
          if (IiIIlIli.success && IiIIlIli.success === true && IiIIlIli.data) {
            if (IiIIlIli.data.status && IiIIlIli.data.status == 200) {
              IiIIlIli = IiIIlIli.data;
              if (i1iIll11 != "setMixNick" && (IiIIlIli.msg || IiIIlIli.data.isOpenCard || IiIIlIli.data.remark)) console.log("🔊 " + (I1I1I1I1 && I1I1I1I1 + ":" || "") + (IiIIlIli.msg || IiIIlIli.data.isOpenCard || IiIIlIli.data.remark || ""));
              if (i1iIll11 == "activity_load") {
                if (IiIIlIli.msg || IiIIlIli.data.isOpenCard) {
                  if ((IiIIlIli.msg || IiIIlIli.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (IiIIlIli.data) {
                  $.endTime = IiIIlIli.data.cusActivity.endTime || 0;
                  $.MixNick = IiIIlIli.data.missionCustomer.buyerNick || "";
                  $.usedChance = IiIIlIli.data.missionCustomer.usedChance || 0;
                  $.totalPoint = IiIIlIli.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = IiIIlIli.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = IiIIlIli.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (i1iIll11 == "shopList") $.openList = IiIIlIli.data || [];else {
                  if (i1iIll11 == "mission") {
                    IiIIlIli.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;
                  } else {
                    if (i1iIll11 == "uniteOpenCardOne") $.uniteOpenCar = IiIIlIli.msg || IiIIlIli.data.msg || "";else {
                      if (i1iIll11 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let ill111Ii = 0;
                        for (let Ii111Iil in IiIIlIli.data.list || []) {
                          let IilliIl1 = IiIIlIli.data.list[Ii111Iil];
                          ill111Ii += Number(IilliIl1.awardDes);
                        }
                        if (ill111Ii > 0) console.log("🔊 共获得" + ill111Ii + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else i1iIll11 == "missionInviteList" && console.log("🔊 邀请人数(" + IiIIlIli.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (IiIIlIli.data.msg) {
                IiIIlIli.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                console.log("🔊 " + (IiIIlIli.data.msg || ""));
              } else {
                if (IiIIlIli.errorMessage) {
                  if (IiIIlIli.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (IiIIlIli.errorMessage || ""));
                } else console.log("" + I11lI11i);
              }
            }
          } else IiIIlIli.errorMessage ? console.log("🔊 " + (IiIIlIli.errorMessage || "")) : console.log("" + I11lI11i);
        } else {}
        break;
      default:
        console.log((I1I1I1I1 || i1iIll11) + "-> " + I11lI11i);
    }
    if (typeof IiIIlIli == "object") {
      if (IiIIlIli.errorMessage) {
        if (IiIIlIli.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (i1i1iI1I) {}
}
function getPostRequest(I11Ii1I, i11i1Il, ili1lI1 = "POST") {
  let IlIlIlil = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return I11Ii1I.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1 && (IlIlIlil.Origin = "https://jinggengjcq-isv.isvjcloud.com", IlIlIlil["Content-Type"] = "application/json; charset=utf-8", delete IlIlIlil.Cookie), {
    "url": I11Ii1I,
    "method": ili1lI1,
    "headers": IlIlIlil,
    "body": i11i1Il,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(i1ii1lIl, II1l1i1i) {
  d = {
    "actId": $.actId,
    ...II1l1i1i,
    "method": i1ii1lIl,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const illllii1 = {
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
        ...II1l1i1i,
        "method": i1ii1lIl,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return i1ii1lIl.indexOf("missionInviteList") > -1 && delete illllii1.params.admJson.actId, $.toStr(illllii1, illllii1);
}
function random(lillI1I1, l11iiIl) {
  return Math.floor(Math.random() * (l11iiIl - lillI1I1)) + lillI1I1;
}
function mpdzSign(IIilill) {
  AppSecret = "9cda3e17f5584913adf41bae3914e472";
  key = "1b43e7f40fe4";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(IIilill));
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
async function getUa() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const llii = CryptoJS.enc.Utf8.parse(id),
    II1IIill = CryptoJS.enc.Base64.stringify(llii);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": II1IIill,
      "od": "",
      "ov": "Ctq=",
      "ud": II1IIill
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(IliiIl11) {
  IliiIl11 = IliiIl11 || 32;
  let ll1Ilil1 = "abcdef0123456789",
    i111liI = ll1Ilil1.length,
    lIlIi1iI = "";
  for (i = 0; i < IliiIl11; i++) lIlIi1iI += ll1Ilil1.charAt(Math.floor(Math.random() * i111liI));
  return lIlIi1iI;
}
function jsonParse(IIliii1l) {
  if (typeof IIliii1l == "string") try {
    return JSON.parse(IIliii1l);
  } catch (i1iiliI1) {
    return console.log(i1iiliI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IiIiI1ii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IllI1iII = "";
    if ($.shopactivityId) IllI1iII = ",\"activityId\":" + $.shopactivityId;
    const lIl1III = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IllI1iII + ",\"channel\":406}",
      iiII11i1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lIl1III)
      };
    for (var iIli1111 = "", l1i1lili = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l1liiill = 0; l1liiill < 16; l1liiill++) {
      var iiI1ilIl = Math.round(Math.random() * (l1i1lili.length - 1));
      iIli1111 += l1i1lili.substring(iiI1ilIl, iiI1ilIl + 1);
    }
    uuid = Buffer.from(iIli1111, "utf8").toString("base64");
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
    const iII111i = await getH5st("8adfb", iiII11i1),
      Ili1iII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lIl1III + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iII111i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ili1iII, async (l1Iiill1, IIii11II, I11II1) => {
      try {
        if (l1Iiill1) IIii11II && typeof IIii11II.statusCode != "undefined" && IIii11II.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          I11II1 = I11II1 && I11II1.match(/jsonp_.*?\((.*?)\);/) && I11II1.match(/jsonp_.*?\((.*?)\);/)[1] || I11II1;
          let IliIl1l = $.toObj(I11II1, I11II1);
          if (IliIl1l && typeof IliIl1l == "object") {
            if (IliIl1l && IliIl1l.success === true) {
              console.log(" >> " + IliIl1l.message);
              $.errorJoinShop = IliIl1l.message;
              if (IliIl1l.result && IliIl1l.result.giftInfo) {
                for (let lIIl1111 of IliIl1l.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + lIIl1111.discountString + lIIl1111.prizeName + lIIl1111.secondLineDesc);
                }
              }
            } else IliIl1l && typeof IliIl1l == "object" && IliIl1l.message ? ($.errorJoinShop = IliIl1l.message, console.log("" + (IliIl1l.message || ""))) : console.log(I11II1);
          } else console.log(I11II1);
        }
      } catch (ll1iilII) {
        $.logErr(ll1iilII, IIii11II);
      } finally {
        IiIiI1ii();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async il11Il1 => {
    const II1Iiiii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      illilI1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(II1Iiiii)
      };
    await $.wait(1000);
    const II1111iI = await getH5st("8adfb", illilI1i),
      i1Il1IIi = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + II1Iiiii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(II1111iI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1Il1IIi, async (iIIil, i1I11l1, lI1l1llI) => {
      try {
        if (iIIil) {
          if (i1I11l1 && typeof i1I11l1.statusCode != "undefined") {
            if (i1I11l1.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          lI1l1llI = lI1l1llI && lI1l1llI.match(/jsonp_.*?\((.*?)\);/) && lI1l1llI.match(/jsonp_.*?\((.*?)\);/)[1] || lI1l1llI;
          let lli1i1li = $.toObj(lI1l1llI, lI1l1llI);
          if (lli1i1li && typeof lli1i1li == "object") {
            if (lli1i1li && lli1i1li.success == true) {
              console.log("去加入：" + (lli1i1li.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = lli1i1li.result.interestsRuleList && lli1i1li.result.interestsRuleList[0] && lli1i1li.result.interestsRuleList[0].interestsInfo && lli1i1li.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else console.log(lI1l1llI);
        }
      } catch (liIiI1lI) {
        $.logErr(liIiI1lI, i1I11l1);
      } finally {
        il11Il1();
      }
    });
  });
}
function getAuthorCodeList(iliI1l) {
  return new Promise(iiIl11i => {
    const lllIil1i = {
      "url": iliI1l + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lllIil1i, async (IIlliii1, Ii11llI1, lIIIIli) => {
      try {
        if (IIlliii1) $.getAuthorCodeListerr = false;else {
          if (lIIIIli) lIIIIli = JSON.parse(lIIIIli);
          $.getAuthorCodeListerr = true;
        }
      } catch (IiIIiI) {
        $.logErr(IiIIiI, Ii11llI1);
        lIIIIli = null;
      } finally {
        iiIl11i(lIIIIli);
      }
    });
  });
}
function random(liiiIIi, II1liI1I) {
  return Math.floor(Math.random() * (II1liI1I - liiiIIi)) + liiiIIi;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const ilill11I = Array.from(new Set($.blacklist.split("&")));
  console.log(ilill11I.join("&") + "\n");
  let III1iI1 = ilill11I,
    II1lli = [],
    III1lI1i = false;
  for (let Il1I1ll = 0; Il1I1ll < cookiesArr.length; Il1I1ll++) {
    let I1Ill1II = decodeURIComponent(cookiesArr[Il1I1ll].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[Il1I1ll].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!I1Ill1II) break;
    let lilIII = false;
    for (let l1iIil1 of III1iI1) {
      if (l1iIil1 && l1iIil1 == I1Ill1II) {
        lilIII = true;
        break;
      }
    }
    !lilIII && (III1lI1i = true, II1lli.splice(Il1I1ll, -1, cookiesArr[Il1I1ll]));
  }
  if (III1lI1i) cookiesArr = II1lli;
}
function toFirst(I11I1Iil, i11i1Iii) {
  if (i11i1Iii != 0) {
    I11I1Iil.unshift(I11I1Iil.splice(i11i1Iii, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const IIIlIIlI = Array.from(new Set($.whitelist.split("&")));
  console.log(IIIlIIlI.join("&") + "\n");
  let I1li1I11 = [],
    l1l1ii1I = IIIlIIlI;
  for (let Ili1Ill1 in cookiesArr) {
    let IiIIiiil = decodeURIComponent(cookiesArr[Ili1Ill1].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[Ili1Ill1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    l1l1ii1I.includes(IiIIiiil) && I1li1I11.push(cookiesArr[Ili1Ill1]);
  }
  helpCookiesArr = I1li1I11;
  if (l1l1ii1I.length > 1) {
    for (let iiililII in l1l1ii1I) {
      let ii11l11i = l1l1ii1I[l1l1ii1I.length - 1 - iiililII];
      if (!ii11l11i) continue;
      for (let iiiIIli1 in helpCookiesArr) {
        let IlIl1IIi = decodeURIComponent(helpCookiesArr[iiiIIli1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iiiIIli1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        ii11l11i == IlIl1IIi && toFirst(helpCookiesArr, iiiIIli1);
      }
    }
  }
}