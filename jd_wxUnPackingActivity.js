/*
活动名称：让福袋飞 · 超级无线
活动链接：https://lzkjdz-isv.isvjd.com/wxUnPackingActivity/activity/activity?activityId=<活动id>
环境变量：jd_wxUnPackingActivity_activityId // 活动id

默认助力第一个CK，第一个CK失效会退出脚本
脚本自动入会，不想入会勿跑！

*/

const Env=require('./utils/Env.js');
const $ = new Env('让福袋飞（超级无线）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x4f4765 => {
    cookiesArr.push(jdCookieNode[_0x4f4765]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x566386 => _0x566386.cookie)].filter(_0x2052a1 => !!_0x2052a1);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "",
  jd_wxUnPackingActivity_activityId = "";
jd_wxUnPackingActivity_activityId = $.isNode() ? process.env.jd_wxUnPackingActivity_activityId ? process.env.jd_wxUnPackingActivity_activityId : "" + jd_wxUnPackingActivity_activityId : $.getdata("jd_wxUnPackingActivity_activityId") ? $.getdata("jd_wxUnPackingActivity_activityId") : "" + jd_wxUnPackingActivity_activityId;
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = jd_wxUnPackingActivity_activityId;
  $.shareUuid = "";
  console.log("活动入口：https://lzkjdz-isv.isvjd.com/wxUnPackingActivity/activity/activity?activityId=" + $.activityId);
  for (let _0x5dccce = 0; _0x5dccce < cookiesArr.length; _0x5dccce++) {
    cookie = cookiesArr[_0x5dccce];
    originCookie = cookiesArr[_0x5dccce];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x5dccce + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await getUA();
      await run();
      await $.wait(3000);
      if (_0x5dccce == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd || $.hasEnd) break;
    }
  }
  for (let _0x463110 = 0; _0x463110 < 1; _0x463110++) {
    if (cookiesArr[_0x463110]) {
      cookie = cookiesArr[_0x463110];
      originCookie = cookiesArr[_0x463110];
      if (cookie) {
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0x463110 + 1;
        message = "";
        $.bean = 0;
        $.hotFlag = false;
        $.nickName = "";
        console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "领取奖励******\n");
        await getUA();
        await getPrize();
        if (_0x463110 == 0 && !$.actorUuid) break;
        if ($.outFlag || $.activityEnd || $.hasEnd) break;
      }
    }
  }
  if ($.outFlag) {
    let _0x49d66c = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x49d66c);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(_0x1efbb4 => $.logErr(_0x1efbb4)).finally(() => $.done());
