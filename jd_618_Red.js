/*
618红包助力

脚本锁佣建议用新的京粉号
https://u.jd.com/xxxxxxx

返利变量：CODE618，若需要返利给自己，请自己修改环境变量[CODE618]
xxxxxxx换成自己的返利 就是链接后面那7位字母
export CODE618="xxxxxxx"


尽量使用代理访问，不然大概率 垃圾卷

DL池搭建地址：https://t.me/autoProxyPool

js最简使用方式
安装依赖global-agent
然后在你的要使用代理的js中加入
// require("global-agent/bootstrap");
// global.GLOBAL_AGENT.HTTP_PROXY="http://	DL池docker地址:8080";


0 0,10,20 * * * jd_618_Red.js 618红包助力

*/

const $ = new Env('618红包助力');
const jdCookieNode = $.isNode() ? require("./jdCookie") : "",
  jsdom = require("jsdom");
$.CryptoJS = require("crypto-js");
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(Il1l1I1 => {
    cookiesArr.push(jdCookieNode[Il1l1I1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(ii1Iiill => ii1Iiill.cookie)].filter(liii1iII => !!liii1iII);
let krflCode = null;
$.isNode() && process.env.CODE618 && (krflCode = process.env.CODE618);
let rebateCodes = "",
  rebatePin = "",
  redTimes = 0,
  unionActId = "31162";
if (!rebatePin) rebatePin = "";
rebatePin = $.isNode() ? process.env.JD_618_rebatePin ? process.env.JD_618_rebatePin : "" + rebatePin : $.getdata("JD_618_rebatePin") ? $.getdata("JD_618_rebatePin") : "" + rebatePin;
redTimes = $.isNode() ? process.env.JD_618_redTimes ? process.env.JD_618_redTimes : "" + redTimes : $.getdata("JD_618_redTimes") ? $.getdata("JD_618_redTimes") : "" + redTimes;
let IlIliIi = rebatePin && rebatePin.split(",") || [];
rebateCode = rebateCodes + "";
$.time("yyyy-MM-dd HH:mm:ss");
message = "";
newCookie = "";
resMsg = "";
$.uiUpdateTime = "";
$.endFlag = false;
$.runEnd = false;
let lIIIIilI = {};
$.getH5st_WQ_Arr = {};
$.runArr = {};
let liIlI1i1 = null;
const l1lIIIi1 = "2023/06/29 00:00:00+08:00";
let I1l1I1Ii = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
$.UVCookieArr = {};
lr = {};
$.UVCookie = "";
let Ii1iIilI = "";
$.time("yyyy-MM-dd");
l1lill1l();
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  I1l1I1Ii > new Date(l1lIIIi1).getTime() && ($.msg($.name, "活动已结束", "请删除此脚本"), $.setdata("", "JD_618_Reds"), $.setdata("", "JD_618_Red"), $.setdata("", "JD_618_Red_pin"));
  $.shareCodeArr = {};
  $.shareCodePinArr = $.getdata("JD_618_Red_pin") || {};
  $.shareCode = "";
  $.again = false;
  authorCodeList = ["Oqk1iQg"]
  await I1illlIi();
  for (let IIiiIiil = 0; IIiiIiil < cookiesArr.length && !$.runEnd; IIiiIiil++) {
    if ($.endFlag) break;
    cookie = cookiesArr[IIiiIiil];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIiiIiil + 1;
      if ($.runArr[$.UserName]) continue;
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let I1lii111 = 1;
      if (!cookie.includes("app_open")) {
        I1lii111 = 2;
      }
      await IIii1i1l(I1lii111);
      await ii1i1iII();
      if ($.endFlag || $.end) break;
    }
    $.setdata($.shareCodePinArr, "JD_618_Red_pin");
  }
  $.setdata($.shareCodePinArr, "JD_618_Red_pin");
  if (message) {
    $.msg($.name, "", message + "\nhttps://u.jd.com/" + rebateCode + "\n\n跳转到app 可查看助力情况");
    if ($.isNode()) {}
  }
})().catch(ilIl1ll1 => $.logErr(ilIl1ll1)).finally(() => {
  if (liIlI1i1) liIlI1i1.close();
  $.done();
});
async function ii1i1iII(Iil111i = 0) {
  try {
    krrebateCode = krflCode ? krflCode : authorCodeList[random(0, authorCodeList.length)];
    rebateCode = krrebateCode;
    krflCode != null && console.log("已填写变量：" + rebateCode);
    $.UVCookie = $.UVCookieArr[$.UserName] || "";
    !$.UVCookie && l1lill1l();
    resMsg = "";
    let lillIiI1 = false,
      i1Ii1lII = 0,
      lIl1iIii = 0,
      lilll111 = 0;
    $.shareFlag = true;
    do {
      if (lIl1iIii > 2) i1Ii1lII = 0;
      $.flag = 0;
      newCookie = "";
      $.url1 = "";
      await lIii11lI();
      if (!$.url1) {
        console.log("获取url1失败");
        $.end = true;
        break;
      }
      $.url2 = "";
      $.UVCookie = Ii1iIilI.getUVCookie("", "", $.url1, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      await lii1IIii();
      if (!/unionActId=\d+/.test($.url2) && !new RegExp("&d=" + rebateCode).test($.url2)) {}
      if (!$.url2) $.url2 = "https://prodev.m.jd.com/mall/active/3nNmntNrufZjkZF1XJJKknDuCbaQ/index.html?unionActId=" + unionActId + "&d=" + rebateCode + "&cu=true&utm_source=kong&utm_medium=jingfen";
      $.actId = $.url2.match(/mall\/active\/([^\/]+)\/index\.html/) && $.url2.match(/mall\/active\/([^\/]+)\/index\.html/)[1] || "3nNmntNrufZjkZF1XJJKknDuCbaQ";
      $.UVCookie = Ii1iIilI.getUVCookie("", "", $.url2, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      $.eid = "";
      !$.eid && ($.eid = -1);
      if (Iil111i == 0) {
        let llllli1i = 0,
          liI1Ii = true,
          iI11Il1I = 0;
        if (Object.getOwnPropertyNames(lIIIIilI).length > i1Ii1lII && $.shareFlag) for (let I1llll1 in lIIIIilI || {}) {
          if (I1llll1 == $.UserName) {
            $.flag = 1;
            continue;
          }
          if (llllli1i == i1Ii1lII) {
            $.flag = 0;
            $.shareCode = lIIIIilI[I1llll1] || "";
            if ($.shareCodePinArr[I1llll1] && $.shareCodePinArr[I1llll1].includes($.UserName)) {
              iI11Il1I++;
              continue;
            }
            if ($.shareCode.count >= $.shareCodeArr.shareCount) {
              iI11Il1I++;
              continue;
            }
            $.getlj = false;
            if ($.shareCode) console.log("助力[" + I1llll1 + "]");
            let lIIl11il = await l1ii11I1($.shareCode.code, 1);
            if (/重复助力/.test(lIIl11il)) {
              if (!$.shareCodePinArr[I1llll1]) $.shareCodePinArr[I1llll1] = [];
              $.shareCodePinArr[I1llll1].push($.UserName);
              i1Ii1lII--;
              lilll111--;
            } else {
              if (/助力/.test(lIIl11il) && /上限/.test(lIIl11il)) {
                $.shareFlag = false;
              } else {
                if (!/领取上限/.test(lIIl11il) && $.getlj == true) {
                  if (!$.shareCodePinArr[I1llll1]) $.shareCodePinArr[I1llll1] = [];
                  !$.shareCodePinArr[I1llll1].includes($.UserName) && $.shareCodePinArr[I1llll1].push($.UserName);
                  i1Ii1lII--;
                } else liI1Ii = false;
              }
            }
          }
          llllli1i++;
        }
        liI1Ii && iI11Il1I == Object.getOwnPropertyNames(lIIIIilI).length && (lillIiI1 = true);
        if (llllli1i == 0) {
          $.getlj = false;
          let lIlIlI1I = await l1ii11I1("", 1);
          !/领取上限/.test(lIlIlI1I) && $.getlj == true && i1Ii1lII--;
        }
        if ($.endFlag) break;
      } else {
        let IilIIl = await l1iii11l();
        if (!$.endFlag && IilIIl && $.again == false) await i11IIiI();
        if ($.again == false) break;
      }
      $.again == true && lIl1iIii < 1 && (lIl1iIii++, $.again = false);
      i1Ii1lII++;
      lilll111++;
      $.flag == 1 && (await $.wait(parseInt(Math.random() * 500 + 100, 10)));
      if (redTimes > 0 && redTimes <= lilll111) break;
    } while ($.flag == 1 && i1Ii1lII < 5);
    if ($.endFlag) return;
    resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
    lillIiI1 && (console.log("\n获取新的助力信息"), await I1illlIi(1));
    await $.wait(parseInt(Math.random() * 500 + 200, 10));
  } catch (IlIiiiI) {
    console.log(IlIiiiI);
  }
}
async function I1illlIi(I1ilIll1 = 0) {
  try {
    let lliI1l = 2;
    if (I1ilIll1 == 1) lliI1l = 1;
    let l1iIlI1I = 0;
    for (let I1iIi1ll in $.shareCodeArr || {}) {
      if (I1iIi1ll === "flag" || I1iIi1ll === "updateTime" || I1iIi1ll === "shareCount") continue;
      if ($.shareCodeArr[I1iIi1ll] && $.shareCodeArr.shareCount && $.shareCodeArr[I1iIi1ll].count < $.shareCodeArr.shareCount) l1iIlI1I++;
    }
    for (let ill11lil = 0; ill11lil < cookiesArr.length && !$.runEnd; ill11lil++) {
      cookie = cookiesArr[ill11lil];
      if (cookie) {
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (IlIliIi.length > 0 && IlIliIi.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) continue;
        $.index = ill11lil + 1;
        await IIii1i1l();
        await ii1i1iII(1);
        let I1iIII1 = 0;
        for (let l1l1li in $.shareCodeArr || {}) {
          if (l1l1li === "flag" || l1l1li === "updateTime" || l1l1li === "shareCount") continue;
          if ($.shareCodeArr[l1l1li] && $.shareCodeArr.shareCount && $.shareCodeArr[l1l1li].count < $.shareCodeArr.shareCount) I1iIII1++;
        }
        if ($.endFlag || I1iIII1 - l1iIlI1I >= lliI1l || $.end) break;
      }
    }
  } catch (i1ili1II) {
    console.log(i1ili1II);
  }
  if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) {
    for (let iI1iII1i in $.shareCodeArr || {}) {
      if (iI1iII1i === "flag" || iI1iII1i === "updateTime" || iI1iII1i === "shareCount") continue;
      if ($.shareCodeArr[iI1iII1i]) lIIIIilI[iI1iII1i] = $.shareCodeArr[iI1iII1i];
    }
  }
}
function l1ii11I1(IiIiliIl = "", ill1ll1I = 1) {
  return new Promise(async IiI11ii => {
    $.UVCookie = Ii1iIilI.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let IiIiI1il = "",
      II11l11l = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000,
      liIIi1I = 1;
    $.time("H", II11l11l) == "20" && (liIIi1I = 4);
    const ililll = {
        "platform": liIIi1I,
        "unionActId": unionActId,
        "actId": $.actId,
        "d": rebateCode,
        "unionShareId": IiIiliIl,
        "type": ill1ll1I,
        "eid": $.eid
      },
      Il11ill1 = {
        "appid": "u",
        "body": ililll,
        "client": "apple",
        "clientVersion": "8.3.6",
        "functionId": "getCoupons"
      };
    IiIiI1il = await lil1li11("6a98d", Il11ill1);
    IiIiI1il = encodeURIComponent(IiIiI1il);
    let II1 = "",
      lI1iIlIl = {
        "url": "https://api.m.jd.com/api?functionId=getCoupons&appid=u&_=" + II11l11l + "&loginType=2&body=" + encodeURIComponent($.toStr(ililll)) + "&client=apple&clientVersion=8.3.6&h5st=" + IiIiI1il,
        "headers": {
          "accept": "*/*",
          "Accept-Language": "zh-cn",
          "Accept-Encoding": "gzip, deflate, br",
          "Cookie": "" + $.UVCookie + newCookie + " " + cookie,
          "origin": "https://prodev.m.jd.com",
          "Referer": "https://prodev.m.jd.com/mall/active/3nNmntNrufZjkZF1XJJKknDuCbaQ/index.html",
          "User-Agent": $.UA
        }
      };
    if ($.url2) lI1iIlIl.headers.Referer = $.url2;
    $.get(lI1iIlIl, async (l1l1I1lI, Ii1ll11i, I11lilI1) => {
      try {
        if (l1l1I1lI) {
          console.log("" + $.toStr(l1l1I1lI));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let lIiIi1li = $.toObj(I11lilI1, I11lilI1);
          if (typeof lIiIi1li == "object") {
            lIiIi1li.msg && (II1 = lIiIi1li.msg, console.log(lIiIi1li.msg));
            if (lIiIi1li.msg.indexOf("不展示弹层") > -1 && ill1ll1I == 1) $.again = true;
            if (lIiIi1li.msg.indexOf("领取上限") === -1 && lIiIi1li.msg.indexOf("登录") === -1) {
              if (ill1ll1I == 1) $.flag = 1;
            }
            if (lIiIi1li.msg.indexOf("活动已结束") > -1 || lIiIi1li.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            IiIiliIl && typeof lIiIi1li.data !== "undefined" && typeof lIiIi1li.data.joinNum !== "undefined" && console.log("当前" + lIiIi1li.data.joinSuffix + ":" + lIiIi1li.data.joinNum);
            if (lIiIi1li.code == 0 && lIiIi1li.data) {
              if (ill1ll1I == 1) $.shareCode.count++;
              let li1lIli1 = "";
              for (let lIIi11II of lIiIi1li.data.couponList) {
                if (lIIi11II.type == 1) {
                  $.getlj = true;
                  li1lIli1 += (li1lIli1 ? "\n" : "") + "获得[红包]🧧" + lIIi11II.discount + "元 使用时间:" + $.time("yyyy-MM-dd", lIIi11II.beginTime) + " " + $.time("yyyy-MM-dd", lIIi11II.endTime);
                } else {
                  if (lIIi11II.type == 3) {
                    $.getlj = true;
                    li1lIli1 += (li1lIli1 ? "\n" : "") + "获得[优惠券]🎟️满" + lIIi11II.quota + "减" + lIIi11II.discount + " 使用时间:" + $.time("yyyy-MM-dd", lIIi11II.beginTime) + " " + $.time("yyyy-MM-dd", lIIi11II.endTime);
                  } else lIIi11II.type == 6 ? ($.getlj = true, li1lIli1 += (li1lIli1 ? "\n" : "") + "获得[打折券]]🎫满" + lIIi11II.quota + "打" + lIIi11II.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", lIIi11II.beginTime) + " " + $.time("yyyy-MM-dd", lIIi11II.endTime)) : ($.getlj = true, li1lIli1 += (li1lIli1 ? "\n" : "") + "获得[未知]🎉" + (lIIi11II.quota || "") + " " + lIIi11II.discount + " 使用时间:" + $.time("yyyy-MM-dd", lIIi11II.beginTime) + " " + $.time("yyyy-MM-dd", lIIi11II.endTime), console.log(lIIi11II));
                }
              }
              if (li1lIli1) {
                resMsg += li1lIli1 + "\n";
                console.log(li1lIli1);
              }
            }
            if (ill1ll1I == 1 && typeof lIiIi1li.data !== "undefined" && typeof lIiIi1li.data.groupData !== "undefined" && typeof lIiIi1li.data.groupData.groupInfo !== "undefined") for (let IiI111I1 of lIiIi1li.data.groupData.groupInfo || []) {
              IiI111I1.status == 2 && (console.log("助力满可以领取" + IiI111I1.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await l1ii11I1("", 2));
            }
          } else console.log(I11lilI1);
        }
      } catch (Ii1Ii1iI) {
        $.logErr(Ii1Ii1iI, Ii1ll11i);
      } finally {
        IiI11ii(II1);
      }
    });
  });
}
function l1iii11l(l1I11lil = "") {
  let Illl1lll = true;
  return new Promise(i1IiliII => {
    $.UVCookie = Ii1iIilI.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let Iiii1 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000,
      I1I1iili = 1;
    $.time("H", Iiii1) == "20" && (I1I1iili = 4);
    let llli1iiI = {
      "url": "https://api.m.jd.com/api?functionId=showCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22actId%22:%22" + $.actId + "%22,%22unionActId%22:%22" + unionActId + "%22,%22unpl%22:%22" + $.unpl + "%22,%22platform%22:" + I1I1iili + ",%22unionShareId%22:%22%22," + ($.uiUpdateTime ? "%22uiUpdateTime%22:" + $.uiUpdateTime + "," : "") + "%22d%22:%22" + rebateCode + "%22,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=",
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + newCookie + " " + cookie,
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/3nNmntNrufZjkZF1XJJKknDuCbaQ/index.html",
        "User-Agent": $.UA
      }
    };
    if ($.url2) llli1iiI.headers.Referer = $.url2;
    $.get(llli1iiI, async (lIiliili, i1ilI11, l11lIiI) => {
      try {
        if (lIiliili) {
          console.log("" + $.toStr(lIiliili));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let lIIiIlII = $.toObj(l11lIiI, l11lIiI);
          if (typeof lIIiIlII == "object") {
            if (lIIiIlII.msg) console.log(lIIiIlII.msg);
            if (lIIiIlII.msg.indexOf("不展示弹层") > -1) $.again = true;
            if (lIIiIlII.msg.indexOf("领取上限") > -1) $.runArr[$.UserName] = true;
            if (lIIiIlII.msg.indexOf("上限") === -1 && lIIiIlII.msg.indexOf("登录") === -1) {
              $.flag = 1;
            }
            if (lIIiIlII.msg.indexOf("活动已结束") > -1 || lIIiIlII.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            if (lIIiIlII.data.uiUpdateTime) $.uiUpdateTime = lIIiIlII.data.uiUpdateTime;
            if (typeof lIIiIlII.data !== "undefined" && typeof lIIiIlII.data.groupData !== "undefined" && typeof lIIiIlII.data.groupData.joinNum !== "undefined") {
              $.joinNum = lIIiIlII.data.groupData.joinNum;
              $.shareCount = 0;
              for (let IIiIiIll of lIIiIlII.data.groupData.groupInfo) {
                if ($.shareCount < IIiIiIll.num) $.shareCount = IIiIiIll.num;
              }
              $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = $.shareCount);
              $.shareCodeArr.shareCount = $.shareCount;
              if ($.shareCount <= $.joinNum) {
                if (!$.shareCodeArr[$.UserName]) $.shareCodeArr[$.UserName] = {};
                $.shareCodeArr[$.UserName].count = $.joinNum;
                Illl1lll = false;
              }
              console.log("【账号" + $.index + "】" + ($.nickName || $.UserName) + " " + $.joinNum + "/" + $.shareCount + "火力值");
            }
            lIIiIlII.msg.indexOf("活动已结束") > -1 && (Illl1lll = false);
            if (typeof lIIiIlII.data !== "undefined" && typeof lIIiIlII.data.groupData !== "undefined" && typeof lIIiIlII.data.groupData.groupInfo !== "undefined") for (let l1lll1i1 of lIIiIlII.data.groupData.groupInfo || []) {
              l1lll1i1.status == 2 && (console.log("助力满可以领取" + l1lll1i1.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await l1ii11I1("", 2));
            }
          } else console.log(l11lIiI);
        }
      } catch (II1li1) {
        $.logErr(II1li1, i1ilI11);
      } finally {
        i1IiliII(Illl1lll);
      }
    });
  });
}
function i11IIiI() {
  if ($.shareCodeArr[$.UserName]) {
    console.log("【账号" + $.index + "】缓存分享码:" + $.shareCodeArr[$.UserName].code.replace(/.+(.{3})/, "***$1"));
    return;
  }
  return new Promise(l11Ii1I1 => {
    let Il1III1i = {
      "url": "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22unionActId%22:%22" + unionActId + "%22,%22actId%22:%22" + $.actId + "%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22" + rebateCode + "%22,%22supportPic%22:2,%22supportLuckyCode%22:0,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=",
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + newCookie + " " + cookie,
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/3nNmntNrufZjkZF1XJJKknDuCbaQ/index.html",
        "User-Agent": $.UA
      }
    };
    $.get(Il1III1i, async (iiIill1, lIli1IIi, iI1l1Ii1) => {
      try {
        if (iiIill1) {
          console.log("" + $.toStr(iiIill1));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let I1i1liiI = $.toObj(iI1l1Ii1, iI1l1Ii1);
          if (typeof I1i1liiI == "object") {
            if (I1i1liiI.code == 0 && I1i1liiI.data && I1i1liiI.data.shareUrl) {
              let i1IiiII = I1i1liiI.data.shareUrl.match(/\?s=([^&]+)/) && I1i1liiI.data.shareUrl.match(/\?s=([^&]+)/)[1] || "";
              i1IiiII && (console.log("【账号" + $.index + "】分享码：" + i1IiiII.replace(/.+(.{3})/, "***$1")), $.shareCodeArr[$.UserName] = {
                "code": i1IiiII,
                "count": $.joinNum
              });
            }
          } else {
            console.log(iI1l1Ii1);
          }
        }
      } catch (l1IliilI) {
        $.logErr(l1IliilI, lIli1IIi);
      } finally {
        l11Ii1I1();
      }
    });
  });
}
function lii1IIii() {
  return new Promise(l1I1lII1 => {
    const i1Il1iI1 = {
      "url": $.url1,
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + newCookie + " " + cookie,
        "User-Agent": $.UA
      }
    };
    $.get(i1Il1iI1, async (Iii11IIl, li1III1l, lIil1i1) => {
      try {
        i11iIIii(li1III1l);
        $.url2 = li1III1l && li1III1l.headers && (li1III1l.headers.location || li1III1l.headers.Location || "") || "";
        $.url2 = decodeURIComponent($.url2);
        $.url2 = $.url2.match(/(https:\/\/prodev[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/prodev[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || "";
      } catch (ilIIiiii) {
        $.logErr(ilIIiiii, li1III1l);
      } finally {
        l1I1lII1(lIil1i1);
      }
    });
  });
}
function lIii11lI() {
  return new Promise(iI1ilI1i => {
    const Iillill = {
      "url": "https://u.jd.com/" + rebateCode + ($.shareCode && "?s=" + $.shareCode || ""),
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + newCookie + " " + cookie,
        "User-Agent": $.UA
      }
    };
    $.get(Iillill, async (lIIlIlii, lllIli, IlIlII1l) => {
      try {
        i11iIIii(lllIli);
        $.url1 = IlIlII1l && IlIlII1l.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && IlIlII1l.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || "";
      } catch (I1II11i) {
        $.logErr(I1II11i, lllIli);
      } finally {
        iI1ilI1i(IlIlII1l);
      }
    });
  });
}
function getAuthorCodeList(li111iil) {
  return new Promise(IlI1iI11 => {
    const l1Il1iii = {
      "url": li111iil + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(l1Il1iii, async (i11IlIIi, I1lIIIi1, llil11il) => {
      try {
        if (i11IlIIi) $.getAuthorCodeListerr = false;else {
          if (llil11il) llil11il = JSON.parse(llil11il);
          $.getAuthorCodeListerr = true;
        }
      } catch (I1iIiIl1) {
        $.logErr(I1iIiIl1, I1lIIIi1);
        llil11il = null;
      } finally {
        IlI1iI11(llil11il);
      }
    });
  });
}
function random(I11iIiI1, iilIi1li) {
  return Math.floor(Math.random() * (iilIi1li - I11iIiI1)) + I11iIiI1;
}
function l1IlIi1(il1l1lil) {
  return new Promise(I11ll11i => {
    const Ii1iIl1l = {
      "url": "https://gia.jd.com/fcf.html?a=" + il1l1lil.a,
      "body": "d=" + il1l1lil.d,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": $.UA
      }
    };
    $.post(Ii1iIl1l, async (l1Ii11li, IiIl1II1, ll1Iili) => {
      try {
        if (l1Ii11li) throw new Error(l1Ii11li);else ll1Iili.indexOf("*_*") > 0 ? (ll1Iili = ll1Iili.split("*_*", 2), ll1Iili = JSON.parse(ll1Iili[1]), $.eid = ll1Iili.eid) : console.log("京东api返回数据为空，请检查自身原因");
      } catch (ll1iIIl) {
        $.logErr(ll1iIIl, IiIl1II1);
      } finally {
        I11ll11i(ll1Iili);
      }
    });
  });
}
function i11iIIii(ilIll1II) {
  let lIlI111I = ilIll1II && ilIll1II.headers && (ilIll1II.headers["set-cookie"] || ilIll1II.headers["Set-Cookie"] || "") || "",
    IililiII = "";
  if (lIlI111I) {
    if (typeof lIlI111I != "object") IililiII = lIlI111I.split(",");else IililiII = lIlI111I;
    for (let lIill1ii of IililiII) {
      let iIIIIliI = lIill1ii.split(";")[0].trim();
      if (iIIIIliI.split("=")[1]) {
        iIIIIliI.split("=")[0] == "unpl" && iIIIIliI.split("=")[1] && ($.unpl = iIIIIliI.split("=")[1]);
        if (newCookie.indexOf(iIIIIliI.split("=")[1]) == -1) newCookie += iIIIIliI.replace(/ /g, "") + "; ";
      }
    }
  }
}
function IIii1i1l(II1I1l11 = 1) {
  II1I1l11 = 1;
  if (II1I1l11 == 2) $.UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";else {
    let I11lilIi = $.CryptoJS.SHA1($.UserName + "reds").toString();
    $.UA = "jdapp;iPhone;10.1.4;14.3;" + I11lilIi + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
  }
}
function Ill1i1iI(iIl1lll) {
  if (typeof iIl1lll == "string") try {
    return JSON.parse(iIl1lll);
  } catch (II111Ili) {
    return console.log(II111Ili), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function lll1i1iI(lII1llI1) {
  return new Promise(I1l1Il1l => setTimeout(I1l1Il1l, lII1llI1));
}
async function l1I1iIil() {
  try {
    const {
      JSDOM: Ii1llill
    } = jsdom;
    let I1iIlIl = {
      "url": "https://prodev.m.jd.com/mall/active/3nNmntNrufZjkZF1XJJKknDuCbaQ/index.html?unionActId=" + unionActId + "&d=" + rebateCode + "&cu=true&utm_source=kong&utm_medium=jingfen",
      "referrer": "https://u.jd.com/",
      "userAgent": "jdapp;iPhone;10.1.4;14.3;;M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "runScripts": "dangerously",
      "resources": new jsdom.ResourceLoader({
        "userAgent": "jdapp;iPhone;10.1.4;14.3;;M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "referrer": "https://u.jd.com/"
      }),
      "includeNodeLocations": true,
      "storageQuota": 10000000,
      "pretendToBeVisual": true,
      "virtualConsole": new jsdom.VirtualConsole()
    };
    const ililiII1 = new Ii1llill("<body>\n        <script src=\"https://static.360buyimg.com/siteppStatic/script/mescroll/map.js\"></script>\n        <script src=\"https://storage.360buyimg.com/webcontainer/js_security_v3.js\"></script>\n        <script src=\"https://static.360buyimg.com/siteppStatic/script/utils.js\"></script>\n        </body>", I1iIlIl);
    await lll1i1iI(1000);
    liIlI1i1 = ililiII1.window;
  } catch (lIIIIiil) {
    console.log(lIIIIiil);
  }
}
async function lil1li11(illIIlI, iIIIiIIl) {
  if (!$.getH5st_WQ_Arr[$.UserName]) $.getH5st_WQ_Arr[$.UserName] = {};
  let lI1IlIii = $.getH5st_WQ_Arr[$.UserName];
  return !liIlI1i1 && (await l1I1iIil()), liIlI1i1.localStorage.setItem("WQ__dy_tk_s_" + illIIlI, lI1IlIii["WQ__dy_tk_s_" + illIIlI] || ""), liIlI1i1.localStorage.setItem("WQ__dy_algo_s_" + illIIlI, lI1IlIii["WQ__dy_algo_s_" + illIIlI] || ""), liIlI1i1.localStorage.setItem("WQ_qe_" + illIIlI, lI1IlIii["WQ_qe_" + illIIlI] || ""), new Promise(async IiilIiIl => {
    let Iii1iIi1 = "";
    try {
      if (typeof liIlI1i1.signWaap === "function") Iii1iIi1 = await liIlI1i1.signWaap(illIIlI, iIIIiIIl);else {
        let IIIIl1Ii = 0;
        timer = setInterval(async () => {
          IIIIl1Ii++;
          if (typeof liIlI1i1.signWaap === "function") {
            clearInterval(timer);
            timer = null;
            Iii1iIi1 = await liIlI1i1.signWaap(illIIlI, iIIIiIIl);
          }
          if (IIIIl1Ii >= 100) {
            clearInterval(timer);
          }
        }, 100);
      }
    } catch (IIl11i1) {
      console.log(IIl11i1);
    } finally {
      if (Iii1iIi1) {
        lI1IlIii["WQ__dy_tk_s_" + illIIlI] = liIlI1i1.localStorage.getItem("WQ__dy_tk_s_" + illIIlI);
        lI1IlIii["WQ__dy_algo_s_" + illIIlI] = liIlI1i1.localStorage.getItem("WQ__dy_algo_s_" + illIIlI);
        lI1IlIii["WQ_qe_" + illIIlI] = liIlI1i1.localStorage.getItem("WQ_qe_" + illIIlI);
      }
      IiilIiIl(Iii1iIi1);
    }
  });
}
function l1lill1l() {
  class llI1IIii {
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
          "href": "https://prodev.m.jd.com/mall/active/3nNmntNrufZjkZF1XJJKknDuCbaQ/index.html",
          "hrefs": "https://prodev.m.jd.com/mall/active/3nNmntNrufZjkZF1XJJKknDuCbaQ/index.html"
        }
      };
      this.navigator = {
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        "userAgents": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
      };
      this.window = {};
    }
    ["getUVCookie"](iIIii1ii = "", i11llll = "", llIiIiII = "", iI1Ii1il = "") {
      try {
        this.document.location.href = this.document.location.hrefs + "";
        this.document.cookie = this.document.cookies + "";
        if (llIiIiII) this.document.location.href = llIiIiII;
        if (iI1Ii1il) this.document.cookie = iI1Ii1il;
        this.UVCookie = "";
        this.navigator.userAgent = this.navigator.userAgents + "";
        this.ltr = 1011 + Math.round(31 * Math.random());
        if (iIIii1ii) this.navigator.userAgent = iIIii1ii;
        return this.lr = {
          "ckJda": "__jda",
          "ckJdb": "__jdb",
          "ckJdv": "__jdv",
          "ckJdc": "__jdc",
          "refUrl": "https://u.jd.com/"
        }, this.q(), this.s(i11llll), this.UVCookie;
      } catch (iiI1i1i) {
        console.log(iiI1i1i);
      }
    }
    ["s"](l1lii1i = "") {
      var lii1lIlI,
        I1iIlIi,
        l11lII1,
        lilIIIll,
        Iii1IIII = (this.getCookie(this.lr.ckJda) || "").split("."),
        lIllIi1I = (this.getCookie(this.lr.ckJdb) || "").split("."),
        iiiiI1ii = (this.getCookie(this.lr.ckJdv) || "").split("|"),
        liIl1i1i = this.getCookie(this.lr.ckJdc) || "",
        l1il1lii = parseInt((new Date().getTime() - this.ltr) / 1000),
        IiI1II1 = 0,
        l1iilili = 1,
        lIIiIII = "direct",
        iiI11III = "-",
        IiIl1Il1 = "none",
        iI1IliIi = "-";
      if (Iii1IIII.length > 3) for (var iiIllIl1 = 2; iiIllIl1 < 5 && iiIllIl1 < Iii1IIII.length; iiIllIl1++) {
        var IIiI1I1 = Iii1IIII[iiIllIl1];
        IIiI1I1.length > 10 && (Iii1IIII[iiIllIl1] = IIiI1I1.substr(0, 10));
      }
      Iii1IIII.length > 5 ? (l11lII1 = Iii1IIII[0], lilIIIll = Iii1IIII[1], lii1lIlI = parseInt(Iii1IIII[2], 10), I1iIlIi = parseInt(Iii1IIII[3], 10), l1il1lii = parseInt(Iii1IIII[4], 10), l1iilili = parseInt(Iii1IIII[5], 10) || l1iilili) : (lilIIIll = this.genUuid(), lii1lIlI = l1il1lii, I1iIlIi = l1il1lii);
      this.lr.uuid = lilIIIll;
      lIllIi1I.length > 3 && (l11lII1 || (l11lII1 = lIllIi1I[0]), IiI1II1 = parseInt(lIllIi1I[1], 10) || 0);
      iiiiI1ii.length > 4 && (l11lII1 || (l11lII1 = iiiiI1ii[0]), lIIiIII = iiiiI1ii[1], iiI11III = iiiiI1ii[2], IiIl1Il1 = iiiiI1ii[3], iI1IliIi = iiiiI1ii[4]);
      liIl1i1i && "" !== liIl1i1i && (l11lII1 || (l11lII1 = liIl1i1i));
      var III1I1I1,
        IiliIi1i = [],
        IiIlil1 = lIllIi1I.length < 4,
        liilIilI = this.getParameter("utm_source"),
        iiIiiII1 = false;
      if (liilIilI) {
        var I1llI1l1 = this.getParameter("utm_campaign"),
          Iil1lill = this.getParameter("utm_medium"),
          I1i11Ii = this.getParameter("utm_term");
        IiliIi1i.push(liilIilI || lIIiIII);
        IiliIi1i.push(I1llI1l1 || iiI11III);
        IiliIi1i.push(Iil1lill || IiIl1Il1);
        IiliIi1i.push(I1i11Ii || iI1IliIi);
        iI1IliIi = IiliIi1i[3];
        iiIiiII1 = !0;
      } else {
        var iii1iIIl,
          IliIlIil = this.lr.refUrl && this.lr.refUrl.split("/")[2],
          IiIi1li = false;
        if (IliIlIil && IliIlIil.indexOf(this.lr.ckDomain) < 0) {
          for (iii1iIIl = this.lr.seo, iiIllIl1 = 0; iiIllIl1 < iii1iIIl.length; iiIllIl1++) {
            var llIli1iI = iii1iIIl[iiIllIl1].split(":");
            if (IliIlIil.indexOf(llIli1iI[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((llIli1iI[1] + "=").toLowerCase()) > -1) {
              var IlillIlI = this.getParameter(llIli1iI[1], this.lr.refUrl);
              /[^\x00-\xff]/.test(IlillIlI) && (IlillIlI = encodeURIComponent(IlillIlI));
              IiliIi1i.push(llIli1iI[0]);
              IiliIi1i.push("-");
              IiliIi1i.push("organic");
              IiliIi1i.push(IlillIlI || "not set");
              iI1IliIi = IiliIi1i[3];
              IiIi1li = !0;
              break;
            }
          }
          IiIi1li || (IliIlIil.indexOf("zol.com.cn") > -1 ? (IiliIi1i.push("zol.com.cn"), IiliIi1i.push("-"), IiliIi1i.push("cpc"), IiliIi1i.push("not set")) : (IiliIi1i.push(IliIlIil), IiliIi1i.push("-"), IiliIi1i.push("referral"), IiliIi1i.push("-")));
        }
      }
      III1I1I1 = IiliIi1i.length > 0 && (IiliIi1i[0] !== lIIiIII || IiliIi1i[1] !== iiI11III || IiliIi1i[2] !== IiIl1Il1) && "referral" !== IiliIi1i[2];
      IiIlil1 || !IiIlil1 && III1I1I1 ? (lIIiIII = IiliIi1i[0] || lIIiIII, iiI11III = IiliIi1i[1] || iiI11III, IiIl1Il1 = IiliIi1i[2] || IiIl1Il1, iI1IliIi = IiliIi1i[3] || iI1IliIi, Iii1IIII.length > 5 ? (lii1lIlI = parseInt(Iii1IIII[2], 10), I1iIlIi = parseInt(Iii1IIII[4], 10), l1il1lii = parseInt((new Date().getTime() - this.ltr) / 1000), l1iilili++, IiI1II1 = 1) : (l1iilili = 1, IiI1II1 = 1)) : IiI1II1++;
      var lIIIilil = this.getPageParamFromSdk();
      if (lIIIilil && lIIIilil.vts) {
        var Ii1lI11i = 1 * lIIIilil.vts,
          llli1ll1 = 1 * lIIIilil.seq;
        (Ii1lI11i > l1iilili || Ii1lI11i === l1iilili && llli1ll1 >= IiI1II1) && (l1iilili = Ii1lI11i, IiI1II1 = llli1ll1 + 1);
      }
      if (l11lII1 || (l11lII1 = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [l11lII1, lilIIIll, lii1lIlI, I1iIlIi, l1il1lii, l1iilili || 1].join("."), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [l11lII1, IiI1II1, lilIIIll + "|" + l1iilili, l1il1lii].join("."), this.lr.ckDomain, this.lr.ckJdbExp), iiIiiII1 || III1I1I1 || iiiiI1ii.length < 5) {
        var IlIi1ii = [l11lII1, lIIiIII || "direct", iiI11III || "-", IiIl1Il1 || "none", iI1IliIi || "-", new Date().getTime() - this.ltr].join("|");
        this.setJdv(IlIi1ii = encodeURIComponent(IlIi1ii), l11lII1);
      }
      this.setCookie(this.lr.ckJdc, l11lII1, this.lr.ckDomain);
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
    ["setCookie"](IiI1IlII, lii1il1l, lillllIl, iliI1l1i) {
      if (IiI1IlII) {
        var illIi1l = "";
        if (iliI1l1i) {
          var IiIlI1 = new Date();
          IiIlI1.setTime(IiIlI1.getTime() - this.ltr + iliI1l1i);
          illIi1l = ";expires=" + IiIlI1.toGMTString();
        }
        this.UVCookie += IiI1IlII + "=" + lii1il1l + "; ";
      }
    }
    ["setJdv"](IiIIiIi, i1ii1iIl, iiI1ill1) {
      var IiI1iiII = "";
      IiI1iiII = this.isPrey(10) && (!IiIIiIi || IiIIiIi.length > 400) ? i1ii1iIl + "|direct|-|none|-|" + (new Date().getTime() - this.ltr) : IiIIiIi;
      var IIIillIi = iiI1ill1 || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
      this.setCookie(this.lr.ckJdv || "__jdv", IiI1iiII, this.lr.ckDomain, IIIillIi);
    }
    ["getCookie"](IIIliI, IIi11I1i) {
      var iil1Illi = this.document.cookie.match(new RegExp("(^| )" + IIIliI + "=([^;]*)(;|$)"));
      return null !== iil1Illi ? IIi11I1i ? iil1Illi[2] : this.urlDecode(iil1Illi[2]) : "";
    }
    ["genUuid"]() {
      return new Date().getTime() - this.ltr + "" + parseInt(2147483647 * Math.random());
    }
    ["getParameter"](lliI1i, Ii1iI1i1) {
      var IIi1lI11 = Ii1iI1i1 || this.document.location.href,
        iI111Iil = new RegExp("(?:^|&|[?]|[/])" + lliI1i + "=([^&]*)").exec(IIi1lI11);
      return iI111Iil ? this.urlDecode(iI111Iil[1]) : null;
    }
    ["urlDecode"](I1iI1Il) {
      try {
        return decodeURIComponent(I1iI1Il);
      } catch (Iiiillli) {
        return I1iI1Il;
      }
    }
    ["genHash"](lI1IIii1) {
      var iili11i1,
        ll1l1l11 = 1,
        iI1iI1Ii = 0;
      if (lI1IIii1) for (ll1l1l11 = 0, iili11i1 = lI1IIii1.length - 1; iili11i1 >= 0; iili11i1--) {
        ll1l1l11 = 0 !== (iI1iI1Ii = 266338304 & (ll1l1l11 = (ll1l1l11 << 6 & 268435455) + (iI1iI1Ii = lI1IIii1.charCodeAt(iili11i1)) + (iI1iI1Ii << 14))) ? ll1l1l11 ^ iI1iI1Ii >> 21 : ll1l1l11;
      }
      return ll1l1l11;
    }
    ["isPrey"](iIlIiIi) {
      if (iIlIiIi >= 100) return !0;
      var Ili1I11 = this.lr.uuid,
        lliIlii = Ili1I11.substr(Ili1I11.length - 2);
      return !!lliIlii && 1 * lliIlii < iIlIiIi;
    }
    ["isEmbedded"]() {
      var IIilIi1 = this.navigator.userAgent || "";
      return /^(jdapp|jdltapp|jdpingou);/.test(IIilIi1) || this.isJdLog();
    }
    ["isJdLog"]() {
      return (this.navigator.userAgent || "").indexOf(";jdlog;") > -1;
    }
    ["getPageParamFromSdk"]() {
      var IiIiiilI, iilIii;
      try {
        this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? iilIii = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? iilIii = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (iilIii = this.window.prompt("JDMAGetMPageParam", ""));
        iilIii && (IiIiiilI = JSON.parse(iilIii));
      } catch (i1I1ilii) {}
      return IiIiiilI;
    }
    ["time"](iiilIlll, lillIi11 = null) {
      const IIii1iII = lillIi11 ? new Date(lillIi11) : new Date();
      let II1liII = {
        "M+": IIii1iII.getMonth() + 1,
        "d+": IIii1iII.getDate(),
        "H+": IIii1iII.getHours(),
        "m+": IIii1iII.getMinutes(),
        "s+": IIii1iII.getSeconds(),
        "q+": Math.floor((IIii1iII.getMonth() + 3) / 3),
        "S": IIii1iII.getMilliseconds()
      };
      /(y+)/.test(iiilIlll) && (iiilIlll = iiilIlll.replace(RegExp.$1, (IIii1iII.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let iIl1lll1 in II1liII) new RegExp("(" + iIl1lll1 + ")").test(iiilIlll) && (iiilIlll = iiilIlll.replace(RegExp.$1, 1 == RegExp.$1.length ? II1liII[iIl1lll1] : ("00" + II1liII[iIl1lll1]).substr(("" + II1liII[iIl1lll1]).length)));
      return iiilIlll;
    }
  }
  Ii1iIilI = new llI1IIii();
}
function randomString(ll1iii1) {
  ll1iii1 = ll1iii1 || 32;
  let i1ilii1l = "abcdef0123456789",
    IlIiIIl = i1ilii1l.length,
    l1IIl11l = "";
  for (i = 0; i < ll1iii1; i++) l1IIl11l += i1ilii1l.charAt(Math.floor(Math.random() * IlIiIIl));
  return l1IIl11l;
}

const navigator = {
  userAgent: `jdapp;iPhone;10.1.4;14.3;${$.CryptoJS.SHA1(randomString(40)).toString()};M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
  plugins: { length: 0 },
  language: "zh-CN",
};
const screen = {
  availHeight: 812,
  availWidth: 375,
  colorDepth: 24,
  height: 812,
  width: 375,
  pixelDepth: 24,
};
const window = {};
const document = {
  location: {
    ancestorOrigins: {},
    href: "https://prodev.m.jd.com/mall/active/3nNmntNrufZjkZF1XJJKknDuCbaQ/index.html",
    origin: "https://prodev.m.jd.com",
    protocol: "https:",
    host: "prodev.m.jd.com",
    hostname: "prodev.m.jd.com",
    port: "",
    pathname: "/mall/active/3nNmntNrufZjkZF1XJJKknDuCbaQ/index.html",
    search: "",
    hash: "",
  },
};
var start_time = new Date().getTime(),
  _jdfp_canvas_md5 = "",
  _jdfp_webgl_md5 = "",
  _fingerprint_step = 1,
  _JdEid = "",
  _eidFlag = !1,
  risk_jd_local_fingerprint = "",
  _jd_e_joint_;

function generateUuid() {
    var t = Math
    for (
        var g = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split(""),
        m = 0,
        a = g.length;
        m < a;
        m++
    )
        switch (g[m]) {
        case "x":
            g[m] = t.floor(16 * t.random()).toString(16);
            break;
        case "y":
            g[m] = (t.floor(4 * t.random()) + 8).toString(16);
        }
    return g.join("");
}
function t(a) {
  if (null == a || void 0 == a || "" == a) return "NA";
  if (null == a || void 0 == a || "" == a) var b = "";
  else {
    b = [];
    for (var c = 0; c < 8 * a.length; c += 8)
      b[c >> 5] |= (a.charCodeAt(c / 8) & 255) << c % 32;
  }
  a = 8 * a.length;
  b[a >> 5] |= 128 << a % 32;
  b[(((a + 64) >>> 9) << 4) + 14] = a;
  a = 1732584193;
  c = -271733879;
  for (var l = -1732584194, h = 271733878, q = 0; q < b.length; q += 16) {
    var z = a,
      C = c,
      D = l,
      B = h;
    a = v(a, c, l, h, b[q + 0], 7, -680876936);
    h = v(h, a, c, l, b[q + 1], 12, -389564586);
    l = v(l, h, a, c, b[q + 2], 17, 606105819);
    c = v(c, l, h, a, b[q + 3], 22, -1044525330);
    a = v(a, c, l, h, b[q + 4], 7, -176418897);
    h = v(h, a, c, l, b[q + 5], 12, 1200080426);
    l = v(l, h, a, c, b[q + 6], 17, -1473231341);
    c = v(c, l, h, a, b[q + 7], 22, -45705983);
    a = v(a, c, l, h, b[q + 8], 7, 1770035416);
    h = v(h, a, c, l, b[q + 9], 12, -1958414417);
    l = v(l, h, a, c, b[q + 10], 17, -42063);
    c = v(c, l, h, a, b[q + 11], 22, -1990404162);
    a = v(a, c, l, h, b[q + 12], 7, 1804603682);
    h = v(h, a, c, l, b[q + 13], 12, -40341101);
    l = v(l, h, a, c, b[q + 14], 17, -1502002290);
    c = v(c, l, h, a, b[q + 15], 22, 1236535329);
    a = x(a, c, l, h, b[q + 1], 5, -165796510);
    h = x(h, a, c, l, b[q + 6], 9, -1069501632);
    l = x(l, h, a, c, b[q + 11], 14, 643717713);
    c = x(c, l, h, a, b[q + 0], 20, -373897302);
    a = x(a, c, l, h, b[q + 5], 5, -701558691);
    h = x(h, a, c, l, b[q + 10], 9, 38016083);
    l = x(l, h, a, c, b[q + 15], 14, -660478335);
    c = x(c, l, h, a, b[q + 4], 20, -405537848);
    a = x(a, c, l, h, b[q + 9], 5, 568446438);
    h = x(h, a, c, l, b[q + 14], 9, -1019803690);
    l = x(l, h, a, c, b[q + 3], 14, -187363961);
    c = x(c, l, h, a, b[q + 8], 20, 1163531501);
    a = x(a, c, l, h, b[q + 13], 5, -1444681467);
    h = x(h, a, c, l, b[q + 2], 9, -51403784);
    l = x(l, h, a, c, b[q + 7], 14, 1735328473);
    c = x(c, l, h, a, b[q + 12], 20, -1926607734);
    a = u(c ^ l ^ h, a, c, b[q + 5], 4, -378558);
    h = u(a ^ c ^ l, h, a, b[q + 8], 11, -2022574463);
    l = u(h ^ a ^ c, l, h, b[q + 11], 16, 1839030562);
    c = u(l ^ h ^ a, c, l, b[q + 14], 23, -35309556);
    a = u(c ^ l ^ h, a, c, b[q + 1], 4, -1530992060);
    h = u(a ^ c ^ l, h, a, b[q + 4], 11, 1272893353);
    l = u(h ^ a ^ c, l, h, b[q + 7], 16, -155497632);
    c = u(l ^ h ^ a, c, l, b[q + 10], 23, -1094730640);
    a = u(c ^ l ^ h, a, c, b[q + 13], 4, 681279174);
    h = u(a ^ c ^ l, h, a, b[q + 0], 11, -358537222);
    l = u(h ^ a ^ c, l, h, b[q + 3], 16, -722521979);
    c = u(l ^ h ^ a, c, l, b[q + 6], 23, 76029189);
    a = u(c ^ l ^ h, a, c, b[q + 9], 4, -640364487);
    h = u(a ^ c ^ l, h, a, b[q + 12], 11, -421815835);
    l = u(h ^ a ^ c, l, h, b[q + 15], 16, 530742520);
    c = u(l ^ h ^ a, c, l, b[q + 2], 23, -995338651);
    a = w(a, c, l, h, b[q + 0], 6, -198630844);
    h = w(h, a, c, l, b[q + 7], 10, 1126891415);
    l = w(l, h, a, c, b[q + 14], 15, -1416354905);
    c = w(c, l, h, a, b[q + 5], 21, -57434055);
    a = w(a, c, l, h, b[q + 12], 6, 1700485571);
    h = w(h, a, c, l, b[q + 3], 10, -1894986606);
    l = w(l, h, a, c, b[q + 10], 15, -1051523);
    c = w(c, l, h, a, b[q + 1], 21, -2054922799);
    a = w(a, c, l, h, b[q + 8], 6, 1873313359);
    h = w(h, a, c, l, b[q + 15], 10, -30611744);
    l = w(l, h, a, c, b[q + 6], 15, -1560198380);
    c = w(c, l, h, a, b[q + 13], 21, 1309151649);
    a = w(a, c, l, h, b[q + 4], 6, -145523070);
    h = w(h, a, c, l, b[q + 11], 10, -1120210379);
    l = w(l, h, a, c, b[q + 2], 15, 718787259);
    c = w(c, l, h, a, b[q + 9], 21, -343485551);
    a = A(a, z);
    c = A(c, C);
    l = A(l, D);
    h = A(h, B);
  }
  b = [a, c, l, h];
  a = "";
  for (c = 0; c < 4 * b.length; c++)
    a +=
      "0123456789abcdef".charAt((b[c >> 2] >> ((c % 4) * 8 + 4)) & 15) +
      "0123456789abcdef".charAt((b[c >> 2] >> ((c % 4) * 8)) & 15);
  return a;
}

function u(a, b, c, l, h, q) {
  a = A(A(b, a), A(l, q));
  return A((a << h) | (a >>> (32 - h)), c);
}

function v(a, b, c, l, h, q, z) {
  return u((b & c) | (~b & l), a, b, h, q, z);
}

function x(a, b, c, l, h, q, z) {
  return u((b & l) | (c & ~l), a, b, h, q, z);
}

function w(a, b, c, l, h, q, z) {
  return u(c ^ (b | ~l), a, b, h, q, z);
}

function A(a, b) {
  var c = (a & 65535) + (b & 65535);
  return (((a >> 16) + (b >> 16) + (c >> 16)) << 16) | (c & 65535);
}
_fingerprint_step = 2;
var y = "",
  n = navigator.userAgent.toLowerCase();
n.indexOf("jdapp") && (n = n.substring(0, 90));
var e = navigator.language,
  f = n;
-1 != f.indexOf("ipad") ||
  -1 != f.indexOf("iphone os") ||
  -1 != f.indexOf("midp") ||
  -1 != f.indexOf("rv:1.2.3.4") ||
  -1 != f.indexOf("ucweb") ||
  -1 != f.indexOf("android") ||
  -1 != f.indexOf("windows ce") ||
  f.indexOf("windows mobile");
var r = "NA",
  k = "NA";
try {
  -1 != f.indexOf("win") &&
    -1 != f.indexOf("95") &&
    ((r = "windows"), (k = "95")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("98") &&
      ((r = "windows"), (k = "98")),
    -1 != f.indexOf("win 9x") &&
      -1 != f.indexOf("4.90") &&
      ((r = "windows"), (k = "me")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt 5.0") &&
      ((r = "windows"), (k = "2000")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt") &&
      ((r = "windows"), (k = "NT")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt 5.1") &&
      ((r = "windows"), (k = "xp")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("32") &&
      ((r = "windows"), (k = "32")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt 5.1") &&
      ((r = "windows"), (k = "7")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("6.0") &&
      ((r = "windows"), (k = "8")),
    -1 == f.indexOf("win") ||
      (-1 == f.indexOf("nt 6.0") && -1 == f.indexOf("nt 6.1")) ||
      ((r = "windows"), (k = "9")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt 6.2") &&
      ((r = "windows"), (k = "10")),
    -1 != f.indexOf("linux") && (r = "linux"),
    -1 != f.indexOf("unix") && (r = "unix"),
    -1 != f.indexOf("sun") && -1 != f.indexOf("os") && (r = "sun os"),
    -1 != f.indexOf("ibm") && -1 != f.indexOf("os") && (r = "ibm os/2"),
    -1 != f.indexOf("mac") && -1 != f.indexOf("pc") && (r = "mac"),
    -1 != f.indexOf("aix") && (r = "aix"),
    -1 != f.indexOf("powerpc") && (r = "powerPC"),
    -1 != f.indexOf("hpux") && (r = "hpux"),
    -1 != f.indexOf("netbsd") && (r = "NetBSD"),
    -1 != f.indexOf("bsd") && (r = "BSD"),
    -1 != f.indexOf("osf1") && (r = "OSF1"),
    -1 != f.indexOf("irix") && ((r = "IRIX"), (k = "")),
    -1 != f.indexOf("freebsd") && (r = "FreeBSD"),
    -1 != f.indexOf("symbianos") &&
      ((r = "SymbianOS"), (k = f.substring(f.indexOf("SymbianOS/") + 10, 3)));
} catch (a) {}
_fingerprint_step = 3;
var g = "NA",
  m = "NA";
try {
  -1 != f.indexOf("msie") &&
    ((g = "ie"),
    (m = f.substring(f.indexOf("msie ") + 5)),
    m.indexOf(";") && (m = m.substring(0, m.indexOf(";"))));
  -1 != f.indexOf("firefox") &&
    ((g = "Firefox"), (m = f.substring(f.indexOf("firefox/") + 8)));
  -1 != f.indexOf("opera") &&
    ((g = "Opera"), (m = f.substring(f.indexOf("opera/") + 6, 4)));
  -1 != f.indexOf("safari") &&
    ((g = "safari"), (m = f.substring(f.indexOf("safari/") + 7)));
  -1 != f.indexOf("chrome") &&
    ((g = "chrome"),
    (m = f.substring(f.indexOf("chrome/") + 7)),
    m.indexOf(" ") && (m = m.substring(0, m.indexOf(" "))));
  -1 != f.indexOf("navigator") &&
    ((g = "navigator"), (m = f.substring(f.indexOf("navigator/") + 10)));
  -1 != f.indexOf("applewebkit") &&
    ((g = "applewebkit_chrome"),
    (m = f.substring(f.indexOf("applewebkit/") + 12)),
    m.indexOf(" ") && (m = m.substring(0, m.indexOf(" "))));
  -1 != f.indexOf("sogoumobilebrowser") &&
    (g = "\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668");
  if (-1 != f.indexOf("ucbrowser") || -1 != f.indexOf("ucweb"))
    g = "UC\u6d4f\u89c8\u5668";
  if (-1 != f.indexOf("qqbrowser") || -1 != f.indexOf("tencenttraveler"))
    g = "QQ\u6d4f\u89c8\u5668";
  -1 != f.indexOf("metasr") && (g = "\u641c\u72d7\u6d4f\u89c8\u5668");
  -1 != f.indexOf("360se") && (g = "360\u6d4f\u89c8\u5668");
  -1 != f.indexOf("the world") &&
    (g = "\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668");
  -1 != f.indexOf("maxthon") && (g = "\u9068\u6e38\u6d4f\u89c8\u5668");
} catch (a) {}

class JdJrTdRiskFinger {
  f = {
    options: function () {
      return {};
    },
    nativeForEach: Array.prototype.forEach,
    nativeMap: Array.prototype.map,
    extend: function (a, b) {
      if (null == a) return b;
      for (var c in a) null != a[c] && b[c] !== a[c] && (b[c] = a[c]);
      return b;
    },
    getData: function () {
      return y;
    },
    get: function (a) {
      var b = 1 * m,
        c = [];
      "ie" == g && 7 <= b
        ? (c.push(n),
          c.push(e),
          (y = y + ",'userAgent':'" + t(n) + "','language':'" + e + "'"),
          this.browserRedirect(n))
        : ((c = this.userAgentKey(c)), (c = this.languageKey(c)));
      c.push(g);
      c.push(m);
      c.push(r);
      c.push(k);
      y =
        y +
        ",'os':'" +
        r +
        "','osVersion':'" +
        k +
        "','browser':'" +
        g +
        "','browserVersion':'" +
        m +
        "'";
      c = this.colorDepthKey(c);
      c = this.screenResolutionKey(c);
      c = this.timezoneOffsetKey(c);
      c = this.sessionStorageKey(c);
      c = this.localStorageKey(c);
      c = this.indexedDbKey(c);
      c = this.addBehaviorKey(c);
      c = this.openDatabaseKey(c);
      c = this.cpuClassKey(c);
      c = this.platformKey(c);
      c = this.hardwareConcurrencyKey(c);
      c = this.doNotTrackKey(c);
      c = this.pluginsKey(c);
      c = this.canvasKey(c);
      c = this.webglKey(c);
      b = this.x64hash128(c.join("~~~"), 31);
      return a(b);
    },
    userAgentKey: function (a) {
      a.push(navigator.userAgent),
        (y = y + ",'userAgent':'" + t(navigator.userAgent) + "'"),
        this.browserRedirect(navigator.userAgent);
      return a;
    },
    replaceAll: function (a, b, c) {
      for (; 0 <= a.indexOf(b); ) a = a.replace(b, c);
      return a;
    },
    browserRedirect: function (a) {
      var b = a.toLowerCase();
      a = "ipad" == b.match(/ipad/i);
      var c = "iphone os" == b.match(/iphone os/i),
        l = "midp" == b.match(/midp/i),
        h = "rv:1.2.3.4" == b.match(/rv:1.2.3.4/i),
        q = "ucweb" == b.match(/ucweb/i),
        z = "android" == b.match(/android/i),
        C = "windows ce" == b.match(/windows ce/i);
      b = "windows mobile" == b.match(/windows mobile/i);
      y =
        a || c || l || h || q || z || C || b
          ? y + ",'origin':'mobile'"
          : y + ",'origin':'pc'";
    },
    languageKey: function (a) {
      "" ||
        (a.push(navigator.language),
        (y =
          y +
          ",'language':'" +
          this.replaceAll(navigator.language, " ", "_") +
          "'"));
      return a;
    },
    colorDepthKey: function (a) {
      "" ||
        (a.push(screen.colorDepth),
        (y = y + ",'colorDepth':'" + screen.colorDepth + "'"));
      return a;
    },
    screenResolutionKey: function (a) {
      if (!this.options.excludeScreenResolution) {
        var b = this.getScreenResolution();
        "undefined" !== typeof b &&
          (a.push(b.join("x")),
          (y = y + ",'screenResolution':'" + b.join("x") + "'"));
      }
      return a;
    },
    getScreenResolution: function () {
      return this.options.detectScreenOrientation
        ? screen.height > screen.width
          ? [screen.height, screen.width]
          : [screen.width, screen.height]
        : [screen.height, screen.width];
    },
    timezoneOffsetKey: function (a) {
      this.options.excludeTimezoneOffset ||
        (a.push(new Date().getTimezoneOffset()),
        (y =
          y +
          ",'timezoneOffset':'" +
          new Date().getTimezoneOffset() / 60 +
          "'"));
      return a;
    },
    sessionStorageKey: function (a) {
      !this.options.excludeSessionStorage &&
        this.hasSessionStorage() &&
        (a.push("sessionStorageKey"), (y += ",'sessionStorage':true"));
      return a;
    },
    localStorageKey: function (a) {
      !this.options.excludeSessionStorage &&
        this.hasLocalStorage() &&
        (a.push("localStorageKey"), (y += ",'localStorage':true"));
      return a;
    },
    indexedDbKey: function (a) {
      !this.options.excludeIndexedDB &&
        this.hasIndexedDB() &&
        (a.push("indexedDbKey"), (y += ",'indexedDb':true"));
      return a;
    },
    addBehaviorKey: function (a) {
      document.body &&
      !this.options.excludeAddBehavior &&
      document.body.addBehavior
        ? (a.push("addBehaviorKey"), (y += ",'addBehavior':true"))
        : (y += ",'addBehavior':false");
      return a;
    },
    openDatabaseKey: function (a) {
      !this.options.excludeOpenDatabase && window.openDatabase
        ? (a.push("openDatabase"), (y += ",'openDatabase':true"))
        : (y += ",'openDatabase':false");
      return a;
    },
    cpuClassKey: function (a) {
      this.options.excludeCpuClass ||
        (a.push(this.getNavigatorCpuClass()),
        (y = y + ",'cpu':'" + this.getNavigatorCpuClass() + "'"));
      return a;
    },
    platformKey: function (a) {
      this.options.excludePlatform ||
        (a.push(this.getNavigatorPlatform()),
        (y = y + ",'platform':'" + this.getNavigatorPlatform() + "'"));
      return a;
    },
    hardwareConcurrencyKey: function (a) {
      var b = this.getHardwareConcurrency();
      a.push(b);
      y = y + ",'ccn':'" + b + "'";
      return a;
    },
    doNotTrackKey: function (a) {
      this.options.excludeDoNotTrack ||
        (a.push(this.getDoNotTrack()),
        (y = y + ",'track':'" + this.getDoNotTrack() + "'"));
      return a;
    },
    canvasKey: function (a) {
      if (!this.options.excludeCanvas && this.isCanvasSupported()) {
        var b = this.getCanvasFp();
        a.push(b);
        _jdfp_canvas_md5 = t(b);
        y = y + ",'canvas':'" + _jdfp_canvas_md5 + "'";
      }
      return a;
    },
    webglKey: function (a) {
      if (!this.options.excludeWebGL && this.isCanvasSupported()) {
        var b = this.getWebglFp();
        _jdfp_webgl_md5 = t(b);
        a.push(b);
        y = y + ",'webglFp':'" + _jdfp_webgl_md5 + "'";
      }
      return a;
    },
    pluginsKey: function (a) {
      this.isIE()
        ? (a.push(this.getIEPluginsString()),
          (y = y + ",'plugins':'" + t(this.getIEPluginsString()) + "'"))
        : (a.push(this.getRegularPluginsString()),
          (y = y + ",'plugins':'" + t(this.getRegularPluginsString()) + "'"));
      return a;
    },
    getRegularPluginsString: function () {
      return this.map(
        navigator.plugins,
        function (a) {
          var b = this.map(a, function (c) {
            return [c.type, c.suffixes].join("~");
          }).join(",");
          return [a.name, a.description, b].join("::");
        },
        this
      ).join(";");
    },
    getIEPluginsString: function () {
      return window.ActiveXObject
        ? this.map(
            "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1".split(
              ";"
            ),
            function (a) {
              try {
                return new ActiveXObject(a), a;
              } catch (b) {
                return null;
              }
            }
          ).join(";")
        : "";
    },
    hasSessionStorage: function () {
      try {
        return !!window.sessionStorage;
      } catch (a) {
        return !0;
      }
    },
    hasLocalStorage: function () {
      try {
        return !!window.localStorage;
      } catch (a) {
        return !0;
      }
    },
    hasIndexedDB: function () {
      return true;
      return !!window.indexedDB;
    },
    getNavigatorCpuClass: function () {
      return navigator.cpuClass ? navigator.cpuClass : "NA";
    },
    getNavigatorPlatform: function () {
      return navigator.platform ? navigator.platform : "NA";
    },
    getHardwareConcurrency: function () {
      return navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency
        : "NA";
    },
    getDoNotTrack: function () {
      return navigator.doNotTrack ? navigator.doNotTrack : "NA";
    },
    getCanvasFp: function () {
      return "";
      var a = navigator.userAgent.toLowerCase();
      if (
        (0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) &&
        (0 < a.indexOf("iphone") || 0 < a.indexOf("ipad"))
      )
        return null;
      a = document.createElement("canvas");
      var b = a.getContext("2d");
      b.fillStyle = "red";
      b.fillRect(30, 10, 200, 100);
      b.strokeStyle = "#1a3bc1";
      b.lineWidth = 6;
      b.lineCap = "round";
      b.arc(50, 50, 20, 0, Math.PI, !1);
      b.stroke();
      b.fillStyle = "#42e1a2";
      b.font = "15.4px 'Arial'";
      b.textBaseline = "alphabetic";
      b.fillText("PR flacks quiz gym: TV DJ box when? \u2620", 15, 60);
      b.shadowOffsetX = 1;
      b.shadowOffsetY = 2;
      b.shadowColor = "white";
      b.fillStyle = "rgba(0, 0, 200, 0.5)";
      b.font = "60px 'Not a real font'";
      b.fillText("No\u9a97", 40, 80);
      return a.toDataURL();
    },
    getWebglFp: function () {
      var a = navigator.userAgent;
      a = a.toLowerCase();
      if (
        (0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) &&
        (0 < a.indexOf("iphone") || 0 < a.indexOf("ipad"))
      )
        return null;
      a = function (D) {
        b.clearColor(0, 0, 0, 1);
        b.enable(b.DEPTH_TEST);
        b.depthFunc(b.LEQUAL);
        b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
        return "[" + D[0] + ", " + D[1] + "]";
      };
      var b = this.getWebglCanvas();
      if (!b) return null;
      var c = [],
        l = b.createBuffer();
      b.bindBuffer(b.ARRAY_BUFFER, l);
      var h = new Float32Array([
        -0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0,
      ]);
      b.bufferData(b.ARRAY_BUFFER, h, b.STATIC_DRAW);
      l.itemSize = 3;
      l.numItems = 3;
      h = b.createProgram();
      var q = b.createShader(b.VERTEX_SHADER);
      b.shaderSource(
        q,
        "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"
      );
      b.compileShader(q);
      var z = b.createShader(b.FRAGMENT_SHADER);
      b.shaderSource(
        z,
        "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"
      );
      b.compileShader(z);
      b.attachShader(h, q);
      b.attachShader(h, z);
      b.linkProgram(h);
      b.useProgram(h);
      h.vertexPosAttrib = b.getAttribLocation(h, "attrVertex");
      h.offsetUniform = b.getUniformLocation(h, "uniformOffset");
      b.enableVertexAttribArray(h.vertexPosArray);
      b.vertexAttribPointer(h.vertexPosAttrib, l.itemSize, b.FLOAT, !1, 0, 0);
      b.uniform2f(h.offsetUniform, 1, 1);
      b.drawArrays(b.TRIANGLE_STRIP, 0, l.numItems);
      null != b.canvas && c.push(b.canvas.toDataURL());
      c.push("extensions:" + b.getSupportedExtensions().join(";"));
      c.push("extensions:" + b.getSupportedExtensions().join(";"));
      c.push("w1" + a(b.getParameter(b.ALIASED_LINE_WIDTH_RANGE)));
      c.push("w2" + a(b.getParameter(b.ALIASED_POINT_SIZE_RANGE)));
      c.push("w3" + b.getParameter(b.ALPHA_BITS));
      c.push("w4" + (b.getContextAttributes().antialias ? "yes" : "no"));
      c.push("w5" + b.getParameter(b.BLUE_BITS));
      c.push("w6" + b.getParameter(b.DEPTH_BITS));
      c.push("w7" + b.getParameter(b.GREEN_BITS));
      c.push(
        "w8" +
          (function (D) {
            var B,
              F =
                D.getExtension("EXT_texture_filter_anisotropic") ||
                D.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
                D.getExtension("MOZ_EXT_texture_filter_anisotropic");
            return F
              ? ((B = D.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),
                0 === B && (B = 2),
                B)
              : null;
          })(b)
      );
      c.push("w9" + b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
      c.push("w10" + b.getParameter(b.MAX_CUBE_MAP_TEXTURE_SIZE));
      c.push("w11" + b.getParameter(b.MAX_FRAGMENT_UNIFORM_VECTORS));
      c.push("w12" + b.getParameter(b.MAX_RENDERBUFFER_SIZE));
      c.push("w13" + b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS));
      c.push("w14" + b.getParameter(b.MAX_TEXTURE_SIZE));
      c.push("w15" + b.getParameter(b.MAX_VARYING_VECTORS));
      c.push("w16" + b.getParameter(b.MAX_VERTEX_ATTRIBS));
      c.push("w17" + b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
      c.push("w18" + b.getParameter(b.MAX_VERTEX_UNIFORM_VECTORS));
      c.push("w19" + a(b.getParameter(b.MAX_VIEWPORT_DIMS)));
      c.push("w20" + b.getParameter(b.RED_BITS));
      c.push("w21" + b.getParameter(b.RENDERER));
      c.push("w22" + b.getParameter(b.SHADING_LANGUAGE_VERSION));
      c.push("w23" + b.getParameter(b.STENCIL_BITS));
      c.push("w24" + b.getParameter(b.VENDOR));
      c.push("w25" + b.getParameter(b.VERSION));
      try {
        var C = b.getExtension("WEBGL_debug_renderer_info");
        C &&
          (c.push("wuv:" + b.getParameter(C.UNMASKED_VENDOR_WEBGL)),
          c.push("wur:" + b.getParameter(C.UNMASKED_RENDERER_WEBGL)));
      } catch (D) {}
      return c.join("\u00a7");
    },
    isCanvasSupported: function () {
      return true;
      var a = document.createElement("canvas");
      return !(!a.getContext || !a.getContext("2d"));
    },
    isIE: function () {
      return "Microsoft Internet Explorer" === navigator.appName ||
        ("Netscape" === navigator.appName &&
          /Trident/.test(navigator.userAgent))
        ? !0
        : !1;
    },
    getWebglCanvas: function () {
      return null;
      var a = document.createElement("canvas"),
        b = null;
      try {
        var c = navigator.userAgent;
        c = c.toLowerCase();
        ((0 < c.indexOf("jdjr-app") || 0 <= c.indexOf("jdapp")) &&
          (0 < c.indexOf("iphone") || 0 < c.indexOf("ipad"))) ||
          (b = a.getContext("webgl") || a.getContext("experimental-webgl"));
      } catch (l) {}
      b || (b = null);
      return b;
    },
    each: function (a, b, c) {
      if (null !== a)
        if (this.nativeForEach && a.forEach === this.nativeForEach)
          a.forEach(b, c);
        else if (a.length === +a.length)
          for (
            var l = 0, h = a.length;
            l < h && b.call(c, a[l], l, a) !== {};
            l++
          );
        else
          for (l in a)
            if (a.hasOwnProperty(l) && b.call(c, a[l], l, a) === {}) break;
    },
    map: function (a, b, c) {
      var l = [];
      if (null == a) return l;
      if (this.nativeMap && a.map === this.nativeMap) return a.map(b, c);
      this.each(a, function (h, q, z) {
        l[l.length] = b.call(c, h, q, z);
      });
      return l;
    },
    x64Add: function (a, b) {
      a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
      b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
      var c = [0, 0, 0, 0];
      c[3] += a[3] + b[3];
      c[2] += c[3] >>> 16;
      c[3] &= 65535;
      c[2] += a[2] + b[2];
      c[1] += c[2] >>> 16;
      c[2] &= 65535;
      c[1] += a[1] + b[1];
      c[0] += c[1] >>> 16;
      c[1] &= 65535;
      c[0] += a[0] + b[0];
      c[0] &= 65535;
      return [(c[0] << 16) | c[1], (c[2] << 16) | c[3]];
    },
    x64Multiply: function (a, b) {
      a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
      b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
      var c = [0, 0, 0, 0];
      c[3] += a[3] * b[3];
      c[2] += c[3] >>> 16;
      c[3] &= 65535;
      c[2] += a[2] * b[3];
      c[1] += c[2] >>> 16;
      c[2] &= 65535;
      c[2] += a[3] * b[2];
      c[1] += c[2] >>> 16;
      c[2] &= 65535;
      c[1] += a[1] * b[3];
      c[0] += c[1] >>> 16;
      c[1] &= 65535;
      c[1] += a[2] * b[2];
      c[0] += c[1] >>> 16;
      c[1] &= 65535;
      c[1] += a[3] * b[1];
      c[0] += c[1] >>> 16;
      c[1] &= 65535;
      c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0];
      c[0] &= 65535;
      return [(c[0] << 16) | c[1], (c[2] << 16) | c[3]];
    },
    x64Rotl: function (a, b) {
      b %= 64;
      if (32 === b) return [a[1], a[0]];
      if (32 > b)
        return [
          (a[0] << b) | (a[1] >>> (32 - b)),
          (a[1] << b) | (a[0] >>> (32 - b)),
        ];
      b -= 32;
      return [
        (a[1] << b) | (a[0] >>> (32 - b)),
        (a[0] << b) | (a[1] >>> (32 - b)),
      ];
    },
    x64LeftShift: function (a, b) {
      b %= 64;
      return 0 === b
        ? a
        : 32 > b
        ? [(a[0] << b) | (a[1] >>> (32 - b)), a[1] << b]
        : [a[1] << (b - 32), 0];
    },
    x64Xor: function (a, b) {
      return [a[0] ^ b[0], a[1] ^ b[1]];
    },
    x64Fmix: function (a) {
      a = this.x64Xor(a, [0, a[0] >>> 1]);
      a = this.x64Multiply(a, [4283543511, 3981806797]);
      a = this.x64Xor(a, [0, a[0] >>> 1]);
      a = this.x64Multiply(a, [3301882366, 444984403]);
      return (a = this.x64Xor(a, [0, a[0] >>> 1]));
    },
    x64hash128: function (a, b) {
      a = a || "";
      b = b || 0;
      var c = a.length % 16,
        l = a.length - c,
        h = [0, b];
      b = [0, b];
      for (
        var q,
          z,
          C = [2277735313, 289559509],
          D = [1291169091, 658871167],
          B = 0;
        B < l;
        B += 16
      )
        (q = [
          (a.charCodeAt(B + 4) & 255) |
            ((a.charCodeAt(B + 5) & 255) << 8) |
            ((a.charCodeAt(B + 6) & 255) << 16) |
            ((a.charCodeAt(B + 7) & 255) << 24),
          (a.charCodeAt(B) & 255) |
            ((a.charCodeAt(B + 1) & 255) << 8) |
            ((a.charCodeAt(B + 2) & 255) << 16) |
            ((a.charCodeAt(B + 3) & 255) << 24),
        ]),
          (z = [
            (a.charCodeAt(B + 12) & 255) |
              ((a.charCodeAt(B + 13) & 255) << 8) |
              ((a.charCodeAt(B + 14) & 255) << 16) |
              ((a.charCodeAt(B + 15) & 255) << 24),
            (a.charCodeAt(B + 8) & 255) |
              ((a.charCodeAt(B + 9) & 255) << 8) |
              ((a.charCodeAt(B + 10) & 255) << 16) |
              ((a.charCodeAt(B + 11) & 255) << 24),
          ]),
          (q = this.x64Multiply(q, C)),
          (q = this.x64Rotl(q, 31)),
          (q = this.x64Multiply(q, D)),
          (h = this.x64Xor(h, q)),
          (h = this.x64Rotl(h, 27)),
          (h = this.x64Add(h, b)),
          (h = this.x64Add(this.x64Multiply(h, [0, 5]), [0, 1390208809])),
          (z = this.x64Multiply(z, D)),
          (z = this.x64Rotl(z, 33)),
          (z = this.x64Multiply(z, C)),
          (b = this.x64Xor(b, z)),
          (b = this.x64Rotl(b, 31)),
          (b = this.x64Add(b, h)),
          (b = this.x64Add(this.x64Multiply(b, [0, 5]), [0, 944331445]));
      q = [0, 0];
      z = [0, 0];
      switch (c) {
        case 15:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 14)], 48));
        case 14:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 13)], 40));
        case 13:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 12)], 32));
        case 12:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 11)], 24));
        case 11:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 10)], 16));
        case 10:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 9)], 8));
        case 9:
          (z = this.x64Xor(z, [0, a.charCodeAt(B + 8)])),
            (z = this.x64Multiply(z, D)),
            (z = this.x64Rotl(z, 33)),
            (z = this.x64Multiply(z, C)),
            (b = this.x64Xor(b, z));
        case 8:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 7)], 56));
        case 7:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 6)], 48));
        case 6:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 5)], 40));
        case 5:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 4)], 32));
        case 4:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 3)], 24));
        case 3:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 2)], 16));
        case 2:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 1)], 8));
        case 1:
          (q = this.x64Xor(q, [0, a.charCodeAt(B)])),
            (q = this.x64Multiply(q, C)),
            (q = this.x64Rotl(q, 31)),
            (q = this.x64Multiply(q, D)),
            (h = this.x64Xor(h, q));
      }
      h = this.x64Xor(h, [0, a.length]);
      b = this.x64Xor(b, [0, a.length]);
      h = this.x64Add(h, b);
      b = this.x64Add(b, h);
      h = this.x64Fmix(h);
      b = this.x64Fmix(b);
      h = this.x64Add(h, b);
      b = this.x64Add(b, h);
      return (
        ("00000000" + (h[0] >>> 0).toString(16)).slice(-8) +
        ("00000000" + (h[1] >>> 0).toString(16)).slice(-8) +
        ("00000000" + (b[0] >>> 0).toString(16)).slice(-8) +
        ("00000000" + (b[1] >>> 0).toString(16)).slice(-8)
      );
    },
  };
}

class JDDMAC {
  static t() {
    return "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D"
      .split(" ")
      .map(function (v) {
        return parseInt(v, 16);
      });
  }

  mac(v) {
    for (var x = -1, w = 0, A = v.length; w < A; w++)
      x = (x >>> 8) ^ t[(x ^ v.charCodeAt(w)) & 255];
    return (x ^ -1) >>> 0;
  }
}

var _CurrentPageProtocol =
    "https:" == document.location.protocol ? "https://" : "http://",
  _JdJrTdRiskDomainName = window.__fp_domain || "gia.jd.com",
  _url_query_str = "",
  _root_domain = "",
  _CurrentPageUrl = (function () {
    var t = document.location.href.toString();
    try {
      _root_domain =
        /^https?:\/\/(?:\w+\.)*?(\w*\.(?:com\.cn|cn|com|net|id))[\\\/]*/.exec(
          t
        )[1];
    } catch (v) {}
    var u = t.indexOf("?");
    0 < u &&
      ((_url_query_str = t.substring(u + 1)),
      500 < _url_query_str.length &&
        (_url_query_str = _url_query_str.substring(0, 499)),
      (t = t.substring(0, u)));
    return (t = t.substring(_CurrentPageProtocol.length));
  })(),
  jd_shadow__ = (function () {
    try {
      var t = $.CryptoJS,
        u = [];
      u.push(_CurrentPageUrl);
      var v = generateUuid();
      u.push(v);
      var x = new Date().getTime();
      u.push(x);
      var w = t.SHA1(u.join("")).toString().toUpperCase();
      u = [];
      u.push("JD3");
      u.push(w);
      var A = new JDDMAC().mac(u.join(""));
      u.push(A);
      var y = t.enc.Hex.parse("30313233343536373839616263646566"),
        n = t.enc.Hex.parse("4c5751554935255042304e6458323365"),
        e = u.join("");
      return t.AES.encrypt(t.enc.Utf8.parse(e), n, {
        mode: t.mode.CBC,
        padding: t.pad.Pkcs7,
        iv: y,
      }).ciphertext.toString(t.enc.Base32);
    } catch (f) {
      console.log(f);
    }
  })();
var td_collect = new (function () {
  function t() {
    var n =
      window.webkitRTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.RTCPeerConnection;
    if (n) {
      var e = function (k) {
          var g = /([0-9]{1,3}(\.[0-9]{1,3}){3})/,
            m =
              /\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*/;
          try {
            var a = g.exec(k);
            if (null == a || 0 == a.length || void 0 == a) a = m.exec(k);
            var b = a[1];
            void 0 === f[b] && w.push(b);
            f[b] = !0;
          } catch (c) {}
        },
        f = {};
      try {
        var r = new n({
          iceServers: [
            {
              url: "stun:stun.services.mozilla.com",
            },
          ],
        });
      } catch (k) {}
      try {
        void 0 === r &&
          (r = new n({
            iceServers: [],
          }));
      } catch (k) {}
      if (r || window.mozRTCPeerConnection)
        try {
          r.createDataChannel("chat", {
            reliable: !1,
          });
        } catch (k) {}
      r &&
        ((r.onicecandidate = function (k) {
          k.candidate && e(k.candidate.candidate);
        }),
        r.createOffer(
          function (k) {
            r.setLocalDescription(
              k,
              function () {},
              function () {}
            );
          },
          function () {}
        ),
        setTimeout(function () {
          try {
            r.localDescription.sdp.split("\n").forEach(function (k) {
              0 === k.indexOf("a=candidate:") && e(k);
            });
          } catch (k) {}
        }, 800));
    }
  }

  function u(n) {
    var e;
    return (e = document.cookie.match(
      new RegExp("(^| )" + n + "=([^;]*)(;|$)")
    ))
      ? e[2]
      : "";
  }

  function v() {
    function n(g) {
      var m = {};
      r.style.fontFamily = g;
      document.body.appendChild(r);
      m.height = r.offsetHeight;
      m.width = r.offsetWidth;
      document.body.removeChild(r);
      return m;
    }

    var e = ["monospace", "sans-serif", "serif"],
      f = [],
      r = document.createElement("span");
    r.style.fontSize = "72px";
    r.style.visibility = "hidden";
    r.innerHTML = "mmmmmmmmmmlli";
    for (var k = 0; k < e.length; k++) f[k] = n(e[k]);
    this.checkSupportFont = function (g) {
      for (var m = 0; m < f.length; m++) {
        var a = n(g + "," + e[m]),
          b = f[m];
        if (a.height !== b.height || a.width !== b.width) return !0;
      }
      return !1;
    };
  }

  function x(n) {
    var e = {};
    e.name = n.name;
    e.filename = n.filename.toLowerCase();
    e.description = n.description;
    void 0 !== n.version && (e.version = n.version);
    e.mimeTypes = [];
    for (var f = 0; f < n.length; f++) {
      var r = n[f],
        k = {};
      k.description = r.description;
      k.suffixes = r.suffixes;
      k.type = r.type;
      e.mimeTypes.push(k);
    }
    return e;
  }

  this.bizId = "";
  this.bioConfig = {
    type: "42",
    operation: 1,
    duraTime: 2,
    interval: 50,
  };
  this.worder = null;
  this.deviceInfo = {
    userAgent: "",
    isJdApp: !1,
    isJrApp: !1,
    sdkToken: "",
    fp: "",
    eid: "",
  };
  this.isRpTok = !1;
  this.obtainLocal = function (n) {
    n = "undefined" !== typeof n && n ? !0 : !1;
    var e = {};
    try {
      var f = document.cookie.replace(
        /(?:(?:^|.*;\s*)3AB9D23F7A4B3C9B\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      0 !== f.length && (e.cookie = f);
    } catch (k) {}
    try {
      window.localStorage &&
        null !== window.localStorage &&
        0 !== window.localStorage.length &&
        (e.localStorage = window.localStorage.getItem("3AB9D23F7A4B3C9B"));
    } catch (k) {}
    try {
      window.sessionStorage &&
        null !== window.sessionStorage &&
        (e.sessionStorage = window.sessionStorage["3AB9D23F7A4B3C9B"]);
    } catch (k) {}
    try {
      p.globalStorage &&
        (e.globalStorage =
          window.globalStorage[".localdomain"]["3AB9D23F7A4B3C9B"]);
    } catch (k) {}
    try {
      d &&
        "function" == typeof d.load &&
        "function" == typeof d.getAttribute &&
        (d.load("jdgia_user_data"),
        (e.userData = d.getAttribute("3AB9D23F7A4B3C9B")));
    } catch (k) {}
    try {
      E.indexedDbId && (e.indexedDb = E.indexedDbId);
    } catch (k) {}
    try {
      E.webDbId && (e.webDb = E.webDbId);
    } catch (k) {}
    try {
      for (var r in e)
        if (32 < e[r].length) {
          _JdEid = e[r];
          n || (_eidFlag = !0);
          break;
        }
    } catch (k) {}
    try {
      ("undefined" === typeof _JdEid || 0 >= _JdEid.length) &&
        this.db("3AB9D23F7A4B3C9B");
      if ("undefined" === typeof _JdEid || 0 >= _JdEid.length)
        _JdEid = u("3AB9D23F7A4B3C9B");
      if ("undefined" === typeof _JdEid || 0 >= _JdEid.length) _eidFlag = !0;
    } catch (k) {}
    return _JdEid;
  };
  var w = [],
    A =
      "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(
        ";"
      ),
    y =
      "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako".split(
        ";"
      );
  this.toJson = "object" === typeof JSON && JSON.stringify;
  this.init = function () {
    _fingerprint_step = 6;
    t();
    _fingerprint_step = 7;
    "function" !== typeof this.toJson &&
      (this.toJson = function (n) {
        var e = typeof n;
        if ("undefined" === e || null === n) return "null";
        if ("number" === e || "boolean" === e) return n + "";
        if ("object" === e && n && n.constructor === Array) {
          e = [];
          for (var f = 0; n.length > f; f++) e.push(this.toJson(n[f]));
          return "[" + (e + "]");
        }
        if ("object" === e) {
          e = [];
          for (f in n)
            n.hasOwnProperty(f) && e.push('"' + f + '":' + this.toJson(n[f]));
          return "{" + (e + "}");
        }
      });
    this.sdkCollectInit();
  };
  this.sdkCollectInit = function () {
    try {
      try {
        bp_bizid && (this.bizId = bp_bizid);
      } catch (f) {
        this.bizId = "jsDefault";
      }
      var n = navigator.userAgent.toLowerCase(),
        e =
          !n.match(/(iphone|ipad|ipod)/i) &&
          (-1 < n.indexOf("android") || -1 < n.indexOf("adr"));
      this.deviceInfo.isJdApp = -1 < n.indexOf("jdapp");
      this.deviceInfo.isJrApp = -1 < n.indexOf("jdjr");
      this.deviceInfo.userAgent = navigator.userAgent;
      this.deviceInfo.isAndroid = e;
      this.createWorker();
    } catch (f) {}
  };
  this.db = function (n, e) {
    try {
      _fingerprint_step = "m";
      if (window.openDatabase) {
        var f = window.openDatabase(
          "sqlite_jdtdstorage",
          "",
          "jdtdstorage",
          1048576
        );
        void 0 !== e && "" != e
          ? f.transaction(function (r) {
              r.executeSql(
                "CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))",
                [],
                function (k, g) {},
                function (k, g) {}
              );
              r.executeSql(
                "INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)",
                [n, e],
                function (k, g) {},
                function (k, g) {}
              );
            })
          : f.transaction(function (r) {
              r.executeSql(
                "SELECT value FROM cache WHERE name=?",
                [n],
                function (k, g) {
                  1 <= g.rows.length && (_JdEid = g.rows.item(0).value);
                },
                function (k, g) {}
              );
            });
      }
      _fingerprint_step = "n";
    } catch (r) {}
  };
  this.setCookie = function (n, e) {
    void 0 !== e &&
      "" != e &&
      (document.cookie =
        n +
        "=" +
        e +
        "; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain=" +
        _root_domain);
  };
  this.tdencrypt = function (n) {
    n = this.toJson(n);
    n = encodeURIComponent(n);
    var e = "",
      f = 0;
    do {
      var r = n.charCodeAt(f++);
      var k = n.charCodeAt(f++);
      var g = n.charCodeAt(f++);
      var m = r >> 2;
      r = ((r & 3) << 4) | (k >> 4);
      var a = ((k & 15) << 2) | (g >> 6);
      var b = g & 63;
      isNaN(k) ? (a = b = 64) : isNaN(g) && (b = 64);
      e =
        e +
        "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(
          m
        ) +
        "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(
          r
        ) +
        "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(
          a
        ) +
        "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(
          b
        );
    } while (f < n.length);
    return e + "/";
  };
  this.collect = function () {
    var n = new Date();
    try {
      var e = document.createElement("div"),
        f = {},
        r =
          "ActiveBorder ActiveCaption AppWorkspace Background ButtonFace ButtonHighlight ButtonShadow ButtonText CaptionText GrayText Highlight HighlightText InactiveBorder InactiveCaption InactiveCaptionText InfoBackground InfoText Menu MenuText Scrollbar ThreeDDarkShadow ThreeDFace ThreeDHighlight ThreeDLightShadow ThreeDShadow Window WindowFrame WindowText".split(
            " "
          );
      if (window.getComputedStyle)
        for (var k = 0; k < r.length; k++)
          document.body.appendChild(e),
            (e.style.color = r[k]),
            (f[r[k]] = window.getComputedStyle(e).getPropertyValue("color")),
            document.body.removeChild(e);
    } catch (D) {}
    e = {
      ca: {},
      ts: {},
      m: {},
    };
    r = e.ca;
    r.tdHash = _jdfp_canvas_md5;
    var g = !1;
    if ((k = window.WebGLRenderingContext))
      (k = navigator.userAgent),
        (k = k.toLowerCase()),
        (k =
          (0 < k.indexOf("jdjr-app") || 0 <= k.indexOf("jdapp")) &&
          (0 < k.indexOf("iphone") || 0 < k.indexOf("ipad"))
            ? !0
            : !1),
        (k = !k);
    if (k) {
      var m = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
        a = [],
        b;
      for (k = 0; k < m.length; k++)
        try {
          var c = !1;
          (c = document.createElement("canvas").getContext(m[k], {
            stencil: !0,
          })) &&
            c &&
            ((b = c), a.push(m[k]));
        } catch (D) {}
      a.length &&
        (g = {
          name: a,
          gl: b,
        });
    }
    if (g) {
      k = g.gl;
      r.contextName = g.name.join();
      r.webglversion = k.getParameter(k.VERSION);
      r.shadingLV = k.getParameter(k.SHADING_LANGUAGE_VERSION);
      r.vendor = k.getParameter(k.VENDOR);
      r.renderer = k.getParameter(k.RENDERER);
      b = [];
      try {
        (b = k.getSupportedExtensions()), (r.extensions = b);
      } catch (D) {}
      try {
        var l = k.getExtension("WEBGL_debug_renderer_info");
        l &&
          ((r.wuv = k.getParameter(l.UNMASKED_VENDOR_WEBGL)),
          (r.wur = k.getParameter(l.UNMASKED_RENDERER_WEBGL)));
      } catch (D) {}
    }
    e.m.documentMode = document.documentMode;
    e.m.compatMode = document.compatMode;
    l = [];
    // r = new v;
    // for (k = 0; k < A.length; k++) b = A[k], r.checkSupportFont(b) && l.push(b);
    e.fo = l;
    k = {};
    l = [];
    for (var h in navigator)
      "object" != typeof navigator[h] && (k[h] = navigator[h]), l.push(h);
    k.enumerationOrder = l;
    k.javaEnabled = false;
    try {
      k.taintEnabled = navigator.taintEnabled();
    } catch (D) {}
    e.n = k;
    k = navigator.userAgent.toLowerCase();
    if ((h = k.match(/rv:([\d.]+)\) like gecko/))) var q = h[1];
    if ((h = k.match(/msie ([\d.]+)/))) q = h[1];
    h = [];
    if (q)
      for (
        q =
          "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);rmocx.RealPlayer G2 Control;Scripting.Dictionary;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;SWCtl.SWCtl;TDCCtl.TDCCtl;WMPlayer.OCX".split(
            ";"
          ),
          k = 0;
        k < q.length;
        k++
      ) {
        var z = q[k];
        try {
          var C = new ActiveXObject(z);
          l = {};
          l.name = z;
          try {
            l.version = C.GetVariable("$version");
          } catch (D) {}
          try {
            l.version = C.GetVersions();
          } catch (D) {}
          (l.version && 0 < l.version.length) || (l.version = "");
          h.push(l);
        } catch (D) {}
      }
    else {
      q = navigator.plugins;
      l = {};
      for (k = 0; k < q.length; k++) (z = q[k]), (l[z.name] = 1), h.push(x(z));
      for (k = 0; k < y.length; k++)
        (C = y[k]), l[C] || ((z = q[C]), z && h.push(x(z)));
    }
    q =
      "availHeight availWidth colorDepth bufferDepth deviceXDPI deviceYDPI height width logicalXDPI logicalYDPI pixelDepth updateInterval".split(
        " "
      );
    z = {};
    for (k = 0; q.length > k; k++)
      (C = q[k]), void 0 !== screen[C] && (z[C] = screen[C]);
    q = ["devicePixelRatio", "screenTop", "screenLeft"];
    l = {};
    for (k = 0; q.length > k; k++)
      (C = q[k]), void 0 !== window[C] && (l[C] = window[C]);
    e.p = h;
    e.w = l;
    e.s = z;
    e.sc = f;
    e.tz = n.getTimezoneOffset();
    e.lil = w.sort().join("|");
    e.wil = "";
    f = {};
    try {
      (f.cookie = navigator.cookieEnabled),
        (f.localStorage = !!window.localStorage),
        (f.sessionStorage = !!window.sessionStorage),
        (f.globalStorage = !!window.globalStorage),
        (f.indexedDB = !!window.indexedDB);
    } catch (D) {}
    e.ss = f;
    e.ts.deviceTime = n.getTime();
    e.ts.deviceEndTime = new Date().getTime();
    return this.tdencrypt(e);
  };
  this.collectSdk = function (n) {
    try {
      var e = this,
        f = !1,
        r = e.getLocal("BATQW722QTLYVCRD");
      if (null != r && void 0 != r && "" != r)
        try {
          var k = JSON.parse(r),
            g = new Date().getTime();
          null != k &&
            void 0 != k.t &&
            "number" == typeof k.t &&
            (12e5 >= g - k.t &&
            void 0 != k.tk &&
            null != k.tk &&
            "" != k.tk &&
            k.tk.startsWith("jdd")
              ? ((e.deviceInfo.sdkToken = k.tk), (f = !0))
              : void 0 != k.tk &&
                null != k.tk &&
                "" != k.tk &&
                (e.deviceInfo.sdkToken = k.tk));
        } catch (m) {}
      r = !1;
      e.deviceInfo.isJdApp
        ? ((e.deviceInfo.clientVersion = navigator.userAgent.split(";")[2]),
          (r = 0 < e.compareVersion(e.deviceInfo.clientVersion, "7.0.2")) &&
            !f &&
            e.getJdSdkCacheToken(function (m) {
              e.deviceInfo.sdkToken = m;
              (null != m && "" != m && m.startsWith("jdd")) ||
                e.getJdBioToken(n);
            }))
        : e.deviceInfo.isJrApp &&
          ((e.deviceInfo.clientVersion = navigator.userAgent.match(
            /clientVersion=([^&]*)(&|$)/
          )[1]),
          (r = 0 < e.compareVersion(e.deviceInfo.clientVersion, "4.6.0")) &&
            !f &&
            e.getJdJrSdkCacheToken(function (m) {
              e.deviceInfo.sdkToken = m;
              (null != m && "" != m && m.startsWith("jdd")) ||
                e.getJdJrBioToken(n);
            }));
      "function" == typeof n && n(e.deviceInfo);
    } catch (m) {}
  };
  this.compareVersion = function (n, e) {
    try {
      if (n === e) return 0;
      var f = n.split(".");
      var r = e.split(".");
      for (n = 0; n < f.length; n++) {
        var k = parseInt(f[n]);
        if (!r[n]) return 1;
        var g = parseInt(r[n]);
        if (k < g) break;
        if (k > g) return 1;
      }
    } catch (m) {}
    return -1;
  };
  this.isWKWebView = function () {
    return this.deviceInfo.userAgent.match(/supportJDSHWK/i) ||
      1 == window._is_jdsh_wkwebview
      ? !0
      : !1;
  };
  this.getErrorToken = function (n) {
    try {
      if (n) {
        var e = (n + "").match(/"token":"(.*?)"/);
        if (e && 1 < e.length) return e[1];
      }
    } catch (f) {}
    return "";
  };
  this.getJdJrBioToken = function (n) {
    var e = this;
    "undefined" != typeof JrBridge &&
      null != JrBridge &&
      "undefined" != typeof JrBridge._version &&
      (0 > e.compareVersion(JrBridge._version, "2.0.0")
        ? console.error(
            "\u6865\u7248\u672c\u4f4e\u4e8e2.0\u4e0d\u652f\u6301bio"
          )
        : JrBridge.callNative(
            {
              type: e.bioConfig.type,
              operation: e.bioConfig.operation,
              biometricData: {
                bizId: e.bizId,
                duraTime: e.bioConfig.duraTime,
                interval: e.bioConfig.interval,
              },
            },
            function (f) {
              try {
                "object" != typeof f && (f = JSON.parse(f)),
                  (e.deviceInfo.sdkToken = f.token);
              } catch (r) {
                console.error(r);
              }
              null != e.deviceInfo.sdkToken &&
                "" != e.deviceInfo.sdkToken &&
                ((f = {
                  tk: e.deviceInfo.sdkToken,
                  t: new Date().getTime(),
                }),
                e.store("BATQW722QTLYVCRD", JSON.stringify(f)));
            }
          ));
  };
  this.getJdJrSdkCacheToken = function (n) {
    var e = this;
    try {
      "undefined" == typeof JrBridge ||
        null == JrBridge ||
        "undefined" == typeof JrBridge._version ||
        0 > e.compareVersion(JrBridge._version, "2.0.0") ||
        JrBridge.callNative(
          {
            type: e.bioConfig.type,
            operation: 5,
            biometricData: {
              bizId: e.bizId,
              duraTime: e.bioConfig.duraTime,
              interval: e.bioConfig.interval,
            },
          },
          function (f) {
            var r = "";
            try {
              "object" != typeof f && (f = JSON.parse(f)), (r = f.token);
            } catch (k) {
              console.error(k);
            }
            null != r &&
              "" != r &&
              "function" == typeof n &&
              (n(r),
              r.startsWith("jdd") &&
                ((f = {
                  tk: r,
                  t: new Date().getTime(),
                }),
                e.store("BATQW722QTLYVCRD", JSON.stringify(f))));
          }
        );
    } catch (f) {}
  };
  this.getJdBioToken = function (n) {
    var e = this;
    n = JSON.stringify({
      businessType: "bridgeBiologicalProbe",
      callBackName: "_bioDeviceCb",
      params: {
        pin: "",
        jsonData: {
          type: e.bioConfig.type,
          operation: e.bioConfig.operation,
          data: {
            bizId: e.bizId,
            duraTime: e.bioConfig.duraTime,
            interval: e.bioConfig.interval,
          },
          biometricData: {
            bizId: e.bizId,
            duraTime: e.bioConfig.duraTime,
            interval: e.bioConfig.interval,
          },
        },
      },
    });
    e.isWKWebView()
      ? window.webkit.messageHandlers.JDAppUnite.postMessage({
          method: "notifyMessageToNative",
          params: n,
        })
      : window.JDAppUnite && window.JDAppUnite.notifyMessageToNative(n);
    window._bioDeviceCb = function (f) {
      try {
        var r = "object" == typeof f ? f : JSON.parse(f);
        if (void 0 != r && null != r && "0" != r.status) return;
        null != r.data.token &&
          void 0 != r.data.token &&
          "" != r.data.token &&
          (e.deviceInfo.sdkToken = r.data.token);
      } catch (k) {
        (f = e.getErrorToken(f)),
          null != f && "" != f && (e.deviceInfo.sdkToken = f);
      }
      null != e.deviceInfo.sdkToken &&
        "" != e.deviceInfo.sdkToken &&
        ((f = {
          tk: e.deviceInfo.sdkToken,
          t: new Date().getTime(),
        }),
        e.store("BATQW722QTLYVCRD", JSON.stringify(f)));
    };
  };
  this.getJdSdkCacheToken = function (n) {
    try {
      var e = this,
        f = JSON.stringify({
          businessType: "bridgeBiologicalProbe",
          callBackName: "_bioDeviceSdkCacheCb",
          params: {
            pin: "",
            jsonData: {
              type: e.bioConfig.type,
              operation: 5,
              data: {
                bizId: e.bizId,
                duraTime: e.bioConfig.duraTime,
                interval: e.bioConfig.interval,
              },
              biometricData: {
                bizId: e.bizId,
                duraTime: e.bioConfig.duraTime,
                interval: e.bioConfig.interval,
              },
            },
          },
        });
      e.isWKWebView()
        ? window.webkit.messageHandlers.JDAppUnite.postMessage({
            method: "notifyMessageToNative",
            params: f,
          })
        : window.JDAppUnite && window.JDAppUnite.notifyMessageToNative(f);
      window._bioDeviceSdkCacheCb = function (r) {
        var k = "";
        try {
          var g = "object" == typeof r ? r : JSON.parse(r);
          if (void 0 != g && null != g && "0" != g.status) return;
          k = g.data.token;
        } catch (m) {
          k = e.getErrorToken(r);
        }
        null != k &&
          "" != k &&
          "function" == typeof n &&
          (n(k),
          k.startsWith("jdd") &&
            ((r = {
              tk: k,
              t: new Date().getTime(),
            }),
            e.store("BATQW722QTLYVCRD", JSON.stringify(r))));
      };
    } catch (r) {}
  };
  this.store = function (n, e) {
    try {
      this.setCookie(n, e);
    } catch (f) {}
    try {
      window.localStorage && window.localStorage.setItem(n, e);
    } catch (f) {}
    try {
      window.sessionStorage && window.sessionStorage.setItem(n, e);
    } catch (f) {}
    try {
      window.globalStorage &&
        window.globalStorage[".localdomain"].setItem(n, e);
    } catch (f) {}
    try {
      this.db(n, _JdEid);
    } catch (f) {}
  };
  this.getLocal = function (n) {
    var e = {},
      f = null;
    try {
      var r = document.cookie.replace(
        new RegExp("(?:(?:^|.*;\\s*)" + n + "\\s*\\=\\s*([^;]*).*$)|^.*$"),
        "$1"
      );
      0 !== r.length && (e.cookie = r);
    } catch (g) {}
    try {
      window.localStorage &&
        null !== window.localStorage &&
        0 !== window.localStorage.length &&
        (e.localStorage = window.localStorage.getItem(n));
    } catch (g) {}
    try {
      window.sessionStorage &&
        null !== window.sessionStorage &&
        (e.sessionStorage = window.sessionStorage[n]);
    } catch (g) {}
    try {
      p.globalStorage &&
        (e.globalStorage = window.globalStorage[".localdomain"][n]);
    } catch (g) {}
    try {
      d &&
        "function" == typeof d.load &&
        "function" == typeof d.getAttribute &&
        (d.load("jdgia_user_data"), (e.userData = d.getAttribute(n)));
    } catch (g) {}
    try {
      E.indexedDbId && (e.indexedDb = E.indexedDbId);
    } catch (g) {}
    try {
      E.webDbId && (e.webDb = E.webDbId);
    } catch (g) {}
    try {
      for (var k in e)
        if (32 < e[k].length) {
          f = e[k];
          break;
        }
    } catch (g) {}
    try {
      if (null == f || "undefined" === typeof f || 0 >= f.length) f = u(n);
    } catch (g) {}
    return f;
  };
  this.createWorker = function () {
    if (window.Worker) {
      try {
        var n = new Blob(
          [
            "onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};",
          ],
          {
            type: "application/javascript",
          }
        );
      } catch (e) {
        (window.BlobBuilder =
          window.BlobBuilder ||
          window.WebKitBlobBuilder ||
          window.MozBlobBuilder),
          (n = new BlobBuilder()),
          n.append(
            "onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"
          ),
          (n = n.getBlob());
      }
      try {
        this.worker = new Worker(URL.createObjectURL(n));
      } catch (e) {}
    }
  };
  this.reportWorker = function (n, e, f, r) {
    try {
      null != this.worker &&
        (this.worker.postMessage(
          JSON.stringify({
            url: n,
            data: e,
            success: !1,
            async: !1,
          })
        ),
        (this.worker.onmessage = function (k) {}));
    } catch (k) {}
  };
})();

function td_collect_exe() {
  _fingerprint_step = 8;
  var t = td_collect.collect();
  td_collect.collectSdk();
  var u = "string" === typeof orderId ? orderId : "",
    v = "undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1;
  u = {
    pin: _jdJrTdCommonsObtainPin(v),
    oid: u,
    p: "https:" == document.location.protocol ? "s" : "h",
    fp: risk_jd_local_fingerprint,
    ctype: v,
    v: "2.7.10.4",
    f: "3",
  };
  try {
    (u.o = _CurrentPageUrl), (u.qs = _url_query_str);
  } catch (w) {}
  _fingerprint_step = 9;
  0 >= _JdEid.length &&
    ((_JdEid = td_collect.obtainLocal()), 0 < _JdEid.length && (_eidFlag = !0));
  u.fc = _JdEid;
  try {
    u.t = jd_risk_token_id;
  } catch (w) {}
  try {
    if ("undefined" != typeof gia_fp_qd_uuid && 0 <= gia_fp_qd_uuid.length)
      u.qi = gia_fp_qd_uuid;
    else {
      var x = _JdJrRiskClientStorage.jdtdstorage_cookie("qd_uid");
      u.qi = void 0 == x ? "" : x;
    }
  } catch (w) {}
  "undefined" != typeof jd_shadow__ &&
    0 < jd_shadow__.length &&
    (u.jtb = jd_shadow__);
  try {
    td_collect.deviceInfo &&
    void 0 != td_collect.deviceInfo &&
    null != td_collect.deviceInfo.sdkToken &&
    "" != td_collect.deviceInfo.sdkToken
      ? ((u.stk = td_collect.deviceInfo.sdkToken), (td_collect.isRpTok = !0))
      : (td_collect.isRpTok = !1);
  } catch (w) {
    td_collect.isRpTok = !1;
  }
  x = td_collect.tdencrypt(u);
  // console.log(u)
  return { a: x, d: t };
}

function _jdJrTdCommonsObtainPin(t) {
  var u = "";
  "string" === typeof jd_jr_td_risk_pin && 1 == t
    ? (u = jd_jr_td_risk_pin)
    : "string" === typeof pin
    ? (u = pin)
    : "object" === typeof pin &&
      "string" === typeof jd_jr_td_risk_pin &&
      (u = jd_jr_td_risk_pin);
  return u;
}

function getBody(userAgent, url = document.location.href) {
  navigator.userAgent = userAgent;
  let href = url;
  let choose = /((https?:)\/\/([^\/]+))(.+)/.exec(url);
  let [, origin, protocol, host, pathname] = choose;
  document.location.href = href;
  document.location.origin = origin;
  document.location.protocol = protocol;
  document.location.host = host;
  document.location.pathname = pathname;
  const JF = new JdJrTdRiskFinger();
  let fp = JF.f.get(function (t) {
    risk_jd_local_fingerprint = t;
    return t;
  });
  let arr = td_collect_exe();
  return { fp, ...arr };
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date(new Date().getTime()+new Date().getTimezoneOffset()*60*1000+8*60*60*1000);let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}