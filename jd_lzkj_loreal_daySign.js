/*
活动名称：签到有礼（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=<10023/10040>&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_daySign_url // 活动链接
         jd_lzkj_loreal_daySign_openCard // 是否开卡，默认不开卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('签到有礼（超级无线欧莱雅）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityUrl = process.env.jd_lzkj_loreal_daySign_url,
  openCard = process.env.jd_lzkj_loreal_daySign_openCard === "true" ? true : false,
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_daySign_url) activityUrl = process.env.jd_lzkj_loreal_daySign_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(l1i1llI => {
    cookiesArr.push(jdCookieNode[l1i1llI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lIlil1I1 => lIlil1I1.cookie)].filter(IIliII1l => !!IIliII1l);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  activityType = getQueryString("" + activityUrl, "activityType");
  templateId = getQueryString("" + activityUrl, "templateId");
  if (activityUrl.includes("lorealjdcampaign-rc")) wxActType = "apps/interact";else {
    if (activityUrl.includes("lzkj")) wxActType = activityUrl.match(/\/(prod\/cc\/interact\w*)\//)[1];else {
      console.log("暂不支持的类型");
      return;
    }
  }
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
}
let domains = "https://" + $.domain;
!(async () => {
  if (activityId == null) {
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
  for (let IiiilIiI = 0; IiiilIiI < cookiesArr.length; IiiilIiI++) {
    if (cookiesArr[IiiilIiI]) {
      cookie = cookiesArr[IiiilIiI];
      originCookie = cookiesArr[IiiilIiI];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = IiiilIiI + 1;
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
      await Main();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag) {
        break;
      }
    }
  }
})().catch(liIIlii => {
  $.log("", " " + $.name + ", 失败! 原因: " + liIIlii + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.OpenCard = false;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) return;
    await $.wait(300);
    await follow();
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    await $.wait(300);
    await activity("daySign");
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    await drawPrize();
    await $.wait(300);
    if ($.index == 1) {
      $.prizeList = "";
      for (let i1iili11 = 0; i1iili11 < $.prizeInfo.length; i1iili11++) {
        $.prizeName = $.prizeInfo[i1iili11].prizeName;
        $.leftNum = $.prizeInfo[i1iili11].leftNum;
        $.prizeType = $.prizeInfo[i1iili11].prizeType;
        $.position = $.signPiize[i1iili11].signNumber || 99;
        switch ($.prizeType) {
          case 1:
            $.prizeType = "[京豆]";
            break;
          case 2:
            $.prizeType = "[优惠券]";
            break;
          case 3:
            $.prizeType = "[实物]";
            break;
          case 4:
            $.prizeType = "[积分]";
            break;
          case 5:
            $.prizeType = "[专享价]";
            break;
          case 6:
            $.prizeType = "[红包]";
            break;
          case 7:
            $.prizeType = "[礼品卡]";
            break;
          case 8:
            $.prizeType = "[E卡]";
            break;
          case 9:
            $.prizeType = "[PLUS会员]";
            break;
          case 10:
            $.prizeType = "[爱奇艺会员]";
            break;
          case 11:
            $.prizeType = "[积分]";
            break;
          default:
            console.log("未成功获取数据");
            return;
        }
        i1iili11 != $.prizeInfo.length - 1 ? $.prizeList += "签到" + $.position + "天，" + $.prizeType + $.prizeName + "（剩余" + $.leftNum + "件）\n" : $.prizeList += "签到" + $.position + "天，" + $.prizeType + $.prizeName + "（剩余" + $.leftNum + "件）\n";
      }
      console.log("店铺名称：" + $.shopName + "\n活动名称：" + $.actName + "\n累计奖励：" + $.prizeList + "\n");
    }
    console.log("连续签到天数：" + $.signNum + "  累计签到天数: " + $.continuityNum + "\n");
    await getSignClick();
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function getShopOpenCardInfo(IlIlilii) {
  let lI1lII1l = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(IlIlilii)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(llIilI1i => {
    $.get(lI1lII1l, (iiiiiliI, IIill1Ii, i1I1llI) => {
      try {
        if (iiiiiliI) {
          if (iiiiiliI === "Response code 403 (Forbidden)") {
            $.err = true;
            console.log(String(iiiiiliI));
          }
        } else {
          res = JSON.parse(i1I1llI);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (ilil1l) {
        console.log(ilil1l);
      } finally {
        llIilI1i();
      }
    });
  });
}
function showMsg() {
  return new Promise(Iii1II1l => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    Iii1II1l();
  });
}
function login(i1iiIil1, lIIl1iil) {
  return new Promise(l1IIIll => {
    $.post(taskPostUrl(i1iiIil1, lIIl1iil), async (II1iiIIi, I1lIIlli, IIl11IiI) => {
      try {
        if (II1iiIIi) {
          console.log("" + JSON.stringify(II1iiIIi));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          IIl11IiI = JSON.parse(IIl11IiI);
          if (IIl11IiI && IIl11IiI.data) {
            $.tokens = IIl11IiI.data.token;
            $.customerId = IIl11IiI.data.customerId;
            $.joinVenderId = IIl11IiI.data.joinInfo.shopId;
            $.openCardUrl = IIl11IiI.data.joinInfo.openCardUrl;
            $.shopName = IIl11IiI.data.shopName;
            $.actName = IIl11IiI.data.actName;
            $.openCardUrl && ($.joinVenderId = IIl11IiI.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1]);
            $.joinDes = IIl11IiI.data.joinInfo.joinCodeInfo.joinDes;
            if (openCard) {
              if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
                $.errorJoinShop = "";
                await getshopactivityId();
                for (let i1Il111i = 0; i1Il111i < Array(2).length; i1Il111i++) {
                  if (i1Il111i > 0) console.log("第" + i1Il111i + "次 重新开卡");
                  await joinShop();
                  if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
                  $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
                }
              }
            }
          } else console.log(IIl11IiI);
          I1lIIlli.status == 200 && refreshToken(I1lIIlli);
        }
      } catch (liI11IIl) {
        $.logErr(liI11IIl, I1lIIlli);
      } finally {
        l1IIIll();
      }
    });
  });
}
function follow() {
  return new Promise(llii11Ii => {
    let i1Iiiil = {};
    $.post(taskPostUrl("api/task/followShop/follow", i1Iiiil), async (li11I1i1, lIIIIIl, l111il) => {
      try {
        if (li11I1i1) {
          console.log("" + JSON.stringify(li11I1i1));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          l111il = JSON.parse(l111il);
          if (l111il && l111il.resp_code == 0) {} else {
            console.log(l111il.resp_msg);
            for (let li11l1i of ["未开始", "结束", "不存在", "不在"]) {
              if (l111il.resp_msg.includes(li11l1i)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          lIIIIIl.status == 200 && refreshToken(lIIIIIl);
        }
      } catch (lIi11I1l) {
        $.logErr(lIi11I1l, lIIIIIl);
      } finally {
        llii11Ii();
      }
    });
  });
}
function activity() {
  return new Promise(Iii1ii => {
    let llII1Ii1 = {};
    $.post(taskPostUrl("api/task/daySign/activity", llII1Ii1), async (iIi1ii1, llIill1l, illIiI1l) => {
      try {
        if (iIi1ii1) {
          console.log("" + JSON.stringify(iIi1ii1));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          illIiI1l = JSON.parse(illIiI1l);
          if (illIiI1l && illIiI1l.data) {
            $.sign = illIiI1l?.["data"]?.["sign"] || false;
            $.signNum = illIiI1l?.["data"]?.["signNum"] || 0;
            $.leftNum = illIiI1l?.["data"]?.["leftNum"] || 0;
            $.isFocusShop = illIiI1l?.["data"]?.["isFocusShop"] || false;
            $.continuityNum = illIiI1l?.["data"]?.["continuityNum"] || 0;
            $.signContinuityNum = illIiI1l?.["data"]?.["signContinuityNum"] || 0;
            $.signPiize = illIiI1l?.["data"]?.["signPiize"] || [];
          } else {
            console.log(illIiI1l.resp_msg);
            for (let illIli1 of ["未开始", "结束", "不存在", "不在"]) {
              if (illIiI1l.resp_msg.includes(illIli1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          llIill1l.status == 200 && refreshToken(llIill1l);
        }
      } catch (il1Iil1I) {
        $.logErr(il1Iil1I, llIill1l);
      } finally {
        Iii1ii();
      }
    });
  });
}
function getSignClick() {
  return new Promise(ll1lilI1 => {
    let iililI1 = {};
    $.post(taskPostUrl("api/task/daySign/getSignClick", iililI1), async (lI1IiiII, I1l11ll, I1il1l1I) => {
      try {
        if (lI1IiiII) {
          console.log("" + JSON.stringify(lI1IiiII));
          console.log($.name + " getSignClick API请求失败，请检查网路重试");
        } else {
          I1il1l1I = JSON.parse(I1il1l1I);
          if (I1il1l1I && I1il1l1I.resp_code == 0) {
            if (!I1il1l1I.data) console.log("💨 空气");else {
              drawInfo = I1il1l1I.data;
              if (drawInfo) switch (drawInfo.prizeType) {
                case 1:
                  console.log("🎉 " + drawInfo.prizeName + " 🐶");
                  break;
                case 2:
                  console.log("🗑️ 优惠券");
                  break;
                case 3:
                  generateId = I1il1l1I.data.prizeInfoId;
                  prizeName = drawInfo.prizeName;
                  console.log(I1il1l1I);
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  break;
                case 4:
                case 11:
                  console.log("🗑️ " + drawInfo.prizeName + " 🎟️");
                  break;
                case 5:
                  console.log("🗑️ 专享价");
                  break;
                case 6:
                  console.log("🎉 " + drawInfo.prizeName + " 🧧");
                  break;
                case 8:
                  console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                  break;
                case 7:
                case 9:
                case 10:
                case 12:
                  console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                  break;
                default:
                  console.log(drawInfo);
                  break;
              }
            }
          } else {
            console.log(I1il1l1I.resp_msg);
            for (let iI11I1l1 of ["未开始", "结束", "不存在", "不在"]) {
              if (I1il1l1I.resp_msg.includes(iI11I1l1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          I1l11ll.status == 200 && refreshToken(I1l11ll);
        }
      } catch (III1ill1) {
        $.logErr(III1ill1, I1l11ll);
      } finally {
        ll1lilI1();
      }
    });
  });
}
function basicInfo() {
  return new Promise(I1i1Ilil => {
    let iii1IiIl = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", iii1IiIl), async (lI1IIil1, lill1ili, Ili1I1I) => {
      try {
        lI1IIil1 ? (console.log("" + JSON.stringify(lI1IIil1)), console.log($.name + " basicInfo API请求失败，请检查网路重试")) : (Ili1I1I = JSON.parse(Ili1I1I), Ili1I1I && Ili1I1I.resp_code == 0 ? ($.actName = Ili1I1I.data.actName, $.shopName = Ili1I1I.data.shopName) : console.log(Ili1I1I), lill1ili.status == 200 && refreshToken(lill1ili));
      } catch (iiiII1il) {
        $.logErr(iiiII1il, lill1ili);
      } finally {
        I1i1Ilil();
      }
    });
  });
}
function drawPrize() {
  return new Promise(iII1lI11 => {
    let ii1I1Iii = {};
    $.post(taskPostUrl("api/prize/drawPrize", ii1I1Iii), async (Ii11lIii, I1Iii1iI, ilii11il) => {
      try {
        if (Ii11lIii) {
          console.log("" + JSON.stringify(Ii11lIii));
          console.log($.name + " drawPrize API请求失败，请检查网路重试");
        } else {
          ilii11il = JSON.parse(ilii11il);
          if (ilii11il && ilii11il.resp_code == 0) {
            $.drawNumber = ilii11il.data.drawNumber;
            $.prizeInfo = ilii11il.data.prizeInfo || [];
          } else {
            console.log(ilii11il);
          }
          if (I1Iii1iI.status == 200) {
            refreshToken(I1Iii1iI);
          }
        }
      } catch (l11iilIi) {
        $.logErr(l11iilIi, I1Iii1iI);
      } finally {
        iII1lI11();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async i11IIIi => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiil1l1l = "";
    if ($.shopactivityId) iiil1l1l = ",\"activityId\":" + $.shopactivityId;
    const IliIl1ll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiil1l1l + ",\"channel\":406}",
      IiiII1lI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IliIl1ll)
      },
      llli1Iil = await getH5st("8adfb", IiiII1lI),
      Ii11i1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IliIl1ll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(llli1Iil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ii11i1, async (liI1l1i, liIl11I, IliIlIiI) => {
      try {
        IliIlIiI = IliIlIiI && IliIlIiI.match(/jsonp_.*?\((.*?)\);/) && IliIlIiI.match(/jsonp_.*?\((.*?)\);/)[1] || IliIlIiI;
        let il1111I1 = $.toObj(IliIlIiI, IliIlIiI);
        if (il1111I1 && typeof il1111I1 == "object") {
          if (il1111I1 && il1111I1.success === true) {
            console.log(il1111I1.message);
            $.errorJoinShop = il1111I1.message;
            if (il1111I1.result && il1111I1.result.giftInfo) for (let Il1li1I1 of il1111I1.result.giftInfo.giftList) {
              console.log("入会获得: " + Il1li1I1.discountString + Il1li1I1.prizeName + Il1li1I1.secondLineDesc);
            }
            console.log("");
          } else il1111I1 && typeof il1111I1 == "object" && il1111I1.message ? ($.errorJoinShop = il1111I1.message, console.log("" + (il1111I1.message || ""))) : console.log(IliIlIiI);
        } else {
          console.log(IliIlIiI);
        }
      } catch (lliIl1II) {
        $.logErr(lliIl1II, liIl11I);
      } finally {
        i11IIIi();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async i1IiI1Ii => {
    let ll11ll1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const lIlil1I = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ll11ll1)
      },
      l1lI1i1I = await getH5st("ef79a", lIlil1I),
      iIliii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ll11ll1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1lI1i1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIliii, async (IIlii11l, ll1iiiii, i1ii1iI) => {
      try {
        i1ii1iI = i1ii1iI && i1ii1iI.match(/jsonp_.*?\((.*?)\);/) && i1ii1iI.match(/jsonp_.*?\((.*?)\);/)[1] || i1ii1iI;
        let llilll1l = $.toObj(i1ii1iI, i1ii1iI);
        llilll1l && typeof llilll1l == "object" ? llilll1l && llilll1l.success == true && (console.log("\n去加入店铺会员：" + (llilll1l.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = llilll1l.result.interestsRuleList && llilll1l.result.interestsRuleList[0] && llilll1l.result.interestsRuleList[0].interestsInfo && llilll1l.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(i1ii1iI);
      } catch (l1l1i1li) {
        $.logErr(l1l1i1li, ll1iiiii);
      } finally {
        i1IiI1Ii();
      }
    });
  });
}
function taskPostUrl(ll1i1ii1, II1Ii) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + ll1i1ii1,
    "body": JSON.stringify(II1Ii),
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": activityUrl,
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    },
    "timeout": 15 * 1000
  };
}
function refreshToken(i1l11llI) {
  if (i1l11llI) {
    if (i1l11llI.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let IIlill of i1l11llI.headers["set-cookie"]) {
        lz_cookie[IIlill.split(";")[0].substr(0, IIlill.split(";")[0].indexOf("="))] = IIlill.split(";")[0].substr(IIlill.split(";")[0].indexOf("=") + 1);
      }
      for (const iI1l11i1 of Object.keys(lz_cookie)) {
        cookie += iI1l11i1 + "=" + lz_cookie[iI1l11i1] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(lIIi1i1l) {
  return new Promise(iilIi1 => {
    const I1iI111l = {
      "url": lIIi1i1l + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1iI111l, async (li11iIlI, i1I11ii1, iiill1ii) => {
      try {
        if (li11iIlI) $.getAuthorCodeListerr = false;else {
          if (iiill1ii) iiill1ii = JSON.parse(iiill1ii);
          $.getAuthorCodeListerr = true;
        }
      } catch (IlIllI) {
        $.logErr(IlIllI, i1I11ii1);
        iiill1ii = null;
      } finally {
        iilIi1(iiill1ii);
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(iiIiIIi1) {
  iiIiIIi1 = iiIiIIi1 || 32;
  let liI1lllI = "abcdef0123456789",
    I1i1lIi1 = liI1lllI.length,
    iI1111l = "";
  for (i = 0; i < iiIiIIi1; i++) iI1111l += liI1lllI.charAt(Math.floor(Math.random() * I1i1lIi1));
  return iI1111l;
}
function getQueryString(iiII1lil, IllIlli) {
  let IIlilIli = new RegExp("(^|[&?])" + IllIlli + "=([^&]*)(&|$)"),
    llI1iiil = iiII1lil.match(IIlilIli);
  if (llI1iiil != null) {
    return decodeURIComponent(llI1iiil[2]);
  }
  return "";
}
function safeGet(i1l1IIIl) {
  if (!i1l1IIIl) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(i1l1IIIl) == "object") return true;
  } catch (IllI111) {
    return console.log(IllI111), false;
  }
}
function jsonParse(IiiillI1) {
  if (typeof IiiillI1 == "string") {
    try {
      return JSON.parse(IiiillI1);
    } catch (iilllli1) {
      return console.log(iilllli1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
