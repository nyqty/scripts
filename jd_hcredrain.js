/*
远程获取，自行运行
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#会场红包雨
1 1 1 1 * jd_hcredrain.js, tag=会场红包雨, enabled=true
 */
const Env = require('./utils/Env.js');
const $ = new Env('会场红包雨');
const _0x58cf0a = $.isNode() ? require("./sendNotify") : "",
  _0x7a5e0f = $.isNode() ? require("./jdCookie.js") : "";
let _0x1fc43c = [],
  _0x40f758 = "";
if ($.isNode()) {
  Object.keys(_0x7a5e0f).forEach(_0x2cc7f0 => {
    _0x1fc43c.push(_0x7a5e0f[_0x2cc7f0]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x1fc43c = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3bc8aa($.getdata("CookiesJD") || "[]").map(_0x253579 => _0x253579.cookie)].filter(_0x15707a => !!_0x15707a);
!(async () => {
  if (!_0x1fc43c[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  let _0x385aa9 = ["http://code.kingran.ga/hcurl.json"];
  authorCodeList = await _0x46c543(_0x385aa9);
  if (authorCodeList.length <= 0) {
    console.log("\n暂无活动~\n");
    return;
  }
  console.log("请自行运行，频道会不定期更新");
  for (let _0x2ef2c0 = 0; _0x2ef2c0 < _0x1fc43c.length; _0x2ef2c0++) {
    if (_0x1fc43c[_0x2ef2c0]) {
      _0x40f758 = _0x1fc43c[_0x2ef2c0];
      $.UserName = decodeURIComponent(_0x40f758.match(/pt_pin=([^; ]+)(?=;?)/) && _0x40f758.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x2ef2c0 + 1;
      $.isLogin = true;
      $.nickName = "";
      UA = _0x3def0e();
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x58cf0a.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      hot = false;
      await _0x274ace();
      await $.wait(3000);
      !hot && (await _0x2e40df(), await $.wait(2000));
    }
  }
})().catch(_0x205423 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x205423 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x274ace() {
  return new Promise(async _0x283a43 => {
    $.body = authorCodeList;
    const _0x4edb89 = {
      "url": "https://api.m.jd.com/client.action",
      "body": "functionId=hby_lottery&appid=publicUseApi&body=" + JSON.stringify($.body) + "&client=wh5&clientVersion=1.0.0",
      "headers": {
        "Cookie": _0x40f758 + "",
        "origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "referer": "https://prodev.m.jd.com/mall/active/2sKEp9uxmhP4SjFWJpgrouwnrG11/index.html",
        "User-Agent": UA,
        "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8"
      }
    };
    $.post(_0x4edb89, async (_0x341b9f, _0x493ba8, _0x23de22) => {
      try {
        if (_0x341b9f) {
          console.log("" + JSON.stringify(_0x341b9f));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          _0x23de22 = JSON.parse(_0x23de22);
          if (_0x23de22.success == true) {
            if (_0x23de22.code == 0 && _0x23de22.data.bizCode == 0) {
              console.log("获得：" + _0x23de22.data.result.hbInfo.discount + " 红包");
              $.sceneId = _0x23de22.data.result.sceneId || "";
            } else {
              console.log(_0x23de22.data.bizMsg + " " + _0x23de22.data.bizCode);
              if (_0x23de22.data.bizCode == -1009 || _0x23de22.data.bizMsg == "活动太火爆啦，请稍后尝试~") {
                hot = true;
              }
            }
          } else {
            console.log(_0x23de22.msg);
            if (_0x23de22.msg == "请求失败，登录失败") {
              hot = true;
            }
          }
        }
      } catch (_0x306e65) {
        $.logErr(_0x306e65, _0x493ba8);
      } finally {
        _0x283a43(_0x23de22);
      }
    });
  });
}
async function _0x2e40df() {
  return new Promise(async _0x45debe => {
    $.body = {
      "sceneId": $.sceneId,
      "activityNo": "JhL2v9pkmFqI78PtwXxut"
    };
    const _0x320230 = {
      "url": "https://api.m.jd.com/client.action",
      "body": "functionId=hby_share&appid=publicUseApi&body=" + JSON.stringify($.body) + "&client=wh5&clientVersion=1.0.0",
      "headers": {
        "Cookie": _0x40f758,
        "origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "referer": "https://prodev.m.jd.com/mall/active/2sKEp9uxmhP4SjFWJpgrouwnrG11/index.html",
        "User-Agent": UA,
        "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8"
      }
    };
    $.post(_0x320230, async (_0x137096, _0x5a2ea4, _0x1da796) => {
      try {
        _0x137096 ? (console.log("" + JSON.stringify(_0x137096)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x1da796 = JSON.parse(_0x1da796), _0x1da796.success == true ? _0x1da796.code == 0 && _0x1da796.data.bizCode == 0 ? (console.log("分享成功，再开一次"), await $.wait(3000), await _0x274ace()) : console.log(_0x1da796.data.bizMsg + " " + _0x1da796.data.bizCode) : console.log(_0x1da796.msg));
      } catch (_0x340b48) {
        $.logErr(_0x340b48, _0x5a2ea4);
      } finally {
        _0x45debe(_0x1da796);
      }
    });
  });
}
function _0x3def0e() {
  getstr = function (_0x373c80) {
    let _0x4a512d = "",
      _0x4cc432 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let _0x4e1eb2 = 0; _0x4e1eb2 < _0x373c80; _0x4e1eb2++) {
      let _0x847b43 = Math.round(Math.random() * (_0x4cc432.length - 1));
      _0x4a512d += _0x4cc432.substring(_0x847b43, _0x847b43 + 1);
    }
    return _0x4a512d;
  };
  let _0x5f11f3 = Buffer.from(getstr(16), "utf8").toString("base64"),
    _0x383dde = getstr(48);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": Date.now(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": _0x5f11f3,
      "od": _0x383dde,
      "ov": "Ctq=",
      "ud": _0x5f11f3
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.2.0;;;appBuild/98413;ef/1;ep/" + ep + ";Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046033 Mobile Safari/537.36";
}
function _0x46c543(_0x18da02) {
  return new Promise(_0x18148b => {
    const _0x2df3bc = {
      "url": _0x18da02 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x2df3bc, async (_0x4472b7, _0x2d7355, _0xea78bd) => {
      try {
        if (_0x4472b7) $.getAuthorCodeListerr = false;else {
          if (_0xea78bd) _0xea78bd = JSON.parse(_0xea78bd);
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x3278a8) {
        $.logErr(_0x3278a8, _0x2d7355);
        _0xea78bd = null;
      } finally {
        _0x18148b(_0xea78bd);
      }
    });
  });
}
function _0x2dda52(_0x23908a, _0x153322) {
  return Math.floor(Math.random() * (_0x153322 - _0x23908a)) + _0x23908a;
}
function _0x343c00(_0x23ddd8) {
  try {
    if (typeof JSON.parse(_0x23ddd8) == "object") return true;
  } catch (_0x558726) {
    return console.log(_0x558726), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function _0x3bc8aa(_0x24f3e8) {
  if (typeof _0x24f3e8 == "string") {
    try {
      return JSON.parse(_0x24f3e8);
    } catch (_0x198ee0) {
      return console.log(_0x198ee0), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}