/*
活动名称：生日礼包/会员等级礼包 · 超级会员
活动链接：https://cjhy-isv.isvjcloud.com/mc/wxMcLevelAndBirthGifts/activity?activityId=<活动id>
环境变量：jd_wxMcLevelAndBirthGifts_activityId // 活动id
		 jd_wxMcLevelAndBirthGifts_openCard // 是否开卡，默认开卡

*/

const Env=require('./utils/Env.js');
const $ = new Env('生日礼包/会员等级礼包（超级会员）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let jd_wxMcLevelAndBirthGifts_activityId = "",
  jd_wxMcLevelAndBirthGifts_activityUrl = "https://cjhy-isv.isvjcloud.com/",
  lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
activityId = jd_wxMcLevelAndBirthGifts_activityId;
activityUrl = jd_wxMcLevelAndBirthGifts_activityUrl;
let openCard = process.env.jd_wxMcLevelAndBirthGifts_openCard === "false" ? false : true;
if ($.isNode()) {
  if (process.env.jd_wxMcLevelAndBirthGifts_activityId) activityId = process.env.jd_wxMcLevelAndBirthGifts_activityId;
  if (process.env.jd_wxMcLevelAndBirthGifts_activityUrl) activityUrl = process.env.jd_wxMcLevelAndBirthGifts_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(_0x4b1041 => {
    cookiesArr.push(jdCookieNode[_0x4b1041]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x26876e => _0x26876e.cookie)].filter(_0x4b1a9c => !!_0x4b1a9c);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
!(async () => {
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
  for (let _0x1a6152 = 0; _0x1a6152 < cookiesArr.length; _0x1a6152++) {
    if (cookiesArr[_0x1a6152]) {
      cookie = cookiesArr[_0x1a6152];
      originCookie = cookiesArr[_0x1a6152];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x1a6152 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await wxMcLevelAndBirthGifts();
      await $.wait(2000);
      if ($.hasEnd || $.maxcountnum || $.outFlag || $.activityEnd) {
        break;
      }
    }
  }
})().catch(_0x482227 => {
  $.log("", " " + $.name + ", 失败! 原因: " + _0x482227 + "!", "");
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
  $.index == 1 && (await $.wait(1000), await getSimpleActInfoVo());
  if ($.userId) {
    await $.wait(1000);
    if ($.Token) await getPin();
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await accessLog();
    await $.wait(1000);
    await getOpenCardInfo();
    await $.wait(1000);
    if (!$.openedCard && openCard) {
      $.shopactivityId = "";
      $.joinVenderId = $.userId;
      await getshopactivityId();
      for (let _0x1e1384 = 0; _0x1e1384 < Array(5).length; _0x1e1384++) {
        if (_0x1e1384 > 0) console.log("第" + _0x1e1384 + "次 重新开卡");
        await joinShop();
        await $.wait(1000);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) {
          break;
        }
      }
      await getOpenCardInfo();
      await $.wait(1000);
    }
    if (!$.openedCard) return;
    await getMemberLevel();
    await $.wait(1000);
    await activityContent();
    await $.wait(1000);
    switch ($.activityType) {
      case 103:
        if ($.index == 1) console.log("活动类型：生日礼包\n");
        await getBirthInfo();
        await $.wait(1000);
        await saveBirthDay();
        await $.wait(1000);
        await sendBirthGifts();
        await $.wait(1000);
        break;
      case 104:
        if ($.index == 1) console.log("活动类型：会员等级礼包\n");
        await sendLevelGifts();
        await $.wait(1000);
        break;
      case 119:
        console.log("暂未适配升级有礼活动...");
        $.hasEnd = true;
        break;
      default:
        console.log("未知活动类型...");
        $.hasEnd = true;
        break;
    }
  } else {
    console.log("未能获取活动信息");
    $.hasEnd = true;
    return;
  }
}
function getSimpleActInfoVo() {
  return new Promise(_0xcd6f64 => {
    let _0x193683 = "activityId=" + activityId;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", _0x193683), async (_0x13abff, _0x2f23c7, _0x319291) => {
      try {
        if (_0x13abff) {
          console.log(String(_0x13abff));
          console.log($.name + " getSimpleActInfoVo API请求失败，请检查网路重试");
        } else {
          if (_0x319291 && safeGet(_0x319291)) {
            _0x319291 = JSON.parse(_0x319291);
            if (_0x319291.data) {
              $.shopId = _0x319291.data.shopId;
              $.userId = _0x319291.data.venderId;
              $.activityType = _0x319291.data.activityType;
            } else console.log("异常1：" + JSON.stringify(_0x319291));
          }
        }
      } catch (_0x9f1ef9) {
        $.logErr(_0x9f1ef9, _0x2f23c7);
      } finally {
        _0xcd6f64();
      }
    });
  });
}
function getCk() {
  return new Promise(_0x42b8dd => {
    let _0x22ac89 = {
      "url": activityUrl + "/mc/wxMcLevelAndBirthGifts/activity?activityId=" + activityId,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(_0x22ac89, async (_0x156956, _0x5d8e39, _0x372e3e) => {
      try {
        if (_0x156956) {
          if (_0x5d8e39 && typeof _0x5d8e39.statusCode != "undefined") {
            _0x5d8e39.statusCode == 493 && (console.log("getCk 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          }
          console.log("" + JSON.stringify(_0x156956));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else _0x5d8e39.status == 200 && refreshToken(_0x5d8e39);
      } catch (_0x29f807) {
        $.logErr(_0x29f807, _0x5d8e39);
      } finally {
        _0x42b8dd();
      }
    });
  });
}
function getPin() {
  return new Promise(_0x5c08e9 => {
    let _0x24c9da = "userId=" + $.userId + "&token=" + $.Token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", _0x24c9da), async (_0x43b6ad, _0x1761a9, _0x41f5ee) => {
      try {
        if (_0x43b6ad) {
          console.log("" + JSON.stringify(_0x43b6ad));
          console.log($.name + " 3 API请求失败，请检查网路重试");
        } else {
          _0x1761a9.status == 200 && refreshToken(_0x1761a9);
          if (safeGet(_0x41f5ee)) {
            _0x41f5ee = JSON.parse(_0x41f5ee);
            if (_0x41f5ee.result && _0x41f5ee.data) {
              $.Pin = _0x41f5ee.data.secretPin;
              $.AUTH_C_USER = $.Pin;
              $.attrTouXiang = _0x41f5ee.data.yunMidImageUrl ? _0x41f5ee.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
              $.nickName = _0x41f5ee.data.pin;
            } else {}
          }
        }
      } catch (_0x184960) {
        $.logErr(_0x184960, _0x1761a9);
      } finally {
        _0x5c08e9();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x18a5d8 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x1cf163 = "";
    if ($.shopactivityId) _0x1cf163 = ",\"activityId\":" + $.shopactivityId;
    const _0x4e7b0d = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x1cf163 + ",\"channel\":406}",
      _0x30705a = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x4e7b0d)
      },
      _0x2646f1 = await getH5st("8adfb", _0x30705a),
      _0x328f8a = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x4e7b0d + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x2646f1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x328f8a, async (_0x37d666, _0x4e520f, _0x43f547) => {
      try {
        _0x43f547 = _0x43f547 && _0x43f547.match(/jsonp_.*?\((.*?)\);/) && _0x43f547.match(/jsonp_.*?\((.*?)\);/)[1] || _0x43f547;
        let _0x5ed325 = $.toObj(_0x43f547, _0x43f547);
        if (_0x5ed325 && typeof _0x5ed325 == "object") {
          if (_0x5ed325 && _0x5ed325.success === true) {
            console.log(_0x5ed325.message);
            $.errorJoinShop = _0x5ed325.message;
            if (_0x5ed325.result && _0x5ed325.result.giftInfo) for (let _0x4ba76e of _0x5ed325.result.giftInfo.giftList) {
              console.log("入会获得: " + _0x4ba76e.discountString + _0x4ba76e.prizeName + _0x4ba76e.secondLineDesc);
            }
            console.log("");
          } else _0x5ed325 && typeof _0x5ed325 == "object" && _0x5ed325.message ? ($.errorJoinShop = _0x5ed325.message, console.log("" + (_0x5ed325.message || ""))) : console.log(_0x43f547);
        } else {
          console.log(_0x43f547);
        }
      } catch (_0x3768ec) {
        $.logErr(_0x3768ec, _0x4e520f);
      } finally {
        _0x18a5d8();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x4bd6ae => {
    let _0x52d69d = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x236984 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(_0x52d69d)
      },
      _0x1877ea = await getH5st("ef79a", _0x236984),
      _0x57faf4 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x52d69d + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x1877ea),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(_0x57faf4, async (_0x378659, _0x4f9483, _0xb2850a) => {
      try {
        _0xb2850a = _0xb2850a && _0xb2850a.match(/jsonp_.*?\((.*?)\);/) && _0xb2850a.match(/jsonp_.*?\((.*?)\);/)[1] || _0xb2850a;
        let _0x3f7a88 = $.toObj(_0xb2850a, _0xb2850a);
        _0x3f7a88 && typeof _0x3f7a88 == "object" ? _0x3f7a88 && _0x3f7a88.success == true && (console.log("去加入店铺会员：" + (_0x3f7a88.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x3f7a88.result.interestsRuleList && _0x3f7a88.result.interestsRuleList[0] && _0x3f7a88.result.interestsRuleList[0].interestsInfo && _0x3f7a88.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0xb2850a);
      } catch (_0x2ce745) {
        $.logErr(_0x2ce745, _0x4f9483);
      } finally {
        _0x4bd6ae();
      }
    });
  });
}
function getUserInfo() {
  return new Promise(_0x372a3c => {
    let _0x524a76 = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/wxActionCommon/getUserInfo", _0x524a76), async (_0x24d4bc, _0x5c5597, _0x418025) => {
      try {
        _0x24d4bc ? (console.log("" + JSON.stringify(_0x24d4bc)), console.log($.name + " 6-1 API请求失败，请检查网路重试")) : safeGet(_0x418025) && (_0x418025 = JSON.parse(_0x418025), _0x418025.result && _0x418025.data ? $.attrTouXiang = _0x418025.data.yunMidImageUrl ? _0x418025.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg" : console.log("异常6-2：" + JSON.stringify(_0x418025)));
      } catch (_0x2531ac) {
        $.logErr(_0x2531ac, _0x5c5597);
      } finally {
        _0x372a3c();
      }
    });
  });
}
function saveBirthDay(_0x423dc8 = 0) {
  return new Promise(_0x54ea1e => {
    let _0x5f19bc = encodeURIComponent(encodeURIComponent($.Pin));
    var _0x446f95 = new Date(),
      _0x2bd19b = _0x446f95.getFullYear(),
      _0x1ae43f = _0x446f95.getMonth() + 1;
    _0x1ae43f = _0x1ae43f < 10 ? "0" + _0x1ae43f : _0x1ae43f;
    var _0x4e1d5f = _0x446f95.getDate();
    _0x4e1d5f = _0x4e1d5f < 10 ? "0" + _0x4e1d5f : _0x4e1d5f;
    $.birthDays = _0x2bd19b + "-" + _0x1ae43f + "-" + _0x4e1d5f;
    let _0x3327ae = "venderId=" + $.userId + "&pin=" + _0x5f19bc + "&birthDay=" + $.birthDays;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/saveBirthDay", _0x3327ae), async (_0x3802d4, _0x3b6b15, _0x548076) => {
      try {
        _0x3802d4 ? (console.log("" + JSON.stringify(_0x3802d4)), console.log($.name + "saveBirthDay 请求失败，请检查网路重试")) : (_0x3b6b15.status == 200 && refreshToken(_0x3b6b15), safeGet(_0x548076) && (_0x548076 = JSON.parse(_0x548076)));
      } catch (_0x10d6ff) {
        $.logErr(_0x10d6ff, _0x3b6b15);
      } finally {
        _0x54ea1e();
      }
    });
  });
}
function getBirthInfo(_0x42204f = 0) {
  return new Promise(_0x31e31d => {
    let _0x26b745 = encodeURIComponent(encodeURIComponent($.Pin)),
      _0x4b7a56 = "venderId=" + $.userId + "&pin=" + _0x26b745;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/getBirthInfo", _0x4b7a56), async (_0x5472d6, _0x53c4b0, _0x2a04ce) => {
      try {
        _0x5472d6 ? (console.log("" + JSON.stringify(_0x5472d6)), console.log($.name + "getBirthInfo 请求失败，请检查网路重试")) : safeGet(_0x2a04ce) && (_0x2a04ce = JSON.parse(_0x2a04ce), !_0x2a04ce.result && ($.notx = true));
      } catch (_0xc6b4af) {
        $.logErr(_0xc6b4af, _0x53c4b0);
      } finally {
        _0x31e31d();
      }
    });
  });
}
function getMemberLevel(_0x18c541 = 0) {
  return new Promise(_0x567b97 => {
    let _0x82c2e9 = encodeURIComponent(encodeURIComponent($.Pin)),
      _0x5eb2cf = "venderId=" + $.userId + "&pin=" + _0x82c2e9;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/getMemberLevel", _0x5eb2cf), async (_0x3d1e35, _0x377b20, _0x4a23bc) => {
      try {
        _0x3d1e35 ? (console.log("" + JSON.stringify(_0x3d1e35)), console.log($.name + "getMemberLevel 请求失败，请检查网路重试")) : safeGet(_0x4a23bc) && (_0x4a23bc = JSON.parse(_0x4a23bc), _0x4a23bc.result && _0x4a23bc.data ? ($.level = _0x4a23bc.data.level, $.levelName = _0x4a23bc.data.levelName) : console.log(_0x4a23bc.errorMessage || ""));
      } catch (_0x3ee0bf) {
        $.logErr(_0x3ee0bf, _0x377b20);
      } finally {
        _0x567b97();
      }
    });
  });
}
function activityContent(_0x5011fc = 0) {
  return new Promise(_0x3f078e => {
    let _0x48040a = encodeURIComponent(encodeURIComponent($.Pin)),
      _0x79ed45 = "activityId=" + activityId + "&pin=" + _0x48040a + "&level=" + $.level;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/activityContent", _0x79ed45), async (_0x333af8, _0xfae225, _0xe3311) => {
      try {
        _0x333af8 ? (console.log("" + JSON.stringify(_0x333af8)), console.log($.name + "activityContent 请求失败，请检查网路重试")) : safeGet(_0xe3311) && (_0xe3311 = JSON.parse(_0xe3311), _0xe3311.result && _0xe3311.data ? $.actName = _0xe3311.data.actName : console.log(_0xe3311.errorMessage || ""));
      } catch (_0xe92573) {
        $.logErr(_0xe92573, _0xfae225);
      } finally {
        _0x3f078e();
      }
    });
  });
}
function sendBirthGifts(_0x4c2903 = 0) {
  return new Promise(_0x19d959 => {
    let _0x4e9dd9 = encodeURIComponent(encodeURIComponent($.Pin)),
      _0x10dc0e = "venderId=" + $.userId + "&activityId=" + activityId + "&pin=" + _0x4e9dd9 + "&level=" + $.level;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/sendBirthGifts", _0x10dc0e), async (_0x4cfd48, _0x2d946c, _0x2d5d4e) => {
      try {
        if (_0x4cfd48) {
          console.log("" + JSON.stringify(_0x4cfd48));
          console.log($.name + "sendBirthGifts 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x2d5d4e)) {
            _0x2d5d4e = JSON.parse(_0x2d5d4e);
            if (_0x2d5d4e.result && _0x2d5d4e.data) {
              $.birthdayData = _0x2d5d4e.data.birthdayData;
              for (o of $.birthdayData) {
                $.beanNum = o.beanNum;
                $.names = o.name;
                console.log("🎉 " + $.beanNum + $.names);
              }
            } else {
              errorMessage = _0x2d5d4e.errorMessage || _0x2d5d4e.data.birthdayError;
              if (errorMessage) {
                console.log(errorMessage);
                for (let _0x2b4836 of ["上限", "不足", "超过", "非法操作", "明天", "来晚", "抢光", "发完", "领完", "奖品发送失败", "未开始", "发放完", "全部被领取", "不足", "结束", "京豆计划", "不存在", "不在"]) {
                  if (errorMessage.includes(_0x2b4836)) {
                    $.activityEnd = true;
                    break;
                  }
                }
              } else console.log(_0x2d5d4e);
            }
          }
        }
      } catch (_0x25e5ef) {
        $.logErr(_0x25e5ef, _0x2d946c);
      } finally {
        _0x19d959();
      }
    });
  });
}
function sendLevelGifts(_0x2e7777 = 0) {
  return new Promise(_0x1557f2 => {
    let _0x3148d6 = encodeURIComponent(encodeURIComponent($.Pin)),
      _0x1798ae = "venderId=" + $.userId + "&activityId=" + activityId + "&pin=" + _0x3148d6 + "&level=" + $.level;
    $.post(taskPostUrl("/mc/wxMcLevelAndBirthGifts/sendLevelGifts", _0x1798ae), async (_0x3f8186, _0x4a1757, _0x2b22f3) => {
      try {
        if (_0x3f8186) {
          console.log("" + JSON.stringify(_0x3f8186));
          console.log($.name + "sendLevelGifts 请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x2b22f3)) {
            _0x2b22f3 = JSON.parse(_0x2b22f3);
            if (_0x2b22f3.result && _0x2b22f3.data) {
              $.levelData = _0x2b22f3.data.levelData;
              for (o of $.levelData) {
                $.beanNum = o.beanNum;
                $.names = o.name;
                console.log("获得：" + $.beanNum + $.names);
              }
            } else _0x2b22f3.errorMessage || _0x2b22f3.data.levelError ? console.log(_0x2b22f3.errorMessage || _0x2b22f3.data.levelError || "") : console.log(JSON.stringify(_0x2b22f3));
          }
        }
      } catch (_0x1e8267) {
        $.logErr(_0x1e8267, _0x4a1757);
      } finally {
        _0x1557f2();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(_0x1e0172 => {
    let _0x211658 = "activityType=" + $.activityType + "&venderId=" + $.userId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", _0x211658), async (_0x1cd497, _0x1e44de, _0x1ed712) => {
      try {
        if (_0x1cd497) {
          console.log("" + JSON.stringify(_0x1cd497));
          console.log($.getOpenCardInfo + "API请求失败，请检查网路重试");
        } else {
          if (safeGet(_0x1ed712)) {
            _0x1ed712 = JSON.parse(_0x1ed712);
            if (_0x1ed712.result && _0x1ed712.data) {
              $.openedCard = _0x1ed712.data.openedCard || false;
              if (_0x1ed712.data.openCardLink) {
                $.channel = _0x1ed712.data.openCardLink.match(/channel=(\d+)/)[1];
                $.joinVenderId = _0x1ed712.data.openCardLink.match(/venderId=(\d+)/)[1];
              } else {}
            }
          }
        }
      } catch (_0x3f5acb) {
        $.logErr(_0x3f5acb, _0x1e44de);
      } finally {
        _0x1e0172();
      }
    });
  });
}
function taskPostUrl(_0x1090af, _0x1f55fd) {
  return {
    "url": "" + activityUrl + _0x1090af,
    "body": _0x1f55fd,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": "cjhydz-isv.isvjcloud.com",
      "Origin": "https://cjhydz-isv.isvjcloud.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl + "/mc/wxMcLevelAndBirthGifts/activity?activityId=" + activityId,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function taskUrl(_0x70ed60, _0x551ab9) {
  return {
    "url": "https://api.m.jd.com/client.action" + _0x70ed60,
    "body": _0x551ab9,
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
function accessLog() {
  return new Promise(async _0x17f19a => {
    const _0x4589d6 = {
      "url": "https://cjhydz-isv.isvjcloud.com/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "cjhydz-isv.isvjcloud.com",
        "Origin": "https://cjhydz-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl + "/mc/wxMcLevelAndBirthGifts/activity?activityId=" + activityId,
        "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.userId + "&code=40&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + activityId + "&pageUrl=https%3A%2F%2F$cjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D" + activityId + "&subType=app"
    };
    $.post(_0x4589d6, (_0x5adcce, _0x3d9f97, _0x484e82) => {
      try {
        _0x5adcce ? (console.log("" + JSON.stringify(_0x5adcce)), console.log($.name + " API请求失败，请检查网路重试")) : _0x3d9f97.status == 200 && refreshToken(_0x3d9f97);
      } catch (_0x47611f) {
        $.logErr(_0x47611f, _0x3d9f97);
      } finally {
        _0x17f19a();
      }
    });
  });
}
function refreshToken(_0xfcc8c3) {
  if (_0xfcc8c3) {
    if (_0xfcc8c3.headers["set-cookie"]) {
      cookie = "";
      for (let _0x1f73ec of _0xfcc8c3.headers["set-cookie"]) {
        lz_cookie[_0x1f73ec.split(";")[0].substr(0, _0x1f73ec.split(";")[0].indexOf("="))] = _0x1f73ec.split(";")[0].substr(_0x1f73ec.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x37d0a1 of Object.keys(lz_cookie)) {
        cookie += _0x37d0a1 + "=" + lz_cookie[_0x37d0a1] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(_0xcbbb09) {
  _0xcbbb09 = _0xcbbb09 || 32;
  let _0x5d5249 = "abcdef0123456789",
    _0x52c591 = _0x5d5249.length,
    _0x36b3ff = "";
  for (i = 0; i < _0xcbbb09; i++) _0x36b3ff += _0x5d5249.charAt(Math.floor(Math.random() * _0x52c591));
  return _0x36b3ff;
}
function safeGet(_0x2eb732) {
  if (!_0x2eb732) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(_0x2eb732) == "object") return true;
  } catch (_0x47f82f) {
    return console.log(_0x47f82f), false;
  }
}
function jsonParse(_0x52b9ae) {
  if (typeof _0x52b9ae == "string") {
    try {
      return JSON.parse(_0x52b9ae);
    } catch (_0x33ac39) {
      return console.log(_0x33ac39), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
