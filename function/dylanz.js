const _0x560bc2 = require("crypto-js"),
    _0x273236 = require("got");
function _0x4e50ab() {
    var _0x3d0d29,
        _0x39ada6 = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0xf69ea = _0x39ada6.size,
        _0x2ec218 = "undefined" === _0xf69ea ? 10 : _0xf69ea,
        _0x30f406 = _0x39ada6.dictType,
        _0x1e72db = _0x39ada6.num,
        _0x31a309 = "";
    if (_0x1e72db && "string" == typeof _0x1e72db) {
        _0x3d0d29 = _0x1e72db;
    }
    for (; _0x2ec218--;) {
        _0x31a309 += _0x3d0d29[Math.floor(Math.random() * _0x3d0d29.length)];
    }
    return _0x31a309;
}
function _0x57767f() {
    var _0x138f09 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0x32d0ca = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0x2f78a5 = new Date(_0x138f09),
        _0x441630 = _0x32d0ca,
        _0xfec882 = {
            "M+": _0x2f78a5.getMonth() + 1,
            "d+": _0x2f78a5.getDate(),
            "D+": _0x2f78a5.getDate(),
            "h+": _0x2f78a5.getHours(),
            "H+": _0x2f78a5.getHours(),
            "m+": _0x2f78a5.getMinutes(),
            "s+": _0x2f78a5.getSeconds(),
            "w+": _0x2f78a5.getDay(),
            "q+": Math.floor((_0x2f78a5.getMonth() + 3) / 3),
            "S+": _0x2f78a5.getMilliseconds()
        };
    /(y+)/i.test(_0x441630) && (_0x441630 = _0x441630.replace(RegExp.$1, "".concat(_0x2f78a5.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0xfec882).forEach(function (_0x6bea63) {
        if (new RegExp("(".concat(_0x6bea63, ")")).test(_0x441630)) {
            var _0x81f18c = "S+" === _0x6bea63 ? "000" : "00";
            _0x441630 = _0x441630.replace(RegExp.$1, 1 == RegExp.$1.length ? _0xfec882[_0x6bea63] : "".concat(_0x81f18c).concat(_0xfec882[_0x6bea63]).substr("".concat(_0xfec882[_0x6bea63]).length));
        }
    });
    return _0x441630;
}
function _0x39473a(_0x309b2a, _0x3db74d, _0xdf6d05, _0x4ea42a) {
    let _0x503978 = {
        "version": "400",
        "fp": _0x3db74d,
        "appId": _0x309b2a,
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": ""
    };
    _0x503978.expandParams = _0x4ea42a || "";
    const _0x22126e = {
        "Host": "cactus.jd.com",
        "Content-Type": "application/json",
        "User-agent": _0xdf6d05
    };
    let _0x32432b = {
        "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
        "body": JSON.stringify(_0x503978),
        "headers": _0x22126e,
        "timeout": 10000
    };
    return new Promise(async _0x758ef1 => {
        _0x2d3e6a(_0x32432b, (_0x2aada2, _0x3ffb11, _0x4f6379) => {
            try {
                if (_0x2aada2) {
                    console.log("" + JSON.stringify(_0x2aada2));
                    console.log("getgo请求失败，请检查网路重试");
                } else {
                    _0x4f6379 = JSON.parse(_0x4f6379);
                    _0x4f6379 = _0x4f6379.data.result;
                }
            } catch (_0x1605f0) {
                console(_0x1605f0, _0x3ffb11);
            } finally {
                _0x758ef1(_0x4f6379);
            }
        });
    });
}
function _0x2c1fb0() {
    var _0x194b46 = "i1uct6d0jh";
    let _0x5a3426 = [],
        _0x33b838 = _0x194b46.length,
        _0x1f4b9d = 4;
    for (let _0x16cd3a = 0; _0x16cd3a < 10; _0x16cd3a++) {
        let _0x5d106c = _0x194b46[_0x16cd3a];
        if (Math.random() * _0x33b838 < _0x1f4b9d) {
            _0x5a3426.push(_0x5d106c);
            if (--_0x1f4b9d === 0) {
                break;
            }
        }
        _0x33b838--;
    }
    for (var _0x5b3e3e = "", _0x5ab87d = 0; _0x5ab87d < _0x5a3426.length; _0x5ab87d++) {
        var _0x5d58d6 = Math.random() * (_0x5a3426.length - _0x5ab87d) | 0;
        _0x5b3e3e += _0x5a3426[_0x5d58d6];
        _0x5a3426[_0x5d58d6] = _0x5a3426[_0x5a3426.length - _0x5ab87d - 1];
    }
    let _0x4bc166 = _0x5b3e3e;
    var _0x573a87 = Math.random() * 10 | 0;
    let _0x47477b = _0x194b46;
    for (let _0x3f36ee = 0; _0x3f36ee < _0x4bc166.length; _0x3f36ee++) {
        let _0x227fee = _0x47477b.indexOf(_0x4bc166[_0x3f36ee]);
        _0x227fee !== -1 && (_0x47477b = _0x47477b.replace(_0x4bc166[_0x3f36ee], ""));
    }
    let _0x26b578 = _0x47477b;
    var _0x34804a = {};
    _0x34804a.size = _0x573a87;
    _0x34804a.num = _0x26b578;
    var _0x2a39e6 = _0x1da01f(_0x34804a) + _0x4bc166 + _0x1da01f({
        "size": 12 - _0x573a87 - 1,
        "num": _0x26b578
    }) + _0x573a87,
        _0x2b230d = _0x2a39e6.split(""),
        _0x41f969 = _0x2b230d.slice(0, 9),
        _0x2c33fb = _0x2b230d.slice(9),
        _0x5a2e53 = [];
    for (; _0x41f969.length > 0;) {
        _0x5a2e53.push((35 - parseInt(_0x41f969.pop(), 36)).toString(36));
    }
    _0x5a2e53 = _0x5a2e53.concat(_0x2c33fb);
    var _0x474c63 = _0x5a2e53.join("");
    return _0x474c63;
}
function _0x1da01f(_0x15cd55) {
    let _0x3d2d31 = _0x15cd55.size,
        _0x25e03a = _0x15cd55.num;
    let _0x49ec4b = "";
    for (; _0x3d2d31--;) {
        _0x49ec4b += _0x25e03a[Math.random() * _0x25e03a.length | 0];
    }
    return _0x49ec4b;
}
async function _0x4acd65(_0x2b3932) {
    let _0x1632cd = _0x2c1fb0(),
        {
            body: _0x246372,
            ua: _0x1d2268,
            user: _0xf4bd48,
            ver: _0x3372de,
            cl: _0x148fa8,
            fn: _0x18f1a6,
            appId: _0x13ba9e,
            code: _0x3ec9c2,
            apid: _0x2b630a,
            xcr: _0x3080ae
        } = _0x2b3932,
        _0x44b7fd = _0x4e50ab({
            "size": 10,
            "num": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        });
    let _0x3b2eda = _0x4e50ab({
        "size": 10,
        "num": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    });
    _0x246372 = typeof _0x246372 !== "string" ? JSON.stringify(_0x246372) : _0x246372;
    let _0x43f09d = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re", "random"],
        _0x285e5c = {};
    const _0x267726 = {
        "p1": _0xf4bd48,
        "p2": _0xf4bd48
    };
    let _0x49e643 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x1d2268, _0x1d2268.match(/\(([^\)]+)\)/)[1], _0x267726, "", 393, 873, 393, 779, "", "", 2.75, "", _0x44b7fd];
    for (let _0x154932 in _0x43f09d) {
        _0x285e5c[_0x43f09d[_0x154932]] = _0x49e643[_0x154932];
    }
    const _0x4105a0 = {
        "ai": _0x13ba9e,
        "fp": _0x1632cd
    };
    const _0x530e88 = {
        ..._0x285e5c,
        ..._0x4105a0
    };
    let _0x4ce334 = _0x530e88,
        _0x8d6899 = _0x560bc2.AES.encrypt(JSON.stringify(_0x4ce334, null, 2), _0x560bc2.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
            "iv": _0x560bc2.enc.Utf8.parse("0102030405060708"),
            "mode": _0x560bc2.mode.CBC,
            "padding": _0x560bc2.pad.Pkcs7
        }),
        _0xe52148 = _0x8d6899.ciphertext.toString(),
        _0x4123a3 = new Date().getTime(),
        _0x1602b4 = await _0x39473a(_0x13ba9e, _0x1632cd, _0x1d2268, _0xe52148);
    let _0x5959a5 = new Date().getTime(),
        _0x4c3e2a = _0x57767f(_0x5959a5, "yyyyMMddhhmmssSSS"),
        _0x31b6c5 = _0x4c3e2a + "66",
        _0x1ca0ec = _0x1602b4.tk;
    let _0xb5ad15 = new Function("return " + _0x1602b4.algo)();
    let _0x1e25a9 = await _0xb5ad15(_0x1ca0ec, _0x1632cd, _0x31b6c5, _0x13ba9e, _0x560bc2).toString();
    const _0x1356d7 = {
        "appid": _0x2b630a,
        "functionId": _0x18f1a6,
        "body": _0x246372,
        "clientVersion": _0x3372de,
        "client": _0x148fa8
    };
    if (_0x3ec9c2) {
        _0x1356d7.t = _0x4123a3;
    }
    Date.now() > "1680278400000" && (_0x1356d7.functionId = "");
    let _0x59e57a = ["appid", "body", "client", "clientVersion", "functionId", "t"],
        _0x5c3ece = _0x59e57a.filter(_0x3929ee => _0x1356d7[_0x3929ee]).map(_0x4c9ef9 => _0x4c9ef9 + ":" + (_0x4c9ef9 == "body" ? _0x560bc2.SHA256(_0x1356d7[_0x4c9ef9]).toString() : _0x1356d7[_0x4c9ef9])).join("&"),
        _0x5ec50f = _0x560bc2.HmacSHA1(_0x5c3ece, _0x1e25a9).toString(_0x560bc2.enc.Hex),
        _0x4c476d = "",
        _0x5ed497 = {
            "sua": _0x1d2268.match(/\(([^\)]+)\)/)[1],
            "pp": {},
            "fp": _0x1632cd,
            "random": _0x3b2eda
        };
    _0x5ed497.pp.p1 = _0xf4bd48;
    _0x5ed497.pp.p2 = _0xf4bd48;
    let _0x25ef1a = _0x560bc2.AES.encrypt(JSON.stringify(_0x5ed497, null, 2), _0x560bc2.enc.Utf8.parse("n1nJA1s[uoyl982f"), {
        "iv": _0x560bc2.enc.Utf8.parse("0102030405060708"),
        "mode": _0x560bc2.mode.CBC,
        "padding": _0x560bc2.pad.Pkcs7
    });
    _0x4c476d = _0x25ef1a.ciphertext.toString();
    let _0x30beab = [_0x4c3e2a, _0x1632cd, _0x13ba9e, _0x1ca0ec, _0x5ec50f, 400, _0x5959a5, _0x4c476d].join(";");
    return "functionId=" + _0x18f1a6 + "&body=" + encodeURIComponent(_0x246372) + "&appid=" + _0x2b630a + "&client=" + _0x148fa8 + "&clientVersion=" + _0x3372de + "&" + (_0x3ec9c2 ? "t=" + _0x4123a3 + "&" : "") + "h5st=" + encodeURIComponent(_0x30beab);
}
function _0x2d3e6a(_0x3054ee, _0x2393e0 = () => { }) {
    const {
        url: _0x5438c3,
        ..._0x3d3ce5
    } = _0x3054ee;
    _0x273236.post(_0x5438c3, _0x3d3ce5).then(_0xa6f241 => {
        const {
            statusCode: _0x41bb85,
            statusCode: _0x2ab106,
            headers: _0x58fb6f,
            body: _0xebb12c
        } = _0xa6f241,
            _0x21e16b = {
                "status": _0x41bb85,
                "statusCode": _0x2ab106,
                "headers": _0x58fb6f,
                "body": _0xebb12c
            };
        _0x2393e0(null, _0x21e16b, _0xebb12c);
    }, _0xda7ff7 => {
        const {
            message: _0x19a6ce,
            response: _0x39bcb7
        } = _0xda7ff7;
        _0x2393e0(_0x19a6ce, _0x39bcb7, _0x39bcb7 && _0x39bcb7.body);
    });
}
class _0x3428e6 {
    constructor(_0x3dda3a, _0x628144, _0x17e151) {
        this.appId = _0x3dda3a;
        this.ua = _0x628144;
        this.fp = _0x17e151 || this.__genFp();
    }
    ["__genFp"]() {
        let _0x4dc02d = "0123456789";
        let _0xa95767 = 13;
        let _0xf29b48 = "";
        for (; _0xa95767--;) {
            _0xf29b48 += _0x4dc02d[Math.random() * _0x4dc02d.length | 0];
        }
        return (_0xf29b48 + Date.now()).slice(0, 16);
    }
    async ["__genAlgo"]() {
        this.time = Date.now();
        this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
        let {
            data: _0xf60969
        } = await axios.post("https://cactus.jd.com/request_algo?g_ty=ajax", {
            "version": "3.0",
            "fp": this.fp,
            "appId": this.appId.toString(),
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
        this.tk = _0xf60969.data.result.tk;
        this.rd = _0xf60969.data.result.algo.match(/rd='(.*)'/)[1];
        this.enc = _0xf60969.data.result.algo.match(/algo\.(.*)\(/)[1];
    }
    ["__genKey"](_0x3eda6d, _0x2d5b09, _0x5d8fa7, _0x4e2a72, _0x525e40) {
        let _0xff94da = "" + _0x3eda6d + _0x2d5b09 + _0x5d8fa7 + _0x4e2a72 + this.rd;
        return _0x525e40[this.enc](_0xff94da, _0x3eda6d);
    }
    ["__genH5st"](_0x345425) {
        let _0x5504f4 = this.__genKey(this.tk, this.fp, this.timestamp, this.appId, CryptoJS).toString(CryptoJS.enc.Hex);
        let _0x4544a3 = "";
        for (let _0x4f88b7 of Object.keys(_0x345425)) {
            _0x4f88b7 === "body" ? _0x4544a3 += _0x4f88b7 + ":" + CryptoJS.SHA256(_0x345425[_0x4f88b7]).toString(CryptoJS.enc.Hex) + "&" : _0x4544a3 += _0x4f88b7 + ":" + _0x345425[_0x4f88b7] + "&";
        }
        _0x4544a3 = _0x4544a3.slice(0, -1);
        _0x4544a3 = CryptoJS.HmacSHA256(_0x4544a3, _0x5504f4).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this.appId.toString() + ";" + this.tk + ";" + _0x4544a3 + ";3.0;" + this.time.toString());
    }
}
const _0x15a036 = {
    "getbody": _0x4acd65
};
module.exports = _0x15a036;