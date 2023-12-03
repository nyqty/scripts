/*
签到提现

cron "25 2,8,16 * * *" script-path=jd_qdtx.js, tag=签到提现

 */
const Env=require('./utils/Env.js');
const $ = new Env('签到提现');
const lilI1I = $.isNode() ? require("./sendNotify") : "",
  lI1I1l = $.isNode() ? require("./jdCookie.js") : "",
  Il1Il = require("./function/h5st41.js");
let lI1I1I = "FIz2zkvbepstVFm3uqLOUA",
  lilI1l = Date.now(),
  l1liiI = [],
  I1iI1 = "",
  lilI1i;
if ($.isNode()) {
  Object.keys(lI1I1l).forEach(iiiI1i => {
    l1liiI.push(lI1I1l[iiiI1i]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  l1liiI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...liI1I1($.getdata("CookiesJD") || "[]").map(iiiI1l => iiiI1l.cookie)].filter(Ili1Ii => !!Ili1Ii);
}
!(async () => {
  if (!l1liiI[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let liI1Il = 0; liI1Il < l1liiI.length; liI1Il++) {
    if (l1liiI[liI1Il]) {
      I1iI1 = l1liiI[liI1Il];
      $.UserName = decodeURIComponent(I1iI1.match(/pt_pin=([^; ]+)(?=;?)/) && I1iI1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = liI1Il + 1;
      $.isLogin = true;
      $.nickName = "";
      lilI1i = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lilI1I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + iilIIi("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await i1liI();
      await Il1Ii();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(Ili1II => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Ili1II + "!", "");
}).finally(() => {
  $.done();
});
async function Il1Ii() {
  $.txhot = false;
  $.nowcontinue = false;
  await Ii11i();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  if ($.nowcontinue) {
    await l1lIl();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await iIIli1();
  }
}
function Ii11l(l1lill) {
  try {
    if (typeof JSON.parse(l1lill) == "object") {
      return true;
    }
  } catch (IIlI1I) {
    console.log(IIlI1I);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function liI1I1(IiIiIl) {
  if (typeof IiIiIl == "string") {
    try {
      return JSON.parse(IiIiIl);
    } catch (III1Ii) {
      console.log(III1Ii);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function Ii11i() {
  return new Promise(async l1I1II => {
    const l1iiIi = {
      functionId: "bSignInHome",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        activityId: lI1I1I,
        linkId: lI1I1I
      }
    };
    $.h5st = await IilIl("76674", l1iiIi);
    let lIIi1l = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(lIIi1l, async (I1lI1i, illili, iiiII1) => {
      try {
        if (I1lI1i) {
          console.log("" + JSON.stringify(I1lI1i));
        } else {
          iiiII1 = JSON.parse(iiiII1);
          if (iiiII1.code == 0) {
            $.nowcontinue = true;
            let liI111 = iiiII1?.["data"]?.["signInCoin"],
              IiIlI = iiiII1?.["data"]?.["bubbleText"],
              iIlI1i = iiiII1?.["data"]?.["signInFlag"];
            console.log("当前现金：" + liI111 + ",当前可提现：" + (IiIlI || 0));
            iIlI1i == 1 ? console.log("今天已签到") : await i1llI();
          } else {
            iiiII1.code == 402 ? console.log("进入首页失败," + (iiiII1?.["errMsg"] || "")) : console.log("进入首页失败," + (iiiII1?.["errMsg"] || ""));
          }
        }
      } catch (iII1Ii) {
        $.logErr(iII1Ii, illili);
      } finally {
        l1I1II();
      }
    });
  });
}
async function i1llI() {
  return new Promise(async illill => {
    const I1lI11 = {
      functionId: "bSignInDo",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        activityId: lI1I1I,
        linkId: lI1I1I
      }
    };
    $.h5st = await IilIl("76674", I1lI11);
    let I1I1Il = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(I1I1Il, async (IIIl, IIIi, l1IIli) => {
      try {
        if (IIIl) {
          console.log("" + JSON.stringify(IIIl));
        } else {
          l1IIli = JSON.parse(l1IIli);
          if (l1IIli.code == 0) {
            console.log("签到获得: " + (l1IIli?.["data"]?.["signInCoin"] || 0) + "元");
          } else {
            l1IIli.code == 402 ? console.log("进入首页失败," + (l1IIli?.["errMsg"] || "")) : console.log("进入首页失败," + (l1IIli?.["errMsg"] || ""));
          }
        }
      } catch (iII1I1) {
        $.logErr(iII1I1, IIIi);
      } finally {
        illill();
      }
    });
  });
}
async function iIIli1() {
  return new Promise(async lIi1ii => {
    const liI11i = {
      functionId: "BSignInMyBalance",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        activityId: lI1I1I,
        linkId: lI1I1I
      }
    };
    $.h5st = await IilIl("34e92", liI11i);
    let l1l1l = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(l1l1l, async (illil1, IIIlii, iil11I) => {
      try {
        if (illil1) {
          console.log("" + JSON.stringify(illil1));
        } else {
          iil11I = JSON.parse(iil11I);
          if (iil11I.code == 0) {
            let Il11 = iil11I?.["data"]?.["totalAmount"],
              iiil11 = iil11I?.["data"]?.["wxExchange"] || [];
            for (let llII1I = 0; llII1I < iiil11.length; llII1I++) {
              $.exchangeType = iiil11[llII1I].exchangeType;
              $.amount = iiil11[llII1I].amount;
              $.krstatus = iiil11[llII1I].status;
              $.gear = iiil11[llII1I].gear;
            }
            if (Il11 >= 20) {
              await Ii1l1i(4, 3);
            } else {
              if (Il11 < 20 && Il11 >= 1) {
                await Ii1l1i(4, 2);
              } else {
                Il11 < 1 && Il11 >= 0.3 ? await Ii1l1i(4, 1) : console.log("当前现金不足以兑换，先跑任务吧。");
              }
            }
          } else {
            iil11I.code == 402 ? console.log("进入页面失败," + (iil11I?.["errMsg"] || "")) : console.log("进入页面失败," + (iil11I?.["errMsg"] || ""));
          }
        }
      } catch (IlllI) {
        $.logErr(IlllI, IIIlii);
      } finally {
        lIi1ii();
      }
    });
  });
}
async function Ii1l1i(ll11II, liIlII) {
  return new Promise(async ll11Ii => {
    const liIlI1 = {
      functionId: "bSignInExchange",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        activityId: lI1I1I,
        awardType: ll11II,
        gear: liIlII,
        linkId: lI1I1I
      }
    };
    $.h5st = await IilIl("ff179", liIlI1);
    let iillIl = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(iillIl, async (IiIi1I, iillIi, iii11) => {
      try {
        if (IiIi1I) {
          console.log("" + JSON.stringify(IiIi1I));
        } else {
          iii11 = JSON.parse(iii11);
          if (iii11.code == 0) {
            console.log("兑换成功," + (iii11?.["data"]?.["amount"] || "") + " " + (iii11?.["data"]?.["msg"] || ""));
          } else {
            if (iii11.code == 402) {
              console.log("兑换失败," + (iii11?.["errMsg"] || ""));
            } else {
              iii11.code == 16501 ? console.log("兑换失败," + (iii11?.["data"]?.["msg"] || "")) : console.log("兑换失败," + (iii11?.["errMsg"] || ""));
            }
          }
        }
      } catch (l1lii1) {
        $.logErr(l1lii1, iillIi);
      } finally {
        ll11Ii();
      }
    });
  });
}
async function l1lIl() {
  let iillII = {
    url: "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22:%22FIz2zkvbepstVFm3uqLOUA%22%7D&t=" + lilI1l + "&appid=activities_platform&client=ios&clientVersion=12.0.10",
    headers: {
      origin: "https://h5platform.jd.com",
      Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
      "User-Agent": $.UA,
      Cookie: I1iI1,
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json, text/plain, */*"
    },
    timeout: 20000
  };
  return new Promise(liiiIl => {
    $.get(iillII, async (i11i1, liIIi1, I1liiI) => {
      try {
        if (i11i1) {
          $.log(i11i1);
        } else {
          I1liiI = JSON.parse(I1liiI);
          if (I1liiI?.["code"] == 0) {
            let l1I11i = I1liiI?.["data"] || [];
            for (let iIlii1 = 0; iIlii1 < l1I11i.length; iIlii1++) {
              $.taskTitle = l1I11i[iIlii1].taskTitle;
              $.apTaskListid = l1I11i[iIlii1].id;
              $.taskType = l1I11i[iIlii1].taskType;
              $.taskSourceUrl = l1I11i[iIlii1].taskSourceUrl;
              $.taskDoTimes = l1I11i[iIlii1].taskDoTimes;
              $.taskFinished = l1I11i[iIlii1].taskFinished;
              $.taskShowTitle = l1I11i[iIlii1].taskShowTitle;
              $.timeLimitPeriod = l1I11i[iIlii1].timeLimitPeriod;
              if ($.timeLimitPeriod == null) {
                if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                  for (let l1IlII = 0; l1IlII < 1; l1IlII++) {
                    console.log("去做 " + $.taskShowTitle);
                    await l1lili($.taskType, $.apTaskListid, $.taskSourceUrl);
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                    await IIlI1l($.taskType, $.apTaskListid);
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                  }
                }
              } else {
                if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                  for (let liIIlI = 0; liIIlI < 1; liIIlI++) {
                    console.log("去做 " + $.taskShowTitle);
                    await i1Iiil($.apTaskListid, $.taskSourceUrl);
                    await i1Iiii($.apTaskListid);
                    await $.wait($.timeLimitPeriod * 1000 + 1500, 10);
                    await l1lIi($.apTaskListid);
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                    await Ii1l1l();
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                    await IIlI1l($.taskType, $.apTaskListid);
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                  }
                }
              }
            }
          } else {
            console.log("查询任务失败," + (I1liiI?.["errMsg"] || I1liiI?.["msg"] || ""));
          }
        }
      } catch (liIIl1) {
        $.log(liIIl1);
      } finally {
        liiiIl();
      }
    });
  });
}
async function Ii1l1l() {
  return new Promise(async liI1 => {
    const liiiII = {
      functionId: "apDoLimitTimeTask",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        linkId: lI1I1I
      }
    };
    $.h5st = await IilIl("ebecc", liiiII);
    let IIiili = {
      url: "https://api.m.jd.com/",
      body: "" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(IIiili, async (iIIIi, Il1iII, Iii1iI) => {
      try {
        if (iIIIi) {
          console.log("" + JSON.stringify(iIIIi));
        } else {
          Iii1iI = JSON.parse(Iii1iI);
          if (Iii1iI.code == 0) {
            console.log("完成任务成功");
          } else {
            Iii1iI.code == 402 ? console.log("完成任务失败," + (Iii1iI?.["errMsg"] || "")) : console.log("完成任务失败," + (Iii1iI?.["errMsg"] || ""));
          }
        }
      } catch (llli11) {
        $.logErr(llli11, Il1iII);
      } finally {
        liI1();
      }
    });
  });
}
async function i1Iiil(I1lill, I1lili) {
  return new Promise(async Il1iIl => {
    const IlilII = {
      functionId: "apStartTaskTime",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        taskId: I1lill,
        channel: 4,
        linkId: lI1I1I,
        itemId: I1lili
      }
    };
    $.h5st = await IilIl("76674", IlilII);
    let iIII1 = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(iIII1, async (I1lil1, iIlilI, i11Ii1) => {
      try {
        if (I1lil1) {
          console.log("" + JSON.stringify(I1lil1));
        } else {
          i11Ii1 = JSON.parse(i11Ii1);
          if (!(i11Ii1.code == 0)) {
            !(i11Ii1.code == 402);
          }
        }
      } catch (ll1lIi) {
        $.logErr(ll1lIi, iIlilI);
      } finally {
        Il1iIl();
      }
    });
  });
}
async function i1Iiii(Ii1Ii1) {
  return new Promise(async iIIIii => {
    const I1iiIi = {
      functionId: "apCheckAndResetTaskTime",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        taskId: Ii1Ii1,
        linkId: lI1I1I
      }
    };
    $.h5st = await IilIl("76674", I1iiIi);
    let li1i1 = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(li1i1, async (iIIIlI, li11i1, II1l1) => {
      try {
        if (iIIIlI) {
          console.log("" + JSON.stringify(iIIIlI));
        } else {
          II1l1 = JSON.parse(II1l1);
          if (!(II1l1.code == 0)) {
            !(II1l1.code == 402);
          }
        }
      } catch (l1I1lI) {
        $.logErr(l1I1lI, li11i1);
      } finally {
        iIIIii();
      }
    });
  });
}
async function l1lIi(iIIIl1) {
  return new Promise(async I1IIiI => {
    const li11lI = {
      functionId: "apCheckTaskTimeEnd",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        taskId: iIIIl1,
        linkId: lI1I1I
      }
    };
    $.h5st = await IilIl("76674", li11lI);
    let l1I1ll = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(l1I1ll, async (li1iI, I1IIi1, ll1lI1) => {
      try {
        if (li1iI) {
          console.log("" + JSON.stringify(li1iI));
        } else {
          ll1lI1 = JSON.parse(ll1lI1);
          if (ll1lI1.code == 0) {
            console.log("浏览时间结束");
          } else {
            ll1lI1.code == 402 ? console.log("浏览时间失败," + (ll1lI1?.["errMsg"] || "")) : console.log("浏览时间失败," + (ll1lI1?.["errMsg"] || ""));
          }
        }
      } catch (Ii1Ili) {
        $.logErr(Ii1Ili, I1IIi1);
      } finally {
        I1IIiI();
      }
    });
  });
}
async function l1lili(IIlII1, ll1Iil, li1lI) {
  return new Promise(async i1IlI => {
    const lIl1Il = {
      functionId: "apDoTask",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        taskType: IIlII1,
        taskId: ll1Iil,
        channel: 4,
        checkVersion: true,
        linkId: lI1I1I,
        itemId: li1lI
      }
    };
    $.h5st = await IilIl("76674", lIl1Il);
    let Ii1IlI = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(Ii1IlI, async (li11li, iliiii, IIlIIi) => {
      try {
        if (li11li) {
          console.log("" + JSON.stringify(li11li));
        } else {
          IIlIIi = JSON.parse(IIlIIi);
          if (IIlIIi.code == 0) {
            console.log("完成任务");
          } else {
            IIlIIi.code == 402 ? console.log("完成任务失败," + (IIlIIi?.["errMsg"] || "")) : console.log("完成任务失败," + (IIlIIi?.["errMsg"] || ""));
          }
        }
      } catch (li1l1) {
        $.logErr(li1l1, iliiii);
      } finally {
        i1IlI();
      }
    });
  });
}
async function IIlI1l(IIiI1l, IIiI1i) {
  return new Promise(async ilIlll => {
    const I1I11l = {
      functionId: "apTaskDrawAward",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lilI1l,
      body: {
        taskType: IIiI1l,
        taskId: IIiI1i,
        channel: 4,
        checkVersion: true,
        cityId: "50950",
        provinceId: "4",
        countyId: "50957",
        linkId: lI1I1I
      }
    };
    $.h5st = await IilIl("6f2b6", I1I11l);
    let I1I11i = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: I1iI1,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(I1I11i, async (l1iI1l, III1ll, l1lIIi) => {
      try {
        if (l1iI1l) {
          console.log("" + JSON.stringify(l1iI1l));
        } else {
          l1lIIi = JSON.parse(l1lIIi);
          if (l1lIIi.code == 0) {
            console.log("领取奖励成功");
          } else {
            if (l1lIIi.code == 402) {
              console.log("领取任务奖励失败," + (l1lIIi?.["errMsg"] || ""));
            } else {
              l1lIIi.code == 10 ? console.log("领取任务奖励失败," + (l1lIIi?.["errMsg"] || "") + ",请重新运行领取奖励") : console.log("领取任务奖励失败," + (l1lIIi?.["errMsg"] || ""));
            }
          }
        }
      } catch (iilIiI) {
        $.logErr(iilIiI, III1ll);
      } finally {
        ilIlll();
      }
    });
  });
}
function lI1I11(lIlll1) {
  lIlll1 = lIlll1 || 32;
  let I1I11I = "abcdef0123456789",
    iII11l = I1I11I.length,
    i1IiI1 = "";
  for (i = 0; i < lIlll1; i++) {
    i1IiI1 += I1I11I.charAt(Math.floor(Math.random() * iII11l));
  }
  return i1IiI1;
}
async function IilIl(l1iI1i, lIlllI) {
  try {
    let I11i = new Il1Il({
      appId: l1iI1i,
      appid: "activities_platform",
      clientVersion: lIlllI?.["clientVersion"],
      client: lIlllI?.["client"],
      pin: $.UserName,
      ua: $.UA,
      version: "4.1"
    });
    await I11i.genAlgo();
    body = await I11i.genUrlParams(lIlllI.functionId, lIlllI.body);
    return body;
  } catch (ll1IlI) {}
}
function IilIi(I11l) {
  return I11l.then(Ili1l1 => {
    return [null, Ili1l1];
  }).catch(iilIil => [iilIil]);
}
function Ili1Il(illI1i, i1IiII = {}) {
  let l1ll1I = [],
    i1lI1 = i1IiII.connector || "&",
    l1ll11 = Object.keys(illI1i);
  if (i1IiII.sort) {
    l1ll11 = l1ll11.sort();
  }
  for (let i1IiIi of l1ll11) {
    let Ili1il = illI1i[i1IiIi];
    if (Ili1il && typeof Ili1il === "object") {
      Ili1il = JSON.stringify(Ili1il);
    }
    if (Ili1il && i1IiII.encode) {
      Ili1il = encodeURIComponent(Ili1il);
    }
    l1ll1I.push(i1IiIi + "=" + Ili1il);
  }
  return l1ll1I.join(i1lI1);
}
async function i1liI() {
  for (var iilIii = "", iII111 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", Ili1ii = 0; Ili1ii < 16; Ili1ii++) {
    var lIiIil = Math.round(Math.random() * (iII111.length - 1));
    iilIii += iII111.substring(lIiIil, lIiIil + 1);
  }
  uuid = Buffer.from(iilIii, "utf8").toString("base64");
  ep = encodeURIComponent(JSON.stringify({
    hdid: "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    ts: new Date().getTime(),
    ridx: -1,
    cipher: {
      sv: "CJGkEK==",
      ud: uuid,
      iad: ""
    },
    ciphertype: 5,
    version: "1.0.3",
    appname: "com.360buy.jdmobile"
  }));
  return "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function iilIIi(III1iI = "xxxxxxxxxxxxxxxxxxxx") {
  return III1iI.replace(/[xy]/g, function (iilIl1) {
    var l1II1 = Math.random() * 10 | 0,
      III1i1 = iilIl1 == "x" ? l1II1 : l1II1 & 3 | 8;
    jdaid = III1i1.toString();
    return jdaid;
  });
}
function I1iII(IlI1) {
  return new Promise(l1ll1i => {
    const IiIil1 = {
      url: "" + IlI1,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IiIil1, async (i111l, lIiIlI, iilIlI) => {
      try {
        if (!i111l) {
          iilIlI ? iilIlI = JSON.parse(iilIlI) : console.log("未获取到数据,请重新运行");
        }
      } catch (i111i) {
        $.logErr(i111i, lIiIlI);
        iilIlI = null;
      } finally {
        l1ll1i(iilIlI);
      }
    });
  });
}
function IIlI1i(llIii1, I1IlII) {
  return Math.floor(Math.random() * (I1IlII - llIii1)) + llIii1;
}