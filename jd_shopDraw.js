/*
店铺左侧刮刮乐

店铺抽奖 左侧

也可点击顶部【精选】后面的【活动】选项，找到抽奖活动

变量：//https://shop.m.jd.com/shop/lottery?shopId=10210112&venderId=10356746
必须有venderId= 参数
//export jd_shopDraw_activityUrl="" //活动链接

cron:11 11 11 11 **
============Quantumultx===============
[task_local]
#店铺左侧刮刮乐
11 11 11 11 ** jd_shopDraw.js, tag=店铺刮刮乐, enabled=true
 */

const Env=require('./utils/Env.js');
const $ = new Env('店铺左侧刮刮乐');
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xda14x2d => {
    cookiesArr.push(jdCookieNode[_0xda14x2d]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0xda14x2f => {
    return _0xda14x2f.cookie;
  })].filter(_0xda14x2e => {
    return !!_0xda14x2e;
  });
}
venderId = "";
let activityUrl = process.env.jd_shopDraw_activityUrl ? process.env.jd_shopDraw_activityUrl : "";
let allMessage = "";
const JD_API_HOST = "https://api.m.jd.com/client.action";
if (activityUrl) {
  if (activityUrl.includes("venderId")) {
    venderId = getQueryString("" + activityUrl, "venderId");
  } else {
    $.log("链接无效~");
  }
  $.domain = activityUrl.match(/https?:\/\/([^\/]+)/)[1];
}
!(async () => {
  if (!venderId) {
    $.log("活动id不存在");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：" + activityUrl);
  for (let _0xda14x40 = 0; _0xda14x40 < cookiesArr.length; _0xda14x40++) {
    if (cookiesArr[_0xda14x40]) {
      cookie = cookiesArr[_0xda14x40];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xda14x40 + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await main();
    }
  }
  if (allMessage) {
    if ($.isNode()) {
      await notify.sendNotify("" + $.name, "" + allMessage);
    }
    $.msg($.name, "", allMessage);
  }
})().catch(_0xda14x33 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xda14x33 + "!", "");
}).finally(() => {
  $.done();
});
async function main() {
  await getSignInfo();
  await $.wait(500);
  if ($.index == 1) {
    await signActivityRule();
  }
  await $.wait(500);
  if ($.isSign != 2) {
    await drawsign();
  } else {
    $.log("已经参与过活动~");
  }
}
async function getSignInfo() {
  let _0xda14x53 = {
    "url": JD_API_HOST + "?functionId=getSignInfo",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + Signz
  };
  return new Promise(_0xda14x54 => {
    $.post(_0xda14x53, (_0xda14x5f, _0xda14x60, _0xda14x61) => {
      try {
        if (_0xda14x5f) {
          $.log(_0xda14x5f);
        } else {
          _0xda14x61 = JSON.parse(_0xda14x61);
          if (typeof _0xda14x61 == "object") {
            if (_0xda14x61.code == 0) {
              $.isSign = _0xda14x61.result.signInfo.isSign;
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0x23ac0a) {
        $.log(_0x23ac0a);
      } finally {
        _0xda14x54();
      }
    });
  });
}
async function signActivityRule() {
  let _0xda14x71 = {
    "url": JD_API_HOST + "?functionId=signActivityRule",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + Signz
  };
  return new Promise(_0xda14x72 => {
    $.post(_0xda14x71, (_0xda14x73, _0xda14x74, _0xda14x75) => {
      try {
        if (_0xda14x73) {
          $.log(_0xda14x73);
        } else {
          _0xda14x75 = JSON.parse(_0xda14x75);
          if (typeof _0xda14x75 == "object") {
            if (_0xda14x75.code == 0) {
              $.log("活动规则：" + JSON.stringify(_0xda14x75.result.activityDescription));
              $.log("活动奖品：" + JSON.stringify(_0xda14x75.result.awardDescription) + "\n");
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0x614074) {
        $.log(_0x614074);
      } finally {
        _0xda14x72();
      }
    });
  });
}
async function drawsign() {
  let _0xda14x8b = {
    "url": JD_API_HOST + "?functionId=sign",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + Signz
  };
  return new Promise(_0xda14x8c => {
    $.post(_0xda14x8b, (_0xda14x90, _0xda14x91, _0xda14x92) => {
      try {
        if (_0xda14x90) {
          $.log(_0xda14x90);
        } else {
          _0xda14x92 = JSON.parse(_0xda14x92);
          if (typeof _0xda14x92 == "object") {
            if (_0xda14x92.code == 0) {
              if (_0xda14x92.result.isWin) {
                $.Prize = _0xda14x92.result.signReward.name || "";
                $.log("抽奖结果：" + JSON.stringify($.Prize));
              } else {
                $.log("💨  空气");
              }
            }
          } else {
            $.log("京东返回了空数据");
          }
        }
      } catch (_0x448554) {
        $.log(_0x448554);
      } finally {
        _0xda14x8c();
      }
    });
  });
}
function getSign(_0xda14x9b, _0xda14x9c) {
  let _0xda14xa8 = {
    "fn": _0xda14x9b,
    "body": JSON.stringify(_0xda14x9c)
  };
  let _0xda14xa9 = {
    "url": "http://api.nolanstore.top/sign",
    "body": JSON.stringify(_0xda14xa8),
    "headers": {
      "Content-Type": "application/json"
    },
    "timeout": 30000
  };
  return new Promise(async _0xda14xaa => {
    $.post(_0xda14xa9, (_0xda14xba, _0xda14xbb, _0xda14xa8) => {
      try {
        if (_0xda14xba) {
          console.log("" + JSON.stringify(_0xda14xba));
          console.log($.name + " getSign API请求失败，请检查网路重试");
        } else {
          _0xda14xa8 = JSON.parse(_0xda14xa8);
          if (typeof _0xda14xa8 === "object" && _0xda14xa8 && _0xda14xa8.body) {
            if (_0xda14xa8.body) {
              Signz = _0xda14xa8.body || "";
            }
          } else {
            console.log("");
          }
        }
      } catch (_0x550f87) {
        $.logErr(_0x550f87, _0xda14xbb);
      } finally {
        _0xda14xaa(_0xda14xa8);
      }
    });
  });
}
function jsonParse(_0xda14xc0) {
  if (typeof _0xda14xc0 == "string") {
    try {
      return JSON.parse(_0xda14xc0);
    } catch (_0x4dcac5) {
      console.log(_0x4dcac5);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function getQueryString(_0xda14xc9, _0xda14xca) {
  let _0xda14xd5 = new RegExp("(^|[&?])" + _0xda14xca + "=([^&]*)(&|$)");
  let _0xda14xd6 = _0xda14xc9.match(_0xda14xd5);
  if (_0xda14xd6 != null) {
    return unescape(_0xda14xd6[2]);
  }
  return "";
}
	