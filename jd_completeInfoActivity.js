/*
活动名称：完善信息有礼 · 超级无线
活动地址：https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=<活动id>&venderId=<店铺id>

必须条件：配置文件或者环境变量中添加变量：
## CJ完善有礼-jd_completeInfoActivity.js
//export jd_completeInfoActivity_activityId="活动ID"
//export jd_completeInfoActivity_activityUrl="https://cjhydz-isv.isvjcloud.com"
//export jd_completeInfoActivity_venderId="店铺ID"
//export jd_completeInfoActivity_num //运行账号数量，默认运行前7
//export jd_completeInfoActivity_openCard //是否开卡，需要开卡变量值为 true，默认不开卡
//export JD_CJ_OPEN="false" //关闭CJ相关活动运行
//export jd_completeInfoActivity_blacklist //黑名单 用&隔开 pin值

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#CJ完善有礼-加密
1 1 1 1 * jd_completeInfoActivity.js, tag=CJ完善有礼-加密, enabled=true
*/

let jd_completeInfoActivity_activityId = "" // 活动id
let jd_completeInfoActivity_venderId = "" // 店铺id
let jd_completeInfoActivity_activityUrl = "https://cjhydz-isv.isvjcloud.com" // 活动地址

const Env=require('./utils/Env.js');
const $ = new Env("完善信息有礼");
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const getToken = require("./function/krgetToken");
let lz_cookie = {};
let activityCookie = "";
let stopKeywords = ["未开始", "已结束", "来晚了", "非法操作", "京豆计划", "奖品发送失败", "发放完", "已发完", "已领完", "抢光了", "全部被领取", "余额不足"];
$.activityEnd = false;
$.selectByIds = false;
let cookiesArr = [],
  cookie = "",
  message = "";
