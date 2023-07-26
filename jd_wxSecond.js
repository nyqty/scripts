/*
活动名称：读秒拼手速 · 超级无线
活动链接：https://lzkjdz-isv.isvjd.com/wxSecond/activity/activity?activityId=<活动id>
环境变量：jd_wxSecond_activityId // 活动id
         jd_wxSecond_addCart // 是否做加购任务，默认不做

*/

const Env=require('./utils/Env.js');
const $ = new Env('读秒拼手速（超级无线）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x448054 => {
    cookiesArr.push(jdCookieNode[_0x448054]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x311afa => _0x311afa.cookie)].filter(_0x26b67c => !!_0x26b67c);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  activityId = "";
activityId = $.isNode() ? process.env.jd_wxSecond_activityId ? process.env.jd_wxSecond_activityId : "" + jd_wxSecond_activityId : $.getdata("jd_wxSecond_activityId") ? $.getdata("jd_wxSecond_activityId") : "" + jd_wxSecond_activityId;
let addCart = process.env.jd_wxSecond_addCart ? process.env.jd_wxSecond_addCart : "false";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = activityId;
  $.shareUuid = "";
  $.activityUrl = "https://lzkjdz-isv.isvjd.com/wxSecond/activity?activityId=" + $.activityId;
  console.log("活动入口：" + $.activityUrl);
  for (let _0x21f3d1 = 0; _0x21f3d1 < cookiesArr.length; _0x21f3d1++) {
    cookie = cookiesArr[_0x21f3d1];
    originCookie = cookiesArr[_0x21f3d1];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x21f3d1 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await getUA();
      await run();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
  cookie = cookiesArr[0];
  if (cookie && $.assistStatus && !$.outFlag && !$.activityEnd) {
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.index = 1;
    message = "";
    $.bean = 0;
    $.hotFlag = false;
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
    await getUA();
    await run();
  }
  if ($.outFlag) {
    let _0x575401 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x575401);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(_0x38c03d => $.logErr(_0x38c03d)).finally(() => $.done());
async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(originCookie, "https://lzkjdz-isv.isvjd.com");
    await $.wait(500);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    if ($.index == 1) await takePostRequest("getSimpleActInfoVo");
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await takePostRequest("getActMemberInfo");
    if (!$.openCard) {
      console.log("活动仅限店铺会员参与哦~");
      return;
    }
    await takePostRequest("activityContent");
    let _0x1679d5 = new Date().valueOf();
    $.startTimeStr = new Date($.startTime).valueOf();
    $.endTimeStr = new Date($.endTime).valueOf();
    if ($.endTimeStr <= _0x1679d5) {
      console.log("活动已经结束了~");
      $.activityEnd = true;
      return;
    }
    if ($.startTimeStr >= _0x1679d5) {
      console.log("活动开始时间：" + new Date(parseInt($.startTime)).toLocaleString());
      $.activityEnd = true;
      return;
    }
    await $.wait(500);
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.index == 1) {
      let _0x1a8721 = prizeId = prizeName = "";
      for (let _0x5045d9 = 0; _0x5045d9 < $.prizeList.length; _0x5045d9++) {
        prizeName = $.prizeList[_0x5045d9].name;
        prizeId = $.prizeList[_0x5045d9].id;
        if (prizeId == 0) {
          _0x1a8721 += "谢谢参与";
          break;
        } else _0x5045d9 != $.prizeList.length - 1 ? _0x1a8721 += prizeName + "，" : _0x1a8721 += "" + prizeName;
      }
      await takePostRequest("getShopInfoVO");
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      console.log("店铺名称：" + ($.shopName || "未知") + "\n店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + _0x1a8721 + "\n");
    }
    let _0x298e1c = false;
    for (let _0x40b620 = 0; _0x40b620 < 3; _0x40b620++) {
      switch (_0x40b620) {
        case 0:
          await takePostRequest("getTaskGame");
          break;
        case 1:
          await takePostRequest("getTaskDay");
          break;
        case 2:
          await takePostRequest("getTask");
          break;
      }
      await $.wait(500);
      var _0x1e9593 = [2, 3, 4, 5];
      if ($.tasklist.length > 0) {
        for (let _0x413f4f = 0; _0x413f4f < $.tasklist.length; _0x413f4f++) {
          $.taskType = $.tasklist[_0x413f4f].taskType;
          $.commodity = $.tasklist[_0x413f4f].commodity;
          $.dayMaxNumber = $.tasklist[_0x413f4f].dayMaxNumber;
          $.finishNumber = $.tasklist[_0x413f4f].finishNumber;
          $.needTimes = $.commodity * $.dayMaxNumber;
          if ($.dayMaxNumber == $.finishNumber) continue;
          if (_0x1e9593.includes($.taskType)) {
            _0x298e1c = true;
            if ($.taskType == 2 && addCart == "false") continue;
            let _0x374a09 = "";
            switch ($.taskType) {
              case 2:
                _0x374a09 = "加购";
                break;
              case 3:
                _0x374a09 = "关注";
                break;
              case 4:
                _0x374a09 = "预约";
                break;
              case 5:
                _0x374a09 = "浏览";
                break;
              default:
                break;
            }
            $.activityTaskGoods = $.tasklist[_0x413f4f].activityTaskGoods;
            for (let _0x180b3d = 0; _0x180b3d < $.activityTaskGoods.length; _0x180b3d++) {
              console.log("去" + _0x374a09 + "商品");
              $.skuId = $.activityTaskGoods[_0x180b3d].skuId;
              await takePostRequest("finishTask");
              await $.wait(500);
              if ($.taskResult) $.score += $.newScore;
              if (_0x180b3d == $.needTimes - 1) break;
            }
          } else {
            $.skuId = "";
            switch ($.taskType) {
              case 1:
                _0x298e1c = true;
                console.log("去关注店铺");
                await takePostRequest("finishTask");
                await $.wait(500);
                if ($.taskResult) $.score += $.newScore;
                break;
              case 9:
                break;
              case 12:
                _0x298e1c = true;
                console.log("去逛会场");
                await takePostRequest("finishTask");
                await $.wait(500);
                if ($.taskResult) $.score += $.newScore;
                break;
              case 99:
                break;
              default:
                break;
            }
          }
        }
      }
    }
    if ($.score > 0) {
      let _0xb1d466 = parseInt($.score / 1);
      for (m = 1; _0xb1d466--; m++) {
        await takePostRequest("activityContent");
        await $.wait(500);
        await takePostRequest("checkAuth");
        await $.wait(500);
        await takePostRequest("start");
        if ($.runFalag == false) break;
        if (Number(_0xb1d466) <= 0) break;
        if (m >= 10) {
          console.log("\n挑战太多次了，下次再继续吧~");
          break;
        }
        await $.wait(parseInt(Math.random() * 3000 + 1000, 10));
      }
    } else {
      $.assistStatus = true;
      console.log("没有参与机会了，下次再来吧~");
    }
    await $.wait(1000);
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    $.index == 1 && ($.shareUuid = $.actorUuid);
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
  } catch (_0x696559) {
    console.log(_0x696559);
  }
}
async function takePostRequest(_0x5516e3) {
  if ($.outFlag) return;
  let _0x327681 = "https://lzkjdz-isv.isvjd.com",
    _0x48b4a8 = "",
    _0x5b5614 = "POST";
  switch (_0x5516e3) {
    case "getMyPing":
      url = _0x327681 + "/customer/getMyPing";
      _0x48b4a8 = "token=" + $.Token + "&fromType=APP&userId=" + $.venderId + "&pin=";
      break;
    case "getSimpleActInfoVo":
      url = _0x327681 + "/customer/getSimpleActInfoVo";
      _0x48b4a8 = "activityId=" + $.activityId;
      break;
    case "getActMemberInfo":
      url = _0x327681 + "/wxCommonInfo/getActMemberInfo";
      _0x48b4a8 = "venderId=" + ($.venderId || "") + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "accessLogWithAD":
      url = _0x327681 + "/common/accessLogWithAD";
      let _0x2c4e82 = "https://lzkjdz-isv.isvjd.com/wxSecond/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      _0x48b4a8 = "venderId=" + ($.venderId || "") + "&code=71&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x2c4e82) + "&subType=app&adSource=";
      break;
    case "getOpenCardStatusWithOutSelf":
      url = _0x327681 + "/crmCard/common/coupon/getOpenCardStatusWithOutSelf";
      _0x48b4a8 = "venderId=" + ($.venderId || "") + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      url = _0x327681 + "/wxSecond/getData";
      _0x48b4a8 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid + "&activityStatus=";
      break;
    case "getShopInfoVO":
      url = _0x327681 + "/wxActionCommon/getShopInfoVO";
      _0x48b4a8 = "userId=" + $.venderId;
      break;
    case "getTaskGame":
      url = _0x327681 + "/wxSecond/getTaskGame";
      _0x48b4a8 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "getTaskDay":
      url = _0x327681 + "/wxSecond/getTaskDay";
      _0x48b4a8 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "getTask":
      url = _0x327681 + "/wxSecond/getTask";
      _0x48b4a8 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid;
      break;
    case "finishTask":
      url = _0x327681 + "/wxSecond/finishTask";
      _0x48b4a8 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&taskType=" + $.taskType + "&skuId=" + $.skuId;
      break;
    case "checkAuth":
      url = _0x327681 + "/wxSecond/checkAuth";
      _0x48b4a8 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&brushBane=" + encodeURIComponent($.brushBane) + "&bid=" + $.bid;
      break;
    case "start":
      url = _0x327681 + "/wxSecond/start";
      _0x48b4a8 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&seconds=" + $.targetTime + "&brushBane=" + encodeURIComponent($.brushResult) + "&bid=" + $.bid;
      break;
    default:
      console.log("错误" + _0x5516e3);
  }
  let _0x315118 = getPostRequest(url, _0x48b4a8, _0x5b5614);
  return new Promise(async _0x4e118a => {
    $.post(_0x315118, (_0x41c8b6, _0x54f7c8, _0x146c66) => {
      try {
        setActivityCookie(_0x54f7c8);
        _0x41c8b6 ? (_0x54f7c8 && typeof _0x54f7c8.statusCode != "undefined" && _0x54f7c8.statusCode == 493 && (console.log(_0x5516e3 + " 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(_0x41c8b6, _0x41c8b6)), console.log(_0x5516e3 + " API请求失败，请检查网路重试")) : dealReturn(_0x5516e3, _0x146c66);
      } catch (_0x46eaa7) {
        console.log(_0x46eaa7, _0x54f7c8);
      } finally {
        _0x4e118a();
      }
    });
  });
}
async function dealReturn(_0x4048e9, _0x4f8610) {
  let _0x367b1d = "";
  try {
    (_0x4048e9 != "accessLogWithAD" || _0x4048e9 != "drawContent") && _0x4f8610 && (_0x367b1d = JSON.parse(_0x4f8610));
  } catch (_0x38adbf) {
    console.log(_0x4048e9 + " 执行任务异常");
    console.log(_0x38adbf);
    $.runFalag = false;
  }
  try {
    switch (_0x4048e9) {
      case "getMyPing":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) {
            if (_0x367b1d.data && typeof _0x367b1d.data.secretPin != "undefined") $.Pin = _0x367b1d.data.secretPin;
            _0x367b1d.data && typeof _0x367b1d.data.nickname != "undefined" && ($.nickname = _0x367b1d.data.nickname);
          } else _0x367b1d.errorMessage ? console.log(_0x4048e9 + " " + (_0x367b1d.errorMessage || "")) : console.log(_0x4048e9 + " " + _0x4f8610);
        } else console.log(_0x4048e9 + " " + _0x4f8610);
        break;
      case "getSimpleActInfoVo":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) {
            if (typeof _0x367b1d.data.shopId != "undefined") $.shopId = _0x367b1d.data.shopId;
            if (typeof _0x367b1d.data.venderId != "undefined") $.venderId = _0x367b1d.data.venderId;
            if (typeof _0x367b1d.data.activityType != "undefined") $.activityType = _0x367b1d.data.activityType;
          } else {
            if (_0x367b1d.errorMessage) console.log(_0x4048e9 + " " + (_0x367b1d.errorMessage || ""));else {
              console.log(_0x4048e9 + " " + _0x4f8610);
            }
          }
        } else console.log(_0x4048e9 + " " + _0x4f8610);
        break;
      case "getActMemberInfo":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) $.openCard = _0x367b1d.data.openCard || false;else _0x367b1d.errorMessage && console.log(_0x4048e9 + " " + (_0x367b1d.errorMessage || ""));
        } else console.log(_0x4048e9 + " " + _0x4f8610);
        break;
      case "activityContent":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) {
            $.endTime = _0x367b1d.data.endTime || "";
            $.startTime = _0x367b1d.data.startTime || "";
            $.actorUuid = _0x367b1d.data.uuid || "";
            $.name = _0x367b1d.data.secondActive.name || "";
            $.targetTime = _0x367b1d.data.secondActive.targetTime || "";
            $.score = _0x367b1d.data.score || 0;
            $.prizeList = _0x367b1d.data.prizeList || [];
            $.bid = _0x367b1d.data.bid || 0;
            $.brushBane = _0x367b1d.data.brushBane || "";
          } else _0x367b1d.errorMessage ? console.log(_0x4048e9 + " " + (_0x367b1d.errorMessage || "")) : console.log(_0x4048e9 + " " + _0x4f8610);
        } else console.log(_0x4048e9 + " " + _0x4f8610);
        break;
      case "getShopInfoVO":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) $.shopName = _0x367b1d.data.shopName || "";else _0x367b1d.errorMessage ? console.log(_0x4048e9 + " " + (_0x367b1d.errorMessage || "")) : console.log(_0x4048e9 + " " + _0x4f8610);
        } else console.log(_0x4048e9 + " " + _0x4f8610);
        break;
      case "getTaskGame":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) $.tasklist = _0x367b1d.data;else _0x367b1d.errorMessage ? console.log(_0x4048e9 + " " + (_0x367b1d.errorMessage || "")) : console.log(_0x4048e9 + " " + _0x4f8610);
        } else console.log(_0x4048e9 + " " + _0x4f8610);
        break;
      case "checkAuth":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) {
            $.bid = _0x367b1d.data.data.bid;
            $.brushResult = _0x367b1d.data.data.brushResult;
          } else {
            if (_0x367b1d.errorMessage) {
              console.log("" + (_0x367b1d.errorMessage || ""));
            } else {
              console.log("" + _0x4f8610);
            }
          }
        } else console.log("" + _0x4f8610);
        break;
      case "getTaskDay":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) $.tasklist = _0x367b1d.data;else _0x367b1d.errorMessage ? console.log(_0x4048e9 + " " + (_0x367b1d.errorMessage || "")) : console.log(_0x4048e9 + " " + _0x4f8610);
        } else console.log(_0x4048e9 + " " + _0x4f8610);
        break;
      case "getTask":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) $.tasklist = _0x367b1d.data;else {
            if (_0x367b1d.errorMessage) console.log(_0x4048e9 + " " + (_0x367b1d.errorMessage || ""));else {
              console.log(_0x4048e9 + " " + _0x4f8610);
            }
          }
        } else console.log(_0x4048e9 + " " + _0x4f8610);
        break;
      case "finishTask":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) {
            $.taskResult = _0x367b1d.data;
            $.newScore = $.taskResult.score;
            console.log("  >> 任务完成");
          } else _0x367b1d.errorMessage ? console.log("  >> " + (_0x367b1d.errorMessage || "任务失败")) : console.log(_0x4048e9 + " " + _0x4f8610);
        } else console.log(_0x4048e9 + " " + _0x4f8610);
        break;
      case "start":
        if (typeof _0x367b1d == "object") {
          if (_0x367b1d.result && _0x367b1d.result === true) {
            if (_0x367b1d.data.draw.drawOk === true) {
              let _0x1df9f8 = _0x367b1d.data.draw.drawInfo;
              switch (_0x1df9f8.type) {
                case 6:
                  console.log("🎉 " + _0x1df9f8.name + " 🐶");
                  break;
                case 7:
                  const _0x9467f3 = _0x367b1d.data.draw.addressId;
                  prizeName = _0x1df9f8.name;
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  console.log("参考价值：" + _0x1df9f8.priceInfo + "（元）");
                  if (_0x1df9f8.showImage) console.log("预览图片：" + _0x1df9f8.showImage);
                  let _0x53e647 = await wxSavePrize("https://lzkjdz-isv.isvjd.com", cookie, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, _0x9467f3);
                  _0x53e647 ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + $.activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl));
                  break;
                case 8:
                  console.log("🗑️ 专享价");
                  break;
                case 9:
                  console.log("🗑️ " + _0x1df9f8.name + " 🎟️");
                  break;
                case 13:
                case 14:
                case 15:
                  console.log("🎉 恭喜获得" + _0x1df9f8.name + " 🎁");
                  $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + _0x1df9f8.name + "\n\n" + $.activityUrl));
                  break;
                case 16:
                  console.log("🎉 " + _0x1df9f8.priceInfo + " 🧧");
                  break;
                default:
                  _0x1df9f8.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + _0x1df9f8.name);
                  break;
              }
            } else console.log("💨 空气");
          } else {
            if (_0x367b1d.errorMessage) {
              console.log(_0x4048e9 + " " + (_0x367b1d.errorMessage || ""));
            } else console.log(_0x4048e9 + " " + _0x4f8610);
          }
        } else console.log("抽了个寂寞～");
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(_0x4048e9 + "-> " + _0x4f8610);
    }
    typeof _0x367b1d == "object" && _0x367b1d.errorMessage && _0x367b1d.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (_0x1eafc5) {
    console.log(_0x1eafc5);
  }
}
function getPostRequest(_0x4f4b92, _0x4116ca, _0x10ade0 = "POST") {
  let _0x59988e = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return _0x4f4b92.indexOf("https://lzkjdz-isv.isvjd.com") > -1 && (_0x59988e.Referer = "https://lzkjdz-isv.isvjd.com/wxSecond/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, _0x59988e.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": _0x4f4b92,
    "method": _0x10ade0,
    "headers": _0x59988e,
    "body": _0x4116ca,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(_0xe3cf1f => {
    let _0x499cf5 = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://lzkjdz-isv.isvjd.com/wxSecond/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x499cf5, async (_0x46e84d, _0x140047, _0x2ee073) => {
      try {
        if (_0x46e84d) {
          _0x140047 && typeof _0x140047.statusCode != "undefined" && _0x140047.statusCode == 493 && (console.log("getCk 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          console.log(String(_0x46e84d));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let _0x1f727b = _0x2ee073.match(/(活动已经结束)/) && _0x2ee073.match(/(活动已经结束)/)[1] || "";
          if (_0x1f727b) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          setActivityCookie(_0x140047);
        }
      } catch (_0x5471c0) {
        $.logErr(_0x5471c0, _0x140047);
      } finally {
        _0xe3cf1f();
      }
    });
  });
}
function setActivityCookie(_0x58de9c) {
  if (_0x58de9c) {
    if (_0x58de9c.headers["set-cookie"]) {
      cookie = "";
      for (let _0x145ab2 of _0x58de9c.headers["set-cookie"]) {
        lz_cookie[_0x145ab2.split(";")[0].substr(0, _0x145ab2.split(";")[0].indexOf("="))] = _0x145ab2.split(";")[0].substr(_0x145ab2.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x2e812f of Object.keys(lz_cookie)) {
        cookie += _0x2e812f + "=" + lz_cookie[_0x2e812f] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(_0x454f9c) {
  _0x454f9c = _0x454f9c || 32;
  let _0x38d444 = "abcdef0123456789",
    _0x125df1 = _0x38d444.length,
    _0x22b71c = "";
  for (i = 0; i < _0x454f9c; i++) _0x22b71c += _0x38d444.charAt(Math.floor(Math.random() * _0x125df1));
  return _0x22b71c;
}
function jsonParse(_0x4c6c0d) {
  if (typeof _0x4c6c0d == "string") try {
    return JSON.parse(_0x4c6c0d);
  } catch (_0x168c00) {
    return console.log(_0x168c00), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x18952a => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x17193a = "";
    if ($.shopactivityId) _0x17193a = ",\"activityId\":" + $.shopactivityId;
    const _0x46c776 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x17193a + ",\"channel\":406}",
      _0x529d8e = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x46c776)
      },
      _0x1626dd = await getH5st("8adfb", _0x529d8e),
      _0x214cd0 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x46c776 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x1626dd),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x214cd0, async (_0x4eab78, _0x308fb1, _0x1faf3a) => {
      try {
        _0x1faf3a = _0x1faf3a && _0x1faf3a.match(/jsonp_.*?\((.*?)\);/) && _0x1faf3a.match(/jsonp_.*?\((.*?)\);/)[1] || _0x1faf3a;
        let _0x1453f0 = $.toObj(_0x1faf3a, _0x1faf3a);
        if (_0x1453f0 && typeof _0x1453f0 == "object") {
          if (_0x1453f0 && _0x1453f0.success === true) {
            console.log(_0x1453f0.message);
            $.errorJoinShop = _0x1453f0.message;
            if (_0x1453f0.result && _0x1453f0.result.giftInfo) {
              for (let _0x3bd376 of _0x1453f0.result.giftInfo.giftList) {
                console.log("入会获得: " + _0x3bd376.discountString + _0x3bd376.prizeName + _0x3bd376.secondLineDesc);
              }
            }
            console.log("");
          } else {
            if (_0x1453f0 && typeof _0x1453f0 == "object" && _0x1453f0.message) {
              $.errorJoinShop = _0x1453f0.message;
              console.log("" + (_0x1453f0.message || ""));
            } else {
              console.log(_0x1faf3a);
            }
          }
        } else console.log(_0x1faf3a);
      } catch (_0x414200) {
        $.logErr(_0x414200, _0x308fb1);
      } finally {
        _0x18952a();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x4de58d => {
    let _0x5c7272 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x3c5348 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x5c7272)
      },
      _0x385c9c = await getH5st("ef79a", _0x3c5348),
      _0x5176a9 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x5c7272 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x385c9c),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x5176a9, async (_0x3bab89, _0x5a8a4b, _0x3e58c7) => {
      try {
        _0x3e58c7 = _0x3e58c7 && _0x3e58c7.match(/jsonp_.*?\((.*?)\);/) && _0x3e58c7.match(/jsonp_.*?\((.*?)\);/)[1] || _0x3e58c7;
        let _0x38977c = $.toObj(_0x3e58c7, _0x3e58c7);
        _0x38977c && typeof _0x38977c == "object" ? _0x38977c && _0x38977c.success == true && (console.log("\n去加入店铺会员：" + (_0x38977c.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x38977c.result.interestsRuleList && _0x38977c.result.interestsRuleList[0] && _0x38977c.result.interestsRuleList[0].interestsInfo && _0x38977c.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x3e58c7);
      } catch (_0x25dd6a) {
        $.logErr(_0x25dd6a, _0x5a8a4b);
      } finally {
        _0x4de58d();
      }
    });
  });
}
