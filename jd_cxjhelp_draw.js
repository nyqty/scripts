/*
#抽现金抽奖提现

轮询提现变量：jd_cxjhelp_num //轮询提现页数

注意：轮询页数也大，越容易403，请谨慎填写

更新提现失败重试
更新抽奖火爆重试（一直火爆一直重试）
更新统计
更新转赚红包 上限兑换红包

[task_local]
#抽现金抽奖提现
11 11 11 11 * jd_cxjhelp_draw.js, tag=抽现金抽奖提现, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true*/

const Env=require('./utils/Env.js');
const $ = new Env("抽现金抽奖提现");
const _0x1b11c7 = $.isNode() ? require("./jdCookie") : "",
  _0x1959e5 = require("./function/h5st41.js"),
  _0x2431dc = require("./function/krgetua");
let _0x366522 = [],
  _0x4a14eb = "";
$.krtyhot = false;
let _0x3f660a = ["3orGfh1YkwNLksxOcN8zWQ", "Wvzc_VpNTlSkiQdHT8r7QA"],
  _0x11ccc3 = ["京东转赚红包", "特价抽现金"],
  _0x13b53f = "",
  _0x393165 = process.env.jd_cxjhelp_num ? process.env.jd_cxjhelp_num : "1";
if ($.isNode()) {
  Object.keys(_0x1b11c7).forEach(_0x2b51b9 => {
    _0x366522.push(_0x1b11c7[_0x2b51b9]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x366522 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x54c1e5($.getdata("CookiesJD") || "[]").map(_0x4e58ec => _0x4e58ec.cookie)].filter(_0x10d349 => !!_0x10d349);
!(async () => {
  if (!_0x366522[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let _0x597746 = 0; _0x597746 < _0x366522.length; _0x597746++) {
    if (_0x366522[_0x597746]) {
      _0x4a14eb = _0x366522[_0x597746];
      $.UserName = decodeURIComponent(_0x4a14eb.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4a14eb.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x597746 + 1;
      $.canUseCoinAmount = 0;
      console.log("");
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.UA = await _0x2431dc($.UserName);
      for (let _0x1f2b51 = 0; _0x1f2b51 < _0x3f660a.length; _0x1f2b51++) {
        _0x13b53f = _0x3f660a[_0x1f2b51];
        appName = _0x11ccc3[_0x1f2b51];
        console.log("\n开始第" + (_0x1f2b51 + 1) + "个活动：" + appName + "\n");
        await _0x387b39();
        await $.wait(2000);
      }
    }
  }
})().catch(_0x441bf0 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x441bf0 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x387b39() {
  $.txhot = false;
  $.hbnums = 0;
  $.xjnums = 0;
  await _0x50e9a9();
  if ($.prizeNum > 0) {
    for (m = 1; $.prizeNum--; m++) {
      console.log("进行第" + m + "次抽奖");
      await _0x10a3c3();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    }
  }
  console.log("\n当前设置轮询提现页数：" + _0x393165);
  for (let _0x41482b = 0; _0x41482b < _0x393165; _0x41482b++) {
    $.pageNum = _0x41482b + 1;
    console.log("\n开始轮询提现" + $.pageNum + "页");
    await _0x4f5b4a($.pageNum);
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    if ($.txhot) break;
  }
}
async function _0x10a3c3() {
  return new Promise(async _0x48267d => {
    let _0x134c8a = {
      "ts": Date.now(),
      "ridx": -1,
      "hdid": _0x33bc2e(43) + "=",
      "cipher": {},
      "appname": "wegame",
      "version": "1.0.0",
      "ciphertype": 5
    };
    const _0x3abcda = {
        "functionId": "inviteFissionDrawPrize",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": _0x13b53f,
          "lbs": JSON.stringify(_0x134c8a)
        }
      },
      _0x28067f = await _0x3a12af("c02c6", _0x3abcda);
    let _0x1aded8 = {
      "url": "https://api.m.jd.com/api?functionId=inviteFissionDrawPrize&" + _0x28067f,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x4a14eb
      },
      "timeout": 30 * 1000
    };
    $.get(_0x1aded8, async (_0xa67e49, _0x4ce3e0, _0x2d3c17) => {
      try {
        if (_0xa67e49) console.log("" + JSON.stringify(_0xa67e49));else {
          _0x2d3c17 = JSON.parse(_0x2d3c17);
          if (_0x2d3c17) {
            if (_0x2d3c17.code == 0 && _0x2d3c17.success == true) {
              if (_0x2d3c17.data) {
                if (_0x2d3c17?.["data"]?.["prizeType"] == 4) {
                  $.xjprizeValue = _0x2d3c17?.["data"]?.["prizeValue"] || 0;
                  $.xjnum = ($.xjprizeValue * 100 + $.xjnums * 100) / 100;
                  $.xjnums = _0x4c9ab2($.xjnum);
                  console.log("抽中现金：" + $.xjprizeValue + " 🎁 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");
                } else {
                  if (_0x2d3c17?.["data"]?.["prizeType"] == 2) {
                    $.hbprizeValue = _0x2d3c17?.["data"]?.["prizeValue"] || 0;
                    $.hbnum = ($.hbprizeValue * 100 + $.hbnums * 100) / 100;
                    $.hbnums = _0x4c9ab2($.hbnum);
                    console.log("抽中红包：" + $.hbprizeValue + " 🧧 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");
                  } else {
                    if (_0x2d3c17?.["data"]?.["prizeType"] == 1) console.log("抽中垃圾卷  🗑️");else {
                      if (_0x2d3c17?.["data"]?.["prizeType"] == 6) console.log("抽中惊喜大礼包  🗑️");else _0x2d3c17?.["data"]?.["prizeType"] == 0 ? console.log("抽中未知  🎁") : console.log(JSON.stringify(_0x2d3c17?.["data"]));
                    }
                  }
                }
              }
            } else _0x2d3c17.code == 2000 && _0x2d3c17.msg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : (console.log(_0x2d3c17.errMsg), _0x2d3c17.errMsg.includes("火爆") && $.prizeNum++);
          }
        }
      } catch (_0x1cfcf7) {
        $.logErr(_0x1cfcf7, _0x4ce3e0);
      } finally {
        _0x48267d();
      }
    });
  });
}
async function _0x50e9a9() {
  return new Promise(async _0x35d77f => {
    const _0x258e74 = {
        "functionId": "inviteFissionHome",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": _0x13b53f,
          "inviter": ""
        }
      },
      _0x3687d2 = await _0x3a12af("eb67b", _0x258e74);
    let _0x5f405f = {
      "url": "https://api.m.jd.com/?functionId=inviteFissionHome&" + _0x3687d2,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x4a14eb
      },
      "timeout": 30 * 1000
    };
    $.post(_0x5f405f, async (_0x4e8e08, _0x6c75d9, _0x230bcf) => {
      try {
        if (_0x4e8e08) {
          console.log("" + JSON.stringify(_0x4e8e08));
        } else {
          _0x230bcf = JSON.parse(_0x230bcf);
          if (_0x230bcf) {
            if (_0x230bcf.code == 0 && _0x230bcf.success == true) {
              $.drawPrizeNum = _0x230bcf.data.drawPrizeNum || 0;
              $.prizeNum = _0x230bcf.data.prizeNum || 0;
              let _0x59c589 = _0x230bcf.data.inviter || "";
              console.log("助力码：" + _0x59c589 + "\n已抽奖次数：" + $.drawPrizeNum + "\n剩余抽奖次数：" + $.prizeNum);
            } else _0x230bcf.code == 2000 && _0x230bcf.errMsg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : console.log(_0x230bcf.errMsg);
          }
        }
      } catch (_0x125ddf) {
        $.logErr(_0x125ddf, _0x6c75d9);
      } finally {
        _0x35d77f();
      }
    });
  });
}
async function _0x4f5b4a(_0x227b99) {
  return new Promise(async _0x4cbf0c => {
    const _0x2992a0 = {
        "functionId": "superRedBagList",
        "appid": "activities_platform",
        "clientVersion": "10.1.0",
        "client": "ios",
        "body": {
          "linkId": _0x13b53f,
          "pageNum": _0x227b99,
          "pageSize": 100,
          "business": "fission"
        }
      },
      _0xd4bad2 = await _0x3a12af("f2b1d", _0x2992a0);
    let _0x90b468 = {
      "url": "https://api.m.jd.com/?" + _0xd4bad2,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x4a14eb
      },
      "timeout": 30 * 1000
    };
    $.get(_0x90b468, async (_0x381021, _0x443fb3, _0x2526b3) => {
      try {
        if (_0x381021) console.log("" + JSON.stringify(_0x381021));else {
          _0x2526b3 = JSON.parse(_0x2526b3);
          if (_0x2526b3) {
            if (_0x2526b3.code == 0 && _0x2526b3.success == true) {
              const _0x36de5c = (_0x2526b3.data.items || []).filter(_0x40a849 => _0x40a849.prizeType === 4 && _0x40a849.state === 0 || _0x40a849.state === 2);
              for (let _0x1a51cb of _0x36de5c) {
                console.log("抽现金抽奖提现，去提现" + _0x1a51cb.amount + "现金");
                await _0x4fb81e(_0x1a51cb.id, _0x1a51cb.poolBaseId, _0x1a51cb.prizeGroupId, _0x1a51cb.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("抽现金抽奖提现失败，当月额度已满");
                  break;
                }
              }
            } else console.log("抽现金抽奖提现查询奖品：异常:" + JSON.stringify(_0x2526b3));
          }
        }
      } catch (_0x3e9577) {
        $.logErr(_0x3e9577, _0x443fb3);
      } finally {
        _0x4cbf0c();
      }
    });
  });
}
async function _0x4fb81e(_0x1669b3, _0x443c56, _0x2f8ed0, _0x449cb6) {
  return new Promise(async _0x53c6ff => {
    const _0xae93c9 = {
        "linkId": _0x13b53f,
        "businessSource": "NONE",
        "base": {
          "prizeType": 4,
          "business": "fission",
          "id": _0x1669b3,
          "poolBaseId": _0x443c56,
          "prizeGroupId": _0x2f8ed0,
          "prizeBaseId": _0x449cb6
        }
      },
      _0x2eb98c = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(_0xae93c9)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": _0x4a14eb
        },
        "timeout": 30 * 1000
      };
    $.post(_0x2eb98c, async (_0xc29103, _0x182711, _0x4af396) => {
      try {
        if (_0xc29103) {
          console.log("" + JSON.stringify(_0xc29103));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0x32ec4e(_0x4af396)) {
            _0x4af396 = $.toObj(_0x4af396);
            if (_0x4af396.code === 0) {
              if (_0x4af396.data.status === "310") console.log("提现现金成功！");else {
                console.log("提现现金：失败:" + _0x4af396.data.message);
                if (_0x4af396.data.message.includes("上限")) await _0x4b583c(_0x1669b3, _0x443c56, _0x2f8ed0, _0x449cb6);else _0x4af396.data.message.includes("已存在状态") && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)), await _0x4fb81e(_0x1669b3, _0x443c56, _0x2f8ed0, _0x449cb6));
              }
            } else console.log("提现现金：异常:" + JSON.stringify(_0x4af396));
          }
        }
      } catch (_0x131692) {
        $.logErr(_0x131692, _0x182711);
      } finally {
        _0x53c6ff(_0x4af396);
      }
    });
  });
}
function _0x4b583c(_0x17f254, _0x239c92, _0x3fbb20, _0x4e550e) {
  return new Promise(_0x47b03e => {
    const _0x135225 = {
        "linkId": _0x13b53f,
        "businessSource": "fission",
        "business": "business",
        "drawRecordId": _0x17f254,
        "poolId": _0x239c92,
        "prizeGroupId": _0x3fbb20,
        "prizeId": _0x4e550e
      },
      _0x2114c2 = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apRecompenseDrawPrize&body=" + escape(JSON.stringify(_0x135225)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          "origin": "https://pro.m.jd.com",
          "User-Agent": $.UA,
          "Cookie": _0x4a14eb
        },
        "timeout": 30 * 1000
      };
    $.post(_0x2114c2, async (_0x454b03, _0x4c9500, _0x3200ce) => {
      try {
        if (_0x454b03) {
          console.log("" + JSON.stringify(_0x454b03));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0x32ec4e(_0x3200ce)) {
            _0x3200ce = $.toObj(_0x3200ce);
            _0x3200ce.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + _0x3200ce.errMsg);
          }
        }
      } catch (_0x29a81a) {
        $.logErr(_0x29a81a, _0x4c9500);
      } finally {
        _0x47b03e(_0x3200ce);
      }
    });
  });
}
function _0x2c9055(_0x20d370) {
  return _0x20d370.then(_0x38eb51 => {
    return [null, _0x38eb51];
  }).catch(_0xa9332e => [_0xa9332e]);
}
async function _0x3a12af(_0x5e95bb, _0x2c42ea) {
  try {
    let _0x2b179f = new _0x1959e5({
      "appId": _0x5e95bb,
      "appid": "activities_platform",
      "clientVersion": _0x2c42ea?.["clientVersion"],
      "client": _0x2c42ea?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await _0x2b179f.genAlgo(), body = await _0x2b179f.genUrlParams(_0x2c42ea.functionId, _0x2c42ea.body), body;
  } catch (_0x1ccbca) {}
}
function _0x33bc2e(_0x17a5d5) {
  _0x17a5d5 = _0x17a5d5 || 32;
  let _0x254ffe = "0123456789abcdef",
    _0x4de9c2 = _0x254ffe.length,
    _0x224e18 = "";
  for (let _0x4626f9 = 0; _0x4626f9 < _0x17a5d5; _0x4626f9++) _0x224e18 += _0x254ffe.charAt(Math.floor(Math.random() * _0x4de9c2));
  return _0x224e18;
}
function _0x54c1e5(_0x5266ba) {
  if (typeof _0x5266ba == "string") try {
    return JSON.parse(_0x5266ba);
  } catch (_0x3f60d8) {
    return console.log(_0x3f60d8), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function _0x5f4ee2(_0x4d4a49) {
  return new Promise(_0x3b1e68 => {
    const _0x479298 = {
      "url": _0x4d4a49 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x479298, async (_0x277395, _0xa58d45, _0x5665d9) => {
      try {
        if (_0x277395) $.getAuthorCodeListerr = false;else {
          if (_0x5665d9) _0x5665d9 = JSON.parse(_0x5665d9);
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x570ff7) {
        $.logErr(_0x570ff7, _0xa58d45);
        _0x5665d9 = null;
      } finally {
        _0x3b1e68(_0x5665d9);
      }
    });
  });
}
function _0x5d110a(_0x37ec37, _0x4e9a48) {
  return Math.floor(Math.random() * (_0x4e9a48 - _0x37ec37)) + _0x37ec37;
}
function _0x4c9ab2(_0x1c6a29) {
  var _0x1b93cf = Number(_0x1c6a29);
  return !isNaN(parseFloat(_0x1b93cf)) && (_0x1b93cf = _0x1b93cf.toFixed(2)), _0x1b93cf;
}
function _0x32ec4e(_0x50ab26) {
  try {
    if (typeof JSON.parse(_0x50ab26) == "object") return true;
  } catch (_0xf1c626) {
    return console.log(_0xf1c626), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}