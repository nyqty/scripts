/*
活动名称：生日礼包/会员等级礼包 · 超级无线
活动链接：https://cjhy-isv.isvjcloud.com/mc/wxMcLevelAndBirthGifts/activity?activityId=<活动id>
环境变量：jd_wxMcLevelAndBirthGifts_activityId // 活动id

必须条件：配置文件或者环境变量中添加变量：
## CJ店铺生日和等级礼包-jd_wxMcLevelAndBirthGifts.js
//export jd_wxMcLevelAndBirthGifts_activityId="活动ID"
//export jd_wxMcLevelAndBirthGifts_activityUrl="https://cjhydz-isv.isvjcloud.com"
//export jd_wxMcLevelAndBirthGifts_num //运行账号数量，默认运行前7
//export jd_wxMcLevelAndBirthGifts_openCard //是否开卡，需要开卡变量值为 true，默认不开卡
//export JD_CJ_OPEN="false" //关闭CJ相关活动运行
//export jd_wxMcLevelAndBirthGifts_blacklist //黑名单 用&隔开 pin值

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#CJ店铺生日和等级礼包-加密
1 1 1 1 * jd_wxMcLevelAndBirthGifts.js, tag=CJ店铺生日和等级礼包-加密, enabled=true
*/

let jd_wxMcLevelAndBirthGifts_activityId = "" // 活动ID
let jd_wxMcLevelAndBirthGifts_activityUrl = "https://cjhy-isv.isvjcloud.com/" // 活动地址
const Env = require('./utils/Env.js');
const $ = new Env("生日礼包和会员等级礼包");

const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const getToken = require("./function/krgetToken");
let lz_cookie = {};
let activityCookie = "";
$.activityEnd = false;
let stopKeywords = ["未开始", "已结束", "来晚了", "非法操作", "京豆计划", "奖品发送失败", "发放完", "已发完", "已领完", "抢光了", "全部被领取", "余额不足"];
let cookiesArr = [],
  cookie = "";
