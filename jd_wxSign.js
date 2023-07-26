/*
活动名称：店铺签到 · 超级无线/超级会员
环境变量：多活动id用逗号分开，不同环境变量对应不同链接类型，注意区分

LZKJ_SEVENDAY   https://lzkj-isv.isvjd.com/sign/sevenDay/signActivity?activityId=<活动id>
  LZKJ_SIGN     https://lzkj-isv.isvjd.com/sign/signActivity2?activityId=<活动id>
CJHY_SEVENDAY   https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=<活动id>
  CJHY_SIGN     https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=<活动id>

cron: 7 7 7 7 * jd_wxSign.js

*/

const Env=require('./utils/Env.js');
const $ = new Env('店铺签到（超级无线/超级会员）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let cookiesArr = [],
  cookie = "",
  domains = "",
  activityIdList1 = [],
  activityIdList2 = [],
  activityIdList3 = [],
  activityIdList4 = [],
  lz_cookie = {};
process.env.LZKJ_SEVENDAY && process.env.LZKJ_SEVENDAY != "" && (activityIdList1 = process.env.LZKJ_SEVENDAY.split(","));
process.env.LZKJ_SIGN && process.env.LZKJ_SIGN != "" && (activityIdList2 = process.env.LZKJ_SIGN.split(","));
process.env.CJHY_SEVENDAY && process.env.CJHY_SEVENDAY != "" && (activityIdList3 = process.env.CJHY_SEVENDAY.split(","));
process.env.CJHY_SIGN && process.env.CJHY_SIGN != "" && (activityIdList4 = process.env.CJHY_SIGN.split(","));
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x191dad => {
    cookiesArr.push(jdCookieNode[_0x191dad]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(_0x13b685 => _0x13b685.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(_0x5e8879 => !!_0x5e8879);
}
!(async () => {
  if (activityIdList1.length > 0) activityIdList1 = [...new Set(activityIdList1)];
  if (activityIdList2.length > 0) activityIdList2 = [...new Set(activityIdList2)];
  if (activityIdList3.length > 0) activityIdList3 = [...new Set(activityIdList3)];
  if (activityIdList4.length > 0) activityIdList4 = [...new Set(activityIdList4)];
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let _0x6db500 = 0; _0x6db500 < cookiesArr.length; _0x6db500++) {
    if (cookiesArr[_0x6db500]) {
      cookie = cookiesArr[_0x6db500];
      originCookie = cookiesArr[_0x6db500];
      newCookie = "";
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x6db500 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      domains = "https://lzkj-isv.isvjd.com";
      activityIdList2.length >= 1 && (console.log("❖ 签到类型（lzkj signActivity2）"), await signActivity2(), await $.wait(2000), console.log(""));
      activityIdList1.length >= 1 && (console.log("❖ 签到类型（lzkj sevenDay）"), await signActivity1(), await $.wait(2000), console.log(""));
      domains = "https://cjhy-isv.isvjcloud.com";
      activityIdList4.length >= 1 && (console.log("❖ 签到类型（cjhy signActivity）"), await signActivity4(), await $.wait(2000), console.log(""));
      activityIdList3.length >= 1 && (console.log("❖ 签到类型（cjhy sevenDay）"), await signActivity3(), await $.wait(2000));
    }
  }
})().catch(_0xb27700 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xb27700 + "!", "");
}).finally(() => {
  $.done();
});
async function signActivity1() {
  let _0x33e5ff = 0;
  _0x58ed64: for (let _0x1b2184 = 0; _0x1b2184 < activityIdList1.length; _0x1b2184++) {
    _0x33e5ff += 1;
    $.signStop = false;
    $.activityEnd = false;
    $.activityUrl = "https://lzkj-isv.isvjd.com/sign/sevenDay/signActivity?activityId=" + $.activityId;
    $.activityId = activityIdList1[_0x1b2184];
    console.log("");
    if (_0x1b2184 == 0) {
      $.token = null;
      $.secretPin = null;
      await getLZCK();
      await $.wait(500);
      $.token = await getToken(originCookie, "https://lzkj-isv.isvjd.com");
      if ($.token) {
        $.venderId = null;
        await task1("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
        await $.wait(500);
        await getMyPing1();
        await $.wait(500);
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    if (_0x33e5ff >= 10) {
      await getLZCK();
      await $.wait(500);
      _0x33e5ff = 0;
    }
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let _0x175d52 = 0; _0x175d52 < 20; _0x175d52++) {
        await task1("sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin), 1);
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请更换IP后再执行脚本");
          break _0x58ed64;
        }
        await $.wait(1000);
        if ($.signStop) break;
      }
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function signActivity2() {
  let _0x1de710 = 0;
  _0x482154: for (let _0x475909 = 0; _0x475909 < activityIdList2.length; _0x475909++) {
    _0x1de710 += 1;
    $.signStop = false;
    $.activityEnd = false;
    $.activityUrl = "https://lzkj-isv.isvjd.com/sign/signActivity2?activityId=" + $.activityId;
    $.activityId = activityIdList2[_0x475909];
    console.log("");
    if (_0x475909 == 0) {
      $.token = null;
      $.secretPin = null;
      await getLZCK();
      await $.wait(500);
      $.token = await getToken(originCookie, "https://lzkj-isv.isvjd.com");
      if ($.token) {
        $.venderId = null;
        await task1("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
        await $.wait(500);
        await getMyPing1();
        await $.wait(500);
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    if (_0x1de710 >= 10) {
      await getLZCK();
      await $.wait(500);
      _0x1de710 = 0;
    }
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let _0x5a10f3 = 0; _0x5a10f3 < 20; _0x5a10f3++) {
        await task1("sign/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin), 1);
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请更换IP后再执行脚本");
          break _0x482154;
        }
        await $.wait(1000);
        if ($.signStop) break;
      }
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function signActivity3() {
  let _0xe1ffa6 = 0;
  _0x48c757: for (let _0x4ec4e5 = 0; _0x4ec4e5 < activityIdList3.length; _0x4ec4e5++) {
    _0xe1ffa6 += 1;
    $.signStop = false;
    $.activityEnd = false;
    $.activityUrl = "https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=" + $.activityId;
    $.activityId = activityIdList3[_0x4ec4e5];
    console.log("");
    if (_0x4ec4e5 == 0) {
      $.token = null;
      $.secretPin = null;
      await getFirstLZCK();
      await $.wait(500);
      $.token = await getToken(originCookie, "https://cjhy-isv.isvjcloud.com");
      if ($.token) {
        $.venderId = null;
        await task2("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
        await $.wait(500);
        await getMyPing2();
        await $.wait(1000);
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    _0xe1ffa6 >= 10 && (await getFirstLZCK(), await $.wait(500), _0xe1ffa6 = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let _0x2289c7 = 0; _0x2289c7 < 20; _0x2289c7++) {
        await task2("sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)), 1);
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请更换IP后再执行脚本");
          break _0x48c757;
        }
        await $.wait(1000);
        if ($.signStop) break;
      }
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function signActivity4() {
  let _0x39eaed = 0;
  _0x10927a: for (let _0x193ebb = 0; _0x193ebb < activityIdList4.length; _0x193ebb++) {
    _0x39eaed += 1;
    $.signStop = false;
    $.activityEnd = false;
    $.activityUrl = "https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=" + $.activityId;
    $.activityId = activityIdList4[_0x193ebb];
    console.log("");
    if (_0x193ebb == 0) {
      $.token = null;
      $.secretPin = null;
      await getFirstLZCK();
      await $.wait(500);
      $.token = await getToken(originCookie, "https://cjhy-isv.isvjcloud.com");
      if ($.token) {
        $.venderId = null;
        await task2("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
        await $.wait(500);
        await getMyPing2();
        await $.wait(1000);
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    _0x39eaed >= 10 && (await getFirstLZCK(), await $.wait(500), _0x39eaed = 0);
    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      for (let _0x32c5e2 = 0; _0x32c5e2 < 20; _0x32c5e2++) {
        await task2("sign/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)), 1);
        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请更换IP后再执行脚本");
          break _0x10927a;
        }
        await $.wait(1000);
        if ($.signStop) break;
      }
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function task1(_0x2ba902, _0x3da8bd, _0x18b71b = 0) {
  return new Promise(_0x5b8f66 => {
    $.post(taskUrl1(_0x2ba902, _0x3da8bd, _0x18b71b), async (_0x2dcb97, _0xda035d, _0x3ef1df) => {
      try {
        if (_0x2dcb97) {
          $.log(_0x2dcb97);
          switch (_0x2ba902) {
            case "sign/sevenDay/wx/signUp":
            case "sign/wx/signUp":
              $.signErrorTimes += 1;
              break;
          }
        } else {
          if (_0x3ef1df) {
            _0x3ef1df = JSON.parse(_0x3ef1df);
            if (_0xda035d.headers["set-cookie"]) {
              cookie = "";
              for (let _0x510cfa of _0xda035d.headers["set-cookie"]) {
                lz_cookie[_0x510cfa.split(";")[0].substr(0, _0x510cfa.split(";")[0].indexOf("="))] = _0x510cfa.split(";")[0].substr(_0x510cfa.split(";")[0].indexOf("=") + 1);
              }
              for (const _0x120e05 of Object.keys(lz_cookie)) {
                cookie += _0x120e05 + "=" + lz_cookie[_0x120e05] + ";";
              }
            }
            if (_0x3ef1df) {
              switch (_0x2ba902) {
                case "customer/getSimpleActInfoVo":
                  $.venderId = _0x3ef1df.data.venderId;
                  $.activityType = _0x3ef1df.data.activityType;
                  break;
                case "sign/sevenDay/wx/signUp":
                  $.signErrorTimes = 0;
                  if (_0x3ef1df) {
                    if (_0x3ef1df.isOk) {
                      $.signStop = true;
                      await getPrizeInfo1(_0x3ef1df);
                    } else {
                      !_0x3ef1df.msg.includes("火爆") && !_0x3ef1df.msg.includes("擦肩") && (console.log("结果 -> " + _0x3ef1df.msg), $.signStop = true);
                      for (let _0x2ded0e of ["未开始", "结束", "不存在", "不在"]) {
                        if (_0x3ef1df.msg.includes(_0x2ded0e)) {
                          $.activityEnd = true;
                          break;
                        }
                      }
                    }
                  }
                  break;
                case "sign/wx/signUp":
                  $.signErrorTimes = 0;
                  if (_0x3ef1df) {
                    if (_0x3ef1df.isOk) {
                      $.signStop = true;
                      await getPrizeInfo2(_0x3ef1df);
                    } else {
                      !_0x3ef1df.msg.includes("火爆") && !_0x3ef1df.msg.includes("擦肩") && (console.log("结果 -> " + _0x3ef1df.msg), $.signStop = true);
                      for (let _0x44e990 of ["未开始", "结束", "不存在", "不在"]) {
                        if (_0x3ef1df.msg.includes(_0x44e990)) {
                          $.activityEnd = true;
                          break;
                        }
                      }
                    }
                  }
                  break;
                default:
                  $.log(JSON.stringify(_0x3ef1df));
                  break;
              }
            }
          }
        }
      } catch (_0x1663ee) {
        if (_0x2ba902 != "customer/getSimpleActInfoVo") $.log(_0x2ba902 + " -> " + _0x1663ee);
      } finally {
        _0x5b8f66();
      }
    });
  });
}
async function task2(_0x19228d, _0x49909d, _0x130ae3 = 0) {
  return new Promise(_0x3c73d5 => {
    $.post(taskUrl2(_0x19228d, _0x49909d, _0x130ae3), async (_0x5aa8e4, _0x2d4fee, _0x4ed10f) => {
      try {
        if (_0x5aa8e4) {
          $.log(_0x5aa8e4);
          switch (_0x19228d) {
            case "sign/sevenDay/wx/signUp":
            case "sign/wx/signUp":
              $.signErrorTimes += 1;
              break;
          }
        } else {
          if (_0x4ed10f) {
            _0x4ed10f = JSON.parse(_0x4ed10f);
            if (_0x2d4fee.headers["set-cookie"]) {
              cookie = "";
              for (let _0x11cc0c of _0x2d4fee.headers["set-cookie"]) {
                lz_cookie[_0x11cc0c.split(";")[0].substr(0, _0x11cc0c.split(";")[0].indexOf("="))] = _0x11cc0c.split(";")[0].substr(_0x11cc0c.split(";")[0].indexOf("=") + 1);
              }
              for (const _0x375c78 of Object.keys(lz_cookie)) {
                cookie += _0x375c78 + "=" + lz_cookie[_0x375c78] + ";";
              }
            }
            if (_0x4ed10f) {
              switch (_0x19228d) {
                case "customer/getSimpleActInfoVo":
                  $.venderId = _0x4ed10f.data.venderId;
                  $.activityType = _0x4ed10f.data.activityType;
                  break;
                case "sign/sevenDay/wx/signUp":
                  $.signErrorTimes = 0;
                  if (_0x4ed10f) {
                    if (_0x4ed10f.isOk) {
                      $.signStop = true;
                      await getPrizeInfo1(_0x4ed10f);
                    } else {
                      if (!_0x4ed10f.msg.includes("火爆") && !_0x4ed10f.msg.includes("擦肩")) {
                        console.log("结果 -> " + _0x4ed10f.msg);
                        $.signStop = true;
                      }
                      for (let _0x466125 of ["未开始", "结束", "不存在", "不在"]) {
                        if (_0x4ed10f.msg.includes(_0x466125)) {
                          $.activityEnd = true;
                          break;
                        }
                      }
                    }
                  }
                  break;
                case "sign/wx/signUp":
                  $.signErrorTimes = 0;
                  if (_0x4ed10f) {
                    if (_0x4ed10f.isOk) {
                      $.signStop = true;
                      await getPrizeInfo2(_0x4ed10f);
                    } else {
                      !_0x4ed10f.msg.includes("火爆") && !_0x4ed10f.msg.includes("擦肩") && (console.log("结果 -> " + _0x4ed10f.msg), $.signStop = true);
                      for (let _0x167715 of ["未开始", "结束", "不存在", "不在"]) {
                        if (_0x4ed10f.msg.includes(_0x167715)) {
                          $.activityEnd = true;
                          break;
                        }
                      }
                    }
                  }
                  break;
                default:
                  $.log(JSON.stringify(_0x4ed10f));
                  break;
              }
            }
          }
        }
      } catch (_0x33f74d) {
        if (_0x19228d != "customer/getSimpleActInfoVo") $.log(_0x19228d + " -> " + _0x33f74d);
      } finally {
        _0x3c73d5();
      }
    });
  });
}
async function getPrizeInfo1(_0x33c15a) {
  if (_0x33c15a.signResult.gift) {
    const _0x319fac = _0x33c15a.signResult.gift,
      _0x5a8b3f = _0x319fac.insufficient;
    process.stdout.write("结果 -> ");
    if (!_0x5a8b3f) {
      switch (parseInt(_0x319fac.giftType)) {
        case 6:
          console.log("🎉 " + _0x319fac.giftName + " 🐶");
          break;
        case 7:
          const _0x239abc = _0x33c15a.addressId;
          let _0x15262f = _0x319fac.giftName;
          console.log("🎉 恭喜获得实物~");
          console.log("奖品名称：" + _0x15262f);
          console.log("参考价值：" + _0x33c15a.signResult.gift.priceInfo + "（元）");
          console.log("预览图片：" + _0x33c15a.signResult.gift.showImage);
          let _0x543eac = await wxSavePrize(domains, cookie, "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", $.activityId, $.activityType, $.venderId, $.secretPin, _0x15262f, _0x239abc);
          _0x543eac ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + _0x15262f + "，已成功自动登记收货地址\n\n" + $.activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + _0x15262f + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl));
          break;
        case 8:
          console.log("🗑️ 专享价");
          break;
        case 9:
          console.log("🗑️ " + _0x319fac.giftName + " 🎟️");
          break;
        case 13:
        case 14:
        case 15:
          console.log("🎉 恭喜获得" + _0x319fac.giftName + " 🎁");
          $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + _0x319fac.giftName + "\n\n" + activityUrl));
          break;
        case 16:
          console.log("🎉 " + _0x319fac.priceInfo + " 🧧");
          break;
        default:
          _0x319fac.giftName.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + _0x319fac.giftName);
          break;
      }
    } else console.log("未中奖（奖品已发完）");
  } else console.log("结果 -> 签到成功");
}
async function getPrizeInfo2(_0x31e243) {
  if (_0x31e243.gift) {
    const _0x451a28 = _0x31e243.gift,
      _0x5a41a8 = _0x451a28.insufficient;
    process.stdout.write("结果 -> ");
    if (!_0x5a41a8) switch (parseInt(_0x451a28.giftType)) {
      case 6:
        console.log("🎉 " + _0x451a28.giftName + " 🐶");
        break;
      case 7:
        const _0x2ef5f4 = _0x31e243.addressId;
        let _0x44b2af = _0x451a28.giftName;
        console.log("🎉 恭喜获得实物~");
        console.log("奖品名称：" + _0x44b2af);
        console.log("参考价值：" + _0x31e243.gift.priceInfo + "（元）");
        console.log("预览图片：" + _0x31e243.gift.showImage);
        let _0x4cc66a = await wxSavePrize(domains, cookie, "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", $.activityId, $.activityType, $.venderId, $.secretPin, _0x44b2af, _0x2ef5f4);
        _0x4cc66a ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + _0x44b2af + "，已成功自动登记收货地址\n\n" + $.activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + _0x44b2af + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl));
        break;
      case 8:
        console.log("🗑️ 专享价");
        break;
      case 9:
        console.log("🗑️ " + _0x451a28.giftName + " 🎟️");
        break;
      case 13:
      case 14:
      case 15:
        console.log("🎉 恭喜获得" + _0x451a28.giftName + " 🎁");
        $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + _0x451a28.giftName + "\n\n" + activityUrl));
        break;
      case 16:
        console.log("🎉 " + _0x451a28.priceInfo + " 🧧");
        break;
      default:
        _0x451a28.giftName.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + _0x451a28.giftName);
        break;
    } else console.log("未中奖（奖品已发完）");
  } else console.log("结果 -> 签到成功");
}
function taskUrl1(_0x379d25, _0x1674b4, _0x5302df) {
  return {
    "url": _0x5302df ? "https://lzkj-isv.isvjd.com/" + _0x379d25 : "https://lzkj-isv.isvjd.com/sign/wx/" + _0x379d25,
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjd.comm",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": cookie
    },
    "body": _0x1674b4
  };
}
function taskUrl2(_0x1e8a50, _0x5a9876, _0x40f16) {
  return {
    "url": _0x40f16 ? "https://cjhy-isv.isvjcloud.com/" + _0x1e8a50 : "https://cjhy-isv.isvjcloud.com/sign/wx/" + _0x1e8a50,
    "headers": {
      "Host": "cjhy-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://cjhy-isv.isvjcloud.comm",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": cookie
    },
    "body": _0x5a9876
  };
}
function getMyPing1() {
  let _0x592d97 = {
    "url": "https://lzkj-isv.isvjd.com/customer/getMyPing",
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjd.com",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": cookie
    },
    "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP"
  };
  return new Promise(_0x35d1fe => {
    $.post(_0x592d97, (_0x553961, _0x189dfc, _0x1b956d) => {
      try {
        if (_0x553961) $.log(_0x553961);else {
          if (_0x189dfc.headers["set-cookie"]) {
            cookie = "";
            for (let _0x4d052d of _0x189dfc.headers["set-cookie"]) {
              lz_cookie[_0x4d052d.split(";")[0].substr(0, _0x4d052d.split(";")[0].indexOf("="))] = _0x4d052d.split(";")[0].substr(_0x4d052d.split(";")[0].indexOf("=") + 1);
            }
            for (const _0x4a6f38 of Object.keys(lz_cookie)) {
              cookie += _0x4a6f38 + "=" + lz_cookie[_0x4a6f38] + ";";
            }
          }
          _0x1b956d ? (_0x1b956d = JSON.parse(_0x1b956d), _0x1b956d.result ? ($.pin = _0x1b956d.data.nickname, $.secretPin = _0x1b956d.data.secretPin) : $.log(_0x1b956d.errorMessage)) : $.log("京东返回了空数据");
        }
      } catch (_0x181ff4) {
        $.log(_0x181ff4);
      } finally {
        _0x35d1fe();
      }
    });
  });
}
function getMyPing2() {
  let _0x1e510 = {
    "url": "https://cjhy-isv.isvjcloud.com/customer/getMyPing",
    "headers": {
      "Host": "cjhy-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://cjhy-isv.isvjcloud.com",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": cookie
    },
    "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP&riskType=1"
  };
  return new Promise(_0xd7a9b8 => {
    $.post(_0x1e510, (_0x55081b, _0x2ef9de, _0x5bb2e3) => {
      try {
        if (_0x55081b) $.log(_0x55081b);else {
          if (_0x2ef9de.headers["set-cookie"]) {
            cookie = "";
            for (let _0xda686f of _0x2ef9de.headers["set-cookie"]) {
              lz_cookie[_0xda686f.split(";")[0].substr(0, _0xda686f.split(";")[0].indexOf("="))] = _0xda686f.split(";")[0].substr(_0xda686f.split(";")[0].indexOf("=") + 1);
            }
            for (const _0x45459f of Object.keys(lz_cookie)) {
              cookie += _0x45459f + "=" + lz_cookie[_0x45459f] + ";";
            }
          }
          _0x5bb2e3 ? (_0x5bb2e3 = JSON.parse(_0x5bb2e3), _0x5bb2e3.result ? ($.pin = _0x5bb2e3.data.nickname, $.secretPin = _0x5bb2e3.data.secretPin) : $.log(_0x5bb2e3.errorMessage)) : $.log("京东返回了空数据");
        }
      } catch (_0x5b3947) {
        $.log(_0x5b3947);
      } finally {
        _0xd7a9b8();
      }
    });
  });
}
function getLZCK() {
  return new Promise(_0x488e51 => {
    let _0x5b8d1c = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      },
      "timeout": 30000
    };
    $.get(_0x5b8d1c, async (_0x206840, _0x4e8cfa, _0x23327b) => {
      try {
        if (_0x206840) {
          _0x4e8cfa && typeof _0x4e8cfa.statusCode != "undefined" && _0x4e8cfa.statusCode == 493 && (console.log("getLZCK 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          console.log(String(_0x206840));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (_0x4e8cfa.headers["set-cookie"]) {
            cookie = "";
            for (let _0x464eb1 of _0x4e8cfa.headers["set-cookie"]) {
              lz_cookie[_0x464eb1.split(";")[0].substr(0, _0x464eb1.split(";")[0].indexOf("="))] = _0x464eb1.split(";")[0].substr(_0x464eb1.split(";")[0].indexOf("=") + 1);
            }
            for (const _0x5de8ae of Object.keys(lz_cookie)) {
              cookie += _0x5de8ae + "=" + lz_cookie[_0x5de8ae] + ";";
            }
            activityCookie = cookie;
          }
        }
      } catch (_0x3714b9) {
        $.logErr(_0x3714b9, _0x4e8cfa);
      } finally {
        _0x488e51();
      }
    });
  });
}
function getFirstLZCK() {
  return new Promise(_0x532701 => {
    $.get({
      "url": $.activityUrl,
      "headers": {
        "user-agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    }, (_0xa44129, _0x46736a, _0x345010) => {
      try {
        if (_0xa44129) console.log(_0xa44129);else {
          if (_0x46736a.headers["set-cookie"]) {
            cookie = "";
            for (let _0x453591 of _0x46736a.headers["set-cookie"]) {
              lz_cookie[_0x453591.split(";")[0].substr(0, _0x453591.split(";")[0].indexOf("="))] = _0x453591.split(";")[0].substr(_0x453591.split(";")[0].indexOf("=") + 1);
            }
            for (const _0x39c606 of Object.keys(lz_cookie)) {
              cookie += _0x39c606 + "=" + lz_cookie[_0x39c606] + ";";
            }
          }
        }
      } catch (_0x1c12c1) {
        console.log(_0x1c12c1);
      } finally {
        _0x532701();
      }
    });
  });
}
function judgePrize(_0x6f210) {
  var _0x538e53 = false;
  for (let _0x689121 of lajiprizewords) {
    if (_0x6f210.includes(_0x689121)) {
      _0x538e53 = true;
      break;
    }
  }
  return _0x538e53;
}
function random(_0x28250c, _0x1fdd33) {
  return Math.floor(Math.random() * (_0x1fdd33 - _0x28250c)) + _0x28250c;
}
function getUUID(_0x2d7704 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0xdc5208 = 0) {
  return _0x2d7704.replace(/[xy]/g, function (_0x483f8a) {
    var _0x32cdca = Math.random() * 16 | 0,
      _0x1cd779 = _0x483f8a == "x" ? _0x32cdca : _0x32cdca & 3 | 8;
    if (_0xdc5208) {
      uuid = _0x1cd779.toString(36).toUpperCase();
    } else uuid = _0x1cd779.toString(36);
    return uuid;
  });
}
