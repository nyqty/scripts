/*
超级无线 · 品类联合任务

只开卡做任务不抽奖，抽奖是另一个脚本，有水再抽
邀请好友最多获得30次抽奖机会

变量：
//export jd_categoryUnion_activityId='活动ID'     必须
//export jd_categoryUnion_blacklist='' // 黑名单 用&隔开 pin值
//export JD_LZ_OPEN="false" //关闭LZ相关活动运行

cron:10 11 1 1 *
============Quantumultx===============
[task_local]
#品类联合任务
10 11 1 1 * jd_categoryUnion.js, tag=品类联合任务 , enabled=true

*/
const Env=require('./utils/Env.js');
const $ = new Env('品类联合任务');
const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
const getToken = require("./function/krgetToken");
let lz_cookie = {};
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x747ex7 => {
    cookiesArr.push(jdCookieNode[_0x747ex7]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x747ex7 => {
    return _0x747ex7.cookie;
  })].filter(_0x747ex7 => {
    return !!_0x747ex7;
  });
}
$.activityId = process.env.jd_categoryUnion_activityId ? process.env.jd_categoryUnion_activityId : "";
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
$.shareTimes = 0;
let lz_jdpin_token_cookie = "";
let activityCookie = "";
let shareNum = 0;
let actorUuidArr = [];
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_categoryUnion_whitelist || whitelist;
$.blacklist = process.env.jd_categoryUnion_blacklist || blacklist;
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
  $.venderIds = "688693";
  authorCodeList = [];
  $.authorCode = authorCodeList[random(0, authorCodeList.length)];
  $.shareUuid = $.authorCode;
  console.log("活动入口: https://lzdz-isv.isvjd.com/categoryUnion/categoryUnionActivity/activity?activityId=" + $.activityId + "&tplId=0003&friendid=" + $.shareUuid);
  for (let _0x747ex10 = 0; _0x747ex10 < cookiesArr.length; _0x747ex10++) {
    cookie = cookiesArr[_0x747ex10];
    originCookie = cookiesArr[_0x747ex10];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x747ex10 + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      await getUA();
      await run();
      await $.wait(2000);
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  if ($.outFlag) {
    let _0x747ex11 = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, `${""}`, `${""}${_0x747ex11}${""}`);
    if ($.isNode()) {
      await notify.sendNotify(`${""}${$.name}${""}`, `${""}${_0x747ex11}${""}`);
    }
  }
})().catch(_0x747exf => {
  return $.logErr(_0x747exf);
}).finally(() => {
  return $.done();
});
async function run() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    let _0x747ex13 = false;
    $.Token = await getToken(originCookie, "https://lzdz-isv.isvjd.com");
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
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await takePostRequest("getUserInfo");
    $.openList = [];
    $.allOpenCard = false;
    await takePostRequest("activityContent");
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    await takePostRequest("drawContent");
    await $.wait(1000);
    if ($.allOpenCard == false) {
      console.log("开卡关注任务");
      for (o of $.openList) {
        $.openCard = false;
        if (o.openStatus == false) {
          _0x747ex13 = true;
          $.joinVenderId = o.venderId;
          $.errorJoinShop = "";
          await getshopactivityId();
          for (let _0x747ex10 = 0; _0x747ex10 < Array(5).length; _0x747ex10++) {
            if (_0x747ex10 > 0) {
              console.log(`${"第"}${_0x747ex10}${"次 重新开卡"}`);
            }
            await joinShop();
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
              break;
            }
            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
              console.log("开卡失败❌ ，重新执行脚本");
            }
            await takePostRequest("activityContent");
            await takePostRequest("drawContent");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
          }
        }
        if (o.followShopStatus == false) {
          $.venderIdss = o.venderId;
          $.visitSkuValue = $.venderIdss;
          await takePostRequest("关注");
          await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
      }
    } else {
      console.log("已全部关注开卡");
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    console.log(`${"助力码："}${$.actorUuid}${""}`);
    if ($.index != 1) {
      console.log(`${"当前助力 -> "}${$.shareUuid}${""}`);
    }
    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
    }
    if ($.shareTimes == $.maxShareCount) {
      shareNum += 1;
      $.shareTimes = 0;
      $.shareUuid = actorUuidArr[shareNum];
      console.log(`${"当前助力已满，受助账号自动切换为后面的头部账号"}`);
    }
  } catch (e) {
    console.log(e);
  }
}
async function takePostRequest(_0x747ex15) {
  if ($.outFlag) {
    return;
  }
  let _0x747ex16 = "https://lzdz-isv.isvjd.com";
  let _0x747ex17 = `${""}`;
  let _0x747ex18 = "POST";
  switch (_0x747ex15) {
    case "getMyPing":
      _0x747ex16 = `${""}${_0x747ex16}${"/customer/getMyPing"}`;
      _0x747ex17 = `${"userId=688693&token="}${$.Token}${"&fromType=APP"}`;
      break;
    case "accessLogWithAD":
      let _0x747ex1a = `${""}${_0x747ex16}${"/drawCenter/activity?activityId="}${$.activityId}${"&tplId=0003&shareUuid="}${$.shareUuid}${""}`;
      _0x747ex16 = `${""}${_0x747ex16}${"/common/accessLogWithAD"}`;
      _0x747ex17 = `${"venderId="}${$.shopId || $.venderId || $.venderIds || ""}${"&code=99&pin="}${encodeURIComponent($.Pin)}${"&activityId="}${$.activityId}${"&tplId=0003&pageUrl="}${encodeURIComponent(_0x747ex1a)}${"&subType=app&adSource="}`;
      break;
    case "getUserInfo":
      _0x747ex16 = `${""}${_0x747ex16}${"/wxActionCommon/getUserInfo"}`;
      _0x747ex17 = `${"pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    case "activityContent":
      _0x747ex16 = `${""}${_0x747ex16}${"/categoryUnion/activityContent"}`;
      _0x747ex17 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&pinImg="}${encodeURIComponent($.attrTouXiang)}${"&nick="}${encodeURIComponent($.nickname)}${"&shareUuid="}${$.shareUuid}${""}`;
      break;
    case "drawContent":
      _0x747ex16 = `${""}${_0x747ex16}${"/dingzhi/taskact/common/drawContent"}`;
      _0x747ex17 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    case "关注":
    case "加购":
      _0x747ex16 = `${""}${_0x747ex16}${"/wxActionCommon/followShop"}`;
      _0x747ex17 = `${"activityId="}${$.activityId}${"&buyerNick="}${encodeURIComponent($.Pin)}${"&userId="}${$.visitSkuValue}${"&actorUuid="}${$.actorUuid}${"&activityType=99&shareUuid="}${$.shareUuid}${""}`;
      break;
    case "领取奖励":
      _0x747ex16 = `${""}${_0x747ex16}${"/categoryUnion/getInfo"}`;
      _0x747ex17 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&actorUuid="}${$.actorUuid}${""}`;
      break;
    case "luckyDraw":
      _0x747ex16 = `${""}${_0x747ex16}${"/categoryUnion/luckyDraw"}`;
      _0x747ex17 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&actorUuid="}${$.actorUuid}${""}`;
      break;
    case "getDrawRecordHasCoupon":
      _0x747ex16 = `${""}${_0x747ex16}${"/dingzhi/taskact/common/getDrawRecordHasCoupon"}`;
      _0x747ex17 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&actorUuid="}${$.actorUuid}${""}`;
      break;
    case "getShareRecord":
      _0x747ex16 = `${""}${_0x747ex16}${"/categoryUnion/getAssistInfo"}`;
      _0x747ex17 = `${"activityId="}${$.activityId}${"&actorUuid="}${$.actorUuid}${"&sortStatus=1"}`;
      break;
    default:
      console.log(`${"错误"}${_0x747ex15}${""}`);
  }
  let _0x747ex1b = getPostRequest(_0x747ex16, _0x747ex17, _0x747ex18);
  return new Promise(async _0x747ex1c => {
    $.post(_0x747ex1b, (_0x747ex1d, _0x747ex1e, _0x747ex1f) => {
      try {
        setActivityCookie(_0x747ex1e);
        if (_0x747ex1d) {
          if (_0x747ex1e && typeof _0x747ex1e.statusCode != "undefined") {
            if (_0x747ex1e.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.toStr(_0x747ex1d, _0x747ex1d)}${""}`);
          console.log(`${""}${_0x747ex15}${" API请求失败，请检查网路重试"}`);
        } else {
          dealReturn(_0x747ex15, _0x747ex1f);
        }
      } catch (e) {
        console.log(e, _0x747ex1e);
      } finally {
        _0x747ex1c();
      }
    });
  });
}
async function dealReturn(_0x747ex15, _0x747ex1f) {
  let _0x747ex21 = "";
  try {
    if (_0x747ex15 != "accessLogWithAD" || _0x747ex15 != "drawContent") {
      if (_0x747ex1f) {
        _0x747ex21 = JSON.parse(_0x747ex1f);
      }
    }
  } catch (e) {
    console.log(`${""}${_0x747ex15}${" 执行任务异常"}`);
    console.log(_0x747ex1f);
    $.runFalag = false;
  }
  try {
    switch (_0x747ex15) {
      case "getMyPing":
        if (typeof _0x747ex21 == "object") {
          if (_0x747ex21.result && _0x747ex21.result === true) {
            if (_0x747ex21.data && typeof _0x747ex21.data.secretPin != "undefined") {
              $.Pin = _0x747ex21.data.secretPin;
            }
            if (_0x747ex21.data && typeof _0x747ex21.data.nickname != "undefined") {
              $.nickname = _0x747ex21.data.nickname;
            }
          } else {
            if (_0x747ex21.errorMessage) {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex21.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
        }
        break;
      case "getUserInfo":
        $.attrTouXiang = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
        if (typeof _0x747ex21 == "object") {
          if (_0x747ex21.result && _0x747ex21.result === true) {
            if (_0x747ex21.data && typeof _0x747ex21.data.yunMidImageUrl != "undefined") {
              $.attrTouXiang = _0x747ex21.data.yunMidImageUrl || $.attrTouXiang;
            }
          } else {
            if (_0x747ex21.errorMessage) {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex21.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
        }
        break;
      case "activityContent":
        if (typeof _0x747ex21 == "object") {
          if (_0x747ex21.result && _0x747ex21.result === true) {
            $.hasEnd = _0x747ex21.data.hasEnd || false;
            $.taskData = _0x747ex21.data.drawContent || {};
            $.actorUuid = _0x747ex21.data.actorUuid || "";
            $.unionShopInfos = _0x747ex21.data.unionShopInfo || [];
            $.allOpenCard = _0x747ex21.data.openCardStatus.data.allOpenCard || false;
            $.openList = _0x747ex21.data.openCardStatus.data.openInfo || [];
            $.maxShareCount = _0x747ex21.data.maxShareCount;
            $.score = _0x747ex21.data.score || 0;
            actorUuidArr.push($.actorUuid);
            if ($.index != 1) {
              $.shareTimes += 1;
            }
          } else {
            if (_0x747ex21.errorMessage) {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex21.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
        }
        break;
      case "luckyDraw":
        if (typeof _0x747ex21 == "object") {
          if (_0x747ex21.result && _0x747ex21.result === true) {
            console.log(`${"获得："}${_0x747ex21.data.name}${""}`);
          } else {
            if (_0x747ex21.result === false) {
              console.log(`${"空气"}`);
            } else {
              console.log(`${""}${_0x747ex1f}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x747ex1f}${""}`);
        }
        break;
      case "关注":
      case "加购":
        if (typeof _0x747ex21 == "object") {
          if (_0x747ex21.result && _0x747ex21.result === true) {
            console.log(`${"已完成关注"}`);
          } else {
            if (_0x747ex21.errorMessage) {
              console.log(`${""}${_0x747ex21.result}${""}`);
            } else {
              console.log(`${""}${_0x747ex21.result}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x747ex21.result}${""}`);
        }
        break;
      case "领取奖励":
        if (typeof _0x747ex21 == "object") {
          if (_0x747ex21.result && _0x747ex21.result === true) {
            if (typeof _0x747ex21.data == "object") {
              let _0x747ex11 = "";
              let _0x747ex22 = _0x747ex15;
              if (_0x747ex21.data.drawResult) {
                _0x747ex11 += _0x747ex21.data.drawResult.drawOk == true && _0x747ex21.data.drawResult.value + "京豆" || "空气💨";
              }
              if (_0x747ex21.data.addPoint) {
                _0x747ex11 += `${" "}${_0x747ex21.data.addPoint}${"游戏机会"}`;
              }
              console.log(`${""}${_0x747ex22}${"获得:"}${_0x747ex11 || _0x747ex1f}${""}`);
            } else {
              console.log(`${""}${_0x747ex1f.result}${""}`);
            }
          } else {
            if (_0x747ex21.errorMessage) {
              $.runFalag = false;
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex21.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
        }
        break;
      case "getDrawRecordHasCoupon":
        if (typeof _0x747ex21 == "object") {
          if (_0x747ex21.result && _0x747ex21.result === true) {
            let _0x747ex23 = 0;
            for (let _0x747ex10 in _0x747ex21.data) {
              let _0x747ex7 = _0x747ex21.data[_0x747ex10];
              if (_0x747ex7.infoName.indexOf("京豆") > -1) {
                _0x747ex23 += Number(_0x747ex7.infoName.replace("京豆", "")) || 0;
              }
            }
            if (_0x747ex23 > 0) {
              console.log(`${"共获得"}${parseInt(_0x747ex23, 10) || 0}${"京豆"}`);
            }
          } else {
            if (_0x747ex21.errorMessage) {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex21.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
        }
        break;
      case "getShareRecord":
        if (typeof _0x747ex21 == "object") {
          if (_0x747ex21.result && _0x747ex21.result === true && _0x747ex21.data) {
            console.log(`${"领取机会("}${_0x747ex21.data.hasDrawTimes}${"/10) 可领取奖励"}${_0x747ex21.data.totalCount}${"次"}`);
            $.totalCount = _0x747ex21.data.totalCount;
            $.log(`${"=========== 你邀请了:"}${_0x747ex21.data.shareRecord.length}${"个"}`);
          } else {
            if (_0x747ex21.errorMessage) {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex21.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x747ex15}${" "}${_0x747ex1f}${""}`);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(`${""}${_0x747ex15}${"-> "}${_0x747ex1f}${""}`);
    }
    if (typeof _0x747ex21 == "object") {
      if (_0x747ex21.errorMessage) {
        if (_0x747ex21.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}
function getPostRequest(_0x747ex16, _0x747ex17, _0x747ex18 = "POST") {
  let _0x747ex25 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x747ex16.indexOf("https://lzdz-isv.isvjd.com") > -1) {
    _0x747ex25.Referer = `${"https://lzdz-isv.isvjd.com/categoryUnion/categoryUnionActivity/activity?activityId="}${$.activityId}${"&tplId=0003&tplId=0003&shareUuid="}${$.shareUuid}${""}`;
    _0x747ex25.Origin = `${"https://lzdz-isv.isvjd.com"}`;
    _0x747ex25.Cookie = `${""}${lz_jdpin_token_cookie && lz_jdpin_token_cookie || ""}${""}${$.Pin && "AUTH_C_USER=" + $.Pin + ";" || ""}${""}${activityCookie}${""}`;
  }
  return {
    url: _0x747ex16,
    method: _0x747ex18,
    headers: _0x747ex25,
    body: _0x747ex17,
    timeout: 30000
  };
}
function getCk() {
  return new Promise(_0x747ex1c => {
    let _0x747ex27 = {
      url: `${"https://lzdz-isv.isvjd.com/categoryUnion/categoryUnionActivity/activity?activityId="}${$.activityId}${"&tplId=0003&shareUuid="}${$.shareUuid}${""}`,
      headers: {
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0x747ex27, async (_0x747ex1d, _0x747ex1e, _0x747ex1f) => {
      try {
        if (_0x747ex1d) {
          if (_0x747ex1e && typeof _0x747ex1e.statusCode != "undefined") {
            if (_0x747ex1e.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.toStr(_0x747ex1d)}${""}`);
          console.log(`${""}${$.name}${" cookie API请求失败，请检查网路重试"}`);
        } else {
          let _0x747ex28 = _0x747ex1f.match(/(活动已经结束)/) && _0x747ex1f.match(/(活动已经结束)/)[1] || "";
          if (_0x747ex28) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          setActivityCookie(_0x747ex1e);
        }
      } catch (e) {
        $.logErr(e, _0x747ex1e);
      } finally {
        _0x747ex1c();
      }
    });
  });
}
function setActivityCookie(_0x747ex1e) {
  if (_0x747ex1e) {
    if (_0x747ex1e.headers["set-cookie"]) {
      cookie = `${""}${originCookie}${""}`;
      for (let _0x747ex2a of _0x747ex1e.headers["set-cookie"]) {
        lz_cookie[_0x747ex2a.split(";")[0].substr(0, _0x747ex2a.split(";")[0].indexOf("="))] = _0x747ex2a.split(";")[0].substr(_0x747ex2a.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x747ex2b of Object.keys(lz_cookie)) {
        cookie += _0x747ex2b + "=" + lz_cookie[_0x747ex2b] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = `${"jdapp;iPhone;10.1.4;13.1.2;"}${randomString(40)}${";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"}`;
}
function randomString(_0x747exf) {
  _0x747exf = _0x747exf || 32;
  let _0x747ex2e = "abcdef0123456789",
    _0x747ex2f = _0x747ex2e.length,
    _0x747ex30 = "";
  for (i = 0; i < _0x747exf; i++) {
    _0x747ex30 += _0x747ex2e.charAt(Math.floor(Math.random() * _0x747ex2f));
  }
  return _0x747ex30;
}
function jsonParse(_0x747ex32) {
  if (typeof _0x747ex32 == "string") {
    try {
      return JSON.parse(_0x747ex32);
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
  return new Promise(async _0x747ex1c => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x747ex34 = `${""}`;
    if ($.shopactivityId) {
      _0x747ex34 = `${",\"activityId\":"}${$.shopactivityId}${""}`;
    }
    const _0x747ex35 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"shopId\":\""}${$.joinVenderId}${"\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0"}${_0x747ex34}${",\"channel\":406}"}`;
    const _0x747ex36 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x747ex35)
    };
    const _0x747ex37 = await getH5st("8adfb", _0x747ex36);
    const _0x747ex38 = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body="}${_0x747ex35}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x747ex37)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x747ex38, async (_0x747ex1d, _0x747ex1e, _0x747ex1f) => {
      try {
        _0x747ex1f = _0x747ex1f && _0x747ex1f.match(/jsonp_.*?\((.*?)\);/) && _0x747ex1f.match(/jsonp_.*?\((.*?)\);/)[1] || _0x747ex1f;
        let _0x747ex21 = $.toObj(_0x747ex1f, _0x747ex1f);
        if (_0x747ex21 && typeof _0x747ex21 == "object") {
          if (_0x747ex21 && _0x747ex21.success === true) {
            console.log(`${" >> "}${_0x747ex21.message}${""}`);
            $.errorJoinShop = _0x747ex21.message;
            if (_0x747ex21.result && _0x747ex21.result.giftInfo) {
              for (let _0x747ex10 of _0x747ex21.result.giftInfo.giftList) {
                console.log(`${" >> 入会获得："}${_0x747ex10.discountString}${""}${_0x747ex10.prizeName}${""}${_0x747ex10.secondLineDesc}${""}`);
              }
            }
          } else {
            if (_0x747ex21 && typeof _0x747ex21 == "object" && _0x747ex21.message) {
              $.errorJoinShop = _0x747ex21.message;
              console.log(`${""}${_0x747ex21.message || ""}${""}`);
            } else {
              console.log(_0x747ex1f);
            }
          }
        } else {
          console.log(_0x747ex1f);
        }
      } catch (e) {
        $.logErr(e, _0x747ex1e);
      } finally {
        _0x747ex1c();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x747ex1c => {
    const _0x747ex35 = `${"{\"venderId\":\""}${$.joinVenderId}${"\",\"channel\":406,\"payUpShop\":true}"}`;
    const _0x747ex36 = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(_0x747ex35)
    };
    const _0x747ex37 = await getH5st("8adfb", _0x747ex36);
    const _0x747ex38 = {
      url: `${"https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body="}${_0x747ex35}${"&clientVersion=9.2.0&client=H5&uuid=88888&h5st="}${encodeURIComponent(_0x747ex37)}${""}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x747ex38, async (_0x747ex1d, _0x747ex1e, _0x747ex1f) => {
      try {
        _0x747ex1f = _0x747ex1f && _0x747ex1f.match(/jsonp_.*?\((.*?)\);/) && _0x747ex1f.match(/jsonp_.*?\((.*?)\);/)[1] || _0x747ex1f;
        let _0x747ex21 = $.toObj(_0x747ex1f, _0x747ex1f);
        if (_0x747ex21 && typeof _0x747ex21 == "object") {
          if (_0x747ex21 && _0x747ex21.success == true) {
            console.log(`${"去加入："}${_0x747ex21.result.shopMemberCardInfo.venderCardName || ""}${" ("}${$.joinVenderId}${")"}`);
            $.shopactivityId = _0x747ex21.result.interestsRuleList && _0x747ex21.result.interestsRuleList[0] && _0x747ex21.result.interestsRuleList[0].interestsInfo && _0x747ex21.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else {
          console.log(_0x747ex1f);
        }
      } catch (e) {
        $.logErr(e, _0x747ex1e);
      } finally {
        _0x747ex1c();
      }
    });
  });
}
function getH5st(_0x747ex3b, _0x747ex36) {
  return new Promise(async _0x747ex1c => {
    let _0x747ex38 = {
      url: `${"http://api.kingran.cf/h5st"}`,
      body: `${"businessId="}${_0x747ex3b}${"&req="}${encodeURIComponent(JSON.stringify(_0x747ex36))}${""}`,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      timeout: 30 * 1000
    };
    $.post(_0x747ex38, (_0x747ex1d, _0x747ex1e, _0x747ex1f) => {
      try {
        if (_0x747ex1d) {
          console.log(JSON.stringify(_0x747ex1d));
          console.log(`${""}${$.name}${" getSign API请求失败，请检查网路重试"}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x747ex1e);
      } finally {
        _0x747ex1c(_0x747ex1f);
      }
    });
  });
}
function getAuthorCodeList(_0x747ex16) {
  return new Promise(_0x747ex1c => {
    const _0x747ex38 = {
      url: `${""}${_0x747ex16}${"?"}${new Date()}${""}`,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x747ex38, async (_0x747ex1d, _0x747ex1e, _0x747ex1f) => {
      try {
        if (_0x747ex1d) {
          $.getAuthorCodeListerr = false;
        } else {
          if (_0x747ex1f) {
            _0x747ex1f = JSON.parse(_0x747ex1f);
          }
          $.getAuthorCodeListerr = true;
        }
      } catch (e) {
        $.logErr(e, _0x747ex1e);
        _0x747ex1f = null;
      } finally {
        _0x747ex1c(_0x747ex1f);
      }
    });
  });
}
function random(_0x747ex3e, _0x747ex3f) {
  return Math.floor(Math.random() * (_0x747ex3f - _0x747ex3e)) + _0x747ex3e;
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x747ex41 = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x747ex41.join("&") + "\n");
  let _0x747ex42 = _0x747ex41;
  let _0x747ex43 = [];
  let _0x747ex44 = false;
  for (let _0x747ex10 = 0; _0x747ex10 < cookiesArr.length; _0x747ex10++) {
    let _0x747ex45 = decodeURIComponent(cookiesArr[_0x747ex10].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x747ex10].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x747ex45) {
      break;
    }
    let _0x747ex46 = false;
    for (let _0x747ex30 of _0x747ex42) {
      if (_0x747ex30 && _0x747ex30 == _0x747ex45) {
        _0x747ex46 = true;
        break;
      }
    }
    if (!_0x747ex46) {
      _0x747ex44 = true;
      _0x747ex43.splice(_0x747ex10, -1, cookiesArr[_0x747ex10]);
    }
  }
  if (_0x747ex44) {
    cookiesArr = _0x747ex43;
  }
}
function toFirst(_0x747ex43, _0x747ex48) {
  if (_0x747ex48 != 0) {
    _0x747ex43.unshift(_0x747ex43.splice(_0x747ex48, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x747ex41 = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x747ex41.join("&") + "\n");
  let _0x747ex43 = [];
  let _0x747ex4a = _0x747ex41;
  for (let _0x747ex10 in cookiesArr) {
    let _0x747ex45 = decodeURIComponent(cookiesArr[_0x747ex10].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x747ex10].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x747ex4a.includes(_0x747ex45)) {
      _0x747ex43.push(cookiesArr[_0x747ex10]);
    }
  }
  helpCookiesArr = _0x747ex43;
  if (_0x747ex4a.length > 1) {
    for (let _0x747ex30 in _0x747ex4a) {
      let _0x747ex4b = _0x747ex4a[_0x747ex4a.length - 1 - _0x747ex30];
      if (!_0x747ex4b) {
        continue;
      }
      for (let _0x747ex10 in helpCookiesArr) {
        let _0x747ex45 = decodeURIComponent(helpCookiesArr[_0x747ex10].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x747ex10].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x747ex4b == _0x747ex45) {
          toFirst(helpCookiesArr, _0x747ex10);
        }
      }
    }
  }
}