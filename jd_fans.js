/*
 粉丝互动
 1 0 * * * jd_fans.js
 环境变量：
 RUHUI,是否自动入会，默认不入会，设置RUHUI=1，则会自动入会
 RUNCK,执行多少CK，默认前5个，设置RUNCK=10，则脚本会运行前10个CK
* */

//活动列表
let activityList = [
  { 'id': "10c1e44c87fe4a2ab7c6b8af0e912962", 'endTime': 1680796799000 },
  { 'id': "0a1e21d27165458fa034922e71ee6efe", 'endTime': 1682870399000 },
  { 'id': "304a300b232643a2926d86a3ad1db61f", 'endTime': 1681228799000 },
  { 'id': "0eeb28db4b8a42b2a3bcf10878ffd22d", 'endTime': 1683043199000 },
];
const Env=require('./utils/Env.js');
const $ = new Env('粉丝互动');
const _0x53641a = function () {
  let _0x385b5a = true;
  return function (_0x2e1985, _0xed2a24) {
    const _0x1d87bc = _0x385b5a ? function () {
      if (_0xed2a24) {
        const _0x22bb45 = _0xed2a24.apply(_0x2e1985, arguments);
        return _0xed2a24 = null, _0x22bb45;
      }
    } : function () {};
    return _0x385b5a = false, _0x1d87bc;
  };
}(),
_0x37964a = _0x53641a(this, function () {
  return _0x37964a.toString().search("(((.+)+)+)+$").toString().constructor(_0x37964a).search("(((.+)+)+)+$");
});
_0x37964a();
const _0x401039 = $.isNode() ? require("./sendNotify") : "",
_0x1a4404 = $.isNode() ? require("./jdCookie.js") : "",
_0x53ba35 = $.isNode() ? process.env.RUHUI ? process.env.RUHUI : 0 : 0,
_0x591df0 = $.isNode() ? process.env.RUNCK ? process.env.RUNCK : 5 : 5;
let _0x288969 = [],
_0x2f8749 = "";
if ($.isNode()) {
Object.keys(_0x1a4404).forEach(_0xf545a9 => {
  _0x288969.push(_0x1a4404[_0xf545a9]);
});
if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x288969 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x3d17f3 => _0x3d17f3.cookie)].filter(_0x5b3d16 => !!_0x5b3d16);
$.CryptoJS = require("crypto-js");
!(async () => {
$.appId = "8adfb";
$.fingerprint = _0x4841c9();
$.tokenTk = "";
$.ua = _0x1141e5();
await _0x3c203a();
activityList = _0x1ca698(activityList, activityList.length);
$.helpFalg = true;
$.helpFalg && _0x5c8712();
$.cookiesArr = _0x288969;
for (let _0x5225af = 0; _0x5225af < _0x591df0; _0x5225af++) {
  $.cookie = $.cookiesArr[_0x5225af];
  if ($.cookie) {
    $.UserName = decodeURIComponent($.cookie.match(/pt_pin=(.+?);/) && $.cookie.match(/pt_pin=(.+?);/)[1]);
    $.index = _0x5225af + 1;
    console.log("\n********开始【京东账号" + $.index + "】" + $.UserName + "********\n");
    $.UA = _0x1141e5();
    $.token = "";
    $.token = await _0x3b2420();
    if (!$.token) {
      console.log("获取token失败");
      return;
    }
    for (let _0x418e7b = 0; _0x418e7b < activityList.length; _0x418e7b++) {
      let _0x478d25 = activityList[_0x418e7b].id,
        _0x1e59e9 = Date.now();
      if (_0x1e59e9 < activityList[_0x418e7b].endTime) {
        let _0x58c783 = "https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/" + _0x478d25 + "?activityId=" + _0x478d25;
        console.log("\n活动链接" + (_0x418e7b + 1) + "：" + _0x58c783);
        $.thisActivityUrl = _0x58c783;
        $.activityId = _0x1c3d7c($.thisActivityUrl, "activityId");
        $.host = "lzkjdz-isv.isvjcloud.com";
        try {
          await _0x3b24b6($);
        } catch (_0x28de5f) {}
        await $.wait(3000);
      } else console.log("\n活动ID：" + _0x478d25 + ",已过期");
    }
  }
}
_0x2f8749 && (await _0x401039.sendNotify("粉丝互动ID：" + $.activityId, _0x2f8749));
})().catch(_0x28f070 => {
$.log("", "❌ " + $.name + ", 失败! 原因: " + _0x28f070 + "!", "");
}).finally(() => {
$.done();
});
async function _0x3b24b6(_0x53354c) {
_0x53354c.LZ_TOKEN_KEY = "";
_0x53354c.LZ_TOKEN_VALUE = "";
_0x53354c.lz_jdpin_token = "";
_0x53354c.pin = "";
_0x53354c.nickname = "";
_0x53354c.venderId = "";
_0x53354c.activityType = "";
_0x53354c.LZ_AES_PIN = "";
_0x53354c.attrTouXiang = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
await _0x4643c6(_0x53354c);
if (!_0x53354c.LZ_TOKEN_KEY || !_0x53354c.LZ_TOKEN_VALUE) {
  console.log("初始化失败1");
  return;
}
let _0x31646e = await _0x1cb211(_0x53354c, "customer/getSimpleActInfoVo");
_0x53354c.venderId = _0x31646e.data.venderId || "";
_0x53354c.activityType = _0x31646e.data.activityType || "";
console.log("venderId:" + _0x53354c.venderId);
let _0x50df6c = await _0x1cb211(_0x53354c, "customer/getMyPing");
_0x53354c.pin = _0x50df6c.data.secretPin;
_0x53354c.nickname = _0x50df6c.data.nickname;
if (!_0x53354c.pin) {
  console.log("获取pin失败,该账号可能是黑号");
  return;
}
await _0x1cb211(_0x53354c, "common/accessLogWithAD");
let _0x10bed0 = await _0x1cb211(_0x53354c, "wxActionCommon/getUserInfo"),
  _0x5d7917 = await _0x1cb211(_0x53354c, "wxActionCommon/getShopInfoVO"),
  _0x52581d = await _0x1cb211(_0x53354c, "wxCommonInfo/getActMemberInfo");
_0x10bed0 && _0x10bed0.data && _0x10bed0.data.yunMidImageUrl && (_0x53354c.attrTouXiang = _0x10bed0.data.yunMidImageUrl);
let _0x93590 = await _0x1cb211(_0x53354c, "wxFansInterActionActivity/activityContent");
_0x53354c.activityData = _0x93590.data || {};
_0x53354c.actinfo = _0x53354c.activityData.actInfo;
_0x53354c.actorInfo = _0x53354c.activityData.actorInfo;
_0x53354c.nowUseValue = Number(_0x53354c.actorInfo.fansLoveValue) + Number(_0x53354c.actorInfo.energyValue);
if (JSON.stringify(_0x53354c.activityData) === "{}") {
  console.log("获取活动信息失败");
  return;
}
console.log(_0x53354c.actinfo.actName + "," + _0x5d7917.data.shopName);
console.log("当前积分：" + _0x53354c.nowUseValue);
console.log("活动结束时间：" + _0x1f13e8(_0x53354c.activityData.actInfo.endTime));
let _0x56bc1e = [],
  _0x3e9704 = ["One", "Two", "Three"];
for (let _0x2c262d = 0; _0x2c262d < _0x3e9704.length; _0x2c262d++) {
  let _0x678147 = _0x53354c.activityData.actInfo["giftLevel" + _0x3e9704[_0x2c262d]] || "";
  _0x678147 && (_0x678147 = JSON.parse(_0x678147), _0x56bc1e.push(_0x678147[0].name));
}
console.log("奖品列表：" + _0x56bc1e.toString());
if (_0x53354c.actorInfo.prizeOneStatus && _0x53354c.actorInfo.prizeTwoStatus && _0x53354c.actorInfo.prizeThreeStatus) {
  console.log("已完成抽奖");
  return;
}
if (_0x52581d.data.actMemberStatus === 1 && !_0x52581d.data.openCard) {
  console.log("活动需要入会后才能参与，如需自动入会请设置变量RUHUI=1");
  if (Number(_0x53ba35) === 1) {
    console.log("去入会");
    let _0x4861e6 = await _0x3ddf41(_0x53354c.venderId);
    if (!_0x4861e6.includes("成功")) return;
    _0x93590 = await _0x1cb211(_0x53354c, "wxFansInterActionActivity/activityContent");
    _0x53354c.activityData = _0x93590.data || {};
    await _0x53354c.wait(3000);
  } else {
    console.log("不执行入会，跳出");
    return;
  }
} else {
  if (_0x52581d.data.openCard) {}
}
if (_0x53354c.activityData.actorInfo && !_0x53354c.activityData.actorInfo.follow) {
  console.log("去关注店铺");
  _0x53354c.body = "activityId=" + _0x53354c.activityId + "&uuid=" + _0x53354c.activityData.actorInfo.uuid;
  let _0x1a5f36 = await _0x1cb211(_0x53354c, "wxFansInterActionActivity/followShop", _0x53354c.body);
  console.log(JSON.stringify(_0x1a5f36));
  await _0x53354c.wait(3000);
}
_0x53354c.upFlag = false;
await _0x45e848(_0x53354c);
await _0x1e32a3(_0x53354c);
}
async function _0x1e32a3(_0x29b2b2) {
_0x29b2b2.upFlag && (activityData = await _0x1cb211(_0x29b2b2, "wxFansInterActionActivity/activityContent"), _0x29b2b2.activityData = activityData.data || {}, await _0x29b2b2.wait(3000));
let _0xbceed0 = Number(_0x29b2b2.activityData.actorInfo.fansLoveValue) + Number(_0x29b2b2.activityData.actorInfo.energyValue),
  _0x594947 = ["One", "Two", "Three"],
  _0x5ddc1b = {
    "One": "01",
    "Two": "02",
    "Three": "03"
  };
for (let _0x1aa5c6 = 0; _0x1aa5c6 < _0x594947.length; _0x1aa5c6++) {
  if (_0xbceed0 >= _0x29b2b2.activityData.actConfig["prizeScore" + _0x594947[_0x1aa5c6]] && _0x29b2b2.activityData.actorInfo["prize" + _0x594947[_0x1aa5c6] + "Status"] === false) {
    console.log("\n开始第" + Number(_0x5ddc1b[_0x594947[_0x1aa5c6]]) + "次抽奖");
    _0x29b2b2.body = "activityId=" + _0x29b2b2.activityId + "&uuid=" + _0x29b2b2.activityData.actorInfo.uuid + "&drawType=" + _0x5ddc1b[_0x594947[_0x1aa5c6]];
    let _0x1d8edf = await _0x1cb211(_0x29b2b2, "wxFansInterActionActivity/startDraw", _0x29b2b2.body);
    if (_0x1d8edf.result && _0x1d8edf.count === 0) {
      let _0x4714ba = _0x1d8edf.data;
      !_0x4714ba.drawOk ? console.log("抽奖获得:空气") : (console.log("抽奖获得:" + _0x4714ba.name), _0x2f8749 += _0x29b2b2.UserName + ",获得：" + (_0x4714ba.name || "未知") + "\n");
    } else console.log("抽奖异常");
    console.log(JSON.stringify(_0x1d8edf));
    await _0x29b2b2.wait(3000);
  }
}
}
async function _0x45e848(_0x3312de) {
let _0x2472ac = 0;
if (_0x3312de.activityData.task2BrowGoods) {
  if (_0x3312de.activityData.task2BrowGoods.finishedCount !== _0x3312de.activityData.task2BrowGoods.upLimit) {
    _0x2472ac = Number(_0x3312de.activityData.task2BrowGoods.upLimit) - Number(_0x3312de.activityData.task2BrowGoods.finishedCount);
    console.log("开始做浏览商品任务");
    _0x3312de.upFlag = true;
    for (let _0x5f4318 = 0; _0x5f4318 < _0x3312de.activityData.task2BrowGoods.taskGoodList.length && _0x2472ac > 0; _0x5f4318++) {
      _0x3312de.oneGoodInfo = _0x3312de.activityData.task2BrowGoods.taskGoodList[_0x5f4318];
      if (_0x3312de.oneGoodInfo.finished === false) {
        console.log("浏览:" + (_0x3312de.oneGoodInfo.skuName || ""));
        _0x3312de.body = "activityId=" + _0x3312de.activityId + "&uuid=" + _0x3312de.activityData.actorInfo.uuid + "&skuId=" + _0x3312de.oneGoodInfo.skuId;
        let _0x50c6c2 = await _0x1cb211(_0x3312de, "wxFansInterActionActivity/doBrowGoodsTask", _0x3312de.body);
        console.log(JSON.stringify(_0x50c6c2));
        await _0x3312de.wait(3000);
        _0x2472ac--;
      }
    }
  } else {
    console.log("浏览商品任务已完成");
  }
}
if (_0x3312de.activityData.task6GetCoupon) {
  if (_0x3312de.activityData.task6GetCoupon.finishedCount !== _0x3312de.activityData.task6GetCoupon.upLimit) {
    _0x2472ac = Number(_0x3312de.activityData.task6GetCoupon.upLimit) - Number(_0x3312de.activityData.task6GetCoupon.finishedCount);
    console.log("开始做领取优惠券");
    _0x3312de.upFlag = true;
    for (let _0x571dde = 0; _0x571dde < _0x3312de.activityData.task6GetCoupon.taskCouponInfoList.length && _0x2472ac > 0; _0x571dde++) {
      _0x3312de.oneCouponInfo = _0x3312de.activityData.task6GetCoupon.taskCouponInfoList[_0x571dde];
      if (_0x3312de.oneCouponInfo.finished === false) {
        _0x3312de.body = "activityId=" + _0x3312de.activityId + "&uuid=" + _0x3312de.activityData.actorInfo.uuid + "&couponId=" + _0x3312de.oneCouponInfo.couponInfo.couponId;
        let _0x20acfb = await _0x1cb211(_0x3312de, "wxFansInterActionActivity/doGetCouponTask", _0x3312de.body);
        console.log(JSON.stringify(_0x20acfb));
        await _0x3312de.wait(3000);
        _0x2472ac--;
      }
    }
  } else console.log("领取优惠券已完成");
}
_0x3312de.body = "activityId=" + _0x3312de.activityId + "&uuid=" + _0x3312de.activityData.actorInfo.uuid;
if (_0x3312de.activityData.task1Sign && _0x3312de.activityData.task1Sign.finishedCount === 0) {
  console.log("执行每日签到");
  let _0x49b533 = await _0x1cb211(_0x3312de, "wxFansInterActionActivity/doSign", _0x3312de.body);
  console.log(JSON.stringify(_0x49b533));
  await _0x3312de.wait(3000);
  _0x3312de.upFlag = true;
} else console.log("已签到");
if (_0x3312de.activityData.task4Share) {
  if (_0x3312de.activityData.task4Share.finishedCount !== _0x3312de.activityData.task4Share.upLimit) {
    _0x2472ac = Number(_0x3312de.activityData.task4Share.upLimit) - Number(_0x3312de.activityData.task4Share.finishedCount);
    console.log("开始做分享任务");
    _0x3312de.upFlag = true;
    for (let _0x2f1ce7 = 0; _0x2f1ce7 < _0x2472ac; _0x2f1ce7++) {
      console.log("执行第" + (_0x2f1ce7 + 1) + "次分享");
      let _0xb76721 = await _0x1cb211(_0x3312de, "wxFansInterActionActivity/doShareTask", _0x3312de.body);
      console.log(JSON.stringify(_0xb76721));
      await _0x3312de.wait(3000);
    }
  } else console.log("分享任务已完成");
}
if (_0x3312de.activityData.task5Remind) {
  if (_0x3312de.activityData.task5Remind.finishedCount !== _0x3312de.activityData.task5Remind.upLimit) {
    console.log("执行设置活动提醒");
    _0x3312de.upFlag = true;
    let _0x3d5615 = await _0x1cb211(_0x3312de, "wxFansInterActionActivity/doRemindTask", _0x3312de.body);
    console.log(JSON.stringify(_0x3d5615));
    await _0x3312de.wait(3000);
  } else {
    console.log("设置活动提醒已完成");
  }
}
if (_0x3312de.activityData.task7MeetPlaceVo) {
  if (_0x3312de.activityData.task7MeetPlaceVo.finishedCount !== _0x3312de.activityData.task7MeetPlaceVo.upLimit) {
    console.log("执行逛会场");
    _0x3312de.upFlag = true;
    let _0x10199d = await _0x1cb211(_0x3312de, "wxFansInterActionActivity/doMeetingTask", _0x3312de.body);
    console.log(JSON.stringify(_0x10199d));
    await _0x3312de.wait(3000);
  } else console.log("逛会场已完成");
}
}
function _0x1c3d7c(_0x27e2b8, _0x1e6067) {
if (typeof URL !== "undefined") {
  let _0x2a336a = new URL(_0x27e2b8),
    _0x2fef96 = _0x2a336a.searchParams.get(_0x1e6067);
  return _0x2fef96 ? _0x2fef96 : "";
} else {
  const _0x88749c = _0x27e2b8.match(/\?.*/)[0].substring(1),
    _0x656845 = _0x88749c.split("&");
  for (let _0x5bfa5e = 0; _0x5bfa5e < _0x656845.length; _0x5bfa5e++) {
    const _0x253416 = _0x656845[_0x5bfa5e].split("=");
    if (_0x253416[0] === _0x1e6067) return _0x656845[_0x5bfa5e].substr(_0x656845[_0x5bfa5e].indexOf("=") + 1);
  }
  return "";
}
}
async function _0x3b2420() {
for (let _0x919e4 = 0; _0x919e4 < 3; _0x919e4++) {
  var _0xfa25e4 = await _0x4b10f0("isvObfuscator", {
    "id": "",
    "url": "https://lzkjdz-isv.isvjcloud.com"
  });
  if (_0xfa25e4) break;
  await $.wait(5000);
}
let _0x38e4b1 = {
  "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
  "body": _0xfa25e4,
  "headers": {
    "Host": "api.m.jd.com",
    "accept": "*/*",
    "user-agent": "JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)",
    "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
    "content-type": "application/x-www-form-urlencoded",
    "Cookie": $.cookie
  }
};
return new Promise(_0x1f254c => {
  $.post(_0x38e4b1, async (_0x4b8507, _0x34c886, _0x355588) => {
    try {
      if (_0x4b8507) {
        console.log("" + JSON.stringify(_0x4b8507));
        console.log($.name + " API请求失败，请检查网路重试");
      } else _0x355588 = JSON.parse(_0x355588);
    } catch (_0x132413) {
      $.logErr(_0x132413, _0x34c886);
    } finally {
      _0x1f254c(_0x355588.token || "");
    }
  });
});
}
async function _0x4643c6(_0x21d445) {
let _0x283120 = {
  "url": _0x21d445.thisActivityUrl,
  "headers": {
    "Host": _0x21d445.host,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Cookie": "IsvToken=" + _0x21d445.token + ";" + _0x21d445.cookie,
    "User-Agent": _0x21d445.UA,
    "Accept-Language": "zh-cn",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive"
  }
};
return new Promise(_0x52d9da => {
  _0x21d445.get(_0x283120, (_0x2e1007, _0x2a0f07, _0x586ea9) => {
    try {
      _0x1f6605(_0x21d445, _0x2a0f07);
    } catch (_0x16ecc2) {
      _0x21d445.logErr(_0x16ecc2, _0x2a0f07);
    } finally {
      _0x52d9da(_0x586ea9);
    }
  });
});
}
function _0x1f6605(_0x1f7b74, _0x343cd5) {
if (_0x343cd5 === undefined) {
  return;
}
let _0x16b769 = _0x343cd5.headers["set-cookie"] || _0x343cd5.headers["Set-Cookie"] || "";
if (_0x16b769) {
  let _0x2cdbe4 = _0x16b769.filter(_0x3d96c3 => _0x3d96c3.indexOf("lz_jdpin_token") !== -1)[0];
  _0x2cdbe4 && _0x2cdbe4.indexOf("lz_jdpin_token=") > -1 && (_0x1f7b74.lz_jdpin_token = _0x2cdbe4.split(";") && _0x2cdbe4.split(";")[0] + ";" || "");
  let _0x45c7e3 = _0x16b769.filter(_0x2bad8a => _0x2bad8a.indexOf("LZ_TOKEN_KEY") !== -1)[0];
  if (_0x45c7e3 && _0x45c7e3.indexOf("LZ_TOKEN_KEY=") > -1) {
    let _0x1a00c6 = _0x45c7e3.split(";") && _0x45c7e3.split(";")[0] || "";
    _0x1f7b74.LZ_TOKEN_KEY = _0x1a00c6.replace("LZ_TOKEN_KEY=", "");
  }
  let _0x1ceb1a = _0x16b769.filter(_0x15bf4b => _0x15bf4b.indexOf("LZ_TOKEN_VALUE") !== -1)[0];
  if (_0x1ceb1a && _0x1ceb1a.indexOf("LZ_TOKEN_VALUE=") > -1) {
    let _0x2418e4 = _0x1ceb1a.split(";") && _0x1ceb1a.split(";")[0] || "";
    _0x1f7b74.LZ_TOKEN_VALUE = _0x2418e4.replace("LZ_TOKEN_VALUE=", "");
  }
  let _0x59bdc9 = _0x16b769.filter(_0x5960e5 => _0x5960e5.indexOf("LZ_AES_PIN") !== -1)[0];
  if (_0x59bdc9 && _0x59bdc9.indexOf("LZ_AES_PIN=") > -1) {
    let _0x4eedba = _0x59bdc9.split(";") && _0x59bdc9.split(";")[0] || "";
    _0x1f7b74.LZ_AES_PIN = _0x4eedba.replace("LZ_AES_PIN=", "");
  }
}
}
async function _0x1cb211(_0x62ce28, _0x252088, _0x451509 = "activityId=" + _0x62ce28.activityId + "&pin=" + encodeURIComponent(_0x62ce28.pin)) {
let _0x56a4ae = "https://" + _0x62ce28.host + "/" + _0x252088;
switch (_0x252088) {
  case "customer/getSimpleActInfoVo":
  case "dz/common/getSimpleActInfoVo":
  case "wxCommonInfo/initActInfo":
  case "wxCollectionActivity/shopInfo":
  case "wxCollectCard/shopInfo":
  case "wxCollectCard/drawContent":
    _0x451509 = "activityId=" + _0x62ce28.activityId;
    break;
  case "customer/getMyPing":
    _0x451509 = "userId=" + _0x62ce28.venderId + "&token=" + encodeURIComponent(_0x62ce28.token) + "&fromType=APP";
    break;
  case "common/accessLogWithAD":
  case "common/accessLog":
    _0x451509 = "venderId=" + _0x62ce28.venderId + "&code=" + _0x62ce28.activityType + "&pin=" + encodeURIComponent(_0x62ce28.pin) + "&activityId=" + _0x62ce28.activityId + "&pageUrl=" + encodeURIComponent(_0x62ce28.thisActivityUrl) + "&subType=app&adSource=null";
    break;
  case "wxActionCommon/getUserInfo":
    _0x451509 = "pin=" + encodeURIComponent(_0x62ce28.pin);
    break;
  case "wxCommonInfo/getActMemberInfo":
    _0x451509 = "venderId=" + _0x62ce28.venderId + "&activityId=" + _0x62ce28.activityId + "&pin=" + encodeURIComponent(_0x62ce28.pin);
    break;
  case "wxActionCommon/getShopInfoVO":
    _0x451509 = "userId=" + _0x62ce28.venderId;
    break;
  case "2222":
    _0x451509 = "222";
    break;
}
const _0x17e958 = {
  "X-Requested-With": "XMLHttpRequest",
  "Connection": "keep-alive",
  "Accept-Encoding": "gzip, deflate, br",
  "Content-Type": "application/x-www-form-urlencoded",
  "Origin": "https://" + _0x62ce28.host,
  "User-Agent": _0x62ce28.UA,
  "Cookie": _0x62ce28.cookie + " LZ_TOKEN_KEY=" + _0x62ce28.LZ_TOKEN_KEY + "; LZ_TOKEN_VALUE=" + _0x62ce28.LZ_TOKEN_VALUE + "; LZ_AES_PIN = " + _0x62ce28.LZ_AES_PIN + ";AUTH_C_USER=" + _0x62ce28.pin + "; " + _0x62ce28.lz_jdpin_token,
  "Host": _0x62ce28.host,
  "Referer": _0x62ce28.thisActivityUrl,
  "Accept-Language": "zh-cn",
  "Accept": "application/json"
};
let _0x42982e = {
  "url": _0x56a4ae,
  "method": "POST",
  "headers": _0x17e958,
  "body": _0x451509
};
return new Promise(async _0x16c944 => {
  _0x62ce28.post(_0x42982e, (_0x373d42, _0x12993d, _0x29c9ac) => {
    try {
      _0x1f6605(_0x62ce28, _0x12993d);
      _0x29c9ac && (_0x29c9ac = JSON.parse(_0x29c9ac));
    } catch (_0x40d878) {
      console.log(_0x29c9ac);
      _0x62ce28.logErr(_0x40d878, _0x12993d);
    } finally {
      _0x16c944(_0x29c9ac);
    }
  });
});
}
function _0x3ddf41(_0x20bb98) {
const _0x4865ea = {
  "url": "https://api.m.jd.com/?appid=jd_shop_member&functionId=bindWithVender&body=" + JSON.stringify({
    "venderId": _0x20bb98,
    "shopId": _0x20bb98,
    "bindByVerifyCodeFlag": 1
  }),
  "headers": {
    "Cookie": $.cookie,
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
    "Referer": "https://shopmember.m.jd.com/"
  }
};
return new Promise(_0x2b4c1f => {
  $.post(_0x4865ea, (_0x7838d, _0x2ada05, _0x5b1912) => {
    try {
      if (_0x7838d) {
        $.logErr(_0x7838d);
      } else {
        if (_0x5b1912) {
          _0x5b1912 = JSON.parse(_0x5b1912);
          if (_0x5b1912.busiCode == "0") {
            $.log(_0x5b1912.message);
            if (_0x5b1912.result && _0x5b1912.result.giftInfo) for (let _0x503f4f of lIIII1il.result.giftInfo.giftList) {
              console.log(" >> 入会获得：" + _0x503f4f.discountString + _0x503f4f.prizeName + _0x503f4f.secondLineDesc);
            }
          } else {
            $.log(_0x5b1912.message);
          }
        } else $.log("京东返回了空数据");
      }
    } catch (_0x32298e) {
      $.logErr(_0x32298e);
    } finally {
      _0x2b4c1f(_0x5b1912.message);
    }
  });
});
}
function _0x1ca698(_0x29c366, _0xe8efeb) {
var _0x3a1377 = _0x29c366.slice(0),
  _0x5ab336 = _0x29c366.length,
  _0x495738 = _0x5ab336 - _0xe8efeb,
  _0x437e2d,
  _0x11c218;
while (_0x5ab336-- > _0x495738) {
  _0x11c218 = Math.floor((_0x5ab336 + 1) * Math.random());
  _0x437e2d = _0x3a1377[_0x11c218];
  _0x3a1377[_0x11c218] = _0x3a1377[_0x5ab336];
  _0x3a1377[_0x5ab336] = _0x437e2d;
}
return _0x3a1377.slice(_0x495738);
}
async function _0x5c8712() {
for (let _0x4ef99d = 0; _0x4ef99d < _0x288969.length; _0x4ef99d++) {
  let _0x4c9e75 = ["pVbNk9xIuI02DeRtwUiztA==", "s4UuZYFN6GW3jbg4x9Z8LA==", "0ujO2SLTWgIyUOzBhHBF+w==", "4y1yGPA4HCaFNCw8BZ6gsw=="],
    _0xd3e230 = _0x1ca698(_0x4c9e75, 1)[0];
  await _0x51e035(_0x288969[_0x4ef99d], _0xd3e230);
  await _0x533e64(_0x288969[_0x4ef99d], _0xd3e230);
  await $.wait(100);
}
}
function _0x4b10f0(_0x3546c3, _0x25ae44) {
var _0x2d06e4 = "";
let _0x1568a2 = {
  "body": JSON.stringify(_0x25ae44),
  "fn": _0x3546c3
};
return new Promise(_0x2cad9c => {
  let _0x7e48f8 = {
    "url": "https://api.nolanstore.top/sign",
    "body": JSON.stringify(_0x1568a2),
    "headers": {
      "Content-Type": "application/json"
    },
    "timeout": 30000
  };
  $.post(_0x7e48f8, async (_0x4b8879, _0x3211b7, _0x3c120e) => {
    try {
      _0x3c120e ? (console.log("连接服务成功"), _0x3c120e = JSON.parse(_0x3c120e), _0x2d06e4 = _0x3c120e.body) : console.log("连接服务失败，重试。。。");
    } catch (_0x4cb4b5) {
      $.logErr(_0x4cb4b5, _0x3211b7);
    } finally {
      _0x2cad9c(_0x2d06e4);
    }
  });
});
}
function _0x1f13e8(_0xd395f0) {
let _0x446f48 = new Date(_0xd395f0),
  _0x422950 = _0x446f48.getFullYear(),
  _0x42ee82 = _0x446f48.getMonth() + 1,
  _0x3c7c9f = _0x446f48.getDate();
return _0x422950 + "-" + (_0x42ee82 < 10 ? "0" + _0x42ee82 : _0x42ee82) + "-" + (_0x3c7c9f < 10 ? "0" + _0x3c7c9f : _0x3c7c9f) + " " + _0x446f48.toTimeString().substr(0, 8);
}
async function _0x51e035(_0x1020af, _0x5d7c97) {
let _0x90cc22 = {
  "url": "https://api.m.jd.com/",
  "body": "functionId=TaskInviteServiceNew&body=" + JSON.stringify({
    "method": "participateInviteTask",
    "data": {
      "channel": "1",
      "encryptionInviterPin": encodeURIComponent(_0x5d7c97),
      "type": 1
    }
  }) + "&appid=jx_h5&uuid=&_t=" + Date.now(),
  "headers": {
    "Host": "api.m.jd.com",
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://assignment.jd.com",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "User-Agent": $.isNode() ? process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : require("./JS_USER_AGENTS").USER_AGENT : $.getdata("JSUA") ? $.getdata("JSUA") : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "Referer": "https://assignment.jd.com/",
    "Accept-Encoding": "gzip, deflate, br",
    "Cookie": _0x1020af
  }
};
$.post(_0x90cc22, (_0x160701, _0x49c4ed, _0x134f5c) => {});
}
async function _0x533e64(_0x5ca506, _0x572a1b) {
let _0x1b9c3a = Date.now(),
  _0x5a4676 = {
    "Host": "api.m.jd.com",
    "accept": "application/json, text/plain, */*",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://assignment.jd.com",
    "accept-language": "zh-cn",
    "user-agent": $.isNode() ? process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : require("./JS_USER_AGENTS").USER_AGENT : $.getdata("JSUA") ? $.getdata("JSUA") : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "referer": "https://assignment.jd.com/?inviterId=" + encodeURIComponent(_0x572a1b),
    "Cookie": _0x5ca506
  },
  _0x306ac2 = "functionId=TaskInviteServiceNew&body={\"method\":\"participateInviteTask\",\"data\":{\"channel\":\"1\",\"encryptionInviterPin\":\"" + encodeURIComponent(_0x572a1b) + "\",\"type\":1}}&appid=jx_h5&uuid=&_t=" + _0x1b9c3a;
var _0x5a2b75 = {
  "url": "https://api.m.jd.com/",
  "headers": _0x5a4676,
  "body": _0x306ac2
};
$.post(_0x5a2b75, (_0x306c31, _0xcf2d46, _0x48bf25) => {});
}
function _0x1141e5() {
$.UUID = _0x357be3(40);
const _0x43a742 = {
  "167814": "10.1.4",
  "167841": "10.1.6"
};
$.osVersion = _0x144790(12, 14) + "." + _0x144790(0, 6);
let _0x249484 = "network/" + ["4g", "5g", "wifi"][_0x144790(0, 2)];
return $.mobile = "iPhone" + _0x144790(9, 13) + "," + _0x144790(1, 3), $.build = ["167814", "167841", "167894"][_0x144790(0, 1)], $.appVersion = _0x43a742[$.build], "jdapp;iPhone;" + $.appVersion + ";" + $.osVersion + ";" + $.UUID + ";" + _0x249484 + ";model/" + $.mobile + ";addressid/" + _0x144790(1000000000) + ";appBuild/" + $.build + ";jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + $.osVersion.replace(/\./g, "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0x357be3(_0x981ab4, _0xa4f070 = 0) {
var _0x4ddc2e = "",
  _0x12aea6 = _0x981ab4;
_0xa4f070 && (_0x12aea6 = Math.floor(Math.random() * _0xa4f070 - _0x981ab4 + 1 + _0x981ab4));
for (let _0x4a9fb8 = 0; _0x4a9fb8 < _0x12aea6;) {
  let _0x2f3270 = Math.random().toString(16).substring(2);
  _0x12aea6 - _0x4a9fb8 > _0x2f3270.length ? (_0x4ddc2e += _0x2f3270, _0x4a9fb8 += _0x2f3270.length) : (_0x4ddc2e += _0x2f3270.slice(_0x4a9fb8 - _0x12aea6), _0x4a9fb8 += _0x2f3270.length);
}
return _0x4ddc2e;
}
function _0x144790(_0x2e2fd7, _0x3d3a23) {
if (arguments.length === 0) return Math.random();
if (!_0x3d3a23) _0x3d3a23 = 10 ** Math.log(_0x2e2fd7) * Math.LOG10E + 1 | 0 - 1;
return Math.floor(Math.random() * _0x3d3a23 - _0x2e2fd7 + 1 + _0x2e2fd7);
}
function _0x4841c9() {
const _0x59b3c8 = "0123456789",
  _0x59ad42 = 3,
  _0x4edca1 = Math.random() * 10 | 0,
  _0x3630b6 = 16;
let _0x50e3ac = "",
  _0x5ace16 = "";
return !((_0x2bdf1b, _0x163d44) => {
  let _0xdc11b0 = _0x163d44.split(""),
    _0x2d8dab = [];
  for (let _0x3394d6 = 0; _0x3394d6 < _0x2bdf1b; _0x3394d6++) {
    let _0x3b84f5 = Math.random() * _0xdc11b0.length - 1 | 0;
    _0x2d8dab.push(_0xdc11b0[_0x3b84f5]);
    _0xdc11b0.splice(_0x3b84f5, 1);
  }
  _0x50e3ac = _0x2d8dab.join("");
  _0x5ace16 = _0xdc11b0.join("");
})(_0x59ad42, _0x59b3c8), ((_0x100f4a, _0x4035fc) => {
  let _0x177887 = _0x100f4a,
    _0x5c8de0 = _0x3630b6 - _0x59ad42 - _0x100f4a.toString().length - _0x100f4a,
    _0x4cd841 = "";
  while (_0x177887--) _0x4cd841 += _0x4035fc[Math.random() * _0x4035fc.length | 0];
  _0x4cd841 += _0x50e3ac;
  while (_0x5c8de0--) _0x4cd841 += _0x4035fc[Math.random() * _0x4035fc.length | 0];
  return _0x4cd841 += _0x100f4a, _0x4cd841;
})(_0x4edca1, _0x5ace16);
}
async function _0x3c203a() {
const _0x40b048 = {
  "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
  "headers": {
    "Authority": "cactus.jd.com",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
    "Accept": "application/json",
    "User-Agent": $.ua,
    "Content-Type": "application/json",
    "Origin": "https://st.jingxi.com",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://st.jingxi.com/",
    "Accept-Language": "zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7"
  },
  "body": JSON.stringify({
    "version": "3.0",
    "fp": $.fingerprint,
    "appId": $.appId,
    "timestamp": Date.now(),
    "platform": "web",
    "expandParams": ""
  })
};
return new Promise(async _0x3409f5 => {
  $.post(_0x40b048, (_0x46b411, _0x1b563a, _0x4d5840) => {
    try {
      if (_0x46b411) {
        console.log("" + JSON.stringify(_0x46b411));
        console.log("request_algo 签名参数API请求失败，请检查网路重试");
      } else {
        if (_0x4d5840) {
          _0x4d5840 = JSON.parse(_0x4d5840);
          if (_0x4d5840.status === 200) {
            $.tokenTk = _0x4d5840.data.result.tk;
            let _0xb952d4 = _0x4d5840.data.result.algo;
            if (_0xb952d4) $.enCryptMethodJD = new Function("return " + _0xb952d4)();
          } else console.log("request_algo 签名参数API请求失败:");
        } else console.log("京东服务器返回空数据");
      }
    } catch (_0x1ea16e) {
      $.logErr(_0x1ea16e, _0x1b563a);
    } finally {
      _0x3409f5();
    }
  });
});
}
async function _0x5375ad(_0x9a48ba, _0x11c3da) {
const _0x17e067 = $.CryptoJS.SHA256(_0x11c3da).toString($.CryptoJS.enc.Hex);
let _0xe3afb = "jsonp_" + Date.now() + "_52022",
  _0x32f630 = "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=" + _0x9a48ba + "&body=" + _0x17e067 + "&clientVersion=9.2.0&client=H5&uuid=88888&jsonp=" + _0xe3afb;
const _0x2965f6 = "appid,body,client,clientVersion,functionId,jsonp",
  _0x4cd535 = Date.now(),
  _0x3b5afc = _0x4b3def("yyyyMMddhhmmssSSS", new Date(_0x4cd535));
let _0x14dc96 = $.enCryptMethodJD($.tokenTk, $.fingerprint.toString(), _0x3b5afc.toString(), $.appId.toString(), $.CryptoJS).toString($.CryptoJS.enc.Hex),
  _0x16911f = "";
_0x2965f6.split(",").map((_0x5a921e, _0x29c9a7) => {
  _0x16911f += _0x5a921e + ":" + _0x1c3d7c(_0x32f630, _0x5a921e) + (_0x29c9a7 === _0x2965f6.split(",").length - 1 ? "" : "&");
});
const _0x5dce43 = $.CryptoJS.HmacSHA256(_0x16911f, _0x14dc96.toString()).toString($.CryptoJS.enc.Hex);
let _0x15bebd = ["".concat(_0x3b5afc.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.tokenTk), "".concat(_0x5dce43), "".concat("3.0"), "".concat(_0x4cd535)].join(";"),
  _0x43b905 = encodeURIComponent(_0x11c3da) + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x15bebd) + "&jsonp=" + _0xe3afb;
return _0x43b905;
}
function _0x4b3def(_0x83900f, _0x581012) {
var _0x5010e0 = _0x83900f,
  _0x368d4d = {
    "M+": _0x581012.getMonth() + 1,
    "d+": _0x581012.getDate(),
    "D+": _0x581012.getDate(),
    "h+": _0x581012.getHours(),
    "H+": _0x581012.getHours(),
    "m+": _0x581012.getMinutes(),
    "s+": _0x581012.getSeconds(),
    "w+": _0x581012.getDay(),
    "q+": Math.floor(_0x581012.getMonth() + 3 / 3),
    "S+": _0x581012.getMilliseconds()
  };
/(y+)/i.test(_0x5010e0) && (_0x5010e0 = _0x5010e0.replace(RegExp.$1, "".concat(_0x581012.getFullYear()).substr(4 - RegExp.$1.length)));
for (var _0x568102 in _0x368d4d) {
  if (new RegExp("(".concat(_0x568102, ")")).test(_0x5010e0)) {
    var _0x4500c0,
      _0x39abaa = "S+" === _0x568102 ? "000" : "00";
    _0x5010e0 = _0x5010e0.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x368d4d[_0x568102] : ("".concat(_0x39abaa) + _0x368d4d[_0x568102]).substr("".concat(_0x368d4d[_0x568102]).length));
  }
}
return _0x5010e0;
}