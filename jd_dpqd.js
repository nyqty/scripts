/*
常规店铺签到
环境变量: export DPQDTK="token1&token2" 或 export DPQDTK="token1\ntoken2"

定时建议自行修改
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#常规店铺签到
1 1 1 1 * jd_dpqd.js, tag=常规店铺签到, enabled=true
*/
const Env = require('./utils/Env.js');
const $ = new Env('常规店铺签到');
const _0xf90bf0 = $.isNode() ? require("./sendNotify") : "",
  _0x1660c3 = $.isNode() ? require("./jdCookie") : "",
  _0x236cb1 = require("./function/h5st41.js"),
  _0x3b4457 = require("crypto-js"),
  _0x4f7e32 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
let _0x245be6 = [];
process.env.DPQDTK && (process.env.DPQDTK.includes("\n") ? _0x245be6 = [...process.env.DPQDTK.split("\n"), ..._0x245be6] : _0x245be6 = [...process.env.DPQDTK.split("&"), ..._0x245be6]);
let _0x570f64 = [],
  _0xbabcd8 = "",
  _0x5ba255 = "",
  _0x1f6712;
$.activityId = "";
$.venderId = "";
$.activityEnd = false;
if ($.isNode()) {
  Object.keys(_0x1660c3).forEach(_0x3d3372 => {
    _0x570f64.push(_0x1660c3[_0x3d3372]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let _0x36c4f4 = $.getdata("CookiesJD") || "[]";
  _0x36c4f4 = _0x4ad446(_0x36c4f4);
  _0x570f64 = _0x36c4f4.map(_0x50c055 => _0x50c055.cookie);
  _0x570f64.reverse();
  _0x570f64.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  _0x570f64.reverse();
  _0x570f64 = _0x570f64.filter(_0x351c09 => _0x351c09 !== "" && _0x351c09 !== null && _0x351c09 !== undefined);
}
!(async () => {
  if (!_0x570f64[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let _0x40da98 = 0; _0x40da98 < _0x570f64.length; _0x40da98++) {
    if (_0x570f64[_0x40da98]) {
      _0xbabcd8 = _0x570f64[_0x40da98];
      $.UserName = decodeURIComponent(_0xbabcd8.match(/pt_pin=([^; ]+)(?=;?)/) && _0xbabcd8.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x40da98 + 1;
      $.isLogin = true;
      $.nickName = "";
      _0x1f6712 = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0xf90bf0.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      _0x592b80();
      await _0xbb8786();
      await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
    }
  }
})().catch(_0x111206 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x111206 + "!", "");
}).finally(() => {
  $.done();
});
async function _0xbb8786() {
  for (var _0x1d1955 = 0; _0x1d1955 < _0x245be6.length; _0x1d1955++) {
    if (_0x245be6[_0x1d1955] == "") continue;
    await $.wait(parseInt(Math.random() * 500 + 500, 10));
    await _0xbefc9e(_0x245be6[_0x1d1955]);
    await $.wait(parseInt(Math.random() * 500 + 500, 10));
    if ($.venderId == "") {
      continue;
    }
    $.index == 1 && (await _0x3c01e7($.venderId), await $.wait(parseInt(Math.random() * 500 + 500, 10)));
    await _0x436d32(_0x245be6[_0x1d1955], $.venderId);
    await $.wait(parseInt(Math.random() * 500 + 500, 10));
    await _0x231761(_0x245be6[_0x1d1955], $.venderId, $.activityId);
  }
}
async function _0xbefc9e(_0x38ff77) {
  return new Promise(async _0x35dd8a => {
    const _0x2dc8f6 = {
        "functionId": "interact_center_shopSign_getActivityInfo",
        "appid": "interCenter_shopSign",
        "body": {
          "token": _0x38ff77,
          "venderId": ""
        }
      },
      _0xac7cdb = await _0x3c75a0("4da33", _0x2dc8f6),
      _0x144026 = {
        "url": "https://api.m.jd.com/api?" + _0xac7cdb + "&loginType=2&jsonp=jsonp1000",
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0xbabcd8,
          "referer": "https://h5.m.jd.com/",
          "User-Agent": $.UA
        },
        "timeout": 15 * 1000
      };
    $.get(_0x144026, (_0x1780bf, _0x3ecf5a, _0x4ebbef) => {
      try {
        if (_0x1780bf) {
          console.log("查询店铺GetvenderId API请求失败‼️");
          console.log(_0x1780bf);
        } else {
          _0x4ebbef = JSON.parse(/{(.*)}/g.exec(_0x4ebbef)[0]);
          if (_0x4ebbef.code == 402) {
            $.venderId = "";
            console.log("活动已失效");
            $.activityEnd = true;
          } else $.venderId = _0x4ebbef?.["data"]?.["venderId"];
        }
      } catch (_0x5a7f54) {
        $.logErr(_0x5a7f54, _0x3ecf5a);
      } finally {
        _0x35dd8a(_0x4ebbef);
      }
    });
  });
}
async function _0x3c01e7(_0x3461e0) {
  return new Promise(_0x22a845 => {
    const _0x531be0 = {
      "url": "https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=%7B%22venderId%22%3A%22" + _0x3461e0 + "%22%2C%22stamp%22%3A%221%22%2C%22%24taroTimestamp%22%3A" + new Date().valueOf() + "%2C%22source%22%3A%22m-shop%22%7D&t=" + new Date().valueOf() + "&appid=shop_view&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=16630119447091257705224",
      "headers": {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://shop.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 15 * 1000
    };
    $.get(_0x531be0, (_0x50a023, _0x5eed94, _0x245dbd) => {
      try {
        if (_0x50a023) {
          console.log("查询店铺名称GetShopName API请求失败‼️");
          console.log(_0x50a023);
        } else {
          _0x245dbd = JSON.parse(_0x245dbd);
          if ($.index == 1) {
            let _0x2166f7 = _0x245dbd?.["data"]?.["shopBaseInfo"]?.["shopName"];
            console.log("店铺名称：" + _0x2166f7 + "\n店铺链接：https://shop.m.jd.com/?venderId=" + _0x3461e0);
            _0x1f6712 += "【" + _0x2166f7 + "】";
          }
        }
      } catch (_0x537359) {
        $.logErr(_0x537359, _0x5eed94);
      } finally {
        _0x22a845(_0x245dbd);
      }
    });
  });
}
async function _0x436d32(_0x171b18, _0x5c1cb2) {
  return new Promise(async _0x3fbac3 => {
    const _0xf486ae = {
        "functionId": "interact_center_shopSign_getActivityInfo",
        "appid": "interCenter_shopSign",
        "body": {
          "token": _0x171b18,
          "venderId": _0x5c1cb2
        }
      },
      _0xf8b37e = await _0x3c75a0("4da33", _0xf486ae),
      _0xd1d791 = {
        "url": "https://api.m.jd.com/api?" + _0xf8b37e + "&loginType=2&jsonp=jsonp1005",
        "headers": {
          "accept": "accept",
          "accept-encoding": "gzip, deflate",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0xbabcd8,
          "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + _0x171b18 + "&sceneval=2",
          "User-Agent": $.UA
        },
        "timeout": 15 * 1000
      };
    $.get(_0xd1d791, (_0x1306f4, _0x2062ed, _0x311f58) => {
      try {
        if (_0x1306f4) {
          console.log("查询活动信息GetActivityInfo API请求失败‼️");
          console.log(_0x1306f4);
        } else {
          _0x311f58 = JSON.parse(/{(.*)}/g.exec(_0x311f58)[0]);
          $.activityId = _0x311f58.data.id;
          let _0x1b7b56 = _0x311f58.data.startTime,
            _0x43df54 = _0x311f58.data.endTime;
          if ($.index == 1) {
            console.log("开始时间：" + new Date(parseInt(_0x1b7b56)).toLocaleString() + "\n结束时间：" + new Date(parseInt(_0x43df54)).toLocaleString());
            let _0xfe813c = "";
            for (let _0x1d1433 = 0; _0x1d1433 < _0x311f58.data.continuePrizeRuleList.length; _0x1d1433++) {
              const _0x1b08a7 = _0x311f58.data.continuePrizeRuleList[_0x1d1433].level,
                _0x59e985 = _0x311f58.data.continuePrizeRuleList[_0x1d1433].prizeList[0].discount;
              _0x1d1433 != _0x311f58.data.continuePrizeRuleList.length - 1 ? _0xfe813c += _0x1b08a7 + "天" + _0x59e985 + "豆，" : _0xfe813c += _0x1b08a7 + "天" + _0x59e985 + "豆";
            }
            console.log("签到奖励：" + _0xfe813c + "\n");
          }
        }
      } catch (_0x5be2ee) {
        $.logErr(_0x5be2ee, _0x2062ed);
      } finally {
        _0x3fbac3(_0x311f58);
      }
    });
  });
}
async function _0x231761(_0x57bb15, _0x665abf, _0x3343d2) {
  return new Promise(async _0x570b8f => {
    const _0x272dd1 = {
        "functionId": "interact_center_shopSign_signCollectGift",
        "appid": "interCenter_shopSign",
        "body": {
          "token": _0x57bb15,
          "venderId": _0x665abf,
          "activityId": _0x3343d2,
          "type": 56,
          "actionType": 7
        }
      },
      _0x55faa4 = await _0x3c75a0("4da33", _0x272dd1),
      _0x209e1c = {
        "url": "https://api.m.jd.com/api?" + _0x55faa4 + "&loginType=2jsonp=jsonp1004",
        "headers": {
          "accept": "accept",
          "accept-encoding": "gzip, deflate",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": _0xbabcd8,
          "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + _0x57bb15 + "&sceneval=2",
          "User-Agent": $.UA
        },
        "timeout": 15 * 1000
      };
    $.get(_0x209e1c, (_0x49399d, _0x594d1a, _0xa11ef5) => {
      try {
        if (_0x49399d) {
          console.log("签到SignCollectGift API请求失败‼️");
          console.log(_0x49399d);
        } else {
          _0xa11ef5 = JSON.parse(/{(.*)}/g.exec(_0xa11ef5)[0]);
          if (_0xa11ef5.success && _0xa11ef5.success === true) console.log("签到成功");else {
            if (_0xa11ef5.msg) console.log("签到失败：" + _0xa11ef5?.["msg"]);else {
              console.log("签到失败");
              console.log(JSON.stringify(_0xa11ef5));
            }
          }
        }
      } catch (_0x3cf960) {
        $.logErr(_0x3cf960, _0x594d1a);
      } finally {
        _0x570b8f(_0xa11ef5);
      }
    });
  });
}
async function _0x572155(_0x16dd45, _0x39813d) {
  return new Promise(_0x35d67c => {
    const _0x3e13f8 = {
      "url": "https://api.m.jd.com/api?appid=interCenter_shopSign&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22" + _0x16dd45 + "%22,%22venderId%22:" + _0x39813d + ",%22activityId%22:" + $.activityId + ",%22type%22:56}&jsonp=jsonp1006",
      "headers": {
        "accept": "application/json",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9",
        "cookie": _0xbabcd8,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 15 * 1000
    };
    $.get(_0x3e13f8, (_0x16350f, _0x2e42a8, _0x11e767) => {
      try {
        _0x16350f ? (console.log("taskUrl API请求失败‼️"), console.log(_0x16350f)) : (_0x11e767 = JSON.parse(/{(.*)}/g.exec(_0x11e767)[0]), console.log("当前已签到 " + _0x11e767?.["data"]?.["days"] + " 天"), _0x1f6712 += "已签到：" + _0x11e767?.["data"]?.["days"] + "天\n");
      } catch (_0x3cddbe) {
        $.logErr(_0x3cddbe, _0x2e42a8);
      } finally {
        _0x35d67c(_0x11e767);
      }
    });
  });
}
async function _0x4f24e5() {
  $.isNode() && ($.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + _0x1f6712), _0x5ba255 += "【京东账号" + $.index + "】" + $.nickName + "\n" + _0x1f6712 + ($.index !== _0x570f64.length ? "\n\n" : ""));
}
function _0x37232c() {
  return new Promise(async _0x446818 => {
    const _0x2485b3 = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": _0xbabcd8,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": "jdapp;android;9.3.5;10;3353234393134326-3673735303632613;network/wifi;model/MI 8;addressid/138719729;aid/3524914bc77506b1;oaid/274aeb3d01b03a22;osVer/29;appBuild/86390;psn/Mp0dlaZf4czQtfPNMEfpcYU9S/f2Vv4y|2255;psq/1;adk/;ads/;pap/JA2015_311210|9.3.5|ANDROID 10;osv/10;pv/2039.1;jdv/0|androidapp|t_335139774|appshare|QQfriends|1611211482018|1611211495;ref/com.jingdong.app.mall.home.JDHomeFragment;partner/jingdong;apprpd/Home_Main;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36"
      },
      "timeout": 15 * 1000
    };
    $.post(_0x2485b3, (_0x3bf6af, _0x58bfd7, _0xe48240) => {
      try {
        if (_0x3bf6af) {
          console.log("" + JSON.stringify(_0x3bf6af));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0xe48240) {
            _0xe48240 = JSON.parse(_0xe48240);
            if (_0xe48240.retcode === 13) {
              $.isLogin = false;
              return;
            }
            _0xe48240.retcode === 0 ? $.nickName = _0xe48240.base.nickname : $.nickName = $.UserName;
          } else console.log("京东服务器返回空数据");
        }
      } catch (_0x5c898d) {
        $.logErr(_0x5c898d, _0x58bfd7);
      } finally {
        _0x446818();
      }
    });
  });
}
function _0x4ad446(_0x3e318b) {
  if (typeof _0x3e318b == "string") {
    try {
      return JSON.parse(_0x3e318b);
    } catch (_0x51c94e) {
      return console.log(_0x51c94e), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function _0x3c75a0(_0x4d4853, _0x366ce9) {
  try {
    let _0xf585b5 = new _0x236cb1({
      "appId": _0x4d4853,
      "appid": "interCenter_shopSign",
      "pin": $.UserName,
      "ua": $.UA,
      "version": "3.1"
    });
    return await _0xf585b5.genAlgo(), body = await _0xf585b5.genUrlParams(_0x366ce9.functionId, _0x366ce9.body), body;
  } catch (_0xfcdb65) {}
}
function _0x42e661(_0x30c1b6) {
  _0x30c1b6 = _0x30c1b6 || 32;
  let _0x4717bd = "abcdef0123456789",
    _0x1d15e5 = _0x4717bd.length,
    _0x4f02cb = "";
  for (i = 0; i < _0x30c1b6; i++) _0x4f02cb += _0x4717bd.charAt(Math.floor(Math.random() * _0x1d15e5));
  return _0x4f02cb;
}
function _0x42e661(_0x32b92f, _0x4d7ee5 = "qwertyuiopasdfghjklzxcvbnm") {
  let _0x522430 = "";
  for (let _0x41a03d = 0; _0x41a03d < _0x32b92f; _0x41a03d++) {
    _0x522430 += _0x4d7ee5[Math.floor(Math.random() * _0x4d7ee5.length)];
  }
  return _0x522430;
}
function _0x3e106c(_0x49258a, _0x359cf1 = {}) {
  let _0x4859da = [],
    _0x25dfcb = _0x359cf1.connector || "&",
    _0x1b8cbd = Object.keys(_0x49258a);
  if (_0x359cf1.sort) _0x1b8cbd = _0x1b8cbd.sort();
  for (let _0x203fa7 of _0x1b8cbd) {
    let _0x2960cc = _0x49258a[_0x203fa7];
    if (_0x2960cc && typeof _0x2960cc === "object") _0x2960cc = JSON.stringify(_0x2960cc);
    if (_0x2960cc && _0x359cf1.encode) _0x2960cc = encodeURIComponent(_0x2960cc);
    _0x4859da.push(_0x203fa7 + "=" + _0x2960cc);
  }
  return _0x4859da.join(_0x25dfcb);
}
function _0x495932(_0x36cf12) {
  return _0x36cf12[Math.floor(Math.random() * _0x36cf12.length)];
}
function _0x25e759(_0x573c65 = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", _0x1cd9e2 = "0123456789abcdef") {
  let _0x5cd612 = "";
  for (let _0xc9e97b of _0x573c65) {
    if (_0xc9e97b == "x") {
      _0x5cd612 += _0x1cd9e2.charAt(Math.floor(Math.random() * _0x1cd9e2.length));
    } else _0xc9e97b == "X" ? _0x5cd612 += _0x1cd9e2.charAt(Math.floor(Math.random() * _0x1cd9e2.length)).toUpperCase() : _0x5cd612 += _0xc9e97b;
  }
  return _0x5cd612;
}
function _0x5cfd6e(_0x2bae7f) {
  _0x2bae7f = _0x2bae7f.replace(/rn/g, "n");
  var _0x45102a = "";
  for (var _0x23d747 = 0; _0x23d747 < _0x2bae7f.length; _0x23d747++) {
    var _0x3357fd = _0x2bae7f.charCodeAt(_0x23d747);
    if (_0x3357fd < 128) _0x45102a += String.fromCharCode(_0x3357fd);else _0x3357fd > 127 && _0x3357fd < 2048 ? (_0x45102a += String.fromCharCode(_0x3357fd >> 6 | 192), _0x45102a += String.fromCharCode(_0x3357fd & 63 | 128)) : (_0x45102a += String.fromCharCode(_0x3357fd >> 12 | 224), _0x45102a += String.fromCharCode(_0x3357fd >> 6 & 63 | 128), _0x45102a += String.fromCharCode(_0x3357fd & 63 | 128));
  }
  return _0x45102a;
}
function _0x50eb35(_0x25dc6c, _0x2910c4) {
  _0x2910c4 = _0x2910c4 || _0x4f7e32;
  var _0xd16eae = "";
  var _0x59ff3b, _0x305e73, _0xf7bcfc, _0x50e0f8, _0x26a99b, _0xd33a3e, _0x2f9d95;
  var _0x1e7c8f = 0;
  _0x25dc6c = _0x5cfd6e(_0x25dc6c);
  while (_0x1e7c8f < _0x25dc6c.length) {
    _0x59ff3b = _0x25dc6c.charCodeAt(_0x1e7c8f++);
    _0x305e73 = _0x25dc6c.charCodeAt(_0x1e7c8f++);
    _0xf7bcfc = _0x25dc6c.charCodeAt(_0x1e7c8f++);
    _0x50e0f8 = _0x59ff3b >> 2;
    _0x26a99b = (_0x59ff3b & 3) << 4 | _0x305e73 >> 4;
    _0xd33a3e = (_0x305e73 & 15) << 2 | _0xf7bcfc >> 6;
    _0x2f9d95 = _0xf7bcfc & 63;
    if (isNaN(_0x305e73)) _0xd33a3e = _0x2f9d95 = 64;else isNaN(_0xf7bcfc) && (_0x2f9d95 = 64);
    _0xd16eae = _0xd16eae + _0x2910c4.charAt(_0x50e0f8) + _0x2910c4.charAt(_0x26a99b) + _0x2910c4.charAt(_0xd33a3e) + _0x2910c4.charAt(_0x2f9d95);
  }
  while (_0xd16eae.length % 4 > 1) _0xd16eae += "=";
  return _0xd16eae;
}
function _0x30dee7(_0x365a0a = {}) {
  let _0x514372 = {
    "ciphertype": 5,
    "cipher": {
      "ud": _0x50eb35(_0x3b4457.SHA1($.UserName).toString()),
      "sv": _0x50eb35($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(_0x514372);
}
function _0x592b80(_0x2bf856, _0x552c78 = {}) {
  const _0x5dd37c = {
      "jd": {
        "app": "jdapp",
        "appBuild": "168392",
        "client": "android",
        "clientVersion": "10.1.0"
      },
      "lite": {
        "app": "jdltapp",
        "appBuild": "1247",
        "client": "ios",
        "clientVersion": "6.0.0"
      }
    },
    _0x466199 = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = _0x495932(_0x466199);
  let _0x506639 = _0x2bf856 || "jd",
    _0x12408b = _0x552c78?.["ep"] ? _0x552c78?.["ep"] : true;
  if (!_0x5dd37c[_0x506639]) {
    console.log("获取[" + _0x506639 + "]UA失败");
    return;
  }
  $.client = _0x552c78?.["client"] ? _0x552c78?.["client"] : _0x5dd37c[_0x506639].client;
  $.clientVersion = _0x552c78?.["clientVersion"] ? _0x552c78?.["clientVersion"] : _0x5dd37c[_0x506639].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let _0x6baa4c = "android";
  $.client == "apple" && (_0x6baa4c = "iPhone");
  _0x30dee7();
  let _0x10abe7 = [_0x5dd37c[_0x506639].app, _0x6baa4c, $.clientVersion, "", "rn/" + _0x25e759(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + _0x5dd37c[_0x506639].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", _0x12408b ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = _0x10abe7.join(";");
}