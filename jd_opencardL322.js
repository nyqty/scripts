/*
爱让好物 成为礼物
新增开卡脚本，一次性脚本

变量
//export opencard_draw="3" //抽奖次数 3

————————————————
入口：[ 爱让好物 成为礼物 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#爱让好物 成为礼物
11 11 11 11 * jd_opencardL322.js, tag=爱让好物 成为礼物, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('爱让好物 成为礼物');
const iII11l = $.isNode() ? require("./jdCookie.js") : "",
  i1IiI1 = $.isNode() ? require("./sendNotify") : "",
  l1lIII = require("./function/krgetToken"),
  iII11i = require("./function/krh5st"),
  lIlllI = require("./function/krwxSavePrize");
let III1lI = "https://lzdz1-isv.isvjcloud.com",
  I11i = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  ll1IlI = [],
  I11l = "";
if ($.isNode()) {
  Object.keys(iII11l).forEach(i1lII => {
    ll1IlI.push(iII11l[i1lII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else ll1IlI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I11I($.getdata("CookiesJD") || "[]").map(iilIii => iilIii.cookie)].filter(iII111 => !!iII111);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let Ili1l1 = "",
  iilIil = "",
  illI1i = {};
!(async () => {
  if (!ll1IlI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await ll1Ill("http://code.kingran.cf/322.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[Ili1il(0, authorCodeList.length)];
  } else {
    let llIiiI = ["321be625b8f2470b830edfd0c90d4845", "cb26dd1cb0fb493eb28023b78110b5fa"];
    $.authorCode = llIiiI[Ili1il(0, llIiiI.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "dz09c20bfa4d788bf3e3973e36d215";
  $.shareUuid = $.authorCode;
  for (let IiIilI = 0; IiIilI < ll1IlI.length; IiIilI++) {
    I11l = ll1IlI[IiIilI];
    originCookie = ll1IlI[IiIilI];
    if (I11l) {
      $.UserName = decodeURIComponent(I11l.match(/pt_pin=([^; ]+)(?=;?)/) && I11l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IiIilI + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await lIllli();
      await i1IiII();
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let iilIl1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iilIl1);
    if ($.isNode()) await i1IiI1.sendNotify("" + $.name, "" + iilIl1);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(III1i1 => $.logErr(III1i1)).finally(() => $.done());
async function i1IiII() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    Ili1l1 = "";
    $.Token = "";
    $.Pin = "";
    let iiiIi1 = false;
    $.Raglan = false;
    $.Token = await l1lIII(I11l, III1lI);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await l1ll11();
    if (iilIil == "") {
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
    await illI1l("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await illI1l("accessLogWithAD");
    await $.wait(1000);
    await illI1l("drawContent");
    await illI1l("activityContent");
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
    await illI1l("checkOpenCard");
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.openStatus == false) {
          iiiIi1 = true;
          $.joinVenderId = o.venderId;
          $.shopactivityId = "";
          await i1IiIi();
          for (let lill1 = 0; lill1 < Array(2).length; lill1++) {
            if (lill1 > 0) console.log("第" + lill1 + "次 重新开卡");
            await i1IiIl();
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await illI1l("drawContent");
          await illI1l("checkOpenCard");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
      await illI1l("activityContent");
    } else console.log("已全部开卡");
    $.log("关注: " + $.allFollowShop);
    !$.allFollowShop && !$.outFlag && (iiiIi1 = true, await illI1l("signTask"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
    await illI1l("activityContent");
    if (I11i + "" !== "0") {
      $.runFalag = true;
      let li1lli = parseInt($.score2 / 100);
      I11i = parseInt(I11i, 10);
      if (li1lli > I11i) li1lli = I11i;
      console.log("已设置抽奖次数为" + li1lli + "次，当前有" + $.score2 + "金币");
      for (m = 1; li1lli--; m++) {
        console.log("进行第" + m + "次抽奖");
        await illI1l("startDraw");
        if ($.runFalag == false) break;
        if (Number(li1lli) <= 0) break;
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
  } catch (I1i1I) {
    console.log(I1i1I);
  }
}
async function illI1l(IIl1) {
  if ($.outFlag) return;
  let i1Ii11 = "https://lzdz1-isv.isvjcloud.com",
    l1iill = "",
    l1ill = "POST";
  switch (IIl1) {
    case "getMyPing":
      url = i1Ii11 + "/customer/getMyCidPing";
      l1iill = "token=" + $.Token + "&fromType=APP&userId=1000002833&pin=";
      break;
    case "getSimpleActInfoVo":
      url = i1Ii11 + "/common/brand/getSimpleActInfoVo";
      l1iill = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = i1Ii11 + "/common/accessLogWithAD";
      let iiiIll = "https://lzdz1-isv.isvjcloud.com/m/1000002833/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      l1iill = "venderId=1000002833&code=90&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iiiIll) + "&subType=JDApp";
      break;
    case "drawContent":
      url = i1Ii11 + "/dingzhi/taskact/common/drawContent";
      l1iill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = i1Ii11 + "/dingzhi/apr/union/activityContent";
      l1iill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "checkOpenCard":
      url = i1Ii11 + "/dingzhi/apr/union/initOpenCard";
      l1iill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "getSystime":
      url = i1Ii11 + "/common/getSystime";
      l1iill = "pin=" + encodeURIComponent($.Pin);
      break;
    case "signDetail":
      url = i1Ii11 + "/dingzhi/apr/union/signDetail";
      l1iill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "signTask":
      url = i1Ii11 + "/dingzhi/apr/union/saveTask";
      l1iill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=0&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "mainActive":
      url = i1Ii11 + "/dingzhi/apr/union/saveTask";
      l1iill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=12&taskValue=1&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "startDraw":
      url = i1Ii11 + "/dingzhi/apr/union/draw";
      l1iill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&change=2";
      break;
    case "followShop":
      url = i1Ii11 + "/dingzhi/apr/union/saveTask";
      l1iill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=23&taskValue=23}";
      break;
    case "addSku":
      url = i1Ii11 + "/dingzhi/apr/union/saveTask";
      l1iill = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=21&taskValue=21";
      break;
    default:
      console.log("错误" + IIl1);
  }
  let l1iili = i1lI1(url, l1iill, l1ill);
  return new Promise(async iilliI => {
    $.post(l1iili, (ilI1il, i11Il, i11Ii) => {
      try {
        I1I111(i11Il);
        if (ilI1il) {
          i11Il && typeof i11Il.statusCode != "undefined" && i11Il.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(ilI1il, ilI1il));
          console.log(IIl1 + " API请求失败，请检查网路重试");
        } else l1ll1I(IIl1, i11Ii);
      } catch (IIli) {
        console.log(IIli, i11Il);
      } finally {
        iilliI();
      }
    });
  });
}
async function l1ll1I(iII11, iilll1) {
  let l1I11 = "";
  try {
    if (iII11 != "accessLogWithAD" || iII11 != "drawContent") {
      if (iilll1) {
        l1I11 = JSON.parse(iilll1);
      }
    }
  } catch (l1Ilii) {
    console.log(iII11 + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (iII11) {
      case "getMyPing":
        if (typeof l1I11 == "object") {
          if (l1I11.result && l1I11.result === true) {
            if (l1I11.data && typeof l1I11.data.secretPin != "undefined") $.Pin = l1I11.data.secretPin;
            if (l1I11.data && typeof l1I11.data.nickname != "undefined") $.nickname = l1I11.data.nickname;
          } else l1I11.errorMessage ? console.log(iII11 + " " + (l1I11.errorMessage || "")) : console.log(iII11 + " " + iilll1);
        } else console.log(iII11 + " " + iilll1);
        break;
      case "checkOpenCard":
        if (typeof l1I11 == "object") {
          if (l1I11.result && l1I11.result === true) {
            let l1Ilil = l1I11.data.cardList1 || [],
              iIili = l1I11.data.cardList2 || [],
              i11l1I = l1I11.data.cardList || [],
              iil1Il = l1I11.data.openCardList || [],
              IlIll = l1I11.data.openInfo || [];
            $.openList = [...i11l1I, ...l1Ilil, ...iIili, ...iil1Il, ...IlIll];
            $.allOpenCard = l1I11.data.allOpenCard || l1I11.data.isOpenCardStatus || false;
            $.openCardScore1 = l1I11.data.score1 || 0;
            $.openCardScore2 = l1I11.data.score2 || 0;
            $.drawScore = l1I11.data.score || 0;
            if (l1I11.data.beans || l1I11.data.addBeanNum) console.log("开卡获得:" + (l1I11.data.beans || l1I11.data.addBeanNum) + "豆");
          } else l1I11.errorMessage ? console.log(iII11 + " " + (l1I11.errorMessage || "")) : console.log(iII11 + " " + iilll1);
        } else {
          console.log(iII11 + " " + iilll1);
        }
        break;
      case "activityContent":
        if (typeof l1I11 == "object") {
          if (l1I11.result && l1I11.result === true) {
            $.actorUuid = l1I11.data.actorUuid || "";
            $.saveAddress = l1I11.data.saveAddress || false;
            $.followShop = l1I11.data.followShop || false;
            $.hasEnd = l1I11.data.hasEnd || false;
            $.toSign = l1I11.data.toSign || false;
            $.openCard = l1I11.data.openCard || false;
            $.allFollowShop = l1I11.data.allFollowShop || false;
            $.addSku = l1I11.data.skuAddCart || false;
            $.firstAccess = l1I11.data.firstAccess || false;
            $.isDraw = l1I11.data.isDraw;
            $.score2 = l1I11.data.score2 || 0;
            $.assistCount = l1I11.data.assistCount || 0;
            $.mainActive = l1I11.data.mainActive || false;
            $.sign = l1I11.data.sign || false;
          } else {
            if (l1I11.errorMessage) {
              if (l1I11.errorMessage.indexOf("结束") > -1) $.activityEnd = true;else l1I11.errorMessage.includes("擦肩") && ($.Raglan = true);
              console.log(iII11 + " " + (l1I11.errorMessage || ""));
            } else console.log(iII11 + " " + iilll1);
          }
        } else {
          console.log(iII11 + " " + iilll1);
        }
        break;
      case "signTask":
        typeof l1I11 == "object" ? l1I11.result && l1I11.result === true ? console.log("获得：" + (l1I11.data.score2 || 0) + " ,豆子：" + (l1I11.data.taskbeanNum || 0)) : console.log("" + (l1I11.errorMessage || "")) : console.log("" + iilll1);
        break;
      case "addSku":
      case "mainActive":
      case "followShop":
        if (typeof l1I11 == "object") {
          if (l1I11.result && l1I11.result === true && l1I11.data) console.log("获得：" + (l1I11.data.score2 || 0) + " ");else {
            if (l1I11.errorMessage) console.log("" + (l1I11.errorMessage || ""));else {
              console.log("" + iilll1);
            }
          }
        } else console.log(iII11 + " " + iilll1);
        break;
      case "startDraw":
        if (typeof l1I11 == "object") {
          if (l1I11.result && l1I11.result === true) {
            if (typeof l1I11.data == "object") {
              drawInfo = l1I11.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = l1I11.data.addressId;
                  prizeName = drawInfo.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let liii = await lIlllI("https://lzdz1-isv.isvjcloud.com", I11l, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  if (liii) $.isNode() && (await i1IiI1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId="));else {
                    if ($.isNode()) {
                      await i1IiI1.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId);
                    }
                  }
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await i1IiI1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  if (drawInfo.name.includes("券")) {
                    console.log("🗑️ 优惠券");
                  } else console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else console.log("" + iilll1);
          } else {
            if (l1I11.errorMessage) {
              $.runFalag = false;
              console.log("" + (l1I11.errorMessage || ""));
            } else console.log("" + iilll1);
          }
        } else console.log("" + iilll1);
        break;
      case "prizeRotation":
        if (typeof l1I11 == "object") {
          if (l1I11.result && l1I11.result === true && l1I11.data) $.prizeRotation = l1I11.data.prizeRotation;else l1I11.errorMessage ? console.log("" + (l1I11.errorMessage || "")) : console.log("" + iilll1);
        } else console.log("" + iilll1);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(iII11 + "-> " + iilll1);
    }
    typeof l1I11 == "object" && l1I11.errorMessage && l1I11.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (ii1iI1) {
    console.log(ii1iI1);
  }
}
function i1lI1(ll111I, liIl1I, IIl111 = "POST") {
  let Ill1lI = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": I11l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return ll111I.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (Ill1lI.Referer = "https://lzdz1-isv.isvjcloud.com/m/1000002833/" + $.activityId + "/?shareUuid=" + $.shareUuid, Ill1lI.Cookie = "" + (Ili1l1 && Ili1l1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + iilIil), {
    "url": ll111I,
    "method": IIl111,
    "headers": Ill1lI,
    "body": liIl1I,
    "timeout": 30000
  };
}
function l1ll11() {
  return new Promise(ll111i => {
    let iiilI1 = {
      "url": "https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": I11l,
        "Referer": "https://lzdz1-isv.isvjcloud.com/m/1000002833/" + $.activityId + "/?shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iiilI1, async (i11II1, Ilill1, I111lI) => {
      try {
        if (i11II1) {
          if (Ilill1 && typeof Ilill1.statusCode != "undefined") {
            Ilill1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(i11II1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let lIi1I = I111lI.match(/(活动已经结束)/) && I111lI.match(/(活动已经结束)/)[1] || "";
          lIi1I && ($.activityEnd = true, console.log("活动已结束"));
          I1I111(Ilill1);
        }
      } catch (I111ll) {
        $.logErr(I111ll, Ilill1);
      } finally {
        ll111i();
      }
    });
  });
}
function I1I111(Il1il1) {
  if (Il1il1) {
    if (Il1il1.headers["set-cookie"]) {
      I11l = originCookie + ";";
      for (let Ii1ll of Il1il1.headers["set-cookie"]) {
        illI1i[Ii1ll.split(";")[0].substr(0, Ii1ll.split(";")[0].indexOf("="))] = Ii1ll.split(";")[0].substr(Ii1ll.split(";")[0].indexOf("=") + 1);
      }
      for (const iIlll of Object.keys(illI1i)) {
        I11l += iIlll + "=" + illI1i[iIlll] + ";";
      }
      iilIil = I11l;
    }
  }
}
async function lIllli() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + lIllll(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function lIllll(l1li1I) {
  l1li1I = l1li1I || 32;
  let I1IIIl = "abcdef0123456789",
    il1IlI = I1IIIl.length,
    I1IIIi = "";
  for (i = 0; i < l1li1I; i++) I1IIIi += I1IIIl.charAt(Math.floor(Math.random() * il1IlI));
  return I1IIIi;
}
function I11I(il1Il1) {
  if (typeof il1Il1 == "string") {
    try {
      return JSON.parse(il1Il1);
    } catch (I1IIII) {
      return console.log(I1IIII), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function ll1Ili(iIiIlI) {
  var iIiIil = new Date(iIiIlI),
    iIiIii = iIiIil.getFullYear(),
    lI1i = iIiIil.getMonth() + 1 < 10 ? "0" + (iIiIil.getMonth() + 1) : iIiIil.getMonth() + 1,
    i11 = iIiIil.getDate();
  i11.length == 2 && (i11 = "0" + i11);
  return iIiIii + lI1i + i11;
}
async function i1IiIl() {
  if (!$.joinVenderId) return;
  return new Promise(async i1i => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I1Il1i = "";
    if ($.shopactivityId) I1Il1i = ",\"activityId\":" + $.shopactivityId;
    const i1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I1Il1i + ",\"channel\":406}",
      IlIiII = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1l)
      },
      iIliI = await iII11i("8adfb", IlIiII),
      i1IlII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIliI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": I11l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1IlII, async (i1IlIl, ll1IIi, IlIiI1) => {
      try {
        if (i1IlIl) {
          if (ll1IIi && typeof ll1IIi.statusCode != "undefined") {
            if (ll1IIi.statusCode == 403) {}
          }
        } else {
          IlIiI1 = IlIiI1 && IlIiI1.match(/jsonp_.*?\((.*?)\);/) && IlIiI1.match(/jsonp_.*?\((.*?)\);/)[1] || IlIiI1;
          let IlIiIl = $.toObj(IlIiI1, IlIiI1);
          if (IlIiIl && typeof IlIiIl == "object") {
            if (IlIiIl && IlIiIl.success === true) {
              console.log(" >> " + IlIiIl.message);
              $.errorJoinShop = IlIiIl.message;
              if (IlIiIl.result && IlIiIl.result.giftInfo) {
                for (let iIiIll of IlIiIl.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + iIiIll.discountString + iIiIll.prizeName + iIiIll.secondLineDesc);
                }
              }
            } else {
              if (IlIiIl && typeof IlIiIl == "object" && IlIiIl.message) {
                $.errorJoinShop = IlIiIl.message;
                console.log("" + (IlIiIl.message || ""));
              } else console.log(IlIiI1);
            }
          } else console.log(IlIiI1);
        }
      } catch (IIlIiI) {
        $.logErr(IIlIiI, ll1IIi);
      } finally {
        i1i();
      }
    });
  });
}
async function i1IiIi() {
  return new Promise(async lili11 => {
    const iIi11l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      lIllIl = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIi11l)
      },
      iIi11i = await iII11i("8adfb", lIllIl),
      ii11i1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIi11l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIi11i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": I11l,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ii11i1, async (il111l, iIl1Il, il111i) => {
      try {
        if (il111l) {
          if (iIl1Il && typeof iIl1Il.statusCode != "undefined") {
            if (iIl1Il.statusCode == 403) {}
          }
        } else {
          il111i = il111i && il111i.match(/jsonp_.*?\((.*?)\);/) && il111i.match(/jsonp_.*?\((.*?)\);/)[1] || il111i;
          let i1iiII = $.toObj(il111i, il111i);
          i1iiII && typeof i1iiII == "object" ? i1iiII && i1iiII.success == true && (console.log("去加入：" + (i1iiII.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i1iiII.result.interestsRuleList && i1iiII.result.interestsRuleList[0] && i1iiII.result.interestsRuleList[0].interestsInfo && i1iiII.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(il111i);
        }
      } catch (I1III) {
        $.logErr(I1III, iIl1Il);
      } finally {
        lili11();
      }
    });
  });
}
function ll1Ill(l1II1I) {
  return new Promise(i1iiIi => {
    const iiliII = {
      "url": "" + l1II1I,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iiliII, async (i1iiIl, I11llI, I1IIi) => {
      try {
        if (i1iiIl) {} else {
          I1IIi ? I1IIi = JSON.parse(I1IIi) : console.log("未获取到数据,请重新运行");
        }
      } catch (iIl1I1) {
        $.logErr(iIl1I1, I11llI);
        I1IIi = null;
      } finally {
        i1iiIi(I1IIi);
      }
    });
  });
}
function Ili1il(i111li, lIlIiI) {
  return Math.floor(Math.random() * (lIlIiI - i111li)) + i111li;
}
