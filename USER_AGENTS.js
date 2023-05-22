function _0x3f24c4(_0x16f52a) {
  let _0x457ae9 = "0123456789abcdef",
    _0x89b519 = "";
  for (let _0x20a762 = 0; _0x20a762 < _0x16f52a; _0x20a762++) {
    _0x89b519 += _0x457ae9[Math.ceil(100000000 * Math.random()) % _0x457ae9.length];
  }
  return _0x89b519;
}

function _0x236b64(arr, _0x444f12) {
  let _0x433350 = new Array();
  for (let _0x52f677 in arr) {
    _0x433350.push(arr[_0x52f677]);
  }
  let _0x1ecefb = new Array();
  for (let _0x3368d3 = 0; _0x3368d3 < _0x444f12; _0x3368d3++) {
    if (_0x433350.length > 0) {
      let _0x455ec8 = Math.floor(Math.random() * _0x433350.length);
      _0x1ecefb[_0x3368d3] = _0x433350[_0x455ec8];
      _0x433350.splice(_0x455ec8, 1);
    } else {
      break;
    }
  }
  return _0x1ecefb;
}

function UARAM(tjb=false) {
  const dictionary={"A":"K","B":"L","C":"M","D":"N","E":"O","F":"P","G":"Q","H":"R","I":"S","J":"T","K":"A","L":"B","M":"C","N":"D","O":"E","P":"F","Q":"G","R":"H","S":"I","T":"J","e":"o","f":"p","g":"q","h":"r","i":"s","j":"t","k":"u","l":"v","m":"w","n":"x","o":"e","p":"f","q":"g","r":"h","s":"i","t":"j","u":"k","v":"l","w":"m","x":"n"};
  const _0x1cd700 = {
    "ud": "",
    "sv": "",
    "iad": ""
  };
  let sv = _0x236b64([12, 13, 14, 15, 16], 1) + "." + _0x236b64([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1) + "." + _0x236b64([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1),
    _0x4d5e80 = _0x236b64([9, 10, 11], 1) + "." + _0x236b64([0, 1, 2, 3, 4, 5, 6, 7, 8], 1) + "." + _0x236b64([0, 1, 2, 3, 4, 5], 1),
    _0x16e12c = _0x236b64([4, 5, 6], 1) + "." + _0x236b64([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1) + "." + _0x236b64([0, 1, 2, 3, 4, 5], 1),
    ep = {
      "ciphertype": 5,
      "cipher": _0x1cd700,
      "ts": parseInt(new Date().getTime() / 1000),
      "hdid": "",
      "version": "1.0.3",
      "appname": "",
      "ridx": -1
    };
  ep.cipher.sv = new Buffer.from(sv).toString("base64").split("").map(_0x49219d => dictionary[_0x49219d] || _0x49219d).join("");
  ep.cipher.ud = new Buffer.from(_0x3f24c4(40)).toString("base64").split("").map(_0x2db617 => dictionary[_0x2db617] || _0x2db617).join("");
  ep.appname = "com.360buy.jdmobile";
  ep.hdid = "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=";
  let _0x26d294 = "jdapp;iPhone;" + _0x4d5e80 + ";;;M/5.0;appBuild/168341;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify(ep)) + ";Mozilla/5.0 (iPhone; CPU iPhone OS " + sv.replace(/\./g, "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
  ep.appname = "com.jd.jdmobilelite";
  ep.hdid = "ViZLFbOc+bY6wW3m9/8iSFjgglIbmHPOGSM9aXIoBes=";
  ep.ridx = 1;
  let _0x579fcc = "jdltapp;iPhone;" + _0x16e12c + ";;;M/5.0;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;hasOCPay/0;appBuild/1338;supportBestPay/0;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify(ep)) + ";Mozilla/5.0 (iPhone; CPU iPhone OS " + sv.replace(/\./g, "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
  return tjb ? _0x579fcc : _0x26d294;
}

module.exports = {
  "USER_AGENT": UARAM(),
  "UARAM": UARAM
};