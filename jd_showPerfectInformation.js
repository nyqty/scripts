/*
活动名称：完善资料有礼 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/showPerfectInformation?id=<活动id>&user_id=<店铺id>
环境变量：jd_showPerfectInformation_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('完善资料有礼（京耕）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_showPerfectInformation_activityUrl) activityUrl = process.env.jd_showPerfectInformation_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(l11IiIli => {
    cookiesArr.push(jdCookieNode[l11IiIli]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(I1iilll => I1iilll.cookie)].filter(li1I1il1 => !!li1I1il1);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "id");
  venderId = getQueryString("" + activityUrl, "user_id");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：https://jinggeng-isv.isvjcloud.com/ql/front/showPerfectInformation?id=" + activityId + "&user_id=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let Iillll1I = 0; Iillll1I < cookiesArr.length; Iillll1I++) {
    if (cookiesArr[Iillll1I]) {
      cookie = cookiesArr[Iillll1I];
      originCookie = cookiesArr[Iillll1I];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = Iillll1I + 1;
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
      await getUA();
      await showPerfectInformation();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(I1llIli => {
  $.log("", " " + $.name + ", 失败! 原因: " + I1llIli + "!", "");
}).finally(() => {
  $.done();
});
async function showPerfectInformation() {
  $.shopid = venderId;
  $.token = "";
  $.errs = false;
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.shopid) {
    await setMixNick();
    if ($.inviterNicks == "") {
      console.log("获取[inviterNick]失败！");
      return;
    }
    await showPerfectInformationz();
    if ($.activityEnd === true) {
      return;
    }
    await recordActPvUvData();
    await postAddMaterial();
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function setMixNick() {
  return new Promise(Iilliii => {
    let Ilill1 = "strTMMixNick=" + $.token + "&userId=" + $.shopid + "&source=01";
    $.post(taskPostUrl("/front/setMixNick", Ilill1), async (IIiiiIi, l11llii, iilI1il1) => {
      try {
        IIiiiIi ? (console.log("" + JSON.stringify(IIiiiIi)), console.log($.name + " setMixNick API请求失败，请检查网路重试")) : (iilI1il1 = JSON.parse(iilI1il1), iilI1il1 && iilI1il1.succ && ($.inviterNicks = iilI1il1.msg), l11llii.status == 200 && refreshToken(l11llii));
      } catch (I1l11ll1) {
        $.logErr(I1l11ll1, l11llii);
      } finally {
        Iilliii();
      }
    });
  });
}
function recordActPvUvData() {
  return new Promise(ilii11Ii => {
    let IilII1I1 = "userId=" + $.shopid + "&actId=" + activityId;
    $.post(taskPostUrl("/ql/front/reportActivity/recordActPvUvData", IilII1I1), async (lIl1lli1, iIIlii1i, i1ii1l1i) => {
      try {
        if (lIl1lli1) {
          console.log("" + JSON.stringify(lIl1lli1));
          console.log($.name + " recordActPvUvData API请求失败，请检查网路重试");
        } else {
          if (iIIlii1i.status == 200) {
            refreshToken(iIIlii1i);
          }
        }
      } catch (i1iii) {
        $.logErr(i1iii, iIIlii1i);
      } finally {
        ilii11Ii();
      }
    });
  });
}
function followShop() {
  return new Promise(i11Iili => {
    let ilIIIi1 = "userId=" + $.shopid;
    $.post(taskPostUrl("/front/followShop", ilIIIi1), async (l1I11iii, I1l1i1i1, Iil111i1) => {
      try {
        l1I11iii ? (console.log("" + JSON.stringify(l1I11iii)), console.log($.name + " followShop API请求失败，请检查网路重试")) : I1l1i1i1.status == 200 && refreshToken(I1l1i1i1);
      } catch (lil1i1) {
        $.logErr(lil1i1, I1l1i1i1);
      } finally {
        i11Iili();
      }
    });
  });
}
function postAddMaterial() {
  return new Promise(iiiI11li => {
    let l11IliII = ["%7B%22%E5%A7%93%E5%90%8D%22%3A%22%E9%98%BF%E7%8F%82%22%2C%22%E6%80%A7%E5%88%AB%22%3A%22%E7%94%B7%22%2C%22%E7%94%9F%E6%97%A5%22%3A%222022-9-10%22%2C%22%E6%89%8B%E6%9C%BA%E5%8F%B7%E7%A0%81%22%3A%2215870532585%22%2C%22%E8%81%8C%E4%B8%9A%22%3A%22%E5%85%AC%E5%8F%B8%E8%81%8C%E5%91%98%22%2C%22%E5%9C%B0%E5%8C%BA(%E7%9C%81%E5%B8%82)%22%3A%22%E5%8C%97%E4%BA%AC%E5%B8%82-%E5%8C%97%E4%BA%AC%E5%B8%82%22%2C%7D", "%7B%22%E5%A7%93%E5%90%8D%22%3A%22%E5%91%B5%E6%8A%A4%22%2C%22%E6%80%A7%E5%88%AB%22%3A%22%E7%94%B7%22%2C%22%E7%94%9F%E6%97%A5%22%3A%222022-7-10%22%2C%22%E6%89%8B%E6%9C%BA%E5%8F%B7%E7%A0%81%22%3A%2213478474121%22%2C%22%E8%81%8C%E4%B8%9A%22%3A%22%E5%85%AC%E5%8F%B8%E8%81%8C%E5%91%98%22%2C%22%E5%9C%B0%E5%8C%BA(%E7%9C%81%E5%B8%82)%22%3A%22%E5%8C%97%E4%BA%AC%E5%B8%82-%E5%8C%97%E4%BA%AC%E5%B8%82%22%2C%7D"],
      iI1l1Ill = 0;
    iI1l1Ill = Math.floor(Math.random() * l11IliII.length);
    $.detail = l11IliII[iI1l1Ill] ? l11IliII[iI1l1Ill] : $.detail;
    let II1Il1i = "detail=" + $.detail + "&act_id=" + activityId + "&user_id=" + $.shopid;
    $.post(taskPostUrl("/ql/front/postAddMaterial", II1Il1i), async (i1i1il1i, iI11l1iI, llllliil) => {
      try {
        if (i1i1il1i) {
          console.log("" + JSON.stringify(i1i1il1i));
          console.log($.name + " postAddMaterial API请求失败，请检查网路重试");
        } else {
          llllliil = JSON.parse(llllliil);
          if (llllliil && llllliil.succ) {
            let IiIli1 = JSON.parse(llllliil.msg).drawAwardDto,
              iliIi1l = IiIli1.awardType;
            switch (iliIi1l) {
              case "JD_BEAN":
                console.log("🎉 " + IiIli1.awardName + " 🐶");
                break;
              case "JD_POINT":
                console.log("🗑️ " + IiIli1.awardSendNum + IiIli1.awardName + " 🎟️");
                break;
              case "JD_COUPON":
                console.log("🗑️ 优惠券");
                break;
              default:
                console.log(IiIli1);
                break;
            }
          } else {
            llllliil.msg.includes("未中奖") ? console.log("💨 空气") : console.log("" + llllliil.msg);
            i1i1il1i = llllliil.msg;
            for (let lIIi1li of ["不足", "部分会员", "火爆", "上限"]) {
              if (i1i1il1i.includes(lIIi1li)) {
                $.errs = true;
                break;
              }
            }
          }
          iI11l1iI.status == 200 && refreshToken(iI11l1iI);
        }
      } catch (Iil1li1i) {
        $.logErr(Iil1li1i, iI11l1iI);
      } finally {
        iiiI11li();
      }
    });
  });
}
function showPerfectInformationz() {
  return new Promise(lilliiII => {
    const I1lI1lI = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showPerfectInformation?id=" + activityId + "&user_id=" + $.shopid,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showPerfectInformation?id=" + activityId + "&user_id=" + $.shopid,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(I1lI1lI, async (Ilil1lll, il1lIIli, i11iiI11) => {
      try {
        if (Ilil1lll) {
          console.log("" + JSON.stringify(Ilil1lll));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          i11iiI11 = i11iiI11;
          if (i11iiI11) {
            let iIliI111 = i11iiI11.match(/(活动已结束)/) && i11iiI11.match(/(活动已结束)/)[1] || "";
            iIliI111 && ($.activityEnd = true, console.log("活动已结束"));
          }
        }
      } catch (liIlIli) {
        $.logErr(liIlIli, il1lIIli);
      } finally {
        lilliiII();
      }
    });
  });
}
function getShopOpenCardInfo(iIl1lili) {
  let l1iiIIlI = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(iIl1lili)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(activityUrl),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(l1ii1IIi => {
    $.get(l1iiIIlI, (IIIIiii1, lIl11l1, lliIilI) => {
      try {
        if (IIIIiii1) {
          if (IIIIiii1 === "Response code 403 (Forbidden)") {
            $.err = true;
            console.log(String(IIIIiii1));
          }
        } else {
          res = JSON.parse(lliIilI);
          if (res.success) {
            $.openCardStatus = res.result.userInfo.openCardStatus;
            if (res.result.interestsRuleList) {
              $.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId;
            }
          }
        }
      } catch (Ill1l) {
        console.log(Ill1l);
      } finally {
        l1ii1IIi();
      }
    });
  });
}
function taskPostUrl(li1i11I1, li11iI1l) {
  return {
    "url": "" + domains + li1i11I1,
    "body": li11iI1l,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "Host": "jinggeng-isv.isvjcloud.com",
      "Origin": "https://jinggeng-isv.isvjcloud.com",
      "Referer": "https://jinggeng-isv.isvjcloud.com/ql/front/showPerfectInformation?id=" + activityId + "&user_id=" + venderId,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    }
  };
}
function taskUrl(lillIiI1, l11i1Ili) {
  return {
    "url": "https://api.m.jd.com/client.action" + lillIiI1,
    "body": l11i1Ili,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Cookie": cookie,
      "User-Agent": $.UA
    }
  };
}
function refreshToken(Ii1ilI) {
  if (Ii1ilI) {
    if (Ii1ilI.headers["set-cookie"]) {
      cookie = "";
      for (let Il111Il1 of Ii1ilI.headers["set-cookie"]) {
        lz_cookie[Il111Il1.split(";")[0].substr(0, Il111Il1.split(";")[0].indexOf("="))] = Il111Il1.split(";")[0].substr(Il111Il1.split(";")[0].indexOf("=") + 1);
      }
      for (const iiII1iil of Object.keys(lz_cookie)) {
        cookie += iiII1iil + "=" + lz_cookie[iiII1iil] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(Ii1ii1lI) {
  Ii1ii1lI = Ii1ii1lI || 32;
  let l1lIIlIl = "abcdef0123456789",
    lillIIil = l1lIIlIl.length,
    II11i11 = "";
  for (i = 0; i < Ii1ii1lI; i++) II11i11 += l1lIIlIl.charAt(Math.floor(Math.random() * lillIIil));
  return II11i11;
}
function safeGet(li11iil1) {
  if (!li11iil1) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(li11iil1) == "object") {
      return true;
    }
  } catch (ill1i11l) {
    return console.log(ill1i11l), false;
  }
}
function jsonParse(Ill11IlI) {
  if (typeof Ill11IlI == "string") try {
    return JSON.parse(Ill11IlI);
  } catch (lili1Ili) {
    return console.log(lili1Ili), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(ii1liIil, IlII11il) {
  let IiliIiiI = new RegExp("(^|[&?])" + IlII11il + "=([^&]*)(&|$)"),
    Ii1IiIlI = ii1liIil.match(IiliIiiI);
  if (Ii1IiIlI != null) return decodeURIComponent(Ii1IiIlI[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async i11liIIi => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IiIil1I1 = "";
    if ($.shopactivityId) IiIil1I1 = ",\"activityId\":" + $.shopactivityId;
    const Il1II1Ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IiIil1I1 + ",\"channel\":406}",
      i11l1liI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il1II1Ii)
      },
      i1iiIlli = await getH5st("8adfb", i11l1liI),
      Il1iIiI1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Il1II1Ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1iiIlli),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Il1iIiI1, async (IIIIii1I, II111I, iIlI1lll) => {
      try {
        iIlI1lll = iIlI1lll && iIlI1lll.match(/jsonp_.*?\((.*?)\);/) && iIlI1lll.match(/jsonp_.*?\((.*?)\);/)[1] || iIlI1lll;
        let iiII1I1I = $.toObj(iIlI1lll, iIlI1lll);
        if (iiII1I1I && typeof iiII1I1I == "object") {
          if (iiII1I1I && iiII1I1I.success === true) {
            console.log(iiII1I1I.message);
            $.errorJoinShop = iiII1I1I.message;
            if (iiII1I1I.result && iiII1I1I.result.giftInfo) {
              for (let ili1I11l of iiII1I1I.result.giftInfo.giftList) {
                console.log("入会获得: " + ili1I11l.discountString + ili1I11l.prizeName + ili1I11l.secondLineDesc);
              }
            }
            console.log("");
          } else {
            if (iiII1I1I && typeof iiII1I1I == "object" && iiII1I1I.message) {
              $.errorJoinShop = iiII1I1I.message;
              console.log("" + (iiII1I1I.message || ""));
            } else console.log(iIlI1lll);
          }
        } else console.log(iIlI1lll);
      } catch (ii1Il1lI) {
        $.logErr(ii1Il1lI, II111I);
      } finally {
        i11liIIi();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async lll1IIii => {
    let lII1Iiii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IIIilIll = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lII1Iiii)
      },
      llI1Ii1 = await getH5st("ef79a", IIIilIll),
      II11I1II = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + lII1Iiii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(llI1Ii1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(II11I1II, async (il11lIll, ii1liIi1, ilIi1l11) => {
      try {
        ilIi1l11 = ilIi1l11 && ilIi1l11.match(/jsonp_.*?\((.*?)\);/) && ilIi1l11.match(/jsonp_.*?\((.*?)\);/)[1] || ilIi1l11;
        let Ii11Iill = $.toObj(ilIi1l11, ilIi1l11);
        if (Ii11Iill && typeof Ii11Iill == "object") {
          Ii11Iill && Ii11Iill.success == true && (console.log("\n去加入店铺会员：" + (Ii11Iill.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = Ii11Iill.result.interestsRuleList && Ii11Iill.result.interestsRuleList[0] && Ii11Iill.result.interestsRuleList[0].interestsInfo && Ii11Iill.result.interestsRuleList[0].interestsInfo.activityId || "");
        } else console.log(ilIi1l11);
      } catch (l1111i1l) {
        $.logErr(l1111i1l, ii1liIi1);
      } finally {
        lll1IIii();
      }
    });
  });
}
