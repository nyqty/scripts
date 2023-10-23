/*
活动名称：每日抢好礼 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/activity/daily/wx/indexPage?activityId=<活动id>
        https://cjhy-isv.isvjcloud.com/activity/daily/wx/indexPage?activityId=<活动id>
环境变量：jd_daily_activityUrl // 活动链接
        jd_daily_joinMember // 是否开卡，默认不开卡
        jd_daily_notify // 是否推送通知，默认不推送
		jd_daily_blacklist 黑名单 用&隔开 pin值
		JD_LZ_OPEN // 是否开启LZ活动运行，默认运行
		JD_CJ_OPEN // 是否开启CJ活动运行，默认运行
		jd_daily_break // 493后继续执行，默认退出运行（true/false）
		
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#每日抢好礼通用活动
1 1 1 1 * jd_daily.js, tag=每日抢好礼通用活动, enabled=true		

*/

const Env=require('./utils/Env.js');
const $ = new Env('每日抢好礼（超级无线/超级会员）')
const l1l111Ii = $.isNode() ? require("./jdCookie") : "",
  Ii11IIII = require("./function/jdCommon"),
  IIlli1I1 = require("./function/sendJDNotify"),
  lIiIilli = require("./function/krgetToken"),
  {
    wuxian_savePrize: li11IIII
  } = require("./function/krsavePrize"),
  iiil1Il1 = require("crypto-js");
let lllili1i = [];
const IlIIIi1l = process.env.jd_daily_activityUrl || "",
  lIi1iIiI = process.env.jd_daily_joinMember === "true",
  ii1Ili = process.env.jd_daily_notify === "true";
