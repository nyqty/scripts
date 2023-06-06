/*
6.1-6.30 QQ星成长黄金期，集成长值赢大奖

任务本,邀请不清楚，抽奖概率豆子

————————————————
入口：[ 6.1-6.30 QQ星成长黄金期，集成长值赢大奖 ]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#6.1-6.30 QQ星成长黄金期，集成长值赢大奖
11 11 11 11 * jd_qqx.js, tag=6.1-6.30 QQ星成长黄金期，集成长值赢大奖, enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('6.1-6.30 QQ星成长黄金期，集成长值赢大奖');
const _0x548526 = $.isNode() ? require("./jdCookie.js") : "",
  _0x3bbed5 = $.isNode() ? require("./sendNotify") : "",
  _0x37b9aa = require("./function/krgetToken");
let _0x22e827 = "https://lzkjdz-isv.isvjcloud.com",
  _0xf94eed = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "10" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "10",
  _0x3abcfa = {},
  _0x1d8835 = [],
  _0x1c9143 = "";
if ($.isNode()) {
  Object.keys(_0x548526).forEach(_0xa4e4a6 => {
    _0x1d8835.push(_0x548526[_0xa4e4a6]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x1d8835 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x20aba4($.getdata("CookiesJD") || "[]").map(_0x110e00 => _0x110e00.cookie)].filter(_0x252770 => !!_0x252770);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let _0x1065cb = "",
  _0x40f1ea = "",
  _0x3a25d1 = "https://lzkjdz-isv.isvjcloud.com/m/1000003570/99/2306100000357001/";
!(async () => {
  if (!_0x1d8835[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "2306100000357001";
  authorCodeList = [];
  if (authorCodeList === "404: Not Found") {
    authorCodeList = [""];
  }
  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log("入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000003570/99/2306100000357001/?helpUuid=" + $.shareUuid);
  for (let _0xb4d6fd = 0; _0xb4d6fd < _0x1d8835.length; _0xb4d6fd++) {
    _0x1c9143 = _0x1d8835[_0xb4d6fd];
    originCookie = _0x1d8835[_0xb4d6fd];
    if (_0x1c9143) {
      $.UserName = decodeURIComponent(_0x1c9143.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1c9143.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xb4d6fd + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await _0x2edfb7();
      await _0x1db805();
      await $.wait(3000);
      if (_0xb4d6fd == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
      if ($.hasEnd) break;
    }
  }
  if ($.outFlag) {
    let _0x3c4f4e = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x3c4f4e);
    if ($.isNode()) await _0x3bbed5.sendNotify("" + $.name, "" + _0x3c4f4e);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(_0x530e02 => $.logErr(_0x530e02)).finally(() => $.done());
async function _0x1db805() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    _0x1065cb = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await _0x37b9aa(_0x1c9143, _0x22e827);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await _0x5b83b7();
    if (_0x40f1ea == "") {
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
    await _0x1e0e3f("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await _0x1e0e3f("accessLogWithAD");
    await _0x1e0e3f("getOpenCardStatusWithOutSelf");
    await _0x1e0e3f("activityContent");
    if ($.openStatus == false) {
      console.log("去开通店铺会员");
      $.joinVenderId = 1000003570;
      await _0x5eb76a();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await _0x5eb76a());
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 无法开卡,跳过运行");
        return;
      }
      await _0x1e0e3f("getOpenCardStatusWithOutSelf");
      await _0x1e0e3f("activityContent");
    }
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    for (let _0x8f423c = 0; _0x8f423c < $.taskslist.length; _0x8f423c++) {
      $.taskId = $.taskslist[_0x8f423c].taskId;
      $.taskType = $.taskslist[_0x8f423c].taskType;
      if ($.taskslist[_0x8f423c].taskFinishCnt === 0) switch ($.taskType) {
        case 1:
          console.log("去完成" + $.taskslist[_0x8f423c].taskType + "" + $.taskslist[_0x8f423c].taskId);
          await _0x1e0e3f("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 2:
          console.log("去完成" + $.taskslist[_0x8f423c].taskType + "" + $.taskslist[_0x8f423c].taskId);
          await _0x1e0e3f("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 4:
          console.log("去完成" + $.taskslist[_0x8f423c].taskType + "" + $.taskslist[_0x8f423c].taskId);
          await _0x1e0e3f("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 5:
          console.log("去完成" + $.taskslist[_0x8f423c].taskType + "" + $.taskslist[_0x8f423c].taskId);
          await _0x1e0e3f("task");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          break;
        case 6:
        case 3:
          break;
        default:
          console.log("错误" + $.taskType);
      }
    }
    await _0x1e0e3f("activityContent");
    if (_0xf94eed + "" !== "0") {
      $.runFalag = true;
      let _0x5d0b6b = parseInt($.score / 400);
      _0xf94eed = parseInt(_0xf94eed, 10);
      if (_0x5d0b6b > _0xf94eed) _0x5d0b6b = _0xf94eed;
      console.log("已设置抽奖次数为" + _0xf94eed + "次，当前有" + _0x5d0b6b + "次抽奖机会");
      for (m = 1; _0x5d0b6b--; m++) {
        console.log("进行第" + m + "次抽奖");
        await _0x1e0e3f("draw");
        if ($.runFalag == false) break;
        if (Number(_0x5d0b6b) <= 0) break;
        if (m >= 5) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    $.index == 1 && ($.shareUuid = $.actorUuid);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (_0x3ece95) {
    console.log(_0x3ece95);
  }
}
async function _0x1e0e3f(_0x772711) {
  if ($.outFlag) return;
  let _0x411a1c = "https://lzkjdz-isv.isvjcloud.com",
    _0x27b39f = "",
    _0x3bfe1d = "POST";
  switch (_0x772711) {
    case "getMyPing":
      url = _0x411a1c + "/customer/getMyPing";
      _0x27b39f = "token=" + $.Token + "&fromType=APP&userId=1000003570&pin=";
      break;
    case "getSimpleActInfoVo":
      url = _0x411a1c + "/common/brand/getSimpleActInfoVo";
      _0x27b39f = "activityId=" + $.activityId;
      break;
    case "accessLogWithAD":
      url = _0x411a1c + "/common/accessLogWithAD";
      let _0x988fa2 = "https://lzkjdz-isv.isvjcloud.com/m/1000003570/99/" + $.activityId + "/?helpUuid=" + $.shareUuid;
      _0x27b39f = "venderId=1000003570&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x988fa2);
      break;
    case "getOpenCardStatusWithOutSelf":
      url = _0x411a1c + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      _0x27b39f = "venderId=1000003570&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = _0x411a1c + "/a2/task/activityContent";
      _0x27b39f = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&inviterUuid=" + $.shareUuid;
      break;
    case "task":
      url = _0x411a1c + "/a2/task/startTask";
      _0x27b39f = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&taskId=" + $.taskId;
      break;
    case "draw":
      url = _0x411a1c + "/a2/task/startDraw";
      _0x27b39f = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + _0x772711);
  }
  let _0x2edb0b = _0x1891c4(url, _0x27b39f, _0x3bfe1d);
  return new Promise(async _0x30018f => {
    $.post(_0x2edb0b, (_0x440c69, _0x299e55, _0x5bfd9e) => {
      try {
        _0x518ecb(_0x299e55);
        _0x440c69 ? (_0x299e55 && typeof _0x299e55.statusCode != "undefined" && _0x299e55.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(_0x440c69, _0x440c69)), console.log(_0x772711 + " API请求失败，请检查网路重试")) : _0x514f63(_0x772711, _0x5bfd9e);
      } catch (_0x19978a) {
        console.log(_0x19978a, _0x299e55);
      } finally {
        _0x30018f();
      }
    });
  });
}
async function _0x514f63(_0xef7d0d, _0x341c06) {
  let _0xb26b58 = "";
  try {
    (_0xef7d0d != "accessLogWithAD" || _0xef7d0d != "drawContent") && _0x341c06 && (_0xb26b58 = JSON.parse(_0x341c06));
  } catch (_0x4d8db0) {
    console.log(_0xef7d0d + " 执行任务异常");
    console.log(_0x341c06);
    $.runFalag = false;
  }
  try {
    switch (_0xef7d0d) {
      case "getMyPing":
        if (typeof _0xb26b58 == "object") {
          if (_0xb26b58.result && _0xb26b58.result === true) {
            if (_0xb26b58.data && typeof _0xb26b58.data.secretPin != "undefined") $.Pin = _0xb26b58.data.secretPin;
            if (_0xb26b58.data && typeof _0xb26b58.data.nickname != "undefined") $.nickname = _0xb26b58.data.nickname;
          } else _0xb26b58.errorMessage ? console.log(_0xef7d0d + " " + (_0xb26b58.errorMessage || "")) : console.log(_0xef7d0d + " " + _0x341c06);
        } else console.log(_0xef7d0d + " " + _0x341c06);
        break;
      case "task":
        if (typeof _0xb26b58 == "object") {
          if (_0xb26b58.result && _0xb26b58.result === true) console.log("任务完成，总积分：" + _0xb26b58.data);else _0xb26b58.errorMessage ? console.log("" + (_0xb26b58.errorMessage || "")) : console.log("" + _0x341c06);
        } else console.log("" + _0x341c06);
        break;
      case "draw":
        if (typeof _0xb26b58 == "object") {
          if (_0xb26b58.result && _0xb26b58.result === true && _0xb26b58.data.drawOk) console.log("抽中：" + _0xb26b58.data.name);else {
            if (_0xb26b58.errorMessage) {
              console.log("" + (_0xb26b58.errorMessage || ""));
            } else console.log("💨  空气");
          }
        } else console.log("" + _0x341c06);
        break;
      case "activityContent":
        if (typeof _0xb26b58 == "object") {
          if (_0xb26b58.result && _0xb26b58.result === true) {
            $.actorUuid = _0xb26b58.data.customerId || "";
            $.turntableId = _0xb26b58.data.turntableId || "";
            $.score = _0xb26b58.data.score || 0;
            $.helpStatus = _0xb26b58.data.helpStatus || 0;
            $.openStatus = _0xb26b58.data.openStatus || 0;
            $.assistCount = _0xb26b58.data.assistCount || 0;
            $.state = _0xb26b58.data.state || "";
            $.taskslist = _0xb26b58.data.giftVOS || [];
          } else {
            if (_0xb26b58.errorMessage) {
              if (_0xb26b58.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(_0xef7d0d + " " + (_0xb26b58.errorMessage || ""));
            } else console.log(_0xef7d0d + " " + _0x341c06);
          }
        } else console.log(_0xef7d0d + " " + _0x341c06);
        break;
      case "getOpenCardStatusWithOutSelf":
        if (typeof _0xb26b58 == "object") {
          if (_0xb26b58.isOk) $.openStatus = _0xb26b58.openCard || false;else _0xb26b58.errorMessage || _0xb26b58.msg ? console.log(_0xef7d0d + " " + (_0xb26b58.errorMessage || _0xb26b58.msg || "")) : console.log(_0xef7d0d + " " + _0x341c06);
        } else console.log(_0xef7d0d + " " + _0x341c06);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(_0xef7d0d + "-> " + _0x341c06);
    }
    if (typeof _0xb26b58 == "object") {
      if (_0xb26b58.errorMessage) {
        if (_0xb26b58.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (_0x392b91) {
    console.log(_0x392b91);
  }
}
function _0x1891c4(_0x18d94b, _0x1564b6, _0x526242 = "POST") {
  let _0xb7bd4d = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": _0x1c9143,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return _0x18d94b.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1 && (_0xb7bd4d.Referer = _0x3a25d1, _0xb7bd4d.Cookie = "" + (_0x1065cb && _0x1065cb || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + _0x40f1ea), {
    "url": _0x18d94b,
    "method": _0x526242,
    "headers": _0xb7bd4d,
    "body": _0x1564b6,
    "timeout": 30000
  };
}
function _0x5383b3() {
  return new Promise(_0x4665cb => {
    let _0x7695f8 = {
      "url": "https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2306100000357001",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x1c9143,
        "Referer": _0x3a25d1,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x7695f8, async (_0x42bceb, _0x3d590d, _0x82d977) => {
      try {
        if (_0x42bceb) {
          _0x3d590d && typeof _0x3d590d.statusCode != "undefined" && _0x3d590d.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(_0x42bceb));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let _0x59addb = $.toObj(_0x82d977, _0x82d977);
          if (typeof _0x59addb == "object") {
            if (_0x59addb.result && _0x59addb.result === true) {
              $.endTime = _0x59addb.data.endTime || 0;
              $.startTimes = _0x59addb.data.startTime || Date.now();
            } else {
              if (_0x59addb.errorMessage) console.log("" + (_0x59addb.errorMessage || ""));else {
                console.log("" + _0x82d977);
              }
            }
          } else console.log("" + _0x82d977);
        }
      } catch (_0x5b1077) {
        $.logErr(_0x5b1077, _0x3d590d);
      } finally {
        _0x4665cb();
      }
    });
  });
}
function _0x5b83b7() {
  return new Promise(_0x2e62c5 => {
    let _0x251cfd = {
      "url": "https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x1c9143,
        "Referer": _0x3a25d1,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x251cfd, async (_0x3d73db, _0x4a044f, _0x59de69) => {
      try {
        if (_0x3d73db) {
          _0x4a044f && typeof _0x4a044f.statusCode != "undefined" && _0x4a044f.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(_0x3d73db));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let _0x44ed06 = _0x59de69.match(/(活动已经结束)/) && _0x59de69.match(/(活动已经结束)/)[1] || "";
          _0x44ed06 && ($.activityEnd = true, console.log("活动已结束"));
          _0x518ecb(_0x4a044f);
        }
      } catch (_0x5ee90a) {
        $.logErr(_0x5ee90a, _0x4a044f);
      } finally {
        _0x2e62c5();
      }
    });
  });
}
function _0x518ecb(_0x178751) {
  if (_0x178751) {
    if (_0x178751.headers["set-cookie"]) {
      _0x1c9143 = originCookie + ";";
      for (let _0x4810bc of _0x178751.headers["set-cookie"]) {
        _0x3abcfa[_0x4810bc.split(";")[0].substr(0, _0x4810bc.split(";")[0].indexOf("="))] = _0x4810bc.split(";")[0].substr(_0x4810bc.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x124f6f of Object.keys(_0x3abcfa)) {
        _0x1c9143 += _0x124f6f + "=" + _0x3abcfa[_0x124f6f] + ";";
      }
      _0x40f1ea = _0x1c9143;
    }
  }
}
async function _0x2edfb7() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + _0x36e12c(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0x36e12c(_0x2c651c) {
  _0x2c651c = _0x2c651c || 32;
  let _0x439ea3 = "abcdef0123456789",
    _0x408f86 = _0x439ea3.length,
    _0x4da84f = "";
  for (i = 0; i < _0x2c651c; i++) _0x4da84f += _0x439ea3.charAt(Math.floor(Math.random() * _0x408f86));
  return _0x4da84f;
}
async function _0x5eb76a() {
  return new Promise(async _0x4fdea4 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x46fc9f = "";
    if ($.shopactivityId) _0x46fc9f = ",\"activityId\":" + $.shopactivityId;
    const _0x3da7ed = "{\"venderId\":\"1000003570\",\"shopId\":\"1000003570\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x46fc9f + ",\"channel\":406}",
      _0x2a837c = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x3da7ed)
      },
      _0x3f3c26 = await _0x4a0ba1("8adfb", _0x2a837c),
      _0x1f0bb5 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x3da7ed + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x3f3c26),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0x1c9143,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x1f0bb5, async (_0x29d69f, _0x589fb1, _0x97b243) => {
      try {
        _0x97b243 = _0x97b243 && _0x97b243.match(/jsonp_.*?\((.*?)\);/) && _0x97b243.match(/jsonp_.*?\((.*?)\);/)[1] || _0x97b243;
        let _0x2eca76 = $.toObj(_0x97b243, _0x97b243);
        if (_0x2eca76 && typeof _0x2eca76 == "object") {
          if (_0x2eca76 && _0x2eca76.success === true) {
            console.log(_0x2eca76.message);
            $.errorJoinShop = _0x2eca76.message;
            if (_0x2eca76.result && _0x2eca76.result.giftInfo) {
              for (let _0x931da5 of _0x2eca76.result.giftInfo.giftList) {
                console.log("入会获得:" + _0x931da5.discountString + _0x931da5.prizeName + _0x931da5.secondLineDesc);
              }
            }
          } else _0x2eca76 && typeof _0x2eca76 == "object" && _0x2eca76.message ? ($.errorJoinShop = _0x2eca76.message, console.log("" + (_0x2eca76.message || ""))) : console.log(_0x97b243);
        } else console.log(_0x97b243);
      } catch (_0x597e4f) {
        $.logErr(_0x597e4f, _0x589fb1);
      } finally {
        _0x4fdea4();
      }
    });
  });
}
function _0x4a0ba1(_0x1ff563, _0x27b46a) {
  return new Promise(async _0x1d73c9 => {
    let _0x2f58b7 = {
      "url": "http://api.kingran.cf/h5st",
      "body": "businessId=" + _0x1ff563 + "&req=" + encodeURIComponent(JSON.stringify(_0x27b46a)),
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "timeout": 30 * 1000
    };
    $.post(_0x2f58b7, (_0x57e6e2, _0x556f22, _0x58d602) => {
      try {
        if (_0x57e6e2) {
          console.log(JSON.stringify(_0x57e6e2));
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {}
      } catch (_0x488ba7) {
        $.logErr(_0x488ba7, _0x556f22);
      } finally {
        _0x1d73c9(_0x58d602);
      }
    });
  });
}
function _0x51b324(_0x404b97) {
  return new Promise(_0x5597e0 => {
    const _0xf7df12 = {
      "url": _0x404b97 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0xf7df12, async (_0xc51cd8, _0x1d1f29, _0x52d660) => {
      try {
        if (_0xc51cd8) $.log(_0xc51cd8);else {
          if (_0x52d660) _0x52d660 = JSON.parse(_0x52d660);
        }
      } catch (_0x30f75f) {
        $.logErr(_0x30f75f, _0x1d1f29);
        _0x52d660 = null;
      } finally {
        _0x5597e0(_0x52d660);
      }
    });
  });
}
function _0x20aba4(_0x1e2c06) {
  if (typeof _0x1e2c06 == "string") try {
    return JSON.parse(_0x1e2c06);
  } catch (_0xaf03ad) {
    return console.log(_0xaf03ad), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}