/*
活动名称：店铺签到 · 超级无线

变量：COOKIE_NUM='' //运行账号数量
WX_NOTIFY='true' //开启通知  默认不开启
jd_sevenDay_activityUrl='' // 活动链接，支持市面上大部分签到，自测 PS：瞎编的，LZ CJ的没问题

新增：签到详情，自行筛选  修正

//可能也会有很多毛病，请反馈

cron: 7 7 7 7 7 jd_sevenDayjk.js
*/
const Env=require('./utils/Env.js');
const $ = new Env('超级无线店铺签到-监控版');
const IIIiIIlI = $.isNode() ? require("./jdCookie.js") : "",
  Iliiili = $.isNode() ? require("./sendNotify") : "",
  liiiI1l = require("./function/krgetToken");
let l1111III = process.env.jd_sevenDay_activityUrl ? process.env.jd_sevenDay_activityUrl : "",
  iII1I1lI = process.env.WX_NOTIFY ? process.env.WX_NOTIFY : "false",
  IiiIIilI = [],
  lil1II1I = "";
allMessage = "";
let liIiI11i = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  lii11IIl = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  lIIIllli = "",
  iI1Illll = "";
$.whitelist = process.env.jd_wx_whitelist || lIIIllli;
$.blacklist = process.env.jd_wx_blacklist || iI1Illll;
i11l1iiI();
IliI1Iii();
$.msggetActivity = "";
if (l1111III) {
  $.activityId = Iiili1l("" + l1111III, "activityId");
  if (l1111III.includes("lzkj")) {
    if (liIiI11i === "false") {
      console.log("\n❌  已设置全局关闭LZ相关活动\n");
      return;
    } else $.domain = l1111III.match(/https?:\/\/([^/]+)/)[1];
  } else {
    if (l1111III.includes("cjhy")) {
      if (lii11IIl === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
        return;
      } else $.domain = l1111III.match(/https?:\/\/([^/]+)/)[1];
    } else $.domain = l1111III.match(/https?:\/\/([^/]+)/)[1];
  }
  $.domain_mode = null;
  if ($.domain.includes("cjhy")) $.domain_mode = "cjhy";
  if ($.domain.includes("lzkj")) $.domain_mode = "lzkj";
  if ($.domain.includes("lorealjdcampaign")) $.domain_mode = "lorealjdcampaign";
  $.domain_mode == null && console.log("请填写正确的活动链接");
} else console.log("请填写活动链接");
$.domain.includes("lorealjdcampaign") ? domains = "https://" + $.domain + "/prod/cc/cjwx" : domains = "https://" + $.domain;
let lIi1iI1 = {},
  Ii1iI1l1 = 7;
