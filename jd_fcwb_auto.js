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
const IllliI = require("./jdCookie"),
  IliIll = require("./function/sendJDNotify"),
  iIiili = require("./function/jdCommon"),
  lilill = require("./function/krgetH5st"),
  IilI1 = process.env.JD_FCWB_ROUND || "1",
  l1lI1 = process.env.JD_FCWB_ID || "Bn1VWXtvgTv5ewPoMR-X8A",
  Ili1I1 = process.env.JD_FCWB_TXNUM ? process.env.JD_FCWB_TXNUM : "1",
  lI1I1i = process.env.JD_FCWB_EXCHANGE === "true",
  liI1II = process.env.JD_FCWB_SWISH === "true",
  i1Iii1 = process.env.JD_FCWB_TXMAX_RETRY || "3",
  l1liii = process.env.JD_FCWB_PROXY_OPEN === "true",
  I1Ili1 = process.env.JD_FCWB_PROXY_TUNNRL,
  l1liil = process.env.JD_FCWB_PROXY_URL,
  i1ll1 = process.env.JD_FCWB_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com",
  lilI1I = process.env.JD_FCWB_Notify === "true",
  lI1I1l = {
    cNAsHasSnzWTAtWhIQR4dA: {
      1: 6,
      2: 15,
      3: 16
    },
    "Bn1VWXtvgTv5ewPoMR-X8A": {
      1: 6,
      2: 15,
      3: 16
    }
  };
let Il1Il = 1000;
l1liii && (I1Ili1 || l1liil) && (Il1Il = 100);
let i1IiiI = "",
  lI1I1I = 0,
  l1lII = false;