let iiI1llll = "",
  llIIIIl = "",
  liiII1Il = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(l1l111Ii).forEach(iliIl11i => {
    lllili1i.push(l1l111Ii[iliIl11i]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lllili1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(llli1lii => llli1lii.cookie)].filter(IIll11iI => !!IIll11iI);
!lllili1i[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
const Iil1ii11 = process.env.jd_daily_break === "true";
let IIi1I1I = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  II1IlIll = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  I1illill = "",
  lIIii11 = "";
$.whitelist = process.env.jd_daily_whitelist || I1illill;
$.blacklist = process.env.jd_daily_blacklist || lIIii11;
III1I1II();
IiI1ill1();
!(async () => {
  if (!IlIIIi1l) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const IlIlil1l = Ii11IIII.parseUrl(IlIIIi1l);
  if (!IlIlil1l) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = IlIIIi1l;
  $.activityId = Ii11IIII.getUrlParameter(IlIIIi1l, "activityId");
  $.hostname = IlIlil1l?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) {
      if (II1IlIll === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
        return;
      } else $.activityMode = "cjhy";
    } else {
      if ($.hostname.includes("lzkj")) {
        if (IIi1I1I === "false") {
          console.log("\n❌  已设置全局关闭LZ相关活动\n");
          return;
        } else $.activityMode = "lzkj", $.hostname = "lzkj-isv.isvjd.com";
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityMode || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  IIlli1I1.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let iii1Ili1 = 0; iii1Ili1 < lllili1i.length; iii1Ili1++) {
    $.index = iii1Ili1 + 1;
    iiI1llll = lllili1i[iii1Ili1];
    liiII1Il = lllili1i[iii1Ili1];
    Ii11IIII.setCookie(iiI1llll);
    $.UserName = decodeURIComponent(Ii11IIII.getCookieValue(iiI1llll, "pt_pin"));
    $.UA = Ii11IIII.genUA($.UserName);
    $.UUID = Ii11IIII.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = IIlli1I1.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await iIIIiIII();
    Ii11IIII.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  ii1Ili && IIlli1I1.getMessage() && (IIlli1I1.updateContent(IIlli1I1.content + ("\n【活动地址】" + $.activityUrl)), await IIlli1I1.push());
})().catch(i1IilIli => $.logErr(i1IilIli)).finally(() => $.done());
async function iIIIiIII() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.needJoinMember = false;
    $.secretPin = "";
    $.pinToken = "";
    $.LZ_AES_PIN = "";
    llIIIIl = "";
    if ($.skipRun || $.runEnd || $.outFlag) return;
    await ii1iIi1($.activityUrl);
    await $.wait(500);
    if ($.skipRun) {
      console.log("获取 LZ_TOKEN 失败！");
      $.message.fix("获取[LZ_TOKEN]失败");
      return;
    }
    if ($.outFlag || $.runEnd) return;
    if (!$.venderId) {
      await lIi1llI("getSimpleActInfoVo");
      if (!$.venderId) {
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        $.message.fix("未能获取店铺信息");
        $.runEnd = true;
        return;
      }
    }
    $.token = await lIiIilli(liiII1Il, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    if ($.activityMode === "cjhy") {
      await lIi1llI("initPinToken");
      if ($.runEnd || $.skipRun || $.outFlag) return;
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
    } else {
      await lIi1llI("getMyPing");
      if ($.runEnd || $.skipRun || $.outFlag) return;
      if (!$.secretPin) {
        console.log("未能获取用户鉴权信息！");
        $.message.fix("未能获取用户鉴权信息");
        return;
      }
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    switch ($.activityMode) {
      case "lzkj":
        $.formatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.formatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    switch ($.activityMode) {
      case "lzkj":
        await lIi1llI("accessLogWithAD");
        break;
      case "cjhy":
        await lIi1llI("accessLog");
        break;
    }
    if (lIi1iIiI) {
      switch ($.activityMode) {
        case "lzkj":
          await lIi1llI("getActMemberInfo");
          break;
        case "cjhy":
          await lIi1llI("getOpenCardInfo");
          break;
      }
      if ($.outFlag || $.skipRun) return;
      if (!$.isMember) {
        const Ill1ilII = await Ii11IIII.joinShopMember($.venderId);
        Ill1ilII && (console.log("加入店铺会员成功"), $.isMember = true);
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    for (let i1lliiIl = 0; i1lliiIl < 100; i1lliiIl++) {
      await lIi1llI("grabGift");
      if ($.outFlag || $.runEnd) return;
      if ($.getPrize || $.grabStop) break;
      $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
    }
  } catch (IllIl1I) {
    console.log("❌ 脚本运行遇到了错误\n" + IllIl1I);
  }
}
async function l1lII1l(I1l1I11I, lIIli1) {
  try {
    switch (I1l1I11I) {
      case "getMyPing":
        if (lIIli1.result === true && lIIli1.data) $.secretPin = lIIli1.data?.["secretPin"], $.nickname = lIIli1.data?.["nickname"];else lIIli1.errorMessage ? (console.log(I1l1I11I + " " + lIIli1.errorMessage), $.message.fix(lIIli1.errorMessage)) : console.log("❓" + I1l1I11I + " " + JSON.stringify(lIIli1));
        break;
      case "initPinToken":
        if (lIIli1.result === true && lIIli1.data) {
          $.secretPin = lIIli1.data?.["secretPin"];
          $.nickname = lIIli1.data?.["nickname"];
        } else lIIli1.errorMessage ? (console.log(I1l1I11I + " " + lIIli1.errorMessage), $.message.fix(lIIli1.errorMessage)) : console.log("❓" + I1l1I11I + " " + JSON.stringify(lIIli1));
        break;
      case "getSimpleActInfoVo":
        if (lIIli1.result === true && lIIli1.data) $.venderId = lIIli1.data?.["venderId"], $.shopId = lIIli1.data?.["shopId"], $.activityType = lIIli1.data?.["activityType"];else lIIli1.errorMessage ? console.log(I1l1I11I + " " + lIIli1.errorMessage) : console.log("❓" + I1l1I11I + " " + JSON.stringify(lIIli1));
        break;
      case "getActMemberInfo":
      case "getOpenCardInfo":
        if (lIIli1.result === true) {
          if (lIIli1.data) {
            if (lIIli1.data.hasOwnProperty("openCard")) $.isMember = lIIli1.data.openCard;else lIIli1.data.hasOwnProperty("openedCard") && ($.isMember = lIIli1.data.openedCard);
            if (typeof $.isMember === "number") $.isMember = $.isMember === 1;else typeof $.isMember === "undefined" && ($.isMember = false);
          } else $.isMember = true;
        } else {
          if (lIIli1.errorMessage) {
            if (lIIli1.errorMessage.includes("擦肩") && !lIIli1?.["data"]) {} else console.log(I1l1I11I + " " + lIIli1.errorMessage);
          } else $.isMember = false;
        }
        break;
      case "grabGift":
        if (lIIli1.isOk && lIIli1.isOk === true) {
          if (lIIli1?.["gift"]) {
            $.getPrize = true;
            let Illill1i = lIIli1.gift.gift;
            switch (parseInt(Illill1i.giftType)) {
              case 6:
                console.log("🎉 " + Illill1i.giftName + " 🐶"), $.message.insert(Illill1i.giftName + "🐶");
                break;
              case 7:
                const lI1llil = lIIli1.addressId;
                prizeName = Illill1i.giftName, console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + prizeName), console.log("参考价值：" + Illill1i.priceInfo + "（元）");
                if (Illill1i.showImage) console.log("预览图片：" + Illill1i.showImage);
                const liiIlII1 = {
                    "baseUrl": $.baseUrl,
                    "cookie": llIIIIl,
                    "ua": $.UA,
                    "activityId": $.activityId,
                    "activityType": $.activityType,
                    "venderId": $.venderId,
                    "secretPin": $.secretPin,
                    "prizeName": prizeName,
                    "generateId": lI1llil
                  },
                  I1IIlI1i = await li11IIII(liiIlII1);
                !ii1Ili && I1IIlI1i && (await IIlli1I1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(prizeName + "(" + (I1IIlI1i ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 8:
                console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
                break;
              case 9:
                console.log("🗑️ " + Illill1i.giftName + " 🎟️"), $.message.insert(Illill1i.giftName + "🎟️");
                break;
              case 13:
              case 14:
              case 15:
                console.log("🎉 恭喜获得" + Illill1i.giftName + " 🎁"), $.message.insert(Illill1i.giftName + "🎁");
                !ii1Ili && (await IIlli1I1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + Illill1i.giftName + "\n\n" + $.activityUrl));
                break;
              case 16:
                console.log("🎉 " + Illill1i.priceInfo + " 🧧"), $.message.insert(Illill1i.priceInfo + "红包🧧");
                break;
              default:
                if (Illill1i.giftName.includes("券")) {
                  console.log("🗑️ 优惠券");
                  $.message.insert("优惠券🗑️");
                } else console.log("获得：" + Illill1i.giftName), $.message.insert("" + Illill1i.giftName);
                break;
            }
          } else console.log("💨 空气"), $.grabStop = true;
        } else {
          if (lIIli1.msg) {
            console.log(lIIli1.msg);
            for (let IIIiIili of ["来晚了", "抢光了", "发完", "领完", "非法操作", "奖品发送失败", "未开始", "发放完", "全部被领取", "不足", "已结束", "有效期", "上限", "开抢时间"]) {
              if (lIIli1.msg.includes(IIIiIili)) {
                $.grabStop = true;
                $.runEnd = true;
                break;
              }
            }
            for (let IIliliil of ["一次", "会员", "擦肩"]) {
              if (lIIli1.msg.includes(IIliliil)) {
                $.grabStop = true;
                break;
              }
            }
          } else console.log("❓" + I1l1I11I + " " + JSON.stringify(lIIli1));
        }
        break;
    }
  } catch (liil111l) {
    console.log("❌ 未能正确处理 " + I1l1I11I + " 请求响应 " + (liil111l.message || liil111l));
  }
}
async function lIi1llI(i1iiill1) {
  if ($.runEnd || $.outFlag) return;
  let lIlllliI = "",
    lIlI1I1I = "",
    i11il = "POST";
  switch (i1iiill1) {
    case "getMyPing":
      lIlllliI = $.baseUrl + "/customer/getMyPing", lIlI1I1I = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      lIlllliI = $.baseUrl + "/customer/getSimpleActInfoVo", lIlI1I1I = "activityId=" + $.activityId;
      break;
    case "initPinToken":
      i11il = "GET", lIlllliI = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now();
      break;
    case "accessLog":
      lIlllliI = $.baseUrl + "/common/accessLog", lIlI1I1I = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      lIlllliI = $.baseUrl + "/common/accessLogWithAD", lIlI1I1I = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
      break;
    case "getActMemberInfo":
      lIlllliI = $.baseUrl + "/wxCommonInfo/getActMemberInfo", lIlI1I1I = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
      break;
    case "getOpenCardInfo":
      lIlllliI = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", lIlI1I1I = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
      break;
    case "grabGift":
      lIlllliI = $.baseUrl + "/activity/daily/wx/grabGift";
      $.activityMode === "cjhy" ? lIlI1I1I = JSON.stringify({
        "ecyText": I1iIiiII({
          "actId": $.activityId,
          "pin": encodeURIComponent($.secretPin)
        }, $.pinToken, $.te)
      }) : lIlI1I1I = "actId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    default:
      console.log("❌ 未知请求 " + i1iiill1);
      return;
  }
  const IiIIIl1l = {
    "url": lIlllliI,
    "headers": {
      "Origin": $.origin,
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": i1iiill1 === "grabGift" && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
      "Cookie": llIIIIl.trim(),
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      "Referer": $.activityUrl
    },
    "body": lIlI1I1I,
    "timeout": 30000
  };
  i11il === "GET" && (delete IiIIIl1l.body, delete IiIIIl1l.headers["Content-Type"]);
  const liiII1I = 5;
  let ilil1il1 = 0,
    lIlIllll = null,
    iIliili = false;
  while (ilil1il1 < liiII1I) {
    ilil1il1 > 0 && (await $.wait(1000));
    const {
      err: i1i1lIiI,
      res: i1l1I1Ii,
      data: Il1iiIiI
    } = await llIiIlll(IiIIIl1l, i11il);
    if (i1i1lIiI) {
      if (typeof i1i1lIiI === "string" && i1i1lIiI.includes("Timeout awaiting 'request'")) lIlIllll = i1iiill1 + " 请求超时，请检查网络重试";else {
        const IIl11ill = i1l1I1Ii?.["statusCode"];
        if (IIl11ill) {
          if ([403, 493].includes(IIl11ill)) lIlIllll = i1iiill1 + " 请求失败，IP被限制（Response code " + IIl11ill + "）", iIliili = true;else {
            if ([400, 404].includes(IIl11ill)) lIlIllll = i1iiill1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + IIl11ill + "）";else [500].includes(IIl11ill) && i1iiill1 === "grabGift" && $.activityMode === "cjhy" ? IiIIIl1l.body = JSON.stringify({
              "ecyText": I1iIiiII({
                "actId": $.activityId,
                "pin": encodeURIComponent($.secretPin)
              }, $.pinToken, $.te)
            }) : lIlIllll = i1iiill1 + " 请求失败（Response code " + IIl11ill + "）";
          }
        } else lIlIllll = i1iiill1 + " 请求失败 => " + (i1i1lIiI.message || i1i1lIiI);
      }
      ilil1il1++;
    } else {
      const ili11ll1 = Ii11IIII.getResponseCookie(i1l1I1Ii, llIIIIl),
        IllIi1Il = false;
      if (IllIi1Il) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + i1iiill1 + " 响应Body => " + (Il1iiIiI || "无") + "\n");
        console.log("🔧 " + i1iiill1 + " 响应Cookie => " + (ili11ll1 || "无") + "\n");
        console.log("🔧 " + i1iiill1 + " 请求参数");
        console.log(IiIIIl1l);
        console.log("\n---------------------------------------------------\n");
      }
      let II1iii11 = "";
      switch (i1iiill1) {
        case "getMyPing":
          II1iii11 = Ii11IIII.getCookieValue(ili11ll1, "LZ_AES_PIN");
          if (II1iii11) {
            $.LZ_AES_PIN = II1iii11;
          } else console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true;
          break;
        case "initPinToken":
          const Ii1li1li = Ii11IIII.getCookieValue(ili11ll1, "pToken");
          if (Ii1li1li) $.pinToken = Ii1li1li;else {
            console.log("获取 pinToken 失败！");
            $.message.fix("获取[pinToken]失败");
            $.skipRun = true;
            break;
          }
          II1iii11 = Ii11IIII.getCookieValue(ili11ll1, "LZ_AES_PIN");
          if (II1iii11) $.LZ_AES_PIN = II1iii11;else {
            console.log("获取 LZ_AES_PIN 失败！");
            $.message.fix("获取[LZ_AES_PIN]失败");
            $.skipRun = true;
            break;
          }
          const il11IIl1 = Ii11IIII.getCookieValue(ili11ll1, "te");
          il11IIl1 && ($.te = il11IIl1, llIIIIl += "te=" + $.te + "; ");
          break;
      }
      ["getMyPing", "followGoods", "start"].includes(i1iiill1) && (llIIIIl = ili11ll1);
      II1iii11 = Ii11IIII.getCookieValue(llIIIIl, "LZ_AES_PIN");
      !II1iii11 && $.LZ_AES_PIN && (llIIIIl += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const i1lI1i1I = Ii11IIII.getCookieValue(llIIIIl, "pToken");
      !i1lI1i1I && $.pinToken && (llIIIIl += "pToken=" + $.pinToken + "; ");
      const llIIilIl = Ii11IIII.getCookieValue(llIIIIl, "AUTH_C_USER");
      !llIIilIl && $.secretPin && (llIIIIl += "AUTH_C_USER=" + $.secretPin + "; ");
      const illIIlii = Ii11IIII.getCookieValue(llIIIIl, "te");
      !illIIlii && $.te && (llIIIIl += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD"].includes(i1iiill1)) {
        if (Il1iiIiI) {
          try {
            const llll1I1 = JSON.parse(Il1iiIiI);
            l1lII1l(i1iiill1, llll1I1);
            break;
          } catch (Ili11111) {
            lIlIllll = "❌ " + i1iiill1 + " 接口响应数据解析失败: " + Ili11111.message;
            console.log("🚫 " + i1iiill1 + " => " + String(Il1iiIiI));
            IllIi1Il && (console.log("\n---------------------------------------------------\n"), console.log(llIIIIl), console.log("\n---------------------------------------------------\n"));
            ilil1il1++;
          }
        } else {
          if (i1iiill1 === "grabGift" && $.activityMode === "cjhy") {
            IiIIIl1l.body = JSON.stringify({
              "ecyText": I1iIiiII({
                "actId": $.activityId,
                "pin": encodeURIComponent($.secretPin)
              }, $.pinToken, $.te)
            });
          }
          lIlIllll = "❌ " + i1iiill1 + " 接口无响应数据";
          ilil1il1++;
          iIliili = true;
        }
      } else break;
    }
  }
  ilil1il1 >= liiII1I && (console.log(lIlIllll), iIliili && !Iil1ii11 && ($.outFlag = true, $.message && $.message.fix(lIlIllll)));
}
async function llIiIlll(i1l1lIii, I1I1IlIl = "POST") {
  if (I1I1IlIl === "POST") return new Promise(async iIiiIlil => {
    $.post(i1l1lIii, (II1Iili1, il1llIil, ll1lili1) => {
      iIiiIlil({
        "err": II1Iili1,
        "res": il1llIil,
        "data": ll1lili1
      });
    });
  });else {
    if (I1I1IlIl === "GET") return new Promise(async lI1iil => {
      $.get(i1l1lIii, (lIiiiI, l1IiIII1, l1IIi1l) => {
        lI1iil({
          "err": lIiiiI,
          "res": l1IiIII1,
          "data": l1IIi1l
        });
      });
    });else {
      const iili1i1i = "不支持的请求方法";
      return {
        "err": iili1i1i,
        "res": null,
        "data": null
      };
    }
  }
}
function ii1iIi1(I1iIi1ll) {
  return $.skipRun = true, new Promise(i1lii1i1 => {
    let liI1lII1 = {
      "url": I1iIi1ll,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": I1iIi1ll,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(liI1lII1, async (lI1iIlI, i11iII1l, i1lilll1) => {
      try {
        lI1iIlI ? (i11iII1l && typeof i11iII1l.statusCode != "undefined" && i11iII1l.statusCode === 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), !Iil1ii11 && ($.outFlag = true)), console.log(String(lI1iIlI)), console.log("getFirstLZCK 请求失败，请检查网路重试")) : (i1lilll1.match(/(活动已经结束)/) && i1lilll1.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束或不存在")), i11iII1l.status === 200 && (llIIIIl = Ii11IIII.getResponseCookie(i11iII1l, llIIIIl), $.skipRun = false));
      } catch (l1Il1Ili) {
        $.logErr(l1Il1Ili, i11iII1l);
      } finally {
        i1lii1i1();
      }
    });
  });
}
function IiI1ill1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const I1i1i1lI = Array.from(new Set($.blacklist.split("&")));
  console.log(I1i1i1lI.join("&") + "\n");
  let i1l1lIli = I1i1i1lI,
    ii11i1li = [],
    I1lll1ii = false;
  for (let iiiil11 = 0; iiiil11 < lllili1i.length; iiiil11++) {
    let Ii1i111i = decodeURIComponent(lllili1i[iiiil11].match(/pt_pin=([^; ]+)(?=;?)/) && lllili1i[iiiil11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!Ii1i111i) break;
    let iilIl1li = false;
    for (let iIII11l of i1l1lIli) {
      if (iIII11l && iIII11l == Ii1i111i) {
        iilIl1li = true;
        break;
      }
    }
    !iilIl1li && (I1lll1ii = true, ii11i1li.splice(iiiil11, -1, lllili1i[iiiil11]));
  }
  if (I1lll1ii) lllili1i = ii11i1li;
}
function l1il1ilI(IIilill1, lllllI1i) {
  lllllI1i != 0 && IIilill1.unshift(IIilill1.splice(lllllI1i, 1)[0]);
}
function III1I1II() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(lllili1i, lllili1i));
    return;
  }
  console.log("当前已设置白名单：");
  const IlIil1I = Array.from(new Set($.whitelist.split("&")));
  console.log(IlIil1I.join("&") + "\n");
  let II1Il = [],
    iiiIl11l = IlIil1I;
  for (let I11l1Il in lllili1i) {
    let IiI1Iii = decodeURIComponent(lllili1i[I11l1Il].match(/pt_pin=([^; ]+)(?=;?)/) && lllili1i[I11l1Il].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    iiiIl11l.includes(IiI1Iii) && II1Il.push(lllili1i[I11l1Il]);
  }
  helpCookiesArr = II1Il;
  if (iiiIl11l.length > 1) for (let III1iI1I in iiiIl11l) {
    let ilili1l1 = iiiIl11l[iiiIl11l.length - 1 - III1iI1I];
    if (!ilili1l1) continue;
    for (let iiliii1 in helpCookiesArr) {
      let lIIlllII = decodeURIComponent(helpCookiesArr[iiliii1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[iiliii1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      ilili1l1 == lIIlllII && l1il1ilI(helpCookiesArr, iiliii1);
    }
  }
}
function I1iIiiII(iIiillll, IlliiIii, lli1ll11) {
  function iliIIlIl(I1Ii1I1i) {
    I1Ii1I1i = I1Ii1I1i.split("").reverse().join("");
    const Iillll11 = new Uint8Array(12),
      iIi1I11 = new TextEncoder().encode(I1Ii1I1i);
    for (let ilIIl1Il = 0; ilIIl1Il < iIi1I11.length; ilIIl1Il += 2) {
      let liI1Iii1 = iIi1I11[ilIIl1Il] << 5 | iIi1I11[ilIIl1Il + 1] & 255;
      liI1Iii1 %= 63;
      Iillll11[ilIIl1Il >> 1] = liI1Iii1;
    }
    let iI11IIIi = "";
    for (let l1iIliIl = 0; l1iIliIl < Iillll11.length; l1iIliIl++) {
      iI11IIIi += (Iillll11[l1iIliIl] + 256).toString(2).slice(1);
    }
    let I1lIliil = "",
      I11III11 = "";
    for (let Ii1iiilI = 0; Ii1iiilI < 16; Ii1iiilI++) {
      if (Ii1iiilI !== 0) {
        const iIll1ll1 = Ii1iiilI * 6,
          llI11i = iI11IIIi.substring(iIll1ll1, iIll1ll1 + 6);
        let II1iiI1l = parseInt(llI11i, 2);
        const i1ilIiiI = I11III11.split("");
        for (let iIilllii = 0; iIilllii < i1ilIiiI.length; iIilllii++) {
          if (i1ilIiiI[iIilllii] === "1") {
            II1iiI1l = (II1iiI1l >> 6 - iIilllii | II1iiI1l << iIilllii) & 63;
          }
        }
        I11III11 = (II1iiI1l & 63).toString(2).padStart(6, "0");
      } else I11III11 = iI11IIIi.substring(0, 6);
      I1lIliil += I11III11;
    }
    for (let ll11IIi = 0; ll11IIi < 12; ll11IIi++) {
      const II11liiI = ll11IIi * 8;
      Iillll11[ll11IIi] = parseInt(I1lIliil.substring(II11liiI, II11liiI + 8), 2);
    }
    const i1liIiI1 = btoa(String.fromCharCode.apply(null, Iillll11));
    return i1liIiI1;
  }
  const llliIiI = ["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"];
  let ii1lIliI = Date.now() + parseInt(lli1ll11);
  typeof iIiillll != "object" && (iIiillll = JSON.parse(iIiillll));
  iIiillll.nowTime = ii1lIliI;
  let iIillliI = IlliiIii + ii1lIliI;
  const lll1iII1 = iIillliI.substring(0, iIillliI.length - 5);
  let IlIIl1li = "";
  for (let l1il1I1I = 0; l1il1I1I < lll1iII1.length; l1il1I1I++) {
    let lI1lIiii = lll1iII1.charCodeAt(l1il1I1I),
      iI1liiil = lI1lIiii % 10,
      Iii1i1l = llliIiI[iI1liiil][l1il1I1I];
    IlIIl1li += Iii1i1l;
  }
  var li1iIill = IlIIl1li.length,
    Ii1I1iIl = Math.floor(li1iIill / 24),
    l1IIlIII = "";
  for (var iliilIIi = 0; iliilIIi < 24; iliilIIi++) {
    var i1I111I1 = (iliilIIi + 1) * Ii1I1iIl;
    iliilIIi === 23 && (i1I111I1 = li1iIill);
    var l1IlilI1 = IlIIl1li.substring(iliilIIi * Ii1I1iIl, i1I111I1),
      iI1il1l1 = [];
    for (var lIii1iI = 0; lIii1iI < l1IlilI1.length; lIii1iI++) {
      iI1il1l1.push(l1IlilI1.charCodeAt(lIii1iI));
    }
    var l11iII1 = iI1il1l1.reduce(function (IiI11liI, llllIIil) {
        return IiI11liI + llllIIil;
      }, 0),
      lIIll1l = Math.floor(l11iII1 / iI1il1l1.length);
    l1IIlIII += String.fromCharCode(lIIll1l);
  }
  IlIIl1li = l1IIlIII;
  const Iliiii1i = iliIIlIl(IlIIl1li),
    iIlIi1ii = iiil1Il1.enc.Utf8.parse(Iliiii1i),
    Il1iIiII = iiil1Il1.enc.Utf8.parse(""),
    l1ili1i1 = iiil1Il1.AES.encrypt(JSON.stringify(iIiillll), iIlIi1ii, {
      "iv": Il1iIiII,
      "mode": iiil1Il1.mode.ECB,
      "padding": iiil1Il1.pad.Pkcs7
    });
  return l1ili1i1.toString();
}