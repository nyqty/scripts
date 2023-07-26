/*
活动名称：加购有礼 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/wxCollectionActivity/activity?activityId=<活动id>
         https://cjhy-isv.isvjcloud.com/wxCollectionActivity/activity?activityId=<活动id>
         https://lzkj-isv.isvjd.com/wxCollectionActivity/activity2/activity?activityId=<活动id>
         https://cjhy-isv.isvjd.com/wxCollectionActivity/activity2/activity?activityId=<活动id>
环境变量：jd_wxCollectionActivity_activityUrl // 活动链接
         jd_wxCollectionActivity_openCard // 是否开卡，默认不开卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('加购有礼（超级无线/超级会员）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getToken = require('./function/getToken')
const getH5st = require('./function/getH5st3_0')
const wxSavePrize = require('./function/wxSavePrize')

let activityUrl = process.env.jd_wxCollectionActivity_activityUrl ? process.env.jd_wxCollectionActivity_activityUrl : "",
  openCard = process.env.jd_wxCollectionActivity_openCard === "true" ? true : false,
  lz_cookie = {},
  activityCookie = "",
  retryTimes = 40,
  cookiesArr = [],
  cookie = "";
messageTitle = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(_0x108c08 => {
    cookiesArr.push(jdCookieNode[_0x108c08]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x56f2e5 => _0x56f2e5.cookie)].filter(_0x1cc8e0 => !!_0x1cc8e0);
if (activityUrl) {
  $.activityId = getQueryString("" + activityUrl, "activityId");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
  $.domain_mode = null;
  $.errMsg = null;
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
  for (let _0x356244 = 0; _0x356244 < cookiesArr.length; _0x356244++) {
    if (cookiesArr[_0x356244]) {
      cookie = cookiesArr[_0x356244];
      originCookie = cookiesArr[_0x356244];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x356244 + 1;
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
      await getUA();
      await Main();
      $.domain_mode == "cjhy" ? await $.wait(2000) : await $.wait(1000);
      if ($.outFlag || $.activityEnd) break;
    }
  }
})().catch(_0x3d90f2 => {
  $.log("", " " + $.name + ", 失败! 原因: " + _0x3d90f2 + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  $.newnums = 0;
  $.sid = "";
  $.Token = "";
  $.secretPin = "";
  $.hisPin = "";
  $.getCookieReuslt = false;
  $.needOpenCard = false;
  $.drawStop = false;
  $.getPrized = false;
  $.isOpenCard = false;
  switch ($.domain_mode) {
    case "lzkj":
      await getFirstLZCK();
      break;
    case "cjhy":
      await getFirstCK();
      break;
  }
  if (!$.getCookieReuslt && $.domain_mode == "cjhy") for (let _0x2964e6 = 0; _0x2964e6 < retryTimes; _0x2964e6++) {
    await getFirstCK();
    await $.wait(1000);
    if ($.getCookieReuslt) break;
  }
  if ($.activityEnd || $.outFlag || !$.getCookieReuslt) return;
  await $.wait(500);
  if ($.index == 1) {
    await getSimpleActInfoVo("/customer/getSimpleActInfoVo", "activityId=" + $.activityId);
    if ($.activityEnd) {
      console.log("活动不存在或已经结束！");
      return;
    }
    if (!$.venderId) {
      $.outFlag = true;
      console.log("getSimpleActInfoVo 未能获取店铺信息");
      return;
    }
  }
  $.Token = await getToken(originCookie, domains);
  if ($.Token) {
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
    $.domain_mode == "cjhy" ? await $.wait(500) : await $.wait(200);
    switch ($.domain_mode) {
      case "lzkj":
        await accessLogWithAD();
        break;
      case "cjhy":
        await accessLog();
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
        await getOpenCardStatus("/wxCommonInfo/getActMemberInfo", "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.FormatPin);
        break;
      case "cjhy":
        await getOpenCardStatus("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", "venderId=" + $.venderId + "&buyerPin=" + $.FormatPin + "&activityType=" + $.activityType);
        break;
    }
    if ($.activityEnd || $.outFlag) return;
    if (!$.isOpenCard) {
      $.errorJoinShop = "";
      $.joinVenderId = $.venderId;
      for (let _0x38ec0f = 0; _0x38ec0f < Array(5).length; _0x38ec0f++) {
        if (_0x38ec0f > 0) console.log("第" + _0x38ec0f + "次 重新开卡");
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
  var _0x462e34 = "";
  _0x462e34 = await getActivityContent("/wxCollectionActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
  if ($.activityEnd) {
    console.log("未能获取到活动信息！");
    return;
  }
  $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
  if (_0x462e34) {
    if (_0x462e34.result && _0x462e34.data) {
      let _0x468d72 = _0x462e34.data.cpvos,
        _0x2904d1 = _0x462e34.data.needCollectionSize || 1,
        _0x18ea4b = _0x462e34.data.oneKeyAddCart * 1 === 1,
        _0x542de3 = _0x462e34.data.hasCollectionSize;
      if ($.index == 1) {
        console.log("❖ 活动奖品：" + _0x462e34.data.drawInfo.name + "\n");
        if (_0x462e34.data.drawInfo.name.includes("优惠券")) {
          console.log("垃圾活动不跑了~");
          $.activityEnd = true;
          return;
        }
        let _0x106611 = new Date().valueOf(),
          _0x469678 = _0x462e34.data.startTime,
          _0x1624fc = _0x462e34.data.endTime;
        if (_0x106611 <= _0x469678) {
          console.log("活动尚未开始，晚点再来吧~");
          $.activityEnd = true;
          return;
        } else {
          if (_0x106611 >= _0x1624fc) {
            console.log("活动已经结束~");
            $.activityEnd = true;
            return;
          }
        }
      }
      if (_0x462e34.needFollow && !_0x462e34.hasFollow) {
        let _0x5c4593 = await followShop("/wxActionCommon/followShop", "userId=" + $.venderId + "&buyerNick=" + $.FormatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType);
        if (!_0x5c4593.result) {
          console.log(_0x5c4593.errorMessage);
          return;
        }
        if ($.needOpenCard) {
          console.log("活动仅限店铺会员参与哦~");
          return;
        }
      }
      if (_0x542de3 < _0x2904d1) {
        let _0xd10e7b = [];
        _0x2127f9: for (let _0x443298 of _0x468d72) {
          if (_0x18ea4b) {
            _0xd10e7b.push(_0x443298.skuId);
            continue;
          }
          for (let _0x30d20f = 0; _0x30d20f < 5; _0x30d20f++) {
            try {
              let _0x14ea69 = "";
              switch ($.activityType) {
                case 5:
                  _0x14ea69 = await addCart("/wxCollectionActivity/collection", "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&productId=" + _0x443298.skuId);
                  break;
                default:
                  _0x14ea69 = await addCart("/wxCollectionActivity/addCart", "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&productId=" + _0x443298.skuId);
                  break;
              }
              if (_0x14ea69) {
                if (_0x14ea69.result) {
                  _0x542de3 = _0x14ea69.data.hasCollectionSize || _0x14ea69.data.hasAddCartSize;
                  if (_0x542de3 >= _0x2904d1) break _0x2127f9;
                  break;
                } else {
                  let _0x3b100e = _0x14ea69.errorMessage;
                  if ($.domain_mode == "cjhy" && _0x3b100e.includes("擦肩")) return;
                  if (_0x3b100e.includes("异常")) {} else console.log(String(_0x3b100e));
                  for (let _0x5eabda of ["未开始", "结束", "来晚了"]) {
                    if (_0x3b100e.includes(_0x5eabda)) {
                      $.activityEnd = true;
                      break _0x2127f9;
                    }
                  }
                  if (errorMessage.includes("购物车")) {
                    return;
                  }
                  if (_0x3b100e.includes("会员")) {
                    $.needOpenCard = true;
                    break _0x2127f9;
                  }
                }
              }
              if ($.activityEnd || $.outFlag || $.needOpenCard) return;
            } catch (_0x52a1c3) {
              console.log(_0x52a1c3);
            } finally {
              $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
            }
          }
        }
        if (_0x18ea4b) {
          let _0x416b3f = await addCart("/wxCollectionActivity/oneKeyAddCart", "activityId=" + $.activityId + "&pin=" + $.FormatPin + "&productIds=" + encodeURIComponent(JSON.stringify(_0xd10e7b)));
          if (_0x416b3f.result && _0x416b3f.data) _0x542de3 = _0x416b3f.data.hasCollectionSize || _0x416b3f.data.hasAddCartSize;else {
            let _0x1d1129 = _0x416b3f.errorMessage;
            if ($.domain_mode == "cjhy" && _0x1d1129.includes("擦肩")) return;
            if (_0x1d1129.includes("异常")) {} else console.log(String(_0x1d1129));
            for (let _0x25eff4 of ["未开始", "结束", "来晚了"]) {
              if (_0x1d1129.includes(_0x25eff4)) {
                $.activityEnd = true;
                break;
              }
            }
            if (_0x1d1129.includes("会员")) $.needOpenCard = true;
          }
          $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
        }
        if ($.activityEnd || $.outFlag || $.needOpenCard) return;
        if (_0x542de3 < _0x2904d1 && !$.activityEnd && !$.needOpenCard) {
          console.log("未能完成加购任务，可能商品暂时存在异常！");
          return;
        }
      } else {
        let _0x2269e0 = await getDrawList("/wxDrawActivity/drawMyOkList", "activityId=" + $.activityId + "&type=" + $.activityType + "&pin=" + $.FormatPin);
        if (_0x2269e0.result) {
          if (_0x2269e0.data.length > 0) {
            console.log("已经参与过了哟~");
            return;
          }
        }
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      }
      retryTimes = $.hasPrize ? 80 : retryTimes;
      for (let _0x29be7c = 0; _0x29be7c < retryTimes; _0x29be7c++) {
        $.errMsg = "";
        await getPrize("/wxCollectionActivity/getPrize", "activityId=" + $.activityId + "&pin=" + $.FormatPin);
        if ($.getPrized || $.activityEnd || $.needOpenCard) break;
        if (_0x29be7c == retryTimes - 1) {
          console.log("🚫 经过多次尝试未能领取奖励，奖品可能已发完或中奖概率较低！");
          return;
        }
        $.domain_mode == "cjhy" ? await $.wait(1000) : await $.wait(500);
      }
    } else {
      if (_0x462e34.errorMessage) {
        console.log(_0x462e34.errorMessage);
        $.activityEnd = true;
        return;
      } else {
        console.log("活动可能已经结束！");
        $.activityEnd = true;
        return;
      }
    }
  } else {
    console.log("未能获取到活动信息！");
    $.activityEnd = true;
    return;
  }
}
async function getActivityContent(_0x3406af, _0x1939e9) {
  return new Promise(_0x1f5f93 => {
    $.post(taskPostUrl(_0x3406af, _0x1939e9), async (_0x11cd1c, _0x44dfba, _0x21de31) => {
      try {
        _0x11cd1c ? (console.log(String(_0x11cd1c)), console.log("getActivityContent 请求失败，请检查网路重试")) : safeGet(_0x21de31) ? (_0x21de31 = JSON.parse(_0x21de31), _0x44dfba.status == 200 && setActivityCookie(_0x44dfba), _0x1f5f93(_0x21de31)) : $.activityEnd = true;
      } catch (_0x262644) {
        $.logErr(_0x262644, _0x44dfba);
      } finally {
        _0x1f5f93();
      }
    });
  });
}
async function followShop(_0x488a6c, _0x290d2b) {
  return new Promise(_0xfafb2c => {
    $.post(taskPostUrl(_0x488a6c, _0x290d2b), async (_0x2e1729, _0x258826, _0x3bc445) => {
      try {
        if (_0x2e1729) {
          console.log(String(_0x2e1729));
          console.log("followShop 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x3bc445)) {
            _0x3bc445 = JSON.parse(_0x3bc445);
            errorMessage = _0x3bc445.errorMessage;
            errorMessage.indexOf("会员") > -1 && ($.needOpenCard = true);
            _0x258826.status == 200 && setActivityCookie(_0x258826);
            _0xfafb2c(_0x3bc445);
          }
        }
      } catch (_0x1f83ef) {
        $.logErr(_0x1f83ef, _0x258826);
      } finally {
        _0xfafb2c();
      }
    });
  });
}
async function getDrawList(_0x653d79, _0x55d96a) {
  return new Promise(_0x31adec => {
    $.post(taskPostUrl(_0x653d79, _0x55d96a), async (_0x219de1, _0x55e242, _0x378abc) => {
      try {
        if (_0x219de1) {
          console.log(String(_0x219de1));
          console.log("getDrawList 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x378abc)) {
            _0x378abc = JSON.parse(_0x378abc);
            if (_0x55e242.status == 200) {
              setActivityCookie(_0x55e242);
            }
            _0x31adec(_0x378abc);
          }
        }
      } catch (_0x1a9461) {
        $.logErr(_0x1a9461, _0x55e242);
      } finally {
        _0x31adec();
      }
    });
  });
}
async function addCart(_0x13e1fd, _0x1abfdc) {
  return new Promise(_0x3fb183 => {
    $.post(taskPostUrl(_0x13e1fd, _0x1abfdc), async (_0x366071, _0x2a186c, _0x391d7e) => {
      try {
        _0x366071 ? (console.log(String(_0x366071)), console.log("addCart 请求失败，请检查网路重试"), _0x2a186c.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true)) : safeGet(_0x391d7e) && (_0x391d7e = JSON.parse(_0x391d7e), errorMessage = _0x391d7e.errorMessage, errorMessage.indexOf("会员") > -1 && ($.needOpenCard = true), _0x2a186c.status == 200 && setActivityCookie(_0x2a186c), _0x3fb183(_0x391d7e));
      } catch (_0x1ad3e0) {
        $.logErr(_0x1ad3e0, _0x2a186c);
      } finally {
        _0x3fb183();
      }
    });
  });
}
async function getShopInfo() {
  return new Promise(_0x36d12b => {
    $.post(taskPostUrl("/wxDrawActivity/shopInfo", "activityId=" + $.activityId), async (_0x42fe8d, _0x20d213, _0x127dc0) => {
      try {
        _0x42fe8d ? (console.log(String(_0x42fe8d)), console.log("getShopInfo 请求失败，请检查网路重试")) : safeGet(_0x127dc0) && (_0x127dc0 = JSON.parse(_0x127dc0), _0x127dc0.result && _0x127dc0.data && ($.shopName = _0x127dc0.data.shopName), _0x20d213.status == 200 && setActivityCookie(_0x20d213));
      } catch (_0x56f2f2) {
        $.logErr(_0x56f2f2, _0x20d213);
      } finally {
        _0x36d12b();
      }
    });
  });
}
async function getPrize(_0xfef62f, _0x387c45) {
  return new Promise(_0x338ddf => {
    $.post(taskPostUrl(_0xfef62f, _0x387c45), async (_0x575b74, _0x465476, _0x26a111) => {
      try {
        if (_0x575b74) {
          console.log(String(_0x575b74));
          console.log("start 请求失败，请检查网路重试");
        } else {
          if (_0x26a111) {
            _0x26a111 = JSON.parse(_0x26a111);
            if (_0x26a111.result && _0x26a111.data) {
              let _0x34920d = _0x26a111.data.drawInfo;
              if (_0x34920d) {
                switch (_0x34920d.type) {
                  case 6:
                    console.log("🎉 " + _0x34920d.name + " 🐶");
                    break;
                  case 7:
                    const _0x27ce3 = _0x26a111.data.addressId;
                    prizeName = _0x34920d.name;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    console.log("参考价值：" + _0x34920d.priceInfo + "（元）");
                    if (_0x34920d.showImage) console.log("预览图片：" + _0x34920d.showImage);
                    let _0x16e962 = await wxSavePrize(domains, cookie, $.UA, $.activityId, $.activityType, $.venderId, $.secretPin, prizeName, _0x27ce3);
                    _0x16e962 ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，已成功自动登记收货地址\n\n" + activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + activityUrl));
                    break;
                  case 8:
                    console.log("🗑️ 专享价");
                    break;
                  case 9:
                    console.log("🗑️ " + _0x34920d.name + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    console.log("🎉 恭喜获得" + _0x34920d.name + " 🎁");
                    break;
                  case 16:
                    console.log("🎉 " + _0x34920d.priceInfo + " 🧧");
                    break;
                  default:
                    _0x34920d.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + _0x34920d.name);
                    break;
                }
                $.getPrized = true;
                $.hasPrize = true;
              }
            } else {
              if (_0x26a111.errorMessage) {
                let _0x4aeba9 = _0x26a111.errorMessage;
                $.errMsg = _0x4aeba9;
                for (let _0x39dd0c of ["来晚了", "京豆计划", "奖品发送失败", "发放完", "发完", "领完", "抢光", "全部被领取", "余额不足", "最大次数"]) {
                  if (_0x4aeba9.includes(_0x39dd0c)) {
                    $.activityEnd = true;
                    break;
                  }
                }
                if (_0x4aeba9.includes("领过")) {
                  console.log("已经参与过了哦~");
                  $.getPrized = true;
                }
                _0x4aeba9.includes("非法操作") && (console.log("可能已经参与过了，接口返回非法操作！"), $.getPrized = true);
                for (let _0x3c6a73 of ["未开始", "结束", "不存在", "不在"]) {
                  if (_0x4aeba9.includes(_0x3c6a73)) {
                    $.activityEnd = true;
                    break;
                  }
                }
                if (_0x4aeba9.includes("会员")) $.needOpenCard = true;
                !$.getPrized && !_0x4aeba9.includes("擦肩") && !_0x4aeba9.includes("火爆") && console.log(_0x4aeba9 || "");
              } else {
                console.log(JSON.stringify(_0x26a111));
              }
            }
          }
          _0x465476.status == 200 && setActivityCookie(_0x465476);
        }
      } catch (_0x40a60b) {
        $.logErr(_0x40a60b, _0x465476);
      } finally {
        _0x338ddf();
      }
    });
  });
}
async function getOpenCardStatus(_0x3c7493, _0x475b14) {
  return new Promise(_0x32b774 => {
    $.post(taskPostUrl(_0x3c7493, _0x475b14), async (_0x30f211, _0x1a8238, _0x31ae2f) => {
      try {
        if (_0x30f211) {
          console.log(String(_0x30f211));
          console.log("getOpenCardStatus API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x31ae2f)) {
            _0x31ae2f = JSON.parse(_0x31ae2f);
            if (_0x31ae2f.result && _0x31ae2f.data) switch ($.domain_mode) {
              case "lzkj":
                $.isOpenCard = _0x31ae2f.data.openCard;
                break;
              case "cjhy":
                $.isOpenCard = _0x31ae2f.data.openedCard;
                break;
            } else {
              if (_0x31ae2f.errorMessage) {
                console.log(_0x31ae2f.errorMessage || "");
                for (let _0x3e6fa0 of ["未开始", "结束", "不存在", "不在"]) {
                  if (_0x31ae2f.errorMessage.includes(_0x3e6fa0)) {
                    $.activityEnd = true;
                    break;
                  }
                }
              } else console.log(_0x31ae2f);
            }
          }
          if (_0x1a8238.status == 200) {
            setActivityCookie(_0x1a8238);
          }
        }
      } catch (_0x319c93) {
        $.logErr(_0x319c93, _0x1a8238);
      } finally {
        _0x32b774();
      }
    });
  });
}
async function getSimpleActInfoVo() {
  return new Promise(_0xf0377b => {
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", "activityId=" + $.activityId), async (_0x3cc8c3, _0x10ca69, _0x63b56b) => {
      try {
        if (_0x3cc8c3) {
          console.log(String(_0x3cc8c3));
          console.log("getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {
          if (_0x63b56b && safeGet(_0x63b56b)) {
            _0x63b56b = JSON.parse(_0x63b56b);
            if (_0x63b56b.data) {
              $.shopId = _0x63b56b.data.shopId;
              $.venderId = _0x63b56b.data.venderId;
              $.activityType = _0x63b56b.data.activityType;
            } else !_0x63b56b.data ? $.activityEnd = true : console.log("异常：" + JSON.stringify(_0x63b56b));
          }
          _0x10ca69.status == 200 && setActivityCookie(_0x10ca69);
        }
      } catch (_0x342377) {
        $.logErr(_0x342377, _0x10ca69);
      } finally {
        _0xf0377b();
      }
    });
  });
}
async function getFirstLZCK() {
  return new Promise(_0x2b8df4 => {
    let _0x1238ca = {
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
    $.get(_0x1238ca, async (_0x5cc861, _0xbeab0b, _0x36da8b) => {
      try {
        if (_0x5cc861) {
          _0xbeab0b && typeof _0xbeab0b.statusCode != "undefined" && _0xbeab0b.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true);
          console.log(String(_0x5cc861));
          console.log("wxCommonInfo API请求失败，请检查网路重试");
        } else {
          _0xbeab0b.status == 200 && setActivityCookie(_0xbeab0b);
          $.getCookieReuslt = true;
        }
      } catch (_0x36328e) {
        $.logErr(_0x36328e, _0xbeab0b);
      } finally {
        _0x2b8df4();
      }
    });
  });
}
async function getFirstCK() {
  return new Promise(_0x393bb8 => {
    let _0x2b7097 = {
      "url": activityUrl,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(_0x2b7097, async (_0x500969, _0x3c667a, _0x39c4dd) => {
      try {
        if (_0x500969) {
          _0x3c667a && typeof _0x3c667a.statusCode != "undefined" && _0x3c667a.statusCode == 493 && (console.log("\n此ip已被限制，请过10分钟后再执行脚本！\n"), $.outFlag = true);
          console.log(String(_0x500969));
          console.log("getFirstCK API请求失败，请检查网路重试");
        } else {
          let _0x391e14 = _0x39c4dd.match(/(活动已经结束)/) && _0x39c4dd.match(/(活动已经结束)/)[1] || "";
          _0x391e14 && ($.activityEnd = true, console.log("活动已结束"));
          if (_0x3c667a.status == 200) {
            setActivityCookie(_0x3c667a);
          }
          $.getCookieReuslt = true;
        }
      } catch (_0x302921) {
        $.logErr(_0x302921, _0x3c667a);
      } finally {
        _0x393bb8();
      }
    });
  });
}
async function getMyPing() {
  return new Promise(_0x566ffb => {
    let _0x4e51bd = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", _0x4e51bd), async (_0x4c2e3e, _0x284fb1, _0x3a2c78) => {
      try {
        if (_0x4c2e3e) {
          _0x284fb1 && typeof _0x284fb1.statusCode != "undefined" && _0x284fb1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本！"), $.outFlag = true);
          console.log(String(_0x4c2e3e));
          console.log("getMyPing API请求失败，请检查网路重试");
        } else {
          _0x284fb1.status == 200 && setActivityCookie(_0x284fb1);
          if (safeGet(_0x3a2c78)) {
            _0x3a2c78 = JSON.parse(_0x3a2c78);
            if (_0x3a2c78.result && _0x3a2c78.data) {
              $.secretPin = _0x3a2c78.data.secretPin;
              $.nickName = _0x3a2c78.data.nickname;
              $.AUTH_C_USER = $.secretPin;
            } else {}
          }
        }
      } catch (_0x2e1e0d) {
        $.logErr(_0x2e1e0d, _0x284fb1);
      } finally {
        _0x566ffb();
      }
    });
  });
}
function taskPostUrl(_0x254f1a, _0x49bb34) {
  return {
    "url": "" + domains + _0x254f1a,
    "body": _0x49bb34,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    },
    "timeout": 30000
  };
}
async function accessLog() {
  return new Promise(async _0x4d84c4 => {
    const _0x562d27 = {
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
        "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource="
    };
    $.post(_0x562d27, (_0x21b5f2, _0x18a968, _0x52dcda) => {
      try {
        _0x21b5f2 ? (console.log(String(_0x21b5f2)), console.log("accessLog API请求失败，请检查网路重试")) : _0x18a968.status == 200 && setActivityCookie(_0x18a968);
      } catch (_0x51c7cd) {
        $.logErr(_0x51c7cd, _0x18a968);
      } finally {
        _0x4d84c4();
      }
    });
  });
}
async function accessLogWithAD() {
  return new Promise(async _0x166f3c => {
    const _0x53b663 = {
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
        "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.FormatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(activityUrl) + "&subType=app&adSource="
    };
    $.post(_0x53b663, (_0x6c3a91, _0x28064e, _0x7f014b) => {
      try {
        _0x6c3a91 ? (console.log(String(_0x6c3a91)), console.log("accessLogWithAD API请求失败，请检查网路重试")) : _0x28064e.status == 200 && setActivityCookie(_0x28064e);
      } catch (_0x486385) {
        $.logErr(_0x486385, _0x28064e);
      } finally {
        _0x166f3c();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x21e704 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x24f418 = "";
    if ($.shopactivityId) _0x24f418 = ",\"activityId\":" + $.shopactivityId;
    const _0xa122e0 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x24f418 + ",\"channel\":406}",
      _0x57f516 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0xa122e0)
      },
      _0x2008fe = await getH5st("8adfb", _0x57f516),
      _0x4e4439 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0xa122e0 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x2008fe),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x4e4439, async (_0x5c161f, _0x17ec42, _0x361352) => {
      try {
        _0x361352 = _0x361352 && _0x361352.match(/jsonp_.*?\((.*?)\);/) && _0x361352.match(/jsonp_.*?\((.*?)\);/)[1] || _0x361352;
        let _0x437c18 = $.toObj(_0x361352, _0x361352);
        if (_0x437c18 && typeof _0x437c18 == "object") {
          if (_0x437c18 && _0x437c18.success === true) {
            console.log(_0x437c18.message);
            $.errorJoinShop = _0x437c18.message;
            if (_0x437c18.result && _0x437c18.result.giftInfo) {
              for (let _0x44f6dc of _0x437c18.result.giftInfo.giftList) {
                console.log("入会获得: " + _0x44f6dc.discountString + _0x44f6dc.prizeName + _0x44f6dc.secondLineDesc);
              }
            }
            console.log("");
          } else {
            if (_0x437c18 && typeof _0x437c18 == "object" && _0x437c18.message) {
              $.errorJoinShop = _0x437c18.message;
              console.log("" + (_0x437c18.message || ""));
            } else {
              console.log(_0x361352);
            }
          }
        } else console.log(_0x361352);
      } catch (_0x16a541) {
        $.logErr(_0x16a541, _0x17ec42);
      } finally {
        _0x21e704();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x1c0468 => {
    let _0x1b75a9 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0xbf219 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x1b75a9)
      },
      _0x5bd179 = await getH5st("ef79a", _0xbf219),
      _0x1377ce = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x1b75a9 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x5bd179),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x1377ce, async (_0x753f03, _0x50969f, _0x480f9b) => {
      try {
        _0x480f9b = _0x480f9b && _0x480f9b.match(/jsonp_.*?\((.*?)\);/) && _0x480f9b.match(/jsonp_.*?\((.*?)\);/)[1] || _0x480f9b;
        let _0x16239d = $.toObj(_0x480f9b, _0x480f9b);
        _0x16239d && typeof _0x16239d == "object" ? _0x16239d && _0x16239d.success == true && (console.log("\n去加入店铺会员：" + (_0x16239d.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x16239d.result.interestsRuleList && _0x16239d.result.interestsRuleList[0] && _0x16239d.result.interestsRuleList[0].interestsInfo && _0x16239d.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x480f9b);
      } catch (_0x3a1f47) {
        $.logErr(_0x3a1f47, _0x50969f);
      } finally {
        _0x1c0468();
      }
    });
  });
}
function setActivityCookie(_0x4d678c) {
  if (_0x4d678c.headers["set-cookie"]) {
    cookie = "";
    for (let _0x362a9e of _0x4d678c.headers["set-cookie"]) {
      lz_cookie[_0x362a9e.split(";")[0].substr(0, _0x362a9e.split(";")[0].indexOf("="))] = _0x362a9e.split(";")[0].substr(_0x362a9e.split(";")[0].indexOf("=") + 1);
    }
    for (const _0x18d92f of Object.keys(lz_cookie)) {
      cookie += _0x18d92f + "=" + lz_cookie[_0x18d92f] + ";";
    }
    activityCookie = cookie;
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(_0x321ff7) {
  _0x321ff7 = _0x321ff7 || 32;
  let _0xd9f2b7 = "abcdef0123456789",
    _0x4aaa91 = _0xd9f2b7.length,
    _0x164f9e = "";
  for (i = 0; i < _0x321ff7; i++) _0x164f9e += _0xd9f2b7.charAt(Math.floor(Math.random() * _0x4aaa91));
  return _0x164f9e;
}
function safeGet(_0x4f38b8) {
  if (!_0x4f38b8) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(_0x4f38b8) == "object") return true;
  } catch (_0x2d47d1) {
    return console.log(_0x2d47d1), false;
  }
}
function getQueryString(_0xba2f69, _0x2049c7) {
  let _0x318f47 = new RegExp("(^|[&?])" + _0x2049c7 + "=([^&]*)(&|$)"),
    _0x730dd = _0xba2f69.match(_0x318f47);
  if (_0x730dd != null) return decodeURIComponent(_0x730dd[2]);
  return "";
}
