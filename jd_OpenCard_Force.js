/*
入会开卡领取礼包(通用)

VENDER_ID // venderId或vendorId的值，多个用&、@或逗号连接，但是不要混用
OPENCARD_BEAN=""  最小入会值 （默认10）
OPENCARD_QZ="true"  填写此变量强制开卡，不填写不开启

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#入会开卡领取礼包(通用)
11 11 11 11 * jd_OpenCard_Force.js, tag=入会开卡领取礼包(通用), enabled=true


*/

const Env=require('./utils/Env.js');
const $ = new Env('入会开卡领取礼包');

const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const getH5st = require("./function/krh5st");
const OPENCARD_BEAN = process.env.OPENCARD_BEAN || "10";
const OPENCARD_QZ = process.env.OPENCARD_QZ === "true" ? true : false;
let VENDER_IDs = [];
if (process.env.VENDER_ID) {
  if (process.env.VENDER_ID.indexOf("&") > -1) {
    VENDER_IDs = process.env.VENDER_ID.split("&");
  } else {
    if (process.env.VENDER_ID.indexOf("@") > -1) {
      VENDER_IDs = process.env.VENDER_ID.split("@");
    } else {
      if (process.env.VENDER_ID.indexOf(",") > -1) {
        VENDER_IDs = process.env.VENDER_ID.split(",");
      } else {
        VENDER_IDs = [process.env.VENDER_ID];
      }
    }
  }
}
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xfea8x31 => {
    cookiesArr.push(jdCookieNode[_0xfea8x31]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0xfea8x33 => {
    return _0xfea8x33.cookie;
  })].filter(_0xfea8x32 => {
    return !!_0xfea8x32;
  });
}
allMessage = "";
message = "";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  console.log("\n当前最低入会标准：" + OPENCARD_BEAN + "豆");
  console.log("\n当前强制入会是否开启：" + OPENCARD_QZ);
  for (let _0xfea8x44 = 0; _0xfea8x44 < cookiesArr.length; _0xfea8x44++) {
    cookie = cookiesArr[_0xfea8x44];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xfea8x44 + 1;
      message = "";
      $.nickName = "";
      $.UserName = $.nickName || $.UserName;
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      await getUA();
      await run();
      await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
    }
  }
  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(_0xfea8x34 => {
  return $.logErr(_0xfea8x34);
}).finally(() => {
  return $.done();
});
async function run() {
  try {
    const _0xfea8x59 = VENDER_IDs;
    for (let _0xfea8x5a = 0; _0xfea8x5a < _0xfea8x59.length; _0xfea8x5a++) {
      $.joinVenderId = _0xfea8x59[_0xfea8x5a];
      $.errorJoinShop = "";
      await joinShop();
      if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) {
        return;
      }
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("😤 呜呜呜，重试开卡");
        await $.wait(1000);
        await joinShop();
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 无法开卡,跳过运行");
        return;
      }
    }
  } catch (_0x2b683a) {
    console.log(_0x2b683a);
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(_0xfea8x62) {
  _0xfea8x62 = _0xfea8x62 || 32;
  let _0xfea8x68 = "abcdef0123456789",
    _0xfea8x69 = _0xfea8x68.length,
    _0xfea8x6a = "";
  for (i = 0; i < _0xfea8x62; i++) {
    _0xfea8x6a += _0xfea8x68.charAt(Math.floor(Math.random() * _0xfea8x69));
  }
  return _0xfea8x6a;
}
function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0xfea8x87 => {
    $.shopactivityId = "";
    $.errorJoinShop = "";
    $.openCardStatus = false;
    $.openCardBean = 0;
    await getshopactivityId();
    let _0xfea8x97 = "";
    if ($.shopactivityId) {
      _0xfea8x97 = ",\"activityId\":" + $.shopactivityId;
    }
    if ($.openCardStatus) {
      console.log("已经是会员了~");
      _0xfea8x87();
    } else {
      if (!OPENCARD_QZ) {
        if ($.openCardBean === 0) {
          console.log("查询该店入会没有送豆，不入会");
          _0xfea8x87();
        } else {
          if ($.openCardBean < OPENCARD_BEAN) {
            console.log("入会送【" + $.openCardBean + "】豆少于【" + OPENCARD_BEAN + "豆】，不入...");
            _0xfea8x87();
          } else {
            const _0xfea8x98 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0xfea8x97 + ",\"channel\":406}";
            const _0xfea8x99 = {
              "appid": "jd_shop_member",
              "functionId": "bindWithVender",
              "clientVersion": "9.2.0",
              "client": "H5",
              "body": JSON.parse(_0xfea8x98)
            };
            const _0xfea8x9a = await getH5st("8adfb", _0xfea8x99);
            const _0xfea8x9b = {
              "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + encodeURIComponent(_0xfea8x98) + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0xfea8x9a),
              "headers": {
                "Content-Type": "text/plain; Charset=UTF-8",
                "Origin": "https://api.m.jd.com",
                "Host": "api.m.jd.com",
                "accept": "*/*",
                "User-Agent": $.UA,
                "content-type": "application/x-www-form-urlencoded",
                "Cookie": cookie
              }
            };
            $.get(_0xfea8x9b, async (_0xfea8x9c, _0xfea8x9d, _0xfea8x9e) => {
              try {
                if (_0xfea8x9c) {
                  if (_0xfea8x9d && typeof _0xfea8x9d.statusCode != "undefined") {
                    if (_0xfea8x9d.statusCode == 403) {
                      console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
                      $.outFlag = true;
                    }
                  }
                } else {
                  let _0xfea8xa4 = $.toObj(_0xfea8x9e, _0xfea8x9e);
                  if (typeof _0xfea8xa4 == "object") {
                    if (_0xfea8xa4.success === true) {
                      console.log(_0xfea8xa4.message);
                      $.errorJoinShop = _0xfea8xa4.message;
                      if (_0xfea8xa4.result && _0xfea8xa4.result.giftInfo) {
                        for (let _0xfea8xa6 of _0xfea8xa4.result.giftInfo.giftList) {
                          console.log("入会获得：" + _0xfea8xa6.discountString + _0xfea8xa6.prizeName + _0xfea8xa6.secondLineDesc);
                        }
                      }
                    } else {
                      if (typeof _0xfea8xa4 == "object" && _0xfea8xa4.message) {
                        $.errorJoinShop = _0xfea8xa4.message;
                        console.log("" + (_0xfea8xa4.message || ""));
                      } else {
                        console.log(_0xfea8x9e);
                      }
                    }
                  } else {
                    console.log(_0xfea8x9e);
                  }
                }
              } catch (_0x1357dd) {
                $.logErr(_0x1357dd, _0xfea8x9d);
              } finally {
                _0xfea8x87();
              }
            });
          }
        }
      } else {
        const _0xfea8xa7 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0xfea8x97 + ",\"channel\":406}";
        const _0xfea8x99 = {
          "appid": "jd_shop_member",
          "functionId": "bindWithVender",
          "clientVersion": "9.2.0",
          "client": "H5",
          "body": JSON.parse(_0xfea8xa7)
        };
        const _0xfea8x9a = await getH5st("8adfb", _0xfea8x99);
        const _0xfea8x9b = {
          "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + encodeURIComponent(_0xfea8xa7) + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0xfea8x9a),
          "headers": {
            "Content-Type": "text/plain; Charset=UTF-8",
            "Origin": "https://api.m.jd.com",
            "Host": "api.m.jd.com",
            "accept": "*/*",
            "User-Agent": $.UA,
            "content-type": "application/x-www-form-urlencoded",
            "Cookie": cookie
          }
        };
        $.get(_0xfea8x9b, async (_0xfea8xa8, _0xfea8xa9, _0xfea8xaa) => {
          try {
            if (_0xfea8xa8) {
              if (_0xfea8xa9 && typeof _0xfea8xa9.statusCode != "undefined") {
                if (_0xfea8xa9.statusCode == 403) {
                  console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
                  $.outFlag = true;
                }
              }
            } else {
              let _0xfea8xac = $.toObj(_0xfea8xaa, _0xfea8xaa);
              if (typeof _0xfea8xac == "object") {
                if (_0xfea8xac.success === true) {
                  console.log(_0xfea8xac.message);
                  $.errorJoinShop = _0xfea8xac.message;
                  if (_0xfea8xac.result && _0xfea8xac.result.giftInfo) {
                    for (let _0xfea8xad of _0xfea8xac.result.giftInfo.giftList) {
                      console.log("入会获得：" + _0xfea8xad.discountString + _0xfea8xad.prizeName + _0xfea8xad.secondLineDesc);
                    }
                  }
                } else {
                  if (typeof _0xfea8xac == "object" && _0xfea8xac.message) {
                    $.errorJoinShop = _0xfea8xac.message;
                    console.log("" + (_0xfea8xac.message || ""));
                  } else {
                    console.log(_0xfea8xaa);
                  }
                }
              } else {
                console.log(_0xfea8xaa);
              }
            }
          } catch (_0x22cd57) {
            $.logErr(_0x22cd57, _0xfea8xa9);
          } finally {
            _0xfea8x87();
          }
        });
      }
    }
  });
}
function getshopactivityId() {
  return new Promise(_0xfea8xb9 => {
    const _0xfea8xca = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22" + $.joinVenderId + "%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888",
      "headers": {
        "Content-Type": "text/plain; Charset=UTF-8",
        "Origin": "https://api.m.jd.com",
        "Host": "api.m.jd.com",
        "accept": "*/*",
        "User-Agent": $.UA,
        "content-type": "application/x-www-form-urlencoded",
        "Cookie": cookie
      }
    };
    $.get(_0xfea8xca, async (_0xfea8xcb, _0xfea8xcc, _0xfea8xcd) => {
      try {
        if (_0xfea8xcb) {
          if (_0xfea8xcc && typeof _0xfea8xcc.statusCode != "undefined") {
            if (_0xfea8xcc.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
              $.outFlag = true;
            }
          }
        } else {
          let _0xfea8xd1 = $.toObj(_0xfea8xcd, _0xfea8xcd);
          if (typeof _0xfea8xd1 == "object") {
            if (_0xfea8xd1.success == true) {
              console.log("会员卡名称：" + (_0xfea8xd1.result.shopMemberCardInfo.venderCardName || ""));
              $.shopactivityId = _0xfea8xd1.result.interestsRuleList && _0xfea8xd1.result.interestsRuleList[0] && _0xfea8xd1.result.interestsRuleList[0].interestsInfo && _0xfea8xd1.result.interestsRuleList[0].interestsInfo.activityId || "";
              $.openCardStatus = _0xfea8xd1.result.userInfo.openCardStatus;
              if (_0xfea8xd1.result.interestsRuleList && _0xfea8xd1.result.interestsRuleList.length) {
                for (let _0xfea8xd2 = 0; _0xfea8xd2 < _0xfea8xd1.result.interestsRuleList.length; _0xfea8xd2++) {
                  const _0xfea8xd3 = _0xfea8xd1.result.interestsRuleList[_0xfea8xd2];
                  if (_0xfea8xd3.prizeName) {
                    if (_0xfea8xd3.prizeName.includes("京豆") || _0xfea8xd3.prizeName.includes("红包")) {
                      $.openCardBean = parseInt(_0xfea8xd3.discountString);
                    }
                    break;
                  }
                }
              }
            }
          } else {
            console.log(_0xfea8xcd);
          }
        }
      } catch (_0x543d96) {
        $.logErr(_0x543d96, _0xfea8xcc);
      } finally {
        _0xfea8xb9();
      }
    });
  });
}
function jsonParse(_0xfea8xd5) {
  if (typeof _0xfea8xd5 == "string") {
    try {
      return JSON.parse(_0xfea8xd5);
    } catch (_0x5049cb) {
      console.log(_0x5049cb);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
	