/*
LZ让福袋飞通用活动

会自动开卡店铺会员

请求太频繁会被黑ip

变量：
//export jd_wxUnPackingActivity_activityId="活动ID"
//export jd_wxUnPackingActivity_blacklist='' // 黑名单 用&隔开 pin值
//export JD_LZ_OPEN="false" //关闭LZ相关活动运行
活动网址：
//https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId=<活动id>

cron:6 6 6 6 *
============Quantumultx===============
[task_local]
#LZ让福袋飞通用活动
6 6 6 6 * jd_wxUnPackingActivity.js, tag=LZ让福袋飞通用活动, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('LZ让福袋飞');

const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
const getToken = require("./function/krgetToken");
let domains = "lzkjdz-isv.isvjcloud.com";
let lz_cookie = {};
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x12d1x8 => {
    cookiesArr.push(jdCookieNode[_0x12d1x8]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x12d1x8 => {
    return _0x12d1x8.cookie;
  })].filter(_0x12d1x8 => {
    return !!_0x12d1x8;
  });
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "";
let activityCookie = "";
let jd_wxUnPackingActivity_activityId = "";
jd_wxUnPackingActivity_activityId = $.isNode() ? process.env.jd_wxUnPackingActivity_activityId ? process.env.jd_wxUnPackingActivity_activityId : `${""}${jd_wxUnPackingActivity_activityId}${""}` : $.getdata("jd_wxUnPackingActivity_activityId") ? $.getdata("jd_wxUnPackingActivity_activityId") : `${""}${jd_wxUnPackingActivity_activityId}${""}`;
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_wxUnPackingActivity_whitelist || whitelist;
$.blacklist = process.env.jd_wxUnPackingActivity_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = jd_wxUnPackingActivity_activityId;
  $.shareUuid = "";
  console.log("活动入口: https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId=" + $.activityId);
  for (let _0x12d1x11 = 0; _0x12d1x11 < cookiesArr.length; _0x12d1x11++) {
    cookie = cookiesArr[_0x12d1x11];
    originCookie = cookiesArr[_0x12d1x11];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x12d1x11 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(1000);
      if (_0x12d1x11 == 0 && !$.actorUuid) {
        break;
      }
      if ($.outFlag || $.activityEnd) {
        break;
      }
      if ($.hasEnd) {
        break;
      }
    }
  }
  if ($.outFlag) {
    let _0x12d1x12 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, `${""}`, `${""}${_0x12d1x12}${""}`);
    if ($.isNode()) {
      await notify.sendNotify(`${""}${$.name}${""}`, `${""}${_0x12d1x12}${""}`);
    }
  }
  if (allMessage) {
    $.msg($.name, `${""}`, `${""}${allMessage}${""}`);
  }
})().catch(_0x12d1x10 => {
  return $.logErr(_0x12d1x10);
}).finally(() => {
  return $.done();
});
async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log(`${"获取cookie失败"}`);
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await takePostRequest("getSimpleActInfoVo");
    await $.wait(1000);
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await $.wait(1000);
    await takePostRequest("getActMemberInfo");
    if (!$.openCard) {
      $.shopactivityId = "";
      $.joinVenderId = $.venderId;
      await getshopactivityId();
      for (let _0x12d1x11 = 0; _0x12d1x11 < Array(5).length; _0x12d1x11++) {
        if (_0x12d1x11 > 0) {
          console.log(`${"第"}${_0x12d1x11}${"次 重新开卡"}`);
        }
        await joinShop();
        await $.wait(500);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
          break;
        }
      }
    }
    await takePostRequest("getUserInfo");
    await $.wait(1000);
    await takePostRequest("activityContent");
    await takePostRequest("shopInfo");
    await $.wait(1000);
    if ($.index == 1) {
      console.log(`${"活动获取成功，助力码："}${$.actorUuid}${""}`);
      console.log(`${"活动店铺："}${$.shopName}${""}`);
      console.log(`${"开始时间："}${$.startTime}${""}`);
      console.log(`${"结束时间："}${$.endTime}${""}`);
      console.log(`${"助力次数："}${$.unpackingPeople}${""}`);
      console.log(`${"已有助力："}${$.hasUnpackingPeople}${""}`);
      console.log(`${"还需助力："}${$.needUnpackingPeople}${""}`);
    }
    if ($.index != 1) {
      await takePostRequest("getMyFriendInfo");
      await $.wait(1000);
      await takePostRequest("unpackingInfo");
      await takePostRequest("unPacking");
      if ($.activityEnd) {
        return;
      }
      console.log($.helpStatus == 1 ? "助力成功" : $.helpStatus == 3 ? "已助力他人" : $.helpStatus == 2 ? "已助力" : "其他情况" + $.helpStatus);
    }
    if ($.index == 1) {
      $.helpCount = $.hasUnpackingPeople;
    } else {
      if ($.helpStatus == 1) {
        $.helpCount++;
      }
    }
    console.log(`${"【账号"}${$.index}${"】已有助力："}${$.hasUnpackingPeople}${""}${$.index != 1 && " 【账号1】已有助力：" + $.helpCount || ""}${""}`);
    if ($.helpCount >= $.unpackingPeople) {
      $.hasEnd = true;
    }
    if ($.hotFlag) {
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log("\n全部助力 => " + $.shareUuid);
    }
    if ($.index % 3 == 0) {
      await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
    }
  } catch (e) {
    console.log(e);
  }
}
async function takePostRequest(_0x12d1x16) {
  if ($.outFlag) {
    return;
  }
  let _0x12d1x17 = "https://lzkjdz-isv.isvjcloud.com";
  let _0x12d1x18 = `${""}`;
  let _0x12d1x19 = "POST";
  switch (_0x12d1x16) {
    case "isvObfuscator":
      url = `${"https://api.m.jd.com/client.action?functionId=isvObfuscator"}`;
      _0x12d1x18 = `${"body=%7B%22url%22%3A%20%22https%3A//lzkj-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=hjudwgohxzVu96krv&client=apple&clientVersion=9.4.0&st=1620476162000&sv=111&sign=f9d1b7e3b943b6a136d54fe4f892af05"}`;
      break;
    case "getMyPing":
      url = `${""}${_0x12d1x17}${"/customer/getMyPing"}`;
      _0x12d1x18 = `${"token="}${$.Token}${"&fromType=APP&userId="}${$.venderId}${""}`;
      break;
    case "shopInfo":
      url = `${""}${_0x12d1x17}${"/wxUnPackingActivity/shopInfo"}`;
      _0x12d1x18 = `${"activityId="}${$.activityId}${""}`;
      break;
    case "getSimpleActInfoVo":
      url = `${""}${_0x12d1x17}${"/customer/getSimpleActInfoVo"}`;
      _0x12d1x18 = `${"activityId="}${$.activityId}${""}`;
      break;
    case "getActMemberInfo":
      url = `${""}${_0x12d1x17}${"/wxCommonInfo/getActMemberInfo"}`;
      _0x12d1x18 = `${"venderId="}${$.venderId}${"&activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    case "accessLogWithAD":
      url = `${""}${_0x12d1x17}${"/common/accessLogWithAD"}`;
      let _0x12d1x1b = `${"https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId="}${$.activityId}${"&friendUuid="}${$.shareUuid}${""}`;
      _0x12d1x18 = `${"venderId="}${$.venderId}${"&code="}${$.activityType}${"&pin="}${encodeURIComponent($.Pin)}${"&activityId="}${$.activityId}${"&pageUrl="}${encodeURIComponent(_0x12d1x1b)}${"&subType=app&adSource="}`;
      break;
    case "getUserInfo":
      url = `${""}${_0x12d1x17}${"/wxActionCommon/getUserInfo"}`;
      _0x12d1x18 = `${"pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    case "getMyFriendInfo":
      url = `${""}${_0x12d1x17}${"/wxUnPackingActivity/getMyFriendInfo"}`;
      _0x12d1x18 = `${"friendUuid="}${$.shareUuid}${""}`;
      break;
    case "activityContent":
      url = `${""}${_0x12d1x17}${"/wxUnPackingActivity/activityContent"}`;
      _0x12d1x18 = `${"activityId="}${$.activityId}${"&buyerNick="}${encodeURIComponent($.Pin)}${"&friendUuid="}${$.shareUuid}${""}`;
      break;
    case "unpackingInfo":
      url = `${""}${_0x12d1x17}${"/wxUnPackingActivity/unpackingInfo"}`;
      _0x12d1x18 = `${"activityId="}${$.activityId}${"&friendUuid="}${$.shareUuid}${"&mySelfUuid="}${$.actorUuid}${""}`;
      break;
    case "unPacking":
      url = `${""}${_0x12d1x17}${"/wxUnPackingActivity/unPacking"}`;
      _0x12d1x18 = `${"activityId="}${$.activityId}${"&friendUuid="}${$.shareUuid}${"&mySelfId="}${$.actorUuid}${""}`;
      break;
    case "getPrize":
      url = `${""}${_0x12d1x17}${"/wxUnPackingActivity/getPrize"}`;
      _0x12d1x18 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    default:
      console.log(`${"错误"}${_0x12d1x16}${""}`);
  }
  let _0x12d1x1c = getPostRequest(url, _0x12d1x18, _0x12d1x19);
  return new Promise(async _0x12d1x1d => {
    $.post(_0x12d1x1c, (_0x12d1x1e, _0x12d1x1f, _0x12d1x20) => {
      try {
        setActivityCookie(_0x12d1x1f);
        if (_0x12d1x1e) {
          if (_0x12d1x1f && typeof _0x12d1x1f.statusCode != "undefined") {
            if (_0x12d1x1f.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.toStr(_0x12d1x1e, _0x12d1x1e)}${""}`);
          console.log(`${""}${_0x12d1x16}${" API请求失败，请检查网路重试"}`);
        } else {
          dealReturn(_0x12d1x16, _0x12d1x20);
        }
      } catch (e) {
        console.log(e, _0x12d1x1f);
      } finally {
        _0x12d1x1d();
      }
    });
  });
}
async function dealReturn(_0x12d1x16, _0x12d1x20) {
  let _0x12d1x22 = "";
  try {
    if (_0x12d1x16 != "accessLogWithAD" || _0x12d1x16 != "drawContent") {
      if (_0x12d1x20) {
        _0x12d1x22 = JSON.parse(_0x12d1x20);
      }
    }
  } catch (e) {
    console.log(`${""}${_0x12d1x16}${" 执行任务异常"}`);
    console.log(_0x12d1x20);
    $.runFalag = false;
  }
  try {
    switch (_0x12d1x16) {
      case "isvObfuscator":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.errcode == 0) {
            if (typeof _0x12d1x22.token != "undefined") {
              $.Token = _0x12d1x22.token;
            }
          } else {
            if (_0x12d1x22.message) {
              console.log(`${"isvObfuscator "}${_0x12d1x22.message || ""}${""}`);
            } else {
              console.log(_0x12d1x20);
            }
          }
        } else {
          console.log(_0x12d1x20);
        }
        break;
      case "getMyPing":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            if (_0x12d1x22.data && typeof _0x12d1x22.data.secretPin != "undefined") {
              $.Pin = _0x12d1x22.data.secretPin;
            }
            if (_0x12d1x22.data && typeof _0x12d1x22.data.nickname != "undefined") {
              $.nickname = _0x12d1x22.data.nickname;
            }
          } else {
            if (_0x12d1x22.errorMessage) {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
            }
          }
        } else {}
        break;
      case "shopInfo":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            $.shopName = _0x12d1x22.data.shopName || "";
          } else {
            if (_0x12d1x22.errorMessage) {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
        }
        break;
      case "getSimpleActInfoVo":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            if (typeof _0x12d1x22.data.shopId != "undefined") {
              $.shopId = _0x12d1x22.data.shopId;
            }
            if (typeof _0x12d1x22.data.venderId != "undefined") {
              $.venderId = _0x12d1x22.data.venderId;
            }
            $.activityType = _0x12d1x22.data.activityType;
          } else {
            if (_0x12d1x22.errorMessage) {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
            }
          }
        } else {}
        break;
      case "getUserInfo":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            $.pinImg = _0x12d1x22.data.yunMidImageUrl || "";
            $.jdNick = _0x12d1x22.data.nickname || "";
          } else {
            if (_0x12d1x22.errorMessage) {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
        }
        break;
      case "activityContent":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            $.actorUuid = _0x12d1x22.data.wucvo.mySelfId || "";
            $.unpackingPeople = _0x12d1x22.data.wucvo.unpackingPeople || 0;
            $.collectionCondition = _0x12d1x22.data.wucvo.collectionCondition || true;
            $.startTime = _0x12d1x22.data.wucvo.startTime || "";
            $.endTime = _0x12d1x22.data.wucvo.endTime || "";
            $.hasUnpackingPeople = _0x12d1x22.data.wuivo.hasUnpackingPeople || 0;
            $.needUnpackingPeople = _0x12d1x22.data.wuivo.needUnpackingPeople || 0;
            $.jpname = _0x12d1x22.data.wdifo.name || "";
          } else {
            if (_0x12d1x22.errorMessage) {
              if (_0x12d1x22.errorMessage.indexOf("结束") > -1) {
                $.activityEnd = true;
              }
              console.log(`${""}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x20}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x12d1x20}${""}`);
        }
        break;
      case "getMyFriendInfo":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            console.log(`${"准备助力 => "}${_0x12d1x22.data.nickname || ""}${""}`);
          } else {
            if (_0x12d1x22.errorMessage) {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
        }
        break;
      case "unpackingInfo":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            $.helpStatus = _0x12d1x22.data.shareStatus || 0;
          } else {
            if (_0x12d1x22.errorMessage) {
              console.log(`${" "}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x20}${""}`);
            }
          }
        } else {}
        break;
      case "unPacking":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            console.log(`${" "}${_0x12d1x22.errorMessage || ""}${""}`);
          } else {
            if (_0x12d1x22.errorMessage) {
              if (_0x12d1x22.errorMessage.indexOf("结束") > -1) {
                $.activityEnd = true;
              }
              console.log(`${""}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x20}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
        }
        break;
      case "drawContent":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            $.content = _0x12d1x22.data.content || [];
          } else {
            if (_0x12d1x22.errorMessage) {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
        }
        break;
      case "getActMemberInfo":
        if (typeof _0x12d1x22 == "object") {
          if (_0x12d1x22.result && _0x12d1x22.result === true) {
            $.openCard = _0x12d1x22.data.openCard || false;
          } else {
            if (_0x12d1x22.errorMessage) {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x22.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x12d1x16}${" "}${_0x12d1x20}${""}`);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(`${""}${_0x12d1x16}${"-> "}${_0x12d1x20}${""}`);
    }
    if (typeof _0x12d1x22 == "object") {
      if (_0x12d1x22.errorMessage) {
        if (_0x12d1x22.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}
function getPostRequest(_0x12d1x24, _0x12d1x18, _0x12d1x19 = "POST") {
  let _0x12d1x25 = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x12d1x24.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1) {
    _0x12d1x25.Origin = `${"https://lzkjdz-isv.isvjcloud.com"}`;
    _0x12d1x25.Referer = `${"https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId="}${$.activityId}${"&friendUuid="}${$.shareUuid}${""}`;
    _0x12d1x25.Cookie = `${""}${lz_jdpin_token_cookie && lz_jdpin_token_cookie || ""}${""}${$.Pin && "AUTH_C_USER=" + $.Pin + ";" || ""}${""}${activityCookie}${""}`;
  }
  return {
    url: _0x12d1x24,
    method: _0x12d1x19,
    headers: _0x12d1x25,
    body: _0x12d1x18,
    timeout: 30000
  };
}
function getCk() {
  return new Promise(_0x12d1x1d => {
    let _0x12d1x27 = {
      url: `${"https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token"}`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": `${"https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId="}${$.activityId}${""}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0x12d1x27, async (_0x12d1x1e, _0x12d1x1f, _0x12d1x20) => {
      try {
        if (_0x12d1x1e) {
          if (_0x12d1x1f && typeof _0x12d1x1f.statusCode != "undefined") {
            if (_0x12d1x1f.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.toStr(_0x12d1x1e)}${""}`);
          console.log(`${""}${$.name}${" cookie API请求失败，请检查网路重试"}`);
        } else {
          let _0x12d1x28 = _0x12d1x20.match(/(活动已经结束)/) && _0x12d1x20.match(/(活动已经结束)/)[1] || "";
          if (_0x12d1x28) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          setActivityCookie(_0x12d1x1f);
        }
      } catch (e) {
        $.logErr(e, _0x12d1x1f);
      } finally {
        _0x12d1x1d();
      }
    });
  });
}
function setActivityCookie(_0x12d1x1f) {
  if (_0x12d1x1f) {
    if (_0x12d1x1f.headers["set-cookie"]) {
      cookie = `${""}${originCookie}${";"}`;
      for (let _0x12d1x2a of _0x12d1x1f.headers["set-cookie"]) {
        lz_cookie[_0x12d1x2a.split(";")[0].substr(0, _0x12d1x2a.split(";")[0].indexOf("="))] = _0x12d1x2a.split(";")[0].substr(_0x12d1x2a.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x12d1x2b of Object.keys(lz_cookie)) {
        cookie += _0x12d1x2b + "=" + lz_cookie[_0x12d1x2b] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = `${"jdapp;iPhone;10.1.4;13.1.2;"}${randomString(40)}${";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"}`;
}
function randomString(_0x12d1x10) {
  _0x12d1x10 = _0x12d1x10 || 32;
  let _0x12d1x2e = "abcdef0123456789",
    _0x12d1x2f = _0x12d1x2e.length,
    _0x12d1x30 = "";
  for (i = 0; i < _0x12d1x10; i++) {
    _0x12d1x30 += _0x12d1x2e.charAt(Math.floor(Math.random() * _0x12d1x2f));
  }
  return _0x12d1x30;
}
function getMaxMin(_0x12d1x32, _0x12d1x33) {
  if (_0x12d1x33 === "max") {
    return Math.max.apply(Math, _0x12d1x32);
  } else {
    if (_0x12d1x33 === "min") {
      return Math.min.apply(Math, _0x12d1x32);
    }
  }
}
function jsonParse(_0x12d1x35) {
  if (typeof _0x12d1x35 == "string") {
    try {
      return JSON.parse(_0x12d1x35);
    } catch (e) {
      console.log(e);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x12d1x1d => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x12d1x37 = `${""}`;
    if ($.shopactivityId) {
      _0x12d1x37 = `${",\"activityId\":"}${$.shopactivityId}${""}`;
    }
    const _0x12d1x38 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"shopId\":\""}${$.joinVenderId}${"\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0"}${_0x12d1x37}${",\"channel\":406}"}`;
    const _0x12d1x39 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x12d1x38)
    };
    const _0x12d1x3a = await getH5st("8adfb", _0x12d1x39);
    const _0x12d1x3b = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body="}${_0x12d1x38}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x12d1x3a)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x12d1x3b, async (_0x12d1x1e, _0x12d1x1f, _0x12d1x20) => {
      try {
        _0x12d1x20 = _0x12d1x20 && _0x12d1x20.match(/jsonp_.*?\((.*?)\);/) && _0x12d1x20.match(/jsonp_.*?\((.*?)\);/)[1] || _0x12d1x20;
        let _0x12d1x22 = $.toObj(_0x12d1x20, _0x12d1x20);
        if (_0x12d1x22 && typeof _0x12d1x22 == "object") {
          if (_0x12d1x22 && _0x12d1x22.success === true) {
            console.log(`${" >> "}${_0x12d1x22.message}${""}`);
            $.errorJoinShop = _0x12d1x22.message;
            if (_0x12d1x22.result && _0x12d1x22.result.giftInfo) {
              for (let _0x12d1x11 of _0x12d1x22.result.giftInfo.giftList) {
                console.log(`${" >> 入会获得："}${_0x12d1x11.discountString}${""}${_0x12d1x11.prizeName}${""}${_0x12d1x11.secondLineDesc}${""}`);
              }
            }
          } else {
            if (_0x12d1x22 && typeof _0x12d1x22 == "object" && _0x12d1x22.message) {
              $.errorJoinShop = _0x12d1x22.message;
              console.log(`${""}${_0x12d1x22.message || ""}${""}`);
            } else {
              console.log(_0x12d1x20);
            }
          }
        } else {
          console.log(_0x12d1x20);
        }
      } catch (e) {
        $.logErr(e, _0x12d1x1f);
      } finally {
        _0x12d1x1d();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x12d1x1d => {
    const _0x12d1x38 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"channel\":406,\"payUpShop\":true}"}`;
    const _0x12d1x39 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x12d1x38)
    };
    const _0x12d1x3a = await getH5st("8adfb", _0x12d1x39);
    const _0x12d1x3b = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body="}${_0x12d1x38}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x12d1x3a)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x12d1x3b, async (_0x12d1x1e, _0x12d1x1f, _0x12d1x20) => {
      try {
        _0x12d1x20 = _0x12d1x20 && _0x12d1x20.match(/jsonp_.*?\((.*?)\);/) && _0x12d1x20.match(/jsonp_.*?\((.*?)\);/)[1] || _0x12d1x20;
        let _0x12d1x22 = $.toObj(_0x12d1x20, _0x12d1x20);
        if (_0x12d1x22 && typeof _0x12d1x22 == "object") {
          if (_0x12d1x22 && _0x12d1x22.success == true) {
            console.log(`${"去加入："}${_0x12d1x22.result.shopMemberCardInfo.venderCardName || ""}${" ("}${$.joinVenderId}${")"}`);
            $.shopactivityId = _0x12d1x22.result.interestsRuleList && _0x12d1x22.result.interestsRuleList[0] && _0x12d1x22.result.interestsRuleList[0].interestsInfo && _0x12d1x22.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else {
          console.log(_0x12d1x20);
        }
      } catch (e) {
        $.logErr(e, _0x12d1x1f);
      } finally {
        _0x12d1x1d();
      }
    });
  });
}
function getH5st(_0x12d1x3e, _0x12d1x39) {
  return new Promise(async _0x12d1x1d => {
    let _0x12d1x3b = {
      url: `${"http://api.kingran.cf/h5st"}`,
      body: `${"businessId="}${_0x12d1x3e}${"&req="}${encodeURIComponent(JSON.stringify(_0x12d1x39))}${""}`,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      timeout: 30 * 1000
    };
    $.post(_0x12d1x3b, (_0x12d1x1e, _0x12d1x1f, _0x12d1x20) => {
      try {
        if (_0x12d1x1e) {
          console.log(JSON.stringify(_0x12d1x1e));
          console.log(`${""}${$.name}${" getSign API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x12d1x1f);
      } finally {
        _0x12d1x1d(_0x12d1x20);
      }
    });
  });
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x12d1x40 = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x12d1x40.join("&") + "\n");
  let _0x12d1x41 = _0x12d1x40;
  let _0x12d1x32 = [];
  let _0x12d1x42 = false;
  for (let _0x12d1x11 = 0; _0x12d1x11 < cookiesArr.length; _0x12d1x11++) {
    let _0x12d1x43 = decodeURIComponent(cookiesArr[_0x12d1x11].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x12d1x11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x12d1x43) {
      break;
    }
    let _0x12d1x44 = false;
    for (let _0x12d1x30 of _0x12d1x41) {
      if (_0x12d1x30 && _0x12d1x30 == _0x12d1x43) {
        _0x12d1x44 = true;
        break;
      }
    }
    if (!_0x12d1x44) {
      _0x12d1x42 = true;
      _0x12d1x32.splice(_0x12d1x11, -1, cookiesArr[_0x12d1x11]);
    }
  }
  if (_0x12d1x42) {
    cookiesArr = _0x12d1x32;
  }
}
function toFirst(_0x12d1x32, _0x12d1x46) {
  if (_0x12d1x46 != 0) {
    _0x12d1x32.unshift(_0x12d1x32.splice(_0x12d1x46, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x12d1x40 = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x12d1x40.join("&") + "\n");
  let _0x12d1x32 = [];
  let _0x12d1x48 = _0x12d1x40;
  for (let _0x12d1x11 in cookiesArr) {
    let _0x12d1x43 = decodeURIComponent(cookiesArr[_0x12d1x11].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x12d1x11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x12d1x48.includes(_0x12d1x43)) {
      _0x12d1x32.push(cookiesArr[_0x12d1x11]);
    }
  }
  helpCookiesArr = _0x12d1x32;
  if (_0x12d1x48.length > 1) {
    for (let _0x12d1x30 in _0x12d1x48) {
      let _0x12d1x49 = _0x12d1x48[_0x12d1x48.length - 1 - _0x12d1x30];
      if (!_0x12d1x49) {
        continue;
      }
      for (let _0x12d1x11 in helpCookiesArr) {
        let _0x12d1x43 = decodeURIComponent(helpCookiesArr[_0x12d1x11].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x12d1x11].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x12d1x49 == _0x12d1x43) {
          toFirst(helpCookiesArr, _0x12d1x11);
        }
      }
    }
  }
}
	