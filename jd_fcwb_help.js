/*
欢乐淘金（发财挖宝）助力

入口：京东APP——玩一玩——欢乐淘金

环境变量：
JD_FCWB_InviterId // 指定助力码 非必须，不填默认助力账号一  格式：inviterId&inviterCode
JD_FCWB_NUM // 指定人数  非必须，不填默认跑全部账号
代理变量： 本地IP理论正常助力，也无需开启代理
JD_FCWB_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_FCWB_PROXY_TUNNRL      // 代理池代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_FCWB_PROXY_URL      // API代理地址变量，默认不开启，仅支持 数据格式:txt;提取数量:每次一个，格式为：http://api.xxx.xxx
JD_FCWB_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#欢乐淘金（发财挖宝）助力
1 1 1 1 * jd_fcwb_help.js, tag=欢乐淘金（发财挖宝）助力, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('欢乐淘金(发财挖宝)助力')
const IIIlII = require("./jdCookie"),
  iiIiI1 = require("./function/sendJDNotify"),
  ili1Il = require("./function/jdCommon"),
  ili1Ii = require("./function/krgetH5st"),
  Iilll1 = process.env.JD_FCWB_Notify === "true",
  ll11I = process.env.JD_FCWB_InviterId || "",
  iIi1I = process.env.JD_FCWB_NUM,
  liIIl = "Bn1VWXtvgTv5ewPoMR-X8A",
  IlI1lI = process.env.JD_FCWB_PROXY_OPEN === "true",
  liIIi = process.env.JD_FCWB_PROXY_TUNNRL,
  IilllI = process.env.JD_FCWB_PROXY_URL,
  iI1lIi = process.env.JD_FCWB_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let l1lllI = "",
  llliIi = 0;
const i1lIli = "2";
let i1lIll = parseInt(i1lIli) * 1000;
IlI1lI && (liIIi || IilllI) && (i1lIll = 100);
$.helpnum = 0;
$.FCWBEnd = false;
let ll11ii = false;
if (IlI1lI) {
  ll11ii = true;
  try {
    require("global-agent/bootstrap");
    if (IilllI) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + IilllI + "\n");
      let ll11lI = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = ll11lI.exec(IilllI)[0] + "," + iI1lIi;
    } else {
      liIIi ? (global.GLOBAL_AGENT.HTTP_PROXY = liIIi, global.GLOBAL_AGENT.NO_PROXY = "" + iI1lIi, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_FCWB_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_FCWB_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (llliI1) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    ll11ii = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_FCWB_PROXY_OPEN='true' \n");
}
let liIlii = "";
const llii1l = Object.keys(IIIlII).map(liIII => IIIlII[liIII]).filter(llii11 => llii11);
!llii1l[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  iIi1I ? console.log("❖ 已填写指定人数变量，指定人数 [" + iIi1I + "]") : console.log("❖ 未填写指定人数变量，默认全车助力");
  if (ll11I) {
    let iI1lI1 = ll11I.split("&");
    $.zdinviter = iI1lI1[0];
    $.zdinviteCode = iI1lI1[1];
    console.log("❖ 已填写指定助力变量，开始助力 [" + $.zdinviteCode + "]");
  } else {
    console.log("❖ 未填写指定助力变量，开始助力账号[1]");
  }
  iiIiI1.config({
    title: $.name
  });
  for (let IlI1li = 0; IlI1li < llii1l.length; IlI1li++) {
    $.index = IlI1li + 1;
    liIlii = llii1l[IlI1li];
    ili1Il.setCookie(liIlii);
    $.UserName = decodeURIComponent(ili1Il.getCookieValue(liIlii, "pt_pin"));
    $.UA = ili1Il.genUA($.UserName);
    $.message = iiIiI1.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    IlI1lI && ll11ii && IilllI && (llliIi % 5 == 0 && (await Iil1(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + l1lllI), console.log("📶 " + l1lllI), llliIi++);
    await liIlil();
    ili1Il.unsetCookie();
    if ($.FCWBEnd || $.runEnd) {
      break;
    }
    await $.wait(parseInt(i1lIll * 1 + 100, 10));
  }
  if (Iilll1 && iiIiI1.getMessage()) {
    iiIiI1.updateContent(iiIiI1.content + "\n");
    await iiIiI1.push();
  }
})().catch(III111 => $.logErr(III111)).finally(() => $.done());
async function liIlil() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    if (ll11I) {
      await ll11il($.zdinviteCode, $.zdinviter);
    } else {
      if ($.index == 1) {
        console.log("⏺️ 账号[1]获取助力信息");
        await llii1i();
        if ($.runEnd) {
          return;
        }
      } else {
        await ll11il($.myinviteCode, $.markedPin);
      }
    }
  } catch (l1i1l) {
    console.log(l1i1l.message);
  }
}
async function llii1i() {
  $.happyDigHome = "";
  $.happyDigHelpList = "";
  await iiIiII("happyDigHome");
  if ($.runEnd) {
    return;
  }
  await $.wait(parseInt(i1lIll * 1 + 100, 10));
  await iiIiII("happyDigHelpList");
  await $.wait(parseInt(i1lIll * 1 + 100, 10));
  if ($.happyDigHome?.["markedPin"]) {
    $.myinviteCode = $.happyDigHome?.["inviteCode"];
    $.markedPin = $.happyDigHome?.["markedPin"];
    $.personNum = $.happyDigHelpList?.["personNum"] || 0;
    const l1i11i = new Date().valueOf(),
      l11iI1 = $.happyDigHome?.["leftTime"] + l1i11i,
      IliiI = $.time("yyyy-MM-dd HH:mm:ss", l11iI1);
    console.log("⏺️ 已开启活动，结束时间：" + IliiI + "\n⏺️ 已有助力人数：" + $.personNum + "\n⏺️ 助力码：" + $.markedPin + "&" + $.myinviteCode);
  } else {
    console.log("⏺️ 未能正确获取到助力码，退出执行！");
    $.runEnd = true;
  }
}
async function ll11il(I1lIII, liIlll) {
  $.inviteCode = I1lIII;
  $.inviter = liIlll;
  await iiIiII("happyDigHelp");
}
async function iI1lIl(I1iI1I, illll1) {
  try {
    switch (I1iI1I) {
      case "happyDigHelp":
        if (illll1?.["code"] === 0 && illll1?.["success"] === true) {
          $.hotproxy = false;
          $.happyDigHelp = illll1;
          switch ($.happyDigHelp?.["success"]) {
            case false:
              console.log("❎ " + illll1.code + "-" + illll1.errMsg);
              break;
            case true:
              if (ll11I) {
                $.helpnum++;
                console.log("✅ 助力成功 [" + $.helpnum + "]");
                if (iIi1I) {
                  if (iIi1I <= $.helpnum) {
                    console.log("✅ 当前助力已达到指定助力人数，退出！");
                    $.FCWBEnd = true;
                    return;
                  }
                }
              } else {
                $.personNum++;
                console.log("✅ 助力成功 [" + $.personNum + "]");
                if (iIi1I) {
                  if (iIi1I <= $.personNum) {
                    console.log("✅ 当前助力已达到指定助力人数，退出！");
                    $.FCWBEnd = true;
                    return;
                  }
                }
              }
              break;
            default:
              {
                console.log("[未知助力状态]:[" + $.happyDigHelp + "]");
                $.hotproxy = true;
                break;
              }
          }
        } else {
          if (illll1.data?.["bizMsg"]) {
            console.log("> " + illll1.code + "-" + illll1.errMsg);
          } else {
            if (illll1.errMsg) {
              console.log("> " + illll1.code + "-" + illll1.errMsg);
            } else {
              if (illll1.msg) {
                console.log("> " + illll1.code + "-" + illll1.msg);
              } else {
                console.log("❓" + I1iI1I + " " + JSON.stringify(illll1));
              }
            }
          }
        }
        break;
      case "happyDigHome":
        if (illll1?.["code"] === 0 && illll1?.["success"] === true) {
          $.hotproxy = false;
          $.happyDigHome = illll1.data;
        } else {
          if (illll1.data?.["bizMsg"]) {
            console.log("> " + illll1.code + "-" + illll1.data?.["bizMsg"] + "}");
          } else {
            if (illll1.errMsg) {
              $.runEnd = true;
              console.log("> " + illll1.code + "-" + illll1.errMsg);
            } else {
              illll1.msg ? console.log("> " + illll1.code + "-" + illll1.msg) : console.log("❓" + I1iI1I + " " + JSON.stringify(illll1));
            }
          }
        }
        break;
      case "happyDigHelpList":
        if (illll1?.["code"] === 0 && illll1?.["success"] === true) {
          $.hotproxy = false;
          $.happyDigHelpList = illll1.data;
        } else {
          if (illll1.data?.["bizMsg"]) {
            console.log("> " + illll1.code + "-" + illll1.data?.["bizMsg"]);
          } else {
            if (illll1.errMsg) {
              $.runEnd = true;
              console.log("> " + illll1.code + "-" + illll1.errMsg);
            } else {
              illll1.msg ? console.log("> " + illll1.code + "-" + illll1.msg) : console.log("❓" + I1iI1I + " " + JSON.stringify(illll1));
            }
          }
        }
        break;
    }
  } catch (i1I1I) {
    console.log("❌ 未能正确处理 " + I1iI1I + " 请求响应 " + (i1I1I.message || i1I1I));
  }
}
async function iiIiII(llIil) {
  if ($.runEnd) {
    return;
  }
  let IIiiI1 = "",
    IIIIi1 = "",
    ii1IIl = "GET",
    ii1IIi = "",
    I1ll1l = {};
  switch (llIil) {
    case "happyDigHome":
      I1ll1l = {
        appId: "ce6c2",
        functionId: "happyDigHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: liIIl
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      ii1IIi = await ili1Ii.getH5st(I1ll1l);
      IIiiI1 = "https://api.m.jd.com/api?" + ii1IIi.params;
      break;
    case "happyDigHelpList":
      I1ll1l = {
        appId: "02f8d",
        functionId: "happyDigHelpList",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          pageNum: 1,
          pageSize: 50,
          linkId: liIIl
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      ii1IIi = await ili1Ii.getH5st(I1ll1l);
      IIiiI1 = "https://api.m.jd.com/api?" + ii1IIi.params;
      break;
    case "happyDigHelp":
      I1ll1l = {
        appId: "8dd95",
        functionId: "happyDigHelp",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: liIIl,
          inviter: $.inviter,
          inviteCode: $.inviteCode
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      ii1IIi = await ili1Ii.getH5st(I1ll1l);
      IIiiI1 = "https://api.m.jd.com/api?" + ii1IIi.params;
      break;
    default:
      console.log("❌ 未知请求 " + llIil);
      return;
  }
  const I1ll1i = {
    url: IIiiI1,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: liIlii,
      Host: "api.m.jd.com",
      Referer: "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      Origin: "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: IIIIi1,
    timeout: 20000
  };
  ii1IIl === "GET" && (delete I1ll1i.body, delete I1ll1i.headers["Content-Type"]);
  const i11iII = 1;
  let lI1Ii1 = 0,
    i1I11 = null,
    I1I1i1 = false;
  while (lI1Ii1 < i11iII) {
    lI1Ii1 > 0 && (await $.wait(1000));
    const {
      err: lI1lII,
      res: lIill1,
      data: iiI1i1
    } = await Iili(I1ll1i, ii1IIl);
    if (lI1lII) {
      if (typeof lI1lII === "string" && lI1lII.includes("Timeout awaiting 'request'")) {
        i1I11 = llIil + " 请求超时，请检查网络重试";
      } else {
        const IllllI = lIill1?.["statusCode"];
        if (IllllI) {
          if ([403, 493].includes(IllllI)) {
            i1I11 = llIil + " 请求失败，IP被限制（Response code " + IllllI + "）";
            $.hotproxy = true;
            I1I1i1 = true;
          } else {
            [400, 404].includes(IllllI) ? ($.hotproxy = true, i1I11 = llIil + " 请求配置参数错误，请联系开发者进行反馈（Response code " + IllllI + "）") : ($.hotproxy = true, i1I11 = llIil + " 请求失败（Response code " + IllllI + "）");
          }
        } else {
          $.hotproxy = true;
          i1I11 = llIil + " 请求失败 => " + (lI1lII.message || lI1lII);
        }
      }
      lI1Ii1++;
    } else {
      const liliii = false;
      try {
        const ilIlIi = JSON.parse(iiI1i1);
        iI1lIl(llIil, ilIlIi);
        break;
      } catch (ilIlIl) {
        i1I11 = "❌ " + llIil + " 接口响应数据解析失败: " + ilIlIl.message;
        console.log("🚫 " + llIil + " => " + String(iiI1i1 || "无响应数据"));
        liliii && (console.log("\n---------------------------------------------------\n"), console.log("\n---------------------------------------------------\n"));
        lI1Ii1++;
      }
      I1I1i1 = false;
    }
    if (IlI1lI && ll11ii) {
      if (IilllI) {
        $.hotproxy && (await Iil1(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + l1lllI, llliIi = 0, $.hotproxy = false, console.log("📶 " + l1lllI));
        llliIi++;
      }
    }
  }
  if (lI1Ii1 >= i11iII) {
    console.log(i1I11);
    I1I1i1 && ($.outFlag = true, $.message && $.message.fix(i1I11));
  }
}
async function Iili(lI1iil, lIilll = "POST") {
  if (lIilll === "POST") {
    return new Promise(async i11lII => {
      $.post(lI1iil, (lilii1, iIiii1, ll1lil) => {
        i11lII({
          err: lilii1,
          res: iIiii1,
          data: ll1lil
        });
      });
    });
  } else {
    if (lIilll === "GET") {
      return new Promise(async I1Illl => {
        $.get(lI1iil, (ll1lii, li11, ilIlI1) => {
          I1Illl({
            err: ll1lii,
            res: li11,
            data: ilIlI1
          });
        });
      });
    } else {
      const IIlilI = "不支持的请求方法";
      return {
        err: IIlilI,
        res: null,
        data: null
      };
    }
  }
}
function iIi11(Illlll, Illlli) {
  return Math.floor(Math.random() * (Illlli - Illlll)) + Illlll;
}
function Iil1() {
  return new Promise(async liliiI => {
    $.get({
      url: IilllI,
      timeout: {
        request: 5000
      }
    }, (ilIIiI, lIl1ii) => {
      if (lIl1ii) {
        try {
          let lIl1il = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            Ii1l11 = lIl1il.exec(lIl1ii.body);
          l1lllI = Ii1l11[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + l1lllI;
        } catch (IIlii1) {} finally {
          liliiI();
        }
      }
    });
  });
}