/*
领京豆签到
cron:15 0,16 * * *
============Quantumultx===============
[task_local]
#领京豆签到
15 0,16 * * * jd_beanSign.js, tag=领京豆签到, enabled=true
 */
const Env=require('./utils/Env');
const $ = new Env('领京豆签到');
const ll11I = $.isNode() ? require("./sendNotify") : "",
  iIi1I = $.isNode() ? require("./jdCookie.js") : "",
  liIIl = require("crypto-js"),
  IlI1lI = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
  IilllI = require("./function/krgetSign"),
  iI1lIi = process.env.JD_SIGN_KRAPI || "";
let l1lllI = [],
  llliIi = "";
if ($.isNode()) {
  Object.keys(iIi1I).forEach(ll11lI => {
    l1lllI.push(iIi1I[ll11lI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1lllI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Iil1($.getdata("CookiesJD") || "[]").map(llliI1 => llliI1.cookie)].filter(liIII => !!liIII);
let i1lIli = "";
const i1lIll = "https://api.m.jd.com/client.action";
!(async () => {
  if (!l1lllI[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：APP首页-领京豆-签到");
  for (let IilI = 0; IilI < l1lllI.length; IilI++) {
    if (l1lllI[IilI]) {
      llliIi = l1lllI[IilI];
      $.UserName = decodeURIComponent(llliIi.match(/pt_pin=([^; ]+)(?=;?)/) && llliIi.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IilI + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await ll11I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      Iili();
      await ll11ii();
      await $.wait(1500);
    }
  }
  if (i1lIli) {
    if ($.isNode()) await ll11I.sendNotify("" + $.name, "" + i1lIli);
    $.msg($.name, "", i1lIli);
  }
})().catch(lil11 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lil11 + "!", "");
}).finally(() => {
  $.done();
});
async function ll11ii() {
  await iIi11();
  await $.wait(500);
}
function liIlii(III11I, Ilii1 = "qwertyuiopasdfghjklzxcvbnm") {
  let ili1I1 = "";
  for (let liIllI = 0; liIllI < III11I; liIllI++) {
    ili1I1 += Ilii1[Math.floor(Math.random() * Ilii1.length)];
  }
  return ili1I1;
}
function llii1l(ll11i, iI1lI1 = {}) {
  let l1i11 = [],
    IlI1li = iI1lI1.connector || "&",
    IlI1ll = Object.keys(ll11i);
  if (iI1lI1.sort) IlI1ll = IlI1ll.sort();
  for (let I1lIIl of IlI1ll) {
    let l1ilI1 = ll11i[I1lIIl];
    if (l1ilI1 && typeof l1ilI1 === "object") l1ilI1 = JSON.stringify(l1ilI1);
    if (l1ilI1 && iI1lI1.encode) l1ilI1 = encodeURIComponent(l1ilI1);
    l1i11.push(I1lIIl + "=" + l1ilI1);
  }
  return l1i11.join(IlI1li);
}
function liIlil(l1l1Ii) {
  return l1l1Ii[Math.floor(Math.random() * l1l1Ii.length)];
}
function llii1i(lllII = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", l11iII = "0123456789abcdef") {
  let l11iI1 = "";
  for (let lI111l of lllII) {
    if (lI111l == "x") l11iI1 += l11iII.charAt(Math.floor(Math.random() * l11iII.length));else lI111l == "X" ? l11iI1 += l11iII.charAt(Math.floor(Math.random() * l11iII.length)).toUpperCase() : l11iI1 += lI111l;
  }
  return l11iI1;
}
function ll11il(l1ilIl) {
  l1ilIl = l1ilIl.replace(/rn/g, "n");
  var l1ilIi = "";
  for (var l11iIi = 0; l11iIi < l1ilIl.length; l11iIi++) {
    var ll11li = l1ilIl.charCodeAt(l11iIi);
    if (ll11li < 128) l1ilIi += String.fromCharCode(ll11li);else {
      if (ll11li > 127 && ll11li < 2048) {
        l1ilIi += String.fromCharCode(ll11li >> 6 | 192);
        l1ilIi += String.fromCharCode(ll11li & 63 | 128);
      } else {
        l1ilIi += String.fromCharCode(ll11li >> 12 | 224);
        l1ilIi += String.fromCharCode(ll11li >> 6 & 63 | 128);
        l1ilIi += String.fromCharCode(ll11li & 63 | 128);
      }
    }
  }
  return l1ilIi;
}
function iI1lIl(i11iIl, ll11ll) {
  ll11ll = ll11ll || IlI1lI;
  var i11iIi = "",
    IIIIll,
    liiiii,
    II1I,
    lI1111,
    Ilil1,
    IliII1,
    l1iIi1,
    i1I1I = 0;
  i11iIl = ll11il(i11iIl);
  while (i1I1I < i11iIl.length) {
    IIIIll = i11iIl.charCodeAt(i1I1I++);
    liiiii = i11iIl.charCodeAt(i1I1I++);
    II1I = i11iIl.charCodeAt(i1I1I++);
    lI1111 = IIIIll >> 2;
    Ilil1 = (IIIIll & 3) << 4 | liiiii >> 4;
    IliII1 = (liiiii & 15) << 2 | II1I >> 6;
    l1iIi1 = II1I & 63;
    if (isNaN(liiiii)) IliII1 = l1iIi1 = 64;else isNaN(II1I) && (l1iIi1 = 64);
    i11iIi = i11iIi + ll11ll.charAt(lI1111) + ll11ll.charAt(Ilil1) + ll11ll.charAt(IliII1) + ll11ll.charAt(l1iIi1);
  }
  while (i11iIi.length % 4 > 1) i11iIi += "=";
  return i11iIi;
}
function iiIiII(Iii1Ii = {}) {
  let i1l1I1 = {
    "ciphertype": 5,
    "cipher": {
      "ud": iI1lIl(liIIl.SHA1($.UserName).toString()),
      "sv": iI1lIl($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(i1l1I1);
}
function Iili(illlll, IIIIiI = {}) {
  const i1i111 = {
      "jd": {
        "app": "jdapp",
        "appBuild": "168392",
        "client": "android",
        "clientVersion": "10.1.0"
      },
      "lite": {
        "app": "jdltapp",
        "appBuild": "1247",
        "client": "ios",
        "clientVersion": "6.0.0"
      }
    },
    ii1l1I = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = liIlil(ii1l1I);
  let lI1lII = illlll || "jd",
    lIill1 = IIIIiI?.["ep"] ? IIIIiI?.["ep"] : true;
  if (!i1i111[lI1lII]) {
    console.log("获取[" + lI1lII + "]UA失败");
    return;
  }
  $.client = IIIIiI?.["client"] ? IIIIiI?.["client"] : i1i111[lI1lII].client;
  $.clientVersion = IIIIiI?.["clientVersion"] ? IIIIiI?.["clientVersion"] : i1i111[lI1lII].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let iiI1i1 = "android";
  $.client == "apple" && (iiI1i1 = "iPhone");
  iiIiII();
  let ilIlII = [i1i111[lI1lII].app, iiI1i1, $.clientVersion, "", "rn/" + llii1i(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + i1i111[lI1lII].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", lIill1 ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = ilIlII.join(";");
}
async function iIi11() {
  const iIiiil = "{\"fp\":\"-1\",\"shshshfp\":\"-1\",\"shshshfpa\":\"-1\",\"referUrl\":\"-1\",\"userAgent\":\"-1\",\"jda\":\"-1\",\"rnVersion\":\"3.9\"}";
  sign = await IilllI("signBeanAct", JSON.parse(iIiiil));
  iI1lIi ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
  if (!$.signStr) {
    console.log("接口获取失败，跳过");
  }
  let ilIlIi = {
    "url": i1lIll + "?functionId=signBeanAct&" + $.signStr,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Cookie": llliIi,
      "User-Agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://h5.m.jd.com/rn/42yjy8na6pFsq1cx9MJQ5aTgu3kX/index.html"
    },
    "timeout": 10 * 1000
  };
  return new Promise(IIlil1 => {
    $.post(ilIlIi, (lIl1l1, li1i, ilIIil) => {
      try {
        if (lIl1l1) $.log(lIl1l1);else {
          ilIIil = JSON.parse(ilIIil);
          if (ilIIil.code == 0 && !ilIIil?.["errorCode"]) {
            let lIilil = ilIIil?.["data"]?.["dailyAward"] || ilIIil?.["data"]?.["continuityAward"];
            console.log("" + (lIilil?.["title"] || "") + (lIilil?.["subTitle"] || "") + lIilil?.["beanAward"]?.["beanCount"] + "京豆");
          } else {
            if (ilIIil.code == 3) console.log("签到失败," + ilIIil?.["errorMessage"]);else {
              console.log("签到失败," + ilIIil?.["errorCode"] + ":" + ilIIil?.["errorMessage"]);
            }
          }
        }
      } catch (lilill) {
        $.log(lilill);
      } finally {
        IIlil1();
      }
    });
  });
}
function Iil1(IilI1) {
  if (typeof IilI1 == "string") try {
    return JSON.parse(IilI1);
  } catch (liI1II) {
    return console.log(liI1II), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}