/*
临期京豆续命
更新时间：2023-6-27
已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js

定时自行修改。请勿频繁跑动，容易风控。

============Quantumultx===============
[task_local]
#临期京豆续命
10 11 * * 1 jd_exchange.js, tag=临期京豆续命, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
 */
const Env=require('./utils/Env');
const $ = new Env('临期京豆续命');
const l1lil1 = $.isNode() ? require("./sendNotify") : "",
  i1lil = require("crypto-js"),
  I1iIl = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
  ili1l = require("./function/krgetSign"),
  i1lii = process.env.JD_SIGN_KRAPI || "",
  iilIII = $.isNode() ? require("./jdCookie.js") : "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let liI1Il = [],
  I1iIi = "",
  iiiI1I = true;
process.env.exjxbeans && (iiiI1I = process.env.exjxbeans || "500");
if ($.isNode()) {
  Object.keys(iilIII).forEach(l1lill => {
    liI1Il.push(iilIII[l1lill]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else liI1Il = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1Iili($.getdata("CookiesJD") || "[]").map(i1li1 => i1li1.cookie)].filter(iIIllI => !!iIIllI);
let lilI11 = "";
!(async () => {
  if (!liI1Il[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let IiIil = 0; IiIil < liI1Il.length; IiIil++) {
    if (liI1Il[IiIil]) {
      I1iIi = liI1Il[IiIil];
      $.UserName = decodeURIComponent(I1iIi.match(/pt_pin=([^; ]+)(?=;?)/) && I1iIi.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IiIil + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      expirebeans = 0;
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await l1lil1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      ili1I();
      await Ili1II();
    }
  }
  if (lilI11) {
    if ($.isNode()) await l1lil1.sendNotify("" + $.name, "" + lilI11);
    $.msg($.name, "", lilI11);
  }
})().catch(iill1l => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iill1l + "!", "");
}).finally(() => {
  $.done();
});
async function Ili1II() {
  maxexchange = 2500;
  await ili1i();
  let iill1i = $.amount || 0;
  await $.wait(1000);
  if (iiiI1I) {
    if (iill1i) {
      if (iill1i < maxexchange) {
        console.log("您有" + iill1i + "个京豆将在7天内过期,去执行兑换");
        if (iill1i <= 100) {
          await $.wait(3000);
          await l1Ii1("1", "100");
          await $.wait(1000);
        } else {
          await $.wait(3000);
          await l1Ii1("1", iill1i);
          await $.wait(1000);
        }
      } else console.log("默认每次最多兑换" + maxexchange + "豆子");
    } else console.log("您未来7天内无过期京豆");
  } else {}
  await IiIi1();
  await $.wait(3000);
  $.integral ? $.integral < maxexchange ? (console.log("您有" + $.integral + "个积分,去执行兑换"), $.integral < 100 ? console.log("你的积分不够100，不执行兑换") : (await $.wait(3000), await l1Ii1("2", $.integral))) : console.log("默认每次最多兑换" + maxexchange + "豆子") : console.log("你当前没有积分，跳过~");
}
function ili1i() {
  return new Promise(async iIlI1i => {
    const IIIliI = "{ \"pageSize\": \"20\", \"page\": \"1\" }";
    sign = await ili1l("jingBeanDetail", JSON.parse(IIIliI));
    i1lii ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
    !$.signStr && console.log("接口获取失败，跳过");
    const iII1Ii = {
      "url": "https://api.m.jd.com/client.action?functionId=jingBeanDetail",
      "body": $.signStr,
      "headers": {
        "User-Agent": $.UA,
        "Host": "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": I1iIi
      }
    };
    $.post(iII1Ii, (l1l11, illill, IIIli1) => {
      try {
        if (l1l11) {
          console.log("" + JSON.stringify(l1l11));
          console.log($.name + " jingBeanDetail API请求失败，请检查网路重试");
        } else {
          if (IIIli1) {
            IIIli1 = JSON.parse(IIIli1);
            if (IIIli1?.["others"]?.["jingBeanExpire"]) {
              let I1lI11 = IIIli1?.["others"]?.["jingBeanExpire"]["title"]["match"](/您有(\d+)个京豆将在7天内过期/);
              I1lI11 ? $.amount = I1lI11[1] : $.amount = 0;
            }
          } else console.log("jingBeanDetail 京东服务器返回空数据");
        }
      } catch (l1l1I) {
        $.logErr(l1l1I, illill);
      } finally {
        iIlI1i(IIIli1);
      }
    });
  });
}
function IiIi1(IiIl1, IIIl) {
  return body = [{
    "pin": "$cooMrdGatewayUid$"
  }], new Promise(IIIll1 => {
    $.post(i1Iill("userAccount", body), async (iil11i, Ill1II, llIili) => {
      try {
        iil11i ? (console.log("" + JSON.stringify(iil11i)), console.log("transfer API请求失败，请检查网路重试")) : (llIili = JSON.parse(llIili), llIili.code == 1 ? ($.integral = llIili.content.integral || 0, console.log("当前积分:" + $.integral)) : console.log("错误:" + llIili.errorMsg));
      } catch (IIII) {
        $.logErr(IIII, Ill1II);
      } finally {
        IIIll1();
      }
    });
  });
}
function l1Ii1(iil111, llIil1) {
  return body = [{
    "pin": "$cooMrdGatewayUid$",
    "businessNo": l1IiI(),
    "type": iil111,
    "transferNumber": llIil1,
    "title": "京豆兑换物流积分"
  }], new Promise(ii1i11 => {
    $.post(i1Iill("transfer", body), async (llII1l, iil11l, IiIi1l) => {
      try {
        if (llII1l) {
          console.log("" + JSON.stringify(llII1l));
          console.log("transfer API请求失败，请检查网路重试");
        } else {
          IiIi1l = JSON.parse(IiIi1l);
          if (IiIi1l.code == 1) iil111 == 1 ? console.log("京豆兑换" + IiIi1l.msg + ",兑换" + llIil1 + "积分") : (console.log("积分兑换" + IiIi1l.msg + ",兑换" + llIil1 + "京豆"), lilI11 += "\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n成功兑换" + llIil1 + "京豆！");else {
            console.log("兑换" + IiIi1l.errorMsg);
          }
        }
      } catch (Il1l) {
        $.logErr(Il1l, iil11l);
      } finally {
        ii1i11();
      }
    });
  });
}
function i1IilI() {
  return new Promise(async Iii1ll => {
    const l1I11i = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": I1iIi,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    };
    $.post(l1I11i, (iIlii1, IIiil1, l1IlII) => {
      try {
        if (iIlii1) {
          console.log("" + JSON.stringify(iIlii1));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (l1IlII) {
            l1IlII = JSON.parse(l1IlII);
            if (l1IlII.retcode === 13) {
              $.isLogin = false;
              return;
            }
            l1IlII.retcode === 0 ? $.nickName = l1IlII.base && l1IlII.base.nickname || $.UserName : $.nickName = $.UserName;
          } else console.log("京东服务器返回空数据");
        }
      } catch (iliiIi) {
        $.logErr(iliiIi, IIiil1);
      } finally {
        Iii1ll();
      }
    });
  });
}
function III1I1(iliiIl, IliIii = "qwertyuiopasdfghjklzxcvbnm") {
  let iIliiI = "";
  for (let ilIIlI = 0; ilIIlI < iliiIl; ilIIlI++) {
    iIliiI += IliIii[Math.floor(Math.random() * IliIii.length)];
  }
  return iIliiI;
}
function ilI111(iIl11, ii1I = {}) {
  let liII = [],
    l1IlI1 = ii1I.connector || "&",
    ii11 = Object.keys(iIl11);
  if (ii1I.sort) ii11 = ii11.sort();
  for (let lIi1l1 of ii11) {
    let i11IlI = iIl11[lIi1l1];
    if (i11IlI && typeof i11IlI === "object") i11IlI = JSON.stringify(i11IlI);
    if (i11IlI && ii1I.encode) i11IlI = encodeURIComponent(i11IlI);
    liII.push(lIi1l1 + "=" + i11IlI);
  }
  return liII.join(l1IlI1);
}
function I1IllI(Ii1I1) {
  return Ii1I1[Math.floor(Math.random() * Ii1I1.length)];
}
function IIlI11(Iii1i1 = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", IIIlll = "0123456789abcdef") {
  let IlilI1 = "";
  for (let l1IlIi of Iii1i1) {
    if (l1IlIi == "x") IlilI1 += IIIlll.charAt(Math.floor(Math.random() * IIIlll.length));else l1IlIi == "X" ? IlilI1 += IIIlll.charAt(Math.floor(Math.random() * IIIlll.length)).toUpperCase() : IlilI1 += l1IlIi;
  }
  return IlilI1;
}
function iIIll1(liIIli) {
  liIIli = liIIli.replace(/rn/g, "n");
  var liIl = "";
  for (var llli11 = 0; llli11 < liIIli.length; llli11++) {
    var Ili11l = liIIli.charCodeAt(llli11);
    if (Ili11l < 128) liIl += String.fromCharCode(Ili11l);else Ili11l > 127 && Ili11l < 2048 ? (liIl += String.fromCharCode(Ili11l >> 6 | 192), liIl += String.fromCharCode(Ili11l & 63 | 128)) : (liIl += String.fromCharCode(Ili11l >> 12 | 224), liIl += String.fromCharCode(Ili11l >> 6 & 63 | 128), liIl += String.fromCharCode(Ili11l & 63 | 128));
  }
  return liIl;
}
function llIIII(lIi1ll, l1IIiI) {
  l1IIiI = l1IIiI || I1iIl;
  var I1lilI = "",
    i11IiI,
    iIlill,
    IlilIl,
    iIlili,
    Ii1II,
    Iii1l1,
    iIlil1,
    l1IIi1 = 0;
  lIi1ll = iIIll1(lIi1ll);
  while (l1IIi1 < lIi1ll.length) {
    i11IiI = lIi1ll.charCodeAt(l1IIi1++);
    iIlill = lIi1ll.charCodeAt(l1IIi1++);
    IlilIl = lIi1ll.charCodeAt(l1IIi1++);
    iIlili = i11IiI >> 2;
    Ii1II = (i11IiI & 3) << 4 | iIlill >> 4;
    Iii1l1 = (iIlill & 15) << 2 | IlilIl >> 6;
    iIlil1 = IlilIl & 63;
    if (isNaN(iIlill)) Iii1l1 = iIlil1 = 64;else isNaN(IlilIl) && (iIlil1 = 64);
    I1lilI = I1lilI + l1IIiI.charAt(iIlili) + l1IIiI.charAt(Ii1II) + l1IIiI.charAt(Iii1l1) + l1IIiI.charAt(iIlil1);
  }
  while (I1lilI.length % 4 > 1) I1lilI += "=";
  return I1lilI;
}
function ilI11I(lI1iIi = {}) {
  let iIIIii = {
    "ciphertype": 5,
    "cipher": {
      "ud": llIIII(i1lil.SHA1($.UserName).toString()),
      "sv": llIIII($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(iIIIii);
}
function ili1I(liliII, lI1iIl = {}) {
  const ilIll1 = {
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
    I1IIil = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = I1IllI(I1IIil);
  let I1IIii = liliII || "jd",
    iIIIlI = lI1iIl?.["ep"] ? lI1iIl?.["ep"] : true;
  if (!ilIll1[I1IIii]) {
    console.log("获取[" + I1IIii + "]UA失败");
    return;
  }
  $.client = lI1iIl?.["client"] ? lI1iIl?.["client"] : ilIll1[I1IIii].client;
  $.clientVersion = lI1iIl?.["clientVersion"] ? lI1iIl?.["clientVersion"] : ilIll1[I1IIii].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let li11i1 = "android";
  $.client == "apple" && (li11i1 = "iPhone");
  ilI11I();
  let II1l1 = [ilIll1[I1IIii].app, li11i1, $.clientVersion, "", "rn/" + IIlI11(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + ilIll1[I1IIii].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", iIIIlI ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = II1l1.join(";");
}
function iilIIl(liliIi) {
  if (!liliIi) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(liliIi) == "object") {
      return true;
    }
  } catch (I1IIiI) {
    return console.log(I1IIiI), false;
  }
}
function i1Iili(ilIli1) {
  if (typeof ilIli1 == "string") {
    try {
      return JSON.parse(ilIli1);
    } catch (l1I1li) {
      return console.log(l1I1li), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function i1Iill(lI1iI1, iIIIi1 = {}) {
  return {
    "url": "https://lop-proxy.jd.com/JingIntegralApi/" + lI1iI1,
    "headers": {
      "Host": "lop-proxy.jd.com",
      "app-key": "jexpress",
      "access": "H5",
      "appparams": "{\"appid\":158,\"ticket_type\":\"m\"}",
      "x-requested-with": "XMLHttpRequest",
      "lop-dn": "jingcai.jd.com",
      "biz-type": "service - monitor",
      "source-client": "2",
      "sdkversion": "1.0.7",
      "user-agent": $.UA,
      "screen": "400 * 889",
      "content-type": "application/json; charset = utf-8",
      "clientinfo": "{ \"appName\": \"jingcai\", \"client\": \"m\" }",
      "accept": "application/json, text/plain, */*",
      "jexpress-report-time": new Date().getTime(),
      "forcebot": "0",
      "version": "1.0.0",
      "origin": "https://jingcai-h5.jd.com",
      "referer": "https://jingcai-h5.jd.com/",
      "accept-encoding": "gzip, deflate",
      "accept-language": "zh-CN,zh;q=0.9,th-CN;q=0.8,th;q=0.7,vi-CN;q=0.6,vi;q=0.5,en-US;q=0.4,en;q=0.3",
      "Cookie": I1iIi
    },
    "body": JSON.stringify(iIIIi1)
  };
}
function l1IiI() {
  function II1li() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  }
  return II1li() + II1li() + "-" + II1li() + "-" + II1li() + "-" + II1li() + "-" + II1li() + II1li() + II1li();
}