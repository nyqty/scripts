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

const Env=require('./utils/Env.js');
const $ = new Env('京东粉丝联盟福利社 入会赢专享好礼');
const IiIII = $.isNode() ? require("./jdCookie.js") : "",
  IiIiii = $.isNode() ? require("./sendNotify") : "",
  lIiIll = require("./function/krgetToken"),
  lIlliI = require("./function/krh5st"),
  iIIlI1 = require("./function/krgetua");
let IlIi = "https://lzdz1-isv.isvjcloud.com",
  IlIl = [],
  IiII1 = "";
if ($.isNode()) {
  Object.keys(IiIII).forEach(iiiIiI => {
    IlIl.push(IiIII[iiiIiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IlIl = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1iil1($.getdata("CookiesJD") || "[]").map(Ill1i1 => Ill1i1.cookie)].filter(illl1I => !!illl1I);
let l1IIl = {};
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let l1I1il = "",
  III1ii = "";
!(async () => {
  if (!IlIl[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await l1il1("http://code.kingran.cf/opencardLCD.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[IIiI(0, authorCodeList.length)];
  } else {
    let IiIIi = ["f3286616ffdd47948761f967f14b445f", "d3d6fee8ea134dedaf67c12db72f8205"];
    $.authorCode = IiIIi[IIiI(0, IiIIi.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "dze4886459402dbe515db72478shop";
  $.shareUuid = $.authorCode;
  for (let iiiIl1 = 0; iiiIl1 < IlIl.length; iiiIl1++) {
    IiII1 = IlIl[iiiIl1];
    originCookie = IlIl[iiiIl1];
    if (IiII1) {
      $.UserName = decodeURIComponent(IiII1.match(/pt_pin=([^; ]+)(?=;?)/) && IiII1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iiiIl1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await iIIlI1($.UserName);
      await l1I1ii();
      if ($.outFlag || $.activityEnd) break;
      await $.wait(3000);
    }
  }
  if ($.outFlag) {
    let l1ili = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + l1ili);
    if ($.isNode()) await IiIiii.sendNotify("" + $.name, "" + l1ili);
  }
})().catch(i1Ii11 => $.logErr(i1Ii11)).finally(() => $.done());
async function l1I1ii() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    l1I1il = "";
    $.Token = "";
    $.Pin = "";
    let l1I1l = false;
    $.Token = await lIiIll(IiII1, IlIi);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await iIIlII();
    if (III1ii == "") {
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
    await III1il("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await III1il("accessLogWithAD");
    await III1il("getUserInfo");
    await III1il("activityContent");
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    console.log($.actorUuid);
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }
    await III1il("drawContent");
    await $.wait(1000);
    $.openList = [];
    $.allOpenCard = false;
    await III1il("checkOpenCard");
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.status == 0) {
          l1I1l = true;
          $.joinVenderId = o.value;
          $.shopactivityId = "";
          for (let i1i1il = 0; i1i1il < Array(2).length; i1i1il++) {
            if (i1i1il > 0) console.log("第" + i1i1il + "次 重新开卡");
            await IlIi1i();
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await III1il("drawContent");
          await III1il("checkOpenCard");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
      await III1il("activityContent");
    } else console.log("已全部开卡");
    $.log("关注: " + $.followShop);
    !$.followShop && !$.outFlag && (l1I1l = true, $.followShopValue = 1, await III1il("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    $.log("加购: " + $.addSku);
    !$.addSku && !$.outFlag && (l1I1l = true, $.followShopValue = 2, await III1il("addSku"));
    $.runFalag = true;
    l1I1l && (await III1il("activityContent"));
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    await III1il("getDrawRecordHasCoupon");
    await III1il("getShareRecord");
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    console.log("当前助力:" + $.shareUuid);
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log("后面的号都会助力:" + $.shareUuid);
    }
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 10000, 10));
  } catch (liiI) {
    console.log(liiI);
  }
}
async function III1il(I111ii) {
  if ($.outFlag) return;
  let I1liII = "https://lzdz1-isv.isvjcloud.com",
    I1ii1I = "",
    Ililli = "POST";
  switch (I111ii) {
    case "getMyPing":
      url = I1liII + "/customer/getMyPing";
      I1ii1I = "userId=1000282702&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = I1liII + "/common/accessLogWithAD";
      let iI11i1 = I1liII + "/dingzhi/shop/league/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I1ii1I = "venderId=1000282702&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iI11i1) + "&subType=app&adSource=";
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
      let i1i1li = "",
        iIill = "";
      if (I111ii == "viewVideo") {
        i1i1li = 31;
        iIill = 31;
      } else {
        if (I111ii == "visitSku") {
          i1i1li = 5;
          iIill = $.visitSkuValue || 5;
        } else {
          if (I111ii == "toShop") {
            i1i1li = 14;
            iIill = $.toShopValue || 14;
          } else I111ii == "addSku" && (i1i1li = 2, iIill = $.addSkuValue || 2);
        }
      }
      I1ii1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + i1i1li + "&taskValue=" + iIill;
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
  let iIii1l = i1111(url, I1ii1I, Ililli);
  return new Promise(async I111i1 => {
    $.post(iIii1l, (iliil1, i1i1ll, IIllI1) => {
      try {
        IlIi1l(i1i1ll);
        if (iliil1) {
          i1i1ll && typeof i1i1ll.statusCode != "undefined" && i1i1ll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(iliil1, iliil1));
          console.log(I111ii + " API请求失败，请检查网路重试");
        } else {
          I1IlI1(I111ii, IIllI1);
        }
      } catch (iil1II) {
        console.log(iil1II, i1i1ll);
      } finally {
        I111i1();
      }
    });
  });
}
async function I1IlI1(IIil11, iI11iI) {
  let liIIIi = "";
  try {
    (IIil11 != "accessLogWithAD" || IIil11 != "drawContent") && iI11iI && (liIIIi = JSON.parse(iI11iI));
  } catch (Ill1l1) {
    console.log(IIil11 + " 执行任务异常");
    console.log(iI11iI);
    $.runFalag = false;
  }
  try {
    switch (IIil11) {
      case "getMyPing":
        if (typeof liIIIi == "object") {
          if (liIIIi.result && liIIIi.result === true) {
            if (liIIIi.data && typeof liIIIi.data.secretPin != "undefined") $.Pin = liIIIi.data.secretPin;
            if (liIIIi.data && typeof liIIIi.data.nickname != "undefined") $.nickname = liIIIi.data.nickname;
          } else {
            if (liIIIi.errorMessage) {
              console.log(IIil11 + " " + (liIIIi.errorMessage || ""));
            } else console.log(IIil11 + " " + iI11iI);
          }
        } else console.log(IIil11 + " " + iI11iI);
        break;
      case "getUserInfo":
        if (typeof liIIIi == "object") {
          if (liIIIi.result && liIIIi.result === true) {
            if (liIIIi.data && typeof liIIIi.data.yunMidImageUrl != "undefined") $.attrTouXiang = liIIIi.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else liIIIi.errorMessage ? console.log(IIil11 + " " + (liIIIi.errorMessage || "")) : console.log(IIil11 + " " + iI11iI);
        } else console.log(IIil11 + " " + iI11iI);
        break;
      case "activityContent":
        if (typeof liIIIi == "object") {
          if (liIIIi.result && liIIIi.result === true) {
            $.endTime = liIIIi.data.endTime || 0;
            $.hasEnd = liIIIi.data.hasEnd || false;
            $.actorUuid = liIIIi.data.actorUuid || "";
            $.followShop = liIIIi.data.followShop.allStatus || false;
            $.addSku = liIIIi.data.addSku.allStatus || false;
            liIIIi.data.followShop && liIIIi.data.followShop.settings && liIIIi.data.followShop.settings[0] && ($.followShopValue = liIIIi.data.followShop.settings[0].value || 1);
            if (liIIIi.data.addSku && liIIIi.data.addSku.settings && liIIIi.data.addSku.settings[0]) {
              $.addSkuValue = liIIIi.data.addSku.settings[0].value || 2;
            }
          } else liIIIi.errorMessage ? console.log(IIil11 + " " + (liIIIi.errorMessage || "")) : console.log(IIil11 + " " + iI11iI);
        } else console.log(IIil11 + " " + iI11iI);
        break;
      case "checkOpenCard":
        if (typeof liIIIi == "object") {
          if (liIIIi.result && liIIIi.result === true) {
            let Il1ilI = liIIIi.data.cardList1 || [],
              iIliIl = liIIIi.data.cardList2 || [],
              l1Illi = liIIIi.data.cardList || [];
            $.openList = [...l1Illi, ...Il1ilI, ...iIliIl];
            $.allOpenCard = liIIIi.data.allOpenCard || false;
            $.openCardScore1 = liIIIi.data.score1 || liIIIi.data.drawScore1 || 0;
            $.openCardScore2 = liIIIi.data.score2 || liIIIi.data.drawScore2 || 0;
            $.openCardScore3 = liIIIi.data.score3 || liIIIi.data.drawScore3 || 0;
            $.drawScore = liIIIi.data.drawScore || 0;
            if (liIIIi.data.sendBeanNum || liIIIi.data.addBeanNum) console.log("开卡获得:" + (liIIIi.data.sendBeanNum || liIIIi.data.addBeanNum) + "豆");
          } else liIIIi.errorMessage ? console.log(IIil11 + " " + (liIIIi.errorMessage || "")) : console.log(IIil11 + " " + iI11iI);
        } else console.log(IIil11 + " " + iI11iI);
        break;
      case "startDraw":
      case "followShop":
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "addSku":
        if (typeof liIIIi == "object") {
          if (liIIIi.result && liIIIi.result === true) {
            if (typeof liIIIi.data == "object") {
              let liIl1i = "",
                liIl1l = "抽奖";
              liIIIi.data.addBeanNum && liIIIi.data.sendStatus && (liIl1i = liIIIi.data.addBeanNum + "京豆");
              if (IIil11 == "followShop") {
                liIl1l = "关注";
                liIIIi.data.beanNumMember && liIIIi.data.assistSendStatus && (liIl1i += " 额外获得:" + liIIIi.data.beanNumMember + "京豆");
              } else {
                if (IIil11 == "addSku") liIl1l = "加购";else {
                  if (IIil11 == "viewVideo") liIl1l = "热门文章";else {
                    if (IIil11 == "toShop") liIl1l = "浏览店铺";else IIil11 == "visitSku" ? liIl1l = "浏览商品" : liIl1i = liIIIi.data.drawOk == true && (liIIIi.data.drawInfoType == 6 && liIIIi.data.name || "") || "空气💨";
                  }
                }
              }
              !liIl1i && (liIl1i = "空气💨");
              console.log(liIl1l + "获得:" + (liIl1i || iI11iI));
            } else console.log(IIil11 + " " + iI11iI);
          } else liIIIi.errorMessage ? ($.runFalag = false, console.log(IIil11 + " " + (liIIIi.errorMessage || ""))) : console.log(IIil11 + " " + iI11iI);
        } else console.log(IIil11 + " " + iI11iI);
        break;
      case "getDrawRecordHasCoupon":
        if (typeof liIIIi == "object") {
          if (liIIIi.result && liIIIi.result === true) {
            console.log("我的奖品：");
            let Ililii = 0,
              I111ll = 0;
            for (let I1liIi in liIIIi.data) {
              let I1ii1l = liIIIi.data[I1liIi];
              if (I1ii1l.value == "邀请好友") {
                Ililii++;
                I111ll = I1ii1l.infoName.replace("京豆", "");
              } else console.log(I1ii1l.value + " " + I1ii1l.infoName);
            }
            if (Ililii > 0) console.log("邀请好友(" + Ililii + "):" + (Ililii * parseInt(I111ll, 10) || 30) + "京豆");
          } else liIIIi.errorMessage ? console.log(IIil11 + " " + (liIIIi.errorMessage || "")) : console.log(IIil11 + " " + iI11iI);
        } else console.log(IIil11 + " " + iI11iI);
        break;
      case "getShareRecord":
        if (typeof liIIIi == "object") {
          if (liIIIi.result && liIIIi.result === true && liIIIi.data) {
            $.ShareCount = liIIIi.data.length;
            $.log("=========== 你邀请了:" + liIIIi.data.length + "个");
          } else liIIIi.errorMessage ? console.log(IIil11 + " " + (liIIIi.errorMessage || "")) : console.log(IIil11 + " " + iI11iI);
        } else console.log(IIil11 + " " + iI11iI);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IIil11 + "-> " + iI11iI);
    }
    typeof liIIIi == "object" && liIIIi.errorMessage && liIIIi.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (I111li) {
    console.log(I111li);
  }
}
function i1111(l11li, iIlli, l11ll = "POST") {
  let iIlll = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": IiII1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return l11li.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (iIlll.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/shop/league/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, iIlll.Cookie = "" + (l1I1il && l1I1il || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + III1ii), {
    "url": l11li,
    "method": l11ll,
    "headers": iIlll,
    "body": iIlli,
    "timeout": 30000
  };
}
function iIIlII() {
  return new Promise(i1I11I => {
    let i1I11i = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/shop/league/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(i1I11i, async (lI1l, li11Il, i1I11l) => {
      try {
        if (lI1l) {
          if (li11Il && typeof li11Il.statusCode != "undefined") {
            if (li11Il.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(lI1l));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let i1I = i1I11l.match(/(活动已经结束)/) && i1I11l.match(/(活动已经结束)/)[1] || "";
          if (i1I) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          IlIi1l(li11Il);
        }
      } catch (iIlil) {
        $.logErr(iIlil, li11Il);
      } finally {
        i1I11I();
      }
    });
  });
}
function IlIi1l(iIlii) {
  if (iIlii) {
    if (iIlii.headers["set-cookie"]) {
      IiII1 = originCookie + ";";
      for (let li11Ii of iIlii.headers["set-cookie"]) {
        l1IIl[li11Ii.split(";")[0].substr(0, li11Ii.split(";")[0].indexOf("="))] = li11Ii.split(";")[0].substr(li11Ii.split(";")[0].indexOf("=") + 1);
      }
      for (const i1i of Object.keys(l1IIl)) {
        IiII1 += i1i + "=" + l1IIl[i1i] + ";";
      }
      III1ii = IiII1;
    }
  }
}
function IiIiiI(I1Il1l) {
  I1Il1l = I1Il1l || 32;
  let i1l = "abcdef0123456789",
    IlIiII = i1l.length,
    iIliI = "";
  for (i = 0; i < I1Il1l; i++) iIliI += i1l.charAt(Math.floor(Math.random() * IlIiII));
  return iIliI;
}
async function IlIi1i() {
  if (!$.joinVenderId) return;
  return new Promise(async iIli1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iIllil = "";
    if ($.shopactivityId) iIllil = ",\"activityId\":" + $.shopactivityId;
    const l11lli = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iIllil + ",\"channel\":406}",
      I1Il11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l11lli)
      },
      IlIiIl = await lIlliI("8adfb", I1Il11),
      iIiIll = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + l11lli + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlIiIl),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": IiII1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIiIll, async (lIil1l, l1II1i, lili11) => {
      try {
        if (lIil1l) {
          if (l1II1i && typeof l1II1i.statusCode != "undefined") {
            if (l1II1i.statusCode == 403) {}
          }
        } else {
          lili11 = lili11 && lili11.match(/jsonp_.*?\((.*?)\);/) && lili11.match(/jsonp_.*?\((.*?)\);/)[1] || lili11;
          let iIi11l = $.toObj(lili11, lili11);
          if (iIi11l && typeof iIi11l == "object") {
            if (iIi11l && iIi11l.success === true) {
              console.log(" >> " + iIi11l.message);
              $.errorJoinShop = iIi11l.message;
              if (iIi11l.result && iIi11l.result.giftInfo) for (let lIllIl of iIi11l.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + lIllIl.discountString + lIllIl.prizeName + lIllIl.secondLineDesc);
              }
            } else iIi11l && typeof iIi11l == "object" && iIi11l.message ? ($.errorJoinShop = iIi11l.message, console.log("" + (iIi11l.message || ""))) : console.log(lili11);
          } else console.log(lili11);
        }
      } catch (l1II11) {
        $.logErr(l1II11, l1II1i);
      } finally {
        iIli1();
      }
    });
  });
}
async function lIllii() {
  return new Promise(async iiliI1 => {
    const iiii11 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iIl1II = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iiii11)
      },
      il1lIi = await lIlliI("8adfb", iIl1II),
      Ili1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iiii11 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(il1lIi),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": IiII1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ili1, async (ii11iI, i1IIl1, I1IIl) => {
      try {
        if (ii11iI) {
          if (i1IIl1 && typeof i1IIl1.statusCode != "undefined") {
            if (i1IIl1.statusCode == 403) {}
          }
        } else {
          I1IIl = I1IIl && I1IIl.match(/jsonp_.*?\((.*?)\);/) && I1IIl.match(/jsonp_.*?\((.*?)\);/)[1] || I1IIl;
          let i1iiIl = $.toObj(I1IIl, I1IIl);
          i1iiIl && typeof i1iiIl == "object" ? i1iiIl && i1iiIl.success == true && (console.log("去加入：" + (i1iiIl.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i1iiIl.result.interestsRuleList && i1iiIl.result.interestsRuleList[0] && i1iiIl.result.interestsRuleList[0].interestsInfo && i1iiIl.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(I1IIl);
        }
      } catch (iiii1I) {
        $.logErr(iiii1I, i1IIl1);
      } finally {
        iiliI1();
      }
    });
  });
}
function l1il1(i1IIlI) {
  return new Promise(i111ll => {
    const I11lll = {
      "url": "" + i1IIlI,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I11lll, async (I1l1I, llIiII, Ilii) => {
      try {
        if (I1l1I) {} else Ilii ? Ilii = JSON.parse(Ilii) : console.log("未获取到数据,请重新运行");
      } catch (iIiIi1) {
        $.logErr(iIiIi1, llIiII);
        Ilii = null;
      } finally {
        i111ll(Ilii);
      }
    });
  });
}
function IIiI(i111lI, ii11lI) {
  return Math.floor(Math.random() * (ii11lI - i111lI)) + i111lI;
}
function l1iil1(lIiIIi) {
  if (typeof lIiIIi == "string") try {
    return JSON.parse(lIiIIi);
  } catch (I1l1l) {
    return console.log(I1l1l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}


