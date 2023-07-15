/**
活动名称：邀请入会有礼（lzkj_loreal）
环境变量：jd_lzkj_loreal_invite_url // 活动链接
			jd_lzkj_loreal_invite_myhelpnum // 自定义邀请人数
			
			该活动基本只能领取一次奖励,建议手动领取
			
			支持下方链接：
			https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10006&activityId=xxxxxx&templateId=xxxxx&nodeId=xxxxx&prd=cjwx
			https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10070&activityId=xxxxxx&templateId=xxxxx&nodeId=xxxxx&prd=cjwx
			https://lorealjdcampaign-rc.isvjcloud.com/interact/index?activityType=10006&activityId=xxxxxx&templateId=xxxxx&nodeId=xxxxx&prd=crm
			
			1.1更新：优化
			1.11更新：优先领取最高奖励，未设置变量默认全部奖励领取

cron:11 11 11 11 **
============Quantumultx===============
[task_local]
#lzkj_loreal邀请入会有礼
11 11 11 11 ** jd_lzkj_loreal_invite.js, tag=lzkj_loreal邀请入会有礼, enabled=true
*/

const Env=require('./utils/Env.js');
const $ = new Env("邀请入会有礼（lzkj_loreal）");

const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const getToken = require("./function/krgetToken");
const getSign = require("./function/krgetSign");
const getH5st = require("./function/krh5st");
let lz_cookie = {};
let activityUrl = process.env.jd_lzkj_loreal_invite_url;
let activityCookie = "";
$.activityEnd = false;
let myCode = null;
let myhelpnum = process.env.jd_lzkj_loreal_invite_myhelpnum || null;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_invite_url) {
    activityUrl = process.env.jd_lzkj_loreal_invite_url;
  }
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(jdCookieNode).forEach(_0x98d1x10 => {
    cookiesArr.push(jdCookieNode[_0x98d1x10]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x98d1x10 => {
    return _0x98d1x10.cookie;
  })].filter(_0x98d1x10 => {
    return !!_0x98d1x10;
  });
}
let isGetCookie = typeof $request !== "undefined";
if (isGetCookie) {
  GetCookie();
  $.done();
}
if (activityUrl) {
  activityId = getQueryString(`${""}${activityUrl}${""}`, "activityId");
  activityType = getQueryString(`${""}${activityUrl}${""}`, "activityType");
  templateId = getQueryString(`${""}${activityUrl}${""}`, "templateId");
  if (activityUrl.includes("lorealjdcampaign-rc")) {
    wxActType = "apps/interact";
  } else {
    if (activityUrl.includes("lzkj")) {
      wxActType = activityUrl.match(/\/(prod\/cc\/interact\w*)\//)[1];
    } else {
      console.log("暂不支持的类型");
    }
  }
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
}
let domains = `${"https://"}${$.domain}${""}`;
!(async () => {
  if (!activityId) {
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
  authorCodeList = await getAuthorCodeList("http://code.kingran.ga/lzkj_loreal.json");
  $.jplq = false;
  for (let _0x98d1x14 = 0; _0x98d1x14 < cookiesArr.length; _0x98d1x14++) {
    if (cookiesArr[_0x98d1x14]) {
      cookie = cookiesArr[_0x98d1x14];
      originCookie = cookiesArr[_0x98d1x14];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x98d1x14 + 1;
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
      await lorealjdcampaign();
      await $.wait(3000);
      if (_0x98d1x14 == 0 && !$.shareUserId) {
        break;
      }
      if ($.hasEnd || $.activityEnd || $.outFlag) {
        break;
      }
    }
  }
  cookie = cookiesArr[0];
  if (cookie && $.jplq && !$.outFlag && !$.activityEnd) {
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.index = 1;
    message = "";
    $.bean = 0;
    $.nickName = "";
    await getUA();
    await acquire();
    await $.wait(3000);
  }
})().catch(_0x98d1x13 => {
  $.log("", `${" "}${$.name}${", 失败! 原因: "}${_0x98d1x13}${"!"}`, "");
}).finally(() => {
  $.done();
});
async function lorealjdcampaign() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.helpok = false;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取TOKEN失败 ❌");
    return;
  }
  if ($.token) {
    if (activityType == 10006 || activityType == 10070) {
      $.authorCode = myCode ? myCode : authorCodeList[random(0, authorCodeList.length)];
      console.log("去助力 🔜 " + $.authorCode);
      await task("api/user-info/login", {
        "status": "1",
        "activityId": activityId,
        "tokenPin": $.token,
        "source": "01",
        "shareUserId": $.authorCode
      });
      await $.wait(1000);
      await follow("api/task/followShop/follow", {});
      await task("api/active/basicInfo", {
        "activityId": activityId
      });
      let _0x98d1x16 = new Date().valueOf();
      $.startTimeStr = new Date($.startTime).valueOf();
      $.endTimeStr = new Date($.endTime).valueOf();
      if ($.endTimeStr <= _0x98d1x16) {
        console.log(`${"活动已经结束 ❌"}`);
        $.activityEnd = true;
        return;
      }
      if ($.startTimeStr >= _0x98d1x16) {
        console.log(`${"活动开始时间："}` + new Date(parseInt($.startTime)).toLocaleString());
        $.activityEnd = true;
        return;
      }
      await $.wait(1000);
      await task("api/task/member/getMember", {
        "shareUserId": $.authorCode
      });
      if ($.index === 1) {
        await task("api/task/member/prizeList", {});
      }
      await task("api/task/share/getUserId", {});
      if (!$.shareUserId) {
        console.log("获取不到助力码退出执行，请重新执行");
        return;
      }
      await $.wait(1000);
      await getshopactivityId();
      await $.wait(1000);
      if ($.openCardStatus === 0) {
        console.log("还不是店铺会员 👁‍🗨");
        $.errorJoinShop = "";
        for (let _0x98d1x14 = 0; _0x98d1x14 < Array(2).length; _0x98d1x14++) {
          if (_0x98d1x14 > 0) {
            console.log(`${"第"}${_0x98d1x14}${"次 重新开卡"}`);
          }
          await joinShop();
          await $.wait(2000);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
            break;
          }
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
            console.log("开卡失败❌ ，重新执行脚本");
          }
        }
        await $.wait(1000);
        await task("api/user-info/login", {
          "status": "0",
          "activityId": activityId,
          "tokenPin": $.token,
          "source": "01",
          "shareUserId": $.authorCode
        });
        await $.wait(1000);
        await task("api/task/bargain/guest/myself", {
          "shareUserId": $.authorCode
        });
        await $.wait(1000);
        await task("api/task/member/getMember", {
          "shareUserId": $.authorCode
        });
        await $.wait(1000);
        await task("api/join/check", {
          "status": "0"
        });
        if ($.index > 1) {
          if ($.errorJoinShop != "您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑") {
            $.helpok = true;
            console.log("助力成功 ✅\n");
          }
        }
      } else {
        console.log("已开通店铺会员  ❌");
      }
      if ($.hasEnd || $.activityEnd || $.outFlag) {
        return;
      }
      await $.wait(1000);
      if ($.index == 1) {
        $.helpNum = $.shareUser;
      } else {
        if ($.helpok == true) {
          $.helpNum++;
        }
      }
      let _0x98d1x17 = parseInt($.days) - parseInt($.shareUserNum);
      $.authorhelpnum = myhelpnum ? myhelpnum : _0x98d1x17;
      console.log("活动需助力人数 🤼‍ " + $.authorhelpnum);
      console.log(`${"【账号"}${$.index}${"】已邀请人数：-> "}${$.shareUser}${""}${$.index != 1 && " 【账号1】已邀请人数：-> " + $.helpNum || ""}${""}`);
      if ($.index == 1) {
        await $.wait(1000);
        myCode = $.shareUserId;
        console.log("后面账号助力 🔜 " + myCode);
      }
      if ($.helpNum >= $.authorhelpnum) {
        console.log("\n满足领取条件去领取 🍰 ");
        $.jplq = true;
        $.hasEnd = true;
      }
    } else {
      console.log("暂不支持的类型 ❌");
      return;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
async function acquire() {
  $.token = "";
  $.Pin = "";
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取TOKEN失败 ❌");
    return;
  }
  if ($.token) {
    await task("api/user-info/login", {
      "status": "0",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": $.authorCode
    });
    await $.wait(1000);
    await follow("api/task/followShop/follow", {});
    await task("api/task/member/getMember", {
      "shareUserId": $.authorCode
    });
    await $.wait(1000);
    await task("api/task/member/prizeList", {});
    await $.wait(2000);
    console.log("先领取最高档奖励 -> " + $.prizeInfoId);
    await task("api/prize/receive/acquire", {
      "prizeInfoId": $.prizeInfoId
    });
    await $.wait(2000);
    console.log("开始领取奖励 🍰 ");
    await lqprizeList("api/task/member/prizeList", {});
  } else {
    $.log("没有成功获取到用户鉴权信息 ❌");
  }
}
function lqprizeList(_0x98d1x1a, _0x98d1x1b) {
  return new Promise(_0x98d1x1c => {
    $.post(taskPostUrl(_0x98d1x1a, _0x98d1x1b), async (_0x98d1x1d, _0x98d1x1e, _0x98d1x1f) => {
      try {
        if (_0x98d1x1d) {
          console.log("" + JSON.stringify(_0x98d1x1d));
          console.log($.name + " login API请求失败，请检查网路重试  ❌");
        } else {
          _0x98d1x1f = JSON.parse(_0x98d1x1f);
          if (_0x98d1x1f && _0x98d1x1f.data) {
            if ($.index === 1) {
              if (_0x98d1x1f.data.prizeInfo) {
                for (const _0x98d1x20 of _0x98d1x1f.data.prizeInfo) {
                  $.prizeInfoId = _0x98d1x20.id;
                  $.days = _0x98d1x20.days;
                  if (myhelpnum != null) {
                    if (myhelpnum == _0x98d1x20.days) {
                      console.log("奖品 🍰 " + _0x98d1x20.prizeName);
                      await task("api/prize/receive/acquire", {
                        "prizeInfoId": $.prizeInfoId
                      });
                      await $.wait(2000);
                    } else {
                      $.log("没有匹配到合适的奖品领取 ❌");
                    }
                  } else {
                    $.log("当前未设置变量，默认领取全部奖励");
                    console.log("奖品 🍰 " + _0x98d1x20.prizeName);
                    await task("api/prize/receive/acquire", {
                      "prizeInfoId": $.prizeInfoId
                    });
                    await $.wait(2000);
                  }
                }
              }
            }
          } else {
            console.log(_0x98d1x1f);
          }
          if (_0x98d1x1e.status == 200) {
            refreshToken(_0x98d1x1e);
          }
        }
      } catch (e) {
        $.logErr(e, _0x98d1x1e);
      } finally {
        _0x98d1x1c();
      }
    });
  });
}
function task(_0x98d1x1a, _0x98d1x1b) {
  Object.assign(_0x98d1x1b);
  return new Promise(_0x98d1x1c => {
    $.post(taskPostUrl(_0x98d1x1a, _0x98d1x1b), async (_0x98d1x1d, _0x98d1x1e, _0x98d1x1f) => {
      try {
        if (_0x98d1x1d) {
          $.log(_0x98d1x1d);
        } else {
          if (_0x98d1x1e.status == 200) {
            refreshToken(_0x98d1x1e);
          }
          if (_0x98d1x1f) {
            _0x98d1x1f = JSON.parse(_0x98d1x1f);
            if (_0x98d1x1f) {
              if (_0x98d1x1f.resp_code === 0) {
                switch (_0x98d1x1a) {
                  case "api/user-info/login":
                    $.tokens = _0x98d1x1f.data.token;
                    $.customerId = _0x98d1x1f.data.customerId;
                    $.joinVenderId = _0x98d1x1f.data.joinInfo.shopId;
                    $.openCardUrl = _0x98d1x1f.data.joinInfo.openCardUrl;
                    $.shopName = _0x98d1x1f.data.shopName;
                    $.actName = _0x98d1x1f.data.actName;
                    if ($.openCardUrl) {
                      $.joinVenderId = _0x98d1x1f.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1];
                    }
                    $.joinDes = _0x98d1x1f.data.joinInfo.joinCodeInfo.joinDes;
                    if ($.index === 1) {
                      if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
                        $.errorJoinShop = "";
                        for (let _0x98d1x14 = 0; _0x98d1x14 < Array(2).length; _0x98d1x14++) {
                          if (_0x98d1x14 > 0) {
                            console.log(`${"第"}${_0x98d1x14}${"次 重新开卡"}`);
                          }
                          await joinShop();
                          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                            break;
                          }
                          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                            console.log("开卡失败❌ ，重新执行脚本");
                          }
                        }
                      }
                    }
                    break;
                  case "api/active/basicInfo":
                    $.startTime = _0x98d1x1f.data.startTime;
                    $.endTime = _0x98d1x1f.data.endTime;
                    $.shopName = _0x98d1x1f.data.shopName;
                    $.actName = _0x98d1x1f.data.actName;
                    break;
                  case "api/task/member/getMember":
                    if ($.index === 1 || $.shareUserNum === 1) {
                      console.log("当前已邀请人数 🤼‍  " + _0x98d1x1f.data.shareUser);
                      $.shareUser = _0x98d1x1f.data.shareUser;
                    }
                    break;
                  case "api/task/member/prizeList":
                    if ($.index === 1) {
                      if (_0x98d1x1f.data.prizeInfo) {
                        for (const _0x98d1x20 of _0x98d1x1f.data.prizeInfo) {
                          console.log("奖品：" + _0x98d1x20.prizeName + "  助力人数：" + _0x98d1x20.days + "  库存：" + _0x98d1x20.leftNum);
                          $.prizeInfoId = _0x98d1x20.id;
                          $.days = _0x98d1x20.days;
                        }
                      }
                    }
                    break;
                  case "api/task/bargain/guest/myself":
                    break;
                  case "api/join/check":
                    break;
                  case "api/prize/receive/acquire":
                    $.prizeType = _0x98d1x1f.data.prizeType;
                    $.addressId = _0x98d1x1f.data.addressId;
                    if ($.prizeType === 3) {
                      console.log("实物请手动进入活动领取 🍰 ");
                    } else {
                      console.log("获得奖励 🍰 " + _0x98d1x1f.data.prizeName);
                    }
                    break;
                  case "api/task/share/getUserId":
                    $.shareUserId = _0x98d1x1f.data.shareUserId;
                    break;
                  default:
                    break;
                }
              }
            }
          } else {
            $.log("京东没有返回数据 ❌");
          }
        }
      } catch (e) {
        $.log(e);
      } finally {
        _0x98d1x1c();
      }
    });
  });
}
function showMsg() {
  return new Promise(_0x98d1x1c => {
    $.msg($.name, "", `${"【京东账号"}${$.index}${"】"}${$.nickName}${"\\n"}${message}${""}`);
    _0x98d1x1c();
  });
}
function follow(_0x98d1x1a, _0x98d1x1b) {
  return new Promise(_0x98d1x1c => {
    let _0x98d1x1b = {};
    $.post(taskPostUrl(_0x98d1x1a, _0x98d1x1b), async (_0x98d1x1d, _0x98d1x1e, _0x98d1x1f) => {
      try {
        if (_0x98d1x1d) {
          console.log("" + JSON.stringify(_0x98d1x1d));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          _0x98d1x1f = JSON.parse(_0x98d1x1f);
          if (_0x98d1x1f && _0x98d1x1f.resp_code == 0) {} else {
            console.log(_0x98d1x1f.resp_msg);
            for (let _0x98d1x13 of ["未开始", "结束", "不存在", "不在"]) {
              if (_0x98d1x1f.resp_msg.includes(_0x98d1x13)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (_0x98d1x1e.status == 200) {
            refreshToken(_0x98d1x1e);
          }
        }
      } catch (_0x98d1x13) {
        $.logErr(_0x98d1x13, _0x98d1x1e);
      } finally {
        _0x98d1x1c();
      }
    });
  });
}
function login(_0x98d1x1a, _0x98d1x1b) {
  return new Promise(_0x98d1x1c => {
    $.post(taskPostUrl(_0x98d1x1a, _0x98d1x1b), async (_0x98d1x1d, _0x98d1x1e, _0x98d1x1f) => {
      try {
        if (_0x98d1x1d) {
          console.log("" + JSON.stringify(_0x98d1x1d));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          _0x98d1x1f = JSON.parse(_0x98d1x1f);
          if (_0x98d1x1f && _0x98d1x1f.data) {
            $.tokens = _0x98d1x1f.data.token;
            $.customerId = _0x98d1x1f.data.customerId;
            $.joinVenderId = _0x98d1x1f.data.joinInfo.shopId;
            $.openCardUrl = _0x98d1x1f.data.joinInfo.openCardUrl;
            $.shopName = _0x98d1x1f.data.shopName;
            $.actName = _0x98d1x1f.data.actName;
            if ($.openCardUrl) {
              $.joinVenderId = _0x98d1x1f.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1];
            }
            console.log($.joinDes);
            $.joinDes = _0x98d1x1f.data.joinInfo.joinCodeInfo.joinDes;
            console.log($.joinDes);
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              for (let _0x98d1x14 = 0; _0x98d1x14 < Array(2).length; _0x98d1x14++) {
                if (_0x98d1x14 > 0) {
                  console.log(`${"第"}${_0x98d1x14}${"次 重新开卡"}`);
                }
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                  break;
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("开卡失败❌ ，重新执行脚本");
                }
              }
            }
          } else {
            console.log(_0x98d1x1f);
          }
          if (_0x98d1x1e.status == 200) {
            refreshToken(_0x98d1x1e);
          }
        }
      } catch (e) {
        $.logErr(e, _0x98d1x1e);
      } finally {
        _0x98d1x1c();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x98d1x1c => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x98d1x26 = `${""}`;
    if ($.shopactivityId) {
      _0x98d1x26 = `${",\"activityId\":"}${$.shopactivityId}${""}`;
    }
    const _0x98d1x27 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"shopId\":\""}${$.joinVenderId}${"\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0"}${_0x98d1x26}${",\"channel\":406}"}`;
    const _0x98d1x28 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x98d1x27)
    };
    for (var _0x98d1x29 = "", _0x98d1x2a = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", _0x98d1x2b = 0; _0x98d1x2b < 16; _0x98d1x2b++) {
      var _0x98d1x14 = Math.round(Math.random() * (_0x98d1x2a.length - 1));
      _0x98d1x29 += _0x98d1x2a.substring(_0x98d1x14, _0x98d1x14 + 1);
    }
    uuid = Buffer.from(_0x98d1x29, "utf8").toString("base64");
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
    const _0x98d1x2c = await getH5st("8adfb", _0x98d1x28);
    const _0x98d1x2d = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body="}${_0x98d1x27}${"&ef=1&ep="}${ep}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x98d1x2c)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x98d1x2d, async (_0x98d1x1d, _0x98d1x1e, _0x98d1x1f) => {
      try {
        if (_0x98d1x1d) {
          if (_0x98d1x1e && typeof _0x98d1x1e.statusCode != "undefined") {
            if (_0x98d1x1e.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x98d1x1f = _0x98d1x1f && _0x98d1x1f.match(/jsonp_.*?\((.*?)\);/) && _0x98d1x1f.match(/jsonp_.*?\((.*?)\);/)[1] || _0x98d1x1f;
          let _0x98d1x2e = $.toObj(_0x98d1x1f, _0x98d1x1f);
          if (_0x98d1x2e && typeof _0x98d1x2e == "object") {
            if (_0x98d1x2e && _0x98d1x2e.success === true) {
              console.log(`${" >> "}${_0x98d1x2e.message}${""}`);
              $.errorJoinShop = _0x98d1x2e.message;
              if (_0x98d1x2e.result && _0x98d1x2e.result.giftInfo) {
                for (let _0x98d1x14 of _0x98d1x2e.result.giftInfo.giftList) {
                  console.log(`${" >> 入会获得："}${_0x98d1x14.discountString}${""}${_0x98d1x14.prizeName}${""}${_0x98d1x14.secondLineDesc}${""}`);
                }
              }
            } else {
              if (_0x98d1x2e && typeof _0x98d1x2e == "object" && _0x98d1x2e.message) {
                $.errorJoinShop = _0x98d1x2e.message;
                console.log(`${""}${_0x98d1x2e.message || ""}${""}`);
              } else {
                console.log(_0x98d1x1f);
              }
            }
          } else {
            console.log(_0x98d1x1f);
          }
        }
      } catch (e) {
        $.logErr(e, _0x98d1x1e);
      } finally {
        _0x98d1x1c();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x98d1x1c => {
    const _0x98d1x27 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"channel\":401}"}`;
    sign = await getSign("getShopOpenCardInfo", JSON.parse(_0x98d1x27));
    const _0x98d1x2d = {
      url: `${"https://api.m.jd.com/client.action?functionId=getShopOpenCardInfo&"}${sign.body}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x98d1x2d, async (_0x98d1x1d, _0x98d1x1e, _0x98d1x1f) => {
      try {
        if (_0x98d1x1d) {
          if (_0x98d1x1e && typeof _0x98d1x1e.statusCode != "undefined") {
            if (_0x98d1x1e.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x98d1x1f = _0x98d1x1f && _0x98d1x1f.match(/jsonp_.*?\((.*?)\);/) && _0x98d1x1f.match(/jsonp_.*?\((.*?)\);/)[1] || _0x98d1x1f;
          let _0x98d1x2e = $.toObj(_0x98d1x1f, _0x98d1x1f);
          if (_0x98d1x2e && typeof _0x98d1x2e == "object") {
            if (_0x98d1x2e && _0x98d1x2e.success == true) {
              $.openCardStatus = _0x98d1x2e.result.userInfo.openCardStatus;
            }
          } else {
            console.log(_0x98d1x1f);
          }
        }
      } catch (e) {
        $.logErr(e, _0x98d1x1e);
      } finally {
        _0x98d1x1c();
      }
    });
  });
}
function taskPostUrl(_0x98d1x31, _0x98d1x1b) {
  return {
    url: "" + domains + "/" + wxActType + "/" + _0x98d1x31,
    body: JSON.stringify(_0x98d1x1b),
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      Host: $.domain,
      Origin: domains,
      "Content-Type": "application/json;charset=UTF-8",
      Referer: activityUrl,
      Cookie: cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    }
  };
}
function refreshToken(_0x98d1x1e) {
  if (_0x98d1x1e) {
    if (_0x98d1x1e.headers["set-cookie"]) {
      cookie = `${""}${originCookie}${";"}`;
      for (let _0x98d1x33 of _0x98d1x1e.headers["set-cookie"]) {
        lz_cookie[_0x98d1x33.split(";")[0].substr(0, _0x98d1x33.split(";")[0].indexOf("="))] = _0x98d1x33.split(";")[0].substr(_0x98d1x33.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x98d1x34 of Object.keys(lz_cookie)) {
        cookie += _0x98d1x34 + "=" + lz_cookie[_0x98d1x34] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(_0x98d1x31) {
  return new Promise(_0x98d1x1c => {
    const _0x98d1x2d = {
      url: `${""}${_0x98d1x31}${"?"}${new Date()}${""}`,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x98d1x2d, async (_0x98d1x1d, _0x98d1x1e, _0x98d1x1f) => {
      try {
        if (_0x98d1x1d) {
          $.getAuthorCodeListerr = false;
        } else {
          if (_0x98d1x1f) {
            _0x98d1x1f = JSON.parse(_0x98d1x1f);
          }
          $.getAuthorCodeListerr = true;
        }
      } catch (e) {
        $.logErr(e, _0x98d1x1e);
        _0x98d1x1f = null;
      } finally {
        _0x98d1x1c(_0x98d1x1f);
      }
    });
  });
}
function getUA() {
  $.UA = `${"jdapp;iPhone;10.2.2;14.3;"}${randomString(40)}${";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"}`;
}
function randomString(_0x98d1x13) {
  _0x98d1x13 = _0x98d1x13 || 32;
  let _0x98d1x29 = "abcdef0123456789",
    _0x98d1x38 = _0x98d1x29.length,
    _0x98d1x2a = "";
  for (i = 0; i < _0x98d1x13; i++) {
    _0x98d1x2a += _0x98d1x29.charAt(Math.floor(Math.random() * _0x98d1x38));
  }
  return _0x98d1x2a;
}
function getQueryString(_0x98d1x31, _0x98d1x3a) {
  let _0x98d1x3b = new RegExp("(^|[&?])" + _0x98d1x3a + "=([^&]*)(&|$)");
  let _0x98d1x2b = _0x98d1x31.match(_0x98d1x3b);
  if (_0x98d1x2b != null) {
    return unescape(_0x98d1x2b[2]);
  }
  return "";
}
function safeGet(_0x98d1x1f) {
  if (!_0x98d1x1f) {
    console.log(`${"京东服务器返回数据为空"}`);
    return false;
  }
  try {
    if (typeof JSON.parse(_0x98d1x1f) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}
function jsonParse(_0x98d1x3e) {
  if (typeof _0x98d1x3e == "string") {
    try {
      return JSON.parse(_0x98d1x3e);
    } catch (e) {
      console.log(e);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function random(_0x98d1x40, _0x98d1x41) {
  return Math.floor(Math.random() * (_0x98d1x41 - _0x98d1x40)) + _0x98d1x40;
}