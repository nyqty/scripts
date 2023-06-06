/*
6.1-6.30 a2集成长值赢千元礼包

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 6.1-6.30 a2集成长值赢千元礼包 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#6.1-6.30 a2集成长值赢千元礼包
11 11 11 11 * jd_a2.js, tag=6.1-6.30 a2集成长值赢千元礼包, enabled=true

*/

const $ = new Env('6.1-6.30 a2集成长值赢千元礼包');
const lil1IllI = $.isNode() ? require("./jdCookie.js") : "",
  I1III1II = $.isNode() ? require("./sendNotify") : "",
  iIli1i1i = require("./function/krgetToken");
let iIiIiili = "https://lzkjdz-isv.isvjcloud.com",
  IlI11iil = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "10" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "10",
  IIII11 = {},
  lIIiI1ll = [],
  IlIilIII = "";
if ($.isNode()) {
  Object.keys(lil1IllI).forEach(lIlllil1 => {
    lIIiI1ll.push(lil1IllI[lIlllil1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lIIiI1ll = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iiliIIlI($.getdata("CookiesJD") || "[]").map(I1iIlI1i => I1iIlI1i.cookie)].filter(iIiliii1 => !!iIiliii1);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let IilI1 = "",
  iIiIl1lI = "",
  liIl1I1l = "https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/2306100000664401/";
!(async () => {
  if (!lIIiI1ll[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "2306100000664401";
  authorCodeList = ["eb5b6c3e091244ac8772ca19587f12c6"];
  authorCodeList === "404: Not Found" && (authorCodeList = [""]);
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000006644/99/2306100000664401/?helpUuid=" + $.shareUuid);
  for (let i111lii = 0; i111lii < lIIiI1ll.length; i111lii++) {
    IlIilIII = lIIiI1ll[i111lii];
    originCookie = lIIiI1ll[i111lii];
    if (IlIilIII) {
      $.UserName = decodeURIComponent(IlIilIII.match(/pt_pin=([^; ]+)(?=;?)/) && IlIilIII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i111lii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await iiIlII11();
      await I1l111l();
      await $.wait(3000);
      if (i111lii == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let i1IIIii1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + i1IIIii1);
    if ($.isNode()) await I1III1II.sendNotify("" + $.name, "" + i1IIIii1);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(i1ii1ili => $.logErr(i1ii1ili)).finally(() => $.done());
async function I1l111l() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    IilI1 = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await iIli1i1i(IlIilIII, iIiIiili);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IlIl1lil();
    if (iIiIl1lI == "") {
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
    await lI1i1lIi("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await lI1i1lIi("accessLogWithAD");
    await lI1i1lIi("getOpenCardStatusWithOutSelf");
    await lI1i1lIi("activityContent");
    if ($.openStatus == false) {
      console.log("去开通店铺会员");
      $.joinVenderId = 1000006644;
      await I1i1iII();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await I1i1iII());
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 无法开卡,跳过运行");
        return;
      }
      await lI1i1lIi("getOpenCardStatusWithOutSelf");
      await lI1i1lIi("activityContent");
    }
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    for (let Il11llIl = 0; Il11llIl < $.taskslist.length; Il11llIl++) {
      $.taskId = $.taskslist[Il11llIl].taskId;
      $.taskType = $.taskslist[Il11llIl].taskType;
      if ($.taskslist[Il11llIl].taskFinishCnt === 0) switch ($.taskType) {
        case 1:
          console.log("去完成" + $.taskslist[Il11llIl].taskType + "" + $.taskslist[Il11llIl].taskId);
          await lI1i1lIi("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 2:
          console.log("去完成" + $.taskslist[Il11llIl].taskType + "" + $.taskslist[Il11llIl].taskId);
          await lI1i1lIi("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 4:
          console.log("去完成" + $.taskslist[Il11llIl].taskType + "" + $.taskslist[Il11llIl].taskId);
          await lI1i1lIi("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 5:
          console.log("去完成" + $.taskslist[Il11llIl].taskType + "" + $.taskslist[Il11llIl].taskId);
          await lI1i1lIi("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 6:
        case 3:
          break;
        default:
          console.log("错误" + $.taskType);
      }
    }
    await lI1i1lIi("activityContent");
    if (IlI11iil + "" !== "0") {
      $.runFalag = true;
      let iiiIlliI = parseInt($.score / 500);
      IlI11iil = parseInt(IlI11iil, 10);
      if (iiiIlliI > IlI11iil) iiiIlliI = IlI11iil;
      console.log("已设置抽奖次数为" + IlI11iil + "次，当前有" + iiiIlliI + "次抽奖机会");
      for (m = 1; iiiIlliI--; m++) {
        console.log("进行第" + m + "次抽奖");
        await lI1i1lIi("draw");
        if ($.runFalag == false) break;
        if (Number(iiiIlliI) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    $.index == 1 && ($.shareUuid = $.actorUuid);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (Il1lI1l1) {
    console.log(Il1lI1l1);
  }
}
async function lI1i1lIi(IIllIili) {
  if ($.outFlag) return;
  let i1Ii1i1I = "https://lzkjdz-isv.isvjcloud.com",
    illI1III = "",
    illIiilI = "POST";
  switch (IIllIili) {
    case "getMyPing":
      url = i1Ii1i1I + "/customer/getMyPing";
      illI1III = "token=" + $.Token + "&fromType=APP&userId=1000006644&pin=";
      break;
    case "getSimpleActInfoVo":
      url = i1Ii1i1I + "/common/brand/getSimpleActInfoVo";
      illI1III = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = i1Ii1i1I + "/common/accessLogWithAD";
      let Ii1IiIIl = "https://lzkjdz-isv.isvjcloud.com/m/1000006644/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      illI1III = "venderId=1000006644&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(Ii1IiIIl);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = i1Ii1i1I + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      illI1III = "venderId=1000006644&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = i1Ii1i1I + "/a2/task/activityContent";
      illI1III = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&inviterUuid=" + $.shareUuid;
      break;
    case "task":
      url = i1Ii1i1I + "/a2/task/startTask";
      illI1III = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId;
      break;
    case "draw":
      url = i1Ii1i1I + "/a2/task/startDraw";
      illI1III = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + IIllIili);
  }
  let iiIll1lI = iIlIIl1i(url, illI1III, illIiilI);
  return new Promise(async iIIi1i1i => {
    $.post(iiIll1lI, (I11l11i, l1i1l1ii, l1iIiIll) => {
      try {
        iIiIii1(l1i1l1ii);
        if (I11l11i) {
          if (l1i1l1ii && typeof l1i1l1ii.statusCode != "undefined") {
            l1i1l1ii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(I11l11i, I11l11i));
          console.log(IIllIili + " API请求失败，请检查网路重试");
        } else iI1i1l1l(IIllIili, l1iIiIll);
      } catch (l1Iii11) {
        console.log(l1Iii11, l1i1l1ii);
      } finally {
        iIIi1i1i();
      }
    });
  });
}
async function iI1i1l1l(l111li1I, iill1il) {
  let iIlI1iil = "";
  try {
    (l111li1I != "accessLogWithAD" || l111li1I != "drawContent") && iill1il && (iIlI1iil = JSON.parse(iill1il));
  } catch (l1lIi1i1) {
    console.log(l111li1I + " 执行任务异常");
    console.log(iill1il);
    $.runFalag = false;
  }
  try {
    switch (l111li1I) {
      case "getMyPing":
        if (typeof iIlI1iil == "object") {
          if (iIlI1iil.result && iIlI1iil.result === true) {
            if (iIlI1iil.data && typeof iIlI1iil.data.secretPin != "undefined") $.Pin = iIlI1iil.data.secretPin;
            if (iIlI1iil.data && typeof iIlI1iil.data.nickname != "undefined") $.nickname = iIlI1iil.data.nickname;
          } else iIlI1iil.errorMessage ? console.log(l111li1I + " " + (iIlI1iil.errorMessage || "")) : console.log(l111li1I + " " + iill1il);
        } else console.log(l111li1I + " " + iill1il);
        break;
      case "task":
        if (typeof iIlI1iil == "object") {
          if (iIlI1iil.result && iIlI1iil.result === true) {
            console.log("任务完成，总积分：" + iIlI1iil.data);
          } else iIlI1iil.errorMessage ? console.log("" + (iIlI1iil.errorMessage || "")) : console.log("" + iill1il);
        } else console.log("" + iill1il);
        break;
      case "draw":
        if (typeof iIlI1iil == "object") {
          if (iIlI1iil.result && iIlI1iil.result === true && iIlI1iil.data.drawOk) console.log("抽中：" + iIlI1iil.data.name);else iIlI1iil.errorMessage ? console.log("" + (iIlI1iil.errorMessage || "")) : console.log("💨  空气");
        } else console.log("" + iill1il);
        break;
      case "activityContent":
        if (typeof iIlI1iil == "object") {
          if (iIlI1iil.result && iIlI1iil.result === true) {
            $.actorUuid = iIlI1iil.data.customerId || "";
            $.turntableId = iIlI1iil.data.turntableId || "";
            $.score = iIlI1iil.data.score || 0;
            $.helpStatus = iIlI1iil.data.helpStatus || 0;
            $.openStatus = iIlI1iil.data.openStatus || 0;
            $.assistCount = iIlI1iil.data.assistCount || 0;
            $.state = iIlI1iil.data.state || "";
            $.taskslist = iIlI1iil.data.giftVOS || [];
          } else {
            if (iIlI1iil.errorMessage) {
              if (iIlI1iil.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(l111li1I + " " + (iIlI1iil.errorMessage || ""));
            } else console.log(l111li1I + " " + iill1il);
          }
        } else console.log(l111li1I + " " + iill1il);
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof iIlI1iil == "object") {
          if (iIlI1iil.isOk) $.openStatus = iIlI1iil.openCard || false;else {
            if (iIlI1iil.errorMessage || iIlI1iil.msg) {
              console.log(l111li1I + " " + (iIlI1iil.errorMessage || iIlI1iil.msg || ""));
            } else console.log(l111li1I + " " + iill1il);
          }
        } else console.log(l111li1I + " " + iill1il);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(l111li1I + "-> " + iill1il);
    }
    typeof iIlI1iil == "object" && iIlI1iil.errorMessage && iIlI1iil.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (l1llii1I) {
    console.log(l1llii1I);
  }
}
function iIlIIl1i(iI11lIII, II1lli, l1lIl1I1 = "POST") {
  let lIlI1ili = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": IlIilIII,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iI11lIII.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1 && (lIlI1ili.Referer = liIl1I1l, lIlI1ili.Cookie = "" + (IilI1 && IilI1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + iIiIl1lI), {
    "url": iI11lIII,
    "method": l1lIl1I1,
    "headers": lIlI1ili,
    "body": II1lli,
    "timeout": 30000
  };
}
function IlI1l1iI() {
  return new Promise(ii1l11l1 => {
    let ill1III1 = {
      "url": "https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2306100000664401",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": IlIilIII,
        "Referer": liIl1I1l,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(ill1III1, async (iIlii1I, lli1III1, Ii111i) => {
      try {
        if (iIlii1I) {
          lli1III1 && typeof lli1III1.statusCode != "undefined" && lli1III1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(iIlii1I));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let l1lI1lIl = $.toObj(Ii111i, Ii111i);
          if (typeof l1lI1lIl == "object") {
            if (l1lI1lIl.result && l1lI1lIl.result === true) {
              $.endTime = l1lI1lIl.data.endTime || 0;
              $.startTimes = l1lI1lIl.data.startTime || Date.now();
            } else l1lI1lIl.errorMessage ? console.log("" + (l1lI1lIl.errorMessage || "")) : console.log("" + Ii111i);
          } else console.log("" + Ii111i);
        }
      } catch (iiillii) {
        $.logErr(iiillii, lli1III1);
      } finally {
        ii1l11l1();
      }
    });
  });
}
function IlIl1lil() {
  return new Promise(l11lIl1 => {
    let l1iI1il = {
      "url": "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": IlIilIII,
        "Referer": liIl1I1l,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1iI1il, async (iI1iIlI1, lll1I1l1, IiiII11) => {
      try {
        if (iI1iIlI1) {
          lll1I1l1 && typeof lll1I1l1.statusCode != "undefined" && lll1I1l1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(iI1iIlI1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let lili111l = IiiII11.match(/(活动已经结束)/) && IiiII11.match(/(活动已经结束)/)[1] || "";
          lili111l && ($.activityEnd = true, console.log("活动已结束"));
          iIiIii1(lll1I1l1);
        }
      } catch (IIIIi1I1) {
        $.logErr(IIIIi1I1, lll1I1l1);
      } finally {
        l11lIl1();
      }
    });
  });
}
function iIiIii1(I1ilIIi) {
  if (I1ilIIi) {
    if (I1ilIIi.headers["set-cookie"]) {
      IlIilIII = originCookie + ";";
      for (let lii1IIIi of I1ilIIi.headers["set-cookie"]) {
        IIII11[lii1IIIi.split(";")[0].substr(0, lii1IIIi.split(";")[0].indexOf("="))] = lii1IIIi.split(";")[0].substr(lii1IIIi.split(";")[0].indexOf("=") + 1);
      }
      for (const iI1ii of Object.keys(IIII11)) {
        IlIilIII += iI1ii + "=" + IIII11[iI1ii] + ";";
      }
      iIiIl1lI = IlIilIII;
    }
  }
}
async function iiIlII11() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + IIIil1lI(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function IIIil1lI(lIiiliil) {
  lIiiliil = lIiiliil || 32;
  let il1I1I1 = "abcdef0123456789",
    iil1ll1I = il1I1I1.length,
    li1lIIi1 = "";
  for (i = 0; i < lIiiliil; i++) li1lIIi1 += il1I1I1.charAt(Math.floor(Math.random() * iil1ll1I));
  return li1lIIi1;
}
async function I1i1iII() {
  return new Promise(async llIillli => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I1llIl = "";
    if ($.shopactivityId) I1llIl = ",\"activityId\":" + $.shopactivityId;
    const iIl111lI = "{\"venderId\":\"1000006644\",\"shopId\":\"1000006644\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I1llIl + ",\"channel\":406}",
      li1I1iIi = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIl111lI)
      },
      lI1ilI1l = await iIIl1llI("8adfb", li1I1iIi),
      i1IlIil1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iIl111lI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lI1ilI1l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": IlIilIII,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1IlIil1, async (IillIii1, il1ill1, IIIiIllI) => {
      try {
        IIIiIllI = IIIiIllI && IIIiIllI.match(/jsonp_.*?\((.*?)\);/) && IIIiIllI.match(/jsonp_.*?\((.*?)\);/)[1] || IIIiIllI;
        let Il11liIi = $.toObj(IIIiIllI, IIIiIllI);
        if (Il11liIi && typeof Il11liIi == "object") {
          if (Il11liIi && Il11liIi.success === true) {
            console.log(Il11liIi.message);
            $.errorJoinShop = Il11liIi.message;
            if (Il11liIi.result && Il11liIi.result.giftInfo) for (let iI1lI1l of Il11liIi.result.giftInfo.giftList) {
              console.log("入会获得:" + iI1lI1l.discountString + iI1lI1l.prizeName + iI1lI1l.secondLineDesc);
            }
          } else Il11liIi && typeof Il11liIi == "object" && Il11liIi.message ? ($.errorJoinShop = Il11liIi.message, console.log("" + (Il11liIi.message || ""))) : console.log(IIIiIllI);
        } else {
          console.log(IIIiIllI);
        }
      } catch (i1111) {
        $.logErr(i1111, il1ill1);
      } finally {
        llIillli();
      }
    });
  });
}
function iIIl1llI(I1llI1, iiIiIII1) {
  return new Promise(async I1IliiIl => {
    let Il1Iilll = {
      "url": "http://api.kingran.cf/h5st",
      "body": "businessId=" + I1llI1 + "&req=" + encodeURIComponent(JSON.stringify(iiIiIII1)),
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "timeout": 30 * 1000
    };
    $.post(Il1Iilll, (i1liill1, IiiI1l1l, ilIil1Il) => {
      try {
        if (i1liill1) {
          console.log(JSON.stringify(i1liill1));
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {}
      } catch (iIilliIl) {
        $.logErr(iIilliIl, IiiI1l1l);
      } finally {
        I1IliiIl(ilIil1Il);
      }
    });
  });
}
function I1ii11(iIlIlili) {
  return new Promise(liiiIl11 => {
    const iI1Iii1l = {
      "url": iIlIlili + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iI1Iii1l, async (I1IiliiI, ilIliiIi, i1ilIII1) => {
      try {
        if (I1IiliiI) {
          $.log(I1IiliiI);
        } else {
          if (i1ilIII1) i1ilIII1 = JSON.parse(i1ilIII1);
        }
      } catch (i1lIil) {
        $.logErr(i1lIil, ilIliiIi);
        i1ilIII1 = null;
      } finally {
        liiiIl11(i1ilIII1);
      }
    });
  });
}
function iiliIIlI(lIIiIl1l) {
  if (typeof lIIiIl1l == "string") try {
    return JSON.parse(lIIiIl1l);
  } catch (lliIllil) {
    return console.log(lliIllil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }