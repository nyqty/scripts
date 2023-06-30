/*
京东国际签到
cron:31 1 * * *
============Quantumultx===============
[task_local]
#京东国际签到
31 1 * * * jd_jdgj_sign.js, tag=京东国际签到, enabled=true
 */
const Env=require('./utils/Env');
const $ = new Env('京东国际签到');
const III111 = $.isNode() ? require("./sendNotify") : "",
  liIll1 = $.isNode() ? require("./jdCookie.js") : "",
  l1llli = require("crypto-js"),
  iI1lII = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
  l1i1I = require("./function/krgetSign"),
  l1llll = process.env.JD_SIGN_KRAPI || "";
let I1I1ll = [],
  lil1i = "";
if ($.isNode()) {
  Object.keys(liIll1).forEach(l1ilI1 => {
    I1I1ll.push(liIll1[l1ilI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1I1ll = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Iliil($.getdata("CookiesJD") || "[]").map(l1l1Il => l1l1Il.cookie)].filter(lil1I => !!lil1I);
let liiiil = "";
const IIIIli = "https://api.m.jd.com/client.action";
!(async () => {
  if (!I1I1ll[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let lllII = 0; lllII < I1I1ll.length; lllII++) {
    if (I1I1ll[lllII]) {
      lil1i = I1I1ll[lllII];
      $.UserName = decodeURIComponent(lil1i.match(/pt_pin=([^; ]+)(?=;?)/) && lil1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lllII + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await III111.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      l1i1l();
      await lllIi();
      await $.wait(1500);
    }
  }
  if (liiiil) {
    if ($.isNode()) await III111.sendNotify("" + $.name, "" + liiiil);
    $.msg($.name, "", liiiil);
  }
})().catch(l1i11i => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + l1i11i + "!", "");
}).finally(() => {
  $.done();
});
async function lllIi() {
  await I1iI1l();
  await $.wait(500);
  await illlil();
  await $.wait(1500);
}
function lil1l(lI111i, I1lIII = "qwertyuiopasdfghjklzxcvbnm") {
  let I1iI1I = "";
  for (let liiii1 = 0; liiii1 < lI111i; liiii1++) {
    I1iI1I += I1lIII[Math.floor(Math.random() * I1lIII.length)];
  }
  return I1iI1I;
}
function lllIl(l1ilIl, IIiiIi = {}) {
  let l11iIi = [],
    ll11li = IIiiIi.connector || "&",
    iliIlI = Object.keys(l1ilIl);
  if (IIiiIi.sort) iliIlI = iliIlI.sort();
  for (let II1l of iliIlI) {
    let liiiiI = l1ilIl[II1l];
    if (liiiiI && typeof liiiiI === "object") liiiiI = JSON.stringify(liiiiI);
    if (liiiiI && IIiiIi.encode) liiiiI = encodeURIComponent(liiiiI);
    l11iIi.push(II1l + "=" + liiiiI);
  }
  return l11iIi.join(ll11li);
}
function Iliii(II1i) {
  return II1i[Math.floor(Math.random() * II1i.length)];
}
function illlii(I1iI11 = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", II11 = "0123456789abcdef") {
  let ii1II1 = "";
  for (let i11iIi of I1iI11) {
    if (i11iIi == "x") ii1II1 += II11.charAt(Math.floor(Math.random() * II11.length));else i11iIi == "X" ? ii1II1 += II11.charAt(Math.floor(Math.random() * II11.length)).toUpperCase() : ii1II1 += i11iIi;
  }
  return ii1II1;
}
function I1lIIi(II1I) {
  II1I = II1I.replace(/rn/g, "n");
  var Ilil1 = "";
  for (var IliII1 = 0; IliII1 < II1I.length; IliII1++) {
    var l1iIi1 = II1I.charCodeAt(IliII1);
    if (l1iIi1 < 128) {
      Ilil1 += String.fromCharCode(l1iIi1);
    } else l1iIi1 > 127 && l1iIi1 < 2048 ? (Ilil1 += String.fromCharCode(l1iIi1 >> 6 | 192), Ilil1 += String.fromCharCode(l1iIi1 & 63 | 128)) : (Ilil1 += String.fromCharCode(l1iIi1 >> 12 | 224), Ilil1 += String.fromCharCode(l1iIi1 >> 6 & 63 | 128), Ilil1 += String.fromCharCode(l1iIi1 & 63 | 128));
  }
  return Ilil1;
}
function l1i1i(llIlI, l1iIil) {
  l1iIil = l1iIil || iI1lII;
  var lI1lIi = "";
  var ii1l11, IIIIii, liiill, IIIIil, lI1lIl, liiili, I1ll11;
  var Iii1Ii = 0;
  llIlI = I1lIIi(llIlI);
  while (Iii1Ii < llIlI.length) {
    ii1l11 = llIlI.charCodeAt(Iii1Ii++);
    IIIIii = llIlI.charCodeAt(Iii1Ii++);
    liiill = llIlI.charCodeAt(Iii1Ii++);
    IIIIil = ii1l11 >> 2;
    lI1lIl = (ii1l11 & 3) << 4 | IIIIii >> 4;
    liiili = (IIIIii & 15) << 2 | liiill >> 6;
    I1ll11 = liiill & 63;
    if (isNaN(IIIIii)) liiili = I1ll11 = 64;else isNaN(liiill) && (I1ll11 = 64);
    lI1lIi = lI1lIi + l1iIil.charAt(IIIIil) + l1iIil.charAt(lI1lIl) + l1iIil.charAt(liiili) + l1iIil.charAt(I1ll11);
  }
  while (lI1lIi.length % 4 > 1) lI1lIi += "=";
  return lI1lIi;
}
function I1iI1i(iIiilI = {}) {
  let iIiiii = {
    "ciphertype": 5,
    "cipher": {
      "ud": l1i1i(l1llli.SHA1($.UserName).toString()),
      "sv": l1i1i($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(iIiiii);
}
function l1i1l(l1lI1I, ll1llI = {}) {
  const l1lI11 = {
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
    lI1iii = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = Iliii(lI1iii);
  let i11lIi = l1lI1I || "jd",
    ll1ll1 = ll1llI?.["ep"] ? ll1llI?.["ep"] : true;
  if (!l1lI11[i11lIi]) {
    console.log("获取[" + i11lIi + "]UA失败");
    return;
  }
  $.client = ll1llI?.["client"] ? ll1llI?.["client"] : l1lI11[i11lIi].client;
  $.clientVersion = ll1llI?.["clientVersion"] ? ll1llI?.["clientVersion"] : l1lI11[i11lIi].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let lilil1 = "android";
  $.client == "apple" && (lilil1 = "iPhone");
  I1iI1i();
  let lIilli = [l1lI11[i11lIi].app, lilil1, $.clientVersion, "", "rn/" + illlii(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + l1lI11[i11lIi].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", ll1ll1 ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = lIilli.join(";");
}
async function I1iI1l() {
  const ilI11l = "{\"businessId\":\"1\",\"type\":\"1\",\"themeId\":\"331\",\"uuid\":\"\"}";
  sign = await l1i1I("userFollow", JSON.parse(ilI11l));
  l1llll ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
  !$.signStr && console.log("接口获取失败，跳过");
  let li1I = {
    "url": IIIIli + "?functionId=userFollow&" + $.signStr,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Cookie": lil1i,
      "User-Agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "timeout": 10 * 1000
  };
  return new Promise(lI1ii1 => {
    $.get(li1I, (iiI1li, IIliii, i1111I) => {
      try {
        if (iiI1li) $.log(iiI1li);else {
          i1111I = JSON.parse(i1111I);
          if (i1111I.code == 0 && !i1111I?.["message"]) console.log("" + i1111I?.["guideFollowText"]);else {
            if (i1111I.code == 3) {
              console.log("关注失败,可能未登录");
            } else {
              console.log("关注失败," + i1111I);
            }
          }
        }
      } catch (i1lll) {
        $.log(i1lll);
      } finally {
        lI1ii1();
      }
    });
  });
}
async function illlil() {
  const i1lli = "{\"floorId\": \"83596202\"}";
  sign = await l1i1I("signInWithPrize", JSON.parse(i1lli));
  if (l1llll) {
    $.signStr = sign?.["data"]?.["convertUrl"] || "";
  } else $.signStr = sign?.["body"] || "";
  !$.signStr && console.log("接口获取失败，跳过");
  let i11111 = {
    "url": IIIIli + "?functionId=signInWithPrize&" + $.signStr,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Cookie": lil1i,
      "User-Agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "timeout": 10 * 1000
  };
  return new Promise(IliIll => {
    $.get(i11111, (lilI1I, lI1I1l, Il1Il) => {
      try {
        if (lilI1I) {
          $.log(lilI1I);
        } else {
          Il1Il = JSON.parse(Il1Il);
          if (Il1Il.code == 0 && !Il1Il?.["message"]) console.log("签到成功: " + Il1Il?.["result"]?.["signInText"]);else {
            if (Il1Il.code == 3) console.log("签到失败,可能未登录");else {
              console.log("签到失败," + Il1Il?.["message"]);
            }
          }
        }
      } catch (i1Iiil) {
        $.log(i1Iiil);
      } finally {
        IliIll();
      }
    });
  });
}
function Iliil(i1Iiii) {
  if (typeof i1Iiii == "string") try {
    return JSON.parse(i1Iiii);
  } catch (IilIi) {
    return console.log(IilIi), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function I1lIIl(i1liI, iilIIi) {
  let IIlI1i = new RegExp("(^|[&?])" + iilIIi + "=([^&]*)(&|$)"),
    iiiI1i = i1liI.match(IIlI1i);
  if (iiiI1i != null) return unescape(iiiI1i[2]);
  return "";
}