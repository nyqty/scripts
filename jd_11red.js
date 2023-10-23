/*
变量：CODE11='7位字母'
export CODE11="xxxxxxx"

每次领取红包次数
export RedCount="5"
每个账号之间延时单位毫秒
export RedTimes="5000"
0 0,10,20 * * 1 jd_11red.js
*/

const Env=require('./utils/Env.js');
const $ = new Env('11red');
const _0x41e528 = $.isNode() ? require("./jdCookie.js") : "";
let _0x22101d = "",
  _0x1d8d2c = 5000,
  _0x26bb90 = 4,
  _0x4aef33 = 0;
$.CryptoJS = require("crypto-js");
if (process.env.DY_PROXY) {
  try {
    require("https-proxy-agent");
    ccc = require("./function/proxy.js");
    $.dget = ccc.intoRequest($.get.bind($));
    $.dpost = ccc.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}
let _0x4482cd = [],
  _0x1ea268 = "";
if ($.isNode()) {
  Object.keys(_0x41e528).forEach(_0x70472c => {
    _0x4482cd.push(_0x41e528[_0x70472c]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x4482cd = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x147d85($.getdata("CookiesJD") || "[]").map(_0x31ecc6 => _0x31ecc6.cookie)].filter(_0x4b2dfe => !!_0x4b2dfe);
}
let _0xf46956 = "";
if (!_0xf46956) {
  _0xf46956 = "";
}
_0xf46956 = $.isNode() ? process.env.JD_nhj_rebatePin ? process.env.JD_nhj_rebatePin : "" + _0xf46956 : $.getdata("JD_nhj_rebatePin") ? $.getdata("JD_nhj_rebatePin") : "" + _0xf46956;
_0x26bb90 = $.isNode() ? process.env.JD_231111_RedCount ? process.env.JD_231111_RedCount : "" + _0x26bb90 : $.getdata("JD_231111_RedCount") ? $.getdata("JD_231111_RedCount") : "" + _0x26bb90;
_0x1d8d2c = $.isNode() ? process.env.JD_231111_RedTimes ? process.env.JD_231111_RedTimes : "" + _0x1d8d2c : $.getdata("JD_231111_RedTimes") ? $.getdata("JD_231111_RedTimes") : "" + _0x1d8d2c;
$.shareCount = $.isNode() ? process.env.JD_nhj_shareHelpCount ? process.env.JD_nhj_shareHelpCount : "" + _0x4aef33 : $.getdata("JD_nhj_shareHelpCount") ? $.getdata("JD_nhj_shareHelpCount") : "" + _0x4aef33;
$.shareCount = parseInt($.shareCount, 10) || 0;
let _0x4c1dae = _0xf46956 && _0xf46956.split(",") || [];
$.time("yyyy-MM-dd HH:mm:ss");
message = "";
let _0x2b2fc1 = "";
resMsg = "";
$.uiUpdateTime = "";
$.endFlag = false;
$.runEnd = false;
let _0x19ed3d = {};
$.getH5st_WQ_Arr = {};
$.runArr = {};
let _0x1ecbba = "";
const _0x2141d9 = "2023/11/12 00:00:00+08:00";
let _0x2eddb5 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
$.UVCookieArr = {};
lr = {};
$.UVCookie = "";
let _0x2393b9 = "",
  _0x1542b3 = 2;
_0x1d8d2c = Number(_0x1d8d2c);
$.time("yyyy-MM-dd");
_0x195d6c();
!(async () => {
  $.log("\nDY_PROXY='代理api_url'");
  let _0x2d1d1c = await _0x29f4c2();
  if (_0x2d1d1c.length === 0) {
    _0x2d1d1c = ["0qAuac9"];
  }
  _0x2d1d1c = _0x2d1d1c[Math.floor(Math.random() * _0x2d1d1c.length)];
  if (!_0x22101d) {
    _0x22101d = "https://u.jd.com/" + (_0x2d1d1c || "0qAuac9");
  }
  _0x22101d = $.isNode() ? process.env.CODE11 ? process.env.CODE11 : "" + _0x22101d : $.getdata("CODE11") ? $.getdata("CODE11") : "" + _0x22101d;
  ii1I11 = _0x22101d + "";
  if (/https:\/\/u\.jd\.com\/.+/.test(ii1I11)) {
    if (ii1I11.split("/").pop()) {
      ii1I11 = ii1I11.split("/").pop().split("?").shift();
    } else {
      console.log("请填写正确的rebateCode");
      return;
    }
  }
  if (!_0x4482cd[0]) {
    const _0x5294a8 = {
      "open-url": "https://bean.m.jd.com/"
    };
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", _0x5294a8);
    return;
  }
  if (_0x2eddb5 > new Date(_0x2141d9).getTime()) {
    $.msg($.name, "活动已结束", "请删除此脚本");
    $.setdata("", "JD_231111_Red");
    $.setdata("", "JD_231111_Red_pin");
    return;
  }
  console.log("CODE：" + ii1I11.replace(/.+(.{3})/, "***$1"));
  $.shareCodeArr = {};
  $.shareCodePinArr = $.getdata("JD_231111_Red_pin") || {};
  $.shareCode = "";
  $.again = false;
  if ($.end) {
    return;
  }
  for (let _0x18943e = 0; _0x18943e < _0x4482cd.length && !$.runEnd; _0x18943e++) {
    if ($.endFlag) {
      break;
    }
    _0x1ea268 = _0x4482cd[_0x18943e];
    if (_0x1ea268) {
      $.UserName = decodeURIComponent(_0x1ea268.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1ea268.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x18943e + 1;
      if ($.runArr[$.UserName]) {
        continue;
      }
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let _0x211066 = 1;
      _0x1542b3 = 4;
      $.eid_token = "";
      _0x51b4a9(_0x211066);
      await _0x4e6de9();
      await _0x2f8bf1();
      if ($.endFlag) {
        break;
      }
    }
    $.setdata($.shareCodePinArr, "JD_231111_Red_pin");
  }
  $.setdata($.shareCodePinArr, "JD_231111_Red_pin");
  if (message) {
    $.isNode();
  }
})().catch(_0x37f3cc => $.logErr(_0x37f3cc)).finally(() => {
  $.done();
});
async function _0x2f8bf1(_0x38f379 = 0) {
  try {
    _0x38f379 == 0 && (_0x38192b("6a98d", $.UA), await _0x1ecbba.__genAlgo());
    $.UVCookie = $.UVCookieArr[$.UserName] || "";
    !$.UVCookie && _0x195d6c();
    resMsg = "";
    let _0x3af57e = false,
      _0x3fa489 = 0,
      _0x5b4ca0 = 0,
      _0x29c5d8 = 0;
    $.shareFlag = true;
    do {
      if (_0x5b4ca0 > 2) {
        _0x3fa489 = 0;
      }
      $.flag = 0;
      _0x2b2fc1 = "";
      $.url1 = "";
      await _0x48b531();
      if (!$.url1) {
        console.log("获取url1失败");
        $.end = true;
        break;
      }
      $.url2 = "";
      $.UVCookie = _0x2393b9.getUVCookie("", "", $.url1, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      await _0x212a51();
      if (!$.url2) {
        console.log("获取不到红包页面");
        break;
      }
      if (!/unionActId=\d+/.test($.url2) && !new RegExp("&d=" + ii1I11).test($.url2)) {
        console.log("url：https://u.jd.com/" + ii1I11 + " 可能不是红包页面");
        $.runEnd = true;
        return;
      }
      if (!$.url2) {
        $.url2 = "https://pro.m.jd.com/mall/active/2AFDsGQNAcLxkw5i9L87sGDEdPvE/index.html?unionActId=31165&d=" + ii1I11 + "&cu=true&utm_source=kong&utm_medium=jingfen";
      }
      $.actId = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/mall\/active\/([^/]+)\/index\.html/)[1] || "2AFDsGQNAcLxkw5i9L87sGDEdPvE";
      $.UVCookie = _0x2393b9.getUVCookie("", "", $.url2, $.UVCookie);
      $.origin = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/)[1] || "https://pro.m.jd.com";
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      $.eid = "";
      !$.eid && ($.eid = -1);
      if (_0x38f379 == 0) {
        let _0x31442a = 0,
          _0x35cfea = true,
          _0x725ddc = 0;
        if (Object.getOwnPropertyNames(_0x19ed3d).length > _0x3fa489 && $.shareFlag) {
          for (let _0x304df7 in _0x19ed3d || {}) {
            if (_0x304df7 == $.UserName) {
              $.flag = 1;
              continue;
            }
            if (_0x31442a == _0x3fa489) {
              $.flag = 0;
              $.shareCode = _0x19ed3d[_0x304df7] || "";
              if ($.shareCodePinArr[_0x304df7] && $.shareCodePinArr[_0x304df7].includes($.UserName)) {
                _0x725ddc++;
                continue;
              }
              if ($.shareCode.count >= $.shareCodeArr.shareCount) {
                _0x725ddc++;
                continue;
              }
              $.getlj = false;
              if ($.shareCode) {
                console.log("助力[" + _0x304df7 + "]");
              }
              let _0x26ce29 = await _0x20ee6d($.shareCode.code, 1);
              if (/重复助力/.test(_0x26ce29)) {
                if (!$.shareCodePinArr[_0x304df7]) {
                  $.shareCodePinArr[_0x304df7] = [];
                }
                $.shareCodePinArr[_0x304df7].push($.UserName);
                _0x3fa489--;
                _0x29c5d8--;
              } else {
                if (/助力/.test(_0x26ce29) && /上限/.test(_0x26ce29)) {
                  $.shareFlag = false;
                } else {
                  if (!/领取上限/.test(_0x26ce29) && $.getlj == true) {
                    if (!$.shareCodePinArr[_0x304df7]) {
                      $.shareCodePinArr[_0x304df7] = [];
                    }
                    !$.shareCodePinArr[_0x304df7].includes($.UserName) && $.shareCodePinArr[_0x304df7].push($.UserName);
                    _0x3fa489--;
                  } else {
                    _0x35cfea = false;
                  }
                }
              }
            }
            _0x31442a++;
          }
        }
        _0x35cfea && _0x725ddc == Object.getOwnPropertyNames(_0x19ed3d).length && (_0x3af57e = true);
        if (_0x31442a == 0) {
          $.getlj = false;
          let _0x28b2db = await _0x20ee6d("", 1);
          !/领取上限/.test(_0x28b2db) && $.getlj == true && _0x3fa489--;
        }
        if ($.endFlag) {
          break;
        }
      } else {
        let _0x5ec601 = await _0x2ca91d();
        if (!$.endFlag && _0x5ec601 && $.again == false) {
          await _0x475ba3();
        }
        if ($.again == false) {
          break;
        }
      }
      $.again == true && _0x5b4ca0 < 1 && (_0x5b4ca0++, $.again = false);
      _0x3fa489++;
      _0x29c5d8++;
      $.flag == 1 && (await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
      if (_0x26bb90 > 0 && _0x26bb90 <= _0x29c5d8) {
        break;
      }
    } while ($.flag == 1 && _0x3fa489 < 4);
    if ($.endFlag) {
      return;
    }
    resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
    _0x3af57e;
    if ($.index % 10 == 0) {
      let _0x361c28 = parseInt(Math.random() * 1000 + _0x1d8d2c, 10);
      console.log("等待 " + _0x361c28 / 1000 + " 秒");
      await $.wait(_0x361c28);
    } else {
      await $.wait(Math.random() * 2000 + 3000, 10);
    }
  } catch (_0x3ed887) {
    console.log(_0x3ed887);
  }
}
async function _0x59930f(_0x41145b = 0) {
  try {
    let _0x46b638 = 2;
    if (_0x41145b == 1) {
      _0x46b638 = 1;
    }
    let _0x181401 = 0;
    for (let _0x20b5f7 in $.shareCodeArr || {}) {
      if (_0x20b5f7 === "flag" || _0x20b5f7 === "updateTime" || _0x20b5f7 === "shareCount") {
        continue;
      }
      if ($.shareCodeArr[_0x20b5f7] && $.shareCodeArr.shareCount && $.shareCodeArr[_0x20b5f7].count < $.shareCodeArr.shareCount) {
        _0x181401++;
      }
    }
    for (let _0x490eb5 = 0; _0x490eb5 < _0x4482cd.length && !$.runEnd; _0x490eb5++) {
      _0x1ea268 = _0x4482cd[_0x490eb5];
      if (_0x1ea268) {
        $.UserName = decodeURIComponent(_0x1ea268.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1ea268.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x4c1dae.length > 0 && _0x4c1dae.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) {
          continue;
        }
        $.index = _0x490eb5 + 1;
        $.eid_token = "";
        _0x51b4a9();
        await _0x4e6de9();
        await _0x2f8bf1(1);
        let _0x308145 = 0;
        for (let _0x346922 in $.shareCodeArr || {}) {
          if (_0x346922 === "flag" || _0x346922 === "updateTime" || _0x346922 === "shareCount") {
            continue;
          }
          if ($.shareCodeArr[_0x346922] && $.shareCodeArr.shareCount && $.shareCodeArr[_0x346922].count < $.shareCodeArr.shareCount) {
            _0x308145++;
          }
        }
        if ($.endFlag || _0x308145 - _0x181401 >= _0x46b638 || $.end) {
          break;
        }
      }
    }
  } catch (_0x24185b) {
    console.log(_0x24185b);
  }
  if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) {
    for (let _0x4b593a in $.shareCodeArr || {}) {
      if (_0x4b593a === "flag" || _0x4b593a === "updateTime" || _0x4b593a === "shareCount") {
        continue;
      }
      if ($.shareCodeArr[_0x4b593a]) {
        _0x19ed3d[_0x4b593a] = $.shareCodeArr[_0x4b593a];
      }
    }
  }
}
function _0x20ee6d(_0x1c2e28 = "", _0x4528f8 = 1) {
  return new Promise(async _0x4a4154 => {
    $.UVCookie = _0x2393b9.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let _0x71c610 = "",
      _0x5f0e15 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
    const _0xe60d02 = {
      "platform": _0x1542b3,
      "unionActId": "31165",
      "actId": $.actId,
      "d": ii1I11,
      "unionShareId": _0x1c2e28,
      "type": _0x4528f8
    };
    const _0x279e04 = {
      "appid": "u",
      "body": JSON.stringify(_0xe60d02),
      "client": "apple",
      "clientVersion": $.UA.split(";")[2] || "1.1.0",
      "functionId": "getCoupons"
    };
    let _0x4f4d45 = _0x1ecbba.__genH5st(_0x279e04, $.UserName);
    _0x71c610 = _0x4f4d45.h5st || "";
    let _0x570bc3 = "",
      _0x1f0d56 = {
        "url": "https://api.m.jd.com/api",
        "body": "functionId=getCoupons&appid=" + _0x279e04.appid + "&_=" + _0x5f0e15 + "&loginType=2&body=" + encodeURIComponent($.toStr(_0xe60d02)) + "&client=" + _0x279e04.client + "&clientVersion=" + _0x279e04.clientVersion + "&h5st=" + encodeURIComponent(_0x71c610) + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
        "headers": {
          "accept": "*/*",
          "Accept-Language": "zh-cn",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          "Cookie": "" + $.UVCookie + _0x2b2fc1 + " " + _0x1ea268,
          "origin": $.origin,
          "Referer": $.origin + "/",
          "User-Agent": $.UA
        }
      };
    _0x1f0d56.headers.Cookie = _0x1f0d56.headers.Cookie.replace(/;\s*$/, "");
    _0x1f0d56.headers.Cookie = _0x1f0d56.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) {
      _0x1f0d56.headers.Referer = $.url2;
    }
    $.dpost(_0x1f0d56, async (_0x15790c, _0x5e0d17, _0x3a9f7e) => {
      try {
        if (_0x15790c) {
          console.log("" + $.toStr(_0x15790c));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let _0x1aa9c6 = $.toObj(_0x3a9f7e, _0x3a9f7e);
          if (typeof _0x1aa9c6 == "object") {
            _0x1aa9c6.msg && (_0x570bc3 = _0x1aa9c6.msg, console.log(_0x1aa9c6.msg));
            if (_0x1aa9c6.msg.indexOf("不展示弹层") > -1 && _0x4528f8 == 1) {
              $.again = true;
            }
            if (_0x1aa9c6.msg.indexOf("领取上限") === -1 && _0x1aa9c6.msg.indexOf("登录") === -1) {
              if (_0x4528f8 == 1) {
                $.flag = 1;
              }
            }
            if (_0x1aa9c6.msg.indexOf("活动已结束") > -1 || _0x1aa9c6.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            _0x1c2e28 && typeof _0x1aa9c6.data !== "undefined" && typeof _0x1aa9c6.data.joinNum !== "undefined" && console.log("当前" + _0x1aa9c6.data.joinSuffix + ":" + _0x1aa9c6.data.joinNum);
            if (_0x1aa9c6.code == 0 && _0x1aa9c6.data) {
              if (_0x4528f8 == 1) {
                $.shareCode.count++;
              }
              let _0x4b32a7 = "";
              for (let _0x4034c0 of _0x1aa9c6.data.couponList) {
                if (_0x4034c0.type == 1) {
                  $.getlj = true;
                  _0x4b32a7 += (_0x4b32a7 ? "\n" : "") + "获得[红包]🧧" + _0x4034c0.discount + "元 使用时间:" + $.time("yyyy-MM-dd", _0x4034c0.beginTime) + " " + $.time("yyyy-MM-dd", _0x4034c0.endTime);
                } else {
                  if (_0x4034c0.type == 3) {
                    $.getlj = true;
                    _0x4b32a7 += (_0x4b32a7 ? "\n" : "") + "获得[优惠券]🎟️满" + _0x4034c0.quota + "减" + _0x4034c0.discount + " 使用时间:" + $.time("yyyy-MM-dd", _0x4034c0.beginTime) + " " + $.time("yyyy-MM-dd", _0x4034c0.endTime);
                  } else {
                    _0x4034c0.type == 6 ? ($.getlj = true, _0x4b32a7 += (_0x4b32a7 ? "\n" : "") + "获得[打折券]]🎫满" + _0x4034c0.quota + "打" + _0x4034c0.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", _0x4034c0.beginTime) + " " + $.time("yyyy-MM-dd", _0x4034c0.endTime)) : ($.getlj = true, _0x4b32a7 += (_0x4b32a7 ? "\n" : "") + "获得[未知]🎉" + (_0x4034c0.quota || "") + " " + _0x4034c0.discount + " 使用时间:" + $.time("yyyy-MM-dd", _0x4034c0.beginTime) + " " + $.time("yyyy-MM-dd", _0x4034c0.endTime), console.log(_0x4034c0));
                  }
                }
              }
              _0x4b32a7 && (resMsg += _0x4b32a7 + "\n", console.log(_0x4b32a7));
            }
            if (_0x4528f8 == 1 && typeof _0x1aa9c6.data !== "undefined" && typeof _0x1aa9c6.data.groupData !== "undefined" && typeof _0x1aa9c6.data.groupData.groupInfo !== "undefined") {
              for (let _0x543776 of _0x1aa9c6.data.groupData.groupInfo || []) {
                _0x543776.status == 2 && (console.log("助力满可以领取" + _0x543776.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await _0x20ee6d("", 2));
              }
            }
          } else {
            console.log(_0x3a9f7e);
          }
        }
      } catch (_0x3e215c) {
        $.logErr(_0x3e215c, _0x5e0d17);
      } finally {
        _0x4a4154(_0x570bc3);
      }
    });
  });
}
function _0x2ca91d(_0x4bfdf7 = "") {
  let _0x5022df = true;
  return new Promise(_0x298a01 => {
    $.UVCookie = _0x2393b9.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let _0x484b50 = {
      "url": "https://api.m.jd.com/api?functionId=showCoupon&appid=u_hongbao&_=" + Date.now() + "&loginType=2&body={%22actId%22:%22" + $.actId + "%22,%22unionActId%22:%2231165%22,%22unpl%22:%22" + $.unpl + "%22,%22platform%22:" + _0x1542b3 + ",%22unionShareId%22:%22%22," + ($.uiUpdateTime ? "%22uiUpdateTime%22:" + $.uiUpdateTime + "," : "") + "%22d%22:%22" + ii1I11 + "%22,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&d_brand=iPhone&d_model=iPhone&lang=zh-cn&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + _0x2b2fc1 + " " + _0x1ea268,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      }
    };
    _0x484b50.headers.Cookie = _0x484b50.headers.Cookie.replace(/;\s*$/, "");
    _0x484b50.headers.Cookie = _0x484b50.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) {
      _0x484b50.headers.Referer = $.url2;
    }
    $.dget(_0x484b50, async (_0xb46174, _0x398914, _0x4b55aa) => {
      try {
        if (_0xb46174) {
          console.log("" + $.toStr(_0xb46174));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let _0x16cd2b = $.toObj(_0x4b55aa, _0x4b55aa);
          if (typeof _0x16cd2b == "object") {
            if (_0x16cd2b.msg) {
              console.log(_0x16cd2b.msg);
            }
            if (_0x16cd2b.msg.indexOf("不展示弹层") > -1) {
              $.again = true;
            }
            if (_0x16cd2b.msg.indexOf("领取上限") > -1) {
              $.runArr[$.UserName] = true;
            }
            _0x16cd2b.msg.indexOf("上限") === -1 && _0x16cd2b.msg.indexOf("登录") === -1 && ($.flag = 1);
            if (_0x16cd2b.msg.indexOf("活动已结束") > -1 || _0x16cd2b.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            if (_0x16cd2b.data.uiUpdateTime) {
              $.uiUpdateTime = _0x16cd2b.data.uiUpdateTime;
            }
            if (typeof _0x16cd2b.data !== "undefined" && typeof _0x16cd2b.data.groupData !== "undefined" && typeof _0x16cd2b.data.groupData.joinNum !== "undefined") {
              $.joinNum = _0x16cd2b.data.groupData.joinNum;
              let _0x579b49 = 0;
              for (let _0x325c4f of _0x16cd2b.data.groupData.groupInfo) {
                if (_0x579b49 < _0x325c4f.num) {
                  _0x579b49 = _0x325c4f.num;
                }
              }
              if ($.shareCount > 0 && _0x579b49 > $.shareCount) {
                _0x579b49 = $.shareCount;
              }
              $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = _0x579b49);
              $.shareCodeArr.shareCount = _0x579b49;
              if (_0x579b49 <= $.joinNum) {
                if (!$.shareCodeArr[$.UserName]) {
                  $.shareCodeArr[$.UserName] = {};
                }
                $.shareCodeArr[$.UserName].count = $.joinNum;
                _0x5022df = false;
              }
              console.log("【账号" + $.index + "】" + ($.nickName || $.UserName) + " " + $.joinNum + "/" + _0x579b49 + "人");
            }
            _0x16cd2b.msg.indexOf("活动已结束") > -1 && (_0x5022df = false);
            if (typeof _0x16cd2b.data !== "undefined" && typeof _0x16cd2b.data.groupData !== "undefined" && typeof _0x16cd2b.data.groupData.groupInfo !== "undefined") {
              for (let _0x250ea3 of _0x16cd2b.data.groupData.groupInfo || []) {
                _0x250ea3.status == 2 && (console.log("助力满可以领取" + _0x250ea3.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await _0x20ee6d("", 2));
              }
            }
          } else {
            console.log(_0x4b55aa);
          }
        }
      } catch (_0xaa0652) {
        $.logErr(_0xaa0652, _0x398914);
      } finally {
        _0x298a01(_0x5022df);
      }
    });
  });
}
function _0x475ba3() {
  if ($.shareCodeArr[$.UserName]) {
    console.log("【账号" + $.index + "】缓存分享码:" + $.shareCodeArr[$.UserName].code.replace(/.+(.{3})/, "***$1"));
    return;
  }
  return new Promise(_0x593c8e => {
    let _0x32e9bf = {
      "url": "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u_hongbao&_=" + Date.now() + "&loginType=2&body={%22unionActId%22:%2231165%22,%22actId%22:%22" + $.actId + "%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22" + ii1I11 + "%22,%22supportPic%22:2}&client=iPhone&clientVersion=&osVersion=iOS&d_brand=iPhone&d_model=iPhone&lang=zh-cn&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + _0x2b2fc1 + " " + _0x1ea268,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      }
    };
    _0x32e9bf.headers.Cookie = _0x32e9bf.headers.Cookie.replace(/;\s*$/, "");
    _0x32e9bf.headers.Cookie = _0x32e9bf.headers.Cookie.replace(/;([^\s])/g, "; $1");
    $.dget(_0x32e9bf, async (_0x358914, _0x2336a6, _0x4f81ab) => {
      try {
        if (_0x358914) {
          console.log("" + $.toStr(_0x358914));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          let _0xcd2d6b = $.toObj(_0x4f81ab, _0x4f81ab);
          if (typeof _0xcd2d6b == "object") {
            if (_0xcd2d6b.code == 0 && _0xcd2d6b.data && _0xcd2d6b.data.shareUrl) {
              let _0x1a9737 = _0xcd2d6b.data.shareUrl.match(/\?s=([^&]+)/) && _0xcd2d6b.data.shareUrl.match(/\?s=([^&]+)/)[1] || "";
              _0x1a9737 && (console.log("【账号" + $.index + "】分享码：" + _0x1a9737.replace(/.+(.{3})/, "***$1")), $.shareCodeArr[$.UserName] = {
                "code": _0x1a9737,
                "count": $.joinNum
              });
            }
          } else {
            console.log(_0x4f81ab);
          }
        }
      } catch (_0x3d3b43) {
        $.logErr(_0x3d3b43, _0x2336a6);
      } finally {
        _0x593c8e();
      }
    });
  });
}
function _0x212a51() {
  return new Promise(_0x135217 => {
    const _0x1cbcfc = {
      "url": $.url1,
      "followRedirect": false,
      "headers": {}
    };
    _0x1cbcfc.headers.Cookie = "" + $.UVCookie + _0x2b2fc1 + " " + _0x1ea268;
    _0x1cbcfc.headers["User-Agent"] = $.UA;
    $.dget(_0x1cbcfc, async (_0x53740e, _0x15aa9d, _0x44199d) => {
      try {
        _0x2a36ec(_0x15aa9d);
        $.url2 = _0x15aa9d && _0x15aa9d.headers && (_0x15aa9d.headers.location || _0x15aa9d.headers.Location || "") || "";
        $.url2 = decodeURIComponent($.url2);
        $.url2 = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || "";
      } catch (_0x6ece52) {
        $.logErr(_0x6ece52, _0x15aa9d);
      } finally {
        _0x135217(_0x44199d);
      }
    });
  });
}
function _0x48b531() {
  return new Promise(_0x5866d1 => {
    const _0x17145e = {
      "url": "https://u.jd.com/" + ii1I11 + ($.shareCode && "?s=" + $.shareCode || ""),
      "followRedirect": false,
      "headers": {}
    };
    _0x17145e.headers.Cookie = "" + $.UVCookie + _0x2b2fc1 + " " + _0x1ea268;
    _0x17145e.headers["User-Agent"] = $.UA;
    $.dget(_0x17145e, async (_0x3ab4fb, _0x26c9ca, _0x107e28) => {
      try {
        _0x2a36ec(_0x26c9ca);
        $.url1 = _0x107e28 && _0x107e28.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && _0x107e28.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || "";
      } catch (_0x36f2d7) {
        $.logErr(_0x36f2d7, _0x26c9ca);
      } finally {
        _0x5866d1(_0x107e28);
      }
    });
  });
}
function _0x2a36ec(_0xf5bde) {
  let _0x4c31dc = _0xf5bde && _0xf5bde.headers && (_0xf5bde.headers["set-cookie"] || _0xf5bde.headers["Set-Cookie"] || "") || "",
    _0x2f5f44 = "";
  if (_0x4c31dc) {
    if (typeof _0x4c31dc != "object") {
      _0x2f5f44 = _0x4c31dc.split(",");
    } else {
      _0x2f5f44 = _0x4c31dc;
    }
    for (let _0x28b094 of _0x2f5f44) {
      let _0xe32106 = _0x28b094.split(";")[0].trim();
      if (_0xe32106.split("=")[1]) {
        _0xe32106.split("=")[0] == "unpl" && _0xe32106.split("=")[1] && ($.unpl = _0xe32106.split("=")[1]);
        if (_0x2b2fc1.indexOf(_0xe32106.split("=")[1]) == -1) {
          _0x2b2fc1 += _0xe32106.replace(/ /g, "") + "; ";
        }
      }
    }
  }
}
function _0x3c634e(_0x135129 = 1) {
  const _0x5114b0 = {
    "ud": "",
    "sv": "CJGkCm==",
    "iad": ""
  };
  $.UA = "jdapp;iPhone;12.0.2;;;M/5.0;appBuild/168698;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify({
    "ciphertype": 5,
    "cipher": _0x5114b0,
    "ts": Math.floor(new Date().getTime() / 1000),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  })) + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function _0x637a00(_0x133abd) {
  let _0x2f4095 = "0123456789abcdef",
    _0x233a91 = "";
  for (let _0x375034 = 0; _0x375034 < _0x133abd; _0x375034++) {
    _0x233a91 += _0x2f4095[Math.ceil(100000000 * Math.random()) % _0x2f4095.length];
  }
  return _0x233a91;
}
function _0x1c1ceb(_0x3f4288, _0x28e193) {
  let _0x5655f8 = new Array();
  for (let _0xb36597 in _0x3f4288) {
    _0x5655f8.push(_0x3f4288[_0xb36597]);
  }
  let _0x38b53d = new Array();
  for (let _0x1f0155 = 0; _0x1f0155 < _0x28e193; _0x1f0155++) {
    if (_0x5655f8.length > 0) {
      let _0x2a1002 = Math.floor(Math.random() * _0x5655f8.length);
      _0x38b53d[_0x1f0155] = _0x5655f8[_0x2a1002];
      _0x5655f8.splice(_0x2a1002, 1);
    } else {
      break;
    }
  }
  return _0x38b53d;
}
function _0x51b4a9(_0x573cdd) {
  const _0x2531e6 = {
    "A": "K",
    "B": "L",
    "C": "M",
    "D": "N",
    "E": "O",
    "F": "P",
    "G": "Q",
    "H": "R",
    "I": "S",
    "J": "T",
    "K": "A",
    "L": "B",
    "M": "C",
    "N": "D",
    "O": "E",
    "P": "F",
    "Q": "G",
    "R": "H",
    "S": "I",
    "T": "J",
    "e": "o",
    "f": "p",
    "g": "q",
    "h": "r",
    "i": "s",
    "j": "t",
    "k": "u",
    "l": "v",
    "m": "w",
    "n": "x",
    "o": "e",
    "p": "f",
    "q": "g",
    "r": "h",
    "s": "i",
    "t": "j",
    "u": "k",
    "v": "l",
    "w": "m",
    "x": "n"
  };
  const _0x541244 = {
    "ud": "",
    "sv": "",
    "iad": ""
  };
  let _0x579c0d = _0x1c1ceb([12, 13, 14, 15, 16], 1) + "." + _0x1c1ceb([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1) + "." + _0x1c1ceb([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1),
    _0x460f2a = _0x1c1ceb([9, 10, 11], 1) + "." + _0x1c1ceb([0, 1, 2, 3, 4, 5, 6, 7, 8], 1) + "." + _0x1c1ceb([0, 1, 2, 3, 4, 5], 1),
    _0x33a1a0 = {
      "ciphertype": 5,
      "cipher": _0x541244,
      "ts": parseInt(new Date().getTime() / 1000),
      "hdid": "",
      "version": "1.0.3",
      "appname": "",
      "ridx": -1
    };
  _0x33a1a0.cipher.sv = new Buffer.from(_0x579c0d).toString("base64").split("").map(_0x1a3ff3 => _0x2531e6[_0x1a3ff3] || _0x1a3ff3).join("");
  _0x33a1a0.cipher.ud = new Buffer.from(_0x637a00(40)).toString("base64").split("").map(_0x4a5efb => _0x2531e6[_0x4a5efb] || _0x4a5efb).join("");
  _0x33a1a0.appname = "com.360buy.jdmobile";
  _0x33a1a0.hdid = "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=";
  $.UA = "jdapp;iPhone;" + _0x460f2a + ";;;M/5.0;appBuild/168341;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify(_0x33a1a0)) + ";Mozilla/5.0 (iPhone; CPU iPhone OS " + _0x579c0d.replace(/\./g, "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function _0x147d85(_0x10a2b4) {
  if (typeof _0x10a2b4 == "string") {
    try {
      return JSON.parse(_0x10a2b4);
    } catch (_0x31679d) {
      console.log(_0x31679d);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function _0x4e6de9() {
  var _0x54cf87 = function () {
    function _0x5009fd(_0x5858b4, _0x312778) {
      _0x5858b4 = [_0x5858b4[0] >>> 16, 65535 & _0x5858b4[0], _0x5858b4[1] >>> 16, 65535 & _0x5858b4[1]];
      _0x312778 = [_0x312778[0] >>> 16, 65535 & _0x312778[0], _0x312778[1] >>> 16, 65535 & _0x312778[1]];
      var _0x2d078a = [0, 0, 0, 0];
      _0x2d078a[3] += _0x5858b4[3] + _0x312778[3];
      _0x2d078a[2] += _0x2d078a[3] >>> 16;
      _0x2d078a[3] &= 65535;
      _0x2d078a[2] += _0x5858b4[2] + _0x312778[2];
      _0x2d078a[1] += _0x2d078a[2] >>> 16;
      _0x2d078a[2] &= 65535;
      _0x2d078a[1] += _0x5858b4[1] + _0x312778[1];
      _0x2d078a[0] += _0x2d078a[1] >>> 16;
      _0x2d078a[1] &= 65535;
      _0x2d078a[0] += _0x5858b4[0] + _0x312778[0];
      _0x2d078a[0] &= 65535;
      return [_0x2d078a[0] << 16 | _0x2d078a[1], _0x2d078a[2] << 16 | _0x2d078a[3]];
    }
    function _0x5b64c6(_0x1a2147, _0x42f04f) {
      _0x1a2147 = [_0x1a2147[0] >>> 16, 65535 & _0x1a2147[0], _0x1a2147[1] >>> 16, 65535 & _0x1a2147[1]];
      _0x42f04f = [_0x42f04f[0] >>> 16, 65535 & _0x42f04f[0], _0x42f04f[1] >>> 16, 65535 & _0x42f04f[1]];
      var _0x3b4be3 = [0, 0, 0, 0];
      _0x3b4be3[3] += _0x1a2147[3] * _0x42f04f[3];
      _0x3b4be3[2] += _0x3b4be3[3] >>> 16;
      _0x3b4be3[3] &= 65535;
      _0x3b4be3[2] += _0x1a2147[2] * _0x42f04f[3];
      _0x3b4be3[1] += _0x3b4be3[2] >>> 16;
      _0x3b4be3[2] &= 65535;
      _0x3b4be3[2] += _0x1a2147[3] * _0x42f04f[2];
      _0x3b4be3[1] += _0x3b4be3[2] >>> 16;
      _0x3b4be3[2] &= 65535;
      _0x3b4be3[1] += _0x1a2147[1] * _0x42f04f[3];
      _0x3b4be3[0] += _0x3b4be3[1] >>> 16;
      _0x3b4be3[1] &= 65535;
      _0x3b4be3[1] += _0x1a2147[2] * _0x42f04f[2];
      _0x3b4be3[0] += _0x3b4be3[1] >>> 16;
      _0x3b4be3[1] &= 65535;
      _0x3b4be3[1] += _0x1a2147[3] * _0x42f04f[1];
      _0x3b4be3[0] += _0x3b4be3[1] >>> 16;
      _0x3b4be3[1] &= 65535;
      _0x3b4be3[0] += _0x1a2147[0] * _0x42f04f[3] + _0x1a2147[1] * _0x42f04f[2] + _0x1a2147[2] * _0x42f04f[1] + _0x1a2147[3] * _0x42f04f[0];
      _0x3b4be3[0] &= 65535;
      return [_0x3b4be3[0] << 16 | _0x3b4be3[1], _0x3b4be3[2] << 16 | _0x3b4be3[3]];
    }
    function _0x3f8fbe(_0x2b75f6, _0x14524b) {
      return 32 === (_0x14524b %= 64) ? [_0x2b75f6[1], _0x2b75f6[0]] : 32 > _0x14524b ? [_0x2b75f6[0] << _0x14524b | _0x2b75f6[1] >>> 32 - _0x14524b, _0x2b75f6[1] << _0x14524b | _0x2b75f6[0] >>> 32 - _0x14524b] : (_0x14524b -= 32, [_0x2b75f6[1] << _0x14524b | _0x2b75f6[0] >>> 32 - _0x14524b, _0x2b75f6[0] << _0x14524b | _0x2b75f6[1] >>> 32 - _0x14524b]);
    }
    function _0x1e8eea(_0x590527, _0x352d48) {
      return 0 === (_0x352d48 %= 64) ? _0x590527 : 32 > _0x352d48 ? [_0x590527[0] << _0x352d48 | _0x590527[1] >>> 32 - _0x352d48, _0x590527[1] << _0x352d48] : [_0x590527[1] << _0x352d48 - 32, 0];
    }
    function _0x5a1e51(_0x395caa, _0x4a9f01) {
      return [_0x395caa[0] ^ _0x4a9f01[0], _0x395caa[1] ^ _0x4a9f01[1]];
    }
    function _0x37d9f9(_0x348ada) {
      return _0x5a1e51(_0x348ada = _0x5b64c6(_0x348ada = _0x5a1e51(_0x348ada = _0x5b64c6(_0x348ada = _0x5a1e51(_0x348ada, [0, _0x348ada[0] >>> 1]), [4283543511, 3981806797]), [0, _0x348ada[0] >>> 1]), [3301882366, 444984403]), [0, _0x348ada[0] >>> 1]);
    }
    return {
      "hash128": function (_0x4584fa, _0x1731ff) {
        var _0x168100 = _0x1731ff || 0;
        _0x1731ff = (_0x4584fa = _0x4584fa || "").length % 16;
        var _0x38a770 = _0x4584fa.length - _0x1731ff,
          _0x486747 = [0, _0x168100];
        _0x168100 = [0, _0x168100];
        for (var _0xbd1e9, _0x420493, _0x562a3b = [2277735313, 289559509], _0xf84ca2 = [1291169091, 658871167], _0xca5f2e = 0; _0xca5f2e < _0x38a770; _0xca5f2e += 16) {
          _0xbd1e9 = [255 & _0x4584fa.charCodeAt(_0xca5f2e + 4) | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 5)) << 8 | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 6)) << 16 | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 7)) << 24, 255 & _0x4584fa.charCodeAt(_0xca5f2e) | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 1)) << 8 | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 2)) << 16 | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 3)) << 24];
          _0x420493 = [255 & _0x4584fa.charCodeAt(_0xca5f2e + 12) | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 13)) << 8 | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 14)) << 16 | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 15)) << 24, 255 & _0x4584fa.charCodeAt(_0xca5f2e + 8) | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 9)) << 8 | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 10)) << 16 | (255 & _0x4584fa.charCodeAt(_0xca5f2e + 11)) << 24];
          _0x486747 = _0x5009fd(_0x5b64c6(_0x486747 = _0x5009fd(_0x486747 = _0x3f8fbe(_0x486747 = _0x5a1e51(_0x486747, _0xbd1e9 = _0x5b64c6(_0xbd1e9 = _0x3f8fbe(_0xbd1e9 = _0x5b64c6(_0xbd1e9, _0x562a3b), 31), _0xf84ca2)), 27), _0x168100), [0, 5]), [0, 1390208809]);
          _0x168100 = _0x5009fd(_0x5b64c6(_0x168100 = _0x5009fd(_0x168100 = _0x3f8fbe(_0x168100 = _0x5a1e51(_0x168100, _0x420493 = _0x5b64c6(_0x420493 = _0x3f8fbe(_0x420493 = _0x5b64c6(_0x420493, _0xf84ca2), 33), _0x562a3b)), 31), _0x486747), [0, 5]), [0, 944331445]);
        }
        switch (_0xbd1e9 = [0, 0], _0x420493 = [0, 0], _0x1731ff) {
          case 15:
            _0x420493 = _0x5a1e51(_0x420493, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 14)], 48));
          case 14:
            _0x420493 = _0x5a1e51(_0x420493, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 13)], 40));
          case 13:
            _0x420493 = _0x5a1e51(_0x420493, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 12)], 32));
          case 12:
            _0x420493 = _0x5a1e51(_0x420493, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 11)], 24));
          case 11:
            _0x420493 = _0x5a1e51(_0x420493, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 10)], 16));
          case 10:
            _0x420493 = _0x5a1e51(_0x420493, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 9)], 8));
          case 9:
            _0x168100 = _0x5a1e51(_0x168100, _0x420493 = _0x5b64c6(_0x420493 = _0x3f8fbe(_0x420493 = _0x5b64c6(_0x420493 = _0x5a1e51(_0x420493, [0, _0x4584fa.charCodeAt(_0xca5f2e + 8)]), _0xf84ca2), 33), _0x562a3b));
          case 8:
            _0xbd1e9 = _0x5a1e51(_0xbd1e9, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 7)], 56));
          case 7:
            _0xbd1e9 = _0x5a1e51(_0xbd1e9, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 6)], 48));
          case 6:
            _0xbd1e9 = _0x5a1e51(_0xbd1e9, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 5)], 40));
          case 5:
            _0xbd1e9 = _0x5a1e51(_0xbd1e9, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 4)], 32));
          case 4:
            _0xbd1e9 = _0x5a1e51(_0xbd1e9, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 3)], 24));
          case 3:
            _0xbd1e9 = _0x5a1e51(_0xbd1e9, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 2)], 16));
          case 2:
            _0xbd1e9 = _0x5a1e51(_0xbd1e9, _0x1e8eea([0, _0x4584fa.charCodeAt(_0xca5f2e + 1)], 8));
          case 1:
            _0x486747 = _0x5a1e51(_0x486747, _0xbd1e9 = _0x5b64c6(_0xbd1e9 = _0x3f8fbe(_0xbd1e9 = _0x5b64c6(_0xbd1e9 = _0x5a1e51(_0xbd1e9, [0, _0x4584fa.charCodeAt(_0xca5f2e)]), _0x562a3b), 31), _0xf84ca2));
        }
        _0x486747 = _0x5a1e51(_0x486747, [0, _0x4584fa.length]);
        _0x168100 = _0x5009fd(_0x168100 = _0x5a1e51(_0x168100, [0, _0x4584fa.length]), _0x486747 = _0x5009fd(_0x486747, _0x168100));
        _0x486747 = _0x37d9f9(_0x486747);
        _0x168100 = _0x5009fd(_0x168100 = _0x37d9f9(_0x168100), _0x486747 = _0x5009fd(_0x486747, _0x168100));
        return ("00000000" + (_0x486747[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (_0x486747[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (_0x168100[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (_0x168100[1] >>> 0).toString(16)).slice(-8);
      }
    };
  }();
  function _0x49c144(_0x2b5b0a) {
    _0x2b5b0a = JSON.stringify(_0x2b5b0a);
    _0x2b5b0a = encodeURIComponent(_0x2b5b0a);
    var _0x916512 = "",
      _0x3e3858 = 0;
    do {
      var _0x279f9c = _0x2b5b0a.charCodeAt(_0x3e3858++),
        _0x42b9d1 = _0x2b5b0a.charCodeAt(_0x3e3858++),
        _0x523199 = _0x2b5b0a.charCodeAt(_0x3e3858++),
        _0x526da0 = _0x279f9c >> 2;
      _0x279f9c = (3 & _0x279f9c) << 4 | _0x42b9d1 >> 4;
      var _0x371e94 = (15 & _0x42b9d1) << 2 | _0x523199 >> 6,
        _0x55bb3d = 63 & _0x523199;
      isNaN(_0x42b9d1) ? _0x371e94 = _0x55bb3d = 64 : isNaN(_0x523199) && (_0x55bb3d = 64);
      _0x916512 = _0x916512 + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x526da0) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x279f9c) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x371e94) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x55bb3d);
    } while (_0x3e3858 < _0x2b5b0a.length);
    return _0x916512 + "/";
  }
  var _0x4a22d9 = [$.UA.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "896x414", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null],
    _0x247462 = _0x54cf87.hash128(_0x4a22d9.join("~~~"), 31),
    _0x4dfc90 = {
      "pin": "",
      "oid": "",
      "bizId": "jd-babelh5",
      "fc": "",
      "mode": "strict",
      "p": "s",
      "fp": _0x247462,
      "ctype": 1,
      "v": "3.1.1.0",
      "f": "3",
      "o": "prodev.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html",
      "qs": "",
      "jsTk": "",
      "qi": ""
    },
    _0x2d74e7 = _0x49c144(_0x4dfc90),
    _0x58392c = {},
    _0x4a22d9 = new Date();
  _0x58392c.ts = {};
  _0x58392c.ts.deviceTime = _0x4a22d9.getTime();
  const _0x723699 = {
    "tdHash": null
  };
  _0x58392c.ca = _0x723699;
  const _0x454eb3 = {
    "compatMode": "CSS1Compat"
  };
  _0x58392c.m = _0x454eb3;
  _0x58392c.fo = ["Arial Black", "Bauhaus 93", "Chalkduster", "GungSeo", "Hiragino Sans GB", "Impact", "Menlo", "Papyrus", "Rockwell"];
  _0x58392c.n = {
    "vendorSub": "",
    "productSub": "20030107",
    "vendor": "Apple Computer, Inc.",
    "maxTouchPoints": 1,
    "pdfViewerEnabled": !1,
    "hardwareConcurrency": 10,
    "cookieEnabled": !0,
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": /\/(.+)/g.exec($.UA) && /\/(.+)/g.exec($.UA)[1] || $.UA,
    "platform": "iPhone",
    "product": "Gecko",
    "userAgent": $.UA,
    "language": "zh-CN",
    "onLine": !0,
    "webdriver": !1,
    "javaEnabled": !1,
    "deviceMemory": 8,
    "enumerationOrder": ["vendorSub", "productSub", "vendor", "maxTouchPoints", "scheduling", "userActivation", "doNotTrack", "geolocation", "connection", "plugins", "mimeTypes", "pdfViewerEnabled", "webkitTemporaryStorage", "webkitPersistentStorage", "hardwareConcurrency", "cookieEnabled", "appCodeName", "appName", "appVersion", "platform", "product", "userAgent", "language", "languages", "onLine", "webdriver", "getGamepads", "javaEnabled", "sendBeacon", "vibrate", "bluetooth", "clipboard", "credentials", "keyboard", "managed", "mediaDevices", "storage", "serviceWorker", "virtualKeyboard", "wakeLock", "deviceMemory", "ink", "hid", "locks", "mediaCapabilities", "mediaSession", "permissions", "presentation", "serial", "gpu", "usb", "windowControlsOverlay", "xr", "userAgentData", "clearAppBadge", "getBattery", "getUserMedia", "requestMIDIAccess", "requestMediaKeySystemAccess", "setAppBadge", "webkitGetUserMedia", "getInstalledRelatedApps", "registerProtocolHandler", "unregisterProtocolHandler"]
  };
  _0x58392c.p = [];
  const _0x53b731 = {
    "devicePixelRatio": 1,
    "screenTop": 0,
    "screenLeft": 0
  };
  _0x58392c.w = _0x53b731;
  const _0x3a1319 = {
    "availHeight": 896,
    "availWidth": 414,
    "colorDepth": 24,
    "height": 896,
    "width": 414,
    "pixelDepth": 24
  };
  _0x58392c.s = _0x3a1319;
  const _0x70ee11 = {
    "ActiveBorder": "rgb(118, 118, 118)",
    "ActiveCaption": "rgb(0, 0, 0)",
    "AppWorkspace": "rgb(255, 255, 255)",
    "Background": "rgb(255, 255, 255)",
    "ButtonFace": "rgb(239, 239, 239)",
    "ButtonHighlight": "rgb(239, 239, 239)",
    "ButtonShadow": "rgb(239, 239, 239)",
    "ButtonText": "rgb(0, 0, 0)",
    "CaptionText": "rgb(0, 0, 0)",
    "GrayText": "rgb(128, 128, 128)",
    "Highlight": "rgb(181, 213, 255)",
    "HighlightText": "rgb(0, 0, 0)",
    "InactiveBorder": "rgb(118, 118, 118)",
    "InactiveCaption": "rgb(255, 255, 255)",
    "InactiveCaptionText": "rgb(128, 128, 128)",
    "InfoBackground": "rgb(255, 255, 255)",
    "InfoText": "rgb(0, 0, 0)",
    "Menu": "rgb(255, 255, 255)",
    "MenuText": "rgb(0, 0, 0)",
    "Scrollbar": "rgb(255, 255, 255)",
    "ThreeDDarkShadow": "rgb(118, 118, 118)",
    "ThreeDFace": "rgb(239, 239, 239)",
    "ThreeDHighlight": "rgb(118, 118, 118)",
    "ThreeDLightShadow": "rgb(118, 118, 118)",
    "ThreeDShadow": "rgb(118, 118, 118)",
    "Window": "rgb(255, 255, 255)",
    "WindowFrame": "rgb(118, 118, 118)",
    "WindowText": "rgb(0, 0, 0)"
  };
  _0x58392c.sc = _0x70ee11;
  const _0x1f8cee = {
    "cookie": !0,
    "localStorage": !0,
    "sessionStorage": !0,
    "globalStorage": !1,
    "indexedDB": !0
  };
  _0x58392c.ss = _0x1f8cee;
  _0x58392c.tz = -480;
  _0x58392c.lil = "";
  _0x58392c.wil = "";
  _0x58392c.ts.deviceEndTime = new Date().getTime();
  var _0x40bd22 = _0x49c144(_0x58392c);
  const _0x424ba6 = {
    "Accept": "*/*",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://pro.m.jd.com",
    "Referer": "https://pro.m.jd.com/",
    "User-Agent": $.UA
  };
  const _0x4d976e = {
    "url": "https://gia.jd.com/jsTk.do?a=" + _0x2d74e7,
    "body": "d=" + _0x40bd22,
    "headers": _0x424ba6
  };
  return new Promise(_0x49330 => {
    $.dpost(_0x4d976e, async (_0x1abf1a, _0xe1f1ef, _0x5a316d) => {
      try {
        if (_0x1abf1a) {
          console.log(_0x1abf1a);
        } else {
          let _0x4a2c8e = $.toObj(_0x5a316d, _0x5a316d);
          _0x4a2c8e && typeof _0x4a2c8e === "object" && _0x4a2c8e.code == 0 && _0x4a2c8e.data && _0x4a2c8e.data.token ? $.eid_token = _0x4a2c8e.data.token : console.log(_0x5a316d);
        }
      } catch (_0xa7e17b) {
        $.logErr(_0xa7e17b, _0xe1f1ef);
      } finally {
        _0x49330();
      }
    });
  });
}
function _0x38192b(_0x1849da, _0x3f0ca4, _0x2083f2 = "") {
  class _0x47a9e9 {
    constructor(_0xd4f9a0 = "", _0x1b67fb = "", _0xd45c6 = "") {
      this.appId = _0xd4f9a0;
      this.v = "3.1";
      _0x1b67fb ? this.ua = _0x1b67fb : this.ua = this.__genUA();
      this.fp = _0xd45c6 ? _0xd45c6 : this.__genFp();
    }
    ["__format"](_0x29bb4e, _0x44d848) {
      if (!_0x29bb4e) {
        _0x29bb4e = "yyyy-MM-dd";
      }
      var _0x42ffa2;
      !_0x44d848 ? _0x42ffa2 = Date.now() : _0x42ffa2 = new Date(_0x44d848);
      var _0x159cb9 = new Date(_0x42ffa2),
        _0x6c1a67 = _0x29bb4e,
        _0x130617 = {
          "M+": _0x159cb9.getMonth() + 1,
          "d+": _0x159cb9.getDate(),
          "D+": _0x159cb9.getDate(),
          "h+": _0x159cb9.getHours(),
          "H+": _0x159cb9.getHours(),
          "m+": _0x159cb9.getMinutes(),
          "s+": _0x159cb9.getSeconds(),
          "w+": _0x159cb9.getDay(),
          "q+": Math.floor((_0x159cb9.getMonth() + 3) / 3),
          "S+": _0x159cb9.getMilliseconds()
        };
      /(y+)/i.test(_0x6c1a67) && (_0x6c1a67 = _0x6c1a67.replace(RegExp.$1, "".concat(_0x159cb9.getFullYear()).substr(4 - RegExp.$1.length)));
      Object.keys(_0x130617).forEach(_0x2688b6 => {
        if (new RegExp("(".concat(_0x2688b6, ")")).test(_0x6c1a67)) {
          var _0x5996b2 = "S+" === _0x2688b6 ? "000" : "00";
          _0x6c1a67 = _0x6c1a67.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x130617[_0x2688b6] : "".concat(_0x5996b2).concat(_0x130617[_0x2688b6]).substr("".concat(_0x130617[_0x2688b6]).length));
        }
      });
      return _0x6c1a67;
    }
    ["__genUA"]() {
      this.uid = $.CryptoJS.SHA1($.UserName + "red").toString();
      let _0x26cad1 = this.uid,
        _0x1303cf = ["14.3"],
        _0x34e42e = _0x1303cf[Math.floor(Math.random() * _0x1303cf.length)],
        _0x25a3dd = ["12,1"],
        _0x3e51ea = _0x25a3dd[Math.floor(Math.random() * _0x25a3dd.length)],
        _0x507e2d = ["wifi"],
        _0x3ef562 = _0x507e2d[Math.floor(Math.random() * _0x507e2d.length)],
        _0x399535 = _0x34e42e.replace(/\./g, "_"),
        _0x2235f8 = [];
      _0x2235f8 = [["10.1.4", "167814"]];
      let _0xed8919 = Math.floor(Math.random() * _0x2235f8.length),
        _0x4addb4 = _0x2235f8[_0xed8919] ? _0x2235f8[_0xed8919] : _0x2235f8[0];
      _0x3e51ea = "iPhone" + _0x3e51ea;
      let _0x456c55 = "";
      _0x456c55 = "jdapp;iPhone;" + _0x4addb4[0] + ";" + _0x34e42e + ";" + _0x26cad1 + ";network/" + _0x3ef562 + ";model/" + _0x3e51ea + ";addressid/;appBuild/" + _0x4addb4[1] + ";jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + _0x399535 + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
      return _0x456c55;
    }
    ["__genFp"]() {
      function _0x39b9b3(_0x2f1e62, _0x59dd87) {
        var _0x59b78a = [],
          _0x487214 = _0x2f1e62.length,
          _0x5d263e = _0x2f1e62.split(""),
          _0x5e6276 = "";
        for (; _0x5e6276 = _0x5d263e.shift();) {
          if (Math.random() * _0x487214 < _0x59dd87) {
            _0x59b78a.push(_0x5e6276);
            if (--_0x59dd87 == 0) {
              break;
            }
          }
          _0x487214--;
        }
        for (var _0x2dfa98 = "", _0x1be525 = 0; _0x1be525 < _0x59b78a.length; _0x1be525++) {
          var _0x4c9c37 = Math.random() * (_0x59b78a.length - _0x1be525) | 0;
          _0x2dfa98 += _0x59b78a[_0x4c9c37];
          _0x59b78a[_0x4c9c37] = _0x59b78a[_0x59b78a.length - _0x1be525 - 1];
        }
        return _0x2dfa98;
      }
      function _0x194fb7(_0x4a6b6e, _0x4be691) {
        for (let _0x3bee86 of _0x4be691.slice()) _0x4a6b6e = _0x4a6b6e.replace(_0x3bee86, "");
        return _0x4a6b6e;
      }
      var _0x84aab5 = "0123456789",
        _0x45e9df = _0x39b9b3(_0x84aab5, 3),
        _0x3e252d = Math.random() * 10 | 0,
        _0x4ffacc = _0x194fb7(_0x84aab5, _0x45e9df),
        _0x3852ce = {};
      _0x3852ce.size = _0x3e252d;
      _0x3852ce.customDict = _0x4ffacc;
      const _0x33f150 = {
        "size": 14 - (_0x3e252d + 3) + 1,
        "customDict": _0x4ffacc
      };
      var _0x4b8310 = this.getRandomIDPro(_0x3852ce) + _0x45e9df + this.getRandomIDPro(_0x33f150) + _0x3e252d,
        _0x4f6239 = _0x4b8310.split(""),
        _0xbc3b77 = [];
      for (; _0x4f6239.length > 0;) {
        _0xbc3b77.push(9 - parseInt(_0x4f6239.pop()));
      }
      var _0x14f5db = _0xbc3b77.join("");
      return _0x14f5db;
    }
    ["getRandomIDPro"]() {
      var _0x20d74c,
        _0x2842cf,
        _0x31be52 = void 0 === (_0x1f4431 = (_0x2842cf = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).size) ? 10 : _0x1f4431,
        _0x1f4431 = void 0 === (_0x1f4431 = _0x2842cf.dictType) ? "number" : _0x1f4431,
        _0x4210c1 = "";
      if ((_0x2842cf = _0x2842cf.customDict) && "string" == typeof _0x2842cf) {
        _0x20d74c = _0x2842cf;
      } else {
        switch (_0x1f4431) {
          case "alphabet":
            _0x20d74c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case "max":
            _0x20d74c = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
            break;
          case "number":
          default:
            _0x20d74c = "0123456789";
        }
      }
      for (; _0x31be52--;) {
        _0x4210c1 += _0x20d74c[Math.random() * _0x20d74c.length | 0];
      }
      return _0x4210c1;
    }
    ["Encrypt"](_0x1bf0fb, _0x1e91e1) {
      let _0x2e5de8 = $.CryptoJS.AES.encrypt(_0x1bf0fb, $.CryptoJS.enc.Utf8.parse(_0x1e91e1.key), {
        "iv": $.CryptoJS.enc.Utf8.parse(_0x1e91e1.iv),
        "mode": $.CryptoJS.mode.CBC,
        "padding": $.CryptoJS.pad.Pkcs7
      });
      return _0x2e5de8.ciphertext.toString();
    }
    async ["__genAlgo"]() {
      const _0xdc9be1 = {
        "ps": "prompt",
        "np": "default"
      };
      const _0x4e60f3 = {
        "key": "wm0!@w-s#ll1flo(",
        "iv": "0102030405060708"
      };
      let _0x423681 = {
          "wc": 0,
          "wd": 0,
          "l": "zh-cn",
          "ls": "zh-cn",
          "ml": 0,
          "pl": 0,
          "av": /\/(.+)/g.exec(this.ua) && /\/(.+)/g.exec(this.ua)[1] || this.ua,
          "ua": this.ua,
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {},
          "pp1": "",
          "pm": _0xdc9be1,
          "w": 414,
          "h": 896,
          "ow": 414,
          "oh": 896,
          "url": "https://pro.m.jd.com/mall/active/2AFDsGQNAcLxkw5i9L87sGDEdPvE/index.html?unionActId=31165&d=&s=&cu=true&utm_source=kong&utm_medium=jingfen",
          "og": "https://pro.m.jd.com",
          "pr": 3,
          "re": "https://u.jd.com/",
          "ai": this.appId,
          "fp": this.fp
        },
        _0x15306a = JSON.stringify(_0x423681, null, 2),
        _0x637cd5 = this.Encrypt(_0x15306a, _0x4e60f3);
      var _0x1f42d8 = {
        "version": this.v,
        "fp": this.fp,
        "appId": this.appId.toString(),
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": _0x637cd5 || ""
      };
      return new Promise(_0x2071b8 => {
        const _0x3fc540 = {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Origin": "https://pro.m.jd.com",
          "Referer": "https://pro.m.jd.com/",
          "user-agent": this.ua
        };
        let _0x25d30b = {
          "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
          "body": JSON.stringify(_0x1f42d8),
          "headers": _0x3fc540,
          "timeout": 30000
        };
        $.dpost(_0x25d30b, async (_0x20d406, _0x1483f6, _0x3a85a7) => {
          try {
            if (_0x20d406) {
              console.log(_0x20d406);
            } else {
              let _0x13e795 = $.toObj(_0x3a85a7, _0x3a85a7);
              _0x13e795 && typeof _0x13e795 === "object" && _0x13e795.data && _0x13e795.data.result && _0x13e795.data.result.tk && (this.tk = _0x13e795.data.result.tk, this.genKey = new Function("return " + _0x13e795.data.result.algo)());
            }
          } catch (_0x30afbe) {
            $.logErr(_0x30afbe, _0x1483f6);
          } finally {
            _0x2071b8();
          }
        });
      });
    }
    ["__genH5st"](_0x22ff65 = {}, _0x1c2b66 = "") {
      const _0x40699d = {
        "ua": this.ua,
        "uid": this.uid
      };
      let _0x1ff64a = undefined;
      if (this.tk && this.genKey) {
        this.time = Date.now();
        this.timestamp = this.__format("yyyyMMddhhmmssSSS", this.time);
        let _0x949357 = this.genKey(this.tk, this.fp.toString(), this.timestamp.toString(), this.appId.toString(), $.CryptoJS).toString();
        var _0x149f8e = {},
          _0x52b244 = null;
        _0x52b244 = Object.keys(_0x22ff65).sort().map(function (_0x32070c) {
          var _0xc0ed07 = {};
          _0xc0ed07.key = _0x32070c;
          _0xc0ed07.value = _0x22ff65[_0x32070c];
          return _0xc0ed07;
        }).filter(function (_0x4c8403) {
          var _0x3df46a = _0x4c8403.value,
            _0x11e6df = "number" == typeof _0x3df46a && !isNaN(_0x3df46a) || "string" == typeof _0x3df46a || "boolean" == typeof _0x3df46a || "body" == _0x4c8403.key;
          if (_0x11e6df) {
            if ("body" == _0x4c8403.key && typeof _0x4c8403.value == "object") {
              _0x4c8403.value = JSON.stringify(_0x4c8403.value);
            }
            _0x149f8e[_0x4c8403.key] = _0x4c8403.value;
          }
          return _0x11e6df;
        });
        _0x22ff65 = _0x149f8e;
        let _0xe3115e = "";
        _0xe3115e = Object.keys(_0x22ff65).map(function (_0x207a92) {
          return _0x207a92 + ":" + (_0x207a92 == "body" && _0x22ff65[_0x207a92].length !== 64 && _0x22ff65[_0x207a92].slice(0, 1) == "{" ? $.CryptoJS.SHA256(_0x22ff65[_0x207a92]).toString($.CryptoJS.enc.Hex) : _0x22ff65[_0x207a92]);
        }).join("&");
        _0xe3115e = $.CryptoJS.HmacSHA256(_0xe3115e, _0x949357).toString($.CryptoJS.enc.Hex);
        let _0x2dd62d = {
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {}
        };
        _0x1c2b66 && (_0x2dd62d.pp.p1 = _0x1c2b66);
        _0x2dd62d.fp = this.fp;
        const _0x39d9dc = {
          "key": "wm0!@w_s#ll1flo(",
          "iv": "0102030405060708"
        };
        let _0x272116 = JSON.stringify(_0x2dd62d, null, 2),
          _0x5b60aa = this.Encrypt(_0x272116, _0x39d9dc);
        _0x1ff64a = [this.timestamp, this.fp, this.appId.toString(), this.tk, _0xe3115e, this.v, this.time.toString(), _0x5b60aa].join(";");
        _0x40699d.t = _0x22ff65.t;
      }
      _0x40699d.h5st = _0x1ff64a;
      return _0x40699d;
    }
  }
  _0x1ecbba = new _0x47a9e9(_0x1849da, _0x3f0ca4, _0x2083f2);
}
function _0x195d6c() {
  class _0x41da75 {
    constructor() {
      this.UVCookie = "";
      this.ltr = 0;
      this.mr = [1, 0];
      const _0x458136 = {
        "href": "https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html",
        "hrefs": "https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html"
      };
      const _0x3de40a = {
        "cookie": "",
        "cookies": "__jdc=123;",
        "domain": "prodev.m.jd.com",
        "referrer": "https://u.jd.com/",
        "location": _0x458136
      };
      this.document = _0x3de40a;
      const _0x3111e3 = {
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        "userAgents": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
      };
      this.navigator = _0x3111e3;
      this.window = {};
    }
    ["getUVCookie"](_0x50ea5f = "", _0x16ec80 = "", _0xb92630 = "", _0x1a1a67 = "") {
      try {
        this.document.location.href = this.document.location.hrefs + "";
        this.document.cookie = this.document.cookies + "";
        if (_0xb92630) {
          this.document.location.href = _0xb92630;
        }
        if (_0x1a1a67) {
          this.document.cookie = _0x1a1a67;
        }
        this.UVCookie = "";
        this.navigator.userAgent = this.navigator.userAgents + "";
        this.ltr = 1011 + Math.round(31 * Math.random());
        if (_0x50ea5f) {
          this.navigator.userAgent = _0x50ea5f;
        }
        const _0x33b975 = {
          "ckJda": "__jda",
          "ckJdb": "__jdb",
          "ckJdv": "__jdv",
          "ckJdc": "__jdc",
          "refUrl": "https://u.jd.com/"
        };
        this.lr = _0x33b975;
        this.q();
        this.s(_0x16ec80);
        return this.UVCookie;
      } catch (_0x2b6d3e) {
        console.log(_0x2b6d3e);
      }
    }
    ["s"](_0x5ccd13 = "") {
      var _0x8aab48,
        _0x502be8,
        _0x5f2c22,
        _0x213165,
        _0x252a89 = (this.getCookie(this.lr.ckJda) || "").split("."),
        _0x29ddbd = (this.getCookie(this.lr.ckJdb) || "").split("."),
        _0x378f01 = (this.getCookie(this.lr.ckJdv) || "").split("|"),
        _0x819f71 = this.getCookie(this.lr.ckJdc) || "",
        _0x762479 = parseInt((new Date().getTime() - this.ltr) / 1000),
        _0x1d7583 = 0,
        _0x1f9c8 = 1,
        _0x265e10 = "direct",
        _0x4974b6 = "-",
        _0x5325c7 = "none",
        _0xd6c566 = "-";
      if (_0x252a89.length > 3) {
        for (var _0x5cce56 = 2; _0x5cce56 < 5 && _0x5cce56 < _0x252a89.length; _0x5cce56++) {
          var _0x369f56 = _0x252a89[_0x5cce56];
          _0x369f56.length > 10 && (_0x252a89[_0x5cce56] = _0x369f56.substr(0, 10));
        }
      }
      _0x252a89.length > 5 ? (_0x5f2c22 = _0x252a89[0], _0x213165 = _0x252a89[1], _0x8aab48 = parseInt(_0x252a89[2], 10), _0x502be8 = parseInt(_0x252a89[3], 10), _0x762479 = parseInt(_0x252a89[4], 10), _0x1f9c8 = parseInt(_0x252a89[5], 10) || _0x1f9c8) : (_0x213165 = this.genUuid(), _0x8aab48 = _0x762479, _0x502be8 = _0x762479);
      this.lr.uuid = _0x213165;
      _0x29ddbd.length > 3 && (_0x5f2c22 || (_0x5f2c22 = _0x29ddbd[0]), _0x1d7583 = parseInt(_0x29ddbd[1], 10) || 0);
      _0x378f01.length > 4 && (_0x5f2c22 || (_0x5f2c22 = _0x378f01[0]), _0x265e10 = _0x378f01[1], _0x4974b6 = _0x378f01[2], _0x5325c7 = _0x378f01[3], _0xd6c566 = _0x378f01[4]);
      _0x819f71 && "" !== _0x819f71 && (_0x5f2c22 || (_0x5f2c22 = _0x819f71));
      var _0x48c144,
        _0x214e8a = [],
        _0x2f7752 = _0x29ddbd.length < 4,
        _0x566f2e = this.getParameter("utm_source"),
        _0x11a628 = false;
      if (_0x566f2e) {
        var _0x247be6 = this.getParameter("utm_campaign"),
          _0x34b96c = this.getParameter("utm_medium"),
          _0x265388 = this.getParameter("utm_term");
        _0x214e8a.push(_0x566f2e || _0x265e10);
        _0x214e8a.push(_0x247be6 || _0x4974b6);
        _0x214e8a.push(_0x34b96c || _0x5325c7);
        _0x214e8a.push(_0x265388 || _0xd6c566);
        _0xd6c566 = _0x214e8a[3];
        _0x11a628 = !0;
      } else {
        var _0xc4b55b,
          _0x3a8495 = this.lr.refUrl && this.lr.refUrl.split("/")[2],
          _0x995ead = false;
        if (_0x3a8495 && _0x3a8495.indexOf(this.lr.ckDomain) < 0) {
          for (_0xc4b55b = this.lr.seo, _0x5cce56 = 0; _0x5cce56 < _0xc4b55b.length; _0x5cce56++) {
            var _0x5c397b = _0xc4b55b[_0x5cce56].split(":");
            if (_0x3a8495.indexOf(_0x5c397b[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((_0x5c397b[1] + "=").toLowerCase()) > -1) {
              var _0x389456 = this.getParameter(_0x5c397b[1], this.lr.refUrl);
              /[^\x00-\xff]/.test(_0x389456) && (_0x389456 = encodeURIComponent(_0x389456));
              _0x214e8a.push(_0x5c397b[0]);
              _0x214e8a.push("-");
              _0x214e8a.push("organic");
              _0x214e8a.push(_0x389456 || "not set");
              _0xd6c566 = _0x214e8a[3];
              _0x995ead = !0;
              break;
            }
          }
          _0x995ead || (_0x3a8495.indexOf("zol.com.cn") > -1 ? (_0x214e8a.push("zol.com.cn"), _0x214e8a.push("-"), _0x214e8a.push("cpc"), _0x214e8a.push("not set")) : (_0x214e8a.push(_0x3a8495), _0x214e8a.push("-"), _0x214e8a.push("referral"), _0x214e8a.push("-")));
        }
      }
      _0x48c144 = _0x214e8a.length > 0 && (_0x214e8a[0] !== _0x265e10 || _0x214e8a[1] !== _0x4974b6 || _0x214e8a[2] !== _0x5325c7) && "referral" !== _0x214e8a[2];
      _0x2f7752 || !_0x2f7752 && _0x48c144 ? (_0x265e10 = _0x214e8a[0] || _0x265e10, _0x4974b6 = _0x214e8a[1] || _0x4974b6, _0x5325c7 = _0x214e8a[2] || _0x5325c7, _0xd6c566 = _0x214e8a[3] || _0xd6c566, _0x252a89.length > 5 ? (_0x8aab48 = parseInt(_0x252a89[2], 10), _0x502be8 = parseInt(_0x252a89[4], 10), _0x762479 = parseInt((new Date().getTime() - this.ltr) / 1000), _0x1f9c8++, _0x1d7583 = 1) : (_0x1f9c8 = 1, _0x1d7583 = 1)) : _0x1d7583++;
      var _0x405376 = this.getPageParamFromSdk();
      if (_0x405376 && _0x405376.vts) {
        var _0xca1d26 = 1 * _0x405376.vts,
          _0x2a65fc = 1 * _0x405376.seq;
        (_0xca1d26 > _0x1f9c8 || _0xca1d26 === _0x1f9c8 && _0x2a65fc >= _0x1d7583) && (_0x1f9c8 = _0xca1d26, _0x1d7583 = _0x2a65fc + 1);
      }
      if (_0x5f2c22 || (_0x5f2c22 = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [_0x5f2c22, _0x213165, _0x8aab48, _0x502be8, _0x762479, _0x1f9c8 || 1].join("."), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [_0x5f2c22, _0x1d7583, _0x213165 + "|" + _0x1f9c8, _0x762479].join("."), this.lr.ckDomain, this.lr.ckJdbExp), _0x11a628 || _0x48c144 || _0x378f01.length < 5) {
        var _0x44e046 = [_0x5f2c22, _0x265e10 || "direct", _0x4974b6 || "-", _0x5325c7 || "none", _0xd6c566 || "-", new Date().getTime() - this.ltr].join("|");
        this.setJdv(_0x44e046 = encodeURIComponent(_0x44e046), _0x5f2c22);
      }
      this.setCookie(this.lr.ckJdc, _0x5f2c22, this.lr.ckDomain);
    }
    ["q"]() {
      this.lr.rpDomain = this.lr.rpDomain || "uranus.jd.com";
      this.lr.logUrl = "//" + this.lr.rpDomain + "/log/m";
      const _0x5128f2 = {
        "pv": "1",
        "pf": "2",
        "cl": "3",
        "od": "4",
        "pd": "5",
        "hm": "6",
        "magic": "000001"
      };
      this.lr.logType = _0x5128f2;
      this.lr.useTmpCookie ? (this.lr.ckJda = "__tra", this.lr.ckJdb = "__trb", this.lr.ckJdc = "__trc", this.lr.ckJdu = "__tru") : (this.lr.ckJda = "__jda", this.lr.ckJdb = "__jdb", this.lr.ckJdc = "__jdc", this.lr.ckJdu = "__jdu");
      this.lr.ckJdv = "__jdv";
      this.lr.ckWxAppCk = "__jdwxapp";
      this.lr.ckRefCls = "__jd_ref_cls";
      this.lr.ckJdaExp = 15552000000;
      this.lr.ckJdbExp = 1800000;
      this.lr.ckJduExp = 15552000000;
      this.lr.ckJdvExp = 1296000000;
      this.lr.ckJdvEmbeddedExp = 86400000;
      this.lr.ckWxAppCkExp = 15552000000;
      this.lr.mtSubsiteExp = 31536000000;
      this.lr.ckDomain = (this.document.domain.match(/[^.]+\.(com.cn|net.cn|org.cn|gov.cn|edu.cn)$/) || [""])[0] || this.document.domain.replace(/.*?([^.]+\.[^.]+)$/, "$1");
      this.lr.title = this.document.title;
      this.lr.refUrl = this.document.referrer;
      this.lr.seo = ["i.easou.com:q", "m.baidu.com:word", "m.sm.cn:q", "m.so.com:q", "wap.sogou.com:keyword", "m.sogou.com:keyword", "wap.sogo.com:keyword", "m.sogo.com:keyword", "page.roboo.com:q", "ask.com:q", "baidu:word", "baidu:wd", "bing:q", "easou:q", "google:q", "roboo:word", "roboo:q", "sm.cn:q", "so.com:q", "sogou:keyword", "sogou:query", "sogo.com:keyword", "sogo.com:query", "yahoo:p", "yandex:text", "yicha:key"];
    }
    ["setCookie"](_0x1a3685, _0x504df4, _0x28d05f, _0x16a8a8) {
      if (_0x1a3685) {
        var _0x2d15c9 = "";
        if (_0x16a8a8) {
          var _0x5653bb = new Date();
          _0x5653bb.setTime(_0x5653bb.getTime() - this.ltr + _0x16a8a8);
          _0x2d15c9 = ";expires=" + _0x5653bb.toGMTString();
        }
        this.UVCookie += _0x1a3685 + "=" + _0x504df4 + "; ";
      }
    }
    ["setJdv"](_0x51a9e9, _0x5c2a2c, _0x192928) {
      var _0x51143c = "";
      _0x51143c = this.isPrey(10) && (!_0x51a9e9 || _0x51a9e9.length > 400) ? _0x5c2a2c + "|direct|-|none|-|" + (new Date().getTime() - this.ltr) : _0x51a9e9;
      var _0x1a309a = _0x192928 || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
      this.setCookie(this.lr.ckJdv || "__jdv", _0x51143c, this.lr.ckDomain, _0x1a309a);
    }
    ["getCookie"](_0x318fe3, _0x14b544) {
      var _0x56a63d = this.document.cookie.match(new RegExp("(^| )" + _0x318fe3 + "=([^;]*)(;|$)"));
      return null !== _0x56a63d ? _0x14b544 ? _0x56a63d[2] : this.urlDecode(_0x56a63d[2]) : "";
    }
    ["genUuid"]() {
      return new Date().getTime() - this.ltr + "" + parseInt(2147483647 * Math.random());
    }
    ["getParameter"](_0x5c4c2f, _0x5a366f) {
      var _0x87bbc6 = _0x5a366f || this.document.location.href,
        _0x280ff5 = new RegExp("(?:^|&|[?]|[/])" + _0x5c4c2f + "=([^&]*)").exec(_0x87bbc6);
      return _0x280ff5 ? this.urlDecode(_0x280ff5[1]) : null;
    }
    ["urlDecode"](_0x27bc10) {
      try {
        return decodeURIComponent(_0x27bc10);
      } catch (_0x47ff4e) {
        return _0x27bc10;
      }
    }
    ["genHash"](_0x59d1af) {
      var _0xa309c6,
        _0x48ff36 = 1,
        _0x29207a = 0;
      if (_0x59d1af) {
        for (_0x48ff36 = 0, _0xa309c6 = _0x59d1af.length - 1; _0xa309c6 >= 0; _0xa309c6--) {
          _0x48ff36 = 0 !== (_0x29207a = 266338304 & (_0x48ff36 = (_0x48ff36 << 6 & 268435455) + (_0x29207a = _0x59d1af.charCodeAt(_0xa309c6)) + (_0x29207a << 14))) ? _0x48ff36 ^ _0x29207a >> 21 : _0x48ff36;
        }
      }
      return _0x48ff36;
    }
    ["isPrey"](_0x2fb453) {
      if (_0x2fb453 >= 100) {
        return !0;
      }
      var _0x37fa9e = this.lr.uuid,
        _0x462584 = _0x37fa9e.substr(_0x37fa9e.length - 2);
      return !!_0x462584 && 1 * _0x462584 < _0x2fb453;
    }
    ["isEmbedded"]() {
      var _0x43e906 = this.navigator.userAgent || "";
      return /^(jdapp|jdltapp|jdpingou);/.test(_0x43e906) || this.isJdLog();
    }
    ["isJdLog"]() {
      return (this.navigator.userAgent || "").indexOf(";jdlog;") > -1;
    }
    ["getPageParamFromSdk"]() {
      var _0x5639ca, _0x4d7ba0;
      try {
        this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? _0x4d7ba0 = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? _0x4d7ba0 = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (_0x4d7ba0 = this.window.prompt("JDMAGetMPageParam", ""));
        _0x4d7ba0 && (_0x5639ca = JSON.parse(_0x4d7ba0));
      } catch (_0x205e88) {}
      return _0x5639ca;
    }
    ["time"](_0xa0b5cc, _0x330b4a = null) {
      const _0x5eed12 = _0x330b4a ? new Date(_0x330b4a) : new Date();
      let _0x1a4b0e = {
        "M+": _0x5eed12.getMonth() + 1,
        "d+": _0x5eed12.getDate(),
        "H+": _0x5eed12.getHours(),
        "m+": _0x5eed12.getMinutes(),
        "s+": _0x5eed12.getSeconds(),
        "q+": Math.floor((_0x5eed12.getMonth() + 3) / 3),
        "S": _0x5eed12.getMilliseconds()
      };
      /(y+)/.test(_0xa0b5cc) && (_0xa0b5cc = _0xa0b5cc.replace(RegExp.$1, (_0x5eed12.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x23588a in _0x1a4b0e) new RegExp("(" + _0x23588a + ")").test(_0xa0b5cc) && (_0xa0b5cc = _0xa0b5cc.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x1a4b0e[_0x23588a] : ("00" + _0x1a4b0e[_0x23588a]).substr(("" + _0x1a4b0e[_0x23588a]).length)));
      return _0xa0b5cc;
    }
  }
  _0x2393b9 = new _0x41da75();
}
function _0x29f4c2() {
  const _0x271b00 = {
    "url": "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/11red",
    "timeout": 10000
  };
  let _0x1ab0f4 = [];
  return new Promise(_0x41180b => {
    $.dget(_0x271b00, async (_0x1d6537, _0x4d0c34, _0x2f0fc0) => {
      try {
        if (!_0x1d6537) {
          if (_0x2f0fc0) {
            _0x2f0fc0 = JSON.parse(_0x2f0fc0);
            if (_0x2f0fc0.code === 200) {
              _0x1ab0f4 = _0x2f0fc0.data;
            }
          }
        }
      } catch (_0x466473) {
        $.logErr(_0x466473, _0x4d0c34);
      } finally {
        _0x41180b(_0x1ab0f4);
      }
    });
  });
}
function _0x109dd6(_0x4fef3d) {
  if (typeof _0x4fef3d == "string") {
    try {
      return JSON.parse(_0x4fef3d);
    } catch (_0x23c9f7) {
      console.log(_0x23c9f7);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function _0x5b810b(_0x37c731) {
  _0x37c731 = _0x37c731 || 32;
  let _0x2e93dd = "abcdef0123456789",
    _0x1fc1b8 = _0x2e93dd.length,
    _0x351780 = "";
  for (i = 0; i < _0x37c731; i++) {
    _0x351780 += _0x2e93dd.charAt(Math.floor(Math.random() * _0x1fc1b8));
  }
  return _0x351780;
}