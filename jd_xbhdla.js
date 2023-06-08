/*
新百货大楼
APP-主页-新百货频道-底部中间
日常任务，签到，盖楼，离线奖励领取，抽奖
5 16 * * * jd_xbhdla.js 
默认定时不跑，自定义, 不要太频繁，主要收离线收益
默认不抽奖，如不需要设置变量XBHROLL='true'
updatetime: 2023/6/3
author: https://github.com/6dylan6/jdpro
*/
const Env = require('./utils/Env.js');
const $ = new Env("新百货盖楼");
const _0x1d8c16 = $.isNode() ? require("./jdCookie.js") : "",
  _0x33fb88 = $.isNode() ? require("./sendNotify") : "";
let _0x365182 = [],
  _0xfe4b52 = "",
  _0x1435ff = process.env.XBHROLL || false;
if ($.isNode()) {
  Object.keys(_0x1d8c16).forEach(_0x5cb27e => {
    _0x365182.push(_0x1d8c16[_0x5cb27e]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x365182 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x497161($.getdata("CookiesJD") || "[]").map(_0x3a0c03 => _0x3a0c03.cookie)].filter(_0x474985 => !!_0x474985);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.full = false;
$.invitercode = [];
let _0xba4256 = ["4708215"],
  _0x49c918 = 0;
_0x49c918 = Math.floor(Math.random() * _0xba4256.length);
!(async () => {
  $.log("\n最近没玩过的，手动进游戏一次, 有黑的风险，风险自担！！！");
  $.log("\n入口： APP-主页-新百货频道-底部中间,只运行前10个CK");
  $.log("\n问题建议TG：https://t.me/dylan_jdpro");
  if (!_0x365182[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  await $.wait(10);

  await _0x2446ba();
  for (let _0x209a9e = 0; _0x209a9e < 10; _0x209a9e++) {
    _0xfe4b52 = _0x365182[_0x209a9e];
    if (_0xfe4b52) {
      $.UserName = decodeURIComponent(_0xfe4b52.match(/pt_pin=([^; ]+)(?=;?)/) && _0xfe4b52.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x209a9e + 1;
      $.hotFlag = false;
      $.uid = "";
      $.nochuzi = false;
      $.notimes = false;
      console.log("\n\n******开始【京东账号" + $.index + "】" + $.UserName + "*********\n");
      await _0x1325bd();
      await _0x2e1d11();
      if ($.outFlag) {
        break;
      }
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
  }
  if ($.outFlag) {
    let _0x2820ad = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, _0x2820ad);
    if ($.isNode()) {
      await _0x33fb88.sendNotify("" + $.name, "" + _0x2820ad);
    }
  }
})().catch(_0x11b681 => $.logErr(_0x11b681)).finally(() => $.done());
async function _0x2e1d11() {
  try {
    $.hasEnd = true;
    $.Token = "";
    $.Pin = "";
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    await _0x89cf01("GetSaveByJos");
    if (Object.keys($.info).length === 0) {
      return;
    }
    await _0x89cf01("login");
    await $.wait(1000);
    console.log("当前大楼", $.floornum + 1, "层");
    console.log("当前金币", $.score, "个");
    console.log("当前锤子", $.chuizi, "个");
    console.log("\n开始签到>>>>>>");
    $.signstate == 0 ? await _0x89cf01("GetSignInReward") : $.log("今日签到已完成");
    await $.wait(500);
    if ($.signtaskstate == 0) {
      await _0x89cf01("GetSignTaskReward");
    } else {
      $.log("今日签到任务已完成");
    }
    await $.wait(500);
    console.log("\n领取离线收益>>>>>>");
    await _0x89cf01("Produce");
    await $.wait(500);
    await _0x89cf01("GetOfflineRenevue");
    await $.wait(500);
    $.log("\n开始漂浮任务>>>>>>");
    if ($.eggTimes < 2) {
      for (let _0x39e933 = 1; _0x39e933 < 3; _0x39e933++) {
        $.log("第" + _0x39e933 + "次");
        await _0x89cf01("AddShowTime");
        await $.wait(500);
        await _0x89cf01("GetNormalReward");
        await $.wait(500);
        await _0x89cf01("EastReward");
        await $.wait(2500);
      }
    } else {
      $.log("漂浮任务已完成！");
    }
    $.log("\n开始日常任务>>>>>>");
    await _0x89cf01("GetTaskList");
    await $.wait(500);
    await _0x89cf01("GetBrowseList");
    await $.wait(500);
    for (let _0x2fc790 of $.tasklist) {
      if ($.taskstatelist[_0x2fc790.type] >= _0x2fc790.rewardTimes) {
        console.log(_0x2fc790.name, "----已完成");
        continue;
      }
      switch (_0x2fc790.type) {
        case "BrowseShop":
          for (let _0x1299ca = 0; _0x1299ca < _0x2fc790.rewardTimes - ($.taskstatelist[_0x2fc790.type] || 0); _0x1299ca++) {
            console.log(_0x2fc790.name);
            $.type = _0x2fc790.type;
            $.iid = $.Shoplist[Math.floor(Math.random() * $.Shoplist.length)].entityList[0].shopId;
            $.taskId = _0x2fc790._id;
            await _0x89cf01("AddStep");
            await $.wait(3000);
            await _0x89cf01("GetReward");
          }
          break;
        case "BrowseSku":
        case "BrowseSku1":
        case "BrowseSku2":
        case "BrowseSku3":
          for (let _0x49bfd0 = 0; _0x49bfd0 < _0x2fc790.rewardTimes - ($.taskstatelist[_0x2fc790.type] || 0); _0x49bfd0++) {
            console.log(_0x2fc790.name);
            $.type = _0x2fc790.type;
            $.iid = $.Skulist[Math.floor(Math.random() * $.Skulist.length)].entityList[0].skuId;
            $.taskId = _0x2fc790._id;
            await _0x89cf01("AddStep");
            await $.wait(3000);
            await _0x89cf01("GetReward");
          }
          break;
        case "BrowseVender":
          for (let _0x1be4e3 = 0; _0x1be4e3 < _0x2fc790.rewardTimes - ($.taskstatelist[_0x2fc790.type] || 0); _0x1be4e3++) {
            console.log(_0x2fc790.name);
            $.type = _0x2fc790.type;
            $.iid = $.Venderlist[Math.floor(Math.random() * $.Venderlist.length)].entityList[0].venderName;
            $.taskId = _0x2fc790._id;
            await _0x89cf01("AddStep");
            await $.wait(3000);
            await _0x89cf01("GetReward");
          }
          break;
        case "BrowseChannel":
          for (let _0x4f1e74 = 0; _0x4f1e74 < _0x2fc790.rewardTimes - ($.taskstatelist[_0x2fc790.type] || 0); _0x4f1e74++) {
            console.log(_0x2fc790.name);
            $.type = _0x2fc790.type;
            $.iid = $.Channelist[Math.floor(Math.random() * $.Channelist.length)].entityList[0].channelId;
            $.taskId = _0x2fc790._id;
            await _0x89cf01("AddStep");
            await $.wait(3000);
            await _0x89cf01("GetReward");
          }
          break;
        case "FollowShop":
          for (let _0x333e07 = 0; _0x333e07 < _0x2fc790.rewardTimes - ($.taskstatelist[_0x2fc790.type] || 0); _0x333e07++) {
            console.log(_0x2fc790.name);
            $.type = _0x2fc790.type;
            await _0x89cf01("GetFollowShopList");
            await $.wait(500);
            $.iid = $.folowshopid;
            $.taskId = _0x2fc790._id;
            await _0x89cf01("AddStep");
            await $.wait(1000);
            await _0x89cf01("GetReward");
          }
          break;
      }
    }
    console.log("\n开始盖楼>>>>>>");
    for (let _0x2c0dc2 = 0; _0x2c0dc2 < 5; _0x2c0dc2++) {
      if ($.nochuzi) {
        break;
      }
      await _0x89cf01("Upgrade");
      await $.wait(1000);
    }
    if (_0x1435ff) {
      $.lotterytimes < 3 && (console.log("\n开始抽奖>>>>>>"), await _0x89cf01("Roll"));
    } else {
      $.log("\n默认不抽奖，跳出");
    }
  } catch (_0xf8f2fc) {
    console.log(_0xf8f2fc);
  }
}
async function _0x89cf01(_0x4fca27, _0x5170e6) {
  if ($.outFlag) {
    return;
  }
  let _0x5eef8d = "POST";
  switch (_0x4fca27) {
    case "token":
      url = "https://jdjoy.jd.com/saas/framework/user/token?appId=f3576dcf13b52805bb78cc02450ffc26&client=m&url=pengyougou.m.jd.com";
      break;
    case "lkToken":
      url = "https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=f3576dcf13b52805bb78cc02450ffc26";
      break;
    case "GetSaveByJos":
      url = "https://jd-bigmall.gamecatstudio.com/g/Save/GetSaveByJos";
      const _0x3f7bc0 = {
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
      _0x5170e6 = {
        "meta": _0x3f7bc0,
        ..._0x4691b6(),
        "encrypt": true,
        "data": {
          "code": $.code,
          "channel": "release",
          "babelChannel": null
        },
        "clientReqId": _0x1cb55c()
      };
      break;
    case "login":
      url = "https://jd-bigmall.gamecatstudio.com/s/Api/Main/Login";
      const _0x44a225 = {
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
      _0x5170e6 = {
        "meta": _0x44a225,
        ..._0x4691b6(),
        "encrypt": true,
        "data": {
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
          "device": {
            "type": "mobile"
          }
        },
        "clientReqId": _0x1cb55c()
      };
      break;
    case "GetOfflineRenevue":
      url = "https://jd-bigmall.gamecatstudio.com/g/Building/GetOfflineRenevue";
      const _0x313ed3 = {
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
      _0x5170e6 = {
        "meta": _0x313ed3,
        ..._0x4691b6(),
        "clientReqId": _0x1cb55c()
      };
      break;
    case "GetSignInReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/SignIn/GetSignInReward";
      const _0x3bc18c = {
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
      _0x5170e6 = {
        "meta": _0x3bc18c,
        ..._0x4691b6(),
        "clientReqId": _0x1cb55c()
      };
      break;
    case "GetSignTaskReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/SignIn/GetTaskReward";
      const _0x32d558 = {
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
      _0x5170e6 = {
        "meta": _0x32d558,
        ..._0x4691b6(),
        "clientReqId": _0x1cb55c()
      };
      break;
    case "GetTaskList":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetTaskList";
      const _0x8865ab = {
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
      _0x5170e6 = {
        "meta": _0x8865ab,
        ..._0x4691b6(),
        "clientReqId": _0x1cb55c()
      };
      break;
    case "GetBrowseList":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetBrowseList";
      const _0x432cfd = {
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
      _0x5170e6 = {
        "meta": _0x432cfd,
        ..._0x4691b6(),
        "clientReqId": _0x1cb55c()
      };
      break;
    case "AddStep":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/AddStep";
      const _0x289ab0 = {
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
      const _0x32fa4f = {
        "taskType": $.type,
        "entityIds": [$.iid]
      };
      _0x5170e6 = {
        "meta": _0x289ab0,
        ..._0x4691b6(),
        "encrypt": true,
        "data": _0x32fa4f,
        "clientReqId": _0x1cb55c()
      };
      break;
    case "GetReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetReward";
      const _0x28d4b1 = {
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
      const _0x585d66 = {
        "taskId": $.taskId
      };
      _0x5170e6 = {
        "meta": _0x28d4b1,
        ..._0x4691b6(),
        "encrypt": true,
        "data": _0x585d66,
        "clientReqId": _0x1cb55c()
      };
      break;
    case "Produce":
      url = "https://jd-bigmall.gamecatstudio.com/g/Building/Produce";
      const _0x457578 = {
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
      _0x5170e6 = {
        "meta": _0x457578,
        ..._0x4691b6(),
        "encrypt": true,
        "data": {},
        "clientReqId": _0x1cb55c()
      };
      break;
    case "GetFollowShopList":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetFollowShopList";
      const _0x1028d7 = {
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
      _0x5170e6 = {
        "meta": _0x1028d7,
        ..._0x4691b6(),
        "encrypt": true,
        "data": {},
        "clientReqId": _0x1cb55c()
      };
      break;
    case "GetFollowShopStatus":
      url = "https://jd-bigmall.gamecatstudio.com/g/Task/GetFollowShopStatus";
      _0x5170e6 = {
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
        ..._0x4691b6(),
        "encrypt": true,
        "data": {
          "lkToken": $.lkToken,
          "ids": [1000002483, 1000005125, 1000005205, 1000005193, 956228, 1000005174, 1000305465, 1000002626]
        },
        "clientReqId": _0x1cb55c()
      };
      break;
    case "Upgrade":
      url = "https://jd-bigmall.gamecatstudio.com/g/Building/Upgrade";
      const _0x4aef3b = {
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
      _0x5170e6 = {
        "meta": _0x4aef3b,
        ..._0x4691b6(),
        "clientReqId": _0x1cb55c()
      };
      break;
    case "RefreshOnline":
      url = "https://jd-bigmall.gamecatstudio.com/g/Save/RefreshOnline";
      const _0x48d58d = {
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
      _0x5170e6 = {
        "meta": _0x48d58d,
        ..._0x4691b6(),
        "encrypt": true,
        "data": {},
        "clientReqId": _0x1cb55c()
      };
      break;
    case "AddShowTime":
      url = "https://jd-bigmall.gamecatstudio.com/g/EasterEggTask/AddShowTime";
      const _0xde4375 = {
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
      _0x5170e6 = {
        "meta": _0xde4375,
        ..._0x4691b6(),
        "clientReqId": _0x1cb55c()
      };
      break;
    case "GetNormalReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/EasterEggTask/GetNormalReward";
      const _0x2b7cf3 = {
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
      _0x5170e6 = {
        "meta": _0x2b7cf3,
        ..._0x4691b6(),
        "clientReqId": _0x1cb55c()
      };
      break;
    case "EastReward":
      url = "https://jd-bigmall.gamecatstudio.com/g/EasterEggTask/GetTaskReward";
      const _0x122d9a = {
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
      _0x5170e6 = {
        "meta": _0x122d9a,
        ..._0x4691b6(),
        "clientReqId": _0x1cb55c()
      };
      break;
    case "Roll":
      url = "https://jd-bigmall.gamecatstudio.com/g/Lottery/Roll";
      const _0x35f857 = {
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
      _0x5170e6 = {
        "meta": _0x35f857,
        ..._0x4691b6(),
        "encrypt": true,
        "data": {},
        "clientReqId": _0x1cb55c()
      };
      break;
    default:
      console.log("错误" + _0x4fca27);
  }
  _0x5170e6 && _0x5170e6.meta && (_0x5170e6.meta = _0x54fd7d.aesEncrypt(JSON.stringify(_0x5170e6.meta), "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
  _0x5170e6 && _0x5170e6.encrypt && (_0x5170e6.data = _0x54fd7d.aesEncrypt(JSON.stringify(_0x5170e6.data), "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
  let _0x36ce9b = _0x1a25f4(url, _0x5170e6, _0x5eef8d);
  return new Promise(async _0x1db667 => {
    $.post(_0x36ce9b, (_0x429a3f, _0x5e2792, _0x44b25a) => {
      try {
        if (_0x429a3f) {
          _0x5e2792 && _0x5e2792.statusCode && _0x5e2792.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          console.log("" + $.toStr(_0x429a3f, _0x429a3f));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x44b25a = _0x27933a(_0x4fca27, _0x44b25a);
        }
      } catch (_0x321820) {
        console.log(_0x321820, _0x5e2792);
      } finally {
        _0x1db667(_0x44b25a);
      }
    });
  });
}
async function _0x27933a(_0x5cf52d, _0x3b19b3) {
  let _0x3dd2d2 = "";
  try {
    if (_0x3b19b3) {
      _0x3dd2d2 = JSON.parse(_0x3b19b3);
      if (_0x3dd2d2.data) {
        _0x3dd2d2.data = JSON.parse(_0x54fd7d.aesDecrypt(_0x3dd2d2.data, "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
      }
      if (_0x3dd2d2.extraData) {
        _0x3dd2d2.extraData = JSON.parse(_0x54fd7d.aesDecrypt(_0x3dd2d2.extraData, "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
      }
    }
  } catch (_0x13cf41) {
    console.log(_0x5cf52d + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (_0x5cf52d) {
      case "token":
        if (typeof _0x3dd2d2 == "object") {
          if (_0x3dd2d2.success) {
            if (typeof _0x3dd2d2.data != "undefined") {
              $.Token = _0x3dd2d2.data;
            }
          } else {
            _0x3dd2d2.errorMessage ? console.log("token " + _0x3dd2d2.errorMessage) : console.log(_0x3b19b3);
          }
        } else {
          console.log(_0x3b19b3);
        }
        break;
      case "login":
        if (typeof _0x3dd2d2 == "object") {
          if (_0x3dd2d2.success) {
            let _0x55896b = _0x3dd2d2.currentTime;
            $.difftime = Date.now() - _0x55896b;
            console.log($.difftime);
          } else {
            console.log(_0x3b19b3);
          }
        } else {
          console.log(_0x3b19b3);
        }
        break;
      case "GetSaveByJos":
        if (typeof _0x3dd2d2 == "object") {
          $.info = {};
          if (_0x3dd2d2.success) {
            $.info = _0x54fd7d.aesDecrypt(_0x3dd2d2.data.save, "k4ug8ayehg5a8e96", "g8err4a5g23a5e8g");
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
          } else {
            console.log("获取信息失败，跳出");
          }
        } else {
          console.log(_0x3b19b3);
        }
        break;
      case "GetOfflineRenevue":
        typeof _0x3dd2d2 == "object" ? $.offscore && ($.uv += 1, console.log("获取离线收益：", $.offscore)) : console.log(_0x3b19b3);
        break;
      case "GetTaskList":
        typeof _0x3dd2d2 == "object" ? _0x3dd2d2.success ? $.tasklist = _0x3dd2d2.data : $.log(_0x3dd2d2) : console.log(_0x3dd2d2);
        break;
      case "GetBrowseList":
        if (typeof _0x3dd2d2 == "object") {
          _0x3dd2d2.success ? ($.Skulist = _0x3dd2d2.data.browseSku, $.Shoplist = _0x3dd2d2.data.browseShop, $.Venderlist = _0x3dd2d2.data.browseVender, $.Channelist = _0x3dd2d2.data.browseChannel) : $.log(_0x3dd2d2);
        } else {
          console.log(_0x3b19b3);
        }
        break;
      case "GetFollowShopList":
        typeof _0x3dd2d2 == "object" ? _0x3dd2d2.success ? $.folowshopid = _0x3dd2d2.data[0].entityList[0].shopId : console.log(_0x3b19b3) : console.log(_0x3b19b3);
        break;
      case "GetSignInReward":
      case "GetSignTaskReward":
        $.uv += 1;
        typeof _0x3dd2d2 == "object" ? _0x3dd2d2.success ? console.log("签到完成，获得锤子 ", _0x3dd2d2.data.reward) : console.log(_0x3b19b3) : console.log(_0x3b19b3);
        break;
      case "GetReward":
      case "EastReward":
      case "GetNormalReward":
        $.uv += 1;
        if (typeof _0x3dd2d2 == "object") {
          if (_0x3dd2d2.success) {
            console.log("任务完成，获得锤子 ", _0x3dd2d2.data.reward.num || _0x3dd2d2.data.reward);
          } else {
            console.log(_0x3b19b3);
          }
        } else {
          console.log(_0x3b19b3);
        }
        break;
      case "AddStep":
      case "AddShowTime":
        $.uv += 1;
        break;
      case "Upgrade":
        if (typeof _0x3dd2d2 == "object") {
          if (_0x3dd2d2.success) {
            $.uv += 1;
            console.log("盖楼成功");
            console.log("剩余锤子：", _0x3dd2d2.extraData.dsl[0].value);
          } else {
            $.nochuzi = true;
            _0x3dd2d2.errorMessage.indexOf("enough") > -1 ? $.log("锤子不足！") : console.log(_0x3dd2d2.errorMessage);
          }
        } else {
          console.log(_0x3b19b3);
        }
        break;
      case "Produce":
        $.uv += 1;
        if (typeof _0x3dd2d2 == "object") {
          if (_0x3dd2d2.success) {
            $.offscore = "";
            _0x3dd2d2.data.isOfflineRenevue && ($.offscore = _0x3dd2d2.data.produce);
          } else {
            console.log(_0x3dd2d2);
          }
        } else {
          console.log(_0x3b19b3);
        }
        break;
      case "RefreshOnline":
        if (typeof _0x3dd2d2 == "object") {
          if (!_0x3dd2d2.success) {
            console.log(_0x3dd2d2.errorMessage);
          }
        } else {
          console.log(_0x3b19b3);
        }
        break;
      case "Roll":
        if (typeof _0x3dd2d2 == "object") {
          if (_0x3dd2d2.success) {
            $.uv += 1;
            $.log("花费 " + _0x3dd2d2.data.record.cost + " 金币，获得 " + _0x3dd2d2.data.record.num + " " + (_0x3dd2d2.data.record.rewardType ? "京豆!" : "金币!") + " ");
          } else {
            $.notimes = true;
            _0x3dd2d2.errorMessage.indexOf("enough") > -1 ? $.log("金币不足！") : console.log(_0x3dd2d2.errorMessage);
          }
        } else {
          console.log(_0x3b19b3);
        }
        break;
      case "followShop":
      case "doTask":
      case "addCart":
      case "missionInviteList":
      case "绑定":
      case "助力":
        let _0x3212e4 = "";
        if (_0x5cf52d == "followShop") {
          _0x3212e4 = "关注";
        }
        if (_0x5cf52d == "addCart") {
          _0x3212e4 = "加购";
        }
        if (_0x5cf52d == "specialSign") {
          _0x3212e4 = "签到";
        }
        if (typeof _0x3dd2d2 == "object") {
          if (_0x3dd2d2.success && _0x3dd2d2.success === true && _0x3dd2d2.data) {
            if (_0x3dd2d2.data.status && _0x3dd2d2.data.status == 200) {
              _0x3dd2d2 = _0x3dd2d2.data;
              _0x5cf52d != "setMixNick" && (_0x3dd2d2.msg || _0x3dd2d2.data.remark) && console.log((_0x3212e4 && _0x3212e4 + ":" || "") + (_0x3dd2d2.msg || _0x3dd2d2.data.isOpenCard || _0x3dd2d2.data.remark || ""));
              if (_0x5cf52d == "activity_load") {
                _0x3dd2d2.data && ($.MixNick = _0x3dd2d2.data.missionCustomer.buyerNick || "", $.hasCollectShop = _0x3dd2d2.data.missionCustomer.hasCollectShop || 0, $.totalPoint = _0x3dd2d2.data.missionCustomer.totalPoint || 0, $.remainChance = _0x3dd2d2.data.missionCustomer.remainChance || 0);
              } else {
                _0x5cf52d == "missionInviteList" && console.log("本月已邀请助力(" + _0x3dd2d2.data.total + ")");
              }
            } else {
              if (_0x3dd2d2.data.msg) {
                console.log(_0x3dd2d2.data.msg);
              } else {
                if (_0x3dd2d2.errorMessage) {
                  console.log(_0x5cf52d + " " + _0x3dd2d2.errorMessage);
                } else {
                  console.log(_0x3b19b3);
                }
              }
            }
          } else {
            _0x3dd2d2.errorMessage ? console.log(_0x5cf52d + " " + _0x3dd2d2.errorMessage) : console.log(_0x3b19b3);
          }
        } else {
          console.log(_0x3b19b3);
        }
        break;
      default:
        return _0x3dd2d2;
    }
  } catch (_0x283295) {
    console.log(_0x283295);
  }
}
function _0x1a25f4(_0x28b2be, _0x29600d, _0x49bed3 = "POST") {
  const _0x1203a7 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": _0xfe4b52,
    "User-Agent": $.UA,
    "X-Requested-With": "com.jingdong.app.mall"
  };
  _0x28b2be.indexOf("moxigame") > -1 && (_0x1203a7.Origin = "https://jddl.gamecatstudio.com", delete _0x1203a7.Cookie);
  return {
    "url": _0x28b2be,
    "method": _0x49bed3,
    "headers": _0x1203a7,
    "body": JSON.stringify(_0x29600d),
    "timeout": 30000
  };
}
function _0x195ee5(_0x34d04f) {
  _0x34d04f = _0x34d04f || 32;
  let _0x18aea9 = "abcdef0123456789",
    _0x2b8895 = _0x18aea9.length,
    _0x43950d = "";
  for (let _0x550026 = 0; _0x550026 < _0x34d04f; _0x550026++) {
    _0x43950d += _0x18aea9.charAt(Math.floor(Math.random() * _0x2b8895));
  }
  return _0x43950d;
}
function _0x2a5beb(_0x590e56, _0xb895e9) {
  var _0x1dcebb = Math.floor(Math.random() * (_0xb895e9 - _0x590e56 + 1) + _0x590e56);
  return _0x1dcebb;
}
function _0x497161(_0x4d4b6b) {
  if (typeof _0x4d4b6b == "string") {
    try {
      return JSON.parse(_0x4d4b6b);
    } catch (_0x581abd) {
      console.log(_0x581abd);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function _0x2446ba() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + _0x195ee5(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0x1cb55c() {
  function _0x13cad9() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
  }
  return _0x13cad9() + _0x13cad9() + _0x13cad9() + _0x13cad9() + _0x13cad9() + _0x13cad9() + _0x13cad9() + _0x13cad9();
}
function _0x4691b6() {
  let _0x421aab = _0x54fd7d.aesEncrypt(String(Date.now()), "a8ge9g5r8a4d1g5r", "5e8g8r6a32z1d5ge"),
    _0x333ad1 = _0x54fd7d.aesEncrypt(_0x421aab + ($.uid || "") + "2.2.2" + "release" + "jdApp", "a8ge9g5r8a4d1g5r", "5e8g8r6a32z1d5ge");
  const _0x528994 = {
    "t": _0x421aab,
    "s": _0x333ad1
  };
  return _0x528994;
}
const _0x3dfb9b = require("crypto-js");
var _0x54fd7d = function () {
  function _0x1ba115() {}
  _0x1ba115.aesEncrypt = function (_0x57a641, _0x4513af, _0x49be0a) {
    var _0x14f14d = _0x3dfb9b.enc.Utf8.parse(_0x4513af),
      _0x23de90 = _0x3dfb9b.enc.Utf8.parse(_0x49be0a);
    return _0x3dfb9b.AES.encrypt(_0x57a641, _0x14f14d, {
      "iv": _0x23de90,
      "mode": _0x3dfb9b.mode.CBC,
      "padCRng": _0x3dfb9b.pad.Pkcs7
    }).toString(_0x3dfb9b.format.Hex);
  };
  _0x1ba115.aesDecrypt = function (_0x394c5a, _0x3632ce, _0x1216bd) {
    var _0x420d62 = _0x3dfb9b.enc.Utf8.parse(_0x3632ce),
      _0x47928e = _0x3dfb9b.enc.Utf8.parse(_0x1216bd),
      _0x481987 = _0x3dfb9b.enc.Hex.parse(_0x394c5a),
      _0x204056 = _0x3dfb9b.enc.Base64.stringify(_0x481987);
    return _0x3dfb9b.AES.decrypt(_0x204056, _0x420d62, {
      "iv": _0x47928e,
      "mode": _0x3dfb9b.mode.CBC,
      "padCRng": _0x3dfb9b.pad.Pkcs7
    }).toString(_0x3dfb9b.enc.Utf8);
  };
  return _0x1ba115;
}();

async function _0x1325bd() {
  const _0x5eed0e = {
    "Referer": "https://prodev.m.jd.com/",
    "User-Agent": $.UA,
    "Cookie": _0xfe4b52
  };
  const _0x5d0757 = {
    "url": "https://open-oauth.jd.com/oauth2/to_login?app_key=904D7F385D9251D2C565B37ACCAE0D44&response_type=code&scope=snsapi_app_union_login&redirect_uri=https%3A%2F%2Fjddl.gamecatstudio.com%2Fr%2Findex.html&",
    "headers": _0x5eed0e,
    "followRedirect": false
  };
  return new Promise(async _0x41f586 => {
    $.get(_0x5d0757, async (_0x2527d4, _0x450320, _0x2519f6) => {
      try {
        _0x2527d4 ? (console.log("" + JSON.stringify(_0x2527d4)), console.log(" API请求失败，请检查网路重试")) : await _0x2df017(_0x450320.headers.location.replace("to_authorize", "authorize"));
      } catch (_0x4682b7) {
        $.logErr(_0x4682b7, _0x450320);
      } finally {
        _0x41f586(_0x2519f6);
      }
    });
  });
}
async function _0x2df017(_0x49a9d4) {
  const _0x493088 = {
    "Referer": "https://prodev.m.jd.com/",
    "User-Agent": $.UA,
    "Cookie": _0xfe4b52 + "language=zh_CN"
  };
  const _0x3af905 = {
    "url": _0x49a9d4,
    "headers": _0x493088,
    "followRedirect": false
  };
  return new Promise(async _0xa43184 => {
    $.get(_0x3af905, async (_0x55cc2e, _0x24e74a, _0x58d727) => {
      try {
        _0x55cc2e ? (console.log("" + JSON.stringify(_0x55cc2e)), console.log(" API请求失败，请检查网路重试")) : $.code = _0x24e74a.headers.location.match(/code=(.*)/)[1];
      } catch (_0x1fe34c) {
        $.logErr(_0x1fe34c, _0x24e74a);
      } finally {
        _0xa43184(_0x58d727);
      }
    });
  });
}