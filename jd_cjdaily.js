/*
CJ每日抢好礼通用活动

变量：
//export jd_cjdaily_activityId="活动ID"
//export jd_cjdaily_blacklist="" // 黑名单 用&隔开 pin值
//export JD_CJ_OPEN="false" //关闭CJ相关活动运行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#CJ每日抢好礼通用活动
1 1 1 1 * jd_cjdaily.js, tag=CJ每日抢好礼通用活动, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('CJ每日抢好礼通用活动');
const llI1llI = $.isNode() ? require("./jdCookie.js") : "",
  Il1I1II = require("./function/krgetToken");
let li11ill1 = "https://cjhy-isv.isvjcloud.com",
  Ii1lIi1 = [],
  ll111I1I = "";
if ($.isNode()) {
  Object.keys(llI1llI).forEach(I11lII1l => {
    Ii1lIi1.push(llI1llI[I11lII1l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Ii1lIi1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Iilil11i($.getdata("CookiesJD") || "[]").map(li1llIiI => li1llIiI.cookie)].filter(iIIIi1Ii => !!iIIIi1Ii);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let I1iliIil = "",
  l1iliil1 = "",
  l1IiiIli = {},
  li111l11 = "",
  IilIIIII = ["来晚了", "抢光了", "已发完", "已领完", "非法操作", "奖品发送失败", "未开始", "发放完", "全部被领取", "余额不足", "已结束", "京豆计划"];
li111l11 = $.isNode() ? process.env.jd_cjdaily_activityId ? process.env.jd_cjdaily_activityId : "" + li111l11 : $.getdata("jd_cjdaily_activityId") ? $.getdata("jd_cjdaily_activityId") : "" + li111l11;
let ili1il = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  II1IIll = "",
  I1i1iIl1 = "";
$.whitelist = process.env.jd_cjdaily_whitelist || II1IIll;
$.blacklist = process.env.jd_cjdaily_blacklist || I1i1iIl1;
IlIlI1il();
llli1lIi();
!(async () => {
  if (ili1il === "false") {
    console.log("\n❌  已设置全局关闭CJ相关活动\n");
    return;
  }
  if (!li111l11) {
    console.log("\n请填写CJ每日抢好礼的活动ID,变量是jd_cjdaily_activityId\n");
    return;
  }
  if (!Ii1lIi1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = li111l11;
  console.log("活动入口: https://cjhy-isv.isvjcloud.com/activity/daily/wx/indexPage?activityId=" + $.activityId);
  for (let l11iiI1l = 0; l11iiI1l < Ii1lIi1.length; l11iiI1l++) {
    ll111I1I = Ii1lIi1[l11iiI1l];
    originCookie = Ii1lIi1[l11iiI1l];
    if (ll111I1I) {
      $.UserName = decodeURIComponent(ll111I1I.match(/pt_pin=([^; ]+)(?=;?)/) && ll111I1I.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l11iiI1l + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await II1ii1l1();
      await ilIil1i();
      if ($.outFlag || $.activityEnd) break;
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(IlIi1il => $.logErr(IlIi1il)).finally(() => $.done());
async function ilIil1i() {
  try {
    $.endTime = 0;
    I1iliIil = "";
    $.token = "";
    $.Pin = "";
    $.errs = false;
    $.token = await Il1I1II(ll111I1I, li11ill1);
    if ($.token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await ii1illl();
    if (l1iliil1 == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await lIIIilIi("getSimpleActInfoVo");
    await $.wait(200);
    await lIIIilIi("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await lIIIilIi("accessLogWithAD");
    await $.wait(200);
    if ($.hotFlag) return;
    for (let iiII1lIi = 0; iiII1lIi < 5; iiII1lIi++) {
      !$.errs && (await lIIIilIi("grabGift"), await $.wait(500));
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await $.wait(1000);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
  } catch (l1l11Iil) {
    console.log(l1l11Iil);
  }
}
async function lIIIilIi(llllIi) {
  if ($.outFlag) return;
  let l1II1iIi = "https://cjhy-isv.isvjcloud.com",
    IIl11ii1 = "",
    IIIlll1I = "POST";
  switch (llllIi) {
    case "getMyPing":
      url = l1II1iIi + "/customer/getMyPing";
      IIl11ii1 = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      url = l1II1iIi + "/customer/getSimpleActInfoVo";
      IIl11ii1 = "activityId=" + $.activityId;
      break;
    case "getOpenCardInfo":
      url = l1II1iIi + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      IIl11ii1 = "venderId=" + $.venderId + "&activityType=" + $.activityType + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin));
      break;
    case "accessLogWithAD":
      url = l1II1iIi + "/common/accessLog";
      let i1Il1i1i = "https://cjhy-isv.isvjcloud.com/activity/daily/wx/indexPage?activityId=" + $.activityId;
      IIl11ii1 = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(i1Il1i1i) + "&subType=app&adSource=";
      break;
    case "activityContent":
      url = l1II1iIi + "/daily/activityContent";
      IIl11ii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin));
      break;
    case "follow":
      url = l1II1iIi + "/daily/follow";
      IIl11ii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin));
      break;
    case "grabGift":
      url = l1II1iIi + "/activity/daily/wx/grabGift";
      IIl11ii1 = "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin));
      break;
    case "getShareRecord":
      url = l1II1iIi + "/daily/shopInfo";
      IIl11ii1 = "activityId=" + $.activityId;
      break;
    case "getUserInfo":
      url = l1II1iIi + "/wxActionCommon/getUserInfo";
      IIl11ii1 = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
      break;
    default:
      console.log("错误" + llllIi);
  }
  let IiIi1li1 = I11i1liI(url, IIl11ii1, IIIlll1I);
  return new Promise(async i1Iil1Ii => {
    $.post(IiIi1li1, (i1lIl1iI, iiliIll, iI11IllI) => {
      try {
        lllI1liI(iiliIll);
        if (i1lIl1iI) {
          if (iiliIll && typeof iiliIll.statusCode != "undefined") {
            if (iiliIll.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(i1lIl1iI, i1lIl1iI));
          console.log(llllIi + " API请求失败，请检查网路重试");
        } else I1Il1ilI(llllIi, iI11IllI);
      } catch (lI1IilII) {
        console.log(lI1IilII, iiliIll);
      } finally {
        i1Iil1Ii();
      }
    });
  });
}
async function I1Il1ilI(I11ii11i, IIIiIi11) {
  let lIliIlIi = "";
  try {
    (I11ii11i != "accessLogWithAD" || I11ii11i != "drawContent") && IIIiIi11 && (lIliIlIi = JSON.parse(IIIiIi11));
  } catch (iiii11I) {
    console.log(I11ii11i + " 执行任务异常");
    console.log(IIIiIi11);
    $.runFalag = false;
  }
  try {
    switch (I11ii11i) {
      case "getMyPing":
        if (typeof lIliIlIi == "object") {
          if (lIliIlIi.result && lIliIlIi.result === true) {
            if (lIliIlIi.data && typeof lIliIlIi.data.secretPin != "undefined") $.Pin = lIliIlIi.data.secretPin;
            if (lIliIlIi.data && typeof lIliIlIi.data.nickname != "undefined") $.nickname = lIliIlIi.data.nickname;
          } else lIliIlIi.errorMessage ? console.log(I11ii11i + " " + (lIliIlIi.errorMessage || "")) : console.log(I11ii11i + " " + IIIiIi11);
        } else console.log(I11ii11i + " " + IIIiIi11);
        break;
      case "getSimpleActInfoVo":
        if (typeof lIliIlIi == "object") {
          if (lIliIlIi.result && lIliIlIi.result === true) {
            if (typeof lIliIlIi.data.shopId != "undefined") $.shopId = lIliIlIi.data.shopId;
            if (typeof lIliIlIi.data.venderId != "undefined") $.venderId = lIliIlIi.data.venderId;
            $.activityType = lIliIlIi.data.activityType;
          } else lIliIlIi.errorMessage ? console.log(I11ii11i + " " + (lIliIlIi.errorMessage || "")) : console.log(I11ii11i + " " + IIIiIi11);
        } else console.log(I11ii11i + " " + IIIiIi11);
        break;
      case "follow":
        if (typeof lIliIlIi == "object") {
          if (lIliIlIi.result && lIliIlIi.result === true && lIliIlIi.count === 0) {} else {
            if (lIliIlIi.errorMessage) {
              console.log(I11ii11i + " " + (lIliIlIi.errorMessage || ""));
            } else console.log(I11ii11i + " " + IIIiIi11);
          }
        } else console.log(I11ii11i + " " + IIIiIi11);
        break;
      case "getOpenCardInfo":
        if (typeof lIliIlIi == "object") {
          if (lIliIlIi.result && lIliIlIi.result === true) {
            $.openCard = lIliIlIi.data.openedCard || false;
          } else {
            if (lIliIlIi.errorMessage) console.log(I11ii11i + " " + (lIliIlIi.errorMessage || ""));else {
              console.log(I11ii11i + " " + IIIiIi11);
            }
          }
        } else console.log(I11ii11i + " " + IIIiIi11);
        break;
      case "getUserInfo":
        if (typeof lIliIlIi == "object") {
          if (lIliIlIi.result && lIliIlIi.result === true) {
            if (lIliIlIi.data && typeof lIliIlIi.data.yunMidImageUrl != "undefined") $.attrTouXiang = lIliIlIi.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            $.jdNick = lIliIlIi.data.nickname || "";
          } else lIliIlIi.errorMessage ? console.log(I11ii11i + " " + (lIliIlIi.errorMessage || "")) : console.log(I11ii11i + " " + IIIiIi11);
        } else console.log(I11ii11i + " " + IIIiIi11);
        break;
      case "activityContent":
        if (typeof lIliIlIi == "object") {
          if (lIliIlIi.result && lIliIlIi.result === true) {
            $.canJoin = lIliIlIi.data.canJoin || false;
            $.needFollow = lIliIlIi.data.needFollow || false;
            $.hasFollow = lIliIlIi.data.hasFollow || false;
            $.endTime = lIliIlIi.data.endTime || "";
            $.startTime = lIliIlIi.data.startTime || "";
            $.title = lIliIlIi.data.title || "";
            $.currentFloors = lIliIlIi.data.currentFloors || 0;
            $.totalJoinMans = lIliIlIi.data.totalJoinMans || 0;
          } else {
            if (lIliIlIi.errorMessage) {
              if (lIliIlIi.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(I11ii11i + " " + (lIliIlIi.errorMessage || ""));
            } else console.log(I11ii11i + " " + IIIiIi11);
          }
        } else console.log(I11ii11i + " " + IIIiIi11);
        break;
      case "grabGift":
        if (typeof lIliIlIi == "object") {
          if (lIliIlIi.gift && lIliIlIi.isOk === true) console.log("获得：" + lIliIlIi.gift.gift.giftName);else {
            msg = lIliIlIi.msg;
            if (msg) {
              console.log("" + lIliIlIi.msg);
              for (let i11I1liI of IilIIIII) {
                if (msg.includes(i11I1liI)) {
                  $.activityEnd = true;
                  break;
                }
              }
              for (let lli1l11i of ["不足", "火爆", "上限", "一次", "擦肩", "下次再来", "会员"]) {
                if (msg.includes(lli1l11i)) {
                  $.errs = true;
                  break;
                }
              }
            } else console.log("" + IIIiIi11);
          }
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(I11ii11i + "-> " + IIIiIi11);
    }
    typeof lIliIlIi == "object" && lIliIlIi.errorMessage && lIliIlIi.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (lIIlll1) {
    console.log(lIIlll1);
  }
}
function I11i1liI(lililI, l1ilIi1, IllI1lil = "POST") {
  let il1lIi = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": ll111I1I,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (lililI.indexOf("https://cjhy-isv.isvjcloud.com") > -1) {
    il1lIi.Referer = "https://cjhy-isv.isvjcloud.com/activity/daily/wx/indexPage?activityId=" + $.activityId;
    il1lIi.Cookie = "" + (I1iliIil && I1iliIil || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + l1iliil1;
  }
  return {
    "url": lililI,
    "method": IllI1lil,
    "headers": il1lIi,
    "body": l1ilIi1,
    "timeout": 30000
  };
}
function ii1illl() {
  return new Promise(l11ilIii => {
    let iI11I1ii = {
      "url": "https://cjhy-isv.isvjcloud.com/activity/daily/wx/indexPage?activityId=" + $.activityId,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": ll111I1I,
        "Referer": "https://cjhy-isv.isvjcloud.com/activity/daily/wx/indexPage?activityId=" + $.activityId,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iI11I1ii, async (IIIlIi11, i1IliIIl, IIIIIl1I) => {
      try {
        if (IIIlIi11) {
          i1IliIIl && typeof i1IliIIl.statusCode != "undefined" && i1IliIIl.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(IIIlIi11));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let ilIi1iII = IIIIIl1I.match(/(活动已经结束)/) && IIIIIl1I.match(/(活动已经结束)/)[1] || "";
          if (ilIi1iII) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          lllI1liI(i1IliIIl);
        }
      } catch (i1iIiiii) {
        $.logErr(i1iIiiii, i1IliIIl);
      } finally {
        l11ilIii();
      }
    });
  });
}
function lllI1liI(lIIi1l11) {
  if (lIIi1l11) {
    if (lIIi1l11.headers["set-cookie"]) {
      ll111I1I = originCookie + ";";
      for (let lll1liIl of lIIi1l11.headers["set-cookie"]) {
        l1IiiIli[lll1liIl.split(";")[0].substr(0, lll1liIl.split(";")[0].indexOf("="))] = lll1liIl.split(";")[0].substr(lll1liIl.split(";")[0].indexOf("=") + 1);
      }
      for (const i111I1ii of Object.keys(l1IiiIli)) {
        ll111I1I += i111I1ii + "=" + l1IiiIli[i111I1ii] + ";";
      }
      l1iliil1 = ll111I1I;
    }
  }
}
function llli1lIi() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const IlIIilil = Array.from(new Set($.blacklist.split("&")));
  console.log(IlIIilil.join("&") + "\n");
  let i1Iil11l = IlIIilil,
    IiIilIli = [],
    iil1Ili = false;
  for (let iI1Ill1 = 0; iI1Ill1 < Ii1lIi1.length; iI1Ill1++) {
    let IIl11iII = decodeURIComponent(Ii1lIi1[iI1Ill1].match(/pt_pin=([^; ]+)(?=;?)/) && Ii1lIi1[iI1Ill1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IIl11iII) break;
    let ii11iIIl = false;
    for (let i1I11Iil of i1Iil11l) {
      if (i1I11Iil && i1I11Iil == IIl11iII) {
        ii11iIIl = true;
        break;
      }
    }
    !ii11iIIl && (iil1Ili = true, IiIilIli.splice(iI1Ill1, -1, Ii1lIi1[iI1Ill1]));
  }
  if (iil1Ili) Ii1lIi1 = IiIilIli;
}
function Ill11ll(l1IiIIiI, iI1I11Il) {
  iI1I11Il != 0 && l1IiIIiI.unshift(l1IiIIiI.splice(iI1I11Il, 1)[0]);
}
function IlIlI1il() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(Ii1lIi1, Ii1lIi1));
    return;
  }
  console.log("当前已设置白名单：");
  const l1IIillI = Array.from(new Set($.whitelist.split("&")));
  console.log(l1IIillI.join("&") + "\n");
  let IiIIIIi1 = [],
    I1I1i1iI = l1IIillI;
  for (let illiilil in Ii1lIi1) {
    let lli1Ii1I = decodeURIComponent(Ii1lIi1[illiilil].match(/pt_pin=([^; ]+)(?=;?)/) && Ii1lIi1[illiilil].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    I1I1i1iI.includes(lli1Ii1I) && IiIIIIi1.push(Ii1lIi1[illiilil]);
  }
  helpCookiesArr = IiIIIIi1;
  if (I1I1i1iI.length > 1) for (let IlIlliII in I1I1i1iI) {
    let lliIl1l = I1I1i1iI[I1I1i1iI.length - 1 - IlIlliII];
    if (!lliIl1l) continue;
    for (let i1iii1II in helpCookiesArr) {
      let iiIiilI1 = decodeURIComponent(helpCookiesArr[i1iii1II].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[i1iii1II].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      lliIl1l == iiIiilI1 && Ill11ll(helpCookiesArr, i1iii1II);
    }
  }
}
async function II1ii1l1() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + lIII1Il1(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function lIII1Il1(II1lIiiI) {
  II1lIiiI = II1lIiiI || 32;
  let li1IIi11 = "abcdef0123456789",
    IllIiIl = li1IIi11.length,
    l1Ii1l1I = "";
  for (i = 0; i < II1lIiiI; i++) l1Ii1l1I += li1IIi11.charAt(Math.floor(Math.random() * IllIiIl));
  return l1Ii1l1I;
}
function Iilil11i(iIiIlIl) {
  if (typeof iIiIlIl == "string") {
    try {
      return JSON.parse(iIiIlIl);
    } catch (l1llI1) {
      return console.log(l1llI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}