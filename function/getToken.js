const Env = require('../utils/Env.js');
const $ = new Env('getToken');
const API = process.env.JD_SIGN_API || "https://api.nolanstore.top/sign";
async function getToken(_0x3ff2x2b, _0x3ff2x2c) {
  function _0x3ff2x38(_0x3ff2x39, _0x3ff2x3a) {
    let _0x3ff2x48 = {
      "fn": _0x3ff2x39,
      "body": JSON.stringify(_0x3ff2x3a)
    };
    let _0x3ff2x49 = {
      "url": API,
      "body": JSON.stringify(_0x3ff2x48),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 30000
    };
    return new Promise(async _0x3ff2x4a => {
      $.post(_0x3ff2x49, (_0x3ff2x4b, _0x3ff2x4c, _0x3ff2x48) => {
        try {
          if (_0x3ff2x4b) {
            console.log("" + JSON.stringify(_0x3ff2x4b));
            console.log("🚫 getSign API请求失败，请检查网路重试");
          } else {
            _0x3ff2x48 = JSON.parse(_0x3ff2x48);
            if (typeof _0x3ff2x48 === "object" && _0x3ff2x48 && _0x3ff2x48.body) {
              if (_0x3ff2x48.body) {
                $.sign = _0x3ff2x48.body || "";
              }
            } else {
              console.log("获取签名失败，请检查服务状态~");
            }
          }
        } catch (QQ0OO) {
          $.logErr(QQ0OO, _0x3ff2x4c);
        } finally {
          _0x3ff2x4a(_0x3ff2x48);
        }
      });
    });
  }
  await _0x3ff2x38("isvObfuscator", {
    "id": "",
    "url": _0x3ff2x2c
  });
  let _0x3ff2x50 = null;
  let _0x3ff2x51 = {
    "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": _0x3ff2x2b,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + $.sign
  };
  return new Promise(_0x3ff2x52 => {
    $.post(_0x3ff2x51, (_0x3ff2x58, _0x3ff2x59, _0x3ff2x5a) => {
      try {
        if (_0x3ff2x58) {
          $.log(_0x3ff2x58);
        } else {
          if (_0x3ff2x5a) {
            _0x3ff2x5a = JSON.parse(_0x3ff2x5a);
            if (_0x3ff2x5a.code === "0") {
              _0x3ff2x50 = _0x3ff2x5a.token;
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (O0OOO) {
        $.log(O0OOO);
      } finally {
        if (_0x3ff2x50) {
          _0x3ff2x52(_0x3ff2x50);
        } else {
          _0x3ff2x52("");
        }
      }
    });
  });
}
module.exports = getToken;
