/*
数钱领现金
活动入口：京东APP搜索领现金进入
已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#数钱领现金
30 7,18 * * * jd_cash.js, tag=数钱领现金, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

================Loon==============
[Script]
cron "30 7,18 * * *" script-path=jd_cash.js,tag=数钱领现金

===============Surge=================
数钱领现金 = type=cron,cronexp="30 7,18 * * *",wake-system=1,timeout=3600,script-path=jd_cash.js

============小火箭=========
数钱领现金 = type=cron,script-path=jd_cash.js, cronexpr="30 7,18 * * *", timeout=3600, enable=true
*/
const Env = require('./utils/Env.js');
const $ = new Env('数钱领现金');
const i1llI = $.isNode() ? require("./sendNotify") : "",
  iIIli1 = $.isNode() ? require("./jdCookie.js") : "",
  Ii1l1i = require("crypto-js"),
  l1lIl = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
  i1Iiil = require("./function/krgetSign"),
  i1Iiii = process.env.JD_SIGN_KRAPI || "";
let l1lili = [],
  IIlI1l = "",
  lI1I11;
if ($.isNode()) {
  Object.keys(iIIli1).forEach(ili1l => {
    l1lili.push(iIIli1[ili1l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1lili = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1iII($.getdata("CookiesJD") || "[]").map(i1lii => i1lii.cookie)].filter(iilIII => !!iilIII);
const IilIl = "https://api.m.jd.com/client.action";
let Ili1Il = "";
!(async () => {
  if (!l1lili[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let IIlI11 = 0; IIlI11 < l1lili.length; IIlI11++) {
    if (l1lili[IIlI11]) {
      IIlI1l = l1lili[IIlI11];
      $.UserName = decodeURIComponent(IIlI1l.match(/pt_pin=([^; ]+)(?=;?)/) && IIlI1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIlI11 + 1;
      $.isLogin = true;
      $.nickName = "";
      lI1I11 = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await i1llI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + IilII("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      I1iIl();
      await i1liI();
      await $.wait(1500);
    }
  }
  if (Ili1Il) {
    if ($.isNode() && (process.env.CASH_NOTIFY_CONTROL ? process.env.CASH_NOTIFY_CONTROL === "false" : !!1)) await i1llI.sendNotify($.name, Ili1Il);
    $.msg($.name, "", Ili1Il);
  }
})().catch(ilI11I => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + ilI11I + "!", "");
}).finally(() => {
  $.done();
});
async function i1liI() {
  $.valid = false;
  await IIlI1i();
  !$.valid && (console.log(""), await iiiI1i(), console.log(""), await iiiI1l());
}
function iilIIi(iIIllI) {
  try {
    if (typeof JSON.parse(iIIllI) == "object") {
      return true;
    }
  } catch (IiIii) {
    return console.log(IiIii), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function I1iII(iill1l) {
  if (typeof iill1l == "string") try {
    return JSON.parse(iill1l);
  } catch (iill1i) {
    return console.log(iill1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function IIlI1i() {
  const I1IliI = "{\"remind\": 0,\"inviteCode\": \"\",\"type\": 0,\"breakReward\": 0}";
  sign = await i1Iiil("cash_sign", JSON.parse(I1IliI));
  i1Iiii ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
  !$.signStr && console.log("接口获取失败，跳过");
  let l1I1II = {
    "url": IilIl + "?functionId=cash_sign&" + $.signStr,
    "headers": {
      "Cookie": IIlI1l,
      "Connection": "keep-alive",
      "Content-Type": "application/json",
      "Referer": "",
      "User-Agent": $.UA,
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "timeout": 10 * 1000
  };
  return new Promise(l1l1I => {
    $.post(l1I1II, (IIIl, IIIi, l1IIli) => {
      try {
        if (IIIl) $.log(IIIl);else {
          l1IIli = JSON.parse(l1IIli);
          if (l1IIli.code == 0 && l1IIli.data.bizCode == 0) console.log("签到成功,获得 " + l1IIli?.["data"]?.["result"]?.["signCash"] + " 现金");else {
            if (l1IIli.data.bizCode == 201) console.log("签到失败," + l1IIli?.["data"]?.["bizMsg"]);else l1IIli.data.bizCode == 300 ? (console.log("签到失败," + l1IIli?.["data"]?.["bizMsg"]), $.valid = true) : (console.log("签到失败," + l1IIli?.["data"]?.["bizCode"] + "," + l1IIli?.["data"]?.["bizMsg"]), $.valid = true);
          }
        }
      } catch (lIi1il) {
        $.log(lIi1il);
      } finally {
        l1l1I();
      }
    });
  });
}
async function iiiI1i() {
  const ilI1II = "{}";
  sign = await i1Iiil("cash_homePage", JSON.parse(ilI1II));
  if (i1Iiii) {
    $.signStr = sign?.["data"]?.["convertUrl"] || "";
  } else $.signStr = sign?.["body"] || "";
  !$.signStr && console.log("接口获取失败，跳过");
  let i11l1 = {
    "url": IilIl + "?functionId=cash_homePage&" + $.signStr,
    "headers": {
      "Cookie": IIlI1l,
      "Connection": "keep-alive",
      "Content-Type": "application/json",
      "Referer": "",
      "User-Agent": $.UA,
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "timeout": 10 * 1000
  };
  return new Promise(llII11 => {
    $.post(i11l1, (ilI1Il, illI11, ll11Ii) => {
      try {
        ilI1Il ? $.log(ilI1Il) : (ll11Ii = JSON.parse(ll11Ii), ll11Ii.code == 0 && ll11Ii.data.bizCode == 0 ? console.log("领现金余额：" + ll11Ii?.["data"]?.["result"]?.["totalMoney"] + " 现金") : console.log("查询余额失败," + ll11Ii?.["data"]?.["bizCode"] + "," + ll11Ii?.["data"]?.["bizMsg"]));
      } catch (iliII) {
        $.log(iliII);
      } finally {
        llII11();
      }
    });
  });
}
async function iiiI1l() {
  return new Promise(async IliIi1 => {
    let liiiIl = Date.now();
    const liIIiI = {
        "functionId": "cash_task_info",
        "appid": "signed_wh5",
        "clientVersion": "10.1.0",
        "client": "android",
        "t": liiiIl,
        "body": {
          "version": "1",
          "channel": "app",
          "remind": 0
        }
      },
      Iii1li = await Ii1l1I("5473d", liIIiI);
    let iIl1l = {
      "url": "https://api.m.jd.com/",
      "body": "" + Iii1li,
      "headers": {
        "Referer": "https://h5.m.jd.com/pb/014685890/41rjX1vmJntJWv7zqmjYNtr4AARQ/index.html",
        "origin": "https://h5.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": IIlI1l + $.jda,
        "x-rp-client": "h5_1.0.0",
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*",
        "x-requested-with": "com.jingdong.app.mall"
      },
      "timeout": 10 * 1000
    };
    $.post(iIl1l, async (iIl1i, i11i1, liIIi1) => {
      try {
        if (iIl1i) console.log("" + JSON.stringify(iIl1i));else {
          liIIi1 = JSON.parse(liIIi1);
          if (liIIi1.code == 0 && liIIi1.data.bizCode == 0) {
            $.krresult = liIIi1?.["data"]?.["result"] || [];
            for (let iIlii1 = 0; iIlii1 < $.krresult.length; iIlii1++) {
              $.csahType = $.krresult[iIlii1].type;
              $.csahName = $.krresult[iIlii1].name;
              $.csahTimes = $.krresult[iIlii1].times;
              $.csahDoTimes = $.krresult[iIlii1].doTimes;
              switch ($.csahType) {
                case 2:
                  for (let IIiil1 = $.csahDoTimes; IIiil1 < $.csahTimes; ++IIiil1) {
                    console.log("去做 [" + $.csahName + "] 任务 " + (IIiil1 + 1) + "/" + $.csahTimes);
                    await Ili1Ii($.csahType);
                    await $.wait(5000);
                  }
                  break;
                case 3:
                  for (let ii1i = $.csahDoTimes; ii1i < $.csahTimes; ++ii1i) {
                    console.log("去做 [" + $.csahName + "] 任务 " + (ii1i + 1) + "/" + $.csahTimes);
                    await Ili1Ii($.csahType);
                    await $.wait(5000);
                  }
                  break;
                case 4:
                  for (let ilIIl1 = $.csahDoTimes; ilIIl1 < $.csahTimes; ++ilIIl1) {
                    console.log("去做 [" + $.csahName + "] 任务 " + (ilIIl1 + 1) + "/" + $.csahTimes);
                    await Ili1Ii($.csahType);
                    await $.wait(5000);
                  }
                  break;
                case 5:
                  for (let ii1l = $.csahDoTimes; ii1l < $.csahTimes; ++ii1l) {
                    console.log("去做 [" + $.csahName + "] 任务 " + (ii1l + 1) + "/" + $.csahTimes);
                    await Ili1Ii($.csahType);
                    await $.wait(5000);
                  }
                  break;
                case 16:
                  for (let iIl1I = $.csahDoTimes; iIl1I < $.csahTimes; ++iIl1I) {
                    console.log("去做 [" + $.csahName + "] 任务 " + (iIl1I + 1) + "/" + $.csahTimes);
                    await Ili1Ii($.csahType);
                    await $.wait(5000);
                  }
                  break;
                case 17:
                  for (let liIi = $.csahDoTimes; liIi < $.csahTimes; ++liIi) {
                    console.log("去做 [" + $.csahName + "] 任务 " + (liIi + 1) + "/" + $.csahTimes);
                    await Ili1Ii($.csahType);
                    await $.wait(5000);
                  }
                  break;
                default:
                  console.log("未成功获取数据" + $.csahType);
                  return;
              }
            }
          } else console.log("查询任务失败," + liIIi1?.["data"]?.["bizCode"] + "," + liIIi1?.["data"]?.["bizMsg"]);
        }
      } catch (i11Ill) {
        $.logErr(i11Ill, i11i1);
      } finally {
        IliIi1();
      }
    });
  });
}
async function Ili1Ii(IliIii) {
  return new Promise(async llli1I => {
    let l1IlIi = Date.now();
    const l1IlIl = {
        "functionId": "cash_doTask",
        "appid": "signed_wh5",
        "clientVersion": "10.1.0",
        "client": "android",
        "t": l1IlIi,
        "body": {
          "version": "1",
          "channel": "app",
          "type": IliIii
        }
      },
      liIIli = await Ii1l1I("5473d", l1IlIl);
    let illiiI = {
      "url": "https://api.m.jd.com/",
      "body": "" + liIIli,
      "headers": {
        "Referer": "https://h5.m.jd.com/pb/014685890/41rjX1vmJntJWv7zqmjYNtr4AARQ/index.html",
        "origin": "https://h5.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": IIlI1l + $.jda,
        "x-rp-client": "h5_1.0.0",
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*",
        "x-requested-with": "com.jingdong.app.mall"
      },
      "timeout": 10 * 1000
    };
    $.post(illiiI, async (liIl, llli11, Ili11l) => {
      try {
        liIl ? console.log("" + JSON.stringify(liIl)) : (Ili11l = JSON.parse(Ili11l), Ili11l.code == 0 && Ili11l.data.bizCode == 0 ? console.log("完成 [" + Ili11l?.["data"]?.["result"]?.["name"] + "] 任务成功 " + (Ili11l?.["data"]?.["result"]?.["totalMoney"] || "")) : console.log("任务失败," + Ili11l?.["data"]?.["bizCode"] + "," + Ili11l?.["data"]?.["bizMsg"]));
      } catch (I1lili) {
        $.logErr(I1lili, llli11);
      } finally {
        llli1I();
      }
    });
  });
}
async function Ii1l1I(Ill1Ii, Ill1Il) {
  let Il1iIi = {
      "searchParams": {
        ...Ill1Il,
        "appId": Ill1Ii
      },
      "pt_pin": $.UserName,
      "client": Ill1Il?.["client"],
      "clientVersion": Ill1Il?.["clientVersion"]
    },
    Ii1Il = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(Il1iIi),
      "headers": {
        "Referer": "",
        "origin": "",
        "Content-Type": "application/json",
        "Cookie": IIlI1l,
        "accept": "application/json, text/plain, */*",
        "x-requested-with": "com.jingdong.app.mall",
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
  return new Promise(async i11IiI => {
    $.post(Ii1Il, (lIilIl, iIiiIi, ilIlii) => {
      let liliI1 = "";
      try {
        if (lIilIl) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          ilIlii = JSON.parse(ilIlii);
          if (typeof ilIlii === "object" && ilIlii && ilIlii.body) {
            if (ilIlii.body) liliI1 = ilIlii || "";
          } else ilIlii.code == 400 ? console.log("\n" + ilIlii.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (ll1lIl) {
        $.logErr(ll1lIl, iIiiIi);
      } finally {
        i11IiI(iiiI11(liliI1));
      }
    });
  });
}
function iilII1(I1IIl1, l1I1l1 = "qwertyuiopasdfghjklzxcvbnm") {
  let lIi1i = "";
  for (let iIIIii = 0; iIIIii < I1IIl1; iIIIii++) {
    lIi1i += l1I1l1[Math.floor(Math.random() * l1I1l1.length)];
  }
  return lIi1i;
}
function iiiI11(I1iiIi, li1i1 = {}) {
  let liliII = [],
    lI1iIl = li1i1.connector || "&",
    iIiiII = Object.keys(I1iiIi);
  if (li1i1.sort) iIiiII = iIiiII.sort();
  for (let li11i1 of iIiiII) {
    let II1l1 = I1iiIi[li11i1];
    if (II1l1 && typeof II1l1 === "object") II1l1 = JSON.stringify(II1l1);
    if (II1l1 && li1i1.encode) II1l1 = encodeURIComponent(II1l1);
    liliII.push(li11i1 + "=" + II1l1);
  }
  return liliII.join(lI1iIl);
}
function l1lilI(liii1i) {
  return liii1i[Math.floor(Math.random() * liii1i.length)];
}
function i1Iil1(l1I1lI = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", iIIIl1 = "0123456789abcdef") {
  let liliIl = "";
  for (let iIiiI1 of l1I1lI) {
    if (iIiiI1 == "x") liliIl += iIIIl1.charAt(Math.floor(Math.random() * iIIIl1.length));else iIiiI1 == "X" ? liliIl += iIIIl1.charAt(Math.floor(Math.random() * iIIIl1.length)).toUpperCase() : liliIl += iIiiI1;
  }
  return liliIl;
}
function liI1Ii(ilIli1) {
  ilIli1 = ilIli1.replace(/rn/g, "n");
  var l1I1ll = "";
  for (var li1il = 0; li1il < ilIli1.length; li1il++) {
    var l1I1li = ilIli1.charCodeAt(li1il);
    if (l1I1li < 128) l1I1ll += String.fromCharCode(l1I1li);else l1I1li > 127 && l1I1li < 2048 ? (l1I1ll += String.fromCharCode(l1I1li >> 6 | 192), l1I1ll += String.fromCharCode(l1I1li & 63 | 128)) : (l1I1ll += String.fromCharCode(l1I1li >> 12 | 224), l1I1ll += String.fromCharCode(l1I1li >> 6 & 63 | 128), l1I1ll += String.fromCharCode(l1I1li & 63 | 128));
  }
  return l1I1ll;
}
function l1lil1(IIlII1, ll1Iil) {
  ll1Iil = ll1Iil || l1lIl;
  var iliiiI = "",
    IIlIII,
    i1Iil,
    lIi11i,
    i1Iii,
    IIiI1I,
    lIi11l,
    i1IlI,
    lIl1Ii = 0;
  IIlII1 = liI1Ii(IIlII1);
  while (lIl1Ii < IIlII1.length) {
    IIlIII = IIlII1.charCodeAt(lIl1Ii++);
    i1Iil = IIlII1.charCodeAt(lIl1Ii++);
    lIi11i = IIlII1.charCodeAt(lIl1Ii++);
    i1Iii = IIlIII >> 2;
    IIiI1I = (IIlIII & 3) << 4 | i1Iil >> 4;
    lIi11l = (i1Iil & 15) << 2 | lIi11i >> 6;
    i1IlI = lIi11i & 63;
    if (isNaN(i1Iil)) lIi11l = i1IlI = 64;else isNaN(lIi11i) && (i1IlI = 64);
    iliiiI = iliiiI + ll1Iil.charAt(i1Iii) + ll1Iil.charAt(IIiI1I) + ll1Iil.charAt(lIi11l) + ll1Iil.charAt(i1IlI);
  }
  while (iliiiI.length % 4 > 1) iliiiI += "=";
  return iliiiI;
}
function i1lil(i1IiI = {}) {
  let iilIi1 = {
    "ciphertype": 5,
    "cipher": {
      "ud": l1lil1(Ii1l1i.SHA1($.UserName).toString()),
      "sv": l1lil1($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(iilIi1);
}
function I1iIl(I1I11i, l1iI1l = {}) {
  const l1lIIi = {
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
    iII11I = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = l1lilI(iII11I);
  let IiIii1 = I1I11i || "jd",
    l1lIIl = l1iI1l?.["ep"] ? l1iI1l?.["ep"] : true;
  if (!l1lIIi[IiIii1]) {
    console.log("获取[" + IiIii1 + "]UA失败");
    return;
  }
  $.client = l1iI1l?.["client"] ? l1iI1l?.["client"] : l1lIIi[IiIii1].client;
  $.clientVersion = l1iI1l?.["clientVersion"] ? l1iI1l?.["clientVersion"] : l1lIIi[IiIii1].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let i1lIl = "android";
  $.client == "apple" && (i1lIl = "iPhone");
  i1lil();
  let i1lIi = [l1lIIi[IiIii1].app, i1lIl, $.clientVersion, "", "rn/" + i1Iil1(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + l1lIIi[IiIii1].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", l1lIIl ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = i1lIi.join(";");
}
function IilII(lIlllI = "xxxxxxxxxxxxxxxxxxxx") {
  return lIlllI.replace(/[xy]/g, function (i1IiII) {
    var illI1l = Math.random() * 10 | 0,
      l1ll1I = i1IiII == "x" ? illI1l : illI1l & 3 | 8;
    return jdaid = l1ll1I.toString(), jdaid;
  });
}