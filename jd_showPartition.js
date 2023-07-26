/*
活动名称：组队瓜分奖品 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/showPartition?id=<活动id>&user_id=<店铺id>
环境变量：jd_showPartition_activityUrl // 活动链接

*/

const Env=require('./utils/Env.js');
const $ = new Env('组队瓜分奖品（京耕）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let domains = "https://jinggeng-isv.isvjcloud.com";
$.activityUrl = process.env.jd_showPartition_activityUrl ? process.env.jd_showPartition_activityUrl : "";
$.activityId = getQueryString($.activityUrl, "id");
$.userId = getQueryString($.activityUrl, "user_id");
$.token = "";
$.openCard = false;
$.exportActivityIds = "";
$.friendUuid = "";
$.friendUuids = [];
$.message = "";
$.helpTimes = -1;
$.hasHelpedTimes = 0;
$.restartNo = 1;
$.LZ_AES_PIN = "";
$.friendUuidId = 0;
$.retryCookies = [];
$.teamId = "null";
$.teamNum = 5;
$.teamIds = [];
$.teamIdIdx = 0;
$.inviterNicks = [];
let cookiesArr = [],
  cookie = "",
  activityCookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(li1iiiI => {
    cookiesArr.push(jdCookieNode[li1iiiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(l1illIiI => l1illIiI.cookie)].filter(iIii1lI1 => !!iIii1lI1);
!(async () => {
  console.log("活动入口：" + $.activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let IIIl1i1I = 0; IIIl1i1I < cookiesArr.length; IIIl1i1I++) {
    if (cookiesArr[IIIl1i1I]) {
      cookie = cookiesArr[IIIl1i1I];
      originCookie = cookiesArr[IIIl1i1I];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIIl1i1I + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await jdmodule();
      $.retry && (await jdmodule());
      if ($.stop) break;
    }
  }
})().catch(lli1IIlI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lli1IIlI + "!", "");
}).finally(() => {
  $.done();
});
async function jdmodule() {
  $.retry = false;
  $.domain = $.activityUrl.match(/https?:\/\/([^/]+)/) && $.activityUrl.match(/https?:\/\/([^/]+)/)[1] || "";
  $.UA = "jdapp;iPhone;10.2.2;13.1.2;" + uuid() + ";M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
  $.flag = 0;
  await getCK();
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await takePostRequest("setMixNick");
  await takePostRequest("followShop");
  await $.wait(3500);
  await takePostRequest("createTeam");
  await $.wait(4000);
  $.index != 1 && (await takePostRequest("joinTeam"));
}
async function takePostRequest(llIiII1l) {
  if ($.outFlag) return;
  let iIIiIl11 = "",
    IlI1iIli = "POST";
  switch (llIiII1l) {
    case "setMixNick":
      url = "https://" + $.domain + "/front/setMixNick";
      iIIiIl11 = "strTMMixNick=" + $.token + "&userId=" + $.userId + "&source=01";
      break;
    case "createTeam":
      url = "https://" + $.domain + "/ql/front/postPartition";
      iIIiIl11 = "act_id=" + $.activityId + "&user_id=" + $.userId;
      break;
    case "followShop":
      url = "https://" + $.domain + "/front/followShop";
      iIIiIl11 = "userId=" + $.userId;
      break;
    case "joinTeam":
      url = "https://" + $.domain + "/ql/front/postPartition";
      iIIiIl11 = "act_id=" + $.activityId + "&user_id=" + $.userId + "&teamId=" + $.teamId;
      break;
    default:
      console.log("错误" + llIiII1l);
  }
  let i1II1IIl = getPostRequest(url, iIIiIl11, IlI1iIli);
  return new Promise(async lIi1iiI1 => {
    $.post(i1II1IIl, (i1lllliI, IiIiIi, IIlIli11) => {
      try {
        i1lllliI ? (IiIiIi && typeof IiIiIi.statusCode != "undefined" && IiIiIi.statusCode == 493 && (console.log(llIiII1l + " 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(i1lllliI, i1lllliI)), console.log(llIiII1l + " API请求失败，请检查网路重试")) : (dealReturn(llIiII1l, IIlIli11), llIiII1l == "setMixNick" && setActivityCookie(IiIiIi));
      } catch (lI11lIl1) {
        console.log(lI11lIl1, IiIiIi);
      } finally {
        lIi1iiI1();
      }
    });
  });
}
async function dealReturn(ii1il1ll, I1ll1lIi) {
  let il1IlI11 = "";
  try {
    if (ii1il1ll != "accessLog" || ii1il1ll != "drawContent") {
      if (I1ll1lIi) {
        il1IlI11 = JSON.parse(I1ll1lIi);
      }
    }
  } catch (I1l1Iiii) {
    console.log(ii1il1ll + " 执行任务异常");
    console.log(I1l1Iiii);
    $.runFalag = false;
  }
  try {
    switch (ii1il1ll) {
      case "setMixNick":
        if (typeof il1IlI11 == "object") {
          if (il1IlI11.succ && il1IlI11.succ === true) $.successPeople = il1IlI11.successPeople;else il1IlI11.errorMessage ? console.log(ii1il1ll + " " + (il1IlI11.errorMessage || "")) : console.log(ii1il1ll + " " + I1ll1lIi);
        } else console.log(ii1il1ll + " " + I1ll1lIi);
        break;
      case "followShop":
        if (typeof il1IlI11 == "object") {
          if (il1IlI11.succ && il1IlI11.succ === true) {} else il1IlI11.errorMessage ? console.log(ii1il1ll + " " + (il1IlI11.errorMessage || "")) : console.log(ii1il1ll + " " + I1ll1lIi);
        } else console.log(ii1il1ll + " " + I1ll1lIi);
        break;
      case "createTeam":
        if (typeof il1IlI11 == "object") {
          $.err = il1IlI11.msg;
          if ($.err == "活动太火爆了，请稍后重试！") return;
          il1IlI11.succ && il1IlI11.succ == true ? console.log("创建队伍成功！") : console.log(il1IlI11.msg);
          I1ll1lIi = il1IlI11.data;
          rule = I1ll1lIi.remark;
          partitionTeamLogParam = I1ll1lIi.partitionTeamLogParams[0];
          jdCombatTeamSetting = partitionTeamLogParam.jdCombatTeamSetting;
          $.teamNum = I1ll1lIi.partitionSetting.teamNum;
          console.log("每队最多" + $.teamNum + "人参团");
          $.inviterNick = jdCombatTeamSetting.buyerNick;
          console.log("邀请人" + $.inviterNick);
          $.hasInviteNum = jdCombatTeamSetting.inviteNum;
          console.log("目前已有" + $.hasInviteNum + "人参团");
          createTeamId = jdCombatTeamSetting.id;
          $.teamIds.push(createTeamId);
          $.index == 1 && ($.teamId = createTeamId);
        }
        break;
      case "joinTeam":
        typeof il1IlI11 == "object" && (il1IlI11.succ && il1IlI11.succ == true ? console.log("加入队伍成功！") : il1IlI11.msg.indexOf("满") != -1 ? ($.teamIdIdx++, $.teamId = $.teamIds[$.teamIdIdx], console.log(il1IlI11.msg + "，重跑当前账号"), $.retry = true) : console.log(il1IlI11.msg));
        break;
      default:
        console.log(ii1il1ll + "-> " + I1ll1lIi);
    }
    typeof il1IlI11 == "object" && il1IlI11.errorMessage && il1IlI11.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (Il1llilI) {
    console.log(Il1llilI);
  }
}
function getCK() {
  return new Promise(Illl1i1I => {
    let liII11I1 = {
      "url": $.activityUrl + "&teamId=" + $.teamId + "&inviterNick=&sid=&un_area=13_1007_4909_59742",
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(liII11I1, async (i1l1IIII, I11iliI1, I1iIl1I1) => {
      try {
        i1l1IIII ? (I11iliI1 && typeof I11iliI1.statusCode != "undefined" && I11iliI1.statusCode == 493 && (console.log("getCK 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log(String(i1l1IIII)), console.log($.name + " cookie API请求失败，请检查网路重试")) : setActivityCookie(I11iliI1);
      } catch (I1iiiill) {
        $.logErr(I1iiiill, I11iliI1);
      } finally {
        Illl1i1I();
      }
    });
  });
}
function getTeam(IiIi1ll) {
  return new Promise(II11i1Ii => {
    let I1111iI = {
      "url": $.activityUrl + "&teamId=" + IiIi1ll + "&inviterNick=" + $.inviterNick + "&envNew=notwx",
      "headers": {
        "User-Agent": $.UA,
        "Cookie": "IsvToken=" + $.token + "; " + activityCookie,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN, zh-Hans; q=0.9",
        "Connection": "keep-alive",
        "Referer": "https://" + $.domain + "/ql/front/"
      },
      "timeout": 30000
    };
    $.get(I1111iI, async (I1ii1Ii, lIiil11l, llIIii1l) => {
      try {
        I1ii1Ii ? (lIiil11l && typeof lIiil11l.statusCode != "undefined" && lIiil11l.statusCode == 493 && (console.log("getTeam 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log(String(I1ii1Ii)), console.log($.name + " cookie API请求失败，请检查网路重试")) : ($.teamId == "null" ? console.log("获取自己队伍成功！") : console.log("获取队长队伍成功！"), inviterBuyerNick = llIIii1l.split("id=\"buyerNick\" value=\"")[1].split("\"")[0], console.log("邀请人ID-->" + inviterBuyerNick), inviterTeamNum = llIIii1l.split("id=\"teamNum\" value=\"")[1].split("\"")[0], inviterTeamId = llIIii1l.split("id=\"teamId\" value=\"")[1].split("\"")[0], console.log("邀请队伍Id-->" + inviterTeamId), inviterReNums = llIIii1l.split("id=\"reNums\" value=\"")[1].split("\"")[0], $.teamId == "null" && ($.inviterNicks.push(inviterBuyerNick), $.teamIds.push(inviterTeamId), $.teamId = inviterTeamId));
      } catch (ll1IlI1I) {
        $.logErr(ll1IlI1I, lIiil11l);
      } finally {
        II11i1Ii();
      }
    });
  });
}
function getPostRequest(lliiII11, Ii1i1IiI, I1i1IlI1 = "POST") {
  let I1lllIii = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN, zh-Hans; q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lliiII11.indexOf($.domain) > -1 && (I1lllIii.Referer = $.activityUrl + "&teamId=" + $.teamId + "&inviterNick=&sid=&un_area=13_1007_4909_59742", I1lllIii.Origin = "https://" + $.domain, I1lllIii.Cookie = "" + activityCookie), {
    "url": lliiII11,
    "method": I1i1IlI1,
    "headers": I1lllIii,
    "body": Ii1i1IiI,
    "timeout": 30000
  };
}
function setActivityCookie(ili1iil1) {
  let IIliI11i = ili1iil1 && ili1iil1.headers && (ili1iil1.headers["set-cookie"] || ili1iil1.headers["Set-Cookie"] || "") || "",
    Ii11Iiil = "",
    I1llI1I1 = "",
    I1Il1l1 = "",
    i1iIiIll = "",
    Illlilii = "";
  if (IIliI11i) {
    for (let il1iIi11 of IIliI11i) {
      let lI1l1Ii1 = il1iIi11.split(";")[0].trim();
      if (lI1l1Ii1.split("=")[1]) {
        if (lI1l1Ii1.indexOf("jcloud_alb_route=") > -1) Ii11Iiil = lI1l1Ii1.replace(/ /g, "") + ";";
        if (lI1l1Ii1.indexOf("dfs=") > -1) I1llI1I1 = lI1l1Ii1.replace(/ /g, "") + ";";
        if (lI1l1Ii1.indexOf("mixNick=") > -1) I1Il1l1 = lI1l1Ii1.replace(/ /g, "") + ";";
        if (lI1l1Ii1.indexOf("userId=") > -1) i1iIiIll = lI1l1Ii1.replace(/ /g, "") + ";";
        if (lI1l1Ii1.indexOf("jwt=") > -1) Illlilii = lI1l1Ii1.replace(/ /g, "") + ";";
      }
    }
  }
  activityCookie = Ii11Iiil + " " + I1llI1I1 + " " + I1Il1l1 + " " + i1iIiIll + " " + Illlilii;
}
function getQueryString(l1i1llI1, i11I1i1l) {
  let lIIi1l11 = new RegExp("(^|[&?])" + i11I1i1l + "=([^&]*)(&|$)"),
    lIIiiI1 = l1i1llI1.match(lIIi1l11);
  if (lIIiiI1 != null) return decodeURIComponent(lIIiiI1[2]);
  return "";
}
function jsonParse(ilillI1l) {
  if (typeof ilillI1l == "string") try {
    return JSON.parse(ilillI1l);
  } catch (IlIll1i) {
    return console.log(IlIll1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function uuid(I1I1iIIi = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
  return I1I1iIIi.replace(/[xy]/g, function (i1lI11Ii) {
    const l1l1 = 16 * Math.random() | 0,
      ilII1li = "x" === i1lI11Ii ? l1l1 : 3 & l1l1 | 8;
    return ilII1li.toString(36);
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async iIi1iii1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lilli1Ii = "";
    if ($.shopactivityId) lilli1Ii = ",\"activityId\":" + $.shopactivityId;
    const i11I11Ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lilli1Ii + ",\"channel\":406}",
      IiII1l1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i11I11Ii)
      },
      liIlIl1l = await getH5st("8adfb", IiII1l1i),
      illililI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i11I11Ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(liIlIl1l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(illililI, async (IIIill1l, iIlIiilI, il1lIll1) => {
      try {
        il1lIll1 = il1lIll1 && il1lIll1.match(/jsonp_.*?\((.*?)\);/) && il1lIll1.match(/jsonp_.*?\((.*?)\);/)[1] || il1lIll1;
        let I1l1III1 = $.toObj(il1lIll1, il1lIll1);
        if (I1l1III1 && typeof I1l1III1 == "object") {
          if (I1l1III1 && I1l1III1.success === true) {
            console.log(I1l1III1.message);
            $.errorJoinShop = I1l1III1.message;
            if (I1l1III1.result && I1l1III1.result.giftInfo) for (let l1I1lIll of I1l1III1.result.giftInfo.giftList) {
              console.log("入会获得: " + l1I1lIll.discountString + l1I1lIll.prizeName + l1I1lIll.secondLineDesc);
            }
            console.log("");
          } else {
            if (I1l1III1 && typeof I1l1III1 == "object" && I1l1III1.message) {
              $.errorJoinShop = I1l1III1.message;
              console.log("" + (I1l1III1.message || ""));
            } else {
              console.log(il1lIll1);
            }
          }
        } else console.log(il1lIll1);
      } catch (Ii11i11I) {
        $.logErr(Ii11i11I, iIlIiilI);
      } finally {
        iIi1iii1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async Ilil11ll => {
    let IliiI1ll = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const il11lll = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IliiI1ll)
      },
      i1lIlIll = await getH5st("ef79a", il11lll),
      liIIlIlI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IliiI1ll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1lIlIll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liIIlIlI, async (iIII1l1, il1liiI, IIliiIll) => {
      try {
        IIliiIll = IIliiIll && IIliiIll.match(/jsonp_.*?\((.*?)\);/) && IIliiIll.match(/jsonp_.*?\((.*?)\);/)[1] || IIliiIll;
        let Il1Iii = $.toObj(IIliiIll, IIliiIll);
        if (Il1Iii && typeof Il1Iii == "object") {
          if (Il1Iii && Il1Iii.success == true) {
            console.log("\n去加入店铺会员：" + (Il1Iii.result.shopMemberCardInfo.venderCardName || ""));
            $.shopactivityId = Il1Iii.result.interestsRuleList && Il1Iii.result.interestsRuleList[0] && Il1Iii.result.interestsRuleList[0].interestsInfo && Il1Iii.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else console.log(IIliiIll);
      } catch (lIll1111) {
        $.logErr(lIll1111, il1liiI);
      } finally {
        Ilil11ll();
      }
    });
  });
}
