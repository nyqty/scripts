/*
活动名称：邀请入会赢好礼 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=<活动id>&user_id=<店铺id>
环境变量：jd_showInviteJoin_activityUrl // 活动链接

请使用本地IP环境 请使用本地IP环境 请使用本地IP环境

cron:11 11 11 11 **
============Quantumultx===============
[task_local]
#邀请入会赢好礼
11 11 11 11 ** jd_jinggeng_showInviteJoin.js, tag=邀请入会赢好礼, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("邀请入会赢好礼（京耕）");
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const jsdom = require("jsdom");
const getH5st = require("./function/krh5st");
const getToken = require("./function/krgetToken");
const {
  JSDOM
} = jsdom;
let lz_cookie = {};
let activityCookie = "";
$.activityEnd = false;
$.maxHelpTimes = 0;
$.prizeData = [];
$.helpEnd = false;
$.helpCount = 0;
$.isGetAward = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_showInviteJoin_activityUrl) {
    activityUrl = process.env.jd_showInviteJoin_activityUrl;
  }
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(jdCookieNode).forEach(_0x929cx34 => {
    cookiesArr.push(jdCookieNode[_0x929cx34]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x929cx36 => {
    return _0x929cx36.cookie;
  })].filter(_0x929cx35 => {
    return !!_0x929cx35;
  });
}
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "id");
  venderId = getQueryString("" + activityUrl, "user_id");
  $.domain = activityUrl.match(/https?:\/\/([^\/]+)/)[1];
} else {
  console.log("请填写活动链接");
}
let domains = "https://" + $.domain;
let isGetCookie = typeof $request !== "undefined";
if (isGetCookie) {
  GetCookie();
  $.done();
}
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let _0x929cx5a = 0; _0x929cx5a < cookiesArr.length; _0x929cx5a++) {
    if (cookiesArr[_0x929cx5a]) {
      cookie = cookiesArr[_0x929cx5a];
      originCookie = cookiesArr[_0x929cx5a];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x929cx5a + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
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
      await showInviteJoinz();
      await $.wait(3000);
      if ($.hasEnd || $.outFlag || $.helpEnd || $.activityEnd) {
        break;
      }
    }
  }
  $.isGetAward = true;
  for (let _0x929cx5b = 0; _0x929cx5b < 1; _0x929cx5b++) {
    if (cookiesArr[_0x929cx5b]) {
      cookie = cookiesArr[_0x929cx5b];
      originCookie = cookiesArr[_0x929cx5b];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x929cx5b + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "领取奖励\n");
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
      await getAward();
      await $.wait(3000);
      if ($.hasEnd || $.outFlag || $.activityEnd) {
        break;
      }
    }
  }
})().catch(_0x929cx39 => {
  $.log("", " " + $.name + ", 失败! 原因: " + _0x929cx39 + "!", "");
}).finally(() => {
  $.done();
});
async function showInviteJoinz() {
  $.shopid = venderId;
  $.token = "";
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取TOKEN失败 ❌");
    return;
  }
  if ($.shopid) {
    await setMixNick();
    await $.wait(1000);
    if ($.inviterNicks == "") {
      console.log("获取[inviterNick]失败 ❌");
      return;
    }
    if ($.index == 1) {
      $.inviterNick = $.inviterNicks;
    } else {
      console.log("去助力好友 🔜 ");
    }
    await showInviteJoin();
    await $.wait(1000);
    if ($.activityEnd) {
      return;
    }
    await getShopOpenCardInfo({
      "venderId": $.shopid,
      "channel": "401"
    });
    if ($.openCardStatus == 0) {
      $.errorJoinShop = "";
      $.joinVenderId = $.shopid;
      for (let _0x929cx7f = 0; _0x929cx7f < Array(2).length; _0x929cx7f++) {
        if (_0x929cx7f > 0) {
          console.log("第" + _0x929cx7f + "次 重新开卡");
        }
        await joinShop();
        await $.wait(1000);
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
          break;
        }
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
          console.log("开卡失败 ❌，重新执行脚本");
        }
      }
      await $.wait(2000);
      await getShopOpenCardInfo({
        "venderId": $.shopid,
        "channel": "401"
      });
      if ($.openCardStatus === 0) {
        console.log("助力失败，未能成功加入店铺会员 ❌");
        return;
      }
    }
    await recordActPvUvData();
    await checkTokenInSession();
    await $.wait(1000);
    if ($.index != 1) {
      await showInviteJoin1();
    }
    await $.wait(1000);
    if ($.helpCount >= $.maxHelpTimes) {
      console.log("\n助力次数已满足最高奖品要求，开始领取奖品 🍰");
      $.helpEnd = true;
      return;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
async function getAward() {
  $.prizeData = [];
  $.shopid = venderId;
  $.token = "";
  $.Pin = "";
  $.hisPin = "";
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取TOKEN失败 ❌");
    return;
  }
  if ($.shopid) {
    await setMixNick();
    if ($.inviterNicks == "") {
      console.log("获取[inviterNick]失败 ❌");
      return;
    }
    await recordActPvUvData();
    await checkTokenInSession();
    await getPrizeTask();
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function showMsg() {
  return new Promise(_0x929cx99 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    _0x929cx99();
  });
}
function setMixNick() {
  return new Promise(_0x929cxaa => {
    let _0x929cxab = "strTMMixNick=" + $.token + "&userId=" + $.shopid + "&source=01";
    $.post(taskPostUrl("/front/setMixNick", _0x929cxab), async (_0x929cxac, _0x929cxad, _0x929cxae) => {
      try {
        if (_0x929cxac) {
          console.log("" + JSON.stringify(_0x929cxac));
          console.log($.name + " setMixNick API请求失败，请检查网路重试");
        } else {
          _0x929cxae = JSON.parse(_0x929cxae);
          if (_0x929cxae && _0x929cxae.succ) {
            $.inviterNicks = _0x929cxae.msg;
          }
          if (_0x929cxad.status == 200) {
            refreshToken(_0x929cxad);
          }
        }
      } catch (_0x6fdfef) {
        $.logErr(_0x6fdfef, _0x929cxad);
      } finally {
        _0x929cxaa();
      }
    });
  });
}
function recordActPvUvData() {
  return new Promise(_0x929cxc3 => {
    let _0x929cxd4 = "userId=" + $.shopid + "&actId=" + activityId;
    $.post(taskPostUrl("/ql/front/reportActivity/recordActPvUvData", _0x929cxd4), async (_0x929cxd5, _0x929cxd6, _0x929cxd7) => {
      try {
        if (_0x929cxd5) {
          console.log("" + JSON.stringify(_0x929cxd5));
          console.log($.name + " recordActPvUvData API请求失败，请检查网路重试");
        } else {
          if (_0x929cxd6.status == 200) {
            refreshToken(_0x929cxd6);
          }
        }
      } catch (_0x1c96f8) {
        $.logErr(_0x1c96f8, _0x929cxd6);
      } finally {
        _0x929cxc3();
      }
    });
  });
}
function checkTokenInSession() {
  return new Promise(_0x929cxe5 => {
    let _0x929cxee = "userId=" + $.shopid + "&token=" + $.token;
    $.post(taskPostUrl("/front/checkTokenInSession", _0x929cxee), async (_0x929cxef, _0x929cxf0, _0x929cxf1) => {
      try {
        if (_0x929cxef) {
          console.log("" + JSON.stringify(_0x929cxef));
          console.log($.name + " checkTokenInSession API请求失败，请检查网路重试");
        } else {
          if (_0x929cxf0.status == 200) {
            refreshToken(_0x929cxf0);
          }
        }
      } catch (_0x2f5c7e) {
        $.logErr(_0x2f5c7e, _0x929cxf0);
      } finally {
        _0x929cxe5();
      }
    });
  });
}
function receiveInviteJoinAward() {
  return new Promise(_0x929cx103 => {
    let _0x929cx109 = "act_id=" + activityId + "&user_id=" + $.shopid + "&awardId=" + $.awardId;
    $.post(taskPostUrl("/ql/front/receiveInviteJoinAward", _0x929cx109), async (_0x929cx10a, _0x929cx10b, _0x929cx10c) => {
      try {
        if (_0x929cx10a) {
          console.log("" + JSON.stringify(_0x929cx10a));
          console.log($.name + " receiveInviteJoinAward API请求失败，请检查网路重试");
        } else {
          _0x929cx10c = JSON.parse(_0x929cx10c);
          if (_0x929cx10c && _0x929cx10c.succ) {
            console.log("领取成功 ✅");
          } else {
            console.log("❌ 领取失败：" + _0x929cx10c.msg);
          }
          if (_0x929cx10b.status == 200) {
            refreshToken(_0x929cx10b);
          }
        }
      } catch (_0x3f55e2) {
        $.logErr(_0x3f55e2, _0x929cx10b);
      } finally {
        _0x929cx103();
      }
    });
  });
}
function showInviteJoin() {
  return new Promise(_0x929cx12e => {
    const _0x929cx132 = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.shopid + "&inviterNick=" + $.inviterNick + "&isOpenCard=0",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.shopid + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(_0x929cx132, async (_0x929cx133, _0x929cx134, _0x929cx135) => {
      try {
        if (_0x929cx133) {
          console.log("" + JSON.stringify(_0x929cx133));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          _0x929cx135 = _0x929cx135;
          if (_0x929cx135) {
            let _0x929cx13e = _0x929cx135.match(/(活动已结束)/) && _0x929cx135.match(/(活动已结束)/)[1] || _0x929cx135.match(/(哎哟，当前活动尚未开始噢！)/) && _0x929cx135.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            if (_0x929cx13e) {
              $.activityEnd = true;
              console.log("活动已结束或者未开始");
            } else {
              const _0x929cx13f = new JSDOM(_0x929cx135);
              if ($.index === 1) {
                $.buyer_znick = _0x929cx13f.window.document.getElementById("buyer_znick").value;
                if (!$.isGetAward) {
                  console.log("你好，" + $.buyer_znick);
                }
                let _0x929cx140 = _0x929cx13f.window.document.getElementById("inviteSetting2").value;
                await extractActivityInfo(JSON.parse(_0x929cx140));
                if (!$.isGetAward) {
                  console.log("活动奖品：");
                  for (let _0x929cx141 = 0; _0x929cx141 < $.prizeData.length; _0x929cx141++) {
                    console.log("  " + $.prizeData[_0x929cx141].level + ". " + $.prizeData[_0x929cx141].name + "，剩余" + $.prizeData[_0x929cx141].stock + "库存，需邀请" + $.prizeData[_0x929cx141].needInvite + "人");
                    if ($.prizeData[_0x929cx141].stock > 0) {
                      $.maxHelpTimes = $.prizeData[_0x929cx141].needInvite;
                    }
                  }
                  let _0x929cx142 = _0x929cx13f.window.document.getElementById("helpLogs").value;
                  let _0x929cx143 = JSON.parse(_0x929cx142).length;
                  console.log("当前已邀请" + _0x929cx143 + "人");
                  $.helpCount = _0x929cx143;
                }
              }
              let _0x929cx144 = _0x929cx13f.window.document.getElementById("errorMsg").value;
              if (_0x929cx144) {
                if ($.index != 1 && !$.inviterNick) {
                  console.log("" + _0x929cx144);
                }
              }
            }
          }
        }
      } catch (_0x1b40da) {
        $.logErr(_0x1b40da, _0x929cx134);
      } finally {
        _0x929cx12e();
      }
    });
  });
}
function showInviteJoin1() {
  return new Promise(_0x929cx152 => {
    const _0x929cx160 = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.shopid + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.shopid + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(_0x929cx160, async (_0x929cx161, _0x929cx162, _0x929cx163) => {
      try {
        if (_0x929cx161) {
          console.log("" + JSON.stringify(_0x929cx161));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          _0x929cx163 = _0x929cx163;
          if (_0x929cx163) {
            const _0x929cx164 = new JSDOM(_0x929cx163);
            if ($.index != 1) {
              let _0x929cx165 = _0x929cx164.window.document.getElementById("buyerFans").value;
              let _0x929cx166 = _0x929cx164.window.document.getElementById("inviteSucc").value;
              if (_0x929cx165 && _0x929cx166) {
                console.log(_0x929cx166);
                let _0x929cx167 = JSON.parse(_0x929cx165).znick;
                if (_0x929cx167 == $.buyer_znick && _0x929cx166.includes("成功")) {
                  $.helpCount++;
                  console.log("助力成功 ✅");
                } else {
                  console.log("助力失败 ❌");
                }
              } else {
                console.log("助力失败，可能已经助力过了 ❌");
              }
            }
          }
        }
      } catch (_0x4910d6) {
        $.logErr(_0x4910d6, _0x929cx162);
      } finally {
        _0x929cx152();
      }
    });
  });
}
function getPrizeTask() {
  return new Promise(_0x929cx177 => {
    const _0x929cx18b = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.shopid + "&inviterNick=" + $.inviterNick + "&isOpenCard=0",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.shopid + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(_0x929cx18b, async (_0x929cx18c, _0x929cx18d, _0x929cx18e) => {
      try {
        if (_0x929cx18c) {
          console.log("" + JSON.stringify(_0x929cx18c));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          _0x929cx18e = _0x929cx18e;
          if (_0x929cx18e) {
            const _0x929cx192 = new JSDOM(_0x929cx18e);
            $.prizeData = [];
            let _0x929cx193 = _0x929cx192.window.document.getElementById("inviteSetting2").value;
            await extractActivityInfo(JSON.parse(_0x929cx193));
            for (let _0x929cx194 in $.prizeData) {
              $.awardId = $.prizeData[_0x929cx194].id;
              switch ($.prizeData[_0x929cx194].status) {
                case 0:
                  console.log("等级" + $.prizeData[_0x929cx194].level + " " + $.prizeData[_0x929cx194].name + " 奖品已领完");
                  break;
                case 1:
                  console.log("等级" + $.prizeData[_0x929cx194].level + " " + $.prizeData[_0x929cx194].name + " 奖品未达标");
                  break;
                case 2:
                  if ($.prizeData[_0x929cx194].type != "JD_GOODS") {
                    console.log("去领取奖品 -> " + $.prizeData[_0x929cx194].name + "（等级" + $.prizeData[_0x929cx194].level + "）");
                    await receiveInviteJoinAward($.awardId);
                    await $.wait(3000);
                  } else {
                    console.log("实物奖品请前往活动页手动领取！");
                  }
                  break;
                case 3:
                  console.log("等级" + $.prizeData[_0x929cx194].level + " " + $.prizeData[_0x929cx194].name + " 奖品已发完或已经领取");
                  break;
              }
            }
          }
        }
      } catch (_0x44bb70) {
        $.logErr(_0x44bb70, _0x929cx18d);
      } finally {
        _0x929cx177();
      }
    });
  });
}
async function extractActivityInfo(_0x929cx197) {
  if (_0x929cx197.one) {
    let _0x929cx1a5 = _0x929cx197.one;
    let _0x929cx1a6 = _0x929cx1a5.leveOneNum;
    let _0x929cx1a7 = _0x929cx1a5.id;
    let _0x929cx1a8 = _0x929cx1a5.awardOneStatus;
    let _0x929cx1a9 = _0x929cx1a5.equityType;
    let _0x929cx1aa = _0x929cx1a9 == "JD_BEAN" ? _0x929cx1a5.denominationShow + "京豆" : _0x929cx1a9 == "JD_POINT" ? _0x929cx1a5.denominationShow + "店铺积分" : _0x929cx1a5.equityName;
    let _0x929cx1ab = _0x929cx1a5.availableQuantity;
    let _0x929cx1ac = {
      "id": _0x929cx1a7,
      "name": _0x929cx1aa,
      "level": 1,
      "status": _0x929cx1a8,
      "type": _0x929cx1a9,
      "stock": _0x929cx1ab,
      "needInvite": _0x929cx1a6
    };
    $.prizeData.push(_0x929cx1ac);
  }
  if (_0x929cx197.two) {
    let _0x929cx1ad = _0x929cx197.two;
    let _0x929cx1a6 = _0x929cx1ad.leveTwoNum;
    let _0x929cx1a7 = _0x929cx1ad.id;
    let _0x929cx1a8 = _0x929cx1ad.awardTwoStatus;
    let _0x929cx1a9 = _0x929cx1ad.equityType;
    let _0x929cx1aa = _0x929cx1a9 == "JD_BEAN" ? _0x929cx1ad.denominationShow + "京豆" : _0x929cx1a9 == "JD_POINT" ? _0x929cx1ad.denominationShow + "店铺积分" : _0x929cx1ad.equityName;
    let _0x929cx1ab = _0x929cx1ad.availableQuantity;
    let _0x929cx1ac = {
      "id": _0x929cx1a7,
      "name": _0x929cx1aa,
      "level": 2,
      "status": _0x929cx1a8,
      "type": _0x929cx1a9,
      "stock": _0x929cx1ab,
      "needInvite": _0x929cx1a6
    };
    $.prizeData.push(_0x929cx1ac);
  }
  if (_0x929cx197.three) {
    let _0x929cx1ae = _0x929cx197.three;
    let _0x929cx1a6 = _0x929cx1ae.leveThreeNum;
    let _0x929cx1a7 = _0x929cx1ae.id;
    let _0x929cx1a8 = _0x929cx1ae.awardThreeStatus;
    let _0x929cx1a9 = _0x929cx1ae.equityType;
    let _0x929cx1aa = _0x929cx1a9 == "JD_BEAN" ? _0x929cx1ae.denominationShow + "京豆" : _0x929cx1a9 == "JD_POINT" ? _0x929cx1ae.denominationShow + "店铺积分" : _0x929cx1ae.equityName;
    let _0x929cx1ab = _0x929cx1ae.availableQuantity;
    let _0x929cx1ac = {
      "id": _0x929cx1a7,
      "name": _0x929cx1aa,
      "level": 3,
      "status": _0x929cx1a8,
      "type": _0x929cx1a9,
      "stock": _0x929cx1ab,
      "needInvite": _0x929cx1a6
    };
    $.prizeData.push(_0x929cx1ac);
  }
  if (_0x929cx197.four) {
    let _0x929cx1af = _0x929cx197.four;
    let _0x929cx1a6 = _0x929cx1af.leveFourNum;
    let _0x929cx1a7 = _0x929cx1af.id;
    let _0x929cx1a8 = _0x929cx1af.awardFourStatus;
    let _0x929cx1a9 = _0x929cx1af.equityType;
    let _0x929cx1aa = _0x929cx1a9 == "JD_BEAN" ? _0x929cx1af.denominationShow + "京豆" : _0x929cx1a9 == "JD_POINT" ? _0x929cx1af.denominationShow + "店铺积分" : _0x929cx1af.equityName;
    let _0x929cx1ab = _0x929cx1af.availableQuantity;
    let _0x929cx1ac = {
      "id": _0x929cx1a7,
      "name": _0x929cx1aa,
      "level": 4,
      "status": _0x929cx1a8,
      "type": _0x929cx1a9,
      "stock": _0x929cx1ab,
      "needInvite": _0x929cx1a6
    };
    $.prizeData.push(_0x929cx1ac);
  }
}
function getShopOpenCardInfo(_0x929cx1b1) {
  let _0x929cx1c1 = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(_0x929cx1b1)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(activityUrl),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(_0x929cx1c2 => {
    $.get(_0x929cx1c1, (_0x929cx1d1, _0x929cx1d2, _0x929cx1d3) => {
      try {
        if (_0x929cx1d1) {
          if (_0x929cx1d1 === "Response code 403 (Forbidden)") {
            $.err = true;
            console.log(_0x929cx1d1);
          }
        } else {
          res = JSON.parse(_0x929cx1d3);
          if (res.success) {
            $.openCardStatus = res.result.userInfo.openCardStatus;
            if (res.result.interestsRuleList) {
              $.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId;
            }
          }
        }
      } catch (_0x10df70) {
        console.log(_0x10df70);
      } finally {
        _0x929cx1c2();
      }
    });
  });
}
function taskPostUrl(_0x929cx1da, _0x929cx1db) {
  return {
    "url": "" + domains + _0x929cx1da,
    "body": _0x929cx1db,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "Host": "jinggeng-isv.isvjcloud.com",
      "Origin": "https://jinggeng-isv.isvjcloud.com",
      "Referer": "https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + venderId + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    }
  };
}
function taskUrl(_0x929cx1e6, _0x929cx1e7) {
  return {
    "url": "https://api.m.jd.com/client.action" + _0x929cx1e6,
    "body": _0x929cx1e7,
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
function refreshToken(_0x929cx1ec) {
  if (_0x929cx1ec.headers["set-cookie"]) {
    cookie = "";
    for (let _0x929cx1f2 of _0x929cx1ec.headers["set-cookie"]) {
      lz_cookie[_0x929cx1f2.split(";")[0].substr(0, _0x929cx1f2.split(";")[0].indexOf("="))] = _0x929cx1f2.split(";")[0].substr(_0x929cx1f2.split(";")[0].indexOf("=") + 1);
    }
    for (const _0x929cx1f3 of Object.keys(lz_cookie)) {
      cookie += _0x929cx1f3 + "=" + lz_cookie[_0x929cx1f3] + ";";
    }
    activityCookie = cookie;
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(_0x929cx1f6) {
  _0x929cx1f6 = _0x929cx1f6 || 32;
  let _0x929cx1fc = "abcdef0123456789",
    _0x929cx1fd = _0x929cx1fc.length,
    _0x929cx1fe = "";
  for (i = 0; i < _0x929cx1f6; i++) {
    _0x929cx1fe += _0x929cx1fc.charAt(Math.floor(Math.random() * _0x929cx1fd));
  }
  return _0x929cx1fe;
}
function getQueryString(_0x929cx200, _0x929cx201) {
  let _0x929cx207 = new RegExp("(^|[&?])" + _0x929cx201 + "=([^&]*)(&|$)");
  let _0x929cx208 = _0x929cx200.match(_0x929cx207);
  if (_0x929cx208 != null) {
    return unescape(_0x929cx208[2]);
  }
  return "";
}
function safeGet(_0x929cx20a) {
  if (!_0x929cx20a) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(_0x929cx20a) == "object") {
      return true;
    }
  } catch (_0x38e81b) {
    console.log(_0x38e81b);
    return false;
  }
}
function jsonParse(_0x929cx211) {
  if (typeof _0x929cx211 == "string") {
    try {
      return JSON.parse(_0x929cx211);
    } catch (_0x43a159) {
      console.log(_0x43a159);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x929cx227 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x929cx235 = "";
    if ($.shopactivityId) {
      _0x929cx235 = ",\"activityId\":" + $.shopactivityId;
    }
    const _0x929cx236 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x929cx235 + ",\"channel\":406}";
    const _0x929cx237 = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(_0x929cx236)
    };
    const _0x929cx238 = await getH5st("8adfb", _0x929cx237);
    const _0x929cx239 = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x929cx236 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x929cx238),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x929cx239, async (_0x929cx23a, _0x929cx23b, _0x929cx23c) => {
      try {
        if (_0x929cx23a) {
          if (_0x929cx23b && typeof _0x929cx23b.statusCode != "undefined") {
            if (_0x929cx23b.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x929cx23c = _0x929cx23c && _0x929cx23c.match(/jsonp_.*?\((.*?)\);/) && _0x929cx23c.match(/jsonp_.*?\((.*?)\);/)[1] || _0x929cx23c;
          let _0x929cx23e = $.toObj(_0x929cx23c, _0x929cx23c);
          if (_0x929cx23e && typeof _0x929cx23e == "object") {
            if (_0x929cx23e && _0x929cx23e.success === true) {
              console.log(" >> " + _0x929cx23e.message);
              $.errorJoinShop = _0x929cx23e.message;
              if (_0x929cx23e.result && _0x929cx23e.result.giftInfo) {
                for (let _0x929cx23f of _0x929cx23e.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + _0x929cx23f.discountString + _0x929cx23f.prizeName + _0x929cx23f.secondLineDesc);
                }
              }
            } else {
              if (_0x929cx23e && typeof _0x929cx23e == "object" && _0x929cx23e.message) {
                $.errorJoinShop = _0x929cx23e.message;
                console.log("" + (_0x929cx23e.message || ""));
              } else {
                console.log(_0x929cx23c);
              }
            }
          } else {
            console.log(_0x929cx23c);
          }
        }
      } catch (_0x198d0f) {
        $.logErr(_0x198d0f, _0x929cx23b);
      } finally {
        _0x929cx227();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x929cx253 => {
    const _0x929cx259 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x929cx25a = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(_0x929cx259)
    };
    const _0x929cx25b = await getH5st("8adfb", _0x929cx25a);
    const _0x929cx25c = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x929cx259 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x929cx25b),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x929cx25c, async (_0x929cx25d, _0x929cx25e, _0x929cx25f) => {
      try {
        if (_0x929cx25d) {
          if (_0x929cx25e && typeof _0x929cx25e.statusCode != "undefined") {
            if (_0x929cx25e.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x929cx25f = _0x929cx25f && _0x929cx25f.match(/jsonp_.*?\((.*?)\);/) && _0x929cx25f.match(/jsonp_.*?\((.*?)\);/)[1] || _0x929cx25f;
          let _0x929cx26f = $.toObj(_0x929cx25f, _0x929cx25f);
          if (_0x929cx26f && typeof _0x929cx26f == "object") {
            if (_0x929cx26f && _0x929cx26f.success == true) {
              console.log("去加入：" + (_0x929cx26f.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = _0x929cx26f.result.interestsRuleList && _0x929cx26f.result.interestsRuleList[0] && _0x929cx26f.result.interestsRuleList[0].interestsInfo && _0x929cx26f.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else {
            console.log(_0x929cx25f);
          }
        }
      } catch (_0xe4130f) {
        $.logErr(_0xe4130f, _0x929cx25e);
      } finally {
        _0x929cx253();
      }
    });
  });
}
function random(_0x929cx271, _0x929cx272) {
  return Math.floor(Math.random() * (_0x929cx272 - _0x929cx271)) + _0x929cx271;
}