/*
8.14-8.22 潮流之美  魅力绽放
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 8.14-8.22 潮流之美  魅力绽放 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#8.14-8.22 潮流之美  魅力绽放
11 11 11 11 * jd_opencardL327.js, tag=8.14-8.22 潮流之美  魅力绽放, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('8.14-8.22 潮流之美  魅力绽放')
const iIllI = $.isNode() ? require("./jdCookie.js") : "",
  iIiIl1 = $.isNode() ? require("./sendNotify") : "";
let i1I11I = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  Ii1lli = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const Ii1lll = require("./function/krgetToken"),
  I1IIII = require("./function/krh5st"),
  I1I1 = require("./function/krgetua"),
  Ii1lI = require("./function/krwxSavePrize");
let iIiIlI = "https://lzdz1-isv.isvjcloud.com",
  liII1i = [],
  iIiIil = "",
  iIiIii = {};
if ($.isNode()) {
  Object.keys(iIllI).forEach(lI1I => {
    liII1i.push(iIllI[lI1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else liII1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIll1($.getdata("CookiesJD") || "[]").map(I1Ii => I1Ii.cookie)].filter(I1Il => !!I1Il);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lI1i = "",
  i11 = "",
  Ii1llI = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  i1I11i = "",
  lI1l = "";
$.whitelist = process.env.jd_opencard_whitelist || i1I11i;
$.blacklist = process.env.jd_opencard_blacklist || lI1l;
iIlii();
iIlil();
$.errMsgPin = [];
!(async () => {
  if (Ii1llI === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!liII1i[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await liII1I("http://code.kingran.cf/327.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[iIiIiI(0, authorCodeList.length)];
  } else {
    let I1Il1I = ["fe01e61b62c24f3e86fe2be54a7d97ec", "6b5b4dafb96c4199a64d298f726e414e"];
    $.authorCode = I1Il1I[iIiIiI(0, I1Il1I.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "3e0fed4f4b5348a2b894b4f0009e0c76";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let IIlIil = 0; IIlIil < liII1i.length; IIlIil++) {
    iIiIil = liII1i[IIlIil];
    originCookie = liII1i[IIlIil];
    if (iIiIil) {
      $.UserName = decodeURIComponent(iIiIil.match(/pt_pin=([^; ]+)(?=;?)/) && iIiIil.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIlIil + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await I1I1($.UserName);
      await li11Il();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let i1IlIl = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + i1IlIl;
  }
  if ($.outFlag) {
    let ll1IIi = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + ll1IIi);
    if ($.isNode()) await iIiIl1.sendNotify("" + $.name, "" + ll1IIi);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(ll1IIl => $.logErr(ll1IIl)).finally(() => $.done());
async function li11Il() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lI1i = "";
    $.Token = "";
    $.Pin = "";
    let i1iiIi = false;
    $.Token = await Ii1lll(iIiIil, iIiIlI);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await Ii1ll1();
    if (i11 == "") {
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
    await i1I11l("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await i1I11l("accessLogWithAD");
    await i1I11l("activityContent");
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
    await i1I11l("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await i1I11l("checkOpenCard");
    await i1I11l("taskRecord");
    await $.wait(1000);
    await i1I11l("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          i1iiIi = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await i1I();
          for (let l1II1l = 0; l1II1l < Array(2).length; l1II1l++) {
            if (l1II1l > 0) console.log("第" + l1II1l + "次 重新开卡");
            await l11li1();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await i1I11l("activityContent");
          await i1I11l("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    !$.followShop && !$.outFlag && (console.log(""), await i1I11l("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    Ii1lli && !$.addCart && !$.outFlag && (await i1I11l("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await i1I11l("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await i1I11l("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    i1iiIi && (await i1I11l("activityContent"));
    if (i1I11I + "" !== "0") {
      $.runFalag = true;
      let il1lII = parseInt($.score / 100);
      i1I11I = parseInt(i1I11I, 10);
      if (il1lII > i1I11I) il1lII = i1I11I;
      console.log("已设置抽奖次数为" + il1lII + "次，当前有" + $.score + "金币");
      for (m = 1; il1lII--; m++) {
        console.log("进行第" + m + "次抽奖");
        await i1I11l("startDraw");
        if ($.runFalag == false) break;
        if (Number(il1lII) <= 0) break;
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
    await i1I11l("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (iIi111) {
    console.log(iIi111);
  }
}
async function i1I11l(ii11ii) {
  if ($.outFlag) return;
  let iIl1I1 = "https://lzdz1-isv.isvjcloud.com",
    il1lI1 = "",
    i111li = "POST";
  switch (ii11ii) {
    case "getSimpleActInfoVo":
      url = iIl1I1 + "/dz/common/getSimpleActInfoVo";
      il1lI1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = iIl1I1 + "/customer/getMyPing";
      il1lI1 = "userId=1000090821&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = iIl1I1 + "/common/accessLogWithAD";
      let iiii1l = iIl1I1 + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      il1lI1 = "venderId=1000090821&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iiii1l) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = iIl1I1 + "/wxActionCommon/getUserInfo";
      il1lI1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = iIl1I1 + "/dingzhi/joinCommon/activityContent";
      il1lI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = iIl1I1 + "/dingzhi/joinCommon/drawContent";
      il1lI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = iIl1I1 + "/dingzhi/joinCommon/taskInfo";
      il1lI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = iIl1I1 + "/dingzhi/joinCommon/assist";
      il1lI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = iIl1I1 + "/dingzhi/joinCommon/taskRecord";
      il1lI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = iIl1I1 + "/dingzhi/joinCommon/doTask";
      il1lI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = iIl1I1 + "/dingzhi/joinCommon/doTask";
      il1lI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = iIl1I1 + "/dingzhi/joinCommon/doTask";
      il1lI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = iIl1I1 + "/dingzhi/opencard/" + ii11ii;
      il1lI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (ii11ii == "browseGoods") il1lI1 += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = iIl1I1 + "/dingzhi/opencard/" + ii11ii;
      let lI11I = "",
        iIilIi = "";
      if (ii11ii == "viewVideo") {
        lI11I = 31;
        iIilIi = 31;
      } else {
        if (ii11ii == "visitSku") {
          lI11I = 5;
          iIilIi = $.visitSkuValue || 5;
        } else {
          if (ii11ii == "toShop") {
            lI11I = 14;
            iIilIi = $.toShopValue || 14;
          } else {
            if (ii11ii == "addSku") {
              lI11I = 2;
              iIilIi = $.addSkuValue || 2;
            }
          }
        }
      }
      il1lI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + lI11I + "&taskValue=" + iIilIi;
      break;
    case "drawRecord":
      url = iIl1I1 + "/dingzhi/joinCommon/drawRecord";
      il1lI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = iIl1I1 + "/dingzhi/joinCommon/shareRecord";
      il1lI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = iIl1I1 + "/dingzhi/joinCommon/startDraw";
      il1lI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + ii11ii);
  }
  let I11lli = liII1l(url, il1lI1, i111li);
  return new Promise(async il1Iil => {
    $.post(I11lli, (iI1iIi, iI1iIl, lili1i) => {
      try {
        IIlIlI(iI1iIl);
        if (iI1iIi) {
          iI1iIl && typeof iI1iIl.statusCode != "undefined" && iI1iIl.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n");
          console.log("" + $.toStr(iI1iIi, iI1iIi));
          console.log("API请求失败，请检查网路重试");
        } else IIlIl1(ii11ii, lili1i);
      } catch (IiIIIi) {
        console.log(IiIIIi, iI1iIl);
      } finally {
        il1Iil();
      }
    });
  });
}
async function IIlIl1(i111il, i111ii) {
  let ilI11 = "";
  try {
    (i111il != "accessLogWithAD" || i111il != "drawContent") && i111ii && (ilI11 = JSON.parse(i111ii));
  } catch (iiIIl1) {
    console.log("执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (i111il) {
      case "getSimpleActInfoVo":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            if (typeof ilI11.data.shopId != "undefined") $.shopId = ilI11.data.shopId;
            if (typeof ilI11.data.venderId != "undefined") $.venderId = ilI11.data.venderId;
          } else ilI11.errorMessage ? console.log("" + (ilI11.errorMessage || "")) : console.log("" + i111ii);
        } else console.log("" + i111ii);
        break;
      case "getMyPing":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            if (ilI11.data && typeof ilI11.data.secretPin != "undefined") $.Pin = ilI11.data.secretPin;
            if (ilI11.data && typeof ilI11.data.nickname != "undefined") $.nickname = ilI11.data.nickname;
          } else ilI11.errorMessage ? (console.log("" + (ilI11.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + i111ii);
        } else console.log("" + i111ii);
        break;
      case "getUserInfo":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            if (ilI11.data && typeof ilI11.data.yunMidImageUrl != "undefined") $.attrTouXiang = ilI11.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else ilI11.errorMessage ? console.log("" + (ilI11.errorMessage || "")) : console.log("" + i111ii);
        } else {
          console.log("" + i111ii);
        }
        break;
      case "activityContent":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            $.endTime = ilI11.data.endTime || ilI11.data.activityVo && ilI11.data.activityVo.endTime || ilI11.data.activity.endTime || 0;
            $.hasEnd = ilI11.data.isEnd || false;
            $.score = ilI11.data.actorInfo.score || 0;
            $.actorUuid = ilI11.data.actorInfo.uuid || "";
            $.assistCount = ilI11.data.actorInfo.assistCount || 0;
          } else {
            if (ilI11.errorMessage) console.log("" + (ilI11.errorMessage || ""));else {
              console.log("" + i111ii);
            }
          }
        } else console.log("" + i111ii);
        break;
      case "assist":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            $.assistState = ilI11.data.assistState || 0;
            $.allOpenCard = ilI11.data.openCardInfo.openAll || false;
            $.openVenderId = ilI11.data.openCardInfo.openVenderId || [];
            ilI11?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (ilI11?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else ilI11.errorMessage ? console.log("" + (ilI11.errorMessage || "")) : console.log("" + i111ii);
        } else console.log("" + i111ii);
        break;
      case "taskRecord":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            $.followShop = ilI11.data["20"].recordCount || 0;
            $.addCart = ilI11.data["23"].recordCount || 0;
            $.visitSku = ilI11.data["10"].recordCount || 0;
          } else ilI11.errorMessage ? console.log("" + (ilI11.errorMessage || "")) : console.log("" + i111ii);
        } else console.log("" + i111ii);
        break;
      case "checkOpenCard":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            let IIl1Ii = ilI11.data["10"].settingInfo || [],
              ilIIl = ilI11.data.cardList || [],
              I11ll1 = ilI11.data.openCardList || [];
            $.openList = [...ilIIl, ...IIl1Ii, ...I11ll1];
            $.openCardScore1 = ilI11.data.score1 || 0;
            $.openCardScore2 = ilI11.data.score2 || 0;
            $.drawScore = ilI11.data.drawScore || 0;
            if (ilI11.data.beans || ilI11.data.addBeanNum) console.log("开卡获得：" + (ilI11.data.beans || ilI11.data.addBeanNum) + "京豆 🐶");
          } else {
            if (ilI11.errorMessage) console.log("" + (ilI11.errorMessage || ""));else {
              console.log("" + i111ii);
            }
          }
        } else console.log("" + i111ii);
        break;
      case "addSku":
      case "followShop":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) console.log("完成任务,获得" + (ilI11?.["data"]?.["beans"] || 0) + "京豆, " + (ilI11?.["data"]?.["score"] || 0) + "金币");else ilI11.errorMessage ? console.log("" + (ilI11.errorMessage || "")) : console.log("" + i111ii);
        } else console.log("" + i111ii);
        break;
      case "startDraw":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            if (typeof ilI11.data == "object") {
              drawInfo = ilI11.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = ilI11.data.addressId;
                  prizeName = drawInfo.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let iiI1i = await Ii1lI("https://lzdz1-isv.isvjcloud.com", iIiIil, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  iiI1i ? $.isNode() && (await iIiIl1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await iIiIl1.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await iIiIl1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else console.log("" + i111ii);
          } else ilI11.errorMessage ? ($.runFalag = false, console.log("" + (ilI11.errorMessage || ""))) : console.log("" + i111ii);
        } else console.log("" + i111ii);
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            if (typeof ilI11.data == "object") {
              let Ii11Ii = "",
                Ii11Il = "抽奖";
              ilI11.data.addBeanNum && (Ii11Ii = ilI11.data.addBeanNum + "京豆");
              if (ilI11.data.addPoint) {
                Ii11Ii += " " + ilI11.data.addPoint + "游戏机会";
              }
              if (i111il == "followShop") {
                Ii11Il = "关注";
                ilI11.data.beans != "0" && (Ii11Ii += ilI11.data.beans + "京豆 🐶");
              } else {
                if (i111il == "addSku" || i111il == "addCart") {
                  Ii11Il = "加购";
                  ilI11.data.beans != "0" && (Ii11Ii += ilI11.data.beans + "京豆 🐶");
                } else {
                  if (i111il == "viewVideo") Ii11Il = "热门文章";else {
                    if (i111il == "toShop") Ii11Il = "浏览店铺";else {
                      if (i111il == "visitSku" || i111il == "browseGoods") Ii11Il = "浏览商品";else {
                        if (i111il == "sign") Ii11Il = "签到";else {
                          let I1li1l = typeof ilI11.data.drawOk === "object" && ilI11.data.drawOk || ilI11.data;
                          Ii11Ii = I1li1l.drawOk == true && I1li1l.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !Ii11Ii && (Ii11Ii = "空气 💨");
              console.log(Ii11Il + "获得：" + (Ii11Ii || i111ii));
            } else {
              console.log("" + i111ii);
            }
          } else {
            if (ilI11.errorMessage) {
              $.runFalag = false;
              console.log("" + (ilI11.errorMessage || ""));
            } else console.log("" + i111ii);
          }
        } else console.log("" + i111ii);
        break;
      case "drawRecord":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true) {
            let IIl1I1 = 0;
            for (let I1li1i of ilI11.data) {
              infoType = I1li1i.infoType;
              infoName = I1li1i.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  IIl1I1 += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await iIiIl1.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await iIiIl1.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            IIl1I1 > 0 && console.log("当前累计获得 " + IIl1I1 + " 京豆 🐶");
          } else ilI11.errorMessage ? console.log("" + (ilI11.errorMessage || "")) : console.log("" + i111ii);
        } else console.log("" + i111ii);
        break;
      case "getShareRecord":
        if (typeof ilI11 == "object") {
          if (ilI11.result && ilI11.result === true && ilI11.data) {
            $.ShareCount = ilI11.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else ilI11.errorMessage ? console.log("" + (ilI11.errorMessage || "")) : console.log("" + i111ii);
        } else console.log("" + i111ii);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(i111il + "-> " + i111ii);
    }
    if (typeof ilI11 == "object") {
      ilI11.errorMessage && ilI11.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
    }
  } catch (I11liI) {
    console.log(I11liI);
  }
}
function liII1l(ilIilI, iIlIl1, lli1iI = "POST") {
  let iI1I = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iIiIil,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return ilIilI.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (iI1I.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, iI1I.Cookie = "" + (lI1i && lI1i || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + i11), {
    "url": ilIilI,
    "method": lli1iI,
    "headers": iI1I,
    "body": iIlIl1,
    "timeout": 30000
  };
}
function Ii1ll1() {
  return new Promise(ilIili => {
    let Il1l1l = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(Il1l1l, async (I111Ii, IIlllI, l11Iil) => {
      try {
        if (I111Ii) {
          if (IIlllI && typeof IIlllI.statusCode != "undefined") {}
          console.log("" + $.toStr(I111Ii));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let lli1i1 = l11Iil.match(/(活动已经结束)/) && l11Iil.match(/(活动已经结束)/)[1] || "";
          lli1i1 && ($.activityEnd = true, console.log("活动已结束"));
          IIlIlI(IIlllI);
        }
      } catch (ilIiii) {
        $.logErr(ilIiii, IIlllI);
      } finally {
        ilIili();
      }
    });
  });
}
function IIlIlI(ilIiil) {
  if (ilIiil) {
    if (ilIiil.headers["set-cookie"]) {
      iIiIil = originCookie + ";";
      for (let iI1i of ilIiil.headers["set-cookie"]) {
        iIiIii[iI1i.split(";")[0].substr(0, iI1i.split(";")[0].indexOf("="))] = iI1i.split(";")[0].substr(iI1i.split(";")[0].indexOf("=") + 1);
      }
      for (const liIiii of Object.keys(iIiIii)) {
        iIiIil += liIiii + "=" + iIiIii[liIiii] + ";";
      }
      i11 = iIiIil;
    }
  }
}
function I1III1(IIlliI) {
  IIlliI = IIlliI || 32;
  let iI1l = "abcdef0123456789",
    lIl1I1 = iI1l.length,
    I111I1 = "";
  for (i = 0; i < IIlliI; i++) I111I1 += iI1l.charAt(Math.floor(Math.random() * lIl1I1));
  return I111I1;
}
function iIll1(iiI11I) {
  if (typeof iiI11I == "string") try {
    return JSON.parse(iiI11I);
  } catch (lIi11I) {
    return console.log(lIi11I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function l11li1() {
  if (!$.joinVenderId) return;
  return new Promise(async iiI11i => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIiIlI = "";
    if ($.shopactivityId) IIiIlI = ",\"activityId\":" + $.shopactivityId;
    const ilII1I = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIiIlI + ",\"channel\":406}",
      iiIlI1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ilII1I)
      },
      lli1l1 = await I1IIII("8adfb", iiIlI1),
      lii1l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + ilII1I + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lli1l1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIiIil,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lii1l, async (lii1i, lliIl, lliIi) => {
      try {
        if (lii1i) {
          if (lliIl && typeof lliIl.statusCode != "undefined") {
            lliIl.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          lliIi = lliIi && lliIi.match(/jsonp_.*?\((.*?)\);/) && lliIi.match(/jsonp_.*?\((.*?)\);/)[1] || lliIi;
          let l11l1 = $.toObj(lliIi, lliIi);
          if (l11l1 && typeof l11l1 == "object") {
            if (l11l1 && l11l1.success === true) {
              console.log(" >> " + l11l1.message);
              $.errorJoinShop = l11l1.message;
              if (l11l1.result && l11l1.result.giftInfo) for (let l11lI of l11l1.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + l11lI.discountString + l11lI.prizeName + l11lI.secondLineDesc);
              }
            } else l11l1 && typeof l11l1 == "object" && l11l1.message ? ($.errorJoinShop = l11l1.message, console.log("" + (l11l1.message || ""))) : console.log(lliIi);
          } else console.log(lliIi);
        }
      } catch (I1II1l) {
        $.logErr(I1II1l, lliIl);
      } finally {
        iiI11i();
      }
    });
  });
}
async function i1I() {
  return new Promise(async iiIlIl => {
    const iIlIli = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iIlIll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIlIli)
      },
      il11I1 = await I1IIII("8adfb", iIlIll),
      lll1i1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iIlIli + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(il11I1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIiIil,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lll1i1, async (i11llI, iIIi1, iIiIIl) => {
      try {
        if (i11llI) iIIi1 && typeof iIIi1.statusCode != "undefined" && iIIi1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iIiIIl = iIiIIl && iIiIIl.match(/jsonp_.*?\((.*?)\);/) && iIiIIl.match(/jsonp_.*?\((.*?)\);/)[1] || iIiIIl;
          let iIiIIi = $.toObj(iIiIIl, iIiIIl);
          iIiIIi && typeof iIiIIi == "object" ? iIiIIi && iIiIIi.success == true && (console.log("去加入：" + (iIiIIi.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = iIiIIi.result.interestsRuleList && iIiIIi.result.interestsRuleList[0] && iIiIIi.result.interestsRuleList[0].interestsInfo && iIiIIi.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iIiIIl);
        }
      } catch (IlIill) {
        $.logErr(IlIill, iIIi1);
      } finally {
        iiIlIl();
      }
    });
  });
}
function liII1I(IlIili) {
  return new Promise(lIIli1 => {
    const i11ll1 = {
      "url": "" + IlIili,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i11ll1, async (iIlIl, iIlIi, iIl111) => {
      try {
        if (iIlIl) {} else iIl111 ? iIl111 = JSON.parse(iIl111) : console.log("未获取到数据,请重新运行");
      } catch (i11lii) {
        $.logErr(i11lii, iIlIi);
        iIl111 = null;
      } finally {
        lIIli1(iIl111);
      }
    });
  });
}
function iIiIiI(iiI1II, iIl11I) {
  return Math.floor(Math.random() * (iIl11I - iiI1II)) + iiI1II;
}
function iIlil() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iiI1Il = Array.from(new Set($.blacklist.split("&")));
  console.log(iiI1Il.join("&") + "\n");
  let iiI1Ii = iiI1Il,
    Il1i1 = [],
    IlIiil = false;
  for (let iI11i = 0; iI11i < liII1i.length; iI11i++) {
    let ilIIII = decodeURIComponent(liII1i[iI11i].match(/pt_pin=([^; ]+)(?=;?)/) && liII1i[iI11i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ilIIII) break;
    let I1li = false;
    for (let iIllIi of iiI1Ii) {
      if (iIllIi && iIllIi == ilIIII) {
        I1li = true;
        break;
      }
    }
    !I1li && (IlIiil = true, Il1i1.splice(iI11i, -1, liII1i[iI11i]));
  }
  if (IlIiil) liII1i = Il1i1;
}
function lIiII1(lll1l1, llili1) {
  if (llili1 != 0) {
    lll1l1.unshift(lll1l1.splice(llili1, 1)[0]);
  }
}
function iIlii() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(liII1i, liII1i));
    return;
  }
  console.log("当前已设置白名单：");
  const iilI1l = Array.from(new Set($.whitelist.split("&")));
  console.log(iilI1l.join("&") + "\n");
  let iI11I = [],
    I1IilI = iilI1l;
  for (let IIllll in liII1i) {
    let I1Iil1 = decodeURIComponent(liII1i[IIllll].match(/pt_pin=([^; ]+)(?=;?)/) && liII1i[IIllll].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    I1IilI.includes(I1Iil1) && iI11I.push(liII1i[IIllll]);
  }
  helpCookiesArr = iI11I;
  if (I1IilI.length > 1) {
    for (let lli11 in I1IilI) {
      let lIIlil = I1IilI[I1IilI.length - 1 - lli11];
      if (!lIIlil) continue;
      for (let l1I111 in helpCookiesArr) {
        let lIIlii = decodeURIComponent(helpCookiesArr[l1I111].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[l1I111].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        lIIlil == lIIlii && lIiII1(helpCookiesArr, l1I111);
      }
    }
  }
}
