/*
活动名称：盖楼有礼 · 超级无线
活动链接：https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=<活动id>
环境变量：jd_wxBuildActivity_activityId // 活动id
         jd_wxBuildActivity_openCard // 是否开卡，默认不开卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('盖楼有礼（超级无线）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(lliII1 => {
    cookiesArr.push(jdCookieNode[lliII1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IlIiIlI => IlIiIlI.cookie)].filter(iII11il1 => !!iII11il1);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  jd_wxBuildActivity_activityId = process.env.jd_wxBuildActivity_activityId ? process.env.jd_wxBuildActivity_activityId : "",
  openCard = process.env.jd_wxBuildActivity_openCard === "true" ? true : false;
const defaultWordsArr = ["%E4%B8%8D%E9%94%99%EF%BC%8C%E6%88%91%E6%9D%A5%E4%BA%86", "%E6%88%91%E4%B9%9F%E5%8F%82%E5%8A%A0%E4%B8%8B%E6%B4%BB%E5%8A%A8%E8%AF%95%E8%AF%95%EF%BC%81", "6666%EF%BC%8C%E8%80%81%E9%93%81", "%E5%B8%8C%E6%9C%9B%E4%B8%AD%E5%A5%96%E5%95%8A%EF%BC%81", "%E6%88%91%E8%A6%81%E5%86%B2%E9%A1%B6%E5%95%8A%EF%BC%81"];
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = jd_wxBuildActivity_activityId;
  console.log("活动入口：https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId);
  for (let l11Ili1 = 0; l11Ili1 < cookiesArr.length; l11Ili1++) {
    cookie = cookiesArr[l11Ili1];
    originCookie = cookiesArr[l11Ili1];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l11Ili1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await getUA();
      await run();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let il1lilll = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + il1lilll);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(i11ll11 => $.logErr(i11ll11)).finally(() => $.done());
async function run() {
  try {
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(originCookie, "https://lzkj-isv.isvjd.com");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    if ($.index == 1) await takePostRequest("getSimpleActInfoVo");
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await $.wait(1000);
    await takePostRequest("accessLogWithAD");
    await $.wait(500);
    await takePostRequest("getActMemberInfo");
    await $.wait(500);
    if (!$.openCard && openCard) {
      $.shopactivityId = "";
      $.joinVenderId = $.venderId;
      await getshopactivityId();
      for (let liIiI1iI = 0; liIiI1iI < Array(5).length; liIiI1iI++) {
        if (liIiI1iI > 0) console.log("第" + liIiI1iI + "次 重新开卡");
        await joinShop();
        await $.wait(1000);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
          break;
        }
      }
      await takePostRequest("getActMemberInfo");
      await $.wait(1000);
    }
    await takePostRequest("activityContent");
    if ($.index == 1) {
      await $.wait(500);
      await takePostRequest("getShopInfoVO");
      var i1iiiIil = "";
      for (let lIii1lIl = 0; lIii1lIl < $.drawInfos.length; lIii1lIl++) {
        lIii1lIl != $.drawInfos.length - 1 ? i1iiiIil += $.drawInfos[lIii1lIl].name + "，" : i1iiiIil += "" + $.drawInfos[lIii1lIl].name;
      }
      console.log("店铺名称：" + ($.shopName || "未知") + "\n店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + i1iiiIil + "\n");
    }
    if ($.hotFlag) return;
    $.buildTimes = 0;
    $.builtTimes = 0;
    $.retryTimes = 0;
    for (let iiii1III = 0; iiii1III < 20; iiii1III++) {
      if ($.words.length != 0) {
        let Illl1lIi = Math.floor(Math.random() * $.words.length + 1) - 1;
        $.content = encodeURIComponent($.words[Illl1lIi].content);
      } else {
        let illliii = Math.floor(Math.random() * defaultWordsArr.length + 1) - 1;
        $.content = defaultWordsArr[illliii];
      }
      await takePostRequest("publish");
      if ($.builtTimes >= $.maxBuiltTimes) break;
      if ($.retryTimes >= 5 && $.buildTimes >= 5) {
        console.log("今日盖楼次数可能已经达到上限~");
        return;
      }
      await $.wait(4000);
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
  } catch (Il11Ii1) {
    console.log(Il11Ii1);
  }
}
async function takePostRequest(I11i1liI) {
  if ($.outFlag) return;
  let Iil1lII = "https://lzkj-isv.isvjd.com",
    I1il1I1l = "",
    iI1iII1i = "POST";
  switch (I11i1liI) {
    case "getMyPing":
      url = Iil1lII + "/customer/getMyPing";
      I1il1I1l = "token=" + $.Token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      url = Iil1lII + "/customer/getSimpleActInfoVo";
      I1il1I1l = "activityId=" + $.activityId;
      break;
    case "getActMemberInfo":
      url = Iil1lII + "/wxCommonInfo/getActMemberInfo";
      I1il1I1l = "venderId=" + $.venderId + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "accessLogWithAD":
      url = Iil1lII + "/common/accessLogWithAD";
      let I11ilIIl = "https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId;
      I1il1I1l = "venderId=" + ($.shopId || $.venderId || "") + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(I11ilIIl) + "&subType=app&adSource=";
      break;
    case "activityContent":
      url = Iil1lII + "/wxBuildActivity/activityContent";
      I1il1I1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "follow":
      url = Iil1lII + "/wxBuildActivity/follow";
      I1il1I1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "publish":
      url = Iil1lII + "/wxBuildActivity/publish";
      I1il1I1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&content=" + $.content;
      break;
    case "getShopInfoVO":
      url = Iil1lII + "/wxActionCommon/getShopInfoVO";
      I1il1I1l = "userId=" + $.venderId;
      break;
    case "getUserInfo":
      url = Iil1lII + "/wxActionCommon/getUserInfo";
      I1il1I1l = "pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + I11i1liI);
  }
  let ililIil = getPostRequest(url, I1il1I1l, iI1iII1i);
  return new Promise(async i1ill1I => {
    $.post(ililIil, (IIlIIli1, i11iiii1, iiiI1iI) => {
      try {
        setActivityCookie(i11iiii1);
        if (IIlIIli1) {
          if (i11iiii1 && typeof i11iiii1.statusCode != "undefined") {
            if (i11iiii1.statusCode == 493) {
              console.log(I11i1liI + " 此ip已被限制，请过10分钟后再执行脚本");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(IIlIIli1, IIlIIli1));
          console.log(I11i1liI + " API请求失败，请检查网路重试");
        } else dealReturn(I11i1liI, iiiI1iI);
      } catch (iliIIlI) {
        console.log(iliIIlI, i11iiii1);
      } finally {
        i1ill1I();
      }
    });
  });
}
async function dealReturn(IilIiII, iliIi1Ii) {
  let I11i1li1 = "";
  try {
    (IilIiII != "accessLogWithAD" || IilIiII != "drawContent") && iliIi1Ii && (I11i1li1 = JSON.parse(iliIi1Ii));
  } catch (illill1i) {
    console.log(IilIiII + " 执行任务异常");
    console.log(illill1i);
    $.runFalag = false;
  }
  try {
    switch (IilIiII) {
      case "getMyPing":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            if (I11i1li1.data && typeof I11i1li1.data.secretPin != "undefined") $.Pin = I11i1li1.data.secretPin;
            if (I11i1li1.data && typeof I11i1li1.data.nickname != "undefined") $.nickname = I11i1li1.data.nickname;
          } else I11i1li1.errorMessage ? console.log(IilIiII + " " + (I11i1li1.errorMessage || "")) : console.log(IilIiII + " " + iliIi1Ii);
        } else {
          console.log(IilIiII + " " + iliIi1Ii);
        }
        break;
      case "getSimpleActInfoVo":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            if (typeof I11i1li1.data.shopId != "undefined") $.shopId = I11i1li1.data.shopId;
            if (typeof I11i1li1.data.venderId != "undefined") $.venderId = I11i1li1.data.venderId;
            $.activityType = I11i1li1.data.activityType;
          } else I11i1li1.errorMessage ? console.log(IilIiII + " " + (I11i1li1.errorMessage || "")) : console.log(IilIiII + " " + iliIi1Ii);
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "follow":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true && I11i1li1.count === 0) console.log("关注成功");else I11i1li1.errorMessage ? console.log(IilIiII + " " + (I11i1li1.errorMessage || "")) : console.log(IilIiII + " " + iliIi1Ii);
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "getActMemberInfo":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            $.openCard = I11i1li1.data.openCard || false;
          } else {
            if (I11i1li1.errorMessage) {
              console.log(IilIiII + " " + (I11i1li1.errorMessage || ""));
            } else console.log(IilIiII + " " + iliIi1Ii);
          }
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "getUserInfo":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            if (I11i1li1.data && typeof I11i1li1.data.yunMidImageUrl != "undefined") $.attrTouXiang = I11i1li1.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            $.jdNick = I11i1li1.data.nickname || "";
          } else I11i1li1.errorMessage ? console.log(IilIiII + " " + (I11i1li1.errorMessage || "")) : console.log(IilIiII + " " + iliIi1Ii);
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "activityContent":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.result === true) {
            $.drawInfos = I11i1li1.data.drawInfos || [];
            $.canJoin = I11i1li1.data.canJoin || false;
            $.needFollow = I11i1li1.data.needFollow || false;
            $.hasFollow = I11i1li1.data.hasFollow || false;
            $.endTime = I11i1li1.data.endTime || "";
            $.startTime = I11i1li1.data.startTime || "";
            $.title = I11i1li1.data.title || "";
            $.currentFloors = I11i1li1.data.currentFloors || 0;
            $.totalJoinMans = I11i1li1.data.totalJoinMans || 0;
            $.rule = I11i1li1.data.rule || "";
            $.maxBuiltTimes = I11i1li1.data.rule.match(/每人每天最多可盖楼(\d+)次/);
            $.words = I11i1li1.data.words || [];
            $.maxBuiltTimes ? $.maxBuiltTimes = $.maxBuiltTimes[1] : $.maxBuiltTimes = 2;
          } else {
            if (I11i1li1.errorMessage) {
              if (I11i1li1.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(IilIiII + " " + (I11i1li1.errorMessage || ""));
            } else console.log(IilIiII + " " + iliIi1Ii);
          }
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "getShopInfoVO":
        if (typeof I11i1li1 == "object") {
          if (I11i1li1.result && I11i1li1.data) $.shopName = I11i1li1.data.shopName;else I11i1li1.errorMessage ? console.log("" + (I11i1li1.errorMessage || "")) : console.log("" + iliIi1Ii);
        } else console.log("" + iliIi1Ii);
        break;
      case "publish":
        if (typeof I11i1li1 == "object") {
          $.buildTimes++;
          if (I11i1li1.result && I11i1li1.result === true) {
            if (I11i1li1.data) {
              $.builtTimes++;
              process.stdout.write("🏛️ " + I11i1li1.data.currentFloors + "层 ➜ ");
              if (I11i1li1.data.drawResult.drawInfo) {
                let ii1I1i11 = I11i1li1.data.drawResult.drawInfo;
                switch (ii1I1i11.type) {
                  case 6:
                    console.log("🎉 " + ii1I1i11.name + " 🐶");
                    break;
                  case 7:
                    const i11iilI = I11i1li1.data.drawResult.addressId;
                    prizeName = ii1I1i11.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    console.log("参考价值：" + ii1I1i11.priceInfo + "（元）");
                    if (ii1I1i11.showImage) console.log("预览图片：" + ii1I1i11.showImage);
                    let ilillIiI = await wxSavePrize("https://lzkj-isv.isvjd.com", cookie, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, i11iilI);
                    if (ilillIiI) $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId));else {
                      $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId));
                    }
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + ii1I1i11.name + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    console.log("🎉 恭喜获得" + ii1I1i11.name + " 🎁");
                    break;
                  case 16:
                    console.log("🎉 " + ii1I1i11.priceInfo + " 🧧");
                    break;
                  default:
                    ii1I1i11.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + ii1I1i11.name);
                    break;
                }
              } else console.log("💨 空气");
            } else console.log(JSON.stringify(I11i1li1));
          } else {
            if (I11i1li1.errorMessage) {
              if (I11i1li1.errorMessage = "哎呀活动火爆，请稍后再试！") {
                $.retryTimes++;
              } else console.log("" + (I11i1li1.errorMessage || ""));
            } else {
              console.log("抽了个寂寞，京东接口返回内容为空~");
            }
          }
        } else console.log(IilIiII + " " + iliIi1Ii);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IilIiII + "-> " + iliIi1Ii);
    }
    typeof I11i1li1 == "object" && I11i1li1.errorMessage && I11i1li1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (l11lI11I) {
    console.log(l11lI11I);
  }
}
function getPostRequest(IIIIiili, l1liII1I, i111i = "POST") {
  let lII111il = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IIIIiili.indexOf("https://lzkj-isv.isvjd.com") > -1 && (lII111il.Referer = "https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId, lII111il.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": IIIIiili,
    "method": i111i,
    "headers": lII111il,
    "body": l1liII1I,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(IiiIIli => {
    let iIIIlIl1 = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://lzkj-isv.isvjd.com/wxBuildActivity/activity?activityId=" + $.activityId,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(iIIIlIl1, async (I1I1IilI, lii11Iil, iilliIii) => {
      try {
        if (I1I1IilI) {
          if (lii11Iil && typeof lii11Iil.statusCode != "undefined") {
            if (lii11Iil.statusCode == 493) {
              console.log("getCk 此ip已被限制，请过10分钟后再执行脚本");
              $.outFlag = true;
            }
          }
          console.log(String(I1I1IilI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (lii11Iil.status == 200) setActivityCookie(lii11Iil);
        }
      } catch (iiil11I1) {
        $.logErr(iiil11I1, lii11Iil);
      } finally {
        IiiIIli();
      }
    });
  });
}
function setActivityCookie(IIlIl1) {
  if (IIlIl1) {
    if (IIlIl1.headers["set-cookie"]) {
      cookie = "";
      for (let iiIlIiIi of IIlIl1.headers["set-cookie"]) {
        lz_cookie[iiIlIiIi.split(";")[0].substr(0, iiIlIiIi.split(";")[0].indexOf("="))] = iiIlIiIi.split(";")[0].substr(iiIlIiIi.split(";")[0].indexOf("=") + 1);
      }
      for (const IilIIi of Object.keys(lz_cookie)) {
        cookie += IilIIi + "=" + lz_cookie[IilIIi] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(ililiIIi) {
  ililiIIi = ililiIIi || 32;
  let llIl1li = "abcdef0123456789",
    l1I11I1I = llIl1li.length,
    lii1lIii = "";
  for (i = 0; i < ililiIIi; i++) lii1lIii += llIl1li.charAt(Math.floor(Math.random() * l1I11I1I));
  return lii1lIii;
}
function jsonParse(lI1iIii) {
  if (typeof lI1iIii == "string") try {
    return JSON.parse(lI1iIii);
  } catch (iIliI) {
    return console.log(iIliI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async iI1l11i => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i1iil1i1 = "";
    if ($.shopactivityId) i1iil1i1 = ",\"activityId\":" + $.shopactivityId;
    const Ii1lIi1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i1iil1i1 + ",\"channel\":406}",
      II1lIi1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ii1lIi1l)
      },
      iI11Il = await getH5st("8adfb", II1lIi1),
      li1l1III = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Ii1lIi1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iI11Il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(li1l1III, async (i1lili1l, iiIi1lII, Iiil111) => {
      try {
        Iiil111 = Iiil111 && Iiil111.match(/jsonp_.*?\((.*?)\);/) && Iiil111.match(/jsonp_.*?\((.*?)\);/)[1] || Iiil111;
        let lI1IIIl1 = $.toObj(Iiil111, Iiil111);
        if (lI1IIIl1 && typeof lI1IIIl1 == "object") {
          if (lI1IIIl1 && lI1IIIl1.success === true) {
            console.log(lI1IIIl1.message);
            $.errorJoinShop = lI1IIIl1.message;
            if (lI1IIIl1.result && lI1IIIl1.result.giftInfo) {
              for (let IillIliI of lI1IIIl1.result.giftInfo.giftList) {
                console.log("入会获得: " + IillIliI.discountString + IillIliI.prizeName + IillIliI.secondLineDesc);
              }
            }
            console.log("");
          } else lI1IIIl1 && typeof lI1IIIl1 == "object" && lI1IIIl1.message ? ($.errorJoinShop = lI1IIIl1.message, console.log("" + (lI1IIIl1.message || ""))) : console.log(Iiil111);
        } else console.log(Iiil111);
      } catch (lIlIIi) {
        $.logErr(lIlIIi, iiIi1lII);
      } finally {
        iI1l11i();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async Illi11Il => {
    let iiIll1i1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const llIlll = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iiIll1i1)
      },
      l1liIi1 = await getH5st("ef79a", llIlll),
      IIill11i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iiIll1i1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1liIi1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIill11i, async (I1ll111, il1II, i1lI11il) => {
      try {
        i1lI11il = i1lI11il && i1lI11il.match(/jsonp_.*?\((.*?)\);/) && i1lI11il.match(/jsonp_.*?\((.*?)\);/)[1] || i1lI11il;
        let ii11lIiI = $.toObj(i1lI11il, i1lI11il);
        ii11lIiI && typeof ii11lIiI == "object" ? ii11lIiI && ii11lIiI.success == true && (console.log("\n去加入店铺会员：" + (ii11lIiI.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = ii11lIiI.result.interestsRuleList && ii11lIiI.result.interestsRuleList[0] && ii11lIiI.result.interestsRuleList[0].interestsInfo && ii11lIiI.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(i1lI11il);
      } catch (il1Iiiii) {
        $.logErr(il1Iiiii, il1II);
      } finally {
        Illi11Il();
      }
    });
  });
}
