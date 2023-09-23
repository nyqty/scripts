/*
天天领红包

cron "25 7 * * *" script-path=jd_ttlhb.js, tag=天天领红包

轮询提现变量：jd_ttlhb_num //轮询提现页数  一般无需填写

 */
const Env=require('./utils/Env.js');
const $ = new Env('天天领红包');
const llIlIiI = $.isNode() ? require("./sendNotify") : "",
  ll1IilI = $.isNode() ? require("./jdCookie.js") : "",
  iIIi11ii = require("./utils/h5st");
let IIl1II1I = "l-yLvQMhLwCqYy6_nXUBgg",
  llli1l1 = process.env.jd_ttlhb_num ? process.env.jd_ttlhb_num : "1",
  iiI1iiI1 = Date.now(),
  iliili1i = [],
  il1ilIli = "",
  I111I1ii;
if ($.isNode()) {
  Object.keys(ll1IilI).forEach(i1lIi11i => {
    iliili1i.push(ll1IilI[i1lIi11i]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iliili1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1Ii1Il1($.getdata("CookiesJD") || "[]").map(I1Ili1 => I1Ili1.cookie)].filter(iIl1IiIl => !!iIl1IiIl);
!(async () => {
  if (!iliili1i[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let i1lil1iI = 0; i1lil1iI < iliili1i.length; i1lil1iI++) {
    if (iliili1i[i1lil1iI]) {
      il1ilIli = iliili1i[i1lil1iI];
      $.UserName = decodeURIComponent(il1ilIli.match(/pt_pin=([^; ]+)(?=;?)/) && il1ilIli.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1lil1iI + 1;
      $.isLogin = true;
      $.nickName = "";
      I111I1ii = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await llIlIiI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + li1iIiIi("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await IIlII1iI();
      await l1iIl1iI();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(lIliIIil => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lIliIIil + "!", "");
}).finally(() => {
  $.done();
});
async function l1iIl1iI() {
  $.txhot = false;
  $.nowcontinue = false;
  await IIilI11();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  if ($.nowcontinue) {
    await I11iiII();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    for (let Il11iIII = 0; Il11iIII < $.remainChance; Il11iIII++) {
      await Il11Iii();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    console.log("\n当前设置轮询提现页数：" + llli1l1);
    for (let Ii1iiI11 = 0; Ii1iiI11 < llli1l1; Ii1iiI11++) {
      $.pageNum = Ii1iiI11 + 1;
      console.log("\n开始轮询提现" + $.pageNum + "页");
      await illliI($.pageNum);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.txhot) break;
    }
  }
}
function ililIIII(IlIl1Il) {
  try {
    if (typeof JSON.parse(IlIl1Il) == "object") return true;
  } catch (IiIII1I1) {
    return console.log(IiIII1I1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function l1Ii1Il1(iI11llI1) {
  if (typeof iI11llI1 == "string") try {
    return JSON.parse(iI11llI1);
  } catch (l1i1il) {
    return console.log(l1i1il), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function IIilI11() {
  return new Promise(async i1II1 => {
    const liIil1ii = {
      "functionId": "lhb4b_home",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iiI1iiI1,
      "body": {
        "linkId": IIl1II1I,
        "inviter": ""
      }
    };
    $.h5st = await lil1llli("d5a39", liIil1ii);
    let Ii1ll1i1 = {
      "url": "https://api.m.jd.com/",
      "body": "" + $.h5st,
      "headers": {
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/49CfTHN1tUanwyZ6mVHo26hGiqiY/index.html",
        "User-Agent": $.UA,
        "Cookie": il1ilIli,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(Ii1ll1i1, async (I111lilI, lI11II, iIIlI1ll) => {
      try {
        if (I111lilI) console.log("" + JSON.stringify(I111lilI));else {
          iIIlI1ll = JSON.parse(iIIlI1ll);
          if (iIIlI1ll.code == 0) {
            $.nowcontinue = true;
            let lIlI11i = iIIlI1ll?.["data"]?.["ongoingOpenDuration"],
              I1IiIi = iIIlI1ll?.["data"]?.["totalAward"] || [];
            $.remainChance = iIIlI1ll?.["data"]?.["remainChance"];
            $.prizeList = "";
            for (let li1111ll = 0; li1111ll < I1IiIi.length; li1111ll++) {
              $.amount = I1IiIi[li1111ll].amount;
              $.prizeType = I1IiIi[li1111ll].prizeType;
              switch ($.prizeType) {
                case 1:
                  $.prizeType = "[优惠券]";
                  break;
                case 2:
                  $.prizeType = "[红包]";
                  break;
                case 3:
                  $.prizeType = "[实物]";
                  break;
                case 4:
                  $.prizeType = "[现金]";
                  break;
                default:
                  console.log($.prizeType);
                  return;
              }
              li1111ll != I1IiIi.length - 1 ? $.prizeList += $.prizeType + "：" + $.amount + "，" : $.prizeList += $.prizeType + "：" + $.amount;
            }
            console.log("当前汇总：" + $.prizeList);
            if (iIIlI1ll?.["data"]?.["ongoingOpenState"] == 1 || iIIlI1ll?.["data"]?.["ongoingOpenState"] == 2) {
              console.log("可以进行" + lIlI11i + "秒无限开红包");
              $.lhb4b_open = true;
              while ($.lhb4b_open) {
                await Il11Iii();
                await $.wait(parseInt(Math.random() * 1000 + 500, 10));
              }
            }
          } else iIIlI1ll.code == 402 ? console.log("进入首页失败," + (iIIlI1ll?.["errMsg"] || "")) : console.log("进入首页失败," + (iIIlI1ll?.["errMsg"] || ""));
        }
      } catch (ll1ilII1) {
        $.logErr(ll1ilII1, lI11II);
      } finally {
        i1II1();
      }
    });
  });
}
async function Il11Iii() {
  return new Promise(async Il1liil1 => {
    const lIl1i1li = {
      "functionId": "lhb4b_open",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iiI1iiI1,
      "body": {
        "linkId": IIl1II1I,
        "openMode": 0
      }
    };
    $.h5st = await lil1llli("7af4f", lIl1i1li);
    let II1IiiII = {
      "url": "https://api.m.jd.com/",
      "body": "" + $.h5st,
      "headers": {
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/49CfTHN1tUanwyZ6mVHo26hGiqiY/index.html",
        "User-Agent": $.UA,
        "Cookie": il1ilIli,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(II1IiiII, async (l1Iii1iI, I1li1Il, iIil11lI) => {
      try {
        if (l1Iii1iI) console.log("" + JSON.stringify(l1Iii1iI));else {
          iIil11lI = JSON.parse(iIil11lI);
          if (iIil11lI.code == 0) switch (iIil11lI?.["data"]?.["received"]?.["prizeType"]) {
            case 1:
              console.log("获得," + iIil11lI?.["data"]?.["received"]?.["prizeValue"] + "-" + iIil11lI?.["data"]?.["received"]?.["prizeDesc"] + "-" + iIil11lI?.["data"]?.["received"]?.["prizeEndTime"]);
              break;
            case 2:
              console.log("获得红包," + iIil11lI?.["data"]?.["received"]?.["prizeValue"] + "-" + iIil11lI?.["data"]?.["received"]?.["prizeDesc"] + "-" + iIil11lI?.["data"]?.["received"]?.["prizeEndTime"]);
              break;
            case 4:
              console.log("获得现金," + iIil11lI?.["data"]?.["received"]?.["prizeValue"] + "-" + iIil11lI?.["data"]?.["received"]?.["prizeDesc"] + "-" + iIil11lI?.["data"]?.["received"]?.["prizeEndTime"]);
              break;
            case null:
              console.log("运气不太好，什么都没有抽到...");
              break;
            default:
              console.log(iIil11lI?.["data"]?.["received"]?.["prizeType"]);
              return;
          } else iIil11lI.code == 402 ? console.log("开红包失败," + (iIil11lI?.["errMsg"] || "")) : (console.log("开红包失败," + (iIil11lI?.["errMsg"] || "")), $.lhb4b_open = false);
        }
      } catch (Ii1lIiII) {
        $.logErr(Ii1lIiII, I1li1Il);
      } finally {
        Il1liil1();
      }
    });
  });
}
async function I11iiII() {
  const il1iIiII = {
    "functionId": "apTaskList",
    "appid": "activities_platform",
    "clientVersion": "12.0.1",
    "client": "apple",
    "t": iiI1iiI1,
    "body": {
      "linkId": IIl1II1I
    }
  };
  $.h5st = await lil1llli("d5a39", il1iIiII);
  let I1illlII = {
    "url": "https://api.m.jd.com/",
    "body": "" + $.h5st,
    "headers": {
      "origin": "https://pro.m.jd.com",
      "Referer": "https://pro.m.jd.com/mall/active/49CfTHN1tUanwyZ6mVHo26hGiqiY/index.html",
      "User-Agent": $.UA,
      "Cookie": il1ilIli,
      "content-type": "application/x-www-form-urlencoded",
      "accept": "application/json, text/plain, */*"
    },
    "timeout": 20 * 1000
  };
  return new Promise(iillIlll => {
    $.post(I1illlII, async (lI11iiI, l1ilili, IIliiI1l) => {
      try {
        if (lI11iiI) {
          $.log(lI11iiI);
        } else {
          IIliiI1l = JSON.parse(IIliiI1l);
          if (IIliiI1l?.["code"] == 0) {
            let IlIIil = IIliiI1l?.["data"] || [];
            for (let iiI11I1i = 0; iiI11I1i < IlIIil.length; iiI11I1i++) {
              $.taskTitle = IlIIil[iiI11I1i].taskTitle;
              $.apTaskListid = IlIIil[iiI11I1i].id;
              $.taskType = IlIIil[iiI11I1i].taskType;
              $.taskSourceUrl = IlIIil[iiI11I1i].taskSourceUrl;
              $.taskDoTimes = IlIIil[iiI11I1i].taskDoTimes;
              $.taskFinished = IlIIil[iiI11I1i].taskFinished;
              $.taskShowTitle = IlIIil[iiI11I1i].taskShowTitle;
              if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                for (let llli11l1 = 0; llli11l1 < 1; llli11l1++) {
                  console.log("去做 " + $.taskTitle);
                  await i11I111i($.taskType, $.apTaskListid, $.taskSourceUrl);
                  await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                }
              }
            }
          } else console.log("查询任务失败," + (IIliiI1l?.["errMsg"] || IIliiI1l?.["msg"] || ""));
        }
      } catch (Iil11Ili) {
        $.log(Iil11Ili);
      } finally {
        iillIlll();
      }
    });
  });
}
async function i11I111i(II1ll1ll, I1I1Ii1l, II1II111) {
  return new Promise(async IIl1Ii11 => {
    const i11IlI1 = {
      "functionId": "apDoTask",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": iiI1iiI1,
      "body": {
        "taskType": II1ll1ll,
        "taskId": I1I1Ii1l,
        "channel": 4,
        "checkVersion": true,
        "linkId": IIl1II1I,
        "itemId": II1II111
      }
    };
    $.h5st = await lil1llli("d5a39", i11IlI1);
    let Il1l1 = {
      "url": "https://api.m.jd.com/",
      "body": "" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": il1ilIli,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(Il1l1, async (II1lI1l1, I1II1l1I, i1l1Ilii) => {
      try {
        if (II1lI1l1) console.log("" + JSON.stringify(II1lI1l1));else {
          i1l1Ilii = JSON.parse(i1l1Ilii);
          if (i1l1Ilii.code == 0) $.remainChance++, console.log("完成任务,抽奖次数：" + $.remainChance);else {
            if (i1l1Ilii.code == 402) console.log("完成任务失败," + (i1l1Ilii?.["errMsg"] || ""));else {
              console.log("完成任务失败," + (i1l1Ilii?.["errMsg"] || ""));
            }
          }
        }
      } catch (iii1lIi1) {
        $.logErr(iii1lIi1, I1II1l1I);
      } finally {
        IIl1Ii11();
      }
    });
  });
}
async function illliI(l1i1l1i1) {
  return new Promise(async IIl1lilI => {
    const lII1I1iI = {
        "functionId": "superRedBagList",
        "appid": "activities_platform",
        "clientVersion": "12.0.1",
        "client": "ios",
        "body": {
          "linkId": IIl1II1I,
          "pageNum": l1i1l1i1,
          "pageSize": 100,
          "business": "lhb4b"
        }
      },
      i1iIIIlI = await lil1llli("f2b1d", lII1I1iI);
    let III1I1ii = {
      "url": "https://api.m.jd.com/?" + i1iIIIlI,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": il1ilIli
      },
      "timeout": 30 * 1000
    };
    $.get(III1I1ii, async (IIlII1, IIi1IIIl, IiIlllI1) => {
      try {
        if (IIlII1) {
          console.log("" + JSON.stringify(IIlII1));
        } else {
          IiIlllI1 = JSON.parse(IiIlllI1);
          if (IiIlllI1) {
            if (IiIlllI1.code == 0 && IiIlllI1.success == true) {
              const Iilll1ll = (IiIlllI1.data.items || []).filter(ll111 => ll111.prizeType === 4 && ll111.state === 0 || ll111.state === 2);
              for (let llil1il of Iilll1ll) {
                console.log("天天领红包提现，去提现" + llil1il.amount + "现金");
                await I1iiiiII(llil1il.id, llil1il.poolBaseId, llil1il.prizeGroupId, llil1il.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("天天领红包提现失败，当月额度已满");
                  break;
                }
              }
            } else {
              console.log("天天领红包提现查询奖品：异常:" + JSON.stringify(IiIlllI1));
            }
          }
        }
      } catch (I1iI111) {
        $.logErr(I1iI111, IIi1IIIl);
      } finally {
        IIl1lilI();
      }
    });
  });
}
async function I1iiiiII(il111Il, li11IlI1, ilililII, lliiilll) {
  return new Promise(async ii111ii1 => {
    const l1I1li1 = {
        "linkId": IIl1II1I,
        "businessSource": "NONE",
        "base": {
          "prizeType": 4,
          "business": "lhb4b",
          "id": il111Il,
          "poolBaseId": li11IlI1,
          "prizeGroupId": ilililII,
          "prizeBaseId": lliiilll
        }
      },
      IllIli1l = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(l1I1li1)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": il1ilIli
        },
        "timeout": 30 * 1000
      };
    $.post(IllIli1l, async (lll1Iill, lIIIlii, IllI1lIi) => {
      try {
        if (lll1Iill) console.log("" + JSON.stringify(lll1Iill)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (ililIIII(IllI1lIi)) {
            IllI1lIi = $.toObj(IllI1lIi);
            if (IllI1lIi.code === 0) {
              if (IllI1lIi.data.status === "310") console.log("提现现金成功！");else {
                console.log("提现现金：失败:" + IllI1lIi.data.message);
                if (IllI1lIi.data.message.includes("上限")) $.txhot = true;else IllI1lIi.data.message.includes("已存在状态") && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)), await I1iiiiII(il111Il, li11IlI1, ilililII, lliiilll));
              }
            } else console.log("提现现金：异常:" + JSON.stringify(IllI1lIi));
          }
        }
      } catch (lIlIII1l) {
        $.logErr(lIlIII1l, lIIIlii);
      } finally {
        ii111ii1(IllI1lIi);
      }
    });
  });
}
function liIll1Il(liIiiill) {
  liIiiill = liIiiill || 32;
  let iIli111l = "abcdef0123456789",
    I1Iii1l = iIli111l.length,
    lIiI1I = "";
  for (i = 0; i < liIiiill; i++) lIiI1I += iIli111l.charAt(Math.floor(Math.random() * I1Iii1l));
  return lIiI1I;
}
async function lil1llli(i1ll1i1, lli111I) {
  try {
    let IiI1lIii = new iIIi11ii({
      "appId": i1ll1i1,
      "appid": "activities_platform",
      "clientVersion": lli111I?.["clientVersion"],
      "client": lli111I?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await IiI1lIii.genAlgo(), body = await IiI1lIii.genUrlParams(lli111I.functionId, lli111I.body), body;
  } catch (iIlIIilI) {}
}
function Iil1illI(ill1II1I) {
  return ill1II1I.then(ii1ilIi => {
    return [null, ii1ilIi];
  }).catch(li1i1I1i => [li1i1I1i]);
}
function Ii1ii(l1iIlIII, liilllIi = {}) {
  let liIi1I1 = [],
    i1li11 = liilllIi.connector || "&",
    iI1IilII = Object.keys(l1iIlIII);
  if (liilllIi.sort) iI1IilII = iI1IilII.sort();
  for (let lillIll of iI1IilII) {
    let l1ll1i1l = l1iIlIII[lillIll];
    if (l1ll1i1l && typeof l1ll1i1l === "object") l1ll1i1l = JSON.stringify(l1ll1i1l);
    if (l1ll1i1l && liilllIi.encode) l1ll1i1l = encodeURIComponent(l1ll1i1l);
    liIi1I1.push(lillIll + "=" + l1ll1i1l);
  }
  return liIi1I1.join(i1li11);
}
async function IIlII1iI() {
  for (var iiIIIII = "", i1IIi1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", illIIIll = 0; illIIIll < 16; illIIIll++) {
    var lllil1il = Math.round(Math.random() * (i1IIi1.length - 1));
    iiIIIII += i1IIi1.substring(lllil1il, lllil1il + 1);
  }
  return uuid = Buffer.from(iiIIIII, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
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
function li1iIiIi(ililiill = "xxxxxxxxxxxxxxxxxxxx") {
  return ililiill.replace(/[xy]/g, function (lIiIIllI) {
    var Ili1il1l = Math.random() * 10 | 0,
      lli1il = lIiIIllI == "x" ? Ili1il1l : Ili1il1l & 3 | 8;
    return jdaid = lli1il.toString(), jdaid;
  });
}
function liliI1i(ll1IiiiI) {
  return new Promise(I1Ii1II => {
    const I1lll11l = {
      "url": "" + ll1IiiiI,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1lll11l, async (li1l1IIl, l1IiiIiI, IIl1lIii) => {
      try {
        if (li1l1IIl) {} else {
          if (IIl1lIii) IIl1lIii = JSON.parse(IIl1lIii);else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (liilI11) {
        $.logErr(liilI11, l1IiiIiI);
        IIl1lIii = null;
      } finally {
        I1Ii1II(IIl1lIii);
      }
    });
  });
}
function lIIiiiIl(IilIll1I, IiI1lll1) {
  return Math.floor(Math.random() * (IiI1lll1 - IilIll1I)) + IilIll1I;
}