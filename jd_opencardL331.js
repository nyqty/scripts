/*
9.4-9.11 感恩有你 99聚惠
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 9.4-9.11 感恩有你 99聚惠 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#9.4-9.11 感恩有你 99聚惠
11 11 11 11 * jd_opencardL331.js, tag=9.4-9.11 感恩有你 99聚惠, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('9.4-9.11 感恩有你 99聚惠')
const iIiilII = $.isNode() ? require("./jdCookie.js") : "",
  Ili1IIIi = $.isNode() ? require("./sendNotify") : "";
let l1lIi11 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  l1iii1Ii = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const iii1Il1I = require("./function/krgetToken"),
  l1IiIIi1 = require("./function/krh5st"),
  IliIIiiI = require("./function/krwxSavePrize");
let I1lI11ii = "https://lzdz1-isv.isvjcloud.com",
  iIlllii = [],
  liIIi1Il = "",
  Iiil1I11 = {};
if ($.isNode()) {
  Object.keys(iIiilII).forEach(II11II11 => {
    iIlllii.push(iIiilII[II11II11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iIlllii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I1IIii11($.getdata("CookiesJD") || "[]").map(iIl11l1i => iIl11l1i.cookie)].filter(I11Il1iI => !!I11Il1iI);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let I1iIlII1 = "",
  IlIi1Ill = "",
  lll1lIlI = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  I11IilIl = "",
  IilIIII = "";
$.whitelist = process.env.jd_opencard_whitelist || I11IilIl;
$.blacklist = process.env.jd_opencard_blacklist || IilIIII;
IllIilli();
iiIliIli();
$.errMsgPin = [];
!(async () => {
  if (lll1lIlI === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!iIlllii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await I1ll1I1("http://code.kingran.cf/331.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[liiilli(0, authorCodeList.length)];else {
    let iliIi1ii = ["9a1362af000e442583b714b139dc5e83"];
    $.authorCode = iliIi1ii[liiilli(0, iliIi1ii.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "00de8798c16d46bca107fe4115b8d2ed";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let II1iiiII = 0; II1iiiII < iIlllii.length; II1iiiII++) {
    liIIi1Il = iIlllii[II1iiiII];
    originCookie = iIlllii[II1iiiII];
    if (liIIi1Il) {
      $.UserName = decodeURIComponent(liIIi1Il.match(/pt_pin=([^; ]+)(?=;?)/) && liIIi1Il.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = II1iiiII + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await Ii1lIili();
      await iillIIiI();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let lIIiIi1I = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + lIIiIi1I;
  }
  if ($.outFlag) {
    let iI11l1il = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + iI11l1il);
    if ($.isNode()) await Ili1IIIi.sendNotify("" + $.name, "" + iI11l1il);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(lll1l1II => $.logErr(lll1l1II)).finally(() => $.done());
async function iillIIiI() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    I1iIlII1 = "";
    $.Token = "";
    $.Pin = "";
    let l1I1iii = false;
    $.Token = await iii1Il1I(liIIi1Il, I1lI11ii);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await Iii1lIi1();
    if (IlIi1Ill == "") {
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
    await i1illl("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await i1illl("accessLogWithAD");
    await i1illl("activityContent");
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
    await i1illl("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await i1illl("checkOpenCard");
    await i1illl("taskRecord");
    await $.wait(1000);
    await i1illl("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          l1I1iii = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await I1lIIiiI();
          for (let iIll1lIl = 0; iIll1lIl < Array(2).length; iIll1lIl++) {
            if (iIll1lIl > 0) console.log("第" + iIll1lIl + "次 重新开卡");
            await liIllii1();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await i1illl("activityContent");
          await i1illl("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    !$.followShop && !$.outFlag && (console.log(""), await i1illl("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    if (l1iii1Ii) {
      if (!$.addCart && !$.outFlag) {
        await i1illl("addCart");
        await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
      }
    }
    console.log("去助力 -> " + $.shareUuid);
    await i1illl("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await i1illl("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    l1I1iii && (await i1illl("activityContent"));
    if (l1lIi11 + "" !== "0") {
      $.runFalag = true;
      let ii11illi = parseInt($.score / 100);
      l1lIi11 = parseInt(l1lIi11, 10);
      if (ii11illi > l1lIi11) ii11illi = l1lIi11;
      console.log("已设置抽奖次数为" + ii11illi + "次，当前有" + $.score + "金币");
      for (m = 1; ii11illi--; m++) {
        console.log("进行第" + m + "次抽奖");
        await i1illl("startDraw");
        if ($.runFalag == false) break;
        if (Number(ii11illi) <= 0) break;
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
    await i1illl("drawRecord");
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log("后面的号都会助力 -> " + $.shareUuid);
    }
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (IIlliI1l) {
    console.log(IIlliI1l);
  }
}
async function i1illl(IIillili) {
  if ($.outFlag) return;
  let lIi111I = "https://lzdz1-isv.isvjcloud.com",
    lIlil1I = "",
    I11lI1li = "POST";
  switch (IIillili) {
    case "getSimpleActInfoVo":
      url = lIi111I + "/dz/common/getSimpleActInfoVo", lIlil1I = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = lIi111I + "/customer/getMyPing", lIlil1I = "userId=1000003829&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = lIi111I + "/common/accessLogWithAD";
      let llllI1il = lIi111I + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      lIlil1I = "venderId=1000003829&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(llllI1il) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = lIi111I + "/wxActionCommon/getUserInfo", lIlil1I = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = lIi111I + "/dingzhi/joinCommon/activityContent", lIlil1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = lIi111I + "/dingzhi/joinCommon/drawContent", lIlil1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = lIi111I + "/dingzhi/joinCommon/taskInfo", lIlil1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = lIi111I + "/dingzhi/joinCommon/assist", lIlil1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = lIi111I + "/dingzhi/joinCommon/taskRecord", lIlil1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = lIi111I + "/dingzhi/joinCommon/doTask", lIlil1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = lIi111I + "/dingzhi/joinCommon/doTask", lIlil1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = lIi111I + "/dingzhi/joinCommon/doTask", lIlil1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = lIi111I + "/dingzhi/opencard/" + IIillili, lIlil1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (IIillili == "browseGoods") lIlil1I += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = lIi111I + "/dingzhi/opencard/" + IIillili;
      let IIliii1 = "",
        l1l1il1 = "";
      if (IIillili == "viewVideo") IIliii1 = 31, l1l1il1 = 31;else {
        if (IIillili == "visitSku") IIliii1 = 5, l1l1il1 = $.visitSkuValue || 5;else {
          if (IIillili == "toShop") IIliii1 = 14, l1l1il1 = $.toShopValue || 14;else IIillili == "addSku" && (IIliii1 = 2, l1l1il1 = $.addSkuValue || 2);
        }
      }
      lIlil1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + IIliii1 + "&taskValue=" + l1l1il1;
      break;
    case "drawRecord":
      url = lIi111I + "/dingzhi/joinCommon/drawRecord", lIlil1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = lIi111I + "/dingzhi/joinCommon/shareRecord", lIlil1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = lIi111I + "/dingzhi/joinCommon/startDraw", lIlil1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + IIillili);
  }
  let IIi1lili = IiliIi1l(url, lIlil1I, I11lI1li);
  return new Promise(async ilIiIl => {
    $.post(IIi1lili, (l1ll1l1i, l1iiIIl1, i1liiiil) => {
      try {
        IIl1i11I(l1iiIIl1);
        l1ll1l1i ? (l1iiIIl1 && typeof l1iiIIl1.statusCode != "undefined" && l1iiIIl1.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n"), console.log("" + $.toStr(l1ll1l1i, l1ll1l1i)), console.log("API请求失败，请检查网路重试")) : I11IIiIl(IIillili, i1liiiil);
      } catch (I1I1II1I) {
        console.log(I1I1II1I, l1iiIIl1);
      } finally {
        ilIiIl();
      }
    });
  });
}
async function I11IIiIl(i1IIi1, lill1llI) {
  let li1iili = "";
  try {
    (i1IIi1 != "accessLogWithAD" || i1IIi1 != "drawContent") && lill1llI && (li1iili = JSON.parse(lill1llI));
  } catch (i1i1111i) {
    console.log("执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (i1IIi1) {
      case "getSimpleActInfoVo":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) {
            if (typeof li1iili.data.shopId != "undefined") $.shopId = li1iili.data.shopId;
            if (typeof li1iili.data.venderId != "undefined") $.venderId = li1iili.data.venderId;
          } else li1iili.errorMessage ? console.log("" + (li1iili.errorMessage || "")) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "getMyPing":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) {
            if (li1iili.data && typeof li1iili.data.secretPin != "undefined") $.Pin = li1iili.data.secretPin;
            if (li1iili.data && typeof li1iili.data.nickname != "undefined") $.nickname = li1iili.data.nickname;
          } else {
            if (li1iili.errorMessage) {
              console.log("" + (li1iili.errorMessage || ""));
              $.errMsgPin.push($.UserName);
            } else console.log("" + lill1llI);
          }
        } else console.log("" + lill1llI);
        break;
      case "getUserInfo":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) {
            if (li1iili.data && typeof li1iili.data.yunMidImageUrl != "undefined") $.attrTouXiang = li1iili.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else li1iili.errorMessage ? console.log("" + (li1iili.errorMessage || "")) : console.log("" + lill1llI);
        } else {
          console.log("" + lill1llI);
        }
        break;
      case "activityContent":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) {
            $.endTime = li1iili.data.endTime || li1iili.data.activityVo && li1iili.data.activityVo.endTime || li1iili.data.activity.endTime || 0;
            $.hasEnd = li1iili.data.isEnd || false;
            $.score = li1iili.data.actorInfo.score || 0;
            $.actorUuid = li1iili.data.actorInfo.uuid || "";
            $.assistCount = li1iili.data.actorInfo.assistCount || 0;
          } else li1iili.errorMessage ? console.log("" + (li1iili.errorMessage || "")) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "assist":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) $.assistState = li1iili.data.assistState || 0, $.allOpenCard = li1iili.data.openCardInfo.openAll || false, $.openVenderId = li1iili.data.openCardInfo.openVenderId || [], li1iili?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (li1iili?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");else li1iili.errorMessage ? console.log("" + (li1iili.errorMessage || "")) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "taskRecord":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) $.followShop = li1iili.data["20"].recordCount || 0, $.addCart = li1iili.data["23"].recordCount || 0, $.visitSku = li1iili.data["10"].recordCount || 0;else li1iili.errorMessage ? console.log("" + (li1iili.errorMessage || "")) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "checkOpenCard":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) {
            let iIiIilIl = li1iili.data["10"].settingInfo || [],
              iIliiI1I = li1iili.data.cardList || [],
              llI1llll = li1iili.data.openCardList || [];
            $.openList = [...iIliiI1I, ...iIiIilIl, ...llI1llll];
            $.openCardScore1 = li1iili.data.score1 || 0;
            $.openCardScore2 = li1iili.data.score2 || 0;
            $.drawScore = li1iili.data.drawScore || 0;
            if (li1iili.data.beans || li1iili.data.addBeanNum) console.log("开卡获得：" + (li1iili.data.beans || li1iili.data.addBeanNum) + "京豆 🐶");
          } else li1iili.errorMessage ? console.log("" + (li1iili.errorMessage || "")) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "addSku":
      case "followShop":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) console.log("完成任务,获得" + (li1iili?.["data"]?.["beans"] || 0) + "京豆, " + (li1iili?.["data"]?.["score"] || 0) + "金币");else li1iili.errorMessage ? console.log("" + (li1iili.errorMessage || "")) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "startDraw":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) {
            if (typeof li1iili.data == "object") {
              drawInfo = li1iili.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = li1iili.data.addressId, prizeName = drawInfo.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let l1i1lI1I = await IliIIiiI("https://lzdz1-isv.isvjcloud.com", liIIi1Il, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  l1i1lI1I ? $.isNode() && (await Ili1IIIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await Ili1IIIi.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await Ili1IIIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else console.log("" + lill1llI);
          } else li1iili.errorMessage ? ($.runFalag = false, console.log("" + (li1iili.errorMessage || ""))) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) {
            if (typeof li1iili.data == "object") {
              let i1i1IiII = "",
                lIlllil1 = "抽奖";
              li1iili.data.addBeanNum && (i1i1IiII = li1iili.data.addBeanNum + "京豆");
              li1iili.data.addPoint && (i1i1IiII += " " + li1iili.data.addPoint + "游戏机会");
              if (i1IIi1 == "followShop") {
                lIlllil1 = "关注";
                if (li1iili.data.beans != "0") {
                  i1i1IiII += li1iili.data.beans + "京豆 🐶";
                }
              } else {
                if (i1IIi1 == "addSku" || i1IIi1 == "addCart") lIlllil1 = "加购", li1iili.data.beans != "0" && (i1i1IiII += li1iili.data.beans + "京豆 🐶");else {
                  if (i1IIi1 == "viewVideo") lIlllil1 = "热门文章";else {
                    if (i1IIi1 == "toShop") {
                      lIlllil1 = "浏览店铺";
                    } else {
                      if (i1IIi1 == "visitSku" || i1IIi1 == "browseGoods") {
                        lIlllil1 = "浏览商品";
                      } else {
                        if (i1IIi1 == "sign") {
                          lIlllil1 = "签到";
                        } else {
                          let Ilili1ii = typeof li1iili.data.drawOk === "object" && li1iili.data.drawOk || li1iili.data;
                          i1i1IiII = Ilili1ii.drawOk == true && Ilili1ii.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !i1i1IiII && (i1i1IiII = "空气 💨");
              console.log(lIlllil1 + "获得：" + (i1i1IiII || lill1llI));
            } else console.log("" + lill1llI);
          } else li1iili.errorMessage ? ($.runFalag = false, console.log("" + (li1iili.errorMessage || ""))) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "drawRecord":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true) {
            let i1lI1i = 0;
            for (let iIillIl of li1iili.data) {
              infoType = iIillIl.infoType;
              infoName = iIillIl.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", "")), i1lI1i += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~"), await Ili1IIIi.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName), await Ili1IIIi.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            if (i1lI1i > 0) {
              console.log("当前累计获得 " + i1lI1i + " 京豆 🐶");
            }
          } else li1iili.errorMessage ? console.log("" + (li1iili.errorMessage || "")) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "getShareRecord":
        if (typeof li1iili == "object") {
          if (li1iili.result && li1iili.result === true && li1iili.data) $.ShareCount = li1iili.data.shareList.length, $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");else li1iili.errorMessage ? console.log("" + (li1iili.errorMessage || "")) : console.log("" + lill1llI);
        } else console.log("" + lill1llI);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(i1IIi1 + "-> " + lill1llI);
    }
    typeof li1iili == "object" && li1iili.errorMessage && li1iili.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (iiiIllIi) {
    console.log(iiiIllIi);
  }
}
function IiliIi1l(ll1iI1l, I1ill11l, iI11iIII = "POST") {
  let liIIi1l = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": liIIi1Il,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (ll1iI1l.indexOf("https://lzdz1-isv.isvjcloud.com") > -1) {
    liIIi1l.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
    liIIi1l.Cookie = "" + (I1iIlII1 && I1iIlII1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + IlIi1Ill;
  }
  return {
    "url": ll1iI1l,
    "method": iI11iIII,
    "headers": liIIi1l,
    "body": I1ill11l,
    "timeout": 30000
  };
}
function Iii1lIi1() {
  return new Promise(II1llli => {
    let iii1l1i = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iii1l1i, async (ii1iI1, iii1ll11, IIlI1iII) => {
      try {
        if (ii1iI1) {
          if (iii1ll11 && typeof iii1ll11.statusCode != "undefined") {}
          console.log("" + $.toStr(ii1iI1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iIiIl11 = IIlI1iII.match(/(活动已经结束)/) && IIlI1iII.match(/(活动已经结束)/)[1] || "";
          iIiIl11 && ($.activityEnd = true, console.log("活动已结束"));
          IIl1i11I(iii1ll11);
        }
      } catch (iII1Iiil) {
        $.logErr(iII1Iiil, iii1ll11);
      } finally {
        II1llli();
      }
    });
  });
}
function IIl1i11I(IlIlIii) {
  if (IlIlIii) {
    if (IlIlIii.headers["set-cookie"]) {
      liIIi1Il = originCookie + ";";
      for (let i1IlIi1l of IlIlIii.headers["set-cookie"]) {
        Iiil1I11[i1IlIi1l.split(";")[0].substr(0, i1IlIi1l.split(";")[0].indexOf("="))] = i1IlIi1l.split(";")[0].substr(i1IlIi1l.split(";")[0].indexOf("=") + 1);
      }
      for (const lIlii1 of Object.keys(Iiil1I11)) {
        liIIi1Il += lIlii1 + "=" + Iiil1I11[lIlii1] + ";";
      }
      IlIi1Ill = liIIi1Il;
    }
  }
}
function illI1lii(iiiilli1) {
  iiiilli1 = iiiilli1 || 32;
  let iIiiIlii = "abcdef0123456789",
    Iiil1liI = iIiiIlii.length,
    IiliIli = "";
  for (i = 0; i < iiiilli1; i++) IiliIli += iIiiIlii.charAt(Math.floor(Math.random() * Iiil1liI));
  return IiliIli;
}
function I1IIii11(II11I1lI) {
  if (typeof II11I1lI == "string") {
    try {
      return JSON.parse(II11I1lI);
    } catch (i1l1IIIl) {
      return console.log(i1l1IIIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function liIllii1() {
  if (!$.joinVenderId) return;
  return new Promise(async iII1IilI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l11iiiII = "";
    if ($.shopactivityId) l11iiiII = ",\"activityId\":" + $.shopactivityId;
    const i11IlIII = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l11iiiII + ",\"channel\":406}",
      I1iIi1i1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i11IlIII)
      },
      lii1li1I = await l1IiIIi1("8adfb", I1iIi1i1),
      IlIIlilI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i11IlIII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lii1li1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": liIIi1Il,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IlIIlilI, async (lllllI1I, ll1IlIii, I1Iliil1) => {
      try {
        if (lllllI1I) ll1IlIii && typeof ll1IlIii.statusCode != "undefined" && ll1IlIii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          I1Iliil1 = I1Iliil1 && I1Iliil1.match(/jsonp_.*?\((.*?)\);/) && I1Iliil1.match(/jsonp_.*?\((.*?)\);/)[1] || I1Iliil1;
          let l1li1l = $.toObj(I1Iliil1, I1Iliil1);
          if (l1li1l && typeof l1li1l == "object") {
            if (l1li1l && l1li1l.success === true) {
              console.log(" >> " + l1li1l.message);
              $.errorJoinShop = l1li1l.message;
              if (l1li1l.result && l1li1l.result.giftInfo) for (let IiIililI of l1li1l.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + IiIililI.discountString + IiIililI.prizeName + IiIililI.secondLineDesc);
              }
            } else l1li1l && typeof l1li1l == "object" && l1li1l.message ? ($.errorJoinShop = l1li1l.message, console.log("" + (l1li1l.message || ""))) : console.log(I1Iliil1);
          } else console.log(I1Iliil1);
        }
      } catch (I1IlI1i) {
        $.logErr(I1IlI1i, ll1IlIii);
      } finally {
        iII1IilI();
      }
    });
  });
}
async function I1lIIiiI() {
  return new Promise(async llllI11l => {
    const IIIi1iII = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      llI1I1lI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIIi1iII)
      },
      li1i1i1i = await l1IiIIi1("8adfb", llI1I1lI),
      I1ii11Il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IIIi1iII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(li1i1i1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": liIIi1Il,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1ii11Il, async (lI1l1111, li1IlllI, lIlllIIl) => {
      try {
        if (lI1l1111) li1IlllI && typeof li1IlllI.statusCode != "undefined" && li1IlllI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          lIlllIIl = lIlllIIl && lIlllIIl.match(/jsonp_.*?\((.*?)\);/) && lIlllIIl.match(/jsonp_.*?\((.*?)\);/)[1] || lIlllIIl;
          let IlilI1iI = $.toObj(lIlllIIl, lIlllIIl);
          IlilI1iI && typeof IlilI1iI == "object" ? IlilI1iI && IlilI1iI.success == true && (console.log("去加入：" + (IlilI1iI.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = IlilI1iI.result.interestsRuleList && IlilI1iI.result.interestsRuleList[0] && IlilI1iI.result.interestsRuleList[0].interestsInfo && IlilI1iI.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(lIlllIIl);
        }
      } catch (ilI1IiI) {
        $.logErr(ilI1IiI, li1IlllI);
      } finally {
        llllI11l();
      }
    });
  });
}
function I1ll1I1(lI111iil) {
  return new Promise(l1i1Il11 => {
    const ii1Ii1i = {
      "url": "" + lI111iil,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ii1Ii1i, async (liiIi1I1, i1li1iI, iilll1I1) => {
      try {
        if (liiIi1I1) {} else iilll1I1 ? iilll1I1 = JSON.parse(iilll1I1) : console.log("未获取到数据,请重新运行");
      } catch (IIilliiI) {
        $.logErr(IIilliiI, i1li1iI);
        iilll1I1 = null;
      } finally {
        l1i1Il11(iilll1I1);
      }
    });
  });
}
function liiilli(l1iilI, llilI1il) {
  return Math.floor(Math.random() * (llilI1il - l1iilI)) + l1iilI;
}
async function Ii1lIili() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + illI1lii(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function iiIliIli() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const Il1l1l1 = Array.from(new Set($.blacklist.split("&")));
  console.log(Il1l1l1.join("&") + "\n");
  let IIiI1l1I = Il1l1l1,
    il11i11I = [],
    IliiiIli = false;
  for (let lill1IiI = 0; lill1IiI < iIlllii.length; lill1IiI++) {
    let l1lI1Ii1 = decodeURIComponent(iIlllii[lill1IiI].match(/pt_pin=([^; ]+)(?=;?)/) && iIlllii[lill1IiI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!l1lI1Ii1) break;
    let iiil1II = false;
    for (let ilIli1ii of IIiI1l1I) {
      if (ilIli1ii && ilIli1ii == l1lI1Ii1) {
        iiil1II = true;
        break;
      }
    }
    !iiil1II && (IliiiIli = true, il11i11I.splice(lill1IiI, -1, iIlllii[lill1IiI]));
  }
  if (IliiiIli) iIlllii = il11i11I;
}
function IiiIii1I(ilI1Ii1, lII1llI1) {
  lII1llI1 != 0 && ilI1Ii1.unshift(ilI1Ii1.splice(lII1llI1, 1)[0]);
}
function IllIilli() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(iIlllii, iIlllii));
    return;
  }
  console.log("当前已设置白名单：");
  const I1l1II = Array.from(new Set($.whitelist.split("&")));
  console.log(I1l1II.join("&") + "\n");
  let lIliliIi = [],
    ii1i1I1I = I1l1II;
  for (let I1i1lIll in iIlllii) {
    let i1liiiII = decodeURIComponent(iIlllii[I1i1lIll].match(/pt_pin=([^; ]+)(?=;?)/) && iIlllii[I1i1lIll].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (ii1i1I1I.includes(i1liiiII)) {
      lIliliIi.push(iIlllii[I1i1lIll]);
    }
  }
  helpCookiesArr = lIliliIi;
  if (ii1i1I1I.length > 1) {
    for (let il1i111l in ii1i1I1I) {
      let illiIiii = ii1i1I1I[ii1i1I1I.length - 1 - il1i111l];
      if (!illiIiii) continue;
      for (let ii11Iii in helpCookiesArr) {
        let Illi1l = decodeURIComponent(helpCookiesArr[ii11Iii].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[ii11Iii].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        illiIiii == Illi1l && IiiIii1I(helpCookiesArr, ii11Iii);
      }
    }
  }
}