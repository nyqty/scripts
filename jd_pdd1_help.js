/*
PDD转赚红包助力

入口：京东APP——玩一玩——转赚红包
链接：https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html?

环境变量：
JD_PDD_InviterId // 指定助力码 非必须，不填默认助力账号一
JD_PDD_NUM // 指定人数  非必须，不填默认跑全部账号
代理变量：
JD_PDD_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_PDD_PROXY_TUNNRL      // 代理池代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_PDD_PROXY_URL      // API代理地址变量，默认不开启，仅支持 数据格式:txt;提取数量:每次一个，格式为：http://api.xxx.xxx
JD_PDD_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#PDD转赚红包助力
1 1 1 1 * jd_pdd1_help.js, tag=PDD转赚红包助力, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('PDD转赚红包助力')

const ili1Ii = require("./jdCookie"),
  Iilll1 = require("./function/sendJDNotify"),
  ll11I = require("./function/jdCommon"),
  iIi1I = require("./function/krgetH5st"),
  liIIl = process.env.JD_PDD_Notify === "true",
  IlI1lI = process.env.JD_PDD_InviterId || "",
  liIIi = process.env.JD_PDD_NUM,
  IilllI = "3orGfh1YkwNLksxOcN8zWQ",
  iI1lIi = process.env.JD_PDD_PROXY_OPEN === "true",
  l1lllI = process.env.JD_PDD_PROXY_TUNNRL,
  llliIi = process.env.JD_PDD_PROXY_URL,
  i1lIli = process.env.JD_PDD_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let i1lIll = "",
  ll11ii = 0;
const liIlii = "2";
let llii1l = parseInt(liIlii) * 1000;
iI1lIi && (l1lllI || llliIi) && (llii1l = 100);
$.helpnum = 0;
$.PDDEnd = false;
let liIlil = false;
if (iI1lIi) {
  liIlil = true;
  try {
    require("global-agent/bootstrap");
    if (llliIi) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + llliIi + "\n");
      let Iillli = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = Iillli.exec(llliIi)[0] + "," + i1lIli;
    } else {
      l1lllI ? (global.GLOBAL_AGENT.HTTP_PROXY = l1lllI, global.GLOBAL_AGENT.NO_PROXY = "" + i1lIli, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (ll11l1) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    liIlil = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_PDD_PROXY_OPEN='true' \n");
}
let llii1i = "";
const ll11il = Object.keys(ili1Ii).map(ll111 => ili1Ii[ll111]).filter(llliII => llliII);
!ll11il[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  authorCodeList = await llliI1("http://code.kingran.cf/yqlxj.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[liIII(0, authorCodeList.length)];
  } else {
    let III111 = ["JBEr_tnLmeUIhQslYOfOBvyElPCAhsyxwvd-gQNuvA0", "XDG-p9i7Z_8OKNbN_0YtP459s9TDLKqgoADgakmXaaw", "aN8mFXv3ct4DsDWk6uKZew", "QcG3ZyTya9XIXktPEBT7Aw"];
    $.authorCode = III111[liIII(0, III111.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("❖ 已填写指定人数变量，指定人数 [" + liIIi + "]");
  IlI1lI ? console.log("❖ 已填写指定助力变量，开始助力 [" + IlI1lI + "]") : console.log("❖ 未填写指定助力变量，开始助力账号[1]");
  Iilll1.config({
    title: $.name
  });
  for (let liIll1 = 0; liIll1 < ll11il.length; liIll1++) {
    $.index = liIll1 + 1;
    llii1i = ll11il[liIll1];
    ll11I.setCookie(llii1i);
    $.UserName = decodeURIComponent(ll11I.getCookieValue(llii1i, "pt_pin"));
    $.UA = ll11I.genUA($.UserName);
    $.message = Iilll1.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    iI1lIi && liIlil && llliIi && (ll11ii % 10 == 0 && (await llii11(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1lIll), console.log("📶 " + i1lIll), ll11ii++);
    await iI1lIl();
    ll11I.unsetCookie();
    if ($.PDDEnd || $.runEnd) {
      break;
    }
    await $.wait(parseInt(llii1l * 1 + 100, 10));
  }
  liIIl && Iilll1.getMessage() && (Iilll1.updateContent(Iilll1.content + "\n"), await Iilll1.push());
})().catch(iI1lII => $.logErr(iI1lII)).finally(() => $.done());
async function iI1lIl() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    if (IlI1lI) {
      $.index == 1 ? (console.log("⏺️ 账号[1]默认去助力作者"), await Iili($.authorCode)) : await Iili(IlI1lI);
    } else {
      if ($.index == 1) {
        console.log("⏺️ 账号[1]默认去助力作者");
        await iiIiII();
        if ($.runEnd) {
          return;
        }
        await Iili($.authorCode);
      } else {
        await Iili($.shareinviter);
      }
    }
  } catch (l1i1l) {
    console.log(l1i1l.message);
  }
}
async function iiIiII() {
  await Iil1("inviteFissionBeforeHome");
  if ($.runEnd) {
    return;
  }
  await $.wait(parseInt(llii1l * 1 + 100, 10));
  await Iil1("inviteFissionHome");
  await $.wait(parseInt(llii1l * 1 + 100, 10));
  if ($.inviteFissionHome?.["inviter"]) {
    $.shareinviter = $.inviteFissionHome?.["inviter"];
    const IliiI = new Date().valueOf(),
      lI111i = $.inviteFissionHome?.["countDownTime"] + IliiI,
      I1lIII = $.time("yyyy-MM-dd HH:mm:ss", lI111i);
    console.log("⏺️ 已开启活动，到期时间：" + I1lIII + "\n⏺️ 助力码：" + $.shareinviter);
  } else {
    console.log("⏺️ 未能正确获取到助力码，退出执行！");
    $.runEnd = true;
  }
}
async function Iili(liIlll) {
  $.inviter = liIlll;
  await Iil1("inviteFissionhelp");
}
async function iIi11(liiilI, lI111l) {
  try {
    switch (liiilI) {
      case "inviteFissionhelp":
        if (lI111l?.["code"] === 0 && lI111l?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionhelp = lI111l.data;
          switch ($.inviteFissionhelp?.["helpResult"]) {
            case null:
              console.log("❌ 助力码未填写");
              break;
            case 0:
              console.log("❌ 不能自己助力自己");
              break;
            case 1:
              if ($.index == 1) {
                console.log("✅ 助力成功 [感谢]");
              } else {
                $.helpnum++;
                console.log("✅ 助力成功 [" + $.helpnum + "]");
                if (liIIi) {
                  if (liIIi <= $.helpnum) {
                    console.log("✅ 当前助力已达到指定助力人数，退出！");
                    $.PDDEnd = true;
                    return;
                  }
                }
              }
              break;
            case 2:
              console.log("❌ 活动火爆");
              break;
            case 3:
              console.log("❌ 没有助力次数");
              break;
            case 6:
              console.log("❌ 已助力过了");
              break;
            case 8:
              if ($.index == 1) {
                console.log("❌ 助力码失效，作者未开启活动！");
                break;
              } else {
                console.log("❌ 助力码失效，请先去开启新一轮活动后再运行吧！");
                return;
              }
            default:
              {
                console.log("[未知助力状态]:[" + helpResult + "]");
                $.hotproxy = true;
                break;
              }
          }
        } else {
          if (lI111l.data?.["bizMsg"]) {
            console.log("> " + lI111l.code + "-" + lI111l.errMsg);
          } else {
            if (lI111l.errMsg) {
              console.log("> " + lI111l.code + "-" + lI111l.errMsg);
            } else {
              lI111l.msg ? console.log("> " + lI111l.code + "-" + lI111l.msg) : console.log("❓" + liiilI + " " + JSON.stringify(lI111l));
            }
          }
        }
        break;
      case "inviteFissionBeforeHome":
        if (lI111l?.["code"] === 0 && lI111l?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionBeforeHome = lI111l.data;
        } else {
          if (lI111l.data?.["bizMsg"]) {
            console.log("> " + lI111l.code + "-" + lI111l.data?.["bizMsg"] + "}");
          } else {
            if (lI111l.errMsg) {
              $.runEnd = true;
              console.log("> " + lI111l.code + "-" + lI111l.errMsg);
            } else {
              lI111l.msg ? console.log("> " + lI111l.code + "-" + lI111l.msg) : console.log("❓" + liiilI + " " + JSON.stringify(lI111l));
            }
          }
        }
        break;
      case "inviteFissionHome":
        if (lI111l?.["code"] === 0 && lI111l?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionHome = lI111l.data;
        } else {
          if (lI111l.data?.["bizMsg"]) {
            console.log("> " + lI111l.code + "-" + lI111l.data?.["bizMsg"]);
          } else {
            if (lI111l.errMsg) {
              $.runEnd = true;
              console.log("> " + lI111l.code + "-" + lI111l.errMsg);
            } else {
              if (lI111l.msg) {
                console.log("> " + lI111l.code + "-" + lI111l.msg);
              } else {
                console.log("❓" + liiilI + " " + JSON.stringify(lI111l));
              }
            }
          }
        }
        break;
    }
  } catch (IIIIi1) {
    console.log("❌ 未能正确处理 " + liiilI + " 请求响应 " + (IIIIi1.message || IIIIi1));
  }
}
async function Iil1(ii1IIl) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let I1ll1l = "",
    I1ll1i = "",
    i11iII = "POST",
    lI1Ii1 = "",
    i1I11 = {};
  switch (ii1IIl) {
    case "inviteFissionhelp":
      i1I11 = {
        appId: "c5389",
        functionId: "inviteFissionhelp",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: IilllI,
          isJdApp: true,
          inviter: $.inviter
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      lI1Ii1 = await iIi1I.getH5st(i1I11);
      I1ll1l = "https://api.m.jd.com/api";
      I1ll1i = "" + lI1Ii1.params;
      break;
    case "inviteFissionBeforeHome":
      i1I11 = {
        appId: "02f8d",
        functionId: "inviteFissionBeforeHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: IilllI,
          isJdApp: true,
          inviter: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      lI1Ii1 = await iIi1I.getH5st(i1I11);
      I1ll1l = "https://api.m.jd.com/api";
      I1ll1i = "" + lI1Ii1.params;
      break;
    case "inviteFissionHome":
      i1I11 = {
        appId: "eb67b",
        functionId: "inviteFissionHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: IilllI,
          inviter: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      lI1Ii1 = await iIi1I.getH5st(i1I11);
      I1ll1l = "https://api.m.jd.com/api";
      I1ll1i = "" + lI1Ii1.params;
      break;
    default:
      console.log("❌ 未知请求 " + ii1IIl);
      return;
  }
  const I1I1i1 = {
    url: I1ll1l,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: llii1i,
      Host: "api.m.jd.com",
      Referer: "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      Origin: "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: I1ll1i,
    timeout: 20000
  };
  i11iII === "GET" && (delete I1I1i1.body, delete I1I1i1.headers["Content-Type"]);
  const i1I1l = 1;
  let i1I1i = 0,
    IIiiII = null,
    llIiI = false;
  while (i1I1i < i1I1l) {
    i1I1i > 0 && (await $.wait(1000));
    const {
      err: II1I1,
      res: i1i111,
      data: ii1l1I
    } = await ll11lI(I1I1i1, i11iII);
    if (II1I1) {
      if (typeof II1I1 === "string" && II1I1.includes("Timeout awaiting 'request'")) {
        IIiiII = ii1IIl + " 请求超时，请检查网络重试";
      } else {
        const iiI1i1 = i1i111?.["statusCode"];
        if (iiI1i1) {
          if ([403, 493].includes(iiI1i1)) {
            IIiiII = ii1IIl + " 请求失败，IP被限制（Response code " + iiI1i1 + "）";
            $.hotproxy = true;
            llIiI = true;
          } else {
            if ([400, 404].includes(iiI1i1)) {
              $.hotproxy = true;
              IIiiII = ii1IIl + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iiI1i1 + "）";
            } else {
              $.hotproxy = true;
              IIiiII = ii1IIl + " 请求失败（Response code " + iiI1i1 + "）";
            }
          }
        } else {
          $.hotproxy = true;
          IIiiII = ii1IIl + " 请求失败 => " + (II1I1.message || II1I1);
        }
      }
      i1I1i++;
    } else {
      const l1I1Ii = false;
      try {
        const IllllI = JSON.parse(ii1l1I);
        iIi11(ii1IIl, IllllI);
        break;
      } catch (liliil) {
        IIiiII = "❌ " + ii1IIl + " 接口响应数据解析失败: " + liliil.message;
        console.log("🚫 " + ii1IIl + " => " + String(ii1l1I || "无响应数据"));
        l1I1Ii && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        i1I1i++;
      }
      llIiI = false;
    }
    if (iI1lIi && liIlil) {
      if (llliIi) {
        $.hotproxy && (await llii11(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1lIll, ll11ii = 0, $.hotproxy = false, console.log("📶 " + i1lIll));
        ll11ii++;
      }
    }
  }
  i1I1i >= i1I1l && (console.log(IIiiII), llIiI && ($.outFlag = true, $.message && $.message.fix(IIiiII)));
}
async function ll11lI(ilIlIi, ilIlIl = "POST") {
  if (ilIlIl === "POST") {
    return new Promise(async lI1iil => {
      $.post(ilIlIi, (ilI11l, li1I, IIliil) => {
        lI1iil({
          err: ilI11l,
          res: li1I,
          data: IIliil
        });
      });
    });
  } else {
    if (ilIlIl === "GET") {
      return new Promise(async i11lII => {
        $.get(ilIlIi, (I1iii1, lilii1, iIiii1) => {
          i11lII({
            err: I1iii1,
            res: lilii1,
            data: iIiii1
          });
        });
      });
    } else {
      const IIlil1 = "不支持的请求方法";
      return {
        err: IIlil1,
        res: null,
        data: null
      };
    }
  }
}
function llliI1(I1Illl) {
  return new Promise(I1Illi => {
    const Illlll = {
      url: "" + I1Illl,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(Illlll, async (iiI1l1, i11lI1, liliiI) => {
      try {
        if (!iiI1l1) {
          liliiI ? liliiI = JSON.parse(liliiI) : console.log("未获取到数据,请重新运行");
        }
      } catch (IIlii1) {
        $.logErr(IIlii1, i11lI1);
        liliiI = null;
      } finally {
        I1Illi(liliiI);
      }
    });
  });
}
function liIII(IliIlI, IIliiI) {
  return Math.floor(Math.random() * (IIliiI - IliIlI)) + IliIlI;
}
function llii11() {
  return new Promise(async IliIl1 => {
    $.get({
      url: llliIi,
      timeout: {
        request: 5000
      }
    }, (iiI1ll, lIiliI) => {
      if (lIiliI) {
        try {
          let Ii1IIi = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            Ii1IIl = Ii1IIi.exec(lIiliI.body);
          i1lIll = Ii1IIl[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + i1lIll;
        } catch (l111I) {} finally {
          IliIl1();
        }
      }
    });
  });
}
