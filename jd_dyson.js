/*
入口 京东戴森自营
全自动版本18助力,自动刷新,少头可以用手动版本补
7 7 7 7 7 jd_dyson.js
*/
const Env=require('./utils/Env.js');
const $ = new Env("戴森会员赢好礼-自动");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
  cookie = "";
let venderId = "100000000000417";
let activityId = "";
let member_id = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x3b474f => {
    cookiesArr.push(jdCookieNode[_0x3b474f]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(_0x3b7199 => _0x3b7199.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(_0x5547c4 => !!_0x5547c4);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.helpNum = 0;
  for (let _0x34301c = 0; _0x34301c < cookiesArr.length; _0x34301c++) {
    if (cookiesArr[_0x34301c]) {
      cookie = cookiesArr[_0x34301c];
      originCookie = cookiesArr[_0x34301c];
      newCookie = "";
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x34301c + 1;
      $.isLogin = true;
      $.nickName = "";
      await checkCookie();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {}
        continue;
      }
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      await dyson();
      console.log("当前助力人数 " + $.helpNum);
      if ($.helpNum >= 18 || isNaN($.helpNum)) {
        break;
      }
      await $.wait(1000);
    }
  }
})().catch(_0x2104df => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2104df + "!", "");
}).finally(() => {
  $.done();
});
async function dyson() {
  $.token = null;
  $.secretPin = null;
  $.openCardActivityId = null;
  $.res = null;
  $.openCardStatus = 1;
  $.radom = getUUID("xxxxxxxxxxxxxxxx");
  if ($.index === 1) {
    await getShopOpenCardInfo({
      "venderId": "" + venderId,
      "channel": "401"
    });
    if ($.openCardStatus === 0) {
      await bindWithVender({
        "venderId": "" + venderId,
        "bindByVerifyCodeFlag": 1,
        "registerExtend": {},
        "writeChildFlag": 0,
        "activityId": $.openCardActivityId,
        "channel": 401
      }, venderId);
    }
    await getFansFuseMemberDetail();
    await getToken();
    if ($.token) {
      await getZkyai("user/loginjingdong", "account=" + $.token + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&_=" + Date.now());
      await taskZkyai("fission/update-invited-record", "activity_id=" + activityId + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account));
      await taskZkyai("fission/update-invited-record", "activity_id=" + activityId + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account));
      await getZkyai("fission/get-hd-trace", "activity_id=" + activityId + "&page_size=10&page_num=1&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account) + "&_=" + Date.now());
    }
  }
  if ($.index != 1) {
    console.log("去助力 " + member_id);
    await getShopOpenCardInfo({
      "venderId": "" + venderId,
      "channel": "401"
    });
    if ($.openCardStatus === 0) {
      await getToken();
      if ($.token) {
        await getZkyai("user/loginjingdong", "account=" + $.token + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&_=" + Date.now());
        await getZkyai("fission/get-activity-detail", "activity_id=" + activityId + "&mixnick=" + $.token + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&__=" + Date.now());
        if ($.activity) {
          await taskZkyai("activity/visit", "activity_id=" + activityId + "&platform_open_id=" + $.token + "&platform_type=2&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account));
          await taskZkyai("fission/report-hd-trace", "activity_id=" + activityId + "&mix_nick=" + $.token + "&action=5&relation_open_id=" + $.loginjingdong + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account));
          await taskZkyai("invite/invites", "act_id=" + activityId + "&invited_id=" + $.token + "&invited_member_id=&act_type=29&type=19&member_id=" + member_id + "&timestamp=" + Date.now() + "&invite_url_id=&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account));
          await bindWithVender({
            "venderId": "" + venderId,
            "bindByVerifyCodeFlag": 1,
            "registerExtend": {},
            "writeChildFlag": 0,
            "activityId": $.openCardActivityId,
            "channel": 401
          }, venderId);
          await getZkyai("user/loginjingdong", "account=" + $.token + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&_=" + Date.now());
          await getZkyai("fission/get-activity-detail", "activity_id=" + activityId + "&mixnick=" + $.token + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&__=" + Date.now());
        }
      }
    } else {
      console.log("已经是会员");
    }
  }
}
async function exchange() {
  $.token = null;
  $.secretPin = null;
  $.openCardActivityId = null;
  $.res = null;
  $.openCardStatus = 1;
  $.radom = getUUID("xxxxxxxxxxxxxxxx");
  if ($.index === 1) {
    await getToken();
    if ($.token) {
      await getZkyai("user/loginjingdong", "account=" + $.token + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&_=" + Date.now());
      await taskZkyai("fission/update-invited-record", "activity_id=" + activityId + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account));
      await taskZkyai("fission/update-invited-record", "activity_id=" + activityId + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account));
      await getZkyai("fission/get-hd-trace", "activity_id=" + activityId + "&page_size=10&page_num=1&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account) + "&_=" + Date.now());
      await getZkyai("fission/get-activity-info", "activity_id=" + activityId + "&mixnick=" + $.token + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account) + "&_=" + Date.now());
      if (parseInt($.everyday_available_num) > 0) {
        await taskZkyai("fission/draw-ladder-award", "activity_id=" + activityId + "&reward_tag=ladder_level3&jdToken=" + $.token + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account));
        if ($.join_id) {
          await getZkyai("exchange/memberexchangedetail", "orderId=&joinId=" + $.join_id + "&merchantNum=2000062&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account) + "&_=" + Date.now());
          await taskZkyai("draw/acceptreward", "merchantNum=2000062&platform=2&token=&props%5B0%5D%5BpropId%5D=8&props%5B0%5D%5Bvalue%5D=4275&joinId=" + $.join_id + "&amount=1&traceId=" + $.radom + "&refresh=0&protocol=https&jd_token=" + encodeURIComponent($.account));
        } else {
          console.log("当前无可兑换");
        }
      }
    }
  }
}
async function getZkyai(_0x3e0299, _0x1a4fed) {
  return new Promise(async _0x250217 => {
    const _0x40129a = {
      "url": "https://vip.zkyai.com/apis/" + _0x3e0299 + "?" + _0x1a4fed,
      "headers": {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Host": "vip.zkyai.com",
        "Origin": "https://jyds-isv.isvjcloud.com",
        "Referer": "https://jyds-isv.isvjcloud.com/",
        "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Cookie": ""
      }
    };
    $.get(_0x40129a, (_0x5e4522, _0x3ca072, _0x2829a4) => {
      try {
        if (_0x5e4522) {
          console.log("" + JSON.stringify(_0x5e4522));
        } else {
          if (_0x2829a4) {
            _0x2829a4 = JSON.parse(_0x2829a4);
            switch (_0x3e0299) {
              case "user/loginjingdong":
                if ($.index === 1) {
                  console.log("助力码 --> " + _0x2829a4.data.member_id);
                  member_id = _0x2829a4.data.member_id;
                }
                $.loginjingdong = _0x2829a4;
                $.account = _0x2829a4.data.account;
                break;
              case "fission/get-hd-trace":
                if ($.index === 1) {
                  console.log("已经助力人数 " + _0x2829a4.data.invite_register_count);
                  $.helpNum = parseInt(_0x2829a4.data.invite_register_count);
                }
                break;
              case "exchange/memberexchangedetail":
                console.log(_0x2829a4.msg);
                break;
              case "fission/get-activity-info":
                if (_0x2829a4.data.rules[3].everyday_available_num) {
                  console.log("当前剩余" + _0x2829a4.data.rules[3].everyday_available_num);
                  $.everyday_available_num = _0x2829a4.data.rules[3].everyday_available_num;
                }
                break;
              case "fission/get-activity-detail":
                $.activity = _0x2829a4;
                break;
              default:
                console.log(_0x2829a4);
                break;
            }
          } else {
            console.log("京东服务器返回空数据");
          }
        }
      } catch (_0x561448) {
        $.logErr(_0x561448, _0x3ca072);
      } finally {
        _0x250217();
      }
    });
  });
}
async function taskZkyai(_0xf76f93, _0x54cedd) {
  let _0x3e6e38 = {
    "url": "https://vip.zkyai.com/apis/" + _0xf76f93,
    "headers": {
      "Host": "vip.zkyai.com",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://jyds-isv.isvjcloud.com",
      "Accept-Encoding": "gzip, deflate, br",
      "Connection": "keep-alive",
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Referer": "https://jyds-isv.isvjcloud.com/",
      "Accept-Language": "zh-cn"
    },
    "body": _0x54cedd
  };
  return new Promise(_0x493650 => {
    $.post(_0x3e6e38, (_0x1ef649, _0x3db3c0, _0xa6f1f3) => {
      try {
        if (_0x1ef649) {
          $.log(_0x1ef649);
        } else {
          if (_0xa6f1f3) {
            _0xa6f1f3 = JSON.parse(_0xa6f1f3);
            switch (_0xf76f93) {
              case "fission/update-invited-record":
                console.log("刷新数据...");
                break;
              case "fission/draw-ladder-award":
                if (_0xa6f1f3.data.join_id) {
                  $.join_id = _0xa6f1f3.data.join_id;
                  console.log("join_id " + $.join_id);
                }
                break;
              case "draw/acceptreward":
                console.log(_0xa6f1f3.msg);
                break;
              default:
                console.log(_0xa6f1f3);
                break;
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0x2bd74e) {
        $.log(_0x2bd74e);
      } finally {
        _0x493650();
      }
    });
  });
}
function random(_0x5d36d8, _0x5b03f3) {
  return Math.floor(Math.random() * (_0x5b03f3 - _0x5d36d8)) + _0x5d36d8;
}
function getSubstr(_0xfd14d1, _0x2a65f7, _0x16e432) {
  let _0x5286cc = _0xfd14d1.indexOf(_0x2a65f7);
  let _0x331100 = _0xfd14d1.indexOf(_0x16e432, _0x5286cc);
  if (_0x5286cc < 0 || _0x331100 < _0x5286cc) return "";
  return _0xfd14d1.substring(_0x5286cc + _0x2a65f7.length, _0x331100);
}
function getUUID(_0x649d5c = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x286425 = 0) {
  return _0x649d5c.replace(/[xy]/g, function (_0x2c88ff) {
    var _0xa32e65 = Math.random() * 16 | 0,
      _0x45da4b = _0x2c88ff == "x" ? _0xa32e65 : _0xa32e65 & 3 | 8;
    if (_0x286425) {
      uuid = _0x45da4b.toString(36).toUpperCase();
    } else {
      uuid = _0x45da4b.toString(36);
    }
    return uuid;
  });
}
function checkCookie() {
  const _0x58d8a7 = {
    "url": "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
    "headers": {
      "Host": "me-api.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(_0x58d21c => {
    $.get(_0x58d8a7, (_0x38e1ce, _0x44cb84, _0x5971b8) => {
      try {
        if (_0x38e1ce) {
          $.logErr(_0x38e1ce);
        } else {
          if (_0x5971b8) {
            _0x5971b8 = JSON.parse(_0x5971b8);
            if (_0x5971b8.retcode === "1001") {
              $.isLogin = false;
              return;
            }
            if (_0x5971b8.retcode === "0" && _0x5971b8.data.hasOwnProperty("userInfo")) {
              $.nickName = _0x5971b8.data.userInfo.baseInfo.nickname;
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0xb3b8c9) {
        $.logErr(_0xb3b8c9);
      } finally {
        _0x58d21c();
      }
    });
  });
}
async function getShopOpenCardInfo(_0xcf3951, _0xb6d6d) {
  return h5st = await geth5st("getShopOpenCardInfo", _0xcf3951, 0), opt = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(_0xcf3951)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=" + h5st.body,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Accept-Language": "zh-cn",
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + _0xb6d6d + "}&channel=801&returnUrl=" + encodeURIComponent($.activityUrl),
      "Accept-Encoding": "gzip, deflate, br"
    }
  }, new Promise(_0x509c21 => {
    $.get(opt, (_0x9defc6, _0x15c019, _0x40c4ca) => {
      try {
        if (_0x9defc6) {
          console.log(_0x9defc6);
        } else {
          _0x40c4ca = JSON.parse(_0x40c4ca);
          if (_0x40c4ca.success) {
            if (_0x40c4ca.result.userInfo) {
              $.openCardStatus = _0x40c4ca.result.userInfo.openCardStatus;
            }
          }
        }
      } catch (_0x52a0eb) {
        console.log(_0x52a0eb);
      } finally {
        _0x509c21();
      }
    });
  });
}
async function bindWithVender(_0x1e0662, _0x744051) {
  return h5st = await geth5st("bindWithVender", _0x1e0662, 0), opt = {
    "url": "https://api.m.jd.com/client.action?" + h5st,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Accept-Language": "zh-cn",
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + _0x744051 + "}&channel=401&returnUrl=" + encodeURIComponent($.activityUrl),
      "Accept-Encoding": "gzip, deflate, br"
    }
  }, new Promise(_0x2cf513 => {
    $.get(opt, (_0x35c35a, _0xe63912, _0x112b67) => {
      try {
        if (_0x35c35a) {
          console.log(_0x35c35a);
        } else {
          res = JSON.parse(_0x112b67);
          if (res.success) {
            if (res.message) {
              console.log(res.message);
              if (res.message === "加入店铺会员成功") {
                $.helpNum += 1;
              }
            }
            $.bindWithVendermessage = res.message;
          }
        }
      } catch (_0x46ed0c) {
        console.log(_0x46ed0c);
      } finally {
        _0x2cf513();
      }
    });
  });
}
async function getToken() {
  let _0x1560f4 = await getSign("isvObfuscator", {
    "url": "https://jyds-isv.isvjcloud.com/page/index-20220906.php?instId=292&merchantNum=2000062&type=6&platform=2&aid=2705616&disableNav=YES&_wvUseWKWebView=YES&sid=ee9a73b2b0a52363ebc110e846a1ff1w&un_area=22_1930_50949_60587",
    "id": ""
  });
  let _0x3b170d = {
    "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "JD4iPhone/168271%20(iPhone;%20iOS;%20Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br",
      "referer": ""
    },
    "body": _0x1560f4
  };
  return new Promise(_0xe13b81 => {
    $.post(_0x3b170d, (_0x4ff730, _0x2af957, _0x16cbc9) => {
      try {
        if (_0x4ff730) {
          $.log(_0x4ff730);
        } else {
          if (_0x16cbc9) {
            _0x16cbc9 = JSON.parse(_0x16cbc9);
            if (_0x16cbc9.code === "0") {
              $.token = _0x16cbc9.token;
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0x437c82) {
        $.log(_0x437c82);
      } finally {
        _0xe13b81();
      }
    });
  });
}
async function getFansFuseMemberDetail() {
  let _0x46bb9e = await getSign("getFansFuseMemberDetail", {
    "shopId": "1000003263",
    "channel": 102,
    "queryVersion": "10.5.2",
    "venderId": "1000003263"
  });
  let _0x5c7c45 = {
    "url": "https://api.m.jd.com/client.action?functionId=getFansFuseMemberDetail",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "JD4iPhone/168271%20(iPhone;%20iOS;%20Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br",
      "referer": ""
    },
    "body": _0x46bb9e
  };
  return new Promise(_0x574248 => {
    $.post(_0x5c7c45, (_0x3fce72, _0x39ede8, _0xb0ac4f) => {
      try {
        if (_0x3fce72) {
          $.log(_0x3fce72);
        } else {
          if (_0xb0ac4f) {
            _0xb0ac4f = JSON.parse(_0xb0ac4f);
            if (_0xb0ac4f.code === "0") {
              if (_0xb0ac4f.data[0].cardRightsList[0].rightsList) {
                for (const _0x2202c7 of _0xb0ac4f.data[0].cardRightsList[0].rightsList) {
                  if (_0x2202c7.name === "邀好友赢E卡") {
                    activityId = getSubstr(_0x2202c7.url, "instId=", "&merchantNum=").replace(" ;", "");
                    console.log("获取活动URL " + _0x2202c7.url);
                    console.log("获取活动ID " + activityId);
                  }
                }
              }
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0x2b17fa) {
        $.log(_0x2b17fa);
      } finally {
        _0x574248();
      }
    });
  });
}
function getSign(_0x589624, _0x24bba8) {
  return new Promise(async _0x4002e7 => {
    let _0x530d6d = {
      "functionId": _0x589624,
      "body": JSON.stringify(_0x24bba8),
      "activityId": "okyyds"
    };
    let _0x42812b = "";
    let _0x549062 = ["jdsign.eu.org"];
    if (process.env.SIGN_URL) {
      _0x42812b = process.env.SIGN_URL;
    } else {
      _0x42812b = _0x549062[Math.floor(Math.random() * _0x549062.length)];
    }
    let _0x4e08be = {
      "url": "https://cdn.nz.lu/ddo",
      "body": JSON.stringify(_0x530d6d),
      "headers": {
        "Host": _0x42812b,
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "timeout": 30 * 1000
    };
    $.post(_0x4e08be, (_0x348d1b, _0x248c5e, _0x530d6d) => {
      try {
        if (_0x348d1b) {
          console.log("" + JSON.stringify(_0x348d1b));
          console.log($.name + " getSign API请求失败，请检查网路重试");
        } else {}
      } catch (_0x1298b9) {
        $.logErr(_0x1298b9, _0x248c5e);
      } finally {
        _0x4002e7(_0x530d6d);
      }
    });
  });
}
function geth5st(_0x5bd3e6, _0x22d36d) {
  return new Promise(async _0x71e5fe => {
    let _0x49f543 = {
      "appId": "8adfb",
      "body": {
        "appid": "jd_shop_member",
        "functionId": _0x5bd3e6,
        "body": JSON.stringify(_0x22d36d),
        "clientVersion": "9.2.0",
        "client": "H5",
        "activityId": "11111130"
      },
      "callbackAll": true
    };
    let _0x4a9920 = "";
    let _0x1e238d = ["jdsign.eu.org"];
    if (process.env.SIGN_URL) {
      _0x4a9920 = process.env.SIGN_URL;
    } else {
      _0x4a9920 = _0x1e238d[Math.floor(Math.random() * _0x1e238d.length)];
    }
    let _0x14642e = {
      "url": "https://cdn.nz.lu/geth5st",
      "body": JSON.stringify(_0x49f543),
      "headers": {
        "Host": _0x4a9920,
        "Content-Type": "application/json"
      },
      "timeout": 30 * 1000
    };
    $.post(_0x14642e, async (_0x4b7186, _0x2ebfd9, _0x49f543) => {
      try {
        if (_0x4b7186) {
          _0x49f543 = await geth5st.apply(this, arguments);
        } else {}
      } catch (_0x3be9b4) {
        $.logErr(_0x3be9b4, _0x2ebfd9);
      } finally {
        _0x71e5fe(_0x49f543);
      }
    });
  });
}

!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);