/*
活动名称：店铺礼包 · 超级无线/超级会员/fjzy
活动链接：https://lzkj-isv.isvjd.com/wxShopGift/activity?activityId=<活动id>
		 https://cjhy-isv.isvjcloud.com/wxShopGift/activity?activityId=<活动id>
		 https://fjzy-isv.isvjcloud.com/index.php?mod=wxShopGift&c=giftOne&activeId=<活动id>
环境变量：jd_wxShopGift_activityUrl // 活动链接
		 jd_wxShopGift_openCard // 是否开卡，默认不开卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺礼包（超级无线/超级会员）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let activityUrl = process.env.jd_wxShopGift_activityUrl ? process.env.jd_wxShopGift_activityUrl : "",
  openCard = process.env.jd_wxShopGift_openCard === "true" ? true : false,
  lz_cookie = {},
  activityCookie = "",
  cookiesArr = [],
  cookie = "";
messageTitle = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(_0x329072 => {
    cookiesArr.push(jdCookieNode[_0x329072]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x3c2912 => _0x3c2912.cookie)].filter(_0x22542c => !!_0x22542c);
if (activityUrl) {
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
  $.domain.includes("fjzy") ? $.activityId = getQueryString("" + activityUrl, "activeId") : $.activityId = getQueryString("" + activityUrl, "activityId");
  $.domain_mode = null;
  if ($.domain.includes("cjhy")) $.domain_mode = "cjhy";
  if ($.domain.includes("lzkj")) $.domain_mode = "lzkj";
  if ($.domain.includes("fjzy")) $.domain_mode = "fjzy";
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
  if (!$.activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityEnd = false;
  $.venderId = null;
  $.outFlag = false;
  $.hasPrize = false;
  for (let _0x5ca383 = 0; _0x5ca383 < cookiesArr.length; _0x5ca383++) {
    if (cookiesArr[_0x5ca383]) {
      cookie = cookiesArr[_0x5ca383];
      originCookie = cookiesArr[_0x5ca383];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x5ca383 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      getUA();
      if ($.domain.includes("fjzy")) {
        await Mains();
      } else await Main();
      await $.wait(1300);
      $.domain_mode == "cjhy" ? await $.wait(2000) : await $.wait(1000);
      if ($.hasEnd || $.activityEnd || $.outFlag) break;
    }
  }
})().catch(_0x171205 => {
  $.log("", " " + $.name + ", 失败! 原因: " + _0x171205 + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  $.token = "";
  $.secretPin = "";
  $.isOpenCard = false;
  switch ($.domain_mode) {
    case "lzkj":
      await getFirstLZCK();
      break;
    case "cjhy":
      await getFirstCK();
      break;
  }
  if ($.hasEnd || $.activityEnd || $.outFlag) return;
  await $.wait(500);
  if ($.index == 1) {
    await getSimpleActInfoVo("/customer/getSimpleActInfoVo", "activityId=" + $.activityId);
    if (!$.venderId) {
      $.hasEnd = true;
      console.log("getSimpleActInfoVo 未能获取店铺信息");
      return;
    }
  }
  $.token = await getToken(originCookie, domains);
  if ($.token) {
    await getMyPing();
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    switch ($.domain_mode) {
      case "lzkj":
        $.FormatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.FormatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
    switch ($.domain_mode) {
      case "lzkj":
        await accessLogWithAD();
        break;
      case "cjhy":
        await accessLog();
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
        await getOpenCardStatus("/wxCommonInfo/getActMemberInfo", "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin);
        break;
      case "cjhy":
        await getOpenCardStatus("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
        break;
    }
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    if (!$.isOpenCard) {
      $.errorJoinShop = "";
      $.joinVenderId = $.venderId;
      for (let _0x5d45a9 = 0; _0x5d45a9 < Array(5).length; _0x5d45a9++) {
        if (_0x5d45a9 > 0) console.log("第" + _0x5d45a9 + "次 重新开卡");
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
  var _0x4e80e1 = "";
  _0x4e80e1 = await getActivityContent("/wxShopGift/activityContent", "activityId=" + $.activityId + "&buyerPin=" + $.FormatPin);
  if ($.hasEnd) {
    console.log("未能获取到活动信息！");
    return;
  }
  if ($.index == 1) {
    if (prizeArr.length === 0) {
      console.log("未能获取到活动奖品信息！");
      $.hasEnd = true;
      return;
    }
    console.log("活动奖品：" + prizeArr.join("、") + "\n");
    if (!$.hasPrize) {
      console.log("垃圾活动不跑了~");
      $.hasEnd = true;
      return;
    }
  }
  $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  if (_0x4e80e1) {
    if (_0x4e80e1.result && _0x4e80e1.data) switch ($.domain_mode) {
      case "lzkj":
        await draw("/wxShopGift/draw", "activityId=" + $.activityId + "&buyerPin=" + $.FormatPin + "&hasFollow=false&accessType=app");
        break;
      case "cjhy":
        await newFollowShop("/wxActionCommon/newFollowShop", "activityId=" + $.activityId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType + "&venderId=" + $.venderId);
        await draw("/wxShopGift/draw", "activityId=" + $.activityId + "&buyerPin=" + $.FormatPin + "&hasFollow=true&accessType=app");
        break;
    } else {
      if (_0x4e80e1.errorMessage) {
        console.log(_0x4e80e1.errorMessage);
        $.hasEnd = true;
        return;
      } else {
        console.log("活动可能已经结束！");
        $.hasEnd = true;
        return;
      }
    }
  } else {
    console.log("未能获取到活动信息！");
    $.hasEnd = true;
    return;
  }
}
async function Mains() {
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.activityId) {
    await wxShopGift();
    if ($.hasEnd === true) return;
    await buyerTokenJson();
    await $.wait(1000);
    await drawShopGift();
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function wxShopGift() {
  return new Promise(_0x24e0cd => {
    const _0x440ffc = {
      "url": domains + "/index.php?mod=wxShopGift&c=giftOne&activeId=" + $.activityId,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": $.domain,
        "Referer": activityUrl,
        "User-Agent": $.UA
      }
    };
    $.get(_0x440ffc, async (_0x4ec988, _0x55b3ce, _0x4682a1) => {
      try {
        if (_0x4ec988) {
          console.log("" + JSON.stringify(_0x4ec988));
          console.log($.name + " wxShopGift API请求失败，请检查网路重试");
        } else {
          _0x4682a1 = _0x4682a1;
          if (_0x4682a1) {
            let _0x38d24a = _0x4682a1.match(/(活动已结束)/) && _0x4682a1.match(/(活动已结束)/)[1] || _0x4682a1.match(/(哎哟，当前活动尚未开始噢！)/) && _0x4682a1.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            _0x38d24a && ($.activityEnd = true, console.log("活动已结束或者未开始"));
            if ($.index === 1) {
              let _0x569759 = _0x4682a1.match(/id="venderId" value="(.+)"  style/);
              _0x569759 && ($.venderId = _0x569759[1]);
              let _0x2e48c3 = _0x4682a1.match(/id="tempId" value="(.+)"  style/);
              _0x2e48c3 && ($.tempId = _0x2e48c3[1]);
              let _0x3fad0c = _0x4682a1.match(/id="activeUrlId" value="(.+)"  style/);
              _0x3fad0c && ($.activeUrlId = _0x3fad0c[1]);
              let _0x4d44f2 = _0x4682a1.match(/id="isradio" value="(.+)"  style/);
              _0x4d44f2 && ($.isradio = _0x4d44f2[1]);
              let _0x1da537 = _0x4682a1.match(/id="followShop" value="(.+)"  style/);
              _0x1da537 && ($.followShop1 = _0x1da537[1]);
              let _0x40ee99 = _0x4682a1.match(/id="shopActId" value="(.+)"  style/);
              _0x40ee99 && ($.shopActId = _0x40ee99[1]);
              let _0x6498e1 = _0x4682a1.match(/id="token" value="(.+)"  style/);
              _0x6498e1 && ($.token1 = _0x6498e1[1]);
              let _0x55f7c1 = _0x4682a1.match(/class="hdyhtext1">(.+)</);
              _0x55f7c1 && ($.prize = _0x55f7c1[1], console.log("活动奖品：" + $.prize));
            }
          }
          _0x55b3ce.status == 200 && setActivityCookie(_0x55b3ce);
        }
      } catch (_0x1fa2ff) {
        $.logErr(_0x1fa2ff, _0x55b3ce);
      } finally {
        _0x24e0cd();
      }
    });
  });
}
function buyerTokenJson() {
  return new Promise(_0x101f3b => {
    $.buyerTokenJson = {
      "state": "0",
      "data": $.token,
      "msg": ""
    };
    let _0x29a24f = "buyerTokenJson=" + JSON.stringify($.buyerTokenJson) + "&venderId=" + $.venderId + "&token=" + $.token1 + "&shopActId=" + $.shopActId + "&activeUrlId=" + $.activeUrlId + "&tempId=" + $.tempId + "&isradio=" + $.isradio + "&followShop=" + $.followShop1;
    $.post(taskPostUrls("/index.php?mod=wxShopGift&action=buyerTokenJson", _0x29a24f), async (_0x4bfa4a, _0x5a0aef, _0x80e7f6) => {
      try {
        _0x4bfa4a ? (console.log("" + JSON.stringify(_0x4bfa4a)), console.log($.name + " buyerTokenJson API请求失败，请检查网路重试")) : (_0x80e7f6 = JSON.parse(_0x80e7f6), _0x80e7f6 ? $.userpin = _0x80e7f6.buyPin.userpin : console.log("" + _0x80e7f6), _0x5a0aef.status == 200 && setActivityCookie(_0x5a0aef));
      } catch (_0x5d836b) {
        $.logErr(_0x5d836b, _0x5a0aef);
      } finally {
        _0x101f3b();
      }
    });
  });
}
function drawShopGift() {
  return new Promise(_0x1b2439 => {
    let _0x4b4e70 = "venderId=" + $.venderId + "&token=" + $.token1 + "&shopActId=" + $.shopActId + "&activeUrlId=" + $.activeUrlId + "&tempId=" + $.tempId + "&isradio=" + $.isradio + "&followShop=" + $.followShop1 + "&buyPin=" + $.userpin;
    $.post(taskPostUrls("/index.php?mod=wxShopGift&action=drawShopGift", _0x4b4e70), async (_0x540dab, _0x4b238d, _0x27a6b5) => {
      try {
        _0x540dab ? (console.log("" + JSON.stringify(_0x540dab)), console.log($.name + " drawShopGift API请求失败，请检查网路重试")) : (_0x27a6b5 = JSON.parse(_0x27a6b5), _0x27a6b5 && _0x27a6b5.closeLink === "1" ? console.log(_0x27a6b5.msg + " 奖品：" + $.prize) : console.log("" + JSON.stringify(_0x27a6b5)), _0x4b238d.status == 200 && setActivityCookie(_0x4b238d));
      } catch (_0x42f8ce) {
        $.logErr(_0x42f8ce, _0x4b238d);
      } finally {
        _0x1b2439();
      }
    });
  });
}
function getActivityContent(_0x4158e7, _0x444493) {
  return new Promise(_0x26e2e4 => {
    $.post(taskPostUrl(_0x4158e7, _0x444493), async (_0x5b7572, _0xeea294, _0x54e58d) => {
      try {
        if (_0x5b7572) {
          console.log(String(_0x5b7572));
          console.log("getActivityContent 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x54e58d)) {
            _0x54e58d = JSON.parse(_0x54e58d);
            if (_0x54e58d.result && _0x54e58d.data) {
              endTime = _0x54e58d.data.endTime;
              let _0xde9142 = _0x54e58d.data.list;
              prizeArr = [];
              for (let _0x5655b5 of _0xde9142) {
                let _0x18ba21 = _0x5655b5.takeNum + _0x5655b5.type;
                prizeArr.push(_0x18ba21.replace("jd", "京豆").replace("jf", "积分").replace("dq", "优惠券").replace("jq", "优惠券").replace("null", ""));
                if (["jd", "jf"].includes(_0x5655b5.type)) $.hasPrize = true;
              }
              Math.round(new Date().getTime()) > endTime && (console.log("活动已结束"), $.hasEnd = true);
              _0xde9142.length === 0 && (console.log("礼品已领完"), $.hasEnd = true);
            }
            _0xeea294.status == 200 && setActivityCookie(_0xeea294);
            _0x26e2e4(_0x54e58d);
          } else $.hasEnd = true;
        }
      } catch (_0xbc355f) {
        $.logErr(_0xbc355f, _0xeea294);
      } finally {
        _0x26e2e4();
      }
    });
  });
}
function newFollowShop(_0x1c3f8d, _0x308fad) {
  return new Promise(_0x51f1ee => {
    $.post(taskPostUrl(_0x1c3f8d, _0x308fad), async (_0x3de9ac, _0x2fb07c, _0x261382) => {
      try {
        _0x3de9ac ? (console.log(String(_0x3de9ac)), console.log("newFollowShop 请求失败，请检查网路重试")) : safeGet(_0x261382) && (_0x261382 = JSON.parse(_0x261382), errorMessage = _0x261382.errorMessage, _0x2fb07c.status == 200 && setActivityCookie(_0x2fb07c), _0x51f1ee(_0x261382));
      } catch (_0x4210ca) {
        $.logErr(_0x4210ca, _0x2fb07c);
      } finally {
        _0x51f1ee();
      }
    });
  });
}
function draw(_0x33b333, _0x35f121) {
  return new Promise(_0x4871a0 => {
    $.post(taskPostUrl(_0x33b333, _0x35f121), async (_0x2f0946, _0x1d77b9, _0x3fc78b) => {
      try {
        if (_0x2f0946) {
          console.log(String(_0x2f0946));
          console.log("draw 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x3fc78b)) {
            _0x3fc78b = JSON.parse(_0x3fc78b);
            if (_0x3fc78b.result) {
              if (prizeArr.length > 0) for (let _0x1e4abc of prizeArr) {
                if (_0x1e4abc.includes("京豆")) console.log("🎉 " + _0x1e4abc + " 🐶");else {
                  if (_0x1e4abc.includes("积分")) console.log("🗑️ " + _0x1e4abc + " 🎟️");else {
                    if (_0x1e4abc.includes("优惠券")) {
                      console.log("🗑️ 优惠券");
                    } else _0x1e4abc != "" && console.log("🎉 " + _0x1e4abc);
                  }
                }
              }
            } else console.log("" + _0x3fc78b.errorMessage);
            _0x1d77b9.status == 200 && setActivityCookie(_0x1d77b9);
            _0x4871a0(_0x3fc78b);
          } else $.hasEnd = true;
        }
      } catch (_0x3eeb60) {
        $.logErr(_0x3eeb60, _0x1d77b9);
      } finally {
        _0x4871a0();
      }
    });
  });
}
function getOpenCardStatus(_0x3bb812, _0x4db35d) {
  return new Promise(_0x8e52e6 => {
    $.post(taskPostUrl(_0x3bb812, _0x4db35d), async (_0xa582d9, _0x43ed9e, _0x1596d1) => {
      try {
        if (_0xa582d9) {
          console.log("" + JSON.stringify(_0xa582d9));
          console.log("getOpenCardStatus API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x1596d1)) {
            _0x1596d1 = JSON.parse(_0x1596d1);
            if (_0x1596d1.result && _0x1596d1.data) {
              switch ($.domain_mode) {
                case "lzkj":
                  $.isOpenCard = _0x1596d1.data.openCard || false;
                  break;
                case "cjhy":
                  $.isOpenCard = _0x1596d1.data.openedCard || false;
                  break;
              }
            } else {
              if (_0x1596d1.errorMessage) {
                console.log(_0x1596d1.errorMessage || "");
                for (let _0x5565b6 of ["未开始", "结束", "不存在", "不在"]) {
                  if (_0x1596d1.errorMessage.includes(_0x5565b6)) {
                    $.activityEnd = true;
                    break;
                  }
                }
              } else console.log(_0x1596d1);
            }
          }
          _0x43ed9e.status == 200 && setActivityCookie(_0x43ed9e);
        }
      } catch (_0x5c9675) {
        $.logErr(_0x5c9675, _0x43ed9e);
      } finally {
        _0x8e52e6();
      }
    });
  });
}
function getSimpleActInfoVo() {
  return new Promise(_0x52269a => {
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", "activityId=" + $.activityId), async (_0x397e7e, _0x448a02, _0x556071) => {
      try {
        _0x397e7e ? (console.log(String(_0x397e7e)), console.log("getSimpleActInfoVo API请求失败，请检查网路重试")) : (_0x556071 && safeGet(_0x556071) && (_0x556071 = JSON.parse(_0x556071), _0x556071.data ? ($.shopId = _0x556071.data.shopId, $.venderId = _0x556071.data.venderId, $.activityType = _0x556071.data.activityType) : console.log("异常：" + JSON.stringify(_0x556071))), _0x448a02.status == 200 && setActivityCookie(_0x448a02));
      } catch (_0x1ec315) {
        $.logErr(_0x1ec315, _0x448a02);
      } finally {
        _0x52269a();
      }
    });
  });
}
function getFirstLZCK() {
  return new Promise(_0x2f8323 => {
    let _0x5cb638 = {
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
    $.get(_0x5cb638, async (_0x366aa8, _0x252e9e, _0x205bb8) => {
      try {
        _0x366aa8 ? (console.log(String(_0x366aa8)), console.log("wxCommonInfo API请求失败，请检查网路重试")) : _0x252e9e.status == 200 && setActivityCookie(_0x252e9e);
      } catch (_0x14cb46) {
        $.logErr(_0x14cb46, _0x252e9e);
      } finally {
        _0x2f8323();
      }
    });
  });
}
function getFirstCK() {
  return new Promise(_0x50c3f5 => {
    let _0x14ba94 = {
      "url": activityUrl,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(_0x14ba94, async (_0x423ef2, _0x203354, _0x50bc54) => {
      try {
        if (_0x423ef2) {
          console.log(String(_0x423ef2));
          console.log("getFirstCK API请求失败，请检查网路重试");
        } else {
          let _0x33eb18 = _0x50bc54.match(/(活动已经结束)/) && _0x50bc54.match(/(活动已经结束)/)[1] || "";
          _0x33eb18 && ($.activityEnd = true, console.log("活动已结束"));
          _0x203354.status == 200 && setActivityCookie(_0x203354);
        }
      } catch (_0x1f122e) {
        $.logErr(_0x1f122e, _0x203354);
      } finally {
        _0x50c3f5();
      }
    });
  });
}
function getMyPing() {
  return new Promise(_0x579c29 => {
    let _0x40ce9e = "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", _0x40ce9e), async (_0x30932f, _0x1a62b7, _0x5bfe72) => {
      try {
        if (_0x30932f) {
          console.log(String(_0x30932f));
          console.log("getMyPing API请求失败，请检查网路重试");
        } else {
          _0x1a62b7.status == 200 && setActivityCookie(_0x1a62b7);
          if (safeGet(_0x5bfe72)) {
            _0x5bfe72 = JSON.parse(_0x5bfe72);
            if (_0x5bfe72.result && _0x5bfe72.data) {
              $.secretPin = _0x5bfe72.data.secretPin;
              $.nickName = _0x5bfe72.data.nickname;
              $.AUTH_C_USER = $.secretPin;
            } else {}
          }
        }
      } catch (_0x5e7657) {
        $.logErr(_0x5e7657, _0x1a62b7);
      } finally {
        _0x579c29();
      }
    });
  });
}
function taskPostUrl(_0x1e14bb, _0x4d2b02) {
  return {
    "url": "" + domains + _0x1e14bb,
    "body": _0x4d2b02,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl,
      "Cookie": activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function taskPostUrls(_0x2dd084, _0x3f722c) {
  return {
    "url": "" + domains + _0x2dd084,
    "body": _0x3f722c,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie,
      "Host": $.domain,
      "Origin": domains,
      "Referer": activityUrl,
      "User-Agent": $.UA
    },
    "timeout": 30000
  };
}
function accessLog() {
  return new Promise(async _0x55d081 => {
    const _0x3ce633 = {
      "url": "https://cjhy-isv.isvjcloud.com/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "cjhy-isv.isvjcloud.com",
        "Origin": "https://cjhy-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl,
        "Cookie": activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource="
    };
    $.post(_0x3ce633, (_0x1be56a, _0x30f55c, _0x5c172d) => {
      try {
        if (_0x1be56a) {
          console.log(String(_0x1be56a));
          console.log("accessLog API请求失败，请检查网路重试");
        } else _0x30f55c.status == 200 && setActivityCookie(_0x30f55c);
      } catch (_0x29e556) {
        $.logErr(_0x29e556, _0x30f55c);
      } finally {
        _0x55d081();
      }
    });
  });
}
function accessLogWithAD() {
  return new Promise(async _0x22c970 => {
    const _0x58555c = {
      "url": "https://lzkj-isv.isvjd.com/common/accessLogWithAD",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "lzkj-isv.isvjcloud.com",
        "Origin": "https://lzkj-isv.isvjd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl,
        "Cookie": activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource="
    };
    $.post(_0x58555c, (_0x4976d7, _0x40bd91, _0x4dd7ce) => {
      try {
        _0x4976d7 ? (console.log(String(_0x4976d7)), console.log("accessLogWithAD API请求失败，请检查网路重试")) : _0x40bd91.status == 200 && setActivityCookie(_0x40bd91);
      } catch (_0x52aee2) {
        $.logErr(_0x52aee2, _0x40bd91);
      } finally {
        _0x22c970();
      }
    });
  });
}
function setActivityCookie(_0x47a892) {
  if (_0x47a892) {
    if (_0x47a892.headers["set-cookie"]) {
      cookie = "";
      for (let _0x58c0a4 of _0x47a892.headers["set-cookie"]) {
        lz_cookie[_0x58c0a4.split(";")[0].substr(0, _0x58c0a4.split(";")[0].indexOf("="))] = _0x58c0a4.split(";")[0].substr(_0x58c0a4.split(";")[0].indexOf("=") + 1);
      }
      for (const _0xb33ae3 of Object.keys(lz_cookie)) {
        cookie += _0xb33ae3 + "=" + lz_cookie[_0xb33ae3] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(_0xfae86) {
  _0xfae86 = _0xfae86 || 32;
  let _0x1ba0e4 = "abcdef0123456789",
    _0x16d571 = _0x1ba0e4.length,
    _0x475eb7 = "";
  for (i = 0; i < _0xfae86; i++) _0x475eb7 += _0x1ba0e4.charAt(Math.floor(Math.random() * _0x16d571));
  return _0x475eb7;
}
function safeGet(_0x583722) {
  if (!_0x583722) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(_0x583722) == "object") {
      return true;
    }
  } catch (_0x1481c4) {
    return console.log(_0x1481c4), false;
  }
}
function getQueryString(_0x1b000d, _0x3ab0de) {
  let _0x19b35b = new RegExp("(^|[&?])" + _0x3ab0de + "=([^&]*)(&|$)"),
    _0x5ac4ff = _0x1b000d.match(_0x19b35b);
  if (_0x5ac4ff != null) return decodeURIComponent(_0x5ac4ff[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x2152ac => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x7f4827 = "";
    if ($.shopactivityId) _0x7f4827 = ",\"activityId\":" + $.shopactivityId;
    const _0x89f4ff = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x7f4827 + ",\"channel\":406}",
      _0x1d2470 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x89f4ff)
      },
      _0x27449d = await getH5st("8adfb", _0x1d2470),
      _0x57314d = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x89f4ff + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x27449d),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x57314d, async (_0x32bb5b, _0x389fb9, _0x77c7d9) => {
      try {
        _0x77c7d9 = _0x77c7d9 && _0x77c7d9.match(/jsonp_.*?\((.*?)\);/) && _0x77c7d9.match(/jsonp_.*?\((.*?)\);/)[1] || _0x77c7d9;
        let _0x5c2ab6 = $.toObj(_0x77c7d9, _0x77c7d9);
        if (_0x5c2ab6 && typeof _0x5c2ab6 == "object") {
          if (_0x5c2ab6 && _0x5c2ab6.success === true) {
            console.log(_0x5c2ab6.message);
            $.errorJoinShop = _0x5c2ab6.message;
            if (_0x5c2ab6.result && _0x5c2ab6.result.giftInfo) {
              for (let _0x27bca8 of _0x5c2ab6.result.giftInfo.giftList) {
                console.log("入会获得: " + _0x27bca8.discountString + _0x27bca8.prizeName + _0x27bca8.secondLineDesc);
              }
            }
            console.log("");
          } else {
            if (_0x5c2ab6 && typeof _0x5c2ab6 == "object" && _0x5c2ab6.message) {
              $.errorJoinShop = _0x5c2ab6.message;
              console.log("" + (_0x5c2ab6.message || ""));
            } else {
              console.log(_0x77c7d9);
            }
          }
        } else console.log(_0x77c7d9);
      } catch (_0x10635c) {
        $.logErr(_0x10635c, _0x389fb9);
      } finally {
        _0x2152ac();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x53b648 => {
    let _0x2f2673 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x5bf9ee = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x2f2673)
      },
      _0x45911a = await getH5st("ef79a", _0x5bf9ee),
      _0x5753d9 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x2f2673 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x45911a),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x5753d9, async (_0x657e69, _0x128235, _0x54dbe3) => {
      try {
        _0x54dbe3 = _0x54dbe3 && _0x54dbe3.match(/jsonp_.*?\((.*?)\);/) && _0x54dbe3.match(/jsonp_.*?\((.*?)\);/)[1] || _0x54dbe3;
        let _0x2391dc = $.toObj(_0x54dbe3, _0x54dbe3);
        _0x2391dc && typeof _0x2391dc == "object" ? _0x2391dc && _0x2391dc.success == true && (console.log("\n去加入店铺会员：" + (_0x2391dc.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x2391dc.result.interestsRuleList && _0x2391dc.result.interestsRuleList[0] && _0x2391dc.result.interestsRuleList[0].interestsInfo && _0x2391dc.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x54dbe3);
      } catch (_0x27073a) {
        $.logErr(_0x27073a, _0x128235);
      } finally {
        _0x53b648();
      }
    });
  });
}
