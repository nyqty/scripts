/*
6.1-6.30 SK2互动抽奖，至高赢经典神仙水

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 6.1-6.30 SK2互动抽奖，至高赢经典神仙水 ]

请求太频繁会被黑ip
过10分钟再执行

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#6.1-6.30 SK2互动抽奖，至高赢经典神仙水
1 1 1 1 * jd_sk2.js, tag=6.1-6.30 SK2互动抽奖，至高赢经典神仙水, enabled=true

*/
const Env = require('./utils/Env.js');
const $ = new Env('6.1-6.30 SK2互动抽奖，至高赢经典神仙水');
const _0x4f7047 = $.isNode() ? require("./jdCookie.js") : "",
  _0xdba553 = $.isNode() ? require("./sendNotify") : "",
  _0x2c7bb2 = require("./function/krgetToken"),
  _0x345762 = require("./function/krh5st");
let _0x54eeab = "https://lzkjdz-isv.isvjcloud.com",
  _0x2ffd61 = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "10" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "10",
  _0x3cf32a = {},
  _0x9b36e = [],
  _0x46f409 = "";
if ($.isNode()) {
  Object.keys(_0x4f7047).forEach(_0x2b78f3 => {
    _0x9b36e.push(_0x4f7047[_0x2b78f3]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x9b36e = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3cb0ff($.getdata("CookiesJD") || "[]").map(_0x35f84c => _0x35f84c.cookie)].filter(_0x505ff8 => !!_0x505ff8);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let _0x3a46e7 = "",
  _0x2dfb2c = "",
  _0x3b0b9 = "https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/2306100000982127/";
!(async () => {
  if (!_0x9b36e[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "2306100000982127";
  authorCodeList = ["5d4fd9e18a24409dbf2bb59388c07ba9"];
  authorCodeList === "404: Not Found" && (authorCodeList = [""]);
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000009821/TaskDraw/?activityId=2306100000982127");
  for (let _0xbd872d = 0; _0xbd872d < _0x9b36e.length; _0xbd872d++) {
    _0x46f409 = _0x9b36e[_0xbd872d];
    originCookie = _0x9b36e[_0xbd872d];
    if (_0x46f409) {
      $.UserName = decodeURIComponent(_0x46f409.match(/pt_pin=([^; ]+)(?=;?)/) && _0x46f409.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xbd872d + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await _0x4522b7();
      await _0x5eb8d1();
      await $.wait(3000);
      if (_0xbd872d == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let _0x37cf96 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x37cf96);
    if ($.isNode()) await _0xdba553.sendNotify("" + $.name, "" + _0x37cf96);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(_0x335cfc => $.logErr(_0x335cfc)).finally(() => $.done());
async function _0x5eb8d1() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    _0x3a46e7 = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await _0x2c7bb2(_0x46f409, _0x54eeab);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await _0x10b67a();
    if (_0x2dfb2c == "") {
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
    await _0x51f622("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await _0x51f622("accessLogWithAD");
    await _0x51f622("getOpenCardStatusWithOutSelf");
    await _0x51f622("activityContent");
    if ($.openStatus == false) {
      console.log("去开通店铺会员");
      $.joinVenderId = 1000009821;
      await _0x5a1570();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await _0x5a1570());
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 无法开卡,跳过运行");
        return;
      }
      await _0x51f622("getOpenCardStatusWithOutSelf");
      await _0x51f622("activityContent");
    }
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    console.log($.actorUuid);
    for (let _0x180394 = 0; _0x180394 < $.taskslist.length; _0x180394++) {
      $.taskId = $.taskslist[_0x180394].taskId;
      $.taskType = $.taskslist[_0x180394].taskType;
      if ($.taskslist[_0x180394].btnState != 1) switch ($.taskType) {
        case "0":
          console.log("去完成" + $.taskslist[_0x180394].taskName);
          await _0x51f622("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "1":
          console.log("去完成" + $.taskslist[_0x180394].taskName);
          await _0x51f622("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "6":
          console.log("去完成" + $.taskslist[_0x180394].taskName);
          await _0x51f622("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "7":
          console.log("去完成" + $.taskslist[_0x180394].taskName);
          await _0x51f622("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "8":
          console.log("去完成" + $.taskslist[_0x180394].taskName);
          await _0x51f622("browse");
          for (let _0x4a9307 = 0; _0x4a9307 < $.browselist.length; _0x4a9307++) {
            $.skuId = $.browselist[_0x4a9307].skuId;
            $.browselist[_0x4a9307].state != 1 && (console.log("去浏览" + $.browselist[_0x4a9307].skuId), await _0x51f622("browse1"), await $.wait(parseInt(Math.random() * 1000 + 2000, 10)));
          }
          break;
        case "2":
          console.log("去完成" + $.taskslist[_0x180394].taskName);
          await _0x51f622("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "4":
          console.log("去完成" + $.taskslist[_0x180394].taskName);
          await _0x51f622("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case "2":
        case "5":
          break;
        default:
          console.log("错误" + $.taskType);
      }
    }
    await _0x51f622("activityContent");
    if (_0x2ffd61 + "" !== "0") {
      $.runFalag = true;
      let _0x38c31a = parseInt($.leftTimes / 1);
      _0x2ffd61 = parseInt(_0x2ffd61, 10);
      if (_0x38c31a > _0x2ffd61) _0x38c31a = _0x2ffd61;
      console.log("已设置抽奖次数为" + _0x2ffd61 + "次，当前有" + $.leftTimes + "次抽奖机会");
      for (m = 1; _0x38c31a--; m++) {
        console.log("进行第" + m + "次抽奖");
        await _0x51f622("draw");
        if ($.runFalag == false) break;
        if (Number(_0x38c31a) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
    }
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (_0x180ab6) {
    console.log(_0x180ab6);
  }
}
async function _0x51f622(_0x362f98) {
  if ($.outFlag) return;
  let _0x162a0e = "https://lzkjdz-isv.isvjcloud.com",
    _0x7e5c00 = "",
    _0xec48e0 = "POST";
  switch (_0x362f98) {
    case "getMyPing":
      url = _0x162a0e + "/customer/getMyPing";
      _0x7e5c00 = "token=" + $.Token + "&fromType=APP&userId=1000009821&pin=";
      break;
    case "getSimpleActInfoVo":
      url = _0x162a0e + "/common/brand/getSimpleActInfoVo";
      _0x7e5c00 = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = _0x162a0e + "/common/accessLogWithAD";
      let _0xbdb358 = "https://lzkjdz-isv.isvjcloud.com/m/1000009821/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      _0x7e5c00 = "venderId=1000009821&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0xbdb358);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = _0x162a0e + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      _0x7e5c00 = "venderId=1000009821&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = _0x162a0e + "/wx/skii/lottery/draw/main";
      _0x7e5c00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&teamId=" + $.shareUuid;
      break;
    case "task":
      url = _0x162a0e + "/wx/skii/lottery/draw/task";
      _0x7e5c00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId + "&mark=2";
      break;
    case "browse":
      url = _0x162a0e + "/wx/skii/lottery/draw/browse";
      _0x7e5c00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId + "&mark=1";
      break;
    case "browse1":
      url = _0x162a0e + "/wx/skii/lottery/draw/browse";
      _0x7e5c00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&skuId=" + $.skuId;
      break;
    case "followShop":
      url = _0x162a0e + "/wxActionCommon/followShop";
      _0x7e5c00 = "activityId=" + $.activityId + "userId=1000009821&activityType=99&buyerNick=" + encodeURIComponent($.Pin) + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "draw":
      url = _0x162a0e + "/wx/skii/lottery/draw/draw";
      _0x7e5c00 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + _0x362f98);
  }
  let _0xd58bfd = _0x4b5d83(url, _0x7e5c00, _0xec48e0);
  return new Promise(async _0x492f89 => {
    $.post(_0xd58bfd, (_0x89fdad, _0x1410aa, _0x17da40) => {
      try {
        _0x56f590(_0x1410aa);
        if (_0x89fdad) {
          _0x1410aa && typeof _0x1410aa.statusCode != "undefined" && _0x1410aa.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(_0x89fdad, _0x89fdad));
          console.log(_0x362f98 + " API请求失败，请检查网路重试");
        } else {
          _0x10b1c1(_0x362f98, _0x17da40);
        }
      } catch (_0xe8a46b) {
        console.log(_0xe8a46b, _0x1410aa);
      } finally {
        _0x492f89();
      }
    });
  });
}
async function _0x10b1c1(_0x5bf11d, _0xe03d8d) {
  let _0x3e2651 = "";
  try {
    (_0x5bf11d != "accessLogWithAD" || _0x5bf11d != "drawContent") && _0xe03d8d && (_0x3e2651 = JSON.parse(_0xe03d8d));
  } catch (_0x1ba678) {
    console.log(_0x5bf11d + " 执行任务异常");
    console.log(_0xe03d8d);
    $.runFalag = false;
  }
  try {
    switch (_0x5bf11d) {
      case "getMyPing":
        if (typeof _0x3e2651 == "object") {
          if (_0x3e2651.result && _0x3e2651.result === true) {
            if (_0x3e2651.data && typeof _0x3e2651.data.secretPin != "undefined") $.Pin = _0x3e2651.data.secretPin;
            if (_0x3e2651.data && typeof _0x3e2651.data.nickname != "undefined") $.nickname = _0x3e2651.data.nickname;
          } else _0x3e2651.errorMessage ? console.log(_0x5bf11d + " " + (_0x3e2651.errorMessage || "")) : console.log(_0x5bf11d + " " + _0xe03d8d);
        } else console.log(_0x5bf11d + " " + _0xe03d8d);
        break;
      case "task":
        if (typeof _0x3e2651 == "object") {
          if (_0x3e2651.success && _0x3e2651.success === true) {
            console.log("" + (_0x3e2651.success || ""));
          } else _0x3e2651.errorMessage ? console.log("" + (_0x3e2651.errorMessage || "")) : console.log("" + _0xe03d8d);
        } else console.log("" + _0xe03d8d);
        break;
      case "browse":
        if (typeof _0x3e2651 == "object") {
          if (_0x3e2651.success && _0x3e2651.success === true) $.browselist = _0x3e2651.data || [];else _0x3e2651.errorMessage ? console.log("" + (_0x3e2651.errorMessage || "")) : console.log("" + _0xe03d8d);
        } else console.log("" + _0xe03d8d);
        break;
      case "browse1":
        if (typeof _0x3e2651 == "object") {
          if (_0x3e2651.success && _0x3e2651.success === true) console.log("" + (_0x3e2651.success || ""));else _0x3e2651.errorMessage ? console.log("" + (_0x3e2651.errorMessage || "")) : console.log("" + _0xe03d8d);
        } else console.log("" + _0xe03d8d);
        break;
      case "draw":
        if (typeof _0x3e2651 == "object") {
          if (_0x3e2651.success && _0x3e2651.success === true && _0x3e2651.data.drawOk) console.log("抽中：" + _0x3e2651.data.name);else _0x3e2651.errorMessage ? console.log("" + (_0x3e2651.errorMessage || "")) : console.log("💨  空气");
        } else console.log("" + _0xe03d8d);
        break;
      case "followShop":
        if (typeof _0x3e2651 == "object") {
          if (_0x3e2651.result && _0x3e2651.result === true) console.log("" + _0x3e2651.data);else _0x3e2651.errorMessage ? console.log("" + (_0x3e2651.errorMessage || "")) : console.log(" " + _0xe03d8d);
        } else console.log("" + _0xe03d8d);
        break;
      case "activityContent":
        if (typeof _0x3e2651 == "object") {
          if (_0x3e2651.success && _0x3e2651.success === true) {
            $.actorUuid = _0x3e2651.data.uuid || "";
            $.turntableId = _0x3e2651.data.turntableId || "";
            $.leftTimes = _0x3e2651.data.leftTimes || 0;
            $.state = _0x3e2651.data.state || "";
            $.taskslist = _0x3e2651.data.tasks || [];
          } else {
            if (_0x3e2651.errorMessage) {
              if (_0x3e2651.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(_0x5bf11d + " " + (_0x3e2651.errorMessage || ""));
            } else console.log(_0x5bf11d + " " + _0xe03d8d);
          }
        } else console.log(_0x5bf11d + " " + _0xe03d8d);
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof _0x3e2651 == "object") {
          if (_0x3e2651.isOk) $.openStatus = _0x3e2651.openCard || false;else _0x3e2651.errorMessage || _0x3e2651.msg ? console.log(_0x5bf11d + " " + (_0x3e2651.errorMessage || _0x3e2651.msg || "")) : console.log(_0x5bf11d + " " + _0xe03d8d);
        } else console.log(_0x5bf11d + " " + _0xe03d8d);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(_0x5bf11d + "-> " + _0xe03d8d);
    }
    typeof _0x3e2651 == "object" && _0x3e2651.errorMessage && _0x3e2651.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (_0x728d12) {
    console.log(_0x728d12);
  }
}
function _0x4b5d83(_0x5993a1, _0x3f7c68, _0x65e143 = "POST") {
  let _0x48b0fa = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": _0x46f409,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return _0x5993a1.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1 && (_0x48b0fa.Referer = _0x3b0b9, _0x48b0fa.Cookie = "" + (_0x3a46e7 && _0x3a46e7 || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + _0x2dfb2c), {
    "url": _0x5993a1,
    "method": _0x65e143,
    "headers": _0x48b0fa,
    "body": _0x3f7c68,
    "timeout": 30000
  };
}
function _0x45f495() {
  return new Promise(_0x1b2b59 => {
    let _0x469708 = {
      "url": "https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2306100000982127",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x46f409,
        "Referer": _0x3b0b9,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x469708, async (_0x32adee, _0x272428, _0x16e625) => {
      try {
        if (_0x32adee) {
          if (_0x272428 && typeof _0x272428.statusCode != "undefined") {
            _0x272428.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(_0x32adee));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let _0x5e63bf = $.toObj(_0x16e625, _0x16e625);
          if (typeof _0x5e63bf == "object") {
            if (_0x5e63bf.result && _0x5e63bf.result === true) {
              $.endTime = _0x5e63bf.data.endTime || 0;
              $.startTimes = _0x5e63bf.data.startTime || Date.now();
            } else _0x5e63bf.errorMessage ? console.log("" + (_0x5e63bf.errorMessage || "")) : console.log("" + _0x16e625);
          } else {
            console.log("" + _0x16e625);
          }
        }
      } catch (_0x262bc8) {
        $.logErr(_0x262bc8, _0x272428);
      } finally {
        _0x1b2b59();
      }
    });
  });
}
function _0x10b67a() {
  return new Promise(_0x54dc4e => {
    let _0x23756f = {
      "url": "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x46f409,
        "Referer": _0x3b0b9,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x23756f, async (_0x4978eb, _0x22b0f9, _0x338a6a) => {
      try {
        if (_0x4978eb) {
          _0x22b0f9 && typeof _0x22b0f9.statusCode != "undefined" && _0x22b0f9.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(_0x4978eb));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let _0x40e6e3 = _0x338a6a.match(/(活动已经结束)/) && _0x338a6a.match(/(活动已经结束)/)[1] || "";
          _0x40e6e3 && ($.activityEnd = true, console.log("活动已结束"));
          _0x56f590(_0x22b0f9);
        }
      } catch (_0x50e6ff) {
        $.logErr(_0x50e6ff, _0x22b0f9);
      } finally {
        _0x54dc4e();
      }
    });
  });
}
function _0x56f590(_0x3f80a2) {
  if (_0x3f80a2) {
    if (_0x3f80a2.headers["set-cookie"]) {
      _0x46f409 = originCookie + ";";
      for (let _0x43173f of _0x3f80a2.headers["set-cookie"]) {
        _0x3cf32a[_0x43173f.split(";")[0].substr(0, _0x43173f.split(";")[0].indexOf("="))] = _0x43173f.split(";")[0].substr(_0x43173f.split(";")[0].indexOf("=") + 1);
      }
      for (const _0xbed527 of Object.keys(_0x3cf32a)) {
        _0x46f409 += _0xbed527 + "=" + _0x3cf32a[_0xbed527] + ";";
      }
      _0x2dfb2c = _0x46f409;
    }
  }
}
async function _0x4522b7() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + _0x74bd89(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0x74bd89(_0x91d637) {
  _0x91d637 = _0x91d637 || 32;
  let _0x531a5d = "abcdef0123456789",
    _0x4358d4 = _0x531a5d.length,
    _0x2b9c93 = "";
  for (i = 0; i < _0x91d637; i++) _0x2b9c93 += _0x531a5d.charAt(Math.floor(Math.random() * _0x4358d4));
  return _0x2b9c93;
}
async function _0x5a1570() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x29f183 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x48756b = "";
    if ($.shopactivityId) _0x48756b = ",\"activityId\":" + $.shopactivityId;
    const _0x1d5557 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x48756b + ",\"channel\":406}",
      _0x1cd058 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x1d5557)
      };
    for (var _0x1bfeb8 = "", _0x25a2fe = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", _0x3bfe58 = 0; _0x3bfe58 < 16; _0x3bfe58++) {
      var _0x3f2b09 = Math.round(Math.random() * (_0x25a2fe.length - 1));
      _0x1bfeb8 += _0x25a2fe.substring(_0x3f2b09, _0x3f2b09 + 1);
    }
    uuid = Buffer.from(_0x1bfeb8, "utf8").toString("base64");
    ep = encodeURIComponent(JSON.stringify({
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "ts": new Date().getTime(),
      "ridx": -1,
      "cipher": {
        "screen": "CJS0CseyCtK4",
        "osVersion": "CJGkEK==",
        "uuid": uuid
      },
      "ciphertype": 5,
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile"
    }));
    const _0x3d5b23 = await _0x345762("8adfb", _0x1cd058),
      _0x28b2bf = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x1d5557 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x3d5b23),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x46f409,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x28b2bf, async (_0x456ff3, _0x5795da, _0xa7a77a) => {
      try {
        if (_0x456ff3) _0x5795da && typeof _0x5795da.statusCode != "undefined" && _0x5795da.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          _0xa7a77a = _0xa7a77a && _0xa7a77a.match(/jsonp_.*?\((.*?)\);/) && _0xa7a77a.match(/jsonp_.*?\((.*?)\);/)[1] || _0xa7a77a;
          let _0x1c0af8 = $.toObj(_0xa7a77a, _0xa7a77a);
          if (_0x1c0af8 && typeof _0x1c0af8 == "object") {
            if (_0x1c0af8 && _0x1c0af8.success === true) {
              console.log(" >> " + _0x1c0af8.message);
              $.errorJoinShop = _0x1c0af8.message;
              if (_0x1c0af8.result && _0x1c0af8.result.giftInfo) for (let _0x3d637c of _0x1c0af8.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + _0x3d637c.discountString + _0x3d637c.prizeName + _0x3d637c.secondLineDesc);
              }
            } else {
              if (_0x1c0af8 && typeof _0x1c0af8 == "object" && _0x1c0af8.message) {
                $.errorJoinShop = _0x1c0af8.message;
                console.log("" + (_0x1c0af8.message || ""));
              } else {
                console.log(_0xa7a77a);
              }
            }
          } else console.log(_0xa7a77a);
        }
      } catch (_0x353d74) {
        $.logErr(_0x353d74, _0x5795da);
      } finally {
        _0x29f183();
      }
    });
  });
}
async function _0x1a59f3() {
  return new Promise(async _0x12f8b0 => {
    const _0x32cf27 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      _0x1421d7 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x32cf27)
      };
    await $.wait(1000);
    const _0x590ccd = await _0x345762("8adfb", _0x1421d7),
      _0x300890 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x32cf27 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x590ccd),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x46f409,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x300890, async (_0x3dacfa, _0x1ad25b, _0x1fb43e) => {
      try {
        if (_0x3dacfa) _0x1ad25b && typeof _0x1ad25b.statusCode != "undefined" && _0x1ad25b.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          _0x1fb43e = _0x1fb43e && _0x1fb43e.match(/jsonp_.*?\((.*?)\);/) && _0x1fb43e.match(/jsonp_.*?\((.*?)\);/)[1] || _0x1fb43e;
          let _0x112ba5 = $.toObj(_0x1fb43e, _0x1fb43e);
          _0x112ba5 && typeof _0x112ba5 == "object" ? _0x112ba5 && _0x112ba5.success == true && (console.log("去加入：" + (_0x112ba5.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = _0x112ba5.result.interestsRuleList && _0x112ba5.result.interestsRuleList[0] && _0x112ba5.result.interestsRuleList[0].interestsInfo && _0x112ba5.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x1fb43e);
        }
      } catch (_0xc5ef3e) {
        $.logErr(_0xc5ef3e, _0x1ad25b);
      } finally {
        _0x12f8b0();
      }
    });
  });
}
function _0x30799b(_0x4c159a) {
  return new Promise(_0x127fe5 => {
    const _0x42b35c = {
      "url": _0x4c159a + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x42b35c, async (_0x10fa41, _0x2aa05d, _0x538b89) => {
      try {
        if (_0x10fa41) $.log(_0x10fa41);else {
          if (_0x538b89) _0x538b89 = JSON.parse(_0x538b89);
        }
      } catch (_0x51467a) {
        $.logErr(_0x51467a, _0x2aa05d);
        _0x538b89 = null;
      } finally {
        _0x127fe5(_0x538b89);
      }
    });
  });
}
function _0x3cb0ff(_0x3366b2) {
  if (typeof _0x3366b2 == "string") {
    try {
      return JSON.parse(_0x3366b2);
    } catch (_0x699695) {
      return console.log(_0x699695), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}