/*
爱让好物 成为礼物 2
新增开卡脚本，一次性脚本

变量
//export opencard_draw="3" //抽奖次数 3

————————————————
入口：[ 爱让好物 成为礼物  2]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#爱让好物 成为礼物 2
11 11 11 11 * jd_opencardL323.js, tag=爱让好物 成为礼物 2, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('爱让好物 成为礼物 2');
const iilIi1 = $.isNode() ? require("./jdCookie.js") : "",
  I111 = $.isNode() ? require("./sendNotify") : "",
  I1I11l = require("./function/krgetToken"),
  I1I11i = require("./function/krh5st");
let l1lIIi = "https://lzdz1-isv.isvjcloud.com",
  iII11I = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  IiIii1 = [],
  l1lIIl = "";
if ($.isNode()) {
  Object.keys(iilIi1).forEach(I11l => {
    IiIii1.push(iilIi1[I11l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IiIii1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iII11i($.getdata("CookiesJD") || "[]").map(Ili1l1 => Ili1l1.cookie)].filter(iilIil => !!iilIil);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let i1lIl = "",
  i1lIi = "",
  iilIiI = {};
!(async () => {
  if (!IiIii1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await I11i("http://code.kingran.cf/323.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[ll1IlI(0, authorCodeList.length)];
  } else {
    let l1ll1l = ["8e61b96a697248cabc43992f6cfc8161", "967eb874356241e98b24470e0ff60521"];
    $.authorCode = l1ll1l[ll1IlI(0, l1ll1l.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "dz492539a34bee9cd44e0cd006855e";
  $.shareUuid = $.authorCode;
  for (let III1iI = 0; III1iI < IiIii1.length; III1iI++) {
    l1lIIl = IiIii1[III1iI];
    originCookie = IiIii1[III1iI];
    if (l1lIIl) {
      $.UserName = decodeURIComponent(l1lIIl.match(/pt_pin=([^; ]+)(?=;?)/) && l1lIIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = III1iI + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await i1IiI1();
      await III1li();
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let iilIll = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iilIll);
    if ($.isNode()) await I111.sendNotify("" + $.name, "" + iilIll);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(iilIli => $.logErr(iilIli)).finally(() => $.done());
async function III1li() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    i1lIl = "";
    $.Token = "";
    $.Pin = "";
    let IIi1 = false;
    $.Raglan = false;
    $.Token = await I1I11l(l1lIIl, l1lIIi);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await I1I11I();
    if (i1lIi == "") {
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
    await Ili1iI("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await Ili1iI("accessLogWithAD");
    await $.wait(1000);
    await Ili1iI("drawContent");
    await Ili1iI("activityContent");
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
    await Ili1iI("checkOpenCard");
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.openStatus == false) {
          IIi1 = true;
          $.joinVenderId = o.venderId;
          $.shopactivityId = "";
          await III1lI();
          for (let illl1i = 0; illl1i < Array(2).length; illl1i++) {
            if (illl1i > 0) console.log("第" + illl1i + "次 重新开卡");
            await lIlllI();
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await Ili1iI("drawContent");
          await Ili1iI("checkOpenCard");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
      await Ili1iI("activityContent");
    } else console.log("已全部开卡");
    $.log("关注: " + $.allFollowShop);
    !$.allFollowShop && !$.outFlag && (IIi1 = true, await Ili1iI("signTask"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    await Ili1iI("activityContent");
    if (iII11I + "" !== "0") {
      $.runFalag = true;
      let iiiIl1 = parseInt($.score2 / 100);
      iII11I = parseInt(iII11I, 10);
      if (iiiIl1 > iII11I) iiiIl1 = iII11I;
      console.log("已设置抽奖次数为" + iiiIl1 + "次，当前有" + $.score2 + "金币");
      for (m = 1; iiiIl1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await Ili1iI("startDraw");
        if ($.runFalag == false) break;
        if (Number(iiiIl1) <= 0) break;
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
  } catch (IIl1) {
    console.log(IIl1);
  }
}
async function Ili1iI(l1ili) {
  if ($.outFlag) return;
  let l1iill = "https://lzdz1-isv.isvjcloud.com",
    l1ill = "",
    lIi1I1 = "POST";
  switch (l1ili) {
    case "getMyPing":
      url = l1iill + "/customer/getMyCidPing";
      l1ill = "token=" + $.Token + "&fromType=APP&userId=1000007395&pin=";
      break;
    case "getSimpleActInfoVo":
      url = l1iill + "/common/brand/getSimpleActInfoVo";
      l1ill = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = l1iill + "/common/accessLogWithAD";
      let IIll = "https://lzdz1-isv.isvjcloud.com/m/1000007395/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      l1ill = "venderId=1000007395&code=90&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(IIll) + "&subType=JDApp";
      break;
    case "drawContent":
      url = l1iill + "/dingzhi/taskact/common/drawContent";
      l1ill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = l1iill + "/dingzhi/apr/union/activityContent";
      l1ill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "checkOpenCard":
      url = l1iill + "/dingzhi/apr/union/initOpenCard";
      l1ill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "getSystime":
      url = l1iill + "/common/getSystime";
      l1ill = "pin=" + encodeURIComponent($.Pin);
      break;
    case "signDetail":
      url = l1iill + "/dingzhi/apr/union/signDetail";
      l1ill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "signTask":
      url = l1iill + "/dingzhi/apr/union/saveTask";
      l1ill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=0&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "mainActive":
      url = l1iill + "/dingzhi/apr/union/saveTask";
      l1ill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=12&taskValue=1&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "startDraw":
      url = l1iill + "/dingzhi/apr/union/draw";
      l1ill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&change=2";
      break;
    case "followShop":
      url = l1iill + "/dingzhi/apr/union/saveTask";
      l1ill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=23&taskValue=23}";
      break;
    case "addSku":
      url = l1iill + "/dingzhi/apr/union/saveTask";
      l1ill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=21&taskValue=21";
      break;
    default:
      console.log("错误" + l1ili);
  }
  let illIIi = Ili1i1(url, l1ill, lIi1I1);
  return new Promise(async i1Ii1i => {
    $.post(illIIi, (ilI1ii, iII1l, ilI1il) => {
      try {
        iII11l(iII1l);
        if (ilI1ii) {
          iII1l && typeof iII1l.statusCode != "undefined" && iII1l.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(ilI1ii, ilI1ii));
          console.log(l1ili + " API请求失败，请检查网路重试");
        } else lIlll1(l1ili, ilI1il);
      } catch (Iil1i) {
        console.log(Iil1i, iII1l);
      } finally {
        i1Ii1i();
      }
    });
  });
}
async function lIlll1(iiiIli, IllIl) {
  let IIli = "";
  try {
    (iiiIli != "accessLogWithAD" || iiiIli != "drawContent") && IllIl && (IIli = JSON.parse(IllIl));
  } catch (iIii11) {
    console.log(iiiIli + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (iiiIli) {
      case "getMyPing":
        if (typeof IIli == "object") {
          if (IIli.result && IIli.result === true) {
            if (IIli.data && typeof IIli.data.secretPin != "undefined") $.Pin = IIli.data.secretPin;
            if (IIli.data && typeof IIli.data.nickname != "undefined") $.nickname = IIli.data.nickname;
          } else IIli.errorMessage ? console.log(iiiIli + " " + (IIli.errorMessage || "")) : console.log(iiiIli + " " + IllIl);
        } else console.log(iiiIli + " " + IllIl);
        break;
      case "checkOpenCard":
        if (typeof IIli == "object") {
          if (IIli.result && IIli.result === true) {
            let i11l1l = IIli.data.cardList1 || [],
              IIllIl = IIli.data.cardList2 || [],
              i11l1i = IIli.data.cardList || [],
              iI11l1 = IIli.data.openCardList || [],
              IlIii = IIli.data.openInfo || [];
            $.openList = [...i11l1i, ...i11l1l, ...IIllIl, ...iI11l1, ...IlIii];
            $.allOpenCard = IIli.data.allOpenCard || IIli.data.isOpenCardStatus || false;
            $.openCardScore1 = IIli.data.score1 || 0;
            $.openCardScore2 = IIli.data.score2 || 0;
            $.drawScore = IIli.data.score || 0;
            if (IIli.data.beans || IIli.data.addBeanNum) console.log("开卡获得:" + (IIli.data.beans || IIli.data.addBeanNum) + "豆");
          } else IIli.errorMessage ? console.log(iiiIli + " " + (IIli.errorMessage || "")) : console.log(iiiIli + " " + IllIl);
        } else console.log(iiiIli + " " + IllIl);
        break;
      case "activityContent":
        if (typeof IIli == "object") {
          if (IIli.result && IIli.result === true) {
            $.actorUuid = IIli.data.actorUuid || "";
            $.saveAddress = IIli.data.saveAddress || false;
            $.followShop = IIli.data.followShop || false;
            $.hasEnd = IIli.data.hasEnd || false;
            $.toSign = IIli.data.toSign || false;
            $.openCard = IIli.data.openCard || false;
            $.allFollowShop = IIli.data.allFollowShop || false;
            $.addSku = IIli.data.skuAddCart || false;
            $.firstAccess = IIli.data.firstAccess || false;
            $.isDraw = IIli.data.isDraw;
            $.score2 = IIli.data.score2 || 0;
            $.assistCount = IIli.data.assistCount || 0;
            $.mainActive = IIli.data.mainActive || false;
            $.sign = IIli.data.sign || false;
          } else {
            if (IIli.errorMessage) {
              if (IIli.errorMessage.indexOf("结束") > -1) $.activityEnd = true;else IIli.errorMessage.includes("擦肩") && ($.Raglan = true);
              console.log(iiiIli + " " + (IIli.errorMessage || ""));
            } else console.log(iiiIli + " " + IllIl);
          }
        } else console.log(iiiIli + " " + IllIl);
        break;
      case "signTask":
        if (typeof IIli == "object") {
          if (IIli.result && IIli.result === true) console.log("获得：" + (IIli.data.score2 || 0) + " ,豆子：" + (IIli.data.taskbeanNum || 0));else {
            console.log("" + (IIli.errorMessage || ""));
          }
        } else console.log("" + IllIl);
        break;
      case "addSku":
      case "mainActive":
      case "followShop":
        if (typeof IIli == "object") {
          if (IIli.result && IIli.result === true && IIli.data) {
            console.log("获得：" + (IIli.data.score2 || 0) + " ");
          } else IIli.errorMessage ? console.log("" + (IIli.errorMessage || "")) : console.log("" + IllIl);
        } else console.log(iiiIli + " " + IllIl);
        break;
      case "startDraw":
        if (typeof IIli == "object") {
          if (IIli.result && IIli.result === true && IIli.data.wdsrvo.drawOk) console.log("获得：" + (IIli.data.wdsrvo.name || "") + " ");else IIli.errorMessage ? console.log("" + (IIli.errorMessage || "")) : console.log("空气");
        } else {
          console.log(iiiIli + " " + IllIl);
        }
        break;
      case "prizeRotation":
        if (typeof IIli == "object") {
          if (IIli.result && IIli.result === true && IIli.data) $.prizeRotation = IIli.data.prizeRotation;else {
            if (IIli.errorMessage) {
              console.log("" + (IIli.errorMessage || ""));
            } else console.log("" + IllIl);
          }
        } else console.log("" + IllIl);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(iiiIli + "-> " + IllIl);
    }
    if (typeof IIli == "object") {
      IIli.errorMessage && IIli.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
    }
  } catch (IlIll) {
    console.log(IlIll);
  }
}
function Ili1i1(liil, i11l11, IlIli = "POST") {
  let iliil1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": l1lIIl,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return liil.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (iliil1.Referer = "https://lzdz1-isv.isvjcloud.com/m/1000007395/" + $.activityId + "/?shareUuid=" + $.shareUuid, iliil1.Cookie = "" + (i1lIl && i1lIl || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + i1lIi), {
    "url": liil,
    "method": IlIli,
    "headers": iliil1,
    "body": i11l11,
    "timeout": 30000
  };
}
function I1I11I() {
  return new Promise(iIil1 => {
    let lIi1Il = {
      "url": "https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": l1lIIl,
        "Referer": "https://lzdz1-isv.isvjcloud.com/m/1000007395/" + $.activityId + "/?shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(lIi1Il, async (Ii1lII, iliI11, ii1iI1) => {
      try {
        if (Ii1lII) {
          if (iliI11 && typeof iliI11.statusCode != "undefined") {
            if (iliI11.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(Ii1lII));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let ll1111 = ii1iI1.match(/(活动已经结束)/) && ii1iI1.match(/(活动已经结束)/)[1] || "";
          if (ll1111) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          iII11l(iliI11);
        }
      } catch (i11IIi) {
        $.logErr(i11IIi, iliI11);
      } finally {
        iIil1();
      }
    });
  });
}
function iII11l(l1Ill1) {
  if (l1Ill1) {
    if (l1Ill1.headers["set-cookie"]) {
      l1lIIl = originCookie + ";";
      for (let i11III of l1Ill1.headers["set-cookie"]) {
        iilIiI[i11III.split(";")[0].substr(0, i11III.split(";")[0].indexOf("="))] = i11III.split(";")[0].substr(i11III.split(";")[0].indexOf("=") + 1);
      }
      for (const Ill1l1 of Object.keys(iilIiI)) {
        l1lIIl += Ill1l1 + "=" + iilIiI[Ill1l1] + ";";
      }
      i1lIi = l1lIIl;
    }
  }
}
async function i1IiI1() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + l1lIII(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function l1lIII(Ii111l) {
  Ii111l = Ii111l || 32;
  let lIi11 = "abcdef0123456789",
    i11II1 = lIi11.length,
    Ilill1 = "";
  for (i = 0; i < Ii111l; i++) Ilill1 += lIi11.charAt(Math.floor(Math.random() * i11II1));
  return Ilill1;
}
function iII11i(iiilIl) {
  if (typeof iiilIl == "string") try {
    return JSON.parse(iiilIl);
  } catch (iiilIi) {
    return console.log(iiilIi), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function l1iI1i(l1Illl) {
  var liIl1l = new Date(l1Illl);
  var Ill1li = liIl1l.getFullYear();
  var Ililii = liIl1l.getMonth() + 1 < 10 ? "0" + (liIl1l.getMonth() + 1) : liIl1l.getMonth() + 1;
  var I111ll = liIl1l.getDate();
  I111ll.length == 2 && (I111ll = "0" + I111ll);
  return Ill1li + Ililii + I111ll;
}
async function lIlllI() {
  if (!$.joinVenderId) return;
  return new Promise(async I1IIIi => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let li11I1 = "";
    if ($.shopactivityId) li11I1 = ",\"activityId\":" + $.shopactivityId;
    const i1I111 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + li11I1 + ",\"channel\":406}",
      l1li11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1I111)
      },
      il1Il1 = await I1I11i("8adfb", l1li11),
      li11II = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i1I111 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(il1Il1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1lIIl,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(li11II, async (lI1i, i11, Ii1llI) => {
      try {
        if (lI1i) {
          if (i11 && typeof i11.statusCode != "undefined") {
            if (i11.statusCode == 403) {}
          }
        } else {
          Ii1llI = Ii1llI && Ii1llI.match(/jsonp_.*?\((.*?)\);/) && Ii1llI.match(/jsonp_.*?\((.*?)\);/)[1] || Ii1llI;
          let lI1l = $.toObj(Ii1llI, Ii1llI);
          if (lI1l && typeof lI1l == "object") {
            if (lI1l && lI1l.success === true) {
              console.log(" >> " + lI1l.message);
              $.errorJoinShop = lI1l.message;
              if (lI1l.result && lI1l.result.giftInfo) for (let li11Il of lI1l.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + li11Il.discountString + li11Il.prizeName + li11Il.secondLineDesc);
              }
            } else lI1l && typeof lI1l == "object" && lI1l.message ? ($.errorJoinShop = lI1l.message, console.log("" + (lI1l.message || ""))) : console.log(Ii1llI);
          } else console.log(Ii1llI);
        }
      } catch (Ii1ll1) {
        $.logErr(Ii1ll1, i11);
      } finally {
        I1IIIi();
      }
    });
  });
}
async function III1lI() {
  return new Promise(async I1Il1l => {
    const I1Il1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      i1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1Il1i)
      },
      IlIiII = await I1I11i("8adfb", i1l),
      iIliI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I1Il1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlIiII),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1lIIl,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIliI, async (i1IlII, ilIii1, ll1III) => {
      try {
        if (i1IlII) {
          if (ilIii1 && typeof ilIii1.statusCode != "undefined") {
            if (ilIii1.statusCode == 403) {}
          }
        } else {
          ll1III = ll1III && ll1III.match(/jsonp_.*?\((.*?)\);/) && ll1III.match(/jsonp_.*?\((.*?)\);/)[1] || ll1III;
          let IIlIil = $.toObj(ll1III, ll1III);
          IIlIil && typeof IIlIil == "object" ? IIlIil && IIlIil.success == true && (console.log("去加入：" + (IIlIil.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = IIlIil.result.interestsRuleList && IIlIil.result.interestsRuleList[0] && IIlIil.result.interestsRuleList[0].interestsInfo && IIlIil.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(ll1III);
        }
      } catch (i1IlIl) {
        $.logErr(i1IlIl, ilIii1);
      } finally {
        I1Il1l();
      }
    });
  });
}
function I11i(ll1IIl) {
  return new Promise(IIlIi1 => {
    const i1IIi1 = {
      "url": "" + ll1IIl,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i1IIi1, async (IIlIiI, l11lll, i1iiI1) => {
      try {
        if (IIlIiI) {} else {
          if (i1iiI1) {
            i1iiI1 = JSON.parse(i1iiI1);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (l1II1i) {
        $.logErr(l1II1i, l11lll);
        i1iiI1 = null;
      } finally {
        IIlIi1(i1iiI1);
      }
    });
  });
}
function ll1IlI(lIllIi, iIi11l) {
  return Math.floor(Math.random() * (iIi11l - lIllIi)) + lIllIi;
}
