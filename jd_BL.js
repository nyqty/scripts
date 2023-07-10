/*
博朗抽奖

做任务，邀请，抽奖


有水的时候运行


请求太频繁会被黑ip
过10分钟再执行

cron:11 1 11 * * *
============Quantumultx===============
[task_local]
#博朗抽奖
11 1 11 * * jd_BL.js, tag=博朗抽奖, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('博朗抽奖');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let domains = "https://lzdz1-isv.isvjd.com",
  lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(liii1l => {
    cookiesArr.push(jdCookieNode[liii1l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(I1iiII => I1iiII.cookie)].filter(liliIi => !!liliIi);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  activityUrl = "https://lzdz1-isv.isvjcloud.com/m/1000002836/5927485/dz5b8b0d274c9fb046c9e35604e6c9/";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "dz5b8b0d274c9fb046c9e35604e6c9";
  authorCodeList = ["28803d2098b54d959f46482a11aafc75"];
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("请在有水的时候运行");
  console.log("入口:\nhttps://lzdz1-isv.isvjcloud.com/m/1000002836/5927485/dz5b8b0d274c9fb046c9e35604e6c9/");
  for (let li1ii = 0; li1ii < cookiesArr.length; li1ii++) {
    cookie = cookiesArr[li1ii];
    originCookie = cookiesArr[li1ii];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = li1ii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(3000);
      if ($.outFlag || $.activityEnd || $.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let iIIIi1 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + iIIIi1);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + iIIIi1);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(ilIliI => $.logErr(ilIliI)).finally(() => $.done());
async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    let Ii1Iii = false;
    $.Token = await getToken(cookie, domains);
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
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await takePostRequest("activityContent");
    await takePostRequest("drawContent");
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.openCard == false) {
      console.log("开卡任务");
      Ii1Iii = true;
      $.joinVenderId = 1000002836;
      $.shopactivityId = "";
      for (let ll1Ii1 = 0; ll1Ii1 < Array(2).length; ll1Ii1++) {
        if (ll1Ii1 > 0) console.log("第" + ll1Ii1 + "次 重新开卡");
        await joinShop();
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
      }
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 可能是开卡黑号,跳过运行");
        return;
      }
      await takePostRequest("drawContent");
      await takePostRequest("activityContent");
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    } else console.log("已全部开卡");
    if ($.hotFlag) return;
    console.log("开始做日常任务......");
    $.log("加购: " + $.addSku);
    !$.addSku && !$.outFlag && (Ii1Iii = true, await takePostRequest("saveTask"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("完善信息: " + $.saveAddr);
    !$.saveAddr && !$.outFlag && (Ii1Iii = true, await takePostRequest("saveAddr"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    await takePostRequest("activityContent");
    console.log("\n目前抽奖次数为：" + $.score + "\n");
    $.runFalag = true;
    let Ii1Iil = $.score;
    for (m = 1; Ii1Iil--; m++) {
      console.log("第" + m + "次抽奖");
      await takePostRequest("draw");
      if ($.runFalag == false) break;
      if (Number(Ii1Iil) <= 0) break;
      if (m >= 3) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
      await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
    }
    console.log($.actorUuid);
    console.log("当前助力:" + $.shareUuid);
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (lIllil) {
    console.log(lIllil);
  }
}
async function takePostRequest(I111) {
  if ($.outFlag) return;
  let I1I11i = "https://lzdz1-isv.isvjd.com",
    l1iI1l = "",
    III1ll = "POST";
  switch (I111) {
    case "getMyPing":
      url = I1I11i + "/customer/getMyCidPing";
      l1iI1l = "token=" + $.Token + "&fromType=APP&userId=1000002836&pin=";
      break;
    case "getSimpleActInfoVo":
      url = I1I11i + "/common/brand/getSimpleActInfoVo";
      l1iI1l = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = I1I11i + "/common/accessLogWithAD";
      let iilIil = "https://lzdz1-isv.isvjd.com/m/1000002836/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      l1iI1l = "venderId=1000002836&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(iilIil);
      break;
    case "activityContent":
      url = I1I11i + "/dingzhi/bolang/active/activityContent";
      l1iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "saveAddr":
      url = I1I11i + "/dingzhi/bolang/active/writeMessage";
      l1iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&nick=%E5%8F%8C%E5%B1%82&sex=%E7%94%B7&phone=13113113113&giftLike=E%E5%8D%A1&buyUse=%E8%87%AA%E7%94%A8&&actorUuid=" + $.actorUuid + "&taskType=14&taskValue=1000002836";
      break;
    case "saveTask":
      url = I1I11i + "/dingzhi/bolang/active/saveTask";
      l1iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=2&taskValue=100055113690";
      break;
    case "priceList":
      url = I1I11i + "/dingzhi/bolang/active/priceList";
      l1iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "drawContent":
      url = I1I11i + "/dingzhi/taskact/common/drawContent";
      l1iI1l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = I1I11i + "/dingzhi/bolang/active/draw";
      l1iI1l = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + I111);
  }
  let iII11I = getPostRequest(url, l1iI1l, III1ll);
  return new Promise(async illI1i => {
    $.post(iII11I, (l1ll11, I1I111, lIllli) => {
      try {
        setActivityCookie(I1I111);
        l1ll11 ? (I1I111 && typeof I1I111.statusCode != "undefined" && I1I111.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(l1ll11, l1ll11)), console.log(I111 + " API请求失败，请检查网路重试")) : dealReturn(I111, lIllli);
      } catch (I11I) {
        console.log(I11I, I1I111);
      } finally {
        illI1i();
      }
    });
  });
}
async function dealReturn(ll1Ili, i1IiIl) {
  let ll1Ill = "";
  try {
    (ll1Ili != "accessLogWithAD" || ll1Ili != "drawContent") && i1IiIl && (ll1Ill = JSON.parse(i1IiIl));
  } catch (I1IlIi) {
    console.log(ll1Ili + " 执行任务异常");
    console.log(i1IiIl);
    $.runFalag = false;
  }
  try {
    switch (ll1Ili) {
      case "getMyPing":
        if (typeof ll1Ill == "object") {
          if (ll1Ill.result && ll1Ill.result === true) {
            if (ll1Ill.data && typeof ll1Ill.data.secretPin != "undefined") $.Pin = ll1Ill.data.secretPin;
            if (ll1Ill.data && typeof ll1Ill.data.nickname != "undefined") $.nickname = ll1Ill.data.nickname;
          } else ll1Ill.errorMessage ? console.log(ll1Ili + " " + (ll1Ill.errorMessage || "")) : console.log(ll1Ili + " " + i1IiIl);
        } else console.log(ll1Ili + " " + i1IiIl);
        break;
      case "saveTask":
        if (typeof ll1Ill == "object") {
          if (ll1Ill.result && ll1Ill.result === true) console.log("任务完成，获得机会：" + ll1Ill.data.addChance);else ll1Ill.errorMessage ? console.log("" + (ll1Ill.errorMessage || "")) : console.log(" " + i1IiIl);
        } else {
          console.log("" + i1IiIl);
        }
        break;
      case "saveAddr":
        if (typeof ll1Ill == "object") {
          if (ll1Ill.result && ll1Ill.result === true) console.log("任务完成，获得机会：" + ll1Ill.data.sendChance);else ll1Ill.errorMessage ? console.log("" + (ll1Ill.errorMessage || "")) : console.log("" + i1IiIl);
        } else console.log(ll1Ili + " " + i1IiIl);
        break;
      case "activityContent":
        if (typeof ll1Ill == "object") {
          if (ll1Ill.result && ll1Ill.result === true) {
            $.endTime = ll1Ill.data.endTime || ll1Ill.data.activityVo && ll1Ill.data.activityVo.endTime || ll1Ill.data.activity.endTime || 0;
            $.hasEnd = ll1Ill.data.hasEnd || false;
            $.score = ll1Ill.data.drawScore || 0;
            $.assistStatus = ll1Ill.data.assistStatus || 0;
            $.firstOpenCard = ll1Ill.data.firstOpenCard || false;
            $.showDate = ll1Ill.data.showDate || false;
            $.saveAddr = ll1Ill.data.saveAddr || false;
            $.openCard = ll1Ill.data.openCard || false;
            $.addSku = ll1Ill.data.addSku || false;
            $.actorUuid = ll1Ill.data.actorUuid || 0;
          } else ll1Ill.errorMessage ? console.log(ll1Ili + " " + (ll1Ill.errorMessage || "")) : console.log(ll1Ili + " " + i1IiIl);
        } else console.log(ll1Ili + " " + i1IiIl);
        break;
      case "draw":
        if (typeof ll1Ill == "object") {
          if (ll1Ill.result && ll1Ill.result === true) ll1Ill.data.wdsrvo.drawOk === true ? console.log("获得：" + ll1Ill.data.wdsrvo.name) : console.log("什么也没有~");else ll1Ill.errorMessage ? console.log("" + (ll1Ill.errorMessage || "")) : console.log("" + i1IiIl);
        } else console.log("" + i1IiIl);
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getQuestion":
        break;
      default:
        console.log(ll1Ili + "-> " + i1IiIl);
    }
    typeof ll1Ill == "object" && ll1Ill.errorMessage && ll1Ill.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (IiIiii) {
    console.log(IiIiii);
  }
}
function getPostRequest(lIiIll, lIlliI, iIIlI1 = "POST") {
  let IlIi = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lIiIll.indexOf("https://lzdz1-isv.isvjd.com") > -1 && (IlIi.Referer = activityUrl, IlIi.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": lIiIll,
    "method": iIIlI1,
    "headers": IlIi,
    "body": lIlliI,
    "timeout": 30000
  };
}
function getSimpleActInfoVo() {
  return new Promise(IiIiiI => {
    let IlIi1i = {
      "url": "https://lzdz1-isv.isvjd.com/common/brand/getSimpleActInfoVo?activityId=dzaa2168527a9d4841a94d6088bfa5",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(IlIi1i, async (lIllii, l1il1, IIiI) => {
      try {
        if (lIllii) {
          l1il1 && typeof l1il1.statusCode != "undefined" && l1il1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(lIllii));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let illl11 = $.toObj(IIiI, IIiI);
          if (typeof illl11 == "object") {
            if (illl11.result && illl11.result === true) {
              $.endTime = illl11.data.endTime || 0;
              $.startTimes = illl11.data.startTime || Date.now();
            } else illl11.errorMessage ? console.log("" + (illl11.errorMessage || "")) : console.log("" + IIiI);
          } else console.log("" + IIiI);
        }
      } catch (l1iiil) {
        $.logErr(l1iiil, l1il1);
      } finally {
        IiIiiI();
      }
    });
  });
}
function getCk() {
  return new Promise(illl1l => {
    let li1lll = {
      "url": "https://lzdz1-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(li1lll, async (I1i1I, IIl1, l1ili) => {
      try {
        if (I1i1I) {
          IIl1 && typeof IIl1.statusCode != "undefined" && IIl1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(I1i1I));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iiIi = l1ili.match(/(活动已经结束)/) && l1ili.match(/(活动已经结束)/)[1] || "";
          iiIi && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(IIl1);
        }
      } catch (iiIl) {
        $.logErr(iiIl, IIl1);
      } finally {
        illl1l();
      }
    });
  });
}
function setActivityCookie(Iil1I) {
  if (Iil1I) {
    if (Iil1I.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let I1i1l of Iil1I.headers["set-cookie"]) {
        lz_cookie[I1i1l.split(";")[0].substr(0, I1i1l.split(";")[0].indexOf("="))] = I1i1l.split(";")[0].substr(I1i1l.split(";")[0].indexOf("=") + 1);
      }
      for (const llIiIi of Object.keys(lz_cookie)) {
        cookie += llIiIi + "=" + lz_cookie[llIiIi] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(I1i1i) {
  I1i1i = I1i1i || 32;
  let iiiIii = "abcdef0123456789",
    IllI1 = iiiIii.length,
    iiiIil = "";
  for (i = 0; i < I1i1i; i++) iiiIil += iiiIii.charAt(Math.floor(Math.random() * IllI1));
  return iiiIil;
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async ilI1il => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i11Ii = "";
    if ($.shopactivityId) i11Ii = ",\"activityId\":" + $.shopactivityId;
    const iII1I = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i11Ii + ",\"channel\":406}",
      iilli1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iII1I)
      },
      ilI1l1 = await getH5st("8adfb", iilli1),
      Iil1l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iII1I + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ilI1l1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Iil1l, async (l1lII1, iilllI, i1i1iI) => {
      try {
        if (l1lII1) iilllI && typeof iilllI.statusCode != "undefined" && iilllI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          i1i1iI = i1i1iI && i1i1iI.match(/jsonp_.*?\((.*?)\);/) && i1i1iI.match(/jsonp_.*?\((.*?)\);/)[1] || i1i1iI;
          let iillii = $.toObj(i1i1iI, i1i1iI);
          if (iillii && typeof iillii == "object") {
            if (iillii && iillii.success === true) {
              console.log(" >> " + iillii.message);
              $.errorJoinShop = iillii.message;
              if (iillii.result && iillii.result.giftInfo) {
                for (let ilI1iI of iillii.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + ilI1iI.discountString + ilI1iI.prizeName + ilI1iI.secondLineDesc);
                }
              }
            } else {
              if (iillii && typeof iillii == "object" && iillii.message) {
                $.errorJoinShop = iillii.message;
                console.log("" + (iillii.message || ""));
              } else {
                console.log(i1i1iI);
              }
            }
          } else console.log(i1i1iI);
        }
      } catch (i1i1ii) {
        $.logErr(i1i1ii, iilllI);
      } finally {
        ilI1il();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iliili => {
    const I111ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      Ililll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I111ii)
      },
      I1liII = await getH5st("8adfb", Ililll),
      I1ii1I = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I111ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1liII),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1ii1I, async (i11l1l, IIllIl, i11l1i) => {
      try {
        if (i11l1l) {
          if (IIllIl && typeof IIllIl.statusCode != "undefined") {
            IIllIl.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          i11l1i = i11l1i && i11l1i.match(/jsonp_.*?\((.*?)\);/) && i11l1i.match(/jsonp_.*?\((.*?)\);/)[1] || i11l1i;
          let i1i1li = $.toObj(i11l1i, i11l1i);
          i1i1li && typeof i1i1li == "object" ? i1i1li && i1i1li.success == true && (console.log("去加入：" + (i1i1li.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = i1i1li.result.interestsRuleList && i1i1li.result.interestsRuleList[0] && i1i1li.result.interestsRuleList[0].interestsInfo && i1i1li.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(i11l1i);
        }
      } catch (iil1Ii) {
        $.logErr(iil1Ii, IIllIl);
      } finally {
        iliili();
      }
    });
  });
}
function getAuthorCodeList(l1Ilii) {
  return new Promise(i11l11 => {
    const liIIIl = {
      "url": l1Ilii + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(liIIIl, async (l1IliI, liIIIi, iIilI) => {
      try {
        if (l1IliI) $.getAuthorCodeListerr = false;else {
          if (iIilI) iIilI = JSON.parse(iIilI);
          $.getAuthorCodeListerr = true;
        }
      } catch (IlIlI) {
        $.logErr(IlIlI, liIIIi);
        iIilI = null;
      } finally {
        i11l11(iIilI);
      }
    });
  });
}
function random(II1i1l, II1i1i) {
  return Math.floor(Math.random() * (II1i1i - II1i1l)) + II1i1l;
}
function jsonParse(IIiIII) {
  if (typeof IIiIII == "string") try {
    return JSON.parse(IIiIII);
  } catch (liIl1I) {
    return console.log(liIl1I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}