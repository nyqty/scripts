/*
8.4-8.11 清凉一夏 健康生活
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 8.4-8.11 清凉一夏 健康生活 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:33 2 4-10/2 8 *
============Quantumultx===============
[task_local]
#8.4-8.11 清凉一夏 健康生活
33 2 4-10/2 8 * jd_opencardL321.js, tag=8.4-8.11 清凉一夏 健康生活, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('8.4-8.11 清凉一夏 健康生活')
const l11li1 = $.isNode() ? require("./jdCookie.js") : "",
  i1I = $.isNode() ? require("./sendNotify") : "";
let liII1I = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  iIiIiI = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const iIlil = require("./function/krgetToken"),
  lIiII1 = require("./function/krh5st"),
  iIlii = require("./function/krgetua"),
  lI1I = require("./function/krwxSavePrize");
let I1Ii = "https://lzdz1-isv.isvjcloud.com",
  I1Il = [],
  l1li1i = "",
  l1li1l = {};
if ($.isNode()) {
  Object.keys(l11li1).forEach(l11lil => {
    I1Il.push(l11li1[l11lil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1Il = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IlIiII($.getdata("CookiesJD") || "[]").map(iIllli => iIllli.cookie)].filter(iIlll1 => !!iIlll1);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let il1Ill = "",
  il1Ili = "",
  i1IlI1 = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  IIlIli = "",
  IIlIll = "";
$.whitelist = process.env.jd_opencard_whitelist || IIlIli;
$.blacklist = process.env.jd_opencard_blacklist || IIlIll;
IIlIii();
ll1II1();
$.errMsgPin = [];
!(async () => {
  if (i1IlI1 === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!I1Il[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await ilIii1("http://code.kingran.cf/321.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[ll1III(0, authorCodeList.length)];
  } else {
    let iIilI1 = ["f5d30f0df94b4987a54c97725488ec17", "3fd75f338c4d44309086d63ee6722feb", "4f5532fcb2ef4077987cda94116f8024"];
    $.authorCode = iIilI1[ll1III(0, iIilI1.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "051634080e3a46eb8c3c0b3400ee6836";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let i1IIiI = 0; i1IIiI < I1Il.length; i1IIiI++) {
    l1li1i = I1Il[i1IIiI];
    originCookie = I1Il[i1IIiI];
    if (l1li1i) {
      $.UserName = decodeURIComponent(l1li1i.match(/pt_pin=([^; ]+)(?=;?)/) && l1li1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1IIiI + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await iIlii($.UserName);
      await l11liI();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let IiIII1 = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + IiIII1;
  }
  if ($.outFlag) {
    let I1II1 = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + I1II1);
    if ($.isNode()) await i1I.sendNotify("" + $.name, "" + I1II1);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(lIil1i => $.logErr(lIil1i)).finally(() => $.done());
async function l11liI() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    il1Ill = "";
    $.Token = "";
    $.Pin = "";
    let li1liI = false;
    $.Token = await iIlil(l1li1i, I1Ii);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await I1Il1l();
    if (il1Ili == "") {
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
    await li11Ii("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await li11Ii("accessLogWithAD");
    await li11Ii("activityContent");
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
    await li11Ii("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await li11Ii("checkOpenCard");
    await li11Ii("taskRecord");
    await $.wait(1000);
    await li11Ii("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          li1liI = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await i1IlII();
          for (let iiliIi = 0; iiliIi < Array(2).length; iiliIi++) {
            if (iiliIi > 0) console.log("第" + iiliIi + "次 重新开卡");
            await iIliI();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await li11Ii("activityContent");
          await li11Ii("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    if (!$.followShop && !$.outFlag) {
      console.log("");
      await li11Ii("followShop");
      await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
    }
    iIiIiI && !$.addCart && !$.outFlag && (await li11Ii("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await li11Ii("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await li11Ii("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    li1liI && (await li11Ii("activityContent"));
    if (liII1I + "" !== "0") {
      $.runFalag = true;
      let lI11I = parseInt($.score / 100);
      liII1I = parseInt(liII1I, 10);
      if (lI11I > liII1I) lI11I = liII1I;
      console.log("已设置抽奖次数为" + lI11I + "次，当前有" + $.score + "金币");
      for (m = 1; lI11I--; m++) {
        console.log("进行第" + m + "次抽奖");
        await li11Ii("startDraw");
        if ($.runFalag == false) break;
        if (Number(lI11I) <= 0) break;
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
    await li11Ii("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (il1Iil) {
    console.log(il1Iil);
  }
}
async function li11Ii(lili1l) {
  if ($.outFlag) return;
  let iI1iIl = "https://lzdz1-isv.isvjcloud.com",
    lili1i = "",
    iI1Ii = "POST";
  switch (lili1l) {
    case "getSimpleActInfoVo":
      url = iI1iIl + "/dz/common/getSimpleActInfoVo";
      lili1i = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = iI1iIl + "/customer/getMyPing";
      lili1i = "userId=1000090821&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = iI1iIl + "/common/accessLogWithAD";
      let iiiI = iI1iIl + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      lili1i = "venderId=1000090821&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iiiI) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = iI1iIl + "/wxActionCommon/getUserInfo";
      lili1i = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = iI1iIl + "/dingzhi/joinCommon/activityContent";
      lili1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = iI1iIl + "/dingzhi/joinCommon/drawContent";
      lili1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = iI1iIl + "/dingzhi/joinCommon/taskInfo";
      lili1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = iI1iIl + "/dingzhi/joinCommon/assist";
      lili1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = iI1iIl + "/dingzhi/joinCommon/taskRecord";
      lili1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = iI1iIl + "/dingzhi/joinCommon/doTask";
      lili1i = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = iI1iIl + "/dingzhi/joinCommon/doTask";
      lili1i = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = iI1iIl + "/dingzhi/joinCommon/doTask";
      lili1i = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = iI1iIl + "/dingzhi/opencard/" + lili1l;
      lili1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (lili1l == "browseGoods") lili1i += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = iI1iIl + "/dingzhi/opencard/" + lili1l;
      let I1li11 = "",
        II1iIl = "";
      if (lili1l == "viewVideo") {
        I1li11 = 31;
        II1iIl = 31;
      } else {
        if (lili1l == "visitSku") {
          I1li11 = 5;
          II1iIl = $.visitSkuValue || 5;
        } else {
          if (lili1l == "toShop") {
            I1li11 = 14;
            II1iIl = $.toShopValue || 14;
          } else lili1l == "addSku" && (I1li11 = 2, II1iIl = $.addSkuValue || 2);
        }
      }
      lili1i = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + I1li11 + "&taskValue=" + II1iIl;
      break;
    case "drawRecord":
      url = iI1iIl + "/dingzhi/joinCommon/drawRecord";
      lili1i = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = iI1iIl + "/dingzhi/joinCommon/shareRecord";
      lili1i = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = iI1iIl + "/dingzhi/joinCommon/startDraw";
      lili1i = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + lili1l);
  }
  let IiIIIi = i1i(url, lili1i, iI1Ii);
  return new Promise(async Ii11I1 => {
    $.post(IiIIIi, (li1IiI, Illl, Illi) => {
      try {
        I1Il1i(Illl);
        if (li1IiI) {
          if (Illl && typeof Illl.statusCode != "undefined") {
            Illl.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n");
          }
          console.log("" + $.toStr(li1IiI, li1IiI));
          console.log("API请求失败，请检查网路重试");
        } else lIiIII(lili1l, Illi);
      } catch (li1Ii1) {
        console.log(li1Ii1, Illl);
      } finally {
        Ii11I1();
      }
    });
  });
}
async function lIiIII(i1ii11, iii1) {
  let ill1l = "";
  try {
    (i1ii11 != "accessLogWithAD" || i1ii11 != "drawContent") && iii1 && (ill1l = JSON.parse(iii1));
  } catch (IIllii) {
    console.log("执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (i1ii11) {
      case "getSimpleActInfoVo":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            if (typeof ill1l.data.shopId != "undefined") $.shopId = ill1l.data.shopId;
            if (typeof ill1l.data.venderId != "undefined") $.venderId = ill1l.data.venderId;
          } else ill1l.errorMessage ? console.log("" + (ill1l.errorMessage || "")) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "getMyPing":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            if (ill1l.data && typeof ill1l.data.secretPin != "undefined") $.Pin = ill1l.data.secretPin;
            if (ill1l.data && typeof ill1l.data.nickname != "undefined") $.nickname = ill1l.data.nickname;
          } else ill1l.errorMessage ? (console.log("" + (ill1l.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "getUserInfo":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            if (ill1l.data && typeof ill1l.data.yunMidImageUrl != "undefined") $.attrTouXiang = ill1l.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else ill1l.errorMessage ? console.log("" + (ill1l.errorMessage || "")) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "activityContent":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            $.endTime = ill1l.data.endTime || ill1l.data.activityVo && ill1l.data.activityVo.endTime || ill1l.data.activity.endTime || 0;
            $.hasEnd = ill1l.data.isEnd || false;
            $.score = ill1l.data.actorInfo.score || 0;
            $.actorUuid = ill1l.data.actorInfo.uuid || "";
            $.assistCount = ill1l.data.actorInfo.assistCount || 0;
          } else ill1l.errorMessage ? console.log("" + (ill1l.errorMessage || "")) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "assist":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            $.assistState = ill1l.data.assistState || 0;
            $.allOpenCard = ill1l.data.openCardInfo.openAll || false;
            $.openVenderId = ill1l.data.openCardInfo.openVenderId || [];
            ill1l?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (ill1l?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else ill1l.errorMessage ? console.log("" + (ill1l.errorMessage || "")) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "taskRecord":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            $.followShop = ill1l.data["20"].recordCount || 0;
            $.addCart = ill1l.data["23"].recordCount || 0;
            $.visitSku = ill1l.data["10"].recordCount || 0;
          } else ill1l.errorMessage ? console.log("" + (ill1l.errorMessage || "")) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "checkOpenCard":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            let lIl11 = ill1l.data["10"].settingInfo || [],
              ilIili = ill1l.data.cardList || [],
              ilIill = ill1l.data.openCardList || [];
            $.openList = [...ilIili, ...lIl11, ...ilIill];
            $.openCardScore1 = ill1l.data.score1 || 0;
            $.openCardScore2 = ill1l.data.score2 || 0;
            $.drawScore = ill1l.data.drawScore || 0;
            if (ill1l.data.beans || ill1l.data.addBeanNum) console.log("开卡获得：" + (ill1l.data.beans || ill1l.data.addBeanNum) + "京豆 🐶");
          } else ill1l.errorMessage ? console.log("" + (ill1l.errorMessage || "")) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "addSku":
      case "followShop":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) console.log("完成任务,获得" + (ill1l?.["data"]?.["beans"] || 0) + "京豆, " + (ill1l?.["data"]?.["score"] || 0) + "金币");else ill1l.errorMessage ? console.log("" + (ill1l.errorMessage || "")) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "startDraw":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            if (typeof ill1l.data == "object") {
              drawInfo = ill1l.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = ill1l.data.addressId;
                    prizeName = drawInfo.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                    let iIlIil = await lI1I("https://lzdz1-isv.isvjcloud.com", l1li1i, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    iIlIil ? $.isNode() && (await i1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await i1I.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + drawInfo.name + " 🎟️");
                    break;
                  case 13:
                    console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                    $.isNode() && (await i1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                    break;
                  case 16:
                    console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                    break;
                  default:
                    drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                    break;
                }
              } else console.log("💨  空气");
            } else console.log("" + iii1);
          } else {
            if (ill1l.errorMessage) {
              $.runFalag = false;
              console.log("" + (ill1l.errorMessage || ""));
            } else console.log("" + iii1);
          }
        } else {
          console.log("" + iii1);
        }
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            if (typeof ill1l.data == "object") {
              let IIlllI = "",
                l11Iil = "抽奖";
              ill1l.data.addBeanNum && (IIlllI = ill1l.data.addBeanNum + "京豆");
              ill1l.data.addPoint && (IIlllI += " " + ill1l.data.addPoint + "游戏机会");
              if (i1ii11 == "followShop") {
                l11Iil = "关注";
                ill1l.data.beans != "0" && (IIlllI += ill1l.data.beans + "京豆 🐶");
              } else {
                if (i1ii11 == "addSku" || i1ii11 == "addCart") {
                  l11Iil = "加购";
                  ill1l.data.beans != "0" && (IIlllI += ill1l.data.beans + "京豆 🐶");
                } else {
                  if (i1ii11 == "viewVideo") l11Iil = "热门文章";else {
                    if (i1ii11 == "toShop") l11Iil = "浏览店铺";else {
                      if (i1ii11 == "visitSku" || i1ii11 == "browseGoods") l11Iil = "浏览商品";else {
                        if (i1ii11 == "sign") l11Iil = "签到";else {
                          let ilIiii = typeof ill1l.data.drawOk === "object" && ill1l.data.drawOk || ill1l.data;
                          IIlllI = ilIiii.drawOk == true && ilIiii.name || "";
                        }
                      }
                    }
                  }
                }
              }
              if (!IIlllI) {
                IIlllI = "空气 💨";
              }
              console.log(l11Iil + "获得：" + (IIlllI || iii1));
            } else {
              console.log("" + iii1);
            }
          } else {
            if (ill1l.errorMessage) {
              $.runFalag = false;
              console.log("" + (ill1l.errorMessage || ""));
            } else console.log("" + iii1);
          }
        } else console.log("" + iii1);
        break;
      case "drawRecord":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true) {
            let IIiIli = 0;
            for (let lIl1l of ill1l.data) {
              infoType = lIl1l.infoType;
              infoName = lIl1l.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  IIiIli += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await i1I.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await i1I.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            IIiIli > 0 && console.log("当前累计获得 " + IIiIli + " 京豆 🐶");
          } else ill1l.errorMessage ? console.log("" + (ill1l.errorMessage || "")) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "getShareRecord":
        if (typeof ill1l == "object") {
          if (ill1l.result && ill1l.result === true && ill1l.data) {
            $.ShareCount = ill1l.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else ill1l.errorMessage ? console.log("" + (ill1l.errorMessage || "")) : console.log("" + iii1);
        } else console.log("" + iii1);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(i1ii11 + "-> " + iii1);
    }
    if (typeof ill1l == "object") {
      if (ill1l.errorMessage) {
        ill1l.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
      }
    }
  } catch (iI1i) {
    console.log(iI1i);
  }
}
function i1i(l11Ill, IIlliI, ilIil1 = "POST") {
  let lIl1I1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": l1li1i,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return l11Ill.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (lIl1I1.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, lIl1I1.Cookie = "" + (il1Ill && il1Ill || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + il1Ili), {
    "url": l11Ill,
    "method": ilIil1,
    "headers": lIl1I1,
    "body": IIlliI,
    "timeout": 30000
  };
}
function I1Il1l() {
  return new Promise(lli1li => {
    let Ii1lii = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(Ii1lii, async (lii11, liIili, Ii1lil) => {
      try {
        if (lii11) {
          if (liIili && typeof liIili.statusCode != "undefined") {}
          console.log("" + $.toStr(lii11));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iiI11i = Ii1lil.match(/(活动已经结束)/) && Ii1lil.match(/(活动已经结束)/)[1] || "";
          iiI11i && ($.activityEnd = true, console.log("活动已结束"));
          I1Il1i(liIili);
        }
      } catch (iiilI) {
        $.logErr(iiilI, liIili);
      } finally {
        lli1li();
      }
    });
  });
}
function I1Il1i(ilII11) {
  if (ilII11) {
    if (ilII11.headers["set-cookie"]) {
      l1li1i = originCookie + ";";
      for (let iiIlI1 of ilII11.headers["set-cookie"]) {
        l1li1l[iiIlI1.split(";")[0].substr(0, iiIlI1.split(";")[0].indexOf("="))] = iiIlI1.split(";")[0].substr(iiIlI1.split(";")[0].indexOf("=") + 1);
      }
      for (const lli1l1 of Object.keys(l1li1l)) {
        l1li1i += lli1l1 + "=" + l1li1l[lli1l1] + ";";
      }
      il1Ili = l1li1i;
    }
  }
}
function i1l(lliIi) {
  lliIi = lliIi || 32;
  let IIiIi1 = "abcdef0123456789",
    I1i1 = IIiIi1.length,
    iiiii = "";
  for (i = 0; i < lliIi; i++) iiiii += IIiIi1.charAt(Math.floor(Math.random() * I1i1));
  return iiiii;
}
function IlIiII(l11lI) {
  if (typeof l11lI == "string") try {
    return JSON.parse(l11lI);
  } catch (lii1I) {
    return console.log(lii1I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function iIliI() {
  if (!$.joinVenderId) return;
  return new Promise(async I1ii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I1Iiil = "";
    if ($.shopactivityId) I1Iiil = ",\"activityId\":" + $.shopactivityId;
    const I1Iiii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I1Iiil + ",\"channel\":406}",
      lIIliI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1Iiii)
      },
      IiI111 = await lIiII1("8adfb", lIIliI),
      i11llI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + I1Iiii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IiI111),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1li1i,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i11llI, async (i11lil, iilI1I, i11lii) => {
      try {
        if (i11lil) {
          if (iilI1I && typeof iilI1I.statusCode != "undefined") {
            iilI1I.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          i11lii = i11lii && i11lii.match(/jsonp_.*?\((.*?)\);/) && i11lii.match(/jsonp_.*?\((.*?)\);/)[1] || i11lii;
          let iIiII1 = $.toObj(i11lii, i11lii);
          if (iIiII1 && typeof iIiII1 == "object") {
            if (iIiII1 && iIiII1.success === true) {
              console.log(" >> " + iIiII1.message);
              $.errorJoinShop = iIiII1.message;
              if (iIiII1.result && iIiII1.result.giftInfo) {
                for (let Il11I1 of iIiII1.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + Il11I1.discountString + Il11I1.prizeName + Il11I1.secondLineDesc);
                }
              }
            } else {
              if (iIiII1 && typeof iIiII1 == "object" && iIiII1.message) {
                $.errorJoinShop = iIiII1.message;
                console.log("" + (iIiII1.message || ""));
              } else console.log(i11lii);
            }
          } else console.log(i11lii);
        }
      } catch (iiI1Ii) {
        $.logErr(iiI1Ii, iilI1I);
      } finally {
        I1ii();
      }
    });
  });
}
async function i1IlII() {
  return new Promise(async iIllIl => {
    const IiIlI1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      iilI1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IiIlI1)
      },
      iI11I = await lIiII1("8adfb", iilI1l),
      I1IilI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IiIlI1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iI11I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l1li1i,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1IilI, async (iIllII, lli1I, IlIilI) => {
      try {
        if (iIllII) lli1I && typeof lli1I.statusCode != "undefined" && lli1I.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IlIilI = IlIilI && IlIilI.match(/jsonp_.*?\((.*?)\);/) && IlIilI.match(/jsonp_.*?\((.*?)\);/)[1] || IlIilI;
          let lll1il = $.toObj(IlIilI, IlIilI);
          lll1il && typeof lll1il == "object" ? lll1il && lll1il.success == true && (console.log("去加入：" + (lll1il.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = lll1il.result.interestsRuleList && lll1il.result.interestsRuleList[0] && lll1il.result.interestsRuleList[0].interestsInfo && lll1il.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(IlIilI);
        }
      } catch (lll1ii) {
        $.logErr(lll1ii, lli1I);
      } finally {
        iIllIl();
      }
    });
  });
}
function ilIii1(IIllli) {
  return new Promise(IiI11i => {
    const iIil11 = {
      "url": "" + IIllli,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iIil11, async (iIllI1, lli11, IlIil1) => {
      try {
        if (iIllI1) {} else {
          if (IlIil1) IlIil1 = JSON.parse(IlIil1);else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (iI1i1i) {
        $.logErr(iI1i1i, lli11);
        IlIil1 = null;
      } finally {
        IiI11i(IlIil1);
      }
    });
  });
}
function ll1III(IiI11I, ll1ili) {
  return Math.floor(Math.random() * (ll1ili - IiI11I)) + IiI11I;
}
function ll1II1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const il1li1 = Array.from(new Set($.blacklist.split("&")));
  console.log(il1li1.join("&") + "\n");
  let l111ii = il1li1,
    i1III1 = [],
    l1ii1i = false;
  for (let l111il = 0; l111il < I1Il.length; l111il++) {
    let Il1lI = decodeURIComponent(I1Il[l111il].match(/pt_pin=([^; ]+)(?=;?)/) && I1Il[l111il].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!Il1lI) break;
    let lli1l = false;
    for (let Iili1 of l111ii) {
      if (Iili1 && Iili1 == Il1lI) {
        lli1l = true;
        break;
      }
    }
    !lli1l && (l1ii1i = true, i1III1.splice(l111il, -1, I1Il[l111il]));
  }
  if (l1ii1i) I1Il = i1III1;
}
function l11lii(l1lil, lli1i) {
  lli1i != 0 && l1lil.unshift(l1lil.splice(lli1i, 1)[0]);
}
function IIlIii() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(I1Il, I1Il));
    return;
  }
  console.log("当前已设置白名单：");
  const IiiiIl = Array.from(new Set($.whitelist.split("&")));
  console.log(IiiiIl.join("&") + "\n");
  let i1IIII = [],
    l1ii11 = IiiiIl;
  for (let Iill1 in I1Il) {
    let illi1I = decodeURIComponent(I1Il[Iill1].match(/pt_pin=([^; ]+)(?=;?)/) && I1Il[Iill1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    l1ii11.includes(illi1I) && i1IIII.push(I1Il[Iill1]);
  }
  helpCookiesArr = i1IIII;
  if (l1ii11.length > 1) for (let i1IIIl in l1ii11) {
    let illi11 = l1ii11[l1ii11.length - 1 - i1IIIl];
    if (!illi11) continue;
    for (let li111l in helpCookiesArr) {
      let l111lI = decodeURIComponent(helpCookiesArr[li111l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[li111l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      illi11 == l111lI && l11lii(helpCookiesArr, li111l);
    }
  }
}