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

0 0,10,20 * * * jd_230618_Red.js 618红包助力
*/

let rebateCodes = ''; // 返利变量
let redTimes = 15000 // 等待时间单位毫秒
let redCount = 0 // 领取次数
let shareHelpCount = 0 // 助力次数 0=默认 1=1次满 2=2次满


const $ = new Env('618red');

const lIll1IiI = $.isNode() ? require("./jdCookie.js") : "";
$.CryptoJS = require("crypto-js");
let iiliilii = [],
  iiil1111 = "";
if ($.isNode()) {
  Object.keys(lIll1IiI).forEach(iIIlilll => {
    iiliilii.push(lIll1IiI[iIIlilll]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iiliilii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1IiIiIi($.getdata("CookiesJD") || "[]").map(IillI1lI => IillI1lI.cookie)].filter(l11ilill => !!l11ilill);
let illIi1ii = "";
if (!rebateCodes) rebateCodes = "https://u.jd.com/Oqk1iQg";
if (!illIi1ii) illIi1ii = "";
rebateCodes = $.isNode() ? process.env.JD_230618_RedRebateCode ? process.env.JD_230618_RedRebateCode : "" + rebateCodes : $.getdata("JD_230618_RedRebateCode") ? $.getdata("JD_230618_RedRebateCode") : "" + rebateCodes;
illIi1ii = $.isNode() ? process.env.JD_230618_rebatePin ? process.env.JD_230618_rebatePin : "" + illIi1ii : $.getdata("JD_230618_rebatePin") ? $.getdata("JD_230618_rebatePin") : "" + illIi1ii;
redCount = $.isNode() ? process.env.JD_230618_RedCount ? process.env.JD_230618_RedCount : "" + redCount : $.getdata("JD_230618_RedCount") ? $.getdata("JD_230618_RedCount") : "" + redCount;
redTimes = $.isNode() ? process.env.JD_230618_RedTimes ? process.env.JD_230618_RedTimes : "" + redTimes : $.getdata("JD_230618_RedTimes") ? $.getdata("JD_230618_RedTimes") : "" + redTimes;
$.shareCount = $.isNode() ? process.env.JD_230618_shareHelpCount ? process.env.JD_230618_shareHelpCount : "" + shareHelpCount : $.getdata("JD_230618_shareHelpCount") ? $.getdata("JD_230618_shareHelpCount") : "" + shareHelpCount;
$.shareCount = parseInt($.shareCount, 10) || 0;
let IiiilII1 = illIi1ii && illIi1ii.split(",") || [],
  llliI1iI = rebateCodes + "";
$.time("yyyy-MM-dd HH:mm:ss");
message = "";
let IiliI1I1 = "";
resMsg = "";
$.uiUpdateTime = "";
$.endFlag = false;
$.runEnd = false;
let IIIl11i1 = {};
$.getH5st_WQ_Arr = {};
$.runArr = {};
let IilllI11 = "";
const i11lIlil = "2023/06/19 00:00:00+08:00";
let liiIilII = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
$.UVCookieArr = {};
lr = {};
$.UVCookie = "";
let lliili = "",
  I1II1lI = 2;
redTimes = Number(redTimes);
$.time("yyyy-MM-dd");
il1I1lil();
!(async () => {
  if (/https:\/\/u\.jd\.com\/.+/.test(llliI1iI)) {
    if (llliI1iI.split("/").pop()) llliI1iI = llliI1iI.split("/").pop().split("?").shift();else {
      console.log("请填写正确的rebateCode");
      return;
    }
  }
  if (!iiliilii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (liiIilII > new Date(i11lIlil).getTime()) {
    $.msg($.name, "活动已结束", "请删除此脚本");
    $.setdata("", "JD_230618_Red");
    $.setdata("", "JD_230618_Red_pin");
    return;
  }
  console.log("当前版本：2023年05月31日 V4");
  console.log("返利码：" + llliI1iI.replace(/.+(.{3})/, "***$1") + "\n");
  $.shareCodeArr = {};
  $.shareCodePinArr = $.getdata("JD_230618_Red_pin") || {};
  $.shareCode = "";
  $.again = false;
  if ($.end) return;
  for (let IlllIliI = 0; IlllIliI < iiliilii.length && !$.runEnd; IlllIliI++) {
    if ($.endFlag) break;
    iiil1111 = iiliilii[IlllIliI];
    if (iiil1111) {
      $.UserName = decodeURIComponent(iiil1111.match(/pt_pin=([^; ]+)(?=;?)/) && iiil1111.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IlllIliI + 1;
      if ($.runArr[$.UserName]) continue;
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let I1IIl1il = 1;
      I1II1lI = 4;
      !iiil1111.includes("app_open") && (I1IIl1il = 2, I1II1lI = 2);
      $.eid_token = "";
      await lIIii11(I1IIl1il);
      await I1l1ii1i();
      await lIiilIi();
      if ($.endFlag) break;
    }
    $.setdata($.shareCodePinArr, "JD_230618_Red_pin");
  }
  $.setdata($.shareCodePinArr, "JD_230618_Red_pin");
  if (message) {
    $.msg($.name, "", message + "\nhttps://u.jd.com/" + llliI1iI + "\n\n跳转到app 可查看助力情况");
    if ($.isNode()) {}
  }
})().catch(IiIil1II => $.logErr(IiIil1II)).finally(() => {
  $.done();
});
async function lIiilIi(ilI1iIII = 0) {
  try {
    ilI1iIII == 0 && (i1Iil1Ii("6a98d", $.UA), await IilllI11.__genAlgo());
    $.UVCookie = $.UVCookieArr[$.UserName] || "";
    !$.UVCookie && il1I1lil();
    resMsg = "";
    let III1lii1 = false,
      lli1l1l1 = 0,
      II1ll1I = 0,
      llll1liI = 0;
    $.shareFlag = true;
    do {
      if (II1ll1I > 2) lli1l1l1 = 0;
      $.flag = 0;
      IiliI1I1 = "";
      $.url1 = "";
      await iillI1li();
      if (!$.url1) {
        console.log("获取url1失败");
        $.end = true;
        break;
      }
      $.url2 = "";
      $.UVCookie = lliili.getUVCookie("", "", $.url1, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      await iiiii1li();
      if (!$.url2) {
        console.log("获取不到红包页面");
        break;
      }
      if (!/unionActId=\d+/.test($.url2) && !new RegExp("&d=" + llliI1iI).test($.url2)) {
        console.log("改返利url：https://u.jd.com/" + llliI1iI + " 可能不是红包页面");
        $.runEnd = true;
        return;
      }
      if (!$.url2) $.url2 = "https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html?unionActId=31162&d=" + llliI1iI + "&cu=true&utm_source=kong&utm_medium=jingfen";
      $.actId = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/mall\/active\/([^/]+)\/index\.html/)[1] || "2KxaKmeh5hQkkGY6PGF6etgSFUp4";
      $.UVCookie = lliili.getUVCookie("", "", $.url2, $.UVCookie);
      $.origin = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/)[1] || "https://pro.m.jd.com";
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      $.eid = "";
      !$.eid && ($.eid = -1);
      if (ilI1iIII == 0) {
        let iiII1Il1 = 0,
          iIIiIIi = true,
          IiI1iII = 0;
        if (Object.getOwnPropertyNames(IIIl11i1).length > lli1l1l1 && $.shareFlag) for (let iIllIlli in IIIl11i1 || {}) {
          if (iIllIlli == $.UserName) {
            $.flag = 1;
            continue;
          }
          if (iiII1Il1 == lli1l1l1) {
            $.flag = 0;
            $.shareCode = IIIl11i1[iIllIlli] || "";
            if ($.shareCodePinArr[iIllIlli] && $.shareCodePinArr[iIllIlli].includes($.UserName)) {
              IiI1iII++;
              continue;
            }
            if ($.shareCode.count >= $.shareCodeArr.shareCount) {
              IiI1iII++;
              continue;
            }
            $.getlj = false;
            if ($.shareCode) console.log("助力[" + iIllIlli + "]");
            let llii11l1 = await iIIii1($.shareCode.code, 1);
            if (/重复助力/.test(llii11l1)) {
              if (!$.shareCodePinArr[iIllIlli]) $.shareCodePinArr[iIllIlli] = [];
              $.shareCodePinArr[iIllIlli].push($.UserName);
              lli1l1l1--;
              llll1liI--;
            } else {
              if (/助力/.test(llii11l1) && /上限/.test(llii11l1)) $.shareFlag = false;else {
                if (!/领取上限/.test(llii11l1) && $.getlj == true) {
                  if (!$.shareCodePinArr[iIllIlli]) $.shareCodePinArr[iIllIlli] = [];
                  !$.shareCodePinArr[iIllIlli].includes($.UserName) && $.shareCodePinArr[iIllIlli].push($.UserName);
                  lli1l1l1--;
                } else iIIiIIi = false;
              }
            }
          }
          iiII1Il1++;
        }
        iIIiIIi && IiI1iII == Object.getOwnPropertyNames(IIIl11i1).length && (III1lii1 = true);
        if (iiII1Il1 == 0) {
          $.getlj = false;
          let Ili1illI = await iIIii1("", 1);
          !/领取上限/.test(Ili1illI) && $.getlj == true && lli1l1l1--;
        }
        if ($.endFlag) break;
      } else {
        let IIl1llli = await IIIIiilI();
        if (!$.endFlag && IIl1llli && $.again == false) await i1iii11I();
        if ($.again == false) break;
      }
      $.again == true && II1ll1I < 1 && (II1ll1I++, $.again = false);
      lli1l1l1++;
      llll1liI++;
      $.flag == 1 && (await $.wait(parseInt(Math.random() * 500 + 100, 10)));
      if (redCount > 0 && redCount <= llll1liI) break;
    } while ($.flag == 1 && lli1l1l1 < 4);
    if ($.endFlag) return;
    resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
    if (III1lii1) {}
    let II1Iii1 = parseInt(Math.random() * 1000 + redTimes, 10);
    console.log("等待 " + II1Iii1 / 1000 + " 秒");
    await $.wait(II1Iii1);
  } catch (ii1liIl1) {
    console.log(ii1liIl1);
  }
}
async function iiIllIl1(III1l1I = 0) {
  try {
    let liIl1il1 = 2;
    if (III1l1I == 1) liIl1il1 = 1;
    let liI1lli = 0;
    for (let l1i1i1Il in $.shareCodeArr || {}) {
      if (l1i1i1Il === "flag" || l1i1i1Il === "updateTime" || l1i1i1Il === "shareCount") continue;
      if ($.shareCodeArr[l1i1i1Il] && $.shareCodeArr.shareCount && $.shareCodeArr[l1i1i1Il].count < $.shareCodeArr.shareCount) liI1lli++;
    }
    for (let i1llIIiI = 0; i1llIIiI < iiliilii.length && !$.runEnd; i1llIIiI++) {
      iiil1111 = iiliilii[i1llIIiI];
      if (iiil1111) {
        $.UserName = decodeURIComponent(iiil1111.match(/pt_pin=([^; ]+)(?=;?)/) && iiil1111.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (IiiilII1.length > 0 && IiiilII1.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) continue;
        $.index = i1llIIiI + 1;
        $.eid_token = "";
        await lIIii11();
        await I1l1ii1i();
        await lIiilIi(1);
        let ili1Il1l = 0;
        for (let Ii1i1l1I in $.shareCodeArr || {}) {
          if (Ii1i1l1I === "flag" || Ii1i1l1I === "updateTime" || Ii1i1l1I === "shareCount") continue;
          if ($.shareCodeArr[Ii1i1l1I] && $.shareCodeArr.shareCount && $.shareCodeArr[Ii1i1l1I].count < $.shareCodeArr.shareCount) ili1Il1l++;
        }
        if ($.endFlag || ili1Il1l - liI1lli >= liIl1il1 || $.end) break;
      }
    }
  } catch (IIiIIII1) {
    console.log(IIiIIII1);
  }
  if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) for (let l1iliIii in $.shareCodeArr || {}) {
    if (l1iliIii === "flag" || l1iliIii === "updateTime" || l1iliIii === "shareCount") continue;
    if ($.shareCodeArr[l1iliIii]) IIIl11i1[l1iliIii] = $.shareCodeArr[l1iliIii];
  }
}
function iIIii1(Ii1Ii1lI = "", i1iIIii = 1) {
  return new Promise(async lIiiI => {
    $.UVCookie = lliili.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let iilI1liI = "",
      iliI1i1i = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
    const illI11i = {
        "platform": I1II1lI,
        "unionActId": "31162",
        "actId": $.actId,
        "d": llliI1iI,
        "unionShareId": Ii1Ii1lI,
        "type": i1iIIii
      },
      I1liI1ii = {
        "appid": "u",
        "body": JSON.stringify(illI11i),
        "client": "apple",
        "clientVersion": $.UA.split(";")[2] || "1.1.0",
        "functionId": "getCoupons"
      };
    let lIi1lI1l = IilllI11.__genH5st(I1liI1ii, $.UserName);
    iilI1liI = lIi1lI1l.h5st || "";
    let Il1iliIi = "",
      Iiil111i = {
        "url": "https://api.m.jd.com/api",
        "body": "functionId=getCoupons&appid=" + I1liI1ii.appid + "&_=" + iliI1i1i + "&loginType=2&body=" + $.toStr(illI11i) + "&client=" + I1liI1ii.client + "&clientVersion=" + I1liI1ii.clientVersion + "&h5st=" + iilI1liI + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
        "headers": {
          "accept": "*/*",
          "Accept-Language": "zh-cn",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          "Cookie": "" + $.UVCookie + IiliI1I1 + " " + iiil1111,
          "origin": $.origin,
          "Referer": $.origin + "/",
          "User-Agent": $.UA
        }
      };
    Iiil111i.headers.Cookie = Iiil111i.headers.Cookie.replace(/;\s*$/, "");
    Iiil111i.headers.Cookie = Iiil111i.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) Iiil111i.headers.Referer = $.url2;
    $.post(Iiil111i, async (IilIilii, lllli1Il, lll1llI) => {
      try {
        if (IilIilii) {
          console.log("" + $.toStr(IilIilii));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let il1lIii = $.toObj(lll1llI, lll1llI);
          if (typeof il1lIii == "object") {
            il1lIii.msg && (Il1iliIi = il1lIii.msg, console.log(il1lIii.msg));
            if (il1lIii.msg.indexOf("不展示弹层") > -1 && i1iIIii == 1) $.again = true;
            if (il1lIii.msg.indexOf("领取上限") === -1 && il1lIii.msg.indexOf("登录") === -1) {
              if (i1iIIii == 1) $.flag = 1;
            }
            if (il1lIii.msg.indexOf("活动已结束") > -1 || il1lIii.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            Ii1Ii1lI && typeof il1lIii.data !== "undefined" && typeof il1lIii.data.joinNum !== "undefined" && console.log("当前" + il1lIii.data.joinSuffix + ":" + il1lIii.data.joinNum);
            if (il1lIii.code == 0 && il1lIii.data) {
              if (i1iIIii == 1) $.shareCode.count++;
              let iii1i1l1 = "";
              for (let iliI1111 of il1lIii.data.couponList) {
                if (iliI1111.type == 1) {
                  $.getlj = true;
                  iii1i1l1 += (iii1i1l1 ? "\n" : "") + "获得[红包]🧧" + iliI1111.discount + "元 使用时间:" + $.time("yyyy-MM-dd", iliI1111.beginTime) + " " + $.time("yyyy-MM-dd", iliI1111.endTime);
                } else {
                  if (iliI1111.type == 3) {
                    $.getlj = true;
                    iii1i1l1 += (iii1i1l1 ? "\n" : "") + "获得[优惠券]🎟️满" + iliI1111.quota + "减" + iliI1111.discount + " 使用时间:" + $.time("yyyy-MM-dd", iliI1111.beginTime) + " " + $.time("yyyy-MM-dd", iliI1111.endTime);
                  } else iliI1111.type == 6 ? ($.getlj = true, iii1i1l1 += (iii1i1l1 ? "\n" : "") + "获得[打折券]]🎫满" + iliI1111.quota + "打" + iliI1111.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", iliI1111.beginTime) + " " + $.time("yyyy-MM-dd", iliI1111.endTime)) : ($.getlj = true, iii1i1l1 += (iii1i1l1 ? "\n" : "") + "获得[未知]🎉" + (iliI1111.quota || "") + " " + iliI1111.discount + " 使用时间:" + $.time("yyyy-MM-dd", iliI1111.beginTime) + " " + $.time("yyyy-MM-dd", iliI1111.endTime), console.log(iliI1111));
                }
              }
              iii1i1l1 && (resMsg += iii1i1l1 + "\n", console.log(iii1i1l1));
            }
            if (i1iIIii == 1 && typeof il1lIii.data !== "undefined" && typeof il1lIii.data.groupData !== "undefined" && typeof il1lIii.data.groupData.groupInfo !== "undefined") for (let iiII1lIi of il1lIii.data.groupData.groupInfo || []) {
              iiII1lIi.status == 2 && (console.log("助力满可以领取" + iiII1lIi.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await iIIii1("", 2));
            }
          } else console.log(lll1llI);
        }
      } catch (iIllIil) {
        $.logErr(iIllIil, lllli1Il);
      } finally {
        lIiiI(Il1iliIi);
      }
    });
  });
}
function IIIIiilI(iii11II1 = "") {
  let I1IIil1l = true;
  return new Promise(lil11Ill => {
    $.UVCookie = lliili.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let iiIii11I = {
      "url": "https://api.m.jd.com/api?functionId=showCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22actId%22:%22" + $.actId + "%22,%22unionActId%22:%2231162%22,%22unpl%22:%22" + $.unpl + "%22,%22platform%22:" + I1II1lI + ",%22unionShareId%22:%22%22," + ($.uiUpdateTime ? "%22uiUpdateTime%22:" + $.uiUpdateTime + "," : "") + "%22d%22:%22" + llliI1iI + "%22,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + IiliI1I1 + " " + iiil1111,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      }
    };
    iiIii11I.headers.Cookie = iiIii11I.headers.Cookie.replace(/;\s*$/, "");
    iiIii11I.headers.Cookie = iiIii11I.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) iiIii11I.headers.Referer = $.url2;
    $.get(iiIii11I, async (lili1IIl, liI1iiI1, iIII11l1) => {
      try {
        if (lili1IIl) {
          console.log("" + $.toStr(lili1IIl));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let Il11ii11 = $.toObj(iIII11l1, iIII11l1);
          if (typeof Il11ii11 == "object") {
            if (Il11ii11.msg) console.log(Il11ii11.msg);
            if (Il11ii11.msg.indexOf("不展示弹层") > -1) $.again = true;
            if (Il11ii11.msg.indexOf("领取上限") > -1) $.runArr[$.UserName] = true;
            Il11ii11.msg.indexOf("上限") === -1 && Il11ii11.msg.indexOf("登录") === -1 && ($.flag = 1);
            if (Il11ii11.msg.indexOf("活动已结束") > -1 || Il11ii11.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            if (Il11ii11.data.uiUpdateTime) $.uiUpdateTime = Il11ii11.data.uiUpdateTime;
            if (typeof Il11ii11.data !== "undefined" && typeof Il11ii11.data.groupData !== "undefined" && typeof Il11ii11.data.groupData.joinNum !== "undefined") {
              $.joinNum = Il11ii11.data.groupData.joinNum;
              let I1lll1l1 = 0;
              for (let I1i1I111 of Il11ii11.data.groupData.groupInfo) {
                if (I1lll1l1 < I1i1I111.num) I1lll1l1 = I1i1I111.num;
              }
              if ($.shareCount > 0 && I1lll1l1 > $.shareCount) I1lll1l1 = $.shareCount;
              $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = I1lll1l1);
              $.shareCodeArr.shareCount = I1lll1l1;
              if (I1lll1l1 <= $.joinNum) {
                if (!$.shareCodeArr[$.UserName]) $.shareCodeArr[$.UserName] = {};
                $.shareCodeArr[$.UserName].count = $.joinNum;
                I1IIil1l = false;
              }
              console.log("【账号" + $.index + "】" + ($.nickName || $.UserName) + " " + $.joinNum + "/" + I1lll1l1 + "人");
            }
            Il11ii11.msg.indexOf("活动已结束") > -1 && (I1IIil1l = false);
            if (typeof Il11ii11.data !== "undefined" && typeof Il11ii11.data.groupData !== "undefined" && typeof Il11ii11.data.groupData.groupInfo !== "undefined") for (let Ii1iI1ll of Il11ii11.data.groupData.groupInfo || []) {
              Ii1iI1ll.status == 2 && (console.log("助力满可以领取" + Ii1iI1ll.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await iIIii1("", 2));
            }
          } else console.log(iIII11l1);
        }
      } catch (I1IllI) {
        $.logErr(I1IllI, liI1iiI1);
      } finally {
        lil11Ill(I1IIil1l);
      }
    });
  });
}
function i1iii11I() {
  if ($.shareCodeArr[$.UserName]) {
    console.log("【账号" + $.index + "】缓存分享码:" + $.shareCodeArr[$.UserName].code.replace(/.+(.{3})/, "***$1"));
    return;
  }
  return new Promise(iiIIl11I => {
    let I11IlI1l = {
      "url": "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22unionActId%22:%2231162%22,%22actId%22:%22" + $.actId + "%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22" + llliI1iI + "%22,%22supportPic%22:2,%22supportLuckyCode%22:0,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + IiliI1I1 + " " + iiil1111,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      }
    };
    I11IlI1l.headers.Cookie = I11IlI1l.headers.Cookie.replace(/;\s*$/, "");
    I11IlI1l.headers.Cookie = I11IlI1l.headers.Cookie.replace(/;([^\s])/g, "; $1");
    $.get(I11IlI1l, async (iIi1l1i, i1lIlI, iIi1illI) => {
      try {
        if (iIi1l1i) {
          console.log("" + $.toStr(iIi1l1i));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let ll11IIII = $.toObj(iIi1illI, iIi1illI);
          if (typeof ll11IIII == "object") {
            if (ll11IIII.code == 0 && ll11IIII.data && ll11IIII.data.shareUrl) {
              let iIl1lI1 = ll11IIII.data.shareUrl.match(/\?s=([^&]+)/) && ll11IIII.data.shareUrl.match(/\?s=([^&]+)/)[1] || "";
              iIl1lI1 && (console.log("【账号" + $.index + "】分享码：" + iIl1lI1.replace(/.+(.{3})/, "***$1")), $.shareCodeArr[$.UserName] = {
                "code": iIl1lI1,
                "count": $.joinNum
              });
            }
          } else console.log(iIi1illI);
        }
      } catch (I1I11l1i) {
        $.logErr(I1I11l1i, i1lIlI);
      } finally {
        iiIIl11I();
      }
    });
  });
}
function iiiii1li() {
  return new Promise(l1l1 => {
    const i11liI1 = {
      "url": $.url1,
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + IiliI1I1 + " " + iiil1111,
        "User-Agent": $.UA
      }
    };
    $.get(i11liI1, async (IiI1l11l, lI1l1lI, ii1Il11) => {
      try {
        Il1i1i1i(lI1l1lI);
        $.url2 = lI1l1lI && lI1l1lI.headers && (lI1l1lI.headers.location || lI1l1lI.headers.Location || "") || "";
        $.url2 = decodeURIComponent($.url2);
        $.url2 = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || "";
      } catch (iii1IiI) {
        $.logErr(iii1IiI, lI1l1lI);
      } finally {
        l1l1(ii1Il11);
      }
    });
  });
}
function iillI1li() {
  return new Promise(I1i11ili => {
    const il1IIili = {
      "url": "https://u.jd.com/" + llliI1iI + ($.shareCode && "?s=" + $.shareCode || ""),
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + IiliI1I1 + " " + iiil1111,
        "User-Agent": $.UA
      }
    };
    $.get(il1IIili, async (IliiII1i, Iii1i111, iiI1I1I) => {
      try {
        Il1i1i1i(Iii1i111);
        $.url1 = iiI1I1I && iiI1I1I.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && iiI1I1I.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || "";
      } catch (lIlIliIi) {
        $.logErr(lIlIliIi, Iii1i111);
      } finally {
        I1i11ili(iiI1I1I);
      }
    });
  });
}
function Il1i1i1i(IiIIilIl) {
  let Ii1IIlIi = IiIIilIl && IiIIilIl.headers && (IiIIilIl.headers["set-cookie"] || IiIIilIl.headers["Set-Cookie"] || "") || "",
    iI1lliiI = "";
  if (Ii1IIlIi) {
    if (typeof Ii1IIlIi != "object") iI1lliiI = Ii1IIlIi.split(",");else iI1lliiI = Ii1IIlIi;
    for (let i1i11Ill of iI1lliiI) {
      let I11Ii1I = i1i11Ill.split(";")[0].trim();
      if (I11Ii1I.split("=")[1]) {
        I11Ii1I.split("=")[0] == "unpl" && I11Ii1I.split("=")[1] && ($.unpl = I11Ii1I.split("=")[1]);
        if (IiliI1I1.indexOf(I11Ii1I.split("=")[1]) == -1) IiliI1I1 += I11Ii1I.replace(/ /g, "") + "; ";
      }
    }
  }
}
function lIIii11(Iiiii11 = 1) {
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
  Iiiii11 != 1 && ($.UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1");
}
function I1IiIiIi(llIlI1l1) {
  if (typeof llIlI1l1 == "string") try {
    return JSON.parse(llIlI1l1);
  } catch (Il1l1Iii) {
    return console.log(Il1l1Iii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function I1l1ii1i() {
  var Il11ili1 = function () {
    function lil111Ii(i111111l, i1IIi1I) {
      i111111l = [i111111l[0] >>> 16, 65535 & i111111l[0], i111111l[1] >>> 16, 65535 & i111111l[1]];
      i1IIi1I = [i1IIi1I[0] >>> 16, 65535 & i1IIi1I[0], i1IIi1I[1] >>> 16, 65535 & i1IIi1I[1]];
      var lII1i1l = [0, 0, 0, 0];
      return lII1i1l[3] += i111111l[3] + i1IIi1I[3], lII1i1l[2] += lII1i1l[3] >>> 16, lII1i1l[3] &= 65535, lII1i1l[2] += i111111l[2] + i1IIi1I[2], lII1i1l[1] += lII1i1l[2] >>> 16, lII1i1l[2] &= 65535, lII1i1l[1] += i111111l[1] + i1IIi1I[1], lII1i1l[0] += lII1i1l[1] >>> 16, lII1i1l[1] &= 65535, lII1i1l[0] += i111111l[0] + i1IIi1I[0], lII1i1l[0] &= 65535, [lII1i1l[0] << 16 | lII1i1l[1], lII1i1l[2] << 16 | lII1i1l[3]];
    }
    function IIi11i1l(l1111lI1, iII1Il1I) {
      l1111lI1 = [l1111lI1[0] >>> 16, 65535 & l1111lI1[0], l1111lI1[1] >>> 16, 65535 & l1111lI1[1]];
      iII1Il1I = [iII1Il1I[0] >>> 16, 65535 & iII1Il1I[0], iII1Il1I[1] >>> 16, 65535 & iII1Il1I[1]];
      var l1Iii = [0, 0, 0, 0];
      return l1Iii[3] += l1111lI1[3] * iII1Il1I[3], l1Iii[2] += l1Iii[3] >>> 16, l1Iii[3] &= 65535, l1Iii[2] += l1111lI1[2] * iII1Il1I[3], l1Iii[1] += l1Iii[2] >>> 16, l1Iii[2] &= 65535, l1Iii[2] += l1111lI1[3] * iII1Il1I[2], l1Iii[1] += l1Iii[2] >>> 16, l1Iii[2] &= 65535, l1Iii[1] += l1111lI1[1] * iII1Il1I[3], l1Iii[0] += l1Iii[1] >>> 16, l1Iii[1] &= 65535, l1Iii[1] += l1111lI1[2] * iII1Il1I[2], l1Iii[0] += l1Iii[1] >>> 16, l1Iii[1] &= 65535, l1Iii[1] += l1111lI1[3] * iII1Il1I[1], l1Iii[0] += l1Iii[1] >>> 16, l1Iii[1] &= 65535, l1Iii[0] += l1111lI1[0] * iII1Il1I[3] + l1111lI1[1] * iII1Il1I[2] + l1111lI1[2] * iII1Il1I[1] + l1111lI1[3] * iII1Il1I[0], l1Iii[0] &= 65535, [l1Iii[0] << 16 | l1Iii[1], l1Iii[2] << 16 | l1Iii[3]];
    }
    function IIllIiIi(liI1III, llI1I1I) {
      return 32 === (llI1I1I %= 64) ? [liI1III[1], liI1III[0]] : 32 > llI1I1I ? [liI1III[0] << llI1I1I | liI1III[1] >>> 32 - llI1I1I, liI1III[1] << llI1I1I | liI1III[0] >>> 32 - llI1I1I] : (llI1I1I -= 32, [liI1III[1] << llI1I1I | liI1III[0] >>> 32 - llI1I1I, liI1III[0] << llI1I1I | liI1III[1] >>> 32 - llI1I1I]);
    }
    function iI1liilI(Ii11il1l, illI1I1I) {
      return 0 === (illI1I1I %= 64) ? Ii11il1l : 32 > illI1I1I ? [Ii11il1l[0] << illI1I1I | Ii11il1l[1] >>> 32 - illI1I1I, Ii11il1l[1] << illI1I1I] : [Ii11il1l[1] << illI1I1I - 32, 0];
    }
    function i11IlIIi(iliIiii1, illiIIli) {
      return [iliIiii1[0] ^ illiIIli[0], iliIiii1[1] ^ illiIIli[1]];
    }
    function i1lIIl1l(liIiIIi) {
      return i11IlIIi(liIiIIi = IIi11i1l(liIiIIi = i11IlIIi(liIiIIi = IIi11i1l(liIiIIi = i11IlIIi(liIiIIi, [0, liIiIIi[0] >>> 1]), [4283543511, 3981806797]), [0, liIiIIi[0] >>> 1]), [3301882366, 444984403]), [0, liIiIIi[0] >>> 1]);
    }
    return {
      "hash128": function (IIlllIl, iIIlI1i) {
        var iiIll11 = iIIlI1i || 0;
        iIIlI1i = (IIlllIl = IIlllIl || "").length % 16;
        var i1iIII1I = IIlllIl.length - iIIlI1i,
          lll1lIl = [0, iiIll11];
        iiIll11 = [0, iiIll11];
        for (var iilIll1, iI1IIiII, lII1Ii = [2277735313, 289559509], i1llil11 = [1291169091, 658871167], I11l1111 = 0; I11l1111 < i1iIII1I; I11l1111 += 16) {
          iilIll1 = [255 & IIlllIl.charCodeAt(I11l1111 + 4) | (255 & IIlllIl.charCodeAt(I11l1111 + 5)) << 8 | (255 & IIlllIl.charCodeAt(I11l1111 + 6)) << 16 | (255 & IIlllIl.charCodeAt(I11l1111 + 7)) << 24, 255 & IIlllIl.charCodeAt(I11l1111) | (255 & IIlllIl.charCodeAt(I11l1111 + 1)) << 8 | (255 & IIlllIl.charCodeAt(I11l1111 + 2)) << 16 | (255 & IIlllIl.charCodeAt(I11l1111 + 3)) << 24];
          iI1IIiII = [255 & IIlllIl.charCodeAt(I11l1111 + 12) | (255 & IIlllIl.charCodeAt(I11l1111 + 13)) << 8 | (255 & IIlllIl.charCodeAt(I11l1111 + 14)) << 16 | (255 & IIlllIl.charCodeAt(I11l1111 + 15)) << 24, 255 & IIlllIl.charCodeAt(I11l1111 + 8) | (255 & IIlllIl.charCodeAt(I11l1111 + 9)) << 8 | (255 & IIlllIl.charCodeAt(I11l1111 + 10)) << 16 | (255 & IIlllIl.charCodeAt(I11l1111 + 11)) << 24];
          lll1lIl = lil111Ii(IIi11i1l(lll1lIl = lil111Ii(lll1lIl = IIllIiIi(lll1lIl = i11IlIIi(lll1lIl, iilIll1 = IIi11i1l(iilIll1 = IIllIiIi(iilIll1 = IIi11i1l(iilIll1, lII1Ii), 31), i1llil11)), 27), iiIll11), [0, 5]), [0, 1390208809]);
          iiIll11 = lil111Ii(IIi11i1l(iiIll11 = lil111Ii(iiIll11 = IIllIiIi(iiIll11 = i11IlIIi(iiIll11, iI1IIiII = IIi11i1l(iI1IIiII = IIllIiIi(iI1IIiII = IIi11i1l(iI1IIiII, i1llil11), 33), lII1Ii)), 31), lll1lIl), [0, 5]), [0, 944331445]);
        }
        switch (iilIll1 = [0, 0], iI1IIiII = [0, 0], iIIlI1i) {
          case 15:
            iI1IIiII = i11IlIIi(iI1IIiII, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 14)], 48));
          case 14:
            iI1IIiII = i11IlIIi(iI1IIiII, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 13)], 40));
          case 13:
            iI1IIiII = i11IlIIi(iI1IIiII, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 12)], 32));
          case 12:
            iI1IIiII = i11IlIIi(iI1IIiII, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 11)], 24));
          case 11:
            iI1IIiII = i11IlIIi(iI1IIiII, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 10)], 16));
          case 10:
            iI1IIiII = i11IlIIi(iI1IIiII, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 9)], 8));
          case 9:
            iiIll11 = i11IlIIi(iiIll11, iI1IIiII = IIi11i1l(iI1IIiII = IIllIiIi(iI1IIiII = IIi11i1l(iI1IIiII = i11IlIIi(iI1IIiII, [0, IIlllIl.charCodeAt(I11l1111 + 8)]), i1llil11), 33), lII1Ii));
          case 8:
            iilIll1 = i11IlIIi(iilIll1, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 7)], 56));
          case 7:
            iilIll1 = i11IlIIi(iilIll1, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 6)], 48));
          case 6:
            iilIll1 = i11IlIIi(iilIll1, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 5)], 40));
          case 5:
            iilIll1 = i11IlIIi(iilIll1, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 4)], 32));
          case 4:
            iilIll1 = i11IlIIi(iilIll1, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 3)], 24));
          case 3:
            iilIll1 = i11IlIIi(iilIll1, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 2)], 16));
          case 2:
            iilIll1 = i11IlIIi(iilIll1, iI1liilI([0, IIlllIl.charCodeAt(I11l1111 + 1)], 8));
          case 1:
            lll1lIl = i11IlIIi(lll1lIl, iilIll1 = IIi11i1l(iilIll1 = IIllIiIi(iilIll1 = IIi11i1l(iilIll1 = i11IlIIi(iilIll1, [0, IIlllIl.charCodeAt(I11l1111)]), lII1Ii), 31), i1llil11));
        }
        return lll1lIl = i11IlIIi(lll1lIl, [0, IIlllIl.length]), iiIll11 = lil111Ii(iiIll11 = i11IlIIi(iiIll11, [0, IIlllIl.length]), lll1lIl = lil111Ii(lll1lIl, iiIll11)), lll1lIl = i1lIIl1l(lll1lIl), iiIll11 = lil111Ii(iiIll11 = i1lIIl1l(iiIll11), lll1lIl = lil111Ii(lll1lIl, iiIll11)), ("00000000" + (lll1lIl[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (lll1lIl[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (iiIll11[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (iiIll11[1] >>> 0).toString(16)).slice(-8);
      }
    };
  }();
  function IIiI1IIl(I11IIIii) {
    I11IIIii = JSON.stringify(I11IIIii);
    I11IIIii = encodeURIComponent(I11IIIii);
    var i1illii1 = "",
      I11il1I1 = 0;
    do {
      var il1i11ll = I11IIIii.charCodeAt(I11il1I1++),
        ilII1l1i = I11IIIii.charCodeAt(I11il1I1++),
        lllIiill = I11IIIii.charCodeAt(I11il1I1++),
        i1lI1lIi = il1i11ll >> 2;
      il1i11ll = (3 & il1i11ll) << 4 | ilII1l1i >> 4;
      var lI1llIi1 = (15 & ilII1l1i) << 2 | lllIiill >> 6,
        l1i1I1 = 63 & lllIiill;
      isNaN(ilII1l1i) ? lI1llIi1 = l1i1I1 = 64 : isNaN(lllIiill) && (l1i1I1 = 64);
      i1illii1 = i1illii1 + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(i1lI1lIi) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(il1i11ll) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(lI1llIi1) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(l1i1I1);
    } while (I11il1I1 < I11IIIii.length);
    return i1illii1 + "/";
  }
  var i11Iiii1 = [$.UA.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "896x414", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null],
    ilIlilli = Il11ili1.hash128(i11Iiii1.join("~~~"), 31),
    iiii11i1 = {
      "pin": "",
      "oid": "",
      "bizId": "jd-babelh5",
      "fc": "",
      "mode": "strict",
      "p": "s",
      "fp": ilIlilli,
      "ctype": 1,
      "v": "3.1.1.0",
      "f": "3",
      "o": "prodev.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html",
      "qs": "",
      "jsTk": "",
      "qi": ""
    },
    ilI1I1l = IIiI1IIl(iiii11i1),
    iIilI = {},
    i11Iiii1 = new Date();
  iIilI.ts = {};
  iIilI.ts.deviceTime = i11Iiii1.getTime();
  iIilI.ca = {
    "tdHash": null
  };
  iIilI.m = {
    "compatMode": "CSS1Compat"
  };
  iIilI.fo = ["Arial Black", "Bauhaus 93", "Chalkduster", "GungSeo", "Hiragino Sans GB", "Impact", "Menlo", "Papyrus", "Rockwell"];
  iIilI.n = {
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
  iIilI.p = [];
  iIilI.w = {
    "devicePixelRatio": 1,
    "screenTop": 0,
    "screenLeft": 0
  };
  iIilI.s = {
    "availHeight": 896,
    "availWidth": 414,
    "colorDepth": 24,
    "height": 896,
    "width": 414,
    "pixelDepth": 24
  };
  iIilI.sc = {
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
  iIilI.ss = {
    "cookie": !0,
    "localStorage": !0,
    "sessionStorage": !0,
    "globalStorage": !1,
    "indexedDB": !0
  };
  iIilI.tz = -480;
  iIilI.lil = "";
  iIilI.wil = "";
  iIilI.ts.deviceEndTime = new Date().getTime();
  var l1iiIiII = IIiI1IIl(iIilI);
  const I111IiII = {
    "url": "https://gia.jd.com/jsTk.do?a=" + ilI1I1l,
    "body": "d=" + l1iiIiII,
    "headers": {
      "Accept": "*/*",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Origin": "https://pro.m.jd.com",
      "Referer": "https://pro.m.jd.com/",
      "User-Agent": $.UA
    }
  };
  return new Promise(ll1iiI1i => {
    $.post(I111IiII, async (IliI1lIl, lliIli1i, i1lili11) => {
      try {
        if (IliI1lIl) console.log(IliI1lIl);else {
          let llI1iiIi = $.toObj(i1lili11, i1lili11);
          llI1iiIi && typeof llI1iiIi === "object" && llI1iiIi.code == 0 && llI1iiIi.data && llI1iiIi.data.token ? $.eid_token = llI1iiIi.data.token : console.log(i1lili11);
        }
      } catch (lillliIi) {
        $.logErr(lillliIi, lliIli1i);
      } finally {
        ll1iiI1i();
      }
    });
  });
}
function i1Iil1Ii(i1iI1il, il11, I1llIl1i = "") {
  class il11iiil {
    constructor(lIlil1 = "", Ili1i1i1 = "", lliIil1I = "") {
      this.appId = lIlil1;
      this.v = "3.1";
      Ili1i1i1 ? this.ua = Ili1i1i1 : this.ua = this.__genUA();
      this.fp = lliIil1I ? lliIil1I : this.__genFp();
    }
    ["__format"](iiiilll1, iII11ll) {
      if (!iiiilll1) iiiilll1 = "yyyy-MM-dd";
      var IiiIlilI;
      !iII11ll ? IiiIlilI = Date.now() : IiiIlilI = new Date(iII11ll);
      var li1IliIi = new Date(IiiIlilI),
        i11II1l1 = iiiilll1,
        I1liI1Il = {
          "M+": li1IliIi.getMonth() + 1,
          "d+": li1IliIi.getDate(),
          "D+": li1IliIi.getDate(),
          "h+": li1IliIi.getHours(),
          "H+": li1IliIi.getHours(),
          "m+": li1IliIi.getMinutes(),
          "s+": li1IliIi.getSeconds(),
          "w+": li1IliIi.getDay(),
          "q+": Math.floor((li1IliIi.getMonth() + 3) / 3),
          "S+": li1IliIi.getMilliseconds()
        };
      return /(y+)/i.test(i11II1l1) && (i11II1l1 = i11II1l1.replace(RegExp.$1, "".concat(li1IliIi.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(I1liI1Il).forEach(Il1lliii => {
        if (new RegExp("(".concat(Il1lliii, ")")).test(i11II1l1)) {
          var I1I1iI1I = "S+" === Il1lliii ? "000" : "00";
          i11II1l1 = i11II1l1.replace(RegExp.$1, 1 == RegExp.$1.length ? I1liI1Il[Il1lliii] : "".concat(I1I1iI1I).concat(I1liI1Il[Il1lliii]).substr("".concat(I1liI1Il[Il1lliii]).length));
        }
      }), i11II1l1;
    }
    ["__genUA"]() {
      this.uid = $.CryptoJS.SHA1($.UserName + "red").toString();
      let Ii1Iiii1 = this.uid,
        iiil1ll1 = ["14.3"],
        i1i1Ili = iiil1ll1[Math.floor(Math.random() * iiil1ll1.length)],
        II11111I = ["12,1"],
        liilIiIl = II11111I[Math.floor(Math.random() * II11111I.length)],
        liIiilli = ["wifi"],
        Ii11II = liIiilli[Math.floor(Math.random() * liIiilli.length)],
        I1liliI1 = i1i1Ili.replace(/\./g, "_"),
        liI1lIIi = [];
      liI1lIIi = [["10.1.4", "167814"]];
      let lI1iIl1i = Math.floor(Math.random() * liI1lIIi.length),
        l1l1lll = liI1lIIi[lI1iIl1i] ? liI1lIIi[lI1iIl1i] : liI1lIIi[0];
      liilIiIl = "iPhone" + liilIiIl;
      let IlI11il = "";
      return IlI11il = "jdapp;iPhone;" + l1l1lll[0] + ";" + i1i1Ili + ";" + Ii1Iiii1 + ";network/" + Ii11II + ";model/" + liilIiIl + ";addressid/;appBuild/" + l1l1lll[1] + ";jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + I1liliI1 + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", IlI11il;
    }
    ["__genFp"]() {
      function ilIi1i1i(l1I1iI1l, lIlIi1i) {
        var lIliIiil = [],
          iIiIIIII = l1I1iI1l.length,
          l11Iii1I = l1I1iI1l.split(""),
          I1iil11 = "";
        for (; I1iil11 = l11Iii1I.shift();) {
          if (Math.random() * iIiIIIII < lIlIi1i) {
            lIliIiil.push(I1iil11);
            if (--lIlIi1i == 0) break;
          }
          iIiIIIII--;
        }
        for (var IIII11ii = "", Ill1ilI1 = 0; Ill1ilI1 < lIliIiil.length; Ill1ilI1++) {
          var I1iilIIl = Math.random() * (lIliIiil.length - Ill1ilI1) | 0;
          IIII11ii += lIliIiil[I1iilIIl];
          lIliIiil[I1iilIIl] = lIliIiil[lIliIiil.length - Ill1ilI1 - 1];
        }
        return IIII11ii;
      }
      function l1iI1I1(ll1illI1, Ii1I1IIl) {
        for (let i1Ii1lli of Ii1I1IIl.slice()) ll1illI1 = ll1illI1.replace(i1Ii1lli, "");
        return ll1illI1;
      }
      var IIii1iIl = "0123456789",
        iiilIIll = ilIi1i1i(IIii1iIl, 3),
        IliIil1l = Math.random() * 10 | 0,
        i1ililIl = l1iI1I1(IIii1iIl, iiilIIll),
        il1IIiIl = {};
      il1IIiIl.size = IliIil1l;
      il1IIiIl.customDict = i1ililIl;
      var llllill1 = this.getRandomIDPro(il1IIiIl) + iiilIIll + this.getRandomIDPro({
          "size": 14 - (IliIil1l + 3) + 1,
          "customDict": i1ililIl
        }) + IliIil1l,
        iIiiiii = llllill1.split(""),
        lIIlIIIl = [];
      for (; iIiiiii.length > 0;) lIIlIIIl.push(9 - parseInt(iIiiiii.pop()));
      var lilIiii1 = lIIlIIIl.join("");
      return lilIiii1;
    }
    ["getRandomIDPro"]() {
      var lI1lIII1,
        I1il111i,
        lIIl1l1I = void 0 === (llill11l = (I1il111i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).size) ? 10 : llill11l,
        llill11l = void 0 === (llill11l = I1il111i.dictType) ? "number" : llill11l,
        IIiIIlii = "";
      if ((I1il111i = I1il111i.customDict) && "string" == typeof I1il111i) lI1lIII1 = I1il111i;else switch (llill11l) {
        case "alphabet":
          lI1lIII1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "max":
          lI1lIII1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
          break;
        case "number":
        default:
          lI1lIII1 = "0123456789";
      }
      for (; lIIl1l1I--;) IIiIIlii += lI1lIII1[Math.random() * lI1lIII1.length | 0];
      return IIiIIlii;
    }
    ["Encrypt"](liI1i1II, Ili1IIIi) {
      let I1iiiIII = $.CryptoJS.AES.encrypt(liI1i1II, $.CryptoJS.enc.Utf8.parse(Ili1IIIi.key), {
        "iv": $.CryptoJS.enc.Utf8.parse(Ili1IIIi.iv),
        "mode": $.CryptoJS.mode.CBC,
        "padding": $.CryptoJS.pad.Pkcs7
      });
      return I1iiiIII.ciphertext.toString();
    }
    async ["__genAlgo"]() {
      let l1l1Ii1 = {
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
        I1IllI1 = JSON.stringify(l1l1Ii1, null, 2),
        lill11 = this.Encrypt(I1IllI1, {
          "key": "wm0!@w-s#ll1flo(",
          "iv": "0102030405060708"
        });
      var Il11iiii = {
        "version": this.v,
        "fp": this.fp,
        "appId": this.appId.toString(),
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": lill11 || ""
      };
      return new Promise(iiililii => {
        let IiII1iii = {
          "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
          "body": JSON.stringify(Il11iiii),
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Origin": "https://pro.m.jd.com",
            "Referer": "https://pro.m.jd.com/",
            "user-agent": this.ua
          },
          "timeout": 30000
        };
        $.post(IiII1iii, async (Il1ili1I, I1i11il1, iiIII11) => {
          try {
            if (Il1ili1I) console.log(Il1ili1I);else {
              let IllII11 = $.toObj(iiIII11, iiIII11);
              IllII11 && typeof IllII11 === "object" && IllII11.data && IllII11.data.result && IllII11.data.result.tk && (this.tk = IllII11.data.result.tk, this.genKey = new Function("return " + IllII11.data.result.algo)());
            }
          } catch (iI1liI1l) {
            $.logErr(iI1liI1l, I1i11il1);
          } finally {
            iiililii();
          }
        });
      });
    }
    ["__genH5st"](l1l1i1 = {}, ii1lIli1 = "") {
      let i1l1lil1 = undefined,
        liilllI1 = {
          "ua": this.ua,
          "uid": this.uid
        };
      if (this.tk && this.genKey) {
        this.time = Date.now();
        this.timestamp = this.__format("yyyyMMddhhmmssSSS", this.time);
        let lIiIiI1I = this.genKey(this.tk, this.fp.toString(), this.timestamp.toString(), this.appId.toString(), $.CryptoJS).toString();
        var lIl1iiI = {},
          i1i11IIl = null;
        i1i11IIl = Object.keys(l1l1i1).sort().map(function (lli11ilI) {
          var I1iIIlI1 = {};
          return I1iIIlI1.key = lli11ilI, I1iIIlI1.value = l1l1i1[lli11ilI], I1iIIlI1;
        }).filter(function (il1li1li) {
          var iIlil1il = il1li1li.value,
            iiI1iIi = "number" == typeof iIlil1il && !isNaN(iIlil1il) || "string" == typeof iIlil1il || "boolean" == typeof iIlil1il || "body" == il1li1li.key;
          if (iiI1iIi) {
            if ("body" == il1li1li.key && typeof il1li1li.value == "object") il1li1li.value = JSON.stringify(il1li1li.value);
            lIl1iiI[il1li1li.key] = il1li1li.value;
          }
          return iiI1iIi;
        });
        l1l1i1 = lIl1iiI;
        let iII1il1i = "";
        iII1il1i = Object.keys(l1l1i1).map(function (IliIIill) {
          return IliIIill + ":" + (IliIIill == "body" && l1l1i1[IliIIill].length !== 64 && l1l1i1[IliIIill].slice(0, 1) == "{" ? $.CryptoJS.SHA256(l1l1i1[IliIIill]).toString($.CryptoJS.enc.Hex) : l1l1i1[IliIIill]);
        }).join("&");
        iII1il1i = $.CryptoJS.HmacSHA256(iII1il1i, lIiIiI1I).toString($.CryptoJS.enc.Hex);
        let I1IiII1i = {
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {}
        };
        ii1lIli1 && (I1IiII1i.pp.p1 = ii1lIli1);
        I1IiII1i.fp = this.fp;
        let lill11l1 = JSON.stringify(I1IiII1i, null, 2),
          iliIilli = this.Encrypt(lill11l1, {
            "key": "wm0!@w_s#ll1flo(",
            "iv": "0102030405060708"
          });
        i1l1lil1 = [this.timestamp, this.fp, this.appId.toString(), this.tk, iII1il1i, this.v, this.time.toString(), iliIilli].join(";");
        liilllI1.t = l1l1i1.t;
      }
      return liilllI1.h5st = i1l1lil1, liilllI1;
    }
  }
  IilllI11 = new il11iiil(i1iI1il, il11, I1llIl1i);
}
function il1I1lil() {
  class IlIiI11I {
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
    ["getUVCookie"](i11Illil = "", l1lI11 = "", i1II1iiI = "", lIll11ll = "") {
      try {
        this.document.location.href = this.document.location.hrefs + "";
        this.document.cookie = this.document.cookies + "";
        if (i1II1iiI) this.document.location.href = i1II1iiI;
        if (lIll11ll) this.document.cookie = lIll11ll;
        this.UVCookie = "";
        this.navigator.userAgent = this.navigator.userAgents + "";
        this.ltr = 1011 + Math.round(31 * Math.random());
        if (i11Illil) this.navigator.userAgent = i11Illil;
        return this.lr = {
          "ckJda": "__jda",
          "ckJdb": "__jdb",
          "ckJdv": "__jdv",
          "ckJdc": "__jdc",
          "refUrl": "https://u.jd.com/"
        }, this.q(), this.s(l1lI11), this.UVCookie;
      } catch (iI11iII) {
        console.log(iI11iII);
      }
    }
    ["s"](i11Iiiii = "") {
      var iIliI1Il,
        I11i1l1i,
        IiI1IIi,
        IlllIlil,
        i111lI1 = (this.getCookie(this.lr.ckJda) || "").split("."),
        i1i11i = (this.getCookie(this.lr.ckJdb) || "").split("."),
        lIill1lI = (this.getCookie(this.lr.ckJdv) || "").split("|"),
        I11il1l1 = this.getCookie(this.lr.ckJdc) || "",
        lIliiIi1 = parseInt((new Date().getTime() - this.ltr) / 1000),
        IiII11II = 0,
        IlIiIili = 1,
        III1llil = "direct",
        iIiIiIiI = "-",
        iiii1III = "none",
        iiIIIlIi = "-";
      if (i111lI1.length > 3) for (var Il1I1l1l = 2; Il1I1l1l < 5 && Il1I1l1l < i111lI1.length; Il1I1l1l++) {
        var IiI1Iiil = i111lI1[Il1I1l1l];
        IiI1Iiil.length > 10 && (i111lI1[Il1I1l1l] = IiI1Iiil.substr(0, 10));
      }
      i111lI1.length > 5 ? (IiI1IIi = i111lI1[0], IlllIlil = i111lI1[1], iIliI1Il = parseInt(i111lI1[2], 10), I11i1l1i = parseInt(i111lI1[3], 10), lIliiIi1 = parseInt(i111lI1[4], 10), IlIiIili = parseInt(i111lI1[5], 10) || IlIiIili) : (IlllIlil = this.genUuid(), iIliI1Il = lIliiIi1, I11i1l1i = lIliiIi1);
      this.lr.uuid = IlllIlil;
      i1i11i.length > 3 && (IiI1IIi || (IiI1IIi = i1i11i[0]), IiII11II = parseInt(i1i11i[1], 10) || 0);
      lIill1lI.length > 4 && (IiI1IIi || (IiI1IIi = lIill1lI[0]), III1llil = lIill1lI[1], iIiIiIiI = lIill1lI[2], iiii1III = lIill1lI[3], iiIIIlIi = lIill1lI[4]);
      I11il1l1 && "" !== I11il1l1 && (IiI1IIi || (IiI1IIi = I11il1l1));
      var I1lIIlI,
        iiIilIll = [],
        Iilil1Il = i1i11i.length < 4,
        lIiIil1i = this.getParameter("utm_source"),
        iiIllIII = false;
      if (lIiIil1i) {
        var iI11l11 = this.getParameter("utm_campaign"),
          I111l1ll = this.getParameter("utm_medium"),
          lliIIii = this.getParameter("utm_term");
        iiIilIll.push(lIiIil1i || III1llil);
        iiIilIll.push(iI11l11 || iIiIiIiI);
        iiIilIll.push(I111l1ll || iiii1III);
        iiIilIll.push(lliIIii || iiIIIlIi);
        iiIIIlIi = iiIilIll[3];
        iiIllIII = !0;
      } else {
        var iIIiiI11,
          Ii11i111 = this.lr.refUrl && this.lr.refUrl.split("/")[2],
          l1l1iIII = false;
        if (Ii11i111 && Ii11i111.indexOf(this.lr.ckDomain) < 0) {
          for (iIIiiI11 = this.lr.seo, Il1I1l1l = 0; Il1I1l1l < iIIiiI11.length; Il1I1l1l++) {
            var IlIi1II = iIIiiI11[Il1I1l1l].split(":");
            if (Ii11i111.indexOf(IlIi1II[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((IlIi1II[1] + "=").toLowerCase()) > -1) {
              var IliiiIii = this.getParameter(IlIi1II[1], this.lr.refUrl);
              /[^\x00-\xff]/.test(IliiiIii) && (IliiiIii = encodeURIComponent(IliiiIii));
              iiIilIll.push(IlIi1II[0]);
              iiIilIll.push("-");
              iiIilIll.push("organic");
              iiIilIll.push(IliiiIii || "not set");
              iiIIIlIi = iiIilIll[3];
              l1l1iIII = !0;
              break;
            }
          }
          l1l1iIII || (Ii11i111.indexOf("zol.com.cn") > -1 ? (iiIilIll.push("zol.com.cn"), iiIilIll.push("-"), iiIilIll.push("cpc"), iiIilIll.push("not set")) : (iiIilIll.push(Ii11i111), iiIilIll.push("-"), iiIilIll.push("referral"), iiIilIll.push("-")));
        }
      }
      I1lIIlI = iiIilIll.length > 0 && (iiIilIll[0] !== III1llil || iiIilIll[1] !== iIiIiIiI || iiIilIll[2] !== iiii1III) && "referral" !== iiIilIll[2];
      Iilil1Il || !Iilil1Il && I1lIIlI ? (III1llil = iiIilIll[0] || III1llil, iIiIiIiI = iiIilIll[1] || iIiIiIiI, iiii1III = iiIilIll[2] || iiii1III, iiIIIlIi = iiIilIll[3] || iiIIIlIi, i111lI1.length > 5 ? (iIliI1Il = parseInt(i111lI1[2], 10), I11i1l1i = parseInt(i111lI1[4], 10), lIliiIi1 = parseInt((new Date().getTime() - this.ltr) / 1000), IlIiIili++, IiII11II = 1) : (IlIiIili = 1, IiII11II = 1)) : IiII11II++;
      var II1IIiI1 = this.getPageParamFromSdk();
      if (II1IIiI1 && II1IIiI1.vts) {
        var l1IliiI1 = 1 * II1IIiI1.vts,
          l1l1ill1 = 1 * II1IIiI1.seq;
        (l1IliiI1 > IlIiIili || l1IliiI1 === IlIiIili && l1l1ill1 >= IiII11II) && (IlIiIili = l1IliiI1, IiII11II = l1l1ill1 + 1);
      }
      if (IiI1IIi || (IiI1IIi = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [IiI1IIi, IlllIlil, iIliI1Il, I11i1l1i, lIliiIi1, IlIiIili || 1].join("."), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [IiI1IIi, IiII11II, IlllIlil + "|" + IlIiIili, lIliiIi1].join("."), this.lr.ckDomain, this.lr.ckJdbExp), iiIllIII || I1lIIlI || lIill1lI.length < 5) {
        var I1iiii1 = [IiI1IIi, III1llil || "direct", iIiIiIiI || "-", iiii1III || "none", iiIIIlIi || "-", new Date().getTime() - this.ltr].join("|");
        this.setJdv(I1iiii1 = encodeURIComponent(I1iiii1), IiI1IIi);
      }
      this.setCookie(this.lr.ckJdc, IiI1IIi, this.lr.ckDomain);
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
    ["setCookie"](iiii1iil, iIIlilII, ii11lll1, lllliIi) {
      if (iiii1iil) {
        var IlIII11 = "";
        if (lllliIi) {
          var li1il1 = new Date();
          li1il1.setTime(li1il1.getTime() - this.ltr + lllliIi);
          IlIII11 = ";expires=" + li1il1.toGMTString();
        }
        this.UVCookie += iiii1iil + "=" + iIIlilII + "; ";
      }
    }
    ["setJdv"](i1iIii11, IIlIlliI, ll1Il1ii) {
      var iIll1iI1 = "";
      iIll1iI1 = this.isPrey(10) && (!i1iIii11 || i1iIii11.length > 400) ? IIlIlliI + "|direct|-|none|-|" + (new Date().getTime() - this.ltr) : i1iIii11;
      var ilII1l = ll1Il1ii || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
      this.setCookie(this.lr.ckJdv || "__jdv", iIll1iI1, this.lr.ckDomain, ilII1l);
    }
    ["getCookie"](IilIIIil, IiIiiI1l) {
      var lII1Ii11 = this.document.cookie.match(new RegExp("(^| )" + IilIIIil + "=([^;]*)(;|$)"));
      return null !== lII1Ii11 ? IiIiiI1l ? lII1Ii11[2] : this.urlDecode(lII1Ii11[2]) : "";
    }
    ["genUuid"]() {
      return new Date().getTime() - this.ltr + "" + parseInt(2147483647 * Math.random());
    }
    ["getParameter"](IIllliII, Il11iIli) {
      var iI1I1ii1 = Il11iIli || this.document.location.href,
        i1II111l = new RegExp("(?:^|&|[?]|[/])" + IIllliII + "=([^&]*)").exec(iI1I1ii1);
      return i1II111l ? this.urlDecode(i1II111l[1]) : null;
    }
    ["urlDecode"](ili1liil) {
      try {
        return decodeURIComponent(ili1liil);
      } catch (iilliii) {
        return ili1liil;
      }
    }
    ["genHash"](il1illIl) {
      var Il11ili,
        ilIIIlil = 1,
        IIIIIli = 0;
      if (il1illIl) for (ilIIIlil = 0, Il11ili = il1illIl.length - 1; Il11ili >= 0; Il11ili--) {
        ilIIIlil = 0 !== (IIIIIli = 266338304 & (ilIIIlil = (ilIIIlil << 6 & 268435455) + (IIIIIli = il1illIl.charCodeAt(Il11ili)) + (IIIIIli << 14))) ? ilIIIlil ^ IIIIIli >> 21 : ilIIIlil;
      }
      return ilIIIlil;
    }
    ["isPrey"](Ii1lIll) {
      if (Ii1lIll >= 100) return !0;
      var l11i111i = this.lr.uuid,
        iiIlliI1 = l11i111i.substr(l11i111i.length - 2);
      return !!iiIlliI1 && 1 * iiIlliI1 < Ii1lIll;
    }
    ["isEmbedded"]() {
      var i1iili1i = this.navigator.userAgent || "";
      return /^(jdapp|jdltapp|jdpingou);/.test(i1iili1i) || this.isJdLog();
    }
    ["isJdLog"]() {
      return (this.navigator.userAgent || "").indexOf(";jdlog;") > -1;
    }
    ["getPageParamFromSdk"]() {
      var liI1il1I, ill11Iii;
      try {
        this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? ill11Iii = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? ill11Iii = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (ill11Iii = this.window.prompt("JDMAGetMPageParam", ""));
        ill11Iii && (liI1il1I = JSON.parse(ill11Iii));
      } catch (illIl1l) {}
      return liI1il1I;
    }
    ["time"](lIli1iIl, Iil1il1i = null) {
      const ilIl1Il1 = Iil1il1i ? new Date(Iil1il1i) : new Date();
      let l1IIiiIl = {
        "M+": ilIl1Il1.getMonth() + 1,
        "d+": ilIl1Il1.getDate(),
        "H+": ilIl1Il1.getHours(),
        "m+": ilIl1Il1.getMinutes(),
        "s+": ilIl1Il1.getSeconds(),
        "q+": Math.floor((ilIl1Il1.getMonth() + 3) / 3),
        "S": ilIl1Il1.getMilliseconds()
      };
      /(y+)/.test(lIli1iIl) && (lIli1iIl = lIli1iIl.replace(RegExp.$1, (ilIl1Il1.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let liIIlli1 in l1IIiiIl) new RegExp("(" + liIIlli1 + ")").test(lIli1iIl) && (lIli1iIl = lIli1iIl.replace(RegExp.$1, 1 == RegExp.$1.length ? l1IIiiIl[liIIlli1] : ("00" + l1IIiiIl[liIIlli1]).substr(("" + l1IIiiIl[liIIlli1]).length)));
      return lIli1iIl;
    }
  }
  lliili = new IlIiI11I();
}
function iliI11I(IliiI11I) {
  IliiI11I = IliiI11I || 32;
  let Il1iiI1I = "abcdef0123456789",
    i1lilliI = Il1iiI1I.length,
    liiIiIi1 = "";
  for (i = 0; i < IliiI11I; i++) liiIiIi1 += Il1iiI1I.charAt(Math.floor(Math.random() * i1lilliI));
  return liiIiIi1;
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date(new Date().getTime()+new Date().getTimezoneOffset()*60*1000+8*60*60*1000);let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
