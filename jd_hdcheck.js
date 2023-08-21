/*
互动消息检测
仅检测，有豆到APP-我的-消息-互动消息去完成任务
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_hdcheck.js
updatetime:22023/08/14 屏蔽种豆和签到消息
 */

const Env=require('./utils/Env.js');
const $ = new Env('互动消息检查');
const _0x5cd985 = $.isNode() ? require("./sendNotify") : "",
  _0x5559ed = $.isNode() ? require("./jdCookie.js") : "",
  _0x1aff54 = require("./USER_AGENTS"),
  _0x4970a2 = require("crypto-js");
let _0x1aeea2 = [],
  _0x1f2a6a = "",
  _0x1cd371 = "";
if ($.isNode()) {
  Object.keys(_0x5559ed).forEach(_0x47387a => {
    _0x1aeea2.push(_0x5559ed[_0x47387a]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x1aeea2 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4f67c2($.getdata("CookiesJD") || "[]").map(_0x543a97 => _0x543a97.cookie)].filter(_0x4e508e => !!_0x4e508e);
}
!(async () => {
  if (!_0x1aeea2[0]) {
    const _0x4c824f = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x4c824f);
    return;
  }
  $.log("仅检测，有豆的话，去入口：APP-我的-消息-互动消息，做任务领取！\n");
  for (let _0x5a0b2a = 0; _0x5a0b2a < _0x1aeea2.length; _0x5a0b2a++) {
    if (_0x1aeea2[_0x5a0b2a]) {
      _0x1f2a6a = _0x1aeea2[_0x5a0b2a];
      $.UserName = decodeURIComponent(_0x1f2a6a.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1f2a6a.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x5a0b2a + 1;
      $.isLogin = true;
      $.nickName = "";
      $.hdlist = [];
      $.beanlist = [];
      $.UA = _0x1aff54.UARAM ? _0x1aff54.UARAM() : _0x1aff54.USER_AGENT;
      await _0x173bb7();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        const _0x3a15fe = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x3a15fe);
        $.isNode() && (await _0x5cd985.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x581f83();
      for (let _0x4a76f8 of $.hdlist) {
        if (_0x4a76f8.expired || _0x4a76f8.hasRead) {
          continue;
        }
        _0x4a76f8.content.includes("京豆") && !_0x4a76f8.content.includes("种豆") && !_0x4a76f8.content.includes("昨日") && $.beanlist.push(_0x4a76f8.content);
      }
      if ($.beanlist.length !== 0) {
        $.index == 1 && (_0x1cd371 += "入口：APP-我的-消息-互动消息，去完成任务领豆吧！\n\n");
        console.log("互动消息有豆，如下：\n");
        _0x1cd371 += "【账号" + $.index + "：" + ($.nickName || $.UserName) + "】\n\n";
        for (let _0x15bd16 of $.beanlist) {
          console.log(_0x15bd16 + "\n");
          _0x1cd371 += _0x15bd16 + "\n\n";
        }
      } else {
        $.log("检测完毕，没有新的 给豆 消息！");
      }
      await $.wait(5000);
    }
  }
  if (_0x1cd371) {
    await _0x5cd985.sendNotify("" + $.name, "" + _0x1cd371);
  }
})().catch(_0x573730 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x573730 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x581f83() {
  let _0x4e3e50 = Date.now(),
    _0x184e9a = _0x874c32(),
    _0x1eb897 = _0x874c32();
  const _0x3ca511 = {
    "accountType": "12",
    "bubblesCount": "0",
    "lastMsgId": null,
    "page": 1
  };
  let _0xc53173 = _0x184e9a + "&MessageCenter&{\"accountType\":\"12\",\"bubblesCount\":\"0\",\"lastMsgId\":null,\"page\":1}&98715&android&11.6.5&secondLvlMsgV854&0&zh_CN&0&wifi&" + _0x1eb897 + "&" + _0x184e9a + "&12&jingdong&2276*1080&31&" + _0x4e3e50 + "&" + _0x184e9a,
    _0x56b6ac = "ddcccc63f0b2426fb61acb24c9439b3f",
    _0xcd41a2 = _0x4970a2.HmacSHA256(_0xc53173, _0x56b6ac);
  _0xcd41a2 = _0x4970a2.enc.Hex.stringify(_0xcd41a2);
  const _0x15ba85 = {
    "Host": "api.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    "Cookie": _0x1f2a6a
  };
  let _0x37eef6 = {
    "url": "https://api.m.jd.com/client.action",
    "body": "functionId=secondLvlMsgV854&lmt=0&t=" + _0x4e3e50 + "&appid=MessageCenter&clientVersion=11.6.5&build=98715&client=android&partner=jingdong&oaid=" + _0x1eb897 + "&sdkVersion=31&lang=zh_CN&harmonyOs=0&networkType=wifi&osVersion=12&screen=2276*1080&uuid=" + _0x184e9a + "&aid=" + _0x184e9a + "&openudid=" + _0x184e9a + "&body=" + encodeURIComponent(JSON.stringify(_0x3ca511)) + "&sign=" + _0xcd41a2,
    "headers": _0x15ba85
  };
  return new Promise(async _0x3c7bb6 => {
    $.post(_0x37eef6, async (_0xb922d8, _0x1692b0, _0x4aaf3c) => {
      try {
        _0xb922d8 ? (console.log("" + JSON.stringify(_0xb922d8)), console.log(" API请求失败，请检查网路重试")) : (_0x4aaf3c = JSON.parse(_0x4aaf3c), _0x4aaf3c.code == 0 ? $.hdlist = _0x4aaf3c.secondLevelList : console.log(JSON.stringify(_0x4aaf3c)));
      } catch (_0x582ace) {
        $.logErr(_0x582ace, _0x1692b0);
      } finally {
        _0x3c7bb6(_0x4aaf3c);
      }
    });
  });
}
function _0x874c32() {
  var _0x4cf2ec = new Date().getTime(),
    _0x431989 = "xxxxxxxxxxxxxxxx".replace(/[xy]/g, function (_0x10b3f5) {
      var _0x5eaaf7 = (_0x4cf2ec + 16 * Math.random()) % 16 | 0;
      _0x4cf2ec = Math.floor(_0x4cf2ec / 16);
      return ("x" == _0x10b3f5 ? _0x5eaaf7 : 3 & _0x5eaaf7 | 8).toString(16);
    });
  return _0x431989;
}
function _0x16a538() {
  return;
}
function _0x173bb7() {
  return new Promise(_0x1b8012 => {
    const _0x1cf403 = {
      "Cookie": _0x1f2a6a,
      "referer": "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x509eaf = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": _0x1cf403,
      "timeout": 10000
    };
    $.get(_0x509eaf, (_0x5eab37, _0x5c7096, _0x4ce8da) => {
      try {
        if (_0x4ce8da) {
          _0x4ce8da = JSON.parse(_0x4ce8da);
          if (!(_0x4ce8da.islogin === "1")) {
            _0x4ce8da.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x67e1e0) {
        console.log(_0x67e1e0);
      } finally {
        _0x1b8012();
      }
    });
  });
}
function _0x3b222d() {
  return new Promise(_0x49f45f => {
    $.log("京东账号" + $.index + $.nickName + "\n" + _0x1cd371);
    _0x49f45f();
  });
}
function _0x2e475f(_0x4536e2) {
  try {
    if (typeof JSON.parse(_0x4536e2) == "object") {
      return true;
    }
  } catch (_0x2f1794) {
    console.log(_0x2f1794);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function _0x4f67c2(_0x3d6fa2) {
  if (typeof _0x3d6fa2 == "string") {
    try {
      return JSON.parse(_0x3d6fa2);
    } catch (_0x5dc84c) {
      console.log(_0x5dc84c);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}