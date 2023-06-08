/*
6.5-6.25狂欢618  惊喜从天降
新增开卡脚本，一次性脚本


第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 6.5-6.25狂欢618  惊喜从天降 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#6.5-6.25狂欢618  惊喜从天降
11 15 9,11 * * jd_opencardL311a.js, tag=6.5-6.25狂欢618  惊喜从天降, enabled=true

*/
const Env = require('./utils/Env.js');
const $ = new Env('6.5-6.25狂欢618  惊喜从天降');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
const getToken = require("./function/krgetToken");
const getH5st = require("./function/krh5st");
let domains = "https://lzdz1-isv.isvjcloud.com";
let opencard_draw = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x337e01 => {
    cookiesArr.push(jdCookieNode[_0x337e01]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x598b96 => _0x598b96.cookie)].filter(_0x41c441 => !!_0x41c441);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "";
let activityCookie = "";
let lz_cookie = {};
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  authorCodeList = ["2fba7f1ea89647e2b23732bf34b0349f","da453a5e710c4482ac13e5a469b54807","6c2c14f5f4bc4b9da35a45d443074fa0"];
  $.activityId = "dz98d6d00d9093435380b02a0fc668";
  $.authorCode = authorCodeList[random(0, authorCodeList.length)];
  $.shareUuid = $.authorCode;
  console.log("入口:\nhttps://lzdz1-isv.isvjcloud.com/m/1000003005/" + $.activityId + "/?shareUuid=" + $.shareUuid);
  for (let _0x4c83cb = 0; _0x4c83cb < cookiesArr.length; _0x4c83cb++) {
    cookie = cookiesArr[_0x4c83cb];
    originCookie = cookiesArr[_0x4c83cb];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x4c83cb + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let _0x5d9356 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x5d9356);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + _0x5d9356);
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(_0x898f88 => $.logErr(_0x898f88)).finally(() => $.done());
async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    let _0xc826e1 = false;
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
    await $.wait(1000);
    await takePostRequest("drawContent");
    await takePostRequest("activityContent");
    await $.wait(1000);
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    $.openList = [];
    $.allOpenCard = false;
    await takePostRequest("checkOpenCard");
    if ($.allOpenCard == false) {
      console.log("开卡任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.openStatus == false) {
          _0xc826e1 = true;
          $.joinVenderId = o.venderId;
          $.shopactivityId = "";
          await getshopactivityId();
          for (let _0x2515f2 = 0; _0x2515f2 < Array(2).length; _0x2515f2++) {
            if (_0x2515f2 > 0) console.log("第" + _0x2515f2 + "次 重新开卡");
            await joinShop();
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
              break;
            }
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("💔 可能是开卡黑号,跳过运行");
            return;
          }
          await takePostRequest("drawContent");
          await takePostRequest("checkOpenCard");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
      await takePostRequest("activityContent");
    } else {
      console.log("已全部开卡");
    }
    $.log("关注: " + $.allFollowShop);
    if (!$.allFollowShop && !$.outFlag) {
      _0xc826e1 = true;
      await takePostRequest("signTask");
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    $.log("加购: " + $.addSku);
    if (!$.addSku && !$.outFlag) {
      _0xc826e1 = true;
      await takePostRequest("addSku");
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    await takePostRequest("activityContent");
    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let _0x4db965 = parseInt($.score2 / 100);
      opencard_draw = parseInt(opencard_draw, 10);
      if (_0x4db965 > opencard_draw) _0x4db965 = opencard_draw;
      console.log("已设置抽奖次数为" + _0x4db965 + "次，当前有" + $.score2 + "金币");
      for (m = 1; _0x4db965--; m++) {
        console.log("进行第" + m + "次抽奖");
        await takePostRequest("startDraw");
        if ($.runFalag == false) break;
        if (Number(_0x4db965) <= 0) break;
        if (m >= 10) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    console.log($.actorUuid);
    console.log("当前助力:" + $.shareUuid);
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log("后面的号都会助力:" + $.shareUuid);
    }
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (_0x14f2ed) {
    console.log(_0x14f2ed);
  }
}
async function takePostRequest(_0x4d1216) {
  if ($.outFlag) return;
  let _0x5572c1 = "https://lzdz1-isv.isvjcloud.com";
  let _0x3e6b3d = "";
  let _0x384b52 = "POST";
  switch (_0x4d1216) {
    case "getMyPing":
      url = _0x5572c1 + "/customer/getMyCidPing";
      _0x3e6b3d = "token=" + $.Token + "&fromType=APP&userId=1000003005&activityId=" + $.activityId + "&pin=";
      break;
    case "getSimpleActInfoVo":
      url = _0x5572c1 + "/common/brand/getSimpleActInfoVo";
      _0x3e6b3d = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = _0x5572c1 + "/common/accessLogWithAD";
      let _0x4a32f0 = "https://lzdz1-isv.isvjcloud.com/m/1000003005/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      _0x3e6b3d = "venderId=1000003005&code=90&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x4a32f0) + "&subType=JDApp";
      break;
    case "drawContent":
      url = _0x5572c1 + "/dingzhi/taskact/common/drawContent";
      _0x3e6b3d = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = _0x5572c1 + "/dingzhi/advanced/union/activityContent";
      _0x3e6b3d = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "checkOpenCard":
      url = _0x5572c1 + "/dingzhi/advanced/union/initOpenCard";
      _0x3e6b3d = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "getSystime":
      url = _0x5572c1 + "/common/getSystime";
      _0x3e6b3d = "pin=" + encodeURIComponent($.Pin);
      break;
    case "signDetail":
      url = _0x5572c1 + "/dingzhi/advanced/union/signDetail";
      _0x3e6b3d = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "signTask":
      url = _0x5572c1 + "/dingzhi/advanced/union/saveTask";
      _0x3e6b3d = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=23&taskValue=0&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "mainActive":
      url = _0x5572c1 + "/dingzhi/advanced/union/saveTask";
      _0x3e6b3d = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskType=12&taskValue=1&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "startDraw":
      url = _0x5572c1 + "/dingzhi/advanced/union/draw";
      _0x3e6b3d = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&change=2";
      break;
    case "followShop":
      url = _0x5572c1 + "/dingzhi/advanced/union/saveTask";
      _0x3e6b3d = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=23&taskValue=23}";
      break;
    case "addSku":
      url = _0x5572c1 + "/dingzhi/advanced/union/saveTask";
      _0x3e6b3d = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=21&taskValue=2&level=2";
      break;
    default:
      console.log("错误" + _0x4d1216);
  }
  let _0x12ea3a = getPostRequest(url, _0x3e6b3d, _0x384b52);
  return new Promise(async _0x4521f2 => {
    $.post(_0x12ea3a, (_0x819e74, _0x12d5ae, _0x3b60ed) => {
      try {
        setActivityCookie(_0x12d5ae);
        if (_0x819e74) {
          if (_0x12d5ae && typeof _0x12d5ae.statusCode != "undefined") {
            if (_0x12d5ae.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(_0x819e74, _0x819e74));
          console.log(_0x4d1216 + " API请求失败，请检查网路重试");
        } else {
          dealReturn(_0x4d1216, _0x3b60ed);
        }
      } catch (_0xbbd4b1) {
        console.log(_0xbbd4b1, _0x12d5ae);
      } finally {
        _0x4521f2();
      }
    });
  });
}
async function dealReturn(_0x22f8e3, _0x93ebf1) {
  let _0x16ef95 = "";
  try {
    if (_0x22f8e3 != "accessLogWithAD" || _0x22f8e3 != "drawContent") {
      if (_0x93ebf1) {
        _0x16ef95 = JSON.parse(_0x93ebf1);
      }
    }
  } catch (_0x33fa7f) {
    console.log(_0x22f8e3 + " 执行任务异常");
    console.log(_0x93ebf1);
    $.runFalag = false;
  }
  try {
    switch (_0x22f8e3) {
      case "getMyPing":
        if (typeof _0x16ef95 == "object") {
          if (_0x16ef95.result && _0x16ef95.result === true) {
            if (_0x16ef95.data && typeof _0x16ef95.data.secretPin != "undefined") $.Pin = _0x16ef95.data.secretPin;
            if (_0x16ef95.data && typeof _0x16ef95.data.nickname != "undefined") $.nickname = _0x16ef95.data.nickname;
          } else if (_0x16ef95.errorMessage) {
            console.log(_0x22f8e3 + " " + (_0x16ef95.errorMessage || ""));
          } else {
            console.log(_0x22f8e3 + " " + _0x93ebf1);
          }
        } else {
          console.log(_0x22f8e3 + " " + _0x93ebf1);
        }
        break;
      case "checkOpenCard":
        if (typeof _0x16ef95 == "object") {
          if (_0x16ef95.result && _0x16ef95.result === true) {
            let _0x2fbcd2 = _0x16ef95.data.cardList1 || [];
            let _0x59b4e6 = _0x16ef95.data.cardList2 || [];
            let _0x31d619 = _0x16ef95.data.cardList || [];
            let _0x3c7e19 = _0x16ef95.data.openCardList || [];
            let _0x5573a7 = _0x16ef95.data.openInfo || [];
            $.openList = [..._0x31d619, ..._0x2fbcd2, ..._0x59b4e6, ..._0x3c7e19, ..._0x5573a7];
            $.allOpenCard = _0x16ef95.data.allOpenCard || _0x16ef95.data.isOpenCardStatus || false;
            $.openCardScore1 = _0x16ef95.data.score1 || 0;
            $.openCardScore2 = _0x16ef95.data.score2 || 0;
            $.drawScore = _0x16ef95.data.score || 0;
            if (_0x16ef95.data.beans || _0x16ef95.data.addBeanNum) console.log("开卡获得:" + (_0x16ef95.data.beans || _0x16ef95.data.addBeanNum) + "豆");
          } else if (_0x16ef95.errorMessage) {
            console.log(_0x22f8e3 + " " + (_0x16ef95.errorMessage || ""));
          } else {
            console.log(_0x22f8e3 + " " + _0x93ebf1);
          }
        } else {
          console.log(_0x22f8e3 + " " + _0x93ebf1);
        }
        break;
      case "activityContent":
        if (typeof _0x16ef95 == "object") {
          if (_0x16ef95.result && _0x16ef95.result === true) {
            $.actorUuid = _0x16ef95.data.actorUuid || "";
            $.saveAddress = _0x16ef95.data.saveAddress || false;
            $.followShop = _0x16ef95.data.followShop || false;
            $.hasEnd = _0x16ef95.data.hasEnd || false;
            $.toSign = _0x16ef95.data.toSign || false;
            $.openCard = _0x16ef95.data.openCard || false;
            $.allFollowShop = _0x16ef95.data.allFollowShop || false;
            $.addSku = _0x16ef95.data.skuAddCart || false;
            $.firstAccess = _0x16ef95.data.firstAccess || false;
            $.isDraw = _0x16ef95.data.isDraw;
            $.score2 = _0x16ef95.data.score2 || 0;
            $.assistCount = _0x16ef95.data.assistCount || 0;
            $.mainActive = _0x16ef95.data.mainActive || false;
            $.sign = _0x16ef95.data.sign || false;
          } else if (_0x16ef95.errorMessage) {
            if (_0x16ef95.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
            console.log(_0x22f8e3 + " " + (_0x16ef95.errorMessage || ""));
          } else {
            console.log(_0x22f8e3 + " " + _0x93ebf1);
          }
        } else {
          console.log(_0x22f8e3 + " " + _0x93ebf1);
        }
        break;
      case "signTask":
        if (typeof _0x16ef95 == "object") {
          if (_0x16ef95.result && _0x16ef95.result === true) {
            console.log("获得：" + (_0x16ef95.data.score2 || 0) + " ,豆子：" + (_0x16ef95.data.taskbeanNum || 0));
          } else {
            console.log("" + (_0x16ef95.errorMessage || ""));
          }
        } else {
          console.log("" + _0x93ebf1);
        }
        break;
      case "addSku":
      case "mainActive":
      case "followShop":
        if (typeof _0x16ef95 == "object") {
          if (_0x16ef95.result && _0x16ef95.result === true && _0x16ef95.data) {
            console.log("获得：" + (_0x16ef95.data.score2 || 0) + " ");
          } else if (_0x16ef95.errorMessage) {
            console.log("" + (_0x16ef95.errorMessage || ""));
          } else {
            console.log("" + _0x93ebf1);
          }
        } else {
          console.log(_0x22f8e3 + " " + _0x93ebf1);
        }
        break;
      case "startDraw":
        if (typeof _0x16ef95 == "object") {
          if (_0x16ef95.result && _0x16ef95.result === true && _0x16ef95.data.wdsrvo.drawOk) {
            console.log("获得：" + (_0x16ef95.data.wdsrvo.name || "") + " ");
          } else if (_0x16ef95.errorMessage) {
            console.log("" + (_0x16ef95.errorMessage || ""));
          } else {
            console.log("空气");
          }
        } else {
          console.log(_0x22f8e3 + " " + _0x93ebf1);
        }
        break;
      case "prizeRotation":
        if (typeof _0x16ef95 == "object") {
          if (_0x16ef95.result && _0x16ef95.result === true && _0x16ef95.data) {
            $.prizeRotation = _0x16ef95.data.prizeRotation;
          } else if (_0x16ef95.errorMessage) {
            console.log("" + (_0x16ef95.errorMessage || ""));
          } else {
            console.log("" + _0x93ebf1);
          }
        } else {
          console.log("" + _0x93ebf1);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(_0x22f8e3 + "-> " + _0x93ebf1);
    }
    if (typeof _0x16ef95 == "object") {
      if (_0x16ef95.errorMessage) {
        if (_0x16ef95.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (_0x48bd0d) {
    console.log(_0x48bd0d);
  }
}
function getPostRequest(_0x2b3a27, _0x55b0dd, _0x25a509 = "POST") {
  let _0x5abae0 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x2b3a27.indexOf("https://lzdz1-isv.isvjcloud.com") > -1) {
    _0x5abae0.Referer = "https://lzdz1-isv.isvjcloud.com/m/1000003005/" + $.activityId + "/?shareUuid=" + $.shareUuid;
    _0x5abae0.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie;
  }
  return {
    "url": _0x2b3a27,
    "method": _0x25a509,
    "headers": _0x5abae0,
    "body": _0x55b0dd,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(_0x32e6df => {
    let _0x226701 = {
      "url": "https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": "https://lzdz1-isv.isvjcloud.com/m/1000003005/" + $.activityId + "/?shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x226701, async (_0x38de79, _0x5338d9, _0x55b934) => {
      try {
        if (_0x38de79) {
          if (_0x5338d9 && typeof _0x5338d9.statusCode != "undefined") {
            if (_0x5338d9.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(_0x38de79));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let _0x57f7f = _0x55b934.match(/(活动已经结束)/) && _0x55b934.match(/(活动已经结束)/)[1] || "";
          if (_0x57f7f) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          setActivityCookie(_0x5338d9);
        }
      } catch (_0x4f5f31) {
        $.logErr(_0x4f5f31, _0x5338d9);
      } finally {
        _0x32e6df();
      }
    });
  });
}
function setActivityCookie(_0x5e8fb1) {
  if (_0x5e8fb1) {
    if (_0x5e8fb1.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let _0xc77e82 of _0x5e8fb1.headers["set-cookie"]) {
        lz_cookie[_0xc77e82.split(";")[0].substr(0, _0xc77e82.split(";")[0].indexOf("="))] = _0xc77e82.split(";")[0].substr(_0xc77e82.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x3231d3 of Object.keys(lz_cookie)) {
        cookie += _0x3231d3 + "=" + lz_cookie[_0x3231d3] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(_0x1afa3f) {
  _0x1afa3f = _0x1afa3f || 32;
  let _0xd357ae = "abcdef0123456789",
    _0x3b092d = _0xd357ae.length,
    _0x52dad3 = "";
  for (i = 0; i < _0x1afa3f; i++) _0x52dad3 += _0xd357ae.charAt(Math.floor(Math.random() * _0x3b092d));
  return _0x52dad3;
}
function jsonParse(_0x1bad1e) {
  if (typeof _0x1bad1e == "string") {
    try {
      return JSON.parse(_0x1bad1e);
    } catch (_0x475b6f) {
      console.log(_0x475b6f);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function timestampToTime(_0x10fd8c) {
  var _0x45b413 = new Date(_0x10fd8c);
  var _0x130a2a = _0x45b413.getFullYear();
  var _0x1b2b09 = _0x45b413.getMonth() + 1 < 10 ? "0" + (_0x45b413.getMonth() + 1) : _0x45b413.getMonth() + 1;
  var _0xf68383 = _0x45b413.getDate();
  if (_0xf68383.length == 2) {
    _0xf68383 = "0" + _0xf68383;
  }
  return _0x130a2a + _0x1b2b09 + _0xf68383;
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0xecdb23 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x2d8d01 = "";
    if ($.shopactivityId) _0x2d8d01 = ",\"activityId\":" + $.shopactivityId;
    const _0x9b9f24 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x2d8d01 + ",\"channel\":406}";
    const _0x27ecb5 = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(_0x9b9f24)
    };
    const _0x33ab86 = await getH5st("8adfb", _0x27ecb5);
    const _0x1c0749 = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x9b9f24 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x33ab86),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x1c0749, async (_0x257efb, _0x5c1584, _0x133734) => {
      try {
        if (_0x257efb) {
          if (_0x5c1584 && typeof _0x5c1584.statusCode != "undefined") {
            if (_0x5c1584.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x133734 = _0x133734 && _0x133734.match(/jsonp_.*?\((.*?)\);/) && _0x133734.match(/jsonp_.*?\((.*?)\);/)[1] || _0x133734;
          let _0x50dbed = $.toObj(_0x133734, _0x133734);
          if (_0x50dbed && typeof _0x50dbed == "object") {
            if (_0x50dbed && _0x50dbed.success === true) {
              console.log(" >> " + _0x50dbed.message);
              $.errorJoinShop = _0x50dbed.message;
              if (_0x50dbed.result && _0x50dbed.result.giftInfo) {
                for (let _0x202c8c of _0x50dbed.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + _0x202c8c.discountString + _0x202c8c.prizeName + _0x202c8c.secondLineDesc);
                }
              }
            } else if (_0x50dbed && typeof _0x50dbed == "object" && _0x50dbed.message) {
              $.errorJoinShop = _0x50dbed.message;
              console.log("" + (_0x50dbed.message || ""));
            } else {
              console.log(_0x133734);
            }
          } else {
            console.log(_0x133734);
          }
        }
      } catch (_0x4ef527) {
        $.logErr(_0x4ef527, _0x5c1584);
      } finally {
        _0xecdb23();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x52c200 => {
    const _0x5ece8d = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x3ec883 = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(_0x5ece8d)
    };
    const _0x4627f4 = await getH5st("8adfb", _0x3ec883);
    const _0x23cb7b = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x5ece8d + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x4627f4),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x23cb7b, async (_0x545646, _0x2dd76d, _0x576dc3) => {
      try {
        if (_0x545646) {
          if (_0x2dd76d && typeof _0x2dd76d.statusCode != "undefined") {
            if (_0x2dd76d.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x576dc3 = _0x576dc3 && _0x576dc3.match(/jsonp_.*?\((.*?)\);/) && _0x576dc3.match(/jsonp_.*?\((.*?)\);/)[1] || _0x576dc3;
          let _0xe492bb = $.toObj(_0x576dc3, _0x576dc3);
          if (_0xe492bb && typeof _0xe492bb == "object") {
            if (_0xe492bb && _0xe492bb.success == true) {
              console.log("去加入：" + (_0xe492bb.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = _0xe492bb.result.interestsRuleList && _0xe492bb.result.interestsRuleList[0] && _0xe492bb.result.interestsRuleList[0].interestsInfo && _0xe492bb.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else {
            console.log(_0x576dc3);
          }
        }
      } catch (_0x467fc4) {
        $.logErr(_0x467fc4, _0x2dd76d);
      } finally {
        _0x52c200();
      }
    });
  });
}
function getAuthorCodeList(_0x4b604f) {
  return new Promise(_0x489f1a => {
    const _0x5af717 = {
      "url": _0x4b604f + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x5af717, async (_0x2f7afa, _0x463220, _0x2b8d02) => {
      try {
        if (_0x2f7afa) {
          $.getAuthorCodeListerr = false;
        } else {
          if (_0x2b8d02) _0x2b8d02 = JSON.parse(_0x2b8d02);
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x3fb335) {
        $.logErr(_0x3fb335, _0x463220);
        _0x2b8d02 = null;
      } finally {
        _0x489f1a(_0x2b8d02);
      }
    });
  });
}
function random(_0x1c865f, _0x570256) {
  return Math.floor(Math.random() * (_0x570256 - _0x1c865f)) + _0x1c865f;
}
