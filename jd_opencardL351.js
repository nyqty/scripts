/*
12.16-12.25 年终礼遇盛典
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 12.16-12.25 年终礼遇盛典 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#12.16-12.25 年终礼遇盛典
1 1 1 1 * jd_opencardL351.js, tag=12.16-12.25 年终礼遇盛典, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('12.16-12.25 年终礼遇盛典')
const li1Ii1 = $.isNode() ? require("./jdCookie.js") : "",
  i1ii11 = $.isNode() ? require("./sendNotify") : "";
let iii1 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  ill1i = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const ill1l = process.env.jd_opencard_break === "true",
  iiIIi1 = require("./function/krgetToken"),
  i1liI1 = require("./function/krh5st"),
  l1IilI = require("./function/jdCommon"),
  ll1I1i = require("./function/krwxSavePrize");
let iiiiII = "https://lzdz1-isv.isvjcloud.com",
  ll1I1l = [],
  iilI = "",
  IIilI1 = {};
if ($.isNode()) {
  Object.keys(li1Ii1).forEach(i1liIi => {
    ll1I1l.push(li1Ii1[i1liIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else ll1I1l = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1ii1i($.getdata("CookiesJD") || "[]").map(i1liIl => i1liIl.cookie)].filter(IiIill => !!IiIill);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let li1Il1 = "",
  i1ii1I = "",
  iil1 = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  iiIIiI = "",
  i1liII = "";
$.whitelist = process.env.jd_opencard_whitelist || iiIIiI;
$.blacklist = process.env.jd_opencard_blacklist || i1liII;
iiIIii();
i1ii1l();
$.errMsgPin = [];
!(async () => {
  if (iil1 === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!ll1I1l[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await li1Iil("http://code.kingran.cf/351.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[ill11(0, authorCodeList.length)];else {
    let iiiiIl = ["892a91bfa5ce4f4ebdf4b47e6f534a44", "2d1aea998e2b4ce8a85b4cac2c97b4e6"];
    $.authorCode = iiiiIl[ill11(0, iiiiIl.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "9ff9cd2abad04f7eb3f06815f7f7fffc";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let iiIIli = 0; iiIIli < ll1I1l.length; iiIIli++) {
    iilI = ll1I1l[iiIIli];
    originCookie = ll1I1l[iiIIli];
    if (iilI) {
      $.UserName = decodeURIComponent(iilI.match(/pt_pin=([^; ]+)(?=;?)/) && iilI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iiIIli + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = l1IilI.genUA($.UserName);
      await ilII1i();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let ilIIl = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + ilIIl;
  }
  if ($.outFlag) {
    let I11ll1 = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + I11ll1);
    if ($.isNode()) await i1ii11.sendNotify("" + $.name, "" + I11ll1);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(lIIII => $.logErr(lIIII)).finally(() => $.done());
async function ilII1i() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    li1Il1 = "";
    $.Token = "";
    $.Pin = "";
    let iiili = false;
    $.Token = await iiIIi1(iilI, iiiiII);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IIiIl();
    if (i1ii1I == "") {
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
    await ill1I("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await ill1I("accessLogWithAD");
    await ill1I("activityContent");
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
    await ill1I("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await ill1I("checkOpenCard");
    await ill1I("taskRecord");
    await $.wait(1000);
    await ill1I("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          iiili = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await iiil();
          for (let IIiIii = 0; IIiIii < Array(2).length; IIiIii++) {
            if (IIiIii > 0) console.log("第" + IIiIii + "次 重新开卡");
            await iiii();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await ill1I("activityContent");
          await ill1I("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    if (!$.followShop && !$.outFlag) {
      console.log("");
      await ill1I("followShop");
      await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
    }
    if (ill1i) {
      if (!$.addCart && !$.outFlag) {
        await ill1I("addCart");
        await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
      }
    }
    console.log("去助力 -> " + $.shareUuid);
    await ill1I("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await ill1I("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    iiili && (await ill1I("activityContent"));
    if (iii1 + "" !== "0") {
      $.runFalag = true;
      let lliI1 = parseInt($.score / 100);
      iii1 = parseInt(iii1, 10);
      if (lliI1 > iii1) lliI1 = iii1;
      console.log("已设置抽奖次数为" + lliI1 + "次，当前有" + $.score + "金币");
      for (m = 1; lliI1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await ill1I("startDraw");
        if ($.runFalag == false) break;
        if (Number(lliI1) <= 0) break;
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
  } catch (iiI11l) {
    console.log(iiI11l);
  }
}
async function ill1I(Il1II1) {
  if ($.outFlag) return;
  let Il1IIi = "https://lzdz1-isv.isvjcloud.com",
    IIiIl1 = "",
    ilII11 = "POST";
  switch (Il1II1) {
    case "getSimpleActInfoVo":
      url = Il1IIi + "/dz/common/getSimpleActInfoVo", IIiIl1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = Il1IIi + "/customer/getMyPing", IIiIl1 = "userId=1000097462&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = Il1IIi + "/common/accessLogWithAD";
      let I1IiiI = Il1IIi + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      IIiIl1 = "venderId=1000097462&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(I1IiiI) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = Il1IIi + "/wxActionCommon/getUserInfo", IIiIl1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = Il1IIi + "/dingzhi/joinCommon/activityContent", IIiIl1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = Il1IIi + "/dingzhi/joinCommon/drawContent", IIiIl1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = Il1IIi + "/dingzhi/joinCommon/taskInfo", IIiIl1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = Il1IIi + "/dingzhi/joinCommon/assist", IIiIl1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = Il1IIi + "/dingzhi/joinCommon/taskRecord", IIiIl1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = Il1IIi + "/dingzhi/joinCommon/doTask", IIiIl1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = Il1IIi + "/dingzhi/joinCommon/doTask", IIiIl1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = Il1IIi + "/dingzhi/joinCommon/doTask", IIiIl1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = Il1IIi + "/dingzhi/opencard/" + Il1II1, IIiIl1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (Il1II1 == "browseGoods") IIiIl1 += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = Il1IIi + "/dingzhi/opencard/" + Il1II1;
      let iI1i11 = "",
        lIIli1 = "";
      if (Il1II1 == "viewVideo") iI1i11 = 31, lIIli1 = 31;else {
        if (Il1II1 == "visitSku") {
          iI1i11 = 5;
          lIIli1 = $.visitSkuValue || 5;
        } else {
          if (Il1II1 == "toShop") iI1i11 = 14, lIIli1 = $.toShopValue || 14;else Il1II1 == "addSku" && (iI1i11 = 2, lIIli1 = $.addSkuValue || 2);
        }
      }
      IIiIl1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + iI1i11 + "&taskValue=" + lIIli1;
      break;
    case "drawRecord":
      url = Il1IIi + "/dingzhi/joinCommon/drawRecord", IIiIl1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = Il1IIi + "/dingzhi/joinCommon/shareRecord", IIiIl1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = Il1IIi + "/dingzhi/joinCommon/startDraw", IIiIl1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + Il1II1);
  }
  let Il1IIl = l1Iil1(url, IIiIl1, ilII11);
  ilII11 === "GET" && (delete requestOptions.body, delete requestOptions.headers["Content-Type"]);
  const l11il = 5;
  let lli1lI = 0,
    Ii1liI = null,
    liIilI = false;
  while (lli1lI < l11il) {
    lli1lI > 0 && (await $.wait(1000));
    const {
      err: I1lI,
      res: iIlIl,
      data: iIlIi
    } = await ilII1l(Il1IIl, ilII11);
    if (I1lI) {
      if (typeof I1lI === "string" && I1lI.includes("Timeout awaiting 'request'")) Ii1liI = Il1II1 + " 请求超时，请检查网络重试";else {
        const iilI1I = iIlIl?.["statusCode"];
        if (iilI1I) {
          if ([403, 493].includes(iilI1I)) Ii1liI = Il1II1 + " 请求失败，IP被限制（Response code " + iilI1I + "）", liIilI = true;else [400, 404].includes(iilI1I) ? Ii1liI = Il1II1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iilI1I + "）" : Ii1liI = Il1II1 + " 请求失败（Response code " + iilI1I + "）";
        } else Ii1liI = Il1II1 + " 请求失败 => " + (I1lI.message || I1lI);
      }
      lli1lI++;
    } else {
      const iiI1II = l1IilI.getResponseCookie(iIlIl, i1ii1I),
        iIl11I = false;
      if (iIl11I) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + Il1II1 + " 响应Body => " + (iIlIi || "无") + "\n");
        console.log("🔧 " + Il1II1 + " 响应Cookie => " + (iiI1II || "无") + "\n");
        console.log("🔧 " + Il1II1 + " 请求参数");
        console.log(requestOptions);
        console.log("\n---------------------------------------------------\n");
      }
      let lIiii1 = "";
      switch (Il1II1) {
        case "getMyPing":
          lIiii1 = l1IilI.getCookieValue(iiI1II, "LZ_AES_PIN");
          if (lIiii1) {
            $.LZ_AES_PIN = lIiii1;
          } else console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true;
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(Il1II1) && (i1ii1I = iiI1II);
      lIiii1 = l1IilI.getCookieValue(i1ii1I, "LZ_AES_PIN");
      !lIiii1 && $.LZ_AES_PIN && (i1ii1I += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const iIlII = l1IilI.getCookieValue(i1ii1I, "pToken");
      if (!iIlII && $.pinToken) {
        i1ii1I += "pToken=" + $.pinToken + "; ";
      }
      const iIiII1 = l1IilI.getCookieValue(i1ii1I, "AUTH_C_USER");
      !iIiII1 && $.secretPin && (i1ii1I += "AUTH_C_USER=" + $.secretPin + "; ");
      const I1l1 = l1IilI.getCookieValue(i1ii1I, "te");
      !I1l1 && $.te && (i1ii1I += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(Il1II1)) {
        if (iIlIi) try {
          const IlIiil = JSON.parse(iIlIi);
          IIilII(Il1II1, IlIiil);
          break;
        } catch (IlIiii) {
          Ii1liI = "❌ " + Il1II1 + " 接口响应数据解析失败: " + IlIiii.message;
          console.log("🚫 " + Il1II1 + " => " + String(iIlIi));
          iIl11I && (console.log("\n---------------------------------------------------\n"), console.log(i1ii1I), console.log("\n---------------------------------------------------\n"));
          lli1lI++;
        } else Ii1liI = "❌ " + Il1II1 + " 接口无响应数据", lli1lI++;
      } else break;
      liIilI = false;
    }
  }
  lli1lI >= l11il && (console.log(Ii1liI), liIilI && !ill1l && ($.outFlag = true));
}
async function ilII1l(lIIlll, ll1ii1 = "POST") {
  if (ll1ii1 === "POST") {
    return new Promise(async llili1 => {
      $.post(lIIlll, (iIllIl, I1ll, ll1iii) => {
        llili1({
          "err": iIllIl,
          "res": I1ll,
          "data": ll1iii
        });
      });
    });
  } else {
    if (ll1ii1 === "GET") return new Promise(async I1Iill => {
      $.get(lIIlll, (iilI1i, IiIlI1, iilI1l) => {
        I1Iill({
          "err": iilI1i,
          "res": IiIlI1,
          "data": iilI1l
        });
      });
    });else {
      const iI11I = "不支持的请求方法";
      return {
        "err": iI11I,
        "res": null,
        "data": null
      };
    }
  }
}
async function IIilII(I1IilI, iIllII) {
  try {
    switch (I1IilI) {
      case "getSimpleActInfoVo":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) {
            if (typeof iIllII.data.shopId != "undefined") $.shopId = iIllII.data.shopId;
            if (typeof iIllII.data.venderId != "undefined") $.venderId = iIllII.data.venderId;
          } else {
            if (iIllII.errorMessage) {
              console.log("" + (iIllII.errorMessage || ""));
            } else console.log("" + iIllII);
          }
        } else console.log("" + iIllII);
        break;
      case "getMyPing":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) {
            if (iIllII.data && typeof iIllII.data.secretPin != "undefined") $.Pin = iIllII.data.secretPin;
            if (iIllII.data && typeof iIllII.data.nickname != "undefined") $.nickname = iIllII.data.nickname;
          } else iIllII.errorMessage ? (console.log("" + (iIllII.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + iIllII);
        } else console.log("" + iIllII);
        break;
      case "getUserInfo":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) {
            if (iIllII.data && typeof iIllII.data.yunMidImageUrl != "undefined") $.attrTouXiang = iIllII.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else iIllII.errorMessage ? console.log("" + (iIllII.errorMessage || "")) : console.log("" + iIllII);
        } else {
          console.log("" + iIllII);
        }
        break;
      case "activityContent":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) $.endTime = iIllII.data.endTime || iIllII.data.activityVo && iIllII.data.activityVo.endTime || iIllII.data.activity.endTime || 0, $.hasEnd = iIllII.data.isEnd || false, $.score = iIllII.data.actorInfo.score || 0, $.actorUuid = iIllII.data.actorInfo.uuid || "", $.assistCount = iIllII.data.actorInfo.assistCount || 0;else iIllII.errorMessage ? console.log("" + (iIllII.errorMessage || "")) : console.log("" + iIllII);
        } else console.log("" + iIllII);
        break;
      case "assist":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) $.assistState = iIllII.data.assistState || 0, $.allOpenCard = iIllII.data.openCardInfo.openAll || false, $.openVenderId = iIllII.data.openCardInfo.openVenderId || [], iIllII?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (iIllII?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");else iIllII.errorMessage ? console.log("" + (iIllII.errorMessage || "")) : console.log("" + iIllII);
        } else console.log("" + iIllII);
        break;
      case "taskRecord":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) $.followShop = iIllII.data["20"].recordCount || 0, $.addCart = iIllII.data["23"].recordCount || 0, $.visitSku = iIllII.data["10"].recordCount || 0;else {
            if (iIllII.errorMessage) console.log("" + (iIllII.errorMessage || ""));else {
              console.log("" + iIllII);
            }
          }
        } else console.log("" + iIllII);
        break;
      case "checkOpenCard":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) {
            let li1lII = iIllII.data["10"].settingInfo || [],
              Il11II = iIllII.data.cardList || [],
              Iilll = iIllII.data.openCardList || [];
            $.openList = [...Il11II, ...li1lII, ...Iilll];
            $.openCardScore1 = iIllII.data.score1 || 0;
            $.openCardScore2 = iIllII.data.score2 || 0;
            $.drawScore = iIllII.data.drawScore || 0;
            if (iIllII.data.beans || iIllII.data.addBeanNum) console.log("开卡获得：" + (iIllII.data.beans || iIllII.data.addBeanNum) + "京豆 🐶");
          } else iIllII.errorMessage ? console.log("" + (iIllII.errorMessage || "")) : console.log("" + iIllII);
        } else console.log("" + iIllII);
        break;
      case "addSku":
      case "followShop":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) console.log("完成任务,获得" + (iIllII?.["data"]?.["beans"] || 0) + "京豆, " + (iIllII?.["data"]?.["score"] || 0) + "金币");else iIllII.errorMessage ? console.log("" + (iIllII.errorMessage || "")) : console.log("" + iIllII);
        } else console.log("" + iIllII);
        break;
      case "startDraw":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) {
            if (typeof iIllII.data == "object") {
              drawInfo = iIllII.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = iIllII.data.addressId, prizeName = drawInfo.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                    let Iilli = await ll1I1i("https://lzdz1-isv.isvjcloud.com", iilI, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    if (Iilli) $.isNode() && (await i1ii11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId="));else {
                      if ($.isNode()) {
                        await i1ii11.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId);
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
                    $.isNode() && (await i1ii11.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                    break;
                  case 16:
                    console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                    break;
                  default:
                    drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                    break;
                }
              } else console.log("💨  空气");
            } else console.log("" + iIllII);
          } else iIllII.errorMessage ? ($.runFalag = false, console.log("" + (iIllII.errorMessage || ""))) : console.log("" + iIllII);
        } else console.log("" + iIllII);
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) {
            if (typeof iIllII.data == "object") {
              let il1ll1 = "",
                Il11Ii = "抽奖";
              iIllII.data.addBeanNum && (il1ll1 = iIllII.data.addBeanNum + "京豆");
              iIllII.data.addPoint && (il1ll1 += " " + iIllII.data.addPoint + "游戏机会");
              if (I1IilI == "followShop") Il11Ii = "关注", iIllII.data.beans != "0" && (il1ll1 += iIllII.data.beans + "京豆 🐶");else {
                if (I1IilI == "addSku" || I1IilI == "addCart") Il11Ii = "加购", iIllII.data.beans != "0" && (il1ll1 += iIllII.data.beans + "京豆 🐶");else {
                  if (I1IilI == "viewVideo") Il11Ii = "热门文章";else {
                    if (I1IilI == "toShop") Il11Ii = "浏览店铺";else {
                      if (I1IilI == "visitSku" || I1IilI == "browseGoods") Il11Ii = "浏览商品";else {
                        if (I1IilI == "sign") Il11Ii = "签到";else {
                          let IillI = typeof iIllII.data.drawOk === "object" && iIllII.data.drawOk || iIllII.data;
                          il1ll1 = IillI.drawOk == true && IillI.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !il1ll1 && (il1ll1 = "空气 💨");
              console.log(Il11Ii + "获得：" + (il1ll1 || iIllII));
            } else console.log("" + iIllII);
          } else iIllII.errorMessage ? ($.runFalag = false, console.log("" + (iIllII.errorMessage || ""))) : console.log("" + iIllII);
        } else console.log("" + iIllII);
        break;
      case "drawRecord":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true) {
            let I11Ili = 0;
            for (let IIi1II of iIllII.data) {
              infoType = IIi1II.infoType;
              infoName = IIi1II.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", "")), I11Ili += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~"), await i1ii11.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName), await i1ii11.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            if (I11Ili > 0) {
              console.log("当前累计获得 " + I11Ili + " 京豆 🐶");
            }
          } else iIllII.errorMessage ? console.log("" + (iIllII.errorMessage || "")) : console.log("" + iIllII);
        } else console.log("" + iIllII);
        break;
      case "getShareRecord":
        if (typeof iIllII == "object") {
          if (iIllII.result && iIllII.result === true && iIllII.data) $.ShareCount = iIllII.data.shareList.length, $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");else iIllII.errorMessage ? console.log("" + (iIllII.errorMessage || "")) : console.log("" + iIllII);
        } else {
          console.log("" + iIllII);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(I1IilI + "-> " + iIllII);
    }
    typeof iIllII == "object" && iIllII.errorMessage && iIllII.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (l11I) {
    console.log(l11I);
  }
}
function l1Iil1(iiiii1, IIill1, iIII = "POST") {
  let Ii11iI = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": iilI,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return iiiii1.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (Ii11iI.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, Ii11iI.Cookie = "" + (li1Il1 && li1Il1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + i1ii1I), {
    "url": iiiii1,
    "method": iIII,
    "headers": Ii11iI,
    "body": IIill1,
    "timeout": 30000
  };
}
function IIiIl() {
  return new Promise(l1Ili => {
    let l1Ill = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1Ill, async (lllll1, II1iii, iII1lI) => {
      try {
        if (lllll1) {
          if (II1iii && typeof II1iii.statusCode != "undefined") {}
          console.log("" + $.toStr(lllll1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Ii11i1 = iII1lI.match(/(活动已经结束)/) && iII1lI.match(/(活动已经结束)/)[1] || "";
          Ii11i1 && ($.activityEnd = true, console.log("活动已结束"));
          iiiiI1(II1iii);
        }
      } catch (I1111I) {
        $.logErr(I1111I, II1iii);
      } finally {
        l1Ili();
      }
    });
  });
}
function iiiiI1(I1I1l) {
  if (I1I1l) {
    if (I1I1l.headers["set-cookie"]) {
      iilI = originCookie + ";";
      for (let illiII of I1I1l.headers["set-cookie"]) {
        IIilI1[illiII.split(";")[0].substr(0, illiII.split(";")[0].indexOf("="))] = illiII.split(";")[0].substr(illiII.split(";")[0].indexOf("=") + 1);
      }
      for (const li1IIl of Object.keys(IIilI1)) {
        iilI += li1IIl + "=" + IIilI1[li1IIl] + ";";
      }
      i1ii1I = iilI;
    }
  }
}
function IIiIi(ilili) {
  ilili = ilili || 32;
  let II1ili = "abcdef0123456789",
    ilill = II1ili.length,
    li1IIi = "";
  for (i = 0; i < ilili; i++) li1IIi += II1ili.charAt(Math.floor(Math.random() * ilill));
  return li1IIi;
}
function i1ii1i(iiiiiI) {
  if (typeof iiiiiI == "string") try {
    return JSON.parse(iiiiiI);
  } catch (lllliI) {
    return console.log(lllliI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function iiii() {
  if (!$.joinVenderId) return;
  return new Promise(async lIii1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let l1Il1i = "";
    if ($.shopactivityId) l1Il1i = ",\"activityId\":" + $.shopactivityId;
    const lIlII1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + l1Il1i + ",\"channel\":406}",
      Il111I = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lIlII1)
      },
      l1Il1l = await i1liI1("27004", Il111I),
      il1i = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + lIlII1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1Il1l),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": iilI
        }
      };
    $.get(il1i, async (lIlIII, iiiili, Il1111) => {
      try {
        if (lIlIII) console.log(lIlIII);else {
          const IIili1 = JSON.parse(Il1111);
          if (typeof IIili1 === "object") {
            if (IIili1.success === true) {
              console.log(IIili1.message);
              $.errorJoinShop = IIili1.message;
              if (IIili1.result && IIili1.result.giftInfo) for (let il11 of IIili1.result.giftInfo.giftList) {
                console.log("入会获得：" + il11.discountString + il11.prizeName + il11.secondLineDesc);
              }
            } else {
              if (typeof IIili1 == "object" && IIili1.message) $.errorJoinShop = IIili1.message, console.log("" + (IIili1.message || ""));else {
                console.log(Il1111);
              }
            }
          } else console.log(Il1111);
        }
      } catch (lIiiI) {
        $.logErr(lIiiI, iiiili);
      } finally {
        lIii1();
      }
    });
  });
}
async function iiil() {
  return new Promise(async I1111l => {
    let l111i1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const li1l1l = {
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l111i1)
      },
      li1l1i = await i1liI1("27004", li1l1l),
      lIiil = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + l111i1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(li1l1i),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": iilI
        }
      };
    $.get(lIiil, async (iII1ll, I1111i, iliiI) => {
      try {
        if (iII1ll) console.log(iII1ll);else {
          const iiiill = JSON.parse(iliiI);
          typeof iiiill === "object" ? iiiill.success === true && (console.log("去加入：" + (iiiill.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = iiiill.result.interestsRuleList && iiiill.result.interestsRuleList[0] && iiiill.result.interestsRuleList[0].interestsInfo && iiiill.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = iiiill.result.userInfo.openCardStatus) : console.log(iliiI);
        }
      } catch (Ii11ii) {
        $.logErr(Ii11ii, I1111i);
      } finally {
        I1111l();
      }
    });
  });
}
function li1Iil(lIll11) {
  return new Promise(lII1li => {
    const lII1ll = {
      "url": "" + lIll11,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lII1ll, async (lIilI, lli1I1, II1I1i) => {
      try {
        if (lIilI) {} else II1I1i ? II1I1i = JSON.parse(II1I1i) : console.log("未获取到数据,请重新运行");
      } catch (ilIl1I) {
        $.logErr(ilIl1I, lli1I1);
        II1I1i = null;
      } finally {
        lII1li(II1I1i);
      }
    });
  });
}
function ill11(lIiI, lII1lI) {
  return Math.floor(Math.random() * (lII1lI - lIiI)) + lIiI;
}
function i1ii1l() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const ilIIIi = Array.from(new Set($.blacklist.split("&")));
  console.log(ilIIIi.join("&") + "\n");
  let iIiI11 = ilIIIi,
    IIi1l = [],
    IIi1i = false;
  for (let IlIii1 = 0; IlIii1 < ll1I1l.length; IlIii1++) {
    let lIl1 = decodeURIComponent(ll1I1l[IlIii1].match(/pt_pin=([^; ]+)(?=;?)/) && ll1I1l[IlIii1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!lIl1) break;
    let i1li11 = false;
    for (let lII1l1 of iIiI11) {
      if (lII1l1 && lII1l1 == lIl1) {
        i1li11 = true;
        break;
      }
    }
    !i1li11 && (IIi1i = true, IIi1l.splice(IlIii1, -1, ll1I1l[IlIii1]));
  }
  if (IIi1i) ll1I1l = IIi1l;
}
function iiIIil(iIIll, IIi1I) {
  IIi1I != 0 && iIIll.unshift(iIIll.splice(IIi1I, 1)[0]);
}
function iiIIii() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(ll1I1l, ll1I1l));
    return;
  }
  console.log("当前已设置白名单：");
  const Il1Iil = Array.from(new Set($.whitelist.split("&")));
  console.log(Il1Iil.join("&") + "\n");
  let ilI = [],
    iIIlI = Il1Iil;
  for (let illiI1 in ll1I1l) {
    let iIll1i = decodeURIComponent(ll1I1l[illiI1].match(/pt_pin=([^; ]+)(?=;?)/) && ll1I1l[illiI1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iIIlI.includes(iIll1i) && ilI.push(ll1I1l[illiI1]);
  }
  helpCookiesArr = ilI;
  if (iIIlI.length > 1) for (let iIIii in iIIlI) {
    let Ii1l1 = iIIlI[iIIlI.length - 1 - iIIii];
    if (!Ii1l1) continue;
    for (let Il1IlI in helpCookiesArr) {
      let l11Ii = decodeURIComponent(helpCookiesArr[Il1IlI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[Il1IlI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      Ii1l1 == l11Ii && iiIIil(helpCookiesArr, Il1IlI);
    }
  }
}