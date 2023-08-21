/*
爱让好物 成为礼物 3
新增开卡脚本，一次性脚本

变量
//export opencard_draw="3" //抽奖次数 3

————————————————
入口：[ 爱让好物 成为礼物  3]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#爱让好物 成为礼物 3
11 11 11 11 * jd_opencardL324.js, tag=爱让好物 成为礼物 3, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('爱让好物 成为礼物 3');
const ll1lI1 = $.isNode() ? require("./jdCookie.js") : "",
  II1ll = $.isNode() ? require("./sendNotify") : "",
  liii11 = require("./function/krgetToken"),
  lIiIii = require("./function/krh5st");
let lIl1II = "https://lzdz1-isv.isvjcloud.com",
  Ii1Ili = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  IIiI11 = [],
  Ii1Ill = "";
if ($.isNode()) {
  Object.keys(ll1lI1).forEach(li11li => {
    IIiI11.push(ll1lI1[li11li]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIiI11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1IlI($.getdata("CookiesJD") || "[]").map(iliiii => iliiii.cookie)].filter(IIlIIi => !!IIlIIi);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let ll1Iii = "",
  IIlII1 = "",
  ll1Iil = {};
!(async () => {
  if (!IIiI11[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await Il1I1I("http://code.kingran.cf/324.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[ll1Il1(0, authorCodeList.length)];
  } else {
    let Ii1Iii = ["56b02ce45c594e98b52403efcec3e4f3", "0f223733d4bf439d9c3acc831dd9defa"];
    $.authorCode = Ii1Iii[ll1Il1(0, Ii1Iii.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "dz3104b0f44090a7b850ed2ab36d4d";
  $.shareUuid = $.authorCode;
  for (let Ii1Iil = 0; Ii1Iil < IIiI11.length; Ii1Iil++) {
    Ii1Ill = IIiI11[Ii1Iil];
    originCookie = IIiI11[Ii1Iil];
    if (Ii1Ill) {
      $.UserName = decodeURIComponent(Ii1Ill.match(/pt_pin=([^; ]+)(?=;?)/) && Ii1Ill.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Ii1Iil + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await IIiI1I();
      await li1lI();
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let li1li = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + li1li);
    if ($.isNode()) await II1ll.sendNotify("" + $.name, "" + li1li);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(ll1Ii1 => $.logErr(ll1Ii1)).finally(() => $.done());
async function li1lI() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    ll1Iii = "";
    $.Token = "";
    $.Pin = "";
    let iilIll = false;
    $.Raglan = false;
    $.Token = await liii11(Ii1Ill, lIl1II);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await lIi11i();
    if (IIlII1 == "") {
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
    await iliiiI("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await iliiiI("accessLogWithAD");
    await $.wait(1000);
    await iliiiI("drawContent");
    await iliiiI("activityContent");
    await $.wait(1000);
    if ($.Raglan) return;
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    console.log($.actorUuid);
    $.openList = [];
    $.allOpenCard = false;
    await iliiiI("checkOpenCard");
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.openStatus == false) {
          iilIll = true;
          $.joinVenderId = o.venderId;
          $.shopactivityId = "";
          await Ii1IlI();
          for (let i111I = 0; i111I < Array(2).length; i111I++) {
            if (i111I > 0) console.log("第" + i111I + "次 重新开卡");
            await lIl1Il();
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await iliiiI("drawContent");
          await iliiiI("checkOpenCard");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
      await iliiiI("activityContent");
    } else console.log("已全部开卡");
    $.log("关注: " + $.allFollowShop);
    !$.allFollowShop && !$.outFlag && (iilIll = true, await iliiiI("signTask"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    await iliiiI("activityContent");
    if (Ii1Ili + "" !== "0") {
      $.runFalag = true;
      let l1II1 = parseInt($.score2 / 100);
      Ii1Ili = parseInt(Ii1Ili, 10);
      if (l1II1 > Ii1Ili) l1II1 = Ii1Ili;
      console.log("已设置抽奖次数为" + l1II1 + "次，当前有" + $.score2 + "金币");
      for (m = 1; l1II1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await iliiiI("startDraw");
        if ($.runFalag == false) break;
        if (Number(l1II1) <= 0) break;
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
  } catch (I1IlIl) {
    console.log(I1IlIl);
  }
}
async function iliiiI(l1I1i1) {
  if ($.outFlag) return;
  let l1ll1i = "https://lzdz1-isv.isvjcloud.com",
    IiIil1 = "",
    i111l = "POST";
  switch (l1I1i1) {
    case "getMyPing":
      url = l1ll1i + "/customer/getMyCidPing";
      IiIil1 = "token=" + $.Token + "&fromType=APP&userId=1000431041&pin=";
      break;
    case "getSimpleActInfoVo":
      url = l1ll1i + "/common/brand/getSimpleActInfoVo";
      IiIil1 = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = l1ll1i + "/common/accessLogWithAD";
      let l1IIi = "https://lzdz1-isv.isvjcloud.com/m/1000431041/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      IiIil1 = "venderId=1000431041&code=90&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1IIi) + "&subType=JDApp";
      break;
    case "drawContent":
      url = l1ll1i + "/dingzhi/taskact/common/drawContent";
      IiIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = l1ll1i + "/dingzhi/apr/union/activityContent";
      IiIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "checkOpenCard":
      url = l1ll1i + "/dingzhi/apr/union/initOpenCard";
      IiIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "getSystime":
      url = l1ll1i + "/common/getSystime";
      IiIil1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "signDetail":
      url = l1ll1i + "/dingzhi/apr/union/signDetail";
      IiIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "signTask":
      url = l1ll1i + "/dingzhi/apr/union/saveTask";
      IiIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=0&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "mainActive":
      url = l1ll1i + "/dingzhi/apr/union/saveTask";
      IiIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=12&taskValue=1&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "startDraw":
      url = l1ll1i + "/dingzhi/apr/union/draw";
      IiIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&change=2";
      break;
    case "followShop":
      url = l1ll1i + "/dingzhi/apr/union/saveTask";
      IiIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=23&taskValue=23}";
      break;
    case "addSku":
      url = l1ll1i + "/dingzhi/apr/union/saveTask";
      IiIil1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=21&taskValue=21";
      break;
    default:
      console.log("错误" + l1I1i1);
  }
  let iilIlI = i1Iil(url, IiIil1, i111l);
  return new Promise(async l1IIl => {
    $.post(iilIlI, (IIiI, l1iil1, iiiIiI) => {
      try {
        i1Iii(l1iil1);
        IIiI ? (l1iil1 && typeof l1iil1.statusCode != "undefined" && l1iil1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(IIiI, IIiI)), console.log(l1I1i1 + " API请求失败，请检查网路重试")) : IIlIII(l1I1i1, iiiIiI);
      } catch (iiI1) {
        console.log(iiI1, l1iil1);
      } finally {
        l1IIl();
      }
    });
  });
}
async function IIlIII(IIi1, illl1i) {
  let iiiIi1 = "";
  try {
    (IIi1 != "accessLogWithAD" || IIi1 != "drawContent") && illl1i && (iiiIi1 = JSON.parse(illl1i));
  } catch (I1i1l) {
    console.log(IIi1 + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (IIi1) {
      case "getMyPing":
        if (typeof iiiIi1 == "object") {
          if (iiiIi1.result && iiiIi1.result === true) {
            if (iiiIi1.data && typeof iiiIi1.data.secretPin != "undefined") $.Pin = iiiIi1.data.secretPin;
            if (iiiIi1.data && typeof iiiIi1.data.nickname != "undefined") $.nickname = iiiIi1.data.nickname;
          } else iiiIi1.errorMessage ? console.log(IIi1 + " " + (iiiIi1.errorMessage || "")) : console.log(IIi1 + " " + illl1i);
        } else console.log(IIi1 + " " + illl1i);
        break;
      case "checkOpenCard":
        if (typeof iiiIi1 == "object") {
          if (iiiIi1.result && iiiIi1.result === true) {
            let i1Ii1I = iiiIi1.data.cardList1 || [],
              llIiIl = iiiIi1.data.cardList2 || [],
              I1i1i = iiiIi1.data.cardList || [],
              lIi1II = iiiIi1.data.openCardList || [],
              iiiIii = iiiIi1.data.openInfo || [];
            $.openList = [...I1i1i, ...i1Ii1I, ...llIiIl, ...lIi1II, ...iiiIii];
            $.allOpenCard = iiiIi1.data.allOpenCard || iiiIi1.data.isOpenCardStatus || false;
            $.openCardScore1 = iiiIi1.data.score1 || 0;
            $.openCardScore2 = iiiIi1.data.score2 || 0;
            $.drawScore = iiiIi1.data.score || 0;
            if (iiiIi1.data.beans || iiiIi1.data.addBeanNum) console.log("开卡获得:" + (iiiIi1.data.beans || iiiIi1.data.addBeanNum) + "豆");
          } else {
            if (iiiIi1.errorMessage) {
              console.log(IIi1 + " " + (iiiIi1.errorMessage || ""));
            } else console.log(IIi1 + " " + illl1i);
          }
        } else console.log(IIi1 + " " + illl1i);
        break;
      case "activityContent":
        if (typeof iiiIi1 == "object") {
          if (iiiIi1.result && iiiIi1.result === true) {
            $.actorUuid = iiiIi1.data.actorUuid || "";
            $.saveAddress = iiiIi1.data.saveAddress || false;
            $.followShop = iiiIi1.data.followShop || false;
            $.hasEnd = iiiIi1.data.hasEnd || false;
            $.toSign = iiiIi1.data.toSign || false;
            $.openCard = iiiIi1.data.openCard || false;
            $.allFollowShop = iiiIi1.data.allFollowShop || false;
            $.addSku = iiiIi1.data.skuAddCart || false;
            $.firstAccess = iiiIi1.data.firstAccess || false;
            $.isDraw = iiiIi1.data.isDraw;
            $.score2 = iiiIi1.data.score2 || 0;
            $.assistCount = iiiIi1.data.assistCount || 0;
            $.mainActive = iiiIi1.data.mainActive || false;
            $.sign = iiiIi1.data.sign || false;
          } else {
            if (iiiIi1.errorMessage) {
              if (iiiIi1.errorMessage.indexOf("结束") > -1) $.activityEnd = true;else iiiIi1.errorMessage.includes("擦肩") && ($.Raglan = true);
              console.log(IIi1 + " " + (iiiIi1.errorMessage || ""));
            } else {
              console.log(IIi1 + " " + illl1i);
            }
          }
        } else console.log(IIi1 + " " + illl1i);
        break;
      case "signTask":
        typeof iiiIi1 == "object" ? iiiIi1.result && iiiIi1.result === true ? console.log("获得：" + (iiiIi1.data.score2 || 0) + " ,豆子：" + (iiiIi1.data.taskbeanNum || 0)) : console.log("" + (iiiIi1.errorMessage || "")) : console.log("" + illl1i);
        break;
      case "addSku":
      case "mainActive":
      case "followShop":
        if (typeof iiiIi1 == "object") {
          if (iiiIi1.result && iiiIi1.result === true && iiiIi1.data) console.log("获得：" + (iiiIi1.data.score2 || 0) + " ");else iiiIi1.errorMessage ? console.log("" + (iiiIi1.errorMessage || "")) : console.log("" + illl1i);
        } else console.log(IIi1 + " " + illl1i);
        break;
      case "startDraw":
        if (typeof iiiIi1 == "object") {
          if (iiiIi1.result && iiiIi1.result === true && iiiIi1.data.wdsrvo.drawOk) console.log("获得：" + (iiiIi1.data.wdsrvo.name || "") + " ");else iiiIi1.errorMessage ? console.log("" + (iiiIi1.errorMessage || "")) : console.log("空气");
        } else console.log(IIi1 + " " + illl1i);
        break;
      case "prizeRotation":
        if (typeof iiiIi1 == "object") {
          if (iiiIi1.result && iiiIi1.result === true && iiiIi1.data) $.prizeRotation = iiiIi1.data.prizeRotation;else iiiIi1.errorMessage ? console.log("" + (iiiIi1.errorMessage || "")) : console.log("" + illl1i);
        } else console.log("" + illl1i);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IIi1 + "-> " + illl1i);
    }
    typeof iiiIi1 == "object" && iiiIi1.errorMessage && iiiIi1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (i11Ii) {
    console.log(i11Ii);
  }
}
function i1Iil(iII1I, iilli1, ilI1l1 = "POST") {
  let Iil1i = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Ii1Ill,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iII1I.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (Iil1i.Referer = "https://lzdz1-isv.isvjcloud.com/m/1000431041/" + $.activityId + "/?shareUuid=" + $.shareUuid, Iil1i.Cookie = "" + (ll1Iii && ll1Iii || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + IIlII1), {
    "url": iII1I,
    "method": ilI1l1,
    "headers": Iil1i,
    "body": iilli1,
    "timeout": 30000
  };
}
function lIi11i() {
  return new Promise(ilI1iI => {
    let i1i1ii = {
      "url": "https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": Ii1Ill,
        "Referer": "https://lzdz1-isv.isvjcloud.com/m/1000431041/" + $.activityId + "/?shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(i1i1ii, async (Il1ill, Il1ili, liIIII) => {
      try {
        if (Il1ill) {
          Il1ili && typeof Il1ili.statusCode != "undefined" && Il1ili.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(Il1ill));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iil1I1 = liIIII.match(/(活动已经结束)/) && liIIII.match(/(活动已经结束)/)[1] || "";
          iil1I1 && ($.activityEnd = true, console.log("活动已结束"));
          i1Iii(Il1ili);
        }
      } catch (iii111) {
        $.logErr(iii111, Il1ili);
      } finally {
        ilI1iI();
      }
    });
  });
}
function i1Iii(liIII1) {
  if (liIII1) {
    if (liIII1.headers["set-cookie"]) {
      Ii1Ill = originCookie + ";";
      for (let lii1 of liIII1.headers["set-cookie"]) {
        ll1Iil[lii1.split(";")[0].substr(0, lii1.split(";")[0].indexOf("="))] = lii1.split(";")[0].substr(lii1.split(";")[0].indexOf("=") + 1);
      }
      for (const iIii1l of Object.keys(ll1Iil)) {
        Ii1Ill += iIii1l + "=" + ll1Iil[iIii1l] + ";";
      }
      IIlII1 = Ii1Ill;
    }
  }
}
async function IIiI1I() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + lIi11l(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function lIi11l(IIil1i) {
  IIil1i = IIil1i || 32;
  let II1i1I = "abcdef0123456789",
    iIliI1 = II1i1I.length,
    iIii11 = "";
  for (i = 0; i < IIil1i; i++) iIii11 += II1i1I.charAt(Math.floor(Math.random() * iIliI1));
  return iIii11;
}
function i1IlI(i11l1l) {
  if (typeof i11l1l == "string") {
    try {
      return JSON.parse(i11l1l);
    } catch (II1i11) {
      return console.log(II1i11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function lIl1Ii(iIii1I) {
  var i1i1li = new Date(iIii1I);
  var iii11l = i1i1li.getFullYear();
  var iIill = i1i1li.getMonth() + 1 < 10 ? "0" + (i1i1li.getMonth() + 1) : i1i1li.getMonth() + 1;
  var iI11i1 = i1i1li.getDate();
  iI11i1.length == 2 && (iI11i1 = "0" + iI11i1);
  return iii11l + iIill + iI11i1;
}
async function lIl1Il() {
  if (!$.joinVenderId) return;
  return new Promise(async l1IllI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiilII = "";
    if ($.shopactivityId) iiilII = ",\"activityId\":" + $.shopactivityId;
    const IIiIII = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiilII + ",\"channel\":406}",
      lili = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIiIII)
      },
      lIi1Il = await lIiIii("8adfb", lili),
      Ii1lII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IIiIII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIi1Il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ii1Ill,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ii1lII, async (iliI11, ii1iI1, ll111I) => {
      try {
        if (iliI11) {
          if (ii1iI1 && typeof ii1iI1.statusCode != "undefined") {
            if (ii1iI1.statusCode == 403) {}
          }
        } else {
          ll111I = ll111I && ll111I.match(/jsonp_.*?\((.*?)\);/) && ll111I.match(/jsonp_.*?\((.*?)\);/)[1] || ll111I;
          let ii1iII = $.toObj(ll111I, ll111I);
          if (ii1iII && typeof ii1iII == "object") {
            if (ii1iII && ii1iII.success === true) {
              console.log(" >> " + ii1iII.message);
              $.errorJoinShop = ii1iII.message;
              if (ii1iII.result && ii1iII.result.giftInfo) {
                for (let ll1111 of ii1iII.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + ll1111.discountString + ll1111.prizeName + ll1111.secondLineDesc);
                }
              }
            } else ii1iII && typeof ii1iII == "object" && ii1iII.message ? ($.errorJoinShop = ii1iII.message, console.log("" + (ii1iII.message || ""))) : console.log(ll111I);
          } else console.log(ll111I);
        }
      } catch (IIiIIl) {
        $.logErr(IIiIIl, ii1iI1);
      } finally {
        l1IllI();
      }
    });
  });
}
async function Ii1IlI() {
  return new Promise(async ii1iIl => {
    const Ilili1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iIiiI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ilili1)
      },
      Ii111i = await lIiIii("8adfb", iIiiI),
      l1iiiI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Ilili1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Ii111i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ii1Ill,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1iiiI, async (lIi11, i11II1, Ilill1) => {
      try {
        if (lIi11) {
          if (i11II1 && typeof i11II1.statusCode != "undefined") {
            if (i11II1.statusCode == 403) {}
          }
        } else {
          Ilill1 = Ilill1 && Ilill1.match(/jsonp_.*?\((.*?)\);/) && Ilill1.match(/jsonp_.*?\((.*?)\);/)[1] || Ilill1;
          let l1iii1 = $.toObj(Ilill1, Ilill1);
          l1iii1 && typeof l1iii1 == "object" ? l1iii1 && l1iii1.success == true && (console.log("去加入：" + (l1iii1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = l1iii1.result.interestsRuleList && l1iii1.result.interestsRuleList[0] && l1iii1.result.interestsRuleList[0].interestsInfo && l1iii1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(Ilill1);
        }
      } catch (iIliIl) {
        $.logErr(iIliIl, i11II1);
      } finally {
        ii1iIl();
      }
    });
  });
}
function Il1I1I(l1Illl) {
  return new Promise(I111ll => {
    const I1ii1i = {
      "url": "" + l1Illl,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1ii1i, async (Ii1ll, iIlll, liII11) => {
      try {
        if (Ii1ll) {} else liII11 ? liII11 = JSON.parse(liII11) : console.log("未获取到数据,请重新运行");
      } catch (I1IIIi) {
        $.logErr(I1IIIi, iIlll);
        liII11 = null;
      } finally {
        I111ll(liII11);
      }
    });
  });
}
function ll1Il1(lI11, li11I1) {
  return Math.floor(Math.random() * (li11I1 - lI11)) + lI11;
}
