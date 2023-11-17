/*
11.10-11.18 钜惠云集 好礼相送
开卡脚本,一次性脚本

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行
//export opencard_draw="3" //抽奖次数 3
————————————————
入口：[ 11.10-11.18 钜惠云集 好礼相送 ]

请求太频繁会被黑ip
请更换IP后再执行脚本
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#11.10-11.18 钜惠云集 好礼相送
1 1 1 1 * jd_opencardL348.js, tag=11.10-11.18 钜惠云集 好礼相送, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('11.10-11.18 钜惠云集 好礼相送')
var version_ = "jsjiami.com.v7";
const l1Iiil = $.isNode() ? require("./jdCookie.js") : "",
  I1li1I = $.isNode() ? require("./sendNotify") : "";
let IIiII = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
  iiiI = $.isNode() ? process.env.opencard_addCart ? process.env.opencard_addCart : false : $.getdata("opencard_addCart") ? $.getdata("opencard_addCart") : false;
const I1li11 = process.env.jd_opencard_break === "true",
  II1iIl = require("./function/krgetToken"),
  II1iIi = require("./function/krh5st"),
  iI1iI = require("./function/jdCommon"),
  Ii11I1 = require("./function/krwxSavePrize");
let li1IiI = "https://lzdz1-isv.isvjcloud.com",
  Illl = [],
  Illi = "",
  l1IiiI = {};
if ($.isNode()) {
  Object.keys(l1Iiil).forEach(iil1 => {
    Illl.push(l1Iiil[iil1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  Illl = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1IilI($.getdata("CookiesJD") || "[]").map(iiIIiI => iiIIiI.cookie)].filter(i1liII => !!i1liII);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let II1iI1 = "",
  iI1i1 = "",
  il11Il = process.env.JD_LZ_OPENCARD ? process.env.JD_LZ_OPENCARD : "true",
  IIiI1 = "",
  II1iII = "";
$.whitelist = process.env.jd_opencard_whitelist || IIiI1;
$.blacklist = process.env.jd_opencard_blacklist || II1iII;
i1ii1I();
IIilI1();
$.errMsgPin = [];
!(async () => {
  if (il11Il === "false") {
    console.log("\n❌  已设置全局关闭开卡相关活动\n");
    return;
  }
  if (!Illl[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = await ll1I1l("http://code.kingran.cf/348.json");
  if (authorCodeList) {
    console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
    $.authorCode = authorCodeList[iilI(0, authorCodeList.length)];
  } else {
    let iiIIlI = ["04e0443306eb474a90de44d7ebfbe2fd"];
    $.authorCode = iiIIlI[iilI(0, iiIIlI.length)];
    console.log("❖ 准备就绪...\n");
  }
  $.activityId = "e9b0d5ee56114e1685b77eba4b8d825f";
  $.shareUuid = $.authorCode;
  console.log("❖ 活动入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId);
  console.log("❖ 默认不加购，如需加购请设置环境变量 [opencard_addCart]，变量值为 true");
  console.log("❖ 默认不抽奖，如需抽奖请设置环境变量 [opencard_draw]，变量值为抽奖次数");
  for (let IIl1II = 0; IIl1II < Illl.length; IIl1II++) {
    Illi = Illl[IIl1II];
    originCookie = Illl[IIl1II];
    if (Illi) {
      $.UserName = decodeURIComponent(Illi.match(/pt_pin=([^; ]+)(?=;?)/) && Illi.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIl1II + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = iI1iI.genUA($.UserName);
      await il11Ii();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  if ($.errMsgPin.length > 0) {
    let iill = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + iill;
  }
  if ($.outFlag) {
    let iiIIl1 = "此ip已被限制，请更换IP后再执行脚本";
    $.msg($.name, "", "" + iiIIl1);
    if ($.isNode()) {
      await I1li1I.sendNotify("" + $.name, "" + iiIIl1);
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(llIi1I => $.logErr(llIi1I)).finally(() => $.done());
async function il11Ii() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    II1iI1 = "";
    $.Token = "";
    $.Pin = "";
    let lIIl = false;
    $.Token = await II1iIl(Illi, li1IiI);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await ill1l();
    if (iI1i1 == "") {
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
    await li1Ii1("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await li1Ii1("accessLogWithAD");
    await li1Ii1("activityContent");
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
    await li1Ii1("drawContent");
    $.openList = [];
    $.allOpenCard = false;
    await li1Ii1("checkOpenCard");
    await li1Ii1("taskRecord");
    await $.wait(1000);
    await li1Ii1("assist");
    if ($.allOpenCard == false) {
      console.log("开卡任务：");
      for (o of $.openList) {
        $.openCard = false;
        if (!$.openVenderId.includes(o.value * 1)) {
          lIIl = true;
          $.shopactivityId = "";
          $.joinVenderId = o.venderId || o.value;
          await iiiiII();
          for (let iIlIii = 0; iIlIii < Array(2).length; iIlIii++) {
            if (iIlIii > 0) {
              console.log("第" + iIlIii + "次 重新开卡");
            }
            await ll1I1i();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await li1Ii1("activityContent");
          await li1Ii1("assist");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
    } else {
      console.log("已全部开卡");
    }
    !$.followShop && !$.outFlag && (console.log(""), await li1Ii1("followShop"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    iiiI && !$.addCart && !$.outFlag && (await li1Ii1("addCart"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    console.log("去助力 -> " + $.shareUuid);
    await li1Ii1("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 10 ? "已经助力过了哟~" : $.assistState === 21 ? "未全部开卡或者其他原因" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
    await li1Ii1("assist");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    lIIl && (await li1Ii1("activityContent"));
    if (IIiII + "" !== "0") {
      $.runFalag = true;
      let iI1i = parseInt($.score / 100);
      IIiII = parseInt(IIiII, 10);
      if (iI1i > IIiII) {
        iI1i = IIiII;
      }
      console.log("已设置抽奖次数为" + iI1i + "次，当前有" + $.score + "金币");
      for (m = 1; iI1i--; m++) {
        console.log("进行第" + m + "次抽奖");
        await li1Ii1("startDraw");
        if ($.runFalag == false) {
          break;
        }
        if (Number(iI1i) <= 0) {
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
  } catch (IIlliI) {
    console.log(IIlliI);
  }
}
async function li1Ii1(ilIil1) {
  if ($.outFlag) {
    return;
  }
  let lIl1I1 = "https://lzdz1-isv.isvjcloud.com",
    I111I1 = "",
    iIl = "POST";
  switch (ilIil1) {
    case "getSimpleActInfoVo":
      url = lIl1I1 + "/dz/common/getSimpleActInfoVo";
      I111I1 = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = lIl1I1 + "/customer/getMyPing";
      I111I1 = "userId=12228693&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = lIl1I1 + "/common/accessLogWithAD";
      let lii1i = lIl1I1 + "/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I111I1 = "venderId=12228693&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lii1i) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = lIl1I1 + "/wxActionCommon/getUserInfo";
      I111I1 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = lIl1I1 + "/dingzhi/joinCommon/activityContent";
      I111I1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = lIl1I1 + "/dingzhi/joinCommon/drawContent";
      I111I1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "checkOpenCard":
      url = lIl1I1 + "/dingzhi/joinCommon/taskInfo";
      I111I1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      url = lIl1I1 + "/dingzhi/joinCommon/assist";
      I111I1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      url = lIl1I1 + "/dingzhi/joinCommon/taskRecord";
      I111I1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "followShop":
      url = lIl1I1 + "/dingzhi/joinCommon/doTask";
      I111I1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=20&taskValue=";
      break;
    case "addCart":
      url = lIl1I1 + "/dingzhi/joinCommon/doTask";
      I111I1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=";
      break;
    case "visitSkus":
      url = lIl1I1 + "/dingzhi/joinCommon/doTask";
      I111I1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=10&taskValue=" + $.taskValue;
      break;
    case "sign":
    case "browseGoods":
      url = lIl1I1 + "/dingzhi/opencard/" + ilIil1;
      I111I1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (ilIil1 == "browseGoods") {
        I111I1 += "&value=" + $.visitSkuValue;
      }
      break;
    case "viewVideo":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = lIl1I1 + "/dingzhi/opencard/" + ilIil1;
      let lliIl = "",
        lliIi = "";
      if (ilIil1 == "viewVideo") {
        lliIl = 31;
        lliIi = 31;
      } else {
        if (ilIil1 == "visitSku") {
          lliIl = 5;
          lliIi = $.visitSkuValue || 5;
        } else {
          if (ilIil1 == "toShop") {
            lliIl = 14;
            lliIi = $.toShopValue || 14;
          } else {
            ilIil1 == "addSku" && (lliIl = 2, lliIi = $.addSkuValue || 2);
          }
        }
      }
      I111I1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + lliIl + "&taskValue=" + lliIi;
      break;
    case "drawRecord":
      url = lIl1I1 + "/dingzhi/joinCommon/drawRecord";
      I111I1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "getShareRecord":
      url = lIl1I1 + "/dingzhi/joinCommon/shareRecord";
      I111I1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
      break;
    case "startDraw":
      url = lIl1I1 + "/dingzhi/joinCommon/startDraw";
      I111I1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + ilIil1);
  }
  let l11Ili = ill1i(url, I111I1, iIl);
  iIl === "GET" && (delete requestOptions.body, delete requestOptions.headers["Content-Type"]);
  const iiill = 5;
  let iiI11I = 0,
    llIi1i = null,
    llIi1l = false;
  while (iiI11I < iiill) {
    iiI11I > 0 && (await $.wait(1000));
    const {
      err: iiiil,
      res: iiIlII,
      data: il11II
    } = await i1ii11(l11Ili, iIl);
    if (iiiil) {
      if (typeof iiiil === "string" && iiiil.includes("Timeout awaiting 'request'")) {
        llIi1i = ilIil1 + " 请求超时，请检查网络重试";
      } else {
        const l11l1 = iiIlII?.["statusCode"];
        if (l11l1) {
          if ([403, 493].includes(l11l1)) {
            llIi1i = ilIil1 + " 请求失败，IP被限制（Response code " + l11l1 + "）";
            llIi1l = true;
          } else {
            [400, 404].includes(l11l1) ? llIi1i = ilIil1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + l11l1 + "）" : llIi1i = ilIil1 + " 请求失败（Response code " + l11l1 + "）";
          }
        } else {
          llIi1i = ilIil1 + " 请求失败 => " + (iiiil.message || iiiil);
        }
      }
      iiI11I++;
    } else {
      const I1II1i = iI1iI.getResponseCookie(iiIlII, iI1i1),
        lli1il = false;
      let lii1I = "";
      switch (ilIil1) {
        case "getMyPing":
          lii1I = iI1iI.getCookieValue(I1II1i, "LZ_AES_PIN");
          lii1I ? $.LZ_AES_PIN = lii1I : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
          break;
      }
      ["getMyPing", "checkOpenCard"].includes(ilIil1) && (iI1i1 = I1II1i);
      lii1I = iI1iI.getCookieValue(iI1i1, "LZ_AES_PIN");
      !lii1I && $.LZ_AES_PIN && (iI1i1 += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const IIiIiI = iI1iI.getCookieValue(iI1i1, "pToken");
      !IIiIiI && $.pinToken && (iI1i1 += "pToken=" + $.pinToken + "; ");
      const ll1l = iI1iI.getCookieValue(iI1i1, "AUTH_C_USER");
      !ll1l && $.secretPin && (iI1i1 += "AUTH_C_USER=" + $.secretPin + "; ");
      const ll1i = iI1iI.getCookieValue(iI1i1, "te");
      !ll1i && $.te && (iI1i1 += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD", "drawContent"].includes(ilIil1)) {
        if (il11II) {
          try {
            const iiIlIi = JSON.parse(il11II);
            iii1(ilIil1, iiIlIi);
            break;
          } catch (iIlIli) {
            llIi1i = "❌ " + ilIil1 + " 接口响应数据解析失败: " + iIlIli.message;
            console.log("🚫 " + ilIil1 + " => " + String(il11II));
            lli1il && (console.log("\n---------------------------------------------------\n"), console.log(iI1i1), console.log("\n---------------------------------------------------\n"));
            iiI11I++;
          }
        } else {
          llIi1i = "❌ " + ilIil1 + " 接口无响应数据";
          iiI11I++;
        }
      } else {
        break;
      }
      llIi1l = false;
    }
  }
  if (iiI11I >= iiill) {
    console.log(llIi1i);
    if (llIi1l) {
      !I1li11 && ($.outFlag = true);
    }
  }
}
async function i1ii11(I1Iiil, I1Iiii = "POST") {
  if (I1Iiii === "POST") {
    return new Promise(async I1iI => {
      $.post(I1Iiil, (I1IiiI, iI1i11, lIIli1) => {
        I1iI({
          err: I1IiiI,
          res: iI1i11,
          data: lIIli1
        });
      });
    });
  } else {
    if (I1Iiii === "GET") {
      return new Promise(async iIiIII => {
        $.get(I1Iiil, (i11lii, I1Iii1, iiI1II) => {
          iIiIII({
            err: i11lii,
            res: I1Iii1,
            data: iiI1II
          });
        });
      });
    } else {
      const iIiII1 = "不支持的请求方法";
      return {
        err: iIiII1,
        res: null,
        data: null
      };
    }
  }
}
async function iii1(I1l1, i11liI) {
  try {
    switch (I1l1) {
      case "getSimpleActInfoVo":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            if (typeof i11liI.data.shopId != "undefined") {
              $.shopId = i11liI.data.shopId;
            }
            if (typeof i11liI.data.venderId != "undefined") {
              $.venderId = i11liI.data.venderId;
            }
          } else {
            i11liI.errorMessage ? console.log("" + (i11liI.errorMessage || "")) : console.log("" + i11liI);
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "getMyPing":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            if (i11liI.data && typeof i11liI.data.secretPin != "undefined") {
              $.Pin = i11liI.data.secretPin;
            }
            if (i11liI.data && typeof i11liI.data.nickname != "undefined") {
              $.nickname = i11liI.data.nickname;
            }
          } else {
            if (i11liI.errorMessage) {
              console.log("" + (i11liI.errorMessage || ""));
              $.errMsgPin.push($.UserName);
            } else {
              console.log("" + i11liI);
            }
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "getUserInfo":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            if (i11liI.data && typeof i11liI.data.yunMidImageUrl != "undefined") {
              $.attrTouXiang = i11liI.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            }
          } else {
            i11liI.errorMessage ? console.log("" + (i11liI.errorMessage || "")) : console.log("" + i11liI);
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "activityContent":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            $.endTime = i11liI.data.endTime || i11liI.data.activityVo && i11liI.data.activityVo.endTime || i11liI.data.activity.endTime || 0;
            $.hasEnd = i11liI.data.isEnd || false;
            $.score = i11liI.data.actorInfo.score || 0;
            $.actorUuid = i11liI.data.actorInfo.uuid || "";
            $.assistCount = i11liI.data.actorInfo.assistCount || 0;
          } else {
            i11liI.errorMessage ? console.log("" + (i11liI.errorMessage || "")) : console.log("" + i11liI);
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "assist":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            $.assistState = i11liI.data.assistState || 0;
            $.allOpenCard = i11liI.data.openCardInfo.openAll || false;
            $.openVenderId = i11liI.data.openCardInfo.openVenderId || [];
            i11liI?.["data"]?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + (i11liI?.["data"]?.["openCardInfo"]?.["beans"] || 0) + "京豆");
          } else {
            i11liI.errorMessage ? console.log("" + (i11liI.errorMessage || "")) : console.log("" + i11liI);
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "taskRecord":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            $.followShop = i11liI.data["20"].recordCount || 0;
            $.addCart = i11liI.data["23"].recordCount || 0;
            $.visitSku = i11liI.data["10"].recordCount || 0;
          } else {
            i11liI.errorMessage ? console.log("" + (i11liI.errorMessage || "")) : console.log("" + i11liI);
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "checkOpenCard":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            let I1ilI = i11liI.data["10"].settingInfo || [],
              iilii1 = i11liI.data.cardList || [],
              llilil = i11liI.data.openCardList || [];
            $.openList = [...iilii1, ...I1ilI, ...llilil];
            $.openCardScore1 = i11liI.data.score1 || 0;
            $.openCardScore2 = i11liI.data.score2 || 0;
            $.drawScore = i11liI.data.drawScore || 0;
            if (i11liI.data.beans || i11liI.data.addBeanNum) {
              console.log("开卡获得：" + (i11liI.data.beans || i11liI.data.addBeanNum) + "京豆 🐶");
            }
          } else {
            i11liI.errorMessage ? console.log("" + (i11liI.errorMessage || "")) : console.log("" + i11liI);
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "addSku":
      case "followShop":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            console.log("完成任务,获得" + (i11liI?.["data"]?.["beans"] || 0) + "京豆, " + (i11liI?.["data"]?.["score"] || 0) + "金币");
          } else {
            if (i11liI.errorMessage) {
              console.log("" + (i11liI.errorMessage || ""));
            } else {
              console.log("" + i11liI);
            }
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "startDraw":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            if (typeof i11liI.data == "object") {
              drawInfo = i11liI.data.drawInfo;
              if (drawInfo) {
                switch (drawInfo.type) {
                  case 6:
                    console.log("🎉 " + drawInfo.name + " 🐶");
                    break;
                  case 7:
                    generateId = i11liI.data.addressId;
                    prizeName = drawInfo.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    if (drawInfo.showImage) {
                      console.log("预览图片：" + drawInfo.showImage);
                    }
                    let l1liIi = await Ii11I1("https://lzdz1-isv.isvjcloud.com", Illi, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                    l1liIi ? $.isNode() && (await I1li1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&venderId=")) : $.isNode() && (await I1li1I.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + drawInfo.name + " 🎟️");
                    break;
                  case 13:
                    console.log("🎉 恭喜获得" + drawInfo.name + " 🎁");
                    $.isNode() && (await I1li1I.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId));
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
              console.log("" + i11liI);
            }
          } else {
            i11liI.errorMessage ? ($.runFalag = false, console.log("" + (i11liI.errorMessage || ""))) : console.log("" + i11liI);
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "viewVideo":
      case "visitSku":
      case "toShop":
      case "sign":
      case "addCart":
      case "browseGoods":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            if (typeof i11liI.data == "object") {
              let Il1li = "",
                lIiI11 = "抽奖";
              i11liI.data.addBeanNum && (Il1li = i11liI.data.addBeanNum + "京豆");
              i11liI.data.addPoint && (Il1li += " " + i11liI.data.addPoint + "游戏机会");
              if (I1l1 == "followShop") {
                lIiI11 = "关注";
                if (i11liI.data.beans != "0") {
                  Il1li += i11liI.data.beans + "京豆 🐶";
                }
              } else {
                if (I1l1 == "addSku" || I1l1 == "addCart") {
                  lIiI11 = "加购";
                  i11liI.data.beans != "0" && (Il1li += i11liI.data.beans + "京豆 🐶");
                } else {
                  if (I1l1 == "viewVideo") {
                    lIiI11 = "热门文章";
                  } else {
                    if (I1l1 == "toShop") {
                      lIiI11 = "浏览店铺";
                    } else {
                      if (I1l1 == "visitSku" || I1l1 == "browseGoods") {
                        lIiI11 = "浏览商品";
                      } else {
                        if (I1l1 == "sign") {
                          lIiI11 = "签到";
                        } else {
                          let i1Il11 = typeof i11liI.data.drawOk === "object" && i11liI.data.drawOk || i11liI.data;
                          Il1li = i1Il11.drawOk == true && i1Il11.name || "";
                        }
                      }
                    }
                  }
                }
              }
              !Il1li && (Il1li = "空气 💨");
              console.log(lIiI11 + "获得：" + (Il1li || data));
            } else {
              console.log("" + i11liI);
            }
          } else {
            i11liI.errorMessage ? ($.runFalag = false, console.log("" + (i11liI.errorMessage || ""))) : console.log("" + i11liI);
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "drawRecord":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true) {
            let il1lli = 0;
            for (let IIi1Il of i11liI.data) {
              infoType = IIi1Il.infoType;
              infoName = IIi1Il.infoName;
              switch (infoType) {
                case 6:
                  infoName = Number(infoName.replace("京豆", ""));
                  il1lli += infoName;
                  break;
                case 7:
                  console.log("🎉 恭喜获得实物 " + infoName + " ，请前往活动页填写收货地址~");
                  await I1li1I.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName + "，请前往活动页填写收货地址领取。");
                  break;
                case 13:
                  console.log("🎉 恭喜获得" + infoName);
                  await I1li1I.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + infoName);
                  break;
              }
            }
            il1lli > 0 && console.log("当前累计获得 " + il1lli + " 京豆 🐶");
          } else {
            if (i11liI.errorMessage) {
              console.log("" + (i11liI.errorMessage || ""));
            } else {
              console.log("" + i11liI);
            }
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "getShareRecord":
        if (typeof i11liI == "object") {
          if (i11liI.result && i11liI.result === true && i11liI.data) {
            $.ShareCount = i11liI.data.shareList.length;
            $.log("=========== 你邀请了:" + $.ShareCount + "个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n");
          } else {
            i11liI.errorMessage ? console.log("" + (i11liI.errorMessage || "")) : console.log("" + i11liI);
          }
        } else {
          console.log("" + i11liI);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(I1l1 + "-> " + i11liI);
    }
    typeof i11liI == "object" && i11liI.errorMessage && i11liI.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (IlII1l) {
    console.log(IlII1l);
  }
}
function ill1i(IiIIll, lIiiii, iililI = "POST") {
  let Iilli = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: Illi,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  IiIIll.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (Iilli.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, Iilli.Cookie = "" + (II1iI1 && II1iI1 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + iI1i1);
  return {
    url: IiIIll,
    method: iililI,
    headers: Iilli,
    body: lIiiii,
    timeout: 30000
  };
}
function ill1l() {
  return new Promise(i111Il => {
    let IIi1I1 = {
      url: "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      followRedirect: false,
      headers: {
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(IIi1I1, async (lIiilI, i111II, I11Il1) => {
      try {
        if (lIiilI) {
          i111II && typeof i111II.statusCode != "undefined";
          console.log("" + $.toStr(lIiilI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IiiiI1 = I11Il1.match(/(活动已经结束)/) && I11Il1.match(/(活动已经结束)/)[1] || "";
          IiiiI1 && ($.activityEnd = true, console.log("活动已结束"));
          iiIIi1(i111II);
        }
      } catch (i111I1) {
        $.logErr(i111I1, i111II);
      } finally {
        i111Il();
      }
    });
  });
}
function iiIIi1(li1lIl) {
  if (li1lIl) {
    if (li1lIl.headers["set-cookie"]) {
      Illi = originCookie + ";";
      for (let iilili of li1lIl.headers["set-cookie"]) {
        l1IiiI[iilili.split(";")[0].substr(0, iilili.split(";")[0].indexOf("="))] = iilili.split(";")[0].substr(iilili.split(";")[0].indexOf("=") + 1);
      }
      for (const Il1lIi of Object.keys(l1IiiI)) {
        Illi += Il1lIi + "=" + l1IiiI[Il1lIi] + ";";
      }
      iI1i1 = Illi;
    }
  }
}
function i1liI1(i111i1) {
  i111i1 = i111i1 || 32;
  let l1IIIl = "abcdef0123456789",
    IiliI1 = l1IIIl.length,
    Iiii11 = "";
  for (i = 0; i < i111i1; i++) {
    Iiii11 += l1IIIl.charAt(Math.floor(Math.random() * IiliI1));
  }
  return Iiii11;
}
function l1IilI(iiiii1) {
  if (typeof iiiii1 == "string") {
    try {
      return JSON.parse(iiiii1);
    } catch (Ii11iI) {
      console.log(Ii11iI);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function ll1I1i() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async i1II11 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lllllI = "";
    if ($.shopactivityId) {
      lllllI = ",\"activityId\":" + $.shopactivityId;
    }
    const Iiii1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lllllI + ",\"channel\":406}",
      IiliIi = {
        appid: "shopmember_m_jd_com",
        functionId: "bindWithVender",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(Iiii1l)
      },
      Iiii1i = await II1iIi("27004", IiliIi),
      iiIlll = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + Iiii1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Iiii1i),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: Illi
        }
      };
    $.get(iiIlll, async (i1II1I, IIiliI, I1I1i) => {
      try {
        if (i1II1I) {
          console.log(i1II1I);
        } else {
          const IiliIl = JSON.parse(I1I1i);
          if (typeof IiliIl === "object") {
            if (IiliIl.success === true) {
              console.log(IiliIl.message);
              $.errorJoinShop = IiliIl.message;
              if (IiliIl.result && IiliIl.result.giftInfo) {
                for (let llllii of IiliIl.result.giftInfo.giftList) {
                  console.log("入会获得：" + llllii.discountString + llllii.prizeName + llllii.secondLineDesc);
                }
              }
            } else {
              typeof IiliIl == "object" && IiliIl.message ? ($.errorJoinShop = IiliIl.message, console.log("" + (IiliIl.message || ""))) : console.log(I1I1i);
            }
          } else {
            console.log(I1I1i);
          }
        }
      } catch (II1ili) {
        $.logErr(II1ili, IIiliI);
      } finally {
        i1II11();
      }
    });
  });
}
async function iiiiII() {
  return new Promise(async lliIll => {
    let iIIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const lllliI = {
        appid: "shopmember_m_jd_com",
        functionId: "getShopOpenCardInfo",
        clientVersion: "9.2.0",
        client: "H5",
        body: JSON.parse(iIIi)
      },
      illiIi = await II1iIi("27004", lllliI),
      illiIl = {
        url: "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + iIIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(illiIi),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://api.m.jd.com",
          Host: "api.m.jd.com",
          accept: "*/*",
          "User-Agent": $.UA,
          Cookie: Illi
        }
      };
    $.get(illiIl, async (iIIl, il11li, il11ll) => {
      try {
        if (iIIl) {
          console.log(iIIl);
        } else {
          const II1ilI = JSON.parse(il11ll);
          if (typeof II1ilI === "object") {
            if (II1ilI.success === true) {
              console.log("去加入：" + (II1ilI.result.shopMemberCardInfo.venderCardName || "未知"));
              $.shopactivityId = II1ilI.result.interestsRuleList && II1ilI.result.interestsRuleList[0] && II1ilI.result.interestsRuleList[0].interestsInfo && II1ilI.result.interestsRuleList[0].interestsInfo.activityId || "";
              $.openCardStatus = II1ilI.result.userInfo.openCardStatus;
            }
          } else {
            console.log(il11ll);
          }
        }
      } catch (IIl1il) {
        $.logErr(IIl1il, il11li);
      } finally {
        lliIll();
      }
    });
  });
}
function ll1I1l(l1Il1i) {
  return new Promise(lII1iI => {
    const lIiI1i = {
      url: "" + l1Il1i,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIiI1i, async (lIiiI, iiiilI, lIlIIi) => {
      try {
        if (!lIiiI) {
          if (lIlIIi) {
            lIlIIi = JSON.parse(lIlIIi);
          } else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (lIlIIl) {
        $.logErr(lIlIIl, iiiilI);
        lIlIIi = null;
      } finally {
        lII1iI(lIlIIi);
      }
    });
  });
}
function iilI(Ii11lI, II1ii1) {
  return Math.floor(Math.random() * (II1ii1 - Ii11lI)) + Ii11lI;
}
function IIilI1() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const lIiil = Array.from(new Set($.blacklist.split("&")));
  console.log(lIiil.join("&") + "\n");
  let iII1ll = lIiil,
    I1111i = [],
    iliiI = false;
  for (let llIi = 0; llIi < Illl.length; llIi++) {
    let Ii11il = decodeURIComponent(Illl[llIi].match(/pt_pin=([^; ]+)(?=;?)/) && Illl[llIi].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!Ii11il) {
      break;
    }
    let ilii1 = false;
    for (let I11lI1 of iII1ll) {
      if (I11lI1 && I11lI1 == Ii11il) {
        ilii1 = true;
        break;
      }
    }
    !ilii1 && (iliiI = true, I1111i.splice(llIi, -1, Illl[llIi]));
  }
  if (iliiI) {
    Illl = I1111i;
  }
}
function li1Il1(li1l1I, Il1lI1) {
  Il1lI1 != 0 && li1l1I.unshift(li1l1I.splice(Il1lI1, 1)[0]);
}
function i1ii1I() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(Illl, Illl));
    return;
  }
  console.log("当前已设置白名单：");
  const lIii = Array.from(new Set($.whitelist.split("&")));
  console.log(lIii.join("&") + "\n");
  let ii1 = [],
    lII1li = lIii;
  for (let iIlII1 in Illl) {
    let lIlI = decodeURIComponent(Illl[iIlII1].match(/pt_pin=([^; ]+)(?=;?)/) && Illl[iIlII1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (lII1li.includes(lIlI)) {
      ii1.push(Illl[iIlII1]);
    }
  }
  helpCookiesArr = ii1;
  if (lII1li.length > 1) {
    for (let iil in lII1li) {
      let IlIii1 = lII1li[lII1li.length - 1 - iil];
      if (!IlIii1) {
        continue;
      }
      for (let i1li1I in helpCookiesArr) {
        let i1li11 = decodeURIComponent(helpCookiesArr[i1li1I].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[i1li1I].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        IlIii1 == i1li11 && li1Il1(helpCookiesArr, i1li1I);
      }
    }
  }
}
var version_ = "jsjiami.com.v7";