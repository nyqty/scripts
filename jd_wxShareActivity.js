/*
活动名称：分享有礼 · 超级无线
活动链接：https://lzkjdz-isv.isvjd.com/wxShareActivity/activity/activity?activityId=<活动id>
环境变量：jd_wxShareActivity_activityId // 活动id
         jd_wxShareActivity_helpnum // 需要助力的账号数量
				 jd_wxShareActivity_blacklist="" // 黑名单 用&隔开 pin值
				 JD_LZ_OPEN="false" //关闭LZ相关活动运行
				 
				 建议只跑助力数量变量不要太多，会黑ip

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#分享有礼-加密
1 1 1 1 * jd_wxShareActivity.js, tag=分享有礼-加密, enabled=true
*/
const Env = require('./utils/Env.js');
const $ = new Env("分享有礼-加密");

const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const getToken = require("./function/krgetToken");
let cookiesArr = [],
  cookie = "";
let authorCodeList = [];
let ownCookieNum = 1;
let isGetAuthorCodeList = true;
let activityId = "";
$.activityEnd = false;
let lz_cookie = {};
if (process.env.jd_wxShareActivity_helpnum && process.env.jd_wxShareActivity_helpnum != "") {
  ownCookieNum = process.env.jd_wxShareActivity_helpnum;
}
if (process.env.jd_wxShareActivity_activityId && process.env.jd_wxShareActivity_activityId != "") {
  activityId = process.env.jd_wxShareActivity_activityId;
}
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x8a5bxc => {
    cookiesArr.push(jdCookieNode[_0x8a5bxc]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(_0x8a5bxc => {
    return _0x8a5bxc.cookie;
  });
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(_0x8a5bxc => {
    return !!_0x8a5bxc;
  });
}
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_wxShareActivity_whitelist || whitelist;
$.blacklist = process.env.jd_wxShareActivity_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  isGetAuthorCodeList = true;
  $.maxShareTimes = 0;
  console.log("活动入口：https://lzkjdz-isv.isvjd.com/wxShareActivity/activity/activity?activityId=" + activityId);
  for (let _0x8a5bx12 = 0; _0x8a5bx12 < ownCookieNum; _0x8a5bx12++) {
    if (cookiesArr[_0x8a5bx12]) {
      cookie = cookiesArr[_0x8a5bx12];
      originCookie = cookiesArr[_0x8a5bx12];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x8a5bx12 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "获取助力码*********\n");
      if (!$.isLogin) {
        $.msg($.name, `${"【提示】cookie已失效"}`, `${"京东账号"}${$.index}${" "}${$.nickName || $.UserName}${"\\n请重新登录获取\\nhttps://bean.m.jd.com/bean/signIndex.action"}`, {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        continue;
      }
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.authorCode = authorCodeList[random(0, authorCodeList.length)];
      $.authorNum = `${""}${random(1000000, 9999999)}${""}`;
      $.activityId = activityId;
      $.activityUrl = `${"https://lzkjdz-isv.isvjcloud.com/wxShareActivity/activity/activity?activityId="}${$.activityId}${""}`;
      await getFirstLZCK();
      if ($.activityEnd === true) {
        return;
      }
      await $.wait(1500);
      if ($.index == 1) {
        await task("customer/getSimpleActInfoVo", `${"activityId="}${$.activityId}${""}`, 1);
        await $.wait(500);
      }
      await getMyPing();
      await $.wait(1500);
      await share();
      if ($.index == 1) {
        console.log("");
        for (let _0x8a5bx13 = 0; _0x8a5bx13 < $.drawContentVOs.length; _0x8a5bx13++) {
          console.log(`${"❖ 分享"}${$.drawContentVOs[_0x8a5bx13].shareTimes}${"人领取 · "}${$.drawContentVOs[_0x8a5bx13].name}${""}`);
          if (_0x8a5bx13 == 0) {
            $.maxShareTimes = $.drawContentVOs[_0x8a5bx13].shareTimes;
          } else {
            if ($.drawContentVOs[_0x8a5bx13].shareTimes > $.maxShareTimes) {
              $.maxShareTimes = $.drawContentVOs[_0x8a5bx13].shareTimes;
            }
          }
        }
      }
      if ($.activityEnd) {
        break;
      }
    }
  }
  isGetAuthorCodeList = false;
  $.shareTimes = 0;
  console.log("\n");
  for (let _0x8a5bx12 = 0; _0x8a5bx12 < cookiesArr.length; _0x8a5bx12++) {
    if (cookiesArr[_0x8a5bx12]) {
      cookie = cookiesArr[_0x8a5bx12];
      originCookie = cookiesArr[_0x8a5bx12];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x8a5bx12 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.errorMessage = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "助力*********\n");
      if (!$.isLogin) {
        $.msg($.name, `${"【提示】cookie已失效"}`, `${"京东账号"}${$.index}${" "}${$.nickName || $.UserName}${"\\n请重新登录获取\\nhttps://bean.m.jd.com/bean/signIndex.action"}`, {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        continue;
      }
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.authorCode = authorCodeList[random(0, authorCodeList.length)];
      $.authorNum = `${""}${random(1000000, 9999999)}${""}`;
      $.activityId = activityId;
      $.activityUrl = `${"https://lzkjdz-isv.isvjcloud.com/wxShareActivity/activity/"}${$.activityId}${"?activityId="}${$.activityId}${""}`;
      await getFirstLZCK();
      await $.wait(1500);
      await getMyPing();
      $.helpResult = false;
      for (let _0x8a5bx11 = 0; _0x8a5bx11 < authorCodeList.length; _0x8a5bx11++) {
        if (_0x8a5bx11 + 1 == $.index) {
          continue;
        }
        $.authorCode = authorCodeList[_0x8a5bx11];
        await $.wait(1500);
        console.log("去助力 ➜ " + $.authorCode);
        await share();
        if ($.errorMessage === "活动太火爆，还是去买买买吧") {
          break;
        }
      }
      if ($.helpResult) {
        $.shareTimes += 1;
      }
      if ($.shareTimes >= $.maxShareTimes + 1) {
        console.log("\n助力次数已满足最高奖品要求，直接开始领取奖品");
        break;
      }
    }
  }
  console.log("\n");
  for (let _0x8a5bx12 = 0; _0x8a5bx12 < ownCookieNum; _0x8a5bx12++) {
    if (cookiesArr[_0x8a5bx12]) {
      cookie = cookiesArr[_0x8a5bx12];
      originCookie = cookiesArr[_0x8a5bx12];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "领取奖励*********\n");
      $.authorCode = authorCodeList[0];
      $.activityId = activityId;
      await getFirstLZCK();
      await $.wait(1500);
      await getMyPing();
      await $.wait(1500);
      await getPrize();
      await $.wait(1500);
    }
  }
})().catch(_0x8a5bx11 => {
  $.log("", `${"❌ "}${$.name}${", 失败! 原因: "}${_0x8a5bx11}${"!"}`, "");
}).finally(() => {
  $.done();
});
async function share() {
  if ($.secretPin) {
    await task("common/accessLogWithAD", `${"venderId="}${$.venderId}${"&code=25&pin="}${encodeURIComponent($.secretPin)}${"&activityId="}${$.activityId}${"&pageUrl="}${$.activityUrl}${"&subType=app&adSource=null"}`, 1);
    await task("activityContent", `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.secretPin)}${"&friendUuid="}${encodeURIComponent($.authorCode)}${""}`);
  } else {
    $.log("没有成功获取到用户信息");
  }
}
async function getPrize() {
  if ($.secretPin) {
    await task("activityContent", `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.secretPin)}${"&friendUuid="}${encodeURIComponent($.authorCode)}${""}`);
    for (let _0x8a5bx16 in $.drawContentVOs) {
      await task("getPrize", `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.secretPin)}${"&drawInfoId="}${$.drawContentVOs[_0x8a5bx16].drawInfoId}${""}`);
    }
  } else {
    $.log("没有成功获取到用户信息");
  }
}
function task(_0x8a5bx18, _0x8a5bx19, _0x8a5bx1a = 0) {
  return new Promise(_0x8a5bx1b => {
    $.post(taskUrl(_0x8a5bx18, _0x8a5bx19, _0x8a5bx1a), async (_0x8a5bx1c, _0x8a5bx1d, _0x8a5bx1e) => {
      try {
        if (_0x8a5bx1c) {
          $.log(_0x8a5bx1c);
        } else {
          if (_0x8a5bx1e) {
            _0x8a5bx1e = JSON.parse(_0x8a5bx1e);
            if (_0x8a5bx1e.result) {
              switch (_0x8a5bx18) {
                case "customer/getSimpleActInfoVo":
                  $.venderId = _0x8a5bx1e.data.venderId;
                  break;
                case "activityContent":
                  $.activityContent = _0x8a5bx1e.data;
                  if (isGetAuthorCodeList) {
                    console.log("助力码：" + _0x8a5bx1e.data.myUuid);
                    authorCodeList.push(_0x8a5bx1e.data.myUuid);
                  }
                  $.helpResult = true;
                  $.drawContentVOs = _0x8a5bx1e.data.drawContentVOs;
                  break;
                case "getPrize":
                  console.log("🎉 获得：" + _0x8a5bx1e.data.name);
                  break;
              }
            } else {
              if (_0x8a5bx1e.errorMessage) {
                console.log(_0x8a5bx1e.errorMessage);
              } else {
                console.log(JSON.stringify(_0x8a5bx1e));
              }
            }
          }
          if (_0x8a5bx1d.status == 200) {
            setActivityCookie(_0x8a5bx1d);
          }
        }
      } catch (error) {
        $.log(error);
      } finally {
        _0x8a5bx1b();
      }
    });
  });
}
function taskUrl(_0x8a5bx18, _0x8a5bx19, _0x8a5bx1a) {
  return {
    url: _0x8a5bx1a ? `${"https://lzkjdz-isv.isvjcloud.com/"}${_0x8a5bx18}${""}` : `${"https://lzkjdz-isv.isvjcloud.com/wxShareActivity/"}${_0x8a5bx18}${""}`,
    headers: {
      Host: "lzkjdz-isv.isvjcloud.com",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://lzkjdz-isv.isvjcloud.comm",
      "User-Agent": `${"jdapp;iPhone;9.5.4;13.6;"}${$.UUID}${";network/wifi;ADID/"}${$.ADID}${";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"}`,
      Connection: "keep-alive",
      Referer: $.activityUrl,
      Cookie: activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER
    },
    body: _0x8a5bx19
  };
}
async function getMyPing() {
  $.token = null;
  $.secretPin = null;
  $.token = await getToken(originCookie, "https://lzkjdz-isv.isvjd.com");
  if ($.token) {
    let _0x8a5bx21 = {
      url: `${"https://lzkjdz-isv.isvjcloud.com/customer/getMyPing"}`,
      headers: {
        Host: "lzkjdz-isv.isvjcloud.com",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://lzkjdz-isv.isvjcloud.com",
        "User-Agent": `${"jdapp;iPhone;9.5.4;13.6;"}${$.UUID}${";network/wifi;ADID/"}${$.ADID}${";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"}`,
        Connection: "keep-alive",
        Referer: $.activityUrl,
        Cookie: cookie
      },
      body: `${"userId="}${$.venderId}${"&token="}${$.token}${"&fromType=APP"}`
    };
    return new Promise(_0x8a5bx1b => {
      $.post(_0x8a5bx21, (_0x8a5bx1c, _0x8a5bx1d, _0x8a5bx1e) => {
        try {
          if (_0x8a5bx1c) {
            $.log(_0x8a5bx1c);
          } else {
            if (_0x8a5bx1d.status == 200) {
              setActivityCookie(_0x8a5bx1d);
            }
            if (_0x8a5bx1e) {
              _0x8a5bx1e = JSON.parse(_0x8a5bx1e);
              if (_0x8a5bx1e.result) {
                $.nickName = _0x8a5bx1e.data.nickname;
                $.secretPin = _0x8a5bx1e.data.secretPin;
                cookie = `${""}${cookie}${"; AUTH_C_USER="}${_0x8a5bx1e.data.secretPin}${""}`;
              } else {
                $.errorMessage = _0x8a5bx1e.errorMessage;
                $.log($.errorMessage);
              }
            } else {
              $.log("京东返回了空数据");
            }
          }
        } catch (error) {
          $.log(error);
        } finally {
          _0x8a5bx1b();
        }
      });
    });
  } else {
    $.log("没有成功获取到用户鉴权信息");
  }
}
function getFirstLZCK() {
  return new Promise(_0x8a5bx1b => {
    $.get({
      url: $.activityUrl,
      headers: {
        "user-agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    }, (_0x8a5bx1c, _0x8a5bx1d, _0x8a5bx1e) => {
      try {
        if (_0x8a5bx1c) {
          console.log(_0x8a5bx1c);
        } else {
          let _0x8a5bx23 = _0x8a5bx1e.match(/(活动已经结束)/) && _0x8a5bx1e.match(/(活动已经结束)/)[1] || "";
          if (_0x8a5bx23) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          if (_0x8a5bx1d.status == 200) {
            setActivityCookie(_0x8a5bx1d);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        _0x8a5bx1b();
      }
    });
  });
}
function random(_0x8a5bx25, _0x8a5bx26) {
  return Math.floor(Math.random() * (_0x8a5bx26 - _0x8a5bx25)) + _0x8a5bx25;
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x8a5bx28 = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x8a5bx28.join("&") + "\n");
  let _0x8a5bx29 = _0x8a5bx28;
  let _0x8a5bx2a = [];
  let _0x8a5bx2b = false;
  for (let _0x8a5bx12 = 0; _0x8a5bx12 < cookiesArr.length; _0x8a5bx12++) {
    let _0x8a5bx2c = decodeURIComponent(cookiesArr[_0x8a5bx12].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x8a5bx12].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x8a5bx2c) {
      break;
    }
    let _0x8a5bx2d = false;
    for (let _0x8a5bx2e of _0x8a5bx29) {
      if (_0x8a5bx2e && _0x8a5bx2e == _0x8a5bx2c) {
        _0x8a5bx2d = true;
        break;
      }
    }
    if (!_0x8a5bx2d) {
      _0x8a5bx2b = true;
      _0x8a5bx2a.splice(_0x8a5bx12, -1, cookiesArr[_0x8a5bx12]);
    }
  }
  if (_0x8a5bx2b) {
    cookiesArr = _0x8a5bx2a;
  }
}
function toFirst(_0x8a5bx2a, _0x8a5bx30) {
  if (_0x8a5bx30 != 0) {
    _0x8a5bx2a.unshift(_0x8a5bx2a.splice(_0x8a5bx30, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x8a5bx28 = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x8a5bx28.join("&") + "\n");
  let _0x8a5bx2a = [];
  let _0x8a5bx32 = _0x8a5bx28;
  for (let _0x8a5bx12 in cookiesArr) {
    let _0x8a5bx2c = decodeURIComponent(cookiesArr[_0x8a5bx12].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x8a5bx12].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x8a5bx32.includes(_0x8a5bx2c)) {
      _0x8a5bx2a.push(cookiesArr[_0x8a5bx12]);
    }
  }
  helpCookiesArr = _0x8a5bx2a;
  if (_0x8a5bx32.length > 1) {
    for (let _0x8a5bx2e in _0x8a5bx32) {
      let _0x8a5bx33 = _0x8a5bx32[_0x8a5bx32.length - 1 - _0x8a5bx2e];
      if (!_0x8a5bx33) {
        continue;
      }
      for (let _0x8a5bx12 in helpCookiesArr) {
        let _0x8a5bx2c = decodeURIComponent(helpCookiesArr[_0x8a5bx12].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x8a5bx12].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x8a5bx33 == _0x8a5bx2c) {
          toFirst(helpCookiesArr, _0x8a5bx12);
        }
      }
    }
  }
}
function setActivityCookie(_0x8a5bx1d) {
  if (_0x8a5bx1d.headers["set-cookie"]) {
    cookie = `${""}${originCookie}${""}`;
    for (let _0x8a5bx35 of _0x8a5bx1d.headers["set-cookie"]) {
      lz_cookie[_0x8a5bx35.split(";")[0].substr(0, _0x8a5bx35.split(";")[0].indexOf("="))] = _0x8a5bx35.split(";")[0].substr(_0x8a5bx35.split(";")[0].indexOf("=") + 1);
    }
    for (const _0x8a5bx36 of Object.keys(lz_cookie)) {
      cookie += _0x8a5bx36 + "=" + lz_cookie[_0x8a5bx36] + ";";
    }
    activityCookie = cookie;
  }
}
function getUUID(_0x8a5bx38 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x8a5bx39 = 0) {
  return _0x8a5bx38.replace(/[xy]/g, function (_0x8a5bx3a) {
    var _0x8a5bx3b = Math.random() * 16 | 0,
      _0x8a5bx3c = _0x8a5bx3a == "x" ? _0x8a5bx3b : _0x8a5bx3b & 3 | 8;
    if (_0x8a5bx39) {
      uuid = _0x8a5bx3c.toString(36).toUpperCase();
    } else {
      uuid = _0x8a5bx3c.toString(36);
    }
    return uuid;
  });
}
	
// prettier-ignore