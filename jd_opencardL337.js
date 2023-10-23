/*
10.17-10.24 五谷丰收季 好物奇遇礼
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 10.17-10.24 五谷丰收季 好物奇遇礼 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#10.17-10.24 五谷丰收季 好物奇遇礼
11 11 11 11 * jd_opencardL337.js, tag=10.17-10.24 五谷丰收季 好物奇遇礼, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('10.17-10.24 五谷丰收季 好物奇遇礼')
const I1I1Iiil = $.isNode() ? require("./jdCookie.js") : "",
  iillll1l = $.isNode() ? require("./sendNotify") : "";
let Iii1iiii = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  Iliil1i = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const IlIll1l = require("./function/krgetToken"),
  ll11I1i1 = require("./function/krh5st"),
  iilii1lI = require("./function/jdCommon"),
  iIlI1iiI = require("./function/krwxSavePrize");
let i1ll1iil = "https://lzdz1-isv.isvjcloud.com",
  lIIlIli = [],
  IlI111il = "",
  IiilIIi = {};
if ($.isNode()) {
  Object.keys(I1I1Iiil).forEach(l1iI1l => {
    lIIlIli.push(I1I1Iiil[l1iI1l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lIIlIli = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lilliI11($.getdata("CookiesJD") || "[]").map(IliI1iIl => IliI1iIl.cookie)].filter(I1I1111I => !!I1I1111I);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lll11ii1 = "",
  l1iiill = "",
  IIlil1I1 = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  Ii1il1iI = "",
  lIiIi1II = "";
$.whitelist = process.env.jd_opencard_whitelist || Ii1il1iI;
$.blacklist = process.env.jd_opencard_blacklist || lIiIi1II;
ill1iiil();
liIlIli1();
$.errMsgPin = [];
!(async () => {
  if (IIlil1I1 === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!lIIlIli[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await i1iIIIil("http://code.kingran.cf/337.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[lIIillIl(0, authorCodeList.length)];else {
    let I1IIIIiI = ["7b4f773c3e6843a09bc51dca1e45e18d"];
    $.authorCode = I1IIIIiI[lIIillIl(0, I1IIIIiI.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "faf1924490d645839d5e13ee678ed27e";
  $.shareUuid = $.authorCode;
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let IIlIil11 = 0; IIlIil11 < lIIlIli.length; IIlIil11++) {
    IlI111il = lIIlIli[IIlIil11];
    originCookie = lIIlIli[IIlIil11];
    if (IlI111il) {
      $.UserName = decodeURIComponent(IlI111il.match(/pt_pin=([^; ]+)(?=;?)/) && IlI111il.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIlIil11 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = iilii1lI.genUA($.UserName);
      await lIliiIli();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let IlIiiiiI = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + IlIiiiiI;
  }
  if ($.outFlag) {
    let I1i11lIi = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + I1i11lIi);
    if ($.isNode()) await iillll1l.sendNotify("" + $.name, "" + I1i11lIi);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(I1l1lill => $.logErr(I1l1lill)).finally(() => $.done());
async function lIliiIli() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lll11ii1 = "";
    $.Token = "";
    $.Pin = "";
    let lii1liI = false;
    $.Token = await IlIll1l(IlI111il, i1ll1iil);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IIIll11i();
    if (l1iiill == "") {
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
    await l11I1ill("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await l11I1ill("accessLogWithAD");
    await l11I1ill("activityContent");
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
    await l11I1ill("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await l11I1ill("checkOpenCard");
    await l11I1ill("taskRecord");
    await $.wait(1000);
    await l11I1ill("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          lii1liI = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await Il1iiil();
          for (let ii1II11i = 0; ii1II11i < Array(2).length; ii1II11i++) {
            if (ii1II11i > 0) console.log("第" + ii1II11i + "次 重新开卡");
            await II1liiii();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await l11I1ill("activityContent");
          await l11I1ill("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else console.log("已全部开卡");
    !$.followShop && !$.outFlag && (console.log(""), await l11I1ill("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    Iliil1i && !$.addCart && !$.outFlag && (await l11I1ill("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await l11I1ill("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await l11I1ill("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    lii1liI && (await l11I1ill("activityContent"));
    if (Iii1iiii + "" !== "0") {
      $.runFalag = true;
      let IIili1Ii = parseInt($.score / 100);
      Iii1iiii = parseInt(Iii1iiii, 10);
      if (IIili1Ii > Iii1iiii) IIili1Ii = Iii1iiii;
      console.log("已设置抽奖次数为" + IIili1Ii + "次，当前有" + $.score + "金币");
      for (m = 1; IIili1Ii--; m++) {
        console.log("进行第" + m + "次抽奖");
        await l11I1ill("startDraw");
        if ($.runFalag == false) break;
        if (Number(IIili1Ii) <= 0) break;
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
    await l11I1ill("drawRecord");
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (iiI1I1l1) {
    console.log(iiI1I1l1);
  }
}
async function l11I1ill(Iii11llI) {
  if ($.outFlag) return;
  let Iiii1il = "https://lzdz1-isv.isvjcloud.com",
    lI11IlI1 = "",
    ilIlII1i = "POST";
  switch (Iii11llI) {
    case "getSimpleActInfoVo":
      url = Iiii1il + "/dz/common/getSimpleActInfoVo", lI11IlI1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = Iiii1il + "/customer/getMyPing", lI11IlI1 = "userId=1000006644&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = Iiii1il + "/common/accessLogWithAD";
      let ll1ii11I = Iiii1il + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      lI11IlI1 = "venderId=1000006644&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(ll1ii11I) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = Iiii1il + "/wxActionCommon/getUserInfo", lI11IlI1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = Iiii1il + "/dingzhi/joinCommon/activityContent", lI11IlI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = Iiii1il + "/dingzhi/joinCommon/drawContent", lI11IlI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = Iiii1il + "/dingzhi/joinCommon/taskInfo", lI11IlI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = Iiii1il + "/dingzhi/joinCommon/assist", lI11IlI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = Iiii1il + "/dingzhi/joinCommon/taskRecord", lI11IlI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = Iiii1il + "/dingzhi/joinCommon/doTask", lI11IlI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = Iiii1il + "/dingzhi/joinCommon/doTask", lI11IlI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = Iiii1il + "/dingzhi/joinCommon/doTask", lI11IlI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = Iiii1il + "/dingzhi/opencard/" + Iii11llI, lI11IlI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (Iii11llI == "browseGoods") lI11IlI1 += "&value=" + $.visitSkuValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = Iiii1il + "/dingzhi/opencard/" + Iii11llI;
      let ll11illi = "",
        lliililI = "";
      if (Iii11llI == "viewVideo") ll11illi = 31, lliililI = 31;else {
        if (Iii11llI == "visitSku") ll11illi = 5, lliililI = $.visitSkuValue || 5;else {
          if (Iii11llI == "toShop") ll11illi = 14, lliililI = $.toShopValue || 14;else {
            if (Iii11llI == "addSku") {
              ll11illi = 2;
              lliililI = $.addSkuValue || 2;
            }
          }
        }
      }
      lI11IlI1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + ll11illi + "&taskValue=" + lliililI;
      break;
    case "drawRecord":
      url = Iiii1il + "/dingzhi/joinCommon/drawRecord", lI11IlI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = Iiii1il + "/dingzhi/joinCommon/shareRecord", lI11IlI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = Iiii1il + "/dingzhi/joinCommon/startDraw", lI11IlI1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + Iii11llI);
  }
  let llIII1l = lii1li1i(url, lI11IlI1, ilIlII1i);
  ilIlII1i === "GET" && (delete requestOptions.body, delete requestOptions.headers["Content-Type"]);
  const IIi11lii = 5;
  let IIi1illi = 0,
    Iiii1IlI = null,
    I1lIIlII = false;
  while (IIi1illi < IIi11lii) {
    IIi1illi > 0 && (await $.wait(1000));
    const {
      err: iillI1ii,
      res: i1lIlII1,
      data: Ili11II1
    } = await Iii1iIi(llIII1l, ilIlII1i);
    if (iillI1ii) {
      if (typeof iillI1ii === "string" && iillI1ii.includes("Timeout awaiting 'request'")) Iiii1IlI = Iii11llI + " 请求超时，请检查网络重试";else {
        const i1ill1I1 = i1lIlII1?.["statusCode"];
        if (i1ill1I1) {
          if ([403, 493].includes(i1ill1I1)) Iiii1IlI = Iii11llI + " 请求失败，IP被限制（Response code " + i1ill1I1 + "）", I1lIIlII = true;else [400, 404].includes(i1ill1I1) ? Iiii1IlI = Iii11llI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + i1ill1I1 + "）" : Iiii1IlI = Iii11llI + " 请求失败（Response code " + i1ill1I1 + "）";
        } else Iiii1IlI = Iii11llI + " 请求失败 => " + (iillI1ii.message || iillI1ii);
      }
      IIi1illi++;
    } else {
      const liillllI = iilii1lI.getResponseCookie(i1lIlII1, l1iiill),
        IliIiIIi = false;
      IliIiIIi && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + Iii11llI + " 响应Body => " + (Ili11II1 || "无") + "\n"), console.log("🔧 " + Iii11llI + " 响应Cookie => " + (liillllI || "无") + "\n"), console.log("🔧 " + Iii11llI + " 请求参数"), console.log(requestOptions), console.log("\n---------------------------------------------------\n"));
      let llii11ii = "";
      switch (Iii11llI) {
        case "getMyPing":
          llii11ii = iilii1lI.getCookieValue(liillllI, "LZ_AES_PIN");
          llii11ii ? $.LZ_AES_PIN = llii11ii : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(Iii11llI) && (l1iiill = liillllI);
      llii11ii = iilii1lI.getCookieValue(l1iiill, "LZ_AES_PIN");
      !llii11ii && $.LZ_AES_PIN && (l1iiill += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const II1I1lIi = iilii1lI.getCookieValue(l1iiill, "pToken");
      if (!II1I1lIi && $.pinToken) {
        l1iiill += "pToken=" + $.pinToken + "; ";
      }
      const IIIiili1 = iilii1lI.getCookieValue(l1iiill, "AUTH_C_USER");
      !IIIiili1 && $.secretPin && (l1iiill += "AUTH_C_USER=" + $.secretPin + "; ");
      const IIii1I1I = iilii1lI.getCookieValue(l1iiill, "te");
      if (!IIii1I1I && $.te) {
        l1iiill += "te=" + $.te + "; ";
      }
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(Iii11llI)) {
        if (Ili11II1) try {
          const iII1I1li = JSON.parse(Ili11II1);
          IiilI1l1(Iii11llI, iII1I1li);
          break;
        } catch (iIlilii) {
          Iiii1IlI = "❌ " + Iii11llI + " 接口响应数据解析失败: " + iIlilii.message;
          console.log("🚫 " + Iii11llI + " => " + String(Ili11II1));
          IliIiIIi && (console.log("\n---------------------------------------------------\n"), console.log(l1iiill), console.log("\n---------------------------------------------------\n"));
          IIi1illi++;
        } else Iiii1IlI = "❌ " + Iii11llI + " 接口无响应数据", IIi1illi++;
      } else break;
      I1lIIlII = false;
    }
  }
  if (IIi1illi >= IIi11lii) {
    console.log(Iiii1IlI);
    if (I1lIIlII) {
      if (!hotbreak) {
        $.outFlag = true;
      }
    }
  }
}
async function Iii1iIi(II1IIil, il1ll1Il = "POST") {
  if (il1ll1Il === "POST") return new Promise(async lIiI1Ii => {
    $.post(II1IIil, (IiilIl1i, ll1Ili1, i11IilIi) => {
      lIiI1Ii({
        "err": IiilIl1i,
        "res": ll1Ili1,
        "data": i11IilIi
      });
    });
  });else {
    if (il1ll1Il === "GET") {
      return new Promise(async I1l1IIi => {
        $.get(II1IIil, (iIiIIl1, lil111il, IiIIIl1I) => {
          I1l1IIi({
            "err": iIiIIl1,
            "res": lil111il,
            "data": IiIIIl1I
          });
        });
      });
    } else {
      const liiIi1 = "不支持的请求方法";
      return {
        "err": liiIi1,
        "res": null,
        "data": null
      };
    }
  }
}
async function IiilI1l1(I1i1lI1i, I11i1Ii1) {
  try {
    switch (I1i1lI1i) {
      case "getSimpleActInfoVo":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) {
            if (typeof I11i1Ii1.data.shopId != "undefined") $.shopId = I11i1Ii1.data.shopId;
            if (typeof I11i1Ii1.data.venderId != "undefined") $.venderId = I11i1Ii1.data.venderId;
          } else I11i1Ii1.errorMessage ? console.log("" + (I11i1Ii1.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "getMyPing":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) {
            if (I11i1Ii1.data && typeof I11i1Ii1.data.secretPin != "undefined") $.Pin = I11i1Ii1.data.secretPin;
            if (I11i1Ii1.data && typeof I11i1Ii1.data.nickname != "undefined") $.nickname = I11i1Ii1.data.nickname;
          } else {
            if (I11i1Ii1.errorMessage) console.log("" + (I11i1Ii1.errorMessage || "")), $.errMsgPin.push($.UserName);else {
              console.log("" + data);
            }
          }
        } else console.log("" + data);
        break;
      case "getUserInfo":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) {
            if (I11i1Ii1.data && typeof I11i1Ii1.data.yunMidImageUrl != "undefined") $.attrTouXiang = I11i1Ii1.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else I11i1Ii1.errorMessage ? console.log("" + (I11i1Ii1.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "activityContent":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) {
            $.endTime = I11i1Ii1.data.endTime || I11i1Ii1.data.activityVo && I11i1Ii1.data.activityVo.endTime || I11i1Ii1.data.activity.endTime || 0;
            $.hasEnd = I11i1Ii1.data.isEnd || false;
            $.score = I11i1Ii1.data.actorInfo.score || 0;
            $.actorUuid = I11i1Ii1.data.actorInfo.uuid || "";
            $.assistCount = I11i1Ii1.data.actorInfo.assistCount || 0;
          } else {
            if (I11i1Ii1.errorMessage) {
              console.log("" + (I11i1Ii1.errorMessage || ""));
            } else console.log("" + data);
          }
        } else console.log("" + data);
        break;
      case "assist":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) $.assistState = I11i1Ii1.data.assistState || 0, $.allOpenCard = I11i1Ii1.data.openCardInfo.openAll || false, $.openVenderId = I11i1Ii1.data.openCardInfo.openVenderId || [], I11i1Ii1?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (I11i1Ii1?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");else {
            if (I11i1Ii1.errorMessage) {
              console.log("" + (I11i1Ii1.errorMessage || ""));
            } else console.log("" + data);
          }
        } else console.log("" + data);
        break;
      case "taskRecord":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) $.followShop = I11i1Ii1.data["20"].recordCount || 0, $.addCart = I11i1Ii1.data["23"].recordCount || 0, $.visitSku = I11i1Ii1.data["10"].recordCount || 0;else I11i1Ii1.errorMessage ? console.log("" + (I11i1Ii1.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "checkOpenCard":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) {
            let iIi1iiil = I11i1Ii1.data["10"].settingInfo || [],
              liII1lI = I11i1Ii1.data.cardList || [],
              Ili11lil = I11i1Ii1.data.openCardList || [];
            $.openList = [...liII1lI, ...iIi1iiil, ...Ili11lil];
            $.openCardScore1 = I11i1Ii1.data.score1 || 0;
            $.openCardScore2 = I11i1Ii1.data.score2 || 0;
            $.drawScore = I11i1Ii1.data.drawScore || 0;
            if (I11i1Ii1.data.beans || I11i1Ii1.data.addBeanNum) console.log("开卡获得：" + (I11i1Ii1.data.beans || I11i1Ii1.data.addBeanNum) + "京豆 🐶");
          } else I11i1Ii1.errorMessage ? console.log("" + (I11i1Ii1.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "addSku":
      case "followShop":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) console.log("完成任务,获得" + (I11i1Ii1?.["data"]?.["beans"] || 0) + "京豆, " + (I11i1Ii1?.["data"]?.["score"] || 0) + "金币");else I11i1Ii1.errorMessage ? console.log("" + (I11i1Ii1.errorMessage || "")) : console.log("" + data);
        } else {
          console.log("" + data);
        }
        break;
      case "startDraw":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) {
            if (typeof I11i1Ii1.data == "object") {
              drawInfo = I11i1Ii1.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = I11i1Ii1.data.addressId, prizeName = drawInfo.name, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) console.log("预览图片：" + drawInfo.showImage);
                    let i1illIIl = await iIlI1iiI("https://lzdz1-isv.isvjcloud.com", IlI111il, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    if (i1illIIl) $.isNode() && (await iillll1l.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId="));else {
                      $.isNode() && (await iillll1l.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
                    $.isNode() && (await iillll1l.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                    break;
                  case 16:
                    console.log("🎉 " + drawInfo.priceInfo + " 🧧");
                    break;
                  default:
                    drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + drawInfo.name);
                    break;
                }
              } else console.log("💨  空气");
            } else console.log("" + data);
          } else I11i1Ii1.errorMessage ? ($.runFalag = false, console.log("" + (I11i1Ii1.errorMessage || ""))) : console.log("" + data);
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
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) {
            if (typeof I11i1Ii1.data == "object") {
              let illilil1 = "",
                iIiIiiiI = "抽奖";
              I11i1Ii1.data.addBeanNum && (illilil1 = I11i1Ii1.data.addBeanNum + "京豆");
              I11i1Ii1.data.addPoint && (illilil1 += " " + I11i1Ii1.data.addPoint + "游戏机会");
              if (I1i1lI1i == "followShop") iIiIiiiI = "关注", I11i1Ii1.data.beans != "0" && (illilil1 += I11i1Ii1.data.beans + "京豆 🐶");else {
                if (I1i1lI1i == "addSku" || I1i1lI1i == "addCart") iIiIiiiI = "加购", I11i1Ii1.data.beans != "0" && (illilil1 += I11i1Ii1.data.beans + "京豆 🐶");else {
                  if (I1i1lI1i == "viewVideo") iIiIiiiI = "热门文章";else {
                    if (I1i1lI1i == "toShop") iIiIiiiI = "浏览店铺";else {
                      if (I1i1lI1i == "visitSku" || I1i1lI1i == "browseGoods") iIiIiiiI = "浏览商品";else {
                        if (I1i1lI1i == "sign") iIiIiiiI = "签到";else {
                          let iIl1i1l = typeof I11i1Ii1.data.drawOk === "object" && I11i1Ii1.data.drawOk || I11i1Ii1.data;
                          illilil1 = iIl1i1l.drawOk == true && iIl1i1l.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !illilil1 && (illilil1 = "空气 💨");
              console.log(iIiIiiiI + "获得：" + (illilil1 || data));
            } else console.log("" + data);
          } else {
            if (I11i1Ii1.errorMessage) {
              $.runFalag = false;
              console.log("" + (I11i1Ii1.errorMessage || ""));
            } else console.log("" + data);
          }
        } else console.log("" + data);
        break;
      case "drawRecord":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true) {
            let I11l11I1 = 0;
            for (let liI11I of I11i1Ii1.data) {
              infoType = liI11I.infoType;
              infoName = liI11I.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", "")), I11l11I1 += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~"), await iillll1l.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName), await iillll1l.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            I11l11I1 > 0 && console.log("当前累计获得 " + I11l11I1 + " 京豆 🐶");
          } else I11i1Ii1.errorMessage ? console.log("" + (I11i1Ii1.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "getShareRecord":
        if (typeof I11i1Ii1 == "object") {
          if (I11i1Ii1.result && I11i1Ii1.result === true && I11i1Ii1.data) {
            $.ShareCount = I11i1Ii1.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else I11i1Ii1.errorMessage ? console.log("" + (I11i1Ii1.errorMessage || "")) : console.log("" + data);
        } else console.log("" + data);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(I1i1lI1i + "-> " + data);
    }
    if (typeof I11i1Ii1 == "object") {
      if (I11i1Ii1.errorMessage) {
        I11i1Ii1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
      }
    }
  } catch (lI1IiI1l) {
    console.log(lI1IiI1l);
  }
}
function lii1li1i(llIIlII1, iI1IiliI, IliIl1i1 = "POST") {
  let li1i1i1I = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": IlI111il,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return llIIlII1.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (li1i1i1I.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, li1i1i1I.Cookie = "" + (lll11ii1 && lll11ii1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + l1iiill), {
    "url": llIIlII1,
    "method": IliIl1i1,
    "headers": li1i1i1I,
    "body": iI1IiliI,
    "timeout": 30000
  };
}
function IIIll11i() {
  return new Promise(i1Iiill1 => {
    let i1lil1i1 = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(i1lil1i1, async (iIIiI1II, l11IIliI, il1Iiil) => {
      try {
        if (iIIiI1II) {
          if (l11IIliI && typeof l11IIliI.statusCode != "undefined") {}
          console.log("" + $.toStr(iIIiI1II));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iIiIlIil = il1Iiil.match(/(活动已经结束)/) && il1Iiil.match(/(活动已经结束)/)[1] || "";
          iIiIlIil && ($.activityEnd = true, console.log("活动已结束"));
          IlIi1IIi(l11IIliI);
        }
      } catch (i1i1iili) {
        $.logErr(i1i1iili, l11IIliI);
      } finally {
        i1Iiill1();
      }
    });
  });
}
function IlIi1IIi(I1lIiii) {
  if (I1lIiii) {
    if (I1lIiii.headers["set-cookie"]) {
      IlI111il = originCookie + ";";
      for (let I111Illi of I1lIiii.headers["set-cookie"]) {
        IiilIIi[I111Illi.split(";")[0].substr(0, I111Illi.split(";")[0].indexOf("="))] = I111Illi.split(";")[0].substr(I111Illi.split(";")[0].indexOf("=") + 1);
      }
      for (const i1Illl1I of Object.keys(IiilIIi)) {
        IlI111il += i1Illl1I + "=" + IiilIIi[i1Illl1I] + ";";
      }
      l1iiill = IlI111il;
    }
  }
}
function I1liIi11(Iiliill) {
  Iiliill = Iiliill || 32;
  let lIl11ill = "abcdef0123456789",
    liliIili = lIl11ill.length,
    Ilil1lii = "";
  for (i = 0; i < Iiliill; i++) Ilil1lii += lIl11ill.charAt(Math.floor(Math.random() * liliIili));
  return Ilil1lii;
}
function lilliI11(IlIll) {
  if (typeof IlIll == "string") try {
    return JSON.parse(IlIll);
  } catch (I11il1li) {
    return console.log(I11il1li), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function II1liiii() {
  if (!$.joinVenderId) return;
  return new Promise(async il111iI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Il1Ii1il = "";
    if ($.shopactivityId) Il1Ii1il = ",\"activityId\":" + $.shopactivityId;
    const II1IiI1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Il1Ii1il + ",\"channel\":406}",
      ilIiIlli = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(II1IiI1i)
      },
      Iil11i1 = await ll11I1i1("27004", ilIiIlli),
      i1I1il11 = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + II1IiI1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Iil11i1),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": IlI111il
        }
      };
    $.get(i1I1il11, async (ilIIlil1, Ii1li1Ii, Ill1IiI1) => {
      try {
        if (ilIIlil1) console.log(ilIIlil1);else {
          const IlI1I11I = JSON.parse(Ill1IiI1);
          if (typeof IlI1I11I === "object") {
            if (IlI1I11I.success === true) {
              console.log(IlI1I11I.message);
              $.errorJoinShop = IlI1I11I.message;
              if (IlI1I11I.result && IlI1I11I.result.giftInfo) {
                for (let Ii1ll1li of IlI1I11I.result.giftInfo.giftList) {
                  console.log("入会获得：" + Ii1ll1li.discountString + Ii1ll1li.prizeName + Ii1ll1li.secondLineDesc);
                }
              }
            } else typeof IlI1I11I == "object" && IlI1I11I.message ? ($.errorJoinShop = IlI1I11I.message, console.log("" + (IlI1I11I.message || ""))) : console.log(Ill1IiI1);
          } else {
            console.log(Ill1IiI1);
          }
        }
      } catch (IIlIll1I) {
        $.logErr(IIlIll1I, Ii1li1Ii);
      } finally {
        il111iI();
      }
    });
  });
}
async function Il1iiil() {
  return new Promise(async ill1II1i => {
    let l1Ii1l1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IIIIll1i = {
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l1Ii1l1l)
      },
      lilIliiI = await ll11I1i1("27004", IIIIll1i),
      lI1ll11i = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + l1Ii1l1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lilIliiI),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": IlI111il
        }
      };
    $.get(lI1ll11i, async (iII1l1I1, lIliIl1i, lil1illl) => {
      try {
        if (iII1l1I1) console.log(iII1l1I1);else {
          const l111ilI1 = JSON.parse(lil1illl);
          typeof l111ilI1 === "object" ? l111ilI1.success === true && (console.log("去加入：" + (l111ilI1.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = l111ilI1.result.interestsRuleList && l111ilI1.result.interestsRuleList[0] && l111ilI1.result.interestsRuleList[0].interestsInfo && l111ilI1.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = l111ilI1.result.userInfo.openCardStatus) : console.log(lil1illl);
        }
      } catch (I1IIIi1i) {
        $.logErr(I1IIIi1i, lIliIl1i);
      } finally {
        ill1II1i();
      }
    });
  });
}
function i1iIIIil(i11IIlii) {
  return new Promise(IiiIIll1 => {
    const i1iIlii = {
      "url": "" + i11IIlii,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i1iIlii, async (iiii1li1, iiiill1i, iIIIl1I) => {
      try {
        if (iiii1li1) {} else iIIIl1I ? iIIIl1I = JSON.parse(iIIIl1I) : console.log("未获取到数据,请重新运行");
      } catch (i1I1lI1i) {
        $.logErr(i1I1lI1i, iiiill1i);
        iIIIl1I = null;
      } finally {
        IiiIIll1(iIIIl1I);
      }
    });
  });
}
function lIIillIl(iliIIlII, iilIiIIi) {
  return Math.floor(Math.random() * (iilIiIIi - iliIIlII)) + iliIIlII;
}
function liIlIli1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lliIiIi1 = Array.from(new Set($.blacklist.split("&")));
  console.log(lliIiIi1.join("&") + "\n");
  let llil1ilI = lliIiIi1,
    Iiil1lIi = [],
    Iilll111 = false;
  for (let IIIllIIl = 0; IIIllIIl < lIIlIli.length; IIIllIIl++) {
    let iliIl1lI = decodeURIComponent(lIIlIli[IIIllIIl].match(/pt_pin=([^; ]+)(?=;?)/) && lIIlIli[IIIllIIl].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!iliIl1lI) break;
    let I1illIiI = false;
    for (let I11l1iIi of llil1ilI) {
      if (I11l1iIi && I11l1iIi == iliIl1lI) {
        I1illIiI = true;
        break;
      }
    }
    !I1illIiI && (Iilll111 = true, Iiil1lIi.splice(IIIllIIl, -1, lIIlIli[IIIllIIl]));
  }
  if (Iilll111) lIIlIli = Iiil1lIi;
}
function iIi1Il1(il11llI1, li111Ii1) {
  li111Ii1 != 0 && il11llI1.unshift(il11llI1.splice(li111Ii1, 1)[0]);
}
function ill1iiil() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(lIIlIli, lIIlIli));
    return;
  }
  console.log("当前已设置白名单：");
  const IIIl1Iil = Array.from(new Set($.whitelist.split("&")));
  console.log(IIIl1Iil.join("&") + "\n");
  let l111llIi = [],
    I1l1IiIl = IIIl1Iil;
  for (let iillI1I in lIIlIli) {
    let i1llill1 = decodeURIComponent(lIIlIli[iillI1I].match(/pt_pin=([^; ]+)(?=;?)/) && lIIlIli[iillI1I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    I1l1IiIl.includes(i1llill1) && l111llIi.push(lIIlIli[iillI1I]);
  }
  helpCookiesArr = l111llIi;
  if (I1l1IiIl.length > 1) for (let I1l1I11I in I1l1IiIl) {
    let I1lI1lIi = I1l1IiIl[I1l1IiIl.length - 1 - I1l1I11I];
    if (!I1lI1lIi) continue;
    for (let liIlii1i in helpCookiesArr) {
      let ilili11 = decodeURIComponent(helpCookiesArr[liIlii1i].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[liIlii1i].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      I1lI1lIi == ilili11 && iIi1Il1(helpCookiesArr, liIlii1i);
    }
  }
}