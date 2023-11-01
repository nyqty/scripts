/*
10.30-11.6 品质生活 美力全开
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 10.30-11.6 品质生活 美力全开 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#10.30-11.6 品质生活 美力全开
11 11 11 11 * jd_opencardL339.js, tag=10.30-11.6 品质生活 美力全开, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('10.30-11.6 品质生活 美力全开')

const IlIllI1I = $.isNode() ? require("./jdCookie.js") : "",
  iiilliII = $.isNode() ? require("./sendNotify") : "";
let IiliiI1I = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  lll11Ill = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const llIiiI11 = require("./function/krgetToken"),
  IiilIll = require("./function/krh5st"),
  i1lilIlI = require("./function/jdCommon"),
  llI11lli = require("./function/krwxSavePrize");
let llIii11i = "https://lzdz1-isv.isvjcloud.com",
  iiIliiI = [],
  IIilIIii = "",
  IIl1lI1l = {};
if ($.isNode()) {
  Object.keys(IlIllI1I).forEach(i1IIIi1 => {
    iiIliiI.push(IlIllI1I[i1IIIi1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  iiIliiI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIII1II($.getdata("CookiesJD") || "[]").map(lliil1lI => lliil1lI.cookie)].filter(lIIIill1 => !!lIIIill1);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let IiI11lIi = "",
  Ii1iiIi = "",
  i1l1lilI = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  IIllIil1 = "",
  llI111i = "";
$.whitelist = process.env.jd_opencard_whitelist || IIllIil1;
$.blacklist = process.env.jd_opencard_blacklist || llI111i;
iI1I1Il();
i11lIII1();
$.errMsgPin = [];
!(async () => {
  if (i1l1lilI === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!iiIliiI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await I1lIiliI("http://code.kingran.cf/341.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[liI1l1II(0, authorCodeList.length)];
  } else {
    let IiIiIlll = ["cfcee950fadb42ffa7e1c53c105db8fa"];
    $.authorCode = IiIiIlll[liI1l1II(0, IiIiIlll.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "0ad5de226321440186d2d3a1bd2b87e6";
  $.shareUuid = $.authorCode;
  console.log("❖ 活动入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId);
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let Ii1llII1 = 0; Ii1llII1 < iiIliiI.length; Ii1llII1++) {
    IIilIIii = iiIliiI[Ii1llII1];
    originCookie = iiIliiI[Ii1llII1];
    if (IIilIIii) {
      $.UserName = decodeURIComponent(IIilIIii.match(/pt_pin=([^; ]+)(?=;?)/) && IIilIIii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Ii1llII1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = i1lilIlI.genUA($.UserName);
      await iiIlIlIl();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  if ($.errMsgPin.length > 0) {
    let lI1l1lii = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + lI1l1lii;
  }
  if ($.outFlag) {
    let Ii1IiI1i = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + Ii1IiI1i);
    if ($.isNode()) {
      await iiilliII.sendNotify("" + $.name, "" + Ii1IiI1i);
    }
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(llIIlll => $.logErr(llIIlll)).finally(() => $.done());
async function iiIlIlIl() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    IiI11lIi = "";
    $.Token = "";
    $.Pin = "";
    let iillii = false;
    $.Token = await llIiiI11(IIilIIii, llIii11i);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IliliiI();
    if (Ii1iiIi == "") {
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
    await iIilIilI("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await iIilIilI("accessLogWithAD");
    await iIilIilI("activityContent");
    if ($.hotFlag) {
      return;
    }
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
    await iIilIilI("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await iIilIilI("checkOpenCard");
    await iIilIilI("taskRecord");
    await $.wait(1000);
    await iIilIilI("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          iillii = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await IlillIII();
          for (let lIlI11 = 0; lIlI11 < Array(2).length; lIlI11++) {
            if (lIlI11 > 0) {
              console.log("第" + lIlI11 + "次 重新开卡");
            }
            await lllllII();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await iIilIilI("activityContent");
          await iIilIilI("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else {
      console.log("已全部开卡");
    }
    !$.followShop && !$.outFlag && (console.log(""), await iIilIilI("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    lll11Ill && !$.addCart && !$.outFlag && (await iIilIilI("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await iIilIilI("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await iIilIilI("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    iillii && (await iIilIilI("activityContent"));
    if (IiliiI1I + "" !== "0") {
      $.runFalag = true;
      let I1IiIlii = parseInt($.score / 100);
      IiliiI1I = parseInt(IiliiI1I, 10);
      if (I1IiIlii > IiliiI1I) {
        I1IiIlii = IiliiI1I;
      }
      console.log("已设置抽奖次数为" + I1IiIlii + "次，当前有" + $.score + "金币");
      for (m = 1; I1IiIlii--; m++) {
        console.log("进行第" + m + "次抽奖");
        await iIilIilI("startDraw");
        if ($.runFalag == false) {
          break;
        }
        if (Number(I1IiIlii) <= 0) {
          break;
        }
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
    await iIilIilI("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) {
      await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
    }
  } catch (l1iillll) {
    console.log(l1iillll);
  }
}
async function iIilIilI(l1lIlili) {
  if ($.outFlag) {
    return;
  }
  let lilI1iiI = "https://lzdz1-isv.isvjcloud.com",
    lII11IIl = "",
    IIiIIi1I = "POST";
  switch (l1lIlili) {
    case "getSimpleActInfoVo":
      url = lilI1iiI + "/dz/common/getSimpleActInfoVo";
      lII11IIl = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = lilI1iiI + "/customer/getMyPing";
      lII11IIl = "userId=1000395688&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = lilI1iiI + "/common/accessLogWithAD";
      let IliiiIli = lilI1iiI + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      lII11IIl = "venderId=1000395688&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(IliiiIli) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = lilI1iiI + "/wxActionCommon/getUserInfo";
      lII11IIl = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = lilI1iiI + "/dingzhi/joinCommon/activityContent";
      lII11IIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = lilI1iiI + "/dingzhi/joinCommon/drawContent";
      lII11IIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = lilI1iiI + "/dingzhi/joinCommon/taskInfo";
      lII11IIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = lilI1iiI + "/dingzhi/joinCommon/assist";
      lII11IIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = lilI1iiI + "/dingzhi/joinCommon/taskRecord";
      lII11IIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = lilI1iiI + "/dingzhi/joinCommon/doTask";
      lII11IIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = lilI1iiI + "/dingzhi/joinCommon/doTask";
      lII11IIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = lilI1iiI + "/dingzhi/joinCommon/doTask";
      lII11IIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = lilI1iiI + "/dingzhi/opencard/" + l1lIlili;
      lII11IIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (l1lIlili == "browseGoods") {
        lII11IIl += "&value=" + $.visitSkuValue;
      }
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = lilI1iiI + "/dingzhi/opencard/" + l1lIlili;
      let i11lli1l = "",
        I111II1 = "";
      if (l1lIlili == "viewVideo") {
        i11lli1l = 31;
        I111II1 = 31;
      } else {
        if (l1lIlili == "visitSku") {
          i11lli1l = 5;
          I111II1 = $.visitSkuValue || 5;
        } else {
          if (l1lIlili == "toShop") {
            i11lli1l = 14;
            I111II1 = $.toShopValue || 14;
          } else {
            l1lIlili == "addSku" && (i11lli1l = 2, I111II1 = $.addSkuValue || 2);
          }
        }
      }
      lII11IIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + i11lli1l + "&taskValue=" + I111II1;
      break;
    case "drawRecord":
      url = lilI1iiI + "/dingzhi/joinCommon/drawRecord";
      lII11IIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = lilI1iiI + "/dingzhi/joinCommon/shareRecord";
      lII11IIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = lilI1iiI + "/dingzhi/joinCommon/startDraw";
      lII11IIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + l1lIlili);
  }
  let II1lII1i = llil111(url, lII11IIl, IIiIIi1I);
  IIiIIi1I === "GET" && (delete requestOptions.body, delete requestOptions.headers["Content-Type"]);
  const iiI1ii = 5;
  let iiIIi1I1 = 0,
    IIIIl1lI = null,
    iliii1ll = false;
  while (iiIIi1I1 < iiI1ii) {
    iiIIi1I1 > 0 && (await $.wait(1000));
    const {
      err: IilIi1i,
      res: IiIiili1,
      data: iII1l
    } = await Il1lilIl(II1lII1i, IIiIIi1I);
    if (IilIi1i) {
      if (typeof IilIi1i === "string" && IilIi1i.includes("Timeout awaiting 'request'")) {
        IIIIl1lI = l1lIlili + " 请求超时，请检查网络重试";
      } else {
        const IIil1III = IiIiili1?.["statusCode"];
        if (IIil1III) {
          if ([403, 493].includes(IIil1III)) {
            IIIIl1lI = l1lIlili + " 请求失败，IP被限制（Response code " + IIil1III + "）";
            iliii1ll = true;
          } else {
            [400, 404].includes(IIil1III) ? IIIIl1lI = l1lIlili + " 请求配置参数错误，请联系开发者进行反馈（Response code " + IIil1III + "）" : IIIIl1lI = l1lIlili + " 请求失败（Response code " + IIil1III + "）";
          }
        } else {
          IIIIl1lI = l1lIlili + " 请求失败 => " + (IilIi1i.message || IilIi1i);
        }
      }
      iiIIi1I1++;
    } else {
      const i1Ii1II1 = i1lilIlI.getResponseCookie(IiIiili1, Ii1iiIi),
        I1l1ilIi = false;
      let I1llIlll = "";
      switch (l1lIlili) {
        case "getMyPing":
          I1llIlll = i1lilIlI.getCookieValue(i1Ii1II1, "LZ_AES_PIN");
          I1llIlll ? $.LZ_AES_PIN = I1llIlll : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(l1lIlili) && (Ii1iiIi = i1Ii1II1);
      I1llIlll = i1lilIlI.getCookieValue(Ii1iiIi, "LZ_AES_PIN");
      !I1llIlll && $.LZ_AES_PIN && (Ii1iiIi += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const i1i1lII1 = i1lilIlI.getCookieValue(Ii1iiIi, "pToken");
      !i1i1lII1 && $.pinToken && (Ii1iiIi += "pToken=" + $.pinToken + "; ");
      const Iilil1I = i1lilIlI.getCookieValue(Ii1iiIi, "AUTH_C_USER");
      if (!Iilil1I && $.secretPin) {
        Ii1iiIi += "AUTH_C_USER=" + $.secretPin + "; ";
      }
      const IlIl1lI = i1lilIlI.getCookieValue(Ii1iiIi, "te");
      !IlIl1lI && $.te && (Ii1iiIi += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(l1lIlili)) {
        if (iII1l) {
          try {
            const lli1lI1i = JSON.parse(iII1l);
            IiIlill(l1lIlili, lli1lI1i);
            break;
          } catch (l1I111lI) {
            IIIIl1lI = "❌ " + l1lIlili + " 接口响应数据解析失败: " + l1I111lI.message;
            console.log("🚫 " + l1lIlili + " => " + String(iII1l));
            I1l1ilIi && (console.log("\n---------------------------------------------------\n"), console.log(Ii1iiIi), console.log("\n---------------------------------------------------\n"));
            iiIIi1I1++;
          }
        } else {
          IIIIl1lI = "❌ " + l1lIlili + " 接口无响应数据";
          iiIIi1I1++;
        }
      } else {
        break;
      }
      iliii1ll = false;
    }
  }
  if (iiIIi1I1 >= iiI1ii) {
    console.log(IIIIl1lI);
    iliii1ll && !hotbreak && ($.outFlag = true);
  }
}
async function Il1lilIl(ii1liIil, liIiiIIl = "POST") {
  if (liIiiIIl === "POST") {
    return new Promise(async II1iiIl1 => {
      $.post(ii1liIil, (lilIllI1, IlI1lli1, lIII1lI) => {
        II1iiIl1({
          err: lilIllI1,
          res: IlI1lli1,
          data: lIII1lI
        });
      });
    });
  } else {
    if (liIiiIIl === "GET") {
      return new Promise(async liiI11I => {
        $.get(ii1liIil, (liil1ll, iIii1lI1, I1IiIIiI) => {
          liiI11I({
            err: liil1ll,
            res: iIii1lI1,
            data: I1IiIIiI
          });
        });
      });
    } else {
      const iiilli11 = "不支持的请求方法";
      return {
        err: iiilli11,
        res: null,
        data: null
      };
    }
  }
}
async function IiIlill(IIiIlIII, iiI1II) {
  try {
    switch (IIiIlIII) {
      case "getSimpleActInfoVo":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            if (typeof iiI1II.data.shopId != "undefined") {
              $.shopId = iiI1II.data.shopId;
            }
            if (typeof iiI1II.data.venderId != "undefined") {
              $.venderId = iiI1II.data.venderId;
            }
          } else {
            iiI1II.errorMessage ? console.log("" + (iiI1II.errorMessage || "")) : console.log("" + iiI1II);
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "getMyPing":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            if (iiI1II.data && typeof iiI1II.data.secretPin != "undefined") {
              $.Pin = iiI1II.data.secretPin;
            }
            if (iiI1II.data && typeof iiI1II.data.nickname != "undefined") {
              $.nickname = iiI1II.data.nickname;
            }
          } else {
            iiI1II.errorMessage ? (console.log("" + (iiI1II.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log("" + iiI1II);
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "getUserInfo":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            if (iiI1II.data && typeof iiI1II.data.yunMidImageUrl != "undefined") {
              $.attrTouXiang = iiI1II.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            }
          } else {
            iiI1II.errorMessage ? console.log("" + (iiI1II.errorMessage || "")) : console.log("" + iiI1II);
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "activityContent":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            $.endTime = iiI1II.data.endTime || iiI1II.data.activityVo && iiI1II.data.activityVo.endTime || iiI1II.data.activity.endTime || 0;
            $.hasEnd = iiI1II.data.isEnd || false;
            $.score = iiI1II.data.actorInfo.score || 0;
            $.actorUuid = iiI1II.data.actorInfo.uuid || "";
            $.assistCount = iiI1II.data.actorInfo.assistCount || 0;
          } else {
            if (iiI1II.errorMessage) {
              console.log("" + (iiI1II.errorMessage || ""));
            } else {
              console.log("" + iiI1II);
            }
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "assist":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            $.assistState = iiI1II.data.assistState || 0;
            $.allOpenCard = iiI1II.data.openCardInfo.openAll || false;
            $.openVenderId = iiI1II.data.openCardInfo.openVenderId || [];
            iiI1II?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (iiI1II?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else {
            if (iiI1II.errorMessage) {
              console.log("" + (iiI1II.errorMessage || ""));
            } else {
              console.log("" + iiI1II);
            }
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "taskRecord":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            $.followShop = iiI1II.data["20"].recordCount || 0;
            $.addCart = iiI1II.data["23"].recordCount || 0;
            $.visitSku = iiI1II.data["10"].recordCount || 0;
          } else {
            iiI1II.errorMessage ? console.log("" + (iiI1II.errorMessage || "")) : console.log("" + iiI1II);
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "checkOpenCard":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            let Ili1l1il = iiI1II.data["10"].settingInfo || [],
              lilII1l = iiI1II.data.cardList || [],
              lilii1I = iiI1II.data.openCardList || [];
            $.openList = [...lilII1l, ...Ili1l1il, ...lilii1I];
            $.openCardScore1 = iiI1II.data.score1 || 0;
            $.openCardScore2 = iiI1II.data.score2 || 0;
            $.drawScore = iiI1II.data.drawScore || 0;
            if (iiI1II.data.beans || iiI1II.data.addBeanNum) {
              console.log("开卡获得：" + (iiI1II.data.beans || iiI1II.data.addBeanNum) + "京豆 🐶");
            }
          } else {
            iiI1II.errorMessage ? console.log("" + (iiI1II.errorMessage || "")) : console.log("" + iiI1II);
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "addSku":
      case "followShop":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            console.log("完成任务,获得" + (iiI1II?.["data"]?.["beans"] || 0) + "京豆, " + (iiI1II?.["data"]?.["score"] || 0) + "金币");
          } else {
            iiI1II.errorMessage ? console.log("" + (iiI1II.errorMessage || "")) : console.log("" + iiI1II);
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "startDraw":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            if (typeof iiI1II.data == "object") {
              drawInfo = iiI1II.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = iiI1II.data.addressId;
                    prizeName = drawInfo.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) {
                      console.log("预览图片：" + drawInfo.showImage);
                    }
                    let lIii1Ill = await llI11lli("https://lzdz1-isv.isvjcloud.com", IIilIIii, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    if (lIii1Ill) {
                      $.isNode() && (await iiilliII.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId="));
                    } else {
                      if ($.isNode()) {
                        await iiilliII.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId);
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
                    $.isNode() && (await iiilliII.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                    break;
                  case 16:
                    console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                    break;
                  default:
                    drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                    break;
                }
              } else {
                console.log("💨  空气");
              }
            } else {
              console.log("" + iiI1II);
            }
          } else {
            iiI1II.errorMessage ? ($.runFalag = false, console.log("" + (iiI1II.errorMessage || ""))) : console.log("" + iiI1II);
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            if (typeof iiI1II.data == "object") {
              let il11IIlI = "",
                I1l1l1 = "抽奖";
              iiI1II.data.addBeanNum && (il11IIlI = iiI1II.data.addBeanNum + "京豆");
              iiI1II.data.addPoint && (il11IIlI += " " + iiI1II.data.addPoint + "游戏机会");
              if (IIiIlIII == "followShop") {
                I1l1l1 = "关注";
                iiI1II.data.beans != "0" && (il11IIlI += iiI1II.data.beans + "京豆 🐶");
              } else {
                if (IIiIlIII == "addSku" || IIiIlIII == "addCart") {
                  I1l1l1 = "加购";
                  if (iiI1II.data.beans != "0") {
                    il11IIlI += iiI1II.data.beans + "京豆 🐶";
                  }
                } else {
                  if (IIiIlIII == "viewVideo") {
                    I1l1l1 = "热门文章";
                  } else {
                    if (IIiIlIII == "toShop") {
                      I1l1l1 = "浏览店铺";
                    } else {
                      if (IIiIlIII == "visitSku" || IIiIlIII == "browseGoods") {
                        I1l1l1 = "浏览商品";
                      } else {
                        if (IIiIlIII == "sign") {
                          I1l1l1 = "签到";
                        } else {
                          let lllIlI1 = typeof iiI1II.data.drawOk === "object" && iiI1II.data.drawOk || iiI1II.data;
                          il11IIlI = lllIlI1.drawOk == true && lllIlI1.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !il11IIlI && (il11IIlI = "空气 💨");
              console.log(I1l1l1 + "获得：" + (il11IIlI || data));
            } else {
              console.log("" + data);
            }
          } else {
            if (iiI1II.errorMessage) {
              $.runFalag = false;
              console.log("" + (iiI1II.errorMessage || ""));
            } else {
              console.log("" + iiI1II);
            }
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "drawRecord":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true) {
            let lliII1lI = 0;
            for (let IIiliil1 of iiI1II.data) {
              infoType = IIiliil1.infoType;
              infoName = IIiliil1.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  lliII1lI += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await iiilliII.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await iiilliII.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            lliII1lI > 0 && console.log("当前累计获得 " + lliII1lI + " 京豆 🐶");
          } else {
            if (iiI1II.errorMessage) {
              console.log("" + (iiI1II.errorMessage || ""));
            } else {
              console.log("" + iiI1II);
            }
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "getShareRecord":
        if (typeof iiI1II == "object") {
          if (iiI1II.result && iiI1II.result === true && iiI1II.data) {
            $.ShareCount = iiI1II.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else {
            iiI1II.errorMessage ? console.log("" + (iiI1II.errorMessage || "")) : console.log("" + iiI1II);
          }
        } else {
          console.log("" + iiI1II);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IIiIlIII + "-> " + iiI1II);
    }
    typeof iiI1II == "object" && iiI1II.errorMessage && iiI1II.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (l1ii11lI) {
    console.log(l1ii11lI);
  }
}
function llil111(liiilIIl, l1Il1IlI, ilIIIII1 = "POST") {
  let l1i1I1I = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: IIilIIii,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  liiilIIl.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (l1i1I1I.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, l1i1I1I.Cookie = "" + (IiI11lIi && IiI11lIi || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + Ii1iiIi);
  return {
    url: liiilIIl,
    method: ilIIIII1,
    headers: l1i1I1I,
    body: l1Il1IlI,
    timeout: 30000
  };
}
function IliliiI() {
  return new Promise(Iiii1l11 => {
    let i1iIII1l = {
      url: "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      followRedirect: false,
      headers: {
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(i1iIII1l, async (llI11IIi, iil1iilI, IilIil11) => {
      try {
        if (llI11IIi) {
          iil1iilI && typeof iil1iilI.statusCode != "undefined";
          console.log("" + $.toStr(llI11IIi));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let lliI11Ii = IilIil11.match(/(活动已经结束)/) && IilIil11.match(/(活动已经结束)/)[1] || "";
          lliI11Ii && ($.activityEnd = true, console.log("活动已结束"));
          iilillli(iil1iilI);
        }
      } catch (IiliIii) {
        $.logErr(IiliIii, iil1iilI);
      } finally {
        Iiii1l11();
      }
    });
  });
}
function iilillli(IilillI) {
  if (IilillI) {
    if (IilillI.headers["set-cookie"]) {
      IIilIIii = originCookie + ";";
      for (let Ii1IlIlI of IilillI.headers["set-cookie"]) {
        IIl1lI1l[Ii1IlIlI.split(";")[0].substr(0, Ii1IlIlI.split(";")[0].indexOf("="))] = Ii1IlIlI.split(";")[0].substr(Ii1IlIlI.split(";")[0].indexOf("=") + 1);
      }
      for (const llIiIil1 of Object.keys(IIl1lI1l)) {
        IIilIIii += llIiIil1 + "=" + IIl1lI1l[llIiIil1] + ";";
      }
      Ii1iiIi = IIilIIii;
    }
  }
}
function ll1lIIlI(I1IIIiII) {
  I1IIIiII = I1IIIiII || 32;
  let I1iI1iI = "abcdef0123456789",
    IiiIilii = I1iI1iI.length,
    lIii11l1 = "";
  for (i = 0; i < I1IIIiII; i++) {
    lIii11l1 += I1iI1iI.charAt(Math.floor(Math.random() * IiiIilii));
  }
  return lIii11l1;
}
function lIII1II(I1lI1iiI) {
  if (typeof I1lI1iiI == "string") {
    try {
      return JSON.parse(I1lI1iiI);
    } catch (llllI1lI) {
      console.log(llllI1lI);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function lllllII() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async IiIlIIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iliillI1 = "";
    if ($.shopactivityId) {
      iliillI1 = ",\"activityId\":" + $.shopactivityId;
    }
    const Ii11llii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iliillI1 + ",\"channel\":406}",
      I11iiilI = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(Ii11llii)
      },
      lilII1ii = await IiilIll("27004", I11iiilI),
      Ii1i11il = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + Ii11llii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lilII1ii),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: IIilIIii
        }
      };
    $.get(Ii1i11il, async (IIi1IIlI, II1lliI1, I1I1lIIi) => {
      try {
        if (IIi1IIlI) {
          console.log(IIi1IIlI);
        } else {
          const IlIli1i1 = JSON.parse(I1I1lIIi);
          if (typeof IlIli1i1 === "object") {
            if (IlIli1i1.success === true) {
              console.log(IlIli1i1.message);
              $.errorJoinShop = IlIli1i1.message;
              if (IlIli1i1.result && IlIli1i1.result.giftInfo) {
                for (let llli1ll of IlIli1i1.result.giftInfo.giftList) {
                  console.log("入会获得：" + llli1ll.discountString + llli1ll.prizeName + llli1ll.secondLineDesc);
                }
              }
            } else {
              typeof IlIli1i1 == "object" && IlIli1i1.message ? ($.errorJoinShop = IlIli1i1.message, console.log("" + (IlIli1i1.message || ""))) : console.log(I1I1lIIi);
            }
          } else {
            console.log(I1I1lIIi);
          }
        }
      } catch (iIlIii1l) {
        $.logErr(iIlIii1l, II1lliI1);
      } finally {
        IiIlIIl();
      }
    });
  });
}
async function IlillIII() {
  return new Promise(async lI11I => {
    let I11Ili1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const l1IllIli = {
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(I11Ili1i)
      },
      iliI1liI = await IiilIll("27004", l1IllIli),
      IIll111 = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + I11Ili1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iliI1liI),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: IIilIIii
        }
      };
    $.get(IIll111, async (lli1I1il, i1I1i1i1, i1lllII) => {
      try {
        if (lli1I1il) {
          console.log(lli1I1il);
        } else {
          const Ill1ii1l = JSON.parse(i1lllII);
          typeof Ill1ii1l === "object" ? Ill1ii1l.success === true && (console.log("去加入：" + (Ill1ii1l.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = Ill1ii1l.result.interestsRuleList && Ill1ii1l.result.interestsRuleList[0] && Ill1ii1l.result.interestsRuleList[0].interestsInfo && Ill1ii1l.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = Ill1ii1l.result.userInfo.openCardStatus) : console.log(i1lllII);
        }
      } catch (iIl11iII) {
        $.logErr(iIl11iII, i1I1i1i1);
      } finally {
        lI11I();
      }
    });
  });
}
function I1lIiliI(iii1lili) {
  return new Promise(i1iIIi1I => {
    const ll1ilIi = {
      url: "" + iii1lili,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ll1ilIi, async (l1iIliiI, ll1II1ll, Ii11I1I1) => {
      try {
        if (!l1iIliiI) {
          Ii11I1I1 ? Ii11I1I1 = JSON.parse(Ii11I1I1) : console.log("未获取到数据,请重新运行");
        }
      } catch (liii1Il) {
        $.logErr(liii1Il, ll1II1ll);
        Ii11I1I1 = null;
      } finally {
        i1iIIi1I(Ii11I1I1);
      }
    });
  });
}
function liI1l1II(ll1iii11, IIlli1I1) {
  return Math.floor(Math.random() * (IIlli1I1 - ll1iii11)) + ll1iii11;
}
function i11lIII1() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const i11li111 = Array.from(new Set($.blacklist.split("&")));
  console.log(i11li111.join("&") + "\n");
  let IIIliIiI = i11li111,
    li111ilI = [],
    iilI1i1 = false;
  for (let ii1l1iil = 0; ii1l1iil < iiIliiI.length; ii1l1iil++) {
    let l1Ii1iII = decodeURIComponent(iiIliiI[ii1l1iil].match(/pt_pin=([^; ]+)(?=;?)/) && iiIliiI[ii1l1iil].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!l1Ii1iII) {
      break;
    }
    let li1liIll = false;
    for (let lIilIl11 of IIIliIiI) {
      if (lIilIl11 && lIilIl11 == l1Ii1iII) {
        li1liIll = true;
        break;
      }
    }
    if (!li1liIll) {
      iilI1i1 = true;
      li111ilI.splice(ii1l1iil, -1, iiIliiI[ii1l1iil]);
    }
  }
  if (iilI1i1) {
    iiIliiI = li111ilI;
  }
}
function liii1l11(Iii11IIi, lIIillii) {
  lIIillii != 0 && Iii11IIi.unshift(Iii11IIi.splice(lIIillii, 1)[0]);
}
function iI1I1Il() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(iiIliiI, iiIliiI));
    return;
  }
  console.log("当前已设置白名单：");
  const llIllii = Array.from(new Set($.whitelist.split("&")));
  console.log(llIllii.join("&") + "\n");
  let lIiliIl1 = [],
    l1ill1I1 = llIllii;
  for (let IIl1iIiI in iiIliiI) {
    let i1II111I = decodeURIComponent(iiIliiI[IIl1iIiI].match(/pt_pin=([^; ]+)(?=;?)/) && iiIliiI[IIl1iIiI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    l1ill1I1.includes(i1II111I) && lIiliIl1.push(iiIliiI[IIl1iIiI]);
  }
  helpCookiesArr = lIiliIl1;
  if (l1ill1I1.length > 1) {
    for (let iliillll in l1ill1I1) {
      let ll1lI1ii = l1ill1I1[l1ill1I1.length - 1 - iliillll];
      if (!ll1lI1ii) {
        continue;
      }
      for (let iIliI1I in helpCookiesArr) {
        let Il1II11l = decodeURIComponent(helpCookiesArr[iIliI1I].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iIliI1I].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        ll1lI1ii == Il1II11l && liii1l11(helpCookiesArr, iIliI1I);
      }
    }
  }
}
