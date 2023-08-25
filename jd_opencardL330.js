/*
8.25-9.1 初秋焕新风 品质体验潮
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 8.25-9.1 初秋焕新风 品质体验潮 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#8.25-9.1 初秋焕新风 品质体验潮
11 11 11 11 * jd_opencardL330.js, tag=8.25-9.1 初秋焕新风 品质体验潮, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('8.25-9.1 初秋焕新风 品质体验潮')
const IIlIli = $.isNode() ? require("./jdCookie.js") : "",
  IIlIll = $.isNode() ? require("./sendNotify") : "";
let l11liI = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  li11Ii = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const lIiIII = require("./function/krgetToken"),
  i1i = require("./function/krh5st"),
  I1Il1l = require("./function/krgetua"),
  I1Il1i = require("./function/wxSavePrize");
let i1l = "https://lzdz1-isv.isvjcloud.com",
  IlIiII = [],
  iIliI = "",
  i1IlII = {};
if ($.isNode()) {
  Object.keys(IIlIli).forEach(iIllii => {
    IlIiII.push(IIlIli[iIllii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IlIiII = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1IlIi($.getdata("CookiesJD") || "[]").map(iIllil => iIllil.cookie)].filter(l11lli => !!l11lli);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let ilIii1 = "",
  ll1III = "",
  ll1II1 = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  l11lii = "",
  IIlIii = "";
$.whitelist = process.env.jd_opencard_whitelist || l11lii;
$.blacklist = process.env.jd_opencard_blacklist || IIlIii;
iIli1();
l11ll1();
$.errMsgPin = [];
!(async () => {
  if (ll1II1 === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!IlIiII[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await IlIiI1("http://code.kingran.cf/330.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[ll1IIl(0, authorCodeList.length)];else {
    let lIil1l = ["8d9034d7ea3c46f3a8c7b6d14fe0f7d6", "da82d7588f51472395acf5f81775c0e0"];
    $.authorCode = lIil1l[ll1IIl(0, lIil1l.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "ba9198801eb04fe29d1e4ddf76db131d";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let l1II1i = 0; l1II1i < IlIiII.length; l1II1i++) {
    iIliI = IlIiII[l1II1i];
    originCookie = IlIiII[l1II1i];
    if (iIliI) {
      $.UserName = decodeURIComponent(iIliI.match(/pt_pin=([^; ]+)(?=;?)/) && iIliI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1II1i + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await I1Il1l($.UserName);
      await l11lil();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let lili11 = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + lili11;
  }
  if ($.outFlag) {
    let lIllIi = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + lIllIi);
    if ($.isNode()) await IIlIll.sendNotify("" + $.name, "" + lIllIi);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(lIllIl => $.logErr(lIllIl)).finally(() => $.done());
async function l11lil() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    ilIii1 = "";
    $.Token = "";
    $.Pin = "";
    let lili1l = false;
    $.Token = await lIiIII(iIliI, i1l);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await I1Il1I();
    if (ll1III == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请更换IP后再执行脚本\n");
      return;
    }
    await iIllli("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await iIllli("accessLogWithAD");
    await iIllli("activityContent");
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
    await iIllli("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await iIllli("checkOpenCard");
    await iIllli("taskRecord");
    await $.wait(1000);
    await iIllli("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          lili1l = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await ll1IIi();
          for (let iI1Il = 0; iI1Il < Array(2).length; iI1Il++) {
            if (iI1Il > 0) console.log("第" + iI1Il + "次 重新开卡");
            await i1IlIl();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await iIllli("activityContent");
          await iIllli("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    !$.followShop && !$.outFlag && (console.log(""), await iIllli("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    if (li11Ii) {
      if (!$.addCart && !$.outFlag) {
        await iIllli("addCart");
        await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
      }
    }
    console.log("去助力 -> " + $.shareUuid);
    await iIllli("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await iIllli("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    lili1l && (await iIllli("activityContent"));
    if (l11liI + "" !== "0") {
      $.runFalag = true;
      let lIil11 = parseInt($.score / 100);
      l11liI = parseInt(l11liI, 10);
      if (lIil11 > l11liI) lIil11 = l11liI;
      console.log("已设置抽奖次数为" + lIil11 + "次，当前有" + $.score + "金币");
      for (m = 1; lIil11--; m++) {
        console.log("进行第" + m + "次抽奖");
        await iIllli("startDraw");
        if ($.runFalag == false) break;
        if (Number(lIil11) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    }
    if ($.outFlag) {
      console.log("🚫 此ip已被限制，请更换IP后再执行脚本\n");
      return;
    }
    console.log("\n当前已邀请" + $.assistCount + "人");
    await iIllli("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (lIllI1) {
    console.log(lIllI1);
  }
}
async function iIllli(Ill1) {
  if ($.outFlag) return;
  let il1IiI = "https://lzdz1-isv.isvjcloud.com",
    il1Ii1 = "",
    lI1i1l = "POST";
  switch (Ill1) {
    case "getSimpleActInfoVo":
      url = il1IiI + "/dz/common/getSimpleActInfoVo", il1Ii1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = il1IiI + "/customer/getMyPing", il1Ii1 = "userId=1000003829&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = il1IiI + "/common/accessLogWithAD";
      let iiiiII = il1IiI + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      il1Ii1 = "venderId=1000003829&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iiiiII) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = il1IiI + "/wxActionCommon/getUserInfo", il1Ii1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = il1IiI + "/dingzhi/joinCommon/activityContent", il1Ii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = il1IiI + "/dingzhi/joinCommon/drawContent", il1Ii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = il1IiI + "/dingzhi/joinCommon/taskInfo", il1Ii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = il1IiI + "/dingzhi/joinCommon/assist", il1Ii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = il1IiI + "/dingzhi/joinCommon/taskRecord", il1Ii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = il1IiI + "/dingzhi/joinCommon/doTask", il1Ii1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = il1IiI + "/dingzhi/joinCommon/doTask", il1Ii1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = il1IiI + "/dingzhi/joinCommon/doTask", il1Ii1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = il1IiI + "/dingzhi/opencard/" + Ill1, il1Ii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (Ill1 == "browseGoods") il1Ii1 += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = il1IiI + "/dingzhi/opencard/" + Ill1;
      let ll1I1l = "",
        iilI = "";
      if (Ill1 == "viewVideo") ll1I1l = 31, iilI = 31;else {
        if (Ill1 == "visitSku") ll1I1l = 5, iilI = $.visitSkuValue || 5;else {
          if (Ill1 == "toShop") ll1I1l = 14, iilI = $.toShopValue || 14;else Ill1 == "addSku" && (ll1I1l = 2, iilI = $.addSkuValue || 2);
        }
      }
      il1Ii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + ll1I1l + "&taskValue=" + iilI;
      break;
    case "drawRecord":
      url = il1IiI + "/dingzhi/joinCommon/drawRecord", il1Ii1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = il1IiI + "/dingzhi/joinCommon/shareRecord", il1Ii1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = il1IiI + "/dingzhi/joinCommon/startDraw", il1Ii1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + Ill1);
  }
  let iI1II = ilIiiI(url, il1Ii1, lI1i1l);
  return new Promise(async iil1 => {
    $.post(iI1II, (ill1I, ilII1l, IIilII) => {
      try {
        IIlIil(ilII1l);
        ill1I ? (ilII1l && typeof ilII1l.statusCode != "undefined" && ilII1l.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n"), console.log("" + $.toStr(ill1I, ill1I)), console.log("API请求失败，请检查网路重试")) : iIlll1(Ill1, IIilII);
      } catch (iiiiI1) {
        console.log(iiiiI1, ilII1l);
      } finally {
        iil1();
      }
    });
  });
}
async function iIlll1(IIiIi, i1ii1i) {
  let iiil = "";
  try {
    if (IIiIi != "accessLogWithAD" || IIiIi != "drawContent") {
      if (i1ii1i) {
        iiil = JSON.parse(i1ii1i);
      }
    }
  } catch (lII1) {
    console.log("执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (IIiIi) {
      case "getSimpleActInfoVo":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) {
            if (typeof iiil.data.shopId != "undefined") $.shopId = iiil.data.shopId;
            if (typeof iiil.data.venderId != "undefined") $.venderId = iiil.data.venderId;
          } else iiil.errorMessage ? console.log("" + (iiil.errorMessage || "")) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "getMyPing":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) {
            if (iiil.data && typeof iiil.data.secretPin != "undefined") $.Pin = iiil.data.secretPin;
            if (iiil.data && typeof iiil.data.nickname != "undefined") $.nickname = iiil.data.nickname;
          } else iiil.errorMessage ? (console.log("" + (iiil.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "getUserInfo":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) {
            if (iiil.data && typeof iiil.data.yunMidImageUrl != "undefined") $.attrTouXiang = iiil.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else iiil.errorMessage ? console.log("" + (iiil.errorMessage || "")) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "activityContent":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) {
            $.endTime = iiil.data.endTime || iiil.data.activityVo && iiil.data.activityVo.endTime || iiil.data.activity.endTime || 0;
            $.hasEnd = iiil.data.isEnd || false;
            $.score = iiil.data.actorInfo.score || 0;
            $.actorUuid = iiil.data.actorInfo.uuid || "";
            $.assistCount = iiil.data.actorInfo.assistCount || 0;
          } else iiil.errorMessage ? console.log("" + (iiil.errorMessage || "")) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "assist":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) $.assistState = iiil.data.assistState || 0, $.allOpenCard = iiil.data.openCardInfo.openAll || false, $.openVenderId = iiil.data.openCardInfo.openVenderId || [], iiil?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (iiil?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");else iiil.errorMessage ? console.log("" + (iiil.errorMessage || "")) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "taskRecord":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) $.followShop = iiil.data["20"].recordCount || 0, $.addCart = iiil.data["23"].recordCount || 0, $.visitSku = iiil.data["10"].recordCount || 0;else iiil.errorMessage ? console.log("" + (iiil.errorMessage || "")) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "checkOpenCard":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) {
            let IIlli1 = iiil.data["10"].settingInfo || [],
              ilIiii = iiil.data.cardList || [],
              ilIiil = iiil.data.openCardList || [];
            $.openList = [...ilIiii, ...IIlli1, ...ilIiil];
            $.openCardScore1 = iiil.data.score1 || 0;
            $.openCardScore2 = iiil.data.score2 || 0;
            $.drawScore = iiil.data.drawScore || 0;
            if (iiil.data.beans || iiil.data.addBeanNum) console.log("开卡获得：" + (iiil.data.beans || iiil.data.addBeanNum) + "京豆 🐶");
          } else iiil.errorMessage ? console.log("" + (iiil.errorMessage || "")) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "addSku":
      case "followShop":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) console.log("完成任务,获得" + (iiil?.["data"]?.["beans"] || 0) + "京豆, " + (iiil?.["data"]?.["score"] || 0) + "金币");else {
            if (iiil.errorMessage) {
              console.log("" + (iiil.errorMessage || ""));
            } else console.log("" + i1ii1i);
          }
        } else console.log("" + i1ii1i);
        break;
      case "startDraw":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) {
            if (typeof iiil.data == "object") {
              drawInfo = iiil.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = iiil.data.addressId, prizeName = drawInfo.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let l11Il1 = await I1Il1i("https://lzdz1-isv.isvjcloud.com", iIliI, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  l11Il1 ? $.isNode() && (await IIlIll.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await IIlIll.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await IIlIll.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else console.log("" + i1ii1i);
          } else {
            if (iiil.errorMessage) {
              $.runFalag = false;
              console.log("" + (iiil.errorMessage || ""));
            } else console.log("" + i1ii1i);
          }
        } else {
          console.log("" + i1ii1i);
        }
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) {
            if (typeof iiil.data == "object") {
              let liIiii = "",
                l11Ill = "抽奖";
              iiil.data.addBeanNum && (liIiii = iiil.data.addBeanNum + "京豆");
              iiil.data.addPoint && (liIiii += " " + iiil.data.addPoint + "游戏机会");
              if (IIiIi == "followShop") l11Ill = "关注", iiil.data.beans != "0" && (liIiii += iiil.data.beans + "京豆 🐶");else {
                if (IIiIi == "addSku" || IIiIi == "addCart") {
                  l11Ill = "加购";
                  iiil.data.beans != "0" && (liIiii += iiil.data.beans + "京豆 🐶");
                } else {
                  if (IIiIi == "viewVideo") l11Ill = "热门文章";else {
                    if (IIiIi == "toShop") l11Ill = "浏览店铺";else {
                      if (IIiIi == "visitSku" || IIiIi == "browseGoods") l11Ill = "浏览商品";else {
                        if (IIiIi == "sign") {
                          l11Ill = "签到";
                        } else {
                          let iiill = typeof iiil.data.drawOk === "object" && iiil.data.drawOk || iiil.data;
                          liIiii = iiill.drawOk == true && iiill.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !liIiii && (liIiii = "空气 💨");
              console.log(l11Ill + "获得：" + (liIiii || i1ii1i));
            } else console.log("" + i1ii1i);
          } else iiil.errorMessage ? ($.runFalag = false, console.log("" + (iiil.errorMessage || ""))) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "drawRecord":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true) {
            let llIi1l = 0;
            for (let l11i1 of iiil.data) {
              infoType = l11i1.infoType;
              infoName = l11i1.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", "")), llIi1l += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~"), await IIlIll.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName), await IIlIll.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            llIi1l > 0 && console.log("当前累计获得 " + llIi1l + " 京豆 🐶");
          } else iiil.errorMessage ? console.log("" + (iiil.errorMessage || "")) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "getShareRecord":
        if (typeof iiil == "object") {
          if (iiil.result && iiil.result === true && iiil.data) $.ShareCount = iiil.data.shareList.length, $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");else iiil.errorMessage ? console.log("" + (iiil.errorMessage || "")) : console.log("" + i1ii1i);
        } else console.log("" + i1ii1i);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IIiIi + "-> " + i1ii1i);
    }
    typeof iiil == "object" && iiil.errorMessage && iiil.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (lli1ll) {
    console.log(lli1ll);
  }
}
function ilIiiI(lli1li, ll1I, Ii1lii = "POST") {
  let liIili = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iIliI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lli1li.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (liIili.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, liIili.Cookie = "" + (ilIii1 && ilIii1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + ll1III), {
    "url": lli1li,
    "method": Ii1lii,
    "headers": liIili,
    "body": ll1I,
    "timeout": 30000
  };
}
function I1Il1I() {
  return new Promise(l11il => {
    let Ii1liI = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(Ii1liI, async (liIilI, Ii1li1, iiil1) => {
      try {
        if (liIilI) {
          if (Ii1li1 && typeof Ii1li1.statusCode != "undefined") {}
          console.log("" + $.toStr(liIilI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let ilII1I = iiil1.match(/(活动已经结束)/) && iiil1.match(/(活动已经结束)/)[1] || "";
          ilII1I && ($.activityEnd = true, console.log("活动已结束"));
          IIlIil(Ii1li1);
        }
      } catch (lli1l1) {
        $.logErr(lli1l1, Ii1li1);
      } finally {
        l11il();
      }
    });
  });
}
function IIlIil(lii1i) {
  if (lii1i) {
    if (lii1i.headers["set-cookie"]) {
      iIliI = originCookie + ";";
      for (let l11lI of lii1i.headers["set-cookie"]) {
        i1IlII[l11lI.split(";")[0].substr(0, l11lI.split(";")[0].indexOf("="))] = l11lI.split(";")[0].substr(l11lI.split(";")[0].indexOf("=") + 1);
      }
      for (const Il1l11 of Object.keys(i1IlII)) {
        iIliI += Il1l11 + "=" + i1IlII[Il1l11] + ";";
      }
      ll1III = iIliI;
    }
  }
}
function l11llI(lli1ii) {
  lli1ii = lli1ii || 32;
  let lli1il = "abcdef0123456789",
    lii1I = lli1il.length,
    IIiIiI = "";
  for (i = 0; i < lli1ii; i++) IIiIiI += lli1il.charAt(Math.floor(Math.random() * lii1I));
  return IIiIiI;
}
function i1IlIi(iIlIli) {
  if (typeof iIlIli == "string") {
    try {
      return JSON.parse(iIlIli);
    } catch (I1Iiil) {
      return console.log(I1Iiil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function i1IlIl() {
  if (!$.joinVenderId) return;
  return new Promise(async iI1i11 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I1l1 = "";
    if ($.shopactivityId) I1l1 = ",\"activityId\":" + $.shopactivityId;
    const Il11I1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I1l1 + ",\"channel\":406}",
      i11liI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il11I1)
      },
      iilI11 = await i1i("8adfb", i11liI),
      lIiiiI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Il11I1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iilI11),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIliI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIiiiI, async (iiI1Il, iiI1Ii, Il1i1) => {
      try {
        if (iiI1Il) iiI1Ii && typeof iiI1Ii.statusCode != "undefined" && iiI1Ii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          Il1i1 = Il1i1 && Il1i1.match(/jsonp_.*?\((.*?)\);/) && Il1i1.match(/jsonp_.*?\((.*?)\);/)[1] || Il1i1;
          let lliliI = $.toObj(Il1i1, Il1i1);
          if (lliliI && typeof lliliI == "object") {
            if (lliliI && lliliI.success === true) {
              console.log(" >> " + lliliI.message);
              $.errorJoinShop = lliliI.message;
              if (lliliI.result && lliliI.result.giftInfo) for (let ll1iiI of lliliI.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + ll1iiI.discountString + ll1iiI.prizeName + ll1iiI.secondLineDesc);
              }
            } else lliliI && typeof lliliI == "object" && lliliI.message ? ($.errorJoinShop = lliliI.message, console.log("" + (lliliI.message || ""))) : console.log(Il1i1);
          } else console.log(Il1i1);
        }
      } catch (iI11i) {
        $.logErr(iI11i, iiI1Ii);
      } finally {
        iI1i11();
      }
    });
  });
}
async function ll1IIi() {
  return new Promise(async IiIlI1 => {
    const iI11I = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      I1IilI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iI11I)
      },
      iIllII = await i1i("8adfb", I1IilI),
      lli1I = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iI11I + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIllII),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIliI,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lli1I, async (lll1il, lll1ii, lIIllI) => {
      try {
        if (lll1il) lll1ii && typeof lll1ii.statusCode != "undefined" && lll1ii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lIIllI = lIIllI && lIIllI.match(/jsonp_.*?\((.*?)\);/) && lIIllI.match(/jsonp_.*?\((.*?)\);/)[1] || lIIllI;
          let lIIll1 = $.toObj(lIIllI, lIIllI);
          if (lIIll1 && typeof lIIll1 == "object") lIIll1 && lIIll1.success == true && (console.log("去加入：" + (lIIll1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = lIIll1.result.interestsRuleList && lIIll1.result.interestsRuleList[0] && lIIll1.result.interestsRuleList[0].interestsInfo && lIIll1.result.interestsRuleList[0].interestsInfo.activityId || "");else {
            console.log(lIIllI);
          }
        }
      } catch (IiI11l) {
        $.logErr(IiI11l, lll1ii);
      } finally {
        IiIlI1();
      }
    });
  });
}
function IlIiI1(IiI11i) {
  return new Promise(lll1iI => {
    const iIllI1 = {
      "url": "" + IiI11i,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iIllI1, async (lli11, IlIil1, lIIlil) => {
      try {
        if (lli11) {} else lIIlil ? lIIlil = JSON.parse(lIIlil) : console.log("未获取到数据,请重新运行");
      } catch (lIIlii) {
        $.logErr(lIIlii, IlIil1);
        lIIlil = null;
      } finally {
        lll1iI(lIIlil);
      }
    });
  });
}
function ll1IIl(Il1iI, iI1i1i) {
  return Math.floor(Math.random() * (iI1i1i - Il1iI)) + Il1iI;
}
function l11ll1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const llilll = Array.from(new Set($.blacklist.split("&")));
  console.log(llilll.join("&") + "\n");
  let ll1ill = llilll,
    l1liI = [],
    llilli = false;
  for (let Il1l1 = 0; Il1l1 < IlIiII.length; Il1l1++) {
    let l1lii = decodeURIComponent(IlIiII[Il1l1].match(/pt_pin=([^; ]+)(?=;?)/) && IlIiII[Il1l1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!l1lii) break;
    let llillI = false;
    for (let l1ii1I of ll1ill) {
      if (l1ii1I && l1ii1I == l1lii) {
        llillI = true;
        break;
      }
    }
    !llillI && (llilli = true, l1liI.splice(Il1l1, -1, IlIiII[Il1l1]));
  }
  if (llilli) IlIiII = l1liI;
}
function iIlllI(I11Iil, l1liI1) {
  l1liI1 != 0 && I11Iil.unshift(I11Iil.splice(l1liI1, 1)[0]);
}
function iIli1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(IlIiII, IlIiII));
    return;
  }
  console.log("当前已设置白名单：");
  const l1ll1 = Array.from(new Set($.whitelist.split("&")));
  console.log(l1ll1.join("&") + "\n");
  let llill1 = [],
    Iill1 = l1ll1;
  for (let illi1l in IlIiII) {
    let lll1li = decodeURIComponent(IlIiII[illi1l].match(/pt_pin=([^; ]+)(?=;?)/) && IlIiII[illi1l].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    Iill1.includes(lll1li) && llill1.push(IlIiII[illi1l]);
  }
  helpCookiesArr = llill1;
  if (Iill1.length > 1) {
    for (let l1ii1l in Iill1) {
      let l111ll = Iill1[Iill1.length - 1 - l1ii1l];
      if (!l111ll) continue;
      for (let l1liIi in helpCookiesArr) {
        let I11Ii1 = decodeURIComponent(helpCookiesArr[l1liIi].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[l1liIi].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        l111ll == I11Ii1 && iIlllI(helpCookiesArr, l1liIi);
      }
    }
  }
}