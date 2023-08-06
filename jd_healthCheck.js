/*
活动名称：账号健康检查 · 超级无线/超级会员

用于检测账号是否黑了，没有变量直接运行即可不适用一般活动

⚠ 请勿定时或频繁运行！

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#账号健康检查
1 1 1 1 * jd_healthCheck.js, tag=账号健康检查, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('账号健康检查（超级无线/超级会员）')
const Ill11 = require("./jdCookie"),
  liiIII = require("./function/jdCommon"),
  li1i11 = require("./function/krgetToken");
let iI11I1 = "",
  il1i1l = "",
  IlIlll = "";
const IIIl1I = Object.keys(Ill11).map(ii1ii1 => Ill11[ii1ii1]).filter(llllI => llllI);
!IIIl1I[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("此脚本仅用于检测账号是否黑号，请勿频繁运行！");
  for (let illlI1 = 0; illlI1 < IIIl1I.length; illlI1++) {
    $.index = illlI1 + 1;
    iI11I1 = IIIl1I[illlI1];
    IlIlll = IIIl1I[illlI1];
    $.UserName = decodeURIComponent(liiIII.getCookieValue(iI11I1, "pt_pin"));
    $.UA = liiIII.genUA($.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await iil1ii();
    if ($.outFlag) break;
  }
})().catch(I1lIi1 => $.logErr(I1lIi1)).finally(() => $.done());
async function iil1ii() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.secretPin = "";
    il1i1l = "";
    if ($.skipRun || $.outFlag) return;
    $.activityUrl = "https://lzkj-isv.isvjd.com/wxAssemblePage/activity";
    $.baseUrl = "https://lzkj-isv.isvjd.com";
    $.origin = $.baseUrl;
    $.token = await li1i11(IlIlll, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      return;
    }
    await i11ilI($.activityUrl);
    await $.wait(500);
    await il1i1i("getMyPing");
    if ($.outFlag) return;
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      return;
    } else {
      $.secretPin = encodeURIComponent($.secretPin);
      $.healthResult = true;
      await $.wait(500);
      await il1i1i("getUserInfo");
      $.healthResult ? console.log("lzkj 超级无线 ✅") : console.log("lzkj 超级无线 ❌");
    }
    il1i1l = "";
    $.secretPin = "";
    $.activityUrl = "https://cjhy-isv.isvjcloud.com/wxDrawActivity/activity";
    $.baseUrl = "https://cjhy-isv.isvjcloud.com";
    $.origin = $.baseUrl;
    await i11ilI($.activityUrl);
    await $.wait(500);
    await il1i1i("getMyPing");
    if ($.outFlag) return;
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      return;
    } else {
      $.secretPin = encodeURIComponent(encodeURIComponent($.secretPin));
      $.healthResult = true;
      await $.wait(500);
      await il1i1i("getUserInfo");
      $.healthResult ? console.log("cjhy 超级会员 ✅") : console.log("cjhy 超级会员 ❌");
    }
    await $.wait(500);
  } catch (Ill1i) {
    console.log(Ill1i);
  }
}
async function IlIlli(lllI1l, i11iii) {
  try {
    switch (lllI1l) {
      case "getMyPing":
        if (i11iii.result && i11iii.result === true) {
          if (i11iii?.["data"]?.["secretPin"]) $.secretPin = i11iii.data.secretPin;
          if (i11iii?.["data"]?.["nickname"]) $.nickname = i11iii.data.nickname;
        } else i11iii.errorMessage ? console.log("" + i11iii.errorMessage) : console.log("" + lI1llI);
        break;
      case "getUserInfo":
        const lI1llI = i11iii?.["data"];
        if (i11iii.result && i11iii.result === true) typeof lI1llI === "string" && lI1llI === "AUTH.FAILED.BLACK" && ($.healthResult = false);else i11iii.errorMessage ? typeof lI1llI === "string" && lI1llI === "AUTH.FAILED.BLACK" ? $.healthResult = false : console.log("" + i11iii.errorMessage) : console.log(lllI1l + " " + lI1llI);
        break;
    }
  } catch (lIli11) {
    console.log("❌ 未能正确处理 " + lllI1l + " 请求响应 " + (lIli11.message || lIli11));
  }
}
async function il1i1i(lillI1) {
  if ($.outFlag) return;
  let i1l1i1 = "",
    liil11 = "",
    iiillI = "POST";
  switch (lillI1) {
    case "getMyPing":
      i1l1i1 = $.baseUrl + "/customer/getMyPing";
      liil11 = "token=" + $.token + "&fromType=APP&userId=739130";
      break;
    case "getUserInfo":
      i1l1i1 = $.baseUrl + "/wxActionCommon/getUserInfo";
      liil11 = "pin=" + $.secretPin;
      break;
    default:
      console.log("❌ 未知请求 " + lillI1);
      return;
  }
  const l1l111 = {
      "url": i1l1i1,
      "method": iiillI,
      "headers": {
        "Origin": $.origin,
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": ($.secretPin ? "AUTH_C_USER=" + $.secretPin + ";" : "") + " " + il1i1l,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest",
        "Referer": $.activityUrl
      },
      "body": liil11,
      "timeout": 30000
    },
    l1iIII = 3;
  let llI1I1 = 0,
    IlIlil = null;
  while (llI1I1 < l1iIII) {
    llI1I1 > 0 && (await $.wait(1000));
    const {
      err: iiill1,
      res: lIli1i,
      data: IIIII1
    } = await lil111(l1l111, iiillI);
    if (iiill1) {
      if (typeof iiill1 === "string" && iiill1.includes("Timeout awaiting 'request'")) IlIlil = lillI1 + " 请求超时，请检查网络重试";else {
        const I1lIlI = lIli1i?.["statusCode"];
        if (I1lIlI) {
          if ([403, 493].includes(I1lIlI)) {
            IlIlil = lillI1 + " 此ip已被限制，请过10分钟后再执行脚本（Response code " + I1lIlI + "）";
            break;
          } else {
            if ([400, 404].includes(I1lIlI)) {
              IlIlil = lillI1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1lIlI + "）";
              break;
            } else {
              IlIlil = lillI1 + " 请求失败（Response code " + I1lIlI + "）";
              break;
            }
          }
        } else IlIlil = lillI1 + " API请求失败 => " + (iiill1.message || iiill1);
      }
      llI1I1++;
    } else {
      if (lIli1i?.["statusCode"] === 200) {
        il1i1l = liiIII.getResponseCookie(lIli1i, il1i1l);
        try {
          const llI1II = JSON.parse(IIIII1);
          IlIlli(lillI1, llI1II);
          break;
        } catch (lillIi) {
          IlIlil = "🚫 API请求失败，" + lillI1 + " 接口响应数据解析失败: " + lillIi.message;
          console.log(String(IIIII1));
          llI1I1++;
        }
        break;
      } else {
        IlIlil = lillI1 + " API请求失败，接口响应非200";
        if (IIIII1) {
          console.log(String(IIIII1));
        }
        llI1I1++;
      }
    }
  }
  llI1I1 >= l1iIII && ($.outFlag = true, console.log(IlIlil));
}
async function lil111(liil1i, lI1lil = "POST") {
  if (lI1lil === "POST") return new Promise(async iii1il => {
    $.post(liil1i, (liiI1i, ililIi, lilIIl) => {
      iii1il({
        "err": liiI1i,
        "res": ililIi,
        "data": lilIIl
      });
    });
  });else {
    if (lI1lil === "GET") return new Promise(async i1i11l => {
      $.get(liil1i, (Iil1lI, IiiliI, iii1iI) => {
        i1i11l({
          "err": Iil1lI,
          "res": IiiliI,
          "data": iii1iI
        });
      });
    });else {
      const IlllIl = "不支持的请求方法";
      return {
        "err": IlllIl,
        "res": null,
        "data": null
      };
    }
  }
}
function i11ilI(II11lI) {
  return $.skipRun = true, new Promise(iilll => {
    let il1iI1 = {
      "url": II11lI,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": II11lI,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(il1iI1, async (IlllIi, iIIiil, i1l1Ii) => {
      try {
        IlllIi ? (iIIiil && typeof iIIiil.statusCode != "undefined" && iIIiil.statusCode == 493 && console.log("此ip已被限制，请过10分钟后再执行脚本！"), console.log(String(IlllIi)), console.log("getFirstLZCK 请求失败，请检查网路重试")) : iIIiil.status == 200 && (il1i1l = liiIII.getResponseCookie(iIIiil, il1i1l), $.skipRun = false);
      } catch (I1iIIi) {
        $.logErr(I1iIIi, iIIiil);
      } finally {
        iilll();
      }
    });
  });
}