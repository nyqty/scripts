/*
9.26-10.2 好酒不见 佳肴思念
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 9.26-10.2 好酒不见 佳肴思念 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#9.26-10.2 好酒不见 佳肴思念
11 11 11 11 * jd_opencardL336.js, tag=9.26-10.2 好酒不见 佳肴思念, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('9.26-10.2 好酒不见 佳肴思念')
const i1Iiil1l = $.isNode() ? require("./jdCookie.js") : "",
  ilIl = $.isNode() ? require("./sendNotify") : "";
let i1iil1iI = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  I1Iill1l = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const illI1l1I = require("./function/krgetToken"),
  Il1ii11l = require("./function/krh5st"),
  ii11IIil = require("./function/jdCommon"),
  llIlIIII = require("./function/krwxSavePrize");
let iii111ii = "https://lzdz1-isv.isvjcloud.com",
  IllIl1II = [],
  I1ilIi1I = "",
  i1i1lli = {};
if ($.isNode()) {
  Object.keys(i1Iiil1l).forEach(I1ll1l11 => {
    IllIl1II.push(i1Iiil1l[I1ll1l11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IllIl1II = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IlliIl1($.getdata("CookiesJD") || "[]").map(lii11I1l => lii11I1l.cookie)].filter(IllIIIiI => !!IllIIIiI);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let IIIi1IlI = "",
  iIiIi11i = "",
  lii1iIII = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  IIl111i1 = "",
  II11IIl1 = "";
$.whitelist = process.env.jd_opencard_whitelist || IIl111i1;
$.blacklist = process.env.jd_opencard_blacklist || II11IIl1;
llliIl11();
Il1iIli1();
$.errMsgPin = [];
!(async () => {
  if (lii1iIII === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!IllIl1II[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await liI1IiII("http://code.kingran.cf/336.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[IiI1iIi(0, authorCodeList.length)];else {
    let IIlIIiii = ["982e1be89ccf46438bd14914d029305c", "c63efc6a79f149e69e783c2b8d2b91e1"];
    $.authorCode = IIlIIiii[IiI1iIi(0, IIlIIiii.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "90274ad2e62a4d92a515527547275d41";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let iIi1iIII = 0; iIi1iIII < IllIl1II.length; iIi1iIII++) {
    I1ilIi1I = IllIl1II[iIi1iIII];
    originCookie = IllIl1II[iIi1iIII];
    if (I1ilIi1I) {
      $.UserName = decodeURIComponent(I1ilIi1I.match(/pt_pin=([^; ]+)(?=;?)/) && I1ilIi1I.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIi1iIII + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = ii11IIil.genUA($.UserName);
      await ii1iIlIi();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let I11lill1 = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + I11lill1;
  }
  if ($.outFlag) {
    let ilIIl1 = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + ilIIl1);
    if ($.isNode()) await ilIl.sendNotify("" + $.name, "" + ilIIl1);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(iliIIii => $.logErr(iliIIii)).finally(() => $.done());
async function ii1iIlIi() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    IIIi1IlI = "";
    $.Token = "";
    $.Pin = "";
    let li11iIII = false;
    $.Token = await illI1l1I(I1ilIi1I, iii111ii);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await lIi1lii1();
    if (iIiIi11i == "") {
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
    await ii1lll("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await ii1lll("accessLogWithAD");
    await ii1lll("activityContent");
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
    await ii1lll("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await ii1lll("checkOpenCard");
    await ii1lll("taskRecord");
    await $.wait(1000);
    await ii1lll("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          li11iIII = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await iliIl1iI();
          for (let l1111ii = 0; l1111ii < Array(2).length; l1111ii++) {
            if (l1111ii > 0) console.log("第" + l1111ii + "次 重新开卡");
            await lII111l1();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await ii1lll("activityContent");
          await ii1lll("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    if (!$.followShop && !$.outFlag) {
      console.log("");
      await ii1lll("followShop");
      await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
    }
    I1Iill1l && !$.addCart && !$.outFlag && (await ii1lll("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await ii1lll("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await ii1lll("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    li11iIII && (await ii1lll("activityContent"));
    if (i1iil1iI + "" !== "0") {
      $.runFalag = true;
      let Ii1Illil = parseInt($.score / 100);
      i1iil1iI = parseInt(i1iil1iI, 10);
      if (Ii1Illil > i1iil1iI) Ii1Illil = i1iil1iI;
      console.log("已设置抽奖次数为" + Ii1Illil + "次，当前有" + $.score + "金币");
      for (m = 1; Ii1Illil--; m++) {
        console.log("进行第" + m + "次抽奖");
        await ii1lll("startDraw");
        if ($.runFalag == false) break;
        if (Number(Ii1Illil) <= 0) break;
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
    await ii1lll("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (I1lllI1i) {
    console.log(I1lllI1i);
  }
}
async function ii1lll(iIi1iIl1) {
  if ($.outFlag) return;
  let l1lIiill = "https://lzdz1-isv.isvjcloud.com",
    liIIIli1 = "",
    iiIlIi11 = "POST";
  switch (iIi1iIl1) {
    case "getSimpleActInfoVo":
      url = l1lIiill + "/dz/common/getSimpleActInfoVo", liIIIli1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = l1lIiill + "/customer/getMyPing", liIIIli1 = "userId=1000090821&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = l1lIiill + "/common/accessLogWithAD";
      let i1ilii1 = l1lIiill + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      liIIIli1 = "venderId=1000090821&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(i1ilii1) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = l1lIiill + "/wxActionCommon/getUserInfo", liIIIli1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = l1lIiill + "/dingzhi/joinCommon/activityContent", liIIIli1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = l1lIiill + "/dingzhi/joinCommon/drawContent", liIIIli1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = l1lIiill + "/dingzhi/joinCommon/taskInfo", liIIIli1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = l1lIiill + "/dingzhi/joinCommon/assist", liIIIli1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = l1lIiill + "/dingzhi/joinCommon/taskRecord", liIIIli1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = l1lIiill + "/dingzhi/joinCommon/doTask", liIIIli1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = l1lIiill + "/dingzhi/joinCommon/doTask", liIIIli1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = l1lIiill + "/dingzhi/joinCommon/doTask", liIIIli1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = l1lIiill + "/dingzhi/opencard/" + iIi1iIl1, liIIIli1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (iIi1iIl1 == "browseGoods") liIIIli1 += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = l1lIiill + "/dingzhi/opencard/" + iIi1iIl1;
      let liilIiIl = "",
        i1i1llI = "";
      if (iIi1iIl1 == "viewVideo") {
        liilIiIl = 31;
        i1i1llI = 31;
      } else {
        if (iIi1iIl1 == "visitSku") liilIiIl = 5, i1i1llI = $.visitSkuValue || 5;else {
          if (iIi1iIl1 == "toShop") liilIiIl = 14, i1i1llI = $.toShopValue || 14;else {
            if (iIi1iIl1 == "addSku") {
              liilIiIl = 2;
              i1i1llI = $.addSkuValue || 2;
            }
          }
        }
      }
      liIIIli1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + liilIiIl + "&taskValue=" + i1i1llI;
      break;
    case "drawRecord":
      url = l1lIiill + "/dingzhi/joinCommon/drawRecord", liIIIli1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = l1lIiill + "/dingzhi/joinCommon/shareRecord", liIIIli1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = l1lIiill + "/dingzhi/joinCommon/startDraw", liIIIli1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + iIi1iIl1);
  }
  let I11111l1 = II1li1l1(url, liIIIli1, iiIlIi11);
  iiIlIi11 === "GET" && (delete requestOptions.body, delete requestOptions["Content-Type"]);
  const Ilill1II = 5;
  let IillI1i1 = 0,
    iIlllill = null,
    iIiil1Ii = false;
  while (IillI1i1 < Ilill1II) {
    IillI1i1 > 0 && (await $.wait(1000));
    const {
      err: Il1II1il,
      res: il1Ii11i,
      data: IlIlilll
    } = await iI1ilIII(I11111l1, iiIlIi11);
    if (Il1II1il) {
      if (typeof Il1II1il === "string" && Il1II1il.includes("Timeout awaiting 'request'")) iIlllill = iIi1iIl1 + " 请求超时，请检查网络重试";else {
        const i1i11 = il1Ii11i?.["statusCode"];
        if (i1i11) {
          if ([403, 493].includes(i1i11)) iIlllill = iIi1iIl1 + " 请求失败，IP被限制（Response code " + i1i11 + "）", iIiil1Ii = true;else [400, 404].includes(i1i11) ? iIlllill = iIi1iIl1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + i1i11 + "）" : iIlllill = iIi1iIl1 + " 请求失败（Response code " + i1i11 + "）";
        } else iIlllill = iIi1iIl1 + " 请求失败 => " + (Il1II1il.message || Il1II1il);
      }
      IillI1i1++;
    } else {
      const I1l1iI1i = ii11IIil.getResponseCookie(il1Ii11i, iIiIi11i),
        II1iilIl = false;
      II1iilIl && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + iIi1iIl1 + " 响应Body => " + (IlIlilll || "无") + "\n"), console.log("🔧 " + iIi1iIl1 + " 响应Cookie => " + (I1l1iI1i || "无") + "\n"), console.log("🔧 " + iIi1iIl1 + " 请求参数"), console.log(requestOptions), console.log("\n---------------------------------------------------\n"));
      let li111iI1 = "";
      switch (iIi1iIl1) {
        case "getMyPing":
          li111iI1 = ii11IIil.getCookieValue(I1l1iI1i, "LZ_AES_PIN");
          if (li111iI1) {
            $.LZ_AES_PIN = li111iI1;
          } else {
            console.log("获取 LZ_AES_PIN 失败！");
            $.message.fix("获取[LZ_AES_PIN]失败");
            $.skipRun = true;
          }
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(iIi1iIl1) && (iIiIi11i = I1l1iI1i);
      li111iI1 = ii11IIil.getCookieValue(iIiIi11i, "LZ_AES_PIN");
      !li111iI1 && $.LZ_AES_PIN && (iIiIi11i += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const il1Ii1lI = ii11IIil.getCookieValue(iIiIi11i, "pToken");
      !il1Ii1lI && $.pinToken && (iIiIi11i += "pToken=" + $.pinToken + "; ");
      const lii1liIi = ii11IIil.getCookieValue(iIiIi11i, "AUTH_C_USER");
      !lii1liIi && $.secretPin && (iIiIi11i += "AUTH_C_USER=" + $.secretPin + "; ");
      const il1lliI = ii11IIil.getCookieValue(iIiIi11i, "te");
      !il1lliI && $.te && (iIiIi11i += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(iIi1iIl1)) {
        if (IlIlilll) try {
          const IillI11I = JSON.parse(IlIlilll);
          i1IiiiII(iIi1iIl1, IillI11I);
          break;
        } catch (lIIilili) {
          iIlllill = "❌ " + iIi1iIl1 + " 接口响应数据解析失败: " + lIIilili.message;
          console.log("🚫 " + iIi1iIl1 + " => " + String(IlIlilll));
          II1iilIl && (console.log("\n---------------------------------------------------\n"), console.log(iIiIi11i), console.log("\n---------------------------------------------------\n"));
          IillI1i1++;
        } else iIlllill = "❌ " + iIi1iIl1 + " 接口无响应数据", IillI1i1++;
      } else {
        break;
      }
      iIiil1Ii = false;
    }
  }
  IillI1i1 >= Ilill1II && (console.log(iIlllill), iIiil1Ii && !hotbreak && ($.outFlag = true));
}
async function iI1ilIII(liliIlI, iI1lIl1I = "POST") {
  if (iI1lIl1I === "POST") return new Promise(async ii1Iil1l => {
    $.post(liliIlI, (iiIIiIi, I111ilii, ilIlii1l) => {
      ii1Iil1l({
        "err": iiIIiIi,
        "res": I111ilii,
        "data": ilIlii1l
      });
    });
  });else {
    if (iI1lIl1I === "GET") {
      return new Promise(async l1IIIi => {
        $.get(liliIlI, (Iii1l11I, lI1iliII, Iiiilil) => {
          l1IIIi({
            "err": Iii1l11I,
            "res": lI1iliII,
            "data": Iiiilil
          });
        });
      });
    } else {
      const iiI1Ili1 = "不支持的请求方法";
      return {
        "err": iiI1Ili1,
        "res": null,
        "data": null
      };
    }
  }
}
async function i1IiiiII(il1ll1ll, IIi1IiI) {
  try {
    switch (il1ll1ll) {
      case "getSimpleActInfoVo":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) {
            if (typeof IIi1IiI.data.shopId != "undefined") $.shopId = IIi1IiI.data.shopId;
            if (typeof IIi1IiI.data.venderId != "undefined") $.venderId = IIi1IiI.data.venderId;
          } else IIi1IiI.errorMessage ? console.log("" + (IIi1IiI.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "getMyPing":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) {
            if (IIi1IiI.data && typeof IIi1IiI.data.secretPin != "undefined") $.Pin = IIi1IiI.data.secretPin;
            if (IIi1IiI.data && typeof IIi1IiI.data.nickname != "undefined") $.nickname = IIi1IiI.data.nickname;
          } else IIi1IiI.errorMessage ? (console.log("" + (IIi1IiI.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "getUserInfo":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) {
            if (IIi1IiI.data && typeof IIi1IiI.data.yunMidImageUrl != "undefined") $.attrTouXiang = IIi1IiI.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else IIi1IiI.errorMessage ? console.log("" + (IIi1IiI.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "activityContent":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) {
            $.endTime = IIi1IiI.data.endTime || IIi1IiI.data.activityVo && IIi1IiI.data.activityVo.endTime || IIi1IiI.data.activity.endTime || 0;
            $.hasEnd = IIi1IiI.data.isEnd || false;
            $.score = IIi1IiI.data.actorInfo.score || 0;
            $.actorUuid = IIi1IiI.data.actorInfo.uuid || "";
            $.assistCount = IIi1IiI.data.actorInfo.assistCount || 0;
          } else IIi1IiI.errorMessage ? console.log("" + (IIi1IiI.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "assist":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) $.assistState = IIi1IiI.data.assistState || 0, $.allOpenCard = IIi1IiI.data.openCardInfo.openAll || false, $.openVenderId = IIi1IiI.data.openCardInfo.openVenderId || [], IIi1IiI?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (IIi1IiI?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");else IIi1IiI.errorMessage ? console.log("" + (IIi1IiI.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "taskRecord":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) $.followShop = IIi1IiI.data["20"].recordCount || 0, $.addCart = IIi1IiI.data["23"].recordCount || 0, $.visitSku = IIi1IiI.data["10"].recordCount || 0;else IIi1IiI.errorMessage ? console.log("" + (IIi1IiI.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "checkOpenCard":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) {
            let lI111l1i = IIi1IiI.data["10"].settingInfo || [],
              li1IlIl1 = IIi1IiI.data.cardList || [],
              lliIiI1l = IIi1IiI.data.openCardList || [];
            $.openList = [...li1IlIl1, ...lI111l1i, ...lliIiI1l];
            $.openCardScore1 = IIi1IiI.data.score1 || 0;
            $.openCardScore2 = IIi1IiI.data.score2 || 0;
            $.drawScore = IIi1IiI.data.drawScore || 0;
            if (IIi1IiI.data.beans || IIi1IiI.data.addBeanNum) console.log("开卡获得：" + (IIi1IiI.data.beans || IIi1IiI.data.addBeanNum) + "京豆 🐶");
          } else IIi1IiI.errorMessage ? console.log("" + (IIi1IiI.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "addSku":
      case "followShop":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) console.log("完成任务,获得" + (IIi1IiI?.["data"]?.["beans"] || 0) + "京豆, " + (IIi1IiI?.["data"]?.["score"] || 0) + "金币");else IIi1IiI.errorMessage ? console.log("" + (IIi1IiI.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "startDraw":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) {
            if (typeof IIi1IiI.data == "object") {
              drawInfo = IIi1IiI.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = IIi1IiI.data.addressId, prizeName = drawInfo.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let Il1iIIII = await llIlIIII("https://lzdz1-isv.isvjcloud.com", I1ilIi1I, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  Il1iIIII ? $.isNode() && (await ilIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await ilIl.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await ilIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else console.log("" + data);
          } else IIi1IiI.errorMessage ? ($.runFalag = false, console.log("" + (IIi1IiI.errorMessage || ""))) : console.log("" + data);
        } else {
          console.log("" + data);
        }
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) {
            if (typeof IIi1IiI.data == "object") {
              let Iii1iii = "",
                li1l1Ii = "抽奖";
              IIi1IiI.data.addBeanNum && (Iii1iii = IIi1IiI.data.addBeanNum + "京豆");
              IIi1IiI.data.addPoint && (Iii1iii += " " + IIi1IiI.data.addPoint + "游戏机会");
              if (il1ll1ll == "followShop") li1l1Ii = "关注", IIi1IiI.data.beans != "0" && (Iii1iii += IIi1IiI.data.beans + "京豆 🐶");else {
                if (il1ll1ll == "addSku" || il1ll1ll == "addCart") li1l1Ii = "加购", IIi1IiI.data.beans != "0" && (Iii1iii += IIi1IiI.data.beans + "京豆 🐶");else {
                  if (il1ll1ll == "viewVideo") li1l1Ii = "热门文章";else {
                    if (il1ll1ll == "toShop") li1l1Ii = "浏览店铺";else {
                      if (il1ll1ll == "visitSku" || il1ll1ll == "browseGoods") li1l1Ii = "浏览商品";else {
                        if (il1ll1ll == "sign") li1l1Ii = "签到";else {
                          let IIIIIlli = typeof IIi1IiI.data.drawOk === "object" && IIi1IiI.data.drawOk || IIi1IiI.data;
                          Iii1iii = IIIIIlli.drawOk == true && IIIIIlli.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !Iii1iii && (Iii1iii = "空气 💨");
              console.log(li1l1Ii + "获得：" + (Iii1iii || data));
            } else console.log("" + data);
          } else IIi1IiI.errorMessage ? ($.runFalag = false, console.log("" + (IIi1IiI.errorMessage || ""))) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "drawRecord":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true) {
            let iI1ilIli = 0;
            for (let Ili1I1lI of IIi1IiI.data) {
              infoType = Ili1I1lI.infoType;
              infoName = Ili1I1lI.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", "")), iI1ilIli += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~"), await ilIl.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName), await ilIl.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            iI1ilIli > 0 && console.log("当前累计获得 " + iI1ilIli + " 京豆 🐶");
          } else IIi1IiI.errorMessage ? console.log("" + (IIi1IiI.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "getShareRecord":
        if (typeof IIi1IiI == "object") {
          if (IIi1IiI.result && IIi1IiI.result === true && IIi1IiI.data) $.ShareCount = IIi1IiI.data.shareList.length, $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");else {
            if (IIi1IiI.errorMessage) {
              console.log("" + (IIi1IiI.errorMessage || ""));
            } else console.log("" + data);
          }
        } else console.log("" + data);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(il1ll1ll + "-> " + data);
    }
    typeof IIi1IiI == "object" && IIi1IiI.errorMessage && IIi1IiI.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (IIlliIIl) {
    console.log(IIlliIIl);
  }
}
function II1li1l1(IiIlliI, iI1iiii, iI1iIll = "POST") {
  let lliIiii = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": I1ilIi1I,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IiIlliI.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (lliIiii.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, lliIiii.Cookie = "" + (IIIi1IlI && IIIi1IlI || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + iIiIi11i), {
    "url": IiIlliI,
    "method": iI1iIll,
    "headers": lliIiii,
    "body": iI1iiii,
    "timeout": 30000
  };
}
function lIi1lii1() {
  return new Promise(ilIiii1 => {
    let I1Il11i1 = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(I1Il11i1, async (I11Il1Ii, IIl1iI11, iI1lIiiI) => {
      try {
        if (I11Il1Ii) {
          if (IIl1iI11 && typeof IIl1iI11.statusCode != "undefined") {}
          console.log("" + $.toStr(I11Il1Ii));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let llllIIl = iI1lIiiI.match(/(活动已经结束)/) && iI1lIiiI.match(/(活动已经结束)/)[1] || "";
          llllIIl && ($.activityEnd = true, console.log("活动已结束"));
          ll1iI111(IIl1iI11);
        }
      } catch (IlIii11i) {
        $.logErr(IlIii11i, IIl1iI11);
      } finally {
        ilIiii1();
      }
    });
  });
}
function ll1iI111(ii11lI11) {
  if (ii11lI11) {
    if (ii11lI11.headers["set-cookie"]) {
      I1ilIi1I = originCookie + ";";
      for (let llI1I111 of ii11lI11.headers["set-cookie"]) {
        i1i1lli[llI1I111.split(";")[0].substr(0, llI1I111.split(";")[0].indexOf("="))] = llI1I111.split(";")[0].substr(llI1I111.split(";")[0].indexOf("=") + 1);
      }
      for (const ii1Ill11 of Object.keys(i1i1lli)) {
        I1ilIi1I += ii1Ill11 + "=" + i1i1lli[ii1Ill11] + ";";
      }
      iIiIi11i = I1ilIi1I;
    }
  }
}
function II1iIIII(i1Il1IIi) {
  i1Il1IIi = i1Il1IIi || 32;
  let illiIiIl = "abcdef0123456789",
    iiI1l1 = illiIiIl.length,
    II1II1 = "";
  for (i = 0; i < i1Il1IIi; i++) II1II1 += illiIiIl.charAt(Math.floor(Math.random() * iiI1l1));
  return II1II1;
}
function IlliIl1(iIIlli11) {
  if (typeof iIIlli11 == "string") try {
    return JSON.parse(iIIlli11);
  } catch (li1Iiiil) {
    return console.log(li1Iiiil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function lII111l1() {
  if (!$.joinVenderId) return;
  return new Promise(async lIlII1lI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Ii111I11 = "";
    if ($.shopactivityId) Ii111I11 = ",\"activityId\":" + $.shopactivityId;
    const Iii1liiI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Ii111I11 + ",\"channel\":406}",
      lIlilIl = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Iii1liiI)
      },
      illlIl1I = await Il1ii11l("27004", lIlilIl),
      IillIIll = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + Iii1liiI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(illlIl1I),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": I1ilIi1I
        }
      };
    $.get(IillIIll, async (i11lI1Ii, lIll1iiI, i1liil1l) => {
      try {
        if (i11lI1Ii) console.log(i11lI1Ii);else {
          const Ii1illIl = JSON.parse(i1liil1l);
          if (typeof Ii1illIl === "object") {
            if (Ii1illIl.success === true) {
              console.log(Ii1illIl.message);
              $.errorJoinShop = Ii1illIl.message;
              if (Ii1illIl.result && Ii1illIl.result.giftInfo) for (let Iliiilii of Ii1illIl.result.giftInfo.giftList) {
                console.log("入会获得：" + Iliiilii.discountString + Iliiilii.prizeName + Iliiilii.secondLineDesc);
              }
            } else typeof Ii1illIl == "object" && Ii1illIl.message ? ($.errorJoinShop = Ii1illIl.message, console.log("" + (Ii1illIl.message || ""))) : console.log(i1liil1l);
          } else console.log(i1liil1l);
        }
      } catch (lIillliI) {
        $.logErr(lIillliI, lIll1iiI);
      } finally {
        lIlII1lI();
      }
    });
  });
}
async function iliIl1iI() {
  return new Promise(async I1iili11 => {
    let Il11iII = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const Ii1Ill11 = {
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il11iII)
      },
      i1IilI1l = await Il1ii11l("27004", Ii1Ill11),
      i1Ill11 = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + Il11iII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1IilI1l),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": I1ilIi1I
        }
      };
    $.get(i1Ill11, async (lIIi1ii1, llIiIill, lI1iIiii) => {
      try {
        if (lIIi1ii1) console.log(lIIi1ii1);else {
          const ilIiI111 = JSON.parse(lI1iIiii);
          typeof ilIiI111 === "object" ? ilIiI111.success === true && (console.log("去加入：" + (ilIiI111.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = ilIiI111.result.interestsRuleList && ilIiI111.result.interestsRuleList[0] && ilIiI111.result.interestsRuleList[0].interestsInfo && ilIiI111.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = ilIiI111.result.userInfo.openCardStatus) : console.log(lI1iIiii);
        }
      } catch (illIllI) {
        $.logErr(illIllI, llIiIill);
      } finally {
        I1iili11();
      }
    });
  });
}
function liI1IiII(lilIli1l) {
  return new Promise(IIlII11l => {
    const IiIII1li = {
      "url": "" + lilIli1l,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IiIII1li, async (llli1I, ll1i1iII, liiIII1) => {
      try {
        if (llli1I) {} else liiIII1 ? liiIII1 = JSON.parse(liiIII1) : console.log("未获取到数据,请重新运行");
      } catch (lll1IIII) {
        $.logErr(lll1IIII, ll1i1iII);
        liiIII1 = null;
      } finally {
        IIlII11l(liiIII1);
      }
    });
  });
}
function IiI1iIi(l11iI1I, IIlIiI11) {
  return Math.floor(Math.random() * (IIlIiI11 - l11iI1I)) + l11iI1I;
}
function Il1iIli1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lI1ili1 = Array.from(new Set($.blacklist.split("&")));
  console.log(lI1ili1.join("&") + "\n");
  let I1lI11Il = lI1ili1,
    IlIII1lI = [],
    l1lIiiI1 = false;
  for (let iI11illl = 0; iI11illl < IllIl1II.length; iI11illl++) {
    let liliiiI1 = decodeURIComponent(IllIl1II[iI11illl].match(/pt_pin=([^; ]+)(?=;?)/) && IllIl1II[iI11illl].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!liliiiI1) break;
    let ii1iilii = false;
    for (let llilIll of I1lI11Il) {
      if (llilIll && llilIll == liliiiI1) {
        ii1iilii = true;
        break;
      }
    }
    !ii1iilii && (l1lIiiI1 = true, IlIII1lI.splice(iI11illl, -1, IllIl1II[iI11illl]));
  }
  if (l1lIiiI1) IllIl1II = IlIII1lI;
}
function illll1l1(il1lI1lI, iiI11i1) {
  iiI11i1 != 0 && il1lI1lI.unshift(il1lI1lI.splice(iiI11i1, 1)[0]);
}
function llliIl11() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(IllIl1II, IllIl1II));
    return;
  }
  console.log("当前已设置白名单：");
  const ii1lIliI = Array.from(new Set($.whitelist.split("&")));
  console.log(ii1lIliI.join("&") + "\n");
  let liiiIi1 = [],
    i11lli1I = ii1lIliI;
  for (let i1IliI11 in IllIl1II) {
    let iIllI1il = decodeURIComponent(IllIl1II[i1IliI11].match(/pt_pin=([^; ]+)(?=;?)/) && IllIl1II[i1IliI11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    i11lli1I.includes(iIllI1il) && liiiIi1.push(IllIl1II[i1IliI11]);
  }
  helpCookiesArr = liiiIi1;
  if (i11lli1I.length > 1) for (let ill1il1l in i11lli1I) {
    let l1iiilil = i11lli1I[i11lli1I.length - 1 - ill1il1l];
    if (!l1iiilil) continue;
    for (let Ii111l1i in helpCookiesArr) {
      let iiiilllI = decodeURIComponent(helpCookiesArr[Ii111l1i].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[Ii111l1i].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      if (l1iiilil == iiiilllI) {
        illll1l1(helpCookiesArr, Ii111l1i);
      }
    }
  }
}