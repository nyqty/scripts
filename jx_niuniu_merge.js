/*
牛牛乐园 入口：京喜特价-我的
7 7 7 7 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jx_niuniu_merge.js
跑会黑，一周后解，循环
updatetime:2023/08/27 fix
*/
const Env=require('./utils/Env.js');
const $ = new Env('牛牛乐园合成');
const _0x4ab5cd = $.isNode() ? require("./jdCookie.js") : "",
  _0x31ba87 = require("./USER_AGENTS"),
  _0x236f54 = $.isNode() ? require("./sendNotify") : "",
  _0x3bacb5 = require("./function/dylany");
let _0x5b370f = [],
  _0x3afc2a = "",
  _0x2e8be1 = false;
if ($.isNode()) {
  Object.keys(_0x4ab5cd).forEach(_0x53d822 => {
    _0x5b370f.push(_0x4ab5cd[_0x53d822]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x5b370f = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3e0883($.getdata("CookiesJD") || "[]").map(_0x23bc6a => _0x23bc6a.cookie)].filter(_0x53a21f => !!_0x53a21f);
$.JOY_COIN_MAXIMIZE = 1;
message = "";
!(async () => {
  if (!_0x5b370f[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  console.log("会黑，风险自担！！！");
  
  for (let _0x530e9e = 0; _0x530e9e < 5; _0x530e9e++) {
    _0x3afc2a = _0x5b370f[_0x530e9e];
    if (_0x3afc2a) {
      $.UserName = decodeURIComponent(_0x3afc2a.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3afc2a.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x530e9e + 1;
      $.isLogin = true;
      $.nickName = "";
      $.maxJoyCount = 10;
      $.UA = _0x31ba87.UARAM ? _0x31ba87.UARAM(1) : _0x31ba87.USER_AGENT;
      await _0x4c672a();
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x236f54.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.hasJoyCoin = true;
      await _0x4ce360();
      await $.wait(200);
      await _0x21821d(true);
      await $.wait(500);
      if (!$.joyBaseInfo) continue;
      $.activityJoyList = [];
      $.workJoyInfoList = [];
      await _0x51ce3c(true);
      await $.wait(500);
      await _0x33402d();
      await $.wait(500);
      await _0x3be048($.workJoyInfoList);
      try {
        await _0x3499fd($.activityJoyList);
        await $.wait(200);
      } catch (_0x3d6b44) {
        $.logErr(_0x3d6b44);
      }
      await $.wait(1500);
    }
  }
})().catch(_0x346a43 => $.logErr(_0x346a43)).finally(() => $.done());
async function _0x21821d(_0x29b387 = false) {
  return new Promise(async _0xa51bcf => {
    let _0x5c5901 = await _0x2160cf("joyBaseInfo", "{\"taskId\":\"\",\"inviteType\":\"\",\"inviterPin\":\"\",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "4abce");
    $.post(_0x5c5901, async (_0x3c5cc1, _0x3a627c, _0xd992b) => {
      try {
        _0x3c5cc1 ? (console.log("" + JSON.stringify(_0x3c5cc1)), console.log("getJoyBaseInfo API请求失败，请检查网路重试")) : (_0xd992b = JSON.parse(_0xd992b), _0xd992b.success ? _0x29b387 && ($.log("等级:" + _0xd992b.data.level + "|金币:" + _0x2e2135(_0xd992b.data.joyCoin)), _0xd992b.data.level >= 30 && $.isNode() && (await _0x236f54.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0xd992b.data.level + "\n已达最高30级\n请到京东极速版APP提现6.66\n提现入口：我的->汪汪乐园->点左上角等级"))) : $.log(_0xd992b.errMsg), $.joyBaseInfo = _0xd992b.data);
      } catch (_0x1027db) {
        $.logErr(_0x1027db, _0x3a627c);
      } finally {
        _0xa51bcf($.joyBaseInfo);
      }
    });
  });
}
function _0x51ce3c(_0x1b227a = false) {
  return new Promise(async _0x28cb7d => {
    let _0x168407 = await _0x2160cf("joyList", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "e18ed");
    $.post(_0x168407, async (_0x4e8e78, _0x188fd2, _0x3cbf99) => {
      try {
        if (_0x4e8e78) console.log("" + JSON.stringify(_0x4e8e78)), console.log($.name + " API请求失败，请检查网路重试");else {
          _0x3cbf99 = JSON.parse(_0x3cbf99);
          if (_0x3cbf99.success) {
            if (_0x1b227a) {
              $.log("\n===== JOY 状态 start =====");
              $.log("在逛街的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
              for (let _0x38c908 = 0; _0x38c908 < _0x3cbf99.data.activityJoyList.length; _0x38c908++) {
                $.log("id:" + _0x3cbf99.data.activityJoyList[_0x38c908].id + "|name: " + _0x3cbf99.data.activityJoyList[_0x38c908].name + "|level: " + _0x3cbf99.data.activityJoyList[_0x38c908].level);
                _0x3cbf99.data.activityJoyList[_0x38c908].level >= 30 && $.isNode() && (await _0x236f54.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x3cbf99.data.level + "\n已达到单次最高等级奖励\n请尽快前往活动查看领取\n活动入口：京东极速版APP->汪汪乐园\n"));
              }
              $.log("\n在铲土的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
              for (let _0x5caf7b = 0; _0x5caf7b < _0x3cbf99.data.workJoyInfoList.length; _0x5caf7b++) {
                $.log("工位: " + _0x3cbf99.data.workJoyInfoList[_0x5caf7b].location + " [" + (_0x3cbf99.data.workJoyInfoList[_0x5caf7b].unlock ? "已开" : "未开") + "]|JOY= " + (_0x3cbf99.data.workJoyInfoList[_0x5caf7b].joyDTO ? "id:" + _0x3cbf99.data.workJoyInfoList[_0x5caf7b].joyDTO.id + "|name: " + _0x3cbf99.data.workJoyInfoList[_0x5caf7b].joyDTO.name + "|level: " + _0x3cbf99.data.workJoyInfoList[_0x5caf7b].joyDTO.level : "空位"));
              }
              $.log("===== JOY 状态  end  =====\n");
            }
          } else $.log(_0x3cbf99.errMsg);
          $.activityJoyList = _0x3cbf99.data.activityJoyList;
          $.workJoyInfoList = _0x3cbf99.data.workJoyInfoList;
        }
      } catch (_0x45eb39) {
        $.logErr(_0x45eb39, _0x188fd2);
      } finally {
        _0x28cb7d(_0x3cbf99.data);
      }
    });
  });
}
function _0x33402d() {
  return new Promise(async _0x3137b2 => {
    let _0x1139dd = await _0x2160cf("gameShopList", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x1139dd, async (_0x456fa2, _0xdd8ffa, _0x524965) => {
      try {
        _0x456fa2 ? (console.log("" + JSON.stringify(_0x456fa2)), console.log("getGameShopList API请求失败，请检查网路重试")) : _0x524965 = JSON.parse(_0x524965).data.filter(_0x1136b3 => _0x1136b3.shopStatus === 1);
      } catch (_0x221bfd) {
        $.logErr(_0x221bfd, _0xdd8ffa);
      } finally {
        _0x3137b2(_0x524965);
      }
    });
  });
}
async function _0x2ce1df(_0x4b9d31, _0x14d446) {
  let _0x4e4aef = _0x14d446.filter(_0x3910d0 => _0x3910d0.unlock && _0x3910d0.joyDTO === null);
  if (_0x4b9d31.length !== 0 && _0x4e4aef.length !== 0) {
    let _0x41c5f7 = Math.max.apply(Math, _0x4b9d31.map(_0x58f627 => _0x58f627.level)),
      _0x49e2db = _0x4b9d31.filter(_0x11a84a => _0x11a84a.level === _0x41c5f7);
    $.log("下地干活！ joyId= " + _0x49e2db[0].id + " location= " + _0x4e4aef[0].location);
    await _0x5b0ecc(_0x49e2db[0].id, _0x4e4aef[0].location);
    await _0x51ce3c();
    await _0x2ce1df($.activityJoyList, $.workJoyInfoList);
  } else $.JOY_COIN_MAXIMIZE && (await _0x2793ec(_0x4e4aef));
}
async function _0x2793ec(_0x23ebc4) {
  if (_0x23ebc4.length !== 0 && $.hasJoyCoin) {
    $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
    let _0x4821f0 = await _0x21821d(),
      _0x575b81 = _0x4821f0.joyCoin;
    $.log("还有" + _0x575b81 + "金币,看看还能买啥下地");
    let _0x42d718 = await _0x33402d(),
      _0x50cd2f = false;
    for (let _0x4629b9 = _0x42d718.length - 1; _0x4629b9 >= 0 && _0x4629b9 - 3 >= 0; _0x4629b9--) {
      if (_0x575b81 > _0x42d718[_0x4629b9].consume) {
        $.log("买一只 " + _0x42d718[_0x4629b9].userLevel + "级的！");
        _0x575b81 = _0x575b81 - _0x42d718[_0x4629b9].consume;
        let _0x10c491 = await _0x35c4cb(_0x42d718[_0x4629b9].userLevel);
        if (!_0x10c491.success) {
          break;
        } else _0x50cd2f = true, $.hasJoyCoin = false, _0x4629b9++;
      }
    }
    $.hasJoyCoin = false;
    if (_0x50cd2f) {
      await _0x51ce3c();
      await $.wait(200);
      await _0x2ce1df($.activityJoyList, $.workJoyInfoList);
      await $.wait(200);
      await _0x21821d();
    }
  }
}
async function _0x3be048(_0x3667e9) {
  if (_0x3667e9.filter(_0x2a9e13 => _0x2a9e13.joyDTO).length === 0) return $.log("工位清理完成！"), true;
  for (let _0x256b4f = 0; _0x256b4f < _0x3667e9.length; _0x256b4f++) {
    _0x3667e9[_0x256b4f].unlock && _0x3667e9[_0x256b4f].joyDTO && ($.log("从工位移除 => id:" + _0x3667e9[_0x256b4f].joyDTO.id + "|name: " + _0x3667e9[_0x256b4f].joyDTO.name + "|level: " + _0x3667e9[_0x256b4f].joyDTO.level), await _0x5b0ecc(_0x3667e9[_0x256b4f].joyDTO.id, 0));
  }
  await _0x51ce3c();
  await $.wait(200);
  await _0x3be048($.workJoyInfoList);
}
async function _0x3499fd(_0x21aa86) {
  let _0x5bca0e = Math.min.apply(Math, _0x21aa86.map(_0x1ceeaa => _0x1ceeaa.level)),
    _0x4bd84c = _0x21aa86.filter(_0x4207bd => _0x4207bd.level === _0x5bca0e),
    _0x137918 = await _0x21821d();
  await $.wait(1000);
  !_0x137918.fastBuyLevel && (await $.wait(2000), _0x137918 = await _0x21821d());
  if (!_0x137918.fastBuyLevel) {
    return $.log("获取信息失败，下地后跳出......"), await _0x2ce1df($.activityJoyList, $.workJoyInfoList), false;
  }
  let _0x9012d7 = _0x137918.fastBuyLevel;
  if (_0x9012d7 > 25) return;
  if (_0x4bd84c.length >= 2) {
    $.log("开始合成" + (_0x5bca0e + 1) + "级JOY");
    await $.wait(2000);
    await _0x57e796(_0x4bd84c[0].id, _0x4bd84c[1].id);
    if (_0x2e8be1) {
      return _0x137918 = await _0x21821d(), await $.wait(200), await _0x2ce1df($.activityJoyList, $.workJoyInfoList), false;
    }
    await _0x51ce3c();
    await $.wait(200);
    await _0x3499fd($.activityJoyList);
  } else {
    if (_0x4bd84c.length === 1 && _0x4bd84c[0].level < _0x9012d7) {
      let _0x1f218d = await _0x35c4cb(_0x4bd84c[0].level, $.activityJoyList);
      await $.wait(200);
      _0x1f218d.success ? (await _0x51ce3c(), await $.wait(200), await _0x3499fd($.activityJoyList)) : ($.log("完成！"), await _0x2ce1df($.activityJoyList, $.workJoyInfoList));
    } else {
      $.log("没有可合成的JOY开始买买买🛒🛒🛒");
      $.log("最高能买" + _0x9012d7 + "级的JOY，剩余" + _0x2e2135(_0x137918.joyCoin) + "金币");
      let _0x113bf5 = await _0x35c4cb(_0x9012d7, $.activityJoyList);
      await $.wait(1000);
      _0x113bf5.success ? (await _0x51ce3c(), await $.wait(200), await _0x3499fd($.activityJoyList)) : ($.log("完成！"), await _0x2ce1df($.activityJoyList, $.workJoyInfoList));
    }
  }
}
function _0x5b0ecc(_0x5ea917, _0x21198a) {
  return new Promise(async _0x21c014 => {
    let _0x2a6275 = await _0x5bfd8d("joyMove", "{\"joyId\":" + _0x5ea917 + ",\"location\":" + _0x21198a + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "50788");
    $.post(_0x2a6275, async (_0x27da95, _0x1417ec, _0x2df55d) => {
      try {
        if (_0x27da95) console.log("" + JSON.stringify(_0x27da95)), console.log("doJoyMove请求失败，请检查网路重试");else {
          _0x21198a !== 0 && $.log("下地完成！");
          _0x2df55d = JSON.parse(_0x2df55d);
        }
      } catch (_0x1c85fb) {
        $.logErr(_0x1c85fb, _0x1417ec);
      } finally {
        _0x21c014(_0x2df55d.data);
      }
    });
  });
}
function _0x57e796(_0x13ff47, _0x1a00c4) {
  return new Promise(async _0xab8f13 => {
    let _0x3b5797 = await _0x5bfd8d("joyMergeGet", "{\"joyOneId\":" + _0x13ff47 + ",\"joyTwoId\":" + _0x1a00c4 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "b08cf");
    $.get(_0x3b5797, async (_0x40df0b, _0xd082fd, _0x354dc4) => {
      try {
        _0x40df0b ? (console.log("" + JSON.stringify(_0x40df0b)), console.log("doJoyMerge API请求失败，请检查网路重试"), _0x354dc4 = {}, _0x2e8be1 = true) : (_0x354dc4 = JSON.parse(_0x354dc4), $.log("合成" + (_0x354dc4.success ? "成功！" : "失败！【" + _0x354dc4.errMsg + "】 code=" + _0x354dc4.code)), _0x354dc4.code == "1006" && (_0x2e8be1 = true));
      } catch (_0x1e3b0d) {
        $.logErr(_0x1e3b0d, _0xd082fd);
        _0x2e8be1 = true;
      } finally {
        _0xab8f13(_0x354dc4.data);
      }
    });
  });
}
async function _0x35c4cb(_0x12eea7, _0x3682db) {
  return new Promise(async _0x5f2d41 => {
    let _0x18b28c = await _0x2160cf("joyBuy", "{\"level\":" + _0x12eea7 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "ffb36");
    $.post(_0x18b28c, async (_0x2db9a6, _0x50ba7e, _0x183e9f) => {
      try {
        if (_0x2db9a6) console.log("" + JSON.stringify(_0x2db9a6)), console.log("doJoyBuy API请求失败，请检查网路重试");else {
          _0x183e9f = JSON.parse(_0x183e9f);
          let _0x24ff68 = "【不知道啥意思】";
          switch (_0x183e9f.code) {
            case 519:
              _0x24ff68 = "【没钱了】";
              break;
            case 518:
              _0x24ff68 = "【没空位】";
              if (_0x3682db) {
                $.log("满员了，删掉低级JOY");
                let _0x413b1f = Math.min.apply(Math, _0x3682db.map(_0x2c36bc => _0x2c36bc.level));
                await _0x182d7(_0x3682db.filter(_0x4ed33c => _0x4ed33c.level === _0x413b1f)[0].id);
              }
              break;
            case 0:
              _0x24ff68 = "【OK】";
              break;
          }
          $.log("购买" + _0x12eea7 + "级JOY " + (_0x183e9f.success ? "成功！" : "失败！code=" + _0x183e9f.code + " 意思是" + _0x24ff68));
        }
      } catch (_0x1227d1) {
        $.logErr(_0x1227d1, _0x50ba7e);
      } finally {
        _0x5f2d41(_0x183e9f);
      }
    });
  });
}
function _0x182d7(_0x239b42) {
  return new Promise(async _0x555204 => {
    let _0x2a2de = await _0x2160cf("joyRecovery", "body={\"joyId\":" + _0x239b42 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x2a2de, async (_0x3b7b08, _0x48a46f, _0x20ed49) => {
      try {
        _0x3b7b08 ? (console.log("" + JSON.stringify(_0x3b7b08)), console.log("doJoyRecovery API请求失败，请检查网路重试"), _0x20ed49 = {}) : (_0x20ed49 = JSON.parse(_0x20ed49), $.log("回收🐶 " + (_0x20ed49.success ? "成功！" : "失败！【" + _0x20ed49.errMsg + "】 code=" + _0x20ed49.code)));
      } catch (_0x18470d) {
        $.logErr(_0x18470d, _0x48a46f);
      } finally {
        _0x555204(_0x20ed49);
      }
    });
  });
}
function _0x218284() {
  return new Promise(async _0x4f8a51 => {
    let _0x41129a = await _0x2160cf("joyRestart", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x41129a, async (_0x5c3f27, _0x1c7045, _0x37209e) => {
      try {
        _0x5c3f27 ? (console.log("" + JSON.stringify(_0x5c3f27)), console.log("doJoyRestart API请求失败，请检查网路重试")) : (_0x37209e = JSON.parse(_0x37209e), $.log("新场景解锁 " + (_0x37209e.success ? "成功！" : "失败！【" + _0x37209e.errMsg + "】 code=" + _0x37209e.code)));
      } catch (_0x45a373) {
        $.logErr(_0x45a373, _0x1c7045);
      } finally {
        _0x4f8a51(_0x37209e);
      }
    });
  });
}
function _0x2774fa() {
  return new Promise(async _0xb79e0d => {
    let _0x2e89e9 = await _0x2160cf("newStartReward", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x2e89e9, async (_0x4798cf, _0x104334, _0x57bf68) => {
      try {
        _0x4798cf ? (console.log("" + JSON.stringify(_0x4798cf)), console.log("newStartReward API请求失败，请检查网路重试")) : _0x57bf68 = JSON.parse(_0x57bf68);
      } catch (_0x7b5f3) {
        $.logErr(_0x7b5f3, _0x104334);
      } finally {
        _0xb79e0d(_0x57bf68);
      }
    });
  });
}
function _0x4ce360() {
  return new Promise(async _0x47cf84 => {
    let _0x58bd25 = await _0x2160cf("gameMyPrize", "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x58bd25, async (_0x8f3043, _0x37fc27, _0x288569) => {
      try {
        if (_0x8f3043) console.log("" + JSON.stringify(_0x8f3043)), console.log("getGameMyPrize API请求失败，请检查网路重试");else {
          _0x288569 = JSON.parse(_0x288569);
          if (_0x288569.success && _0x288569.data) {
            $.Vos = _0x288569.data.gamePrizeItemVos;
            $.overVos = _0x288569.data.gameBigPrizeVO;
            for (let _0x548400 = 0; _0x548400 < $.Vos.length; _0x548400++) {
              if ($.Vos[_0x548400].prizeType == 4 && $.Vos[_0x548400].status == 1 && $.Vos[_0x548400].prizeTypeVO.prizeUsed == 0) {
                $.log("\n当前账号有【" + $.Vos[_0x548400].prizeName + "】可提现");
                $.id = $.Vos[_0x548400].prizeTypeVO.id;
                $.poolBaseId = $.Vos[_0x548400].prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.Vos[_0x548400].prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.Vos[_0x548400].prizeTypeVO.prizeBaseId;
                await _0x11c62f($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
            if ($.overVos) {
              if ($.overVos.prizeType == 4 && $.overVos.topLevelStatus == 1 && $.overVos.prizeTypeVO.prizeUsed == 0) {
                $.log("\n当前账号有【" + $.overVos.bigPrizeName + "】可提现");
                $.id = $.overVos.prizeTypeVO.id;
                $.poolBaseId = $.overVos.prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.overVos.prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.overVos.prizeTypeVO.prizeBaseId;
                await _0x11c62f($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
          }
        }
      } catch (_0x4b277d) {
        $.logErr(_0x4b277d, _0x37fc27);
      } finally {
        _0x47cf84(_0x288569);
      }
    });
  });
}
function _0x11c62f(_0x196b28, _0x537f81, _0x41c698, _0x44bd50) {
  return new Promise(async _0x20a19e => {
    let _0x4c6026 = await _0x2160cf("apCashWithDraw", "{\"businessSource\":\"JOY_PARK\",\"base\":{\"id\":" + _0x196b28 + ",\"business\":\"joyPark\",\"poolBaseId\":" + _0x537f81 + ",\"prizeGroupId\":" + _0x41c698 + ",\"prizeBaseId\":" + _0x44bd50 + ",\"prizeType\":4},\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}", "");
    $.post(_0x4c6026, async (_0x12ae26, _0x445935, _0x3a75b1) => {
      try {
        _0x12ae26 ? (console.log("" + JSON.stringify(_0x12ae26)), console.log("apCashWithDraw API请求失败，请检查网路重试")) : (_0x3a75b1 = JSON.parse(_0x3a75b1), _0x3a75b1.success && _0x3a75b1.data && console.log("提现结果：" + JSON.stringify(_0x3a75b1)));
      } catch (_0xf293d5) {
        $.logErr(_0xf293d5, _0x445935);
      } finally {
        _0x20a19e(_0x3a75b1);
      }
    });
  });
}
async function _0x2160cf(_0x5751a5, _0x2ad523, _0x37a233) {
  let _0x42fc43;
  if (_0x37a233) {
    let _0x28243d = {
      "appId": _0x37a233,
      "fn": _0x5751a5,
      "body": _0x2ad523,
      "apid": "activities_platform",
      "ver": $.UA.split(";")[2],
      "cl": "ios",
      "user": $.UserName,
      "code": 0,
      "ua": $.UA
    };
    _0x42fc43 = await _0x3bacb5.getbody(_0x28243d);
  } else _0x42fc43 = "functionId=" + _0x5751a5 + "&body=" + _0x2ad523 + "&appid=activities_platform&client=android&clientVersion=" + $.UA.split(";")[2] + "&" + Date.now();
  return {
    "url": "https://api.m.jd.com",
    "body": _0x42fc43,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/",
      "Cookie": _0x3afc2a
    }
  };
}
async function _0x5bfd8d(_0xf0f958, _0x57abc2, _0x3ee2ba) {
  let _0x24b51c;
  if (_0x3ee2ba) {
    let _0x584435 = {
      "appId": _0x3ee2ba,
      "fn": _0xf0f958,
      "body": _0x57abc2,
      "apid": "activities_platform",
      "ver": $.UA.split(";")[2],
      "cl": "ios",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x24b51c = await _0x3bacb5.getbody(_0x584435);
  } else _0x24b51c = "functionId=" + _0xf0f958 + "&body=" + _0x57abc2 + "&appid=activities_platform&client=android&clientVersion=" + $.UA.split(";")[2] + "&" + Date.now();
  return {
    "url": "https://api.m.jd.com/?" + _0x24b51c + "&cthr=1",
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&sid=ee1b8539bb3ec51b3421589754cf79dw&un_area=2_2813_61130_0",
      "Cookie": _0x3afc2a
    }
  };
}
function _0x4c672a() {
  return new Promise(async _0x24753e => {
    const _0x4e5323 = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": _0x3afc2a,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.UA
      }
    };
    $.post(_0x4e5323, (_0x378975, _0x25af02, _0x433093) => {
      try {
        if (_0x378975) console.log("" + JSON.stringify(_0x378975)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x433093) {
            _0x433093 = JSON.parse(_0x433093);
            if (_0x433093.retcode === 13) {
              $.isLogin = false;
              return;
            }
            if (_0x433093.retcode === 0) $.nickName = _0x433093.base && _0x433093.base.nickname || $.UserName;else {
              $.nickName = $.UserName;
            }
          } else console.log("京东服务器返回空数据");
        }
      } catch (_0x41a779) {
        $.logErr(_0x41a779, _0x25af02);
      } finally {
        _0x24753e();
      }
    });
  });
}
function _0x21f8d9(_0x141d96) {
  _0x141d96 = _0x141d96 || 32;
  let _0x4acb11 = "abcdef0123456789",
    _0x987f62 = _0x4acb11.length,
    _0x2629c2 = "";
  for (i = 0; i < _0x141d96; i++) _0x2629c2 += _0x4acb11.charAt(Math.floor(Math.random() * _0x987f62));
  return _0x2629c2;
}
function _0x3e0883(_0x27eeb7) {
  if (typeof _0x27eeb7 == "string") try {
    return JSON.parse(_0x27eeb7);
  } catch (_0x45c340) {
    return console.log(_0x45c340), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function _0x2e2135(_0x505f6c) {
  const _0x505364 = ["", "", ""];
  let _0x25e1af = 1000,
    _0xc1438e = 3,
    _0xa34a13 = "",
    _0x3701fd = 1;
  while (_0x505f6c / _0x25e1af >= 1) {
    _0x25e1af *= 10;
    _0xc1438e += 1;
  }
  if (_0xc1438e <= 4) _0x505364[0] = parseInt(_0x505f6c / 1000) + "", _0x505364[1] = "千";else {
    if (_0xc1438e <= 8) _0xa34a13 = parseInt(_0xc1438e - 4) / 3 > 1 ? "千万" : "万", _0x3701fd = _0xa34a13 === "万" ? 10000 : 10000000, _0x505f6c % _0x3701fd === 0 ? _0x505364[0] = parseInt(_0x505f6c / _0x3701fd) + "" : _0x505364[0] = parseFloat(_0x505f6c / _0x3701fd).toFixed(2) + "", _0x505364[1] = _0xa34a13;else {
      if (_0xc1438e <= 16) {
        _0xa34a13 = (_0xc1438e - 8) / 3 > 1 ? "千亿" : "亿";
        _0xa34a13 = (_0xc1438e - 8) / 4 > 1 ? "兆" : _0xa34a13;
        _0xa34a13 = (_0xc1438e - 8) / 7 > 1 ? "千兆" : _0xa34a13;
        _0x3701fd = 1;
        if (_0xa34a13 === "亿") _0x3701fd = 100000000;else {
          if (_0xa34a13 === "千亿") _0x3701fd = 100000000000;else {
            if (_0xa34a13 === "兆") _0x3701fd = 1000000000000;else _0xa34a13 === "千兆" && (_0x3701fd = 1000000000000000);
          }
        }
        if (_0x505f6c % _0x3701fd === 0) {
          _0x505364[0] = parseInt(_0x505f6c / _0x3701fd) + "";
        } else _0x505364[0] = parseFloat(_0x505f6c / _0x3701fd).toFixed(2) + "";
        _0x505364[1] = _0xa34a13;
      }
    }
  }
  if (_0x505f6c < 1000) {
    _0x505364[0] = _0x505f6c + "";
    _0x505364[1] = "";
  }
  return _0x505364.join("");
}