activityId = jd_wxMcLevelAndBirthGifts_activityId;
activityUrl = jd_wxMcLevelAndBirthGifts_activityUrl;
let CookieNum = 7;
if (process.env.jd_wxMcLevelAndBirthGifts_num && process.env.jd_wxMcLevelAndBirthGifts_num != 7) {
  CookieNum = process.env.jd_wxMcLevelAndBirthGifts_num;
}
let jd_wxMcLevelAndBirthGifts_openCard = $.isNode() ? process.env.jd_wxMcLevelAndBirthGifts_openCard ? process.env.jd_wxMcLevelAndBirthGifts_openCard : false : $.getdata("jd_wxMcLevelAndBirthGifts_openCard") ? $.getdata("jd_wxMcLevelAndBirthGifts_openCard") : false;
if ($.isNode()) {
  if (process.env.jd_wxMcLevelAndBirthGifts_activityId) {
    activityId = process.env.jd_wxMcLevelAndBirthGifts_activityId;
  }
  if (process.env.jd_wxMcLevelAndBirthGifts_activityUrl) {
    activityUrl = process.env.jd_wxMcLevelAndBirthGifts_activityUrl;
  }
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(jdCookieNode).forEach(_0x20bbxd => {
    cookiesArr.push(jdCookieNode[_0x20bbxd]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x20bbxd => {
    return _0x20bbxd.cookie;
  })].filter(_0x20bbxd => {
    return !!_0x20bbxd;
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
$.whitelist = process.env.jd_wxMcLevelAndBirthGifts_whitelist || whitelist;
$.blacklist = process.env.jd_wxMcLevelAndBirthGifts_blacklist || blacklist;
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
  console.log("活动入口：https://cjhy-isv.isvjcloud.com/mc/wxMcLevelAndBirthGifts/activity?activityId=" + activityId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  let _0x20bbx13 = false;
  for (let _0x20bbx14 = 0; _0x20bbx14 < CookieNum; _0x20bbx14++) {
    if (_0x20bbx13) {
      return;
    }
    if (cookiesArr[_0x20bbx14]) {
      cookie = cookiesArr[_0x20bbx14];
      originCookie = cookiesArr[_0x20bbx14];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x20bbx14 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
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
      await wxMcLevelAndBirthGifts();
      await $.wait(4000);
      if ($.hasEnd || $.maxcountnum || $.outFlag || $.activityEnd) {
        break;
      }
    }
  }
})().catch(_0x20bbx12 => {
  $.log("", `${" "}${$.name}${", 失败! 原因: "}${_0x20bbx12}${"!"}`, "");
}).finally(() => {
  $.done();
});
async function wxMcLevelAndBirthGifts() {
  $.notx == false;
  $.sid = "";
  $.Token = "";
  $.Pin = "";
  $.hisPin = "";
  $.card = [];
  await getCk();
  if ($.outFlag) {
    console.log("此ip已被限制，请过更换IP后或者等待一会儿再执行脚本\n");
    return;
  }
  $.Token = await getToken(originCookie, "https://cjhy-isv.isvjcloud.com");
  if ($.Token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.index == 1) {
    await $.wait(1000);
    await getSimpleActInfoVo();
  }
  if ($.userId) {
    await $.wait(1000);
    if ($.Token) {
      await getPin();
    }
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await accessLog();
    await $.wait(1000);
    await getOpenCardInfo();
    await $.wait(1000);
    if (!$.openedCard) {
      console.log("还不是店铺会员哦~");
      if (jd_wxMcLevelAndBirthGifts_openCard) {
        $.shopactivityId = "";
        $.joinVenderId = $.userId;
        await getshopactivityId();
        for (let _0x20bbx14 = 0; _0x20bbx14 < Array(5).length; _0x20bbx14++) {
          if (_0x20bbx14 > 0) {
            console.log(`${"第"}${_0x20bbx14}${"次 重新开卡"}`);
          }
          await joinShop();
          await $.wait(1000);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
            break;
          }
        }
        await getOpenCardInfo();
        await $.wait(1000);
      } else {
        console.log("如需入会请设置环境变量 [jd_wxMcLevelAndBirthGifts_openCard]，变量值为 true");
      }
    }
    if (!$.openedCard) {
      return;
    }
    await getMemberLevel();
    await $.wait(1000);
    await activityContent();
    await $.wait(1000);
    switch ($.activityType) {
      case 103:
        if ($.index == 1) {
          console.log("活动类型：生日礼包");
        }
        await getBirthInfo();
        await $.wait(1000);
        await saveBirthDay();
        await $.wait(1000);
        await sendBirthGifts();
        await $.wait(1000);
        break;
      case 104:
        if ($.index == 1) {
          console.log("活动类型：会员等级礼包");
        }
        await sendLevelGifts();
        await $.wait(1000);
        break;
      case 119:
        console.log("暂未适配升级有礼活动...");
        exit_mark = true;
        break;
      default:
        console.log("未知活动类型...");
        exit_mark = true;
        break;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function getSimpleActInfoVo() {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx18 = `${"activityId="}${activityId}${""}`;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log(`${""}${$.toStr(_0x20bbx19)}${""}`);
          console.log(`${""}${$.name}${" getSimpleActInfoVo API请求失败，请检查网路重试"}`);
        } else {
          if (_0x20bbx1b && safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
            if (_0x20bbx1b.data) {
              $.shopId = _0x20bbx1b.data.shopId;
              $.userId = _0x20bbx1b.data.venderId;
              $.activityType = _0x20bbx1b.data.activityType;
            } else {
              console.log("异常1：" + JSON.stringify(_0x20bbx1b));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function getCk() {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx1d = {
      url: activityUrl + "/mc/wxMcLevelAndBirthGifts/activity?activityId=" + activityId,
      headers: {
        Cookie: cookie,
        "User-Agent": $.UA
      }
    };
    $.get(_0x20bbx1d, async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          if (_0x20bbx1a && typeof _0x20bbx1a.statusCode != "undefined") {
            if (_0x20bbx1a.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (_0x20bbx1a.status == 200) {
            refreshToken(_0x20bbx1a);
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function getPin() {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx18 = "userId=" + $.userId + "&token=" + $.Token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + " 3 API请求失败，请检查网路重试");
        } else {
          if (_0x20bbx1a.status == 200) {
            refreshToken(_0x20bbx1a);
          }
          if (safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
            if (_0x20bbx1b.result && _0x20bbx1b.data) {
              $.Pin = _0x20bbx1b.data.secretPin;
              $.AUTH_C_USER = $.Pin;
              $.attrTouXiang = _0x20bbx1b.data.yunMidImageUrl ? _0x20bbx1b.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
              $.nickName = _0x20bbx1b.data.pin;
            } else {}
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x20bbx17 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x20bbx20 = `${""}`;
    if ($.shopactivityId) {
      _0x20bbx20 = `${",\"activityId\":"}${$.shopactivityId}${""}`;
    }
    const _0x20bbx21 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"shopId\":\""}${$.joinVenderId}${"\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0"}${_0x20bbx20}${",\"channel\":406}"}`;
    const _0x20bbx22 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x20bbx21)
    };
    const _0x20bbx23 = await getH5st("8adfb", _0x20bbx22);
    const _0x20bbx1d = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body="}${_0x20bbx21}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x20bbx23)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x20bbx1d, async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        _0x20bbx1b = _0x20bbx1b && _0x20bbx1b.match(/jsonp_.*?\((.*?)\);/) && _0x20bbx1b.match(/jsonp_.*?\((.*?)\);/)[1] || _0x20bbx1b;
        let _0x20bbx24 = $.toObj(_0x20bbx1b, _0x20bbx1b);
        if (_0x20bbx24 && typeof _0x20bbx24 == "object") {
          if (_0x20bbx24 && _0x20bbx24.success === true) {
            console.log(`${" >> "}${_0x20bbx24.message}${""}`);
            $.errorJoinShop = _0x20bbx24.message;
            if (_0x20bbx24.result && _0x20bbx24.result.giftInfo) {
              for (let _0x20bbx14 of _0x20bbx24.result.giftInfo.giftList) {
                console.log(`${" >> 入会获得："}${_0x20bbx14.discountString}${""}${_0x20bbx14.prizeName}${""}${_0x20bbx14.secondLineDesc}${""}`);
              }
            }
          } else {
            if (_0x20bbx24 && typeof _0x20bbx24 == "object" && _0x20bbx24.message) {
              $.errorJoinShop = _0x20bbx24.message;
              console.log(`${""}${_0x20bbx24.message || ""}${""}`);
            } else {
              console.log(_0x20bbx1b);
            }
          }
        } else {
          console.log(_0x20bbx1b);
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x20bbx17 => {
    const _0x20bbx21 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"channel\":406,\"payUpShop\":true}"}`;
    const _0x20bbx22 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x20bbx21)
    };
    const _0x20bbx23 = await getH5st("8adfb", _0x20bbx22);
    const _0x20bbx1d = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body="}${_0x20bbx21}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x20bbx23)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x20bbx1d, async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        _0x20bbx1b = _0x20bbx1b && _0x20bbx1b.match(/jsonp_.*?\((.*?)\);/) && _0x20bbx1b.match(/jsonp_.*?\((.*?)\);/)[1] || _0x20bbx1b;
        let _0x20bbx24 = $.toObj(_0x20bbx1b, _0x20bbx1b);
        if (_0x20bbx24 && typeof _0x20bbx24 == "object") {
          if (_0x20bbx24 && _0x20bbx24.success == true) {
            console.log(`${"去加入："}${_0x20bbx24.result.shopMemberCardInfo.venderCardName || ""}${" ("}${$.joinVenderId}${")"}`);
            $.shopactivityId = _0x20bbx24.result.interestsRuleList && _0x20bbx24.result.interestsRuleList[0] && _0x20bbx24.result.interestsRuleList[0].interestsInfo && _0x20bbx24.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else {
          console.log(_0x20bbx1b);
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function getH5st(_0x20bbx27, _0x20bbx22) {
  return new Promise(async _0x20bbx17 => {
    let _0x20bbx1d = {
      url: `${"http://api.kingran.cf/h5st"}`,
      body: `${"businessId="}${_0x20bbx27}${"&req="}${encodeURIComponent(JSON.stringify(_0x20bbx22))}${""}`,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      timeout: 30 * 1000
    };
    $.post(_0x20bbx1d, (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log(JSON.stringify(_0x20bbx19));
          console.log(`${""}${$.name}${" getSign API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17(_0x20bbx1b);
      }
    });
  });
}
function getUserInfo() {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx18 = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/wxActionCommon/getUserInfo", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + " 6-1 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
            if (_0x20bbx1b.result && _0x20bbx1b.data) {
              $.attrTouXiang = _0x20bbx1b.data.yunMidImageUrl ? _0x20bbx1b.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
            } else {
              console.log("异常6-2：" + JSON.stringify(_0x20bbx1b));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function saveBirthDay(_0x20bbx2a = 0) {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx2b = encodeURIComponent(encodeURIComponent($.Pin));
    var _0x20bbx2c = new Date();
    var _0x20bbx2d = _0x20bbx2c.getFullYear();
    var _0x20bbx2e = _0x20bbx2c.getMonth() + 1;
    _0x20bbx2e = _0x20bbx2e < 10 ? "0" + _0x20bbx2e : _0x20bbx2e;
    var _0x20bbx2f = _0x20bbx2c.getDate();
    _0x20bbx2f = _0x20bbx2f < 10 ? "0" + _0x20bbx2f : _0x20bbx2f;
    $.birthDays = `${""}${_0x20bbx2d}${"-"}${_0x20bbx2e}${"-"}${_0x20bbx2f}${""}`;
    if ($.index == 1) {
      console.log("登记当前日期：" + $.birthDays);
    }
    let _0x20bbx18 = `${"venderId="}${$.userId}${"&pin="}${_0x20bbx2b}${"&birthDay="}${$.birthDays}${""}`;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/saveBirthDay", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + "saveBirthDay 请求失败，请检查网路重试");
        } else {
          if (_0x20bbx1a.status == 200) {
            refreshToken(_0x20bbx1a);
          }
          if (safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function getBirthInfo(_0x20bbx2a = 0) {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx2b = encodeURIComponent(encodeURIComponent($.Pin));
    let _0x20bbx18 = `${"venderId="}${$.userId}${"&pin="}${_0x20bbx2b}${""}`;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/getBirthInfo", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + "getBirthInfo 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
            if (!_0x20bbx1b.result) {
              $.notx == true;
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function getMemberLevel(_0x20bbx2a = 0) {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx2b = encodeURIComponent(encodeURIComponent($.Pin));
    let _0x20bbx18 = `${"venderId="}${$.userId}${"&pin="}${_0x20bbx2b}${""}`;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/getMemberLevel", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + "getMemberLevel 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
            if (_0x20bbx1b.result && _0x20bbx1b.data) {
              $.level = _0x20bbx1b.data.level;
              $.levelName = _0x20bbx1b.data.levelName;
            } else {
              console.log(_0x20bbx1b.errorMessage || "");
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function activityContent(_0x20bbx2a = 0) {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx2b = encodeURIComponent(encodeURIComponent($.Pin));
    let _0x20bbx18 = `${"activityId="}${activityId}${"&pin="}${_0x20bbx2b}${"&level="}${$.level}${""}`;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/activityContent", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + "activityContent 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
            if (_0x20bbx1b.result && _0x20bbx1b.data) {
              $.actName = _0x20bbx1b.data.actName;
            } else {
              console.log(_0x20bbx1b.errorMessage || "");
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function sendBirthGifts(_0x20bbx2a = 0) {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx2b = encodeURIComponent(encodeURIComponent($.Pin));
    let _0x20bbx18 = `${"venderId="}${$.userId}${"&activityId="}${activityId}${"&pin="}${_0x20bbx2b}${"&level="}${$.level}${""}`;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/sendBirthGifts", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + "sendBirthGifts 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
            if (_0x20bbx1b.result && _0x20bbx1b.data) {
              $.birthdayData = _0x20bbx1b.data.birthdayData;
              for (o of $.birthdayData) {
                $.beanNum = o.beanNum;
                $.names = o.name;
                console.log("获得：" + $.beanNum + $.names);
              }
            } else {
              errorMessage = _0x20bbx1b.errorMessage || _0x20bbx1b.data.birthdayError;
              if (errorMessage) {
                console.log(errorMessage);
                for (let _0x20bbx12 of stopKeywords) {
                  if (errorMessage.includes(_0x20bbx12)) {
                    $.activityEnd = true;
                    break;
                  }
                }
              } else {
                console.log(_0x20bbx1b);
              }
            }
          }
        }
      } catch (_0x20bbx12) {
        $.logErr(_0x20bbx12, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function sendLevelGifts(_0x20bbx2a = 0) {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx2b = encodeURIComponent(encodeURIComponent($.Pin));
    let _0x20bbx18 = `${"venderId="}${$.userId}${"&activityId="}${activityId}${"&pin="}${_0x20bbx2b}${"&level="}${$.level}${""}`;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/sendLevelGifts", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + "sendLevelGifts 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
            if (_0x20bbx1b.result && _0x20bbx1b.data) {
              $.levelData = _0x20bbx1b.data.levelData;
              for (o of $.levelData) {
                $.beanNum = o.beanNum;
                $.names = o.name;
                console.log("获得：" + $.beanNum + $.names);
              }
            } else {
              if (_0x20bbx1b.errorMessage || _0x20bbx1b.data.levelError) {
                console.log(_0x20bbx1b.errorMessage || _0x20bbx1b.data.levelError || "");
              } else {
                console.log(JSON.stringify(_0x20bbx1b));
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(_0x20bbx17 => {
    let _0x20bbx18 = "activityType=" + $.activityType + "&venderId=" + $.userId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", _0x20bbx18), async (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.getOpenCardInfo + "API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x20bbx1b)) {
            _0x20bbx1b = JSON.parse(_0x20bbx1b);
            if (_0x20bbx1b.result && _0x20bbx1b.data) {
              $.openedCard = _0x20bbx1b.data.openedCard || false;
              if (_0x20bbx1b.data.openCardLink) {
                $.channel = _0x20bbx1b.data.openCardLink.match(/channel=(\d+)/)[1];
                $.joinVenderId = _0x20bbx1b.data.openCardLink.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function taskPostUrl(_0x20bbx37, _0x20bbx18) {
  return {
    url: "" + activityUrl + _0x20bbx37,
    body: _0x20bbx18,
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      Host: `${"cjhydz-isv.isvjcloud.com"}`,
      Origin: `${"https://cjhydz-isv.isvjcloud.com"}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: activityUrl + "/mc/wxMcLevelAndBirthGifts/activity?activityId=" + activityId,
      Cookie: activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function taskUrl(_0x20bbx37, _0x20bbx18) {
  return {
    url: "https://api.m.jd.com/client.action" + _0x20bbx37,
    body: _0x20bbx18,
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
function accessLog() {
  return new Promise(async _0x20bbx17 => {
    const _0x20bbx1d = {
      url: `${"https://cjhydz-isv.isvjcloud.com/common/accessLog"}`,
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        Host: `${"cjhydz-isv.isvjcloud.com"}`,
        Origin: `${"https://cjhydz-isv.isvjcloud.com"}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: activityUrl + "/mc/wxMcLevelAndBirthGifts/activity?activityId=" + activityId,
        Cookie: activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      body: `${"venderId="}${$.userId}${"&code=40&pin="}${encodeURIComponent(encodeURIComponent($.Pin))}${"&activityId="}${activityId}${"&pageUrl=https%3A%2F%2F$cjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D"}${activityId}${"&subType=app"}`
    };
    $.post(_0x20bbx1d, (_0x20bbx19, _0x20bbx1a, _0x20bbx1b) => {
      try {
        if (_0x20bbx19) {
          console.log("" + JSON.stringify(_0x20bbx19));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0x20bbx1a.status == 200) {
            refreshToken(_0x20bbx1a);
          }
        }
      } catch (e) {
        $.logErr(e, _0x20bbx1a);
      } finally {
        _0x20bbx17();
      }
    });
  });
}
function refreshToken(_0x20bbx1a) {
  if (_0x20bbx1a) {
    if (_0x20bbx1a.headers["set-cookie"]) {
      cookie = `${""}${originCookie}${""}`;
      for (let _0x20bbx3b of _0x20bbx1a.headers["set-cookie"]) {
        lz_cookie[_0x20bbx3b.split(";")[0].substr(0, _0x20bbx3b.split(";")[0].indexOf("="))] = _0x20bbx3b.split(";")[0].substr(_0x20bbx3b.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x20bbx3c of Object.keys(lz_cookie)) {
        cookie += _0x20bbx3c + "=" + lz_cookie[_0x20bbx3c] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = `${"jdapp;iPhone;10.2.2;14.3;"}${randomString(40)}${";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"}`;
}
function randomString(_0x20bbx12) {
  _0x20bbx12 = _0x20bbx12 || 32;
  let _0x20bbx3f = "abcdef0123456789",
    _0x20bbx40 = _0x20bbx3f.length,
    _0x20bbx41 = "";
  for (i = 0; i < _0x20bbx12; i++) {
    _0x20bbx41 += _0x20bbx3f.charAt(Math.floor(Math.random() * _0x20bbx40));
  }
  return _0x20bbx41;
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x20bbx43 = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x20bbx43.join("&") + "\n");
  let _0x20bbx44 = _0x20bbx43;
  let _0x20bbx45 = [];
  let _0x20bbx46 = false;
  for (let _0x20bbx14 = 0; _0x20bbx14 < cookiesArr.length; _0x20bbx14++) {
    let _0x20bbx47 = decodeURIComponent(cookiesArr[_0x20bbx14].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x20bbx14].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x20bbx47) {
      break;
    }
    let _0x20bbx48 = false;
    for (let _0x20bbx41 of _0x20bbx44) {
      if (_0x20bbx41 && _0x20bbx41 == _0x20bbx47) {
        _0x20bbx48 = true;
        break;
      }
    }
    if (!_0x20bbx48) {
      _0x20bbx46 = true;
      _0x20bbx45.splice(_0x20bbx14, -1, cookiesArr[_0x20bbx14]);
    }
  }
  if (_0x20bbx46) {
    cookiesArr = _0x20bbx45;
  }
}
function toFirst(_0x20bbx45, _0x20bbx4a) {
  if (_0x20bbx4a != 0) {
    _0x20bbx45.unshift(_0x20bbx45.splice(_0x20bbx4a, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x20bbx43 = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x20bbx43.join("&") + "\n");
  let _0x20bbx45 = [];
  let _0x20bbx4c = _0x20bbx43;
  for (let _0x20bbx14 in cookiesArr) {
    let _0x20bbx47 = decodeURIComponent(cookiesArr[_0x20bbx14].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x20bbx14].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x20bbx4c.includes(_0x20bbx47)) {
      _0x20bbx45.push(cookiesArr[_0x20bbx14]);
    }
  }
  helpCookiesArr = _0x20bbx45;
  if (_0x20bbx4c.length > 1) {
    for (let _0x20bbx41 in _0x20bbx4c) {
      let _0x20bbx4d = _0x20bbx4c[_0x20bbx4c.length - 1 - _0x20bbx41];
      if (!_0x20bbx4d) {
        continue;
      }
      for (let _0x20bbx14 in helpCookiesArr) {
        let _0x20bbx47 = decodeURIComponent(helpCookiesArr[_0x20bbx14].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x20bbx14].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x20bbx4d == _0x20bbx47) {
          toFirst(helpCookiesArr, _0x20bbx14);
        }
      }
    }
  }
}
function safeGet(_0x20bbx1b) {
  try {
    if (typeof JSON.parse(_0x20bbx1b) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`${"京东服务器访问数据为空，请检查自身设备网络情况"}`);
    return false;
  }
}
function jsonParse(_0x20bbx50) {
  if (typeof _0x20bbx50 == "string") {
    try {
      return JSON.parse(_0x20bbx50);
    } catch (e) {
      console.log(e);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}