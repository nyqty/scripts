/*

一共有2个变量
jd_zdjr_activityId  活动ID 必需
jd_zdjr_activityUrl 活动地址 必需
jd_zdjr_blacklist="" // 黑名单 用&隔开 pin值
JD_LZ_OPEN="false" //关闭LZ相关活动运行
已适配docker

加密脚本

需要配合重写获取=>活动id、活动地址

https://\w+-isv.isvjcloud.com/wxTeam/shopInfo url script-request-body jd_zdjr.js

mitm
*-isv.isvjcloud.com
[task_local]
组队瓜分京豆
40 11 * * * jd_zdjr.js, tag=组队瓜分京豆, enabled=true
================Loon==============
[Script]
cron "40 11 * * *" script-path=jd_zdjr.js,tag=组队瓜分京豆

*/

let jd_zdjr_activityId = ''// 活动ID
let jd_zdjr_activityUrl = 'https://lzkjdz-isv.isvjcloud.com'// 活动地址
const Env=require('./utils/Env.js');
const $ = new Env('LZ组队瓜分京豆-加密');
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const getToken = require("./function/krgetToken");
let domains = "https://lzkjdz-isv.isvjd.com";
let lz_cookie = {};
let cookiesArr = [],
  cookie = "",
  message = "",
  messageTitle = "";
