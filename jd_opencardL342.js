/*
11.11时尚大牌云集 黑马新品聚惠
新增开卡脚本，一次性脚本

变量
//export opencard_draw="3" //抽奖次数 3

————————————————
入口：[ 11.11时尚大牌云集 黑马新品聚惠]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#11.11时尚大牌云集 黑马新品聚惠
11 11 11 11 * jd_opencardL342.js, tag=11.11时尚大牌云集 黑马新品聚惠, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('11.11时尚大牌云集 黑马新品聚惠');

const IIlIIi = $.isNode() ? require("./jdCookie.js") : "",
  iliiil = $.isNode() ? require("./sendNotify") : "",
  li11ll = require("./function/krgetToken"),
  i1Il1 = require("./function/krh5st");
let IIiI1i = "https://lzdz1-isv.isvjcloud.com",
  ilIllI = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  I1IIli = [],
  Il1I1i = "";
if ($.isNode()) {
  Object.keys(IIlIIi).forEach(iliii1 => {
    I1IIli.push(IIlIIi[iliii1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  I1IIli = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Ii1Iil($.getdata("CookiesJD") || "[]").map(i1IiI => i1IiI.cookie)].filter(lIllil => !!lIllil);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lIilI1 = "",
  Il1I1l = "",
  Ii1Il1 = {};
!(async () => {
  if (!I1IIli[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await ll1Ii1("http://code.kingran.cf/342.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[li1ll(0, authorCodeList.length)];
  } else {
    let iII11l = ["a691d33f3c7f4cd7b699796d59988c1f"];
    $.authorCode = iII11l[li1ll(0, iII11l.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "dze96e64174352bf2c96013ebf0d8d";
  $.shareUuid = $.authorCode;
  for (let l1lIII = 0; l1lIII < I1IIli.length; l1lIII++) {
    Il1I1i = I1IIli[l1lIII];
    originCookie = I1IIli[l1lIII];
    if (Il1I1i) {
      $.UserName = decodeURIComponent(Il1I1i.match(/pt_pin=([^; ]+)(?=;?)/) && Il1I1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1lIII + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await ilIlll();
      await iIIIli();
      if ($.outFlag || $.activityEnd) {
        break;
      }
      if ($.hasEnd) {
        break;
      }
    }
  }
  if ($.outFlag) {
    let l1iI1i = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + l1iI1i);
    if ($.isNode()) {
      await iliiil.sendNotify("" + $.name, "" + l1iI1i);
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(III1lI => $.logErr(III1lI)).finally(() => $.done());
async function iIIIli() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lIilI1 = "";
    $.Token = "";
    $.Pin = "";
    let IlIi = false;
    $.Raglan = false;
    $.Token = await li11ll(Il1I1i, IIiI1i);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await ilIlli();
    if (Il1I1l == "") {
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
    await I1IIll("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await I1IIll("accessLogWithAD");
    await $.wait(1000);
    await I1IIll("drawContent");
    await I1IIll("activityContent");
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
    await I1IIll("checkOpenCard");
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.openStatus == false) {
          IlIi = true;
          $.joinVenderId = o.venderId;
          $.shopactivityId = "";
          await iIIIll();
          for (let lIllii = 0; lIllii < Array(2).length; lIllii++) {
            if (lIllii > 0) {
              console.log("第" + lIllii + "次 重新开卡");
            }
            await li1li();
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await I1IIll("drawContent");
          await I1IIll("checkOpenCard");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
      await I1IIll("activityContent");
    } else {
      console.log("已全部开卡");
    }
    $.log("关注: " + $.allFollowShop);
    !$.allFollowShop && !$.outFlag && (IlIi = true, await I1IIll("signTask"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    await I1IIll("activityContent");
    if (ilIllI + "" !== "0") {
      $.runFalag = true;
      let l1il1 = parseInt($.score2 / 100);
      ilIllI = parseInt(ilIllI, 10);
      if (l1il1 > ilIllI) {
        l1il1 = ilIllI;
      }
      console.log("已设置抽奖次数为" + l1il1 + "次，当前有" + $.score2 + "金币");
      for (m = 1; l1il1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await I1IIll("startDraw");
        if ($.runFalag == false) {
          break;
        }
        if (Number(l1il1) <= 0) {
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
  } catch (iiiIiI) {
    console.log(iiiIiI);
  }
}
async function I1IIll(illl1I) {
  if ($.outFlag) {
    return;
  }
  let Il11i = "https://lzdz1-isv.isvjcloud.com",
    illl11 = "",
    iiI1 = "POST";
  switch (illl1I) {
    case "getMyPing":
      url = Il11i + "/customer/getMyCidPing";
      illl11 = "token=" + $.Token + "&fromType=APP&userId=61055&pin=";
      break;
    case "getSimpleActInfoVo":
      url = Il11i + "/common/brand/getSimpleActInfoVo";
      illl11 = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = Il11i + "/common/accessLogWithAD";
      let i1Ii11 = "https://lzdz1-isv.isvjcloud.com/m/61055/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      illl11 = "venderId=61055&code=90&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(i1Ii11) + "&subType=JDApp";
      break;
    case "drawContent":
      url = Il11i + "/dingzhi/taskact/common/drawContent";
      illl11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = Il11i + "/dingzhi/apr/union/activityContent";
      illl11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "checkOpenCard":
      url = Il11i + "/dingzhi/apr/union/initOpenCard";
      illl11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "getSystime":
      url = Il11i + "/common/getSystime";
      illl11 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "signDetail":
      url = Il11i + "/dingzhi/apr/union/signDetail";
      illl11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "signTask":
      url = Il11i + "/dingzhi/apr/union/saveTask";
      illl11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=0&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "mainActive":
      url = Il11i + "/dingzhi/apr/union/saveTask";
      illl11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=12&taskValue=1&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "startDraw":
      url = Il11i + "/dingzhi/apr/union/draw";
      illl11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&change=2";
      break;
    case "followShop":
      url = Il11i + "/dingzhi/apr/union/saveTask";
      illl11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=23&taskValue=23}";
      break;
    case "addSku":
      url = Il11i + "/dingzhi/apr/union/saveTask";
      illl11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=21&taskValue=21";
      break;
    default:
      console.log("错误" + illl1I);
  }
  let l1iiil = lIilII(url, illl11, iiI1);
  return new Promise(async l1iill => {
    $.post(l1iiil, (IIil, IIii, i1Ii1I) => {
      try {
        I1IIlI(IIii);
        if (IIil) {
          if (IIii && typeof IIii.statusCode != "undefined") {
            if (IIii.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(IIil, IIil));
          console.log(illl1I + " API请求失败，请检查网路重试");
        } else {
          i1Ii1(illl1I, i1Ii1I);
        }
      } catch (l1iilI) {
        console.log(l1iilI, IIii);
      } finally {
        l1iill();
      }
    });
  });
}
async function i1Ii1(lilli, iiII) {
  let Ill1iI = "";
  try {
    (lilli != "accessLogWithAD" || lilli != "drawContent") && iiII && (Ill1iI = JSON.parse(iiII));
  } catch (i11l1l) {
    console.log(lilli + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (lilli) {
      case "getMyPing":
        if (typeof Ill1iI == "object") {
          if (Ill1iI.result && Ill1iI.result === true) {
            if (Ill1iI.data && typeof Ill1iI.data.secretPin != "undefined") {
              $.Pin = Ill1iI.data.secretPin;
            }
            if (Ill1iI.data && typeof Ill1iI.data.nickname != "undefined") {
              $.nickname = Ill1iI.data.nickname;
            }
          } else {
            Ill1iI.errorMessage ? console.log(lilli + " " + (Ill1iI.errorMessage || "")) : console.log(lilli + " " + iiII);
          }
        } else {
          console.log(lilli + " " + iiII);
        }
        break;
      case "checkOpenCard":
        if (typeof Ill1iI == "object") {
          if (Ill1iI.result && Ill1iI.result === true) {
            let II1i11 = Ill1iI.data.cardList1 || [],
              IlillI = Ill1iI.data.cardList2 || [],
              I111l1 = Ill1iI.data.cardList || [],
              iIliII = Ill1iI.data.openCardList || [],
              iIii1I = Ill1iI.data.openInfo || [];
            $.openList = [...I111l1, ...II1i11, ...IlillI, ...iIliII, ...iIii1I];
            $.allOpenCard = Ill1iI.data.allOpenCard || Ill1iI.data.isOpenCardStatus || false;
            $.openCardScore1 = Ill1iI.data.score1 || 0;
            $.openCardScore2 = Ill1iI.data.score2 || 0;
            $.drawScore = Ill1iI.data.score || 0;
            if (Ill1iI.data.beans || Ill1iI.data.addBeanNum) {
              console.log("开卡获得:" + (Ill1iI.data.beans || Ill1iI.data.addBeanNum) + "豆");
            }
          } else {
            if (Ill1iI.errorMessage) {
              console.log(lilli + " " + (Ill1iI.errorMessage || ""));
            } else {
              console.log(lilli + " " + iiII);
            }
          }
        } else {
          console.log(lilli + " " + iiII);
        }
        break;
      case "activityContent":
        if (typeof Ill1iI == "object") {
          if (Ill1iI.result && Ill1iI.result === true) {
            $.actorUuid = Ill1iI.data.actorUuid || "";
            $.saveAddress = Ill1iI.data.saveAddress || false;
            $.followShop = Ill1iI.data.followShop || false;
            $.hasEnd = Ill1iI.data.hasEnd || false;
            $.toSign = Ill1iI.data.toSign || false;
            $.openCard = Ill1iI.data.openCard || false;
            $.allFollowShop = Ill1iI.data.allFollowShop || false;
            $.addSku = Ill1iI.data.skuAddCart || false;
            $.firstAccess = Ill1iI.data.firstAccess || false;
            $.isDraw = Ill1iI.data.isDraw;
            $.score2 = Ill1iI.data.score2 || 0;
            $.assistCount = Ill1iI.data.assistCount || 0;
            $.mainActive = Ill1iI.data.mainActive || false;
            $.sign = Ill1iI.data.sign || false;
          } else {
            if (Ill1iI.errorMessage) {
              if (Ill1iI.errorMessage.indexOf("结束") > -1) {
                $.activityEnd = true;
              } else {
                Ill1iI.errorMessage.includes("擦肩") && ($.Raglan = true);
              }
              console.log(lilli + " " + (Ill1iI.errorMessage || ""));
            } else {
              console.log(lilli + " " + iiII);
            }
          }
        } else {
          console.log(lilli + " " + iiII);
        }
        break;
      case "signTask":
        typeof Ill1iI == "object" ? Ill1iI.result && Ill1iI.result === true ? console.log("获得：" + (Ill1iI.data.score2 || 0) + " ,豆子：" + (Ill1iI.data.taskbeanNum || 0)) : console.log("" + (Ill1iI.errorMessage || "")) : console.log("" + iiII);
        break;
      case "addSku":
      case "mainActive":
      case "followShop":
        if (typeof Ill1iI == "object") {
          if (Ill1iI.result && Ill1iI.result === true && Ill1iI.data) {
            console.log("获得：" + (Ill1iI.data.score2 || 0) + " ");
          } else {
            if (Ill1iI.errorMessage) {
              console.log("" + (Ill1iI.errorMessage || ""));
            } else {
              console.log("" + iiII);
            }
          }
        } else {
          console.log(lilli + " " + iiII);
        }
        break;
      case "startDraw":
        if (typeof Ill1iI == "object") {
          if (Ill1iI.result && Ill1iI.result === true && Ill1iI.data.wdsrvo.drawOk) {
            console.log("获得：" + (Ill1iI.data.wdsrvo.name || "") + " ");
          } else {
            Ill1iI.errorMessage ? console.log("" + (Ill1iI.errorMessage || "")) : console.log("空气");
          }
        } else {
          console.log(lilli + " " + iiII);
        }
        break;
      case "prizeRotation":
        if (typeof Ill1iI == "object") {
          if (Ill1iI.result && Ill1iI.result === true && Ill1iI.data) {
            $.prizeRotation = Ill1iI.data.prizeRotation;
          } else {
            Ill1iI.errorMessage ? console.log("" + (Ill1iI.errorMessage || "")) : console.log("" + iiII);
          }
        } else {
          console.log("" + iiII);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(lilli + "-> " + iiII);
    }
    typeof Ill1iI == "object" && Ill1iI.errorMessage && Ill1iI.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (iIilI) {
    console.log(iIilI);
  }
}
function lIilII(liii, iliilI, I111iI = "POST") {
  let IIil1I = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: Il1I1i,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  liii.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (IIil1I.Referer = "https://lzdz1-isv.isvjcloud.com/m/61055/" + $.activityId + "/?shareUuid=" + $.shareUuid, IIil1I.Cookie = "" + (lIilI1 && lIilI1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + Il1I1l);
  return {
    url: liii,
    method: I111iI,
    headers: IIil1I,
    body: iliilI,
    timeout: 30000
  };
}
function ilIlli() {
  return new Promise(lill => {
    let IIl11I = {
      url: "https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: Il1I1i,
        Referer: "https://lzdz1-isv.isvjcloud.com/m/61055/" + $.activityId + "/?shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(IIl11I, async (i11IIi, Il1ii1, illII1) => {
      try {
        if (i11IIi) {
          Il1ii1 && typeof Il1ii1.statusCode != "undefined" && Il1ii1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(i11IIi));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IIiIIl = illII1.match(/(活动已经结束)/) && illII1.match(/(活动已经结束)/)[1] || "";
          IIiIIl && ($.activityEnd = true, console.log("活动已结束"));
          I1IIlI(Il1ii1);
        }
      } catch (Il1iil) {
        $.logErr(Il1iil, Il1ii1);
      } finally {
        lill();
      }
    });
  });
}
function I1IIlI(iIiil) {
  if (iIiil) {
    if (iIiil.headers["set-cookie"]) {
      Il1I1i = originCookie + ";";
      for (let illIII of iIiil.headers["set-cookie"]) {
        Ii1Il1[illIII.split(";")[0].substr(0, illIII.split(";")[0].indexOf("="))] = illIII.split(";")[0].substr(illIII.split(";")[0].indexOf("=") + 1);
      }
      for (const iliI1l of Object.keys(Ii1Il1)) {
        Il1I1i += iliI1l + "=" + Ii1Il1[iliI1l] + ";";
      }
      Il1I1l = Il1I1i;
    }
  }
}
async function ilIlll() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + Ii1Iii(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function Ii1Iii(iliI1i) {
  iliI1i = iliI1i || 32;
  let i11III = "abcdef0123456789",
    ii1iIl = i11III.length,
    Ill1l1 = "";
  for (i = 0; i < iliI1i; i++) {
    Ill1l1 += i11III.charAt(Math.floor(Math.random() * ii1iIl));
  }
  return Ill1l1;
}
function Ii1Iil(Ilili1) {
  if (typeof Ilili1 == "string") {
    try {
      return JSON.parse(Ilili1);
    } catch (iIliIl) {
      console.log(iIliIl);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function ll1IiI(iiilIi) {
  var Ii111I = new Date(iiilIi),
    iI11ll = Ii111I.getFullYear(),
    liIl1i = Ii111I.getMonth() + 1 < 10 ? "0" + (Ii111I.getMonth() + 1) : Ii111I.getMonth() + 1,
    liIl1l = Ii111I.getDate();
  liIl1l.length == 2 && (liIl1l = "0" + liIl1l);
  return iI11ll + liIl1i + liIl1l;
}
async function li1li() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async il1IlI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lI11 = "";
    if ($.shopactivityId) {
      lI11 = ",\"activityId\":" + $.shopactivityId;
    }
    const li11I1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lI11 + ",\"channel\":406}",
      i1I111 = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(li11I1)
      },
      l1li11 = await i1Il1("27004", i1I111),
      il1Il1 = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + li11I1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1li11),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: Il1I1i
        }
      };
    $.get(il1Il1, async (I1IIII, I1I1, Ii1lI) => {
      try {
        if (I1IIII) {
          console.log(I1IIII);
        } else {
          const iIiIii = JSON.parse(Ii1lI);
          if (typeof iIiIii === "object") {
            if (iIiIii.success === true) {
              console.log(iIiIii.message);
              $.errorJoinShop = iIiIii.message;
              if (iIiIii.result && iIiIii.result.giftInfo) {
                for (let lI1i of iIiIii.result.giftInfo.giftList) {
                  console.log("入会获得：" + lI1i.discountString + lI1i.prizeName + lI1i.secondLineDesc);
                }
              }
            } else {
              if (typeof iIiIii == "object" && iIiIii.message) {
                $.errorJoinShop = iIiIii.message;
                console.log("" + (iIiIii.message || ""));
              } else {
                console.log(Ii1lI);
              }
            }
          } else {
            console.log(Ii1lI);
          }
        }
      } catch (li11Il) {
        $.logErr(li11Il, I1I1);
      } finally {
        il1IlI();
      }
    });
  });
}
async function iIIIll() {
  return new Promise(async l1li1i => {
    let I1Il1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const i1l = {
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(I1Il1i)
      },
      IlIiII = await i1Il1("27004", i1l),
      iIliI = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + I1Il1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlIiII),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: Il1I1i
        }
      };
    $.get(iIliI, async (i1IlII, ilIii1, ll1III) => {
      try {
        if (i1IlII) {
          console.log(i1IlII);
        } else {
          const iIlll1 = JSON.parse(ll1III);
          typeof iIlll1 === "object" ? iIlll1.success === true && (console.log("去加入：" + (iIlll1.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = iIlll1.result.interestsRuleList && iIlll1.result.interestsRuleList[0] && iIlll1.result.interestsRuleList[0].interestsInfo && iIlll1.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = iIlll1.result.userInfo.openCardStatus) : console.log(ll1III);
        }
      } catch (I1Il1I) {
        $.logErr(I1Il1I, ilIii1);
      } finally {
        l1li1i();
      }
    });
  });
}
function ll1Ii1(i1IlIi) {
  return new Promise(ll1IIi => {
    const IlIiI1 = {
      url: "" + i1IlIi,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IlIiI1, async (ll1IIl, l11ll1, iIlllI) => {
      try {
        if (!ll1IIl) {
          iIlllI ? iIlllI = JSON.parse(iIlllI) : console.log("未获取到数据,请重新运行");
        }
      } catch (iIli1) {
        $.logErr(iIli1, l11ll1);
        iIlllI = null;
      } finally {
        ll1IIi(iIlllI);
      }
    });
  });
}
function li1ll(iIllil, l11lli) {
  return Math.floor(Math.random() * (l11lli - iIllil)) + iIllil;
}
