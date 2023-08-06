/*
倩碧邀请礼
1.邀请满3人5豆，邀请5人10
2.开1张卡
3.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本
————————————————
请求太频繁会被黑ip
过10分钟再执行
1 1 1 1 * jd_qbyql.js
*/

const Env=require('./utils/Env.js');
const $ = new Env('倩碧邀请礼');
const ll1i1iI = $.isNode() ? require("./jdCookie.js") : "",
  llIiIli = $.isNode() ? require("./sendNotify") : "",
  I1IlI11I = require("./function/dylank"),
  IIiIIii = require("./function/krh5st");
let ilIliIIi = "https://lzkjdz-isv.isvjd.com",
  iiII11lI = {},
  i1l1iIil = [],
  li1IiIlI = "";
if ($.isNode()) {
  Object.keys(ll1i1iI).forEach(iIlIi1 => {
    i1l1iIil.push(ll1i1iI[iIlIi1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1l1iIil = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...liilIi1i($.getdata("CookiesJD") || "[]").map(Iilili1l => Iilili1l.cookie)].filter(l1llIIii => !!l1llIIii);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let I1i1II1i = "",
  II1lii1l = "";
!(async () => {
  if (!i1l1iIil[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "2308100037643101";
  authorCodeList = ["eb8c9ae9575b47c78e1bd720fb7c8159"];
  authorCodeList === "404: Not Found" && (authorCodeList = [""]);
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("入口:\nhttps://lzkjdz-isv.isvjd.com/m/1000376431/99/2307100037643101/?helpUuid=" + $.shareUuid);
  for (let I11iilii = 0; I11iilii < i1l1iIil.length; I11iilii++) {
    li1IiIlI = i1l1iIil[I11iilii];
    originCookie = i1l1iIil[I11iilii];
    if (li1IiIlI) {
      $.UserName = decodeURIComponent(li1IiIlI.match(/pt_pin=([^; ]+)(?=;?)/) && li1IiIlI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I11iilii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await l1Ii11I();
      await ll1I1IiI();
      await $.wait(3000);
      if (I11iilii == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let IIIIIII = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + IIIIIII);
    if ($.isNode()) await llIiIli.sendNotify("" + $.name, "" + IIIIIII);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(I1i11li1 => $.logErr(I1i11li1)).finally(() => $.done());
async function ll1I1IiI() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    I1i1II1i = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await I1IlI11I(li1IiIlI, ilIliIIi);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await lIi1Iil();
    if (II1lii1l == "") {
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
    await l1II11il("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await l1II11il("accessLogWithAD");
    await l1II11il("getOpenCardStatusWithOutSelf");
    await l1II11il("activityContent");
    await I1IiII1i();
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.openStatus == false) {
      console.log("开卡");
      $.joinVenderId = 1000376431;
      await iIli1ll();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await iIli1ll());
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) console.log("开卡失败❌ ，重新执行脚本");else $.assistStatus = true;
      await l1II11il("getOpenCardStatusWithOutSelf");
      await l1II11il("activityContent");
    }
    await $.wait(1000);
    await l1II11il("getInviteSend");
    $.thirtyBeans == 1 && (console.log("开始领取第一档奖励"), $.prizFlag = 1, await l1II11il("sendGift"), await $.wait(1000));
    $.fiftyBeans == 1 && (console.log("开始领取第二档奖励"), $.prizFlag = 2, await l1II11il("sendGift"), await $.wait(1000));
    $.fifteen === 1 && console.log("第三档奖励需自行进入活动页面领取");
    console.log($.openStatus === true ? "已开卡" : $.openStatus === false ? "未开卡" : "未知-" + $.openStatus);
    console.log($.helpStatus === 1 ? "助力成功" : $.helpStatus === 0 ? "已助力,或者已开卡无法助力" : $.helpStatus === 2 ? "不能助力自己" : "未知-" + $.helpStatus);
    if ($.index == 1) $.helpCount = $.assistCount;else $.helpStatus == 1 && $.helpCount++;
    console.log("【账号" + $.index + "】助力人数：" + $.assistCount + ($.index != 1 && " 【账号1】助力人数：" + $.helpCount || ""));
    if ($.helpCount >= 5) $.hasEnd = true;
    console.log($.actorUuid);
    console.log("当前助力:" + $.shareUuid);
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    if ($.index % 3 == 0) console.log("休息一下，别被黑ip了\n可持续发展");
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (ilii1ii1) {
    console.log(ilii1ii1);
  }
}
async function l1II11il(i1IIllI) {
  if ($.outFlag) return;
  let i11I11iI = "https://lzkjdz-isv.isvjd.com",
    I1lIll1l = "",
    IlilIiI = "POST";
  switch (i1IIllI) {
    case "getMyPing":
      url = i11I11iI + "/customer/getMyPing";
      I1lIll1l = "token=" + $.Token + "&fromType=APP&userId=1000376431&pin=";
      break;
    case "getSimpleActInfoVo":
      url = i11I11iI + "/common/brand/getSimpleActInfoVo";
      I1lIll1l = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = i11I11iI + "/common/accessLogWithAD";
      let iiil1liI = "https://lzkjdz-isv.isvjd.com/m/1000376431/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      I1lIll1l = "venderId=1000376431&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iiil1liI);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = i11I11iI + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      I1lIll1l = "venderId=1000376431&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = i11I11iI + "/clinique/invite/wx/activityContent";
      I1lIll1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&helpUuid=" + $.shareUuid;
      break;
    case "sendGift":
      url = i11I11iI + "/clinique/invite/wx/sendGift";
      I1lIll1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&prizFlag=" + $.prizFlag;
      break;
    case "getInviteSend":
      url = i11I11iI + "/clinique/invite/wx/getInviteSend";
      I1lIll1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + i1IIllI);
  }
  let l1Iili1l = I11Ilil1(url, I1lIll1l, IlilIiI);
  return new Promise(async i1l1l1ii => {
    $.post(l1Iili1l, (lil1illi, lI1i11I1, iI11iI) => {
      try {
        ill11il1(lI1i11I1);
        if (lil1illi) {
          lI1i11I1 && typeof lI1i11I1.statusCode != "undefined" && lI1i11I1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(lil1illi, lil1illi));
          console.log(i1IIllI + " API请求失败，请检查网路重试");
        } else {
          lliIi1II(i1IIllI, iI11iI);
        }
      } catch (illi1IiI) {
        console.log(illi1IiI, lI1i11I1);
      } finally {
        i1l1l1ii();
      }
    });
  });
}
async function lliIi1II(i1l1iIl, i1I1Iiil) {
  let lIiI1lIi = "";
  try {
    (i1l1iIl != "accessLogWithAD" || i1l1iIl != "drawContent") && i1I1Iiil && (lIiI1lIi = JSON.parse(i1I1Iiil));
  } catch (l1IIIl11) {
    console.log(i1l1iIl + " 执行任务异常");
    console.log(i1I1Iiil);
    $.runFalag = false;
  }
  try {
    switch (i1l1iIl) {
      case "getMyPing":
        if (typeof lIiI1lIi == "object") {
          if (lIiI1lIi.result && lIiI1lIi.result === true) {
            if (lIiI1lIi.data && typeof lIiI1lIi.data.secretPin != "undefined") $.Pin = lIiI1lIi.data.secretPin;
            if (lIiI1lIi.data && typeof lIiI1lIi.data.nickname != "undefined") $.nickname = lIiI1lIi.data.nickname;
          } else lIiI1lIi.errorMessage ? console.log(i1l1iIl + " " + (lIiI1lIi.errorMessage || "")) : console.log(i1l1iIl + " " + i1I1Iiil);
        } else console.log(i1l1iIl + " " + i1I1Iiil);
        break;
      case "getInviteSend":
        if (typeof lIiI1lIi == "object") {
          if (lIiI1lIi.result && lIiI1lIi.result === true) {
            $.thirtyBeans = lIiI1lIi.data.thirtyBeans || 0;
            $.fiftyBeans = lIiI1lIi.data.fiftyBeans || 0;
            $.fifteen = lIiI1lIi.data.fifteen || 0;
          } else lIiI1lIi.errorMessage ? console.log("" + (lIiI1lIi.errorMessage || "")) : console.log("" + i1I1Iiil);
        } else console.log("" + i1I1Iiil);
        break;
      case "sendGift":
        if (typeof lIiI1lIi == "object") {
          if (lIiI1lIi.result && lIiI1lIi.result === true) console.log("" + lIiI1lIi.data);else {
            if (lIiI1lIi.errorMessage) console.log("" + (lIiI1lIi.errorMessage || ""));else console.log(" " + i1I1Iiil);
          }
        } else console.log("" + i1I1Iiil);
        break;
      case "activityContent":
        if (typeof lIiI1lIi == "object") {
          if (lIiI1lIi.result && lIiI1lIi.result === true) {
            $.actorUuid = lIiI1lIi.data.customerId || "";
            $.helpStatus = lIiI1lIi.data.helpStatus || 0;
            $.assistCount = lIiI1lIi.data.inviteNum || 0;
            lIiI1lIi.data.sendBeanNum && (console.log("获得" + lIiI1lIi.data.sendBeanNum + "豆"), allMessage += "【账号" + $.index + "】获得" + lIiI1lIi.data.sendBeanNum + "豆\n");
          } else {
            if (lIiI1lIi.errorMessage) {
              if (lIiI1lIi.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(i1l1iIl + " " + (lIiI1lIi.errorMessage || ""));
            } else console.log(i1l1iIl + " " + i1I1Iiil);
          }
        } else console.log(i1l1iIl + " " + i1I1Iiil);
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof lIiI1lIi == "object") {
          if (lIiI1lIi.isOk) $.openStatus = lIiI1lIi.openCard || false;else lIiI1lIi.errorMessage || lIiI1lIi.msg ? console.log(i1l1iIl + " " + (lIiI1lIi.errorMessage || lIiI1lIi.msg || "")) : console.log(i1l1iIl + " " + i1I1Iiil);
        } else console.log(i1l1iIl + " " + i1I1Iiil);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(i1l1iIl + "-> " + i1I1Iiil);
    }
    typeof lIiI1lIi == "object" && lIiI1lIi.errorMessage && lIiI1lIi.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (il1II11I) {
    console.log(il1II11I);
  }
}
function I11Ilil1(lli11ii, IIlIlI11, Iiii1l11 = "POST") {
  let ilIllIil = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": li1IiIlI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lli11ii.indexOf("https://lzkjdz-isv.isvjd.com") > -1 && (ilIllIil.Referer = "https://lzkjdz-isv.isvjd.com/m/1000376431/99/" + $.activityId + "/?helpUuid=" + $.shareUuid, ilIllIil.Cookie = "" + (I1i1II1i && I1i1II1i || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + II1lii1l), {
    "url": lli11ii,
    "method": Iiii1l11,
    "headers": ilIllIil,
    "body": IIlIlI11,
    "timeout": 30000
  };
}
function I1IiII1i() {
  return new Promise(l1l1lliI => {
    let i1I11lIi = {
      "url": "https://lzkjdz-isv.isvjd.com/common/brand/getSimpleActInfoVo?activityId=2304100037643101",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": li1IiIlI,
        "Referer": "https://lzkjdz-isv.isvjd.com/m/1000376431/99/" + $.activityId + "/?helpUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(i1I11lIi, async (llIlIlli, IlII11ll, l111111i) => {
      try {
        if (llIlIlli) {
          IlII11ll && typeof IlII11ll.statusCode != "undefined" && IlII11ll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(llIlIlli));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Iii1I111 = $.toObj(l111111i, l111111i);
          if (typeof Iii1I111 == "object") {
            if (Iii1I111.result && Iii1I111.result === true) {
              $.endTime = Iii1I111.data.endTime || 0;
              $.startTimes = Iii1I111.data.startTime || Date.now();
            } else Iii1I111.errorMessage ? console.log("" + (Iii1I111.errorMessage || "")) : console.log("" + l111111i);
          } else console.log("" + l111111i);
        }
      } catch (llIliil) {
        $.logErr(llIliil, IlII11ll);
      } finally {
        l1l1lliI();
      }
    });
  });
}
function lIi1Iil() {
  return new Promise(i1iilIIl => {
    let ilI111li = {
      "url": "https://lzkjdz-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": li1IiIlI,
        "Referer": "https://lzkjdz-isv.isvjd.com/m/1000376431/99/" + $.activityId + "/?helpUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(ilI111li, async (lli1liI, il1iliiI, I1IilIIl) => {
      try {
        if (lli1liI) {
          il1iliiI && typeof il1iliiI.statusCode != "undefined" && il1iliiI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(lli1liI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Ili1i1il = I1IilIIl.match(/(活动已经结束)/) && I1IilIIl.match(/(活动已经结束)/)[1] || "";
          Ili1i1il && ($.activityEnd = true, console.log("活动已结束"));
          ill11il1(il1iliiI);
        }
      } catch (IliiI11l) {
        $.logErr(IliiI11l, il1iliiI);
      } finally {
        i1iilIIl();
      }
    });
  });
}
function ill11il1(ii1IiIi) {
  if (ii1IiIi) {
    if (ii1IiIi.headers["set-cookie"]) {
      li1IiIlI = originCookie + ";";
      for (let ili1li11 of ii1IiIi.headers["set-cookie"]) {
        iiII11lI[ili1li11.split(";")[0].substr(0, ili1li11.split(";")[0].indexOf("="))] = ili1li11.split(";")[0].substr(ili1li11.split(";")[0].indexOf("=") + 1);
      }
      for (const i1II1li1 of Object.keys(iiII11lI)) {
        li1IiIlI += i1II1li1 + "=" + iiII11lI[i1II1li1] + ";";
      }
      II1lii1l = li1IiIlI;
    }
  }
}
async function l1Ii11I() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + lIilillI(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function lIilillI(Il11iI1I) {
  Il11iI1I = Il11iI1I || 32;
  let I11lIi1l = "abcdef0123456789",
    Il11l1I = I11lIi1l.length,
    l1lIIliI = "";
  for (i = 0; i < Il11iI1I; i++) l1lIIliI += I11lIi1l.charAt(Math.floor(Math.random() * Il11l1I));
  return l1lIIliI;
}
async function iIli1ll() {
  if (!$.joinVenderId) return;
  return new Promise(async i1lIlI1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lII1IIii = "";
    if ($.shopactivityId) lII1IIii = ",\"activityId\":" + $.shopactivityId;
    const lI1IIIii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lII1IIii + ",\"channel\":406}",
      Illil1II = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lI1IIIii)
      };
    for (var liI1I1lI = "", lli1illl = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", liiiIill = 0; liiiIill < 16; liiiIill++) {
      var IllilI1i = Math.round(Math.random() * (lli1illl.length - 1));
      liI1I1lI += lli1illl.substring(IllilI1i, IllilI1i + 1);
    }
    uuid = Buffer.from(liI1I1lI, "utf8").toString("base64");
    ep = encodeURIComponent(JSON.stringify({
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "ts": new Date().getTime(),
      "ridx": -1,
      "cipher": {
        "screen": "CJS0CseyCtK4",
        "osVersion": "CJGkEK==",
        "uuid": uuid
      },
      "ciphertype": 5,
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile"
    }));
    const llIII1i1 = await IIiIIii("8adfb", Illil1II),
      i1ilIiIl = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lI1IIIii + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(llIII1i1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": li1IiIlI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1ilIiIl, async (ll1I1Ili, i1IlllIl, Il1iiill) => {
      try {
        if (ll1I1Ili) i1IlllIl && typeof i1IlllIl.statusCode != "undefined" && i1IlllIl.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          Il1iiill = Il1iiill && Il1iiill.match(/jsonp_.*?\((.*?)\);/) && Il1iiill.match(/jsonp_.*?\((.*?)\);/)[1] || Il1iiill;
          let liI1IIli = $.toObj(Il1iiill, Il1iiill);
          if (liI1IIli && typeof liI1IIli == "object") {
            if (liI1IIli && liI1IIli.success === true) {
              console.log(" >> " + liI1IIli.message);
              $.errorJoinShop = liI1IIli.message;
              if (liI1IIli.result && liI1IIli.result.giftInfo) {
                for (let liI1iIII of liI1IIli.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + liI1iIII.discountString + liI1iIII.prizeName + liI1iIII.secondLineDesc);
                }
              }
            } else liI1IIli && typeof liI1IIli == "object" && liI1IIli.message ? ($.errorJoinShop = liI1IIli.message, console.log("" + (liI1IIli.message || ""))) : console.log(Il1iiill);
          } else console.log(Il1iiill);
        }
      } catch (lIIlil1) {
        $.logErr(lIIlil1, i1IlllIl);
      } finally {
        i1lIlI1I();
      }
    });
  });
}
async function Iil1lli() {
  return new Promise(async iI1Ii11I => {
    const lI1I1I1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      IIllllil = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lI1I1I1i)
      };
    await $.wait(1000);
    const iiIi1I11 = await IIiIIii("8adfb", IIllllil),
      Ii1I1i1i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + lI1I1I1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiIi1I11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": li1IiIlI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ii1I1i1i, async (li1l1I1I, I1ll1ii1, Iii1lii1) => {
      try {
        if (li1l1I1I) I1ll1ii1 && typeof I1ll1ii1.statusCode != "undefined" && I1ll1ii1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          Iii1lii1 = Iii1lii1 && Iii1lii1.match(/jsonp_.*?\((.*?)\);/) && Iii1lii1.match(/jsonp_.*?\((.*?)\);/)[1] || Iii1lii1;
          let IIIi111l = $.toObj(Iii1lii1, Iii1lii1);
          if (IIIi111l && typeof IIIi111l == "object") IIIi111l && IIIi111l.success == true && (console.log("去加入：" + (IIIi111l.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = IIIi111l.result.interestsRuleList && IIIi111l.result.interestsRuleList[0] && IIIi111l.result.interestsRuleList[0].interestsInfo && IIIi111l.result.interestsRuleList[0].interestsInfo.activityId || "");else console.log(Iii1lii1);
        }
      } catch (l1Illl11) {
        $.logErr(l1Illl11, I1ll1ii1);
      } finally {
        iI1Ii11I();
      }
    });
  });
}
function ill1i1ii(iIi1iII) {
  return new Promise(l1Iili => {
    const l1IIilli = {
      "url": iIi1iII + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(l1IIilli, async (liIlil1i, I1Ii1lII, Il1ilIII) => {
      try {
        if (liIlil1i) $.log(liIlil1i);else {
          if (Il1ilIII) Il1ilIII = JSON.parse(Il1ilIII);
        }
      } catch (IIliIIl1) {
        $.logErr(IIliIIl1, I1Ii1lII);
        Il1ilIII = null;
      } finally {
        l1Iili(Il1ilIII);
      }
    });
  });
}
function liilIi1i(iii1i11) {
  const ililll1 = function () {
      let l1i1I1lI = true;
      return function (IIiIlIii, I1il1Ill) {
        const ll1ll1l = l1i1I1lI ? function () {
          if (I1il1Ill) {
            const II1i1Iii = I1il1Ill.apply(IIiIlIii, arguments);
            return I1il1Ill = null, II1i1Iii;
          }
        } : function () {};
        return l1i1I1lI = false, ll1ll1l;
      };
    }(),
    iIillll = ililll1(this, function () {
      return iIillll.toString().search("(((.+)+)+)+$").toString().constructor(iIillll).search("(((.+)+)+)+$");
    });
  iIillll();
  if (typeof iii1i11 == "string") try {
    return JSON.parse(iii1i11);
  } catch (il1lI11I) {
    return console.log(il1lI11I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
