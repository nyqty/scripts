/*
新东东农场幸运转盘

cron "55 5 * * *" script-path=jd_dongDongFarm_draw.js, tag=新东东农场幸运转盘

 */
const Env=require('./utils/Env.js');
const $ = new Env('新东东农场幸运转盘')
const I1l11I = $.isNode() ? require("./sendNotify") : "",
  Ilil1l = $.isNode() ? require("./jdCookie") : "",
  iIIiii = require("./function/krgetH5st"),
  iilll = require("./function/jdCommon");
let IlllIi = "VssYBUKJOen7HZXpC8dRFA",
  i1l1Ii = [],
  I1iIIi = "",
  I1iIIl;
if ($.isNode()) {
  Object.keys(Ilil1l).forEach(iillI => {
    i1l1Ii.push(Ilil1l[iillI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  i1l1Ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iii1lI($.getdata("CookiesJD") || "[]").map(lI1III => lI1III.cookie)].filter(IIliIi => !!IIliIi);
}
!(async () => {
  if (!i1l1Ii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let II11ll = 0; II11ll < i1l1Ii.length; II11ll++) {
    if (i1l1Ii[II11ll]) {
      I1iIIi = i1l1Ii[II11ll];
      $.UserName = decodeURIComponent(I1iIIi.match(/pt_pin=([^; ]+)(?=;?)/) && I1iIIi.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = II11ll + 1;
      $.isLogin = true;
      $.nickName = "";
      I1iIIl = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await I1l11I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + Iil1ll("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = iilll.genUA($.UserName);
      await lI1IIl();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(lI1II1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lI1II1 + "!", "");
}).finally(() => {
  $.done();
});
async function lI1IIl() {
  $.txhot = false;
  $.nowcontinue = false;
  await i1ilI1();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  if ($.nowcontinue) {
    await Iil1li();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    for (let lill1l = 0; lill1l < $.lotteryChances; lill1l++) {
      await Iiilii();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
  }
}
function i1ilI(llI11I) {
  try {
    if (typeof JSON.parse(llI11I) == "object") {
      return true;
    }
  } catch (lI1l1i) {
    console.log(lI1l1i);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function iii1lI(llI11l) {
  if (typeof llI11l == "string") {
    try {
      return JSON.parse(llI11l);
    } catch (IIii1I) {
      console.log(IIii1I);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function i1ilI1() {
  return new Promise(async II11ii => {
    const II11il = {
        appId: "c06b7",
        functionId: "wheelsHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: IlllIi
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      iIIil1 = await iIIiii.getH5st(II11il);
    let IlllII = {
      url: "https://api.m.jd.com",
      body: iIIil1.params,
      headers: {
        origin: "https://lotterydraw-new.jd.com",
        Referer: "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA&sid=&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: I1iIIi,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(IlllII, async (lI1l1I, lill11, liI1i1) => {
      try {
        if (lI1l1I) {
          console.log("" + JSON.stringify(lI1l1I));
        } else {
          liI1i1 = JSON.parse(liI1i1);
          if (liI1i1.code == 0) {
            $.nowcontinue = true;
            $.lotteryChances = liI1i1?.["data"]?.["lotteryChances"];
            console.log("当前抽奖次数：" + $.lotteryChances);
          } else {
            if (liI1i1.code == 402) {
              console.log("进入首页失败," + (liI1i1?.["errMsg"] || ""));
            } else {
              console.log("进入首页失败," + (liI1i1?.["errMsg"] || ""));
            }
          }
        }
      } catch (I11i1i) {
        $.logErr(I11i1i, lill11);
      } finally {
        II11ii();
      }
    });
  });
}
async function Iiilii() {
  return new Promise(async lill1I => {
    const Ilil11 = {
        appId: "bd6c8",
        functionId: "wheelsLottery",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: IlllIi
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      i1ii1 = await iIIiii.getH5st(Ilil11);
    let il1ii = {
      url: "https://api.m.jd.com",
      body: i1ii1.params,
      headers: {
        origin: "https://lotterydraw-new.jd.com",
        Referer: "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA&sid=&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: I1iIIi,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(il1ii, async (lIIiIl, iI1Iil, il1iI) => {
      try {
        if (lIIiIl) {
          console.log("" + JSON.stringify(lIIiIl));
        } else {
          il1iI = JSON.parse(il1iI);
          if (il1iI.code == 0) {
            switch (il1iI?.["data"]?.["rewardType"]) {
              case 0:
                console.log("抽中：空气-" + il1iI?.["data"]?.["lotteryChances"] + "次机会");
                break;
              case 1:
                console.log("抽中：" + il1iI?.["data"]?.["prizeName"] + "-" + il1iI?.["data"]?.["limitStr"] + "-" + il1iI?.["data"]?.["lotteryChances"] + "次机会");
                break;
              case 18:
                console.log("抽中：" + il1iI?.["data"]?.["prizeName"] + "-" + il1iI?.["data"]?.["lotteryChances"] + "次机会");
                break;
              case null:
                console.log("运气不太好，什么都没有抽到...");
                break;
              default:
                console.log(il1iI?.["data"]?.["rewardType"] + "-" + il1iI?.["data"]?.["prizeName"] + "-" + il1iI?.["data"]?.["lotteryChances"] + "次机会");
                return;
            }
          } else {
            il1iI.code == 402 ? console.log("抽奖失败," + (il1iI?.["errMsg"] || "")) : (console.log("抽奖失败," + (il1iI?.["errMsg"] || "")), $.lhb4b_open = false);
          }
        }
      } catch (i1iIil) {
        $.logErr(i1iIil, iI1Iil);
      } finally {
        lill1I();
      }
    });
  });
}
async function Iil1li() {
  const II11I = {
      appId: "c06b7",
      functionId: "apTaskList",
      appid: "activities_platform",
      clientVersion: "12.2.0",
      client: "ios",
      body: {
        linkId: IlllIi
      },
      version: "4.1",
      ua: $.UA,
      t: true
    },
    il1i1 = await iIIiii.getH5st(II11I);
  let lIIiIi = {
    url: "https://api.m.jd.com",
    body: il1i1.params,
    headers: {
      origin: "https://lotterydraw-new.jd.com",
      Referer: "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA&sid=&un_area=4_133_58530_0",
      "User-Agent": $.UA,
      Cookie: I1iIIi,
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json, text/plain, */*"
    },
    timeout: 20000
  };
  return new Promise(i1iIll => {
    $.post(lIIiIi, async (l1i1I1, llIIil, llIIii) => {
      try {
        if (l1i1I1) {
          $.log(l1i1I1);
        } else {
          llIIii = JSON.parse(llIIii);
          if (llIIii?.["code"] == 0) {
            let llIIlI = llIIii?.["data"] || [];
            for (let Ii1I1l = 0; Ii1I1l < llIIlI.length; Ii1I1l++) {
              $.taskTitle = llIIlI[Ii1I1l].taskTitle;
              $.apTaskListid = llIIlI[Ii1I1l].id;
              $.taskType = llIIlI[Ii1I1l].taskType;
              $.taskSourceUrl = llIIlI[Ii1I1l].taskSourceUrl;
              $.taskDoTimes = llIIlI[Ii1I1l].taskDoTimes;
              $.taskFinished = llIIlI[Ii1I1l].taskFinished;
              $.taskShowTitle = llIIlI[Ii1I1l].taskShowTitle;
              if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                for (let IIlIl = 0; IIlIl < 1; IIlIl++) {
                  console.log("去做 " + $.taskTitle);
                  await Iiilil($.taskType, $.apTaskListid, $.taskSourceUrl);
                  await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                }
              }
            }
          } else {
            console.log("查询任务失败," + (llIIii?.["errMsg"] || llIIii?.["msg"] || ""));
          }
        }
      } catch (Iiilll) {
        $.log(Iiilll);
      } finally {
        i1iIll();
      }
    });
  });
}
async function Iiilil(IIlIi, ili11i, iiIi1l) {
  return new Promise(async IiiI1 => {
    const IIIiI = {
        appId: "54ed7",
        functionId: "apsDoTask",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          taskType: IIlIi,
          taskId: ili11i,
          channel: 4,
          checkVersion: true,
          linkId: IlllIi,
          itemId: iiIi1l
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      iii1i1 = await iIIiii.getH5st(IIIiI);
    let IllIll = {
      url: "https://api.m.jd.com",
      body: iii1i1.params,
      headers: {
        origin: "https://lotterydraw-new.jd.com",
        Referer: "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA&sid=&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: I1iIIi,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(IllIll, async (iI1IlI, l1i1Il, ill1I1) => {
      try {
        if (iI1IlI) {
          console.log("" + JSON.stringify(iI1IlI));
        } else {
          ill1I1 = JSON.parse(ill1I1);
          if (ill1I1.code == 0) {
            $.lotteryChances++;
            console.log("完成任务,抽奖次数：" + $.lotteryChances);
          } else {
            if (ill1I1.code == 402) {
              console.log("完成任务失败," + (ill1I1?.["errMsg"] || ""));
            } else {
              console.log("完成任务失败," + (ill1I1?.["errMsg"] || ""));
            }
          }
        }
      } catch (lilI1) {
        $.logErr(lilI1, l1i1Il);
      } finally {
        IiiI1();
      }
    });
  });
}
function Iil1ll(iI1Ili = "xxxxxxxxxxxxxxxxxxxx") {
  return iI1Ili.replace(/[xy]/g, function (IiiIl) {
    var ii1l1l = Math.random() * 10 | 0,
      l1lli1 = IiiIl == "x" ? ii1l1l : ii1l1l & 3 | 8;
    jdaid = l1lli1.toString();
    return jdaid;
  });
}