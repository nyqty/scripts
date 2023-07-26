/*
活动名称：组队瓜分奖品 · 超级无线
活动链接：https://lzkjdz-isv.isvjd.com/wxTeam/activity2/activity?activityId=<活动id>
环境变量：jd_zdjr_activityId  // 活动id
         jd_zdjr_activityUrl // 活动域名

*/

const Env=require('./utils/Env.js');
const $ = new Env('组队瓜分奖品（超级无线）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let jd_zdjr_activityId = "",
  jd_zdjr_activityUrl = "https://lzkjdz-isv.isvjd.com",
  cookiesArr = [],
  cookie = "",
  message = "",
  messageTitle = "";
activityId = jd_zdjr_activityId;
activityUrl = jd_zdjr_activityUrl;
let activityCookie = "",
  lz_cookie = {};
if ($.isNode()) {
  if (process.env.jd_zdjr_activityId) activityId = process.env.jd_zdjr_activityId;
  if (process.env.jd_zdjr_activityUrl) activityUrl = process.env.jd_zdjr_activityUrl;
  Object.keys(jdCookieNode).forEach(_0x4370bd => {
    cookiesArr.push(jdCookieNode[_0x4370bd]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(_0x37460e => _0x37460e.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(_0x45306d => !!_0x45306d);
}
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：https://lzkjdz-isv.isvjd.com/wxTeam/activity2/activity?activityId=" + activityId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.memberCount = 0;
  $.toactivity = true;
  $.noTeamLeader = false;
  for (let _0x5f179f = 0; _0x5f179f < cookiesArr.length; _0x5f179f++) {
    if (cookiesArr[_0x5f179f]) {
      cookie = cookiesArr[_0x5f179f];
      originCookie = cookiesArr[_0x5f179f];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x5f179f + 1;
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
      await main();
      if (!$.toactivity || $.maxTeam || $.noTeamLeader) break;
    }
  }
  if (message != "") await showMsg();
})().catch(_0x38962a => {
  $.log("", " " + $.name + ", 失败! 原因: " + _0x38962a + "!", "");
}).finally(() => {
  $.done();
});
async function main() {
  $.Token = "";
  $.Pin = "";
  $.saveTeam = false;
  await getCk();
  await $.wait(500);
  $.index == 1 && ($.shopId = "", $.venderId = "", await getSimpleActInfoVo(), await $.wait(500));
  if ($.shopId && $.venderId) {
    $.Token = await getToken(originCookie, "https://lzkjdz-isv.isvjd.com");
    if ($.Token) await getPin();
    await $.wait(500);
    if (!$.Pin) {
      if ($.index == 1) $.noTeamLeader = true;
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await accessLog();
    await $.wait(500);
    await getTeam();
    if ($.index == 1 && !$.signUuid) {
      $.noTeamLeader = true;
      return;
    }
    await $.wait(500);
    if ($.maxTeam) {
      console.log("队伍已满员");
      return;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
    message += "【京东账号" + $.index + "】 未能获取活动信息\n";
    if ($.index == 1) return;
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(_0x5536f4) {
  _0x5536f4 = _0x5536f4 || 32;
  let _0x140e71 = "abcdef0123456789",
    _0x4de0f9 = _0x140e71.length,
    _0x3cbc3f = "";
  for (i = 0; i < _0x5536f4; i++) _0x3cbc3f += _0x140e71.charAt(Math.floor(Math.random() * _0x4de0f9));
  return _0x3cbc3f;
}
function showMsg() {
  return new Promise(_0x5cfda0 => {
    _0x5cfda0();
  });
}
function getSimpleActInfoVo() {
  return new Promise(_0xb235ec => {
    let _0x3ad5d3 = "activityId=" + activityId;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", _0x3ad5d3), async (_0xf71f0a, _0x56ed44, _0x21f6ce) => {
      try {
        _0x21f6ce = JSON.parse(_0x21f6ce);
        $.shopId = _0x21f6ce.data.shopId;
        $.venderId = _0x21f6ce.data.venderId;
        $.joinVenderId = $.venderId;
        if (_0xf71f0a) {
          console.log(String(_0xf71f0a));
          console.log($.name + " getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {}
      } catch (_0x5b58f5) {
        $.logErr(_0x5b58f5, _0x56ed44);
      } finally {
        _0xb235ec();
      }
    });
  });
}
function openAppUrl() {
  let _0x55ff85 = activityUrl + "/wxTeam/activity?activityId=" + activityId,
    _0x501b3a = _0x55ff85;
  if (_0x55ff85.substr(0, 5) === "https") {
    let _0x40044c = {
      "category": "jump",
      "des": "getCoupon",
      "url": _0x55ff85.substr(8)
    };
    _0x501b3a = "openApp.jdMobile://virtual?params=" + encodeURIComponent(JSON.stringify(_0x40044c));
  } else {
    if (_0x55ff85.substr(0, 4) === "http") {
      let _0xf5eef5 = {
        "category": "jump",
        "des": "getCoupon",
        "url": _0x55ff85.substr(7)
      };
      _0x501b3a = "openApp.jdMobile://virtual?params=" + encodeURIComponent(JSON.stringify(_0xf5eef5));
    }
  }
  return _0x501b3a;
}
function getCk() {
  return new Promise(_0x4e1185 => {
    let _0x45a298 = {
      "url": "https://lzkjdz-isv.isvjd.com/wxTeam/activity2/activity?activityId=" + $.activityId,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": "https://lzkjdz-isv.isvjd.com/wxTeam/activity2/activity?activityId=" + $.activityId,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x45a298, async (_0x47f32a, _0x29809e, _0x228750) => {
      try {
        _0x47f32a ? (console.log(String(_0x47f32a)), console.log($.name + " cookie API请求失败，请检查网路重试")) : setActivityCookie(_0x29809e);
      } catch (_0x4bc191) {
        $.logErr(_0x4bc191, _0x29809e);
      } finally {
        _0x4e1185();
      }
    });
  });
}
function setActivityCookie(_0x51b164) {
  if (_0x51b164.headers["set-cookie"]) {
    cookie = "";
    for (let _0x370068 of _0x51b164.headers["set-cookie"]) {
      lz_cookie[_0x370068.split(";")[0].substr(0, _0x370068.split(";")[0].indexOf("="))] = _0x370068.split(";")[0].substr(_0x370068.split(";")[0].indexOf("=") + 1);
    }
    for (const _0x47f7fb of Object.keys(lz_cookie)) {
      cookie += _0x47f7fb + "=" + lz_cookie[_0x47f7fb] + ";";
    }
    activityCookie = cookie;
  }
}
function getPin() {
  return new Promise(_0x432c7c => {
    let _0x2c3991 = "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", _0x2c3991), async (_0xead212, _0x47a067, _0x5da7a3) => {
      try {
        _0x47a067.status == 200 && setActivityCookie(_0x47a067);
        _0xead212 ? (console.log("" + JSON.stringify(_0xead212)), console.log($.name + " 3 API请求失败，请检查网路重试")) : safeGet(_0x5da7a3) && (_0x5da7a3 = JSON.parse(_0x5da7a3), _0x5da7a3.result && _0x5da7a3.data ? ($.Pin = _0x5da7a3.data.secretPin, $.attrTouXiang = _0x5da7a3.data.yunMidImageUrl ? _0x5da7a3.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg") : console.log("异常3：" + JSON.stringify(_0x5da7a3)));
      } catch (_0x2e52ea) {
        $.logErr(_0x2e52ea, _0x47a067);
      } finally {
        _0x432c7c();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(_0x2941a2 => {
    let _0x1110f1 = "venderId=" + $.venderId + "&activityId=" + activityId + "&pin=" + encodeURIComponent($.Pin);
    $.post(taskPostUrl("/wxCommonInfo/getActMemberInfo", _0x1110f1), async (_0x6ead8c, _0x21b946, _0x51c2ee) => {
      try {
        if (_0x6ead8c) {
          console.log("" + JSON.stringify(_0x6ead8c));
          console.log($.name + "API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x51c2ee)) {
            _0x51c2ee = JSON.parse(_0x51c2ee);
            if (_0x51c2ee.result && _0x51c2ee.data) {
              if (_0x51c2ee.data.openCardUrl) {
                $.channel = _0x51c2ee.data.openCardUrl.match(/channel=(\d+)/)[1];
                $.joinVenderId = _0x51c2ee.data.openCardUrl.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (_0x210dcf) {
        $.logErr(_0x210dcf, _0x21b946);
      } finally {
        _0x2941a2();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0xf093c0 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x5b3186 = "";
    if ($.shopactivityId) _0x5b3186 = ",\"activityId\":" + $.shopactivityId;
    const _0x275ef5 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x5b3186 + ",\"channel\":406}",
      _0x1b7f08 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x275ef5)
      },
      _0x36cba7 = await getH5st("8adfb", _0x1b7f08),
      _0x228555 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x275ef5 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x36cba7),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x228555, async (_0x10bef7, _0x3ad0d7, _0x77bb4) => {
      try {
        _0x77bb4 = _0x77bb4 && _0x77bb4.match(/jsonp_.*?\((.*?)\);/) && _0x77bb4.match(/jsonp_.*?\((.*?)\);/)[1] || _0x77bb4;
        let _0x1907bc = $.toObj(_0x77bb4, _0x77bb4);
        if (_0x1907bc && typeof _0x1907bc == "object") {
          if (_0x1907bc && _0x1907bc.success === true) {
            console.log(_0x1907bc.message);
            $.errorJoinShop = _0x1907bc.message;
            if (_0x1907bc.result && _0x1907bc.result.giftInfo) {
              for (let _0x44a13f of _0x1907bc.result.giftInfo.giftList) {
                console.log("入会获得: " + _0x44a13f.discountString + _0x44a13f.prizeName + _0x44a13f.secondLineDesc);
              }
            }
            console.log("");
          } else _0x1907bc && typeof _0x1907bc == "object" && _0x1907bc.message ? ($.errorJoinShop = _0x1907bc.message, console.log("" + (_0x1907bc.message || ""))) : console.log(_0x77bb4);
        } else console.log(_0x77bb4);
      } catch (_0x196021) {
        $.logErr(_0x196021, _0x3ad0d7);
      } finally {
        _0xf093c0();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x4ce499 => {
    let _0x49fcd6 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x97f578 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x49fcd6)
      },
      _0x5bcb14 = await getH5st("ef79a", _0x97f578),
      _0x56b39c = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x49fcd6 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x5bcb14),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x56b39c, async (_0x522562, _0x59fc5e, _0xa9d9d1) => {
      try {
        _0xa9d9d1 = _0xa9d9d1 && _0xa9d9d1.match(/jsonp_.*?\((.*?)\);/) && _0xa9d9d1.match(/jsonp_.*?\((.*?)\);/)[1] || _0xa9d9d1;
        let _0x396f05 = $.toObj(_0xa9d9d1, _0xa9d9d1);
        _0x396f05 && typeof _0x396f05 == "object" ? _0x396f05 && _0x396f05.success == true && (console.log("\n去加入店铺会员：" + (_0x396f05.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x396f05.result.interestsRuleList && _0x396f05.result.interestsRuleList[0] && _0x396f05.result.interestsRuleList[0].interestsInfo && _0x396f05.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0xa9d9d1);
      } catch (_0x191c5b) {
        $.logErr(_0x191c5b, _0x59fc5e);
      } finally {
        _0x4ce499();
      }
    });
  });
}
function getTeam() {
  return new Promise(_0x32ec77 => {
    let _0x48fee0 = "activityId=" + activityId + "&pin=" + encodeURIComponent($.Pin);
    if ($.signUuid) _0x48fee0 += "&signUuid=" + $.signUuid;
    $.post(taskPostUrl("/wxTeam/activityContent", _0x48fee0), async (_0x1677fe, _0x4b560f, _0x8bb613) => {
      try {
        if (_0x1677fe) {
          console.log("" + JSON.stringify(_0x1677fe));
          console.log($.name + " 5 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x8bb613)) {
            _0x8bb613 = JSON.parse(_0x8bb613);
            if (_0x8bb613.result && _0x8bb613.data) {
              if (new Date(_0x8bb613.data.active.endTimeStr.replace(/-/g, "/")).getTime() < new Date().getTime()) {
                $.toactivity = false;
                console.log("活动结束");
                messageTitle += "活动结束\n";
                _0x32ec77();
              } else {
                if (!_0x8bb613.data.canCreate && _0x8bb613.data.list == null) message += "人数已满\n";
                _0x8bb613.data.share ? $.memberCount = parseInt(_0x8bb613.data.share.memberCount, 10) + 1 : $.memberCount = 0;
                $.index == 1 && ($.saveTeam = true, $.maxGroup = _0x8bb613.data.active.maxGroup, $.successRetList = _0x8bb613.data.successRetList, $.successRetList.length === $.maxGroup && $.successRetList[$.successRetList.length - 1].memberList.length == 5 && (console.log("活动创建队伍已达到上限且成员已满"), $.noTeamLeader = true));
                $.signUuid && ($.log("去加入队伍 ➜  " + $.signUuid), await joinTeam());
                $.saveTeam && (_0x8bb613.data.canCreate ? await saveTeam() : ($.signUuid = _0x8bb613.data.signUuid, messageTitle += "队伍id: " + $.signUuid + "\n", message += "【京东账号" + $.index + "】 创建队伍id: " + $.signUuid + "\n", $.log("车头队伍 id: " + $.signUuid)));
              }
            } else {
              console.log("异常5：" + JSON.stringify(_0x8bb613));
            }
          }
        }
      } catch (_0x334736) {
        $.logErr(_0x334736, _0x4b560f);
      } finally {
        _0x32ec77(_0x32ec77);
      }
    });
  });
}
function saveTeam(_0x45ade1 = 0) {
  return new Promise(_0x1cf909 => {
    let _0xc850ac = encodeURIComponent($.Pin);
    if (_0x45ade1 == 1) _0xc850ac = encodeURIComponent($.Pin);
    let _0x1b1715 = "activityId=" + activityId + "&pin=" + _0xc850ac + "&pinImg=" + encodeURIComponent($.attrTouXiang);
    $.post(taskPostUrl("/wxTeam/saveCaptain", _0x1b1715), async (_0x17a523, _0x3ab417, _0x5906e1) => {
      try {
        if (_0x17a523) {
          console.log("" + JSON.stringify(_0x17a523));
          console.log($.name + " 6 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x5906e1)) {
            _0x5906e1 = JSON.parse(_0x5906e1);
            if (_0x5906e1.result && _0x5906e1.data) {
              message += "【京东账号" + $.index + "】\n创建队伍 id: " + _0x5906e1.data.signUuid + " ";
              $.signUuid = _0x5906e1.data.signUuid;
              console.log("创建队伍成功，队伍 id: " + $.signUuid);
              messageTitle += "队伍id: " + $.signUuid + " ";
            } else {
              console.log("创建队伍异常：" + _0x5906e1.errorMessage ? _0x5906e1.errorMessage : JSON.stringify(_0x5906e1));
              if (_0x5906e1.errorMessage.indexOf("店铺会员") > -1 && _0x45ade1 != 3) {
                await getshopactivityId();
                $.errorJoinShop = "";
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("第1次 重新开卡");
                  await $.wait(1000);
                  await joinShop();
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第2次 重新开卡"), await $.wait(1000), await joinShop());
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("第3次 重新开卡");
                  await $.wait(1000);
                  await joinShop();
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第4次 重新开卡"), await $.wait(1000), await joinShop());
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第5次 重新开卡"), await $.wait(1000), await joinShop());
                await $.wait(1000);
                await saveTeam(3);
              } else _0x5906e1.errorMessage.indexOf("奖品与您擦肩而过") > -1 && _0x45ade1 == 0 && (await $.wait(1000), await saveTeam(1));
            }
          }
        }
      } catch (_0x4241ca) {
        $.logErr(_0x4241ca, _0x3ab417);
      } finally {
        _0x1cf909();
      }
    });
  });
}
function joinTeam(_0x31ce57 = 0) {
  return new Promise(_0x898338 => {
    let _0x307353 = encodeURIComponent($.Pin);
    if (_0x31ce57 == 1) _0x307353 = encodeURIComponent($.Pin);
    let _0x32f002 = "activityId=" + activityId + "&signUuid=" + $.signUuid + "&pin=" + _0x307353 + "&pinImg=" + encodeURIComponent($.attrTouXiang);
    $.post(taskPostUrl("/wxTeam/saveMember", _0x32f002), async (_0x217452, _0x4a2bf9, _0x5a8bab) => {
      try {
        if (_0x217452) {
          console.log("" + JSON.stringify(_0x217452));
          console.log($.name + " 7 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x5a8bab)) {
            _0x5a8bab = JSON.parse(_0x5a8bab);
            if (_0x5a8bab.result && _0x5a8bab.data) {
              message += "【京东账号" + $.index + "】 加入队伍\n";
              $.log("加入队伍成功");
            } else {
              if (_0x5a8bab.errorMessage.indexOf("店铺会员") > -1 && _0x31ce57 != 3) {
                $.errorJoinShop = "";
                await joinShop();
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(1000), await joinShop());
                await joinTeam(3);
              } else {
                if (_0x5a8bab.errorMessage.indexOf("队伍已经满员") > -1) $.maxTeam = true;else {
                  if (_0x5a8bab.errorMessage.indexOf("奖品与您擦肩而过") > -1 && _0x31ce57 == 0) {
                    await joinTeam(1);
                  } else _0x5a8bab.errorMessage ? console.log("加入异常：" + _0x5a8bab.errorMessage) : (console.log("加入异常：" + JSON.stringify(_0x5a8bab)), message += "【京东账号" + $.index + "】 " + _0x5a8bab.errorMessage + "\n");
                }
              }
            }
          }
        }
      } catch (_0x3543eb) {
        $.logErr(_0x3543eb, _0x4a2bf9);
      } finally {
        _0x898338();
      }
    });
  });
}
function taskPostUrl(_0x4fed18, _0x5d8de3) {
  return {
    "url": "" + activityUrl + _0x4fed18,
    "body": _0x5d8de3,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": "lzkjdz-isv.isvjd.com",
      "Origin": "https://lzkjdz-isv.isvjd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl + "/wxTeam/activity?activityId=" + activityId,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function taskUrl(_0x46bd20, _0x2e0406) {
  return {
    "url": "https://api.m.jd.com/client.action" + _0x46bd20,
    "body": _0x2e0406,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Cookie": cookie,
      "User-Agent": $.UA
    }
  };
}
function TotalBean() {
  return new Promise(async _0x47acf1 => {
    const _0x16ff9e = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.UA
      }
    };
    $.post(_0x16ff9e, (_0x3de511, _0x42618f, _0x1f8592) => {
      try {
        if (_0x3de511) {
          console.log("" + JSON.stringify(_0x3de511));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0x1f8592) {
            _0x1f8592 = JSON.parse(_0x1f8592);
            if (_0x1f8592.retcode === 13) {
              $.isLogin = false;
              return;
            }
          } else console.log("京东服务器返回空数据");
        }
      } catch (_0x243ad6) {
        $.logErr(_0x243ad6, _0x42618f);
      } finally {
        _0x47acf1();
      }
    });
  });
}
function safeGet(_0x5e3f81) {
  if (!_0x5e3f81) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(_0x5e3f81) == "object") return true;
  } catch (_0x276504) {
    return console.log(_0x276504), false;
  }
}
function accessLog() {
  return new Promise(async _0x30c8fa => {
    const _0x359da3 = {
      "url": "https://lzkjdz-isv.isvjd.com/common/accessLogWithAD",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "lzkjdz-isv.isvjd.com",
        "Origin": "https://lzkjdz-isv.isvjd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl + "/wxTeam/activity2/activity?activityId=" + activityId,
        "Cookie": cookie + activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.venderId + "&code=46&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + activityId + "&pageUrl=https%3A%2F%2Flzkjdz-isv.isvjd.com%2FwxTeam%2Factivity2%2Factivity%3FactivityId%3D" + activityId + "&subType=app"
    };
    $.post(_0x359da3, (_0x5d4297, _0x3a2c49, _0x77c5b1) => {
      try {
        _0x5d4297 ? (console.log("" + JSON.stringify(_0x5d4297)), console.log($.name + " API请求失败，请检查网路重试")) : _0x3a2c49.status == 200 && setActivityCookie(_0x3a2c49);
      } catch (_0x510aa9) {
        $.logErr(_0x510aa9, _0x3a2c49);
      } finally {
        _0x30c8fa();
      }
    });
  });
}
function jsonParse(_0x3e6475) {
  if (typeof strv == "string") {
    try {
      return JSON.parse(_0x3e6475);
    } catch (_0x310ade) {
      return console.log(_0x310ade), $.msg($.name, "", "不要在BoxJS手动复制粘贴修改cookie"), [];
    }
  }
}
function GetCookie() {
  if ($request.url.indexOf("/wxTeam/shopInfo") > -1) {
    if ($request.body) {
      let _0x4c3767 = $request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
      if (_0x4c3767) {
        let _0x4f2b4b = $request.url.split("/");
        console.log("activityId: " + _0x4c3767[1]);
        console.log("activityUrl: " + _0x4f2b4b[0] + "//" + _0x4f2b4b[2]);
        $.setdata(_0x4c3767[1], "jd_kr_zdjr_activityId");
        $.setdata(_0x4f2b4b[0] + "//" + _0x4f2b4b[2], "jd_kr_zdjr_activityId");
        $.msg($.name, "获取activityId: 成功", "activityId:" + _0x4c3767[1] + "\nactivityUrl:" + _0x4f2b4b[0] + "//" + _0x4f2b4b[2]);
      } else $.msg($.name, "找不到activityId", "");
    }
  }
}
function generateFp() {
  let _0x532ba0 = "0123456789",
    _0x5ebe41 = 13,
    _0x45a8fd = "";
  for (; _0x5ebe41--;) _0x45a8fd += _0x532ba0[Math.random() * _0x532ba0.length | 0];
  return (_0x45a8fd + Date.now()).slice(0, 16);
}
function geth5st() {
  let _0x1556f1 = Date.now(),
    _0x19fdd0 = generateFp(),
    _0x5e75dc = new Date(_0x1556f1).Format("yyyyMMddhhmmssSSS"),
    _0x1312ce = [";ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;", ";169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;"],
    _0x254c3c = _0x1312ce[random(0, _0x1312ce.length)];
  return encodeURIComponent(_0x5e75dc + ";" + _0x19fdd0 + _0x254c3c + Date.now());
}
Date.prototype.Format = function (_0x53db8b) {
  var _0x165f4a = this,
    _0x201b2a = _0x53db8b,
    _0x3e164b = {
      "M+": _0x165f4a.getMonth() + 1,
      "d+": _0x165f4a.getDate(),
      "D+": _0x165f4a.getDate(),
      "h+": _0x165f4a.getHours(),
      "H+": _0x165f4a.getHours(),
      "m+": _0x165f4a.getMinutes(),
      "s+": _0x165f4a.getSeconds(),
      "w+": _0x165f4a.getDay(),
      "q+": Math.floor((_0x165f4a.getMonth() + 3) / 3),
      "S+": _0x165f4a.getMilliseconds()
    };
  /(y+)/i.test(_0x201b2a) && (_0x201b2a = _0x201b2a.replace(RegExp.$1, "".concat(_0x165f4a.getFullYear()).substr(4 - RegExp.$1.length)));
  for (var _0x5d6936 in _0x3e164b) {
    if (new RegExp("(".concat(_0x5d6936, ")")).test(_0x201b2a)) {
      var _0x47dac6,
        _0x228ef4 = "S+" === _0x5d6936 ? "000" : "00";
      _0x201b2a = _0x201b2a.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x3e164b[_0x5d6936] : ("".concat(_0x228ef4) + _0x3e164b[_0x5d6936]).substr("".concat(_0x3e164b[_0x5d6936]).length));
    }
  }
  return _0x201b2a;
};
function random(_0x8ccb7f, _0x3fed64) {
  return Math.floor(Math.random() * (_0x3fed64 - _0x8ccb7f)) + _0x8ccb7f;
}
