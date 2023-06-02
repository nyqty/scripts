/*
6.1-6.30 SK2互动抽奖，至高赢经典神仙水

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 6.1-6.30 SK2互动抽奖，至高赢经典神仙水 ]

请求太频繁会被黑ip
过10分钟再执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#6.1-6.30 SK2互动抽奖，至高赢经典神仙水
1 1 1 1 * jd_sk2.js, tag=6.1-6.30 SK2互动抽奖，至高赢经典神仙水, enabled=true

*/

const $ = new Env('6.1-6.30 SK2互动抽奖，至高赢经典神仙水');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let domains = "https://lzkjdz-isv.isvjcloud.com",
  opencard_draw = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "10" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "10",
  lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(iIIl1il => {
    cookiesArr.push(jdCookieNode[iIIl1il]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(l1lIIlli => l1lIIlli.cookie)].filter(lI11Ill => !!lI11Ill);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  activityUrl = "https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/2306100000982127/";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "2306100000982127";
  authorCodeList = [];
  authorCodeList === "404: Not Found" && (authorCodeList = [""]);
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000009821/TaskDraw/?activityId=2306100000982127");
  for (let ii11iIIi = 0; ii11iIIi < cookiesArr.length; ii11iIIi++) {
    cookie = cookiesArr[ii11iIIi];
    originCookie = cookiesArr[ii11iIIi];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ii11iIIi + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(3000);
      if (ii11iIIi == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let IlIlli = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + IlIlli);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + IlIlli);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(I11lIll => $.logErr(I11lIll)).finally(() => $.done());
async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await takePostRequest("getOpenCardStatusWithOutSelf");
    await takePostRequest("activityContent");
    if ($.openStatus == false) {
      console.log("去开通店铺会员");
      $.joinVenderId = 1000009821;
      await joinShop();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await joinShop());
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 无法开卡,跳过运行");
        return;
      }
      await takePostRequest("getOpenCardStatusWithOutSelf");
      await takePostRequest("activityContent");
    }
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    console.log($.actorUuid);
    for (let i1I1ili = 0; i1I1ili < $.taskslist.length; i1I1ili++) {
      $.taskId = $.taskslist[i1I1ili].taskId;
      $.taskType = $.taskslist[i1I1ili].taskType;
      if ($.taskslist[i1I1ili].btnState != 1) switch ($.taskType) {
        case "0":
          console.log("去完成" + $.taskslist[i1I1ili].taskName);
          await takePostRequest("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "1":
          console.log("去完成" + $.taskslist[i1I1ili].taskName);
          await takePostRequest("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "6":
          console.log("去完成" + $.taskslist[i1I1ili].taskName);
          await takePostRequest("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "7":
          console.log("去完成" + $.taskslist[i1I1ili].taskName);
          await takePostRequest("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "8":
          console.log("去完成" + $.taskslist[i1I1ili].taskName);
          await takePostRequest("browse");
          for (let I1llIl1I = 0; I1llIl1I < $.browselist.length; I1llIl1I++) {
            $.skuId = $.browselist[I1llIl1I].skuId;
            $.browselist[I1llIl1I].state != 1 && (console.log("去浏览" + $.browselist[I1llIl1I].skuId), await takePostRequest("browse1"), await $.wait(parseInt(Math.random() * 1000 + 2000, 10)));
          }
          break;
        case "2":
          console.log("去完成" + $.taskslist[i1I1ili].taskName);
          await takePostRequest("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "4":
          console.log("去完成" + $.taskslist[i1I1ili].taskName);
          await takePostRequest("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "2":
        case "5":
          break;
        default:
          console.log("错误" + $.taskType);
      }
    }
    await takePostRequest("activityContent");
    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let IiIiiiiI = parseInt($.leftTimes / 1);
      opencard_draw = parseInt(opencard_draw, 10);
      if (IiIiiiiI > opencard_draw) IiIiiiiI = opencard_draw;
      console.log("已设置抽奖次数为" + opencard_draw + "次，当前有" + $.leftTimes + "次抽奖机会");
      for (m = 1; IiIiiiiI--; m++) {
        console.log("进行第" + m + "次抽奖");
        await takePostRequest("draw");
        if ($.runFalag == false) break;
        if (Number(IiIiiiiI) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    $.index == 1 && ($.shareUuid = $.actorUuid);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (l1IiiilI) {
    console.log(l1IiiilI);
  }
}
async function takePostRequest(I11iilll) {
  if ($.outFlag) return;
  let lI1iiIll = "https://lzkjdz-isv.isvjcloud.com",
    Illii1i = "",
    l1il1iIl = "POST";
  switch (I11iilll) {
    case "getMyPing":
      url = lI1iiIll + "/customer/getMyPing";
      Illii1i = "token=" + $.Token + "&fromType=APP&userId=1000009821&pin=";
      break;
    case "getSimpleActInfoVo":
      url = lI1iiIll + "/common/brand/getSimpleActInfoVo";
      Illii1i = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = lI1iiIll + "/common/accessLogWithAD";
      let iliIIl = "https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      Illii1i = "venderId=1000009821&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iliIIl);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = lI1iiIll + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      Illii1i = "venderId=1000009821&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = lI1iiIll + "/wx/skii/lottery/draw/main";
      Illii1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&teamId=" + $.shareUuid;
      break;
    case "task":
      url = lI1iiIll + "/wx/skii/lottery/draw/task";
      Illii1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId + "&mark=2";
      break;
    case "browse":
      url = lI1iiIll + "/wx/skii/lottery/draw/browse";
      Illii1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId + "&mark=1";
      break;
    case "browse1":
      url = lI1iiIll + "/wx/skii/lottery/draw/browse";
      Illii1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&skuId=" + $.skuId;
      break;
    case "followShop":
      url = lI1iiIll + "/wxActionCommon/followShop";
      Illii1i = "activityId=" + $.activityId + "userId=1000009821&activityType=99&buyerNick=" + encodeURIComponent($.Pin) + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = lI1iiIll + "/wx/skii/lottery/draw/draw";
      Illii1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + I11iilll);
  }
  let lIilIl1 = getPostRequest(url, Illii1i, l1il1iIl);
  return new Promise(async Ii1iillI => {
    $.post(lIilIl1, (lIlI1II, I1lIIIIl, lIl1IIil) => {
      try {
        setActivityCookie(I1lIIIIl);
        if (lIlI1II) {
          I1lIIIIl && typeof I1lIIIIl.statusCode != "undefined" && I1lIIIIl.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(lIlI1II, lIlI1II));
          console.log(I11iilll + " API请求失败，请检查网路重试");
        } else dealReturn(I11iilll, lIl1IIil);
      } catch (ililiIl) {
        console.log(ililiIl, I1lIIIIl);
      } finally {
        Ii1iillI();
      }
    });
  });
}
async function dealReturn(i1liiiI, lill11i1) {
  let IIi1Ilil = "";
  try {
    if (i1liiiI != "accessLogWithAD" || i1liiiI != "drawContent") {
      if (lill11i1) {
        IIi1Ilil = JSON.parse(lill11i1);
      }
    }
  } catch (IiiiIIil) {
    console.log(i1liiiI + " 执行任务异常");
    console.log(lill11i1);
    $.runFalag = false;
  }
  try {
    switch (i1liiiI) {
      case "getMyPing":
        if (typeof IIi1Ilil == "object") {
          if (IIi1Ilil.result && IIi1Ilil.result === true) {
            if (IIi1Ilil.data && typeof IIi1Ilil.data.secretPin != "undefined") $.Pin = IIi1Ilil.data.secretPin;
            if (IIi1Ilil.data && typeof IIi1Ilil.data.nickname != "undefined") $.nickname = IIi1Ilil.data.nickname;
          } else IIi1Ilil.errorMessage ? console.log(i1liiiI + " " + (IIi1Ilil.errorMessage || "")) : console.log(i1liiiI + " " + lill11i1);
        } else console.log(i1liiiI + " " + lill11i1);
        break;
      case "task":
        if (typeof IIi1Ilil == "object") {
          if (IIi1Ilil.success && IIi1Ilil.success === true) console.log("" + (IIi1Ilil.success || ""));else IIi1Ilil.errorMessage ? console.log("" + (IIi1Ilil.errorMessage || "")) : console.log("" + lill11i1);
        } else console.log("" + lill11i1);
        break;
      case "browse":
        if (typeof IIi1Ilil == "object") {
          if (IIi1Ilil.success && IIi1Ilil.success === true) $.browselist = IIi1Ilil.data || [];else IIi1Ilil.errorMessage ? console.log("" + (IIi1Ilil.errorMessage || "")) : console.log("" + lill11i1);
        } else console.log("" + lill11i1);
        break;
      case "browse1":
        if (typeof IIi1Ilil == "object") {
          if (IIi1Ilil.success && IIi1Ilil.success === true) console.log("" + (IIi1Ilil.success || ""));else IIi1Ilil.errorMessage ? console.log("" + (IIi1Ilil.errorMessage || "")) : console.log("" + lill11i1);
        } else console.log("" + lill11i1);
        break;
      case "draw":
        if (typeof IIi1Ilil == "object") {
          if (IIi1Ilil.success && IIi1Ilil.success === true && IIi1Ilil.data.drawOk) console.log("抽中：" + IIi1Ilil.data.name);else IIi1Ilil.errorMessage ? console.log("" + (IIi1Ilil.errorMessage || "")) : console.log("💨  空气");
        } else console.log("" + lill11i1);
        break;
      case "followShop":
        if (typeof IIi1Ilil == "object") {
          if (IIi1Ilil.result && IIi1Ilil.result === true) console.log("" + IIi1Ilil.data);else IIi1Ilil.errorMessage ? console.log("" + (IIi1Ilil.errorMessage || "")) : console.log(" " + lill11i1);
        } else console.log("" + lill11i1);
        break;
      case "activityContent":
        if (typeof IIi1Ilil == "object") {
          if (IIi1Ilil.success && IIi1Ilil.success === true) {
            $.actorUuid = IIi1Ilil.data.uuid || "";
            $.turntableId = IIi1Ilil.data.turntableId || "";
            $.leftTimes = IIi1Ilil.data.leftTimes || 0;
            $.state = IIi1Ilil.data.state || "";
            $.taskslist = IIi1Ilil.data.tasks || [];
          } else {
            if (IIi1Ilil.errorMessage) {
              if (IIi1Ilil.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(i1liiiI + " " + (IIi1Ilil.errorMessage || ""));
            } else console.log(i1liiiI + " " + lill11i1);
          }
        } else console.log(i1liiiI + " " + lill11i1);
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof IIi1Ilil == "object") {
          if (IIi1Ilil.isOk) {
            $.openStatus = IIi1Ilil.openCard || false;
          } else IIi1Ilil.errorMessage || IIi1Ilil.msg ? console.log(i1liiiI + " " + (IIi1Ilil.errorMessage || IIi1Ilil.msg || "")) : console.log(i1liiiI + " " + lill11i1);
        } else console.log(i1liiiI + " " + lill11i1);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(i1liiiI + "-> " + lill11i1);
    }
    typeof IIi1Ilil == "object" && IIi1Ilil.errorMessage && IIi1Ilil.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (IIIllI1l) {
    console.log(IIIllI1l);
  }
}
function getPostRequest(iIiIIIll, iIIili1I, II11li1 = "POST") {
  let IIil1l11 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iIiIIIll.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1 && (IIil1l11.Referer = activityUrl, IIil1l11.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": iIiIIIll,
    "method": II11li1,
    "headers": IIil1l11,
    "body": iIIili1I,
    "timeout": 30000
  };
}
function getSimpleActInfoVo() {
  return new Promise(I111IiI => {
    let i1IIilI1 = {
      "url": "https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2306100000982127",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(i1IIilI1, async (l1il1ili, ii1iI1, II11I111) => {
      try {
        if (l1il1ili) {
          ii1iI1 && typeof ii1iI1.statusCode != "undefined" && ii1iI1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(l1il1ili));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let ili11l1 = $.toObj(II11I111, II11I111);
          if (typeof ili11l1 == "object") {
            if (ili11l1.result && ili11l1.result === true) {
              $.endTime = ili11l1.data.endTime || 0;
              $.startTimes = ili11l1.data.startTime || Date.now();
            } else ili11l1.errorMessage ? console.log("" + (ili11l1.errorMessage || "")) : console.log("" + II11I111);
          } else console.log("" + II11I111);
        }
      } catch (iIiilIII) {
        $.logErr(iIiilIII, ii1iI1);
      } finally {
        I111IiI();
      }
    });
  });
}
function getCk() {
  return new Promise(lIiIi11i => {
    let l1iIllII = {
      "url": "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1iIllII, async (i11illIi, I1Iil1ii, I1Iiilll) => {
      try {
        if (i11illIi) {
          if (I1Iil1ii && typeof I1Iil1ii.statusCode != "undefined") {
            if (I1Iil1ii.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(i11illIi));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IIilIl1 = I1Iiilll.match(/(活动已经结束)/) && I1Iiilll.match(/(活动已经结束)/)[1] || "";
          IIilIl1 && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(I1Iil1ii);
        }
      } catch (i1illII1) {
        $.logErr(i1illII1, I1Iil1ii);
      } finally {
        lIiIi11i();
      }
    });
  });
}
function setActivityCookie(lii1iiil) {
  if (lii1iiil) {
    if (lii1iiil.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let Ili11i of lii1iiil.headers["set-cookie"]) {
        lz_cookie[Ili11i.split(";")[0].substr(0, Ili11i.split(";")[0].indexOf("="))] = Ili11i.split(";")[0].substr(Ili11i.split(";")[0].indexOf("=") + 1);
      }
      for (const I11l1Ill of Object.keys(lz_cookie)) {
        cookie += I11l1Ill + "=" + lz_cookie[I11l1Ill] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(lIIIIliI) {
  lIIIIliI = lIIIIliI || 32;
  let I11i1I1I = "abcdef0123456789",
    IIIllIi1 = I11i1I1I.length,
    l1iIi1I = "";
  for (i = 0; i < lIIIIliI; i++) l1iIi1I += I11i1I1I.charAt(Math.floor(Math.random() * IIIllIi1));
  return l1iIi1I;
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async l1IiiIlI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let ilIii1iI = "";
    if ($.shopactivityId) ilIii1iI = ",\"activityId\":" + $.shopactivityId;
    const liIliIl1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + ilIii1iI + ",\"channel\":406}",
      I1llllIl = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liIliIl1)
      };
    for (var IlIIIIll = "", I1li1Ii1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iI111iIi = 0; iI111iIi < 16; iI111iIi++) {
      var iIII1i1i = Math.round(Math.random() * (I1li1Ii1.length - 1));
      IlIIIIll += I1li1Ii1.substring(iIII1i1i, iIII1i1i + 1);
    }
    uuid = Buffer.from(IlIIIIll, "utf8").toString("base64");
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
    const Ili1Iill = await getH5st("8adfb", I1llllIl),
      i11ll1Il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + liIliIl1 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Ili1Iill),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i11ll1Il, async (i1ii1iI1, Ii1i1IIi, IIlIli) => {
      try {
        if (i1ii1iI1) Ii1i1IIi && typeof Ii1i1IIi.statusCode != "undefined" && Ii1i1IIi.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IIlIli = IIlIli && IIlIli.match(/jsonp_.*?\((.*?)\);/) && IIlIli.match(/jsonp_.*?\((.*?)\);/)[1] || IIlIli;
          let IIiIIIll = $.toObj(IIlIli, IIlIli);
          if (IIiIIIll && typeof IIiIIIll == "object") {
            if (IIiIIIll && IIiIIIll.success === true) {
              console.log(" >> " + IIiIIIll.message);
              $.errorJoinShop = IIiIIIll.message;
              if (IIiIIIll.result && IIiIIIll.result.giftInfo) for (let IliII1l1 of IIiIIIll.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + IliII1l1.discountString + IliII1l1.prizeName + IliII1l1.secondLineDesc);
              }
            } else IIiIIIll && typeof IIiIIIll == "object" && IIiIIIll.message ? ($.errorJoinShop = IIiIIIll.message, console.log("" + (IIiIIIll.message || ""))) : console.log(IIlIli);
          } else console.log(IIlIli);
        }
      } catch (illill1i) {
        $.logErr(illill1i, Ii1i1IIi);
      } finally {
        l1IiiIlI();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async Ili1llii => {
    const iIIiI1II = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      l1Iliil1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIIiI1II)
      };
    await $.wait(1000);
    const iiIilI = await getH5st("8adfb", l1Iliil1),
      IiIIlilI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIIiI1II + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiIilI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IiIIlilI, async (lIil1Il1, I1iIIiI, lIiiIIli) => {
      try {
        if (lIil1Il1) I1iIIiI && typeof I1iIIiI.statusCode != "undefined" && I1iIIiI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lIiiIIli = lIiiIIli && lIiiIIli.match(/jsonp_.*?\((.*?)\);/) && lIiiIIli.match(/jsonp_.*?\((.*?)\);/)[1] || lIiiIIli;
          let i111lIl1 = $.toObj(lIiiIIli, lIiiIIli);
          i111lIl1 && typeof i111lIl1 == "object" ? i111lIl1 && i111lIl1.success == true && (console.log("去加入：" + (i111lIl1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i111lIl1.result.interestsRuleList && i111lIl1.result.interestsRuleList[0] && i111lIl1.result.interestsRuleList[0].interestsInfo && i111lIl1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(lIiiIIli);
        }
      } catch (iIlIiIlI) {
        $.logErr(iIlIiIlI, I1iIIiI);
      } finally {
        Ili1llii();
      }
    });
  });
}
function getAuthorCodeList(l1iIili1) {
  return new Promise(lI1il1iI => {
    const iIli1I11 = {
      "url": l1iIili1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iIli1I11, async (lli1IIil, l11iiIII, I11liII1) => {
      try {
        if (lli1IIil) {
          $.log(lli1IIil);
        } else {
          if (I11liII1) I11liII1 = JSON.parse(I11liII1);
        }
      } catch (iI1IiIi1) {
        $.logErr(iI1IiIi1, l11iiIII);
        I11liII1 = null;
      } finally {
        lI1il1iI(I11liII1);
      }
    });
  });
}
function jsonParse(I111Iili) {
  if (typeof I111Iili == "string") try {
    return JSON.parse(I111Iili);
  } catch (IlI1ll1l) {
    return console.log(IlI1ll1l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
