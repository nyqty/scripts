/*
小豆签到

cron: 35 9 * * * jd_krsign.js

*/

const Env=require('./utils/Env.js');
const $ = new Env('小豆签到')
const ilIi1ill = require("./jdCookie"),
  li1ll = require("./function/sendJDNotify"),
  IiIil111 = require("./function/jdCommon"),
  i1IIli1l = false;
let iIIlil1I = "";
const iI1liIli = Object.keys(ilIi1ill).map(IIiIliiI => ilIi1ill[IIiIliiI]).filter(II1il1Il => II1il1Il);
!iI1liIli[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  li1ll.config({
    "title": $.name
  });
  for (let ilI1il11 = 0; ilI1il11 < iI1liIli.length; ilI1il11++) {
    $.index = ilI1il11 + 1;
    iIIlil1I = iI1liIli[ilI1il11];
    IiIil111.setCookie(iIIlil1I);
    $.UserName = decodeURIComponent(IiIil111.getCookieValue(iIIlil1I, "pt_pin"));
    $.UA = IiIil111.genUA($.UserName);
    $.message = li1ll.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await liIiI111();
    IiIil111.unsetCookie();
    if ($.runEnd) break;
    await $.wait(1000);
  }
  i1IIli1l && li1ll.getMessage() && (li1ll.updateContent(li1ll.content + ("\n【店铺地址】https://shop.m.jd.com/?shopId=" + $.shopId + "&venderId=" + $.venderId)), await li1ll.push());
})().catch(II1iIiIl => $.logErr(II1iIiIl)).finally(() => $.done());
async function liIiI111() {
  const Ii1l1lli = await IiIil111.getLoginStatus(iIIlil1I);
  if (!Ii1l1lli && typeof Ii1l1lli !== undefined) {
    console.log("账号无效");
    return;
  }
  try {
    await llI1iIi("main");
  } catch (ii1l1lIi) {
    console.log(ii1l1lIi.message);
  }
}
async function l1ili1ll(liIlli11, lIII111I) {
  try {
    switch (liIlli11) {
      case "main":
        if (lIII111I.success === true && lIII111I?.["data"]?.["signResultDTO"]) {
          const l1iilIiI = lIII111I?.["data"]?.["signResultDTO"];
          l1iilIiI?.["signStatus"] ? console.log("签到成功" + (l1iilIiI?.["rewardMsg"] ? "，" + l1iilIiI?.["rewardMsg"] : "")) : l1iilIiI?.["msg"] === "任务已完成" ? (console.log("今日已签"), $.message.fix("今日已签")) : (console.log("签到失败，" + l1iilIiI?.["msg"]), $.message.fix("签到失败，" + l1iilIiI?.["msg"]));
        } else lIII111I.msg ? (console.log(lIII111I.msg), $.message.fix(lIII111I.msg)) : console.log("❓" + liIlli11 + " " + JSON.stringify(lIII111I));
        break;
    }
  } catch (lIiii1I1) {
    console.log("❌ 未能正确处理 " + liIlli11 + " 请求响应 " + (lIiii1I1.message || lIiii1I1));
  }
}
async function llI1iIi(IlIIi1l1) {
  if ($.runEnd || $.outFlag) return;
  let li1llllI = "",
    iIIIiill = {},
    I1il1i1i = "POST";
  switch (IlIIi1l1) {
    case "main":
      iIIIiill = "appid=laputa&functionId=jdh_laputa_handleSoaRequest&body=" + encodeURIComponent(JSON.stringify({
        "methodName": "handleBeanInfo2595",
        "functionId": "sign",
        "osName": "feedProduct",
        "appId": "807635028594484682708c54f69b1217",
        "version": "1",
        "deviceNo": "a73dece2-61b4-435b-9f0e-10bf337279f1",
        "handleType": "sign",
        "encryptProjectId": "3vRVP84ukngNhNYVDQTXuQQzJjit",
        "encryptAssignmentIds": ["3LbDQhTDsr5n7wL4XPyubMvEuUR3"],
        "deviceType": 1,
        "lng": 115.491643,
        "lat": 38.897564,
        "itemId": "1"
      })), li1llllI = "https://api.m.jd.com/api";
      break;
    default:
      console.log("❌ 未知请求 " + IlIIi1l1);
      return;
  }
  const IlliI1Ii = {
    "url": li1llllI,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": iIIlil1I,
      "Host": "api.m.jd.com",
      "Referer": "https://pro.m.jd.com/mall/active/2KMRByvMg6Z2nwDmQ1StFTtKJc81/index.html",
      "Origin": "https://pro.m.jd.com",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    "body": iIIIiill,
    "timeout": 30000
  };
  if ($.token) {
    IlliI1Ii.headers.token = $.token;
  }
  if (I1il1i1i === "GET") {
    delete IlliI1Ii.body;
    delete IlliI1Ii.headers["Content-Type"];
  }
  const Ii1I1Ill = 5;
  let iIlllli1 = 0,
    liiil1ii = null,
    lli1111l = false;
  while (iIlllli1 < Ii1I1Ill) {
    iIlllli1 > 0 && (await $.wait(1000));
    const {
      err: il1111il,
      res: illIIIll,
      data: l1Il1IiI
    } = await l1liiIII(IlliI1Ii, I1il1i1i);
    if (il1111il) {
      if (typeof il1111il === "string" && il1111il.includes("Timeout awaiting 'request'")) liiil1ii = IlIIi1l1 + " 请求超时，请检查网络重试";else {
        const l1lIli1l = illIIIll?.["statusCode"];
        if (l1lIli1l) {
          if ([403, 493].includes(l1lIli1l)) liiil1ii = IlIIi1l1 + " 请求失败，IP被限制（Response code " + l1lIli1l + "）", lli1111l = true;else [400, 404].includes(l1lIli1l) ? liiil1ii = IlIIi1l1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + l1lIli1l + "）" : liiil1ii = IlIIi1l1 + " 请求失败（Response code " + l1lIli1l + "）";
        } else liiil1ii = IlIIi1l1 + " 请求失败 => " + (il1111il.message || il1111il);
      }
      iIlllli1++;
    } else {
      const IllIi1I = IiIil111.getResponseCookie(illIIIll),
        IIII11il = false;
      IIII11il && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + IlIIi1l1 + " 响应Body => " + (l1Il1IiI || "无") + "\n"), console.log("🔧 " + IlIIi1l1 + " 响应Cookie => " + (IllIi1I || "无") + "\n"), console.log("🔧 " + IlIIi1l1 + " 请求参数"), console.log(IlliI1Ii), console.log("\n---------------------------------------------------\n"));
      try {
        const l1ll111l = JSON.parse(l1Il1IiI);
        l1ili1ll(IlIIi1l1, l1ll111l);
        break;
      } catch (ll1l11l) {
        liiil1ii = "❌ " + IlIIi1l1 + " 接口响应数据解析失败: " + ll1l11l.message;
        console.log("🚫 " + IlIIi1l1 + " => " + String(l1Il1IiI || "无响应数据"));
        IIII11il && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        iIlllli1++;
      }
      lli1111l = false;
    }
  }
  iIlllli1 >= Ii1I1Ill && (console.log(liiil1ii), lli1111l && ($.outFlag = true, $.message && $.message.fix(liiil1ii)));
}
async function l1liiIII(lill11iI, IlillI1i = "POST") {
  if (IlillI1i === "POST") {
    return new Promise(async ll1i1Ill => {
      $.post(lill11iI, (Iilii11l, ii11iIl1, ilii1Iii) => {
        ll1i1Ill({
          "err": Iilii11l,
          "res": ii11iIl1,
          "data": ilii1Iii
        });
      });
    });
  } else {
    if (IlillI1i === "GET") return new Promise(async l11II1l => {
      $.get(lill11iI, (liII11l1, Ii1lIi1i, Il1I11il) => {
        l11II1l({
          "err": liII11l1,
          "res": Ii1lIi1i,
          "data": Il1I11il
        });
      });
    });else {
      const Iiil11il = "不支持的请求方法";
      return {
        "err": Iiil11il,
        "res": null,
        "data": null
      };
    }
  }
}