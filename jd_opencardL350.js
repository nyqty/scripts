/*
12.8-12.14 好物惠购 福利精选
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 12.8-12.14 好物惠购 福利精选 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#12.8-12.14 好物惠购 福利精选
1 1 1 1 * jd_opencardL350.js, tag=12.8-12.14 好物惠购 福利精选, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('12.8-12.14 好物惠购 福利精选')
const IIiI1 = $.isNode() ? require("./jdCookie.js") : "",
  II1iII = $.isNode() ? require("./sendNotify") : "";
let il11Ii = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  li1Ii1 = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const i1ii11 = process.env.jd_opencard_break === "true",
  iii1 = require("./function/krgetToken"),
  ill1i = require("./function/krh5st"),
  ill1l = require("./function/jdCommon"),
  iiIIi1 = require("./function/krwxSavePrize");
let i1liI1 = "https://lzdz1-isv.isvjcloud.com",
  l1IilI = [],
  ll1I1i = "",
  iiiiII = {};
if ($.isNode()) {
  Object.keys(IIiI1).forEach(i1ii1l => {
    l1IilI.push(IIiI1[i1ii1l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  l1IilI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIiIl($.getdata("CookiesJD") || "[]").map(iiIIil => iiIIil.cookie)].filter(iiIIii => !!iiIIii);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let ll1I1l = "",
  iilI = "",
  IIilI1 = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  li1Il1 = "",
  i1ii1I = "";
$.whitelist = process.env.jd_opencard_whitelist || li1Il1;
$.blacklist = process.env.jd_opencard_blacklist || i1ii1I;
ill11();
iiil();
$.errMsgPin = [];
!(async () => {
  if (IIilI1 === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!l1IilI[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await i1ii1i("http://code.kingran.cf/350.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[iiii(0, authorCodeList.length)];
  } else {
    let IIl1Il = ["d927042f8f07449289dd80cf100906fe"];
    $.authorCode = IIl1Il[iiii(0, IIl1Il.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "5755a7d1d89a4cb58deb0e8b3a85d5f9";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let l1Iili = 0; l1Iili < l1IilI.length; l1Iili++) {
    ll1I1i = l1IilI[l1Iili];
    originCookie = l1IilI[l1Iili];
    if (ll1I1i) {
      $.UserName = decodeURIComponent(ll1I1i.match(/pt_pin=([^; ]+)(?=;?)/) && ll1I1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1Iili + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = ill1l.genUA($.UserName);
      await iil1();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  if ($.errMsgPin.length > 0) {
    let l1Iill = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + l1Iill;
  }
  if ($.outFlag) {
    let iiiiIi = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + iiiiIi);
    if ($.isNode()) {
      await II1iII.sendNotify("" + $.name, "" + iiiiIi);
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(iiiiIl => $.logErr(iiiiIl)).finally(() => $.done());
async function iil1() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    ll1I1l = "";
    $.Token = "";
    $.Pin = "";
    let iII = false;
    $.Token = await iii1(ll1I1i, i1liI1);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await ilII1l();
    if (iilI == "") {
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
    await iiIIiI("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await iiIIiI("accessLogWithAD");
    await iiIIiI("activityContent");
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
    await iiIIiI("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await iiIIiI("checkOpenCard");
    await iiIIiI("taskRecord");
    await $.wait(1000);
    await iiIIiI("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          iII = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await IIiIi();
          for (let liIiil = 0; liIiil < Array(2).length; liIiil++) {
            if (liIiil > 0) {
              console.log("第" + liIiil + "次 重新开卡");
            }
            await iiiiI1();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await iiIIiI("activityContent");
          await iiIIiI("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else {
      console.log("已全部开卡");
    }
    !$.followShop && !$.outFlag && (console.log(""), await iiIIiI("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    if (li1Ii1) {
      !$.addCart && !$.outFlag && (await iiIIiI("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    }
    console.log("去助力 -> " + $.shareUuid);
    await iiIIiI("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await iiIIiI("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    iII && (await iiIIiI("activityContent"));
    if (il11Ii + "" !== "0") {
      $.runFalag = true;
      let lIi111 = parseInt($.score / 100);
      il11Ii = parseInt(il11Ii, 10);
      if (lIi111 > il11Ii) {
        lIi111 = il11Ii;
      }
      console.log("已设置抽奖次数为" + lIi111 + "次，当前有" + $.score + "金币");
      for (m = 1; lIi111--; m++) {
        console.log("进行第" + m + "次抽奖");
        await iiIIiI("startDraw");
        if ($.runFalag == false) {
          break;
        }
        if (Number(lIi111) <= 0) {
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
  } catch (iI1i) {
    console.log(iI1i);
  }
}
async function iiIIiI(l11Ill) {
  if ($.outFlag) {
    return;
  }
  let ilIil1 = "https://lzdz1-isv.isvjcloud.com",
    iI1l = "",
    lIl1I1 = "POST";
  switch (l11Ill) {
    case "getSimpleActInfoVo":
      url = ilIil1 + "/dz/common/getSimpleActInfoVo";
      iI1l = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = ilIil1 + "/customer/getMyPing";
      iI1l = "userId=1000377971&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = ilIil1 + "/common/accessLogWithAD";
      let lli1il = ilIil1 + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      iI1l = "venderId=1000377971&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lli1il) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = ilIil1 + "/wxActionCommon/getUserInfo";
      iI1l = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = ilIil1 + "/dingzhi/joinCommon/activityContent";
      iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = ilIil1 + "/dingzhi/joinCommon/drawContent";
      iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = ilIil1 + "/dingzhi/joinCommon/taskInfo";
      iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = ilIil1 + "/dingzhi/joinCommon/assist";
      iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = ilIil1 + "/dingzhi/joinCommon/taskRecord";
      iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = ilIil1 + "/dingzhi/joinCommon/doTask";
      iI1l = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = ilIil1 + "/dingzhi/joinCommon/doTask";
      iI1l = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = ilIil1 + "/dingzhi/joinCommon/doTask";
      iI1l = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = ilIil1 + "/dingzhi/opencard/" + l11Ill;
      iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (l11Ill == "browseGoods") {
        iI1l += "&value=" + $.visitSkuValue;
      }
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = ilIil1 + "/dingzhi/opencard/" + l11Ill;
      let lii1I = "",
        IIiIiI = "";
      if (l11Ill == "viewVideo") {
        lii1I = 31;
        IIiIiI = 31;
      } else {
        if (l11Ill == "visitSku") {
          lii1I = 5;
          IIiIiI = $.visitSkuValue || 5;
        } else {
          if (l11Ill == "toShop") {
            lii1I = 14;
            IIiIiI = $.toShopValue || 14;
          } else {
            l11Ill == "addSku" && (lii1I = 2, IIiIiI = $.addSkuValue || 2);
          }
        }
      }
      iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + lii1I + "&taskValue=" + IIiIiI;
      break;
    case "drawRecord":
      url = ilIil1 + "/dingzhi/joinCommon/drawRecord";
      iI1l = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = ilIil1 + "/dingzhi/joinCommon/shareRecord";
      iI1l = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = ilIil1 + "/dingzhi/joinCommon/startDraw";
      iI1l = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + l11Ill);
  }
  let iIl = ill1I(url, iI1l, lIl1I1);
  lIl1I1 === "GET" && (delete requestOptions.body, delete requestOptions.headers["Content-Type"]);
  const lIIi = 5;
  let l11Ili = 0,
    iiill = null,
    iiI11I = false;
  while (l11Ili < lIIi) {
    l11Ili > 0 && (await $.wait(1000));
    const {
      err: lliII,
      res: iiiiI,
      data: iiIlIl
    } = await i1liII(iIl, lIl1I1);
    if (lliII) {
      if (typeof lliII === "string" && lliII.includes("Timeout awaiting 'request'")) {
        iiill = l11Ill + " 请求超时，请检查网络重试";
      } else {
        const iIlIli = iiiiI?.["statusCode"];
        if (iIlIli) {
          if ([403, 493].includes(iIlIli)) {
            iiill = l11Ill + " 请求失败，IP被限制（Response code " + iIlIli + "）";
            iiI11I = true;
          } else {
            [400, 404].includes(iIlIli) ? iiill = l11Ill + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iIlIli + "）" : iiill = l11Ill + " 请求失败（Response code " + iIlIli + "）";
          }
        } else {
          iiill = l11Ill + " 请求失败 => " + (lliII.message || lliII);
        }
      }
      l11Ili++;
    } else {
      const I1il = ill1l.getResponseCookie(iiiiI, iilI),
        I1Iiil = false;
      let I1Iiii = "";
      switch (l11Ill) {
        case "getMyPing":
          I1Iiii = ill1l.getCookieValue(I1il, "LZ_AES_PIN");
          I1Iiii ? $.LZ_AES_PIN = I1Iiii : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(l11Ill) && (iilI = I1il);
      I1Iiii = ill1l.getCookieValue(iilI, "LZ_AES_PIN");
      !I1Iiii && $.LZ_AES_PIN && (iilI += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const lIIliI = ill1l.getCookieValue(iilI, "pToken");
      !lIIliI && $.pinToken && (iilI += "pToken=" + $.pinToken + "; ");
      const IiI111 = ill1l.getCookieValue(iilI, "AUTH_C_USER");
      !IiI111 && $.secretPin && (iilI += "AUTH_C_USER=" + $.secretPin + "; ");
      const i11llI = ill1l.getCookieValue(iilI, "te");
      !i11llI && $.te && (iilI += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(l11Ill)) {
        if (iiIlIl) {
          try {
            const I1IiiI = JSON.parse(iiIlIl);
            ilII1i(l11Ill, I1IiiI);
            break;
          } catch (iI1i11) {
            iiill = "❌ " + l11Ill + " 接口响应数据解析失败: " + iI1i11.message;
            console.log("🚫 " + l11Ill + " => " + String(iiIlIl));
            I1Iiil && (console.log("\n---------------------------------------------------\n"), console.log(iilI), console.log("\n---------------------------------------------------\n"));
            l11Ili++;
          }
        } else {
          iiill = "❌ " + l11Ill + " 接口无响应数据";
          l11Ili++;
        }
      } else {
        break;
      }
      iiI11I = false;
    }
  }
  l11Ili >= lIIi && (console.log(iiill), iiI11I && !i1ii11 && ($.outFlag = true));
}
async function i1liII(iIiIII, I1lI = "POST") {
  if (I1lI === "POST") {
    return new Promise(async lIiii1 => {
      $.post(iIiIII, (iilI11, lIiiiI, iiI1Il) => {
        lIiii1({
          err: iilI11,
          res: lIiiiI,
          data: iiI1Il
        });
      });
    });
  } else {
    if (I1lI === "GET") {
      return new Promise(async lliliI => {
        $.get(iIiIII, (ll1iiI, lIIlll, ll1ii1) => {
          lliliI({
            err: ll1iiI,
            res: lIIlll,
            data: ll1ii1
          });
        });
      });
    } else {
      const IiIlII = "不支持的请求方法";
      return {
        err: IiIlII,
        res: null,
        data: null
      };
    }
  }
}
async function ilII1i(iI11i, I1Iili) {
  try {
    switch (iI11i) {
      case "getSimpleActInfoVo":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            if (typeof I1Iili.data.shopId != "undefined") {
              $.shopId = I1Iili.data.shopId;
            }
            if (typeof I1Iili.data.venderId != "undefined") {
              $.venderId = I1Iili.data.venderId;
            }
          } else {
            I1Iili.errorMessage ? console.log("" + (I1Iili.errorMessage || "")) : console.log("" + I1Iili);
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "getMyPing":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            if (I1Iili.data && typeof I1Iili.data.secretPin != "undefined") {
              $.Pin = I1Iili.data.secretPin;
            }
            if (I1Iili.data && typeof I1Iili.data.nickname != "undefined") {
              $.nickname = I1Iili.data.nickname;
            }
          } else {
            if (I1Iili.errorMessage) {
              console.log("" + (I1Iili.errorMessage || ""));
              $.errMsgPin.push($.UserName);
            } else {
              console.log("" + I1Iili);
            }
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "getUserInfo":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            if (I1Iili.data && typeof I1Iili.data.yunMidImageUrl != "undefined") {
              $.attrTouXiang = I1Iili.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            }
          } else {
            I1Iili.errorMessage ? console.log("" + (I1Iili.errorMessage || "")) : console.log("" + I1Iili);
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "activityContent":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            $.endTime = I1Iili.data.endTime || I1Iili.data.activityVo && I1Iili.data.activityVo.endTime || I1Iili.data.activity.endTime || 0;
            $.hasEnd = I1Iili.data.isEnd || false;
            $.score = I1Iili.data.actorInfo.score || 0;
            $.actorUuid = I1Iili.data.actorInfo.uuid || "";
            $.assistCount = I1Iili.data.actorInfo.assistCount || 0;
          } else {
            I1Iili.errorMessage ? console.log("" + (I1Iili.errorMessage || "")) : console.log("" + I1Iili);
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "assist":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            $.assistState = I1Iili.data.assistState || 0;
            $.allOpenCard = I1Iili.data.openCardInfo.openAll || false;
            $.openVenderId = I1Iili.data.openCardInfo.openVenderId || [];
            I1Iili?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (I1Iili?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else {
            I1Iili.errorMessage ? console.log("" + (I1Iili.errorMessage || "")) : console.log("" + I1Iili);
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "taskRecord":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            $.followShop = I1Iili.data["20"].recordCount || 0;
            $.addCart = I1Iili.data["23"].recordCount || 0;
            $.visitSku = I1Iili.data["10"].recordCount || 0;
          } else {
            I1Iili.errorMessage ? console.log("" + (I1Iili.errorMessage || "")) : console.log("" + I1Iili);
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "checkOpenCard":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            let il1lll = I1Iili.data["10"].settingInfo || [],
              i1Il11 = I1Iili.data.cardList || [],
              li1lI1 = I1Iili.data.openCardList || [];
            $.openList = [...i1Il11, ...il1lll, ...li1lI1];
            $.openCardScore1 = I1Iili.data.score1 || 0;
            $.openCardScore2 = I1Iili.data.score2 || 0;
            $.drawScore = I1Iili.data.drawScore || 0;
            if (I1Iili.data.beans || I1Iili.data.addBeanNum) {
              console.log("开卡获得：" + (I1Iili.data.beans || I1Iili.data.addBeanNum) + "京豆 🐶");
            }
          } else {
            I1Iili.errorMessage ? console.log("" + (I1Iili.errorMessage || "")) : console.log("" + I1Iili);
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "addSku":
      case "followShop":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            console.log("完成任务,获得" + (I1Iili?.["data"]?.["beans"] || 0) + "京豆, " + (I1Iili?.["data"]?.["score"] || 0) + "金币");
          } else {
            if (I1Iili.errorMessage) {
              console.log("" + (I1Iili.errorMessage || ""));
            } else {
              console.log("" + I1Iili);
            }
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "startDraw":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            if (typeof I1Iili.data == "object") {
              drawInfo = I1Iili.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = I1Iili.data.addressId;
                    prizeName = drawInfo.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) {
                      console.log("预览图片：" + drawInfo.showImage);
                    }
                    let Il11II = await iiIIi1("https://lzdz1-isv.isvjcloud.com", ll1I1i, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    if (Il11II) {
                      $.isNode() && (await II1iII.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId="));
                    } else {
                      $.isNode() && (await II1iII.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
                    $.isNode() && (await II1iII.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
              console.log("" + I1Iili);
            }
          } else {
            I1Iili.errorMessage ? ($.runFalag = false, console.log("" + (I1Iili.errorMessage || ""))) : console.log("" + I1Iili);
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            if (typeof I1Iili.data == "object") {
              let i1Il1I = "",
                lIiiil = "抽奖";
              I1Iili.data.addBeanNum && (i1Il1I = I1Iili.data.addBeanNum + "京豆");
              I1Iili.data.addPoint && (i1Il1I += " " + I1Iili.data.addPoint + "游戏机会");
              if (iI11i == "followShop") {
                lIiiil = "关注";
                I1Iili.data.beans != "0" && (i1Il1I += I1Iili.data.beans + "京豆 🐶");
              } else {
                if (iI11i == "addSku" || iI11i == "addCart") {
                  lIiiil = "加购";
                  I1Iili.data.beans != "0" && (i1Il1I += I1Iili.data.beans + "京豆 🐶");
                } else {
                  if (iI11i == "viewVideo") {
                    lIiiil = "热门文章";
                  } else {
                    if (iI11i == "toShop") {
                      lIiiil = "浏览店铺";
                    } else {
                      if (iI11i == "visitSku" || iI11i == "browseGoods") {
                        lIiiil = "浏览商品";
                      } else {
                        if (iI11i == "sign") {
                          lIiiil = "签到";
                        } else {
                          let I1ill = typeof I1Iili.data.drawOk === "object" && I1Iili.data.drawOk || I1Iili.data;
                          i1Il1I = I1ill.drawOk == true && I1ill.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !i1Il1I && (i1Il1I = "空气 💨");
              console.log(lIiiil + "获得：" + (i1Il1I || I1Iili));
            } else {
              console.log("" + I1Iili);
            }
          } else {
            I1Iili.errorMessage ? ($.runFalag = false, console.log("" + (I1Iili.errorMessage || ""))) : console.log("" + I1Iili);
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "drawRecord":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true) {
            let i1Il1i = 0;
            for (let lIiil1 of I1Iili.data) {
              infoType = lIiil1.infoType;
              infoName = lIiil1.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  i1Il1i += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await II1iII.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await II1iII.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            i1Il1i > 0 && console.log("当前累计获得 " + i1Il1i + " 京豆 🐶");
          } else {
            if (I1Iili.errorMessage) {
              console.log("" + (I1Iili.errorMessage || ""));
            } else {
              console.log("" + I1Iili);
            }
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "getShareRecord":
        if (typeof I1Iili == "object") {
          if (I1Iili.result && I1Iili.result === true && I1Iili.data) {
            $.ShareCount = I1Iili.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else {
            I1Iili.errorMessage ? console.log("" + (I1Iili.errorMessage || "")) : console.log("" + I1Iili);
          }
        } else {
          console.log("" + I1Iili);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(iI11i + "-> " + I1Iili);
    }
    typeof I1Iili == "object" && I1Iili.errorMessage && I1Iili.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (i111II) {
    console.log(i111II);
  }
}
function ill1I(I11Il1, IiIIl1, IiiiI1 = "POST") {
  let I11Ili = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: ll1I1i,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  I11Il1.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (I11Ili.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, I11Ili.Cookie = "" + (ll1I1l && ll1I1l || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + iilI);
  return {
    url: I11Il1,
    method: IiiiI1,
    headers: I11Ili,
    body: IiIIl1,
    timeout: 30000
  };
}
function ilII1l() {
  return new Promise(iiiii1 => {
    let IIill1 = {
      url: "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      followRedirect: false,
      headers: {
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(IIill1, async (iIII, iI1I1, Ii11iI) => {
      try {
        if (iIII) {
          iI1I1 && typeof iI1I1.statusCode != "undefined";
          console.log("" + $.toStr(iIII));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Iiii1I = Ii11iI.match(/(活动已经结束)/) && Ii11iI.match(/(活动已经结束)/)[1] || "";
          Iiii1I && ($.activityEnd = true, console.log("活动已结束"));
          IIilII(iI1I1);
        }
      } catch (il11lI) {
        $.logErr(il11lI, iI1I1);
      } finally {
        iiiii1();
      }
    });
  });
}
function IIilII(iiIllI) {
  if (iiIllI) {
    if (iiIllI.headers["set-cookie"]) {
      ll1I1i = originCookie + ";";
      for (let lllllI of iiIllI.headers["set-cookie"]) {
        iiiiII[lllllI.split(";")[0].substr(0, lllllI.split(";")[0].indexOf("="))] = lllllI.split(";")[0].substr(lllllI.split(";")[0].indexOf("=") + 1);
      }
      for (const IiliIi of Object.keys(iiiiII)) {
        ll1I1i += IiliIi + "=" + iiiiII[IiliIi] + ";";
      }
      iilI = ll1I1i;
    }
  }
}
function l1Iil1(iiIlll) {
  iiIlll = iiIlll || 32;
  let lllll1 = "abcdef0123456789",
    II1iii = lllll1.length,
    iII1lI = "";
  for (i = 0; i < iiIlll; i++) {
    iII1lI += lllll1.charAt(Math.floor(Math.random() * II1iii));
  }
  return iII1lI;
}
function IIiIl(iII1) {
  if (typeof iII1 == "string") {
    try {
      return JSON.parse(iII1);
    } catch (I1I1l) {
      console.log(I1I1l);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function iiiiI1() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async illiII => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let llllil = "";
    if ($.shopactivityId) {
      llllil = ",\"activityId\":" + $.shopactivityId;
    }
    const II1ill = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + llllil + ",\"channel\":406}",
      ilili = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(II1ill)
      },
      iII1iI = await ill1i("27004", ilili),
      II1ili = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + II1ill + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iII1iI),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: ll1I1i
        }
      };
    $.get(II1ili, async (l11i, IIl1ll, lliIll) => {
      try {
        if (l11i) {
          console.log(l11i);
        } else {
          const iIIi = JSON.parse(lliIll);
          if (typeof iIIi === "object") {
            if (iIIi.success === true) {
              console.log(iIIi.message);
              $.errorJoinShop = iIIi.message;
              if (iIIi.result && iIIi.result.giftInfo) {
                for (let illiIi of iIIi.result.giftInfo.giftList) {
                  console.log("入会获得：" + illiIi.discountString + illiIi.prizeName + illiIi.secondLineDesc);
                }
              }
            } else {
              typeof iIIi == "object" && iIIi.message ? ($.errorJoinShop = iIIi.message, console.log("" + (iIIi.message || ""))) : console.log(lliIll);
            }
          } else {
            console.log(lliIll);
          }
        }
      } catch (il11li) {
        $.logErr(il11li, IIl1ll);
      } finally {
        illiII();
      }
    });
  });
}
async function IIiIi() {
  return new Promise(async Ii11ll => {
    let ilil1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const llII = {
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(ilil1)
      },
      li1l11 = await ill1i("27004", llII),
      lIiI1I = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + ilil1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(li1l11),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: ll1I1i
        }
      };
    $.get(lIiI1I, async (lII1iI, lIlIII, iiiili) => {
      try {
        if (lII1iI) {
          console.log(lII1iI);
        } else {
          const I11lII = JSON.parse(iiiili);
          typeof I11lII === "object" ? I11lII.success === true && (console.log("去加入：" + (I11lII.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = I11lII.result.interestsRuleList && I11lII.result.interestsRuleList[0] && I11lII.result.interestsRuleList[0].interestsInfo && I11lII.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = I11lII.result.userInfo.openCardStatus) : console.log(iiiili);
        }
      } catch (iiiil1) {
        $.logErr(iiiil1, lIlIII);
      } finally {
        Ii11ll();
      }
    });
  });
}
function i1ii1i(IIl1l1) {
  return new Promise(lIlIIi => {
    const llI1 = {
      url: "" + IIl1l1,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(llI1, async (iII1li, lIiii, I1111l) => {
      try {
        if (!iII1li) {
          I1111l ? I1111l = JSON.parse(I1111l) : console.log("未获取到数据,请重新运行");
        }
      } catch (lIil1) {
        $.logErr(lIil1, lIiii);
        I1111l = null;
      } finally {
        lIlIIi(I1111l);
      }
    });
  });
}
function iiii(iiiill, IIl1iI) {
  return Math.floor(Math.random() * (IIl1iI - iiiill)) + iiiill;
}
function iiil() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const ilii1 = Array.from(new Set($.blacklist.split("&")));
  console.log(ilii1.join("&") + "\n");
  let I11lI1 = ilii1,
    li1l1I = [],
    Il1lI1 = false;
  for (let lIilI = 0; lIilI < l1IilI.length; lIilI++) {
    let lli1I1 = decodeURIComponent(l1IilI[lIilI].match(/pt_pin=([^; ]+)(?=;?)/) && l1IilI[lIilI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!lli1I1) {
      break;
    }
    let II1I1i = false;
    for (let II1I1l of I11lI1) {
      if (II1I1l && II1I1l == lli1I1) {
        II1I1i = true;
        break;
      }
    }
    if (!II1I1i) {
      Il1lI1 = true;
      li1l1I.splice(lIilI, -1, l1IilI[lIilI]);
    }
  }
  if (Il1lI1) {
    l1IilI = li1l1I;
  }
}
function li1Iil(lIiI, lII1lI) {
  lII1lI != 0 && lIiI.unshift(lIiI.splice(lII1lI, 1)[0]);
}
function ill11() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(l1IilI, l1IilI));
    return;
  }
  console.log("当前已设置白名单：");
  const lIill = Array.from(new Set($.whitelist.split("&")));
  console.log(lIill.join("&") + "\n");
  let iIiI1l = [],
    iIiI1i = lIill;
  for (let iil in l1IilI) {
    let i1li1I = decodeURIComponent(l1IilI[iil].match(/pt_pin=([^; ]+)(?=;?)/) && l1IilI[iil].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iIiI1i.includes(i1li1I) && iIiI1l.push(l1IilI[iil]);
  }
  helpCookiesArr = iIiI1l;
  if (iIiI1i.length > 1) {
    for (let i1li11 in iIiI1i) {
      let iIiI1I = iIiI1i[iIiI1i.length - 1 - i1li11];
      if (!iIiI1I) {
        continue;
      }
      for (let iIlIII in helpCookiesArr) {
        let iIIll = decodeURIComponent(helpCookiesArr[iIlIII].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iIlIII].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        iIiI1I == iIIll && li1Iil(helpCookiesArr, iIlIII);
      }
    }
  }
}