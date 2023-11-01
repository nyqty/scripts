/*
10.30-11.7 大牌惠聚 豪礼多多
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 10.30-11.7 大牌惠聚 豪礼多多 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#10.30-11.7 大牌惠聚 豪礼多多
11 11 11 11 * jd_opencardL344.js, tag=10.30-11.7 大牌惠聚 豪礼多多, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('10.30-11.7 大牌惠聚 豪礼多多')

const i1liIi = $.isNode() ? require("./jdCookie.js") : "",
  i1liIl = $.isNode() ? require("./sendNotify") : "";
let IiIill = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  li1Iii = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const lIII1 = require("./function/krgetToken"),
  llIi11 = require("./function/krh5st"),
  IIi11I = require("./function/jdCommon"),
  iiIIlI = require("./function/krwxSavePrize");
let IIl1II = "https://lzdz1-isv.isvjcloud.com",
  iill = [],
  iiIIl1 = "",
  llIi1I = {};
if ($.isNode()) {
  Object.keys(i1liIi).forEach(li1IlI => {
    iill.push(i1liIi[li1IlI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  iill = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iiiiIl($.getdata("CookiesJD") || "[]").map(iiI1i => iiI1i.cookie)].filter(iiI1l => !!iiI1l);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lIlIii = "",
  li1Ili = "",
  I11lil = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  Ili1li = "",
  lIlIil = "";
$.whitelist = process.env.jd_opencard_whitelist || Ili1li;
$.blacklist = process.env.jd_opencard_blacklist || lIlIil;
lIIII();
ilIIl();
$.errMsgPin = [];
!(async () => {
  if (I11lil === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!iill[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await iili("http://code.kingran.cf/344.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[IIl1Ii(0, authorCodeList.length)];
  } else {
    let l111I1 = ["bc8e4e25ad94457c81ce4d9f07eac343"];
    $.authorCode = l111I1[IIl1Ii(0, l111I1.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "0f384b0f52da4cb3bbad3970f8dcd9ee";
  $.shareUuid = $.authorCode;
  console.log("❖ 活动入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId);
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let I11liI = 0; I11liI < iill.length; I11liI++) {
    iiIIl1 = iill[I11liI];
    originCookie = iill[I11liI];
    if (iiIIl1) {
      $.UserName = decodeURIComponent(iiIIl1.match(/pt_pin=([^; ]+)(?=;?)/) && iiIIl1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I11liI + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = IIi11I.genUA($.UserName);
      await I11lii();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  if ($.errMsgPin.length > 0) {
    let iIlIl1 = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + iIlIl1;
  }
  if ($.outFlag) {
    let lli1iI = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + lli1iI);
    if ($.isNode()) {
      await i1liIl.sendNotify("" + $.name, "" + lli1iI);
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(iI1I => $.logErr(iI1I)).finally(() => $.done());
async function I11lii() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lIlIii = "";
    $.Token = "";
    $.Pin = "";
    let ilII11 = false;
    $.Token = await lIII1(iiIIl1, IIl1II);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await IIi11l();
    if (li1Ili == "") {
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
    await li1Ill("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await li1Ill("accessLogWithAD");
    await li1Ill("activityContent");
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
    await li1Ill("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await li1Ill("checkOpenCard");
    await li1Ill("taskRecord");
    await $.wait(1000);
    await li1Ill("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          ilII11 = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await iiIIli();
          for (let liIilI = 0; liIilI < Array(2).length; liIilI++) {
            if (liIilI > 0) {
              console.log("第" + liIilI + "次 重新开卡");
            }
            await IIi11i();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await li1Ill("activityContent");
          await li1Ill("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else {
      console.log("已全部开卡");
    }
    !$.followShop && !$.outFlag && (console.log(""), await li1Ill("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    if (li1Iii) {
      !$.addCart && !$.outFlag && (await li1Ill("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    }
    console.log("去助力 -> " + $.shareUuid);
    await li1Ill("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await li1Ill("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    ilII11 && (await li1Ill("activityContent"));
    if (IiIill + "" !== "0") {
      $.runFalag = true;
      let iiIlI1 = parseInt($.score / 100);
      IiIill = parseInt(IiIill, 10);
      if (iiIlI1 > IiIill) {
        iiIlI1 = IiIill;
      }
      console.log("已设置抽奖次数为" + iiIlI1 + "次，当前有" + $.score + "金币");
      for (m = 1; iiIlI1--; m++) {
        console.log("进行第" + m + "次抽奖");
        await li1Ill("startDraw");
        if ($.runFalag == false) {
          break;
        }
        if (Number(iiIlI1) <= 0) {
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
    await li1Ill("drawRecord");
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log("后面的号都会助力 -> " + $.shareUuid);
    }
    if ($.index % 5 == 0) {
      await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
    }
  } catch (lliIl) {
    console.log(lliIl);
  }
}
async function li1Ill(lliIi) {
  if ($.outFlag) {
    return;
  }
  let IIiIi1 = "https://lzdz1-isv.isvjcloud.com",
    I1i1 = "",
    iiiii = "POST";
  switch (lliIi) {
    case "getSimpleActInfoVo":
      url = IIiIi1 + "/dz/common/getSimpleActInfoVo";
      I1i1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = IIiIi1 + "/customer/getMyPing";
      I1i1 = "userId=1000090821&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = IIiIi1 + "/common/accessLogWithAD";
      let iI11i = IIiIi1 + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I1i1 = "venderId=1000090821&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iI11i) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = IIiIi1 + "/wxActionCommon/getUserInfo";
      I1i1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = IIiIi1 + "/dingzhi/joinCommon/activityContent";
      I1i1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = IIiIi1 + "/dingzhi/joinCommon/drawContent";
      I1i1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = IIiIi1 + "/dingzhi/joinCommon/taskInfo";
      I1i1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = IIiIi1 + "/dingzhi/joinCommon/assist";
      I1i1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = IIiIi1 + "/dingzhi/joinCommon/taskRecord";
      I1i1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = IIiIi1 + "/dingzhi/joinCommon/doTask";
      I1i1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = IIiIi1 + "/dingzhi/joinCommon/doTask";
      I1i1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = IIiIi1 + "/dingzhi/joinCommon/doTask";
      I1i1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = IIiIi1 + "/dingzhi/opencard/" + lliIi;
      I1i1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (lliIi == "browseGoods") {
        I1i1 += "&value=" + $.visitSkuValue;
      }
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = IIiIi1 + "/dingzhi/opencard/" + lliIi;
      let I1Iili = "",
        ilIIII = "";
      if (lliIi == "viewVideo") {
        I1Iili = 31;
        ilIIII = 31;
      } else {
        if (lliIi == "visitSku") {
          I1Iili = 5;
          ilIIII = $.visitSkuValue || 5;
        } else {
          if (lliIi == "toShop") {
            I1Iili = 14;
            ilIIII = $.toShopValue || 14;
          } else {
            lliIi == "addSku" && (I1Iili = 2, ilIIII = $.addSkuValue || 2);
          }
        }
      }
      I1i1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + I1Iili + "&taskValue=" + ilIIII;
      break;
    case "drawRecord":
      url = IIiIi1 + "/dingzhi/joinCommon/drawRecord";
      I1i1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = IIiIi1 + "/dingzhi/joinCommon/shareRecord";
      I1i1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = IIiIi1 + "/dingzhi/joinCommon/startDraw";
      I1i1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + lliIi);
  }
  let iiIlII = l1Iili(url, I1i1, iiiii);
  iiiii === "GET" && (delete requestOptions.body, delete requestOptions.headers["Content-Type"]);
  const il11II = 5;
  let l11l1 = 0,
    l11lI = null,
    Il1l11 = false;
  while (l11l1 < il11II) {
    l11l1 > 0 && (await $.wait(1000));
    const {
      err: IlIiiI,
      res: lll1l1,
      data: llili1
    } = await Ili1ll(iiIlII, iiiii);
    if (IlIiiI) {
      if (typeof IlIiiI === "string" && IlIiiI.includes("Timeout awaiting 'request'")) {
        l11lI = lliIi + " 请求超时，请检查网络重试";
      } else {
        const I1ll = lll1l1?.["statusCode"];
        if (I1ll) {
          if ([403, 493].includes(I1ll)) {
            l11lI = lliIi + " 请求失败，IP被限制（Response code " + I1ll + "）";
            Il1l11 = true;
          } else {
            if ([400, 404].includes(I1ll)) {
              l11lI = lliIi + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1ll + "）";
            } else {
              l11lI = lliIi + " 请求失败（Response code " + I1ll + "）";
            }
          }
        } else {
          l11lI = lliIi + " 请求失败 => " + (IlIiiI.message || IlIiiI);
        }
      }
      l11l1++;
    } else {
      const IlIilI = IIi11I.getResponseCookie(lll1l1, li1Ili),
        Il1il = false;
      let lll1il = "";
      switch (lliIi) {
        case "getMyPing":
          lll1il = IIi11I.getCookieValue(IlIilI, "LZ_AES_PIN");
          lll1il ? $.LZ_AES_PIN = lll1il : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
      }
      if (["getMyPing", "checkOpenCard"].includes(lliIi)) {
        li1Ili = IlIilI;
      }
      lll1il = IIi11I.getCookieValue(li1Ili, "LZ_AES_PIN");
      !lll1il && $.LZ_AES_PIN && (li1Ili += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const lll1ii = IIi11I.getCookieValue(li1Ili, "pToken");
      !lll1ii && $.pinToken && (li1Ili += "pToken=" + $.pinToken + "; ");
      const lIIllI = IIi11I.getCookieValue(li1Ili, "AUTH_C_USER");
      !lIIllI && $.secretPin && (li1Ili += "AUTH_C_USER=" + $.secretPin + "; ");
      const IIllli = IIi11I.getCookieValue(li1Ili, "te");
      !IIllli && $.te && (li1Ili += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(lliIi)) {
        if (llili1) {
          try {
            const l1li1 = JSON.parse(llili1);
            IIl1Il(lliIi, l1li1);
            break;
          } catch (IIllll) {
            l11lI = "❌ " + lliIi + " 接口响应数据解析失败: " + IIllll.message;
            console.log("🚫 " + lliIi + " => " + String(llili1));
            Il1il && (console.log("\n---------------------------------------------------\n"), console.log(li1Ili), console.log("\n---------------------------------------------------\n"));
            l11l1++;
          }
        } else {
          l11lI = "❌ " + lliIi + " 接口无响应数据";
          l11l1++;
        }
      } else {
        break;
      }
      Il1l11 = false;
    }
  }
  if (l11l1 >= il11II) {
    console.log(l11lI);
    Il1l11 && !hotbreak && ($.outFlag = true);
  }
}
async function Ili1ll(l1I111, lIIlii = "POST") {
  if (lIIlii === "POST") {
    return new Promise(async llilll => {
      $.post(l1I111, (i1III1, l1ii1i, l1liII) => {
        llilll({
          err: i1III1,
          res: l1ii1i,
          data: l1liII
        });
      });
    });
  } else {
    if (lIIlii === "GET") {
      return new Promise(async li1111 => {
        $.get(l1I111, (IiliI, IiIIiI, I11IiI) => {
          li1111({
            err: IiliI,
            res: IiIIiI,
            data: I11IiI
          });
        });
      });
    } else {
      const Il1lI = "不支持的请求方法";
      return {
        err: Il1lI,
        res: null,
        data: null
      };
    }
  }
}
async function IIl1Il(lli1l, Iili1) {
  try {
    switch (lli1l) {
      case "getSimpleActInfoVo":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            if (typeof Iili1.data.shopId != "undefined") {
              $.shopId = Iili1.data.shopId;
            }
            if (typeof Iili1.data.venderId != "undefined") {
              $.venderId = Iili1.data.venderId;
            }
          } else {
            Iili1.errorMessage ? console.log("" + (Iili1.errorMessage || "")) : console.log("" + Iili1);
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "getMyPing":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            if (Iili1.data && typeof Iili1.data.secretPin != "undefined") {
              $.Pin = Iili1.data.secretPin;
            }
            if (Iili1.data && typeof Iili1.data.nickname != "undefined") {
              $.nickname = Iili1.data.nickname;
            }
          } else {
            if (Iili1.errorMessage) {
              console.log("" + (Iili1.errorMessage || ""));
              $.errMsgPin.push($.UserName);
            } else {
              console.log("" + Iili1);
            }
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "getUserInfo":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            if (Iili1.data && typeof Iili1.data.yunMidImageUrl != "undefined") {
              $.attrTouXiang = Iili1.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            }
          } else {
            Iili1.errorMessage ? console.log("" + (Iili1.errorMessage || "")) : console.log("" + Iili1);
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "activityContent":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            $.endTime = Iili1.data.endTime || Iili1.data.activityVo && Iili1.data.activityVo.endTime || Iili1.data.activity.endTime || 0;
            $.hasEnd = Iili1.data.isEnd || false;
            $.score = Iili1.data.actorInfo.score || 0;
            $.actorUuid = Iili1.data.actorInfo.uuid || "";
            $.assistCount = Iili1.data.actorInfo.assistCount || 0;
          } else {
            Iili1.errorMessage ? console.log("" + (Iili1.errorMessage || "")) : console.log("" + Iili1);
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "assist":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            $.assistState = Iili1.data.assistState || 0;
            $.allOpenCard = Iili1.data.openCardInfo.openAll || false;
            $.openVenderId = Iili1.data.openCardInfo.openVenderId || [];
            Iili1?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (Iili1?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else {
            Iili1.errorMessage ? console.log("" + (Iili1.errorMessage || "")) : console.log("" + Iili1);
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "taskRecord":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            $.followShop = Iili1.data["20"].recordCount || 0;
            $.addCart = Iili1.data["23"].recordCount || 0;
            $.visitSku = Iili1.data["10"].recordCount || 0;
          } else {
            Iili1.errorMessage ? console.log("" + (Iili1.errorMessage || "")) : console.log("" + Iili1);
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "checkOpenCard":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            let iilill = Iili1.data["10"].settingInfo || [],
              IiIIii = Iili1.data.cardList || [],
              lIiili = Iili1.data.openCardList || [];
            $.openList = [...IiIIii, ...iilill, ...lIiili];
            $.openCardScore1 = Iili1.data.score1 || 0;
            $.openCardScore2 = Iili1.data.score2 || 0;
            $.drawScore = Iili1.data.drawScore || 0;
            if (Iili1.data.beans || Iili1.data.addBeanNum) {
              console.log("开卡获得：" + (Iili1.data.beans || Iili1.data.addBeanNum) + "京豆 🐶");
            }
          } else {
            Iili1.errorMessage ? console.log("" + (Iili1.errorMessage || "")) : console.log("" + Iili1);
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "addSku":
      case "followShop":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            console.log("完成任务,获得" + (Iili1?.["data"]?.["beans"] || 0) + "京豆, " + (Iili1?.["data"]?.["score"] || 0) + "金币");
          } else {
            Iili1.errorMessage ? console.log("" + (Iili1.errorMessage || "")) : console.log("" + Iili1);
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "startDraw":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            if (typeof Iili1.data == "object") {
              drawInfo = Iili1.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = Iili1.data.addressId;
                    prizeName = drawInfo.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) {
                      console.log("预览图片：" + drawInfo.showImage);
                    }
                    let l1IlI = await iiIIlI("https://lzdz1-isv.isvjcloud.com", iiIIl1, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    l1IlI ? $.isNode() && (await i1liIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await i1liIl.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + drawInfo.name + " 🎟️");
                    break;
                  case 13:
                    console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                    $.isNode() && (await i1liIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
              console.log("" + Iili1);
            }
          } else {
            if (Iili1.errorMessage) {
              $.runFalag = false;
              console.log("" + (Iili1.errorMessage || ""));
            } else {
              console.log("" + Iili1);
            }
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            if (typeof Iili1.data == "object") {
              let Ii11iI = "",
                IiliII = "抽奖";
              if (Iili1.data.addBeanNum) {
                Ii11iI = Iili1.data.addBeanNum + "京豆";
              }
              Iili1.data.addPoint && (Ii11iI += " " + Iili1.data.addPoint + "游戏机会");
              if (lli1l == "followShop") {
                IiliII = "关注";
                Iili1.data.beans != "0" && (Ii11iI += Iili1.data.beans + "京豆 🐶");
              } else {
                if (lli1l == "addSku" || lli1l == "addCart") {
                  IiliII = "加购";
                  Iili1.data.beans != "0" && (Ii11iI += Iili1.data.beans + "京豆 🐶");
                } else {
                  if (lli1l == "viewVideo") {
                    IiliII = "热门文章";
                  } else {
                    if (lli1l == "toShop") {
                      IiliII = "浏览店铺";
                    } else {
                      if (lli1l == "visitSku" || lli1l == "browseGoods") {
                        IiliII = "浏览商品";
                      } else {
                        if (lli1l == "sign") {
                          IiliII = "签到";
                        } else {
                          let lIll1I = typeof Iili1.data.drawOk === "object" && Iili1.data.drawOk || Iili1.data;
                          Ii11iI = lIll1I.drawOk == true && lIll1I.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !Ii11iI && (Ii11iI = "空气 💨");
              console.log(IiliII + "获得：" + (Ii11iI || data));
            } else {
              console.log("" + data);
            }
          } else {
            if (Iili1.errorMessage) {
              $.runFalag = false;
              console.log("" + (Iili1.errorMessage || ""));
            } else {
              console.log("" + Iili1);
            }
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "drawRecord":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true) {
            let i1II11 = 0;
            for (let l1Ill of Iili1.data) {
              infoType = l1Ill.infoType;
              infoName = l1Ill.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  i1II11 += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await i1liIl.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await i1liIl.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            i1II11 > 0 && console.log("当前累计获得 " + i1II11 + " 京豆 🐶");
          } else {
            Iili1.errorMessage ? console.log("" + (Iili1.errorMessage || "")) : console.log("" + Iili1);
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "getShareRecord":
        if (typeof Iili1 == "object") {
          if (Iili1.result && Iili1.result === true && Iili1.data) {
            $.ShareCount = Iili1.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else {
            if (Iili1.errorMessage) {
              console.log("" + (Iili1.errorMessage || ""));
            } else {
              console.log("" + Iili1);
            }
          }
        } else {
          console.log("" + Iili1);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(lli1l + "-> " + Iili1);
    }
    typeof Iili1 == "object" && Iili1.errorMessage && Iili1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (iII1) {
    console.log(iII1);
  }
}
function l1Iili(lIll1l, Il1lIl, I1111I = "POST") {
  let il11l1 = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: iiIIl1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  lIll1l.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (il11l1.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, il11l1.Cookie = "" + (lIlIii && lIlIii || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + li1Ili);
  return {
    url: lIll1l,
    method: I1111I,
    headers: il11l1,
    body: Il1lIl,
    timeout: 30000
  };
}
function IIi11l() {
  return new Promise(ilili => {
    let illiIi = {
      url: "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      followRedirect: false,
      headers: {
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(illiIi, async (illiIl, iIIl, il11li) => {
      try {
        if (illiIl) {
          iIIl && typeof iIIl.statusCode != "undefined";
          console.log("" + $.toStr(illiIl));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let il1i = il11li.match(/(活动已经结束)/) && il11li.match(/(活动已经结束)/)[1] || "";
          il1i && ($.activityEnd = true, console.log("活动已结束"));
          l1Iill(iIIl);
        }
      } catch (IIl1ii) {
        $.logErr(IIl1ii, iIIl);
      } finally {
        ilili();
      }
    });
  });
}
function l1Iill(il1l) {
  if (il1l) {
    if (il1l.headers["set-cookie"]) {
      iiIIl1 = originCookie + ";";
      for (let lII1iI of il1l.headers["set-cookie"]) {
        llIi1I[lII1iI.split(";")[0].substr(0, lII1iI.split(";")[0].indexOf("="))] = lII1iI.split(";")[0].substr(lII1iI.split(";")[0].indexOf("=") + 1);
      }
      for (const lIlIII of Object.keys(llIi1I)) {
        iiIIl1 += lIlIII + "=" + llIi1I[lIlIII] + ";";
      }
      li1Ili = iiIIl1;
    }
  }
}
function iiiiIi(iiiili) {
  iiiili = iiiili || 32;
  let I11lII = "abcdef0123456789",
    l1Il1I = I11lII.length,
    iiiil1 = "";
  for (i = 0; i < iiiili; i++) {
    iiiil1 += I11lII.charAt(Math.floor(Math.random() * l1Il1I));
  }
  return iiiil1;
}
function iiiiIl(il11) {
  if (typeof il11 == "string") {
    try {
      return JSON.parse(il11);
    } catch (iiiilI) {
      console.log(iiiilI);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function IIi11i() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async l111i1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let I11lI1 = "";
    if ($.shopactivityId) {
      I11lI1 = ",\"activityId\":" + $.shopactivityId;
    }
    const li1l1I = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + I11lI1 + ",\"channel\":406}",
      Il1lI1 = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(li1l1I)
      },
      lIll11 = await llIi11("27004", Il1lI1),
      iIlIIl = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + li1l1I + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIll11),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: iiIIl1
        }
      };
    $.get(iIlIIl, async (ilIl11, IIi11, lIii) => {
      try {
        if (ilIl11) {
          console.log(ilIl11);
        } else {
          const lIilI = JSON.parse(lIii);
          if (typeof lIilI === "object") {
            if (lIilI.success === true) {
              console.log(lIilI.message);
              $.errorJoinShop = lIilI.message;
              if (lIilI.result && lIilI.result.giftInfo) {
                for (let II1I1l of lIilI.result.giftInfo.giftList) {
                  console.log("入会获得：" + II1I1l.discountString + II1I1l.prizeName + II1I1l.secondLineDesc);
                }
              }
            } else {
              typeof lIilI == "object" && lIilI.message ? ($.errorJoinShop = lIilI.message, console.log("" + (lIilI.message || ""))) : console.log(lIii);
            }
          } else {
            console.log(lIii);
          }
        }
      } catch (lIi1) {
        $.logErr(lIi1, IIi11);
      } finally {
        l111i1();
      }
    });
  });
}
async function iiIIli() {
  return new Promise(async i1li11 => {
    let iIiI1I = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iIlIII = {
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(iIiI1I)
      },
      iIIll = await llIi11("27004", iIlIII),
      IIi1I = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + iIiI1I + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIIll),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: iiIIl1
        }
      };
    $.get(IIi1I, async (l11I1, iiIli1, il11i1) => {
      try {
        if (l11I1) {
          console.log(l11I1);
        } else {
          const ilii11 = JSON.parse(il11i1);
          if (typeof ilii11 === "object") {
            ilii11.success === true && (console.log("去加入：" + (ilii11.result.shopMemberCardInfo.venderCardName || "未知")), $.shopactivityId = ilii11.result.interestsRuleList && ilii11.result.interestsRuleList[0] && ilii11.result.interestsRuleList[0].interestsInfo && ilii11.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = ilii11.result.userInfo.openCardStatus);
          } else {
            console.log(il11i1);
          }
        }
      } catch (lII11) {
        $.logErr(lII11, iiIli1);
      } finally {
        i1li11();
      }
    });
  });
}
function iili(illiI1) {
  return new Promise(ilIl1l => {
    const lli1Il = {
      url: "" + illiI1,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lli1Il, async (l11Il, IIilli, l1III1) => {
      try {
        if (!l11Il) {
          l1III1 ? l1III1 = JSON.parse(l1III1) : console.log("未获取到数据,请重新运行");
        }
      } catch (lII1I) {
        $.logErr(lII1I, IIilli);
        l1III1 = null;
      } finally {
        ilIl1l(l1III1);
      }
    });
  });
}
function IIl1Ii(iiIlil, il11il) {
  return Math.floor(Math.random() * (il11il - iiIlil)) + iiIlil;
}
function ilIIl() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const Il1Ill = Array.from(new Set($.blacklist.split("&")));
  console.log(Il1Ill.join("&") + "\n");
  let Ii1il = Il1Ill,
    Il1Ili = [],
    Ii1ii = false;
  for (let IIIi1i = 0; IIIi1i < iill.length; IIIi1i++) {
    let IIIi1l = decodeURIComponent(iill[IIIi1i].match(/pt_pin=([^; ]+)(?=;?)/) && iill[IIIi1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IIIi1l) {
      break;
    }
    let l1i1ll = false;
    for (let l1i1li of Ii1il) {
      if (l1i1li && l1i1li == IIIi1l) {
        l1i1ll = true;
        break;
      }
    }
    !l1i1ll && (Ii1ii = true, Il1Ili.splice(IIIi1i, -1, iill[IIIi1i]));
  }
  if (Ii1ii) {
    iill = Il1Ili;
  }
}
function I11ll1(I1IiII, Ili11) {
  Ili11 != 0 && I1IiII.unshift(I1IiII.splice(Ili11, 1)[0]);
}
function lIIII() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(iill, iill));
    return;
  }
  console.log("当前已设置白名单：");
  const lIIlI1 = Array.from(new Set($.whitelist.split("&")));
  console.log(lIIlI1.join("&") + "\n");
  let ilill1 = [],
    iIIiI1 = lIIlI1;
  for (let I1I in iill) {
    let liIi1I = decodeURIComponent(iill[I1I].match(/pt_pin=([^; ]+)(?=;?)/) && iill[I1I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iIIiI1.includes(liIi1I) && ilill1.push(iill[I1I]);
  }
  helpCookiesArr = ilill1;
  if (iIIiI1.length > 1) {
    for (let il1ill in iIIiI1) {
      let il1ili = iIIiI1[iIIiI1.length - 1 - il1ill];
      if (!il1ili) {
        continue;
      }
      for (let lI1i1 in helpCookiesArr) {
        let lII11i = decodeURIComponent(helpCookiesArr[lI1i1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lI1i1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        il1ili == lII11i && I11ll1(helpCookiesArr, lI1i1);
      }
    }
  }
}
