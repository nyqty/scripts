/*
[task_local]
#京东抽奖机通用
11 11 11 11 * jd_lottery.js, tag=京东抽奖机通用, enabled=true

//变量：export JD_Lottery="id" 多个使用  @  连接
 */
const Env=require('./utils/Env.js');
const $ = new Env('京东抽奖机通用-KR');
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let lottery = "";
let cookiesArr = [],
  cookie = "",
  message;
if (process.env.JD_Lottery && process.env.JD_Lottery != "") {
  lottery = process.env.JD_Lottery.split("@");
}
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xe045x32 => {
    cookiesArr.push(jdCookieNode[_0xe045x32]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0xe045x34 => {
    return _0xe045x34.cookie;
  })].filter(_0xe045x33 => {
    return !!_0xe045x33;
  });
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  if (!lottery) {
    console.log("\n衰仔你好，衰仔你好！！！\n你不填写变量 JD_Lottery，\n是不是玩我呢！\n我很生气，拒接执行o(╥﹏╥)o");
    return;
  }
  for (let _0xe045x4a = 0; _0xe045x4a < cookiesArr.length; _0xe045x4a++) {
    if (cookiesArr[_0xe045x4a]) {
      cookie = cookiesArr[_0xe045x4a];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xe045x4a + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      UA = await getUa();
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      for (let _0xe045x4b = 0; _0xe045x4b < lottery.length; _0xe045x4b++) {
        $.configCode = lottery[_0xe045x4b];
        console.log("活动ID: " + $.configCode);
        await jdmodule();
      }
    }
  }
})().catch(_0xe045x35 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xe045x35 + "!", "");
}).finally(() => {
  $.done();
});
function showMsg() {
  return new Promise(_0xe045x50 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    _0xe045x50();
  });
}
async function jdmodule() {
  let _0xe045x5c = 0;
  console.log("\n开始做任务：");
  do {
    await getinfo();
    $.hasFinish = true;
    await run();
    _0xe045x5c++;
  } while (!$.hasFinish && _0xe045x5c < 10);
  await getinfo();
  var _0xe045x5d = 1;
  if ($.chanceLeft >= 1) {
    console.log("\n开始抽奖");
  } else {
    console.log("\n没有抽奖机会了");
  }
  for (let _0xe045x5f = 0; _0xe045x5f < $.chanceLeft; _0xe045x5f++) {
    await join(_0xe045x5d);
    await $.wait(1500);
    _0xe045x5d++;
  }
}
async function run() {
  try {
    for (let _0xe045x83 of $.taskinfo) {
      if (_0xe045x83.hasFinish === true) {
        continue;
      }
      if (!_0xe045x83.taskItem) {
        continue;
      }
      if (_0xe045x83.taskName == "每日签到") {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      if (_0xe045x83.taskType == 3) {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await getinfo2(_0xe045x83.taskItem.itemLink);
        await $.wait(1000 * _0xe045x83.viewTime);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      if (_0xe045x83.taskType == 4) {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      if (_0xe045x83.taskType == 2) {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      if (_0xe045x83.taskType == 17) {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      $.hasFinish = false;
    }
  } catch (_0x2bf360) {
    console.log(_0x2bf360);
  }
}
function getinfo() {
  body = {
    "configCode": $.configCode,
    "unionCardCode": ""
  };
  return new Promise(_0xe045x96 => {
    $.get({
      "url": "https://api.m.jd.com/api?client=iOS&clientVersion=11.1.4&appid=jdchoujiang_h5&t=" + new Date().getTime() + "&functionId=lotteryDrawGet&body=" + encodeURIComponent(JSON.stringify(body)),
      "headers": {
        "accept": "*/*",
        "content-type": "application/json",
        "Referer": "https://prodev.m.jd.com/mall/active/2Rkjx8aT5eKaQnUzn8dwcR6jNanj/index.html",
        "origin": "https://prodev.m.jd.com",
        "User-Agent": UA,
        "accept-language": "zh-Hans-CN;q=1",
        "cookie": cookie
      }
    }, async (_0xe045x9d, _0xe045x9e, _0xe045x9f) => {
      try {
        if (_0xe045x9d) {
          console.log("" + JSON.stringify(_0xe045x9d));
          console.log($.name + " getinfo请求失败，请检查网路重试");
        } else {
          _0xe045x9f = JSON.parse(_0xe045x9f);
          $.chanceLeft = _0xe045x9f.data.chanceLeft;
          if (_0xe045x9f.success == true) {
            $.taskinfo = _0xe045x9f.data.taskConfig;
          } else {
            console.log(_0xe045x9f.errorMessage);
          }
        }
      } catch (_0x134941) {
        $.logErr(_0x134941, _0xe045x9e);
      } finally {
        _0xe045x96();
      }
    });
  });
}
function join(_0xe045xa8) {
  body = {
    "configCode": $.configCode,
    "fp": randomWord(false, 32, 32),
    "eid": "RLSR65QBDK34CPNUE7YL77XYP62O45KK5ORAKCVN4WAHA42KQQUU5ZHTP2S4INMUMXPZZC7IAYFOHNV7COG44ZJNQA"
  };
  return new Promise(async _0xe045xb6 => {
    $.get({
      "url": "https://api.m.jd.com/api?client=iOS&clientVersion=11.1.4&appid=jdchoujiang_h5&t=" + new Date().getTime() + "&functionId=lotteryDrawJoin&body=" + encodeURIComponent(JSON.stringify(body)),
      "headers": {
        "accept": "*/*",
        "content-type": "application/json",
        "Referer": "https://prodev.m.jd.com/mall/active/2Rkjx8aT5eKaQnUzn8dwcR6jNanj/index.html",
        "origin": "https://prodev.m.jd.com",
        "User-Agent": UA,
        "accept-language": "zh-Hans-CN;q=1",
        "cookie": cookie
      }
    }, async (_0xe045xb7, _0xe045xb8, _0xe045xb9) => {
      try {
        if (_0xe045xb7) {
          console.log("" + JSON.stringify(_0xe045xb7));
          console.log("join请求失败，请检查网路重试");
        } else {
          _0xe045xb9 = JSON.parse(_0xe045xb9);
          if (_0xe045xb9.success == true) {
            if (_0xe045xb9.data.rewardName == null) {
              console.log("第" + _0xe045xa8 + "次获得: 空气");
            } else {
              console.log("第" + _0xe045xa8 + "次获得: " + _0xe045xb9.data.rewardName);
            }
          } else {
            console.log(_0xe045xb9.errorMessage);
          }
        }
      } catch (_0x52a380) {
        $.logErr(_0x52a380, _0xe045xb8);
      } finally {
        _0xe045xb6();
      }
    });
  });
}
function lotteryDrawDoTask(_0xe045xbe, _0xe045xbf, _0xe045xc0) {
  return new Promise(_0xe045xc6 => {
    let _0xe045xcc = taskPostUrl("lotteryDrawDoTask", "{\"configCode\":\"" + $.configCode + "\",\"taskType\":" + _0xe045xbe + ",\"itemId\":\"" + _0xe045xbf + "\",\"taskId\":" + _0xe045xc0 + ",\"babelChannel\":\"\"}");
    $.post(_0xe045xcc, async (_0xe045xcd, _0xe045xce, _0xe045xcf) => {
      try {
        if (_0xe045xcd) {
          console.log("" + JSON.stringify(_0xe045xcd));
          console.log("lotteryDrawDoTask 请求失败，请检查网路重试");
        } else {
          _0xe045xcf = JSON.parse(_0xe045xcf);
          if (_0xe045xcf.success == true) {} else {
            console.log(_0xe045xcf.errorMessage);
          }
        }
      } catch (_0x47a80b) {
        $.logErr(_0x47a80b, _0xe045xce);
      } finally {
        _0xe045xc6();
      }
    });
  });
}
function lotteryDrawGetReward(_0xe045xd2, _0xe045xd3, _0xe045xd4) {
  return new Promise(_0xe045xe0 => {
    let _0xe045xe2 = taskPostUrl("lotteryDrawGetReward", "{\"configCode\":\"" + $.configCode + "\",\"taskType\":" + _0xe045xd2 + ",\"itemId\":\"" + _0xe045xd3 + "\",\"taskId\":" + _0xe045xd4 + "}");
    $.post(_0xe045xe2, async (_0xe045xe3, _0xe045xe4, _0xe045xe5) => {
      try {
        if (_0xe045xe3) {
          console.log("" + JSON.stringify(_0xe045xe3));
          console.log("lotteryDrawGetReward 请求失败，请检查网路重试");
        } else {
          _0xe045xe5 = JSON.parse(_0xe045xe5);
          if (_0xe045xe5.success == true) {
            console.log("任务奖励领取成功");
          } else {
            console.log(_0xe045xe5.errorMessage);
          }
        }
      } catch (_0x24d1e7) {
        $.logErr(_0x24d1e7, _0xe045xe4);
      } finally {
        _0xe045xe0();
      }
    });
  });
}
function getinfo2(_0xe045xea) {
  return new Promise(_0xe045xec => {
    $.get({
      "url": _0xe045xea,
      "headers": {
        "Host": "pro.m.jd.com",
        "accept": "*/*",
        "content-type": "application/x-www-form-urlencoded",
        "referer": "",
        "User-Agent": UA,
        "accept-language": "zh-Hans-CN;q=1",
        "cookie": cookie
      }
    }, (_0xe045xf2, _0xe045xf3, _0xe045xf4) => {
      try {
        if (_0xe045xf2) {
          console.log("" + JSON.stringify(_0xe045xf2));
          console.log("getinfo2 API请求失败，请检查网路重试");
        }
      } catch (_0x3c2922) {
        $.logErr(_0x3c2922, _0xe045xf3);
      } finally {
        _0xe045xec(_0xe045xf4);
      }
    });
  });
}
function taskPostUrl(_0xe045xf6, _0xe045xf7) {
  return {
    "url": "https://api.m.jd.com/api?client=iOS&clientVersion=11.1.4&appid=jdchoujiang_h5&t=" + new Date().getTime() + "&functionId=" + _0xe045xf6 + "&body=" + encodeURIComponent(_0xe045xf7),
    "headers": {
      "accept": "*/*",
      "content-type": "application/json",
      "Referer": "https://prodev.m.jd.com/mall/active/2Rkjx8aT5eKaQnUzn8dwcR6jNanj/index.html",
      "origin": "https://prodev.m.jd.com",
      "User-Agent": UA,
      "accept-language": "zh-Hans-CN;q=1",
      "cookie": cookie
    }
  };
}
function safeGet(_0xe045xfc) {
  try {
    if (typeof JSON.parse(_0xe045xfc) == "object") {
      return true;
    }
  } catch (_0x1443f2) {
    console.log(_0x1443f2);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function jsonParse(_0xe045x101) {
  if (typeof _0xe045x101 == "string") {
    try {
      return JSON.parse(_0xe045x101);
    } catch (_0x41f67a) {
      console.log(_0x41f67a);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function getUa() {
  for (var _0xe045x113 = "", _0xe045x114 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", _0xe045x115 = 0; _0xe045x115 < 16; _0xe045x115++) {
    var _0xe045x116 = Math.round(Math.random() * (_0xe045x114.length - 1));
    _0xe045x113 += _0xe045x114.substring(_0xe045x116, _0xe045x116 + 1);
  }
  uuid = Buffer.from(_0xe045x113, "utf8").toString("base64");
  ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJK=",
      "ad": uuid,
      "od": "CNKmCNKmCNKjCNKmCM0mCNKmBJKmCNKjCNKmCNKmCNKmCNKm",
      "ov": "Ctu=",
      "ud": uuid
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jd.jdlite"
  }));
  return "jdltapp;android;3.8.16;;;appBuild/2314;ef/1;ep/" + ep + ";Mozilla/5.0 (Linux; Android 10; WLZ-AN01 Build/HUAWEIWLZ-AN01; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045837 Mobile Safari/537.36";
}
function randomString(_0xe045x118) {
  _0xe045x118 = _0xe045x118 || 32;
  let _0xe045x11e = "abcdef0123456789",
    _0xe045x11f = _0xe045x11e.length,
    _0xe045x120 = "";
  for (i = 0; i < _0xe045x118; i++) {
    _0xe045x120 += _0xe045x11e.charAt(Math.floor(Math.random() * _0xe045x11f));
  }
  return _0xe045x120;
}
function randomWord(_0xe045x122, _0xe045x123, _0xe045x124) {
  var _0xe045x12e = "",
    _0xe045x12f = _0xe045x123,
    _0xe045x130 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  if (_0xe045x122) {
    _0xe045x12f = Math.round(Math.random() * (_0xe045x124 - _0xe045x123)) + _0xe045x123;
  }
  for (var _0xe045x131 = 0; _0xe045x131 < _0xe045x12f; _0xe045x131++) {
    pos = Math.round(Math.random() * (_0xe045x130.length - 1));
    _0xe045x12e += _0xe045x130[pos];
  }
  return _0xe045x12e;
}