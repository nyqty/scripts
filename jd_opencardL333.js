/*
9.12-9.18 秋妆美礼 好物惊喜
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 9.12-9.18 秋妆美礼 好物惊喜 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#9.12-9.18 秋妆美礼 好物惊喜
11 11 11 11 * jd_opencardL333.js, tag=9.12-9.18 秋妆美礼 好物惊喜, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('9.12-9.18 秋妆美礼 好物惊喜')
const IIIlI1Ii = $.isNode() ? require("./jdCookie.js") : "",
  lIi11li1 = $.isNode() ? require("./sendNotify") : "";
let IIiiIi1 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  IiIIi1i1 = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const il1il1I1 = require("./function/krgetToken"),
  iliII1i1 = require("./function/krh5st"),
  llIllIii = require("./function/krwxSavePrize");
let Il1llIiI = "https://lzdz1-isv.isvjcloud.com",
  lI1IIiI = [],
  iilii1Il = "",
  Il1IIli1 = {};
if ($.isNode()) {
  Object.keys(IIIlI1Ii).forEach(lil1IlI => {
    lI1IIiI.push(IIIlI1Ii[lil1IlI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lI1IIiI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIIIIl($.getdata("CookiesJD") || "[]").map(l11I1i1i => l11I1i1i.cookie)].filter(IlIIilil => !!IlIIilil);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let ilI11lli = "",
  l1lI1lII = "",
  lIlIlIIl = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  IiIIII1I = "",
  Il1l = "";
$.whitelist = process.env.jd_opencard_whitelist || IiIIII1I;
$.blacklist = process.env.jd_opencard_blacklist || Il1l;
l1Iil1II();
iiI111Il();
$.errMsgPin = [];
!(async () => {
  if (lIlIlIIl === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!lI1IIiI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await l1iiIl1l("http://code.kingran.cf/333.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[Iiil11I(0, authorCodeList.length)];else {
    let I1IiiII = ["e59dc0f1f11246678be03bf6304c246e", "aad94b8de53e4209bfdef03efde4eee6"];
    $.authorCode = I1IiiII[Iiil11I(0, I1IiiII.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "8036fbc67e784f81a807034147c21dc4";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let I11liI11 = 0; I11liI11 < lI1IIiI.length; I11liI11++) {
    iilii1Il = lI1IIiI[I11liI11];
    originCookie = lI1IIiI[I11liI11];
    if (iilii1Il) {
      $.UserName = decodeURIComponent(iilii1Il.match(/pt_pin=([^; ]+)(?=;?)/) && iilii1Il.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I11liI11 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await I1llIii1();
      await l11iiIl();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let i1iI11i = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + i1iI11i;
  }
  if ($.outFlag) {
    let Ii1iI1i1 = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + Ii1iI1i1);
    if ($.isNode()) await lIi11li1.sendNotify("" + $.name, "" + Ii1iI1i1);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(i1I1ii1 => $.logErr(i1I1ii1)).finally(() => $.done());
async function l11iiIl() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    ilI11lli = "";
    $.Token = "";
    $.Pin = "";
    let llIIi1ll = false;
    $.Token = await il1il1I1(iilii1Il, Il1llIiI);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await l1liIl1();
    if (l1lI1lII == "") {
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
    await li1Ili11("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await li1Ili11("accessLogWithAD");
    await li1Ili11("activityContent");
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
    await li1Ili11("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await li1Ili11("checkOpenCard");
    await li1Ili11("taskRecord");
    await $.wait(1000);
    await li1Ili11("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          llIIi1ll = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await I1lliiIi();
          for (let Ii1I1iII = 0; Ii1I1iII < Array(2).length; Ii1I1iII++) {
            if (Ii1I1iII > 0) console.log("第" + Ii1I1iII + "次 重新开卡");
            await liIil1i();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await li1Ili11("activityContent");
          await li1Ili11("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    !$.followShop && !$.outFlag && (console.log(""), await li1Ili11("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    IiIIi1i1 && !$.addCart && !$.outFlag && (await li1Ili11("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await li1Ili11("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await li1Ili11("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    llIIi1ll && (await li1Ili11("activityContent"));
    if (IIiiIi1 + "" !== "0") {
      $.runFalag = true;
      let il1liiI1 = parseInt($.score / 100);
      IIiiIi1 = parseInt(IIiiIi1, 10);
      if (il1liiI1 > IIiiIi1) il1liiI1 = IIiiIi1;
      console.log("已设置抽奖次数为" + il1liiI1 + "次，当前有" + $.score + "金币");
      for (m = 1; il1liiI1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await li1Ili11("startDraw");
        if ($.runFalag == false) break;
        if (Number(il1liiI1) <= 0) break;
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
    await li1Ili11("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (iiIiIII) {
    console.log(iiIiIII);
  }
}
async function li1Ili11(lillli1i) {
  if ($.outFlag) return;
  let iiIi1lii = "https://lzdz1-isv.isvjcloud.com",
    lIll1li1 = "",
    i1llIi1i = "POST";
  switch (lillli1i) {
    case "getSimpleActInfoVo":
      url = iiIi1lii + "/dz/common/getSimpleActInfoVo", lIll1li1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = iiIi1lii + "/customer/getMyPing", lIll1li1 = "userId=1000426499&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = iiIi1lii + "/common/accessLogWithAD";
      let i1iIIl1i = iiIi1lii + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      lIll1li1 = "venderId=1000426499&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(i1iIIl1i) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = iiIi1lii + "/wxActionCommon/getUserInfo", lIll1li1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = iiIi1lii + "/dingzhi/joinCommon/activityContent", lIll1li1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = iiIi1lii + "/dingzhi/joinCommon/drawContent", lIll1li1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = iiIi1lii + "/dingzhi/joinCommon/taskInfo", lIll1li1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = iiIi1lii + "/dingzhi/joinCommon/assist", lIll1li1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = iiIi1lii + "/dingzhi/joinCommon/taskRecord", lIll1li1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = iiIi1lii + "/dingzhi/joinCommon/doTask", lIll1li1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = iiIi1lii + "/dingzhi/joinCommon/doTask", lIll1li1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = iiIi1lii + "/dingzhi/joinCommon/doTask", lIll1li1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = iiIi1lii + "/dingzhi/opencard/" + lillli1i, lIll1li1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (lillli1i == "browseGoods") lIll1li1 += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = iiIi1lii + "/dingzhi/opencard/" + lillli1i;
      let iIl1111i = "",
        li1lI1ii = "";
      if (lillli1i == "viewVideo") iIl1111i = 31, li1lI1ii = 31;else {
        if (lillli1i == "visitSku") {
          iIl1111i = 5;
          li1lI1ii = $.visitSkuValue || 5;
        } else {
          if (lillli1i == "toShop") {
            iIl1111i = 14;
            li1lI1ii = $.toShopValue || 14;
          } else lillli1i == "addSku" && (iIl1111i = 2, li1lI1ii = $.addSkuValue || 2);
        }
      }
      lIll1li1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + iIl1111i + "&taskValue=" + li1lI1ii;
      break;
    case "drawRecord":
      url = iiIi1lii + "/dingzhi/joinCommon/drawRecord", lIll1li1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = iiIi1lii + "/dingzhi/joinCommon/shareRecord", lIll1li1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = iiIi1lii + "/dingzhi/joinCommon/startDraw", lIll1li1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + lillli1i);
  }
  let IllI1Ii = ilIIII1(url, lIll1li1, i1llIi1i);
  return new Promise(async iIiiII1l => {
    $.post(IllI1Ii, (iillIIii, l1I1I111, IiiiiiIl) => {
      try {
        Il1lll1i(l1I1I111);
        if (iillIIii) l1I1I111 && typeof l1I1I111.statusCode != "undefined" && l1I1I111.statusCode == 493 && console.log("此ip已被限制，请更换IP后再执行脚本\n"), console.log("" + $.toStr(iillIIii, iillIIii)), console.log("API请求失败，请检查网路重试");else {
          I1IiiIIi(lillli1i, IiiiiiIl);
        }
      } catch (i1IllliI) {
        console.log(i1IllliI, l1I1I111);
      } finally {
        iIiiII1l();
      }
    });
  });
}
async function I1IiiIIi(iIl1I1l1, lIli11i) {
  let l1ilI11 = "";
  try {
    (iIl1I1l1 != "accessLogWithAD" || iIl1I1l1 != "drawContent") && lIli11i && (l1ilI11 = JSON.parse(lIli11i));
  } catch (Il1iI1il) {
    console.log("执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (iIl1I1l1) {
      case "getSimpleActInfoVo":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) {
            if (typeof l1ilI11.data.shopId != "undefined") $.shopId = l1ilI11.data.shopId;
            if (typeof l1ilI11.data.venderId != "undefined") $.venderId = l1ilI11.data.venderId;
          } else l1ilI11.errorMessage ? console.log("" + (l1ilI11.errorMessage || "")) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "getMyPing":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) {
            if (l1ilI11.data && typeof l1ilI11.data.secretPin != "undefined") $.Pin = l1ilI11.data.secretPin;
            if (l1ilI11.data && typeof l1ilI11.data.nickname != "undefined") $.nickname = l1ilI11.data.nickname;
          } else l1ilI11.errorMessage ? (console.log("" + (l1ilI11.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "getUserInfo":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) {
            if (l1ilI11.data && typeof l1ilI11.data.yunMidImageUrl != "undefined") $.attrTouXiang = l1ilI11.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else l1ilI11.errorMessage ? console.log("" + (l1ilI11.errorMessage || "")) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "activityContent":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) $.endTime = l1ilI11.data.endTime || l1ilI11.data.activityVo && l1ilI11.data.activityVo.endTime || l1ilI11.data.activity.endTime || 0, $.hasEnd = l1ilI11.data.isEnd || false, $.score = l1ilI11.data.actorInfo.score || 0, $.actorUuid = l1ilI11.data.actorInfo.uuid || "", $.assistCount = l1ilI11.data.actorInfo.assistCount || 0;else l1ilI11.errorMessage ? console.log("" + (l1ilI11.errorMessage || "")) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "assist":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) {
            $.assistState = l1ilI11.data.assistState || 0;
            $.allOpenCard = l1ilI11.data.openCardInfo.openAll || false;
            $.openVenderId = l1ilI11.data.openCardInfo.openVenderId || [];
            if (l1ilI11?.["data"]?.["openCardInfo"]?.["hasNewOpen"]) {
              console.log("开卡获得了" + (l1ilI11?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
            }
          } else l1ilI11.errorMessage ? console.log("" + (l1ilI11.errorMessage || "")) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "taskRecord":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) {
            $.followShop = l1ilI11.data["20"].recordCount || 0;
            $.addCart = l1ilI11.data["23"].recordCount || 0;
            $.visitSku = l1ilI11.data["10"].recordCount || 0;
          } else l1ilI11.errorMessage ? console.log("" + (l1ilI11.errorMessage || "")) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "checkOpenCard":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) {
            let i1Iil1iI = l1ilI11.data["10"].settingInfo || [],
              iIii11lI = l1ilI11.data.cardList || [],
              iI1iiIl1 = l1ilI11.data.openCardList || [];
            $.openList = [...iIii11lI, ...i1Iil1iI, ...iI1iiIl1];
            $.openCardScore1 = l1ilI11.data.score1 || 0;
            $.openCardScore2 = l1ilI11.data.score2 || 0;
            $.drawScore = l1ilI11.data.drawScore || 0;
            if (l1ilI11.data.beans || l1ilI11.data.addBeanNum) console.log("开卡获得：" + (l1ilI11.data.beans || l1ilI11.data.addBeanNum) + "京豆 🐶");
          } else l1ilI11.errorMessage ? console.log("" + (l1ilI11.errorMessage || "")) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "addSku":
      case "followShop":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) console.log("完成任务,获得" + (l1ilI11?.["data"]?.["beans"] || 0) + "京豆, " + (l1ilI11?.["data"]?.["score"] || 0) + "金币");else l1ilI11.errorMessage ? console.log("" + (l1ilI11.errorMessage || "")) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "startDraw":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) {
            if (typeof l1ilI11.data == "object") {
              drawInfo = l1ilI11.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = l1ilI11.data.addressId, prizeName = drawInfo.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let I111l11i = await llIllIii("https://lzdz1-isv.isvjcloud.com", iilii1Il, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  if (I111l11i) {
                    $.isNode() && (await lIi11li1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId="));
                  } else $.isNode() && (await lIi11li1.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await lIi11li1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else console.log("" + lIli11i);
          } else l1ilI11.errorMessage ? ($.runFalag = false, console.log("" + (l1ilI11.errorMessage || ""))) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) {
            if (typeof l1ilI11.data == "object") {
              let lIliIili = "",
                ilIiIii = "抽奖";
              l1ilI11.data.addBeanNum && (lIliIili = l1ilI11.data.addBeanNum + "京豆");
              l1ilI11.data.addPoint && (lIliIili += " " + l1ilI11.data.addPoint + "游戏机会");
              if (iIl1I1l1 == "followShop") ilIiIii = "关注", l1ilI11.data.beans != "0" && (lIliIili += l1ilI11.data.beans + "京豆 🐶");else {
                if (iIl1I1l1 == "addSku" || iIl1I1l1 == "addCart") {
                  ilIiIii = "加购";
                  l1ilI11.data.beans != "0" && (lIliIili += l1ilI11.data.beans + "京豆 🐶");
                } else {
                  if (iIl1I1l1 == "viewVideo") ilIiIii = "热门文章";else {
                    if (iIl1I1l1 == "toShop") {
                      ilIiIii = "浏览店铺";
                    } else {
                      if (iIl1I1l1 == "visitSku" || iIl1I1l1 == "browseGoods") {
                        ilIiIii = "浏览商品";
                      } else {
                        if (iIl1I1l1 == "sign") ilIiIii = "签到";else {
                          let IiliiI1i = typeof l1ilI11.data.drawOk === "object" && l1ilI11.data.drawOk || l1ilI11.data;
                          lIliIili = IiliiI1i.drawOk == true && IiliiI1i.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !lIliIili && (lIliIili = "空气 💨");
              console.log(ilIiIii + "获得：" + (lIliIili || lIli11i));
            } else console.log("" + lIli11i);
          } else l1ilI11.errorMessage ? ($.runFalag = false, console.log("" + (l1ilI11.errorMessage || ""))) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "drawRecord":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true) {
            let iIIilI1i = 0;
            for (let IliiiilI of l1ilI11.data) {
              infoType = IliiiilI.infoType;
              infoName = IliiiilI.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", "")), iIIilI1i += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~"), await lIi11li1.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName), await lIi11li1.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            if (iIIilI1i > 0) {
              console.log("当前累计获得 " + iIIilI1i + " 京豆 🐶");
            }
          } else l1ilI11.errorMessage ? console.log("" + (l1ilI11.errorMessage || "")) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "getShareRecord":
        if (typeof l1ilI11 == "object") {
          if (l1ilI11.result && l1ilI11.result === true && l1ilI11.data) {
            $.ShareCount = l1ilI11.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else l1ilI11.errorMessage ? console.log("" + (l1ilI11.errorMessage || "")) : console.log("" + lIli11i);
        } else console.log("" + lIli11i);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(iIl1I1l1 + "-> " + lIli11i);
    }
    typeof l1ilI11 == "object" && l1ilI11.errorMessage && l1ilI11.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (IlIlI111) {
    console.log(IlIlI111);
  }
}
function ilIIII1(i11lIlII, lIIIl1li, l11Ilili = "POST") {
  let IlIiIIII = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iilii1Il,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i11lIlII.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (IlIiIIII.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, IlIiIIII.Cookie = "" + (ilI11lli && ilI11lli || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + l1lI1lII), {
    "url": i11lIlII,
    "method": l11Ilili,
    "headers": IlIiIIII,
    "body": lIIIl1li,
    "timeout": 30000
  };
}
function l1liIl1() {
  return new Promise(IlIIiilI => {
    let lIi111I1 = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(lIi111I1, async (llIiIiil, lIlliIil, liiIi1li) => {
      try {
        if (llIiIiil) {
          if (lIlliIil && typeof lIlliIil.statusCode != "undefined") {}
          console.log("" + $.toStr(llIiIiil));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IiiI1lI1 = liiIi1li.match(/(活动已经结束)/) && liiIi1li.match(/(活动已经结束)/)[1] || "";
          IiiI1lI1 && ($.activityEnd = true, console.log("活动已结束"));
          Il1lll1i(lIlliIil);
        }
      } catch (il1iIli1) {
        $.logErr(il1iIli1, lIlliIil);
      } finally {
        IlIIiilI();
      }
    });
  });
}
function Il1lll1i(llIlllIl) {
  if (llIlllIl) {
    if (llIlllIl.headers["set-cookie"]) {
      iilii1Il = originCookie + ";";
      for (let i1liI11i of llIlllIl.headers["set-cookie"]) {
        Il1IIli1[i1liI11i.split(";")[0].substr(0, i1liI11i.split(";")[0].indexOf("="))] = i1liI11i.split(";")[0].substr(i1liI11i.split(";")[0].indexOf("=") + 1);
      }
      for (const l1i11li of Object.keys(Il1IIli1)) {
        iilii1Il += l1i11li + "=" + Il1IIli1[l1i11li] + ";";
      }
      l1lI1lII = iilii1Il;
    }
  }
}
function l1lIIIli(IIl11Ii) {
  IIl11Ii = IIl11Ii || 32;
  let llIiil1 = "abcdef0123456789",
    lIiiIi1 = llIiil1.length,
    IliIllli = "";
  for (i = 0; i < IIl11Ii; i++) IliIllli += llIiil1.charAt(Math.floor(Math.random() * lIiiIi1));
  return IliIllli;
}
function lIIIIl(I11I1l1l) {
  if (typeof I11I1l1l == "string") try {
    return JSON.parse(I11I1l1l);
  } catch (I1llI1i1) {
    return console.log(I1llI1i1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function liIil1i() {
  if (!$.joinVenderId) return;
  return new Promise(async iiiiiI1i => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lliIi1II = "";
    if ($.shopactivityId) lliIi1II = ",\"activityId\":" + $.shopactivityId;
    const iiliiiI1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lliIi1II + ",\"channel\":406}",
      lliIli = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iiliiiI1)
      },
      liIlli1i = await iliII1i1("27004", lliIli),
      i1iIi1l1 = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + iiliiiI1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(liIlli1i),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": iilii1Il
        }
      };
    $.get(i1iIi1l1, async (ililIIll, IIlIli1i, liiIilii) => {
      try {
        if (ililIIll) console.log(ililIIll);else {
          const i11iilii = JSON.parse(liiIilii);
          if (typeof i11iilii === "object") {
            if (i11iilii.success === true) {
              console.log(i11iilii.message);
              $.errorJoinShop = i11iilii.message;
              if (i11iilii.result && i11iilii.result.giftInfo) for (let iiIlilII of i11iilii.result.giftInfo.giftList) {
                console.log("入会获得：" + iiIlilII.discountString + iiIlilII.prizeName + iiIlilII.secondLineDesc);
              }
            } else typeof i11iilii == "object" && i11iilii.message ? ($.errorJoinShop = i11iilii.message, console.log("" + (i11iilii.message || ""))) : console.log(liiIilii);
          } else console.log(liiIilii);
        }
      } catch (lli1I) {
        $.logErr(lli1I, IIlIli1i);
      } finally {
        iiiiiI1i();
      }
    });
  });
}
async function I1lliiIi() {
  return new Promise(async i1lI1iI1 => {
    let il1IilIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iIiIilll = {
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(il1IilIi)
      },
      l11I1il = await iliII1i1("27004", iIiIilll),
      iI1l1iii = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + il1IilIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11I1il),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": iilii1Il
        }
      };
    $.get(iI1l1iii, async (IIlliIi, Il1i1liI, lIl1lIIi) => {
      try {
        if (IIlliIi) console.log(IIlliIi);else {
          const lllI1ilI = JSON.parse(lIl1lIIi);
          typeof lllI1ilI === "object" ? lllI1ilI.success === true && (console.log("去加入：" + (lllI1ilI.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = lllI1ilI.result.interestsRuleList && lllI1ilI.result.interestsRuleList[0] && lllI1ilI.result.interestsRuleList[0].interestsInfo && lllI1ilI.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = lllI1ilI.result.userInfo.openCardStatus) : console.log(lIl1lIIi);
        }
      } catch (lililiii) {
        $.logErr(lililiii, Il1i1liI);
      } finally {
        i1lI1iI1();
      }
    });
  });
}
function l1iiIl1l(l1IilIIi) {
  return new Promise(iIllIii1 => {
    const IlIiIiil = {
      "url": "" + l1IilIIi,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IlIiIiil, async (liliIIlI, l1IiiI1i, Ii1iIIIl) => {
      try {
        if (liliIIlI) {} else {
          if (Ii1iIIIl) {
            Ii1iIIIl = JSON.parse(Ii1iIIIl);
          } else console.log("未获取到数据,请重新运行");
        }
      } catch (Iii1IliI) {
        $.logErr(Iii1IliI, l1IiiI1i);
        Ii1iIIIl = null;
      } finally {
        iIllIii1(Ii1iIIIl);
      }
    });
  });
}
function Iiil11I(iIiIli11, li1l1II) {
  return Math.floor(Math.random() * (li1l1II - iIiIli11)) + iIiIli11;
}
async function I1llIii1() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + l1lIIIli(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function iiI111Il() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lii1lI11 = Array.from(new Set($.blacklist.split("&")));
  console.log(lii1lI11.join("&") + "\n");
  let i1l1i1I = lii1lI11,
    I11I1llI = [],
    IIl1Iiii = false;
  for (let iIIIi1lI = 0; iIIIi1lI < lI1IIiI.length; iIIIi1lI++) {
    let i1i1lIli = decodeURIComponent(lI1IIiI[iIIIi1lI].match(/pt_pin=([^; ]+)(?=;?)/) && lI1IIiI[iIIIi1lI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!i1i1lIli) break;
    let lliilI11 = false;
    for (let lli1iIil of i1l1i1I) {
      if (lli1iIil && lli1iIil == i1i1lIli) {
        lliilI11 = true;
        break;
      }
    }
    !lliilI11 && (IIl1Iiii = true, I11I1llI.splice(iIIIi1lI, -1, lI1IIiI[iIIIi1lI]));
  }
  if (IIl1Iiii) lI1IIiI = I11I1llI;
}
function llIi1l1I(lIi1111, lIiilI1I) {
  lIiilI1I != 0 && lIi1111.unshift(lIi1111.splice(lIiilI1I, 1)[0]);
}
function l1Iil1II() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(lI1IIiI, lI1IIiI));
    return;
  }
  console.log("当前已设置白名单：");
  const l1ili1II = Array.from(new Set($.whitelist.split("&")));
  console.log(l1ili1II.join("&") + "\n");
  let ll11i1iI = [],
    IIIi1iIi = l1ili1II;
  for (let iIi1l1I in lI1IIiI) {
    let il1iil1 = decodeURIComponent(lI1IIiI[iIi1l1I].match(/pt_pin=([^; ]+)(?=;?)/) && lI1IIiI[iIi1l1I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    IIIi1iIi.includes(il1iil1) && ll11i1iI.push(lI1IIiI[iIi1l1I]);
  }
  helpCookiesArr = ll11i1iI;
  if (IIIi1iIi.length > 1) {
    for (let II1IillI in IIIi1iIi) {
      let ill1IIll = IIIi1iIi[IIIi1iIi.length - 1 - II1IillI];
      if (!ill1IIll) continue;
      for (let lIliiliI in helpCookiesArr) {
        let I1111lll = decodeURIComponent(helpCookiesArr[lIliiliI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lIliiliI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        ill1IIll == I1111lll && llIi1l1I(helpCookiesArr, lIliiliI);
      }
    }
  }
}