/*
领京豆签到
cron:15 0,16 * * *
============Quantumultx===============
[task_local]
#领京豆签到
15 0,16 * * * jd_beanSign.js, tag=领京豆签到, enabled=true
 */

const Env=require('./utils/Env.js');
const $ = new Env('领京豆签到');
const liIillll = $.isNode() ? require("./sendNotify") : "",
  iI1lIIi = $.isNode() ? require("./jdCookie.js") : "";
let i1llII = Ii11IlIi(40, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  I1liIll1 = [],
  IiiiIIIl = "";
if ($.isNode()) {
  Object.keys(iI1lIIi).forEach(i1ii11i1 => {
    I1liIll1.push(iI1lIIi[i1ii11i1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1liIll1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIlllIIi($.getdata("CookiesJD") || "[]").map(llI1I1I => llI1I1I.cookie)].filter(lii1 => !!lii1);
let i1i1liii = "";
const Ilil1lIl = "https://api.m.jd.com/client.action";
!(async () => {
  if (!I1liIll1[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("❖ 活动入口：APP首页-领京豆-签到\n");
  console.log("❖ kr提醒您...\n❖ 请使用本地IP环境...\n❖ 否则不会完成签到...\n");
  for (let lllli1II = 0; lllli1II < I1liIll1.length; lllli1II++) {
    if (I1liIll1[lllli1II]) {
      IiiiIIIl = I1liIll1[lllli1II];
      $.UserName = decodeURIComponent(IiiiIIIl.match(/pt_pin=([^; ]+)(?=;?)/) && IiiiIIIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lllli1II + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await liIillll.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = await I11i1I1();
      await I1lill1i();
      await $.wait(1500);
    }
  }
  if (i1i1liii) {
    if ($.isNode()) await liIillll.sendNotify("" + $.name, "" + i1i1liii);
    $.msg($.name, "", i1i1liii);
  }
})().catch(li1i1I1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + li1i1I1 + "!", "");
}).finally(() => {
  $.done();
});
async function I1lill1i() {
  await iIi1li11();
  await $.wait(500);
}
function lIl1I11i(I1iiiIl, IlIIi11l = {}) {
  let liIllI1I = [],
    li11llli = IlIIi11l.connector || "&",
    i11II1i = Object.keys(I1iiiIl);
  if (IlIIi11l.sort) i11II1i = i11II1i.sort();
  for (let iiIilli1 of i11II1i) {
    let l1l1liIl = I1iiiIl[iiIilli1];
    if (l1l1liIl && typeof l1l1liIl === "object") l1l1liIl = JSON.stringify(l1l1liIl);
    if (l1l1liIl && IlIIi11l.encode) l1l1liIl = encodeURIComponent(l1l1liIl);
    liIllI1I.push(iiIilli1 + "=" + l1l1liIl);
  }
  return liIllI1I.join(li11llli);
}
async function iIi1li11() {
  const lilil1Il = {
    "fp": "-1",
    "shshshfp": "-1",
    "shshshfpa": "-1",
    "referUrl": "-1",
    "userAgent": "-1",
    "jda": "-1",
    "rnVersion": "3.9"
  };
  let i11ii1l1 = {
    "url": Ilil1lIl + "?functionId=signBeanAct&" + JSON.stringify(lilil1Il) + "&appid=ld&client=apple&clientVersion=12.0.1&uuid=" + i1llII + "&openudid=" + i1llII + "&loginType=2&jsonp=jsonp_1693243123839_76958",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Cookie": IiiiIIIl + "__jd_ref_cls=JingDou_SceneHome_SignIn;",
      "User-Agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://h5.m.jd.com/rn/42yjy8na6pFsq1cx9MJQ5aTgu3kX/index.html?tttparams=OTxiiOeyJnTGF0IjoiMzAuOTM3OTc2IiwidW5fYXJlYSI6IjRfMTMzXzU4NTMwXzAiLCJkTGF0IjoiIiwicHJzdGF0ZSI6IjAiLCJhZGRyZXNzSWQiOiIxMzg3NjMyODgiLCJsYXQiOiIyOS41MDI3NTgiLCJwb3NMYXQiOiIzMC45Mzc5NzYiLCJwb3NMbmciOiIxMDguNjg2NTM2IiwiZ3BzX2FyZWEiOiI0XzUwOTUyXzYwNDI2XzAiLCJsbmciOiIxMDYuNDc2NTk5IiwidWVtcHMiOiIwLTAtMiIsImdMbmciOiIxMDguNjg2NTM2IiwibW9kZWwiOiJpUGhvbmU5LDIiLCJkTG5nIjoiIn60%3D&has_native=0&jumpFrom=1&source=AppHome&sid=94c8fde9792f48dbdb86b75f99f42eaw&un_area=4_133_58530_0"
    },
    "timeout": 10 * 1000
  };
  return new Promise(IIl1Iill => {
    $.get(i11ii1l1, (lIi111, IiiiiIiI, IIIiiil1) => {
      try {
        if (lIi111) {
          $.log(lIi111);
        } else {
          IIIiiil1 = IIIiiil1 && IIIiiil1.match(/jsonp_.*?\((.*?)\);/) && IIIiiil1.match(/jsonp_.*?\((.*?)\);/)[1] || IIIiiil1;
          IIIiiil1 = JSON.parse(IIIiiil1);
          if (IIIiiil1.code == 0 && !IIIiiil1?.["errorCode"]) {
            if (IIIiiil1?.["data"]?.["newUserAward"]) {
              console.log("" + (IIIiiil1?.["data"]?.["newUserAward"]?.["title"] || "") + (IIIiiil1?.["data"]?.["newUserAward"]?.["subTitle"] || "") + IIIiiil1?.["data"]?.["newUserAward"]?.["awardList"][1]?.["beanCount"] + "京豆");
            } else {
              let l1Iiiili = IIIiiil1?.["data"]?.["dailyAward"] || IIIiiil1?.["data"]?.["continuityAward"] || IIIiiil1?.["data"]?.["newUserAward"];
              console.log("" + (l1Iiiili?.["title"] || "") + (l1Iiiili?.["subTitle"] || "") + l1Iiiili?.["beanAward"]?.["beanCount"] + "京豆");
            }
          } else IIIiiil1.code == 3 ? console.log("签到失败," + IIIiiil1?.["errorMessage"]) : console.log("签到失败," + IIIiiil1?.["errorCode"] + ":" + IIIiiil1?.["errorMessage"]);
        }
      } catch (ll1ii1lI) {
        $.log(ll1ii1lI);
      } finally {
        IIl1Iill();
      }
    });
  });
}
async function I11i1I1() {
  for (var ilIliil = "", Ii1Il1iI = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iIIlIII = 0; iIIlIII < 16; iIIlIII++) {
    var ll1I1ii1 = Math.round(Math.random() * (Ii1Il1iI.length - 1));
    ilIliil += Ii1Il1iI.substring(ll1I1ii1, ll1I1ii1 + 1);
  }
  return i1llII = Buffer.from(ilIliil, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJCkDq==",
      "ud": i1llII,
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function Ii11IlIi(ii1IIIi, iiiiIill = "qwertyuiopasdfghjklzxcvbnm") {
  let Ilii1ilI = "";
  for (let Ii11lI1 = 0; Ii11lI1 < ii1IIIi; Ii11lI1++) {
    Ilii1ilI += iiiiIill[Math.floor(Math.random() * iiiiIill.length)];
  }
  return Ilii1ilI;
}
function iIlllIIi(lI1I1l1) {
  if (typeof lI1I1l1 == "string") try {
    return JSON.parse(lI1I1l1);
  } catch (iIIIIl11) {
    return console.log(iIIIIl11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}