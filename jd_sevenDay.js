/*
活动名称：店铺签到 · 超级无线
环境变量：多活动id用逗号分开，不同环境变量对应不同链接类型，注意区分

LZKJ_SEVENDAY   https://lzkj-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=<活动id>
LZKJ_SIGN       https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId=<活动id>
CJHY_SEVENDAY   https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=<活动id>
CJHY_SIGN       https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=<活动id>

下方例子：	单个无需 ,  多活动id用逗号分开
export LZKJ_SEVENDAY="xxxx,xxxx,xxxxx"
export LZKJ_SIGN="xxxx,xxxx,xxxxx"
export CJHY_SEVENDAY="xxxx,xxxx,xxxxx"
export CJHY_SIGN="xxxx,xxxx,xxxxx"
export jd_sevenDay_blacklist="" 黑名单 用&隔开 pin值

默认不会入会，开启请设置变量 WXSIGNRH=true;
cron: 1 1 1 1 * jd_sevenDay.js
updatetime:2023/05/21

*/
const Env=require('./utils/Env.js');
const $ = new Env('超级无线店铺签到');


const liliiilI = $.isNode() ? require("./jdCookie.js") : "",
  lI1Iill = $.isNode() ? require("./sendNotify") : "",
  IiiIi1il = require("./USER_AGENTS"),
  Iliii1li = require("./function/dylank"),
  IIiIIlIl = require("child_process").execSync,
  IiIlilii = require("fs"),
  lIIii11I = IiIlilii.existsSync("/ql/data/config") ? "/ql/data/config/config.sh" : "/ql/config/config.sh",
  II1II11l = process.env.WXSIGNRH ? process.env.WXSIGNRH : false;
let iiliI11I = [],
  lIllIil1 = "",
  I1liiiI1 = "",
  li11ii1 = [],
  lil1llll = [],
  IIll1iii = [],
  ii1il11I = [],
  lII1lIi = {},
  Il1IIIl1 = 10,
  iIIllIIi = 0,
  Iill = [],
  Il1iIIii;
process.env.LZKJ_SEVENDAY && process.env.LZKJ_SEVENDAY != "" && (li11ii1 = process.env.LZKJ_SEVENDAY.split(",").filter(IIIlllil => !!IIIlllil && IIIlllil.length === 32), li11ii1 = [...new Set(li11ii1)]);
process.env.LZKJ_SIGN && process.env.LZKJ_SIGN != "" && (lil1llll = process.env.LZKJ_SIGN.split(",").filter(ilI1liiI => !!ilI1liiI && ilI1liiI.length === 32), lil1llll = [...new Set(lil1llll)]);
process.env.CJHY_SEVENDAY && process.env.CJHY_SEVENDAY != "" && (IIll1iii = process.env.CJHY_SEVENDAY.split(",").filter(I1iIiiI1 => !!I1iIiiI1 && I1iIiiI1.length === 32), IIll1iii = [...new Set(IIll1iii)]);
process.env.CJHY_SIGN && process.env.CJHY_SIGN != "" && (ii1il11I = process.env.CJHY_SIGN.split(",").filter(iliiiI1i => !!iliiiI1i && iliiiI1i.length === 32), ii1il11I = [...new Set(ii1il11I)]);
process.env.COOKIE_NUM && process.env.COOKIE_NUM != 10 && (Il1IIIl1 = process.env.COOKIE_NUM);
if ($.isNode()) {
  Object.keys(liliiilI).forEach(liIill1 => {
    iiliI11I.push(liliiilI[liIill1]);
  });
  process.env.JD_DEBUG && process.env.JD_DEBUG === "false" && (console.log = () => {});
} else {
  let ili111II = $.getdata("CookiesJD") || "[]";
  ili111II = JSON.parse(ili111II);
  iiliI11I = ili111II.map(IIi11lIi => {
    return IIi11lIi.cookie;
  });
  iiliI11I.reverse();
  iiliI11I.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  iiliI11I.reverse();
  iiliI11I = iiliI11I.filter(IlIlIlI1 => {
    return !!IlIlIlI1;
  });
}
let llilIlll = "",
  llliI1l = "";
