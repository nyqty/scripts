/*
PDD转赚红包抽奖提现

入口：京东APP——玩一玩——转赚红包
链接：https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html

轮询提现变量：JD_PDD1_TXNUM //轮询提现页数

提现间隔时间：JD_PDD1_TXWAIT //提现兑换间隔，默认 3 秒
抽奖间隔时间：JD_PDD1_DRAWWAIT //提现兑换间隔，默认 3 秒

提现变量：JD_PDD1_TXCASH //是否提现，默认不提现（true/false）
提现上限刷新时长变量：JD_PDD1_Swish //是否延长提现时间，默认不延长（true/false） 配合提现页码，上限后延长，可以延迟到期时间，最终效果可以推迟到下个月直接提现。


重试变量：
JD_PDD1_TXMAX_RETRY    // 已存在状态/待发放，提现中，等最大重试次数 默认 3 次
JD_PDD1_DRAW_RETRY     // 抽奖 提示未中奖等最大重试次数 默认 20 次

兑换红包变量：
export JD_PDD1_Exchange="true" // 上限后兑换红包，默认关闭

注意：轮询页数也大，越容易403，请谨慎填写
代理变量：
JD_PDD_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_PDD_PROXY_TUNNRL      // 代理池代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_PDD_PROXY_URL      // API代理地址变量，默认不开启，仅支持 数据格式:txt;提取数量:每次一个，格式为：http://api.xxx.xxx
JD_PDD_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#PDD转赚红包抽奖提现
1 1 1 1 * jd_pdd1_draw.js, tag=PDD转赚红包抽奖提现, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('PDD转赚红包抽奖提现');
var version_ = "jsjiami.com.v7";
const I1iII = require("./jdCookie"),
  IIlI1i = require("./function/sendJDNotify"),
  iiiI1i = require("./function/jdCommon"),
  iiiI1l = require("./function/krgetH5st"),
  Ili1Ii = process.env.JD_PDD1_Notify === "true",
  Ii1l1I = process.env.JD_PDD1_TXCASH === "true",
  iilII1 = process.env.JD_PDD1_Swish === "true",
  iiiI11 = process.env.JD_PDD1_TXNUM || "1",
  l1lilI = process.env.JD_PDD1_Exchange === "true",
  i1Iil1 = process.env.JD_PDD1_TXWAIT || "3",
  liI1Ii = process.env.JD_PDD1_DRAWWAIT || "3",
  l1lil1 = process.env.JD_PDD1_TXMAX_RETRY || "3",
  i1lil = process.env.JD_PDD1_DRAW_RETRY || "20",
  I1iIl = "3orGfh1YkwNLksxOcN8zWQ",
  IilII = process.env.JD_PDD_PROXY_OPEN === "true",
  ili1l = process.env.JD_PDD_PROXY_TUNNRL,
  i1lii = process.env.JD_PDD_PROXY_URL,
  iilIII = process.env.JD_PDD_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let liI1Il = "",
  I1iIi = 0,
  iiiI1I = parseInt(i1Iil1) * 1000,
  lilI11 = parseInt(liI1Ii) * 1000;
$.PDDEnd = false;
let Ili1II = false;
if (IilII) {
  Ili1II = true;
  try {
    require("global-agent/bootstrap");
    if (i1lii) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + i1lii + "\n");
      let iilIIl = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = iilIIl.exec(i1lii)[0] + "," + iilIII;
    } else {
      ili1l ? (global.GLOBAL_AGENT.HTTP_PROXY = ili1l, global.GLOBAL_AGENT.NO_PROXY = "" + iilIII, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (i1Iili) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    Ili1II = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_PDD_PROXY_OPEN='true' \n");
}
let ili1i = "";
const IiIi1 = Object.keys(I1iII).map(i1Iill => I1iII[i1Iill]).filter(l1IiI => l1IiI);
!IiIi1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("⏺️ 当前设置是否提现:[" + (Ii1l1I == true ? "提现" : "不提现") + "],提现页码:[" + iiiI11 + "] 页");
  console.log("⏺️ 当前设置未中奖重试 [" + i1lil + "] 次,提现重试 [" + l1lil1 + "] 次");
  console.log("⏺️ 当前设置抽奖间隔 [" + liI1Ii + "] 秒,提现间隔 [" + i1Iil1 + "] 秒");
  console.log("⏺️ 提现上限后是否兑换红包:[" + (l1lilI == true ? "兑换" : "不兑换") + "],是否延长提现:[" + (iilII1 == true ? "延长" : "不延长") + "]");
  IIlI1i.config({
    title: $.name
  });
  for (let IiIii = 0; IiIii < IiIi1.length; IiIii++) {
    $.index = IiIii + 1;
    ili1i = IiIi1[IiIii];
    iiiI1i.setCookie(ili1i);
    $.UserName = decodeURIComponent(iiiI1i.getCookieValue(ili1i, "pt_pin"));
    $.UA = iiiI1i.genUA($.UserName);
    $.message = IIlI1i.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    IilII && Ili1II && i1lii && (I1iIi % 10 == 0 && (await ili1I(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + liI1Il), console.log("📶 " + liI1Il), I1iIi++);
    await l1Ii1();
    iiiI1i.unsetCookie();
    await $.wait(parseInt(2100, 10));
  }
  Ili1Ii && IIlI1i.getMessage() && (IIlI1i.updateContent(IIlI1i.content + "\n"), await IIlI1i.push());
})().catch(IiIiII => $.logErr(IiIiII)).finally(() => $.done());
async function l1Ii1() {
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
    await III1I1("inviteFissionBeforeHome");
    if ($.nologin) {
      return;
    }
    await $.wait(parseInt(1500, 10));
    await III1I1("inviteFissionHome");
    if ($.nologin) {
      return;
    }
    await $.wait(parseInt(1500, 10));
    if (!$.nologin) {
      if ($.prizeNum > 0) {
        for (m = 1; $.prizeNum--; m++) {
          console.log("进行第" + m + "次抽奖");
          await III1I1("inviteFissionDrawPrize");
          await $.wait(parseInt(lilI11 * 1 + 2000, 10));
          $.cashVoKR && !$.stateEnd && !$.inviteFissionReceivehot && I1iIl == "EcuVpjGGfccY3Ic_1ni83w" && (await III1I1("inviteFissionReceive"), await $.wait(parseInt(lilI11 * 1 + 2000, 10)));
          if ($.retryend) {
            break;
          }
        }
      }
      if (Ii1l1I) {
        console.log("\n当前设置轮询提现页数：[" + iiiI11 + "]");
        for (let l1iiII = 0; l1iiII < iiiI11; l1iiII++) {
          $.pageNum = l1iiII + 1;
          console.log("\n开始轮询提现 [" + $.pageNum + "] 页");
          await I1IllI($.pageNum);
          await $.wait(parseInt(iiiI1I * 1 + 5000, 10));
          if ($.txhot) {
            break;
          }
        }
      } else {
        console.log("\n⏺️ 当前设置不进行提现!");
      }
    }
  } catch (lIi1i1) {
    console.log(lIi1i1.message);
  }
}
async function i1IilI(l1l11, illill) {
  try {
    switch (l1l11) {
      case "inviteFissionBeforeHome":
        if (illill?.["code"] === 0 && illill?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionBeforeHome = illill.data;
        } else {
          if (illill.data?.["bizMsg"]) {
            console.log("⏺️ " + illill.code + "-" + illill.data?.["bizMsg"] + "}");
          } else {
            if (illill.code == 1000 && illill.errMsg == "未登录") {
              $.nologin = true;
              console.log("⏺️ " + illill.code + "-" + illill.errMsg);
            } else {
              illill.msg ? console.log("⏺️ " + illill.code + "-" + illill.msg) : console.log("❓" + l1l11 + " " + JSON.stringify(illill));
            }
          }
        }
        break;
      case "inviteFissionHome":
        if (illill?.["code"] === 0 && illill?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionHome = illill?.["data"] || [];
          $.drawPrizeNum = $.inviteFissionHome?.["drawPrizeNum"] || 0;
          $.prizeNum = $.inviteFissionHome?.["prizeNum"] || 0;
          let IlliI = $.inviteFissionHome?.["inviter"] || "";
          const I1I1I1 = new Date().valueOf(),
            IIIlil = $.inviteFissionHome?.["countDownTime"] + I1I1I1,
            Ili111 = $.time("yyyy-MM-dd HH:mm:ss", IIIlil);
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
          console.log("到期时间：" + Ili111 + "\n助力码：" + IlliI + "\n已抽奖次数：" + $.drawPrizeNum + "\n剩余抽奖次数：" + $.prizeNum);
        } else {
          if (illill.data?.["bizMsg"]) {
            console.log("⏺️ " + illill.code + "-" + illill.data?.["bizMsg"]);
          } else {
            if (illill.code == 1000 && illill.errMsg == "未登录") {
              $.nologin = true;
              console.log("⏺️ " + illill.code + "-" + illill.errMsg);
            } else {
              illill.msg ? console.log("⏺️ " + illill.code + "-" + illill.msg) : console.log("❓" + l1l11 + " " + JSON.stringify(illill));
            }
          }
        }
        break;
      case "inviteFissionReceive":
        if (illill?.["code"] === 0 && illill?.["success"] === true) {
          $.inviteFissionReceive = illill?.["data"] || [];
          console.log("抽中提现金：" + ($.inviteFissionReceive?.["receiveList"][0]?.["amount"] || "未获得提现金") + " ,还需 " + $.inviteFissionReceive?.["leftAmount"] + " 提现金,进度值：" + $.inviteFissionReceive?.["rate"] + " %");
          $.inviteFissionReceive?.["state"] == 3 && console.log("已成功获得 " + $.inviteFissionReceive?.["amount"] + " 元提现金，快去提现吧！");
        } else {
          if (illill.code == 80209 && illill.errMsg == "活动太火爆，请稍候重试") {
            console.log("当期额外提现任务已完成，跳过");
            $.inviteFissionReceivehot = true;
          } else {
            illill.code == 80208 && illill.errMsg == "活动太火爆，请稍候重试" ? console.log("未获得提现金," + illill.errMsg) : console.log(illill.errMsg);
          }
        }
        break;
      case "inviteFissionDrawPrize":
        if (illill?.["code"] === 0 && illill?.["success"] === true) {
          $.hotproxy = false;
          $.drawnum = 0;
          $.inviteFissionDrawPrize = illill.data;
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
              $.hbnums = llIIII($.hbnum);
              console.log("抽中红包：" + $.hbprizeValue + " 🧧 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");
              break;
            case 4:
              $.xjprizeValue = $.inviteFissionDrawPrize?.["prizeValue"] || 0;
              $.xjnum = ($.xjprizeValue * 100 + $.xjnums * 100) / 100;
              $.xjnums = llIIII($.xjnum);
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
          if (illill.data?.["bizMsg"]) {
            console.log("⏺️ " + illill.code + "-" + illill.data?.["bizMsg"] + "}");
          } else {
            if (illill.code == 1000 && illill.errMsg == "未登录") {
              $.nologin = true;
              console.log("⏺️ " + illill.code + "-" + illill.errMsg);
            } else {
              if (illill.errMsg) {
                if (illill.errMsg.includes("火爆")) {
                  if ($.drawnum < i1lil) {
                    $.drawnum++;
                    console.log("⏺️ 未中奖 [" + $.drawnum + "]");
                    $.prizeNum++;
                  } else {
                    console.log("⏺️ 已达到设定重试值，退出执行!");
                    $.retryend = true;
                  }
                }
              } else {
                console.log("❓" + l1l11 + " " + JSON.stringify(illill));
              }
            }
          }
        }
        break;
    }
  } catch (liIlII) {
    console.log("❌ 未能正确处理 " + l1l11 + " 请求响应 " + (liIlII.message || liIlII));
  }
}
async function III1I1(iii1i) {
  let iliIi = "",
    iiil1I = "",
    llII11 = "POST",
    lIiI1 = "",
    IiIi1i = {};
  switch (iii1i) {
    case "inviteFissionReceive":
      IiIi1i = {
        appId: "b8469",
        functionId: "inviteFissionReceive",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: I1iIl
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      lIiI1 = await iiiI1l.getH5st(IiIi1i);
      iliIi = "https://api.m.jd.com/api";
      iiil1I = "" + lIiI1.params;
      break;
    case "inviteFissionBeforeHome":
      IiIi1i = {
        appId: "02f8d",
        functionId: "inviteFissionBeforeHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: I1iIl,
          isJdApp: true,
          inviter: ""
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      lIiI1 = await iiiI1l.getH5st(IiIi1i);
      iliIi = "https://api.m.jd.com/api";
      iiil1I = "" + lIiI1.params;
      break;
    case "inviteFissionHome":
      IiIi1i = {
        appId: "eb67b",
        functionId: "inviteFissionHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: I1iIl,
          inviter: ""
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      lIiI1 = await iiiI1l.getH5st(IiIi1i);
      iliIi = "https://api.m.jd.com/api";
      iiil1I = "" + lIiI1.params;
      break;
    case "inviteFissionDrawPrize":
      IiIi1i = {
        appId: "c02c6",
        functionId: "inviteFissionDrawPrize",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: I1iIl
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      lIiI1 = await iiiI1l.getH5st(IiIi1i);
      iliIi = "https://api.m.jd.com/api";
      iiil1I = "" + lIiI1.params;
      break;
    default:
      console.log("❌ 未知请求 " + iii1i);
      return;
  }
  const llII1l = {
    url: iliIi,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: ili1i,
      Host: "api.m.jd.com",
      Referer: "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      Origin: "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: iiil1I,
    timeout: 20000
  };
  const iil11l = 1;
  let IiIi1l = 0,
    llII1i = null,
    illI1I = false;
  while (IiIi1l < iil11l) {
    IiIi1l > 0 && (await $.wait(1000));
    const {
      err: ilIIll,
      res: iIliil,
      data: IIiill
    } = await ilI111(llII1l, llII11);
    if (ilIIll) {
      if (typeof ilIIll === "string" && ilIIll.includes("Timeout awaiting 'request'")) {
        llII1i = iii1i + " 请求超时，请检查网络重试";
      } else {
        const Iii1lI = iIliil?.["statusCode"];
        if (Iii1lI) {
          if ([403, 493].includes(Iii1lI)) {
            llII1i = iii1i + " 请求失败，IP被限制（Response code " + Iii1lI + "）";
            $.hotproxy = true;
            illI1I = true;
          } else {
            [400, 404].includes(Iii1lI) ? ($.hotproxy = true, llII1i = iii1i + " 请求配置参数错误，请联系开发者进行反馈（Response code " + Iii1lI + "）") : ($.hotproxy = true, llII1i = iii1i + " 请求失败（Response code " + Iii1lI + "）");
          }
        } else {
          $.hotproxy = true;
          llII1i = iii1i + " 请求失败 => " + (ilIIll.message || ilIIll);
        }
      }
      IiIi1l++;
    } else {
      try {
        const i11i1 = JSON.parse(IIiill);
        i1IilI(iii1i, i11i1);
        break;
      } catch (liIIi1) {
        llII1i = "❌ " + iii1i + " 接口响应数据解析失败: " + liIIi1.message;
        console.log("🚫 " + iii1i + " => " + String(IIiill || "无响应数据"));
        IiIi1l++;
      }
      illI1I = false;
    }
    IilII && Ili1II && i1lii && ($.hotproxy && (await ili1I(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + liI1Il, I1iIi = 0, $.hotproxy = false, console.log("📶 " + liI1Il)), I1iIi++);
  }
  IiIi1l >= iil11l && (console.log(llII1i), illI1I && ($.outFlag = true, $.message && $.message.fix(llII1i)));
}
async function ilI111(iIlii1, IIiil1 = "POST") {
  if (IIiil1 === "POST") {
    return new Promise(async IIiilI => {
      setTimeout(() => {
        $.post(iIlii1, (ii11, liIIil, liI1) => {
          IIiilI({
            err: ii11,
            res: liIIil,
            data: liI1
          });
        });
      }, 0);
    });
  } else {
    if (IIiil1 === "GET") {
      return new Promise(async Ii1I1 => {
        setTimeout(() => {
          $.get(iIlii1, (iIIIi, Il1iII, Iii1iI) => {
            Ii1I1({
              err: iIIIi,
              res: Il1iII,
              data: Iii1iI
            });
          });
        }, 0);
      });
    } else {
      const IIiiil = "不支持的请求方法";
      return {
        err: IIiiil,
        res: null,
        data: null
      };
    }
  }
}
async function I1IllI(iIIIl) {
  return new Promise(async l1iiI1 => {
    const lIi1li = {
        appId: "f2b1d",
        functionId: "superRedBagList",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          pageNum: $.pageNum,
          pageSize: 100,
          linkId: I1iIl,
          business: "fission"
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      Ii1Ii = await iiiI1l.getH5st(lIi1li);
    let Il1iIl = {
      url: "https://api.m.jd.com/api",
      body: "" + Ii1Ii.params,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: ili1i,
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.post(Il1iIl, async (lIi1ll, l1IIiI, IlilIi) => {
      try {
        if (lIi1ll) {
          console.log("" + JSON.stringify(lIi1ll));
        } else {
          IlilIi = JSON.parse(IlilIi);
          if (IlilIi) {
            if (IlilIi.code == 0 && IlilIi.success == true) {
              const IlilIl = (IlilIi.data.items || []).filter(iIlili => iIlili.prizeType === 4 && iIlili.state === 0 || iIlili.state === 2);
              for (let Ii1II of IlilIl) {
                console.log("抽现金抽奖提现，去提现[" + Ii1II.amount + "]现金");
                await IIlI11(Ii1II.id, Ii1II.poolBaseId, Ii1II.prizeGroupId, Ii1II.prizeBaseId, 0);
                await $.wait(parseInt(iiiI1I * 1 + 3000, 10));
                if ($.txhot) {
                  console.log("抽现金抽奖提现失败，" + $.apCashWithDrawmessage);
                  break;
                }
              }
            } else {
              console.log("抽现金抽奖提现查询奖品：异常:" + JSON.stringify(IlilIi));
            }
          }
        }
      } catch (iIlil1) {
        $.logErr(iIlil1, l1IIiI);
      } finally {
        l1iiI1();
      }
    });
  });
}
async function IIlI11(IlilII, iIII1, I1lil1, iIlilI, i11Ii1) {
  return new Promise(async li11iI => {
    const iIiiI1 = {
        appId: "8c6ae",
        functionId: "apCashWithDraw",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: I1iIl,
          businessSource: "NONE",
          base: {
            prizeType: 4,
            business: "fission",
            id: IlilII,
            poolBaseId: iIII1,
            prizeGroupId: I1lil1,
            prizeBaseId: iIlilI
          }
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      I1IIiI = await iiiI1l.getH5st(iIiiI1);
    let ilIli1 = {
      url: "https://api.m.jd.com/api",
      body: "" + I1IIiI.params,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: ili1i,
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.post(ilIli1, async (li11lI, l1I1ll, li1il) => {
      try {
        if (li11lI) {
          console.log("" + JSON.stringify(li11lI));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (ilI11I(li1il)) {
            li1il = $.toObj(li1il);
            if (li1il?.["code"] === 0) {
              if (li1il?.["data"]?.["status"] === "310") {
                console.log("提现[" + li1il?.["data"]?.["record"]?.["amount"] + "]现金成功！");
              } else {
                $.apCashWithDrawmessage = li1il?.["data"]?.["message"];
                console.log("提现现金失败:" + $.apCashWithDrawmessage);
                if ($.apCashWithDrawmessage.includes("上限") || $.apCashWithDrawmessage.includes("其它pin的订单")) {
                  if (l1lilI) {
                    await iIIll1(IlilII, iIII1, I1lil1, iIlilI);
                  } else {
                    !iilII1 && ($.txhot = true);
                  }
                } else {
                  if ($.apCashWithDrawmessage.includes("已存在状态")) {
                    i11Ii1 < l1lil1 && (await $.wait(parseInt(iiiI1I * 1 + 2000, 10)), i11Ii1++, await IIlI11(IlilII, iIII1, I1lil1, iIlilI, i11Ii1));
                  } else {
                    ($.apCashWithDrawmessage.includes("未绑定微信") || $.apCashWithDrawmessage.includes("绑定手机号")) && !iilII1 && ($.txhot = true);
                  }
                }
              }
            } else {
              console.log("提现现金异常:" + JSON.stringify(li1il));
            }
          }
        }
      } catch (IIlIII) {
        $.logErr(IIlIII, l1I1ll);
      } finally {
        li11iI(li1il);
      }
    });
  });
}
async function iIIll1(i1Iii, IIiI1I, lIi11l, i1IlI) {
  return new Promise(async IIiI1i => {
    const I1IIli = {
        appId: "8c6ae",
        functionId: "apRecompenseDrawPrize",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: I1iIl,
          businessSource: "fission",
          business: "business",
          drawRecordId: i1Iii,
          poolId: IIiI1I,
          prizeGroupId: lIi11l,
          prizeId: i1IlI
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      Il1I1i = await iiiI1l.getH5st(I1IIli);
    let lIilI1 = {
      url: "https://api.m.jd.com/api",
      body: "" + Il1I1i.params,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: ili1i,
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.post(lIilI1, async (I1IIll, i1Ii1, lIilII) => {
      try {
        I1IIll ? (console.log("" + JSON.stringify(I1IIll)), console.log($.name + " API请求失败，请检查网路重试")) : ilI11I(lIilII) && (lIilII = $.toObj(lIilII), lIilII.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + lIilII.errMsg));
      } catch (Ii1Iii) {
        $.logErr(Ii1Iii, i1Ii1);
      } finally {
        IIiI1i(lIilII);
      }
    });
  });
}
function llIIII(li1li) {
  var ll1Ii1 = Number(li1li);
  !isNaN(parseFloat(ll1Ii1)) && (ll1Ii1 = ll1Ii1.toFixed(2));
  return ll1Ii1;
}
function ilI11I(i1IiI) {
  try {
    if (typeof JSON.parse(i1IiI) == "object") {
      return true;
    }
  } catch (lIlll1) {
    console.log(lIlll1);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function ili1I() {
  return new Promise(async l1iI1i => {
    $.get({
      url: i1lii,
      timeout: {
        request: 5000
      }
    }, (iilIil, illI1i) => {
      if (illI1i) {
        try {
          let l1ll11 = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            I1I111 = l1ll11.exec(illI1i.body);
          liI1Il = I1I111[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + liI1Il;
        } catch (lIllli) {} finally {
          l1iI1i();
        }
      }
    });
  });
}
var version_ = "jsjiami.com.v7";