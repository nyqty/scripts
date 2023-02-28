const _0x596d79 = require("crypto-js");
const _0x54fa65 = require("got");
const _0x2f4091 = {};
function _0x23a6fd(_0xd11ca3) {
    if (_0xd11ca3 === "3.1") {
        var _0x3ceed6 = "",
            _0x13e8b5 = "0123456789",
            _0x327a4f = _0x13e8b5,
            _0x3163ff = Math.floor(Math.random() * 10),
            _0x5e66f2,
            _0x39257d = 12;
        do {
            const _0x50b297 = {
                "size": 1,
                "num": _0x13e8b5
            };
            _0x5e66f2 = _0x5bd956(_0x50b297);
            _0x3ceed6.indexOf(_0x5e66f2) == -1 && (_0x3ceed6 += _0x5e66f2);
        } while (_0x3ceed6.length < 3);
        for (let _0xd86169 of _0x3ceed6.slice()) {
            _0x327a4f = _0x327a4f.replace(_0xd86169, "");
        }
        const _0x2e440b = {
            "size": _0x3163ff,
            "num": _0x327a4f
        };
        var _0x41068a = _0x5bd956(_0x2e440b) + _0x3ceed6 + _0x5bd956({
            "size": _0x39257d - _0x3163ff,
            "num": _0x327a4f
        }) + _0x3163ff,
            _0x28a3ab = _0x41068a.split(""),
            _0x5e9c7a = [];
        for (; _0x28a3ab.length;) {
            _0x5e9c7a.push(9 - parseInt(_0x28a3ab.pop()));
        }
        _0x41068a = _0x5e9c7a.join("");
    } else {
        var _0x39257d = 12,
            _0x3ceed6 = "",
            _0x13e8b5 = "0123456789",
            _0x327a4f = _0x13e8b5,
            _0x3163ff = Math.floor(Math.random() * 10),
            _0x5e66f2;
        do {
            const _0x18f16c = {
                "size": 1,
                "num": _0x13e8b5
            };
            _0x5e66f2 = _0x5bd956(_0x18f16c);
            _0x3ceed6.indexOf(_0x5e66f2) == -1 && (_0x3ceed6 += _0x5e66f2);
        } while (_0x3ceed6.length < 3);
        for (let _0x1e7f5e of _0x3ceed6.slice()) {
            _0x327a4f = _0x327a4f.replace(_0x1e7f5e, "");
        }
        const _0x576c9c = {
            "size": _0x3163ff,
            "num": _0x327a4f
        };
        var _0x41068a = _0x5bd956(_0x576c9c) + _0x3ceed6 + _0x5bd956({
            "size": _0x39257d - _0x3163ff,
            "num": _0x327a4f
        }) + _0x3163ff;
    }
    return _0x41068a;
}
function _0x5bd956() {
    var _0x4d1db8,
        _0x46b639 = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0x515021 = _0x46b639.size,
        _0x354882 = "undefined" === _0x515021 ? 10 : _0x515021,
        _0x1103b4 = _0x46b639.dictType,
        _0x4222ed = _0x46b639.num,
        _0x3dad07 = "";
    if (_0x4222ed && "string" == typeof _0x4222ed) {
        _0x4d1db8 = _0x4222ed;
    }
    for (; _0x354882--;) {
        _0x3dad07 += _0x4d1db8[Math.floor(Math.random() * _0x4d1db8.length)];
    }
    return _0x3dad07;
}
function _0x12fe11() {
    var _0x4d70e6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0x164955 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0x5da2b3 = new Date(_0x4d70e6),
        _0x2cc6ed = _0x164955,
        _0x5e5950 = {
            "M+": _0x5da2b3.getMonth() + 1,
            "d+": _0x5da2b3.getDate(),
            "D+": _0x5da2b3.getDate(),
            "h+": _0x5da2b3.getHours(),
            "H+": _0x5da2b3.getHours(),
            "m+": _0x5da2b3.getMinutes(),
            "s+": _0x5da2b3.getSeconds(),
            "w+": _0x5da2b3.getDay(),
            "q+": Math.floor((_0x5da2b3.getMonth() + 3) / 3),
            "S+": _0x5da2b3.getMilliseconds()
        };
    /(y+)/i.test(_0x2cc6ed) && (_0x2cc6ed = _0x2cc6ed.replace(RegExp.$1, "".concat(_0x5da2b3.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0x5e5950).forEach(function (_0x2e1a4d) {
        if (new RegExp("(".concat(_0x2e1a4d, ")")).test(_0x2cc6ed)) {
            var _0x164e2f = "S+" === _0x2e1a4d ? "000" : "00";
            _0x2cc6ed = _0x2cc6ed.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x5e5950[_0x2e1a4d] : "".concat(_0x164e2f).concat(_0x5e5950[_0x2e1a4d]).substr("".concat(_0x5e5950[_0x2e1a4d]).length));
        }
    });
    return _0x2cc6ed;
}
function _0x1777e7(_0x407604, _0x4e5d98, _0x37c4b2, _0x3c3a3b, _0x34993d) {
    let _0x411617 = {
        "version": _0x34993d,
        "fp": _0x4e5d98,
        "appId": _0x407604,
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": ""
    };
    _0x411617.expandParams = _0x3c3a3b || "";
    const _0xe63016 = {
        "Host": "cactus.jd.com",
        "Content-Type": "application/json",
        "User-agent": _0x37c4b2
    };
    let _0xfd984d = {
        "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
        "body": JSON.stringify(_0x411617),
        "headers": _0xe63016,
        "timeout": 10000
    };
    return new Promise(async _0x276bf2 => {
        _0xfd836d(_0xfd984d, (_0x166b23, _0x1bcd83, _0x5946df) => {
            try {
                if (_0x166b23) {
                    console.log("" + JSON.stringify(_0x166b23));
                    console.log("getgo 请求失败，请检查网路重试");
                } else {
                    _0x5946df = JSON.parse(_0x5946df);
                    _0x5946df = _0x5946df.data.result;
                }
            } catch (_0x2726ac) {
                console(_0x2726ac, _0x1bcd83);
            } finally {
                _0x276bf2(_0x5946df);
            }
        });
    });
}
async function _0xc3cc9e(_0x6d7030) {
    let _0x3f4664 = "3.1",
        {
            body: _0x52f4a8,
            ua: _0x3a0ee9,
            user: _0x1acb9c,
            ver: _0x1b1a70,
            cl: _0x1affd8,
            fn: _0x512e9c,
            appId: _0x4da009,
            code: _0x4c3bcb,
            apid: _0x2e36af,
            flag: _0x221c64
        } = _0x6d7030;
    if (!_0x2f4091[_0x4da009] || _0x221c64) {
        _0x2f4091[_0x4da009] = {};
        _0x2f4091[_0x4da009].fp = _0x23a6fd(_0x3f4664);
    }
    _0x52f4a8 = typeof _0x52f4a8 !== "string" ? JSON.stringify(_0x52f4a8) : _0x52f4a8;
    let _0x451cac = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re"],
        _0x22b2be = {};
    const _0xe0f08b = {
        "p1": _0x1acb9c
    };
    let _0x283643 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x3a0ee9, _0x3a0ee9.match(/\(([^\)]+)\)/)[1], _0xe0f08b, "", 393, 873, 393, 779, "", "", 2.75, ""];
    for (let _0x43eb42 in _0x451cac) {
        _0x22b2be[_0x451cac[_0x43eb42]] = _0x283643[_0x43eb42];
    }
    const _0x52e5e5 = {
        "ai": _0x4da009,
        "fp": _0x2f4091[_0x4da009].fp
    };
    const _0x2f1bbd = {
        ..._0x22b2be,
        ..._0x52e5e5
    };
    let _0x3097e8 = _0x2f1bbd;
    let _0x354e09 = _0x596d79.AES.encrypt(JSON.stringify(_0x3097e8, null, 2), _0x596d79.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
        "iv": _0x596d79.enc.Utf8.parse("0102030405060708"),
        "mode": _0x596d79.mode.CBC,
        "padding": _0x596d79.pad.Pkcs7
    }),
        _0x21a817 = _0x354e09.ciphertext.toString(),
        _0x2b0f5a = new Date().getTime();
    if (!_0x2f4091[_0x4da009].tk || _0x221c64) {
        let _0x34ec3d = await _0x1777e7(_0x4da009, _0x2f4091[_0x4da009].fp, _0x3a0ee9, _0x21a817, _0x3f4664);
        _0x2f4091[_0x4da009].tk = _0x34ec3d.tk;
        _0x2f4091[_0x4da009].algo = _0x34ec3d.algo;
    }
    let _0x403ddc = new Date().getTime(),
        _0x5d4825 = _0x12fe11(_0x403ddc, "yyyyMMddhhmmssSSS"),
        _0x143c48 = _0x2f4091[_0x4da009].tk,
        _0x5a4231 = new Function("return " + _0x2f4091[_0x4da009].algo)();
    let _0x46ef80 = await _0x5a4231(_0x143c48, _0x2f4091[_0x4da009].fp, _0x5d4825, _0x4da009, _0x596d79).toString();
    const _0x1a368b = {
        "appid": _0x2e36af,
        "functionId": _0x512e9c,
        "body": _0x52f4a8,
        "clientVersion": _0x1b1a70,
        "client": _0x1affd8
    };
    if (_0x4c3bcb) {
        _0x1a368b.t = _0x2b0f5a;
    }
    Date.now() > "1680278400000" && (_0x1a368b.functionId = "");
    let _0x2a29bf = ["appid", "body", "client", "clientVersion", "functionId", "t"],
        _0x1c0a4f = _0x2a29bf.filter(_0x3a2772 => _0x1a368b[_0x3a2772]).map(_0x1e9abf => _0x1e9abf + ":" + (_0x1e9abf == "body" ? _0x596d79.SHA256(_0x1a368b[_0x1e9abf]).toString() : _0x1a368b[_0x1e9abf])).join("&"),
        _0x4a6360 = _0x596d79.HmacSHA256(_0x1c0a4f, _0x46ef80).toString(_0x596d79.enc.Hex),
        _0x32a7f8 = "";
    let _0x50f284 = {
        "sua": _0x3a0ee9.match(/\(([^\)]+)\)/)[1],
        "pp": {},
        "fp": _0x2f4091[_0x4da009].fp
    };
    _0x50f284.pp.p1 = _0x1acb9c;
    let _0x38e17a = _0x596d79.AES.encrypt(JSON.stringify(_0x50f284, null, 2), _0x596d79.enc.Utf8.parse("wm0!@w_s#ll1flo("), {
        "iv": _0x596d79.enc.Utf8.parse("0102030405060708"),
        "mode": _0x596d79.mode.CBC,
        "padding": _0x596d79.pad.Pkcs7
    });
    _0x32a7f8 = _0x38e17a.ciphertext.toString();
    __dirname.split(/[\\/]/).pop() !== "function" && (_0x5d4825 = _0x5d4825 - 1);
    let _0x5e25d7 = [_0x5d4825, _0x2f4091[_0x4da009].fp, _0x4da009, _0x143c48, _0x4a6360, _0x3f4664, _0x403ddc, _0x32a7f8].join(";");
    return "functionId=" + _0x512e9c + "&body=" + encodeURIComponent(_0x52f4a8) + "&t=" + _0x2b0f5a + "&appid=" + _0x2e36af + "&client=" + _0x1affd8 + "&clientVersion=" + _0x1b1a70 + "&h5st=" + encodeURIComponent(_0x5e25d7);
}
function _0xfd836d(_0x299cc6, _0x6ae723 = () => { }) {
    const {
        url: _0x50c158,
        ..._0x196450
    } = _0x299cc6;
    _0x54fa65.post(_0x50c158, _0x196450).then(_0x1ed3da => {
        const {
            statusCode: _0x3ca5a1,
            statusCode: _0x40e2ee,
            headers: _0x7f1bb7,
            body: _0x545269
        } = _0x1ed3da,
            _0x119102 = {
                "status": _0x3ca5a1,
                "statusCode": _0x40e2ee,
                "headers": _0x7f1bb7,
                "body": _0x545269
            };
        _0x6ae723(null, _0x119102, _0x545269);
    }, _0x3c520d => {
        const {
            message: _0x2bac09,
            response: _0x49d86d
        } = _0x3c520d;
        _0x6ae723(_0x2bac09, _0x49d86d, _0x49d86d && _0x49d86d.body);
    });
}
class _0x1bfc1c {
    constructor(_0x16e41b, _0x10c4c8, _0x226518) {
        this[_0x16e41b] = _0x16e41b;
        this.ua = _0x10c4c8;
        this.fp = _0x226518 || this.__genFp();
    }
    ["__genFp"]() {
        let _0x22f1d2 = "0123456789";
        let _0x4da105 = 13;
        let _0x3ed207 = "";
        for (; _0x4da105--;) {
            _0x3ed207 += _0x22f1d2[Math.random() * _0x22f1d2.length | 0];
        }
        return (_0x3ed207 + Date.now()).slice(0, 16);
    }
    async ["__genAlgo"]() {
        this.time = Date.now();
        this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
        let {
            data: _0x2b0e39
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
        this.tk = _0x2b0e39.data.result.tk;
        this.rd = _0x2b0e39.data.result.algo.match(/rd='(.*)'/)[1];
        this.enc = _0x2b0e39.data.result.algo.match(/algo\.(.*)\(/)[1];
    }
    ["__genKey"](_0x216a77, _0x3ddbe7, _0x35070e, _0x3f0bd1, _0xb7315d) {
        let _0x572947 = "" + _0x216a77 + _0x3ddbe7 + _0x35070e + _0x3f0bd1 + this.rd;
        return _0xb7315d[this.enc](_0x572947, _0x216a77);
    }
    ["__genH5st"](_0x469a9c) {
        let _0x6eef8f = this.__genKey(this.tk, this.fp, this.timestamp, this[appId], CryptoJS).toString(CryptoJS.enc.Hex);
        let _0x29307e = "";
        for (let _0x4b7d0d of Object.keys(_0x469a9c)) {
            _0x4b7d0d === "body" ? _0x29307e += _0x4b7d0d + ":" + CryptoJS.SHA256(_0x469a9c[_0x4b7d0d]).toString(CryptoJS.enc.Hex) + "&" : _0x29307e += _0x4b7d0d + ":" + _0x469a9c[_0x4b7d0d] + "&";
        }
        _0x29307e = _0x29307e.slice(0, -1);
        _0x29307e = CryptoJS.HmacSHA256(_0x29307e, _0x6eef8f).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this[appId].toString() + ";" + this.tk + ";" + _0x29307e + ";3.0;" + this.time.toString());
    }
}
const _0x4049e4 = {
    "getbody": _0xc3cc9e
};
module.exports = _0x4049e4;