/*
9.22-10.3 金秋好礼 中秋相伴
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 9.22-10.3 金秋好礼 中秋相伴 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:10 12 22,25,28 * *
============Quantumultx===============
[task_local]
#9.22-10.3 金秋好礼 中秋相伴
10 12 22,25,28 * * jd_opencardL335.js, tag=9.22-10.3 金秋好礼 中秋相伴, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('9.22-10.3 金秋好礼 中秋相伴')
const l1l1iIII = $.isNode() ? require("./jdCookie.js") : "",
  i111I1 = $.isNode() ? require("./sendNotify") : "";
let lil1ilII = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  IlIlii11 = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const li1llIii = require("./function/krgetToken"),
  IIl11 = require("./function/krh5st"),
  liIIiiil = require("./function/jdCommon"),
  iiiI1I1 = require("./function/krwxSavePrize");
let i11lIIl = "https://lzdz1-isv.isvjcloud.com",
  llil1iii = [],
  l1illi1l = "",
  Ii1Ii1il = {};
if ($.isNode()) {
  Object.keys(l1l1iIII).forEach(l1IiIiiI => {
    llil1iii.push(l1l1iIII[l1IiIiiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else llil1iii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIII($.getdata("CookiesJD") || "[]").map(il1i111l => il1i111l.cookie)].filter(I11III => !!I11III);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let I1111li1 = "",
  liiIiIil = "",
  Il1ii1lI = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  llilli1 = "",
  lliIlii = "";
$.whitelist = process.env.jd_opencard_whitelist || llilli1;
$.blacklist = process.env.jd_opencard_blacklist || lliIlii;
Iliii1l1();
ilIiiI1l();
$.errMsgPin = [];
!(async () => {
  if (Il1ii1lI === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!llil1iii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await lil1iiil("http://code.kingran.cf/335.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[i1I1l1il(0, authorCodeList.length)];else {
    let l1i11Ili = ["33ba1a37e1c14cd49aa7e43aee3f859f", "dc345e634c1e446fb3722112b49fd2ff"];
    $.authorCode = l1i11Ili[i1I1l1il(0, l1i11Ili.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "ac4631db1b4046c3852650c2f7c74720";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let l11IiIll = 0; l11IiIll < llil1iii.length; l11IiIll++) {
    l1illi1l = llil1iii[l11IiIll];
    originCookie = llil1iii[l11IiIll];
    if (l1illi1l) {
      $.UserName = decodeURIComponent(l1illi1l.match(/pt_pin=([^; ]+)(?=;?)/) && l1illi1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l11IiIll + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = liIIiiil.genUA($.UserName);
      await i1ilii();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let i11Ii111 = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + i11Ii111;
  }
  if ($.outFlag) {
    let i1lIiiI = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + i1lIiiI);
    if ($.isNode()) await i111I1.sendNotify("" + $.name, "" + i1lIiiI);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(li1iilii => $.logErr(li1iilii)).finally(() => $.done());
async function i1ilii() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    I1111li1 = "";
    $.Token = "";
    $.Pin = "";
    let iI11iIll = false;
    $.Token = await li1llIii(l1illi1l, i11lIIl);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await lIi1I1l();
    if (liiIiIil == "") {
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
    await I1IlIi11("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await I1IlIi11("accessLogWithAD");
    await I1IlIi11("activityContent");
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
    await I1IlIi11("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await I1IlIi11("checkOpenCard");
    await I1IlIi11("taskRecord");
    await $.wait(1000);
    await I1IlIi11("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          iI11iIll = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await ii1Il1II();
          for (let IlIil1Il = 0; IlIil1Il < Array(2).length; IlIil1Il++) {
            if (IlIil1Il > 0) console.log("第" + IlIil1Il + "次 重新开卡");
            await I1I11II1();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await I1IlIi11("activityContent");
          await I1IlIi11("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    !$.followShop && !$.outFlag && (console.log(""), await I1IlIi11("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    IlIlii11 && !$.addCart && !$.outFlag && (await I1IlIi11("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await I1IlIi11("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await I1IlIi11("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    iI11iIll && (await I1IlIi11("activityContent"));
    if (lil1ilII + "" !== "0") {
      $.runFalag = true;
      let iIllII11 = parseInt($.score / 100);
      lil1ilII = parseInt(lil1ilII, 10);
      if (iIllII11 > lil1ilII) iIllII11 = lil1ilII;
      console.log("已设置抽奖次数为" + iIllII11 + "次，当前有" + $.score + "金币");
      for (m = 1; iIllII11--; m++) {
        console.log("进行第" + m + "次抽奖");
        await I1IlIi11("startDraw");
        if ($.runFalag == false) break;
        if (Number(iIllII11) <= 0) break;
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
    await I1IlIi11("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (IliiIlll) {
    console.log(IliiIlll);
  }
}
async function I1IlIi11(iilil1I1) {
  if ($.outFlag) return;
  let I1iliI11 = "https://lzdz1-isv.isvjcloud.com",
    liliiiIl = "",
    iIIi1il1 = "POST";
  switch (iilil1I1) {
    case "getSimpleActInfoVo":
      url = I1iliI11 + "/dz/common/getSimpleActInfoVo", liliiiIl = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = I1iliI11 + "/customer/getMyPing", liliiiIl = "userId=1000015549&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = I1iliI11 + "/common/accessLogWithAD";
      let IiIlIl = I1iliI11 + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      liliiiIl = "venderId=1000015549&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(IiIlIl) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = I1iliI11 + "/wxActionCommon/getUserInfo", liliiiIl = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = I1iliI11 + "/dingzhi/joinCommon/activityContent", liliiiIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = I1iliI11 + "/dingzhi/joinCommon/drawContent", liliiiIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = I1iliI11 + "/dingzhi/joinCommon/taskInfo", liliiiIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = I1iliI11 + "/dingzhi/joinCommon/assist", liliiiIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = I1iliI11 + "/dingzhi/joinCommon/taskRecord", liliiiIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = I1iliI11 + "/dingzhi/joinCommon/doTask", liliiiIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = I1iliI11 + "/dingzhi/joinCommon/doTask", liliiiIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = I1iliI11 + "/dingzhi/joinCommon/doTask", liliiiIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = I1iliI11 + "/dingzhi/opencard/" + iilil1I1, liliiiIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (iilil1I1 == "browseGoods") liliiiIl += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = I1iliI11 + "/dingzhi/opencard/" + iilil1I1;
      let lI11lilI = "",
        liIlilil = "";
      if (iilil1I1 == "viewVideo") lI11lilI = 31, liIlilil = 31;else {
        if (iilil1I1 == "visitSku") lI11lilI = 5, liIlilil = $.visitSkuValue || 5;else {
          if (iilil1I1 == "toShop") lI11lilI = 14, liIlilil = $.toShopValue || 14;else iilil1I1 == "addSku" && (lI11lilI = 2, liIlilil = $.addSkuValue || 2);
        }
      }
      liliiiIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + lI11lilI + "&taskValue=" + liIlilil;
      break;
    case "drawRecord":
      url = I1iliI11 + "/dingzhi/joinCommon/drawRecord", liliiiIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = I1iliI11 + "/dingzhi/joinCommon/shareRecord", liliiiIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = I1iliI11 + "/dingzhi/joinCommon/startDraw", liliiiIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + iilil1I1);
  }
  let iI1IIII = III1Illl(url, liliiiIl, iIIi1il1);
  iIIi1il1 === "GET" && (delete requestOptions.body, delete requestOptions["Content-Type"]);
  const llIi1il1 = 5;
  let IlIilIi1 = 0,
    Ililiiii = null,
    iiIllI = false;
  while (IlIilIi1 < llIi1il1) {
    if (IlIilIi1 > 0) {
      await $.wait(1000);
    }
    const {
      err: lIl1IIIl,
      res: I1I1l1I,
      data: iIIi11ii
    } = await lli1ii1(iI1IIII, iIIi1il1);
    if (lIl1IIIl) {
      if (typeof lIl1IIIl === "string" && lIl1IIIl.includes("Timeout awaiting 'request'")) Ililiiii = iilil1I1 + " 请求超时，请检查网络重试";else {
        const lll1illI = I1I1l1I?.["statusCode"];
        if (lll1illI) {
          if ([403, 493].includes(lll1illI)) Ililiiii = iilil1I1 + " 请求失败，IP被限制（Response code " + lll1illI + "）", iiIllI = true;else [400, 404].includes(lll1illI) ? Ililiiii = iilil1I1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + lll1illI + "）" : Ililiiii = iilil1I1 + " 请求失败（Response code " + lll1illI + "）";
        } else Ililiiii = iilil1I1 + " 请求失败 => " + (lIl1IIIl.message || lIl1IIIl);
      }
      IlIilIi1++;
    } else {
      const IilIiI1l = liIIiiil.getResponseCookie(I1I1l1I, liiIiIil),
        IlililI1 = false;
      if (IlililI1) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + iilil1I1 + " 响应Body => " + (iIIi11ii || "无") + "\n");
        console.log("🔧 " + iilil1I1 + " 响应Cookie => " + (IilIiI1l || "无") + "\n");
        console.log("🔧 " + iilil1I1 + " 请求参数");
        console.log(requestOptions);
        console.log("\n---------------------------------------------------\n");
      }
      let Il11iI = "";
      switch (iilil1I1) {
        case "getMyPing":
          Il11iI = liIIiiil.getCookieValue(IilIiI1l, "LZ_AES_PIN");
          Il11iI ? $.LZ_AES_PIN = Il11iI : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(iilil1I1) && (liiIiIil = IilIiI1l);
      Il11iI = liIIiiil.getCookieValue(liiIiIil, "LZ_AES_PIN");
      if (!Il11iI && $.LZ_AES_PIN) {
        liiIiIil += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ";
      }
      const l11IIlll = liIIiiil.getCookieValue(liiIiIil, "pToken");
      !l11IIlll && $.pinToken && (liiIiIil += "pToken=" + $.pinToken + "; ");
      const ii1Ill1 = liIIiiil.getCookieValue(liiIiIil, "AUTH_C_USER");
      if (!ii1Ill1 && $.secretPin) {
        liiIiIil += "AUTH_C_USER=" + $.secretPin + "; ";
      }
      const I1IIIlll = liIIiiil.getCookieValue(liiIiIil, "te");
      !I1IIIlll && $.te && (liiIiIil += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(iilil1I1)) {
        if (iIIi11ii) try {
          const I111iIl = JSON.parse(iIIi11ii);
          IillIi(iilil1I1, I111iIl);
          break;
        } catch (iIli11li) {
          Ililiiii = "❌ " + iilil1I1 + " 接口响应数据解析失败: " + iIli11li.message;
          console.log("🚫 " + iilil1I1 + " => " + String(iIIi11ii));
          IlililI1 && (console.log("\n---------------------------------------------------\n"), console.log(liiIiIil), console.log("\n---------------------------------------------------\n"));
          IlIilIi1++;
        } else Ililiiii = "❌ " + iilil1I1 + " 接口无响应数据", IlIilIi1++;
      } else break;
      iiIllI = false;
    }
  }
  if (IlIilIi1 >= llIi1il1) {
    console.log(Ililiiii);
    if (iiIllI) {
      !hotbreak && ($.outFlag = true);
    }
  }
}
async function lli1ii1(IiIIiII1, lll11li = "POST") {
  if (lll11li === "POST") return new Promise(async lillIlil => {
    $.post(IiIIiII1, (i11IlIIl, lI1ll1l, IlI1I1ll) => {
      lillIlil({
        "err": i11IlIIl,
        "res": lI1ll1l,
        "data": IlI1I1ll
      });
    });
  });else {
    if (lll11li === "GET") return new Promise(async l1l1lIiI => {
      $.get(IiIIiII1, (IiiillII, iiiiIIIl, iiII1liI) => {
        l1l1lIiI({
          "err": IiiillII,
          "res": iiiiIIIl,
          "data": iiII1liI
        });
      });
    });else {
      const lllI1II1 = "不支持的请求方法";
      return {
        "err": lllI1II1,
        "res": null,
        "data": null
      };
    }
  }
}
async function IillIi(II1li1i, iIilliil) {
  try {
    switch (II1li1i) {
      case "getSimpleActInfoVo":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) {
            if (typeof iIilliil.data.shopId != "undefined") $.shopId = iIilliil.data.shopId;
            if (typeof iIilliil.data.venderId != "undefined") $.venderId = iIilliil.data.venderId;
          } else iIilliil.errorMessage ? console.log("" + (iIilliil.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "getMyPing":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) {
            if (iIilliil.data && typeof iIilliil.data.secretPin != "undefined") $.Pin = iIilliil.data.secretPin;
            if (iIilliil.data && typeof iIilliil.data.nickname != "undefined") $.nickname = iIilliil.data.nickname;
          } else iIilliil.errorMessage ? (console.log("" + (iIilliil.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "getUserInfo":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) {
            if (iIilliil.data && typeof iIilliil.data.yunMidImageUrl != "undefined") $.attrTouXiang = iIilliil.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else iIilliil.errorMessage ? console.log("" + (iIilliil.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "activityContent":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) {
            $.endTime = iIilliil.data.endTime || iIilliil.data.activityVo && iIilliil.data.activityVo.endTime || iIilliil.data.activity.endTime || 0;
            $.hasEnd = iIilliil.data.isEnd || false;
            $.score = iIilliil.data.actorInfo.score || 0;
            $.actorUuid = iIilliil.data.actorInfo.uuid || "";
            $.assistCount = iIilliil.data.actorInfo.assistCount || 0;
          } else iIilliil.errorMessage ? console.log("" + (iIilliil.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "assist":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) $.assistState = iIilliil.data.assistState || 0, $.allOpenCard = iIilliil.data.openCardInfo.openAll || false, $.openVenderId = iIilliil.data.openCardInfo.openVenderId || [], iIilliil?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (iIilliil?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");else iIilliil.errorMessage ? console.log("" + (iIilliil.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "taskRecord":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) $.followShop = iIilliil.data["20"].recordCount || 0, $.addCart = iIilliil.data["23"].recordCount || 0, $.visitSku = iIilliil.data["10"].recordCount || 0;else {
            if (iIilliil.errorMessage) {
              console.log("" + (iIilliil.errorMessage || ""));
            } else console.log("" + data);
          }
        } else console.log("" + data);
        break;
      case "checkOpenCard":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) {
            let II1IlIl = iIilliil.data["10"].settingInfo || [],
              ll1IiilI = iIilliil.data.cardList || [],
              I1i1I1ii = iIilliil.data.openCardList || [];
            $.openList = [...ll1IiilI, ...II1IlIl, ...I1i1I1ii];
            $.openCardScore1 = iIilliil.data.score1 || 0;
            $.openCardScore2 = iIilliil.data.score2 || 0;
            $.drawScore = iIilliil.data.drawScore || 0;
            if (iIilliil.data.beans || iIilliil.data.addBeanNum) console.log("开卡获得：" + (iIilliil.data.beans || iIilliil.data.addBeanNum) + "京豆 🐶");
          } else iIilliil.errorMessage ? console.log("" + (iIilliil.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "addSku":
      case "followShop":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) console.log("完成任务,获得" + (iIilliil?.["data"]?.["beans"] || 0) + "京豆, " + (iIilliil?.["data"]?.["score"] || 0) + "金币");else iIilliil.errorMessage ? console.log("" + (iIilliil.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "startDraw":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) {
            if (typeof iIilliil.data == "object") {
              drawInfo = iIilliil.data.drawInfo;
              if (drawInfo) switch (drawInfo.type) {
                case 6:
                  console.log("🎉 " + drawInfo.name + " 🐶");
                  break;
                case 7:
                  generateId = iIilliil.data.addressId, prizeName = drawInfo.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName);
                  if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                  let I1IlIi = await iiiI1I1("https://lzdz1-isv.isvjcloud.com", l1illi1l, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                  if (I1IlIi) $.isNode() && (await i111I1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId="));else {
                    $.isNode() && (await i111I1.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
                  $.isNode() && (await i111I1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
            } else console.log("" + data);
          } else iIilliil.errorMessage ? ($.runFalag = false, console.log("" + (iIilliil.errorMessage || ""))) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) {
            if (typeof iIilliil.data == "object") {
              let I1i1IIIl = "",
                lll1Ili = "抽奖";
              iIilliil.data.addBeanNum && (I1i1IIIl = iIilliil.data.addBeanNum + "京豆");
              if (iIilliil.data.addPoint) {
                I1i1IIIl += " " + iIilliil.data.addPoint + "游戏机会";
              }
              if (II1li1i == "followShop") lll1Ili = "关注", iIilliil.data.beans != "0" && (I1i1IIIl += iIilliil.data.beans + "京豆 🐶");else {
                if (II1li1i == "addSku" || II1li1i == "addCart") {
                  lll1Ili = "加购";
                  if (iIilliil.data.beans != "0") {
                    I1i1IIIl += iIilliil.data.beans + "京豆 🐶";
                  }
                } else {
                  if (II1li1i == "viewVideo") lll1Ili = "热门文章";else {
                    if (II1li1i == "toShop") {
                      lll1Ili = "浏览店铺";
                    } else {
                      if (II1li1i == "visitSku" || II1li1i == "browseGoods") lll1Ili = "浏览商品";else {
                        if (II1li1i == "sign") lll1Ili = "签到";else {
                          let l1Iill1I = typeof iIilliil.data.drawOk === "object" && iIilliil.data.drawOk || iIilliil.data;
                          I1i1IIIl = l1Iill1I.drawOk == true && l1Iill1I.name || "";
                        }
                      }
                    }
                  }
                }
              }
              if (!I1i1IIIl) {
                I1i1IIIl = "空气 💨";
              }
              console.log(lll1Ili + "获得：" + (I1i1IIIl || data));
            } else {
              console.log("" + data);
            }
          } else {
            if (iIilliil.errorMessage) $.runFalag = false, console.log("" + (iIilliil.errorMessage || ""));else {
              console.log("" + data);
            }
          }
        } else console.log("" + data);
        break;
      case "drawRecord":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true) {
            let lilI1lIl = 0;
            for (let l1IiiII of iIilliil.data) {
              infoType = l1IiiII.infoType;
              infoName = l1IiiII.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", "")), lilI1lIl += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~"), await i111I1.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName), await i111I1.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            lilI1lIl > 0 && console.log("当前累计获得 " + lilI1lIl + " 京豆 🐶");
          } else iIilliil.errorMessage ? console.log("" + (iIilliil.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "getShareRecord":
        if (typeof iIilliil == "object") {
          if (iIilliil.result && iIilliil.result === true && iIilliil.data) $.ShareCount = iIilliil.data.shareList.length, $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");else {
            if (iIilliil.errorMessage) console.log("" + (iIilliil.errorMessage || ""));else {
              console.log("" + data);
            }
          }
        } else console.log("" + data);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(II1li1i + "-> " + data);
    }
    typeof iIilliil == "object" && iIilliil.errorMessage && iIilliil.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (IiIiilII) {
    console.log(IiIiilII);
  }
}
function III1Illl(IIIilll, i11Ilii, liIl1Iii = "POST") {
  let l1Ii1iiI = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": l1illi1l,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IIIilll.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (l1Ii1iiI.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, l1Ii1iiI.Cookie = "" + (I1111li1 && I1111li1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + liiIiIil), {
    "url": IIIilll,
    "method": liIl1Iii,
    "headers": l1Ii1iiI,
    "body": i11Ilii,
    "timeout": 30000
  };
}
function lIi1I1l() {
  return new Promise(iliilII => {
    let Ii1il1l = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(Ii1il1l, async (IIIilII1, IllIlli1, liIl1ii1) => {
      try {
        if (IIIilII1) {
          if (IllIlli1 && typeof IllIlli1.statusCode != "undefined") {}
          console.log("" + $.toStr(IIIilII1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IIIl11i1 = liIl1ii1.match(/(活动已经结束)/) && liIl1ii1.match(/(活动已经结束)/)[1] || "";
          IIIl11i1 && ($.activityEnd = true, console.log("活动已结束"));
          iIl11I11(IllIlli1);
        }
      } catch (iiI1lIli) {
        $.logErr(iiI1lIli, IllIlli1);
      } finally {
        iliilII();
      }
    });
  });
}
function iIl11I11(ilii1iIl) {
  if (ilii1iIl) {
    if (ilii1iIl.headers["set-cookie"]) {
      l1illi1l = originCookie + ";";
      for (let iIliiII1 of ilii1iIl.headers["set-cookie"]) {
        Ii1Ii1il[iIliiII1.split(";")[0].substr(0, iIliiII1.split(";")[0].indexOf("="))] = iIliiII1.split(";")[0].substr(iIliiII1.split(";")[0].indexOf("=") + 1);
      }
      for (const IlI111 of Object.keys(Ii1Ii1il)) {
        l1illi1l += IlI111 + "=" + Ii1Ii1il[IlI111] + ";";
      }
      liiIiIil = l1illi1l;
    }
  }
}
function IiI11lli(ll1l11Ii) {
  ll1l11Ii = ll1l11Ii || 32;
  let iIIi1lil = "abcdef0123456789",
    IiIllll1 = iIIi1lil.length,
    Iil1l11I = "";
  for (i = 0; i < ll1l11Ii; i++) Iil1l11I += iIIi1lil.charAt(Math.floor(Math.random() * IiIllll1));
  return Iil1l11I;
}
function IIII(III1IIli) {
  if (typeof III1IIli == "string") try {
    return JSON.parse(III1IIli);
  } catch (llllI1) {
    return console.log(llllI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function I1I11II1() {
  if (!$.joinVenderId) return;
  return new Promise(async i1iIiliI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lilIi111 = "";
    if ($.shopactivityId) lilIi111 = ",\"activityId\":" + $.shopactivityId;
    const IiilIli = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lilIi111 + ",\"channel\":406}",
      lIlIiII = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IiilIli)
      },
      i1Ii1IIl = await IIl11("27004", lIlIiII),
      liI1il1i = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + IiilIli + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1Ii1IIl),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": l1illi1l
        }
      };
    $.get(liI1il1i, async (iiiiI1Il, I1ilIl1l, liiII1l) => {
      try {
        if (iiiiI1Il) console.log(iiiiI1Il);else {
          const I1l111 = JSON.parse(liiII1l);
          if (typeof I1l111 === "object") {
            if (I1l111.success === true) {
              console.log(I1l111.message);
              $.errorJoinShop = I1l111.message;
              if (I1l111.result && I1l111.result.giftInfo) for (let I1lIi1Ii of I1l111.result.giftInfo.giftList) {
                console.log("入会获得：" + I1lIi1Ii.discountString + I1lIi1Ii.prizeName + I1lIi1Ii.secondLineDesc);
              }
            } else typeof I1l111 == "object" && I1l111.message ? ($.errorJoinShop = I1l111.message, console.log("" + (I1l111.message || ""))) : console.log(liiII1l);
          } else console.log(liiII1l);
        }
      } catch (lIIiiii) {
        $.logErr(lIIiiii, I1ilIl1l);
      } finally {
        i1iIiliI();
      }
    });
  });
}
async function ii1Il1II() {
  return new Promise(async il1Ii1 => {
    let iiII1I1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iiiI111l = {
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iiII1I1)
      },
      i1Ii1iiI = await IIl11("27004", iiiI111l),
      iil1ll11 = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + iiII1I1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1Ii1iiI),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": l1illi1l
        }
      };
    $.get(iil1ll11, async (iIIIlIII, iIIli1ll, lil1llII) => {
      try {
        if (iIIIlIII) console.log(iIIIlIII);else {
          const II1ii1l1 = JSON.parse(lil1llII);
          if (typeof II1ii1l1 === "object") II1ii1l1.success === true && (console.log("去加入：" + (II1ii1l1.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = II1ii1l1.result.interestsRuleList && II1ii1l1.result.interestsRuleList[0] && II1ii1l1.result.interestsRuleList[0].interestsInfo && II1ii1l1.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = II1ii1l1.result.userInfo.openCardStatus);else {
            console.log(lil1llII);
          }
        }
      } catch (IilII) {
        $.logErr(IilII, iIIli1ll);
      } finally {
        il1Ii1();
      }
    });
  });
}
function lil1iiil(iil1iII1) {
  return new Promise(lIilI111 => {
    const Ii111I = {
      "url": "" + iil1iII1,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(Ii111I, async (iI1ll1i, l1ilil11, Iill1lli) => {
      try {
        if (iI1ll1i) {} else Iill1lli ? Iill1lli = JSON.parse(Iill1lli) : console.log("未获取到数据,请重新运行");
      } catch (iIiIi1II) {
        $.logErr(iIiIi1II, l1ilil11);
        Iill1lli = null;
      } finally {
        lIilI111(Iill1lli);
      }
    });
  });
}
function i1I1l1il(iiI1llii, lilI11i1) {
  return Math.floor(Math.random() * (lilI11i1 - iiI1llii)) + iiI1llii;
}
function ilIiiI1l() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const i1iiiIil = Array.from(new Set($.blacklist.split("&")));
  console.log(i1iiiIil.join("&") + "\n");
  let lilIIIlI = i1iiiIil,
    IIl1ilII = [],
    llIII1 = false;
  for (let i1liI1Il = 0; i1liI1Il < llil1iii.length; i1liI1Il++) {
    let llIll1lI = decodeURIComponent(llil1iii[i1liI1Il].match(/pt_pin=([^; ]+)(?=;?)/) && llil1iii[i1liI1Il].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!llIll1lI) break;
    let liIl1iII = false;
    for (let IllIli11 of lilIIIlI) {
      if (IllIli11 && IllIli11 == llIll1lI) {
        liIl1iII = true;
        break;
      }
    }
    !liIl1iII && (llIII1 = true, IIl1ilII.splice(i1liI1Il, -1, llil1iii[i1liI1Il]));
  }
  if (llIII1) llil1iii = IIl1ilII;
}
function IiiIilI(IlI111iI, lIiIill) {
  lIiIill != 0 && IlI111iI.unshift(IlI111iI.splice(lIiIill, 1)[0]);
}
function Iliii1l1() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(llil1iii, llil1iii));
    return;
  }
  console.log("当前已设置白名单：");
  const ii111ili = Array.from(new Set($.whitelist.split("&")));
  console.log(ii111ili.join("&") + "\n");
  let l1lII1Il = [],
    iillli1I = ii111ili;
  for (let I11IlIl1 in llil1iii) {
    let I1li1lIl = decodeURIComponent(llil1iii[I11IlIl1].match(/pt_pin=([^; ]+)(?=;?)/) && llil1iii[I11IlIl1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iillli1I.includes(I1li1lIl) && l1lII1Il.push(llil1iii[I11IlIl1]);
  }
  helpCookiesArr = l1lII1Il;
  if (iillli1I.length > 1) for (let Iilii1ii in iillli1I) {
    let ii1ii = iillli1I[iillli1I.length - 1 - Iilii1ii];
    if (!ii1ii) continue;
    for (let lliiII1l in helpCookiesArr) {
      let i1liIllI = decodeURIComponent(helpCookiesArr[lliiII1l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lliiII1l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      ii1ii == i1liIllI && IiiIilI(helpCookiesArr, lliiII1l);
    }
  }
}