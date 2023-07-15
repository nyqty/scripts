/*
购物车锦鲤通用活动

第一个CK失效会退出脚本

助力显示可能会有误差，以活动界面成功邀请人数为准

活动有BUG，直接加购不用助力也行。

请求太频繁会被黑ip

变量：
//export jd_wxCartKoi_activityId="活动ID"
//export JD_LZ_OPEN="false" //关闭LZ相关活动运行
//export jd_wxCartKoi_blacklist="" //黑名单 用&隔开 pin值
活动网址：
//https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId=xxxxxxx

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#购物车锦鲤通用活动
1 1 1 1 * jd_wxCartKoi.js, tag=购物车锦鲤通用活动, enabled=true

*/

const Env=require('./utils/Env.js');
const $ = new Env('购物车锦鲤通用活动');

const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
const getToken = require("./function/krgetToken");
let domains = "https://lzkjdz-isv.isvjcloud.com";
let lz_cookie = {};
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xdf2dx8 => {
    cookiesArr.push(jdCookieNode[_0xdf2dx8]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0xdf2dx8 => {
    return _0xdf2dx8.cookie;
  })].filter(_0xdf2dx8 => {
    return !!_0xdf2dx8;
  });
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "";
let activityCookie = "";
let jd_wxCartKoi_activityId = "";
jd_wxCartKoi_activityId = $.isNode() ? process.env.jd_wxCartKoi_activityId ? process.env.jd_wxCartKoi_activityId : `${""}${jd_wxCartKoi_activityId}${""}` : $.getdata("jd_wxCartKoi_activityId") ? $.getdata("jd_wxCartKoi_activityId") : `${""}${jd_wxCartKoi_activityId}${""}`;
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_wxCartKoi_whitelist || whitelist;
$.blacklist = process.env.jd_wxCartKoi_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!jd_wxCartKoi_activityId) {
    console.log("\n衰仔、请填写购物车锦鲤的活动ID,变量是jd_wxCartKoi_activityId\n");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = jd_wxCartKoi_activityId;
  $.shareUuid = "";
  console.log("入口:\nhttps://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId=" + $.activityId);
  for (let _0xdf2dx11 = 0; _0xdf2dx11 < cookiesArr.length; _0xdf2dx11++) {
    cookie = cookiesArr[_0xdf2dx11];
    originCookie = cookiesArr[_0xdf2dx11];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xdf2dx11 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      await getUA();
      await run();
      await $.wait(3000);
      if (_0xdf2dx11 == 0 && !$.actorUuid) {
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
  cookie = cookiesArr[0];
  if (cookie && $.assistStatus && !$.outFlag && !$.activityEnd) {
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.index = 1;
    message = "";
    $.bean = 0;
    $.hotFlag = false;
    $.nickName = "";
    console.log("\n\n开始开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "加购物车\n");
    await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    await getUA();
    await runs();
  }
  if ($.outFlag) {
    let _0xdf2dx12 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, `${""}`, `${""}${_0xdf2dx12}${""}`);
    if ($.isNode()) {
      await notify.sendNotify(`${""}${$.name}${""}`, `${""}${_0xdf2dx12}${""}`);
    }
  }
  if (allMessage) {
    $.msg($.name, `${""}`, `${""}${allMessage}${""}`);
  }
})().catch(_0xdf2dx10 => {
  return $.logErr(_0xdf2dx10);
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
      for (let _0xdf2dx11 = 0; _0xdf2dx11 < Array(5).length; _0xdf2dx11++) {
        if (_0xdf2dx11 > 0) {
          console.log(`${"第"}${_0xdf2dx11}${"次 重新开卡"}`);
        }
        await joinShop();
        await $.wait(500);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
          break;
        }
      }
    }
    await takePostRequest("getUserInfo");
    await takePostRequest("activityContent");
    await $.wait(1000);
    if ($.hotFlag) {
      return;
    }
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.index == 1) {
      console.log("活动获取成功，助力码：" + $.actorUuid + "\n");
      console.log("\n当前参加活动：" + $.activityName + "\n当前参与活动人数：" + $.joins + "\n活动抽奖时间：" + $.drawTime + "\n活动结束时间：" + $.cartEndTime + "\n最低加购：" + $.drawCondition + "才可参与抽奖\n当前已加购：" + $.addCarts + "次\n目前可加购次数：" + $.jsNum + "次\n活动全部加购需：" + $.totals + "次\n");
    }
    console.log($.helpStatus === 2 ? "衰仔、助力成功" : $.helpStatus === 3 ? "活动期间只能助力一次" : $.helpStatus === 4 ? "助力已满，无法助力" : $.helpStatus === 1 ? "已助力其他人" : $.helpStatus === 5 ? "不能助力自己" : $.helpStatus === 6 ? "活动已开奖，无法助力" : "未知-" + $.helpStatus);
    await takePostRequest("followShop");
    if ($.index == 1) {
      let _0xdf2dx15 = new Date();
      let _0xdf2dx16 = timestampToTime(_0xdf2dx15);
      if (_0xdf2dx16 > $.drawTime) {
        console.log("\n衰仔，抽奖时间到了，开始抽奖");
        await takePostRequest("drawResult");
        $.assistStatus = false;
      } else {
        console.log("\n衰仔，抽奖时间未到，跳过");
        $.assistStatus = true;
      }
    }
    if ($.index == 1) {
      $.helpCount = $.jsNum;
    } else {
      if ($.helpStatus == 2) {
        $.helpCount++;
      }
    }
    console.log("\n");
    console.log(`${"【账号"}${$.index}${"】可加购次数："}${$.jsNum}${""}${$.index != 1 && " 【账号1】可加购次数：" + $.helpCount || ""}${""}`);
    if ($.helpCount == $.totals) {
      $.hasEnd = true;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log(`${"衰仔、全部助力→:"}${$.shareUuid}${""}`);
    }
    if ($.index % 3 == 0) {
      await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
    }
  } catch (e) {
    console.log(e);
  }
}
async function runs() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    let _0xdf2dx14 = false;
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
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await $.wait(1000);
    await takePostRequest("getActMemberInfo");
    await takePostRequest("getUserInfo");
    await takePostRequest("activityContent");
    await $.wait(1000);
    if ($.hotFlag) {
      return;
    }
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    let _0xdf2dx18 = parseInt($.jsNum - $.addCarts);
    if (_0xdf2dx18 > 0) {
      console.log("衰仔、我开始加购了哟！");
      for (const _0xdf2dx19 of $.prodectVos) {
        _0xdf2dx14 = true;
        if (_0xdf2dx19.collection == false && _0xdf2dx18 > 0) {
          $.productId = _0xdf2dx19.productId;
          console.log(`${""}${$.productId}${""}`);
          await takePostRequest("addCart");
          _0xdf2dx18--;
          await $.wait(2000);
          await takePostRequest("activityContent");
          await $.wait(2500);
        }
      }
    } else {
      console.log("衰仔，已全部加购了哟！");
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    if ($.index % 3 == 0) {
      await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
    }
  } catch (e) {
    console.log(e);
  }
}
async function takePostRequest(_0xdf2dx1c) {
  if ($.outFlag) {
    return;
  }
  let _0xdf2dx1d = "https://lzkjdz-isv.isvjcloud.com";
  let _0xdf2dx1e = `${""}`;
  let _0xdf2dx1f = "POST";
  switch (_0xdf2dx1c) {
    case "getMyPing":
      url = `${""}${_0xdf2dx1d}${"/customer/getMyPing"}`;
      _0xdf2dx1e = `${"token="}${$.Token}${"&fromType=APP&userId="}${$.venderId}${"&pin="}`;
      break;
    case "getSimpleActInfoVo":
      url = `${""}${_0xdf2dx1d}${"/customer/getSimpleActInfoVo"}`;
      _0xdf2dx1e = `${"activityId="}${$.activityId}${""}`;
      break;
    case "getActMemberInfo":
      url = `${""}${_0xdf2dx1d}${"/wxCommonInfo/getActMemberInfo"}`;
      _0xdf2dx1e = `${"venderId="}${$.venderId}${"&activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    case "accessLogWithAD":
      url = `${""}${_0xdf2dx1d}${"/common/accessLogWithAD"}`;
      let _0xdf2dx21 = `${"https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId="}${$.activityId}${"&friendUuid="}${$.shareUuid}${""}`;
      _0xdf2dx1e = `${"venderId="}${$.shopId || $.venderId || ""}${"&code=70&pin="}${encodeURIComponent($.Pin)}${"&activityId="}${$.activityId}${"&pageUrl="}${encodeURIComponent(_0xdf2dx21)}${"&subType=app&adSource="}`;
      break;
    case "getUserInfo":
      url = `${""}${_0xdf2dx1d}${"/wxActionCommon/getUserInfo"}`;
      _0xdf2dx1e = `${"pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    case "getOpenCardStatusWithOutSelf":
      url = `${""}${_0xdf2dx1d}${"/crmCard/common/coupon/getOpenCardStatusWithOutSelf"}`;
      _0xdf2dx1e = `${"venderId="}${$.shopId || $.venderId || ""}${"&activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    case "activityContent":
      url = `${""}${_0xdf2dx1d}${"/wxCartKoi/cartkoi/activityContent"}`;
      _0xdf2dx1e = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&yunMidImageUrl="}${$.yunMidImageUrl}${"&friendUuid="}${$.shareUuid}${"&status=1"}`;
      break;
    case "getDrawRecordHasCoupon":
      url = `${""}${_0xdf2dx1d}${"/wxSecond/myPrize"}`;
      _0xdf2dx1e = `${"activityId="}${$.activityId}${"&uuid="}${$.actorUuid}${""}`;
      break;
    case "drawResult":
      url = `${""}${_0xdf2dx1d}${"/wxCartKoi/cartkoi/drawResult"}`;
      _0xdf2dx1e = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&uuid="}${$.actorUuid}${""}`;
      break;
    case "followShop":
      url = `${""}${_0xdf2dx1d}${"/wxActionCommon/followShop"}`;
      _0xdf2dx1e = `${"userId="}${$.venderId}${"&activityType=70&buyerNick="}${encodeURIComponent($.Pin)}${"&activityId="}${$.activityId}${""}`;
      break;
    case "start":
      url = `${""}${_0xdf2dx1d}${"/wxSecond/start"}`;
      _0xdf2dx1e = `${"activityId="}${$.activityId}${"&uuid="}${$.actorUuid}${"&seconds="}${$.targetTime}${""}`;
      break;
    case "addCart":
      url = `${""}${_0xdf2dx1d}${"/wxCartKoi/cartkoi/addCart"}`;
      _0xdf2dx1e = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&productId="}${$.productId}${""}`;
      break;
    default:
      console.log(`${"错误"}${_0xdf2dx1c}${""}`);
  }
  let _0xdf2dx22 = getPostRequest(url, _0xdf2dx1e, _0xdf2dx1f);
  return new Promise(async _0xdf2dx23 => {
    $.post(_0xdf2dx22, (_0xdf2dx24, _0xdf2dx25, _0xdf2dx26) => {
      try {
        setActivityCookie(_0xdf2dx25);
        if (_0xdf2dx24) {
          if (_0xdf2dx25 && typeof _0xdf2dx25.statusCode != "undefined") {
            if (_0xdf2dx25.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.toStr(_0xdf2dx24, _0xdf2dx24)}${""}`);
          console.log(`${""}${_0xdf2dx1c}${" API请求失败，请检查网路重试"}`);
        } else {
          dealReturn(_0xdf2dx1c, _0xdf2dx26);
        }
      } catch (e) {
        console.log(e, _0xdf2dx25);
      } finally {
        _0xdf2dx23();
      }
    });
  });
}
async function dealReturn(_0xdf2dx1c, _0xdf2dx26) {
  let _0xdf2dx28 = "";
  try {
    if (_0xdf2dx1c != "accessLogWithAD" || _0xdf2dx1c != "drawContent") {
      if (_0xdf2dx26) {
        _0xdf2dx28 = JSON.parse(_0xdf2dx26);
      }
    }
  } catch (e) {
    console.log(`${""}${_0xdf2dx1c}${" 执行任务异常"}`);
    console.log(_0xdf2dx26);
    $.runFalag = false;
  }
  try {
    switch (_0xdf2dx1c) {
      case "getMyPing":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true) {
            if (_0xdf2dx28.data && typeof _0xdf2dx28.data.secretPin != "undefined") {
              $.Pin = _0xdf2dx28.data.secretPin;
            }
            if (_0xdf2dx28.data && typeof _0xdf2dx28.data.nickname != "undefined") {
              $.nickname = _0xdf2dx28.data.nickname;
            }
          } else {
            if (_0xdf2dx28.errorMessage) {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "getSimpleActInfoVo":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true) {
            if (typeof _0xdf2dx28.data.shopId != "undefined") {
              $.shopId = _0xdf2dx28.data.shopId;
            }
            if (typeof _0xdf2dx28.data.venderId != "undefined") {
              $.venderId = _0xdf2dx28.data.venderId;
            }
          } else {
            if (_0xdf2dx28.errorMessage) {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "getUserInfo":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true) {
            $.yunMidImageUrl = _0xdf2dx28.data.yunMidImageUrl || "";
          } else {
            if (_0xdf2dx28.errorMessage) {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "activityContent":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true) {
            $.actorUuid = _0xdf2dx28.data.joinRecord.myUuid || "";
            $.activityName = _0xdf2dx28.data.activityVo.activityName || "";
            $.cartEndTime = _0xdf2dx28.data.activityVo.cartEndTime || "";
            $.drawTime = _0xdf2dx28.data.activityVo.drawTime || "";
            $.prodectVos = _0xdf2dx28.data.prodectVos || [];
            $.helpStatus = _0xdf2dx28.data.joinRecord.status || 0;
            $.addCarts = _0xdf2dx28.data.addCarts || 0;
            $.joins = _0xdf2dx28.data.joins || 0;
            $.jsNum = _0xdf2dx28.data.jsNum || 0;
            $.totals = _0xdf2dx28.data.totals || 0;
            $.drawCondition = _0xdf2dx28.data.activityVo.drawCondition || 0;
            if (_0xdf2dx28.data.sendBeanNum) {
              console.log(`${"获得"}${_0xdf2dx28.data.sendBeanNum}${"豆"}`);
              allMessage += `${"【账号"}${$.index}${"】获得"}${_0xdf2dx28.data.sendBeanNum}${"豆\\n"}`;
            }
          } else {
            if (_0xdf2dx28.errorMessage) {
              if (_0xdf2dx28.errorMessage.indexOf("结束") > -1) {
                $.activityEnd = true;
              }
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "getActMemberInfo":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true) {
            $.openCard = _0xdf2dx28.data.openCard || false;
          } else {
            if (_0xdf2dx28.errorMessage) {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "addCart":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true) {
            console.log(`${"加购完成"}`);
          } else {
            if (_0xdf2dx28.errorMessage) {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "followShop":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true) {
            console.log(`${"关注成功"}`);
          } else {
            if (_0xdf2dx28.errorMessage) {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "drawResult":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true) {
            if (typeof _0xdf2dx28.data == "object") {
              let _0xdf2dx12 = "";
              if (_0xdf2dx28.data.drawName) {
                _0xdf2dx12 = `${""}${_0xdf2dx28.data.drawName}${""}`;
              }
              if (!_0xdf2dx12) {
                _0xdf2dx12 = "空气💨";
              }
              console.log(`${"获得:"}${_0xdf2dx12 || _0xdf2dx26}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          } else {
            if (_0xdf2dx28.errorMessage) {
              $.runFalag = false;
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "getDrawRecordHasCoupon":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true) {
            console.log(`${"我的奖品："}`);
            for (let _0xdf2dx11 in _0xdf2dx28.data) {
              $.item = _0xdf2dx11.name;
              console.log(`${""}${$.item}${""}`);
            }
          } else {
            if (_0xdf2dx28.errorMessage) {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "getShareRecord":
        if (typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28.result && _0xdf2dx28.result === true && _0xdf2dx28.data) {
            $.ShareCount = _0xdf2dx28.data.length;
            $.log(`${"=========== 你邀请了:"}${_0xdf2dx28.data.length}${"个"}`);
          } else {
            if (_0xdf2dx28.errorMessage) {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx28.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0xdf2dx1c}${" "}${_0xdf2dx26}${""}`);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(`${""}${_0xdf2dx1c}${"-> "}${_0xdf2dx26}${""}`);
    }
    if (typeof _0xdf2dx28 == "object") {
      if (_0xdf2dx28.errorMessage) {
        if (_0xdf2dx28.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}
function getPostRequest(_0xdf2dx2a, _0xdf2dx1e, _0xdf2dx1f = "POST") {
  let _0xdf2dx2b = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0xdf2dx2a.indexOf("https://lzkjdz-isv.isvjcloud.com") > -1) {
    _0xdf2dx2b.Origin = `${"https://lzkjdz-isv.isvjcloud.com"}`;
    _0xdf2dx2b.Referer = `${"https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId="}${$.activityId}${"&friendUuid="}${$.shareUuid}${""}`;
    _0xdf2dx2b.Cookie = `${""}${lz_jdpin_token_cookie && lz_jdpin_token_cookie || ""}${""}${$.Pin && "AUTH_C_USER=" + $.Pin + ";" || ""}${""}${activityCookie}${""}`;
  }
  return {
    url: _0xdf2dx2a,
    method: _0xdf2dx1f,
    headers: _0xdf2dx2b,
    body: _0xdf2dx1e,
    timeout: 30000
  };
}
function getCk() {
  return new Promise(_0xdf2dx23 => {
    let _0xdf2dx2d = {
      url: `${"https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token"}`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": `${"https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity?activityId="}${$.activityId}${""}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0xdf2dx2d, async (_0xdf2dx24, _0xdf2dx25, _0xdf2dx26) => {
      try {
        if (_0xdf2dx24) {
          if (_0xdf2dx25 && typeof _0xdf2dx25.statusCode != "undefined") {
            if (_0xdf2dx25.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.toStr(_0xdf2dx24)}${""}`);
          console.log(`${""}${$.name}${" cookie API请求失败，请检查网路重试"}`);
        } else {
          let _0xdf2dx2e = _0xdf2dx26.match(/(活动已经结束)/) && _0xdf2dx26.match(/(活动已经结束)/)[1] || "";
          if (_0xdf2dx2e) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          setActivityCookie(_0xdf2dx25);
        }
      } catch (e) {
        $.logErr(e, _0xdf2dx25);
      } finally {
        _0xdf2dx23();
      }
    });
  });
}
function setActivityCookie(_0xdf2dx25) {
  if (_0xdf2dx25.headers["set-cookie"]) {
    cookie = `${""}${originCookie}${";"}`;
    for (let _0xdf2dx30 of _0xdf2dx25.headers["set-cookie"]) {
      lz_cookie[_0xdf2dx30.split(";")[0].substr(0, _0xdf2dx30.split(";")[0].indexOf("="))] = _0xdf2dx30.split(";")[0].substr(_0xdf2dx30.split(";")[0].indexOf("=") + 1);
    }
    for (const _0xdf2dx19 of Object.keys(lz_cookie)) {
      cookie += _0xdf2dx19 + "=" + lz_cookie[_0xdf2dx19] + ";";
    }
    activityCookie = cookie;
  }
}
async function getUA() {
  $.UA = `${"jdapp;iPhone;10.1.4;13.1.2;"}${randomString(40)}${";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"}`;
}
function randomString(_0xdf2dx10) {
  _0xdf2dx10 = _0xdf2dx10 || 32;
  let _0xdf2dx33 = "abcdef0123456789",
    _0xdf2dx34 = _0xdf2dx33.length,
    _0xdf2dx35 = "";
  for (i = 0; i < _0xdf2dx10; i++) {
    _0xdf2dx35 += _0xdf2dx33.charAt(Math.floor(Math.random() * _0xdf2dx34));
  }
  return _0xdf2dx35;
}
function timestampToTime(_0xdf2dx37) {
  var _0xdf2dx38 = new Date(_0xdf2dx37);
  var _0xdf2dx39 = _0xdf2dx38.getFullYear() + "-";
  var _0xdf2dx3a = (_0xdf2dx38.getMonth() + 1 < 10 ? "0" + (_0xdf2dx38.getMonth() + 1) : _0xdf2dx38.getMonth() + 1) + "-";
  var _0xdf2dx3b = _0xdf2dx38.getDate() + " ";
  if (_0xdf2dx3b.length == 2) {
    _0xdf2dx3b = "0" + _0xdf2dx3b;
  }
  var _0xdf2dx3c = _0xdf2dx38.getHours() + ":";
  var _0xdf2dx3d = _0xdf2dx38.getMinutes() + ":";
  var _0xdf2dx3e = _0xdf2dx38.getSeconds();
  return _0xdf2dx39 + _0xdf2dx3a + _0xdf2dx3b + _0xdf2dx3c + _0xdf2dx3d + _0xdf2dx3e;
}
function jsonParse(_0xdf2dx40) {
  if (typeof _0xdf2dx40 == "string") {
    try {
      return JSON.parse(_0xdf2dx40);
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
  return new Promise(async _0xdf2dx23 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0xdf2dx42 = `${""}`;
    if ($.shopactivityId) {
      _0xdf2dx42 = `${",\"activityId\":"}${$.shopactivityId}${""}`;
    }
    const _0xdf2dx43 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"shopId\":\""}${$.joinVenderId}${"\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0"}${_0xdf2dx42}${",\"channel\":406}"}`;
    const _0xdf2dx44 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0xdf2dx43)
    };
    const _0xdf2dx45 = await getH5st("8adfb", _0xdf2dx44);
    const _0xdf2dx46 = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body="}${_0xdf2dx43}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0xdf2dx45)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0xdf2dx46, async (_0xdf2dx24, _0xdf2dx25, _0xdf2dx26) => {
      try {
        _0xdf2dx26 = _0xdf2dx26 && _0xdf2dx26.match(/jsonp_.*?\((.*?)\);/) && _0xdf2dx26.match(/jsonp_.*?\((.*?)\);/)[1] || _0xdf2dx26;
        let _0xdf2dx28 = $.toObj(_0xdf2dx26, _0xdf2dx26);
        if (_0xdf2dx28 && typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28 && _0xdf2dx28.success === true) {
            console.log(`${" >> "}${_0xdf2dx28.message}${""}`);
            $.errorJoinShop = _0xdf2dx28.message;
            if (_0xdf2dx28.result && _0xdf2dx28.result.giftInfo) {
              for (let _0xdf2dx11 of _0xdf2dx28.result.giftInfo.giftList) {
                console.log(`${" >> 入会获得："}${_0xdf2dx11.discountString}${""}${_0xdf2dx11.prizeName}${""}${_0xdf2dx11.secondLineDesc}${""}`);
              }
            }
          } else {
            if (_0xdf2dx28 && typeof _0xdf2dx28 == "object" && _0xdf2dx28.message) {
              $.errorJoinShop = _0xdf2dx28.message;
              console.log(`${""}${_0xdf2dx28.message || ""}${""}`);
            } else {
              console.log(_0xdf2dx26);
            }
          }
        } else {
          console.log(_0xdf2dx26);
        }
      } catch (e) {
        $.logErr(e, _0xdf2dx25);
      } finally {
        _0xdf2dx23();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0xdf2dx23 => {
    const _0xdf2dx43 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"channel\":406,\"payUpShop\":true}"}`;
    const _0xdf2dx44 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0xdf2dx43)
    };
    const _0xdf2dx45 = await getH5st("8adfb", _0xdf2dx44);
    const _0xdf2dx46 = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body="}${_0xdf2dx43}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0xdf2dx45)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0xdf2dx46, async (_0xdf2dx24, _0xdf2dx25, _0xdf2dx26) => {
      try {
        _0xdf2dx26 = _0xdf2dx26 && _0xdf2dx26.match(/jsonp_.*?\((.*?)\);/) && _0xdf2dx26.match(/jsonp_.*?\((.*?)\);/)[1] || _0xdf2dx26;
        let _0xdf2dx28 = $.toObj(_0xdf2dx26, _0xdf2dx26);
        if (_0xdf2dx28 && typeof _0xdf2dx28 == "object") {
          if (_0xdf2dx28 && _0xdf2dx28.success == true) {
            console.log(`${"去加入："}${_0xdf2dx28.result.shopMemberCardInfo.venderCardName || ""}${" ("}${$.joinVenderId}${")"}`);
            $.shopactivityId = _0xdf2dx28.result.interestsRuleList && _0xdf2dx28.result.interestsRuleList[0] && _0xdf2dx28.result.interestsRuleList[0].interestsInfo && _0xdf2dx28.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else {
          console.log(_0xdf2dx26);
        }
      } catch (e) {
        $.logErr(e, _0xdf2dx25);
      } finally {
        _0xdf2dx23();
      }
    });
  });
}
function getH5st(_0xdf2dx49, _0xdf2dx44) {
  return new Promise(async _0xdf2dx23 => {
    let _0xdf2dx46 = {
      url: `${"http://api.kingran.cf/h5st"}`,
      body: `${"businessId="}${_0xdf2dx49}${"&req="}${encodeURIComponent(JSON.stringify(_0xdf2dx44))}${""}`,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      timeout: 30 * 1000
    };
    $.post(_0xdf2dx46, (_0xdf2dx24, _0xdf2dx25, _0xdf2dx26) => {
      try {
        if (_0xdf2dx24) {
          console.log(JSON.stringify(_0xdf2dx24));
          console.log(`${""}${$.name}${" getSign API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0xdf2dx25);
      } finally {
        _0xdf2dx23(_0xdf2dx26);
      }
    });
  });
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0xdf2dx4b = Array.from(new Set($.blacklist.split("&")));
  console.log(_0xdf2dx4b.join("&") + "\n");
  let _0xdf2dx4c = _0xdf2dx4b;
  let _0xdf2dx4d = [];
  let _0xdf2dx4e = false;
  for (let _0xdf2dx11 = 0; _0xdf2dx11 < cookiesArr.length; _0xdf2dx11++) {
    let _0xdf2dx3e = decodeURIComponent(cookiesArr[_0xdf2dx11].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0xdf2dx11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0xdf2dx3e) {
      break;
    }
    let _0xdf2dx4f = false;
    for (let _0xdf2dx35 of _0xdf2dx4c) {
      if (_0xdf2dx35 && _0xdf2dx35 == _0xdf2dx3e) {
        _0xdf2dx4f = true;
        break;
      }
    }
    if (!_0xdf2dx4f) {
      _0xdf2dx4e = true;
      _0xdf2dx4d.splice(_0xdf2dx11, -1, cookiesArr[_0xdf2dx11]);
    }
  }
  if (_0xdf2dx4e) {
    cookiesArr = _0xdf2dx4d;
  }
}
function toFirst(_0xdf2dx4d, _0xdf2dx51) {
  if (_0xdf2dx51 != 0) {
    _0xdf2dx4d.unshift(_0xdf2dx4d.splice(_0xdf2dx51, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0xdf2dx4b = Array.from(new Set($.whitelist.split("&")));
  console.log(_0xdf2dx4b.join("&") + "\n");
  let _0xdf2dx4d = [];
  let _0xdf2dx53 = _0xdf2dx4b;
  for (let _0xdf2dx11 in cookiesArr) {
    let _0xdf2dx3e = decodeURIComponent(cookiesArr[_0xdf2dx11].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0xdf2dx11].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0xdf2dx53.includes(_0xdf2dx3e)) {
      _0xdf2dx4d.push(cookiesArr[_0xdf2dx11]);
    }
  }
  helpCookiesArr = _0xdf2dx4d;
  if (_0xdf2dx53.length > 1) {
    for (let _0xdf2dx35 in _0xdf2dx53) {
      let _0xdf2dx3d = _0xdf2dx53[_0xdf2dx53.length - 1 - _0xdf2dx35];
      if (!_0xdf2dx3d) {
        continue;
      }
      for (let _0xdf2dx11 in helpCookiesArr) {
        let _0xdf2dx3e = decodeURIComponent(helpCookiesArr[_0xdf2dx11].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0xdf2dx11].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0xdf2dx3d == _0xdf2dx3e) {
          toFirst(helpCookiesArr, _0xdf2dx11);
        }
      }
    }
  }
}

