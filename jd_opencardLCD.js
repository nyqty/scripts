/*
京东粉丝联盟福利社 入会赢专享好礼
新增开卡脚本，一次性脚本


第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[京东粉丝联盟福利社 入会赢专享好礼 ]

JD_OPENCARD // 是否开卡，默认不开卡 值为 true 开卡

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#京东粉丝联盟福利社 入会赢专享好礼
11 11 11 11 * jd_opencardLCD.js, tag=京东粉丝联盟福利社 入会赢专享好礼, enabled=true

*/
const Env = require('./utils/Env.js');
const $ = new Env('京东粉丝联盟福利社 入会赢专享好礼');
const IlIi1l = $.isNode() ? require("./jdCookie.js") : "",
  IiIiiI = $.isNode() ? require("./sendNotify") : "",
  IlIi1i = require("./function/krgetToken"),
  lIllii = require("./function/krh5st");
let l1il1 = "https://lzdz1-isv.isvjcloud.com",
  IIiI = [],
  l1iil1 = "";
if ($.isNode()) {
  Object.keys(IlIi1l).forEach(lill1 => {
    IIiI.push(IlIi1l[lill1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIiI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...li1lll($.getdata("CookiesJD") || "[]").map(IiIIl => IiIIl.cookie)].filter(IiIIi => !!IiIIi);
let Ill1i1 = {};
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let illl1I = "",
  lillI = "";
!(async () => {
  if (!IIiI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await illl1l("http://code.kingran.cf/opencardLCD.json");
  $.activityId = "dz60a95fce4627a9824f5a7581shop";
  $.authorCode = authorCodeList[Il11I(0, authorCodeList.length)];
  $.shareUuid = $.authorCode;
  for (let illIIl = 0; illIIl < IIiI.length; illIIl++) {
    l1iil1 = IIiI[illIIl];
    originCookie = IIiI[illIIl];
    if (l1iil1) {
      $.UserName = decodeURIComponent(l1iil1.match(/pt_pin=([^; ]+)(?=;?)/) && l1iil1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = illIIl + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await IIi1();
      await Il11i();
      if ($.outFlag || $.activityEnd) break;
      await $.wait(3000);
    }
  }
  if ($.outFlag) {
    let I1i11 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + I1i11);
    if ($.isNode()) await IiIiiI.sendNotify("" + $.name, "" + I1i11);
  }
})().catch(Ill1ii => $.logErr(Ill1ii)).finally(() => $.done());
async function Il11i() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    illl1I = "";
    $.Token = "";
    $.Pin = "";
    let iI11ii = false;
    $.Token = await IlIi1i(l1iil1, l1il1);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await l1iiil();
    if (lillI == "") {
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
    await illl11("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await illl11("accessLogWithAD");
    await illl11("getUserInfo");
    await illl11("activityContent");
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }
    await illl11("drawContent");
    await $.wait(1000);
    $.openList = [];
    $.allOpenCard = false;
    await illl11("checkOpenCard");
    console.log($.actorUuid);
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.status == 0) {
          iI11ii = true;
          $.joinVenderId = o.value;
          $.shopactivityId = "";
          for (let iii111 = 0; iii111 < Array(2).length; iii111++) {
            if (iii111 > 0) console.log("第" + iii111 + "次 重新开卡");
            await l1iiii();
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await illl11("drawContent");
          await illl11("checkOpenCard");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
      await illl11("activityContent");
    } else {
      console.log("已全部开卡");
    }
    $.log("关注: " + $.followShop);
    !$.followShop && !$.outFlag && (iI11ii = true, $.followShopValue = 1, await illl11("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    $.log("加购: " + $.addSku);
    !$.addSku && !$.outFlag && (iI11ii = true, $.followShopValue = 2, await illl11("addSku"));
    $.runFalag = true;
    iI11ii && (await illl11("activityContent"));
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    await illl11("getDrawRecordHasCoupon");
    await illl11("getShareRecord");
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    console.log($.actorUuid);
    console.log("当前助力:" + $.shareUuid);
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 10000, 10));
  } catch (iliill) {
    console.log(iliill);
  }
}
async function illl11(I111ii) {
  if ($.outFlag) return;
  let I1liII = "https://lzdz1-isv.isvjcloud.com",
    I1ii1I = "",
    Ililli = "POST";
  switch (I111ii) {
    case "getMyPing":
      url = I1liII + "/customer/getMyPing";
      I1ii1I = "userId=1000003571&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = I1liII + "/common/accessLogWithAD";
      let iil1Ii = I1liII + "/dingzhi/shop/league/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I1ii1I = "venderId=1000003571&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iil1Ii) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = I1liII + "/wxActionCommon/getUserInfo";
      I1ii1I = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = I1liII + "/dingzhi/shop/league/activityContent";
      I1ii1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = I1liII + "/dingzhi/taskact/common/drawContent";
      I1ii1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = I1liII + "/dingzhi/shop/league/checkOpenCard";
      I1ii1I = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid;
      break;
    case "startDraw":
      url = I1liII + "/dingzhi/shop/league/startDraw";
      I1ii1I = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + ($.startDraw && "&type=" + $.startDraw || "");
      break;
    case "followShop":
      url = I1liII + "/dingzhi/shop/league/saveTask";
      I1ii1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=1&taskValue=" + $.followShopValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = I1liII + "/dingzhi/shop/league/saveTask";
      let iii11i = "",
        iii11l = "";
      if (I111ii == "viewVideo") {
        iii11i = 31;
        iii11l = 31;
      } else {
        if (I111ii == "visitSku") {
          iii11i = 5;
          iii11l = $.visitSkuValue || 5;
        } else {
          if (I111ii == "toShop") {
            iii11i = 14;
            iii11l = $.toShopValue || 14;
          } else I111ii == "addSku" && (iii11i = 2, iii11l = $.addSkuValue || 2);
        }
      }
      I1ii1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + iii11i + "&taskValue=" + iii11l;
      break;
    case "getDrawRecordHasCoupon":
      url = I1liII + "/dingzhi/taskact/common/getDrawRecordHasCoupon";
      I1ii1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "getShareRecord":
      url = I1liII + "/dingzhi/taskact/common/getShareRecord";
      I1ii1I = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid;
      break;
    case "邀请":
    case "助力":
      I111ii == "助力" ? url = I1liII + "/dingzhi/light/wishLamp/assist" : url = I1liII + "/dingzhi/linkgame/assist/status";
      I1ii1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid;
      break;
    default:
      console.log("错误" + I111ii);
  }
  let iIii1l = Il11l(url, I1ii1I, Ililli);
  return new Promise(async I111i1 => {
    $.post(iIii1l, (l1Ilil, iIili, i11l1I) => {
      try {
        l1ilI(iIili);
        l1Ilil ? (iIili && typeof iIili.statusCode != "undefined" && iIili.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(l1Ilil, l1Ilil)), console.log(I111ii + " API请求失败，请检查网路重试")) : iiI1(I111ii, i11l1I);
      } catch (iil1Il) {
        console.log(iil1Il, iIili);
      } finally {
        I111i1();
      }
    });
  });
}
async function iiI1(i11l11, IlIli) {
  let iliil1 = "";
  try {
    if (i11l11 != "accessLogWithAD" || i11l11 != "drawContent") {
      IlIli && (iliil1 = JSON.parse(IlIli));
    }
  } catch (Ilili1) {
    console.log(i11l11 + " 执行任务异常");
    console.log(IlIli);
    $.runFalag = false;
  }
  try {
    switch (i11l11) {
      case "getMyPing":
        if (typeof iliil1 == "object") {
          if (iliil1.result && iliil1.result === true) {
            if (iliil1.data && typeof iliil1.data.secretPin != "undefined") $.Pin = iliil1.data.secretPin;
            if (iliil1.data && typeof iliil1.data.nickname != "undefined") $.nickname = iliil1.data.nickname;
          } else iliil1.errorMessage ? console.log(i11l11 + " " + (iliil1.errorMessage || "")) : console.log(i11l11 + " " + IlIli);
        } else console.log(i11l11 + " " + IlIli);
        break;
      case "getUserInfo":
        if (typeof iliil1 == "object") {
          if (iliil1.result && iliil1.result === true) {
            if (iliil1.data && typeof iliil1.data.yunMidImageUrl != "undefined") $.attrTouXiang = iliil1.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else iliil1.errorMessage ? console.log(i11l11 + " " + (iliil1.errorMessage || "")) : console.log(i11l11 + " " + IlIli);
        } else console.log(i11l11 + " " + IlIli);
        break;
      case "activityContent":
        if (typeof iliil1 == "object") {
          if (iliil1.result && iliil1.result === true) {
            $.endTime = iliil1.data.endTime || 0;
            $.hasEnd = iliil1.data.hasEnd || false;
            $.actorUuid = iliil1.data.actorUuid || "";
            $.followShop = iliil1.data.followShop.allStatus || false;
            $.addSku = iliil1.data.addSku.allStatus || false;
            iliil1.data.followShop && iliil1.data.followShop.settings && iliil1.data.followShop.settings[0] && ($.followShopValue = iliil1.data.followShop.settings[0].value || 1);
            iliil1.data.addSku && iliil1.data.addSku.settings && iliil1.data.addSku.settings[0] && ($.addSkuValue = iliil1.data.addSku.settings[0].value || 2);
          } else iliil1.errorMessage ? console.log(i11l11 + " " + (iliil1.errorMessage || "")) : console.log(i11l11 + " " + IlIli);
        } else console.log(i11l11 + " " + IlIli);
        break;
      case "checkOpenCard":
        if (typeof iliil1 == "object") {
          if (iliil1.result && iliil1.result === true) {
            let i11II1 = iliil1.data.cardList1 || [],
              Ilill1 = iliil1.data.cardList2 || [],
              I111lI = iliil1.data.cardList || [];
            $.openList = [...I111lI, ...i11II1, ...Ilill1];
            $.allOpenCard = iliil1.data.allOpenCard || false;
            $.openCardScore1 = iliil1.data.score1 || iliil1.data.drawScore1 || 0;
            $.openCardScore2 = iliil1.data.score2 || iliil1.data.drawScore2 || 0;
            $.openCardScore3 = iliil1.data.score3 || iliil1.data.drawScore3 || 0;
            $.drawScore = iliil1.data.drawScore || 0;
            if (iliil1.data.sendBeanNum || iliil1.data.addBeanNum) console.log("开卡获得:" + (iliil1.data.sendBeanNum || iliil1.data.addBeanNum) + "豆");
          } else iliil1.errorMessage ? console.log(i11l11 + " " + (iliil1.errorMessage || "")) : console.log(i11l11 + " " + IlIli);
        } else console.log(i11l11 + " " + IlIli);
        break;
      case "startDraw":
      case "followShop":
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "addSku":
        if (typeof iliil1 == "object") {
          if (iliil1.result && iliil1.result === true) {
            if (typeof iliil1.data == "object") {
              let l1Illi = "",
                iiilIi = "抽奖";
              iliil1.data.addBeanNum && iliil1.data.sendStatus && (l1Illi = iliil1.data.addBeanNum + "京豆");
              if (i11l11 == "followShop") {
                iiilIi = "关注";
                iliil1.data.beanNumMember && iliil1.data.assistSendStatus && (l1Illi += " 额外获得:" + iliil1.data.beanNumMember + "京豆");
              } else {
                if (i11l11 == "addSku") iiilIi = "加购";else {
                  if (i11l11 == "viewVideo") iiilIi = "热门文章";else {
                    if (i11l11 == "toShop") iiilIi = "浏览店铺";else i11l11 == "visitSku" ? iiilIi = "浏览商品" : l1Illi = iliil1.data.drawOk == true && (iliil1.data.drawInfoType == 6 && iliil1.data.name || "") || "空气💨";
                  }
                }
              }
              if (!l1Illi) {
                l1Illi = "空气💨";
              }
              console.log(iiilIi + "获得:" + (l1Illi || IlIli));
            } else console.log(i11l11 + " " + IlIli);
          } else {
            if (iliil1.errorMessage) {
              $.runFalag = false;
              console.log(i11l11 + " " + (iliil1.errorMessage || ""));
            } else console.log(i11l11 + " " + IlIli);
          }
        } else console.log(i11l11 + " " + IlIli);
        break;
      case "getDrawRecordHasCoupon":
        if (typeof iliil1 == "object") {
          if (iliil1.result && iliil1.result === true) {
            console.log("我的奖品：");
            let I1liIi = 0,
              I1ii1i = 0;
            for (let I1ii1l in iliil1.data) {
              let iIii1 = iliil1.data[I1ii1l];
              iIii1.value == "邀请好友" ? (I1liIi++, I1ii1i = iIii1.infoName.replace("京豆", "")) : console.log(iIii1.value + " " + iIii1.infoName);
            }
            if (I1liIi > 0) console.log("邀请好友(" + I1liIi + "):" + (I1liIi * parseInt(I1ii1i, 10) || 30) + "京豆");
          } else {
            if (iliil1.errorMessage) {
              console.log(i11l11 + " " + (iliil1.errorMessage || ""));
            } else console.log(i11l11 + " " + IlIli);
          }
        } else console.log(i11l11 + " " + IlIli);
        break;
      case "getShareRecord":
        if (typeof iliil1 == "object") {
          if (iliil1.result && iliil1.result === true && iliil1.data) {
            $.ShareCount = iliil1.data.length;
            $.log("=========== 你邀请了:" + iliil1.data.length + "个");
          } else iliil1.errorMessage ? console.log(i11l11 + " " + (iliil1.errorMessage || "")) : console.log(i11l11 + " " + IlIli);
        } else console.log(i11l11 + " " + IlIli);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(i11l11 + "-> " + IlIli);
    }
    if (typeof iliil1 == "object") {
      if (iliil1.errorMessage) {
        iliil1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
      }
    }
  } catch (Ii1ll) {
    console.log(Ii1ll);
  }
}
function Il11l(iIlll, liII11, I1II = "POST") {
  let l1li1I = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": l1iil1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iIlll.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (l1li1I.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/shop/league/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, l1li1I.Cookie = "" + (illl1I && illl1I || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + lillI), {
    "url": iIlll,
    "method": I1II,
    "headers": l1li1I,
    "body": liII11,
    "timeout": 30000
  };
}
function l1iiil() {
  return new Promise(iIiIlI => {
    let iIiIil = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/shop/league/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iIiIil, async (i11, Ii1llI, i1I11i) => {
      try {
        if (i11) {
          Ii1llI && typeof Ii1llI.statusCode != "undefined" && Ii1llI.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(i11));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IIlIl1 = i1I11i.match(/(活动已经结束)/) && i1I11i.match(/(活动已经结束)/)[1] || "";
          IIlIl1 && ($.activityEnd = true, console.log("活动已结束"));
          l1ilI(Ii1llI);
        }
      } catch (IIlIlI) {
        $.logErr(IIlIlI, Ii1llI);
      } finally {
        iIiIlI();
      }
    });
  });
}
function l1ilI(l11li1) {
  if (l11li1) {
    if (l11li1.headers["set-cookie"]) {
      l1iil1 = originCookie + ";";
      for (let lI1I of l11li1.headers["set-cookie"]) {
        Ill1i1[lI1I.split(";")[0].substr(0, lI1I.split(";")[0].indexOf("="))] = lI1I.split(";")[0].substr(lI1I.split(";")[0].indexOf("=") + 1);
      }
      for (const I1Ii of Object.keys(Ill1i1)) {
        l1iil1 += I1Ii + "=" + Ill1i1[I1Ii] + ";";
      }
      lillI = l1iil1;
    }
  }
}
async function IIi1() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + illl1i(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function illl1i(I1Il) {
  I1Il = I1Il || 32;
  let l1li1l = "abcdef0123456789",
    il1Ill = l1li1l.length,
    il1Ili = "";
  for (i = 0; i < I1Il; i++) il1Ili += l1li1l.charAt(Math.floor(Math.random() * il1Ill));
  return il1Ili;
}
async function l1iiii() {
  if (!$.joinVenderId) return;
  return new Promise(async ll1IIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iIlllI = "";
    if ($.shopactivityId) iIlllI = ",\"activityId\":" + $.shopactivityId;
    const iIli1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iIlllI + ",\"channel\":406}",
      iIllii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIli1)
      };
    for (var iIllil = "", l11lli = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", I1Il11 = 0; I1Il11 < 16; I1Il11++) {
      var IlIiIl = Math.round(Math.random() * (l11lli.length - 1));
      iIllil += l11lli.substring(IlIiIl, IlIiIl + 1);
    }
    uuid = Buffer.from(iIllil, "utf8").toString("base64");
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
    const iIiIll = await lIllii("8adfb", iIllii),
      iIlliI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iIli1 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIiIll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1iil1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIlliI, async (IIlIi1, i1IIi1, IIlIiI) => {
      try {
        if (IIlIi1) i1IIi1 && typeof i1IIi1.statusCode != "undefined" && i1IIi1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IIlIiI = IIlIiI && IIlIiI.match(/jsonp_.*?\((.*?)\);/) && IIlIiI.match(/jsonp_.*?\((.*?)\);/)[1] || IIlIiI;
          let iIilI1 = $.toObj(IIlIiI, IIlIiI);
          if (iIilI1 && typeof iIilI1 == "object") {
            if (iIilI1 && iIilI1.success === true) {
              console.log(" >> " + iIilI1.message);
              $.errorJoinShop = iIilI1.message;
              if (iIilI1.result && iIilI1.result.giftInfo) for (let i1IIiI of iIilI1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + i1IIiI.discountString + i1IIiI.prizeName + i1IIiI.secondLineDesc);
              }
            } else iIilI1 && typeof iIilI1 == "object" && iIilI1.message ? ($.errorJoinShop = iIilI1.message, console.log("" + (iIilI1.message || ""))) : console.log(IIlIiI);
          } else console.log(IIlIiI);
        }
      } catch (I1II1) {
        $.logErr(I1II1, i1IIi1);
      } finally {
        ll1IIl();
      }
    });
  });
}
async function iiiIi1() {
  return new Promise(async iI1iII => {
    const l111Ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      lI1i11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l111Ii)
      };
    await $.wait(1000);
    const lili1I = await lIllii("8adfb", lI1i11),
      i1iiII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l111Ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lili1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1iil1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1iiII, async (l111Il, I1III, l1II1I) => {
      try {
        if (l111Il) I1III && typeof I1III.statusCode != "undefined" && I1III.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          l1II1I = l1II1I && l1II1I.match(/jsonp_.*?\((.*?)\);/) && l1II1I.match(/jsonp_.*?\((.*?)\);/)[1] || l1II1I;
          let Ili1 = $.toObj(l1II1I, l1II1I);
          if (Ili1 && typeof Ili1 == "object") {
            Ili1 && Ili1.success == true && (console.log("去加入：" + (Ili1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = Ili1.result.interestsRuleList && Ili1.result.interestsRuleList[0] && Ili1.result.interestsRuleList[0].interestsInfo && Ili1.result.interestsRuleList[0].interestsInfo.activityId || "");
          } else console.log(l1II1I);
        }
      } catch (i1IIl1) {
        $.logErr(i1IIl1, I1III);
      } finally {
        iI1iII();
      }
    });
  });
}
function illl1l(iiliII) {
  return new Promise(iIi111 => {
    const ll1l11 = {
      "url": iiliII + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ll1l11, async (lIl111, Ilil, i1IIli) => {
      try {
        if (lIl111) $.getAuthorCodeListerr = false;else {
          if (i1IIli) i1IIli = JSON.parse(i1IIli);
          $.getAuthorCodeListerr = true;
        }
      } catch (ii11l1) {
        $.logErr(ii11l1, Ilil);
        i1IIli = null;
      } finally {
        iIi111(i1IIli);
      }
    });
  });
}
function Il11I(li1lii, i111lI) {
  return Math.floor(Math.random() * (i111lI - li1lii)) + li1lii;
}
function li1lll(lIl11I) {
  if (typeof lIl11I == "string") {
    try {
      return JSON.parse(lIl11I);
    } catch (li1li1) {
      return console.log(li1li1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}