process.env.COOKIE_NUM && process.env.COOKIE_NUM != 7 && (Ii1iI1l1 = process.env.COOKIE_NUM);
if ($.isNode()) {
  Object.keys(IIIiIIlI).forEach(i11i11 => {
    IiiIIilI.push(IIIiIIlI[i11i11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let lil11IlI = $.getdata("CookiesJD") || "[]";
  lil11IlI = JSON.parse(lil11IlI);
  IiiIIilI = lil11IlI.map(l1lliIi => l1lliIi.cookie);
  IiiIIilI.reverse();
  IiiIIilI.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  IiiIIilI.reverse();
  IiiIIilI = IiiIIilI.filter(iIIiill => !!iIIiill);
}
!(async () => {
  if (!$.activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("是否推送通知 【" + iII1I1lI + "】 \n");
  console.log("活动入口：" + l1111III);
  if (!IiiIIilI[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let Illi11l = 0; Illi11l < Ii1iI1l1; Illi11l++) {
    if (IiiIIilI[Illi11l]) {
      lil1II1I = IiiIIilI[Illi11l];
      originCookie = IiiIIilI[Illi11l];
      newCookie = "";
      $.UserName = decodeURIComponent(lil1II1I.match(/pt_pin=(.+?);/) && lil1II1I.match(/pt_pin=(.+?);/)[1]);
      $.index = Illi11l + 1;
      $.isLogin = true;
      $.nickName = "";
      $.msg = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await Iliiili.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.bean = 0;
      $.ADID = i1IiiI("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = i1IiiI("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      await lIIIllIi();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag) {
        break;
      }
    }
  }
  $.isNode() && iII1I1lI == "true" && (await Iliiili.sendNotify("" + $.name, allMessage + "\n" + $.msggetActivity + "\n【活动入口】：" + l1111III));
})().catch(lIIl1l11 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lIIl1l11 + "!", "");
}).finally(() => {
  $.done();
});
async function lIIIllIi() {
  $.signStop = false;
  $.Token = "";
  switch ($.domain_mode) {
    case "lzkj":
      await lI1IiII();
      break;
    case "cjhy":
    case "lorealjdcampaign":
      await Il1iiIll();
      break;
  }
  if ($.hasEnd || $.activityEnd || $.outFlag) return;
  await $.wait(500);
  if ($.index == 1) {
    await lII11Ill("/customer/getSimpleActInfoVo", "activityId=" + $.activityId);
    if (!$.venderId) {
      $.hasEnd = true;
      console.log("\ngetSimpleActInfoVo 未能获取店铺信息\n");
      return;
    }
  }
  $.Token = await liiiI1l(originCookie, domains);
  if ($.Token) {
    await iIiIIii1();
    if (!$.secretPin) {
      console.log("获取[Pin]失败！");
      return;
    }
    switch ($.domain_mode) {
      case "lzkj":
      case "lorealjdcampaign":
        $.FormatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.FormatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  } else {
    console.log("获取[token]失败！");
    return;
  }
  if ($.secretPin) {
    if ($.index === 1) {
      if ($.venderId) {
        switch ($.domain_mode) {
          case "lzkj":
            await I11ii11l("/sign/wx/getShopInfo", "venderId=" + $.venderId);
            break;
          case "cjhy":
            await I11ii11l("/sign/wx/getShopInfo", "venderId=" + $.venderId);
            break;
          case "lorealjdcampaign":
            break;
        }
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      }
      if ($.venderId) {
        if (l1111III.indexOf("/sign/sevenDay/signActivity") != -1) {
          await i11iiIi1("/sign/sevenDay/wx/getSignInfo", "venderId=" + $.venderId + "&actId=" + $.activityId + "&pin=" + $.FormatPin);
        } else {
          if (l1111III.indexOf("/sign/signActivity") != -1) await IiIIlill("/sign/wx/getActivity", "venderId=" + $.venderId + "&actId=" + $.activityId);else l1111III.indexOf("lorealjdcampaign-rc.isvjcloud.com/prod/cc/cjwx/sign/signActivity2") != -1 && console.log("错误 ➜  暂不支持此类活动的详细数据");
        }
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      }
    }
    console.log("签到 ➜  " + $.activityId);
    if ($.venderId) {
      switch ($.domain_mode) {
        case "lzkj":
          await l1IiIi1I("https://lzkj-isv.isvjd.com/common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1111III) + "&subType=app&adSource=");
          break;
        case "cjhy":
          await l1IiIi1I("https://cjhy-isv.isvjcloud.com/common/accessLog", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1111III) + "&subType=app&adSource=");
          break;
        case "lorealjdcampaign":
          await l1IiIi1I("https://lorealjdcampaign-rc.isvjcloud.com/prod/cc/cjwx/common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1111III) + "&subType=app&adSource=");
          break;
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    for (let lIIiill1 = 0; lIIiill1 < 20; lIIiill1++) {
      if (l1111III.indexOf("/sign/sevenDay/signActivity") != -1) await il11i1("/sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + $.FormatPin);else {
        if (l1111III.indexOf("/sign/signActivity") != -1) await IIlili1l("/sign/wx/signUp", "actId=" + $.activityId + "&pin=" + $.FormatPin);else l1111III.indexOf("lorealjdcampaign-rc.isvjcloud.com/prod/cc/cjwx/sign/signActivity2") != -1 && (await IIlili1l("/sign/wx/signUp", "actId=" + $.activityId + "&pin=" + $.FormatPin));
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      if ($.signStop) break;
    }
  } else $.log("没有成功获取到用户信息");
}
function lII11Ill() {
  return new Promise(i11II11l => {
    $.post(I1Ii1I("/customer/getSimpleActInfoVo", "activityId=" + $.activityId), async (ii1li11l, Il1i11Il, I1il11li) => {
      try {
        ii1li11l ? (console.log("" + $.toStr(ii1li11l)), console.log("getSimpleActInfoVo API请求失败，请检查网路重试")) : (I1il11li && lii1i1Ii(I1il11li) && (I1il11li = JSON.parse(I1il11li), I1il11li.data ? ($.shopId = I1il11li.data.shopId, $.venderId = I1il11li.data.venderId, $.activityType = I1il11li.data.activityType) : console.log("异常：" + JSON.stringify(I1il11li))), Il1i11Il.status == 200 && I111Ii1l(Il1i11Il));
      } catch (I1ii1Ii) {
        $.logErr(I1ii1Ii, Il1i11Il);
      } finally {
        i11II11l();
      }
    });
  });
}
function IiIIlill(l11i1l1I, Il1I1I1) {
  return new Promise(iIlillI => {
    $.post(I1Ii1I(l11i1l1I, Il1I1I1), async (Ili1l1i1, IIII1Iil, iliiI11i) => {
      try {
        if (Ili1l1i1) {
          console.log(JSON.stringify(Ili1l1i1));
          console.log("getActivity 请求失败，请检查网路重试");
        } else {
          if (lii1i1Ii(iliiI11i)) {
            iliiI11i = JSON.parse(iliiI11i);
            if (iliiI11i.isOk) {
              console.log("活动时间 ➜  " + iliiI11i.act.actTimeStr);
              $.msggetActivity += "\n活动时间 ➜  " + iliiI11i.act.actTimeStr + "\n";
              console.log("活动规则 ➜  \n" + iliiI11i.act.actRule);
              $.msggetActivity += "\n活动规则 ➜  \n" + iliiI11i.act.actRule + "\n";
              $.giftConditions = iliiI11i.act.wxSignActivityGiftBean.giftConditions || [];
              iliiI11i.act.wxSignActivityGiftBean.gift != null && (console.log("\n每日签到奖品 ➜  " + iliiI11i.act.wxSignActivityGiftBean.gift.giftName + "  是否发完：" + iliiI11i.act.wxSignActivityGiftBean.gift.insufficient), $.msggetActivity += "\n每日签到奖品 ➜  " + iliiI11i.act.wxSignActivityGiftBean.gift.giftName + "  是否发完：" + iliiI11i.act.wxSignActivityGiftBean.gift.insufficient + "\n");
              console.log("\n连续签到奖品 ➜");
              $.msggetActivity += "\n连续签到奖品 ➜\n";
              for (const l1lliIll of $.giftConditions) {
                l1lliIll.gift != null && ($.insufficient = l1lliIll?.["gift"]?.["insufficient"] || false, console.log("奖品：" + l1lliIll?.["gift"]?.["giftName"] + "  数量：" + l1lliIll?.["gift"]?.["giftTotal"] + "  签到天数：" + l1lliIll?.["dayNum"] + "  是否发完：" + $.insufficient), $.msggetActivity += "奖品：" + l1lliIll?.["gift"]?.["giftName"] + "  数量：" + l1lliIll?.["gift"]?.["giftTotal"] + "  签到天数：" + l1lliIll?.["dayNum"] + "  是否发完：" + $.insufficient + "\n");
              }
              console.log("");
            } else {
              if (!iliiI11i.msg.includes("火爆") && !iliiI11i.msg.includes("擦肩")) {
                console.log("活动详情 ➜  暂时未能获取到活动数据");
                $.signStop = true;
              }
              for (let IllI11li of ["未开始", "结束", "不存在", "不在"]) {
                if (iliiI11i.msg.includes(IllI11li)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          }
          IIII1Iil.status == 200 && I111Ii1l(IIII1Iil);
        }
      } catch (lil11111) {
        $.logErr(lil11111, IIII1Iil);
      } finally {
        iIlillI();
      }
    });
  });
}
function i11iiIi1(iIl1I11l, IiIilI1) {
  return new Promise(l11Ilili => {
    $.post(I1Ii1I(iIl1I11l, IiIilI1), async (li11Ii1i, lIi1lllI, lilil1) => {
      try {
        if (li11Ii1i) {
          console.log(JSON.stringify(li11Ii1i));
          console.log("getSignInfo 请求失败，请检查网路重试");
        } else {
          if (lii1i1Ii(lilil1)) {
            lilil1 = JSON.parse(lilil1);
            if (lilil1.isOk) {
              console.log("\n活动规则 ➜  \n" + lilil1.actRule);
              $.msggetActivity += "\n活动规则 ➜  \n" + lilil1.actRule + "\n";
              $.giftConditions = lilil1.giftConditions || [];
              console.log("\n7日签到奖品 ➜");
              $.msggetActivity += "\n7日签到奖品 ➜\n";
              for (const ii1I1l11 of $.giftConditions) {
                ii1I1l11.gift != null && ($.insufficient = ii1I1l11?.["gift"]?.["insufficient"] || false, console.log("奖品：" + ii1I1l11?.["gift"]?.["giftName"] + "  签到天数：" + ii1I1l11?.["dayNum"] + "  是否发完：" + $.insufficient), $.msggetActivity += "奖品：" + ii1I1l11?.["gift"]?.["giftName"] + "  签到天数：" + ii1I1l11?.["dayNum"] + "  是否发完：" + $.insufficient + "\n");
              }
              console.log("");
            } else {
              !lilil1.msg.includes("火爆") && !lilil1.msg.includes("擦肩") && (console.log("活动详情 ➜  暂时未能获取到活动数据"), $.signStop = true);
              for (let l1Ii1lI of ["未开始", "结束", "不存在", "不在"]) {
                if (lilil1.msg.includes(l1Ii1lI)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          }
          lIi1lllI.status == 200 && I111Ii1l(lIi1lllI);
        }
      } catch (I1IlI1l1) {
        $.logErr(I1IlI1l1, lIi1lllI);
      } finally {
        l11Ilili();
      }
    });
  });
}
function I11ii11l(l1ilIiii, llliII1) {
  return new Promise(Ii11IiIi => {
    $.post(I1Ii1I(l1ilIiii, llliII1), async (iliiI1i1, IlIIiIii, ilill1li) => {
      try {
        if (iliiI1i1) {
          console.log(JSON.stringify(iliiI1i1));
          console.log("getShopInfo 请求失败，请检查网路重试");
        } else {
          if (lii1i1Ii(ilill1li)) {
            ilill1li = JSON.parse(ilill1li);
            if (ilill1li.isOk) {
              console.log("店铺名字 ➜  " + ilill1li.shopInfo.shopName + "(" + ilill1li.shopInfo.userId + ")");
              $.msggetActivity += "\n店铺名字 ➜  " + ilill1li.shopInfo.shopName + "(" + ilill1li.shopInfo.userId + ")" + "\n";
            } else {
              !ilill1li.msg.includes("火爆") && !ilill1li.msg.includes("擦肩") && (console.log("结果 ➜  " + ilill1li.msg), $.signStop = true);
              for (let IiiI11l of ["未开始", "结束", "不存在", "不在"]) {
                if (ilill1li.msg.includes(IiiI11l)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          }
          if (IlIIiIii.status == 200) {
            I111Ii1l(IlIIiIii);
          }
        }
      } catch (iiiiliil) {
        $.logErr(iiiiliil, IlIIiIii);
      } finally {
        Ii11IiIi();
      }
    });
  });
}
function il11i1(liilIii, I1i1Il1i) {
  return new Promise(Iii11i1l => {
    $.post(I1Ii1I(liilIii, I1i1Il1i), async (ll1Iil1I, lli11l11, i111IiIl) => {
      try {
        if (ll1Iil1I) {
          console.log(JSON.stringify(ll1Iil1I));
          console.log("sign 请求失败，请检查网路重试");
        } else {
          if (lii1i1Ii(i111IiIl)) {
            i111IiIl = JSON.parse(i111IiIl);
            if (i111IiIl.isOk) {
              $.signStop = true;
              console.log("结果 ➜  签到成功");
              $.msg = "结果 ➜  签到成功";
              if (i111IiIl.signResult.gift != null) {
                console.log("获得 -> " + i111IiIl.signResult.gift.giftName + " 🎉");
                $.msg = "获得 -> " + i111IiIl.signResult.gift.giftName + " 🎉";
                if (i111IiIl.signResult.gift.giftType == 7 && i111IiIl.addressId) {
                  generateId = i111IiIl.addressId;
                  prizeName = i111IiIl.signResult.gift.giftName;
                  console.log(i111IiIl);
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  console.log("参考价值：" + i111IiIl.signResult.gift.priceInfo + "（元）");
                  console.log("预览图片：" + i111IiIl.signResult.gift.showImage);
                } else i111IiIl.signResult.gift.giftType == 13 && $.isNode() && (await Iliiili.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\n" + $.activityUrl));
              }
            } else {
              !i111IiIl.msg.includes("火爆") && !i111IiIl.msg.includes("擦肩") && (console.log("结果 ➜  " + i111IiIl.msg), $.msg = "结果 ➜  " + i111IiIl.msg, $.signStop = true);
              for (let lli1ilIl of ["未开始", "结束", "不存在", "不在"]) {
                if (i111IiIl.msg.includes(lli1ilIl)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          }
          lli11l11.status == 200 && I111Ii1l(lli11l11);
        }
      } catch (IlI1I1i) {
        $.logErr(IlI1I1i, lli11l11);
      } finally {
        Iii11i1l();
      }
    });
  });
}
function IIlili1l(i11Ii1iI, IllIl1ll) {
  return new Promise(l1iIIIIl => {
    $.post(I1Ii1I(i11Ii1iI, IllIl1ll), async (llIIilII, l1I11I11, lI1i1I1i) => {
      try {
        if (llIIilII) {
          console.log(JSON.stringify(llIIilII));
          console.log("signUp 请求失败，请检查网路重试");
        } else {
          if (lii1i1Ii(lI1i1I1i)) {
            lI1i1I1i = JSON.parse(lI1i1I1i);
            if (lI1i1I1i.isOk) {
              $.signStop = true;
              console.log("结果 ➜  签到成功");
              $.msg = "结果 ➜  签到成功";
              if (lI1i1I1i.gift != null) {
                console.log("获得 -> " + lI1i1I1i.gift.giftName + " 🎉");
                $.msg = "获得 -> " + lI1i1I1i.gift.giftName + " 🎉";
                if (lI1i1I1i.gift.giftType == 7 && lI1i1I1i.addressId) {
                  generateId = lI1i1I1i.addressId;
                  prizeName = lI1i1I1i.gift.giftName;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  console.log("参考价值：" + lI1i1I1i.gift.priceInfo + "（元）");
                  console.log("预览图片：" + lI1i1I1i.gift.showImage);
                } else lI1i1I1i.gift.giftType == 13 && $.isNode() && (await Iliiili.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + drawInfo.name + "\n\n" + $.activityUrl));
              }
            } else {
              !lI1i1I1i.msg.includes("火爆") && !lI1i1I1i.msg.includes("擦肩") && (console.log("结果 ➜  " + lI1i1I1i.msg), $.msg = "结果 ➜  " + lI1i1I1i.msg, $.signStop = true);
              for (let liII1i1i of ["未开始", "结束", "不存在", "不在"]) {
                if (lI1i1I1i.msg.includes(liII1i1i)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          }
          l1I11I11.status == 200 && I111Ii1l(l1I11I11);
        }
      } catch (lii1lil1) {
        $.logErr(lii1lil1, l1I11I11);
      } finally {
        l1iIIIIl();
      }
    });
  });
}
function l1IiIi1I(lIIi11Ii, lIi1111I) {
  return new Promise(async llIIlllI => {
    const i1i1Il1 = {
      "url": lIIi11Ii,
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": $.domain,
        "Origin": domains,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": l1111III,
        "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": lIi1111I
    };
    $.post(i1i1Il1, (IlI1iIl, ll1IIllI, l11l1i) => {
      try {
        if (IlI1iIl) {
          console.log(JSON.stringify(IlI1iIl));
          console.log("accessLogWithAD API请求失败，请检查网路重试");
        } else {
          if (ll1IIllI.status == 200) {
            I111Ii1l(ll1IIllI);
          }
        }
      } catch (iIIi1111) {
        $.logErr(iIIi1111, ll1IIllI);
      } finally {
        llIIlllI();
      }
    });
  });
}
function iIiIIii1() {
  return new Promise(i1I1lil1 => {
    let IiiiiIli = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP";
    $.post(I1Ii1I("/customer/getMyPing", IiiiiIli), async (i11lliI1, ilIilII1, lIIliIl1) => {
      try {
        if (i11lliI1) {
          ilIilII1 && typeof ilIilII1.statusCode != "undefined" && ilIilII1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), $.outFlag = true);
          console.log(JSON.stringify(i11lliI1));
          console.log("getMyPing API请求失败，请检查网路重试");
        } else {
          ilIilII1.status == 200 && I111Ii1l(ilIilII1);
          if (lii1i1Ii(lIIliIl1)) {
            lIIliIl1 = JSON.parse(lIIliIl1);
            if (lIIliIl1.result && lIIliIl1.data) {
              $.secretPin = lIIliIl1.data.secretPin;
              $.nickName = lIIliIl1.data.nickname;
              $.AUTH_C_USER = $.secretPin;
            } else {}
          }
        }
      } catch (lIiI11II) {
        $.logErr(lIiI11II, ilIilII1);
      } finally {
        i1I1lil1();
      }
    });
  });
}
function I1Ii1I(Ii11ilii, iilll1I) {
  return {
    "url": "" + domains + Ii11ilii,
    "body": iilll1I,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": l1111III,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function I111Ii1l(l1i1iiIl) {
  if (l1i1iiIl) {
    if (l1i1iiIl.headers["set-cookie"]) {
      lil1II1I = originCookie + ";";
      for (let iiIl11i of l1i1iiIl.headers["set-cookie"]) {
        lIi1iI1[iiIl11i.split(";")[0].substr(0, iiIl11i.split(";")[0].indexOf("="))] = iiIl11i.split(";")[0].substr(iiIl11i.split(";")[0].indexOf("=") + 1);
      }
      for (const Iiilil of Object.keys(lIi1iI1)) {
        lil1II1I += Iiilil + "=" + lIi1iI1[Iiilil] + ";";
      }
      activityCookie = lil1II1I;
    }
  }
}
function iI1lI1iI() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function lI1IiII() {
  return new Promise(I11iIlii => {
    let lil1ilIi = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(lil1ilIi, async (lI1111ii, IIII11Ii, llli1Il1) => {
      try {
        if (lI1111ii) {
          IIII11Ii && typeof IIII11Ii.statusCode != "undefined" && IIII11Ii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(lI1111ii));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let i1lI1II = llli1Il1.match(/(活动已经结束)/) && llli1Il1.match(/(活动已经结束)/)[1] || "";
          i1lI1II && ($.activityEnd = true, console.log("活动已结束"), $.msggetActivity += "\n活动已结束\n");
          IIII11Ii.status == 200 && I111Ii1l(IIII11Ii);
        }
      } catch (I1IlI1ll) {
        $.logErr(I1IlI1ll, IIII11Ii);
      } finally {
        I11iIlii();
      }
    });
  });
}
function Il1iiIll() {
  return new Promise(IIil1li1 => {
    $.get({
      "url": l1111III,
      "headers": {
        "user-agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    }, (i1Ii1lii, iIii11ii, IiI11l11) => {
      try {
        if (i1Ii1lii) {
          iIii11ii && typeof iIii11ii.statusCode != "undefined" && iIii11ii.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true);
          console.log(i1Ii1lii);
        } else {
          let il1i1iii = IiI11l11.match(/(活动已经结束)/) && IiI11l11.match(/(活动已经结束)/)[1] || "";
          il1i1iii && ($.activityEnd = true, console.log("活动已结束"), $.msggetActivity += "\n活动已结束\n");
          iIii11ii.status == 200 && I111Ii1l(iIii11ii);
        }
      } catch (llIiilll) {
        console.log(llIiilll);
      } finally {
        IIil1li1();
      }
    });
  });
}
function lI11IiIl(IIIli, l1i1iI) {
  return Math.floor(Math.random() * (l1i1iI - IIIli)) + IIIli;
}
function IliI1Iii() {
  if ($.blacklist == "") return;
  const i1iIl1l1 = Array.from(new Set($.blacklist.split("&")));
  let i1lill1I = i1iIl1l1,
    l1liIll = [],
    lilIlI11 = false;
  for (let iliIli1i = 0; iliIli1i < IiiIIilI.length; iliIli1i++) {
    let IiiIliii = decodeURIComponent(IiiIIilI[iliIli1i].match(/pt_pin=([^; ]+)(?=;?)/) && IiiIIilI[iliIli1i].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IiiIliii) break;
    let i1i11lli = false;
    for (let i1l1Iil of i1lill1I) {
      if (i1l1Iil && i1l1Iil == IiiIliii) {
        i1i11lli = true;
        break;
      }
    }
    !i1i11lli && (lilIlI11 = true, l1liIll.splice(iliIli1i, -1, IiiIIilI[iliIli1i]));
  }
  if (lilIlI11) IiiIIilI = l1liIll;
}
function IlIIllii(l1ilIiII, IIlillIl) {
  IIlillIl != 0 && l1ilIiII.unshift(l1ilIiII.splice(IIlillIl, 1)[0]);
}
function i11l1iiI() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(IiiIIilI, IiiIIilI));
    return;
  }
  console.log("当前已设置白名单：");
  const l1iIii1l = Array.from(new Set($.whitelist.split("&")));
  let Il11i11i = [],
    IIIlII1I = l1iIii1l;
  for (let iiIili1I in IiiIIilI) {
    let I1i1Iili = decodeURIComponent(IiiIIilI[iiIili1I].match(/pt_pin=([^; ]+)(?=;?)/) && IiiIIilI[iiIili1I].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    IIIlII1I.includes(I1i1Iili) && Il11i11i.push(IiiIIilI[iiIili1I]);
  }
  helpCookiesArr = Il11i11i;
  if (IIIlII1I.length > 1) {
    for (let liIl1ilI in IIIlII1I) {
      let Il1111i1 = IIIlII1I[IIIlII1I.length - 1 - liIl1ilI];
      if (!Il1111i1) continue;
      for (let i1ilIII1 in helpCookiesArr) {
        let II1i1iI1 = decodeURIComponent(helpCookiesArr[i1ilIII1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[i1ilIII1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        Il1111i1 == II1i1iI1 && IlIIllii(helpCookiesArr, i1ilIII1);
      }
    }
  }
}
function i1IiiI(l1ilI1i = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", lIIII1i1 = 0) {
  return l1ilI1i.replace(/[xy]/g, function (iI1l11l) {
    var i1I1Il1I = Math.random() * 16 | 0,
      lli1IIil = iI1l11l == "x" ? i1I1Il1I : i1I1Il1I & 3 | 8;
    if (lIIII1i1) uuid = lli1IIil.toString(36).toUpperCase();else {
      uuid = lli1IIil.toString(36);
    }
    return uuid;
  });
}
function lii1i1Ii(IIl1ilI) {
  if (!IIl1ilI) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(IIl1ilI) == "object") return true;
  } catch (iilI1li1) {
    return console.log(iilI1li1), false;
  }
}
function Iiili1l(lI1iiiII, lllI11Il) {
  let ililIII = new RegExp("(^|[&?])" + lllI11Il + "=([^&]*)(&|$)"),
    il1Ii1i = lI1iiiII.match(ililIII);
  if (il1Ii1i != null) {
    return unescape(il1Ii1i[2]);
  }
  return "";
}