$.whitelist = process.env.jd_sevenDay_whitelist || llilIlll;
$.blacklist = process.env.jd_sevenDay_blacklist || llliI1l;
l1iIiilI();
ilIIIlI1();
!(async () => {
  console.log("\n默认只跑前10账号，变量为：COOKIE_NUM");
  if ([...li11ii1, ...lil1llll, ...IIll1iii, ...ii1il11I].length === 0) {
    console.log("\n没有配置活动变量，详情查看注释，退出！\n");
    return;
  }
  if (!iiliI11I[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let IiiI1Iil = 0; IiiI1Iil < Il1IIIl1; IiiI1Iil++) {
    if (iiliI11I[IiiI1Iil]) {
      lIllIil1 = iiliI11I[IiiI1Iil];
      originCookie = iiliI11I[IiiI1Iil];
      newCookie = "";
      $.UserName = decodeURIComponent(lIllIil1.match(/pt_pin=(.+?);/) && lIllIil1.match(/pt_pin=(.+?);/)[1]);
      $.index = IiiI1Iil + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = IiiIi1il.UARAM ? IiiIi1il.UARAM() : IiiIi1il.USER_AGENT;
      await IiII1lI1();
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\\n请重新登录获取\\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lI1Iill.sendNotify("" + $.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\\n请重新登录获取cookie"));
        continue;
      }
      $.bean = 0;
      $.ADID = liIllIl1("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = liIllIl1("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      li11ii1.length >= 1 && (console.log("❖ 签到类型1（ lzkj sevenDay ）"), await illillli(), await $.wait(2000));
      lil1llll.length >= 1 && (console.log("\n❖ 签到类型2（ lzkj signActivity2 ）"), await iilIIIiI(), await $.wait(2000));
      IIll1iii.length >= 1 && (console.log("\n❖ 签到类型3（ cjhy sevenDay ）"), await lililiIl(), await $.wait(2000));
      if (ii1il11I.length >= 1) {
        console.log("\n❖ 签到类型4（ cjhy signActivity ）");
        await iI1I1Il1();
        await $.wait(2000);
      }
      $.bean > 0 && (I1liiiI1 += "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " \\n       └ 获得 " + $.bean + " 京豆。");
    }
  }
  try {
    Il1iIIii = Iill.length;
    for (let iil1liIl of Iill) {
      IIiIIlIl("sed -i \"s!" + iil1liIl + "!!g\" " + lIIii11I);
    }
  } catch (iII1IIIl) {}
  console.log("\n" + (Il1iIIii > 0 ? Il1iIIii + "个失效活动，变量已移除" : ""));
  if (I1liiiI1 !== "") {
    if ($.isNode()) {
      await lI1Iill.sendNotify($.name, I1liiiI1, "", "\n");
    } else $.msg($.name, "有点儿收获", I1liiiI1);
  }
})().catch(iill1li => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iill1li + "!", "");
}).finally(() => {
  $.done();
});
async function illillli() {
  for (let liIllIiI = 0; liIllIiI < li11ii1.length; liIllIiI++) {
    $.activityId = li11ii1[liIllIiI];
    if (!$.activityId) continue;
    $.activityUrl = "https://lzkj-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=" + $.activityId;
    console.log("");
    iIIllIIi = 0;
    liIllIiI == 0 && ($.token = null, $.secretPin = null);
    $.venderId = null;
    await lilil1();
    await $.wait(500);
    await lIIillii("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
    await $.wait(500);
    if (liIllIiI == 0) {
      $.token = await Iliii1li(lIllIil1, "https://lzkj-isv.isvjcloud.com");
      if ($.token) {
        await IiIl1ill();
        await $.wait(500);
        if (!$.secretPin) await IiIl1ill();
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    if ($.secretPin) {
      console.log("活动ID：" + $.activityId);
      if ($.index == 1) {
        $.log("活动链接：" + $.activityUrl);
        await l11i1iI("lzkj", "wx", "getShopInfo", $.venderId, $.secretPin, $.activityId);
        await l11i1iI("lzkj", "sevenDay/wx", "getSignInfo", $.venderId, undefined, $.activityId);
        if ($.activityEnd) {
          $.log("活动已结束，不执行签到");
          delete lil1llll[liIllIiI];
          continue;
        }
      }
      $.venderId && (await lIIillii("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.secretPin) + "&activityId=" + $.activityId + "&pageUrl=" + $.activityUrl + "&subType=app&adSource=tg_xuanFuTuBiao", 1), await $.wait(500));
      await lIIillii("sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin), 1);
      await $.wait(1000);
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
  lIIillii;
}
async function iilIIIiI() {
  for (let i11i1lI = 0; i11i1lI < lil1llll.length; i11i1lI++) {
    $.activityId = lil1llll[i11i1lI];
    if (!$.activityId) continue;
    $.activityUrl = "https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId=" + $.activityId;
    console.log("");
    iIIllIIi = 0;
    i11i1lI == 0 && ($.token = null, $.secretPin = null);
    $.venderId = null;
    await lilil1();
    await $.wait(500);
    await lIIillii("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
    await $.wait(500);
    if (i11i1lI == 0) {
      $.token = await Iliii1li(lIllIil1, "https://lzkj-isv.isvjcloud.com");
      if ($.token) {
        await IiIl1ill();
        await $.wait(500);
        if (!$.secretPin) await IiIl1ill();
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    if ($.secretPin) {
      console.log("活动ID：" + $.activityId);
      if ($.index == 1) {
        $.log("活动链接：" + $.activityUrl);
        await l11i1iI("lzkj", "wx", "getShopInfo", $.venderId, $.secretPin, $.activityId);
        await l11i1iI("lzkj", "wx", "getActivity", $.venderId, undefined, $.activityId);
        if ($.activityEnd) {
          $.log("活动已结束，不执行签到");
          delete lil1llll[i11i1lI];
          continue;
        }
      }
      $.venderId && (await lIIillii("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.secretPin) + "&activityId=" + $.activityId + "&pageUrl=" + $.activityUrl + "&subType=app&adSource=tg_xuanFuTuBiao", 1), await $.wait(500));
      await lIIillii("sign/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin), 1);
      await $.wait(1000);
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function lililiIl() {
  for (let lIIIl1l1 = 0; lIIIl1l1 < IIll1iii.length; lIIIl1l1++) {
    $.activityId = IIll1iii[lIIIl1l1];
    if (!$.activityId) continue;
    $.activityUrl = "https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=" + $.activityId;
    console.log("");
    iIIllIIi = 0;
    lIIIl1l1 == 0 && ($.token = null, $.secretPin = null);
    $.venderId = null;
    await il1I1iIl();
    await $.wait(500);
    await lIIIiliI("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
    await $.wait(500);
    if (lIIIl1l1 == 0) {
      $.token = await Iliii1li(lIllIil1, "https://cjhy-isv.isvjcloud.com");
      if ($.token) {
        await IlII111l();
        await $.wait(500);
        if (!$.secretPin) await IlII111l();
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    if ($.secretPin) {
      console.log("活动ID：" + $.activityId);
      if ($.index == 1) {
        $.log("活动链接：" + $.activityUrl);
        await l11i1iI("cjhy", "wx", "getShopInfo", $.venderId, $.secretPin, $.activityId);
        await l11i1iI("cjhy", "sevenDay/wx", "getSignInfo", $.venderId, undefined, $.activityId);
        if ($.activityEnd) {
          $.log("活动已结束，不执行签到");
          delete IIll1iii[lIIIl1l1];
          continue;
        }
      }
      $.venderId && (await lIIIiliI("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=", 1), await $.wait(500));
      await lIIIiliI("sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)), 1);
      await $.wait(1000);
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function iI1I1Il1() {
  for (let IlIiiIil = 0; IlIiiIil < ii1il11I.length; IlIiiIil++) {
    $.activityId = ii1il11I[IlIiiIil];
    if (!$.activityId) continue;
    $.activityUrl = "https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=" + $.activityId;
    console.log("");
    iIIllIIi = 0;
    IlIiiIil == 0 && ($.token = null, $.secretPin = null);
    $.venderId = null;
    await il1I1iIl();
    await $.wait(500);
    await lIIIiliI("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
    await $.wait(500);
    if (IlIiiIil == 0) {
      $.token = await Iliii1li(lIllIil1, "https://cjhy-isv.isvjcloud.com");
      if ($.token) {
        await IlII111l();
        await $.wait(500);
        if (!$.secretPin) await IlII111l();
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    if ($.secretPin) {
      console.log("活动ID：" + $.activityId);
      if ($.index == 1) {
        $.log("活动链接：" + $.activityUrl);
        await l11i1iI("cjhy", "wx", "getShopInfo", $.venderId, $.secretPin, $.activityId);
        await l11i1iI("cjhy", "wx", "getActivity", $.venderId, undefined, $.activityId);
        if ($.activityEnd) {
          $.log("活动已结束，不执行签到");
          delete ii1il11I[IlIiiIil];
          continue;
        }
      }
      $.venderId && (await lIIIiliI("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app", 1), await $.wait(500));
      await lIIIiliI("sign/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)), 1);
      await $.wait(1000);
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function lIIillii(Ii1II1iI, llII111l, l1I1III1 = 0) {
  return new Promise(I1illi1I => {
    $.post(lil1iI1i(Ii1II1iI, llII111l, l1I1III1), async (i1lli1ll, iliIII11, iIiiliil) => {
      try {
        if (i1lli1ll) {
          $.log(i1lli1ll);
        } else {
          if (iIiiliil) {
            iIiiliil = JSON.parse(iIiiliil);
            if (iliIII11.headers["set-cookie"]) {
              lIllIil1 = originCookie + ";";
              for (let l1li1lIi of iliIII11.headers["set-cookie"]) {
                lII1lIi[l1li1lIi.split(";")[0].substr(0, l1li1lIi.split(";")[0].indexOf("="))] = l1li1lIi.split(";")[0].substr(l1li1lIi.split(";")[0].indexOf("=") + 1);
              }
              for (const Illlil11 of Object.keys(lII1lIi)) {
                lIllIil1 += Illlil11 + "=" + lII1lIi[Illlil11] + ";";
              }
            }
            if (iIiiliil) switch (Ii1II1iI) {
              case "customer/getSimpleActInfoVo":
                $.venderId = iIiiliil.data.venderId;
                $.activityType = iIiiliil.data.activityType;
                break;
              case "sign/sevenDay/wx/signUp":
                if (iIiiliil) {
                  if (iIiiliil.isOk) {
                    iIIllIIi = 0;
                    iIiiliil.signResult.gift != null ? console.log("签到结果 -> 签到成功" + (iIiiliil.signResult.send ? ",获得" + iIiiliil.signResult.gift.giftName + " 🎉" : "")) : $.log("簽到結果 -> 簽到成功");
                  } else {
                    console.log("簽到结果 -> " + iIiiliil.msg);
                    if (II1II11l && iIiiliil.msg.includes("会员")) {
                      process.stdout.write("去入会 -> ");
                      let i1iIlI1l;
                      for (let IlIliIl of Array(2)) {
                        i1iIlI1l = await IiIlI1II($.venderId);
                        if (i1iIlI1l.includes("成功")) break;
                      }
                      if (!i1iIlI1l.includes("成功")) return;
                      await lIIillii(Ii1II1iI, llII111l, l1I1III1);
                    } else {
                      if (iIiiliil.msg.includes("火爆")) {
                        if (iIIllIIi > 2) return;
                        iIIllIIi++;
                        $.log("重试 " + iIIllIIi);
                        await $.wait(100);
                        await lIIillii(Ii1II1iI, llII111l, l1I1III1);
                      }
                    }
                  }
                }
                break;
              case "sign/wx/signUp":
                if (iIiiliil) {
                  if (iIiiliil.isOk) {
                    iIIllIIi = 0;
                    iIiiliil.gift != null ? console.log("签到结果 -> 签到成功" + (iIiiliil.isSend ? ",获得" + iIiiliil.gift.giftName + " 🎉" : "") + " ") : $.log("簽到結果 -> 簽到成功");
                    await l11i1iI("lzkj", "wx", "getSignInfo", $.venderId, $.secretPin, $.activityId);
                  } else {
                    console.log("签到结果 -> " + iIiiliil.msg);
                    if (II1II11l && iIiiliil.msg.includes("会员")) {
                      process.stdout.write("去入会 -> ");
                      let i1il1iii;
                      for (let lIII1lIi of Array(2)) {
                        i1il1iii = await IiIlI1II($.venderId);
                        if (i1il1iii.includes("成功")) break;
                      }
                      if (!i1il1iii.includes("成功")) return;
                      await lIIillii(Ii1II1iI, llII111l, l1I1III1);
                    } else {
                      if (iIiiliil.msg.includes("火爆")) {
                        if (iIIllIIi > 2) return;
                        iIIllIIi++;
                        $.log("重试 " + iIIllIIi);
                        await $.wait(100);
                        await lIIillii(Ii1II1iI, llII111l, l1I1III1);
                      }
                    }
                  }
                }
                break;
              default:
                $.log(JSON.stringify(iIiiliil));
                break;
            }
          }
        }
      } catch (iIIIIl1i) {
        if (Ii1II1iI != "customer/getSimpleActInfoVo") {
          $.log(Ii1II1iI + " -> " + iIIIIl1i);
        }
      } finally {
        I1illi1I();
      }
    });
  });
}
async function lIIIiliI(lliIliii, llI1Illi, III1i11I = 0) {
  return new Promise(ilIl1Ill => {
    $.post(llIIlili(lliIliii, llI1Illi, III1i11I), async (I111111l, li1lIIlI, II1lI1ii) => {
      try {
        if (I111111l) $.log(I111111l);else {
          if (II1lI1ii) {
            II1lI1ii = JSON.parse(II1lI1ii);
            if (li1lIIlI.headers["set-cookie"]) {
              lIllIil1 = originCookie + ";";
              for (let I1illiII of li1lIIlI.headers["set-cookie"]) {
                lII1lIi[I1illiII.split(";")[0].substr(0, I1illiII.split(";")[0].indexOf("="))] = I1illiII.split(";")[0].substr(I1illiII.split(";")[0].indexOf("=") + 1);
              }
              for (const I1l1i11I of Object.keys(lII1lIi)) {
                lIllIil1 += I1l1i11I + "=" + lII1lIi[I1l1i11I] + ";";
              }
            }
            if (II1lI1ii) switch (lliIliii) {
              case "customer/getSimpleActInfoVo":
                $.venderId = II1lI1ii.data.venderId;
                $.activityType = II1lI1ii.data.activityType;
                break;
              case "sign/sevenDay/wx/signUp":
                if (II1lI1ii) {
                  if (II1lI1ii.isOk) {
                    iIIllIIi = 0;
                    II1lI1ii.signResult.gift != null ? console.log("签到结果 -> 签到成功" + (II1lI1ii.signResult.send ? ",获得" + II1lI1ii.signResult.gift.giftName + " 🎉" : "")) : $.log("簽到結果 -> 簽到成功");
                  } else {
                    console.log("签到结果 -> " + II1lI1ii.msg);
                    if (II1II11l && II1lI1ii.msg.includes("会员")) {
                      process.stdout.write("去入会 -> ");
                      let lllli11I;
                      for (let i1I1II1 of Array(2)) {
                        lllli11I = await IiIlI1II($.venderId);
                        if (lllli11I.includes("成功")) break;
                      }
                      if (!lllli11I.includes("成功")) return;
                      await lIIIiliI(lliIliii, llI1Illi, III1i11I);
                    } else {
                      if (II1lI1ii.msg.includes("火爆")) {
                        if (iIIllIIi > 2) return;
                        iIIllIIi++;
                        $.log("重试 " + iIIllIIi);
                        await $.wait(100);
                        await lIIIiliI(lliIliii, llI1Illi, III1i11I);
                      }
                    }
                  }
                }
                break;
              case "sign/wx/signUp":
                if (II1lI1ii) {
                  if (II1lI1ii.isOk) {
                    iIIllIIi = 0;
                    II1lI1ii.gift != null ? console.log("签到结果 -> 签到成功" + (II1lI1ii.signResult.send ? ",获得" + II1lI1ii.gift.giftName + " 🎉" : "")) : $.log("簽到結果 -> 簽到成功");
                    await l11i1iI("cjhy", "wx", "getSignInfo", $.venderId, $.secretPin, $.activityId);
                  } else {
                    console.log("签到结果 -> " + II1lI1ii.msg);
                    if (II1II11l && II1lI1ii.msg.includes("会员")) {
                      process.stdout.write("去入会 -> ");
                      let Iii11iIi;
                      for (let Ii1I1il of Array(2)) {
                        Iii11iIi = await IiIlI1II($.venderId);
                        if (Iii11iIi.includes("成功")) break;
                      }
                      if (!Iii11iIi.includes("成功")) return;
                      await lIIIiliI(lliIliii, llI1Illi, III1i11I);
                    } else {
                      if (II1lI1ii.msg.includes("火爆")) {
                        if (iIIllIIi > 2) return;
                        iIIllIIi++;
                        $.log("重试 " + iIIllIIi);
                        await $.wait(100);
                        await lIIIiliI(lliIliii, llI1Illi, III1i11I);
                      }
                    }
                  }
                }
                break;
              default:
                $.log(JSON.stringify(II1lI1ii));
                break;
            }
          }
        }
      } catch (i1IIlIll) {
        lliIliii != "customer/getSimpleActInfoVo" && $.log(lliIliii + " -> " + i1IIlIll);
      } finally {
        ilIl1Ill();
      }
    });
  });
}
function lil1iI1i(lilI111I, Ii1111Il, l1l11111) {
  return {
    "url": l1l11111 ? "https://lzkj-isv.isvjcloud.com/" + lilI111I : "https://lzkj-isv.isvjcloud.com/sign/wx/" + lilI111I,
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjcloud.comm",
      "User-Agent": $.UA,
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": lIllIil1
    },
    "body": Ii1111Il
  };
}
function llIIlili(ilIIi11l, IllllIi1, I111I1I) {
  return {
    "url": I111I1I ? "https://cjhy-isv.isvjcloud.com/" + ilIIi11l : "https://cjhy-isv.isvjcloud.com/sign/wx/" + ilIIi11l,
    "headers": {
      "Host": "cjhy-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://cjhy-isv.isvjcloud.comm",
      "User-Agent": $.UA,
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": lIllIil1
    },
    "body": IllllIi1
  };
}
function IiIl1ill() {
  let ll11i1Ii = {
    "url": "https://lzkj-isv.isvjcloud.com/customer/getMyPing",
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjcloud.com",
      "User-Agent": $.UA,
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": lIllIil1
    },
    "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP"
  };
  return new Promise(lIllIl1 => {
    $.post(ll11i1Ii, (I1l1Ill1, l1iIilli, IiIliiil) => {
      try {
        if (I1l1Ill1) $.log(I1l1Ill1);else {
          if (l1iIilli.headers["set-cookie"]) {
            lIllIil1 = originCookie + ";";
            for (let Iil1I1ll of l1iIilli.headers["set-cookie"]) {
              lII1lIi[Iil1I1ll.split(";")[0].substr(0, Iil1I1ll.split(";")[0].indexOf("="))] = Iil1I1ll.split(";")[0].substr(Iil1I1ll.split(";")[0].indexOf("=") + 1);
            }
            for (const I1ili1ii of Object.keys(lII1lIi)) {
              lIllIil1 += I1ili1ii + "=" + lII1lIi[I1ili1ii] + ";";
            }
          }
          if (IiIliiil) {
            IiIliiil = JSON.parse(IiIliiil);
            IiIliiil.result ? ($.pin = IiIliiil.data.nickname, $.secretPin = IiIliiil.data.secretPin) : $.log(IiIliiil.errorMessage);
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (IlIlili1) {
        $.log(IlIlili1);
      } finally {
        lIllIl1();
      }
    });
  });
}
function IlII111l() {
  let IIiI1i1i = {
    "url": "https://cjhy-isv.isvjcloud.com/customer/getMyPing",
    "headers": {
      "Host": "cjhy-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://cjhy-isv.isvjcloud.com",
      "User-Agent": $.UA,
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": lIllIil1
    },
    "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP&riskType=1"
  };
  return new Promise(lii1iI1l => {
    $.post(IIiI1i1i, (iiIlli1, li111iII, I111iiIl) => {
      try {
        if (iiIlli1) $.log(iiIlli1);else {
          if (li111iII.headers["set-cookie"]) {
            lIllIil1 = originCookie + ";";
            for (let IiiIliII of li111iII.headers["set-cookie"]) {
              lII1lIi[IiiIliII.split(";")[0].substr(0, IiiIliII.split(";")[0].indexOf("="))] = IiiIliII.split(";")[0].substr(IiiIliII.split(";")[0].indexOf("=") + 1);
            }
            for (const lI1lIl1I of Object.keys(lII1lIi)) {
              lIllIil1 += lI1lIl1I + "=" + lII1lIi[lI1lIl1I] + ";";
            }
          }
          I111iiIl ? (I111iiIl = JSON.parse(I111iiIl), I111iiIl.result ? ($.pin = I111iiIl.data.nickname, $.secretPin = I111iiIl.data.secretPin) : $.log(I111iiIl.errorMessage)) : $.log("京东返回了空数据");
        }
      } catch (i1IlIliI) {
        $.log(i1IlIliI);
      } finally {
        lii1iI1l();
      }
    });
  });
}
function lilil1() {
  return new Promise(ilill1ll => {
    let iI11iill = {
      "url": "https://lzkj-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": lIllIil1,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iI11iill, async (IlIl1ill, IiI1iili, li1il1iI) => {
      try {
        if (IlIl1ill) {
          IiI1iili && typeof IiI1iili.statusCode != "undefined" && IiI1iili.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(IlIl1ill));
          console.log("" + $.name + " cookie API请求失败，请检查网路重试");
        } else {
          let ilIl1Ii = li1il1iI.match(/(活动已经结束)/) && li1il1iI.match(/(活动已经结束)/)[1] || "";
          ilIl1Ii && ($.activityEnd = true, console.log("活动已结束"));
          if (IiI1iili.headers["set-cookie"]) {
            lIllIil1 = originCookie + ";";
            for (let I111Ili of IiI1iili.headers["set-cookie"]) {
              lII1lIi[I111Ili.split(";")[0].substr(0, I111Ili.split(";")[0].indexOf("="))] = I111Ili.split(";")[0].substr(I111Ili.split(";")[0].indexOf("=") + 1);
            }
            for (const lliIil of Object.keys(lII1lIi)) {
              lIllIil1 += lliIil + "=" + lII1lIi[lliIil] + ";";
            }
            activityCookie = lIllIil1;
          }
        }
      } catch (ilIi111I) {
        $.logErr(ilIi111I, IiI1iili);
      } finally {
        ilill1ll();
      }
    });
  });
}
function il1I1iIl() {
  return new Promise(il1l1I1 => {
    $.get({
      "url": $.activityUrl,
      "headers": {
        "user-agent": $.UA
      }
    }, (l1iiIiII, l11IlI11, l1lIilli) => {
      try {
        if (l1iiIiII) console.log(l1iiIiII);else {
          if (l11IlI11.headers["set-cookie"]) {
            lIllIil1 = originCookie + ";";
            for (let II1IiIi of l11IlI11.headers["set-cookie"]) {
              lII1lIi[II1IiIi.split(";")[0].substr(0, II1IiIi.split(";")[0].indexOf("="))] = II1IiIi.split(";")[0].substr(II1IiIi.split(";")[0].indexOf("=") + 1);
            }
            for (const iI1lil1i of Object.keys(lII1lIi)) {
              lIllIil1 += iI1lil1i + "=" + lII1lIi[iI1lil1i] + ";";
            }
          }
        }
      } catch (I11Ii1i1) {
        console.log(I11Ii1i1);
      } finally {
        il1l1I1();
      }
    });
  });
}
function l11i1iI(IiIiIi1i, iI111il1, li1ll1il, i1IiiIII, ll1lIlii, li1Iiil) {
  let IiIiilIi;
  $.activityEnd = false;
  switch (li1ll1il) {
    case "getSignInfo":
      if (IiIiIi1i == "lzkj") IiIiilIi = "venderId=" + i1IiiIII + "&pin=" + encodeURIComponent(ll1lIlii) + "&actId=" + li1Iiil;else {
        IiIiilIi = "venderId=" + i1IiiIII + "&pin=" + encodeURIComponent(encodeURIComponent(ll1lIlii)) + "&actId=" + li1Iiil;
      }
      break;
    case "getShopInfo":
      IiIiilIi = "venderId=" + i1IiiIII;
      break;
    case "getActivity":
      IiIiilIi = "venderId=" + i1IiiIII + "&actId=" + li1Iiil;
      break;
  }
  let iil1I1iI = {
    "url": "https://" + IiIiIi1i + "-isv.isvjcloud.com/sign/" + iI111il1 + "/" + li1ll1il,
    "body": IiIiilIi,
    "headers": {
      "Accept": "application/json",
      "Referer": "https://" + IiIiIi1i + "-isv.isvjcloud.com/",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": lIllIil1
    }
  };
  return new Promise(ll1iiI1I => {
    $.post(iil1I1iI, (i11Ii, l11Illl, lI1IIi1i) => {
      try {
        if (i11Ii) $.log(JSON.stringify(i11Ii));else {
          lI1IIi1i = JSON.parse(lI1IIi1i);
          if (lI1IIi1i.isOk) {
            switch (li1ll1il) {
              case "getSignInfo":
                if (iI111il1 == "sevenDay/wx") {
                  if (IiIiIi1i === "cjhy") {
                    $.log("活动时间：" + new Date(lI1IIi1i.startTime).toLocaleString() + " 至 " + new Date(lI1IIi1i.endTime).toLocaleString());
                    Date.now() > lI1IIi1i.endTime && (Iill.push(li1Iiil), $.activityEnd = true);
                    if (lI1IIi1i.giftConditions && lI1IIi1i.giftConditions.length !== 0) {
                      $.log("7日签到奖励：");
                      for (let Iiiiil1I of lI1IIi1i.giftConditions) {
                        if (Iiiiil1I.gift == null) continue;
                        $.log(Iiiiil1I.dayNum + "天" + "|" + Iiiiil1I.gift.giftName + "|" + Iiiiil1I.gift.giftTotal + "份|" + (Iiiiil1I.gift.insufficient ? "无了" : "还有"));
                      }
                    }
                  } else {
                    $.log("活动时间：" + lI1IIi1i.actRule.match(/(\d+-\d+-\d+ \d+:\d+ - \d+-\d+-\d+ \d+:\d+)/)[1]);
                    if (Date.now() > new Date(lI1IIi1i.actRule.match(/- (\d+-\d+-\d+ \d+:\d+)/)[1] + ":00")) {
                      Iill.push(li1Iiil);
                      $.activityEnd = true;
                    }
                    if (lI1IIi1i.giftConditions && lI1IIi1i.giftConditions.length !== 0) {
                      $.log("7日签到奖励：");
                      for (let iIl1l1ll of lI1IIi1i.giftConditions) {
                        if (iIl1l1ll.gift == null) continue;
                        $.log(iIl1l1ll.dayNum + "天" + "|" + iIl1l1ll.gift.giftName + "|" + (iIl1l1ll.gift.insufficient ? "无了" : "还有"));
                      }
                    }
                  }
                } else {
                  $.log("累计签到" + lI1IIi1i.signRecord.totalSignNum + "天|连签" + lI1IIi1i.signRecord.contiSignNum + "天");
                }
                break;
              case "getShopInfo":
                $.log("店铺名称：" + lI1IIi1i.shopInfo.shopName);
                break;
              case "getActivity":
                $.log("活动时间：" + lI1IIi1i.act.actTimeStr);
                Date.now() > lI1IIi1i.act.endTime && (Iill.push(li1Iiil), $.activityEnd = true);
                lI1IIi1i.act.wxSignActivityGiftBean.hasGiftEveryDay == "y" && $.log("每日签到奖励：" + lI1IIi1i.act.wxSignActivityGiftBean.gift.giftName + "|" + lI1IIi1i.act.wxSignActivityGiftBean.gift.giftTotal + "份|" + (lI1IIi1i.act.wxSignActivityGiftBean.gift.insufficient ? "无了" : "还有"));
                if (lI1IIi1i.act.wxSignActivityGiftBean.giftConditions && lI1IIi1i.act.wxSignActivityGiftBean.giftConditions.length !== 0) {
                  $.log("连续签到奖励：");
                  for (let l1lI1iIi of lI1IIi1i.act.wxSignActivityGiftBean.giftConditions) {
                    $.log(l1lI1iIi.dayNum + "天" + "|" + l1lI1iIi.gift.giftName + "|" + l1lI1iIi.gift.giftTotal + "份|" + (l1lI1iIi.gift.insufficient ? "无了" : "还有"));
                  }
                }
                break;
            }
          }
        }
      } catch (i1iiiIii) {
        $.logErr(i1iiiIii, l11Illl);
      } finally {
        ll1iiI1I(lI1IIi1i);
      }
    });
  });
}
function l1l1iiI1(lililliI) {
  var I111ll11 = false;
  for (let iil11lli of lajiprizewords) {
    if (lililliI.includes(iil11lli)) {
      I111ll11 = true;
      break;
    }
  }
  return I111ll11;
}
function iIil111i(lii1llll, iiiilIll) {
  return Math.floor(Math.random() * (iiiilIll - lii1llll)) + lii1llll;
}
function ilIIIlI1() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const IliI1IiI = Array.from(new Set($.blacklist.split("&")));
  console.log(IliI1IiI.join("&") + "\n");
  let iiI1ii = IliI1IiI,
    I1l1iiI = [],
    l1lI1Ill = false;
  for (let i1l1i1Ii = 0; i1l1i1Ii < iiliI11I.length; i1l1i1Ii++) {
    let ili1Ii1I = decodeURIComponent(iiliI11I[i1l1i1Ii].match(/pt_pin=([^; ]+)(?=;?)/) && iiliI11I[i1l1i1Ii].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ili1Ii1I) break;
    let lI11l1il = false;
    for (let iIi1iiI of iiI1ii) {
      if (iIi1iiI && iIi1iiI == ili1Ii1I) {
        lI11l1il = true;
        break;
      }
    }
    !lI11l1il && (l1lI1Ill = true, I1l1iiI.splice(i1l1i1Ii, -1, iiliI11I[i1l1i1Ii]));
  }
  if (l1lI1Ill) {
    iiliI11I = I1l1iiI;
  }
}
function ill1ii1i(lI1iIi1, IiiiiIll) {
  IiiiiIll != 0 && lI1iIi1.unshift(lI1iIi1.splice(IiiiiIll, 1)[0]);
}
function l1iIiilI() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(iiliI11I, iiliI11I));
    return;
  }
  console.log("当前已设置白名单：");
  const ill11llI = Array.from(new Set($.whitelist.split("&")));
  console.log(ill11llI.join("&") + "\n");
  let i1ii1iii = [],
    I111lI1i = ill11llI;
  for (let i11II1l in iiliI11I) {
    let lillli = decodeURIComponent(iiliI11I[i11II1l].match(/pt_pin=([^; ]+)(?=;?)/) && iiliI11I[i11II1l].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    I111lI1i.includes(lillli) && i1ii1iii.push(iiliI11I[i11II1l]);
  }
  helpCookiesArr = i1ii1iii;
  if (I111lI1i.length > 1) for (let Iill1I11 in I111lI1i) {
    let l1lil1lI = I111lI1i[I111lI1i.length - 1 - Iill1I11];
    if (!l1lil1lI) continue;
    for (let li1l1l1i in helpCookiesArr) {
      let lilil1iI = decodeURIComponent(helpCookiesArr[li1l1l1i].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[li1l1l1i].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      l1lil1lI == lilil1iI && ill1ii1i(helpCookiesArr, li1l1l1i);
    }
  }
}
function liIllIl1(iil1lII = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", lIll1l1i = 0) {
  return iil1lII.replace(/[xy]/g, function (i1iilIll) {
    var lilillli = Math.random() * 16 | 0,
      iI1lllll = i1iilIll == "x" ? lilillli : lilillli & 3 | 8;
    return lIll1l1i ? uuid = iI1lllll.toString(36).toUpperCase() : uuid = iI1lllll.toString(36), uuid;
  });
}
function IiIlI1II(iilIi1i) {
  const ilIII1ll = {
    "url": "https://api.m.jd.com/?appid=jd_shop_member&functionId=bindWithVender&body=" + JSON.stringify({
      "venderId": iilIi1i,
      "shopId": iilIi1i,
      "bindByVerifyCodeFlag": 1
    }),
    "headers": {
      "Cookie": lIllIil1,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
      "Referer": "https://shopmember.m.jd.com/"
    }
  };
  return new Promise(i111111I => {
    $.post(ilIII1ll, (iiIiIl11, i111Il1I, ili1lIII) => {
      try {
        if (iiIiIl11) $.logErr(iiIiIl11);else {
          if (ili1lIII) {
            ili1lIII = JSON.parse(ili1lIII);
            if (ili1lIII.busiCode == "0") {
              process.stdout.write(ili1lIII.message + "\n");
              if (ili1lIII.result && ili1lIII.result.giftInfo) for (let il1ilIii of lIIII1il.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + il1ilIii.discountString + il1ilIii.prizeName + il1ilIii.secondLineDesc);
              }
            } else process.stdout.write(ili1lIII.message + "\n");
          } else $.log("京东返回了空数据");
        }
      } catch (liII1III) {
        $.logErr(liII1III);
      } finally {
        i111111I(ili1lIII.message);
      }
    });
  });
}
function IiII1lI1() {
  return new Promise(li1iIIi => {
    const ilIlIIil = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": lIllIil1,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(ilIlIIil, (l11I111, li1lIIIi, llIlIi1) => {
      try {
        if (llIlIi1) {
          llIlIi1 = JSON.parse(llIlIi1);
          if (llIlIi1.islogin === "1") {} else llIlIi1.islogin === "0" && ($.isLogin = false);
        }
      } catch (l1Iii1Ii) {
        console.log(l1Iii1Ii);
      } finally {
        li1iIIi();
      }
    });
  });
}