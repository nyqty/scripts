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

const IiiII1li = require("./jdCookie"),
  iI1liiil = require("./function/jdCommon"),
  I1lIIil1 = require("./function/sendJDNotify"),
  i1li11ll = require("./function/krgetToken"),
  {
    wuxian_savePrize: Il1lIIIi
  } = require("./function/krsavePrize"),
  ll1IIiIi = require("crypto-js"),
  I1Illii = process.env.jd_wxSign_lzkjInterval || "",
  I1Iiliii = process.env.jd_wxSign_cjhyInterval || "",
  IIiIliil = process.env.jd_wxSign_Notify === "true";
let iiI1ii1I = (process.env.jd_wxSign_sevenDay_lzkj_Ids || process.env.LZKJ_SEVENDAY || "").split(","),
  il1l1iII = (process.env.jd_wxSign_sign_lzkj_Ids || process.env.LZKJ_SIGN || "").split(","),
  Ii1IlII1 = (process.env.jd_wxSign_sevenDay_cjhy_Ids || process.env.CJHY_SEVENDAY || "").split(","),
  iliIlII1 = (process.env.jd_wxSign_sign_cjhy_Ids || process.env.CJHY_SIGN || "").split(","),
  illIiI1I = (process.env.jd_wxSign_lzkjFilter || "").split("@"),
  l1I11II1 = (process.env.jd_wxSign_cjhyFilter || "").split("@"),
  llli111 = "",
  IIliill1 = {};
