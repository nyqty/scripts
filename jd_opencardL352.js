/*
12.20-12.27 冬至平安 欢乐共享
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 12.20-12.27 冬至平安 欢乐共享 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#12.20-12.27 冬至平安 欢乐共享
1 1 1 1 * jd_opencardL352.js, tag=12.20-12.27 冬至平安 欢乐共享, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('12.20-12.27 冬至平安 欢乐共享')
const iiii1l = $.isNode() ? require("./jdCookie.js") : "",
  lI11I = $.isNode() ? require("./sendNotify") : "";
let iIilIi = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  IllI = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const iIilIl = process.env.jd_opencard_break === "true",
  ilI1I = require("./function/krgetToken"),
  il1Iil = require("./function/krh5st"),
  ii11ll = require("./function/jdCommon"),
  il1Iii = require("./function/krwxSavePrize");
let lili1l = "https://lzdz1-isv.isvjcloud.com",
  iI1iIi = [],
  iI1iIl = "",
  lili1i = {};
if ($.isNode()) {
  Object.keys(iiii1l).forEach(lIil1I => {
    iI1iIi.push(iiii1l[lIil1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else iI1iIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIllI1($.getdata("CookiesJD") || "[]").map(IiIIII => IiIIII.cookie)].filter(i111iI => !!i111iI);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iI1Ii = "",
  IiIIIl = "",
  IiIIIi = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  lI11l = "",
  iI1Il = "";
$.whitelist = process.env.jd_opencard_whitelist || lI11l;
$.blacklist = process.env.jd_opencard_blacklist || iI1Il;
iI1II();
lI1i1l();
$.errMsgPin = [];
!(async () => {
  if (IiIIIi === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!iI1iIi[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await il1IiI("http://code.kingran.cf/352.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[il1Ii1(0, authorCodeList.length)];else {
    let iii1 = ["da0f1eb7e28d4d21b0f1de685ebe1236"];
    $.authorCode = iii1[il1Ii1(0, iii1.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "2eb845033b8f4dfea99003d9200b9c4d";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let ill1i = 0; ill1i < iI1iIi.length; ill1i++) {
    iI1iIl = iI1iIi[ill1i];
    originCookie = iI1iIi[ill1i];
    if (iI1iIl) {
      $.UserName = decodeURIComponent(iI1iIl.match(/pt_pin=([^; ]+)(?=;?)/) && iI1iIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ill1i + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = ii11ll.genUA($.UserName);
      await i111il();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let l1IilI = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + l1IilI;
  }
  if ($.outFlag) {
    let ll1I1i = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + ll1I1i);
    if ($.isNode()) await lI11I.sendNotify("" + $.name, "" + ll1I1i);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(iilI => $.logErr(iilI)).finally(() => $.done());
async function i111il() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    iI1Ii = "";
    $.Token = "";
    $.Pin = "";
    let lIlIll = false;
    $.Token = await ilI1I(iI1iIl, lili1l);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await lIil11();
    if (IiIIIl == "") {
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
    await i111ii("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await i111ii("accessLogWithAD");
    await i111ii("activityContent");
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
    await i111ii("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await i111ii("checkOpenCard");
    await i111ii("taskRecord");
    await $.wait(1000);
    await i111ii("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          lIlIll = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await lI1i1i();
          for (let ilIilI = 0; ilIilI < Array(2).length; ilIilI++) {
            if (ilIilI > 0) console.log("第" + ilIilI + "次 重新开卡");
            await Ill1();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await i111ii("activityContent");
          await i111ii("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else {
      console.log("已全部开卡");
    }
    !$.followShop && !$.outFlag && (console.log(""), await i111ii("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    if (IllI) {
      !$.addCart && !$.outFlag && (await i111ii("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    }
    console.log("去助力 -> " + $.shareUuid);
    await i111ii("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await i111ii("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    lIlIll && (await i111ii("activityContent"));
    if (iIilIi + "" !== "0") {
      $.runFalag = true;
      let IIllil = parseInt($.score / 100);
      iIilIi = parseInt(iIilIi, 10);
      if (IIllil > iIilIi) IIllil = iIilIi;
      console.log("已设置抽奖次数为" + IIllil + "次，当前有" + $.score + "金币");
      for (m = 1; IIllil--; m++) {
        console.log("进行第" + m + "次抽奖");
        await i111ii("startDraw");
        if ($.runFalag == false) break;
        if (Number(IIllil) <= 0) break;
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
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (iI11) {
    console.log(iI11);
  }
}
async function i111ii(liIii1) {
  if ($.outFlag) return;
  let I111II = "https://lzdz1-isv.isvjcloud.com",
    lII1 = "",
    iIlIlI = "POST";
  switch (liIii1) {
    case "getSimpleActInfoVo":
      url = I111II + "/dz/common/getSimpleActInfoVo", lII1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = I111II + "/customer/getMyPing", lII1 = "userId=12577399&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = I111II + "/common/accessLogWithAD";
      let Il1III = I111II + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      lII1 = "venderId=12577399&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(Il1III) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = I111II + "/wxActionCommon/getUserInfo", lII1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = I111II + "/dingzhi/joinCommon/activityContent", lII1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = I111II + "/dingzhi/joinCommon/drawContent", lII1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = I111II + "/dingzhi/joinCommon/taskInfo", lII1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = I111II + "/dingzhi/joinCommon/assist", lII1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = I111II + "/dingzhi/joinCommon/taskRecord", lII1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = I111II + "/dingzhi/joinCommon/doTask", lII1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = I111II + "/dingzhi/joinCommon/doTask", lII1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = I111II + "/dingzhi/joinCommon/doTask", lII1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = I111II + "/dingzhi/opencard/" + liIii1, lII1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (liIii1 == "browseGoods") lII1 += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = I111II + "/dingzhi/opencard/" + liIii1;
      let l11iI = "",
        IIiIil = "";
      if (liIii1 == "viewVideo") l11iI = 31, IIiIil = 31;else {
        if (liIii1 == "visitSku") {
          l11iI = 5;
          IIiIil = $.visitSkuValue || 5;
        } else {
          if (liIii1 == "toShop") l11iI = 14, IIiIil = $.toShopValue || 14;else liIii1 == "addSku" && (l11iI = 2, IIiIil = $.addSkuValue || 2);
        }
      }
      lII1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + l11iI + "&taskValue=" + IIiIil;
      break;
    case "drawRecord":
      url = I111II + "/dingzhi/joinCommon/drawRecord", lII1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = I111II + "/dingzhi/joinCommon/shareRecord", lII1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = I111II + "/dingzhi/joinCommon/startDraw", lII1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + liIii1);
  }
  let ilIili = li1llI(url, lII1, iIlIlI);
  iIlIlI === "GET" && (delete requestOptions.body, delete requestOptions.headers["Content-Type"]);
  const ilIill = 5;
  let Il1l1l = 0,
    iIlIil = null,
    IIlll1 = false;
  while (Il1l1l < ilIill) {
    Il1l1l > 0 && (await $.wait(1000));
    const {
      err: lli1li,
      res: ll1I,
      data: Ii1lii
    } = await lI11i(ilIili, iIlIlI);
    if (lli1li) {
      if (typeof lli1li === "string" && lli1li.includes("Timeout awaiting 'request'")) iIlIil = liIii1 + " 请求超时，请检查网络重试";else {
        const liIili = ll1I?.["statusCode"];
        if (liIili) {
          if ([403, 493].includes(liIili)) iIlIil = liIii1 + " 请求失败，IP被限制（Response code " + liIili + "）", IIlll1 = true;else [400, 404].includes(liIili) ? iIlIil = liIii1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + liIili + "）" : iIlIil = liIii1 + " 请求失败（Response code " + liIili + "）";
        } else iIlIil = liIii1 + " 请求失败 => " + (lli1li.message || lli1li);
      }
      Il1l1l++;
    } else {
      const Il1II1 = ii11ll.getResponseCookie(ll1I, IiIIIl),
        iiilI = false;
      if (iiilI) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + liIii1 + " 响应Body => " + (Ii1lii || "无") + "\n");
        console.log("🔧 " + liIii1 + " 响应Cookie => " + (Il1II1 || "无") + "\n");
        console.log("🔧 " + liIii1 + " 请求参数");
        console.log(requestOptions);
        console.log("\n---------------------------------------------------\n");
      }
      let Il1IIi = "";
      switch (liIii1) {
        case "getMyPing":
          Il1IIi = ii11ll.getCookieValue(Il1II1, "LZ_AES_PIN");
          Il1IIi ? $.LZ_AES_PIN = Il1IIi : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(liIii1) && (IiIIIl = Il1II1);
      Il1IIi = ii11ll.getCookieValue(IiIIIl, "LZ_AES_PIN");
      !Il1IIi && $.LZ_AES_PIN && (IiIIIl += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const IIiIl1 = ii11ll.getCookieValue(IiIIIl, "pToken");
      !IIiIl1 && $.pinToken && (IiIIIl += "pToken=" + $.pinToken + "; ");
      const ilII11 = ii11ll.getCookieValue(IiIIIl, "AUTH_C_USER");
      !ilII11 && $.secretPin && (IiIIIl += "AUTH_C_USER=" + $.secretPin + "; ");
      const l11ii = ii11ll.getCookieValue(IiIIIl, "te");
      !l11ii && $.te && (IiIIIl += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(liIii1)) {
        if (Ii1lii) try {
          const Ii1li1 = JSON.parse(Ii1lii);
          ilI11(liIii1, Ii1li1);
          break;
        } catch (iiil1) {
          iIlIil = "❌ " + liIii1 + " 接口响应数据解析失败: " + iiil1.message;
          console.log("🚫 " + liIii1 + " => " + String(Ii1lii));
          iiilI && (console.log("\n---------------------------------------------------\n"), console.log(IiIIIl), console.log("\n---------------------------------------------------\n"));
          Il1l1l++;
        } else iIlIil = "❌ " + liIii1 + " 接口无响应数据", Il1l1l++;
      } else {
        break;
      }
      IIlll1 = false;
    }
  }
  Il1l1l >= ilIill && (console.log(iIlIil), IIlll1 && !iIilIl && ($.outFlag = true));
}
async function lI11i(lii1l, lii1i = "POST") {
  if (lii1i === "POST") return new Promise(async iiiii => {
    $.post(lii1l, (iiiil, iiIlII, il11II) => {
      iiiii({
        "err": iiiil,
        "res": iiIlII,
        "data": il11II
      });
    });
  });else {
    if (lii1i === "GET") return new Promise(async l11l1 => {
      $.get(lii1l, (l11lI, Il1l11, I1II1l) => {
        l11l1({
          "err": l11lI,
          "res": Il1l11,
          "data": I1II1l
        });
      });
    });else {
      const I1II1i = "不支持的请求方法";
      return {
        "err": I1II1i,
        "res": null,
        "data": null
      };
    }
  }
}
async function ilI11(lii1I, IIiIiI) {
  try {
    switch (lii1I) {
      case "getSimpleActInfoVo":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) {
            if (typeof IIiIiI.data.shopId != "undefined") $.shopId = IIiIiI.data.shopId;
            if (typeof IIiIiI.data.venderId != "undefined") $.venderId = IIiIiI.data.venderId;
          } else {
            if (IIiIiI.errorMessage) {
              console.log("" + (IIiIiI.errorMessage || ""));
            } else console.log("" + IIiIiI);
          }
        } else console.log("" + IIiIiI);
        break;
      case "getMyPing":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) {
            if (IIiIiI.data && typeof IIiIiI.data.secretPin != "undefined") $.Pin = IIiIiI.data.secretPin;
            if (IIiIiI.data && typeof IIiIiI.data.nickname != "undefined") $.nickname = IIiIiI.data.nickname;
          } else IIiIiI.errorMessage ? (console.log("" + (IIiIiI.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "getUserInfo":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) {
            if (IIiIiI.data && typeof IIiIiI.data.yunMidImageUrl != "undefined") $.attrTouXiang = IIiIiI.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else IIiIiI.errorMessage ? console.log("" + (IIiIiI.errorMessage || "")) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "activityContent":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) $.endTime = IIiIiI.data.endTime || IIiIiI.data.activityVo && IIiIiI.data.activityVo.endTime || IIiIiI.data.activity.endTime || 0, $.hasEnd = IIiIiI.data.isEnd || false, $.score = IIiIiI.data.actorInfo.score || 0, $.actorUuid = IIiIiI.data.actorInfo.uuid || "", $.assistCount = IIiIiI.data.actorInfo.assistCount || 0;else {
            if (IIiIiI.errorMessage) {
              console.log("" + (IIiIiI.errorMessage || ""));
            } else console.log("" + IIiIiI);
          }
        } else console.log("" + IIiIiI);
        break;
      case "assist":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) $.assistState = IIiIiI.data.assistState || 0, $.allOpenCard = IIiIiI.data.openCardInfo.openAll || false, $.openVenderId = IIiIiI.data.openCardInfo.openVenderId || [], IIiIiI?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (IIiIiI?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");else IIiIiI.errorMessage ? console.log("" + (IIiIiI.errorMessage || "")) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "taskRecord":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) $.followShop = IIiIiI.data["20"].recordCount || 0, $.addCart = IIiIiI.data["23"].recordCount || 0, $.visitSku = IIiIiI.data["10"].recordCount || 0;else IIiIiI.errorMessage ? console.log("" + (IIiIiI.errorMessage || "")) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "checkOpenCard":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) {
            let l1li1 = IIiIiI.data["10"].settingInfo || [],
              IIllll = IIiIiI.data.cardList || [],
              I1Iil1 = IIiIiI.data.openCardList || [];
            $.openList = [...IIllll, ...l1li1, ...I1Iil1];
            $.openCardScore1 = IIiIiI.data.score1 || 0;
            $.openCardScore2 = IIiIiI.data.score2 || 0;
            $.drawScore = IIiIiI.data.drawScore || 0;
            if (IIiIiI.data.beans || IIiIiI.data.addBeanNum) console.log("开卡获得：" + (IIiIiI.data.beans || IIiIiI.data.addBeanNum) + "京豆 🐶");
          } else IIiIiI.errorMessage ? console.log("" + (IIiIiI.errorMessage || "")) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "addSku":
      case "followShop":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) console.log("完成任务,获得" + (IIiIiI?.["data"]?.["beans"] || 0) + "京豆, " + (IIiIiI?.["data"]?.["score"] || 0) + "金币");else IIiIiI.errorMessage ? console.log("" + (IIiIiI.errorMessage || "")) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "startDraw":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) {
            if (typeof IIiIiI.data == "object") {
              drawInfo = IIiIiI.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = IIiIiI.data.addressId, prizeName = drawInfo.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let IlIil1 = await il1Iii("https://lzdz1-isv.isvjcloud.com", iI1iIl, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  IlIil1 ? $.isNode() && (await lI11I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await lI11I.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + drawInfo.name + " 🎟️");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                  $.isNode() && (await lI11I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                  break;
                case 16:
                  console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                  break;
                default:
                  if (drawInfo.name.includes("券")) {
                    console.log("🗑️ 优惠券");
                  } else console.log("获得：" + drawInfo.name);
                  break;
              } else console.log("💨  空气");
            } else console.log("" + IIiIiI);
          } else IIiIiI.errorMessage ? ($.runFalag = false, console.log("" + (IIiIiI.errorMessage || ""))) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) {
            if (typeof IIiIiI.data == "object") {
              let iIil1I = "",
                iI1i1l = "抽奖";
              IIiIiI.data.addBeanNum && (iIil1I = IIiIiI.data.addBeanNum + "京豆");
              IIiIiI.data.addPoint && (iIil1I += " " + IIiIiI.data.addPoint + "游戏机会");
              if (lii1I == "followShop") iI1i1l = "关注", IIiIiI.data.beans != "0" && (iIil1I += IIiIiI.data.beans + "京豆 🐶");else {
                if (lii1I == "addSku" || lii1I == "addCart") iI1i1l = "加购", IIiIiI.data.beans != "0" && (iIil1I += IIiIiI.data.beans + "京豆 🐶");else {
                  if (lii1I == "viewVideo") {
                    iI1i1l = "热门文章";
                  } else {
                    if (lii1I == "toShop") iI1i1l = "浏览店铺";else {
                      if (lii1I == "visitSku" || lii1I == "browseGoods") iI1i1l = "浏览商品";else {
                        if (lii1I == "sign") iI1i1l = "签到";else {
                          let l1ii1i = typeof IIiIiI.data.drawOk === "object" && IIiIiI.data.drawOk || IIiIiI.data;
                          iIil1I = l1ii1i.drawOk == true && l1ii1i.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !iIil1I && (iIil1I = "空气 💨");
              console.log(iI1i1l + "获得：" + (iIil1I || IIiIiI));
            } else console.log("" + IIiIiI);
          } else IIiIiI.errorMessage ? ($.runFalag = false, console.log("" + (IIiIiI.errorMessage || ""))) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "drawRecord":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true) {
            let li1111 = 0;
            for (let IiliI of IIiIiI.data) {
              infoType = IiliI.infoType;
              infoName = IiliI.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", "")), li1111 += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~"), await lI11I.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName), await lI11I.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            li1111 > 0 && console.log("当前累计获得 " + li1111 + " 京豆 🐶");
          } else IIiIiI.errorMessage ? console.log("" + (IIiIiI.errorMessage || "")) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "getShareRecord":
        if (typeof IIiIiI == "object") {
          if (IIiIiI.result && IIiIiI.result === true && IIiIiI.data) $.ShareCount = IIiIiI.data.shareList.length, $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");else IIiIiI.errorMessage ? console.log("" + (IIiIiI.errorMessage || "")) : console.log("" + IIiIiI);
        } else console.log("" + IIiIiI);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(lii1I + "-> " + IIiIiI);
    }
    typeof IIiIiI == "object" && IIiIiI.errorMessage && IIiIiI.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (I11IiI) {
    console.log(I11IiI);
  }
}
function li1llI(l111il, Il1lI, lli1l = "POST") {
  let l1lil = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iI1iIl,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return l111il.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (l1lil.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, l1lil.Cookie = "" + (iI1Ii && iI1Ii || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + IiIIIl), {
    "url": l111il,
    "method": lli1l,
    "headers": l1lil,
    "body": Il1lI,
    "timeout": 30000
  };
}
function lIil11() {
  return new Promise(llill1 => {
    let I1ilI = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(I1ilI, async (iilii1, llilil, il1lii) => {
      try {
        if (iilii1) {
          if (llilil && typeof llilil.statusCode != "undefined") {}
          console.log("" + $.toStr(iilii1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let illi1l = il1lii.match(/(活动已经结束)/) && il1lii.match(/(活动已经结束)/)[1] || "";
          if (illi1l) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          iIilII(llilil);
        }
      } catch (l1ii1l) {
        $.logErr(l1ii1l, llilil);
      } finally {
        llill1();
      }
    });
  });
}
function iIilII(l1liIi) {
  if (l1liIi) {
    if (l1liIi.headers["set-cookie"]) {
      iI1iIl = originCookie + ";";
      for (let li111I of l1liIi.headers["set-cookie"]) {
        lili1i[li111I.split(";")[0].substr(0, li111I.split(";")[0].indexOf("="))] = li111I.split(";")[0].substr(li111I.split(";")[0].indexOf("=") + 1);
      }
      for (const iilil1 of Object.keys(lili1i)) {
        iI1iIl += iilil1 + "=" + lili1i[iilil1] + ";";
      }
      IiIIIl = iI1iIl;
    }
  }
}
function lIlI1(i1Il11) {
  i1Il11 = i1Il11 || 32;
  let ll1I11 = "abcdef0123456789",
    l1lli = ll1I11.length,
    il1lli = "";
  for (i = 0; i < i1Il11; i++) il1lli += ll1I11.charAt(Math.floor(Math.random() * l1lli));
  return il1lli;
}
function lIllI1(Il11II) {
  if (typeof Il11II == "string") try {
    return JSON.parse(Il11II);
  } catch (lIiiii) {
    return console.log(lIiiii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function Ill1() {
  if (!$.joinVenderId) return;
  return new Promise(async iiliil => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let il1ll1 = "";
    if ($.shopactivityId) il1ll1 = ",\"activityId\":" + $.shopactivityId;
    const Il11Ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + il1ll1 + ",\"channel\":406}",
      Il11Il = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il11Ii)
      },
      I1ill = await il1Iil("27004", Il11Il),
      i111Il = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + Il11Ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1ill),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": iI1iIl
        }
      };
    $.get(i111Il, async (i1Il1l, I11IlI, IiIIlI) => {
      try {
        if (i1Il1l) console.log(i1Il1l);else {
          const i111II = JSON.parse(IiIIlI);
          if (typeof i111II === "object") {
            if (i111II.success === true) {
              console.log(i111II.message);
              $.errorJoinShop = i111II.message;
              if (i111II.result && i111II.result.giftInfo) for (let IiIIl1 of i111II.result.giftInfo.giftList) {
                console.log("入会获得：" + IiIIl1.discountString + IiIIl1.prizeName + IiIIl1.secondLineDesc);
              }
            } else {
              if (typeof i111II == "object" && i111II.message) {
                $.errorJoinShop = i111II.message;
                console.log("" + (i111II.message || ""));
              } else console.log(IiIIlI);
            }
          } else console.log(IiIIlI);
        }
      } catch (I11Ili) {
        $.logErr(I11Ili, I11IlI);
      } finally {
        iiliil();
      }
    });
  });
}
async function lI1i1i() {
  return new Promise(async Il1lIi => {
    let i111i1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const l1IlI = {
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i111i1)
      },
      l1IIIl = await il1Iil("27004", l1IlI),
      IiliI1 = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + i111i1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1IIIl),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": iI1iIl
        }
      };
    $.get(IiliI1, async (Iiii11, l11I, llllli) => {
      try {
        if (Iiii11) console.log(Iiii11);else {
          const iI1I1 = JSON.parse(llllli);
          if (typeof iI1I1 === "object") iI1I1.success === true && (console.log("去加入：" + (iI1I1.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = iI1I1.result.interestsRuleList && iI1I1.result.interestsRuleList[0] && iI1I1.result.interestsRuleList[0].interestsInfo && iI1I1.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = iI1I1.result.userInfo.openCardStatus);else {
            console.log(llllli);
          }
        }
      } catch (IiliII) {
        $.logErr(IiliII, l11I);
      } finally {
        Il1lIi();
      }
    });
  });
}
function il1IiI(II1il1) {
  return new Promise(l111 => {
    const lIll1I = {
      "url": "" + II1il1,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIll1I, async (li1II1, iiIllI, iII1l1) => {
      try {
        if (li1II1) {} else iII1l1 ? iII1l1 = JSON.parse(iII1l1) : console.log("未获取到数据,请重新运行");
      } catch (IIillI) {
        $.logErr(IIillI, iiIllI);
        iII1l1 = null;
      } finally {
        l111(iII1l1);
      }
    });
  });
}
function il1Ii1(l1Ili, i1II11) {
  return Math.floor(Math.random() * (i1II11 - l1Ili)) + l1Ili;
}
function lI1i1l() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const II1iii = Array.from(new Set($.blacklist.split("&")));
  console.log(II1iii.join("&") + "\n");
  let iII1lI = II1iii,
    lIll1i = [],
    iiIlli = false;
  for (let i1II1I = 0; i1II1I < iI1iIi.length; i1II1I++) {
    let IIiliI = decodeURIComponent(iI1iIi[i1II1I].match(/pt_pin=([^; ]+)(?=;?)/) && iI1iIi[i1II1I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IIiliI) break;
    let I1I1i = false;
    for (let iiiiii of iII1lI) {
      if (iiiiii && iiiiii == IIiliI) {
        I1I1i = true;
        break;
      }
    }
    !I1I1i && (iiIlli = true, lIll1i.splice(i1II1I, -1, iI1iIi[i1II1I]));
  }
  if (iiIlli) iI1iIi = lIll1i;
}
function li1ll1(l1Il11, IIl1lI) {
  IIl1lI != 0 && l1Il11.unshift(l1Il11.splice(IIl1lI, 1)[0]);
}
function iI1II() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(iI1iIi, iI1iIi));
    return;
  }
  console.log("当前已设置白名单：");
  const IiliIl = Array.from(new Set($.whitelist.split("&")));
  console.log(IiliIl.join("&") + "\n");
  let ilii1l = [],
    llllii = IiliIl;
  for (let l11i in iI1iIi) {
    let IIl1ll = decodeURIComponent(iI1iIi[l11i].match(/pt_pin=([^; ]+)(?=;?)/) && iI1iIi[l11i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    llllii.includes(IIl1ll) && ilii1l.push(iI1iIi[l11i]);
  }
  helpCookiesArr = ilii1l;
  if (llllii.length > 1) for (let lliIll in llllii) {
    let iIIi = llllii[llllii.length - 1 - lliIll];
    if (!iIIi) continue;
    for (let lllliI in helpCookiesArr) {
      let illiIl = decodeURIComponent(helpCookiesArr[lllliI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lllliI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      iIIi == illiIl && li1ll1(helpCookiesArr, lllliI);
    }
  }
}