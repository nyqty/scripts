/*
签到提现

cron "25 2 * * *" script-path=jd_qdtx.js, tag=签到提现

 */
const Env=require('./utils/Env.js');
const $ = new Env('签到提现');
const il1lII1I = $.isNode() ? require("./sendNotify") : "",
  lllliiI1 = $.isNode() ? require("./jdCookie.js") : "",
  IliiIl1I = require("./utils/h5st");
let ii11l = "FIz2zkvbepstVFm3uqLOUA",
  iillI1l1 = Date.now(),
  ilII11i = [],
  iIl11iIl = "",
  lIll1Iil;
if ($.isNode()) {
  Object.keys(lllliiI1).forEach(IIil1iIl => {
    ilII11i.push(lllliiI1[IIil1iIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else ilII11i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Ili111l1($.getdata("CookiesJD") || "[]").map(lIIilllI => lIIilllI.cookie)].filter(illili1 => !!illili1);
!(async () => {
  if (!ilII11i[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let li1liiii = 0; li1liiii < ilII11i.length; li1liiii++) {
    if (ilII11i[li1liiii]) {
      iIl11iIl = ilII11i[li1liiii];
      $.UserName = decodeURIComponent(iIl11iIl.match(/pt_pin=([^; ]+)(?=;?)/) && iIl11iIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = li1liiii + 1;
      $.isLogin = true;
      $.nickName = "";
      lIll1Iil = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await il1lII1I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + l1Iliill("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await Ii1l11II();
      await i1liiIII();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(l1lIl1Il => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + l1lIl1Il + "!", "");
}).finally(() => {
  $.done();
});
async function i1liiIII() {
  $.txhot = false;
  $.nowcontinue = false;
  await lI1l1lll();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  $.nowcontinue && (await I1iIiIi(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await lIlililI());
}
function iIliilIi(lii1liii) {
  try {
    if (typeof JSON.parse(lii1liii) == "object") return true;
  } catch (l1i1liii) {
    return console.log(l1i1liii), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function Ili111l1(i1iiii) {
  if (typeof i1iiii == "string") try {
    return JSON.parse(i1iiii);
  } catch (iilIiIII) {
    return console.log(iilIiIII), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function lI1l1lll() {
  return new Promise(async I1Ii1i11 => {
    const I1ii1i = {
      "functionId": "bSignInHome",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iillI1l1,
      "body": {
        "activityId": ii11l,
        "linkId": ii11l
      }
    };
    $.h5st = await l1lli1l("76674", I1ii1i);
    let l1l1iiI = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": iIl11iIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(l1l1iiI, async (iiilIIi, Il1IiIiI, lil1il1i) => {
      try {
        if (iiilIIi) console.log("" + JSON.stringify(iiilIIi));else {
          lil1il1i = JSON.parse(lil1il1i);
          if (lil1il1i.code == 0) {
            $.nowcontinue = true;
            let iIi1II1l = lil1il1i?.["data"]?.["signInCoin"],
              il1iiII = lil1il1i?.["data"]?.["bubbleText"],
              i11IiIii = lil1il1i?.["data"]?.["signInFlag"];
            console.log("当前现金：" + iIi1II1l + ",当前可提现：" + (il1iiII || 0));
            i11IiIii ? console.log("今天已签到") : await lII111lI();
          } else lil1il1i.code == 402 ? console.log("进入首页失败," + (lil1il1i?.["errMsg"] || "")) : console.log("进入首页失败," + (lil1il1i?.["errMsg"] || ""));
        }
      } catch (IIl1I1ll) {
        $.logErr(IIl1I1ll, Il1IiIiI);
      } finally {
        I1Ii1i11();
      }
    });
  });
}
async function lII111lI() {
  return new Promise(async illlliIi => {
    const liIiili1 = {
      "functionId": "bSignInDo",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iillI1l1,
      "body": {
        "activityId": ii11l,
        "linkId": ii11l
      }
    };
    $.h5st = await l1lli1l("76674", liIiili1);
    let lI11ill = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": iIl11iIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(lI11ill, async (lI1l1iII, i1ill1, iI1iliil) => {
      try {
        if (lI1l1iII) console.log("" + JSON.stringify(lI1l1iII));else {
          iI1iliil = JSON.parse(iI1iliil);
          if (iI1iliil.code == 0) {
            console.log("签到获得: " + (iI1iliil?.["data"]?.["signInCoin"] || 0) + "元");
          } else iI1iliil.code == 402 ? console.log("进入首页失败," + (iI1iliil?.["errMsg"] || "")) : console.log("进入首页失败," + (iI1iliil?.["errMsg"] || ""));
        }
      } catch (l1ilI1ll) {
        $.logErr(l1ilI1ll, i1ill1);
      } finally {
        illlliIi();
      }
    });
  });
}
async function lIlililI() {
  return new Promise(async llI11lIi => {
    const liiIlI11 = {
      "functionId": "BSignInMyBalance",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iillI1l1,
      "body": {
        "activityId": ii11l,
        "linkId": ii11l
      }
    };
    $.h5st = await l1lli1l("34e92", liiIlI11);
    let lII11ii1 = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": iIl11iIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(lII11ii1, async (i11111l1, iliiIl1I, Iii1Ii1) => {
      try {
        if (i11111l1) console.log("" + JSON.stringify(i11111l1));else {
          Iii1Ii1 = JSON.parse(Iii1Ii1);
          if (Iii1Ii1.code == 0) {
            let iI1iIill = Iii1Ii1?.["data"]?.["totalAmount"],
              ii1iIiI = Iii1Ii1?.["data"]?.["wxExchange"] || [];
            for (let lllIIiII = 0; lllIIiII < ii1iIiI.length; lllIIiII++) {
              $.exchangeType = ii1iIiI[lllIIiII].exchangeType;
              $.amount = ii1iIiI[lllIIiII].amount;
              $.krstatus = ii1iIiI[lllIIiII].status;
              $.gear = ii1iIiI[lllIIiII].gear;
            }
            if (iI1iIill >= 20) await ili1lIli(4, 3);else {
              if (iI1iIill < 20 && iI1iIill >= 1) await ili1lIli(4, 2);else iI1iIill < 1 && iI1iIill >= 0.3 ? await ili1lIli(4, 1) : console.log("当前现金不足以兑换，先跑任务吧。");
            }
          } else Iii1Ii1.code == 402 ? console.log("进入页面失败," + (Iii1Ii1?.["errMsg"] || "")) : console.log("进入页面失败," + (Iii1Ii1?.["errMsg"] || ""));
        }
      } catch (iIiIIl1) {
        $.logErr(iIiIIl1, iliiIl1I);
      } finally {
        llI11lIi();
      }
    });
  });
}
async function ili1lIli(llIli11l, ililii11) {
  return new Promise(async l11lI11 => {
    const IliiI1i = {
      "functionId": "bSignInExchange",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iillI1l1,
      "body": {
        "activityId": ii11l,
        "awardType": llIli11l,
        "gear": ililii11,
        "linkId": ii11l
      }
    };
    $.h5st = await l1lli1l("ff179", IliiI1i);
    let lliIiiII = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": iIl11iIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(lliIiiII, async (iliI1IiI, llil1l1I, Ii1iliIi) => {
      try {
        if (iliI1IiI) {
          console.log("" + JSON.stringify(iliI1IiI));
        } else {
          Ii1iliIi = JSON.parse(Ii1iliIi);
          if (Ii1iliIi.code == 0) console.log("兑换成功," + (Ii1iliIi?.["data"]?.["amount"] || "") + " " + (Ii1iliIi?.["data"]?.["msg"] || ""));else {
            if (Ii1iliIi.code == 402) {
              console.log("兑换失败," + (Ii1iliIi?.["errMsg"] || ""));
            } else {
              if (Ii1iliIi.code == 16501) console.log("兑换失败," + (Ii1iliIi?.["data"]?.["msg"] || ""));else {
                console.log("兑换失败," + (Ii1iliIi?.["errMsg"] || ""));
              }
            }
          }
        }
      } catch (lIIllI1i) {
        $.logErr(lIIllI1i, llil1l1I);
      } finally {
        l11lI11();
      }
    });
  });
}
async function I1iIiIi() {
  let ilIl1l1 = {
    "url": "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22:%22FIz2zkvbepstVFm3uqLOUA%22%7D&t=" + iillI1l1 + "&appid=activities_platform&client=ios&clientVersion=12.0.10",
    "headers": {
      "origin": "https://h5platform.jd.com",
      "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
      "User-Agent": $.UA,
      "Cookie": iIl11iIl,
      "content-type": "application/x-www-form-urlencoded",
      "accept": "application/json, text/plain, */*"
    },
    "timeout": 20 * 1000
  };
  return new Promise(II1ll1lI => {
    $.get(ilIl1l1, async (i1ll11Il, i1iiIiI1, Ii1l11Ii) => {
      try {
        if (i1ll11Il) $.log(i1ll11Il);else {
          Ii1l11Ii = JSON.parse(Ii1l11Ii);
          if (Ii1l11Ii?.["code"] == 0) {
            let I1il1l1 = Ii1l11Ii?.["data"] || [];
            for (let il1ll1ii = 0; il1ll1ii < I1il1l1.length; il1ll1ii++) {
              $.taskTitle = I1il1l1[il1ll1ii].taskTitle;
              $.apTaskListid = I1il1l1[il1ll1ii].id;
              $.taskType = I1il1l1[il1ll1ii].taskType;
              $.taskSourceUrl = I1il1l1[il1ll1ii].taskSourceUrl;
              $.taskDoTimes = I1il1l1[il1ll1ii].taskDoTimes;
              $.taskFinished = I1il1l1[il1ll1ii].taskFinished;
              $.taskShowTitle = I1il1l1[il1ll1ii].taskShowTitle;
              if (!$.taskFinished && $.taskType.includes("BROWSE_")) for (let lIIll11 = 0; lIIll11 < 1; lIIll11++) {
                console.log("去做 " + $.taskTitle);
                await IiI1iIIi($.taskType, $.apTaskListid, $.taskSourceUrl);
                await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                await IllIlil($.taskType, $.apTaskListid);
                await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
              }
            }
          } else console.log("查询任务失败," + (Ii1l11Ii?.["errMsg"] || Ii1l11Ii?.["msg"] || ""));
        }
      } catch (liI11l1l) {
        $.log(liI11l1l);
      } finally {
        II1ll1lI();
      }
    });
  });
}
async function IiI1iIIi(l1Il11l, il1IlIll, IiIil1ii) {
  return new Promise(async lII1II1i => {
    const IIIIii11 = {
      "functionId": "apDoTask",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iillI1l1,
      "body": {
        "taskType": l1Il11l,
        "taskId": il1IlIll,
        "channel": 4,
        "checkVersion": true,
        "linkId": ii11l,
        "itemId": IiIil1ii
      }
    };
    $.h5st = await l1lli1l("76674", IIIIii11);
    let Ill11II = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": iIl11iIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(Ill11II, async (iIlill1I, iii111, Iilili1l) => {
      try {
        if (iIlill1I) console.log("" + JSON.stringify(iIlill1I));else {
          Iilili1l = JSON.parse(Iilili1l);
          if (Iilili1l.code == 0) console.log("完成任务");else Iilili1l.code == 402 ? console.log("完成任务失败," + (Iilili1l?.["errMsg"] || "")) : console.log("完成任务失败," + (Iilili1l?.["errMsg"] || ""));
        }
      } catch (llI1IIlI) {
        $.logErr(llI1IIlI, iii111);
      } finally {
        lII1II1i();
      }
    });
  });
}
async function IllIlil(liiI1i1, il1ii1il) {
  return new Promise(async liiI1111 => {
    const Il1I1Ii = {
      "functionId": "apTaskDrawAward",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iillI1l1,
      "body": {
        "taskType": liiI1i1,
        "taskId": il1ii1il,
        "channel": 4,
        "checkVersion": true,
        "linkId": ii11l
      }
    };
    $.h5st = await l1lli1l("76674", Il1I1Ii);
    let ll1IIill = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": iIl11iIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(ll1IIill, async (ilIIiI, i1lll1iI, II1l1I) => {
      try {
        if (ilIIiI) console.log("" + JSON.stringify(ilIIiI));else {
          II1l1I = JSON.parse(II1l1I);
          if (II1l1I.code == 0) {
            console.log("领取奖励成功");
          } else II1l1I.code == 402 ? console.log("领取任务奖励失败," + (II1l1I?.["errMsg"] || "")) : console.log("领取任务奖励失败," + (II1l1I?.["errMsg"] || ""));
        }
      } catch (ll11Illl) {
        $.logErr(ll11Illl, i1lll1iI);
      } finally {
        liiI1111();
      }
    });
  });
}
function IIIl1I(iIIl1iiI) {
  iIIl1iiI = iIIl1iiI || 32;
  let I1Ii1ll = "abcdef0123456789",
    iii1lII = I1Ii1ll.length,
    lilIlIi1 = "";
  for (i = 0; i < iIIl1iiI; i++) lilIlIi1 += I1Ii1ll.charAt(Math.floor(Math.random() * iii1lII));
  return lilIlIi1;
}
async function l1lli1l(liII1il, ili11Ill) {
  try {
    let ilIilIi1 = new IliiIl1I({
      "appId": liII1il,
      "appid": "activities_platform",
      "clientVersion": ili11Ill?.["clientVersion"],
      "client": ili11Ill?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await ilIilIi1.genAlgo(), body = await ilIilIi1.genUrlParams(ili11Ill.functionId, ili11Ill.body), body;
  } catch (Iillill1) {}
}
function IIli1lil(iIlIIll) {
  return iIlIIll.then(I1II1lIi => {
    return [null, I1II1lIi];
  }).catch(i1iiII11 => [i1iiII11]);
}
function IIlIIilI(iliI1li, ilI1l1l1 = {}) {
  let I1liil11 = [],
    Iil1IiII = ilI1l1l1.connector || "&",
    il1i111I = Object.keys(iliI1li);
  if (ilI1l1l1.sort) il1i111I = il1i111I.sort();
  for (let lII111Ii of il1i111I) {
    let iIIllIi1 = iliI1li[lII111Ii];
    if (iIIllIi1 && typeof iIIllIi1 === "object") iIIllIi1 = JSON.stringify(iIIllIi1);
    if (iIIllIi1 && ilI1l1l1.encode) iIIllIi1 = encodeURIComponent(iIIllIi1);
    I1liil11.push(lII111Ii + "=" + iIIllIi1);
  }
  return I1liil11.join(Iil1IiII);
}
async function Ii1l11II() {
  for (var iI1Iii1 = "", IIIlIlI1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IIiiIilI = 0; IIiiIilI < 16; IIiiIilI++) {
    var IlI1lill = Math.round(Math.random() * (IIIlIlI1.length - 1));
    iI1Iii1 += IIIlIlI1.substring(IlI1lill, IlI1lill + 1);
  }
  return uuid = Buffer.from(iI1Iii1, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
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
function l1Iliill(Ii1ill1I = "xxxxxxxxxxxxxxxxxxxx") {
  return Ii1ill1I.replace(/[xy]/g, function (II1IIIlI) {
    var l11i1il1 = Math.random() * 10 | 0,
      iIl11il = II1IIIlI == "x" ? l11i1il1 : l11i1il1 & 3 | 8;
    return jdaid = iIl11il.toString(), jdaid;
  });
}
function i111Ili1(iIl11lIl) {
  return new Promise(lI1I111I => {
    const lIiii1II = {
      "url": "" + iIl11lIl,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIiii1II, async (IIIlli1l, illiIIiI, l1i1lI1l) => {
      try {
        if (IIIlli1l) {} else {
          if (l1i1lI1l) {
            l1i1lI1l = JSON.parse(l1i1lI1l);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (i11il) {
        $.logErr(i11il, illiIIiI);
        l1i1lI1l = null;
      } finally {
        lI1I111I(l1i1lI1l);
      }
    });
  });
}
function iI1ll1(ii1li1i1, IilI1iiI) {
  return Math.floor(Math.random() * (IilI1iiI - ii1li1i1)) + ii1li1i1;
}