activityId = $.getdata("jd_kr_zdjr_activityId") ? $.getdata("jd_kr_zdjr_activityId") : jd_zdjr_activityId;
activityUrl = $.getdata("jd_kr_zdjr_activityUrl") ? $.getdata("jd_kr_zdjr_activityUrl") : jd_zdjr_activityUrl;
let activityCookie = "";
if ($.isNode()) {
  if (process.env.jd_zdjr_activityId) {
    activityId = process.env.jd_zdjr_activityId;
  }
  if (process.env.jd_zdjr_activityUrl) {
    activityUrl = process.env.jd_zdjr_activityUrl;
  }
  Object.keys(jdCookieNode).forEach(_0x42efxb => {
    cookiesArr.push(jdCookieNode[_0x42efxb]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(_0x42efxb => {
    return _0x42efxb.cookie;
  });
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(_0x42efxb => {
    return !!_0x42efxb;
  });
}
let isGetCookie = typeof $request !== "undefined";
if (isGetCookie) {
  GetCookie();
  $.done();
}
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_zdjr_whitelist || whitelist;
$.blacklist = process.env.jd_zdjr_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("【当前活动入口】\nhttps://lzkjdz-isv.isvjcloud.com/wxTeam/activity2/activity?activityId=" + activityId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.memberCount = 0;
  messageTitle += "活动id:\n" + activityId + "\n";
  $.toactivity = true;
  for (let _0x42efx13 = 0; _0x42efx13 < cookiesArr.length; _0x42efx13++) {
    if (cookiesArr[_0x42efx13]) {
      cookie = cookiesArr[_0x42efx13];
      originCookie = cookiesArr[_0x42efx13];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x42efx13 + 1;
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
      await getUA();
      await jrzd();
      await $.wait(2000);
      if (!$.toactivity || $.maxTeam || $.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  messageTitle += "队伍人数 " + $.memberCount + "\n";
  await showMsg();
})().catch(_0x42efx12 => {
  $.log("", `${" "}${$.name}${", 失败! 原因: "}${_0x42efx12}${"!"}`, "");
}).finally(() => {
  $.done();
});
async function jrzd() {
  $.token = "";
  $.Pin = "";
  $.saveTeam = false;
  await getCk();
  if ($.outFlag) {
    console.log("此ip已被限制，请过更换IP后或者等待一会儿再执行脚本\n");
    return;
  }
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
    await $.wait(500);
    if ($.token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await $.wait(1000);
    if ($.token) {
      await getPin();
    }
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await $.wait(1000);
    await getOpenCardInfo();
    await $.wait(500);
    await getTeam();
    await $.wait(500);
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
async function getUA() {
  $.UA = `${"jdapp;iPhone;10.1.4;13.1.2;"}${randomString(40)}${";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"}`;
}
function randomString(_0x42efx12) {
  _0x42efx12 = _0x42efx12 || 32;
  let _0x42efx17 = "abcdef0123456789",
    _0x42efx18 = _0x42efx17.length,
    _0x42efx19 = "";
  for (i = 0; i < _0x42efx12; i++) {
    _0x42efx19 += _0x42efx17.charAt(Math.floor(Math.random() * _0x42efx18));
  }
  return _0x42efx19;
}
function showMsg() {
  return new Promise(_0x42efx1b => {
    let _0x42efx1c = openAppUrl();
    console.log("运行完毕");
    console.log(_0x42efx1c);
    $.msg($.name, "" + $.shopName, "" + messageTitle + message + " \n点击弹窗跳转到京东APP活动页面", {
      "open-url": _0x42efx1c
    });
    _0x42efx1b();
  });
}
function openAppUrl() {
  let _0x42efx1e = activityUrl + "/wxTeam/activity?activityId=" + activityId;
  let _0x42efx1f = _0x42efx1e;
  if (_0x42efx1e.substr(0, 5) === "https") {
    let _0x42efx20 = {
      "category": "jump",
      "des": "getCoupon",
      "url": _0x42efx1e.substr(8)
    };
    _0x42efx1f = "openApp.jdMobile://virtual?params=" + encodeURIComponent(JSON.stringify(_0x42efx20));
  } else {
    if (_0x42efx1e.substr(0, 4) === "http") {
      let _0x42efx21 = {
        "category": "jump",
        "des": "getCoupon",
        "url": _0x42efx1e.substr(7)
      };
      _0x42efx1f = "openApp.jdMobile://virtual?params=" + encodeURIComponent(JSON.stringify(_0x42efx21));
    }
  }
  return _0x42efx1f;
}
function getSimpleActInfoVo() {
  return new Promise(_0x42efx1b => {
    let _0x42efx23 = `${"activityId="}${activityId}${""}`;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", _0x42efx23), async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        _0x42efx26 = JSON.parse(_0x42efx26);
        if (_0x42efx26.data != null) {
          $.shopId = _0x42efx26.data.shopId;
          $.venderId = _0x42efx26.data.venderId;
        } else {
          $.activityEnd = true;
        }
        if (_0x42efx24) {
          console.log(`${""}${$.toStr(_0x42efx24)}${""}`);
          console.log(`${""}${$.name}${" getSimpleActInfoVo API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
function getCk() {
  return new Promise(_0x42efx1b => {
    let _0x42efx28 = {
      url: `${"https://lzkjdz-isv.isvjcloud.com/wxTeam/activity2/6376942?activityId="}${$.activityId}${""}`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": `${"https://lzkjdz-isv.isvjcloud.com/wxTeam/activity2/6376942?activityId="}${$.activityId}${""}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0x42efx28, async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx24) {
          if (_0x42efx25 && typeof _0x42efx25.statusCode != "undefined") {
            if (_0x42efx25.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.toStr(_0x42efx24)}${""}`);
          console.log(`${""}${$.name}${" cookie API请求失败，请检查网路重试"}`);
        } else {
          setActivityCookie(_0x42efx25);
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
function setActivityCookie(_0x42efx25) {
  if (_0x42efx25) {
    if (_0x42efx25.headers["set-cookie"]) {
      cookie = `${""}${originCookie}${";"}`;
      for (let _0x42efx2a of _0x42efx25.headers["set-cookie"]) {
        lz_cookie[_0x42efx2a.split(";")[0].substr(0, _0x42efx2a.split(";")[0].indexOf("="))] = _0x42efx2a.split(";")[0].substr(_0x42efx2a.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x42efx2b of Object.keys(lz_cookie)) {
        cookie += _0x42efx2b + "=" + lz_cookie[_0x42efx2b] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getPin() {
  return new Promise(_0x42efx1b => {
    let _0x42efx23 = "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", _0x42efx23), async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx25.status == 200) {
          setActivityCookie(_0x42efx25);
        }
        if (_0x42efx24) {
          if (_0x42efx25 && typeof _0x42efx25.statusCode != "undefined") {
            if (_0x42efx25.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + JSON.stringify(_0x42efx24));
          console.log($.name + " 3 API请求失败，请检查网路重试");
        } else {
          if (_0x42efx26 && safeGet(_0x42efx26)) {
            _0x42efx26 = JSON.parse(_0x42efx26);
            if (_0x42efx26.result && _0x42efx26.data) {
              $.Pin = _0x42efx26.data.secretPin;
              $.attrTouXiang = _0x42efx26.data.yunMidImageUrl ? _0x42efx26.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
            } else {
              console.log("异常3：" + JSON.stringify(_0x42efx26));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
function getshopInfo() {
  return new Promise(_0x42efx1b => {
    $.post(taskPostUrl("/wxTeam/shopInfo", "activityId=" + activityId), async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx24) {
          console.log("" + JSON.stringify(_0x42efx24));
          console.log($.name + " 1 API请求失败，请检查网路重试");
        } else {
          if (_0x42efx26 && safeGet(_0x42efx26)) {
            _0x42efx26 = JSON.parse(_0x42efx26);
            if (_0x42efx26.data) {
              $.sid = _0x42efx26.data.sid;
              $.userId = _0x42efx26.data.userId;
              $.shopName = _0x42efx26.data.shopName;
            } else {
              console.log("异常1：" + JSON.stringify(_0x42efx26));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(_0x42efx1b => {
    let _0x42efx23 = `${"venderId="}${$.venderId}${"&activityId="}${activityId}${"&pin="}${encodeURIComponent($.Pin)}${""}`;
    $.post(taskPostUrl("/wxCommonInfo/getActMemberInfo", _0x42efx23), async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx24) {
          console.log("" + JSON.stringify(_0x42efx24));
          console.log($.name + "API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x42efx26)) {
            _0x42efx26 = JSON.parse(_0x42efx26);
            if (_0x42efx26.result && _0x42efx26.data) {
              if (_0x42efx26.data.openCardUrl) {
                $.channel = _0x42efx26.data.openCardUrl.match(/channel=(\d+)/)[1];
                $.joinVenderId = _0x42efx26.data.openCardUrl.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x42efx1b => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x42efx31 = `${""}`;
    if ($.shopactivityId) {
      _0x42efx31 = `${",\"activityId\":"}${$.shopactivityId}${""}`;
    }
    const _0x42efx32 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"shopId\":\""}${$.joinVenderId}${"\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0"}${_0x42efx31}${",\"channel\":406}"}`;
    const _0x42efx33 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x42efx32)
    };
    const _0x42efx34 = await getH5st("8adfb", _0x42efx33);
    const _0x42efx35 = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body="}${_0x42efx32}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x42efx34)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x42efx35, async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        _0x42efx26 = _0x42efx26 && _0x42efx26.match(/jsonp_.*?\((.*?)\);/) && _0x42efx26.match(/jsonp_.*?\((.*?)\);/)[1] || _0x42efx26;
        let _0x42efx36 = $.toObj(_0x42efx26, _0x42efx26);
        if (_0x42efx36 && typeof _0x42efx36 == "object") {
          if (_0x42efx36 && _0x42efx36.success === true) {
            console.log(`${" >> "}${_0x42efx36.message}${""}`);
            $.errorJoinShop = _0x42efx36.message;
            if (_0x42efx36.result && _0x42efx36.result.giftInfo) {
              for (let _0x42efx13 of _0x42efx36.result.giftInfo.giftList) {
                console.log(`${" >> 入会获得："}${_0x42efx13.discountString}${""}${_0x42efx13.prizeName}${""}${_0x42efx13.secondLineDesc}${""}`);
              }
            }
          } else {
            if (_0x42efx36 && typeof _0x42efx36 == "object" && _0x42efx36.message) {
              $.errorJoinShop = _0x42efx36.message;
              console.log(`${""}${_0x42efx36.message || ""}${""}`);
            } else {
              console.log(_0x42efx26);
            }
          }
        } else {
          console.log(_0x42efx26);
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x42efx1b => {
    const _0x42efx32 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"channel\":406,\"payUpShop\":true}"}`;
    const _0x42efx33 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x42efx32)
    };
    const _0x42efx34 = await getH5st("8adfb", _0x42efx33);
    const _0x42efx35 = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body="}${_0x42efx32}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x42efx34)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x42efx35, async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        _0x42efx26 = _0x42efx26 && _0x42efx26.match(/jsonp_.*?\((.*?)\);/) && _0x42efx26.match(/jsonp_.*?\((.*?)\);/)[1] || _0x42efx26;
        let _0x42efx36 = $.toObj(_0x42efx26, _0x42efx26);
        if (_0x42efx36 && typeof _0x42efx36 == "object") {
          if (_0x42efx36 && _0x42efx36.success == true) {
            console.log(`${"去加入："}${_0x42efx36.result.shopMemberCardInfo.venderCardName || ""}${" ("}${$.joinVenderId}${")"}`);
            $.shopactivityId = _0x42efx36.result.interestsRuleList && _0x42efx36.result.interestsRuleList[0] && _0x42efx36.result.interestsRuleList[0].interestsInfo && _0x42efx36.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else {
          console.log(_0x42efx26);
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
function getH5st(_0x42efx39, _0x42efx33) {
  return new Promise(async _0x42efx1b => {
    let _0x42efx35 = {
      url: `${"http://api.kingran.cf/h5st"}`,
      body: `${"businessId="}${_0x42efx39}${"&req="}${encodeURIComponent(JSON.stringify(_0x42efx33))}${""}`,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      timeout: 30 * 1000
    };
    $.post(_0x42efx35, (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx24) {
          console.log(JSON.stringify(_0x42efx24));
          console.log(`${""}${$.name}${" getSign API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b(_0x42efx26);
      }
    });
  });
}
function getUserInfo() {
  return new Promise(_0x42efx1b => {
    let _0x42efx23 = "pin=" + encodeURIComponent($.Pin);
    $.post(taskPostUrl("/wxActionCommon/getUserInfo", _0x42efx23), async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx24) {
          console.log("" + JSON.stringify(_0x42efx24));
          console.log($.name + " 6-1 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x42efx26)) {
            _0x42efx26 = JSON.parse(_0x42efx26);
            if (_0x42efx26.result && _0x42efx26.data) {
              $.attrTouXiang = _0x42efx26.data.yunMidImageUrl ? _0x42efx26.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
            } else {
              console.log("异常6-2：" + JSON.stringify(_0x42efx26));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
function getTeam() {
  return new Promise(_0x42efx1b => {
    let _0x42efx23 = "activityId=" + activityId + "&pin=" + encodeURIComponent($.Pin);
    if ($.signUuid) {
      _0x42efx23 += "&signUuid=" + $.signUuid;
    }
    $.post(taskPostUrl("/wxTeam/activityContent", _0x42efx23), async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx24) {
          console.log("" + JSON.stringify(_0x42efx24));
          console.log($.name + " 5 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x42efx26)) {
            _0x42efx26 = JSON.parse(_0x42efx26);
            if (_0x42efx26.result && _0x42efx26.data) {
              if (new Date(_0x42efx26.data.active.endTimeStr.replace(/-/g, "/")).getTime() < new Date().getTime()) {
                $.toactivity = false;
                console.log("活动结束");
                messageTitle += "活动结束\n";
                _0x42efx1b();
              } else {
                if (!_0x42efx26.data.canCreate && _0x42efx26.data.list == null) {
                  message += "人数已满\n";
                }
                if (_0x42efx26.data.share) {
                  $.memberCount = parseInt(_0x42efx26.data.share.memberCount, 10) + 1;
                } else {
                  $.memberCount = 0;
                }
                if ($.index == 1) {
                  $.saveTeam = true;
                  $.teamNum = _0x42efx26.data.active.actRule.match(/最多可以组建(\d+)个战队/);
                  if ($.teamNum) {
                    $.teamNum = $.teamNum[1];
                    messageTitle += "最多可以组建" + $.teamNum + "个战队";
                  }
                }
                if ($.signUuid) {
                  $.log("加入队伍 id: " + $.signUuid);
                  await joinTeam();
                }
                if ($.saveTeam) {
                  if (_0x42efx26.data.canCreate) {
                    await saveTeam();
                  } else {
                    $.signUuid = _0x42efx26.data.signUuid;
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
              console.log("异常5：" + JSON.stringify(_0x42efx26));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b(_0x42efx1b);
      }
    });
  });
}
function saveTeam(_0x42efx3d = 0) {
  return new Promise(_0x42efx1b => {
    let _0x42efx3e = encodeURIComponent($.Pin);
    if (_0x42efx3d == 1) {
      _0x42efx3e = encodeURIComponent($.Pin);
    }
    let _0x42efx23 = "activityId=" + activityId + "&pin=" + _0x42efx3e + "&pinImg=" + encodeURIComponent($.attrTouXiang);
    $.post(taskPostUrl("/wxTeam/saveCaptain", _0x42efx23), async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx24) {
          console.log("" + JSON.stringify(_0x42efx24));
          console.log($.name + " 6 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x42efx26)) {
            _0x42efx26 = JSON.parse(_0x42efx26);
            if (_0x42efx26.result && _0x42efx26.data) {
              message += "【京东账号" + $.index + "】 创建队伍id: " + _0x42efx26.data.signUuid + " ";
              console.log("创建队伍成功 id: " + _0x42efx26.data.signUuid);
              $.signUuid = _0x42efx26.data.signUuid;
              messageTitle += "队伍id: " + $.signUuid + " ";
            } else {
              console.log("异常6：" + JSON.stringify(_0x42efx26));
              if (_0x42efx26.errorMessage.indexOf("店铺会员") > -1 && _0x42efx3d != 3) {
                $.errorJoinShop = "";
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 || $.errorJoinShop.indexOf("加入店铺会员失败") > -1) {
                  console.log("第1次 重新开卡");
                  await $.wait(1000);
                  await joinShop();
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 || $.errorJoinShop.indexOf("加入店铺会员失败") > -1) {
                  console.log("第2次 重新开卡");
                  await $.wait(1000);
                  await joinShop();
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 || $.errorJoinShop.indexOf("加入店铺会员失败") > -1) {
                  console.log("第3次 重新开卡");
                  await $.wait(1000);
                  await joinShop();
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 || $.errorJoinShop.indexOf("加入店铺会员失败") > -1) {
                  console.log("第4次 重新开卡");
                  await $.wait(1000);
                  await joinShop();
                }
                await saveTeam(3);
              } else {
                if (_0x42efx26.errorMessage.indexOf("奖品与您擦肩而过") > -1 && _0x42efx3d == 0) {
                  await saveTeam(1);
                }
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
function joinTeam(_0x42efx3d = 0) {
  return new Promise(_0x42efx1b => {
    let _0x42efx3e = encodeURIComponent($.Pin);
    if (_0x42efx3d == 1) {
      _0x42efx3e = encodeURIComponent($.Pin);
    }
    let _0x42efx23 = "activityId=" + activityId + "&signUuid=" + $.signUuid + "&pin=" + _0x42efx3e + "&pinImg=" + encodeURIComponent($.attrTouXiang);
    $.post(taskPostUrl("/wxTeam/saveMember", _0x42efx23), async (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx24) {
          console.log("" + JSON.stringify(_0x42efx24));
          console.log($.name + " 7 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x42efx26)) {
            _0x42efx26 = JSON.parse(_0x42efx26);
            if (_0x42efx26.result && _0x42efx26.data) {
              message += "【京东账号" + $.index + "】 加入队伍\n";
              $.log("加入队伍成功");
            } else {
              if (_0x42efx26.errorMessage.indexOf("店铺会员") > -1 && _0x42efx3d != 3) {
                $.errorJoinShop = "";
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("第1次 重新开卡");
                  await $.wait(1000);
                  await joinShop();
                }
                await joinTeam(3);
              } else {
                if (_0x42efx26.errorMessage.indexOf("队伍已经满员") > -1) {
                  $.maxTeam = true;
                } else {
                  if (_0x42efx26.errorMessage.indexOf("奖品与您擦肩而过") > -1 && _0x42efx3d == 0) {
                    await joinTeam(1);
                  } else {
                    if (_0x42efx26.errorMessage) {
                      console.log("异常：" + _0x42efx26.errorMessage);
                    } else {
                      console.log("异常7：" + JSON.stringify(_0x42efx26));
                      message += "【京东账号" + $.index + "】 " + _0x42efx26.errorMessage + "\n";
                    }
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
function taskPostUrl(_0x42efx1e, _0x42efx23) {
  return {
    url: "" + activityUrl + _0x42efx1e,
    body: _0x42efx23,
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      Host: `${"lzkjdz-isv.isvjcloud.com"}`,
      Origin: `${"https://lzkjdz-isv.isvjcloud.com"}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: activityUrl + "/wxTeam/activity?activityId=" + activityId,
      Cookie: cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function taskUrl(_0x42efx1e, _0x42efx23) {
  return {
    "url": "https://api.m.jd.com/client.action" + _0x42efx1e,
    "body": _0x42efx23,
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
  return new Promise(async _0x42efx1b => {
    const _0x42efx35 = {
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
    $.post(_0x42efx35, (_0x42efx24, _0x42efx25, _0x42efx26) => {
      try {
        if (_0x42efx24) {
          console.log("" + JSON.stringify(_0x42efx24));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0x42efx26) {
            _0x42efx26 = JSON.parse(_0x42efx26);
            if (_0x42efx26.retcode === 13) {
              $.isLogin = false;
              return;
            }
          } else {
            console.log("京东服务器返回空数据");
          }
        }
      } catch (e) {
        $.logErr(e, _0x42efx25);
      } finally {
        _0x42efx1b();
      }
    });
  });
}
function safeGet(_0x42efx26) {
  try {
    if (typeof JSON.parse(_0x42efx26) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function jsonParse(_0x42efx45) {
  if (typeof strv == "string") {
    try {
      return JSON.parse(_0x42efx45);
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
      let _0x42efx31 = $request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
      if (_0x42efx31) {
        let _0x42efx47 = $request.url.split("/");
        console.log("activityId: " + _0x42efx31[1]);
        console.log("activityUrl: " + _0x42efx47[0] + "//" + _0x42efx47[2]);
        $.setdata(_0x42efx31[1], "jd_kr_zdjr_activityId");
        $.setdata(_0x42efx47[0] + "//" + _0x42efx47[2], "jd_kr_zdjr_activityId");
        $.msg($.name, "获取activityId: 成功", "activityId:" + _0x42efx31[1] + "\nactivityUrl:" + _0x42efx47[0] + "//" + _0x42efx47[2]);
      } else {
        $.msg($.name, "找不到activityId", "");
      }
    }
  }
}
function random(_0x42efx49, _0x42efx4a) {
  return Math.floor(Math.random() * (_0x42efx4a - _0x42efx49)) + _0x42efx49;
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x42efx4c = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x42efx4c.join("&") + "\n");
  let _0x42efx4d = _0x42efx4c;
  let _0x42efx4e = [];
  let _0x42efx4f = false;
  for (let _0x42efx13 = 0; _0x42efx13 < cookiesArr.length; _0x42efx13++) {
    let _0x42efx50 = decodeURIComponent(cookiesArr[_0x42efx13].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x42efx13].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x42efx50) {
      break;
    }
    let _0x42efx51 = false;
    for (let _0x42efx19 of _0x42efx4d) {
      if (_0x42efx19 && _0x42efx19 == _0x42efx50) {
        _0x42efx51 = true;
        break;
      }
    }
    if (!_0x42efx51) {
      _0x42efx4f = true;
      _0x42efx4e.splice(_0x42efx13, -1, cookiesArr[_0x42efx13]);
    }
  }
  if (_0x42efx4f) {
    cookiesArr = _0x42efx4e;
  }
}
function toFirst(_0x42efx4e, _0x42efx53) {
  if (_0x42efx53 != 0) {
    _0x42efx4e.unshift(_0x42efx4e.splice(_0x42efx53, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x42efx4c = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x42efx4c.join("&") + "\n");
  let _0x42efx4e = [];
  let _0x42efx55 = _0x42efx4c;
  for (let _0x42efx13 in cookiesArr) {
    let _0x42efx50 = decodeURIComponent(cookiesArr[_0x42efx13].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x42efx13].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x42efx55.includes(_0x42efx50)) {
      _0x42efx4e.push(cookiesArr[_0x42efx13]);
    }
  }
  helpCookiesArr = _0x42efx4e;
  if (_0x42efx55.length > 1) {
    for (let _0x42efx19 in _0x42efx55) {
      let _0x42efx56 = _0x42efx55[_0x42efx55.length - 1 - _0x42efx19];
      if (!_0x42efx56) {
        continue;
      }
      for (let _0x42efx13 in helpCookiesArr) {
        let _0x42efx50 = decodeURIComponent(helpCookiesArr[_0x42efx13].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x42efx13].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x42efx56 == _0x42efx50) {
          toFirst(helpCookiesArr, _0x42efx13);
        }
      }
    }
  }
}