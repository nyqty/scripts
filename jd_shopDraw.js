/*
店铺左侧刮刮乐

店铺抽奖 左侧

也可点击顶部【精选】后面的【活动】选项，找到抽奖活动

必须有venderId= 参数
//export jd_shopDraw_venderId="" //店铺ID，多个 @ 链接或者 | 链接 或者 & 链接

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺左侧刮刮乐
1 1 1 1 * jd_shopDraw.js, tag=店铺刮刮乐, enabled=true
 */

const Env=require('./utils/Env.js');
const $ = new Env('店铺左侧刮刮乐');
const _0x276998 = $.isNode() ? require("./sendNotify") : "",
  _0x47f881 = $.isNode() ? require("./jdCookie.js") : "",
  _0x40e627 = require("./function/krgetSign");
let _0x520315 = [],
  _0x56f896 = "";
if ($.isNode()) {
  Object.keys(_0x47f881).forEach(_0x518c4a => {
    _0x520315.push(_0x47f881[_0x518c4a]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x520315 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x305f6d($.getdata("CookiesJD") || "[]").map(_0x533ff1 => _0x533ff1.cookie)].filter(_0x2a2e7c => !!_0x2a2e7c);
let _0x53f6c6 = [];
if (process.env.jd_shopDraw_venderId) {
  if (process.env.jd_shopDraw_venderId.includes("|")) _0x53f6c6 = [...process.env.jd_shopDraw_venderId.split("|"), ..._0x53f6c6];else process.env.jd_shopDraw_venderId.includes("@") ? _0x53f6c6 = [...process.env.jd_shopDraw_venderId.split("@"), ..._0x53f6c6] : _0x53f6c6 = [...process.env.jd_shopDraw_venderId.split("&"), ..._0x53f6c6];
}
const _0x27d64d = process.env.JD_SIGN_KRAPI || "";
let _0x2a79c5 = "";
const _0x40a731 = "https://api.m.jd.com/client.action";
!(async () => {
  if (_0x53f6c6.length <= 0) {
    $.log("活动id不存在");
    return;
  }
  if (!_0x520315[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动ID：" + _0x53f6c6);
  for (let _0x1ca1f8 = 0; _0x1ca1f8 < _0x520315.length; _0x1ca1f8++) {
    if (_0x520315[_0x1ca1f8]) {
      _0x56f896 = _0x520315[_0x1ca1f8];
      $.UserName = decodeURIComponent(_0x56f896.match(/pt_pin=([^; ]+)(?=;?)/) && _0x56f896.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x1ca1f8 + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x276998.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x3891f7();
    }
  }
  if (_0x2a79c5) {
    if ($.isNode()) await _0x276998.sendNotify("" + $.name, "" + _0x2a79c5);
    $.msg($.name, "", _0x2a79c5);
  }
})().catch(_0x5a78f4 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x5a78f4 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x3891f7() {
  for (let _0xdebd26 = 0; _0xdebd26 < _0x53f6c6.length; _0xdebd26++) {
    console.log("开始第" + (_0xdebd26 + 1) + "个店铺抽奖：" + _0x53f6c6[_0xdebd26]);
    $.venderId = _0x53f6c6[_0xdebd26];
    await _0x760b02();
    await $.wait(500);
    $.index == 1 && (await _0x28fac4());
    await $.wait(500);
    $.isSign != 2 ? await _0xf70f80() : console.log("已经参与过活动~\n");
  }
}
async function _0x760b02() {
  sign = await _0x40e627("getSignInfo", {
    "vendorId": $.venderId
  });
  _0x27d64d ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
  if (!$.signStr) {
    console.log("接口获取失败，跳过");
  }
  let _0x2c2e65 = {
    "url": _0x40a731 + "?functionId=getSignInfo",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": _0x56f896,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + $.signStr
  };
  return new Promise(_0x31660c => {
    $.post(_0x2c2e65, (_0x265e17, _0x19d022, _0x15de19) => {
      try {
        _0x265e17 ? $.log(_0x265e17) : (_0x15de19 = JSON.parse(_0x15de19), typeof _0x15de19 == "object" ? _0x15de19.code == 0 && ($.isSign = _0x15de19.result.signInfo.isSign) : console.log("京东返回了空数据"));
      } catch (_0x5a79d4) {
        $.log(_0x5a79d4);
      } finally {
        _0x31660c();
      }
    });
  });
}
async function _0x28fac4() {
  sign = await _0x40e627("signActivityRule", {
    "vendorId": $.venderId
  });
  _0x27d64d ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
  !$.signStr && console.log("接口获取失败，跳过");
  let _0x23a1d5 = {
    "url": _0x40a731 + "?functionId=signActivityRule",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": _0x56f896,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + $.signStr
  };
  return new Promise(_0x316155 => {
    $.post(_0x23a1d5, (_0x4bff80, _0x3d7e78, _0x31eb8e) => {
      try {
        _0x4bff80 ? $.log(_0x4bff80) : (_0x31eb8e = JSON.parse(_0x31eb8e), typeof _0x31eb8e == "object" ? _0x31eb8e.code == 0 && console.log("活动奖品：" + _0x31eb8e.result.awardDescription + "\n") : $.log("京东返回了空数据"));
      } catch (_0x538fa7) {
        $.log(_0x538fa7);
      } finally {
        _0x316155();
      }
    });
  });
}
async function _0xf70f80() {
  sign = await _0x40e627("sign", {
    "vendorId": $.venderId,
    "sourceRpc": "shop_app_sign_home"
  });
  if (_0x27d64d) $.signStr = sign?.["data"]?.["convertUrl"] || "";else {
    $.signStr = sign?.["body"] || "";
  }
  !$.signStr && console.log("接口获取失败，跳过");
  let _0x6dc66d = {
    "url": _0x40a731 + "?functionId=sign",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": _0x56f896,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + $.signStr
  };
  return new Promise(_0x4a0e9d => {
    $.post(_0x6dc66d, (_0x1e7457, _0x6e4414, _0x1394a4) => {
      try {
        if (_0x1e7457) $.log(_0x1e7457);else {
          _0x1394a4 = JSON.parse(_0x1394a4);
          if (typeof _0x1394a4 == "object") _0x1394a4.code == 0 ? _0x1394a4.result.isWin ? ($.Prize = _0x1394a4.result.signReward.name || "", console.log("抽奖结果：" + $.Prize + " 🐶\n")) : console.log("抽奖结果：💨  空气\n") : console.log("账号未登录\n");else {
            console.log("京东返回了空数据");
          }
        }
      } catch (_0x1c7393) {
        $.log(_0x1c7393);
      } finally {
        _0x4a0e9d();
      }
    });
  });
}
function _0x305f6d(_0x324481) {
  if (typeof _0x324481 == "string") try {
    return JSON.parse(_0x324481);
  } catch (_0x23d105) {
    return console.log(_0x23d105), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function _0x21e61a(_0x33a50d, _0x1c585d) {
  let _0x4d3bd6 = new RegExp("(^|[&?])" + _0x1c585d + "=([^&]*)(&|$)"),
    _0x127065 = _0x33a50d.match(_0x4d3bd6);
  if (_0x127065 != null) {
    return unescape(_0x127065[2]);
  }
  return "";
}