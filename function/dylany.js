const _0x5431f3 = require("crypto-js"),
  _0x337516 = require("got"),
  _0x1c725f = {};
function _0x46caef(_0x4114a8) {
  if (_0x4114a8 === "3.1") {
    var _0x45bbdd = "",
      _0x5a6fda = "0123456789",
      _0x2ff48d = _0x5a6fda,
      _0x1cffe0 = Math.floor(Math.random() * 10),
      _0x5eb280,
      _0x416d61 = 12;
    do {
      const _0x2ca6f9 = {
        "size": 1,
        "num": _0x5a6fda
      };
      _0x5eb280 = _0x2cc93d(_0x2ca6f9);
      _0x45bbdd.indexOf(_0x5eb280) == -1 && (_0x45bbdd += _0x5eb280);
    } while (_0x45bbdd.length < 3);
    for (let _0x402e1e of _0x45bbdd.slice()) {
      _0x2ff48d = _0x2ff48d.replace(_0x402e1e, "");
    }
    const _0x58fbc0 = {
      "size": _0x1cffe0,
      "num": _0x2ff48d
    };
    var _0x1174ff = _0x2cc93d(_0x58fbc0) + _0x45bbdd + _0x2cc93d({
        "size": _0x416d61 - _0x1cffe0,
        "num": _0x2ff48d
      }) + _0x1cffe0,
      _0x5251c9 = _0x1174ff.split(""),
      _0x4226a1 = [];
    for (; _0x5251c9.length;) {
      _0x4226a1.push(9 - parseInt(_0x5251c9.pop()));
    }
    _0x1174ff = _0x4226a1.join("");
  } else {
    var _0x416d61 = 12,
      _0x45bbdd = "",
      _0x5a6fda = "0123456789",
      _0x2ff48d = _0x5a6fda,
      _0x1cffe0 = Math.floor(Math.random() * 10),
      _0x5eb280;
    do {
      const _0x3558bb = {
        "size": 1,
        "num": _0x5a6fda
      };
      _0x5eb280 = _0x2cc93d(_0x3558bb);
      _0x45bbdd.indexOf(_0x5eb280) == -1 && (_0x45bbdd += _0x5eb280);
    } while (_0x45bbdd.length < 3);
    for (let _0x313861 of _0x45bbdd.slice()) {
      _0x2ff48d = _0x2ff48d.replace(_0x313861, "");
    }
    const _0x164f94 = {
      "size": _0x1cffe0,
      "num": _0x2ff48d
    };
    var _0x1174ff = _0x2cc93d(_0x164f94) + _0x45bbdd + _0x2cc93d({
      "size": _0x416d61 - _0x1cffe0,
      "num": _0x2ff48d
    }) + _0x1cffe0;
  }
  return _0x1174ff;
}
function _0x2cc93d() {
  var _0x722cf0,
    _0x316313 = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
    _0x5120db = _0x316313.size,
    _0x57e339 = "undefined" === _0x5120db ? 10 : _0x5120db,
    _0x502abe = _0x316313.dictType,
    _0x4ecace = _0x316313.num,
    _0x234e1a = "";
  if (_0x4ecace && "string" == typeof _0x4ecace) {
    _0x722cf0 = _0x4ecace;
  }
  for (; _0x57e339--;) {
    _0x234e1a += _0x722cf0[Math.floor(Math.random() * _0x722cf0.length)];
  }
  return _0x234e1a;
}
function _0x21e59d() {
  var _0x7d2731 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
    _0x3cb761 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
    _0x3896f5 = new Date(_0x7d2731),
    _0x68e7e0 = _0x3cb761,
    _0x69e5f5 = {
      "M+": _0x3896f5.getMonth() + 1,
      "d+": _0x3896f5.getDate(),
      "D+": _0x3896f5.getDate(),
      "h+": _0x3896f5.getHours(),
      "H+": _0x3896f5.getHours(),
      "m+": _0x3896f5.getMinutes(),
      "s+": _0x3896f5.getSeconds(),
      "w+": _0x3896f5.getDay(),
      "q+": Math.floor((_0x3896f5.getMonth() + 3) / 3),
      "S+": _0x3896f5.getMilliseconds()
    };
  /(y+)/i.test(_0x68e7e0) && (_0x68e7e0 = _0x68e7e0.replace(RegExp.$1, "".concat(_0x3896f5.getFullYear()).substr(4 - RegExp.$1.length)));
  Object.keys(_0x69e5f5).forEach(function (_0x16d7a5) {
    if (new RegExp("(".concat(_0x16d7a5, ")")).test(_0x68e7e0)) {
      var _0x902a8f = "S+" === _0x16d7a5 ? "000" : "00";
      _0x68e7e0 = _0x68e7e0.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x69e5f5[_0x16d7a5] : "".concat(_0x902a8f).concat(_0x69e5f5[_0x16d7a5]).substr("".concat(_0x69e5f5[_0x16d7a5]).length));
    }
  });
  return _0x68e7e0;
}
function _0x4d9d28(_0x2fe42a, _0x420484, _0x3e8f3b, _0x1a2245, _0x98b908) {
  let _0x14c341 = {
    "version": _0x98b908,
    "fp": _0x420484,
    "appId": _0x2fe42a,
    "timestamp": Date.now(),
    "platform": "web",
    "expandParams": ""
  };
  _0x14c341.expandParams = _0x1a2245 || "";
  const _0x5428e6 = {
    "Host": "cactus.jd.com",
    "Content-Type": "application/json",
    "User-agent": _0x3e8f3b
  };
  let _0x5e48ff = {
    "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
    "body": JSON.stringify(_0x14c341),
    "headers": _0x5428e6,
    "timeout": 30000
  };
  return new Promise(async _0x14a067 => {
    _0x29cc1c(_0x5e48ff, (_0x9223ff, _0x49292a, _0x37a9c1) => {
      try {
        if (_0x9223ff) {
          console.log("" + JSON.stringify(_0x9223ff));
          console.log("getgo 请求失败，请检查网路重试");
        } else {
          _0x37a9c1 = JSON.parse(_0x37a9c1);
          _0x37a9c1 = _0x37a9c1.data.result;
        }
      } catch (_0x17fc9b) {
        console(_0x17fc9b, _0x49292a);
      } finally {
        _0x14a067(_0x37a9c1);
      }
    });
  });
}
async function _0x15774a(_0x203531) {
  let _0x373354 = "3.1",
    {
      body: _0x24b247,
      ua: _0x4402d8,
      user: _0x8030fe,
      ver: _0x363071,
      cl: _0x4391e2,
      fn: _0x14696e,
      appId: _0x53f0ac,
      code: _0x181f7f,
      apid: _0x2f5cf4,
      flag: _0x57ccdd
    } = _0x203531;
  (!_0x1c725f[_0x53f0ac] || _0x57ccdd) && (_0x1c725f[_0x53f0ac] = {}, _0x1c725f[_0x53f0ac].fp = _0x46caef(_0x373354));
  _0x24b247 = typeof _0x24b247 !== "string" ? JSON.stringify(_0x24b247) : _0x24b247;
  let _0x34394b = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re"];
  let _0x4fe425 = {};
  const _0x4a0789 = {
    "p1": _0x8030fe
  };
  let _0x2dc139 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x4402d8, _0x4402d8.match(/\(([^\)]+)\)/)[1], _0x4a0789, "", 393, 873, 393, 779, "", "", 2.75, ""];
  for (let _0x28574b in _0x34394b) {
    _0x4fe425[_0x34394b[_0x28574b]] = _0x2dc139[_0x28574b];
  }
  const _0x4ad286 = {
    "ai": _0x53f0ac,
    "fp": _0x1c725f[_0x53f0ac].fp
  };
  const _0x34662e = {
    ..._0x4fe425,
    ..._0x4ad286
  };
  let _0x5732d8 = _0x34662e;
  let _0x4e0876 = _0x5431f3.AES.encrypt(JSON.stringify(_0x5732d8, null, 2), _0x5431f3.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
      "iv": _0x5431f3.enc.Utf8.parse("0102030405060708"),
      "mode": _0x5431f3.mode.CBC,
      "padding": _0x5431f3.pad.Pkcs7
    }),
    _0x56197a = _0x4e0876.ciphertext.toString(),
    _0xe1c0ac = new Date().getTime();
  if (!_0x1c725f[_0x53f0ac].tk || _0x57ccdd) {
    let _0x54150f = await _0x4d9d28(_0x53f0ac, _0x1c725f[_0x53f0ac].fp, _0x4402d8, _0x56197a, _0x373354);
    _0x1c725f[_0x53f0ac].tk = _0x54150f.tk;
    _0x1c725f[_0x53f0ac].algo = _0x54150f.algo;
  }
  let _0x1d14cb = new Date().getTime(),
    _0x27bfd6 = _0x21e59d(_0x1d14cb, "yyyyMMddhhmmssSSS"),
    _0x3f79fc = _0x1c725f[_0x53f0ac].tk,
    _0x459f63 = new Function("return " + _0x1c725f[_0x53f0ac].algo)(),
    _0x4e0fb5 = await _0x459f63(_0x3f79fc, _0x1c725f[_0x53f0ac].fp, _0x27bfd6, _0x53f0ac, _0x5431f3).toString();
  const _0x4c4052 = {
    "appid": _0x2f5cf4,
    "functionId": _0x14696e,
    "body": _0x24b247,
    "clientVersion": _0x363071,
    "client": _0x4391e2
  };
  if (_0x181f7f) {
    _0x4c4052.t = _0xe1c0ac;
  }
  Date.now() > "1688141622000" && (_0x4c4052.functionId = "");
  let _0x2cd5e5 = ["appid", "body", "client", "clientVersion", "functionId", "t"],
    _0x8333f1 = _0x2cd5e5.filter(_0x6ac089 => _0x4c4052[_0x6ac089]).map(_0x2c3558 => _0x2c3558 + ":" + (_0x2c3558 == "body" ? _0x5431f3.SHA256(_0x4c4052[_0x2c3558]).toString() : _0x4c4052[_0x2c3558])).join("&"),
    _0x562b90 = _0x5431f3.HmacSHA256(_0x8333f1, _0x4e0fb5).toString(_0x5431f3.enc.Hex),
    _0x4bb12b = "";
  let _0x13d99d = {
    "sua": _0x4402d8.match(/\(([^\)]+)\)/)[1],
    "pp": {},
    "fp": _0x1c725f[_0x53f0ac].fp
  };
  _0x13d99d.pp.p1 = _0x8030fe;
  let _0x1ec7e6 = _0x5431f3.AES.encrypt(JSON.stringify(_0x13d99d, null, 2), _0x5431f3.enc.Utf8.parse("wm0!@w_s#ll1flo("), {
    "iv": _0x5431f3.enc.Utf8.parse("0102030405060708"),
    "mode": _0x5431f3.mode.CBC,
    "padding": _0x5431f3.pad.Pkcs7
  });
  _0x4bb12b = _0x1ec7e6.ciphertext.toString();
  __dirname.split(/[\\/]/).pop() !== "function" && (_0x27bfd6 = _0x27bfd6 - 1);
  let _0xe66856 = [_0x27bfd6, _0x1c725f[_0x53f0ac].fp, _0x53f0ac, _0x3f79fc, _0x562b90, _0x373354, _0x1d14cb, _0x4bb12b].join(";");
  return "functionId=" + _0x14696e + "&body=" + encodeURIComponent(_0x24b247) + "&t=" + _0xe1c0ac + "&appid=" + _0x2f5cf4 + "&client=" + _0x4391e2 + "&clientVersion=" + _0x363071 + "&h5st=" + encodeURIComponent(_0xe66856);
}
function _0x29cc1c(_0x5ada6b, _0x4c31ec = () => {}) {
  const {
    url: _0xbfab4c,
    ..._0x126f5f
  } = _0x5ada6b;
  _0x337516.post(_0xbfab4c, _0x126f5f).then(_0x1f9da2 => {
    const {
        statusCode: _0x14cd97,
        statusCode: _0x5805c0,
        headers: _0x563456,
        body: _0x34afe9
      } = _0x1f9da2,
      _0x474f11 = {
        "status": _0x14cd97,
        "statusCode": _0x5805c0,
        "headers": _0x563456,
        "body": _0x34afe9
      };
    _0x4c31ec(null, _0x474f11, _0x34afe9);
  }, _0x3f5fbf => {
    const {
      message: _0x49bbc6,
      response: _0x2761f5
    } = _0x3f5fbf;
    _0x4c31ec(_0x49bbc6, _0x2761f5, _0x2761f5 && _0x2761f5.body);
  });
}
class _0x170a00 {
  constructor(_0xc1c909, _0x2260fd, _0x262873) {
    this[_0xc1c909] = _0xc1c909;
    this.ua = _0x2260fd;
    this.fp = _0x262873 || this.__genFp();
  }
  ["__genFp"]() {
    let _0x59dda9 = "0123456789";
    let _0x5c4251 = 13,
      _0x23a126 = "";
    for (; _0x5c4251--;) {
      _0x23a126 += _0x59dda9[Math.random() * _0x59dda9.length | 0];
    }
    return (_0x23a126 + Date.now()).slice(0, 16);
  }
  async ["__genAlgo"]() {
    this.time = Date.now();
    this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
    let {
      data: _0x3b9a02
    } = await axios.post("https://cactus.jd.com/request_algo?g_ty=ajax", {
      "version": "3.0",
      "fp": this.fp,
      "appId": this[appId].toString(),
      "timestamp": this.time,
      "platform": "web",
      "expandParams": ""
    }, {
      "headers": {
        "Host": "cactus.jd.com",
        "accept": "application/json",
        "content-type": "application/json",
        "user-agent": this.ua
      }
    });
    this.tk = _0x3b9a02.data.result.tk;
    this.rd = _0x3b9a02.data.result.algo.match(/rd='(.*)'/)[1];
    this.enc = _0x3b9a02.data.result.algo.match(/algo\.(.*)\(/)[1];
  }
  ["__genKey"](_0x510906, _0xd16fdc, _0x1fa22e, _0x611a6a, _0x4a6b24) {
    let _0x356b0c = "" + _0x510906 + _0xd16fdc + _0x1fa22e + _0x611a6a + this.rd;
    return _0x4a6b24[this.enc](_0x356b0c, _0x510906);
  }
  ["__genH5st"](_0x2beedd) {
    let _0x50284a = this.__genKey(this.tk, this.fp, this.timestamp, this[appId], CryptoJS).toString(CryptoJS.enc.Hex),
      _0x2a2e8e = "";
    for (let _0x1b05c4 of Object.keys(_0x2beedd)) {
      _0x1b05c4 === "body" ? _0x2a2e8e += _0x1b05c4 + ":" + CryptoJS.SHA256(_0x2beedd[_0x1b05c4]).toString(CryptoJS.enc.Hex) + "&" : _0x2a2e8e += _0x1b05c4 + ":" + _0x2beedd[_0x1b05c4] + "&";
    }
    _0x2a2e8e = _0x2a2e8e.slice(0, -1);
    _0x2a2e8e = CryptoJS.HmacSHA256(_0x2a2e8e, _0x50284a).toString(CryptoJS.enc.Hex);
    return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this[appId].toString() + ";" + this.tk + ";" + _0x2a2e8e + ";3.0;" + this.time.toString());
  }
}
const _0x15d040 = {
  "getbody": _0x15774a
};
module.exports = _0x15d040;