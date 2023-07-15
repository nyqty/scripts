/*
活动名称：加购有礼（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10024&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
          https://lorealjdcampaign-rc.isvjcloud.com/interactsaas/index?activityType=10024&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_cart_url // 活动链接


cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#lzkj_loreal加购有礼
1 1 1 1 * jd_lzkj_loreal_cart.js, tag=lzkj_loreal加购有礼, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("加购有礼（lzkj_loreal）");

const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const getToken = require("./function/krgetToken");
const getH5st = require("./function/krh5st");
let lz_cookie = {};
let activityUrl = process.env.jd_lzkj_loreal_cart_url;
let activityId = null;
let activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_cart_url) {
    activityUrl = process.env.jd_lzkj_loreal_cart_url;
  }
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(jdCookieNode).forEach(_0x4c92x37 => {
    cookiesArr.push(jdCookieNode[_0x4c92x37]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x4c92x39 => {
    return _0x4c92x39.cookie;
  })].filter(_0x4c92x38 => {
    return !!_0x4c92x38;
  });
}
let isGetCookie = typeof $request !== "undefined";
if (isGetCookie) {
  GetCookie();
  $.done();
}
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  activityType = getQueryString("" + activityUrl, "activityType");
  templateId = getQueryString("" + activityUrl, "templateId");
  if (activityUrl.includes("lorealjdcampaign-rc")) {
    wxActType = "apps/interact";
  } else {
    if (activityUrl.includes("lzkj")) {
      wxActType = activityUrl.match(/\/(prod\/cc\/interact\w*)\//)[1];
    } else {
      console.log("暂不支持的类型");
    }
  }
  $.domain = activityUrl.match(/https?:\/\/([^\/]+)/)[1];
}
let domains = "https://" + $.domain;
!(async () => {
  if (activityId == null) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口:" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let _0x4c92x56 = 0; _0x4c92x56 < cookiesArr.length; _0x4c92x56++) {
    if (cookiesArr[_0x4c92x56]) {
      cookie = cookiesArr[_0x4c92x56];
      originCookie = cookiesArr[_0x4c92x56];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x4c92x56 + 1;
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
      await Main();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag || $.maxcountnum) {
        break;
      }
    }
  }
})().catch(_0x4c92x3e => {
  $.log("", " " + $.name + ", 失败! 原因: " + _0x4c92x3e + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.OpenCard = false;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) {
      return;
    }
    await $.wait(300);
    await follow();
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    await $.wait(300);
    await activity();
    if ($.hasEnd || $.activityEnd || $.outFlag) {
      return;
    }
    await drawPrize();
    await $.wait(300);
    if ($.index == 1) {
      $.prizeList = "";
      for (let _0x4c92x77 = 0; _0x4c92x77 < $.prizeInfo.length; _0x4c92x77++) {
        prizeName = $.prizeInfo[_0x4c92x77].prizeName;
        if (_0x4c92x77 != $.prizeInfo.length - 1) {
          $.prizeList += prizeName + "，";
        } else {
          $.prizeList += "" + prizeName;
        }
      }
      console.log("店铺名称：" + $.shopName + "\n活动名称: " + $.actName + "\n活动奖品：" + $.prizeList + "\n");
    }
    await addSku();
    if ($.prizeResultNum <= 0) {
      return;
    }
    if ($.completeCount <= $.finishNum) {
      if ($.taskId) {
        for (o of $.skuInfoVO) {
          if ($.finishNum > 0) {
            if (o.status == 0) {
              $.skuId = o.skuId;
              await toDo();
              $.finishNum--;
              await $.wait(500);
            }
          }
        }
      }
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function getShopOpenCardInfo(_0x4c92x79) {
  let _0x4c92x87 = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(_0x4c92x79)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(_0x4c92x88 => {
    $.get(_0x4c92x87, (_0x4c92x8a, _0x4c92x8b, _0x4c92x8c) => {
      try {
        if (_0x4c92x8a) {
          if (_0x4c92x8a === "Response code 403 (Forbidden)") {
            $.err = true;
            console.log(_0x4c92x8a);
          }
        } else {
          res = JSON.parse(_0x4c92x8c);
          if (res.success) {
            $.openCardStatus = res.result.userInfo.openCardStatus;
            if (res.result.interestsRuleList) {
              $.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId;
            }
          }
        }
      } catch (_0x3a334f) {
        console.log(_0x3a334f);
      } finally {
        _0x4c92x88();
      }
    });
  });
}
function showMsg() {
  return new Promise(_0x4c92x94 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    _0x4c92x94();
  });
}
function login(_0x4c92x96, _0x4c92x97) {
  return new Promise(_0x4c92xa5 => {
    $.post(taskPostUrl(_0x4c92x96, _0x4c92x97), async (_0x4c92xa6, _0x4c92xa7, _0x4c92xa8) => {
      try {
        if (_0x4c92xa6) {
          console.log("" + JSON.stringify(_0x4c92xa6));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          _0x4c92xa8 = JSON.parse(_0x4c92xa8);
          if (_0x4c92xa8 && _0x4c92xa8.data) {
            $.tokens = _0x4c92xa8.data.token;
            $.customerId = _0x4c92xa8.data.customerId;
            $.joinVenderId = _0x4c92xa8.data.joinInfo.shopId;
            $.openCardUrl = _0x4c92xa8.data.joinInfo.openCardUrl;
            $.shopName = _0x4c92xa8.data.shopName;
            $.actName = _0x4c92xa8.data.actName;
            if ($.openCardUrl) {
              $.joinVenderId = _0x4c92xa8.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1];
            }
            $.joinDes = _0x4c92xa8.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await getshopactivityId();
              for (let _0x4c92xa9 = 0; _0x4c92xa9 < Array(2).length; _0x4c92xa9++) {
                if (_0x4c92xa9 > 0) {
                  console.log("第" + _0x4c92xa9 + "次 重新开卡");
                }
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                  break;
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("开卡失败❌ ，重新执行脚本");
                  $.OpenCard = true;
                }
              }
            }
          } else {
            console.log(_0x4c92xa8);
          }
          if (_0x4c92xa7.status == 200) {
            refreshToken(_0x4c92xa7);
          }
        }
      } catch (_0x1dc2bd) {
        $.logErr(_0x1dc2bd, _0x4c92xa7);
      } finally {
        _0x4c92xa5();
      }
    });
  });
}
function follow() {
  return new Promise(_0x4c92xb9 => {
    let _0x4c92xbc = {};
    $.post(taskPostUrl("api/task/followShop/follow", _0x4c92xbc), async (_0x4c92xbd, _0x4c92xbe, _0x4c92xbf) => {
      try {
        if (_0x4c92xbd) {
          console.log("" + JSON.stringify(_0x4c92xbd));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          _0x4c92xbf = JSON.parse(_0x4c92xbf);
          if (_0x4c92xbf && _0x4c92xbf.resp_code == 0) {} else {
            console.log(_0x4c92xbf.resp_msg);
            for (let _0x4c92xc4 of ["未开始", "结束", "不存在", "不在"]) {
              if (_0x4c92xbf.resp_msg.includes(_0x4c92xc4)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (_0x4c92xbe.status == 200) {
            refreshToken(_0x4c92xbe);
          }
        }
      } catch (_0x24aa9d) {
        $.logErr(_0x24aa9d, _0x4c92xbe);
      } finally {
        _0x4c92xb9();
      }
    });
  });
}
function activity() {
  return new Promise(_0x4c92xcd => {
    let _0x4c92xd8 = {};
    $.post(taskPostUrl("api/task/jiugongge/activity", _0x4c92xd8), async (_0x4c92xd9, _0x4c92xda, _0x4c92xdb) => {
      try {
        if (_0x4c92xd9) {
          console.log("" + JSON.stringify(_0x4c92xd9));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          _0x4c92xdb = JSON.parse(_0x4c92xdb);
          if (_0x4c92xdb && _0x4c92xdb.data) {
            $.taskslist = _0x4c92xdb.data.taskList || [];
          } else {
            console.log(_0x4c92xdb.resp_msg);
            for (let _0x4c92xdf of ["未开始", "结束", "不存在", "不在"]) {
              if (_0x4c92xdb.resp_msg.includes(_0x4c92xdf)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (_0x4c92xda.status == 200) {
            refreshToken(_0x4c92xda);
          }
        }
      } catch (_0x653a15) {
        $.logErr(_0x653a15, _0x4c92xda);
      } finally {
        _0x4c92xcd();
      }
    });
  });
}
function addSku() {
  return new Promise(_0x4c92xf3 => {
    let _0x4c92xfd = {};
    $.post(taskPostUrl("api/task/addSku/activity", _0x4c92xfd), async (_0x4c92xfe, _0x4c92xff, _0x4c92x100) => {
      try {
        if (_0x4c92xfe) {
          console.log("" + JSON.stringify(_0x4c92xfe));
          console.log($.name + " addSku API请求失败，请检查网路重试");
        } else {
          _0x4c92x100 = JSON.parse(_0x4c92x100);
          if (_0x4c92x100 && _0x4c92x100.data) {
            $.taskId = _0x4c92x100.data.addWares.taskId;
            $.finishNum = _0x4c92x100.data.addWares.finishNum;
            $.finishType = _0x4c92x100.data.addWares.finishType;
            $.oneClickPurchase = _0x4c92x100.data.addWares.oneClickPurchase;
            $.followShopStatus = _0x4c92x100.data.addWares.followShopStatus;
            $.completeCount = _0x4c92x100.data.addWares.completeCount;
            $.prizeResultNum = _0x4c92x100.data.prizeResultNum;
            $.skuInfoVO = _0x4c92x100.data.addWares.skuInfoVO || [];
            console.log("活动奖励剩余：" + $.prizeResultNum);
            if ($.prizeResultNum <= 0) {
              $.maxcountnum = true;
              console.log("宝，活动已无奖励剩余");
            }
          } else {
            console.log(_0x4c92x100);
            for (let _0x4c92x10a of ["未开始", "结束", "不存在", "不在"]) {
              if (_0x4c92x100.resp_msg.includes(_0x4c92x10a)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (_0x4c92xff.status == 200) {
            refreshToken(_0x4c92xff);
          }
        }
      } catch (_0x99d4a0) {
        $.logErr(_0x99d4a0, _0x4c92xff);
      } finally {
        _0x4c92xf3();
      }
    });
  });
}
function toDo() {
  return new Promise(_0x4c92x123 => {
    let _0x4c92x12e = {
      "taskId": $.taskId,
      "skuId": $.skuId
    };
    $.post(taskPostUrl("api/task/addSku/toDo", _0x4c92x12e), async (_0x4c92x12f, _0x4c92x130, _0x4c92x131) => {
      try {
        if (_0x4c92x12f) {
          console.log("" + JSON.stringify(_0x4c92x12f));
          console.log($.name + " toDo API请求失败，请检查网路重试");
        } else {
          _0x4c92x131 = JSON.parse(_0x4c92x131);
          if (_0x4c92x131 && _0x4c92x131.resp_code == 0) {
            if (_0x4c92x131.data === "") {
              console.log("💨  空气");
            } else {
              drawInfo = _0x4c92x131.data;
              if (drawInfo) {
                switch (drawInfo.prizeType) {
                  case 1:
                    console.log("🎉 " + drawInfo.prizeName + " 🐶");
                    break;
                  case 3:
                    generateId = _0x4c92x131.data.prizeInfoId;
                    prizeName = drawInfo.prizeName;
                    console.log(_0x4c92x131);
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    break;
                  case 4:
                  case 11:
                    console.log("🎉 " + drawInfo.prizeName + " 🎟️");
                    break;
                  case 2:
                    console.log("🎉 " + drawInfo.prizeName + " 优惠券");
                    break;
                  case 8:
                    console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                    break;
                  default:
                    console.log(_0x4c92x131);
                    break;
                }
              }
            }
          } else {
            console.log(_0x4c92x131.resp_msg);
            for (let _0x4c92x138 of ["未开始", "结束", "不存在", "不在"]) {
              if (_0x4c92x131.resp_msg.includes(_0x4c92x138)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (_0x4c92x130.status == 200) {
            refreshToken(_0x4c92x130);
          }
        }
      } catch (_0x32ae67) {
        $.logErr(_0x32ae67, _0x4c92x130);
      } finally {
        _0x4c92x123();
      }
    });
  });
}
function basicInfo() {
  return new Promise(_0x4c92x14d => {
    let _0x4c92x151 = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", _0x4c92x151), async (_0x4c92x152, _0x4c92x153, _0x4c92x154) => {
      try {
        if (_0x4c92x152) {
          console.log("" + JSON.stringify(_0x4c92x152));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          _0x4c92x154 = JSON.parse(_0x4c92x154);
          if (_0x4c92x154 && _0x4c92x154.resp_code == 0) {
            $.actName = _0x4c92x154.data.actName;
            $.shopName = _0x4c92x154.data.shopName;
          } else {
            console.log(_0x4c92x154);
          }
          if (_0x4c92x153.status == 200) {
            refreshToken(_0x4c92x153);
          }
        }
      } catch (_0x2dd9f8) {
        $.logErr(_0x2dd9f8, _0x4c92x153);
      } finally {
        _0x4c92x14d();
      }
    });
  });
}
function drawPrize() {
  return new Promise(_0x4c92x161 => {
    let _0x4c92x171 = {};
    $.post(taskPostUrl("api/prize/drawPrize", _0x4c92x171), async (_0x4c92x172, _0x4c92x173, _0x4c92x174) => {
      try {
        if (_0x4c92x172) {
          console.log("" + JSON.stringify(_0x4c92x172));
          console.log($.name + " drawPrize API请求失败，请检查网路重试");
        } else {
          _0x4c92x174 = JSON.parse(_0x4c92x174);
          if (_0x4c92x174 && _0x4c92x174.resp_code == 0) {
            $.drawNumber = _0x4c92x174.data.drawNumber;
            $.prizeInfo = _0x4c92x174.data.prizeInfo || [];
          } else {
            console.log(_0x4c92x174);
          }
          if (_0x4c92x173.status == 200) {
            refreshToken(_0x4c92x173);
          }
        }
      } catch (_0x34dd67) {
        $.logErr(_0x34dd67, _0x4c92x173);
      } finally {
        _0x4c92x161();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x4c92x180 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x4c92x18b = "";
    if ($.shopactivityId) {
      _0x4c92x18b = ",\"activityId\":" + $.shopactivityId;
    }
    const _0x4c92x18c = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x4c92x18b + ",\"channel\":406}";
    const _0x4c92x18d = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(_0x4c92x18c)
    };
    const _0x4c92x18e = await getH5st("8adfb", _0x4c92x18d);
    const _0x4c92x18f = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x4c92x18c + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x4c92x18e),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x4c92x18f, async (_0x4c92x190, _0x4c92x191, _0x4c92x192) => {
      try {
        if (_0x4c92x190) {
          if (_0x4c92x191 && typeof _0x4c92x191.statusCode != "undefined") {
            if (_0x4c92x191.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x4c92x192 = _0x4c92x192 && _0x4c92x192.match(/jsonp_.*?\((.*?)\);/) && _0x4c92x192.match(/jsonp_.*?\((.*?)\);/)[1] || _0x4c92x192;
          let _0x4c92x196 = $.toObj(_0x4c92x192, _0x4c92x192);
          if (_0x4c92x196 && typeof _0x4c92x196 == "object") {
            if (_0x4c92x196 && _0x4c92x196.success === true) {
              console.log(" >> " + _0x4c92x196.message);
              $.errorJoinShop = _0x4c92x196.message;
              if (_0x4c92x196.result && _0x4c92x196.result.giftInfo) {
                for (let _0x4c92x197 of _0x4c92x196.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + _0x4c92x197.discountString + _0x4c92x197.prizeName + _0x4c92x197.secondLineDesc);
                }
              }
            } else {
              if (_0x4c92x196 && typeof _0x4c92x196 == "object" && _0x4c92x196.message) {
                $.errorJoinShop = _0x4c92x196.message;
                console.log("" + (_0x4c92x196.message || ""));
              } else {
                console.log(_0x4c92x192);
              }
            }
          } else {
            console.log(_0x4c92x192);
          }
        }
      } catch (_0x5010b1) {
        $.logErr(_0x5010b1, _0x4c92x191);
      } finally {
        _0x4c92x180();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x4c92x1aa => {
    const _0x4c92x1ba = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x4c92x1bb = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(_0x4c92x1ba)
    };
    const _0x4c92x1bc = await getH5st("8adfb", _0x4c92x1bb);
    const _0x4c92x1bd = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x4c92x1ba + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x4c92x1bc),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x4c92x1bd, async (_0x4c92x1be, _0x4c92x1bf, _0x4c92x1c0) => {
      try {
        if (_0x4c92x1be) {
          if (_0x4c92x1bf && typeof _0x4c92x1bf.statusCode != "undefined") {
            if (_0x4c92x1bf.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x4c92x1c0 = _0x4c92x1c0 && _0x4c92x1c0.match(/jsonp_.*?\((.*?)\);/) && _0x4c92x1c0.match(/jsonp_.*?\((.*?)\);/)[1] || _0x4c92x1c0;
          let _0x4c92x1c5 = $.toObj(_0x4c92x1c0, _0x4c92x1c0);
          if (_0x4c92x1c5 && typeof _0x4c92x1c5 == "object") {
            if (_0x4c92x1c5 && _0x4c92x1c5.success == true) {
              console.log("去加入：" + (_0x4c92x1c5.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = _0x4c92x1c5.result.interestsRuleList && _0x4c92x1c5.result.interestsRuleList[0] && _0x4c92x1c5.result.interestsRuleList[0].interestsInfo && _0x4c92x1c5.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else {
            console.log(_0x4c92x1c0);
          }
        }
      } catch (_0x3bb862) {
        $.logErr(_0x3bb862, _0x4c92x1bf);
      } finally {
        _0x4c92x1aa();
      }
    });
  });
}
function taskPostUrl(_0x4c92x1c7, _0x4c92x1c8) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + _0x4c92x1c7,
    "body": JSON.stringify(_0x4c92x1c8),
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": activityUrl,
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    }
  };
}
function refreshToken(_0x4c92x1d1) {
  if (_0x4c92x1d1) {
    if (_0x4c92x1d1.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let _0x4c92x1d9 of _0x4c92x1d1.headers["set-cookie"]) {
        lz_cookie[_0x4c92x1d9.split(";")[0].substr(0, _0x4c92x1d9.split(";")[0].indexOf("="))] = _0x4c92x1d9.split(";")[0].substr(_0x4c92x1d9.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x4c92x1da of Object.keys(lz_cookie)) {
        cookie += _0x4c92x1da + "=" + lz_cookie[_0x4c92x1da] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(_0x4c92x1dc) {
  return new Promise(_0x4c92x1e4 => {
    const _0x4c92x1e5 = {
      "url": _0x4c92x1dc + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x4c92x1e5, async (_0x4c92x1e6, _0x4c92x1e7, _0x4c92x1e8) => {
      try {
        if (_0x4c92x1e6) {
          $.getAuthorCodeListerr = false;
        } else {
          if (_0x4c92x1e8) {
            _0x4c92x1e8 = JSON.parse(_0x4c92x1e8);
          }
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x47bc0e) {
        $.logErr(_0x47bc0e, _0x4c92x1e7);
        _0x4c92x1e8 = null;
      } finally {
        _0x4c92x1e4(_0x4c92x1e8);
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(_0x4c92x1ee) {
  _0x4c92x1ee = _0x4c92x1ee || 32;
  let _0x4c92x1f4 = "abcdef0123456789",
    _0x4c92x1f5 = _0x4c92x1f4.length,
    _0x4c92x1f6 = "";
  for (i = 0; i < _0x4c92x1ee; i++) {
    _0x4c92x1f6 += _0x4c92x1f4.charAt(Math.floor(Math.random() * _0x4c92x1f5));
  }
  return _0x4c92x1f6;
}
function getQueryString(_0x4c92x1f8, _0x4c92x1f9) {
  let _0x4c92x207 = new RegExp("(^|[&?])" + _0x4c92x1f9 + "=([^&]*)(&|$)");
  let _0x4c92x208 = _0x4c92x1f8.match(_0x4c92x207);
  if (_0x4c92x208 != null) {
    return unescape(_0x4c92x208[2]);
  }
  return "";
}
function safeGet(_0x4c92x20a) {
  if (!_0x4c92x20a) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(_0x4c92x20a) == "object") {
      return true;
    }
  } catch (_0x2a8487) {
    console.log(_0x2a8487);
    return false;
  }
}
function jsonParse(_0x4c92x212) {
  if (typeof _0x4c92x212 == "string") {
    try {
      return JSON.parse(_0x4c92x212);
    } catch (_0x30a5d5) {
      console.log(_0x30a5d5);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function random(_0x4c92x21d, _0x4c92x21e) {
  return Math.floor(Math.random() * (_0x4c92x21e - _0x4c92x21d)) + _0x4c92x21d;
}