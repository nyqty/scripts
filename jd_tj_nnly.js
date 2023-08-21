/*
JOY_COIN_MAXIMIZE =      最大化硬币收益，如果合成后全部挖土后还有空位，则开启此模式（默认开启） 0关闭 1开启

请确保新用户助力过开工位，否则开启游戏了就不算新用户，后面就不能助力开工位了！！！！！！！！！！

如需关闭请添加变量，变量名：HELP_JOYPARK，变量值：false

此游戏黑号严重，所以请自行定时，火爆后停止放置一段时间恢复

做合成 购买等，无助力，无任务

============Quantumultx===============

[task_local]
#特价版-牛牛乐园
1 1 1 1 * jd_tj_nnly.js, tag=特价版-牛牛乐园, enabled=true
*/
const Env=require('./utils/Env.js');
const $ = new Env('特价版-牛牛乐园');
const _0x3d92d8 = $.isNode() ? require("./jdCookie.js") : "",
  _0xa2ddf4 = $.isNode() ? require("./sendNotify") : "",
  _0x414d3c = require("./function/krgetua");
let _0xd45eee = [],
  _0x370a5b = "",
  _0x43e6ab = false,
  _0x4f7eeb = 0;
if ($.isNode()) {
  Object.keys(_0x3d92d8).forEach(_0x4c07d2 => {
    _0xd45eee.push(_0x3d92d8[_0x4c07d2]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0xd45eee = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x552aa0($.getdata("CookiesJD") || "[]").map(_0x19f2c3 => _0x19f2c3.cookie)].filter(_0x58a860 => !!_0x58a860);
$.JOY_COIN_MAXIMIZE = process.env.JOY_COIN_MAXIMIZE === "1";
$.log("最大化收益模式: 已" + ($.JOY_COIN_MAXIMIZE ? "默认开启" : "关闭") + "  ");
let _0x359e4e = Date.now();
message = "";
!(async () => {
  if (!_0xd45eee[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (process.env.JD_JOY_PARK && process.env.JD_JOY_PARK === "false") {
    console.log("\n******检测到您设置了不运行汪汪乐园，停止运行此脚本******\n");
    return;
  }
  for (let _0x473e8a = 0; _0x473e8a < _0xd45eee.length; _0x473e8a++) {
    _0x43e6ab = false;
    _0x4f7eeb = 0;
    _0x370a5b = _0xd45eee[_0x473e8a];
    if (_0x370a5b) {
      $.UserName = decodeURIComponent(_0x370a5b.match(/pt_pin=([^; ]+)(?=;?)/) && _0x370a5b.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x473e8a + 1;
      $.isLogin = true;
      $.nickName = "";
      $.maxJoyCount = 10;
      UA = await _0x414d3c($.UserName);
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0xa2ddf4.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.krbreak = false;
      if ($.isNode()) {
        if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") {} else {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
          if ($.kgw_invitePin && $.kgw_invitePin.length) {
            $.kgw_invitePin = [...($.kgw_invitePin || [])][Math.floor(Math.random() * $.kgw_invitePin.length)];
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            let _0x1223db = await _0x1188fd("", 2, $.kgw_invitePin);
            if (_0x1223db) {
              if (_0x1223db.helpState && _0x1223db.helpState === 1) {} else {
                if (_0x1223db.helpState && _0x1223db.helpState === 3) {} else {
                  if (_0x1223db.helpState && _0x1223db.helpState === 2) {} else {}
                }
              }
            }
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      $.hasJoyCoin = true;
      await _0x1188fd("", "", "", true);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      !$.krbreak ? ($.activityJoyList = [], $.workJoyInfoList = [], await _0x2eccf5(true), await _0x9498e7(), await _0x3e2562($.workJoyInfoList)) : console.log("活动太火爆，跳过");
      try {
        !$.krbreak && (await _0x5a8a3c($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await _0x47e2b0());
      } catch (_0x482f3d) {
        $.logErr(_0x482f3d);
      }
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    }
  }
})().catch(_0x19f871 => $.logErr(_0x19f871)).finally(() => $.done());
async function _0x1188fd(_0x19909f = "", _0x4f11ac = "", _0x23a492 = "", _0x45adf7 = false) {
  const _0xed1f69 = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": _0x359e4e,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + _0x19909f + "\",\"inviteType\":\"" + _0x4f11ac + "\",\"inviterPin\":\"" + _0x23a492 + "\",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    _0x4e8945 = await _0x212825("4abce", _0xed1f69);
  return new Promise(_0x39a411 => {
    $.post(_0x32125b(_0x4e8945), async (_0x409cc8, _0x3b0b92, _0x95c16c) => {
      try {
        _0x409cc8 ? (console.log("" + JSON.stringify(_0x409cc8)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (_0x95c16c = JSON.parse(_0x95c16c), _0x95c16c && (_0x95c16c.success ? (_0x45adf7 && ($.log("等级: " + _0x95c16c.data.level + "|金币: " + _0x95c16c.data.joyCoin), _0x95c16c.data.level >= 30 && $.isNode() && (await _0xa2ddf4.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x95c16c.data.level + "\n已达到单次最高等级奖励\n请前往京东极速版APP查看使用优惠券\n活动入口：京东极速版APP->我的->汪汪乐园"), $.log("\n开始解锁新场景...\n"), await _0x483274())), $.joyBaseInfo = _0x95c16c.data) : $.krbreak = true));
      } catch (_0x39e6a3) {
        $.logErr(_0x39e6a3, _0x3b0b92);
      } finally {
        _0x39a411($.joyBaseInfo);
      }
    });
  });
}
async function _0x2eccf5(_0x2e5913 = false) {
  const _0x5ce5ff = {
      "functionId": "joyList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": _0x359e4e,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    _0x3ad949 = await _0x212825("e18ed", _0x5ce5ff);
  if (!_0x3ad949) {
    console.log("接口获取失败，跳过");
    return;
  }
  return new Promise(_0x385a57 => {
    $.get(_0x32125b(_0x3ad949), async (_0x1d29d6, _0x15bc2b, _0x5a3c87) => {
      try {
        if (_0x1d29d6) {
          console.log("" + JSON.stringify(_0x1d29d6));
          console.log($.name + " getJoyList API请求失败，请检查网路重试");
        } else {
          _0x5a3c87 = JSON.parse(_0x5a3c87);
          if (_0x2e5913) {
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态 start =====");
            $.log("在逛街的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let _0x2f9fdc = 0; _0x2f9fdc < _0x5a3c87.data.activityJoyList.length; _0x2f9fdc++) {
              $.log("id:" + _0x5a3c87.data.activityJoyList[_0x2f9fdc].id + "|name: " + _0x5a3c87.data.activityJoyList[_0x2f9fdc].name + "|level: " + _0x5a3c87.data.activityJoyList[_0x2f9fdc].level);
              _0x5a3c87.data.activityJoyList[_0x2f9fdc].level >= 30 && $.isNode() && (await _0xa2ddf4.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x5a3c87.data.level + "\n已达到单次最高等级奖励\n请尽快前往活动查看领取\n活动入口：京东极速版APP->汪汪乐园\n"), $.log("\n开始解锁新场景...\n"), await _0x483274());
            }
            $.log("\n在铲土的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
            for (let _0x17bc4f = 0; _0x17bc4f < _0x5a3c87.data.workJoyInfoList.length; _0x17bc4f++) {
              $.log("工位: " + _0x5a3c87.data.workJoyInfoList[_0x17bc4f].location + " [" + (_0x5a3c87.data.workJoyInfoList[_0x17bc4f].unlock ? "已开" : "未开") + "]|joy= " + (_0x5a3c87.data.workJoyInfoList[_0x17bc4f].joyDTO ? "id:" + _0x5a3c87.data.workJoyInfoList[_0x17bc4f].joyDTO.id + "|name: " + _0x5a3c87.data.workJoyInfoList[_0x17bc4f].joyDTO.name + "|level: " + _0x5a3c87.data.workJoyInfoList[_0x17bc4f].joyDTO.level : "毛都没有"));
            }
            $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态  end  =====");
          }
          $.activityJoyList = _0x5a3c87?.["data"]?.["activityJoyList"];
          $.workJoyInfoList = _0x5a3c87?.["data"]?.["workJoyInfoList"];
        }
      } catch (_0x10236a) {
        $.logErr(_0x10236a, _0x15bc2b);
      } finally {
        _0x385a57(_0x5a3c87.data);
      }
    });
  });
}
async function _0x9498e7() {
  const _0x13e1e5 = {
      "functionId": "gameShopList",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": _0x359e4e,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    _0x3939f6 = await _0x212825("e18ed", _0x13e1e5);
  return new Promise(_0xce2406 => {
    $.post(_0x32125b(_0x3939f6), async (_0x362c91, _0x2d943f, _0x42eed3) => {
      try {
        _0x362c91 ? (console.log("" + JSON.stringify(_0x362c91)), console.log($.name + " API请求失败，请检查网路重试")) : _0x42eed3 = JSON.parse(_0x42eed3).data.filter(_0x324b56 => _0x324b56.shopStatus === 1);
      } catch (_0x530768) {
        $.logErr(_0x530768, _0x2d943f);
      } finally {
        _0xce2406(_0x42eed3);
      }
    });
  });
}
async function _0x30596f(_0x1dcb5c, _0x528933) {
  let _0x5f09f7 = _0x528933.filter(_0x1d892c => _0x1d892c.unlock && _0x1d892c.joyDTO === null);
  if (_0x1dcb5c.length !== 0 && _0x5f09f7.length !== 0) {
    let _0x3d9c3d = Math.max.apply(Math, _0x1dcb5c.map(_0x1b9a52 => _0x1b9a52.level)),
      _0x1807d5 = _0x1dcb5c.filter(_0x1cb6e0 => _0x1cb6e0.level === _0x3d9c3d);
    $.log("下地干活！ joyId= " + _0x1807d5[0].id + " location= " + _0x5f09f7[0].location);
    await _0x3ad137(_0x1807d5[0].id, _0x5f09f7[0].location);
    await _0x2eccf5();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await _0x30596f($.activityJoyList, $.workJoyInfoList);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  } else $.JOY_COIN_MAXIMIZE && (await _0x14b3e6(_0x5f09f7), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
}
async function _0x14b3e6(_0x335611) {
  if (_0x335611.length !== 0 && $.hasJoyCoin) {
    $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let _0x2ca32b = await _0x1188fd();
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let _0x4665a6 = _0x2ca32b.joyCoin;
    $.log("还有" + _0x4665a6 + "金币,看看还能买啥下地");
    let _0x32f07e = await _0x9498e7();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    let _0x17a382 = false;
    for (let _0x4c0ef1 = _0x32f07e.length - 1; _0x4c0ef1 >= 0 && _0x4c0ef1 - 3 >= 0; _0x4c0ef1--) {
      if (_0x4665a6 > _0x32f07e[_0x4c0ef1].consume) {
        $.log("买一只 " + _0x32f07e[_0x4c0ef1].userLevel + "级的！");
        _0x4665a6 = _0x4665a6 - _0x32f07e[_0x4c0ef1].consume;
        let _0x39b115 = await _0x57ad4d(_0x32f07e[_0x4c0ef1].userLevel);
        if (!_0x39b115.success) break;else {
          _0x17a382 = true;
          $.hasJoyCoin = false;
          _0x4c0ef1++;
        }
      }
    }
    $.hasJoyCoin = false;
    _0x17a382 && (await _0x2eccf5(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await _0x30596f($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await _0x1188fd(), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)));
  }
}
async function _0x3e2562(_0x305892) {
  if (_0x305892.filter(_0x27f96b => _0x27f96b.joyDTO).length === 0) return $.log("工位清理完成！"), true;
  for (let _0x3a0642 = 0; _0x3a0642 < _0x305892.length; _0x3a0642++) {
    _0x305892[_0x3a0642].unlock && _0x305892[_0x3a0642].joyDTO && (await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), $.log("从工位移除 => id:" + _0x305892[_0x3a0642].joyDTO.id + "|name: " + _0x305892[_0x3a0642].joyDTO.name + "|level: " + _0x305892[_0x3a0642].joyDTO.level), await _0x3ad137(_0x305892[_0x3a0642].joyDTO.id, 0), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
  }
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await _0x2eccf5();
  await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
  await _0x3e2562($.workJoyInfoList);
}
async function _0x5a8a3c(_0x20928e) {
  let _0xc90ffc = Math.min.apply(Math, _0x20928e.map(_0x32887c => _0x32887c.level)),
    _0x264966 = _0x20928e.filter(_0x3c9cbb => _0x3c9cbb.level === _0xc90ffc);
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  let _0x33e258 = await _0x1188fd();
  await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
  !_0x33e258.fastBuyLevel && (await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), _0x33e258 = await _0x1188fd(), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)));
  if (!_0x33e258.fastBuyLevel) return $.log("出错，下地后跳出......"), await _0x30596f($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), false;
  let _0x246061 = _0x33e258.fastBuyLevel;
  if (_0x264966.length >= 2) {
    $.log("开始合成 " + _0xc90ffc + " " + _0x264966[0].id + " <=> " + _0x264966[1].id + " 【限流严重，5秒后合成！如失败会重试】");
    await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
    await _0x38ce5e(_0x264966[0].id, _0x264966[1].id);
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    if (_0x43e6ab) {
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      _0x33e258 = await _0x1188fd();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await _0x30596f($.activityJoyList, $.workJoyInfoList);
      await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
      return false;
    }
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await _0x2eccf5();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await _0x5a8a3c($.activityJoyList);
  } else {
    if (_0x264966.length === 1 && _0x264966[0].level < _0x246061) {
      let _0x363d65 = await _0x57ad4d(_0x264966[0].level, $.activityJoyList);
      _0x363d65.success ? (await _0x2eccf5(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await _0x5a8a3c($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await _0x30596f($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    } else {
      $.log("没有需要合成的joy 开始买买买🛒🛒🛒🛒🛒🛒🛒🛒");
      $.log("现在最高可以购买: " + _0x246061 + "  购买 " + _0x246061 + " 的joy   你还有" + _0x33e258.joyCoin + "金币");
      let _0x10f718 = await _0x57ad4d(_0x246061, $.activityJoyList);
      _0x10f718.success ? (await _0x2eccf5(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await _0x5a8a3c($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await _0x30596f($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    }
  }
}
async function _0x3ad137(_0x426090, _0x2a59b0) {
  const _0x2f3d9f = {
      "functionId": "joyMove",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": _0x359e4e,
      "appid": "activities_platform",
      "body": "{\"joyId\":" + _0x426090 + ",\"location\":" + _0x2a59b0 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    _0xc35f02 = await _0x212825("50788", _0x2f3d9f);
  return new Promise(_0x35a007 => {
    $.post(_0x32125b(_0xc35f02), async (_0x1bc72c, _0xb156c1, _0x3451dd) => {
      try {
        _0x1bc72c ? (console.log("" + JSON.stringify(_0x1bc72c)), console.log($.name + "  doJoyMove API请求失败，请检查网路重试")) : (_0x2a59b0 !== 0 && $.log("下地完成了！"), _0x3451dd = JSON.parse(_0x3451dd));
      } catch (_0x35c232) {
        $.logErr(_0x35c232, _0xb156c1);
      } finally {
        _0x35a007(_0x3451dd.data);
      }
    });
  });
}
async function _0x38ce5e(_0x2d81c9, _0x4ef36b) {
  const _0x1088ef = {
      "functionId": "joyMergeGet",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": _0x359e4e,
      "appid": "activities_platform",
      "body": "{\"joyOneId\":" + _0x2d81c9 + ",\"joyTwoId\":" + _0x4ef36b + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    _0x357604 = await _0x212825("b08cf", _0x1088ef);
  return new Promise(_0x1291bd => {
    $.get(_0x32125b(_0x357604), async (_0x24ab6c, _0x24c816, _0x542b67) => {
      try {
        _0x24ab6c ? (console.log("" + JSON.stringify(_0x24ab6c)), console.log($.name + " doJoyMerge API请求失败，请检查网路重试"), _0x542b67 = {}, _0x43e6ab = true) : (_0x542b67 = JSON.parse(_0x542b67), $.log("合成 " + _0x2d81c9 + " <=> " + _0x4ef36b + " " + (_0x542b67.success ? "成功！" : "失败！【" + _0x542b67.errMsg + "】 code=" + _0x542b67.code)), _0x542b67.code == "1006" && (_0x4f7eeb += 1), _0x4f7eeb == 5 && (console.log("失败次数多，避免死循环，跳出！"), _0x43e6ab = true));
      } catch (_0x1df67b) {
        $.logErr(_0x1df67b, _0x24c816);
        _0x43e6ab = true;
      } finally {
        _0x1291bd(_0x542b67.data);
      }
    });
  });
}
async function _0x57ad4d(_0x2f9f20, _0x13a30c) {
  const _0x43d3f0 = {
      "functionId": "joyBuy",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": _0x359e4e,
      "appid": "activities_platform",
      "body": "{\"level\":" + _0x2f9f20 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    _0x424db4 = await _0x212825("ffb36", _0x43d3f0);
  return new Promise(_0xd54b0f => {
    $.post(_0x32125b(_0x424db4), async (_0x4809b6, _0x25576b, _0x63d6ca) => {
      try {
        if (_0x4809b6) {
          console.log("" + JSON.stringify(_0x4809b6));
          console.log($.name + " doJoyBuy API请求失败，请检查网路重试");
        } else {
          _0x63d6ca = JSON.parse(_0x63d6ca);
          let _0x313435 = "【不知道啥意思】";
          switch (_0x63d6ca.code) {
            case 519:
              _0x313435 = "【没钱了】";
              break;
            case 518:
              _0x313435 = "【没空位】";
              if (_0x13a30c) {
                $.log("因为购买 " + _0x2f9f20 + "级🐶 没空位 所以我要删掉比低级的狗了");
                let _0x19c70a = Math.min.apply(Math, _0x13a30c.map(_0x1d3d21 => _0x1d3d21.level));
                await _0x352178(_0x13a30c.filter(_0xf00097 => _0xf00097.level === _0x19c70a)[0].id);
                await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
              }
              break;
            case 0:
              _0x313435 = "【OK】";
              break;
          }
          $.log("购买joy level: " + _0x2f9f20 + " " + (_0x63d6ca.success ? "成功！" : "失败！" + _0x63d6ca.errMsg + " code=" + _0x63d6ca.code) + "  code的意思是=" + _0x313435);
        }
      } catch (_0x31c75a) {
        $.logErr(_0x31c75a, _0x25576b);
      } finally {
        _0xd54b0f(_0x63d6ca);
      }
    });
  });
}
async function _0x352178(_0x5c3013) {
  const _0x1a6d21 = {
      "functionId": "joyRecovery",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": _0x359e4e,
      "appid": "activities_platform",
      "body": "{\"level\":" + level + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    _0x2d4d89 = await _0x212825("ffb36", _0x1a6d21);
  return new Promise(_0x7c3ec6 => {
    $.post(_0x32125b(_0x2d4d89), async (_0x2990a8, _0x22cf96, _0x3a8ad3) => {
      try {
        _0x2990a8 ? (console.log("" + JSON.stringify(_0x2990a8)), console.log($.name + " doJoyRecovery API请求失败，请检查网路重试"), _0x3a8ad3 = {}) : (_0x3a8ad3 = JSON.parse(_0x3a8ad3), $.log("回收🐶 " + (_0x3a8ad3.success ? "成功！" : "失败！【" + _0x3a8ad3.errMsg + "】 code=" + _0x3a8ad3.code)));
      } catch (_0x19dcb8) {
        $.logErr(_0x19dcb8, _0x22cf96);
      } finally {
        _0x7c3ec6(_0x3a8ad3);
      }
    });
  });
}
async function _0x483274() {
  const _0x56d70d = {
      "functionId": "joyRestart",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": _0x359e4e,
      "appid": "activities_platform",
      "body": "{\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}"
    },
    _0x5ee9ae = await _0x212825("ffb36", _0x56d70d);
  return new Promise(_0x5ed057 => {
    $.post(_0x32125b(_0x5ee9ae), async (_0xc678cd, _0x1d72ff, _0x37ea11) => {
      try {
        if (_0xc678cd) {
          console.log("" + JSON.stringify(_0xc678cd));
          console.log($.name + " doJoyRestart API请求失败，请检查网路重试");
        } else {
          _0x37ea11 = JSON.parse(_0x37ea11);
          $.log("新场景解锁 " + (_0x37ea11.success ? "成功！" : "失败！【" + _0x37ea11.errMsg + "】 code=" + _0x37ea11.code));
        }
      } catch (_0x1be578) {
        $.logErr(_0x1be578, _0x1d72ff);
      } finally {
        _0x5ed057(_0x37ea11);
      }
    });
  });
}
async function _0x47e2b0() {
  return new Promise(async _0x2f5a4f => {
    const _0x56a2ad = {
        "linkId": "LsQNxL7iWDlXUs6cFl-AAg"
      },
      _0xdd8271 = {
        "url": "https://api.m.jd.com",
        "body": "functionId=gameMyPrize&body=" + escape(JSON.stringify(_0x56a2ad)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": _0x370a5b
        },
        "timeout": 30 * 1000
      };
    $.post(_0xdd8271, async (_0x307604, _0x842b5a, _0x325a74) => {
      try {
        if (_0x307604) {
          console.log("" + JSON.stringify(_0x307604));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          _0x325a74 = JSON.parse(_0x325a74);
          if (_0x325a74.success && _0x325a74.data) {
            $.Vos = _0x325a74.data.gamePrizeItemVos;
            for (let _0x48754d = 0; _0x48754d < $.Vos.length; _0x48754d++) {
              if ($.Vos[_0x48754d].prizeType == 4 && $.Vos[_0x48754d].status == 1 && $.Vos[_0x48754d].prizeTypeVO.prizeUsed == 0) {
                $.log("当前账号有【" + $.Vos[_0x48754d].prizeName + "】可提现");
                $.id = $.Vos[_0x48754d].prizeTypeVO.id;
                $.poolBaseId = $.Vos[_0x48754d].prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.Vos[_0x48754d].prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.Vos[_0x48754d].prizeTypeVO.prizeBaseId;
                await _0x5afbf9($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
          }
        }
      } catch (_0x4eaaff) {
        $.logErr(_0x4eaaff, _0x842b5a);
      } finally {
        _0x2f5a4f(_0x325a74);
      }
    });
  });
}
function _0x5afbf9(_0x3a363e, _0x1133e0, _0x4c5ec7, _0x32e15f) {
  return new Promise(_0x10426c => {
    const _0x23a264 = {
        "linkId": "LsQNxL7iWDlXUs6cFl-AAg",
        "businessSource": "JOY_PARK",
        "base": {
          "prizeType": 4,
          "business": "fission",
          "id": _0x3a363e,
          "poolBaseId": _0x1133e0,
          "prizeGroupId": _0x4c5ec7,
          "prizeBaseId": _0x32e15f
        }
      },
      _0x31dcc7 = {
        "url": "https://api.m.jd.com",
        "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(_0x23a264)) + "&_t=" + +new Date() + "&appid=activities_platform",
        "headers": {
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Origin": "https://joypark.jd.com",
          "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
          "Cookie": _0x370a5b
        },
        "timeout": 30 * 1000
      };
    $.post(_0x31dcc7, async (_0x11f87a, _0x4454f1, _0x23bb08) => {
      try {
        _0x11f87a ? (console.log("" + JSON.stringify(_0x11f87a)), console.log($.name + " API请求失败，请检查网路重试")) : safeGet(_0x23bb08) && (_0x23bb08 = $.toObj(_0x23bb08), _0x23bb08.code === 0 ? _0x23bb08.data.status === "310" ? console.log("提现现金成功！") : console.log("提现现金：失败:" + JSON.stringify(_0x23bb08.data.message)) : console.log("提现现金：异常:" + JSON.stringify(_0x23bb08)));
      } catch (_0x480722) {
        $.logErr(_0x480722, _0x4454f1);
      } finally {
        _0x10426c(_0x23bb08);
      }
    });
  });
}
function _0x43e1c4() {
  return new Promise(_0x4425f0 => {
    $.get({
      "url": "http://code.kingran.cf/wwly.json",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    }, async (_0x27cf1d, _0x50cbd4, _0x3efe86) => {
      try {
        _0x27cf1d ? (console.log("" + JSON.stringify(_0x27cf1d)), console.log($.name + " API请求失败，请检查网路重试")) : $.kgw_invitePin = JSON.parse(_0x3efe86);
      } catch (_0x585ab6) {
        $.logErr(_0x585ab6, _0x50cbd4);
      } finally {
        _0x4425f0();
      }
    });
  });
}
function _0x5df2a7(_0x5787d2) {
  return {
    "url": "https://api.m.jd.com/",
    "body": _0x5787d2,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": _0x370a5b
    },
    "timeout": 30 * 1000
  };
}
function _0x50b747(_0x6850fa, _0x4bfd3) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + _0x4bfd3 + (_0x6850fa ? "&" + _0x6850fa : ""),
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.388006&lat=22.512549&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": _0x370a5b
    },
    "timeout": 30 * 1000
  };
}
function _0x32125b(_0x2f069b) {
  return {
    "url": "https://api.m.jd.com/?" + _0x2f069b,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": _0x370a5b
    },
    "timeout": 30 * 1000
  };
}
async function _0x212825(_0x4aa4c9, _0x9dd0a3) {
  let _0x52f1aa = {
      "appId": _0x4aa4c9,
      ..._0x9dd0a3,
      "ua": UA,
      "pin": $.UserName
    },
    _0x3541b8 = {
      "url": "http://kr.kingran.cf/h5st",
      "body": JSON.stringify(_0x52f1aa),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 30 * 1000
    };
  return new Promise(async _0x50fba2 => {
    $.post(_0x3541b8, (_0x463689, _0x2a7c17, _0x227622) => {
      let _0x444be1 = "";
      try {
        if (_0x463689) console.log($.name + " geth5st API请求失败，请检查网路重试");else {
          _0x227622 = JSON.parse(_0x227622);
          if (typeof _0x227622 === "object" && _0x227622 && _0x227622.body) {
            if (_0x227622.body) _0x444be1 = _0x227622.body || "";
          } else _0x227622.code == 400 ? console.log("\n" + _0x227622.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (_0x5de565) {
        $.logErr(_0x5de565, _0x2a7c17);
      } finally {
        _0x50fba2(_0x444be1);
      }
    });
  });
}
function _0x15f866(_0x1541ac) {
  _0x1541ac = _0x1541ac || 32;
  let _0x37053b = "abcdef0123456789",
    _0x2b1e46 = _0x37053b.length,
    _0x45e9b1 = "";
  for (i = 0; i < _0x1541ac; i++) _0x45e9b1 += _0x37053b.charAt(Math.floor(Math.random() * _0x2b1e46));
  return _0x45e9b1;
}
function _0x552aa0(_0x43acf5) {
  if (typeof _0x43acf5 == "string") {
    try {
      return JSON.parse(_0x43acf5);
    } catch (_0x44acea) {
      return console.log(_0x44acea), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}