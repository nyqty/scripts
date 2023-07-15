/*
活动名称：积分兑换京豆 · 超级会员
活动链接：https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgBeans?venderId=<店铺id>&giftId=<活动id>
环境变量：
jd_pointExgBeans_activityUrl // 活动链接
JD_LZ_OPEN // 是否开启LZ活动运行，默认运行
JD_CJ_OPEN // 是否开启CJ活动运行，默认运行
jd_pointExgBeans_blacklist // 黑名单 用&隔开 pin值

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#积分兑换京豆
1 1 1 1 * jd_pointExgBeans.js, tag=积分兑换京豆, enabled=true
*/
const Env = require('./utils/Env.js');
const $ = new Env("积分兑换京豆（超级会员）");
const notify = $.isNode() ? require("./sendNotify") : "",
  jdCookieNode = $.isNode() ? require("./jdCookie") : "",
  getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let lz_cookie = {},
  activityCookie = "",
  cookiesArr = [],
  cookie = "",
  message = "",
  activityUrl = process.env.jd_pointExgBeans_activityUrl ? process.env.jd_pointExgBeans_activityUrl : "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(l1iI11 => {
    cookiesArr.push(jdCookieNode[l1iI11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(l1I11 => l1I11.cookie)].filter(i11I1 => !!i11I1);
let whitelist = "",
  blacklist = "";
$.whitelist = process.env.jd_pointExgBeans_whitelist || whitelist;
$.blacklist = process.env.jd_pointExgBeans_blacklist || blacklist;
getWhitelist();
getBlacklist();
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "giftId");
  venderId = getQueryString("" + activityUrl, "venderId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    console.log("活动id不存在！");
    return;
  }
  if (!venderId) {
    console.log("店铺id不存在！");
    return;
  }
  console.log("活动入口：https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgBeans?venderId=" + venderId + "&giftId=" + activityId);
  console.log("店铺会员：https://shopmember.m.jd.com/shopcard/?venderId=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let liIIII = 0; liIIII < cookiesArr.length; liIIII++) {
    if (cookiesArr[liIIII]) {
      cookie = cookiesArr[liIIII];
      originCookie = cookiesArr[liIIII];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = liIIII + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      getUA();
      await pointExgBeans();
      await $.wait(2000);
      if ($.hasEnd || $.maxcountnum || $.outFlag || $.activityEnd) break;
    }
  }
})().catch(iI11il => {
  $.log("", " " + $.name + ", 失败! 原因: " + iI11il + "!", "");
}).finally(() => {
  $.done();
});
async function pointExgBeans() {
  $.exgBeanNum = 1;
  $.buyerPoints = 0;
  $.canExgByPeopDay = 0;
  $.canExgByActivity = 0;
  $.newnums = 0;
  $.sid = "";
  $.venderId = venderId;
  $.token = "";
  $.Pin = "";
  $.hisPin = "";
  $.card = [];
  $.getPrize = false;
  $.exgStop = false;
  await getCk();
  if ($.activityEnd) return;
  if ($.outFlag) {
    console.log("此ip已被限制，请过更换IP后或者等待一会儿再执行脚本\n");
    return;
  }
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await $.wait(1000);
  if ($.venderId) {
    if ($.token) await getPin();
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await $.wait(1000);
    await accessLog();
    await $.wait(1000);
    await selectBeansForC();
    if ($.remainNum === 0) {
      console.log("当前京豆库存：" + $.remainNum + " / " + $.num + " 🐶");
      console.log("⛔️ 当前活动的京豆已全部发放完了，下次早点来吧！");
      $.activityEnd = true;
      return;
    }
    if ($.canExgByActivity === 0) {
      console.log("\n⛔️ 活动参与兑换数量已达到上限，没有可兑换的京豆了，下期再来吧~");
      return;
    }
    if ($.canExgByPeopDay === 0 && $.exgTimeType != 1) {
      console.log("\n⛔️ 今日用户可兑换次数已耗尽，明天再来吧~");
      return;
    }
    if ($.canExgTime === 0) {
      console.log("\n⛔️ 当前活动内用户可兑换次数已耗尽，下期再来吧~");
      return;
    }
    await $.wait(1000);
    await getBuyerPoints();
    if ($.grade === 0 && $.buyerPoints === 0) {
      console.log("\n⛔️ 活动仅限店铺会员参与哦~");
      return;
    }
    if ($.buyerPoints == 0) {
      console.log("\n⛔️ 用户积分不足");
      return;
    }
    if ($.canExgByPeopDay === 0) {
      console.log("\n⛔️ 今日没有可兑换的京豆了（接口京豆库存数据可能存在延迟），明天再来吧~");
      return;
    }
    if ($.canExgTime === 0) {
      console.log("\n⛔️ 当前活动内用户可兑换次数已耗尽，下期再来吧~");
      return;
    }
    await $.wait(1000);
    console.log("当前京豆库存：" + $.remainNum + " / " + $.num + " 🐶");
    console.log("用户等级：" + $.grade + " 📶 " + " 当前积分：" + $.buyerPoints + " 🎟️");
    let l1Ilii = eval("$.point" + $.grade);
    if (l1Ilii === null) {
      console.log("\n⛔️ 用户当前会员等级不符合兑换要求");
      return;
    }
    $.exgBeanNum = parseInt($.buyerPoints / l1Ilii);
    if ($.buyerPoints < $.exgBeanNum) {
      console.log("\n⛔️ 用户积分不足");
      return;
    }
    if ($.exgStyle === 1) {
      if ($.exgBeanNum >= $.beansLevelCount) $.exgBeanNum = $.beansLevelCount;else {
        console.log("\n⛔️ 用户积分不足");
        return;
      }
    } else $.canExgByPeopDay != null ? $.exgBeanNum = $.exgBeanNum >= $.canExgByPeopDay ? $.canExgByPeopDay : $.exgBeanNum : $.exgBeanNum = $.exgBeanNum;
    if (!$.exgBeanNum) {
      console.log("\n⛔️ 用户不符合兑换规则无法兑换~");
      return;
    }
    console.log("兑换数量：" + $.exgBeanNum + " 🐶\n");
    for (let iIili = 0; iIili < 20; iIili++) {
      await exgBeans();
      if ($.getPrize || $.exgStop || $.activityEnd) break;
      await $.wait(1000);
    }
    !$.getPrize && console.log("⛔️ 已尝试多次，未能兑换" + $.exgBeanNum + "京豆");
  } else {
    console.log("未能获取活动信息（店铺ID）");
    $.activityEnd = true;
  }
}
function showMsg() {
  return new Promise(liIIIl => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    liIIIl();
  });
}
function getSimpleActInfoVo() {
  return new Promise(liIIIi => {
    let liii = "activityId=" + activityId;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", liii), async (iIil1, l1IllI, lIi1Ii) => {
      try {
        if (iIil1) {
          console.log("" + $.toStr(iIil1));
          console.log($.name + " getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {}
      } catch (Ii1lII) {
        $.logErr(Ii1lII, l1IllI);
      } finally {
        liIIIi();
      }
    });
  });
}
function getCk() {
  return new Promise(IIl111 => {
    let Ill1lI = {
      "url": activityUrl,
      "headers": {
        "Cookie": cookie,
        "User-Agent": $.UA
      }
    };
    $.get(Ill1lI, async (illII1, Il1iii, iIiii) => {
      try {
        if (illII1) {
          Il1iii && typeof Il1iii.statusCode != "undefined" && Il1iii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + JSON.stringify(illII1));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IIiIIi = iIiii.match(/(活动已结束)/) && iIiii.match(/(活动已结束)/)[1] || iIiii.match(/(活动尚未开始)/) && iIiii.match(/(活动尚未开始)/)[1] || "";
          IIiIIi && ($.activityEnd = true, console.log("活动已结束或者未开始"));
          if (Il1iii.status == 200) {
            refreshToken(Il1iii);
          }
        }
      } catch (ll111i) {
        $.logErr(ll111i, Il1iii);
      } finally {
        IIl111();
      }
    });
  });
}
function getPin() {
  return new Promise(Ilill1 => {
    let I111lI = "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", I111lI), async (l1iii1, iiilIl, Il1ilI) => {
      try {
        if (l1iii1) {
          console.log("" + JSON.stringify(l1iii1));
          console.log($.name + " 3 API请求失败，请检查网路重试");
        } else {
          iiilIl.status == 200 && refreshToken(iiilIl);
          if (safeGet(Il1ilI)) {
            Il1ilI = JSON.parse(Il1ilI);
            if (Il1ilI.result && Il1ilI.data) {
              $.Pin = Il1ilI.data.secretPin;
              $.AUTH_C_USER = $.Pin;
              $.attrTouXiang = Il1ilI.data.yunMidImageUrl ? Il1ilI.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
              $.nickName = Il1ilI.data.pin;
            } else {}
          }
        }
      } catch (l1Illl) {
        $.logErr(l1Illl, iiilIl);
      } finally {
        Ilill1();
      }
    });
  });
}
function joinShop(liIl1i) {
  return new Promise(async Ililil => {
    console.log("入会ID:" + $.joinVenderId);
    let I1liIl = "{\n\t\t\t\"venderId\":\"" + $.joinVenderId + "\",\n\t\t\t\"shopId\":\"" + $.joinVenderId + "\",\n\t\t\t\"bindByVerifyCodeFlag\":1,\n\t\t\t\"registerExtend\":{},\n\t\t\t\"writeChildFlag\":0,\n\t\t\t\"channel\":401\n\t\t}";
    $.errorJoinShop = "";
    await getshopactivityId();
    const l11li = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1liIl)
      },
      iIlli = await getH5st("ef79a", l11li),
      l11ll = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + I1liIl + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + iIlli,
        "headers": {
          "Content-Type": "text/plain; Charset=UTF-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "content-type": "application/x-www-form-urlencoded",
          "Cookie": cookie
        }
      };
    $.get(l11ll, async (Ii1ll, iIlll, liII11) => {
      try {
        let il1IlI = $.toObj(liII11, liII11);
        if (typeof il1IlI == "object") {
          if (il1IlI.success === true) {
            console.log(il1IlI.message);
            $.errorJoinShop = il1IlI.message;
            if (il1IlI.result && il1IlI.result.giftInfo) for (let I1IIIi of il1IlI.result.giftInfo.giftList) {
              console.log("入会获得:" + I1IIIi.discountString + I1IIIi.prizeName + I1IIIi.secondLineDesc);
            }
          } else typeof il1IlI == "object" && il1IlI.message ? ($.errorJoinShop = il1IlI.message, console.log("" + (il1IlI.message || ""))) : console.log(liII11);
        } else console.log(liII11);
      } catch (i1I111) {
        $.logErr(i1I111, iIlll);
      } finally {
        Ililil();
      }
    });
  });
}
function getshopactivityId() {
  return new Promise(iIiIl1 => {
    const Ii1lli = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22" + $.joinVenderId + "%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888",
      "headers": {
        "Content-Type": "text/plain; Charset=UTF-8",
        "Origin": "https://api.m.jd.com",
        "Host": "api.m.jd.com",
        "accept": "*/*",
        "User-Agent": $.UA,
        "content-type": "application/x-www-form-urlencoded",
        "Cookie": cookie
      }
    };
    $.get(Ii1lli, async (I1I1, Ii1lI, iIiIlI) => {
      try {
        let iIiIil = $.toObj(iIiIlI, iIiIlI);
        if (typeof iIiIil == "object") {
          iIiIil.success == true && console.log("去加入店铺会员：" + (iIiIil.result.shopMemberCardInfo.venderCardName || ""));
        } else console.log(iIiIlI);
      } catch (lI1i) {
        $.logErr(lI1i, Ii1lI);
      } finally {
        iIiIl1();
      }
    });
  });
}
function getUserInfo() {
  return new Promise(l11li1 => {
    let liII1I = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/wxActionCommon/getUserInfo", liII1I), async (il1Ili, i1IlI1, IIlIli) => {
      try {
        if (il1Ili) {
          console.log("" + JSON.stringify(il1Ili));
          console.log($.name + " 6-1 API请求失败，请检查网路重试");
        } else {
          if (safeGet(IIlIli)) {
            IIlIli = JSON.parse(IIlIli);
            IIlIli.result && IIlIli.data ? $.attrTouXiang = IIlIli.data.yunMidImageUrl ? IIlIli.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg" : console.log("异常6-2：" + JSON.stringify(IIlIli));
          }
        }
      } catch (I1Il1i) {
        $.logErr(I1Il1i, i1IlI1);
      } finally {
        l11li1();
      }
    });
  });
}
function getBuyerPoints(i1l = 0) {
  return new Promise(ilIiiI => {
    let IIlIil = encodeURIComponent(encodeURIComponent($.Pin)),
      l11llI = "venderId=" + venderId + "&buyerPin=" + IIlIil;
    $.post(taskPostUrl("/mc/wxPointShop/getBuyerPoints", l11llI), async (iIllil, l11lli, I1Il11) => {
      try {
        iIllil ? (console.log("" + JSON.stringify(iIllil)), console.log($.name + "getBuyerPoints 请求失败，请检查网路重试")) : (safeGet(I1Il11) && (I1Il11 = JSON.parse(I1Il11), I1Il11.result && I1Il11.data ? ($.grade = I1Il11.data.grade, $.buyerPoints = I1Il11.data.buyerPoints) : console.log(I1Il11.errorMessage || "")), l11lli.status == 200 && refreshToken(l11lli));
      } catch (iIiIll) {
        $.logErr(iIiIll, l11lli);
      } finally {
        ilIiiI();
      }
    });
  });
}
function selectBeansForC(IlIiIi = 0) {
  return new Promise(iIi11i => {
    let ll1l1l = encodeURIComponent(encodeURIComponent($.Pin)),
      l1II11 = "venderId=" + venderId + "&giftId=" + activityId + "&buyerPin=" + ll1l1l + "&beansLevel=1";
    $.post(taskPostUrl("/mc/beans/selectBeansForC", l1II11), async (Ili1, ii11iI, i1IIl1) => {
      try {
        if (Ili1) {
          console.log("" + JSON.stringify(Ili1));
          console.log($.name + "selectBeansForC 请求失败，请检查网路重试");
        } else {
          if (safeGet(i1IIl1)) {
            i1IIl1 = JSON.parse(i1IIl1);
            if (i1IIl1.result && i1IIl1.data) {
              $.giftName = i1IIl1.data.giftName;
              $.beansLevelCount = i1IIl1.data.beansLevelCount;
              $.beansLevel = i1IIl1.data.beansLevel;
              $.usedNum = i1IIl1.data.usedNum;
              $.num = i1IIl1.data.num;
              $.actrule = i1IIl1.data.actrule;
              $.canExgTime = i1IIl1.data.canExgTime;
              $.canExgByActivity = i1IIl1.data.canExgByActivity;
              $.canExgByPeopDay = i1IIl1.data.canExgByPeopDay;
              $.exgStyle = i1IIl1.data.exgStyle;
              $.exgTimeType = i1IIl1.data.exgTimeType;
              $.otherRule = i1IIl1.data.otherRule;
              $.point0 = i1IIl1.data.point0;
              $.point1 = i1IIl1.data.point1;
              $.point2 = i1IIl1.data.point2;
              $.point3 = i1IIl1.data.point3;
              $.point4 = i1IIl1.data.point4;
              $.point5 = i1IIl1.data.point5;
              if ($.index === 1) {
                console.log("活动名称：" + $.giftName);
                if ($.exgStyle === 1) console.log("活动类型：固定兑换数量");else {
                  console.log("活动类型：用户自定义兑换数量");
                }
                console.log("活动规则：\n" + $.actrule + "\n");
              }
              $.remainNum = parseInt($.num - $.usedNum);
            } else console.log(i1IIl1.errorMessage || "");
          }
          ii11iI.status == 200 && refreshToken(ii11iI);
        }
      } catch (I11llI) {
        $.logErr(I11llI, ii11iI);
      } finally {
        iIi11i();
      }
    });
  });
}
function exgBeans(l1II1l = 0) {
  return new Promise(IiIl1I => {
    let iIiIi1 = encodeURIComponent(encodeURIComponent($.Pin)),
      ii11l1 = "venderId=" + venderId + "&giftId=" + activityId + "&buyerNick=" + encodeURIComponent($.nickName) + "&buyerPin=" + iIiIi1 + "&beansLevel=1&exgBeanNum=" + $.exgBeanNum;
    $.post(taskPostUrl("/mc/wxPointShop/exgBeans", ii11l1), async (i111lI, ii11lI, ilI1l) => {
      try {
        if (i111lI) {
          console.log("" + JSON.stringify(i111lI));
          console.log($.name + "exgBeans 请求失败，请检查网路重试");
        } else {
          if (safeGet(ilI1l)) {
            ilI1l = JSON.parse(ilI1l);
            if (ilI1l.result && ilI1l.data == null) {
              console.log("🎉 已成功兑换" + $.exgBeanNum + "京豆 🐶");
              $.getPrize = true;
            } else {
              let IiIl11 = ilI1l.errorMessage || "";
              if (!IiIl11.includes("擦肩") && !IiIl11.includes("火爆")) {
                console.log(IiIl11 || "");
              }
              for (let IliI of ["未开始", "结束", "不存在", "不在", "发完", "兑完", "兑光", "发放完", "领完", "来晚", "抢光", "全部被领取", "余额不足"]) {
                if (IiIl11.includes(IliI)) {
                  $.activityEnd = true;
                  break;
                }
              }
              for (let I1l1l of ["不足", "不在", "上限", "会员", "变更值", "擦肩"]) {
                if (IiIl11.includes(I1l1l)) {
                  $.exgStop = true;
                  break;
                }
              }
            }
          }
          ii11lI.status == 200 && refreshToken(ii11lI);
        }
      } catch (li1liI) {
        $.logErr(li1liI, ii11lI);
      } finally {
        IiIl1I();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(iI1Ii => {
    let lI1i1i = "activityType=40&venderId=" + $.venderId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", lI1i1i), async (il1IiI, il1Ii1, lI1i1l) => {
      try {
        if (il1IiI) {
          console.log("" + JSON.stringify(il1IiI));
          console.log($.getOpenCardInfo + "API请求失败，请检查网路重试");
        } else {
          if (safeGet(lI1i1l)) {
            lI1i1l = JSON.parse(lI1i1l);
            if (lI1i1l.result && lI1i1l.data) {
              $.openedCard = lI1i1l.data.openedCard || false;
              if (lI1i1l.data.openCardLink) {
                $.channel = lI1i1l.data.openCardLink.match(/channel=(\d+)/)[1];
                $.joinVenderId = lI1i1l.data.openCardLink.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (I1li11) {
        $.logErr(I1li11, il1Ii1);
      } finally {
        iI1Ii();
      }
    });
  });
}
function taskPostUrl(iI1iI, Ii11I1) {
  return {
    "url": "" + domains + iI1iI,
    "body": Ii11I1,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": "cjhy-isv.isvjcloud.com",
      "Origin": "https://cjhy-isv.isvjcloud.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl + "/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId,
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function accessLog() {
  return new Promise(async IIiIl => {
    const IIiIi = {
      "url": "https://cjhy-isv.isvjcloud.com/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "cjhy-isv.isvjcloud.com",
        "Origin": "https://cjhy-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl + "/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId,
        "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + venderId + "&code=40&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + activityId + "&pageUrl=https%3A%2F%2F$cjhy-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D" + activityId + "&subType=app"
    };
    $.post(IIiIi, (IiIill, li1Iii, lIII1) => {
      try {
        IiIill ? (console.log("" + JSON.stringify(IiIill)), console.log($.name + " API请求失败，请检查网路重试")) : li1Iii.status == 200 && refreshToken(li1Iii);
      } catch (iiIIlI) {
        $.logErr(iiIIlI, li1Iii);
      } finally {
        IIiIl();
      }
    });
  });
}
function refreshToken(IIl1II) {
  if (IIl1II) {
    if (IIl1II.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let li1Ill of IIl1II.headers["set-cookie"]) {
        lz_cookie[li1Ill.split(";")[0].substr(0, li1Ill.split(";")[0].indexOf("="))] = li1Ill.split(";")[0].substr(li1Ill.split(";")[0].indexOf("=") + 1);
      }
      for (const l1Iili of Object.keys(lz_cookie)) {
        cookie += l1Iili + "=" + lz_cookie[l1Iili] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(IIi11i) {
  IIi11i = IIi11i || 32;
  let iili = "abcdef0123456789",
    IIl1Ii = iili.length,
    ilIIl = "";
  for (i = 0; i < IIi11i; i++) ilIIl += iili.charAt(Math.floor(Math.random() * IIl1Ii));
  return ilIIl;
}
function safeGet(iiI1l) {
  if (!iiI1l) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(iiI1l) == "object") return true;
  } catch (Ii11Il) {
    return console.log(Ii11Il), false;
  }
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const iiIIll = Array.from(new Set($.blacklist.split("&")));
  console.log(iiIIll.join("&") + "\n");
  let I1li1l = iiIIll,
    I11li1 = [],
    lIIIi = false;
  for (let I11liI = 0; I11liI < cookiesArr.length; I11liI++) {
    let ilIilI = decodeURIComponent(cookiesArr[I11liI].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[I11liI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!ilIilI) break;
    let iIlIl1 = false;
    for (let lli1iI of I1li1l) {
      if (lli1iI && lli1iI == ilIilI) {
        iIlIl1 = true;
        break;
      }
    }
    !iIlIl1 && (lIIIi = true, I11li1.splice(I11liI, -1, cookiesArr[I11liI]));
  }
  if (lIIIi) cookiesArr = I11li1;
}
function toFirst(liIiiI, l11Iii) {
  l11Iii != 0 && liIiiI.unshift(liIiiI.splice(l11Iii, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const iI11 = Array.from(new Set($.whitelist.split("&")));
  console.log(iI11.join("&") + "\n");
  let liIii1 = [],
    Iili11 = iI11;
  for (let lli1i1 in cookiesArr) {
    let ilIiii = decodeURIComponent(cookiesArr[lli1i1].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[lli1i1].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    Iili11.includes(ilIiii) && liIii1.push(cookiesArr[lli1i1]);
  }
  helpCookiesArr = liIii1;
  if (Iili11.length > 1) for (let ilIiil in Iili11) {
    let iII = Iili11[Iili11.length - 1 - ilIiil];
    if (!iII) continue;
    for (let l11IlI in helpCookiesArr) {
      let l11Il1 = decodeURIComponent(helpCookiesArr[l11IlI].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[l11IlI].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      if (iII == l11Il1) {
        toFirst(helpCookiesArr, l11IlI);
      }
    }
  }
}
function jsonParse(IIiIli) {
  if (typeof IIiIli == "string") try {
    return JSON.parse(IIiIli);
  } catch (iIlIi1) {
    return console.log(iIlIi1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(iIi, iI1i) {
  let l11Ill = new RegExp("(^|[&?])" + iI1i + "=([^&]*)(&|$)"),
    IIlliI = iIi.match(l11Ill);
  if (IIlliI != null) return unescape(IIlliI[2]);
  return "";
}