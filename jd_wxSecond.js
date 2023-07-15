/*
活动名称：读秒拼手速 · 超级无线
活动链接：https://lzkjdz-isv.isvjd.com/wxSecond/activity/activity?activityId=<活动id>
环境变量：jd_wxSecond_activityId // 活动id
         jd_wxSecond_addCart // 是否做加购任务，默认不做
				 JD_LZ_OPEN  //关闭LZ相关活动运行
				 jd_wxSecond_blacklist // 黑名单 用&隔开 pin值

默认助力第一个号，脚本自动入会，不想入会勿跑！

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#读秒拼手速通用活动
1 1 1 1 * jd_wxSecond.js, tag=读秒拼手速通用活动, enabled=true

*/
const Env = require('./utils/Env.js');
const $ = new Env('读秒拼手速通用活动');
const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const getToken = require("./function/krgetToken");
let lz_cookie = {};
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(OO0QQQ => {
    cookiesArr.push(jdCookieNode[OO0QQQ]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(OO0000 => OO0000.cookie)].filter(OO0Q0O => !!OO0Q0O);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "";
let activityCookie = "";
let jd_wxSecond_activityId = "";
jd_wxSecond_activityId = $.isNode() ? process.env.jd_wxSecond_activityId ? process.env.jd_wxSecond_activityId : "" + jd_wxSecond_activityId : $.getdata("jd_wxSecond_activityId") ? $.getdata("jd_wxSecond_activityId") : "" + jd_wxSecond_activityId;
let addCart = process.env.jd_wxSecond_addCart ? process.env.jd_wxSecond_addCart : "false";
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_wxSecond_whitelist || whitelist;
$.blacklist = process.env.jd_wxSecond_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = jd_wxSecond_activityId;
  $.shareUuid = "";
  $.activityUrl = "https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId=" + $.activityId;
  console.log("活动入口：" + $.activityUrl);
  for (let Q0OQ0Q = 0; Q0OQ0Q < cookiesArr.length; Q0OQ0Q++) {
    cookie = cookiesArr[Q0OQ0Q];
    originCookie = cookiesArr[Q0OQ0Q];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Q0OQ0Q + 1;
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
  cookie = cookiesArr[0];
  if (cookie && $.assistStatus && !$.outFlag && !$.activityEnd) {
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.index = 1;
    message = "";
    $.bean = 0;
    $.hotFlag = false;
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
    await getUA();
    await run();
  }
  if ($.outFlag) {
    let QQ0QO0 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + QQ0QO0);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(OQOQ0O => $.logErr(OQOQ0O)).finally(() => $.done());
async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(originCookie, "https://lzkjdz-isv.isvjcloud.com");
    await $.wait(500);
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
    if ($.index == 1) await takePostRequest("getSimpleActInfoVo");
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await takePostRequest("getActMemberInfo");
    if (!$.openCard) {
      $.shopactivityId = "";
      $.joinVenderId = $.venderId;
      await getshopactivityId();
      for (let Q0QQQO = 0; Q0QQQO < Array(5).length; Q0QQQO++) {
        if (Q0QQQO > 0) console.log("第" + Q0QQQO + "次 重新开卡");
        await joinShop();
        await $.wait(500);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
          break;
        }
      }
    }
    await takePostRequest("activityContent");
    let Q0QQ0Q = new Date().valueOf();
    $.startTimeStr = new Date($.startTime).valueOf();
    $.endTimeStr = new Date($.endTime).valueOf();
    if ($.endTimeStr <= Q0QQ0Q) {
      console.log("活动已经结束了~");
      $.activityEnd = true;
      return;
    }
    if ($.startTimeStr >= Q0QQ0Q) {
      console.log("活动开始时间：" + new Date(parseInt($.startTime)).toLocaleString());
      $.activityEnd = true;
      return;
    }
    await $.wait(500);
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.index == 1) {
      let OQOOOQ = prizeId = prizeName = "";
      for (let Q0QQQO = 0; Q0QQQO < $.prizeList.length; Q0QQQO++) {
        prizeName = $.prizeList[Q0QQQO].name;
        prizeId = $.prizeList[Q0QQQO].id;
        if (prizeId == 0) {
          OQOOOQ += "谢谢参与";
          break;
        } else {
          if (Q0QQQO != $.prizeList.length - 1) {
            OQOOOQ += prizeName + "，";
          } else {
            OQOOOQ += "" + prizeName;
          }
        }
      }
      await takePostRequest("getShopInfoVO");
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      console.log("店铺名称：" + $.shopName + "\n店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + OQOOOQ + "\n");
    }
    for (let Q0Q0QO = 0; Q0Q0QO < 3; Q0Q0QO++) {
      switch (Q0Q0QO) {
        case 0:
          await takePostRequest("getTaskGame");
          break;
        case 1:
          await takePostRequest("getTaskDay");
          break;
        case 2:
          await takePostRequest("getTask");
          break;
      }
      await $.wait(500);
      var OQ0QO0 = [2, 3, 4, 5];
      if ($.tasklist.length > 0) {
        for (let Q0QQQO = 0; Q0QQQO < $.tasklist.length; Q0QQQO++) {
          $.taskType = $.tasklist[Q0QQQO].taskType;
          $.commodity = $.tasklist[Q0QQQO].commodity;
          $.dayMaxNumber = $.tasklist[Q0QQQO].dayMaxNumber;
          $.finishNumber = $.tasklist[Q0QQQO].finishNumber;
          $.needTimes = $.commodity * $.dayMaxNumber;
          if ($.dayMaxNumber == $.finishNumber) continue;
          if (OQ0QO0.includes($.taskType)) {
            if ($.taskType == 2 && addCart == "false") continue;
            var OQO00O = "";
            switch ($.taskType) {
              case 2:
                OQO00O = "加购";
                break;
              case 3:
                OQO00O = "关注";
                break;
              case 4:
                OQO00O = "预约";
                break;
              case 5:
                OQO00O = "浏览";
                break;
              default:
                break;
            }
            $.activityTaskGoods = $.tasklist[Q0QQQO].activityTaskGoods;
            for (let OQO0QQ = 0; OQO0QQ < $.activityTaskGoods.length; OQO0QQ++) {
              console.log("去" + OQO00O + "商品");
              $.skuId = $.activityTaskGoods[OQO0QQ].skuId;
              await takePostRequest("finishTask");
              await $.wait(500);
              if ($.taskResult) $.score += $.newScore;
              if (OQO0QQ == $.needTimes - 1) break;
            }
          } else {
            $.skuId = "";
            switch ($.taskType) {
              case 1:
                console.log("去关注店铺");
                await takePostRequest("finishTask");
                await $.wait(500);
                if ($.taskResult) $.score += $.newScore;
                break;
              case 9:
                break;
              case 12:
                console.log("去逛会场：" + $.tasklist[Q0QQQO].name);
                await takePostRequest("finishTask");
                await $.wait(500);
                if ($.taskResult) $.score += $.newScore;
                break;
              case 99:
                break;
              default:
                break;
            }
          }
        }
      }
      if (Q0Q0QO == 2 && $.score > 0) console.log("");
    }
    console.log("\n剩余次数: " + $.score + "次\n读秒时长: " + $.targetTime + "\n");
    if ($.score > 0) {
      let OQ00O0 = parseInt($.score / 1);
      for (m = 1; OQ00O0--; m++) {
        console.log("开始第" + m + "次挑战");
        await takePostRequest("activityContent");
        await $.wait(500);
        await takePostRequest("checkAuth");
        await $.wait(500);
        await takePostRequest("start");
        if ($.runFalag == false) break;
        if (Number(OQ00O0) <= 0) break;
        if (m >= 2) {
          console.log("\n挑战太多次了，下次再继续吧～");
          break;
        }
        await $.wait(parseInt(Math.random() * 3000 + 1000, 10));
      }
    } else {
      $.assistStatus = true;
    }
    await $.wait(1000);
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log("\n后面的号都会助力 => " + $.shareUuid);
    }
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
  } catch (OQ0QOOO) {
    console.log(OQ0QOOO);
  }
}
async function takePostRequest(Q00OOQO) {
  if ($.outFlag) return;
  let QQ000OO = "https://lzkjdz-isv.isvjcloud.com";
  let QQ00Q00 = "";
  let O000O0O = "POST";
  switch (Q00OOQO) {
    case "getMyPing":
      url = QQ000OO + "/customer/getMyPing";
      QQ00Q00 = "token=" + $.Token + "&fromType=APP&userId=" + $.venderId + "&pin=";
      break;
    case "getSimpleActInfoVo":
      url = QQ000OO + "/customer/getSimpleActInfoVo";
      QQ00Q00 = "activityId=" + $.activityId;
      break;
    case "getActMemberInfo":
      url = QQ000OO + "/wxCommonInfo/getActMemberInfo";
      QQ00Q00 = "venderId=" + ($.venderId || "") + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "accessLogWithAD":
      url = QQ000OO + "/common/accessLogWithAD";
      let O000O0Q = "https://lzkjdz-isv.isvjd.com/wxSecond/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      QQ00Q00 = "venderId=" + ($.venderId || "") + "&code=71&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(O000O0Q) + "&subType=app&adSource=";
      break;
    case "getOpenCardStatusWithOutSelf":
      url = QQ000OO + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      QQ00Q00 = "venderId=" + ($.venderId || "") + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = QQ000OO + "/wxSecond/getData";
      QQ00Q00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid + "&activityStatus=";
      break;
    case "getShopInfoVO":
      url = QQ000OO + "/wxActionCommon/getShopInfoVO";
      QQ00Q00 = "userId=" + $.venderId;
      break;
    case "getTaskGame":
      url = QQ000OO + "/wxSecond/getTaskGame";
      QQ00Q00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "getTaskDay":
      url = QQ000OO + "/wxSecond/getTaskDay";
      QQ00Q00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "getTask":
      url = QQ000OO + "/wxSecond/getTask";
      QQ00Q00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "finishTask":
      url = QQ000OO + "/wxSecond/finishTask";
      QQ00Q00 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&taskType=" + $.taskType + "&skuId=" + $.skuId;
      break;
    case "checkAuth":
      url = QQ000OO + "/wxSecond/checkAuth";
      QQ00Q00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&brushBane=" + encodeURIComponent($.brushBane) + "&bid=" + $.bid;
      break;
    case "start":
      url = QQ000OO + "/wxSecond/start";
      QQ00Q00 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&seconds=" + $.targetTime + "&brushBane=" + encodeURIComponent($.brushResult) + "&bid=" + $.bid;
      break;
    default:
      console.log("错误" + Q00OOQO);
  }
  let QOQ0Q0Q = getPostRequest(url, QQ00Q00, O000O0O);
  return new Promise(async QOQ00Q0 => {
    $.post(QOQ0Q0Q, (OOOOQO0, QQ0OQ0O, Q000QO0) => {
      try {
        setActivityCookie(QQ0OQ0O);
        if (OOOOQO0) {
          if (QQ0OQ0O && typeof QQ0OQ0O.statusCode != "undefined") {
            if (QQ0OQ0O.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(OOOOQO0, OOOOQO0));
          console.log("API请求失败，请检查网路重试");
        } else {
          dealReturn(Q00OOQO, Q000QO0);
        }
      } catch (QOQO0QQ) {
        console.log(QOQO0QQ, QQ0OQ0O);
      } finally {
        QOQ00Q0();
      }
    });
  });
}
async function dealReturn(Q00Q000, O0QOQO0) {
  let OOQQOQQ = "";
  try {
    if (Q00Q000 != "accessLogWithAD" || Q00Q000 != "drawContent") {
      if (O0QOQO0) {
        OOQQOQQ = JSON.parse(O0QOQO0);
      }
    }
  } catch (OOO0QO0) {
    console.log("执行任务异常");
    console.log(OOO0QO0);
    $.runFalag = false;
  }
  try {
    switch (Q00Q000) {
      case "getMyPing":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            if (OOQQOQQ.data && typeof OOQQOQQ.data.secretPin != "undefined") $.Pin = OOQQOQQ.data.secretPin;
            if (OOQQOQQ.data && typeof OOQQOQQ.data.nickname != "undefined") {
              $.nickname = OOQQOQQ.data.nickname;
            }
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "getSimpleActInfoVo":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            if (typeof OOQQOQQ.data.shopId != "undefined") $.shopId = OOQQOQQ.data.shopId;
            if (typeof OOQQOQQ.data.venderId != "undefined") $.venderId = OOQQOQQ.data.venderId;
            if (typeof OOQQOQQ.data.activityType != "undefined") $.activityType = OOQQOQQ.data.activityType;
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "getActMemberInfo":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            $.openCard = OOQQOQQ.data.openCard || false;
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "activityContent":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            $.endTime = OOQQOQQ.data.endTime || "";
            $.startTime = OOQQOQQ.data.startTime || "";
            $.actorUuid = OOQQOQQ.data.uuid || "";
            $.name = OOQQOQQ.data.secondActive.name || "";
            $.targetTime = OOQQOQQ.data.secondActive.targetTime || "";
            $.score = OOQQOQQ.data.score || 0;
            $.prizeList = OOQQOQQ.data.prizeList || [];
            $.bid = OOQQOQQ.data.bid || 0;
            $.brushBane = OOQQOQQ.data.brushBane || "";
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "getShopInfoVO":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            $.shopName = OOQQOQQ.data.shopName || "";
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "getTaskGame":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            $.tasklist = OOQQOQQ.data;
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "checkAuth":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            $.bid = OOQQOQQ.data.data.bid;
            $.brushResult = OOQQOQQ.data.data.brushResult;
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "getTaskDay":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            $.tasklist = OOQQOQQ.data;
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "getTask":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            $.tasklist = OOQQOQQ.data;
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "finishTask":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            $.taskResult = OOQQOQQ.data;
            $.newScore = $.taskResult.score;
            console.log("  >> 任务完成");
          } else if (OOQQOQQ.errorMessage) {
            console.log("  >> " + (OOQQOQQ.errorMessage || "任务失败"));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("" + O0QOQO0);
        }
        break;
      case "start":
        if (typeof OOQQOQQ == "object") {
          if (OOQQOQQ.result && OOQQOQQ.result === true) {
            if (OOQQOQQ.data.draw.drawOk === true) {
              console.log("" + OOQQOQQ.data.draw.name);
            } else {
              console.log("空气💨");
            }
          } else if (OOQQOQQ.errorMessage) {
            console.log("" + (OOQQOQQ.errorMessage || ""));
          } else {
            console.log("" + O0QOQO0);
          }
        } else {
          console.log("抽了个寂寞～");
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(Q00Q000 + "-> " + O0QOQO0);
    }
    if (typeof OOQQOQQ == "object") {
      if (OOQQOQQ.errorMessage) {
        if (OOQQOQQ.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (QQO0Q00) {
    console.log(QQO0Q00);
  }
}
function getPostRequest(O00O0QO, OOOQOO0, OOOQ00O = "POST") {
  let OQO0OQO = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (O00O0QO.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1) {
    OQO0OQO.Referer = "https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
    OQO0OQO.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie;
  }
  return {
    "url": O00O0QO,
    "method": OOOQ00O,
    "headers": OQO0OQO,
    "body": OOOQOO0,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(O00OQ0O => {
    let QOOO0QQ = {
      "url": "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": "https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(QOOO0QQ, async (O0OQO00, Q00OQO0, OQO0OQ0) => {
      try {
        if (O0OQO00) {
          if (Q00OQO0 && typeof Q00OQO0.statusCode != "undefined") {
            if (Q00OQO0.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(O0OQO00));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Q0O0OOQ = OQO0OQ0.match(/(活动已经结束)/) && OQO0OQ0.match(/(活动已经结束)/)[1] || "";
          if (Q0O0OOQ) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          setActivityCookie(Q00OQO0);
        }
      } catch (OOO0OO0) {
        $.logErr(OOO0OO0, Q00OQO0);
      } finally {
        O00OQ0O();
      }
    });
  });
}
function setActivityCookie(QOO00OO) {
  if (QOO00OO.headers["set-cookie"]) {
    cookie = "" + originCookie;
    for (let QQO00QQ of QOO00OO.headers["set-cookie"]) {
      lz_cookie[QQO00QQ.split(";")[0].substr(0, QQO00QQ.split(";")[0].indexOf("="))] = QQO00QQ.split(";")[0].substr(QQO00QQ.split(";")[0].indexOf("=") + 1);
    }
    for (const O00OO00 of Object.keys(lz_cookie)) {
      cookie += O00OO00 + "=" + lz_cookie[O00OO00] + ";";
    }
    activityCookie = cookie;
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(OOOQQQ0) {
  OOOQQQ0 = OOOQQQ0 || 32;
  let QQOQ0OO = "abcdef0123456789",
    O0000OQ = QQOQ0OO.length,
    Q0O0OOO = "";
  for (i = 0; i < OOOQQQ0; i++) Q0O0OOO += QQOQ0OO.charAt(Math.floor(Math.random() * O0000OQ));
  return Q0O0OOO;
}
function jsonParse(QQOQQ00) {
  if (typeof QQOQQ00 == "string") {
    try {
      return JSON.parse(QQOQQ00);
    } catch (Q0O000Q) {
      console.log(Q0O000Q);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async OO0OQQO => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let QOOOO00 = "";
    if ($.shopactivityId) QOOOO00 = ",\"activityId\":" + $.shopactivityId;
    const OO0O000 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + QOOOO00 + ",\"channel\":406}";
    const OOOQQQQ = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(OO0O000)
    };
    const OO0OQQQ = await getH5st("8adfb", OOOQQQQ);
    const OOOQ000 = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + OO0O000 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(OO0OQQQ),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(OOOQ000, async (OOOQQQO, O0OQ0QO, Q00OQQ0) => {
      try {
        Q00OQQ0 = Q00OQQ0 && Q00OQQ0.match(/jsonp_.*?\((.*?)\);/) && Q00OQQ0.match(/jsonp_.*?\((.*?)\);/)[1] || Q00OQQ0;
        let QQOQ0Q0 = $.toObj(Q00OQQ0, Q00OQQ0);
        if (QQOQ0Q0 && typeof QQOQ0Q0 == "object") {
          if (QQOQ0Q0 && QQOQ0Q0.success === true) {
            console.log(QQOQ0Q0.message);
            $.errorJoinShop = QQOQ0Q0.message;
            if (QQOQ0Q0.result && QQOQ0Q0.result.giftInfo) {
              for (let Q0O000O of QQOQ0Q0.result.giftInfo.giftList) {
                console.log("入会获得: " + Q0O000O.discountString + Q0O000O.prizeName + Q0O000O.secondLineDesc);
              }
            }
            console.log("");
          } else if (QQOQ0Q0 && typeof QQOQ0Q0 == "object" && QQOQ0Q0.message) {
            $.errorJoinShop = QQOQ0Q0.message;
            console.log("" + (QQOQ0Q0.message || ""));
          } else {
            console.log(Q00OQQ0);
          }
        } else {
          console.log(Q00OQQ0);
        }
      } catch (O0000O0) {
        $.logErr(O0000O0, O0OQ0QO);
      } finally {
        OO0OQQO();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async QQOOQ00 => {
    let OQOQQQO = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const QQQ0O0O = {
      "appid": "jd_shop_member",
      "functionId": "getShopOpenCardInfo",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(OQOQQQO)
    };
    const QOOQ0OQ = await getH5st("ef79a", QQQ0O0O);
    const QOOQ0OO = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + OQOQQQO + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(QOOQ0OQ),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(QOOQ0OO, async (QOOQQ00, OQO0QQ0, QQQQ0QQ) => {
      try {
        QQQQ0QQ = QQQQ0QQ && QQQQ0QQ.match(/jsonp_.*?\((.*?)\);/) && QQQQ0QQ.match(/jsonp_.*?\((.*?)\);/)[1] || QQQQ0QQ;
        let QQOOQ0Q = $.toObj(QQQQ0QQ, QQQQ0QQ);
        if (QQOOQ0Q && typeof QQOOQ0Q == "object") {
          if (QQOOQ0Q && QQOOQ0Q.success == true) {
            console.log("\n去入会: " + (QQOOQ0Q.result.shopMemberCardInfo.venderCardName || ""));
            $.shopactivityId = QQOOQ0Q.result.interestsRuleList && QQOOQ0Q.result.interestsRuleList[0] && QQOOQ0Q.result.interestsRuleList[0].interestsInfo && QQOOQ0Q.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else {
          console.log(QQQQ0QQ);
        }
      } catch (Q0O0OQ0) {
        $.logErr(Q0O0OQ0, OQO0QQ0);
      } finally {
        QQOOQ00();
      }
    });
  });
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const OQOOOQ0 = Array.from(new Set($.blacklist.split("&")));
  console.log(OQOOOQ0.join("&") + "\n");
  let Q0OQOO0 = OQOOOQ0;
  let O00O0OQ = [];
  let Q0OQ00Q = false;
  for (let OOOQOQ0 = 0; OOOQOQ0 < cookiesArr.length; OOOQOQ0++) {
    let OO0OQO0 = decodeURIComponent(cookiesArr[OOOQOQ0].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[OOOQOQ0].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!OO0OQO0) break;
    let OQO0OOO = false;
    for (let OQO0OOQ of Q0OQOO0) {
      if (OQO0OOQ && OQO0OOQ == OO0OQO0) {
        OQO0OOO = true;
        break;
      }
    }
    if (!OQO0OOO) {
      Q0OQ00Q = true;
      O00O0OQ.splice(OOOQOQ0, -1, cookiesArr[OOOQOQ0]);
    }
  }
  if (Q0OQ00Q) cookiesArr = O00O0OQ;
}
function toFirst(QQOO0QQ, QQQQO00) {
  if (QQQQO00 != 0) {
    QQOO0QQ.unshift(QQOO0QQ.splice(QQQQO00, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const OO0QOO0 = Array.from(new Set($.whitelist.split("&")));
  console.log(OO0QOO0.join("&") + "\n");
  let OO0Q00O = [];
  let OQOO0QQ = OO0QOO0;
  for (let OQQQO0O in cookiesArr) {
    let Q0QQQQ0 = decodeURIComponent(cookiesArr[OQQQO0O].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[OQQQO0O].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (OQOO0QQ.includes(Q0QQQQ0)) {
      OO0Q00O.push(cookiesArr[OQQQO0O]);
    }
  }
  helpCookiesArr = OO0Q00O;
  if (OQOO0QQ.length > 1) {
    for (let OQQQO0Q in OQOO0QQ) {
      let QQQ00OQ = OQOO0QQ[OQOO0QQ.length - 1 - OQQQO0Q];
      if (!QQQ00OQ) continue;
      for (let OQQQO0O in helpCookiesArr) {
        let Q0QQQQ0 = decodeURIComponent(helpCookiesArr[OQQQO0O].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[OQQQO0O].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (QQQ00OQ == Q0QQQQ0) {
          toFirst(helpCookiesArr, OQQQO0O);
        }
      }
    }
  }
}
function getH5st(OO0Q00Q, QOOQO0Q) {
  return new Promise(async O0OO00Q => {
    let QO0OQQQ = {
      "url": "http://api.kingran.cf/h5st",
      "body": "businessId=" + OO0Q00Q + "&req=" + encodeURIComponent(JSON.stringify(QOOQO0Q)),
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "timeout": 30 * 1000
    };
    $.post(QO0OQQQ, (QOOQO00, OO0Q000, OO0QQQO) => {
      try {
        if (QOOQO00) {
          console.log(JSON.stringify(QOOQO00));
          console.log($.name + " getSign API请求失败，请检查网路重试");
        } else {}
      } catch (Q0QQQQO) {
        $.logErr(Q0QQQQO, OO0Q000);
      } finally {
        O0OO00Q(OO0QQQO);
      }
    });
  });
}