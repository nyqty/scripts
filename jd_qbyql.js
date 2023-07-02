/*
倩碧邀请礼

变量：jd_qbyql_id // 活动id   7月id：export jd_qbyql_id="2307100037643101"

1.邀请满3人30豆，邀请5人50 共计80
2.开1张卡
3.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 倩碧邀请礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#倩碧邀请礼
11 11 11 11 * jd_qbyql.js, tag=倩碧邀请礼, enabled=true

*/

const Env = require('./utils/Env.js');
const $ = new Env('倩碧邀请礼');
const liliIi = $.isNode() ? require("./jdCookie.js") : "",
  i1Ili = $.isNode() ? require("./sendNotify") : "",
  I1iiI1 = require("./function/krgetToken"),
  lIiIi1 = require("./function/krh5st");
let li11l1 = "https://lzkjdz-isv.isvjd.com",
  IIlIIl = process.env.jd_qbyql_id ? process.env.jd_qbyql_id : "",
  iIiiI1 = {},
  I1IIiI = [],
  ilIli1 = "";
if ($.isNode()) {
  Object.keys(liliIi).forEach(li1iI => {
    I1IIiI.push(liliIi[li1iI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1IIiI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIIIiI($.getdata("CookiesJD") || "[]").map(I1IIi1 => I1IIi1.cookie)].filter(ll1lI1 => !!ll1lI1);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let li11lI = "",
  l1I1ll = "";
!(async () => {
  if (!IIlIIl) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  if (!I1IIiI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = IIlIIl;
  $.shareUuid = "";
  console.log("每期活动自行去 倩碧 店铺查看，有水无水自测");
  console.log("变量：export jd_qbyql_id=\"活动ID\"");
  console.log("入口:\nhttps://lzkjdz-isv.isvjd.com/m/1000376431/99/" + $.activityId);
  for (let lIl1Il = 0; lIl1Il < I1IIiI.length; lIl1Il++) {
    ilIli1 = I1IIiI[lIl1Il];
    originCookie = I1IIiI[lIl1Il];
    if (ilIli1) {
      $.UserName = decodeURIComponent(ilIli1.match(/pt_pin=([^; ]+)(?=;?)/) && ilIli1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIl1Il + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await II1li();
      await li1il();
      await $.wait(3000);
      if (lIl1Il == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let li11li = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + li11li);
    if ($.isNode()) await i1Ili.sendNotify("" + $.name, "" + li11li);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(IIlIIi => $.logErr(IIlIIi)).finally(() => $.done());
async function li1il() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    li11lI = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await I1iiI1(ilIli1, li11l1);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await lIiIiI();
    if (l1I1ll == "") {
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
    await l1I1li("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await l1I1li("accessLogWithAD");
    await l1I1li("getOpenCardStatusWithOutSelf");
    await l1I1li("activityContent");
    await iIIIi1();
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    $.openStatus == false && (console.log("开卡"), $.joinVenderId = 1000376431, await li11il(), $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await li11il()), $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 ? console.log("开卡失败❌ ，重新执行脚本") : $.assistStatus = true, await l1I1li("getOpenCardStatusWithOutSelf"), await l1I1li("activityContent"));
    await $.wait(1000);
    await l1I1li("getInviteSend");
    $.thirtyBeans == 1 && (console.log("开始领取第一档奖励"), $.prizFlag = 1, await l1I1li("sendGift"), await $.wait(1000));
    if ($.fiftyBeans == 1) {
      console.log("开始领取第二档奖励");
      $.prizFlag = 2;
      await l1I1li("sendGift");
      await $.wait(1000);
    }
    $.fifteen === 1 && console.log("第三档奖励需自行进入活动页面领取");
    console.log($.openStatus === true ? "已开卡" : $.openStatus === false ? "未开卡" : "未知-" + $.openStatus);
    console.log($.helpStatus === 1 ? "助力成功" : $.helpStatus === 0 ? "已助力,或者已开卡无法助力" : $.helpStatus === 2 ? "不能助力自己" : "未知-" + $.helpStatus);
    if ($.index == 1) $.helpCount = $.assistCount;else $.helpStatus == 1 && $.helpCount++;
    console.log("【账号" + $.index + "】助力人数：" + $.assistCount + ($.index != 1 && " 【账号1】助力人数：" + $.helpCount || ""));
    if ($.helpCount >= 5) $.hasEnd = true;
    console.log($.actorUuid);
    console.log("当前助力:" + ($.shareUuid || "未获取到助力邀请码"));
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log("后面的号都会助力:" + $.shareUuid);
    }
    if ($.index % 3 == 0) console.log("休息一下，别被黑ip了\n可持续发展");
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (lIllll) {
    console.log(lIllll);
  }
}
async function l1I1li(I11I) {
  if ($.outFlag) return;
  let i1IiIl = "https://lzkjdz-isv.isvjd.com",
    i1IiIi = "",
    ll1Ill = "POST";
  switch (I11I) {
    case "getMyPing":
      url = i1IiIl + "/customer/getMyPing";
      i1IiIi = "token=" + $.Token + "&fromType=APP&userId=1000376431&pin=";
      break;
    case "getSimpleActInfoVo":
      url = i1IiIl + "/common/brand/getSimpleActInfoVo";
      i1IiIi = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = i1IiIl + "/common/accessLogWithAD";
      let IlIi1I = "https://lzkjdz-isv.isvjd.com/m/1000376431/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      i1IiIi = "venderId=1000376431&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(IlIi1I);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = i1IiIl + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      i1IiIi = "venderId=1000376431&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = i1IiIl + "/clinique/invite/wx/activityContent";
      i1IiIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&helpUuid=" + $.shareUuid;
      break;
    case "sendGift":
      url = i1IiIl + "/clinique/invite/wx/sendGift";
      i1IiIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&prizFlag=" + $.prizFlag;
      break;
    case "getInviteSend":
      url = i1IiIl + "/clinique/invite/wx/getInviteSend";
      i1IiIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + I11I);
  }
  let i1lII = lI1iI1(url, i1IiIi, ll1Ill);
  return new Promise(async i111I => {
    $.post(i1lII, (lIiIlI, iilIlI, i111i) => {
      try {
        ilIliI(iilIlI);
        if (lIiIlI) {
          iilIlI && typeof iilIlI.statusCode != "undefined" && iilIlI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(lIiIlI, lIiIlI));
          console.log(I11I + " API请求失败，请检查网路重试");
        } else li1ii(I11I, i111i);
      } catch (III1l1) {
        console.log(III1l1, iilIlI);
      } finally {
        i111I();
      }
    });
  });
}
async function li1ii(IiIiii, lIiIll) {
  let iIIlI1 = "";
  try {
    (IiIiii != "accessLogWithAD" || IiIiii != "drawContent") && lIiIll && (iIIlI1 = JSON.parse(lIiIll));
  } catch (i1Ii11) {
    console.log(IiIiii + " 执行任务异常");
    console.log(lIiIll);
    $.runFalag = false;
  }
  try {
    switch (IiIiii) {
      case "getMyPing":
        if (typeof iIIlI1 == "object") {
          if (iIIlI1.result && iIIlI1.result === true) {
            if (iIIlI1.data && typeof iIIlI1.data.secretPin != "undefined") $.Pin = iIIlI1.data.secretPin;
            if (iIIlI1.data && typeof iIIlI1.data.nickname != "undefined") $.nickname = iIIlI1.data.nickname;
          } else iIIlI1.errorMessage ? console.log(IiIiii + " " + (iIIlI1.errorMessage || "")) : console.log(IiIiii + " " + lIiIll);
        } else console.log(IiIiii + " " + lIiIll);
        break;
      case "getInviteSend":
        if (typeof iIIlI1 == "object") {
          if (iIIlI1.result && iIIlI1.result === true) {
            $.thirtyBeans = iIIlI1.data.thirtyBeans || 0;
            $.fiftyBeans = iIIlI1.data.fiftyBeans || 0;
            $.fifteen = iIIlI1.data.fifteen || 0;
          } else iIIlI1.errorMessage ? console.log("" + (iIIlI1.errorMessage || "")) : console.log("" + lIiIll);
        } else {
          console.log("" + lIiIll);
        }
        break;
      case "sendGift":
        if (typeof iIIlI1 == "object") {
          if (iIIlI1.result && iIIlI1.result === true) console.log("" + iIIlI1.data);else {
            if (iIIlI1.errorMessage) {
              console.log("" + (iIIlI1.errorMessage || ""));
            } else console.log(" " + lIiIll);
          }
        } else console.log("" + lIiIll);
        break;
      case "activityContent":
        if (typeof iIIlI1 == "object") {
          if (iIIlI1.result && iIIlI1.result === true) {
            $.actorUuid = iIIlI1.data.customerId || "";
            $.helpStatus = iIIlI1.data.helpStatus || 0;
            $.assistCount = iIIlI1.data.inviteNum || 0;
            iIIlI1.data.sendBeanNum && (console.log("获得" + iIIlI1.data.sendBeanNum + "豆"), allMessage += "【账号" + $.index + "】获得" + iIIlI1.data.sendBeanNum + "豆\n");
          } else {
            if (iIIlI1.errorMessage) {
              if (iIIlI1.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(IiIiii + " " + (iIIlI1.errorMessage || ""));
            } else {
              console.log(IiIiii + " " + lIiIll);
            }
          }
        } else console.log(IiIiii + " " + lIiIll);
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof iIIlI1 == "object") {
          if (iIIlI1.isOk) $.openStatus = iIIlI1.openCard || false;else iIIlI1.errorMessage || iIIlI1.msg ? console.log(IiIiii + " " + (iIIlI1.errorMessage || iIIlI1.msg || "")) : console.log(IiIiii + " " + lIiIll);
        } else console.log(IiIiii + " " + lIiIll);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IiIiii + "-> " + lIiIll);
    }
    typeof iIIlI1 == "object" && iIIlI1.errorMessage && iIIlI1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (llIiIi) {
    console.log(llIiIi);
  }
}
function lI1iI1(IIil, IIii, i1Ii1I = "POST") {
  let I1i1i = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": ilIli1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IIil.indexOf("https://lzkjdz-isv.isvjd.com") > -1 && (I1i1i.Referer = "https://lzkjdz-isv.isvjd.com/m/1000376431/99/" + $.activityId + "/?helpUuid=" + $.shareUuid, I1i1i.Cookie = "" + (li11lI && li11lI || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + l1I1ll), {
    "url": IIil,
    "method": i1Ii1I,
    "headers": I1i1i,
    "body": IIii,
    "timeout": 30000
  };
}
function iIIIi1() {
  return new Promise(i11Ii => {
    let iII1I = {
      "url": "https://lzkjdz-isv.isvjd.com/common/brand/getSimpleActInfoVo?activityId=2304100037643101",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": ilIli1,
        "Referer": "https://lzkjdz-isv.isvjd.com/m/1000376431/99/" + $.activityId + "/?helpUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iII1I, async (iilli1, ilI1l1, Iil1l) => {
      try {
        if (iilli1) {
          ilI1l1 && typeof ilI1l1.statusCode != "undefined" && ilI1l1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(iilli1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iII11 = $.toObj(Iil1l, Iil1l);
          if (typeof iII11 == "object") {
            if (iII11.result && iII11.result === true) {
              $.endTime = iII11.data.endTime || 0;
              $.startTimes = iII11.data.startTime || Date.now();
            } else iII11.errorMessage ? console.log("" + (iII11.errorMessage || "")) : console.log("" + Iil1l);
          } else console.log("" + Iil1l);
        }
      } catch (i11I1) {
        $.logErr(i11I1, ilI1l1);
      } finally {
        i11Ii();
      }
    });
  });
}
function lIiIiI() {
  return new Promise(IlIi1 => {
    let Il1ili = {
      "url": "https://lzkjdz-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": ilIli1,
        "Referer": "https://lzkjdz-isv.isvjd.com/m/1000376431/99/" + $.activityId + "/?helpUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(Il1ili, async (liIIII, iI11ii, IIllII) => {
      try {
        if (liIIII) {
          if (iI11ii && typeof iI11ii.statusCode != "undefined") {
            iI11ii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(liIIII));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iI11il = IIllII.match(/(活动已经结束)/) && IIllII.match(/(活动已经结束)/)[1] || "";
          iI11il && ($.activityEnd = true, console.log("活动已结束"));
          ilIliI(iI11ii);
        }
      } catch (liIII1) {
        $.logErr(liIII1, iI11ii);
      } finally {
        IlIi1();
      }
    });
  });
}
function ilIliI(iliill) {
  if (iliill) {
    if (iliill.headers["set-cookie"]) {
      ilIli1 = originCookie + ";";
      for (let i1i1l1 of iliill.headers["set-cookie"]) {
        iIiiI1[i1i1l1.split(";")[0].substr(0, i1i1l1.split(";")[0].indexOf("="))] = i1i1l1.split(";")[0].substr(i1i1l1.split(";")[0].indexOf("=") + 1);
      }
      for (const iIii1i of Object.keys(iIiiI1)) {
        ilIli1 += iIii1i + "=" + iIiiI1[iIii1i] + ";";
      }
      l1I1ll = ilIli1;
    }
  }
}
async function II1li() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + Ii1lIi(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function Ii1lIi(II1i1I) {
  II1i1I = II1i1I || 32;
  let iIii11 = "abcdef0123456789",
    i1i1lI = iIii11.length,
    IIllIi = "";
  for (i = 0; i < II1i1I; i++) IIllIi += iIii11.charAt(Math.floor(Math.random() * i1i1lI));
  return IIllIi;
}
async function li11il() {
  if (!$.joinVenderId) return;
  return new Promise(async iIili => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iil1Il = "";
    if ($.shopactivityId) iil1Il = ",\"activityId\":" + $.shopactivityId;
    const IlIll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iil1Il + ",\"channel\":406}",
      liil = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IlIll)
      };
    for (var i11l11 = "", IlIli = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", liIIIl = 0; liIIIl < 16; liIIIl++) {
      var iliil1 = Math.round(Math.random() * (IlIli.length - 1));
      i11l11 += IlIli.substring(iliil1, iliil1 + 1);
    }
    uuid = Buffer.from(i11l11, "utf8").toString("base64");
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
    const i1i1ll = await lIiIi1("8adfb", liil),
      IIllI1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IlIll + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1i1ll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": ilIli1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIllI1, async (II1i1i, Il1iiI, iIil1) => {
      try {
        if (II1i1i) Il1iiI && typeof Il1iiI.statusCode != "undefined" && Il1iiI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iIil1 = iIil1 && iIil1.match(/jsonp_.*?\((.*?)\);/) && iIil1.match(/jsonp_.*?\((.*?)\);/)[1] || iIil1;
          let ii1iI1 = $.toObj(iIil1, iIil1);
          if (ii1iI1 && typeof ii1iI1 == "object") {
            if (ii1iI1 && ii1iI1.success === true) {
              console.log(" >> " + ii1iI1.message);
              $.errorJoinShop = ii1iI1.message;
              if (ii1iI1.result && ii1iI1.result.giftInfo) for (let ll111I of ii1iI1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + ll111I.discountString + ll111I.prizeName + ll111I.secondLineDesc);
              }
            } else ii1iI1 && typeof ii1iI1 == "object" && ii1iI1.message ? ($.errorJoinShop = ii1iI1.message, console.log("" + (ii1iI1.message || ""))) : console.log(iIil1);
          } else console.log(iIil1);
        }
      } catch (IIl111) {
        $.logErr(IIl111, Il1iiI);
      } finally {
        iIili();
      }
    });
  });
}
async function ll1lII() {
  return new Promise(async iIiil => {
    const ll111l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      lil1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ll111l)
      };
    await $.wait(1000);
    const illIII = await lIiIi1("8adfb", lil1),
      iliI1l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ll111l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(illIII),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": ilIli1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iliI1l, async (ii1iIi, iliI1i, IIl11i) => {
      try {
        if (ii1iIi) iliI1i && typeof iliI1i.statusCode != "undefined" && iliI1i.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IIl11i = IIl11i && IIl11i.match(/jsonp_.*?\((.*?)\);/) && IIl11i.match(/jsonp_.*?\((.*?)\);/)[1] || IIl11i;
          let ii1iIl = $.toObj(IIl11i, IIl11i);
          if (ii1iIl && typeof ii1iIl == "object") {
            ii1iIl && ii1iIl.success == true && (console.log("去加入：" + (ii1iIl.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = ii1iIl.result.interestsRuleList && ii1iIl.result.interestsRuleList[0] && ii1iIl.result.interestsRuleList[0].interestsInfo && ii1iIl.result.interestsRuleList[0].interestsInfo.activityId || "");
          } else console.log(IIl11i);
        }
      } catch (l1iiiI) {
        $.logErr(l1iiiI, iliI1i);
      } finally {
        iIiil();
      }
    });
  });
}
function Ii1lIl(iI11li) {
  return new Promise(iiilIl => {
    const Il1ilI = {
      "url": iI11li + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(Il1ilI, async (iIliIl, l1Illi, iiilIi) => {
      try {
        if (iIliIl) $.log(iIliIl);else {
          if (iiilIi) iiilIi = JSON.parse(iiilIi);
        }
      } catch (Ii111I) {
        $.logErr(Ii111I, l1Illi);
        iiilIi = null;
      } finally {
        iiilIl(iiilIi);
      }
    });
  });
}
function iIIIiI(liIl1i) {
  if (typeof liIl1i == "string") try {
    return JSON.parse(liIl1i);
  } catch (Ii1111) {
    return console.log(Ii1111), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}