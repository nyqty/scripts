/*
汪汪乐园合成
7 7 7 7 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_wwpark_merge.js
跑会黑，自己决定！！！
6dy  2023/7/29
*/
const Env=require('./utils/Env.js');
const $ = new Env("汪汪乐园合成");
const _0x2c9f87 = $.isNode() ? require("./jdCookie.js") : "",
  _0x27723c = require("./function/dylany.js"),
  _0x380219 = $.isNode() ? require("./sendNotify") : "";
let _0x11af22 = [],
  _0x3b4d1b = "",
  _0x4fbce5 = false;
if ($.isNode()) {
  Object.keys(_0x2c9f87).forEach(_0x3ffc3d => {
    _0x11af22.push(_0x2c9f87[_0x3ffc3d]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x11af22 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x295442($.getdata("CookiesJD") || "[]").map(_0x4d47a7 => _0x4d47a7.cookie)].filter(_0x507058 => !!_0x507058);
}
$.JOY_COIN_MAXIMIZE = 0;
message = "";
!(async () => {
  if (!_0x11af22[0]) {
    const _0x1dc0e8 = {
      "open-url": "https://bean.m.jd.com/"
    };
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", _0x1dc0e8);
    return;
  }
  console.log("\n跑会黑，风险自担！！！");
  console.log("只前5个CK，TG频道：https://t.me/dylan_jdpro");
  for (let _0x1ec399 = 0; _0x1ec399 < "5"; _0x1ec399++) {
    _0x3b4d1b = _0x11af22[_0x1ec399];
    if (_0x3b4d1b) {
      $.UserName = decodeURIComponent(_0x3b4d1b.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3b4d1b.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x1ec399 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.maxJoyCount = 10;
      $.UA = require("./USER_AGENTS").UARAM();
      await _0x5adf03();
      if (!$.isLogin) {
        const _0x4148e5 = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x4148e5);
        $.isNode() && (await _0x380219.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.hasJoyCoin = true;
      await _0x5a8269(true);
      await $.wait(500);
      if (!$.joyBaseInfo) {
        continue;
      }
      $.joyBaseInfo.joyCoin == 0 && ($.log("还未过新手任务，去完成！！！"), await _0x9fb4a4(), await $.wait(200), await _0x5a8269(), await $.wait(200), await _0x32ec16("{\"guideStep\":11,\"joyOneId\":" + $.newjoylist[0].id + ",\"joyTwoId\":" + $.newjoylist[1].id + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"), await $.wait(200), await _0x32ec16("{\"guideStep\":12,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"), await $.wait(200), await _0x5a8269());
      $.activityJoyList = [];
      $.workJoyInfoList = [];
      await _0x37260b(true);
      await $.wait(500);
      await _0x1024a2();
      await $.wait(500);
      await _0x3b9dcc($.workJoyInfoList);
      try {
        await _0x2c8c5b($.activityJoyList);
        await $.wait(200);
      } catch (_0x36fe95) {
        $.logErr(_0x36fe95);
      }
      await $.wait(2500);
    }
  }
})().catch(_0x30021d => $.logErr(_0x30021d)).finally(() => $.done());
async function _0x5a8269(_0x20bbdc = false) {
  return new Promise(async _0x2b85ff => {
    let _0x4ad364 = await _0x3b065e("joyBaseInfo", "{\"taskId\":\"\",\"inviteType\":\"\",\"inviterPin\":\"\",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "4abce");
    $.post(_0x4ad364, async (_0x369041, _0x107bd3, _0x5be411) => {
      try {
        if (_0x369041) {
          console.log("" + JSON.stringify(_0x369041));
          console.log("getJoyBaseInfo API请求失败，请检查网路重试");
        } else {
          _0x5be411 = JSON.parse(_0x5be411);
          _0x5be411.success ? _0x20bbdc && ($.log("等级:" + _0x5be411.data.level + "|金币:" + _0x354f47(_0x5be411.data.joyCoin)), _0x5be411.data.level >= 30 && $.isNode() && (await _0x380219.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x5be411.data.level + "\n已达最高30级\n请到京东极速版APP提现6.66\n提现入口：我的->汪汪乐园->点左上角等级"), $.log("\n开始解锁新场景...\n"))) : $.log(_0x5be411.errMsg);
          $.joyBaseInfo = _0x5be411.data;
        }
      } catch (_0x584490) {
        $.logErr(_0x584490, _0x107bd3);
      } finally {
        _0x2b85ff($.joyBaseInfo);
      }
    });
  });
}
function _0x37260b(_0x3e33b9 = false) {
  return new Promise(async _0xab98e6 => {
    let _0x358c02 = await _0x47bbc8("joyList", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "e18ed");
    $.get(_0x358c02, async (_0x1f355e, _0x1f407e, _0x4b17b7) => {
      try {
        if (_0x1f355e) {
          console.log("" + JSON.stringify(_0x1f355e));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          _0x4b17b7 = JSON.parse(_0x4b17b7);
          if (_0x4b17b7.success) {
            if (_0x3e33b9) {
              $.log("\n===== JOY 状态 start =====");
              $.log("在逛街的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
              for (let _0x1d927a = 0; _0x1d927a < _0x4b17b7.data.activityJoyList.length; _0x1d927a++) {
                $.log("id:" + _0x4b17b7.data.activityJoyList[_0x1d927a].id + "|name: " + _0x4b17b7.data.activityJoyList[_0x1d927a].name + "|level: " + _0x4b17b7.data.activityJoyList[_0x1d927a].level);
                _0x4b17b7.data.activityJoyList[_0x1d927a].level >= 30 && $.isNode() && (await _0x380219.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x4b17b7.data.level + "\n已达到单次最高等级奖励\n请尽快前往活动查看领取\n活动入口：京东极速版APP->汪汪乐园\n"));
              }
              $.log("\n在铲土的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
              for (let _0x5338f0 = 0; _0x5338f0 < _0x4b17b7.data.workJoyInfoList.length; _0x5338f0++) {
                $.log("工位: " + _0x4b17b7.data.workJoyInfoList[_0x5338f0].location + " [" + (_0x4b17b7.data.workJoyInfoList[_0x5338f0].unlock ? "已开" : "未开") + "]|JOY= " + (_0x4b17b7.data.workJoyInfoList[_0x5338f0].joyDTO ? "id:" + _0x4b17b7.data.workJoyInfoList[_0x5338f0].joyDTO.id + "|name: " + _0x4b17b7.data.workJoyInfoList[_0x5338f0].joyDTO.name + "|level: " + _0x4b17b7.data.workJoyInfoList[_0x5338f0].joyDTO.level : "空位"));
              }
              $.log("===== JOY 状态  end  =====\n");
            }
          } else {
            $.log(_0x4b17b7.errMsg);
          }
          $.activityJoyList = _0x4b17b7.data.activityJoyList;
          $.workJoyInfoList = _0x4b17b7.data.workJoyInfoList;
        }
      } catch (_0x4a78e2) {
        $.logErr(_0x4a78e2, _0x1f407e);
      } finally {
        _0xab98e6(_0x4b17b7.data);
      }
    });
  });
}
function _0x1024a2() {
  return new Promise(async _0xed561e => {
    let _0x2b4c68 = await _0x3b065e("gameShopList", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");
    $.post(_0x2b4c68, async (_0x39d29b, _0x584b57, _0x400c34) => {
      try {
        _0x39d29b ? (console.log("" + JSON.stringify(_0x39d29b)), console.log("getGameShopList API请求失败，请检查网路重试")) : _0x400c34 = JSON.parse(_0x400c34).data.filter(_0x58d741 => _0x58d741.shopStatus === 1);
      } catch (_0x195756) {
        $.logErr(_0x195756, _0x584b57);
      } finally {
        _0xed561e(_0x400c34);
      }
    });
  });
}
async function _0x38b334(_0x2b4a86, _0x5eceb3) {
  let _0x54d7ba = _0x5eceb3.filter(_0x143319 => _0x143319.unlock && _0x143319.joyDTO === null);
  if (_0x2b4a86.length !== 0 && _0x54d7ba.length !== 0) {
    let _0xb592fa = Math.max.apply(Math, _0x2b4a86.map(_0x4044a4 => _0x4044a4.level)),
      _0x29adb7 = _0x2b4a86.filter(_0x1d4e4d => _0x1d4e4d.level === _0xb592fa);
    $.log("下地干活！ joyId= " + _0x29adb7[0].id + " location= " + _0x54d7ba[0].location);
    await _0x4f4a85(_0x29adb7[0].id, _0x54d7ba[0].location);
    await _0x37260b();
    await _0x38b334($.activityJoyList, $.workJoyInfoList);
  } else {
    $.JOY_COIN_MAXIMIZE && (await _0x507917(_0x54d7ba));
  }
}
async function _0x507917(_0x116a7c) {
  if (_0x116a7c.length !== 0 && $.hasJoyCoin) {
    $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
    let _0x1e4dc8 = await _0x5a8269(),
      _0x474757 = _0x1e4dc8.joyCoin;
    $.log("还有" + _0x474757 + "金币,看看还能买啥下地");
    let _0x5c60b3 = await _0x1024a2(),
      _0x4ed3d7 = false;
    for (let _0x377d02 = _0x5c60b3.length - 1; _0x377d02 >= 0 && _0x377d02 - 3 >= 0; _0x377d02--) {
      if (_0x474757 > _0x5c60b3[_0x377d02].consume) {
        $.log("买一只 " + _0x5c60b3[_0x377d02].userLevel + "级的！");
        _0x474757 = _0x474757 - _0x5c60b3[_0x377d02].consume;
        let _0xd5fffe = await _0x2076f9(_0x5c60b3[_0x377d02].userLevel);
        if (!_0xd5fffe.success) {
          break;
        } else {
          _0x4ed3d7 = true;
          $.hasJoyCoin = false;
          _0x377d02++;
        }
      }
    }
    $.hasJoyCoin = false;
    if (_0x4ed3d7) {
      await _0x37260b();
      await $.wait(200);
      await _0x38b334($.activityJoyList, $.workJoyInfoList);
      await $.wait(200);
      await _0x5a8269();
    }
  }
}
async function _0x3b9dcc(_0x16c391) {
  if (_0x16c391.filter(_0xc41a0d => _0xc41a0d.joyDTO).length === 0) {
    $.log("工位清理完成！");
    return true;
  }
  for (let _0x15c103 = 0; _0x15c103 < _0x16c391.length; _0x15c103++) {
    _0x16c391[_0x15c103].unlock && _0x16c391[_0x15c103].joyDTO && ($.log("从工位移除 => id:" + _0x16c391[_0x15c103].joyDTO.id + "|name: " + _0x16c391[_0x15c103].joyDTO.name + "|level: " + _0x16c391[_0x15c103].joyDTO.level), await _0x4f4a85(_0x16c391[_0x15c103].joyDTO.id, 0));
  }
  await _0x37260b();
  await $.wait(200);
  await _0x3b9dcc($.workJoyInfoList);
}
async function _0x2c8c5b(_0x2ac329) {
  let _0x33e000 = Math.min.apply(Math, _0x2ac329.map(_0x311c51 => _0x311c51.level)),
    _0x23d89b = _0x2ac329.filter(_0x4ed345 => _0x4ed345.level === _0x33e000),
    _0xcd8cde = await _0x5a8269();
  await $.wait(1000);
  !_0xcd8cde.fastBuyLevel && (await $.wait(2000), _0xcd8cde = await _0x5a8269());
  if (!_0xcd8cde.fastBuyLevel) {
    $.log("获取信息失败，下地后跳出......");
    await _0x38b334($.activityJoyList, $.workJoyInfoList);
    return false;
  }
  let _0x186337 = _0xcd8cde.fastBuyLevel;
  if (_0x186337 > 25) {
    return;
  }
  if (_0x23d89b.length >= 2) {
    $.log("开始合成" + (_0x33e000 + 1) + "级JOY");
    await $.wait(2000);
    await _0x54c0e2(_0x23d89b[0].id, _0x23d89b[1].id);
    if (_0x4fbce5) {
      _0xcd8cde = await _0x5a8269();
      await $.wait(200);
      await _0x38b334($.activityJoyList, $.workJoyInfoList);
      return false;
    }
    await _0x37260b();
    await $.wait(200);
    await _0x2c8c5b($.activityJoyList);
  } else {
    if (_0x23d89b.length === 1 && _0x23d89b[0].level < _0x186337) {
      let _0x21c490 = await _0x2076f9(_0x23d89b[0].level, $.activityJoyList);
      await $.wait(200);
      _0x21c490.success ? (await _0x37260b(), await $.wait(200), await _0x2c8c5b($.activityJoyList)) : ($.log("完成！"), await _0x38b334($.activityJoyList, $.workJoyInfoList));
    } else {
      $.log("没有可合成的JOY开始买买买🛒🛒🛒");
      $.log("最高能买" + _0x186337 + "级的JOY，剩余" + _0x354f47(_0xcd8cde.joyCoin) + "金币");
      let _0x55069c = await _0x2076f9(_0x186337, $.activityJoyList);
      await $.wait(1000);
      _0x55069c.success ? (await _0x37260b(), await $.wait(200), await _0x2c8c5b($.activityJoyList)) : ($.log("完成！"), await _0x38b334($.activityJoyList, $.workJoyInfoList));
    }
  }
}
function _0x4f4a85(_0x44cd3f, _0x4bc64a) {
  return new Promise(async _0x51e8ba => {
    let _0x536a53 = await _0x47bbc8("joyMove", "{\"joyId\":" + _0x44cd3f + ",\"location\":" + _0x4bc64a + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "50788");
    $.post(_0x536a53, async (_0x5d64f8, _0x5097de, _0x49d32c) => {
      try {
        _0x5d64f8 ? (console.log("" + JSON.stringify(_0x5d64f8)), console.log("doJoyMove请求失败，请检查网路重试")) : (_0x4bc64a !== 0 && $.log("下地完成！"), _0x49d32c = JSON.parse(_0x49d32c));
      } catch (_0x192f38) {
        $.logErr(_0x192f38, _0x5097de);
      } finally {
        _0x51e8ba(_0x49d32c.data);
      }
    });
  });
}
function _0x54c0e2(_0x568c95, _0x276b20) {
  return new Promise(async _0x2dbe21 => {
    let _0x3a06a5 = await _0x47bbc8("joyMergeGet", "{\"joyOneId\":" + _0x568c95 + ",\"joyTwoId\":" + _0x276b20 + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "b08cf");
    $.get(_0x3a06a5, async (_0x47bda2, _0x639941, _0x543a1b) => {
      try {
        _0x47bda2 ? (console.log("" + JSON.stringify(_0x47bda2)), console.log("doJoyMerge API请求失败，请检查网路重试"), _0x543a1b = {}, _0x4fbce5 = true) : (_0x543a1b = JSON.parse(_0x543a1b), $.log("合成" + (_0x543a1b.success ? "成功！" : "失败！【" + _0x543a1b.errMsg + "】 code=" + _0x543a1b.code)), _0x543a1b.code == "1006" && (_0x4fbce5 = true));
      } catch (_0x4aa3d8) {
        $.logErr(_0x4aa3d8, _0x639941);
        _0x4fbce5 = true;
      } finally {
        _0x2dbe21(_0x543a1b.data);
      }
    });
  });
}
async function _0x2076f9(_0x565cc1, _0x393ec8) {
  return new Promise(async _0x59530b => {
    let _0x2393d4 = await _0x3b065e("joyBuy", "{\"level\":" + _0x565cc1 + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "ffb36");
    $.post(_0x2393d4, async (_0xeac275, _0x565550, _0x2790e8) => {
      try {
        if (_0xeac275) {
          console.log("" + JSON.stringify(_0xeac275));
          console.log("doJoyBuy API请求失败，请检查网路重试");
        } else {
          _0x2790e8 = JSON.parse(_0x2790e8);
          let _0xbedd14 = "【不知道啥意思】";
          switch (_0x2790e8.code) {
            case 519:
              _0xbedd14 = "【没钱了】";
              break;
            case 518:
              _0xbedd14 = "【没空位】";
              if (_0x393ec8) {
                $.log("满员了，删掉低级JOY");
                let _0x3a143d = Math.min.apply(Math, _0x393ec8.map(_0x9e5dbe => _0x9e5dbe.level));
                await _0x2c4895(_0x393ec8.filter(_0x48dbd4 => _0x48dbd4.level === _0x3a143d)[0].id);
              }
              break;
            case 0:
              _0xbedd14 = "【OK】";
              break;
          }
          $.log("购买" + _0x565cc1 + "级JOY " + (_0x2790e8.success ? "成功！" : "失败！code=" + _0x2790e8.code + " 意思是" + _0xbedd14));
        }
      } catch (_0x6392fb) {
        $.logErr(_0x6392fb, _0x565550);
      } finally {
        _0x59530b(_0x2790e8);
      }
    });
  });
}
function _0x2c4895(_0xddaffa) {
  return new Promise(async _0x39e3d7 => {
    let _0x441022 = await _0x3b065e("joyRecovery", "body={\"joyId\":" + _0xddaffa + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");
    $.post(_0x441022, async (_0x35b222, _0x577d80, _0x1b5508) => {
      try {
        if (_0x35b222) {
          console.log("" + JSON.stringify(_0x35b222));
          console.log("doJoyRecovery API请求失败，请检查网路重试");
          _0x1b5508 = {};
        } else {
          _0x1b5508 = JSON.parse(_0x1b5508);
          $.log("回收🐶 " + (_0x1b5508.success ? "成功！" : "失败！【" + _0x1b5508.errMsg + "】 code=" + _0x1b5508.code));
        }
      } catch (_0x2725ba) {
        $.logErr(_0x2725ba, _0x577d80);
      } finally {
        _0x39e3d7(_0x1b5508);
      }
    });
  });
}
function _0x516d0a() {
  return new Promise(async _0x52deec => {
    let _0x1406c9 = await _0x3b065e("joyRestart", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");
    $.post(_0x1406c9, async (_0x109057, _0x1f7e17, _0x3f595f) => {
      try {
        _0x109057 ? (console.log("" + JSON.stringify(_0x109057)), console.log("doJoyRestart API请求失败，请检查网路重试")) : (_0x3f595f = JSON.parse(_0x3f595f), $.log("新场景解锁 " + (_0x3f595f.success ? "成功！" : "失败！【" + _0x3f595f.errMsg + "】 code=" + _0x3f595f.code)));
      } catch (_0x1daf38) {
        $.logErr(_0x1daf38, _0x1f7e17);
      } finally {
        _0x52deec(_0x3f595f);
      }
    });
  });
}
function _0x9fb4a4() {
  return new Promise(async _0x1b4a8e => {
    let _0x71d0d5 = await _0x3b065e("newStartReward", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");
    $.post(_0x71d0d5, async (_0x1cae74, _0xbb3f4a, _0x5e7802) => {
      try {
        _0x1cae74 ? (console.log("" + JSON.stringify(_0x1cae74)), console.log("newStartReward API请求失败，请检查网路重试")) : (_0x5e7802 = JSON.parse(_0x5e7802), $.newjoylist = _0x5e7802.data);
      } catch (_0x5d3c5a) {
        $.logErr(_0x5d3c5a, _0xbb3f4a);
      } finally {
        _0x1b4a8e(_0x5e7802);
      }
    });
  });
}
function _0x32ec16(_0xeb5004) {
  return new Promise(async _0x52e63a => {
    let _0x50639f = await _0x3b065e("joyGuide", _0xeb5004, "");
    $.post(_0x50639f, async (_0x4ee02b, _0x11a8b6, _0x4b79c2) => {
      try {
        _0x4ee02b ? (console.log("" + JSON.stringify(_0x4ee02b)), console.log("joyGuide API请求失败，请检查网路重试")) : _0x4b79c2 = JSON.parse(_0x4b79c2);
      } catch (_0xf34814) {
        $.logErr(_0xf34814, _0x11a8b6);
      } finally {
        _0x52e63a(_0x4b79c2);
      }
    });
  });
}
function _0xed6792() {
  return new Promise(async _0x18c7fa => {
    let _0x46d096 = await _0x3b065e("gameMyPrize", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");
    $.post(_0x46d096, async (_0x1b33a2, _0x4e4b96, _0x18dbdf) => {
      try {
        if (_0x1b33a2) {
          console.log("" + JSON.stringify(_0x1b33a2));
          console.log("getGameMyPrize API请求失败，请检查网路重试");
        } else {
          _0x18dbdf = JSON.parse(_0x18dbdf);
          if (_0x18dbdf.success && _0x18dbdf.data) {
            $.Vos = _0x18dbdf.data.gamePrizeItemVos;
            $.overVos = _0x18dbdf.data.gameBigPrizeVO;
            for (let _0xbddc21 = 0; _0xbddc21 < $.Vos.length; _0xbddc21++) {
              $.Vos[_0xbddc21].prizeType == 4 && $.Vos[_0xbddc21].status == 1 && $.Vos[_0xbddc21].prizeTypeVO.prizeUsed == 0 && ($.log("\n当前账号有【" + $.Vos[_0xbddc21].prizeName + "】可提现"), $.id = $.Vos[_0xbddc21].prizeTypeVO.id, $.poolBaseId = $.Vos[_0xbddc21].prizeTypeVO.poolBaseId, $.prizeGroupId = $.Vos[_0xbddc21].prizeTypeVO.prizeGroupId, $.prizeBaseId = $.Vos[_0xbddc21].prizeTypeVO.prizeBaseId, await _0xf019c3($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId));
            }
            if ($.overVos) {
              if ($.overVos.prizeType == 4 && $.overVos.topLevelStatus == 1 && $.overVos.prizeTypeVO.prizeUsed == 0) {
                $.log("\n当前账号有【" + $.overVos.bigPrizeName + "】可提现");
                $.id = $.overVos.prizeTypeVO.id;
                $.poolBaseId = $.overVos.prizeTypeVO.poolBaseId;
                $.prizeGroupId = $.overVos.prizeTypeVO.prizeGroupId;
                $.prizeBaseId = $.overVos.prizeTypeVO.prizeBaseId;
                await _0xf019c3($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
              }
            }
          }
        }
      } catch (_0x48ab13) {
        $.logErr(_0x48ab13, _0x4e4b96);
      } finally {
        _0x18c7fa(_0x18dbdf);
      }
    });
  });
}
function _0xf019c3(_0x22d14b, _0x54942a, _0x3a2ebc, _0x3297a0) {
  return new Promise(async _0xe81bdd => {
    let _0x4c58df = await _0x3b065e("apCashWithDraw", "{\"businessSource\":\"JOY_PARK\",\"base\":{\"id\":" + _0x22d14b + ",\"business\":\"joyPark\",\"poolBaseId\":" + _0x54942a + ",\"prizeGroupId\":" + _0x3a2ebc + ",\"prizeBaseId\":" + _0x3297a0 + ",\"prizeType\":4},\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");
    $.post(_0x4c58df, async (_0x52fe2c, _0x7ca37, _0x364529) => {
      try {
        _0x52fe2c ? (console.log("" + JSON.stringify(_0x52fe2c)), console.log("apCashWithDraw API请求失败，请检查网路重试")) : (_0x364529 = JSON.parse(_0x364529), _0x364529.success && _0x364529.data && console.log("提现结果：" + JSON.stringify(_0x364529)));
      } catch (_0x2b66a5) {
        $.logErr(_0x2b66a5, _0x7ca37);
      } finally {
        _0xe81bdd(_0x364529);
      }
    });
  });
}
async function _0x3b065e(_0x44d282, _0x5b1c3c, _0x52f01c) {
  let _0x30d7f5,
    _0x5bbc77 = $.UA.split(";")[2];
  if (_0x52f01c) {
    const _0x36686c = {
      "appId": _0x52f01c,
      "fn": _0x44d282,
      "body": _0x5b1c3c,
      "apid": "activities_platform",
      "ver": _0x5bbc77,
      "cl": "android",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x30d7f5 = await _0x27723c.getbody(_0x36686c);
  } else {
    _0x30d7f5 = "functionId=" + _0x44d282 + "&body=" + _0x5b1c3c + "&appid=activities_platform&client=android&clientVersion=" + _0x5bbc77 + "&t=" + Date.now() + "&uuid=";
  }
  const _0x348d98 = {
    "User-Agent": $.UA,
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "api.m.jd.com",
    "Origin": "https://joypark.jd.com",
    "Referer": "https://joypark.jd.com/",
    "Cookie": _0x3b4d1b
  };
  const _0x3d9618 = {
    "url": "https://api.m.jd.com",
    "body": _0x30d7f5,
    "headers": _0x348d98
  };
  return _0x3d9618;
}
async function _0x47bbc8(_0x60e20f, _0x51d4f4, _0x1d5f33) {
  let _0x3d23f8,
    _0x4db677 = $.UA.split(";")[2];
  if (_0x1d5f33) {
    const _0x1b767f = {
      "appId": _0x1d5f33,
      "fn": _0x60e20f,
      "body": _0x51d4f4,
      "apid": "activities_platform",
      "ver": _0x4db677,
      "cl": "android",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x3d23f8 = await _0x27723c.getbody(_0x1b767f);
  } else {
    _0x3d23f8 = "functionId=" + _0x60e20f + "&body=" + _0x51d4f4 + "&appid=activities_platform&client=android&clientVersion=" + _0x4db677 + "&t=" + Date.now() + "&uuid=";
  }
  const _0x33d97b = {
    "User-Agent": $.UA,
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "api.m.jd.com",
    "Origin": "https://joypark.jd.com",
    "Referer": "https://joypark.jd.com/",
    "Cookie": _0x3b4d1b
  };
  const _0xbe06e3 = {
    "url": "https://api.m.jd.com/client.action?functionId=" + _0x60e20f + "&" + _0x3d23f8,
    "headers": _0x33d97b
  };
  return _0xbe06e3;
}
function _0x5adf03() {
  return new Promise(_0x4a0076 => {
    const _0x122fee = {
      "Cookie": _0x3b4d1b,
      "referer": "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0xe176a = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": _0x122fee,
      "timeout": 10000
    };
    $.get(_0xe176a, (_0x14d91b, _0xea1e99, _0x1ea375) => {
      try {
        if (_0x1ea375) {
          _0x1ea375 = JSON.parse(_0x1ea375);
          if (!(_0x1ea375.islogin === "1")) {
            _0x1ea375.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x44e7a8) {
        console.log(_0x44e7a8);
      } finally {
        _0x4a0076();
      }
    });
  });
}
function _0x58069d(_0x5cdd50) {
  _0x5cdd50 = _0x5cdd50 || 32;
  let _0x367bc6 = "abcdef0123456789",
    _0x98bd70 = _0x367bc6.length,
    _0x24873e = "";
  for (i = 0; i < _0x5cdd50; i++) {
    _0x24873e += _0x367bc6.charAt(Math.floor(Math.random() * _0x98bd70));
  }
  return _0x24873e;
}
function _0x295442(_0xd325d9) {
  if (typeof _0xd325d9 == "string") {
    try {
      return JSON.parse(_0xd325d9);
    } catch (_0x5765ff) {
      console.log(_0x5765ff);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function _0x354f47(_0x204a28) {
  const _0x2089b1 = ["", "", ""];
  let _0x289c42 = 1000,
    _0x36b0da = 3,
    _0x94bfa3 = "",
    _0x26f9ae = 1;
  while (_0x204a28 / _0x289c42 >= 1) {
    _0x289c42 *= 10;
    _0x36b0da += 1;
  }
  if (_0x36b0da <= 4) {
    _0x2089b1[0] = parseInt(_0x204a28 / 1000) + "";
    _0x2089b1[1] = "千";
  } else {
    if (_0x36b0da <= 8) {
      _0x94bfa3 = parseInt(_0x36b0da - 4) / 3 > 1 ? "千万" : "万";
      _0x26f9ae = _0x94bfa3 === "万" ? 10000 : 10000000;
      _0x204a28 % _0x26f9ae === 0 ? _0x2089b1[0] = parseInt(_0x204a28 / _0x26f9ae) + "" : _0x2089b1[0] = parseFloat(_0x204a28 / _0x26f9ae).toFixed(2) + "";
      _0x2089b1[1] = _0x94bfa3;
    } else {
      if (_0x36b0da <= 16) {
        _0x94bfa3 = (_0x36b0da - 8) / 3 > 1 ? "千亿" : "亿";
        _0x94bfa3 = (_0x36b0da - 8) / 4 > 1 ? "兆" : _0x94bfa3;
        _0x94bfa3 = (_0x36b0da - 8) / 7 > 1 ? "千兆" : _0x94bfa3;
        _0x26f9ae = 1;
        if (_0x94bfa3 === "亿") {
          _0x26f9ae = 100000000;
        } else {
          if (_0x94bfa3 === "千亿") {
            _0x26f9ae = 100000000000;
          } else {
            if (_0x94bfa3 === "兆") {
              _0x26f9ae = 1000000000000;
            } else {
              _0x94bfa3 === "千兆" && (_0x26f9ae = 1000000000000000);
            }
          }
        }
        _0x204a28 % _0x26f9ae === 0 ? _0x2089b1[0] = parseInt(_0x204a28 / _0x26f9ae) + "" : _0x2089b1[0] = parseFloat(_0x204a28 / _0x26f9ae).toFixed(2) + "";
        _0x2089b1[1] = _0x94bfa3;
      }
    }
  }
  _0x204a28 < 1000 && (_0x2089b1[0] = _0x204a28 + "", _0x2089b1[1] = "");
  return _0x2089b1.join("");
}