/*
PDD特价转盘助力

入口：特价版APP——幸运抽奖
链接：https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html

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
#PDD特价转盘助力
1 1 1 1 * jd_pdd_help.js, tag=PDD特价转盘助力, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('PDD特价转盘助力')

const IlI1l1 = require("./jdCookie"),
  liIliI = require("./function/sendJDNotify"),
  llii1I = require("./function/jdCommon"),
  iiIiIi = require("./function/krgetH5st"),
  l1lll1 = process.env.JD_PDD_Notify === "true",
  IilI = process.env.JD_PDD_InviterId || "",
  liIlli = process.env.JD_PDD_NUM,
  lil11 = "Wvzc_VpNTlSkiQdHT8r7QA",
  Iillll = process.env.JD_PDD_PROXY_OPEN === "true",
  lllI1 = process.env.JD_PDD_PROXY_TUNNRL,
  III11I = process.env.JD_PDD_PROXY_URL,
  Ilii1 = process.env.JD_PDD_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let ll11i1 = "",
  ili1I1 = 0;
const Iill = "2";
let ili1II = parseInt(Iill) * 1000;
Iillll && (lllI1 || III11I) && (ili1II = 100);
$.helpnum = 0;
$.PDDEnd = false;
let liIllI = false;
if (Iillll) {
  liIllI = true;
  try {
    require("global-agent/bootstrap");
    if (III11I) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + III11I + "\n");
      let ll11iI = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = ll11iI.exec(III11I)[0] + "," + Ilii1;
    } else {
      lllI1 ? (global.GLOBAL_AGENT.HTTP_PROXY = lllI1, global.GLOBAL_AGENT.NO_PROXY = "" + Ilii1, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (l1i1I) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    liIllI = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_PDD_PROXY_OPEN='true' \n");
}
let ll11i = "";
const iI1lI1 = Object.keys(IlI1l1).map(l1llll => IlI1l1[l1llll]).filter(I1I1ll => I1I1ll);
!iI1lI1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  authorCodeList = await liIll1("http://code.kingran.cf/yqlxj.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[l1llli(0, authorCodeList.length)];
  } else {
    let lllII = ["JBEr_tnLmeUIhQslYOfOBvyElPCAhsyxwvd-gQNuvA0", "XDG-p9i7Z_8OKNbN_0YtP459s9TDLKqgoADgakmXaaw", "aN8mFXv3ct4DsDWk6uKZew", "QcG3ZyTya9XIXktPEBT7Aw"];
    $.authorCode = lllII[l1llli(0, lllII.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("❖ 已填写指定人数变量，指定人数 [" + liIlli + "]");
  IilI ? console.log("❖ 已填写指定助力变量，开始助力 [" + IilI + "]") : console.log("❖ 未填写指定助力变量，开始助力账号[1]");
  liIliI.config({
    title: $.name
  });
  for (let l11iII = 0; l11iII < iI1lI1.length; l11iII++) {
    $.index = l11iII + 1;
    ll11i = iI1lI1[l11iII];
    llii1I.setCookie(ll11i);
    $.UserName = decodeURIComponent(llii1I.getCookieValue(ll11i, "pt_pin"));
    $.UA = llii1I.genUA($.UserName, "lite");
    $.message = liIliI.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    Iillll && liIllI && III11I && (ili1I1 % 10 == 0 && (await iI1lII(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + ll11i1), console.log("📶 " + ll11i1), ili1I1++);
    await I1I1li();
    llii1I.unsetCookie();
    if ($.PDDEnd || $.runEnd) {
      break;
    }
    await $.wait(parseInt(ili1II * 1 + 100, 10));
  }
  l1lll1 && liIliI.getMessage() && (liIliI.updateContent(liIliI.content + "\n"), await liIliI.push());
})().catch(lI111i => $.logErr(lI111i)).finally(() => $.done());
async function I1I1li() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    if (IilI) {
      $.index == 1 ? (console.log("⏺️ 账号[1]默认去助力作者"), await IlI1li($.authorCode)) : await IlI1li(IilI);
    } else {
      if ($.index == 1) {
        console.log("⏺️ 账号[1]默认去助力作者");
        await l1i11();
        if ($.runEnd) {
          return;
        }
        await IlI1li($.authorCode);
      } else {
        await IlI1li($.shareinviter);
      }
    }
  } catch (l1ilIi) {
    console.log(l1ilIi.message);
  }
}
async function l1i11() {
  await ll11l("inviteFissionBeforeHome");
  if ($.runEnd) {
    return;
  }
  await $.wait(parseInt(ili1II * 1 + 100, 10));
  await ll11l("inviteFissionHome");
  await $.wait(parseInt(ili1II * 1 + 100, 10));
  if ($.inviteFissionHome?.["inviter"]) {
    $.shareinviter = $.inviteFissionHome?.["inviter"];
    const I1iI11 = new Date().valueOf(),
      II11 = $.inviteFissionHome?.["countDownTime"] + I1iI11,
      l1ilII = $.time("yyyy-MM-dd HH:mm:ss", II11);
    console.log("⏺️ 已开启活动，到期时间：" + l1ilII + "\n⏺️ 助力码：" + $.shareinviter);
  } else {
    console.log("⏺️ 未能正确获取到助力码，退出执行！");
    $.runEnd = true;
  }
}
async function IlI1li(ii1II1) {
  $.inviter = ii1II1;
  await ll11l("inviteFissionhelp");
}
async function IlI1ll(llliIl, iliIli) {
  try {
    switch (llliIl) {
      case "inviteFissionhelp":
        if (iliIli?.["code"] === 0 && iliIli?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionhelp = iliIli.data;
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
                if (liIlli) {
                  if (liIlli <= $.helpnum) {
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
          if (iliIli.data?.["bizMsg"]) {
            console.log("> " + iliIli.code + "-" + iliIli.errMsg);
          } else {
            if (iliIli.errMsg) {
              console.log("> " + iliIli.code + "-" + iliIli.errMsg);
            } else {
              if (iliIli.msg) {
                console.log("> " + iliIli.code + "-" + iliIli.msg);
              } else {
                console.log("❓" + llliIl + " " + JSON.stringify(iliIli));
              }
            }
          }
        }
        break;
      case "inviteFissionBeforeHome":
        if (iliIli?.["code"] === 0 && iliIli?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionBeforeHome = iliIli.data;
        } else {
          if (iliIli.data?.["bizMsg"]) {
            console.log("> " + iliIli.code + "-" + iliIli.data?.["bizMsg"] + "}");
          } else {
            if (iliIli.errMsg) {
              $.runEnd = true;
              console.log("> " + iliIli.code + "-" + iliIli.errMsg);
            } else {
              iliIli.msg ? console.log("> " + iliIli.code + "-" + iliIli.msg) : console.log("❓" + llliIl + " " + JSON.stringify(iliIli));
            }
          }
        }
        break;
      case "inviteFissionHome":
        if (iliIli?.["code"] === 0 && iliIli?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionHome = iliIli.data;
        } else {
          if (iliIli.data?.["bizMsg"]) {
            console.log("> " + iliIli.code + "-" + iliIli.data?.["bizMsg"]);
          } else {
            if (iliIli.errMsg) {
              $.runEnd = true;
              console.log("> " + iliIli.code + "-" + iliIli.errMsg);
            } else {
              iliIli.msg ? console.log("> " + iliIli.code + "-" + iliIli.msg) : console.log("❓" + llliIl + " " + JSON.stringify(iliIli));
            }
          }
        }
        break;
    }
  } catch (I1ll1I) {
    console.log("❌ 未能正确处理 " + llliIl + " 请求响应 " + (I1ll1I.message || I1ll1I));
  }
}
async function ll11l(i11iI1) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let llIlI = "",
    l1iIil = "",
    l1iIii = "POST",
    illllI = "",
    II1II = {};
  switch (i11iI1) {
    case "inviteFissionhelp":
      II1II = {
        appId: "c5389",
        functionId: "inviteFissionhelp",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: lil11,
          isJdApp: true,
          inviter: $.inviter
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      illllI = await iiIiIi.getH5st(II1II);
      llIlI = "https://api.m.jd.com/api";
      l1iIil = "" + illllI.params;
      break;
    case "inviteFissionBeforeHome":
      II1II = {
        appId: "02f8d",
        functionId: "inviteFissionBeforeHome",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: lil11,
          isJdApp: true,
          inviter: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      illllI = await iiIiIi.getH5st(II1II);
      llIlI = "https://api.m.jd.com/api";
      l1iIil = "" + illllI.params;
      break;
    case "inviteFissionHome":
      II1II = {
        appId: "eb67b",
        functionId: "inviteFissionHome",
        appid: "activities_platform",
        clientVersion: "6.14.0",
        client: "ios",
        body: {
          linkId: lil11,
          inviter: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      illllI = await iiIiIi.getH5st(II1II);
      llIlI = "https://api.m.jd.com/api";
      l1iIil = "" + illllI.params;
      break;
    default:
      console.log("❌ 未知请求 " + i11iI1);
      return;
  }
  const ii1l11 = {
    url: llIlI,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: ll11i,
      Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
      Origin: "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: l1iIil,
    timeout: 20000
  };
  const IIIIii = 1;
  let liiill = 0,
    IIIIil = null,
    lI1lIl = false;
  while (liiill < IIIIii) {
    liiill > 0 && (await $.wait(1000));
    const {
      err: ilIlIi,
      res: ilIlIl,
      data: l1lI1I
    } = await III111(ii1l11, l1iIii);
    if (ilIlIi) {
      if (typeof ilIlIi === "string" && ilIlIi.includes("Timeout awaiting 'request'")) {
        IIIIil = i11iI1 + " 请求超时，请检查网络重试";
      } else {
        const i11lIl = ilIlIl?.["statusCode"];
        if (i11lIl) {
          if ([403, 493].includes(i11lIl)) {
            IIIIil = i11iI1 + " 请求失败，IP被限制（Response code " + i11lIl + "）";
            $.hotproxy = true;
            lI1lIl = true;
          } else {
            [400, 404].includes(i11lIl) ? ($.hotproxy = true, IIIIil = i11iI1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + i11lIl + "）") : ($.hotproxy = true, IIIIil = i11iI1 + " 请求失败（Response code " + i11lIl + "）");
          }
        } else {
          $.hotproxy = true;
          IIIIil = i11iI1 + " 请求失败 => " + (ilIlIi.message || ilIlIi);
        }
      }
      liiill++;
    } else {
      const lIilll = false;
      try {
        const iIIlll = JSON.parse(l1lI1I);
        IlI1ll(i11iI1, iIIlll);
        break;
      } catch (I1iiiI) {
        IIIIil = "❌ " + i11iI1 + " 接口响应数据解析失败: " + I1iiiI.message;
        console.log("🚫 " + i11iI1 + " => " + String(l1lI1I || "无响应数据"));
        lIilll && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        liiill++;
      }
      lI1lIl = false;
    }
    if (Iillll && liIllI) {
      if (III11I) {
        if ($.hotproxy) {
          await iI1lII();
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + ll11i1;
          ili1I1 = 0;
          $.hotproxy = false;
          console.log("📶 " + ll11i1);
        }
        ili1I1++;
      }
    }
  }
  liiill >= IIIIii && (console.log(IIIIil), lI1lIl && ($.outFlag = true, $.message && $.message.fix(IIIIil)));
}
async function III111(li11, ilIlI1 = "POST") {
  if (ilIlI1 === "POST") {
    return new Promise(async iiI1l1 => {
      $.post(li11, (lIl1ii, lIl1il, Ii1l11) => {
        iiI1l1({
          err: lIl1ii,
          res: lIl1il,
          data: Ii1l11
        });
      });
    });
  } else {
    if (ilIlI1 === "GET") {
      return new Promise(async IIlii1 => {
        $.get(li11, (i1111i, iliiI1, Illli1) => {
          IIlii1({
            err: i1111i,
            res: iliiI1,
            data: Illli1
          });
        });
      });
    } else {
      const l1111 = "不支持的请求方法";
      return {
        err: l1111,
        res: null,
        data: null
      };
    }
  }
}
function liIll1(lIl1l1) {
  return new Promise(lIiliI => {
    const iIiill = {
      url: "" + lIl1l1,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iIiill, async (Ii1IIi, Ii1IIl, l111I) => {
      try {
        if (!Ii1IIi) {
          if (l111I) {
            l111I = JSON.parse(l111I);
          } else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (lililI) {
        $.logErr(lililI, Ii1IIl);
        l111I = null;
      } finally {
        lIiliI(l111I);
      }
    });
  });
}
function l1llli(lI1ili, Il1II) {
  return Math.floor(Math.random() * (Il1II - lI1ili)) + lI1ili;
}
function iI1lII() {
  return new Promise(async ilIIi1 => {
    $.get({
      url: III11I,
      timeout: {
        request: 5000
      }
    }, (IllliI, IliIll) => {
      if (IliIll) {
        try {
          let lilill = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            IilI1 = lilill.exec(IliIll.body);
          ll11i1 = IilI1[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + ll11i1;
        } catch (Ili1I1) {} finally {
          ilIIi1();
        }
      }
    });
  });
}
