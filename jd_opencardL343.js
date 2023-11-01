/*
11.11时尚大牌云集 黑马新品聚惠 2
新增开卡脚本，一次性脚本

变量
//export opencard_draw="3" //抽奖次数 3

————————————————
入口：[ 11.11时尚大牌云集 黑马新品聚惠 2]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#11.11时尚大牌云集 黑马新品聚惠 2
11 11 11 11 * jd_opencardL343.js, tag=11.11时尚大牌云集 黑马新品聚惠 2, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('11.11时尚大牌云集 黑马新品聚惠 2');

const Ii1lIi = $.isNode() ? require("./jdCookie.js") : "",
  li11il = $.isNode() ? require("./sendNotify") : "",
  ll1lII = require("./function/krgetToken"),
  Ii1lIl = require("./function/krh5st");
let I1IIi1 = "https://lzdz1-isv.isvjcloud.com",
  ll1lI1 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  II1ll = [],
  liii11 = "";
if ($.isNode()) {
  Object.keys(Ii1lIi).forEach(lIi11l => {
    II1ll.push(Ii1lIi[lIi11l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  II1ll = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iliiiI($.getdata("CookiesJD") || "[]").map(i1IlI => i1IlI.cookie)].filter(lIl1Ii => !!lIl1Ii);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lIiIii = "",
  i1Ill = "",
  Il1I11 = {};
!(async () => {
  if (!II1ll[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await i1Iii("http://code.kingran.cf/342.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[IIiI1I(0, authorCodeList.length)];
  } else {
    let lIilI1 = ["d180b5dc8620443e96f60fdf76fdc568"];
    $.authorCode = lIilI1[IIiI1I(0, lIilI1.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "dz012a26634cba8b96f8d4ac6ddae2";
  $.shareUuid = $.authorCode;
  for (let Il1I1l = 0; Il1I1l < II1ll.length; Il1I1l++) {
    liii11 = II1ll[Il1I1l];
    originCookie = II1ll[Il1I1l];
    if (liii11) {
      $.UserName = decodeURIComponent(liii11.match(/pt_pin=([^; ]+)(?=;?)/) && liii11.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Il1I1l + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await ll1Iil();
      await lIl1II();
      if ($.outFlag || $.activityEnd) {
        break;
      }
      if ($.hasEnd) {
        break;
      }
    }
  }
  if ($.outFlag) {
    let iIIIli = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iIIIli);
    if ($.isNode()) {
      await li11il.sendNotify("" + $.name, "" + iIIIli);
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(I1IIll => $.logErr(I1IIll)).finally(() => $.done());
async function lIl1II() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lIiIii = "";
    $.Token = "";
    $.Pin = "";
    let I1I111 = false;
    $.Raglan = false;
    $.Token = await ll1lII(liii11, I1IIi1);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await ll1Iii();
    if (i1Ill == "") {
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
    await Ii1Ili("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await Ii1Ili("accessLogWithAD");
    await $.wait(1000);
    await Ii1Ili("drawContent");
    await Ii1Ili("activityContent");
    await $.wait(1000);
    if ($.Raglan) {
      return;
    }
    if ($.hotFlag) {
      return;
    }
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    console.log($.actorUuid);
    $.openList = [];
    $.allOpenCard = false;
    await Ii1Ili("checkOpenCard");
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.openStatus == false) {
          I1I111 = true;
          $.joinVenderId = o.venderId;
          $.shopactivityId = "";
          await lIi11i();
          for (let I11I = 0; I11I < Array(2).length; I11I++) {
            if (I11I > 0) {
              console.log("第" + I11I + "次 重新开卡");
            }
            await i1Iil();
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await Ii1Ili("drawContent");
          await Ii1Ili("checkOpenCard");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
      await Ii1Ili("activityContent");
    } else {
      console.log("已全部开卡");
    }
    $.log("关注: " + $.allFollowShop);
    if (!$.allFollowShop && !$.outFlag) {
      I1I111 = true;
      await Ii1Ili("signTask");
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    await Ii1Ili("activityContent");
    if (ll1lI1 + "" !== "0") {
      $.runFalag = true;
      let lIiIil = parseInt($.score2 / 100);
      ll1lI1 = parseInt(ll1lI1, 10);
      if (lIiIil > ll1lI1) {
        lIiIil = ll1lI1;
      }
      console.log("已设置抽奖次数为" + lIiIil + "次，当前有" + $.score2 + "金币");
      for (m = 1; lIiIil--; m++) {
        console.log("进行第" + m + "次抽奖");
        await Ii1Ili("startDraw");
        if ($.runFalag == false) {
          break;
        }
        if (Number(lIiIil) <= 0) {
          break;
        }
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
    if ($.index % 3 == 0) {
      await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
    }
  } catch (IlIi11) {
    console.log(IlIi11);
  }
}
async function Ii1Ili(l1ll1l) {
  if ($.outFlag) {
    return;
  }
  let iIIlIl = "https://lzdz1-isv.isvjcloud.com",
    iIIlIi = "",
    iilIll = "POST";
  switch (l1ll1l) {
    case "getMyPing":
      url = iIIlIl + "/customer/getMyCidPing";
      iIIlIi = "token=" + $.Token + "&fromType=APP&userId=61055&pin=";
      break;
    case "getSimpleActInfoVo":
      url = iIIlIl + "/common/brand/getSimpleActInfoVo";
      iIIlIi = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = iIIlIl + "/common/accessLogWithAD";
      let l1III = "https://lzdz1-isv.isvjcloud.com/m/61055/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      iIIlIi = "venderId=61055&code=90&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1III) + "&subType=JDApp";
      break;
    case "drawContent":
      url = iIIlIl + "/dingzhi/taskact/common/drawContent";
      iIIlIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = iIIlIl + "/dingzhi/apr/union/activityContent";
      iIIlIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "checkOpenCard":
      url = iIIlIl + "/dingzhi/apr/union/initOpenCard";
      iIIlIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "getSystime":
      url = iIIlIl + "/common/getSystime";
      iIIlIi = "pin=" + encodeURIComponent($.Pin);
      break;
    case "signDetail":
      url = iIIlIl + "/dingzhi/apr/union/signDetail";
      iIIlIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "signTask":
      url = iIIlIl + "/dingzhi/apr/union/saveTask";
      iIIlIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=0&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "mainActive":
      url = iIIlIl + "/dingzhi/apr/union/saveTask";
      iIIlIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=12&taskValue=1&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "startDraw":
      url = iIIlIl + "/dingzhi/apr/union/draw";
      iIIlIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&change=2";
      break;
    case "followShop":
      url = iIIlIl + "/dingzhi/apr/union/saveTask";
      iIIlIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=23&taskValue=23}";
      break;
    case "addSku":
      url = iIIlIl + "/dingzhi/apr/union/saveTask";
      iIIlIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=21&taskValue=21";
      break;
    default:
      console.log("错误" + l1ll1l);
  }
  let IlIi1I = Ii1Ill(url, iIIlIi, iilIll);
  return new Promise(async l1I1iI => {
    $.post(IlIi1I, (l1I1il, III1ii, l1I1ii) => {
      try {
        IIlII1(III1ii);
        l1I1il ? (III1ii && typeof III1ii.statusCode != "undefined" && III1ii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(l1I1il, l1I1il)), console.log(l1ll1l + " API请求失败，请检查网路重试")) : IIiI11(l1ll1l, l1I1ii);
      } catch (IIiI) {
        console.log(IIiI, III1ii);
      } finally {
        l1I1iI();
      }
    });
  });
}
async function IIiI11(Ill1i1, illl1I) {
  let Il11i = "";
  try {
    (Ill1i1 != "accessLogWithAD" || Ill1i1 != "drawContent") && illl1I && (Il11i = JSON.parse(illl1I));
  } catch (I1i1i) {
    console.log(Ill1i1 + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (Ill1i1) {
      case "getMyPing":
        if (typeof Il11i == "object") {
          if (Il11i.result && Il11i.result === true) {
            if (Il11i.data && typeof Il11i.data.secretPin != "undefined") {
              $.Pin = Il11i.data.secretPin;
            }
            if (Il11i.data && typeof Il11i.data.nickname != "undefined") {
              $.nickname = Il11i.data.nickname;
            }
          } else {
            Il11i.errorMessage ? console.log(Ill1i1 + " " + (Il11i.errorMessage || "")) : console.log(Ill1i1 + " " + illl1I);
          }
        } else {
          console.log(Ill1i1 + " " + illl1I);
        }
        break;
      case "checkOpenCard":
        if (typeof Il11i == "object") {
          if (Il11i.result && Il11i.result === true) {
            let lilli = Il11i.data.cardList1 || [],
              iiII = Il11i.data.cardList2 || [],
              Iil11 = Il11i.data.cardList || [],
              Ill1iI = Il11i.data.openCardList || [],
              i1Ii1l = Il11i.data.openInfo || [];
            $.openList = [...Iil11, ...lilli, ...iiII, ...Ill1iI, ...i1Ii1l];
            $.allOpenCard = Il11i.data.allOpenCard || Il11i.data.isOpenCardStatus || false;
            $.openCardScore1 = Il11i.data.score1 || 0;
            $.openCardScore2 = Il11i.data.score2 || 0;
            $.drawScore = Il11i.data.score || 0;
            if (Il11i.data.beans || Il11i.data.addBeanNum) {
              console.log("开卡获得:" + (Il11i.data.beans || Il11i.data.addBeanNum) + "豆");
            }
          } else {
            if (Il11i.errorMessage) {
              console.log(Ill1i1 + " " + (Il11i.errorMessage || ""));
            } else {
              console.log(Ill1i1 + " " + illl1I);
            }
          }
        } else {
          console.log(Ill1i1 + " " + illl1I);
        }
        break;
      case "activityContent":
        if (typeof Il11i == "object") {
          if (Il11i.result && Il11i.result === true) {
            $.actorUuid = Il11i.data.actorUuid || "";
            $.saveAddress = Il11i.data.saveAddress || false;
            $.followShop = Il11i.data.followShop || false;
            $.hasEnd = Il11i.data.hasEnd || false;
            $.toSign = Il11i.data.toSign || false;
            $.openCard = Il11i.data.openCard || false;
            $.allFollowShop = Il11i.data.allFollowShop || false;
            $.addSku = Il11i.data.skuAddCart || false;
            $.firstAccess = Il11i.data.firstAccess || false;
            $.isDraw = Il11i.data.isDraw;
            $.score2 = Il11i.data.score2 || 0;
            $.assistCount = Il11i.data.assistCount || 0;
            $.mainActive = Il11i.data.mainActive || false;
            $.sign = Il11i.data.sign || false;
          } else {
            if (Il11i.errorMessage) {
              if (Il11i.errorMessage.indexOf("结束") > -1) {
                $.activityEnd = true;
              } else {
                Il11i.errorMessage.includes("擦肩") && ($.Raglan = true);
              }
              console.log(Ill1i1 + " " + (Il11i.errorMessage || ""));
            } else {
              console.log(Ill1i1 + " " + illl1I);
            }
          }
        } else {
          console.log(Ill1i1 + " " + illl1I);
        }
        break;
      case "signTask":
        typeof Il11i == "object" ? Il11i.result && Il11i.result === true ? console.log("获得：" + (Il11i.data.score2 || 0) + " ,豆子：" + (Il11i.data.taskbeanNum || 0)) : console.log("" + (Il11i.errorMessage || "")) : console.log("" + illl1I);
        break;
      case "addSku":
      case "mainActive":
      case "followShop":
        if (typeof Il11i == "object") {
          if (Il11i.result && Il11i.result === true && Il11i.data) {
            console.log("获得：" + (Il11i.data.score2 || 0) + " ");
          } else {
            Il11i.errorMessage ? console.log("" + (Il11i.errorMessage || "")) : console.log("" + illl1I);
          }
        } else {
          console.log(Ill1i1 + " " + illl1I);
        }
        break;
      case "startDraw":
        if (typeof Il11i == "object") {
          if (Il11i.result && Il11i.result === true && Il11i.data.wdsrvo.drawOk) {
            console.log("获得：" + (Il11i.data.wdsrvo.name || "") + " ");
          } else {
            if (Il11i.errorMessage) {
              console.log("" + (Il11i.errorMessage || ""));
            } else {
              console.log("空气");
            }
          }
        } else {
          console.log(Ill1i1 + " " + illl1I);
        }
        break;
      case "prizeRotation":
        if (typeof Il11i == "object") {
          if (Il11i.result && Il11i.result === true && Il11i.data) {
            $.prizeRotation = Il11i.data.prizeRotation;
          } else {
            Il11i.errorMessage ? console.log("" + (Il11i.errorMessage || "")) : console.log("" + illl1I);
          }
        } else {
          console.log("" + illl1I);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(Ill1i1 + "-> " + illl1I);
    }
    typeof Il11i == "object" && Il11i.errorMessage && Il11i.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (Iil1i) {
    console.log(Iil1i);
  }
}
function Ii1Ill(i1i1i1, iiiIli, IllIl = "POST") {
  let IIli = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: liii11,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  i1i1i1.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (IIli.Referer = "https://lzdz1-isv.isvjcloud.com/m/61055/" + $.activityId + "/?shareUuid=" + $.shareUuid, IIli.Cookie = "" + (lIiIii && lIiIii || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + i1Ill);
  return {
    url: i1i1i1,
    method: IllIl,
    headers: IIli,
    body: iiiIli,
    timeout: 30000
  };
}
function ll1Iii() {
  return new Promise(i11II => {
    let i1i1il = {
      url: "https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: liii11,
        Referer: "https://lzdz1-isv.isvjcloud.com/m/61055/" + $.activityId + "/?shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(i1i1il, async (I111il, l1Ili1, iliili) => {
      try {
        if (I111il) {
          if (l1Ili1 && typeof l1Ili1.statusCode != "undefined") {
            l1Ili1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(I111il));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iIliIi = iliili.match(/(活动已经结束)/) && iliili.match(/(活动已经结束)/)[1] || "";
          iIliIi && ($.activityEnd = true, console.log("活动已结束"));
          IIlII1(l1Ili1);
        }
      } catch (i1i1l1) {
        $.logErr(i1i1l1, l1Ili1);
      } finally {
        i11II();
      }
    });
  });
}
function IIlII1(IIil1i) {
  if (IIil1i) {
    if (IIil1i.headers["set-cookie"]) {
      liii11 = originCookie + ";";
      for (let iIii11 of IIil1i.headers["set-cookie"]) {
        Il1I11[iIii11.split(";")[0].substr(0, iIii11.split(";")[0].indexOf("="))] = iIii11.split(";")[0].substr(iIii11.split(";")[0].indexOf("=") + 1);
      }
      for (const i1i1lI of Object.keys(Il1I11)) {
        liii11 += i1i1lI + "=" + Il1I11[i1i1lI] + ";";
      }
      i1Ill = liii11;
    }
  }
}
async function ll1Iil() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + li1lI(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function li1lI(IIllIl) {
  IIllIl = IIllIl || 32;
  let iI11l1 = "abcdef0123456789",
    IlIii = iI11l1.length,
    iI11lI = "";
  for (i = 0; i < IIllIl; i++) {
    iI11lI += iI11l1.charAt(Math.floor(Math.random() * IlIii));
  }
  return iI11lI;
}
function iliiiI(I1ii11) {
  if (typeof I1ii11 == "string") {
    try {
      return JSON.parse(I1ii11);
    } catch (iIill) {
      console.log(iIill);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function IIlIII(iil1Ii) {
  var I111i1 = new Date(iil1Ii);
  var iIili = I111i1.getFullYear();
  var iil1Il = I111i1.getMonth() + 1 < 10 ? "0" + (I111i1.getMonth() + 1) : I111i1.getMonth() + 1;
  var i11l1I = I111i1.getDate();
  i11l1I.length == 2 && (i11l1I = "0" + i11l1I);
  return iIili + iil1Il + i11l1I;
}
async function i1Iil() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async Il1iiI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l1IllI = "";
    if ($.shopactivityId) {
      l1IllI = ",\"activityId\":" + $.shopactivityId;
    }
    const lIi1Ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l1IllI + ",\"channel\":406}",
      iiilII = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(lIi1Ii)
      },
      IIiIII = await Ii1lIl("27004", iiilII),
      lili = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + lIi1Ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IIiIII),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: liii11
        }
      };
    $.get(lili, async (lIi1Il, Ii1lII, iliI11) => {
      try {
        if (lIi1Il) {
          console.log(lIi1Il);
        } else {
          const Ill1lI = JSON.parse(iliI11);
          if (typeof Ill1lI === "object") {
            if (Ill1lI.success === true) {
              console.log(Ill1lI.message);
              $.errorJoinShop = Ill1lI.message;
              if (Ill1lI.result && Ill1lI.result.giftInfo) {
                for (let iliI1I of Ill1lI.result.giftInfo.giftList) {
                  console.log("入会获得：" + iliI1I.discountString + iliI1I.prizeName + iliI1I.secondLineDesc);
                }
              }
            } else {
              typeof Ill1lI == "object" && Ill1lI.message ? ($.errorJoinShop = Ill1lI.message, console.log("" + (Ill1lI.message || ""))) : console.log(iliI11);
            }
          } else {
            console.log(iliI11);
          }
        }
      } catch (IIiIIl) {
        $.logErr(IIiIIl, Ii1lII);
      } finally {
        Il1iiI();
      }
    });
  });
}
async function lIi11i() {
  return new Promise(async ll111l => {
    let illIII = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iliI1l = {
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(illIII)
      },
      ii1iIi = await Ii1lIl("27004", iliI1l),
      iliI1i = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + illIII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ii1iIi),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: liii11
        }
      };
    $.get(iliI1i, async (i11II1, Ilill1, I111lI) => {
      try {
        if (i11II1) {
          console.log(i11II1);
        } else {
          const l1Illi = JSON.parse(I111lI);
          typeof l1Illi === "object" ? l1Illi.success === true && (console.log("去加入：" + (l1Illi.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = l1Illi.result.interestsRuleList && l1Illi.result.interestsRuleList[0] && l1Illi.result.interestsRuleList[0].interestsInfo && l1Illi.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = l1Illi.result.userInfo.openCardStatus) : console.log(I111lI);
        }
      } catch (iI11ll) {
        $.logErr(iI11ll, Ilill1);
      } finally {
        ll111l();
      }
    });
  });
}
function i1Iii(IIiII1) {
  return new Promise(I1liIi => {
    const I1ii1l = {
      url: "" + IIiII1,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1ii1l, async (l11li, iIlli, l11ll) => {
      try {
        if (!l11li) {
          l11ll ? l11ll = JSON.parse(l11ll) : console.log("未获取到数据,请重新运行");
        }
      } catch (l1li1I) {
        $.logErr(l1li1I, iIlli);
        l11ll = null;
      } finally {
        I1liIi(l11ll);
      }
    });
  });
}
function IIiI1I(il1IlI, I1IIIi) {
  return Math.floor(Math.random() * (I1IIIi - il1IlI)) + il1IlI;
}