async function run() {
  try {
    $.needOpenCard = false;
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.helpStatus = 0;
    $.Token = await getToken(originCookie, "https://lzkjdz-isv.isvjd.com");
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
    $.index == 1 && (await takePostRequest("getSimpleActInfoVo"), await $.wait(500));
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await $.wait(500);
    await takePostRequest("getActMemberInfo");
    if (!$.openCard) {
      $.shopactivityId = "";
      $.joinVenderId = $.venderId;
      await getshopactivityId();
      for (let _0x187bfe = 0; _0x187bfe < Array(5).length; _0x187bfe++) {
        if (_0x187bfe > 0) console.log("第" + _0x187bfe + "次 重新开卡");
        await joinShop();
        await $.wait(500);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
      }
    }
    await $.wait(500);
    await takePostRequest("activityContent");
    await $.wait(500);
    $.index == 1 && (await takePostRequest("shopInfo"), await $.wait(500), console.log("活动店铺：" + ($.shopName || "未知") + "\n结束时间：" + $.endTime + "\n活动奖品：" + $.prize + "\n"), console.log("已有助力：" + $.hasUnpackingPeople + "\n还需助力：" + $.needUnpackingPeople));
    if ($.index != 1) {
      await takePostRequest("getMyFriendInfo");
      await $.wait(1000);
      await takePostRequest("unpackingInfo");
      await $.wait(1000);
      await takePostRequest("unPacking");
      await $.wait(1000);
      if ($.activityEnd || $.needOpenCard) return;
      console.log($.helpStatus == 1 ? "助力成功" : $.helpStatus == 3 ? "已助力他人" : $.helpStatus == 2 ? "已助力" : "其他情况" + $.helpStatus);
    }
    if ($.index == 1) $.helpCount = $.hasUnpackingPeople;else $.helpStatus == 1 && $.helpCount++;
    console.log("\n【账号" + $.index + "】已有助力：" + $.hasUnpackingPeople + ($.index != 1 && " 【账号1】已有助力：" + $.helpCount || ""));
    if ($.helpCount >= $.unpackingPeople) $.hasEnd = true;
    if ($.hotFlag) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("\n全部助力 => " + $.shareUuid));
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
  } catch (_0x4783f0) {
    console.log(_0x4783f0);
  }
}
async function getPrize() {
  try {
    $.hasPrize = false;
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(originCookie, "https://lzkjdz-isv.isvjd.com");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await $.wait(500);
    await takePostRequest("activityContent");
    await $.wait(500);
    $.drawInfo = null;
    await takePostRequest("drawPrize");
    if (!$.drawInfo) {
      console.log("没有获取到奖品信息");
      return;
    }
    if (!$.hasPrize) {
      console.log("未满足领取奖品的条件");
      return;
    }
    await $.wait(500);
    await takePostRequest("hasPrize");
    if (!$.hasPrize) {
      console.log("未能成功获得奖品");
      return;
    }
    if ($.drawInfo) switch ($.drawInfo.type) {
      case 6:
        console.log("🎉 " + $.drawInfo.name + " 🐶");
        break;
      case 7:
        prizeName = $.drawInfo.name;
        console.log("🎉 恭喜获得实物~");
        console.log("奖品名称：" + prizeName);
        console.log("参考价值：" + $.drawInfo.priceInfo + "（元）");
        console.log("预览图片：" + $.drawInfo.showImage);
        let _0x59438d = await wxSavePrize("https://lzkjdz-isv.isvjd.com", cookie, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, $.addressId);
        if (_0x59438d) {
          if ($.isNode()) {
            await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，已成功自动登记收货地址\n\nhttps://lzkjdz-isv.isvjd.com/wxUnPackingActivity/activity/activity?activityId=" + $.activityId);
          }
        } else $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\nhttps://lzkjdz-isv.isvjd.com/wxUnPackingActivity/activity/activity?activityId=" + $.activityId));
        break;
      case 8:
        console.log("🗑️ 专享价");
        break;
      case 9:
        console.log("🗑️ " + $.drawInfo.name + " 🎟️");
        break;
      case 13:
      case 14:
      case 15:
        console.log("🎉 恭喜获得" + $.drawInfo.name + " 🎁");
        $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得 " + $.drawInfo.name + "\n\nhttps://lzkjdz-isv.isvjd.com/wxUnPackingActivity/activity/activity?activityId=" + $.activityId));
        break;
      case 16:
        console.log("🎉 " + $.drawInfo.priceInfo + " 🧧");
        break;
      default:
        $.drawInfo.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + $.drawInfo.name);
        break;
    } else {
      console.log("未能获得奖品");
    }
  } catch (_0x1085c8) {
    console.log(_0x1085c8);
  }
}
async function takePostRequest(_0x2f2cbd) {
  if ($.outFlag) return;
  let _0x4c3f45 = "https://lzkjdz-isv.isvjd.com",
    _0xdac710 = "",
    _0x2e8a60 = "POST";
  switch (_0x2f2cbd) {
    case "getMyPing":
      url = _0x4c3f45 + "/customer/getMyPing";
      _0xdac710 = "token=" + $.Token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "shopInfo":
      url = _0x4c3f45 + "/wxUnPackingActivity/shopInfo";
      _0xdac710 = "activityId=" + $.activityId;
      break;
    case "getSimpleActInfoVo":
      url = _0x4c3f45 + "/customer/getSimpleActInfoVo";
      _0xdac710 = "activityId=" + $.activityId;
      break;
    case "getActMemberInfo":
      url = _0x4c3f45 + "/wxCommonInfo/getActMemberInfo";
      _0xdac710 = "venderId=" + $.venderId + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "accessLogWithAD":
      url = _0x4c3f45 + "/common/accessLogWithAD";
      let _0x3c2aba = "https://lzkjdz-isv.isvjd.com/wxUnPackingActivity/activity/activity?activityId=" + $.activityId + "&friendUuid=" + $.shareUuid;
      _0xdac710 = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x3c2aba) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      url = _0x4c3f45 + "/wxActionCommon/getUserInfo";
      _0xdac710 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "getMyFriendInfo":
      url = _0x4c3f45 + "/wxUnPackingActivity/getMyFriendInfo";
      _0xdac710 = "friendUuid=" + $.shareUuid;
      break;
    case "activityContent":
      url = _0x4c3f45 + "/wxUnPackingActivity/activityContent";
      _0xdac710 = "activityId=" + $.activityId + "&buyerNick=" + encodeURIComponent($.Pin) + "&friendUuid=" + $.shareUuid;
      break;
    case "unpackingInfo":
      url = _0x4c3f45 + "/wxUnPackingActivity/unpackingInfo";
      _0xdac710 = "activityId=" + $.activityId + "&friendUuid=" + $.shareUuid + "&mySelfUuid=" + $.actorUuid;
      break;
    case "unPacking":
      url = _0x4c3f45 + "/wxUnPackingActivity/unPacking";
      _0xdac710 = "activityId=" + $.activityId + "&friendUuid=" + $.shareUuid + "&mySelfId=" + $.actorUuid;
      break;
    case "drawPrize":
      url = _0x4c3f45 + "/wxUnPackingActivity/drawPrize";
      _0xdac710 = "activityId=" + $.activityId + "&mySelfId=" + $.actorUuid;
      break;
    case "hasPrize":
      url = _0x4c3f45 + "/wxActionPrizeResult/hasPrize";
      _0xdac710 = "activityId=" + $.activityId + "&drawInfoId=" + $.drawInfo.id;
      break;
    default:
      console.log("错误 " + _0x2f2cbd);
  }
  let _0x1a7c3a = getPostRequest(url, _0xdac710, _0x2e8a60);
  return new Promise(async _0x219f6c => {
    $.post(_0x1a7c3a, (_0x50aeec, _0x341166, _0x1ae2fb) => {
      try {
        setActivityCookie(_0x341166);
        _0x50aeec ? (_0x341166 && typeof _0x341166.statusCode != "undefined" && _0x341166.statusCode == 493 && (console.log(_0x2f2cbd + " 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(_0x50aeec, _0x50aeec)), console.log(_0x2f2cbd + " API请求失败，请检查网路重试")) : dealReturn(_0x2f2cbd, _0x1ae2fb);
      } catch (_0x423940) {
        console.log(_0x423940, _0x341166);
      } finally {
        _0x219f6c();
      }
    });
  });
}
async function dealReturn(_0x5b71fd, _0x283894) {
  let _0x36bc41 = "";
  try {
    if (_0x5b71fd != "accessLogWithAD" || _0x5b71fd != "drawContent") {
      _0x283894 && (_0x36bc41 = JSON.parse(_0x283894));
    }
  } catch (_0x4f8c7e) {
    console.log(_0x5b71fd + " 执行任务异常");
    console.log(_0x4f8c7e);
    $.runFalag = false;
  }
  try {
    switch (_0x5b71fd) {
      case "getMyPing":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) {
            if (_0x36bc41.data && typeof _0x36bc41.data.secretPin != "undefined") $.Pin = _0x36bc41.data.secretPin;
            if (_0x36bc41.data && typeof _0x36bc41.data.nickname != "undefined") $.nickname = _0x36bc41.data.nickname;
          } else {
            if (_0x36bc41.errorMessage) {
              console.log(_0x5b71fd + " " + (_0x36bc41.errorMessage || ""));
            } else console.log(_0x5b71fd + " " + _0x283894);
          }
        } else {}
        break;
      case "shopInfo":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) $.shopName = _0x36bc41.data.shopName || "";else {
            if (_0x36bc41.errorMessage) console.log(_0x5b71fd + " " + (_0x36bc41.errorMessage || ""));else {
              console.log(_0x5b71fd + " " + _0x283894);
            }
          }
        } else console.log(_0x5b71fd + " " + _0x283894);
        break;
      case "getSimpleActInfoVo":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) {
            if (typeof _0x36bc41.data.shopId != "undefined") $.shopId = _0x36bc41.data.shopId;
            if (typeof _0x36bc41.data.venderId != "undefined") $.venderId = _0x36bc41.data.venderId;
            $.activityType = _0x36bc41.data.activityType;
          } else _0x36bc41.errorMessage ? console.log(_0x5b71fd + " " + (_0x36bc41.errorMessage || "")) : console.log(_0x5b71fd + " " + _0x283894);
        } else {}
        break;
      case "getUserInfo":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) {
            $.pinImg = _0x36bc41.data.yunMidImageUrl || "";
            $.jdNick = _0x36bc41.data.nickname || "";
          } else _0x36bc41.errorMessage ? console.log(_0x5b71fd + " " + (_0x36bc41.errorMessage || "")) : console.log(_0x5b71fd + " " + _0x283894);
        } else console.log(_0x5b71fd + " " + _0x283894);
        break;
      case "activityContent":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) {
            $.actorUuid = _0x36bc41.data.wucvo.mySelfId || "";
            $.unpackingPeople = _0x36bc41.data.wucvo.unpackingPeople || 0;
            $.collectionCondition = _0x36bc41.data.wucvo.collectionCondition || true;
            $.startTime = _0x36bc41.data.wucvo.startTime || "";
            $.endTime = _0x36bc41.data.wucvo.endTime || "";
            $.hasUnpackingPeople = _0x36bc41.data.wuivo.hasUnpackingPeople || 0;
            $.needUnpackingPeople = _0x36bc41.data.wuivo.needUnpackingPeople || 0;
            $.prize = _0x36bc41.data.wdifo.name;
          } else {
            if (_0x36bc41.errorMessage) {
              if (_0x36bc41.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log("" + (_0x36bc41.errorMessage || ""));
            } else console.log("" + _0x283894);
          }
        } else console.log("" + _0x283894);
        break;
      case "getMyFriendInfo":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) {} else _0x36bc41.errorMessage ? console.log(_0x5b71fd + " " + (_0x36bc41.errorMessage || "")) : console.log(_0x5b71fd + " " + _0x283894);
        } else console.log(_0x5b71fd + " " + _0x283894);
        break;
      case "unpackingInfo":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) $.helpStatus = _0x36bc41.data.shareStatus || 0;else {
            if (_0x36bc41.errorMessage) {
              console.log(" " + (_0x36bc41.errorMessage || ""));
            } else console.log("" + _0x283894);
          }
        } else {}
        break;
      case "unPacking":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) console.log("" + (_0x36bc41.errorMessage || ""));else {
            if (_0x36bc41.errorMessage) {
              for (let _0x12ba15 of ["未开始", "结束", "不存在", "不在"]) {
                if (_0x36bc41.errorMessage.includes(_0x12ba15)) {
                  $.activityEnd = true;
                  break;
                }
              }
              if (_0x36bc41.errorMessage.indexOf("会员") > -1) $.needOpenCard = true;
              console.log("" + (_0x36bc41.errorMessage || ""));
            } else console.log("" + _0x283894);
          }
        } else console.log(_0x5b71fd + " " + _0x283894);
        break;
      case "drawContent":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) $.content = _0x36bc41.data.content || [];else {
            if (_0x36bc41.errorMessage) {
              console.log(_0x5b71fd + " " + (_0x36bc41.errorMessage || ""));
            } else console.log(_0x5b71fd + " " + _0x283894);
          }
        } else console.log(_0x5b71fd + " " + _0x283894);
        break;
      case "drawPrize":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) {
            $.drawInfo = _0x36bc41.data.drawInfo;
            $.addressId = _0x36bc41.data.addressId;
            $.hasPrize = true;
          } else _0x36bc41.errorMessage ? console.log(_0x5b71fd + " " + (_0x36bc41.errorMessage || "")) : console.log(_0x5b71fd + " " + _0x283894);
        } else console.log(_0x5b71fd + " " + _0x283894);
        break;
      case "hasPrize":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true && _0x36bc41.data === true) $.hasPrize = true;else _0x36bc41.errorMessage ? console.log(_0x5b71fd + " " + (_0x36bc41.errorMessage || "")) : console.log(_0x5b71fd + " " + _0x283894);
        } else console.log(_0x5b71fd + " " + _0x283894);
        break;
      case "getActMemberInfo":
        if (typeof _0x36bc41 == "object") {
          if (_0x36bc41.result && _0x36bc41.result === true) $.openCard = _0x36bc41.data.openCard || false;else _0x36bc41.errorMessage ? console.log(_0x5b71fd + " " + (_0x36bc41.errorMessage || "")) : console.log(_0x5b71fd + " " + _0x283894);
        } else console.log(_0x5b71fd + " " + _0x283894);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(_0x5b71fd + "-> " + _0x283894);
    }
    typeof _0x36bc41 == "object" && _0x36bc41.errorMessage && _0x36bc41.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (_0x57755b) {
    console.log(_0x57755b);
  }
}
function getPostRequest(_0x348225, _0x47a5f9, _0x33074f = "POST") {
  let _0x307db4 = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x348225.indexOf("https://lzkjdz-isv.isvjd.com") > -1) {
    _0x307db4.Origin = "https://lzkjdz-isv.isvjd.com";
    _0x307db4.Referer = "https://lzkjdz-isv.isvjd.com/wxUnPackingActivity/activity/activity?activityId=" + $.activityId + "&friendUuid=" + $.shareUuid;
    _0x307db4.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie;
  }
  return {
    "url": _0x348225,
    "method": _0x33074f,
    "headers": _0x307db4,
    "body": _0x47a5f9,
    "timeout": 30000
  };
}
function getCk() {
  return new Promise(_0x84378c => {
    let _0x3da909 = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://lzkjdz-isv.isvjd.com/wxUnPackingActivity/activity/activity?activityId=" + $.activityId,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x3da909, async (_0x3439af, _0x533314, _0x471a2f) => {
      try {
        if (_0x3439af) {
          _0x533314 && typeof _0x533314.statusCode != "undefined" && _0x533314.statusCode == 493 && (console.log("getCk 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          console.log(String(_0x3439af));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (_0x533314.status == 200) setActivityCookie(_0x533314);
        }
      } catch (_0x98425f) {
        $.logErr(_0x98425f, _0x533314);
      } finally {
        _0x84378c();
      }
    });
  });
}
function setActivityCookie(_0x499a91) {
  if (_0x499a91.headers["set-cookie"]) {
    cookie = "";
    for (let _0x57f4c2 of _0x499a91.headers["set-cookie"]) {
      lz_cookie[_0x57f4c2.split(";")[0].substr(0, _0x57f4c2.split(";")[0].indexOf("="))] = _0x57f4c2.split(";")[0].substr(_0x57f4c2.split(";")[0].indexOf("=") + 1);
    }
    for (const _0x6d5060 of Object.keys(lz_cookie)) {
      cookie += _0x6d5060 + "=" + lz_cookie[_0x6d5060] + ";";
    }
    activityCookie = cookie;
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(_0x3470ef) {
  _0x3470ef = _0x3470ef || 32;
  let _0x41cfc5 = "abcdef0123456789",
    _0x547e46 = _0x41cfc5.length,
    _0x10c215 = "";
  for (i = 0; i < _0x3470ef; i++) _0x10c215 += _0x41cfc5.charAt(Math.floor(Math.random() * _0x547e46));
  return _0x10c215;
}
function getMaxMin(_0x40fc70, _0x2779bb) {
  if (_0x2779bb === "max") {
    return Math.max.apply(Math, _0x40fc70);
  } else {
    if (_0x2779bb === "min") return Math.min.apply(Math, _0x40fc70);
  }
}
function jsonParse(_0xb07486) {
  if (typeof _0xb07486 == "string") {
    try {
      return JSON.parse(_0xb07486);
    } catch (_0x24cc45) {
      return console.log(_0x24cc45), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x57da28 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x1d7b9e = "";
    if ($.shopactivityId) _0x1d7b9e = ",\"activityId\":" + $.shopactivityId;
    const _0x1fc44b = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x1d7b9e + ",\"channel\":406}",
      _0x1e3056 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x1fc44b)
      },
      _0x4d407c = await getH5st("8adfb", _0x1e3056),
      _0x20bcd8 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x1fc44b + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x4d407c),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x20bcd8, async (_0x13834f, _0x4205ad, _0x1473d9) => {
      try {
        _0x1473d9 = _0x1473d9 && _0x1473d9.match(/jsonp_.*?\((.*?)\);/) && _0x1473d9.match(/jsonp_.*?\((.*?)\);/)[1] || _0x1473d9;
        let _0xc560c1 = $.toObj(_0x1473d9, _0x1473d9);
        if (_0xc560c1 && typeof _0xc560c1 == "object") {
          if (_0xc560c1 && _0xc560c1.success === true) {
            console.log(_0xc560c1.message);
            $.errorJoinShop = _0xc560c1.message;
            if (_0xc560c1.result && _0xc560c1.result.giftInfo) {
              for (let _0x36590b of _0xc560c1.result.giftInfo.giftList) {
                console.log("入会获得: " + _0x36590b.discountString + _0x36590b.prizeName + _0x36590b.secondLineDesc);
              }
            }
            console.log("");
          } else {
            if (_0xc560c1 && typeof _0xc560c1 == "object" && _0xc560c1.message) {
              $.errorJoinShop = _0xc560c1.message;
              console.log("" + (_0xc560c1.message || ""));
            } else {
              console.log(_0x1473d9);
            }
          }
        } else {
          console.log(_0x1473d9);
        }
      } catch (_0x8c454a) {
        $.logErr(_0x8c454a, _0x4205ad);
      } finally {
        _0x57da28();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x14f655 => {
    let _0x4fb1e7 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x464984 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x4fb1e7)
      },
      _0x2a9a90 = await getH5st("ef79a", _0x464984),
      _0x2e959b = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x4fb1e7 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x2a9a90),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x2e959b, async (_0x4e67bf, _0x252a84, _0x217193) => {
      try {
        _0x217193 = _0x217193 && _0x217193.match(/jsonp_.*?\((.*?)\);/) && _0x217193.match(/jsonp_.*?\((.*?)\);/)[1] || _0x217193;
        let _0x43a730 = $.toObj(_0x217193, _0x217193);
        if (_0x43a730 && typeof _0x43a730 == "object") {
          _0x43a730 && _0x43a730.success == true && (console.log("去加入店铺会员：" + (_0x43a730.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x43a730.result.interestsRuleList && _0x43a730.result.interestsRuleList[0] && _0x43a730.result.interestsRuleList[0].interestsInfo && _0x43a730.result.interestsRuleList[0].interestsInfo.activityId || "");
        } else console.log(_0x217193);
      } catch (_0x1a6af3) {
        $.logErr(_0x1a6af3, _0x252a84);
      } finally {
        _0x14f655();
      }
    });
  });
}
