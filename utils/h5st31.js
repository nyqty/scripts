const axios = require('axios'),
CryptoJS = require('crypto-js'),
Env=require('./utils/Env.js');

const $ = new Env('H5ST3.1');

Date.prototype.Format = function(fmt) {
    var e,
        n = this,
        d = fmt,
        l = {
            "M+": n.getMonth() + 1,
            "d+": n.getDate(),
            "D+": n.getDate(),
            "h+": n.getHours(),
            "H+": n.getHours(),
            "m+": n.getMinutes(),
            "s+": n.getSeconds(),
            "w+": n.getDay(),
            "q+": Math.floor((n.getMonth() + 3) / 3),
            "S+": n.getMilliseconds()
        };
    /(y+)/i.test(d) && (d = d.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length)));
    for (var k in l) {
        if (new RegExp("(".concat(k, ")")).test(d)) {
            var t, a = "S+" === k ? "000" : "00";
            d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? l[k] : ("".concat(a) + l[k]).substr("".concat(l[k]).length))
        }
    }
    return d;
}

function generateFp2() {
    let e = "0123456789";
    let a = 13;
    let i = '';
    for (; a--;) i += e[Math.random() * e.length | 0];
    return (i + Date.now()).slice(0, 16)
}

function bV() {
    var f,
        g = arguments.length > 0 && 'undefined' !== arguments[0] ? arguments[0] : {},
        h = g.size,
        i = 'undefined' === h ? 10 : h,
        j = g.dictType,
        k = 'undefined' === j ? 'number' : j,
        l = g.num,
        m = '';

    if (l && 'string' == typeof l) {
        f = l;
    }

    for (; i--;) {
        m += f[Math.floor(Math.random() * f.length)];
    }

    return m;
}

function generateFp(g) {
    var i = '',
    j = '0123456789',
    k = j,
    l = Math.floor(Math.random() * 10),
    m,
    n = 12;
    do {
        const t = {
            size: 1,
            num: j
        };
        m = bV(t);
        i.indexOf(m) == -1 && (i += m);
        m = bV(t), i.indexOf(m) == -1 && (i += m);
    } while (i.length < 3);
    for (let u of i.slice()) {
        k = k.replace(u, '');
    }
    const r = {
        size: l,
        num: k
    };
    var o = bV(r) + i + bV({
        size: n - l,
        num: k
    }) + l;
    if (g === '3.1') {
        var p = o.split(''),
            q = [];
        for (; p.length;) {
            q.push(9 - parseInt(p.pop()));
        }
        o = q.join('');
    }
    return o;
}

async function requestAlgo(f) {
    data = {
        version: '3.1',
        fp: $.fp,
        appId: $.appId,
        timestamp: Date.now(),
        platform: 'web',
        expandParams: $.expandParams || ''
    };
    let {data: k} = await axios.post('https://cactus.jd.com/request_algo?g_ty=ajax', data, {headers: {
        Host: 'cactus.jd.com',
        accept: 'application/json',
        'content-type': 'application/json',
        'user-agent':$.UA
    }});
    let m = k.data.result,
        n = new Function('return ' + m.algo)();
    $.dict[f].tk = m.tk;
    $.dict[f].func = n;
}

async function get_h5st31(functionId, body, appId) {
    $.fp = bU($.version);
    $.appId = appId;
    $.dict = {
        [$.appId]: {}
    };
    var j = {}
    const n = {"wc":1,"wd":0,"l":"zh-CN","ls":"zh-CN","ml":0,"pl":0,"av":"","ua":"","sua":"","pp":"","pp1":"","w":393,"h":873,"ow":393,"oh":373,"url":"","og":"","pr":1,"re":"",
    "ai":$.appId,"fp":$.fp};
    var r = CryptoJS.AES.encrypt(JSON.stringify(n, null, 2), CryptoJS.enc.Utf8.parse('wm0!@w-s#ll1flo('), {
            iv: CryptoJS.enc.Utf8.parse('0102030405060708'),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    $.expandParams = r.ciphertext.toString();
    $._start = new Date().getTime();
    await requestAlgo($.appId);
    $.timestamp = new Date().getTime();
    $.ts = new Date($.timestamp).Format("yyyyMMddhhmmssSSS");
    j = $.dict[$.appId];
    j.encrypt = await j.func(j.tk, $.fp, $.ts, $.appId, CryptoJS).toString(CryptoJS.enc.Hex);
    var s = {
        appid: 'jdchoujiang_h5',
        functionId: functionId,
        body: JSON.stringify(body),
        clientVersion: '11.0.2',
        client: 'android',
        t: $._start
    },
        t,
        u;
    let v = ['appid', 'body', 'client', 'clientVersion', 'functionId', 't'];
    delete s.h5st;
    u = s;
    t = v.filter(H => u[H]).map(H => H + ':' + (H == 'body' ? CryptoJS.SHA256(s[H]).toString() : s[H])).join('&');
    let w = {};
    for (let H of v) {
        u[H] && (w[H] = u[H]);
    }
    u = w;
    var z = CryptoJS.HmacSHA256(t, j.encrypt).toString(CryptoJS.enc.Hex);
    var B = '';
    if ($.version === '3.1') {
        var C = {
            pp: {},
            fp: $.fp,
            sua:'Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv'
        };
        if (cookie) {
            let K = cookie.match(/pin=([^;]+)/);
            K && (C.pp.p1 = decodeURIComponent(K[1]));
        }
        var r = CryptoJS.AES.encrypt(JSON.stringify(C, null, 2), CryptoJS.enc.Utf8.parse('wm0!@w_s#ll1flo('), {
            iv: CryptoJS.enc.Utf8.parse('0102030405060708'),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        B = r.ciphertext.toString();
    }

    var E = [$.ts, $.fp, $.appId, j.tk, z, $.version, $.timestamp, B].join(';');
    return 't=' + $._start + '&h5st=' + encodeURIComponent(E);
}

module.exports = get_h5st31