/*
6.1-6.30 安佳做任务开盲盒，赢好礼


做任务，邀请，抽奖


请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#6.1-6.30 安佳做任务开盲盒，赢好礼
11 11 11 11 * jd_AJMH.js, tag=6.1-6.30 安佳做任务开盲盒，赢好礼, enabled=true

*/

const $ = new Env('6.1-6.30 安佳做任务开盲盒，赢好礼')
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  getToken = require("./function/krgetToken");
let domains = "https://lzdz1-isv.isvjcloud.com",
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(ilill1iI => {
    cookiesArr.push(jdCookieNode[ilill1iI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(I11l1i => I11l1i.cookie)].filter(l1Ii1I1 => !!l1Ii1I1);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  lz_cookie = {};
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "dzd9bc978d1448b7aa84b5b753";
  authorCodeList = [];
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid);
  console.log("\n规则:\n1.每天完成任务共计：50积分。\n2.邀请一名好友50积分，不上限。\n3.每300积分可以开盲盒一次，每天限制开三次，每天限制中奖一次。");
  for (let li11ilIl = 0; li11ilIl < cookiesArr.length; li11ilIl++) {
    cookie = cookiesArr[li11ilIl];
    originCookie = cookiesArr[li11ilIl];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = li11ilIl + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(3000);
      if (li11ilIl == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let I1li1III = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + I1li1III);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + I1li1III);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(liiII1i => $.logErr(liiII1i)).finally(() => $.done());
async function run() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    let IIIIil1I = false;
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
    await takePostRequest("getUserInfo");
    await takePostRequest("activityContent");
    await takePostRequest("drawContent");
    if ($.hotFlag) return;
    console.log($.actorUuid);
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }
    await $.wait(1000);
    console.log("开始做日常任务......");
    $.log("关注: " + $.followShop);
    !$.followShop && !$.outFlag && (IIIIil1I = true, await takePostRequest("followShop"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("加购: " + $.addSku);
    !$.addSku && !$.outFlag && (IIIIil1I = true, await takePostRequest("addSku"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("逛一逛: " + $.visitSkulist);
    !$.visitSkulist && !$.outFlag && (IIIIil1I = true, await takePostRequest("toShoplist"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    await takePostRequest("activityContent");
    console.log("\n目前分值为：" + $.score + "\n");
    $.runFalag = true;
    let l1l1ii1i = parseInt($.score / 300);
    for (m = 1; l1l1ii1i--; m++) {
      console.log("第" + m + "次抽奖");
      await takePostRequest("draw");
      if ($.runFalag == false) break;
      if (Number(l1l1ii1i) <= 0) break;
      if (m >= 1) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
      await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
    }
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    console.log("当前助力:" + $.shareUuid);
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 10000, 10));
  } catch (l1Ilill) {
    console.log(l1Ilill);
  }
}
async function takePostRequest(il1i1iIi) {
  if ($.outFlag) return;
  let Ii1l1l1l = "https://lzdz1-isv.isvjcloud.com",
    I1iliiil = "",
    Ii1I11I = "POST";
  switch (il1i1iIi) {
    case "getSimpleActInfoVo":
      url = Ii1l1l1l + "/dz/common/getSimpleActInfoVo";
      I1iliiil = "activityId=" + $.activityId;
      break;
    case "getMyPing":
      url = Ii1l1l1l + "/customer/getMyPing";
      I1iliiil = "userId=1000014486&token=" + $.Token + "&fromType=APP";
      break;
    case "accessLogWithAD":
      url = Ii1l1l1l + "/common/accessLogWithAD";
      let li1li1iI = Ii1l1l1l + "/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I1iliiil = "venderId=1000014486&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(li1li1iI) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = Ii1l1l1l + "/wxActionCommon/getUserInfo";
      I1iliiil = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = Ii1l1l1l + "/dingzhi/box618/activityContent";
      I1iliiil = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "drawContent":
      url = Ii1l1l1l + "/dingzhi/taskact/common/drawContent";
      I1iliiil = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = Ii1l1l1l + "/dingzhi/box618/startDraw";
      I1iliiil = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "toShoplist":
      url = Ii1l1l1l + "/dingzhi/box618/saveTask";
      I1iliiil = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=14&taskValue=1000014486";
      break;
    case "addCart":
    case "browseGoods":
      url = Ii1l1l1l + "/dingzhi/opencard/" + il1i1iIi;
      I1iliiil = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (il1i1iIi == "browseGoods") I1iliiil += "&value=" + $.visitSkuValue;
      break;
    case "邀请":
    case "助力":
      il1i1iIi == "助力" ? url = Ii1l1l1l + "/dingzhi/linkgame/assist" : url = Ii1l1l1l + "/dingzhi/linkgame/assist/status";
      I1iliiil = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid;
      break;
    case "followShop":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = Ii1l1l1l + "/dingzhi/box618/saveTask";
      let Il111Ili = "",
        lIiIlli = "";
      if (il1i1iIi == "followShop") {
        Il111Ili = 22;
        lIiIlli = "";
      } else {
        if (il1i1iIi == "visitSku") {
          Il111Ili = 5;
          lIiIlli = $.visitSkuValue || 5;
        } else {
          if (il1i1iIi == "toShop") {
            Il111Ili = 14;
            lIiIlli = $.visitSkuValue || 1000014486;
          } else il1i1iIi == "addSku" && (Il111Ili = 21, lIiIlli = "");
        }
      }
      I1iliiil = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + Il111Ili + "&taskValue=" + $.visitSkuValue;
      break;
    case "getDrawRecordHasCoupon":
      url = Ii1l1l1l + "/dingzhi/taskact/common/getDrawRecordHasCoupon";
      I1iliiil = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    default:
      console.log("错误" + il1i1iIi);
  }
  let iI1illii = getPostRequest(url, I1iliiil, Ii1I11I);
  return new Promise(async lII11IlI => {
    $.post(iI1illii, (lIIii1il, Ii1iliii, ilIlIII1) => {
      try {
        setActivityCookie(Ii1iliii);
        lIIii1il ? (Ii1iliii && typeof Ii1iliii.statusCode != "undefined" && Ii1iliii.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(lIIii1il, lIIii1il)), console.log(il1i1iIi + " API请求失败，请检查网路重试")) : dealReturn(il1i1iIi, ilIlIII1);
      } catch (IlIi1IlI) {
        console.log(IlIi1IlI, Ii1iliii);
      } finally {
        lII11IlI();
      }
    });
  });
}
async function dealReturn(lIl11i1i, Il1iliII) {
  let llllll11 = "";
  try {
    (lIl11i1i != "accessLogWithAD" || lIl11i1i != "drawContent") && Il1iliII && (llllll11 = JSON.parse(Il1iliII));
  } catch (IlIIi1) {
    console.log(lIl11i1i + " 执行任务异常");
    console.log(Il1iliII);
    $.runFalag = false;
  }
  try {
    switch (lIl11i1i) {
      case "getSimpleActInfoVo":
        if (typeof llllll11 == "object") {
          if (llllll11.result && llllll11.result === true) {
            if (typeof llllll11.data.shopId != "undefined") $.shopId = llllll11.data.shopId;
            if (typeof llllll11.data.venderId != "undefined") $.venderId = llllll11.data.venderId;
          } else llllll11.errorMessage ? console.log(lIl11i1i + " " + (llllll11.errorMessage || "")) : console.log(lIl11i1i + " " + Il1iliII);
        } else console.log(lIl11i1i + " " + Il1iliII);
        break;
      case "getMyPing":
        if (typeof llllll11 == "object") {
          if (llllll11.result && llllll11.result === true) {
            if (llllll11.data && typeof llllll11.data.secretPin != "undefined") $.Pin = llllll11.data.secretPin;
            if (llllll11.data && typeof llllll11.data.nickname != "undefined") $.nickname = llllll11.data.nickname;
          } else llllll11.errorMessage ? console.log(lIl11i1i + " " + (llllll11.errorMessage || "")) : console.log(lIl11i1i + " " + Il1iliII);
        } else console.log(lIl11i1i + " " + Il1iliII);
        break;
      case "getUserInfo":
        if (typeof llllll11 == "object") {
          if (llllll11.result && llllll11.result === true) {
            if (llllll11.data && typeof llllll11.data.yunMidImageUrl != "undefined") $.attrTouXiang = llllll11.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else llllll11.errorMessage ? console.log(lIl11i1i + " " + (llllll11.errorMessage || "")) : console.log(lIl11i1i + " " + Il1iliII);
        } else console.log(lIl11i1i + " " + Il1iliII);
        break;
      case "activityContent":
        if (typeof llllll11 == "object") {
          if (llllll11.result && llllll11.result === true) {
            $.endTime = llllll11.data.endTime || llllll11.data.activityVo && llllll11.data.activityVo.endTime || llllll11.data.activity.endTime || 0;
            $.hasEnd = llllll11.data.hasEnd || false;
            $.score = llllll11.data.score || 0;
            $.settings = llllll11.data.openCardData.settings || [];
            $.assistStatus = llllll11.data.assistStatus || 0;
            $.followShop = llllll11.data.taskData.followSku.allStatus || false;
            $.visitSkulist = llllll11.data.taskData.toShop.allStatus || false;
            $.addSkulist = llllll11.data.taskData.addSku.settings || [];
            $.addSku = llllll11.data.taskData.addSku.allStatus || false;
            $.actorUuid = llllll11.data.actorUuid || 0;
          } else llllll11.errorMessage ? console.log(lIl11i1i + " " + (llllll11.errorMessage || "")) : console.log(lIl11i1i + " " + Il1iliII);
        } else console.log(lIl11i1i + " " + Il1iliII);
        break;
      case "followShop":
      case "addSku":
      case "toShoplist":
        if (typeof llllll11 == "object") {
          if (llllll11.result && llllll11.result === true) console.log("任务完成，获得分值：" + llllll11.data.addScore);else llllll11.errorMessage ? console.log("" + (llllll11.errorMessage || "")) : console.log("" + Il1iliII);
        } else console.log(lIl11i1i + " " + Il1iliII);
        break;
      case "checkOpenCard":
        if (typeof llllll11 == "object") {
          if (llllll11.result && llllll11.result === true) {
            let l1ii1l = llllll11.data.openInfo || [];
            $.openList = [...l1ii1l];
            $.allOpenCard = llllll11.data.allOpenCard || llllll11.data.isOpenCardStatus || false;
            if (llllll11.data.beans || llllll11.data.addBeanNum) console.log("开卡获得:" + (llllll11.data.beans || llllll11.data.addBeanNum) + "豆");
          } else llllll11.errorMessage ? console.log(lIl11i1i + " " + (llllll11.errorMessage || "")) : console.log(lIl11i1i + " " + Il1iliII);
        } else console.log(lIl11i1i + " " + Il1iliII);
        break;
      case "draw":
        if (typeof llllll11 == "object") {
          if (llllll11.result && llllll11.result === true) {
            if (llllll11.data.drawOk === true) console.log("获得：" + llllll11.data.name);else {
              console.log("什么也没有~");
            }
          } else llllll11.errorMessage ? console.log("" + (llllll11.errorMessage || "")) : console.log("" + Il1iliII);
        } else console.log("" + Il1iliII);
        break;
      case "邀请":
      case "助力":
        if (typeof llllll11 == "object") {
          if (llllll11.data.status == 200) lIl11i1i == "助力" ? console.log("助力成功") : $.yaoqing = true;else {
            if (llllll11.data.status == 105) {
              console.log("已经助力过");
            } else {
              if (llllll11.data.status == 104) console.log("已经助力其他人");else {
                if (llllll11.data.status == 101) {} else console.log(Il1iliII);
              }
            }
          }
        } else console.log(lIl11i1i + " " + Il1iliII);
      case "getDrawRecordHasCoupon":
        if (typeof llllll11 == "object") {
          if (llllll11.result && llllll11.result === true) {
            console.log("我的奖品：");
            for (let iiilli1i in llllll11.data.recordList) {
              let I111iiIi = llllll11.data.recordList[iiilli1i];
              console.log("" + (I111iiIi.infoType != 10 && I111iiIi.value && I111iiIi.value + ":" || "") + I111iiIi.infoName);
            }
          } else llllll11.errorMessage ? console.log("" + (llllll11.errorMessage || "")) : console.log("" + Il1iliII);
        } else console.log("" + Il1iliII);
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getRankList":
        break;
      default:
        console.log(lIl11i1i + "-> " + Il1iliII);
    }
    if (typeof llllll11 == "object") {
      if (llllll11.errorMessage) {
        if (llllll11.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (lliiii1l) {
    console.log(lliiii1l);
  }
}
function getPostRequest(lilllIl, i1i111I, Iil1lll1 = "POST") {
  let i1lIIilI = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lilllIl.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (i1lIIilI.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, i1lIIilI.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": lilllIl,
    "method": Iil1lll1,
    "headers": i1lIIilI,
    "body": i1i111I,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(liiilI1i => {
    let i1iIi1ii = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(i1iIi1ii, async (lii1liI, i1lIlII, iiIiI1i1) => {
      try {
        if (lii1liI) {
          if (i1lIlII && typeof i1lIlII.statusCode != "undefined") {
            i1lIlII.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(lii1liI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let IIIIllI1 = iiIiI1i1.match(/(活动已经结束)/) && iiIiI1i1.match(/(活动已经结束)/)[1] || "";
          IIIIllI1 && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(i1lIlII);
        }
      } catch (l1l1lill) {
        $.logErr(l1l1lill, i1lIlII);
      } finally {
        liiilI1i();
      }
    });
  });
}
function setActivityCookie(II1lI1l1) {
  if (II1lI1l1) {
    if (II1lI1l1.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let I1IllII1 of II1lI1l1.headers["set-cookie"]) {
        lz_cookie[I1IllII1.split(";")[0].substr(0, I1IllII1.split(";")[0].indexOf("="))] = I1IllII1.split(";")[0].substr(I1IllII1.split(";")[0].indexOf("=") + 1);
      }
      for (const IllIIll1 of Object.keys(lz_cookie)) {
        cookie += IllIIll1 + "=" + lz_cookie[IllIIll1] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(l1IllIl) {
  return new Promise(lllI1ili => {
    const ll1lI1il = {
      "url": l1IllIl + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ll1lI1il, async (II11llII, l111Il1, I1IiIi) => {
      try {
        if (II11llII) $.log(II11llII);else {
          if (I1IiIi) I1IiIi = JSON.parse(I1IiIi);
        }
      } catch (Ill1IlIl) {
        $.logErr(Ill1IlIl, l111Il1);
        I1IiIi = null;
      } finally {
        lllI1ili(I1IiIi);
      }
    });
  });
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(iiIIIiil) {
  iiIIIiil = iiIIIiil || 32;
  let iI1lIiiI = "abcdef0123456789",
    IilIll = iI1lIiiI.length,
    iII1 = "";
  for (i = 0; i < iiIIIiil; i++) iII1 += iI1lIiiI.charAt(Math.floor(Math.random() * IilIll));
  return iII1;
}
function random(IiiII11I, Il1i11l) {
  return Math.floor(Math.random() * (Il1i11l - IiiII11I)) + IiiII11I;
}
function jsonParse(li11iI11) {
  if (typeof li11iI11 == "string") try {
    return JSON.parse(li11iI11);
  } catch (IIiIi1l1) {
    return console.log(IIiIi1l1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
