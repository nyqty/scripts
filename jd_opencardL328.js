/*
8.17-8.23 无乐不玩 再夏一天
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 8.17-8.23 无乐不玩 再夏一天 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#8.17-8.23 无乐不玩 再夏一天
11 11 11 11 * jd_opencardL328.js, tag=8.17-8.23 无乐不玩 再夏一天, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('8.17-8.23 无乐不玩 再夏一天')
const iIlll1 = $.isNode() ? require("./jdCookie.js") : "",
  ilIiiI = $.isNode() ? require("./sendNotify") : "";
let I1Il1I = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  IIlIil = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const l11llI = require("./function/krgetToken"),
  i1IlIi = require("./function/krh5st"),
  i1IlIl = require("./function/krgetua"),
  ll1IIi = require("./function/krwxSavePrize");
let IlIiI1 = "https://lzdz1-isv.isvjcloud.com",
  ll1IIl = [],
  l11ll1 = "",
  iIlllI = {};
if ($.isNode()) {
  Object.keys(iIlll1).forEach(I1II1 => {
    ll1IIl.push(iIlll1[I1II1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else ll1IIl = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l11lll($.getdata("CookiesJD") || "[]").map(lIil1i => lIil1i.cookie)].filter(lIil1l => !!lIil1l);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iIli1 = "",
  iIllii = "",
  iIllil = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  l11lli = "",
  I1Il11 = "";
$.whitelist = process.env.jd_opencard_whitelist || l11lli;
$.blacklist = process.env.jd_opencard_blacklist || I1Il11;
IiIII1();
lI1i1I();
$.errMsgPin = [];
!(async () => {
  if (iIllil === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!ll1IIl[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await iIilI1("http://code.kingran.cf/328.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[i1IIiI(0, authorCodeList.length)];
  } else {
    let iIi11I = ["0239b56eef4a4d539b98cb75393b9912", "702957ac77bd401799b194487dea30a2"];
    $.authorCode = iIi11I[i1IIiI(0, iIi11I.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "4546ab3c959744db8b78e18cf0781ea3";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let iiii11 = 0; iiii11 < ll1IIl.length; iiii11++) {
    l11ll1 = ll1IIl[iiii11];
    originCookie = ll1IIl[iiii11];
    if (l11ll1) {
      $.UserName = decodeURIComponent(l11ll1.match(/pt_pin=([^; ]+)(?=;?)/) && l11ll1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iiii11 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = await i1IlIl($.UserName);
      await IlIiIl();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let ii11iI = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + ii11iI;
  }
  if ($.outFlag) {
    let i1IIl1 = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + i1IIl1);
    if ($.isNode()) await ilIiiI.sendNotify("" + $.name, "" + i1IIl1);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(iiliII => $.logErr(iiliII)).finally(() => $.done());
async function IlIiIl() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    iIli1 = "";
    $.Token = "";
    $.Pin = "";
    let il1IiI = false;
    $.Token = await l11llI(l11ll1, IlIiI1);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IIlIi1();
    if (iIllii == "") {
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
    await iIiIll("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await iIiIll("accessLogWithAD");
    await iIiIll("activityContent");
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
    await iIiIll("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await iIiIll("checkOpenCard");
    await iIiIll("taskRecord");
    await $.wait(1000);
    await iIiIll("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          il1IiI = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await ll1l1I();
          for (let lIil1I = 0; lIil1I < Array(2).length; lIil1I++) {
            if (lIil1I > 0) console.log("第" + lIil1I + "次 重新开卡");
            await i1iiI1();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await iIiIll("activityContent");
          await iIiIll("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    !$.followShop && !$.outFlag && (console.log(""), await iIiIll("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    IIlIil && !$.addCart && !$.outFlag && (await iIiIll("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await iIiIll("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await iIiIll("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    il1IiI && (await iIiIll("activityContent"));
    if (I1Il1I + "" !== "0") {
      $.runFalag = true;
      let lIllII = parseInt($.score / 100);
      I1Il1I = parseInt(I1Il1I, 10);
      if (lIllII > I1Il1I) lIllII = I1Il1I;
      console.log("已设置抽奖次数为" + lIllII + "次，当前有" + $.score + "金币");
      for (m = 1; lIllII--; m++) {
        console.log("进行第" + m + "次抽奖");
        await iIiIll("startDraw");
        if ($.runFalag == false) break;
        if (Number(lIllII) <= 0) break;
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
    await iIiIll("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (l1Iiil) {
    console.log(l1Iiil);
  }
}
async function iIiIll(I1li1I) {
  if ($.outFlag) return;
  let iiiI = "https://lzdz1-isv.isvjcloud.com",
    I1li11 = "",
    II1iIl = "POST";
  switch (I1li1I) {
    case "getSimpleActInfoVo":
      url = iiiI + "/dz/common/getSimpleActInfoVo";
      I1li11 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = iiiI + "/customer/getMyPing";
      I1li11 = "userId=1000003829&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = iiiI + "/common/accessLogWithAD";
      let i1ii1I = iiiI + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I1li11 = "venderId=1000003829&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(i1ii1I) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = iiiI + "/wxActionCommon/getUserInfo";
      I1li11 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = iiiI + "/dingzhi/joinCommon/activityContent";
      I1li11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = iiiI + "/dingzhi/joinCommon/drawContent";
      I1li11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = iiiI + "/dingzhi/joinCommon/taskInfo";
      I1li11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = iiiI + "/dingzhi/joinCommon/assist";
      I1li11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = iiiI + "/dingzhi/joinCommon/taskRecord";
      I1li11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = iiiI + "/dingzhi/joinCommon/doTask";
      I1li11 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = iiiI + "/dingzhi/joinCommon/doTask";
      I1li11 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = iiiI + "/dingzhi/joinCommon/doTask";
      I1li11 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = iiiI + "/dingzhi/opencard/" + I1li1I;
      I1li11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (I1li1I == "browseGoods") I1li11 += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = iiiI + "/dingzhi/opencard/" + I1li1I;
      let iil1 = "",
        iiIIiI = "";
      if (I1li1I == "viewVideo") {
        iil1 = 31;
        iiIIiI = 31;
      } else {
        if (I1li1I == "visitSku") {
          iil1 = 5;
          iiIIiI = $.visitSkuValue || 5;
        } else {
          if (I1li1I == "toShop") {
            iil1 = 14;
            iiIIiI = $.toShopValue || 14;
          } else I1li1I == "addSku" && (iil1 = 2, iiIIiI = $.addSkuValue || 2);
        }
      }
      I1li11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + iil1 + "&taskValue=" + iiIIiI;
      break;
    case "drawRecord":
      url = iiiI + "/dingzhi/joinCommon/drawRecord";
      I1li11 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = iiiI + "/dingzhi/joinCommon/shareRecord";
      I1li11 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = iiiI + "/dingzhi/joinCommon/startDraw";
      I1li11 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + I1li1I);
  }
  let iI1iI = IlIiIi(url, I1li11, II1iIl);
  return new Promise(async ill1I => {
    $.post(iI1iI, (IIilII, l1Iil1, IIiIl) => {
      try {
        i1IIi1(l1Iil1);
        IIilII ? (l1Iil1 && typeof l1Iil1.statusCode != "undefined" && l1Iil1.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n"), console.log("" + $.toStr(IIilII, IIilII)), console.log("API请求失败，请检查网路重试")) : iIlliI(I1li1I, IIiIl);
      } catch (iiiiI1) {
        console.log(iiiiI1, l1Iil1);
      } finally {
        ill1I();
      }
    });
  });
}
async function iIlliI(i1ii1i, iiii) {
  let li1Iil = "";
  try {
    if (i1ii1i != "accessLogWithAD" || i1ii1i != "drawContent") {
      iiii && (li1Iil = JSON.parse(iiii));
    }
  } catch (lIIl) {
    console.log("执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (i1ii1i) {
      case "getSimpleActInfoVo":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            if (typeof li1Iil.data.shopId != "undefined") $.shopId = li1Iil.data.shopId;
            if (typeof li1Iil.data.venderId != "undefined") $.venderId = li1Iil.data.venderId;
          } else li1Iil.errorMessage ? console.log("" + (li1Iil.errorMessage || "")) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "getMyPing":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            if (li1Iil.data && typeof li1Iil.data.secretPin != "undefined") $.Pin = li1Iil.data.secretPin;
            if (li1Iil.data && typeof li1Iil.data.nickname != "undefined") $.nickname = li1Iil.data.nickname;
          } else li1Iil.errorMessage ? (console.log("" + (li1Iil.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "getUserInfo":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            if (li1Iil.data && typeof li1Iil.data.yunMidImageUrl != "undefined") $.attrTouXiang = li1Iil.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else li1Iil.errorMessage ? console.log("" + (li1Iil.errorMessage || "")) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "activityContent":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            $.endTime = li1Iil.data.endTime || li1Iil.data.activityVo && li1Iil.data.activityVo.endTime || li1Iil.data.activity.endTime || 0;
            $.hasEnd = li1Iil.data.isEnd || false;
            $.score = li1Iil.data.actorInfo.score || 0;
            $.actorUuid = li1Iil.data.actorInfo.uuid || "";
            $.assistCount = li1Iil.data.actorInfo.assistCount || 0;
          } else {
            if (li1Iil.errorMessage) console.log("" + (li1Iil.errorMessage || ""));else {
              console.log("" + iiii);
            }
          }
        } else console.log("" + iiii);
        break;
      case "assist":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            $.assistState = li1Iil.data.assistState || 0;
            $.allOpenCard = li1Iil.data.openCardInfo.openAll || false;
            $.openVenderId = li1Iil.data.openCardInfo.openVenderId || [];
            li1Iil?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (li1Iil?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else li1Iil.errorMessage ? console.log("" + (li1Iil.errorMessage || "")) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "taskRecord":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            $.followShop = li1Iil.data["20"].recordCount || 0;
            $.addCart = li1Iil.data["23"].recordCount || 0;
            $.visitSku = li1Iil.data["10"].recordCount || 0;
          } else li1Iil.errorMessage ? console.log("" + (li1Iil.errorMessage || "")) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "checkOpenCard":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            let liIiii = li1Iil.data["10"].settingInfo || [],
              l11Ill = li1Iil.data.cardList || [],
              IIlliI = li1Iil.data.openCardList || [];
            $.openList = [...l11Ill, ...liIiii, ...IIlliI];
            $.openCardScore1 = li1Iil.data.score1 || 0;
            $.openCardScore2 = li1Iil.data.score2 || 0;
            $.drawScore = li1Iil.data.drawScore || 0;
            if (li1Iil.data.beans || li1Iil.data.addBeanNum) console.log("开卡获得：" + (li1Iil.data.beans || li1Iil.data.addBeanNum) + "京豆 🐶");
          } else li1Iil.errorMessage ? console.log("" + (li1Iil.errorMessage || "")) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "addSku":
      case "followShop":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) console.log("完成任务,获得" + (li1Iil?.["data"]?.["beans"] || 0) + "京豆, " + (li1Iil?.["data"]?.["score"] || 0) + "金币");else li1Iil.errorMessage ? console.log("" + (li1Iil.errorMessage || "")) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "startDraw":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            if (typeof li1Iil.data == "object") {
              drawInfo = li1Iil.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = li1Iil.data.addressId;
                  prizeName = drawInfo.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let iiI11I = await ll1IIi("https://lzdz1-isv.isvjcloud.com", l11ll1, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  iiI11I ? $.isNode() && (await ilIiiI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await ilIiiI.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  if ($.isNode()) {
                    await ilIiiI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId);
                  }
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else {
                console.log("💨  空气");
              }
            } else console.log("" + iiii);
          } else {
            if (li1Iil.errorMessage) {
              $.runFalag = false;
              console.log("" + (li1Iil.errorMessage || ""));
            } else console.log("" + iiii);
          }
        } else console.log("" + iiii);
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            if (typeof li1Iil.data == "object") {
              let Il1III = "",
                l11iI = "抽奖";
              li1Iil.data.addBeanNum && (Il1III = li1Iil.data.addBeanNum + "京豆");
              if (li1Iil.data.addPoint) {
                Il1III += " " + li1Iil.data.addPoint + "游戏机会";
              }
              if (i1ii1i == "followShop") {
                l11iI = "关注";
                li1Iil.data.beans != "0" && (Il1III += li1Iil.data.beans + "京豆 🐶");
              } else {
                if (i1ii1i == "addSku" || i1ii1i == "addCart") {
                  l11iI = "加购";
                  li1Iil.data.beans != "0" && (Il1III += li1Iil.data.beans + "京豆 🐶");
                } else {
                  if (i1ii1i == "viewVideo") l11iI = "热门文章";else {
                    if (i1ii1i == "toShop") l11iI = "浏览店铺";else {
                      if (i1ii1i == "visitSku" || i1ii1i == "browseGoods") l11iI = "浏览商品";else {
                        if (i1ii1i == "sign") l11iI = "签到";else {
                          let lli1li = typeof li1Iil.data.drawOk === "object" && li1Iil.data.drawOk || li1Iil.data;
                          Il1III = lli1li.drawOk == true && lli1li.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !Il1III && (Il1III = "空气 💨");
              console.log(l11iI + "获得：" + (Il1III || iiii));
            } else console.log("" + iiii);
          } else li1Iil.errorMessage ? ($.runFalag = false, console.log("" + (li1Iil.errorMessage || ""))) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "drawRecord":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true) {
            let lii11 = 0;
            for (let liIili of li1Iil.data) {
              infoType = liIili.infoType;
              infoName = liIili.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  lii11 += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await ilIiiI.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await ilIiiI.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            lii11 > 0 && console.log("当前累计获得 " + lii11 + " 京豆 🐶");
          } else li1Iil.errorMessage ? console.log("" + (li1Iil.errorMessage || "")) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "getShareRecord":
        if (typeof li1Iil == "object") {
          if (li1Iil.result && li1Iil.result === true && li1Iil.data) {
            $.ShareCount = li1Iil.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else li1Iil.errorMessage ? console.log("" + (li1Iil.errorMessage || "")) : console.log("" + iiii);
        } else console.log("" + iiii);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(i1ii1i + "-> " + iiii);
    }
    typeof li1Iil == "object" && li1Iil.errorMessage && li1Iil.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (iiI11l) {
    console.log(iiI11l);
  }
}
function IlIiIi(iiI11i, Il1II1, iiilI = "POST") {
  let IIiIl1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": l11ll1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iiI11i.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (IIiIl1.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, IIiIl1.Cookie = "" + (iIli1 && iIli1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + iIllii), {
    "url": iiI11i,
    "method": iiilI,
    "headers": IIiIl1,
    "body": Il1II1,
    "timeout": 30000
  };
}
function IIlIi1() {
  return new Promise(lliIi => {
    let l1Iii1 = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1Iii1, async (IIiIi1, I1i1, iiiii) => {
      try {
        if (IIiIi1) {
          if (I1i1 && typeof I1i1.statusCode != "undefined") {}
          console.log("" + $.toStr(IIiIi1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let lli1il = iiiii.match(/(活动已经结束)/) && iiiii.match(/(活动已经结束)/)[1] || "";
          lli1il && ($.activityEnd = true, console.log("活动已结束"));
          i1IIi1(I1i1);
        }
      } catch (IIiIiI) {
        $.logErr(IIiIiI, I1i1);
      } finally {
        lliIi();
      }
    });
  });
}
function i1IIi1(ll1i) {
  if (ll1i) {
    if (ll1i.headers["set-cookie"]) {
      l11ll1 = originCookie + ";";
      for (let I1Iiii of ll1i.headers["set-cookie"]) {
        iIlllI[I1Iiii.split(";")[0].substr(0, I1Iiii.split(";")[0].indexOf("="))] = I1Iiii.split(";")[0].substr(I1Iiii.split(";")[0].indexOf("=") + 1);
      }
      for (const lIIliI of Object.keys(iIlllI)) {
        l11ll1 += lIIliI + "=" + iIlllI[lIIliI] + ";";
      }
      iIllii = l11ll1;
    }
  }
}
function IIlIiI(iIiIIi) {
  iIiIIi = iIiIIi || 32;
  let iiI1I1 = "abcdef0123456789",
    IlIili = iiI1I1.length,
    I1iI = "";
  for (i = 0; i < iIiIIi; i++) I1iI += iiI1I1.charAt(Math.floor(Math.random() * IlIili));
  return I1iI;
}
function l11lll(i11ll1) {
  if (typeof i11ll1 == "string") {
    try {
      return JSON.parse(i11ll1);
    } catch (I1Iii1) {
      return console.log(I1Iii1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function i1iiI1() {
  if (!$.joinVenderId) return;
  return new Promise(async lIIlll => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IlIilI = "";
    if ($.shopactivityId) IlIilI = ",\"activityId\":" + $.shopactivityId;
    const Il1il = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IlIilI + ",\"channel\":406}",
      lll1il = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il1il)
      },
      lll1ii = await i1IlIi("8adfb", lll1il),
      lIIllI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Il1il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lll1ii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l11ll1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lIIllI, async (IIllli, lIIll1, Il1ii) => {
      try {
        if (IIllli) lIIll1 && typeof lIIll1.statusCode != "undefined" && lIIll1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          Il1ii = Il1ii && Il1ii.match(/jsonp_.*?\((.*?)\);/) && Il1ii.match(/jsonp_.*?\((.*?)\);/)[1] || Il1ii;
          let iIil1l = $.toObj(Il1ii, Il1ii);
          if (iIil1l && typeof iIil1l == "object") {
            if (iIil1l && iIil1l.success === true) {
              console.log(" >> " + iIil1l.message);
              $.errorJoinShop = iIil1l.message;
              if (iIil1l.result && iIil1l.result.giftInfo) {
                for (let iIil11 of iIil1l.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + iIil11.discountString + iIil11.prizeName + iIil11.secondLineDesc);
                }
              }
            } else iIil1l && typeof iIil1l == "object" && iIil1l.message ? ($.errorJoinShop = iIil1l.message, console.log("" + (iIil1l.message || ""))) : console.log(Il1ii);
          } else console.log(Il1ii);
        }
      } catch (lli11) {
        $.logErr(lli11, lIIll1);
      } finally {
        lIIlll();
      }
    });
  });
}
async function ll1l1I() {
  return new Promise(async il1li1 => {
    const i1III1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      l1ii1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1III1)
      },
      l1liII = await i1IlIi("8adfb", l1ii1i),
      I1ii1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + i1III1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1liII),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": l11ll1,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1ii1, async (l1ii1I, IiIIi1, I11Iil) => {
      try {
        if (l1ii1I) {
          if (IiIIi1 && typeof IiIIi1.statusCode != "undefined") {
            IiIIi1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          I11Iil = I11Iil && I11Iil.match(/jsonp_.*?\((.*?)\);/) && I11Iil.match(/jsonp_.*?\((.*?)\);/)[1] || I11Iil;
          let Iill1 = $.toObj(I11Iil, I11Iil);
          if (Iill1 && typeof Iill1 == "object") {
            Iill1 && Iill1.success == true && (console.log("去加入：" + (Iill1.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = Iill1.result.interestsRuleList && Iill1.result.interestsRuleList[0] && Iill1.result.interestsRuleList[0].interestsInfo && Iill1.result.interestsRuleList[0].interestsInfo.activityId || "");
          } else console.log(I11Iil);
        }
      } catch (i1IIIl) {
        $.logErr(i1IIIl, IiIIi1);
      } finally {
        il1li1();
      }
    });
  });
}
function iIilI1(li111l) {
  return new Promise(li111i => {
    const I1ilI = {
      "url": "" + li111l,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1ilI, async (lll1ll, illi1l, l1llI) => {
      try {
        if (lll1ll) {} else l1llI ? l1llI = JSON.parse(l1llI) : console.log("未获取到数据,请重新运行");
      } catch (l1ii1l) {
        $.logErr(l1ii1l, illi1l);
        l1llI = null;
      } finally {
        li111i(l1llI);
      }
    });
  });
}
function i1IIiI(l111ll, l1liIi) {
  return Math.floor(Math.random() * (l1liIi - l111ll)) + l111ll;
}
function lI1i1I() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const I1il1 = Array.from(new Set($.blacklist.split("&")));
  console.log(I1il1.join("&") + "\n");
  let IiIlIl = I1il1,
    iiliiI = [],
    Il1li = false;
  for (let i1Il11 = 0; i1Il11 < ll1IIl.length; i1Il11++) {
    let li1lI1 = decodeURIComponent(ll1IIl[i1Il11].match(/pt_pin=([^; ]+)(?=;?)/) && ll1IIl[i1Il11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!li1lI1) break;
    let ll1I11 = false;
    for (let l1lli of IiIlIl) {
      if (l1lli && l1lli == li1lI1) {
        ll1I11 = true;
        break;
      }
    }
    !ll1I11 && (Il1li = true, iiliiI.splice(i1Il11, -1, ll1IIl[i1Il11]));
  }
  if (Il1li) ll1IIl = iiliiI;
}
function l111II(il1lli, IIi1Il) {
  IIi1Il != 0 && il1lli.unshift(il1lli.splice(IIi1Il, 1)[0]);
}
function IiIII1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(ll1IIl, ll1IIl));
    return;
  }
  console.log("当前已设置白名单：");
  const I11Ill = Array.from(new Set($.whitelist.split("&")));
  console.log(I11Ill.join("&") + "\n");
  let IlII1l = [],
    IiIIll = I11Ill;
  for (let Il11Il in ll1IIl) {
    let i111Il = decodeURIComponent(ll1IIl[Il11Il].match(/pt_pin=([^; ]+)(?=;?)/) && ll1IIl[Il11Il].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    IiIIll.includes(i111Il) && IlII1l.push(ll1IIl[Il11Il]);
  }
  helpCookiesArr = IlII1l;
  if (IiIIll.length > 1) for (let i111Ii in IiIIll) {
    let IlII1I = IiIIll[IiIIll.length - 1 - i111Ii];
    if (!IlII1I) continue;
    for (let IillI in helpCookiesArr) {
      let lIiil1 = decodeURIComponent(helpCookiesArr[IillI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[IillI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      IlII1I == lIiil1 && l111II(helpCookiesArr, IillI);
    }
  }
}