/*
新百货大楼
APP-主页-新百货频道-底部中间
日常任务，签到，盖楼，离线奖励领取，抽奖
5 16 * * * jd_xbhdla.js
默认定时，自定义, 不要太频繁，主要收离线收益
默认不抽奖，如不需要设置变量XBHROLL='true'
updatetime: 2023/6/10
*/
const Env = require('./utils/Env.js');
const $ = new Env("新百货盖楼");
const _0x3ffa11 = $.isNode() ? require("./jdCookie.js") : "",
  _0x272b75 = $.isNode() ? require("./sendNotify") : "";
let _0x5ccb32 = [],
  _0x137e4c = "",
  _0x2d3359,
  _0x1abb28 = process.env.XBHROLL || false;
if ($.isNode()) {
  Object.keys(_0x3ffa11).forEach(_0x2563a7 => {
    _0x5ccb32.push(_0x3ffa11[_0x2563a7]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x5ccb32 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4d3ebc($.getdata("CookiesJD") || "[]").map(_0x512c09 => _0x512c09.cookie)].filter(_0x5c2229 => !!_0x5c2229);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.full = false;
$.invitercode = [];
let _0x4f5be2 = ["4708215"],
  _0x173b2a = 0;
_0x173b2a = Math.floor(Math.random() * _0x4f5be2.length);
!(async () => {
  $.log("\n最近没玩过的，手动进游戏一次, 有黑的风险，风险自担！！！");
  $.log("\n入口： APP-搜新百货-底部中间,只运行前10个CK");
  $.log("\n当前版本：V3.0.1，问题建议TG：https://t.me/dylan_jdpro");
  if (!_0x5ccb32[0]) {
    const _0x2b07b4 = {
      "open-url": "https://bean.m.jd.com/"
    };
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", _0x2b07b4);
    return;
  }
  await $.wait(10);
  for (let _0x28be53 = 0; _0x28be53 < _0x5ccb32.length; _0x28be53++) {}
  _0x48c716();
  await _0x1ce3e2();
  for (let _0x529ada = 0; _0x529ada < 10; _0x529ada++) {
    _0x137e4c = _0x5ccb32[_0x529ada];
    if (_0x137e4c) {
      $.UserName = decodeURIComponent(_0x137e4c.match(/pt_pin=([^; ]+)(?=;?)/) && _0x137e4c.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x529ada + 1;
      $.hotFlag = false;
      $.uid = "";
      $.nochuzi = false;
      $.notimes = false;
      console.log("\n\n******开始【京东账号" + $.index + "】" + $.UserName + "*********\n");
      await _0x374478();
      await _0x3fb414();
      if ($.outFlag) {
        break;
      }
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
  }
  if ($.outFlag) {
    let _0x245256 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, _0x245256);
    if ($.isNode()) {
      await _0x272b75.sendNotify("" + $.name, "" + _0x245256);
    }
  }
})().catch(_0x2c556c => $.logErr(_0x2c556c)).finally(() => $.done());
async function _0x3fb414() {
  try {
    $.hasEnd = true;
    $.Token = "";
    $.Pin = "";
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    await _0x44deb8("GetSaveByJos");
    if (Object.keys($.info).length === 0) {
      return;
    }
    if ($.playname.includes("玩家")) {
      $.log("获取玩家信息失败，请手动进游戏一次！");
      return;
    }
    await _0x44deb8("login");
    await $.wait(1000);
    console.log("当前大楼", $.floornum + 1, "层");
    console.log("当前金币", $.score, "个");
    console.log("当前锤子", $.chuizi, "个");
    console.log("\n开始签到>>>>>>");
    $.signstate == 0 ? await _0x44deb8("GetSignInReward") : $.log("今日签到已完成");
    await $.wait(500);
    $.signtaskstate == 0 ? await _0x44deb8("GetSignTaskReward") : $.log("今日签到任务已完成");
    await $.wait(500);
    console.log("\n领取离线收益>>>>>>");
    await _0x44deb8("Produce");
    await $.wait(500);
    await _0x44deb8("GetOfflineRenevue");
    await $.wait(500);
    $.log("\n开始漂浮任务>>>>>>");
    if ($.eggTimes < 2) {
      for (let _0x1c1d50 = 1; _0x1c1d50 < 3; _0x1c1d50++) {
        $.log("第" + _0x1c1d50 + "次");
        await _0x44deb8("AddShowTime");
        await $.wait(500);
        await _0x44deb8("GetNormalReward");
        await $.wait(500);
        await _0x44deb8("EastReward");
        await $.wait(2500);
      }
    } else {
      $.log("漂浮任务已完成！");
    }
    $.log("\n开始日常任务>>>>>>");
    await _0x44deb8("GetTaskList");
    await $.wait(500);
    await _0x44deb8("GetBrowseList");
    await $.wait(500);
    for (let _0x2402b4 of $.tasklist) {
      if ($.taskstatelist[_0x2402b4.type] >= _0x2402b4.rewardTimes) {
        console.log(_0x2402b4.name, "----已完成");
        continue;
      }
      switch (_0x2402b4.type) {
        case "BrowseShop":
          for (let _0x4689c9 = 0; _0x4689c9 < _0x2402b4.rewardTimes - ($.taskstatelist[_0x2402b4.type] || 0); _0x4689c9++) {
            console.log(_0x2402b4.name);
            $.type = _0x2402b4.type;
            $.iid = $.Shoplist[Math.floor(Math.random() * $.Shoplist.length)].entityList[0].shopId;
            $.taskId = _0x2402b4._id;
            await _0x44deb8("AddStep");
            await $.wait(3000);
            await _0x44deb8("GetReward");
          }
          break;
        case "BrowseSku":
        case "BrowseSku1":
        case "BrowseSku2":
        case "BrowseSku3":
          for (let _0x1c68db = 0; _0x1c68db < _0x2402b4.rewardTimes - ($.taskstatelist[_0x2402b4.type] || 0); _0x1c68db++) {
            console.log(_0x2402b4.name);
            $.type = _0x2402b4.type;
            $.iid = $.Skulist[Math.floor(Math.random() * $.Skulist.length)].entityList[0].skuId;
            $.taskId = _0x2402b4._id;
            await _0x44deb8("AddStep");
            await $.wait(3000);
            await _0x44deb8("GetReward");
          }
          break;
        case "BrowseVender":
          for (let _0x395661 = 0; _0x395661 < _0x2402b4.rewardTimes - ($.taskstatelist[_0x2402b4.type] || 0); _0x395661++) {
            console.log(_0x2402b4.name);
            $.type = _0x2402b4.type;
            $.iid = $.Venderlist[Math.floor(Math.random() * $.Venderlist.length)].entityList[0].venderName;
            $.taskId = _0x2402b4._id;
            await _0x44deb8("AddStep");
            await $.wait(3000);
            await _0x44deb8("GetReward");
          }
          break;
        case "BrowseChannel":
          for (let _0x5ed3ca = 0; _0x5ed3ca < _0x2402b4.rewardTimes - ($.taskstatelist[_0x2402b4.type] || 0); _0x5ed3ca++) {
            console.log(_0x2402b4.name);
            $.type = _0x2402b4.type;
            $.iid = $.Channelist[Math.floor(Math.random() * $.Channelist.length)].entityList[0].channelId;
            $.taskId = _0x2402b4._id;
            await _0x44deb8("AddStep");
            await $.wait(3000);
            await _0x44deb8("GetReward");
          }
          break;
        case "FollowShop":
          for (let _0xc69b1c = 0; _0xc69b1c < _0x2402b4.rewardTimes - ($.taskstatelist[_0x2402b4.type] || 0); _0xc69b1c++) {
            console.log(_0x2402b4.name);
            $.type = _0x2402b4.type;
            await _0x44deb8("GetFollowShopList");
            await $.wait(500);
            $.iid = $.folowshopid;
            $.taskId = _0x2402b4._id;
            await _0x44deb8("AddStep");
            await $.wait(1000);
            await _0x44deb8("GetReward");
          }
          break;
      }
    }
    console.log("\n开始盖楼>>>>>>");
    for (let _0x3627c6 = 0; _0x3627c6 < 5; _0x3627c6++) {
      if ($.nochuzi) {
        break;
      }
      await _0x44deb8("Upgrade");
      await $.wait(1000);
    }
    if (_0x1abb28) {
      if ($.lotterytimes < 3) {
        console.log("\n开始抽奖>>>>>>");
        await _0x44deb8("Roll");
      }
    } else {
      $.log("\n默认不抽奖，跳出");
    }
  } catch (_0x39d430) {
    console.log(_0x39d430);
  }
}
async function _0x44deb8(_0x502b4c, _0x155831) {
  if ($.outFlag) {
    return;
  }
  let _0x3ca53a = "POST";
  switch (_0x502b4c) {
    case "token":
      url = "https://jdjoy.jd.com/saas/framework/user/token?appId=f3576dcf13b52805bb78cc02450ffc26&client=m&url=pengyougou.m.jd.com";
      break;
    case "lkToken":
      url = "https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=f3576dcf13b52805bb78cc02450ffc26";
      break;
    case "GetSaveByJos":
      url = "https://jd-bigmall.gamecatstudio.com/g/Save/GetSaveByJos";
      const _0x53bc73 = {
        "lkToken": null,
        "openId": null,
        "xId": null,
        "accessToken": null,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": null
      };
      const _0x4fc48a = {
        "code": $.code,
        "channel": "release",
        "babelChannel": null
      };
      _0x155831 = {
        "meta": _0x53bc73,
        ..._0x435d6d(),
        "encrypt": true,
        "data": _0x4fc48a,
        "clientReqId": _0xda22c7()
      };
      break;
    case "login":
      url = "https://jd-bigmall.gamecatstudio.com/s/Api/Main/Login";
      const _0x14b535 = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      const _0x186af4 = {
        "lkToken": null,
        "pin": $.pin,
        "lkEPin": $.lkEPin,
        "id": $.uid,
        "babelChannel": null,
        "customChannel": null,
        "isValid": false,
        "appVersion": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "name": $.UserName,
        "avatar": $.avatarUrl,
        "avatarf": 0,
        "platform": "MOBILE_BROWSER",
        "system": "iOS",
        "browser": "Unknown",
        "device": {}
      };
      _0x186af4.device.type = "mobile";
      _0x155831 = {
        "meta": _0x14b535,
        ..._0x435d6d(),
        "encrypt": true,
        "data": _0x186af4,
        "clientReqId": _0xda22c7()
      };
      break;
    case "GetOfflineRenevue":
      url = "https://jd-bigmall.gamecatstudio.com/g/Building/GetOfflineRenevue";
      const _0x3228f0 = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x3228f0,
        ..._0x435d6d(),
        "clientReqId": _0xda22c7()
      };
      break;
    case "GetSignInReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/SignIn/GetSignInReward";
      const _0x5d40a8 = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x5d40a8,
        ..._0x435d6d(),
        "clientReqId": _0xda22c7()
      };
      break;
    case "GetSignTaskReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/SignIn/GetTaskReward";
      const _0x36b540 = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x36b540,
        ..._0x435d6d(),
        "clientReqId": _0xda22c7()
      };
      break;
    case "GetTaskList":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetTaskList";
      const _0x599665 = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x599665,
        ..._0x435d6d(),
        "clientReqId": _0xda22c7()
      };
      break;
    case "GetBrowseList":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetBrowseList";
      const _0x2192de = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x2192de,
        ..._0x435d6d(),
        "clientReqId": _0xda22c7()
      };
      break;
    case "AddStep":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/AddStep";
      const _0x2bca58 = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      const _0x33fb89 = {
        "taskType": $.type,
        "entityIds": [$.iid]
      };
      _0x155831 = {
        "meta": _0x2bca58,
        ..._0x435d6d(),
        "encrypt": true,
        "data": _0x33fb89,
        "clientReqId": _0xda22c7()
      };
      break;
    case "GetReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetReward";
      const _0x4eaeca = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      const _0xce27fb = {
        "taskId": $.taskId
      };
      _0x155831 = {
        "meta": _0x4eaeca,
        ..._0x435d6d(),
        "encrypt": true,
        "data": _0xce27fb,
        "clientReqId": _0xda22c7()
      };
      break;
    case "Produce":
      url = "https://jd-bigmall.gamecatstudio.com/g/Building/Produce";
      const _0x4c281b = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x4c281b,
        ..._0x435d6d(),
        "encrypt": true,
        "data": {},
        "clientReqId": _0xda22c7()
      };
      break;
    case "GetFollowShopList":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetFollowShopList";
      const _0x13816a = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x13816a,
        ..._0x435d6d(),
        "encrypt": true,
        "data": {},
        "clientReqId": _0xda22c7()
      };
      break;
    case "GetFollowShopStatus":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetFollowShopStatus";
      _0x155831 = {
        "uid": $.uid,
        "uv": $.uv,
        "version": "1.1.5",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "meta": {
          "uid": $.uid,
          "uv": $.uv,
          "version": "1.1.5",
          "channel": "release",
          "env": "jdApp",
          "isPre": false
        },
        ..._0x435d6d(),
        "encrypt": true,
        "data": {
          "lkToken": $.lkToken,
          "ids": [1000002483, 1000005125, 1000005205, 1000005193, 956228, 1000005174, 1000305465, 1000002626]
        },
        "clientReqId": _0xda22c7()
      };
      break;
    case "Upgrade":
      url = "https://jd-bigmall.gamecatstudio.com/g/Building/Upgrade";
      const _0xd55806 = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0xd55806,
        ..._0x435d6d(),
        "clientReqId": _0xda22c7()
      };
      break;
    case "RefreshOnline":
      url = "https://jd-bigmall.gamecatstudio.com/g/Save/RefreshOnline";
      const _0x28737f = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x28737f,
        ..._0x435d6d(),
        "encrypt": true,
        "data": {},
        "clientReqId": _0xda22c7()
      };
      break;
    case "AddShowTime":
      url = "https://jd-bigmall.gamecatstudio.com/g/EasterEggTask/AddShowTime";
      const _0x35c9ad = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x35c9ad,
        ..._0x435d6d(),
        "clientReqId": _0xda22c7()
      };
      break;
    case "GetNormalReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/EasterEggTask/GetNormalReward";
      const _0x361daf = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x361daf,
        ..._0x435d6d(),
        "clientReqId": _0xda22c7()
      };
      break;
    case "EastReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/EasterEggTask/GetTaskReward";
      const _0x4c4226 = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x4c4226,
        ..._0x435d6d(),
        "clientReqId": _0xda22c7()
      };
      break;
    case "Roll":
      url = "https://jd-bigmall.gamecatstudio.com/g/Lottery/Roll";
      const _0x12833b = {
        "uid": $.uid,
        "lkToken": null,
        "openId": $.openId,
        "xId": $.xId,
        "accessToken": $.accessToken,
        "uv": $.uv,
        "version": "2.2.2",
        "channel": "release",
        "env": "jdApp",
        "isPre": false,
        "cuid": $.uid
      };
      _0x155831 = {
        "meta": _0x12833b,
        ..._0x435d6d(),
        "encrypt": true,
        "data": {},
        "clientReqId": _0xda22c7()
      };
      break;
    default:
      console.log("错误" + _0x502b4c);
  }
  _0x155831 && _0x155831.meta && (_0x155831.meta = _0x724620.aesEncrypt(JSON.stringify(_0x155831.meta), "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
  _0x155831 && _0x155831.encrypt && (_0x155831.data = _0x724620.aesEncrypt(JSON.stringify(_0x155831.data), "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
  let _0x5cb3c7 = _0x5131cb(url, _0x155831, _0x3ca53a);
  return new Promise(async _0x44f647 => {
    $.post(_0x5cb3c7, (_0x36bef4, _0x46718e, _0x27759b) => {
      try {
        _0x36bef4 ? (_0x46718e && _0x46718e.statusCode && _0x46718e.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(_0x36bef4, _0x36bef4)), console.log(" API请求失败，请检查网路重试")) : _0x27759b = _0x4fd195(_0x502b4c, _0x27759b);
      } catch (_0x5a00e2) {
        console.log(_0x5a00e2, _0x46718e);
      } finally {
        _0x44f647(_0x27759b);
      }
    });
  });
}
async function _0x4fd195(_0x5bd74f, _0x57040b) {
  let _0x5c1e30 = "";
  try {
    if (_0x57040b) {
      _0x5c1e30 = JSON.parse(_0x57040b);
      if (_0x5c1e30.data) {
        _0x5c1e30.data = JSON.parse(_0x724620.aesDecrypt(_0x5c1e30.data, "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
      }
      if (_0x5c1e30.extraData) {
        _0x5c1e30.extraData = JSON.parse(_0x724620.aesDecrypt(_0x5c1e30.extraData, "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
      }
    }
  } catch (_0x3dadc3) {
    console.log(_0x5bd74f + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (_0x5bd74f) {
      case "token":
        if (typeof _0x5c1e30 == "object") {
          if (_0x5c1e30.success) {
            if (typeof _0x5c1e30.data != "undefined") {
              $.Token = _0x5c1e30.data;
            }
          } else {
            _0x5c1e30.errorMessage ? console.log("token " + _0x5c1e30.errorMessage) : console.log(_0x57040b);
          }
        } else {
          console.log(_0x57040b);
        }
        break;
      case "login":
        if (typeof _0x5c1e30 == "object") {
          if (_0x5c1e30.success) {
            let _0x28cda1 = _0x5c1e30.currentTime;
            console.log(Date.now() - _0x28cda1);
          } else {
            console.log(JSON.stringify(_0x5c1e30));
            console.log("与服务器时差：" + ($.tsstr - _0x5c1e30.currentTime) + "}");
          }
        } else {
          console.log(_0x57040b);
        }
        break;
      case "GetSaveByJos":
        if (typeof _0x5c1e30 == "object") {
          $.info = {};
          $.difftime = Date.now() - _0x5c1e30.currentTime;
          if (_0x5c1e30.success) {
            $.info = _0x724620.aesDecrypt(_0x5c1e30.data.save, "k4ug8ayehg5a8e96", "g8err4a5g23a5e8g");
            $.info = JSON.parse($.info);
            $.score = $.info.items.data[101001001];
            $.taskstatelist = $.info.task.daySteps;
            $.chuizi = $.info.items.data[101001002];
            $.uv = $.info.updateVersion;
            $.signstate = $.info.signIn.getSignReward;
            $.signtaskstate = $.info.signIn.getTaskReward;
            $.floornum = $.info.building.floorNum;
            $.eggstate = $.info.easterEggTask.completeTask;
            $.eggTimes = $.info.easterEggTask.getRewardTimes;
            $.lotterytimes = $.info.lottery.todayRollCount;
            $.uid = $.info._id;
            $.accessToken = $.info.accessToken;
            $.avatarUrl = $.info.avatarUrl;
            $.openId = $.info.openId;
            $.xId = $.info.xId;
            $.lkEPin = $.info.lkEPin;
            $.pin = $.info.pin;
            $.playname = $.info.name;
          } else {
            console.log("获取信息失败，跳出");
          }
        } else {
          console.log(_0x57040b);
        }
        break;
      case "GetOfflineRenevue":
        typeof _0x5c1e30 == "object" ? $.offscore && ($.uv += 1, console.log("获取离线收益：", $.offscore)) : console.log(_0x57040b);
        break;
      case "GetTaskList":
        typeof _0x5c1e30 == "object" ? _0x5c1e30.success ? $.tasklist = _0x5c1e30.data : (console.log(JSON.stringify(_0x5c1e30)), console.log("与服务器时差：" + ($.tsstr - _0x5c1e30.currentTime) + "}")) : console.log(_0x5c1e30);
        break;
      case "GetBrowseList":
        typeof _0x5c1e30 == "object" ? _0x5c1e30.success ? ($.Skulist = _0x5c1e30.data.browseSku, $.Shoplist = _0x5c1e30.data.browseShop, $.Venderlist = _0x5c1e30.data.browseVender, $.Channelist = _0x5c1e30.data.browseChannel) : (console.log(JSON.stringify(_0x5c1e30)), console.log("与服务器时差：" + ($.tsstr - _0x5c1e30.currentTime))) : console.log(_0x57040b);
        break;
      case "GetFollowShopList":
        if (typeof _0x5c1e30 == "object") {
          if (_0x5c1e30.success) {
            $.folowshopid = _0x5c1e30.data[0].entityList[0].shopId;
          } else {
            console.log(JSON.stringify(_0x5c1e30));
            console.log("与服务器时差：" + ($.tsstr - _0x5c1e30.currentTime) + "}");
          }
        } else {
          console.log(_0x57040b);
        }
        break;
      case "GetSignInReward":
      case "GetSignTaskReward":
        if (typeof _0x5c1e30 == "object") {
          if (_0x5c1e30.success) {
            $.uv += 1;
            console.log("签到完成，获得锤子 ", _0x5c1e30.data.reward);
          } else {
            console.log(JSON.stringify(_0x5c1e30));
            console.log("与服务器时差：" + ($.tsstr - _0x5c1e30.currentTime) + "}");
          }
        } else {
          console.log(_0x57040b);
        }
        break;
      case "GetReward":
      case "EastReward":
      case "GetNormalReward":
        typeof _0x5c1e30 == "object" ? _0x5c1e30.success ? ($.uv += 1, console.log("任务完成，获得锤子 ", _0x5c1e30.data.reward.num || _0x5c1e30.data.reward)) : (console.log(JSON.stringify(_0x5c1e30)), console.log("与服务器时差：" + ($.tsstr - _0x5c1e30.currentTime) + "}")) : console.log(_0x57040b);
        break;
      case "AddStep":
      case "AddShowTime":
        if (typeof _0x5c1e30 == "object") {
          if (_0x5c1e30.success) {
            $.uv += 1;
          } else {
            console.log(JSON.stringify(_0x5c1e30));
            console.log("与服务器时差：" + ($.tsstr - _0x5c1e30.currentTime) + "}");
          }
        } else {
          console.log(_0x57040b);
        }
        break;
      case "Upgrade":
        typeof _0x5c1e30 == "object" ? _0x5c1e30.success ? ($.uv += 1, console.log("盖楼成功"), console.log("剩余锤子：", _0x5c1e30.extraData.dsl[0].value)) : ($.nochuzi = true, _0x5c1e30.errorMessage.indexOf("enough") > -1 ? $.log("锤子不足！") : console.log(_0x5c1e30.errorMessage)) : console.log(_0x57040b);
        break;
      case "Produce":
        typeof _0x5c1e30 == "object" ? _0x5c1e30.success ? ($.uv += 1, $.offscore = "", _0x5c1e30.data.isOfflineRenevue && ($.offscore = _0x5c1e30.data.produce)) : (console.log(JSON.stringify(_0x5c1e30)), console.log("与服务器时差：" + ($.tsstr - _0x5c1e30.currentTime) + "}")) : console.log(_0x57040b);
        break;
      case "RefreshOnline":
        if (typeof _0x5c1e30 == "object") {
          if (!_0x5c1e30.success) {
            console.log(_0x5c1e30.errorMessage);
          }
        } else {
          console.log(_0x57040b);
        }
        break;
      case "Roll":
        typeof _0x5c1e30 == "object" ? _0x5c1e30.success ? ($.uv += 1, $.log("花费 " + _0x5c1e30.data.record.cost + " 金币，获得 " + _0x5c1e30.data.record.num + " " + (_0x5c1e30.data.record.rewardType ? "京豆!" : "金币!") + " ")) : ($.notimes = true, _0x5c1e30.errorMessage.indexOf("enough") > -1 ? $.log("金币不足！") : console.log(_0x5c1e30.errorMessage)) : console.log(_0x57040b);
        break;
      case "followShop":
      case "doTask":
      case "addCart":
      case "missionInviteList":
      case "绑定":
      case "助力":
        let _0x34eef0 = "";
        if (_0x5bd74f == "followShop") {
          _0x34eef0 = "关注";
        }
        if (_0x5bd74f == "addCart") {
          _0x34eef0 = "加购";
        }
        if (_0x5bd74f == "specialSign") {
          _0x34eef0 = "签到";
        }
        if (typeof _0x5c1e30 == "object") {
          if (_0x5c1e30.success && _0x5c1e30.success === true && _0x5c1e30.data) {
            if (_0x5c1e30.data.status && _0x5c1e30.data.status == 200) {
              _0x5c1e30 = _0x5c1e30.data;
              _0x5bd74f != "setMixNick" && (_0x5c1e30.msg || _0x5c1e30.data.remark) && console.log((_0x34eef0 && _0x34eef0 + ":" || "") + (_0x5c1e30.msg || _0x5c1e30.data.isOpenCard || _0x5c1e30.data.remark || ""));
              if (_0x5bd74f == "activity_load") {
                _0x5c1e30.data && ($.MixNick = _0x5c1e30.data.missionCustomer.buyerNick || "", $.hasCollectShop = _0x5c1e30.data.missionCustomer.hasCollectShop || 0, $.totalPoint = _0x5c1e30.data.missionCustomer.totalPoint || 0, $.remainChance = _0x5c1e30.data.missionCustomer.remainChance || 0);
              } else {
                _0x5bd74f == "missionInviteList" && console.log("本月已邀请助力(" + _0x5c1e30.data.total + ")");
              }
            } else {
              if (_0x5c1e30.data.msg) {
                console.log(_0x5c1e30.data.msg);
              } else {
                if (_0x5c1e30.errorMessage) {
                  console.log(_0x5bd74f + " " + _0x5c1e30.errorMessage);
                } else {
                  console.log(_0x57040b);
                }
              }
            }
          } else {
            _0x5c1e30.errorMessage ? console.log(_0x5bd74f + " " + _0x5c1e30.errorMessage) : console.log(_0x57040b);
          }
        } else {
          console.log(_0x57040b);
        }
        break;
      default:
        return _0x5c1e30;
    }
  } catch (_0x244b56) {
    console.log(_0x244b56);
  }
}
function _0x5131cb(_0x2883c3, _0x34bf39, _0x1399db = "POST") {
  const _0x1f3c87 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    "X-Requested-With": "com.jingdong.app.mall"
  };
  _0x2883c3.indexOf("jddl") > -1 && (_0x1f3c87.Origin = "https://jddl.gamecatstudio.com", _0x1f3c87.Referer = "https://jddl.gamecatstudio.com/", delete _0x1f3c87.Cookie);
  return {
    "url": _0x2883c3,
    "method": _0x1399db,
    "headers": _0x1f3c87,
    "body": JSON.stringify(_0x34bf39),
    "timeout": 30000
  };
}
function _0x2b1903(_0x59b678) {
  _0x59b678 = _0x59b678 || 32;
  let _0x5d53c1 = "abcdef0123456789",
    _0x2c0735 = _0x5d53c1.length,
    _0xee350e = "";
  for (let _0x4d9b2a = 0; _0x4d9b2a < _0x59b678; _0x4d9b2a++) {
    _0xee350e += _0x5d53c1.charAt(Math.floor(Math.random() * _0x2c0735));
  }
  return _0xee350e;
}
function _0x1502dc(_0x2ab50b, _0x5aa6f2) {
  var _0x2f9892 = Math.floor(Math.random() * (_0x5aa6f2 - _0x2ab50b + 1) + _0x2ab50b);
  return _0x2f9892;
}
function _0x4d3ebc(_0x160c03) {
  if (typeof _0x160c03 == "string") {
    try {
      return JSON.parse(_0x160c03);
    } catch (_0x3ddf6e) {
      console.log(_0x3ddf6e);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function _0x1ce3e2() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + _0x2b1903(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0xda22c7() {
  function _0x2eb107() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
  }
  return _0x2eb107() + _0x2eb107() + _0x2eb107() + _0x2eb107() + _0x2eb107() + _0x2eb107() + _0x2eb107() + _0x2eb107();
}
function _0x435d6d() {
  $.tsstr = Date.now() - $.difftime || 0;
  let _0x1adfbb = _0x724620.aesEncrypt(String($.tsstr), "a8ge9g5r8a4d1g5r", "5e8g8r6a32z1d5ge"),
    _0x54ff2c = _0x724620.aesEncrypt(_0x1adfbb + ($.uid || "") + "2.2.2" + "release" + "jdApp", "a8ge9g5r8a4d1g5r", "5e8g8r6a32z1d5ge");
  const _0x526d01 = {
    "t": _0x1adfbb,
    "s": _0x54ff2c
  };
  return _0x526d01;
}
const _0x3fe48b = require("crypto-js");
var _0x724620 = function () {
  function _0xdc1ce4() {}
  _0xdc1ce4.aesEncrypt = function (_0x1da0ef, _0x38c753, _0x64987f) {
    var _0x13170e = _0x3fe48b.enc.Utf8.parse(_0x38c753),
      _0x37ad1a = _0x3fe48b.enc.Utf8.parse(_0x64987f);
    return _0x3fe48b.AES.encrypt(_0x1da0ef, _0x13170e, {
      "iv": _0x37ad1a,
      "mode": _0x3fe48b.mode.CBC,
      "padCRng": _0x3fe48b.pad.Pkcs7
    }).toString(_0x3fe48b.format.Hex);
  };
  _0xdc1ce4.aesDecrypt = function (_0x5a28e8, _0x2f76c3, _0x348e20) {
    var _0x4ff21a = _0x3fe48b.enc.Utf8.parse(_0x2f76c3),
      _0x2d8973 = _0x3fe48b.enc.Utf8.parse(_0x348e20),
      _0x245669 = _0x3fe48b.enc.Hex.parse(_0x5a28e8),
      _0xb32673 = _0x3fe48b.enc.Base64.stringify(_0x245669);
    return _0x3fe48b.AES.decrypt(_0xb32673, _0x4ff21a, {
      "iv": _0x2d8973,
      "mode": _0x3fe48b.mode.CBC,
      "padCRng": _0x3fe48b.pad.Pkcs7
    }).toString(_0x3fe48b.enc.Utf8);
  };
  return _0xdc1ce4;
}();
function _0x48c716() {
  if (__filename.includes("6dy")) {
    _0x2d3359 = true;
  }
}
async function _0x374478() {
  const _0xab0686 = {
    "Referer": "https://prodev.m.jd.com/",
    "User-Agent": $.UA,
    "Cookie": _0x137e4c
  };
  const _0x4b3526 = {
    "url": "https://open-oauth.jd.com/oauth2/to_login?app_key=904D7F385D9251D2C565B37ACCAE0D44&response_type=code&scope=snsapi_app_union_login&redirect_uri=https%3A%2F%2Fjddl.gamecatstudio.com%2Fr%2Findex.html&",
    "headers": _0xab0686,
    "followRedirect": false
  };
  return new Promise(async _0x5525d2 => {
    $.get(_0x4b3526, async (_0x61a9b0, _0xc83c2d, _0x1140e7) => {
      try {
        if (_0x61a9b0) {
          console.log("" + JSON.stringify(_0x61a9b0));
          console.log(" API请求失败，请检查网路重试");
        } else {
          await _0x187913(_0xc83c2d.headers.location.replace("to_authorize", "authorize"));
        }
      } catch (_0x8c6478) {
        $.logErr(_0x8c6478, _0xc83c2d);
      } finally {
        _0x5525d2(_0x1140e7);
      }
    });
  });
}
async function _0x187913(_0x21e2e4) {
  const _0x5e774a = {
    "Referer": "https://prodev.m.jd.com/",
    "User-Agent": $.UA,
    "Cookie": _0x137e4c + "language=zh_CN"
  };
  const _0x185b88 = {
    "url": _0x21e2e4,
    "headers": _0x5e774a,
    "followRedirect": false
  };
  return new Promise(async _0x3af2ee => {
    $.get(_0x185b88, async (_0x32d201, _0x1dd62f, _0x2a4e1b) => {
      try {
        _0x32d201 ? (console.log("" + JSON.stringify(_0x32d201)), console.log(" API请求失败，请检查网路重试")) : $.code = _0x1dd62f.headers.location.match(/code=(.*)/)[1];
      } catch (_0x987361) {
        $.logErr(_0x987361, _0x1dd62f);
      } finally {
        _0x3af2ee(_0x2a4e1b);
      }
    });
  });
}