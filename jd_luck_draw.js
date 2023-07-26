/*
活动名称：店铺抽奖 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/lzclient/<活动id>/cjwx/common/entry.html?activityId=<活动id>&gameType=<玩法类型>
         https://lzkj-isv.isvjd.com/wxDrawActivity/activity/activity?activityId=<活动id>
         https://cjhy-isv.isvjcloud.com/wxDrawActivity/activity/activity?activityId=<活动id>
环境变量：LUCK_DRAW_URL // 活动链接
         LUCK_DRAW_OPENCARD // 是否开卡，默认不开卡
         LUCK_DRAW_NOTIFY // 是否推送通知，默认不推送

注：只有在没有抽奖次数的情况下才会去做任务获取

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺抽奖（超级无线/超级会员）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let activityUrl = process.env.LUCK_DRAW_URL ? process.env.LUCK_DRAW_URL : "",
  isNotify = process.env.LUCK_DRAW_NOTIFY === "true" ? true : false,
  openCard = process.env.LUCK_DRAW_OPENCARD === "true" ? true : false,
  lz_cookie = {},
  activityCookie = "",
  cookiesArr = [],
  cookie = "",
  allMessage = "";
messageTitle = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(i1l11Iil => {
    cookiesArr.push(jdCookieNode[i1l11Iil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(llI1li1i => llI1li1i.cookie)].filter(III1Iili => !!III1Iili);
if (activityUrl) {
  $.activityId = getQueryString("" + activityUrl, "activityId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
  $.domain_mode = null;
  if ($.domain.includes("cjhy")) $.domain_mode = "cjhy";
  $.domain.includes("lzkj") && ($.domain_mode = "lzkj", $.domain = "lzkj-isv.isvjd.com");
  if ($.domain_mode == null) {
    console.log("❌ 请填写正确的活动链接！");
    return;
  }
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!$.activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityEnd = false;
  $.venderId = null;
  $.outFlag = false;
  $.prizeList = "";
  for (let IliIIIll = 0; IliIIIll < cookiesArr.length; IliIIIll++) {
    if (cookiesArr[IliIIIll]) {
      cookie = cookiesArr[IliIIIll];
      originCookie = cookiesArr[IliIIIll];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = IliIIIll + 1;
      $.isLogin = true;
      $.nickName = "";
      $.msg = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await Main();
      $.msg != "" && (allMessage += "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + ("：" + $.msg + "\n"));
      if ($.outFlag || $.activityEnd || $.hasEnd) break;
      await $.wait(2000);
    }
  }
  allMessage && $.isNode() && isNotify && (await notify.sendNotify("" + $.name, allMessage + "\n【活动奖品】：" + $.prizeList + "\n【活动地址】：" + activityUrl));
})().catch(IiiI11 => {
  $.log("", " " + $.name + ", 失败! 原因: " + IiiI11 + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  $.drawTimes = 0;
  $.Token = "";
  $.secretPin = "";
  $.needOpenCard = false;
  $.drawStop = false;
  $.needFollow = true;
  $.hasFollow = false;
  $.isOpenCard = false;
  switch ($.domain_mode) {
    case "lzkj":
      await getFirstLZCK();
      break;
    case "cjhy":
      await getFirstCK();
      break;
  }
  if ($.outFlag) return;
  await $.wait(500);
  if ($.index == 1) {
    await getSimpleActInfoVo();
    if ($.activityEnd) {
      console.log("活动不存在或已经结束！");
      return;
    }
    if (!$.venderId) {
      $.outFlag = true;
      console.log("getSimpleActInfoVo 未能获取店铺信息");
      return;
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        break;
      default:
        console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
        $.outFlag = true;
        return;
    }
  }
  $.Token = await getToken(originCookie, domains);
  if ($.Token) {
    await getMyPing();
    if ($.outFlag) return;
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      $.msg = "获取用户鉴权信息失败";
      return;
    }
    switch ($.domain_mode) {
      case "lzkj":
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
  switch ($.domain_mode) {
    case "lzkj":
      await accessLogWithAD();
      break;
    case "cjhy":
      await accessLog();
      break;
  }
  $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  if (openCard) {
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        switch ($.domain_mode) {
          case "lzkj":
            await getOpenCardStatus("/wxCommonInfo/getActMemberInfo", "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin);
            break;
          case "cjhy":
            await getOpenCardStatus("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
            break;
        }
        break;
      case 26:
        switch ($.domain_mode) {
          case "lzkj":
            await getOpenCardStatus("/crmCard/common/coupon/getOpenCardStatus", "venderId=" + $.venderId + "&pin=" + $.FormatPin);
            break;
          case "cjhy":
            await getOpenCardStatus("/common/joinConfig/check", "venderId=" + $.venderId + "&pin=" + $.FormatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId);
            break;
        }
        break;
      case 124:
      case 125:
      case 128:
      case 129:
        await getOpenCardStatus("/common/joinConfig/check", "venderId=" + $.venderId + "&pin=" + $.FormatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId);
        break;
    }
    if (!$.isOpenCard) {
      $.errorJoinShop = "";
      $.joinVenderId = $.venderId;
      for (let i1iilIi1 = 0; i1iilIi1 < Array(2).length; i1iilIi1++) {
        if (i1iilIi1 > 0) console.log("第" + i1iilIi1 + "次 重新开卡");
        await joinShop();
        await $.wait(500);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
      }
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("❌ 开卡失败，重新执行脚本");
    }
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  }
  var IIIIlii1 = "";
  switch ($.activityType) {
    case 3:
    case 4:
    case 11:
    case 12:
    case 13:
      IIIIlii1 = await getActivityContent("/wxDrawActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
      break;
    case 26:
      IIIIlii1 = await getActivityContent("/wxPointDrawActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
      break;
    case 124:
      IIIIlii1 = await getActivityContent("/wxScratchActive/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
      break;
    case 125:
      IIIIlii1 = await getActivityContent("/wxPointBlindBox/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
      break;
    case 128:
      IIIIlii1 = await getActivityContent("/wxGashaponActive/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
      break;
    case 129:
      IIIIlii1 = await getActivityContent("/wxDollGrabbing/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
      break;
  }
  if ($.hasEnd) {
    console.log("未能获取到活动信息！");
    return;
  }
  $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  if (IIIIlii1) {
    if (IIIIlii1.result && IIIIlii1.data) {
      $.canDrawTimes = IIIIlii1.data.canDrawTimes;
      $.content = IIIIlii1.data.content;
      $.needFollow = IIIIlii1.data.needFollow ? IIIIlii1.data.needFollow : false;
      $.hasFollow = IIIIlii1.data.hasFollow ? IIIIlii1.data.hasFollow : false;
      $.endTime = IIIIlii1.data.endTime;
      if (Date.now() > $.endTime) {
        console.log("活动已经结束~");
        $.activityEnd = true;
        return;
      }
      if ($.index == 1) {
        let lliIll11 = "",
          Ii1IIII1 = "";
        for (let liiilll = 0; liiilll < $.content.length; liiilll++) {
          Ii1IIII1 = $.content[liiilll].name;
          lliIll11 = $.content[liiilll].id;
          if (lliIll11 == 0) {
            $.prizeList += "谢谢参与";
            break;
          } else liiilll != $.content.length - 1 ? $.prizeList += Ii1IIII1 + "，" : $.prizeList += "" + Ii1IIII1;
        }
        await getShopInfo();
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
        console.log("店铺名称：" + ($.shopName || "未知") + "\n店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + $.prizeList + "\n");
      }
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          if ($.needFollow && !$.hasFollow) {
            switch ($.domain_mode) {
              case "lzkj":
                await followShop("/wxActionCommon/followShop", "userId=" + $.venderId + "&buyerNick=" + $.FormatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType);
                break;
              case "cjhy":
                await followShop("/wxActionCommon/newFollowShop", "venderId=" + $.venderId + "&activityId=" + $.activityId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
                break;
            }
            if ($.needOpenCard) {
              console.log("活动仅限店铺会员参与哦~");
              $.msg = "活动仅限店铺会员参与";
              return;
            }
            $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
          }
          break;
        case 26:
        case 124:
          switch ($.domain_mode) {
            case "lzkj":
              await followShop("/wxActionCommon/followShop", "userId=" + $.venderId + "&buyerNick=" + $.FormatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType);
              break;
            case "cjhy":
              await followShop("/wxActionCommon/newFollowShop", "venderId=" + $.venderId + "&activityId=" + $.activityId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
              break;
          }
          break;
      }
      if ($.canDrawTimes == 0 && $.activityType != 26) {
        $.followTaskInfo = null;
        await getGiveContent("/wxDrawActivity/getGiveContent", "pin=" + $.FormatPin + "&activityId=" + $.activityId);
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
        if ($.followTaskInfo != null) {
          var lI11ii11 = $.followTaskInfo.skuIdsList,
            lillIII1 = $.followTaskInfo.followTimes,
            iIili1II = $.followTaskInfo.hasGetGiveTimes,
            Il1i1iII = $.followTaskInfo.giveTimes,
            IIiiI1II = $.followTaskInfo.maxGiveTimes,
            lllIliI = Math.trunc(lI11ii11.length / lillIII1 * Il1i1iII);
          if (iIili1II < IIiiI1II && iIili1II < lllIliI) {
            var llIi11l1 = (IIiiI1II - iIili1II) * lillIII1;
            for (let lIlIi111 = 0; lIlIi111 < lI11ii11.length; lIlIi111++) {
              $.log("去关注商品");
              await follow("/wxDrawActivity/follow", "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&skuId=" + lI11ii11[lIlIi111]);
              $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
              if (lIlIi111 == llIi11l1 - 1) break;
            }
            switch ($.activityType) {
              case 3:
              case 4:
              case 11:
              case 12:
              case 13:
                IIIIlii1 = await getActivityContent("/wxDrawActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
                break;
              case 26:
                IIIIlii1 = await getActivityContent("/wxPointDrawActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
                break;
              case 124:
                IIIIlii1 = await getActivityContent("/wxScratchActive/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
              case 125:
                IIIIlii1 = await getActivityContent("/wxPointBlindBox/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
                break;
              case 128:
                IIIIlii1 = await getActivityContent("/wxGashaponActive/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
                break;
              case 129:
                IIIIlii1 = await getActivityContent("/wxDollGrabbing/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
                break;
            }
            $.canDrawTimes = IIIIlii1.data.canDrawTimes;
            $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
            console.log("");
          }
        }
      }
    } else {
      console.log("活动可能已经结束！");
      $.hasEnd = true;
      return;
    }
  } else {
    console.log("未能成功获取到活动信息");
    $.activityEnd = true;
    return;
  }
  if ($.canDrawTimes > 0) {
    for (let l1lIIi1I = 1; $.canDrawTimes--; l1lIIi1I++) {
      $.draw_errorMessage = "";
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          await Draw("/wxDrawActivity/start", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
          break;
        case 26:
          await Draw("/wxPointDrawActivity/start", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
          break;
        case 124:
          await Draw("/wxScratchActive/start", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
        case 125:
          await Draw("/wxPointBlindBox/start", "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&venderId=" + $.venderId + "&nick=&token=" + $.Token + "&fromType=APP");
          break;
        case 128:
          await Draw("/wxGashaponActive/start", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
          break;
        case 129:
          await Draw("/wxDollGrabbing/start", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
          break;
      }
      if ($.draw_errorMessage != "") {
        $.draw_errorMessage.indexOf("火爆") > -1 && ($.canDrawTimes += 1);
        $.domain_mode == "cjhy" && ($.draw_errorMessage.indexOf("擦肩") > -1 || $.draw_errorMessage.indexOf("缓存") > -1) && ($.canDrawTimes += 1);
        if ($.drawStop || $.needOpenCard || $.hasEnd) break;
      }
      if ($.canDrawTimes <= 0) break;
      if ($.drawTimes >= 8 && $.activityType == 26) {
        console.log("\n抽奖太多次了，下次再继续吧~");
        break;
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    if ($.msg.lastIndexOf("，") > -1) $.msg = $.msg.substring(0, $.msg.lastIndexOf("，"));
  } else {
    switch ($.activityType) {
      case 13:
        console.log("今天没有抽奖机会了，明天再来吧~");
        break;
      case 3:
      case 4:
      case 11:
      case 12:
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        console.log("没有抽奖机会了~");
        break;
    }
    $.msg += "抽奖机会不足";
  }
}
async function getActivityContent(iI1Ilil1, ii1ii) {
  return new Promise(iIIii1Il => {
    $.post(taskPostUrl(iI1Ilil1, ii1ii), async (I1ll11li, l1li1Ii, iiliI11l) => {
      try {
        if (I1ll11li) {
          console.log(String(I1ll11li));
          console.log("getActivityContent 请求失败，请检查网路重试");
        } else {
          if (safeGet(iiliI11l)) {
            iiliI11l = JSON.parse(iiliI11l);
            l1li1Ii.status == 200 && setActivityCookie(l1li1Ii);
            iIIii1Il(iiliI11l);
          } else {
            $.hasEnd = true;
          }
        }
      } catch (ll1llilI) {
        $.logErr(ll1llilI, l1li1Ii);
      } finally {
        iIIii1Il();
      }
    });
  });
}
async function getGiveContent() {
  return new Promise(IIl1illI => {
    $.post(taskPostUrl("/wxDrawActivity/getGiveContent", "pin=" + $.FormatPin + "&activityId=" + $.activityId), async (lIiilil, lI11l11, IliIlli1) => {
      try {
        lIiilil ? (console.log(String(lIiilil)), console.log("getGiveContent 请求失败，请检查网路重试")) : safeGet(IliIlli1) && (IliIlli1 = JSON.parse(IliIlli1), IliIlli1.result && IliIlli1.data && ($.followTaskInfo = IliIlli1.data.follow), lI11l11.status == 200 && setActivityCookie(lI11l11));
      } catch (iIlllIii) {
        $.logErr(iIlllIii, lI11l11);
      } finally {
        IIl1illI();
      }
    });
  });
}
async function followShop(llili1il, lliiI111) {
  return new Promise(II1i1iI => {
    $.post(taskPostUrl(llili1il, lliiI111), async (II1IIlll, Illil11l, lilIli1i) => {
      try {
        II1IIlll ? (console.log(String(II1IIlll)), console.log("followShop 请求失败，请检查网路重试")) : safeGet(lilIli1i) && (lilIli1i = JSON.parse(lilIli1i), errorMessage = lilIli1i.errorMessage, errorMessage.indexOf("会员") > -1 && ($.needOpenCard = true), Illil11l.status == 200 && setActivityCookie(Illil11l));
      } catch (ilIIi1Ii) {
        $.logErr(ilIIi1Ii, Illil11l);
      } finally {
        II1i1iI();
      }
    });
  });
}
async function getPoints(li11IIli, lIIilIil) {
  return new Promise(iiiIlIl1 => {
    $.post(taskPostUrl(li11IIli, lIIilIil), async (iIl1Ii11, iIIi1I, l1liii1i) => {
      try {
        iIl1Ii11 ? (console.log(String(iIl1Ii11)), console.log("getPoints 请求失败，请检查网路重试")) : safeGet(l1liii1i) && (l1liii1i = JSON.parse(l1liii1i), l1liii1i.isOk && l1liii1i.data ? ($.points = l1liii1i.points, console.log("当前积分：" + $.points)) : (console.log("获取出错~"), $.points = 0), iIIi1I.status == 200 && setActivityCookie(iIIi1I));
      } catch (l1iii1Il) {
        $.logErr(l1iii1Il, iIIi1I);
      } finally {
        iiiIlIl1();
      }
    });
  });
}
async function getShopInfo() {
  return new Promise(illlIli1 => {
    $.post(taskPostUrl("/wxDrawActivity/shopInfo", "activityId=" + $.activityId), async (liI1li1, l11i1ll, iIIiilii) => {
      try {
        liI1li1 ? (console.log(String(liI1li1)), console.log("getShopInfo 请求失败，请检查网路重试")) : safeGet(iIIiilii) && (iIIiilii = JSON.parse(iIIiilii), iIIiilii.result && iIIiilii.data && ($.shopName = iIIiilii.data.shopName), l11i1ll.status == 200 && setActivityCookie(l11i1ll));
      } catch (I1Ili11I) {
        $.logErr(I1Ili11I, l11i1ll);
      } finally {
        illlIli1();
      }
    });
  });
}
async function follow(IIlilIiI, l1i1lil1) {
  return new Promise(i11lIli1 => {
    $.post(taskPostUrl(IIlilIiI, l1i1lil1), async (l1Il1lI1, IiliIIII, I1ll1lli) => {
      try {
        if (l1Il1lI1) {
          console.log(String(l1Il1lI1));
          console.log("follow 请求失败，请检查网路重试");
        } else {
          if (safeGet(I1ll1lli)) {
            I1ll1lli = JSON.parse(I1ll1lli);
            if (I1ll1lli.result) console.log("  >> 关注成功");else {
              console.log("  >> " + I1ll1lli.errorMessage || "关注失败");
            }
            IiliIIII.status == 200 && setActivityCookie(IiliIIII);
          }
        }
      } catch (lii1il1) {
        $.logErr(lii1il1, IiliIIII);
      } finally {
        i11lIli1();
      }
    });
  });
}
async function Draw(l1IliIIl, llIii1ii) {
  return new Promise(liII1Ii1 => {
    $.post(taskPostUrl(l1IliIIl, llIii1ii), async (Ii1llIli, ii1il11i, I1II1liI) => {
      try {
        if (Ii1llIli) {
          console.log(String(Ii1llIli));
          console.log("Draw 请求失败，请检查网路重试");
          ii1il11i.statusCode == 493 && ($.drawStop = true);
        } else {
          if (I1II1liI) {
            I1II1liI = JSON.parse(I1II1liI);
            if (I1II1liI.result && I1II1liI.data) {
              $.drawTimes += 1;
              let lililli = I1II1liI.data.drawInfo;
              $.canDrawTimes = I1II1liI.data.canDrawTimes;
              if (lililli) switch (lililli.type) {
                case 4:
                  console.log("🔁 再来一次");
                  $.canDrawTimes += 1;
                  break;
                case 6:
                  console.log("🎉 " + lililli.name + " 🐶");
                  $.msg += lililli.name + "🐶，";
                  break;
                case 7:
                  const illI1i1I = I1II1liI.data.addressId;
                  prizeName = lililli.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  console.log("参考价值：" + lililli.priceInfo + "（元）");
                  if (lililli.showImage) console.log("预览图片：" + lililli.showImage);
                  let IlIiIi1 = false;
                  IlIiIi1 = await wxSavePrize(domains, cookie, $.UA, $.activityId, $.activityType, $.activityType == 26 && $.domain_mode == "cjhy" ? $.shopId : $.venderId, $.secretPin, prizeName, illI1i1I);
                  if (IlIiIi1) $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + activityUrl));else {
                    if ($.isNode()) {
                      await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + activityUrl);
                    }
                  }
                  $.msg += prizeName + "🎁，";
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  $.msg += "专享价🗑️，";
                  break;
                case 9:
                  console.log("🗑️ " + lililli.name + " 🎟️");
                  $.msg += lililli.name + "🎟️，";
                  break;
                case 13:
                case 14:
                case 15:
                  console.log("🎉 恭喜获得" + lililli.name + " 🎁");
                  $.msg += lililli.name + "🎁，";
                  $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lililli.name + "\n\n" + activityUrl));
                  break;
                case 16:
                  console.log("🎉 " + lililli.priceInfo + " 🧧");
                  $.msg += lililli.priceInfo + "红包🧧，";
                  break;
                default:
                  if (lililli.name.includes("券")) {
                    console.log("🗑️ 优惠券");
                    $.msg += "优惠券🗑️，";
                  } else {
                    console.log("获得：" + lililli.name);
                    $.msg += lililli.name + "，";
                  }
                  break;
              } else {
                console.log("💨 空气");
                $.msg += "空气，";
              }
            } else {
              if (I1II1liI.errorMessage) {
                $.draw_errorMessage = I1II1liI.errorMessage;
                for (let lllIiiIl of ["上限", "不足", "超过", "非法操作", "明天"]) {
                  if ($.draw_errorMessage.includes(lllIiiIl)) {
                    $.drawStop = true;
                    break;
                  }
                }
                for (let I1lilI of ["未开始", "结束", "不存在", "不在"]) {
                  if ($.draw_errorMessage.includes(I1lilI)) {
                    $.hasEnd = true;
                    break;
                  }
                }
                for (let iIIIiIl1 of ["会员", "开卡"]) {
                  if ($.draw_errorMessage.includes(iIIIiIl1)) {
                    $.needOpenCard = true;
                    console.log("活动仅限店铺会员参与哦~");
                    break;
                  }
                }
                if (!$.draw_errorMessage.includes("火爆") && !$.draw_errorMessage.includes("擦肩") && !$.draw_errorMessage.includes("缓存") && !$.draw_errorMessage.includes("数据忙") && !$.drawStop && !$.needOpenCard) {
                  console.log($.draw_errorMessage || "");
                }
              } else console.log(JSON.stringify(I1II1liI));
            }
          }
          ii1il11i.status == 200 && setActivityCookie(ii1il11i);
        }
      } catch (iiiiIiI) {
        $.logErr(iiiiIiI, ii1il11i);
      } finally {
        liII1Ii1();
      }
    });
  });
}
async function getOpenCardStatus(i1i1ll1, i1liIIli) {
  return new Promise(lIli1i1l => {
    $.post(taskPostUrl(i1i1ll1, i1liIIli), async (lliIi1i, IIlilli1, IllI1I11) => {
      try {
        if (lliIi1i) {
          console.log(String(lliIi1i));
          console.log("getOpenCardStatus API请求失败，请检查网路重试");
        } else {
          if (safeGet(IllI1I11)) {
            IllI1I11 = JSON.parse(IllI1I11);
            if (IllI1I11.result && IllI1I11.data) {
              switch ($.domain_mode) {
                case "lzkj":
                  $.isOpenCard = IllI1I11.data.openCard;
                  break;
                case "cjhy":
                  $.isOpenCard = IllI1I11.data.openedCard;
                  break;
              }
            } else console.log(IllI1I11.errorMessage || "");
          }
          IIlilli1.status == 200 && setActivityCookie(IIlilli1);
        }
      } catch (llIIlIII) {
        $.logErr(llIIlIII, IIlilli1);
      } finally {
        lIli1i1l();
      }
    });
  });
}
async function getSimpleActInfoVo() {
  return new Promise(I1Iii1iI => {
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", "activityId=" + $.activityId), async (liiIllI, ili1IIl, I1IIl1) => {
      try {
        if (liiIllI) {
          console.log(String(liiIllI));
          console.log("getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {
          if (I1IIl1 && safeGet(I1IIl1)) {
            I1IIl1 = JSON.parse(I1IIl1);
            if (I1IIl1.data) {
              $.shopId = I1IIl1.data.shopId;
              $.venderId = I1IIl1.data.venderId;
              $.activityType = I1IIl1.data.activityType;
            } else !I1IIl1.data ? $.activityEnd = true : console.log("异常：" + JSON.stringify(I1IIl1));
          }
          ili1IIl.status == 200 && setActivityCookie(ili1IIl);
        }
      } catch (IIIl1IiI) {
        $.logErr(IIIl1IiI, ili1IIl);
      } finally {
        I1Iii1iI();
      }
    });
  });
}
async function getFirstLZCK() {
  return new Promise(IIil1IIi => {
    let l1IlIIli = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1IlIIli, async (ili1Il1, li1Il1i, illiIlIl) => {
      try {
        ili1Il1 ? (li1Il1i && typeof li1Il1i.statusCode != "undefined" && li1Il1i.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true), console.log(String(ili1Il1)), console.log("wxCommonInfo API请求失败，请检查网路重试")) : li1Il1i.status == 200 && setActivityCookie(li1Il1i);
      } catch (i1II1Ii) {
        $.logErr(i1II1Ii, li1Il1i);
      } finally {
        IIil1IIi();
      }
    });
  });
}
async function getFirstCK() {
  return new Promise(llI1iili => {
    let II1lIi1I = {
      "url": activityUrl,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(II1lIi1I, async (lill1iI, II11l1i, Ill11II) => {
      try {
        if (lill1iI) {
          if (II11l1i && typeof II11l1i.statusCode != "undefined") {
            II11l1i.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true);
          }
          console.log(String(lill1iI));
          console.log("getFirstCK API请求失败，请检查网路重试");
        } else {
          let IlIl11l = Ill11II.match(/(活动已经结束)/) && Ill11II.match(/(活动已经结束)/)[1] || "";
          IlIl11l && ($.activityEnd = true, console.log("活动已结束"));
          II11l1i.status == 200 && setActivityCookie(II11l1i);
        }
      } catch (I1i1iI1) {
        $.logErr(I1i1iI1, II11l1i);
      } finally {
        llI1iili();
      }
    });
  });
}
async function getMyPing() {
  return new Promise(i1i1lIIl => {
    let i1Illli = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", i1Illli), async (Iii11lli, i11I1I11, I11ilI1i) => {
      try {
        if (Iii11lli) {
          if (i11I1I11 && typeof i11I1I11.statusCode != "undefined") {
            i11I1I11.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), $.outFlag = true);
          }
          console.log(String(Iii11lli));
          console.log("getMyPing API请求失败，请检查网路重试");
        } else {
          if (i11I1I11.status == 200) {
            setActivityCookie(i11I1I11);
          }
          if (safeGet(I11ilI1i)) {
            I11ilI1i = JSON.parse(I11ilI1i);
            if (I11ilI1i.result && I11ilI1i.data) {
              $.secretPin = I11ilI1i.data.secretPin;
              $.nickName = I11ilI1i.data.nickname;
              $.AUTH_C_USER = $.secretPin;
            } else {}
          }
        }
      } catch (ilIlIlIl) {
        $.logErr(ilIlIlIl, i11I1I11);
      } finally {
        i1i1lIIl();
      }
    });
  });
}
function taskPostUrl(IlI1llIl, I1iiIlli) {
  return {
    "url": "" + domains + IlI1llIl,
    "body": I1iiIlli,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    },
    "timeout": 30000
  };
}
async function accessLog() {
  return new Promise(async IIiIi1i => {
    const iI1Ilii = {
      "url": "https://cjhy-isv.isvjcloud.com/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "cjhy-isv.isvjcloud.com",
        "Origin": "https://cjhy-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl,
        "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app"
    };
    $.post(iI1Ilii, (i1Ii1lii, I1ll1, il1lli1l) => {
      try {
        if (i1Ii1lii) {} else I1ll1.status == 200 && setActivityCookie(I1ll1);
      } catch (ilil1iil) {
        $.logErr(ilil1iil, I1ll1);
      } finally {
        IIiIi1i();
      }
    });
  });
}
async function accessLogWithAD() {
  return new Promise(async lli1ilIl => {
    const i1llilIl = {
      "url": "https://lzkj-isv.isvjd.com/common/accessLogWithAD",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "lzkj-isv.isvjcloud.com",
        "Origin": "https://lzkj-isv.isvjd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl,
        "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app"
    };
    $.post(i1llilIl, (liiii11i, ii111liI, iIIIli11) => {
      try {
        if (liiii11i) {} else ii111liI.status == 200 && setActivityCookie(ii111liI);
      } catch (lliIIl11) {
        $.logErr(lliIIl11, ii111liI);
      } finally {
        lli1ilIl();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIIlli1l => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let illI1IiI = "";
    if ($.shopactivityId) illI1IiI = ",\"activityId\":" + $.shopactivityId;
    const lii1ilII = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + illI1IiI + ",\"channel\":406}",
      i11l1ili = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lii1ilII)
      },
      iI1I1il = await getH5st("8adfb", i11l1ili),
      IiiiIli = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + lii1ilII + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iI1I1il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IiiiIli, async (IliII1li, IiIl1l11, IIIill1I) => {
      try {
        IIIill1I = IIIill1I && IIIill1I.match(/jsonp_.*?\((.*?)\);/) && IIIill1I.match(/jsonp_.*?\((.*?)\);/)[1] || IIIill1I;
        let lll1llIi = $.toObj(IIIill1I, IIIill1I);
        if (lll1llIi && typeof lll1llIi == "object") {
          if (lll1llIi && lll1llIi.success === true) {
            console.log(lll1llIi.message);
            $.errorJoinShop = lll1llIi.message;
            if (lll1llIi.result && lll1llIi.result.giftInfo) {
              for (let IilIlI1l of lll1llIi.result.giftInfo.giftList) {
                console.log("入会获得: " + IilIlI1l.discountString + IilIlI1l.prizeName + IilIlI1l.secondLineDesc);
              }
            }
            console.log("");
          } else {
            if (lll1llIi && typeof lll1llIi == "object" && lll1llIi.message) {
              $.errorJoinShop = lll1llIi.message;
              console.log("" + (lll1llIi.message || ""));
            } else {
              console.log(IIIill1I);
            }
          }
        } else console.log(IIIill1I);
      } catch (IllI1lIl) {
        $.logErr(IllI1lIl, IiIl1l11);
      } finally {
        IIIlli1l();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async l11iiiI1 => {
    let I1li1lll = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const i1I11i1I = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1li1lll)
      },
      illlliIl = await getH5st("ef79a", i1I11i1I),
      liliiIil = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I1li1lll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(illlliIl),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liliiIil, async (IlIiiilI, IlllIl1I, Iii1l1Ii) => {
      try {
        Iii1l1Ii = Iii1l1Ii && Iii1l1Ii.match(/jsonp_.*?\((.*?)\);/) && Iii1l1Ii.match(/jsonp_.*?\((.*?)\);/)[1] || Iii1l1Ii;
        let llIiiI11 = $.toObj(Iii1l1Ii, Iii1l1Ii);
        if (llIiiI11 && typeof llIiiI11 == "object") {
          if (llIiiI11 && llIiiI11.success == true) {
            console.log("\n去加入店铺会员：" + (llIiiI11.result.shopMemberCardInfo.venderCardName || ""));
            $.shopactivityId = llIiiI11.result.interestsRuleList && llIiiI11.result.interestsRuleList[0] && llIiiI11.result.interestsRuleList[0].interestsInfo && llIiiI11.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else console.log(Iii1l1Ii);
      } catch (l1Ii11l) {
        $.logErr(l1Ii11l, IlllIl1I);
      } finally {
        l11iiiI1();
      }
    });
  });
}
function setActivityCookie(Illlll1i) {
  if (Illlll1i.headers["set-cookie"]) {
    cookie = "";
    for (let IIi1lIi of Illlll1i.headers["set-cookie"]) {
      lz_cookie[IIi1lIi.split(";")[0].substr(0, IIi1lIi.split(";")[0].indexOf("="))] = IIi1lIi.split(";")[0].substr(IIi1lIi.split(";")[0].indexOf("=") + 1);
    }
    for (const i111I11i of Object.keys(lz_cookie)) {
      cookie += i111I11i + "=" + lz_cookie[i111I11i] + ";";
    }
    activityCookie = cookie;
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(lilill1) {
  lilill1 = lilill1 || 32;
  let II1iIllI = "abcdef0123456789",
    iI1liiI1 = II1iIllI.length,
    i1IiiI1 = "";
  for (i = 0; i < lilill1; i++) i1IiiI1 += II1iIllI.charAt(Math.floor(Math.random() * iI1liiI1));
  return i1IiiI1;
}
function safeGet(iIill1I1) {
  if (!iIill1I1) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(iIill1I1) == "object") {
      return true;
    }
  } catch (lIiIIlii) {
    return console.log(lIiIIlii), false;
  }
}
function getQueryString(ll1iIll, lIlil1l1) {
  let iIIilii1 = new RegExp("(^|[&?])" + lIlil1l1 + "=([^&]*)(&|$)"),
    iiill1II = ll1iIll.match(iIIilii1);
  if (iiill1II != null) return decodeURIComponent(iiill1II[2]);
  return "";
}
