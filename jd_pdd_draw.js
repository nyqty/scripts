/*
PDD特价转盘抽奖提现

入口：特价版APP——幸运抽奖
链接：https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html

轮询提现变量：JD_PDD_TXNUM //轮询提现页数

提现间隔时间：JD_PDD_TXWAIT //提现兑换间隔，默认 3 秒
抽奖间隔时间：JD_PDD_DRAWWAIT //提现兑换间隔，默认 3 秒

提现变量：JD_PDD_TXCASH //是否提现，默认不提现（true/false）
提现上限刷新时长变量：JD_PDD_Swish //是否延长提现时间，默认不延长（true/false） 配合提现页码，上限后延长，可以延迟到期时间，最终效果可以推迟到下个月直接提现。

重试变量：
JD_PDD_TXMAX_RETRY    // 已存在状态/待发放，提现中，等最大重试次数 默认 3 次
JD_PDD_DRAW_RETRY     // 抽奖 提示未中奖等最大重试次数 默认 20 次

兑换红包变量：
export JD_PDD_Exchange="true" // 上限后兑换红包，默认关闭

注意：轮询页数也大，越容易403，请谨慎填写
代理变量：
JD_PDD_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_PDD_PROXY_TUNNRL      // 代理池代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_PDD_PROXY_URL      // API代理地址变量，默认不开启，仅支持 数据格式:txt;提取数量:每次一个，格式为：http://api.xxx.xxx
JD_PDD_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#PDD特价转盘抽奖提现
1 1 1 1 * jd_pdd_draw.js, tag=PDD特价转盘抽奖提现, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('PDD特价转盘抽奖提现');
var version_ = "jsjiami.com.v7";
const l1lIi = require("./jdCookie"),
  l1lili = require("./function/sendJDNotify"),
  IIlI1l = require("./function/jdCommon"),
  lI1I11 = require("./function/krgetH5st"),
  IilIl = process.env.JD_PDD_Notify === "true",
  IilIi = process.env.JD_PDD_TXCASH === "true",
  Ili1Il = process.env.JD_PDD_Swish === "true",
  i1liI = process.env.JD_PDD_TXNUM || "1",
  iilIIi = process.env.JD_PDD_Exchange === "true",
  I1iII = process.env.JD_PDD_TXWAIT || "3",
  IIlI1i = process.env.JD_PDD_DRAWWAIT || "3",
  iiiI1i = process.env.JD_PDD_TXMAX_RETRY || "3",
  iiiI1l = process.env.JD_PDD_DRAW_RETRY || "20",
  Ili1Ii = "Wvzc_VpNTlSkiQdHT8r7QA",
  Ii1l1I = process.env.JD_PDD_PROXY_OPEN === "true",
  iilII1 = process.env.JD_PDD_PROXY_TUNNRL,
  iiiI11 = process.env.JD_PDD_PROXY_URL,
  l1lilI = process.env.JD_PDD_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let i1Iil1 = "",
  liI1Ii = 0,
  l1lil1 = parseInt(I1iII) * 1000,
  i1lil = parseInt(IIlI1i) * 1000;
$.PDDEnd = false;
let I1iIl = false;
if (Ii1l1I) {
  I1iIl = true;
  try {
    require("global-agent/bootstrap");
    if (iiiI11) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + iiiI11 + "\n");
      let i1IilI = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = i1IilI.exec(iiiI11)[0] + "," + l1lilI;
    } else {
      iilII1 ? (global.GLOBAL_AGENT.HTTP_PROXY = iilII1, global.GLOBAL_AGENT.NO_PROXY = "" + l1lilI, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (III1I1) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    I1iIl = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_PDD_PROXY_OPEN='true' \n");
}
let IilII = "";
const ili1l = Object.keys(l1lIi).map(ilI111 => l1lIi[ilI111]).filter(I1IllI => I1IllI);
!ili1l[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("⏺️ 当前设置是否提现:[" + (IilIi == true ? "提现" : "不提现") + "],提现页码:[" + i1liI + "] 页");
  console.log("⏺️ 当前设置未中奖重试 [" + iiiI1l + "] 次,提现重试 [" + iiiI1i + "] 次");
  console.log("⏺️ 当前设置抽奖间隔 [" + IIlI1i + "] 秒,提现间隔 [" + I1iII + "] 秒");
  console.log("⏺️ 提现上限后是否兑换红包:[" + (iilIIi == true ? "兑换" : "不兑换") + "],是否延长提现:[" + (Ili1Il == true ? "延长" : "不延长") + "]");
  l1lili.config({
    title: $.name
  });
  for (let llIIIi = 0; llIIIi < ili1l.length; llIIIi++) {
    $.index = llIIIi + 1;
    IilII = ili1l[llIIIi];
    IIlI1l.setCookie(IilII);
    $.UserName = decodeURIComponent(IIlI1l.getCookieValue(IilII, "pt_pin"));
    $.UA = IIlI1l.genUA($.UserName, "lite");
    $.message = l1lili.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    Ii1l1I && I1iIl && iiiI11 && (liI1Ii % 10 == 0 && (await l1Ii1(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1Iil1), console.log("📶 " + i1Iil1), liI1Ii++);
    await i1lii();
    IIlI1l.unsetCookie();
    await $.wait(parseInt(2100, 10));
  }
  IilIl && l1lili.getMessage() && (l1lili.updateContent(l1lili.content + "\n"), await l1lili.push());
})().catch(l1I1I1 => $.logErr(l1I1I1)).finally(() => $.done());
async function i1lii() {
  $.hotproxy = false;
  $.retryend = false;
  $.txhot = false;
  $.inviteFissionReceivehot = false;
  $.stateEnd = false;
  $.nologin = false;
  $.cashVoKR = false;
  $.hbnums = 0;
  $.xjnums = 0;
  $.drawnum = 0;
  try {
    await liI1Il("inviteFissionBeforeHome");
    if ($.nologin) {
      return;
    }
    await $.wait(parseInt(1500, 10));
    await liI1Il("inviteFissionHome");
    if ($.nologin) {
      return;
    }
    await $.wait(parseInt(1500, 10));
    if (!$.nologin) {
      if ($.prizeNum > 0) {
        for (m = 1; $.prizeNum--; m++) {
          console.log("进行第" + m + "次抽奖");
          await liI1Il("inviteFissionDrawPrize");
          await $.wait(parseInt(i1lil * 1 + 2000, 10));
          $.cashVoKR && !$.stateEnd && !$.inviteFissionReceivehot && Ili1Ii == "EcuVpjGGfccY3Ic_1ni83w" && (await liI1Il("inviteFissionReceive"), await $.wait(parseInt(i1lil * 1 + 2000, 10)));
          if ($.retryend) {
            break;
          }
        }
      }
      if (IilIi) {
        console.log("\n当前设置轮询提现页数：[" + i1liI + "]");
        for (let liI111 = 0; liI111 < i1liI; liI111++) {
          $.pageNum = liI111 + 1;
          console.log("\n开始轮询提现 [" + $.pageNum + "] 页");
          await iiiI1I($.pageNum);
          await $.wait(parseInt(l1lil1 * 1 + 5000, 10));
          if ($.txhot) {
            break;
          }
        }
      } else {
        console.log("\n⏺️ 当前设置不进行提现!");
      }
    }
  } catch (lIIi1I) {
    console.log(lIIi1I.message);
  }
}
async function iilIII(l1IIil, l1iiII) {
  try {
    switch (l1IIil) {
      case "inviteFissionBeforeHome":
        if (l1iiII?.["code"] === 0 && l1iiII?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionBeforeHome = l1iiII.data;
        } else {
          if (l1iiII.data?.["bizMsg"]) {
            console.log("⏺️ " + l1iiII.code + "-" + l1iiII.data?.["bizMsg"] + "}");
          } else {
            if (l1iiII.code == 1000 && l1iiII.errMsg == "未登录") {
              $.nologin = true;
              console.log("⏺️ " + l1iiII.code + "-" + l1iiII.errMsg);
            } else {
              if (l1iiII.msg) {
                console.log("⏺️ " + l1iiII.code + "-" + l1iiII.msg);
              } else {
                console.log("❓" + l1IIil + " " + JSON.stringify(l1iiII));
              }
            }
          }
        }
        break;
      case "inviteFissionHome":
        if (l1iiII?.["code"] === 0 && l1iiII?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionHome = l1iiII?.["data"] || [];
          $.drawPrizeNum = $.inviteFissionHome?.["drawPrizeNum"] || 0;
          $.prizeNum = $.inviteFissionHome?.["prizeNum"] || 0;
          let llII1I = $.inviteFissionHome?.["inviter"] || "";
          const ilI1II = new Date().valueOf(),
            iillI1 = $.inviteFissionHome?.["countDownTime"] + ilI1II,
            i11l1 = $.time("yyyy-MM-dd HH:mm:ss", iillI1);
          $.cashVo = $.inviteFissionHome?.["cashVo"] || "";
          if ($.cashVo) {
            $.cashVoKR = true;
            $.txjstate = $.inviteFissionHome?.["cashVo"]?.["state"] || 0;
            console.log("限时提现金：\n已有 " + $.cashVo?.["amount"] + " 提现金，仅差 " + $.cashVo?.["leftAmount"] + " 提现金可提现 " + $.cashVo?.["totalAmount"] + " 元,进度值：" + $.cashVo?.["rate"] + " %\n");
            switch ($.txjstate) {
              case 0:
              case 1:
              case 2:
                break;
              case 3:
                console.log("已成功获得限时提现金 " + $.cashVo?.["totalAmount"] + " 元，时间：" + $.cashVo?.["rewardRecord"]?.["createTime"] + "\n");
                $.stateEnd = true;
                break;
              default:
                console.log("❌ 未知类型：（" + $.txjstate + "）暂不受本脚本支持，请联系作者进行反馈！");
            }
          }
          console.log("到期时间：" + i11l1 + "\n助力码：" + llII1I + "\n已抽奖次数：" + $.drawPrizeNum + "\n剩余抽奖次数：" + $.prizeNum);
        } else {
          if (l1iiII.data?.["bizMsg"]) {
            console.log("⏺️ " + l1iiII.code + "-" + l1iiII.data?.["bizMsg"]);
          } else {
            if (l1iiII.code == 1000 && l1iiII.errMsg == "未登录") {
              $.nologin = true;
              console.log("⏺️ " + l1iiII.code + "-" + l1iiII.errMsg);
            } else {
              if (l1iiII.msg) {
                console.log("⏺️ " + l1iiII.code + "-" + l1iiII.msg);
              } else {
                console.log("❓" + l1IIil + " " + JSON.stringify(l1iiII));
              }
            }
          }
        }
        break;
      case "inviteFissionReceive":
        if (l1iiII?.["code"] === 0 && l1iiII?.["success"] === true) {
          $.inviteFissionReceive = l1iiII?.["data"] || [];
          console.log("抽中提现金：" + ($.inviteFissionReceive?.["receiveList"][0]?.["amount"] || "未获得提现金") + " ,还需 " + $.inviteFissionReceive?.["leftAmount"] + " 提现金,进度值：" + $.inviteFissionReceive?.["rate"] + " %");
          if ($.inviteFissionReceive?.["state"] == 3) {
            console.log("已成功获得 " + $.inviteFissionReceive?.["amount"] + " 元提现金，快去提现吧！");
          }
        } else {
          if (l1iiII.code == 80209 && l1iiII.errMsg == "活动太火爆，请稍候重试") {
            console.log("当期额外提现任务已完成，跳过");
            $.inviteFissionReceivehot = true;
          } else {
            l1iiII.code == 80208 && l1iiII.errMsg == "活动太火爆，请稍候重试" ? console.log("⏺️ 未抽中提现金") : console.log(l1iiII.errMsg);
          }
        }
        break;
      case "inviteFissionDrawPrize":
        if (l1iiII?.["code"] === 0 && l1iiII?.["success"] === true) {
          $.hotproxy = false;
          $.drawnum = 0;
          $.inviteFissionDrawPrize = l1iiII.data;
          $.prizeType = $.inviteFissionDrawPrize?.["prizeType"];
          switch ($.prizeType) {
            case 0:
              console.log("抽中未知  🎁");
              break;
            case 1:
              console.log("抽中垃圾卷  🗑️");
              break;
            case 2:
              $.hbprizeValue = $.inviteFissionDrawPrize?.["prizeValue"] || 0;
              $.hbnum = ($.hbprizeValue * 100 + $.hbnums * 100) / 100;
              $.hbnums = ili1i($.hbnum);
              console.log("抽中红包：" + $.hbprizeValue + " 🧧 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");
              break;
            case 4:
              $.xjprizeValue = $.inviteFissionDrawPrize?.["prizeValue"] || 0;
              $.xjnum = ($.xjprizeValue * 100 + $.xjnums * 100) / 100;
              $.xjnums = ili1i($.xjnum);
              console.log("抽中现金：" + $.xjprizeValue + " 🎁 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");
              break;
            case 6:
              console.log("抽中惊喜大礼包  🗑️");
              break;
            default:
              console.log("❌ 未知类型：（" + $.prizeType + "）暂不受本脚本支持，请联系作者进行反馈！");
              break;
          }
        } else {
          if (l1iiII.data?.["bizMsg"]) {
            console.log("⏺️ " + l1iiII.code + "-" + l1iiII.data?.["bizMsg"] + "}");
          } else {
            if (l1iiII.code == 1000 && l1iiII.errMsg == "未登录") {
              $.nologin = true;
              console.log("⏺️ " + l1iiII.code + "-" + l1iiII.errMsg);
            } else {
              if (l1iiII.errMsg) {
                l1iiII.errMsg.includes("火爆") && ($.drawnum < iiiI1l ? ($.drawnum++, console.log("⏺️ 未中奖 [" + $.drawnum + "]"), $.prizeNum++) : (console.log("⏺️ 已达到设定重试值，退出执行!"), $.retryend = true));
              } else {
                console.log("❓" + l1IIil + " " + JSON.stringify(l1iiII));
              }
            }
          }
        }
        break;
    }
  } catch (ll11Il) {
    console.log("❌ 未能正确处理 " + l1IIil + " 请求响应 " + (ll11Il.message || ll11Il));
  }
}
async function liI1Il(i11lI) {
  let iii1I = "",
    iliII = "",
    ii1i1I = "POST",
    liIlI1 = "",
    iillIl = {};
  switch (i11lI) {
    case "inviteFissionReceive":
      iillIl = {
        appId: "b8469",
        functionId: "inviteFissionReceive",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: Ili1Ii
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      liIlI1 = await lI1I11.getH5st(iillIl);
      iii1I = "https://api.m.jd.com/api";
      iliII = "" + liIlI1.params;
      break;
    case "inviteFissionBeforeHome":
      iillIl = {
        appId: "02f8d",
        functionId: "inviteFissionBeforeHome",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: Ili1Ii,
          isJdApp: true,
          inviter: ""
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      liIlI1 = await lI1I11.getH5st(iillIl);
      iii1I = "https://api.m.jd.com/api";
      iliII = "" + liIlI1.params;
      break;
    case "inviteFissionHome":
      iillIl = {
        appId: "eb67b",
        functionId: "inviteFissionHome",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: Ili1Ii,
          inviter: ""
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      liIlI1 = await lI1I11.getH5st(iillIl);
      iii1I = "https://api.m.jd.com/api";
      iliII = "" + liIlI1.params;
      break;
    case "inviteFissionDrawPrize":
      iillIl = {
        appId: "c02c6",
        functionId: "inviteFissionDrawPrize",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: Ili1Ii
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      liIlI1 = await lI1I11.getH5st(iillIl);
      iii1I = "https://api.m.jd.com/api";
      iliII = "" + liIlI1.params;
      break;
    default:
      console.log("❌ 未知请求 " + i11lI);
      return;
  }
  const IiIi1I = {
    url: iii1I,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: IilII,
      Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
      Origin: "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: iliII,
    timeout: 15000
  };
  ii1i1I === "GET" && (delete IiIi1I.body, delete IiIi1I.headers["Content-Type"]);
  const iillIi = 1;
  let iii11 = 0,
    iliI1 = null,
    i11iI = false;
  while (iii11 < iillIi) {
    iii11 > 0 && (await $.wait(1000));
    const {
      err: I1liii,
      res: liiiIi,
      data: l1I11I
    } = await I1iIi(IiIi1I, ii1i1I);
    if (I1liii) {
      if (typeof I1liii === "string" && I1liii.includes("Timeout awaiting 'request'")) {
        iliI1 = i11lI + " 请求超时，请检查网络重试";
      } else {
        const Iii1ll = liiiIi?.["statusCode"];
        if (Iii1ll) {
          if ([403, 493].includes(Iii1ll)) {
            iliI1 = i11lI + " 请求失败，IP被限制（Response code " + Iii1ll + "）";
            $.hotproxy = true;
            i11iI = true;
          } else {
            [400, 404].includes(Iii1ll) ? ($.hotproxy = true, iliI1 = i11lI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + Iii1ll + "）") : ($.hotproxy = true, iliI1 = i11lI + " 请求失败（Response code " + Iii1ll + "）");
          }
        } else {
          $.hotproxy = true;
          iliI1 = i11lI + " 请求失败 => " + (I1liii.message || I1liii);
        }
      }
      iii11++;
    } else {
      const Iii1li = false;
      try {
        const i11i1 = JSON.parse(l1I11I);
        iilIII(i11lI, i11i1);
        break;
      } catch (liIIi1) {
        iliI1 = "❌ " + i11lI + " 接口响应数据解析失败: " + liIIi1.message;
        console.log("🚫 " + i11lI + " => " + String(l1I11I || "无响应数据"));
        Iii1li && (console.log("\n---------------------------------------------------\n"), console.log("\n---------------------------------------------------\n"));
        iii11++;
      }
      i11iI = false;
    }
    if (Ii1l1I && I1iIl) {
      if (iiiI11) {
        if ($.hotproxy) {
          await l1Ii1();
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1Iil1;
          liI1Ii = 0;
          $.hotproxy = false;
          console.log("📶 " + i1Iil1);
        }
        liI1Ii++;
      }
    }
  }
  iii11 >= iillIi && (console.log(iliI1), i11iI && ($.outFlag = true, $.message && $.message.fix(iliI1)));
}
async function I1iIi(l1I11i, iIlii1 = "POST") {
  if (iIlii1 === "POST") {
    return new Promise(async IliIil => {
      setTimeout(() => {
        $.post(l1I11i, (iliiIi, i11Ill, iliiIl) => {
          IliIil({
            err: iliiIi,
            res: i11Ill,
            data: iliiIl
          });
        });
      }, 0);
    });
  } else {
    if (iIlii1 === "GET") {
      return new Promise(async liIIl1 => {
        setTimeout(() => {
          $.get(l1I11i, (ilIIlI, liiiI1, iIl11) => {
            liIIl1({
              err: ilIIlI,
              res: liiiI1,
              data: iIl11
            });
          });
        }, 0);
      });
    } else {
      const ii1I = "不支持的请求方法";
      return {
        err: ii1I,
        res: null,
        data: null
      };
    }
  }
}
async function iiiI1I(i11Ili) {
  return new Promise(async IlilI1 => {
    const iIIIi = {
        appId: "f2b1d",
        functionId: "superRedBagList",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          pageNum: $.pageNum,
          pageSize: 100,
          linkId: Ili1Ii,
          business: "fission"
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      Il1iII = await lI1I11.getH5st(iIIIi);
    let Iii1iI = {
      url: "https://api.m.jd.com/api",
      body: "" + Il1iII.params,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: IilII,
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.post(Iii1iI, async (lIi1lI, IIiiil, iIIIl) => {
      try {
        if (lIi1lI) {
          console.log("" + JSON.stringify(lIi1lI));
        } else {
          iIIIl = JSON.parse(iIIIl);
          if (iIIIl) {
            if (iIIIl.code == 0 && iIIIl.success == true) {
              const liIIll = (iIIIl.data.items || []).filter(l1IlIi => l1IlIi.prizeType === 4 && l1IlIi.state === 0 || l1IlIi.state === 2);
              for (let l1IlIl of liIIll) {
                console.log("抽现金抽奖提现，去提现[" + l1IlIl.amount + "]现金");
                await lilI11(l1IlIl.id, l1IlIl.poolBaseId, l1IlIl.prizeGroupId, l1IlIl.prizeBaseId, 0);
                await $.wait(parseInt(l1lil1 * 1 + 3000, 10));
                if ($.txhot) {
                  console.log("抽现金抽奖提现失败，" + $.apCashWithDrawmessage);
                  break;
                }
              }
            } else {
              console.log("抽现金抽奖提现查询奖品：异常:" + JSON.stringify(iIIIl));
            }
          }
        }
      } catch (illiiI) {
        $.logErr(illiiI, IIiiil);
      } finally {
        IlilI1();
      }
    });
  });
}
async function lilI11(Ili11l, I1lill, I1lili, i11Iil, i11Iii) {
  return new Promise(async IIiii1 => {
    const iIII1 = {
        appId: "8c6ae",
        functionId: "apCashWithDraw",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: Ili1Ii,
          businessSource: "NONE",
          base: {
            prizeType: 4,
            business: "fission",
            id: Ili11l,
            poolBaseId: I1lill,
            prizeGroupId: I1lili,
            prizeBaseId: i11Iil
          }
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      I1lil1 = await lI1I11.getH5st(iIII1);
    let iIlilI = {
      url: "https://api.m.jd.com/api",
      body: "" + I1lil1.params,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: IilII,
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.post(iIlilI, async (II1l1, liii1i, IIll1i) => {
      try {
        if (II1l1) {
          console.log("" + JSON.stringify(II1l1));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (IiIi1(IIll1i)) {
            IIll1i = $.toObj(IIll1i);
            if (IIll1i?.["code"] === 0) {
              if (IIll1i?.["data"]?.["status"] === "310") {
                console.log("提现[" + IIll1i?.["data"]?.["record"]?.["amount"] + "]现金成功！");
              } else {
                $.apCashWithDrawmessage = IIll1i?.["data"]?.["message"];
                console.log("提现现金失败:" + $.apCashWithDrawmessage);
                if ($.apCashWithDrawmessage.includes("上限") || $.apCashWithDrawmessage.includes("其它pin的订单")) {
                  iilIIi ? await Ili1II(Ili11l, I1lill, I1lili, i11Iil) : !Ili1Il && ($.txhot = true);
                } else {
                  if ($.apCashWithDrawmessage.includes("已存在状态")) {
                    i11Iii < iiiI1i && (await $.wait(parseInt(l1lil1 * 1 + 2000, 10)), i11Iii++, await lilI11(Ili11l, I1lill, I1lili, i11Iil, i11Iii));
                  } else {
                    ($.apCashWithDrawmessage.includes("未绑定微信") || $.apCashWithDrawmessage.includes("绑定手机号")) && !Ili1Il && ($.txhot = true);
                  }
                }
              }
            } else {
              console.log("提现现金异常:" + JSON.stringify(IIll1i));
            }
          }
        }
      } catch (I1iiI1) {
        $.logErr(I1iiI1, liii1i);
      } finally {
        IIiii1(IIll1i);
      }
    });
  });
}
async function Ili1II(IIlIIl, iIiiI1, I1IIiI, ilIli1) {
  return new Promise(async li11il => {
    const Ii1lIl = {
        appId: "8c6ae",
        functionId: "apRecompenseDrawPrize",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: Ili1Ii,
          businessSource: "fission",
          business: "business",
          drawRecordId: IIlIIl,
          poolId: iIiiI1,
          prizeGroupId: I1IIiI,
          prizeId: ilIli1
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      iIIIiI = await lI1I11.getH5st(Ii1lIl);
    let li1iI = {
      url: "https://api.m.jd.com/api",
      body: "" + iIIIiI.params,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: IilII,
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.post(li1iI, async (Ii1Ili, IIiI11, Ii1Ill) => {
      try {
        Ii1Ili ? (console.log("" + JSON.stringify(Ii1Ili)), console.log($.name + " API请求失败，请检查网路重试")) : IiIi1(Ii1Ill) && (Ii1Ill = $.toObj(Ii1Ill), Ii1Ill.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + Ii1Ill.errMsg));
      } catch (iliiiI) {
        $.logErr(iliiiI, IIiI11);
      } finally {
        li11il(Ii1Ill);
      }
    });
  });
}
function ili1i(lIi11i) {
  var IIiI1I = Number(lIi11i);
  !isNaN(parseFloat(IIiI1I)) && (IIiI1I = IIiI1I.toFixed(2));
  return IIiI1I;
}
function IiIi1(lIl1Il) {
  try {
    if (typeof JSON.parse(lIl1Il) == "object") {
      return true;
    }
  } catch (li11ll) {
    console.log(li11ll);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function l1Ii1() {
  return new Promise(async iIIIli => {
    $.get({
      url: iiiI11,
      timeout: {
        request: 5000
      }
    }, (ll1IiI, li1li) => {
      if (li1li) {
        try {
          let iliii1 = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            i1IiI = iliii1.exec(li1li.body);
          i1Iil1 = i1IiI[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1Iil1;
        } catch (lIllil) {} finally {
          iIIIli();
        }
      }
    });
  });
}
var version_ = "jsjiami.com.v7";