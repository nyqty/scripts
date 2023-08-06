/*
SK2互动抽奖，至高赢经典神仙水

任务本,邀请不清楚，抽奖概率豆子

变量：jd_sk2_id // 活动id   7月id：export jd_sk2_id="2307100000982163"
变量：opencard_draw // 抽奖次数   export opencard_draw="3"

————————————————
入口：[ SK2互动抽奖，至高赢经典神仙水 ]

请求太频繁会被黑ip
过10分钟再执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#SK2互动抽奖，至高赢经典神仙水
1 1 1 1 * jd_sk2.js, tag=SK2互动抽奖，至高赢经典神仙水, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('SK2互动抽奖，至高赢经典神仙水');
const Il1i = $.isNode() ? require("./jdCookie.js") : "",
  lIiIl = $.isNode() ? require("./sendNotify") : "",
  iiil1l = require("./function/krgetToken"),
  Il1l = require("./function/krgetua"),
  ll11I1 = require("./function/krh5st"),
  Illll = require("./function/krwxSavePrize");
let iiil1i = "https://lzkjdz-isv.isvjcloud.com",
  ilIIli = process.env.jd_sk2_id ? process.env.jd_sk2_id : "",
  ilIIll = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "10" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "10",
  iIliil = {},
  IIiill = [],
  liIIii = "";
if ($.isNode()) {
  Object.keys(Il1i).forEach(liIIi1 => {
    IIiill.push(Il1i[liIIi1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIiill = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i11i1($.getdata("CookiesJD") || "[]").map(I1liiI => I1liiI.cookie)].filter(l1I11l => !!l1I11l);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let Iii1lI = "",
  I1liii = "",
  liiiIi = "https://lzkjdz-isv.isvjcloud.com/m/1000009821/TaskDraw/?activityId=" + ilIIli + "/";
!(async () => {
  if (!IIiill[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await iIl1i("http://code.kingran.cf/sk2.json");
  if (authorCodeList) {
    console.log("❖ 远程获取数据中...\n❖ 数据获取正常...\n");
    for (let I1lii1 = 0; I1lii1 < authorCodeList.length; I1lii1++) {
      console.log("❖ 远程数据第[" + (I1lii1 + 1) + "]个变量: export jd_sk2_id=\"" + authorCodeList[I1lii1] + "\"");
    }
  } else console.log("❖ 远程数据获取失败,请自行查找可用活动ID...\n");
  if (!ilIIli) {
    console.log("\n请先通过环境变量,设置活动ID变量：export jd_sk2_id='活动ID' 定义活动ID\n");
    return;
  }
  $.activityId = ilIIli;
  $.shareUuid = "";
  console.log("\n每期活动自行去 SKII 店铺查看，有水无水自测");
  console.log("入口:\n" + liiiIi);
  for (let liiiI1 = 0; liiiI1 < IIiill.length; liiiI1++) {
    liIIii = IIiill[liiiI1];
    originCookie = IIiill[liiiI1];
    if (liIIii) {
      $.UserName = decodeURIComponent(liIIii.match(/pt_pin=([^; ]+)(?=;?)/) && liIIii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = liiiI1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await Il1l($.UserName);
      await l1I11I();
      await $.wait(3000);
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let ii1I = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + ii1I);
    if ($.isNode()) await lIiIl.sendNotify("" + $.name, "" + ii1I);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(ii11 => $.logErr(ii11)).finally(() => $.done());
async function l1I11I() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    Iii1lI = "";
    $.Token = "";
    $.Pin = "";
    $.Raglan = false;
    $.activityType = 99;
    $.venderId = 1000009821;
    $.Token = await iiil1l(liIIii, iiil1i);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await liiiIl();
    if (I1liii == "") {
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
    await I1liil("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await I1liil("accessLogWithAD");
    await I1liil("getOpenCardStatusWithOutSelf");
    await I1liil("activityContent");
    if ($.Raglan) return;
    if ($.openStatus == false) {
      console.log("去开通店铺会员");
      $.joinVenderId = 1000009821;
      await iIl1l();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await iIl1l());
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 无法开卡,跳过运行");
        return;
      }
      await I1liil("getOpenCardStatusWithOutSelf");
      await I1liil("activityContent");
    }
    if ($.hotFlag) return;
    console.log($.actorUuid);
    for (let li1i1 = 0; li1i1 < $.taskslist.length; li1i1++) {
      $.taskId = $.taskslist[li1i1].taskId;
      $.sortBy = $.taskslist[li1i1].sortBy;
      if ($.taskslist[li1i1].btnState != 1) switch ($.sortBy) {
        case 110:
          console.log("去完成" + $.taskslist[li1i1].taskName);
          await I1liil("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 120:
          console.log("去完成" + $.taskslist[li1i1].taskName);
          await I1liil("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 130:
          console.log("去完成" + $.taskslist[li1i1].taskName);
          await I1liil("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 140:
          console.log("去完成" + $.taskslist[li1i1].taskName);
          await I1liil("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 150:
          console.log("去完成" + $.taskslist[li1i1].taskName);
          await I1liil("browse");
          for (let I1iiIl = 0; I1iiIl < $.browselist.length; I1iiIl++) {
            $.skuId = $.browselist[I1iiIl].skuId;
            $.browselist[I1iiIl].state != 1 && (console.log("去浏览" + $.browselist[I1iiIl].skuId), await I1liil("browse1"), await $.wait(parseInt(Math.random() * 1000 + 2000, 10)));
          }
          break;
        case 170:
          console.log("去完成" + $.taskslist[li1i1].taskName);
          await I1liil("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 180:
          console.log("去完成" + $.taskslist[li1i1].taskName);
          await I1liil("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 160:
        case 190:
          break;
        default:
          console.log("错误" + $.taskType);
      }
    }
    await I1liil("activityContent");
    if (ilIIll + "" !== "0") {
      $.runFalag = true;
      let iIiiII = parseInt($.leftTimes / 1);
      ilIIll = parseInt(ilIIll, 10);
      if (iIiiII > ilIIll) iIiiII = ilIIll;
      console.log("已设置抽奖次数为" + ilIIll + "次，当前有" + $.leftTimes + "次抽奖机会");
      for (m = 1; iIiiII--; m++) {
        console.log("进行第" + m + "次抽奖");
        await I1liil("draw");
        if ($.runFalag == false) break;
        if (Number(iIiiII) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    $.index == 1 && ($.shareUuid = $.actorUuid);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (I1IIil) {
    console.log(I1IIil);
  }
}
async function I1liil(I1IIii) {
  if ($.outFlag) return;
  let li11i1 = "https://lzkjdz-isv.isvjcloud.com",
    II1l1 = "",
    liii1i = "POST";
  switch (I1IIii) {
    case "getMyPing":
      url = li11i1 + "/customer/getMyPing";
      II1l1 = "token=" + $.Token + "&fromType=APP&userId=1000009821&pin=";
      break;
    case "getSimpleActInfoVo":
      url = li11i1 + "/common/brand/getSimpleActInfoVo";
      II1l1 = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = li11i1 + "/common/accessLogWithAD";
      let I1IIiI = "https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      II1l1 = "venderId=1000009821&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(I1IIiI);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = li11i1 + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      II1l1 = "venderId=1000009821&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = li11i1 + "/wx/skii/lottery/draw/main";
      II1l1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&teamId=" + $.shareUuid;
      break;
    case "task":
      url = li11i1 + "/wx/skii/lottery/draw/task";
      II1l1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId + "&mark=2";
      break;
    case "browse":
      url = li11i1 + "/wx/skii/lottery/draw/browse";
      II1l1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId + "&mark=1";
      break;
    case "browse1":
      url = li11i1 + "/wx/skii/lottery/draw/browse";
      II1l1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&skuId=" + $.skuId;
      break;
    case "followShop":
      url = li11i1 + "/wxActionCommon/followShop";
      II1l1 = "activityId=" + $.activityId + "userId=1000009821&activityType=99&buyerNick=" + encodeURIComponent($.Pin) + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = li11i1 + "/wx/skii/lottery/draw/draw";
      II1l1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + I1IIii);
  }
  let lI1iII = Iii1ll(url, II1l1, liii1i);
  return new Promise(async ilIli1 => {
    $.post(lI1iII, (ll1lII, Ii1lIl, iIIIiI) => {
      try {
        liIIiI(Ii1lIl);
        ll1lII ? (Ii1lIl && typeof Ii1lIl.statusCode != "undefined" && Ii1lIl.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(ll1lII, ll1lII)), console.log("API请求失败，请检查网路重试")) : IliIi1(I1IIii, iIIIiI);
      } catch (ll1lI1) {
        console.log(ll1lI1, Ii1lIl);
      } finally {
        ilIli1();
      }
    });
  });
}
async function IliIi1(lIiIii, i1Ill) {
  let lIl1II = "";
  try {
    if (lIiIii != "accessLogWithAD" || lIiIii != "drawContent") {
      if (i1Ill) {
        lIl1II = JSON.parse(i1Ill);
      }
    }
  } catch (l1ll1I) {
    console.log("执行任务异常");
    console.log(i1Ill);
    $.runFalag = false;
  }
  try {
    switch (lIiIii) {
      case "getMyPing":
        if (typeof lIl1II == "object") {
          if (lIl1II.result && lIl1II.result === true) {
            if (lIl1II.data && typeof lIl1II.data.secretPin != "undefined") $.Pin = lIl1II.data.secretPin;
            if (lIl1II.data && typeof lIl1II.data.nickname != "undefined") $.nickname = lIl1II.data.nickname;
          } else lIl1II.errorMessage ? console.log("" + (lIl1II.errorMessage || "")) : console.log("" + i1Ill);
        } else console.log("" + i1Ill);
        break;
      case "task":
        if (typeof lIl1II == "object") {
          if (lIl1II.success && lIl1II.success === true) {
            console.log("" + (lIl1II.success || ""));
          } else lIl1II.errorMessage ? console.log("" + (lIl1II.errorMessage || "")) : console.log("" + i1Ill);
        } else console.log("" + i1Ill);
        break;
      case "browse":
        if (typeof lIl1II == "object") {
          if (lIl1II.success && lIl1II.success === true) {
            $.browselist = lIl1II.data || [];
          } else {
            if (lIl1II.errorMessage) console.log("" + (lIl1II.errorMessage || ""));else {
              console.log("" + i1Ill);
            }
          }
        } else console.log("" + i1Ill);
        break;
      case "browse1":
        if (typeof lIl1II == "object") {
          if (lIl1II.success && lIl1II.success === true) {
            console.log("" + (lIl1II.success || ""));
          } else lIl1II.errorMessage ? console.log("" + (lIl1II.errorMessage || "")) : console.log("" + i1Ill);
        } else console.log("" + i1Ill);
        break;
      case "draw":
        if (typeof lIl1II == "object") {
          if (lIl1II.success && lIl1II.success === true) {
            if (typeof lIl1II.data == "object") {
              drawInfo = lIl1II.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = lIl1II.data.addressId;
                  prizeName = drawInfo.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let IlII = await Illll("https://lzkjdz-isv.isvjcloud.com", liIIii, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  IlII ? $.isNode() && (await lIiIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + liiiIi)) : $.isNode() && (await lIiIl.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + liiiIi));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await lIiIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\n" + liiiIi));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else console.log("" + i1Ill);
          } else lIl1II.errorMessage ? ($.runFalag = false, console.log("" + (lIl1II.errorMessage || ""))) : console.log("" + i1Ill);
        } else {
          console.log("" + i1Ill);
        }
        break;
      case "followShop":
        if (typeof lIl1II == "object") {
          if (lIl1II.result && lIl1II.result === true) console.log("" + lIl1II.data);else lIl1II.errorMessage ? console.log("" + (lIl1II.errorMessage || "")) : console.log(" " + i1Ill);
        } else console.log("" + i1Ill);
        break;
      case "activityContent":
        if (typeof lIl1II == "object") {
          if (lIl1II.success && lIl1II.success === true) {
            $.actorUuid = lIl1II.data.uuid || "";
            $.turntableId = lIl1II.data.turntableId || "";
            $.leftTimes = lIl1II.data.leftTimes || 0;
            $.state = lIl1II.data.state || "";
            $.taskslist = lIl1II.data.tasks || [];
          } else {
            if (lIl1II.errorMessage) {
              if (lIl1II.errorMessage.indexOf("结束") > -1) $.activityEnd = true;else lIl1II.errorMessage.includes("擦肩") && ($.Raglan = true);
              console.log("" + (lIl1II.errorMessage || ""));
            } else {
              console.log(lIl1II.msg);
              lIl1II.msg.includes("不符合") && ($.Raglan = true);
            }
          }
        } else console.log("" + i1Ill);
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof lIl1II == "object") {
          if (lIl1II.isOk) $.openStatus = lIl1II.openCard || false;else {
            if (lIl1II.errorMessage || lIl1II.msg) {
              console.log("" + (lIl1II.errorMessage || lIl1II.msg || ""));
            } else console.log("" + i1Ill);
          }
        } else console.log("" + i1Ill);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(lIiIii + "-> " + i1Ill);
    }
    if (typeof lIl1II == "object") {
      if (lIl1II.errorMessage) {
        if (lIl1II.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (i111l) {
    console.log(i111l);
  }
}
function Iii1ll(lIiIlI, iilIlI, i111i = "POST") {
  let llIii1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": liIIii,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lIiIlI.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1 && (llIii1.Referer = liiiIi, llIii1.Cookie = "" + (Iii1lI && Iii1lI || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + I1liii), {
    "url": lIiIlI,
    "method": i111i,
    "headers": llIii1,
    "body": iilIlI,
    "timeout": 30000
  };
}
function liiiIl() {
  return new Promise(l1IIl => {
    let l1il1 = {
      "url": "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": liIIii,
        "Referer": liiiIi,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1il1, async (IIiI, l1iil1, iiiIiI) => {
      try {
        if (IIiI) {
          l1iil1 && typeof l1iil1.statusCode != "undefined" && l1iil1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(IIiI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Il11l = iiiIiI.match(/(活动已经结束)/) && iiiIiI.match(/(活动已经结束)/)[1] || "";
          Il11l && ($.activityEnd = true, console.log("活动已结束"));
          liIIiI(l1iil1);
        }
      } catch (l1iiil) {
        $.logErr(l1iiil, l1iil1);
      } finally {
        l1IIl();
      }
    });
  });
}
function liIIiI(l1ilI) {
  if (l1ilI) {
    if (l1ilI.headers["set-cookie"]) {
      liIIii = originCookie + ";";
      for (let lIi1I1 of l1ilI.headers["set-cookie"]) {
        iIliil[lIi1I1.split(";")[0].substr(0, lIi1I1.split(";")[0].indexOf("="))] = lIi1I1.split(";")[0].substr(lIi1I1.split(";")[0].indexOf("=") + 1);
      }
      for (const illIIi of Object.keys(iIliil)) {
        liIIii += illIIi + "=" + iIliil[illIIi] + ";";
      }
      I1liii = liIIii;
    }
  }
}
function Iii1li(Iil1I) {
  Iil1I = Iil1I || 32;
  let illIIl = "abcdef0123456789",
    iiiIlI = illIIl.length,
    I1i11 = "";
  for (i = 0; i < Iil1I; i++) I1i11 += illIIl.charAt(Math.floor(Math.random() * iiiIlI));
  return I1i11;
}
async function iIl1l() {
  if (!$.joinVenderId) return;
  return new Promise(async lIi1II => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IllI1 = "";
    if ($.shopactivityId) IllI1 = ",\"activityId\":" + $.shopactivityId;
    const iiiIil = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IllI1 + ",\"channel\":406}",
      lilll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iiiIil)
      },
      l1iilI = await ll11I1("8adfb", lilll),
      lilli = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iiiIil + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1iilI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": liIIii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lilli, async (ilI1ii, iII1l, ilI1il) => {
      try {
        if (ilI1ii) iII1l && typeof iII1l.statusCode != "undefined" && iII1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          ilI1il = ilI1il && ilI1il.match(/jsonp_.*?\((.*?)\);/) && ilI1il.match(/jsonp_.*?\((.*?)\);/)[1] || ilI1il;
          let iII1I = $.toObj(ilI1il, ilI1il);
          if (iII1I && typeof iII1I == "object") {
            if (iII1I && iII1I.success === true) {
              console.log(" >> " + iII1I.message);
              $.errorJoinShop = iII1I.message;
              if (iII1I.result && iII1I.result.giftInfo) for (let iilli1 of iII1I.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + iilli1.discountString + iilli1.prizeName + iilli1.secondLineDesc);
              }
            } else iII1I && typeof iII1I == "object" && iII1I.message ? ($.errorJoinShop = iII1I.message, console.log("" + (iII1I.message || ""))) : console.log(ilI1il);
          } else console.log(ilI1il);
        }
      } catch (Iil1l) {
        $.logErr(Iil1l, iII1l);
      } finally {
        lIi1II();
      }
    });
  });
}
function iIl1i(Iil1i) {
  return new Promise(i11I1 => {
    const l1I1l = {
      "url": "" + Iil1i,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(l1I1l, async (i11II, IlIi1, i1i1il) => {
      try {
        if (i11II) {} else i1i1il ? i1i1il = JSON.parse(i1i1il) : console.log("未获取到数据,请重新运行");
      } catch (l1Ili1) {
        $.logErr(l1Ili1, IlIi1);
        i1i1il = null;
      } finally {
        i11I1(i1i1il);
      }
    });
  });
}
function i11i1(I111ii) {
  if (typeof I111ii == "string") try {
    return JSON.parse(I111ii);
  } catch (i1i1l1) {
    return console.log(i1i1l1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
