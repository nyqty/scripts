const DS = require("ds").DS;
function Cache(_0x5c09x2b = 0, _0x5c09x2c = null) {
    let _0x5c09x3d = this;
    _0x5c09x3d.now = function () {
        return new Date().getTime();
    };
    _0x5c09x3d.ttl = _0x5c09x2b || 0;
    if (_0x5c09x2c) {
        _0x5c09x3d.data = new DS(_0x5c09x2c);
    } else {
        _0x5c09x3d.data = new DS();
    }
    let _0x5c09x3e = function () {
        if (_0x5c09x2c) {
            _0x5c09x3d.data.save(_0x5c09x2c);
        }
        return _0x5c09x3d;
    };
    let _0x5c09x3f = function (_0x5c09x40) {
        delete _0x5c09x3d.data[_0x5c09x40];
        _0x5c09x3e();
        return _0x5c09x3d;
    };
    _0x5c09x3d.get = function (_0x5c09x41, _0x5c09x42) {
        let _0x5c09x43 = null;
        let _0x5c09x44 = _0x5c09x3d.data[_0x5c09x41];
        if (_0x5c09x44) {
            if (_0x5c09x44.expires == 0 || _0x5c09x3d.now() < _0x5c09x44.expires) {
                _0x5c09x43 = _0x5c09x44.val;
            } else {
                _0x5c09x43 = null;
                _0x5c09x3f(_0x5c09x41);
            }
        }
        if (_0x5c09x42) {
            _0x5c09x42(_0x5c09x43);
        }
        return _0x5c09x43;
    };
    _0x5c09x3d.del = function (_0x5c09x48, _0x5c09x49) {
        let _0x5c09x4a = _0x5c09x3d.get(_0x5c09x48);
        _0x5c09x3f(_0x5c09x48);
        if (_0x5c09x49) {
            _0x5c09x49(_0x5c09x4a);
        }
        return _0x5c09x4a;
    };
    _0x5c09x3d.put = function (_0x5c09x4b, _0x5c09x4c = null, _0x5c09x2b = 0, _0x5c09x4d) {
        if (_0x5c09x2b == 0) {
            _0x5c09x2b = _0x5c09x3d.ttl;
        }
        let _0x5c09x4e = _0x5c09x2b == 0 ? 0 : _0x5c09x3d.now() + _0x5c09x2b;
        var _0x5c09x4f = _0x5c09x3d.del(_0x5c09x4b);
        if (_0x5c09x4c !== null) {
            _0x5c09x3d.data[_0x5c09x4b] = {
                "expires": _0x5c09x4e,
                "val": _0x5c09x4c
            };
            _0x5c09x3e();
        }
        if (_0x5c09x4d) {
            _0x5c09x4d(_0x5c09x4f);
        }
        return _0x5c09x4f;
    };
}
module.exports = Cache;