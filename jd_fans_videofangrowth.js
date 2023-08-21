/*
粉丝福利videofangrowth

看到线板直接运行即可

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#粉丝福利红包fansvideo
1 1 1 1 * jd_fans_videofangrowth.js, tag=粉丝福利videofangrowth, enabled=true
 */

const Env=require('./utils/Env.js');
const $ = new Env('粉丝福利videofangrowth');
const _0x4c6d97 = $.isNode() ? require("./sendNotify") : "",
  _0x203bc0 = $.isNode() ? require("./jdCookie.js") : "";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let _0x1637bc = [],
  _0x2e00b4 = "";
if ($.isNode()) {
  Object.keys(_0x203bc0).forEach(_0x4f4f18 => {
    _0x1637bc.push(_0x203bc0[_0x4f4f18]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x1637bc = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x1cd87d($.getdata("CookiesJD") || "[]").map(_0x4acd67 => _0x4acd67.cookie)].filter(_0x12cb50 => !!_0x12cb50);
let _0x25879d = Date.now(),
  _0x41fbf8 = "";
!(async () => {
  if (!_0x1637bc[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：https://wqs.jd.com/sns/202108/03/videofangrowth/index.html");
  for (let _0x390e24 = 0; _0x390e24 < _0x1637bc.length; _0x390e24++) {
    if (_0x1637bc[_0x390e24]) {
      _0x2e00b4 = _0x1637bc[_0x390e24];
      $.UserName = decodeURIComponent(_0x2e00b4.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2e00b4.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x390e24 + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x4c6d97.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x5eaccc();
      await $.wait(2000);
    }
  }
  if (_0x41fbf8) {
    if ($.isNode()) await _0x4c6d97.sendNotify("" + $.name, "" + _0x41fbf8);
    $.msg($.name, "", _0x41fbf8);
  }
})().catch(_0xcaef44 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xcaef44 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x5eaccc() {
  await _0x55c5bc();
  await $.wait(500);
  await _0x56518b();
}
function _0x55c5bc() {
  return new Promise(async _0x162128 => {
    const _0x3e4af3 = {
      "url": "https://wq.jd.com/activet2/looktreasure/query_fans?_=" + _0x25879d + "&sceneval=2&g_login_type=1&callback=queryLibao&g_ty=ls&appCode=msc588d6d5",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": _0x2e00b4,
        "Host": "wq.jd.com",
        "Referer": "https://wq.jd.com/activet2/looktreasure/query_fans?_=" + _0x25879d + "&sceneval=2&g_login_type=1&callback=queryLibao&g_ty=ls&appCode=msc588d6d5",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
      }
    };
    $.get(_0x3e4af3, (_0x57622c, _0x317251, _0x77224) => {
      try {
        if (_0x57622c) console.log(_0x57622c);else {}
      } catch (_0x49ce9e) {
        $.logErr(_0x49ce9e, _0x317251);
      } finally {
        _0x162128(_0x77224 || {});
      }
    });
  });
}
function _0x56518b() {
  return new Promise(async _0x46bd76 => {
    const _0x5c6057 = {
      "url": "https://wq.jd.com/activet2/looktreasure/draw_fans?_=" + _0x25879d + "&sceneval=2&g_login_type=1&callback=openLibao&g_ty=ls&appCode=msc588d6d5",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": _0x2e00b4,
        "Host": "wq.jd.com",
        "Referer": "https://wq.jd.com/activet2/looktreasure/draw_fans?_=" + _0x25879d + "&sceneval=2&g_login_type=1&callback=openLibao&g_ty=ls&appCode=msc588d6d5",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
      }
    };
    $.get(_0x5c6057, (_0x476d5d, _0x1cf955, _0x42a079) => {
      try {
        if (_0x476d5d) console.log(_0x476d5d);else {
          let _0x312023 = _0x42a079?.["replace"](/[\n\r]/g, "")?.["match"](/openLibao\((\{.*?\})\);/);
          if (_0x312023) {
            let _0x1c78f9 = JSON.parse(_0x312023[1]);
            if (_0x1c78f9?.["ret"] == 0) {
              $.prize = _0x1c78f9?.["prize"] || [];
              $.prize[0]?.["sPrizeName"] ? console.log("宝，可能获得：" + $.prize[0]?.["sPrizeName"] + " " + $.prize[0]?.["sPrizeDesc"]) : console.log(_0x1c78f9?.["msg"]);
            } else _0x1c78f9?.["ret"] == 2 ? console.log(_0x1c78f9?.["msg"]) : console.log(_0x1c78f9?.["msg"]);
          } else console.log("获得数据获取失败");
        }
      } catch (_0x5f3b4a) {
        $.logErr(_0x5f3b4a, _0x1cf955);
      } finally {
        _0x46bd76(_0x42a079 || {});
      }
    });
  });
}
function _0x35c476(_0x5651c0) {
  try {
    if (typeof JSON.parse(_0x5651c0) == "object") {
      return true;
    }
  } catch (_0x554589) {
    return console.log(_0x554589), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function _0x1cd87d(_0x39a5b8) {
  if (typeof _0x39a5b8 == "string") try {
    return JSON.parse(_0x39a5b8);
  } catch (_0x162200) {
    return console.log(_0x162200), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}