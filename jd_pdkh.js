/*
任务，抽奖
晚了没水
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_pdkh.js
updatetime:2023/7/3 
 */
 
const wudoutimes = '50';//连续几次没有豆就不抽奖只做任务
const Env=require('./utils/Env.js');
const $ = new Env('派对狂欢城');
const _0x3a5ff0 = $.isNode() ? require("./sendNotify") : "",
  _0x1257d4 = $.isNode() ? require("./jdCookie.js") : "",
  _0xf91f51 = require("./function/dylany.js"),
  _0x1845d0 = require("./USER_AGENTS"),
  _0x54667e = require("crypto-js");
let _0x4effa8 = true,
  _0x2ce390 = [],
  _0x3e0eca = "",
  _0x43d12a = "",
  _0x352473 = false,
  _0x1b41f0 = true;
if ($.isNode()) {
  Object.keys(_0x1257d4).forEach(_0x4c03db => {
    _0x2ce390.push(_0x1257d4[_0x4c03db]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x2ce390 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x27dce6($.getdata("CookiesJD") || "[]").map(_0x3b135b => _0x3b135b.cookie)].filter(_0x4a5f5f => !!_0x4a5f5f);
}
!(async () => {
  if (!_0x2ce390[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.log("\n当前版本：V2.0.0");
  $.log("\n问题建议TG：https://t.me/dylan_jdpro");
  for (let _0x457727 = 0; _0x457727 < _0x2ce390.length; _0x457727++) {
    if (_0x2ce390[_0x457727]) {
      _0x3e0eca = _0x2ce390[_0x457727];
      $.UserName = decodeURIComponent(_0x3e0eca.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3e0eca.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x457727 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.notimes = false;
      $.airnum = 0;
      $.UA = _0x1845d0.UARAM ? _0x1845d0.UARAM() : _0x1845d0.USER_AGENT;
      await _0x28874d();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x3a5ff0.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x504750();
      await $.wait(200);
      await _0x422a45();
      await $.wait(200);
      await _0x29201d();
      await $.wait(200);
      await _0x4b5990();
      await $.wait(200);
      if ($.taskList) {
        $.log("去做任务...");
        for (let _0x4302d6 of $.taskList) {
          if (!!_0x4302d6.assignmentName && _0x4302d6.assignmentName !== "积分兑换" && _0x4302d6.assignmentName.indexOf("抽奖奖池") == -1 && _0x4302d6.assignmentName.indexOf("加购") == -1 && _0x4302d6.assignmentName.indexOf("会员") == -1) {
            $.log("\n----" + _0x4302d6.assignmentName);
            if (_0x4302d6.completionFlag) {
              $.log("----已完成");
              continue;
            }
            if (_0x4302d6.ext.shoppingActivity || _0x4302d6.ext.followShop) {
              for (let _0x335d10 = 0; _0x335d10 < _0x4302d6.assignmentTimesLimit - _0x4302d6.completionCnt; _0x335d10++) {
                await _0x39e9e5(_0x4302d6.encryptAssignmentId, _0x4302d6.ext.shoppingActivity ? _0x4302d6.ext.shoppingActivity[_0x335d10].itemId : _0x4302d6.ext.followShop[_0x335d10].itemId);
                await $.wait(1000);
              }
              continue;
            }
            await _0x39e9e5(_0x4302d6.encryptAssignmentId);
            await $.wait(500);
          }
        }
      }
      if (_0x1b41f0) {
        $.log("\n\n元宝抽奖...");
        for (let _0x2714c9 of Array(50)) {
          if ($.notimes) {
            break;
          }
          if ($.airnum > wudoutimes) {
            $.log("\n\n连续无豆达到设定值, 不抽奖只做任务！！！");
            _0x1b41f0 = false;
            break;
          }
          await _0xef8764();
          await $.wait(1000);
        }
      }
      await $.wait(5000);
    }
  }
})().catch(_0x1348b5 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1348b5 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x504750() {
  return new Promise(async _0x3a0b70 => {
    $.post(_0x303d05("arvrMeta2RoomSortListByTemplateId", {
      "templateId": "790088977"
    }), async (_0x4b32c6, _0x2c29e0, _0x1d0d93) => {
      try {
        _0x4b32c6 ? (console.log("" + JSON.stringify(_0x4b32c6)), console.log(" API请求失败，请检查网路重试")) : (_0x352473 && console.log(_0x1d0d93), _0x1d0d93 = JSON.parse(_0x1d0d93), _0x1d0d93.code == 0 ? $.roomId = _0x1d0d93.data[0].roomId : console.log(_0x1d0d93.msg));
      } catch (_0x3b6515) {
        $.logErr(_0x3b6515, _0x2c29e0);
      } finally {
        _0x3a0b70(_0x1d0d93);
      }
    });
  });
}
async function _0x422a45() {
  return new Promise(async _0x14d655 => {
    $.post(_0x303d05("meta2LoginGame", {
      "channel": "1",
      "roomId": $.roomId
    }), async (_0x197e95, _0x541244, _0x552519) => {
      try {
        if (_0x197e95) {
          console.log("" + JSON.stringify(_0x197e95));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x352473 && console.log(_0x552519);
          _0x552519 = JSON.parse(_0x552519);
          if (!(_0x552519.code == 0)) {
            console.log(_0x552519.msg);
          }
        }
      } catch (_0x492d23) {
        $.logErr(_0x492d23, _0x541244);
      } finally {
        _0x14d655(_0x552519);
      }
    });
  });
}
async function _0x29201d() {
  let _0x3a946d = {
    "rewardType": 6,
    "activityId": "ba6e852dd2bc05a1de75b2d2dc9fda305096bcc0",
    "appId": "app_440"
  };
  _0x3a946d = _0x3b87df(_0x3a946d);
  return new Promise(async _0x153b87 => {
    $.post(_0x303d05("arvr_getRequestToken", _0x3a946d), async (_0x921fa1, _0x1836c1, _0x590fdc) => {
      try {
        if (_0x921fa1) {
          console.log("" + JSON.stringify(_0x921fa1));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x352473 && console.log(_0x590fdc);
          _0x590fdc = JSON.parse(_0x590fdc);
          _0x590fdc.code == 200 ? $.token = _0x590fdc.data : console.log(_0x590fdc.msg);
        }
      } catch (_0x377151) {
        $.logErr(_0x377151, _0x1836c1);
      } finally {
        _0x153b87(_0x590fdc);
      }
    });
  });
}
async function _0x4b5990() {
  let _0x30a211 = {
    "projectId": "1563959",
    "sourceCode": 2
  };
  _0x30a211 = _0x3b87df(_0x30a211);
  return new Promise(async _0x16b0f0 => {
    $.post(_0x303d05("arvr_queryInteractiveInfo", _0x30a211), async (_0x5b91a1, _0x463a4e, _0x305f85) => {
      try {
        _0x5b91a1 ? (console.log("" + JSON.stringify(_0x5b91a1)), console.log(" API请求失败，请检查网路重试")) : (_0x352473 && console.log(_0x305f85), _0x305f85 = JSON.parse(_0x305f85), _0x305f85.subCode == 0 ? $.taskList = _0x305f85.assignmentList : console.log(_0x305f85.msg));
      } catch (_0xcc740d) {
        $.logErr(_0xcc740d, _0x463a4e);
      } finally {
        _0x16b0f0(_0x305f85);
      }
    });
  });
}
async function _0xef8764() {
  let _0x6b20ac = {
    "projectId": "1563959",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": "o5mVnPZZChSZyaD1qcXXXfWwhEb",
    "subTaskIdSecret": true,
    "exchangeNum": 1
  };
  _0x6b20ac = _0x3b87df(_0x6b20ac);
  let _0x4cb3ea = {
      "appId": "e5749",
      "fn": "arvr_doInteractiveAssignment",
      "body": _0x6b20ac,
      "apid": "commonActivity",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    },
    _0x381166 = await _0xf91f51.getbody(_0x4cb3ea),
    _0xc041e3 = {
      "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
      "body": "" + _0x381166,
      "headers": {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x3e0eca
      }
    };
  return new Promise(async _0x440ae3 => {
    $.post(_0xc041e3, async (_0x369840, _0x260859, _0x4c0ecf) => {
      try {
        if (_0x369840) {
          console.log("" + JSON.stringify(_0x369840));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x352473 && console.log(_0x4c0ecf);
          _0x4c0ecf = JSON.parse(_0x4c0ecf);
          if (_0x4c0ecf.subCode == 0) {
            if (_0x4c0ecf.rewardsInfo.failRewards && _0x4c0ecf.rewardsInfo.failRewards.length != 0) {
              if (_0x4c0ecf.rewardsInfo.failRewards[0].msg.indexOf("风控") > -1) {
                process.stdout.write("黑号，不继续抽了！");
                $.notimes = true;
                return;
              }
            }
            _0x4c0ecf.rewardsInfo.successRewards && JSON.stringify(_0x4c0ecf.rewardsInfo.successRewards) != "{}" ? (process.stdout.write(Object.values(_0x4c0ecf.rewardsInfo.successRewards)[0][0].rewardName + " "), Object.values(_0x4c0ecf.rewardsInfo.successRewards)[0][0].rewardName.indexOf("京豆") == -1 ? $.airnum++ : $.airnum = 0) : (process.stdout.write("空气 "), $.airnum++);
          } else {
            if (_0x4c0ecf.msg.includes("不足")) {
              console.log(_0x4c0ecf.msg);
              $.notimes = true;
            } else {
              console.log(_0x4c0ecf.msg);
            }
          }
        }
      } catch (_0x1dafe8) {
        $.logErr(_0x1dafe8, _0x260859);
      } finally {
        _0x440ae3(_0x4c0ecf);
      }
    });
  });
}
async function _0x39e9e5(_0x58339c, _0x7abf23) {
  let _0x427e0a = {
    "projectId": "1563959",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": _0x58339c,
    "subTaskIdSecret": true,
    "itemId": _0x7abf23
  };
  if (!_0x7abf23) {
    delete _0x427e0a.itemId;
  }
  _0x427e0a = _0x3b87df(_0x427e0a);
  let _0x293252 = {
      "appId": "e5749",
      "fn": "arvr_doInteractiveAssignment",
      "body": _0x427e0a,
      "apid": "commonActivity",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    },
    _0x5cd3a8 = await _0xf91f51.getbody(_0x293252),
    _0x31b32d = {
      "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
      "body": "" + _0x5cd3a8,
      "headers": {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x3e0eca
      }
    };
  return new Promise(async _0x2b80a6 => {
    $.post(_0x31b32d, async (_0x528984, _0x27f873, _0x396fab) => {
      try {
        if (_0x528984) {
          console.log("" + JSON.stringify(_0x528984));
          console.log("dotask 请求失败，请检查网路重试");
        } else {
          _0x352473 && console.log(_0x396fab);
          _0x396fab = JSON.parse(_0x396fab);
          if (_0x396fab.subCode == 0) {
            _0x396fab.rewardsInfo.successRewards && process.stdout.write("" + _0x396fab.rewardsInfo.successRewards[1].quantityDetails[0].quantity + _0x396fab.rewardsInfo.successRewards[1].quantityDetails[0].rewardName + " ");
          } else {
            console.log(_0x396fab.msg);
          }
        }
      } catch (_0x3bb9f2) {
        $.logErr(_0x3bb9f2, _0x27f873);
      } finally {
        _0x2b80a6(_0x396fab);
      }
    });
  });
}
function _0x303d05(_0x5de088, _0x412f89) {
  return {
    "url": "https://api.m.jd.com/api/" + _0x5de088,
    "body": "appid=commonActivity&functionId=" + _0x5de088 + "&body=" + encodeURIComponent(JSON.stringify(_0x412f89)) + "&t=" + Date.now(),
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://pro.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": _0x3e0eca
    }
  };
}
function _0x3b87df(_0x1fb3af) {
  let _0x338d3f = "",
    _0x53ebe5 = Object.keys(_0x1fb3af).sort(function (_0x1b206b, _0x48873b) {
      return _0x1b206b.localeCompare(_0x48873b);
    });
  for (let _0x36b1b0 of _0x53ebe5) {
    _0x338d3f = _0x338d3f.concat(_0x1fb3af[_0x36b1b0]);
  }
  let _0x120637 = Date.now();
  r = "".concat("c4491f13dce9c71f").concat(_0x338d3f).concat(_0x120637);
  let _0x37370a = _0x54667e.MD5(r).toString();
  _0x1fb3af.timestamp = _0x120637;
  _0x1fb3af.sign = _0x37370a;
  _0x1fb3af.signKey = "c4491f13dce9c71f";
  return _0x1fb3af;
}
function _0x28874d() {
  return new Promise(_0x389b11 => {
    const _0x479873 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x3e0eca,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x479873, (_0x35779e, _0x2bbcd3, _0x2c3157) => {
      try {
        if (_0x2c3157) {
          _0x2c3157 = JSON.parse(_0x2c3157);
          if (!(_0x2c3157.islogin === "1")) {
            _0x2c3157.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x1d7a9b) {
        console.log(_0x1d7a9b);
      } finally {
        _0x389b11();
      }
    });
  });
}
return;
function _0x5a6fcb() {
  return new Promise(_0x3a30f0 => {
    !_0x4effa8 ? $.msg($.name, "", "" + _0x43d12a) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x43d12a);
    _0x3a30f0();
  });
}
function _0x4d8068(_0x1078da) {
  try {
    if (typeof JSON.parse(_0x1078da) == "object") {
      return true;
    }
  } catch (_0x127237) {
    console.log(_0x127237);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function _0x27dce6(_0x506d3d) {
  if (typeof _0x506d3d == "string") {
    try {
      return JSON.parse(_0x506d3d);
    } catch (_0x1fac40) {
      console.log(_0x1fac40);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}