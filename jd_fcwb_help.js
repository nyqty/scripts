/*
欢乐淘金（发财挖宝）助力

入口：京东APP——玩一玩——欢乐淘金

地址：
https://bnzf.jd.com/?activityId=cNAsHasSnzWTAtWhIQR4dA   //需链接进入查看
https://bnzf.jd.com/?activityId=Bn1VWXtvgTv5ewPoMR-X8A  //app默认入口

环境变量：
JD_FCWB_ID // 指定活动ID  不指定默认 APP入口  格式：Bn1VWXtvgTv5ewPoMR-X8A 
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
const Iiil = require("./jdCookie"),
  IIIli = require("./function/sendJDNotify"),
  ii1i1 = require("./function/jdCommon"),
  Iiii = require("./function/krgetH5st"),
  llIl11 = process.env.JD_FCWB_Notify === "true",
  IIIll = process.env.JD_FCWB_InviterId || "",
  I1I1il = process.env.JD_FCWB_NUM;
let l1llii = process.env.JD_FCWB_ID || "Bn1VWXtvgTv5ewPoMR-X8A";
const liII1 = process.env.JD_FCWB_PROXY_OPEN === "true",
  I1I1ii = process.env.JD_FCWB_PROXY_TUNNRL,
  l1llil = process.env.JD_FCWB_PROXY_URL,
  IIIlIi = process.env.JD_FCWB_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let llIl1I = "",
  i1lIl1 = 0;
const liIli1 = "2";
let IIIlIl = parseInt(liIli1) * 1000;
liII1 && (I1I1ii || l1llil) && (IIIlIl = 100);
$.helpnum = 0;
$.FCWBEnd = false;
let IIIlI = false;
if (liII1) {
  IIIlI = true;
  try {
    require("global-agent/bootstrap");
    if (l1llil) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + l1llil + "\n");
      let ili1Il = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = ili1Il.exec(l1llil)[0] + "," + IIIlIi;
    } else {
      I1I1ii ? (global.GLOBAL_AGENT.HTTP_PROXY = I1I1ii, global.GLOBAL_AGENT.NO_PROXY = "" + IIIlIi, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_FCWB_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_FCWB_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (ili1Ii) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    IIIlI = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_FCWB_PROXY_OPEN='true' \n");
}
let IiiI = "";
const iIi1i = Object.keys(Iiil).map(Iilll1 => Iiil[Iilll1]).filter(ll11I => ll11I);
!iIi1i[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("❖ 当前设置活动ID为：" + l1llii);
  if (I1I1il) {
    console.log("❖ 已填写指定人数变量，指定人数 [" + I1I1il + "]");
  } else {
    console.log("❖ 未填写指定人数变量，默认全车助力");
  }
  if (IIIll) {
    let ll11l1 = IIIll.split("&");
    $.zdinviter = ll11l1[0];
    $.zdinviteCode = ll11l1[1];
    console.log("❖ 已填写指定助力变量，开始助力 [" + $.zdinviteCode + "]");
  } else {
    console.log("❖ 未填写指定助力变量，开始助力账号[1]");
  }
  IIIli.config({
    title: $.name
  });
  for (let ll111 = 0; ll111 < iIi1i.length; ll111++) {
    $.index = ll111 + 1;
    IiiI = iIi1i[ll111];
    ii1i1.setCookie(IiiI);
    $.UserName = decodeURIComponent(ii1i1.getCookieValue(IiiI, "pt_pin"));
    $.UA = ii1i1.genUA($.UserName);
    $.message = IIIli.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    if (liII1 && IIIlI) {
      l1llil && (i1lIl1 % 5 == 0 && (await iiIiI1(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + llIl1I), console.log("📶 " + llIl1I), i1lIl1++);
    }
    await l1iIll();
    ii1i1.unsetCookie();
    if ($.FCWBEnd || $.runEnd) {
      break;
    }
    await $.wait(parseInt(IIIlIl * 1 + 100, 10));
  }
  llIl11 && IIIli.getMessage() && (IIIli.updateContent(IIIli.content + "\n"), await IIIli.push());
})().catch(liIliI => $.logErr(liIliI)).finally(() => $.done());
async function l1iIll() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    if (IIIll) {
      await iIi1l($.zdinviteCode, $.zdinviter);
    } else {
      if ($.index == 1) {
        console.log("⏺️ 账号[1]获取助力信息");
        await l1iIli();
        if ($.runEnd) {
          return;
        }
      } else {
        await iIi1l($.myinviteCode, $.markedPin);
      }
    }
  } catch (ili1I1) {
    console.log(ili1I1.message);
  }
}
async function l1iIli() {
  $.happyDigHome = "";
  $.happyDigHelpList = "";
  await l1lliI("happyDigHome");
  if ($.runEnd) {
    return;
  }
  await $.wait(parseInt(IIIlIl * 1 + 100, 10));
  await l1lliI("happyDigHelpList");
  await $.wait(parseInt(IIIlIl * 1 + 100, 10));
  if ($.happyDigHome?.["markedPin"]) {
    $.myinviteCode = $.happyDigHome?.["inviteCode"];
    $.markedPin = $.happyDigHome?.["markedPin"];
    $.personNum = $.happyDigHelpList?.["personNum"] || 0;
    const IlI1li = new Date().valueOf(),
      IlI1ll = $.happyDigHome?.["leftTime"] + IlI1li,
      ll11l = $.time("yyyy-MM-dd HH:mm:ss", IlI1ll);
    console.log("⏺️ 已开启活动，结束时间：" + ll11l + "\n⏺️ 已有助力人数：" + $.personNum + "\n⏺️ 助力码：" + $.markedPin + "&" + $.myinviteCode);
  } else {
    console.log("⏺️ 未能正确获取到助力码，退出执行！");
    $.runEnd = true;
  }
}
async function iIi1l(l1llli, iI1lII) {
  $.inviteCode = l1llli;
  $.inviter = iI1lII;
  await l1lliI("happyDigHelp");
}
async function i1lIlI(I1I1ll, lil1i) {
  try {
    switch (I1I1ll) {
      case "happyDigHelp":
        if (lil1i?.["code"] === 0 && lil1i?.["success"] === true) {
          $.hotproxy = false;
          $.happyDigHelp = lil1i;
          switch ($.happyDigHelp?.["success"]) {
            case false:
              console.log("❎ " + lil1i.code + "-" + lil1i.errMsg);
              break;
            case true:
              if (IIIll) {
                $.helpnum++;
                console.log("✅ 助力成功 [" + $.helpnum + "]");
                if (I1I1il) {
                  if (I1I1il <= $.helpnum) {
                    console.log("✅ 当前助力已达到指定助力人数，退出！");
                    $.FCWBEnd = true;
                    return;
                  }
                }
              } else {
                $.personNum++;
                console.log("✅ 助力成功 [" + $.personNum + "]");
                if (I1I1il) {
                  if (I1I1il <= $.personNum) {
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
          if (lil1i.data?.["bizMsg"]) {
            console.log("> " + lil1i.code + "-" + lil1i.errMsg);
          } else {
            if (lil1i.errMsg) {
              console.log("> " + lil1i.code + "-" + lil1i.errMsg);
            } else {
              if (lil1i.msg) {
                console.log("> " + lil1i.code + "-" + lil1i.msg);
              } else {
                console.log("❓" + I1I1ll + " " + JSON.stringify(lil1i));
              }
            }
          }
        }
        break;
      case "happyDigHome":
        if (lil1i?.["code"] === 0 && lil1i?.["success"] === true) {
          $.hotproxy = false;
          $.happyDigHome = lil1i.data;
        } else {
          if (lil1i.data?.["bizMsg"]) {
            console.log("> " + lil1i.code + "-" + lil1i.data?.["bizMsg"] + "}");
          } else {
            if (lil1i.errMsg) {
              $.runEnd = true;
              console.log("> " + lil1i.code + "-" + lil1i.errMsg);
            } else {
              if (lil1i.msg) {
                console.log("> " + lil1i.code + "-" + lil1i.msg);
              } else {
                console.log("❓" + I1I1ll + " " + JSON.stringify(lil1i));
              }
            }
          }
        }
        break;
      case "happyDigHelpList":
        if (lil1i?.["code"] === 0 && lil1i?.["success"] === true) {
          $.hotproxy = false;
          $.happyDigHelpList = lil1i.data;
        } else {
          if (lil1i.data?.["bizMsg"]) {
            console.log("> " + lil1i.code + "-" + lil1i.data?.["bizMsg"]);
          } else {
            if (lil1i.errMsg) {
              $.runEnd = true;
              console.log("> " + lil1i.code + "-" + lil1i.errMsg);
            } else {
              lil1i.msg ? console.log("> " + lil1i.code + "-" + lil1i.msg) : console.log("❓" + I1I1ll + " " + JSON.stringify(lil1i));
            }
          }
        }
        break;
    }
  } catch (IliiI) {
    console.log("❌ 未能正确处理 " + I1I1ll + " 请求响应 " + (IliiI.message || IliiI));
  }
}
async function l1lliI(lI111i) {
  if ($.runEnd) {
    return;
  }
  let liIlll = "",
    I1iI1I = "",
    illll1 = "GET",
    IIIIl1 = "",
    liiilI = {};
  switch (lI111i) {
    case "happyDigHome":
      liiilI = {
        appId: "ce6c2",
        functionId: "happyDigHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: l1llii
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      IIIIl1 = await Iiii.getH5st(liiilI);
      liIlll = "https://api.m.jd.com/api?" + IIIIl1.params;
      break;
    case "happyDigHelpList":
      liiilI = {
        appId: "02f8d",
        functionId: "happyDigHelpList",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          pageNum: 1,
          pageSize: 50,
          linkId: l1llii
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      IIIIl1 = await Iiii.getH5st(liiilI);
      liIlll = "https://api.m.jd.com/api?" + IIIIl1.params;
      break;
    case "happyDigHelp":
      liiilI = {
        appId: "8dd95",
        functionId: "happyDigHelp",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: l1llii,
          inviter: $.inviter,
          inviteCode: $.inviteCode
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      IIIIl1 = await Iiii.getH5st(liiilI);
      liIlll = "https://api.m.jd.com/api?" + IIIIl1.params;
      break;
    default:
      console.log("❌ 未知请求 " + lI111i);
      return;
  }
  const lI111l = {
    url: liIlll,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: IiiI,
      Host: "api.m.jd.com",
      Referer: "https://bnzf.jd.com/index?activityId=" + l1llii + "&channel=wyw&utm_campaign=&utm_source=&utm_term=&utm_medium=&sid=&un_area=4_133_58530_0",
      Origin: "https://bnzf.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: I1iI1I,
    timeout: 20000
  };
  illll1 === "GET" && (delete lI111l.body, delete lI111l.headers["Content-Type"]);
  const liiii1 = 1;
  let IIiiIl = 0,
    l1ilIl = null,
    IIiiIi = false;
  while (IIiiIl < liiii1) {
    IIiiIl > 0 && (await $.wait(1000));
    const {
      err: Ilil1,
      res: IliII1,
      data: l1iIi1
    } = await I1I1iI(lI111l, illll1);
    if (Ilil1) {
      if (typeof Ilil1 === "string" && Ilil1.includes("Timeout awaiting 'request'")) {
        l1ilIl = lI111i + " 请求超时，请检查网络重试";
      } else {
        const llIil = IliII1?.["statusCode"];
        if (llIil) {
          if ([403, 493].includes(llIil)) {
            l1ilIl = lI111i + " 请求失败，IP被限制（Response code " + llIil + "）";
            $.hotproxy = true;
            IIiiIi = true;
          } else {
            [400, 404].includes(llIil) ? ($.hotproxy = true, l1ilIl = lI111i + " 请求配置参数错误，请联系开发者进行反馈（Response code " + llIil + "）") : ($.hotproxy = true, l1ilIl = lI111i + " 请求失败（Response code " + llIil + "）");
          }
        } else {
          $.hotproxy = true;
          l1ilIl = lI111i + " 请求失败 => " + (Ilil1.message || Ilil1);
        }
      }
      IIiiIl++;
    } else {
      const ii1IIi = false;
      try {
        const Ilili = JSON.parse(l1iIi1);
        i1lIlI(lI111i, Ilili);
        break;
      } catch (I1ll1I) {
        l1ilIl = "❌ " + lI111i + " 接口响应数据解析失败: " + I1ll1I.message;
        console.log("🚫 " + lI111i + " => " + String(l1iIi1 || "无响应数据"));
        ii1IIi && (console.log("\n---------------------------------------------------\n"), console.log("\n---------------------------------------------------\n"));
        IIiiIl++;
      }
      IIiiIi = false;
    }
    if (liII1 && IIIlI) {
      if (l1llil) {
        if ($.hotproxy) {
          await iiIiI1();
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + llIl1I;
          i1lIl1 = 0;
          $.hotproxy = false;
          console.log("📶 " + llIl1I);
        }
        i1lIl1++;
      }
    }
  }
  if (IIiiIl >= liiii1) {
    console.log(l1ilIl);
    if (IIiiIi) {
      $.outFlag = true;
      $.message && $.message.fix(l1ilIl);
    }
  }
}
async function I1I1iI(ii1l11, IIIIii = "POST") {
  if (IIIIii === "POST") {
    return new Promise(async Iii1Il => {
      $.post(ii1l11, (II1I1, i1i111, ii1l1I) => {
        Iii1Il({
          err: II1I1,
          res: i1i111,
          data: ii1l1I
        });
      });
    });
  } else {
    if (IIIIii === "GET") {
      return new Promise(async lIill1 => {
        $.get(ii1l11, (iiI1i1, ilIlII, iIiil1) => {
          lIill1({
            err: iiI1i1,
            res: ilIlII,
            data: iIiil1
          });
        });
      });
    } else {
      const IllllI = "不支持的请求方法";
      return {
        err: IllllI,
        res: null,
        data: null
      };
    }
  }
}
function IIIlII(liliil, I1iil1) {
  return Math.floor(Math.random() * (I1iil1 - liliil)) + liliil;
}
function iiIiI1() {
  return new Promise(async l1lI1I => {
    $.get({
      url: l1llil,
      timeout: {
        request: 5000
      }
    }, (i11lIl, l1lI11) => {
      if (l1lI11) {
        try {
          let lI1iii = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            i11lIi = lI1iii.exec(l1lI11.body);
          llIl1I = i11lIi[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + llIl1I;
        } catch (ll1ll1) {} finally {
          l1lI1I();
        }
      }
    });
  });
}