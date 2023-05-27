const _0x1f6bf2 = require("crypto-js");
$.UA = "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1663720079628%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%2C%22od%22%3A%22ZQHuZtc3CzCjZtdvZM1rEQO5BJvsD2OjCzPsZwHsZQU2YzKz%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36";
function _0x2153d2(_0x3825d5) {
    if (_0x3825d5 === "3.1") {
        var _0x2e064f = "",
            _0x132340 = "0123456789",
            _0x425cc6 = _0x132340,
            _0x139a42 = Math.floor(Math.random() * 10),
            _0x4e4d44,
            _0x1d55bc = 12;
        do {
            const _0xad1db9 = {
                "size": 1,
                "num": _0x132340
            };
            _0x4e4d44 = _0x56ce30(_0xad1db9);
            _0x2e064f.indexOf(_0x4e4d44) == -1 && (_0x2e064f += _0x4e4d44);
        } while (_0x2e064f.length < 3);
        for (let _0x13a6d0 of _0x2e064f.slice()) {
            _0x425cc6 = _0x425cc6.replace(_0x13a6d0, "");
        }
        const _0x58d9b8 = {
            "size": _0x139a42,
            "num": _0x425cc6
        };
        var _0x370716 = _0x56ce30(_0x58d9b8) + _0x2e064f + _0x56ce30({
            "size": _0x1d55bc - _0x139a42,
            "num": _0x425cc6
        }) + _0x139a42,
            _0x1b6633 = _0x370716.split(""),
            _0x152b71 = [];
        for (; _0x1b6633.length;) {
            _0x152b71.push(9 - parseInt(_0x1b6633.pop()));
        }
        _0x370716 = _0x152b71.join("");
    } else {
        var _0x1d55bc = 12,
            _0x2e064f = "",
            _0x132340 = "0123456789",
            _0x425cc6 = _0x132340,
            _0x139a42 = Math.floor(Math.random() * 10),
            _0x4e4d44;
        do {
            const _0x4be80b = {
                "size": 1,
                "num": _0x132340
            };
            _0x4e4d44 = _0x56ce30(_0x4be80b);
            _0x2e064f.indexOf(_0x4e4d44) == -1 && (_0x2e064f += _0x4e4d44);
        } while (_0x2e064f.length < 3);
        for (let _0x4de570 of _0x2e064f.slice()) {
            _0x425cc6 = _0x425cc6.replace(_0x4de570, "");
        }
        const _0xefd725 = {
            "size": _0x139a42,
            "num": _0x425cc6
        };
        var _0x370716 = _0x56ce30(_0xefd725) + _0x2e064f + _0x56ce30({
            "size": _0x1d55bc - _0x139a42,
            "num": _0x425cc6
        }) + _0x139a42;
    }
    return _0x370716;
}
function _0x56ce30() {
    var _0x427a16,
        _0x27785e = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0x1269c0 = _0x27785e.size,
        _0x46d530 = "undefined" === _0x1269c0 ? 10 : _0x1269c0,
        _0x404e65 = _0x27785e.dictType,
        _0x35f561 = _0x27785e.num,
        _0x58576e = "";
    if (_0x35f561 && "string" == typeof _0x35f561) {
        _0x427a16 = _0x35f561;
    }
    for (; _0x46d530--;) {
        _0x58576e += _0x427a16[Math.floor(Math.random() * _0x427a16.length)];
    }
    return _0x58576e;
}
function _0x290a5e() {
    var _0x2ec151 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0x3bbe68 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0x37b0a3 = new Date(_0x2ec151),
        _0xa3d820 = _0x3bbe68,
        _0x19da69 = {
            "M+": _0x37b0a3.getMonth() + 1,
            "d+": _0x37b0a3.getDate(),
            "D+": _0x37b0a3.getDate(),
            "h+": _0x37b0a3.getHours(),
            "H+": _0x37b0a3.getHours(),
            "m+": _0x37b0a3.getMinutes(),
            "s+": _0x37b0a3.getSeconds(),
            "w+": _0x37b0a3.getDay(),
            "q+": Math.floor((_0x37b0a3.getMonth() + 3) / 3),
            "S+": _0x37b0a3.getMilliseconds()
        };
    /(y+)/i.test(_0xa3d820) && (_0xa3d820 = _0xa3d820.replace(RegExp.$1, "".concat(_0x37b0a3.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0x19da69).forEach(function (_0x1fac3e) {
        if (new RegExp("(".concat(_0x1fac3e, ")")).test(_0xa3d820)) {
            var _0x4c6a63 = "S+" === _0x1fac3e ? "000" : "00";
            _0xa3d820 = _0xa3d820.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x19da69[_0x1fac3e] : "".concat(_0x4c6a63).concat(_0x19da69[_0x1fac3e]).substr("".concat(_0x19da69[_0x1fac3e]).length));
        }
    });
    return _0xa3d820;
}
function _0x1c6edd(_0x3e81fd) {
    let _0x1e0fd1 = {
        "version": "3.1",
        "fp": $.dy[_0x3e81fd].fp,
        "appId": _0x3e81fd,
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": ""
    };
    _0x1e0fd1.expandParams = $.expandParams || "";
    const _0x441b45 = {
        "Host": "cactus.jd.com",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-agent": $.UA
    };
    let _0x447863 = {
        "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
        "body": JSON.stringify(_0x1e0fd1),
        "headers": _0x441b45,
        "timeout": 10000
    };
    return new Promise(async _0x3b9205 => {
        $.post(_0x447863, (_0x2d5cb7, _0x1eadd6, _0x6dac19) => {
            try {
                if (_0x2d5cb7) {
                    console.log("" + JSON.stringify(_0x2d5cb7));
                    console.log("algo请求失败，请检查网路重试");
                } else {
                    _0x6dac19 = JSON.parse(_0x6dac19);
                    let _0x3fd169 = _0x6dac19.data.result;
                    $.dy[_0x3e81fd].tk = _0x3fd169.tk;
                    $.dy[_0x3e81fd].test = new Function("return " + _0x3fd169.algo)();
                }
            } catch (_0x3f9a02) {
                $.logErr(_0x3f9a02, _0x1eadd6);
            } finally {
                _0x3b9205(_0x6dac19);
            }
        });
    });
}
async function _0xcc8bfd(_0x243348, _0x8a78e7, _0x4a628b) {
    let _0x359f05 = "3.1",
        _0x3c44f6 = _0x2153d2(_0x359f05);
    const _0x3fd500 = {
        "fp": _0x3c44f6
    };
    const _0x3f6407 = {
        "_0x4a628b": _0x3fd500
    };
    $.dy = _0x3f6407;
    let _0x4d8e80 = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re"],
        _0x5eaf34 = {},
        _0x225369 = {},
        _0x56da60 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", $.UA, {
            "p1": $.UserName
        }, "", "", 393, 873, 393, 373, "", "", 2.75, ""];
    for (let _0x3078c7 in _0x4d8e80) {
        _0x225369[_0x4d8e80[_0x3078c7]] = _0x56da60[_0x3078c7];
    }
    const _0x7f43e1 = {
        "ai": _0x4a628b,
        "fp": _0x3c44f6
    };
    const _0x52bd3b = {
        ..._0x225369,
        ..._0x7f43e1
    };
    let _0x5a0735 = _0x52bd3b;
    let _0x2837c7 = _0x1f6bf2.AES.encrypt(JSON.stringify(_0x5a0735, null, 2), _0x1f6bf2.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
        "iv": _0x1f6bf2.enc.Utf8.parse("0102030405060708"),
        "mode": _0x1f6bf2.mode.CBC,
        "padding": _0x1f6bf2.pad.Pkcs7
    });
    $.expandParams = _0x2837c7.ciphertext.toString();
    let _0x2054bb = new Date().getTime();
    await _0x1c6edd(_0x4a628b);
    let _0x350005 = new Date().getTime(),
        _0x2c1218 = _0x290a5e(_0x350005, "yyyyMMddhhmmssSSS");
    _0x5eaf34 = $.dy[_0x4a628b];
    _0x5eaf34.enc = await _0x5eaf34.test(_0x5eaf34.tk, _0x3c44f6, _0x2c1218, _0x4a628b, _0x1f6bf2).toString(_0x1f6bf2.enc.Hex);
    let _0xc5f0e2 = {
        "appid": "activities_platform",
        "functionId": _0x243348,
        "body": JSON.stringify(_0x8a78e7),
        "clientVersion": "1.0.0",
        "client": "H5"
    },
        _0xb25ea8 = ["appid", "body", "client", "clientVersion", "functionId", "t"];
    let _0xf71d95 = _0xb25ea8.filter(_0x482ebb => _0xc5f0e2[_0x482ebb]).map(_0x5171f6 => _0x5171f6 + ":" + (_0x5171f6 == "body" ? _0x1f6bf2.SHA256(_0xc5f0e2[_0x5171f6]).toString() : _0xc5f0e2[_0x5171f6])).join("&");
    let _0x29d51a = _0x1f6bf2.HmacSHA256(_0xf71d95, _0x5eaf34.enc).toString(_0x1f6bf2.enc.Hex);
    let _0x38411d = "";
    let _0x3e87aa = {
        "sua": $.UA.match(/\(([^\)]+)\)/)[1],
        "pp": {},
        "fp": _0x3c44f6
    };
    _0x3e87aa.pp.p1 = $.UserName;
    let _0x5d747a = _0x1f6bf2.AES.encrypt(JSON.stringify(_0x3e87aa, null, 2), _0x1f6bf2.enc.Utf8.parse("wm0!@w_s#ll1flo("), {
        "iv": _0x1f6bf2.enc.Utf8.parse("0102030405060708"),
        "mode": _0x1f6bf2.mode.CBC,
        "padding": _0x1f6bf2.pad.Pkcs7
    });
    _0x38411d = _0x5d747a.ciphertext.toString();
    let _0x1c02e2 = [_0x2c1218, _0x3c44f6, _0x4a628b, _0x5eaf34.tk, _0x29d51a, _0x359f05, _0x350005, _0x38411d].join(";");
    return {
        "body": "functionId=" + _0x243348 + "&body=" + encodeURIComponent(JSON.stringify(_0x8a78e7)) + "&h5st=" + encodeURIComponent(_0x1c02e2) + "&client=tjj_m&appid=vipMiddle&_t=" + _0x2054bb + "&clientVersion=3.1.3",
        "fn": _0x243348
    };
}