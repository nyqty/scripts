/*
发财挖宝助力
更新时间：2023-8-28
活动入口：京东APP-发财挖宝

变量：
//export krWait="秒" //自行填写变量，延时多长时间。(不填写默认延时1秒)

//export fcwbhelpnum="人数" //自行填写变量，需要邀请多少人停止。(不填写默认邀请60停止)

//export jd_fcwb_id="活动ID" // 不填默认跑地址2邀请

挖宝目前有2个地址
地址1：https://bnzf.jd.com/?activityId=xpEf-M3RyE8Cd8nP8Zd0eA
地址2：https://bnzf.jd.com/?activityId=cNAsHasSnzWTAtWhIQR4dA

cron:7 7 7 7 *
============Quantumultx===============
[task_local]
#发财挖宝助力
cron:7 7 7 7 * jd_fcwb_mfhelp.js, tag=KR发财挖宝助力-加密, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('发财挖宝助力');
const lliIiii1 = $.isNode() ? require("./sendNotify") : "",
  IilIIIl1 = require("./function/h5st41.js"),
  ilIlii1l = $.isNode() ? require("./jdCookie.js") : "",
  li1i11iI = "https://api.m.jd.com";
let l1lI1ii = [],
  l11lI11I = "",
  ii1i1lI1,
  Iill1I = [];
$.hasEnd = false;
let ii111lIi = "cNAsHasSnzWTAtWhIQR4dA";
process.env.jd_fcwb_id && process.env.jd_fcwb_id != "cNAsHasSnzWTAtWhIQR4dA" && (ii111lIi = process.env.jd_fcwb_id);
let l1ii11I = "2";
l1ii11I = $.isNode() ? process.env.krWait ? process.env.krWait : "" + l1ii11I : $.getdata("krWait") ? $.getdata("krWait") : "" + l1ii11I;
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let l11i1I1l = Date.now();
if ($.isNode()) {
  Object.keys(ilIlii1l).forEach(i11I1 => {
    l1lI1ii.push(ilIlii1l[i11I1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1lI1ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1i11i1l($.getdata("CookiesJD") || "[]").map(lI11lll1 => lI11lll1.cookie)].filter(IiliiiII => !!IiliiiII);
let lIlii11i = "60",
  ill11III = "";
lIlii11i = $.isNode() ? process.env.fcwbhelpnum ? process.env.fcwbhelpnum : "" + lIlii11i : $.getdata("fcwbhelpnum") ? $.getdata("fcwbhelpnum") : "" + lIlii11i;
ill11III = $.isNode() ? process.env.nolanh5st_token ? process.env.nolanh5st_token : "" + ill11III : $.getdata("nolanh5st_token") ? $.getdata("nolanh5st_token") : "" + ill11III;
!(async () => {
  if (!l1lI1ii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("默认全部助力账号一，邀请满" + lIlii11i + "自动停止");
  console.log("当前设置活动ID为：" + ii111lIi);
  for (let l1ii1IlI = 0; l1ii1IlI < l1lI1ii.length; l1ii1IlI++) {
    if (l1lI1ii[l1ii1IlI]) {
      l11lI11I = l1lI1ii[l1ii1IlI];
      $.UserName = decodeURIComponent(l11lI11I.match(/pt_pin=([^; ]+)(?=;?)/) && l11lI11I.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1ii1IlI + 1;
      $.isLogin = true;
      $.nickName = "";
      ii1i1lI1 = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lliIiii1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = await IiIlIll();
      $.jda = "__jda=" + iIl1il1l("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      await Il1illlI();
      if (l1ii11I) {
        if ($.index != l1lI1ii.length) {
          console.log("【请求限制，暂时休整等待" + l1ii11I + "秒~~~~~~~】");
          await $.wait(parseInt(l1ii11I, 10) * 1000);
        }
      }
      if ($.hasEnd) break;
    }
  }
})().catch(iliIlllI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iliIlllI + "!", "");
}).finally(() => {
  $.done();
});
async function Il1illlI() {
  $.personNum = 0;
  try {
    await ilI11II();
    if ($.index != 1) {}
    await iill1li();
    if ($.index == 1) $.helpCount = $.personNum;else $.helpok == true && $.helpCount++;
    console.log("【账号" + $.index + "】已邀请人数：" + $.personNum + ($.index != 1 && " 【账号1】已邀请人数：" + $.helpCount || ""));
    if ($.helpCount >= lIlii11i) $.hasEnd = true;
  } catch (l11I1lI) {
    console.log(l11I1lI);
  }
}
function ilI11II() {
  return new Promise(lIli1III => {
    let lii1ii11 = {
      "linkId": ii111lIi
    };
    $.get(liiil1lI("happyDigHome", lii1ii11), async (lIlIli11, II1lll11, l1IlilII) => {
      try {
        if (lIlIli11) {
          console.log("" + JSON.stringify(lIlIli11));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (iIlIlilI(l1IlilII)) {
            l1IlilII = JSON.parse(l1IlilII);
            if ($.index === 1) l1IlilII.success == true && (curRound = l1IlilII.data.curRound, inviteCode = l1IlilII.data.inviteCode, inviter = l1IlilII.data.markedPin, blood = l1IlilII.data.blood, console.log("【当前助力】:" + l1IlilII.data.inviteCode), l1IlilII.data && l1IlilII.data.inviteCode && Iill1I.length === 0 && Iill1I.push({
              "user": $.UserName,
              "fcwbinviteCode": l1IlilII.data.inviteCode,
              "fcwbinviter": l1IlilII.data.markedPin
            }));else l1IlilII.success == false && console.log("抱歉，貌似账号已黑，跳过！");
          }
        }
      } catch (lII111Ii) {
        $.logErr(lII111Ii, II1lll11);
      } finally {
        lIli1III(l1IlilII);
      }
    });
  });
}
function iill1li() {
  return new Promise(async iiiIll => {
    const I1l1llli = {
        "functionId": "happyDigHelpList",
        "appid": "activities_platform",
        "clientVersion": "12.0.1",
        "client": "ios",
        "t": l11i1I1l,
        "body": {
          "pageNum": 1,
          "pageSize": 50,
          "linkId": ii111lIi
        }
      },
      Ii1111I = await llIl1lII("8dd95", I1l1llli);
    let liili11i = {
      "url": "https://api.m.jd.com/api?" + Ii1111I,
      "headers": {
        "Cookie": l11lI11I + $.jda,
        "Origin": "https://bnzf.jd.com",
        "User-Agent": $.UA,
        "referer": "https://bnzf.jd.com/?activityId=cNAsHasSnzWTAtWhIQR4dA&inviterId=&inviterCode=&utm_user=plusmember&ad_od=share&utm_source=androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&lng=106.477132&lat=29.502772&sid=84c83c76030880654e4e98b6bcda688w&un_area=4_50952_106_0"
      }
    };
    $.get(liili11i, async (ii1IiIil, liIil1, iill1IlI) => {
      try {
        if (ii1IiIil) {
          console.log("" + JSON.stringify(ii1IiIil));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (iIlIlilI(iill1IlI)) {
            iill1IlI = JSON.parse(iill1IlI);
            if (iill1IlI.success == true) $.personNum = iill1IlI.data.personNum;else iill1IlI.success == false && console.log("抱歉，貌似账号已黑，跳过！");
          }
        }
      } catch (i1Ili111) {
        $.logErr(i1Ili111, liIil1);
      } finally {
        iiiIll(iill1IlI);
      }
    });
  });
}
function ilIi1ilI() {
  return new Promise(lilll1Ii => {
    let iI111l1 = "{\"linkId\":\"" + ii111lIi + "\",\"inviter\":\"" + inviter + "\",\"inviteCode\":\"" + inviteCode + "\"}",
      iil1Ii1I = Date.now(),
      lI1illil = {
        "url": "https://api.m.jd.com/api?functionId=happyDigHelpPage&body=" + iI111l1 + "&t=" + iil1Ii1I + "&appid=activities_platform&client=H5&clientVersion=1.0.0",
        "headers": {
          "Cookie": l11lI11I,
          "Origin": "https://api.m.jd.com",
          "User-Agent": $.UA
        }
      };
    $.get(lI1illil, async (ilIIiI1I, ii11lIi1, IIiIlli1) => {
      try {
        if (ilIIiI1I) console.log("" + JSON.stringify(ilIIiI1I)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (iIlIlilI(IIiIlli1)) {
            IIiIlli1 = JSON.parse(IIiIlli1);
            console.log(IIiIlli1);
          }
        }
      } catch (ilIII1l) {
        $.logErr(ilIII1l, ii11lIi1);
      } finally {
        lilll1Ii(IIiIlli1);
      }
    });
  });
}
function I1IIili1() {
  return new Promise(async li1l1ii => {
    const iii1i1 = {
        "functionId": "happyDigHelp",
        "appid": "activities_platform",
        "clientVersion": "12.0.1",
        "client": "ios",
        "t": l11i1I1l,
        "body": {
          "linkId": ii111lIi,
          "inviter": inviter,
          "inviteCode": inviteCode
        }
      },
      l1i111Ii = await llIl1lII("8dd95", iii1i1);
    let Il1iil1l = {
      "url": "https://api.m.jd.com/api?" + l1i111Ii,
      "headers": {
        "Cookie": l11lI11I + $.jda,
        "Origin": "https://bnzf.jd.com",
        "User-Agent": $.UA,
        "referer": "https://bnzf.jd.com/?activityId=cNAsHasSnzWTAtWhIQR4dA&inviterId=&inviterCode=&utm_user=plusmember&ad_od=share&utm_source=androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&lng=106.477132&lat=29.502772&sid=84c83c76030880654e4e98b6bcda688w&un_area=4_50952_106_0"
      }
    };
    $.get(Il1iil1l, async (iIl1lIll, l1l1l111, l11lIiIi) => {
      try {
        if (iIl1lIll) console.log("" + JSON.stringify(iIl1lIll)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (iIlIlilI(l11lIiIi)) {
            l11lIiIi = JSON.parse(l11lIiIi);
            $.helpok = l11lIiIi.success;
            if (l11lIiIi.success == true) console.log("【助力状态】：" + l11lIiIi.errMsg);else l11lIiIi.success == false && console.log("【助力状态】：" + l11lIiIi.errMsg);
          }
        }
      } catch (llI11iIi) {
        $.logErr(llI11iIi, l1l1l111);
      } finally {
        li1l1ii(l11lIiIi);
      }
    });
  });
}
async function llIl1lII(Ili11iil, iiIIlI1i) {
  try {
    let ilI1I = new IilIIIl1({
      "appId": Ili11iil,
      "appid": "activities_platform",
      "clientVersion": iiIIlI1i?.["clientVersion"],
      "client": iiIIlI1i?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await ilI1I.genAlgo(), body = await ilI1I.genUrlParams(iiIIlI1i.functionId, iiIIlI1i.body), body;
  } catch (ll1llI1I) {}
}
async function iIii11ll(ii1lIiiI, l1lili1) {
  let llIll1ll = {
      "searchParams": {
        ...l1lili1,
        "appId": ii1lIiiI
      },
      "pt_pin": $.UserName,
      "client": l1lili1?.["client"],
      "clientVersion": l1lili1?.["clientVersion"]
    },
    ili11iiI = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(llIll1ll),
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
  return new Promise(async i1IIl1I1 => {
    $.post(ili11iiI, (llII1IiI, l11lII1l, lIiIlIll) => {
      let ll1I1l1I = "";
      try {
        if (llII1IiI) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          lIiIlIll = JSON.parse(lIiIlIll);
          if (typeof lIiIlIll === "object" && lIiIlIll && lIiIlIll.body) {
            if (lIiIlIll.body) ll1I1l1I = lIiIlIll || "";
          } else {
            if (lIiIlIll.code == 400) {
              console.log("\n" + lIiIlIll.msg);
            } else console.log("\n可能连接不上接口，请检查网络");
          }
        }
      } catch (ililiII1) {
        $.logErr(ililiII1, l11lII1l);
      } finally {
        i1IIl1I1(i11lIl1l(ll1I1l1I));
      }
    });
  });
}
function i11lIl1l(iIlIl11, iiliIi = {}) {
  let li1ill1I = [],
    iil1Ilil = iiliIi.connector || "&",
    ii1iIl1 = Object.keys(iIlIl11);
  if (iiliIi.sort) ii1iIl1 = ii1iIl1.sort();
  for (let ii1l1il1 of ii1iIl1) {
    let IiIIIiI = iIlIl11[ii1l1il1];
    if (IiIIIiI && typeof IiIIIiI === "object") IiIIIiI = JSON.stringify(IiIIIiI);
    if (IiIIIiI && iiliIi.encode) IiIIIiI = encodeURIComponent(IiIIIiI);
    li1ill1I.push(ii1l1il1 + "=" + IiIIIiI);
  }
  return li1ill1I.join(iil1Ilil);
}
function iIl1il1l(iIllIii1 = "xxxxxxxxxxxxxxxxxxxx") {
  return iIllIii1.replace(/[xy]/g, function (IillIi1) {
    var i1IillIl = Math.random() * 10 | 0,
      IiIiilI1 = IillIi1 == "x" ? i1IillIl : i1IillIl & 3 | 8;
    return jdaid = IiIiilI1.toString(), jdaid;
  });
}
function l1Iiii1l(Ill11il) {
  Ill11il = Ill11il || 32;
  let lIli11 = "abcdef0123456789",
    i1i1iilI = lIli11.length,
    lII1lI1I = "";
  for (i = 0; i < Ill11il; i++) lII1lI1I += lIli11.charAt(Math.floor(Math.random() * i1i1iilI));
  return lII1lI1I;
}
function iIlIlilI(lIill1l) {
  try {
    if (typeof JSON.parse(lIill1l) == "object") return true;
  } catch (I1I1lll1) {
    return console.log(I1I1lll1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function l1i11i1l(I1l1iIi) {
  if (typeof I1l1iIi == "string") try {
    return JSON.parse(I1l1iIi);
  } catch (ii1iIIii) {
    return console.log(ii1iIIii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function IiIlIll() {
  for (var l111l111 = "", ll1li1Ii = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", lilllIII = 0; lilllIII < 16; lilllIII++) {
    var IIlil1Ii = Math.round(Math.random() * (ll1li1Ii.length - 1));
    l111l111 += ll1li1Ii.substring(IIlil1Ii, IIlil1Ii + 1);
  }
  return uuid = Buffer.from(l111l111, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJGkEK==",
      "ud": uuid,
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function liiil1lI(ii1lIli, iIiiilii) {
  return {
    "url": li1i11iI + "/api?functionId=" + ii1lIli + "&body=" + escape(JSON.stringify(iIiiilii)) + "&t=1635561607124&appid=activities_platform&client=H5&clientVersion=1.2.0",
    "headers": {
      "Cookie": l11lI11I,
      "Origin": "https://bnzf.jd.com",
      "User-Agent": $.UA
    }
  };
}