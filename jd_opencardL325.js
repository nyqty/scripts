/*
爱让好物 成为礼物 4
新增开卡脚本，一次性脚本

变量
//export opencard_draw="3" //抽奖次数 3

————————————————
入口：[ 爱让好物 成为礼物  4]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#爱让好物 成为礼物 4
11 11 11 11 * jd_opencardL325.js, tag=爱让好物 成为礼物 4, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('爱让好物 成为礼物 4');
const Ii1IlI = $.isNode() ? require("./jdCookie.js") : "",
  Il1I1I = $.isNode() ? require("./sendNotify") : "",
  ll1Il1 = require("./function/krgetToken"),
  li11li = require("./function/krh5st");
let iliiil = "https://lzdz1-isv.isvjcloud.com",
  li11ll = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  i1Il1 = [],
  li1l1 = "";
if ($.isNode()) {
  Object.keys(Ii1IlI).forEach(ll1IiI => {
    i1Il1.push(Ii1IlI[ll1IiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1Il1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIilII($.getdata("CookiesJD") || "[]").map(li1li => li1li.cookie)].filter(iIIIll => !!iIIIll);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let IIiI1l = "",
  IIiI1i = "",
  ilIllI = {};
!(async () => {
  if (!i1Il1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await Ii1Iii("http://code.kingran.cf/325.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[Ii1Iil(0, authorCodeList.length)];
  } else {
    let i1lIl = ["ccc277ec21054ad1830e3f5b48ea9362", "53400d1b08f541b4891f01f5532a79b9"];
    $.authorCode = i1lIl[Ii1Iil(0, i1lIl.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "dz45071d14545c4111bf08da1a61f9";
  $.shareUuid = $.authorCode;
  for (let i1lIi = 0; i1lIi < i1Il1.length; i1lIi++) {
    li1l1 = i1Il1[i1lIi];
    originCookie = i1Il1[i1lIi];
    if (li1l1) {
      $.UserName = decodeURIComponent(li1l1.match(/pt_pin=([^; ]+)(?=;?)/) && li1l1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1lIi + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await I1IIll();
      await I1IIli();
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let Ili1iI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + Ili1iI);
    if ($.isNode()) await Il1I1I.sendNotify("" + $.name, "" + Ili1iI);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(lIlll1 => $.logErr(lIlll1)).finally(() => $.done());
async function I1IIli() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    IIiI1l = "";
    $.Token = "";
    $.Pin = "";
    let llIii1 = false;
    $.Raglan = false;
    $.Token = await ll1Il1(li1l1, iliiil);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await Ii1Il1();
    if (IIiI1i == "") {
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
    await Il1I1i("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await Il1I1i("accessLogWithAD");
    await $.wait(1000);
    await Il1I1i("drawContent");
    await Il1I1i("activityContent");
    await $.wait(1000);
    if ($.Raglan) {
      return;
    }
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    console.log($.actorUuid);
    $.openList = [];
    $.allOpenCard = false;
    await Il1I1i("checkOpenCard");
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.openStatus == false) {
          llIii1 = true;
          $.joinVenderId = o.venderId;
          $.shopactivityId = "";
          await ilIlll();
          for (let lIiIli = 0; lIiIli < Array(2).length; lIiIli++) {
            if (lIiIli > 0) console.log("第" + lIiIli + "次 重新开卡");
            await I1IIlI();
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await Il1I1i("drawContent");
          await Il1I1i("checkOpenCard");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
      await Il1I1i("activityContent");
    } else console.log("已全部开卡");
    $.log("关注: " + $.allFollowShop);
    !$.allFollowShop && !$.outFlag && (llIii1 = true, await Il1I1i("signTask"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    await Il1I1i("activityContent");
    if (li11ll + "" !== "0") {
      $.runFalag = true;
      let lIlliI = parseInt($.score2 / 100);
      li11ll = parseInt(li11ll, 10);
      if (lIlliI > li11ll) lIlliI = li11ll;
      console.log("已设置抽奖次数为" + lIlliI + "次，当前有" + $.score2 + "金币");
      for (m = 1; lIlliI--; m++) {
        console.log("进行第" + m + "次抽奖");
        await Il1I1i("startDraw");
        if ($.runFalag == false) break;
        if (Number(lIlliI) <= 0) break;
        if (m >= 10) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    console.log("当前助力:" + $.shareUuid);
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (IiIiil) {
    console.log(IiIiil);
  }
}
async function Il1I1i(IlIi) {
  if ($.outFlag) return;
  let IiII1 = "https://lzdz1-isv.isvjcloud.com",
    l1IIi = "",
    l1IIl = "POST";
  switch (IlIi) {
    case "getMyPing":
      url = IiII1 + "/customer/getMyCidPing";
      l1IIi = "token=" + $.Token + "&fromType=APP&userId=1000121461&pin=";
      break;
    case "getSimpleActInfoVo":
      url = IiII1 + "/common/brand/getSimpleActInfoVo";
      l1IIi = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = IiII1 + "/common/accessLogWithAD";
      let illl11 = "https://lzdz1-isv.isvjcloud.com/m/1000121461/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      l1IIi = "venderId=1000121461&code=90&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(illl11) + "&subType=JDApp";
      break;
    case "drawContent":
      url = IiII1 + "/dingzhi/taskact/common/drawContent";
      l1IIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = IiII1 + "/dingzhi/apr/union/activityContent";
      l1IIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "checkOpenCard":
      url = IiII1 + "/dingzhi/apr/union/initOpenCard";
      l1IIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "getSystime":
      url = IiII1 + "/common/getSystime";
      l1IIi = "pin=" + encodeURIComponent($.Pin);
      break;
    case "signDetail":
      url = IiII1 + "/dingzhi/apr/union/signDetail";
      l1IIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "signTask":
      url = IiII1 + "/dingzhi/apr/union/saveTask";
      l1IIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=0&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "mainActive":
      url = IiII1 + "/dingzhi/apr/union/saveTask";
      l1IIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=12&taskValue=1&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "startDraw":
      url = IiII1 + "/dingzhi/apr/union/draw";
      l1IIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&change=2";
      break;
    case "followShop":
      url = IiII1 + "/dingzhi/apr/union/saveTask";
      l1IIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=23&taskValue=23}";
      break;
    case "addSku":
      url = IiII1 + "/dingzhi/apr/union/saveTask";
      l1IIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=21&taskValue=21";
      break;
    default:
      console.log("错误" + IlIi);
  }
  let III1ii = Il1I1l(url, l1IIi, l1IIl);
  return new Promise(async iiI1 => {
    $.post(III1ii, (Il11l, l1iiil, l1ilI) => {
      try {
        iIIIli(l1iiil);
        Il11l ? (l1iiil && typeof l1iiil.statusCode != "undefined" && l1iiil.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(Il11l, Il11l)), console.log(IlIi + " API请求失败，请检查网路重试")) : lIilI1(IlIi, l1ilI);
      } catch (illl1i) {
        console.log(illl1i, l1iiil);
      } finally {
        iiI1();
      }
    });
  });
}
async function lIilI1(l1iiii, iiiIi1) {
  let Il11I = "";
  try {
    (l1iiii != "accessLogWithAD" || l1iiii != "drawContent") && iiiIi1 && (Il11I = JSON.parse(iiiIi1));
  } catch (l1I11) {
    console.log(l1iiii + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (l1iiii) {
      case "getMyPing":
        if (typeof Il11I == "object") {
          if (Il11I.result && Il11I.result === true) {
            if (Il11I.data && typeof Il11I.data.secretPin != "undefined") $.Pin = Il11I.data.secretPin;
            if (Il11I.data && typeof Il11I.data.nickname != "undefined") $.nickname = Il11I.data.nickname;
          } else Il11I.errorMessage ? console.log(l1iiii + " " + (Il11I.errorMessage || "")) : console.log(l1iiii + " " + iiiIi1);
        } else console.log(l1iiii + " " + iiiIi1);
        break;
      case "checkOpenCard":
        if (typeof Il11I == "object") {
          if (Il11I.result && Il11I.result === true) {
            let i1i1iI = Il11I.data.cardList1 || [],
              iillil = Il11I.data.cardList2 || [],
              iillii = Il11I.data.cardList || [],
              ilI1iI = Il11I.data.openCardList || [],
              l1I1i = Il11I.data.openInfo || [];
            $.openList = [...iillii, ...i1i1iI, ...iillil, ...ilI1iI, ...l1I1i];
            $.allOpenCard = Il11I.data.allOpenCard || Il11I.data.isOpenCardStatus || false;
            $.openCardScore1 = Il11I.data.score1 || 0;
            $.openCardScore2 = Il11I.data.score2 || 0;
            $.drawScore = Il11I.data.score || 0;
            if (Il11I.data.beans || Il11I.data.addBeanNum) console.log("开卡获得:" + (Il11I.data.beans || Il11I.data.addBeanNum) + "豆");
          } else {
            if (Il11I.errorMessage) {
              console.log(l1iiii + " " + (Il11I.errorMessage || ""));
            } else console.log(l1iiii + " " + iiiIi1);
          }
        } else console.log(l1iiii + " " + iiiIi1);
        break;
      case "activityContent":
        if (typeof Il11I == "object") {
          if (Il11I.result && Il11I.result === true) {
            $.actorUuid = Il11I.data.actorUuid || "";
            $.saveAddress = Il11I.data.saveAddress || false;
            $.followShop = Il11I.data.followShop || false;
            $.hasEnd = Il11I.data.hasEnd || false;
            $.toSign = Il11I.data.toSign || false;
            $.openCard = Il11I.data.openCard || false;
            $.allFollowShop = Il11I.data.allFollowShop || false;
            $.addSku = Il11I.data.skuAddCart || false;
            $.firstAccess = Il11I.data.firstAccess || false;
            $.isDraw = Il11I.data.isDraw;
            $.score2 = Il11I.data.score2 || 0;
            $.assistCount = Il11I.data.assistCount || 0;
            $.mainActive = Il11I.data.mainActive || false;
            $.sign = Il11I.data.sign || false;
          } else {
            if (Il11I.errorMessage) {
              if (Il11I.errorMessage.indexOf("结束") > -1) $.activityEnd = true;else {
                if (Il11I.errorMessage.includes("擦肩")) {
                  $.Raglan = true;
                }
              }
              console.log(l1iiii + " " + (Il11I.errorMessage || ""));
            } else console.log(l1iiii + " " + iiiIi1);
          }
        } else console.log(l1iiii + " " + iiiIi1);
        break;
      case "signTask":
        typeof Il11I == "object" ? Il11I.result && Il11I.result === true ? console.log("获得：" + (Il11I.data.score2 || 0) + " ,豆子：" + (Il11I.data.taskbeanNum || 0)) : console.log("" + (Il11I.errorMessage || "")) : console.log("" + iiiIi1);
        break;
      case "addSku":
      case "mainActive":
      case "followShop":
        if (typeof Il11I == "object") {
          if (Il11I.result && Il11I.result === true && Il11I.data) console.log("获得：" + (Il11I.data.score2 || 0) + " ");else {
            if (Il11I.errorMessage) console.log("" + (Il11I.errorMessage || ""));else {
              console.log("" + iiiIi1);
            }
          }
        } else console.log(l1iiii + " " + iiiIi1);
        break;
      case "startDraw":
        if (typeof Il11I == "object") {
          if (Il11I.result && Il11I.result === true && Il11I.data.wdsrvo.drawOk) console.log("获得：" + (Il11I.data.wdsrvo.name || "") + " ");else Il11I.errorMessage ? console.log("" + (Il11I.errorMessage || "")) : console.log("空气");
        } else console.log(l1iiii + " " + iiiIi1);
        break;
      case "prizeRotation":
        if (typeof Il11I == "object") {
          if (Il11I.result && Il11I.result === true && Il11I.data) $.prizeRotation = Il11I.data.prizeRotation;else Il11I.errorMessage ? console.log("" + (Il11I.errorMessage || "")) : console.log("" + iiiIi1);
        } else console.log("" + iiiIi1);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(l1iiii + "-> " + iiiIi1);
    }
    if (typeof Il11I == "object") {
      if (Il11I.errorMessage) {
        if (Il11I.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (lii1) {
    console.log(lii1);
  }
}
function Il1I1l(iIii1l, iIliIi, IIil1l = "POST") {
  let iIii1i = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": li1l1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iIii1l.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (iIii1i.Referer = "https://lzdz1-isv.isvjcloud.com/m/1000121461/" + $.activityId + "/?shareUuid=" + $.shareUuid, iIii1i.Cookie = "" + (IIiI1l && IIiI1l || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + IIiI1i), {
    "url": iIii1l,
    "method": IIil1l,
    "headers": iIii1i,
    "body": iIliIi,
    "timeout": 30000
  };
}
function Ii1Il1() {
  return new Promise(iIliII => {
    let I1liI1 = {
      "url": "https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": li1l1,
        "Referer": "https://lzdz1-isv.isvjcloud.com/m/1000121461/" + $.activityId + "/?shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(I1liI1, async (I1ii11, IlIil, iI11i1) => {
      try {
        if (I1ii11) {
          if (IlIil && typeof IlIil.statusCode != "undefined") {
            if (IlIil.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(I1ii11));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let I111i1 = iI11i1.match(/(活动已经结束)/) && iI11i1.match(/(活动已经结束)/)[1] || "";
          I111i1 && ($.activityEnd = true, console.log("活动已结束"));
          iIIIli(IlIil);
        }
      } catch (l1Ilil) {
        $.logErr(l1Ilil, IlIil);
      } finally {
        iIliII();
      }
    });
  });
}
function iIIIli(iIili) {
  if (iIili) {
    if (iIili.headers["set-cookie"]) {
      li1l1 = originCookie + ";";
      for (let lIl1iI of iIili.headers["set-cookie"]) {
        ilIllI[lIl1iI.split(";")[0].substr(0, lIl1iI.split(";")[0].indexOf("="))] = lIl1iI.split(";")[0].substr(lIl1iI.split(";")[0].indexOf("=") + 1);
      }
      for (const iil1II of Object.keys(ilIllI)) {
        li1l1 += iil1II + "=" + ilIllI[iil1II] + ";";
      }
      IIiI1i = li1l1;
    }
  }
}
async function I1IIll() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + i1Ii1(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function i1Ii1(iIilI) {
  iIilI = iIilI || 32;
  let iliilI = "abcdef0123456789",
    I111iI = iliilI.length,
    IlIlI = "";
  for (i = 0; i < iIilI; i++) IlIlI += iliilI.charAt(Math.floor(Math.random() * I111iI));
  return IlIlI;
}
function lIilII(II1i1i) {
  if (typeof II1i1i == "string") try {
    return JSON.parse(II1i1i);
  } catch (lili) {
    return console.log(lili), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function ilIlli(lIi1Il) {
  var lill = new Date(lIi1Il);
  var Ill1lI = lill.getFullYear();
  var ll111I = lill.getMonth() + 1 < 10 ? "0" + (lill.getMonth() + 1) : lill.getMonth() + 1;
  var IliliI = lill.getDate();
  IliliI.length == 2 && (IliliI = "0" + IliliI);
  return Ill1lI + ll111I + IliliI;
}
async function I1IIlI() {
  if (!$.joinVenderId) return;
  return new Promise(async Ilili1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iIiiI = "";
    if ($.shopactivityId) iIiiI = ",\"activityId\":" + $.shopactivityId;
    const Ii111i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iIiiI + ",\"channel\":406}",
      l1iiiI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ii111i)
      },
      Ii111l = await li11li("8adfb", l1iiiI),
      iI11li = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Ii111i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Ii111l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": li1l1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iI11li, async (lIi11, i11II1, Ilill1) => {
      try {
        if (lIi11) {
          if (i11II1 && typeof i11II1.statusCode != "undefined") {
            if (i11II1.statusCode == 403) {}
          }
        } else {
          Ilill1 = Ilill1 && Ilill1.match(/jsonp_.*?\((.*?)\);/) && Ilill1.match(/jsonp_.*?\((.*?)\);/)[1] || Ilill1;
          let l1Illi = $.toObj(Ilill1, Ilill1);
          if (l1Illi && typeof l1Illi == "object") {
            if (l1Illi && l1Illi.success === true) {
              console.log(" >> " + l1Illi.message);
              $.errorJoinShop = l1Illi.message;
              if (l1Illi.result && l1Illi.result.giftInfo) {
                for (let Ii111I of l1Illi.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + Ii111I.discountString + Ii111I.prizeName + Ii111I.secondLineDesc);
                }
              }
            } else l1Illi && typeof l1Illi == "object" && l1Illi.message ? ($.errorJoinShop = l1Illi.message, console.log("" + (l1Illi.message || ""))) : console.log(Ilill1);
          } else console.log(Ilill1);
        }
      } catch (lIi1I) {
        $.logErr(lIi1I, i11II1);
      } finally {
        Ilili1();
      }
    });
  });
}
async function ilIlll() {
  return new Promise(async l11li => {
    const il1IlI = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      I1IIIi = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(il1IlI)
      },
      lI11 = await li11li("8adfb", I1IIIi),
      li11I1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + il1IlI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lI11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": li1l1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(li11I1, async (i1I111, l1li11, il1Il1) => {
      try {
        if (i1I111) {
          if (l1li11 && typeof l1li11.statusCode != "undefined") {
            if (l1li11.statusCode == 403) {}
          }
        } else {
          il1Il1 = il1Il1 && il1Il1.match(/jsonp_.*?\((.*?)\);/) && il1Il1.match(/jsonp_.*?\((.*?)\);/)[1] || il1Il1;
          let Ii1li = $.toObj(il1Il1, il1Il1);
          if (Ii1li && typeof Ii1li == "object") Ii1li && Ii1li.success == true && (console.log("去加入：" + (Ii1li.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = Ii1li.result.interestsRuleList && Ii1li.result.interestsRuleList[0] && Ii1li.result.interestsRuleList[0].interestsInfo && Ii1li.result.interestsRuleList[0].interestsInfo.activityId || "");else {
            console.log(il1Il1);
          }
        }
      } catch (iIiIl1) {
        $.logErr(iIiIl1, l1li11);
      } finally {
        l11li();
      }
    });
  });
}
function Ii1Iii(Ii1lll) {
  return new Promise(Ii1llI => {
    const li11Il = {
      "url": "" + Ii1lll,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(li11Il, async (i1I11l, IIlIl1, liII1l) => {
      try {
        if (i1I11l) {} else {
          if (liII1l) {
            liII1l = JSON.parse(liII1l);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (I1III1) {
        $.logErr(I1III1, IIlIl1);
        liII1l = null;
      } finally {
        Ii1llI(liII1l);
      }
    });
  });
}
function Ii1Iil(l11li1, i1I) {
  return Math.floor(Math.random() * (i1I - l11li1)) + l11li1;
}
