/*
飞鹤集成长值赢千元礼包

任务本,邀请不清楚，抽奖概率豆子

变量：jd_fh_id // 活动id   8月id：export jd_fh_id="dzb76b9238993e4cebac6abde21556"
变量：opencard_draw // 抽奖次数   export opencard_draw="3"

————————————————
入口：[ 飞鹤集成长值赢千元礼包 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#飞鹤集成长值赢千元礼包
11 11 11 11 * jd_fh_draw.js, tag=飞鹤集成长值赢千元礼包, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('飞鹤集成长值赢千元礼包')
const Ii1I1 = $.isNode() ? require("./jdCookie.js") : "",
  i11Il1 = $.isNode() ? require("./sendNotify") : "",
  IIIlli = require("./function/krgetToken"),
  Iii1i1 = require("./function/krgetua"),
  IIIlll = require("./function/wxSavePrize");
let llli1I = "https://lzdz1-isv.isvjcloud.com",
  IlilI1 = process.env.jd_fh_id ? process.env.jd_fh_id : "",
  iIIIi = [],
  Il1iII = "";
if ($.isNode()) {
  Object.keys(Ii1I1).forEach(I1lill => {
    iIIIi.push(Ii1I1[I1lill]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iIIIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Ili11l($.getdata("CookiesJD") || "[]").map(I1lili => I1lili.cookie)].filter(i11Iil => !!i11Iil);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let Iii1iI = "",
  lIi1lI = "",
  IIiiil = {};
!(async () => {
  if (!iIIIi[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await illiiI("http://code.kingran.cf/fh.json");
  if (authorCodeList) {
    console.log("❖ 远程获取数据中...\n❖ 数据获取正常...\n");
    for (let iIlil1 = 0; iIlil1 < authorCodeList.length; iIlil1++) {
      console.log("❖ 远程数据第[" + (iIlil1 + 1) + "]个变量: export jd_fh_id=\"" + authorCodeList[iIlil1] + "\"");
    }
  } else console.log("❖ 远程数据获取失败,请自行查找可用活动ID...\n");
  if (!IlilI1) {
    console.log("\n请先通过环境变量,设置活动ID变量：export jd_fh_id='活动ID' 定义活动ID\n");
    return;
  }
  $.activityId = IlilI1;
  console.log("\n每期活动自行去 飞鹤 店铺查看，有水无水自测");
  for (let IlilII = 0; IlilII < iIIIi.length; IlilII++) {
    Il1iII = iIIIi[IlilII];
    originCookie = iIIIi[IlilII];
    if (Il1iII) {
      $.UserName = decodeURIComponent(Il1iII.match(/pt_pin=([^; ]+)(?=;?)/) && Il1iII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IlilII + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await Iii1i1($.UserName);
      await iIIIl();
      await $.wait(3000);
      if (IlilII == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let iIlilI = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iIlilI);
    if ($.isNode()) await i11Il1.sendNotify("" + $.name, "" + iIlilI);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(i11Ii1 => $.logErr(i11Ii1)).finally(() => $.done());
async function iIIIl() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    Iii1iI = "";
    $.Token = "";
    $.Pin = "";
    $.activityType = 99;
    $.venderId = 1000003568;
    let li11l1 = false;
    $.Token = await IIIlli(Il1iII, llli1I);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await l1IlIl();
    if (lIi1lI == "") {
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
    await IIiiii("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await IIiiii("accessLogWithAD");
    await IIiiii("getUserInfo");
    await IIiiii("activityContent");
    await IIiiii("drawContent");
    if ($.hotFlag) return;
    console.log($.actorUuid);
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }
    await $.wait(1000);
    console.log("开始做日常任务......");
    $.log("签到: " + $.toSign);
    !$.toSign && !$.outFlag && (li11l1 = true, await IIiiii("toSign"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("加购: " + $.addSku);
    !$.addSku && !$.outFlag && (li11l1 = true, await IIiiii("addSku"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    for (let li11lI = 0; li11lI < $.skuVisit.length; li11lI++) {
      $.skuVisit[li11lI].status === false && ($.skuId = $.skuVisit[li11lI].skuId, console.log("去浏览 " + $.skuId), await IIiiii("skuVisit"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    }
    await IIiiii("activityContent");
    console.log("\n目前分值为：" + $.score + "\n");
    $.runFalag = true;
    let IIlIIl = parseInt($.score / 200);
    for (m = 1; IIlIIl--; m++) {
      console.log("第" + m + "次抽奖");
      await IIiiii("draw");
      if ($.runFalag == false) break;
      if (Number(IIlIIl) <= 0) break;
      if (m >= 1) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
      await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
    }
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    console.log("当前助力:" + ($.shareUuid || "未获取到助力邀请码"));
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 10000, 10));
  } catch (l1I1li) {
    console.log(l1I1li);
  }
}
async function IIiiii(li1ii) {
  if ($.outFlag) return;
  let iIIIi1 = "https://lzdz1-isv.isvjcloud.com",
    lIiIiI = "",
    ilIliI = "POST";
  switch (li1ii) {
    case "getSimpleActInfoVo":
      url = iIIIi1 + "/dz/common/getSimpleActInfoVo";
      lIiIiI = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = iIIIi1 + "/customer/getMyCidPing";
      lIiIiI = "userId=1000003568&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = iIIIi1 + "/common/accessLogWithAD";
      let i1Iii = iIIIi1 + "/dingzhi/feihe/fresh/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      lIiIiI = "venderId=1000003568&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(i1Iii) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = iIIIi1 + "/wxActionCommon/getUserInfo";
      lIiIiI = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = iIIIi1 + "/dingzhi/feihe/fresh/activityContent";
      lIiIiI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = iIIIi1 + "/dingzhi/taskact/common/drawContent";
      lIiIiI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = iIIIi1 + "/dingzhi/feihe/fresh/startDraw";
      lIiIiI = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "toSign":
      url = iIIIi1 + "/dingzhi/feihe/fresh/saveTask";
      lIiIiI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=0";
      break;
    case "skuVisit":
      url = iIIIi1 + "/dingzhi/feihe/fresh/saveTask";
      lIiIiI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=5&&taskValue=" + $.skuId;
      break;
    case "isAddress":
      url = iIIIi1 + "/dingzhi/feihe/fresh/saveTask";
      lIiIiI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=5&&taskValue=" + $.skuId;
      break;
    case "followShop":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = iIIIi1 + "/dingzhi/feihe/fresh/saveTask";
      let IIiI1I = "",
        lIi11l = "";
      if (li1ii == "followShop") {
        IIiI1I = 22;
        lIi11l = "";
      } else {
        if (li1ii == "visitSku") {
          IIiI1I = 5;
          lIi11l = $.visitSkuValue || 5;
        } else {
          if (li1ii == "toShop") {
            IIiI1I = 14;
            lIi11l = $.visitSkuValue || 1000003568;
          } else li1ii == "addSku" && (IIiI1I = 21, lIi11l = "");
        }
      }
      lIiIiI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + IIiI1I + "&taskValue=" + $.visitSkuValue;
      break;
    case "getDrawRecordHasCoupon":
      url = iIIIi1 + "/dingzhi/taskact/common/getDrawRecordHasCoupon";
      lIiIiI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    default:
      console.log("错误" + li1ii);
  }
  let Ii1lIi = l1IlIi(url, lIiIiI, ilIliI);
  return new Promise(async lIl1Ii => {
    $.post(Ii1lIi, (ll1Il1, li11li, iliiii) => {
      try {
        liIIli(li11li);
        if (ll1Il1) {
          if (li11li && typeof li11li.statusCode != "undefined") {
            li11li.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(ll1Il1, ll1Il1));
          console.log("API请求失败，请检查网路重试");
        } else liIIll(li1ii, iliiii);
      } catch (li1l1) {
        console.log(li1l1, li11li);
      } finally {
        lIl1Ii();
      }
    });
  });
}
async function liIIll(I1IIli, Il1I1i) {
  let Il1I1l = "";
  try {
    (I1IIli != "accessLogWithAD" || I1IIli != "drawContent") && Il1I1i && (Il1I1l = JSON.parse(Il1I1i));
  } catch (iIIlIi) {
    console.log("执行任务异常");
    console.log(Il1I1i);
    $.runFalag = false;
  }
  try {
    switch (I1IIli) {
      case "getSimpleActInfoVo":
        if (typeof Il1I1l == "object") {
          if (Il1I1l.result && Il1I1l.result === true) {
            if (typeof Il1I1l.data.shopId != "undefined") $.shopId = Il1I1l.data.shopId;
            if (typeof Il1I1l.data.venderId != "undefined") $.venderId = Il1I1l.data.venderId;
          } else Il1I1l.errorMessage ? console.log("" + (Il1I1l.errorMessage || "")) : console.log("" + Il1I1i);
        } else console.log("" + Il1I1i);
        break;
      case "getMyPing":
        if (typeof Il1I1l == "object") {
          if (Il1I1l.result && Il1I1l.result === true) {
            if (Il1I1l.data && typeof Il1I1l.data.secretPin != "undefined") $.Pin = Il1I1l.data.secretPin;
            if (Il1I1l.data && typeof Il1I1l.data.nickname != "undefined") $.nickname = Il1I1l.data.nickname;
          } else Il1I1l.errorMessage ? console.log("" + (Il1I1l.errorMessage || "")) : console.log("" + Il1I1i);
        } else console.log("" + Il1I1i);
        break;
      case "getUserInfo":
        if (typeof Il1I1l == "object") {
          if (Il1I1l.result && Il1I1l.result === true) {
            if (Il1I1l.data && typeof Il1I1l.data.yunMidImageUrl != "undefined") $.attrTouXiang = Il1I1l.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else Il1I1l.errorMessage ? console.log("" + (Il1I1l.errorMessage || "")) : console.log("" + Il1I1i);
        } else console.log("" + Il1I1i);
        break;
      case "activityContent":
        if (typeof Il1I1l == "object") {
          if (Il1I1l.result && Il1I1l.result === true) {
            $.endTime = Il1I1l.data.endTime || Il1I1l.data.activityVo && Il1I1l.data.activityVo.endTime || Il1I1l.data.activity.endTime || 0;
            $.hasEnd = Il1I1l.data.hasEnd || false;
            $.score = Il1I1l.data.score || 0;
            $.assistStatus = Il1I1l.data.assistStatus || 0;
            $.skuVisit = Il1I1l.data.skuVisit || [];
            $.addSku = Il1I1l.data.addSku || false;
            $.toSign = Il1I1l.data.toSign || false;
            $.isAddress = Il1I1l.data.isAddress || false;
            $.actorUuid = Il1I1l.data.actorUuid || 0;
          } else Il1I1l.errorMessage ? console.log("" + (Il1I1l.errorMessage || "")) : console.log("" + Il1I1i);
        } else console.log("" + Il1I1i);
        break;
      case "skuVisit":
      case "addSku":
      case "toSign":
        if (typeof Il1I1l == "object") {
          if (Il1I1l.result && Il1I1l.result === true) console.log("任务完成，获得分值：" + Il1I1l.data.addScore);else Il1I1l.errorMessage ? console.log("" + (Il1I1l.errorMessage || "")) : console.log("" + Il1I1i);
        } else {
          console.log("" + Il1I1i);
        }
        break;
      case "checkOpenCard":
        if (typeof Il1I1l == "object") {
          if (Il1I1l.result && Il1I1l.result === true) {
            let IiIil1 = Il1I1l.data.openInfo || [];
            $.openList = [...IiIil1];
            $.allOpenCard = Il1I1l.data.allOpenCard || Il1I1l.data.isOpenCardStatus || false;
            if (Il1I1l.data.beans || Il1I1l.data.addBeanNum) console.log("开卡获得:" + (Il1I1l.data.beans || Il1I1l.data.addBeanNum) + "豆");
          } else Il1I1l.errorMessage ? console.log("" + (Il1I1l.errorMessage || "")) : console.log("" + Il1I1i);
        } else console.log("" + Il1I1i);
        break;
      case "draw":
        if (typeof Il1I1l == "object") {
          if (Il1I1l.result && Il1I1l.result === true) {
            if (typeof Il1I1l.data == "object") {
              drawInfo = Il1I1l.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = Il1I1l.data.addressId;
                  prizeName = drawInfo.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let lIiIlI = await IIIlll("https://lzdz1-isv.isvjcloud.com", Il1iII, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  if (lIiIlI) $.isNode() && (await i11Il1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/feihe/fresh/activity/activity?activityId=" + $.activityId));else {
                    if ($.isNode()) {
                      await i11Il1.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/feihe/fresh/activity/activity?activityId=" + $.activityId);
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
                  $.isNode() && (await i11Il1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/feihe/fresh/activity/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else {
              console.log("" + Il1I1i);
            }
          } else {
            if (Il1I1l.errorMessage) {
              $.runFalag = false;
              console.log("" + (Il1I1l.errorMessage || ""));
            } else {
              console.log("" + Il1I1i);
            }
          }
        } else console.log("" + Il1I1i);
        break;
      case "邀请":
      case "助力":
        if (typeof Il1I1l == "object") {
          if (Il1I1l.data.status == 200) I1IIli == "助力" ? console.log("助力成功") : $.yaoqing = true;else {
            if (Il1I1l.data.status == 105) console.log("已经助力过");else {
              if (Il1I1l.data.status == 104) console.log("已经助力其他人");else {
                if (Il1I1l.data.status == 101) {} else console.log(Il1I1i);
              }
            }
          }
        } else console.log("" + Il1I1i);
      case "getDrawRecordHasCoupon":
        if (typeof Il1I1l == "object") {
          if (Il1I1l.result && Il1I1l.result === true) {
            console.log("我的奖品：");
            for (let III1ii in Il1I1l.data.recordList) {
              let l1I1ii = Il1I1l.data.recordList[III1ii];
              console.log("" + (l1I1ii.infoType != 10 && l1I1ii.value && l1I1ii.value + ":" || "") + l1I1ii.infoName);
            }
          } else Il1I1l.errorMessage ? console.log("" + (Il1I1l.errorMessage || "")) : console.log("" + Il1I1i);
        } else console.log("" + Il1I1i);
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getRankList":
        break;
      default:
        console.log(I1IIli + "-> " + Il1I1i);
    }
    if (typeof Il1I1l == "object") {
      Il1I1l.errorMessage && Il1I1l.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
    }
  } catch (IlIi1i) {
    console.log(IlIi1i);
  }
}
function l1IlIi(lIllii, l1il1, IIiI = "POST") {
  let iiiIiI = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": Il1iII,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lIllii.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (iiiIiI.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/feihe/fresh/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, iiiIiI.Cookie = "" + (Iii1iI && Iii1iI || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + lIi1lI), {
    "url": lIllii,
    "method": IIiI,
    "headers": iiiIiI,
    "body": l1il1,
    "timeout": 30000
  };
}
function l1IlIl() {
  return new Promise(illl1i => {
    let iiiIi1 = {
      "url": "https://lzdz1-isv.isvjd.com/wxCommonInfo/token?t=1690875041251",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": Il1iII,
        "Referer": "https://lzdz1-isv.isvjcloud.com/dingzhi/feihe/fresh/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iiiIi1, async (lill1, IiIIl, IiIIi) => {
      try {
        if (lill1) {
          if (IiIIl && typeof IiIIl.statusCode != "undefined") {
            IiIIl.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(lill1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let l1ill = IiIIi.match(/(活动已经结束)/) && IiIIi.match(/(活动已经结束)/)[1] || "";
          l1ill && ($.activityEnd = true, console.log("活动已结束"));
          liIIli(IiIIl);
        }
      } catch (lIi1I1) {
        $.logErr(lIi1I1, IiIIl);
      } finally {
        illl1i();
      }
    });
  });
}
function liIIli(l1iili) {
  if (l1iili) {
    if (l1iili.headers["set-cookie"]) {
      Il1iII = originCookie + ";";
      for (let Ill1ii of l1iili.headers["set-cookie"]) {
        IIiiil[Ill1ii.split(";")[0].substr(0, Ill1ii.split(";")[0].indexOf("="))] = Ill1ii.split(";")[0].substr(Ill1ii.split(";")[0].indexOf("=") + 1);
      }
      for (const IllII of Object.keys(IIiiil)) {
        Il1iII += IllII + "=" + IIiiil[IllII] + ";";
      }
      lIi1lI = Il1iII;
    }
  }
}
function illiiI(IIlI) {
  return new Promise(IIii => {
    const llIiIl = {
      "url": "" + IIlI,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(llIiIl, async (iiiIil, lilll, l1iilI) => {
      try {
        if (iiiIil) {} else l1iilI ? l1iilI = JSON.parse(l1iilI) : console.log("未获取到数据,请重新运行");
      } catch (Iil11) {
        $.logErr(Iil11, lilll);
        l1iilI = null;
      } finally {
        IIii(l1iilI);
      }
    });
  });
}
function liIl(IIll) {
  IIll = IIll || 32;
  let iiiIll = "abcdef0123456789",
    iilliI = iiiIll.length,
    iII1i = "";
  for (i = 0; i < IIll; i++) iII1i += iiiIll.charAt(Math.floor(Math.random() * iilliI));
  return iII1i;
}
function llli11(ilI1il, i11Il) {
  return Math.floor(Math.random() * (i11Il - ilI1il)) + ilI1il;
}
function Ili11l(Iil1i) {
  if (typeof Iil1i == "string") {
    try {
      return JSON.parse(Iil1i);
    } catch (ilI1i1) {
      return console.log(ilI1i1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}