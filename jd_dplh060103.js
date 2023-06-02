/*
大牌联合060103期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC2023060103ddw/oC2023060103ddw?actId=288de30e827c48e8820f8491932_23060103

自行运行，有水无水自测。

变量填写：
黑名单 用&隔开 pin值
//export DPLHTY_blacklist="" 
重试次数，默认30
//export retrynum="30"
如需修改抽奖次数请设置环境变量：
//export opencard_draw="3" //次数

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码
============Quantumultx===============
[task_local]
#大牌联合060103期
1 1 1 1 * jd_dplh060103.js, tag=大牌联合060103期, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("大牌联合060103期");
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x8d1d40 => {
    cookiesArr.push(jdCookieNode[_0x8d1d40]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x1bb0a7 => _0x1bb0a7.cookie)].filter(_0x5bbd1e => !!_0x5bbd1e);
let retrynum = "30",
  opencard_draw = "0";
retrynum = $.isNode() ? process.env.retrynum ? process.env.retrynum : retrynum : $.getdata("retrynum") ? $.getdata("retrynum") : opencard_draw;
opencard_draw = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : opencard_draw : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : opencard_draw;
opencard_toShop = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : "" + opencard_toShop : $.getdata("opencard_toShop") ? $.getdata("opencard_toShop") : "" + opencard_toShop;
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
  helpnum = "",
  KRDPLHTY = "288de30e827c48e8820f8491932_23060103";
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
const getToken = require("./function/krgetToken"),
  getH5st = require("./function/krh5st");
let domains = "https://jinggengjcq-isv.isvjcloud.com";
helpnum = $.isNode() ? process.env.helpnum ? process.env.helpnum : "" + helpnum : $.getdata("helpnum") ? $.getdata("helpnum") : "" + helpnum;
let whitelist = "",
  blacklist = "";
$.whitelist = process.env.DPLHTY_whitelist || whitelist;
$.blacklist = process.env.DPLHTY_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  authorCodeList = [];
  $.authorCode = helpnum ? helpnum : authorCodeList[random(0, authorCodeList.length)];
  console.log("\n💬 当前ID：" + KRDPLHTY);
  console.log("\n💬 默认抽奖次数：" + opencard_draw + " 💬 重试次数：" + retrynum);
  console.log("\n💬 请在有水的情况下运行");
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.appkey = "94854284";
  $.userId = "10299171";
  $.actId = KRDPLHTY;
  $.MixNicks = "";
  $.inviteNick = $.authorCode;
  for (let _0xe36071 = 0; _0xe36071 < cookiesArr.length; _0xe36071++) {
    cookie = cookiesArr[_0xe36071];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xe36071 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      $.UA = await getUa();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await run();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      if ($.outFlag || $.activityEnd) break;
    }
  }
  if ($.outFlag) {
    let _0x47a332 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x47a332);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + _0x47a332);
  }
})().catch(_0xa6dc1b => $.logErr(_0xa6dc1b)).finally(() => $.done());
async function run() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.MixNick = "";
    if ($.activityEnd) return;
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("❌ 获取TOKEN失败");
      return;
    }
    await takePostRequest("activity_load");
    for (let _0x2286c3 = 0; _0x2286c3 < retrynum; _0x2286c3++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("activity_load");
        if ($.krFlag) break;
      }
    }
    if ($.hotFlag) return;
    if ($.MixNick == "") {
      console.log("❌ 获取[活动信息]失败，可能是黑号或者太卡了");
      return;
    }
    $.toBind = 0;
    $.openList = [];
    await takePostRequest("绑定");
    for (let _0x515151 = 0; _0x515151 < retrynum; _0x515151++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("绑定");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await takePostRequest("shopList");
    for (let _0x1aceef = 0; _0x1aceef < retrynum; _0x1aceef++) {
      if ($.retry || $.krretry) {
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("shopList");
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.activityEnd) return;
    for (o of $.openList) {
      $.missionType = "openCard";
      if (o.open != true && o.openCardUrl) {
        if ($.activityEnd) return;
        if ($.outEnd) return;
        $.openCard = false;
        $.joinVenderId = o.userId;
        await takePostRequest("mission");
        for (let _0x1565a8 = 0; _0x1565a8 < retrynum; _0x1565a8++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("mission");
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        if ($.openCard == true) {
          $.errorJoinShop = "";
          await joinShop();
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
          if ($.errorJoinShop.indexOf("您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") > -1) return;
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
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("activity_load");
          for (let _0x2b7c05 = 0; _0x2b7c05 < retrynum; _0x2b7c05++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("activity_load");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("shopList");
          for (let _0x5826ec = 0; _0x5826ec < retrynum; _0x5826ec++) {
            if ($.retry || $.krretry) {
              await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
              await takePostRequest("shopList");
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        }
      }
    }
    if ($.hasCollectShop === 0) {
      $.missionType = "uniteCollectShop";
      await takePostRequest("mission");
      for (let _0x96bdfa = 0; _0x96bdfa < retrynum; _0x96bdfa++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else console.log("💔 呜呜呜，已完成关注任务");
    if ($.hasAddCart === 0) {
      $.missionType = "uniteAddCart";
      await takePostRequest("mission");
      for (let _0x5cbfe6 = 0; _0x5cbfe6 < retrynum; _0x5cbfe6++) {
        if ($.retry || $.krretry) {
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await takePostRequest("mission");
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    } else {
      console.log("💔 呜呜呜，已完成加购任务");
    }
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let _0x5c4625 = parseInt($.totalPoint / 200);
      opencard_draw = parseInt(opencard_draw, 10);
      if (_0x5c4625 > opencard_draw) _0x5c4625 = opencard_draw;
      console.log("💖 抽奖次数为:" + _0x5c4625);
      for (m = 1; _0x5c4625--; m++) {
        console.log("🌐 第" + m + "次抽奖");
        await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
        await takePostRequest("抽奖");
        for (let _0x54529e = 0; _0x54529e < retrynum; _0x54529e++) {
          if ($.retry || $.krretry) {
            await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
            await takePostRequest("抽奖");
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break;
        if (Number(_0x5c4625) <= 0) break;
        if (m >= 10) {
          console.log("💔 抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    } else console.log("🔊 如需抽奖请设置环境变量[opencard_draw]为\"3\" 3为次数");
    console.log("🔊 当前助力:" + ($.inviteNick || "未获取到助力邀请码"));
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("🔊 后面的号都会助力:" + $.inviteNick));
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  } catch (_0x882a31) {
    console.log(_0x882a31);
  }
}
async function takePostRequest(_0x105ef9) {
  if ($.outFlag) return;
  let _0x5e7b10 = "https://jinggengjcq-isv.isvjcloud.com",
    _0x7e663d = "",
    _0x42318c = "POST",
    _0x1ac0de = "";
  switch (_0x105ef9) {
    case "activity_load":
      url = _0x5e7b10 + "/dm/front/jdBigAlliance/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x1ac0de = {
        "jdToken": $.Token,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      };
      if ($.joinVenderId) _0x1ac0de = {
        ..._0x1ac0de,
        "shopId": "" + $.joinVenderId
      };
      _0x7e663d = taskPostUrl("/jdBigAlliance/activity/load", _0x1ac0de);
      break;
    case "shopList":
      url = _0x5e7b10 + "/dm/front/jdBigAlliance/shop/shopList?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x1ac0de = {};
      _0x7e663d = taskPostUrl("/jdBigAlliance/shop/shopList", _0x1ac0de);
      break;
    case "绑定":
      url = _0x5e7b10 + "/dm/front/jdBigAlliance/customer/inviteRelation?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x1ac0de = {
        "inviterNick": $.inviteNick || ""
      };
      _0x7e663d = taskPostUrl("/jdBigAlliance/customer/inviteRelation", _0x1ac0de);
      break;
    case "mission":
      url = _0x5e7b10 + "/dm/front/jdBigAlliance/mission/completeMission?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x1ac0de = {
        "missionType": $.missionType
      };
      if ($.joinVenderId) _0x1ac0de = {
        ..._0x1ac0de,
        "shopId": $.joinVenderId
      };
      _0x7e663d = taskPostUrl("/jdBigAlliance/mission/completeMission", _0x1ac0de);
      break;
    case "抽奖":
      url = _0x5e7b10 + "/dm/front/jdBigAlliance/interactive/drawPost?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&user_id=10299171";
      _0x1ac0de = {
        "dataType": "draw",
        "usedGameNum": "2"
      };
      _0x7e663d = taskPostUrl("/jdBigAlliance/interactive/drawPost", _0x1ac0de);
      break;
    default:
      console.log("错误" + _0x105ef9);
  }
  let _0x440207 = getPostRequest(url, _0x7e663d, _0x42318c);
  return new Promise(async _0x5f08d1 => {
    $.post(_0x440207, (_0xf53a2f, _0x5bb61c, _0x570cdf) => {
      try {
        _0xf53a2f ? (_0x5bb61c && _0x5bb61c.statusCode && _0x5bb61c.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), $.retry = true) : dealReturn(_0x105ef9, _0x570cdf);
      } catch (_0x3fb936) {
        console.log(_0x3fb936, _0x5bb61c);
      } finally {
        _0x5f08d1();
      }
    });
  });
}
async function dealReturn(_0x1cc3c2, _0x3d8bf9) {
  let _0x5cd9cd = "";
  try {
    $.krFlag = true;
    (_0x1cc3c2 != "accessLogWithAD" || _0x1cc3c2 != "drawContent") && _0x3d8bf9 && (_0x5cd9cd = JSON.parse(_0x3d8bf9));
  } catch (_0x1a1a3b) {
    console.log("🤬 " + _0x1cc3c2 + " 数据异常");
    $.krretry = true;
    $.runFalag = false;
  }
  try {
    let _0x3764d7 = "";
    switch (_0x1cc3c2) {
      case "抽奖":
        if (typeof _0x5cd9cd == "object") {
          if (_0x5cd9cd.success && _0x5cd9cd.success === true && _0x5cd9cd.data) {
            if (_0x5cd9cd.data.status && _0x5cd9cd.data.status == 200) {
              if (_0x5cd9cd.data.data.sendResult) console.log("抽中：" + _0x5cd9cd.data.data.awardSetting.awardName);else !_0x5cd9cd.data.data.result ? console.log("空气") : console.log(_0x5cd9cd.data.data);
            } else _0x5cd9cd.data.status && _0x5cd9cd.data.status == 500 && console.log("" + (_0x5cd9cd.data.msg || ""));
          } else {
            if (_0x5cd9cd.message) console.log("" + (_0x5cd9cd.message || ""));else {
              console.log(_0x3d8bf9);
            }
          }
        } else console.log(_0x3d8bf9);
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      case "activity_load":
      case "mission":
      case "shopList":
      case "loadUniteOpenCard":
      case "setMixNick":
      case "uniteOpenCardOne":
      case "checkOpenCard":
      case "followShop":
      case "addCart":
      case "myAward":
      case "missionInviteList":
      case "绑定":
        _0x3764d7 = "";
        if (_0x1cc3c2 == "followShop") _0x3764d7 = "关注";
        if (_0x1cc3c2 == "addCart") _0x3764d7 = "加购";
        if (typeof _0x5cd9cd == "object") {
          if (_0x5cd9cd.success && _0x5cd9cd.success === true && _0x5cd9cd.data) {
            if (_0x5cd9cd.data.status && _0x5cd9cd.data.status == 200) {
              _0x5cd9cd = _0x5cd9cd.data;
              if (_0x1cc3c2 != "setMixNick" && (_0x5cd9cd.msg || _0x5cd9cd.data.isOpenCard || _0x5cd9cd.data.remark)) console.log("🔊 " + (_0x3764d7 && _0x3764d7 + ":" || "") + (_0x5cd9cd.msg || _0x5cd9cd.data.isOpenCard || _0x5cd9cd.data.remark || ""));
              if (_0x1cc3c2 == "activity_load") {
                if (_0x5cd9cd.msg || _0x5cd9cd.data.isOpenCard) {
                  if ((_0x5cd9cd.msg || _0x5cd9cd.data.isOpenCard || "").indexOf("绑定成功") > -1) $.toBind = 1;
                }
                if (_0x5cd9cd.data) {
                  $.endTime = _0x5cd9cd.data.cusActivity.endTime || 0;
                  $.MixNick = _0x5cd9cd.data.missionCustomer.buyerNick || "";
                  $.usedChance = _0x5cd9cd.data.missionCustomer.usedChance || 0;
                  $.totalPoint = _0x5cd9cd.data.missionCustomer.totalPoint || 0;
                  $.hasCollectShop = _0x5cd9cd.data.missionCustomer.hasCollectShop || 0;
                  $.hasAddCart = _0x5cd9cd.data.missionCustomer.hasAddCart || 0;
                }
              } else {
                if (_0x1cc3c2 == "shopList") $.openList = _0x5cd9cd.data || [];else {
                  if (_0x1cc3c2 == "mission") _0x5cd9cd.data.remark.indexOf("不是会员") > -1 ? $.openCard = true : $.openCard = false;else {
                    if (_0x1cc3c2 == "uniteOpenCardOne") $.uniteOpenCar = _0x5cd9cd.msg || _0x5cd9cd.data.msg || "";else {
                      if (_0x1cc3c2 == "myAward") {
                        console.log("🔊 我的奖品：");
                        let _0x1bbcb9 = 0;
                        for (let _0xa36df5 in _0x5cd9cd.data.list || []) {
                          let _0x5994a3 = _0x5cd9cd.data.list[_0xa36df5];
                          _0x1bbcb9 += Number(_0x5994a3.awardDes);
                        }
                        if (_0x1bbcb9 > 0) console.log("🔊 共获得" + _0x1bbcb9 + "京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n");
                      } else _0x1cc3c2 == "missionInviteList" && console.log("🔊 邀请人数(" + _0x5cd9cd.data.invitedLogList.total + ")");
                    }
                  }
                }
              }
            } else {
              if (_0x5cd9cd.data.msg) {
                if (_0x5cd9cd.errorMessage.indexOf("活动未开始") > -1) {
                  $.activityEnd = true;
                }
                console.log("🔊 " + (_0x5cd9cd.data.msg || ""));
              } else {
                if (_0x5cd9cd.errorMessage) {
                  if (_0x5cd9cd.errorMessage.indexOf("火爆") > -1) {}
                  console.log("🔊 " + (_0x5cd9cd.errorMessage || ""));
                } else console.log("" + _0x3d8bf9);
              }
            }
          } else _0x5cd9cd.errorMessage ? console.log("🔊 " + (_0x5cd9cd.errorMessage || "")) : console.log("" + _0x3d8bf9);
        } else {}
        break;
      default:
        console.log((_0x3764d7 || _0x1cc3c2) + "-> " + _0x3d8bf9);
    }
    if (typeof _0x5cd9cd == "object") {
      if (_0x5cd9cd.errorMessage) {
        if (_0x5cd9cd.errorMessage.indexOf("火爆") > -1) {}
      }
    }
  } catch (_0x53465d) {}
}
function getPostRequest(_0x2ab1f1, _0x1519e5, _0x5a5e72 = "POST") {
  let _0x408aeb = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x2ab1f1.indexOf("https://jinggengjcq-isv.isvjcloud.com") > -1) {
    _0x408aeb.Origin = "https://jinggengjcq-isv.isvjcloud.com";
    _0x408aeb["Content-Type"] = "application/json; charset=utf-8";
    delete _0x408aeb.Cookie;
  }
  return {
    "url": _0x2ab1f1,
    "method": _0x5a5e72,
    "headers": _0x408aeb,
    "body": _0x1519e5,
    "timeout": 30 * 1000
  };
}
function taskPostUrl(_0x33c7ec, _0x38e60a) {
  d = {
    "actId": $.actId,
    ..._0x38e60a,
    "method": _0x33c7ec,
    "userId": $.userId,
    "buyerNick": $.MixNick || ""
  };
  sign2 = mpdzSign(d);
  const _0x5ceaa4 = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "appkey": $.appkey,
        "m": "POST",
        "oba": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        ..._0x38e60a,
        "method": _0x33c7ec,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
      }
    }
  };
  return _0x33c7ec.indexOf("missionInviteList") > -1 && delete _0x5ceaa4.params.admJson.actId, $.toStr(_0x5ceaa4, _0x5ceaa4);
}
function random(_0x486b14, _0x214c60) {
  return Math.floor(Math.random() * (_0x214c60 - _0x486b14)) + _0x486b14;
}
function mpdzSign(_0x59e7fc) {
  AppSecret = "4c3aea57fa9d45c8aa58f18bd9f63c54";
  key = "d9e8969dbc9a";
  time2 = new Date().valueOf();
  s2 = encodeURIComponent(JSON.stringify(_0x59e7fc));
  c = new RegExp("'", "g");
  A = new RegExp("~", "g");
  s2 = s2.replace(c, "%27");
  s2 = s2.replace(A, "%7E");
  signBody = "f" + key + "D" + s2 + "c" + time2 + AppSecret;
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
  return {
    "sign": sign,
    "timeStamp": time2
  };
}
async function getUa() {
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
  CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  const _0x4b9907 = CryptoJS.enc.Utf8.parse(id),
    _0x42fe19 = CryptoJS.enc.Base64.stringify(_0x4b9907);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": _0x42fe19,
      "od": "",
      "ov": "Ctq=",
      "ud": _0x42fe19
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}
function randomString(_0x37a58f) {
  _0x37a58f = _0x37a58f || 32;
  let _0x48bfb4 = "abcdef0123456789",
    _0x5734d3 = _0x48bfb4.length,
    _0x500a3a = "";
  for (i = 0; i < _0x37a58f; i++) _0x500a3a += _0x48bfb4.charAt(Math.floor(Math.random() * _0x5734d3));
  return _0x500a3a;
}
function jsonParse(_0x252583) {
  if (typeof _0x252583 == "string") try {
    return JSON.parse(_0x252583);
  } catch (_0x15db1b) {
    return console.log(_0x15db1b), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x5187b8 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x39e60b = "";
    if ($.shopactivityId) _0x39e60b = ",\"activityId\":" + $.shopactivityId;
    const _0x180a82 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x39e60b + ",\"channel\":406}",
      _0x4d6379 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x180a82)
      };
    for (var _0x3acdff = "", _0x5887bb = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", _0x14ca31 = 0; _0x14ca31 < 16; _0x14ca31++) {
      var _0x111f2c = Math.round(Math.random() * (_0x5887bb.length - 1));
      _0x3acdff += _0x5887bb.substring(_0x111f2c, _0x111f2c + 1);
    }
    uuid = Buffer.from(_0x3acdff, "utf8").toString("base64");
    ep = encodeURIComponent(JSON.stringify({
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "ts": new Date().getTime(),
      "ridx": -1,
      "cipher": {
        "screen": "CJS0CseyCtK4",
        "osVersion": "CJGkEK==",
        "uuid": uuid
      },
      "ciphertype": 5,
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile"
    }));
    const _0xf220f0 = await getH5st("8adfb", _0x4d6379),
      _0xce4165 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x180a82 + "&ef=1&ep=" + ep + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0xf220f0),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0xce4165, async (_0x5018ab, _0x2bdcfc, _0x3ebd49) => {
      try {
        if (_0x5018ab) _0x2bdcfc && typeof _0x2bdcfc.statusCode != "undefined" && _0x2bdcfc.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          _0x3ebd49 = _0x3ebd49 && _0x3ebd49.match(/jsonp_.*?\((.*?)\);/) && _0x3ebd49.match(/jsonp_.*?\((.*?)\);/)[1] || _0x3ebd49;
          let _0x24b8c4 = $.toObj(_0x3ebd49, _0x3ebd49);
          if (_0x24b8c4 && typeof _0x24b8c4 == "object") {
            if (_0x24b8c4 && _0x24b8c4.success === true) {
              console.log(" >> " + _0x24b8c4.message);
              $.errorJoinShop = _0x24b8c4.message;
              if (_0x24b8c4.result && _0x24b8c4.result.giftInfo) for (let _0x42980d of _0x24b8c4.result.giftInfo.giftList) {
                console.log(" >> 入会获得：" + _0x42980d.discountString + _0x42980d.prizeName + _0x42980d.secondLineDesc);
              }
            } else _0x24b8c4 && typeof _0x24b8c4 == "object" && _0x24b8c4.message ? ($.errorJoinShop = _0x24b8c4.message, console.log("" + (_0x24b8c4.message || ""))) : console.log(_0x3ebd49);
          } else console.log(_0x3ebd49);
        }
      } catch (_0x28c4d4) {
        $.logErr(_0x28c4d4, _0x2bdcfc);
      } finally {
        _0x5187b8();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x23d02a => {
    const _0x3eadc4 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      _0xe2860c = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x3eadc4)
      };
    await $.wait(1000);
    const _0x2f43ab = await getH5st("8adfb", _0xe2860c),
      _0x4e8366 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x3eadc4 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x2f43ab),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x4e8366, async (_0x130b84, _0x2240c6, _0xda3eb9) => {
      try {
        if (_0x130b84) {
          if (_0x2240c6 && typeof _0x2240c6.statusCode != "undefined") {
            _0x2240c6.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
          }
        } else {
          _0xda3eb9 = _0xda3eb9 && _0xda3eb9.match(/jsonp_.*?\((.*?)\);/) && _0xda3eb9.match(/jsonp_.*?\((.*?)\);/)[1] || _0xda3eb9;
          let _0x4543a0 = $.toObj(_0xda3eb9, _0xda3eb9);
          if (_0x4543a0 && typeof _0x4543a0 == "object") {
            if (_0x4543a0 && _0x4543a0.success == true) {
              console.log("去加入：" + (_0x4543a0.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = _0x4543a0.result.interestsRuleList && _0x4543a0.result.interestsRuleList[0] && _0x4543a0.result.interestsRuleList[0].interestsInfo && _0x4543a0.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else console.log(_0xda3eb9);
        }
      } catch (_0x49e9e7) {
        $.logErr(_0x49e9e7, _0x2240c6);
      } finally {
        _0x23d02a();
      }
    });
  });
}
function getAuthorCodeList(_0x5cd16e) {
  return new Promise(_0x3684f9 => {
    const _0x3c435c = {
      "url": _0x5cd16e + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x3c435c, async (_0x4fdd49, _0x3a371e, _0x340a99) => {
      try {
        if (_0x4fdd49) $.getAuthorCodeListerr = false;else {
          if (_0x340a99) _0x340a99 = JSON.parse(_0x340a99);
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x41c0cb) {
        $.logErr(_0x41c0cb, _0x3a371e);
        _0x340a99 = null;
      } finally {
        _0x3684f9(_0x340a99);
      }
    });
  });
}
function random(_0x3cae5f, _0x413e76) {
  return Math.floor(Math.random() * (_0x413e76 - _0x3cae5f)) + _0x3cae5f;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const _0x3208e = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x3208e.join("&") + "\n");
  let _0x12f890 = _0x3208e,
    _0x321609 = [],
    _0x3ec983 = false;
  for (let _0x48d353 = 0; _0x48d353 < cookiesArr.length; _0x48d353++) {
    let _0x35c487 = decodeURIComponent(cookiesArr[_0x48d353].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x48d353].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x35c487) break;
    let _0x2f8a59 = false;
    for (let _0x36c2de of _0x12f890) {
      if (_0x36c2de && _0x36c2de == _0x35c487) {
        _0x2f8a59 = true;
        break;
      }
    }
    !_0x2f8a59 && (_0x3ec983 = true, _0x321609.splice(_0x48d353, -1, cookiesArr[_0x48d353]));
  }
  if (_0x3ec983) cookiesArr = _0x321609;
}
function toFirst(_0x81f2b4, _0x5ba1cd) {
  _0x5ba1cd != 0 && _0x81f2b4.unshift(_0x81f2b4.splice(_0x5ba1cd, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x58eab6 = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x58eab6.join("&") + "\n");
  let _0x7421fd = [],
    _0x428aa5 = _0x58eab6;
  for (let _0x39761b in cookiesArr) {
    let _0x5da4bd = decodeURIComponent(cookiesArr[_0x39761b].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x39761b].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    _0x428aa5.includes(_0x5da4bd) && _0x7421fd.push(cookiesArr[_0x39761b]);
  }
  helpCookiesArr = _0x7421fd;
  if (_0x428aa5.length > 1) for (let _0x5d9242 in _0x428aa5) {
    let _0x475a36 = _0x428aa5[_0x428aa5.length - 1 - _0x5d9242];
    if (!_0x475a36) continue;
    for (let _0x3a2e4e in helpCookiesArr) {
      let _0x24defe = decodeURIComponent(helpCookiesArr[_0x3a2e4e].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x3a2e4e].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      _0x475a36 == _0x24defe && toFirst(helpCookiesArr, _0x3a2e4e);
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }