/*
摇钱树任务

cron "25 4,16 * * *" script-path=jd_yqs.js, tag=摇钱树任务

等级达到40级为满级，需要停止浇水3天，7天后开启新一轮活动

轮询提现变量：jd_yqs_num //轮询提现页数  一般无需填写

 */
const Env=require('./utils/Env.js');
const $ = new Env('摇钱树任务');
const iII1Il = $.isNode() ? require("./sendNotify") : "",
  IIIliI = $.isNode() ? require("./jdCookie.js") : "",
  iII1Ii = require("./function/h5st41.js");
let llIill = "_LN1l_4Nv5mTEsWhs3hIMA",
  l1IIii = process.env.jd_yqs_num ? process.env.jd_yqs_num : "1",
  lIIi1I = Date.now(),
  l1IIil = [],
  l1iiII = "",
  I1lI1I;
if ($.isNode()) {
  Object.keys(IIIliI).forEach(l1l1i => {
    l1IIil.push(IIIliI[l1l1i]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  l1IIil = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...illill($.getdata("CookiesJD") || "[]").map(I1I1II => I1I1II.cookie)].filter(i11ll => !!i11ll);
}
!(async () => {
  if (!l1IIil[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let Ill1I1 = 0; Ill1I1 < l1IIil.length; Ill1I1++) {
    if (l1IIil[Ill1I1]) {
      l1iiII = l1IIil[Ill1I1];
      $.UserName = decodeURIComponent(l1iiII.match(/pt_pin=([^; ]+)(?=;?)/) && l1iiII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Ill1I1 + 1;
      $.isLogin = true;
      $.nickName = "";
      I1lI1I = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await iII1Il.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + IIIll1("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await illiii();
      await lIi1i1();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(lIi1ii => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lIi1ii + "!", "");
}).finally(() => {
  $.done();
});
async function lIi1i1() {
  $.txhot = false;
  $.nowcontinue = false;
  $.drawLotteryNum = 0;
  await IIIli1();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  if ($.nowcontinue) {
    await IIIli1();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await l1l1I();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    for (let ll11II = 0; ll11II < $.drawLotteryNum; ll11II++) {
      await I1I1Il();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    console.log("\n当前设置轮询提现页数：" + l1IIii);
    for (let liIlII = 0; liIlII < l1IIii; liIlII++) {
      $.pageNum = liIlII + 1;
      console.log("\n开始轮询提现" + $.pageNum + "页");
      await iiiIIi($.pageNum);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.txhot) {
        break;
      }
    }
  }
}
function l1l11(Il1I) {
  try {
    if (typeof JSON.parse(Il1I) == "object") {
      return true;
    }
  } catch (IiIi1i) {
    console.log(IiIi1i);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function illill(llII1l) {
  if (typeof llII1l == "string") {
    try {
      return JSON.parse(llII1l);
    } catch (illI1I) {
      console.log(illI1I);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function IIIli1() {
  return new Promise(async liIIii => {
    const I1liii = {
      functionId: "richTreeHome",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lIIi1I,
      body: {
        linkId: llIill
      }
    };
    $.h5st = await iII1I1("34e92", I1liii);
    let liiiIi = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: l1iiII,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(liiiIi, async (i11i1, liIIi1, I1liiI) => {
      try {
        if (i11i1) {
          console.log("" + JSON.stringify(i11i1));
        } else {
          I1liiI = JSON.parse(I1liiI);
          if (I1liiI.code == 0) {
            $.drawLotteryNum = I1liiI?.["data"]?.["drawLotteryNum"];
            let ii1l = I1liiI?.["data"]?.["kettle"]?.["currentCapacity"],
              iIl1I = I1liiI?.["data"]?.["richTree"]?.["nowStep"],
              liIi = I1liiI?.["data"]?.["richTree"]?.["nowExp"],
              liIIlI = I1liiI?.["data"]?.["richTree"]?.["remainingExp"];
            console.log("当前水滴：" + ii1l + ",当前等级：" + iIl1I + ",当前进度：" + liIi + ",还需经验：" + liIIlI);
            if (I1liiI?.["data"]?.["richTree"]?.["nowStep"] >= 1) {
              $.nowcontinue = true;
              let IliIil = I1liiI?.["data"]?.["totalReward"] || [];
              $.prizeList = "";
              for (let iliiIi = 0; iliiIi < IliIil.length; iliiIi++) {
                $.amount = IliIil[iliiIi].amount;
                $.prizeType = IliIil[iliiIi].prizeType;
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
                iliiIi != IliIil.length - 1 ? $.prizeList += $.prizeType + "：" + $.amount + "，" : $.prizeList += $.prizeType + "：" + $.amount;
              }
              console.log("当前汇总：" + $.prizeList);
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              ii1l >= 2000 && iIl1I < 40 && (await I1lI11(ii1l, 0), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
            } else {
              console.log("获得新手红包," + (I1liiI?.["data"]?.["prizeDrawVO"]?.["prizeConfigName"] || 0));
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              await I1lI11(ii1l, 2);
            }
          } else {
            I1liiI.code == 402 ? console.log("进入首页失败," + (I1liiI?.["errMsg"] || "")) : console.log("进入首页失败," + (I1liiI?.["errMsg"] || ""));
          }
        }
      } catch (liIIl1) {
        $.logErr(liIIl1, liIIi1);
      } finally {
        liIIii();
      }
    });
  });
}
async function I1lI11(IIiilI, I1lii1) {
  return new Promise(async i11Il1 => {
    const IIIlli = {
      functionId: "richTreeWater",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lIIi1I,
      body: {
        waterNum: IIiilI,
        type: I1lii1,
        linkId: llIill
      }
    };
    $.h5st = await iII1I1("34e92", IIIlli);
    let illii1 = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: l1iiII,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(illii1, async (Iii1i1, IIIlll, llli1I) => {
      try {
        if (Iii1i1) {
          console.log("" + JSON.stringify(Iii1i1));
        } else {
          llli1I = JSON.parse(llli1I);
          if (llli1I.code == 0) {
            let Iii1iI = llli1I?.["data"]?.["redPacketNum"];
            console.log("完成浇水,等级：" + llli1I?.["data"]?.["nowStep"] + "-获得抽奖次数：" + Iii1iI);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            for (let lIi1lI = 0; lIi1lI < Iii1iI; lIi1lI++) {
              await I1I1Il();
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
          } else {
            llli1I.code == 402 ? console.log("浇水失败," + (llli1I?.["errMsg"] || "")) : console.log("浇水失败," + (llli1I?.["errMsg"] || ""));
          }
        }
      } catch (IIiiil) {
        $.logErr(IIiiil, IIIlll);
      } finally {
        i11Il1();
      }
    });
  });
}
async function I1I1Il() {
  return new Promise(async i11Iil => {
    const Il1iIl = {
      functionId: "richTreeOpen",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lIIi1I,
      body: {
        linkId: llIill
      }
    };
    $.h5st = await iII1I1("34e92", Il1iIl);
    let lIi1ll = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: l1iiII,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(lIi1ll, async (l1IIiI, IlilIi, I1lilI) => {
      try {
        if (l1IIiI) {
          console.log("" + JSON.stringify(l1IIiI));
        } else {
          I1lilI = JSON.parse(I1lilI);
          if (I1lilI.code == 0) {
            switch (I1lilI?.["data"]?.["prizeType"]) {
              case 1:
                console.log("获得," + I1lilI?.["data"]?.["prizeConfigName"] + "-" + I1lilI?.["data"]?.["createTime"]);
                break;
              case 2:
                console.log("获得红包," + I1lilI?.["data"]?.["prizeConfigName"] + "-" + I1lilI?.["data"]?.["createTime"]);
                break;
              case 4:
                console.log("获得现金," + I1lilI?.["data"]?.["prizeConfigName"] + "-" + I1lilI?.["data"]?.["createTime"]);
                break;
              case null:
                console.log("运气不太好，什么都没有抽到...");
                break;
              default:
                console.log(I1lilI?.["data"]?.["prizeType"]);
                return;
            }
          } else {
            if (I1lilI.code == 402) {
              console.log("抽奖失败," + (I1lilI?.["errMsg"] || ""));
            } else {
              console.log("抽奖失败," + (I1lilI?.["errMsg"] || ""));
            }
          }
        }
      } catch (iIII1) {
        $.logErr(iIII1, IlilIi);
      } finally {
        i11Iil();
      }
    });
  });
}
async function l1l1I() {
  let i11Ii1 = {
    url: "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22:%22_LN1l_4Nv5mTEsWhs3hIMA%22%7D&t=" + lIIi1I + "&appid=activities_platform&client=ios&clientVersion=12.0.10",
    headers: {
      origin: "https://h5platform.jd.com",
      Referer: "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
      "User-Agent": $.UA,
      Cookie: l1iiII,
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json, text/plain, */*"
    },
    timeout: 20000
  };
  return new Promise(IIll1l => {
    $.get(i11Ii1, async (liliIl, liii1l, I1iiII) => {
      try {
        if (liliIl) {
          $.log(liliIl);
        } else {
          I1iiII = JSON.parse(I1iiII);
          if (I1iiII?.["code"] == 0) {
            let i1Ili = I1iiII?.["data"] || [];
            for (let I1iiI1 = 0; I1iiI1 < i1Ili.length; I1iiI1++) {
              $.taskTitle = i1Ili[I1iiI1].taskTitle;
              $.apTaskListid = i1Ili[I1iiI1].id;
              $.taskType = i1Ili[I1iiI1].taskType;
              $.taskSourceUrl = i1Ili[I1iiI1].taskSourceUrl;
              $.taskFinished = i1Ili[I1iiI1].taskFinished;
              $.taskDoTimes = i1Ili[I1iiI1].taskDoTimes;
              $.taskFinished = i1Ili[I1iiI1].taskFinished;
              $.taskShowTitle = i1Ili[I1iiI1].taskShowTitle;
              $.timeLimitPeriod = i1Ili[I1iiI1].timeLimitPeriod;
              if ($.timeLimitPeriod == null) {
                if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                  for (let li11l1 = 0; li11l1 < 1; li11l1++) {
                    console.log("去做 " + $.taskShowTitle);
                    await IIIi($.taskType, $.apTaskListid, $.taskSourceUrl);
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                  }
                }
              } else {
                if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                  for (let IIlIIl = 0; IIlIIl < 1; IIlIIl++) {
                    console.log("去做 " + $.taskShowTitle);
                    await iIlI1I($.apTaskListid, $.taskSourceUrl);
                    await I1I1Ii($.apTaskListid);
                    await $.wait($.timeLimitPeriod * 1000 + 1500, 10);
                    await IiIl1($.apTaskListid);
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                    await IIIl();
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                  }
                }
              }
            }
          } else {
            console.log("查询任务失败," + (I1iiII?.["errMsg"] || I1iiII?.["msg"] || ""));
          }
        }
      } catch (li1il) {
        $.log(li1il);
      } finally {
        IIll1l();
      }
    });
  });
}
async function iIlI1I(li1ii, lI1iI1) {
  return new Promise(async iliiiI => {
    const lIl1Ii = {
      functionId: "apStartTaskTime",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lIIi1I,
      body: {
        taskId: li1ii,
        channel: 4,
        linkId: llIill,
        itemId: lI1iI1
      }
    };
    $.h5st = await iII1I1("76674", lIl1Ii);
    let lIl1Il = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: l1iiII,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(lIl1Il, async (Ii1IlI, Il1I1I, ll1Il1) => {
      try {
        if (Ii1IlI) {
          console.log("" + JSON.stringify(Ii1IlI));
        } else {
          ll1Il1 = JSON.parse(ll1Il1);
          if (!(ll1Il1.code == 0)) {
            !(ll1Il1.code == 402);
          }
        }
      } catch (iIIIli) {
        $.logErr(iIIIli, Il1I1I);
      } finally {
        iliiiI();
      }
    });
  });
}
async function I1I1Ii(lIilII) {
  return new Promise(async I111 => {
    const I1I11l = {
      functionId: "apCheckAndResetTaskTime",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lIIi1I,
      body: {
        taskId: lIilII,
        linkId: llIill
      }
    };
    $.h5st = await iII1I1("76674", I1I11l);
    let I1I11i = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: l1iiII,
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
          if (!(l1lIIi.code == 0)) {
            !(l1lIIi.code == 402);
          }
        }
      } catch (iilIiI) {
        $.logErr(iilIiI, III1ll);
      } finally {
        I111();
      }
    });
  });
}
async function IiIl1(Ili1iI) {
  return new Promise(async ll1IlI => {
    const Ili1l1 = {
      functionId: "apCheckTaskTimeEnd",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lIIi1I,
      body: {
        taskId: Ili1iI,
        linkId: llIill
      }
    };
    $.h5st = await iII1I1("76674", Ili1l1);
    let iilIil = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: l1iiII,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(iilIil, async (illI1i, i1IiII, illI1l) => {
      try {
        if (illI1i) {
          console.log("" + JSON.stringify(illI1i));
        } else {
          illI1l = JSON.parse(illI1l);
          if (illI1l.code == 0) {
            console.log("浏览时间结束");
          } else {
            illI1l.code == 402 ? console.log("浏览时间失败," + (illI1l?.["errMsg"] || "")) : console.log("浏览时间失败," + (illI1l?.["errMsg"] || ""));
          }
        }
      } catch (I1I111) {
        $.logErr(I1I111, i1IiII);
      } finally {
        ll1IlI();
      }
    });
  });
}
async function IIIl() {
  return new Promise(async iIIlIl => {
    const iilIll = {
      functionId: "apDoLimitTimeTask",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lIIi1I,
      body: {
        linkId: llIill
      }
    };
    $.h5st = await iII1I1("ebecc", iilIll);
    let iilIli = {
      url: "https://api.m.jd.com/",
      body: "" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        Cookie: l1iiII,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(iilIli, async (llIiiI, IiIilI, lIiIl1) => {
      try {
        if (llIiiI) {
          console.log("" + JSON.stringify(llIiiI));
        } else {
          lIiIl1 = JSON.parse(lIiIl1);
          if (lIiIl1.code == 0) {
            $.drawLotteryNum++;
            console.log("完成任务,抽奖次数：" + $.drawLotteryNum);
          } else {
            lIiIl1.code == 402 ? console.log("完成任务失败," + (lIiIl1?.["errMsg"] || "")) : console.log("完成任务失败," + (lIiIl1?.["errMsg"] || ""));
          }
        }
      } catch (lIiIlI) {
        $.logErr(lIiIlI, IiIilI);
      } finally {
        iIIlIl();
      }
    });
  });
}
async function IIIi(lIlli1, llIii1, I1IlII) {
  return new Promise(async IiIiil => {
    const IlIl = {
      functionId: "apsDoTask",
      appid: "activities_platform",
      clientVersion: "12.0.1",
      client: "apple",
      t: lIIi1I,
      body: {
        taskType: lIlli1,
        taskId: llIii1,
        channel: 4,
        checkVersion: true,
        cityId: "",
        provinceId: "",
        countyId: "",
        linkId: llIill,
        itemId: I1IlII
      }
    };
    $.h5st = await iII1I1("54ed7", IlIl);
    let IiII1 = {
      url: "https://api.m.jd.com/api?" + $.h5st,
      headers: {
        origin: "https://h5platform.jd.com",
        Referer: "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: l1iiII,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(IiII1, async (iIIlII, IlIi1l, IiIiiI) => {
      try {
        if (iIIlII) {
          console.log("" + JSON.stringify(iIIlII));
        } else {
          IiIiiI = JSON.parse(IiIiiI);
          if (IiIiiI.code == 0) {
            console.log("完成任务,获得抽奖次数：" + IiIiiI?.["data"]?.["finishNeed"]);
            $.drawLotteryNum++;
          } else {
            IiIiiI.code == 402 ? console.log("完成任务失败," + (IiIiiI?.["errMsg"] || "")) : console.log("完成任务失败," + (IiIiiI?.["errMsg"] || ""));
          }
        }
      } catch (lillI) {
        $.logErr(lillI, IlIi1l);
      } finally {
        IiIiil();
      }
    });
  });
}
function l1IIli(Il11l) {
  Il11l = Il11l || 32;
  let l1ilI = "abcdef0123456789",
    IIi1 = l1ilI.length,
    illl1i = "";
  for (i = 0; i < Il11l; i++) {
    illl1i += l1ilI.charAt(Math.floor(Math.random() * IIi1));
  }
  return illl1i;
}
async function iII1I1(illl1l, Il11I) {
  try {
    let li1lli = new iII1Ii({
      appId: illl1l,
      appid: "activities_platform",
      clientVersion: Il11I?.["clientVersion"],
      client: Il11I?.["client"],
      pin: $.UserName,
      ua: $.UA,
      version: "4.1"
    });
    await li1lli.genAlgo();
    body = await li1lli.genUrlParams(Il11I.functionId, Il11I.body);
    return body;
  } catch (iiiIl1) {}
}
async function iiiIIi(I1i1I) {
  return new Promise(async Iil1I => {
    const Iil11 = {
        functionId: "superRedBagList",
        appid: "activities_platform",
        clientVersion: "12.0.1",
        client: "ios",
        body: {
          linkId: llIill,
          pageNum: I1i1I,
          pageSize: 100,
          business: "richTree"
        }
      },
      Ill1iI = await iII1I1("f2b1d", Iil11);
    let i1Ii1l = {
      url: "https://api.m.jd.com/?" + Ill1iI,
      headers: {
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        origin: "https://pro.m.jd.com",
        "User-Agent": $.UA,
        Cookie: l1iiII
      },
      timeout: 30000
    };
    $.get(i1Ii1l, async (IIll, i1Ii1i, iiiIll) => {
      try {
        if (IIll) {
          console.log("" + JSON.stringify(IIll));
        } else {
          iiiIll = JSON.parse(iiiIll);
          if (iiiIll) {
            if (iiiIll.code == 0 && iiiIll.success == true) {
              const iII1l = (iiiIll.data.items || []).filter(ilI1il => ilI1il.prizeType === 4 && ilI1il.state === 0 || ilI1il.state === 2);
              for (let i11Il of iII1l) {
                console.log("摇钱树提现，去提现" + i11Il.amount + "现金");
                await lIi1iI(i11Il.id, i11Il.poolBaseId, i11Il.prizeGroupId, i11Il.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("摇钱树提现失败，当月额度已满");
                  break;
                }
              }
            } else {
              console.log("摇钱树提现查询奖品：异常:" + JSON.stringify(iiiIll));
            }
          }
        }
      } catch (iII1I) {
        $.logErr(iII1I, i1Ii1i);
      } finally {
        Iil1I();
      }
    });
  });
}
async function lIi1iI(i1i1i1, iiiIli, IllIl, IllIi) {
  return new Promise(async iilllI => {
    const i1i1iI = {
        linkId: llIill,
        businessSource: "NONE",
        base: {
          prizeType: 4,
          business: "richTree",
          id: i1i1i1,
          poolBaseId: iiiIli,
          prizeGroupId: IllIl,
          prizeBaseId: IllIi
        }
      },
      iillil = {
        url: "https://api.m.jd.com",
        body: "functionId=apCashWithDraw&body=" + escape(JSON.stringify(i1i1iI)) + "&_t=" + +new Date() + "&appid=activities_platform",
        headers: {
          Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          origin: "https://pro.m.jd.com",
          "User-Agent": $.UA,
          Cookie: l1iiII
        },
        timeout: 30000
      };
    $.post(iillil, async (iillii, ilI1iI, l1I1i) => {
      try {
        if (iillii) {
          console.log("" + JSON.stringify(iillii));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (l1l11(l1I1i)) {
            l1I1i = $.toObj(l1I1i);
            if (l1I1i.code === 0) {
              if (l1I1i.data.status === "310") {
                console.log("提现现金成功！");
              } else {
                console.log("提现现金：失败:" + l1I1i.data.message);
                if (l1I1i.data.message.includes("上限")) {
                  $.txhot = true;
                } else {
                  l1I1i.data.message.includes("已存在状态") && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)), await lIi1iI(i1i1i1, iiiIli, IllIl, IllIi));
                }
              }
            } else {
              console.log("提现现金：异常:" + JSON.stringify(l1I1i));
            }
          }
        }
      } catch (i1i1il) {
        $.logErr(i1i1il, ilI1iI);
      } finally {
        iilllI(l1I1i);
      }
    });
  });
}
function l1IIll(i1i1ii, Il1ill, Il1ili, liIIII) {
  return new Promise(liiI => {
    const I1ii1I = {
        linkId: llIill,
        businessSource: "fission",
        business: "business",
        drawRecordId: i1i1ii,
        poolId: Il1ill,
        prizeGroupId: Il1ili,
        prizeId: liIIII
      },
      Ililli = {
        url: "https://api.m.jd.com",
        body: "functionId=apRecompenseDrawPrize&body=" + escape(JSON.stringify(I1ii1I)) + "&_t=" + +new Date() + "&appid=activities_platform",
        headers: {
          Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          origin: "https://pro.m.jd.com",
          "User-Agent": $.UA,
          Cookie: l1iiII
        },
        timeout: 30000
      };
    $.post(Ililli, async (lii1, iIii1l, iIliIi) => {
      try {
        if (lii1) {
          console.log("" + JSON.stringify(lii1));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          l1l11(iIliIi) && (iIliIi = $.toObj(iIliIi), iIliIi.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + iIliIi.errMsg));
        }
      } catch (II1i1I) {
        $.logErr(II1i1I, iIii1l);
      } finally {
        liiI(iIliIi);
      }
    });
  });
}
function iiiIIl(i11l1l) {
  return i11l1l.then(IIllIl => {
    return [null, IIllIl];
  }).catch(i11l1i => [i11l1i]);
}
function lIIi11(iI11l1, IlIii = {}) {
  let II1i11 = [],
    IlillI = IlIii.connector || "&",
    I111l1 = Object.keys(iI11l1);
  if (IlIii.sort) {
    I111l1 = I111l1.sort();
  }
  for (let IlIil of I111l1) {
    let i1i1li = iI11l1[IlIil];
    if (i1i1li && typeof i1i1li === "object") {
      i1i1li = JSON.stringify(i1i1li);
    }
    if (i1i1li && IlIii.encode) {
      i1i1li = encodeURIComponent(i1i1li);
    }
    II1i11.push(IlIil + "=" + i1i1li);
  }
  return II1i11.join(IlillI);
}
async function illiii() {
  for (var iil1Ii = "", iii11i = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iii11l = 0; iii11l < 16; iii11l++) {
    var l1Ilii = Math.round(Math.random() * (iii11i.length - 1));
    iil1Ii += iii11i.substring(l1Ilii, l1Ilii + 1);
  }
  uuid = Buffer.from(iil1Ii, "utf8").toString("base64");
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
function IIIll1(iIili = "xxxxxxxxxxxxxxxxxxxx") {
  return iIili.replace(/[xy]/g, function (IIil11) {
    var l1IliI = Math.random() * 10 | 0,
      liIIIi = IIil11 == "x" ? l1IliI : l1IliI & 3 | 8;
    jdaid = liIIIi.toString();
    return jdaid;
  });
}
function illiil(Il1iiI) {
  return new Promise(ll111I => {
    const i11IIl = {
      url: "" + Il1iiI,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i11IIl, async (IIl11I, i11IIi, Il1ii1) => {
      try {
        if (!IIl11I) {
          if (Il1ii1) {
            Il1ii1 = JSON.parse(Il1ii1);
          } else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (Il1iil) {
        $.logErr(Il1iil, i11IIi);
        Il1ii1 = null;
      } finally {
        ll111I(Il1ii1);
      }
    });
  });
}
function liI11l(lilI, ll111i) {
  return Math.floor(Math.random() * (ll111i - lilI)) + lilI;
}