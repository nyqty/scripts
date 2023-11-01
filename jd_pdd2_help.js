/*
PDD每日红包助力

入口：京东APP——京东秒杀——种豆得豆-大额红包
链接：https://pro.m.jd.com/mall/active/3WijvBWPdCirCBr72TzkyiPhgdxJ/index.html

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
#PDD每日红包助力
1 1 1 1 * jd_pdd2_help.js, tag=PDD每日红包助力, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('PDD每日红包助力')

const ll11lI = require("./jdCookie"),
  llliI1 = require("./function/sendJDNotify"),
  liIII = require("./function/jdCommon"),
  llii11 = require("./function/krgetH5st"),
  Iillli = process.env.JD_PDD_Notify === "true",
  ll11l1 = process.env.JD_PDD_InviterId || "",
  ll111 = process.env.JD_PDD_NUM,
  llliII = "EcuVpjGGfccY3Ic_1ni83w",
  iiIiIl = process.env.JD_PDD_PROXY_OPEN === "true",
  IlI1l1 = process.env.JD_PDD_PROXY_TUNNRL,
  liIliI = process.env.JD_PDD_PROXY_URL,
  llii1I = process.env.JD_PDD_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let iiIiIi = "",
  l1lll1 = 0;
const IilI = "2";
let liIlli = parseInt(IilI) * 1000;
iiIiIl && (IlI1l1 || liIliI) && (liIlli = 100);
$.helpnum = 0;
$.PDDEnd = false;
let lil11 = false;
if (iiIiIl) {
  lil11 = true;
  try {
    require("global-agent/bootstrap");
    if (liIliI) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + liIliI + "\n");
      let I1I1li = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = I1I1li.exec(liIliI)[0] + "," + llii1I;
    } else {
      IlI1l1 ? (global.GLOBAL_AGENT.HTTP_PROXY = IlI1l1, global.GLOBAL_AGENT.NO_PROXY = "" + llii1I, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (l1i11) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    lil11 = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_PDD_PROXY_OPEN='true' \n");
}
let Iillll = "";
const lllI1 = Object.keys(ll11lI).map(IlI1li => ll11lI[IlI1li]).filter(IlI1ll => IlI1ll);
!lllI1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  authorCodeList = await liIllI("http://code.kingran.cf/yqlxj.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[ll11i(0, authorCodeList.length)];
  } else {
    let I1iI1l = ["JBEr_tnLmeUIhQslYOfOBvyElPCAhsyxwvd-gQNuvA0", "XDG-p9i7Z_8OKNbN_0YtP459s9TDLKqgoADgakmXaaw", "aN8mFXv3ct4DsDWk6uKZew", "QcG3ZyTya9XIXktPEBT7Aw"];
    $.authorCode = I1iI1l[ll11i(0, I1iI1l.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("❖ 已填写指定人数变量，指定人数 [" + ll111 + "]");
  ll11l1 ? console.log("❖ 已填写指定助力变量，开始助力 [" + ll11l1 + "]") : console.log("❖ 未填写指定助力变量，开始助力账号[1]");
  llliI1.config({
    title: $.name
  });
  for (let I1lIIl = 0; I1lIIl < lllI1.length; I1lIIl++) {
    $.index = I1lIIl + 1;
    Iillll = lllI1[I1lIIl];
    liIII.setCookie(Iillll);
    $.UserName = decodeURIComponent(liIII.getCookieValue(Iillll, "pt_pin"));
    $.UA = liIII.genUA($.UserName);
    $.message = llliI1.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    if (iiIiIl && lil11) {
      if (liIliI) {
        l1lll1 % 10 == 0 && (await iI1lI1(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + iiIiIi);
        console.log("📶 " + iiIiIi);
        l1lll1++;
      }
    }
    await III11I();
    liIII.unsetCookie();
    if ($.PDDEnd || $.runEnd) {
      break;
    }
    await $.wait(parseInt(liIlli * 1 + 100, 10));
  }
  Iillli && llliI1.getMessage() && (llliI1.updateContent(llliI1.content + "\n"), await llliI1.push());
})().catch(IIIIlI => $.logErr(IIIIlI)).finally(() => $.done());
async function III11I() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    if (ll11l1) {
      if ($.index == 1) {
        console.log("⏺️ 账号[1]默认去助力作者");
        await ll11i1($.authorCode);
      } else {
        await ll11i1(ll11l1);
      }
    } else {
      if ($.index == 1) {
        console.log("⏺️ 账号[1]默认去助力作者");
        await Ilii1();
        if ($.runEnd) {
          return;
        }
        await ll11i1($.authorCode);
      } else {
        await ll11i1($.shareinviter);
      }
    }
  } catch (IIIIl1) {
    console.log(IIIIl1.message);
  }
}
async function Ilii1() {
  await Iill("inviteFissionBeforeHome");
  if ($.runEnd) {
    return;
  }
  await $.wait(parseInt(liIlli * 1 + 100, 10));
  await Iill("inviteFissionHome");
  await $.wait(parseInt(liIlli * 1 + 100, 10));
  if ($.inviteFissionHome?.["inviter"]) {
    $.shareinviter = $.inviteFissionHome?.["inviter"];
    const ll11li = new Date().valueOf(),
      iliIlI = $.inviteFissionHome?.["countDownTime"] + ll11li,
      lI111I = $.time("yyyy-MM-dd HH:mm:ss", iliIlI);
    console.log("⏺️ 已开启活动，到期时间：" + lI111I + "\n⏺️ 助力码：" + $.shareinviter);
  } else {
    console.log("⏺️ 未能正确获取到助力码，退出执行！");
    $.runEnd = true;
  }
}
async function ll11i1(IlilI) {
  $.inviter = IlilI;
  await Iill("inviteFissionhelp");
}
async function ili1I1(liiiiI, II1i) {
  try {
    switch (liiiiI) {
      case "inviteFissionhelp":
        if (II1i?.["code"] === 0 && II1i?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionhelp = II1i.data;
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
                if (ll111) {
                  if (ll111 <= $.helpnum) {
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
          if (II1i.data?.["bizMsg"]) {
            console.log("> " + II1i.code + "-" + II1i.errMsg);
          } else {
            if (II1i.errMsg) {
              console.log("> " + II1i.code + "-" + II1i.errMsg);
            } else {
              II1i.msg ? console.log("> " + II1i.code + "-" + II1i.msg) : console.log("❓" + liiiiI + " " + JSON.stringify(II1i));
            }
          }
        }
        break;
      case "inviteFissionBeforeHome":
        if (II1i?.["code"] === 0 && II1i?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionBeforeHome = II1i.data;
        } else {
          if (II1i.data?.["bizMsg"]) {
            console.log("> " + II1i.code + "-" + II1i.data?.["bizMsg"] + "}");
          } else {
            if (II1i.errMsg) {
              $.runEnd = true;
              console.log("> " + II1i.code + "-" + II1i.errMsg);
            } else {
              if (II1i.msg) {
                console.log("> " + II1i.code + "-" + II1i.msg);
              } else {
                console.log("❓" + liiiiI + " " + JSON.stringify(II1i));
              }
            }
          }
        }
        break;
      case "inviteFissionHome":
        if (II1i?.["code"] === 0 && II1i?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionHome = II1i.data;
        } else {
          if (II1i.data?.["bizMsg"]) {
            console.log("> " + II1i.code + "-" + II1i.data?.["bizMsg"]);
          } else {
            if (II1i.errMsg) {
              $.runEnd = true;
              console.log("> " + II1i.code + "-" + II1i.errMsg);
            } else {
              II1i.msg ? console.log("> " + II1i.code + "-" + II1i.msg) : console.log("❓" + liiiiI + " " + JSON.stringify(II1i));
            }
          }
        }
        break;
    }
  } catch (Ilill) {
    console.log("❌ 未能正确处理 " + liiiiI + " 请求响应 " + (Ilill.message || Ilill));
  }
}
async function Iill(Ilili) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let Iii1I1 = "",
    i11iI1 = "",
    Iii1II = "POST",
    llIlI = "",
    l1iIil = {};
  switch (Ilili) {
    case "inviteFissionhelp":
      l1iIil = {
        appId: "c5389",
        functionId: "inviteFissionhelp",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: llliII,
          isJdApp: true,
          inviter: $.inviter
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      llIlI = await llii11.getH5st(l1iIil);
      Iii1I1 = "https://api.m.jd.com/api";
      i11iI1 = "" + llIlI.params;
      break;
    case "inviteFissionBeforeHome":
      l1iIil = {
        appId: "02f8d",
        functionId: "inviteFissionBeforeHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: llliII,
          isJdApp: true,
          inviter: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      llIlI = await llii11.getH5st(l1iIil);
      Iii1I1 = "https://api.m.jd.com/api";
      i11iI1 = "" + llIlI.params;
      break;
    case "inviteFissionHome":
      l1iIil = {
        appId: "eb67b",
        functionId: "inviteFissionHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: llliII,
          inviter: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      llIlI = await llii11.getH5st(l1iIil);
      Iii1I1 = "https://api.m.jd.com/api";
      i11iI1 = "" + llIlI.params;
      break;
    default:
      console.log("❌ 未知请求 " + Ilili);
      return;
  }
  const l1iIii = {
    url: Iii1I1,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: Iillll,
      Host: "api.m.jd.com",
      Referer: "https://pro.m.jd.com/mall/active/3WijvBWPdCirCBr72TzkyiPhgdxJ/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/mall/active/3WijvBWPdCirCBr72TzkyiPhgdxJ/index.html",
      Origin: "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: i11iI1,
    timeout: 20000
  };
  Iii1II === "GET" && (delete l1iIii.body, delete l1iIii.headers["Content-Type"]);
  const illllI = 1;
  let II1II = 0,
    ii1l11 = null,
    IIIIii = false;
  while (II1II < illllI) {
    II1II > 0 && (await $.wait(1000));
    const {
      err: iIiilI,
      res: iIiiil,
      data: iIiiii
    } = await ili1II(l1iIii, Iii1II);
    if (iIiilI) {
      if (typeof iIiilI === "string" && iIiilI.includes("Timeout awaiting 'request'")) {
        ii1l11 = Ilili + " 请求超时，请检查网络重试";
      } else {
        const l1lI1I = iIiiil?.["statusCode"];
        if (l1lI1I) {
          if ([403, 493].includes(l1lI1I)) {
            ii1l11 = Ilili + " 请求失败，IP被限制（Response code " + l1lI1I + "）";
            $.hotproxy = true;
            IIIIii = true;
          } else {
            [400, 404].includes(l1lI1I) ? ($.hotproxy = true, ii1l11 = Ilili + " 请求配置参数错误，请联系开发者进行反馈（Response code " + l1lI1I + "）") : ($.hotproxy = true, ii1l11 = Ilili + " 请求失败（Response code " + l1lI1I + "）");
          }
        } else {
          $.hotproxy = true;
          ii1l11 = Ilili + " 请求失败 => " + (iIiilI.message || iIiilI);
        }
      }
      II1II++;
    } else {
      const l1lI11 = false;
      try {
        const ll1ll1 = JSON.parse(iIiiii);
        ili1I1(Ilili, ll1ll1);
        break;
      } catch (lilil1) {
        ii1l11 = "❌ " + Ilili + " 接口响应数据解析失败: " + lilil1.message;
        console.log("🚫 " + Ilili + " => " + String(iIiiii || "无响应数据"));
        l1lI11 && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        II1II++;
      }
      IIIIii = false;
    }
    if (iiIiIl && lil11) {
      if (liIliI) {
        if ($.hotproxy) {
          await iI1lI1();
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + iiIiIi;
          l1lll1 = 0;
          $.hotproxy = false;
          console.log("📶 " + iiIiIi);
        }
        l1lll1++;
      }
    }
  }
  II1II >= illllI && (console.log(ii1l11), IIIIii && ($.outFlag = true, $.message && $.message.fix(ii1l11)));
}
async function ili1II(Illll1, lI1iil = "POST") {
  if (lI1iil === "POST") {
    return new Promise(async iIIlli => {
      $.post(Illll1, (ll1li1, iIIlll, I1iiiI) => {
        iIIlli({
          err: ll1li1,
          res: iIIlll,
          data: I1iiiI
        });
      });
    });
  } else {
    if (lI1iil === "GET") {
      return new Promise(async IIlil1 => {
        $.get(Illll1, (I1Illl, ll1lii, li11) => {
          IIlil1({
            err: I1Illl,
            res: ll1lii,
            data: li11
          });
        });
      });
    } else {
      const iiI1l1 = "不支持的请求方法";
      return {
        err: iiI1l1,
        res: null,
        data: null
      };
    }
  }
}
function liIllI(i11lI1) {
  return new Promise(IIliiI => {
    const i1111i = {
      url: "" + i11lI1,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i1111i, async (Illli1, ilIIii, l1111) => {
      try {
        if (!Illli1) {
          l1111 ? l1111 = JSON.parse(l1111) : console.log("未获取到数据,请重新运行");
        }
      } catch (iliiII) {
        $.logErr(iliiII, ilIIii);
        l1111 = null;
      } finally {
        IIliiI(l1111);
      }
    });
  });
}
function ll11i(lIiliI, iIiill) {
  return Math.floor(Math.random() * (iIiill - lIiliI)) + lIiliI;
}
function iI1lI1() {
  return new Promise(async Illlii => {
    $.get({
      url: liIliI,
      timeout: {
        request: 5000
      }
    }, (i11111, lIl1li) => {
      if (lIl1li) {
        try {
          let lIilii = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            lIilil = lIilii.exec(lIl1li.body);
          iiIiIi = lIilil[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + iiIiIi;
        } catch (lIl1ll) {} finally {
          Illlii();
        }
      }
    });
  });
}
