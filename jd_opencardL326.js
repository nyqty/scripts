/*
8.14-8.22 浪漫七夕 锁定美丽
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 8.14-8.22 浪漫七夕 锁定美丽 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#8.14-8.22 浪漫七夕 锁定美丽
11 11 11 11 * jd_opencardL326.js, tag=8.14-8.22 浪漫七夕 锁定美丽, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('8.14-8.22 浪漫七夕 锁定美丽')
const lIil1l = $.isNode() ? require("./jdCookie.js") : "",
  l1II1i = $.isNode() ? require("./sendNotify") : "";
let lili11 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  lIllIi = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const iIi11l = require("./function/krgetToken"),
  lIllIl = require("./function/krh5st"),
  iIi11i = require("./function/krgetua"),
  ii11i1 = require("./function/krwxSavePrize");
let ll1l1l = "https://lzdz1-isv.isvjcloud.com",
  l1II11 = [],
  iIl1Ii = "",
  ll1l1i = {};
if ($.isNode()) {
  Object.keys(lIil1l).forEach(ii11iI => {
    l1II11.push(lIil1l[ii11iI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1II11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1III($.getdata("CookiesJD") || "[]").map(i1IIl1 => i1IIl1.cookie)].filter(I1IIl => !!I1IIl);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iI1iI1 = "",
  i1IIii = "",
  i1IIil = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  il111l = "",
  iIl1Il = "";
$.whitelist = process.env.jd_opencard_whitelist || il111l;
$.blacklist = process.env.jd_opencard_blacklist || iIl1Il;
Ili1();
iIl1II();
$.errMsgPin = [];
!(async () => {
  if (i1IIil === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!l1II11[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await iIi11I("http://code.kingran.cf/326.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[iiii11(0, authorCodeList.length)];
  } else {
    let i1IIli = ["c7442cd1a5444df4ae0ff5a828251582", "e994d923230444e494a21938c38f58c2"];
    $.authorCode = i1IIli[iiii11(0, i1IIli.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "d96624413f9f489ebe9d21e9e831b57d";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let lI111 = 0; lI111 < l1II11.length; lI111++) {
    iIl1Ii = l1II11[lI111];
    originCookie = l1II11[lI111];
    if (iIl1Ii) {
      $.UserName = decodeURIComponent(iIl1Ii.match(/pt_pin=([^; ]+)(?=;?)/) && iIl1Ii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lI111 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await iIi11i($.UserName);
      await il111i();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let iiliIl = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + iiliIl;
  }
  if ($.outFlag) {
    let IiIl1I = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + IiIl1I);
    if ($.isNode()) await l1II1i.sendNotify("" + $.name, "" + IiIl1I);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(i1IIll => $.logErr(i1IIll)).finally(() => $.done());
async function il111i() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    iI1iI1 = "";
    $.Token = "";
    $.Pin = "";
    let iI1i1 = false;
    $.Token = await iIi11l(iIl1Ii, ll1l1l);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await lili1I();
    if (i1IIii == "") {
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
    await iI1iII("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await iI1iII("accessLogWithAD");
    await iI1iII("activityContent");
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
    await iI1iII("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await iI1iII("checkOpenCard");
    await iI1iII("taskRecord");
    await $.wait(1000);
    await iI1iII("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          iI1i1 = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await iiliI1();
          for (let il11Ii = 0; il11Ii < Array(2).length; il11Ii++) {
            if (il11Ii > 0) console.log("第" + il11Ii + "次 重新开卡");
            await l1II1I();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await iI1iII("activityContent");
          await iI1iII("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    !$.followShop && !$.outFlag && (console.log(""), await iI1iII("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    lIllIi && !$.addCart && !$.outFlag && (await iI1iII("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await iI1iII("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await iI1iII("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    iI1i1 && (await iI1iII("activityContent"));
    if (lili11 + "" !== "0") {
      $.runFalag = true;
      let iiIIi1 = parseInt($.score / 100);
      lili11 = parseInt(lili11, 10);
      if (iiIIi1 > lili11) iiIIi1 = lili11;
      console.log("已设置抽奖次数为" + iiIIi1 + "次，当前有" + $.score + "金币");
      for (m = 1; iiIIi1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await iI1iII("startDraw");
        if ($.runFalag == false) break;
        if (Number(iiIIi1) <= 0) break;
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
    await iI1iII("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (l1IilI) {
    console.log(l1IilI);
  }
}
async function iI1iII(ll1I1i) {
  if ($.outFlag) return;
  let ll1I1l = "https://lzdz1-isv.isvjcloud.com",
    iilI = "",
    IIilI1 = "POST";
  switch (ll1I1i) {
    case "getSimpleActInfoVo":
      url = ll1I1l + "/dz/common/getSimpleActInfoVo";
      iilI = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = ll1I1l + "/customer/getMyPing";
      iilI = "userId=1000090821&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = ll1I1l + "/common/accessLogWithAD";
      let Ili1ll = ll1I1l + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      iilI = "venderId=1000090821&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(Ili1ll) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = ll1I1l + "/wxActionCommon/getUserInfo";
      iilI = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = ll1I1l + "/dingzhi/joinCommon/activityContent";
      iilI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = ll1I1l + "/dingzhi/joinCommon/drawContent";
      iilI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = ll1I1l + "/dingzhi/joinCommon/taskInfo";
      iilI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = ll1I1l + "/dingzhi/joinCommon/assist";
      iilI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = ll1I1l + "/dingzhi/joinCommon/taskRecord";
      iilI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = ll1I1l + "/dingzhi/joinCommon/doTask";
      iilI = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = ll1I1l + "/dingzhi/joinCommon/doTask";
      iilI = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = ll1I1l + "/dingzhi/joinCommon/doTask";
      iilI = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = ll1I1l + "/dingzhi/opencard/" + ll1I1i;
      iilI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (ll1I1i == "browseGoods") iilI += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = ll1I1l + "/dingzhi/opencard/" + ll1I1i;
      let IIl1Il = "",
        l1Iili = "";
      if (ll1I1i == "viewVideo") {
        IIl1Il = 31;
        l1Iili = 31;
      } else {
        if (ll1I1i == "visitSku") {
          IIl1Il = 5;
          l1Iili = $.visitSkuValue || 5;
        } else {
          if (ll1I1i == "toShop") {
            IIl1Il = 14;
            l1Iili = $.toShopValue || 14;
          } else ll1I1i == "addSku" && (IIl1Il = 2, l1Iili = $.addSkuValue || 2);
        }
      }
      iilI = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + IIl1Il + "&taskValue=" + l1Iili;
      break;
    case "drawRecord":
      url = ll1I1l + "/dingzhi/joinCommon/drawRecord";
      iilI = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = ll1I1l + "/dingzhi/joinCommon/shareRecord";
      iilI = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = ll1I1l + "/dingzhi/joinCommon/startDraw";
      iilI = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + ll1I1i);
  }
  let i1ii1I = lI1i11(url, iilI, IIilI1);
  return new Promise(async iiiiIi => {
    $.post(i1ii1I, (IIi11i, iiIIli, iili) => {
      try {
        i1iiII(iiIIli);
        IIi11i ? (iiIIli && typeof iiIIli.statusCode != "undefined" && iiIIli.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n"), console.log("" + $.toStr(IIi11i, IIi11i)), console.log("API请求失败，请检查网路重试")) : l111Ii(ll1I1i, iili);
      } catch (li1IlI) {
        console.log(li1IlI, iiIIli);
      } finally {
        iiiiIi();
      }
    });
  });
}
async function l111Ii(IiII1l, IiII1i) {
  let Ii11Il = "";
  try {
    (IiII1l != "accessLogWithAD" || IiII1l != "drawContent") && IiII1i && (Ii11Il = JSON.parse(IiII1i));
  } catch (lli1lI) {
    console.log("执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (IiII1l) {
      case "getSimpleActInfoVo":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            if (typeof Ii11Il.data.shopId != "undefined") $.shopId = Ii11Il.data.shopId;
            if (typeof Ii11Il.data.venderId != "undefined") $.venderId = Ii11Il.data.venderId;
          } else Ii11Il.errorMessage ? console.log("" + (Ii11Il.errorMessage || "")) : console.log("" + IiII1i);
        } else console.log("" + IiII1i);
        break;
      case "getMyPing":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            if (Ii11Il.data && typeof Ii11Il.data.secretPin != "undefined") $.Pin = Ii11Il.data.secretPin;
            if (Ii11Il.data && typeof Ii11Il.data.nickname != "undefined") $.nickname = Ii11Il.data.nickname;
          } else Ii11Il.errorMessage ? (console.log("" + (Ii11Il.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + IiII1i);
        } else console.log("" + IiII1i);
        break;
      case "getUserInfo":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            if (Ii11Il.data && typeof Ii11Il.data.yunMidImageUrl != "undefined") $.attrTouXiang = Ii11Il.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else Ii11Il.errorMessage ? console.log("" + (Ii11Il.errorMessage || "")) : console.log("" + IiII1i);
        } else console.log("" + IiII1i);
        break;
      case "activityContent":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            $.endTime = Ii11Il.data.endTime || Ii11Il.data.activityVo && Ii11Il.data.activityVo.endTime || Ii11Il.data.activity.endTime || 0;
            $.hasEnd = Ii11Il.data.isEnd || false;
            $.score = Ii11Il.data.actorInfo.score || 0;
            $.actorUuid = Ii11Il.data.actorInfo.uuid || "";
            $.assistCount = Ii11Il.data.actorInfo.assistCount || 0;
          } else Ii11Il.errorMessage ? console.log("" + (Ii11Il.errorMessage || "")) : console.log("" + IiII1i);
        } else console.log("" + IiII1i);
        break;
      case "assist":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            $.assistState = Ii11Il.data.assistState || 0;
            $.allOpenCard = Ii11Il.data.openCardInfo.openAll || false;
            $.openVenderId = Ii11Il.data.openCardInfo.openVenderId || [];
            Ii11Il?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (Ii11Il?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else Ii11Il.errorMessage ? console.log("" + (Ii11Il.errorMessage || "")) : console.log("" + IiII1i);
        } else console.log("" + IiII1i);
        break;
      case "taskRecord":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            $.followShop = Ii11Il.data["20"].recordCount || 0;
            $.addCart = Ii11Il.data["23"].recordCount || 0;
            $.visitSku = Ii11Il.data["10"].recordCount || 0;
          } else Ii11Il.errorMessage ? console.log("" + (Ii11Il.errorMessage || "")) : console.log("" + IiII1i);
        } else {
          console.log("" + IiII1i);
        }
        break;
      case "checkOpenCard":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            let il11II = Ii11Il.data["10"].settingInfo || [],
              l11l1 = Ii11Il.data.cardList || [],
              l11lI = Ii11Il.data.openCardList || [];
            $.openList = [...l11l1, ...il11II, ...l11lI];
            $.openCardScore1 = Ii11Il.data.score1 || 0;
            $.openCardScore2 = Ii11Il.data.score2 || 0;
            $.drawScore = Ii11Il.data.drawScore || 0;
            if (Ii11Il.data.beans || Ii11Il.data.addBeanNum) console.log("开卡获得：" + (Ii11Il.data.beans || Ii11Il.data.addBeanNum) + "京豆 🐶");
          } else {
            if (Ii11Il.errorMessage) console.log("" + (Ii11Il.errorMessage || ""));else {
              console.log("" + IiII1i);
            }
          }
        } else console.log("" + IiII1i);
        break;
      case "addSku":
      case "followShop":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) console.log("完成任务,获得" + (Ii11Il?.["data"]?.["beans"] || 0) + "京豆, " + (Ii11Il?.["data"]?.["score"] || 0) + "金币");else Ii11Il.errorMessage ? console.log("" + (Ii11Il.errorMessage || "")) : console.log("" + IiII1i);
        } else console.log("" + IiII1i);
        break;
      case "startDraw":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            if (typeof Ii11Il.data == "object") {
              drawInfo = Ii11Il.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = Ii11Il.data.addressId;
                  prizeName = drawInfo.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let IIiIiI = await ii11i1("https://lzdz1-isv.isvjcloud.com", iIl1Ii, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  IIiIiI ? $.isNode() && (await l1II1i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await l1II1i.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await l1II1i.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else {
              console.log("" + IiII1i);
            }
          } else {
            if (Ii11Il.errorMessage) {
              $.runFalag = false;
              console.log("" + (Ii11Il.errorMessage || ""));
            } else {
              console.log("" + IiII1i);
            }
          }
        } else {
          console.log("" + IiII1i);
        }
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            if (typeof Ii11Il.data == "object") {
              let I1ii = "",
                I1il = "抽奖";
              if (Ii11Il.data.addBeanNum) {
                I1ii = Ii11Il.data.addBeanNum + "京豆";
              }
              Ii11Il.data.addPoint && (I1ii += " " + Ii11Il.data.addPoint + "游戏机会");
              if (IiII1l == "followShop") {
                I1il = "关注";
                Ii11Il.data.beans != "0" && (I1ii += Ii11Il.data.beans + "京豆 🐶");
              } else {
                if (IiII1l == "addSku" || IiII1l == "addCart") {
                  I1il = "加购";
                  Ii11Il.data.beans != "0" && (I1ii += Ii11Il.data.beans + "京豆 🐶");
                } else {
                  if (IiII1l == "viewVideo") I1il = "热门文章";else {
                    if (IiII1l == "toShop") I1il = "浏览店铺";else {
                      if (IiII1l == "visitSku" || IiII1l == "browseGoods") I1il = "浏览商品";else {
                        if (IiII1l == "sign") {
                          I1il = "签到";
                        } else {
                          let i11llI = typeof Ii11Il.data.drawOk === "object" && Ii11Il.data.drawOk || Ii11Il.data;
                          I1ii = i11llI.drawOk == true && i11llI.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !I1ii && (I1ii = "空气 💨");
              console.log(I1il + "获得：" + (I1ii || IiII1i));
            } else console.log("" + IiII1i);
          } else {
            if (Ii11Il.errorMessage) {
              $.runFalag = false;
              console.log("" + (Ii11Il.errorMessage || ""));
            } else console.log("" + IiII1i);
          }
        } else console.log("" + IiII1i);
        break;
      case "drawRecord":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true) {
            let iIiIIi = 0;
            for (let IlIill of Ii11Il.data) {
              infoType = IlIill.infoType;
              infoName = IlIill.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  iIiIIi += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await l1II1i.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await l1II1i.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            iIiIIi > 0 && console.log("当前累计获得 " + iIiIIi + " 京豆 🐶");
          } else Ii11Il.errorMessage ? console.log("" + (Ii11Il.errorMessage || "")) : console.log("" + IiII1i);
        } else console.log("" + IiII1i);
        break;
      case "getShareRecord":
        if (typeof Ii11Il == "object") {
          if (Ii11Il.result && Ii11Il.result === true && Ii11Il.data) {
            $.ShareCount = Ii11Il.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else Ii11Il.errorMessage ? console.log("" + (Ii11Il.errorMessage || "")) : console.log("" + IiII1i);
        } else {
          console.log("" + IiII1i);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IiII1l + "-> " + IiII1i);
    }
    if (typeof Ii11Il == "object") {
      if (Ii11Il.errorMessage) {
        if (Ii11Il.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (iIiIII) {
    console.log(iIiIII);
  }
}
function lI1i11(I1lI, iIlIl, iIlIi = "POST") {
  let i11lil = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iIl1Ii,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return I1lI.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (i11lil.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, i11lil.Cookie = "" + (iI1iI1 && iI1iI1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + i1IIii), {
    "url": I1lI,
    "method": iIlIi,
    "headers": i11lil,
    "body": iIlIl,
    "timeout": 30000
  };
}
function lili1I() {
  return new Promise(IlIiil => {
    let ilIII1 = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(ilIII1, async (IlIiiI, lll1l1, llili1) => {
      try {
        if (IlIiiI) {
          if (lll1l1 && typeof lll1l1.statusCode != "undefined") {}
          console.log("" + $.toStr(IlIiiI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IiIlI1 = llili1.match(/(活动已经结束)/) && llili1.match(/(活动已经结束)/)[1] || "";
          if (IiIlI1) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          i1iiII(lll1l1);
        }
      } catch (iIllII) {
        $.logErr(iIllII, lll1l1);
      } finally {
        IlIiil();
      }
    });
  });
}
function i1iiII(IlIilI) {
  if (IlIilI) {
    if (IlIilI.headers["set-cookie"]) {
      iIl1Ii = originCookie + ";";
      for (let lIIll1 of IlIilI.headers["set-cookie"]) {
        ll1l1i[lIIll1.split(";")[0].substr(0, lIIll1.split(";")[0].indexOf("="))] = lIIll1.split(";")[0].substr(lIIll1.split(";")[0].indexOf("=") + 1);
      }
      for (const Il1ii of Object.keys(ll1l1i)) {
        iIl1Ii += Il1ii + "=" + ll1l1i[Il1ii] + ";";
      }
      i1IIii = iIl1Ii;
    }
  }
}
function l111Il(iIil1i) {
  iIil1i = iIil1i || 32;
  let iIil1l = "abcdef0123456789",
    iIil11 = iIil1l.length,
    l1li1 = "";
  for (i = 0; i < iIil1i; i++) l1li1 += iIil1l.charAt(Math.floor(Math.random() * iIil11));
  return l1li1;
}
function I1III(lIIlil) {
  if (typeof lIIlil == "string") try {
    return JSON.parse(lIIlil);
  } catch (iI1i1l) {
    return console.log(iI1i1l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function l1II1I() {
  if (!$.joinVenderId) return;
  return new Promise(async I1ii1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let li1111 = "";
    if ($.shopactivityId) li1111 = ",\"activityId\":" + $.shopactivityId;
    const IiliI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + li1111 + ",\"channel\":406}",
      IiIIiI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IiliI)
      },
      I11IiI = await lIllIl("8adfb", IiIIiI),
      l111il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IiliI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I11IiI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIl1Ii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l111il, async (Il1lI, lli1l, Iili1) => {
      try {
        if (Il1lI) {
          lli1l && typeof lli1l.statusCode != "undefined" && lli1l.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          Iili1 = Iili1 && Iili1.match(/jsonp_.*?\((.*?)\);/) && Iili1.match(/jsonp_.*?\((.*?)\);/)[1] || Iili1;
          let IiiiIl = $.toObj(Iili1, Iili1);
          if (IiiiIl && typeof IiiiIl == "object") {
            if (IiiiIl && IiiiIl.success === true) {
              console.log(" >> " + IiiiIl.message);
              $.errorJoinShop = IiiiIl.message;
              if (IiiiIl.result && IiiiIl.result.giftInfo) for (let i1IIII of IiiiIl.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + i1IIII.discountString + i1IIII.prizeName + i1IIII.secondLineDesc);
              }
            } else IiiiIl && typeof IiiiIl == "object" && IiiiIl.message ? ($.errorJoinShop = IiiiIl.message, console.log("" + (IiiiIl.message || ""))) : console.log(Iili1);
          } else console.log(Iili1);
        }
      } catch (llillI) {
        $.logErr(llillI, lli1l);
      } finally {
        I1ii1();
      }
    });
  });
}
async function iiliI1() {
  return new Promise(async iiliii => {
    const I1iii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      li111i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1iii)
      },
      ll1ilI = await lIllIl("8adfb", li111i),
      I1ilI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I1iii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ll1ilI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": iIl1Ii,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1ilI, async (iilii1, llilil, il1lii) => {
      try {
        if (iilii1) llilil && typeof llilil.statusCode != "undefined" && llilil.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          il1lii = il1lii && il1lii.match(/jsonp_.*?\((.*?)\);/) && il1lii.match(/jsonp_.*?\((.*?)\);/)[1] || il1lii;
          let l111ll = $.toObj(il1lii, il1lii);
          if (l111ll && typeof l111ll == "object") {
            if (l111ll && l111ll.success == true) {
              console.log("去加入：" + (l111ll.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = l111ll.result.interestsRuleList && l111ll.result.interestsRuleList[0] && l111ll.result.interestsRuleList[0].interestsInfo && l111ll.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else console.log(il1lii);
        }
      } catch (Il1ll) {
        $.logErr(Il1ll, llilil);
      } finally {
        iiliii();
      }
    });
  });
}
function iIi11I(Iilil) {
  return new Promise(iilil1 => {
    const li1lII = {
      "url": "" + Iilil,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(li1lII, async (Il11II, Iilll, I11Ill) => {
      try {
        if (Il11II) {} else {
          I11Ill ? I11Ill = JSON.parse(I11Ill) : console.log("未获取到数据,请重新运行");
        }
      } catch (lIiiii) {
        $.logErr(lIiiii, Iilll);
        I11Ill = null;
      } finally {
        iilil1(I11Ill);
      }
    });
  });
}
function iiii11(Iilli, i1Il1I) {
  return Math.floor(Math.random() * (i1Il1I - Iilli)) + Iilli;
}
function iIl1II() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const Il11Il = Array.from(new Set($.blacklist.split("&")));
  console.log(Il11Il.join("&") + "\n");
  let I1ill = Il11Il,
    i111Il = [],
    i111Ii = false;
  for (let i1Il1l = 0; i1Il1l < l1II11.length; i1Il1l++) {
    let I11IlI = decodeURIComponent(l1II11[i1Il1l].match(/pt_pin=([^; ]+)(?=;?)/) && l1II11[i1Il1l].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!I11IlI) break;
    let IiIIlI = false;
    for (let IIi1I1 of I1ill) {
      if (IIi1I1 && IIi1I1 == I11IlI) {
        IiIIlI = true;
        break;
      }
    }
    !IiIIlI && (i111Ii = true, i111Il.splice(i1Il1l, -1, l1II11[i1Il1l]));
  }
  if (i111Ii) l1II11 = i111Il;
}
function il1lIi(I11Il1, IiIIl1) {
  IiIIl1 != 0 && I11Il1.unshift(I11Il1.splice(IiIIl1, 1)[0]);
}
function Ili1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(l1II11, l1II11));
    return;
  }
  console.log("当前已设置白名单：");
  const iilill = Array.from(new Set($.whitelist.split("&")));
  console.log(iilill.join("&") + "\n");
  let IiIIii = [],
    lIiili = iilill;
  for (let iIII in l1II11) {
    let iI1I1 = decodeURIComponent(l1II11[iIII].match(/pt_pin=([^; ]+)(?=;?)/) && l1II11[iIII].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    lIiili.includes(iI1I1) && IiIIii.push(l1II11[iIII]);
  }
  helpCookiesArr = IiIIii;
  if (lIiili.length > 1) for (let Ii11iI in lIiili) {
    let IiliII = lIiili[lIiili.length - 1 - Ii11iI];
    if (!IiliII) continue;
    for (let Iiii1I in helpCookiesArr) {
      let I11111 = decodeURIComponent(helpCookiesArr[Iiii1I].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[Iiii1I].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      IiliII == I11111 && il1lIi(helpCookiesArr, Iiii1I);
    }
  }
}