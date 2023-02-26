/*
点点券
入口：京东APP-领券-左上角领券中心
35 16 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_necklace_6dy.js
updatetime:2022/12/14 fix
 */
const Env = require('./utils/Env.js');
const $ = new Env('点点券-加密');
const _0x50a56a = require('./function/dylant.js'),
    _0x2b3f3f = require('./function/dylanx.js'),
    _0x1e8c31 = require('crypto-js');

let _0x3e489f = '';

const _0xea61a = $.isNode() ? require('./sendNotify') : '';

const _0x77b590 = $.isNode() ? require('./jdCookie.js') : '',
    _0x1c7580 = 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/41Lkp7DumXYCFmPYtU3LTcnTTXTX/index.html%22%20%7D';

let _0x4f0200 = '';
$.appid = '50082', $.scid = 'DDhomePageh5', $.suc = 'yes';
let _0x2b115d = [],
    _0x73854 = '';

if ($.isNode()) {
    Object.keys(_0x77b590).forEach(_0x461059 => {
        _0x2b115d.push(_0x77b590[_0x461059]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x2b115d = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x5d6db1($.getdata('CookiesJD') || '[]').map(_0xe3c712 => _0xe3c712.cookie)].filter(_0x104107 => !!_0x104107);

const _0x1bea2e = 'https://api.m.jd.com/api';
!(async () => {
    if (!_0x2b115d[0]) {
        const _0x4bd1b5 = {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x4bd1b5);
        return;
    }

    console.log('只跑前6个CK，问题建议：https://t.me/dylan_jdpro');

    for (let _0x1b2c82 = 0; _0x1b2c82 < 6; _0x1b2c82++) {
        _0x2b115d[_0x1b2c82] && (_0x73854 = _0x2b115d[_0x1b2c82], $.UserName = decodeURIComponent(_0x73854.match(/pt_pin=([^; ]+)(?=;?)/) && _0x73854.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x1b2c82 + 1, $.isLogin = true, $.nickName = '', _0x4f0200 = '', errorMsgLllegal = 0, $.jdk = _0x5e1fb0('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), $.joyytoken = '', $.joyytoken_count = 1, _0x3d3406(), console.log('\n开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x3c7298(), await _0x1a1284(), await $.wait(3000), console.countReset('收取成功'));
    }

    if ($.isNode() && _0x3e489f) {
        const _0x4f7876 = {};
        _0x4f7876.url = _0x1c7580, await _0xea61a.sendNotify('' + $.name, '' + _0x3e489f, _0x4f7876);
    }
})().catch(_0x11f9d2 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x11f9d2 + '!', '');
}).finally(() => {
    $.done();
});

async function _0x1a1284() {
    try {
        await _0x474b87(), await $.wait(1000), await _0x257359(), await $.wait(1000), await _0x27a315(), await $.wait(1000), await _0x474b87(), await $.wait(1000), await _0x1706f2(), await $.wait(1000), await _0x5d7bd3(), await _0x41607c();
    } catch (_0x529b87) {
        $.logErr(_0x529b87);
    }
}

function _0x41607c() {
    return new Promise(async _0xf55f94 => {
        $.msg('京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n当前点点券：' + $.totalScore + '个\n可兑换红包：' + $.totalScore / 1000 + '元');

        _0xf55f94();
    });
}

async function _0x27a315() {
    console.log('\n开始任务...');

    for (let _0x5dbc68 of $.taskConfigVos) {
        if (_0x5dbc68.taskType === 12) continue;

        if (_0x5dbc68.taskStage === 0) {
            console.log('【' + _0x5dbc68.taskName + '】 任务未领取,开始领任务');

            let _0x233a0c = await _0xb2585e(_0x5dbc68.id);

            _0x233a0c && _0x233a0c.rtn_code == 0 && (console.log('【' + _0x5dbc68.taskName + '】 任务领取成功,开始做任务'), await $.wait(2000), await _0x311f57(_0x5dbc68), await $.wait(2000));
        } else {
            if (_0x5dbc68.taskStage === 2) console.log('【' + _0x5dbc68.taskName + '】 任务已完成,未领奖'); else {
                if (_0x5dbc68.taskStage === 3) console.log(_0x5dbc68.taskName + '任务已完成'); else _0x5dbc68.taskStage === 1 && (console.log('\n【' + _0x5dbc68.taskName + '】 任务已领取但未完成,开始做任务'), await _0x311f57(_0x5dbc68), await $.wait(2000));
            }
        }
    }
}

async function _0x1706f2() {
    $.scorenum = 0;
    console.log('\n开始收取点点券...');

    for (let _0x22f9d9 of $.bubbles) {
        await _0x530f3a(_0x22f9d9.id), await $.wait(2000);
    }

    if ($.scorenum) console.log('明日额外赠送' + $.scorenum + '\n');
}

async function _0x257359() {
    if ($.signInfo && !$.signInfo.signed) console.log('开始每日签到...'), await _0x726d7c(), await $.wait(200), await _0x1ff6c6(), await $.wait(500); else $.signInfo && console.log('今日已签到！');
}

async function _0x311f57(_0x550a85 = {}) {
    _0x550a85.taskType === 2 && (_0x550a85.requireBrowseSeconds && (await _0xb2585e(_0x550a85.id, 'necklace_timedTask'), await $.wait(_0x550a85.requireBrowseSeconds * 1000)), await _0xb2585e(_0x550a85.id, 'necklace_reportTask'));
    await $.wait(100);

    if (_0x550a85.taskType === 6 || _0x550a85.taskType === 8 || _0x550a85.taskType === 5 || _0x550a85.taskType === 9 || _0x550a85.taskType === 7) {
        await _0x18ed28(_0x550a85.id), $.taskItems = $.taskItems.filter(_0x400e98 => !!_0x400e98 && _0x400e98.status === 0);

        for (let _0x117b3d of $.taskItems) {
            console.log('浏览【' + _0x117b3d.title + '】'), _0x550a85.requireBrowseSeconds && (await _0xb2585e(_0x550a85.id, 'necklace_timedTask', _0x117b3d.id), await $.wait(_0x550a85.requireBrowseSeconds * 1000)), await _0xb2585e(_0x550a85.id, 'necklace_reportTask', _0x117b3d.id), await $.wait(500);
        }
    }

    if (_0x550a85.taskType === 3) await _0x2b2136('3', _0x550a85.id);
    if (_0x550a85.taskType === 4) await _0x2b2136('4', _0x550a85.id);
}

function _0x1ff6c6() {
    return new Promise(async _0x21d999 => {
        let _0x35d096 = _0x1e8c31.MD5($.UserName).toString().substring(8, 24),
            _0x3cc403 = _0x2164e4($.UserName, _0x35d096);

        const _0x5b06e4 = {
            'childActivityUrl': 'openapp.jdmobile://virtual?params={"category":"jump","des":"couponCenter"}',
            'eid': '',
            'monitorRefer': 'appClient',
            'monitorSource': 'cc_sign_android_index_config',
            'pageClickKey': 'Coupons_GetCenter',
            'sessionId': '',
            'shshshfpb': '',
            'verifyToken': ''
        };
        _0x5b06e4.pin = _0x3cc403;
        _0x5b06e4.signature = $.singarute;
        let _0x2eaac = _0x5b06e4;
        _0x2eaac = _0x2b3f3f.getbody('ccSignInNecklace', _0x2eaac);
        const _0xdc8051 = {
            'content-type': 'application/x-www-form-urlencoded',
            'User-Agent': 'okhttp/3.12.1;jdmall;android;version/11.3.0;build/98413;'
        };
        _0xdc8051.Cookie = _0x73854;
        const _0x1250c1 = {
            'url': 'https://api.m.jd.com/client.action?functionId=ccSignInNecklace'
        };
        _0x1250c1.body = _0x2eaac, _0x1250c1.headers = _0xdc8051;
        let _0x342a2d = _0x1250c1;
        $.post(_0x342a2d, async (_0x5db06c, _0x4e5921, _0x439673) => {
            try {
                _0x5db06c ? (console.log('' + JSON.stringify(_0x5db06c)), console.log('necklace_sign API请求失败，请检查网路重试')) : _0x1292d6(_0x439673) && (_0x439673 = JSON.parse(_0x439673), _0x439673.busiCode == 0 ? console.log('签到成功，获得：' + _0x439673.result.signResult.signData.necklaceScore) : console.log('签到失败：' + _0x439673.message + '\n'));
            } catch (_0x193a6a) {
                $.logErr(_0x193a6a, _0x4e5921);
            } finally {
                _0x21d999(_0x439673);
            }
        });
    });
}

function _0x726d7c() {
    return new Promise(async _0x5c57cf => {
        const _0x5d70dc = {
            'childActivityUrl': 'openapp.jdmobile://virtual?params={"category":"jump","des":"couponCenter"}',
            'eid': '',
            'incentiveShowTimes': 0x0,
            'lat': '',
            'lng': '',
            'monitorRefer': '',
            'monitorSource': 'ccresource_android_index_config',
            'pageClickKey': 'Coupons_GetCenter',
            'rewardShowTimes': 0x0,
            'shshshfpb': '',
            'sourceFrom': '1'
        };
        let _0x4197d1 = _0x5d70dc;
        _0x4197d1 = _0x2b3f3f.getbody('getCouponConfig', _0x4197d1);
        const _0x29d014 = {
            'content-type': 'application/x-www-form-urlencoded',
            'User-Agent': 'okhttp/3.12.1;jdmall;android;version/11.3.0;build/98413;'
        };
        _0x29d014.Cookie = _0x73854;
        const _0x5d0ca2 = {
            'url': 'https://api.m.jd.com/client.action?functionId=getCouponConfig'
        };
        _0x5d0ca2.body = _0x4197d1, _0x5d0ca2.headers = _0x29d014;
        let _0x1dc49e = _0x5d0ca2;
        $.post(_0x1dc49e, async (_0x5239ae, _0x1a3e20, _0x5702e0) => {
            try {
                _0x5239ae ? (console.log('' + JSON.stringify(_0x5239ae)), console.log('necklace_sign API请求失败，请检查网路重试')) : _0x1292d6(_0x5702e0) && (_0x5702e0 = JSON.parse(_0x5702e0), $.singarute = _0x5702e0.result.couponConfig.signNecklaceDomain.signature);
            } catch (_0x34dbe4) {
                $.logErr(_0x34dbe4, _0x1a3e20);
            } finally {
                _0x5c57cf(_0x5702e0);
            }
        });
    });
}

function _0x592a57() {
    return new Promise(async _0x552d84 => {
        const _0x13e765 = {
            'benefitId': '',
            'channel': '',
            'childActivityUrl': 'openapp.jdmobile://virtual?params={"category":"jump","des":"couponCenter"}',
            'couponSource': '',
            'couponSourceDetail': '',
            'eid': 'eidAc9cd812261sbyDcaPLf/Q+265AkRhEojp8g3G7tZXQti3rJiCvgAq/Q9CI5W6SHUS29KulUr1gOMrqymtiyFFxfSSnz/PWo2q0Jphq0rdiXEZ9Jw',
            'encryptedParam': '5xR83AftQlCt2ohMnMZg3+AVM1XSwxciq5xLYXJmZUPKG2UeZkqDw3Sg7sqLho0u0H40QCWO5TQ0FWDvVMGsOtCnJng2miYjV7DPsmZ3rkC84p73CS3kUEevxtE7yT3sWO0jm3BOQAt5cvUJVambdR/+6armJQZ7w6wnklQAGy/Ehl4SxRtXSW9IWd9OYMkhSXsPj+/OOu6Wj7Gva06Ejg==',
            'lat': '6d0e2f283aac67aba54651b9c39f8864',
            'lng': '0461bd6793680fce5da576f949c15fb0',
            'pageClickKey': 'Coupons_GetCenter',
            'platform': 'coupon-center',
            'shshshfpb': 'JD012145b9gUnYyoyQw9166912783633505nbKNPTQT9r8ls9K5XcxhxsU9iQS-6u124BPZuBJB1ZpJVbrVscMaGUJTlqRy1SnZFufacc5uNSLianID39Kro4DkUSXHVvNL7_Qiu5hG9wI1w9c2o9~qyeHwreBcOdaH-ME74-6Nb8WnLJXPSGz9tjvg2_PZMQu0-oC6nVyfjjZ51wrk5AEk6d4UaDUQ4ZqtpK9R14BWS02aMEigspoIwqhL2tIZihalc9MURLG3f4xc43Tr5po4RkXTnuD0dTZ0n8NW6q5qU_X3d0elFZuuqUJ1CsD_OLs',
            'source': 'ccmain',
            'subChannel': ''
        };
        let _0x2bd6b4 = _0x13e765;
        _0x2bd6b4 = dylan.getbody('getBenefit', _0x2bd6b4);
        const _0x4063be = {
            'content-type': 'application/x-www-form-urlencoded',
            'User-Agent': 'okhttp/3.12.1;jdmall;android;version/11.3.0;build/98413;'
        };
        _0x4063be.Cookie = _0x73854;
        const _0x47fea9 = {
            'url': 'https://api.m.jd.com/client.action?functionId=getBenefit'
        };
        _0x47fea9.body = _0x2bd6b4, _0x47fea9.headers = _0x4063be;
        let _0x3b65b9 = _0x47fea9;
        $.post(_0x3b65b9, async (_0x57e772, _0x2094a6, _0x1a8f91) => {
            try {
                if (_0x57e772) console.log('' + JSON.stringify(_0x57e772)), console.log('getBenefit API请求失败，请检查网路重试'); else {
                    if (_0x1292d6(_0x1a8f91)) {
                        _0x1a8f91 = JSON.parse(_0x1a8f91);
                        if (_0x1a8f91.rtn_code === 0) _0x1a8f91.data.biz_code === 0 && console.log('签到成功，时间：' + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString()); else _0x1a8f91.rtn_code === 403 || _0x1a8f91.rtn_msg.indexOf('非法请求') > -1 ? (console.log('每日签到失败：' + _0x1a8f91.rtn_msg + '\n'), errorMsgLllegal += 1, _0x3d3406()) : console.log('每日签到失败：' + JSON.stringify(_0x1a8f91) + '\n');
                    }
                }
            } catch (_0x494131) {
                $.logErr(_0x494131, _0x2094a6);
            } finally {
                _0x552d84(_0x1a8f91);
            }
        });
    });
}

function _0x518e96(_0x3a8d8f) {
    return new Promise(_0x474262 => {
        const _0x373043 = {
            'scoreNums': _0x3a8d8f,
            'giftConfigId': 0x1f,
            'currentDate': $.lastRequestTime.replace(/:/g, '%3A')
        };
        $.post(_0x4da6fe('necklace_exchangeGift', _0x373043), async (_0x34fc4e, _0x8d91e3, _0x110afc) => {
            try {
                if (_0x34fc4e) console.log('' + JSON.stringify(_0x34fc4e)), console.log('necklace_exchangeGift API请求失败，请检查网路重试'); else {
                    if (_0x1292d6(_0x110afc)) {
                        _0x110afc = JSON.parse(_0x110afc);

                        if (_0x110afc.rtn_code === 0) {
                            if (_0x110afc.data.biz_code === 0) {
                                const {
                                    result: _0x57e7d5
                                } = _0x110afc.data;
                                _0x4f0200 += _0x57e7d5.redpacketTitle + '：' + _0x57e7d5.redpacketAmount + '元兑换成功\n';
                                const _0x97be66 = {
                                    'hour12': false
                                };
                                _0x4f0200 += '红包有效期：' + new Date(_0x57e7d5.endTime + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString('zh', _0x97be66), console.log(_0x4f0200);
                            }
                        }
                    }
                }
            } catch (_0xfef70a) {
                $.logErr(_0xfef70a, _0x8d91e3);
            } finally {
                _0x474262(_0x110afc);
            }
        });
    });
}

function _0x5d7bd3() {
    return new Promise(_0x559fec => {
        const _0x420ec4 = {};
        $.post(_0x4da6fe('necklace_expiringScoreDetails', _0x420ec4), async (_0x2883af, _0x18786c, _0x36f0ae) => {
            try {
                _0x2883af ? (console.log('' + JSON.stringify(_0x2883af)), console.log('necklace_expiringScoreDetails API请求失败，请检查网路重试')) : _0x1292d6(_0x36f0ae) && (_0x36f0ae = JSON.parse(_0x36f0ae), _0x36f0ae.rtn_code === 0 && _0x36f0ae.data.result && console.log('近七天将过期数量：' + _0x36f0ae.data.result.totalExpiringScore));
            } catch (_0x173be3) {
                $.logErr(_0x173be3, _0x18786c);
            } finally {
                _0x559fec(_0x36f0ae);
            }
        });
    });
}

function _0x530f3a(_0x39276e) {
    return new Promise(async _0x2b8d4a => {
        $.id = _0x39276e, $.action = 'chargeScores';

        const _0x62a8b1 = await _0x50a56a.geturl($);

        $.post(_0x4da6fe('necklace_chargeScores', _0x62a8b1), async (_0x189828, _0x445720, _0xc00c7e) => {
            try {
                if (_0x189828) console.log('' + JSON.stringify(_0x189828)), console.log('necklace_chargeScores API请求失败，请检查网路重试'); else {
                    if (_0x1292d6(_0xc00c7e)) {
                        _0xc00c7e = JSON.parse(_0xc00c7e);
                        if (_0xc00c7e.rtn_code === 0) _0xc00c7e.data.biz_code === 0 && (console.count('收取成功'), $.scorenum = _0xc00c7e.data.result.giftScoreNum, $.totalScore = _0xc00c7e.data.result.totalScoreNum); else _0xc00c7e.rtn_code === 403 || _0xc00c7e.rtn_msg.indexOf('非法请求') > -1 ? (console.log('领取奖励失败：' + _0xc00c7e.rtn_msg + '\n'), errorMsgLllegal += 1, _0x3d3406()) : console.log('领取奖励失败：' + JSON.stringify(_0xc00c7e) + '\n');
                    }
                }
            } catch (_0x4ae866) {
                $.logErr(_0x4ae866, _0x445720);
            } finally {
                _0x2b8d4a(_0xc00c7e);
            }
        });
    });
}

function _0xb2585e(_0xd64f16, _0x5578af = 'necklace_startTask', _0x5dd7b3 = '') {
    return new Promise(async _0x3be702 => {
        let _0xe2e1f6 = {
            'taskId': _0xd64f16,
            'currentDate': $.lastRequestTime.replace(/:/g, '%3A')
        };
        if (_0x5578af == 'necklace_startTask') $.id = _0xd64f16, $.action = 'startTask', _0xe2e1f6 = await _0x50a56a.geturl($); else {
            if (_0x5dd7b3) _0xe2e1f6.itemId = _0x5dd7b3;
        }
        $.post(_0x4da6fe(_0x5578af, _0xe2e1f6), async (_0xe771d0, _0x40fb34, _0xf29c5f) => {
            try {
                if (_0xe771d0) console.log('' + JSON.stringify(_0xe771d0)), console.log('necklace_startTask API请求失败，请检查网路重试'); else {
                    if (_0x1292d6(_0xf29c5f)) {
                        _0xf29c5f = JSON.parse(_0xf29c5f), console.log((_0x5578af === 'necklace_startTask' ? '领任务结果' : '做任务结果') + '：' + _0xf29c5f.rtn_msg);

                        if (_0xf29c5f.rtn_code === 0) {
                            if (_0xf29c5f.data.biz_code === 0) { }
                        } else _0xf29c5f.rtn_code === 403 || _0xf29c5f.rtn_msg.indexOf('非法请求') > -1 ? (console.log((_0x5578af === 'necklace_startTask' ? '领任务失败' : '做任务失败') + '：' + _0xf29c5f.rtn_msg + '\n'), errorMsgLllegal += 1) : console.log((_0x5578af === 'necklace_startTask' ? '领取任务失败' : '做任务失败') + '：' + JSON.stringify(_0xf29c5f) + '\n');
                    }
                }
            } catch (_0x217629) {
                $.logErr(_0x217629, _0x40fb34);
            } finally {
                _0x3be702(_0xf29c5f);
            }
        });
    });
}

function _0x18ed28(_0x533760) {
    return new Promise(_0x2e5a07 => {
        const _0x2acd8f = {
            'taskId': _0x533760,
            'currentDate': $.lastRequestTime.replace(/:/g, '%3A')
        };
        $.taskItems = [];
        $.post(_0x4da6fe('necklace_getTask', _0x2acd8f), async (_0x12d3d3, _0x25702d, _0x771a3d) => {
            try {
                if (_0x12d3d3) console.log('' + JSON.stringify(_0x12d3d3)), console.log('necklace_getTask API请求失败，请检查网路重试'); else {
                    if (_0x1292d6(_0x771a3d)) {
                        _0x771a3d = JSON.parse(_0x771a3d);
                        if (_0x771a3d.rtn_code === 0) _0x771a3d.data.biz_code === 0 && ($.taskItems = _0x771a3d.data.result && _0x771a3d.data.result.taskItems); else _0x771a3d.rtn_code === 403 || _0x771a3d.rtn_msg.indexOf('非法请求') > -1 ? (console.log('失败：' + _0x771a3d.rtn_msg + '\n'), errorMsgLllegal += 1, _0x3d3406()) : console.log('失败：' + JSON.stringify(_0x771a3d) + '\n');
                    }
                }
            } catch (_0x2769ec) {
                $.logErr(_0x2769ec, _0x25702d);
            } finally {
                _0x2e5a07();
            }
        });
    });
}

function _0x474b87() {
    $.taskConfigVos = [], $.bubbles = [];
    $.signInfo = {};
    return new Promise(_0x41c858 => {
        $.post(_0x4da6fe('necklace_homePage'), async (_0x2dfb02, _0x9753fd, _0x51cfc9) => {
            try {
                _0x2dfb02 ? (console.log('' + JSON.stringify(_0x2dfb02)), console.log('necklace_homePage API请求失败，请检查网路重试')) : _0x1292d6(_0x51cfc9) && (_0x51cfc9 = JSON.parse(_0x51cfc9), _0x51cfc9.rtn_code === 0 && _0x51cfc9.data.biz_code === 0 && ($.taskConfigVos = _0x51cfc9.data.result.taskConfigVos, $.exchangeGiftConfigs = _0x51cfc9.data.result.exchangeGiftConfigs, $.lastRequestTime = _0x51cfc9.data.result.lastRequestTime, $.bubbles = _0x51cfc9.data.result.bubbles, $.signInfo = _0x51cfc9.data.result.newSignInfo, $.totalScore = _0x51cfc9.data.result.totalScore));
            } catch (_0x13d207) {
                $.logErr(_0x13d207, _0x9753fd);
            } finally {
                _0x41c858();
            }
        });
    });
}

function _0x2164e4(_0x5db508, _0x5c0f91) {
    let _0x39b85b = _0x1e8c31.enc.Utf8.parse(_0x5c0f91);

    let _0xf842b2 = _0x1e8c31.enc.Utf8.parse(_0x5db508),
        _0x91efe1 = _0x1e8c31.AES.encrypt(_0xf842b2, _0x39b85b, {
            'iv': _0x1e8c31.enc.Utf8.parse('1111111111111111'.substr(0, 16)),
            'mode': _0x1e8c31.mode.CBC,
            'padding': _0x1e8c31.pad.Pkcs7
        });

    return _0x91efe1.ciphertext.toString();
}

async function _0x2b2136(_0x4bb377 = '3', _0x7b630b) {
    let _0x473e1e, _0x3da60;

    if (_0x4bb377 === '4') _0x473e1e = 'getSinkTaskList', _0x3da60 = '&appid=XPMSGC2019&monitorSource=&functionId=getSinkTaskList&body=%7B%22platformType%22%3A%221%22%2C%22sinkIconFrom%22%3A%22%22%7D&client=m&clientVersion=5.8.0&area=14_1116_1119_50040&eu=3356364313533373&fv=0356539313538326', await _0x3035e8(_0x473e1e, _0x3da60, _0x4bb377), _0x473e1e = 'reportSinkTask', _0x3da60 = '&appid=XPMSGC2019&monitorSource=&functionId=reportSinkTask&body=%7B%22platformType%22%3A%221%22%2C%22taskId%22%3A%22necklace_' + _0x7b630b + '%22%7D&client=m&clientVersion=5.8.0&eu=3356364313533374&fv=0356539313538327'; else {
        _0x473e1e = 'getCcTaskList', _0x3da60 = _0x2b3f3f.getbody(_0x473e1e, {}), await _0x3035e8(_0x473e1e, _0x3da60, _0x4bb377), _0x473e1e = 'reportCcTask';
        const _0x5f2bfa = {
            'monitorRefer': '',
            'monitorSource': 'ccgroup_android_index_task',
            'taskType': '2'
        };
        _0x5f2bfa.taskId = 'necklace_' + _0x7b630b, _0x3da60 = _0x2b3f3f.getbody('reportCcTask', _0x5f2bfa);
    }
    console.log('等待15秒...'), await $.wait(16000);
    await _0x3035e8(_0x473e1e, _0x3da60, _0x4bb377);
}

function _0x3035e8(_0x4194f8, _0x1b8889, _0x2698c8 = '3') {
    let _0x2316fb = 'https://api.m.jd.com/client.action?functionId=' + _0x4194f8;

    return new Promise(_0x577799 => {
        (_0x4194f8 === 'reportSinkTask' || _0x4194f8 === 'getSinkTaskList') && (_0x2316fb += _0x1b8889, _0x1b8889 = '');
        const _0x305045 = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.m.jd.com',
            'Origin': 'https://h5.m.jd.com',
            'Referer': 'https://h5.m.jd.com/'
        };
        _0x305045.Cookie = _0x73854 + ('joyytoken=' + ('50082' + $.joyytoken) + ';');
        _0x305045['User-Agent'] = $.UA;
        const _0x9497ed = {};
        _0x9497ed.url = _0x2316fb, _0x9497ed.body = _0x1b8889, _0x9497ed.headers = _0x305045;
        const _0x4f4cc8 = _0x9497ed;
        $.post(_0x4f4cc8, async (_0x3ae1bb, _0x1033df, _0x5398a6) => {
            try {
                if (_0x3ae1bb) console.log('' + JSON.stringify(_0x3ae1bb)), console.log($.name + ' API请求失败，请检查网路重试'); else {
                    if (_0x1292d6(_0x5398a6)) {
                        _0x5398a6 = JSON.parse(_0x5398a6);
                        if (_0x2698c8 === '3' && _0x4194f8 === 'reportCcTask') console.log('点击首页领券图标任务:' + _0x5398a6.message);
                        if (_0x2698c8 === '4' && _0x4194f8 === 'reportSinkTask') console.log('点击“券后9.9”任务:' + _0x5398a6.message);
                    }
                }
            } catch (_0xf7961) {
                $.logErr(_0xf7961, _0x1033df);
            } finally {
                _0x577799();
            }
        });
    });
}

function _0x4da6fe(_0x290bc3, _0x3a3b08 = {}) {
    let _0x1971dc = _0x73854.match(/pt_key=([^; ]+)(?=;?)/)[1];

    const _0x392a5c = {
        'Host': 'api.m.jd.com',
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded',
        'Origin': 'https://h5.m.jd.com',
        'Referer': 'https://h5.m.jd.com/'
    };
    _0x392a5c['User-Agent'] = $.UA;
    return _0x392a5c.Cookie = 'pt_key=app_open' + _0x1971dc + ';' + _0x73854 + ('joyytoken=' + ('50082' + $.joyytoken) + ';'), {
        'url': _0x1bea2e + '?functionId=' + _0x290bc3 + '&appid=coupon-necklace&loginType=2&t=' + Date.now(),
        'body': 'body=' + encodeURIComponent(JSON.stringify(_0x3a3b08)),
        'headers': _0x392a5c
    };
}

function _0x3c7298() {
    const _0x5f4637 = {
        'url': 'https://verify-dy-server-hqbjkuhrsu.cn-hangzhou.fcapp.run/dy',
        'timeout': 0x7530
    };
    let _0x4ebb7b = _0x5f4637;
    return new Promise(_0x4cad63 => {
        $.get(_0x4ebb7b, async (_0x3cf8f6, _0x15a9de, _0x25bba7) => {
            try {
                _0x3cf8f6 ? (console.log('\n服务连接失败，终止执行！'), process.exit(111)) : _0x25bba7 && (_0x25bba7 = JSON.parse(_0x25bba7), _0x25bba7.code === 200 ? ($.suc = 'no', $.ver = _0x25bba7.version) : (console.log('\n' + _0x25bba7.msg), process.exit(111)));
            } catch (_0x9c0338) {
                $.logErr(_0x9c0338, _0x15a9de);
            } finally {
                _0x4cad63(_0x25bba7);
            }
        });
    });
}

function _0x1292d6(_0x4fd014) {
    try {
        if (typeof JSON.parse(_0x4fd014) == 'object') return true;
    } catch (_0x146d5e) {
        return console.log(_0x146d5e), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
    }
}

function _0x5d6db1(_0x540dbf) {
    if (typeof _0x540dbf == 'string') try {
        return JSON.parse(_0x540dbf);
    } catch (_0xeef7d8) {
        return console.log(_0xeef7d8), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}

function _0x3d3406() {
    let _0x60e7b5 = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'],
        _0x59c6b8 = ['9', '10', '11', '12'],
        _0x5d0be5 = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
        _0x3c5920 = ['98413', '98416', '98415', '98417', '98450'];
    $.dv = _0x60e7b5[Math.floor(Math.random() * _0x60e7b5.length)];
    $.iv = _0x59c6b8[Math.floor(Math.random() * _0x59c6b8.length)];
    $.av = _0x5d0be5[Math.floor(Math.random() * _0x5d0be5.length)], $.bv = _0x3c5920[Math.floor(Math.random() * _0x3c5920.length)], getstr = function (_0x3307bb) {
        let _0x28ec70 = '',
            _0x3efd5b = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let _0x273381 = 0; _0x273381 < _0x3307bb; _0x273381++) {
            let _0x52994b = Math.round(Math.random() * (_0x3efd5b.length - 1));

            _0x28ec70 += _0x3efd5b.substring(_0x52994b, _0x52994b + 1);
        }

        return _0x28ec70;
    };

    let _0x34c294 = Buffer.from(getstr(16), 'utf8').toString('base64');

    let _0x4b18e5 = Buffer.from(getstr(16), 'utf8').toString('base64');

    const _0x3d08cd = {
        'sv': 'CJS=',
        'ov': 'CzO='
    };
    _0x3d08cd.ad = _0x34c294, _0x3d08cd.od = _0x4b18e5, _0x3d08cd.ud = _0x34c294;

    let _0x450d49 = encodeURIComponent(JSON.stringify({
        'hdid': 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=',
        'ts': Date.now(),
        'ridx': -1,
        'cipher': _0x3d08cd,
        'ciphertype': 0x5,
        'version': '1.2.0',
        'appname': 'com.jingdong.app.mall'
    }));

    $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';ef/1;ep/' + _0x450d49 + ';jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36';
}

function _0x5e1fb0(_0x469f49 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x199d25 = 0) {
    return _0x469f49.replace(/[xy]/g, function (_0x5a48a6) {
        var _0x383fb5 = 16 * Math.random() | 0,
            _0x4da77d = 'x' == _0x5a48a6 ? _0x383fb5 : 3 & _0x383fb5 | 8;

        return uuid = _0x199d25 ? _0x4da77d.toString(36).toUpperCase() : _0x4da77d.toString(36), uuid;
    });
}

function _0x54bb05(_0x33b6d2) {
    _0x33b6d2 = _0x33b6d2 || 32;
    let _0x3050b0 = 'abcdef0123456789',
        _0x25714d = _0x3050b0.length,
        _0x33e378 = '';

    for (i = 0; i < _0x33b6d2; i++) _0x33e378 += _0x3050b0.charAt(Math.floor(Math.random() * _0x25714d));

    return _0x33e378;
}