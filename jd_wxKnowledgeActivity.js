/*
活动名称：知识超人 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjcloud.com/wxKnowledgeActivity/activity/activity?activityId=<活动id>
         https://cjhy-isv.isvjcloud.com/wxKnowledgeActivity/activity/activity?activityId=<活动id>
环境变量：jd_wxKnowledgeActivity_activityUrl // 活动链接
         jd_wxKnowledgeActivity_openCard // 是否开卡，默认不开卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('知识超人（超级无线/超级会员）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x2ef495 => {
    cookiesArr.push(jdCookieNode[_0x2ef495]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0xd9f67a => _0xd9f67a.cookie)].filter(_0xa5ebc => !!_0xa5ebc);
let activityUrl = process.env.jd_wxKnowledgeActivity_activityUrl ? process.env.jd_wxKnowledgeActivity_activityUrl : "",
  openCard = process.env.jd_wxKnowledgeActivity_openCard === "true" ? true : false,
  activityId = "";
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "";
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
  $.domain_mode = null;
  if ($.domain.includes("cjhy")) $.domain_mode = "cjhy";
  if ($.domain.includes("lzkj")) $.domain_mode = "lzkj";
  if ($.domain_mode == null) {
    console.log("请填写正确的活动链接");
    return;
  }
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    console.log("活动id不存在！");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = activityId;
  console.log("活动入口：" + activityUrl);
  for (let _0x19e8bd = 0; _0x19e8bd < cookiesArr.length; _0x19e8bd++) {
    cookie = cookiesArr[_0x19e8bd];
    originCookie = cookiesArr[_0x19e8bd];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x19e8bd + 1;
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
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(_0x5864cf => $.logErr(_0x5864cf)).finally(() => $.done());
async function run() {
  try {
    $.canJoin = true;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.token = "";
    $.Pin = "";
    $.drawStop = false;
    $.needOpenCard = false;
    let _0x3b98b2 = new Date().valueOf();
    switch ($.domain_mode) {
      case "lzkj":
        await getFirstLZCK();
        break;
      case "cjhy":
        await getFirstCK();
        break;
    }
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    if ($.index == 1) {
      await takePostRequest("getSimpleActInfoVo");
      if (!$.venderId) {
        $.outFlag = true;
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        return;
      }
    }
    $.token = await getToken(originCookie, domains);
    if ($.token) {
      await takePostRequest("getMyPing");
      if (!$.Pin) {
        console.log("未能获取用户鉴权信息！");
        return;
      }
      switch ($.domain_mode) {
        case "lzkj":
          $.FormatPin = encodeURIComponent($.Pin);
          break;
        case "cjhy":
          $.FormatPin = encodeURIComponent(encodeURIComponent($.Pin));
          break;
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      switch ($.domain_mode) {
        case "lzkj":
          await takePostRequest("accessLogWithAD");
          break;
        case "cjhy":
          await takePostRequest("accessLog");
          break;
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    } else {
      console.log("获取[token]失败！");
      return;
    }
    if (openCard) {
      switch ($.domain_mode) {
        case "lzkj":
          await takePostRequest("getActMemberInfo");
          break;
        case "cjhy":
          await takePostRequest("getOpenCardInfo");
          break;
      }
      if ($.hasEnd || $.activityEnd || $.outFlag) return;
      if (!$.isOpenCard) {
        $.errorJoinShop = "";
        $.joinVenderId = $.venderId;
        for (let _0x1cf517 = 0; _0x1cf517 < Array(5).length; _0x1cf517++) {
          if (_0x1cf517 > 0) console.log("第" + _0x1cf517 + "次 重新开卡");
          await joinShop();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
        }
        $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("❌ 开卡失败，重新执行脚本");
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.hasAnswerTimes = 0;
    await takePostRequest("activityContent");
    $.startTimeStr = new Date($.startTime).valueOf();
    $.endTimeStr = new Date($.endTime).valueOf();
    _0x3b98b2 >= $.endTimeStr && (console.log("活动已经结束了~"), $.activityEnd = true);
    if ($.activityEnd) return;
    _0x3b98b2 <= $.startTimeStr && console.log("活动还未开始~");
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    if ($.hotFlag) return;
    $.index == 1 && (await takePostRequest("getShopInfoVO"), $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500), console.log("店铺名称：" + ($.shopName || "未知") + "\n活动奖品：" + $.drawContentVOs + "\n"));
    await takePostRequest("shareSuccess");
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    await takePostRequest("startAnswer");
    if (!$.canJoin || $.needOpenCard) return;
    if (!$.clearance) {
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      for (o of $.questions) {
        $.realAnswer = o.realAnswer;
        $.questionId = o.id;
        await takePostRequest("answer");
        await $.wait(1500);
      }
      console.log("");
      for (let _0x7d2cc9 = 0; _0x7d2cc9 < 20; _0x7d2cc9++) {
        await takePostRequest("getPrize");
        if ($.activityEnd || $.drawStop) return;
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      }
    } else console.log("已经答题通关了哟~");
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
  } catch (_0x25752f) {
    console.log(_0x25752f);
  }
}
async function takePostRequest(_0x48d779) {
  if ($.outFlag) return;
  let _0x249837 = domains,
    _0x26baf6 = "",
    _0x4b11e5 = "POST";
  switch (_0x48d779) {
    case "getMyPing":
      url = _0x249837 + "/customer/getMyPing";
      _0x26baf6 = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      url = _0x249837 + "/customer/getSimpleActInfoVo";
      _0x26baf6 = "activityId=" + $.activityId;
      break;
    case "getShopInfoVO":
      url = _0x249837 + "/wxActionCommon/getShopInfoVO";
      _0x26baf6 = "&userId=" + $.venderId;
      break;
    case "getOpenCardInfo":
      url = _0x249837 + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      _0x26baf6 = "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType;
      break;
    case "getActMemberInfo":
      url = _0x249837 + "/wxCommonInfo/getActMemberInfo";
      _0x26baf6 = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin;
      break;
    case "accessLog":
      url = _0x249837 + "/common/accessLog";
      _0x26baf6 = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      url = _0x249837 + "/common/accessLogWithAD";
      _0x26baf6 = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app";
      break;
    case "activityContent":
      url = _0x249837 + "/wxKnowledgeActivity/activityContent";
      _0x26baf6 = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "startAnswer":
      url = _0x249837 + "/wxKnowledgeActivity/startAnswer";
      _0x26baf6 = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "shareSuccess":
      url = _0x249837 + "/wxKnowledgeActivity/shareSuccess";
      _0x26baf6 = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "answer":
      url = _0x249837 + "/wxKnowledgeActivity/answer";
      _0x26baf6 = "questionId=" + $.questionId + "&detailId=" + $.id + "&answer=" + $.realAnswer;
      break;
    case "getPrize":
      url = _0x249837 + "/wxKnowledgeActivity/getPrize";
      _0x26baf6 = "detailId=" + $.id;
      break;
    case "getUserInfo":
      url = _0x249837 + "/wxActionCommon/getUserInfo";
      _0x26baf6 = "pin=" + $.FormatPin;
      break;
    default:
      console.log("错误" + _0x48d779);
  }
  let _0x3b1f53 = getPostRequest(url, _0x26baf6, _0x4b11e5);
  return new Promise(async _0x1cc02f => {
    $.post(_0x3b1f53, (_0x434f98, _0x2852ef, _0x830c7b) => {
      try {
        setActivityCookie(_0x2852ef);
        _0x434f98 ? (_0x2852ef && typeof _0x2852ef.statusCode != "undefined" && _0x2852ef.statusCode == 493 && (console.log(_0x48d779 + " 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(_0x434f98, _0x434f98)), console.log(_0x48d779 + " API请求失败，请检查网路重试")) : dealReturn(_0x48d779, _0x830c7b);
      } catch (_0x3bd607) {
        console.log(_0x3bd607, _0x2852ef);
      } finally {
        _0x1cc02f();
      }
    });
  });
}
async function dealReturn(_0x570c4d, _0xb7d8da) {
  let _0x5bea66 = "";
  try {
    (_0x570c4d != "accessLogWithAD" || _0x570c4d != "drawContent" || _0x570c4d != "accessLog") && _0xb7d8da && (_0x5bea66 = JSON.parse(_0xb7d8da));
  } catch (_0x27bd14) {
    console.log(_0x570c4d + " 执行任务异常");
    console.log(_0x27bd14);
    $.runFalag = false;
  }
  try {
    switch (_0x570c4d) {
      case "getMyPing":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) {
            if (_0x5bea66.data && typeof _0x5bea66.data.secretPin != "undefined") $.Pin = _0x5bea66.data.secretPin;
            if (_0x5bea66.data && typeof _0x5bea66.data.nickname != "undefined") $.nickname = _0x5bea66.data.nickname;
          } else _0x5bea66.errorMessage ? console.log(_0x570c4d + " " + (_0x5bea66.errorMessage || "")) : console.log(_0x570c4d + " " + _0xb7d8da);
        } else console.log(_0x570c4d + " " + _0xb7d8da);
        break;
      case "getShopInfoVO":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) $.shopName = _0x5bea66.data.shopName;else _0x5bea66.errorMessage ? console.log(_0x570c4d + " " + (_0x5bea66.errorMessage || "")) : console.log(_0x570c4d + " " + _0xb7d8da);
        } else {
          console.log(_0x570c4d + " " + _0xb7d8da);
        }
        break;
      case "getSimpleActInfoVo":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) {
            if (typeof _0x5bea66.data.shopId != "undefined") $.shopId = _0x5bea66.data.shopId;
            if (typeof _0x5bea66.data.venderId != "undefined") $.venderId = _0x5bea66.data.venderId;
            $.activityType = _0x5bea66.data.activityType;
          } else _0x5bea66.errorMessage ? console.log(_0x570c4d + " " + (_0x5bea66.errorMessage || "")) : console.log(_0x570c4d + " " + _0xb7d8da);
        } else console.log(_0x570c4d + " " + _0xb7d8da);
        break;
      case "startAnswer":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) $.id = _0x5bea66.data.id || 0;else {
            if (_0x5bea66.errorMessage) {
              console.log("" + (_0x5bea66.errorMessage || ""));
              _0x5bea66.errorMessage.indexOf("会员") > -1 && ($.needOpenCard = true);
              for (let _0x42983e of ["通关", "用完", "不足"]) {
                if (_0x5bea66.errorMessage.includes(_0x42983e)) {
                  $.canJoin = false;
                  break;
                }
              }
              if (_0x5bea66.errorMessage.includes("结束")) $.activityEnd = true;
            } else {
              console.log("" + _0xb7d8da);
            }
          }
        } else console.log("" + _0xb7d8da);
        break;
      case "shareSuccess":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) {
            $.sharelist = _0x5bea66.data;
            $.id = _0x5bea66.data.id || 0;
          } else {
            if (_0x5bea66.errorMessage) {
              console.log("" + (_0x5bea66.errorMessage || ""));
            } else console.log("" + _0xb7d8da);
          }
        } else console.log("" + _0xb7d8da);
        break;
      case "getOpenCardInfo":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) $.isOpenCard = _0x5bea66.data.openedCard || false;else {
            if (_0xb7d8da.errorMessage) {
              console.log(_0xb7d8da.errorMessage || "");
              for (let _0xcd0036 of ["未开始", "结束", "不存在", "不在"]) {
                if (_0xb7d8da.errorMessage.includes(_0xcd0036)) {
                  $.activityEnd = true;
                  break;
                }
              }
            } else console.log(_0xb7d8da);
          }
        } else console.log("" + _0xb7d8da);
        break;
      case "getActMemberInfo":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) $.isOpenCard = _0x5bea66.data.openCard || false;else {
            if (_0xb7d8da.errorMessage) {
              console.log(_0xb7d8da.errorMessage || "");
              for (let _0xc48734 of ["未开始", "结束", "不存在", "不在"]) {
                if (_0xb7d8da.errorMessage.includes(_0xc48734)) {
                  $.activityEnd = true;
                  break;
                }
              }
            } else console.log(_0xb7d8da);
          }
        } else console.log("" + _0xb7d8da);
        break;
      case "getUserInfo":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) {
            if (_0x5bea66.data && typeof _0x5bea66.data.yunMidImageUrl != "undefined") $.attrTouXiang = _0x5bea66.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            $.jdNick = _0x5bea66.data.nickname || "";
          } else _0x5bea66.errorMessage ? console.log(_0x570c4d + " " + (_0x5bea66.errorMessage || "")) : console.log(_0x570c4d + " " + _0xb7d8da);
        } else console.log(_0x570c4d + " " + _0xb7d8da);
        break;
      case "activityContent":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) {
            $.clearance = _0x5bea66.data.clearance || false;
            $.needFollow = _0x5bea66.data.needFollow || false;
            $.hasFollow = _0x5bea66.data.hasFollow || false;
            $.endTime = _0x5bea66.data.endTime || "";
            $.startTime = _0x5bea66.data.startTime || "";
            $.questionSize = _0x5bea66.data.questionSize || 0;
            $.activityName = _0x5bea66.data.activityName || "";
            $.hasAnswerTimes = _0x5bea66.data.hasAnswerTimes || 0;
            $.questions = _0x5bea66.data.questions || [];
            $.drawContentVOs = _0x5bea66.data.drawContentVOs[0].name;
          } else {
            if (_0x5bea66.errorMessage) {
              if (_0x5bea66.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(_0x570c4d + " " + (_0x5bea66.errorMessage || ""));
            } else console.log(_0x570c4d + " " + _0xb7d8da);
          }
        } else console.log(_0x570c4d + " " + _0xb7d8da);
        break;
      case "getPrize":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true) {
            $.drawStop = true;
            let _0x204f03 = _0x5bea66.data.drawInfo;
            if (_0x204f03) switch (_0x204f03.type) {
              case 6:
                console.log("🎉 " + _0x204f03.name + " 🐶");
                break;
              case 7:
                generateId = _0x5bea66.data.addressId;
                prizeName = _0x204f03.name;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + prizeName);
                console.log("参考价值：" + _0x204f03.priceInfo + "（元）");
                if (_0x204f03.showImage) console.log("预览图片：" + _0x204f03.showImage);
                let _0x711308 = await wxSavePrize(domains, cookie, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, generateId);
                _0x711308 ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + activityUrl));
                break;
              case 8:
                console.log("🗑️ 专享价");
                break;
              case 9:
                console.log("🗑️ " + _0x204f03.name + " 🎟️");
                break;
              case 13:
              case 14:
              case 15:
                console.log("🎉 恭喜获得" + _0x204f03.name + " 🎁");
                $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + _0x204f03.name + "\n\n" + activityUrl));
                break;
              case 16:
                console.log("🎉 " + _0x204f03.priceInfo + " 🧧");
                break;
              default:
                _0x204f03.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + _0x204f03.name);
                break;
            } else console.log("💨 空气");
          } else {
            if (_0x5bea66.errorMessage) {
              if (!_0x5bea66.errorMessage.includes("火爆")) console.log("" + (_0x5bea66.errorMessage || ""));
              for (let _0x3b1d1a of ["上限", "不足", "超过", "非法操作", "明天", "来晚", "抢光", "发完", "领完", "奖品发送失败", "未开始", "发放完", "全部被领取", "不足", "结束", "京豆计划", "不存在", "不在"]) {
                if (_0x5bea66.errorMessage.includes(_0x3b1d1a)) {
                  $.activityEnd = true;
                  break;
                }
              }
            } else console.log(_0x570c4d + " " + JSON.stringify(_0xb7d8da));
          }
        } else console.log(_0x570c4d + " " + _0xb7d8da);
        break;
      case "answer":
        if (typeof _0x5bea66 == "object") {
          if (_0x5bea66.result && _0x5bea66.result === true && _0x5bea66.data.answerSuccess === true) console.log("答题成功");else _0x5bea66.errorMessage ? console.log("" + (_0x5bea66.errorMessage || "")) : console.log("不知道什么情况~");
        } else console.log(_0x570c4d + " " + _0xb7d8da);
        break;
      case "accessLogWithAD":
      case "accessLog":
      case "drawContent":
        break;
      default:
        console.log(_0x570c4d + "-> " + _0xb7d8da);
    }
    if (typeof _0x5bea66 == "object") {
      if (_0x5bea66.errorMessage) {
        if (_0x5bea66.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (_0xca6f4d) {
    console.log(_0xca6f4d);
  }
}
function getPostRequest(_0x14c14a, _0xea7e18, _0x43865f = "POST") {
  let _0x2e124c = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return _0x14c14a.indexOf("" + domains) > -1 && (_0x2e124c.Referer = activityUrl, _0x2e124c.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": _0x14c14a,
    "method": _0x43865f,
    "headers": _0x2e124c,
    "body": _0xea7e18,
    "timeout": 30000
  };
}
function getFirstLZCK() {
  return new Promise(_0x2cf8a8 => {
    let _0xfebd1d = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0xfebd1d, async (_0x553bd9, _0x2a86b5, _0x344dcc) => {
      try {
        _0x553bd9 ? (console.log(String(_0x553bd9)), console.log("wxCommonInfo API请求失败，请检查网路重试")) : _0x2a86b5.status == 200 && setActivityCookie(_0x2a86b5);
      } catch (_0xba41b3) {
        $.logErr(_0xba41b3, _0x2a86b5);
      } finally {
        _0x2cf8a8();
      }
    });
  });
}
function getFirstCK() {
  return new Promise(_0x49e185 => {
    let _0x1482a7 = {
      "url": activityUrl,
      "headers": {
        "Cookie": cookie,
        "User-Agent": $.UA
      }
    };
    $.get(_0x1482a7, async (_0x3d7d05, _0x556dfa, _0x499e1b) => {
      try {
        if (_0x3d7d05) {
          console.log(String(_0x3d7d05));
          console.log("getFirstCK API请求失败，请检查网路重试");
        } else {
          let _0x23ec36 = _0x499e1b.match(/(活动已结束)/) && _0x499e1b.match(/(活动已结束)/)[1] || _0x499e1b.match(/(活动未开始)/) && _0x499e1b.match(/(活动未开始)/)[1] || "";
          _0x23ec36 && ($.activityEnd = true, console.log("活动已结束或者未开始"));
          _0x556dfa.status == 200 && setActivityCookie(_0x556dfa);
        }
      } catch (_0x153d99) {
        $.logErr(_0x153d99, _0x556dfa);
      } finally {
        _0x49e185();
      }
    });
  });
}
function setActivityCookie(_0xffd42a) {
  if (_0xffd42a) {
    if (_0xffd42a.headers["set-cookie"]) {
      cookie = "";
      for (let _0x5cf7e2 of _0xffd42a.headers["set-cookie"]) {
        lz_cookie[_0x5cf7e2.split(";")[0].substr(0, _0x5cf7e2.split(";")[0].indexOf("="))] = _0x5cf7e2.split(";")[0].substr(_0x5cf7e2.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x34dc27 of Object.keys(lz_cookie)) {
        cookie += _0x34dc27 + "=" + lz_cookie[_0x34dc27] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(_0x478f8e) {
  _0x478f8e = _0x478f8e || 32;
  let _0x39c182 = "abcdef0123456789",
    _0x322d7c = _0x39c182.length,
    _0x27f4f1 = "";
  for (i = 0; i < _0x478f8e; i++) _0x27f4f1 += _0x39c182.charAt(Math.floor(Math.random() * _0x322d7c));
  return _0x27f4f1;
}
function jsonParse(_0x2d2869) {
  if (typeof _0x2d2869 == "string") {
    try {
      return JSON.parse(_0x2d2869);
    } catch (_0x119512) {
      return console.log(_0x119512), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function getQueryString(_0x353ac6, _0x42454b) {
  let _0x659bda = new RegExp("(^|[&?])" + _0x42454b + "=([^&]*)(&|$)"),
    _0x4dc0d8 = _0x353ac6.match(_0x659bda);
  if (_0x4dc0d8 != null) return decodeURIComponent(_0x4dc0d8[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x3e0bf1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x49af36 = "";
    if ($.shopactivityId) _0x49af36 = ",\"activityId\":" + $.shopactivityId;
    const _0x13543b = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x49af36 + ",\"channel\":406}",
      _0x1545c9 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x13543b)
      },
      _0x2fa5a4 = await getH5st("8adfb", _0x1545c9),
      _0x537cb0 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x13543b + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x2fa5a4),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x537cb0, async (_0x4fdfb6, _0x19d8ff, _0xb63bca) => {
      try {
        _0xb63bca = _0xb63bca && _0xb63bca.match(/jsonp_.*?\((.*?)\);/) && _0xb63bca.match(/jsonp_.*?\((.*?)\);/)[1] || _0xb63bca;
        let _0x2aada9 = $.toObj(_0xb63bca, _0xb63bca);
        if (_0x2aada9 && typeof _0x2aada9 == "object") {
          if (_0x2aada9 && _0x2aada9.success === true) {
            console.log(_0x2aada9.message);
            $.errorJoinShop = _0x2aada9.message;
            if (_0x2aada9.result && _0x2aada9.result.giftInfo) for (let _0x24fd32 of _0x2aada9.result.giftInfo.giftList) {
              console.log("入会获得: " + _0x24fd32.discountString + _0x24fd32.prizeName + _0x24fd32.secondLineDesc);
            }
            console.log("");
          } else _0x2aada9 && typeof _0x2aada9 == "object" && _0x2aada9.message ? ($.errorJoinShop = _0x2aada9.message, console.log("" + (_0x2aada9.message || ""))) : console.log(_0xb63bca);
        } else console.log(_0xb63bca);
      } catch (_0x1f4332) {
        $.logErr(_0x1f4332, _0x19d8ff);
      } finally {
        _0x3e0bf1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x342046 => {
    let _0x2bfb93 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x3cdea7 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x2bfb93)
      },
      _0x10f4c1 = await getH5st("ef79a", _0x3cdea7),
      _0x6e7fa7 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x2bfb93 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x10f4c1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x6e7fa7, async (_0x47f784, _0x5967d3, _0x30cfd1) => {
      try {
        _0x30cfd1 = _0x30cfd1 && _0x30cfd1.match(/jsonp_.*?\((.*?)\);/) && _0x30cfd1.match(/jsonp_.*?\((.*?)\);/)[1] || _0x30cfd1;
        let _0x26b29 = $.toObj(_0x30cfd1, _0x30cfd1);
        _0x26b29 && typeof _0x26b29 == "object" ? _0x26b29 && _0x26b29.success == true && (console.log("\n去加入店铺会员：" + (_0x26b29.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x26b29.result.interestsRuleList && _0x26b29.result.interestsRuleList[0] && _0x26b29.result.interestsRuleList[0].interestsInfo && _0x26b29.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x30cfd1);
      } catch (_0x18a4b3) {
        $.logErr(_0x18a4b3, _0x5967d3);
      } finally {
        _0x342046();
      }
    });
  });
}
