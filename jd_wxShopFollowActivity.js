/*
活动名称：关注店铺有礼 · 超级无线/超级会员
活动链接：https://cjhy-isv.isvjcloud.com/wxShopFollowActivity/activity?activityId=<活动id>
         https://lzkj-isv.isvjcloud.com/wxShopFollowActivity/activity/activity?activityId=<活动id>
环境变量：jd_wxShopFollowActivity_activityUrl // 活动链接
         jd_wxShopFollowActivity_openCard // 是否开卡，默认不开卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('关注店铺有礼（超级无线/超级会员）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x44b51c => {
    cookiesArr.push(jdCookieNode[_0x44b51c]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x4150a6 => _0x4150a6.cookie)].filter(_0x20395d => !!_0x20395d);
let activityUrl = process.env.jd_wxShopFollowActivity_activityUrl ? process.env.jd_wxShopFollowActivity_activityUrl : "",
  openCard = process.env.jd_wxShopFollowActivity_openCard === "true" ? true : false,
  activityId = "";
allMessage = "";
message = "";
$.hasEnd = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  activityCookie = "";
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
  $.domain_mode = null;
  if ($.domain.includes("cjhy")) $.domain_mode = "cjhy";
  $.domain.includes("lzkj") && ($.domain_mode = "lzkj", $.domain = "lzkj-isv.isvjd.com");
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
  for (let _0x4ec07b = 0; _0x4ec07b < cookiesArr.length; _0x4ec07b++) {
    cookie = cookiesArr[_0x4ec07b];
    originCookie = cookiesArr[_0x4ec07b];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x4ec07b + 1;
      message = "";
      $.bean = 0;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await getUA();
      await run();
      await $.wait(1000);
      if ($.activityEnd || $.hasEnd) break;
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(_0x883227 => $.logErr(_0x883227)).finally(() => $.done());
async function run() {
  try {
    lz_jdpin_token_cookie = "";
    $.token = "";
    $.Pin = "";
    $.needOpenCard = false;
    switch ($.domain_mode) {
      case "lzkj":
        await getFirstLZCK();
        break;
      case "cjhy":
        await getFirstCK();
        break;
    }
    if ($.hasEnd || $.activityEnd) return;
    await $.wait(500);
    if ($.index == 1) {
      await takePostRequest("getSimpleActInfoVo");
      if (!$.venderId) {
        $.activityEnd = true;
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        return;
      }
      await $.wait(500);
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
      $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
      switch ($.domain_mode) {
        case "lzkj":
          await takePostRequest("accessLogWithAD");
          break;
        case "cjhy":
          await takePostRequest("accessLog");
          break;
      }
      $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
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
      if ($.hasEnd || $.activityEnd) return;
      $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
      if (!$.isOpenCard) {
        $.errorJoinShop = "";
        $.joinVenderId = $.venderId;
        for (let _0x566722 = 0; _0x566722 < Array(5).length; _0x566722++) {
          if (_0x566722 > 0) console.log("第" + _0x566722 + "次 重新开卡");
          await joinShop();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
            break;
          }
        }
        $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("❌ 开卡失败，重新执行脚本");
      }
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.activityContent = "";
    await takePostRequest("activityContent");
    if ($.hasEnd) {
      console.log("未能获取到活动信息！");
      return;
    }
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    if ($.activityContent) {
      $.canJoin = $.activityContent.canJoin || false;
      $.hasFollow = $.activityContent.hasFollow || false;
      $.needFollow = $.activityContent.needFollow || false;
      $.hasJoin = $.activityContent.hasJoin;
      if ($.index == 1) {
        let _0x16610e = $.activityContent.drawContentVOs,
          _0x73c1b8 = false;
        await takePostRequest("shopInfo");
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
        let _0x222980 = "",
          _0x3a7653 = "";
        $.prizeList = "";
        for (let _0x8c4158 = 0; _0x8c4158 < _0x16610e.length; _0x8c4158++) {
          _0x3a7653 = _0x16610e[_0x8c4158].name;
          _0x222980 = _0x16610e[_0x8c4158].id;
          if (_0x222980 == 0) {
            $.prizeList += "谢谢参与";
            break;
          } else {
            $.prizeList += "\n  " + _0x3a7653 + "（" + (_0x16610e[_0x8c4158].prizeNum - _0x16610e[_0x8c4158].hasSendPrizeNum) + "/" + _0x16610e[_0x8c4158].prizeNum + "）";
            if (_0x16610e[_0x8c4158].hasSendPrizeNum < _0x16610e[_0x8c4158].prizeNum) _0x73c1b8 = true;
          }
        }
        console.log("店铺名称：" + ($.shopName || "未知") + "\n店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + $.prizeList + "\n");
        if (_0x16610e.length == 1 && _0x16610e[0].name.includes("券")) {
          console.log("垃圾活动不跑了~");
          $.activityEnd = true;
          return;
        }
        if (!_0x73c1b8) {
          console.log("奖品已经全部发完了，下次早点来吧~");
          $.activityEnd = true;
          return;
        }
      }
      if ($.hasJoin) {
        $.log("已经参与过了哟~");
        return;
      }
    } else {
      $.log("未能成功获取到活动信息");
      return;
    }
    if (!$.canJoin && $.needFollow && $.hasFollow) {
      await unfollow();
      await $.wait(1000);
    } else {
      if (!$.canJoin) {
        $.log("活动仅限店铺会员参与哦~");
        return;
      }
    }
    await takePostRequest("follow");
    if ($.hasEnd || $.activityEnd) return;
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    $.drawStop = false;
    for (let _0x1cc218 = 1; _0x1cc218 <= 20; _0x1cc218++) {
      await takePostRequest("getPrize");
      if ($.drawStop || $.needOpenCard) break;
      if ($.activityEnd) return;
      $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    if ($.hasEnd) {
      console.log("此ip已被限制，请过10分钟后再执行脚本");
      return;
    }
  } catch (_0x39813a) {
    console.log(_0x39813a);
  }
}
async function takePostRequest(_0xdde218) {
  if ($.hasEnd) return;
  let _0x353358 = domains,
    _0x2ceb75 = "",
    _0x2779c3 = "POST";
  switch (_0xdde218) {
    case "getMyPing":
      url = _0x353358 + "/customer/getMyPing";
      _0x2ceb75 = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      url = _0x353358 + "/customer/getSimpleActInfoVo";
      _0x2ceb75 = "activityId=" + $.activityId;
      break;
    case "getOpenCardInfo":
      url = _0x353358 + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      _0x2ceb75 = "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType;
      break;
    case "getActMemberInfo":
      url = _0x353358 + "/wxCommonInfo/getActMemberInfo";
      _0x2ceb75 = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin;
      break;
    case "accessLog":
      url = _0x353358 + "/common/accessLog";
      _0x2ceb75 = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      url = _0x353358 + "/common/accessLogWithAD";
      _0x2ceb75 = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app";
      break;
    case "shopInfo":
      url = _0x353358 + "/wxShopFollowActivity/shopInfo";
      _0x2ceb75 = "activityId=" + $.activityId;
      break;
    case "activityContent":
      url = _0x353358 + "/wxShopFollowActivity/activityContentOnly";
      _0x2ceb75 = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "follow":
      url = _0x353358 + "/wxShopFollowActivity/follow";
      _0x2ceb75 = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "getPrize":
      url = _0x353358 + "/wxShopFollowActivity/getPrize";
      _0x2ceb75 = "activityId=" + $.activityId + "&pin=" + $.FormatPin;
      break;
    case "getShareRecord":
      url = _0x353358 + "/wxShopFollowActivity/shopInfo";
      _0x2ceb75 = "activityId=" + $.activityId;
      break;
    case "getUserInfo":
      url = _0x353358 + "/wxActionCommon/getUserInfo";
      _0x2ceb75 = "pin=" + $.FormatPin;
      break;
    default:
      console.log("错误" + _0xdde218);
  }
  let _0x3a496f = getPostRequest(url, _0x2ceb75, _0x2779c3);
  return new Promise(async _0x35257a => {
    $.post(_0x3a496f, (_0xbabc13, _0x88aa39, _0x4bce13) => {
      try {
        setActivityCookie(_0x88aa39);
        if (_0xbabc13) {
          if (_0x88aa39 && typeof _0x88aa39.statusCode != "undefined") {
            if (_0x88aa39.statusCode == 493) {
              console.log(_0xdde218 + " 此ip已被限制，请过10分钟后再执行脚本");
              $.hasEnd = true;
            }
          }
          console.log("" + $.toStr(_0xbabc13, _0xbabc13));
          console.log("API请求失败，请检查网路重试");
        } else dealReturn(_0xdde218, _0x4bce13);
      } catch (_0x478e5b) {
        console.log(_0x478e5b, _0x88aa39);
      } finally {
        _0x35257a();
      }
    });
  });
}
async function dealReturn(_0x2078f6, _0x3e3bfc) {
  let _0x504651 = "";
  try {
    (_0x2078f6 != "accessLogWithAD" || _0x2078f6 != "drawContent") && _0x3e3bfc && (_0x504651 = JSON.parse(_0x3e3bfc));
  } catch (_0x524fbf) {
    console.log("执行任务异常");
    console.log(_0x3e3bfc);
    $.runFalag = false;
  }
  try {
    switch (_0x2078f6) {
      case "getMyPing":
        if (typeof _0x504651 == "object") {
          if (_0x504651.result && _0x504651.result === true) {
            if (_0x504651.data && typeof _0x504651.data.secretPin != "undefined") $.Pin = _0x504651.data.secretPin;
            if (_0x504651.data && typeof _0x504651.data.nickname != "undefined") $.nickname = _0x504651.data.nickname;
          } else _0x504651.errorMessage ? console.log("" + (_0x504651.errorMessage || "")) : console.log("" + _0x3e3bfc);
        } else console.log("" + _0x3e3bfc);
        break;
      case "getSimpleActInfoVo":
        if (typeof _0x504651 == "object") {
          if (_0x504651.result && _0x504651.result === true) {
            if (_0x504651.data && typeof _0x504651.data.shopId != "undefined") $.shopId = _0x504651.data.shopId;
            if (_0x504651.data && typeof _0x504651.data.venderId != "undefined") $.venderId = _0x504651.data.venderId;
            if (_0x504651.data && typeof _0x504651.data.activityType != "undefined") $.activityType = _0x504651.data.activityType;
          } else {
            if (_0x504651.errorMessage) console.log("" + (_0x504651.errorMessage || ""));else {
              console.log("" + _0x3e3bfc);
            }
          }
        } else console.log("" + _0x3e3bfc);
        break;
      case "follow":
        if (typeof _0x504651 == "object") {
          if (_0x504651.result && _0x504651.result === true && _0x504651.count === 0) {} else {
            if (_0x504651.errorMessage) {
              console.log(_0x504651.errorMessage || "");
              for (let _0x4110c2 of ["未开始", "结束", "不存在", "不在"]) {
                if (_0x504651.errorMessage.includes(_0x4110c2)) {
                  $.activityEnd = true;
                  break;
                }
              }
            } else console.log("" + _0x3e3bfc);
          }
        } else console.log("" + _0x3e3bfc);
        break;
      case "getOpenCardInfo":
        if (typeof _0x504651 == "object") {
          if (_0x504651.result && _0x504651.result === true) $.isOpenCard = _0x504651.data.openedCard || false;else {
            if (_0x3e3bfc.errorMessage) {
              console.log(_0x3e3bfc.errorMessage || "");
              for (let _0x1a3fb6 of ["未开始", "结束", "不存在", "不在"]) {
                if (_0x3e3bfc.errorMessage.includes(_0x1a3fb6)) {
                  $.activityEnd = true;
                  break;
                }
              }
            } else console.log(_0x3e3bfc);
          }
        } else console.log("" + _0x3e3bfc);
        break;
      case "getActMemberInfo":
        if (typeof _0x504651 == "object") {
          if (_0x504651.result && _0x504651.result === true) $.isOpenCard = _0x504651.data.openCard || false;else {
            if (_0x3e3bfc.errorMessage) {
              console.log(_0x3e3bfc.errorMessage || "");
              for (let _0x46f627 of ["未开始", "结束", "不存在", "不在"]) {
                if (_0x3e3bfc.errorMessage.includes(_0x46f627)) {
                  $.activityEnd = true;
                  break;
                }
              }
            } else console.log(_0x3e3bfc);
          }
        } else console.log("" + _0x3e3bfc);
        break;
      case "getUserInfo":
        if (typeof _0x504651 == "object") {
          if (_0x504651.result && _0x504651.result === true) {
            if (_0x504651.data && typeof _0x504651.data.yunMidImageUrl != "undefined") $.attrTouXiang = _0x504651.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
            $.jdNick = _0x504651.data.nickname || "";
          } else _0x504651.errorMessage ? console.log("" + (_0x504651.errorMessage || "")) : console.log("" + _0x3e3bfc);
        } else console.log("" + _0x3e3bfc);
        break;
      case "shopInfo":
        if (typeof _0x504651 == "object") {
          if (_0x504651.result && _0x504651.result === true) $.shopName = _0x504651.data.shopName;else {
            if (_0x504651.errorMessage) {
              if (_0x504651.errorMessage.indexOf("结束") > -1 && _0x504651.errorMessage.indexOf("仅限") > -1) $.activityEnd = true;
              console.log("" + (_0x504651.errorMessage || ""));
            } else {
              console.log("" + _0x3e3bfc);
            }
          }
        } else console.log("" + _0x3e3bfc);
        break;
      case "activityContent":
        if (typeof _0x504651 == "object") {
          if (_0x504651.result && _0x504651.result === true) $.activityContent = _0x504651.data;else {
            if (_0x504651.errorMessage) {
              if (_0x504651.errorMessage.indexOf("结束") > -1 && _0x504651.errorMessage.indexOf("仅限") > -1) $.activityEnd = true;
              console.log("" + (_0x504651.errorMessage || ""));
            } else console.log("" + _0x3e3bfc);
          }
        } else console.log("" + _0x3e3bfc);
        break;
      case "getPrize":
        if (typeof _0x504651 == "object") {
          if (_0x504651.result && _0x504651.result === true) {
            $.drawStop = true;
            let _0x321808 = _0x504651.data.drawInfo;
            if (_0x321808) switch (_0x321808.type) {
              case 6:
                console.log("🎉 " + _0x321808.name + " 🐶");
                break;
              case 7:
                const _0x48fb64 = _0x504651.data.addressId;
                prizeName = _0x321808.name;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + prizeName);
                console.log("参考价值：" + _0x321808.priceInfo + "（元）");
                if (_0x321808.showImage) console.log("预览图片：" + _0x321808.showImage);
                let _0x470f4a = await wxSavePrize(domains, cookie, $.UA, $.activityId, $.activityType, $.venderId, $.Pin, prizeName, _0x48fb64);
                if (_0x470f4a) $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，已成功自动登记收货地址\n\n" + activityUrl));else {
                  $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + activityUrl));
                }
                break;
              case 8:
                console.log("🗑️ 专享价");
                break;
              case 9:
                console.log("🗑️ " + _0x321808.name + " 🎟️");
                break;
              case 13:
              case 14:
              case 15:
                console.log("🎉 恭喜获得" + _0x321808.name + " 🎁");
                $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + _0x321808.name + "\n\n" + activityUrl));
                break;
              case 16:
                console.log("🎉 " + _0x321808.priceInfo + " 🧧");
                break;
              default:
                if (_0x321808.name.includes("券")) {
                  console.log("🗑️ 优惠券");
                } else {
                  console.log("获得：" + _0x321808.name);
                }
                break;
            } else console.log("💨 空气");
          } else {
            if (_0x504651.errorMessage) {
              for (let _0x412c98 of ["会员", "开卡"]) {
                if (_0x504651.errorMessage.includes(_0x412c98)) {
                  $.needOpenCard = true;
                  console.log("活动仅限店铺会员参与哦~");
                  break;
                }
              }
              for (let _0x432637 of ["上限", "不足", "超过", "非法操作", "明天", "来晚", "抢光", "发完", "领完", "奖品发送失败", "未开始", "发放完", "全部被领取", "不足", "结束", "京豆计划", "不存在", "不在"]) {
                if (_0x504651.errorMessage.includes(_0x432637)) {
                  $.activityEnd = true;
                  break;
                }
              }
              !_0x504651.errorMessage.includes("火爆") && !_0x504651.errorMessage.includes("擦肩") && !_0x504651.errorMessage.includes("缓存") && !$.needOpenCard && (console.log(_0x504651.errorMessage || ""), $.drawStop = true);
            } else console.log(JSON.stringify(_0x3e3bfc));
          }
        } else console.log("" + _0x3e3bfc);
        break;
      case "accessLogWithAD":
      case "accessLog":
      case "drawContent":
        break;
      default:
        console.log(_0x2078f6 + "-> " + _0x3e3bfc);
    }
  } catch (_0x439b52) {
    console.log(_0x439b52);
  }
}
function getPostRequest(_0x4dd8b4, _0x3f0114, _0x1c995c = "POST") {
  let _0x2bd6d9 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return _0x4dd8b4.indexOf("" + domains) > -1 && (_0x2bd6d9.Referer = domains + "/wxShopFollowActivity/activity?activityId=" + $.activityId, _0x2bd6d9.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": _0x4dd8b4,
    "method": _0x1c995c,
    "headers": _0x2bd6d9,
    "body": _0x3f0114,
    "timeout": 30000
  };
}
async function getFirstLZCK() {
  return new Promise(_0x22bd95 => {
    let _0xbf153c = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0xbf153c, async (_0x2199f1, _0x4242e8, _0x483d4c) => {
      try {
        _0x2199f1 ? (_0x4242e8 && typeof _0x4242e8.statusCode != "undefined" && _0x4242e8.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.hasEnd = true), console.log(String(_0x2199f1)), console.log("wxCommonInfo API请求失败，请检查网路重试")) : _0x4242e8.status == 200 && setActivityCookie(_0x4242e8);
      } catch (_0x21bfc9) {
        $.logErr(_0x21bfc9, _0x4242e8);
      } finally {
        _0x22bd95();
      }
    });
  });
}
async function getFirstCK() {
  return new Promise(_0xf5d440 => {
    let _0x31396c = {
      "url": activityUrl,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(_0x31396c, async (_0x1bc675, _0x3c174e, _0x3524d6) => {
      try {
        if (_0x1bc675) {
          console.log(String(_0x1bc675));
          console.log("getFirstCK API请求失败，请检查网路重试");
        } else {
          let _0x56fc34 = _0x3524d6.match(/(活动已经结束)/) && _0x3524d6.match(/(活动已经结束)/)[1] || "";
          _0x56fc34 && ($.activityEnd = true, console.log("活动已结束"));
          _0x3c174e.status == 200 && setActivityCookie(_0x3c174e);
        }
      } catch (_0x595819) {
        $.logErr(_0x595819, _0x3c174e);
      } finally {
        _0xf5d440();
      }
    });
  });
}
async function unfollow() {
  let _0x41ecaf = "{\"follow\":\"false\",\"shopId\":\"" + $.shopId + "\",\"award\":\"true\",\"sourceRpc\":\"shop_app_home_follow\"}",
    _0x33589f = {
      "url": "https://api.m.jd.com/client.action?functionId=followShop",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "api.m.jd.com",
        "Connection": "keep-alive",
        "Accept-Language": "zh-cn",
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.4(0x1800042c) NetType/4G Language/zh_CN miniProgram"
      },
      "body": "body=" + encodeURIComponent(_0x41ecaf) + "&osVersion=13.7&appid=wh5&clientVersion=9.2.0&loginType=2&loginWQBiz=interact"
    };
  return new Promise(_0x38f813 => {
    $.post(_0x33589f, (_0x190eca, _0x43cdf4, _0x55c333) => {
      try {
        if (_0x190eca) $.log(_0x190eca);else {
          if (_0x55c333) {
            if (_0x55c333.code == 0) {} else _0x55c333.msg && console.log(_0x55c333.msg);
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0x48835a) {
        $.log(_0x48835a);
      } finally {
        _0x38f813();
      }
    });
  });
}
function setActivityCookie(_0x34b24d) {
  if (_0x34b24d) {
    if (_0x34b24d.headers["set-cookie"]) {
      cookie = "";
      for (let _0x29afa2 of _0x34b24d.headers["set-cookie"]) {
        lz_cookie[_0x29afa2.split(";")[0].substr(0, _0x29afa2.split(";")[0].indexOf("="))] = _0x29afa2.split(";")[0].substr(_0x29afa2.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x33a636 of Object.keys(lz_cookie)) {
        cookie += _0x33a636 + "=" + lz_cookie[_0x33a636] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(_0x427610) {
  _0x427610 = _0x427610 || 32;
  let _0xf28058 = "abcdef0123456789",
    _0x206e1c = _0xf28058.length,
    _0x27ccbe = "";
  for (i = 0; i < _0x427610; i++) _0x27ccbe += _0xf28058.charAt(Math.floor(Math.random() * _0x206e1c));
  return _0x27ccbe;
}
function jsonParse(_0x49b1ac) {
  if (typeof _0x49b1ac == "string") try {
    return JSON.parse(_0x49b1ac);
  } catch (_0x2cfdf7) {
    return console.log(_0x2cfdf7), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(_0x337612, _0x579298) {
  let _0x4740c6 = new RegExp("(^|[&?])" + _0x579298 + "=([^&]*)(&|$)"),
    _0x4f0233 = _0x337612.match(_0x4740c6);
  if (_0x4f0233 != null) return decodeURIComponent(_0x4f0233[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0xb52324 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    await getshopactivityId();
    let _0x2a1a91 = "";
    if ($.shopactivityId) _0x2a1a91 = ",\"activityId\":" + $.shopactivityId;
    const _0x59d859 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x2a1a91 + ",\"channel\":406}",
      _0xe8beb9 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x59d859)
      },
      _0x1c88a8 = await getH5st("8adfb", _0xe8beb9),
      _0x526b67 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x59d859 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x1c88a8),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x526b67, async (_0x272da0, _0x452a59, _0x505565) => {
      try {
        _0x505565 = _0x505565 && _0x505565.match(/jsonp_.*?\((.*?)\);/) && _0x505565.match(/jsonp_.*?\((.*?)\);/)[1] || _0x505565;
        let _0x1b0b0b = $.toObj(_0x505565, _0x505565);
        if (_0x1b0b0b && typeof _0x1b0b0b == "object") {
          if (_0x1b0b0b && _0x1b0b0b.success === true) {
            console.log(_0x1b0b0b.message);
            $.errorJoinShop = _0x1b0b0b.message;
            console.log("");
          } else {
            if (_0x1b0b0b && typeof _0x1b0b0b == "object" && _0x1b0b0b.message) {
              $.errorJoinShop = _0x1b0b0b.message;
              console.log("" + (_0x1b0b0b.message || ""));
            } else {
              console.log(_0x505565);
            }
          }
        } else {
          console.log(_0x505565);
        }
      } catch (_0x2219d7) {
        $.logErr(_0x2219d7, _0x452a59);
      } finally {
        _0xb52324();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x351997 => {
    let _0x54902b = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x5e198f = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x54902b)
      },
      _0x51b492 = await getH5st("ef79a", _0x5e198f),
      _0x2ec84c = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x54902b + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x51b492),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x2ec84c, async (_0x4c97ad, _0x689fbd, _0x228ea5) => {
      try {
        _0x228ea5 = _0x228ea5 && _0x228ea5.match(/jsonp_.*?\((.*?)\);/) && _0x228ea5.match(/jsonp_.*?\((.*?)\);/)[1] || _0x228ea5;
        let _0x31642e = $.toObj(_0x228ea5, _0x228ea5);
        _0x31642e && typeof _0x31642e == "object" ? _0x31642e && _0x31642e.success == true && (console.log("去加入店铺会员：" + (_0x31642e.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x31642e.result.interestsRuleList && _0x31642e.result.interestsRuleList[0] && _0x31642e.result.interestsRuleList[0].interestsInfo && _0x31642e.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x228ea5);
      } catch (_0x1cb531) {
        $.logErr(_0x1cb531, _0x689fbd);
      } finally {
        _0x351997();
      }
    });
  });
}