if (l1liii) {
  l1lII = true;
  try {
    require("global-agent/bootstrap");
    if (l1liil) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + l1liil + "\n");
      let l1lIi = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = l1lIi.exec(l1liil)[0] + "," + i1ll1;
    } else {
      I1Ili1 ? (global.GLOBAL_AGENT.HTTP_PROXY = I1Ili1, global.GLOBAL_AGENT.NO_PROXY = "" + i1ll1, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_FCWB_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_FCWB_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (l1lili) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    l1lII = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_FCWB_PROXY_OPEN='true' \n");
}
let lilI1l = "";
const l1liiI = Object.keys(IllliI).map(IIlI1l => IllliI[IIlI1l]).filter(lI1I11 => lI1I11);
!l1liiI[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("❖ 当前设置活动ID为：" + l1lI1);
  console.log("❖ 达到剩余血量是否领取奖励:[" + (lI1I1i == true ? "领取" : "不领取") + "],是否延长提现:[" + (liI1II == true ? "延长" : "不延长") + "]");
  IliIll.config({
    title: $.name
  });
  for (let liI1Ii = 0; liI1Ii < l1liiI.length; liI1Ii++) {
    $.index = liI1Ii + 1;
    lilI1l = l1liiI[liI1Ii];
    iIiili.setCookie(lilI1l);
    $.UserName = decodeURIComponent(iIiili.getCookieValue(lilI1l, "pt_pin"));
    $.UA = iIiili.genUA($.UserName);
    $.message = IliIll.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    l1liii && l1lII && l1liil && (lI1I1I % 5 === 0 && (await i1Iiii(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1IiiI), console.log("📶 " + i1IiiI), lI1I1I++);
    await I1iI1();
    iIiili.unsetCookie();
    await $.wait(parseInt(Il1Il * 1 + 100, 10));
  }
  lilI1I && IliIll.getMessage() && (IliIll.updateContent(IliIll.content + "\n"), await IliIll.push());
})().catch(I1iIl => $.logErr(I1iIl)).finally(() => $.done());
async function I1iI1() {
  $.hotproxy = false;
  $.skipRun = false;
  try {
    const lilI11 = await iIiili.getLoginStatus(lilI1l);
    if (!lilI11 && typeof lilI11 === "boolean") {
      console.log("账号无效");
      $.message.fix("账号无效");
      return;
    }
    await lilI1i();
    if ($.skipRun) {
      return;
    }
    await Il1Ii();
    if ($.skipRun) {
      return;
    }
    await Ii11l();
    if ($.skipRun) {
      return;
    }
    await Ii11i();
  } catch (Ili1II) {
    console.log(Ili1II.message);
  }
}
async function lilI1i() {
  $.happyDigHome = "";
  $.round = "";
  await iIIli1("happyDigHome");
  if (!$.happyDigHome?.["markedPin"]) {
    console.log("🙅‍♂ 未能正确获取到主页信息，退出执行！");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(Il1Il * 1 + 100, 10));
  $.happyDigHelpList = "";
  await iIIli1("happyDigHelpList");
  await $.wait(parseInt(Il1Il * 1 + 100, 10));
  $.myinviteCode = $.happyDigHome?.["inviteCode"];
  $.blood = $.happyDigHome?.["blood"];
  $.markedPin = $.happyDigHome?.["markedPin"];
  const l1Ii1 = $.happyDigHelpList?.["personNum"] || 0;
  $.roundList = $.happyDigHome?.["roundList"] || [];
  const i1IilI = new Date().valueOf(),
    III1I1 = $.happyDigHome?.["leftTime"] + i1IilI,
    ilI111 = $.time("yyyy-MM-dd HH:mm:ss", III1I1),
    I1IllI = l1Ii1 <= 0 ? "没有助力人数,建议运行助力脚本后执行此脚本" : l1Ii1 > 0 && l1Ii1 < 117 ? "助力人数未满,可继续进行助力" : l1Ii1 >= 117 ? "助力已满,直接执行" : "未知";
  console.log("已开启活动，结束时间 " + ilI111 + "\n已有助力人数 " + l1Ii1 + " 🚶 (" + I1IllI + ")\n当前血量 " + $.blood + " 🩸 (剩余 " + IilI1 + " 🩸 退出执行)");
  if ($.blood <= IilI1) {
    await liI1I1();
    console.log("");
    console.log("🙅‍♂ 当前血量[" + IilI1 + "]已达到设定值，退出执行！");
    $.skipRun = true;
    return;
  }
}
async function Il1Ii() {
  $.apTaskList = "";
  await iIIli1("apTaskList");
  if (!$.apTaskList) {
    console.log("🙅‍♂ 未能正确获取到任务参数");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(Il1Il * 1 + 100, 10));
  console.log("");
  for (let iIlI1i = 0; iIlI1i < $.apTaskList.length; iIlI1i++) {
    const iII1Il = $.apTaskList[iIlI1i];
    $.taskId = iII1Il?.["id"];
    $.taskType = iII1Il?.["taskType"];
    $.taskSourceUrl = iII1Il?.["taskSourceUrl"];
    const IIIliI = iII1Il?.["taskFinished"],
      iII1Ii = iII1Il?.["taskShowTitle"],
      iIlI1l = iII1Il?.["timeLimitPeriod"];
    if (IIIliI || iIlI1l !== null) {
      continue;
    }
    if (!$.taskType.includes("BROWSE_")) {
      continue;
    }
    console.log("去做 \"" + iII1Ii + "\" 任务");
    if ($.taskSourceUrl) {
      await iIIli1("apDoTask");
      await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
    } else {
      $.apTaskDetail = "";
      await iIIli1("apTaskDetail");
      await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
      const llIill = $.apTaskDetail?.["taskItemList"] || [];
      for (let l1IIii = 0; l1IIii < llIill.length; l1IIii++) {
        $.taskSourceUrl = llIill[l1IIii]?.["itemId"];
        await iIIli1("apDoTask");
        await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
      }
    }
  }
}
async function Ii11l() {
  $.digStop = false;
  $.lastPrize = false;
  $.happyDigHome = "";
  await iIIli1("happyDigHome");
  if (!$.happyDigHome?.["markedPin"]) {
    console.log("🙅‍♂ 未能正确获取到主页信息，退出执行！");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(Il1Il * 1 + 100, 10));
  $.blood = $.happyDigHome?.["blood"];
  $.roundList = $.happyDigHome?.["roundList"] || [];
  const I1lI1I = $.happyDigHome?.["curRound"];
  if ($.blood <= IilI1) {
    return;
  }
  const lIi1i1 = $.roundList[I1lI1I - 1] || {};
  $.round = lIi1i1?.["round"];
  const l1l11 = lIi1i1?.["state"],
    illill = $.round === 1 ? "入门" : $.round === 2 ? "挑战" : $.round === 3 ? "终极" : "未知";
  if (l1l11 === 1) {
    I1lI1I === 3 && console.log("今日已通关，明天再参与吧~");
  } else {
    console.log("\n开始进行 \"" + illill + "\" 难度关卡，此关共有 " + lI1I1l[l1lI1][$.round] + " 💣️，当前剩余 " + $.blood + " 🩸\n");
    const illilI = lIi1i1?.["chunks"] || [];
    $.digBombNums = 0;
    for (let IiIli = 0; IiIli < illilI.length; IiIli++) {
      const illil1 = illilI[IiIli],
        IIIlii = illil1?.["state"];
      if (IIIlii === 1) {
        const llIilI = illil1?.["chunk"]?.["type"];
        if (llIilI === 2) {
          $.digBombNums++;
        }
        continue;
      }
      $.rowIdx = illil1?.["rowIdx"];
      $.colIdx = illil1?.["colIdx"];
      await iIIli1("happyDigDo");
      await $.wait(parseInt(Il1Il * 1 + 100, 10));
      const iil11I = illilI.length - IiIli - 1,
        iII1II = lI1I1l[l1lI1][$.round] - $.digBombNums;
      if ($.digStop) {
        console.log("\n🙅‍♂ 号黑了，溜了溜了~");
        $.skipRun = true;
        return;
      } else {
        if ($.lastPrize || iil11I === iII1II) {
          break;
        } else {
          if ($.blood <= IilI1 && $.digBombNums < lI1I1l[l1lI1][$.round]) {
            console.log("\n🙅‍♂ 没血了，溜了溜了~");
            lI1I1i && $.blood > 0 && (await iIIli1("happyDigExchange"));
            await liI1I1();
            return;
          }
        }
      }
    }
  }
  $.lastPrize && I1lI1I < 3 && $.blood > 0 && (await Ii11l());
}
async function liI1I1() {
  $.happyDigHome = "";
  await iIIli1("happyDigHome");
  if (!$.happyDigHome?.["markedPin"]) {
    console.log("🙅‍♂ 未能正确获取到主页信息，退出执行！");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(Il1Il * 1 + 100, 10));
  $.blood = $.happyDigHome?.["blood"];
  $.roundList = $.happyDigHome?.["roundList"] || [];
  let iiil11 = "";
  for (let illI1I = 0; illI1I < $.roundList.length; illI1I++) {
    const ilI1Ii = $.roundList[illI1I],
      ilI1Il = ilI1Ii.round,
      illI11 = ilI1Il === 1 ? "入门" : ilI1Il === 2 ? "挑战" : ilI1Il === 3 ? "终极" : "未知",
      ll11Ii = ilI1Ii.redAmount,
      ll11Il = ilI1Ii.cashAmount;
    if (ll11Ii || ll11Il) {
      switch (ilI1Il) {
        case 1:
        case 2:
        case 3:
          iiil11 += "\"" + illI11 + "\" 难度关卡累计获得：" + ll11Ii + "元无门槛红包🧧，" + ll11Il + "元微信现金 💰\n";
          break;
        default:
          break;
      }
    }
  }
  iiil11 && console.log("\n📢 收入汇总\n" + iiil11.trim());
}
async function Ii11i() {
  $.txhot = false;
  console.log("\n当前设置轮询提现页数：" + Ili1I1);
  for (let ii1i1i = 0; ii1i1i < Ili1I1; ii1i1i++) {
    $.pageNum = ii1i1i + 1;
    console.log("\n开始轮询提现" + $.pageNum + "页");
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    await l1lIl($.pageNum);
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    if ($.txhot) {
      break;
    }
  }
}
async function i1llI(IiIi11, ii1i1l) {
  try {
    switch (IiIi11) {
      case "happyDigHome":
        if (ii1i1l?.["code"] === 0 && ii1i1l?.["success"] === true) {
          $.hotproxy = false;
          $.happyDigHome = ii1i1l.data;
        } else {
          if (ii1i1l.data?.["bizMsg"]) {
            console.log("> " + ii1i1l.code + "-" + ii1i1l.data?.["bizMsg"] + "}");
          } else {
            if (ii1i1l.errMsg) {
              $.skipRun = true;
              console.log("> " + ii1i1l.code + "-" + ii1i1l.errMsg);
            } else {
              ii1i1l.msg ? console.log("> " + ii1i1l.code + "-" + ii1i1l.msg) : console.log("❓" + IiIi11 + " " + JSON.stringify(ii1i1l));
            }
          }
        }
        break;
      case "happyDigHelpList":
        if (ii1i1l?.["code"] === 0 && ii1i1l?.["success"] === true) {
          $.hotproxy = false;
          $.happyDigHelpList = ii1i1l.data;
        } else {
          if (ii1i1l.data?.["bizMsg"]) {
            console.log("> " + ii1i1l.code + "-" + ii1i1l.data?.["bizMsg"]);
          } else {
            if (ii1i1l.errMsg) {
              $.skipRun = true;
              console.log("> " + ii1i1l.code + "-" + ii1i1l.errMsg);
            } else {
              ii1i1l.msg ? console.log("> " + ii1i1l.code + "-" + ii1i1l.msg) : console.log("❓" + IiIi11 + " " + JSON.stringify(ii1i1l));
            }
          }
        }
        break;
      case "apTaskList":
        if (ii1i1l?.["code"] === 0 && ii1i1l?.["success"] === true) {
          $.hotproxy = false;
          $.apTaskList = ii1i1l.data || [];
        } else {
          if (ii1i1l.data?.["bizMsg"]) {
            console.log("> " + ii1i1l.code + "-" + ii1i1l.data?.["bizMsg"] + "}");
          } else {
            if (ii1i1l.errMsg) {
              $.skipRun = true;
              console.log("> " + ii1i1l.code + "-" + ii1i1l.errMsg);
            } else {
              ii1i1l.msg ? console.log("> " + ii1i1l.code + "-" + ii1i1l.msg) : console.log("❓" + IiIi11 + " " + JSON.stringify(ii1i1l));
            }
          }
        }
        break;
      case "apTaskDetail":
        if (ii1i1l?.["code"] === 0 && ii1i1l?.["success"] === true) {
          $.hotproxy = false;
          $.apTaskDetail = ii1i1l.data;
        } else {
          if (ii1i1l.data?.["bizMsg"]) {
            console.log("> " + ii1i1l.code + "-" + ii1i1l.data?.["bizMsg"] + "}");
          } else {
            if (ii1i1l.errMsg) {
              $.skipRun = true;
              console.log("> " + ii1i1l.code + "-" + ii1i1l.errMsg);
            } else {
              ii1i1l.msg ? console.log("> " + ii1i1l.code + "-" + ii1i1l.msg) : console.log("❓" + IiIi11 + " " + JSON.stringify(ii1i1l));
            }
          }
        }
        break;
      case "apDoTask":
        if (ii1i1l?.["code"] === 0 && ii1i1l?.["success"] === true) {
          $.hotproxy = false;
          $.blood++;
          console.log(" >> 任务完成");
        } else {
          if (ii1i1l.data?.["bizMsg"]) {
            console.log(" >> " + ii1i1l.code + "-" + ii1i1l.data?.["bizMsg"] + "}");
          } else {
            if (ii1i1l.errMsg) {
              $.skipRun = true;
              console.log(" >> " + ii1i1l.code + "-" + ii1i1l.errMsg);
            } else {
              ii1i1l.msg ? console.log(" >> " + ii1i1l.code + "-" + ii1i1l.msg) : console.log("❓" + IiIi11 + " " + JSON.stringify(ii1i1l));
            }
          }
        }
        break;
      case "happyDigExchange":
        if (ii1i1l?.["code"] === 0 && ii1i1l?.["success"] === true) {
          $.hotproxy = false;
          console.log("\n📢 结束当前关卡, 获得" + ii1i1l.data?.["wxValue"] + "现金, " + ii1i1l.data?.["redValue"] + "红包");
        } else {
          if (ii1i1l.data?.["bizMsg"]) {
            console.log("> " + ii1i1l.code + "-" + ii1i1l.data?.["bizMsg"]);
          } else {
            if (ii1i1l.errMsg) {
              $.skipRun = true;
              console.log("> " + ii1i1l.code + "-" + ii1i1l.errMsg);
            } else {
              if (ii1i1l.msg) {
                console.log("> " + ii1i1l.code + "-" + ii1i1l.msg);
              } else {
                console.log("❓" + IiIi11 + " " + JSON.stringify(ii1i1l));
              }
            }
          }
        }
        break;
      case "happyDigDo":
        if (ii1i1l?.["code"] === 0 && ii1i1l?.["success"] === true) {
          $.hotproxy = false;
          const liIIi1 = ii1i1l.data?.["chunk"]?.["type"],
            I1liiI = ii1i1l.data?.["chunk"]?.["value"],
            l1I11l = ii1i1l.data?.["lastPrize"];
          switch (liIIi1) {
            case 1:
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 🎟️ " + I1liiI + "元优惠券 🗑️");
              $.digStop = true;
              break;
            case 2:
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 🧧 " + I1liiI + "元无门槛红包");
              break;
            case 3:
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 💰 " + I1liiI + "元微信现金");
              break;
            case 4:
              $.blood--;
              $.digBombNums++;
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 💣️ Bomb💥");
              break;
            default:
              {
                console.log("❌ 奖品 " + liIIi1 + " 状态未知 ❔️");
                break;
              }
          }
          l1I11l && ($.lastPrize = true, $.round++, console.log("\n📢 当前难度关卡已通关，累计获得：" + ii1i1l.data?.["redAmount"] + "🧧，" + ii1i1l.data?.["cashAmount"] + "💰"));
        } else {
          if (ii1i1l.data?.["bizMsg"]) {
            console.log("挖宝失败 " + ii1i1l.code + "-" + ii1i1l.data?.["bizMsg"] + "}");
          } else {
            if (ii1i1l.errMsg) {
              $.skipRun = true;
              console.log("挖宝失败 " + ii1i1l.code + "-" + ii1i1l.errMsg);
            } else {
              ii1i1l.msg ? console.log("挖宝失败 " + ii1i1l.code + "-" + ii1i1l.msg) : console.log("❓" + IiIi11 + " " + JSON.stringify(ii1i1l));
            }
          }
        }
        break;
    }
  } catch (iIlii1) {
    console.log("❌ 未能正确处理 " + IiIi11 + " 请求响应 " + (iIlii1.message || iIlii1));
  }
}
async function iIIli1(l1IlII) {
  if ($.skipRun) {
    return;
  }
  let ilIIl1 = "",
    ii1l = "",
    iIl1I = "GET",
    liIi = "",
    liIIlI = {};
  switch (l1IlII) {
    case "happyDigHome":
      liIIlI = {
        appId: "ce6c2",
        functionId: "happyDigHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: l1lI1,
          round: $.round
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      liIi = await lilill.getH5st(liIIlI);
      ilIIl1 = "https://api.m.jd.com/api?" + liIi.params;
      break;
    case "happyDigHelpList":
      liIIlI = {
        appId: "02f8d",
        functionId: "happyDigHelpList",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          pageNum: 1,
          pageSize: 50,
          linkId: l1lI1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      liIi = await lilill.getH5st(liIIlI);
      ilIIl1 = "https://api.m.jd.com/api?" + liIi.params;
      break;
    case "apTaskList":
      liIIlI = {
        appId: "8dd95",
        functionId: "apTaskList",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: l1lI1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      liIi = await lilill.getH5st(liIIlI);
      ilIIl1 = "https://api.m.jd.com/api?" + liIi.params;
      break;
    case "apDoTask":
      liIIlI = {
        appId: "cd949",
        functionId: "apDoTask",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          taskType: $.taskType,
          taskId: $.taskId,
          channel: 4,
          checkVersion: false,
          taskInsert: false,
          linkId: l1lI1,
          itemId: $.taskSourceUrl
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      liIi = await lilill.getH5st(liIIlI);
      ilIIl1 = "https://api.m.jd.com/api?" + liIi.params;
      break;
    case "apTaskDetail":
      liIIlI = {
        appId: "cd949",
        functionId: "apTaskDetail",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: l1lI1,
          taskType: $.taskType,
          taskId: $.taskId,
          channel: 4,
          cityId: "133",
          provinceId: "4",
          countyId: "58530"
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      liIi = await lilill.getH5st(liIIlI);
      ilIIl1 = "https://api.m.jd.com/api?" + liIi.params;
      break;
    case "happyDigDo":
      liIIlI = {
        appId: "f7674",
        functionId: "happyDigDo",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          round: $.round,
          rowIdx: $.rowIdx,
          colIdx: $.colIdx,
          linkId: l1lI1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      liIi = await lilill.getH5st(liIIlI);
      ilIIl1 = "https://api.m.jd.com/api?" + liIi.params;
      break;
    case "happyDigExchange":
      liIIlI = {
        appId: "f7674",
        functionId: "happyDigExchange",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          round: $.round,
          linkId: l1lI1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      liIi = await lilill.getH5st(liIIlI);
      ilIIl1 = "https://api.m.jd.com/api?" + liIi.params;
      break;
    default:
      console.log("❌ 未知请求 " + l1IlII);
      return;
  }
  const IliIil = {
    url: ilIIl1,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: lilI1l,
      Host: "api.m.jd.com",
      Referer: "https://bnzf.jd.com/index?activityId=" + l1lI1 + "&channel=wyw&utm_campaign=&utm_source=&utm_term=&utm_medium=&sid=&un_area=4_133_58530_0",
      Origin: "https://bnzf.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: ii1l,
    timeout: 30000
  };
  iIl1I === "GET" && (delete IliIil.body, delete IliIil.headers["Content-Type"]);
  const iliiIi = 1;
  let i11Ill = 0,
    iliiIl = null,
    IliIii = false;
  while (i11Ill < iliiIi) {
    i11Ill > 0 && (await $.wait(1000));
    const {
      err: Iii1iI,
      res: lIi1lI,
      data: IIiiil
    } = await Ii1l1i(IliIil, iIl1I);
    if (Iii1iI) {
      if (typeof Iii1iI === "string" && Iii1iI.includes("Timeout awaiting 'request'")) {
        iliiIl = l1IlII + " 请求超时，请检查网络重试";
      } else {
        const iIIIl = lIi1lI?.["statusCode"];
        if (iIIIl) {
          if ([403, 493].includes(iIIIl)) {
            iliiIl = l1IlII + " 请求失败，IP被限制（Response code " + iIIIl + "）";
            $.hotproxy = true;
            IliIii = true;
          } else {
            if ([400, 404].includes(iIIIl)) {
              $.hotproxy = true;
              iliiIl = l1IlII + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iIIIl + "）";
            } else {
              $.hotproxy = true;
              iliiIl = l1IlII + " 请求失败（Response code " + iIIIl + "）";
            }
          }
        } else {
          $.hotproxy = true;
          iliiIl = l1IlII + " 请求失败 => " + (Iii1iI.message || Iii1iI);
        }
      }
      i11Ill++;
    } else {
      try {
        const I1lill = JSON.parse(IIiiil);
        i1llI(l1IlII, I1lill);
        break;
      } catch (I1lili) {
        iliiIl = "❌ " + l1IlII + " 接口响应数据解析失败: " + I1lili.message;
        console.log("🚫 " + l1IlII + " => " + String(IIiiil || "无响应数据"));
        i11Ill++;
      }
      IliIii = false;
    }
    if (l1liii && l1lII) {
      if (l1liil) {
        if ($.hotproxy) {
          await i1Iiii();
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1IiiI;
          lI1I1I = 0;
          $.hotproxy = false;
          console.log("📶 " + i1IiiI);
        }
        lI1I1I++;
      }
    }
  }
  i11Ill >= iliiIi && (console.log(iliiIl), IliIii && ($.outFlag = true, $.message && $.message.fix(iliiIl)));
}
async function Ii1l1i(Ill1Il, iIIII = "POST") {
  if (iIIII === "POST") {
    return new Promise(async i11IiI => {
      $.post(Ill1Il, (Ii1II, Iii1l1, iIlil1) => {
        i11IiI({
          err: Ii1II,
          res: Iii1l1,
          data: iIlil1
        });
      });
    });
  } else {
    if (iIIII === "GET") {
      return new Promise(async IIiii1 => {
        $.get(Ill1Il, (iIII1, I1lil1, iIlilI) => {
          IIiii1({
            err: iIII1,
            res: I1lil1,
            data: iIlilI
          });
        });
      });
    } else {
      const i11Ii1 = "不支持的请求方法";
      return {
        err: i11Ii1,
        res: null,
        data: null
      };
    }
  }
}
async function l1lIl(lIilIi) {
  return new Promise(async ll1lIl => {
    const ilIll1 = {
        appId: "f2b1d",
        functionId: "superRedBagList",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: l1lI1,
          pageNum: lIilIi,
          pageSize: 100,
          associateLinkId: "",
          business: "happyDigger"
        },
        version: "4.2",
        ua: $.UA,
        t: true
      },
      I1IIil = await lilill.getH5st(ilIll1);
    let I1IIii = {
      url: "https://api.m.jd.com/?" + I1IIil.params,
      headers: {
        Referer: "https://bnzf.jd.com/index?activityId=" + l1lI1 + "&channel=wyw&utm_campaign=&utm_source=&utm_term=&utm_medium=&sid=&un_area=4_133_58530_0",
        Origin: "https://bnzf.jd.com",
        "User-Agent": $.UA,
        Cookie: lilI1l
      },
      timeout: 30000
    };
    $.get(I1IIii, async (iIIIlI, li11i1, II1l1) => {
      try {
        if (iIIIlI) {
          console.log("" + JSON.stringify(iIIIlI));
        } else {
          II1l1 = JSON.parse(II1l1);
          if (II1l1) {
            if (II1l1.code === 0 && II1l1.success === true) {
              const iIIIl1 = (II1l1.data.items || []).filter(li11iI => li11iI.prizeType === 4 && li11iI.state === 0 || li11iI.state === 2);
              for (let liliIl of iIIIl1) {
                console.log("欢乐淘金提现，去提现" + liliIl.amount + "现金");
                await Ii1l1l(liliIl.id, liliIl.poolBaseId, liliIl.prizeGroupId, liliIl.prizeBaseId, 0);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("欢乐淘金提现失败，" + $.apCashWithDrawmessage);
                  break;
                }
              }
            } else {
              console.log("欢乐淘金提现查询奖品：异常:" + JSON.stringify(II1l1));
            }
          }
        }
      } catch (I1IIiI) {
        $.logErr(I1IIiI, li11i1);
      } finally {
        ll1lIl();
      }
    });
  });
}
async function Ii1l1l(li11lI, l1I1ll, li1il, l1I1li, li1ii) {
  return new Promise(async iliiiI => {
    const i1Iil = {
        appId: "73bca",
        functionId: "apCashWithDraw",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: l1lI1,
          businessSource: "NONE",
          base: {
            prizeType: 4,
            business: "happyDigger",
            id: li11lI,
            poolBaseId: l1I1ll,
            prizeGroupId: li1il,
            prizeBaseId: l1I1li
          }
        },
        version: "4.2",
        ua: $.UA,
        t: true
      },
      lIi11i = await lilill.getH5st(i1Iil),
      i1Iii = {
        url: "https://api.m.jd.com",
        body: "" + lIi11i.params,
        headers: {
          Referer: "https://bnzf.jd.com/index?activityId=" + l1lI1 + "&channel=wyw&utm_campaign=&utm_source=&utm_term=&utm_medium=&sid=&un_area=4_133_58530_0",
          Origin: "https://bnzf.jd.com",
          "User-Agent": $.UA,
          Cookie: lilI1l
        },
        timeout: 30000
      };
    $.post(i1Iii, async (IIiI1I, lIi11l, i1IlI) => {
      try {
        if (IIiI1I) {
          console.log("" + JSON.stringify(IIiI1I));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (i1Iiil(i1IlI)) {
            i1IlI = $.toObj(i1IlI);
            if (i1IlI?.["code"] === 0) {
              if (i1IlI?.["data"]?.["status"] === "310") {
                console.log("提现[" + i1IlI?.["data"]?.["record"]?.["amount"] + "]现金成功！");
              } else {
                $.apCashWithDrawmessage = i1IlI?.["data"]?.["message"];
                console.log("提现现金失败:" + $.apCashWithDrawmessage);
                if ($.apCashWithDrawmessage.includes("上限") || $.apCashWithDrawmessage.includes("其它pin的订单")) {
                  !liI1II && ($.txhot = true);
                } else {
                  if ($.apCashWithDrawmessage.includes("已存在状态")) {
                    li1ii < i1Iii1 && (await $.wait(parseInt(Il1Il * 1 + 30000, 10)), li1ii++, await Ii1l1l(li11lI, l1I1ll, li1il, l1I1li, li1ii));
                  } else {
                    if ($.apCashWithDrawmessage.includes("未绑定微信") || $.apCashWithDrawmessage.includes("绑定手机号")) {
                      if (!liI1II) {
                        $.txhot = true;
                      }
                    }
                  }
                }
              }
            } else {
              console.log("提现现金异常:" + JSON.stringify(i1IlI));
            }
          }
        }
      } catch (IIlIIi) {
        $.logErr(IIlIIi, lIi11l);
      } finally {
        iliiiI(i1IlI);
      }
    });
  });
}
function i1Iiil(li1l1) {
  try {
    if (typeof JSON.parse(li1l1) == "object") {
      return true;
    }
  } catch (Il1I1l) {
    console.log(Il1I1l);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function i1Iiii() {
  return new Promise(async lIilII => {
    $.get({
      url: l1liil,
      timeout: {
        request: 5000
      }
    }, (li1li, iIIIll) => {
      if (iIIIll) {
        try {
          let li1ll = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            iliii1 = li1ll.exec(iIIIll.body);
          i1IiiI = iliii1[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1IiiI;
        } catch (i1IiI) {} finally {
          lIilII();
        }
      }
    });
  });
}