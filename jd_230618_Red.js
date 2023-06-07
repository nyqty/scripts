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
代理
export JD_230618_Red_proxy='[{"host":"","port":"15320","auth":""},{"host":"10.0.0.5","port":"15320","auth":""}]'



0 0,10,20 * * * jd_230618_Red.js 618红包助力

*/

let rebateCodes = ''; // 返利变量
let redTimes = 15000 // 等待时间单位毫秒
let redCount = 0 // 领取次数
let shareHelpCount = 0 // 助力次数 0=默认 1=1次满 2=2次满
let proxyGetIpUrl = [ // 代理
    // {"host":"","port":"","auth":""},
    // {"host":"10.0.0.5","port":"15320","auth":""},
]

const Env = require('./utils/Env.js');
const $ = new Env('618red');
const ii1l1li = $.isNode() ? require("./jdCookie.js") : "",
  Ii1ilIli = require("tunnel");
$.CryptoJS = require("crypto-js");
let i11il1Ii = [],
  IIllIii1 = "";
if ($.isNode()) {
  Object.keys(ii1l1li).forEach(llI1il1I => {
    i11il1Ii.push(ii1l1li[llI1il1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i11il1Ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIiIi11i($.getdata("CookiesJD") || "[]").map(IiII1i => IiII1i.cookie)].filter(iIllliiI => !!iIllliiI);
let lIIII11 = "";
if (!rebateCodes) rebateCodes = "https://u.jd.com/Oqk1iQg";
if (!lIIII11) lIIII11 = "";
rebateCodes = $.isNode() ? process.env.JD_230618_RedRebateCode ? process.env.JD_230618_RedRebateCode : "" + rebateCodes : $.getdata("JD_230618_RedRebateCode") ? $.getdata("JD_230618_RedRebateCode") : "" + rebateCodes;
lIIII11 = $.isNode() ? process.env.JD_nhj_rebatePin ? process.env.JD_nhj_rebatePin : "" + lIIII11 : $.getdata("JD_nhj_rebatePin") ? $.getdata("JD_nhj_rebatePin") : "" + lIIII11;
redCount = $.isNode() ? process.env.JD_230618_RedCount ? process.env.JD_230618_RedCount : "" + redCount : $.getdata("JD_230618_RedCount") ? $.getdata("JD_230618_RedCount") : "" + redCount;
redTimes = $.isNode() ? process.env.JD_230618_RedTimes ? process.env.JD_230618_RedTimes : "" + redTimes : $.getdata("JD_230618_RedTimes") ? $.getdata("JD_230618_RedTimes") : "" + redTimes;
$.shareCount = $.isNode() ? process.env.JD_nhj_shareHelpCount ? process.env.JD_nhj_shareHelpCount : "" + shareHelpCount : $.getdata("JD_nhj_shareHelpCount") ? $.getdata("JD_nhj_shareHelpCount") : "" + shareHelpCount;
proxyGetIpUrl = $.isNode() ? process.env.JD_230618_Red_proxy ? process.env.JD_230618_Red_proxy : proxyGetIpUrl : $.getdata("JD_230618_Red_proxy") ? $.getdata("JD_230618_Red_proxy") : proxyGetIpUrl;
$.shareCount = parseInt($.shareCount, 10) || 0;
let IlIIiili = lIIII11 && lIIII11.split(",") || [],
  Ii1Iiiil = rebateCodes + "";
$.time("yyyy-MM-dd HH:mm:ss");
message = "";
let liiiii1i = "";
resMsg = "";
$.uiUpdateTime = "";
$.endFlag = false;
$.runEnd = false;
let lIIiI1l1 = {};
$.getH5st_WQ_Arr = {};
$.runArr = {};
let lli1IllI = "";
const IIiilli = "2023/06/19 00:00:00+08:00";
let Ilii1IlI = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
$.UVCookieArr = {};
lr = {};
$.UVCookie = "";
let liliIlI = "",
  iIIiiIll = 2;
redTimes = Number(redTimes);
$.time("yyyy-MM-dd");
$.proxyArrAll = [];
proxyGetIpUrl = $.toObj(proxyGetIpUrl, proxyGetIpUrl);
typeof proxyGetIpUrl == "object" && ($.proxyArrAll = proxyGetIpUrl);
$.proxyArr = {
  "host": "",
  "port": "",
  "auth": ""
};
$.proxyIndex = -1;
IIIi11ii();
!(async () => {
  if (/https:\/\/u\.jd\.com\/.+/.test(Ii1Iiiil)) {
    if (Ii1Iiiil.split("/").pop()) Ii1Iiiil = Ii1Iiiil.split("/").pop().split("?").shift();else {
      console.log("请填写正确的rebateCode");
      return;
    }
  }
  if (!i11il1Ii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (Ilii1IlI > new Date(IIiilli).getTime()) {
    $.msg($.name, "活动已结束", "请删除此脚本");
    $.setdata("", "JD_230618_Red");
    $.setdata("", "JD_230618_Red_pin");
    return;
  }
  console.log("当前版本：2023年06月07日");
  console.log("返利码：" + Ii1Iiiil.replace(/.+(.{3})/, "***$1") + "\n");
  $.shareCodeArr = {};
  $.shareCodePinArr = $.getdata("JD_230618_Red_pin") || {};
  $.shareCode = "";
  $.again = false;
  if ($.end) return;
  for (let Il11i1 = 0; Il11i1 < i11il1Ii.length && !$.runEnd; Il11i1++) {
    if ($.endFlag) break;
    IIllIii1 = i11il1Ii[Il11i1];
    if (IIllIii1) {
      $.UserName = decodeURIComponent(IIllIii1.match(/pt_pin=([^; ]+)(?=;?)/) && IIllIii1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Il11i1 + 1;
      if ($.runArr[$.UserName]) continue;
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let lllI1Il1 = 1;
      iIIiiIll = 4;
      l1l1IiiI($.proxyIndex);
      !IIllIii1.includes("app_open") && (lllI1Il1 = 2, iIIiiIll = 2);
      $.eid_token = "";
      await li1ilII(lllI1Il1);
      await illiiI1l();
      await Il1l1iII();
      if ($.endFlag) break;
    }
    $.setdata($.shareCodePinArr, "JD_230618_Red_pin");
  }
  $.setdata($.shareCodePinArr, "JD_230618_Red_pin");
  if (message) {
    $.msg($.name, "", message + "\nhttps://u.jd.com/" + Ii1Iiiil + "\n\n跳转到app 可查看助力情况");
    if ($.isNode()) {}
  }
})().catch(li1I1ll => $.logErr(li1I1ll)).finally(() => {
  $.done();
});
async function Il1l1iII(Il1i11l = 0) {
  try {
    Il1i11l == 0 && (I1lIlIl("6a98d", $.UA), await lli1IllI.__genAlgo());
    $.UVCookie = $.UVCookieArr[$.UserName] || "";
    !$.UVCookie && IIIi11ii();
    resMsg = "";
    let iI11Ili1 = false,
      lI1il1i = 0,
      llIIIil1 = 0,
      IlIl1Ill = 0;
    $.shareFlag = true;
    do {
      if (llIIIil1 > 2) lI1il1i = 0;
      $.flag = 0;
      liiiii1i = "";
      $.url1 = "";
      await llIiIiIi();
      if (!$.url1) {
        console.log("获取url1失败");
        $.end = true;
        break;
      }
      $.url2 = "";
      $.UVCookie = liliIlI.getUVCookie("", "", $.url1, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      await ii1lI1Ii();
      if (!$.url2) {
        console.log("获取不到红包页面");
        break;
      }
      if (!/unionActId=\d+/.test($.url2) && !new RegExp("&d=" + Ii1Iiiil).test($.url2)) {
        console.log("改返利url：https://u.jd.com/" + Ii1Iiiil + " 可能不是红包页面");
        $.runEnd = true;
        return;
      }
      if (!$.url2) $.url2 = "https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html?unionActId=31162&d=" + Ii1Iiiil + "&cu=true&utm_source=kong&utm_medium=jingfen";
      $.actId = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/mall\/active\/([^/]+)\/index\.html/)[1] || "2KxaKmeh5hQkkGY6PGF6etgSFUp4";
      $.UVCookie = liliIlI.getUVCookie("", "", $.url2, $.UVCookie);
      $.origin = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/)[1] || "https://pro.m.jd.com";
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      $.eid = "";
      !$.eid && ($.eid = -1);
      if (Il1i11l == 0) {
        let Iliii1I1 = 0,
          III111I1 = true,
          iiII111i = 0;
        if (Object.getOwnPropertyNames(lIIiI1l1).length > lI1il1i && $.shareFlag) for (let III11il in lIIiI1l1 || {}) {
          if (III11il == $.UserName) {
            $.flag = 1;
            continue;
          }
          if (Iliii1I1 == lI1il1i) {
            $.flag = 0;
            $.shareCode = lIIiI1l1[III11il] || "";
            if ($.shareCodePinArr[III11il] && $.shareCodePinArr[III11il].includes($.UserName)) {
              iiII111i++;
              continue;
            }
            if ($.shareCode.count >= $.shareCodeArr.shareCount) {
              iiII111i++;
              continue;
            }
            $.getlj = false;
            if ($.shareCode) console.log("助力[" + III11il + "]");
            let I1IlI11l = await l1I111ll($.shareCode.code, 1);
            if (/重复助力/.test(I1IlI11l)) {
              if (!$.shareCodePinArr[III11il]) $.shareCodePinArr[III11il] = [];
              $.shareCodePinArr[III11il].push($.UserName);
              lI1il1i--;
              IlIl1Ill--;
            } else {
              if (/助力/.test(I1IlI11l) && /上限/.test(I1IlI11l)) $.shareFlag = false;else {
                if (!/领取上限/.test(I1IlI11l) && $.getlj == true) {
                  if (!$.shareCodePinArr[III11il]) $.shareCodePinArr[III11il] = [];
                  !$.shareCodePinArr[III11il].includes($.UserName) && $.shareCodePinArr[III11il].push($.UserName);
                  lI1il1i--;
                } else III111I1 = false;
              }
            }
          }
          Iliii1I1++;
        }
        III111I1 && iiII111i == Object.getOwnPropertyNames(lIIiI1l1).length && (iI11Ili1 = true);
        if (Iliii1I1 == 0) {
          $.getlj = false;
          let lIlllil = await l1I111ll("", 1);
          !/领取上限/.test(lIlllil) && $.getlj == true && lI1il1i--;
        }
        if ($.endFlag) break;
      } else {
        let lIill11l = await Ilii1ii();
        if (!$.endFlag && lIill11l && $.again == false) await Il111III();
        if ($.again == false) break;
      }
      $.again == true && llIIIil1 < 1 && (llIIIil1++, $.again = false);
      lI1il1i++;
      IlIl1Ill++;
      $.flag == 1 && (await $.wait(parseInt(Math.random() * 500 + 100, 10)));
      if (redCount > 0 && redCount <= IlIl1Ill) break;
    } while ($.flag == 1 && lI1il1i < 4);
    if ($.endFlag) return;
    resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
    if (iI11Ili1) {}
    let i11l1Il1 = parseInt(Math.random() * 1000 + redTimes, 10);
    console.log("等待 " + i11l1Il1 / 1000 + " 秒");
    await $.wait(i11l1Il1);
  } catch (i1i11lli) {
    console.log(i1i11lli);
  }
}
async function lllllIII() {
  return new Promise(i1iIllll => {
    let IiiII1li = {
      "url": "https://1685541365720-at2ej8o6cum.u.fastly-analytics.com/debug_resolver",
      "timeout": 10000
    };
    IiiII1li = liliIlIl(IiiII1li);
    $.get(IiiII1li, async (i1II11ll, Ii1ilIi, l1IiI1I1) => {
      try {
        i1II11ll ? console.log(i1II11ll) : console.log(l1IiI1I1);
      } catch (Iliiii1) {
        $.logErr(Iliiii1, Ii1ilIi);
      } finally {
        i1iIllll();
      }
    });
  });
}
async function IIlll1I(IiiiIIIi = 0) {
  try {
    let IIii11I1 = 2;
    if (IiiiIIIi == 1) IIii11I1 = 1;
    let Ili1l1li = 0;
    for (let I1lIlI11 in $.shareCodeArr || {}) {
      if (I1lIlI11 === "flag" || I1lIlI11 === "updateTime" || I1lIlI11 === "shareCount") continue;
      if ($.shareCodeArr[I1lIlI11] && $.shareCodeArr.shareCount && $.shareCodeArr[I1lIlI11].count < $.shareCodeArr.shareCount) Ili1l1li++;
    }
    for (let Ililii = 0; Ililii < i11il1Ii.length && !$.runEnd; Ililii++) {
      IIllIii1 = i11il1Ii[Ililii];
      if (IIllIii1) {
        $.UserName = decodeURIComponent(IIllIii1.match(/pt_pin=([^; ]+)(?=;?)/) && IIllIii1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (IlIIiili.length > 0 && IlIIiili.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) continue;
        $.index = Ililii + 1;
        $.eid_token = "";
        await li1ilII();
        await illiiI1l();
        await Il1l1iII(1);
        let ll111ii = 0;
        for (let iilllilI in $.shareCodeArr || {}) {
          if (iilllilI === "flag" || iilllilI === "updateTime" || iilllilI === "shareCount") continue;
          if ($.shareCodeArr[iilllilI] && $.shareCodeArr.shareCount && $.shareCodeArr[iilllilI].count < $.shareCodeArr.shareCount) ll111ii++;
        }
        if ($.endFlag || ll111ii - Ili1l1li >= IIii11I1 || $.end) break;
      }
    }
  } catch (I1I1II1) {
    console.log(I1I1II1);
  }
  if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) for (let llilllI1 in $.shareCodeArr || {}) {
    if (llilllI1 === "flag" || llilllI1 === "updateTime" || llilllI1 === "shareCount") continue;
    if ($.shareCodeArr[llilllI1]) lIIiI1l1[llilllI1] = $.shareCodeArr[llilllI1];
  }
}
function l1I111ll(li11I1lI = "", i1iiiIIl = 1) {
  return new Promise(async IIl11i1I => {
    $.UVCookie = liliIlI.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let llll11il = "",
      lI11IIIi = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
    const III1iIli = {
        "platform": iIIiiIll,
        "unionActId": "31162",
        "actId": $.actId,
        "d": Ii1Iiiil,
        "unionShareId": li11I1lI,
        "type": i1iiiIIl
      },
      iIIIili = {
        "appid": "u",
        "body": JSON.stringify(III1iIli),
        "client": "apple",
        "clientVersion": $.UA.split(";")[2] || "1.1.0",
        "functionId": "getCoupons"
      };
    let iIIi11l = lli1IllI.__genH5st(iIIIili, $.UserName);
    llll11il = iIIi11l.h5st || "";
    let iIIlIll1 = "",
      iii1IIii = {
        "url": "https://api.m.jd.com/api",
        "body": "functionId=getCoupons&appid=" + iIIIili.appid + "&_=" + lI11IIIi + "&loginType=2&body=" + $.toStr(III1iIli) + "&client=" + iIIIili.client + "&clientVersion=" + iIIIili.clientVersion + "&h5st=" + llll11il + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
        "headers": {
          "accept": "*/*",
          "Accept-Language": "zh-cn",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          "Cookie": "" + $.UVCookie + liiiii1i + " " + IIllIii1,
          "origin": $.origin,
          "Referer": $.origin + "/",
          "User-Agent": $.UA
        },
        "timeout": 10000
      };
    iii1IIii.headers.Cookie = iii1IIii.headers.Cookie.replace(/;\s*$/, "");
    iii1IIii.headers.Cookie = iii1IIii.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) iii1IIii.headers.Referer = $.url2;
    iii1IIii = liliIlIl(iii1IIii);
    $.post(iii1IIii, async (iilI1lii, iil1lII1, I1lIIlil) => {
      try {
        if (iilI1lii) {
          console.log("" + $.toStr(iilI1lii));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let ii1iiIII = $.toObj(I1lIIlil, I1lIIlil);
          if (typeof ii1iiIII == "object") {
            ii1iiIII.msg && (iIIlIll1 = ii1iiIII.msg, console.log(ii1iiIII.msg));
            if (ii1iiIII.msg.indexOf("不展示弹层") > -1 && i1iiiIIl == 1) $.again = true;
            if (ii1iiIII.msg.indexOf("领取上限") === -1 && ii1iiIII.msg.indexOf("登录") === -1) {
              if (i1iiiIIl == 1) $.flag = 1;
            }
            if (ii1iiIII.msg.indexOf("活动已结束") > -1 || ii1iiIII.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            li11I1lI && typeof ii1iiIII.data !== "undefined" && typeof ii1iiIII.data.joinNum !== "undefined" && console.log("当前" + ii1iiIII.data.joinSuffix + ":" + ii1iiIII.data.joinNum);
            if (ii1iiIII.code == 0 && ii1iiIII.data) {
              if (i1iiiIIl == 1) $.shareCode.count++;
              let lIiIi1II = "";
              for (let l1IiIlil of ii1iiIII.data.couponList) {
                if (l1IiIlil.type == 1) {
                  $.getlj = true;
                  lIiIi1II += (lIiIi1II ? "\n" : "") + "获得[红包]🧧" + l1IiIlil.discount + "元 使用时间:" + $.time("yyyy-MM-dd", l1IiIlil.beginTime) + " " + $.time("yyyy-MM-dd", l1IiIlil.endTime);
                } else {
                  if (l1IiIlil.type == 3) {
                    $.getlj = true;
                    lIiIi1II += (lIiIi1II ? "\n" : "") + "获得[优惠券]🎟️满" + l1IiIlil.quota + "减" + l1IiIlil.discount + " 使用时间:" + $.time("yyyy-MM-dd", l1IiIlil.beginTime) + " " + $.time("yyyy-MM-dd", l1IiIlil.endTime);
                  } else l1IiIlil.type == 6 ? ($.getlj = true, lIiIi1II += (lIiIi1II ? "\n" : "") + "获得[打折券]]🎫满" + l1IiIlil.quota + "打" + l1IiIlil.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", l1IiIlil.beginTime) + " " + $.time("yyyy-MM-dd", l1IiIlil.endTime)) : ($.getlj = true, lIiIi1II += (lIiIi1II ? "\n" : "") + "获得[未知]🎉" + (l1IiIlil.quota || "") + " " + l1IiIlil.discount + " 使用时间:" + $.time("yyyy-MM-dd", l1IiIlil.beginTime) + " " + $.time("yyyy-MM-dd", l1IiIlil.endTime), console.log(l1IiIlil));
                }
              }
              lIiIi1II && (resMsg += lIiIi1II + "\n", console.log(lIiIi1II));
            }
            if (i1iiiIIl == 1 && typeof ii1iiIII.data !== "undefined" && typeof ii1iiIII.data.groupData !== "undefined" && typeof ii1iiIII.data.groupData.groupInfo !== "undefined") for (let lII111lI of ii1iiIII.data.groupData.groupInfo || []) {
              lII111lI.status == 2 && (console.log("助力满可以领取" + lII111lI.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await l1I111ll("", 2));
            }
          } else console.log(I1lIIlil);
        }
      } catch (Il1liIII) {
        $.logErr(Il1liIII, iil1lII1);
      } finally {
        IIl11i1I(iIIlIll1);
      }
    });
  });
}
function Ilii1ii(IiI111il = "") {
  let I1I1lil1 = true;
  return new Promise(I11iI1i1 => {
    $.UVCookie = liliIlI.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let iliiIl1l = {
      "url": "https://api.m.jd.com/api?functionId=showCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22actId%22:%22" + $.actId + "%22,%22unionActId%22:%2231162%22,%22unpl%22:%22" + $.unpl + "%22,%22platform%22:" + iIIiiIll + ",%22unionShareId%22:%22%22," + ($.uiUpdateTime ? "%22uiUpdateTime%22:" + $.uiUpdateTime + "," : "") + "%22d%22:%22" + Ii1Iiiil + "%22,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + liiiii1i + " " + IIllIii1,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    iliiIl1l.headers.Cookie = iliiIl1l.headers.Cookie.replace(/;\s*$/, "");
    iliiIl1l.headers.Cookie = iliiIl1l.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) iliiIl1l.headers.Referer = $.url2;
    iliiIl1l = liliIlIl(iliiIl1l);
    $.get(iliiIl1l, async (IiII1I1I, ll1iiIiI, lilllI11) => {
      try {
        if (IiII1I1I) {
          console.log("" + $.toStr(IiII1I1I));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let lIllI = $.toObj(lilllI11, lilllI11);
          if (typeof lIllI == "object") {
            if (lIllI.msg) console.log(lIllI.msg);
            if (lIllI.msg.indexOf("不展示弹层") > -1) $.again = true;
            if (lIllI.msg.indexOf("领取上限") > -1) $.runArr[$.UserName] = true;
            lIllI.msg.indexOf("上限") === -1 && lIllI.msg.indexOf("登录") === -1 && ($.flag = 1);
            if (lIllI.msg.indexOf("活动已结束") > -1 || lIllI.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            if (lIllI.data.uiUpdateTime) $.uiUpdateTime = lIllI.data.uiUpdateTime;
            if (typeof lIllI.data !== "undefined" && typeof lIllI.data.groupData !== "undefined" && typeof lIllI.data.groupData.joinNum !== "undefined") {
              $.joinNum = lIllI.data.groupData.joinNum;
              let iIi1IiII = 0;
              for (let llIIl11i of lIllI.data.groupData.groupInfo) {
                if (iIi1IiII < llIIl11i.num) iIi1IiII = llIIl11i.num;
              }
              if ($.shareCount > 0 && iIi1IiII > $.shareCount) iIi1IiII = $.shareCount;
              $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = iIi1IiII);
              $.shareCodeArr.shareCount = iIi1IiII;
              if (iIi1IiII <= $.joinNum) {
                if (!$.shareCodeArr[$.UserName]) $.shareCodeArr[$.UserName] = {};
                $.shareCodeArr[$.UserName].count = $.joinNum;
                I1I1lil1 = false;
              }
              console.log("【账号" + $.index + "】" + ($.nickName || $.UserName) + " " + $.joinNum + "/" + iIi1IiII + "人");
            }
            lIllI.msg.indexOf("活动已结束") > -1 && (I1I1lil1 = false);
            if (typeof lIllI.data !== "undefined" && typeof lIllI.data.groupData !== "undefined" && typeof lIllI.data.groupData.groupInfo !== "undefined") for (let l1lI11 of lIllI.data.groupData.groupInfo || []) {
              l1lI11.status == 2 && (console.log("助力满可以领取" + l1lI11.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await l1I111ll("", 2));
            }
          } else console.log(lilllI11);
        }
      } catch (li1ill11) {
        $.logErr(li1ill11, ll1iiIiI);
      } finally {
        I11iI1i1(I1I1lil1);
      }
    });
  });
}
function Il111III() {
  if ($.shareCodeArr[$.UserName]) {
    console.log("【账号" + $.index + "】缓存分享码:" + $.shareCodeArr[$.UserName].code.replace(/.+(.{3})/, "***$1"));
    return;
  }
  return new Promise(l1lii1Il => {
    let iiI1i1iI = {
      "url": "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u&_=" + Date.now() + "&loginType=2&body={%22unionActId%22:%2231162%22,%22actId%22:%22" + $.actId + "%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22" + Ii1Iiiil + "%22,%22supportPic%22:2,%22supportLuckyCode%22:0,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + liiiii1i + " " + IIllIii1,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    iiI1i1iI.headers.Cookie = iiI1i1iI.headers.Cookie.replace(/;\s*$/, "");
    iiI1i1iI.headers.Cookie = iiI1i1iI.headers.Cookie.replace(/;([^\s])/g, "; $1");
    iiI1i1iI = liliIlIl(iiI1i1iI);
    $.get(iiI1i1iI, async (IilliI, ii1ili1i, II1IilII) => {
      try {
        if (IilliI) {
          console.log("" + $.toStr(IilliI));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let liIIlIi = $.toObj(II1IilII, II1IilII);
          if (typeof liIIlIi == "object") {
            if (liIIlIi.code == 0 && liIIlIi.data && liIIlIi.data.shareUrl) {
              let iIlI1IIi = liIIlIi.data.shareUrl.match(/\?s=([^&]+)/) && liIIlIi.data.shareUrl.match(/\?s=([^&]+)/)[1] || "";
              iIlI1IIi && (console.log("【账号" + $.index + "】分享码：" + iIlI1IIi.replace(/.+(.{3})/, "***$1")), $.shareCodeArr[$.UserName] = {
                "code": iIlI1IIi,
                "count": $.joinNum
              });
            }
          } else console.log(II1IilII);
        }
      } catch (I1ll1liI) {
        $.logErr(I1ll1liI, ii1ili1i);
      } finally {
        l1lii1Il();
      }
    });
  });
}
function ii1lI1Ii() {
  return new Promise(ii11liIi => {
    let iIIIIliI = {
      "url": $.url1,
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + liiiii1i + " " + IIllIii1,
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    iIIIIliI = liliIlIl(iIIIIliI);
    $.get(iIIIIliI, async (Iili1i1, liilll1i, il1i1l) => {
      try {
        l11Ii(liilll1i);
        $.url2 = liilll1i && liilll1i.headers && (liilll1i.headers.location || liilll1i.headers.Location || "") || "";
        $.url2 = decodeURIComponent($.url2);
        $.url2 = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || "";
      } catch (III1Ii1l) {
        $.logErr(III1Ii1l, liilll1i);
      } finally {
        ii11liIi(il1i1l);
      }
    });
  });
}
function llIiIiIi() {
  return new Promise(Ii1ilI => {
    let I11I1ii = {
      "url": "https://u.jd.com/" + Ii1Iiiil + ($.shareCode && "?s=" + $.shareCode || ""),
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + liiiii1i + " " + IIllIii1,
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    I11I1ii = liliIlIl(I11I1ii);
    $.get(I11I1ii, async (Iiill1iI, Il1llii, il11II1) => {
      try {
        l11Ii(Il1llii);
        $.url1 = il11II1 && il11II1.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && il11II1.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || "";
      } catch (lll11i1I) {
        $.logErr(lll11i1I, Il1llii);
      } finally {
        Ii1ilI(il11II1);
      }
    });
  });
}
function l11Ii(iIlli1il) {
  let lii11iI1 = iIlli1il && iIlli1il.headers && (iIlli1il.headers["set-cookie"] || iIlli1il.headers["Set-Cookie"] || "") || "",
    lilll1Ii = "";
  if (lii11iI1) {
    if (typeof lii11iI1 != "object") lilll1Ii = lii11iI1.split(",");else lilll1Ii = lii11iI1;
    for (let IlllIilI of lilll1Ii) {
      let lIili1il = IlllIilI.split(";")[0].trim();
      if (lIili1il.split("=")[1]) {
        lIili1il.split("=")[0] == "unpl" && lIili1il.split("=")[1] && ($.unpl = lIili1il.split("=")[1]);
        if (liiiii1i.indexOf(lIili1il.split("=")[1]) == -1) liiiii1i += lIili1il.replace(/ /g, "") + "; ";
      }
    }
  }
}
function l1l1IiiI(ii1ll1il) {
  let ilI1iIIi = false;
  if (ii1ll1il != $.proxyIndex) ilI1iIIi = true;else {
    if ($.proxyIndex + 1 < $.proxyArrAll.length) {
      $.proxyIndex++;
      ilI1iIIi = true;
      $.proxyArr = $.proxyArrAll[$.proxyIndex % $.proxyArrAll.length];
      if ($.proxyArr.host && $.proxyArr.port) console.log("使用代理", $.proxyArr.type ? $.proxyArr.type : "", $.proxyArr.host, $.proxyArr.port);
    }
  }
  return ilI1iIIi;
}
function liliIlIl(l1ilIl1) {
  if ($.proxyArr.host && $.proxyArr.port) {
    if ($.proxyArr.type == "socks") {
      var I1Il1iii = {
        "socksHost": $.proxyArr.host,
        "socksPort": $.proxyArr.port * 1
      };
      $.proxyArr.auth && $.proxyArr.auth.username && (I1Il1iii.socksUsername = $.proxyArr.auth.username);
      Object.assign(l1ilIl1, {
        "strictSSL": false,
        "agentClass": Agent_https,
        "agentOptions": I1Il1iii
      });
    } else {
      const iIlliIl1 = {
        "https": Ii1ilIli.httpsOverHttp({
          "proxy": {
            "host": $.proxyArr.host,
            "port": $.proxyArr.port * 1,
            "proxyAuth": $.proxyArr.auth
          }
        })
      };
      Object.assign(l1ilIl1, {
        "agent": iIlliIl1
      });
    }
  }
  return l1ilIl1;
}
function li1ilII(I1llIll = 1) {
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
  I1llIll != 1 && ($.UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1");
}
function IIiIi11i(i1Il1liI) {
  if (typeof i1Il1liI == "string") try {
    return JSON.parse(i1Il1liI);
  } catch (l1illl11) {
    return console.log(l1illl11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function illiiI1l() {
  var IIlllIlI = function () {
    function l1ilIii(ili1I1l1, i111IIIl) {
      ili1I1l1 = [ili1I1l1[0] >>> 16, 65535 & ili1I1l1[0], ili1I1l1[1] >>> 16, 65535 & ili1I1l1[1]];
      i111IIIl = [i111IIIl[0] >>> 16, 65535 & i111IIIl[0], i111IIIl[1] >>> 16, 65535 & i111IIIl[1]];
      var liIlIlli = [0, 0, 0, 0];
      return liIlIlli[3] += ili1I1l1[3] + i111IIIl[3], liIlIlli[2] += liIlIlli[3] >>> 16, liIlIlli[3] &= 65535, liIlIlli[2] += ili1I1l1[2] + i111IIIl[2], liIlIlli[1] += liIlIlli[2] >>> 16, liIlIlli[2] &= 65535, liIlIlli[1] += ili1I1l1[1] + i111IIIl[1], liIlIlli[0] += liIlIlli[1] >>> 16, liIlIlli[1] &= 65535, liIlIlli[0] += ili1I1l1[0] + i111IIIl[0], liIlIlli[0] &= 65535, [liIlIlli[0] << 16 | liIlIlli[1], liIlIlli[2] << 16 | liIlIlli[3]];
    }
    function II1l1iil(i1iIii1, i11II1I1) {
      i1iIii1 = [i1iIii1[0] >>> 16, 65535 & i1iIii1[0], i1iIii1[1] >>> 16, 65535 & i1iIii1[1]];
      i11II1I1 = [i11II1I1[0] >>> 16, 65535 & i11II1I1[0], i11II1I1[1] >>> 16, 65535 & i11II1I1[1]];
      var Ii1ll1i1 = [0, 0, 0, 0];
      return Ii1ll1i1[3] += i1iIii1[3] * i11II1I1[3], Ii1ll1i1[2] += Ii1ll1i1[3] >>> 16, Ii1ll1i1[3] &= 65535, Ii1ll1i1[2] += i1iIii1[2] * i11II1I1[3], Ii1ll1i1[1] += Ii1ll1i1[2] >>> 16, Ii1ll1i1[2] &= 65535, Ii1ll1i1[2] += i1iIii1[3] * i11II1I1[2], Ii1ll1i1[1] += Ii1ll1i1[2] >>> 16, Ii1ll1i1[2] &= 65535, Ii1ll1i1[1] += i1iIii1[1] * i11II1I1[3], Ii1ll1i1[0] += Ii1ll1i1[1] >>> 16, Ii1ll1i1[1] &= 65535, Ii1ll1i1[1] += i1iIii1[2] * i11II1I1[2], Ii1ll1i1[0] += Ii1ll1i1[1] >>> 16, Ii1ll1i1[1] &= 65535, Ii1ll1i1[1] += i1iIii1[3] * i11II1I1[1], Ii1ll1i1[0] += Ii1ll1i1[1] >>> 16, Ii1ll1i1[1] &= 65535, Ii1ll1i1[0] += i1iIii1[0] * i11II1I1[3] + i1iIii1[1] * i11II1I1[2] + i1iIii1[2] * i11II1I1[1] + i1iIii1[3] * i11II1I1[0], Ii1ll1i1[0] &= 65535, [Ii1ll1i1[0] << 16 | Ii1ll1i1[1], Ii1ll1i1[2] << 16 | Ii1ll1i1[3]];
    }
    function IlIllIi1(II1l111l, IllilI1i) {
      return 32 === (IllilI1i %= 64) ? [II1l111l[1], II1l111l[0]] : 32 > IllilI1i ? [II1l111l[0] << IllilI1i | II1l111l[1] >>> 32 - IllilI1i, II1l111l[1] << IllilI1i | II1l111l[0] >>> 32 - IllilI1i] : (IllilI1i -= 32, [II1l111l[1] << IllilI1i | II1l111l[0] >>> 32 - IllilI1i, II1l111l[0] << IllilI1i | II1l111l[1] >>> 32 - IllilI1i]);
    }
    function ililI1lI(i1i1Illi, il1I1lll) {
      return 0 === (il1I1lll %= 64) ? i1i1Illi : 32 > il1I1lll ? [i1i1Illi[0] << il1I1lll | i1i1Illi[1] >>> 32 - il1I1lll, i1i1Illi[1] << il1I1lll] : [i1i1Illi[1] << il1I1lll - 32, 0];
    }
    function I1iiiiil(IIiilIll, lIlliIII) {
      return [IIiilIll[0] ^ lIlliIII[0], IIiilIll[1] ^ lIlliIII[1]];
    }
    function iIillliI(lii1I1) {
      return I1iiiiil(lii1I1 = II1l1iil(lii1I1 = I1iiiiil(lii1I1 = II1l1iil(lii1I1 = I1iiiiil(lii1I1, [0, lii1I1[0] >>> 1]), [4283543511, 3981806797]), [0, lii1I1[0] >>> 1]), [3301882366, 444984403]), [0, lii1I1[0] >>> 1]);
    }
    return {
      "hash128": function (lIiiii1I, iiilI1Ii) {
        var i1li1i1i = iiilI1Ii || 0;
        iiilI1Ii = (lIiiii1I = lIiiii1I || "").length % 16;
        var l1I111il = lIiiii1I.length - iiilI1Ii,
          l1I1i1I1 = [0, i1li1i1i];
        i1li1i1i = [0, i1li1i1i];
        for (var Ill1ii, ii1li1li, li1ii1li = [2277735313, 289559509], lillIll = [1291169091, 658871167], llIIi1i = 0; llIIi1i < l1I111il; llIIi1i += 16) {
          Ill1ii = [255 & lIiiii1I.charCodeAt(llIIi1i + 4) | (255 & lIiiii1I.charCodeAt(llIIi1i + 5)) << 8 | (255 & lIiiii1I.charCodeAt(llIIi1i + 6)) << 16 | (255 & lIiiii1I.charCodeAt(llIIi1i + 7)) << 24, 255 & lIiiii1I.charCodeAt(llIIi1i) | (255 & lIiiii1I.charCodeAt(llIIi1i + 1)) << 8 | (255 & lIiiii1I.charCodeAt(llIIi1i + 2)) << 16 | (255 & lIiiii1I.charCodeAt(llIIi1i + 3)) << 24];
          ii1li1li = [255 & lIiiii1I.charCodeAt(llIIi1i + 12) | (255 & lIiiii1I.charCodeAt(llIIi1i + 13)) << 8 | (255 & lIiiii1I.charCodeAt(llIIi1i + 14)) << 16 | (255 & lIiiii1I.charCodeAt(llIIi1i + 15)) << 24, 255 & lIiiii1I.charCodeAt(llIIi1i + 8) | (255 & lIiiii1I.charCodeAt(llIIi1i + 9)) << 8 | (255 & lIiiii1I.charCodeAt(llIIi1i + 10)) << 16 | (255 & lIiiii1I.charCodeAt(llIIi1i + 11)) << 24];
          l1I1i1I1 = l1ilIii(II1l1iil(l1I1i1I1 = l1ilIii(l1I1i1I1 = IlIllIi1(l1I1i1I1 = I1iiiiil(l1I1i1I1, Ill1ii = II1l1iil(Ill1ii = IlIllIi1(Ill1ii = II1l1iil(Ill1ii, li1ii1li), 31), lillIll)), 27), i1li1i1i), [0, 5]), [0, 1390208809]);
          i1li1i1i = l1ilIii(II1l1iil(i1li1i1i = l1ilIii(i1li1i1i = IlIllIi1(i1li1i1i = I1iiiiil(i1li1i1i, ii1li1li = II1l1iil(ii1li1li = IlIllIi1(ii1li1li = II1l1iil(ii1li1li, lillIll), 33), li1ii1li)), 31), l1I1i1I1), [0, 5]), [0, 944331445]);
        }
        switch (Ill1ii = [0, 0], ii1li1li = [0, 0], iiilI1Ii) {
          case 15:
            ii1li1li = I1iiiiil(ii1li1li, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 14)], 48));
          case 14:
            ii1li1li = I1iiiiil(ii1li1li, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 13)], 40));
          case 13:
            ii1li1li = I1iiiiil(ii1li1li, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 12)], 32));
          case 12:
            ii1li1li = I1iiiiil(ii1li1li, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 11)], 24));
          case 11:
            ii1li1li = I1iiiiil(ii1li1li, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 10)], 16));
          case 10:
            ii1li1li = I1iiiiil(ii1li1li, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 9)], 8));
          case 9:
            i1li1i1i = I1iiiiil(i1li1i1i, ii1li1li = II1l1iil(ii1li1li = IlIllIi1(ii1li1li = II1l1iil(ii1li1li = I1iiiiil(ii1li1li, [0, lIiiii1I.charCodeAt(llIIi1i + 8)]), lillIll), 33), li1ii1li));
          case 8:
            Ill1ii = I1iiiiil(Ill1ii, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 7)], 56));
          case 7:
            Ill1ii = I1iiiiil(Ill1ii, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 6)], 48));
          case 6:
            Ill1ii = I1iiiiil(Ill1ii, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 5)], 40));
          case 5:
            Ill1ii = I1iiiiil(Ill1ii, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 4)], 32));
          case 4:
            Ill1ii = I1iiiiil(Ill1ii, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 3)], 24));
          case 3:
            Ill1ii = I1iiiiil(Ill1ii, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 2)], 16));
          case 2:
            Ill1ii = I1iiiiil(Ill1ii, ililI1lI([0, lIiiii1I.charCodeAt(llIIi1i + 1)], 8));
          case 1:
            l1I1i1I1 = I1iiiiil(l1I1i1I1, Ill1ii = II1l1iil(Ill1ii = IlIllIi1(Ill1ii = II1l1iil(Ill1ii = I1iiiiil(Ill1ii, [0, lIiiii1I.charCodeAt(llIIi1i)]), li1ii1li), 31), lillIll));
        }
        return l1I1i1I1 = I1iiiiil(l1I1i1I1, [0, lIiiii1I.length]), i1li1i1i = l1ilIii(i1li1i1i = I1iiiiil(i1li1i1i, [0, lIiiii1I.length]), l1I1i1I1 = l1ilIii(l1I1i1I1, i1li1i1i)), l1I1i1I1 = iIillliI(l1I1i1I1), i1li1i1i = l1ilIii(i1li1i1i = iIillliI(i1li1i1i), l1I1i1I1 = l1ilIii(l1I1i1I1, i1li1i1i)), ("00000000" + (l1I1i1I1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (l1I1i1I1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (i1li1i1i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i1li1i1i[1] >>> 0).toString(16)).slice(-8);
      }
    };
  }();
  function ilII1l1I(I1IiII11) {
    I1IiII11 = JSON.stringify(I1IiII11);
    I1IiII11 = encodeURIComponent(I1IiII11);
    var il11l11i = "",
      I11Ii1ii = 0;
    do {
      var iI1lIi = I1IiII11.charCodeAt(I11Ii1ii++),
        l11lIl1i = I1IiII11.charCodeAt(I11Ii1ii++),
        i1ililIi = I1IiII11.charCodeAt(I11Ii1ii++),
        i1Iii1ii = iI1lIi >> 2;
      iI1lIi = (3 & iI1lIi) << 4 | l11lIl1i >> 4;
      var iiill11I = (15 & l11lIl1i) << 2 | i1ililIi >> 6,
        iii1IIll = 63 & i1ililIi;
      isNaN(l11lIl1i) ? iiill11I = iii1IIll = 64 : isNaN(i1ililIi) && (iii1IIll = 64);
      il11l11i = il11l11i + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(i1Iii1ii) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(iI1lIi) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(iiill11I) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(iii1IIll);
    } while (I11Ii1ii < I1IiII11.length);
    return il11l11i + "/";
  }
  var I11iiII1 = [$.UA.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "896x414", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null],
    l1Iil1II = IIlllIlI.hash128(I11iiII1.join("~~~"), 31),
    lIiII1iI = {
      "pin": "",
      "oid": "",
      "bizId": "jd-babelh5",
      "fc": "",
      "mode": "strict",
      "p": "s",
      "fp": l1Iil1II,
      "ctype": 1,
      "v": "3.1.1.0",
      "f": "3",
      "o": "prodev.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html",
      "qs": "",
      "jsTk": "",
      "qi": ""
    },
    Ii1liIil = ilII1l1I(lIiII1iI),
    iII111ii = {},
    I11iiII1 = new Date();
  iII111ii.ts = {};
  iII111ii.ts.deviceTime = I11iiII1.getTime();
  iII111ii.ca = {
    "tdHash": null
  };
  iII111ii.m = {
    "compatMode": "CSS1Compat"
  };
  iII111ii.fo = ["Arial Black", "Bauhaus 93", "Chalkduster", "GungSeo", "Hiragino Sans GB", "Impact", "Menlo", "Papyrus", "Rockwell"];
  iII111ii.n = {
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
  iII111ii.p = [];
  iII111ii.w = {
    "devicePixelRatio": 1,
    "screenTop": 0,
    "screenLeft": 0
  };
  iII111ii.s = {
    "availHeight": 896,
    "availWidth": 414,
    "colorDepth": 24,
    "height": 896,
    "width": 414,
    "pixelDepth": 24
  };
  iII111ii.sc = {
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
  iII111ii.ss = {
    "cookie": !0,
    "localStorage": !0,
    "sessionStorage": !0,
    "globalStorage": !1,
    "indexedDB": !0
  };
  iII111ii.tz = -480;
  iII111ii.lil = "";
  iII111ii.wil = "";
  iII111ii.ts.deviceEndTime = new Date().getTime();
  var IliiIIl = ilII1l1I(iII111ii);
  let I11Ii1l1 = {
    "url": "https://gia.jd.com/jsTk.do?a=" + Ii1liIil,
    "body": "d=" + IliiIIl,
    "headers": {
      "Accept": "*/*",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Origin": "https://pro.m.jd.com",
      "Referer": "https://pro.m.jd.com/",
      "User-Agent": $.UA
    },
    "timeout": 10000
  };
  return I11Ii1l1 = liliIlIl(I11Ii1l1), new Promise(i1lll11i => {
    $.post(I11Ii1l1, async (IllIlIl, I1Iiii1l, lliiilII) => {
      try {
        if (IllIlIl) console.log(IllIlIl);else {
          let l11iiIil = $.toObj(lliiilII, lliiilII);
          l11iiIil && typeof l11iiIil === "object" && l11iiIil.code == 0 && l11iiIil.data && l11iiIil.data.token ? $.eid_token = l11iiIil.data.token : console.log(lliiilII);
        }
      } catch (iIIIIi1) {
        $.logErr(iIIIIi1, I1Iiii1l);
      } finally {
        i1lll11i();
      }
    });
  });
}
function I1lIlIl(i1lIiI11, iIlIliIi, IiliI1i1 = "") {
  class l1Il111 {
    constructor(il1II11i = "", ii1ililI = "", IIili1l = "") {
      this.appId = il1II11i;
      this.v = "3.1";
      ii1ililI ? this.ua = ii1ililI : this.ua = this.__genUA();
      this.fp = IIili1l ? IIili1l : this.__genFp();
    }
    ["__format"](iliiiili, i1iIII1l) {
      if (!iliiiili) iliiiili = "yyyy-MM-dd";
      var iI1IlliI;
      !i1iIII1l ? iI1IlliI = Date.now() : iI1IlliI = new Date(i1iIII1l);
      var liiii1i1 = new Date(iI1IlliI),
        ilIiI1II = iliiiili,
        lIIi1liI = {
          "M+": liiii1i1.getMonth() + 1,
          "d+": liiii1i1.getDate(),
          "D+": liiii1i1.getDate(),
          "h+": liiii1i1.getHours(),
          "H+": liiii1i1.getHours(),
          "m+": liiii1i1.getMinutes(),
          "s+": liiii1i1.getSeconds(),
          "w+": liiii1i1.getDay(),
          "q+": Math.floor((liiii1i1.getMonth() + 3) / 3),
          "S+": liiii1i1.getMilliseconds()
        };
      /(y+)/i.test(ilIiI1II) && (ilIiI1II = ilIiI1II.replace(RegExp.$1, "".concat(liiii1i1.getFullYear()).substr(4 - RegExp.$1.length)));
      Object.keys(lIIi1liI).forEach(l1lilIli => {
        if (new RegExp("(".concat(l1lilIli, ")")).test(ilIiI1II)) {
          var Il1IlIil = "S+" === l1lilIli ? "000" : "00";
          ilIiI1II = ilIiI1II.replace(RegExp.$1, 1 == RegExp.$1.length ? lIIi1liI[l1lilIli] : "".concat(Il1IlIil).concat(lIIi1liI[l1lilIli]).substr("".concat(lIIi1liI[l1lilIli]).length));
        }
      });
      return ilIiI1II;
    }
    ["__genUA"]() {
      this.uid = $.CryptoJS.SHA1($.UserName + "red").toString();
      let iillIII1 = this.uid,
        Il1iiIIl = ["14.3"],
        l1Il1I11 = Il1iiIIl[Math.floor(Math.random() * Il1iiIIl.length)],
        iI1IIl1 = ["12,1"],
        iI1ii1 = iI1IIl1[Math.floor(Math.random() * iI1IIl1.length)],
        I1Ill1I1 = ["wifi"],
        Il1lli11 = I1Ill1I1[Math.floor(Math.random() * I1Ill1I1.length)],
        ilI11i = l1Il1I11.replace(/\./g, "_"),
        lIIIl1ll = [];
      lIIIl1ll = [["10.1.4", "167814"]];
      let iI1I1i = Math.floor(Math.random() * lIIIl1ll.length),
        lii1Ii = lIIIl1ll[iI1I1i] ? lIIIl1ll[iI1I1i] : lIIIl1ll[0];
      iI1ii1 = "iPhone" + iI1ii1;
      let Iiiil1iI = "";
      return Iiiil1iI = "jdapp;iPhone;" + lii1Ii[0] + ";" + l1Il1I11 + ";" + iillIII1 + ";network/" + Il1lli11 + ";model/" + iI1ii1 + ";addressid/;appBuild/" + lii1Ii[1] + ";jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + ilI11i + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", Iiiil1iI;
    }
    ["__genFp"]() {
      function II1ii1ll(iI11ii1I, ll1iiI1l) {
        var I11iIIii = [],
          Ii1iI1ii = iI11ii1I.length,
          IllIiI1 = iI11ii1I.split(""),
          I1il1i1I = "";
        for (; I1il1i1I = IllIiI1.shift();) {
          if (Math.random() * Ii1iI1ii < ll1iiI1l) {
            I11iIIii.push(I1il1i1I);
            if (--ll1iiI1l == 0) break;
          }
          Ii1iI1ii--;
        }
        for (var liIII1i1 = "", IIlil1lI = 0; IIlil1lI < I11iIIii.length; IIlil1lI++) {
          var lliIiIi = Math.random() * (I11iIIii.length - IIlil1lI) | 0;
          liIII1i1 += I11iIIii[lliIiIi];
          I11iIIii[lliIiIi] = I11iIIii[I11iIIii.length - IIlil1lI - 1];
        }
        return liIII1i1;
      }
      function illiill1(lIilI11i, ii1I1iii) {
        for (let iiiilIlI of ii1I1iii.slice()) lIilI11i = lIilI11i.replace(iiiilIlI, "");
        return lIilI11i;
      }
      var lI1lII1i = "0123456789",
        l11ii = II1ii1ll(lI1lII1i, 3),
        ll1iI1l1 = Math.random() * 10 | 0,
        li1I11il = illiill1(lI1lII1i, l11ii),
        i1lIiIl = {};
      i1lIiIl.size = ll1iI1l1;
      i1lIiIl.customDict = li1I11il;
      var iilli1ll = this.getRandomIDPro(i1lIiIl) + l11ii + this.getRandomIDPro({
          "size": 14 - (ll1iI1l1 + 3) + 1,
          "customDict": li1I11il
        }) + ll1iI1l1,
        ll11i1ii = iilli1ll.split(""),
        l1Ii11lI = [];
      for (; ll11i1ii.length > 0;) l1Ii11lI.push(9 - parseInt(ll11i1ii.pop()));
      var IilI11Ii = l1Ii11lI.join("");
      return IilI11Ii;
    }
    ["getRandomIDPro"]() {
      var Iililli,
        Ii11li1I,
        ii1llIll = void 0 === (iiilIi11 = (Ii11li1I = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).size) ? 10 : iiilIi11,
        iiilIi11 = void 0 === (iiilIi11 = Ii11li1I.dictType) ? "number" : iiilIi11,
        lIlIil1 = "";
      if ((Ii11li1I = Ii11li1I.customDict) && "string" == typeof Ii11li1I) Iililli = Ii11li1I;else switch (iiilIi11) {
        case "alphabet":
          Iililli = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "max":
          Iililli = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
          break;
        case "number":
        default:
          Iililli = "0123456789";
      }
      for (; ii1llIll--;) lIlIil1 += Iililli[Math.random() * Iililli.length | 0];
      return lIlIil1;
    }
    ["Encrypt"](iIl111iI, I1iiI1II) {
      let Ii1l1lI = $.CryptoJS.AES.encrypt(iIl111iI, $.CryptoJS.enc.Utf8.parse(I1iiI1II.key), {
        "iv": $.CryptoJS.enc.Utf8.parse(I1iiI1II.iv),
        "mode": $.CryptoJS.mode.CBC,
        "padding": $.CryptoJS.pad.Pkcs7
      });
      return Ii1l1lI.ciphertext.toString();
    }
    async ["__genAlgo"]() {
      let iiIiIi = {
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
        IilllIii = JSON.stringify(iiIiIi, null, 2),
        ilillI11 = this.Encrypt(IilllIii, {
          "key": "wm0!@w-s#ll1flo(",
          "iv": "0102030405060708"
        });
      var Iiil1ilI = {
        "version": this.v,
        "fp": this.fp,
        "appId": this.appId.toString(),
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": ilillI11 || ""
      };
      return new Promise(IIIi1IIi => {
        let IlI1IIli = {
          "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
          "body": JSON.stringify(Iiil1ilI),
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
        IlI1IIli = liliIlIl(IlI1IIli);
        $.post(IlI1IIli, async (l11I1IIl, I1ll1I11, lIillIIi) => {
          try {
            if (l11I1IIl) console.log(l11I1IIl);else {
              let iIlllI = $.toObj(lIillIIi, lIillIIi);
              iIlllI && typeof iIlllI === "object" && iIlllI.data && iIlllI.data.result && iIlllI.data.result.tk && (this.tk = iIlllI.data.result.tk, this.genKey = new Function("return " + iIlllI.data.result.algo)());
            }
          } catch (Iliiliii) {
            $.logErr(Iliiliii, I1ll1I11);
          } finally {
            IIIi1IIi();
          }
        });
      });
    }
    ["__genH5st"](IIIlIi1i = {}, Iii1I1ii = "") {
      let IIIil1li = undefined,
        lii1lI1i = {
          "ua": this.ua,
          "uid": this.uid
        };
      if (this.tk && this.genKey) {
        this.time = Date.now();
        this.timestamp = this.__format("yyyyMMddhhmmssSSS", this.time);
        let II1lli1l = this.genKey(this.tk, this.fp.toString(), this.timestamp.toString(), this.appId.toString(), $.CryptoJS).toString();
        var i1lIlli1 = {},
          liiiil1l = null;
        liiiil1l = Object.keys(IIIlIi1i).sort().map(function (iIl1iiiI) {
          var i1liIiIi = {};
          return i1liIiIi.key = iIl1iiiI, i1liIiIi.value = IIIlIi1i[iIl1iiiI], i1liIiIi;
        }).filter(function (IllliilI) {
          var IlIi1l11 = IllliilI.value,
            illI1li = "number" == typeof IlIi1l11 && !isNaN(IlIi1l11) || "string" == typeof IlIi1l11 || "boolean" == typeof IlIi1l11 || "body" == IllliilI.key;
          if (illI1li) {
            if ("body" == IllliilI.key && typeof IllliilI.value == "object") IllliilI.value = JSON.stringify(IllliilI.value);
            i1lIlli1[IllliilI.key] = IllliilI.value;
          }
          return illI1li;
        });
        IIIlIi1i = i1lIlli1;
        let II1Ili1I = "";
        II1Ili1I = Object.keys(IIIlIi1i).map(function (IIiIII) {
          return IIiIII + ":" + (IIiIII == "body" && IIIlIi1i[IIiIII].length !== 64 && IIIlIi1i[IIiIII].slice(0, 1) == "{" ? $.CryptoJS.SHA256(IIIlIi1i[IIiIII]).toString($.CryptoJS.enc.Hex) : IIIlIi1i[IIiIII]);
        }).join("&");
        II1Ili1I = $.CryptoJS.HmacSHA256(II1Ili1I, II1lli1l).toString($.CryptoJS.enc.Hex);
        let lIII1l1i = {
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {}
        };
        Iii1I1ii && (lIII1l1i.pp.p1 = Iii1I1ii);
        lIII1l1i.fp = this.fp;
        let liIll1il = JSON.stringify(lIII1l1i, null, 2),
          i11I11I1 = this.Encrypt(liIll1il, {
            "key": "wm0!@w_s#ll1flo(",
            "iv": "0102030405060708"
          });
        IIIil1li = [this.timestamp, this.fp, this.appId.toString(), this.tk, II1Ili1I, this.v, this.time.toString(), i11I11I1].join(";");
        lii1lI1i.t = IIIlIi1i.t;
      }
      return lii1lI1i.h5st = IIIil1li, lii1lI1i;
    }
  }
  lli1IllI = new l1Il111(i1lIiI11, iIlIliIi, IiliI1i1);
}
function IIIi11ii() {
  class iIIiiil1 {
    constructor() {
      this.UVCookie = "";
      this.ltr = 0;
      this.mr = [1, 0];
      this.mbaFlag = true;
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
    ["getUVCookie"](iIl1111 = "", lll11lil = "", i1II1I11 = "", iIIi1Ili = "") {
      try {
        this.document.location.href = this.document.location.hrefs + "";
        this.document.cookie = this.document.cookies + "";
        if (i1II1I11) this.document.location.href = i1II1I11;
        if (iIIi1Ili) this.document.cookie = iIIi1Ili;
        this.UVCookie = "";
        this.navigator.userAgent = this.navigator.userAgents + "";
        this.ltr = 1011 + Math.round(31 * Math.random());
        if (this.mbaFlag) {
          this.mr[1]++;
          this.mr[1] >= 314 && (this.mr[1] = Math.round(31 * Math.random()));
          !lll11lil && (lll11lil = $.CryptoJS.SHA1("").toString());
          let I1lIIll = 0;
          while (true) {
            this.mr[0] = parseInt(lll11lil.match(/\d/g)[I1lIIll]);
            I1lIIll++;
            if (this.mr[0] > 0 || I1lIIll >= lll11lil.match(/\d/g).length) break;
          }
          this.mr[0] += Math.round((new Date().getTime() - new Date("2023-06-02").getTime()) / 86400000);
        }
        if (iIl1111) this.navigator.userAgent = iIl1111;
        return this.lr = {
          "ckJda": "__jda",
          "ckJdb": "__jdb",
          "ckJdv": "__jdv",
          "ckJdc": "__jdc",
          "refUrl": "https://u.jd.com/"
        }, this.q(), this.s(lll11lil), this.UVCookie;
      } catch (ll1I1i) {
        console.log(ll1I1i);
      }
    }
    ["s"](lIi1Iill = "") {
      var i1I1i,
        I1i1Ill1,
        il11II11,
        I1lIi1I,
        I1iIII = (this.getCookie(this.lr.ckJda) || "").split("."),
        l1IIiIiI = (this.getCookie(this.lr.ckJdb) || "").split("."),
        i111li1l = (this.getCookie(this.lr.ckJdv) || "").split("|"),
        I1111l1l = this.getCookie(this.lr.ckJdc) || "",
        i1Ill1ii = parseInt((new Date().getTime() - this.ltr) / 1000),
        il11Iii = 0,
        Ii1lliI1 = 1,
        l1I1Iii = "direct",
        l11iIiil = "-",
        llI11i1l = "none",
        i1Ii1Ii1 = "-";
      if (I1iIII.length > 3) for (var IilI1i1i = 2; IilI1i1i < 5 && IilI1i1i < I1iIII.length; IilI1i1i++) {
        var ilII111I = I1iIII[IilI1i1i];
        ilII111I.length > 10 && (I1iIII[IilI1i1i] = ilII111I.substr(0, 10));
      }
      I1iIII.length > 5 ? (il11II11 = I1iIII[0], I1lIi1I = I1iIII[1], i1I1i = parseInt(I1iIII[2], 10), I1i1Ill1 = parseInt(I1iIII[3], 10), i1Ill1ii = parseInt(I1iIII[4], 10), Ii1lliI1 = parseInt(I1iIII[5], 10) || Ii1lliI1) : (I1lIi1I = this.genUuid(), i1I1i = i1Ill1ii, I1i1Ill1 = i1Ill1ii);
      this.lr.uuid = I1lIi1I;
      l1IIiIiI.length > 3 && (il11II11 || (il11II11 = l1IIiIiI[0]), il11Iii = parseInt(l1IIiIiI[1], 10) || 0);
      i111li1l.length > 4 && (il11II11 || (il11II11 = i111li1l[0]), l1I1Iii = i111li1l[1], l11iIiil = i111li1l[2], llI11i1l = i111li1l[3], i1Ii1Ii1 = i111li1l[4]);
      I1111l1l && "" !== I1111l1l && (il11II11 || (il11II11 = I1111l1l));
      var lli1I1i,
        ll1iIil = [],
        iilIlIII = l1IIiIiI.length < 4,
        i1IilIl1 = this.getParameter("utm_source"),
        i1iIIl1l = false;
      if (i1IilIl1) {
        var li1iIIII = this.getParameter("utm_campaign"),
          lIlili = this.getParameter("utm_medium"),
          iIlill1 = this.getParameter("utm_term");
        ll1iIil.push(i1IilIl1 || l1I1Iii);
        ll1iIil.push(li1iIIII || l11iIiil);
        ll1iIil.push(lIlili || llI11i1l);
        ll1iIil.push(iIlill1 || i1Ii1Ii1);
        i1Ii1Ii1 = ll1iIil[3];
        i1iIIl1l = !0;
      } else {
        var I1llIiII,
          lllI11iI = this.lr.refUrl && this.lr.refUrl.split("/")[2],
          iiiiI11 = false;
        if (lllI11iI && lllI11iI.indexOf(this.lr.ckDomain) < 0) {
          for (I1llIiII = this.lr.seo, IilI1i1i = 0; IilI1i1i < I1llIiII.length; IilI1i1i++) {
            var lil11lIl = I1llIiII[IilI1i1i].split(":");
            if (lllI11iI.indexOf(lil11lIl[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((lil11lIl[1] + "=").toLowerCase()) > -1) {
              var I1lii1I1 = this.getParameter(lil11lIl[1], this.lr.refUrl);
              /[^\x00-\xff]/.test(I1lii1I1) && (I1lii1I1 = encodeURIComponent(I1lii1I1));
              ll1iIil.push(lil11lIl[0]);
              ll1iIil.push("-");
              ll1iIil.push("organic");
              ll1iIil.push(I1lii1I1 || "not set");
              i1Ii1Ii1 = ll1iIil[3];
              iiiiI11 = !0;
              break;
            }
          }
          iiiiI11 || (lllI11iI.indexOf("zol.com.cn") > -1 ? (ll1iIil.push("zol.com.cn"), ll1iIil.push("-"), ll1iIil.push("cpc"), ll1iIil.push("not set")) : (ll1iIil.push(lllI11iI), ll1iIil.push("-"), ll1iIil.push("referral"), ll1iIil.push("-")));
        }
      }
      lli1I1i = ll1iIil.length > 0 && (ll1iIil[0] !== l1I1Iii || ll1iIil[1] !== l11iIiil || ll1iIil[2] !== llI11i1l) && "referral" !== ll1iIil[2];
      iilIlIII || !iilIlIII && lli1I1i ? (l1I1Iii = ll1iIil[0] || l1I1Iii, l11iIiil = ll1iIil[1] || l11iIiil, llI11i1l = ll1iIil[2] || llI11i1l, i1Ii1Ii1 = ll1iIil[3] || i1Ii1Ii1, I1iIII.length > 5 ? (i1I1i = parseInt(I1iIII[2], 10), I1i1Ill1 = parseInt(I1iIII[4], 10), i1Ill1ii = parseInt((new Date().getTime() - this.ltr) / 1000), Ii1lliI1++, il11Iii = 1) : (Ii1lliI1 = 1, il11Iii = 1)) : il11Iii++;
      var ll1lI1il = this.getPageParamFromSdk();
      if (ll1lI1il && ll1lI1il.vts) {
        var i1IllI1i = 1 * ll1lI1il.vts,
          Ii1lliII = 1 * ll1lI1il.seq;
        (i1IllI1i > Ii1lliI1 || i1IllI1i === Ii1lliI1 && Ii1lliII >= il11Iii) && (Ii1lliI1 = i1IllI1i, il11Iii = Ii1lliII + 1);
      }
      if (il11II11 || (il11II11 = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [il11II11, I1lIi1I, i1I1i, I1i1Ill1, i1Ill1ii, Ii1lliI1 || 1].join("."), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [il11II11, il11Iii, I1lIi1I + "|" + Ii1lliI1, i1Ill1ii].join("."), this.lr.ckDomain, this.lr.ckJdbExp), i1iIIl1l || lli1I1i || i111li1l.length < 5) {
        var I1lll111 = [il11II11, l1I1Iii || "direct", l11iIiil || "-", llI11i1l || "none", i1Ii1Ii1 || "-", new Date().getTime() - this.ltr].join("|");
        this.setJdv(I1lll111 = encodeURIComponent(I1lll111), il11II11);
      }
      this.setCookie(this.lr.ckJdc, il11II11, this.lr.ckDomain);
      if (this.mbaFlag) {
        this.setCookie("shshshfp", "", this.lr.ckDomain);
        this.setCookie("shshshfpa", "", this.lr.ckDomain);
        this.setCookie("mba_sid", this.mr.join("."), this.lr.ckDomain);
        this.setCookie("mba_muid", [I1lIi1I, this.mr[0], new Date().getTime()].join("."), this.lr.ckDomain);
        this.setCookie("pre_seq", Math.round(5 * Math.random()) * 2 + 1, this.lr.ckDomain);
        var il11Iii = 0;
        var liIiillI = "";
        if (lIi1Iill) {
          while (true) {
            liIiillI += lIi1Iill.match(/\d/g)[il11Iii];
            il11Iii++;
            if (liIiillI.split("").length >= 2 || il11Iii >= lIi1Iill.match(/\d/g).length) break;
          }
          this.setCookie("pre_session", lIi1Iill + "|" + (parseInt(this.mr[0]) + parseInt(liIiillI)), this.lr.ckDomain);
        }
      }
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
    ["setCookie"](Iii1iII1, l111l11, lIIlI11l, l1li1lI) {
      if (Iii1iII1) {
        var li1IiiI1 = "";
        if (l1li1lI) {
          var IIIII1l1 = new Date();
          IIIII1l1.setTime(IIIII1l1.getTime() - this.ltr + l1li1lI);
          li1IiiI1 = ";expires=" + IIIII1l1.toGMTString();
        }
        this.UVCookie += Iii1iII1 + "=" + l111l11 + "; ";
      }
    }
    ["setJdv"](iliIiii1, l1iii1l1, II1ii1Il) {
      var Il1IIIiI = "";
      Il1IIIiI = this.isPrey(10) && (!iliIiii1 || iliIiii1.length > 400) ? l1iii1l1 + "|direct|-|none|-|" + (new Date().getTime() - this.ltr) : iliIiii1;
      var IiilI1l1 = II1ii1Il || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
      this.setCookie(this.lr.ckJdv || "__jdv", Il1IIIiI, this.lr.ckDomain, IiilI1l1);
    }
    ["getCookie"](IIiliI11, liii1Ii) {
      var llIiiliI = this.document.cookie.match(new RegExp("(^| )" + IIiliI11 + "=([^;]*)(;|$)"));
      return null !== llIiiliI ? liii1Ii ? llIiiliI[2] : this.urlDecode(llIiiliI[2]) : "";
    }
    ["genUuid"]() {
      return new Date().getTime() - this.ltr + "" + parseInt(2147483647 * Math.random());
    }
    ["getParameter"](lI1IIli1, I1IiIli1) {
      var l1iIl1Il = I1IiIli1 || this.document.location.href,
        lIi1ll1I = new RegExp("(?:^|&|[?]|[/])" + lI1IIli1 + "=([^&]*)").exec(l1iIl1Il);
      return lIi1ll1I ? this.urlDecode(lIi1ll1I[1]) : null;
    }
    ["urlDecode"](l11i1II1) {
      try {
        return decodeURIComponent(l11i1II1);
      } catch (lIlllii) {
        return l11i1II1;
      }
    }
    ["genHash"](i1i1lII1) {
      var Il1i1lI1,
        llIil1II = 1,
        Ill1liI1 = 0;
      if (i1i1lII1) for (llIil1II = 0, Il1i1lI1 = i1i1lII1.length - 1; Il1i1lI1 >= 0; Il1i1lI1--) {
        llIil1II = 0 !== (Ill1liI1 = 266338304 & (llIil1II = (llIil1II << 6 & 268435455) + (Ill1liI1 = i1i1lII1.charCodeAt(Il1i1lI1)) + (Ill1liI1 << 14))) ? llIil1II ^ Ill1liI1 >> 21 : llIil1II;
      }
      return llIil1II;
    }
    ["isPrey"](i1i11III) {
      if (i1i11III >= 100) return !0;
      var l1Ill1lI = this.lr.uuid,
        Ii1lIIil = l1Ill1lI.substr(l1Ill1lI.length - 2);
      return !!Ii1lIIil && 1 * Ii1lIIil < i1i11III;
    }
    ["isEmbedded"]() {
      var l1Ii11I = this.navigator.userAgent || "";
      return /^(jdapp|jdltapp|jdpingou);/.test(l1Ii11I) || this.isJdLog();
    }
    ["isJdLog"]() {
      return (this.navigator.userAgent || "").indexOf(";jdlog;") > -1;
    }
    ["getPageParamFromSdk"]() {
      var lI111iII, lI1llIi1;
      try {
        this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? lI1llIi1 = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? lI1llIi1 = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (lI1llIi1 = this.window.prompt("JDMAGetMPageParam", ""));
        lI1llIi1 && (lI111iII = JSON.parse(lI1llIi1));
      } catch (iili11I1) {}
      return lI111iII;
    }
    ["time"](Iii1III, iIlIiiil = null) {
      const li1IIiI = iIlIiiil ? new Date(iIlIiiil) : new Date();
      let l11ilI1 = {
        "M+": li1IIiI.getMonth() + 1,
        "d+": li1IIiI.getDate(),
        "H+": li1IIiI.getHours(),
        "m+": li1IIiI.getMinutes(),
        "s+": li1IIiI.getSeconds(),
        "q+": Math.floor((li1IIiI.getMonth() + 3) / 3),
        "S": li1IIiI.getMilliseconds()
      };
      /(y+)/.test(Iii1III) && (Iii1III = Iii1III.replace(RegExp.$1, (li1IIiI.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let llIiIlI in l11ilI1) new RegExp("(" + llIiIlI + ")").test(Iii1III) && (Iii1III = Iii1III.replace(RegExp.$1, 1 == RegExp.$1.length ? l11ilI1[llIiIlI] : ("00" + l11ilI1[llIiIlI]).substr(("" + l11ilI1[llIiIlI]).length)));
      return Iii1III;
    }
  }
  liliIlI = new iIIiiil1();
}
function iiI1Il1i(I111li11) {
  I111li11 = I111li11 || 32;
  let I1liIlll = "abcdef0123456789",
    liiI1liI = I1liIlll.length,
    lIiii1i1 = "";
  for (i = 0; i < I111li11; i++) lIiii1i1 += I1liIlll.charAt(Math.floor(Math.random() * liiI1liI));
  return lIiii1i1;
}