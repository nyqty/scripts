const _0x5f2189 = require("crypto-js"),
    _0x3e2aec = require("got"),
    _0xb9bf2 = {};
function _0x340ba4(_0x4c2205) {
    if (_0x4c2205 === "3.1") {
        var _0x11504e = "",
            _0x4dd1fb = "0123456789",
            _0x31d55e = _0x4dd1fb,
            _0x271d0d = Math.floor(Math.random() * 10),
            _0x3e2877,
            _0x11ac2f = 12;
        do {
            const _0x3a8b9c = {
                "size": 1,
                "num": _0x4dd1fb
            };
            _0x3e2877 = _0x54a06b(_0x3a8b9c);
            _0x11504e.indexOf(_0x3e2877) == -1 && (_0x11504e += _0x3e2877);
        } while (_0x11504e.length < 3);
        for (let _0x295c38 of _0x11504e.slice()) {
            _0x31d55e = _0x31d55e.replace(_0x295c38, "");
        }
        const _0x519360 = {
            "size": _0x271d0d,
            "num": _0x31d55e
        };
        var _0x5451bc = _0x54a06b(_0x519360) + _0x11504e + _0x54a06b({
            "size": _0x11ac2f - _0x271d0d,
            "num": _0x31d55e
        }) + _0x271d0d,
            _0x490d9b = _0x5451bc.split(""),
            _0x370158 = [];
        for (; _0x490d9b.length;) {
            _0x370158.push(9 - parseInt(_0x490d9b.pop()));
        }
        _0x5451bc = _0x370158.join("");
    } else {
        var _0x11ac2f = 12,
            _0x11504e = "",
            _0x4dd1fb = "0123456789",
            _0x31d55e = _0x4dd1fb,
            _0x271d0d = Math.floor(Math.random() * 10),
            _0x3e2877;
        do {
            const _0x53d1f3 = {
                "size": 1,
                "num": _0x4dd1fb
            };
            _0x3e2877 = _0x54a06b(_0x53d1f3);
            _0x11504e.indexOf(_0x3e2877) == -1 && (_0x11504e += _0x3e2877);
        } while (_0x11504e.length < 3);
        for (let _0x10dc14 of _0x11504e.slice()) {
            _0x31d55e = _0x31d55e.replace(_0x10dc14, "");
        }
        const _0x2b166b = {
            "size": _0x271d0d,
            "num": _0x31d55e
        };
        var _0x5451bc = _0x54a06b(_0x2b166b) + _0x11504e + _0x54a06b({
            "size": _0x11ac2f - _0x271d0d,
            "num": _0x31d55e
        }) + _0x271d0d;
    }
    return _0x5451bc;
}
function _0x54a06b() {
    var _0x40885b,
        _0x5a23fc = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0x453970 = _0x5a23fc.size,
        _0x29fbd9 = "undefined" === _0x453970 ? 10 : _0x453970,
        _0xf4fc4b = _0x5a23fc.dictType,
        _0x28b628 = _0x5a23fc.num,
        _0x592f0a = "";
    if (_0x28b628 && "string" == typeof _0x28b628) {
        _0x40885b = _0x28b628;
    }
    for (; _0x29fbd9--;) {
        _0x592f0a += _0x40885b[Math.floor(Math.random() * _0x40885b.length)];
    }
    return _0x592f0a;
}
function _0x4b1aac() {
    var _0x21f49b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0x459e29 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0xc2b81f = new Date(_0x21f49b),
        _0x52a8a9 = _0x459e29,
        _0x51bfc9 = {
            "M+": _0xc2b81f.getMonth() + 1,
            "d+": _0xc2b81f.getDate(),
            "D+": _0xc2b81f.getDate(),
            "h+": _0xc2b81f.getHours(),
            "H+": _0xc2b81f.getHours(),
            "m+": _0xc2b81f.getMinutes(),
            "s+": _0xc2b81f.getSeconds(),
            "w+": _0xc2b81f.getDay(),
            "q+": Math.floor((_0xc2b81f.getMonth() + 3) / 3),
            "S+": _0xc2b81f.getMilliseconds()
        };
    /(y+)/i.test(_0x52a8a9) && (_0x52a8a9 = _0x52a8a9.replace(RegExp.$1, "".concat(_0xc2b81f.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0x51bfc9).forEach(function (_0x32168c) {
        if (new RegExp("(".concat(_0x32168c, ")")).test(_0x52a8a9)) {
            var _0x3ec034 = "S+" === _0x32168c ? "000" : "00";
            _0x52a8a9 = _0x52a8a9.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x51bfc9[_0x32168c] : "".concat(_0x3ec034).concat(_0x51bfc9[_0x32168c]).substr("".concat(_0x51bfc9[_0x32168c]).length));
        }
    });
    return _0x52a8a9;
}
function _0x3ed325(_0x737eef, _0x33da01, _0x44d1dd, _0x5bab83, _0x329fb5) {
    let _0xba4578 = {
        "version": _0x329fb5,
        "fp": _0x33da01,
        "appId": _0x737eef,
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": ""
    };
    _0xba4578.expandParams = _0x5bab83 || "";
    const _0x2c3e51 = {
        "Host": "cactus.jd.com",
        "Content-Type": "application/json",
        "User-agent": _0x44d1dd
    };
    let _0x35dc94 = {
        "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
        "body": JSON.stringify(_0xba4578),
        "headers": _0x2c3e51,
        "timeout": 30000
    };
    return new Promise(async _0x2ce7e4 => {
        _0x179aa5(_0x35dc94, (_0x177ea0, _0x34522c, _0xe2adac) => {
            try {
                if (_0x177ea0) {
                    console.log("" + JSON.stringify(_0x177ea0));
                    console.log("getgo 请求失败，请检查网路重试");
                } else {
                    _0xe2adac = JSON.parse(_0xe2adac);
                    _0xe2adac = _0xe2adac.data.result;
                }
            } catch (_0x8c3d4a) {
                console(_0x8c3d4a, _0x34522c);
            } finally {
                _0x2ce7e4(_0xe2adac);
            }
        });
    });
}
async function _0x4d94ca(_0x15bc7e) {
    let _0x464ce2 = "3.1",
        {
            body: _0x3cfdd6,
            ua: _0x1e1237,
            user: _0x2adc28,
            ver: _0x577076,
            cl: _0x48d9ae,
            fn: _0x5d734b,
            appId: _0x3dc491,
            code: _0x21c9c0,
            apid: _0x321136,
            flag: _0x2bb6d5
        } = _0x15bc7e;
    if (!_0xb9bf2[_0x3dc491] || _0x2bb6d5) {
        _0xb9bf2[_0x3dc491] = {};
        _0xb9bf2[_0x3dc491].fp = _0x340ba4(_0x464ce2);
    }
    _0x3cfdd6 = typeof _0x3cfdd6 !== "string" ? JSON.stringify(_0x3cfdd6) : _0x3cfdd6;
    let _0x464afb = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re"],
        _0x308217 = {};
    const _0x791523 = {
        "p1": _0x2adc28
    };
    let _0x60c093 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x1e1237, _0x1e1237.match(/\(([^\)]+)\)/)[1], _0x791523, "", 393, 873, 393, 779, "", "", 2.75, ""];
    for (let _0x419769 in _0x464afb) {
        _0x308217[_0x464afb[_0x419769]] = _0x60c093[_0x419769];
    }
    const _0x4c8a50 = {
        "ai": _0x3dc491,
        "fp": _0xb9bf2[_0x3dc491].fp
    };
    const _0x2804d7 = {
        ..._0x308217,
        ..._0x4c8a50
    };
    let _0x4ed200 = _0x2804d7;
    let _0x5b86ff = _0x5f2189.AES.encrypt(JSON.stringify(_0x4ed200, null, 2), _0x5f2189.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
        "iv": _0x5f2189.enc.Utf8.parse("0102030405060708"),
        "mode": _0x5f2189.mode.CBC,
        "padding": _0x5f2189.pad.Pkcs7
    });
    let _0xb05ebd = _0x5b86ff.ciphertext.toString(),
        _0x5db57a = new Date().getTime();
    if (!_0xb9bf2[_0x3dc491].tk || _0x2bb6d5) {
        let _0x333b33 = await _0x3ed325(_0x3dc491, _0xb9bf2[_0x3dc491].fp, _0x1e1237, _0xb05ebd, _0x464ce2);
        _0xb9bf2[_0x3dc491].tk = _0x333b33.tk;
        _0xb9bf2[_0x3dc491].algo = _0x333b33.algo;
    }
    let _0x5d8a5b = new Date().getTime(),
        _0x2a5e1a = _0x4b1aac(_0x5d8a5b, "yyyyMMddhhmmssSSS"),
        _0x1a1532 = _0xb9bf2[_0x3dc491].tk,
        _0x29324e = new Function("return " + _0xb9bf2[_0x3dc491].algo)(),
        _0x54323f = await _0x29324e(_0x1a1532, _0xb9bf2[_0x3dc491].fp, _0x2a5e1a, _0x3dc491, _0x5f2189).toString();
    const _0x5952c9 = {
        "appid": _0x321136,
        "functionId": _0x5d734b,
        "body": _0x3cfdd6,
        "clientVersion": _0x577076,
        "client": _0x48d9ae
    };
    if (_0x21c9c0) {
        _0x5952c9.t = _0x5db57a;
    }
    Date.now() > "1685548801000" && (_0x5952c9.functionId = "");
    let _0x593ce1 = ["appid", "body", "client", "clientVersion", "functionId", "t"],
        _0x2a66a9 = _0x593ce1.filter(_0x277b5b => _0x5952c9[_0x277b5b]).map(_0x2e7b75 => _0x2e7b75 + ":" + (_0x2e7b75 == "body" ? _0x5f2189.SHA256(_0x5952c9[_0x2e7b75]).toString() : _0x5952c9[_0x2e7b75])).join("&"),
        _0x54665f = _0x5f2189.HmacSHA256(_0x2a66a9, _0x54323f).toString(_0x5f2189.enc.Hex);
    let _0xdcff54 = "";
    let _0x3dceea = {
        "sua": _0x1e1237.match(/\(([^\)]+)\)/)[1],
        "pp": {},
        "fp": _0xb9bf2[_0x3dc491].fp
    };
    _0x3dceea.pp.p1 = _0x2adc28;
    let _0x2046cc = _0x5f2189.AES.encrypt(JSON.stringify(_0x3dceea, null, 2), _0x5f2189.enc.Utf8.parse("wm0!@w_s#ll1flo("), {
        "iv": _0x5f2189.enc.Utf8.parse("0102030405060708"),
        "mode": _0x5f2189.mode.CBC,
        "padding": _0x5f2189.pad.Pkcs7
    });
    _0xdcff54 = _0x2046cc.ciphertext.toString();
    __dirname.split(/[\\/]/).pop() !== "function" && (_0x2a5e1a = _0x2a5e1a - 1);
    let _0x2ee79a = [_0x2a5e1a, _0xb9bf2[_0x3dc491].fp, _0x3dc491, _0x1a1532, _0x54665f, _0x464ce2, _0x5d8a5b, _0xdcff54].join(";");
    return "functionId=" + _0x5d734b + "&body=" + encodeURIComponent(_0x3cfdd6) + "&t=" + _0x5db57a + "&appid=" + _0x321136 + "&client=" + _0x48d9ae + "&clientVersion=" + _0x577076 + "&h5st=" + encodeURIComponent(_0x2ee79a);
}
function _0x179aa5(_0x4e57b2, _0x44eee0 = () => { }) {
    const {
        url: _0x18c3f6,
        ..._0x1f278e
    } = _0x4e57b2;
    _0x3e2aec.post(_0x18c3f6, _0x1f278e).then(_0x183f1c => {
        const {
            statusCode: _0xb54e98,
            statusCode: _0x12e075,
            headers: _0x7579d,
            body: _0x5e9202
        } = _0x183f1c,
            _0x5d0d3f = {
                "status": _0xb54e98,
                "statusCode": _0x12e075,
                "headers": _0x7579d,
                "body": _0x5e9202
            };
        _0x44eee0(null, _0x5d0d3f, _0x5e9202);
    }, _0x4797e7 => {
        const {
            message: _0x1fa595,
            response: _0x5404a8
        } = _0x4797e7;
        _0x44eee0(_0x1fa595, _0x5404a8, _0x5404a8 && _0x5404a8.body);
    });
}
class _0x13aed4 {
    constructor(_0x8cbf1e, _0xef8e0e, _0x366420) {
        this[_0x8cbf1e] = _0x8cbf1e;
        this.ua = _0xef8e0e;
        this.fp = _0x366420 || this.__genFp();
    }
    ["__genFp"]() {
        let _0x96cc12 = "0123456789";
        let _0x21e92b = 13,
            _0x3b5176 = "";
        for (; _0x21e92b--;) {
            _0x3b5176 += _0x96cc12[Math.random() * _0x96cc12.length | 0];
        }
        return (_0x3b5176 + Date.now()).slice(0, 16);
    }
    async ["__genAlgo"]() {
        this.time = Date.now();
        this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
        let {
            data: _0x93d4b3
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
        this.tk = _0x93d4b3.data.result.tk;
        this.rd = _0x93d4b3.data.result.algo.match(/rd='(.*)'/)[1];
        this.enc = _0x93d4b3.data.result.algo.match(/algo\.(.*)\(/)[1];
    }
    ["__genKey"](_0x5c2c02, _0x12c9c9, _0x86ba9e, _0x3833be, _0x144fe9) {
        let _0x1c07a1 = "" + _0x5c2c02 + _0x12c9c9 + _0x86ba9e + _0x3833be + this.rd;
        return _0x144fe9[this.enc](_0x1c07a1, _0x5c2c02);
    }
    ["__genH5st"](_0x290e5e) {
        let _0x50de76 = this.__genKey(this.tk, this.fp, this.timestamp, this[appId], CryptoJS).toString(CryptoJS.enc.Hex);
        let _0x54bfb2 = "";
        for (let _0x22dfad of Object.keys(_0x290e5e)) {
            _0x22dfad === "body" ? _0x54bfb2 += _0x22dfad + ":" + CryptoJS.SHA256(_0x290e5e[_0x22dfad]).toString(CryptoJS.enc.Hex) + "&" : _0x54bfb2 += _0x22dfad + ":" + _0x290e5e[_0x22dfad] + "&";
        }
        _0x54bfb2 = _0x54bfb2.slice(0, -1);
        _0x54bfb2 = CryptoJS.HmacSHA256(_0x54bfb2, _0x50de76).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this[appId].toString() + ";" + this.tk + ";" + _0x54bfb2 + ";3.0;" + this.time.toString());
    }
}
const _0x2bc083 = {
    "getbody": _0x4d94ca
};
module.exports = _0x2bc083;