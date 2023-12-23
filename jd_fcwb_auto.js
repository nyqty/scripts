/*
欢乐淘金（发财挖宝）
入口：APP —— 玩一玩 —— 欢乐淘金

地址：
https://bnzf.jd.com/?activityId=Bn1VWXtvgTv5ewPoMR-X8A  // app默认入口

请先运行助力任务脚本 jd_fcwb_help.js 

全部通关需下2单，推荐助力满后领取奖励

环境变量：
JD_FCWB_ID         指定活动ID  不指定默认 APP入口  格式：Bn1VWXtvgTv5ewPoMR-X8A 
JD_FCWB_ROUND      指定剩余血量  非必须，不填默认剩余 1 退出
JD_FCWB_TXNUM        轮询提现页数  默认查询第一页，一般无需填写
JD_FCWB_EXCHANGE   达到剩余血量是否领取奖励，默认不启用（领取奖励后相当于结束当天活动，无法继续挖宝，请自行对应设置）
JD_FCWB_SWISH      是否延长提现时间，默认不延长（true/false）

代理变量：
本地IP理论正常助力，也无需开启代理
JD_FCWB_PROXY_OPEN    代理启用变量，默认不开启（true/false）
JD_FCWB_PROXY_TUNNRL  代理池代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_FCWB_PROXY_URL     API代理地址变量，默认不开启，仅支持 数据格式:txt;提取数量:每次一个，格式为：http://api.xxx.xxx
JD_FCWB_NO_PROXY      禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#欢乐淘金（发财挖宝）任务
1 1 1 1 * jd_fcwb_auto.js, tag=欢乐淘金（发财挖宝）任务, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('欢乐淘金（发财挖宝）任务')
const iIIli1 = require("./jdCookie"),
  Ii1l1i = require("./function/sendJDNotify"),
  l1lIl = require("./function/jdCommon"),
  Ii1l1l = require("./function/krgetH5st"),
  i1Iiil = process.env.JD_FCWB_ROUND || "1",
  i1Iiii = process.env.JD_FCWB_ID || "Bn1VWXtvgTv5ewPoMR-X8A",
  l1lIi = process.env.JD_FCWB_TXNUM ? process.env.JD_FCWB_TXNUM : "1",
  l1lili = process.env.JD_FCWB_EXCHANGE === "true",
  IIlI1l = process.env.JD_FCWB_SWISH === "true",
  lI1I11 = process.env.JD_FCWB_TXMAX_RETRY || "3",
  IilIl = process.env.JD_FCWB_PROXY_OPEN === "true",
  IilIi = process.env.JD_FCWB_PROXY_TUNNRL,
  Ili1Il = process.env.JD_FCWB_PROXY_URL,
  i1liI = process.env.JD_FCWB_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com",
  iilIIi = process.env.JD_FCWB_Notify === "true",
  I1iII = {
    "cNAsHasSnzWTAtWhIQR4dA": {
      1: 6,
      2: 15,
      3: 16
    },
    "Bn1VWXtvgTv5ewPoMR-X8A": {
      1: 5,
      2: 15,
      3: 17
    }
  };
let IIlI1i = 1000;
IilIl && (IilIi || Ili1Il) && (IIlI1i = 100);
let iiiI1i = "",
  iiiI1l = 0,
  Ili1Ii = false;
if (IilIl) {
  Ili1Ii = true;
  try {
    require("global-agent/bootstrap");
    if (Ili1Il) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + Ili1Il + "\n");
      let iiiI1I = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = iiiI1I.exec(Ili1Il)[0] + "," + i1liI;
    } else IilIi ? (global.GLOBAL_AGENT.HTTP_PROXY = IilIi, global.GLOBAL_AGENT.NO_PROXY = "" + i1liI, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_FCWB_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_FCWB_PROXY_URL='http://api.xxx.xxx'\n"));
  } catch (lilI11) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    Ili1Ii = false;
  }
} else console.log("\n⚠ 检测当前模式未开启代理："), console.log("⚠ 开启代理变量：export JD_FCWB_PROXY_OPEN='true' \n");
let Ii1l1I = "";
const iilII1 = Object.keys(iIIli1).map(Ili1II => iIIli1[Ili1II]).filter(ili1i => ili1i);
!iilII1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("❖ 当前设置活动ID为：" + i1Iiii);
  console.log("❖ 达到剩余血量是否领取奖励:[" + (l1lili == true ? "领取" : "不领取") + "],是否延长提现:[" + (IIlI1l == true ? "延长" : "不延长") + "]");
  Ii1l1i.config({
    "title": $.name
  });
  for (let l1Iii = 0; l1Iii < iilII1.length; l1Iii++) {
    $.index = l1Iii + 1;
    Ii1l1I = iilII1[l1Iii];
    l1lIl.setCookie(Ii1l1I);
    $.UserName = decodeURIComponent(l1lIl.getCookieValue(Ii1l1I, "pt_pin"));
    $.UA = l1lIl.genUA($.UserName);
    $.message = Ii1l1i.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    IilIl && Ili1Ii && Ili1Il && (iiiI1l % 5 === 0 && (await I1iIi(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + iiiI1i), console.log("📶 " + iiiI1i), iiiI1l++);
    await iiiI11();
    l1lIl.unsetCookie();
    await $.wait(parseInt(IIlI1i * 1 + 100, 10));
  }
  iilIIi && Ii1l1i.getMessage() && (Ii1l1i.updateContent(Ii1l1i.content + "\n"), await Ii1l1i.push());
})().catch(iIIliI => $.logErr(iIIliI)).finally(() => $.done());
async function iiiI11() {
  $.hotproxy = false;
  $.skipRun = false;
  try {
    const I1IliI = await l1lIl.getLoginStatus(Ii1l1I);
    if (!I1IliI && typeof I1IliI === "boolean") {
      console.log("账号无效");
      $.message.fix("账号无效");
      return;
    }
    await l1lilI();
    if ($.skipRun) return;
    await i1Iil1();
    if ($.skipRun) return;
    await liI1Ii();
    if ($.skipRun) return;
    await i1lil();
  } catch (l1I1II) {
    console.log(l1I1II.message);
  }
}
async function l1lilI() {
  $.happyDigHome = "";
  $.round = "";
  await IilII("happyDigHome");
  if (!$.happyDigHome?.["markedPin"]) {
    console.log("🙅‍♂ 未能正确获取到主页信息，退出执行！");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(IIlI1i * 1 + 100, 10));
  $.happyDigHelpList = "";
  await IilII("happyDigHelpList");
  await $.wait(parseInt(IIlI1i * 1 + 100, 10));
  $.myinviteCode = $.happyDigHome?.["inviteCode"];
  $.blood = $.happyDigHome?.["blood"];
  $.markedPin = $.happyDigHome?.["markedPin"];
  const IiIiI1 = $.happyDigHelpList?.["personNum"] || 0;
  $.roundList = $.happyDigHome?.["roundList"] || [];
  const iIIlii = new Date().valueOf(),
    llIII1 = $.happyDigHome?.["leftTime"] + iIIlii,
    IiIiI = $.time("yyyy-MM-dd HH:mm:ss", llIII1),
    iill1I = IiIiI1 <= 0 ? "没有助力人数,建议运行助力脚本后执行此脚本" : IiIiI1 > 0 && IiIiI1 < 117 ? "助力人数未满,可继续进行助力" : IiIiI1 >= 117 ? "助力已满,直接执行" : "未知";
  console.log("已开启活动，结束时间 " + IiIiI + "\n已有助力人数 " + IiIiI1 + " 🚶 (" + iill1I + ")\n当前血量 " + $.blood + " 🩸 (剩余 " + i1Iiil + " 🩸 退出执行)");
  if ($.blood <= i1Iiil) {
    await l1lil1();
    console.log("");
    console.log("🙅‍♂ 当前血量[" + i1Iiil + "]已达到设定值，退出执行！");
    $.skipRun = true;
    return;
  }
}
async function i1Iil1() {
  $.apTaskList = "";
  await IilII("apTaskList");
  if (!$.apTaskList) {
    console.log("🙅‍♂ 未能正确获取到任务参数");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(IIlI1i * 1 + 100, 10));
  console.log("");
  for (let IIIll1 = 0; IIIll1 < $.apTaskList.length; IIIll1++) {
    const illiil = $.apTaskList[IIIll1];
    $.taskId = illiil?.["id"];
    $.taskType = illiil?.["taskType"];
    $.taskSourceUrl = illiil?.["taskSourceUrl"];
    const liI11l = illiil?.["taskFinished"],
      l1l1i = illiil?.["taskShowTitle"],
      I1I1II = illiil?.["timeLimitPeriod"];
    if (liI11l || I1I1II !== null) continue;
    if (!$.taskType.includes("BROWSE_")) continue;
    console.log("去做 \"" + l1l1i + "\" 任务");
    if ($.taskSourceUrl) await IilII("apDoTask"), await $.wait(parseInt(Math.random() * 1500 + 1500, 10));else {
      $.apTaskDetail = "";
      await IilII("apTaskDetail");
      await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
      const Ili11I = $.apTaskDetail?.["taskItemList"] || [];
      for (let i11li = 0; i11li < Ili11I.length; i11li++) {
        $.taskSourceUrl = Ili11I[i11li]?.["itemId"];
        await IilII("apDoTask");
        await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
      }
    }
  }
}
async function liI1Ii() {
  $.digStop = false;
  $.lastPrize = false;
  $.happyDigHome = "";
  await IilII("happyDigHome");
  if (!$.happyDigHome?.["markedPin"]) {
    console.log("🙅‍♂ 未能正确获取到主页信息，退出执行！");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(IIlI1i * 1 + 100, 10));
  $.blood = $.happyDigHome?.["blood"];
  $.roundList = $.happyDigHome?.["roundList"] || [];
  const iil11i = $.happyDigHome?.["curRound"];
  if ($.blood <= i1Iiil) return;
  const Ill1II = $.roundList[iil11i - 1] || {};
  $.round = Ill1II?.["round"];
  const llIili = Ill1II?.["state"],
    Illii = $.round === 1 ? "入门" : $.round === 2 ? "挑战" : $.round === 3 ? "终极" : "未知";
  if (llIili === 1) iil11i === 3 && console.log("今日已通关，明天再参与吧~");else {
    console.log("\n开始进行 \"" + Illii + "\" 难度关卡，此关共有 " + I1iII[i1Iiii][$.round] + " 💣️，当前剩余 " + $.blood + " 🩸\n");
    const iiil1I = Ill1II?.["chunks"] || [];
    $.digBombNums = 0;
    for (let llII11 = 0; llII11 < iiil1I.length; llII11++) {
      const lIiI1 = iiil1I[llII11],
        IiIi1i = lIiI1?.["state"];
      if (IiIi1i === 1) {
        const IiIi1l = lIiI1?.["chunk"]?.["type"];
        if (IiIi1l === 2) $.digBombNums++;
        continue;
      }
      $.rowIdx = lIiI1?.["rowIdx"];
      $.colIdx = lIiI1?.["colIdx"];
      await IilII("happyDigDo");
      await $.wait(parseInt(IIlI1i * 1 + 100, 10));
      const llII1l = iiil1I.length - llII11 - 1,
        iil11l = I1iII[i1Iiii][$.round] - $.digBombNums;
      if ($.digStop) {
        console.log("\n🙅‍♂ 号黑了，溜了溜了~");
        $.skipRun = true;
        return;
      } else {
        if ($.lastPrize || llII1l === iil11l) {
          break;
        } else {
          if ($.blood <= i1Iiil && $.digBombNums < I1iII[i1Iiii][$.round]) {
            console.log("\n🙅‍♂ 没血了，溜了溜了~");
            if (l1lili) {
              $.blood > 0 && (await IilII("happyDigExchange"));
            }
            await l1lil1();
            return;
          }
        }
      }
    }
  }
  $.lastPrize && iil11i < 3 && $.blood > 0 && (await liI1Ii());
}
async function l1lil1() {
  $.happyDigHome = "";
  await IilII("happyDigHome");
  if (!$.happyDigHome?.["markedPin"]) {
    console.log("🙅‍♂ 未能正确获取到主页信息，退出执行！");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(IIlI1i * 1 + 100, 10));
  $.blood = $.happyDigHome?.["blood"];
  $.roundList = $.happyDigHome?.["roundList"] || [];
  let iii1I = "";
  for (let I1lI1l = 0; I1lI1l < $.roundList.length; I1lI1l++) {
    const i11ii = $.roundList[I1lI1l],
      lIiIi = i11ii.round,
      Il1i = lIiIi === 1 ? "入门" : lIiIi === 2 ? "挑战" : lIiIi === 3 ? "终极" : "未知",
      lIiIl = i11ii.redAmount,
      iiil1l = i11ii.cashAmount;
    if (lIiIl || iiil1l) {
      switch (lIiIi) {
        case 1:
        case 2:
        case 3:
          iii1I += "\"" + Il1i + "\" 难度关卡累计获得：" + lIiIl + "元无门槛红包🧧，" + iiil1l + "元微信现金 💰\n";
          break;
        default:
          break;
      }
    }
  }
  iii1I && console.log("\n📢 收入汇总\n" + iii1I.trim());
}
async function i1lil() {
  $.txhot = false;
  console.log("\n当前设置轮询提现页数：" + l1lIi);
  for (let iIl1l = 0; iIl1l < l1lIi; iIl1l++) {
    $.pageNum = iIl1l + 1;
    console.log("\n开始轮询提现" + $.pageNum + "页");
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    await i1lii($.pageNum);
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    if ($.txhot) break;
  }
}
async function I1iIl(iIl1i, i11i1) {
  try {
    switch (iIl1i) {
      case "happyDigHome":
        if (i11i1?.["code"] === 0 && i11i1?.["success"] === true) $.hotproxy = false, $.happyDigHome = i11i1.data;else {
          if (i11i1.data?.["bizMsg"]) console.log("> " + i11i1.code + "-" + i11i1.data?.["bizMsg"] + "}");else {
            if (i11i1.errMsg) $.skipRun = true, console.log("> " + i11i1.code + "-" + i11i1.errMsg);else i11i1.msg ? console.log("> " + i11i1.code + "-" + i11i1.msg) : console.log("❓" + iIl1i + " " + JSON.stringify(i11i1));
          }
        }
        break;
      case "happyDigHelpList":
        if (i11i1?.["code"] === 0 && i11i1?.["success"] === true) $.hotproxy = false, $.happyDigHelpList = i11i1.data;else {
          if (i11i1.data?.["bizMsg"]) console.log("> " + i11i1.code + "-" + i11i1.data?.["bizMsg"]);else {
            if (i11i1.errMsg) $.skipRun = true, console.log("> " + i11i1.code + "-" + i11i1.errMsg);else i11i1.msg ? console.log("> " + i11i1.code + "-" + i11i1.msg) : console.log("❓" + iIl1i + " " + JSON.stringify(i11i1));
          }
        }
        break;
      case "apTaskList":
        if (i11i1?.["code"] === 0 && i11i1?.["success"] === true) $.hotproxy = false, $.apTaskList = i11i1.data || [];else {
          if (i11i1.data?.["bizMsg"]) console.log("> " + i11i1.code + "-" + i11i1.data?.["bizMsg"] + "}");else {
            if (i11i1.errMsg) $.skipRun = true, console.log("> " + i11i1.code + "-" + i11i1.errMsg);else i11i1.msg ? console.log("> " + i11i1.code + "-" + i11i1.msg) : console.log("❓" + iIl1i + " " + JSON.stringify(i11i1));
          }
        }
        break;
      case "apTaskDetail":
        if (i11i1?.["code"] === 0 && i11i1?.["success"] === true) {
          $.hotproxy = false;
          $.apTaskDetail = i11i1.data;
        } else {
          if (i11i1.data?.["bizMsg"]) console.log("> " + i11i1.code + "-" + i11i1.data?.["bizMsg"] + "}");else {
            if (i11i1.errMsg) $.skipRun = true, console.log("> " + i11i1.code + "-" + i11i1.errMsg);else i11i1.msg ? console.log("> " + i11i1.code + "-" + i11i1.msg) : console.log("❓" + iIl1i + " " + JSON.stringify(i11i1));
          }
        }
        break;
      case "apDoTask":
        if (i11i1?.["code"] === 0 && i11i1?.["success"] === true) $.hotproxy = false, $.blood++, console.log(" >> 任务完成");else {
          if (i11i1.data?.["bizMsg"]) console.log(" >> " + i11i1.code + "-" + i11i1.data?.["bizMsg"] + "}");else {
            if (i11i1.errMsg) $.skipRun = true, console.log(" >> " + i11i1.code + "-" + i11i1.errMsg);else {
              if (i11i1.msg) {
                console.log(" >> " + i11i1.code + "-" + i11i1.msg);
              } else console.log("❓" + iIl1i + " " + JSON.stringify(i11i1));
            }
          }
        }
        break;
      case "happyDigExchange":
        if (i11i1?.["code"] === 0 && i11i1?.["success"] === true) $.hotproxy = false, console.log("\n📢 结束当前关卡, 获得" + i11i1.data?.["wxValue"] + "现金, " + i11i1.data?.["redValue"] + "红包");else {
          if (i11i1.data?.["bizMsg"]) console.log("> " + i11i1.code + "-" + i11i1.data?.["bizMsg"]);else {
            if (i11i1.errMsg) $.skipRun = true, console.log("> " + i11i1.code + "-" + i11i1.errMsg);else i11i1.msg ? console.log("> " + i11i1.code + "-" + i11i1.msg) : console.log("❓" + iIl1i + " " + JSON.stringify(i11i1));
          }
        }
        break;
      case "happyDigDo":
        if (i11i1?.["code"] === 0 && i11i1?.["success"] === true) {
          $.hotproxy = false;
          const illii1 = i11i1.data?.["chunk"]?.["type"],
            Iii1i1 = i11i1.data?.["chunk"]?.["value"],
            IIIlll = i11i1.data?.["lastPrize"];
          switch (illii1) {
            case 1:
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 🎟️ " + Iii1i1 + "元优惠券 🗑️"), $.digStop = true;
              break;
            case 2:
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 🧧 " + Iii1i1 + "元无门槛红包");
              break;
            case 3:
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 💰 " + Iii1i1 + "元微信现金");
              break;
            case 4:
              $.blood--, $.digBombNums++, console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 💣️ Bomb💥");
              break;
            default:
              {
                console.log("❌ 奖品 " + illii1 + " 状态未知 ❔️");
                break;
              }
          }
          IIIlll && ($.lastPrize = true, $.round++, console.log("\n📢 当前难度关卡已通关，累计获得：" + i11i1.data?.["redAmount"] + "🧧，" + i11i1.data?.["cashAmount"] + "💰"));
        } else {
          if (i11i1.data?.["bizMsg"]) console.log("挖宝失败 " + i11i1.code + "-" + i11i1.data?.["bizMsg"] + "}");else {
            if (i11i1.errMsg) $.skipRun = true, console.log("挖宝失败 " + i11i1.code + "-" + i11i1.errMsg);else i11i1.msg ? console.log("挖宝失败 " + i11i1.code + "-" + i11i1.msg) : console.log("❓" + iIl1i + " " + JSON.stringify(i11i1));
          }
        }
        break;
    }
  } catch (Il1iII) {
    console.log("❌ 未能正确处理 " + iIl1i + " 请求响应 " + (Il1iII.message || Il1iII));
  }
}
async function IilII(lIi1lI) {
  if ($.skipRun) return;
  let iIIIl = "",
    IIiiii = "",
    liIIll = "GET",
    l1IlIi = "",
    l1IlIl = {};
  switch (lIi1lI) {
    case "happyDigHome":
      l1IlIl = {
        "appId": "ce6c2",
        "functionId": "happyDigHome",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
          "linkId": i1Iiii,
          "round": $.round
        },
        "version": "4.2",
        "ua": $.UA,
        "t": true
      }, l1IlIi = await Ii1l1l.getH5st(l1IlIl), iIIIl = "https://api.m.jd.com/api?" + l1IlIi.params;
      break;
    case "happyDigHelpList":
      l1IlIl = {
        "appId": "02f8d",
        "functionId": "happyDigHelpList",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
          "pageNum": 1,
          "pageSize": 50,
          "linkId": i1Iiii
        },
        "version": "4.2",
        "ua": $.UA,
        "t": true
      }, l1IlIi = await Ii1l1l.getH5st(l1IlIl), iIIIl = "https://api.m.jd.com/api?" + l1IlIi.params;
      break;
    case "apTaskList":
      l1IlIl = {
        "appId": "8dd95",
        "functionId": "apTaskList",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
          "linkId": i1Iiii
        },
        "version": "4.2",
        "ua": $.UA,
        "t": true
      }, l1IlIi = await Ii1l1l.getH5st(l1IlIl), iIIIl = "https://api.m.jd.com/api?" + l1IlIi.params;
      break;
    case "apDoTask":
      l1IlIl = {
        "appId": "cd949",
        "functionId": "apDoTask",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
          "taskType": $.taskType,
          "taskId": $.taskId,
          "channel": 4,
          "checkVersion": false,
          "taskInsert": false,
          "linkId": i1Iiii,
          "itemId": $.taskSourceUrl
        },
        "version": "4.2",
        "ua": $.UA,
        "t": true
      }, l1IlIi = await Ii1l1l.getH5st(l1IlIl), iIIIl = "https://api.m.jd.com/api?" + l1IlIi.params;
      break;
    case "apTaskDetail":
      l1IlIl = {
        "appId": "cd949",
        "functionId": "apTaskDetail",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
          "linkId": i1Iiii,
          "taskType": $.taskType,
          "taskId": $.taskId,
          "channel": 4,
          "cityId": "133",
          "provinceId": "4",
          "countyId": "58530"
        },
        "version": "4.2",
        "ua": $.UA,
        "t": true
      }, l1IlIi = await Ii1l1l.getH5st(l1IlIl), iIIIl = "https://api.m.jd.com/api?" + l1IlIi.params;
      break;
    case "happyDigDo":
      l1IlIl = {
        "appId": "f7674",
        "functionId": "happyDigDo",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
          "round": $.round,
          "rowIdx": $.rowIdx,
          "colIdx": $.colIdx,
          "linkId": i1Iiii
        },
        "version": "4.2",
        "ua": $.UA,
        "t": true
      }, l1IlIi = await Ii1l1l.getH5st(l1IlIl), iIIIl = "https://api.m.jd.com/api?" + l1IlIi.params;
      break;
    case "happyDigExchange":
      l1IlIl = {
        "appId": "f7674",
        "functionId": "happyDigExchange",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
          "round": $.round,
          "linkId": i1Iiii
        },
        "version": "4.2",
        "ua": $.UA,
        "t": true
      }, l1IlIi = await Ii1l1l.getH5st(l1IlIl), iIIIl = "https://api.m.jd.com/api?" + l1IlIi.params;
      break;
    default:
      console.log("❌ 未知请求 " + lIi1lI);
      return;
  }
  const liIIli = {
    "url": iIIIl,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": Ii1l1I,
      "Host": "api.m.jd.com",
      "Referer": "https://bnzf.jd.com/index?activityId=" + i1Iiii + "&channel=wyw&utm_campaign=&utm_source=&utm_term=&utm_medium=&sid=&un_area=4_133_58530_0",
      "Origin": "https://bnzf.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    "body": IIiiii,
    "timeout": 30000
  };
  if (liIIll === "GET") {
    delete liIIli.body;
    delete liIIli.headers["Content-Type"];
  }
  const illiiI = 1;
  let liIl = 0,
    llli11 = null,
    Ili11l = false;
  while (liIl < illiiI) {
    liIl > 0 && (await $.wait(1000));
    const {
      err: ilIlil,
      res: Ii1IiI,
      data: IIll11
    } = await ili1l(liIIli, liIIll);
    if (ilIlil) {
      if (typeof ilIlil === "string" && ilIlil.includes("Timeout awaiting 'request'")) llli11 = lIi1lI + " 请求超时，请检查网络重试";else {
        const I1IIl1 = Ii1IiI?.["statusCode"];
        if (I1IIl1) {
          if ([403, 493].includes(I1IIl1)) llli11 = lIi1lI + " 请求失败，IP被限制（Response code " + I1IIl1 + "）", $.hotproxy = true, Ili11l = true;else [400, 404].includes(I1IIl1) ? ($.hotproxy = true, llli11 = lIi1lI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1IIl1 + "）") : ($.hotproxy = true, llli11 = lIi1lI + " 请求失败（Response code " + I1IIl1 + "）");
        } else $.hotproxy = true, llli11 = lIi1lI + " 请求失败 => " + (ilIlil.message || ilIlil);
      }
      liIl++;
    } else {
      const iIIIil = l1lIl.getResponseCookie(Ii1IiI),
        Ii1Ii1 = false;
      if (Ii1Ii1) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + lIi1lI + " 响应Body => " + (IIll11 || "无") + "\n");
        console.log("🔧 " + lIi1lI + " 响应Cookie => " + (iIIIil || "无") + "\n");
        console.log("🔧 " + lIi1lI + " 请求参数");
        console.log(liIIli);
        console.log("\n---------------------------------------------------\n");
      }
      try {
        const iIIIii = JSON.parse(IIll11);
        I1iIl(lIi1lI, iIIIii);
        break;
      } catch (li11ii) {
        llli11 = "❌ " + lIi1lI + " 接口响应数据解析失败: " + li11ii.message;
        console.log("🚫 " + lIi1lI + " => " + String(IIll11 || "无响应数据"));
        liIl++;
      }
      Ili11l = false;
    }
    if (IilIl && Ili1Ii) {
      if (Ili1Il) {
        if ($.hotproxy) {
          await I1iIi();
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + iiiI1i;
          iiiI1l = 0;
          $.hotproxy = false;
          console.log("📶 " + iiiI1i);
        }
        iiiI1l++;
      }
    }
  }
  if (liIl >= illiiI) {
    console.log(llli11);
    if (Ili11l) {
      $.outFlag = true;
      $.message && $.message.fix(llli11);
    }
  }
}
async function ili1l(ilIll1, I1IIil = "POST") {
  if (I1IIil === "POST") {
    return new Promise(async IIll1i => {
      $.post(ilIll1, (lI1iII, IIll1l, l1I1lI) => {
        IIll1i({
          "err": lI1iII,
          "res": IIll1l,
          "data": l1I1lI
        });
      });
    });
  } else {
    if (I1IIil === "GET") return new Promise(async liliIl => {
      $.get(ilIll1, (I1iiI1, lIiIi1, li11l1) => {
        liliIl({
          "err": I1iiI1,
          "res": lIiIi1,
          "data": li11l1
        });
      });
    });else {
      const I1IIiI = "不支持的请求方法";
      return {
        "err": I1IIiI,
        "res": null,
        "data": null
      };
    }
  }
}
async function i1lii(ilIli1) {
  return new Promise(async li1iI => {
    const ll1lI1 = {
        "appId": "f2b1d",
        "functionId": "superRedBagList",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
          "linkId": i1Iiii,
          "pageNum": ilIli1,
          "pageSize": 100,
          "associateLinkId": "",
          "business": "happyDigger"
        },
        "version": "4.2",
        "ua": $.UA,
        "t": true
      },
      II1ll = await Ii1l1l.getH5st(ll1lI1);
    let liii11 = {
      "url": "https://api.m.jd.com/?" + II1ll.params,
      "headers": {
        "Referer": "https://bnzf.jd.com/index?activityId=" + i1Iiii + "&channel=wyw&utm_campaign=&utm_source=&utm_term=&utm_medium=&sid=&un_area=4_133_58530_0",
        "Origin": "https://bnzf.jd.com",
        "User-Agent": $.UA,
        "Cookie": Ii1l1I
      },
      "timeout": 30 * 1000
    };
    $.get(liii11, async (Il1I11, lIl1II, Ii1Ili) => {
      try {
        if (Il1I11) console.log("" + JSON.stringify(Il1I11));else {
          Ii1Ili = JSON.parse(Ii1Ili);
          if (Ii1Ili) {
            if (Ii1Ili.code === 0 && Ii1Ili.success === true) {
              const IIiI11 = (Ii1Ili.data.items || []).filter(Ii1Ill => Ii1Ill.prizeType === 4 && Ii1Ill.state === 0 || Ii1Ill.state === 2);
              for (let ll1Iii of IIiI11) {
                console.log("欢乐淘金提现，去提现" + ll1Iii.amount + "现金");
                await iilIII(ll1Iii.id, ll1Iii.poolBaseId, ll1Iii.prizeGroupId, ll1Iii.prizeBaseId, 0);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("欢乐淘金提现失败，" + $.apCashWithDrawmessage);
                  break;
                }
              }
            } else console.log("欢乐淘金提现查询奖品：异常:" + JSON.stringify(Ii1Ili));
          }
        }
      } catch (li1lI) {
        $.logErr(li1lI, lIl1II);
      } finally {
        li1iI();
      }
    });
  });
}
async function iilIII(IIlIII, i1Iil, lIi11i, i1Iii, IIiI1I) {
  return new Promise(async I1IIli => {
    const lIilI1 = {
        "appId": "73bca",
        "functionId": "apCashWithDraw",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
          "linkId": i1Iiii,
          "businessSource": "NONE",
          "base": {
            "prizeType": 4,
            "business": "happyDigger",
            "id": IIlIII,
            "poolBaseId": i1Iil,
            "prizeGroupId": lIi11i,
            "prizeBaseId": i1Iii
          }
        },
        "version": "4.2",
        "ua": $.UA,
        "t": true
      },
      Il1I1l = await Ii1l1l.getH5st(lIilI1),
      Ii1Il1 = {
        "url": "https://api.m.jd.com",
        "body": "" + Il1I1l.params,
        "headers": {
          "Referer": "https://bnzf.jd.com/index?activityId=" + i1Iiii + "&channel=wyw&utm_campaign=&utm_source=&utm_term=&utm_medium=&sid=&un_area=4_133_58530_0",
          "Origin": "https://bnzf.jd.com",
          "User-Agent": $.UA,
          "Cookie": Ii1l1I
        },
        "timeout": 30 * 1000
      };
    $.post(Ii1Il1, async (iilIiI, III1li, Ili1iI) => {
      try {
        if (iilIiI) console.log("" + JSON.stringify(iilIiI)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (liI1Il(Ili1iI)) {
            Ili1iI = $.toObj(Ili1iI);
            if (Ili1iI?.["code"] === 0) {
              if (Ili1iI?.["data"]?.["status"] === "310") console.log("提现[" + Ili1iI?.["data"]?.["record"]?.["amount"] + "]现金成功！");else {
                $.apCashWithDrawmessage = Ili1iI?.["data"]?.["message"];
                console.log("提现现金失败:" + $.apCashWithDrawmessage);
                if ($.apCashWithDrawmessage.includes("上限") || $.apCashWithDrawmessage.includes("其它pin的订单")) !IIlI1l && ($.txhot = true);else {
                  if ($.apCashWithDrawmessage.includes("已存在状态")) IIiI1I < lI1I11 && (await $.wait(parseInt(IIlI1i * 1 + 30000, 10)), IIiI1I++, await iilIII(IIlIII, i1Iil, lIi11i, i1Iii, IIiI1I));else ($.apCashWithDrawmessage.includes("未绑定微信") || $.apCashWithDrawmessage.includes("绑定手机号")) && !IIlI1l && ($.txhot = true);
                }
              }
            } else console.log("提现现金异常:" + JSON.stringify(Ili1iI));
          }
        }
      } catch (lIlllI) {
        $.logErr(lIlllI, III1li);
      } finally {
        I1IIli(Ili1iI);
      }
    });
  });
}
function liI1Il(ll1IlI) {
  try {
    if (typeof JSON.parse(ll1IlI) == "object") {
      return true;
    }
  } catch (I11I) {
    return console.log(I11I), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function I1iIi() {
  return new Promise(async iilIii => {
    $.get({
      "url": Ili1Il,
      "timeout": {
        "request": 5000
      }
    }, (iII111, Ili1ii) => {
      if (Ili1ii) try {
        let lIiIil = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
          llIiii = lIiIil.exec(Ili1ii.body);
        iiiI1i = llIiii[0];
        global.GLOBAL_AGENT.HTTP_PROXY = "http://" + iiiI1i;
      } catch (IlII) {} finally {
        iilIii();
      }
    });
  });
}