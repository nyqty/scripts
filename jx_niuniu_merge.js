/*
牛牛乐园 入口：京喜特价-我的
7 7 7 7 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jx_niuniu_merge.js
跑会黑，一周后解，循环
updatetime:2023/07/29
*/
const Env=require('./utils/Env.js');
const $ = new Env('牛牛乐园合成');
const _0xe307a6 = $.isNode() ? require("./jdCookie.js") : "",
  _0x4e6453 = $.isNode() ? require("./sendNotify") : "",
  _0x562db5 = require("./function/dylany");
let _0x34aefe = [],
  _0x3f3994 = "",
  _0xfd3043 = false;
if ($.isNode()) {
  Object.keys(_0xe307a6).forEach(_0x3509a3 => {
    _0x34aefe.push(_0xe307a6[_0x3509a3]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x34aefe = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4ce300($.getdata("CookiesJD") || "[]").map(_0x48bece => _0x48bece.cookie)].filter(_0x4e5e2a => !!_0x4e5e2a);
}
$.JOY_COIN_MAXIMIZE = 1;
message = "";
!(async () => {
  if (!_0x34aefe[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  console.log("会黑，风险自担！！！");
  console.log("TG频道：https://t.me/dylan_jdpro");
  for (let _0x16a10d = 0; _0x16a10d < 5; _0x16a10d++) {
    _0x3f3994 = _0x34aefe[_0x16a10d];
    if (_0x3f3994) {
      $.UserName = decodeURIComponent(_0x3f3994.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3f3994.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x16a10d + 1;
      $.isLogin = true;
      $.nickName = "";
      $.maxJoyCount = 10;
      $.UA = "jdltapp;android;3.8.20;;;appBuild/2324;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1663930747414%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%2C%22od%22%3A%22ZQHuZtc3CzCjZtdvZM1rEQO5BJvsD2OjCzPsZwHsZQU2YzKz%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jd.jdlite%22%7D;Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.136 Mobile Safari/537.36";
      await _0xb6b5c8();
      if (!$.isLogin) {
        const _0x5d1a45 = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x5d1a45);
        $.isNode() && (await _0x4e6453.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.hasJoyCoin = true;
      await _0x2cb5ae();
      await $.wait(200);
      await _0x54c1ad(true);
      await $.wait(500);
      if (!$.joyBaseInfo) {
        continue;
      }
      $.activityJoyList = [];
      $.workJoyInfoList = [];
      await _0x52f251(true);
      await $.wait(500);
      await _0x77e761();
      await $.wait(500);
      await _0x27a9cf($.workJoyInfoList);
      try {
        await _0x320d1f($.activityJoyList);
        await $.wait(200);
      } catch (_0x1b6f9b) {
        $.logErr(_0x1b6f9b);
      }
      await $.wait(1500);
    }
  }
})().catch(_0x53cf12 => $.logErr(_0x53cf12)).finally(() => $.done());
async function _0x54c1ad(_0x77f50 = false) {
  return new Promise(async _0x5ebe08 => {
    let _0x1ee331 = await _0x5eee97("joyBaseInfo", "{\"taskId\":\"\",\"inviteType\":\"\",\"inviterPin\":\"\",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "4abce");
    $.post(_0x1ee331, async (_0x407321, _0x3da4d2, _0x574e10) => {
      try {
        _0x407321 ? (console.log("" + JSON.stringify(_0x407321)), console.log("getJoyBaseInfo API请求失败，请检查网路重试")) : (_0x574e10 = JSON.parse(_0x574e10), _0x574e10.success ? _0x77f50 && ($.log("等级:" + _0x574e10.data.level + "|金币:" + _0x352e41(_0x574e10.data.joyCoin)), _0x574e10.data.level >= 30 && $.isNode() && (await _0x4e6453.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x574e10.data.level + "\n已达最高30级\n请到京东极速版APP提现6.66\n提现入口：我的->汪汪乐园->点左上角等级"))) : $.log(_0x574e10.errMsg), $.joyBaseInfo = _0x574e10.data);
      } catch (_0x7dea7f) {
        $.logErr(_0x7dea7f, _0x3da4d2);
      } finally {
        _0x5ebe08($.joyBaseInfo);
      }
    });
  });
}
function _0x52f251(_0x538a8b = false) {
  return new Promise(async _0x18440e => {
    let _0x36fe25 = await _0x4173d5("joyList", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "e18ed");
    $.get(_0x36fe25, async (_0x1f119f, _0x3505f3, _0x129360) => {
      try {
        if (_0x1f119f) {
          console.log("" + JSON.stringify(_0x1f119f));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          _0x129360 = JSON.parse(_0x129360);
          if (_0x129360.success) {
            if (_0x538a8b) {
              $.log("\n===== JOY 状态 start =====");
              $.log("在逛街的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
              for (let _0x2491ad = 0; _0x2491ad < _0x129360.data.activityJoyList.length; _0x2491ad++) {
                $.log("id:" + _0x129360.data.activityJoyList[_0x2491ad].id + "|name: " + _0x129360.data.activityJoyList[_0x2491ad].name + "|level: " + _0x129360.data.activityJoyList[_0x2491ad].level);
                if (_0x129360.data.activityJoyList[_0x2491ad].level >= 30 && $.isNode()) {
                  await _0x4e6453.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x129360.data.level + "\n已达到单次最高等级奖励\n请尽快前往活动查看领取\n活动入口：京东极速版APP->汪汪乐园\n");
                }
              }
              $.log("\n在铲土的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
              for (let _0x2898c7 = 0; _0x2898c7 < _0x129360.data.workJoyInfoList.length; _0x2898c7++) {
                $.log("工位: " + _0x129360.data.workJoyInfoList[_0x2898c7].location + " [" + (_0x129360.data.workJoyInfoList[_0x2898c7].unlock ? "已开" : "未开") + "]|JOY= " + (_0x129360.data.workJoyInfoList[_0x2898c7].joyDTO ? "id:" + _0x129360.data.workJoyInfoList[_0x2898c7].joyDTO.id + "|name: " + _0x129360.data.workJoyInfoList[_0x2898c7].joyDTO.name + "|level: " + _0x129360.data.workJoyInfoList[_0x2898c7].joyDTO.level : "空位"));
              }
              $.log("===== JOY 状态  end  =====\n");
            }
          } else {
            $.log(_0x129360.errMsg);
          }
          $.activityJoyList = _0x129360.data.activityJoyList;
          $.workJoyInfoList = _0x129360.data.workJoyInfoList;
        }
      } catch (_0x47cb4a) {
        $.logErr(_0x47cb4a, _0x3505f3);
      } finally {
        _0x18440e(_0x129360.data);
      }
    });
  });
}
function _0x77e761() {
  return new Promise(async _0x5a479a => {
    let _0x228755 = await _0x5eee97("gameShopList", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x228755, async (_0x1631e9, _0x39b7b3, _0x4e9c83) => {
      try {
        _0x1631e9 ? (console.log("" + JSON.stringify(_0x1631e9)), console.log("getGameShopList API请求失败，请检查网路重试")) : _0x4e9c83 = JSON.parse(_0x4e9c83).data.filter(_0x54b9bf => _0x54b9bf.shopStatus === 1);
      } catch (_0x41c9ce) {
        $.logErr(_0x41c9ce, _0x39b7b3);
      } finally {
        _0x5a479a(_0x4e9c83);
      }
    });
  });
}
async function _0x4bb64c(_0x5e0321, _0x547554) {
  let _0xa8e231 = _0x547554.filter(_0x308e37 => _0x308e37.unlock && _0x308e37.joyDTO === null);
  if (_0x5e0321.length !== 0 && _0xa8e231.length !== 0) {
    let _0x1cefef = Math.max.apply(Math, _0x5e0321.map(_0xe19e4d => _0xe19e4d.level)),
      _0x147b84 = _0x5e0321.filter(_0x18dcbc => _0x18dcbc.level === _0x1cefef);
    $.log("下地干活！ joyId= " + _0x147b84[0].id + " location= " + _0xa8e231[0].location);
    await _0x57de9f(_0x147b84[0].id, _0xa8e231[0].location);
    await _0x52f251();
    await _0x4bb64c($.activityJoyList, $.workJoyInfoList);
  } else {
    $.JOY_COIN_MAXIMIZE && (await _0x21ce36(_0xa8e231));
  }
}
async function _0x21ce36(_0x568e3a) {
  if (_0x568e3a.length !== 0 && $.hasJoyCoin) {
    $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
    let _0x40e8f1 = await _0x54c1ad(),
      _0x396086 = _0x40e8f1.joyCoin;
    $.log("还有" + _0x396086 + "金币,看看还能买啥下地");
    let _0x205b1f = await _0x77e761(),
      _0x374fb9 = false;
    for (let _0x1bf04a = _0x205b1f.length - 1; _0x1bf04a >= 0 && _0x1bf04a - 3 >= 0; _0x1bf04a--) {
      if (_0x396086 > _0x205b1f[_0x1bf04a].consume) {
        $.log("买一只 " + _0x205b1f[_0x1bf04a].userLevel + "级的！");
        _0x396086 = _0x396086 - _0x205b1f[_0x1bf04a].consume;
        let _0x237632 = await _0x4ddee(_0x205b1f[_0x1bf04a].userLevel);
        if (!_0x237632.success) {
          break;
        } else {
          _0x374fb9 = true;
          $.hasJoyCoin = false;
          _0x1bf04a++;
        }
      }
    }
    $.hasJoyCoin = false;
    _0x374fb9 && (await _0x52f251(), await $.wait(200), await _0x4bb64c($.activityJoyList, $.workJoyInfoList), await $.wait(200), await _0x54c1ad());
  }
}
async function _0x27a9cf(_0x39440f) {
  if (_0x39440f.filter(_0x575cbb => _0x575cbb.joyDTO).length === 0) {
    $.log("工位清理完成！");
    return true;
  }
  for (let _0xb17be6 = 0; _0xb17be6 < _0x39440f.length; _0xb17be6++) {
    _0x39440f[_0xb17be6].unlock && _0x39440f[_0xb17be6].joyDTO && ($.log("从工位移除 => id:" + _0x39440f[_0xb17be6].joyDTO.id + "|name: " + _0x39440f[_0xb17be6].joyDTO.name + "|level: " + _0x39440f[_0xb17be6].joyDTO.level), await _0x57de9f(_0x39440f[_0xb17be6].joyDTO.id, 0));
  }
  await _0x52f251();
  await $.wait(200);
  await _0x27a9cf($.workJoyInfoList);
}
async function _0x320d1f(_0x34f851) {
  let _0xe60a3 = Math.min.apply(Math, _0x34f851.map(_0x419f4c => _0x419f4c.level)),
    _0x82b48 = _0x34f851.filter(_0x53650e => _0x53650e.level === _0xe60a3),
    _0x5b30f2 = await _0x54c1ad();
  await $.wait(1000);
  !_0x5b30f2.fastBuyLevel && (await $.wait(2000), _0x5b30f2 = await _0x54c1ad());
  if (!_0x5b30f2.fastBuyLevel) {
    $.log("获取信息失败，下地后跳出......");
    await _0x4bb64c($.activityJoyList, $.workJoyInfoList);
    return false;
  }
  let _0x31a175 = _0x5b30f2.fastBuyLevel;
  if (_0x31a175 > 25) {
    return;
  }
  if (_0x82b48.length >= 2) {
    $.log("开始合成" + (_0xe60a3 + 1) + "级JOY");
    await $.wait(2000);
    await _0x5de5bb(_0x82b48[0].id, _0x82b48[1].id);
    if (_0xfd3043) {
      _0x5b30f2 = await _0x54c1ad();
      await $.wait(200);
      await _0x4bb64c($.activityJoyList, $.workJoyInfoList);
      return false;
    }
    await _0x52f251();
    await $.wait(200);
    await _0x320d1f($.activityJoyList);
  } else {
    if (_0x82b48.length === 1 && _0x82b48[0].level < _0x31a175) {
      let _0x31fb16 = await _0x4ddee(_0x82b48[0].level, $.activityJoyList);
      await $.wait(200);
      if (_0x31fb16.success) {
        await _0x52f251();
        await $.wait(200);
        await _0x320d1f($.activityJoyList);
      } else {
        $.log("完成！");
        await _0x4bb64c($.activityJoyList, $.workJoyInfoList);
      }
    } else {
      $.log("没有可合成的JOY开始买买买🛒🛒🛒");
      $.log("最高能买" + _0x31a175 + "级的JOY，剩余" + _0x352e41(_0x5b30f2.joyCoin) + "金币");
      let _0x3d2ef9 = await _0x4ddee(_0x31a175, $.activityJoyList);
      await $.wait(1000);
      _0x3d2ef9.success ? (await _0x52f251(), await $.wait(200), await _0x320d1f($.activityJoyList)) : ($.log("完成！"), await _0x4bb64c($.activityJoyList, $.workJoyInfoList));
    }
  }
}
function _0x57de9f(_0x8bfd65, _0x4e7af8) {
  return new Promise(async _0x538edc => {
    let _0x4c7807 = await _0x4173d5("joyMove", "{\"joyId\":" + _0x8bfd65 + ",\"location\":" + _0x4e7af8 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "50788");
    $.post(_0x4c7807, async (_0x43f220, _0x109991, _0x2ff0b2) => {
      try {
        _0x43f220 ? (console.log("" + JSON.stringify(_0x43f220)), console.log("doJoyMove请求失败，请检查网路重试")) : (_0x4e7af8 !== 0 && $.log("下地完成！"), _0x2ff0b2 = JSON.parse(_0x2ff0b2));
      } catch (_0x54d9b3) {
        $.logErr(_0x54d9b3, _0x109991);
      } finally {
        _0x538edc(_0x2ff0b2.data);
      }
    });
  });
}
function _0x5de5bb(_0x5ab2d0, _0x34543d) {
  return new Promise(async _0x4fdffa => {
    let _0x1e42bb = await _0x4173d5("joyMergeGet", "{\"joyOneId\":" + _0x5ab2d0 + ",\"joyTwoId\":" + _0x34543d + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "b08cf");
    $.get(_0x1e42bb, async (_0xc45e6c, _0x344b41, _0x191f86) => {
      try {
        if (_0xc45e6c) {
          console.log("" + JSON.stringify(_0xc45e6c));
          console.log("doJoyMerge API请求失败，请检查网路重试");
          _0x191f86 = {};
          _0xfd3043 = true;
        } else {
          _0x191f86 = JSON.parse(_0x191f86);
          $.log("合成" + (_0x191f86.success ? "成功！" : "失败！【" + _0x191f86.errMsg + "】 code=" + _0x191f86.code));
          _0x191f86.code == "1006" && (_0xfd3043 = true);
        }
      } catch (_0x372f27) {
        $.logErr(_0x372f27, _0x344b41);
        _0xfd3043 = true;
      } finally {
        _0x4fdffa(_0x191f86.data);
      }
    });
  });
}
async function _0x4ddee(_0x33f3b5, _0x3d968c) {
  return new Promise(async _0x318d70 => {
    let _0xcbba81 = await _0x5eee97("joyBuy", "{\"level\":" + _0x33f3b5 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "ffb36");
    $.post(_0xcbba81, async (_0xe3ef1d, _0x3968ed, _0x43decc) => {
      try {
        if (_0xe3ef1d) {
          console.log("" + JSON.stringify(_0xe3ef1d));
          console.log("doJoyBuy API请求失败，请检查网路重试");
        } else {
          _0x43decc = JSON.parse(_0x43decc);
          let _0x565d3f = "【不知道啥意思】";
          switch (_0x43decc.code) {
            case 519:
              _0x565d3f = "【没钱了】";
              break;
            case 518:
              _0x565d3f = "【没空位】";
              if (_0x3d968c) {
                $.log("满员了，删掉低级JOY");
                let _0x120af5 = Math.min.apply(Math, _0x3d968c.map(_0x407000 => _0x407000.level));
                await _0x2d2314(_0x3d968c.filter(_0x6ccf30 => _0x6ccf30.level === _0x120af5)[0].id);
              }
              break;
            case 0:
              _0x565d3f = "【OK】";
              break;
          }
          $.log("购买" + _0x33f3b5 + "级JOY " + (_0x43decc.success ? "成功！" : "失败！code=" + _0x43decc.code + " 意思是" + _0x565d3f));
        }
      } catch (_0x37513f) {
        $.logErr(_0x37513f, _0x3968ed);
      } finally {
        _0x318d70(_0x43decc);
      }
    });
  });
}
function _0x2d2314(_0x51ef7c) {
  return new Promise(async _0x1cd03a => {
    let _0x1d4a22 = await _0x5eee97("joyRecovery", "body={\"joyId\":" + _0x51ef7c + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x1d4a22, async (_0x50c3d3, _0x438fb8, _0x231ffb) => {
      try {
        _0x50c3d3 ? (console.log("" + JSON.stringify(_0x50c3d3)), console.log("doJoyRecovery API请求失败，请检查网路重试"), _0x231ffb = {}) : (_0x231ffb = JSON.parse(_0x231ffb), $.log("回收🐶 " + (_0x231ffb.success ? "成功！" : "失败！【" + _0x231ffb.errMsg + "】 code=" + _0x231ffb.code)));
      } catch (_0x4c99b4) {
        $.logErr(_0x4c99b4, _0x438fb8);
      } finally {
        _0x1cd03a(_0x231ffb);
      }
    });
  });
}
function _0x453ba8() {
  return new Promise(async _0x501a03 => {
    let _0x2f58a0 = await _0x5eee97("joyRestart", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x2f58a0, async (_0x223bfa, _0x20206d, _0x3ce38c) => {
      try {
        _0x223bfa ? (console.log("" + JSON.stringify(_0x223bfa)), console.log("doJoyRestart API请求失败，请检查网路重试")) : (_0x3ce38c = JSON.parse(_0x3ce38c), $.log("新场景解锁 " + (_0x3ce38c.success ? "成功！" : "失败！【" + _0x3ce38c.errMsg + "】 code=" + _0x3ce38c.code)));
      } catch (_0x3519e4) {
        $.logErr(_0x3519e4, _0x20206d);
      } finally {
        _0x501a03(_0x3ce38c);
      }
    });
  });
}
function _0x3bb1f2() {
  return new Promise(async _0x47bab9 => {
    let _0x133ba4 = await _0x5eee97("newStartReward", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x133ba4, async (_0x2456aa, _0x29bce5, _0x5636d6) => {
      try {
        _0x2456aa ? (console.log("" + JSON.stringify(_0x2456aa)), console.log("newStartReward API请求失败，请检查网路重试")) : _0x5636d6 = JSON.parse(_0x5636d6);
      } catch (_0x51bd62) {
        $.logErr(_0x51bd62, _0x29bce5);
      } finally {
        _0x47bab9(_0x5636d6);
      }
    });
  });
}
function _0x2cb5ae() {
  return new Promise(async _0x5b0c4b => {
    let _0x18b480 = await _0x5eee97("gameMyPrize", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x18b480, async (_0x5dcec9, _0x25ca68, _0x3757e8) => {
      try {
        if (_0x5dcec9) {
          console.log("" + JSON.stringify(_0x5dcec9));
          console.log("getGameMyPrize API请求失败，请检查网路重试");
        } else {
          _0x3757e8 = JSON.parse(_0x3757e8);
          if (_0x3757e8.success && _0x3757e8.data) {
            $.Vos = _0x3757e8.data.gamePrizeItemVos;
            $.overVos = _0x3757e8.data.gameBigPrizeVO;
            for (let _0x1cde97 = 0; _0x1cde97 < $.Vos.length; _0x1cde97++) {
              if ($.Vos[_0x1cde97].prizeType == 4 && $.Vos[_0x1cde97].status == 1 && $.Vos[_0x1cde97].prizeTypeVO.prizeUsed == 0) {
                $.log("\n当前账号有【" + $.Vos[_0x1cde97].prizeName + "】可提现");
                $.id = $.Vos[_0x1cde97].prizeTypeVO.id;
                $.poolBaseId = $.Vos[_0x1cde97].prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.Vos[_0x1cde97].prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.Vos[_0x1cde97].prizeTypeVO.prizeBaseId;
                await _0x5104d1($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
            if ($.overVos) {
              if ($.overVos.prizeType == 4 && $.overVos.topLevelStatus == 1 && $.overVos.prizeTypeVO.prizeUsed == 0) {
                $.log("\n当前账号有【" + $.overVos.bigPrizeName + "】可提现");
                $.id = $.overVos.prizeTypeVO.id;
                $.poolBaseId = $.overVos.prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.overVos.prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.overVos.prizeTypeVO.prizeBaseId;
                await _0x5104d1($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
          }
        }
      } catch (_0x2997ea) {
        $.logErr(_0x2997ea, _0x25ca68);
      } finally {
        _0x5b0c4b(_0x3757e8);
      }
    });
  });
}
function _0x5104d1(_0x46357a, _0x15361b, _0x15297f, _0x15c041) {
  return new Promise(async _0x1fe1c8 => {
    let _0x3c0114 = await _0x5eee97("apCashWithDraw", "{\"businessSource\":\"JOY_PARK\",\"base\":{\"id\":" + _0x46357a + ",\"business\":\"joyPark\",\"poolBaseId\":" + _0x15361b + ",\"prizeGroupId\":" + _0x15297f + ",\"prizeBaseId\":" + _0x15c041 + ",\"prizeType\":4},\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x3c0114, async (_0x19a43c, _0x3a361f, _0x285dae) => {
      try {
        _0x19a43c ? (console.log("" + JSON.stringify(_0x19a43c)), console.log("apCashWithDraw API请求失败，请检查网路重试")) : (_0x285dae = JSON.parse(_0x285dae), _0x285dae.success && _0x285dae.data && console.log("提现结果：" + JSON.stringify(_0x285dae)));
      } catch (_0x2b0c53) {
        $.logErr(_0x2b0c53, _0x3a361f);
      } finally {
        _0x1fe1c8(_0x285dae);
      }
    });
  });
}
async function _0x5eee97(_0x44f009, _0x16139e, _0x13b7a4) {
  let _0xbb4f49;
  if (_0x13b7a4) {
    const _0x51a9e2 = {
      "appId": _0x13b7a4,
      "fn": _0x44f009,
      "body": _0x16139e,
      "apid": "activities_platform",
      "ver": "3.8.20",
      "cl": "ios",
      "user": $.UserName,
      "code": 0,
      "ua": $.UA
    };
    _0xbb4f49 = await _0x562db5.getbody(_0x51a9e2);
  } else {
    _0xbb4f49 = "functionId=" + _0x44f009 + "&body=" + _0x16139e + "&appid=activities_platform&client=android&clientVersion=3.8.20&" + Date.now();
  }
  const _0x1d2cd0 = {
    "User-Agent": $.UA,
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "api.m.jd.com",
    "Origin": "https://joypark.jd.com",
    "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&sid=ee1b8539bb3ec51b3421589754cf79dw&un_area=2_2813_61130_0",
    "Cookie": _0x3f3994
  };
  const _0x39123d = {
    "url": "https://api.m.jd.com",
    "body": _0xbb4f49,
    "headers": _0x1d2cd0
  };
  return _0x39123d;
}
async function _0x4173d5(_0x23df89, _0x1dc710, _0x540d6c) {
  let _0xa570f7;
  if (_0x540d6c) {
    const _0x8aae80 = {
      "appId": _0x540d6c,
      "fn": _0x23df89,
      "body": _0x1dc710,
      "apid": "activities_platform",
      "ver": "3.8.20",
      "cl": "ios",
      "user": $.UserName,
      "code": 0,
      "ua": $.UA
    };
    _0xa570f7 = await _0x562db5.getbody(_0x8aae80);
  } else {
    _0xa570f7 = "functionId=" + _0x23df89 + "&body=" + _0x1dc710 + "&appid=activities_platform&client=android&clientVersion=3.8.20&" + Date.now();
  }
  const _0x1b7196 = {
    "User-Agent": $.UA,
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "api.m.jd.com",
    "Origin": "https://joypark.jd.com",
    "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&sid=ee1b8539bb3ec51b3421589754cf79dw&un_area=2_2813_61130_0",
    "Cookie": _0x3f3994
  };
  const _0x1b35d9 = {
    "url": "https://api.m.jd.com/client.action?functionId=" + _0x23df89 + "&" + _0xa570f7,
    "headers": _0x1b7196
  };
  return _0x1b35d9;
}
function _0xb6b5c8() {
  return new Promise(async _0x512b51 => {
    const _0x42e75a = {
      "Accept": "application/json,text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Cookie": _0x3f3994,
      "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
      "User-Agent": $.UA
    };
    const _0x244cf6 = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": _0x42e75a
    };
    $.post(_0x244cf6, (_0x5959cd, _0x447bc8, _0xbe88b7) => {
      try {
        if (_0x5959cd) {
          console.log("" + JSON.stringify(_0x5959cd));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0xbe88b7) {
            _0xbe88b7 = JSON.parse(_0xbe88b7);
            if (_0xbe88b7.retcode === 13) {
              $.isLogin = false;
              return;
            }
            _0xbe88b7.retcode === 0 ? $.nickName = _0xbe88b7.base && _0xbe88b7.base.nickname || $.UserName : $.nickName = $.UserName;
          } else {
            console.log("京东服务器返回空数据");
          }
        }
      } catch (_0x5bfdbf) {
        $.logErr(_0x5bfdbf, _0x447bc8);
      } finally {
        _0x512b51();
      }
    });
  });
}
function _0x11518c(_0x135e25) {
  _0x135e25 = _0x135e25 || 32;
  let _0x41347e = "abcdef0123456789",
    _0x2e31d8 = _0x41347e.length,
    _0x1be4e2 = "";
  for (i = 0; i < _0x135e25; i++) {
    _0x1be4e2 += _0x41347e.charAt(Math.floor(Math.random() * _0x2e31d8));
  }
  return _0x1be4e2;
}
function _0x4ce300(_0x42466c) {
  if (typeof _0x42466c == "string") {
    try {
      return JSON.parse(_0x42466c);
    } catch (_0x23d8a4) {
      console.log(_0x23d8a4);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function _0x352e41(_0x5108a8) {
  const _0x2c8de0 = ["", "", ""];
  let _0x97255e = 1000,
    _0x3e5c75 = 3,
    _0x39a9e9 = "",
    _0x432bba = 1;
  while (_0x5108a8 / _0x97255e >= 1) {
    _0x97255e *= 10;
    _0x3e5c75 += 1;
  }
  if (_0x3e5c75 <= 4) {
    _0x2c8de0[0] = parseInt(_0x5108a8 / 1000) + "";
    _0x2c8de0[1] = "千";
  } else {
    if (_0x3e5c75 <= 8) {
      _0x39a9e9 = parseInt(_0x3e5c75 - 4) / 3 > 1 ? "千万" : "万";
      _0x432bba = _0x39a9e9 === "万" ? 10000 : 10000000;
      _0x5108a8 % _0x432bba === 0 ? _0x2c8de0[0] = parseInt(_0x5108a8 / _0x432bba) + "" : _0x2c8de0[0] = parseFloat(_0x5108a8 / _0x432bba).toFixed(2) + "";
      _0x2c8de0[1] = _0x39a9e9;
    } else {
      if (_0x3e5c75 <= 16) {
        _0x39a9e9 = (_0x3e5c75 - 8) / 3 > 1 ? "千亿" : "亿";
        _0x39a9e9 = (_0x3e5c75 - 8) / 4 > 1 ? "兆" : _0x39a9e9;
        _0x39a9e9 = (_0x3e5c75 - 8) / 7 > 1 ? "千兆" : _0x39a9e9;
        _0x432bba = 1;
        if (_0x39a9e9 === "亿") {
          _0x432bba = 100000000;
        } else {
          if (_0x39a9e9 === "千亿") {
            _0x432bba = 100000000000;
          } else {
            if (_0x39a9e9 === "兆") {
              _0x432bba = 1000000000000;
            } else {
              _0x39a9e9 === "千兆" && (_0x432bba = 1000000000000000);
            }
          }
        }
        _0x5108a8 % _0x432bba === 0 ? _0x2c8de0[0] = parseInt(_0x5108a8 / _0x432bba) + "" : _0x2c8de0[0] = parseFloat(_0x5108a8 / _0x432bba).toFixed(2) + "";
        _0x2c8de0[1] = _0x39a9e9;
      }
    }
  }
  _0x5108a8 < 1000 && (_0x2c8de0[0] = _0x5108a8 + "", _0x2c8de0[1] = "");
  return _0x2c8de0.join("");
}