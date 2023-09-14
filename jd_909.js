/*
909

每天抽奖一次

cron:35 23 9 9 *
============Quantumultx===============
[task_local]
#909
35 13 9-20 9 * jd_909.js, tag=909, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env('909');
const III1iII = $.isNode() ? require("./sendNotify") : "",
  lII1iII = $.isNode() ? require("./jdCookie.js") : "",
  iliiIiii = require("./function/krgetToken"),
  iIii1Il = require("./function/krgetua");
let IIl1I1I = "https://xinrui-isv.isvjcloud.com",
  ii1il11l = "https://xinrui-isv.isvjcloud.com/school/?share_type=invite&inviter_token=40106&source=&vip=0&sid=&un_area=4_133_58530_0",
  Il1l1iii = [],
  Iii1i1lI = "";
if ($.isNode()) {
  if (process.env.jd_szxyun_teamId) $.teamId = process.env.jd_szxyun_teamId;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(lII1iII).forEach(ilIIiii => {
    Il1l1iii.push(lII1iII[ilIIiii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Il1l1iii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(IlillilI => IlillilI.cookie)].filter(IiIl1iI => !!IiIl1iI);
let i1Iii1I = "6myeMAtP",
  ili1IIIl = typeof $request !== "undefined";
ili1IIIl && (GetCookie(), $.done());
!(async () => {
  if (!Il1l1iii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let IiiIiI1i = 0; IiiIiI1i < Il1l1iii.length; IiiIiI1i++) {
    if (Il1l1iii[IiiIiI1i]) {
      Iii1i1lI = Il1l1iii[IiiIiI1i];
      $.ownCookie = Il1l1iii[IiiIiI1i];
      $.UserName = decodeURIComponent(Iii1i1lI.match(/pt_pin=(.+?);/) && Iii1i1lI.match(/pt_pin=(.+?);/)[1]);
      $.index = IiiIiI1i + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await III1iII.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = await iIii1Il($.UserName);
      await lIliIiIl();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(lil1Ilil => {
  $.log("", " " + $.name + ", 失败! 原因: " + lil1Ilil + "!", "");
}).finally(() => {
  $.done();
});
async function lIliIiIl() {
  $.token = "";
  krhot = false;
  kruser = false;
  $.token = await iliiIiii(Iii1i1lI, IIl1I1I);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await ii11ilIl();
  if (!krhot) {
    await IiI1ilIi();
    if (!kruser) {
      await IiI1ilIi();
      console.log("抽奖次数为" + $.coins + "次");
      for (m = 1; $.coins--; m++) {
        await iIl1lIi1();
        if (Number($.coins) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    }
  }
}
function ii11ilIl() {
  return new Promise(IIiIliIi => {
    const ill1Il1i = {
      "url": IIl1I1I + "/auth/jos?token=" + $.token + "&jd_source=01&source=test&is_share=1",
      "headers": {
        "Host": "xinrui-isv.isvjcloud.com",
        "Accept": "application/json, text/plain, */*",
        "App-Key": i1Iii1I,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "X-Requested-With": "com.jingdong.app.mall",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Origin": IIl1I1I,
        "User-Agent": $.UA,
        "Referer": ii1il11l,
        "Cookie": Iii1i1lI,
        "Connection": "keep-alive"
      },
      "timeout": 10 * 1000
    };
    $.post(ill1Il1i, async (I1111ll, IIIllli1, i1Ilili1) => {
      try {
        i1Ilili1 = JSON.parse(i1Ilili1);
        if (i1Ilili1) {
          if (i1Ilili1.status == 0) {
            $.Authorization = i1Ilili1?.["body"]?.["access_token"];
          } else console.log(i1Ilili1.message), krhot = true;
        }
      } catch (l1iil11l) {
        $.logErr(l1iil11l, IIIllli1);
      } finally {
        IIiIliIi();
      }
    });
  });
}
async function IiI1ilIi() {
  let iI1l1i1 = {
    "url": IIl1I1I + "/jd-school-room-api/api/info?is_share=0&channel=2",
    "headers": {
      "Host": "xinrui-isv.isvjcloud.com",
      "Accept": "application/json, text/plain, */*",
      "App-Key": i1Iii1I,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + $.Authorization,
      "Origin": "https://pro.m.jd.com",
      "X-Requested-With": "com.jingdong.app.mall",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "User-Agent": $.UA,
      "Referer": ii1il11l,
      "Cookie": Iii1i1lI,
      "Connection": "keep-alive"
    },
    "timeout": 10 * 1000
  };
  return new Promise(Il1llIli => {
    $.get(iI1l1i1, async (IilliilI, iI1iiI1, IIi1Ili1) => {
      try {
        IIi1Ili1 = JSON.parse(IIi1Ili1);
        if (IIi1Ili1) {
          if (IIi1Ili1.status == 0) {
            $.coins = IIi1Ili1?.["body"]?.["user"]?.["coins"] || 0;
          } else console.log(IIi1Ili1.message), kruser = true;
        }
      } catch (I1IiII1) {
        $.log(I1IiII1);
      } finally {
        Il1llIli();
      }
    });
  });
}
async function iIl1lIi1() {
  let lI1iI1iI = {
    "url": IIl1I1I + "/jd-school-room-api/api/prize/lottery?is_share=0&channel=2",
    "body": "",
    "headers": {
      "Host": "xinrui-isv.isvjcloud.com",
      "Accept": "application/json, text/plain, */*",
      "App-Key": i1Iii1I,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + $.Authorization,
      "Origin": "https://pro.m.jd.com",
      "X-Requested-With": "com.jingdong.app.mall",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "User-Agent": $.UA,
      "Referer": ii1il11l,
      "Cookie": Iii1i1lI,
      "Connection": "keep-alive"
    },
    "timeout": 10 * 1000
  };
  return new Promise(lIIl1ilI => {
    $.post(lI1iI1iI, async (illiilII, l1IIllii, liI1i11) => {
      try {
        liI1i11 = JSON.parse(liI1i11);
        if (liI1i11) {
          if (liI1i11?.["status"] == 0) {
            if (liI1i11?.["body"]?.["user_prize"]?.["prize_type"] == 1) console.log("抽中：[" + liI1i11?.["body"]?.["user_prize"]?.["prize_info"]["quota"] + " " + liI1i11?.["body"]?.["user_prize"]?.["prize_name"] + "]");else {
              let iliIIl11 = liI1i11?.["body"]?.["user_prize"] === null ? "空气" : JSON.stringify(liI1i11);
              console.log("抽中: " + iliIIl11);
            }
          } else console.log(liI1i11.message);
        }
      } catch (i1l1111i) {
        $.log(i1l1111i);
      } finally {
        lIIl1ilI();
      }
    });
  });
}
function l11IIlIi(l11I1l11) {
  l11I1l11 = l11I1l11 || 32;
  let Iii11 = "abcdef0123456789",
    li1il1i = Iii11.length,
    lII1l1lI = "";
  for (i = 0; i < l11I1l11; i++) lII1l1lI += Iii11.charAt(Math.floor(Math.random() * li1il1i));
  return lII1l1lI;
}
function IiI11111(Ii1lil) {
  if (!Ii1lil) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(Ii1lil) == "object") return true;
  } catch (IiIIIlil) {
    return console.log(IiIIIlil), false;
  }
}
function liIiiIlI(ll1I1li1) {
  if (typeof ll1I1li1 == "string") {
    try {
      return JSON.parse(ll1I1li1);
    } catch (iliIiIlI) {
      return console.log(iliIiIlI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function Il1ill(Il1l11lI, ilIlIl) {
  return Math.floor(Math.random() * (ilIlIl - Il1l11lI)) + Il1l11lI;
}