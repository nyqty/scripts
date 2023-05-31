/*
618red
加密
脚本锁佣建议用新的京粉号
https://u.jd.com/xxxxxxx

返利变量：JD_230618_RedRebateCode，若需要返利给自己，请自己修改环境变量[JD_230618_RedRebateCode]
xxxxxxx换成自己的返利 就是链接后面那7位字母
export JD_230618_RedRebateCode="xxxxxxx"

每次脚本领取红包次数
export JD_230618_RedCount="0"
0=不限制 1=领取1次
每个账号之间等待时间单位毫秒 默认15秒
1000=1秒
export JD_230618_RedTimes="15000"

0 0,10,20 * * * https://raw.githubusercontent.com/smiek2121/scripts/master/gua_230618_Red.js 618red

*/

let rebateCodes = ''; // 返利变量
let redTimes = 15000 // 等待时间单位毫秒
let redCount = 0 // 领取次数
let shareHelpCount = 0 // 助力次数 0=默认 1=1次满 2=2次满


const $ = new Env('618red');

const i1lIlIiI = $.isNode() ? require("./jdCookie.js") : "",
  IIiiII = require("axios");
$.CryptoJS = require("crypto-js");
let lliIil11 = [],
  lI1IIII = "";
if ($.isNode()) {
  Object.keys(i1lIlIiI).forEach(ll1IIIII => {
    lliIil11.push(i1lIlIiI[ll1IIIII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lliIil11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...li1iilil($.getdata("CookiesJD") || "[]").map(iIlliil => iIlliil.cookie)].filter(i1l1iIIl => !!i1l1iIIl);
let llil1lli = "";
if (!rebateCodes) rebateCodes = "https://u.jd.com/Oqk1iQg";
if (!llil1lli) llil1lli = "";
rebateCodes = $.isNode() ? process.env.JD_230618_RedRebateCode ? process.env.JD_230618_RedRebateCode : "" + rebateCodes : $.getdata("JD_230618_RedRebateCode") ? $.getdata("JD_230618_RedRebateCode") : "" + rebateCodes;
llil1lli = $.isNode() ? process.env.JD_230618_rebatePin ? process.env.JD_230618_rebatePin : "" + llil1lli : $.getdata("JD_230618_rebatePin") ? $.getdata("JD_230618_rebatePin") : "" + llil1lli;
redTimes = $.isNode() ? process.env.JD_230618_RedCount ? process.env.JD_230618_RedCount : "" + redTimes : $.getdata("JD_230618_RedCount") ? $.getdata("JD_230618_RedCount") : "" + redTimes;
redCount = $.isNode() ? process.env.JD_230618_RedTimes ? process.env.JD_230618_RedTimes : "" + redCount : $.getdata("JD_230618_RedTimes") ? $.getdata("JD_230618_RedTimes") : "" + redCount;
$.shareCount = $.isNode() ? process.env.JD_230618_shareHelpCount ? process.env.JD_230618_shareHelpCount : "" + shareHelpCount : $.getdata("JD_230618_shareHelpCount") ? $.getdata("JD_230618_shareHelpCount") : "" + shareHelpCount;
$.shareCount = parseInt($.shareCount, 10) || 0;
let l1i1i1lI = llil1lli && llil1lli.split(",") || [],
  i1IilliI = rebateCodes + "";
$.time("yyyy-MM-dd HH:mm:ss");
message = "";
let illiIlII = "";
resMsg = "";
$.uiUpdateTime = "";
$.endFlag = false;
$.runEnd = false;
let ii111lil = {};
$.getH5st_WQ_Arr = {};
$.runArr = {};
let li111lIi = "";
const iIII11II = "2023/06/19 00:00:00+08:00";
let Ili11IlI = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
$.UVCookieArr = {};
lr = {};
$.UVCookie = "";
let lIlIl1l = "",
  I1llilI1 = 2;
redTimes = Number(redTimes);
$.time("yyyy-MM-dd");
l11lili1();
!(async () => {
  if (/https:\/\/u\.jd\.com\/.+/.test(i1IilliI)) {
    if (i1IilliI.split("/").pop()) i1IilliI = i1IilliI.split("/").pop().split("?").shift();else {
      console.log("请填写正确的rebateCode");
      return;
    }
  }
  if (!lliIil11[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (Ili11IlI > new Date(iIII11II).getTime()) {
    $.msg($.name, "活动已结束", "请删除此脚本");
    $.setdata("", "JD_230618_Red");
    $.setdata("", "JD_230618_Red_pin");
    return;
  }
  console.log("当前版本：2023年05月31日");
  console.log("返利码：" + i1IilliI.replace(/.+(.{3})/, "***$1") + "\n");
  $.shareCodeArr = {};
  $.shareCodePinArr = $.getdata("JD_230618_Red_pin") || {};
  $.shareCode = "";
  $.again = false;
  if ($.end) return;
  for (let I1iIillI = 0; I1iIillI < lliIil11.length && !$.runEnd; I1iIillI++) {
    if ($.endFlag) break;
    lI1IIII = lliIil11[I1iIillI];
    if (lI1IIII) {
      $.UserName = decodeURIComponent(lI1IIII.match(/pt_pin=([^; ]+)(?=;?)/) && lI1IIII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I1iIillI + 1;
      if ($.runArr[$.UserName]) continue;
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let ii1iiI1 = 1;
      I1llilI1 = 4;
      !lI1IIII.includes("app_open") && (ii1iiI1 = 2, I1llilI1 = 2);
      $.eid_token = "";
      await Il1lIi1l(ii1iiI1);
      await IIII1i11();
      await lllliIIl();
      if ($.endFlag) break;
    }
    $.setdata($.shareCodePinArr, "JD_230618_Red_pin");
  }
  $.setdata($.shareCodePinArr, "JD_230618_Red_pin");
  if (message) {
    $.msg($.name, "", message + "\nhttps://u.jd.com/" + i1IilliI + "\n\n跳转到app 可查看助力情况");
    if ($.isNode()) {}
  }
})().catch(iilllIlI => $.logErr(iilllIlI)).finally(() => {
  $.done();
});
async function lllliIIl(I11IiilI = 0) {
  try {
    I11IiilI == 0 && (IilIIli("6a98d", $.UA), await li111lIi.__genAlgo());
    $.UVCookie = $.UVCookieArr[$.UserName] || "";
    !$.UVCookie && l11lili1();
    resMsg = "";
    let iIiIi = false,
      IIl1lI11 = 0,
      lliii11 = 0,
      I11lIii = 0;
    $.shareFlag = true;
    do {
      if (lliii11 > 2) IIl1lI11 = 0;
      $.flag = 0;
      illiIlII = "";
      $.url1 = "";
      await I111IIiI();
      if (!$.url1) {
        console.log("获取url1失败");
        $.end = true;
        break;
      }
      $.url2 = "";
      $.UVCookie = lIlIl1l.getUVCookie("", "", $.url1, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      await ilI1llIi();
      if (!$.url2) {
        console.log("获取不到红包页面");
        break;
      }
      if (!/unionActId=\d+/.test($.url2) && !new RegExp("&d=" + i1IilliI).test($.url2)) {
        console.log("改返利url：https://u.jd.com/" + i1IilliI + " 可能不是红包页面");
        $.runEnd = true;
        return;
      }
      if (!$.url2) $.url2 = "https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html?unionActId=31162&d=" + i1IilliI + "&cu=true&utm_source=kong&utm_medium=jingfen";
      $.actId = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/mall\/active\/([^/]+)\/index\.html/)[1] || "2KxaKmeh5hQkkGY6PGF6etgSFUp4";
      $.UVCookie = lIlIl1l.getUVCookie("", "", $.url2, $.UVCookie);
      $.origin = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/)[1] || "https://pro.m.jd.com";
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      $.eid = "";
      !$.eid && ($.eid = -1);
      if (I11IiilI == 0) {
        let il1iIi1I = 0,
          liil11lI = true,
          iiI1llii = 0;
        if (Object.getOwnPropertyNames(ii111lil).length > IIl1lI11 && $.shareFlag) for (let ilillIll in ii111lil || {}) {
          if (ilillIll == $.UserName) {
            $.flag = 1;
            continue;
          }
          if (il1iIi1I == IIl1lI11) {
            $.flag = 0;
            $.shareCode = ii111lil[ilillIll] || "";
            if ($.shareCodePinArr[ilillIll] && $.shareCodePinArr[ilillIll].includes($.UserName)) {
              iiI1llii++;
              continue;
            }
            if ($.shareCode.count >= $.shareCodeArr.shareCount) {
              iiI1llii++;
              continue;
            }
            $.getlj = false;
            if ($.shareCode) console.log("助力[" + ilillIll + "]");
            let iliiilli = await IlIi1lil($.shareCode.code, 1);
            if (/重复助力/.test(iliiilli)) {
              if (!$.shareCodePinArr[ilillIll]) $.shareCodePinArr[ilillIll] = [];
              $.shareCodePinArr[ilillIll].push($.UserName);
              IIl1lI11--;
              I11lIii--;
            } else {
              if (/助力/.test(iliiilli) && /上限/.test(iliiilli)) $.shareFlag = false;else {
                if (!/领取上限/.test(iliiilli) && $.getlj == true) {
                  if (!$.shareCodePinArr[ilillIll]) $.shareCodePinArr[ilillIll] = [];
                  !$.shareCodePinArr[ilillIll].includes($.UserName) && $.shareCodePinArr[ilillIll].push($.UserName);
                  IIl1lI11--;
                } else liil11lI = false;
              }
            }
          }
          il1iIi1I++;
        }
        liil11lI && iiI1llii == Object.getOwnPropertyNames(ii111lil).length && (iIiIi = true);
        if (il1iIi1I == 0) {
          $.getlj = false;
          let lIi1iII = await IlIi1lil("", 1);
          !/领取上限/.test(lIi1iII) && $.getlj == true && IIl1lI11--;
        }
        if ($.endFlag) break;
      } else {
        let lIIiIIi = await iliiIl1();
        if (!$.endFlag && lIIiIIi && $.again == false) await l1i1I1Il();
        if ($.again == false) break;
      }
      $.again == true && lliii11 < 1 && (lliii11++, $.again = false);
      IIl1lI11++;
      I11lIii++;
      $.flag == 1 && (await $.wait(parseInt(Math.random() * 500 + 100, 10)));
      if (redTimes > 0 && redTimes <= I11lIii) break;
    } while ($.flag == 1 && IIl1lI11 < 4);
    if ($.endFlag) return;
    resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
    if (iIiIi) {}
    let ilIII11 = parseInt(Math.random() * 1000 + redTimes, 10);
    console.log("等待 " + ilIII11 / 1000 + " 秒");
    await $.wait(ilIII11);
  } catch (Il1l1llI) {
    console.log(Il1l1llI);
  }
}
async function lIII1lIi(lI1i11Ii = 0) {
  try {
    let illlIIii = 2;
    if (lI1i11Ii == 1) illlIIii = 1;
    let lliI1iiI = 0;
    for (let IiI1li1i in $.shareCodeArr || {}) {
      if (IiI1li1i === "flag" || IiI1li1i === "updateTime" || IiI1li1i === "shareCount") continue;
      if ($.shareCodeArr[IiI1li1i] && $.shareCodeArr.shareCount && $.shareCodeArr[IiI1li1i].count < $.shareCodeArr.shareCount) lliI1iiI++;
    }
    for (let I1ili1i1 = 0; I1ili1i1 < lliIil11.length && !$.runEnd; I1ili1i1++) {
      lI1IIII = lliIil11[I1ili1i1];
      if (lI1IIII) {
        $.UserName = decodeURIComponent(lI1IIII.match(/pt_pin=([^; ]+)(?=;?)/) && lI1IIII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (l1i1i1lI.length > 0 && l1i1i1lI.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) continue;
        $.index = I1ili1i1 + 1;
        $.eid_token = "";
        await Il1lIi1l();
        await IIII1i11();
        await lllliIIl(1);
        let I1l1lIil = 0;
        for (let iii1iIil in $.shareCodeArr || {}) {
          if (iii1iIil === "flag" || iii1iIil === "updateTime" || iii1iIil === "shareCount") continue;
          if ($.shareCodeArr[iii1iIil] && $.shareCodeArr.shareCount && $.shareCodeArr[iii1iIil].count < $.shareCodeArr.shareCount) I1l1lIil++;
        }
        if ($.endFlag || I1l1lIil - lliI1iiI >= illlIIii || $.end) break;
      }
    }
  } catch (iIlI1iI) {
    console.log(iIlI1iI);
  }
  if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) for (let l1Ii1I1l in $.shareCodeArr || {}) {
    if (l1Ii1I1l === "flag" || l1Ii1I1l === "updateTime" || l1Ii1I1l === "shareCount") continue;
    if ($.shareCodeArr[l1Ii1I1l]) ii111lil[l1Ii1I1l] = $.shareCodeArr[l1Ii1I1l];
  }
}
function IlIi1lil(IIiiI1i = "", i11i1Iil = 1) {
  return new Promise(async llllI1ii => {
    $.UVCookie = lIlIl1l.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let liIi11I = "",
      iil1IiI1 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
    const iII1iIiI = {
        "platform": I1llilI1,
        "unionActId": "31162",
        "actId": $.actId,
        "d": i1IilliI,
        "unionShareId": IIiiI1i,
        "type": i11i1Iil
      },
      lIIil1I1 = {
        "appid": "u",
        "body": JSON.stringify(iII1iIiI),
        "client": "apple",
        "clientVersion": $.UA.split(";")[2] || "1.1.0",
        "functionId": "getCoupons"
      };
    let illIll1i = li111lIi.__genH5st(lIIil1I1, $.UserName);
    liIi11I = illIll1i.h5st || "";
    let iIlili1 = "",
      IiiII11I = {
        "url": "https://api.m.jd.com/api",
        "body": "functionId=getCoupons&appid=" + lIIil1I1.appid + "&_=" + iil1IiI1 + "&loginType=2&body=" + $.toStr(iII1iIiI) + "&client=" + lIIil1I1.client + "&clientVersion=" + lIIil1I1.clientVersion + "&h5st=" + liIi11I + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
        "headers": {
          "accept": "*/*",
          "Accept-Language": "zh-cn",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          "Cookie": "" + $.UVCookie + illiIlII + " " + lI1IIII,
          "origin": $.origin,
          "Referer": $.origin + "/",
          "User-Agent": $.UA
        }
      };
    IiiII11I.headers.Cookie = IiiII11I.headers.Cookie.replace(/;\s*$/, "");
    IiiII11I.headers.Cookie = IiiII11I.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) IiiII11I.headers.Referer = $.url2;
    $.post(IiiII11I, async (lliIIiII, iIIliili, ll1l1ii1) => {
      try {
        if (lliIIiII) {
          console.log("" + $.toStr(lliIIiII));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let i1i11ilI = $.toObj(ll1l1ii1, ll1l1ii1);
          if (typeof i1i11ilI == "object") {
            i1i11ilI.msg && (iIlili1 = i1i11ilI.msg, console.log(i1i11ilI.msg));
            if (i1i11ilI.msg.indexOf("不展示弹层") > -1 && i11i1Iil == 1) $.again = true;
            if (i1i11ilI.msg.indexOf("领取上限") === -1 && i1i11ilI.msg.indexOf("登录") === -1) {
              if (i11i1Iil == 1) $.flag = 1;
            }
            if (i1i11ilI.msg.indexOf("活动已结束") > -1 || i1i11ilI.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            IIiiI1i && typeof i1i11ilI.data !== "undefined" && typeof i1i11ilI.data.joinNum !== "undefined" && console.log("当前" + i1i11ilI.data.joinSuffix + ":" + i1i11ilI.data.joinNum);
            if (i1i11ilI.code == 0 && i1i11ilI.data) {
              if (i11i1Iil == 1) $.shareCode.count++;
              let illiIl1 = "";
              for (let iiiiIliI of i1i11ilI.data.couponList) {
                if (iiiiIliI.type == 1) {
                  $.getlj = true;
                  illiIl1 += (illiIl1 ? "\n" : "") + "获得[红包]🧧" + iiiiIliI.discount + "元 使用时间:" + $.time("yyyy-MM-dd", iiiiIliI.beginTime) + " " + $.time("yyyy-MM-dd", iiiiIliI.endTime);
                } else {
                  if (iiiiIliI.type == 3) {
                    $.getlj = true;
                    illiIl1 += (illiIl1 ? "\n" : "") + "获得[优惠券]🎟️满" + iiiiIliI.quota + "减" + iiiiIliI.discount + " 使用时间:" + $.time("yyyy-MM-dd", iiiiIliI.beginTime) + " " + $.time("yyyy-MM-dd", iiiiIliI.endTime);
                  } else iiiiIliI.type == 6 ? ($.getlj = true, illiIl1 += (illiIl1 ? "\n" : "") + "获得[打折券]]🎫满" + iiiiIliI.quota + "打" + iiiiIliI.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", iiiiIliI.beginTime) + " " + $.time("yyyy-MM-dd", iiiiIliI.endTime)) : ($.getlj = true, illiIl1 += (illiIl1 ? "\n" : "") + "获得[未知]🎉" + (iiiiIliI.quota || "") + " " + iiiiIliI.discount + " 使用时间:" + $.time("yyyy-MM-dd", iiiiIliI.beginTime) + " " + $.time("yyyy-MM-dd", iiiiIliI.endTime), console.log(iiiiIliI));
                }
              }
              illiIl1 && (resMsg += illiIl1 + "\n", console.log(illiIl1));
            }
            if (i11i1Iil == 1 && typeof i1i11ilI.data !== "undefined" && typeof i1i11ilI.data.groupData !== "undefined" && typeof i1i11ilI.data.groupData.groupInfo !== "undefined") for (let I111iIi of i1i11ilI.data.groupData.groupInfo || []) {
              I111iIi.status == 2 && (console.log("助力满可以领取" + I111iIi.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await IlIi1lil("", 2));
            }
          } else console.log(ll1l1ii1);
        }
      } catch (II1Iil1I) {
        $.logErr(II1Iil1I, iIIliili);
      } finally {
        llllI1ii(iIlili1);
      }
    });
  });
}
function iliiIl1(I1l1iIi1 = "") {
  let ll1l1i1I = true;
  return new Promise(I1Ii1ii1 => {
    $.UVCookie = lIlIl1l.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let lIlIl1II = {
      "url": "https://api.m.jd.com/api?functionId=showCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22actId%22:%22" + $.actId + "%22,%22unionActId%22:%2231162%22,%22unpl%22:%22" + $.unpl + "%22,%22platform%22:" + I1llilI1 + ",%22unionShareId%22:%22%22," + ($.uiUpdateTime ? "%22uiUpdateTime%22:" + $.uiUpdateTime + "," : "") + "%22d%22:%22" + i1IilliI + "%22,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + illiIlII + " " + lI1IIII,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      }
    };
    lIlIl1II.headers.Cookie = lIlIl1II.headers.Cookie.replace(/;\s*$/, "");
    lIlIl1II.headers.Cookie = lIlIl1II.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) lIlIl1II.headers.Referer = $.url2;
    $.get(lIlIl1II, async (iIiIii1i, iiiIliI, illiilIi) => {
      try {
        if (iIiIii1i) {
          console.log("" + $.toStr(iIiIii1i));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let IIl1IIil = $.toObj(illiilIi, illiilIi);
          if (typeof IIl1IIil == "object") {
            if (IIl1IIil.msg) console.log(IIl1IIil.msg);
            if (IIl1IIil.msg.indexOf("不展示弹层") > -1) $.again = true;
            if (IIl1IIil.msg.indexOf("领取上限") > -1) $.runArr[$.UserName] = true;
            IIl1IIil.msg.indexOf("上限") === -1 && IIl1IIil.msg.indexOf("登录") === -1 && ($.flag = 1);
            if (IIl1IIil.msg.indexOf("活动已结束") > -1 || IIl1IIil.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            if (IIl1IIil.data.uiUpdateTime) $.uiUpdateTime = IIl1IIil.data.uiUpdateTime;
            if (typeof IIl1IIil.data !== "undefined" && typeof IIl1IIil.data.groupData !== "undefined" && typeof IIl1IIil.data.groupData.joinNum !== "undefined") {
              $.joinNum = IIl1IIil.data.groupData.joinNum;
              let lI1iIi = 0;
              for (let llI11Iil of IIl1IIil.data.groupData.groupInfo) {
                if (lI1iIi < llI11Iil.num) lI1iIi = llI11Iil.num;
              }
              if ($.shareCount > 0 && lI1iIi > $.shareCount) lI1iIi = $.shareCount;
              $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = lI1iIi);
              $.shareCodeArr.shareCount = lI1iIi;
              if (lI1iIi <= $.joinNum) {
                if (!$.shareCodeArr[$.UserName]) $.shareCodeArr[$.UserName] = {};
                $.shareCodeArr[$.UserName].count = $.joinNum;
                ll1l1i1I = false;
              }
              console.log("【账号" + $.index + "】" + ($.nickName || $.UserName) + " " + $.joinNum + "/" + lI1iIi + "人");
            }
            IIl1IIil.msg.indexOf("活动已结束") > -1 && (ll1l1i1I = false);
            if (typeof IIl1IIil.data !== "undefined" && typeof IIl1IIil.data.groupData !== "undefined" && typeof IIl1IIil.data.groupData.groupInfo !== "undefined") for (let lll1IIil of IIl1IIil.data.groupData.groupInfo || []) {
              lll1IIil.status == 2 && (console.log("助力满可以领取" + lll1IIil.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await IlIi1lil("", 2));
            }
          } else console.log(illiilIi);
        }
      } catch (iIiI1iI) {
        $.logErr(iIiI1iI, iiiIliI);
      } finally {
        I1Ii1ii1(ll1l1i1I);
      }
    });
  });
}
function l1i1I1Il() {
  if ($.shareCodeArr[$.UserName]) {
    console.log("【账号" + $.index + "】缓存分享码:" + $.shareCodeArr[$.UserName].code.replace(/.+(.{3})/, "***$1"));
    return;
  }
  return new Promise(lI11lili => {
    let II11IIiI = {
      "url": "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22unionActId%22:%2231162%22,%22actId%22:%22" + $.actId + "%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22" + i1IilliI + "%22,%22supportPic%22:2,%22supportLuckyCode%22:0,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + illiIlII + " " + lI1IIII,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      }
    };
    II11IIiI.headers.Cookie = II11IIiI.headers.Cookie.replace(/;\s*$/, "");
    II11IIiI.headers.Cookie = II11IIiI.headers.Cookie.replace(/;([^\s])/g, "; $1");
    $.get(II11IIiI, async (llll11ll, lilIIIi, iIII11iI) => {
      try {
        if (llll11ll) {
          console.log("" + $.toStr(llll11ll));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let l111i1ii = $.toObj(iIII11iI, iIII11iI);
          if (typeof l111i1ii == "object") {
            if (l111i1ii.code == 0 && l111i1ii.data && l111i1ii.data.shareUrl) {
              let Ill1ii1i = l111i1ii.data.shareUrl.match(/\?s=([^&]+)/) && l111i1ii.data.shareUrl.match(/\?s=([^&]+)/)[1] || "";
              Ill1ii1i && (console.log("【账号" + $.index + "】分享码：" + Ill1ii1i.replace(/.+(.{3})/, "***$1")), $.shareCodeArr[$.UserName] = {
                "code": Ill1ii1i,
                "count": $.joinNum
              });
            }
          } else console.log(iIII11iI);
        }
      } catch (ll1il1l) {
        $.logErr(ll1il1l, lilIIIi);
      } finally {
        lI11lili();
      }
    });
  });
}
function ilI1llIi() {
  return new Promise(Il111ii => {
    const llllilli = {
      "url": $.url1,
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + illiIlII + " " + lI1IIII,
        "User-Agent": $.UA
      }
    };
    $.get(llllilli, async (lIIiIiIi, lI1li11I, liIilill) => {
      try {
        l1iiiIIl(lI1li11I);
        $.url2 = lI1li11I && lI1li11I.headers && (lI1li11I.headers.location || lI1li11I.headers.Location || "") || "";
        $.url2 = decodeURIComponent($.url2);
        $.url2 = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || "";
      } catch (II1liIIi) {
        $.logErr(II1liIIi, lI1li11I);
      } finally {
        Il111ii(liIilill);
      }
    });
  });
}
function I111IIiI() {
  return new Promise(lI1Iil => {
    const il1liIlI = {
      "url": "https://u.jd.com/" + i1IilliI + ($.shareCode && "?s=" + $.shareCode || ""),
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + illiIlII + " " + lI1IIII,
        "User-Agent": $.UA
      }
    };
    $.get(il1liIlI, async (i1IIl1i1, IIlI1iii, ill1l1ll) => {
      try {
        l1iiiIIl(IIlI1iii);
        $.url1 = ill1l1ll && ill1l1ll.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && ill1l1ll.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || "";
      } catch (l1lIIl) {
        $.logErr(l1lIIl, IIlI1iii);
      } finally {
        lI1Iil(ill1l1ll);
      }
    });
  });
}
function l1iiiIIl(ll1l1Iii) {
  let lI11IIIl = ll1l1Iii && ll1l1Iii.headers && (ll1l1Iii.headers["set-cookie"] || ll1l1Iii.headers["Set-Cookie"] || "") || "",
    Il11lli = "";
  if (lI11IIIl) {
    if (typeof lI11IIIl != "object") Il11lli = lI11IIIl.split(",");else Il11lli = lI11IIIl;
    for (let ii11ii1l of Il11lli) {
      let ilI1I11i = ii11ii1l.split(";")[0].trim();
      if (ilI1I11i.split("=")[1]) {
        ilI1I11i.split("=")[0] == "unpl" && ilI1I11i.split("=")[1] && ($.unpl = ilI1I11i.split("=")[1]);
        if (illiIlII.indexOf(ilI1I11i.split("=")[1]) == -1) illiIlII += ilI1I11i.replace(/ /g, "") + "; ";
      }
    }
  }
}
function Il1lIi1l(lilllIi = 1) {
  $.UA = "jdapp;iPhone;12.0.2;;;M/5.0;appBuild/168698;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify({
    "ciphertype": 5,
    "cipher": {
      "ud": "",
      "sv": "CJGkCm==",
      "iad": ""
    },
    "ts": Math.floor(new Date().getTime() / 1000),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  })) + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
  lilllIi != 1 && ($.UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1");
}
function li1iilil(li1II1i) {
  if (typeof li1II1i == "string") try {
    return JSON.parse(li1II1i);
  } catch (iI111Ili) {
    return console.log(iI111Ili), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function IIII1i11() {
  var IIlllI11 = function () {
    function iiI1Ii1i(lIliil1I, III1i1ll) {
      lIliil1I = [lIliil1I[0] >>> 16, 65535 & lIliil1I[0], lIliil1I[1] >>> 16, 65535 & lIliil1I[1]];
      III1i1ll = [III1i1ll[0] >>> 16, 65535 & III1i1ll[0], III1i1ll[1] >>> 16, 65535 & III1i1ll[1]];
      var iiIiIlll = [0, 0, 0, 0];
      return iiIiIlll[3] += lIliil1I[3] + III1i1ll[3], iiIiIlll[2] += iiIiIlll[3] >>> 16, iiIiIlll[3] &= 65535, iiIiIlll[2] += lIliil1I[2] + III1i1ll[2], iiIiIlll[1] += iiIiIlll[2] >>> 16, iiIiIlll[2] &= 65535, iiIiIlll[1] += lIliil1I[1] + III1i1ll[1], iiIiIlll[0] += iiIiIlll[1] >>> 16, iiIiIlll[1] &= 65535, iiIiIlll[0] += lIliil1I[0] + III1i1ll[0], iiIiIlll[0] &= 65535, [iiIiIlll[0] << 16 | iiIiIlll[1], iiIiIlll[2] << 16 | iiIiIlll[3]];
    }
    function iIIIII1I(l1IIiliI, iIiI1lii) {
      l1IIiliI = [l1IIiliI[0] >>> 16, 65535 & l1IIiliI[0], l1IIiliI[1] >>> 16, 65535 & l1IIiliI[1]];
      iIiI1lii = [iIiI1lii[0] >>> 16, 65535 & iIiI1lii[0], iIiI1lii[1] >>> 16, 65535 & iIiI1lii[1]];
      var IlliIIii = [0, 0, 0, 0];
      return IlliIIii[3] += l1IIiliI[3] * iIiI1lii[3], IlliIIii[2] += IlliIIii[3] >>> 16, IlliIIii[3] &= 65535, IlliIIii[2] += l1IIiliI[2] * iIiI1lii[3], IlliIIii[1] += IlliIIii[2] >>> 16, IlliIIii[2] &= 65535, IlliIIii[2] += l1IIiliI[3] * iIiI1lii[2], IlliIIii[1] += IlliIIii[2] >>> 16, IlliIIii[2] &= 65535, IlliIIii[1] += l1IIiliI[1] * iIiI1lii[3], IlliIIii[0] += IlliIIii[1] >>> 16, IlliIIii[1] &= 65535, IlliIIii[1] += l1IIiliI[2] * iIiI1lii[2], IlliIIii[0] += IlliIIii[1] >>> 16, IlliIIii[1] &= 65535, IlliIIii[1] += l1IIiliI[3] * iIiI1lii[1], IlliIIii[0] += IlliIIii[1] >>> 16, IlliIIii[1] &= 65535, IlliIIii[0] += l1IIiliI[0] * iIiI1lii[3] + l1IIiliI[1] * iIiI1lii[2] + l1IIiliI[2] * iIiI1lii[1] + l1IIiliI[3] * iIiI1lii[0], IlliIIii[0] &= 65535, [IlliIIii[0] << 16 | IlliIIii[1], IlliIIii[2] << 16 | IlliIIii[3]];
    }
    function l1l1iiil(Ii1illII, i111lII1) {
      return 32 === (i111lII1 %= 64) ? [Ii1illII[1], Ii1illII[0]] : 32 > i111lII1 ? [Ii1illII[0] << i111lII1 | Ii1illII[1] >>> 32 - i111lII1, Ii1illII[1] << i111lII1 | Ii1illII[0] >>> 32 - i111lII1] : (i111lII1 -= 32, [Ii1illII[1] << i111lII1 | Ii1illII[0] >>> 32 - i111lII1, Ii1illII[0] << i111lII1 | Ii1illII[1] >>> 32 - i111lII1]);
    }
    function Ii1ilili(Il1Iill, iil1l1Il) {
      return 0 === (iil1l1Il %= 64) ? Il1Iill : 32 > iil1l1Il ? [Il1Iill[0] << iil1l1Il | Il1Iill[1] >>> 32 - iil1l1Il, Il1Iill[1] << iil1l1Il] : [Il1Iill[1] << iil1l1Il - 32, 0];
    }
    function Ilil1ill(li111iI, IiiIIl1) {
      return [li111iI[0] ^ IiiIIl1[0], li111iI[1] ^ IiiIIl1[1]];
    }
    function l11iIli1(Il1l1lI) {
      return Ilil1ill(Il1l1lI = iIIIII1I(Il1l1lI = Ilil1ill(Il1l1lI = iIIIII1I(Il1l1lI = Ilil1ill(Il1l1lI, [0, Il1l1lI[0] >>> 1]), [4283543511, 3981806797]), [0, Il1l1lI[0] >>> 1]), [3301882366, 444984403]), [0, Il1l1lI[0] >>> 1]);
    }
    return {
      "hash128": function (Iil1ii1l, liIli1Il) {
        var ll1IIiIi = liIli1Il || 0;
        liIli1Il = (Iil1ii1l = Iil1ii1l || "").length % 16;
        var i1lilIl = Iil1ii1l.length - liIli1Il,
          llil1i = [0, ll1IIiIi];
        ll1IIiIi = [0, ll1IIiIi];
        for (var IIl11l11, IIII1llI, IIll1ili = [2277735313, 289559509], lIi11IiI = [1291169091, 658871167], lilI11lI = 0; lilI11lI < i1lilIl; lilI11lI += 16) {
          IIl11l11 = [255 & Iil1ii1l.charCodeAt(lilI11lI + 4) | (255 & Iil1ii1l.charCodeAt(lilI11lI + 5)) << 8 | (255 & Iil1ii1l.charCodeAt(lilI11lI + 6)) << 16 | (255 & Iil1ii1l.charCodeAt(lilI11lI + 7)) << 24, 255 & Iil1ii1l.charCodeAt(lilI11lI) | (255 & Iil1ii1l.charCodeAt(lilI11lI + 1)) << 8 | (255 & Iil1ii1l.charCodeAt(lilI11lI + 2)) << 16 | (255 & Iil1ii1l.charCodeAt(lilI11lI + 3)) << 24];
          IIII1llI = [255 & Iil1ii1l.charCodeAt(lilI11lI + 12) | (255 & Iil1ii1l.charCodeAt(lilI11lI + 13)) << 8 | (255 & Iil1ii1l.charCodeAt(lilI11lI + 14)) << 16 | (255 & Iil1ii1l.charCodeAt(lilI11lI + 15)) << 24, 255 & Iil1ii1l.charCodeAt(lilI11lI + 8) | (255 & Iil1ii1l.charCodeAt(lilI11lI + 9)) << 8 | (255 & Iil1ii1l.charCodeAt(lilI11lI + 10)) << 16 | (255 & Iil1ii1l.charCodeAt(lilI11lI + 11)) << 24];
          llil1i = iiI1Ii1i(iIIIII1I(llil1i = iiI1Ii1i(llil1i = l1l1iiil(llil1i = Ilil1ill(llil1i, IIl11l11 = iIIIII1I(IIl11l11 = l1l1iiil(IIl11l11 = iIIIII1I(IIl11l11, IIll1ili), 31), lIi11IiI)), 27), ll1IIiIi), [0, 5]), [0, 1390208809]);
          ll1IIiIi = iiI1Ii1i(iIIIII1I(ll1IIiIi = iiI1Ii1i(ll1IIiIi = l1l1iiil(ll1IIiIi = Ilil1ill(ll1IIiIi, IIII1llI = iIIIII1I(IIII1llI = l1l1iiil(IIII1llI = iIIIII1I(IIII1llI, lIi11IiI), 33), IIll1ili)), 31), llil1i), [0, 5]), [0, 944331445]);
        }
        switch (IIl11l11 = [0, 0], IIII1llI = [0, 0], liIli1Il) {
          case 15:
            IIII1llI = Ilil1ill(IIII1llI, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 14)], 48));
          case 14:
            IIII1llI = Ilil1ill(IIII1llI, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 13)], 40));
          case 13:
            IIII1llI = Ilil1ill(IIII1llI, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 12)], 32));
          case 12:
            IIII1llI = Ilil1ill(IIII1llI, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 11)], 24));
          case 11:
            IIII1llI = Ilil1ill(IIII1llI, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 10)], 16));
          case 10:
            IIII1llI = Ilil1ill(IIII1llI, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 9)], 8));
          case 9:
            ll1IIiIi = Ilil1ill(ll1IIiIi, IIII1llI = iIIIII1I(IIII1llI = l1l1iiil(IIII1llI = iIIIII1I(IIII1llI = Ilil1ill(IIII1llI, [0, Iil1ii1l.charCodeAt(lilI11lI + 8)]), lIi11IiI), 33), IIll1ili));
          case 8:
            IIl11l11 = Ilil1ill(IIl11l11, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 7)], 56));
          case 7:
            IIl11l11 = Ilil1ill(IIl11l11, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 6)], 48));
          case 6:
            IIl11l11 = Ilil1ill(IIl11l11, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 5)], 40));
          case 5:
            IIl11l11 = Ilil1ill(IIl11l11, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 4)], 32));
          case 4:
            IIl11l11 = Ilil1ill(IIl11l11, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 3)], 24));
          case 3:
            IIl11l11 = Ilil1ill(IIl11l11, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 2)], 16));
          case 2:
            IIl11l11 = Ilil1ill(IIl11l11, Ii1ilili([0, Iil1ii1l.charCodeAt(lilI11lI + 1)], 8));
          case 1:
            llil1i = Ilil1ill(llil1i, IIl11l11 = iIIIII1I(IIl11l11 = l1l1iiil(IIl11l11 = iIIIII1I(IIl11l11 = Ilil1ill(IIl11l11, [0, Iil1ii1l.charCodeAt(lilI11lI)]), IIll1ili), 31), lIi11IiI));
        }
        return llil1i = Ilil1ill(llil1i, [0, Iil1ii1l.length]), ll1IIiIi = iiI1Ii1i(ll1IIiIi = Ilil1ill(ll1IIiIi, [0, Iil1ii1l.length]), llil1i = iiI1Ii1i(llil1i, ll1IIiIi)), llil1i = l11iIli1(llil1i), ll1IIiIi = iiI1Ii1i(ll1IIiIi = l11iIli1(ll1IIiIi), llil1i = iiI1Ii1i(llil1i, ll1IIiIi)), ("00000000" + (llil1i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (llil1i[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (ll1IIiIi[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (ll1IIiIi[1] >>> 0).toString(16)).slice(-8);
      }
    };
  }();
  function III1iiII(l1lIIiI) {
    l1lIIiI = JSON.stringify(l1lIIiI);
    l1lIIiI = encodeURIComponent(l1lIIiI);
    var Il11I1l1 = "",
      I1ll11I1 = 0;
    do {
      var lII1Ii1l = l1lIIiI.charCodeAt(I1ll11I1++),
        I1I1IIll = l1lIIiI.charCodeAt(I1ll11I1++),
        lii1iiI = l1lIIiI.charCodeAt(I1ll11I1++),
        lilil1Il = lII1Ii1l >> 2;
      lII1Ii1l = (3 & lII1Ii1l) << 4 | I1I1IIll >> 4;
      var iIiI11 = (15 & I1I1IIll) << 2 | lii1iiI >> 6,
        i1i11Iii = 63 & lii1iiI;
      isNaN(I1I1IIll) ? iIiI11 = i1i11Iii = 64 : isNaN(lii1iiI) && (i1i11Iii = 64);
      Il11I1l1 = Il11I1l1 + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(lilil1Il) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(lII1Ii1l) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(iIiI11) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(i1i11Iii);
    } while (I1ll11I1 < l1lIIiI.length);
    return Il11I1l1 + "/";
  }
  var Il1llIIl = [$.UA.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "896x414", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null],
    iil1I1l1 = IIlllI11.hash128(Il1llIIl.join("~~~"), 31),
    lIiiI1l1 = {
      "pin": "",
      "oid": "",
      "bizId": "jd-babelh5",
      "fc": "",
      "mode": "strict",
      "p": "s",
      "fp": iil1I1l1,
      "ctype": 1,
      "v": "3.1.1.0",
      "f": "3",
      "o": "prodev.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html",
      "qs": "",
      "jsTk": "",
      "qi": ""
    },
    Ill1IIil = III1iiII(lIiiI1l1),
    l1IIIi1l = {},
    Il1llIIl = new Date();
  l1IIIi1l.ts = {};
  l1IIIi1l.ts.deviceTime = Il1llIIl.getTime();
  l1IIIi1l.ca = {
    "tdHash": null
  };
  l1IIIi1l.m = {
    "compatMode": "CSS1Compat"
  };
  l1IIIi1l.fo = ["Arial Black", "Bauhaus 93", "Chalkduster", "GungSeo", "Hiragino Sans GB", "Impact", "Menlo", "Papyrus", "Rockwell"];
  l1IIIi1l.n = {
    "vendorSub": "",
    "productSub": "20030107",
    "vendor": "Apple Computer, Inc.",
    "maxTouchPoints": 1,
    "pdfViewerEnabled": !1,
    "hardwareConcurrency": 10,
    "cookieEnabled": !0,
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": /\/(.+)/g.exec($.UA) && /\/(.+)/g.exec($.UA)[1] || $.UA,
    "platform": "iPhone",
    "product": "Gecko",
    "userAgent": $.UA,
    "language": "zh-CN",
    "onLine": !0,
    "webdriver": !1,
    "javaEnabled": !1,
    "deviceMemory": 8,
    "enumerationOrder": ["vendorSub", "productSub", "vendor", "maxTouchPoints", "scheduling", "userActivation", "doNotTrack", "geolocation", "connection", "plugins", "mimeTypes", "pdfViewerEnabled", "webkitTemporaryStorage", "webkitPersistentStorage", "hardwareConcurrency", "cookieEnabled", "appCodeName", "appName", "appVersion", "platform", "product", "userAgent", "language", "languages", "onLine", "webdriver", "getGamepads", "javaEnabled", "sendBeacon", "vibrate", "bluetooth", "clipboard", "credentials", "keyboard", "managed", "mediaDevices", "storage", "serviceWorker", "virtualKeyboard", "wakeLock", "deviceMemory", "ink", "hid", "locks", "mediaCapabilities", "mediaSession", "permissions", "presentation", "serial", "gpu", "usb", "windowControlsOverlay", "xr", "userAgentData", "clearAppBadge", "getBattery", "getUserMedia", "requestMIDIAccess", "requestMediaKeySystemAccess", "setAppBadge", "webkitGetUserMedia", "getInstalledRelatedApps", "registerProtocolHandler", "unregisterProtocolHandler"]
  };
  l1IIIi1l.p = [];
  l1IIIi1l.w = {
    "devicePixelRatio": 1,
    "screenTop": 0,
    "screenLeft": 0
  };
  l1IIIi1l.s = {
    "availHeight": 896,
    "availWidth": 414,
    "colorDepth": 24,
    "height": 896,
    "width": 414,
    "pixelDepth": 24
  };
  l1IIIi1l.sc = {
    "ActiveBorder": "rgb(118, 118, 118)",
    "ActiveCaption": "rgb(0, 0, 0)",
    "AppWorkspace": "rgb(255, 255, 255)",
    "Background": "rgb(255, 255, 255)",
    "ButtonFace": "rgb(239, 239, 239)",
    "ButtonHighlight": "rgb(239, 239, 239)",
    "ButtonShadow": "rgb(239, 239, 239)",
    "ButtonText": "rgb(0, 0, 0)",
    "CaptionText": "rgb(0, 0, 0)",
    "GrayText": "rgb(128, 128, 128)",
    "Highlight": "rgb(181, 213, 255)",
    "HighlightText": "rgb(0, 0, 0)",
    "InactiveBorder": "rgb(118, 118, 118)",
    "InactiveCaption": "rgb(255, 255, 255)",
    "InactiveCaptionText": "rgb(128, 128, 128)",
    "InfoBackground": "rgb(255, 255, 255)",
    "InfoText": "rgb(0, 0, 0)",
    "Menu": "rgb(255, 255, 255)",
    "MenuText": "rgb(0, 0, 0)",
    "Scrollbar": "rgb(255, 255, 255)",
    "ThreeDDarkShadow": "rgb(118, 118, 118)",
    "ThreeDFace": "rgb(239, 239, 239)",
    "ThreeDHighlight": "rgb(118, 118, 118)",
    "ThreeDLightShadow": "rgb(118, 118, 118)",
    "ThreeDShadow": "rgb(118, 118, 118)",
    "Window": "rgb(255, 255, 255)",
    "WindowFrame": "rgb(118, 118, 118)",
    "WindowText": "rgb(0, 0, 0)"
  };
  l1IIIi1l.ss = {
    "cookie": !0,
    "localStorage": !0,
    "sessionStorage": !0,
    "globalStorage": !1,
    "indexedDB": !0
  };
  l1IIIi1l.tz = -480;
  l1IIIi1l.lil = "";
  l1IIIi1l.wil = "";
  l1IIIi1l.ts.deviceEndTime = new Date().getTime();
  var IlI1lliI = III1iiII(l1IIIi1l);
  const Il11iIIl = {
    "url": "https://gia.jd.com/jsTk.do?a=" + Ill1IIil,
    "body": "d=" + IlI1lliI,
    "headers": {
      "Accept": "*/*",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Origin": "https://pro.m.jd.com",
      "Referer": "https://pro.m.jd.com/",
      "User-Agent": $.UA
    }
  };
  return new Promise(IilIi => {
    $.post(Il11iIIl, async (ilIliiiI, Iilil1il, II11i1Ii) => {
      try {
        if (ilIliiiI) console.log(ilIliiiI);else {
          let il1l1iiI = $.toObj(II11i1Ii, II11i1Ii);
          il1l1iiI && typeof il1l1iiI === "object" && il1l1iiI.code == 0 && il1l1iiI.data && il1l1iiI.data.token ? $.eid_token = il1l1iiI.data.token : console.log(II11i1Ii);
        }
      } catch (Iilll1l) {
        $.logErr(Iilll1l, Iilil1il);
      } finally {
        IilIi();
      }
    });
  });
}
function IilIIli(i1l11l1l, I1lii11i, il1liIll = "") {
  class l11liiii {
    constructor(iI1llIi = "", lI1IIIi1 = "", Iili11i = "") {
      this.appId = iI1llIi;
      this.v = "3.1";
      lI1IIIi1 ? this.ua = lI1IIIi1 : this.ua = this.__genUA();
      this.fp = Iili11i ? Iili11i : this.__genFp();
    }
    ["__format"](iIiiIli1, ililIiIl) {
      if (!iIiiIli1) iIiiIli1 = "yyyy-MM-dd";
      var IlIlii1l;
      !ililIiIl ? IlIlii1l = Date.now() : IlIlii1l = new Date(ililIiIl);
      var ilIII1ll = new Date(IlIlii1l),
        iIlllIII = iIiiIli1,
        liii1IIl = {
          "M+": ilIII1ll.getMonth() + 1,
          "d+": ilIII1ll.getDate(),
          "D+": ilIII1ll.getDate(),
          "h+": ilIII1ll.getHours(),
          "H+": ilIII1ll.getHours(),
          "m+": ilIII1ll.getMinutes(),
          "s+": ilIII1ll.getSeconds(),
          "w+": ilIII1ll.getDay(),
          "q+": Math.floor((ilIII1ll.getMonth() + 3) / 3),
          "S+": ilIII1ll.getMilliseconds()
        };
      /(y+)/i.test(iIlllIII) && (iIlllIII = iIlllIII.replace(RegExp.$1, "".concat(ilIII1ll.getFullYear()).substr(4 - RegExp.$1.length)));
      Object.keys(liii1IIl).forEach(l11Il11I => {
        if (new RegExp("(".concat(l11Il11I, ")")).test(iIlllIII)) {
          var IiiIil1 = "S+" === l11Il11I ? "000" : "00";
          iIlllIII = iIlllIII.replace(RegExp.$1, 1 == RegExp.$1.length ? liii1IIl[l11Il11I] : "".concat(IiiIil1).concat(liii1IIl[l11Il11I]).substr("".concat(liii1IIl[l11Il11I]).length));
        }
      });
      return iIlllIII;
    }
    ["__genUA"]() {
      this.uid = $.CryptoJS.SHA1($.UserName + "red").toString();
      let II1il1l = this.uid,
        l1I1iiiI = ["14.3"],
        lIiIII1 = l1I1iiiI[Math.floor(Math.random() * l1I1iiiI.length)],
        IlilIill = ["12,1"],
        IlllIII = IlilIill[Math.floor(Math.random() * IlilIill.length)],
        l1I1i11 = ["wifi"],
        i1i11i1i = l1I1i11[Math.floor(Math.random() * l1I1i11.length)],
        iiiI1i1l = lIiIII1.replace(/\./g, "_"),
        i1lliliI = [];
      i1lliliI = [["10.1.4", "167814"]];
      let i1lili1I = Math.floor(Math.random() * i1lliliI.length),
        illIili1 = i1lliliI[i1lili1I] ? i1lliliI[i1lili1I] : i1lliliI[0];
      IlllIII = "iPhone" + IlllIII;
      let lii1I1lI = "";
      return lii1I1lI = "jdapp;iPhone;" + illIili1[0] + ";" + lIiIII1 + ";" + II1il1l + ";network/" + i1i11i1i + ";model/" + IlllIII + ";addressid/;appBuild/" + illIili1[1] + ";jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + iiiI1i1l + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", lii1I1lI;
    }
    ["__genFp"]() {
      function i11llliI(lliIiI1l, llIiilii) {
        var ii1iilil = [],
          lilIl1I1 = lliIiI1l.length,
          iil1l1I = lliIiI1l.split(""),
          i1IIliIl = "";
        for (; i1IIliIl = iil1l1I.shift();) {
          if (Math.random() * lilIl1I1 < llIiilii) {
            ii1iilil.push(i1IIliIl);
            if (--llIiilii == 0) break;
          }
          lilIl1I1--;
        }
        for (var I11IIlII = "", IiIIilll = 0; IiIIilll < ii1iilil.length; IiIIilll++) {
          var i1Iiili1 = Math.random() * (ii1iilil.length - IiIIilll) | 0;
          I11IIlII += ii1iilil[i1Iiili1];
          ii1iilil[i1Iiili1] = ii1iilil[ii1iilil.length - IiIIilll - 1];
        }
        return I11IIlII;
      }
      function I1iIil1l(lil1ilIi, Il1li1) {
        for (let lilli11 of Il1li1.slice()) lil1ilIi = lil1ilIi.replace(lilli11, "");
        return lil1ilIi;
      }
      var i1l1iil1 = "0123456789",
        l1illiil = i11llliI(i1l1iil1, 3),
        IIi1li1 = Math.random() * 10 | 0,
        IllIlI1 = I1iIil1l(i1l1iil1, l1illiil),
        III1I1lI = {};
      III1I1lI.size = IIi1li1;
      III1I1lI.customDict = IllIlI1;
      var l1illii1 = this.getRandomIDPro(III1I1lI) + l1illiil + this.getRandomIDPro({
          "size": 14 - (IIi1li1 + 3) + 1,
          "customDict": IllIlI1
        }) + IIi1li1,
        I1iIii1l = l1illii1.split(""),
        I1IIl11 = [];
      for (; I1iIii1l.length > 0;) I1IIl11.push(9 - parseInt(I1iIii1l.pop()));
      var iliIIi1i = I1IIl11.join("");
      return iliIIi1i;
    }
    ["getRandomIDPro"]() {
      var I1lII11,
        i11li1Ii,
        llI1I1li = void 0 === (iIIll1i = (i11li1Ii = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).size) ? 10 : iIIll1i,
        iIIll1i = void 0 === (iIIll1i = i11li1Ii.dictType) ? "number" : iIIll1i,
        li111Ii1 = "";
      if ((i11li1Ii = i11li1Ii.customDict) && "string" == typeof i11li1Ii) I1lII11 = i11li1Ii;else switch (iIIll1i) {
        case "alphabet":
          I1lII11 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "max":
          I1lII11 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
          break;
        case "number":
        default:
          I1lII11 = "0123456789";
      }
      for (; llI1I1li--;) li111Ii1 += I1lII11[Math.random() * I1lII11.length | 0];
      return li111Ii1;
    }
    ["Encrypt"](ilII11i1, liI1ll1l) {
      let IillIIll = $.CryptoJS.AES.encrypt(ilII11i1, $.CryptoJS.enc.Utf8.parse(liI1ll1l.key), {
        "iv": $.CryptoJS.enc.Utf8.parse(liI1ll1l.iv),
        "mode": $.CryptoJS.mode.CBC,
        "padding": $.CryptoJS.pad.Pkcs7
      });
      return IillIIll.ciphertext.toString();
    }
    async ["__genAlgo"]() {
      let iIIl1ill = {
          "wc": 0,
          "wd": 0,
          "l": "zh-cn",
          "ls": "zh-cn",
          "ml": 0,
          "pl": 0,
          "av": /\/(.+)/g.exec(this.ua) && /\/(.+)/g.exec(this.ua)[1] || this.ua,
          "ua": this.ua,
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {},
          "pp1": "",
          "pm": {
            "ps": "prompt",
            "np": "default"
          },
          "w": 414,
          "h": 896,
          "ow": 414,
          "oh": 896,
          "url": "https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html?unionActId=31162&d=&s=&cu=true&utm_source=kong&utm_medium=jingfen",
          "og": "https://pro.m.jd.com",
          "pr": 3,
          "re": "https://u.jd.com/",
          "ai": this.appId,
          "fp": this.fp
        },
        lIl1Il1 = JSON.stringify(iIIl1ill, null, 2),
        I11ll1li = this.Encrypt(lIl1Il1, {
          "key": "wm0!@w-s#ll1flo(",
          "iv": "0102030405060708"
        });
      var i11lII1l = {
          "version": this.v,
          "fp": this.fp,
          "appId": this.appId.toString(),
          "timestamp": Date.now(),
          "platform": "web",
          "expandParams": I11ll1li || ""
        },
        {
          data: i11lII1l
        } = await IIiiII.post("https://cactus.jd.com/request_algo?g_ty=ajax", i11lII1l, {
          "headers": {
            "Host": "cactus.jd.com",
            "accept": "application/json",
            "content-type": "application/json",
            "user-agent": this.ua
          }
        });
      this.tk = i11lII1l.data.result.tk;
      this.genKey = new Function("return " + i11lII1l.data.result.algo)();
    }
    ["__genH5st"](i111Iili = {}, iIil = "") {
      let iilIl1lI = undefined,
        llilliIi = {
          "ua": this.ua,
          "uid": this.uid
        };
      if (this.tk && this.genKey) {
        this.time = Date.now();
        this.timestamp = this.__format("yyyyMMddhhmmssSSS", this.time);
        let iIil1Il1 = this.genKey(this.tk, this.fp.toString(), this.timestamp.toString(), this.appId.toString(), $.CryptoJS).toString();
        var i1Ili1Il = {},
          ii1lI1i1 = null;
        ii1lI1i1 = Object.keys(i111Iili).sort().map(function (iiiIllli) {
          var I1lIli1l = {};
          return I1lIli1l.key = iiiIllli, I1lIli1l.value = i111Iili[iiiIllli], I1lIli1l;
        }).filter(function (IliIII1I) {
          var Ii1llili = IliIII1I.value,
            l11lII1l = "number" == typeof Ii1llili && !isNaN(Ii1llili) || "string" == typeof Ii1llili || "boolean" == typeof Ii1llili || "body" == IliIII1I.key;
          if (l11lII1l) {
            if ("body" == IliIII1I.key && typeof IliIII1I.value == "object") IliIII1I.value = JSON.stringify(IliIII1I.value);
            i1Ili1Il[IliIII1I.key] = IliIII1I.value;
          }
          return l11lII1l;
        });
        i111Iili = i1Ili1Il;
        let ii1IIIIl = "";
        ii1IIIIl = Object.keys(i111Iili).map(function (ii1iIIl1) {
          return ii1iIIl1 + ":" + (ii1iIIl1 == "body" && i111Iili[ii1iIIl1].length !== 64 && i111Iili[ii1iIIl1].slice(0, 1) == "{" ? $.CryptoJS.SHA256(i111Iili[ii1iIIl1]).toString($.CryptoJS.enc.Hex) : i111Iili[ii1iIIl1]);
        }).join("&");
        ii1IIIIl = $.CryptoJS.HmacSHA256(ii1IIIIl, iIil1Il1).toString($.CryptoJS.enc.Hex);
        let l11IiIi1 = {
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {}
        };
        iIil && (l11IiIi1.pp.p1 = iIil);
        l11IiIi1.fp = this.fp;
        let Il1liI11 = JSON.stringify(l11IiIi1, null, 2),
          lI1il1li = this.Encrypt(Il1liI11, {
            "key": "wm0!@w_s#ll1flo(",
            "iv": "0102030405060708"
          });
        iilIl1lI = [this.timestamp, this.fp, this.appId.toString(), this.tk, ii1IIIIl, this.v, this.time.toString(), lI1il1li].join(";");
        llilliIi.t = i111Iili.t;
      }
      return llilliIi.h5st = iilIl1lI, llilliIi;
    }
  }
  li111lIi = new l11liiii(i1l11l1l, I1lii11i, il1liIll);
}
function l11lili1() {
  class IIlliiII {
    constructor() {
      this.UVCookie = "";
      this.ltr = 0;
      this.mr = [1, 0];
      this.document = {
        "cookie": "",
        "cookies": "__jdc=123;",
        "domain": "prodev.m.jd.com",
        "referrer": "https://u.jd.com/",
        "location": {
          "href": "https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html",
          "hrefs": "https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html"
        }
      };
      this.navigator = {
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        "userAgents": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
      };
      this.window = {};
    }
    ["getUVCookie"](IiIi11Ii = "", illlIl1i = "", il1l1I1i = "", I1lil1l1 = "") {
      try {
        this.document.location.href = this.document.location.hrefs + "";
        this.document.cookie = this.document.cookies + "";
        if (il1l1I1i) this.document.location.href = il1l1I1i;
        if (I1lil1l1) this.document.cookie = I1lil1l1;
        this.UVCookie = "";
        this.navigator.userAgent = this.navigator.userAgents + "";
        this.ltr = 1011 + Math.round(31 * Math.random());
        if (IiIi11Ii) this.navigator.userAgent = IiIi11Ii;
        return this.lr = {
          "ckJda": "__jda",
          "ckJdb": "__jdb",
          "ckJdv": "__jdv",
          "ckJdc": "__jdc",
          "refUrl": "https://u.jd.com/"
        }, this.q(), this.s(illlIl1i), this.UVCookie;
      } catch (I1Ilii) {
        console.log(I1Ilii);
      }
    }
    ["s"](iIii1li = "") {
      var IIlIllI,
        l1li1iII,
        iIiIlIlI,
        Ili11ll1,
        l1I1illi = (this.getCookie(this.lr.ckJda) || "").split("."),
        ilIlIIl = (this.getCookie(this.lr.ckJdb) || "").split("."),
        l1iI1i1l = (this.getCookie(this.lr.ckJdv) || "").split("|"),
        i1l11iil = this.getCookie(this.lr.ckJdc) || "",
        IIllI1Ii = parseInt((new Date().getTime() - this.ltr) / 1000),
        lliiii1l = 0,
        l1IIiiiI = 1,
        I1Ilil11 = "direct",
        il11iiii = "-",
        i1lIiill = "none",
        iII11li1 = "-";
      if (l1I1illi.length > 3) for (var i1IlI1I1 = 2; i1IlI1I1 < 5 && i1IlI1I1 < l1I1illi.length; i1IlI1I1++) {
        var l1ilil1 = l1I1illi[i1IlI1I1];
        l1ilil1.length > 10 && (l1I1illi[i1IlI1I1] = l1ilil1.substr(0, 10));
      }
      l1I1illi.length > 5 ? (iIiIlIlI = l1I1illi[0], Ili11ll1 = l1I1illi[1], IIlIllI = parseInt(l1I1illi[2], 10), l1li1iII = parseInt(l1I1illi[3], 10), IIllI1Ii = parseInt(l1I1illi[4], 10), l1IIiiiI = parseInt(l1I1illi[5], 10) || l1IIiiiI) : (Ili11ll1 = this.genUuid(), IIlIllI = IIllI1Ii, l1li1iII = IIllI1Ii);
      this.lr.uuid = Ili11ll1;
      ilIlIIl.length > 3 && (iIiIlIlI || (iIiIlIlI = ilIlIIl[0]), lliiii1l = parseInt(ilIlIIl[1], 10) || 0);
      l1iI1i1l.length > 4 && (iIiIlIlI || (iIiIlIlI = l1iI1i1l[0]), I1Ilil11 = l1iI1i1l[1], il11iiii = l1iI1i1l[2], i1lIiill = l1iI1i1l[3], iII11li1 = l1iI1i1l[4]);
      i1l11iil && "" !== i1l11iil && (iIiIlIlI || (iIiIlIlI = i1l11iil));
      var ii1lii,
        iI1lIllI = [],
        iliii1iI = ilIlIIl.length < 4,
        iIilii11 = this.getParameter("utm_source"),
        iIIi1I = false;
      if (iIilii11) {
        var lli1i11i = this.getParameter("utm_campaign"),
          ii11Ii11 = this.getParameter("utm_medium"),
          lI11Ii1i = this.getParameter("utm_term");
        iI1lIllI.push(iIilii11 || I1Ilil11);
        iI1lIllI.push(lli1i11i || il11iiii);
        iI1lIllI.push(ii11Ii11 || i1lIiill);
        iI1lIllI.push(lI11Ii1i || iII11li1);
        iII11li1 = iI1lIllI[3];
        iIIi1I = !0;
      } else {
        var l111lil,
          I11il1I1 = this.lr.refUrl && this.lr.refUrl.split("/")[2],
          lI1il1II = false;
        if (I11il1I1 && I11il1I1.indexOf(this.lr.ckDomain) < 0) {
          for (l111lil = this.lr.seo, i1IlI1I1 = 0; i1IlI1I1 < l111lil.length; i1IlI1I1++) {
            var l111li1l = l111lil[i1IlI1I1].split(":");
            if (I11il1I1.indexOf(l111li1l[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((l111li1l[1] + "=").toLowerCase()) > -1) {
              var i1Ii11ll = this.getParameter(l111li1l[1], this.lr.refUrl);
              /[^\x00-\xff]/.test(i1Ii11ll) && (i1Ii11ll = encodeURIComponent(i1Ii11ll));
              iI1lIllI.push(l111li1l[0]);
              iI1lIllI.push("-");
              iI1lIllI.push("organic");
              iI1lIllI.push(i1Ii11ll || "not set");
              iII11li1 = iI1lIllI[3];
              lI1il1II = !0;
              break;
            }
          }
          lI1il1II || (I11il1I1.indexOf("zol.com.cn") > -1 ? (iI1lIllI.push("zol.com.cn"), iI1lIllI.push("-"), iI1lIllI.push("cpc"), iI1lIllI.push("not set")) : (iI1lIllI.push(I11il1I1), iI1lIllI.push("-"), iI1lIllI.push("referral"), iI1lIllI.push("-")));
        }
      }
      ii1lii = iI1lIllI.length > 0 && (iI1lIllI[0] !== I1Ilil11 || iI1lIllI[1] !== il11iiii || iI1lIllI[2] !== i1lIiill) && "referral" !== iI1lIllI[2];
      iliii1iI || !iliii1iI && ii1lii ? (I1Ilil11 = iI1lIllI[0] || I1Ilil11, il11iiii = iI1lIllI[1] || il11iiii, i1lIiill = iI1lIllI[2] || i1lIiill, iII11li1 = iI1lIllI[3] || iII11li1, l1I1illi.length > 5 ? (IIlIllI = parseInt(l1I1illi[2], 10), l1li1iII = parseInt(l1I1illi[4], 10), IIllI1Ii = parseInt((new Date().getTime() - this.ltr) / 1000), l1IIiiiI++, lliiii1l = 1) : (l1IIiiiI = 1, lliiii1l = 1)) : lliiii1l++;
      var lil1II = this.getPageParamFromSdk();
      if (lil1II && lil1II.vts) {
        var lliIi1il = 1 * lil1II.vts,
          i1i1li11 = 1 * lil1II.seq;
        (lliIi1il > l1IIiiiI || lliIi1il === l1IIiiiI && i1i1li11 >= lliiii1l) && (l1IIiiiI = lliIi1il, lliiii1l = i1i1li11 + 1);
      }
      if (iIiIlIlI || (iIiIlIlI = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [iIiIlIlI, Ili11ll1, IIlIllI, l1li1iII, IIllI1Ii, l1IIiiiI || 1].join("."), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [iIiIlIlI, lliiii1l, Ili11ll1 + "|" + l1IIiiiI, IIllI1Ii].join("."), this.lr.ckDomain, this.lr.ckJdbExp), iIIi1I || ii1lii || l1iI1i1l.length < 5) {
        var Ili111 = [iIiIlIlI, I1Ilil11 || "direct", il11iiii || "-", i1lIiill || "none", iII11li1 || "-", new Date().getTime() - this.ltr].join("|");
        this.setJdv(Ili111 = encodeURIComponent(Ili111), iIiIlIlI);
      }
      this.setCookie(this.lr.ckJdc, iIiIlIlI, this.lr.ckDomain);
    }
    ["q"]() {
      this.lr.rpDomain = this.lr.rpDomain || "uranus.jd.com";
      this.lr.logUrl = "//" + this.lr.rpDomain + "/log/m";
      this.lr.logType = {
        "pv": "1",
        "pf": "2",
        "cl": "3",
        "od": "4",
        "pd": "5",
        "hm": "6",
        "magic": "000001"
      };
      this.lr.useTmpCookie ? (this.lr.ckJda = "__tra", this.lr.ckJdb = "__trb", this.lr.ckJdc = "__trc", this.lr.ckJdu = "__tru") : (this.lr.ckJda = "__jda", this.lr.ckJdb = "__jdb", this.lr.ckJdc = "__jdc", this.lr.ckJdu = "__jdu");
      this.lr.ckJdv = "__jdv";
      this.lr.ckWxAppCk = "__jdwxapp";
      this.lr.ckRefCls = "__jd_ref_cls";
      this.lr.ckJdaExp = 15552000000;
      this.lr.ckJdbExp = 1800000;
      this.lr.ckJduExp = 15552000000;
      this.lr.ckJdvExp = 1296000000;
      this.lr.ckJdvEmbeddedExp = 86400000;
      this.lr.ckWxAppCkExp = 15552000000;
      this.lr.mtSubsiteExp = 31536000000;
      this.lr.ckDomain = (this.document.domain.match(/[^.]+\.(com.cn|net.cn|org.cn|gov.cn|edu.cn)$/) || [""])[0] || this.document.domain.replace(/.*?([^.]+\.[^.]+)$/, "$1");
      this.lr.title = this.document.title;
      this.lr.refUrl = this.document.referrer;
      this.lr.seo = ["i.easou.com:q", "m.baidu.com:word", "m.sm.cn:q", "m.so.com:q", "wap.sogou.com:keyword", "m.sogou.com:keyword", "wap.sogo.com:keyword", "m.sogo.com:keyword", "page.roboo.com:q", "ask.com:q", "baidu:word", "baidu:wd", "bing:q", "easou:q", "google:q", "roboo:word", "roboo:q", "sm.cn:q", "so.com:q", "sogou:keyword", "sogou:query", "sogo.com:keyword", "sogo.com:query", "yahoo:p", "yandex:text", "yicha:key"];
    }
    ["setCookie"](l1Iil1, IlI11l, iI11i1Ii, llIIl1ll) {
      if (l1Iil1) {
        var IIlillII = "";
        if (llIIl1ll) {
          var Il1111ii = new Date();
          Il1111ii.setTime(Il1111ii.getTime() - this.ltr + llIIl1ll);
          IIlillII = ";expires=" + Il1111ii.toGMTString();
        }
        this.UVCookie += l1Iil1 + "=" + IlI11l + "; ";
      }
    }
    ["setJdv"](llIlI1II, iiliIil1, l1IiIlli) {
      var Ii1l1Ili = "";
      Ii1l1Ili = this.isPrey(10) && (!llIlI1II || llIlI1II.length > 400) ? iiliIil1 + "|direct|-|none|-|" + (new Date().getTime() - this.ltr) : llIlI1II;
      var iIlllili = l1IiIlli || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
      this.setCookie(this.lr.ckJdv || "__jdv", Ii1l1Ili, this.lr.ckDomain, iIlllili);
    }
    ["getCookie"](Il11i1i1, lIIilIIl) {
      var I11iiiIi = this.document.cookie.match(new RegExp("(^| )" + Il11i1i1 + "=([^;]*)(;|$)"));
      return null !== I11iiiIi ? lIIilIIl ? I11iiiIi[2] : this.urlDecode(I11iiiIi[2]) : "";
    }
    ["genUuid"]() {
      return new Date().getTime() - this.ltr + "" + parseInt(2147483647 * Math.random());
    }
    ["getParameter"](l11l1lIl, ilI11i1I) {
      var iIl1lili = ilI11i1I || this.document.location.href,
        iIliIii = new RegExp("(?:^|&|[?]|[/])" + l11l1lIl + "=([^&]*)").exec(iIl1lili);
      return iIliIii ? this.urlDecode(iIliIii[1]) : null;
    }
    ["urlDecode"](I1i1llll) {
      try {
        return decodeURIComponent(I1i1llll);
      } catch (l1iIll1I) {
        return I1i1llll;
      }
    }
    ["genHash"](I1iiII1I) {
      var IIilliii,
        I1llIi1 = 1,
        Il1I11iI = 0;
      if (I1iiII1I) for (I1llIi1 = 0, IIilliii = I1iiII1I.length - 1; IIilliii >= 0; IIilliii--) {
        I1llIi1 = 0 !== (Il1I11iI = 266338304 & (I1llIi1 = (I1llIi1 << 6 & 268435455) + (Il1I11iI = I1iiII1I.charCodeAt(IIilliii)) + (Il1I11iI << 14))) ? I1llIi1 ^ Il1I11iI >> 21 : I1llIi1;
      }
      return I1llIi1;
    }
    ["isPrey"](i1Il1l) {
      if (i1Il1l >= 100) return !0;
      var i1illIIi = this.lr.uuid,
        i1iIlI11 = i1illIIi.substr(i1illIIi.length - 2);
      return !!i1iIlI11 && 1 * i1iIlI11 < i1Il1l;
    }
    ["isEmbedded"]() {
      var IlIii1I1 = this.navigator.userAgent || "";
      return /^(jdapp|jdltapp|jdpingou);/.test(IlIii1I1) || this.isJdLog();
    }
    ["isJdLog"]() {
      return (this.navigator.userAgent || "").indexOf(";jdlog;") > -1;
    }
    ["getPageParamFromSdk"]() {
      var iiiii11l, IIillI;
      try {
        this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? IIillI = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? IIillI = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (IIillI = this.window.prompt("JDMAGetMPageParam", ""));
        IIillI && (iiiii11l = JSON.parse(IIillI));
      } catch (iIIiiil) {}
      return iiiii11l;
    }
    ["time"](ii1I1ll1, ll1ll1l1 = null) {
      const lI1lIiIi = ll1ll1l1 ? new Date(ll1ll1l1) : new Date();
      let iIii111 = {
        "M+": lI1lIiIi.getMonth() + 1,
        "d+": lI1lIiIi.getDate(),
        "H+": lI1lIiIi.getHours(),
        "m+": lI1lIiIi.getMinutes(),
        "s+": lI1lIiIi.getSeconds(),
        "q+": Math.floor((lI1lIiIi.getMonth() + 3) / 3),
        "S": lI1lIiIi.getMilliseconds()
      };
      /(y+)/.test(ii1I1ll1) && (ii1I1ll1 = ii1I1ll1.replace(RegExp.$1, (lI1lIiIi.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let l1lli1iI in iIii111) new RegExp("(" + l1lli1iI + ")").test(ii1I1ll1) && (ii1I1ll1 = ii1I1ll1.replace(RegExp.$1, 1 == RegExp.$1.length ? iIii111[l1lli1iI] : ("00" + iIii111[l1lli1iI]).substr(("" + iIii111[l1lli1iI]).length)));
      return ii1I1ll1;
    }
  }
  lIlIl1l = new IIlliiII();
}
function l111i11l(l1IIlilI) {
  l1IIlilI = l1IIlilI || 32;
  let i1II1ili = "abcdef0123456789",
    l1liI1ll = i1II1ili.length,
    iIiiilIl = "";
  for (i = 0; i < l1IIlilI; i++) iIiiilIl += i1II1ili.charAt(Math.floor(Math.random() * l1liI1ll));
  return iIiiilIl;
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date(new Date().getTime()+new Date().getTimezoneOffset()*60*1000+8*60*60*1000);let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
