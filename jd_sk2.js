/*
解锁心动时刻

cron:0 0,10 * * *
============Quantumultx===============
[task_local]
#解锁心动时刻
0 0,10 * * * jd_sk2.js, tag=解锁心动时刻, enabled=true
*/

const Env = require('./utils/Env.js');
const $ = new Env('6.1-6.30 SK2互动抽奖，至高赢经典神仙水');
  const _0x2fcd6c = $.isNode() ? require("./sendNotify") : "",
  _0x123f5c = $.isNode() ? require("./jdCookie.js") : "",
  _0x5cb07f = require("./function/krgetToken");
let _0x1ed1c0 = "https://szxyun-rc.isvjcloud.com",
  _0x456786 = [],
  _0x13d4c4 = "";
if ($.isNode()) {
  if (process.env.jd_szxyun_teamId) $.teamId = process.env.jd_szxyun_teamId;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(_0x123f5c).forEach(_0x3fc644 => {
    _0x456786.push(_0x123f5c[_0x3fc644]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x456786 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x4f4d1d => _0x4f4d1d.cookie)].filter(_0x24fc53 => !!_0x24fc53);
let _0x464e1e = typeof $request !== "undefined";
_0x464e1e && (GetCookie(), $.done());
!(async () => {
  authorCodeList = await _0x1839fb("http://code.kingran.cf/2.json");
  $.activityId = "XMHeartMoment0521DConb";
  if (authorCodeList.length <= 0) {
    console.log("\n网络不好，请重新运行~\n");
    return;
  } else {
    $.shareId = "5d4fd9e18a24409dbf2bb59388c07ba9";
    $.openId = authorCodeList[0].openid;
  }
  if (!_0x456786[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let _0x2f8f88 = 0; _0x2f8f88 < _0x456786.length; _0x2f8f88++) {
    if (_0x456786[_0x2f8f88]) {
      _0x13d4c4 = _0x456786[_0x2f8f88];
      $.ownCookie = _0x456786[_0x2f8f88];
      $.UserName = decodeURIComponent(_0x13d4c4.match(/pt_pin=(.+?);/) && _0x13d4c4.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x2f8f88 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await _0x2fcd6c.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x120daa();
      await _0x176b99();
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(_0x2f8bd1 => {
  $.log("", " " + $.name + ", 失败! 原因: " + _0x2f8bd1 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x176b99() {
  $.shopid = 1000004123;
  $.token = "";
  $.token = await _0x5cb07f(_0x13d4c4, _0x1ed1c0);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await _0xc74634();
  if ($.tokens) {
    await _0x13ec73();
    console.log("目前积分：" + $.points);
    await _0x4dfc13();
    await _0x503850();
    await _0x54b504();
    await _0x5923f4();
    for (const _0x9aa23a of $.detail) {
      $.jobDetail = _0x9aa23a.config;
      await _0x5011ed();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    if ($.points2 >= 1) {
      let _0x5b1e36 = parseInt($.points2 / 1);
      console.log("抽奖次数为" + _0x5b1e36 + "次");
      for (m = 1; _0x5b1e36--; m++) {
        await _0x24f6ee();
        if (Number(_0x5b1e36) <= 0) break;
        if (m >= 3) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
    }
    await _0x3d5a03();
    $.index == 1 && ($.shareId = $.joinId, console.log("后面的号都会助力 -> " + $.shareId));
    $.openid == "ture" && (await _0x537640(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await _0x3c21c7(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
  }
}
function _0xc74634() {
  return new Promise(_0x26e8c1 => {
    let _0x291a15 = {
      "shopId": $.shopid,
      "token": $.token,
      "source": "01"
    };
    $.post(_0x525d4c("/webc/login/userLogin", _0x291a15), async (_0x5b6b38, _0x37e513, _0x3bf4e0) => {
      try {
        _0x5b6b38 ? (console.log("" + JSON.stringify(_0x5b6b38)), console.log($.name + " userLogin API请求失败，请检查网路重试")) : (_0x3bf4e0 = JSON.parse(_0x3bf4e0), _0x3bf4e0 && _0x3bf4e0.success && ($.tokens = _0x3bf4e0.data));
      } catch (_0x1c8dd8) {
        $.logErr(_0x1c8dd8, _0x37e513);
      } finally {
        _0x26e8c1();
      }
    });
  });
}
function _0x13ec73() {
  return new Promise(_0x25049 => {
    let _0x45d79c = {
      "activeId": $.activityId,
      "shareId": $.shareId
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/active", _0x45d79c), async (_0x5bee44, _0x417d6c, _0x45390b) => {
      try {
        _0x5bee44 ? (console.log("" + JSON.stringify(_0x5bee44)), console.log($.name + " active API请求失败，请检查网路重试")) : (_0x45390b = JSON.parse(_0x45390b), _0x45390b && _0x45390b.success && ($.joinId = _0x45390b.data.userVO.joinId || "", $.points2 = _0x45390b.data.userVO.points2 || 0, $.points = _0x45390b.data.userVO.points || 0, $.detail = _0x45390b.data.jobMap.viewWare.details || []));
      } catch (_0x2a35b7) {
        $.logErr(_0x2a35b7, _0x417d6c);
      } finally {
        _0x25049();
      }
    });
  });
}
function _0x503850() {
  return new Promise(_0x46b510 => {
    let _0x4e261e = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 22,
      "jobDetail": "100052892476"
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/job", _0x4e261e), async (_0xd85f07, _0x25f779, _0x18e1bf) => {
      try {
        _0xd85f07 ? (console.log("" + JSON.stringify(_0xd85f07)), console.log($.name + " job API请求失败，请检查网路重试")) : (_0x18e1bf = JSON.parse(_0x18e1bf), _0x18e1bf && _0x18e1bf.success && ($.val = _0x18e1bf.data.val || 0, $.awardName = _0x18e1bf.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (_0xf3fd73) {
        $.logErr(_0xf3fd73, _0x25f779);
      } finally {
        _0x46b510();
      }
    });
  });
}
function _0x3d5a03() {
  return new Promise(_0x56c460 => {
    let _0xda531 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": $.shareId
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/share", _0xda531), async (_0x75774e, _0x508054, _0x535c9c) => {
      try {
        if (_0x75774e) {
          console.log("" + JSON.stringify(_0x75774e));
          console.log($.name + " share API请求失败，请检查网路重试");
        } else {
          _0x535c9c = JSON.parse(_0x535c9c);
          _0x535c9c && _0x535c9c.success && ($.helpStatus = _0x535c9c.data.helpStatus || 0, $.awardName = _0x535c9c.data.awardName || 0, console.log("助力状态：" + $.helpStatus + "  获得豆子： " + $.awardName));
        }
      } catch (_0x312d0c) {
        $.logErr(_0x312d0c, _0x508054);
      } finally {
        _0x56c460();
      }
    });
  });
}
function _0x537640() {
  return new Promise(_0x223147 => {
    let _0x16b0e7 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1660686822156353538"
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/share", _0x16b0e7), async (_0x24886e, _0x33b631, _0x3cd539) => {
      try {
        if (_0x24886e) {} else {
          _0x3cd539 = JSON.parse(_0x3cd539);
          _0x3cd539 && _0x3cd539.success && ($.helpStatus = _0x3cd539.data.helpStatus || 0, $.awardName = _0x3cd539.data.awardName || 0);
        }
      } catch (_0x340fe7) {
        $.logErr(_0x340fe7, _0x33b631);
      } finally {
        _0x223147();
      }
    });
  });
}
function _0x3c21c7() {
  return new Promise(_0x3297ae => {
    let _0x30b2d0 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "shareId": "1660686822156353538"
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/share", _0x30b2d0), async (_0x1118d1, _0x345158, _0x19cf58) => {
      try {
        if (_0x1118d1) {} else {
          _0x19cf58 = JSON.parse(_0x19cf58);
          _0x19cf58 && _0x19cf58.success && ($.helpStatus = _0x19cf58.data.helpStatus || 0, $.awardName = _0x19cf58.data.awardName || 0);
        }
      } catch (_0xcc448a) {
        $.logErr(_0xcc448a, _0x345158);
      } finally {
        _0x3297ae();
      }
    });
  });
}
function _0x54b504() {
  return new Promise(_0x3f8bc3 => {
    let _0x137539 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 3,
      "jobDetail": 100055352719
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/job", _0x137539), async (_0x5f4c59, _0x366218, _0xa5ffe8) => {
      try {
        if (_0x5f4c59) {
          console.log("" + JSON.stringify(_0x5f4c59));
          console.log($.name + " job1 API请求失败，请检查网路重试");
        } else {
          _0xa5ffe8 = JSON.parse(_0xa5ffe8);
          _0xa5ffe8 && _0xa5ffe8.success && ($.val = _0xa5ffe8.data.val || 0, $.awardName = _0xa5ffe8.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName));
        }
      } catch (_0x57765d) {
        $.logErr(_0x57765d, _0x366218);
      } finally {
        _0x3f8bc3();
      }
    });
  });
}
function _0x5923f4() {
  return new Promise(_0x69273f => {
    let _0xebab30 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 1,
      "jobDetail": "1000004123"
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/job", _0xebab30), async (_0x17f52c, _0x2f2a21, _0x221be2) => {
      try {
        _0x17f52c ? (console.log("" + JSON.stringify(_0x17f52c)), console.log($.name + " job API请求失败，请检查网路重试")) : (_0x221be2 = JSON.parse(_0x221be2), _0x221be2 && _0x221be2.success && ($.val = _0x221be2.data.val || 0, $.awardName = _0x221be2.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (_0x429495) {
        $.logErr(_0x429495, _0x2f2a21);
      } finally {
        _0x69273f();
      }
    });
  });
}
function _0x5aba02() {
  return new Promise(_0x1d7791 => {
    let _0x541bc3 = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 0,
      "jobDetail": "1"
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/job", _0x541bc3), async (_0x4261c6, _0x18882d, _0x1f5f01) => {
      try {
        _0x4261c6 ? (console.log("" + JSON.stringify(_0x4261c6)), console.log($.name + " job API请求失败，请检查网路重试")) : (_0x1f5f01 = JSON.parse(_0x1f5f01), _0x1f5f01 && _0x1f5f01.success && ($.val = _0x1f5f01.data.val || 0, $.awardName = _0x1f5f01.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (_0x4b7cb1) {
        $.logErr(_0x4b7cb1, _0x18882d);
      } finally {
        _0x1d7791();
      }
    });
  });
}
function _0x5011ed() {
  return new Promise(_0x3cf122 => {
    let _0x180d4e = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "jobForm": 4,
      "jobDetail": $.jobDetail
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/job", _0x180d4e), async (_0x3c4be2, _0x45c7f3, _0x5e5a6b) => {
      try {
        _0x3c4be2 ? (console.log("" + JSON.stringify(_0x3c4be2)), console.log($.name + " job API请求失败，请检查网路重试")) : (_0x5e5a6b = JSON.parse(_0x5e5a6b), _0x5e5a6b && _0x5e5a6b.success && ($.val = _0x5e5a6b.data.val || 0, $.awardName = _0x5e5a6b.data.awardName || "", console.log("获得积分：" + $.val + "  获得豆子： " + $.awardName)));
      } catch (_0x6a078c) {
        $.logErr(_0x6a078c, _0x45c7f3);
      } finally {
        _0x3cf122();
      }
    });
  });
}
function _0x24f6ee() {
  return new Promise(_0x198e61 => {
    let _0x52fc4e = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "lotteryForm": 0
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/lottery", _0x52fc4e), async (_0x4a8065, _0x298afc, _0x4be009) => {
      try {
        _0x4a8065 ? (console.log("" + JSON.stringify(_0x4a8065)), console.log($.name + " lottery API请求失败，请检查网路重试")) : (_0x4be009 = JSON.parse(_0x4be009), _0x4be009.data != null && _0x4be009.success ? console.log("获得奖品： " + _0x4be009.data.awardName) : console.log("空气 "));
      } catch (_0x4d97d1) {
        $.logErr(_0x4d97d1, _0x298afc);
      } finally {
        _0x198e61();
      }
    });
  });
}
function _0x4dfc13() {
  return new Promise(_0x5363d9 => {
    let _0x3380ad = {
      "activeId": $.activityId,
      "joinId": $.joinId,
      "lotteryForm": 2
    };
    $.post(_0x4551f7("/webc/XMHeartMoment/lottery", _0x3380ad), async (_0x55d303, _0x412c0a, _0x36cc24) => {
      try {
        if (_0x55d303) {
          console.log("" + JSON.stringify(_0x55d303));
          console.log($.name + " lottery API请求失败，请检查网路重试");
        } else {
          _0x36cc24 = JSON.parse(_0x36cc24);
          if (_0x36cc24.data != null && _0x36cc24.success) console.log("获得奖品： " + _0x36cc24.data.awardName);else {
            console.log("空气 ");
          }
        }
      } catch (_0x55a3b2) {
        $.logErr(_0x55a3b2, _0x412c0a);
      } finally {
        _0x5363d9();
      }
    });
  });
}
function _0x1839fb(_0x43e67d) {
  return new Promise(_0x59c0d6 => {
    const _0x345d97 = {
      "url": _0x43e67d + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x345d97, async (_0x5cbc2d, _0x49bab8, _0x227107) => {
      try {
        if (_0x5cbc2d) $.getAuthorCodeListerr = false;else {
          if (_0x227107) _0x227107 = JSON.parse(_0x227107);
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x2d413d) {
        $.logErr(_0x2d413d, _0x49bab8);
        _0x227107 = null;
      } finally {
        _0x59c0d6(_0x227107);
      }
    });
  });
}
function _0x4551f7(_0x5deb3f, _0x42d9cf) {
  return {
    "url": "" + _0x1ed1c0 + _0x5deb3f,
    "body": JSON.stringify(_0x42d9cf),
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": _0x13d4c4,
      "Host": "szxyun-rc.isvjcloud.com",
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": $.tokens,
      "Origin": "https://szxyun-rc.isvjcloud.com",
      "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    }
  };
}
function _0x525d4c(_0x51ffcf, _0xb148ab) {
  return {
    "url": "" + _0x1ed1c0 + _0x51ffcf,
    "body": JSON.stringify(_0xb148ab),
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": _0x13d4c4,
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": "null",
      "Host": "szxyun-rc.isvjcloud.com",
      "Origin": "https://szxyun-rc.isvjcloud.com",
      "Referer": "https://szxyun-rc.isvjcloud.com/pagec/newXiaomiBook/index.html?shareId=1606120057617924098&sid=436dede93a6cb4c7cac577be7616022w&un_area=4_50950_50957_0",
      "User-Agent": $.UA
    },
    "timeout": 5 * 2000
  };
}
function _0x120daa() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + _0x5a97ed(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function _0x5a97ed(_0x39ece6) {
  _0x39ece6 = _0x39ece6 || 32;
  let _0x39167b = "abcdef0123456789",
    _0x7a1bfd = _0x39167b.length,
    _0x576be6 = "";
  for (i = 0; i < _0x39ece6; i++) _0x576be6 += _0x39167b.charAt(Math.floor(Math.random() * _0x7a1bfd));
  return _0x576be6;
}
function _0x13c0df(_0x4d3242) {
  if (!_0x4d3242) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(_0x4d3242) == "object") return true;
  } catch (_0x45078c) {
    return console.log(_0x45078c), false;
  }
}
function _0x56e3cd(_0x4ec1ce) {
  if (typeof _0x4ec1ce == "string") {
    try {
      return JSON.parse(_0x4ec1ce);
    } catch (_0x57a3e8) {
      return console.log(_0x57a3e8), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function _0x19bc7f(_0x379ff1, _0x130020) {
  return Math.floor(Math.random() * (_0x130020 - _0x379ff1)) + _0x379ff1;
}