/*
活动地址为：https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=xxxxx
一共有2个变量
jd_cjhy_activityId  活动ID 必需
jd_cjhy_activityUrl 活动地址 必需
jd_cjhy_blacklist="" // 黑名单 用&隔开 pin值
JD_CJ_OPEN="false" //关闭CJ相关活动运行

cron:10 10 10 10 *
============Quantumultx===============
[task_local]
#CJ组队瓜分京豆
1 1 1 1 * jd_cjzdgf.js, tag=CJ组队瓜分京豆, enabled=true

*/

let jd_cjhy_activityId="" // 活动ID
let jd_cjhy_activityUrl="https://cjhydz-isv.isvjcloud.com" // 活动地址

const Env=require('./utils/Env.js');
const $ = new Env('CJ组队瓜分京豆-加密');

const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const getToken = require("./function/krgetToken");
let domains = "https://cjhydz-isv.isvjcloud.com";
let lz_cookie = {};
let cookiesArr = [],
  cookie = "",
  message = "",
  messageTitle = "";
activityId = $.getdata("jd_kr_cjhy_activityId") ? $.getdata("jd_kr_cjhy_activityId") : jd_cjhy_activityId;
activityUrl = $.getdata("jd_kr_cjhy_activityUrl") ? $.getdata("jd_kr_cjhy_activityUrl") : jd_cjhy_activityUrl;
let activityCookie = "";
if ($.isNode()) {
  if (process.env.jd_cjhy_activityId) {
    activityId = process.env.jd_cjhy_activityId;
  }
  if (process.env.jd_cjhy_activityUrl) {
    activityUrl = process.env.jd_cjhy_activityUrl;
  }
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(jdCookieNode).forEach(_0x6979xc => {
    cookiesArr.push(jdCookieNode[_0x6979xc]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x6979xc => {
    return _0x6979xc.cookie;
  })].filter(_0x6979xc => {
    return !!_0x6979xc;
  });
}
let isGetCookie = typeof $request !== "undefined";
if (isGetCookie) {
  GetCookie();
  $.done();
}
let cjopen = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_cjhy_whitelist || whitelist;
$.blacklist = process.env.jd_cjhy_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  if (cjopen === "false") {
    console.log("\n❌  已设置全局关闭CJ相关活动\n");
    return;
  }
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("【当前活动入口】\nhttps://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=" + activityId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.memberCount = 0;
  messageTitle += "活动id:\n" + activityId + "\n";
  $.toactivity = [];
  for (let _0x6979x13 = 0; _0x6979x13 < cookiesArr.length; _0x6979x13++) {
    if (cookiesArr[_0x6979x13]) {
      cookie = cookiesArr[_0x6979x13];
      originCookie = cookiesArr[_0x6979x13];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x6979x13 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await jrzd();
      await $.wait(2000);
      if (!$.toactivity || $.maxTeam || $.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  messageTitle += "队伍人数 " + $.memberCount + "\n";
  await showMsg();
})().catch(_0x6979x12 => {
  $.log("", `${" "}${$.name}${", 失败! 原因: "}${_0x6979x12}${"!"}`, "");
}).finally(() => {
  $.done();
});
async function jrzd() {
  getUA();
  $.token = "";
  $.Pin = "";
  $.saveTeam = false;
  await getCk();
  if ($.outFlag) {
    console.log("此ip已被限制，请过更换IP后或者等待一会儿再执行脚本\n");
    return;
  }
  await $.wait(1000);
  if ($.index == 1) {
    $.shopId = "";
    $.venderId = "";
    await getSimpleActInfoVo();
    if ($.activityEnd === true) {
      return;
    }
  }
  if ($.shopId && $.venderId) {
    $.token = await getToken(cookie, domains);
    if ($.token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await $.wait(1000);
    if ($.token) {
      await getPin();
    }
    if (!$.Pin) {
      console.log("获取用户[Pin]失败！");
      return;
    }
    await $.wait(1000);
    await accessLog();
    await $.wait(1000);
    await getOpenCardInfo();
    await $.wait(1000);
    await getTeam();
    if ($.maxTeam) {
      console.log("队伍已满员");
      return;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
    message += "【京东账号" + $.index + "】 未能获取活动信息\n";
    if ($.index == 1) {
      return;
    }
  }
}
function getUA() {
  $.UA = `${"jdapp;iPhone;10.3.0;;;M/5.0;appBuild/167903;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22sv%22%3A%22CJGkEK%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A1645068549%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"}`;
}
function showMsg() {
  return new Promise(_0x6979x17 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    _0x6979x17();
  });
}
function getSimpleActInfoVo() {
  return new Promise(_0x6979x17 => {
    let _0x6979x19 = `${"activityId="}${activityId}${""}`;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", _0x6979x19), async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        _0x6979x1c = JSON.parse(_0x6979x1c);
        if (_0x6979x1c.data != null) {
          $.shopId = _0x6979x1c.data.shopId;
          $.venderId = _0x6979x1c.data.venderId;
        } else {
          $.activityEnd = true;
        }
        if (_0x6979x1a) {
          console.log(`${""}${$.toStr(_0x6979x1a)}${""}`);
          console.log(`${""}${$.name}${" getSimpleActInfoVo API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function randomString(_0x6979x12) {
  _0x6979x12 = _0x6979x12 || 32;
  let _0x6979x1e = "abcdef0123456789",
    _0x6979x1f = _0x6979x1e.length,
    _0x6979x20 = "";
  for (i = 0; i < _0x6979x12; i++) {
    _0x6979x20 += _0x6979x1e.charAt(Math.floor(Math.random() * _0x6979x1f));
  }
  return _0x6979x20;
}
function getCk() {
  return new Promise(_0x6979x17 => {
    let _0x6979x22 = {
      url: activityUrl + "/wxTeam/activity?activityId=" + activityId,
      headers: {
        Cookie: cookie,
        "User-Agent": $.UA
      }
    };
    $.get(_0x6979x22, async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          if (_0x6979x1b && typeof _0x6979x1b.statusCode != "undefined") {
            if (_0x6979x1b.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + JSON.stringify(_0x6979x1a));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (_0x6979x1b.status == 200) {
            refreshToken(_0x6979x1b);
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function getPin() {
  return new Promise(_0x6979x17 => {
    let _0x6979x19 = "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP&riskType=1";
    $.post(taskPostUrl("/customer/getMyPing", _0x6979x19), async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          if (_0x6979x1b && typeof _0x6979x1b.statusCode != "undefined") {
            if (_0x6979x1b.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + JSON.stringify(_0x6979x1a));
        } else {
          if (_0x6979x1b.status == 200) {
            refreshToken(_0x6979x1b);
          }
          if (safeGet(_0x6979x1c)) {
            _0x6979x1c = JSON.parse(_0x6979x1c);
            if (_0x6979x1c.result && _0x6979x1c.data) {
              $.Pin = _0x6979x1c.data.secretPin;
              $.attrTouXiang = _0x6979x1c.data.yunMidImageUrl ? _0x6979x1c.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
            } else {
              console.log("异常3：" + JSON.stringify(_0x6979x1c));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function getshopInfo() {
  return new Promise(_0x6979x17 => {
    $.post(taskPostUrl("/wxTeam/shopInfo", "activityId=" + activityId), async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          console.log("" + JSON.stringify(_0x6979x1a));
          console.log($.name + " 1 API请求失败，请检查网路重试");
        } else {
          if (_0x6979x1c && safeGet(_0x6979x1c)) {
            _0x6979x1c = JSON.parse(_0x6979x1c);
            if (_0x6979x1c.data) {
              $.sid = _0x6979x1c.data.sid;
              $.userId = _0x6979x1c.data.userId;
              $.shopName = _0x6979x1c.data.shopName;
            } else {
              console.log("异常1：" + JSON.stringify(_0x6979x1c));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(_0x6979x17 => {
    let _0x6979x19 = "venderId=" + $.venderId + "&buyerPin=" + encodeURIComponent($.Pin);
    $.post(taskPostUrl("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", _0x6979x19), async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          console.log("" + JSON.stringify(_0x6979x1a));
          console.log($.getOpenCardInfo + "API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x6979x1c)) {
            _0x6979x1c = JSON.parse(_0x6979x1c);
            if (_0x6979x1c.result && _0x6979x1c.data) {
              if (_0x6979x1c.data.openCardLink) {
                $.channel = _0x6979x1c.data.openCardLink.match(/channel=(\d+)/)[1];
                $.joinVenderId = _0x6979x1c.data.openCardLink.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x6979x17 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x6979x27 = `${""}`;
    if ($.shopactivityId) {
      _0x6979x27 = `${",\"activityId\":"}${$.shopactivityId}${""}`;
    }
    const _0x6979x28 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"shopId\":\""}${$.joinVenderId}${"\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0"}${_0x6979x27}${",\"channel\":406}"}`;
    const _0x6979x29 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x6979x28)
    };
    const _0x6979x2a = await getH5st("8adfb", _0x6979x29);
    const _0x6979x2b = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body="}${_0x6979x28}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x6979x2a)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x6979x2b, async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        _0x6979x1c = _0x6979x1c && _0x6979x1c.match(/jsonp_.*?\((.*?)\);/) && _0x6979x1c.match(/jsonp_.*?\((.*?)\);/)[1] || _0x6979x1c;
        let _0x6979x2c = $.toObj(_0x6979x1c, _0x6979x1c);
        if (_0x6979x2c && typeof _0x6979x2c == "object") {
          if (_0x6979x2c && _0x6979x2c.success === true) {
            console.log(`${" >> "}${_0x6979x2c.message}${""}`);
            $.errorJoinShop = _0x6979x2c.message;
            if (_0x6979x2c.result && _0x6979x2c.result.giftInfo) {
              for (let _0x6979x13 of _0x6979x2c.result.giftInfo.giftList) {
                console.log(`${" >> 入会获得："}${_0x6979x13.discountString}${""}${_0x6979x13.prizeName}${""}${_0x6979x13.secondLineDesc}${""}`);
              }
            }
          } else {
            if (_0x6979x2c && typeof _0x6979x2c == "object" && _0x6979x2c.message) {
              $.errorJoinShop = _0x6979x2c.message;
              console.log(`${""}${_0x6979x2c.message || ""}${""}`);
            } else {
              console.log(_0x6979x1c);
            }
          }
        } else {
          console.log(_0x6979x1c);
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x6979x17 => {
    const _0x6979x28 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"channel\":406,\"payUpShop\":true}"}`;
    const _0x6979x29 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x6979x28)
    };
    const _0x6979x2a = await getH5st("8adfb", _0x6979x29);
    const _0x6979x2b = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body="}${_0x6979x28}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x6979x2a)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x6979x2b, async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        _0x6979x1c = _0x6979x1c && _0x6979x1c.match(/jsonp_.*?\((.*?)\);/) && _0x6979x1c.match(/jsonp_.*?\((.*?)\);/)[1] || _0x6979x1c;
        let _0x6979x2c = $.toObj(_0x6979x1c, _0x6979x1c);
        if (_0x6979x2c && typeof _0x6979x2c == "object") {
          if (_0x6979x2c && _0x6979x2c.success == true) {
            console.log(`${"去加入："}${_0x6979x2c.result.shopMemberCardInfo.venderCardName || ""}${" ("}${$.joinVenderId}${")"}`);
            $.shopactivityId = _0x6979x2c.result.interestsRuleList && _0x6979x2c.result.interestsRuleList[0] && _0x6979x2c.result.interestsRuleList[0].interestsInfo && _0x6979x2c.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else {
          console.log(_0x6979x1c);
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function getH5st(_0x6979x2f, _0x6979x29) {
  return new Promise(async _0x6979x17 => {
    let _0x6979x2b = {
      url: `${"http://api.kingran.cf/h5st"}`,
      body: `${"businessId="}${_0x6979x2f}${"&req="}${encodeURIComponent(JSON.stringify(_0x6979x29))}${""}`,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      timeout: 30 * 1000
    };
    $.post(_0x6979x2b, (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          console.log(JSON.stringify(_0x6979x1a));
          console.log(`${""}${$.name}${" getSign API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17(_0x6979x1c);
      }
    });
  });
}
function getUserInfo() {
  return new Promise(_0x6979x17 => {
    let _0x6979x19 = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/wxActionCommon/getUserInfo", _0x6979x19), async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          console.log("" + JSON.stringify(_0x6979x1a));
          console.log($.name + " 6-1 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x6979x1c)) {
            _0x6979x1c = JSON.parse(_0x6979x1c);
            if (_0x6979x1c.result && _0x6979x1c.data) {
              $.attrTouXiang = _0x6979x1c.data.yunMidImageUrl ? _0x6979x1c.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
            } else {
              console.log("异常6-2：" + JSON.stringify(_0x6979x1c));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function getTeam() {
  return new Promise(_0x6979x17 => {
    let _0x6979x19 = "activityId=" + activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    if ($.signUuid) {
      _0x6979x19 += "&signUuid=" + $.signUuid;
    }
    $.post(taskPostUrl("/wxTeam/activityContent", _0x6979x19), async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          console.log("" + JSON.stringify(_0x6979x1a));
          console.log($.name + " 5 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x6979x1c)) {
            _0x6979x1c = JSON.parse(_0x6979x1c);
            if (_0x6979x1c.result && _0x6979x1c.data) {
              if (new Date(_0x6979x1c.data.active.endTimeStr.replace(/-/g, "/")).getTime() < new Date().getTime()) {
                $.toactivity = false;
                console.log("活动结束");
                messageTitle += "活动结束\n";
                _0x6979x17();
              } else {
                if (!_0x6979x1c.data.canCreate && _0x6979x1c.data.list == null) {
                  message += "人数已满\n";
                }
                if (_0x6979x1c.data.share) {
                  $.memberCount = parseInt(_0x6979x1c.data.share.memberCount, 10) + 1;
                } else {
                  $.memberCount = 0;
                }
                if ($.index == 1) {
                  $.saveTeam = true;
                  $.teamNum = _0x6979x1c.data.active.actRule.match(/最多可以组建(\d+)个战队/);
                  if ($.teamNum) {
                    $.teamNum = $.teamNum[1];
                    messageTitle += "最多可以组建" + $.teamNum + "个战队";
                  }
                }
                if ($.signUuid) {
                  $.log("加入队伍 id: " + $.signUuid);
                  $.wait(600);
                  await joinTeam();
                }
                if ($.saveTeam) {
                  if (_0x6979x1c.data.canCreate) {
                    await saveTeam();
                  } else {
                    $.signUuid = _0x6979x1c.data.signUuid;
                    messageTitle += "队伍id: " + $.signUuid + "\n";
                    message += "【京东账号" + $.index + "】 创建队伍id: " + $.signUuid;
                    $.log("队伍id: " + $.signUuid);
                    $.wait(1000);
                    $.log("加入队伍 id: " + $.signUuid);
                    await joinTeam();
                  }
                }
              }
            } else {
              console.log("异常5：" + JSON.stringify(_0x6979x1c));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17(_0x6979x17);
      }
    });
  });
}
function saveTeam(_0x6979x33 = 0) {
  return new Promise(_0x6979x17 => {
    let _0x6979x34 = encodeURIComponent(encodeURIComponent($.Pin));
    if (_0x6979x33 == 1) {
      _0x6979x34 = encodeURIComponent(encodeURIComponent($.Pin));
    }
    let _0x6979x19 = "activityId=" + activityId + "&pin=" + _0x6979x34 + "&pinImg=" + encodeURIComponent(encodeURIComponent($.attrTouXiang)) + "&venderId=" + $.venderId;
    $.post(taskPostUrl("/wxTeam/saveCaptain", _0x6979x19), async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          console.log("" + JSON.stringify(_0x6979x1a));
          console.log($.name + "saveTeam API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x6979x1c)) {
            _0x6979x1c = JSON.parse(_0x6979x1c);
            if (_0x6979x1c.result && _0x6979x1c.data) {
              message += "【京东账号" + $.index + "】 创建队伍id: " + _0x6979x1c.data.signUuid + " ";
              console.log("创建队伍成功 id: " + _0x6979x1c.data.signUuid);
              $.signUuid = _0x6979x1c.data.signUuid;
              messageTitle += "队伍id: " + $.signUuid + " ";
            } else {
              console.log("异常6：" + JSON.stringify(_0x6979x1c));
              if (_0x6979x1c.errorMessage.indexOf("不是店铺会员") > -1 && _0x6979x33 != 3) {
                $.errorJoinShop = "";
                await getshopactivityId();
                for (let _0x6979x13 = 0; _0x6979x13 < Array(5).length; _0x6979x13++) {
                  if (_0x6979x13 > 0) {
                    console.log(`${"第"}${_0x6979x13}${"次 重新开卡"}`);
                  }
                  await joinShop();
                  if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                    break;
                  }
                  if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                    console.log("开卡失败❌ ，重新执行脚本");
                  }
                }
                await $.wait(800);
                await saveTeam(3);
              } else {
                if (_0x6979x1c.errorMessage.indexOf("奖品与您擦肩而过") > -1 && _0x6979x33 == 0) {
                  await $.wait(800);
                  await saveTeam(1);
                }
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function joinTeam(_0x6979x33 = 0) {
  return new Promise(_0x6979x17 => {
    let _0x6979x34 = encodeURIComponent(encodeURIComponent($.Pin));
    if (_0x6979x33 == 1) {
      _0x6979x34 = encodeURIComponent(encodeURIComponent($.Pin));
    }
    let _0x6979x19 = "activityId=" + activityId + "&signUuid=" + $.signUuid + "&pin=" + _0x6979x34 + "&pinImg=" + encodeURIComponent(encodeURIComponent($.attrTouXiang)) + "&venderId=" + $.venderId;
    $.post(taskPostUrl("/wxTeam/saveMember", _0x6979x19), async (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          console.log("" + JSON.stringify(_0x6979x1a));
          console.log($.name + "joinTeam API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x6979x1c)) {
            _0x6979x1c = JSON.parse(_0x6979x1c);
            if (_0x6979x1c.result && _0x6979x1c.data) {
              message += "【京东账号" + $.index + "】 加入队伍\n";
              $.log("加入队伍成功");
            } else {
              if (_0x6979x1c.errorMessage.indexOf("不是店铺会员") > -1 && _0x6979x33 != 3) {
                $.errorJoinShop = "";
                await getshopactivityId();
                for (let _0x6979x13 = 0; _0x6979x13 < Array(5).length; _0x6979x13++) {
                  if (_0x6979x13 > 0) {
                    console.log(`${"第"}${_0x6979x13}${"次 重新开卡"}`);
                  }
                  await joinShop();
                  if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                    break;
                  }
                  if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                    console.log("开卡失败❌ ，重新执行脚本");
                  }
                }
                await joinTeam(3);
              } else {
                if (_0x6979x1c.errorMessage.indexOf("队伍已经满员") > -1) {
                  $.maxTeam = true;
                } else {
                  if (_0x6979x1c.errorMessage.indexOf("奖品与您擦肩而过") > -1 && _0x6979x33 == 0) {
                    await joinTeam(1);
                  } else {
                    if (_0x6979x1c.errorMessage) {
                      console.log("异常：" + _0x6979x1c.errorMessage);
                    } else {
                      console.log("异常7：" + JSON.stringify(_0x6979x1c));
                      message += "【京东账号" + $.index + "】 " + _0x6979x1c.errorMessage + "\n";
                    }
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function taskPostUrl(_0x6979x37, _0x6979x19) {
  return {
    url: "" + activityUrl + _0x6979x37,
    body: _0x6979x19,
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      Host: `${"cjhydz-isv.isvjcloud.com"}`,
      Origin: `${"https://cjhydz-isv.isvjcloud.com"}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: activityUrl + "/wxTeam/activity?activityId=" + activityId,
      Cookie: cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function taskUrl(_0x6979x37, _0x6979x19) {
  return {
    url: "https://api.m.jd.com/client.action" + _0x6979x37,
    body: _0x6979x19,
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "api.m.jd.com",
      Cookie: cookie,
      "User-Agent": $.UA
    }
  };
}
function TotalBean() {
  return new Promise(async _0x6979x17 => {
    const _0x6979x22 = {
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
    $.post(_0x6979x22, (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          console.log("" + JSON.stringify(_0x6979x1a));
          console.log($.name + "TotalBean API请求失败，请检查网路重试");
        } else {
          if (_0x6979x1c) {
            _0x6979x1c = JSON.parse(_0x6979x1c);
            if (_0x6979x1c.retcode === 13) {
              $.isLogin = false;
              return;
            }
          } else {
            console.log("京东服务器返回空数据");
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function safeGet(_0x6979x1c) {
  try {
    if (typeof JSON.parse(_0x6979x1c) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function accessLog() {
  return new Promise(async _0x6979x17 => {
    const _0x6979x22 = {
      url: `${"https://cjhydz-isv.isvjcloud.com/common/accessLog"}`,
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        Host: `${"cjhydz-isv.isvjcloud.com"}`,
        Origin: `${"https://cjhydz-isv.isvjcloud.com"}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: activityUrl + "/wxTeam/activity?activityId" + activityId,
        Cookie: cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      body: `${"venderId=691399&code=102&pin="}${encodeURIComponent(encodeURIComponent($.Pin))}${"&activityId="}${activityId}${"&pageUrl=https%3A%2F%2Fcjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D"}${activityId}${"&subType=app"}`
    };
    $.post(_0x6979x22, (_0x6979x1a, _0x6979x1b, _0x6979x1c) => {
      try {
        if (_0x6979x1a) {
          console.log("" + JSON.stringify(_0x6979x1a));
          console.log($.name + "accessLog API请求失败，请检查网路重试");
        } else {
          if (_0x6979x1b.status == 200) {
            refreshToken(_0x6979x1b);
          }
        }
      } catch (e) {
        $.logErr(e, _0x6979x1b);
      } finally {
        _0x6979x17();
      }
    });
  });
}
function refreshToken(_0x6979x1b) {
  if (_0x6979x1b) {
    if (_0x6979x1b.headers["set-cookie"]) {
      cookie = `${""}${originCookie}${";"}`;
      for (let _0x6979x3d of _0x6979x1b.headers["set-cookie"]) {
        lz_cookie[_0x6979x3d.split(";")[0].substr(0, _0x6979x3d.split(";")[0].indexOf("="))] = _0x6979x3d.split(";")[0].substr(_0x6979x3d.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x6979x3e of Object.keys(lz_cookie)) {
        cookie += _0x6979x3e + "=" + lz_cookie[_0x6979x3e] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function jsonParse(_0x6979x40) {
  if (typeof strv == "string") {
    try {
      return JSON.parse(_0x6979x40);
    } catch (e) {
      console.log(e);
      $.msg($.name, "", "不要在BoxJS手动复制粘贴修改cookie");
      return [];
    }
  }
}
function GetCookie() {
  if ($request.url.indexOf("/wxTeam/shopInfo") > -1) {
    if ($request.body) {
      let _0x6979x27 = $request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
      if (_0x6979x27) {
        let _0x6979x42 = $request.url.split("/");
        console.log("activityId: " + _0x6979x27[1]);
        console.log("activityUrl: " + _0x6979x42[0] + "//" + _0x6979x42[2]);
        $.setdata(_0x6979x27[1], "jd_kr_cjhy_activityId");
        $.setdata(_0x6979x42[0] + "//" + _0x6979x42[2], "jd_kr_cjhy_activityUrl");
        $.msg($.name, "获取activityId: 成功", "activityId:" + _0x6979x27[1] + "\nactivityUrl:" + _0x6979x42[0] + "//" + _0x6979x42[2]);
      } else {
        $.msg($.name, "找不到activityId", "");
      }
    }
  }
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x6979x44 = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x6979x44.join("&") + "\n");
  let _0x6979x45 = _0x6979x44;
  let _0x6979x46 = [];
  let _0x6979x47 = false;
  for (let _0x6979x13 = 0; _0x6979x13 < cookiesArr.length; _0x6979x13++) {
    let _0x6979x48 = decodeURIComponent(cookiesArr[_0x6979x13].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x6979x13].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x6979x48) {
      break;
    }
    let _0x6979x49 = false;
    for (let _0x6979x20 of _0x6979x45) {
      if (_0x6979x20 && _0x6979x20 == _0x6979x48) {
        _0x6979x49 = true;
        break;
      }
    }
    if (!_0x6979x49) {
      _0x6979x47 = true;
      _0x6979x46.splice(_0x6979x13, -1, cookiesArr[_0x6979x13]);
    }
  }
  if (_0x6979x47) {
    cookiesArr = _0x6979x46;
  }
}
function toFirst(_0x6979x46, _0x6979x4b) {
  if (_0x6979x4b != 0) {
    _0x6979x46.unshift(_0x6979x46.splice(_0x6979x4b, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x6979x44 = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x6979x44.join("&") + "\n");
  let _0x6979x46 = [];
  let _0x6979x4d = _0x6979x44;
  for (let _0x6979x13 in cookiesArr) {
    let _0x6979x48 = decodeURIComponent(cookiesArr[_0x6979x13].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x6979x13].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x6979x4d.includes(_0x6979x48)) {
      _0x6979x46.push(cookiesArr[_0x6979x13]);
    }
  }
  helpCookiesArr = _0x6979x46;
  if (_0x6979x4d.length > 1) {
    for (let _0x6979x20 in _0x6979x4d) {
      let _0x6979x4e = _0x6979x4d[_0x6979x4d.length - 1 - _0x6979x20];
      if (!_0x6979x4e) {
        continue;
      }
      for (let _0x6979x13 in helpCookiesArr) {
        let _0x6979x48 = decodeURIComponent(helpCookiesArr[_0x6979x13].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x6979x13].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x6979x4e == _0x6979x48) {
          toFirst(helpCookiesArr, _0x6979x13);
        }
      }
    }
  }
}