const iliIlil1 = Object.keys(IiiII1li).map(i1Ii1IIl => IiiII1li[i1Ii1IIl]).filter(iiiIl1il => iiiIl1il);
!iliIlil1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (iiI1ii1I.length > 0) {
    iiI1ii1I = [...new Set(iiI1ii1I.filter(ilIiilii => ilIiilii !== ""))];
  }
  if (il1l1iII.length > 0) {
    il1l1iII = [...new Set(il1l1iII.filter(IiiIlIiI => IiiIlIiI !== ""))];
  }
  if (Ii1IlII1.length > 0) {
    Ii1IlII1 = [...new Set(Ii1IlII1.filter(Il1lI11i => Il1lI11i !== ""))];
  }
  if (iliIlII1.length > 0) {
    iliIlII1 = [...new Set(iliIlII1.filter(iiIllIl1 => iiIllIl1 !== ""))];
  }
  I1lIIil1.config({
    title: $.name
  });
  for (let liil1ill = 0; liil1ill < iliIlil1.length; liil1ill++) {
    if (iliIlil1[liil1ill]) {
      $.index = liil1ill + 1;
      llli111 = iliIlil1[liil1ill];
      originCookie = iliIlil1[liil1ill];
      $.UserName = decodeURIComponent(iI1liiil.getCookieValue(llli111, "pt_pin"));
      $.UA = iI1liiil.genUA($.UserName);
      $.UUID = iI1liiil.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.message = I1lIIil1.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.token = null;
      $.token = await i1li11ll(originCookie, "https://lzkj-isv.isvjd.com");
      if (!$.token) {
        console.log("获取[Token]失败！");
        $.message.fix("获取[Token]失败");
        continue;
      }
      if (!illIiI1I.includes($.UserName)) {
        $.secretPin = null;
        $.baseUrl = "https://lzkj-isv.isvjd.com";
        $.hostname = "lzkj-isv.isvjd.com";
        $.activityMode = "lzkj";
        $.origin = $.baseUrl;
        $.signIntervalTimes = 1000;
        if (I1Illii) {
          try {
            const iIi1II1i = parseInt(I1Illii) * 1000;
            $.signIntervalTimes = iIi1II1i;
          } catch {
            $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
          }
        }
        il1l1iII.length >= 1 && (console.log("❖ 签到类型（lzkj signActivity2）"), await li1iIi(), await $.wait(2000), console.log(""));
        iiI1ii1I.length >= 1 && (console.log("❖ 签到类型（lzkj sevenDay）"), await Iil1i1il(), await $.wait(2000), console.log(""));
      } else {
        console.log("已设置此账号跳过运行 - 超级无线");
      }
      if (!l1I11II1.includes($.UserName)) {
        $.secretPin = null;
        $.baseUrl = "https://cjhy-isv.isvjcloud.com";
        $.hostname = "cjhy-isv.isvjcloud.com";
        $.activityMode = "cjhy";
        $.origin = $.baseUrl;
        $.signIntervalTimes = 1000;
        if (I1Iiliii) {
          try {
            const lI11Ii1I = parseInt(I1Iiliii) * 1000;
            $.signIntervalTimes = lI11Ii1I;
          } catch {
            $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
          }
        }
        iliIlII1.length >= 1 && (console.log("❖ 签到类型（cjhy signActivity）"), await iilli1i1(), await $.wait(2000), console.log(""));
        Ii1IlII1.length >= 1 && (console.log("❖ 签到类型（cjhy sevenDay）"), await IIIliI1I(), await $.wait(2000));
      } else {
        console.log("已设置此账号跳过运行 - 超级会员");
      }
    }
  }
  if (IIiIliil && I1lIIil1.getMessage()) {
    I1lIIil1.updateContent(I1lIIil1.content + ("\n【活动地址】：" + $.activityUrl));
    await I1lIIil1.push();
  }
})().catch(lIl1I111 => {
  console.log("", "❌ " + $.name + ", 失败! 原因: " + lIl1I111 + "!", "");
}).finally(() => {
  $.done();
});
async function Iil1i1il() {
  let ll1li1l1 = 0;
  Iliii1Ii: for (let I11I111i = 0; I11I111i < iiI1ii1I.length; I11I111i++) {
    ll1li1l1 += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityUrl = $.baseUrl + "/sign/sevenDay/signActivity?activityId=" + $.activityId;
    $.activityId = iiI1ii1I[I11I111i];
    console.log("");
    I11I111i === 0 && (await iIiiIii1(), await $.wait(500), !$.secretPin && ($.venderId = null, await I11lI1l1("customer/getSimpleActInfoVo", "activityId=" + $.activityId), await $.wait(500), await illll1ii(), await $.wait(500)));
    ll1li1l1 >= 10 && (await iIiiIii1(), await $.wait(500), ll1li1l1 = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      $.signErrorMsg = "";
      for (let i1i111l = 1; i1i111l <= 20; i1i111l++) {
        await I11lI1l1("sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break Iliii1Ii;
        }
        if (I11I111i !== iiI1ii1I.length - 1) {
          await $.wait($.signIntervalTimes);
        }
        if ($.signOk) {
          break;
        }
        if ($.signStop || i1i111l === 20) {
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
async function li1iIi() {
  let lil11IiI = 0;
  ilIiiiiI: for (let lIiiIilI = 0; lIiiIilI < il1l1iII.length; lIiiIilI++) {
    lil11IiI += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityUrl = $.baseUrl + "/sign/signActivity2?activityId=" + $.activityId;
    $.activityId = il1l1iII[lIiiIilI];
    console.log("");
    if (lIiiIilI === 0) {
      await iIiiIii1();
      await $.wait(500);
      if (!$.secretPin) {
        $.venderId = null;
        await I11lI1l1("customer/getSimpleActInfoVo", "activityId=" + $.activityId);
        await $.wait(500);
        await illll1ii();
        await $.wait(500);
      }
    }
    lil11IiI >= 10 && (await iIiiIii1(), await $.wait(500), lil11IiI = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let lIlI11l = 1; lIlI11l <= 20; lIlI11l++) {
        await I11lI1l1("sign/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break ilIiiiiI;
        }
        lIiiIilI !== il1l1iII.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) {
          break;
        }
        if ($.signStop || lIlI11l === 20) {
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
async function IIIliI1I() {
  let lIl1IIli = 0;
  I1Illl1l: for (let illi1liI = 0; illi1liI < Ii1IlII1.length; illi1liI++) {
    lIl1IIli += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityUrl = $.baseUrl + "/sign/sevenDay/signActivity?activityId=" + $.activityId;
    $.activityId = Ii1IlII1[illi1liI];
    console.log("");
    illi1liI === 0 && (await iIiiIii1(), await $.wait(500), !$.secretPin && ($.venderId = null, await I11lI1l1("customer/getSimpleActInfoVo", "activityId=" + $.activityId), await $.wait(500)));
    $.initError = false;
    await IIIIlIlI();
    if ($.initError && $.token) {
      $.initError = false;
      $.token = await i1li11ll(originCookie, "https://cjhy-isv.isvjcloud.com");
      if (!$.token) {
        console.log("获取[Token]失败！");
        $.message.insert("获取[Token]失败");
        break;
      }
      await IIIIlIlI();
      if ($.initError) {
        console.log("初始化失败，请检查Token是否过期");
        break;
      }
    }
    await $.wait($.signIntervalTimes);
    lIl1IIli >= 10 && (await iIiiIii1(), await $.wait(500), lIl1IIli = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let IIl1i11 = 1; IIl1i11 <= 20; IIl1i11++) {
        await I11lI1l1("sign/sevenDay/wx/signUp", $.activityMode === "cjhy" ? JSON.stringify({
          ecyText: il1ilIll({
            actId: $.activityId,
            pin: encodeURIComponent($.secretPin)
          }, $.pinToken, $.te)
        }) : "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)));
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break I1Illl1l;
        }
        illi1liI !== Ii1IlII1.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) {
          break;
        }
        if ($.signStop || IIl1i11 === 20) {
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
async function iilli1i1() {
  let lI111IIi = 0;
  liil1li1: for (let I1liIiil = 0; I1liIiil < iliIlII1.length; I1liIiil++) {
    lI111IIi += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityUrl = $.baseUrl + "/sign/signActivity?activityId=" + $.activityId;
    $.activityId = iliIlII1[I1liIiil];
    console.log("");
    I1liIiil === 0 && (await iIiiIii1(), await $.wait(500), !$.secretPin && ($.venderId = null, await I11lI1l1("customer/getSimpleActInfoVo", "activityId=" + $.activityId), await $.wait(500)));
    $.initError = false;
    await IIIIlIlI();
    if ($.initError && $.token) {
      $.initError = false;
      $.token = await i1li11ll(originCookie, "https://cjhy-isv.isvjcloud.com");
      if (!$.token) {
        console.log("获取[Token]失败！");
        $.message.insert("获取[Token]失败");
        break;
      }
      await IIIIlIlI();
      if ($.initError) {
        console.log("初始化失败，请检查Token是否过期");
        break;
      }
    }
    await $.wait($.signIntervalTimes);
    lI111IIi >= 10 && (await iIiiIii1(), await $.wait(500), lI111IIi = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let ll1II1I1 = 1; ll1II1I1 <= 20; ll1II1I1++) {
        await I11lI1l1("sign/wx/signUp", $.activityMode === "cjhy" ? JSON.stringify({
          ecyText: il1ilIll({
            actId: $.activityId,
            pin: encodeURIComponent($.secretPin)
          }, $.pinToken, $.te)
        }) : "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)));
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break liil1li1;
        }
        I1liIiil !== iliIlII1.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) {
          break;
        }
        if ($.signStop || ll1II1I1 === 20) {
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
async function I11lI1l1(l1I1iIli, l11Ii1I) {
  return new Promise(liI11Iii => {
    const IIiiiili = {
      url: $.baseUrl + "/" + l1I1iIli,
      headers: {
        Host: $.hostname,
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": ["sign/sevenDay/wx/signUp", "sign/wx/signUp"].includes(l1I1iIli) && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
        Origin: $.origin,
        "User-Agent": $.UA,
        Connection: "keep-alive",
        Referer: $.activityUrl,
        Cookie: llli111
      },
      body: l11Ii1I
    };
    $.post(IIiiiili, async (liilii1, I1lillii, iilill1I) => {
      try {
        if (liilii1) {
          switch (l1I1iIli) {
            case "sign/sevenDay/wx/signUp":
            case "sign/wx/signUp":
              $.signErrorTimes += 1;
              break;
          }
          if (typeof liilii1 === "string" && liilii1.includes("Timeout awaiting 'request'")) {
            console.log(l1I1iIli + " 请求超时，请检查网络重试");
          } else {
            const I1l1i1li = I1lillii?.["statusCode"];
            if (I1l1i1li) {
              if ([403, 493].includes(I1l1i1li)) {
                console.log(l1I1iIli + " 请求失败，IP被限制（Response code " + I1l1i1li + "）");
              } else {
                if ([400, 404].includes(I1l1i1li)) {
                  console.log(l1I1iIli + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1l1i1li + "）");
                } else {
                  console.log(l1I1iIli + " 请求失败（Response code " + I1l1i1li + "）");
                }
              }
            } else {
              console.log(l1I1iIli + " API请求失败 => " + (liilii1.message || liilii1));
            }
          }
        } else {
          if (iilill1I) {
            iilill1I = JSON.parse(iilill1I);
            if (I1lillii.headers["set-cookie"]) {
              llli111 = "";
              for (let liI1lI1l of I1lillii.headers["set-cookie"]) {
                IIliill1[liI1lI1l.split(";")[0].substr(0, liI1lI1l.split(";")[0].indexOf("="))] = liI1lI1l.split(";")[0].substr(liI1lI1l.split(";")[0].indexOf("=") + 1);
              }
              for (const iliIliIi of Object.keys(IIliill1)) {
                llli111 += iliIliIi + "=" + IIliill1[iliIliIi] + ";";
              }
            }
            if (iilill1I) {
              switch (l1I1iIli) {
                case "customer/getSimpleActInfoVo":
                  $.venderId = iilill1I.data.venderId;
                  $.activityType = iilill1I.data.activityType;
                  break;
                case "sign/sevenDay/wx/signUp":
                  $.signErrorTimes = 0;
                  iilill1I.isOk ? ($.signOk = true, await iiii1l1I(iilill1I)) : ($.signErrorMsg = iilill1I.msg, !["火爆", "擦肩", "缓存", "数据忙"].some(iliiI1 => $.signErrorMsg.includes(iliiI1)) && ($.signStop = true));
                  break;
                case "sign/wx/signUp":
                  $.signErrorTimes = 0;
                  iilill1I.isOk ? ($.signOk = true, await iII1111I(iilill1I)) : ($.signErrorMsg = iilill1I.msg, !["火爆", "擦肩", "缓存", "数据忙"].some(lIIl1II1 => $.signErrorMsg.includes(lIIl1II1)) && ($.signStop = true));
                  break;
                default:
                  console.log(JSON.stringify(iilill1I));
                  break;
              }
            }
          }
        }
      } catch (lIl1lIIi) {
        if (l1I1iIli != "customer/getSimpleActInfoVo") {
          console.log(l1I1iIli + " -> " + lIl1lIIi);
        }
      } finally {
        liI11Iii();
      }
    });
  });
}
async function iiii1l1I(lI11Iii) {
  if (lI11Iii.signResult.gift) {
    const lll1IlIl = lI11Iii.signResult.gift,
      llilI1I1 = lll1IlIl.insufficient;
    process.stdout.write("结果 -> ");
    if (!llilI1I1) {
      switch (parseInt(lll1IlIl.giftType)) {
        case 6:
          console.log("🎉 " + lll1IlIl.giftName + " 🐶");
          $.message.insert(lll1IlIl.giftName + "🐶");
          break;
        case 7:
          const ll1l1li1 = lI11Iii.addressId;
          let lI1iIl1l = lll1IlIl.giftName;
          console.log("🎉 恭喜获得实物~");
          console.log("奖品名称：" + lI1iIl1l);
          console.log("参考价值：" + lI11Iii.signResult.gift.priceInfo + "（元）");
          console.log("预览图片：" + lI11Iii.signResult.gift.showImage);
          const l1i1I1i = {
              baseUrl: $.baseUrl,
              cookie: llli111,
              ua: $.UA,
              activityId: $.activityId,
              activityType: $.activityType,
              venderId: $.venderId,
              secretPin: $.secretPin,
              prizeName: lI1iIl1l,
              generateId: ll1l1li1
            },
            IlI1i1l = Il1lIIIi(l1i1I1i) || false;
          !IIiIliil && IlI1i1l && (await I1lIIil1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + lI1iIl1l + "，已成功自动登记收货地址\n\n" + $.activityUrl));
          $.message.insert(lI1iIl1l + "(" + (IlI1i1l ? "已填地址" : "未填地址") + ")🎁");
          break;
        case 8:
          console.log("🗑️ 专享价");
          $.message.insert("专享价🗑️");
          break;
        case 9:
          console.log("🗑️ " + lll1IlIl.giftName + " 🎟️");
          $.message.insert(lll1IlIl.giftName + "🎟️");
          break;
        case 13:
        case 14:
        case 15:
          console.log("🎉 恭喜获得" + lll1IlIl.giftName + " 🎁");
          $.message.insert(lll1IlIl.giftName + "🎁");
          if (!IIiIliil) {
            await I1lIIil1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lll1IlIl.giftName + "\n\n" + $.activityUrl);
          }
          break;
        case 16:
          console.log("🎉 " + lll1IlIl.priceInfo + " 🧧");
          $.message.insert(lll1IlIl.priceInfo + "红包🧧");
          break;
        default:
          lll1IlIl.giftName.includes("券") ? (console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️")) : (console.log("获得：" + lll1IlIl.giftName), $.message.insert("" + lll1IlIl.giftName));
          break;
      }
    } else {
      lll1IlIl?.["giftName"] ? console.log("未中奖（原奖品 \"" + lll1IlIl.giftName + "\" 已发完）") : console.log("未中奖（奖品已发完）");
    }
  } else {
    console.log("结果 -> 签到成功");
  }
}
async function iII1111I(iI1li1li) {
  if (iI1li1li.gift) {
    const l1illliI = iI1li1li.gift,
      li11Iiii = l1illliI.insufficient;
    process.stdout.write("结果 -> ");
    if (!li11Iiii) {
      switch (parseInt(l1illliI.giftType)) {
        case 6:
          console.log("🎉 " + l1illliI.giftName + " 🐶");
          $.message.insert(l1illliI.giftName + "🐶");
          break;
        case 7:
          const iI1Il1Il = iI1li1li.addressId;
          let liIi1I = l1illliI.giftName;
          console.log("🎉 恭喜获得实物~");
          console.log("奖品名称：" + liIi1I);
          console.log("参考价值：" + iI1li1li.gift.priceInfo + "（元）");
          console.log("预览图片：" + iI1li1li.gift.showImage);
          const iiili11I = {
              baseUrl: $.baseUrl,
              cookie: llli111,
              ua: $.UA,
              activityId: $.activityId,
              activityType: $.activityType,
              venderId: $.venderId,
              secretPin: $.secretPin,
              prizeName: liIi1I,
              generateId: iI1Il1Il
            },
            l1i1lIl1 = Il1lIIIi(iiili11I) || false;
          !IIiIliil && l1i1lIl1 && (await I1lIIil1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + liIi1I + "，已成功自动登记收货地址\n\n" + $.activityUrl));
          $.message.insert(liIi1I + "(" + (l1i1lIl1 ? "已填地址" : "未填地址") + ")🎁");
          break;
        case 8:
          console.log("🗑️ 专享价");
          $.message.insert("专享价🗑️");
          break;
        case 9:
          console.log("🗑️ " + l1illliI.giftName + " 🎟️");
          $.message.insert(l1illliI.giftName + "🎟️");
          break;
        case 13:
        case 14:
        case 15:
          console.log("🎉 恭喜获得" + l1illliI.giftName + " 🎁");
          $.message.insert(l1illliI.giftName + "🎁");
          !IIiIliil && (await I1lIIil1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + l1illliI.giftName + "\n\n" + $.activityUrl));
          break;
        case 16:
          console.log("🎉 " + l1illliI.priceInfo + " 🧧");
          $.message.insert(l1illliI.priceInfo + "红包🧧");
          break;
        default:
          if (l1illliI.giftName.includes("券")) {
            console.log("🗑️ 优惠券");
            $.message.insert("优惠券🗑️");
          } else {
            console.log("获得：" + l1illliI.giftName);
            $.message.insert("" + l1illliI.giftName);
          }
          break;
      }
    } else {
      if (l1illliI?.["giftName"]) {
        console.log("未中奖（原奖品 \"" + l1illliI.giftName + "\" 已发完）");
      } else {
        console.log("未中奖（奖品已发完）");
      }
    }
  } else {
    console.log("结果 -> 签到成功");
  }
}
async function illll1ii() {
  let ii1iI111 = {
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
      Cookie: llli111
    },
    body: "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP"
  };
  return new Promise(IIIiIiii => {
    $.post(ii1iI111, (Il1iili1, lI1l1II, lIl1l1Ii) => {
      try {
        if (Il1iili1) {
          console.log(Il1iili1);
        } else {
          if (lI1l1II.headers["set-cookie"]) {
            llli111 = "";
            for (let I11ilIi1 of lI1l1II.headers["set-cookie"]) {
              IIliill1[I11ilIi1.split(";")[0].substr(0, I11ilIi1.split(";")[0].indexOf("="))] = I11ilIi1.split(";")[0].substr(I11ilIi1.split(";")[0].indexOf("=") + 1);
            }
            for (const l11IiIi1 of Object.keys(IIliill1)) {
              llli111 += l11IiIi1 + "=" + IIliill1[l11IiIi1] + ";";
            }
          }
          if (lIl1l1Ii) {
            lIl1l1Ii = JSON.parse(lIl1l1Ii);
            lIl1l1Ii.result ? ($.nickname = lIl1l1Ii.data.nickname, $.secretPin = lIl1l1Ii.data.secretPin) : console.log(lIl1l1Ii.errorMessage);
          } else {
            console.log("京东返回了空数据");
          }
        }
      } catch (ilIlIIli) {
        console.log(ilIlIIli);
      } finally {
        IIIiIiii();
      }
    });
  });
}
async function IIIIlIlI() {
  let lI1i1ll1 = {
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
      Cookie: llli111
    }
  };
  return new Promise(lIiiI1Il => {
    $.get(lI1i1ll1, (ii1li1ii, Ill1iII, IIIli111) => {
      try {
        if (ii1li1ii) {
          console.log(ii1li1ii);
        } else {
          if (Ill1iII.headers["set-cookie"]) {
            llli111 = "";
            for (let l11I1ili of Ill1iII.headers["set-cookie"]) {
              IIliill1[l11I1ili.split(";")[0].substr(0, l11I1ili.split(";")[0].indexOf("="))] = l11I1ili.split(";")[0].substr(l11I1ili.split(";")[0].indexOf("=") + 1);
            }
            for (const lil1liIi of Object.keys(IIliill1)) {
              llli111 += lil1liIi + "=" + IIliill1[lil1liIi] + ";";
            }
          }
          $.pinToken = iI1liiil.getCookieValue(llli111, "pToken");
          $.te = iI1liiil.getCookieValue(llli111, "te");
          if (IIIli111) {
            IIIli111 = JSON.parse(IIIli111);
            if (IIIli111.result) {
              $.nickname = IIIli111.data.nickname;
              $.secretPin = IIIli111.data.secretPin;
            } else {
              IIIli111.errorMessage ? (console.log(IIIli111.errorMessage), $.initError = true) : $.initError = true;
            }
          } else {
            console.log("京东返回了空数据");
          }
        }
      } catch (iIllll1) {
        console.log(iIllll1);
      } finally {
        lIiiI1Il();
      }
    });
  });
}
function iIiiIii1() {
  return new Promise(iiI1IIil => {
    $.get({
      url: $.activityUrl,
      headers: {
        "user-agent": $.UA
      }
    }, (liIlli11, I1i1i11l, i1lliiiI) => {
      try {
        if (liIlli11) {
          console.log(liIlli11);
        } else {
          if (I1i1i11l.headers["set-cookie"]) {
            llli111 = "";
            for (let ilil1Ili of I1i1i11l.headers["set-cookie"]) {
              IIliill1[ilil1Ili.split(";")[0].substr(0, ilil1Ili.split(";")[0].indexOf("="))] = ilil1Ili.split(";")[0].substr(ilil1Ili.split(";")[0].indexOf("=") + 1);
            }
            for (const II1IlIll of Object.keys(IIliill1)) {
              llli111 += II1IlIll + "=" + IIliill1[II1IlIll] + ";";
            }
          }
        }
      } catch (IllIli1i) {
        console.log(IllIli1i);
      } finally {
        iiI1IIil();
      }
    });
  });
}
function il1ilIll(lIIlII1, ll11liIi, IIi1i1ii) {
  function ll1lIIi(I1Ii1I1i) {
    I1Ii1I1i = I1Ii1I1i.split("").reverse().join("");
    const lil1111l = new Uint8Array(12),
      illlliiI = new TextEncoder().encode(I1Ii1I1i);
    for (let iI1ilIIi = 0; iI1ilIIi < illlliiI.length; iI1ilIIi += 2) {
      let IIiii1 = illlliiI[iI1ilIIi] << 5 | illlliiI[iI1ilIIi + 1] & 255;
      IIiii1 %= 63;
      lil1111l[iI1ilIIi >> 1] = IIiii1;
    }
    let il11I1i = "";
    for (let I1Ill1ll = 0; I1Ill1ll < lil1111l.length; I1Ill1ll++) {
      il11I1i += (lil1111l[I1Ill1ll] + 256).toString(2).slice(1);
    }
    let lI1I1lIi = "",
      ilI1llI1 = "";
    for (let l1I1i11i = 0; l1I1i11i < 16; l1I1i11i++) {
      if (l1I1i11i !== 0) {
        const i1II1i1i = l1I1i11i * 6,
          Ii111Ili = il11I1i.substring(i1II1i1i, i1II1i1i + 6);
        let iIlIl1i1 = parseInt(Ii111Ili, 2);
        const lliIlilI = ilI1llI1.split("");
        for (let I1IiiIll = 0; I1IiiIll < lliIlilI.length; I1IiiIll++) {
          lliIlilI[I1IiiIll] === "1" && (iIlIl1i1 = (iIlIl1i1 >> 6 - I1IiiIll | iIlIl1i1 << I1IiiIll) & 63);
        }
        ilI1llI1 = (iIlIl1i1 & 63).toString(2).padStart(6, "0");
      } else {
        ilI1llI1 = il11I1i.substring(0, 6);
      }
      lI1I1lIi += ilI1llI1;
    }
    for (let Ili1I = 0; Ili1I < 12; Ili1I++) {
      const IIilI11I = Ili1I * 8;
      lil1111l[Ili1I] = parseInt(lI1I1lIi.substring(IIilI11I, IIilI11I + 8), 2);
    }
    const IIilI1Il = btoa(String.fromCharCode.apply(null, lil1111l));
    return IIilI1Il;
  }
  const I1IlIllI = ["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"];
  let lii11lli = Date.now() + parseInt(IIi1i1ii);
  typeof lIIlII1 != "object" && (lIIlII1 = JSON.parse(lIIlII1));
  lIIlII1.nowTime = lii11lli;
  let IIIIII1l = ll11liIi + lii11lli;
  const ilil111 = IIIIII1l.substring(0, IIIIII1l.length - 5);
  let lI1iiiIi = "";
  for (let iiI1l11I = 0; iiI1l11I < ilil111.length; iiI1l11I++) {
    let IiiI1III = ilil111.charCodeAt(iiI1l11I),
      IlIIIlII = IiiI1III % 10,
      Ill1iIl = I1IlIllI[IlIIIlII][iiI1l11I];
    lI1iiiIi += Ill1iIl;
  }
  var ilIllIi = lI1iiiIi.length,
    liIlli1I = Math.floor(ilIllIi / 24),
    iI1II1il = "";
  for (var IilII1I1 = 0; IilII1I1 < 24; IilII1I1++) {
    var IIill1i1 = (IilII1I1 + 1) * liIlli1I;
    IilII1I1 === 23 && (IIill1i1 = ilIllIi);
    var ilIi1ii1 = lI1iiiIi.substring(IilII1I1 * liIlli1I, IIill1i1),
      Ii1llI1i = [];
    for (var l11Iil1l = 0; l11Iil1l < ilIi1ii1.length; l11Iil1l++) {
      Ii1llI1i.push(ilIi1ii1.charCodeAt(l11Iil1l));
    }
    var lili1I1I = Ii1llI1i.reduce(function (I1iIiII1, ll1Iil) {
        return I1iIiII1 + ll1Iil;
      }, 0),
      lll1iI11 = Math.floor(lili1I1I / Ii1llI1i.length);
    iI1II1il += String.fromCharCode(lll1iI11);
  }
  lI1iiiIi = iI1II1il;
  const iil1iiii = ll1lIIi(lI1iiiIi),
    iiIl1lII = ll1IIiIi.enc.Utf8.parse(iil1iiii),
    iIII1l1i = ll1IIiIi.enc.Utf8.parse(""),
    IlI1IlI1 = ll1IIiIi.AES.encrypt(JSON.stringify(lIIlII1), iiIl1lII, {
      iv: iIII1l1i,
      mode: ll1IIiIi.mode.ECB,
      padding: ll1IIiIi.pad.Pkcs7
    });
  return IlI1IlI1.toString();
}
