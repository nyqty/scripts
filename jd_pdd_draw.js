/*
PDD特价转盘抽奖提现

入口：特价版APP——幸运抽奖
链接：https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html

轮询提现变量：JD_PDD_TXNUM //轮询提现页数

提现间隔时间：JD_PDD_TXWAIT //提现兑换间隔，默认 3 秒

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
const $ = new Env('PDD特价转盘抽奖提现')

const lIilii = require("./jdCookie"),
  lIilil = require("./function/sendJDNotify"),
  lIl1ll = require("./function/jdCommon"),
  Ii111 = require("./function/krgetH5st"),
  Ii1III = process.env.JD_PDD_Notify === "true",
  ilIIi1 = process.env.JD_PDD_TXNUM || "1",
  l111i = process.env.JD_PDD_Exchange === "true",
  l111l = process.env.JD_PDD_TXWAIT || "3",
  I1iilI = "Wvzc_VpNTlSkiQdHT8r7QA",
  Ii1II1 = process.env.JD_PDD_PROXY_OPEN === "true",
  lilili = process.env.JD_PDD_PROXY_TUNNRL,
  IliIli = process.env.JD_PDD_PROXY_URL,
  lI1ilI = process.env.JD_PDD_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com",
  IllliI = 5;
let IliIll = "",
  iIiili = 0,
  lilill = parseInt(l111l) * 1000;
$.helpnum = 0;
$.PDDEnd = false;
let IilI1 = false;
if (Ii1II1) {
  IilI1 = true;
  try {
    require("global-agent/bootstrap");
    if (IliIli) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + IliIli + "\n");
      let i1IiiI = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = i1IiiI.exec(IliIli)[0] + "," + lI1ilI;
    } else {
      lilili ? (global.GLOBAL_AGENT.HTTP_PROXY = lilili, global.GLOBAL_AGENT.NO_PROXY = "" + lI1ilI, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (lI1I1I) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    IilI1 = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_PDD_PROXY_OPEN='true' \n");
}
let l1lI1 = "";
const Ili1I1 = Object.keys(lIilii).map(l1lII => lIilii[l1lII]).filter(lilI1l => lilI1l);
!Ili1I1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("⏺️ 提现上限后是否兑换红包:[" + l111i + "],提现间隔 [" + l111l + "] 秒");
  lIilil.config({
    title: $.name
  });
  for (let IIlI1l = 0; IIlI1l < Ili1I1.length; IIlI1l++) {
    $.index = IIlI1l + 1;
    l1lI1 = Ili1I1[IIlI1l];
    lIl1ll.setCookie(l1lI1);
    $.UserName = decodeURIComponent(lIl1ll.getCookieValue(l1lI1, "pt_pin"));
    $.UA = lIl1ll.genUA($.UserName, "lite");
    $.message = lIilil.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    Ii1II1 && IilI1 && IliIli && (iIiili % 10 == 0 && (await Il1Il(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IliIll), console.log("📶 " + IliIll), iIiili++);
    await lI1I1i();
    lIl1ll.unsetCookie();
    await $.wait(parseInt(2100, 10));
  }
  Ii1III && lIilil.getMessage() && (lIilil.updateContent(lIilil.content + "\n"), await lIilil.push());
})().catch(IilIl => $.logErr(IilIl)).finally(() => $.done());
async function lI1I1i() {
  $.hotproxy = false;
  $.txhot = false;
  $.inviteFissionReceivehot = false;
  $.stateEnd = false;
  $.nologin = false;
  $.cashVoKR = false;
  $.hbnums = 0;
  $.xjnums = 0;
  try {
    await i1Iii1("inviteFissionBeforeHome");
    if ($.nologin) {
      return;
    }
    await $.wait(parseInt(1500, 10));
    await i1Iii1("inviteFissionHome");
    if ($.nologin) {
      return;
    }
    await $.wait(parseInt(1500, 10));
    if (!$.nologin) {
      if ($.prizeNum > 0) {
        for (m = 1; $.prizeNum--; m++) {
          console.log("进行第" + m + "次抽奖");
          await i1Iii1("inviteFissionDrawPrize");
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          $.cashVoKR && !$.stateEnd && !$.inviteFissionReceivehot && I1iilI == "EcuVpjGGfccY3Ic_1ni83w" && (await inviteFissionReceive(), await $.wait(parseInt(Math.random() * 1000 + 2000, 10)));
        }
      }
      console.log("\n当前设置轮询提现页数：[" + ilIIi1 + "]");
      for (let iilIII = 0; iilIII < ilIIi1; iilIII++) {
        $.pageNum = iilIII + 1;
        console.log("\n开始轮询提现 [" + $.pageNum + "] 页");
        await I1Ili1($.pageNum);
        await $.wait(parseInt(lilill * 1 + 5000, 10));
        if ($.txhot) {
          break;
        }
      }
    }
  } catch (liI1Il) {
    console.log(liI1Il.message);
  }
}
async function liI1II(I1iIi, iiiI1I) {
  try {
    switch (I1iIi) {
      case "inviteFissionBeforeHome":
        if (iiiI1I?.["code"] === 0 && iiiI1I?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionBeforeHome = iiiI1I.data;
        } else {
          if (iiiI1I.data?.["bizMsg"]) {
            console.log("⏺️ " + iiiI1I.code + "-" + iiiI1I.data?.["bizMsg"] + "}");
          } else {
            if (iiiI1I.code == 1000 && iiiI1I.errMsg == "未登录") {
              $.nologin = true;
              console.log("⏺️ " + iiiI1I.code + "-" + iiiI1I.errMsg);
            } else {
              iiiI1I.msg ? console.log("⏺️ " + iiiI1I.code + "-" + iiiI1I.msg) : console.log("❓" + I1iIi + " " + JSON.stringify(iiiI1I));
            }
          }
        }
        break;
      case "inviteFissionHome":
        if (iiiI1I?.["code"] === 0 && iiiI1I?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionHome = iiiI1I?.["data"] || [];
          $.drawPrizeNum = $.inviteFissionHome?.["drawPrizeNum"] || 0;
          $.prizeNum = $.inviteFissionHome?.["prizeNum"] || 0;
          let lIIi1l = $.inviteFissionHome?.["inviter"] || "";
          const I1lI1i = new Date().valueOf(),
            illili = $.inviteFissionHome?.["countDownTime"] + I1lI1i,
            iiiII1 = $.time("yyyy-MM-dd HH:mm:ss", illili);
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
          console.log("到期时间：" + iiiII1 + "\n助力码：" + lIIi1l + "\n已抽奖次数：" + $.drawPrizeNum + "\n剩余抽奖次数：" + $.prizeNum);
        } else {
          if (iiiI1I.data?.["bizMsg"]) {
            console.log("⏺️ " + iiiI1I.code + "-" + iiiI1I.data?.["bizMsg"]);
          } else {
            if (iiiI1I.code == 1000 && iiiI1I.errMsg == "未登录") {
              $.nologin = true;
              console.log("⏺️ " + iiiI1I.code + "-" + iiiI1I.errMsg);
            } else {
              iiiI1I.msg ? console.log("⏺️ " + iiiI1I.code + "-" + iiiI1I.msg) : console.log("❓" + I1iIi + " " + JSON.stringify(iiiI1I));
            }
          }
        }
        break;
      case "inviteFissionReceive":
        if (iiiI1I?.["code"] === 0 && iiiI1I?.["success"] === true) {
          $.inviteFissionReceive = iiiI1I?.["data"] || [];
          console.log("抽中提现金：" + ($.inviteFissionReceive?.["receiveList"][0]?.["amount"] || "未获得提现金") + " ,还需 " + $.inviteFissionReceive?.["leftAmount"] + " 提现金,进度值：" + $.inviteFissionReceive?.["rate"] + " %");
          $.inviteFissionReceive?.["state"] == 3 && console.log("已成功获得 " + $.inviteFissionReceive?.["amount"] + " 元提现金，快去提现吧！");
        } else {
          if (iiiI1I.code == 80209 && iiiI1I.errMsg == "活动太火爆，请稍候重试") {
            console.log("当期额外提现任务已完成，跳过");
            $.inviteFissionReceivehot = true;
          } else {
            if (iiiI1I.code == 80208 && iiiI1I.errMsg == "活动太火爆，请稍候重试") {
              console.log("未获得提现金," + iiiI1I.errMsg);
            } else {
              console.log(iiiI1I.errMsg);
            }
          }
        }
        break;
      case "inviteFissionDrawPrize":
        if (iiiI1I?.["code"] === 0 && iiiI1I?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionDrawPrize = iiiI1I.data;
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
              $.hbnums = lilI1I($.hbnum);
              console.log("抽中红包：" + $.hbprizeValue + " 🧧 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");
              break;
            case 4:
              $.xjprizeValue = $.inviteFissionDrawPrize?.["prizeValue"] || 0;
              $.xjnum = ($.xjprizeValue * 100 + $.xjnums * 100) / 100;
              $.xjnums = lilI1I($.xjnum);
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
          if (iiiI1I.data?.["bizMsg"]) {
            console.log("⏺️ " + iiiI1I.code + "-" + iiiI1I.data?.["bizMsg"] + "}");
          } else {
            if (iiiI1I.code == 1000 && iiiI1I.errMsg == "未登录") {
              $.nologin = true;
              console.log("⏺️ " + iiiI1I.code + "-" + iiiI1I.errMsg);
            } else {
              iiiI1I.errMsg ? (console.log("⏺️ " + iiiI1I.code + "-" + iiiI1I.msg), iiiI1I.errMsg.includes("火爆") && $.prizeNum++) : console.log("❓" + I1iIi + " " + JSON.stringify(iiiI1I));
            }
          }
        }
        break;
    }
  } catch (l1IIii) {
    console.log("❌ 未能正确处理 " + I1iIi + " 请求响应 " + (l1IIii.message || l1IIii));
  }
}
async function i1Iii1(l1IIil) {
  let I1lI1I = "",
    lIi1i1 = "",
    l1l11 = "POST",
    illill = "",
    IIIli1 = {};
  switch (l1IIil) {
    case "inviteFissionReceive":
      IIIli1 = {
        appId: "b8469",
        functionId: "inviteFissionhelp",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: I1iilI
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      illill = await Ii111.getH5st(IIIli1);
      I1lI1I = "https://api.m.jd.com/api";
      lIi1i1 = "" + illill.params;
      break;
    case "inviteFissionBeforeHome":
      IIIli1 = {
        appId: "02f8d",
        functionId: "inviteFissionBeforeHome",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: I1iilI,
          isJdApp: true,
          inviter: ""
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      illill = await Ii111.getH5st(IIIli1);
      I1lI1I = "https://api.m.jd.com/api";
      lIi1i1 = "" + illill.params;
      break;
    case "inviteFissionHome":
      IIIli1 = {
        appId: "eb67b",
        functionId: "inviteFissionHome",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: I1iilI,
          inviter: ""
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      illill = await Ii111.getH5st(IIIli1);
      I1lI1I = "https://api.m.jd.com/api";
      lIi1i1 = "" + illill.params;
      break;
    case "inviteFissionDrawPrize":
      IIIli1 = {
        appId: "c02c6",
        functionId: "inviteFissionDrawPrize",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: I1iilI
        },
        version: "4.1",
        ua: $.UA,
        t: true
      };
      illill = await Ii111.getH5st(IIIli1);
      I1lI1I = "https://api.m.jd.com/api";
      lIi1i1 = "" + illill.params;
      break;
    default:
      console.log("❌ 未知请求 " + l1IIil);
      return;
  }
  const I1lI11 = {
    url: I1lI1I,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: l1lI1,
      Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
      Origin: "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: lIi1i1,
    timeout: 15000
  };
  l1l11 === "GET" && (delete I1lI11.body, delete I1lI11.headers["Content-Type"]);
  const I1I1Il = 1;
  let l1l1I = 0,
    iIlI1I = null,
    I1I1Ii = false;
  while (l1l1I < I1I1Il) {
    l1l1I > 0 && (await $.wait(1000));
    const {
      err: llIil1,
      res: iiiIII,
      data: Ill1I1
    } = await l1liii(I1lI11, l1l11);
    if (llIil1) {
      if (typeof llIil1 === "string" && llIil1.includes("Timeout awaiting 'request'")) {
        iIlI1I = l1IIil + " 请求超时，请检查网络重试";
      } else {
        const liI11i = iiiIII?.["statusCode"];
        if (liI11i) {
          if ([403, 493].includes(liI11i)) {
            iIlI1I = l1IIil + " 请求失败，IP被限制（Response code " + liI11i + "）";
            $.hotproxy = true;
            I1I1Ii = true;
          } else {
            [400, 404].includes(liI11i) ? ($.hotproxy = true, iIlI1I = l1IIil + " 请求配置参数错误，请联系开发者进行反馈（Response code " + liI11i + "）") : ($.hotproxy = true, iIlI1I = l1IIil + " 请求失败（Response code " + liI11i + "）");
          }
        } else {
          $.hotproxy = true;
          iIlI1I = l1IIil + " 请求失败 => " + (llIil1.message || llIil1);
        }
      }
      l1l1I++;
    } else {
      const iII1II = false;
      try {
        const I1I1I1 = JSON.parse(Ill1I1);
        liI1II(l1IIil, I1I1I1);
        break;
      } catch (IIIlil) {
        iIlI1I = "❌ " + l1IIil + " 接口响应数据解析失败: " + IIIlil.message;
        console.log("🚫 " + l1IIil + " => " + String(Ill1I1 || "无响应数据"));
        iII1II && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        l1l1I++;
      }
      I1I1Ii = false;
    }
    if (Ii1II1 && IilI1) {
      if (IliIli) {
        if ($.hotproxy) {
          await Il1Il();
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IliIll;
          iIiili = 0;
          $.hotproxy = false;
          console.log("📶 " + IliIll);
        }
        iIiili++;
      }
    }
  }
  l1l1I >= I1I1Il && (console.log(iIlI1I), I1I1Ii && ($.outFlag = true, $.message && $.message.fix(iIlI1I)));
}
async function l1liii(iillI1, i11l1 = "POST") {
  if (i11l1 === "POST") {
    return new Promise(async llII1l => {
      setTimeout(() => {
        $.post(iillI1, (illI1I, ilI1Ii, ilI1Il) => {
          llII1l({
            err: illI1I,
            res: ilI1Ii,
            data: ilI1Il
          });
        });
      }, 0);
    });
  } else {
    if (i11l1 === "GET") {
      return new Promise(async iliII => {
        setTimeout(() => {
          $.get(iillI1, (IiIi1I, iillIi, iii11) => {
            iliII({
              err: IiIi1I,
              res: iillIi,
              data: iii11
            });
          });
        }, 0);
      });
    } else {
      const l1lii1 = "不支持的请求方法";
      return {
        err: l1lii1,
        res: null,
        data: null
      };
    }
  }
}
async function I1Ili1(ii1i1i) {
  return new Promise(async ll11I1 => {
    const i11i1 = {
        appId: "f2b1d",
        functionId: "superRedBagList",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          pageNum: $.pageNum,
          pageSize: 100,
          linkId: I1iilI,
          business: "fission"
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      liIIi1 = await Ii111.getH5st(i11i1);
    let I1liiI = {
      url: "https://api.m.jd.com/api",
      body: "" + liIIi1.params,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: l1lI1,
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.post(I1liiI, async (l1I11l, iIliii, l1I11i) => {
      try {
        if (l1I11l) {
          console.log("" + JSON.stringify(l1I11l));
        } else {
          l1I11i = JSON.parse(l1I11i);
          if (l1I11i) {
            if (l1I11i.code == 0 && l1I11i.success == true) {
              const l1IlII = (l1I11i.data.items || []).filter(ii1i => ii1i.prizeType === 4 && ii1i.state === 0 || ii1i.state === 2);
              for (let ilIIl1 of l1IlII) {
                console.log("抽现金抽奖提现，去提现[" + ilIIl1.amount + "]现金");
                await l1liil(ilIIl1.id, ilIIl1.poolBaseId, ilIIl1.prizeGroupId, ilIIl1.prizeBaseId, 0);
                await $.wait(parseInt(lilill * 1 + 3000, 10));
                if ($.txhot) {
                  console.log("抽现金抽奖提现失败，" + $.apCashWithDrawmessage);
                  break;
                }
              }
            } else {
              console.log("抽现金抽奖提现查询奖品：异常:" + JSON.stringify(l1I11i));
            }
          }
        }
      } catch (liIi) {
        $.logErr(liIi, iIliii);
      } finally {
        ll11I1();
      }
    });
  });
}
async function l1liil(i11Ill, iliiIl, IliIii, liIIl1, iIliiI) {
  return new Promise(async Iii1iI => {
    const IIiiil = {
        appId: "8c6ae",
        functionId: "apCashWithDraw",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: I1iilI,
          businessSource: "NONE",
          base: {
            prizeType: 4,
            business: "fission",
            id: i11Ill,
            poolBaseId: iliiIl,
            prizeGroupId: IliIii,
            prizeBaseId: liIIl1
          }
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      iIIIl = await Ii111.getH5st(IIiiil);
    let IIiiii = {
      url: "https://api.m.jd.com/api",
      body: "" + iIIIl.params,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: l1lI1,
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.post(IIiiii, async (iIlili, Ii1II, Iii1l1) => {
      try {
        if (iIlili) {
          console.log("" + JSON.stringify(iIlili));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (lI1I1l(Iii1l1)) {
            Iii1l1 = $.toObj(Iii1l1);
            if (Iii1l1?.["code"] === 0) {
              if (Iii1l1?.["data"]?.["status"] === "310") {
                console.log("提现[" + Iii1l1?.["data"]?.["record"]?.["amount"] + "]现金成功！");
              } else {
                $.apCashWithDrawmessage = Iii1l1?.["data"]?.["message"];
                console.log("提现现金失败:" + $.apCashWithDrawmessage);
                if ($.apCashWithDrawmessage.includes("上限") || $.apCashWithDrawmessage.includes("其它pin的订单")) {
                  l111i == "true" ? await i1ll1(i11Ill, iliiIl, IliIii, liIIl1) : $.txhot = true;
                } else {
                  if ($.apCashWithDrawmessage.includes("已存在状态")) {
                    if (iIliiI < IllliI) {
                      await $.wait(parseInt(lilill * 1 + 2000, 10));
                      iIliiI++;
                      await l1liil(i11Ill, iliiIl, IliIii, liIIl1, iIliiI);
                    }
                  } else {
                    ($.apCashWithDrawmessage.includes("未绑定微信") || $.apCashWithDrawmessage.includes("绑定手机号")) && ($.txhot = true);
                  }
                }
              }
            } else {
              console.log("提现现金异常:" + JSON.stringify(Iii1l1));
            }
          }
        }
      } catch (liliI1) {
        $.logErr(liliI1, Ii1II);
      } finally {
        Iii1iI(Iii1l1);
      }
    });
  });
}
async function i1ll1(IIll1I, liii1I, lI1iIi, lIi1l) {
  return new Promise(async I1IIil => {
    const iIIIlI = {
        appId: "8c6ae",
        functionId: "apRecompenseDrawPrize",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: I1iilI,
          businessSource: "fission",
          business: "business",
          drawRecordId: IIll1I,
          poolId: liii1I,
          prizeGroupId: lI1iIi,
          prizeId: lIi1l
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      li11i1 = await Ii111.getH5st(iIIIlI);
    let II1l1 = {
      url: "https://api.m.jd.com/api",
      body: "" + li11i1.params,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: l1lI1,
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.post(II1l1, async (I1iiII, liliIi, i1Ili) => {
      try {
        I1iiII ? (console.log("" + JSON.stringify(I1iiII)), console.log($.name + " API请求失败，请检查网路重试")) : lI1I1l(i1Ili) && (i1Ili = $.toObj(i1Ili), i1Ili.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + i1Ili.errMsg));
      } catch (I1IIiI) {
        $.logErr(I1IIiI, liliIi);
      } finally {
        I1IIil(i1Ili);
      }
    });
  });
}
function lilI1I(l1I1li) {
  var lI1iI1 = Number(l1I1li);
  !isNaN(parseFloat(lI1iI1)) && (lI1iI1 = lI1iI1.toFixed(2));
  return lI1iI1;
}
function lI1I1l(ilIliI) {
  try {
    if (typeof JSON.parse(ilIliI) == "object") {
      return true;
    }
  } catch (ll1lII) {
    console.log(ll1lII);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function Il1Il() {
  return new Promise(async II1ll => {
    $.get({
      url: IliIli,
      timeout: {
        request: 5000
      }
    }, (liii11, lIiIii) => {
      if (lIiIii) {
        try {
          let lIl1II = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            Ii1Ili = lIl1II.exec(lIiIii.body);
          IliIll = Ii1Ili[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IliIll;
        } catch (IIiI11) {} finally {
          II1ll();
        }
      }
    });
  });
}
