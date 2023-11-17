/*
活动名称：店铺签到 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/sign/signActivity2?activityId=<活动id>
        https://lzkj-isv.isvjd.com/sign/sevenDay/signActivity?activityId=<活动id>
        https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=<活动id>
        https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=<活动id>
环境变量：jd_wxSign_sign_lzkj_Ids // 超级无线签到有礼活动id（旧变量 LZKJ_SIGN）
        jd_wxSign_sevenDay_lzkj_Ids // 超级无线7日签到活动id（旧变量 LZKJ_SEVENDAY）
        jd_wxSign_sign_cjhy_Ids // 超级会员签到有礼活动id（旧变量 CJHY_SIGN）
        jd_wxSign_sevenDay_cjhy_Ids // 超级会员7日签到活动id（旧变量 CJHY_SEVENDAY）
        jd_wxSign_lzkjInterval // 自定义超级无线活动签到间隔（整数），默认1秒
        jd_wxSign_cjhyInterval // 自定义超级会员活动签到间隔（整数），默认1秒
        jd_wxSign_lzkjFilter // 账号pin过滤（跳过不跑），多个用户名用@分割
        jd_wxSign_cjhyFilter // 账号pin过滤（跳过不跑），多个用户名用@分割
        jd_wxSign_Notify // 是否推送通知（true/false），默认不推送

不同环境变量对应不同链接类型注意区分，环境变量所对应活动类型的排列顺序与链接的排列顺序一致，如果有多个活动ID用英文逗号分割即可实现多活动签到

cron: 7 7 7 7 * jd_wxSign.js

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺签到（超级无线/超级会员）')
var version_ = "jsjiami.com.v7";
const IIlI1I = require("./jdCookie"),
  llIIIi = require("./function/jdCommon"),
  IiIiIl = require("./function/sendJDNotify"),
  I1Ilil = require("./function/krgetToken"),
  {
    wuxian_savePrize: l1I1I1
  } = require("./function/krsavePrize"),
  I1Ilii = require("crypto-js"),
  l1Iii = process.env.jd_wxSign_lzkjInterval || "",
  l1Iil = process.env.jd_wxSign_cjhyInterval || "",
  III1Ii = process.env.jd_wxSign_Notify === "true";
let III1Il = (process.env.jd_wxSign_sevenDay_lzkj_Ids || process.env.LZKJ_SEVENDAY || "").split(","),
  iIIliI = (process.env.jd_wxSign_sign_lzkj_Ids || process.env.LZKJ_SIGN || "").split(","),
  IiIil = (process.env.jd_wxSign_sevenDay_cjhy_Ids || process.env.CJHY_SEVENDAY || "").split(","),
  IiIii = (process.env.jd_wxSign_sign_cjhy_Ids || process.env.CJHY_SIGN || "").split(","),
  iill1l = (process.env.jd_wxSign_lzkjFilter || "").split("@"),
  IiIiII = (process.env.jd_wxSign_cjhyFilter || "").split("@"),
  iill1i = "",
  l1Il1 = {};
const iill11 = Object.keys(IIlI1I).map(lIIi1i => IIlI1I[lIIi1i]).filter(liI11I => liI11I);
!iill11[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (III1Il.length > 0) {
    III1Il = [...new Set(III1Il.filter(IIII => IIII !== ""))];
  }
  if (iIIliI.length > 0) {
    iIIliI = [...new Set(iIIliI.filter(l1IIlI => l1IIlI !== ""))];
  }
  if (IiIil.length > 0) {
    IiIil = [...new Set(IiIil.filter(iil111 => iil111 !== ""))];
  }
  if (IiIii.length > 0) {
    IiIii = [...new Set(IiIii.filter(llIil1 => llIil1 !== ""))];
  }
  IiIiIl.config({
    title: $.name
  });
  for (let iiiIII = 0; iiiIII < iill11.length; iiiIII++) {
    if (iill11[iiiIII]) {
      $.index = iiiIII + 1;
      iill1i = iill11[iiiIII];
      originCookie = iill11[iiiIII];
      $.UserName = decodeURIComponent(llIIIi.getCookieValue(iill1i, "pt_pin"));
      $.UA = llIIIi.genUA($.UserName);
      $.UUID = llIIIi.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.message = IiIiIl.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.token = null;
      $.token = await I1Ilil(originCookie, "https://lzkj-isv.isvjd.com");
      if (!$.token) {
        console.log("获取[Token]失败！");
        $.message.fix("获取[Token]失败");
        continue;
      }
      if (iill1l.length > 0 && (iill1l.includes($.UserName) || iill1l.includes(encodeURIComponent($.UserName)))) {
        console.log("已设置跳过运行当前账号 - 超级无线");
      } else {
        $.secretPin = null;
        $.baseUrl = "https://lzkj-isv.isvjd.com";
        $.hostname = "lzkj-isv.isvjd.com";
        $.activityMode = "lzkj";
        $.origin = $.baseUrl;
        $.signIntervalTimes = 1000;
        if (l1Iii) {
          try {
            const IIIlii = parseInt(l1Iii) * 1000;
            $.signIntervalTimes = IIIlii;
          } catch {
            $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
          }
        }
        iIIliI.length >= 1 && (console.log("❖ 签到类型（lzkj signActivity2）"), await III1II(), await $.wait(2000), console.log(""));
        III1Il.length >= 1 && (console.log("❖ 签到类型（lzkj sevenDay）"), await I1IliI(), await $.wait(2000), console.log(""));
      }
      if (IiIiII.length > 0 && (IiIiII.includes($.UserName) || IiIiII.includes(encodeURIComponent($.UserName)))) {
        console.log("已设置跳过运行当前账号 - 超级会员");
      } else {
        $.secretPin = null;
        $.baseUrl = "https://cjhy-isv.isvjcloud.com";
        $.hostname = "cjhy-isv.isvjcloud.com";
        $.activityMode = "cjhy";
        $.origin = $.baseUrl;
        $.signIntervalTimes = 1000;
        if (l1Iil) {
          try {
            const llIilI = parseInt(l1Iil) * 1000;
            $.signIntervalTimes = llIilI;
          } catch {
            $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
          }
        }
        IiIii.length >= 1 && (console.log("❖ 签到类型（cjhy signActivity）"), await iIIlil(), await $.wait(2000), console.log(""));
        IiIil.length >= 1 && (console.log("❖ 签到类型（cjhy sevenDay）"), await l1I1II(), await $.wait(2000));
      }
    }
  }
  III1Ii && IiIiIl.getMessage() && (IiIiIl.updateContent(IiIiIl.content), await IiIiIl.push());
})().catch(IIIlil => {
  console.log("", "❌ " + $.name + ", 失败! 原因: " + IIIlil + "!", "");
}).finally(() => {
  $.done();
});
async function I1IliI() {
  let Il11 = 0;
  I111l1: for (let iillIl = 0; iillIl < III1Il.length; iillIl++) {
    Il11 += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityId = III1Il[iillIl];
    $.activityUrl = $.baseUrl + "/sign/sevenDay/signActivity?activityId=" + $.activityId;
    console.log("");
    if (iillIl === 0) {
      await Illi1();
      await $.wait(500);
      if (!$.secretPin) {
        $.venderId = null;
        await IiIiI1("customer/getSimpleActInfoVo", "activityId=" + $.activityId);
        await $.wait(500);
        await IiIiI();
        await $.wait(500);
      }
    }
    Il11 >= 10 && (await Illi1(), await $.wait(500), Il11 = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      $.signErrorMsg = "";
      for (let lIiII = 1; lIiII <= 20; lIiII++) {
        await IiIiI1("sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break I111l1;
        }
        iillIl !== III1Il.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) {
          break;
        }
        if ($.signStop || lIiII === 20) {
          console.log("结果 -> " + ($.signErrorMsg || "未知"));
          break;
        }
      }
    } else {
      console.log("没有成功获取到用户信息");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
  }
}
async function III1II() {
  let liIlIi = 0;
  iIliII: for (let I1liil = 0; I1liil < iIIliI.length; I1liil++) {
    liIlIi += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityId = iIIliI[I1liil];
    $.activityUrl = $.baseUrl + "/sign/signActivity2?activityId=" + $.activityId;
    console.log("");
    I1liil === 0 && (await Illi1(), await $.wait(500), !$.secretPin && ($.venderId = null, await IiIiI1("customer/getSimpleActInfoVo", "activityId=" + $.activityId), await $.wait(500), await IiIiI(), await $.wait(500)));
    liIlIi >= 10 && (await Illi1(), await $.wait(500), liIlIi = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let liiiIl = 1; liiiIl <= 20; liiiIl++) {
        await IiIiI1("sign/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break iIliII;
        }
        I1liil !== iIIliI.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) {
          break;
        }
        if ($.signStop || liiiIl === 20) {
          console.log("结果 -> " + ($.signErrorMsg || "未知"));
          break;
        }
      }
    } else {
      console.log("没有成功获取到用户信息");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
  }
}
async function l1I1II() {
  let iIl1i = 0;
  iIii1I: for (let I1lii1 = 0; I1lii1 < IiIil.length; I1lii1++) {
    iIl1i += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityId = IiIil[I1lii1];
    $.activityUrl = $.baseUrl + "/sign/sevenDay/signActivity?activityId=" + $.activityId;
    console.log("");
    I1lii1 === 0 && (await Illi1(), await $.wait(500), !$.secretPin && ($.venderId = null, await IiIiI1("customer/getSimpleActInfoVo", "activityId=" + $.activityId), await $.wait(500)));
    $.initError = false;
    await iill1I();
    if ($.initError && $.token) {
      $.initError = false;
      $.token = await I1Ilil(originCookie, "https://cjhy-isv.isvjcloud.com");
      if (!$.token) {
        console.log("获取[Token]失败！");
        $.message.insert("获取[Token]失败");
        break;
      }
      await iill1I();
      if ($.initError) {
        console.log("初始化失败，请检查Token是否过期");
        break;
      }
    }
    await $.wait($.signIntervalTimes);
    iIl1i >= 10 && (await Illi1(), await $.wait(500), iIl1i = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let liiiI1 = 1; liiiI1 <= 20; liiiI1++) {
        await IiIiI1("sign/sevenDay/wx/signUp", $.activityMode === "cjhy" ? JSON.stringify({
          ecyText: l1iiIl({
            actId: $.activityId,
            pin: encodeURIComponent($.secretPin)
          }, $.pinToken, $.te)
        }) : "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)));
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break iIii1I;
        }
        I1lii1 !== IiIil.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) {
          break;
        }
        if ($.signStop || liiiI1 === 20) {
          console.log("结果 -> " + ($.signErrorMsg || "未知"));
          break;
        }
      }
    } else {
      console.log("没有成功获取到用户信息");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
  }
}
async function iIIlil() {
  let liIIil = 0;
  I1liI1: for (let iIIII = 0; iIIII < IiIii.length; iIIII++) {
    liIIil += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityId = IiIii[iIIII];
    $.activityUrl = $.baseUrl + "/sign/signActivity?activityId=" + $.activityId;
    console.log("");
    iIIII === 0 && (await Illi1(), await $.wait(500), !$.secretPin && ($.venderId = null, await IiIiI1("customer/getSimpleActInfoVo", "activityId=" + $.activityId), await $.wait(500)));
    $.initError = false;
    await iill1I();
    if ($.initError && $.token) {
      $.initError = false;
      $.token = await I1Ilil(originCookie, "https://cjhy-isv.isvjcloud.com");
      if (!$.token) {
        console.log("获取[Token]失败！");
        $.message.insert("获取[Token]失败");
        break;
      }
      await iill1I();
      if ($.initError) {
        console.log("初始化失败，请检查Token是否过期");
        break;
      }
    }
    await $.wait($.signIntervalTimes);
    liIIil >= 10 && (await Illi1(), await $.wait(500), liIIil = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let Iii1il = 1; Iii1il <= 20; Iii1il++) {
        await IiIiI1("sign/wx/signUp", $.activityMode === "cjhy" ? JSON.stringify({
          ecyText: l1iiIl({
            actId: $.activityId,
            pin: encodeURIComponent($.secretPin)
          }, $.pinToken, $.te)
        }) : "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)));
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break I1liI1;
        }
        iIIII !== IiIii.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) {
          break;
        }
        if ($.signStop || Iii1il === 20) {
          console.log("结果 -> " + ($.signErrorMsg || "未知"));
          break;
        }
      }
    } else {
      console.log("没有成功获取到用户信息");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
  }
}
async function IiIiI1(l1IIiI, IlilIi) {
  return new Promise(li11ii => {
    const iIIIlI = {
      url: $.baseUrl + "/" + l1IIiI,
      headers: {
        Host: $.hostname,
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": ["sign/sevenDay/wx/signUp", "sign/wx/signUp"].includes(l1IIiI) && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
        Origin: $.origin,
        "User-Agent": $.UA,
        Connection: "keep-alive",
        Referer: $.activityUrl,
        Cookie: iill1i
      },
      body: IlilIi
    };
    $.post(iIIIlI, async (li11i1, II1l1, liii1i) => {
      try {
        if (li11i1) {
          switch (l1IIiI) {
            case "sign/sevenDay/wx/signUp":
            case "sign/wx/signUp":
              $.signErrorTimes += 1;
              break;
          }
          if (typeof li11i1 === "string" && li11i1.includes("Timeout awaiting 'request'")) {
            console.log(l1IIiI + " 请求超时，请检查网络重试");
          } else {
            const IIlIIl = II1l1?.["statusCode"];
            if (IIlIIl) {
              if ([403, 493].includes(IIlIIl)) {
                console.log(l1IIiI + " 请求失败，IP被限制（Response code " + IIlIIl + "）");
              } else {
                if ([400, 404].includes(IIlIIl)) {
                  console.log(l1IIiI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + IIlIIl + "）");
                } else {
                  console.log(l1IIiI + " 请求失败（Response code " + IIlIIl + "）");
                }
              }
            } else {
              console.log(l1IIiI + " API请求失败 => " + (li11i1.message || li11i1));
            }
          }
        } else {
          if (liii1i) {
            liii1i = JSON.parse(liii1i);
            if (II1l1.headers["set-cookie"]) {
              iill1i = "";
              for (let li11il of II1l1.headers["set-cookie"]) {
                l1Il1[li11il.split(";")[0].substr(0, li11il.split(";")[0].indexOf("="))] = li11il.split(";")[0].substr(li11il.split(";")[0].indexOf("=") + 1);
              }
              for (const Ii1lIl of Object.keys(l1Il1)) {
                iill1i += Ii1lIl + "=" + l1Il1[Ii1lIl] + ";";
              }
            }
            if (liii1i) {
              switch (l1IIiI) {
                case "customer/getSimpleActInfoVo":
                  $.venderId = liii1i.data.venderId;
                  $.activityType = liii1i.data.activityType;
                  break;
                case "sign/sevenDay/wx/signUp":
                  $.signErrorTimes = 0;
                  liii1i.isOk ? ($.signOk = true, await iIIlii(liii1i)) : ($.signErrorMsg = liii1i.msg, !["火爆", "擦肩", "缓存", "数据忙"].some(I1IIi1 => $.signErrorMsg.includes(I1IIi1)) && ($.signStop = true));
                  break;
                case "sign/wx/signUp":
                  $.signErrorTimes = 0;
                  liii1i.isOk ? ($.signOk = true, await llIII1(liii1i)) : ($.signErrorMsg = liii1i.msg, !["火爆", "擦肩", "缓存", "数据忙"].some(lIiIii => $.signErrorMsg.includes(lIiIii)) && ($.signStop = true));
                  break;
                default:
                  console.log(JSON.stringify(liii1i));
                  break;
              }
            }
          }
        }
      } catch (Il1I11) {
        if (l1IIiI != "customer/getSimpleActInfoVo") {
          console.log(l1IIiI + " -> " + Il1I11);
        }
      } finally {
        li11ii();
      }
    });
  });
}
async function iIIlii(Ii1Ill) {
  if (Ii1Ill.signResult.gift) {
    const ll1Il1 = Ii1Ill.signResult.gift,
      li11li = ll1Il1.insufficient;
    process.stdout.write("结果 -> ");
    if (!li11li) {
      switch (parseInt(ll1Il1.giftType)) {
        case 6:
          console.log("🎉 " + ll1Il1.giftName + " 🐶");
          $.message.insert(ll1Il1.giftName + "🐶");
          break;
        case 7:
          const iliiii = Ii1Ill.addressId;
          let IIlIIi = ll1Il1.giftName;
          console.log("🎉 恭喜获得实物~");
          console.log("奖品名称：" + IIlIIi);
          console.log("参考价值：" + Ii1Ill.signResult.gift.priceInfo + "（元）");
          console.log("预览图片：" + Ii1Ill.signResult.gift.showImage);
          const iliiil = {
              baseUrl: $.baseUrl,
              cookie: iill1i,
              ua: $.UA,
              activityId: $.activityId,
              activityType: $.activityType,
              venderId: $.venderId,
              secretPin: $.secretPin,
              prizeName: IIlIIi,
              generateId: iliiii
            },
            li11ll = l1I1I1(iliiil) || false;
          !III1Ii && li11ll && (await IiIiIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + IIlIIi + "，已成功自动登记收货地址\n\n" + $.activityUrl));
          $.message.insert(IIlIIi + "(" + (li11ll ? "已填地址" : "未填地址") + ")🎁");
          break;
        case 8:
          console.log("🗑️ 专享价");
          $.message.insert("专享价🗑️");
          break;
        case 9:
          console.log("🗑️ " + ll1Il1.giftName + " 🎟️");
          $.message.insert(ll1Il1.giftName + "🎟️");
          break;
        case 13:
        case 14:
        case 15:
          console.log("🎉 恭喜获得" + ll1Il1.giftName + " 🎁");
          $.message.insert(ll1Il1.giftName + "🎁");
          !III1Ii && (await IiIiIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + ll1Il1.giftName + "\n\n" + $.activityUrl));
          break;
        case 16:
          console.log("🎉 " + ll1Il1.priceInfo + " 🧧");
          $.message.insert(ll1Il1.priceInfo + "红包🧧");
          break;
        default:
          ll1Il1.giftName.includes("券") ? (console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️")) : (console.log("获得：" + ll1Il1.giftName), $.message.insert("" + ll1Il1.giftName));
          break;
      }
    } else {
      ll1Il1?.["giftName"] ? console.log("未中奖（原奖品 \"" + ll1Il1.giftName + "\" 已发完）") : console.log("未中奖（奖品已发完）");
    }
  } else {
    console.log("结果 -> 签到成功");
  }
}
async function llIII1(Il1I1i) {
  if (Il1I1i.gift) {
    const lIllil = Il1I1i.gift,
      iilIi1 = lIllil.insufficient;
    process.stdout.write("结果 -> ");
    if (!iilIi1) {
      switch (parseInt(lIllil.giftType)) {
        case 6:
          console.log("🎉 " + lIllil.giftName + " 🐶");
          $.message.insert(lIllil.giftName + "🐶");
          break;
        case 7:
          const I111 = Il1I1i.addressId;
          let I1I11l = lIllil.giftName;
          console.log("🎉 恭喜获得实物~");
          console.log("奖品名称：" + I1I11l);
          console.log("参考价值：" + Il1I1i.gift.priceInfo + "（元）");
          console.log("预览图片：" + Il1I1i.gift.showImage);
          const I1I11i = {
              baseUrl: $.baseUrl,
              cookie: iill1i,
              ua: $.UA,
              activityId: $.activityId,
              activityType: $.activityType,
              venderId: $.venderId,
              secretPin: $.secretPin,
              prizeName: I1I11l,
              generateId: I111
            },
            l1iI1l = l1I1I1(I1I11i) || false;
          !III1Ii && l1iI1l && (await IiIiIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + I1I11l + "，已成功自动登记收货地址\n\n" + $.activityUrl));
          $.message.insert(I1I11l + "(" + (l1iI1l ? "已填地址" : "未填地址") + ")🎁");
          break;
        case 8:
          console.log("🗑️ 专享价");
          $.message.insert("专享价🗑️");
          break;
        case 9:
          console.log("🗑️ " + lIllil.giftName + " 🎟️");
          $.message.insert(lIllil.giftName + "🎟️");
          break;
        case 13:
        case 14:
        case 15:
          console.log("🎉 恭喜获得" + lIllil.giftName + " 🎁");
          $.message.insert(lIllil.giftName + "🎁");
          !III1Ii && (await IiIiIl.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lIllil.giftName + "\n\n" + $.activityUrl));
          break;
        case 16:
          console.log("🎉 " + lIllil.priceInfo + " 🧧");
          $.message.insert(lIllil.priceInfo + "红包🧧");
          break;
        default:
          lIllil.giftName.includes("券") ? (console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️")) : (console.log("获得：" + lIllil.giftName), $.message.insert("" + lIllil.giftName));
          break;
      }
    } else {
      if (lIllil?.["giftName"]) {
        console.log("未中奖（原奖品 \"" + lIllil.giftName + "\" 已发完）");
      } else {
        console.log("未中奖（奖品已发完）");
      }
    }
  } else {
    console.log("结果 -> 签到成功");
  }
}
async function IiIiI() {
  let i1lIi = {
    url: $.baseUrl + "/customer/getMyPing",
    headers: {
      Host: $.hostname,
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: $.origin,
      "User-Agent": $.UA,
      Connection: "keep-alive",
      Referer: $.activityUrl,
      Cookie: iill1i
    },
    body: "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP"
  };
  return new Promise(III1lI => {
    $.post(i1lIi, (I11i, ll1IlI, I11l) => {
      try {
        if (I11i) {
          console.log(I11i);
        } else {
          if (ll1IlI.headers["set-cookie"]) {
            iill1i = "";
            for (let lIllli of ll1IlI.headers["set-cookie"]) {
              l1Il1[lIllli.split(";")[0].substr(0, lIllli.split(";")[0].indexOf("="))] = lIllli.split(";")[0].substr(lIllli.split(";")[0].indexOf("=") + 1);
            }
            for (const lIllll of Object.keys(l1Il1)) {
              iill1i += lIllll + "=" + l1Il1[lIllll] + ";";
            }
          }
          I11l ? (I11l = JSON.parse(I11l), I11l.result ? $.secretPin = I11l.data?.["secretPin"] : console.log(I11l.errorMessage)) : console.log("京东返回了空数据");
        }
      } catch (i1IiIl) {
        console.log(i1IiIl);
      } finally {
        III1lI();
      }
    });
  });
}
async function iill1I() {
  let iilIii = {
    url: $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now(),
    headers: {
      Host: $.hostname,
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      Origin: $.origin,
      "User-Agent": $.UA,
      Connection: "keep-alive",
      Referer: $.activityUrl,
      Cookie: iill1i
    }
  };
  return new Promise(l1ll1l => {
    $.get(iilIii, (lIlli1, llIii1, I1IlII) => {
      try {
        if (lIlli1) {
          console.log(lIlli1);
        } else {
          if (llIii1.headers["set-cookie"]) {
            iill1i = "";
            for (let IiIII of llIii1.headers["set-cookie"]) {
              l1Il1[IiIII.split(";")[0].substr(0, IiIII.split(";")[0].indexOf("="))] = IiIII.split(";")[0].substr(IiIII.split(";")[0].indexOf("=") + 1);
            }
            for (const lIiIll of Object.keys(l1Il1)) {
              iill1i += lIiIll + "=" + l1Il1[lIiIll] + ";";
            }
          }
          $.pinToken = llIIIi.getCookieValue(iill1i, "pToken");
          $.te = llIIIi.getCookieValue(iill1i, "te");
          if (I1IlII) {
            I1IlII = JSON.parse(I1IlII);
            if (I1IlII.result) {
              $.secretPin = I1IlII.data?.["secretPin"];
            } else {
              if (I1IlII.errorMessage) {
                console.log(I1IlII.errorMessage);
                $.initError = true;
              } else {
                $.initError = true;
              }
            }
          } else {
            console.log("京东返回了空数据");
          }
        }
      } catch (l1IIl) {
        console.log(l1IIl);
      } finally {
        l1ll1l();
      }
    });
  });
}
function Illi1() {
  return new Promise(lIllii => {
    $.get({
      url: $.activityUrl,
      headers: {
        "user-agent": $.UA
      }
    }, (iiiIi1, illl1l, Il11I) => {
      try {
        if (iiiIi1) {
          console.log(iiiIi1);
        } else {
          if (illl1l.headers["set-cookie"]) {
            iill1i = "";
            for (let li1lli of illl1l.headers["set-cookie"]) {
              l1Il1[li1lli.split(";")[0].substr(0, li1lli.split(";")[0].indexOf("="))] = li1lli.split(";")[0].substr(li1lli.split(";")[0].indexOf("=") + 1);
            }
            for (const I1i1I of Object.keys(l1Il1)) {
              iill1i += I1i1I + "=" + l1Il1[I1i1I] + ";";
            }
          }
        }
      } catch (l1ili) {
        console.log(l1ili);
      } finally {
        lIllii();
      }
    });
  });
}
function l1iiIl(l1iill, l1ill, lIi1I1) {
  function illIIi(Il1ili) {
    Il1ili = Il1ili.split("").reverse().join("");
    const iii111 = new Uint8Array(12),
      liiI = new TextEncoder().encode(Il1ili);
    for (let iliill = 0; iliill < liiI.length; iliill += 2) {
      let Ililll = liiI[iliill] << 5 | liiI[iliill + 1] & 255;
      Ililll %= 63;
      iii111[iliill >> 1] = Ililll;
    }
    let liIII1 = "";
    for (let I1liII = 0; I1liII < iii111.length; I1liII++) {
      liIII1 += (iii111[I1liII] + 256).toString(2).slice(1);
    }
    let I111il = "",
      l1Ili1 = "";
    for (let Ililli = 0; Ililli < 16; Ililli++) {
      if (Ililli !== 0) {
        const iIii1l = Ililli * 6,
          iIliIi = liIII1.substring(iIii1l, iIii1l + 6);
        let IIil1l = parseInt(iIliIi, 2);
        const i1i1l1 = l1Ili1.split("");
        for (let iIii1i = 0; iIii1i < i1i1l1.length; iIii1i++) {
          i1i1l1[iIii1i] === "1" && (IIil1l = (IIil1l >> 6 - iIii1i | IIil1l << iIii1i) & 63);
        }
        l1Ili1 = (IIil1l & 63).toString(2).padStart(6, "0");
      } else {
        l1Ili1 = liIII1.substring(0, 6);
      }
      I111il += l1Ili1;
    }
    for (let IIil1i = 0; IIil1i < 12; IIil1i++) {
      const IlIl1 = IIil1i * 8;
      iii111[IIil1i] = parseInt(I111il.substring(IlIl1, IlIl1 + 8), 2);
    }
    const iliili = btoa(String.fromCharCode.apply(null, iii111));
    return iliili;
  }
  const iiIi = ["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"];
  let iiIl = Date.now() + parseInt(lIi1I1);
  typeof l1iill != "object" && (l1iill = JSON.parse(l1iill));
  l1iill.nowTime = iiIl;
  let Iil1I = l1ill + iiIl;
  const illIIl = Iil1I.substring(0, Iil1I.length - 5);
  let iiiIlI = "";
  for (let iIii11 = 0; iIii11 < illIIl.length; iIii11++) {
    let IIllIi = illIIl.charCodeAt(iIii11),
      i11l1l = IIllIi % 10,
      IIllIl = iiIi[i11l1l][iIii11];
    iiiIlI += IIllIl;
  }
  var I1i11 = iiiIlI.length,
    Ill1ii = Math.floor(I1i11 / 24),
    IllII = "";
  for (var Ill1il = 0; Ill1il < 24; Ill1il++) {
    var IIlI = (Ill1il + 1) * Ill1ii;
    if (Ill1il === 23) {
      IIlI = I1i11;
    }
    var I1i1l = iiiIlI.substring(Ill1il * Ill1ii, IIlI),
      llIiIi = [];
    for (var IIil = 0; IIil < I1i1l.length; IIil++) {
      llIiIi.push(I1i1l.charCodeAt(IIil));
    }
    var IIii = llIiIi.reduce(function (iI11l1, IlIii) {
        return iI11l1 + IlIii;
      }, 0),
      i1Ii1I = Math.floor(IIii / llIiIi.length);
    IllII += String.fromCharCode(i1Ii1I);
  }
  iiiIlI = IllII;
  const llIiIl = illIIi(iiiIlI),
    I1i1i = I1Ilii.enc.Utf8.parse(llIiIl),
    lIi1II = I1Ilii.enc.Utf8.parse(""),
    iiiIii = I1Ilii.AES.encrypt(JSON.stringify(l1iill), I1i1i, {
      iv: lIi1II,
      mode: I1Ilii.mode.ECB,
      padding: I1Ilii.pad.Pkcs7
    });
  return iiiIii.toString();
}
var version_ = "jsjiami.com.v7";

