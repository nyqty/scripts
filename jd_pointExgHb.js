/*
活动名称：积分兑换红包 · 超级会员
活动链接：https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgHb?venderId=<店铺id>&giftId=<活动id>
环境变量：jd_pointExgHb_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('积分兑换红包（超级会员）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "",
  cookiesArr = [],
  cookie = "",
  message = "",
  activityUrl = process.env.jd_pointExgHb_activityUrl ? process.env.jd_pointExgHb_activityUrl : "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(iiIIi => {
    cookiesArr.push(jdCookieNode[iiIIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lIlIIl1 => lIlIIl1.cookie)].filter(iil11l11 => !!iil11l11);
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
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let i1I1I11I = 0; i1I1I11I < cookiesArr.length; i1I1I11I++) {
    if (cookiesArr[i1I1I11I]) {
      cookie = cookiesArr[i1I1I11I];
      originCookie = cookiesArr[i1I1I11I];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = i1I1I11I + 1;
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
      await pointExgHb();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
})().catch(lliiilIl => {
  $.log("", " " + $.name + ", 失败! 原因: " + lliiilIl + "!", "");
}).finally(() => {
  $.done();
});
async function pointExgHb() {
  $.buyerPoints = 0;
  $.exgByPeopDay = 0;
  $.exgByActivity = 0;
  $.sid = "";
  $.venderId = venderId;
  $.token = "";
  $.Pin = "";
  await getCk();
  if ($.activityEnd) return;
  if ($.outFlag) {
    console.log("此ip已被限制，请过更换IP后或者等待一会儿再执行脚本\n");
    return;
  }
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await $.wait(1000);
  if ($.venderId) {
    if ($.token) await getPin();
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await $.wait(1000);
    await accessLog();
    await $.wait(1000);
    await selectHbForC();
    if ($.remainNum == 0) {
      console.log("当前红包库存：" + $.remainNum + " / " + $.num + " 🧧");
      console.log("\n⛔️ 当前活动的红包已全部发放完了，下次早点来吧~");
      $.activityEnd = true;
      return;
    }
    if ($.canExgByActivity === 0) {
      console.log("⛔️ 活动参与兑换数量已达到上限，没有可兑换的红包了，下期再来吧~");
      return;
    }
    if ($.canExgByPeopDay === 0 && $.exgTimeType != 1) {
      console.log("⛔️ 今日用户可兑换次数已耗尽，明天再来吧~");
      return;
    }
    await $.wait(1000);
    await getBuyerPoints();
    if ($.grade === 0) {
      console.log("⛔️ 活动仅限店铺会员参与");
      return;
    }
    if ($.buyerPoints == 0) {
      console.log("⛔️ 用户当前没有积分");
      return;
    }
    await $.wait(1000);
    console.log("当前红包库存：" + $.remainNum + " / " + $.num);
    console.log("用户等级：" + $.grade + " | 当前积分：" + $.buyerPoints);
    let i1I1lll1 = null;
    switch (String($.grade)) {
      case "0":
        i1I1lll1 = $.point0;
        break;
      case "1":
        i1I1lll1 = $.point1;
        break;
      case "2":
        i1I1lll1 = $.point2;
        break;
      case "3":
        i1I1lll1 = $.point3;
        break;
      case "4":
        i1I1lll1 = $.point4;
        break;
      case "5":
        i1I1lll1 = $.point5;
        break;
    }
    if (i1I1lll1 === null) {
      console.log("\n⛔️ 用户当前会员等级不符合兑换要求");
      return;
    }
    if ($.buyerPoints >= i1I1lll1) {
      for (let IiiIilil = 0; IiiIilil < 10; IiiIilil++) {
        await exgHB();
        if ($.getPrize || $.exgStop || $.activityEnd) break;
        await $.wait(1000);
      }
      if (!$.getPrize && !$.exgStop && !$.activityEnd) {
        console.log("\n⛔️ 已尝试多次，未能兑换红包");
      }
    } else console.log("\n⛔️ 用户积分不足");
  } else {
    console.log("未能获取活动信息（店铺ID）");
    $.activityEnd = true;
  }
}
function showMsg() {
  return new Promise(i1i11l11 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    i1i11l11();
  });
}
function getSimpleActInfoVo() {
  return new Promise(IilIIiil => {
    let Ill1l1Il = "activityId=" + activityId;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", Ill1l1Il), async (ilIlliii, I11iIlii, l1IiIIi) => {
      try {
        if (ilIlliii) {
          console.log(String(ilIlliii));
          console.log($.name + " getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {}
      } catch (IIIIi1i1) {
        $.logErr(IIIIi1i1, I11iIlii);
      } finally {
        IilIIiil();
      }
    });
  });
}
function getCk() {
  return new Promise(lIl1llii => {
    let l1llIIil = {
      "url": activityUrl,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(l1llIIil, async (iIillII, iIli1iiI, IlI1l1ii) => {
      try {
        if (iIillII) {
          iIli1iiI && typeof iIli1iiI.statusCode != "undefined" && iIli1iiI.statusCode == 493 && (console.log("getCk 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          console.log("" + JSON.stringify(iIillII));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let i1lIlIi = IlI1l1ii.match(/(活动已结束)/) && IlI1l1ii.match(/(活动已结束)/)[1] || IlI1l1ii.match(/(活动尚未开始)/) && IlI1l1ii.match(/(活动尚未开始)/)[1] || "";
          i1lIlIi && ($.activityEnd = true, console.log("活动已结束或者未开始"));
          if (iIli1iiI.status == 200) {
            refreshToken(iIli1iiI);
          }
        }
      } catch (iiI11I1I) {
        $.logErr(iiI11I1I, iIli1iiI);
      } finally {
        lIl1llii();
      }
    });
  });
}
function getPin() {
  return new Promise(Il1ii1iI => {
    let iIlI111i = "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", iIlI111i), async (illl1, iiIIiIiI, lII1i1il) => {
      try {
        if (illl1) {
          console.log("" + JSON.stringify(illl1));
          console.log($.name + " 3 API请求失败，请检查网路重试");
        } else {
          iiIIiIiI.status == 200 && refreshToken(iiIIiIiI);
          if (safeGet(lII1i1il)) {
            lII1i1il = JSON.parse(lII1i1il);
            if (lII1i1il.result && lII1i1il.data) {
              $.Pin = lII1i1il.data.secretPin;
              $.AUTH_C_USER = $.Pin;
              $.attrTouXiang = lII1i1il.data.yunMidImageUrl ? lII1i1il.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
              $.nickName = lII1i1il.data.pin;
            } else {}
          }
        }
      } catch (Iilii11i) {
        $.logErr(Iilii11i, iiIIiIiI);
      } finally {
        Il1ii1iI();
      }
    });
  });
}
function getUserInfo() {
  return new Promise(iIlllIIl => {
    let lI11IiII = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/wxActionCommon/getUserInfo", lI11IiII), async (ll1IllIi, iII1ii11, iiIiII1) => {
      try {
        if (ll1IllIi) {
          console.log("" + JSON.stringify(ll1IllIi));
          console.log($.name + " 6-1 API请求失败，请检查网路重试");
        } else {
          if (safeGet(iiIiII1)) {
            iiIiII1 = JSON.parse(iiIiII1);
            if (iiIiII1.result && iiIiII1.data) $.attrTouXiang = iiIiII1.data.yunMidImageUrl ? iiIiII1.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";else {
              console.log("异常6-2：" + JSON.stringify(iiIiII1));
            }
          }
        }
      } catch (lII1iI) {
        $.logErr(lII1iI, iII1ii11);
      } finally {
        iIlllIIl();
      }
    });
  });
}
function getBuyerPoints(II1ll1iI = 0) {
  return new Promise(I11I1Ill => {
    let liI11l1i = encodeURIComponent(encodeURIComponent($.Pin)),
      i1l1IIll = "venderId=" + venderId + "&buyerPin=" + liI11l1i;
    $.post(taskPostUrl("/mc/wxPointShop/getBuyerPoints", i1l1IIll), async (IlilII11, lIIIilIi, IIllIl) => {
      try {
        if (IlilII11) {
          console.log("" + JSON.stringify(IlilII11));
          console.log($.name + "getBuyerPoints 请求失败，请检查网路重试");
        } else safeGet(IIllIl) && (IIllIl = JSON.parse(IIllIl), IIllIl.result && IIllIl.data ? ($.grade = IIllIl.data.grade, $.buyerPoints = IIllIl.data.buyerPoints) : console.log(IIllIl.errorMessage || ""));
      } catch (lI1II111) {
        $.logErr(lI1II111, lIIIilIi);
      } finally {
        I11I1Ill();
      }
    });
  });
}
function exgHB(lii11i1l = 0) {
  return new Promise(i1lllliI => {
    let i1l1lIlI = encodeURIComponent(encodeURIComponent($.Pin)),
      liliilIl = "buyerPin=" + i1l1lIlI + "&buyerNick=" + encodeURIComponent($.nickName) + "&giftId=" + activityId + "&venderId=" + venderId;
    $.post(taskPostUrl("/mc/wxPointShop/exgHB", liliilIl), async (Ii11lllI, llii1IiI, i1i1iIIi) => {
      try {
        if (Ii11lllI) {
          console.log("" + JSON.stringify(Ii11lllI));
          console.log($.name + "exgHB 请求失败，请检查网路重试");
        } else {
          if (safeGet(i1i1iIIi)) {
            i1i1iIIi = JSON.parse(i1i1iIIi);
            if (i1i1iIIi.result && i1i1iIIi.data) {
              console.log("🎉 兑换成功");
              $.getPrize = true;
            } else {
              let llii11iI = i1i1iIIi.errorMessage || "";
              if (!llii11iI.includes("擦肩") && !llii11iI.includes("火爆")) {
                console.log(llii11iI || "");
              }
              for (let ii11ii1 of ["未开始", "结束", "不存在", "不在", "发完", "兑完", "兑光", "发放完", "领完", "来晚", "抢光", "全部被领取", "余额不足"]) {
                if (llii11iI.includes(ii11ii1)) {
                  $.activityEnd = true;
                  break;
                }
              }
              for (let ill1l1iI of ["不足", "上限", "会员", "变更值", "擦肩"]) {
                if (llii11iI.includes(ill1l1iI)) {
                  $.exgStop = true;
                  break;
                }
              }
            }
          }
          llii1IiI.status == 200 && refreshToken(llii1IiI);
        }
      } catch (IlliiiIl) {
        $.logErr(IlliiiIl, llii1IiI);
      } finally {
        i1lllliI();
      }
    });
  });
}
function selectHbForC(l11i11 = 0) {
  return new Promise(lIIlIlI => {
    let l11liIlI = encodeURIComponent(encodeURIComponent($.Pin)),
      Il1iIllI = "venderId=" + venderId + "&giftId=" + activityId + "&&buyerPin=" + l11liIlI;
    $.post(taskPostUrl("/mc/hb/selectHbForC", Il1iIllI), async (llliil, ii1lliiI, li1l11i1) => {
      try {
        if (llliil) {
          console.log("" + JSON.stringify(llliil));
          console.log($.name + "selectHbForC 请求失败，请检查网路重试");
        } else {
          if (safeGet(li1l11i1)) {
            li1l11i1 = JSON.parse(li1l11i1);
            if (li1l11i1.result && li1l11i1.data) {
              $.giftName = li1l11i1.data.giftName;
              $.usedNum = li1l11i1.data.usedNum;
              $.num = li1l11i1.data.num;
              $.actrule = li1l11i1.data.actrule;
              $.exgTime = li1l11i1.data.exgTime;
              $.exgByActivity = li1l11i1.data.exgByActivity;
              $.exgByPeopDay = li1l11i1.data.exgByPeopDay;
              $.exgTimeType = li1l11i1.data.exgTimeType;
              $.otherRule = li1l11i1.data.otherRule;
              $.point0 = li1l11i1.data.point0;
              $.point1 = li1l11i1.data.point1;
              $.point2 = li1l11i1.data.point2;
              $.point3 = li1l11i1.data.point3;
              $.point4 = li1l11i1.data.point4;
              $.point5 = li1l11i1.data.point5;
              $.index === 1 && (console.log("活动名称：" + $.giftName), console.log("活动规则：\n" + $.actrule + "\n"));
              $.remainNum = parseInt($.num - $.usedNum);
            } else {
              console.log(li1l11i1.errorMessage || "");
            }
          }
        }
      } catch (I1lI1I) {
        $.logErr(I1lI1I, ii1lliiI);
      } finally {
        lIIlIlI();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(illI1Il1 => {
    let iIilll = "activityType=40&venderId=" + $.venderId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", iIilll), async (IIiI1i1l, iiiIl1lI, lIlilI1i) => {
      try {
        if (IIiI1i1l) {
          console.log("" + JSON.stringify(IIiI1i1l));
          console.log($.getOpenCardInfo + "API请求失败，请检查网路重试");
        } else {
          if (safeGet(lIlilI1i)) {
            lIlilI1i = JSON.parse(lIlilI1i);
            if (lIlilI1i.result && lIlilI1i.data) {
              $.openedCard = lIlilI1i.data.openedCard || false;
              if (lIlilI1i.data.openCardLink) {
                $.channel = lIlilI1i.data.openCardLink.match(/channel=(\d+)/)[1];
                $.joinVenderId = lIlilI1i.data.openCardLink.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (iiiilili) {
        $.logErr(iiiilili, iiiIl1lI);
      } finally {
        illI1Il1();
      }
    });
  });
}
function taskPostUrl(liIiiliI, l1iI1Ili) {
  return {
    "url": "" + domains + liIiiliI,
    "body": l1iI1Ili,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl,
      "Cookie": activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function accessLog() {
  return new Promise(async lIiiI1I => {
    const IIIi1IIi = {
      "url": domains + "/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": $.domain,
        "Origin": domains,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl,
        "Cookie": activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + venderId + "&code=202&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + activityId + "&pageUrl=https%3A%2F%2F$cjhy-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D" + activityId + "&subType=app"
    };
    $.post(IIIi1IIi, (IIiiI1i1, lllll11, lllillIl) => {
      try {
        if (IIiiI1i1) {
          console.log("" + JSON.stringify(IIiiI1i1));
          console.log($.name + " API请求失败，请检查网路重试");
        } else lllll11.status == 200 && refreshToken(lllll11);
      } catch (Ii11IllI) {
        $.logErr(Ii11IllI, lllll11);
      } finally {
        lIiiI1I();
      }
    });
  });
}
function refreshToken(Ii1i1iii) {
  if (Ii1i1iii) {
    if (Ii1i1iii.headers["set-cookie"]) {
      cookie = "";
      for (let IIiIilii of Ii1i1iii.headers["set-cookie"]) {
        lz_cookie[IIiIilii.split(";")[0].substr(0, IIiIilii.split(";")[0].indexOf("="))] = IIiIilii.split(";")[0].substr(IIiIilii.split(";")[0].indexOf("=") + 1);
      }
      for (const l1ill1iI of Object.keys(lz_cookie)) {
        cookie += l1ill1iI + "=" + lz_cookie[l1ill1iI] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(iIlill1I) {
  iIlill1I = iIlill1I || 32;
  let li11I11I = "abcdef0123456789",
    III1IlIi = li11I11I.length,
    IiIlilI = "";
  for (i = 0; i < iIlill1I; i++) IiIlilI += li11I11I.charAt(Math.floor(Math.random() * III1IlIi));
  return IiIlilI;
}
function random(IIIi1iil, lIlIi1I1) {
  return Math.floor(Math.random() * (lIlIi1I1 - IIIi1iil)) + IIIi1iil;
}
function safeGet(llli1i) {
  if (!llli1i) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(llli1i) == "object") return true;
  } catch (i1l1lI1) {
    return console.log(i1l1lI1), false;
  }
}
function jsonParse(liliIlIi) {
  if (typeof liliIlIi == "string") try {
    return JSON.parse(liliIlIi);
  } catch (i1lii11I) {
    return console.log(i1lii11I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(lililIi, llIII1li) {
  let lIilll11 = new RegExp("(^|[&?])" + llIII1li + "=([^&]*)(&|$)"),
    ll1lIi1 = lililIi.match(lIilll11);
  if (ll1lIi1 != null) return decodeURIComponent(ll1lIi1[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async liil1i1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IiliIllI = "";
    if ($.shopactivityId) IiliIllI = ",\"activityId\":" + $.shopactivityId;
    const iI1IIIll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IiliIllI + ",\"channel\":406}",
      l1lilii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iI1IIIll)
      },
      IilIi111 = await getH5st("8adfb", l1lilii),
      IiIlIlii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iI1IIIll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IilIi111),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IiIlIlii, async (i1iI1li, lIii1I1l, il1i1ill) => {
      try {
        il1i1ill = il1i1ill && il1i1ill.match(/jsonp_.*?\((.*?)\);/) && il1i1ill.match(/jsonp_.*?\((.*?)\);/)[1] || il1i1ill;
        let iliii1iI = $.toObj(il1i1ill, il1i1ill);
        if (iliii1iI && typeof iliii1iI == "object") {
          if (iliii1iI && iliii1iI.success === true) {
            console.log(iliii1iI.message);
            $.errorJoinShop = iliii1iI.message;
            if (iliii1iI.result && iliii1iI.result.giftInfo) {
              for (let iIilIi1I of iliii1iI.result.giftInfo.giftList) {
                console.log("入会获得: " + iIilIi1I.discountString + iIilIi1I.prizeName + iIilIi1I.secondLineDesc);
              }
            }
            console.log("");
          } else iliii1iI && typeof iliii1iI == "object" && iliii1iI.message ? ($.errorJoinShop = iliii1iI.message, console.log("" + (iliii1iI.message || ""))) : console.log(il1i1ill);
        } else console.log(il1i1ill);
      } catch (IIlli1l1) {
        $.logErr(IIlli1l1, lIii1I1l);
      } finally {
        liil1i1I();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async lill1Iil => {
    let lillliI1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IliiIlI1 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lillliI1)
      },
      i1iIlI1i = await getH5st("ef79a", IliiIlI1),
      l1I1i1i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + lillliI1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1iIlI1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1I1i1i, async (lII111i, lIlllli1, IiIIi1l1) => {
      try {
        IiIIi1l1 = IiIIi1l1 && IiIIi1l1.match(/jsonp_.*?\((.*?)\);/) && IiIIi1l1.match(/jsonp_.*?\((.*?)\);/)[1] || IiIIi1l1;
        let liIiiilI = $.toObj(IiIIi1l1, IiIIi1l1);
        liIiiilI && typeof liIiiilI == "object" ? liIiiilI && liIiiilI.success == true && (console.log("\n去加入店铺会员：" + (liIiiilI.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = liIiiilI.result.interestsRuleList && liIiiilI.result.interestsRuleList[0] && liIiiilI.result.interestsRuleList[0].interestsInfo && liIiiilI.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(IiIIi1l1);
      } catch (liIlll1i) {
        $.logErr(liIlll1i, lIlllli1);
      } finally {
        lill1Iil();
      }
    });
  });
}
