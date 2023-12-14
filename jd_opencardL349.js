/*
12.7-12.13 冬日焕新 暖心加倍
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 12.7-12.13 冬日焕新 暖心加倍 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#12.7-12.13 冬日焕新 暖心加倍
1 1 1 1 * jd_opencardL349.js, tag=12.7-12.13 冬日焕新 暖心加倍, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('12.7-12.13 冬日焕新 暖心加倍')
const i1liI1 = $.isNode() ? require("./jdCookie.js") : "",
  l1IilI = $.isNode() ? require("./sendNotify") : "";
let ll1I1i = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  iiiiII = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const ll1I1l = process.env.jd_opencard_break === "true",
  iilI = require("./function/krgetToken"),
  IIilI1 = require("./function/krh5st"),
  li1Il1 = require("./function/jdCommon"),
  i1ii1I = require("./function/krwxSavePrize");
let iil1 = "https://lzdz1-isv.isvjcloud.com",
  iiIIiI = [],
  i1liII = "",
  ilII1i = {};
if ($.isNode()) {
  Object.keys(i1liI1).forEach(IIi11I => {
    iiIIiI.push(i1liI1[IIi11I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  iiIIiI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iiIIil($.getdata("CookiesJD") || "[]").map(iiIIlI => iiIIlI.cookie)].filter(IIl1II => !!IIl1II);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let ill1I = "",
  ilII1l = "",
  IIilII = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  l1Iil1 = "",
  IIiIl = "";
$.whitelist = process.env.jd_opencard_whitelist || l1Iil1;
$.blacklist = process.env.jd_opencard_blacklist || IIiIl;
llIi11();
li1Iii();
$.errMsgPin = [];
!(async () => {
  if (IIilII === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!iiIIiI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await i1liIl("http://code.kingran.cf/349.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[IiIill(0, authorCodeList.length)];
  } else {
    let iiIIli = ["3d9a834af2214f06ae0cf06a9039548a", "3ff72a9076874d8cbc41d2e67cd2a647"];
    $.authorCode = iiIIli[IiIill(0, iiIIli.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "3667ea16b4b8479bbc56912716431804";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let IIl1Ii = 0; IIl1Ii < iiIIiI.length; IIl1Ii++) {
    i1liII = iiIIiI[IIl1Ii];
    originCookie = iiIIiI[IIl1Ii];
    if (i1liII) {
      $.UserName = decodeURIComponent(i1liII.match(/pt_pin=([^; ]+)(?=;?)/) && i1liII.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIl1Ii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = li1Il1.genUA($.UserName);
      await iiiiI1();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  if ($.errMsgPin.length > 0) {
    let ilIIl = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + ilIIl;
  }
  if ($.outFlag) {
    let I11ll1 = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + I11ll1);
    if ($.isNode()) {
      await l1IilI.sendNotify("" + $.name, "" + I11ll1);
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(li1IlI => $.logErr(li1IlI)).finally(() => $.done());
async function iiiiI1() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    ill1I = "";
    $.Token = "";
    $.Pin = "";
    let lIl1i = false;
    $.Token = await iilI(i1liII, iil1);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await li1Iil();
    if (ilII1l == "") {
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
    await IIiIi("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await IIiIi("accessLogWithAD");
    await IIiIi("activityContent");
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
    await IIiIi("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await IIiIi("checkOpenCard");
    await IIiIi("taskRecord");
    await $.wait(1000);
    await IIiIi("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          lIl1i = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await i1liIi();
          for (let liIiil = 0; liIiil < Array(2).length; liIiil++) {
            if (liIiil > 0) {
              console.log("第" + liIiil + "次 重新开卡");
            }
            await iiIIii();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await IIiIi("activityContent");
          await IIiIi("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else {
      console.log("已全部开卡");
    }
    !$.followShop && !$.outFlag && (console.log(""), await IIiIi("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    if (iiiiII) {
      if (!$.addCart && !$.outFlag) {
        await IIiIi("addCart");
        await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
      }
    }
    console.log("去助力 -> " + $.shareUuid);
    await IIiIi("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await IIiIi("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    lIl1i && (await IIiIi("activityContent"));
    if (ll1I1i + "" !== "0") {
      $.runFalag = true;
      let IIiIll = parseInt($.score / 100);
      ll1I1i = parseInt(ll1I1i, 10);
      if (IIiIll > ll1I1i) {
        IIiIll = ll1I1i;
      }
      console.log("已设置抽奖次数为" + IIiIll + "次，当前有" + $.score + "金币");
      for (m = 1; IIiIll--; m++) {
        console.log("进行第" + m + "次抽奖");
        await IIiIi("startDraw");
        if ($.runFalag == false) {
          break;
        }
        if (Number(IIiIll) <= 0) {
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
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) {
      await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
    }
  } catch (ilIil1) {
    console.log(ilIil1);
  }
}
async function IIiIi(iI1l) {
  if ($.outFlag) {
    return;
  }
  let I111I1 = "https://lzdz1-isv.isvjcloud.com",
    iIl = "",
    lIIi = "POST";
  switch (iI1l) {
    case "getSimpleActInfoVo":
      url = I111I1 + "/dz/common/getSimpleActInfoVo";
      iIl = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = I111I1 + "/customer/getMyPing";
      iIl = "userId=1000002591&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = I111I1 + "/common/accessLogWithAD";
      let l11lI = I111I1 + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      iIl = "venderId=1000002591&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l11lI) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = I111I1 + "/wxActionCommon/getUserInfo";
      iIl = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = I111I1 + "/dingzhi/joinCommon/activityContent";
      iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = I111I1 + "/dingzhi/joinCommon/drawContent";
      iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = I111I1 + "/dingzhi/joinCommon/taskInfo";
      iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = I111I1 + "/dingzhi/joinCommon/assist";
      iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = I111I1 + "/dingzhi/joinCommon/taskRecord";
      iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = I111I1 + "/dingzhi/joinCommon/doTask";
      iIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = I111I1 + "/dingzhi/joinCommon/doTask";
      iIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = I111I1 + "/dingzhi/joinCommon/doTask";
      iIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = I111I1 + "/dingzhi/opencard/" + iI1l;
      iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (iI1l == "browseGoods") {
        iIl += "&value=" + $.visitSkuValue;
      }
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = I111I1 + "/dingzhi/opencard/" + iI1l;
      let Il1l11 = "",
        I1II1l = "";
      if (iI1l == "viewVideo") {
        Il1l11 = 31;
        I1II1l = 31;
      } else {
        if (iI1l == "visitSku") {
          Il1l11 = 5;
          I1II1l = $.visitSkuValue || 5;
        } else {
          if (iI1l == "toShop") {
            Il1l11 = 14;
            I1II1l = $.toShopValue || 14;
          } else {
            iI1l == "addSku" && (Il1l11 = 2, I1II1l = $.addSkuValue || 2);
          }
        }
      }
      iIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + Il1l11 + "&taskValue=" + I1II1l;
      break;
    case "drawRecord":
      url = I111I1 + "/dingzhi/joinCommon/drawRecord";
      iIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = I111I1 + "/dingzhi/joinCommon/shareRecord";
      iIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = I111I1 + "/dingzhi/joinCommon/startDraw";
      iIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + iI1l);
  }
  let iiill = iiil(url, iIl, lIIi);
  lIIi === "GET" && (delete requestOptions.body, delete requestOptions.headers["Content-Type"]);
  const iiI11I = 5;
  let llIi1i = 0,
    llIi1l = null,
    l11i1 = false;
  while (llIi1i < iiI11I) {
    llIi1i > 0 && (await $.wait(1000));
    const {
      err: lli1il,
      res: lii1I,
      data: IIiIiI
    } = await i1ii1i(iiill, lIIi);
    if (lli1il) {
      if (typeof lli1il === "string" && lli1il.includes("Timeout awaiting 'request'")) {
        llIi1l = iI1l + " 请求超时，请检查网络重试";
      } else {
        const ll1l = lii1I?.["statusCode"];
        if (ll1l) {
          if ([403, 493].includes(ll1l)) {
            llIi1l = iI1l + " 请求失败，IP被限制（Response code " + ll1l + "）";
            l11i1 = true;
          } else {
            [400, 404].includes(ll1l) ? llIi1l = iI1l + " 请求配置参数错误，请联系开发者进行反馈（Response code " + ll1l + "）" : llIi1l = iI1l + " 请求失败（Response code " + ll1l + "）";
          }
        } else {
          llIi1l = iI1l + " 请求失败 => " + (lli1il.message || lli1il);
        }
      }
      llIi1i++;
    } else {
      const iiIlIi = li1Il1.getResponseCookie(lii1I, ilII1l),
        iIlIli = false;
      iIlIli && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + iI1l + " 响应Body => " + (IIiIiI || "无") + "\n"), console.log("🔧 " + iI1l + " 响应Cookie => " + (iiIlIi || "无") + "\n"), console.log("🔧 " + iI1l + " 请求参数"), console.log(requestOptions), console.log("\n---------------------------------------------------\n"));
      let iIlIll = "";
      switch (iI1l) {
        case "getMyPing":
          iIlIll = li1Il1.getCookieValue(iiIlIi, "LZ_AES_PIN");
          iIlIll ? $.LZ_AES_PIN = iIlIll : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(iI1l) && (ilII1l = iiIlIi);
      iIlIll = li1Il1.getCookieValue(ilII1l, "LZ_AES_PIN");
      !iIlIll && $.LZ_AES_PIN && (ilII1l += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const il11I1 = li1Il1.getCookieValue(ilII1l, "pToken");
      !il11I1 && $.pinToken && (ilII1l += "pToken=" + $.pinToken + "; ");
      const lll1i1 = li1Il1.getCookieValue(ilII1l, "AUTH_C_USER");
      !lll1i1 && $.secretPin && (ilII1l += "AUTH_C_USER=" + $.secretPin + "; ");
      const iIl11l = li1Il1.getCookieValue(ilII1l, "te");
      if (!iIl11l && $.te) {
        ilII1l += "te=" + $.te + "; ";
      }
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(iI1l)) {
        if (IIiIiI) {
          try {
            const iiI1I1 = JSON.parse(IIiIiI);
            iiii(iI1l, iiI1I1);
            break;
          } catch (IlIili) {
            llIi1l = "❌ " + iI1l + " 接口响应数据解析失败: " + IlIili.message;
            console.log("🚫 " + iI1l + " => " + String(IIiIiI));
            iIlIli && (console.log("\n---------------------------------------------------\n"), console.log(ilII1l), console.log("\n---------------------------------------------------\n"));
            llIi1i++;
          }
        } else {
          llIi1l = "❌ " + iI1l + " 接口无响应数据";
          llIi1i++;
        }
      } else {
        break;
      }
      l11i1 = false;
    }
  }
  llIi1i >= iiI11I && (console.log(llIi1l), l11i1 && !ll1I1l && ($.outFlag = true));
}
async function i1ii1i(iIl11i, i11ll1 = "POST") {
  if (i11ll1 === "POST") {
    return new Promise(async i11lii => {
      $.post(iIl11i, (iiI1II, iIl11I, lIiii1) => {
        i11lii({
          err: iiI1II,
          res: iIl11I,
          data: lIiii1
        });
      });
    });
  } else {
    if (i11ll1 === "GET") {
      return new Promise(async iIiII1 => {
        $.get(iIl11i, (I1l1, Il11I1, i11liI) => {
          iIiII1({
            err: I1l1,
            res: Il11I1,
            data: i11liI
          });
        });
      });
    } else {
      const iiI1Il = "不支持的请求方法";
      return {
        err: iiI1Il,
        res: null,
        data: null
      };
    }
  }
}
async function iiii(iiI1Ii, Il1i1) {
  try {
    switch (iiI1Ii) {
      case "getSimpleActInfoVo":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            if (typeof Il1i1.data.shopId != "undefined") {
              $.shopId = Il1i1.data.shopId;
            }
            if (typeof Il1i1.data.venderId != "undefined") {
              $.venderId = Il1i1.data.venderId;
            }
          } else {
            Il1i1.errorMessage ? console.log("" + (Il1i1.errorMessage || "")) : console.log("" + Il1i1);
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "getMyPing":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            if (Il1i1.data && typeof Il1i1.data.secretPin != "undefined") {
              $.Pin = Il1i1.data.secretPin;
            }
            if (Il1i1.data && typeof Il1i1.data.nickname != "undefined") {
              $.nickname = Il1i1.data.nickname;
            }
          } else {
            if (Il1i1.errorMessage) {
              console.log("" + (Il1i1.errorMessage || ""));
              $.errMsgPin.push($.UserName);
            } else {
              console.log("" + Il1i1);
            }
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "getUserInfo":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            if (Il1i1.data && typeof Il1i1.data.yunMidImageUrl != "undefined") {
              $.attrTouXiang = Il1i1.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            }
          } else {
            Il1i1.errorMessage ? console.log("" + (Il1i1.errorMessage || "")) : console.log("" + Il1i1);
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "activityContent":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            $.endTime = Il1i1.data.endTime || Il1i1.data.activityVo && Il1i1.data.activityVo.endTime || Il1i1.data.activity.endTime || 0;
            $.hasEnd = Il1i1.data.isEnd || false;
            $.score = Il1i1.data.actorInfo.score || 0;
            $.actorUuid = Il1i1.data.actorInfo.uuid || "";
            $.assistCount = Il1i1.data.actorInfo.assistCount || 0;
          } else {
            Il1i1.errorMessage ? console.log("" + (Il1i1.errorMessage || "")) : console.log("" + Il1i1);
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "assist":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            $.assistState = Il1i1.data.assistState || 0;
            $.allOpenCard = Il1i1.data.openCardInfo.openAll || false;
            $.openVenderId = Il1i1.data.openCardInfo.openVenderId || [];
            Il1i1?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (Il1i1?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else {
            Il1i1.errorMessage ? console.log("" + (Il1i1.errorMessage || "")) : console.log("" + Il1i1);
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "taskRecord":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            $.followShop = Il1i1.data["20"].recordCount || 0;
            $.addCart = Il1i1.data["23"].recordCount || 0;
            $.visitSku = Il1i1.data["10"].recordCount || 0;
          } else {
            if (Il1i1.errorMessage) {
              console.log("" + (Il1i1.errorMessage || ""));
            } else {
              console.log("" + Il1i1);
            }
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "checkOpenCard":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            let Iilil = Il1i1.data["10"].settingInfo || [],
              Iilii = Il1i1.data.cardList || [],
              I1il1 = Il1i1.data.openCardList || [];
            $.openList = [...Iilii, ...Iilil, ...I1il1];
            $.openCardScore1 = Il1i1.data.score1 || 0;
            $.openCardScore2 = Il1i1.data.score2 || 0;
            $.drawScore = Il1i1.data.drawScore || 0;
            if (Il1i1.data.beans || Il1i1.data.addBeanNum) {
              console.log("开卡获得：" + (Il1i1.data.beans || Il1i1.data.addBeanNum) + "京豆 🐶");
            }
          } else {
            Il1i1.errorMessage ? console.log("" + (Il1i1.errorMessage || "")) : console.log("" + Il1i1);
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "addSku":
      case "followShop":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            console.log("完成任务,获得" + (Il1i1?.["data"]?.["beans"] || 0) + "京豆, " + (Il1i1?.["data"]?.["score"] || 0) + "金币");
          } else {
            Il1i1.errorMessage ? console.log("" + (Il1i1.errorMessage || "")) : console.log("" + Il1i1);
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "startDraw":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            if (typeof Il1i1.data == "object") {
              drawInfo = Il1i1.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = Il1i1.data.addressId;
                    prizeName = drawInfo.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) {
                      console.log("预览图片：" + drawInfo.showImage);
                    }
                    let i1Il11 = await i1ii1I("https://lzdz1-isv.isvjcloud.com", i1liII, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    if (i1Il11) {
                      $.isNode() && (await l1IilI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId="));
                    } else {
                      $.isNode() && (await l1IilI.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
                    $.isNode() && (await l1IilI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
              console.log("" + Il1i1);
            }
          } else {
            if (Il1i1.errorMessage) {
              $.runFalag = false;
              console.log("" + (Il1i1.errorMessage || ""));
            } else {
              console.log("" + Il1i1);
            }
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            if (typeof Il1i1.data == "object") {
              let IiIIll = "",
                lIiiii = "抽奖";
              Il1i1.data.addBeanNum && (IiIIll = Il1i1.data.addBeanNum + "京豆");
              Il1i1.data.addPoint && (IiIIll += " " + Il1i1.data.addPoint + "游戏机会");
              if (iiI1Ii == "followShop") {
                lIiiii = "关注";
                Il1i1.data.beans != "0" && (IiIIll += Il1i1.data.beans + "京豆 🐶");
              } else {
                if (iiI1Ii == "addSku" || iiI1Ii == "addCart") {
                  lIiiii = "加购";
                  Il1i1.data.beans != "0" && (IiIIll += Il1i1.data.beans + "京豆 🐶");
                } else {
                  if (iiI1Ii == "viewVideo") {
                    lIiiii = "热门文章";
                  } else {
                    if (iiI1Ii == "toShop") {
                      lIiiii = "浏览店铺";
                    } else {
                      if (iiI1Ii == "visitSku" || iiI1Ii == "browseGoods") {
                        lIiiii = "浏览商品";
                      } else {
                        if (iiI1Ii == "sign") {
                          lIiiii = "签到";
                        } else {
                          let IiIIli = typeof Il1i1.data.drawOk === "object" && Il1i1.data.drawOk || Il1i1.data;
                          IiIIll = IiIIli.drawOk == true && IiIIli.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !IiIIll && (IiIIll = "空气 💨");
              console.log(lIiiii + "获得：" + (IiIIll || Il1i1));
            } else {
              console.log("" + Il1i1);
            }
          } else {
            Il1i1.errorMessage ? ($.runFalag = false, console.log("" + (Il1i1.errorMessage || ""))) : console.log("" + Il1i1);
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "drawRecord":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true) {
            let Il11Ii = 0;
            for (let Il11Il of Il1i1.data) {
              infoType = Il11Il.infoType;
              infoName = Il11Il.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  Il11Ii += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await l1IilI.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await l1IilI.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            if (Il11Ii > 0) {
              console.log("当前累计获得 " + Il11Ii + " 京豆 🐶");
            }
          } else {
            Il1i1.errorMessage ? console.log("" + (Il1i1.errorMessage || "")) : console.log("" + Il1i1);
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "getShareRecord":
        if (typeof Il1i1 == "object") {
          if (Il1i1.result && Il1i1.result === true && Il1i1.data) {
            $.ShareCount = Il1i1.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else {
            Il1i1.errorMessage ? console.log("" + (Il1i1.errorMessage || "")) : console.log("" + Il1i1);
          }
        } else {
          console.log("" + Il1i1);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(iiI1Ii + "-> " + Il1i1);
    }
    typeof Il1i1 == "object" && Il1i1.errorMessage && Il1i1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (i111II) {
    console.log(i111II);
  }
}
function iiil(I11Il1, IiIIl1, IiiiI1 = "POST") {
  let I11Ili = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: i1liII,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  I11Il1.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (I11Ili.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, I11Ili.Cookie = "" + (ill1I && ill1I || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + ilII1l);
  return {
    url: I11Il1,
    method: IiiiI1,
    headers: I11Ili,
    body: IiIIl1,
    timeout: 30000
  };
}
function li1Iil() {
  return new Promise(IiliI1 => {
    let Iiii11 = {
      url: "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      followRedirect: false,
      headers: {
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(Iiii11, async (l11I, llllli, iiiii1) => {
      try {
        if (l11I) {
          llllli && typeof llllli.statusCode != "undefined";
          console.log("" + $.toStr(l11I));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iI1I1 = iiiii1.match(/(活动已经结束)/) && iiiii1.match(/(活动已经结束)/)[1] || "";
          iI1I1 && ($.activityEnd = true, console.log("活动已结束"));
          ill11(llllli);
        }
      } catch (Ii11iI) {
        $.logErr(Ii11iI, llllli);
      } finally {
        IiliI1();
      }
    });
  });
}
function ill11(IiliII) {
  if (IiliII) {
    if (IiliII.headers["set-cookie"]) {
      i1liII = originCookie + ";";
      for (let IIillI of IiliII.headers["set-cookie"]) {
        ilII1i[IIillI.split(";")[0].substr(0, IIillI.split(";")[0].indexOf("="))] = IIillI.split(";")[0].substr(IIillI.split(";")[0].indexOf("=") + 1);
      }
      for (const i1II11 of Object.keys(ilII1i)) {
        i1liII += i1II11 + "=" + ilII1i[i1II11] + ";";
      }
      ilII1l = i1liII;
    }
  }
}
function i1ii1l(Iiii1l) {
  Iiii1l = Iiii1l || 32;
  let Iiii1i = "abcdef0123456789",
    iiIlll = Iiii1i.length,
    II1iil = "";
  for (i = 0; i < Iiii1l; i++) {
    II1iil += Iiii1i.charAt(Math.floor(Math.random() * iiIlll));
  }
  return II1iil;
}
function iiIIil(iiIlli) {
  if (typeof iiIlli == "string") {
    try {
      return JSON.parse(iiIlli);
    } catch (I1111I) {
      console.log(I1111I);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function iiIIii() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async li1IIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let II1ill = "";
    if ($.shopactivityId) {
      II1ill = ",\"activityId\":" + $.shopactivityId;
    }
    const ilili = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + II1ill + ",\"channel\":406}",
      iII1iI = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(ilili)
      },
      II1ili = await IIilI1("27004", iII1iI),
      ilill = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + ilili + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(II1ili),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: i1liII
        }
      };
    $.get(ilill, async (IIl1ll, lliIll, iIIi) => {
      try {
        if (IIl1ll) {
          console.log(IIl1ll);
        } else {
          const il11li = JSON.parse(iIIi);
          if (typeof il11li === "object") {
            if (il11li.success === true) {
              console.log(il11li.message);
              $.errorJoinShop = il11li.message;
              if (il11li.result && il11li.result.giftInfo) {
                for (let iII1il of il11li.result.giftInfo.giftList) {
                  console.log("入会获得：" + iII1il.discountString + iII1il.prizeName + iII1il.secondLineDesc);
                }
              }
            } else {
              typeof il11li == "object" && il11li.message ? ($.errorJoinShop = il11li.message, console.log("" + (il11li.message || ""))) : console.log(iIIi);
            }
          } else {
            console.log(iIIi);
          }
        }
      } catch (iII1ii) {
        $.logErr(iII1ii, lliIll);
      } finally {
        li1IIl();
      }
    });
  });
}
async function i1liIi() {
  return new Promise(async Il1111 => {
    let I11lII = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const l1Il1I = {
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(I11lII)
      },
      iiiil1 = await IIilI1("27004", l1Il1I),
      Il111i = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + I11lII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiiil1),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: i1liII
        }
      };
    $.get(Il111i, async (IIl1l1, Il111l, il1I) => {
      try {
        if (IIl1l1) {
          console.log(IIl1l1);
        } else {
          const lIlIIi = JSON.parse(il1I);
          typeof lIlIIi === "object" ? lIlIIi.success === true && (console.log("去加入：" + (lIlIIi.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = lIlIIi.result.interestsRuleList && lIlIIi.result.interestsRuleList[0] && lIlIIi.result.interestsRuleList[0].interestsInfo && lIlIIi.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = lIlIIi.result.userInfo.openCardStatus) : console.log(il1I);
        }
      } catch (lIlIIl) {
        $.logErr(lIlIIl, Il111l);
      } finally {
        Il1111();
      }
    });
  });
}
function i1liIl(lII1i1) {
  return new Promise(iII1li => {
    const I1111i = {
      url: "" + lII1i1,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1111i, async (iliiI, lIil1, Il1lII) => {
      try {
        if (!iliiI) {
          if (Il1lII) {
            Il1lII = JSON.parse(Il1lII);
          } else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (l111iI) {
        $.logErr(l111iI, lIil1);
        Il1lII = null;
      } finally {
        iII1li(Il1lII);
      }
    });
  });
}
function IiIill(I11lI1, li1l1I) {
  return Math.floor(Math.random() * (li1l1I - I11lI1)) + I11lI1;
}
function li1Iii() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const ii1 = Array.from(new Set($.blacklist.split("&")));
  console.log(ii1.join("&") + "\n");
  let lII1li = ii1,
    lII1ll = [],
    lIilI = false;
  for (let II1I1I = 0; II1I1I < iiIIiI.length; II1I1I++) {
    let ilIl1i = decodeURIComponent(iiIIiI[II1I1I].match(/pt_pin=([^; ]+)(?=;?)/) && iiIIiI[II1I1I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ilIl1i) {
      break;
    }
    let ilIIIi = false;
    for (let iIiI11 of lII1li) {
      if (iIiI11 && iIiI11 == ilIl1i) {
        ilIIIi = true;
        break;
      }
    }
    !ilIIIi && (lIilI = true, lII1ll.splice(II1I1I, -1, iiIIiI[II1I1I]));
  }
  if (lIilI) {
    iiIIiI = lII1ll;
  }
}
function lIII1(IIi1i, iIlII1) {
  iIlII1 != 0 && IIi1i.unshift(IIi1i.splice(iIlII1, 1)[0]);
}
function llIi11() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(iiIIiI, iiIIiI));
    return;
  }
  console.log("当前已设置白名单：");
  const iil = Array.from(new Set($.whitelist.split("&")));
  console.log(iil.join("&") + "\n");
  let IlIii1 = [],
    i1li1I = iil;
  for (let lII1il in iiIIiI) {
    let Il1Iii = decodeURIComponent(iiIIiI[lII1il].match(/pt_pin=([^; ]+)(?=;?)/) && iiIIiI[lII1il].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    i1li1I.includes(Il1Iii) && IlIii1.push(iiIIiI[lII1il]);
  }
  helpCookiesArr = IlIii1;
  if (i1li1I.length > 1) {
    for (let Il1Iil in i1li1I) {
      let ilI = i1li1I[i1li1I.length - 1 - Il1Iil];
      if (!ilI) {
        continue;
      }
      for (let iIIlI in helpCookiesArr) {
        let l11I1 = decodeURIComponent(helpCookiesArr[iIIlI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iIIlI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        ilI == l11I1 && lIII1(helpCookiesArr, iIIlI);
      }
    }
  }
}