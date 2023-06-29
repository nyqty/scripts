/*
6.21-7.20 天天签到领京豆兑换

————————————————
入口：[ 6.21-7.20 天天签到领京豆兑换 ]

每天晚上 9点 开始兑换 自行定时

请求太频繁会被黑ip
过10分钟再执行

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行

cron:1 9 * * *
============Quantumultx===============
[task_local]
#6.21-7.20 天天签到领京豆兑换
1 9 * * * jd_lzkj_ttljd_exchange, tag=6.21-7.20 天天签到领京豆兑换, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('6.21-7.20 天天签到领京豆兑换');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  getToken = require("./function/krgetToken");
let domains = "https://lzdz-isv.isvjcloud.com",
  lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(ill1iIll => {
    cookiesArr.push(jdCookieNode[ill1iIll]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(iIlii1li => iIlii1li.cookie)].filter(il1llll => !!il1llll);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let actorUuidArr = [],
  lz_jdpin_token_cookie = "",
  activityCookie = "",
  whitelist = "",
  blacklist = "";
$.whitelist = process.env.jd_opencard_whitelist || whitelist;
$.blacklist = process.env.jd_opencard_blacklist || blacklist;
getWhitelist();
getBlacklist();
$.errMsgPin = [];
let activityUrl = "https://lzdz-isv.isvjcloud.com/m/688693/dzbddbeb43bfff40179190eb6a8e9b";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "dzbddbeb43bfff40179190eb6a8e9b";
  $.shareUuid = "";
  console.log("入口:\nhttps://lzdz-isv.isvjcloud.com/m/688693/dzbddbeb43bfff40179190eb6a8e9b");
  console.log("\n每天晚上 21 点后，才能兑换....\n");
  for (let iiiI1ii = 0; iiiI1ii < cookiesArr.length; iiiI1ii++) {
    cookie = cookiesArr[iiiI1ii];
    $.ownCookie = cookiesArr[iiiI1ii];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iiiI1ii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(3000);
      if ($.outFlag || $.activityEnd || $.hasEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let iIIlil1l = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + iIIlil1l;
  }
  if ($.outFlag) {
    let I1i1iiIi = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + I1i1iiIi);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + I1i1iiIi);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(i1i11ili => $.logErr(i1i11ili)).finally(() => $.done());
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
    await takePostRequest("activityContent");
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.hotFlag) return;
    await takePostRequest("activityContent");
    console.log("\n总签到天数:" + $.allSign + " 连续签到天数：" + $.signCount);
    console.log("当前礼享金:" + $.allGift + " 累计活动京豆：" + $.beans);
    await takePostRequest("exchangePrizeList");
    for (let ii1lilIl = 0; ii1lilIl < $.exchangePriceList.length; ii1lilIl++) {
      console.log("\n奖品:" + $.exchangePriceList[ii1lilIl].prizeName + " --礼享金 " + $.exchangePriceList[ii1lilIl].prizeScore + "--库存 " + $.exchangePriceList[ii1lilIl].priceNum);
    }
    console.log("");
    if ($.allGift >= 150) {
      for (let lI1iIl1i = 0; lI1iIl1i < 35; lI1iIl1i++) {
        $.prizeId = 1;
        $.getPrize = false;
        $.exgStop = false;
        await takePostRequest("exchangePrize");
        if ($.getPrize || $.exgStop || $.activityEnd) break;
        await $.wait(1000);
      }
      for (let iiI11liI = 0; iiI11liI < 35; iiI11liI++) {
        $.prizeId = 2;
        $.getPrize = false;
        $.exgStop = false;
        await takePostRequest("exchangePrize");
        if ($.getPrize || $.exgStop || $.activityEnd) break;
        await $.wait(1000);
      }
    } else {
      if ($.allGift > 50 && $.allGift < 150) for (let iili1IIi = 0; iili1IIi < 35; iili1IIi++) {
        $.prizeId = 2;
        $.getPrize = false;
        $.exgStop = false;
        await takePostRequest("exchangePrize");
        if ($.getPrize || $.exgStop || $.activityEnd) break;
        await $.wait(1000);
      } else {
        if ($.allGift >= 50 && $.allGift < 100) for (let li1liil = 0; li1liil < 35; li1liil++) {
          $.prizeId = 1;
          $.getPrize = false;
          $.exgStop = false;
          await takePostRequest("exchangePrize");
          if ($.getPrize || $.exgStop || $.activityEnd) break;
          await $.wait(1000);
        } else console.log("你当前礼享金不够兑换。");
      }
    }
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (Iii1IIl1) {
    console.log(Iii1IIl1);
  }
}
async function takePostRequest(IIli11) {
  if ($.outFlag) return;
  let liiIiil1 = "https://lzdz-isv.isvjcloud.com",
    l1i1IIIi = "",
    lIllii11 = "POST";
  switch (IIli11) {
    case "getMyPing":
      url = liiIiil1 + "/customer/getMyCidPing";
      l1i1IIIi = "token=" + $.Token + "&fromType=APP&userId=688693&pin=";
      break;
    case "accessLogWithAD":
      url = liiIiil1 + "/common/accessLogWithAD";
      let lii1l1l1 = "https://lzdz-isv.isvjcloud.com/m/688693/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      l1i1IIIi = "venderId=688693&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lii1l1l1);
      break;
    case "activityContent":
      url = liiIiil1 + "/dingzhi/jdhomeapp/interaction/activityContent";
      l1i1IIIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "exchangePrizeList":
      url = liiIiil1 + "/dingzhi/jdhomeapp/interaction/exchangePrizeList";
      l1i1IIIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "exchangePrize":
      url = liiIiil1 + "/dingzhi/jdhomeapp/interaction/exchangePrize";
      l1i1IIIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&prizeId=" + $.prizeId;
      break;
    default:
      console.log("错误" + IIli11);
  }
  let il1IIi11 = getPostRequest(url, l1i1IIIi, lIllii11);
  return new Promise(async Iillliil => {
    $.post(il1IIi11, (iii1iII1, ilIil1ll, iliII1ll) => {
      try {
        setActivityCookie(ilIil1ll);
        iii1iII1 ? (ilIil1ll && typeof ilIil1ll.statusCode != "undefined" && ilIil1ll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(iii1iII1, iii1iII1)), console.log(IIli11 + " API请求失败，请检查网路重试")) : dealReturn(IIli11, iliII1ll);
      } catch (I1IiiIll) {
        console.log(I1IiiIll, ilIil1ll);
      } finally {
        Iillliil();
      }
    });
  });
}
async function dealReturn(iIIiiIIl, lI1i11ll) {
  let liI1111 = "";
  try {
    if (iIIiiIIl != "accessLogWithAD" || iIIiiIIl != "drawContent") {
      if (lI1i11ll) {
        liI1111 = JSON.parse(lI1i11ll);
      }
    }
  } catch (I1iIilll) {
    console.log(iIIiiIIl + " 执行任务异常");
    console.log(lI1i11ll);
    $.runFalag = false;
  }
  try {
    switch (iIIiiIIl) {
      case "getMyPing":
        if (typeof liI1111 == "object") {
          if (liI1111.result && liI1111.result === true) {
            if (liI1111.data && typeof liI1111.data.secretPin != "undefined") $.Pin = liI1111.data.secretPin;
            if (liI1111.data && typeof liI1111.data.nickname != "undefined") $.nickname = liI1111.data.nickname;
          } else liI1111.errorMessage ? (console.log(iIIiiIIl + " " + (liI1111.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log(iIIiiIIl + " " + lI1i11ll);
        } else console.log(iIIiiIIl + " " + lI1i11ll);
        break;
      case "exchangePrizeList":
        if (typeof liI1111 == "object") {
          if (liI1111.result && liI1111.result === true) $.exchangePriceList = liI1111.data.exchangePriceList || [];else liI1111.errorMessage ? console.log("" + (liI1111.errorMessage || "")) : console.log("空气");
        } else console.log("" + lI1i11ll);
        break;
      case "exchangePrize":
        if (typeof liI1111 == "object") {
          if (liI1111.result && liI1111.result === true) {
            console.log("兑换：" + liI1111.data.prizeName + " 成功");
            $.getPrize = true;
          } else {
            if (liI1111.errorMessage) {
              console.log("" + (liI1111.errorMessage || ""));
              let Il1IIiil = liI1111.errorMessage || "";
              for (let lilI1iIi of ["已兑换", "已经兑换", "重复兑换", "已兑光"]) {
                if (Il1IIiil.includes(lilI1iIi)) {
                  $.exgStop = true;
                  break;
                }
              }
            } else console.log("空气");
          }
        } else {
          console.log("" + lI1i11ll);
        }
        break;
      case "activityContent":
        if (typeof liI1111 == "object") {
          if (liI1111.result && liI1111.result === true) {
            $.actorUuid = liI1111.data.uuid || "";
            $.zhiBoStatus = liI1111.data.zhiBoStatus || false;
            $.signStatus = liI1111.data.signStatus || false;
            $.followPeonyStatus = liI1111.data.followPeonyStatus || false;
            $.iconGoStatus = liI1111.data.iconGoStatus || false;
            $.getIconStatus = liI1111.data.getIconStatus || false;
            $.allSkuAddStatus = liI1111.data.allSkuAddStatus || false;
            $.allSkuVisitStatus = liI1111.data.allSkuVisitStatus || false;
            $.remindDayStatus = liI1111.data.remindDayStatus || false;
            $.remindDrawDayStatus = liI1111.data.remindDrawDayStatus || false;
            $.skuPresellStatus = liI1111.data.skuPresellStatus || false;
            $.toMainList = liI1111.data.toMainList || [];
            $.assistCount = liI1111.data.assistCount || 0;
            $.shareCount = liI1111.data.shareCount || 0;
            $.allGift = liI1111.data.allGift || 0;
            $.beans = liI1111.data.beans || 0;
            $.allSign = liI1111.data.allSign || 0;
            $.signCount = liI1111.data.signCount || 0;
            $.assistStatus = liI1111.data.assistStatus || 0;
            $.shareCount < 5 ? actorUuidArr.push($.actorUuid) : $.shareTimes = 5;
          } else {
            if (liI1111.errorMessage) {
              if (liI1111.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(iIIiiIIl + " " + (liI1111.errorMessage || ""));
            } else console.log(iIIiiIIl + " " + lI1i11ll);
          }
        } else console.log(iIIiiIIl + " " + lI1i11ll);
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getQuestion":
        break;
      default:
        console.log(iIIiiIIl + "-> " + lI1i11ll);
    }
    typeof liI1111 == "object" && liI1111.errorMessage && liI1111.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (ili11Ii) {
    console.log(ili11Ii);
  }
}
function getPostRequest(i1Ili1l, I1IiIIiI, II1lil1l = "POST") {
  let I1IIl1Ii = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i1Ili1l.indexOf("https://lzdz-isv.isvjcloud.com") > -1 && (I1IIl1Ii.Referer = activityUrl, I1IIl1Ii.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": i1Ili1l,
    "method": II1lil1l,
    "headers": I1IIl1Ii,
    "body": I1IiIIiI,
    "timeout": 30000
  };
}
function getSimpleActInfoVo() {
  return new Promise(iI1I1iIi => {
    let l1l1iIi = {
      "url": "https://lzdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=dzaa2168527a9d4841a94d6088bfa5",
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
    $.get(l1l1iIi, async (liiIIl11, II111III, i11lIliI) => {
      try {
        if (liiIIl11) {
          II111III && typeof II111III.statusCode != "undefined" && II111III.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(liiIIl11));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let i1iIl1I1 = $.toObj(i11lIliI, i11lIliI);
          if (typeof i1iIl1I1 == "object") {
            if (i1iIl1I1.result && i1iIl1I1.result === true) {
              $.endTime = i1iIl1I1.data.endTime || 0;
              $.startTimes = i1iIl1I1.data.startTime || Date.now();
            } else i1iIl1I1.errorMessage ? console.log("" + (i1iIl1I1.errorMessage || "")) : console.log("" + i11lIliI);
          } else console.log("" + i11lIliI);
        }
      } catch (iiI11iI) {
        $.logErr(iiI11iI, II111III);
      } finally {
        iI1I1iIi();
      }
    });
  });
}
function getCk() {
  return new Promise(I1i1iiI1 => {
    let I11Iil1 = {
      "url": "https://lzdz-isv.isvjcloud.com/wxCommonInfo/token",
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
    $.get(I11Iil1, async (Ill1iiil, l11l1Ill, Ill111l1) => {
      try {
        if (Ill1iiil) {
          if (l11l1Ill && typeof l11l1Ill.statusCode != "undefined") {
            l11l1Ill.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(Ill1iiil));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Iillllil = Ill111l1.match(/(活动已经结束)/) && Ill111l1.match(/(活动已经结束)/)[1] || "";
          Iillllil && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(l11l1Ill);
        }
      } catch (il11I1l) {
        $.logErr(il11I1l, l11l1Ill);
      } finally {
        I1i1iiI1();
      }
    });
  });
}
function setActivityCookie(i1ill1) {
  if (i1ill1) {
    if (i1ill1.headers["set-cookie"]) {
      cookie = $.ownCookie + ";";
      for (let i1il1l1I of i1ill1.headers["set-cookie"]) {
        lz_cookie[i1il1l1I.split(";")[0].substr(0, i1il1l1I.split(";")[0].indexOf("="))] = i1il1l1I.split(";")[0].substr(i1il1l1I.split(";")[0].indexOf("=") + 1);
      }
      for (const Iiii1 of Object.keys(lz_cookie)) {
        cookie += Iiii1 + "=" + lz_cookie[Iiii1] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(iiillil1) {
  iiillil1 = iiillil1 || 32;
  let IiIlIlII = "abcdef0123456789",
    lIliliI1 = IiIlIlII.length,
    iIi111l = "";
  for (i = 0; i < iiillil1; i++) iIi111l += IiIlIlII.charAt(Math.floor(Math.random() * lIliliI1));
  return iIi111l;
}
function getAuthorCodeList(iil1lil) {
  return new Promise(III1Ilil => {
    const i1l1IIi1 = {
      "url": iil1lil + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i1l1IIi1, async (Ii1IIiII, i1ll1iIi, Ii11lili) => {
      try {
        if (Ii1IIiII) $.getAuthorCodeListerr = false;else {
          if (Ii11lili) Ii11lili = JSON.parse(Ii11lili);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1llIi1I) {
        $.logErr(l1llIi1I, i1ll1iIi);
        Ii11lili = null;
      } finally {
        III1Ilil(Ii11lili);
      }
    });
  });
}
function random(i11li1l1, l1ilIlii) {
  return Math.floor(Math.random() * (l1ilIlii - i11li1l1)) + i11li1l1;
}
function jsonParse(I1IIIi) {
  if (typeof I1IIIi == "string") {
    try {
      return JSON.parse(I1IIIi);
    } catch (i1Ii1I1l) {
      return console.log(i1Ii1I1l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lliiiiii = Array.from(new Set($.blacklist.split("&")));
  console.log(lliiiiii.join("&") + "\n");
  let lI1II1i = lliiiiii,
    l1liIi1I = [],
    iI1IlIli = false;
  for (let i111lil = 0; i111lil < cookiesArr.length; i111lil++) {
    let II1I11ii = decodeURIComponent(cookiesArr[i111lil].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[i111lil].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!II1I11ii) break;
    let i1iiIiil = false;
    for (let II1lIlil of lI1II1i) {
      if (II1lIlil && II1lIlil == II1I11ii) {
        i1iiIiil = true;
        break;
      }
    }
    !i1iiIiil && (iI1IlIli = true, l1liIi1I.splice(i111lil, -1, cookiesArr[i111lil]));
  }
  if (iI1IlIli) cookiesArr = l1liIi1I;
}
function toFirst(l1iI1I11, liilllI) {
  liilllI != 0 && l1iI1I11.unshift(l1iI1I11.splice(liilllI, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const lillIi1i = Array.from(new Set($.whitelist.split("&")));
  console.log(lillIi1i.join("&") + "\n");
  let llil11il = [],
    ilIl1ii = lillIi1i;
  for (let IiIil1Il in cookiesArr) {
    let I111l = decodeURIComponent(cookiesArr[IiIil1Il].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[IiIil1Il].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    ilIl1ii.includes(I111l) && llil11il.push(cookiesArr[IiIil1Il]);
  }
  helpCookiesArr = llil11il;
  if (ilIl1ii.length > 1) for (let lliI1lIi in ilIl1ii) {
    let ii1llll1 = ilIl1ii[ilIl1ii.length - 1 - lliI1lIi];
    if (!ii1llll1) continue;
    for (let lIli1Ii1 in helpCookiesArr) {
      let il1ii1li = decodeURIComponent(helpCookiesArr[lIli1Ii1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lIli1Ii1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      ii1llll1 == il1ii1li && toFirst(helpCookiesArr, lIli1Ii1);
    }
  }
}