/*
摇钱树任务

cron "25 4,16 * * *" script-path=jd_yqs.js, tag=摇钱树任务

等级达到40级为满级，需要停止浇水3天，7天后开启新一轮活动

轮询提现变量：jd_yqs_num //轮询提现页数  一般无需填写

 */
const Env=require('./utils/Env.js');
const $ = new Env('摇钱树任务');
const iliiIli = $.isNode() ? require("./sendNotify") : "",
  iI1lli1l = $.isNode() ? require("./jdCookie.js") : "",
  iIiiII1l = require("./function/h5st41.js");
let lII1Iiii = "_LN1l_4Nv5mTEsWhs3hIMA",
  iilIliil = process.env.jd_yqs_num ? process.env.jd_yqs_num : "1",
  Ii1l11 = Date.now(),
  Ili11ili = [],
  ll1iiiIl = "",
  l1ll1ii;
if ($.isNode()) {
  Object.keys(iI1lli1l).forEach(iilIiii1 => {
    Ili11ili.push(iI1lli1l[iilIiii1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Ili11ili = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Iiiilill($.getdata("CookiesJD") || "[]").map(lI1i1lI1 => lI1i1lI1.cookie)].filter(li1Iili1 => !!li1Iili1);
!(async () => {
  if (!Ili11ili[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let illl11li = 0; illl11li < Ili11ili.length; illl11li++) {
    if (Ili11ili[illl11li]) {
      ll1iiiIl = Ili11ili[illl11li];
      $.UserName = decodeURIComponent(ll1iiiIl.match(/pt_pin=([^; ]+)(?=;?)/) && ll1iiiIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = illl11li + 1;
      $.isLogin = true;
      $.nickName = "";
      l1ll1ii = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await iliiIli.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + lIllIIIl("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await i11I1IIl();
      await l11IIlli();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(iIlIiiI1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iIlIiiI1 + "!", "");
}).finally(() => {
  $.done();
});
async function l11IIlli() {
  $.txhot = false;
  $.nowcontinue = false;
  $.drawLotteryNum = 0;
  await llliIlii();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  if ($.nowcontinue) {
    await llliIlii();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await I1ii1I1i();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    for (let ii1liiI = 0; ii1liiI < $.drawLotteryNum; ii1liiI++) {
      await IiIIl11i();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    console.log("\n当前设置轮询提现页数：" + iilIliil);
    for (let iiIIII = 0; iiIIII < iilIliil; iiIIII++) {
      $.pageNum = iiIIII + 1;
      console.log("\n开始轮询提现" + $.pageNum + "页");
      await Ilil1I1I($.pageNum);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.txhot) break;
    }
  }
}
function IIlil1Il(I1i1l1il) {
  try {
    if (typeof JSON.parse(I1i1l1il) == "object") return true;
  } catch (l1IIi11i) {
    return console.log(l1IIi11i), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function Iiiilill(liiill1) {
  if (typeof liiill1 == "string") {
    try {
      return JSON.parse(liiill1);
    } catch (IlI1iIiI) {
      return console.log(IlI1iIiI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function llliIlii() {
  return new Promise(async iIliliI => {
    const i11IiII = {
      "functionId": "richTreeHome",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": Ii1l11,
      "body": {
        "linkId": lII1Iiii
      }
    };
    $.h5st = await IlIlI1iI("34e92", i11IiII);
    let ii1iili1 = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": ll1iiiIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(ii1iili1, async (ili1i1il, l1IIllI, ill1l1I1) => {
      try {
        if (ili1i1il) console.log("" + JSON.stringify(ili1i1il));else {
          ill1l1I1 = JSON.parse(ill1l1I1);
          if (ill1l1I1.code == 0) {
            $.drawLotteryNum = ill1l1I1?.["data"]?.["drawLotteryNum"];
            let illiilIl = ill1l1I1?.["data"]?.["kettle"]?.["currentCapacity"],
              iI1Ill1I = ill1l1I1?.["data"]?.["richTree"]?.["nowStep"],
              liliiilI = ill1l1I1?.["data"]?.["richTree"]?.["nowExp"],
              Iili1lll = ill1l1I1?.["data"]?.["richTree"]?.["remainingExp"];
            console.log("当前水滴：" + illiilIl + ",当前等级：" + iI1Ill1I + ",当前进度：" + liliiilI + ",还需经验：" + Iili1lll);
            if (ill1l1I1?.["data"]?.["richTree"]?.["nowStep"] >= 1) {
              $.nowcontinue = true;
              let IIIi1iII = ill1l1I1?.["data"]?.["totalReward"] || [];
              $.prizeList = "";
              for (let l1II11li = 0; l1II11li < IIIi1iII.length; l1II11li++) {
                $.amount = IIIi1iII[l1II11li].amount;
                $.prizeType = IIIi1iII[l1II11li].prizeType;
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
                l1II11li != IIIi1iII.length - 1 ? $.prizeList += $.prizeType + "：" + $.amount + "，" : $.prizeList += $.prizeType + "：" + $.amount;
              }
              console.log("当前汇总：" + $.prizeList);
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              illiilIl >= 2000 && iI1Ill1I < 40 && (await lililii(illiilIl, 0), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
            } else console.log("获得新手红包," + ill1l1I1?.["data"]?.["prizeDrawVO"]?.["prizeConfigName"]), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await lililii(illiilIl, 2);
          } else {
            if (ill1l1I1.code == 402) {
              console.log("进入首页失败," + (ill1l1I1?.["errMsg"] || ""));
            } else console.log("进入首页失败," + (ill1l1I1?.["errMsg"] || ""));
          }
        }
      } catch (IIll1I11) {
        $.logErr(IIll1I11, l1IIllI);
      } finally {
        iIliliI();
      }
    });
  });
}
async function lililii(II1IliI1, IIiiIiIi) {
  return new Promise(async I1iIlii1 => {
    const lll1li1l = {
      "functionId": "richTreeWater",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": Ii1l11,
      "body": {
        "waterNum": II1IliI1,
        "type": IIiiIiIi,
        "linkId": lII1Iiii
      }
    };
    $.h5st = await IlIlI1iI("34e92", lll1li1l);
    let IIl1i1l1 = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": ll1iiiIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(IIl1i1l1, async (I1lilII1, iiii1lll, i1IIiiIl) => {
      try {
        if (I1lilII1) console.log("" + JSON.stringify(I1lilII1));else {
          i1IIiiIl = JSON.parse(i1IIiiIl);
          if (i1IIiiIl.code == 0) {
            let lIl1ii1i = i1IIiiIl?.["data"]?.["redPacketNum"];
            console.log("完成浇水,等级：" + i1IIiiIl?.["data"]?.["nowStep"] + "-获得抽奖次数：" + lIl1ii1i);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            for (let IiIl1l11 = 0; IiIl1l11 < lIl1ii1i; IiIl1l11++) {
              await IiIIl11i();
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
          } else i1IIiiIl.code == 402 ? console.log("浇水失败," + (i1IIiiIl?.["errMsg"] || "")) : console.log("浇水失败," + (i1IIiiIl?.["errMsg"] || ""));
        }
      } catch (ilI1i1il) {
        $.logErr(ilI1i1il, iiii1lll);
      } finally {
        I1iIlii1();
      }
    });
  });
}
async function IiIIl11i() {
  return new Promise(async lI11IiII => {
    const il11lliI = {
      "functionId": "richTreeOpen",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": Ii1l11,
      "body": {
        "linkId": lII1Iiii
      }
    };
    $.h5st = await IlIlI1iI("34e92", il11lliI);
    let I1iiiiII = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": ll1iiiIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(I1iiiiII, async (illI1Ill, liIi1I, Il1iIIl1) => {
      try {
        if (illI1Ill) console.log("" + JSON.stringify(illI1Ill));else {
          Il1iIIl1 = JSON.parse(Il1iIIl1);
          if (Il1iIIl1.code == 0) switch (Il1iIIl1?.["data"]?.["prizeType"]) {
            case 1:
              console.log("获得," + Il1iIIl1?.["data"]?.["prizeConfigName"] + "-" + Il1iIIl1?.["data"]?.["createTime"]);
              break;
            case 2:
              console.log("获得红包," + Il1iIIl1?.["data"]?.["prizeConfigName"] + "-" + Il1iIIl1?.["data"]?.["createTime"]);
              break;
            case 4:
              console.log("获得现金," + Il1iIIl1?.["data"]?.["prizeConfigName"] + "-" + Il1iIIl1?.["data"]?.["createTime"]);
              break;
            case null:
              console.log("运气不太好，什么都没有抽到...");
              break;
            default:
              console.log(Il1iIIl1?.["data"]?.["prizeType"]);
              return;
          } else Il1iIIl1.code == 402 ? console.log("抽奖失败," + (Il1iIIl1?.["errMsg"] || "")) : console.log("抽奖失败," + (Il1iIIl1?.["errMsg"] || ""));
        }
      } catch (lii111I1) {
        $.logErr(lii111I1, liIi1I);
      } finally {
        lI11IiII();
      }
    });
  });
}
async function I1ii1I1i() {
  let I1illll = {
    "url": "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22:%22_LN1l_4Nv5mTEsWhs3hIMA%22%7D&t=" + Ii1l11 + "&appid=activities_platform&client=ios&clientVersion=12.0.10",
    "headers": {
      "origin": "https://h5platform.jd.com",
      "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
      "User-Agent": $.UA,
      "Cookie": ll1iiiIl,
      "content-type": "application/x-www-form-urlencoded",
      "accept": "application/json, text/plain, */*"
    },
    "timeout": 20 * 1000
  };
  return new Promise(Il1Ill1I => {
    $.get(I1illll, async (IlIIIii, lI1i1I1i, I1lI1I1I) => {
      try {
        if (IlIIIii) $.log(IlIIIii);else {
          I1lI1I1I = JSON.parse(I1lI1I1I);
          if (I1lI1I1I?.["code"] == 0) {
            let i1ll1II = I1lI1I1I?.["data"] || [];
            for (let lI11i1ll = 0; lI11i1ll < i1ll1II.length; lI11i1ll++) {
              $.taskTitle = i1ll1II[lI11i1ll].taskTitle;
              $.apTaskListid = i1ll1II[lI11i1ll].id;
              $.taskType = i1ll1II[lI11i1ll].taskType;
              $.taskSourceUrl = i1ll1II[lI11i1ll].taskSourceUrl;
              $.taskFinished = i1ll1II[lI11i1ll].taskFinished;
              $.taskDoTimes = i1ll1II[lI11i1ll].taskDoTimes;
              if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                for (let iIl1i1II = 0; iIl1i1II < 1; iIl1i1II++) {
                  console.log("去做 " + $.taskTitle);
                  await lll1ii1($.taskType, $.apTaskListid, $.taskSourceUrl);
                  await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                }
              }
            }
          } else console.log("查询任务失败," + (I1lI1I1I?.["errMsg"] || I1lI1I1I?.["msg"] || ""));
        }
      } catch (l1iII1ll) {
        $.log(l1iII1ll);
      } finally {
        Il1Ill1I();
      }
    });
  });
}
async function lll1ii1(liIllI11, i1lIIIl1, liIiIIi1) {
  return new Promise(async IIlIliIi => {
    const li1Iliil = {
      "functionId": "apsDoTask",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "apple",
      "t": Ii1l11,
      "body": {
        "taskType": liIllI11,
        "taskId": i1lIIIl1,
        "channel": 4,
        "checkVersion": true,
        "cityId": "",
        "provinceId": "",
        "countyId": "",
        "linkId": lII1Iiii,
        "itemId": liIiIIi1
      }
    };
    $.h5st = await IlIlI1iI("54ed7", li1Iliil);
    let IlI1i = {
      "url": "https://api.m.jd.com/api?" + $.h5st,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": ll1iiiIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(IlI1i, async (i1IlI1l1, Iiii11i, i1lllI1) => {
      try {
        if (i1IlI1l1) console.log("" + JSON.stringify(i1IlI1l1));else {
          i1lllI1 = JSON.parse(i1lllI1);
          if (i1lllI1.code == 0) console.log("完成任务,获得抽奖次数：" + i1lllI1?.["data"]?.["finishNeed"]), $.drawLotteryNum++;else {
            if (i1lllI1.code == 402) console.log("完成任务失败," + (i1lllI1?.["errMsg"] || ""));else {
              console.log("完成任务失败," + (i1lllI1?.["errMsg"] || ""));
            }
          }
        }
      } catch (llIiII1) {
        $.logErr(llIiII1, Iiii11i);
      } finally {
        IIlIliIi();
      }
    });
  });
}
function liiiIiii(ll1IlI1) {
  ll1IlI1 = ll1IlI1 || 32;
  let lIIII1II = "abcdef0123456789",
    IIIIllli = lIIII1II.length,
    lllIIll = "";
  for (i = 0; i < ll1IlI1; i++) lllIIll += lIIII1II.charAt(Math.floor(Math.random() * IIIIllli));
  return lllIIll;
}
async function IlIlI1iI(l1Iil1lI, I1Illl1l) {
  try {
    let Illlil1 = new iIiiII1l({
      "appId": l1Iil1lI,
      "appid": "activities_platform",
      "clientVersion": I1Illl1l?.["clientVersion"],
      "client": I1Illl1l?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await Illlil1.genAlgo(), body = await Illlil1.genUrlParams(I1Illl1l.functionId, I1Illl1l.body), body;
  } catch (i1lllilI) {}
}
async function Ilil1I1I(I1Iil1ll) {
  return new Promise(async iIll1 => {
    const I1llII1 = {
        "functionId": "superRedBagList",
        "appid": "activities_platform",
        "clientVersion": "12.0.1",
        "client": "ios",
        "body": {
          "linkId": lII1Iiii,
          "pageNum": I1Iil1ll,
          "pageSize": 100,
          "business": "richTree"
        }
      },
      illI1l1i = await IlIlI1iI("f2b1d", I1llII1);
    let Iii1liI1 = {
      "url": "https://api.m.jd.com/?" + illI1l1i,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": ll1iiiIl
      },
      "timeout": 30 * 1000
    };
    $.get(Iii1liI1, async (li1iii, IillIIil, lIiiiiI) => {
      try {
        if (li1iii) console.log("" + JSON.stringify(li1iii));else {
          lIiiiiI = JSON.parse(lIiiiiI);
          if (lIiiiiI) {
            if (lIiiiiI.code == 0 && lIiiiiI.success == true) {
              const lIIlli1I = (lIiiiiI.data.items || []).filter(iil1III1 => iil1III1.prizeType === 4 && iil1III1.state === 0 || iil1III1.state === 2);
              for (let iiIi11 of lIIlli1I) {
                console.log("摇钱树提现，去提现" + iiIi11.amount + "现金");
                await IIilIII(iiIi11.id, iiIi11.poolBaseId, iiIi11.prizeGroupId, iiIi11.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("摇钱树提现失败，当月额度已满");
                  break;
                }
              }
            } else console.log("摇钱树提现查询奖品：异常:" + JSON.stringify(lIiiiiI));
          }
        }
      } catch (Ii1IIIll) {
        $.logErr(Ii1IIIll, IillIIil);
      } finally {
        iIll1();
      }
    });
  });
}
async function IIilIII(IIiI1IIl, lli1iI1, liIilli, iIliIi11) {
  return new Promise(async II111lii => {
    const IIl1IlII = {
        "linkId": lII1Iiii,
        "businessSource": "NONE",
        "base": {
          "prizeType": 4,
          "business": "richTree",
          "id": IIiI1IIl,
          "poolBaseId": lli1iI1,
          "prizeGroupId": liIilli,
          "prizeBaseId": iIliIi11
        }
      },
      iII1ilIi = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(IIl1IlII)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": ll1iiiIl
        },
        "timeout": 30 * 1000
      };
    $.post(iII1ilIi, async (lli11Iil, liIi11li, iIlliil) => {
      try {
        if (lli11Iil) console.log("" + JSON.stringify(lli11Iil)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (IIlil1Il(iIlliil)) {
            iIlliil = $.toObj(iIlliil);
            if (iIlliil.code === 0) {
              if (iIlliil.data.status === "310") console.log("提现现金成功！");else {
                console.log("提现现金：失败:" + iIlliil.data.message);
                if (iIlliil.data.message.includes("上限")) $.txhot = true;else iIlliil.data.message.includes("已存在状态") && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)), await IIilIII(IIiI1IIl, lli1iI1, liIilli, iIliIi11));
              }
            } else console.log("提现现金：异常:" + JSON.stringify(iIlliil));
          }
        }
      } catch (IIiiI1i) {
        $.logErr(IIiiI1i, liIi11li);
      } finally {
        II111lii(iIlliil);
      }
    });
  });
}
function Il1I1ilI(liIli1Il, lIII1l1, i1ii1i, liIi1I1) {
  return new Promise(iIl1liI => {
    const il1iiiIi = {
        "linkId": lII1Iiii,
        "businessSource": "fission",
        "business": "business",
        "drawRecordId": liIli1Il,
        "poolId": lIII1l1,
        "prizeGroupId": i1ii1i,
        "prizeId": liIi1I1
      },
      lIlIilI = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apRecompenseDrawPrize&body=" + escape(JSON.stringify(il1iiiIi)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": ll1iiiIl
        },
        "timeout": 30 * 1000
      };
    $.post(lIlIilI, async (IlI1i1I, iIlIlIl1, liIIilII) => {
      try {
        if (IlI1i1I) console.log("" + JSON.stringify(IlI1i1I)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (IIlil1Il(liIIilII)) {
            liIIilII = $.toObj(liIIilII);
            if (liIIilII.code == 0) {
              console.log("兑换红包成功");
            } else console.log("兑换红包失败:" + liIIilII.errMsg);
          }
        }
      } catch (IlIliIll) {
        $.logErr(IlIliIll, iIlIlIl1);
      } finally {
        iIl1liI(liIIilII);
      }
    });
  });
}
function l11iI11i(I1il1) {
  return I1il1.then(I111lIii => {
    return [null, I111lIii];
  }).catch(ii1i1I1I => [ii1i1I1I]);
}
function l11lIiII(IIil1IIl, Ii1lil11 = {}) {
  let l1iiIl1i = [],
    lil1ii1 = Ii1lil11.connector || "&",
    IlIi1llI = Object.keys(IIil1IIl);
  if (Ii1lil11.sort) IlIi1llI = IlIi1llI.sort();
  for (let i1Ili11i of IlIi1llI) {
    let illI1ll1 = IIil1IIl[i1Ili11i];
    if (illI1ll1 && typeof illI1ll1 === "object") illI1ll1 = JSON.stringify(illI1ll1);
    if (illI1ll1 && Ii1lil11.encode) illI1ll1 = encodeURIComponent(illI1ll1);
    l1iiIl1i.push(i1Ili11i + "=" + illI1ll1);
  }
  return l1iiIl1i.join(lil1ii1);
}
async function i11I1IIl() {
  for (var ilI1l1il = "", I11Ii111 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", il11i1i1 = 0; il11i1i1 < 16; il11i1i1++) {
    var lilIill1 = Math.round(Math.random() * (I11Ii111.length - 1));
    ilI1l1il += I11Ii111.substring(lilIill1, lilIill1 + 1);
  }
  return uuid = Buffer.from(ilI1l1il, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
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
function lIllIIIl(i1I1IiIi = "xxxxxxxxxxxxxxxxxxxx") {
  return i1I1IiIi.replace(/[xy]/g, function (iliIilII) {
    var iiIiIill = Math.random() * 10 | 0,
      iI1IiIII = iliIilII == "x" ? iiIiIill : iiIiIill & 3 | 8;
    return jdaid = iI1IiIII.toString(), jdaid;
  });
}
function iIiI1IiI(lilIi111) {
  return new Promise(llI111 => {
    const IiIiIil1 = {
      "url": "" + lilIi111,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IiIiIil1, async (Ilii111, iiIi1I1l, iIilIliI) => {
      try {
        if (Ilii111) {} else {
          if (iIilIliI) iIilIliI = JSON.parse(iIilIliI);else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (l1lIIIl) {
        $.logErr(l1lIIIl, iiIi1I1l);
        iIilIliI = null;
      } finally {
        llI111(iIilIliI);
      }
    });
  });
}
function iIIlii1l(IlIIllll, i1iIIiIi) {
  return Math.floor(Math.random() * (i1iIIiIi - IlIIllll)) + IlIIllll;
}