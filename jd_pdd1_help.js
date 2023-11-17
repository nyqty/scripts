/*
PDD转赚红包助力

入口：京东APP——玩一玩——转赚红包
链接：https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html

环境变量：
JD_PDD1_InviterId // 指定助力码 非必须，不填默认助力账号一
JD_PDD1_NUM // 指定人数  非必须，不填默认跑全部账号
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
var version_ = "jsjiami.com.v7";
const Iili = require("./jdCookie"),
  iIi11 = require("./function/sendJDNotify"),
  Iil1 = require("./function/jdCommon"),
  ll11lI = require("./function/krgetH5st"),
  llliI1 = process.env.JD_PDD1_Notify === "true",
  liIII = process.env.JD_PDD1_InviterId || "",
  llii11 = process.env.JD_PDD1_NUM,
  Iillli = "3orGfh1YkwNLksxOcN8zWQ",
  ll11l1 = process.env.JD_PDD_PROXY_OPEN === "true",
  ll111 = process.env.JD_PDD_PROXY_TUNNRL,
  llliII = process.env.JD_PDD_PROXY_URL,
  iiIiIl = process.env.JD_PDD_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let IlI1l1 = "",
  liIliI = 0;
const llii1I = "2";
let iiIiIi = parseInt(llii1I) * 1000;
ll11l1 && (ll111 || llliII) && (iiIiIi = 100);
$.helpnum = 0;
$.PDDEnd = false;
let l1lll1 = false;
if (ll11l1) {
  l1lll1 = true;
  try {
    require("global-agent/bootstrap");
    if (llliII) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + llliII + "\n");
      let liIllI = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = liIllI.exec(llliII)[0] + "," + iiIiIl;
    } else {
      ll111 ? (global.GLOBAL_AGENT.HTTP_PROXY = ll111, global.GLOBAL_AGENT.NO_PROXY = "" + iiIiIl, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (ll11i) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    l1lll1 = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_PDD_PROXY_OPEN='true' \n");
}
let IilI = "";
const liIlli = Object.keys(Iili).map(iI1lI1 => Iili[iI1lI1]).filter(I1I1li => I1I1li);
!liIlli[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  authorCodeList = await ili1I1("http://code.kingran.cf/yqlxj.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[Iill(0, authorCodeList.length)];
  } else {
    let l1i1l = ["JBEr_tnLmeUIhQslYOfOBvyElPCAhsyxwvd-gQNuvA0", "XDG-p9i7Z_8OKNbN_0YtP459s9TDLKqgoADgakmXaaw", "aN8mFXv3ct4DsDWk6uKZew", "QcG3ZyTya9XIXktPEBT7Aw"];
    $.authorCode = l1i1l[Iill(0, l1i1l.length)];
    console.log("❖ 准备就绪...\n");
  }
  console.log("❖ 已填写指定人数变量，指定人数 [" + llii11 + "]");
  if (liIII) {
    console.log("❖ 已填写指定助力变量，开始助力 [" + liIII + "]");
  } else {
    console.log("❖ 未填写指定助力变量，开始助力账号[1]");
  }
  iIi11.config({
    title: $.name
  });
  for (let Iliil = 0; Iliil < liIlli.length; Iliil++) {
    $.index = Iliil + 1;
    IilI = liIlli[Iliil];
    Iil1.setCookie(IilI);
    $.UserName = decodeURIComponent(Iil1.getCookieValue(IilI, "pt_pin"));
    $.UA = Iil1.genUA($.UserName);
    $.message = iIi11.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    ll11l1 && l1lll1 && llliII && (liIliI % 10 == 0 && (await ili1II(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IlI1l1), console.log("📶 " + IlI1l1), liIliI++);
    await lil11();
    Iil1.unsetCookie();
    if ($.PDDEnd || $.runEnd) {
      break;
    }
    await $.wait(parseInt(iiIiIi * 1 + 100, 10));
  }
  llliI1 && iIi11.getMessage() && (iIi11.updateContent(iIi11.content + "\n"), await iIi11.push());
})().catch(l1ilI1 => $.logErr(l1ilI1)).finally(() => $.done());
async function lil11() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    if (liIII) {
      $.index == 1 ? (console.log("⏺️ 账号[1]默认去助力作者"), await lllI1($.authorCode)) : await lllI1(liIII);
    } else {
      if ($.index == 1) {
        console.log("⏺️ 账号[1]默认去助力作者");
        await Iillll();
        if ($.runEnd) {
          return;
        }
        await lllI1($.authorCode);
      } else {
        await lllI1($.shareinviter);
      }
    }
  } catch (ll11li) {
    console.log(ll11li.message);
  }
}
async function Iillll() {
  await Ilii1("inviteFissionBeforeHome");
  if ($.runEnd) {
    return;
  }
  await $.wait(parseInt(iiIiIi * 1 + 100, 10));
  await Ilii1("inviteFissionHome");
  await $.wait(parseInt(iiIiIi * 1 + 100, 10));
  if ($.inviteFissionHome?.["inviter"]) {
    $.shareinviter = $.inviteFissionHome?.["inviter"];
    const iliIli = new Date().valueOf(),
      illliI = $.inviteFissionHome?.["countDownTime"] + iliIli,
      ii1III = $.time("yyyy-MM-dd HH:mm:ss", illliI);
    console.log("⏺️ 已开启活动，到期时间：" + ii1III + "\n⏺️ 助力码：" + $.shareinviter);
  } else {
    console.log("⏺️ 未能正确获取到助力码，退出执行！");
    $.runEnd = true;
  }
}
async function lllI1(i11iIl) {
  $.inviter = i11iIl;
  await Ilii1("inviteFissionhelp");
}
async function III11I(IIIIll, liiiii) {
  try {
    switch (IIIIll) {
      case "inviteFissionhelp":
        if (liiiii?.["code"] === 0 && liiiii?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionhelp = liiiii.data;
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
                if (llii11) {
                  if (llii11 <= $.helpnum) {
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
          if (liiiii.data?.["bizMsg"]) {
            console.log("> " + liiiii.code + "-" + liiiii.errMsg);
          } else {
            if (liiiii.errMsg) {
              console.log("> " + liiiii.code + "-" + liiiii.errMsg);
            } else {
              if (liiiii.msg) {
                console.log("> " + liiiii.code + "-" + liiiii.msg);
              } else {
                console.log("❓" + IIIIll + " " + JSON.stringify(liiiii));
              }
            }
          }
        }
        break;
      case "inviteFissionBeforeHome":
        if (liiiii?.["code"] === 0 && liiiii?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionBeforeHome = liiiii.data;
        } else {
          if (liiiii.data?.["bizMsg"]) {
            console.log("> " + liiiii.code + "-" + liiiii.data?.["bizMsg"] + "}");
          } else {
            if (liiiii.errMsg) {
              $.runEnd = true;
              console.log("> " + liiiii.code + "-" + liiiii.errMsg);
            } else {
              if (liiiii.msg) {
                console.log("> " + liiiii.code + "-" + liiiii.msg);
              } else {
                console.log("❓" + IIIIll + " " + JSON.stringify(liiiii));
              }
            }
          }
        }
        break;
      case "inviteFissionHome":
        if (liiiii?.["code"] === 0 && liiiii?.["success"] === true) {
          $.hotproxy = false;
          $.inviteFissionHome = liiiii.data;
        } else {
          if (liiiii.data?.["bizMsg"]) {
            console.log("> " + liiiii.code + "-" + liiiii.data?.["bizMsg"]);
          } else {
            if (liiiii.errMsg) {
              $.runEnd = true;
              console.log("> " + liiiii.code + "-" + liiiii.errMsg);
            } else {
              if (liiiii.msg) {
                console.log("> " + liiiii.code + "-" + liiiii.msg);
              } else {
                console.log("❓" + IIIIll + " " + JSON.stringify(liiiii));
              }
            }
          }
        }
        break;
    }
  } catch (liiili) {
    console.log("❌ 未能正确处理 " + IIIIll + " 请求响应 " + (liiili.message || liiili));
  }
}
async function Ilii1(lI1lIi) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let Iii1Il = "",
    i1l1I1 = "",
    lI1lI1 = "POST",
    llIl1 = "",
    l1iIiI = {};
  switch (lI1lIi) {
    case "inviteFissionhelp":
      l1iIiI = {
        appId: "c5389",
        functionId: "inviteFissionhelp",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: Iillli,
          isJdApp: true,
          inviter: $.inviter
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      llIl1 = await ll11lI.getH5st(l1iIiI);
      Iii1Il = "https://api.m.jd.com/api";
      i1l1I1 = "" + llIl1.params;
      break;
    case "inviteFissionBeforeHome":
      l1iIiI = {
        appId: "02f8d",
        functionId: "inviteFissionBeforeHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: Iillli,
          isJdApp: true,
          inviter: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      llIl1 = await ll11lI.getH5st(l1iIiI);
      Iii1Il = "https://api.m.jd.com/api";
      i1l1I1 = "" + llIl1.params;
      break;
    case "inviteFissionHome":
      l1iIiI = {
        appId: "eb67b",
        functionId: "inviteFissionHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: Iillli,
          inviter: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      llIl1 = await ll11lI.getH5st(l1iIiI);
      Iii1Il = "https://api.m.jd.com/api";
      i1l1I1 = "" + llIl1.params;
      break;
    default:
      console.log("❌ 未知请求 " + lI1lIi);
      return;
  }
  const illlli = {
    url: Iii1Il,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: IilI,
      Host: "api.m.jd.com",
      Referer: "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      Origin: "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: i1l1I1,
    timeout: 20000
  };
  lI1lI1 === "GET" && (delete illlli.body, delete illlli.headers["Content-Type"]);
  const illlll = 1;
  let IIIIiI = 0,
    II1I1 = null,
    i1i111 = false;
  while (IIIIiI < illlll) {
    IIIIiI > 0 && (await $.wait(1000));
    const {
      err: i11lIl,
      res: l1lI11,
      data: lI1iii
    } = await ll11i1(illlli, lI1lI1);
    if (i11lIl) {
      if (typeof i11lIl === "string" && i11lIl.includes("Timeout awaiting 'request'")) {
        II1I1 = lI1lIi + " 请求超时，请检查网络重试";
      } else {
        const ll1ll1 = l1lI11?.["statusCode"];
        if (ll1ll1) {
          if ([403, 493].includes(ll1ll1)) {
            II1I1 = lI1lIi + " 请求失败，IP被限制（Response code " + ll1ll1 + "）";
            $.hotproxy = true;
            i1i111 = true;
          } else {
            [400, 404].includes(ll1ll1) ? ($.hotproxy = true, II1I1 = lI1lIi + " 请求配置参数错误，请联系开发者进行反馈（Response code " + ll1ll1 + "）") : ($.hotproxy = true, II1I1 = lI1lIi + " 请求失败（Response code " + ll1ll1 + "）");
          }
        } else {
          $.hotproxy = true;
          II1I1 = lI1lIi + " 请求失败 => " + (i11lIl.message || i11lIl);
        }
      }
      IIIIiI++;
    } else {
      const I1iiii = false;
      try {
        const lI1iil = JSON.parse(lI1iii);
        III11I(lI1lIi, lI1iil);
        break;
      } catch (iIiiiI) {
        II1I1 = "❌ " + lI1lIi + " 接口响应数据解析失败: " + iIiiiI.message;
        console.log("🚫 " + lI1lIi + " => " + String(lI1iii || "无响应数据"));
        I1iiii && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        IIIIiI++;
      }
      i1i111 = false;
    }
    if (ll11l1 && l1lll1) {
      if (llliII) {
        if ($.hotproxy) {
          await ili1II();
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IlI1l1;
          liIliI = 0;
          $.hotproxy = false;
          console.log("📶 " + IlI1l1);
        }
        liIliI++;
      }
    }
  }
  IIIIiI >= illlll && (console.log(II1I1), i1i111 && ($.outFlag = true, $.message && $.message.fix(II1I1)));
}
async function ll11i1(lI1iiI, i11lII = "POST") {
  if (i11lII === "POST") {
    return new Promise(async ll1lil => {
      $.post(lI1iiI, (IIlilI, Illlll, Illlli) => {
        ll1lil({
          err: IIlilI,
          res: Illlll,
          data: Illlli
        });
      });
    });
  } else {
    if (i11lII === "GET") {
      return new Promise(async iiI1l1 => {
        $.get(lI1iiI, (lIl1il, Ii1l11, IIlii1) => {
          iiI1l1({
            err: lIl1il,
            res: Ii1l11,
            data: IIlii1
          });
        });
      });
    } else {
      const IliIlI = "不支持的请求方法";
      return {
        err: IliIlI,
        res: null,
        data: null
      };
    }
  }
}
function ili1I1(IIliiI) {
  return new Promise(li1i => {
    const ilIIil = {
      url: "" + IIliiI,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ilIIil, async (lIili1, li1l, iliiII) => {
      try {
        if (!lIili1) {
          iliiII ? iliiII = JSON.parse(iliiII) : console.log("未获取到数据,请重新运行");
        }
      } catch (IliIl1) {
        $.logErr(IliIl1, li1l);
        iliiII = null;
      } finally {
        li1i(iliiII);
      }
    });
  });
}
function Iill(iiI1ll, lIiliI) {
  return Math.floor(Math.random() * (lIiliI - iiI1ll)) + iiI1ll;
}
function ili1II() {
  return new Promise(async i1lll => {
    $.get({
      url: llliII,
      timeout: {
        request: 5000
      }
    }, (i11111, lIl1li) => {
      if (lIl1li) {
        try {
          let Il1I1 = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            lIilii = Il1I1.exec(lIl1li.body);
          IlI1l1 = lIilii[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IlI1l1;
        } catch (lIilil) {} finally {
          i1lll();
        }
      }
    });
  });
}
var version_ = "jsjiami.com.v7";