activityId = jd_completeInfoActivity_activityId;
activityUrl = jd_completeInfoActivity_activityUrl;
venderId = jd_completeInfoActivity_venderId;
let CookieNum = 7;
if (process.env.jd_completeInfoActivity_num && process.env.jd_completeInfoActivity_num != 7) {
  CookieNum = process.env.jd_completeInfoActivity_num;
}
let jd_completeInfoActivity_openCard = $.isNode() ? process.env.jd_completeInfoActivity_openCard ? process.env.jd_completeInfoActivity_openCard : false : $.getdata("jd_completeInfoActivity_openCard") ? $.getdata("jd_completeInfoActivity_openCard") : false;
if ($.isNode()) {
  if (process.env.jd_completeInfoActivity_activityId) {
    activityId = process.env.jd_completeInfoActivity_activityId;
  }
  if (process.env.jd_completeInfoActivity_activityUrl) {
    activityUrl = process.env.jd_completeInfoActivity_activityUrl;
  }
  if (process.env.jd_completeInfoActivity_venderId) {
    venderId = process.env.jd_completeInfoActivity_venderId;
  }
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(jdCookieNode).forEach(_0x9342xd => {
    cookiesArr.push(jdCookieNode[_0x9342xd]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x9342xd => {
    return _0x9342xd.cookie;
  })].filter(_0x9342xd => {
    return !!_0x9342xd;
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
$.whitelist = process.env.jd_completeInfoActivity_whitelist || whitelist;
$.blacklist = process.env.jd_completeInfoActivity_blacklist || blacklist;
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
  console.log("活动入口：https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let _0x9342x13 = 0; _0x9342x13 < CookieNum; _0x9342x13++) {
    if (cookiesArr[_0x9342x13]) {
      cookie = cookiesArr[_0x9342x13];
      originCookie = cookiesArr[_0x9342x13];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x9342x13 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.activityEnd = false;
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
      await completeInfoActivity();
      await $.wait(4000);
      if ($.hasEnd || $.maxcountnum || $.outFlag || $.activityEnd) {
        break;
      }
    }
  }
})().catch(_0x9342x12 => {
  $.log("", `${" "}${$.name}${", 失败! 原因: "}${_0x9342x12}${"!"}`, "");
}).finally(() => {
  $.done();
});
async function completeInfoActivity() {
  $.sid = "";
  $.userId = venderId;
  $.Token = "";
  $.Pin = "";
  $.hisPin = "";
  $.card = [];
  await getCk();
  if ($.outFlag) {
    console.log("此ip已被限制，请过更换IP后或者等待一会儿再执行脚本\n");
    return;
  }
  $.Token = await getToken(originCookie, "https://cjhydz-isv.isvjcloud.com");
  if ($.Token == "") {
    console.log("获取[token]失败！");
    return;
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
      if (jd_completeInfoActivity_openCard) {
        $.shopactivityId = "";
        $.joinVenderId = venderId;
        await getshopactivityId();
        for (let _0x9342x13 = 0; _0x9342x13 < Array(5).length; _0x9342x13++) {
          if (_0x9342x13 > 0) {
            console.log(`${"第"}${_0x9342x13}${"次 重新开卡"}`);
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
        console.log("如需入会请设置环境变量 [jd_completeInfoActivity_openCard]，变量值为 true");
      }
    }
    if (!$.openedCard) {
      return;
    }
    await selectById();
    if ($.selectByIds) {
      await $.wait(1000);
      await listDrawContent();
      await $.wait(1000);
      await save();
    } else {
      console.log("已经领取过奖励了哦~");
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function showMsg() {
  return new Promise(_0x9342x16 => {
    $.msg($.name, "", `${"【京东账号"}${$.index}${"】"}${$.nickName}${"\\n"}${message}${""}`);
    _0x9342x16();
  });
}
function getSimpleActInfoVo() {
  return new Promise(_0x9342x16 => {
    let _0x9342x18 = `${"activityId="}${activityId}${""}`;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", _0x9342x18), async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          console.log(`${""}${$.toStr(_0x9342x19)}${""}`);
          console.log(`${""}${$.name}${" getSimpleActInfoVo API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
function getCk() {
  return new Promise(_0x9342x16 => {
    let _0x9342x1d = {
      url: activityUrl + "/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId,
      headers: {
        Cookie: cookie,
        "User-Agent": $.UA
      }
    };
    $.get(_0x9342x1d, async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          if (_0x9342x1a && typeof _0x9342x1a.statusCode != "undefined") {
            if (_0x9342x1a.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + JSON.stringify(_0x9342x19));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (_0x9342x1a.status == 200) {
            refreshToken(_0x9342x1a);
          }
        }
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
function getPin() {
  return new Promise(_0x9342x16 => {
    let _0x9342x18 = "userId=" + $.userId + "&token=" + $.Token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", _0x9342x18), async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          console.log("" + JSON.stringify(_0x9342x19));
          console.log($.name + " 3 API请求失败，请检查网路重试");
        } else {
          if (_0x9342x1a.status == 200) {
            refreshToken(_0x9342x1a);
          }
          if (safeGet(_0x9342x1b)) {
            _0x9342x1b = JSON.parse(_0x9342x1b);
            if (_0x9342x1b.result && _0x9342x1b.data) {
              $.Pin = _0x9342x1b.data.secretPin;
              $.AUTH_C_USER = $.Pin;
              $.attrTouXiang = _0x9342x1b.data.yunMidImageUrl ? _0x9342x1b.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
              $.nickName = _0x9342x1b.data.pin;
            } else {}
          }
        }
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x9342x16 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x9342x20 = `${""}`;
    if ($.shopactivityId) {
      _0x9342x20 = `${",\"activityId\":"}${$.shopactivityId}${""}`;
    }
    const _0x9342x21 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"shopId\":\""}${$.joinVenderId}${"\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0"}${_0x9342x20}${",\"channel\":406}"}`;
    const _0x9342x22 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x9342x21)
    };
    const _0x9342x23 = await getH5st("8adfb", _0x9342x22);
    const _0x9342x1d = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body="}${_0x9342x21}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x9342x23)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x9342x1d, async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        _0x9342x1b = _0x9342x1b && _0x9342x1b.match(/jsonp_.*?\((.*?)\);/) && _0x9342x1b.match(/jsonp_.*?\((.*?)\);/)[1] || _0x9342x1b;
        let _0x9342x24 = $.toObj(_0x9342x1b, _0x9342x1b);
        if (_0x9342x24 && typeof _0x9342x24 == "object") {
          if (_0x9342x24 && _0x9342x24.success === true) {
            console.log(`${" >> "}${_0x9342x24.message}${""}`);
            $.errorJoinShop = _0x9342x24.message;
            if (_0x9342x24.result && _0x9342x24.result.giftInfo) {
              for (let _0x9342x13 of _0x9342x24.result.giftInfo.giftList) {
                console.log(`${" >> 入会获得："}${_0x9342x13.discountString}${""}${_0x9342x13.prizeName}${""}${_0x9342x13.secondLineDesc}${""}`);
              }
            }
          } else {
            if (_0x9342x24 && typeof _0x9342x24 == "object" && _0x9342x24.message) {
              $.errorJoinShop = _0x9342x24.message;
              console.log(`${""}${_0x9342x24.message || ""}${""}`);
            } else {
              console.log(_0x9342x1b);
            }
          }
        } else {
          console.log(_0x9342x1b);
        }
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x9342x16 => {
    const _0x9342x21 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"channel\":406,\"payUpShop\":true}"}`;
    const _0x9342x22 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x9342x21)
    };
    const _0x9342x23 = await getH5st("8adfb", _0x9342x22);
    const _0x9342x1d = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body="}${_0x9342x21}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x9342x23)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x9342x1d, async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        _0x9342x1b = _0x9342x1b && _0x9342x1b.match(/jsonp_.*?\((.*?)\);/) && _0x9342x1b.match(/jsonp_.*?\((.*?)\);/)[1] || _0x9342x1b;
        let _0x9342x24 = $.toObj(_0x9342x1b, _0x9342x1b);
        if (_0x9342x24 && typeof _0x9342x24 == "object") {
          if (_0x9342x24 && _0x9342x24.success == true) {
            console.log(`${"去加入："}${_0x9342x24.result.shopMemberCardInfo.venderCardName || ""}${" ("}${$.joinVenderId}${")"}`);
            $.shopactivityId = _0x9342x24.result.interestsRuleList && _0x9342x24.result.interestsRuleList[0] && _0x9342x24.result.interestsRuleList[0].interestsInfo && _0x9342x24.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else {
          console.log(_0x9342x1b);
        }
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
function getH5st(_0x9342x27, _0x9342x22) {
  return new Promise(async _0x9342x16 => {
    let _0x9342x1d = {
      url: `${"http://api.kingran.cf/h5st"}`,
      body: `${"businessId="}${_0x9342x27}${"&req="}${encodeURIComponent(JSON.stringify(_0x9342x22))}${""}`,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      timeout: 30 * 1000
    };
    $.post(_0x9342x1d, (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          console.log(JSON.stringify(_0x9342x19));
          console.log(`${""}${$.name}${" getSign API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16(_0x9342x1b);
      }
    });
  });
}
function getUserInfo() {
  return new Promise(_0x9342x16 => {
    let _0x9342x18 = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/wxActionCommon/getUserInfo", _0x9342x18), async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          console.log("" + JSON.stringify(_0x9342x19));
          console.log($.name + " 6-1 API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x9342x1b)) {
            _0x9342x1b = JSON.parse(_0x9342x1b);
            if (_0x9342x1b.result && _0x9342x1b.data) {
              $.attrTouXiang = _0x9342x1b.data.yunMidImageUrl ? _0x9342x1b.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
            } else {
              console.log("异常6-2：" + JSON.stringify(_0x9342x1b));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
function save(_0x9342x2a = 0) {
  return new Promise(_0x9342x16 => {
    let _0x9342x2b = encodeURIComponent(encodeURIComponent($.Pin));
    let _0x9342x2c = ["%E7%BE%8E%E7%BE%8E", "%E5%B8%85%E5%B8%85", "%E6%B0%A7%E6%B0%94", "%E5%A4%A7%E5%93%A5", "%E8%A1%B0%E4%BB%94"];
    let _0x9342x2e = 0;
    _0x9342x2e = Math.floor(Math.random() * _0x9342x2c.length);
    $.content = _0x9342x2c[_0x9342x2e] ? _0x9342x2c[_0x9342x2e] : $.content;
    $.authorNum = `${""}${random(10000000, 99999999)}${""}`;
    $.phone = `${"150"}${$.authorNum}${""}`;
    var _0x9342x2f = new Date();
    var _0x9342x30 = _0x9342x2f.getFullYear();
    var _0x9342x31 = _0x9342x2f.getMonth() + 1;
    _0x9342x31 = _0x9342x31 < 10 ? "0" + _0x9342x31 : _0x9342x31;
    var _0x9342x32 = _0x9342x2f.getDate();
    _0x9342x32 = _0x9342x32 < 10 ? "0" + _0x9342x32 : _0x9342x32;
    $.birthDays = `${""}${_0x9342x30}${"-"}${_0x9342x31}${"-"}${_0x9342x32}${""}`;
    let _0x9342x18 = `${"name="}${$.content}${"&phone="}${$.phone}${"&birthDay="}${$.birthDays}${"&customContent=%5B%5D&venderId="}${venderId}${"&activityId="}${activityId}${"&pin="}${_0x9342x2b}${"&token="}${$.Token}${"&drawInfoId="}${$.drawInfoId}${"&vcode=&fromType=APP"}`;
    $.post(taskPostUrl("/wx/completeInfoActivity/save", _0x9342x18), async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          console.log("" + JSON.stringify(_0x9342x19));
          console.log($.name + "save 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x9342x1b)) {
            _0x9342x1b = JSON.parse(_0x9342x1b);
            if (_0x9342x1b.result && _0x9342x1b.data) {
              if (_0x9342x1b.data.drawOk == true) {
                console.log("获得：" + _0x9342x1b.data.name);
              } else {
                console.log(_0x9342x1b);
              }
            } else {
              if (_0x9342x1b.errorMessage) {
                for (let _0x9342x12 of stopKeywords) {
                  if (_0x9342x1b.errorMessage.includes(_0x9342x12)) {
                    $.activityEnd = true;
                    break;
                  }
                }
              } else {
                console.log(_0x9342x1b);
              }
            }
          }
        }
      } catch (_0x9342x12) {
        $.logErr(_0x9342x12, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
function listDrawContent(_0x9342x2a = 0) {
  return new Promise(_0x9342x16 => {
    let _0x9342x18 = `${"activityId="}${activityId}${"&type=63"}`;
    $.post(taskPostUrl("/drawContent/listDrawContent", _0x9342x18), async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          console.log("" + JSON.stringify(_0x9342x19));
          console.log($.name + "listDrawContent 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x9342x1b)) {
            _0x9342x1b = JSON.parse(_0x9342x1b);
            if (_0x9342x1b.result && _0x9342x1b.data) {
              $.listDrawContents = _0x9342x1b.data || [];
              for (const _0x9342x34 of $.listDrawContents) {
                $.drawInfoId = _0x9342x34.drawInfoId;
              }
            } else {
              if (res.errorMessage.indexOf("结束") > -1) {
                $.activityEnd = true;
              }
              console.log(_0x9342x1b.errorMessage || "");
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
function selectById(_0x9342x2a = 0) {
  return new Promise(_0x9342x16 => {
    let _0x9342x2b = encodeURIComponent(encodeURIComponent($.Pin));
    let _0x9342x18 = `${"venderId="}${venderId}${"&activityId="}${activityId}${"&pin="}${_0x9342x2b}${""}`;
    $.post(taskPostUrl("/wx/completeInfoActivity/selectById", _0x9342x18), async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          console.log("" + JSON.stringify(_0x9342x19));
          console.log($.name + "selectById 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x9342x1b)) {
            _0x9342x1b = JSON.parse(_0x9342x1b);
            if (_0x9342x1b.result == false) {
              $.selectByIds = true;
            } else {
              console.log("已经填写过信息了哦~");
              $.selectByIds = false;
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(_0x9342x16 => {
    let _0x9342x18 = "activityType=40&venderId=" + $.userId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", _0x9342x18), async (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          console.log("" + JSON.stringify(_0x9342x19));
          console.log($.getOpenCardInfo + "API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x9342x1b)) {
            _0x9342x1b = JSON.parse(_0x9342x1b);
            if (_0x9342x1b.result && _0x9342x1b.data) {
              $.openedCard = _0x9342x1b.data.openedCard || false;
              if (_0x9342x1b.data.openCardLink) {
                $.channel = _0x9342x1b.data.openCardLink.match(/channel=(\d+)/)[1];
                $.joinVenderId = _0x9342x1b.data.openCardLink.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
function taskPostUrl(_0x9342x38, _0x9342x18) {
  return {
    url: "" + activityUrl + _0x9342x38,
    body: _0x9342x18,
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      Host: `${"cjhydz-isv.isvjcloud.com"}`,
      Origin: `${"https://cjhydz-isv.isvjcloud.com"}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: activityUrl + "/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId,
      Cookie: activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function taskUrl(_0x9342x38, _0x9342x18) {
  return {
    url: "https://api.m.jd.com/client.action" + _0x9342x38,
    body: _0x9342x18,
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
  return new Promise(async _0x9342x16 => {
    const _0x9342x1d = {
      url: `${"https://cjhydz-isv.isvjcloud.com/common/accessLog"}`,
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        Host: `${"cjhydz-isv.isvjcloud.com"}`,
        Origin: `${"https://cjhydz-isv.isvjcloud.com"}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: activityUrl + "/wx/completeInfoActivity/view/activity?activityId=" + activityId + "&venderId=" + venderId,
        Cookie: activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      body: `${"venderId="}${venderId}${"&code=40&pin="}${encodeURIComponent(encodeURIComponent($.Pin))}${"&activityId="}${activityId}${"&pageUrl=https%3A%2F%2F$cjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D"}${activityId}${"&subType=app"}`
    };
    $.post(_0x9342x1d, (_0x9342x19, _0x9342x1a, _0x9342x1b) => {
      try {
        if (_0x9342x19) {
          console.log("" + JSON.stringify(_0x9342x19));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0x9342x1a.status == 200) {
            refreshToken(_0x9342x1a);
          }
        }
      } catch (e) {
        $.logErr(e, _0x9342x1a);
      } finally {
        _0x9342x16();
      }
    });
  });
}
function refreshToken(_0x9342x1a) {
  if (_0x9342x1a) {
    if (_0x9342x1a.headers["set-cookie"]) {
      cookie = `${""}${originCookie}${";"}`;
      for (let _0x9342x3c of _0x9342x1a.headers["set-cookie"]) {
        lz_cookie[_0x9342x3c.split(";")[0].substr(0, _0x9342x3c.split(";")[0].indexOf("="))] = _0x9342x3c.split(";")[0].substr(_0x9342x3c.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x9342x34 of Object.keys(lz_cookie)) {
        cookie += _0x9342x34 + "=" + lz_cookie[_0x9342x34] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = `${"jdapp;iPhone;10.2.2;14.3;"}${randomString(40)}${";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"}`;
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x9342x3f = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x9342x3f.join("&") + "\n");
  let _0x9342x40 = _0x9342x3f;
  let _0x9342x41 = [];
  let _0x9342x42 = false;
  for (let _0x9342x13 = 0; _0x9342x13 < cookiesArr.length; _0x9342x13++) {
    let _0x9342x2d = decodeURIComponent(cookiesArr[_0x9342x13].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x9342x13].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x9342x2d) {
      break;
    }
    let _0x9342x43 = false;
    for (let _0x9342x2e of _0x9342x40) {
      if (_0x9342x2e && _0x9342x2e == _0x9342x2d) {
        _0x9342x43 = true;
        break;
      }
    }
    if (!_0x9342x43) {
      _0x9342x42 = true;
      _0x9342x41.splice(_0x9342x13, -1, cookiesArr[_0x9342x13]);
    }
  }
  if (_0x9342x42) {
    cookiesArr = _0x9342x41;
  }
}
function toFirst(_0x9342x41, _0x9342x45) {
  if (_0x9342x45 != 0) {
    _0x9342x41.unshift(_0x9342x41.splice(_0x9342x45, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x9342x3f = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x9342x3f.join("&") + "\n");
  let _0x9342x41 = [];
  let _0x9342x47 = _0x9342x3f;
  for (let _0x9342x13 in cookiesArr) {
    let _0x9342x2d = decodeURIComponent(cookiesArr[_0x9342x13].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x9342x13].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x9342x47.includes(_0x9342x2d)) {
      _0x9342x41.push(cookiesArr[_0x9342x13]);
    }
  }
  helpCookiesArr = _0x9342x41;
  if (_0x9342x47.length > 1) {
    for (let _0x9342x2e in _0x9342x47) {
      let _0x9342x48 = _0x9342x47[_0x9342x47.length - 1 - _0x9342x2e];
      if (!_0x9342x48) {
        continue;
      }
      for (let _0x9342x13 in helpCookiesArr) {
        let _0x9342x2d = decodeURIComponent(helpCookiesArr[_0x9342x13].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x9342x13].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x9342x48 == _0x9342x2d) {
          toFirst(helpCookiesArr, _0x9342x13);
        }
      }
    }
  }
}
function randomString(_0x9342x12) {
  _0x9342x12 = _0x9342x12 || 32;
  let _0x9342x4a = "abcdef0123456789",
    _0x9342x4b = _0x9342x4a.length,
    _0x9342x2e = "";
  for (i = 0; i < _0x9342x12; i++) {
    _0x9342x2e += _0x9342x4a.charAt(Math.floor(Math.random() * _0x9342x4b));
  }
  return _0x9342x2e;
}
function safeGet(_0x9342x1b) {
  try {
    if (typeof JSON.parse(_0x9342x1b) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`${"京东服务器访问数据为空，请检查自身设备网络情况"}`);
    return false;
  }
}
function jsonParse(_0x9342x4e) {
  if (typeof _0x9342x4e == "string") {
    try {
      return JSON.parse(_0x9342x4e);
    } catch (e) {
      console.log(e);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function random(_0x9342x50, _0x9342x51) {
  return Math.floor(Math.random() * (_0x9342x51 - _0x9342x50)) + _0x9342x50;
}