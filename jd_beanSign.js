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
const l1i1Il = $.isNode() ? require("./sendNotify") : "",
  ill1I1 = $.isNode() ? require("./jdCookie.js") : "",
  l1i1II = require("crypto-js"),
  ili111 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
  IllIli = require("./function/krgetSign"),
  ii1Ii = process.env.JD_SIGN_KRAPI || "";
let ii1Il = [],
  l1iII = "";
if ($.isNode()) {
  Object.keys(ill1I1).forEach(l1iIlI => {
    ii1Il.push(ill1I1[l1iIlI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else ii1Il = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ii1il($.getdata("CookiesJD") || "[]").map(iI111I => iI111I.cookie)].filter(IIIlI1 => !!IIIlI1);
let iI1Ill = "";
const lilI1 = "https://api.m.jd.com/client.action";
!(async () => {
  if (!ii1Il[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：APP首页-领京豆-签到");
  for (let iI111i = 0; iI111i < ii1Il.length; iI111i++) {
    if (ii1Il[iI111i]) {
      l1iII = ii1Il[iI111i];
      $.UserName = decodeURIComponent(l1iII.match(/pt_pin=([^; ]+)(?=;?)/) && l1iII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iI111i + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await l1i1Il.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      Iii1();
      await IIIi1();
      await $.wait(1500);
    }
  }
  if (iI1Ill) {
    if ($.isNode()) await l1i1Il.sendNotify("" + $.name, "" + iI1Ill);
    $.msg($.name, "", iI1Ill);
  }
})().catch(i1lIii => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + i1lIii + "!", "");
}).finally(() => {
  $.done();
});
async function IIIi1() {
  await I1I1lI();
  await $.wait(500);
}
function i1llli(III11l, llIl1i = "qwertyuiopasdfghjklzxcvbnm") {
  let IiiII = "";
  for (let ii1i1 = 0; ii1i1 < III11l; ii1i1++) {
    IiiII += llIl1i[Math.floor(Math.random() * llIl1i.length)];
  }
  return IiiII;
}
function i1llll(IIIll, I1I1il = {}) {
  let liII1 = [],
    I1I1ii = I1I1il.connector || "&",
    l1llil = Object.keys(IIIll);
  if (I1I1il.sort) l1llil = l1llil.sort();
  for (let l1iIll of l1llil) {
    let l1iIli = IIIll[l1iIll];
    if (l1iIli && typeof l1iIli === "object") l1iIli = JSON.stringify(l1iIli);
    if (l1iIli && I1I1il.encode) l1iIli = encodeURIComponent(l1iIli);
    liII1.push(l1iIll + "=" + l1iIli);
  }
  return liII1.join(I1I1ii);
}
function iI1Ili(I1I1iI) {
  return I1I1iI[Math.floor(Math.random() * I1I1iI.length)];
}
function llIIiI(IIIlII = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", iiIiI1 = "0123456789abcdef") {
  let ili1Ii = "";
  for (let i1lIli of IIIlII) {
    if (i1lIli == "x") ili1Ii += iiIiI1.charAt(Math.floor(Math.random() * iiIiI1.length));else i1lIli == "X" ? ili1Ii += iiIiI1.charAt(Math.floor(Math.random() * iiIiI1.length)).toUpperCase() : ili1Ii += i1lIli;
  }
  return ili1Ii;
}
function iI1111(liIlil) {
  liIlil = liIlil.replace(/rn/g, "n");
  var ll11il = "";
  for (var iI1lIl = 0; iI1lIl < liIlil.length; iI1lIl++) {
    var iiIiII = liIlil.charCodeAt(iI1lIl);
    if (iiIiII < 128) ll11il += String.fromCharCode(iiIiII);else {
      if (iiIiII > 127 && iiIiII < 2048) {
        ll11il += String.fromCharCode(iiIiII >> 6 | 192);
        ll11il += String.fromCharCode(iiIiII & 63 | 128);
      } else {
        ll11il += String.fromCharCode(iiIiII >> 12 | 224);
        ll11il += String.fromCharCode(iiIiII >> 6 & 63 | 128);
        ll11il += String.fromCharCode(iiIiII & 63 | 128);
      }
    }
  }
  return ll11il;
}
function IIIl1(Iill, ili1II) {
  ili1II = ili1II || ili111;
  var ll11i = "",
    iI1lI1,
    I1I1li,
    l1i11,
    IlI1li,
    IlI1ll,
    ll11l,
    III111,
    liIll1 = 0;
  Iill = iI1111(Iill);
  while (liIll1 < Iill.length) {
    iI1lI1 = Iill.charCodeAt(liIll1++);
    I1I1li = Iill.charCodeAt(liIll1++);
    l1i11 = Iill.charCodeAt(liIll1++);
    IlI1li = iI1lI1 >> 2;
    IlI1ll = (iI1lI1 & 3) << 4 | I1I1li >> 4;
    ll11l = (I1I1li & 15) << 2 | l1i11 >> 6;
    III111 = l1i11 & 63;
    if (isNaN(I1I1li)) ll11l = III111 = 64;else isNaN(l1i11) && (III111 = 64);
    ll11i = ll11i + ili1II.charAt(IlI1li) + ili1II.charAt(IlI1ll) + ili1II.charAt(ll11l) + ili1II.charAt(III111);
  }
  while (ll11i.length % 4 > 1) ll11i += "=";
  return ll11i;
}
function ii1ii(l11iI1 = {}) {
  let lI111i = {
    "ciphertype": 5,
    "cipher": {
      "ud": IIIl1(l1i1II.SHA1($.UserName).toString()),
      "sv": IIIl1($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(lI111i);
}
function Iii1(I1iI1I, illll1 = {}) {
  const liiilI = {
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
    lI111l = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = iI1Ili(lI111l);
  let liiii1 = I1iI1I || "jd",
    IIiiIl = illll1?.["ep"] ? illll1?.["ep"] : true;
  if (!liiilI[liiii1]) {
    console.log("获取[" + liiii1 + "]UA失败");
    return;
  }
  $.client = illll1?.["client"] ? illll1?.["client"] : liiilI[liiii1].client;
  $.clientVersion = illll1?.["clientVersion"] ? illll1?.["clientVersion"] : liiilI[liiii1].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let l1ilIl = "android";
  $.client == "apple" && (l1ilIl = "iPhone");
  ii1ii();
  let IIiiIi = [liiilI[liiii1].app, l1ilIl, $.clientVersion, "", "rn/" + llIIiI(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + liiilI[liiii1].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", IIiiIl ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = IIiiIi.join(";");
}
async function I1I1lI() {
  const II1l = "{\"fp\":\"-1\",\"shshshfp\":\"-1\",\"shshshfpa\":\"-1\",\"referUrl\":\"-1\",\"userAgent\":\"-1\",\"jda\":\"-1\",\"rnVersion\":\"3.9\"}";
  sign = await IllIli("signBeanAct", JSON.parse(II1l));
  ii1Ii ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
  !$.signStr && console.log("接口获取失败，跳过");
  let liiiiI = {
    "url": lilI1 + "?functionId=signBeanAct&" + $.signStr,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Cookie": l1iII,
      "User-Agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "timeout": 10 * 1000
  };
  return new Promise(ll11ll => {
    $.get(liiiiI, (l11iIl, i11iIi, IIIIll) => {
      try {
        if (l11iIl) $.log(l11iIl);else {
          IIIIll = JSON.parse(IIIIll);
          if (IIIIll.code == 0 && !IIIIll?.["errorCode"]) {
            let llIii = IIIIll?.["data"]?.["dailyAward"] || IIIIll?.["data"]?.["continuityAward"];
            console.log("" + (llIii?.["title"] || "") + (llIii?.["subTitle"] || "") + llIii?.["beanAward"]?.["beanCount"] + "京豆");
          } else IIIIll.code == 3 ? console.log("签到失败," + IIIIll?.["errorMessage"]) : console.log("签到失败," + IIIIll?.["errorCode"] + ":" + IIIIll?.["errorMessage"]);
        }
      } catch (IIIIi1) {
        $.log(IIIIi1);
      } finally {
        ll11ll();
      }
    });
  });
}
function ii1il(I1ll1l) {
  if (typeof I1ll1l == "string") try {
    return JSON.parse(I1ll1l);
  } catch (i1I11) {
    return console.log(i1I11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}