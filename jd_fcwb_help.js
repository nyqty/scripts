/*
发财挖宝助力
更新时间：2023-8-11
活动入口：京东APP-发财挖宝

基本都是火爆 
入口:京东APP-领京豆-转赚红包-悬浮 挖财宝  欢乐淘金

建议手动进入挖一下

变量：
//export krWait="秒" //自行填写变量，延时多长时间。(不填写默认延时0.2秒)

//export fcwbhelpnum="人数" //自行填写变量，需要邀请多少人停止。(不填写默认邀请60停止)

cron:7 7 7 7 *
============Quantumultx===============
[task_local]
#发财挖宝助力
cron:7 7 7 7 * jd_fcwb_help.js, tag=发财挖宝助力, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('发财挖宝助力');
const iI1Ill = $.isNode() ? require("./sendNotify") : "",
  lilI1 = require("./function/jdCommon"),
  IIIi1 = require("./utils/h5st.js"),
  i1llli = $.isNode() ? require("./jdCookie.js") : "",
  i1llll = "https://api.m.jd.com";
let iI1Ili = [],
  llIIiI = "",
  iI1111,
  IIIl1 = [];
$.hasEnd = false;
let ii1ii = "xpEf-M3RyE8Cd8nP8Zd0eA";
let I1I1lI = "0.2";
I1I1lI = $.isNode() ? process.env.krWait ? process.env.krWait : "" + I1I1lI : $.getdata("krWait") ? $.getdata("krWait") : "" + I1I1lI;
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
if ($.isNode()) {
  Object.keys(i1llli).forEach(IIIii => {
    iI1Ili.push(i1llli[IIIii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iI1Ili = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ii1iI($.getdata("CookiesJD") || "[]").map(iI111i => iI111i.cookie)].filter(I1I1l1 => !!I1I1l1);
let l1iIlI = "60",
  iI111I = "";
l1iIlI = $.isNode() ? process.env.fcwbhelpnum ? process.env.fcwbhelpnum : "" + l1iIlI : $.getdata("fcwbhelpnum") ? $.getdata("fcwbhelpnum") : "" + l1iIlI;
iI111I = $.isNode() ? process.env.nolanh5st_token ? process.env.nolanh5st_token : "" + iI111I : $.getdata("nolanh5st_token") ? $.getdata("nolanh5st_token") : "" + iI111I;
!(async () => {
  console.log("\n【默认全部助力账号一，邀请满" + l1iIlI + "自动停止】\n【加密脚本，不放心可禁用】\n【可能限制时段，留意频道通知】\n");
  if (!iI1Ili[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let I1I1iI = 0; I1I1iI < iI1Ili.length; I1I1iI++) {
    if (iI1Ili[I1I1iI]) {
      llIIiI = iI1Ili[I1I1iI];
      $.UserName = decodeURIComponent(llIIiI.match(/pt_pin=([^; ]+)(?=;?)/) && llIIiI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I1I1iI + 1;
      $.isLogin = true;
      $.nickName = "";
      iI1111 = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await iI1Ill.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      $.UA = lilI1.genUA($.UserName);
      await IIIlI1();
      I1I1lI && $.index != iI1Ili.length && (console.log("【请求限制，暂时休整等待" + I1I1lI + "秒~~~~~~~】"), await $.wait(parseInt(I1I1lI, 10) * 1000));
      if ($.hasEnd) break;
    }
  }
})().catch(ili1Ii => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + ili1Ii + "!", "");
}).finally(() => {
  $.done();
});
async function IIIlI1() {
  $.personNum = 0;
  try {
    await i1lIiI();
    if ($.index != 1) {}
    await IiiIl();
    if ($.index == 1) $.helpCount = $.personNum;else $.helpok == true && $.helpCount++;
    console.log("【账号" + $.index + "】已邀请人数：" + $.personNum + ($.index != 1 && " 【账号1】已邀请人数：" + $.helpCount || ""));
    if ($.helpCount >= l1iIlI) $.hasEnd = true;
  } catch (Iili) {
    console.log(Iili);
  }
}
function i1lIiI() {
  return new Promise(iiIiIi => {
    let IilI = {
      "linkId": ii1ii
    };
    $.get(IIIil("happyDigHome", IilI), async (Iillll, lllI1, III11I) => {
      try {
        if (Iillll) console.log("" + JSON.stringify(Iillll)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (l1iIl1(III11I)) {
            III11I = JSON.parse(III11I);
            if ($.index === 1) III11I.success == true && (curRound = III11I.data.curRound, inviteCode = III11I.data.inviteCode, inviter = III11I.data.markedPin, blood = III11I.data.blood, console.log("【当前助力】:" + III11I.data.inviteCode), III11I.data && III11I.data.inviteCode && IIIl1.length === 0 && IIIl1.push({
              "user": $.UserName,
              "fcwbinviteCode": III11I.data.inviteCode,
              "fcwbinviter": III11I.data.markedPin
            }));else III11I.success == false && console.log("抱歉，貌似账号已黑，跳过！");
          }
        }
      } catch (l1i11) {
        $.logErr(l1i11, lllI1);
      } finally {
        iiIiIi(III11I);
      }
    });
  });
}
function IiiIl() {
  return new Promise(lil1l => {
    let Iliii = {
      "pageNum": 1,
      "pageSize": 50,
      "linkId": ii1ii
    };
    $.get(IIIil("happyDigHelpList", Iliii), async (l1l1Ii, IIIIlI, l1i11l) => {
      try {
        if (l1l1Ii) {
          console.log("" + JSON.stringify(l1l1Ii));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (l1iIl1(l1i11l)) {
            l1i11l = JSON.parse(l1i11l);
            if (l1i11l.success == true) $.personNum = l1i11l.data.personNum;else l1i11l.success == false && console.log("抱歉，貌似账号已黑，跳过！");
          }
        }
      } catch (I1lIII) {
        $.logErr(I1lIII, IIIIlI);
      } finally {
        lil1l(l1i11l);
      }
    });
  });
}
function ii1l1l() {
  return new Promise(l11iIi => {
    let IlilI = "{\"linkId\":\"xpEf-M3RyE8Cd8nP8Zd0eA\",\"inviter\":\"" + inviter + "\",\"inviteCode\":\"" + inviteCode + "\"}",
      llIi1 = Date.now(),
      IliIII = {
        "url": "https://api.m.jd.com/?functionId=happyDigHelpPage&body=" + IlilI + "&t=" + llIi1 + "&appid=activities_platform&client=H5&clientVersion=1.0.0",
        "headers": {
          "Cookie": llIIiI,
          "Origin": "https://api.m.jd.com",
          "User-Agent": $.UA
        }
      };
    $.get(IliIII, async (II1l, liiiiI, II1i) => {
      try {
        if (II1l) {
          console.log("" + JSON.stringify(II1l));
          console.log($.name + " API请求失败，请检查网路重试");
        } else l1iIl1(II1i) && (II1i = JSON.parse(II1i), console.log(II1i));
      } catch (l1ilII) {
        $.logErr(l1ilII, liiiiI);
      } finally {
        l11iIi(II1i);
      }
    });
  });
}
function l1lli1() {
  return new Promise(async i11iIl => {
    let IIiiI1 = Date.now();
    const IIIIi1 = {
        "functionId": "happyDigHelp",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "android",
        "t": IIiiI1,
        "body": {
          "linkId": ii1ii,
          "inviter": inviter,
          "inviteCode": inviteCode
        }
      },
      ii1IIl = await IiiIi("8dd95", IIIIi1);
    let ii1IIi = {
      "url": "https://api.m.jd.com/?" + ii1IIl,
      "headers": {
        "Cookie": llIIiI,
        "Origin": "https://bnzf.jd.com",
        "User-Agent": $.UA,
        "referer": "https://bnzf.jd.com/?activityId=xpEf-M3RyE8Cd8nP8Zd0eA&inviterId=&inviterCode=&utm_user=plusmember&ad_od=share&utm_source=androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&lng=106.477132&lat=29.502772&sid=84c83c76030880654e4e98b6bcda688w&un_area=4_50952_106_0"
      }
    };
    $.get(ii1IIi, async (I1ll1l, I1ll1i, i11iII) => {
      try {
        if (I1ll1l) console.log("" + JSON.stringify(I1ll1l)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (l1iIl1(i11iII)) {
            i11iII = JSON.parse(i11iII);
            $.helpok = i11iII.success;
            if (i11iII.success == true) console.log("【助力状态】：" + i11iII.errMsg);else {
              if (i11iII.success == false) {
                console.log("【助力状态】：" + i11iII.errMsg);
              }
            }
          }
        }
      } catch (i1I1l) {
        $.logErr(i1I1l, I1ll1i);
      } finally {
        i11iIl(i11iII);
      }
    });
  });
}
async function IiiIi(IIiiII, llIiI) {
  try {
    let Ilili = new IIIi1({
      "appId": IIiiII,
      "appid": "activities_platform",
      "clientVersion": llIiI?.["clientVersion"],
      "client": llIiI?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await Ilili.genAlgo(), body = await Ilili.genUrlParams(llIiI.functionId, llIiI.body), body;
  } catch (I1ll1I) {}
}
function ii1l1i(Iii1I1) {
  Iii1I1 = Iii1I1 || 32;
  let Iii1II = "abcdef0123456789",
    llIlI = Iii1II.length,
    l1iIil = "";
  for (i = 0; i < Iii1I1; i++) l1iIil += Iii1II.charAt(Math.floor(Math.random() * llIlI));
  return l1iIil;
}
function l1iIl1(IIIIii) {
  try {
    if (typeof JSON.parse(IIIIii) == "object") return true;
  } catch (liiili) {
    return console.log(liiili), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function ii1iI(I1ll11) {
  if (typeof I1ll11 == "string") {
    try {
      return JSON.parse(I1ll11);
    } catch (i1i111) {
      return console.log(i1i111), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function IIIil(ii1l1I, lI1lII) {
  return {
    "url": i1llll + "/?functionId=" + ii1l1I + "&body=" + escape(JSON.stringify(lI1lII)) + "&t=1635561607124&appid=activities_platform&client=H5&clientVersion=1.2.0",
    "headers": {
      "Cookie": llIIiI,
      "Origin": "https://bnzf.jd.com",
      "User-Agent": $.UA
    }
  };
}