/*
京东超级福利社 通用开卡
新增开卡脚本，一次性脚本


第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
变量：
jd_opencardLCD_id  // 活动ID
OPENCARD_WAIT  // 默认延迟2S
JD_PROXY_TUNNRL  // 代理默认不启用

请求太频繁会被黑ip
过10分钟再执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#京东超级福利社
1 1 1 1 * jd_opencardLCD.js, tag=京东超级福利社, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('京东超级福利社');
const I1111Iil = $.isNode() ? require("./jdCookie.js") : "",
  I1iIIiil = $.isNode() ? require("./sendNotify") : "",
  l1llllIl = require("./function/krgetToken"),
  il11Ii = require("./function/krh5st"),
  lll1ll = require("./function/jdCommon");
let lII1IIII = "https://lzdz1-isv.isvjcloud.com",
  i1l1i1 = [],
  I11lil1 = "";
if ($.isNode()) {
  Object.keys(I1111Iil).forEach(illIi11 => {
    i1l1i1.push(I1111Iil[illIi11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1l1i1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IiIi1il($.getdata("CookiesJD") || "[]").map(liil1l1i => liil1l1i.cookie)].filter(il1ll1l => !!il1ll1l);
let I1Il11I1 = process.env.jd_opencardLCD_id || "";
const IliIiiii = process.env.JD_PROXY_TUNNRL,
  lI11il1l = process.env.OPENCARD_WAIT || "1";
let l1i1Il1I = parseInt(lI11il1l) * 1000;
IliIiiii && (l1i1Il1I = 100);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let iIliIliI = "",
  Illl1I1 = "";
!(async () => {
  if (!i1l1i1[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (!I1Il11I1) {
    authorIDList = await II11IlII("http://code.kingran.cf/opencardLCDID.json");
    if (authorIDList.length > 0) authorID = authorIDList[ii1iI1(0, authorIDList.length)], $.activityId = authorID;else {
      console.log("⚠ 请先定义必要的环境变量后再运行脚本...\n");
      return;
    }
  }
  authorCodeList = await II11IlII("http://code.kingran.cf/opencardLCD.json");
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[ii1iI1(0, authorCodeList.length)];else {
    let l1i1l1I1 = ["f3286616ffdd47948761f967f14b445f", "d3d6fee8ea134dedaf67c12db72f8205"];
    $.authorCode = l1i1l1I1[ii1iI1(0, l1i1l1I1.length)];
    console.log("❖ 准备就绪...\n");
  }
  if (I1Il11I1) $.activityId = I1Il11I1;
  $.shareUuid = $.authorCode;
  console.log("❖ ID：[" + ($.activityId || "未填写活动ID") + "] 延迟(ms)：" + l1i1Il1I);
  for (let ii1I1Il = 0; ii1I1Il < i1l1i1.length; ii1I1Il++) {
    I11lil1 = i1l1i1[ii1I1Il];
    originCookie = i1l1i1[ii1I1Il];
    if (I11lil1) {
      $.UserName = decodeURIComponent(I11lil1.match(/pt_pin=([^; ]+)(?=;?)/) && I11lil1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ii1I1Il + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = lll1ll.genUA($.UserName);
      await lIiiili1();
      if ($.outFlag || $.activityEnd) break;
      await $.wait(parseInt(l1i1Il1I * 1 + 500, 10));
    }
  }
  if ($.outFlag) {
    let l1iiiI1l = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + l1iiiI1l);
    if ($.isNode()) await I1iIIiil.sendNotify("" + $.name, "" + l1iiiI1l);
  }
})().catch(l1IlllIl => $.logErr(l1IlllIl)).finally(() => $.done());
async function lIiiili1() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    iIliIliI = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await l1llllIl(I11lil1, lII1IIII);
    if (!$.Token) {
      for (let li1ii1li = 0; li1ii1li < 3; li1ii1li++) {
        IliIiiii && (console.log("Token没有成功获取，重试中"), $.Token = await l1llllIl(I11lil1, lII1IIII), $.Token && ($.flag = true));
        if ($.flag) break;
      }
    }
    if ($.Token == "") {
      console.log("获取Token失败！");
      return;
    }
    await iIlIiII();
    if (Illl1I1 == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await llli1I11("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await llli1I11("accessLogWithAD");
    await llli1I11("getUserInfo");
    await llli1I11("activityContent");
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
    await llli1I11("drawContent");
    await $.wait(parseInt(l1i1Il1I * 1 + 500, 10));
    $.openList = [];
    $.allOpenCard = false;
    await llli1I11("checkOpenCard");
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.status == 0) {
          $.joinVenderId = o.value;
          $.shopactivityId = "";
          for (let li1liI1 = 0; li1liI1 < Array(2).length; li1liI1++) {
            if (li1liI1 > 0) console.log("第" + li1liI1 + "次 重新开卡");
            await li1II1Ii();
            await $.wait(parseInt(l1i1Il1I * 1 + 500, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            break;
          }
          await llli1I11("drawContent");
          await llli1I11("checkOpenCard");
          await $.wait(parseInt(l1i1Il1I * 1 + 500, 10));
        }
      }
      await llli1I11("activityContent");
    } else console.log("已全部开卡");
    $.log("关注: " + $.followShop);
    !$.followShop && !$.outFlag && ($.followShopValue = 1, await llli1I11("followShop"), await $.wait(parseInt(l1i1Il1I * 1 + 500, 10)));
    $.log("加购: " + $.addSku);
    !$.addSku && !$.outFlag && ($.followShopValue = 2, await llli1I11("addSku"));
    await $.wait(parseInt(l1i1Il1I * 1 + 500, 10));
    await llli1I11("getDrawRecordHasCoupon");
    await llli1I11("getShareRecord");
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    console.log("当前助力:" + $.shareUuid);
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    if ($.index % 3 == 0) await $.wait(parseInt(l1i1Il1I * 1 + 2000, 10));
  } catch (I1lli1ll) {
    console.log(I1lli1ll);
  }
}
async function llli1I11(I11I1IIl) {
  if ($.outFlag) return;
  let l1III1ii = "https://lzdz1-isv.isvjcloud.com",
    iI1ili11 = "",
    iiII1Ill = "POST";
  switch (I11I1IIl) {
    case "getMyPing":
      url = l1III1ii + "/customer/getMyPing", iI1ili11 = "userId=1000282702&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = l1III1ii + "/common/accessLogWithAD";
      let Ii1lilii = l1III1ii + "/dingzhi/shop/league/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      iI1ili11 = "venderId=1000282702&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(Ii1lilii) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = l1III1ii + "/wxActionCommon/getUserInfo", iI1ili11 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = l1III1ii + "/dingzhi/shop/league/activityContent", iI1ili11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = l1III1ii + "/dingzhi/taskact/common/drawContent", iI1ili11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = l1III1ii + "/dingzhi/shop/league/checkOpenCard", iI1ili11 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid;
      break;
    case "startDraw":
      url = l1III1ii + "/dingzhi/shop/league/startDraw", iI1ili11 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + ($.startDraw && "&type=" + $.startDraw || "");
      break;
    case "followShop":
      url = l1III1ii + "/dingzhi/shop/league/saveTask", iI1ili11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=1&taskValue=" + $.followShopValue;
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = l1III1ii + "/dingzhi/shop/league/saveTask";
      let I1IIliil = "",
        IIii1i1i = "";
      if (I11I1IIl == "viewVideo") I1IIliil = 31, IIii1i1i = 31;else {
        if (I11I1IIl == "visitSku") I1IIliil = 5, IIii1i1i = $.visitSkuValue || 5;else {
          if (I11I1IIl == "toShop") I1IIliil = 14, IIii1i1i = $.toShopValue || 14;else I11I1IIl == "addSku" && (I1IIliil = 2, IIii1i1i = $.addSkuValue || 2);
        }
      }
      iI1ili11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + I1IIliil + "&taskValue=" + IIii1i1i;
      break;
    case "getDrawRecordHasCoupon":
      url = l1III1ii + "/dingzhi/taskact/common/getDrawRecordHasCoupon", iI1ili11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "getShareRecord":
      url = l1III1ii + "/dingzhi/taskact/common/getShareRecord", iI1ili11 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid;
      break;
    case "邀请":
    case "助力":
      if (I11I1IIl == "助力") {
        url = l1III1ii + "/dingzhi/light/wishLamp/assist";
      } else url = l1III1ii + "/dingzhi/linkgame/assist/status";
      iI1ili11 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid;
      break;
    default:
      console.log("错误" + I11I1IIl);
  }
  let l1IlIii1 = I11i1i1I(url, iI1ili11, iiII1Ill);
  iiII1Ill === "GET" && (delete requestOptions.body, delete requestOptions["Content-Type"]);
  const II1lilI = 5;
  let IlIl11Ii = 0,
    IlI1Il1l = null,
    I1II1i1l = false;
  while (IlIl11Ii < II1lilI) {
    IlIl11Ii > 0 && (await $.wait(1000));
    const {
      err: I1iiI1I1,
      res: IliliIii,
      data: i11il1l
    } = await lliiiliI(l1IlIii1, iiII1Ill);
    if (I1iiI1I1) {
      if (typeof I1iiI1I1 === "string" && I1iiI1I1.includes("Timeout awaiting 'request'")) IlI1Il1l = I11I1IIl + " 请求超时，请检查网络重试";else {
        const Ilil1llI = IliliIii?.["statusCode"];
        if (Ilil1llI) {
          if ([403, 493].includes(Ilil1llI)) IlI1Il1l = I11I1IIl + " 请求失败，IP被限制（Response code " + Ilil1llI + "）", I1II1i1l = true;else [400, 404].includes(Ilil1llI) ? IlI1Il1l = I11I1IIl + " 请求配置参数错误，请联系开发者进行反馈（Response code " + Ilil1llI + "）" : IlI1Il1l = I11I1IIl + " 请求失败（Response code " + Ilil1llI + "）";
        } else IlI1Il1l = I11I1IIl + " 请求失败 => " + (I1iiI1I1.message || I1iiI1I1);
      }
      IlIl11Ii++;
    } else {
      const llIillil = lll1ll.getResponseCookie(IliliIii, Illl1I1),
        liiil11l = false;
      if (liiil11l) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + I11I1IIl + " 响应Body => " + (i11il1l || "无") + "\n");
        console.log("🔧 " + I11I1IIl + " 响应Cookie => " + (llIillil || "无") + "\n");
        console.log("🔧 " + I11I1IIl + " 请求参数");
        console.log(requestOptions);
        console.log("\n---------------------------------------------------\n");
      }
      let II1iIli = "";
      switch (I11I1IIl) {
        case "getMyPing":
          II1iIli = lll1ll.getCookieValue(llIillil, "LZ_AES_PIN");
          if (II1iIli) {
            $.LZ_AES_PIN = II1iIli;
          } else console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true;
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(I11I1IIl) && (Illl1I1 = llIillil);
      II1iIli = lll1ll.getCookieValue(Illl1I1, "LZ_AES_PIN");
      !II1iIli && $.LZ_AES_PIN && (Illl1I1 += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const IlIl1I1i = lll1ll.getCookieValue(Illl1I1, "pToken");
      !IlIl1I1i && $.pinToken && (Illl1I1 += "pToken=" + $.pinToken + "; ");
      const iiii1IlI = lll1ll.getCookieValue(Illl1I1, "AUTH_C_USER");
      !iiii1IlI && $.secretPin && (Illl1I1 += "AUTH_C_USER=" + $.secretPin + "; ");
      const IIil1iI1 = lll1ll.getCookieValue(Illl1I1, "te");
      !IIil1iI1 && $.te && (Illl1I1 += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(I11I1IIl)) {
        if (i11il1l) try {
          const l11ii1il = JSON.parse(i11il1l);
          IIII1IiI(I11I1IIl, l11ii1il);
          break;
        } catch (Iii1lIl) {
          IlI1Il1l = "❌ " + I11I1IIl + " 接口响应数据解析失败: " + Iii1lIl.message;
          console.log("🚫 " + I11I1IIl + " => " + String(i11il1l));
          liiil11l && (console.log("\n---------------------------------------------------\n"), console.log(Illl1I1), console.log("\n---------------------------------------------------\n"));
          IlIl11Ii++;
        } else IlI1Il1l = "❌ " + I11I1IIl + " 接口无响应数据", IlIl11Ii++;
      } else {
        break;
      }
      I1II1i1l = false;
    }
  }
  IlIl11Ii >= II1lilI && (console.log(IlI1Il1l), I1II1i1l && !hotbreak && ($.outFlag = true));
}
async function lliiiliI(Ill1iilI, lIll1lil = "POST") {
  if (lIll1lil === "POST") return new Promise(async I1illl11 => {
    $.post(Ill1iilI, (iI1IliiI, i1i1lil1, iI1I11iI) => {
      I1illl11({
        "err": iI1IliiI,
        "res": i1i1lil1,
        "data": iI1I11iI
      });
    });
  });else {
    if (lIll1lil === "GET") return new Promise(async l1li1iiI => {
      $.get(Ill1iilI, (lIIil1lI, liI11Iii, ii1l1IIl) => {
        l1li1iiI({
          "err": lIIil1lI,
          "res": liI11Iii,
          "data": ii1l1IIl
        });
      });
    });else {
      const IIIiiliI = "不支持的请求方法";
      return {
        "err": IIIiiliI,
        "res": null,
        "data": null
      };
    }
  }
}
async function IIII1IiI(IlIi1ili, i1IIiI1l) {
  try {
    switch (IlIi1ili) {
      case "getMyPing":
        if (typeof i1IIiI1l == "object") {
          if (i1IIiI1l.result && i1IIiI1l.result === true) {
            if (i1IIiI1l.data && typeof i1IIiI1l.data.secretPin != "undefined") $.Pin = i1IIiI1l.data.secretPin;
            if (i1IIiI1l.data && typeof i1IIiI1l.data.nickname != "undefined") $.nickname = i1IIiI1l.data.nickname;
          } else i1IIiI1l.errorMessage ? console.log(IlIi1ili + " " + (i1IIiI1l.errorMessage || "")) : console.log(IlIi1ili + " " + i1IIiI1l);
        } else {
          console.log(IlIi1ili + " " + i1IIiI1l);
        }
        break;
      case "getUserInfo":
        if (typeof i1IIiI1l == "object") {
          if (i1IIiI1l.result && i1IIiI1l.result === true) {
            if (i1IIiI1l.data && typeof i1IIiI1l.data.yunMidImageUrl != "undefined") $.attrTouXiang = i1IIiI1l.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else i1IIiI1l.errorMessage ? console.log(IlIi1ili + " " + (i1IIiI1l.errorMessage || "")) : console.log(IlIi1ili + " " + i1IIiI1l);
        } else console.log(IlIi1ili + " " + i1IIiI1l);
        break;
      case "activityContent":
        if (typeof i1IIiI1l == "object") {
          if (i1IIiI1l.result && i1IIiI1l.result === true) $.endTime = i1IIiI1l.data.endTime || 0, $.hasEnd = i1IIiI1l.data.hasEnd || false, $.actorUuid = i1IIiI1l.data.actorUuid || "", $.followShop = i1IIiI1l.data.followShop.allStatus || false, $.addSku = i1IIiI1l.data.addSku.allStatus || false, i1IIiI1l.data.followShop && i1IIiI1l.data.followShop.settings && i1IIiI1l.data.followShop.settings[0] && ($.followShopValue = i1IIiI1l.data.followShop.settings[0].value || 1), i1IIiI1l.data.addSku && i1IIiI1l.data.addSku.settings && i1IIiI1l.data.addSku.settings[0] && ($.addSkuValue = i1IIiI1l.data.addSku.settings[0].value || 2);else {
            if (i1IIiI1l.errorMessage) {
              console.log(IlIi1ili + " " + (i1IIiI1l.errorMessage || ""));
            } else console.log(IlIi1ili + " " + i1IIiI1l);
          }
        } else {
          console.log(IlIi1ili + " " + i1IIiI1l);
        }
        break;
      case "checkOpenCard":
        if (typeof i1IIiI1l == "object") {
          if (i1IIiI1l.result && i1IIiI1l.result === true) {
            let lIiIIl11 = i1IIiI1l.data.cardList1 || [],
              iiIi1 = i1IIiI1l.data.cardList2 || [],
              lIilllII = i1IIiI1l.data.cardList || [];
            $.openList = [...lIilllII, ...lIiIIl11, ...iiIi1];
            $.allOpenCard = i1IIiI1l.data.allOpenCard || false;
            $.openCardScore1 = i1IIiI1l.data.score1 || i1IIiI1l.data.drawScore1 || 0;
            $.openCardScore2 = i1IIiI1l.data.score2 || i1IIiI1l.data.drawScore2 || 0;
            $.openCardScore3 = i1IIiI1l.data.score3 || i1IIiI1l.data.drawScore3 || 0;
            $.drawScore = i1IIiI1l.data.drawScore || 0;
            if (i1IIiI1l.data.sendBeanNum || i1IIiI1l.data.addBeanNum) console.log("开卡获得:" + (i1IIiI1l.data.sendBeanNum || i1IIiI1l.data.addBeanNum) + "豆");
          } else i1IIiI1l.errorMessage ? console.log(IlIi1ili + " " + (i1IIiI1l.errorMessage || "")) : console.log(IlIi1ili + " " + i1IIiI1l);
        } else console.log(IlIi1ili + " " + i1IIiI1l);
        break;
      case "startDraw":
      case "followShop":
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "addSku":
        if (typeof i1IIiI1l == "object") {
          if (i1IIiI1l.result && i1IIiI1l.result === true) {
            if (typeof i1IIiI1l.data == "object") {
              let IIliIli = "",
                iilI11il = "抽奖";
              i1IIiI1l.data.addBeanNum && i1IIiI1l.data.sendStatus && (IIliIli = i1IIiI1l.data.addBeanNum + "京豆");
              if (IlIi1ili == "followShop") iilI11il = "关注", i1IIiI1l.data.beanNumMember && i1IIiI1l.data.assistSendStatus && (IIliIli += " 额外获得:" + i1IIiI1l.data.beanNumMember + "京豆");else {
                if (IlIi1ili == "addSku") iilI11il = "加购";else {
                  if (IlIi1ili == "viewVideo") iilI11il = "热门文章";else {
                    if (IlIi1ili == "toShop") iilI11il = "浏览店铺";else IlIi1ili == "visitSku" ? iilI11il = "浏览商品" : IIliIli = i1IIiI1l.data.drawOk == true && (i1IIiI1l.data.drawInfoType == 6 && i1IIiI1l.data.name || "") || "空气💨";
                  }
                }
              }
              if (!IIliIli) {
                IIliIli = "空气💨";
              }
              console.log(iilI11il + "获得:" + (IIliIli || i1IIiI1l));
            } else console.log(IlIi1ili + " " + i1IIiI1l);
          } else i1IIiI1l.errorMessage ? console.log(IlIi1ili + " " + (i1IIiI1l.errorMessage || "")) : console.log(IlIi1ili + " " + i1IIiI1l);
        } else console.log(IlIi1ili + " " + i1IIiI1l);
        break;
      case "getDrawRecordHasCoupon":
        if (typeof i1IIiI1l == "object") {
          if (i1IIiI1l.result && i1IIiI1l.result === true) {
            console.log("我的奖品：");
            let Iii1lI1 = 0,
              IIi11iii = 0;
            for (let l1Iiilll in i1IIiI1l.data) {
              let I1I11li = i1IIiI1l.data[l1Iiilll];
              if (I1I11li.value == "邀请好友") Iii1lI1++, IIi11iii = I1I11li.infoName.replace("京豆", "");else {
                console.log(I1I11li.value + " " + I1I11li.infoName);
              }
            }
            if (Iii1lI1 > 0) console.log("邀请好友(" + Iii1lI1 + "):" + (Iii1lI1 * parseInt(IIi11iii, 10) || 30) + "京豆");
          } else i1IIiI1l.errorMessage ? console.log(IlIi1ili + " " + (i1IIiI1l.errorMessage || "")) : console.log(IlIi1ili + " " + i1IIiI1l);
        } else console.log(IlIi1ili + " " + i1IIiI1l);
        break;
      case "getShareRecord":
        if (typeof i1IIiI1l == "object") {
          if (i1IIiI1l.result && i1IIiI1l.result === true && i1IIiI1l.data) $.ShareCount = i1IIiI1l.data.length, $.log("=========== 你邀请了:" + i1IIiI1l.data.length + "个");else i1IIiI1l.errorMessage ? console.log(IlIi1ili + " " + (i1IIiI1l.errorMessage || "")) : console.log(IlIi1ili + " " + i1IIiI1l);
        } else {
          console.log(IlIi1ili + " " + i1IIiI1l);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IlIi1ili + "-> " + i1IIiI1l);
    }
    typeof i1IIiI1l == "object" && i1IIiI1l.errorMessage && i1IIiI1l.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (lll1ilIi) {
    console.log(lll1ilIi);
  }
}
function I11i1i1I(li1iIIl1, IIlliiIl, IIliIl = "POST") {
  let IIIIIii = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": I11lil1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return li1iIIl1.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (IIIIIii.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/shop/league/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, IIIIIii.Cookie = "" + (iIliIliI && iIliIliI || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + Illl1I1), {
    "url": li1iIIl1,
    "method": IIliIl,
    "headers": IIIIIii,
    "body": IIlliiIl,
    "timeout": 30000
  };
}
function iIlIiII() {
  return new Promise(Iiil => {
    let IiiIII1I = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/shop/league/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(IiiIII1I, async (i1iI1liI, iliil1ll, I1lilII) => {
      try {
        if (i1iI1liI) iliil1ll && typeof iliil1ll.statusCode != "undefined" && iliil1ll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(i1iI1liI)), console.log($.name + " cookie API请求失败，请检查网路重试");else {
          let llllIil = I1lilII.match(/(活动已经结束)/) && I1lilII.match(/(活动已经结束)/)[1] || "";
          llllIil && ($.activityEnd = true, console.log("活动已结束"));
          iliil1ll.status == 200 && (Illl1I1 = lll1ll.getResponseCookie(iliil1ll, Illl1I1));
        }
      } catch (IlIlIi1I) {
        $.logErr(IlIlIi1I, iliil1ll);
      } finally {
        Iiil();
      }
    });
  });
}
function ll1Ii11I(ilIIi1li) {
  ilIIi1li = ilIIi1li || 32;
  let Iii1lIIl = "abcdef0123456789",
    IlIli1ll = Iii1lIIl.length,
    ii11iiI = "";
  for (i = 0; i < ilIIi1li; i++) ii11iiI += Iii1lIIl.charAt(Math.floor(Math.random() * IlIli1ll));
  return ii11iiI;
}
async function li1II1Ii() {
  if (!$.joinVenderId) return;
  return new Promise(async lilliil1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lIIIli1l = "";
    if ($.shopactivityId) lIIIli1l = ",\"activityId\":" + $.shopactivityId;
    const iil1i1Ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lIIIli1l + ",\"channel\":406}",
      lIliIII1 = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iil1i1Ii)
      },
      l1illliI = await il11Ii("27004", lIliIII1),
      iIl1l1iI = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + iil1i1Ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1illliI),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": I11lil1
        }
      };
    $.get(iIl1l1iI, async (ll1ii1il, lIllII1, llIIlllI) => {
      try {
        if (ll1ii1il) console.log(ll1ii1il);else {
          const IIliIlI = JSON.parse(llIIlllI);
          if (typeof IIliIlI === "object") {
            if (IIliIlI.success === true) {
              console.log(IIliIlI.message);
              $.errorJoinShop = IIliIlI.message;
              if (IIliIlI.result && IIliIlI.result.giftInfo) for (let IiiIIllI of IIliIlI.result.giftInfo.giftList) {
                console.log("入会获得：" + IiiIIllI.discountString + IiiIIllI.prizeName + IiiIIllI.secondLineDesc);
              }
            } else typeof IIliIlI == "object" && IIliIlI.message ? ($.errorJoinShop = IIliIlI.message, console.log("" + (IIliIlI.message || ""))) : console.log(llIIlllI);
          } else console.log(llIIlllI);
        }
      } catch (IiiII1II) {
        $.logErr(IiiII1II, lIllII1);
      } finally {
        lilliil1();
      }
    });
  });
}
function II11IlII(iIlIIIl) {
  return new Promise(lIl1I1lI => {
    const ilIII1I1 = {
      "url": "" + iIlIIIl,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ilIII1I1, async (ilIIliI1, IiIiI1ll, IIlii1I) => {
      try {
        if (ilIIliI1) {} else {
          if (IIlii1I) IIlii1I = JSON.parse(IIlii1I);else {}
        }
      } catch (lII1IiI) {
        $.logErr(lII1IiI, IiIiI1ll);
        IIlii1I = null;
      } finally {
        lIl1I1lI(IIlii1I);
      }
    });
  });
}
function ii1iI1(IIIi11I, ll1lii1l) {
  return Math.floor(Math.random() * (ll1lii1l - IIIi11I)) + IIIi11I;
}
function IiIi1il(Illl11Il) {
  if (typeof Illl11Il == "string") {
    try {
      return JSON.parse(Illl11Il);
    } catch (lIIili1l) {
      return console.log(lIIili1l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}